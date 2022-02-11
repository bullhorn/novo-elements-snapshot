// NG
import { ActiveDescendantKeyManager, FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, NgZone, Optional, Output, QueryList, Self, ViewChild, ViewChildren, } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
// Vendor
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
// App
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils';
import { ErrorStateMatcher, mixinDisabled, mixinErrorState, mixinOverlay, mixinRequired, mixinTabIndex, NovoOptgroup, NovoOption, NOVO_OPTION_PARENT_COMPONENT, _countGroupLabelsBeforeOption, _getOptionScrollPosition, } from '../common';
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import { NovoFieldControl } from '../field';
// Value accessor for the component (supports ngModel)
// const SELECT_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => NovoSelectElement),
//   multi: true,
// };
/** Change event object that is emitted when the select value has changed. */
export class NovoSelectChange {
    constructor(
    /** Reference to the select that emitted the change event. */
    source, 
    /** Current value of the select that emitted the event. */
    value) {
        this.source = source;
        this.value = value;
    }
}
// Create Base Class from Mixins
// Boilerplate for applying mixins
class NovoSelectBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const NovoSelectMixins = mixinOverlay(mixinTabIndex(mixinRequired(mixinDisabled(mixinErrorState(NovoSelectBase)))));
let nextId = 0;
export class NovoSelectElement extends NovoSelectMixins {
    constructor(elementRef, labels, ref, focusMonitor, ngZone, defaultErrorStateMatcher, ngControl, _parentForm, _parentFormGroup) {
        super(defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.labels = labels;
        this.ref = ref;
        this.focusMonitor = focusMonitor;
        this.ngZone = ngZone;
        this._uniqueId = `novo-select-${++nextId}`;
        this._stateChanges = Subscription.EMPTY;
        this._activeOptionChanges = Subscription.EMPTY;
        this._selectedOptionChanges = Subscription.EMPTY;
        this._destroy = new Subject();
        this.controlType = 'select';
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        /** Tab index for the chip list. */
        this._tabIndex = 0;
        /** User defined tab index. */
        this._userTabIndex = null;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.placeholder = 'Select...';
        this.position = 'center';
        this.onSelect = new EventEmitter();
        /** Event emitted when the selected value has been changed by the user. */
        this.selectionChange = new EventEmitter();
        /** Event that emits whenever the raw value of the select changes.*/
        this.valueChange = new EventEmitter();
        /** Event emitted when the select panel has been toggled. */
        this.openedChange = new EventEmitter();
        /** Event emitted when the select has been opened. */
        this._openedStream = this.openedChange.pipe(filter((o) => o), map(() => { }));
        /** Event emitted when the select has been closed. */
        this._closedStream = this.openedChange.pipe(filter((o) => !o), map(() => { }));
        /** Function that maps an option's control value to its display value in the trigger. */
        this.displayWith = null;
        /** * Function to compare the option values with the selected values. */
        this.compareWith = (o1, o2) => o1 === o2 || o1 === o2.id || (!Helpers.isEmpty(o1.id) && !Helpers.isEmpty(o2.id) && o1.id === o2.id);
        this.header = {
            open: false,
            valid: true,
            value: '',
        };
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.filterTerm = '';
        this.disabled = false;
        this._value = null;
        this._multiple = false;
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
        this._selectionModel = new SelectionModel(this.multiple);
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get value() {
        return this._value;
    }
    set value(newValue) {
        // Always re-assign an array, because it might have been mutated.
        if (newValue !== this._value || (this._multiple && Array.isArray(newValue))) {
            if (this.options) {
                this._setSelectionByValue(newValue);
            }
            this._value = newValue;
        }
    }
    /** Whether the user should be allowed to select multiple options. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
        this.position = 'above-below';
    }
    /** Whether any radio buttons has focus. */
    get focused() {
        // todo: implement this.
        return false;
    }
    /** Implemented as part of NovoFieldControl. */
    get empty() {
        return this._value === null;
    }
    /** The currently selected option. */
    get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }
    /** The value displayed in the trigger. */
    get displayValue() {
        if (this.empty) {
            return '';
        }
        if (this._multiple) {
            const selectedOptions = this._selectionModel.selected.map((option) => this._getDisplayValue(option));
            return selectedOptions.join(', ');
        }
        return this._getDisplayValue(this._selectionModel.selected[0]);
    }
    ngOnInit() {
        this.stateChanges.next();
        this._initLegacyOptions();
        this.focusMonitor.monitor(this.dropdown.nativeElement).subscribe((origin) => this.ngZone.run(() => {
            if (origin === 'keyboard' && !this.disabled) {
                this.openPanel();
            }
        }));
    }
    ngOnChanges(changes) {
        // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
        // the parent form field know to run change detection when the disabled state changes.
        if (changes === null || changes === void 0 ? void 0 : changes.disabled) {
            this.stateChanges.next();
        }
        if (changes === null || changes === void 0 ? void 0 : changes.multiple) {
            // TODO: copy selection over??
            this._selectionModel = new SelectionModel(this.multiple);
        }
        this._initLegacyOptions();
    }
    ngAfterViewInit() {
        // Initialize KeyManager to manage keyboard events
        this._initKeyManager();
        // Subscribe to NovoOption selections
        this._watchSelectionEvents();
        // Set initial value
        this._initializeSelection();
        // Listen to selection changes to select and deselect options
        this._selectionModel.changed.pipe(takeUntil(this._destroy)).subscribe((event) => {
            event.added.forEach((option) => {
                if (option.select) {
                    option.select();
                }
            });
            event.removed.forEach((option) => {
                if (option.deselect) {
                    option.deselect();
                }
            });
        });
        // Listen to QueryList changes
        merge(this.contentOptions.changes, this.viewOptions.changes)
            .pipe(takeUntil(this._destroy))
            .subscribe(() => {
            this._watchSelectionEvents();
            this._initializeSelection();
        });
        merge(this.overlay.opening, this.overlay.closing)
            .pipe(takeUntil(this._destroy))
            .subscribe(() => {
            this.openedChange.emit(this.panelOpen);
        });
    }
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
        this._stateChanges.unsubscribe();
        this._activeOptionChanges.unsubscribe();
        this._selectedOptionChanges.unsubscribe();
        this.focusMonitor.stopMonitoring(this.dropdown.nativeElement);
    }
    openPanel() {
        super.openPanel();
        this._highlightCorrectOption();
    }
    _initializeSelection() {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(() => {
            this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);
            this.stateChanges.next();
        });
    }
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    _setSelectionByValue(value) {
        this._selectionModel.selected.forEach((option) => {
            if (option.setInactiveStyles) {
                option.setInactiveStyles();
            }
        });
        this._selectionModel.clear();
        if (this.multiple && value) {
            value.forEach((currentValue) => this._selectValue(currentValue));
            this._sortValues();
        }
        else if (this._keyManager) {
            const correspondingOption = this._selectValue(value);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this._keyManager.updateActiveItem(correspondingOption);
            }
            else if (!this.panelOpen) {
                // Otherwise reset the highlighted option. Note that we only want to do this while
                // closed, because doing it while open can shift the user's focus unnecessarily.
                this._keyManager.updateActiveItem(-1);
            }
        }
        this.ref.markForCheck();
    }
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    _selectValue(value) {
        const allOptions = this._getOptions();
        const correspondingOption = allOptions.find((option) => {
            // Skip options that are already in the model. This allows us to handle cases
            // where the same primitive value is selected multiple times.
            if (this._selectionModel.isSelected(option)) {
                return false;
            }
            return !Helpers.isEmpty(value) && !Helpers.isEmpty(option.value) && this.compareWith(option.value, value);
        });
        if (correspondingOption) {
            this._selectionModel.select(correspondingOption);
        }
        else if (value && !correspondingOption) {
            // Double Check option not already added.
            const legacyOption = this.filteredOptions.find((it) => it.value === value);
            if (!legacyOption) {
                // Add a disabled option to the list and select it
                this.filteredOptions.push({
                    disabled: true,
                    tooltip: 'Value is not provided in list of valid options.',
                    label: (value === null || value === void 0 ? void 0 : value.label) || value,
                    value,
                });
                this.ref.detectChanges();
            }
        }
        return correspondingOption;
    }
    select(option, i, fireEvents = true) {
        console.warn('select() method is deprecated');
    }
    clear() {
        console.warn('clear() method is deprecated');
    }
    /**
     * If the item is not disabled, this method closes the panel, and if a value is specified,
     * also sets the associated control to that value. It will also mark the control as dirty
     * if this interaction stemmed from the user.
     */
    handleSelection(option, isUserInput = false) {
        const wasSelected = this._selectionModel.isSelected(option);
        if (option.value == null && !this._multiple) {
            option.deselect();
            this._selectionModel.clear();
            if (this.value != null) {
                this._propagateChanges(option.value);
            }
        }
        else {
            if (wasSelected !== option.selected) {
                option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
            }
            if (isUserInput) {
                this._keyManager.setActiveItem(option);
            }
            if (this.multiple) {
                this._sortValues();
                if (isUserInput) {
                    this.focus();
                }
            }
        }
        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
        this.stateChanges.next();
        this._watchSelectionEvents();
    }
    _getDisplayValue(option) {
        if (!option) {
            return '';
        }
        let toDisplay = option.viewValue;
        if (this.displayWith) {
            toDisplay = this.displayWith(option.value);
        }
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const displayValue = toDisplay != null ? toDisplay : '';
        return displayValue;
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    _clearPreviousSelectedOption(skip) {
        this._getOptions().forEach((option) => {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        });
    }
    _watchSelectionEvents() {
        const options = this._getOptions();
        const selectionEvents = options ? merge(...options.map((option) => option.onSelectionChange)) : of();
        this._selectedOptionChanges.unsubscribe();
        this._selectedOptionChanges = selectionEvents.pipe(take(1)).subscribe((event) => {
            this.onModelTouched();
            this.handleSelection(event.source, event.isUserInput);
            if (event.isUserInput && !this.multiple && this.panelOpen) {
                this.closePanel();
                this.focus();
            }
        });
    }
    /** Handles all keydown events on the select. */
    _handleKeydown(event) {
        if (!this.disabled) {
            this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
        }
    }
    /** Handles keyboard events while the select is closed. */
    _handleClosedKeydown(event) {
        const key = event.key;
        const isArrowKey = key === "ArrowDown" /* ArrowDown */ || key === "ArrowUp" /* ArrowUp */ || key === "ArrowLeft" /* ArrowLeft */ || key === "ArrowRight" /* ArrowRight */;
        const isOpenKey = key === "Enter" /* Enter */ || key === " " /* Space */;
        const manager = this._keyManager;
        // Open the select on ALT + arrow key to match the native <select>
        if ((!manager.isTyping() && isOpenKey && !hasModifierKey(event)) || ((this.multiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.openPanel();
        }
        // Allow changing value with arrow keys.
        // else if (!this.multiple) {
        //   const previouslySelectedOption = this.selected;
        //   manager.onKeydown(event);
        //   const selectedOption = this.selected;
        // }
    }
    /** Handles keyboard events when the selected is open. */
    _handleOpenKeydown(event) {
        const manager = this._keyManager;
        const key = event.key;
        const isArrowKey = key === "ArrowDown" /* ArrowDown */ || key === "ArrowUp" /* ArrowUp */;
        const isTyping = manager.isTyping();
        if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.closePanel();
            // Don't do anything in this case if the user is typing,
            // because the typing sequence can include the space key.
        }
        else if (!isTyping && (key === "Enter" /* Enter */ || key === " " /* Space */) && manager.activeItem && !hasModifierKey(event)) {
            event.preventDefault();
            manager.activeItem._selectViaInteraction();
        }
        else if (!isTyping && this._multiple && ['a', 'A'].includes(key) && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = this.options.some((opt) => !opt.disabled && !opt.selected);
            this.options.forEach((option) => {
                if (!option.disabled) {
                    hasDeselectedOptions ? option.select() : option.deselect();
                }
            });
        }
        else if ("Escape" /* Escape */ === key) {
            this.closePanel();
        }
        else {
            const previouslyFocusedIndex = manager.activeItemIndex;
            manager.onKeydown(event);
            if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem && manager.activeItemIndex !== previouslyFocusedIndex) {
                manager.activeItem._selectViaInteraction();
            }
        }
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    /** Implemented as part of NovoFieldControl. */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /** Implemented as part of NovoFieldControl. */
    onContainerClick(event) {
        this.focus();
    }
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options) {
        if (!this.disabled) {
            this.dropdown.nativeElement.focus(options);
        }
    }
    _getOptions() {
        return [...(this.viewOptions || []), ...(this.contentOptions || [])];
    }
    /** Sorts the selected values in the selected based on their order in the panel. */
    _sortValues() {
        if (this.multiple) {
            // TODO.
        }
    }
    /** Emits change event to set the model value. */
    _propagateChanges(fallbackValue) {
        let valueToEmit = null;
        if (this.multiple) {
            valueToEmit = this.selected.map((option) => option.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);
        this.onModelChange(valueToEmit);
        this.onSelect.emit({ selected: valueToEmit });
        this.selectionChange.emit(this._makeChangeEvent(valueToEmit));
        this.ref.markForCheck();
    }
    _makeChangeEvent(value) {
        return new NovoSelectChange(this, value);
    }
    /** Scrolls the active option into view. */
    _scrollOptionIntoView(index) {
        const options = new QueryList();
        options.reset(this._getOptions());
        const labelCount = _countGroupLabelsBeforeOption(index, options, this.optionGroups);
        const itemHeight = this._getItemHeight();
        this.panel.nativeElement.scrollTop = _getOptionScrollPosition((index + labelCount) * itemHeight, itemHeight, this.panel.nativeElement.scrollTop, this.panel.nativeElement.offsetHeight);
    }
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    _initKeyManager() {
        this._keyManager = new ActiveDescendantKeyManager(this._getOptions()).withTypeAhead(100).withHomeAndEnd();
        // .withAllowedModifierKeys(['shiftKey']);
        this._keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
            if (this.panelOpen) {
                // Select the active item when tabbing away. This is consistent with how the native
                // select behaves. Note that we only want to do this in single selection mode.
                if (!this.multiple && this._keyManager.activeItem) {
                    this._keyManager.activeItem._selectViaInteraction();
                }
                // Restore focus to the trigger before closing. Ensures that the focus
                // position won't be lost if the user got focus into the overlay.
                this.focus();
                this.closePanel();
            }
        });
        this._keyManager.change.pipe(takeUntil(this._destroy)).subscribe(() => {
            if (this.panelOpen && this.overlay) {
                this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0);
            }
            else if (!this.panelOpen && !this.multiple && this._keyManager.activeItem) {
                this._keyManager.activeItem._selectViaInteraction();
            }
        });
    }
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    _highlightCorrectOption() {
        if (this._keyManager) {
            if (this.empty) {
                this._keyManager.setFirstItemActive();
            }
            else {
                this._keyManager.setActiveItem(this._value);
            }
        }
    }
    /** Calculates the height of the select's options. */
    _getItemHeight() {
        let [first] = this._getOptions();
        if (first) {
            return first._getHostElement().offsetHeight;
        }
        return 0;
    }
    // TODO: Deprecate this
    _initLegacyOptions() {
        if (this.options && this.options.length && typeof this.options[0] === 'string') {
            this.filteredOptions = this.options.map((item) => {
                return { value: item, label: item };
            });
        }
        else {
            this.filteredOptions = (this.options || [])
                .map((item) => {
                return Object.assign(Object.assign({}, item), { disabled: item.readOnly || item.disabled });
            })
                .map((item) => {
                return Object.assign(Object.assign({}, item), { active: false });
            });
        }
    }
    /**
     * TODO: Deprecate all header methods
     */
    toggleHeader(event, forceValue = false) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        // Reverse the active property (if forceValue, use that)
        this.header = {
            open: forceValue !== undefined ? forceValue : !this.header.open,
            value: '',
            valid: true,
        };
    }
    highlight(match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
    }
    escapeRegexp(queryToEscape) {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
    saveHeader() {
        if (this.header.value) {
            this.headerConfig.onSave(this.header.value);
            this.createdItem = this.header.value;
            this.closePanel();
        }
        else {
            this.header.valid = false;
        }
    }
    /** Determines the `aria-activedescendant` to be set on the host. */
    _getAriaActiveDescendant() {
        if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
            return this._keyManager.activeItem.id;
        }
        return null;
    }
}
NovoSelectElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-select',
                inputs: ['disabled', 'required', 'tabIndex'],
                providers: [
                    { provide: NovoFieldControl, useExisting: NovoSelectElement },
                    { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoSelectElement },
                ],
                template: `
    <div class="novo-select-trigger" #dropdownElement (click)="togglePanel(); (false)" tabIndex="{{ disabled ? -1 : 0 }}" type="button">
      <span class="novo-select-placeholder" *ngIf="empty">{{ placeholder }}</span>
      <span class="novo-select-display-value" *ngIf="!empty">{{ displayValue }}</span>
      <i class="bhi-collapse"></i>
    </div>
    <novo-overlay-template
      [parent]="elementRef"
      [position]="position"
      [width]="overlayWidth"
      [height]="overlayHeight"
      (closing)="dropdown.nativeElement.focus()"
    >
      <div #panel class="novo-select-list" tabIndex="-1" [class.has-header]="headerConfig" [class.active]="panelOpen">
        <novo-option *ngIf="headerConfig" class="select-header" [class.open]="header.open">
          <novo-button *ngIf="!header.open" icon="add-thin" (click)="toggleHeader($event); (false)" tabIndex="-1" class="header">
            {{ headerConfig.label }}
          </novo-button>
          <div *ngIf="header.open" [ngClass]="{ active: header.open }">
            <input
              autofocus
              type="text"
              [placeholder]="headerConfig.placeholder"
              [attr.id]="name"
              autocomplete="off"
              [value]="header.value"
              [ngClass]="{ invalid: !header.valid }"
            />
            <footer>
              <novo-button (click)="toggleHeader($event, false)">{{ labels.cancel }}</novo-button>
              <novo-button (click)="saveHeader()" class="primary">{{ labels.save }}</novo-button>
            </footer>
          </div>
        </novo-option>
        <!-- Declarative Content Goes Here -->
        <ng-content></ng-content>
        <!-- Data Driven Content Goes Here -->
        <ng-container *ngFor="let option of filteredOptions; let i = index">
          <novo-option
            *ngIf="!option.divider; else divider"
            class="select-item"
            [disabled]="option.disabled"
            [class.active]="option.active"
            [attr.data-automation-value]="option.label"
            [value]="option.value"
            [tooltip]="option.tooltip"
            [tooltipPosition]="option.tooltipPosition || 'right'"
          >
            <span [innerHtml]="highlight(option.label, filterTerm)"></span> <i *ngIf="option.active" class="bhi-check"></i>
          </novo-option>
          <ng-template #divider>
            <novo-divider class="select-item-divider" [class.with-label]="option.label" [class.without-label]="!option.label">
              {{ option?.label }}
            </novo-divider>
          </ng-template>
        </ng-container>
      </div>
    </novo-overlay-template>
  `
            },] }
];
NovoSelectElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: ChangeDetectorRef },
    { type: FocusMonitor },
    { type: NgZone },
    { type: ErrorStateMatcher },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] }
];
NovoSelectElement.propDecorators = {
    id: [{ type: Input }],
    name: [{ type: Input }],
    options: [{ type: Input }],
    placeholder: [{ type: Input }],
    readonly: [{ type: Input }],
    headerConfig: [{ type: Input }],
    position: [{ type: Input }],
    overlayWidth: [{ type: Input }],
    overlayHeight: [{ type: Input }],
    onSelect: [{ type: Output }],
    selectionChange: [{ type: Output }],
    valueChange: [{ type: Output }],
    openedChange: [{ type: Output }],
    _openedStream: [{ type: Output, args: ['opened',] }],
    _closedStream: [{ type: Output, args: ['closed',] }],
    displayWith: [{ type: Input }],
    compareWith: [{ type: Input }],
    overlay: [{ type: ViewChild, args: [NovoOverlayTemplateComponent, { static: true },] }],
    dropdown: [{ type: ViewChild, args: ['dropdownElement', { static: true },] }],
    optionGroups: [{ type: ContentChildren, args: [NovoOptgroup, { descendants: true },] }],
    contentOptions: [{ type: ContentChildren, args: [NovoOption, { descendants: true },] }],
    viewOptions: [{ type: ViewChildren, args: [NovoOption,] }],
    panel: [{ type: ViewChild, args: ['panel',] }],
    value: [{ type: Input }],
    multiple: [{ type: Input }],
    _handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3NlbGVjdC9TZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSztBQUNMLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUlOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFFSixTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0Isa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdGLFNBQVM7QUFDVCxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQU8sTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUlMLGlCQUFp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Q0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciwgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2VsZixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdDb250cm9sLCBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gQXBwXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBlcnMsIEtleSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGVDdG9yLFxuICBDYW5SZXF1aXJlQ3RvcixcbiAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gIEVycm9yU3RhdGVNYXRjaGVyLFxuICBIYXNPdmVybGF5Q3RvcixcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpbkVycm9yU3RhdGUsXG4gIG1peGluT3ZlcmxheSxcbiAgbWl4aW5SZXF1aXJlZCxcbiAgbWl4aW5UYWJJbmRleCxcbiAgTm92b09wdGdyb3VwLFxuICBOb3ZvT3B0aW9uLFxuICBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlLFxuICBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxufSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXknO1xuaW1wb3J0IHsgTm92b0ZpZWxkQ29udHJvbCB9IGZyb20gJy4uL2ZpZWxkJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG4vLyBjb25zdCBTRUxFQ1RfVkFMVUVfQUNDRVNTT1IgPSB7XG4vLyAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuLy8gICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvU2VsZWN0RWxlbWVudCksXG4vLyAgIG11bHRpOiB0cnVlLFxuLy8gfTtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBOb3ZvU2VsZWN0Q2hhbmdlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgc2VsZWN0IHRoYXQgZW1pdHRlZCB0aGUgY2hhbmdlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyBzb3VyY2U6IE5vdm9TZWxlY3RFbGVtZW50LFxuICAgIC8qKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBzZWxlY3QgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgdmFsdWU6IGFueSxcbiAgKSB7fVxufVxuXG4vLyBDcmVhdGUgQmFzZSBDbGFzcyBmcm9tIE1peGluc1xuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGluc1xuY2xhc3MgTm92b1NlbGVjdEJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgcHVibGljIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgcHVibGljIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICkge31cbn1cbmNvbnN0IE5vdm9TZWxlY3RNaXhpbnM6IEhhc092ZXJsYXlDdG9yICZcbiAgQ2FuUmVxdWlyZUN0b3IgJlxuICBDYW5EaXNhYmxlQ3RvciAmXG4gIEhhc1RhYkluZGV4Q3RvciAmXG4gIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yICZcbiAgdHlwZW9mIE5vdm9TZWxlY3RCYXNlID0gbWl4aW5PdmVybGF5KG1peGluVGFiSW5kZXgobWl4aW5SZXF1aXJlZChtaXhpbkRpc2FibGVkKG1peGluRXJyb3JTdGF0ZShOb3ZvU2VsZWN0QmFzZSkpKSkpO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zZWxlY3QnLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAncmVxdWlyZWQnLCAndGFiSW5kZXgnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOb3ZvRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTm92b1NlbGVjdEVsZW1lbnQgfSxcbiAgICB7IHByb3ZpZGU6IE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBOb3ZvU2VsZWN0RWxlbWVudCB9LFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXNlbGVjdC10cmlnZ2VyXCIgI2Ryb3Bkb3duRWxlbWVudCAoY2xpY2spPVwidG9nZ2xlUGFuZWwoKTsgKGZhbHNlKVwiIHRhYkluZGV4PVwie3sgZGlzYWJsZWQgPyAtMSA6IDAgfX1cIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm5vdm8tc2VsZWN0LXBsYWNlaG9sZGVyXCIgKm5nSWY9XCJlbXB0eVwiPnt7IHBsYWNlaG9sZGVyIH19PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJub3ZvLXNlbGVjdC1kaXNwbGF5LXZhbHVlXCIgKm5nSWY9XCIhZW1wdHlcIj57eyBkaXNwbGF5VmFsdWUgfX08L3NwYW4+XG4gICAgICA8aSBjbGFzcz1cImJoaS1jb2xsYXBzZVwiPjwvaT5cbiAgICA8L2Rpdj5cbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlXG4gICAgICBbcGFyZW50XT1cImVsZW1lbnRSZWZcIlxuICAgICAgW3Bvc2l0aW9uXT1cInBvc2l0aW9uXCJcbiAgICAgIFt3aWR0aF09XCJvdmVybGF5V2lkdGhcIlxuICAgICAgW2hlaWdodF09XCJvdmVybGF5SGVpZ2h0XCJcbiAgICAgIChjbG9zaW5nKT1cImRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKVwiXG4gICAgPlxuICAgICAgPGRpdiAjcGFuZWwgY2xhc3M9XCJub3ZvLXNlbGVjdC1saXN0XCIgdGFiSW5kZXg9XCItMVwiIFtjbGFzcy5oYXMtaGVhZGVyXT1cImhlYWRlckNvbmZpZ1wiIFtjbGFzcy5hY3RpdmVdPVwicGFuZWxPcGVuXCI+XG4gICAgICAgIDxub3ZvLW9wdGlvbiAqbmdJZj1cImhlYWRlckNvbmZpZ1wiIGNsYXNzPVwic2VsZWN0LWhlYWRlclwiIFtjbGFzcy5vcGVuXT1cImhlYWRlci5vcGVuXCI+XG4gICAgICAgICAgPG5vdm8tYnV0dG9uICpuZ0lmPVwiIWhlYWRlci5vcGVuXCIgaWNvbj1cImFkZC10aGluXCIgKGNsaWNrKT1cInRvZ2dsZUhlYWRlcigkZXZlbnQpOyAoZmFsc2UpXCIgdGFiSW5kZXg9XCItMVwiIGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICB7eyBoZWFkZXJDb25maWcubGFiZWwgfX1cbiAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJoZWFkZXIub3BlblwiIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBoZWFkZXIub3BlbiB9XCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImhlYWRlckNvbmZpZy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgIFthdHRyLmlkXT1cIm5hbWVcIlxuICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwiaGVhZGVyLnZhbHVlXCJcbiAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBpbnZhbGlkOiAhaGVhZGVyLnZhbGlkIH1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxmb290ZXI+XG4gICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlSGVhZGVyKCRldmVudCwgZmFsc2UpXCI+e3sgbGFiZWxzLmNhbmNlbCB9fTwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiAoY2xpY2spPVwic2F2ZUhlYWRlcigpXCIgY2xhc3M9XCJwcmltYXJ5XCI+e3sgbGFiZWxzLnNhdmUgfX08L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgIDwhLS0gRGVjbGFyYXRpdmUgQ29udGVudCBHb2VzIEhlcmUgLS0+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPCEtLSBEYXRhIERyaXZlbiBDb250ZW50IEdvZXMgSGVyZSAtLT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlcmVkT3B0aW9uczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgKm5nSWY9XCIhb3B0aW9uLmRpdmlkZXI7IGVsc2UgZGl2aWRlclwiXG4gICAgICAgICAgICBjbGFzcz1cInNlbGVjdC1pdGVtXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJvcHRpb24uZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJvcHRpb24uYWN0aXZlXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi12YWx1ZV09XCJvcHRpb24ubGFiZWxcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiXG4gICAgICAgICAgICBbdG9vbHRpcF09XCJvcHRpb24udG9vbHRpcFwiXG4gICAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cIm9wdGlvbi50b29sdGlwUG9zaXRpb24gfHwgJ3JpZ2h0J1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQob3B0aW9uLmxhYmVsLCBmaWx0ZXJUZXJtKVwiPjwvc3Bhbj4gPGkgKm5nSWY9XCJvcHRpb24uYWN0aXZlXCIgY2xhc3M9XCJiaGktY2hlY2tcIj48L2k+XG4gICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2RpdmlkZXI+XG4gICAgICAgICAgICA8bm92by1kaXZpZGVyIGNsYXNzPVwic2VsZWN0LWl0ZW0tZGl2aWRlclwiIFtjbGFzcy53aXRoLWxhYmVsXT1cIm9wdGlvbi5sYWJlbFwiIFtjbGFzcy53aXRob3V0LWxhYmVsXT1cIiFvcHRpb24ubGFiZWxcIj5cbiAgICAgICAgICAgICAge3sgb3B0aW9uPy5sYWJlbCB9fVxuICAgICAgICAgICAgPC9ub3ZvLWRpdmlkZXI+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NlbGVjdEVsZW1lbnRcbiAgZXh0ZW5kcyBOb3ZvU2VsZWN0TWl4aW5zXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5vdm9GaWVsZENvbnRyb2w8YW55Plxue1xuICBwcml2YXRlIF91bmlxdWVJZDogc3RyaW5nID0gYG5vdm8tc2VsZWN0LSR7KytuZXh0SWR9YDtcbiAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9hY3RpdmVPcHRpb25DaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9zZWxlY3RlZE9wdGlvbkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcmVhZG9ubHkgY29udHJvbFR5cGU6IHN0cmluZyA9ICdzZWxlY3QnO1xuXG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgbGFzdEtleVZhbHVlOiBzdHJpbmcgPSBudWxsO1xuICAvKiogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuKi9cbiAgbGFzdENhcmV0UG9zaXRpb246IG51bWJlciB8IG51bGw7XG5cbiAgX3NlbGVjdGlvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxOb3ZvT3B0aW9uPjtcblxuICAvKiogVGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0cmlidXRlIG9uIHRoZSBjaGlwIGxpc3QgZm9yIGltcHJvdmVkIGExMXkuICovXG4gIF9hcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcbiAgLyoqIFRhYiBpbmRleCBmb3IgdGhlIGNoaXAgbGlzdC4gKi9cbiAgX3RhYkluZGV4ID0gMDtcbiAgLyoqIFVzZXIgZGVmaW5lZCB0YWIgaW5kZXguICovXG4gIF91c2VyVGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAvKiogVGhlIEZvY3VzS2V5TWFuYWdlciB3aGljaCBoYW5kbGVzIGZvY3VzLiAqL1xuICBfa2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj47XG5cbiAgQElucHV0KClcbiAgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KClcbiAgb3B0aW9uczogQXJyYXk8YW55PjtcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWxlY3QuLi4nO1xuICBASW5wdXQoKVxuICByZWFkb25seTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgaGVhZGVyQ29uZmlnOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHBvc2l0aW9uOiBzdHJpbmcgPSAnY2VudGVyJztcbiAgQElucHV0KClcbiAgb3ZlcmxheVdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpXG4gIG92ZXJsYXlIZWlnaHQ6IG51bWJlcjtcbiAgQE91dHB1dCgpXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE5vdm9TZWxlY3RDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvU2VsZWN0Q2hhbmdlPigpO1xuICAvKiogRXZlbnQgdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgcmF3IHZhbHVlIG9mIHRoZSBzZWxlY3QgY2hhbmdlcy4qL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHBhbmVsIGhhcyBiZWVuIHRvZ2dsZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIG9wZW5lZC4gKi9cbiAgQE91dHB1dCgnb3BlbmVkJykgcmVhZG9ubHkgX29wZW5lZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoXG4gICAgZmlsdGVyKChvKSA9PiBvKSxcbiAgICBtYXAoKCkgPT4ge30pLFxuICApO1xuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICBAT3V0cHV0KCdjbG9zZWQnKSByZWFkb25seSBfY2xvc2VkU3RyZWFtOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5vcGVuZWRDaGFuZ2UucGlwZShcbiAgICBmaWx0ZXIoKG8pID0+ICFvKSxcbiAgICBtYXAoKCkgPT4ge30pLFxuICApO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IG1hcHMgYW4gb3B0aW9uJ3MgY29udHJvbCB2YWx1ZSB0byBpdHMgZGlzcGxheSB2YWx1ZSBpbiB0aGUgdHJpZ2dlci4gKi9cbiAgQElucHV0KCkgZGlzcGxheVdpdGg6ICgodmFsdWU6IGFueSkgPT4gc3RyaW5nKSB8IG51bGwgPSBudWxsO1xuICAvKiogKiBGdW5jdGlvbiB0byBjb21wYXJlIHRoZSBvcHRpb24gdmFsdWVzIHdpdGggdGhlIHNlbGVjdGVkIHZhbHVlcy4gKi9cbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuID0gKG8xOiBhbnksIG8yOiBhbnkpID0+XG4gICAgbzEgPT09IG8yIHx8IG8xID09PSBvMi5pZCB8fCAoIUhlbHBlcnMuaXNFbXB0eShvMS5pZCkgJiYgIUhlbHBlcnMuaXNFbXB0eShvMi5pZCkgJiYgbzEuaWQgPT09IG8yLmlkKTtcblxuICBoZWFkZXI6IGFueSA9IHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgICB2YWxpZDogdHJ1ZSxcbiAgICB2YWx1ZTogJycsXG4gIH07XG4gIGNyZWF0ZWRJdGVtOiBhbnk7XG4gIG1vZGVsOiBhbnk7XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBmaWx0ZXJUZXJtOiBzdHJpbmcgPSAnJztcbiAgZmlsdGVyVGVybVRpbWVvdXQ7XG4gIGZpbHRlcmVkT3B0aW9uczogYW55O1xuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd25FbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSlcbiAgZHJvcGRvd246IEVsZW1lbnRSZWY7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0Z3JvdXAsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8Tm92b09wdGdyb3VwPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGNvbnRlbnRPcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG4gIEBWaWV3Q2hpbGRyZW4oTm92b09wdGlvbilcbiAgdmlld09wdGlvbnM6IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPjtcblxuICBAVmlld0NoaWxkKCdwYW5lbCcpXG4gIHBhbmVsOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xuICAgIC8vIEFsd2F5cyByZS1hc3NpZ24gYW4gYXJyYXksIGJlY2F1c2UgaXQgbWlnaHQgaGF2ZSBiZWVuIG11dGF0ZWQuXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl92YWx1ZSB8fCAodGhpcy5fbXVsdGlwbGUgJiYgQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX3NldFNlbGVjdGlvbkJ5VmFsdWUobmV3VmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgc2hvdWxkIGJlIGFsbG93ZWQgdG8gc2VsZWN0IG11bHRpcGxlIG9wdGlvbnMuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gIH1cbiAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMucG9zaXRpb24gPSAnYWJvdmUtYmVsb3cnO1xuICB9XG4gIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgYW55IHJhZGlvIGJ1dHRvbnMgaGFzIGZvY3VzLiAqL1xuICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICAvLyB0b2RvOiBpbXBsZW1lbnQgdGhpcy5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlID09PSBudWxsO1xuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgb3B0aW9uLiAqL1xuICBnZXQgc2VsZWN0ZWQoKTogTm92b09wdGlvbiB8IE5vdm9PcHRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZCA6IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdO1xuICB9XG5cbiAgLyoqIFRoZSB2YWx1ZSBkaXNwbGF5ZWQgaW4gdGhlIHRyaWdnZXIuICovXG4gIGdldCBkaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5lbXB0eSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLm1hcCgob3B0aW9uKSA9PiB0aGlzLl9nZXREaXNwbGF5VmFsdWUob3B0aW9uKSk7XG4gICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zLmpvaW4oJywgJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9nZXREaXNwbGF5VmFsdWUodGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwdWJsaWMgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBAT3B0aW9uYWwoKSBAU2VsZigpIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICApIHtcbiAgICBzdXBlcihkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIF9wYXJlbnRGb3JtLCBfcGFyZW50Rm9ybUdyb3VwLCBuZ0NvbnRyb2wpO1xuICAgIGlmIChuZ0NvbnRyb2wpIHtcbiAgICAgIG5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICB9XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8Tm92b09wdGlvbj4odGhpcy5tdWx0aXBsZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgdGhpcy5faW5pdExlZ2FjeU9wdGlvbnMoKTtcbiAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCkuc3Vic2NyaWJlKChvcmlnaW4pID0+XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBpZiAob3JpZ2luID09PSAna2V5Ym9hcmQnICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBVcGRhdGluZyB0aGUgZGlzYWJsZWQgc3RhdGUgaXMgaGFuZGxlZCBieSBgbWl4aW5EaXNhYmxlZGAsIGJ1dCB3ZSBuZWVkIHRvIGFkZGl0aW9uYWxseSBsZXRcbiAgICAvLyB0aGUgcGFyZW50IGZvcm0gZmllbGQga25vdyB0byBydW4gY2hhbmdlIGRldGVjdGlvbiB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBjaGFuZ2VzLlxuICAgIGlmIChjaGFuZ2VzPy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcz8ubXVsdGlwbGUpIHtcbiAgICAgIC8vIFRPRE86IGNvcHkgc2VsZWN0aW9uIG92ZXI/P1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8Tm92b09wdGlvbj4odGhpcy5tdWx0aXBsZSk7XG4gICAgfVxuICAgIHRoaXMuX2luaXRMZWdhY3lPcHRpb25zKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBLZXlNYW5hZ2VyIHRvIG1hbmFnZSBrZXlib2FyZCBldmVudHNcbiAgICB0aGlzLl9pbml0S2V5TWFuYWdlcigpO1xuICAgIC8vIFN1YnNjcmliZSB0byBOb3ZvT3B0aW9uIHNlbGVjdGlvbnNcbiAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgIC8vIFNldCBpbml0aWFsIHZhbHVlXG4gICAgdGhpcy5faW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgIC8vIExpc3RlbiB0byBzZWxlY3Rpb24gY2hhbmdlcyB0byBzZWxlY3QgYW5kIGRlc2VsZWN0IG9wdGlvbnNcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5jaGFuZ2VkLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5hZGRlZC5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3QpIHtcbiAgICAgICAgICBvcHRpb24uc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZXZlbnQucmVtb3ZlZC5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5kZXNlbGVjdCkge1xuICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBMaXN0ZW4gdG8gUXVlcnlMaXN0IGNoYW5nZXNcbiAgICBtZXJnZSh0aGlzLmNvbnRlbnRPcHRpb25zLmNoYW5nZXMsIHRoaXMudmlld09wdGlvbnMuY2hhbmdlcylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplU2VsZWN0aW9uKCk7XG4gICAgICB9KTtcblxuICAgIG1lcmdlKHRoaXMub3ZlcmxheS5vcGVuaW5nLCB0aGlzLm92ZXJsYXkuY2xvc2luZylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHRoaXMucGFuZWxPcGVuKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FjdGl2ZU9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgb3BlblBhbmVsKCkge1xuICAgIHN1cGVyLm9wZW5QYW5lbCgpO1xuICAgIHRoaXMuX2hpZ2hsaWdodENvcnJlY3RPcHRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRpYWxpemVTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3NldFNlbGVjdGlvbkJ5VmFsdWUodGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlKTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWxlY3RlZCBvcHRpb24gYmFzZWQgb24gYSB2YWx1ZS4gSWYgbm8gb3B0aW9uIGNhbiBiZVxuICAgKiBmb3VuZCB3aXRoIHRoZSBkZXNpZ25hdGVkIHZhbHVlLCB0aGUgc2VsZWN0IHRyaWdnZXIgaXMgY2xlYXJlZC5cbiAgICovXG4gIHByaXZhdGUgX3NldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWU6IGFueSB8IGFueVtdKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBpZiAob3B0aW9uLnNldEluYWN0aXZlU3R5bGVzKSB7XG4gICAgICAgIG9wdGlvbi5zZXRJbmFjdGl2ZVN0eWxlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdmFsdWUpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZTogYW55KSA9PiB0aGlzLl9zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgICAgIHRoaXMuX3NvcnRWYWx1ZXMoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2tleU1hbmFnZXIpIHtcbiAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdPcHRpb24gPSB0aGlzLl9zZWxlY3RWYWx1ZSh2YWx1ZSk7XG4gICAgICAvLyBTaGlmdCBmb2N1cyB0byB0aGUgYWN0aXZlIGl0ZW0uIE5vdGUgdGhhdCB3ZSBzaG91bGRuJ3QgZG8gdGhpcyBpbiBtdWx0aXBsZVxuICAgICAgLy8gbW9kZSwgYmVjYXVzZSB3ZSBkb24ndCBrbm93IHdoYXQgb3B0aW9uIHRoZSB1c2VyIGludGVyYWN0ZWQgd2l0aCBsYXN0LlxuICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJlc2V0IHRoZSBoaWdobGlnaHRlZCBvcHRpb24uIE5vdGUgdGhhdCB3ZSBvbmx5IHdhbnQgdG8gZG8gdGhpcyB3aGlsZVxuICAgICAgICAvLyBjbG9zZWQsIGJlY2F1c2UgZG9pbmcgaXQgd2hpbGUgb3BlbiBjYW4gc2hpZnQgdGhlIHVzZXIncyBmb2N1cyB1bm5lY2Vzc2FyaWx5LlxuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oLTEpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbmQgc2VsZWN0cyBhbmQgb3B0aW9uIGJhc2VkIG9uIGl0cyB2YWx1ZS5cbiAgICogQHJldHVybnMgT3B0aW9uIHRoYXQgaGFzIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2VsZWN0VmFsdWUodmFsdWU6IGFueSk6IE5vdm9PcHRpb24gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGFsbE9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IGFsbE9wdGlvbnMuZmluZCgob3B0aW9uOiBOb3ZvT3B0aW9uKSA9PiB7XG4gICAgICAvLyBTa2lwIG9wdGlvbnMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgbW9kZWwuIFRoaXMgYWxsb3dzIHVzIHRvIGhhbmRsZSBjYXNlc1xuICAgICAgLy8gd2hlcmUgdGhlIHNhbWUgcHJpbWl0aXZlIHZhbHVlIGlzIHNlbGVjdGVkIG11bHRpcGxlIHRpbWVzLlxuICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gIUhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkgJiYgIUhlbHBlcnMuaXNFbXB0eShvcHRpb24udmFsdWUpICYmIHRoaXMuY29tcGFyZVdpdGgob3B0aW9uLnZhbHVlLCB2YWx1ZSk7XG4gICAgfSk7XG4gICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChjb3JyZXNwb25kaW5nT3B0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmICFjb3JyZXNwb25kaW5nT3B0aW9uKSB7XG4gICAgICAvLyBEb3VibGUgQ2hlY2sgb3B0aW9uIG5vdCBhbHJlYWR5IGFkZGVkLlxuICAgICAgY29uc3QgbGVnYWN5T3B0aW9uID0gdGhpcy5maWx0ZXJlZE9wdGlvbnMuZmluZCgoaXQpID0+IGl0LnZhbHVlID09PSB2YWx1ZSk7XG4gICAgICBpZiAoIWxlZ2FjeU9wdGlvbikge1xuICAgICAgICAvLyBBZGQgYSBkaXNhYmxlZCBvcHRpb24gdG8gdGhlIGxpc3QgYW5kIHNlbGVjdCBpdFxuICAgICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICB0b29sdGlwOiAnVmFsdWUgaXMgbm90IHByb3ZpZGVkIGluIGxpc3Qgb2YgdmFsaWQgb3B0aW9ucy4nLFxuICAgICAgICAgIGxhYmVsOiB2YWx1ZT8ubGFiZWwgfHwgdmFsdWUsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvcnJlc3BvbmRpbmdPcHRpb247XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0KG9wdGlvbiwgaSwgZmlyZUV2ZW50czogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ3NlbGVjdCgpIG1ldGhvZCBpcyBkZXByZWNhdGVkJyk7XG4gIH1cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIGNvbnNvbGUud2FybignY2xlYXIoKSBtZXRob2QgaXMgZGVwcmVjYXRlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBpdGVtIGlzIG5vdCBkaXNhYmxlZCwgdGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLFxuICAgKiBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWQgY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eVxuICAgKiBpZiB0aGlzIGludGVyYWN0aW9uIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIGhhbmRsZVNlbGVjdGlvbihvcHRpb246IE5vdm9PcHRpb24sIGlzVXNlcklucHV0OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKTtcbiAgICBpZiAob3B0aW9uLnZhbHVlID09IG51bGwgJiYgIXRoaXMuX211bHRpcGxlKSB7XG4gICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICBpZiAodGhpcy52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMob3B0aW9uLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHdhc1NlbGVjdGVkICE9PSBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID8gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KG9wdGlvbikgOiB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChvcHRpb24pO1xuICAgICAgfVxuICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShvcHRpb24pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5fc29ydFZhbHVlcygpO1xuICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAod2FzU2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgdGhpcy5fcHJvcGFnYXRlQ2hhbmdlcygpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERpc3BsYXlWYWx1ZShvcHRpb246IE5vdm9PcHRpb24gJiB7IHZhbHVlPzogYW55OyBsYWJlbD86IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgICBpZiAoIW9wdGlvbikge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBsZXQgdG9EaXNwbGF5ID0gb3B0aW9uLnZpZXdWYWx1ZTtcbiAgICBpZiAodGhpcy5kaXNwbGF5V2l0aCkge1xuICAgICAgdG9EaXNwbGF5ID0gdGhpcy5kaXNwbGF5V2l0aChvcHRpb24udmFsdWUpO1xuICAgIH1cbiAgICAvLyBTaW1wbHkgZmFsbGluZyBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZGlzcGxheSB2YWx1ZSBpcyBmYWxzeSBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgIC8vIFRoZSBkaXNwbGF5IHZhbHVlIGNhbiBhbHNvIGJlIHRoZSBudW1iZXIgemVybyBhbmQgc2hvdWxkbid0IGZhbGwgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcuXG4gICAgY29uc3QgZGlzcGxheVZhbHVlID0gdG9EaXNwbGF5ICE9IG51bGwgPyB0b0Rpc3BsYXkgOiAnJztcbiAgICByZXR1cm4gZGlzcGxheVZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfY2xlYXJQcmV2aW91c1NlbGVjdGVkT3B0aW9uKHNraXA6IE5vdm9PcHRpb24pIHtcbiAgICB0aGlzLl9nZXRPcHRpb25zKCkuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBpZiAob3B0aW9uICE9PSBza2lwICYmIG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uRXZlbnRzID0gb3B0aW9ucyA/IG1lcmdlKC4uLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpIDogb2YoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMgPSBzZWxlY3Rpb25FdmVudHMucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKGV2ZW50OiBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlKSA9PiB7XG4gICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbihldmVudC5zb3VyY2UsIGV2ZW50LmlzVXNlcklucHV0KTtcbiAgICAgIGlmIChldmVudC5pc1VzZXJJbnB1dCAmJiAhdGhpcy5tdWx0aXBsZSAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgYWxsIGtleWRvd24gZXZlbnRzIG9uIHRoZSBzZWxlY3QuICovXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5wYW5lbE9wZW4gPyB0aGlzLl9oYW5kbGVPcGVuS2V5ZG93bihldmVudCkgOiB0aGlzLl9oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hpbGUgdGhlIHNlbGVjdCBpcyBjbG9zZWQuICovXG4gIHByaXZhdGUgX2hhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgY29uc3QgaXNBcnJvd0tleSA9IGtleSA9PT0gS2V5LkFycm93RG93biB8fCBrZXkgPT09IEtleS5BcnJvd1VwIHx8IGtleSA9PT0gS2V5LkFycm93TGVmdCB8fCBrZXkgPT09IEtleS5BcnJvd1JpZ2h0O1xuICAgIGNvbnN0IGlzT3BlbktleSA9IGtleSA9PT0gS2V5LkVudGVyIHx8IGtleSA9PT0gS2V5LlNwYWNlO1xuICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLl9rZXlNYW5hZ2VyO1xuICAgIC8vIE9wZW4gdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgIGlmICgoIW1hbmFnZXIuaXNUeXBpbmcoKSAmJiBpc09wZW5LZXkgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50KSkgfHwgKCh0aGlzLm11bHRpcGxlIHx8IGV2ZW50LmFsdEtleSkgJiYgaXNBcnJvd0tleSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnRzIHRoZSBwYWdlIGZyb20gc2Nyb2xsaW5nIGRvd24gd2hlbiBwcmVzc2luZyBzcGFjZVxuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gICAgLy8gQWxsb3cgY2hhbmdpbmcgdmFsdWUgd2l0aCBhcnJvdyBrZXlzLlxuICAgIC8vIGVsc2UgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgLy8gICBjb25zdCBwcmV2aW91c2x5U2VsZWN0ZWRPcHRpb24gPSB0aGlzLnNlbGVjdGVkO1xuICAgIC8vICAgbWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIC8vICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSB0aGlzLnNlbGVjdGVkO1xuICAgIC8vIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGVuIHRoZSBzZWxlY3RlZCBpcyBvcGVuLiAqL1xuICBwcml2YXRlIF9oYW5kbGVPcGVuS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLl9rZXlNYW5hZ2VyO1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5ID09PSBLZXkuQXJyb3dEb3duIHx8IGtleSA9PT0gS2V5LkFycm93VXA7XG4gICAgY29uc3QgaXNUeXBpbmcgPSBtYW5hZ2VyLmlzVHlwaW5nKCk7XG5cbiAgICBpZiAoaXNBcnJvd0tleSAmJiBldmVudC5hbHRLZXkpIHtcbiAgICAgIC8vIENsb3NlIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIC8vIERvbid0IGRvIGFueXRoaW5nIGluIHRoaXMgY2FzZSBpZiB0aGUgdXNlciBpcyB0eXBpbmcsXG4gICAgICAvLyBiZWNhdXNlIHRoZSB0eXBpbmcgc2VxdWVuY2UgY2FuIGluY2x1ZGUgdGhlIHNwYWNlIGtleS5cbiAgICB9IGVsc2UgaWYgKCFpc1R5cGluZyAmJiAoa2V5ID09PSBLZXkuRW50ZXIgfHwga2V5ID09PSBLZXkuU3BhY2UpICYmIG1hbmFnZXIuYWN0aXZlSXRlbSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbWFuYWdlci5hY3RpdmVJdGVtLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoIWlzVHlwaW5nICYmIHRoaXMuX211bHRpcGxlICYmIFsnYScsICdBJ10uaW5jbHVkZXMoa2V5KSAmJiBldmVudC5jdHJsS2V5KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgaGFzRGVzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuc29tZSgob3B0KSA9PiAhb3B0LmRpc2FibGVkICYmICFvcHQuc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAoIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgIGhhc0Rlc2VsZWN0ZWRPcHRpb25zID8gb3B0aW9uLnNlbGVjdCgpIDogb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoS2V5LkVzY2FwZSA9PT0ga2V5KSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRJbmRleCA9IG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuICAgICAgbWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgaWYgKHRoaXMuX211bHRpcGxlICYmIGlzQXJyb3dLZXkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgbWFuYWdlci5hY3RpdmVJdGVtICYmIG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEluZGV4KSB7XG4gICAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbS5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIHNldERlc2NyaWJlZEJ5SWRzKGlkczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9hcmlhRGVzY3JpYmVkYnkgPSBpZHMuam9pbignICcpO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBmaXJzdCBub24tZGlzYWJsZWQgY2hpcCBpbiB0aGlzIGNoaXAgbGlzdCwgb3IgdGhlIGFzc29jaWF0ZWQgaW5wdXQgd2hlbiB0aGVyZVxuICAgKiBhcmUgbm8gZWxpZ2libGUgY2hpcHMuXG4gICAqL1xuICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRPcHRpb25zKCkge1xuICAgIHJldHVybiBbLi4uKHRoaXMudmlld09wdGlvbnMgfHwgW10pLCAuLi4odGhpcy5jb250ZW50T3B0aW9ucyB8fCBbXSldO1xuICB9XG5cbiAgLyoqIFNvcnRzIHRoZSBzZWxlY3RlZCB2YWx1ZXMgaW4gdGhlIHNlbGVjdGVkIGJhc2VkIG9uIHRoZWlyIG9yZGVyIGluIHRoZSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfc29ydFZhbHVlcygpIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgLy8gVE9ETy5cbiAgICB9XG4gIH1cblxuICAvKiogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIHNldCB0aGUgbW9kZWwgdmFsdWUuICovXG4gIHByaXZhdGUgX3Byb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgIGxldCB2YWx1ZVRvRW1pdDogYW55ID0gbnVsbDtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgdmFsdWVUb0VtaXQgPSAodGhpcy5zZWxlY3RlZCBhcyBOb3ZvT3B0aW9uW10pLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZVRvRW1pdCA9IHRoaXMuc2VsZWN0ZWQgPyAodGhpcy5zZWxlY3RlZCBhcyBOb3ZvT3B0aW9uKS52YWx1ZSA6IGZhbGxiYWNrVmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVRvRW1pdDtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSh2YWx1ZVRvRW1pdCk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHsgc2VsZWN0ZWQ6IHZhbHVlVG9FbWl0IH0pO1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5fbWFrZUNoYW5nZUV2ZW50KHZhbHVlVG9FbWl0KSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX21ha2VDaGFuZ2VFdmVudCh2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBOb3ZvU2VsZWN0Q2hhbmdlKHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBTY3JvbGxzIHRoZSBhY3RpdmUgb3B0aW9uIGludG8gdmlldy4gKi9cbiAgcHJvdGVjdGVkIF9zY3JvbGxPcHRpb25JbnRvVmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBRdWVyeUxpc3Q8Tm92b09wdGlvbj4oKTtcbiAgICBvcHRpb25zLnJlc2V0KHRoaXMuX2dldE9wdGlvbnMoKSk7XG4gICAgY29uc3QgbGFiZWxDb3VudCA9IF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKGluZGV4LCBvcHRpb25zLCB0aGlzLm9wdGlvbkdyb3Vwcyk7XG4gICAgY29uc3QgaXRlbUhlaWdodCA9IHRoaXMuX2dldEl0ZW1IZWlnaHQoKTtcbiAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgKGluZGV4ICsgbGFiZWxDb3VudCkgKiBpdGVtSGVpZ2h0LFxuICAgICAgaXRlbUhlaWdodCxcbiAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICk7XG4gIH1cblxuICAvKiogU2V0cyB1cCBhIGtleSBtYW5hZ2VyIHRvIGxpc3RlbiB0byBrZXlib2FyZCBldmVudHMgb24gdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gIHByaXZhdGUgX2luaXRLZXlNYW5hZ2VyKCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5fZ2V0T3B0aW9ucygpKS53aXRoVHlwZUFoZWFkKDEwMCkud2l0aEhvbWVBbmRFbmQoKTtcbiAgICAvLyAud2l0aEFsbG93ZWRNb2RpZmllcktleXMoWydzaGlmdEtleSddKTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIudGFiT3V0LnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgIC8vIFNlbGVjdCB0aGUgYWN0aXZlIGl0ZW0gd2hlbiB0YWJiaW5nIGF3YXkuIFRoaXMgaXMgY29uc2lzdGVudCB3aXRoIGhvdyB0aGUgbmF0aXZlXG4gICAgICAgIC8vIHNlbGVjdCBiZWhhdmVzLiBOb3RlIHRoYXQgd2Ugb25seSB3YW50IHRvIGRvIHRoaXMgaW4gc2luZ2xlIHNlbGVjdGlvbiBtb2RlLlxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc3RvcmUgZm9jdXMgdG8gdGhlIHRyaWdnZXIgYmVmb3JlIGNsb3NpbmcuIEVuc3VyZXMgdGhhdCB0aGUgZm9jdXNcbiAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuICYmIHRoaXMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLl9zY3JvbGxPcHRpb25JbnRvVmlldyh0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMucGFuZWxPcGVuICYmICF0aGlzLm11bHRpcGxlICYmIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyB0aGUgc2VsZWN0ZWQgaXRlbS4gSWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkLCBpdCB3aWxsIGhpZ2hsaWdodFxuICAgKiB0aGUgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgKi9cbiAgcHJpdmF0ZSBfaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fa2V5TWFuYWdlcikge1xuICAgICAgaWYgKHRoaXMuZW1wdHkpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIENhbGN1bGF0ZXMgdGhlIGhlaWdodCBvZiB0aGUgc2VsZWN0J3Mgb3B0aW9ucy4gKi9cbiAgcHJpdmF0ZSBfZ2V0SXRlbUhlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCBbZmlyc3RdID0gdGhpcy5fZ2V0T3B0aW9ucygpO1xuICAgIGlmIChmaXJzdCkge1xuICAgICAgcmV0dXJuIGZpcnN0Ll9nZXRIb3N0RWxlbWVudCgpLm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvLyBUT0RPOiBEZXByZWNhdGUgdGhpc1xuICBwcml2YXRlIF9pbml0TGVnYWN5T3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5sZW5ndGggJiYgdHlwZW9mIHRoaXMub3B0aW9uc1swXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogaXRlbSwgbGFiZWw6IGl0ZW0gfTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9ICh0aGlzLm9wdGlvbnMgfHwgW10pXG4gICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgIGRpc2FibGVkOiBpdGVtLnJlYWRPbmx5IHx8IGl0ZW0uZGlzYWJsZWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogRGVwcmVjYXRlIGFsbCBoZWFkZXIgbWV0aG9kc1xuICAgKi9cbiAgdG9nZ2xlSGVhZGVyKGV2ZW50LCBmb3JjZVZhbHVlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgLy8gUmV2ZXJzZSB0aGUgYWN0aXZlIHByb3BlcnR5IChpZiBmb3JjZVZhbHVlLCB1c2UgdGhhdClcbiAgICB0aGlzLmhlYWRlciA9IHtcbiAgICAgIG9wZW46IGZvcmNlVmFsdWUgIT09IHVuZGVmaW5lZCA/IGZvcmNlVmFsdWUgOiAhdGhpcy5oZWFkZXIub3BlbixcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBoaWdobGlnaHQobWF0Y2gsIHF1ZXJ5KSB7XG4gICAgLy8gUmVwbGFjZXMgdGhlIGNhcHR1cmUgc3RyaW5nIHdpdGggYSB0aGUgc2FtZSBzdHJpbmcgaW5zaWRlIG9mIGEgXCJzdHJvbmdcIiB0YWdcbiAgICByZXR1cm4gcXVlcnkgPyBtYXRjaC5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5lc2NhcGVSZWdleHAocXVlcnkpLCAnZ2knKSwgJzxzdHJvbmc+JCY8L3N0cm9uZz4nKSA6IG1hdGNoO1xuICB9XG5cbiAgZXNjYXBlUmVnZXhwKHF1ZXJ5VG9Fc2NhcGUpIHtcbiAgICAvLyBFeDogaWYgdGhlIGNhcHR1cmUgaXMgXCJhXCIgdGhlIHJlc3VsdCB3aWxsIGJlIFxcYVxuICAgIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XG4gIH1cblxuICBzYXZlSGVhZGVyKCkge1xuICAgIGlmICh0aGlzLmhlYWRlci52YWx1ZSkge1xuICAgICAgdGhpcy5oZWFkZXJDb25maWcub25TYXZlKHRoaXMuaGVhZGVyLnZhbHVlKTtcbiAgICAgIHRoaXMuY3JlYXRlZEl0ZW0gPSB0aGlzLmhlYWRlci52YWx1ZTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlYWRlci52YWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmVzIHRoZSBgYXJpYS1hY3RpdmVkZXNjZW5kYW50YCB0byBiZSBzZXQgb24gdGhlIGhvc3QuICovXG4gIF9nZXRBcmlhQWN0aXZlRGVzY2VuZGFudCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgdGhpcy5fa2V5TWFuYWdlciAmJiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uaWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==