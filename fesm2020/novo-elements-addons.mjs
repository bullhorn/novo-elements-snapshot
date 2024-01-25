import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, Input, Output, NgModule, ViewChild, HostBinding, HostListener, Injectable, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as ace from 'brace';
import 'brace/ext/language_tools.js';
import 'brace/mode/javascript';
import 'brace/theme/chrome';
import { notify, Helpers } from 'novo-elements/utils';
import { CommonModule } from '@angular/common';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { Annotation, EditorState } from '@codemirror/state';
import { keymap, EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import dragula from '@bullhorn/dragula';

// NG2
const ACE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoAceEditor),
    multi: true,
};
/**
 * @deprecated Use NovoCodeEditor instead
 */
class NovoAceEditor {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._options = {
            showPrintMargin: false,
            displayIndentGuides: true,
        };
        this._theme = 'chrome';
        this._mode = 'javascript';
        this.text = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
        notify('[Deprecated]: The ace editor component is deprecated. Please migrate to novo-code-editor!');
    }
    set theme(theme) {
        this.setTheme(theme);
    }
    set options(options) {
        this.setOptions(options);
    }
    set mode(mode) {
        this.setMode(mode);
    }
    ngOnDestroy() {
        if (this.editor) {
            this.editor.destroy();
        }
    }
    ngOnInit() {
        this.initializeEditor();
        this.initializeOptions();
        this.initializeEvents();
    }
    initializeEditor() {
        const el = this.elementRef.nativeElement;
        this.editor = ace.edit(el);
        this.editor.$blockScrolling = Infinity;
    }
    initializeOptions() {
        this.setOptions(this._options || {});
        this.setTheme(this._theme);
        this.setMode(this._mode);
    }
    initializeEvents() {
        this.editor.on('focus', (event) => this.focus.emit(event));
        this.editor.on('blur', (event) => this.focus.emit(event));
        this.editor.on('change', () => this.updateText());
        this.editor.on('paste', () => this.updateText());
    }
    updateText() {
        const newVal = this.editor.getValue();
        if (newVal === this.oldText) {
            return;
        }
        this.text = newVal;
        this.onChange(newVal);
        this.oldText = newVal;
    }
    setText(text) {
        if (Helpers.isBlank(text)) {
            text = '';
        }
        if (this.text !== text) {
            this.text = text;
            this.editor.setValue(text);
            this.onChange(text);
            this.editor.clearSelection();
        }
    }
    setOptions(options) {
        this._options = options;
        this.editor.setOptions(options || {});
    }
    setTheme(theme) {
        this._theme = theme;
        this.editor.setTheme(`ace/theme/${theme}`);
    }
    setMode(mode) {
        this._mode = mode;
        this.editor.getSession().setMode(`ace/mode/${this._mode}`);
    }
    writeValue(value) {
        this.setText(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
NovoAceEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoAceEditor, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoAceEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoAceEditor, selector: "novo-ace-editor", inputs: { theme: "theme", options: "options", mode: "mode", name: "name" }, outputs: { blur: "blur", focus: "focus" }, providers: [ACE_VALUE_ACCESSOR], ngImport: i0, template: '', isInline: true, styles: [":host{display:block;width:100%;min-height:200px}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoAceEditor, decorators: [{
            type: Component,
            args: [{ selector: 'novo-ace-editor', template: '', providers: [ACE_VALUE_ACCESSOR], styles: [":host{display:block;width:100%;min-height:200px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], options: [{
                type: Input
            }], mode: [{
                type: Input
            }], name: [{
                type: Input
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }] } });

// NG2
class NovoAceEditorModule {
}
NovoAceEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoAceEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoAceEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NovoAceEditorModule, declarations: [NovoAceEditor], imports: [CommonModule], exports: [NovoAceEditor] });
NovoAceEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoAceEditorModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoAceEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoAceEditor],
                    exports: [NovoAceEditor],
                }]
        }] });

