import * as i2 from '@angular/cdk/a11y';
import { ActiveDescendantKeyManager, A11yModule } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import * as i0 from '@angular/core';
import { EventEmitter, QueryList, Component, Optional, Self, Input, Output, ViewChild, ContentChildren, ViewChildren, HostListener, NgModule } from '@angular/core';
import * as i4 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Subscription, Subject, merge, of } from 'rxjs';
import { filter, map, takeUntil, take } from 'rxjs/operators';
import * as i1 from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import * as i3 from 'novo-elements/elements/common';
import { mixinOverlay, mixinTabIndex, mixinRequired, mixinDisabled, mixinErrorState, _countGroupLabelsBeforeOption, _getOptionScrollPosition, NOVO_OPTION_PARENT_COMPONENT, NovoOptgroup, NovoOption, NovoOverlayTemplateComponent, NovoOptionModule, NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i6 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i7 from 'novo-elements/elements/divider';
import { NovoDividerModule } from 'novo-elements/elements/divider';
import * as i8 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import * as i9 from 'novo-elements/pipes';
import { NovoPipesModule } from 'novo-elements/pipes';

// NG
// Value accessor for the component (supports ngModel)
// const SELECT_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => NovoSelectElement),
//   multi: true,
// };
/** Change event object that is emitted when the select value has changed. */
class NovoSelectChange {
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
class NovoSelectElement extends NovoSelectMixins {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoSelectElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i2.FocusMonitor }, { token: i0.NgZone }, { token: i3.ErrorStateMatcher }, { token: i4.NgControl, optional: true, self: true }, { token: i4.NgForm, optional: true }, { token: i4.FormGroupDirective, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoSelectElement, selector: "novo-select", inputs: { disabled: "disabled", required: "required", tabIndex: "tabIndex", id: "id", name: "name", options: "options", placeholder: "placeholder", readonly: "readonly", headerConfig: "headerConfig", position: "position", overlayWidth: "overlayWidth", overlayHeight: "overlayHeight", displayWith: "displayWith", compareWith: "compareWith", value: "value", multiple: "multiple" }, outputs: { onSelect: "onSelect", selectionChange: "selectionChange", valueChange: "valueChange", openedChange: "openedChange", _openedStream: "opened", _closedStream: "closed" }, host: { attributes: { "role": "combobox", "aria-autocomplete": "none", "aria-haspopup": "true" }, listeners: { "keydown": "_handleKeydown($event)" }, properties: { "attr.id": "id", "attr.aria-controls": "panelOpen ? id + \"-panel\" : null", "attr.aria-expanded": "panelOpen", "attr.aria-required": "required.toString()", "attr.aria-disabled": "disabled.toString()", "attr.aria-invalid": "errorState", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-activedescendant": "_getAriaActiveDescendant()", "class.novo-select-disabled": "disabled", "class.novo-select-invalid": "errorState", "class.novo-select-required": "required", "class.novo-select-empty": "empty", "class.novo-select-multiple": "multiple" }, classAttribute: "novo-select" }, providers: [
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
  `, isInline: true, styles: [":host{display:block;position:relative;width:100%;max-width:800px;min-width:180px;cursor:pointer}:host .novo-select-trigger{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;justify-content:space-between;align-items:center;background-color:transparent;border:none;border-bottom:1px solid #afb9c0;color:var(--text-main, #3d464d);height:2.05rem;position:relative;text-align:left;text-shadow:none;z-index:1;cursor:pointer;text-transform:none;padding:0 1rem 0 .5rem;margin-bottom:-1px;-webkit-appearance:none}:host .novo-select-trigger.text-capitalize{text-transform:capitalize}:host .novo-select-trigger.text-uppercase{text-transform:uppercase}:host .novo-select-trigger.text-nowrap{white-space:nowrap}:host .novo-select-trigger.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-select-trigger.text-size-default{font-size:inherit}:host .novo-select-trigger.text-size-body{font-size:1.3rem}:host .novo-select-trigger.text-size-xs{font-size:1rem}:host .novo-select-trigger.text-size-sm{font-size:1.2rem}:host .novo-select-trigger.text-size-md{font-size:1.3rem}:host .novo-select-trigger.text-size-lg{font-size:1.6rem}:host .novo-select-trigger.text-size-xl{font-size:2rem}:host .novo-select-trigger.text-size-2xl{font-size:2.6rem}:host .novo-select-trigger.text-size-3xl{font-size:3.2rem}:host .novo-select-trigger.text-size-smaller{font-size:.8em}:host .novo-select-trigger.text-size-larger{font-size:1.2em}:host .novo-select-trigger.text-color-black{color:#000}:host .novo-select-trigger.text-color-white{color:#fff}:host .novo-select-trigger.text-color-gray{color:#9e9e9e}:host .novo-select-trigger.text-color-grey{color:#9e9e9e}:host .novo-select-trigger.text-color-offWhite{color:#f7f7f7}:host .novo-select-trigger.text-color-bright{color:#f7f7f7}:host .novo-select-trigger.text-color-light{color:#dbdbdb}:host .novo-select-trigger.text-color-neutral{color:#4f5361}:host .novo-select-trigger.text-color-dark{color:#3d464d}:host .novo-select-trigger.text-color-orange{color:#ff6900}:host .novo-select-trigger.text-color-navigation{color:#202945}:host .novo-select-trigger.text-color-skyBlue{color:#009bdf}:host .novo-select-trigger.text-color-steel{color:#5b6770}:host .novo-select-trigger.text-color-metal{color:#637893}:host .novo-select-trigger.text-color-sand{color:#f4f4f4}:host .novo-select-trigger.text-color-silver{color:#e2e2e2}:host .novo-select-trigger.text-color-stone{color:#bebebe}:host .novo-select-trigger.text-color-ash{color:#a0a0a0}:host .novo-select-trigger.text-color-slate{color:#707070}:host .novo-select-trigger.text-color-onyx{color:#526980}:host .novo-select-trigger.text-color-charcoal{color:#282828}:host .novo-select-trigger.text-color-moonlight{color:#1a242f}:host .novo-select-trigger.text-color-midnight{color:#202945}:host .novo-select-trigger.text-color-darkness{color:#161f27}:host .novo-select-trigger.text-color-navy{color:#0d2d42}:host .novo-select-trigger.text-color-aqua{color:#3bafda}:host .novo-select-trigger.text-color-ocean{color:#4a89dc}:host .novo-select-trigger.text-color-mint{color:#37bc9b}:host .novo-select-trigger.text-color-grass{color:#8cc152}:host .novo-select-trigger.text-color-sunflower{color:#f6b042}:host .novo-select-trigger.text-color-bittersweet{color:#eb6845}:host .novo-select-trigger.text-color-grapefruit{color:#da4453}:host .novo-select-trigger.text-color-carnation{color:#d770ad}:host .novo-select-trigger.text-color-lavender{color:#967adc}:host .novo-select-trigger.text-color-mountain{color:#9678b6}:host .novo-select-trigger.text-color-info{color:#4a89dc}:host .novo-select-trigger.text-color-positive{color:#4a89dc}:host .novo-select-trigger.text-color-success{color:#8cc152}:host .novo-select-trigger.text-color-negative{color:#da4453}:host .novo-select-trigger.text-color-danger{color:#da4453}:host .novo-select-trigger.text-color-error{color:#da4453}:host .novo-select-trigger.text-color-warning{color:#f6b042}:host .novo-select-trigger.text-color-empty{color:#cccdcc}:host .novo-select-trigger.text-color-disabled{color:#bebebe}:host .novo-select-trigger.text-color-background{color:#f7f7f7}:host .novo-select-trigger.text-color-backgroundDark{color:#e2e2e2}:host .novo-select-trigger.text-color-presentation{color:#5b6770}:host .novo-select-trigger.text-color-bullhorn{color:#ff6900}:host .novo-select-trigger.text-color-pulse{color:#3bafda}:host .novo-select-trigger.text-color-company{color:#39d}:host .novo-select-trigger.text-color-candidate{color:#4b7}:host .novo-select-trigger.text-color-lead{color:#a69}:host .novo-select-trigger.text-color-contact{color:#fa4}:host .novo-select-trigger.text-color-clientcontact{color:#fa4}:host .novo-select-trigger.text-color-opportunity{color:#625}:host .novo-select-trigger.text-color-job{color:#b56}:host .novo-select-trigger.text-color-joborder{color:#b56}:host .novo-select-trigger.text-color-submission{color:#a9adbb}:host .novo-select-trigger.text-color-sendout{color:#747884}:host .novo-select-trigger.text-color-placement{color:#0b344f}:host .novo-select-trigger.text-color-note{color:#747884}:host .novo-select-trigger.text-color-contract{color:#454ea0}:host .novo-select-trigger.text-color-jobCode{color:#696d79}:host .novo-select-trigger.text-color-earnCode{color:#696d79}:host .novo-select-trigger.text-color-invoiceStatement{color:#696d79}:host .novo-select-trigger.text-color-billableCharge{color:#696d79}:host .novo-select-trigger.text-color-payableCharge{color:#696d79}:host .novo-select-trigger.text-color-user{color:#696d79}:host .novo-select-trigger.text-color-corporateUser{color:#696d79}:host .novo-select-trigger.text-color-distributionList{color:#696d79}:host .novo-select-trigger.text-color-credential{color:#696d79}:host .novo-select-trigger.text-color-person{color:#696d79}:host .novo-select-trigger.margin-before{margin-top:.4rem}:host .novo-select-trigger.margin-after{margin-bottom:.8rem}:host .novo-select-trigger.text-length-small{max-width:40ch}:host .novo-select-trigger.text-length-medium{max-width:55ch}:host .novo-select-trigger.text-length-large{max-width:70ch}:host .novo-select-trigger.text-weight-hairline{font-weight:100}:host .novo-select-trigger.text-weight-thin{font-weight:200}:host .novo-select-trigger.text-weight-light{font-weight:300}:host .novo-select-trigger.text-weight-normal{font-weight:400}:host .novo-select-trigger.text-weight-medium{font-weight:500}:host .novo-select-trigger.text-weight-semibold{font-weight:600}:host .novo-select-trigger.text-weight-bold{font-weight:700}:host .novo-select-trigger.text-weight-extrabold{font-weight:800}:host .novo-select-trigger.text-weight-heavy{font-weight:900}:host .novo-select-trigger.text-weight-lighter{font-weight:lighter}:host .novo-select-trigger.text-weight-bolder{font-weight:bolder}:host .novo-select-trigger.empty{color:#a9a9a9}:host .novo-select-trigger:focus,:host .novo-select-trigger:hover{outline:none}:host .novo-select-trigger:hover{border-bottom:1px solid #5f6d78}:host .novo-select-trigger:focus{border-bottom:1px solid #4a89dc}:host .novo-select-trigger:focus i{color:#000000ba}:host .novo-select-trigger .novo-select-placeholder{color:var(--form-placeholder)}:host .novo-select-trigger i{font-size:.8em;color:#3d464d;position:absolute;right:0}:host[disabled]{pointer-events:none}:host[disabled] div[type=button]{color:#9e9e9e}.novo-select-list{background-color:var(--background-bright);cursor:default;list-style:none;overflow:auto;margin:0;padding:0;width:100%;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;font-size:1rem;z-index:-1;opacity:0}.novo-select-list.active{z-index:1000;max-height:219px;min-width:200px;width:100%;max-width:800px;width:inherit;overflow:auto;opacity:1}.novo-select-list .select-item{height:35px}.select-header button{text-transform:uppercase}.select-header button.header{color:#4a89dc;position:relative;text-align:left;cursor:pointer;height:3rem;margin:0;padding:.5rem 1.6rem 0 0;box-sizing:border-box;border:none;display:block;align-items:center;justify-content:space-between;font-size:1rem}.select-header button.header:focus,.select-header button.header:hover{color:#4f4f4f}.select-header button.header i{color:#4a89dc;padding-right:10px}.select-header button.header span{text-align:left}.select-header div.active{width:100%;float:right;padding:5px}.select-header div.active footer{float:right}.select-header div.active button{display:inline-block;border:none;float:left;width:auto;font-weight:500;font-size:.8rem;color:#acacac}.select-header div.active button:hover{color:#868686}.select-header div.active button.primary{color:#4a89dc}.select-header div.active button.primary:hover{color:#2363b6}.select-header div.active input{display:flex;justify-content:space-between;align-items:center;background-color:transparent;border:none;border-bottom:1px solid rgba(0,0,0,.12);color:#000000ba;height:2.05rem;position:relative;text-align:left;text-shadow:none;width:100%;z-index:1;cursor:pointer;text-transform:none;padding-top:10px;font-size:1rem}.select-header div.active input.empty{color:#a9a9a9}.select-header div.active input:focus{outline:none}.select-header div.active input:hover{border-bottom:1px solid #4a89dc}.select-header div.active input.invalid{border-bottom:1px solid #da4453}\n"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "component", type: i7.NovoDividerComponent, selector: "novo-divider", inputs: ["vertical", "inset"] }, { kind: "component", type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i3.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { kind: "directive", type: i8.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { kind: "pipe", type: i9.HighlightPipe, name: "highlight" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoSelectElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-select', inputs: ['disabled', 'required', 'tabIndex'], providers: [
                        { provide: NovoFieldControl, useExisting: NovoSelectElement },
                        { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoSelectElement },
                    ], template: `
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
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
                        '[class.novo-select-disabled]': 'disabled',
                        '[class.novo-select-invalid]': 'errorState',
                        '[class.novo-select-required]': 'required',
                        '[class.novo-select-empty]': 'empty',
                        '[class.novo-select-multiple]': 'multiple',
                    }, styles: [":host{display:block;position:relative;width:100%;max-width:800px;min-width:180px;cursor:pointer}:host .novo-select-trigger{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;justify-content:space-between;align-items:center;background-color:transparent;border:none;border-bottom:1px solid #afb9c0;color:var(--text-main, #3d464d);height:2.05rem;position:relative;text-align:left;text-shadow:none;z-index:1;cursor:pointer;text-transform:none;padding:0 1rem 0 .5rem;margin-bottom:-1px;-webkit-appearance:none}:host .novo-select-trigger.text-capitalize{text-transform:capitalize}:host .novo-select-trigger.text-uppercase{text-transform:uppercase}:host .novo-select-trigger.text-nowrap{white-space:nowrap}:host .novo-select-trigger.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-select-trigger.text-size-default{font-size:inherit}:host .novo-select-trigger.text-size-body{font-size:1.3rem}:host .novo-select-trigger.text-size-xs{font-size:1rem}:host .novo-select-trigger.text-size-sm{font-size:1.2rem}:host .novo-select-trigger.text-size-md{font-size:1.3rem}:host .novo-select-trigger.text-size-lg{font-size:1.6rem}:host .novo-select-trigger.text-size-xl{font-size:2rem}:host .novo-select-trigger.text-size-2xl{font-size:2.6rem}:host .novo-select-trigger.text-size-3xl{font-size:3.2rem}:host .novo-select-trigger.text-size-smaller{font-size:.8em}:host .novo-select-trigger.text-size-larger{font-size:1.2em}:host .novo-select-trigger.text-color-black{color:#000}:host .novo-select-trigger.text-color-white{color:#fff}:host .novo-select-trigger.text-color-gray{color:#9e9e9e}:host .novo-select-trigger.text-color-grey{color:#9e9e9e}:host .novo-select-trigger.text-color-offWhite{color:#f7f7f7}:host .novo-select-trigger.text-color-bright{color:#f7f7f7}:host .novo-select-trigger.text-color-light{color:#dbdbdb}:host .novo-select-trigger.text-color-neutral{color:#4f5361}:host .novo-select-trigger.text-color-dark{color:#3d464d}:host .novo-select-trigger.text-color-orange{color:#ff6900}:host .novo-select-trigger.text-color-navigation{color:#202945}:host .novo-select-trigger.text-color-skyBlue{color:#009bdf}:host .novo-select-trigger.text-color-steel{color:#5b6770}:host .novo-select-trigger.text-color-metal{color:#637893}:host .novo-select-trigger.text-color-sand{color:#f4f4f4}:host .novo-select-trigger.text-color-silver{color:#e2e2e2}:host .novo-select-trigger.text-color-stone{color:#bebebe}:host .novo-select-trigger.text-color-ash{color:#a0a0a0}:host .novo-select-trigger.text-color-slate{color:#707070}:host .novo-select-trigger.text-color-onyx{color:#526980}:host .novo-select-trigger.text-color-charcoal{color:#282828}:host .novo-select-trigger.text-color-moonlight{color:#1a242f}:host .novo-select-trigger.text-color-midnight{color:#202945}:host .novo-select-trigger.text-color-darkness{color:#161f27}:host .novo-select-trigger.text-color-navy{color:#0d2d42}:host .novo-select-trigger.text-color-aqua{color:#3bafda}:host .novo-select-trigger.text-color-ocean{color:#4a89dc}:host .novo-select-trigger.text-color-mint{color:#37bc9b}:host .novo-select-trigger.text-color-grass{color:#8cc152}:host .novo-select-trigger.text-color-sunflower{color:#f6b042}:host .novo-select-trigger.text-color-bittersweet{color:#eb6845}:host .novo-select-trigger.text-color-grapefruit{color:#da4453}:host .novo-select-trigger.text-color-carnation{color:#d770ad}:host .novo-select-trigger.text-color-lavender{color:#967adc}:host .novo-select-trigger.text-color-mountain{color:#9678b6}:host .novo-select-trigger.text-color-info{color:#4a89dc}:host .novo-select-trigger.text-color-positive{color:#4a89dc}:host .novo-select-trigger.text-color-success{color:#8cc152}:host .novo-select-trigger.text-color-negative{color:#da4453}:host .novo-select-trigger.text-color-danger{color:#da4453}:host .novo-select-trigger.text-color-error{color:#da4453}:host .novo-select-trigger.text-color-warning{color:#f6b042}:host .novo-select-trigger.text-color-empty{color:#cccdcc}:host .novo-select-trigger.text-color-disabled{color:#bebebe}:host .novo-select-trigger.text-color-background{color:#f7f7f7}:host .novo-select-trigger.text-color-backgroundDark{color:#e2e2e2}:host .novo-select-trigger.text-color-presentation{color:#5b6770}:host .novo-select-trigger.text-color-bullhorn{color:#ff6900}:host .novo-select-trigger.text-color-pulse{color:#3bafda}:host .novo-select-trigger.text-color-company{color:#39d}:host .novo-select-trigger.text-color-candidate{color:#4b7}:host .novo-select-trigger.text-color-lead{color:#a69}:host .novo-select-trigger.text-color-contact{color:#fa4}:host .novo-select-trigger.text-color-clientcontact{color:#fa4}:host .novo-select-trigger.text-color-opportunity{color:#625}:host .novo-select-trigger.text-color-job{color:#b56}:host .novo-select-trigger.text-color-joborder{color:#b56}:host .novo-select-trigger.text-color-submission{color:#a9adbb}:host .novo-select-trigger.text-color-sendout{color:#747884}:host .novo-select-trigger.text-color-placement{color:#0b344f}:host .novo-select-trigger.text-color-note{color:#747884}:host .novo-select-trigger.text-color-contract{color:#454ea0}:host .novo-select-trigger.text-color-jobCode{color:#696d79}:host .novo-select-trigger.text-color-earnCode{color:#696d79}:host .novo-select-trigger.text-color-invoiceStatement{color:#696d79}:host .novo-select-trigger.text-color-billableCharge{color:#696d79}:host .novo-select-trigger.text-color-payableCharge{color:#696d79}:host .novo-select-trigger.text-color-user{color:#696d79}:host .novo-select-trigger.text-color-corporateUser{color:#696d79}:host .novo-select-trigger.text-color-distributionList{color:#696d79}:host .novo-select-trigger.text-color-credential{color:#696d79}:host .novo-select-trigger.text-color-person{color:#696d79}:host .novo-select-trigger.margin-before{margin-top:.4rem}:host .novo-select-trigger.margin-after{margin-bottom:.8rem}:host .novo-select-trigger.text-length-small{max-width:40ch}:host .novo-select-trigger.text-length-medium{max-width:55ch}:host .novo-select-trigger.text-length-large{max-width:70ch}:host .novo-select-trigger.text-weight-hairline{font-weight:100}:host .novo-select-trigger.text-weight-thin{font-weight:200}:host .novo-select-trigger.text-weight-light{font-weight:300}:host .novo-select-trigger.text-weight-normal{font-weight:400}:host .novo-select-trigger.text-weight-medium{font-weight:500}:host .novo-select-trigger.text-weight-semibold{font-weight:600}:host .novo-select-trigger.text-weight-bold{font-weight:700}:host .novo-select-trigger.text-weight-extrabold{font-weight:800}:host .novo-select-trigger.text-weight-heavy{font-weight:900}:host .novo-select-trigger.text-weight-lighter{font-weight:lighter}:host .novo-select-trigger.text-weight-bolder{font-weight:bolder}:host .novo-select-trigger.empty{color:#a9a9a9}:host .novo-select-trigger:focus,:host .novo-select-trigger:hover{outline:none}:host .novo-select-trigger:hover{border-bottom:1px solid #5f6d78}:host .novo-select-trigger:focus{border-bottom:1px solid #4a89dc}:host .novo-select-trigger:focus i{color:#000000ba}:host .novo-select-trigger .novo-select-placeholder{color:var(--form-placeholder)}:host .novo-select-trigger i{font-size:.8em;color:#3d464d;position:absolute;right:0}:host[disabled]{pointer-events:none}:host[disabled] div[type=button]{color:#9e9e9e}.novo-select-list{background-color:var(--background-bright);cursor:default;list-style:none;overflow:auto;margin:0;padding:0;width:100%;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;font-size:1rem;z-index:-1;opacity:0}.novo-select-list.active{z-index:1000;max-height:219px;min-width:200px;width:100%;max-width:800px;width:inherit;overflow:auto;opacity:1}.novo-select-list .select-item{height:35px}.select-header button{text-transform:uppercase}.select-header button.header{color:#4a89dc;position:relative;text-align:left;cursor:pointer;height:3rem;margin:0;padding:.5rem 1.6rem 0 0;box-sizing:border-box;border:none;display:block;align-items:center;justify-content:space-between;font-size:1rem}.select-header button.header:focus,.select-header button.header:hover{color:#4f4f4f}.select-header button.header i{color:#4a89dc;padding-right:10px}.select-header button.header span{text-align:left}.select-header div.active{width:100%;float:right;padding:5px}.select-header div.active footer{float:right}.select-header div.active button{display:inline-block;border:none;float:left;width:auto;font-weight:500;font-size:.8rem;color:#acacac}.select-header div.active button:hover{color:#868686}.select-header div.active button.primary{color:#4a89dc}.select-header div.active button.primary:hover{color:#2363b6}.select-header div.active input{display:flex;justify-content:space-between;align-items:center;background-color:transparent;border:none;border-bottom:1px solid rgba(0,0,0,.12);color:#000000ba;height:2.05rem;position:relative;text-align:left;text-shadow:none;width:100%;z-index:1;cursor:pointer;text-transform:none;padding-top:10px;font-size:1rem}.select-header div.active input.empty{color:#a9a9a9}.select-header div.active input:focus{outline:none}.select-header div.active input:hover{border-bottom:1px solid #4a89dc}.select-header div.active input.invalid{border-bottom:1px solid #da4453}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i2.FocusMonitor }, { type: i0.NgZone }, { type: i3.ErrorStateMatcher }, { type: i4.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i4.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i4.FormGroupDirective, decorators: [{
                    type: Optional
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

// NG
class NovoSelectModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.3", ngImport: i0, type: NovoSelectModule, declarations: [NovoSelectElement], imports: [A11yModule,
            CommonModule,
            FormsModule,
            NovoButtonModule,
            NovoDividerModule,
            NovoOptionModule,
            NovoOverlayModule,
            NovoPipesModule,
            NovoTooltipModule], exports: [NovoSelectElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoSelectModule, imports: [A11yModule,
            CommonModule,
            FormsModule,
            NovoButtonModule,
            NovoDividerModule,
            NovoOptionModule,
            NovoOverlayModule,
            NovoPipesModule,
            NovoTooltipModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        A11yModule,
                        CommonModule,
                        FormsModule,
                        NovoButtonModule,
                        NovoDividerModule,
                        NovoOptionModule,
                        NovoOverlayModule,
                        NovoPipesModule,
                        NovoTooltipModule,
                    ],
                    declarations: [NovoSelectElement],
                    exports: [NovoSelectElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoSelectChange, NovoSelectElement, NovoSelectModule };
//# sourceMappingURL=novo-elements-elements-select.mjs.map