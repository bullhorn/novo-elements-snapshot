// NG
import { ActiveDescendantKeyManager, FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, NgZone, Optional, Output, QueryList, Self, ViewChild, ViewChildren, } from '@angular/core';
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
        else if (value && !correspondingOption) {
            // Double Check option not already added.
            const legacyOption = this.filteredOptions.find((it) => it.value === value);
            if (!legacyOption) {
                // Add a disabled option to the list and select it
                this.filteredOptions.push({
                    disabled: true,
                    tooltip: 'Value is not provided in list of valid options.',
                    label: value?.label || value,
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
                    disabled: item.readOnly || item.disabled,
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: NovoSelectElement, selector: "novo-select", inputs: { disabled: "disabled", required: "required", tabIndex: "tabIndex", id: "id", name: "name", options: "options", placeholder: "placeholder", readonly: "readonly", headerConfig: "headerConfig", position: "position", overlayWidth: "overlayWidth", overlayHeight: "overlayHeight", displayIcon: "displayIcon", displayWith: "displayWith", compareWith: "compareWith", value: "value", multiple: "multiple" }, outputs: { onSelect: "onSelect", selectionChange: "selectionChange", valueChange: "valueChange", openedChange: "openedChange", _openedStream: "opened", _closedStream: "closed" }, host: { attributes: { "role": "combobox", "aria-autocomplete": "none", "aria-haspopup": "true" }, listeners: { "click": "onClick($event)", "keydown": "_handleKeydown($event)" }, properties: { "attr.id": "id", "attr.aria-controls": "panelOpen ? id + \"-panel\" : null", "attr.aria-expanded": "panelOpen", "attr.aria-required": "required.toString()", "attr.aria-disabled": "disabled.toString()", "attr.aria-invalid": "errorState", "attr.aria-labelledby": "_ariaLabelledBy || null", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-activedescendant": "_getAriaActiveDescendant()", "class.novo-select-disabled": "disabled", "class.novo-select-invalid": "errorState", "class.novo-select-required": "required", "class.novo-select-empty": "empty", "class.novo-select-multiple": "multiple", "tabindex": "disabled ? -1 : 0" }, classAttribute: "novo-select" }, providers: [
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
            }], options: [{
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
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], _handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VsZWN0L1NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUlOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFFSixTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0Isa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdGLFNBQVM7QUFDVCxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQU8sTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBSUwsaUJBQWlCLEVBR2pCLGFBQWEsRUFDYixl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SztzQkFESixTQUFTO3VCQUFDLE9BQU87Z0JBUWQsS0FBSztzQkFEUixLQUFLO2dCQWlCRixRQUFRO3NCQURYLEtBQUs7Z0JBbUlOLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBd0tqQyxjQUFjO3NCQURiLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkdcbmltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyLCBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgaGFzTW9kaWZpZXJLZXkgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNlbGYsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nQ29udHJvbCwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHRha2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIEFwcFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycywgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQge1xuICBDYW5EaXNhYmxlQ3RvcixcbiAgQ2FuUmVxdWlyZUN0b3IsXG4gIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLFxuICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgSGFzT3ZlcmxheUN0b3IsXG4gIEhhc1RhYkluZGV4Q3RvcixcbiAgbWl4aW5EaXNhYmxlZCxcbiAgbWl4aW5FcnJvclN0YXRlLFxuICBtaXhpbk92ZXJsYXksXG4gIG1peGluUmVxdWlyZWQsXG4gIG1peGluVGFiSW5kZXgsXG4gIE5vdm9PcHRncm91cCxcbiAgTm92b09wdGlvbixcbiAgTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSxcbiAgTk9WT19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCxcbiAgX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24sXG4gIF9nZXRPcHRpb25TY3JvbGxQb3NpdGlvbixcbn0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5PVk9fRk9STV9GSUVMRCwgTm92b0ZpZWxkQ29udHJvbCwgTm92b0ZpZWxkRWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmllbGQnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbi8vIGNvbnN0IFNFTEVDVF9WQUxVRV9BQ0NFU1NPUiA9IHtcbi8vICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4vLyAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9TZWxlY3RFbGVtZW50KSxcbi8vICAgbXVsdGk6IHRydWUsXG4vLyB9O1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBzZWxlY3QgdGhhdCBlbWl0dGVkIHRoZSBjaGFuZ2UgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTm92b1NlbGVjdEVsZW1lbnQsXG4gICAgLyoqIEN1cnJlbnQgdmFsdWUgb2YgdGhlIHNlbGVjdCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyB2YWx1ZTogYW55LFxuICApIHt9XG59XG5cbi8vIENyZWF0ZSBCYXNlIENsYXNzIGZyb20gTWl4aW5zXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zXG5jbGFzcyBOb3ZvU2VsZWN0QmFzZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBwdWJsaWMgX3BhcmVudEZvcm06IE5nRm9ybSxcbiAgICBwdWJsaWMgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgKSB7fVxufVxuY29uc3QgTm92b1NlbGVjdE1peGluczogSGFzT3ZlcmxheUN0b3IgJlxuICBDYW5SZXF1aXJlQ3RvciAmXG4gIENhbkRpc2FibGVDdG9yICZcbiAgSGFzVGFiSW5kZXhDdG9yICZcbiAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJlxuICB0eXBlb2YgTm92b1NlbGVjdEJhc2UgPSBtaXhpbk92ZXJsYXkobWl4aW5UYWJJbmRleChtaXhpblJlcXVpcmVkKG1peGluRGlzYWJsZWQobWl4aW5FcnJvclN0YXRlKE5vdm9TZWxlY3RCYXNlKSkpKSk7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNlbGVjdCcsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICdyZXF1aXJlZCcsICd0YWJJbmRleCddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5vdm9GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBOb3ZvU2VsZWN0RWxlbWVudCB9LFxuICAgIHsgcHJvdmlkZTogTk9WT19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgdXNlRXhpc3Rpbmc6IE5vdm9TZWxlY3RFbGVtZW50IH0sXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tc2VsZWN0LXRyaWdnZXJcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibm92by1zZWxlY3QtcGxhY2Vob2xkZXJcIiAqbmdJZj1cImVtcHR5XCI+e3sgcGxhY2Vob2xkZXIgfX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRleHQtZWxsaXBzaXNcIiAqbmdJZj1cIiFlbXB0eVwiPjxub3ZvLWljb24gc2l6ZT1cInNtXCIgc3R5bGU9XCJtYXJnaW46IDAgMCAuMjVyZW0gLjFyZW1cIiAqbmdJZj1cImRpc3BsYXlJY29uXCI+e3sgZGlzcGxheUljb24gfX08L25vdm8taWNvbj4ge3sgZGlzcGxheVZhbHVlIH19PC9zcGFuPlxuICAgICAgPGkgY2xhc3M9XCJiaGktY29sbGFwc2VcIj48L2k+XG4gICAgPC9kaXY+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZVxuICAgICAgW3BhcmVudF09XCJlbGVtZW50UmVmXCJcbiAgICAgIFtwb3NpdGlvbl09XCJwb3NpdGlvblwiXG4gICAgICBbd2lkdGhdPVwib3ZlcmxheVdpZHRoXCJcbiAgICAgIFtoZWlnaHRdPVwib3ZlcmxheUhlaWdodFwiXG4gICAgICAoY2xvc2luZyk9XCJlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKVwiXG4gICAgPlxuICAgICAgPGRpdiAjcGFuZWwgY2xhc3M9XCJub3ZvLXNlbGVjdC1saXN0XCIgdGFiSW5kZXg9XCItMVwiIFtjbGFzcy5oYXMtaGVhZGVyXT1cImhlYWRlckNvbmZpZ1wiIFtjbGFzcy5hY3RpdmVdPVwicGFuZWxPcGVuXCI+XG4gICAgICAgIDxub3ZvLW9wdGlvbiAqbmdJZj1cImhlYWRlckNvbmZpZ1wiIGNsYXNzPVwic2VsZWN0LWhlYWRlclwiIFtjbGFzcy5vcGVuXT1cImhlYWRlci5vcGVuXCI+XG4gICAgICAgICAgPG5vdm8tYnV0dG9uICpuZ0lmPVwiIWhlYWRlci5vcGVuXCIgaWNvbj1cImFkZC10aGluXCIgKGNsaWNrKT1cInRvZ2dsZUhlYWRlcigkZXZlbnQpOyAoZmFsc2UpXCIgdGFiSW5kZXg9XCItMVwiIGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICB7eyBoZWFkZXJDb25maWcubGFiZWwgfX1cbiAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJoZWFkZXIub3BlblwiIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBoZWFkZXIub3BlbiB9XCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImhlYWRlckNvbmZpZy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgIFthdHRyLmlkXT1cIm5hbWVcIlxuICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwiaGVhZGVyLnZhbHVlXCJcbiAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBpbnZhbGlkOiAhaGVhZGVyLnZhbGlkIH1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxmb290ZXI+XG4gICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlSGVhZGVyKCRldmVudCwgZmFsc2UpXCI+e3sgbGFiZWxzLmNhbmNlbCB9fTwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiAoY2xpY2spPVwic2F2ZUhlYWRlcigpXCIgY2xhc3M9XCJwcmltYXJ5XCI+e3sgbGFiZWxzLnNhdmUgfX08L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgIDwhLS0gRGVjbGFyYXRpdmUgQ29udGVudCBHb2VzIEhlcmUgLS0+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPCEtLSBEYXRhIERyaXZlbiBDb250ZW50IEdvZXMgSGVyZSAtLT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlcmVkT3B0aW9uczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgKm5nSWY9XCIhb3B0aW9uLmRpdmlkZXI7IGVsc2UgZGl2aWRlclwiXG4gICAgICAgICAgICBjbGFzcz1cInNlbGVjdC1pdGVtXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJvcHRpb24uZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJvcHRpb24uYWN0aXZlXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi12YWx1ZV09XCJvcHRpb24ubGFiZWxcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiXG4gICAgICAgICAgICBbdG9vbHRpcF09XCJvcHRpb24udG9vbHRpcFwiXG4gICAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cIm9wdGlvbi50b29sdGlwUG9zaXRpb24gfHwgJ3JpZ2h0J1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJvcHRpb24ubGFiZWwgfCBoaWdobGlnaHQ6ZmlsdGVyVGVybVwiPjwvc3Bhbj4gPGkgKm5nSWY9XCJvcHRpb24uYWN0aXZlXCIgY2xhc3M9XCJiaGktY2hlY2tcIj48L2k+XG4gICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2RpdmlkZXI+XG4gICAgICAgICAgICA8bm92by1kaXZpZGVyIGNsYXNzPVwic2VsZWN0LWl0ZW0tZGl2aWRlclwiIFtjbGFzcy53aXRoLWxhYmVsXT1cIm9wdGlvbi5sYWJlbFwiIFtjbGFzcy53aXRob3V0LWxhYmVsXT1cIiFvcHRpb24ubGFiZWxcIj5cbiAgICAgICAgICAgICAge3sgb3B0aW9uPy5sYWJlbCB9fVxuICAgICAgICAgICAgPC9ub3ZvLWRpdmlkZXI+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vU2VsZWN0LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1zZWxlY3QnLFxuICAgIHJvbGU6ICdjb21ib2JveCcsXG4gICAgJ2FyaWEtYXV0b2NvbXBsZXRlJzogJ25vbmUnLFxuICAgICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLFxuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICdbYXR0ci5hcmlhLWNvbnRyb2xzXSc6ICdwYW5lbE9wZW4gPyBpZCArIFwiLXBhbmVsXCIgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAncGFuZWxPcGVuJyxcbiAgICAnW2F0dHIuYXJpYS1yZXF1aXJlZF0nOiAncmVxdWlyZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ19hcmlhTGFiZWxsZWRCeSB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2FyaWFEZXNjcmliZWRieSB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XSc6ICdfZ2V0QXJpYUFjdGl2ZURlc2NlbmRhbnQoKScsXG4gICAgJ1tjbGFzcy5ub3ZvLXNlbGVjdC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3Mubm92by1zZWxlY3QtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgJ1tjbGFzcy5ub3ZvLXNlbGVjdC1yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICdbY2xhc3Mubm92by1zZWxlY3QtZW1wdHldJzogJ2VtcHR5JyxcbiAgICAnW2NsYXNzLm5vdm8tc2VsZWN0LW11bHRpcGxlXSc6ICdtdWx0aXBsZScsXG4gICAgJ1t0YWJpbmRleF0nOiAnZGlzYWJsZWQgPyAtMSA6IDAnXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RFbGVtZW50XG4gIGV4dGVuZHMgTm92b1NlbGVjdE1peGluc1xuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOb3ZvRmllbGRDb250cm9sPGFueT5cbntcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLXNlbGVjdC0keysrbmV4dElkfWA7XG4gIHByaXZhdGUgX3N0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfYWN0aXZlT3B0aW9uQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRPcHRpb25DaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Rlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHJlYWRvbmx5IGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAnc2VsZWN0JztcblxuICAvKiogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGxhc3RLZXlWYWx1ZTogc3RyaW5nID0gbnVsbDtcbiAgLyoqIEBkb2NzLXByaXZhdGUgSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiovXG4gIGxhc3RDYXJldFBvc2l0aW9uOiBudW1iZXIgfCBudWxsO1xuXG4gIF9zZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8Tm92b09wdGlvbj47XG5cbiAgLyoqIFRoZSBhcmlhLWxhYmVsbGVkYnkgYXR0cmlidXRlICovXG4gIF9hcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuICAvKiogVGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0cmlidXRlIG9uIHRoZSBjaGlwIGxpc3QgZm9yIGltcHJvdmVkIGExMXkuICovXG4gIF9hcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcbiAgLyoqIFVzZXIgZGVmaW5lZCB0YWIgaW5kZXguICovXG4gIF91c2VyVGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAvKiogVGhlIEZvY3VzS2V5TWFuYWdlciB3aGljaCBoYW5kbGVzIGZvY3VzLiAqL1xuICBfa2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj47XG5cbiAgQElucHV0KClcbiAgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KClcbiAgb3B0aW9uczogQXJyYXk8YW55PjtcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdTZWxlY3QuLi4nO1xuICBASW5wdXQoKVxuICByZWFkb25seTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgaGVhZGVyQ29uZmlnOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHBvc2l0aW9uOiBzdHJpbmcgPSAnYWJvdmUtYmVsb3cnO1xuICBASW5wdXQoKVxuICBvdmVybGF5V2lkdGg6IG51bWJlcjtcbiAgQElucHV0KClcbiAgb3ZlcmxheUhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKVxuICBkaXNwbGF5SWNvbjogc3RyaW5nID0gbnVsbDtcbiAgQE91dHB1dCgpXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE5vdm9TZWxlY3RDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvU2VsZWN0Q2hhbmdlPigpO1xuICAvKiogRXZlbnQgdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgcmF3IHZhbHVlIG9mIHRoZSBzZWxlY3QgY2hhbmdlcy4qL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHBhbmVsIGhhcyBiZWVuIHRvZ2dsZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIG9wZW5lZC4gKi9cbiAgQE91dHB1dCgnb3BlbmVkJykgcmVhZG9ubHkgX29wZW5lZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoXG4gICAgZmlsdGVyKChvKSA9PiBvKSxcbiAgICBtYXAoKCkgPT4ge30pLFxuICApO1xuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICBAT3V0cHV0KCdjbG9zZWQnKSByZWFkb25seSBfY2xvc2VkU3RyZWFtOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5vcGVuZWRDaGFuZ2UucGlwZShcbiAgICBmaWx0ZXIoKG8pID0+ICFvKSxcbiAgICBtYXAoKCkgPT4ge30pLFxuICApO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IG1hcHMgYW4gb3B0aW9uJ3MgY29udHJvbCB2YWx1ZSB0byBpdHMgZGlzcGxheSB2YWx1ZSBpbiB0aGUgdHJpZ2dlci4gKi9cbiAgQElucHV0KCkgZGlzcGxheVdpdGg6ICgodmFsdWU6IGFueSkgPT4gc3RyaW5nKSB8IG51bGwgPSBudWxsO1xuICAvKiogKiBGdW5jdGlvbiB0byBjb21wYXJlIHRoZSBvcHRpb24gdmFsdWVzIHdpdGggdGhlIHNlbGVjdGVkIHZhbHVlcy4gKi9cbiAgQElucHV0KCkgY29tcGFyZVdpdGg6IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuID0gKG8xOiBhbnksIG8yOiBhbnkpID0+XG4gICAgbzEgPT09IG8yIHx8IG8xID09PSBvMi5pZCB8fCAoIUhlbHBlcnMuaXNFbXB0eShvMS5pZCkgJiYgIUhlbHBlcnMuaXNFbXB0eShvMi5pZCkgJiYgbzEuaWQgPT09IG8yLmlkKTtcblxuICBoZWFkZXI6IGFueSA9IHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgICB2YWxpZDogdHJ1ZSxcbiAgICB2YWx1ZTogJycsXG4gIH07XG4gIGNyZWF0ZWRJdGVtOiBhbnk7XG4gIG1vZGVsOiBhbnk7XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBmaWx0ZXJUZXJtOiBzdHJpbmcgPSAnJztcbiAgZmlsdGVyVGVybVRpbWVvdXQ7XG4gIGZpbHRlcmVkT3B0aW9uczogYW55O1xuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkcmVuKE5vdm9PcHRncm91cCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxOb3ZvT3B0Z3JvdXA+O1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9PcHRpb24sIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgY29udGVudE9wdGlvbnM6IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPjtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvT3B0aW9uKVxuICB2aWV3T3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+O1xuXG4gIEBWaWV3Q2hpbGQoJ3BhbmVsJylcbiAgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZShuZXdWYWx1ZTogYW55KSB7XG4gICAgLy8gQWx3YXlzIHJlLWFzc2lnbiBhbiBhcnJheSwgYmVjYXVzZSBpdCBtaWdodCBoYXZlIGJlZW4gbXV0YXRlZC5cbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX3ZhbHVlIHx8ICh0aGlzLl9tdWx0aXBsZSAmJiBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fc2V0U2VsZWN0aW9uQnlWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgdXNlciBzaG91bGQgYmUgYWxsb3dlZCB0byBzZWxlY3QgbXVsdGlwbGUgb3B0aW9ucy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5wb3NpdGlvbiA9ICdhYm92ZS1iZWxvdyc7XG4gIH1cbiAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2VsZWN0IGlzIGZvY3VzZWQuICovXG4gIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mb2N1c2VkIHx8IHRoaXMucGFuZWxPcGVuO1xuICB9XG4gIHByaXZhdGUgX2ZvY3VzZWQgPSBmYWxzZTtcblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEhlbHBlcnMuaXNFbXB0eSh0aGlzLl92YWx1ZSk7XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb24uICovXG4gIGdldCBzZWxlY3RlZCgpOiBOb3ZvT3B0aW9uIHwgTm92b09wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG4gIH1cblxuICAvKiogVGhlIHZhbHVlIGRpc3BsYXllZCBpbiB0aGUgdHJpZ2dlci4gKi9cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmVtcHR5KSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmICh0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubWFwKChvcHRpb24pID0+IHRoaXMuX2dldERpc3BsYXlWYWx1ZShvcHRpb24pKTtcbiAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnMuam9pbignLCAnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2dldERpc3BsYXlWYWx1ZSh0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHB1YmxpYyByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgX3BhcmVudEZvcm06IE5nRm9ybSxcbiAgICBAT3B0aW9uYWwoKSBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOT1ZPX0ZPUk1fRklFTEQpIHByaXZhdGUgX2ZpZWxkRWxlbWVudDogTm92b0ZpZWxkRWxlbWVudCxcbiAgKSB7XG4gICAgc3VwZXIoZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBfcGFyZW50Rm9ybSwgX3BhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcbiAgICBpZiAobmdDb250cm9sKSB7XG4gICAgICBuZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE5vdm9PcHRpb24+KHRoaXMubXVsdGlwbGUpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIHRoaXMuX2luaXRMZWdhY3lPcHRpb25zKCk7XG4gICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuc3Vic2NyaWJlKChvcmlnaW4pID0+XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gISFvcmlnaW47XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gVXBkYXRpbmcgdGhlIGRpc2FibGVkIHN0YXRlIGlzIGhhbmRsZWQgYnkgYG1peGluRGlzYWJsZWRgLCBidXQgd2UgbmVlZCB0byBhZGRpdGlvbmFsbHkgbGV0XG4gICAgLy8gdGhlIHBhcmVudCBmb3JtIGZpZWxkIGtub3cgdG8gcnVuIGNoYW5nZSBkZXRlY3Rpb24gd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgY2hhbmdlcy5cbiAgICBpZiAoY2hhbmdlcz8uZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXM/Lm11bHRpcGxlKSB7XG4gICAgICAvLyBUT0RPOiBjb3B5IHNlbGVjdGlvbiBvdmVyPz9cbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE5vdm9PcHRpb24+KHRoaXMubXVsdGlwbGUpO1xuICAgIH1cbiAgICB0aGlzLl9pbml0TGVnYWN5T3B0aW9ucygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEluaXRpYWxpemUgS2V5TWFuYWdlciB0byBtYW5hZ2Uga2V5Ym9hcmQgZXZlbnRzXG4gICAgdGhpcy5faW5pdEtleU1hbmFnZXIoKTtcbiAgICAvLyBTdWJzY3JpYmUgdG8gTm92b09wdGlvbiBzZWxlY3Rpb25zXG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZVxuICAgIHRoaXMuX2luaXRpYWxpemVTZWxlY3Rpb24oKTtcbiAgICAvLyBMaXN0ZW4gdG8gc2VsZWN0aW9uIGNoYW5nZXMgdG8gc2VsZWN0IGFuZCBkZXNlbGVjdCBvcHRpb25zXG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2hhbmdlZC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgZXZlbnQuYWRkZWQuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb24uc2VsZWN0KSB7XG4gICAgICAgICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGV2ZW50LnJlbW92ZWQuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb24uZGVzZWxlY3QpIHtcbiAgICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gTGlzdGVuIHRvIFF1ZXJ5TGlzdCBjaGFuZ2VzXG4gICAgbWVyZ2UodGhpcy5jb250ZW50T3B0aW9ucy5jaGFuZ2VzLCB0aGlzLnZpZXdPcHRpb25zLmNoYW5nZXMpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgICAgfSk7XG5cbiAgICBtZXJnZSh0aGlzLm92ZXJsYXkub3BlbmluZywgdGhpcy5vdmVybGF5LmNsb3NpbmcpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh0aGlzLnBhbmVsT3Blbik7XG4gICAgICB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9maWVsZEVsZW1lbnQ/Ll9sYWJlbEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fYXJpYUxhYmVsbGVkQnkgPSB0aGlzLl9maWVsZEVsZW1lbnQuX2xhYmVsRWxlbWVudC5pZDtcbiAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FjdGl2ZU9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy50b2dnbGVQYW5lbCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIFxuXG4gIG9wZW5QYW5lbCgpIHtcbiAgICBzdXBlci5vcGVuUGFuZWwoKTtcbiAgICB0aGlzLl9oaWdobGlnaHRDb3JyZWN0T3B0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0aWFsaXplU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIC8vIERlZmVyIHNldHRpbmcgdGhlIHZhbHVlIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcIkV4cHJlc3Npb25cbiAgICAvLyBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycyBmcm9tIEFuZ3VsYXIuXG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9zZXRTZWxlY3Rpb25CeVZhbHVlKHRoaXMubmdDb250cm9sID8gdGhpcy5uZ0NvbnRyb2wudmFsdWUgOiB0aGlzLl92YWx1ZSk7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGJhc2VkIG9uIGEgdmFsdWUuIElmIG5vIG9wdGlvbiBjYW4gYmVcbiAgICogZm91bmQgd2l0aCB0aGUgZGVzaWduYXRlZCB2YWx1ZSwgdGhlIHNlbGVjdCB0cmlnZ2VyIGlzIGNsZWFyZWQuXG4gICAqL1xuICBwcml2YXRlIF9zZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlOiBhbnkgfCBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgaWYgKG9wdGlvbi5zZXRJbmFjdGl2ZVN0eWxlcykge1xuICAgICAgICBvcHRpb24uc2V0SW5hY3RpdmVTdHlsZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHZhbHVlKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKChjdXJyZW50VmFsdWU6IGFueSkgPT4gdGhpcy5fc2VsZWN0VmFsdWUoY3VycmVudFZhbHVlKSk7XG4gICAgICB0aGlzLl9zb3J0VmFsdWVzKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9rZXlNYW5hZ2VyKSB7XG4gICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5fc2VsZWN0VmFsdWUodmFsdWUpO1xuICAgICAgLy8gU2hpZnQgZm9jdXMgdG8gdGhlIGFjdGl2ZSBpdGVtLiBOb3RlIHRoYXQgd2Ugc2hvdWxkbid0IGRvIHRoaXMgaW4gbXVsdGlwbGVcbiAgICAgIC8vIG1vZGUsIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGF0IG9wdGlvbiB0aGUgdXNlciBpbnRlcmFjdGVkIHdpdGggbGFzdC5cbiAgICAgIGlmIChjb3JyZXNwb25kaW5nT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShjb3JyZXNwb25kaW5nT3B0aW9uKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSByZXNldCB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uLiBOb3RlIHRoYXQgd2Ugb25seSB3YW50IHRvIGRvIHRoaXMgd2hpbGVcbiAgICAgICAgLy8gY2xvc2VkLCBiZWNhdXNlIGRvaW5nIGl0IHdoaWxlIG9wZW4gY2FuIHNoaWZ0IHRoZSB1c2VyJ3MgZm9jdXMgdW5uZWNlc3NhcmlseS5cbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKC0xKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgYW5kIHNlbGVjdHMgYW5kIG9wdGlvbiBiYXNlZCBvbiBpdHMgdmFsdWUuXG4gICAqIEByZXR1cm5zIE9wdGlvbiB0aGF0IGhhcyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZS5cbiAgICovXG4gIHByaXZhdGUgX3NlbGVjdFZhbHVlKHZhbHVlOiBhbnkpOiBOb3ZvT3B0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBhbGxPcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9ucygpO1xuICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdPcHRpb24gPSBhbGxPcHRpb25zLmZpbmQoKG9wdGlvbjogTm92b09wdGlvbikgPT4ge1xuICAgICAgLy8gU2tpcCBvcHRpb25zIHRoYXQgYXJlIGFscmVhZHkgaW4gdGhlIG1vZGVsLiBUaGlzIGFsbG93cyB1cyB0byBoYW5kbGUgY2FzZXNcbiAgICAgIC8vIHdoZXJlIHRoZSBzYW1lIHByaW1pdGl2ZSB2YWx1ZSBpcyBzZWxlY3RlZCBtdWx0aXBsZSB0aW1lcy5cbiAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKG9wdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuICFIZWxwZXJzLmlzRW1wdHkodmFsdWUpICYmICFIZWxwZXJzLmlzRW1wdHkob3B0aW9uLnZhbHVlKSAmJiB0aGlzLmNvbXBhcmVXaXRoKG9wdGlvbi52YWx1ZSwgdmFsdWUpO1xuICAgIH0pO1xuICAgIGlmIChjb3JyZXNwb25kaW5nT3B0aW9uKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoY29ycmVzcG9uZGluZ09wdGlvbik7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAmJiAhY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgLy8gRG91YmxlIENoZWNrIG9wdGlvbiBub3QgYWxyZWFkeSBhZGRlZC5cbiAgICAgIGNvbnN0IGxlZ2FjeU9wdGlvbiA9IHRoaXMuZmlsdGVyZWRPcHRpb25zLmZpbmQoKGl0KSA9PiBpdC52YWx1ZSA9PT0gdmFsdWUpO1xuICAgICAgaWYgKCFsZWdhY3lPcHRpb24pIHtcbiAgICAgICAgLy8gQWRkIGEgZGlzYWJsZWQgb3B0aW9uIHRvIHRoZSBsaXN0IGFuZCBzZWxlY3QgaXRcbiAgICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgdG9vbHRpcDogJ1ZhbHVlIGlzIG5vdCBwcm92aWRlZCBpbiBsaXN0IG9mIHZhbGlkIG9wdGlvbnMuJyxcbiAgICAgICAgICBsYWJlbDogdmFsdWU/LmxhYmVsIHx8IHZhbHVlLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb3JyZXNwb25kaW5nT3B0aW9uO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdChvcHRpb24sIGksIGZpcmVFdmVudHM6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgY29uc29sZS53YXJuKCdzZWxlY3QoKSBtZXRob2QgaXMgZGVwcmVjYXRlZCcpO1xuICB9XG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICBjb25zb2xlLndhcm4oJ2NsZWFyKCkgbWV0aG9kIGlzIGRlcHJlY2F0ZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgaXRlbSBpcyBub3QgZGlzYWJsZWQsIHRoaXMgbWV0aG9kIGNsb3NlcyB0aGUgcGFuZWwsIGFuZCBpZiBhIHZhbHVlIGlzIHNwZWNpZmllZCxcbiAgICogYWxzbyBzZXRzIHRoZSBhc3NvY2lhdGVkIGNvbnRyb2wgdG8gdGhhdCB2YWx1ZS4gSXQgd2lsbCBhbHNvIG1hcmsgdGhlIGNvbnRyb2wgYXMgZGlydHlcbiAgICogaWYgdGhpcyBpbnRlcmFjdGlvbiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXG4gICAqL1xuICBoYW5kbGVTZWxlY3Rpb24ob3B0aW9uOiBOb3ZvT3B0aW9uLCBpc1VzZXJJbnB1dDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3Qgd2FzU2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKG9wdGlvbik7XG4gICAgaWYgKG9wdGlvbi52YWx1ZSA9PSBudWxsICYmICF0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgaWYgKHRoaXMudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKG9wdGlvbi52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh3YXNTZWxlY3RlZCAhPT0gb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA/IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChvcHRpb24pIDogdGhpcy5fc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3Qob3B0aW9uKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0ob3B0aW9uKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuX3NvcnRWYWx1ZXMoKTtcbiAgICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHdhc1NlbGVjdGVkICE9PSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKG9wdGlvbikpIHtcbiAgICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXREaXNwbGF5VmFsdWUob3B0aW9uOiBOb3ZvT3B0aW9uICYgeyB2YWx1ZT86IGFueTsgbGFiZWw/OiBzdHJpbmcgfSk6IHN0cmluZyB7XG4gICAgaWYgKCFvcHRpb24pIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgbGV0IHRvRGlzcGxheSA9IG9wdGlvbi52aWV3VmFsdWU7XG4gICAgaWYgKHRoaXMuZGlzcGxheVdpdGgpIHtcbiAgICAgIHRvRGlzcGxheSA9IHRoaXMuZGlzcGxheVdpdGgob3B0aW9uLnZhbHVlKTtcbiAgICB9XG4gICAgLy8gU2ltcGx5IGZhbGxpbmcgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGRpc3BsYXkgdmFsdWUgaXMgZmFsc3kgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICAvLyBUaGUgZGlzcGxheSB2YWx1ZSBjYW4gYWxzbyBiZSB0aGUgbnVtYmVyIHplcm8gYW5kIHNob3VsZG4ndCBmYWxsIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nLlxuICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRvRGlzcGxheSAhPSBudWxsID8gdG9EaXNwbGF5IDogJyc7XG4gICAgcmV0dXJuIGRpc3BsYXlWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb25cbiAgICovXG4gIHByaXZhdGUgX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihza2lwOiBOb3ZvT3B0aW9uKSB7XG4gICAgdGhpcy5fZ2V0T3B0aW9ucygpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgaWYgKG9wdGlvbiAhPT0gc2tpcCAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFNlbGVjdGlvbkV2ZW50cygpIHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9ucygpO1xuICAgIGNvbnN0IHNlbGVjdGlvbkV2ZW50cyA9IG9wdGlvbnMgPyBtZXJnZSguLi5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpKSA6IG9mKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzID0gc2VsZWN0aW9uRXZlbnRzLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChldmVudDogTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSkgPT4ge1xuICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgdGhpcy5oYW5kbGVTZWxlY3Rpb24oZXZlbnQuc291cmNlLCBldmVudC5pc1VzZXJJbnB1dCk7XG4gICAgICBpZiAoZXZlbnQuaXNVc2VySW5wdXQgJiYgIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGFsbCBrZXlkb3duIGV2ZW50cyBvbiB0aGUgc2VsZWN0LiAqL1xuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMucGFuZWxPcGVuID8gdGhpcy5faGFuZGxlT3BlbktleWRvd24oZXZlbnQpIDogdGhpcy5faGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIHdoaWxlIHRoZSBzZWxlY3QgaXMgY2xvc2VkLiAqL1xuICBwcml2YXRlIF9oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXkgPT09IEtleS5BcnJvd0Rvd24gfHwga2V5ID09PSBLZXkuQXJyb3dVcCB8fCBrZXkgPT09IEtleS5BcnJvd0xlZnQgfHwga2V5ID09PSBLZXkuQXJyb3dSaWdodDtcbiAgICBjb25zdCBpc09wZW5LZXkgPSBrZXkgPT09IEtleS5FbnRlciB8fCBrZXkgPT09IEtleS5TcGFjZTtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcbiAgICAvLyBPcGVuIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICBpZiAoKCFtYW5hZ2VyLmlzVHlwaW5nKCkgJiYgaXNPcGVuS2V5ICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHx8ICgodGhpcy5tdWx0aXBsZSB8fCBldmVudC5hbHRLZXkpICYmIGlzQXJyb3dLZXkpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICAgIC8vIEFsbG93IGNoYW5naW5nIHZhbHVlIHdpdGggYXJyb3cga2V5cy5cbiAgICAvLyBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgIC8vICAgY29uc3QgcHJldmlvdXNseVNlbGVjdGVkT3B0aW9uID0gdGhpcy5zZWxlY3RlZDtcbiAgICAvLyAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAvLyAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5zZWxlY3RlZDtcbiAgICAvLyB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hlbiB0aGUgc2VsZWN0ZWQgaXMgb3Blbi4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlT3BlbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgY29uc3QgaXNBcnJvd0tleSA9IGtleSA9PT0gS2V5LkFycm93RG93biB8fCBrZXkgPT09IEtleS5BcnJvd1VwO1xuICAgIGNvbnN0IGlzVHlwaW5nID0gbWFuYWdlci5pc1R5cGluZygpO1xuXG4gICAgaWYgKGlzQXJyb3dLZXkgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAvLyBDbG9zZSB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpbiB0aGlzIGNhc2UgaWYgdGhlIHVzZXIgaXMgdHlwaW5nLFxuICAgICAgLy8gYmVjYXVzZSB0aGUgdHlwaW5nIHNlcXVlbmNlIGNhbiBpbmNsdWRlIHRoZSBzcGFjZSBrZXkuXG4gICAgfSBlbHNlIGlmICghaXNUeXBpbmcgJiYgKGtleSA9PT0gS2V5LkVudGVyIHx8IGtleSA9PT0gS2V5LlNwYWNlKSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0gJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbS5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICB9IGVsc2UgaWYgKCFpc1R5cGluZyAmJiB0aGlzLl9tdWx0aXBsZSAmJiBbJ2EnLCAnQSddLmluY2x1ZGVzKGtleSkgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGhhc0Rlc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLnNvbWUoKG9wdCkgPT4gIW9wdC5kaXNhYmxlZCAmJiAhb3B0LnNlbGVjdGVkKTtcbiAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKCFvcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgICBoYXNEZXNlbGVjdGVkT3B0aW9ucyA/IG9wdGlvbi5zZWxlY3QoKSA6IG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKEtleS5Fc2NhcGUgPT09IGtleSkge1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkSW5kZXggPSBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcbiAgICAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgIGlmICh0aGlzLl9tdWx0aXBsZSAmJiBpc0Fycm93S2V5ICYmIGV2ZW50LnNoaWZ0S2V5ICYmIG1hbmFnZXIuYWN0aXZlSXRlbSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAhPT0gcHJldmlvdXNseUZvY3VzZWRJbmRleCkge1xuICAgICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fYXJpYURlc2NyaWJlZGJ5ID0gaWRzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIGNoaXAgaW4gdGhpcyBjaGlwIGxpc3QsIG9yIHRoZSBhc3NvY2lhdGVkIGlucHV0IHdoZW4gdGhlcmVcbiAgICogYXJlIG5vIGVsaWdpYmxlIGNoaXBzLlxuICAgKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRPcHRpb25zKCkge1xuICAgIHJldHVybiBbLi4uKHRoaXMudmlld09wdGlvbnMgfHwgW10pLCAuLi4odGhpcy5jb250ZW50T3B0aW9ucyB8fCBbXSldO1xuICB9XG5cbiAgLyoqIFNvcnRzIHRoZSBzZWxlY3RlZCB2YWx1ZXMgaW4gdGhlIHNlbGVjdGVkIGJhc2VkIG9uIHRoZWlyIG9yZGVyIGluIHRoZSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfc29ydFZhbHVlcygpIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgLy8gVE9ETy5cbiAgICB9XG4gIH1cblxuICAvKiogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIHNldCB0aGUgbW9kZWwgdmFsdWUuICovXG4gIHByaXZhdGUgX3Byb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgIGxldCB2YWx1ZVRvRW1pdDogYW55ID0gbnVsbDtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgdmFsdWVUb0VtaXQgPSAodGhpcy5zZWxlY3RlZCBhcyBOb3ZvT3B0aW9uW10pLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZVRvRW1pdCA9IHRoaXMuc2VsZWN0ZWQgPyAodGhpcy5zZWxlY3RlZCBhcyBOb3ZvT3B0aW9uKS52YWx1ZSA6IGZhbGxiYWNrVmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVRvRW1pdDtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSh2YWx1ZVRvRW1pdCk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHsgc2VsZWN0ZWQ6IHZhbHVlVG9FbWl0IH0pO1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5fbWFrZUNoYW5nZUV2ZW50KHZhbHVlVG9FbWl0KSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX21ha2VDaGFuZ2VFdmVudCh2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBOb3ZvU2VsZWN0Q2hhbmdlKHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBTY3JvbGxzIHRoZSBhY3RpdmUgb3B0aW9uIGludG8gdmlldy4gKi9cbiAgcHJvdGVjdGVkIF9zY3JvbGxPcHRpb25JbnRvVmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBRdWVyeUxpc3Q8Tm92b09wdGlvbj4oKTtcbiAgICBvcHRpb25zLnJlc2V0KHRoaXMuX2dldE9wdGlvbnMoKSk7XG4gICAgY29uc3QgbGFiZWxDb3VudCA9IF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKGluZGV4LCBvcHRpb25zLCB0aGlzLm9wdGlvbkdyb3Vwcyk7XG4gICAgY29uc3QgaXRlbUhlaWdodCA9IHRoaXMuX2dldEl0ZW1IZWlnaHQoKTtcbiAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgKGluZGV4ICsgbGFiZWxDb3VudCkgKiBpdGVtSGVpZ2h0LFxuICAgICAgaXRlbUhlaWdodCxcbiAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICk7XG4gIH1cblxuICAvKiogU2V0cyB1cCBhIGtleSBtYW5hZ2VyIHRvIGxpc3RlbiB0byBrZXlib2FyZCBldmVudHMgb24gdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gIHByaXZhdGUgX2luaXRLZXlNYW5hZ2VyKCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5fZ2V0T3B0aW9ucygpKS53aXRoVHlwZUFoZWFkKDI1MCkud2l0aEhvbWVBbmRFbmQoKTtcbiAgICAvLyAud2l0aEFsbG93ZWRNb2RpZmllcktleXMoWydzaGlmdEtleSddKTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIudGFiT3V0LnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgIC8vIFNlbGVjdCB0aGUgYWN0aXZlIGl0ZW0gd2hlbiB0YWJiaW5nIGF3YXkuIFRoaXMgaXMgY29uc2lzdGVudCB3aXRoIGhvdyB0aGUgbmF0aXZlXG4gICAgICAgIC8vIHNlbGVjdCBiZWhhdmVzLiBOb3RlIHRoYXQgd2Ugb25seSB3YW50IHRvIGRvIHRoaXMgaW4gc2luZ2xlIHNlbGVjdGlvbiBtb2RlLlxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc3RvcmUgZm9jdXMgdG8gdGhlIHRyaWdnZXIgYmVmb3JlIGNsb3NpbmcuIEVuc3VyZXMgdGhhdCB0aGUgZm9jdXNcbiAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuICYmIHRoaXMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLl9zY3JvbGxPcHRpb25JbnRvVmlldyh0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMucGFuZWxPcGVuICYmICF0aGlzLm11bHRpcGxlICYmIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyB0aGUgc2VsZWN0ZWQgaXRlbS4gSWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkLCBpdCB3aWxsIGhpZ2hsaWdodFxuICAgKiB0aGUgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgKi9cbiAgcHJpdmF0ZSBfaGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fa2V5TWFuYWdlcikge1xuICAgICAgaWYgKHRoaXMuZW1wdHkpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3B0aW9ucy5maW5kSW5kZXgob3B0aW9uID0+IG9wdGlvbi52YWx1ZSA9PSB0aGlzLl92YWx1ZSlcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBzZWxlY3QncyBvcHRpb25zLiAqL1xuICBwcml2YXRlIF9nZXRJdGVtSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IFtmaXJzdF0gPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgaWYgKGZpcnN0KSB7XG4gICAgICByZXR1cm4gZmlyc3QuX2dldEhvc3RFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8vIFRPRE86IERlcHJlY2F0ZSB0aGlzXG4gIHByaXZhdGUgX2luaXRMZWdhY3lPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBpdGVtLCBsYWJlbDogaXRlbSB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gKHRoaXMub3B0aW9ucyB8fCBbXSlcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGl0ZW0ucmVhZE9ubHkgfHwgaXRlbS5kaXNhYmxlZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBEZXByZWNhdGUgYWxsIGhlYWRlciBtZXRob2RzXG4gICAqL1xuICB0b2dnbGVIZWFkZXIoZXZlbnQsIGZvcmNlVmFsdWU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAvLyBSZXZlcnNlIHRoZSBhY3RpdmUgcHJvcGVydHkgKGlmIGZvcmNlVmFsdWUsIHVzZSB0aGF0KVxuICAgIHRoaXMuaGVhZGVyID0ge1xuICAgICAgb3BlbjogZm9yY2VWYWx1ZSAhPT0gdW5kZWZpbmVkID8gZm9yY2VWYWx1ZSA6ICF0aGlzLmhlYWRlci5vcGVuLFxuICAgICAgdmFsdWU6ICcnLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgaGlnaGxpZ2h0IHBpcGVcbiAgICovXG4gIGhpZ2hsaWdodChtYXRjaCwgcXVlcnkpIHtcbiAgICAvLyBSZXBsYWNlcyB0aGUgY2FwdHVyZSBzdHJpbmcgd2l0aCBhIHRoZSBzYW1lIHN0cmluZyBpbnNpZGUgb2YgYSBcInN0cm9uZ1wiIHRhZ1xuICAgIHJldHVybiBxdWVyeSA/IG1hdGNoLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLmVzY2FwZVJlZ2V4cChxdWVyeSksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPicpIDogbWF0Y2g7XG4gIH1cblxuICBlc2NhcGVSZWdleHAocXVlcnlUb0VzY2FwZSkge1xuICAgIC8vIEV4OiBpZiB0aGUgY2FwdHVyZSBpcyBcImFcIiB0aGUgcmVzdWx0IHdpbGwgYmUgXFxhXG4gICAgcmV0dXJuIHF1ZXJ5VG9Fc2NhcGUucmVwbGFjZSgvKFsuPyorXiRbXFxdXFxcXCgpe318LV0pL2csICdcXFxcJDEnKTtcbiAgfVxuXG4gIHNhdmVIZWFkZXIoKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyLnZhbHVlKSB7XG4gICAgICB0aGlzLmhlYWRlckNvbmZpZy5vblNhdmUodGhpcy5oZWFkZXIudmFsdWUpO1xuICAgICAgdGhpcy5jcmVhdGVkSXRlbSA9IHRoaXMuaGVhZGVyLnZhbHVlO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVhZGVyLnZhbGlkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqIERldGVybWluZXMgdGhlIGBhcmlhLWFjdGl2ZWRlc2NlbmRhbnRgIHRvIGJlIHNldCBvbiB0aGUgaG9zdC4gKi9cbiAgX2dldEFyaWFBY3RpdmVEZXNjZW5kYW50KCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiB0aGlzLl9rZXlNYW5hZ2VyICYmIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbS5pZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19