// NG2
// Value accessor for the component (supports ngModel)
const CKEDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCKEditorElement),
    multi: true,
};
// Prevents CKEDITOR from querying the page for all [contenteditable] elements (fixes a conflict against Codemirror Editor)
try {
    CKEDITOR.disableAutoInline = true;
}
catch (err) {
    // may be running in a context without CKEDITOR - ignore
}
/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
class NovoCKEditorElement {
    constructor(zone) {
        this.zone = zone;
        this.startupFocus = false;
        this.fileBrowserImageUploadUrl = '';
        this.disabled = false;
        this.change = new EventEmitter();
        this.ready = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.paste = new EventEmitter();
        this.loaded = new EventEmitter();
        this._value = '';
    }
    get value() {
        return this._value;
    }
    set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }
    ngOnDestroy() {
        if (this.instance) {
            this.instance.focusManager.blur(true); // Remove focus from editor
            setTimeout(() => {
                this.instance.removeAllListeners();
                const aInstance = CKEDITOR.instances[this.instance.name];
                if (aInstance) {
                    aInstance.destroy();
                }
                this.instance.destroy();
                this.instance = null;
            });
        }
    }
    ngAfterViewInit() {
        const config = Object.assign(this.getBaseConfig(), this.config);
        if (this.startupFocus) {
            config.startupFocus = true;
        }
        if (this.disabled) {
            config.readOnly = true;
        }
        this.ckeditorInit(config);
    }
    updateValue(value) {
        this.zone.run(() => {
            this.value = value;
            this.onChange(value);
            this.onTouched();
            this.change.emit(value);
        });
    }
    ckeditorInit(config) {
        if (!CKEDITOR) {
            console.error('Make sure to include CKEditor sources in your dependencies!');
            return;
        }
        // CKEditor replace textarea
        this.instance = CKEDITOR.replace(this.host.nativeElement, config);
        // Set initial value
        this.instance.setData(this.value);
        // listen for instanceReady event
        this.instance.on('instanceReady', (evt) => {
            // send the evt to the EventEmitter
            this.ready.emit(evt);
        });
        // CKEditor change event
        this.instance.on('change', () => {
            this.onTouched();
            const value = this.instance.getData();
            // Debounce update
            if (this.debounce) {
                if (this.debounceTimeout) {
                    clearTimeout(this.debounceTimeout);
                }
                this.debounceTimeout = setTimeout(() => {
                    this.updateValue(value);
                    this.debounceTimeout = null;
                }, parseInt(this.debounce, 10));
            }
            else {
                this.updateValue(value);
            }
        });
        this.instance.on('blur', (event) => {
            this.blur.emit(event);
        });
        this.instance.on('focus', (event) => {
            this.focus.emit(event);
        });
        this.instance.on('paste', (event) => {
            this.paste.emit(event);
        });
        this.instance.on('loaded', (event) => {
            this.loaded.emit(event);
        });
    }
    getBaseConfig() {
        const baseConfig = {
            enterMode: CKEDITOR.ENTER_BR,
            entities: false,
            shiftEnterMode: CKEDITOR.ENTER_P,
            disableNativeSpellChecker: false,
            removePlugins: 'liststyle,tabletools,contextmenu,tableselection',
            extraAllowedContent: '*(*){*};table tbody tr td th[*];',
            font_names: 'Arial/Arial, Helvetica, sans-serif;' +
                'Calibri/Calibri, Verdana, Geneva, sans-serif;' +
                'Comic Sans MS/Comic Sans MS, cursive;' +
                'Courier New/Courier New, Courier, monospace;' +
                'Georgia/Georgia, serif;' +
                'Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
                'Tahoma/Tahoma, Geneva, sans-serif;' +
                'Times New Roman/Times New Roman, Times, serif;' +
                'Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;' +
                'Verdana/Verdana, Geneva, sans-serif',
        };
        const minimalConfig = {
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
        const extendedConfig = {
            toolbar: [
                { name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo'] },
                {
                    name: 'paragraph',
                    items: [
                        'NumberedList',
                        'BulletedList',
                        'Outdent',
                        'Indent',
                        'Blockquote',
                        'JustifyLeft',
                        'JustifyCenter',
                        'JustifyRight',
                        'JustifyBlock',
                        'BidiLtr',
                        'BidiRtl',
                    ],
                },
                { name: 'links', items: ['Link'] },
                { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
                { name: 'tools', items: ['Maximize', 'Source'] },
                '/',
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
            ],
            filebrowserImageUploadUrl: this.fileBrowserImageUploadUrl,
        };
        return Object.assign(baseConfig, this.minimal ? minimalConfig : extendedConfig);
    }
    writeValue(value) {
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        }
    }
    onChange(value) { }
    onTouched(event) { }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
        if (this.instance) {
            CKEDITOR.instances[this.instance.name].setReadOnly(disabled);
        }
    }
    insertText(text) {
        const trimmedText = text.trim();
        this.instance.insertText(trimmedText);
    }
}
NovoCKEditorElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoCKEditorElement, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NovoCKEditorElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoCKEditorElement, selector: "novo-editor", inputs: { config: "config", debounce: "debounce", name: "name", minimal: "minimal", startupFocus: "startupFocus", fileBrowserImageUploadUrl: "fileBrowserImageUploadUrl", disabled: "disabled", value: "value" }, outputs: { change: "change", ready: "ready", blur: "blur", focus: "focus", paste: "paste", loaded: "loaded" }, providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR], viewQueries: [{ propertyName: "host", first: true, predicate: ["host"], descendants: true }], ngImport: i0, template: '<textarea [name]="name" [id]="name" #host></textarea>', isInline: true, styles: [":host ::ng-deep .cke{font:inherit!important;box-shadow:none;border-color:var(--background-muted)}:host ::ng-deep .cke .cke_top,:host ::ng-deep .cke .cke_bottom{background:var(--background-muted) none;box-shadow:none}:host ::ng-deep .cke .cke_bottom{border-top:none}.cke_dialog_background_cover{background-color:#000!important}.cke_dialog .cke_dialog_title{text-shadow:none;background:var(--background-muted) none;box-shadow:none;border-bottom:none}.cke_dialog .cke_dialog_footer{text-shadow:none;background:var(--background-muted) none;box-shadow:none;border-top:none}:host-context(.theme-dark) ::ng-deep .cke_button{filter:invert(1)}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:hover,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:active,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:focus,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button.cke_combo_on{background:var(--background-main);border:1px solid var(--border)}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button .cke_combo_text{color:#fff}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button .cke_combo_arrow{border-top-color:#fff}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoCKEditorElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-editor', providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR], template: '<textarea [name]="name" [id]="name" #host></textarea>', styles: [":host ::ng-deep .cke{font:inherit!important;box-shadow:none;border-color:var(--background-muted)}:host ::ng-deep .cke .cke_top,:host ::ng-deep .cke .cke_bottom{background:var(--background-muted) none;box-shadow:none}:host ::ng-deep .cke .cke_bottom{border-top:none}.cke_dialog_background_cover{background-color:#000!important}.cke_dialog .cke_dialog_title{text-shadow:none;background:var(--background-muted) none;box-shadow:none;border-bottom:none}.cke_dialog .cke_dialog_footer{text-shadow:none;background:var(--background-muted) none;box-shadow:none;border-top:none}:host-context(.theme-dark) ::ng-deep .cke_button{filter:invert(1)}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:hover,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:active,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:focus,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button.cke_combo_on{background:var(--background-main);border:1px solid var(--border)}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button .cke_combo_text{color:#fff}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button .cke_combo_arrow{border-top-color:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; }, propDecorators: { config: [{
                type: Input
            }], debounce: [{
                type: Input
            }], name: [{
                type: Input
            }], minimal: [{
                type: Input
            }], startupFocus: [{
                type: Input
            }], fileBrowserImageUploadUrl: [{
                type: Input
            }], disabled: [{
                type: Input
            }], change: [{
                type: Output
            }], ready: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], paste: [{
                type: Output
            }], loaded: [{
                type: Output
            }], host: [{
                type: ViewChild,
                args: ['host']
            }], value: [{
                type: Input
            }] } });

