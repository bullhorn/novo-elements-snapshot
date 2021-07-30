// NG2
import { Component, EventEmitter, forwardRef, ElementRef, ViewChild, ViewContainerRef, Input, Output, NgZone, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { QuickNoteResults } from './extras/quick-note-results/QuickNoteResults';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';
// Value accessor for the component (supports ngModel)
const QUICK_NOTE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuickNoteElement),
    multi: true,
};
export class QuickNoteElement extends OutsideClick {
    constructor(zone, element, componentUtils) {
        super(element);
        this.zone = zone;
        this.componentUtils = componentUtils;
        this.startupFocus = false;
        // Emitter for selects
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.change = new EventEmitter();
        this.placeholderVisible = false;
        this._placeholderElement = null;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        // Bind to the active change event from the OutsideClick
        this.onActiveChange.subscribe((active) => {
            if (!active) {
                setTimeout(() => {
                    this.hideResults();
                });
            }
        });
    }
    ngOnInit() {
        // Make sure we have a proper config
        if (!this.config) {
            throw new Error('No config set for QuickNote!');
        }
        // Make sure that we have triggers
        if (!this.config.triggers) {
            throw new Error('QuickNote config must supply triggers!');
        }
        // Make sure that we have options
        if (!this.config.options) {
            throw new Error('QuickNote config must supply options!');
        }
        // Allow for callers to use a custom results template class in the config
        this.resultsComponent = this.config.resultsTemplate || QuickNoteResults;
    }
    ngOnDestroy() {
        // Tear down the CKEditor instance
        if (this.ckeInstance) {
            this.ckeInstance.focusManager.blur(true); // Remove focus from editor
            setTimeout(() => {
                this.ckeInstance.removeAllListeners();
                CKEDITOR.instances[this.ckeInstance.name].destroy();
                this.ckeInstance.destroy();
                this.ckeInstance = null;
            });
        }
    }
    /**
     * Connect to key/mouse events from CKEditor after the editor has been initialized
     */
    ngAfterViewInit() {
        if (!CKEDITOR) {
            console.error('Make sure to include CKEditor sources in your dependencies!');
            return;
        }
        // Replace the textarea with an instance of CKEditor
        this.ckeInstance = CKEDITOR.replace(this.host.nativeElement, this.getCKEditorConfig());
        // Set initial value of the note in the editor
        this.writeValue(this.model);
        // Connect to the key event in CKEditor for showing results dropdown
        this.ckeInstance.on('key', (event) => {
            if (!this.onKey(event.data.domEvent.$)) {
                event.cancel();
            }
        });
        // Connect to the change event in CKEditor for debouncing user modifications
        this.ckeInstance.on('change', () => {
            // Debounce update
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            this.debounceTimeout = setTimeout(() => {
                // Run within the context of this angular element since we don't need to cancel event
                this.zone.run(() => {
                    this.onValueChange();
                });
                this.debounceTimeout = null;
            }, 250);
        });
        // Propagate blur events from CKEditor to the Element's listeners
        this.ckeInstance.on('blur', (event) => {
            this.showPlaceholder();
            this.blur.emit(event);
        });
        // Propagate blur events from CKEditor to the Element's listeners
        this.ckeInstance.on('focus', (event) => {
            this.hidePlaceholder();
            this.focus.emit(event);
        });
        // Show placeholder if the note is empty, after the editor is instantiated
        this.ckeInstance.on('instanceReady', (event) => {
            this.showPlaceholder();
            // Set editor to readOnly
            if (this.config.readOnly) {
                this.ckeInstance.setReadOnly(this.config.readOnly);
            }
        });
    }
    // Set touched on blur
    onTouched(event) {
        this.onModelTouched();
    }
    /**
     * Handles setting the model and the view from the outside caller or the user's typing
     *
     * @param model A model that has a note (html content) and references (array of objects)
     */
    writeValue(model) {
        // Set value of the model
        if (model && (model.references || model.note)) {
            this.model = {
                note: model.note || '',
                references: model.references || {},
            };
        }
        else {
            this.model = {
                note: model,
                references: {},
            };
        }
        // Set the note html value in the editor
        if (this.ckeInstance) {
            this.ckeInstance.setData(this.model.note);
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * If a renderer is not provided, the QuickNote will default to using this one, an anchor tag with no href
     */
    static defaultRenderer(symbol, item) {
        return `<a>${symbol}${item.label}</a>`;
    }
    /**
     * Returns the renderer for a given tagging mode if it exists in the config, otherwise the default.
     */
    getRenderer(taggingMode) {
        return this.config.renderer ? this.config.renderer[taggingMode] : QuickNoteElement.defaultRenderer;
    }
    /**
     * Called every time a keystroke is made in the editor. Listens for particular keys (e.g. UP arrow, ESC, etc.)
     * to handle certain behaviors of the picker.
     *
     * Runs within the context of the CKEditor, so actions that affect the view have to be run back inside of the
     * Angular zone of this class.
     *
     * @param event The key press event
     * @return true to allow the event to occur, false to cancel the event
     */
    onKey(event) {
        if (event.key) {
            if (this.quickNoteResults) {
                // Hide results on escape key
                if (event.keyCode === KeyCodes.ESC) {
                    this.zone.run(() => {
                        this.hideResults();
                    });
                    return false;
                }
                // Navigation inside the results
                if (event.keyCode === KeyCodes.UP) {
                    this.zone.run(() => {
                        this.quickNoteResults.instance.prevActiveMatch();
                    });
                    return false;
                }
                if (event.keyCode === KeyCodes.DOWN) {
                    this.zone.run(() => {
                        this.quickNoteResults.instance.nextActiveMatch();
                    });
                    return false;
                }
                if (event.keyCode === KeyCodes.ENTER) {
                    this.zone.run(() => {
                        this.quickNoteResults.instance.selectActiveMatch();
                    });
                    return false;
                }
            }
            else {
                // Loop through all triggers and turn on tagging mode if the user just pressed a trigger character
                const triggers = this.config.triggers || {};
                Object.keys(triggers).forEach((key) => {
                    const trigger = triggers[key] || {};
                    if (event.key === trigger) {
                        this.isTagging = true;
                        this.taggingMode = key;
                    }
                });
            }
        }
        return true;
    }
    /**
     * Debounced method that is run in the proper Angular context when the user has modified the CKEditor.
     * After the value has been updated in CKEditor, this will propagate that change to the model and listeners.
     */
    onValueChange() {
        // Get the html text in CKEditor
        let value = this.ckeInstance.getData();
        // Remove empty 'ZERO WIDTH SPACE' characters that can get added erroneously by the editor
        const regex = new RegExp(String.fromCharCode(8203), 'g');
        value = value.replace(regex, '');
        // Make sure that any references in the model are still valid
        this.validateReferences();
        // Possibly show results if the user has entered a search term
        this.showResults();
        // Propagate change to ngModel for form validation, and send null if the note is empty
        let newModel = null;
        if (value) {
            newModel = {
                note: value,
                references: this.model.references,
            };
        }
        // Inform listeners to the ngModel change event that something has changed
        this.onModelChange(newModel);
        // Inform listeners of the `@Output() change` event that the model has been updated
        this.change.emit(newModel);
        // Inform listeners to the ngModel touched event that something has changed
        this.onTouched();
    }
    /**
     * Creates an instance of the results (called popup) and adds all the bindings to that instance.
     */
    showResults() {
        if (this.isTagging) {
            const searchTerm = this.getSearchTerm();
            if (searchTerm.length) {
                // Update Matches
                if (this.quickNoteResults) {
                    // Update existing list
                    this.quickNoteResults.instance.term = {
                        searchTerm,
                        taggingMode: this.taggingMode,
                    };
                }
                else {
                    // Create the results DOM element
                    this.quickNoteResults = this.componentUtils.append(this.resultsComponent, this.results);
                    this.quickNoteResults.instance.parent = this;
                    this.quickNoteResults.instance.config = this.config;
                    this.quickNoteResults.instance.term = {
                        searchTerm,
                        taggingMode: this.taggingMode,
                    };
                    this.positionResultsDropdown();
                }
            }
            else if (this.quickNoteResults) {
                this.quickNoteResults.destroy();
                this.quickNoteResults = null;
            }
            // Tell the OutsideClick base class to start listening for an outside clicks
            this.toggleActive(null, true);
        }
    }
    /**
     * Deletes the picker results from the DOM.
     */
    hideResults() {
        this.isTagging = false;
        if (this.quickNoteResults) {
            this.quickNoteResults.destroy();
            this.quickNoteResults = null;
        }
    }
    /**
     * Handles the selection from the QuickNoteResults Component. Called by the QuickNoteResults component on it's
     * parent (this element).
     *
     * @param taggingMode - type of tags we are looking for
     * @param selected - selected object from the picker that has a label and value
     */
    onSelected(taggingMode, selected) {
        // Turn off tagging
        this.isTagging = false;
        // Replace searchTerm with link
        const symbol = this.config.triggers[taggingMode];
        const renderer = this.getRenderer(taggingMode);
        const renderedText = renderer(symbol, selected);
        this.replaceWordAtCursor(renderedText);
        // Add the new reference, if it doesn't already exist
        this.model.references = this.model.references || {};
        this.model.references[taggingMode] = this.model.references[taggingMode] || [];
        const matchingItems = this.model.references[taggingMode].filter((item) => JSON.stringify(item) === JSON.stringify(selected));
        if (matchingItems.length === 0) {
            this.model.references[taggingMode].push(selected);
        }
        // Update the quick note with the changes due to the user's selection of an item in the dropdown
        this.onValueChange();
    }
    /**
     * Convenience method that gets the current word that the cursor is on, minus the tag.
     * Also, trims any whitespace before/after the term to aid in searching.
     */
    getSearchTerm() {
        let word = this.getWordAtCursor().trim();
        if (this.isTagging) {
            const symbol = this.config.triggers[this.taggingMode];
            if (!word.includes(symbol)) {
                this.hideResults();
                return '';
            }
            word = word.slice(word.indexOf(symbol) + symbol.length);
        }
        return word;
    }
    /**
     * Gets the current word that the cursor is on CKEditor. Current word starts at the beginning of the line or a
     * tag character if we are in tagging mode. Current word ends at the end of the line or an empty space.
     *
     * @returns plain text string (removes all html formatting)
     */
    getWordAtCursor() {
        const range = this.ckeInstance.getSelection().getRanges()[0];
        const start = range.startContainer;
        if (start.type === CKEDITOR.NODE_TEXT && range.startOffset) {
            const text = start.getText();
            const symbol = this.config.triggers[this.taggingMode];
            let wordStart = text.lastIndexOf(symbol, range.startOffset - 1);
            if (wordStart > 0) {
                const beforeSymbol = text.charAt(wordStart - 1);
                // We don't want to trigger the lookup call unless the symbol was preceded by whitespace
                if (beforeSymbol !== '\u200B' && /\S/.test(beforeSymbol)) {
                    return '';
                }
            }
            else if (start.hasPrevious() && /\S$/.test(start.getPrevious().getText())) {
                // When wordStart is <= 0, we need to check the previous node's text to see if it ended with whitespace or not
                return '';
            }
            let wordEnd = text.indexOf(' ', range.startOffset + 1);
            if (wordStart === -1) {
                wordStart = 0;
            }
            if (wordEnd === -1) {
                wordEnd = text.length;
            }
            return text.substring(wordStart, wordEnd);
        }
        // Selection starts at the 0 index of the text node or there's no previous text node in contents
        return '';
    }
    /**
     * Replaces the word that the user is on with the given html.
     *
     * CKEditor gives us access to the current line of html in the editor, so we replace the content of
     * the line, replacing only the current word.
     */
    replaceWordAtCursor(newWord) {
        const originalWord = this.getWordAtCursor().trim();
        const range = this.ckeInstance.getSelection().getRanges()[0];
        const start = range.startContainer;
        const parentNode = start.getParent();
        if (start.type === CKEDITOR.NODE_TEXT && parentNode) {
            const line = parentNode.getHtml();
            const index = line.lastIndexOf(originalWord);
            if (index >= 0) {
                // Add a space after the replaced word so that multiple references can be added back to back
                const newLine = line.substring(0, index) + newWord + ' ' + line.substring(index + originalWord.length);
                parentNode.setHtml(newLine);
                // Place selection at the end of the line
                range.moveToPosition(parentNode, CKEDITOR.POSITION_BEFORE_END);
                this.ckeInstance.getSelection().selectRanges([range]);
            }
        }
    }
    /**
     * Returns current references, minus any from the model that have been removed from the editor.
     */
    validateReferences() {
        let html = this.ckeInstance.document.getBody().getHtml();
        // CKEditor stopped supporting the config.forceSimpleAmpersand setting, so we have to convert '&amp;' to '&'
        // when we pull html from the editor - see: https://dev.ckeditor.com/ticket/13723
        const ampRegex = new RegExp('&amp;', 'g');
        html = html.replace(ampRegex, '&');
        Object.keys(this.model.references).forEach((taggingMode) => {
            const array = this.model.references[taggingMode] || [];
            const symbol = this.config.triggers[taggingMode];
            const renderer = this.getRenderer(taggingMode);
            this.model.references[taggingMode] = array.filter((item) => {
                const renderedText = renderer(symbol, item);
                return html.includes(renderedText);
            });
            // If no references, then delete the key
            if (this.model.references[taggingMode].length === 0) {
                delete this.model.references[taggingMode];
            }
        });
    }
    /**
     * Configures the CKEditor for QuickNote functionality.
     *
     * Sets the height of the CKEditor dynamically to the height of the wrapper upon initialization.
     * Removes the toolbar on the bottom and configures a slimmed down version of the toolbar.
     * Removes plugins and turns off setting to allow browser based spell checking.
     */
    getCKEditorConfig() {
        // Use the height of the wrapper element to set the initial height of the editor, then
        // set it to 100% to allow the editor to resize using the grippy.
        const editorHeight = this.wrapper.nativeElement.clientHeight - QuickNoteElement.TOOLBAR_HEIGHT;
        this.wrapper.nativeElement.style.setProperty('height', '100%');
        return {
            enterMode: CKEDITOR.ENTER_BR,
            shiftEnterMode: CKEDITOR.ENTER_P,
            disableNativeSpellChecker: false,
            height: editorHeight,
            startupFocus: this.startupFocus,
            removePlugins: 'liststyle,tabletools,contextmenu',
            toolbar: [
                {
                    name: 'basicstyles',
                    items: [
                        'Styles',
                        'FontSize',
                        'Bold',
                        'Italic',
                        'Underline',
                        'TextColor',
                        '-',
                        'NumberedList',
                        'BulletedList',
                        'Outdent',
                        'Indent',
                        'Link',
                    ],
                },
            ],
        };
    }
    /**
     * Returns the current screen position of the cursor in CKEditor, accounting for any scrolling in the editor.
     */
    getCursorPosition() {
        const range = this.ckeInstance.getSelection().getRanges()[0];
        const parentElement = range.startContainer.$.parentElement;
        const editorElement = this.ckeInstance.editable().$;
        // Since the editor is a text node in the DOM that does not know about it's position, a temporary element has to
        // be inserted in order to locate the cursor position.
        const cursorElement = document.createElement('img');
        cursorElement.setAttribute('src', 'null');
        cursorElement.setAttribute('width', '0');
        cursorElement.setAttribute('height', '0');
        parentElement.appendChild(cursorElement);
        const cursorPosition = {
            top: cursorElement.offsetTop - editorElement.scrollTop,
            left: cursorElement.offsetLeft - editorElement.scrollLeft,
        };
        cursorElement.remove();
        return cursorPosition;
    }
    /**
     * Positions the results dropdown based on the location of the cursor in the text field
     */
    positionResultsDropdown() {
        const MIN_MARGIN_TOP = QuickNoteElement.TOOLBAR_HEIGHT * 2;
        const MAX_MARGIN_TOP = this.getContentHeight() + QuickNoteElement.TOOLBAR_HEIGHT;
        const cursorPosition = this.getCursorPosition();
        let marginTop = cursorPosition.top + QuickNoteElement.TOOLBAR_HEIGHT;
        // Check that the margin is within the visible bounds
        marginTop = Math.max(marginTop, MIN_MARGIN_TOP);
        marginTop = Math.min(marginTop, MAX_MARGIN_TOP);
        // Set the margin-top of the dropdown
        this.quickNoteResults.instance.element.nativeElement.style.setProperty('margin-top', marginTop + 'px');
    }
    /**
     * Returns the height in pixels of the content area - the text that the user has entered.
     */
    getContentHeight() {
        let contentHeight = 0;
        if (this.ckeInstance.ui &&
            this.ckeInstance.ui.contentsElement &&
            this.ckeInstance.ui.contentsElement.$ &&
            this.ckeInstance.ui.contentsElement.$.style) {
            const cssText = this.ckeInstance.ui.contentsElement.$.style.cssText;
            if (cssText.indexOf('height: ') !== -1) {
                let height = cssText.split('height: ')[1];
                height = height.split('px')[0];
                contentHeight = parseInt(height, 10);
            }
        }
        return contentHeight;
    }
    /**
     * Show the placeholder text if the editor is empty
     */
    showPlaceholder() {
        if (!this.ckeInstance.getData() && !this.startupFocus) {
            this.ckeInstance
                .editable()
                .getParent()
                .$.appendChild(this.placeholderElement);
            this.placeholderVisible = true;
        }
    }
    /**
     * Hide the placeholder text by removing the placeholder element from the DOM
     */
    hidePlaceholder() {
        if (this.placeholderVisible) {
            this.ckeInstance
                .editable()
                .getParent()
                .$.removeChild(this.placeholderElement);
            this.placeholderVisible = false;
        }
    }
    /**
     * Get or create the single placeholder object that is constructed only when needed.
     */
    get placeholderElement() {
        if (!this._placeholderElement) {
            this._placeholderElement = document.createElement('div');
            this._placeholderElement.className = 'placeholder';
            this._placeholderElement.style.cssText =
                'margin: 20px; color: #AAAAAA; font-family: sans-serif; font-size: 13px; line-height: 20px; position: absolute; top: 0';
            this._placeholderElement.textContent = this.placeholder;
        }
        return this._placeholderElement;
    }
}
QuickNoteElement.TOOLBAR_HEIGHT = 40; // in pixels - configured by stylesheet
QuickNoteElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-quick-note',
                providers: [QUICK_NOTE_VALUE_ACCESSOR],
                template: `
    <div class="quick-note-wrapper" #wrapper><textarea #host></textarea> <span #results></span></div>
  `
            },] }
];
QuickNoteElement.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: ComponentUtils }
];
QuickNoteElement.propDecorators = {
    wrapper: [{ type: ViewChild, args: ['wrapper', { static: true },] }],
    host: [{ type: ViewChild, args: ['host', { static: true },] }],
    results: [{ type: ViewChild, args: ['results', { read: ViewContainerRef, static: true },] }],
    config: [{ type: Input }],
    startupFocus: [{ type: Input }],
    placeholder: [{ type: Input }],
    focus: [{ type: Output }],
    blur: [{ type: Output }],
    change: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVpY2tOb3RlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9xdWljay1ub3RlL1F1aWNrTm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUU5RSxzREFBc0Q7QUFDdEQsTUFBTSx5QkFBeUIsR0FBRztJQUNoQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBV0YsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFlBQVk7SUF1Q2hELFlBQW9CLElBQVksRUFBRSxPQUFtQixFQUFVLGNBQThCO1FBQzNGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURHLFNBQUksR0FBSixJQUFJLENBQVE7UUFBK0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBNUI3RixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUk5QixzQkFBc0I7UUFFdEIsVUFBSyxHQUFzQixJ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RSxpQkFBaUI7Z0JBQzNCLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2dCQUN0QyxRQUFRLEVBQUU7O0dBRVQ7YUFDRjs7O1lBeEJDLE1BQU07WUFSTixVQUFVO1lBZUgsY0FBYzs7O3NCQW1CcEIsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7bUJBRXJDLFNBQVMsU0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3NCQUVsQyxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7cUJBRzdELEtBQUs7MkJBRUwsS0FBSzswQkFFTCxLQUFLO29CQUlMLE1BQU07bUJBRU4sTUFBTTtxQkFFTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIE9uSW5pdCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBOZ1pvbmUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgT3V0c2lkZUNsaWNrIH0gZnJvbSAnLi8uLi8uLi91dGlscy9vdXRzaWRlLWNsaWNrL091dHNpZGVDbGljayc7XHJcbmltcG9ydCB7IEtleUNvZGVzIH0gZnJvbSAnLi8uLi8uLi91dGlscy9rZXktY29kZXMvS2V5Q29kZXMnO1xyXG5pbXBvcnQgeyBRdWlja05vdGVSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvcXVpY2stbm90ZS1yZXN1bHRzL1F1aWNrTm90ZVJlc3VsdHMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRVdGlscyB9IGZyb20gJy4vLi4vLi4vdXRpbHMvY29tcG9uZW50LXV0aWxzL0NvbXBvbmVudFV0aWxzJztcclxuXHJcbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxyXG5jb25zdCBRVUlDS19OT1RFX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFF1aWNrTm90ZUVsZW1lbnQpLFxyXG4gIG11bHRpOiB0cnVlLFxyXG59O1xyXG5cclxuZGVjbGFyZSB2YXIgQ0tFRElUT1I6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1xdWljay1ub3RlJyxcclxuICBwcm92aWRlcnM6IFtRVUlDS19OT1RFX1ZBTFVFX0FDQ0VTU09SXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cInF1aWNrLW5vdGUtd3JhcHBlclwiICN3cmFwcGVyPjx0ZXh0YXJlYSAjaG9zdD48L3RleHRhcmVhPiA8c3BhbiAjcmVzdWx0cz48L3NwYW4+PC9kaXY+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFF1aWNrTm90ZUVsZW1lbnQgZXh0ZW5kcyBPdXRzaWRlQ2xpY2sgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQFZpZXdDaGlsZCgnd3JhcHBlcicsIHsgc3RhdGljOiB0cnVlIH0pXHJcbiAgcHVibGljIHdyYXBwZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnaG9zdCcsIHsgc3RhdGljOiB0cnVlIH0pXHJcbiAgcHVibGljIGhvc3Q6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgncmVzdWx0cycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXHJcbiAgcmVzdWx0czogVmlld0NvbnRhaW5lclJlZjtcclxuXHJcbiAgQElucHV0KClcclxuICBjb25maWc6IGFueTtcclxuICBASW5wdXQoKVxyXG4gIHN0YXJ0dXBGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcbiAgLy8gRW1pdHRlciBmb3Igc2VsZWN0c1xyXG4gIEBPdXRwdXQoKVxyXG4gIGZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KClcclxuICBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KClcclxuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBUaGUgY2hhcmFjdGVycyB0aGF0IHRoZSB1c2VyIGVudGVycyBpbiBvcmRlciB0byBzZWFyY2ggZm9yIGEgcGVyc29uL3RoaW5nIHRvIHRhZ1xyXG4gIHByaXZhdGUgcmVzdWx0c0NvbXBvbmVudDogYW55O1xyXG4gIHByaXZhdGUgcXVpY2tOb3RlUmVzdWx0czogYW55O1xyXG4gIHByaXZhdGUgaXNUYWdnaW5nOiBib29sZWFuO1xyXG4gIHByaXZhdGUgdGFnZ2luZ01vZGU6IHN0cmluZztcclxuICBwcml2YXRlIG1vZGVsOiBhbnk7XHJcbiAgcHJpdmF0ZSBja2VJbnN0YW5jZTogYW55O1xyXG4gIHByaXZhdGUgZGVib3VuY2VUaW1lb3V0OiBhbnk7XHJcbiAgcHJpdmF0ZSBwbGFjZWhvbGRlclZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIF9wbGFjZWhvbGRlckVsZW1lbnQ6IGFueSA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIFRPT0xCQVJfSEVJR0hUID0gNDA7IC8vIGluIHBpeGVscyAtIGNvbmZpZ3VyZWQgYnkgc3R5bGVzaGVldFxyXG5cclxuICBwcml2YXRlIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG4gIHByaXZhdGUgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMpIHtcclxuICAgIHN1cGVyKGVsZW1lbnQpO1xyXG4gICAgLy8gQmluZCB0byB0aGUgYWN0aXZlIGNoYW5nZSBldmVudCBmcm9tIHRoZSBPdXRzaWRlQ2xpY2tcclxuICAgIHRoaXMub25BY3RpdmVDaGFuZ2Uuc3Vic2NyaWJlKChhY3RpdmUpID0+IHtcclxuICAgICAgaWYgKCFhY3RpdmUpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZVJlc3VsdHMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhIHByb3BlciBjb25maWdcclxuICAgIGlmICghdGhpcy5jb25maWcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb25maWcgc2V0IGZvciBRdWlja05vdGUhJyk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB3ZSBoYXZlIHRyaWdnZXJzXHJcbiAgICBpZiAoIXRoaXMuY29uZmlnLnRyaWdnZXJzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUXVpY2tOb3RlIGNvbmZpZyBtdXN0IHN1cHBseSB0cmlnZ2VycyEnKTtcclxuICAgIH1cclxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlIGhhdmUgb3B0aW9uc1xyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5vcHRpb25zKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUXVpY2tOb3RlIGNvbmZpZyBtdXN0IHN1cHBseSBvcHRpb25zIScpO1xyXG4gICAgfVxyXG4gICAgLy8gQWxsb3cgZm9yIGNhbGxlcnMgdG8gdXNlIGEgY3VzdG9tIHJlc3VsdHMgdGVtcGxhdGUgY2xhc3MgaW4gdGhlIGNvbmZpZ1xyXG4gICAgdGhpcy5yZXN1bHRzQ29tcG9uZW50ID0gdGhpcy5jb25maWcucmVzdWx0c1RlbXBsYXRlIHx8IFF1aWNrTm90ZVJlc3VsdHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvLyBUZWFyIGRvd24gdGhlIENLRWRpdG9yIGluc3RhbmNlXHJcbiAgICBpZiAodGhpcy5ja2VJbnN0YW5jZSkge1xyXG4gICAgICB0aGlzLmNrZUluc3RhbmNlLmZvY3VzTWFuYWdlci5ibHVyKHRydWUpOyAvLyBSZW1vdmUgZm9jdXMgZnJvbSBlZGl0b3JcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ja2VJbnN0YW5jZS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcclxuICAgICAgICBDS0VESVRPUi5pbnN0YW5jZXNbdGhpcy5ja2VJbnN0YW5jZS5uYW1lXS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5ja2VJbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5ja2VJbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29ubmVjdCB0byBrZXkvbW91c2UgZXZlbnRzIGZyb20gQ0tFZGl0b3IgYWZ0ZXIgdGhlIGVkaXRvciBoYXMgYmVlbiBpbml0aWFsaXplZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIUNLRURJVE9SKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ01ha2Ugc3VyZSB0byBpbmNsdWRlIENLRWRpdG9yIHNvdXJjZXMgaW4geW91ciBkZXBlbmRlbmNpZXMhJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBsYWNlIHRoZSB0ZXh0YXJlYSB3aXRoIGFuIGluc3RhbmNlIG9mIENLRWRpdG9yXHJcbiAgICB0aGlzLmNrZUluc3RhbmNlID0gQ0tFRElUT1IucmVwbGFjZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgdGhpcy5nZXRDS0VkaXRvckNvbmZpZygpKTtcclxuXHJcbiAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgbm90ZSBpbiB0aGUgZWRpdG9yXHJcbiAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5tb2RlbCk7XHJcblxyXG4gICAgLy8gQ29ubmVjdCB0byB0aGUga2V5IGV2ZW50IGluIENLRWRpdG9yIGZvciBzaG93aW5nIHJlc3VsdHMgZHJvcGRvd25cclxuICAgIHRoaXMuY2tlSW5zdGFuY2Uub24oJ2tleScsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5vbktleShldmVudC5kYXRhLmRvbUV2ZW50LiQpKSB7XHJcbiAgICAgICAgZXZlbnQuY2FuY2VsKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvbm5lY3QgdG8gdGhlIGNoYW5nZSBldmVudCBpbiBDS0VkaXRvciBmb3IgZGVib3VuY2luZyB1c2VyIG1vZGlmaWNhdGlvbnNcclxuICAgIHRoaXMuY2tlSW5zdGFuY2Uub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgLy8gRGVib3VuY2UgdXBkYXRlXHJcbiAgICAgIGlmICh0aGlzLmRlYm91bmNlVGltZW91dCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlYm91bmNlVGltZW91dCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kZWJvdW5jZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyBSdW4gd2l0aGluIHRoZSBjb250ZXh0IG9mIHRoaXMgYW5ndWxhciBlbGVtZW50IHNpbmNlIHdlIGRvbid0IG5lZWQgdG8gY2FuY2VsIGV2ZW50XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRlYm91bmNlVGltZW91dCA9IG51bGw7XHJcbiAgICAgIH0sIDI1MCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBQcm9wYWdhdGUgYmx1ciBldmVudHMgZnJvbSBDS0VkaXRvciB0byB0aGUgRWxlbWVudCdzIGxpc3RlbmVyc1xyXG4gICAgdGhpcy5ja2VJbnN0YW5jZS5vbignYmx1cicsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuc2hvd1BsYWNlaG9sZGVyKCk7XHJcbiAgICAgIHRoaXMuYmx1ci5lbWl0KGV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFByb3BhZ2F0ZSBibHVyIGV2ZW50cyBmcm9tIENLRWRpdG9yIHRvIHRoZSBFbGVtZW50J3MgbGlzdGVuZXJzXHJcbiAgICB0aGlzLmNrZUluc3RhbmNlLm9uKCdmb2N1cycsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuaGlkZVBsYWNlaG9sZGVyKCk7XHJcbiAgICAgIHRoaXMuZm9jdXMuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTaG93IHBsYWNlaG9sZGVyIGlmIHRoZSBub3RlIGlzIGVtcHR5LCBhZnRlciB0aGUgZWRpdG9yIGlzIGluc3RhbnRpYXRlZFxyXG4gICAgdGhpcy5ja2VJbnN0YW5jZS5vbignaW5zdGFuY2VSZWFkeScsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuc2hvd1BsYWNlaG9sZGVyKCk7XHJcbiAgICAgIC8vIFNldCBlZGl0b3IgdG8gcmVhZE9ubHlcclxuICAgICAgaWYgKHRoaXMuY29uZmlnLnJlYWRPbmx5KSB7XHJcbiAgICAgICAgdGhpcy5ja2VJbnN0YW5jZS5zZXRSZWFkT25seSh0aGlzLmNvbmZpZy5yZWFkT25seSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0IHRvdWNoZWQgb24gYmx1clxyXG4gIHB1YmxpYyBvblRvdWNoZWQoZXZlbnQ/OiBhbnkpIHtcclxuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXMgc2V0dGluZyB0aGUgbW9kZWwgYW5kIHRoZSB2aWV3IGZyb20gdGhlIG91dHNpZGUgY2FsbGVyIG9yIHRoZSB1c2VyJ3MgdHlwaW5nXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbW9kZWwgQSBtb2RlbCB0aGF0IGhhcyBhIG5vdGUgKGh0bWwgY29udGVudCkgYW5kIHJlZmVyZW5jZXMgKGFycmF5IG9mIG9iamVjdHMpXHJcbiAgICovXHJcbiAgcHVibGljIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gU2V0IHZhbHVlIG9mIHRoZSBtb2RlbFxyXG4gICAgaWYgKG1vZGVsICYmIChtb2RlbC5yZWZlcmVuY2VzIHx8IG1vZGVsLm5vdGUpKSB7XHJcbiAgICAgIHRoaXMubW9kZWwgPSB7XHJcbiAgICAgICAgbm90ZTogbW9kZWwubm90ZSB8fCAnJyxcclxuICAgICAgICByZWZlcmVuY2VzOiBtb2RlbC5yZWZlcmVuY2VzIHx8IHt9LFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RlbCA9IHtcclxuICAgICAgICBub3RlOiBtb2RlbCxcclxuICAgICAgICByZWZlcmVuY2VzOiB7fSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgdGhlIG5vdGUgaHRtbCB2YWx1ZSBpbiB0aGUgZWRpdG9yXHJcbiAgICBpZiAodGhpcy5ja2VJbnN0YW5jZSkge1xyXG4gICAgICB0aGlzLmNrZUluc3RhbmNlLnNldERhdGEodGhpcy5tb2RlbC5ub3RlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBhIHJlbmRlcmVyIGlzIG5vdCBwcm92aWRlZCwgdGhlIFF1aWNrTm90ZSB3aWxsIGRlZmF1bHQgdG8gdXNpbmcgdGhpcyBvbmUsIGFuIGFuY2hvciB0YWcgd2l0aCBubyBocmVmXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZGVmYXVsdFJlbmRlcmVyKHN5bWJvbDogc3RyaW5nLCBpdGVtOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGA8YT4ke3N5bWJvbH0ke2l0ZW0ubGFiZWx9PC9hPmA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByZW5kZXJlciBmb3IgYSBnaXZlbiB0YWdnaW5nIG1vZGUgaWYgaXQgZXhpc3RzIGluIHRoZSBjb25maWcsIG90aGVyd2lzZSB0aGUgZGVmYXVsdC5cclxuICAgKi9cclxuICBwcml2YXRlIGdldFJlbmRlcmVyKHRhZ2dpbmdNb2RlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnJlbmRlcmVyID8gdGhpcy5jb25maWcucmVuZGVyZXJbdGFnZ2luZ01vZGVdIDogUXVpY2tOb3RlRWxlbWVudC5kZWZhdWx0UmVuZGVyZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgZXZlcnkgdGltZSBhIGtleXN0cm9rZSBpcyBtYWRlIGluIHRoZSBlZGl0b3IuIExpc3RlbnMgZm9yIHBhcnRpY3VsYXIga2V5cyAoZS5nLiBVUCBhcnJvdywgRVNDLCBldGMuKVxyXG4gICAqIHRvIGhhbmRsZSBjZXJ0YWluIGJlaGF2aW9ycyBvZiB0aGUgcGlja2VyLlxyXG4gICAqXHJcbiAgICogUnVucyB3aXRoaW4gdGhlIGNvbnRleHQgb2YgdGhlIENLRWRpdG9yLCBzbyBhY3Rpb25zIHRoYXQgYWZmZWN0IHRoZSB2aWV3IGhhdmUgdG8gYmUgcnVuIGJhY2sgaW5zaWRlIG9mIHRoZVxyXG4gICAqIEFuZ3VsYXIgem9uZSBvZiB0aGlzIGNsYXNzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IFRoZSBrZXkgcHJlc3MgZXZlbnRcclxuICAgKiBAcmV0dXJuIHRydWUgdG8gYWxsb3cgdGhlIGV2ZW50IHRvIG9jY3VyLCBmYWxzZSB0byBjYW5jZWwgdGhlIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbktleShldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGV2ZW50LmtleSkge1xyXG4gICAgICBpZiAodGhpcy5xdWlja05vdGVSZXN1bHRzKSB7XHJcbiAgICAgICAgLy8gSGlkZSByZXN1bHRzIG9uIGVzY2FwZSBrZXlcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuRVNDKSB7XHJcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlUmVzdWx0cygpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBOYXZpZ2F0aW9uIGluc2lkZSB0aGUgcmVzdWx0c1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2Rlcy5VUCkge1xyXG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucXVpY2tOb3RlUmVzdWx0cy5pbnN0YW5jZS5wcmV2QWN0aXZlTWF0Y2goKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGVzLkRPV04pIHtcclxuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnF1aWNrTm90ZVJlc3VsdHMuaW5zdGFuY2UubmV4dEFjdGl2ZU1hdGNoKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2Rlcy5FTlRFUikge1xyXG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucXVpY2tOb3RlUmVzdWx0cy5pbnN0YW5jZS5zZWxlY3RBY3RpdmVNYXRjaCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgdHJpZ2dlcnMgYW5kIHR1cm4gb24gdGFnZ2luZyBtb2RlIGlmIHRoZSB1c2VyIGp1c3QgcHJlc3NlZCBhIHRyaWdnZXIgY2hhcmFjdGVyXHJcbiAgICAgICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmNvbmZpZy50cmlnZ2VycyB8fCB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyh0cmlnZ2VycykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gdHJpZ2dlcnNba2V5XSB8fCB7fTtcclxuICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1RhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRhZ2dpbmdNb2RlID0ga2V5O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYm91bmNlZCBtZXRob2QgdGhhdCBpcyBydW4gaW4gdGhlIHByb3BlciBBbmd1bGFyIGNvbnRleHQgd2hlbiB0aGUgdXNlciBoYXMgbW9kaWZpZWQgdGhlIENLRWRpdG9yLlxyXG4gICAqIEFmdGVyIHRoZSB2YWx1ZSBoYXMgYmVlbiB1cGRhdGVkIGluIENLRWRpdG9yLCB0aGlzIHdpbGwgcHJvcGFnYXRlIHRoYXQgY2hhbmdlIHRvIHRoZSBtb2RlbCBhbmQgbGlzdGVuZXJzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25WYWx1ZUNoYW5nZSgpOiB2b2lkIHtcclxuICAgIC8vIEdldCB0aGUgaHRtbCB0ZXh0IGluIENLRWRpdG9yXHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmNrZUluc3RhbmNlLmdldERhdGEoKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgZW1wdHkgJ1pFUk8gV0lEVEggU1BBQ0UnIGNoYXJhY3RlcnMgdGhhdCBjYW4gZ2V0IGFkZGVkIGVycm9uZW91c2x5IGJ5IHRoZSBlZGl0b3JcclxuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChTdHJpbmcuZnJvbUNoYXJDb2RlKDgyMDMpLCAnZycpO1xyXG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlZ2V4LCAnJyk7XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgYW55IHJlZmVyZW5jZXMgaW4gdGhlIG1vZGVsIGFyZSBzdGlsbCB2YWxpZFxyXG4gICAgdGhpcy52YWxpZGF0ZVJlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAvLyBQb3NzaWJseSBzaG93IHJlc3VsdHMgaWYgdGhlIHVzZXIgaGFzIGVudGVyZWQgYSBzZWFyY2ggdGVybVxyXG4gICAgdGhpcy5zaG93UmVzdWx0cygpO1xyXG5cclxuICAgIC8vIFByb3BhZ2F0ZSBjaGFuZ2UgdG8gbmdNb2RlbCBmb3IgZm9ybSB2YWxpZGF0aW9uLCBhbmQgc2VuZCBudWxsIGlmIHRoZSBub3RlIGlzIGVtcHR5XHJcbiAgICBsZXQgbmV3TW9kZWwgPSBudWxsO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIG5ld01vZGVsID0ge1xyXG4gICAgICAgIG5vdGU6IHZhbHVlLFxyXG4gICAgICAgIHJlZmVyZW5jZXM6IHRoaXMubW9kZWwucmVmZXJlbmNlcyxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbmZvcm0gbGlzdGVuZXJzIHRvIHRoZSBuZ01vZGVsIGNoYW5nZSBldmVudCB0aGF0IHNvbWV0aGluZyBoYXMgY2hhbmdlZFxyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKG5ld01vZGVsKTtcclxuXHJcbiAgICAvLyBJbmZvcm0gbGlzdGVuZXJzIG9mIHRoZSBgQE91dHB1dCgpIGNoYW5nZWAgZXZlbnQgdGhhdCB0aGUgbW9kZWwgaGFzIGJlZW4gdXBkYXRlZFxyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChuZXdNb2RlbCk7XHJcblxyXG4gICAgLy8gSW5mb3JtIGxpc3RlbmVycyB0byB0aGUgbmdNb2RlbCB0b3VjaGVkIGV2ZW50IHRoYXQgc29tZXRoaW5nIGhhcyBjaGFuZ2VkXHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgcmVzdWx0cyAoY2FsbGVkIHBvcHVwKSBhbmQgYWRkcyBhbGwgdGhlIGJpbmRpbmdzIHRvIHRoYXQgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzaG93UmVzdWx0cygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzVGFnZ2luZykge1xyXG4gICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGhpcy5nZXRTZWFyY2hUZXJtKCk7XHJcbiAgICAgIGlmIChzZWFyY2hUZXJtLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIFVwZGF0ZSBNYXRjaGVzXHJcbiAgICAgICAgaWYgKHRoaXMucXVpY2tOb3RlUmVzdWx0cykge1xyXG4gICAgICAgICAgLy8gVXBkYXRlIGV4aXN0aW5nIGxpc3RcclxuICAgICAgICAgIHRoaXMucXVpY2tOb3RlUmVzdWx0cy5pbnN0YW5jZS50ZXJtID0ge1xyXG4gICAgICAgICAgICBzZWFyY2hUZXJtLFxyXG4gICAgICAgICAgICB0YWdnaW5nTW9kZTogdGhpcy50YWdnaW5nTW9kZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIENyZWF0ZSB0aGUgcmVzdWx0cyBET00gZWxlbWVudFxyXG4gICAgICAgICAgdGhpcy5xdWlja05vdGVSZXN1bHRzID0gdGhpcy5jb21wb25lbnRVdGlscy5hcHBlbmQodGhpcy5yZXN1bHRzQ29tcG9uZW50LCB0aGlzLnJlc3VsdHMpO1xyXG4gICAgICAgICAgdGhpcy5xdWlja05vdGVSZXN1bHRzLmluc3RhbmNlLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgICB0aGlzLnF1aWNrTm90ZVJlc3VsdHMuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XHJcbiAgICAgICAgICB0aGlzLnF1aWNrTm90ZVJlc3VsdHMuaW5zdGFuY2UudGVybSA9IHtcclxuICAgICAgICAgICAgc2VhcmNoVGVybSxcclxuICAgICAgICAgICAgdGFnZ2luZ01vZGU6IHRoaXMudGFnZ2luZ01vZGUsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy5wb3NpdGlvblJlc3VsdHNEcm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnF1aWNrTm90ZVJlc3VsdHMpIHtcclxuICAgICAgICB0aGlzLnF1aWNrTm90ZVJlc3VsdHMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMucXVpY2tOb3RlUmVzdWx0cyA9IG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRlbGwgdGhlIE91dHNpZGVDbGljayBiYXNlIGNsYXNzIHRvIHN0YXJ0IGxpc3RlbmluZyBmb3IgYW4gb3V0c2lkZSBjbGlja3NcclxuICAgICAgdGhpcy50b2dnbGVBY3RpdmUobnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWxldGVzIHRoZSBwaWNrZXIgcmVzdWx0cyBmcm9tIHRoZSBET00uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoaWRlUmVzdWx0cygpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNUYWdnaW5nID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5xdWlja05vdGVSZXN1bHRzKSB7XHJcbiAgICAgIHRoaXMucXVpY2tOb3RlUmVzdWx0cy5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMucXVpY2tOb3RlUmVzdWx0cyA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBzZWxlY3Rpb24gZnJvbSB0aGUgUXVpY2tOb3RlUmVzdWx0cyBDb21wb25lbnQuIENhbGxlZCBieSB0aGUgUXVpY2tOb3RlUmVzdWx0cyBjb21wb25lbnQgb24gaXQnc1xyXG4gICAqIHBhcmVudCAodGhpcyBlbGVtZW50KS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0YWdnaW5nTW9kZSAtIHR5cGUgb2YgdGFncyB3ZSBhcmUgbG9va2luZyBmb3JcclxuICAgKiBAcGFyYW0gc2VsZWN0ZWQgLSBzZWxlY3RlZCBvYmplY3QgZnJvbSB0aGUgcGlja2VyIHRoYXQgaGFzIGEgbGFiZWwgYW5kIHZhbHVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlbGVjdGVkKHRhZ2dpbmdNb2RlOiBzdHJpbmcsIHNlbGVjdGVkOiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIFR1cm4gb2ZmIHRhZ2dpbmdcclxuICAgIHRoaXMuaXNUYWdnaW5nID0gZmFsc2U7XHJcblxyXG4gICAgLy8gUmVwbGFjZSBzZWFyY2hUZXJtIHdpdGggbGlua1xyXG4gICAgY29uc3Qgc3ltYm9sID0gdGhpcy5jb25maWcudHJpZ2dlcnNbdGFnZ2luZ01vZGVdO1xyXG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKHRhZ2dpbmdNb2RlKTtcclxuICAgIGNvbnN0IHJlbmRlcmVkVGV4dCA9IHJlbmRlcmVyKHN5bWJvbCwgc2VsZWN0ZWQpO1xyXG5cclxuICAgIHRoaXMucmVwbGFjZVdvcmRBdEN1cnNvcihyZW5kZXJlZFRleHQpO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgbmV3IHJlZmVyZW5jZSwgaWYgaXQgZG9lc24ndCBhbHJlYWR5IGV4aXN0XHJcbiAgICB0aGlzLm1vZGVsLnJlZmVyZW5jZXMgPSB0aGlzLm1vZGVsLnJlZmVyZW5jZXMgfHwge307XHJcbiAgICB0aGlzLm1vZGVsLnJlZmVyZW5jZXNbdGFnZ2luZ01vZGVdID0gdGhpcy5tb2RlbC5yZWZlcmVuY2VzW3RhZ2dpbmdNb2RlXSB8fCBbXTtcclxuICAgIGNvbnN0IG1hdGNoaW5nSXRlbXMgPSB0aGlzLm1vZGVsLnJlZmVyZW5jZXNbdGFnZ2luZ01vZGVdLmZpbHRlcigoaXRlbSkgPT4gSlNPTi5zdHJpbmdpZnkoaXRlbSkgPT09IEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkKSk7XHJcbiAgICBpZiAobWF0Y2hpbmdJdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5tb2RlbC5yZWZlcmVuY2VzW3RhZ2dpbmdNb2RlXS5wdXNoKHNlbGVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIHF1aWNrIG5vdGUgd2l0aCB0aGUgY2hhbmdlcyBkdWUgdG8gdGhlIHVzZXIncyBzZWxlY3Rpb24gb2YgYW4gaXRlbSBpbiB0aGUgZHJvcGRvd25cclxuICAgIHRoaXMub25WYWx1ZUNoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRoYXQgZ2V0cyB0aGUgY3VycmVudCB3b3JkIHRoYXQgdGhlIGN1cnNvciBpcyBvbiwgbWludXMgdGhlIHRhZy5cclxuICAgKiBBbHNvLCB0cmltcyBhbnkgd2hpdGVzcGFjZSBiZWZvcmUvYWZ0ZXIgdGhlIHRlcm0gdG8gYWlkIGluIHNlYXJjaGluZy5cclxuICAgKi9cclxuICBwcml2YXRlIGdldFNlYXJjaFRlcm0oKTogc3RyaW5nIHtcclxuICAgIGxldCB3b3JkID0gdGhpcy5nZXRXb3JkQXRDdXJzb3IoKS50cmltKCk7XHJcbiAgICBpZiAodGhpcy5pc1RhZ2dpbmcpIHtcclxuICAgICAgY29uc3Qgc3ltYm9sID0gdGhpcy5jb25maWcudHJpZ2dlcnNbdGhpcy50YWdnaW5nTW9kZV07XHJcbiAgICAgIGlmICghd29yZC5pbmNsdWRlcyhzeW1ib2wpKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlUmVzdWx0cygpO1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfVxyXG4gICAgICB3b3JkID0gd29yZC5zbGljZSh3b3JkLmluZGV4T2Yoc3ltYm9sKSArIHN5bWJvbC5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdvcmQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjdXJyZW50IHdvcmQgdGhhdCB0aGUgY3Vyc29yIGlzIG9uIENLRWRpdG9yLiBDdXJyZW50IHdvcmQgc3RhcnRzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpbmUgb3IgYVxyXG4gICAqIHRhZyBjaGFyYWN0ZXIgaWYgd2UgYXJlIGluIHRhZ2dpbmcgbW9kZS4gQ3VycmVudCB3b3JkIGVuZHMgYXQgdGhlIGVuZCBvZiB0aGUgbGluZSBvciBhbiBlbXB0eSBzcGFjZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHBsYWluIHRleHQgc3RyaW5nIChyZW1vdmVzIGFsbCBodG1sIGZvcm1hdHRpbmcpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRXb3JkQXRDdXJzb3IoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5ja2VJbnN0YW5jZS5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZXMoKVswXTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XHJcblxyXG4gICAgaWYgKHN0YXJ0LnR5cGUgPT09IENLRURJVE9SLk5PREVfVEVYVCAmJiByYW5nZS5zdGFydE9mZnNldCkge1xyXG4gICAgICBjb25zdCB0ZXh0ID0gc3RhcnQuZ2V0VGV4dCgpO1xyXG4gICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLmNvbmZpZy50cmlnZ2Vyc1t0aGlzLnRhZ2dpbmdNb2RlXTtcclxuICAgICAgbGV0IHdvcmRTdGFydCA9IHRleHQubGFzdEluZGV4T2Yoc3ltYm9sLCByYW5nZS5zdGFydE9mZnNldCAtIDEpO1xyXG5cclxuICAgICAgaWYgKHdvcmRTdGFydCA+IDApIHtcclxuICAgICAgICBjb25zdCBiZWZvcmVTeW1ib2w6IHN0cmluZyA9IHRleHQuY2hhckF0KHdvcmRTdGFydCAtIDEpO1xyXG4gICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gdHJpZ2dlciB0aGUgbG9va3VwIGNhbGwgdW5sZXNzIHRoZSBzeW1ib2wgd2FzIHByZWNlZGVkIGJ5IHdoaXRlc3BhY2VcclxuICAgICAgICBpZiAoYmVmb3JlU3ltYm9sICE9PSAnXFx1MjAwQicgJiYgL1xcUy8udGVzdChiZWZvcmVTeW1ib2wpKSB7XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0Lmhhc1ByZXZpb3VzKCkgJiYgL1xcUyQvLnRlc3Qoc3RhcnQuZ2V0UHJldmlvdXMoKS5nZXRUZXh0KCkpKSB7XHJcbiAgICAgICAgLy8gV2hlbiB3b3JkU3RhcnQgaXMgPD0gMCwgd2UgbmVlZCB0byBjaGVjayB0aGUgcHJldmlvdXMgbm9kZSdzIHRleHQgdG8gc2VlIGlmIGl0IGVuZGVkIHdpdGggd2hpdGVzcGFjZSBvciBub3RcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB3b3JkRW5kID0gdGV4dC5pbmRleE9mKCcgJywgcmFuZ2Uuc3RhcnRPZmZzZXQgKyAxKTtcclxuICAgICAgaWYgKHdvcmRTdGFydCA9PT0gLTEpIHtcclxuICAgICAgICB3b3JkU3RhcnQgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh3b3JkRW5kID09PSAtMSkge1xyXG4gICAgICAgIHdvcmRFbmQgPSB0ZXh0Lmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRleHQuc3Vic3RyaW5nKHdvcmRTdGFydCwgd29yZEVuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VsZWN0aW9uIHN0YXJ0cyBhdCB0aGUgMCBpbmRleCBvZiB0aGUgdGV4dCBub2RlIG9yIHRoZXJlJ3Mgbm8gcHJldmlvdXMgdGV4dCBub2RlIGluIGNvbnRlbnRzXHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXBsYWNlcyB0aGUgd29yZCB0aGF0IHRoZSB1c2VyIGlzIG9uIHdpdGggdGhlIGdpdmVuIGh0bWwuXHJcbiAgICpcclxuICAgKiBDS0VkaXRvciBnaXZlcyB1cyBhY2Nlc3MgdG8gdGhlIGN1cnJlbnQgbGluZSBvZiBodG1sIGluIHRoZSBlZGl0b3IsIHNvIHdlIHJlcGxhY2UgdGhlIGNvbnRlbnQgb2ZcclxuICAgKiB0aGUgbGluZSwgcmVwbGFjaW5nIG9ubHkgdGhlIGN1cnJlbnQgd29yZC5cclxuICAgKi9cclxuICBwcml2YXRlIHJlcGxhY2VXb3JkQXRDdXJzb3IobmV3V29yZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBvcmlnaW5hbFdvcmQgPSB0aGlzLmdldFdvcmRBdEN1cnNvcigpLnRyaW0oKTtcclxuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5ja2VJbnN0YW5jZS5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZXMoKVswXTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XHJcbiAgICBjb25zdCBwYXJlbnROb2RlID0gc3RhcnQuZ2V0UGFyZW50KCk7XHJcblxyXG4gICAgaWYgKHN0YXJ0LnR5cGUgPT09IENLRURJVE9SLk5PREVfVEVYVCAmJiBwYXJlbnROb2RlKSB7XHJcbiAgICAgIGNvbnN0IGxpbmUgPSBwYXJlbnROb2RlLmdldEh0bWwoKTtcclxuICAgICAgY29uc3QgaW5kZXggPSBsaW5lLmxhc3RJbmRleE9mKG9yaWdpbmFsV29yZCk7XHJcblxyXG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIC8vIEFkZCBhIHNwYWNlIGFmdGVyIHRoZSByZXBsYWNlZCB3b3JkIHNvIHRoYXQgbXVsdGlwbGUgcmVmZXJlbmNlcyBjYW4gYmUgYWRkZWQgYmFjayB0byBiYWNrXHJcbiAgICAgICAgY29uc3QgbmV3TGluZSA9IGxpbmUuc3Vic3RyaW5nKDAsIGluZGV4KSArIG5ld1dvcmQgKyAnICcgKyBsaW5lLnN1YnN0cmluZyhpbmRleCArIG9yaWdpbmFsV29yZC5sZW5ndGgpO1xyXG4gICAgICAgIHBhcmVudE5vZGUuc2V0SHRtbChuZXdMaW5lKTtcclxuXHJcbiAgICAgICAgLy8gUGxhY2Ugc2VsZWN0aW9uIGF0IHRoZSBlbmQgb2YgdGhlIGxpbmVcclxuICAgICAgICByYW5nZS5tb3ZlVG9Qb3NpdGlvbihwYXJlbnROb2RlLCBDS0VESVRPUi5QT1NJVElPTl9CRUZPUkVfRU5EKTtcclxuICAgICAgICB0aGlzLmNrZUluc3RhbmNlLmdldFNlbGVjdGlvbigpLnNlbGVjdFJhbmdlcyhbcmFuZ2VdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBjdXJyZW50IHJlZmVyZW5jZXMsIG1pbnVzIGFueSBmcm9tIHRoZSBtb2RlbCB0aGF0IGhhdmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIGVkaXRvci5cclxuICAgKi9cclxuICBwcml2YXRlIHZhbGlkYXRlUmVmZXJlbmNlcygpOiB2b2lkIHtcclxuICAgIGxldCBodG1sID0gdGhpcy5ja2VJbnN0YW5jZS5kb2N1bWVudC5nZXRCb2R5KCkuZ2V0SHRtbCgpO1xyXG5cclxuICAgIC8vIENLRWRpdG9yIHN0b3BwZWQgc3VwcG9ydGluZyB0aGUgY29uZmlnLmZvcmNlU2ltcGxlQW1wZXJzYW5kIHNldHRpbmcsIHNvIHdlIGhhdmUgdG8gY29udmVydCAnJmFtcDsnIHRvICcmJ1xyXG4gICAgLy8gd2hlbiB3ZSBwdWxsIGh0bWwgZnJvbSB0aGUgZWRpdG9yIC0gc2VlOiBodHRwczovL2Rldi5ja2VkaXRvci5jb20vdGlja2V0LzEzNzIzXHJcbiAgICBjb25zdCBhbXBSZWdleCA9IG5ldyBSZWdFeHAoJyZhbXA7JywgJ2cnKTtcclxuICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoYW1wUmVnZXgsICcmJyk7XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy5tb2RlbC5yZWZlcmVuY2VzKS5mb3JFYWNoKCh0YWdnaW5nTW9kZSkgPT4ge1xyXG4gICAgICBjb25zdCBhcnJheSA9IHRoaXMubW9kZWwucmVmZXJlbmNlc1t0YWdnaW5nTW9kZV0gfHwgW107XHJcbiAgICAgIGNvbnN0IHN5bWJvbCA9IHRoaXMuY29uZmlnLnRyaWdnZXJzW3RhZ2dpbmdNb2RlXTtcclxuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKHRhZ2dpbmdNb2RlKTtcclxuXHJcbiAgICAgIHRoaXMubW9kZWwucmVmZXJlbmNlc1t0YWdnaW5nTW9kZV0gPSBhcnJheS5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCByZW5kZXJlZFRleHQgPSByZW5kZXJlcihzeW1ib2wsIGl0ZW0pO1xyXG4gICAgICAgIHJldHVybiBodG1sLmluY2x1ZGVzKHJlbmRlcmVkVGV4dCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSWYgbm8gcmVmZXJlbmNlcywgdGhlbiBkZWxldGUgdGhlIGtleVxyXG4gICAgICBpZiAodGhpcy5tb2RlbC5yZWZlcmVuY2VzW3RhZ2dpbmdNb2RlXS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5tb2RlbC5yZWZlcmVuY2VzW3RhZ2dpbmdNb2RlXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb25maWd1cmVzIHRoZSBDS0VkaXRvciBmb3IgUXVpY2tOb3RlIGZ1bmN0aW9uYWxpdHkuXHJcbiAgICpcclxuICAgKiBTZXRzIHRoZSBoZWlnaHQgb2YgdGhlIENLRWRpdG9yIGR5bmFtaWNhbGx5IHRvIHRoZSBoZWlnaHQgb2YgdGhlIHdyYXBwZXIgdXBvbiBpbml0aWFsaXphdGlvbi5cclxuICAgKiBSZW1vdmVzIHRoZSB0b29sYmFyIG9uIHRoZSBib3R0b20gYW5kIGNvbmZpZ3VyZXMgYSBzbGltbWVkIGRvd24gdmVyc2lvbiBvZiB0aGUgdG9vbGJhci5cclxuICAgKiBSZW1vdmVzIHBsdWdpbnMgYW5kIHR1cm5zIG9mZiBzZXR0aW5nIHRvIGFsbG93IGJyb3dzZXIgYmFzZWQgc3BlbGwgY2hlY2tpbmcuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRDS0VkaXRvckNvbmZpZygpOiBhbnkge1xyXG4gICAgLy8gVXNlIHRoZSBoZWlnaHQgb2YgdGhlIHdyYXBwZXIgZWxlbWVudCB0byBzZXQgdGhlIGluaXRpYWwgaGVpZ2h0IG9mIHRoZSBlZGl0b3IsIHRoZW5cclxuICAgIC8vIHNldCBpdCB0byAxMDAlIHRvIGFsbG93IHRoZSBlZGl0b3IgdG8gcmVzaXplIHVzaW5nIHRoZSBncmlwcHkuXHJcbiAgICBjb25zdCBlZGl0b3JIZWlnaHQgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgLSBRdWlja05vdGVFbGVtZW50LlRPT0xCQVJfSEVJR0hUO1xyXG4gICAgdGhpcy53cmFwcGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJ2hlaWdodCcsICcxMDAlJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZW50ZXJNb2RlOiBDS0VESVRPUi5FTlRFUl9CUixcclxuICAgICAgc2hpZnRFbnRlck1vZGU6IENLRURJVE9SLkVOVEVSX1AsXHJcbiAgICAgIGRpc2FibGVOYXRpdmVTcGVsbENoZWNrZXI6IGZhbHNlLFxyXG4gICAgICBoZWlnaHQ6IGVkaXRvckhlaWdodCxcclxuICAgICAgc3RhcnR1cEZvY3VzOiB0aGlzLnN0YXJ0dXBGb2N1cyxcclxuICAgICAgcmVtb3ZlUGx1Z2luczogJ2xpc3RzdHlsZSx0YWJsZXRvb2xzLGNvbnRleHRtZW51JywgLy8gYWxsb3dzIGJyb3dzZXIgYmFzZWQgc3BlbGwgY2hlY2tpbmdcclxuICAgICAgdG9vbGJhcjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdiYXNpY3N0eWxlcycsXHJcbiAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAnU3R5bGVzJyxcclxuICAgICAgICAgICAgJ0ZvbnRTaXplJyxcclxuICAgICAgICAgICAgJ0JvbGQnLFxyXG4gICAgICAgICAgICAnSXRhbGljJyxcclxuICAgICAgICAgICAgJ1VuZGVybGluZScsXHJcbiAgICAgICAgICAgICdUZXh0Q29sb3InLFxyXG4gICAgICAgICAgICAnLScsXHJcbiAgICAgICAgICAgICdOdW1iZXJlZExpc3QnLFxyXG4gICAgICAgICAgICAnQnVsbGV0ZWRMaXN0JyxcclxuICAgICAgICAgICAgJ091dGRlbnQnLFxyXG4gICAgICAgICAgICAnSW5kZW50JyxcclxuICAgICAgICAgICAgJ0xpbmsnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc2NyZWVuIHBvc2l0aW9uIG9mIHRoZSBjdXJzb3IgaW4gQ0tFZGl0b3IsIGFjY291bnRpbmcgZm9yIGFueSBzY3JvbGxpbmcgaW4gdGhlIGVkaXRvci5cclxuICAgKi9cclxuICBwcml2YXRlIGdldEN1cnNvclBvc2l0aW9uKCk6IGFueSB7XHJcbiAgICBjb25zdCByYW5nZSA9IHRoaXMuY2tlSW5zdGFuY2UuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VzKClbMF07XHJcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gcmFuZ2Uuc3RhcnRDb250YWluZXIuJC5wYXJlbnRFbGVtZW50O1xyXG4gICAgY29uc3QgZWRpdG9yRWxlbWVudCA9IHRoaXMuY2tlSW5zdGFuY2UuZWRpdGFibGUoKS4kO1xyXG5cclxuICAgIC8vIFNpbmNlIHRoZSBlZGl0b3IgaXMgYSB0ZXh0IG5vZGUgaW4gdGhlIERPTSB0aGF0IGRvZXMgbm90IGtub3cgYWJvdXQgaXQncyBwb3NpdGlvbiwgYSB0ZW1wb3JhcnkgZWxlbWVudCBoYXMgdG9cclxuICAgIC8vIGJlIGluc2VydGVkIGluIG9yZGVyIHRvIGxvY2F0ZSB0aGUgY3Vyc29yIHBvc2l0aW9uLlxyXG4gICAgY29uc3QgY3Vyc29yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgY3Vyc29yRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsICdudWxsJyk7XHJcbiAgICBjdXJzb3JFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMCcpO1xyXG4gICAgY3Vyc29yRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcwJyk7XHJcblxyXG4gICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChjdXJzb3JFbGVtZW50KTtcclxuICAgIGNvbnN0IGN1cnNvclBvc2l0aW9uID0ge1xyXG4gICAgICB0b3A6IGN1cnNvckVsZW1lbnQub2Zmc2V0VG9wIC0gZWRpdG9yRWxlbWVudC5zY3JvbGxUb3AsXHJcbiAgICAgIGxlZnQ6IGN1cnNvckVsZW1lbnQub2Zmc2V0TGVmdCAtIGVkaXRvckVsZW1lbnQuc2Nyb2xsTGVmdCxcclxuICAgIH07XHJcbiAgICBjdXJzb3JFbGVtZW50LnJlbW92ZSgpO1xyXG5cclxuICAgIHJldHVybiBjdXJzb3JQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBvc2l0aW9ucyB0aGUgcmVzdWx0cyBkcm9wZG93biBiYXNlZCBvbiB0aGUgbG9jYXRpb24gb2YgdGhlIGN1cnNvciBpbiB0aGUgdGV4dCBmaWVsZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcG9zaXRpb25SZXN1bHRzRHJvcGRvd24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBNSU5fTUFSR0lOX1RPUDogbnVtYmVyID0gUXVpY2tOb3RlRWxlbWVudC5UT09MQkFSX0hFSUdIVCAqIDI7XHJcbiAgICBjb25zdCBNQVhfTUFSR0lOX1RPUDogbnVtYmVyID0gdGhpcy5nZXRDb250ZW50SGVpZ2h0KCkgKyBRdWlja05vdGVFbGVtZW50LlRPT0xCQVJfSEVJR0hUO1xyXG5cclxuICAgIGNvbnN0IGN1cnNvclBvc2l0aW9uID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xyXG4gICAgbGV0IG1hcmdpblRvcDogbnVtYmVyID0gY3Vyc29yUG9zaXRpb24udG9wICsgUXVpY2tOb3RlRWxlbWVudC5UT09MQkFSX0hFSUdIVDtcclxuXHJcbiAgICAvLyBDaGVjayB0aGF0IHRoZSBtYXJnaW4gaXMgd2l0aGluIHRoZSB2aXNpYmxlIGJvdW5kc1xyXG4gICAgbWFyZ2luVG9wID0gTWF0aC5tYXgobWFyZ2luVG9wLCBNSU5fTUFSR0lOX1RPUCk7XHJcbiAgICBtYXJnaW5Ub3AgPSBNYXRoLm1pbihtYXJnaW5Ub3AsIE1BWF9NQVJHSU5fVE9QKTtcclxuXHJcbiAgICAvLyBTZXQgdGhlIG1hcmdpbi10b3Agb2YgdGhlIGRyb3Bkb3duXHJcbiAgICB0aGlzLnF1aWNrTm90ZVJlc3VsdHMuaW5zdGFuY2UuZWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCdtYXJnaW4tdG9wJywgbWFyZ2luVG9wICsgJ3B4Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgaW4gcGl4ZWxzIG9mIHRoZSBjb250ZW50IGFyZWEgLSB0aGUgdGV4dCB0aGF0IHRoZSB1c2VyIGhhcyBlbnRlcmVkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Q29udGVudEhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgbGV0IGNvbnRlbnRIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY2tlSW5zdGFuY2UudWkgJiZcclxuICAgICAgdGhpcy5ja2VJbnN0YW5jZS51aS5jb250ZW50c0VsZW1lbnQgJiZcclxuICAgICAgdGhpcy5ja2VJbnN0YW5jZS51aS5jb250ZW50c0VsZW1lbnQuJCAmJlxyXG4gICAgICB0aGlzLmNrZUluc3RhbmNlLnVpLmNvbnRlbnRzRWxlbWVudC4kLnN0eWxlXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgY3NzVGV4dDogc3RyaW5nID0gdGhpcy5ja2VJbnN0YW5jZS51aS5jb250ZW50c0VsZW1lbnQuJC5zdHlsZS5jc3NUZXh0O1xyXG4gICAgICBpZiAoY3NzVGV4dC5pbmRleE9mKCdoZWlnaHQ6ICcpICE9PSAtMSkge1xyXG4gICAgICAgIGxldCBoZWlnaHQ6IHN0cmluZyA9IGNzc1RleHQuc3BsaXQoJ2hlaWdodDogJylbMV07XHJcbiAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0LnNwbGl0KCdweCcpWzBdO1xyXG4gICAgICAgIGNvbnRlbnRIZWlnaHQgPSBwYXJzZUludChoZWlnaHQsIDEwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbnRlbnRIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IHRoZSBwbGFjZWhvbGRlciB0ZXh0IGlmIHRoZSBlZGl0b3IgaXMgZW1wdHlcclxuICAgKi9cclxuICBwcml2YXRlIHNob3dQbGFjZWhvbGRlcigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5ja2VJbnN0YW5jZS5nZXREYXRhKCkgJiYgIXRoaXMuc3RhcnR1cEZvY3VzKSB7XHJcbiAgICAgIHRoaXMuY2tlSW5zdGFuY2VcclxuICAgICAgICAuZWRpdGFibGUoKVxyXG4gICAgICAgIC5nZXRQYXJlbnQoKVxyXG4gICAgICAgIC4kLmFwcGVuZENoaWxkKHRoaXMucGxhY2Vob2xkZXJFbGVtZW50KTtcclxuICAgICAgdGhpcy5wbGFjZWhvbGRlclZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSB0aGUgcGxhY2Vob2xkZXIgdGV4dCBieSByZW1vdmluZyB0aGUgcGxhY2Vob2xkZXIgZWxlbWVudCBmcm9tIHRoZSBET01cclxuICAgKi9cclxuICBwcml2YXRlIGhpZGVQbGFjZWhvbGRlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyVmlzaWJsZSkge1xyXG4gICAgICB0aGlzLmNrZUluc3RhbmNlXHJcbiAgICAgICAgLmVkaXRhYmxlKClcclxuICAgICAgICAuZ2V0UGFyZW50KClcclxuICAgICAgICAuJC5yZW1vdmVDaGlsZCh0aGlzLnBsYWNlaG9sZGVyRWxlbWVudCk7XHJcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgb3IgY3JlYXRlIHRoZSBzaW5nbGUgcGxhY2Vob2xkZXIgb2JqZWN0IHRoYXQgaXMgY29uc3RydWN0ZWQgb25seSB3aGVuIG5lZWRlZC5cclxuICAgKi9cclxuICBwcml2YXRlIGdldCBwbGFjZWhvbGRlckVsZW1lbnQoKTogYW55IHtcclxuICAgIGlmICghdGhpcy5fcGxhY2Vob2xkZXJFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLl9wbGFjZWhvbGRlckVsZW1lbnQuY2xhc3NOYW1lID0gJ3BsYWNlaG9sZGVyJztcclxuICAgICAgdGhpcy5fcGxhY2Vob2xkZXJFbGVtZW50LnN0eWxlLmNzc1RleHQgPVxyXG4gICAgICAgICdtYXJnaW46IDIwcHg7IGNvbG9yOiAjQUFBQUFBOyBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgZm9udC1zaXplOiAxM3B4OyBsaW5lLWhlaWdodDogMjBweDsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDAnO1xyXG4gICAgICB0aGlzLl9wbGFjZWhvbGRlckVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLnBsYWNlaG9sZGVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyRWxlbWVudDtcclxuICB9XHJcbn1cclxuIl19