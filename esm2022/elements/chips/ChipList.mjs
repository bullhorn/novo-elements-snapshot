import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Self, ViewEncapsulation, } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { ErrorStateMatcher, mixinErrorState, NOVO_OPTION_PARENT_COMPONENT } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import { NovoChipElement } from './Chip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@angular/forms";
import * as i3 from "novo-elements/elements/common";
// Boilerplate for applying mixins to NovoChipList.
/** @docs-private */
class NovoChipListBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, 
    /** @docs-private */
    ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const _NovoChipListMixinBase = mixinErrorState(NovoChipListBase);
// Increasing integer for generating unique ids for chip-list components.
let nextUniqueId = 0;
/** Change event object that is emitted when the chip list value has changed. */
export class NovoChipListChange {
    constructor(
    /** Chip list that emitted the event. */
    source, 
    /** Value of the chip list when the event was emitted. */
    value) {
        this.source = source;
        this.value = value;
    }
}
/**
 * A chip list component (named ChipList for its similarity to the List component).
 */
export class NovoChipList extends _NovoChipListMixinBase {
    /** The array of selected chips inside chip list. */
    get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }
    /** The ARIA role applied to the chip list. */
    get role() {
        return this.empty ? null : 'listbox';
    }
    /** Whether the user should be allowed to select multiple chips. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /** Whether the chips should appear stacked instead of a row. */
    get stacked() {
        return this._stacked;
    }
    set stacked(value) {
        this._stacked = coerceBooleanProperty(value);
    }
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    get compareWith() {
        return this._compareWith;
    }
    set compareWith(fn) {
        this._compareWith = fn;
        if (this._selectionModel) {
            // A different comparator means the selection could change.
            this._initializeSelection();
        }
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.writeValue(value);
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get id() {
        return this._chipInput ? this._chipInput.id : this._uid;
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get placeholder() {
        return this._chipInput ? this._chipInput.placeholder : this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    /** Whether any chips or the novoChipInput inside of this chip-list has focus. */
    get focused() {
        return (this._chipInput && this._chipInput.focused) || this._hasFocusedChip();
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get empty() {
        return (!this._chipInput || this._chipInput.empty) && (!this.chips || this.chips.length === 0);
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get shouldLabelFloat() {
        return !this.empty || this.focused;
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /**
     * Whether or not this chip list is selectable. When a chip list is not selectable,
     * the selected states for all the chips inside the chip list are always ignored.
     */
    get selectable() {
        return this._selectable;
    }
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
        if (this.chips) {
            this.chips.forEach((chip) => (chip._chipListSelectable = this._selectable));
        }
    }
    set tabIndex(value) {
        this._userTabIndex = value;
        this._tabIndex = value;
    }
    /** Combined stream of all of the child chips' selection change events. */
    get chipSelectionChanges() {
        return merge(...this.chips.map((chip) => chip.selectionChange));
    }
    /** Combined stream of all of the child chips' focus change events. */
    get chipFocusChanges() {
        return merge(...this.chips.map((chip) => chip._onFocus));
    }
    /** Combined stream of all of the child chips' blur change events. */
    get chipBlurChanges() {
        return merge(...this.chips.map((chip) => chip._onBlur));
    }
    /** Combined stream of all of the child chips' remove change events. */
    get chipRemoveChanges() {
        return merge(...this.chips.map((chip) => chip.removed));
    }
    constructor(_elementRef, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, 
    /** @docs-private */
    ngControl) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this.ngControl = ngControl;
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.controlType = 'chip-list';
        /**
         * When a chip is destroyed, we store the index of the destroyed chip until the chips
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate chip that should receive focus until the array of chips updated completely.
         */
        this._lastDestroyedChipIndex = null;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new Subject();
        /** Uid of the chip list */
        this._uid = `novo-chip-list-${nextUniqueId++}`;
        /** Tab index for the chip list. */
        this._tabIndex = 0;
        /**
         * User defined tab index.
         * When it is not null, use user defined tab index. Otherwise use _tabIndex
         */
        this._userTabIndex = null;
        /** Function when touched */
        this._onTouched = () => { };
        /** Function when changed */
        this._onChange = () => { };
        this._multiple = false;
        this._stacked = false;
        this._compareWith = (o1, o2) => o1 === o2;
        this._required = false;
        this._disabled = false;
        /** Orientation of the chip list. */
        this.ariaOrientation = 'horizontal';
        this._selectable = true;
        /** Event emitted when the selected chip list value has been changed by the user. */
        this.change = new EventEmitter();
        /**
         * Event that emits whenever the raw value of the chip-list changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        this.valueChange = new EventEmitter();
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    ngAfterContentInit() {
        this._keyManager = new FocusKeyManager(this.chips)
            .withWrap()
            .withVerticalOrientation()
            .withHomeAndEnd()
            .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr');
        if (this._dir) {
            this._dir.change.pipe(takeUntil(this._destroyed)).subscribe((dir) => this._keyManager.withHorizontalOrientation(dir));
        }
        this._keyManager.tabOut.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._allowFocusEscape();
        });
        // When the list changes, re-subscribe
        this.chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            if (this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then(() => {
                    this._syncChipsState();
                });
            }
            this._resetChips();
            // Check to see if we need to update our tab index
            this._updateTabIndex();
            // Check to see if we have a destroyed chip and need to refocus
            this._updateFocusForDestroyedChips();
            this.stateChanges.next();
        });
    }
    ngAfterViewInit() {
        // Reset chips selected/deselected status
        this._initializeSelection();
    }
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple, undefined, false);
        this.stateChanges.next();
    }
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
            if (this.ngControl.disabled !== this._disabled) {
                this.disabled = !!this.ngControl.disabled;
            }
        }
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this.stateChanges.complete();
        this._dropSubscriptions();
    }
    /** Associates an HTML input element with this chip list. */
    registerInput(inputElement) {
        this._chipInput = inputElement;
        // We use this attribute to match the chip list to its input in test harnesses.
        // Set the attribute directly here to avoid "changed after checked" errors.
        this._elementRef.nativeElement.setAttribute('data-novo-chip-input', inputElement.id);
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        if (this.chips) {
            this._setSelectionByValue(value, false);
            this.stateChanges.next();
        }
    }
    addValue(value) {
        this.value = [...this.value, value];
        this._chipInput.clearValue();
    }
    removeValue(value) {
        if (this.value && Array.isArray(this.value)) {
            this.value = this.value.filter((it) => !this.compareWith(it, value));
        }
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this._onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    onContainerClick(event) {
        if (!this._originatesFromChip(event)) {
            this.focus();
        }
    }
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options) {
        if (this.disabled) {
            return;
        }
        // TODO: ARIA says this should focus the first `selected` chip if any are selected.
        // Focus on first element if there's no chipInput inside chip-list
        if (this._chipInput && this._chipInput.focused) {
            // do nothing
        }
        else if (this._chipInput) {
            Promise.resolve().then(() => this._focusInput(options));
            this.stateChanges.next();
        }
        else if (this.chips.length > 0) {
            this._keyManager.setFirstItemActive();
            this.stateChanges.next();
        }
    }
    /** Attempt to focus an input if we have one. */
    _focusInput(options) {
        if (this._chipInput) {
            this._chipInput.focus(options);
        }
    }
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    _keydown(event) {
        const target = event.target;
        // If they are on an empty input and hit backspace, focus the last chip
        if (event.key === "Backspace" /* Key.Backspace */ && this._isInputEmpty(target)) {
            this._keyManager.setLastItemActive();
            event.preventDefault();
        }
        else if (target && target.classList.contains('novo-chip')) {
            this._keyManager.onKeydown(event);
            this.stateChanges.next();
        }
    }
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    _updateTabIndex() {
        // If we have 0 chips, we should not allow keyboard focus
        this._tabIndex = this._userTabIndex || (this.chips.length === 0 ? -1 : 0);
    }
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     */
    _updateFocusForDestroyedChips() {
        // Move focus to the closest chip. If no other chips remain, focus the chip-list itself.
        if (this._lastDestroyedChipIndex != null) {
            if (this.chips.length) {
                const newChipIndex = Math.min(this._lastDestroyedChipIndex, this.chips.length - 1);
                this._keyManager.setActiveItem(newChipIndex);
            }
            else {
                this.focus();
            }
        }
        this._lastDestroyedChipIndex = null;
    }
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this.chips.length;
    }
    _isInputEmpty(element) {
        if (element && element.nodeName.toLowerCase() === 'input') {
            let input = element;
            return !input.value;
        }
        return false;
    }
    _setSelectionByValue(value, isUserInput = true) {
        this._clearSelection();
        this.chips.forEach((chip) => chip.deselect());
        if (Array.isArray(value)) {
            value.forEach((currentValue) => this._selectValue(currentValue, isUserInput));
            this._sortValues();
        }
        else {
            const correspondingChip = this._selectValue(value, isUserInput);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what chip the user interacted with last.
            if (correspondingChip) {
                if (isUserInput) {
                    this._keyManager.setActiveItem(correspondingChip);
                }
            }
        }
    }
    /**
     * Finds and selects the chip based on its value.
     * @returns Chip that has the corresponding value.
     */
    _selectValue(value, isUserInput = true) {
        const correspondingChip = this.chips.find((chip) => {
            return chip.value != null && this._compareWith(chip.value, value);
        });
        if (correspondingChip) {
            isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
            this._selectionModel.select(correspondingChip);
        }
        return correspondingChip;
    }
    _initializeSelection() {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(() => {
            if (this.ngControl) {
                this.value = this.ngControl.value;
            }
        });
    }
    /**
     * Deselects every chip in the list.
     * @param skip Chip that should not be deselected.
     */
    _clearSelection(skip) {
        this._selectionModel.clear();
        this.chips.forEach((chip) => {
            if (chip !== skip) {
                chip.deselect();
            }
        });
        this.stateChanges.next();
    }
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    _sortValues() {
        if (this._multiple) {
            this._selectionModel.clear();
            this.chips.forEach((chip) => {
                if (chip.selected) {
                    this._selectionModel.select(chip);
                }
            });
            this.stateChanges.next();
        }
    }
    /** Emits change event to set the model value. */
    _propagateChanges(fallbackValue) {
        let valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map((chip) => chip.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.change.emit(new NovoChipListChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this._changeDetectorRef.markForCheck();
    }
    /** When blurred, mark the field as touched when focus moved outside the chip list. */
    _blur() {
        if (!this._hasFocusedChip()) {
            this._keyManager.setActiveItem(-1);
        }
        if (!this.disabled) {
            if (this._chipInput) {
                // If there's a chip input, we should check whether the focus moved to chip input.
                // If the focus is not moved to chip input, mark the field as touched. If the focus moved
                // to chip input, do nothing.
                // Timeout is needed to wait for the focus() event trigger on chip input.
                setTimeout(() => {
                    if (!this.focused) {
                        this._markAsTouched();
                    }
                });
            }
            else {
                // If there's no chip input, then mark the field as touched.
                this._markAsTouched();
            }
        }
    }
    /** Mark the field as touched */
    _markAsTouched() {
        this._onTouched();
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    }
    /**
     * Removes the `tabindex` from the chip list and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the list from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    _allowFocusEscape() {
        if (this._tabIndex !== -1) {
            this._tabIndex = -1;
            setTimeout(() => {
                this._tabIndex = this._userTabIndex || 0;
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    _resetChips() {
        this._dropSubscriptions();
        this._listenToChipsFocus();
        this._listenToChipsSelection();
        this._listenToChipsRemoved();
    }
    _dropSubscriptions() {
        if (this._chipFocusSubscription) {
            this._chipFocusSubscription.unsubscribe();
            this._chipFocusSubscription = null;
        }
        if (this._chipBlurSubscription) {
            this._chipBlurSubscription.unsubscribe();
            this._chipBlurSubscription = null;
        }
        if (this._chipSelectionSubscription) {
            this._chipSelectionSubscription.unsubscribe();
            this._chipSelectionSubscription = null;
        }
        if (this._chipRemoveSubscription) {
            this._chipRemoveSubscription.unsubscribe();
            this._chipRemoveSubscription = null;
        }
    }
    /** Listens to user-generated selection events on each chip. */
    _listenToChipsSelection() {
        this._chipSelectionSubscription = this.chipSelectionChanges.subscribe((event) => {
            event.source.selected ? this._selectionModel.select(event.source) : this._selectionModel.deselect(event.source);
            // For single selection chip list, make sure the deselected value is unselected.
            if (!this.multiple) {
                this.chips.forEach((chip) => {
                    if (!this._selectionModel.isSelected(chip) && chip.selected) {
                        chip.deselect();
                    }
                });
            }
            if (event.isUserInput) {
                this._propagateChanges();
            }
        });
    }
    /** Listens to user-generated selection events on each chip. */
    _listenToChipsFocus() {
        this._chipFocusSubscription = this.chipFocusChanges.subscribe((event) => {
            let chipIndex = this.chips.toArray().indexOf(event.chip);
            if (this._isValidIndex(chipIndex)) {
                this._keyManager.updateActiveItem(chipIndex);
            }
            this.stateChanges.next();
        });
        this._chipBlurSubscription = this.chipBlurChanges.subscribe(() => {
            this._blur();
            this.stateChanges.next();
        });
    }
    _listenToChipsRemoved() {
        this._chipRemoveSubscription = this.chipRemoveChanges.subscribe((event) => {
            const chip = event.chip;
            const chipIndex = this.chips.toArray().indexOf(event.chip);
            this.removeValue(chip.value);
            // In case the chip that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling chip that will
            // receive focus.
            if (this._isValidIndex(chipIndex) && chip._hasFocus) {
                this._lastDestroyedChipIndex = chipIndex;
            }
            this.stateChanges.next();
        });
    }
    /** Checks whether an event comes from inside a chip element. */
    _originatesFromChip(event) {
        let currentElement = event.target;
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            if (currentElement.classList.contains('novo-chip')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }
    /** Checks whether any of the chips is focused. */
    _hasFocusedChip() {
        return this.chips && this.chips.some((chip) => chip._hasFocus);
    }
    /** Syncs the list's state with the individual chips. */
    _syncChipsState() {
        if (this.chips) {
            this.chips.forEach((chip) => {
                chip._chipListDisabled = this._disabled;
                chip._chipListMultiple = this.multiple;
                chip._chipListSelectable = this.selectable;
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoChipList, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i3.ErrorStateMatcher }, { token: i2.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoChipList, selector: "novo-chip-list", inputs: { errorStateMatcher: "errorStateMatcher", multiple: "multiple", stacked: "stacked", compareWith: "compareWith", value: "value", required: "required", placeholder: "placeholder", disabled: "disabled", ariaOrientation: ["aria-orientation", "ariaOrientation"], selectable: "selectable", tabIndex: "tabIndex" }, outputs: { change: "change", valueChange: "valueChange" }, host: { listeners: { "focus": "focus()", "blur": "_blur()", "keydown": "_keydown($event)" }, properties: { "attr.tabindex": "disabled ? null : _tabIndex", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-required": "role ? required : null", "attr.aria-disabled": "disabled.toString()", "attr.aria-invalid": "errorState", "attr.aria-multiselectable": "multiple", "attr.role": "role", "class.novo-chip-list-empty": "empty", "class.novo-chip-list-has-value": "!empty", "class.novo-chip-list-stacked": "stacked", "class.novo-chip-list-focused": "focused", "class.novo-chip-list-disabled": "disabled", "class.novo-chip-list-invalid": "errorState", "class.novo-chip-list-required": "required", "attr.aria-orientation": "ariaOrientation", "id": "_uid" }, classAttribute: "novo-chip-list" }, providers: [
            { provide: NovoFieldControl, useExisting: NovoChipList },
            { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoChipList },
        ], queries: [{ propertyName: "chips", predicate: NovoChipElement, descendants: true }], exportAs: ["novoChipList"], usesInheritance: true, ngImport: i0, template: `<div class="novo-chip-list-wrapper"><ng-content></ng-content></div>`, isInline: true, styles: [".novo-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.novo-chip-list-wrapper input.novo-input-element,.novo-chip-list-wrapper .novo-chip{margin:4px}.novo-chip-list-stacked{flex:1}.novo-chip-list-stacked .novo-chip-list-wrapper{flex-direction:column;align-items:flex-start}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip{width:100%;height:2.8rem}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-remove,.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-trailing-icon{margin-left:auto}.novo-chip-list-stacked .novo-chip-list-wrapper input.novo-chip-input{flex:1 0 auto}novo-field.novo-focused input.novo-chip-input{opacity:1;width:100px;margin:4px;flex:1 0 100px}novo-field:not(.novo-focused) .novo-field-input .novo-chip-list-has-value{margin-right:2rem}novo-field:not(.novo-focused) .novo-field-input .novo-chip-list-has-value input.novo-chip-input{opacity:0;width:0px!important;max-width:0px!important}input.novo-chip-input{width:20px;margin:4px;flex:1 0 20px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoChipList, decorators: [{
            type: Component,
            args: [{ selector: 'novo-chip-list', template: `<div class="novo-chip-list-wrapper"><ng-content></ng-content></div>`, exportAs: 'novoChipList', host: {
                        '[attr.tabindex]': 'disabled ? null : _tabIndex',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-required]': 'role ? required : null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-multiselectable]': 'multiple',
                        '[attr.role]': 'role',
                        '[class.novo-chip-list-empty]': 'empty',
                        '[class.novo-chip-list-has-value]': '!empty',
                        '[class.novo-chip-list-stacked]': 'stacked',
                        '[class.novo-chip-list-focused]': 'focused',
                        '[class.novo-chip-list-disabled]': 'disabled',
                        '[class.novo-chip-list-invalid]': 'errorState',
                        '[class.novo-chip-list-required]': 'required',
                        '[attr.aria-orientation]': 'ariaOrientation',
                        class: 'novo-chip-list',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                        '(keydown)': '_keydown($event)',
                        '[id]': '_uid',
                    }, providers: [
                        { provide: NovoFieldControl, useExisting: NovoChipList },
                        { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoChipList },
                    ], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".novo-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.novo-chip-list-wrapper input.novo-input-element,.novo-chip-list-wrapper .novo-chip{margin:4px}.novo-chip-list-stacked{flex:1}.novo-chip-list-stacked .novo-chip-list-wrapper{flex-direction:column;align-items:flex-start}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip{width:100%;height:2.8rem}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-remove,.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-trailing-icon{margin-left:auto}.novo-chip-list-stacked .novo-chip-list-wrapper input.novo-chip-input{flex:1 0 auto}novo-field.novo-focused input.novo-chip-input{opacity:1;width:100px;margin:4px;flex:1 0 100px}novo-field:not(.novo-focused) .novo-field-input .novo-chip-list-has-value{margin-right:2rem}novo-field:not(.novo-focused) .novo-field-input .novo-chip-list-has-value input.novo-chip-input{opacity:0;width:0px!important;max-width:0px!important}input.novo-chip-input{width:20px;margin:4px;flex:1 0 20px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i2.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i3.ErrorStateMatcher }, { type: i2.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { errorStateMatcher: [{
                type: Input
            }], multiple: [{
                type: Input
            }], stacked: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], value: [{
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], ariaOrientation: [{
                type: Input,
                args: ['aria-orientation']
            }], selectable: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], change: [{
                type: Output
            }], valueChange: [{
                type: Output
            }], chips: [{
                type: ContentChildren,
                args: [NovoChipElement, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGlwcy9DaGlwTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFFZixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxJQUFJLEVBQ0osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0Isa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBZ0QsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0osT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBMEMsTUFBTSxRQUFRLENBQUM7Ozs7O0FBR2pGLG1EQUFtRDtBQUNuRCxvQkFBb0I7QUFDcEIsTUFBTSxnQkFBZ0I7SUFDcEIsWUFDUyx5QkFBNEMsRUFDNUMsV0FBbUIsRUFDbkIs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OzswQkFDUixRQUFROzswQkFHUixRQUFROzswQkFBSSxJQUFJOzRDQTNNVixpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBSUYsUUFBUTtzQkFEWCxLQUFLO2dCQVlGLE9BQU87c0JBRFYsS0FBSztnQkFlRixXQUFXO3NCQURkLEtBQUs7Z0JBa0JGLEtBQUs7c0JBRFIsS0FBSztnQkF1QkYsUUFBUTtzQkFEWCxLQUFLO2dCQWVGLFdBQVc7c0JBRGQsS0FBSztnQkFvQ0YsUUFBUTtzQkFEWCxLQUFLO2dCQVdxQixlQUFlO3NCQUF6QyxLQUFLO3VCQUFDLGtCQUFrQjtnQkFPckIsVUFBVTtzQkFEYixLQUFLO2dCQWNGLFFBQVE7c0JBRFgsS0FBSztnQkEyQmEsTUFBTTtzQkFBeEIsTUFBTTtnQkFPWSxXQUFXO3NCQUE3QixNQUFNO2dCQVFQLEtBQUs7c0JBTEosZUFBZTt1QkFBQyxlQUFlLEVBQUU7d0JBQ2hDLHVFQUF1RTt3QkFDdkUsOENBQThDO3dCQUM5QyxXQUFXLEVBQUUsSUFBSTtxQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNlbGYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nQ29udHJvbCwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IENhblVwZGF0ZUVycm9yU3RhdGUsIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLCBFcnJvclN0YXRlTWF0Y2hlciwgbWl4aW5FcnJvclN0YXRlLCBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ZpZWxkQ29udHJvbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmllbGQnO1xuaW1wb3J0IHsgTm92b0NoaXBFbGVtZW50LCBOb3ZvQ2hpcEV2ZW50LCBOb3ZvQ2hpcFNlbGVjdGlvbkNoYW5nZSB9IGZyb20gJy4vQ2hpcCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcFRleHRDb250cm9sIH0gZnJvbSAnLi9DaGlwVGV4dENvbnRyb2wnO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE5vdm9DaGlwTGlzdC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jbGFzcyBOb3ZvQ2hpcExpc3RCYXNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIHB1YmxpYyBfcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgIHB1YmxpYyBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICkge31cbn1cbmNvbnN0IF9Ob3ZvQ2hpcExpc3RNaXhpbkJhc2U6IENhblVwZGF0ZUVycm9yU3RhdGVDdG9yICYgdHlwZW9mIE5vdm9DaGlwTGlzdEJhc2UgPSBtaXhpbkVycm9yU3RhdGUoTm92b0NoaXBMaXN0QmFzZSk7XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzIGZvciBjaGlwLWxpc3QgY29tcG9uZW50cy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgY2hpcCBsaXN0IHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGNsYXNzIE5vdm9DaGlwTGlzdENoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBDaGlwIGxpc3QgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBOb3ZvQ2hpcExpc3QsXG4gICAgLyoqIFZhbHVlIG9mIHRoZSBjaGlwIGxpc3Qgd2hlbiB0aGUgZXZlbnQgd2FzIGVtaXR0ZWQuICovXG4gICAgcHVibGljIHZhbHVlOiBhbnksXG4gICkge31cbn1cblxuLyoqXG4gKiBBIGNoaXAgbGlzdCBjb21wb25lbnQgKG5hbWVkIENoaXBMaXN0IGZvciBpdHMgc2ltaWxhcml0eSB0byB0aGUgTGlzdCBjb21wb25lbnQpLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNoaXAtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5vdm8tY2hpcC1saXN0LXdyYXBwZXJcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+YCxcbiAgc3R5bGVVcmxzOiBbJy4vQ2hpcExpc3Quc2NzcyddLFxuICBleHBvcnRBczogJ25vdm9DaGlwTGlzdCcsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IF90YWJJbmRleCcsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ19hcmlhRGVzY3JpYmVkYnkgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JvbGUgPyByZXF1aXJlZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcbiAgICAnW2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGVdJzogJ211bHRpcGxlJyxcbiAgICAnW2F0dHIucm9sZV0nOiAncm9sZScsXG4gICAgJ1tjbGFzcy5ub3ZvLWNoaXAtbGlzdC1lbXB0eV0nOiAnZW1wdHknLFxuICAgICdbY2xhc3Mubm92by1jaGlwLWxpc3QtaGFzLXZhbHVlXSc6ICchZW1wdHknLFxuICAgICdbY2xhc3Mubm92by1jaGlwLWxpc3Qtc3RhY2tlZF0nOiAnc3RhY2tlZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLWNoaXAtbGlzdC1mb2N1c2VkXSc6ICdmb2N1c2VkJyxcbiAgICAnW2NsYXNzLm5vdm8tY2hpcC1saXN0LWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLWNoaXAtbGlzdC1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcbiAgICAnW2NsYXNzLm5vdm8tY2hpcC1saXN0LXJlcXVpcmVkXSc6ICdyZXF1aXJlZCcsXG4gICAgJ1thdHRyLmFyaWEtb3JpZW50YXRpb25dJzogJ2FyaWFPcmllbnRhdGlvbicsXG4gICAgY2xhc3M6ICdub3ZvLWNoaXAtbGlzdCcsXG4gICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgJyhibHVyKSc6ICdfYmx1cigpJyxcbiAgICAnKGtleWRvd24pJzogJ19rZXlkb3duKCRldmVudCknLFxuICAgICdbaWRdJzogJ191aWQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5vdm9GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBOb3ZvQ2hpcExpc3QgfSxcbiAgICB7IHByb3ZpZGU6IE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBOb3ZvQ2hpcExpc3QgfSxcbiAgXSxcbiAgLy8gc3R5bGVVcmxzOiBbJy4vQ2hpcExpc3Quc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NoaXBMaXN0XG4gIGV4dGVuZHMgX05vdm9DaGlwTGlzdE1peGluQmFzZVxuICBpbXBsZW1lbnRzIE5vdm9GaWVsZENvbnRyb2w8YW55PiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIERvQ2hlY2ssIE9uSW5pdCwgT25EZXN0cm95LCBDYW5VcGRhdGVFcnJvclN0YXRlXG57XG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHJlYWRvbmx5IGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAnY2hpcC1saXN0JztcblxuICAvKipcbiAgICogV2hlbiBhIGNoaXAgaXMgZGVzdHJveWVkLCB3ZSBzdG9yZSB0aGUgaW5kZXggb2YgdGhlIGRlc3Ryb3llZCBjaGlwIHVudGlsIHRoZSBjaGlwc1xuICAgKiBxdWVyeSBsaXN0IG5vdGlmaWVzIGFib3V0IHRoZSB1cGRhdGUuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugd2UgY2Fubm90IGRldGVybWluZSBhblxuICAgKiBhcHByb3ByaWF0ZSBjaGlwIHRoYXQgc2hvdWxkIHJlY2VpdmUgZm9jdXMgdW50aWwgdGhlIGFycmF5IG9mIGNoaXBzIHVwZGF0ZWQgY29tcGxldGVseS5cbiAgICovXG4gIHByaXZhdGUgX2xhc3REZXN0cm95ZWRDaGlwSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGZvY3VzIGNoYW5nZXMgaW4gdGhlIGNoaXBzLiAqL1xuICBwcml2YXRlIF9jaGlwRm9jdXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBibHVyIGNoYW5nZXMgaW4gdGhlIGNoaXBzLiAqL1xuICBwcml2YXRlIF9jaGlwQmx1clN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIHNlbGVjdGlvbiBjaGFuZ2VzIGluIGNoaXBzLiAqL1xuICBwcml2YXRlIF9jaGlwU2VsZWN0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gcmVtb3ZlIGNoYW5nZXMgaW4gY2hpcHMuICovXG4gIHByaXZhdGUgX2NoaXBSZW1vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgLyoqIFRoZSBjaGlwIGlucHV0IHRvIGFkZCBtb3JlIGNoaXBzICovXG4gIHByb3RlY3RlZCBfY2hpcElucHV0OiBOb3ZvQ2hpcFRleHRDb250cm9sO1xuXG4gIC8qKiBVaWQgb2YgdGhlIGNoaXAgbGlzdCAqL1xuICBfdWlkOiBzdHJpbmcgPSBgbm92by1jaGlwLWxpc3QtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIC8qKiBUaGUgYXJpYS1kZXNjcmliZWRieSBhdHRyaWJ1dGUgb24gdGhlIGNoaXAgbGlzdCBmb3IgaW1wcm92ZWQgYTExeS4gKi9cbiAgX2FyaWFEZXNjcmliZWRieTogc3RyaW5nO1xuXG4gIC8qKiBUYWIgaW5kZXggZm9yIHRoZSBjaGlwIGxpc3QuICovXG4gIF90YWJJbmRleCA9IDA7XG5cbiAgLyoqXG4gICAqIFVzZXIgZGVmaW5lZCB0YWIgaW5kZXguXG4gICAqIFdoZW4gaXQgaXMgbm90IG51bGwsIHVzZSB1c2VyIGRlZmluZWQgdGFiIGluZGV4LiBPdGhlcndpc2UgdXNlIF90YWJJbmRleFxuICAgKi9cbiAgX3VzZXJUYWJJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSBGb2N1c0tleU1hbmFnZXIgd2hpY2ggaGFuZGxlcyBmb2N1cy4gKi9cbiAgX2tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxOb3ZvQ2hpcEVsZW1lbnQ+O1xuXG4gIC8qKiBGdW5jdGlvbiB3aGVuIHRvdWNoZWQgKi9cbiAgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBGdW5jdGlvbiB3aGVuIGNoYW5nZWQgKi9cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIF9zZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8Tm92b0NoaXBFbGVtZW50PjtcblxuICAvKiogVGhlIGFycmF5IG9mIHNlbGVjdGVkIGNoaXBzIGluc2lkZSBjaGlwIGxpc3QuICovXG4gIGdldCBzZWxlY3RlZCgpOiBOb3ZvQ2hpcEVsZW1lbnRbXSB8IE5vdm9DaGlwRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZCA6IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdO1xuICB9XG5cbiAgLyoqIFRoZSBBUklBIHJvbGUgYXBwbGllZCB0byB0aGUgY2hpcCBsaXN0LiAqL1xuICBnZXQgcm9sZSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5lbXB0eSA/IG51bGwgOiAnbGlzdGJveCc7XG4gIH1cblxuICAvKiogQW4gb2JqZWN0IHVzZWQgdG8gY29udHJvbCB3aGVuIGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi4gKi9cbiAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB1c2VyIHNob3VsZCBiZSBhbGxvd2VkIHRvIHNlbGVjdCBtdWx0aXBsZSBjaGlwcy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fc3luY0NoaXBzU3RhdGUoKTtcbiAgfVxuICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwcyBzaG91bGQgYXBwZWFyIHN0YWNrZWQgaW5zdGVhZCBvZiBhIHJvdy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHN0YWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWNrZWQ7XG4gIH1cbiAgc2V0IHN0YWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zdGFja2VkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9zdGFja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gY29tcGFyZSB0aGUgb3B0aW9uIHZhbHVlcyB3aXRoIHRoZSBzZWxlY3RlZCB2YWx1ZXMuIFRoZSBmaXJzdCBhcmd1bWVudFxuICAgKiBpcyBhIHZhbHVlIGZyb20gYW4gb3B0aW9uLiBUaGUgc2Vjb25kIGlzIGEgdmFsdWUgZnJvbSB0aGUgc2VsZWN0aW9uLiBBIGJvb2xlYW5cbiAgICogc2hvdWxkIGJlIHJldHVybmVkLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGNvbXBhcmVXaXRoKCk6IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGFyZVdpdGg7XG4gIH1cbiAgc2V0IGNvbXBhcmVXaXRoKGZuOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbikge1xuICAgIHRoaXMuX2NvbXBhcmVXaXRoID0gZm47XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAvLyBBIGRpZmZlcmVudCBjb21wYXJhdG9yIG1lYW5zIHRoZSBzZWxlY3Rpb24gY291bGQgY2hhbmdlLlxuICAgICAgdGhpcy5faW5pdGlhbGl6ZVNlbGVjdGlvbigpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9jb21wYXJlV2l0aCA9IChvMTogYW55LCBvMjogYW55KSA9PiBvMSA9PT0gbzI7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLndyaXRlVmFsdWUodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfdmFsdWU6IGFueTtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpcElucHV0ID8gdGhpcy5fY2hpcElucHV0LmlkIDogdGhpcy5fdWlkO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgfVxuICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpcElucHV0ID8gdGhpcy5fY2hpcElucHV0LnBsYWNlaG9sZGVyIDogdGhpcy5fcGxhY2Vob2xkZXI7XG4gIH1cbiAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3BsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgYW55IGNoaXBzIG9yIHRoZSBub3ZvQ2hpcElucHV0IGluc2lkZSBvZiB0aGlzIGNoaXAtbGlzdCBoYXMgZm9jdXMuICovXG4gIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5fY2hpcElucHV0ICYmIHRoaXMuX2NoaXBJbnB1dC5mb2N1c2VkKSB8fCB0aGlzLl9oYXNGb2N1c2VkQ2hpcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoIXRoaXMuX2NoaXBJbnB1dCB8fCB0aGlzLl9jaGlwSW5wdXQuZW1wdHkpICYmICghdGhpcy5jaGlwcyB8fCB0aGlzLmNoaXBzLmxlbmd0aCA9PT0gMCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgc2hvdWxkTGFiZWxGbG9hdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZW1wdHkgfHwgdGhpcy5mb2N1c2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5nQ29udHJvbCA/ICEhdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQgOiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fc3luY0NoaXBzU3RhdGUoKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIE9yaWVudGF0aW9uIG9mIHRoZSBjaGlwIGxpc3QuICovXG4gIEBJbnB1dCgnYXJpYS1vcmllbnRhdGlvbicpIGFyaWFPcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhpcyBjaGlwIGxpc3QgaXMgc2VsZWN0YWJsZS4gV2hlbiBhIGNoaXAgbGlzdCBpcyBub3Qgc2VsZWN0YWJsZSxcbiAgICogdGhlIHNlbGVjdGVkIHN0YXRlcyBmb3IgYWxsIHRoZSBjaGlwcyBpbnNpZGUgdGhlIGNoaXAgbGlzdCBhcmUgYWx3YXlzIGlnbm9yZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0YWJsZTtcbiAgfVxuICBzZXQgc2VsZWN0YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMuY2hpcHMuZm9yRWFjaCgoY2hpcCkgPT4gKGNoaXAuX2NoaXBMaXN0U2VsZWN0YWJsZSA9IHRoaXMuX3NlbGVjdGFibGUpKTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9zZWxlY3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3VzZXJUYWJJbmRleCA9IHZhbHVlO1xuICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gIH1cblxuICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgY2hpcHMnIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnRzLiAqL1xuICBnZXQgY2hpcFNlbGVjdGlvbkNoYW5nZXMoKTogT2JzZXJ2YWJsZTxOb3ZvQ2hpcFNlbGVjdGlvbkNoYW5nZT4ge1xuICAgIHJldHVybiBtZXJnZSguLi50aGlzLmNoaXBzLm1hcCgoY2hpcCkgPT4gY2hpcC5zZWxlY3Rpb25DaGFuZ2UpKTtcbiAgfVxuXG4gIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBjaGlwcycgZm9jdXMgY2hhbmdlIGV2ZW50cy4gKi9cbiAgZ2V0IGNoaXBGb2N1c0NoYW5nZXMoKTogT2JzZXJ2YWJsZTxOb3ZvQ2hpcEV2ZW50PiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuY2hpcHMubWFwKChjaGlwKSA9PiBjaGlwLl9vbkZvY3VzKSk7XG4gIH1cblxuICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgY2hpcHMnIGJsdXIgY2hhbmdlIGV2ZW50cy4gKi9cbiAgZ2V0IGNoaXBCbHVyQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE5vdm9DaGlwRXZlbnQ+IHtcbiAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5jaGlwcy5tYXAoKGNoaXApID0+IGNoaXAuX29uQmx1cikpO1xuICB9XG5cbiAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIGNoaXBzJyByZW1vdmUgY2hhbmdlIGV2ZW50cy4gKi9cbiAgZ2V0IGNoaXBSZW1vdmVDaGFuZ2VzKCk6IE9ic2VydmFibGU8Tm92b0NoaXBFdmVudD4ge1xuICAgIHJldHVybiBtZXJnZSguLi50aGlzLmNoaXBzLm1hcCgoY2hpcCkgPT4gY2hpcC5yZW1vdmVkKSk7XG4gIH1cblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3RlZCBjaGlwIGxpc3QgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE5vdm9DaGlwTGlzdENoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9DaGlwTGlzdENoYW5nZT4oKTtcblxuICAvKipcbiAgICogRXZlbnQgdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgcmF3IHZhbHVlIG9mIHRoZSBjaGlwLWxpc3QgY2hhbmdlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseVxuICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLyoqIFRoZSBjaGlwIGNvbXBvbmVudHMgY29udGFpbmVkIHdpdGhpbiB0aGlzIGNoaXAgbGlzdC4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvQ2hpcEVsZW1lbnQsIHtcbiAgICAvLyBXZSBuZWVkIHRvIHVzZSBgZGVzY2VuZGFudHM6IHRydWVgLCBiZWNhdXNlIEl2eSB3aWxsIG5vIGxvbmdlciBtYXRjaFxuICAgIC8vIGluZGlyZWN0IGRlc2NlbmRhbnRzIGlmIGl0J3MgbGVmdCBhcyBmYWxzZS5cbiAgICBkZXNjZW5kYW50czogdHJ1ZSxcbiAgfSlcbiAgY2hpcHM6IFF1ZXJ5TGlzdDxOb3ZvQ2hpcEVsZW1lbnQ+O1xuXG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4gKi9cbiAgbGFzdEtleVZhbHVlOiBzdHJpbmcgPSBudWxsO1xuICAvKiogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuKi9cbiAgbGFzdENhcmV0UG9zaXRpb246IG51bWJlciB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICBAT3B0aW9uYWwoKSBfcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sLFxuICApIHtcbiAgICBzdXBlcihfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLCBfcGFyZW50Rm9ybSwgX3BhcmVudEZvcm1Hcm91cCwgbmdDb250cm9sKTtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxOb3ZvQ2hpcEVsZW1lbnQ+KHRoaXMuY2hpcHMpXG4gICAgICAud2l0aFdyYXAoKVxuICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKClcbiAgICAgIC53aXRoSG9tZUFuZEVuZCgpXG4gICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJyk7XG5cbiAgICBpZiAodGhpcy5fZGlyKSB7XG4gICAgICB0aGlzLl9kaXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZSgoZGlyKSA9PiB0aGlzLl9rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oZGlyKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fa2V5TWFuYWdlci50YWJPdXQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX2FsbG93Rm9jdXNFc2NhcGUoKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gdGhlIGxpc3QgY2hhbmdlcywgcmUtc3Vic2NyaWJlXG4gICAgdGhpcy5jaGlwcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpLCB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIC8vIFNpbmNlIHRoaXMgaGFwcGVucyBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlblxuICAgICAgICAvLyBjaGVja2VkLCB3ZSBuZWVkIHRvIGRlZmVyIGl0IHRvIHRoZSBuZXh0IHRpY2suXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3N5bmNDaGlwc1N0YXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZXNldENoaXBzKCk7XG4gICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgbmVlZCB0byB1cGRhdGUgb3VyIHRhYiBpbmRleFxuICAgICAgdGhpcy5fdXBkYXRlVGFiSW5kZXgoKTtcblxuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSBkZXN0cm95ZWQgY2hpcCBhbmQgbmVlZCB0byByZWZvY3VzXG4gICAgICB0aGlzLl91cGRhdGVGb2N1c0ZvckRlc3Ryb3llZENoaXBzKCk7XG5cbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBSZXNldCBjaGlwcyBzZWxlY3RlZC9kZXNlbGVjdGVkIHN0YXR1c1xuICAgIHRoaXMuX2luaXRpYWxpemVTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE5vdm9DaGlwRWxlbWVudD4odGhpcy5tdWx0aXBsZSwgdW5kZWZpbmVkLCBmYWxzZSk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgLy8gV2UgbmVlZCB0byByZS1ldmFsdWF0ZSB0aGlzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWVcbiAgICAgIC8vIGVycm9yIHRyaWdnZXJzIHRoYXQgd2UgY2FuJ3Qgc3Vic2NyaWJlIHRvIChlLmcuIHBhcmVudCBmb3JtIHN1Ym1pc3Npb25zKS4gVGhpcyBtZWFuc1xuICAgICAgLy8gdGhhdCB3aGF0ZXZlciBsb2dpYyBpcyBpbiBoZXJlIGhhcyB0byBiZSBzdXBlciBsZWFuIG9yIHdlIHJpc2sgZGVzdHJveWluZyB0aGUgcGVyZm9ybWFuY2UuXG4gICAgICB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTtcblxuICAgICAgaWYgKHRoaXMubmdDb250cm9sLmRpc2FibGVkICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gISF0aGlzLm5nQ29udHJvbC5kaXNhYmxlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG5cbiAgICB0aGlzLl9kcm9wU3Vic2NyaXB0aW9ucygpO1xuICB9XG5cbiAgLyoqIEFzc29jaWF0ZXMgYW4gSFRNTCBpbnB1dCBlbGVtZW50IHdpdGggdGhpcyBjaGlwIGxpc3QuICovXG4gIHJlZ2lzdGVySW5wdXQoaW5wdXRFbGVtZW50OiBOb3ZvQ2hpcFRleHRDb250cm9sKTogdm9pZCB7XG4gICAgdGhpcy5fY2hpcElucHV0ID0gaW5wdXRFbGVtZW50O1xuXG4gICAgLy8gV2UgdXNlIHRoaXMgYXR0cmlidXRlIHRvIG1hdGNoIHRoZSBjaGlwIGxpc3QgdG8gaXRzIGlucHV0IGluIHRlc3QgaGFybmVzc2VzLlxuICAgIC8vIFNldCB0aGUgYXR0cmlidXRlIGRpcmVjdGx5IGhlcmUgdG8gYXZvaWQgXCJjaGFuZ2VkIGFmdGVyIGNoZWNrZWRcIiBlcnJvcnMuXG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1ub3ZvLWNoaXAtaW5wdXQnLCBpbnB1dEVsZW1lbnQuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgc2V0RGVzY3JpYmVkQnlJZHMoaWRzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2FyaWFEZXNjcmliZWRieSA9IGlkcy5qb2luKCcgJyk7XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5fc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWUsIHZhbHVlXTtcbiAgICB0aGlzLl9jaGlwSW5wdXQuY2xlYXJWYWx1ZSgpO1xuICB9XG5cbiAgcmVtb3ZlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZhbHVlICYmIEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcigoaXQpID0+ICF0aGlzLmNvbXBhcmVXaXRoKGl0LCB2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9vcmlnaW5hdGVzRnJvbUNoaXAoZXZlbnQpKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIGZpcnN0IG5vbi1kaXNhYmxlZCBjaGlwIGluIHRoaXMgY2hpcCBsaXN0LCBvciB0aGUgYXNzb2NpYXRlZCBpbnB1dCB3aGVuIHRoZXJlXG4gICAqIGFyZSBubyBlbGlnaWJsZSBjaGlwcy5cbiAgICovXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRPRE86IEFSSUEgc2F5cyB0aGlzIHNob3VsZCBmb2N1cyB0aGUgZmlyc3QgYHNlbGVjdGVkYCBjaGlwIGlmIGFueSBhcmUgc2VsZWN0ZWQuXG4gICAgLy8gRm9jdXMgb24gZmlyc3QgZWxlbWVudCBpZiB0aGVyZSdzIG5vIGNoaXBJbnB1dCBpbnNpZGUgY2hpcC1saXN0XG4gICAgaWYgKHRoaXMuX2NoaXBJbnB1dCAmJiB0aGlzLl9jaGlwSW5wdXQuZm9jdXNlZCkge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY2hpcElucHV0KSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMuX2ZvY3VzSW5wdXQob3B0aW9ucykpO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBBdHRlbXB0IHRvIGZvY3VzIGFuIGlucHV0IGlmIHdlIGhhdmUgb25lLiAqL1xuICBfZm9jdXNJbnB1dChvcHRpb25zPzogRm9jdXNPcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuX2NoaXBJbnB1dCkge1xuICAgICAgdGhpcy5fY2hpcElucHV0LmZvY3VzKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzIGV2ZW50cyB0byB0aGUga2V5Ym9hcmQgbWFuYWdlci4gQXZhaWxhYmxlIGhlcmUgZm9yIHRlc3RzLlxuICAgKi9cbiAgX2tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAvLyBJZiB0aGV5IGFyZSBvbiBhbiBlbXB0eSBpbnB1dCBhbmQgaGl0IGJhY2tzcGFjZSwgZm9jdXMgdGhlIGxhc3QgY2hpcFxuICAgIGlmIChldmVudC5rZXkgPT09IEtleS5CYWNrc3BhY2UgJiYgdGhpcy5faXNJbnB1dEVtcHR5KHRhcmdldCkpIHtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbm92by1jaGlwJykpIHtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdGhlIHRhYiBpbmRleCBhcyB5b3Ugc2hvdWxkIG5vdCBiZSBhbGxvd2VkIHRvIGZvY3VzIGFuIGVtcHR5IGxpc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3VwZGF0ZVRhYkluZGV4KCk6IHZvaWQge1xuICAgIC8vIElmIHdlIGhhdmUgMCBjaGlwcywgd2Ugc2hvdWxkIG5vdCBhbGxvdyBrZXlib2FyZCBmb2N1c1xuICAgIHRoaXMuX3RhYkluZGV4ID0gdGhpcy5fdXNlclRhYkluZGV4IHx8ICh0aGlzLmNoaXBzLmxlbmd0aCA9PT0gMCA/IC0xIDogMCk7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGFtb3VudCBvZiBjaGlwcyBjaGFuZ2VkLCB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGVcbiAgICoga2V5IG1hbmFnZXIgc3RhdGUgYW5kIGZvY3VzIHRoZSBuZXh0IGNsb3Nlc3QgY2hpcC5cbiAgICovXG4gIHByb3RlY3RlZCBfdXBkYXRlRm9jdXNGb3JEZXN0cm95ZWRDaGlwcygpIHtcbiAgICAvLyBNb3ZlIGZvY3VzIHRvIHRoZSBjbG9zZXN0IGNoaXAuIElmIG5vIG90aGVyIGNoaXBzIHJlbWFpbiwgZm9jdXMgdGhlIGNoaXAtbGlzdCBpdHNlbGYuXG4gICAgaWYgKHRoaXMuX2xhc3REZXN0cm95ZWRDaGlwSW5kZXggIT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuY2hpcHMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IG5ld0NoaXBJbmRleCA9IE1hdGgubWluKHRoaXMuX2xhc3REZXN0cm95ZWRDaGlwSW5kZXgsIHRoaXMuY2hpcHMubGVuZ3RoIC0gMSk7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShuZXdDaGlwSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2xhc3REZXN0cm95ZWRDaGlwSW5kZXggPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgdG8gZW5zdXJlIGFsbCBpbmRleGVzIGFyZSB2YWxpZC5cbiAgICpcbiAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbmRleCBpcyB2YWxpZCBmb3Igb3VyIGxpc3Qgb2YgY2hpcHMuXG4gICAqL1xuICBwcml2YXRlIF9pc1ZhbGlkSW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5jaGlwcy5sZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIF9pc0lucHV0RW1wdHkoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcbiAgICAgIGxldCBpbnB1dCA9IGVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIHJldHVybiAhaW5wdXQudmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgX3NldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWU6IGFueSwgaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5fY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB0aGlzLmNoaXBzLmZvckVhY2goKGNoaXApID0+IGNoaXAuZGVzZWxlY3QoKSk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZSkgPT4gdGhpcy5fc2VsZWN0VmFsdWUoY3VycmVudFZhbHVlLCBpc1VzZXJJbnB1dCkpO1xuICAgICAgdGhpcy5fc29ydFZhbHVlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb3JyZXNwb25kaW5nQ2hpcCA9IHRoaXMuX3NlbGVjdFZhbHVlKHZhbHVlLCBpc1VzZXJJbnB1dCk7XG5cbiAgICAgIC8vIFNoaWZ0IGZvY3VzIHRvIHRoZSBhY3RpdmUgaXRlbS4gTm90ZSB0aGF0IHdlIHNob3VsZG4ndCBkbyB0aGlzIGluIG11bHRpcGxlXG4gICAgICAvLyBtb2RlLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hhdCBjaGlwIHRoZSB1c2VyIGludGVyYWN0ZWQgd2l0aCBsYXN0LlxuICAgICAgaWYgKGNvcnJlc3BvbmRpbmdDaGlwKSB7XG4gICAgICAgIGlmIChpc1VzZXJJbnB1dCkge1xuICAgICAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShjb3JyZXNwb25kaW5nQ2hpcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgYW5kIHNlbGVjdHMgdGhlIGNoaXAgYmFzZWQgb24gaXRzIHZhbHVlLlxuICAgKiBAcmV0dXJucyBDaGlwIHRoYXQgaGFzIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2VsZWN0VmFsdWUodmFsdWU6IGFueSwgaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSB0cnVlKTogTm92b0NoaXBFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBjb3JyZXNwb25kaW5nQ2hpcCA9IHRoaXMuY2hpcHMuZmluZCgoY2hpcCkgPT4ge1xuICAgICAgcmV0dXJuIGNoaXAudmFsdWUgIT0gbnVsbCAmJiB0aGlzLl9jb21wYXJlV2l0aChjaGlwLnZhbHVlLCB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoY29ycmVzcG9uZGluZ0NoaXApIHtcbiAgICAgIGlzVXNlcklucHV0ID8gY29ycmVzcG9uZGluZ0NoaXAuc2VsZWN0VmlhSW50ZXJhY3Rpb24oKSA6IGNvcnJlc3BvbmRpbmdDaGlwLnNlbGVjdCgpO1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGNvcnJlc3BvbmRpbmdDaGlwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29ycmVzcG9uZGluZ0NoaXA7XG4gIH1cblxuICBwcml2YXRlIF9pbml0aWFsaXplU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIC8vIERlZmVyIHNldHRpbmcgdGhlIHZhbHVlIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcIkV4cHJlc3Npb25cbiAgICAvLyBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycyBmcm9tIEFuZ3VsYXIuXG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubmdDb250cm9sLnZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBldmVyeSBjaGlwIGluIHRoZSBsaXN0LlxuICAgKiBAcGFyYW0gc2tpcCBDaGlwIHRoYXQgc2hvdWxkIG5vdCBiZSBkZXNlbGVjdGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2xlYXJTZWxlY3Rpb24oc2tpcD86IE5vdm9DaGlwRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgdGhpcy5jaGlwcy5mb3JFYWNoKChjaGlwKSA9PiB7XG4gICAgICBpZiAoY2hpcCAhPT0gc2tpcCkge1xuICAgICAgICBjaGlwLmRlc2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBtb2RlbCB2YWx1ZXMsIGVuc3VyaW5nIHRoYXQgdGhleSBrZWVwIHRoZSBzYW1lXG4gICAqIG9yZGVyIHRoYXQgdGhleSBoYXZlIGluIHRoZSBwYW5lbC5cbiAgICovXG4gIHByaXZhdGUgX3NvcnRWYWx1ZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX211bHRpcGxlKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuXG4gICAgICB0aGlzLmNoaXBzLmZvckVhY2goKGNoaXApID0+IHtcbiAgICAgICAgaWYgKGNoaXAuc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoY2hpcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gc2V0IHRoZSBtb2RlbCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfcHJvcGFnYXRlQ2hhbmdlcyhmYWxsYmFja1ZhbHVlPzogYW55KTogdm9pZCB7XG4gICAgbGV0IHZhbHVlVG9FbWl0OiBhbnkgPSBudWxsO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zZWxlY3RlZCkpIHtcbiAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZC5tYXAoKGNoaXApID0+IGNoaXAudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZVRvRW1pdCA9IHRoaXMuc2VsZWN0ZWQgPyB0aGlzLnNlbGVjdGVkLnZhbHVlIDogZmFsbGJhY2tWYWx1ZTtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVRvRW1pdDtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KG5ldyBOb3ZvQ2hpcExpc3RDaGFuZ2UodGhpcywgdmFsdWVUb0VtaXQpKTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWVUb0VtaXQpO1xuICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlVG9FbWl0KTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBXaGVuIGJsdXJyZWQsIG1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQgd2hlbiBmb2N1cyBtb3ZlZCBvdXRzaWRlIHRoZSBjaGlwIGxpc3QuICovXG4gIF9ibHVyKCkge1xuICAgIGlmICghdGhpcy5faGFzRm9jdXNlZENoaXAoKSkge1xuICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLl9jaGlwSW5wdXQpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhIGNoaXAgaW5wdXQsIHdlIHNob3VsZCBjaGVjayB3aGV0aGVyIHRoZSBmb2N1cyBtb3ZlZCB0byBjaGlwIGlucHV0LlxuICAgICAgICAvLyBJZiB0aGUgZm9jdXMgaXMgbm90IG1vdmVkIHRvIGNoaXAgaW5wdXQsIG1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQuIElmIHRoZSBmb2N1cyBtb3ZlZFxuICAgICAgICAvLyB0byBjaGlwIGlucHV0LCBkbyBub3RoaW5nLlxuICAgICAgICAvLyBUaW1lb3V0IGlzIG5lZWRlZCB0byB3YWl0IGZvciB0aGUgZm9jdXMoKSBldmVudCB0cmlnZ2VyIG9uIGNoaXAgaW5wdXQuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gY2hpcCBpbnB1dCwgdGhlbiBtYXJrIHRoZSBmaWVsZCBhcyB0b3VjaGVkLlxuICAgICAgICB0aGlzLl9tYXJrQXNUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIE1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQgKi9cbiAgX21hcmtBc1RvdWNoZWQoKSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGB0YWJpbmRleGAgZnJvbSB0aGUgY2hpcCBsaXN0IGFuZCByZXNldHMgaXQgYmFjayBhZnRlcndhcmRzLCBhbGxvd2luZyB0aGVcbiAgICogdXNlciB0byB0YWIgb3V0IG9mIGl0LiBUaGlzIHByZXZlbnRzIHRoZSBsaXN0IGZyb20gY2FwdHVyaW5nIGZvY3VzIGFuZCByZWRpcmVjdGluZ1xuICAgKiBpdCBiYWNrIHRvIHRoZSBmaXJzdCBjaGlwLCBjcmVhdGluZyBhIGZvY3VzIHRyYXAsIGlmIGl0IHVzZXIgdHJpZXMgdG8gdGFiIGF3YXkuXG4gICAqL1xuICBfYWxsb3dGb2N1c0VzY2FwZSgpIHtcbiAgICBpZiAodGhpcy5fdGFiSW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl90YWJJbmRleCA9IC0xO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLl91c2VyVGFiSW5kZXggfHwgMDtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXNldENoaXBzKCkge1xuICAgIHRoaXMuX2Ryb3BTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5fbGlzdGVuVG9DaGlwc0ZvY3VzKCk7XG4gICAgdGhpcy5fbGlzdGVuVG9DaGlwc1NlbGVjdGlvbigpO1xuICAgIHRoaXMuX2xpc3RlblRvQ2hpcHNSZW1vdmVkKCk7XG4gIH1cblxuICBwcml2YXRlIF9kcm9wU3Vic2NyaXB0aW9ucygpIHtcbiAgICBpZiAodGhpcy5fY2hpcEZvY3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9jaGlwRm9jdXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NoaXBGb2N1c1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NoaXBCbHVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9jaGlwQmx1clN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2hpcEJsdXJTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jaGlwU2VsZWN0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9jaGlwU2VsZWN0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9jaGlwU2VsZWN0aW9uU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hpcFJlbW92ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fY2hpcFJlbW92ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2hpcFJlbW92ZVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIExpc3RlbnMgdG8gdXNlci1nZW5lcmF0ZWQgc2VsZWN0aW9uIGV2ZW50cyBvbiBlYWNoIGNoaXAuICovXG4gIHByaXZhdGUgX2xpc3RlblRvQ2hpcHNTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fY2hpcFNlbGVjdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuY2hpcFNlbGVjdGlvbkNoYW5nZXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgZXZlbnQuc291cmNlLnNlbGVjdGVkID8gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGV2ZW50LnNvdXJjZSkgOiB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChldmVudC5zb3VyY2UpO1xuXG4gICAgICAvLyBGb3Igc2luZ2xlIHNlbGVjdGlvbiBjaGlwIGxpc3QsIG1ha2Ugc3VyZSB0aGUgZGVzZWxlY3RlZCB2YWx1ZSBpcyB1bnNlbGVjdGVkLlxuICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuY2hpcHMuZm9yRWFjaCgoY2hpcCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChjaGlwKSAmJiBjaGlwLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjaGlwLmRlc2VsZWN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LmlzVXNlcklucHV0KSB7XG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBMaXN0ZW5zIHRvIHVzZXItZ2VuZXJhdGVkIHNlbGVjdGlvbiBldmVudHMgb24gZWFjaCBjaGlwLiAqL1xuICBwcml2YXRlIF9saXN0ZW5Ub0NoaXBzRm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2hpcEZvY3VzU3Vic2NyaXB0aW9uID0gdGhpcy5jaGlwRm9jdXNDaGFuZ2VzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGxldCBjaGlwSW5kZXg6IG51bWJlciA9IHRoaXMuY2hpcHMudG9BcnJheSgpLmluZGV4T2YoZXZlbnQuY2hpcCk7XG5cbiAgICAgIGlmICh0aGlzLl9pc1ZhbGlkSW5kZXgoY2hpcEluZGV4KSkge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oY2hpcEluZGV4KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2NoaXBCbHVyU3Vic2NyaXB0aW9uID0gdGhpcy5jaGlwQmx1ckNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX2JsdXIoKTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvQ2hpcHNSZW1vdmVkKCk6IHZvaWQge1xuICAgIHRoaXMuX2NoaXBSZW1vdmVTdWJzY3JpcHRpb24gPSB0aGlzLmNoaXBSZW1vdmVDaGFuZ2VzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNoaXAgPSBldmVudC5jaGlwO1xuICAgICAgY29uc3QgY2hpcEluZGV4ID0gdGhpcy5jaGlwcy50b0FycmF5KCkuaW5kZXhPZihldmVudC5jaGlwKTtcbiAgICAgIHRoaXMucmVtb3ZlVmFsdWUoY2hpcC52YWx1ZSk7XG4gICAgICAvLyBJbiBjYXNlIHRoZSBjaGlwIHRoYXQgd2lsbCBiZSByZW1vdmVkIGlzIGN1cnJlbnRseSBmb2N1c2VkLCB3ZSB0ZW1wb3JhcmlseSBzdG9yZVxuICAgICAgLy8gdGhlIGluZGV4IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gZGV0ZXJtaW5lIGFuIGFwcHJvcHJpYXRlIHNpYmxpbmcgY2hpcCB0aGF0IHdpbGxcbiAgICAgIC8vIHJlY2VpdmUgZm9jdXMuXG4gICAgICBpZiAodGhpcy5faXNWYWxpZEluZGV4KGNoaXBJbmRleCkgJiYgY2hpcC5faGFzRm9jdXMpIHtcbiAgICAgICAgdGhpcy5fbGFzdERlc3Ryb3llZENoaXBJbmRleCA9IGNoaXBJbmRleDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhbiBldmVudCBjb21lcyBmcm9tIGluc2lkZSBhIGNoaXAgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfb3JpZ2luYXRlc0Zyb21DaGlwKGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICB3aGlsZSAoY3VycmVudEVsZW1lbnQgJiYgY3VycmVudEVsZW1lbnQgIT09IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgaWYgKGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbm92by1jaGlwJykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG9mIHRoZSBjaGlwcyBpcyBmb2N1c2VkLiAqL1xuICBwcml2YXRlIF9oYXNGb2N1c2VkQ2hpcCgpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlwcyAmJiB0aGlzLmNoaXBzLnNvbWUoKGNoaXApID0+IGNoaXAuX2hhc0ZvY3VzKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgbGlzdCdzIHN0YXRlIHdpdGggdGhlIGluZGl2aWR1YWwgY2hpcHMuICovXG4gIHByaXZhdGUgX3N5bmNDaGlwc1N0YXRlKCkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLmNoaXBzLmZvckVhY2goKGNoaXApID0+IHtcbiAgICAgICAgY2hpcC5fY2hpcExpc3REaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkO1xuICAgICAgICBjaGlwLl9jaGlwTGlzdE11bHRpcGxlID0gdGhpcy5tdWx0aXBsZTtcbiAgICAgICAgY2hpcC5fY2hpcExpc3RTZWxlY3RhYmxlID0gdGhpcy5zZWxlY3RhYmxlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX211bHRpcGxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3NlbGVjdGFibGU6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==