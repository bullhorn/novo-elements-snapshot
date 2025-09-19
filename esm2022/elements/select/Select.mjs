// NG
import { ActiveDescendantKeyManager, FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { booleanAttribute, ChangeDetectorRef, Component, computed, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Injector, input, Input, NgZone, Optional, Output, QueryList, Self, signal, ViewChild, ViewChildren, } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
// Vendor
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, startWith, take, takeUntil } from 'rxjs/operators';
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
    constructor(elementRef, labels, ref, focusMonitor, ngZone, injector, defaultErrorStateMatcher, ngControl, _parentForm, _parentFormGroup, _fieldElement) {
        super(defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this.elementRef = elementRef;
        this.labels = labels;
        this.ref = ref;
        this.focusMonitor = focusMonitor;
        this.ngZone = ngZone;
        this.injector = injector;
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
        this.viewOptionsSignal = signal(null);
        this.contentOptionsSignal = signal(null);
        // This signal may be set programmatically by a SelectSearchComponent.
        this.hideLegacyOptionsForSearch = signal(false);
        this.hideLegacyOptions = input(false, { transform: booleanAttribute });
        this.displayLegacyOptions = computed(() => {
            return !(this.hideLegacyOptionsForSearch() || this.hideLegacyOptions());
        });
        this._value = null;
        this._multiple = false;
        this._focused = false;
        this._optionsComputed = computed(() => {
            return [...(this.viewOptionsSignal() || []), ...(this.contentOptionsSignal() || [])];
        });
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
        this._selectionModel = new SelectionModel(this.multiple);
        // Initialize KeyManager to manage keyboard events
        this._initKeyManager();
    }
    ngOnInit() {
        this.stateChanges.next();
        this._initLegacyOptions();
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
        this.contentOptions.changes.pipe(takeUntil(this._destroy), startWith(this.contentOptions))
            .subscribe(contentOptions => {
            this.contentOptionsSignal.set(contentOptions.toArray());
        });
        this.viewOptions.changes.pipe(takeUntil(this._destroy))
            .subscribe(viewOptions => {
            this.viewOptionsSignal.set(viewOptions.toArray());
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
        this._keyManager = new ActiveDescendantKeyManager(this._optionsComputed, this.injector).withTypeAhead(250).withHomeAndEnd();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoSelectElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i2.FocusMonitor }, { token: i0.NgZone }, { token: i0.Injector }, { token: i3.ErrorStateMatcher }, { token: i4.NgControl, optional: true, self: true }, { token: i4.NgForm, optional: true }, { token: i4.FormGroupDirective, optional: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
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
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i2.FocusMonitor }, { type: i0.NgZone }, { type: i0.Injector }, { type: i3.ErrorStateMatcher }, { type: i4.NgControl, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VsZWN0L1NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUVMLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFFBQVEsRUFDUixlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBQ0wsS0FBSyxFQUNMLE1BQU0sRUFJTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxJQUFJLEVBQ0osTUFBTSxFQUVOLFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixrQkFBa0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0YsU0FBUztBQUNULE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFP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WTt1QkFBQyxVQUFVO2dCQWdCeEIsS0FBSztzQkFESixTQUFTO3VCQUFDLE9BQU87Z0JBUWQsS0FBSztzQkFEUixLQUFLO2dCQWtCRixRQUFRO3NCQURYLEtBQUs7Z0JBWUYsT0FBTztzQkFEVixLQUFLO2dCQThJTixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQWtMakMsY0FBYztzQkFEYixZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciwgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIGNvbXB1dGVkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBpbnB1dCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTZWxmLFxuICBzaWduYWwsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nQ29udHJvbCwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gQXBwXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzLCBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGVDdG9yLFxuICBDYW5SZXF1aXJlQ3RvcixcbiAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gIEVycm9yU3RhdGVNYXRjaGVyLFxuICBIYXNPdmVybGF5Q3RvcixcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpbkVycm9yU3RhdGUsXG4gIG1peGluT3ZlcmxheSxcbiAgbWl4aW5SZXF1aXJlZCxcbiAgbWl4aW5UYWJJbmRleCxcbiAgTm92b09wdGdyb3VwLFxuICBOb3ZvT3B0aW9uLFxuICBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlLFxuICBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxufSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTk9WT19GT1JNX0ZJRUxELCBOb3ZvRmllbGRDb250cm9sLCBOb3ZvRmllbGRFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuLy8gY29uc3QgU0VMRUNUX1ZBTFVFX0FDQ0VTU09SID0ge1xuLy8gICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbi8vICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1NlbGVjdEVsZW1lbnQpLFxuLy8gICBtdWx0aTogdHJ1ZSxcbi8vIH07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgdmFsdWUgaGFzIGNoYW5nZWQuICovXG5leHBvcnQgY2xhc3MgTm92b1NlbGVjdENoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlbGVjdCB0aGF0IGVtaXR0ZWQgdGhlIGNoYW5nZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBOb3ZvU2VsZWN0RWxlbWVudCxcbiAgICAvKiogQ3VycmVudCB2YWx1ZSBvZiB0aGUgc2VsZWN0IHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgcHVibGljIHZhbHVlOiBhbnksXG4gICkge31cbn1cblxuLy8gQ3JlYXRlIEJhc2UgQ2xhc3MgZnJvbSBNaXhpbnNcbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnNcbmNsYXNzIE5vdm9TZWxlY3RCYXNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIHB1YmxpYyBfcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgIHB1YmxpYyBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sLFxuICApIHt9XG59XG5jb25zdCBOb3ZvU2VsZWN0TWl4aW5zOiBIYXNPdmVybGF5Q3RvciAmXG4gIENhblJlcXVpcmVDdG9yICZcbiAgQ2FuRGlzYWJsZUN0b3IgJlxuICBIYXNUYWJJbmRleEN0b3IgJlxuICBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmXG4gIHR5cGVvZiBOb3ZvU2VsZWN0QmFzZSA9IG1peGluT3ZlcmxheShtaXhpblRhYkluZGV4KG1peGluUmVxdWlyZWQobWl4aW5EaXNhYmxlZChtaXhpbkVycm9yU3RhdGUoTm92b1NlbGVjdEJhc2UpKSkpKTtcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc2VsZWN0JyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3JlcXVpcmVkJywgJ3RhYkluZGV4J10sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTm92b0ZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE5vdm9TZWxlY3RFbGVtZW50IH0sXG4gICAgeyBwcm92aWRlOiBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCB1c2VFeGlzdGluZzogTm92b1NlbGVjdEVsZW1lbnQgfSxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by1zZWxlY3QtdHJpZ2dlclwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJub3ZvLXNlbGVjdC1wbGFjZWhvbGRlclwiICpuZ0lmPVwiZW1wdHlcIj57eyBwbGFjZWhvbGRlciB9fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1lbGxpcHNpc1wiICpuZ0lmPVwiIWVtcHR5XCI+PG5vdm8taWNvbiBzaXplPVwic21cIiBzdHlsZT1cIm1hcmdpbjogMCAwIC4yNXJlbSAuMXJlbVwiICpuZ0lmPVwiZGlzcGxheUljb25cIj57eyBkaXNwbGF5SWNvbiB9fTwvbm92by1pY29uPiB7eyBkaXNwbGF5VmFsdWUgfX08L3NwYW4+XG4gICAgICA8aSBjbGFzcz1cImJoaS1jb2xsYXBzZVwiPjwvaT5cbiAgICA8L2Rpdj5cbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlXG4gICAgICBbcGFyZW50XT1cImVsZW1lbnRSZWZcIlxuICAgICAgW3Bvc2l0aW9uXT1cInBvc2l0aW9uXCJcbiAgICAgIFt3aWR0aF09XCJvdmVybGF5V2lkdGhcIlxuICAgICAgW2hlaWdodF09XCJvdmVybGF5SGVpZ2h0XCJcbiAgICAgIChjbG9zaW5nKT1cImVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpXCJcbiAgICA+XG4gICAgICA8ZGl2ICNwYW5lbCBjbGFzcz1cIm5vdm8tc2VsZWN0LWxpc3RcIiB0YWJJbmRleD1cIi0xXCIgW2NsYXNzLmhhcy1oZWFkZXJdPVwiaGVhZGVyQ29uZmlnXCIgW2NsYXNzLmFjdGl2ZV09XCJwYW5lbE9wZW5cIj5cbiAgICAgICAgPG5vdm8tb3B0aW9uICpuZ0lmPVwiaGVhZGVyQ29uZmlnXCIgY2xhc3M9XCJzZWxlY3QtaGVhZGVyXCIgW2NsYXNzLm9wZW5dPVwiaGVhZGVyLm9wZW5cIj5cbiAgICAgICAgICA8bm92by1idXR0b24gKm5nSWY9XCIhaGVhZGVyLm9wZW5cIiBpY29uPVwiYWRkLXRoaW5cIiAoY2xpY2spPVwidG9nZ2xlSGVhZGVyKCRldmVudCk7IChmYWxzZSlcIiB0YWJJbmRleD1cIi0xXCIgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIHt7IGhlYWRlckNvbmZpZy5sYWJlbCB9fVxuICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImhlYWRlci5vcGVuXCIgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGhlYWRlci5vcGVuIH1cIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiaGVhZGVyQ29uZmlnLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgW2F0dHIuaWRdPVwibmFtZVwiXG4gICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJoZWFkZXIudmFsdWVcIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7IGludmFsaWQ6ICFoZWFkZXIudmFsaWQgfVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVIZWFkZXIoJGV2ZW50LCBmYWxzZSlcIj57eyBsYWJlbHMuY2FuY2VsIH19PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIChjbGljayk9XCJzYXZlSGVhZGVyKClcIiBjbGFzcz1cInByaW1hcnlcIj57eyBsYWJlbHMuc2F2ZSB9fTwvbm92by1idXR0b24+XG4gICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPCEtLSBEZWNsYXJhdGl2ZSBDb250ZW50IEdvZXMgSGVyZSAtLT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8IS0tIERhdGEgRHJpdmVuIENvbnRlbnQgR29lcyBIZXJlIC0tPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyZWRPcHRpb25zOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uXG4gICAgICAgICAgICAqbmdJZj1cIiFvcHRpb24uZGl2aWRlcjsgZWxzZSBkaXZpZGVyXCJcbiAgICAgICAgICAgIGNsYXNzPVwic2VsZWN0LWl0ZW1cIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbi5kaXNhYmxlZFwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm9wdGlvbi5hY3RpdmVcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLXZhbHVlXT1cIm9wdGlvbi5sYWJlbFwiXG4gICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICAgIFt0b29sdGlwXT1cIm9wdGlvbi50b29sdGlwXCJcbiAgICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwib3B0aW9uLnRvb2x0aXBQb3NpdGlvbiB8fCAncmlnaHQnXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cIm9wdGlvbi5sYWJlbCB8IGhpZ2hsaWdodDpmaWx0ZXJUZXJtXCI+PC9zcGFuPiA8aSAqbmdJZj1cIm9wdGlvbi5hY3RpdmVcIiBjbGFzcz1cImJoaS1jaGVja1wiPjwvaT5cbiAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGl2aWRlcj5cbiAgICAgICAgICAgIDxub3ZvLWRpdmlkZXIgY2xhc3M9XCJzZWxlY3QtaXRlbS1kaXZpZGVyXCIgW2NsYXNzLndpdGgtbGFiZWxdPVwib3B0aW9uLmxhYmVsXCIgW2NsYXNzLndpdGhvdXQtbGFiZWxdPVwiIW9wdGlvbi5sYWJlbFwiPlxuICAgICAgICAgICAgICB7eyBvcHRpb24/LmxhYmVsIH19XG4gICAgICAgICAgICA8L25vdm8tZGl2aWRlcj5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbm92by1vdmVybGF5LXRlbXBsYXRlPlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9TZWxlY3Quc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXNlbGVjdCcsXG4gICAgcm9sZTogJ2NvbWJvYm94JyxcbiAgICAnYXJpYS1hdXRvY29tcGxldGUnOiAnbm9uZScsXG4gICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXG4gICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ3BhbmVsT3BlbiA/IGlkICsgXCItcGFuZWxcIiA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdwYW5lbE9wZW4nLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdyZXF1aXJlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnX2FyaWFMYWJlbGxlZEJ5IHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XSc6ICdfYXJpYURlc2NyaWJlZGJ5IHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdJzogJ19nZXRBcmlhQWN0aXZlRGVzY2VuZGFudCgpJyxcbiAgICAnW2NsYXNzLm5vdm8tc2VsZWN0LWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLXNlbGVjdC1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcbiAgICAnW2NsYXNzLm5vdm8tc2VsZWN0LXJlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLXNlbGVjdC1lbXB0eV0nOiAnZW1wdHknLFxuICAgICdbY2xhc3Mubm92by1zZWxlY3QtbXVsdGlwbGVdJzogJ211bHRpcGxlJyxcbiAgICAnW3RhYmluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogMCdcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NlbGVjdEVsZW1lbnRcbiAgZXh0ZW5kcyBOb3ZvU2VsZWN0TWl4aW5zXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5vdm9GaWVsZENvbnRyb2w8YW55Plxue1xuICBwcml2YXRlIF91bmlxdWVJZDogc3RyaW5nID0gYG5vdm8tc2VsZWN0LSR7KytuZXh0SWR9YDtcbiAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9hY3RpdmVPcHRpb25DaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9zZWxlY3RlZE9wdGlvbkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcmVhZG9ubHkgY29udHJvbFR5cGU6IHN0cmluZyA9ICdzZWxlY3QnO1xuXG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgbGFzdEtleVZhbHVlOiBzdHJpbmcgPSBudWxsO1xuICAvKiogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuKi9cbiAgbGFzdENhcmV0UG9zaXRpb246IG51bWJlciB8IG51bGw7XG5cbiAgX3NlbGVjdGlvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxOb3ZvT3B0aW9uPjtcblxuICAvKiogVGhlIGFyaWEtbGFiZWxsZWRieSBhdHRyaWJ1dGUgKi9cbiAgX2FyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG4gIC8qKiBUaGUgYXJpYS1kZXNjcmliZWRieSBhdHRyaWJ1dGUgb24gdGhlIGNoaXAgbGlzdCBmb3IgaW1wcm92ZWQgYTExeS4gKi9cbiAgX2FyaWFEZXNjcmliZWRieTogc3RyaW5nO1xuICAvKiogVXNlciBkZWZpbmVkIHRhYiBpbmRleC4gKi9cbiAgX3VzZXJUYWJJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIC8qKiBUaGUgRm9jdXNLZXlNYW5hZ2VyIHdoaWNoIGhhbmRsZXMgZm9jdXMuICovXG4gIF9rZXlNYW5hZ2VyOiBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxOb3ZvT3B0aW9uPjtcbiAgLyoqXG4gICAqIFRoZSBkaXNwbGF5IHN0cmluZyBmb3IgdGhlIGN1cnJlbnQgdmFsdWUsIGtlcHQgZnJvbSB3aGVuIHRoZSBhc3NvY2lhdGVkIDxub3ZvLW9wdGlvbj4gaGFzIHN0b3BwZWQgcmVuZGVyaW5nXG4gICAqIGR1ZSB0byBmaWx0cmF0aW9uXG4gICAqL1xuICBwcml2YXRlIF9saW5nZXJpbmdEaXNwbGF5VmFsdWU6IHN0cmluZyA9IG51bGw7XG4gIHByaXZhdGUgX2xlZ2FjeU9wdGlvbjogYW55O1xuXG4gIEBJbnB1dCgpXG4gIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VsZWN0Li4uJztcbiAgQElucHV0KClcbiAgcmVhZG9ubHk6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGhlYWRlckNvbmZpZzogYW55O1xuICBASW5wdXQoKVxuICBwb3NpdGlvbjogc3RyaW5nID0gJ2Fib3ZlLWJlbG93JztcbiAgQElucHV0KClcbiAgb3ZlcmxheVdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpXG4gIG92ZXJsYXlIZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KClcbiAgZGlzcGxheUljb246IHN0cmluZyA9IG51bGw7XG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQgYnkgdGhlIHVzZXIuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOb3ZvU2VsZWN0Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b1NlbGVjdENoYW5nZT4oKTtcbiAgLyoqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2VsZWN0IGNoYW5nZXMuKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBwYW5lbCBoYXMgYmVlbiB0b2dnbGVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBvcGVuZWQuICovXG4gIEBPdXRwdXQoJ29wZW5lZCcpIHJlYWRvbmx5IF9vcGVuZWRTdHJlYW06IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLm9wZW5lZENoYW5nZS5waXBlKFxuICAgIGZpbHRlcigobykgPT4gbyksXG4gICAgbWFwKCgpID0+IHt9KSxcbiAgKTtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgQE91dHB1dCgnY2xvc2VkJykgcmVhZG9ubHkgX2Nsb3NlZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoXG4gICAgZmlsdGVyKChvKSA9PiAhbyksXG4gICAgbWFwKCgpID0+IHt9KSxcbiAgKTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBtYXBzIGFuIG9wdGlvbidzIGNvbnRyb2wgdmFsdWUgdG8gaXRzIGRpc3BsYXkgdmFsdWUgaW4gdGhlIHRyaWdnZXIuICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAoKHZhbHVlOiBhbnkpID0+IHN0cmluZykgfCBudWxsID0gbnVsbDtcbiAgLyoqICogRnVuY3Rpb24gdG8gY29tcGFyZSB0aGUgb3B0aW9uIHZhbHVlcyB3aXRoIHRoZSBzZWxlY3RlZCB2YWx1ZXMuICovXG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbiA9IChvMTogYW55LCBvMjogYW55KSA9PlxuICAgIG8xID09PSBvMiB8fCBvMSA9PT0gbzIuaWQgfHwgKCFIZWxwZXJzLmlzRW1wdHkobzEuaWQpICYmICFIZWxwZXJzLmlzRW1wdHkobzIuaWQpICYmIG8xLmlkID09PSBvMi5pZCk7XG5cbiAgaGVhZGVyOiBhbnkgPSB7XG4gICAgb3BlbjogZmFsc2UsXG4gICAgdmFsaWQ6IHRydWUsXG4gICAgdmFsdWU6ICcnLFxuICB9O1xuICBjcmVhdGVkSXRlbTogYW55O1xuICBtb2RlbDogYW55O1xuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgZmlsdGVyVGVybTogc3RyaW5nID0gJyc7XG4gIGZpbHRlclRlcm1UaW1lb3V0O1xuICBmaWx0ZXJlZE9wdGlvbnM6IGFueTtcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pXG4gIG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0Z3JvdXAsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8Tm92b09wdGdyb3VwPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGNvbnRlbnRPcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG4gIEBWaWV3Q2hpbGRyZW4oTm92b09wdGlvbilcbiAgdmlld09wdGlvbnM6IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPjtcblxuICB2aWV3T3B0aW9uc1NpZ25hbCA9IHNpZ25hbDxOb3ZvT3B0aW9uW10+KG51bGwpO1xuICBjb250ZW50T3B0aW9uc1NpZ25hbCA9IHNpZ25hbDxOb3ZvT3B0aW9uW10+KG51bGwpO1xuXG4gIC8vIFRoaXMgc2lnbmFsIG1heSBiZSBzZXQgcHJvZ3JhbW1hdGljYWxseSBieSBhIFNlbGVjdFNlYXJjaENvbXBvbmVudC5cbiAgaGlkZUxlZ2FjeU9wdGlvbnNGb3JTZWFyY2ggPSBzaWduYWwoZmFsc2UpO1xuXG4gIGhpZGVMZWdhY3lPcHRpb25zID0gaW5wdXQoZmFsc2UsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuXG4gIHByaXZhdGUgZGlzcGxheUxlZ2FjeU9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuICEodGhpcy5oaWRlTGVnYWN5T3B0aW9uc0ZvclNlYXJjaCgpIHx8IHRoaXMuaGlkZUxlZ2FjeU9wdGlvbnMoKSk7XG4gIH0pXG5cbiAgQFZpZXdDaGlsZCgncGFuZWwnKVxuICBwYW5lbDogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAvLyBBbHdheXMgcmUtYXNzaWduIGFuIGFycmF5LCBiZWNhdXNlIGl0IG1pZ2h0IGhhdmUgYmVlbiBtdXRhdGVkLlxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fdmFsdWUgfHwgKHRoaXMuX211bHRpcGxlICYmIEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICB0aGlzLl9zZXRTZWxlY3Rpb25CeVZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl9saW5nZXJpbmdEaXNwbGF5VmFsdWUgPSBudWxsO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgdXNlciBzaG91bGQgYmUgYWxsb3dlZCB0byBzZWxlY3QgbXVsdGlwbGUgb3B0aW9ucy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5wb3NpdGlvbiA9ICdhYm92ZS1iZWxvdyc7XG4gIH1cbiAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogQXJyYXkgb2Ygb3B0aW9ucyB0byBkaXNwbGF5IGluIHRoZSBzZWxlY3QgZHJvcGRvd24gKi9cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnMob3B0aW9uczogQXJyYXk8YW55Pikge1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX2luaXRMZWdhY3lPcHRpb25zKCk7XG4gIH1cbiAgZ2V0IG9wdGlvbnMoKTogQXJyYXk8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cbiAgcHJpdmF0ZSBfb3B0aW9uczogQXJyYXk8YW55PjtcblxuICAvKiogV2hldGhlciB0aGUgc2VsZWN0IGlzIGZvY3VzZWQuICovXG4gIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mb2N1c2VkIHx8IHRoaXMucGFuZWxPcGVuO1xuICB9XG4gIHByaXZhdGUgX2ZvY3VzZWQgPSBmYWxzZTtcblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEhlbHBlcnMuaXNFbXB0eSh0aGlzLl92YWx1ZSk7XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb24uICovXG4gIGdldCBzZWxlY3RlZCgpOiBOb3ZvT3B0aW9uIHwgTm92b09wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG4gIH1cblxuICAvKiogVGhlIHZhbHVlIGRpc3BsYXllZCBpbiB0aGUgdHJpZ2dlci4gKi9cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmVtcHR5KSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmICh0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubWFwKChvcHRpb24pID0+IHRoaXMuX2dldERpc3BsYXlWYWx1ZShvcHRpb24pKTtcbiAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnMuam9pbignLCAnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2dldERpc3BsYXlWYWx1ZSh0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHB1YmxpYyByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgX3BhcmVudEZvcm06IE5nRm9ybSxcbiAgICBAT3B0aW9uYWwoKSBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOT1ZPX0ZPUk1fRklFTEQpIHByaXZhdGUgX2ZpZWxkRWxlbWVudDogTm92b0ZpZWxkRWxlbWVudCxcbiAgKSB7XG4gICAgc3VwZXIoZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBfcGFyZW50Rm9ybSwgX3BhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcbiAgICBpZiAobmdDb250cm9sKSB7XG4gICAgICBuZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE5vdm9PcHRpb24+KHRoaXMubXVsdGlwbGUpO1xuICAgIC8vIEluaXRpYWxpemUgS2V5TWFuYWdlciB0byBtYW5hZ2Uga2V5Ym9hcmQgZXZlbnRzXG4gICAgdGhpcy5faW5pdEtleU1hbmFnZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB0aGlzLl9pbml0TGVnYWN5T3B0aW9ucygpO1xuICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnN1YnNjcmliZSgob3JpZ2luKSA9PlxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9ICEhb3JpZ2luO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIFVwZGF0aW5nIHRoZSBkaXNhYmxlZCBzdGF0ZSBpcyBoYW5kbGVkIGJ5IGBtaXhpbkRpc2FibGVkYCwgYnV0IHdlIG5lZWQgdG8gYWRkaXRpb25hbGx5IGxldFxuICAgIC8vIHRoZSBwYXJlbnQgZm9ybSBmaWVsZCBrbm93IHRvIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGNoYW5nZXMuXG4gICAgaWYgKGNoYW5nZXM/LmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzPy5tdWx0aXBsZSkge1xuICAgICAgLy8gVE9ETzogY29weSBzZWxlY3Rpb24gb3Zlcj8/XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxOb3ZvT3B0aW9uPih0aGlzLm11bHRpcGxlKTtcbiAgICB9XG4gICAgdGhpcy5faW5pdExlZ2FjeU9wdGlvbnMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBTdWJzY3JpYmUgdG8gTm92b09wdGlvbiBzZWxlY3Rpb25zXG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZVxuICAgIHRoaXMuX2luaXRpYWxpemVTZWxlY3Rpb24oKTtcbiAgICAvLyBMaXN0ZW4gdG8gc2VsZWN0aW9uIGNoYW5nZXMgdG8gc2VsZWN0IGFuZCBkZXNlbGVjdCBvcHRpb25zXG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2hhbmdlZC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgZXZlbnQuYWRkZWQuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb24uc2VsZWN0KSB7XG4gICAgICAgICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGV2ZW50LnJlbW92ZWQuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb24uZGVzZWxlY3QpIHtcbiAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gTGlzdGVuIHRvIFF1ZXJ5TGlzdCBjaGFuZ2VzXG4gICAgbWVyZ2UodGhpcy5jb250ZW50T3B0aW9ucy5jaGFuZ2VzLCB0aGlzLnZpZXdPcHRpb25zLmNoYW5nZXMpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmNvbnRlbnRPcHRpb25zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSksIHN0YXJ0V2l0aCh0aGlzLmNvbnRlbnRPcHRpb25zKSlcbiAgICAgIC5zdWJzY3JpYmUoY29udGVudE9wdGlvbnMgPT4ge1xuICAgICAgICB0aGlzLmNvbnRlbnRPcHRpb25zU2lnbmFsLnNldChjb250ZW50T3B0aW9ucy50b0FycmF5KCkpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLnZpZXdPcHRpb25zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKHZpZXdPcHRpb25zID0+IHtcbiAgICAgICAgdGhpcy52aWV3T3B0aW9uc1NpZ25hbC5zZXQodmlld09wdGlvbnMudG9BcnJheSgpKTtcbiAgICAgIH0pO1xuXG4gICAgbWVyZ2UodGhpcy5vdmVybGF5Lm9wZW5pbmcsIHRoaXMub3ZlcmxheS5jbG9zaW5nKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodGhpcy5wYW5lbE9wZW4pO1xuICAgICAgfSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fZmllbGRFbGVtZW50Py5fbGFiZWxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2FyaWFMYWJlbGxlZEJ5ID0gdGhpcy5fZmllbGRFbGVtZW50Ll9sYWJlbEVsZW1lbnQuaWQ7XG4gICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9hY3RpdmVPcHRpb25DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMudG9nZ2xlUGFuZWwoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvcGVuUGFuZWwoKSB7XG4gICAgc3VwZXIub3BlblBhbmVsKCk7XG4gICAgdGhpcy5faGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgLy8gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMgZnJvbSBBbmd1bGFyLlxuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fc2V0U2VsZWN0aW9uQnlWYWx1ZSh0aGlzLm5nQ29udHJvbCA/IHRoaXMubmdDb250cm9sLnZhbHVlIDogdGhpcy5fdmFsdWUpO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbiBiYXNlZCBvbiBhIHZhbHVlLiBJZiBubyBvcHRpb24gY2FuIGJlXG4gICAqIGZvdW5kIHdpdGggdGhlIGRlc2lnbmF0ZWQgdmFsdWUsIHRoZSBzZWxlY3QgdHJpZ2dlciBpcyBjbGVhcmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZTogYW55IHwgYW55W10pOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGlmIChvcHRpb24uc2V0SW5hY3RpdmVTdHlsZXMpIHtcbiAgICAgICAgb3B0aW9uLnNldEluYWN0aXZlU3R5bGVzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoY3VycmVudFZhbHVlOiBhbnkpID0+IHRoaXMuX3NlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgdGhpcy5fc29ydFZhbHVlcygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fa2V5TWFuYWdlcikge1xuICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuX3NlbGVjdFZhbHVlKHZhbHVlKTtcbiAgICAgIC8vIFNoaWZ0IGZvY3VzIHRvIHRoZSBhY3RpdmUgaXRlbS4gTm90ZSB0aGF0IHdlIHNob3VsZG4ndCBkbyB0aGlzIGluIG11bHRpcGxlXG4gICAgICAvLyBtb2RlLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hhdCBvcHRpb24gdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIGxhc3QuXG4gICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oY29ycmVzcG9uZGluZ09wdGlvbik7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAvLyBPdGhlcndpc2UgcmVzZXQgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbi4gTm90ZSB0aGF0IHdlIG9ubHkgd2FudCB0byBkbyB0aGlzIHdoaWxlXG4gICAgICAgIC8vIGNsb3NlZCwgYmVjYXVzZSBkb2luZyBpdCB3aGlsZSBvcGVuIGNhbiBzaGlmdCB0aGUgdXNlcidzIGZvY3VzIHVubmVjZXNzYXJpbHkuXG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSgtMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGFuZCBzZWxlY3RzIGFuZCBvcHRpb24gYmFzZWQgb24gaXRzIHZhbHVlLlxuICAgKiBAcmV0dXJucyBPcHRpb24gdGhhdCBoYXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3RWYWx1ZSh2YWx1ZTogYW55KTogTm92b09wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgYWxsT3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnMoKTtcbiAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gYWxsT3B0aW9ucy5maW5kKChvcHRpb246IE5vdm9PcHRpb24pID0+IHtcbiAgICAgIC8vIFNraXAgb3B0aW9ucyB0aGF0IGFyZSBhbHJlYWR5IGluIHRoZSBtb2RlbC4gVGhpcyBhbGxvd3MgdXMgdG8gaGFuZGxlIGNhc2VzXG4gICAgICAvLyB3aGVyZSB0aGUgc2FtZSBwcmltaXRpdmUgdmFsdWUgaXMgc2VsZWN0ZWQgbXVsdGlwbGUgdGltZXMuXG4gICAgICBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAhSGVscGVycy5pc0VtcHR5KHZhbHVlKSAmJiAhSGVscGVycy5pc0VtcHR5KG9wdGlvbi52YWx1ZSkgJiYgdGhpcy5jb21wYXJlV2l0aChvcHRpb24udmFsdWUsIHZhbHVlKTtcbiAgICB9KTtcbiAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgIWNvcnJlc3BvbmRpbmdPcHRpb24gJiYgdGhpcy5kaXNwbGF5TGVnYWN5T3B0aW9ucygpKSB7XG4gICAgICAvLyBJZiBzZWFyY2hDb21wb25lbnQgaXMgcHJlc2VudCwgd2UgYXJlIHVzaW5nIGEgdGV4dCBpbnB1dCBmaWx0ZXI7IHNvIGlmIHRoZXJlIGlzIGFuXG4gICAgICAvLyBvcHRpb24gbm90IGluIHRoZSBsaXN0LCBpdCBpcyBqdXN0IGZpbHRlcmVkIG91dFxuICAgICAgLy8gRG91YmxlIENoZWNrIG9wdGlvbiBub3QgYWxyZWFkeSBhZGRlZC5cbiAgICAgIGNvbnN0IGxlZ2FjeU9wdGlvbiA9IHRoaXMuZmlsdGVyZWRPcHRpb25zLmZpbmQoKGl0KSA9PiBpdC52YWx1ZSA9PT0gdmFsdWUpO1xuICAgICAgaWYgKCFsZWdhY3lPcHRpb24pIHtcbiAgICAgICAgLy8gQWRkIGEgZGlzYWJsZWQgb3B0aW9uIHRvIHRoZSBsaXN0IGFuZCBzZWxlY3QgaXRcbiAgICAgICAgdGhpcy5fbGVnYWN5T3B0aW9uID0ge1xuICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgIHRvb2x0aXA6ICdWYWx1ZSBpcyBub3QgcHJvdmlkZWQgaW4gbGlzdCBvZiB2YWxpZCBvcHRpb25zLicsXG4gICAgICAgICAgbGFiZWw6IHZhbHVlPy5sYWJlbCB8fCB2YWx1ZSxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucy5wdXNoKHRoaXMuX2xlZ2FjeU9wdGlvbik7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29ycmVzcG9uZGluZ09wdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3Qob3B0aW9uLCBpLCBmaXJlRXZlbnRzOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGNvbnNvbGUud2Fybignc2VsZWN0KCkgbWV0aG9kIGlzIGRlcHJlY2F0ZWQnKTtcbiAgfVxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgY29uc29sZS53YXJuKCdjbGVhcigpIG1ldGhvZCBpcyBkZXByZWNhdGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGl0ZW0gaXMgbm90IGRpc2FibGVkLCB0aGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsXG4gICAqIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZCBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5XG4gICAqIGlmIHRoaXMgaW50ZXJhY3Rpb24gc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgKi9cbiAgaGFuZGxlU2VsZWN0aW9uKG9wdGlvbjogTm92b09wdGlvbiwgaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IHdhc1NlbGVjdGVkID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pO1xuICAgIGlmIChvcHRpb24udmFsdWUgPT0gbnVsbCAmJiAhdGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgIGlmICh0aGlzLnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRlQ2hhbmdlcyhvcHRpb24udmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAod2FzU2VsZWN0ZWQgIT09IG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPyB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3Qob3B0aW9uKSA6IHRoaXMuX3NlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KG9wdGlvbik7XG4gICAgICB9XG4gICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKG9wdGlvbik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLl9zb3J0VmFsdWVzKCk7XG4gICAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBsZWdhY3lPcHRpb25JbmRleCA9IHRoaXMuZmlsdGVyZWRPcHRpb25zLmxhc3RJbmRleE9mKHRoaXMuX2xlZ2FjeU9wdGlvbik7XG4gICAgaWYgKGxlZ2FjeU9wdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMuc3BsaWNlKGxlZ2FjeU9wdGlvbkluZGV4LCAxKTtcbiAgICB9XG5cbiAgICBpZiAod2FzU2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgdGhpcy5fcHJvcGFnYXRlQ2hhbmdlcygpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERpc3BsYXlWYWx1ZShvcHRpb246IE5vdm9PcHRpb24gJiB7IHZhbHVlPzogYW55OyBsYWJlbD86IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgICBpZiAoIW9wdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuX2xpbmdlcmluZ0Rpc3BsYXlWYWx1ZSA/PyAnJztcbiAgICB9XG4gICAgbGV0IHRvRGlzcGxheSA9IG9wdGlvbi52aWV3VmFsdWU7XG4gICAgaWYgKHRoaXMuZGlzcGxheVdpdGgpIHtcbiAgICAgIHRvRGlzcGxheSA9IHRoaXMuZGlzcGxheVdpdGgob3B0aW9uLnZhbHVlKTtcbiAgICB9XG4gICAgLy8gU2ltcGx5IGZhbGxpbmcgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGRpc3BsYXkgdmFsdWUgaXMgZmFsc3kgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICAvLyBUaGUgZGlzcGxheSB2YWx1ZSBjYW4gYWxzbyBiZSB0aGUgbnVtYmVyIHplcm8gYW5kIHNob3VsZG4ndCBmYWxsIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nLlxuICAgIGxldCBkaXNwbGF5VmFsdWUgPSB0b0Rpc3BsYXkgIT0gbnVsbCA/IHRvRGlzcGxheSA6ICcnO1xuICAgIGlmIChkaXNwbGF5VmFsdWUgIT0gJycpIHtcbiAgICAgIHRoaXMuX2xpbmdlcmluZ0Rpc3BsYXlWYWx1ZSA9IGRpc3BsYXlWYWx1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2xpbmdlcmluZ0Rpc3BsYXlWYWx1ZSkge1xuICAgICAgZGlzcGxheVZhbHVlID0gdGhpcy5fbGluZ2VyaW5nRGlzcGxheVZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gZGlzcGxheVZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfY2xlYXJQcmV2aW91c1NlbGVjdGVkT3B0aW9uKHNraXA6IE5vdm9PcHRpb24pIHtcbiAgICB0aGlzLl9nZXRPcHRpb25zKCkuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBpZiAob3B0aW9uICE9PSBza2lwICYmIG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uRXZlbnRzID0gb3B0aW9ucyA/IG1lcmdlKC4uLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpIDogb2YoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMgPSBzZWxlY3Rpb25FdmVudHMucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKGV2ZW50OiBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlKSA9PiB7XG4gICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbihldmVudC5zb3VyY2UsIGV2ZW50LmlzVXNlcklucHV0KTtcbiAgICAgIGlmIChldmVudC5pc1VzZXJJbnB1dCAmJiAhdGhpcy5tdWx0aXBsZSAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgYWxsIGtleWRvd24gZXZlbnRzIG9uIHRoZSBzZWxlY3QuICovXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5wYW5lbE9wZW4gPyB0aGlzLl9oYW5kbGVPcGVuS2V5ZG93bihldmVudCkgOiB0aGlzLl9oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hpbGUgdGhlIHNlbGVjdCBpcyBjbG9zZWQuICovXG4gIHByaXZhdGUgX2hhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgY29uc3QgaXNBcnJvd0tleSA9IGtleSA9PT0gS2V5LkFycm93RG93biB8fCBrZXkgPT09IEtleS5BcnJvd1VwIHx8IGtleSA9PT0gS2V5LkFycm93TGVmdCB8fCBrZXkgPT09IEtleS5BcnJvd1JpZ2h0O1xuICAgIGNvbnN0IGlzT3BlbktleSA9IGtleSA9PT0gS2V5LkVudGVyIHx8IGtleSA9PT0gS2V5LlNwYWNlO1xuICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLl9rZXlNYW5hZ2VyO1xuICAgIC8vIE9wZW4gdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgIGlmICgoIW1hbmFnZXIuaXNUeXBpbmcoKSAmJiBpc09wZW5LZXkgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50KSkgfHwgKCh0aGlzLm11bHRpcGxlIHx8IGV2ZW50LmFsdEtleSkgJiYgaXNBcnJvd0tleSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnRzIHRoZSBwYWdlIGZyb20gc2Nyb2xsaW5nIGRvd24gd2hlbiBwcmVzc2luZyBzcGFjZVxuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gICAgLy8gQWxsb3cgY2hhbmdpbmcgdmFsdWUgd2l0aCBhcnJvdyBrZXlzLlxuICAgIC8vIGVsc2UgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgLy8gICBjb25zdCBwcmV2aW91c2x5U2VsZWN0ZWRPcHRpb24gPSB0aGlzLnNlbGVjdGVkO1xuICAgIC8vICAgbWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIC8vICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSB0aGlzLnNlbGVjdGVkO1xuICAgIC8vIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGVuIHRoZSBzZWxlY3RlZCBpcyBvcGVuLiAqL1xuICBwcml2YXRlIF9oYW5kbGVPcGVuS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLl9rZXlNYW5hZ2VyO1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5ID09PSBLZXkuQXJyb3dEb3duIHx8IGtleSA9PT0gS2V5LkFycm93VXA7XG4gICAgY29uc3QgaXNUeXBpbmcgPSBtYW5hZ2VyLmlzVHlwaW5nKCk7XG5cbiAgICBpZiAoaXNBcnJvd0tleSAmJiBldmVudC5hbHRLZXkpIHtcbiAgICAgIC8vIENsb3NlIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIC8vIERvbid0IGRvIGFueXRoaW5nIGluIHRoaXMgY2FzZSBpZiB0aGUgdXNlciBpcyB0eXBpbmcsXG4gICAgICAvLyBiZWNhdXNlIHRoZSB0eXBpbmcgc2VxdWVuY2UgY2FuIGluY2x1ZGUgdGhlIHNwYWNlIGtleS5cbiAgICB9IGVsc2UgaWYgKCFpc1R5cGluZyAmJiAoa2V5ID09PSBLZXkuRW50ZXIgfHwga2V5ID09PSBLZXkuU3BhY2UpICYmIG1hbmFnZXIuYWN0aXZlSXRlbSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbWFuYWdlci5hY3RpdmVJdGVtLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoIWlzVHlwaW5nICYmIHRoaXMuX211bHRpcGxlICYmIFsnYScsICdBJ10uaW5jbHVkZXMoa2V5KSAmJiBldmVudC5jdHJsS2V5KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgaGFzRGVzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuc29tZSgob3B0KSA9PiAhb3B0LmRpc2FibGVkICYmICFvcHQuc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAoIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgIGhhc0Rlc2VsZWN0ZWRPcHRpb25zID8gb3B0aW9uLnNlbGVjdCgpIDogb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoS2V5LkVzY2FwZSA9PT0ga2V5KSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRJbmRleCA9IG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuICAgICAgbWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgaWYgKHRoaXMuX211bHRpcGxlICYmIGlzQXJyb3dLZXkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgbWFuYWdlci5hY3RpdmVJdGVtICYmIG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEluZGV4KSB7XG4gICAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbS5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIHNldERlc2NyaWJlZEJ5SWRzKGlkczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9hcmlhRGVzY3JpYmVkYnkgPSBpZHMuam9pbignICcpO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBmaXJzdCBub24tZGlzYWJsZWQgY2hpcCBpbiB0aGlzIGNoaXAgbGlzdCwgb3IgdGhlIGFzc29jaWF0ZWQgaW5wdXQgd2hlbiB0aGVyZVxuICAgKiBhcmUgbm8gZWxpZ2libGUgY2hpcHMuXG4gICAqL1xuICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cyhvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIFsuLi4odGhpcy52aWV3T3B0aW9ucyB8fCBbXSksIC4uLih0aGlzLmNvbnRlbnRPcHRpb25zIHx8IFtdKV07XG4gIH1cblxuICBwcm90ZWN0ZWQgX29wdGlvbnNDb21wdXRlZCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4gWy4uLih0aGlzLnZpZXdPcHRpb25zU2lnbmFsKCkgfHwgW10pLCAuLi4odGhpcy5jb250ZW50T3B0aW9uc1NpZ25hbCgpIHx8IFtdKV1cbiAgfSk7XG5cbiAgLyoqIFNvcnRzIHRoZSBzZWxlY3RlZCB2YWx1ZXMgaW4gdGhlIHNlbGVjdGVkIGJhc2VkIG9uIHRoZWlyIG9yZGVyIGluIHRoZSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfc29ydFZhbHVlcygpIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgLy8gVE9ETy5cbiAgICB9XG4gIH1cblxuICAvKiogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIHNldCB0aGUgbW9kZWwgdmFsdWUuICovXG4gIHByaXZhdGUgX3Byb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgIGxldCB2YWx1ZVRvRW1pdDogYW55ID0gbnVsbDtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgdmFsdWVUb0VtaXQgPSAodGhpcy5zZWxlY3RlZCBhcyBOb3ZvT3B0aW9uW10pLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZVRvRW1pdCA9IHRoaXMuc2VsZWN0ZWQgPyAodGhpcy5zZWxlY3RlZCBhcyBOb3ZvT3B0aW9uKS52YWx1ZSA6IGZhbGxiYWNrVmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVRvRW1pdDtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSh2YWx1ZVRvRW1pdCk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHsgc2VsZWN0ZWQ6IHZhbHVlVG9FbWl0IH0pO1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5fbWFrZUNoYW5nZUV2ZW50KHZhbHVlVG9FbWl0KSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX21ha2VDaGFuZ2VFdmVudCh2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBOb3ZvU2VsZWN0Q2hhbmdlKHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBTY3JvbGxzIHRoZSBhY3RpdmUgb3B0aW9uIGludG8gdmlldy4gKi9cbiAgcHJvdGVjdGVkIF9zY3JvbGxPcHRpb25JbnRvVmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBRdWVyeUxpc3Q8Tm92b09wdGlvbj4oKTtcbiAgICBvcHRpb25zLnJlc2V0KHRoaXMuX2dldE9wdGlvbnMoKSk7XG4gICAgY29uc3QgbGFiZWxDb3VudCA9IF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKGluZGV4LCBvcHRpb25zLCB0aGlzLm9wdGlvbkdyb3Vwcyk7XG4gICAgY29uc3QgaXRlbUhlaWdodCA9IHRoaXMuX2dldEl0ZW1IZWlnaHQoKTtcbiAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgKGluZGV4ICsgbGFiZWxDb3VudCkgKiBpdGVtSGVpZ2h0LFxuICAgICAgaXRlbUhlaWdodCxcbiAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICk7XG4gIH1cblxuICAvKiogU2V0cyB1cCBhIGtleSBtYW5hZ2VyIHRvIGxpc3RlbiB0byBrZXlib2FyZCBldmVudHMgb24gdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gIHByaXZhdGUgX2luaXRLZXlNYW5hZ2VyKCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5fb3B0aW9uc0NvbXB1dGVkLCB0aGlzLmluamVjdG9yKS53aXRoVHlwZUFoZWFkKDI1MCkud2l0aEhvbWVBbmRFbmQoKTtcbiAgICAvLyAud2l0aEFsbG93ZWRNb2RpZmllcktleXMoWydzaGlmdEtleSddKTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIudGFiT3V0LnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgIC8vIFNlbGVjdCB0aGUgYWN0aXZlIGl0ZW0gd2hlbiB0YWJiaW5nIGF3YXkuIFRoaXMgaXMgY29uc2lzdGVudCB3aXRoIGhvdyB0aGUgbmF0aXZlXG4gICAgICAgIC8vIHNlbGVjdCBiZWhhdmVzLiBOb3RlIHRoYXQgd2Ugb25seSB3YW50IHRvIGRvIHRoaXMgaW4gc2luZ2xlIHNlbGVjdGlvbiBtb2RlLlxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc3RvcmUgZm9jdXMgdG8gdGhlIHRyaWdnZXIgYmVmb3JlIGNsb3NpbmcuIEVuc3VyZXMgdGhhdCB0aGUgZm9jdXNcbiAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuICYmIHRoaXMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLl9zY3JvbGxPcHRpb25JbnRvVmlldyh0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMucGFuZWxPcGVuICYmICF0aGlzLm11bHRpcGxlICYmIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyB0aGUgc2VsZWN0ZWQgaXRlbS4gSWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkLCBpdCB3aWxsIGhpZ2hsaWdodFxuICAgKiB0aGUgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgKi9cbiAgcHJpdmF0ZSBfaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fa2V5TWFuYWdlcikge1xuICAgICAgaWYgKHRoaXMuZW1wdHkpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3B0aW9ucy5maW5kSW5kZXgob3B0aW9uID0+IG9wdGlvbi52YWx1ZSA9PSB0aGlzLl92YWx1ZSlcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBzZWxlY3QncyBvcHRpb25zLiAqL1xuICBwcml2YXRlIF9nZXRJdGVtSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IFtmaXJzdF0gPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgaWYgKGZpcnN0KSB7XG4gICAgICByZXR1cm4gZmlyc3QuX2dldEhvc3RFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8vIFRPRE86IERlcHJlY2F0ZSB0aGlzXG4gIHByaXZhdGUgX2luaXRMZWdhY3lPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBpdGVtLCBsYWJlbDogaXRlbSB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gKHRoaXMub3B0aW9ucyB8fCBbXSlcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IEJvb2xlYW4oaXRlbS5yZWFkT25seSB8fCBpdGVtLmRpc2FibGVkKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBEZXByZWNhdGUgYWxsIGhlYWRlciBtZXRob2RzXG4gICAqL1xuICB0b2dnbGVIZWFkZXIoZXZlbnQsIGZvcmNlVmFsdWU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAvLyBSZXZlcnNlIHRoZSBhY3RpdmUgcHJvcGVydHkgKGlmIGZvcmNlVmFsdWUsIHVzZSB0aGF0KVxuICAgIHRoaXMuaGVhZGVyID0ge1xuICAgICAgb3BlbjogZm9yY2VWYWx1ZSAhPT0gdW5kZWZpbmVkID8gZm9yY2VWYWx1ZSA6ICF0aGlzLmhlYWRlci5vcGVuLFxuICAgICAgdmFsdWU6ICcnLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgaGlnaGxpZ2h0IHBpcGVcbiAgICovXG4gIGhpZ2hsaWdodChtYXRjaCwgcXVlcnkpIHtcbiAgICAvLyBSZXBsYWNlcyB0aGUgY2FwdHVyZSBzdHJpbmcgd2l0aCBhIHRoZSBzYW1lIHN0cmluZyBpbnNpZGUgb2YgYSBcInN0cm9uZ1wiIHRhZ1xuICAgIHJldHVybiBxdWVyeSA/IG1hdGNoLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLmVzY2FwZVJlZ2V4cChxdWVyeSksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPicpIDogbWF0Y2g7XG4gIH1cblxuICBlc2NhcGVSZWdleHAocXVlcnlUb0VzY2FwZSkge1xuICAgIC8vIEV4OiBpZiB0aGUgY2FwdHVyZSBpcyBcImFcIiB0aGUgcmVzdWx0IHdpbGwgYmUgXFxhXG4gICAgcmV0dXJuIHF1ZXJ5VG9Fc2NhcGUucmVwbGFjZSgvKFsuPyorXiRbXFxdXFxcXCgpe318LV0pL2csICdcXFxcJDEnKTtcbiAgfVxuXG4gIHNhdmVIZWFkZXIoKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyLnZhbHVlKSB7XG4gICAgICB0aGlzLmhlYWRlckNvbmZpZy5vblNhdmUodGhpcy5oZWFkZXIudmFsdWUpO1xuICAgICAgdGhpcy5jcmVhdGVkSXRlbSA9IHRoaXMuaGVhZGVyLnZhbHVlO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVhZGVyLnZhbGlkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqIERldGVybWluZXMgdGhlIGBhcmlhLWFjdGl2ZWRlc2NlbmRhbnRgIHRvIGJlIHNldCBvbiB0aGUgaG9zdC4gKi9cbiAgX2dldEFyaWFBY3RpdmVEZXNjZW5kYW50KCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiB0aGlzLl9rZXlNYW5hZ2VyICYmIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbS5pZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19