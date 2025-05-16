// NG
import { ActiveDescendantKeyManager, FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { booleanAttribute, ChangeDetectorRef, Component, computed, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, input, Input, NgZone, Optional, Output, QueryList, Self, signal, ViewChild, ViewChildren, } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
// Vendor
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
// App
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { ErrorStateMatcher, mixinDisabled, mixinErrorState, mixinOverlay, mixinRequired, mixinTabIndex, NovoOptgroup, NovoOption, NOVO_OPTION_PARENT_COMPONENT, _countGroupLabelsBeforeOption, _getOptionScrollPosition, } from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { NOVO_FORM_FIELD, NovoFieldControl, NovoFieldElement } from 'novo-elements/elements/field';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "novo-elements/elements/common";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
import * as i6 from "novo-elements/elements/button";
import * as i7 from "novo-elements/elements/divider";
import * as i8 from "novo-elements/elements/tooltip";
import * as i9 from "novo-elements/elements/icon";
import * as i10 from "novo-elements/pipes";
import * as i11 from "novo-elements/elements/field";
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
            this._lingeringDisplayValue = null;
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
    /** Array of options to display in the select dropdown */
    set options(options) {
        this._options = options;
        this._initLegacyOptions();
    }
    get options() {
        return this._options;
    }
    /** Whether the select is focused. */
    get focused() {
        return this._focused || this.panelOpen;
    }
    /** Implemented as part of NovoFieldControl. */
    get empty() {
        return Helpers.isEmpty(this._value);
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
    constructor(elementRef, labels, ref, focusMonitor, ngZone, defaultErrorStateMatcher, ngControl, _parentForm, _parentFormGroup, _fieldElement) {
        super(defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.labels = labels;
        this.ref = ref;
        this.focusMonitor = focusMonitor;
        this.ngZone = ngZone;
        this._fieldElement = _fieldElement;
        this._uniqueId = `novo-select-${++nextId}`;
        this._stateChanges = Subscription.EMPTY;
        this._activeOptionChanges = Subscription.EMPTY;
        this._selectedOptionChanges = Subscription.EMPTY;
        this._destroy = new Subject();
        this.controlType = 'select';
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        /** User defined tab index. */
        this._userTabIndex = null;
        /**
         * The display string for the current value, kept from when the associated <novo-option> has stopped rendering
         * due to filtration
         */
        this._lingeringDisplayValue = null;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.placeholder = 'Select...';
        this.position = 'above-below';
        this.displayIcon = null;
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
        // This signal may be set programmatically by a SelectSearchComponent.
        this.hideLegacyOptionsForSearch = signal(false);
        this.hideLegacyOptions = input(false, { transform: booleanAttribute });
        this.displayLegacyOptions = computed(() => {
            return !(this.hideLegacyOptionsForSearch() || this.hideLegacyOptions());
        });
        this._value = null;
        this._multiple = false;
        this._focused = false;
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
        this._selectionModel = new SelectionModel(this.multiple);
    }
    ngOnInit() {
        this.stateChanges.next();
        this.focusMonitor.monitor(this.elementRef.nativeElement).subscribe((origin) => this.ngZone.run(() => {
            this._focused = !!origin;
            this.stateChanges.next();
        }));
    }
    ngOnChanges(changes) {
        // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
        // the parent form field know to run change detection when the disabled state changes.
        if (changes?.disabled) {
            this.stateChanges.next();
        }
        if (changes?.multiple) {
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
        setTimeout(() => {
            if (this._fieldElement?._labelElement) {
                this._ariaLabelledBy = this._fieldElement._labelElement.id;
            }
        });
    }
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
        this._stateChanges.unsubscribe();
        this._activeOptionChanges.unsubscribe();
        this._selectedOptionChanges.unsubscribe();
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    onClick() {
        this.togglePanel();
        return false;
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
        else if (value && !correspondingOption && this.displayLegacyOptions()) {
            // If searchComponent is present, we are using a text input filter; so if there is an
            // option not in the list, it is just filtered out
            // Double Check option not already added.
            const legacyOption = this.filteredOptions.find((it) => it.value === value);
            if (!legacyOption) {
                // Add a disabled option to the list and select it
                this._legacyOption = {
                    disabled: true,
                    tooltip: 'Value is not provided in list of valid options.',
                    label: value?.label || value,
                    value,
                };
                this.filteredOptions.push(this._legacyOption);
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
        const legacyOptionIndex = this.filteredOptions.lastIndexOf(this._legacyOption);
        if (legacyOptionIndex !== -1) {
            this.filteredOptions.splice(legacyOptionIndex, 1);
        }
        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
        this.stateChanges.next();
        this._watchSelectionEvents();
    }
    _getDisplayValue(option) {
        if (!option) {
            return this._lingeringDisplayValue ?? '';
        }
        let toDisplay = option.viewValue;
        if (this.displayWith) {
            toDisplay = this.displayWith(option.value);
        }
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        let displayValue = toDisplay != null ? toDisplay : '';
        if (displayValue != '') {
            this._lingeringDisplayValue = displayValue;
        }
        else if (this._lingeringDisplayValue) {
            displayValue = this._lingeringDisplayValue;
        }
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
        const isArrowKey = key === "ArrowDown" /* Key.ArrowDown */ || key === "ArrowUp" /* Key.ArrowUp */ || key === "ArrowLeft" /* Key.ArrowLeft */ || key === "ArrowRight" /* Key.ArrowRight */;
        const isOpenKey = key === "Enter" /* Key.Enter */ || key === " " /* Key.Space */;
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
        const isArrowKey = key === "ArrowDown" /* Key.ArrowDown */ || key === "ArrowUp" /* Key.ArrowUp */;
        const isTyping = manager.isTyping();
        if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.closePanel();
            // Don't do anything in this case if the user is typing,
            // because the typing sequence can include the space key.
        }
        else if (!isTyping && (key === "Enter" /* Key.Enter */ || key === " " /* Key.Space */) && manager.activeItem && !hasModifierKey(event)) {
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
        else if ("Escape" /* Key.Escape */ === key) {
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
            this.elementRef.nativeElement.focus(options);
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
        this._keyManager = new ActiveDescendantKeyManager(this._getOptions()).withTypeAhead(250).withHomeAndEnd();
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
                const options = this._getOptions();
                const index = options.findIndex(option => option.value == this._value);
                this._keyManager.setActiveItem(index);
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
                return {
                    ...item,
                    disabled: Boolean(item.readOnly || item.disabled),
                };
            })
                .map((item) => {
                return {
                    ...item,
                    active: false,
                };
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
    /**
     * @deprecated use highlight pipe
     */
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoSelectElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i2.FocusMonitor }, { token: i0.NgZone }, { token: i3.ErrorStateMatcher }, { token: i4.NgControl, optional: true, self: true }, { token: i4.NgForm, optional: true }, { token: i4.FormGroupDirective, optional: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "17.3.12", type: NovoSelectElement, selector: "novo-select", inputs: { disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: false, isRequired: false, transformFunction: null }, required: { classPropertyName: "required", publicName: "required", isSignal: false, isRequired: false, transformFunction: null }, tabIndex: { classPropertyName: "tabIndex", publicName: "tabIndex", isSignal: false, isRequired: false, transformFunction: null }, id: { classPropertyName: "id", publicName: "id", isSignal: false, isRequired: false, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: false, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: false, isRequired: false, transformFunction: null }, readonly: { classPropertyName: "readonly", publicName: "readonly", isSignal: false, isRequired: false, transformFunction: null }, headerConfig: { classPropertyName: "headerConfig", publicName: "headerConfig", isSignal: false, isRequired: false, transformFunction: null }, position: { classPropertyName: "position", publicName: "position", isSignal: false, isRequired: false, transformFunction: null }, overlayWidth: { classPropertyName: "overlayWidth", publicName: "overlayWidth", isSignal: false, isRequired: false, transformFunction: null }, overlayHeight: { classPropertyName: "overlayHeight", publicName: "overlayHeight", isSignal: false, isRequired: false, transformFunction: null }, displayIcon: { classPropertyName: "displayIcon", publicName: "displayIcon", isSignal: false, isRequired: false, transformFunction: null }, displayWith: { classPropertyName: "displayWith", publicName: "displayWith", isSignal: false, isRequired: false, transformFunction: null }, compareWith: { classPropertyName: "compareWith", publicName: "compareWith", isSignal: false, isRequired: false, transformFunction: null }, hideLegacyOptions: { classPropertyName: "hideLegacyOptions", publicName: "hideLegacyOptions", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: false, isRequired: false, transformFunction: null }, multiple: { classPropertyName: "multiple", publicName: "multiple", isSignal: false, isRequired: false, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { onSelect: "onSelect", selectionChange: "selectionChange", valueChange: "valueChange", openedChange: "openedChange", _openedStream: "opened", _closedStream: "closed" }, host: { attributes: { "role": "combobox", "aria-autocomplete": "none", "aria-haspopup": "true" }, listeners: { "click": "onClick($event)", "keydown": "_handleKeydown($event)" }, properties: { "attr.id": "id", "attr.aria-controls": "panelOpen ? id + \"-panel\" : null", "attr.aria-expanded": "panelOpen", "attr.aria-required": "required.toString()", "attr.aria-disabled": "disabled.toString()", "attr.aria-invalid": "errorState", "attr.aria-labelledby": "_ariaLabelledBy || null", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-activedescendant": "_getAriaActiveDescendant()", "class.novo-select-disabled": "disabled", "class.novo-select-invalid": "errorState", "class.novo-select-required": "required", "class.novo-select-empty": "empty", "class.novo-select-multiple": "multiple", "tabindex": "disabled ? -1 : 0" }, classAttribute: "novo-select" }, providers: [
            { provide: NovoFieldControl, useExisting: NovoSelectElement },
            { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoSelectElement },
        ], queries: [{ propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "contentOptions", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true, static: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }, { propertyName: "viewOptions", predicate: NovoOption, descendants: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <div class="novo-select-trigger">
      <span class="novo-select-placeholder" *ngIf="empty">{{ placeholder }}</span>
      <span class="text-ellipsis" *ngIf="!empty"><novo-icon size="sm" style="margin: 0 0 .25rem .1rem" *ngIf="displayIcon">{{ displayIcon }}</novo-icon> {{ displayValue }}</span>
      <i class="bhi-collapse"></i>
    </div>
    <novo-overlay-template
      [parent]="elementRef"
      [position]="position"
      [width]="overlayWidth"
      [height]="overlayHeight"
      (closing)="elementRef.nativeElement.focus()"
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
            <span [innerHtml]="option.label | highlight:filterTerm"></span> <i *ngIf="option.active" class="bhi-check"></i>
          </novo-option>
          <ng-template #divider>
            <novo-divider class="select-item-divider" [class.with-label]="option.label" [class.without-label]="!option.label">
              {{ option?.label }}
            </novo-divider>
          </ng-template>
        </ng-container>
      </div>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{display:block;position:relative;width:100%;max-width:800px;min-width:180px;cursor:pointer}:host:focus .novo-select-trigger{border-bottom:1px solid #4a89dc}:host:focus .novo-select-trigger i{color:#000000ba}:host:focus{outline:none}:host .novo-select-trigger{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;justify-content:space-between;align-items:center;background-color:transparent;border:none;border-bottom:1px solid #afb9c0;color:var(--text-main, #3d464d);height:2.05rem;position:relative;text-align:left;text-shadow:none;z-index:1;cursor:pointer;text-transform:none;padding:0 1rem 0 .5rem;margin-bottom:-1px;-webkit-appearance:none}:host .novo-select-trigger.text-capitalize{text-transform:capitalize}:host .novo-select-trigger.text-uppercase{text-transform:uppercase}:host .novo-select-trigger.text-nowrap{white-space:nowrap}:host .novo-select-trigger.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-select-trigger.text-size-default{font-size:inherit}:host .novo-select-trigger.text-size-body{font-size:1.3rem}:host .novo-select-trigger.text-size-xs{font-size:1rem}:host .novo-select-trigger.text-size-sm{font-size:1.2rem}:host .novo-select-trigger.text-size-md{font-size:1.3rem}:host .novo-select-trigger.text-size-lg{font-size:1.6rem}:host .novo-select-trigger.text-size-xl{font-size:2rem}:host .novo-select-trigger.text-size-2xl{font-size:2.6rem}:host .novo-select-trigger.text-size-3xl{font-size:3.2rem}:host .novo-select-trigger.text-size-smaller{font-size:.8em}:host .novo-select-trigger.text-size-larger{font-size:1.2em}:host .novo-select-trigger.text-color-black{color:#000}:host .novo-select-trigger.text-color-white{color:#fff}:host .novo-select-trigger.text-color-gray{color:#9e9e9e}:host .novo-select-trigger.text-color-grey{color:#9e9e9e}:host .novo-select-trigger.text-color-offWhite{color:#f7f7f7}:host .novo-select-trigger.text-color-bright{color:#f7f7f7}:host .novo-select-trigger.text-color-light{color:#dbdbdb}:host .novo-select-trigger.text-color-neutral{color:#4f5361}:host .novo-select-trigger.text-color-dark{color:#3d464d}:host .novo-select-trigger.text-color-orange{color:#ff6900}:host .novo-select-trigger.text-color-navigation{color:#202945}:host .novo-select-trigger.text-color-skyBlue{color:#009bdf}:host .novo-select-trigger.text-color-steel{color:#5b6770}:host .novo-select-trigger.text-color-metal{color:#637893}:host .novo-select-trigger.text-color-sand{color:#f4f4f4}:host .novo-select-trigger.text-color-silver{color:#e2e2e2}:host .novo-select-trigger.text-color-stone{color:#bebebe}:host .novo-select-trigger.text-color-ash{color:#a0a0a0}:host .novo-select-trigger.text-color-slate{color:#707070}:host .novo-select-trigger.text-color-onyx{color:#526980}:host .novo-select-trigger.text-color-charcoal{color:#282828}:host .novo-select-trigger.text-color-moonlight{color:#1a242f}:host .novo-select-trigger.text-color-midnight{color:#202945}:host .novo-select-trigger.text-color-darkness{color:#161f27}:host .novo-select-trigger.text-color-navy{color:#0d2d42}:host .novo-select-trigger.text-color-aqua{color:#3bafda}:host .novo-select-trigger.text-color-ocean{color:#4a89dc}:host .novo-select-trigger.text-color-mint{color:#37bc9b}:host .novo-select-trigger.text-color-grass{color:#8cc152}:host .novo-select-trigger.text-color-sunflower{color:#f6b042}:host .novo-select-trigger.text-color-bittersweet{color:#eb6845}:host .novo-select-trigger.text-color-grapefruit{color:#da4453}:host .novo-select-trigger.text-color-carnation{color:#d770ad}:host .novo-select-trigger.text-color-lavender{color:#967adc}:host .novo-select-trigger.text-color-mountain{color:#9678b6}:host .novo-select-trigger.text-color-info{color:#4a89dc}:host .novo-select-trigger.text-color-positive{color:#4a89dc}:host .novo-select-trigger.text-color-success{color:#8cc152}:host .novo-select-trigger.text-color-negative{color:#da4453}:host .novo-select-trigger.text-color-danger{color:#da4453}:host .novo-select-trigger.text-color-error{color:#da4453}:host .novo-select-trigger.text-color-warning{color:#f6b042}:host .novo-select-trigger.text-color-empty{color:#cccdcc}:host .novo-select-trigger.text-color-disabled{color:#bebebe}:host .novo-select-trigger.text-color-background{color:#f7f7f7}:host .novo-select-trigger.text-color-backgroundDark{color:#e2e2e2}:host .novo-select-trigger.text-color-presentation{color:#5b6770}:host .novo-select-trigger.text-color-bullhorn{color:#ff6900}:host .novo-select-trigger.text-color-pulse{color:#3bafda}:host .novo-select-trigger.text-color-company{color:#39d}:host .novo-select-trigger.text-color-candidate{color:#4b7}:host .novo-select-trigger.text-color-lead{color:#a69}:host .novo-select-trigger.text-color-contact{color:#fa4}:host .novo-select-trigger.text-color-clientcontact{color:#fa4}:host .novo-select-trigger.text-color-opportunity{color:#625}:host .novo-select-trigger.text-color-job{color:#b56}:host .novo-select-trigger.text-color-joborder{color:#b56}:host .novo-select-trigger.text-color-submission{color:#a9adbb}:host .novo-select-trigger.text-color-sendout{color:#747884}:host .novo-select-trigger.text-color-placement{color:#0b344f}:host .novo-select-trigger.text-color-note{color:#747884}:host .novo-select-trigger.text-color-contract{color:#454ea0}:host .novo-select-trigger.text-color-jobCode{color:#696d79}:host .novo-select-trigger.text-color-earnCode{color:#696d79}:host .novo-select-trigger.text-color-invoiceStatement{color:#696d79}:host .novo-select-trigger.text-color-billableCharge{color:#696d79}:host .novo-select-trigger.text-color-payableCharge{color:#696d79}:host .novo-select-trigger.text-color-user{color:#696d79}:host .novo-select-trigger.text-color-corporateUser{color:#696d79}:host .novo-select-trigger.text-color-distributionList{color:#696d79}:host .novo-select-trigger.text-color-credential{color:#696d79}:host .novo-select-trigger.text-color-person{color:#696d79}:host .novo-select-trigger.margin-before{margin-top:.4rem}:host .novo-select-trigger.margin-after{margin-bottom:.8rem}:host .novo-select-trigger.text-length-small{max-width:40ch}:host .novo-select-trigger.text-length-medium{max-width:55ch}:host .novo-select-trigger.text-length-large{max-width:70ch}:host .novo-select-trigger.text-weight-hairline{font-weight:100}:host .novo-select-trigger.text-weight-thin{font-weight:200}:host .novo-select-trigger.text-weight-light{font-weight:300}:host .novo-select-trigger.text-weight-normal{font-weight:400}:host .novo-select-trigger.text-weight-medium{font-weight:500}:host .novo-select-trigger.text-weight-semibold{font-weight:600}:host .novo-select-trigger.text-weight-bold{font-weight:700}:host .novo-select-trigger.text-weight-extrabold{font-weight:800}:host .novo-select-trigger.text-weight-heavy{font-weight:900}:host .novo-select-trigger.text-weight-lighter{font-weight:lighter}:host .novo-select-trigger.text-weight-bolder{font-weight:bolder}:host .novo-select-trigger.empty{color:#a9a9a9}:host .novo-select-trigger:hover{border-bottom:1px solid #5f6d78}:host .novo-select-trigger .novo-select-placeholder{color:var(--form-placeholder)}:host .novo-select-trigger i{font-size:.8em;color:#3d464d;position:absolute;right:0}:host[disabled],:host.novo-select-disabled{pointer-events:none}:host[disabled] div[type=button],:host.novo-select-disabled div[type=button]{color:#9e9e9e}:host[disabled] i,:host.novo-select-disabled i{color:#9e9e9e!important}:host[disabled] .novo-select-trigger,:host.novo-select-disabled .novo-select-trigger{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host[disabled] .novo-select-trigger:hover,:host.novo-select-disabled .novo-select-trigger:hover{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}.novo-select-list{background-color:var(--background-bright);cursor:default;list-style:none;overflow:auto;margin:0;padding:0;width:100%;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;font-size:1rem;z-index:-1;opacity:0}.novo-select-list.active{z-index:1000;max-height:219px;min-width:200px;width:100%;max-width:800px;width:inherit;overflow:auto;opacity:1}.novo-select-list .select-item{height:35px}.select-header button{text-transform:uppercase}.select-header button.header{color:#4a89dc;position:relative;text-align:left;cursor:pointer;height:3rem;margin:0;padding:.5rem 1.6rem 0 0;box-sizing:border-box;border:none;display:block;align-items:center;justify-content:space-between;font-size:1rem}.select-header button.header:focus,.select-header button.header:hover{color:#4f4f4f}.select-header button.header i{color:#4a89dc;padding-right:10px}.select-header button.header span{text-align:left}.select-header div.active{width:100%;float:right;padding:5px}.select-header div.active footer{float:right}.select-header div.active button{display:inline-block;border:none;float:left;width:auto;font-weight:500;font-size:.8rem;color:#acacac}.select-header div.active button:hover{color:#868686}.select-header div.active button.primary{color:#4a89dc}.select-header div.active button.primary:hover{color:#2363b6}.select-header div.active input{display:flex;justify-content:space-between;align-items:center;background-color:transparent;border:none;border-bottom:1px solid rgba(0,0,0,.12);color:#000000ba;height:2.05rem;position:relative;text-align:left;text-shadow:none;width:100%;z-index:1;cursor:pointer;text-transform:none;padding-top:10px;font-size:1rem}.select-header div.active input.empty{color:#a9a9a9}.select-header div.active input:focus{outline:none}.select-header div.active input:hover{border-bottom:1px solid #4a89dc}.select-header div.active input.invalid{border-bottom:1px solid #da4453}\n"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i7.NovoDividerComponent, selector: "novo-divider", inputs: ["vertical", "inset"] }, { kind: "component", type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i3.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "minWidth", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing", "backDropClicked"] }, { kind: "directive", type: i8.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "component", type: i9.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "pipe", type: i10.HighlightPipe, name: "highlight" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoSelectElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-select', inputs: ['disabled', 'required', 'tabIndex'], providers: [
                        { provide: NovoFieldControl, useExisting: NovoSelectElement },
                        { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoSelectElement },
                    ], template: `
    <div class="novo-select-trigger">
      <span class="novo-select-placeholder" *ngIf="empty">{{ placeholder }}</span>
      <span class="text-ellipsis" *ngIf="!empty"><novo-icon size="sm" style="margin: 0 0 .25rem .1rem" *ngIf="displayIcon">{{ displayIcon }}</novo-icon> {{ displayValue }}</span>
      <i class="bhi-collapse"></i>
    </div>
    <novo-overlay-template
      [parent]="elementRef"
      [position]="position"
      [width]="overlayWidth"
      [height]="overlayHeight"
      (closing)="elementRef.nativeElement.focus()"
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
            <span [innerHtml]="option.label | highlight:filterTerm"></span> <i *ngIf="option.active" class="bhi-check"></i>
          </novo-option>
          <ng-template #divider>
            <novo-divider class="select-item-divider" [class.with-label]="option.label" [class.without-label]="!option.label">
              {{ option?.label }}
            </novo-divider>
          </ng-template>
        </ng-container>
      </div>
    </novo-overlay-template>
  `, host: {
                        class: 'novo-select',
                        role: 'combobox',
                        'aria-autocomplete': 'none',
                        'aria-haspopup': 'true',
                        '[attr.id]': 'id',
                        '[attr.aria-controls]': 'panelOpen ? id + "-panel" : null',
                        '[attr.aria-expanded]': 'panelOpen',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-labelledby]': '_ariaLabelledBy || null',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
                        '[class.novo-select-disabled]': 'disabled',
                        '[class.novo-select-invalid]': 'errorState',
                        '[class.novo-select-required]': 'required',
                        '[class.novo-select-empty]': 'empty',
                        '[class.novo-select-multiple]': 'multiple',
                        '[tabindex]': 'disabled ? -1 : 0'
                    }, styles: [":host{display:block;position:relative;width:100%;max-width:800px;min-width:180px;cursor:pointer}:host:focus .novo-select-trigger{border-bottom:1px solid #4a89dc}:host:focus .novo-select-trigger i{color:#000000ba}:host:focus{outline:none}:host .novo-select-trigger{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;justify-content:space-between;align-items:center;background-color:transparent;border:none;border-bottom:1px solid #afb9c0;color:var(--text-main, #3d464d);height:2.05rem;position:relative;text-align:left;text-shadow:none;z-index:1;cursor:pointer;text-transform:none;padding:0 1rem 0 .5rem;margin-bottom:-1px;-webkit-appearance:none}:host .novo-select-trigger.text-capitalize{text-transform:capitalize}:host .novo-select-trigger.text-uppercase{text-transform:uppercase}:host .novo-select-trigger.text-nowrap{white-space:nowrap}:host .novo-select-trigger.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-select-trigger.text-size-default{font-size:inherit}:host .novo-select-trigger.text-size-body{font-size:1.3rem}:host .novo-select-trigger.text-size-xs{font-size:1rem}:host .novo-select-trigger.text-size-sm{font-size:1.2rem}:host .novo-select-trigger.text-size-md{font-size:1.3rem}:host .novo-select-trigger.text-size-lg{font-size:1.6rem}:host .novo-select-trigger.text-size-xl{font-size:2rem}:host .novo-select-trigger.text-size-2xl{font-size:2.6rem}:host .novo-select-trigger.text-size-3xl{font-size:3.2rem}:host .novo-select-trigger.text-size-smaller{font-size:.8em}:host .novo-select-trigger.text-size-larger{font-size:1.2em}:host .novo-select-trigger.text-color-black{color:#000}:host .novo-select-trigger.text-color-white{color:#fff}:host .novo-select-trigger.text-color-gray{color:#9e9e9e}:host .novo-select-trigger.text-color-grey{color:#9e9e9e}:host .novo-select-trigger.text-color-offWhite{color:#f7f7f7}:host .novo-select-trigger.text-color-bright{color:#f7f7f7}:host .novo-select-trigger.text-color-light{color:#dbdbdb}:host .novo-select-trigger.text-color-neutral{color:#4f5361}:host .novo-select-trigger.text-color-dark{color:#3d464d}:host .novo-select-trigger.text-color-orange{color:#ff6900}:host .novo-select-trigger.text-color-navigation{color:#202945}:host .novo-select-trigger.text-color-skyBlue{color:#009bdf}:host .novo-select-trigger.text-color-steel{color:#5b6770}:host .novo-select-trigger.text-color-metal{color:#637893}:host .novo-select-trigger.text-color-sand{color:#f4f4f4}:host .novo-select-trigger.text-color-silver{color:#e2e2e2}:host .novo-select-trigger.text-color-stone{color:#bebebe}:host .novo-select-trigger.text-color-ash{color:#a0a0a0}:host .novo-select-trigger.text-color-slate{color:#707070}:host .novo-select-trigger.text-color-onyx{color:#526980}:host .novo-select-trigger.text-color-charcoal{color:#282828}:host .novo-select-trigger.text-color-moonlight{color:#1a242f}:host .novo-select-trigger.text-color-midnight{color:#202945}:host .novo-select-trigger.text-color-darkness{color:#161f27}:host .novo-select-trigger.text-color-navy{color:#0d2d42}:host .novo-select-trigger.text-color-aqua{color:#3bafda}:host .novo-select-trigger.text-color-ocean{color:#4a89dc}:host .novo-select-trigger.text-color-mint{color:#37bc9b}:host .novo-select-trigger.text-color-grass{color:#8cc152}:host .novo-select-trigger.text-color-sunflower{color:#f6b042}:host .novo-select-trigger.text-color-bittersweet{color:#eb6845}:host .novo-select-trigger.text-color-grapefruit{color:#da4453}:host .novo-select-trigger.text-color-carnation{color:#d770ad}:host .novo-select-trigger.text-color-lavender{color:#967adc}:host .novo-select-trigger.text-color-mountain{color:#9678b6}:host .novo-select-trigger.text-color-info{color:#4a89dc}:host .novo-select-trigger.text-color-positive{color:#4a89dc}:host .novo-select-trigger.text-color-success{color:#8cc152}:host .novo-select-trigger.text-color-negative{color:#da4453}:host .novo-select-trigger.text-color-danger{color:#da4453}:host .novo-select-trigger.text-color-error{color:#da4453}:host .novo-select-trigger.text-color-warning{color:#f6b042}:host .novo-select-trigger.text-color-empty{color:#cccdcc}:host .novo-select-trigger.text-color-disabled{color:#bebebe}:host .novo-select-trigger.text-color-background{color:#f7f7f7}:host .novo-select-trigger.text-color-backgroundDark{color:#e2e2e2}:host .novo-select-trigger.text-color-presentation{color:#5b6770}:host .novo-select-trigger.text-color-bullhorn{color:#ff6900}:host .novo-select-trigger.text-color-pulse{color:#3bafda}:host .novo-select-trigger.text-color-company{color:#39d}:host .novo-select-trigger.text-color-candidate{color:#4b7}:host .novo-select-trigger.text-color-lead{color:#a69}:host .novo-select-trigger.text-color-contact{color:#fa4}:host .novo-select-trigger.text-color-clientcontact{color:#fa4}:host .novo-select-trigger.text-color-opportunity{color:#625}:host .novo-select-trigger.text-color-job{color:#b56}:host .novo-select-trigger.text-color-joborder{color:#b56}:host .novo-select-trigger.text-color-submission{color:#a9adbb}:host .novo-select-trigger.text-color-sendout{color:#747884}:host .novo-select-trigger.text-color-placement{color:#0b344f}:host .novo-select-trigger.text-color-note{color:#747884}:host .novo-select-trigger.text-color-contract{color:#454ea0}:host .novo-select-trigger.text-color-jobCode{color:#696d79}:host .novo-select-trigger.text-color-earnCode{color:#696d79}:host .novo-select-trigger.text-color-invoiceStatement{color:#696d79}:host .novo-select-trigger.text-color-billableCharge{color:#696d79}:host .novo-select-trigger.text-color-payableCharge{color:#696d79}:host .novo-select-trigger.text-color-user{color:#696d79}:host .novo-select-trigger.text-color-corporateUser{color:#696d79}:host .novo-select-trigger.text-color-distributionList{color:#696d79}:host .novo-select-trigger.text-color-credential{color:#696d79}:host .novo-select-trigger.text-color-person{color:#696d79}:host .novo-select-trigger.margin-before{margin-top:.4rem}:host .novo-select-trigger.margin-after{margin-bottom:.8rem}:host .novo-select-trigger.text-length-small{max-width:40ch}:host .novo-select-trigger.text-length-medium{max-width:55ch}:host .novo-select-trigger.text-length-large{max-width:70ch}:host .novo-select-trigger.text-weight-hairline{font-weight:100}:host .novo-select-trigger.text-weight-thin{font-weight:200}:host .novo-select-trigger.text-weight-light{font-weight:300}:host .novo-select-trigger.text-weight-normal{font-weight:400}:host .novo-select-trigger.text-weight-medium{font-weight:500}:host .novo-select-trigger.text-weight-semibold{font-weight:600}:host .novo-select-trigger.text-weight-bold{font-weight:700}:host .novo-select-trigger.text-weight-extrabold{font-weight:800}:host .novo-select-trigger.text-weight-heavy{font-weight:900}:host .novo-select-trigger.text-weight-lighter{font-weight:lighter}:host .novo-select-trigger.text-weight-bolder{font-weight:bolder}:host .novo-select-trigger.empty{color:#a9a9a9}:host .novo-select-trigger:hover{border-bottom:1px solid #5f6d78}:host .novo-select-trigger .novo-select-placeholder{color:var(--form-placeholder)}:host .novo-select-trigger i{font-size:.8em;color:#3d464d;position:absolute;right:0}:host[disabled],:host.novo-select-disabled{pointer-events:none}:host[disabled] div[type=button],:host.novo-select-disabled div[type=button]{color:#9e9e9e}:host[disabled] i,:host.novo-select-disabled i{color:#9e9e9e!important}:host[disabled] .novo-select-trigger,:host.novo-select-disabled .novo-select-trigger{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host[disabled] .novo-select-trigger:hover,:host.novo-select-disabled .novo-select-trigger:hover{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}.novo-select-list{background-color:var(--background-bright);cursor:default;list-style:none;overflow:auto;margin:0;padding:0;width:100%;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;font-size:1rem;z-index:-1;opacity:0}.novo-select-list.active{z-index:1000;max-height:219px;min-width:200px;width:100%;max-width:800px;width:inherit;overflow:auto;opacity:1}.novo-select-list .select-item{height:35px}.select-header button{text-transform:uppercase}.select-header button.header{color:#4a89dc;position:relative;text-align:left;cursor:pointer;height:3rem;margin:0;padding:.5rem 1.6rem 0 0;box-sizing:border-box;border:none;display:block;align-items:center;justify-content:space-between;font-size:1rem}.select-header button.header:focus,.select-header button.header:hover{color:#4f4f4f}.select-header button.header i{color:#4a89dc;padding-right:10px}.select-header button.header span{text-align:left}.select-header div.active{width:100%;float:right;padding:5px}.select-header div.active footer{float:right}.select-header div.active button{display:inline-block;border:none;float:left;width:auto;font-weight:500;font-size:.8rem;color:#acacac}.select-header div.active button:hover{color:#868686}.select-header div.active button.primary{color:#4a89dc}.select-header div.active button.primary:hover{color:#2363b6}.select-header div.active input{display:flex;justify-content:space-between;align-items:center;background-color:transparent;border:none;border-bottom:1px solid rgba(0,0,0,.12);color:#000000ba;height:2.05rem;position:relative;text-align:left;text-shadow:none;width:100%;z-index:1;cursor:pointer;text-transform:none;padding-top:10px;font-size:1rem}.select-header div.active input.empty{color:#a9a9a9}.select-header div.active input:focus{outline:none}.select-header div.active input:hover{border-bottom:1px solid #4a89dc}.select-header div.active input.invalid{border-bottom:1px solid #da4453}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i2.FocusMonitor }, { type: i0.NgZone }, { type: i3.ErrorStateMatcher }, { type: i4.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i4.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i4.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i11.NovoFieldElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_FORM_FIELD]
                }] }], propDecorators: { id: [{
                type: Input
            }], name: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], readonly: [{
                type: Input
            }], headerConfig: [{
                type: Input
            }], position: [{
                type: Input
            }], overlayWidth: [{
                type: Input
            }], overlayHeight: [{
                type: Input
            }], displayIcon: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], selectionChange: [{
                type: Output
            }], valueChange: [{
                type: Output
            }], openedChange: [{
                type: Output
            }], _openedStream: [{
                type: Output,
                args: ['opened']
            }], _closedStream: [{
                type: Output,
                args: ['closed']
            }], displayWith: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent, { static: true }]
            }], optionGroups: [{
                type: ContentChildren,
                args: [NovoOptgroup, { descendants: true }]
            }], contentOptions: [{
                type: ContentChildren,
                args: [NovoOption, { descendants: true }]
            }], viewOptions: [{
                type: ViewChildren,
                args: [NovoOption]
            }], panel: [{
                type: ViewChild,
                args: ['panel']
            }], value: [{
                type: Input
            }], multiple: [{
                type: Input
            }], options: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], _handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VsZWN0L1NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUVMLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFFBQVEsRUFDUixlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUlOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFDSixNQUFNLEVBRU4sU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RixTQUFTO0FBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFPLE1BQU0scUJBQXFCLENB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RUFBRTtnQkFHcEQsY0FBYztzQkFEYixlQUFlO3VCQUFDLFVBQVUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBR2xELFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxVQUFVO2dCQWF4QixLQUFLO3NCQURKLFNBQVM7dUJBQUMsT0FBTztnQkFRZCxLQUFLO3NCQURSLEtBQUs7Z0JBa0JGLFFBQVE7c0JBRFgsS0FBSztnQkFZRixPQUFPO3NCQURWLEtBQUs7Z0JBa0lOLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBa0xqQyxjQUFjO3NCQURiLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkdcbmltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyLCBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgaGFzTW9kaWZpZXJLZXkgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgY29tcHV0ZWQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgaW5wdXQsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2VsZixcbiAgc2lnbmFsLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBBcHBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEhlbHBlcnMsIEtleSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIENhblJlcXVpcmVDdG9yLFxuICBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvcixcbiAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gIEhhc092ZXJsYXlDdG9yLFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluRXJyb3JTdGF0ZSxcbiAgbWl4aW5PdmVybGF5LFxuICBtaXhpblJlcXVpcmVkLFxuICBtaXhpblRhYkluZGV4LFxuICBOb3ZvT3B0Z3JvdXAsXG4gIE5vdm9PcHRpb24sXG4gIE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2UsXG4gIE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsXG4gIF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uLFxuICBfZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24sXG59IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOT1ZPX0ZPUk1fRklFTEQsIE5vdm9GaWVsZENvbnRyb2wsIE5vdm9GaWVsZEVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ZpZWxkJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG4vLyBjb25zdCBTRUxFQ1RfVkFMVUVfQUNDRVNTT1IgPSB7XG4vLyAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuLy8gICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvU2VsZWN0RWxlbWVudCksXG4vLyAgIG11bHRpOiB0cnVlLFxuLy8gfTtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBOb3ZvU2VsZWN0Q2hhbmdlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgc2VsZWN0IHRoYXQgZW1pdHRlZCB0aGUgY2hhbmdlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyBzb3VyY2U6IE5vdm9TZWxlY3RFbGVtZW50LFxuICAgIC8qKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBzZWxlY3QgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgdmFsdWU6IGFueSxcbiAgKSB7fVxufVxuXG4vLyBDcmVhdGUgQmFzZSBDbGFzcyBmcm9tIE1peGluc1xuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGluc1xuY2xhc3MgTm92b1NlbGVjdEJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgcHVibGljIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgcHVibGljIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICkge31cbn1cbmNvbnN0IE5vdm9TZWxlY3RNaXhpbnM6IEhhc092ZXJsYXlDdG9yICZcbiAgQ2FuUmVxdWlyZUN0b3IgJlxuICBDYW5EaXNhYmxlQ3RvciAmXG4gIEhhc1RhYkluZGV4Q3RvciAmXG4gIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yICZcbiAgdHlwZW9mIE5vdm9TZWxlY3RCYXNlID0gbWl4aW5PdmVybGF5KG1peGluVGFiSW5kZXgobWl4aW5SZXF1aXJlZChtaXhpbkRpc2FibGVkKG1peGluRXJyb3JTdGF0ZShOb3ZvU2VsZWN0QmFzZSkpKSkpO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zZWxlY3QnLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAncmVxdWlyZWQnLCAndGFiSW5kZXgnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOb3ZvRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTm92b1NlbGVjdEVsZW1lbnQgfSxcbiAgICB7IHByb3ZpZGU6IE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBOb3ZvU2VsZWN0RWxlbWVudCB9LFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXNlbGVjdC10cmlnZ2VyXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm5vdm8tc2VsZWN0LXBsYWNlaG9sZGVyXCIgKm5nSWY9XCJlbXB0eVwiPnt7IHBsYWNlaG9sZGVyIH19PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWVsbGlwc2lzXCIgKm5nSWY9XCIhZW1wdHlcIj48bm92by1pY29uIHNpemU9XCJzbVwiIHN0eWxlPVwibWFyZ2luOiAwIDAgLjI1cmVtIC4xcmVtXCIgKm5nSWY9XCJkaXNwbGF5SWNvblwiPnt7IGRpc3BsYXlJY29uIH19PC9ub3ZvLWljb24+IHt7IGRpc3BsYXlWYWx1ZSB9fTwvc3Bhbj5cbiAgICAgIDxpIGNsYXNzPVwiYmhpLWNvbGxhcHNlXCI+PC9pPlxuICAgIDwvZGl2PlxuICAgIDxub3ZvLW92ZXJsYXktdGVtcGxhdGVcbiAgICAgIFtwYXJlbnRdPVwiZWxlbWVudFJlZlwiXG4gICAgICBbcG9zaXRpb25dPVwicG9zaXRpb25cIlxuICAgICAgW3dpZHRoXT1cIm92ZXJsYXlXaWR0aFwiXG4gICAgICBbaGVpZ2h0XT1cIm92ZXJsYXlIZWlnaHRcIlxuICAgICAgKGNsb3NpbmcpPVwiZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKClcIlxuICAgID5cbiAgICAgIDxkaXYgI3BhbmVsIGNsYXNzPVwibm92by1zZWxlY3QtbGlzdFwiIHRhYkluZGV4PVwiLTFcIiBbY2xhc3MuaGFzLWhlYWRlcl09XCJoZWFkZXJDb25maWdcIiBbY2xhc3MuYWN0aXZlXT1cInBhbmVsT3BlblwiPlxuICAgICAgICA8bm92by1vcHRpb24gKm5nSWY9XCJoZWFkZXJDb25maWdcIiBjbGFzcz1cInNlbGVjdC1oZWFkZXJcIiBbY2xhc3Mub3Blbl09XCJoZWFkZXIub3BlblwiPlxuICAgICAgICAgIDxub3ZvLWJ1dHRvbiAqbmdJZj1cIiFoZWFkZXIub3BlblwiIGljb249XCJhZGQtdGhpblwiIChjbGljayk9XCJ0b2dnbGVIZWFkZXIoJGV2ZW50KTsgKGZhbHNlKVwiIHRhYkluZGV4PVwiLTFcIiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgICAge3sgaGVhZGVyQ29uZmlnLmxhYmVsIH19XG4gICAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVhZGVyLm9wZW5cIiBbbmdDbGFzc109XCJ7IGFjdGl2ZTogaGVhZGVyLm9wZW4gfVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJoZWFkZXJDb25maWcucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICBbYXR0ci5pZF09XCJuYW1lXCJcbiAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cImhlYWRlci52YWx1ZVwiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgaW52YWxpZDogIWhlYWRlci52YWxpZCB9XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgICAgICA8bm92by1idXR0b24gKGNsaWNrKT1cInRvZ2dsZUhlYWRlcigkZXZlbnQsIGZhbHNlKVwiPnt7IGxhYmVscy5jYW5jZWwgfX08L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICA8bm92by1idXR0b24gKGNsaWNrKT1cInNhdmVIZWFkZXIoKVwiIGNsYXNzPVwicHJpbWFyeVwiPnt7IGxhYmVscy5zYXZlIH19PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICA8IS0tIERlY2xhcmF0aXZlIENvbnRlbnQgR29lcyBIZXJlIC0tPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwhLS0gRGF0YSBEcml2ZW4gQ29udGVudCBHb2VzIEhlcmUgLS0+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJlZE9wdGlvbnM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICpuZ0lmPVwiIW9wdGlvbi5kaXZpZGVyOyBlbHNlIGRpdmlkZXJcIlxuICAgICAgICAgICAgY2xhc3M9XCJzZWxlY3QtaXRlbVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwib3B0aW9uLmFjdGl2ZVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24tdmFsdWVdPVwib3B0aW9uLmxhYmVsXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgICAgW3Rvb2x0aXBdPVwib3B0aW9uLnRvb2x0aXBcIlxuICAgICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJvcHRpb24udG9vbHRpcFBvc2l0aW9uIHx8ICdyaWdodCdcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwib3B0aW9uLmxhYmVsIHwgaGlnaGxpZ2h0OmZpbHRlclRlcm1cIj48L3NwYW4+IDxpICpuZ0lmPVwib3B0aW9uLmFjdGl2ZVwiIGNsYXNzPVwiYmhpLWNoZWNrXCI+PC9pPlxuICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlICNkaXZpZGVyPlxuICAgICAgICAgICAgPG5vdm8tZGl2aWRlciBjbGFzcz1cInNlbGVjdC1pdGVtLWRpdmlkZXJcIiBbY2xhc3Mud2l0aC1sYWJlbF09XCJvcHRpb24ubGFiZWxcIiBbY2xhc3Mud2l0aG91dC1sYWJlbF09XCIhb3B0aW9uLmxhYmVsXCI+XG4gICAgICAgICAgICAgIHt7IG9wdGlvbj8ubGFiZWwgfX1cbiAgICAgICAgICAgIDwvbm92by1kaXZpZGVyPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL1NlbGVjdC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tc2VsZWN0JyxcbiAgICByb2xlOiAnY29tYm9ib3gnLFxuICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6ICdub25lJyxcbiAgICAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJyxcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAncGFuZWxPcGVuID8gaWQgKyBcIi1wYW5lbFwiIDogbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ3BhbmVsT3BlbicsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdfYXJpYUxhYmVsbGVkQnkgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ19hcmlhRGVzY3JpYmVkYnkgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnX2dldEFyaWFBY3RpdmVEZXNjZW5kYW50KCknLFxuICAgICdbY2xhc3Mubm92by1zZWxlY3QtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm5vdm8tc2VsZWN0LWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICdbY2xhc3Mubm92by1zZWxlY3QtcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAnW2NsYXNzLm5vdm8tc2VsZWN0LWVtcHR5XSc6ICdlbXB0eScsXG4gICAgJ1tjbGFzcy5ub3ZvLXNlbGVjdC1tdWx0aXBsZV0nOiAnbXVsdGlwbGUnLFxuICAgICdbdGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiAwJ1xuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2VsZWN0RWxlbWVudFxuICBleHRlbmRzIE5vdm9TZWxlY3RNaXhpbnNcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTm92b0ZpZWxkQ29udHJvbDxhbnk+XG57XG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbm92by1zZWxlY3QtJHsrK25leHRJZH1gO1xuICBwcml2YXRlIF9zdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2FjdGl2ZU9wdGlvbkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICByZWFkb25seSBjb250cm9sVHlwZTogc3RyaW5nID0gJ3NlbGVjdCc7XG5cbiAgLyoqIEBkb2NzLXByaXZhdGUgSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBsYXN0S2V5VmFsdWU6IHN0cmluZyA9IG51bGw7XG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4qL1xuICBsYXN0Q2FyZXRQb3NpdGlvbjogbnVtYmVyIHwgbnVsbDtcblxuICBfc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE5vdm9PcHRpb24+O1xuXG4gIC8qKiBUaGUgYXJpYS1sYWJlbGxlZGJ5IGF0dHJpYnV0ZSAqL1xuICBfYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcbiAgLyoqIFRoZSBhcmlhLWRlc2NyaWJlZGJ5IGF0dHJpYnV0ZSBvbiB0aGUgY2hpcCBsaXN0IGZvciBpbXByb3ZlZCBhMTF5LiAqL1xuICBfYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmc7XG4gIC8qKiBVc2VyIGRlZmluZWQgdGFiIGluZGV4LiAqL1xuICBfdXNlclRhYkluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgLyoqIFRoZSBGb2N1c0tleU1hbmFnZXIgd2hpY2ggaGFuZGxlcyBmb2N1cy4gKi9cbiAgX2tleU1hbmFnZXI6IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5vdm9PcHRpb24+O1xuICAvKiogXG4gICAqIFRoZSBkaXNwbGF5IHN0cmluZyBmb3IgdGhlIGN1cnJlbnQgdmFsdWUsIGtlcHQgZnJvbSB3aGVuIHRoZSBhc3NvY2lhdGVkIDxub3ZvLW9wdGlvbj4gaGFzIHN0b3BwZWQgcmVuZGVyaW5nXG4gICAqIGR1ZSB0byBmaWx0cmF0aW9uXG4gICAqL1xuICBwcml2YXRlIF9saW5nZXJpbmdEaXNwbGF5VmFsdWU6IHN0cmluZyA9IG51bGw7XG4gIHByaXZhdGUgX2xlZ2FjeU9wdGlvbjogYW55O1xuXG4gIEBJbnB1dCgpXG4gIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VsZWN0Li4uJztcbiAgQElucHV0KClcbiAgcmVhZG9ubHk6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGhlYWRlckNvbmZpZzogYW55O1xuICBASW5wdXQoKVxuICBwb3NpdGlvbjogc3RyaW5nID0gJ2Fib3ZlLWJlbG93JztcbiAgQElucHV0KClcbiAgb3ZlcmxheVdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpXG4gIG92ZXJsYXlIZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KClcbiAgZGlzcGxheUljb246IHN0cmluZyA9IG51bGw7XG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQgYnkgdGhlIHVzZXIuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOb3ZvU2VsZWN0Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b1NlbGVjdENoYW5nZT4oKTtcbiAgLyoqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2VsZWN0IGNoYW5nZXMuKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBwYW5lbCBoYXMgYmVlbiB0b2dnbGVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBvcGVuZWQuICovXG4gIEBPdXRwdXQoJ29wZW5lZCcpIHJlYWRvbmx5IF9vcGVuZWRTdHJlYW06IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLm9wZW5lZENoYW5nZS5waXBlKFxuICAgIGZpbHRlcigobykgPT4gbyksXG4gICAgbWFwKCgpID0+IHt9KSxcbiAgKTtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgQE91dHB1dCgnY2xvc2VkJykgcmVhZG9ubHkgX2Nsb3NlZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoXG4gICAgZmlsdGVyKChvKSA9PiAhbyksXG4gICAgbWFwKCgpID0+IHt9KSxcbiAgKTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBtYXBzIGFuIG9wdGlvbidzIGNvbnRyb2wgdmFsdWUgdG8gaXRzIGRpc3BsYXkgdmFsdWUgaW4gdGhlIHRyaWdnZXIuICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAoKHZhbHVlOiBhbnkpID0+IHN0cmluZykgfCBudWxsID0gbnVsbDtcbiAgLyoqICogRnVuY3Rpb24gdG8gY29tcGFyZSB0aGUgb3B0aW9uIHZhbHVlcyB3aXRoIHRoZSBzZWxlY3RlZCB2YWx1ZXMuICovXG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbiA9IChvMTogYW55LCBvMjogYW55KSA9PlxuICAgIG8xID09PSBvMiB8fCBvMSA9PT0gbzIuaWQgfHwgKCFIZWxwZXJzLmlzRW1wdHkobzEuaWQpICYmICFIZWxwZXJzLmlzRW1wdHkobzIuaWQpICYmIG8xLmlkID09PSBvMi5pZCk7XG5cbiAgaGVhZGVyOiBhbnkgPSB7XG4gICAgb3BlbjogZmFsc2UsXG4gICAgdmFsaWQ6IHRydWUsXG4gICAgdmFsdWU6ICcnLFxuICB9O1xuICBjcmVhdGVkSXRlbTogYW55O1xuICBtb2RlbDogYW55O1xuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgZmlsdGVyVGVybTogc3RyaW5nID0gJyc7XG4gIGZpbHRlclRlcm1UaW1lb3V0O1xuICBmaWx0ZXJlZE9wdGlvbnM6IGFueTtcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pXG4gIG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0Z3JvdXAsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8Tm92b09wdGdyb3VwPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGNvbnRlbnRPcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG4gIEBWaWV3Q2hpbGRyZW4oTm92b09wdGlvbilcbiAgdmlld09wdGlvbnM6IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPjtcblxuICAvLyBUaGlzIHNpZ25hbCBtYXkgYmUgc2V0IHByb2dyYW1tYXRpY2FsbHkgYnkgYSBTZWxlY3RTZWFyY2hDb21wb25lbnQuXG4gIGhpZGVMZWdhY3lPcHRpb25zRm9yU2VhcmNoID0gc2lnbmFsKGZhbHNlKTtcblxuICBoaWRlTGVnYWN5T3B0aW9ucyA9IGlucHV0KGZhbHNlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcblxuICBwcml2YXRlIGRpc3BsYXlMZWdhY3lPcHRpb25zID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiAhKHRoaXMuaGlkZUxlZ2FjeU9wdGlvbnNGb3JTZWFyY2goKSB8fCB0aGlzLmhpZGVMZWdhY3lPcHRpb25zKCkpO1xuICB9KVxuXG4gIEBWaWV3Q2hpbGQoJ3BhbmVsJylcbiAgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZShuZXdWYWx1ZTogYW55KSB7XG4gICAgLy8gQWx3YXlzIHJlLWFzc2lnbiBhbiBhcnJheSwgYmVjYXVzZSBpdCBtaWdodCBoYXZlIGJlZW4gbXV0YXRlZC5cbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX3ZhbHVlIHx8ICh0aGlzLl9tdWx0aXBsZSAmJiBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fc2V0U2VsZWN0aW9uQnlWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5fbGluZ2VyaW5nRGlzcGxheVZhbHVlID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgc2hvdWxkIGJlIGFsbG93ZWQgdG8gc2VsZWN0IG11bHRpcGxlIG9wdGlvbnMuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gIH1cbiAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMucG9zaXRpb24gPSAnYWJvdmUtYmVsb3cnO1xuICB9XG4gIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEFycmF5IG9mIG9wdGlvbnMgdG8gZGlzcGxheSBpbiB0aGUgc2VsZWN0IGRyb3Bkb3duICovXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IEFycmF5PGFueT4pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLl9pbml0TGVnYWN5T3B0aW9ucygpO1xuICB9XG4gIGdldCBvcHRpb25zKCk6IEFycmF5PGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG4gIHByaXZhdGUgX29wdGlvbnM6IEFycmF5PGFueT47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNlbGVjdCBpcyBmb2N1c2VkLiAqL1xuICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZCB8fCB0aGlzLnBhbmVsT3BlbjtcbiAgfVxuICBwcml2YXRlIF9mb2N1c2VkID0gZmFsc2U7XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBIZWxwZXJzLmlzRW1wdHkodGhpcy5fdmFsdWUpO1xuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgb3B0aW9uLiAqL1xuICBnZXQgc2VsZWN0ZWQoKTogTm92b09wdGlvbiB8IE5vdm9PcHRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZCA6IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdO1xuICB9XG5cbiAgLyoqIFRoZSB2YWx1ZSBkaXNwbGF5ZWQgaW4gdGhlIHRyaWdnZXIuICovXG4gIGdldCBkaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5lbXB0eSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLm1hcCgob3B0aW9uKSA9PiB0aGlzLl9nZXREaXNwbGF5VmFsdWUob3B0aW9uKSk7XG4gICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zLmpvaW4oJywgJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9nZXREaXNwbGF5VmFsdWUodGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwdWJsaWMgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBAT3B0aW9uYWwoKSBAU2VsZigpIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTk9WT19GT1JNX0ZJRUxEKSBwcml2YXRlIF9maWVsZEVsZW1lbnQ6IE5vdm9GaWVsZEVsZW1lbnQsXG4gICkge1xuICAgIHN1cGVyKGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlciwgX3BhcmVudEZvcm0sIF9wYXJlbnRGb3JtR3JvdXAsIG5nQ29udHJvbCk7XG4gICAgaWYgKG5nQ29udHJvbCkge1xuICAgICAgbmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgIH1cbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxOb3ZvT3B0aW9uPih0aGlzLm11bHRpcGxlKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5zdWJzY3JpYmUoKG9yaWdpbikgPT5cbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSAhIW9yaWdpbjtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBVcGRhdGluZyB0aGUgZGlzYWJsZWQgc3RhdGUgaXMgaGFuZGxlZCBieSBgbWl4aW5EaXNhYmxlZGAsIGJ1dCB3ZSBuZWVkIHRvIGFkZGl0aW9uYWxseSBsZXRcbiAgICAvLyB0aGUgcGFyZW50IGZvcm0gZmllbGQga25vdyB0byBydW4gY2hhbmdlIGRldGVjdGlvbiB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBjaGFuZ2VzLlxuICAgIGlmIChjaGFuZ2VzPy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcz8ubXVsdGlwbGUpIHtcbiAgICAgIC8vIFRPRE86IGNvcHkgc2VsZWN0aW9uIG92ZXI/P1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8Tm92b09wdGlvbj4odGhpcy5tdWx0aXBsZSk7XG4gICAgfVxuICAgIHRoaXMuX2luaXRMZWdhY3lPcHRpb25zKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBLZXlNYW5hZ2VyIHRvIG1hbmFnZSBrZXlib2FyZCBldmVudHNcbiAgICB0aGlzLl9pbml0S2V5TWFuYWdlcigpO1xuICAgIC8vIFN1YnNjcmliZSB0byBOb3ZvT3B0aW9uIHNlbGVjdGlvbnNcbiAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgIC8vIFNldCBpbml0aWFsIHZhbHVlXG4gICAgdGhpcy5faW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgIC8vIExpc3RlbiB0byBzZWxlY3Rpb24gY2hhbmdlcyB0byBzZWxlY3QgYW5kIGRlc2VsZWN0IG9wdGlvbnNcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5jaGFuZ2VkLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5hZGRlZC5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3QpIHtcbiAgICAgICAgICBvcHRpb24uc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZXZlbnQucmVtb3ZlZC5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5kZXNlbGVjdCkge1xuICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBMaXN0ZW4gdG8gUXVlcnlMaXN0IGNoYW5nZXNcbiAgICBtZXJnZSh0aGlzLmNvbnRlbnRPcHRpb25zLmNoYW5nZXMsIHRoaXMudmlld09wdGlvbnMuY2hhbmdlcylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplU2VsZWN0aW9uKCk7XG4gICAgICB9KTtcblxuICAgIG1lcmdlKHRoaXMub3ZlcmxheS5vcGVuaW5nLCB0aGlzLm92ZXJsYXkuY2xvc2luZylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHRoaXMucGFuZWxPcGVuKTtcbiAgICAgIH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2ZpZWxkRWxlbWVudD8uX2xhYmVsRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9hcmlhTGFiZWxsZWRCeSA9IHRoaXMuX2ZpZWxkRWxlbWVudC5fbGFiZWxFbGVtZW50LmlkO1xuICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWN0aXZlT3B0aW9uQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLnRvZ2dsZVBhbmVsKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgb3BlblBhbmVsKCkge1xuICAgIHN1cGVyLm9wZW5QYW5lbCgpO1xuICAgIHRoaXMuX2hpZ2hsaWdodENvcnJlY3RPcHRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRpYWxpemVTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3NldFNlbGVjdGlvbkJ5VmFsdWUodGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlKTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWxlY3RlZCBvcHRpb24gYmFzZWQgb24gYSB2YWx1ZS4gSWYgbm8gb3B0aW9uIGNhbiBiZVxuICAgKiBmb3VuZCB3aXRoIHRoZSBkZXNpZ25hdGVkIHZhbHVlLCB0aGUgc2VsZWN0IHRyaWdnZXIgaXMgY2xlYXJlZC5cbiAgICovXG4gIHByaXZhdGUgX3NldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWU6IGFueSB8IGFueVtdKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBpZiAob3B0aW9uLnNldEluYWN0aXZlU3R5bGVzKSB7XG4gICAgICAgIG9wdGlvbi5zZXRJbmFjdGl2ZVN0eWxlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdmFsdWUpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZTogYW55KSA9PiB0aGlzLl9zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgICAgIHRoaXMuX3NvcnRWYWx1ZXMoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2tleU1hbmFnZXIpIHtcbiAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdPcHRpb24gPSB0aGlzLl9zZWxlY3RWYWx1ZSh2YWx1ZSk7XG4gICAgICAvLyBTaGlmdCBmb2N1cyB0byB0aGUgYWN0aXZlIGl0ZW0uIE5vdGUgdGhhdCB3ZSBzaG91bGRuJ3QgZG8gdGhpcyBpbiBtdWx0aXBsZVxuICAgICAgLy8gbW9kZSwgYmVjYXVzZSB3ZSBkb24ndCBrbm93IHdoYXQgb3B0aW9uIHRoZSB1c2VyIGludGVyYWN0ZWQgd2l0aCBsYXN0LlxuICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJlc2V0IHRoZSBoaWdobGlnaHRlZCBvcHRpb24uIE5vdGUgdGhhdCB3ZSBvbmx5IHdhbnQgdG8gZG8gdGhpcyB3aGlsZVxuICAgICAgICAvLyBjbG9zZWQsIGJlY2F1c2UgZG9pbmcgaXQgd2hpbGUgb3BlbiBjYW4gc2hpZnQgdGhlIHVzZXIncyBmb2N1cyB1bm5lY2Vzc2FyaWx5LlxuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oLTEpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbmQgc2VsZWN0cyBhbmQgb3B0aW9uIGJhc2VkIG9uIGl0cyB2YWx1ZS5cbiAgICogQHJldHVybnMgT3B0aW9uIHRoYXQgaGFzIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2VsZWN0VmFsdWUodmFsdWU6IGFueSk6IE5vdm9PcHRpb24gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGFsbE9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IGFsbE9wdGlvbnMuZmluZCgob3B0aW9uOiBOb3ZvT3B0aW9uKSA9PiB7XG4gICAgICAvLyBTa2lwIG9wdGlvbnMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgbW9kZWwuIFRoaXMgYWxsb3dzIHVzIHRvIGhhbmRsZSBjYXNlc1xuICAgICAgLy8gd2hlcmUgdGhlIHNhbWUgcHJpbWl0aXZlIHZhbHVlIGlzIHNlbGVjdGVkIG11bHRpcGxlIHRpbWVzLlxuICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gIUhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkgJiYgIUhlbHBlcnMuaXNFbXB0eShvcHRpb24udmFsdWUpICYmIHRoaXMuY29tcGFyZVdpdGgob3B0aW9uLnZhbHVlLCB2YWx1ZSk7XG4gICAgfSk7XG4gICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChjb3JyZXNwb25kaW5nT3B0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmICFjb3JyZXNwb25kaW5nT3B0aW9uICYmIHRoaXMuZGlzcGxheUxlZ2FjeU9wdGlvbnMoKSkge1xuICAgICAgLy8gSWYgc2VhcmNoQ29tcG9uZW50IGlzIHByZXNlbnQsIHdlIGFyZSB1c2luZyBhIHRleHQgaW5wdXQgZmlsdGVyOyBzbyBpZiB0aGVyZSBpcyBhblxuICAgICAgLy8gb3B0aW9uIG5vdCBpbiB0aGUgbGlzdCwgaXQgaXMganVzdCBmaWx0ZXJlZCBvdXRcbiAgICAgIC8vIERvdWJsZSBDaGVjayBvcHRpb24gbm90IGFscmVhZHkgYWRkZWQuXG4gICAgICBjb25zdCBsZWdhY3lPcHRpb24gPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5maW5kKChpdCkgPT4gaXQudmFsdWUgPT09IHZhbHVlKTtcbiAgICAgIGlmICghbGVnYWN5T3B0aW9uKSB7XG4gICAgICAgIC8vIEFkZCBhIGRpc2FibGVkIG9wdGlvbiB0byB0aGUgbGlzdCBhbmQgc2VsZWN0IGl0XG4gICAgICAgIHRoaXMuX2xlZ2FjeU9wdGlvbiA9IHtcbiAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICB0b29sdGlwOiAnVmFsdWUgaXMgbm90IHByb3ZpZGVkIGluIGxpc3Qgb2YgdmFsaWQgb3B0aW9ucy4nLFxuICAgICAgICAgIGxhYmVsOiB2YWx1ZT8ubGFiZWwgfHwgdmFsdWUsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMucHVzaCh0aGlzLl9sZWdhY3lPcHRpb24pO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvcnJlc3BvbmRpbmdPcHRpb247XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0KG9wdGlvbiwgaSwgZmlyZUV2ZW50czogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBjb25zb2xlLndhcm4oJ3NlbGVjdCgpIG1ldGhvZCBpcyBkZXByZWNhdGVkJyk7XG4gIH1cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIGNvbnNvbGUud2FybignY2xlYXIoKSBtZXRob2QgaXMgZGVwcmVjYXRlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBpdGVtIGlzIG5vdCBkaXNhYmxlZCwgdGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLFxuICAgKiBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWQgY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eVxuICAgKiBpZiB0aGlzIGludGVyYWN0aW9uIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIGhhbmRsZVNlbGVjdGlvbihvcHRpb246IE5vdm9PcHRpb24sIGlzVXNlcklucHV0OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKTtcbiAgICBpZiAob3B0aW9uLnZhbHVlID09IG51bGwgJiYgIXRoaXMuX211bHRpcGxlKSB7XG4gICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICBpZiAodGhpcy52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMob3B0aW9uLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHdhc1NlbGVjdGVkICE9PSBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID8gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KG9wdGlvbikgOiB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChvcHRpb24pO1xuICAgICAgfVxuICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShvcHRpb24pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5fc29ydFZhbHVlcygpO1xuICAgICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbGVnYWN5T3B0aW9uSW5kZXggPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5sYXN0SW5kZXhPZih0aGlzLl9sZWdhY3lPcHRpb24pO1xuICAgIGlmIChsZWdhY3lPcHRpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zLnNwbGljZShsZWdhY3lPcHRpb25JbmRleCwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHdhc1NlbGVjdGVkICE9PSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKG9wdGlvbikpIHtcbiAgICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXREaXNwbGF5VmFsdWUob3B0aW9uOiBOb3ZvT3B0aW9uICYgeyB2YWx1ZT86IGFueTsgbGFiZWw/OiBzdHJpbmcgfSk6IHN0cmluZyB7XG4gICAgaWYgKCFvcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLl9saW5nZXJpbmdEaXNwbGF5VmFsdWUgPz8gJyc7XG4gICAgfVxuICAgIGxldCB0b0Rpc3BsYXkgPSBvcHRpb24udmlld1ZhbHVlO1xuICAgIGlmICh0aGlzLmRpc3BsYXlXaXRoKSB7XG4gICAgICB0b0Rpc3BsYXkgPSB0aGlzLmRpc3BsYXlXaXRoKG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuICAgIC8vIFNpbXBseSBmYWxsaW5nIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBkaXNwbGF5IHZhbHVlIGlzIGZhbHN5IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAgLy8gVGhlIGRpc3BsYXkgdmFsdWUgY2FuIGFsc28gYmUgdGhlIG51bWJlciB6ZXJvIGFuZCBzaG91bGRuJ3QgZmFsbCBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICBsZXQgZGlzcGxheVZhbHVlID0gdG9EaXNwbGF5ICE9IG51bGwgPyB0b0Rpc3BsYXkgOiAnJztcbiAgICBpZiAoZGlzcGxheVZhbHVlICE9ICcnKSB7XG4gICAgICB0aGlzLl9saW5nZXJpbmdEaXNwbGF5VmFsdWUgPSBkaXNwbGF5VmFsdWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9saW5nZXJpbmdEaXNwbGF5VmFsdWUpIHtcbiAgICAgIGRpc3BsYXlWYWx1ZSA9IHRoaXMuX2xpbmdlcmluZ0Rpc3BsYXlWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3BsYXlWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb25cbiAgICovXG4gIHByaXZhdGUgX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihza2lwOiBOb3ZvT3B0aW9uKSB7XG4gICAgdGhpcy5fZ2V0T3B0aW9ucygpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgaWYgKG9wdGlvbiAhPT0gc2tpcCAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFNlbGVjdGlvbkV2ZW50cygpIHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9ucygpO1xuICAgIGNvbnN0IHNlbGVjdGlvbkV2ZW50cyA9IG9wdGlvbnMgPyBtZXJnZSguLi5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpKSA6IG9mKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzID0gc2VsZWN0aW9uRXZlbnRzLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChldmVudDogTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSkgPT4ge1xuICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgdGhpcy5oYW5kbGVTZWxlY3Rpb24oZXZlbnQuc291cmNlLCBldmVudC5pc1VzZXJJbnB1dCk7XG4gICAgICBpZiAoZXZlbnQuaXNVc2VySW5wdXQgJiYgIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGFsbCBrZXlkb3duIGV2ZW50cyBvbiB0aGUgc2VsZWN0LiAqL1xuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMucGFuZWxPcGVuID8gdGhpcy5faGFuZGxlT3BlbktleWRvd24oZXZlbnQpIDogdGhpcy5faGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIHdoaWxlIHRoZSBzZWxlY3QgaXMgY2xvc2VkLiAqL1xuICBwcml2YXRlIF9oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXkgPT09IEtleS5BcnJvd0Rvd24gfHwga2V5ID09PSBLZXkuQXJyb3dVcCB8fCBrZXkgPT09IEtleS5BcnJvd0xlZnQgfHwga2V5ID09PSBLZXkuQXJyb3dSaWdodDtcbiAgICBjb25zdCBpc09wZW5LZXkgPSBrZXkgPT09IEtleS5FbnRlciB8fCBrZXkgPT09IEtleS5TcGFjZTtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcbiAgICAvLyBPcGVuIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICBpZiAoKCFtYW5hZ2VyLmlzVHlwaW5nKCkgJiYgaXNPcGVuS2V5ICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHx8ICgodGhpcy5tdWx0aXBsZSB8fCBldmVudC5hbHRLZXkpICYmIGlzQXJyb3dLZXkpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICAgIC8vIEFsbG93IGNoYW5naW5nIHZhbHVlIHdpdGggYXJyb3cga2V5cy5cbiAgICAvLyBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgIC8vICAgY29uc3QgcHJldmlvdXNseVNlbGVjdGVkT3B0aW9uID0gdGhpcy5zZWxlY3RlZDtcbiAgICAvLyAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAvLyAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5zZWxlY3RlZDtcbiAgICAvLyB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hlbiB0aGUgc2VsZWN0ZWQgaXMgb3Blbi4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlT3BlbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgY29uc3QgaXNBcnJvd0tleSA9IGtleSA9PT0gS2V5LkFycm93RG93biB8fCBrZXkgPT09IEtleS5BcnJvd1VwO1xuICAgIGNvbnN0IGlzVHlwaW5nID0gbWFuYWdlci5pc1R5cGluZygpO1xuXG4gICAgaWYgKGlzQXJyb3dLZXkgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAvLyBDbG9zZSB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpbiB0aGlzIGNhc2UgaWYgdGhlIHVzZXIgaXMgdHlwaW5nLFxuICAgICAgLy8gYmVjYXVzZSB0aGUgdHlwaW5nIHNlcXVlbmNlIGNhbiBpbmNsdWRlIHRoZSBzcGFjZSBrZXkuXG4gICAgfSBlbHNlIGlmICghaXNUeXBpbmcgJiYgKGtleSA9PT0gS2V5LkVudGVyIHx8IGtleSA9PT0gS2V5LlNwYWNlKSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0gJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbS5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICB9IGVsc2UgaWYgKCFpc1R5cGluZyAmJiB0aGlzLl9tdWx0aXBsZSAmJiBbJ2EnLCAnQSddLmluY2x1ZGVzKGtleSkgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGhhc0Rlc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLnNvbWUoKG9wdCkgPT4gIW9wdC5kaXNhYmxlZCAmJiAhb3B0LnNlbGVjdGVkKTtcbiAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKCFvcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgICBoYXNEZXNlbGVjdGVkT3B0aW9ucyA/IG9wdGlvbi5zZWxlY3QoKSA6IG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKEtleS5Fc2NhcGUgPT09IGtleSkge1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkSW5kZXggPSBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcbiAgICAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgIGlmICh0aGlzLl9tdWx0aXBsZSAmJiBpc0Fycm93S2V5ICYmIGV2ZW50LnNoaWZ0S2V5ICYmIG1hbmFnZXIuYWN0aXZlSXRlbSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAhPT0gcHJldmlvdXNseUZvY3VzZWRJbmRleCkge1xuICAgICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fYXJpYURlc2NyaWJlZGJ5ID0gaWRzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIGNoaXAgaW4gdGhpcyBjaGlwIGxpc3QsIG9yIHRoZSBhc3NvY2lhdGVkIGlucHV0IHdoZW4gdGhlcmVcbiAgICogYXJlIG5vIGVsaWdpYmxlIGNoaXBzLlxuICAgKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRPcHRpb25zKCkge1xuICAgIHJldHVybiBbLi4uKHRoaXMudmlld09wdGlvbnMgfHwgW10pLCAuLi4odGhpcy5jb250ZW50T3B0aW9ucyB8fCBbXSldO1xuICB9XG5cbiAgLyoqIFNvcnRzIHRoZSBzZWxlY3RlZCB2YWx1ZXMgaW4gdGhlIHNlbGVjdGVkIGJhc2VkIG9uIHRoZWlyIG9yZGVyIGluIHRoZSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfc29ydFZhbHVlcygpIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgLy8gVE9ETy5cbiAgICB9XG4gIH1cblxuICAvKiogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIHNldCB0aGUgbW9kZWwgdmFsdWUuICovXG4gIHByaXZhdGUgX3Byb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgIGxldCB2YWx1ZVRvRW1pdDogYW55ID0gbnVsbDtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgdmFsdWVUb0VtaXQgPSAodGhpcy5zZWxlY3RlZCBhcyBOb3ZvT3B0aW9uW10pLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZVRvRW1pdCA9IHRoaXMuc2VsZWN0ZWQgPyAodGhpcy5zZWxlY3RlZCBhcyBOb3ZvT3B0aW9uKS52YWx1ZSA6IGZhbGxiYWNrVmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVRvRW1pdDtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSh2YWx1ZVRvRW1pdCk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHsgc2VsZWN0ZWQ6IHZhbHVlVG9FbWl0IH0pO1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5fbWFrZUNoYW5nZUV2ZW50KHZhbHVlVG9FbWl0KSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX21ha2VDaGFuZ2VFdmVudCh2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBOb3ZvU2VsZWN0Q2hhbmdlKHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBTY3JvbGxzIHRoZSBhY3RpdmUgb3B0aW9uIGludG8gdmlldy4gKi9cbiAgcHJvdGVjdGVkIF9zY3JvbGxPcHRpb25JbnRvVmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBRdWVyeUxpc3Q8Tm92b09wdGlvbj4oKTtcbiAgICBvcHRpb25zLnJlc2V0KHRoaXMuX2dldE9wdGlvbnMoKSk7XG4gICAgY29uc3QgbGFiZWxDb3VudCA9IF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKGluZGV4LCBvcHRpb25zLCB0aGlzLm9wdGlvbkdyb3Vwcyk7XG4gICAgY29uc3QgaXRlbUhlaWdodCA9IHRoaXMuX2dldEl0ZW1IZWlnaHQoKTtcbiAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgKGluZGV4ICsgbGFiZWxDb3VudCkgKiBpdGVtSGVpZ2h0LFxuICAgICAgaXRlbUhlaWdodCxcbiAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICk7XG4gIH1cblxuICAvKiogU2V0cyB1cCBhIGtleSBtYW5hZ2VyIHRvIGxpc3RlbiB0byBrZXlib2FyZCBldmVudHMgb24gdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gIHByaXZhdGUgX2luaXRLZXlNYW5hZ2VyKCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5fZ2V0T3B0aW9ucygpKS53aXRoVHlwZUFoZWFkKDI1MCkud2l0aEhvbWVBbmRFbmQoKTtcbiAgICAvLyAud2l0aEFsbG93ZWRNb2RpZmllcktleXMoWydzaGlmdEtleSddKTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIudGFiT3V0LnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgIC8vIFNlbGVjdCB0aGUgYWN0aXZlIGl0ZW0gd2hlbiB0YWJiaW5nIGF3YXkuIFRoaXMgaXMgY29uc2lzdGVudCB3aXRoIGhvdyB0aGUgbmF0aXZlXG4gICAgICAgIC8vIHNlbGVjdCBiZWhhdmVzLiBOb3RlIHRoYXQgd2Ugb25seSB3YW50IHRvIGRvIHRoaXMgaW4gc2luZ2xlIHNlbGVjdGlvbiBtb2RlLlxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc3RvcmUgZm9jdXMgdG8gdGhlIHRyaWdnZXIgYmVmb3JlIGNsb3NpbmcuIEVuc3VyZXMgdGhhdCB0aGUgZm9jdXNcbiAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuICYmIHRoaXMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLl9zY3JvbGxPcHRpb25JbnRvVmlldyh0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMucGFuZWxPcGVuICYmICF0aGlzLm11bHRpcGxlICYmIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyB0aGUgc2VsZWN0ZWQgaXRlbS4gSWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkLCBpdCB3aWxsIGhpZ2hsaWdodFxuICAgKiB0aGUgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgKi9cbiAgcHJpdmF0ZSBfaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fa2V5TWFuYWdlcikge1xuICAgICAgaWYgKHRoaXMuZW1wdHkpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3B0aW9ucy5maW5kSW5kZXgob3B0aW9uID0+IG9wdGlvbi52YWx1ZSA9PSB0aGlzLl92YWx1ZSlcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBzZWxlY3QncyBvcHRpb25zLiAqL1xuICBwcml2YXRlIF9nZXRJdGVtSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IFtmaXJzdF0gPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgaWYgKGZpcnN0KSB7XG4gICAgICByZXR1cm4gZmlyc3QuX2dldEhvc3RFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8vIFRPRE86IERlcHJlY2F0ZSB0aGlzXG4gIHByaXZhdGUgX2luaXRMZWdhY3lPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBpdGVtLCBsYWJlbDogaXRlbSB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gKHRoaXMub3B0aW9ucyB8fCBbXSlcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IEJvb2xlYW4oaXRlbS5yZWFkT25seSB8fCBpdGVtLmRpc2FibGVkKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBEZXByZWNhdGUgYWxsIGhlYWRlciBtZXRob2RzXG4gICAqL1xuICB0b2dnbGVIZWFkZXIoZXZlbnQsIGZvcmNlVmFsdWU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAvLyBSZXZlcnNlIHRoZSBhY3RpdmUgcHJvcGVydHkgKGlmIGZvcmNlVmFsdWUsIHVzZSB0aGF0KVxuICAgIHRoaXMuaGVhZGVyID0ge1xuICAgICAgb3BlbjogZm9yY2VWYWx1ZSAhPT0gdW5kZWZpbmVkID8gZm9yY2VWYWx1ZSA6ICF0aGlzLmhlYWRlci5vcGVuLFxuICAgICAgdmFsdWU6ICcnLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgaGlnaGxpZ2h0IHBpcGVcbiAgICovXG4gIGhpZ2hsaWdodChtYXRjaCwgcXVlcnkpIHtcbiAgICAvLyBSZXBsYWNlcyB0aGUgY2FwdHVyZSBzdHJpbmcgd2l0aCBhIHRoZSBzYW1lIHN0cmluZyBpbnNpZGUgb2YgYSBcInN0cm9uZ1wiIHRhZ1xuICAgIHJldHVybiBxdWVyeSA/IG1hdGNoLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLmVzY2FwZVJlZ2V4cChxdWVyeSksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPicpIDogbWF0Y2g7XG4gIH1cblxuICBlc2NhcGVSZWdleHAocXVlcnlUb0VzY2FwZSkge1xuICAgIC8vIEV4OiBpZiB0aGUgY2FwdHVyZSBpcyBcImFcIiB0aGUgcmVzdWx0IHdpbGwgYmUgXFxhXG4gICAgcmV0dXJuIHF1ZXJ5VG9Fc2NhcGUucmVwbGFjZSgvKFsuPyorXiRbXFxdXFxcXCgpe318LV0pL2csICdcXFxcJDEnKTtcbiAgfVxuXG4gIHNhdmVIZWFkZXIoKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyLnZhbHVlKSB7XG4gICAgICB0aGlzLmhlYWRlckNvbmZpZy5vblNhdmUodGhpcy5oZWFkZXIudmFsdWUpO1xuICAgICAgdGhpcy5jcmVhdGVkSXRlbSA9IHRoaXMuaGVhZGVyLnZhbHVlO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVhZGVyLnZhbGlkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqIERldGVybWluZXMgdGhlIGBhcmlhLWFjdGl2ZWRlc2NlbmRhbnRgIHRvIGJlIHNldCBvbiB0aGUgaG9zdC4gKi9cbiAgX2dldEFyaWFBY3RpdmVEZXNjZW5kYW50KCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiB0aGlzLl9rZXlNYW5hZ2VyICYmIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbS5pZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19