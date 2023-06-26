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
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { ErrorStateMatcher, mixinDisabled, mixinErrorState, mixinOverlay, mixinRequired, mixinTabIndex, NovoOptgroup, NovoOption, NOVO_OPTION_PARENT_COMPONENT, _countGroupLabelsBeforeOption, _getOptionScrollPosition, } from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "novo-elements/elements/common";
import * as i4 from "@angular/forms";
import * as i5 from "novo-elements/elements/button";
import * as i6 from "novo-elements/elements/divider";
import * as i7 from "@angular/common";
import * as i8 from "novo-elements/elements/tooltip";
import * as i9 from "novo-elements/pipes";
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
        this.position = 'above-below';
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
    ngOnInit() {
        this.stateChanges.next();
        this._initLegacyOptions();
        this.focusMonitor.monitor(this.dropdown.nativeElement).subscribe((origin) => this.ngZone.run(() => {
            if (origin === 'keyboard' && !this.disabled) {
                this.openPanel();
            }
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
}
NovoSelectElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i2.FocusMonitor }, { token: i0.NgZone }, { token: i3.ErrorStateMatcher }, { token: i4.NgControl, optional: true, self: true }, { token: i4.NgForm, optional: true }, { token: i4.FormGroupDirective, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoSelectElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSelectElement, selector: "novo-select", inputs: { disabled: "disabled", required: "required", tabIndex: "tabIndex", id: "id", name: "name", options: "options", placeholder: "placeholder", readonly: "readonly", headerConfig: "headerConfig", position: "position", overlayWidth: "overlayWidth", overlayHeight: "overlayHeight", displayWith: "displayWith", compareWith: "compareWith", value: "value", multiple: "multiple" }, outputs: { onSelect: "onSelect", selectionChange: "selectionChange", valueChange: "valueChange", openedChange: "openedChange", _openedStream: "opened", _closedStream: "closed" }, host: { attributes: { "role": "combobox", "aria-autocomplete": "none", "aria-haspopup": "true" }, listeners: { "keydown": "_handleKeydown($event)" }, properties: { "attr.id": "id", "attr.aria-controls": "panelOpen ? id + \"-panel\" : null", "attr.aria-expanded": "panelOpen", "attr.aria-required": "required.toString()", "attr.aria-disabled": "disabled.toString()", "attr.aria-invalid": "errorState", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-activedescendant": "_getAriaActiveDescendant()", "class.novo-select-disabled": "disabled", "class.novo-select-invalid": "errorState", "class.novo-select-required": "required", "class.novo-select-empty": "empty", "class.novo-select-multiple": "multiple" }, classAttribute: "novo-select" }, providers: [
        { provide: NovoFieldControl, useExisting: NovoSelectElement },
        { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoSelectElement },
    ], queries: [{ propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "contentOptions", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true, static: true }, { propertyName: "dropdown", first: true, predicate: ["dropdownElement"], descendants: true, static: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }, { propertyName: "viewOptions", predicate: NovoOption, descendants: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <div class="novo-select-trigger" #dropdownElement (click)="togglePanel(); (false)" tabIndex="{{ disabled ? -1 : 0 }}" type="button">
      <span class="novo-select-placeholder" *ngIf="empty">{{ placeholder }}</span>
      <span class="text-ellipsis" *ngIf="!empty">{{ displayValue }}</span>
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
  `, isInline: true, components: [{ type: i3.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i5.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i6.NovoDividerComponent, selector: "novo-divider", inputs: ["vertical", "inset"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }], pipes: { "highlight": i9.HighlightPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-select',
                    inputs: ['disabled', 'required', 'tabIndex'],
                    providers: [
                        { provide: NovoFieldControl, useExisting: NovoSelectElement },
                        { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoSelectElement },
                    ],
                    template: `
    <div class="novo-select-trigger" #dropdownElement (click)="togglePanel(); (false)" tabIndex="{{ disabled ? -1 : 0 }}" type="button">
      <span class="novo-select-placeholder" *ngIf="empty">{{ placeholder }}</span>
      <span class="text-ellipsis" *ngIf="!empty">{{ displayValue }}</span>
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
  `,
                    host: {
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
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
                        '[class.novo-select-disabled]': 'disabled',
                        '[class.novo-select-invalid]': 'errorState',
                        '[class.novo-select-required]': 'required',
                        '[class.novo-select-empty]': 'empty',
                        '[class.novo-select-multiple]': 'multiple',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i2.FocusMonitor }, { type: i0.NgZone }, { type: i3.ErrorStateMatcher }, { type: i4.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i4.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i4.FormGroupDirective, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { id: [{
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
            }], dropdown: [{
                type: ViewChild,
                args: ['dropdownElement', { static: true }]
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
            }], _handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VsZWN0L1NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsSUFBSSxFQUVKLFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixrQkFBa0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0YsU0FBUztBQUNULE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBTyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFJTCxpQkFBaUIsRUFHakIsYUFBYSxFQUNiLGVBQWUsRUFDZixZ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QVM7dUJBQUMsT0FBTztnQkFRZCxLQUFLO3NCQURSLEtBQUs7Z0JBaUJGLFFBQVE7c0JBRFgsS0FBSztnQkErUk4sY0FBYztzQkFEYixZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciwgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2VsZixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdDb250cm9sLCBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gQXBwXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzLCBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGVDdG9yLFxuICBDYW5SZXF1aXJlQ3RvcixcbiAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsXG4gIEVycm9yU3RhdGVNYXRjaGVyLFxuICBIYXNPdmVybGF5Q3RvcixcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpbkVycm9yU3RhdGUsXG4gIG1peGluT3ZlcmxheSxcbiAgbWl4aW5SZXF1aXJlZCxcbiAgbWl4aW5UYWJJbmRleCxcbiAgTm92b09wdGdyb3VwLFxuICBOb3ZvT3B0aW9uLFxuICBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlLFxuICBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxufSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ZpZWxkQ29udHJvbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmllbGQnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbi8vIGNvbnN0IFNFTEVDVF9WQUxVRV9BQ0NFU1NPUiA9IHtcbi8vICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4vLyAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9TZWxlY3RFbGVtZW50KSxcbi8vICAgbXVsdGk6IHRydWUsXG4vLyB9O1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBzZWxlY3QgdGhhdCBlbWl0dGVkIHRoZSBjaGFuZ2UgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTm92b1NlbGVjdEVsZW1lbnQsXG4gICAgLyoqIEN1cnJlbnQgdmFsdWUgb2YgdGhlIHNlbGVjdCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyB2YWx1ZTogYW55LFxuICApIHt9XG59XG5cbi8vIENyZWF0ZSBCYXNlIENsYXNzIGZyb20gTWl4aW5zXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zXG5jbGFzcyBOb3ZvU2VsZWN0QmFzZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBwdWJsaWMgX3BhcmVudEZvcm06IE5nRm9ybSxcbiAgICBwdWJsaWMgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgKSB7fVxufVxuY29uc3QgTm92b1NlbGVjdE1peGluczogSGFzT3ZlcmxheUN0b3IgJlxuICBDYW5SZXF1aXJlQ3RvciAmXG4gIENhbkRpc2FibGVDdG9yICZcbiAgSGFzVGFiSW5kZXhDdG9yICZcbiAgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IgJlxuICB0eXBlb2YgTm92b1NlbGVjdEJhc2UgPSBtaXhpbk92ZXJsYXkobWl4aW5UYWJJbmRleChtaXhpblJlcXVpcmVkKG1peGluRGlzYWJsZWQobWl4aW5FcnJvclN0YXRlKE5vdm9TZWxlY3RCYXNlKSkpKSk7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNlbGVjdCcsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICdyZXF1aXJlZCcsICd0YWJJbmRleCddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5vdm9GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBOb3ZvU2VsZWN0RWxlbWVudCB9LFxuICAgIHsgcHJvdmlkZTogTk9WT19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgdXNlRXhpc3Rpbmc6IE5vdm9TZWxlY3RFbGVtZW50IH0sXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tc2VsZWN0LXRyaWdnZXJcIiAjZHJvcGRvd25FbGVtZW50IChjbGljayk9XCJ0b2dnbGVQYW5lbCgpOyAoZmFsc2UpXCIgdGFiSW5kZXg9XCJ7eyBkaXNhYmxlZCA/IC0xIDogMCB9fVwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibm92by1zZWxlY3QtcGxhY2Vob2xkZXJcIiAqbmdJZj1cImVtcHR5XCI+e3sgcGxhY2Vob2xkZXIgfX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRleHQtZWxsaXBzaXNcIiAqbmdJZj1cIiFlbXB0eVwiPnt7IGRpc3BsYXlWYWx1ZSB9fTwvc3Bhbj5cbiAgICAgIDxpIGNsYXNzPVwiYmhpLWNvbGxhcHNlXCI+PC9pPlxuICAgIDwvZGl2PlxuICAgIDxub3ZvLW92ZXJsYXktdGVtcGxhdGVcbiAgICAgIFtwYXJlbnRdPVwiZWxlbWVudFJlZlwiXG4gICAgICBbcG9zaXRpb25dPVwicG9zaXRpb25cIlxuICAgICAgW3dpZHRoXT1cIm92ZXJsYXlXaWR0aFwiXG4gICAgICBbaGVpZ2h0XT1cIm92ZXJsYXlIZWlnaHRcIlxuICAgICAgKGNsb3NpbmcpPVwiZHJvcGRvd24ubmF0aXZlRWxlbWVudC5mb2N1cygpXCJcbiAgICA+XG4gICAgICA8ZGl2ICNwYW5lbCBjbGFzcz1cIm5vdm8tc2VsZWN0LWxpc3RcIiB0YWJJbmRleD1cIi0xXCIgW2NsYXNzLmhhcy1oZWFkZXJdPVwiaGVhZGVyQ29uZmlnXCIgW2NsYXNzLmFjdGl2ZV09XCJwYW5lbE9wZW5cIj5cbiAgICAgICAgPG5vdm8tb3B0aW9uICpuZ0lmPVwiaGVhZGVyQ29uZmlnXCIgY2xhc3M9XCJzZWxlY3QtaGVhZGVyXCIgW2NsYXNzLm9wZW5dPVwiaGVhZGVyLm9wZW5cIj5cbiAgICAgICAgICA8bm92by1idXR0b24gKm5nSWY9XCIhaGVhZGVyLm9wZW5cIiBpY29uPVwiYWRkLXRoaW5cIiAoY2xpY2spPVwidG9nZ2xlSGVhZGVyKCRldmVudCk7IChmYWxzZSlcIiB0YWJJbmRleD1cIi0xXCIgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIHt7IGhlYWRlckNvbmZpZy5sYWJlbCB9fVxuICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImhlYWRlci5vcGVuXCIgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGhlYWRlci5vcGVuIH1cIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiaGVhZGVyQ29uZmlnLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgW2F0dHIuaWRdPVwibmFtZVwiXG4gICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJoZWFkZXIudmFsdWVcIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7IGludmFsaWQ6ICFoZWFkZXIudmFsaWQgfVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVIZWFkZXIoJGV2ZW50LCBmYWxzZSlcIj57eyBsYWJlbHMuY2FuY2VsIH19PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIChjbGljayk9XCJzYXZlSGVhZGVyKClcIiBjbGFzcz1cInByaW1hcnlcIj57eyBsYWJlbHMuc2F2ZSB9fTwvbm92by1idXR0b24+XG4gICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPCEtLSBEZWNsYXJhdGl2ZSBDb250ZW50IEdvZXMgSGVyZSAtLT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8IS0tIERhdGEgRHJpdmVuIENvbnRlbnQgR29lcyBIZXJlIC0tPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyZWRPcHRpb25zOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uXG4gICAgICAgICAgICAqbmdJZj1cIiFvcHRpb24uZGl2aWRlcjsgZWxzZSBkaXZpZGVyXCJcbiAgICAgICAgICAgIGNsYXNzPVwic2VsZWN0LWl0ZW1cIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbi5kaXNhYmxlZFwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm9wdGlvbi5hY3RpdmVcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLXZhbHVlXT1cIm9wdGlvbi5sYWJlbFwiXG4gICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICAgIFt0b29sdGlwXT1cIm9wdGlvbi50b29sdGlwXCJcbiAgICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwib3B0aW9uLnRvb2x0aXBQb3NpdGlvbiB8fCAncmlnaHQnXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cIm9wdGlvbi5sYWJlbCB8IGhpZ2hsaWdodDpmaWx0ZXJUZXJtXCI+PC9zcGFuPiA8aSAqbmdJZj1cIm9wdGlvbi5hY3RpdmVcIiBjbGFzcz1cImJoaS1jaGVja1wiPjwvaT5cbiAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGl2aWRlcj5cbiAgICAgICAgICAgIDxub3ZvLWRpdmlkZXIgY2xhc3M9XCJzZWxlY3QtaXRlbS1kaXZpZGVyXCIgW2NsYXNzLndpdGgtbGFiZWxdPVwib3B0aW9uLmxhYmVsXCIgW2NsYXNzLndpdGhvdXQtbGFiZWxdPVwiIW9wdGlvbi5sYWJlbFwiPlxuICAgICAgICAgICAgICB7eyBvcHRpb24/LmxhYmVsIH19XG4gICAgICAgICAgICA8L25vdm8tZGl2aWRlcj5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbm92by1vdmVybGF5LXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXNlbGVjdCcsXG4gICAgcm9sZTogJ2NvbWJvYm94JyxcbiAgICAnYXJpYS1hdXRvY29tcGxldGUnOiAnbm9uZScsXG4gICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXG4gICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ3BhbmVsT3BlbiA/IGlkICsgXCItcGFuZWxcIiA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdwYW5lbE9wZW4nLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdyZXF1aXJlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ19hcmlhRGVzY3JpYmVkYnkgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnX2dldEFyaWFBY3RpdmVEZXNjZW5kYW50KCknLFxuICAgICdbY2xhc3Mubm92by1zZWxlY3QtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm5vdm8tc2VsZWN0LWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICdbY2xhc3Mubm92by1zZWxlY3QtcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAnW2NsYXNzLm5vdm8tc2VsZWN0LWVtcHR5XSc6ICdlbXB0eScsXG4gICAgJ1tjbGFzcy5ub3ZvLXNlbGVjdC1tdWx0aXBsZV0nOiAnbXVsdGlwbGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2VsZWN0RWxlbWVudFxuICBleHRlbmRzIE5vdm9TZWxlY3RNaXhpbnNcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTm92b0ZpZWxkQ29udHJvbDxhbnk+XG57XG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbm92by1zZWxlY3QtJHsrK25leHRJZH1gO1xuICBwcml2YXRlIF9zdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2FjdGl2ZU9wdGlvbkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICByZWFkb25seSBjb250cm9sVHlwZTogc3RyaW5nID0gJ3NlbGVjdCc7XG5cbiAgLyoqIEBkb2NzLXByaXZhdGUgSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBsYXN0S2V5VmFsdWU6IHN0cmluZyA9IG51bGw7XG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4qL1xuICBsYXN0Q2FyZXRQb3NpdGlvbjogbnVtYmVyIHwgbnVsbDtcblxuICBfc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE5vdm9PcHRpb24+O1xuXG4gIC8qKiBUaGUgYXJpYS1kZXNjcmliZWRieSBhdHRyaWJ1dGUgb24gdGhlIGNoaXAgbGlzdCBmb3IgaW1wcm92ZWQgYTExeS4gKi9cbiAgX2FyaWFEZXNjcmliZWRieTogc3RyaW5nO1xuICAvKiogVGFiIGluZGV4IGZvciB0aGUgY2hpcCBsaXN0LiAqL1xuICBfdGFiSW5kZXggPSAwO1xuICAvKiogVXNlciBkZWZpbmVkIHRhYiBpbmRleC4gKi9cbiAgX3VzZXJUYWJJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIC8qKiBUaGUgRm9jdXNLZXlNYW5hZ2VyIHdoaWNoIGhhbmRsZXMgZm9jdXMuICovXG4gIF9rZXlNYW5hZ2VyOiBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxOb3ZvT3B0aW9uPjtcblxuICBASW5wdXQoKVxuICBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKVxuICBvcHRpb25zOiBBcnJheTxhbnk+O1xuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlbGVjdC4uLic7XG4gIEBJbnB1dCgpXG4gIHJlYWRvbmx5OiBib29sZWFuO1xuICBASW5wdXQoKVxuICBoZWFkZXJDb25maWc6IGFueTtcbiAgQElucHV0KClcbiAgcG9zaXRpb246IHN0cmluZyA9ICdhYm92ZS1iZWxvdyc7XG4gIEBJbnB1dCgpXG4gIG92ZXJsYXlXaWR0aDogbnVtYmVyO1xuICBASW5wdXQoKVxuICBvdmVybGF5SGVpZ2h0OiBudW1iZXI7XG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQgYnkgdGhlIHVzZXIuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOb3ZvU2VsZWN0Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b1NlbGVjdENoYW5nZT4oKTtcbiAgLyoqIEV2ZW50IHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIHJhdyB2YWx1ZSBvZiB0aGUgc2VsZWN0IGNoYW5nZXMuKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBwYW5lbCBoYXMgYmVlbiB0b2dnbGVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBvcGVuZWQuICovXG4gIEBPdXRwdXQoJ29wZW5lZCcpIHJlYWRvbmx5IF9vcGVuZWRTdHJlYW06IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLm9wZW5lZENoYW5nZS5waXBlKFxuICAgIGZpbHRlcigobykgPT4gbyksXG4gICAgbWFwKCgpID0+IHt9KSxcbiAgKTtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgQE91dHB1dCgnY2xvc2VkJykgcmVhZG9ubHkgX2Nsb3NlZFN0cmVhbTogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoXG4gICAgZmlsdGVyKChvKSA9PiAhbyksXG4gICAgbWFwKCgpID0+IHt9KSxcbiAgKTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBtYXBzIGFuIG9wdGlvbidzIGNvbnRyb2wgdmFsdWUgdG8gaXRzIGRpc3BsYXkgdmFsdWUgaW4gdGhlIHRyaWdnZXIuICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAoKHZhbHVlOiBhbnkpID0+IHN0cmluZykgfCBudWxsID0gbnVsbDtcbiAgLyoqICogRnVuY3Rpb24gdG8gY29tcGFyZSB0aGUgb3B0aW9uIHZhbHVlcyB3aXRoIHRoZSBzZWxlY3RlZCB2YWx1ZXMuICovXG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbiA9IChvMTogYW55LCBvMjogYW55KSA9PlxuICAgIG8xID09PSBvMiB8fCBvMSA9PT0gbzIuaWQgfHwgKCFIZWxwZXJzLmlzRW1wdHkobzEuaWQpICYmICFIZWxwZXJzLmlzRW1wdHkobzIuaWQpICYmIG8xLmlkID09PSBvMi5pZCk7XG5cbiAgaGVhZGVyOiBhbnkgPSB7XG4gICAgb3BlbjogZmFsc2UsXG4gICAgdmFsaWQ6IHRydWUsXG4gICAgdmFsdWU6ICcnLFxuICB9O1xuICBjcmVhdGVkSXRlbTogYW55O1xuICBtb2RlbDogYW55O1xuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgZmlsdGVyVGVybTogc3RyaW5nID0gJyc7XG4gIGZpbHRlclRlcm1UaW1lb3V0O1xuICBmaWx0ZXJlZE9wdGlvbnM6IGFueTtcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pXG4gIG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duRWxlbWVudCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIGRyb3Bkb3duOiBFbGVtZW50UmVmO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGdyb3VwLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE5vdm9PcHRncm91cD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBjb250ZW50T3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+O1xuICBAVmlld0NoaWxkcmVuKE5vdm9PcHRpb24pXG4gIHZpZXdPcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG5cbiAgQFZpZXdDaGlsZCgncGFuZWwnKVxuICBwYW5lbDogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAvLyBBbHdheXMgcmUtYXNzaWduIGFuIGFycmF5LCBiZWNhdXNlIGl0IG1pZ2h0IGhhdmUgYmVlbiBtdXRhdGVkLlxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fdmFsdWUgfHwgKHRoaXMuX211bHRpcGxlICYmIEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICB0aGlzLl9zZXRTZWxlY3Rpb25CeVZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3ZhbHVlOiBhbnkgPSBudWxsO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB1c2VyIHNob3VsZCBiZSBhbGxvd2VkIHRvIHNlbGVjdCBtdWx0aXBsZSBvcHRpb25zLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gJ2Fib3ZlLWJlbG93JztcbiAgfVxuICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3QgaXMgZm9jdXNlZC4gKi9cbiAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQgfHwgdGhpcy5wYW5lbE9wZW47XG4gIH1cbiAgcHJpdmF0ZSBfZm9jdXNlZCA9IGZhbHNlO1xuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gSGVscGVycy5pc0VtcHR5KHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIG9wdGlvbi4gKi9cbiAgZ2V0IHNlbGVjdGVkKCk6IE5vdm9PcHRpb24gfCBOb3ZvT3B0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQgOiB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXTtcbiAgfVxuXG4gIC8qKiBUaGUgdmFsdWUgZGlzcGxheWVkIGluIHRoZSB0cmlnZ2VyLiAqL1xuICBnZXQgZGlzcGxheVZhbHVlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZW1wdHkpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKHRoaXMuX211bHRpcGxlKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAoKG9wdGlvbikgPT4gdGhpcy5fZ2V0RGlzcGxheVZhbHVlKG9wdGlvbikpO1xuICAgICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9ucy5qb2luKCcsICcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZ2V0RGlzcGxheVZhbHVlKHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsXG4gICAgcHVibGljIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIGRlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKSBfcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgKSB7XG4gICAgc3VwZXIoZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBfcGFyZW50Rm9ybSwgX3BhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcbiAgICBpZiAobmdDb250cm9sKSB7XG4gICAgICBuZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE5vdm9PcHRpb24+KHRoaXMubXVsdGlwbGUpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIHRoaXMuX2luaXRMZWdhY3lPcHRpb25zKCk7XG4gICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQpLnN1YnNjcmliZSgob3JpZ2luKSA9PlxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgaWYgKG9yaWdpbiA9PT0gJ2tleWJvYXJkJyAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9ICEhb3JpZ2luO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIFVwZGF0aW5nIHRoZSBkaXNhYmxlZCBzdGF0ZSBpcyBoYW5kbGVkIGJ5IGBtaXhpbkRpc2FibGVkYCwgYnV0IHdlIG5lZWQgdG8gYWRkaXRpb25hbGx5IGxldFxuICAgIC8vIHRoZSBwYXJlbnQgZm9ybSBmaWVsZCBrbm93IHRvIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGNoYW5nZXMuXG4gICAgaWYgKGNoYW5nZXM/LmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzPy5tdWx0aXBsZSkge1xuICAgICAgLy8gVE9ETzogY29weSBzZWxlY3Rpb24gb3Zlcj8/XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxOb3ZvT3B0aW9uPih0aGlzLm11bHRpcGxlKTtcbiAgICB9XG4gICAgdGhpcy5faW5pdExlZ2FjeU9wdGlvbnMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBJbml0aWFsaXplIEtleU1hbmFnZXIgdG8gbWFuYWdlIGtleWJvYXJkIGV2ZW50c1xuICAgIHRoaXMuX2luaXRLZXlNYW5hZ2VyKCk7XG4gICAgLy8gU3Vic2NyaWJlIHRvIE5vdm9PcHRpb24gc2VsZWN0aW9uc1xuICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gICAgLy8gU2V0IGluaXRpYWwgdmFsdWVcbiAgICB0aGlzLl9pbml0aWFsaXplU2VsZWN0aW9uKCk7XG4gICAgLy8gTGlzdGVuIHRvIHNlbGVjdGlvbiBjaGFuZ2VzIHRvIHNlbGVjdCBhbmQgZGVzZWxlY3Qgb3B0aW9uc1xuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNoYW5nZWQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LmFkZGVkLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uLnNlbGVjdCkge1xuICAgICAgICAgIG9wdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBldmVudC5yZW1vdmVkLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uLmRlc2VsZWN0KSB7XG4gICAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIExpc3RlbiB0byBRdWVyeUxpc3QgY2hhbmdlc1xuICAgIG1lcmdlKHRoaXMuY29udGVudE9wdGlvbnMuY2hhbmdlcywgdGhpcy52aWV3T3B0aW9ucy5jaGFuZ2VzKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVTZWxlY3Rpb24oKTtcbiAgICAgIH0pO1xuXG4gICAgbWVyZ2UodGhpcy5vdmVybGF5Lm9wZW5pbmcsIHRoaXMub3ZlcmxheS5jbG9zaW5nKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodGhpcy5wYW5lbE9wZW4pO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWN0aXZlT3B0aW9uQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBvcGVuUGFuZWwoKSB7XG4gICAgc3VwZXIub3BlblBhbmVsKCk7XG4gICAgdGhpcy5faGlnaGxpZ2h0Q29ycmVjdE9wdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgLy8gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMgZnJvbSBBbmd1bGFyLlxuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fc2V0U2VsZWN0aW9uQnlWYWx1ZSh0aGlzLm5nQ29udHJvbCA/IHRoaXMubmdDb250cm9sLnZhbHVlIDogdGhpcy5fdmFsdWUpO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbiBiYXNlZCBvbiBhIHZhbHVlLiBJZiBubyBvcHRpb24gY2FuIGJlXG4gICAqIGZvdW5kIHdpdGggdGhlIGRlc2lnbmF0ZWQgdmFsdWUsIHRoZSBzZWxlY3QgdHJpZ2dlciBpcyBjbGVhcmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZTogYW55IHwgYW55W10pOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGlmIChvcHRpb24uc2V0SW5hY3RpdmVTdHlsZXMpIHtcbiAgICAgICAgb3B0aW9uLnNldEluYWN0aXZlU3R5bGVzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoY3VycmVudFZhbHVlOiBhbnkpID0+IHRoaXMuX3NlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgdGhpcy5fc29ydFZhbHVlcygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fa2V5TWFuYWdlcikge1xuICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMuX3NlbGVjdFZhbHVlKHZhbHVlKTtcbiAgICAgIC8vIFNoaWZ0IGZvY3VzIHRvIHRoZSBhY3RpdmUgaXRlbS4gTm90ZSB0aGF0IHdlIHNob3VsZG4ndCBkbyB0aGlzIGluIG11bHRpcGxlXG4gICAgICAvLyBtb2RlLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hhdCBvcHRpb24gdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIGxhc3QuXG4gICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oY29ycmVzcG9uZGluZ09wdGlvbik7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAvLyBPdGhlcndpc2UgcmVzZXQgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbi4gTm90ZSB0aGF0IHdlIG9ubHkgd2FudCB0byBkbyB0aGlzIHdoaWxlXG4gICAgICAgIC8vIGNsb3NlZCwgYmVjYXVzZSBkb2luZyBpdCB3aGlsZSBvcGVuIGNhbiBzaGlmdCB0aGUgdXNlcidzIGZvY3VzIHVubmVjZXNzYXJpbHkuXG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSgtMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGFuZCBzZWxlY3RzIGFuZCBvcHRpb24gYmFzZWQgb24gaXRzIHZhbHVlLlxuICAgKiBAcmV0dXJucyBPcHRpb24gdGhhdCBoYXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3RWYWx1ZSh2YWx1ZTogYW55KTogTm92b09wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgYWxsT3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnMoKTtcbiAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gYWxsT3B0aW9ucy5maW5kKChvcHRpb246IE5vdm9PcHRpb24pID0+IHtcbiAgICAgIC8vIFNraXAgb3B0aW9ucyB0aGF0IGFyZSBhbHJlYWR5IGluIHRoZSBtb2RlbC4gVGhpcyBhbGxvd3MgdXMgdG8gaGFuZGxlIGNhc2VzXG4gICAgICAvLyB3aGVyZSB0aGUgc2FtZSBwcmltaXRpdmUgdmFsdWUgaXMgc2VsZWN0ZWQgbXVsdGlwbGUgdGltZXMuXG4gICAgICBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAhSGVscGVycy5pc0VtcHR5KHZhbHVlKSAmJiAhSGVscGVycy5pc0VtcHR5KG9wdGlvbi52YWx1ZSkgJiYgdGhpcy5jb21wYXJlV2l0aChvcHRpb24udmFsdWUsIHZhbHVlKTtcbiAgICB9KTtcbiAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgIWNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgIC8vIERvdWJsZSBDaGVjayBvcHRpb24gbm90IGFscmVhZHkgYWRkZWQuXG4gICAgICBjb25zdCBsZWdhY3lPcHRpb24gPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5maW5kKChpdCkgPT4gaXQudmFsdWUgPT09IHZhbHVlKTtcbiAgICAgIGlmICghbGVnYWN5T3B0aW9uKSB7XG4gICAgICAgIC8vIEFkZCBhIGRpc2FibGVkIG9wdGlvbiB0byB0aGUgbGlzdCBhbmQgc2VsZWN0IGl0XG4gICAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zLnB1c2goe1xuICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgIHRvb2x0aXA6ICdWYWx1ZSBpcyBub3QgcHJvdmlkZWQgaW4gbGlzdCBvZiB2YWxpZCBvcHRpb25zLicsXG4gICAgICAgICAgbGFiZWw6IHZhbHVlPy5sYWJlbCB8fCB2YWx1ZSxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29ycmVzcG9uZGluZ09wdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3Qob3B0aW9uLCBpLCBmaXJlRXZlbnRzOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGNvbnNvbGUud2Fybignc2VsZWN0KCkgbWV0aG9kIGlzIGRlcHJlY2F0ZWQnKTtcbiAgfVxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgY29uc29sZS53YXJuKCdjbGVhcigpIG1ldGhvZCBpcyBkZXByZWNhdGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGl0ZW0gaXMgbm90IGRpc2FibGVkLCB0aGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsXG4gICAqIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZCBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5XG4gICAqIGlmIHRoaXMgaW50ZXJhY3Rpb24gc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgKi9cbiAgaGFuZGxlU2VsZWN0aW9uKG9wdGlvbjogTm92b09wdGlvbiwgaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IHdhc1NlbGVjdGVkID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pO1xuICAgIGlmIChvcHRpb24udmFsdWUgPT0gbnVsbCAmJiAhdGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgIGlmICh0aGlzLnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRlQ2hhbmdlcyhvcHRpb24udmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAod2FzU2VsZWN0ZWQgIT09IG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPyB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3Qob3B0aW9uKSA6IHRoaXMuX3NlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KG9wdGlvbik7XG4gICAgICB9XG4gICAgICBpZiAoaXNVc2VySW5wdXQpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKG9wdGlvbik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLl9zb3J0VmFsdWVzKCk7XG4gICAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh3YXNTZWxlY3RlZCAhPT0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pKSB7XG4gICAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RGlzcGxheVZhbHVlKG9wdGlvbjogTm92b09wdGlvbiAmIHsgdmFsdWU/OiBhbnk7IGxhYmVsPzogc3RyaW5nIH0pOiBzdHJpbmcge1xuICAgIGlmICghb3B0aW9uKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCB0b0Rpc3BsYXkgPSBvcHRpb24udmlld1ZhbHVlO1xuICAgIGlmICh0aGlzLmRpc3BsYXlXaXRoKSB7XG4gICAgICB0b0Rpc3BsYXkgPSB0aGlzLmRpc3BsYXlXaXRoKG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuICAgIC8vIFNpbXBseSBmYWxsaW5nIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBkaXNwbGF5IHZhbHVlIGlzIGZhbHN5IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAgLy8gVGhlIGRpc3BsYXkgdmFsdWUgY2FuIGFsc28gYmUgdGhlIG51bWJlciB6ZXJvIGFuZCBzaG91bGRuJ3QgZmFsbCBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSB0b0Rpc3BsYXkgIT0gbnVsbCA/IHRvRGlzcGxheSA6ICcnO1xuICAgIHJldHVybiBkaXNwbGF5VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oc2tpcDogTm92b09wdGlvbikge1xuICAgIHRoaXMuX2dldE9wdGlvbnMoKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGlmIChvcHRpb24gIT09IHNraXAgJiYgb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2F0Y2hTZWxlY3Rpb25FdmVudHMoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnMoKTtcbiAgICBjb25zdCBzZWxlY3Rpb25FdmVudHMgPSBvcHRpb25zID8gbWVyZ2UoLi4ub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKSkgOiBvZigpO1xuICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcyA9IHNlbGVjdGlvbkV2ZW50cy5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoZXZlbnQ6IE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2UpID0+IHtcbiAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uKGV2ZW50LnNvdXJjZSwgZXZlbnQuaXNVc2VySW5wdXQpO1xuICAgICAgaWYgKGV2ZW50LmlzVXNlcklucHV0ICYmICF0aGlzLm11bHRpcGxlICYmIHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBhbGwga2V5ZG93biBldmVudHMgb24gdGhlIHNlbGVjdC4gKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnBhbmVsT3BlbiA/IHRoaXMuX2hhbmRsZU9wZW5LZXlkb3duKGV2ZW50KSA6IHRoaXMuX2hhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGlsZSB0aGUgc2VsZWN0IGlzIGNsb3NlZC4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5ID09PSBLZXkuQXJyb3dEb3duIHx8IGtleSA9PT0gS2V5LkFycm93VXAgfHwga2V5ID09PSBLZXkuQXJyb3dMZWZ0IHx8IGtleSA9PT0gS2V5LkFycm93UmlnaHQ7XG4gICAgY29uc3QgaXNPcGVuS2V5ID0ga2V5ID09PSBLZXkuRW50ZXIgfHwga2V5ID09PSBLZXkuU3BhY2U7XG4gICAgY29uc3QgbWFuYWdlciA9IHRoaXMuX2tleU1hbmFnZXI7XG4gICAgLy8gT3BlbiB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgaWYgKCghbWFuYWdlci5pc1R5cGluZygpICYmIGlzT3BlbktleSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB8fCAoKHRoaXMubXVsdGlwbGUgfHwgZXZlbnQuYWx0S2V5KSAmJiBpc0Fycm93S2V5KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudHMgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biB3aGVuIHByZXNzaW5nIHNwYWNlXG4gICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgICAvLyBBbGxvdyBjaGFuZ2luZyB2YWx1ZSB3aXRoIGFycm93IGtleXMuXG4gICAgLy8gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAvLyAgIGNvbnN0IHByZXZpb3VzbHlTZWxlY3RlZE9wdGlvbiA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgLy8gICBtYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgLy8gICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgLy8gfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIHdoZW4gdGhlIHNlbGVjdGVkIGlzIG9wZW4uICovXG4gIHByaXZhdGUgX2hhbmRsZU9wZW5LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbWFuYWdlciA9IHRoaXMuX2tleU1hbmFnZXI7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXkgPT09IEtleS5BcnJvd0Rvd24gfHwga2V5ID09PSBLZXkuQXJyb3dVcDtcbiAgICBjb25zdCBpc1R5cGluZyA9IG1hbmFnZXIuaXNUeXBpbmcoKTtcblxuICAgIGlmIChpc0Fycm93S2V5ICYmIGV2ZW50LmFsdEtleSkge1xuICAgICAgLy8gQ2xvc2UgdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaW4gdGhpcyBjYXNlIGlmIHRoZSB1c2VyIGlzIHR5cGluZyxcbiAgICAgIC8vIGJlY2F1c2UgdGhlIHR5cGluZyBzZXF1ZW5jZSBjYW4gaW5jbHVkZSB0aGUgc3BhY2Uga2V5LlxuICAgIH0gZWxzZSBpZiAoIWlzVHlwaW5nICYmIChrZXkgPT09IEtleS5FbnRlciB8fCBrZXkgPT09IEtleS5TcGFjZSkgJiYgbWFuYWdlci5hY3RpdmVJdGVtICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgfSBlbHNlIGlmICghaXNUeXBpbmcgJiYgdGhpcy5fbXVsdGlwbGUgJiYgWydhJywgJ0EnXS5pbmNsdWRlcyhrZXkpICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBoYXNEZXNlbGVjdGVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5zb21lKChvcHQpID0+ICFvcHQuZGlzYWJsZWQgJiYgIW9wdC5zZWxlY3RlZCk7XG4gICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmICghb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgaGFzRGVzZWxlY3RlZE9wdGlvbnMgPyBvcHRpb24uc2VsZWN0KCkgOiBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChLZXkuRXNjYXBlID09PSBrZXkpIHtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEluZGV4ID0gbWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG4gICAgICBtYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICBpZiAodGhpcy5fbXVsdGlwbGUgJiYgaXNBcnJvd0tleSAmJiBldmVudC5zaGlmdEtleSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0gJiYgbWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT09IHByZXZpb3VzbHlGb2N1c2VkSW5kZXgpIHtcbiAgICAgICAgbWFuYWdlci5hY3RpdmVJdGVtLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgc2V0RGVzY3JpYmVkQnlJZHMoaWRzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2FyaWFEZXNjcmliZWRieSA9IGlkcy5qb2luKCcgJyk7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIGZpcnN0IG5vbi1kaXNhYmxlZCBjaGlwIGluIHRoaXMgY2hpcCBsaXN0LCBvciB0aGUgYXNzb2NpYXRlZCBpbnB1dCB3aGVuIHRoZXJlXG4gICAqIGFyZSBubyBlbGlnaWJsZSBjaGlwcy5cbiAgICovXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5mb2N1cyhvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIFsuLi4odGhpcy52aWV3T3B0aW9ucyB8fCBbXSksIC4uLih0aGlzLmNvbnRlbnRPcHRpb25zIHx8IFtdKV07XG4gIH1cblxuICAvKiogU29ydHMgdGhlIHNlbGVjdGVkIHZhbHVlcyBpbiB0aGUgc2VsZWN0ZWQgYmFzZWQgb24gdGhlaXIgb3JkZXIgaW4gdGhlIHBhbmVsLiAqL1xuICBwcml2YXRlIF9zb3J0VmFsdWVzKCkge1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAvLyBUT0RPLlxuICAgIH1cbiAgfVxuXG4gIC8qKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gc2V0IHRoZSBtb2RlbCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfcHJvcGFnYXRlQ2hhbmdlcyhmYWxsYmFja1ZhbHVlPzogYW55KTogdm9pZCB7XG4gICAgbGV0IHZhbHVlVG9FbWl0OiBhbnkgPSBudWxsO1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICB2YWx1ZVRvRW1pdCA9ICh0aGlzLnNlbGVjdGVkIGFzIE5vdm9PcHRpb25bXSkubWFwKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZCA/ICh0aGlzLnNlbGVjdGVkIGFzIE5vdm9PcHRpb24pLnZhbHVlIDogZmFsbGJhY2tWYWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlVG9FbWl0O1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZVRvRW1pdCk7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHZhbHVlVG9FbWl0KTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBzZWxlY3RlZDogdmFsdWVUb0VtaXQgfSk7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLl9tYWtlQ2hhbmdlRXZlbnQodmFsdWVUb0VtaXQpKTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbWFrZUNoYW5nZUV2ZW50KHZhbHVlOiBhbnkpIHtcbiAgICByZXR1cm4gbmV3IE5vdm9TZWxlY3RDaGFuZ2UodGhpcywgdmFsdWUpO1xuICB9XG5cbiAgLyoqIFNjcm9sbHMgdGhlIGFjdGl2ZSBvcHRpb24gaW50byB2aWV3LiAqL1xuICBwcm90ZWN0ZWQgX3Njcm9sbE9wdGlvbkludG9WaWV3KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPigpO1xuICAgIG9wdGlvbnMucmVzZXQodGhpcy5fZ2V0T3B0aW9ucygpKTtcbiAgICBjb25zdCBsYWJlbENvdW50ID0gX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oaW5kZXgsIG9wdGlvbnMsIHRoaXMub3B0aW9uR3JvdXBzKTtcbiAgICBjb25zdCBpdGVtSGVpZ2h0ID0gdGhpcy5fZ2V0SXRlbUhlaWdodCgpO1xuICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBfZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgICAoaW5kZXggKyBsYWJlbENvdW50KSAqIGl0ZW1IZWlnaHQsXG4gICAgICBpdGVtSGVpZ2h0LFxuICAgICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHVwIGEga2V5IG1hbmFnZXIgdG8gbGlzdGVuIHRvIGtleWJvYXJkIGV2ZW50cyBvbiB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfaW5pdEtleU1hbmFnZXIoKSB7XG4gICAgdGhpcy5fa2V5TWFuYWdlciA9IG5ldyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxOb3ZvT3B0aW9uPih0aGlzLl9nZXRPcHRpb25zKCkpLndpdGhUeXBlQWhlYWQoMjUwKS53aXRoSG9tZUFuZEVuZCgpO1xuICAgIC8vIC53aXRoQWxsb3dlZE1vZGlmaWVyS2V5cyhbJ3NoaWZ0S2V5J10pO1xuXG4gICAgdGhpcy5fa2V5TWFuYWdlci50YWJPdXQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgLy8gU2VsZWN0IHRoZSBhY3RpdmUgaXRlbSB3aGVuIHRhYmJpbmcgYXdheS4gVGhpcyBpcyBjb25zaXN0ZW50IHdpdGggaG93IHRoZSBuYXRpdmVcbiAgICAgICAgLy8gc2VsZWN0IGJlaGF2ZXMuIE5vdGUgdGhhdCB3ZSBvbmx5IHdhbnQgdG8gZG8gdGhpcyBpbiBzaW5nbGUgc2VsZWN0aW9uIG1vZGUuXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSAmJiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVzdG9yZSBmb2N1cyB0byB0aGUgdHJpZ2dlciBiZWZvcmUgY2xvc2luZy4gRW5zdXJlcyB0aGF0IHRoZSBmb2N1c1xuICAgICAgICAvLyBwb3NpdGlvbiB3b24ndCBiZSBsb3N0IGlmIHRoZSB1c2VyIGdvdCBmb2N1cyBpbnRvIHRoZSBvdmVybGF5LlxuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fa2V5TWFuYWdlci5jaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgdGhpcy5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbE9wdGlvbkludG9WaWV3KHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDApO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5wYW5lbE9wZW4gJiYgIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbS5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWdobGlnaHRzIHRoZSBzZWxlY3RlZCBpdGVtLiBJZiBubyBvcHRpb24gaXMgc2VsZWN0ZWQsIGl0IHdpbGwgaGlnaGxpZ2h0XG4gICAqIHRoZSBmaXJzdCBpdGVtIGluc3RlYWQuXG4gICAqL1xuICBwcml2YXRlIF9oaWdobGlnaHRDb3JyZWN0T3B0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9rZXlNYW5hZ2VyKSB7XG4gICAgICBpZiAodGhpcy5lbXB0eSkge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHRoaXMuX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBzZWxlY3QncyBvcHRpb25zLiAqL1xuICBwcml2YXRlIF9nZXRJdGVtSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IFtmaXJzdF0gPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgaWYgKGZpcnN0KSB7XG4gICAgICByZXR1cm4gZmlyc3QuX2dldEhvc3RFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8vIFRPRE86IERlcHJlY2F0ZSB0aGlzXG4gIHByaXZhdGUgX2luaXRMZWdhY3lPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBpdGVtLCBsYWJlbDogaXRlbSB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gKHRoaXMub3B0aW9ucyB8fCBbXSlcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGl0ZW0ucmVhZE9ubHkgfHwgaXRlbS5kaXNhYmxlZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBEZXByZWNhdGUgYWxsIGhlYWRlciBtZXRob2RzXG4gICAqL1xuICB0b2dnbGVIZWFkZXIoZXZlbnQsIGZvcmNlVmFsdWU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAvLyBSZXZlcnNlIHRoZSBhY3RpdmUgcHJvcGVydHkgKGlmIGZvcmNlVmFsdWUsIHVzZSB0aGF0KVxuICAgIHRoaXMuaGVhZGVyID0ge1xuICAgICAgb3BlbjogZm9yY2VWYWx1ZSAhPT0gdW5kZWZpbmVkID8gZm9yY2VWYWx1ZSA6ICF0aGlzLmhlYWRlci5vcGVuLFxuICAgICAgdmFsdWU6ICcnLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgaGlnaGxpZ2h0IHBpcGVcbiAgICovXG4gIGhpZ2hsaWdodChtYXRjaCwgcXVlcnkpIHtcbiAgICAvLyBSZXBsYWNlcyB0aGUgY2FwdHVyZSBzdHJpbmcgd2l0aCBhIHRoZSBzYW1lIHN0cmluZyBpbnNpZGUgb2YgYSBcInN0cm9uZ1wiIHRhZ1xuICAgIHJldHVybiBxdWVyeSA/IG1hdGNoLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLmVzY2FwZVJlZ2V4cChxdWVyeSksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPicpIDogbWF0Y2g7XG4gIH1cblxuICBlc2NhcGVSZWdleHAocXVlcnlUb0VzY2FwZSkge1xuICAgIC8vIEV4OiBpZiB0aGUgY2FwdHVyZSBpcyBcImFcIiB0aGUgcmVzdWx0IHdpbGwgYmUgXFxhXG4gICAgcmV0dXJuIHF1ZXJ5VG9Fc2NhcGUucmVwbGFjZSgvKFsuPyorXiRbXFxdXFxcXCgpe318LV0pL2csICdcXFxcJDEnKTtcbiAgfVxuXG4gIHNhdmVIZWFkZXIoKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyLnZhbHVlKSB7XG4gICAgICB0aGlzLmhlYWRlckNvbmZpZy5vblNhdmUodGhpcy5oZWFkZXIudmFsdWUpO1xuICAgICAgdGhpcy5jcmVhdGVkSXRlbSA9IHRoaXMuaGVhZGVyLnZhbHVlO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVhZGVyLnZhbGlkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqIERldGVybWluZXMgdGhlIGBhcmlhLWFjdGl2ZWRlc2NlbmRhbnRgIHRvIGJlIHNldCBvbiB0aGUgaG9zdC4gKi9cbiAgX2dldEFyaWFBY3RpdmVEZXNjZW5kYW50KCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiB0aGlzLl9rZXlNYW5hZ2VyICYmIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbS5pZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19