// NG2
class NovoNovoCKEditorModule {
}
NovoNovoCKEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoNovoCKEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoNovoCKEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NovoNovoCKEditorModule, declarations: [NovoCKEditorElement], imports: [CommonModule, FormsModule], exports: [NovoCKEditorElement] });
NovoNovoCKEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoNovoCKEditorModule, imports: [CommonModule, FormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoNovoCKEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [NovoCKEditorElement],
                    exports: [NovoCKEditorElement],
                }]
        }] });

// NG2
// organize-imports-ignore
// APP
const CODE_EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCodeEditor),
    multi: true,
};
// CodeMirror transaction annotation to show changes that came in through writeValue (FormControl value) as opposed to UI editing
const FormControlCodeWriter = Annotation.define();
// (This is a replacement for the "novo-ace-editor". Notably, we are no longer naming it based on the underlying component. It is possible, in the future,
// we decide there is another code editing component that better fits our use case - in which situation we should replace the implementation here, but keep its name)
class NovoCodeEditor {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.theme = 'default';
        this.lineNumbers = true;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.changed = new EventEmitter();
        this.mode = 'javascript';
        this.initialValue = '';
        this.disabled = false;
    }
    ngOnInit() {
    }
    ngOnDestroy() {
    }
    ngAfterViewInit() {
        this.createEditorView();
    }
    createEditorView() {
        const extensions = [
            basicSetup,
            keymap.of(defaultKeymap)
        ];
        if (this.mode === 'javascript') {
            extensions.push(javascript());
        }
        const initialEditorState = EditorState.create({
            doc: this.initialValue,
            extensions,
        });
        this.editorView = new EditorView({
            state: initialEditorState,
            parent: this.elementRef.nativeElement,
            dispatch: (transaction, view) => {
                // Prevent changes if the form is disabled - unless the change came from writeValue function
                if (transaction.annotation(FormControlCodeWriter) || !(this.disabled && transaction.docChanged)) {
                    view.update([transaction]);
                }
                if (transaction.docChanged) {
                    this.changed.emit(view.state.doc.toString());
                }
            }
        });
    }
    onFocus() {
        this.focus.emit();
    }
    onBlur() {
        this.blur.emit();
    }
    // ControlValueAccessor forward implementation
    writeValue(value) {
        if (this.editorView) {
            this.editorView.dispatch({
                changes: {
                    from: 0,
                    to: this.editorView.state.doc.length,
                    insert: value,
                },
                annotations: FormControlCodeWriter.of({}),
            });
        }
        else if (value != null) {
            this.initialValue = value;
        }
    }
    registerOnChange(fn) {
        this.changed.subscribe(fn);
    }
    registerOnTouched(fn) {
        this.blur.subscribe(fn);
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
NovoCodeEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoCodeEditor, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoCodeEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoCodeEditor, selector: "novo-code-editor", inputs: { theme: "theme", lineNumbers: "lineNumbers", name: "name", mode: "mode" }, outputs: { blur: "blur", focus: "focus" }, host: { listeners: { "focus": "onFocus()", "blur": "onBlur()" }, properties: { "class.editor-disabled": "this.disabled" } }, providers: [CODE_EDITOR_VALUE_ACCESSOR], viewQueries: [{ propertyName: "editorRoot", first: true, predicate: ["editorRoot"], descendants: true }], ngImport: i0, template: '', isInline: true, styles: [":host{height:200px;display:block;overflow:auto}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoCodeEditor, decorators: [{
            type: Component,
            args: [{ selector: 'novo-code-editor', template: '', providers: [CODE_EDITOR_VALUE_ACCESSOR], styles: [":host{height:200px;display:block;overflow:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], lineNumbers: [{
                type: Input
            }], name: [{
                type: Input
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], mode: [{
                type: Input
            }], editorRoot: [{
                type: ViewChild,
                args: ['editorRoot']
            }], disabled: [{
                type: HostBinding,
                args: ['class.editor-disabled']
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });

class NovoCodeEditorModule {
}
NovoCodeEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoCodeEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCodeEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NovoCodeEditorModule, declarations: [NovoCodeEditor], imports: [CommonModule, FormsModule], exports: [NovoCodeEditor] });
NovoCodeEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoCodeEditorModule, imports: [CommonModule, FormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoCodeEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [NovoCodeEditor],
                    exports: [NovoCodeEditor]
                }]
        }] });

// NG2
/**
* @deprecated since v8.0.0 - slated for deletion.
*
* Moving away from all CommonJS dependencies to improve tree-shaking.
*
* Please look at built-in ng or third party drag-drop libraries like
* angular-draggable-droppable, ngx-drag-drop, ngx-sortablejs, ng2-dragula.
*/
class NovoDragulaService {
    constructor() {
        this.cancel = new EventEmitter();
        this.cloned = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragend = new EventEmitter();
        this.drop = new EventEmitter();
        this.out = new EventEmitter();
        this.over = new EventEmitter();
        this.remove = new EventEmitter();
        this.shadow = new EventEmitter();
        this.dropModel = new EventEmitter();
        this.removeModel = new EventEmitter();
        this.events = ['cancel', 'cloned', 'drag', 'dragend', 'drop', 'out', 'over', 'remove', 'shadow', 'dropModel', 'removeModel'];
        this.bags = [];
    }
    add(name, drake) {
        let bag = this.find(name);
        if (bag) {
            throw new Error(`Bag named: ${name} already exists.`);
        }
        bag = {
            name,
            drake,
        };
        this.bags.push(bag);
        if (drake.models) {
            // models to sync with (must have same structure as containers)
            this.handleModels(name, drake);
        }
        if (!bag.initEvents) {
            this.setupEvents(bag);
        }
        return bag;
    }
    find(name) {
        for (let i = 0; i < this.bags.length; i++) {
            if (this.bags[i].name === name) {
                return this.bags[i];
            }
        }
        return null;
    }
    destroy(name) {
        const bag = this.find(name);
        const i = this.bags.indexOf(bag);
        this.bags.splice(i, 1);
        bag.drake.destroy();
    }
    setOptions(name, options) {
        const bag = this.add(name, dragula(options));
        this.handleModels(name, bag.drake);
    }
    handleModels(name, drake) {
        let dragElm;
        let dragIndex;
        let dropIndex;
        let sourceModel;
        drake.on('remove', (el, source) => {
            if (!drake.models) {
                return;
            }
            sourceModel = drake.models[drake.containers.indexOf(source)];
            sourceModel.splice(dragIndex, 1);
            this.removeModel.emit([name, el, source]);
        });
        drake.on('drag', (el, source) => {
            dragElm = el;
            dragIndex = this.domIndexOf(el, source);
        });
        drake.on('drop', (dropElm, target, source) => {
            if (!drake.models) {
                return;
            }
            dropIndex = this.domIndexOf(dropElm, target);
            sourceModel = drake.models[drake.containers.indexOf(source)];
            if (target === source) {
                sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
            }
            else {
                const notCopy = dragElm === dropElm;
                const targetModel = drake.models[drake.containers.indexOf(target)];
                const dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));
                if (notCopy) {
                    sourceModel.splice(dragIndex, 1);
                }
                targetModel.splice(dropIndex, 0, dropElmModel);
                target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
            }
            this.dropModel.emit([name, dropElm, target, source]);
        });
    }
    setupEvents(bag) {
        bag.initEvents = true;
        const that = this;
        const emitter = (type) => {
            function replicate() {
                const args = Array.prototype.slice.call(arguments);
                that[type].emit([bag.name].concat(args));
            }
            bag.drake.on(type, replicate);
        };
        this.events.forEach(emitter);
    }
    domIndexOf(child, parent) {
        return Array.prototype.indexOf.call(parent.children, child);
    }
}
NovoDragulaService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDragulaService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NovoDragulaService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDragulaService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDragulaService, decorators: [{
            type: Injectable
        }] });

// NG2
/**
* @deprecated since v8.0.0 - slated for deletion.
*
* Moving away from all CommonJS dependencies to improve tree-shaking.
*
* Please look at built-in ng or third party drag-drop libraries like
* angular-draggable-droppable, ngx-drag-drop, ngx-sortablejs, ng2-dragula.
*/
class NovoDragulaElement {
    constructor(element, dragulaService) {
        this.dragulaService = dragulaService;
        this.drake = null;
        notify('[dragula] has been deprecated - please look at built-in ng or third party drag-drop libraries instead');
        this.container = element.nativeElement;
    }
    ngOnInit() {
        const bag = this.dragulaService.find(this.bag);
        if (bag) {
            this.drake = bag.drake;
            this.checkModel();
            this.drake.containers.push(this.container);
        }
        else {
            this.drake = dragula({
                containers: [this.container],
            });
            this.checkModel();
            this.dragulaService.add(this.bag, this.drake);
        }
    }
    checkModel() {
        if (this.dragulaModel) {
            if (this.drake.models) {
                this.drake.models.push(this.dragulaModel);
            }
            else {
                this.drake.models = [this.dragulaModel];
            }
        }
    }
    ngOnChanges(changes) {
        if (changes && changes.dragulaModel) {
            if (this.drake) {
                if (this.drake.models) {
                    const modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
                    this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
                }
                else {
                    this.drake.models = [changes.dragulaModel.currentValue];
                }
            }
        }
    }
}
NovoDragulaElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDragulaElement, deps: [{ token: i0.ElementRef }, { token: NovoDragulaService }], target: i0.ɵɵFactoryTarget.Directive });
NovoDragulaElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: NovoDragulaElement, selector: "[dragula]", inputs: { bag: ["dragula", "bag"], dragulaModel: "dragulaModel" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDragulaElement, decorators: [{
            type: Directive,
            args: [{
                    selector: '[dragula]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: NovoDragulaService }]; }, propDecorators: { bag: [{
                type: Input,
                args: ['dragula']
            }], dragulaModel: [{
                type: Input
            }] } });

// NG2
/**
* @deprecated since v8.0.0 - slated for deletion.
*
* Moving away from all CommonJS dependencies to improve tree-shaking.
*
* Please look at built-in ng or third party drag-drop libraries like
* angular-draggable-droppable, ngx-drag-drop, ngx-sortablejs, ng2-dragula.
*/
class NovoDragulaModule {
}
NovoDragulaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDragulaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDragulaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NovoDragulaModule, declarations: [NovoDragulaElement], exports: [NovoDragulaElement] });
NovoDragulaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDragulaModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDragulaModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NovoDragulaElement],
                    exports: [NovoDragulaElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoAceEditor, NovoAceEditorModule, NovoCKEditorElement, NovoCodeEditor, NovoCodeEditorModule, NovoDragulaElement, NovoDragulaModule, NovoDragulaService, NovoNovoCKEditorModule };
//# sourceMappingURL=novo-elements-addons.mjs.map
