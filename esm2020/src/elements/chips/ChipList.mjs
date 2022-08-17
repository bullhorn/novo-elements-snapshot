import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Self, ViewEncapsulation, } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { ErrorStateMatcher, mixinErrorState, NOVO_OPTION_PARENT_COMPONENT } from '../common';
import { NovoFieldControl } from '../field';
import { NovoChipElement } from './Chip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@angular/forms";
import * as i3 from "../common";
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
            // Reset chips selected/deselected status
            this._initializeSelection();
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
        if (this.value) {
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
        if (event.key === "Backspace" /* Backspace */ && this._isInputEmpty(target)) {
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
}
NovoChipList.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipList, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i3.ErrorStateMatcher }, { token: i2.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
NovoChipList.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoChipList, selector: "novo-chip-list", inputs: { errorStateMatcher: "errorStateMatcher", multiple: "multiple", stacked: "stacked", compareWith: "compareWith", value: "value", required: "required", placeholder: "placeholder", disabled: "disabled", ariaOrientation: ["aria-orientation", "ariaOrientation"], selectable: "selectable", tabIndex: "tabIndex" }, outputs: { change: "change", valueChange: "valueChange" }, host: { listeners: { "focus": "focus()", "blur": "_blur()", "keydown": "_keydown($event)" }, properties: { "attr.tabindex": "disabled ? null : _tabIndex", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-required": "role ? required : null", "attr.aria-disabled": "disabled.toString()", "attr.aria-invalid": "errorState", "attr.aria-multiselectable": "multiple", "attr.role": "role", "class.novo-chip-list-empty": "empty", "class.novo-chip-list-has-value": "!empty", "class.novo-chip-list-stacked": "stacked", "class.novo-chip-list-focused": "focused", "class.novo-chip-list-disabled": "disabled", "class.novo-chip-list-invalid": "errorState", "class.novo-chip-list-required": "required", "attr.aria-orientation": "ariaOrientation", "id": "_uid" }, classAttribute: "novo-chip-list" }, providers: [
        { provide: NovoFieldControl, useExisting: NovoChipList },
        { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoChipList },
    ], queries: [{ propertyName: "chips", predicate: NovoChipElement, descendants: true }], exportAs: ["novoChipList"], usesInheritance: true, ngImport: i0, template: `<div class="novo-chip-list-wrapper"><ng-content></ng-content></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipList, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-chip-list',
                    template: `<div class="novo-chip-list-wrapper"><ng-content></ng-content></div>`,
                    exportAs: 'novoChipList',
                    host: {
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
                    },
                    providers: [
                        { provide: NovoFieldControl, useExisting: NovoChipList },
                        { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoChipList },
                    ],
                    // styleUrls: ['./ChipList.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGlwcy9DaGlwTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFFZixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxJQUFJLEVBQ0osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0Isa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBZ0QsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLDRCQUE0QixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUEwQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFHakYsbURBQW1EO0FBQ25ELG9CQUFvQjtBQUNwQixNQUFNLGdCQUFnQjtJQUNwQixZQUNTLHlCQUE0QyxFQUM1QyxXQUFtQixFQUNuQixn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O29CQUNsQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkErUUksUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBR1IsUUFBUTs7MEJBQUksSUFBSTs0Q0EzTVYsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUlGLFFBQVE7c0JBRFgsS0FBSztnQkFZRixPQUFPO3NCQURWLEtBQUs7Z0JBZUYsV0FBVztzQkFEZCxLQUFLO2dCQWtCRixLQUFLO3NCQURSLEtBQUs7Z0JBdUJGLFFBQVE7c0JBRFgsS0FBSztnQkFlRixXQUFXO3NCQURkLEtBQUs7Z0JBb0NGLFFBQVE7c0JBRFgsS0FBSztnQkFXcUIsZUFBZTtzQkFBekMsS0FBSzt1QkFBQyxrQkFBa0I7Z0JBT3JCLFVBQVU7c0JBRGIsS0FBSztnQkFjRixRQUFRO3NCQURYLEtBQUs7Z0JBMkJhLE1BQU07c0JBQXhCLE1BQU07Z0JBT1ksV0FBVztzQkFBN0IsTUFBTTtnQkFRUCxLQUFLO3NCQUxKLGVBQWU7dUJBQUMsZUFBZSxFQUFFO3dCQUNoQyx1RUFBdUU7d0JBQ3ZFLDhDQUE4Qzt3QkFDOUMsV0FBVyxFQUFFLElBQUk7cUJBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTZWxmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0NvbnRyb2wsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgQ2FuVXBkYXRlRXJyb3JTdGF0ZSwgQ2FuVXBkYXRlRXJyb3JTdGF0ZUN0b3IsIEVycm9yU3RhdGVNYXRjaGVyLCBtaXhpbkVycm9yU3RhdGUsIE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ZpZWxkQ29udHJvbCB9IGZyb20gJy4uL2ZpZWxkJztcbmltcG9ydCB7IE5vdm9DaGlwRWxlbWVudCwgTm92b0NoaXBFdmVudCwgTm92b0NoaXBTZWxlY3Rpb25DaGFuZ2UgfSBmcm9tICcuL0NoaXAnO1xuaW1wb3J0IHsgTm92b0NoaXBUZXh0Q29udHJvbCB9IGZyb20gJy4vQ2hpcFRleHRDb250cm9sJztcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBOb3ZvQ2hpcExpc3QuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY2xhc3MgTm92b0NoaXBMaXN0QmFzZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICBwdWJsaWMgX3BhcmVudEZvcm06IE5nRm9ybSxcbiAgICBwdWJsaWMgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sLFxuICApIHt9XG59XG5jb25zdCBfTm92b0NoaXBMaXN0TWl4aW5CYXNlOiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmIHR5cGVvZiBOb3ZvQ2hpcExpc3RCYXNlID0gbWl4aW5FcnJvclN0YXRlKE5vdm9DaGlwTGlzdEJhc2UpO1xuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcyBmb3IgY2hpcC1saXN0IGNvbXBvbmVudHMuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIGNoaXAgbGlzdCB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBOb3ZvQ2hpcExpc3RDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogQ2hpcCBsaXN0IHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTm92b0NoaXBMaXN0LFxuICAgIC8qKiBWYWx1ZSBvZiB0aGUgY2hpcCBsaXN0IHdoZW4gdGhlIGV2ZW50IHdhcyBlbWl0dGVkLiAqL1xuICAgIHB1YmxpYyB2YWx1ZTogYW55LFxuICApIHt9XG59XG5cbi8qKlxuICogQSBjaGlwIGxpc3QgY29tcG9uZW50IChuYW1lZCBDaGlwTGlzdCBmb3IgaXRzIHNpbWlsYXJpdHkgdG8gdGhlIExpc3QgY29tcG9uZW50KS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jaGlwLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJub3ZvLWNoaXAtbGlzdC13cmFwcGVyXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmAsXG4gIGV4cG9ydEFzOiAnbm92b0NoaXBMaXN0JyxcbiAgaG9zdDoge1xuICAgICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyBudWxsIDogX3RhYkluZGV4JyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2FyaWFEZXNjcmliZWRieSB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1yZXF1aXJlZF0nOiAncm9sZSA/IHJlcXVpcmVkIDogbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICdbYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZV0nOiAnbXVsdGlwbGUnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlJyxcbiAgICAnW2NsYXNzLm5vdm8tY2hpcC1saXN0LWVtcHR5XSc6ICdlbXB0eScsXG4gICAgJ1tjbGFzcy5ub3ZvLWNoaXAtbGlzdC1oYXMtdmFsdWVdJzogJyFlbXB0eScsXG4gICAgJ1tjbGFzcy5ub3ZvLWNoaXAtbGlzdC1zdGFja2VkXSc6ICdzdGFja2VkJyxcbiAgICAnW2NsYXNzLm5vdm8tY2hpcC1saXN0LWZvY3VzZWRdJzogJ2ZvY3VzZWQnLFxuICAgICdbY2xhc3Mubm92by1jaGlwLWxpc3QtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm5vdm8tY2hpcC1saXN0LWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICdbY2xhc3Mubm92by1jaGlwLWxpc3QtcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAnW2F0dHIuYXJpYS1vcmllbnRhdGlvbl0nOiAnYXJpYU9yaWVudGF0aW9uJyxcbiAgICBjbGFzczogJ25vdm8tY2hpcC1saXN0JyxcbiAgICAnKGZvY3VzKSc6ICdmb2N1cygpJyxcbiAgICAnKGJsdXIpJzogJ19ibHVyKCknLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJ1tpZF0nOiAnX3VpZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTm92b0ZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE5vdm9DaGlwTGlzdCB9LFxuICAgIHsgcHJvdmlkZTogTk9WT19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgdXNlRXhpc3Rpbmc6IE5vdm9DaGlwTGlzdCB9LFxuICBdLFxuICAvLyBzdHlsZVVybHM6IFsnLi9DaGlwTGlzdC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2hpcExpc3RcbiAgZXh0ZW5kcyBfTm92b0NoaXBMaXN0TWl4aW5CYXNlXG4gIGltcGxlbWVudHMgTm92b0ZpZWxkQ29udHJvbDxhbnk+LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgRG9DaGVjaywgT25Jbml0LCBPbkRlc3Ryb3ksIENhblVwZGF0ZUVycm9yU3RhdGVcbntcbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcmVhZG9ubHkgY29udHJvbFR5cGU6IHN0cmluZyA9ICdjaGlwLWxpc3QnO1xuXG4gIC8qKlxuICAgKiBXaGVuIGEgY2hpcCBpcyBkZXN0cm95ZWQsIHdlIHN0b3JlIHRoZSBpbmRleCBvZiB0aGUgZGVzdHJveWVkIGNoaXAgdW50aWwgdGhlIGNoaXBzXG4gICAqIHF1ZXJ5IGxpc3Qgbm90aWZpZXMgYWJvdXQgdGhlIHVwZGF0ZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSB3ZSBjYW5ub3QgZGV0ZXJtaW5lIGFuXG4gICAqIGFwcHJvcHJpYXRlIGNoaXAgdGhhdCBzaG91bGQgcmVjZWl2ZSBmb2N1cyB1bnRpbCB0aGUgYXJyYXkgb2YgY2hpcHMgdXBkYXRlZCBjb21wbGV0ZWx5LlxuICAgKi9cbiAgcHJpdmF0ZSBfbGFzdERlc3Ryb3llZENoaXBJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICBwcml2YXRlIF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gZm9jdXMgY2hhbmdlcyBpbiB0aGUgY2hpcHMuICovXG4gIHByaXZhdGUgX2NoaXBGb2N1c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGJsdXIgY2hhbmdlcyBpbiB0aGUgY2hpcHMuICovXG4gIHByaXZhdGUgX2NoaXBCbHVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gc2VsZWN0aW9uIGNoYW5nZXMgaW4gY2hpcHMuICovXG4gIHByaXZhdGUgX2NoaXBTZWxlY3Rpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byByZW1vdmUgY2hhbmdlcyBpbiBjaGlwcy4gKi9cbiAgcHJpdmF0ZSBfY2hpcFJlbW92ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAvKiogVGhlIGNoaXAgaW5wdXQgdG8gYWRkIG1vcmUgY2hpcHMgKi9cbiAgcHJvdGVjdGVkIF9jaGlwSW5wdXQ6IE5vdm9DaGlwVGV4dENvbnRyb2w7XG5cbiAgLyoqIFVpZCBvZiB0aGUgY2hpcCBsaXN0ICovXG4gIF91aWQ6IHN0cmluZyA9IGBub3ZvLWNoaXAtbGlzdC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgLyoqIFRoZSBhcmlhLWRlc2NyaWJlZGJ5IGF0dHJpYnV0ZSBvbiB0aGUgY2hpcCBsaXN0IGZvciBpbXByb3ZlZCBhMTF5LiAqL1xuICBfYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmc7XG5cbiAgLyoqIFRhYiBpbmRleCBmb3IgdGhlIGNoaXAgbGlzdC4gKi9cbiAgX3RhYkluZGV4ID0gMDtcblxuICAvKipcbiAgICogVXNlciBkZWZpbmVkIHRhYiBpbmRleC5cbiAgICogV2hlbiBpdCBpcyBub3QgbnVsbCwgdXNlIHVzZXIgZGVmaW5lZCB0YWIgaW5kZXguIE90aGVyd2lzZSB1c2UgX3RhYkluZGV4XG4gICAqL1xuICBfdXNlclRhYkluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKiogVGhlIEZvY3VzS2V5TWFuYWdlciB3aGljaCBoYW5kbGVzIGZvY3VzLiAqL1xuICBfa2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE5vdm9DaGlwRWxlbWVudD47XG5cbiAgLyoqIEZ1bmN0aW9uIHdoZW4gdG91Y2hlZCAqL1xuICBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgLyoqIEZ1bmN0aW9uIHdoZW4gY2hhbmdlZCAqL1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgX3NlbGVjdGlvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxOb3ZvQ2hpcEVsZW1lbnQ+O1xuXG4gIC8qKiBUaGUgYXJyYXkgb2Ygc2VsZWN0ZWQgY2hpcHMgaW5zaWRlIGNoaXAgbGlzdC4gKi9cbiAgZ2V0IHNlbGVjdGVkKCk6IE5vdm9DaGlwRWxlbWVudFtdIHwgTm92b0NoaXBFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG4gIH1cblxuICAvKiogVGhlIEFSSUEgcm9sZSBhcHBsaWVkIHRvIHRoZSBjaGlwIGxpc3QuICovXG4gIGdldCByb2xlKCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmVtcHR5ID8gbnVsbCA6ICdsaXN0Ym94JztcbiAgfVxuXG4gIC8qKiBBbiBvYmplY3QgdXNlZCB0byBjb250cm9sIHdoZW4gZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLiAqL1xuICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgc2hvdWxkIGJlIGFsbG93ZWQgdG8gc2VsZWN0IG11bHRpcGxlIGNoaXBzLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9zeW5jQ2hpcHNTdGF0ZSgpO1xuICB9XG4gIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXBzIHNob3VsZCBhcHBlYXIgc3RhY2tlZCBpbnN0ZWFkIG9mIGEgcm93LiAqL1xuICBASW5wdXQoKVxuICBnZXQgc3RhY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhY2tlZDtcbiAgfVxuICBzZXQgc3RhY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3N0YWNrZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3N0YWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBjb21wYXJlIHRoZSBvcHRpb24gdmFsdWVzIHdpdGggdGhlIHNlbGVjdGVkIHZhbHVlcy4gVGhlIGZpcnN0IGFyZ3VtZW50XG4gICAqIGlzIGEgdmFsdWUgZnJvbSBhbiBvcHRpb24uIFRoZSBzZWNvbmQgaXMgYSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3Rpb24uIEEgYm9vbGVhblxuICAgKiBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgY29tcGFyZVdpdGgoKTogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jb21wYXJlV2l0aDtcbiAgfVxuICBzZXQgY29tcGFyZVdpdGgoZm46IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29tcGFyZVdpdGggPSBmbjtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgIC8vIEEgZGlmZmVyZW50IGNvbXBhcmF0b3IgbWVhbnMgdGhlIHNlbGVjdGlvbiBjb3VsZCBjaGFuZ2UuXG4gICAgICB0aGlzLl9pbml0aWFsaXplU2VsZWN0aW9uKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2NvbXBhcmVXaXRoID0gKG8xOiBhbnksIG8yOiBhbnkpID0+IG8xID09PSBvMjtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF92YWx1ZTogYW55O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jaGlwSW5wdXQgPyB0aGlzLl9jaGlwSW5wdXQuaWQgOiB0aGlzLl91aWQ7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICB9XG4gIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cbiAgcHJvdGVjdGVkIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jaGlwSW5wdXQgPyB0aGlzLl9jaGlwSW5wdXQucGxhY2Vob2xkZXIgOiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgfVxuICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG4gIHByb3RlY3RlZCBfcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAvKiogV2hldGhlciBhbnkgY2hpcHMgb3IgdGhlIG5vdm9DaGlwSW5wdXQgaW5zaWRlIG9mIHRoaXMgY2hpcC1saXN0IGhhcyBmb2N1cy4gKi9cbiAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLl9jaGlwSW5wdXQgJiYgdGhpcy5fY2hpcElucHV0LmZvY3VzZWQpIHx8IHRoaXMuX2hhc0ZvY3VzZWRDaGlwKCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICghdGhpcy5fY2hpcElucHV0IHx8IHRoaXMuX2NoaXBJbnB1dC5lbXB0eSkgJiYgKCF0aGlzLmNoaXBzIHx8IHRoaXMuY2hpcHMubGVuZ3RoID09PSAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGdldCBzaG91bGRMYWJlbEZsb2F0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5lbXB0eSB8fCB0aGlzLmZvY3VzZWQ7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubmdDb250cm9sID8gISF0aGlzLm5nQ29udHJvbC5kaXNhYmxlZCA6IHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9zeW5jQ2hpcHNTdGF0ZSgpO1xuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogT3JpZW50YXRpb24gb2YgdGhlIGNoaXAgbGlzdC4gKi9cbiAgQElucHV0KCdhcmlhLW9yaWVudGF0aW9uJykgYXJpYU9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGlzIGNoaXAgbGlzdCBpcyBzZWxlY3RhYmxlLiBXaGVuIGEgY2hpcCBsaXN0IGlzIG5vdCBzZWxlY3RhYmxlLFxuICAgKiB0aGUgc2VsZWN0ZWQgc3RhdGVzIGZvciBhbGwgdGhlIGNoaXBzIGluc2lkZSB0aGUgY2hpcCBsaXN0IGFyZSBhbHdheXMgaWdub3JlZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RhYmxlO1xuICB9XG4gIHNldCBzZWxlY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5jaGlwcy5mb3JFYWNoKChjaGlwKSA9PiAoY2hpcC5fY2hpcExpc3RTZWxlY3RhYmxlID0gdGhpcy5fc2VsZWN0YWJsZSkpO1xuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgX3NlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdXNlclRhYkluZGV4ID0gdmFsdWU7XG4gICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBjaGlwcycgc2VsZWN0aW9uIGNoYW5nZSBldmVudHMuICovXG4gIGdldCBjaGlwU2VsZWN0aW9uQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE5vdm9DaGlwU2VsZWN0aW9uQ2hhbmdlPiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuY2hpcHMubWFwKChjaGlwKSA9PiBjaGlwLnNlbGVjdGlvbkNoYW5nZSkpO1xuICB9XG5cbiAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIGNoaXBzJyBmb2N1cyBjaGFuZ2UgZXZlbnRzLiAqL1xuICBnZXQgY2hpcEZvY3VzQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE5vdm9DaGlwRXZlbnQ+IHtcbiAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5jaGlwcy5tYXAoKGNoaXApID0+IGNoaXAuX29uRm9jdXMpKTtcbiAgfVxuXG4gIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBjaGlwcycgYmx1ciBjaGFuZ2UgZXZlbnRzLiAqL1xuICBnZXQgY2hpcEJsdXJDaGFuZ2VzKCk6IE9ic2VydmFibGU8Tm92b0NoaXBFdmVudD4ge1xuICAgIHJldHVybiBtZXJnZSguLi50aGlzLmNoaXBzLm1hcCgoY2hpcCkgPT4gY2hpcC5fb25CbHVyKSk7XG4gIH1cblxuICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgY2hpcHMnIHJlbW92ZSBjaGFuZ2UgZXZlbnRzLiAqL1xuICBnZXQgY2hpcFJlbW92ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxOb3ZvQ2hpcEV2ZW50PiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuY2hpcHMubWFwKChjaGlwKSA9PiBjaGlwLnJlbW92ZWQpKTtcbiAgfVxuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIGNoaXAgbGlzdCB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkIGJ5IHRoZSB1c2VyLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8Tm92b0NoaXBMaXN0Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b0NoaXBMaXN0Q2hhbmdlPigpO1xuXG4gIC8qKlxuICAgKiBFdmVudCB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSByYXcgdmFsdWUgb2YgdGhlIGNoaXAtbGlzdCBjaGFuZ2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5XG4gICAqIHRvIGZhY2lsaXRhdGUgdGhlIHR3by13YXkgYmluZGluZyBmb3IgdGhlIGB2YWx1ZWAgaW5wdXQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKiogVGhlIGNoaXAgY29tcG9uZW50cyBjb250YWluZWQgd2l0aGluIHRoaXMgY2hpcCBsaXN0LiAqL1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9DaGlwRWxlbWVudCwge1xuICAgIC8vIFdlIG5lZWQgdG8gdXNlIGBkZXNjZW5kYW50czogdHJ1ZWAsIGJlY2F1c2UgSXZ5IHdpbGwgbm8gbG9uZ2VyIG1hdGNoXG4gICAgLy8gaW5kaXJlY3QgZGVzY2VuZGFudHMgaWYgaXQncyBsZWZ0IGFzIGZhbHNlLlxuICAgIGRlc2NlbmRhbnRzOiB0cnVlLFxuICB9KVxuICBjaGlwczogUXVlcnlMaXN0PE5vdm9DaGlwRWxlbWVudD47XG5cbiAgLyoqIEBkb2NzLXByaXZhdGUgSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBOb3ZvRmllbGRDb250cm9sLiAqL1xuICBsYXN0S2V5VmFsdWU6IHN0cmluZyA9IG51bGw7XG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTm92b0ZpZWxkQ29udHJvbC4qL1xuICBsYXN0Q2FyZXRQb3NpdGlvbjogbnVtYmVyIHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICkge1xuICAgIHN1cGVyKF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIF9wYXJlbnRGb3JtLCBfcGFyZW50Rm9ybUdyb3VwLCBuZ0NvbnRyb2wpO1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyPE5vdm9DaGlwRWxlbWVudD4odGhpcy5jaGlwcylcbiAgICAgIC53aXRoV3JhcCgpXG4gICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKVxuICAgICAgLndpdGhIb21lQW5kRW5kKClcbiAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA6ICdsdHInKTtcblxuICAgIGlmICh0aGlzLl9kaXIpIHtcbiAgICAgIHRoaXMuX2Rpci5jaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKChkaXIpID0+IHRoaXMuX2tleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbihkaXIpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9rZXlNYW5hZ2VyLnRhYk91dC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fYWxsb3dGb2N1c0VzY2FwZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiB0aGUgbGlzdCBjaGFuZ2VzLCByZS1zdWJzY3JpYmVcbiAgICB0aGlzLmNoaXBzLmNoYW5nZXMucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgLy8gU2luY2UgdGhpcyBoYXBwZW5zIGFmdGVyIHRoZSBjb250ZW50IGhhcyBiZWVuXG4gICAgICAgIC8vIGNoZWNrZWQsIHdlIG5lZWQgdG8gZGVmZXIgaXQgdG8gdGhlIG5leHQgdGljay5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fc3luY0NoaXBzU3RhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3Jlc2V0Q2hpcHMoKTtcblxuICAgICAgLy8gUmVzZXQgY2hpcHMgc2VsZWN0ZWQvZGVzZWxlY3RlZCBzdGF0dXNcbiAgICAgIHRoaXMuX2luaXRpYWxpemVTZWxlY3Rpb24oKTtcblxuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIG5lZWQgdG8gdXBkYXRlIG91ciB0YWIgaW5kZXhcbiAgICAgIHRoaXMuX3VwZGF0ZVRhYkluZGV4KCk7XG5cbiAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgZGVzdHJveWVkIGNoaXAgYW5kIG5lZWQgdG8gcmVmb2N1c1xuICAgICAgdGhpcy5fdXBkYXRlRm9jdXNGb3JEZXN0cm95ZWRDaGlwcygpO1xuXG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gUmVzZXQgY2hpcHMgc2VsZWN0ZWQvZGVzZWxlY3RlZCBzdGF0dXNcbiAgICB0aGlzLl9pbml0aWFsaXplU2VsZWN0aW9uKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxOb3ZvQ2hpcEVsZW1lbnQ+KHRoaXMubXVsdGlwbGUsIHVuZGVmaW5lZCwgZmFsc2UpO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gcmUtZXZhbHVhdGUgdGhpcyBvbiBldmVyeSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLCBiZWNhdXNlIHRoZXJlIGFyZSBzb21lXG4gICAgICAvLyBlcnJvciB0cmlnZ2VycyB0aGF0IHdlIGNhbid0IHN1YnNjcmliZSB0byAoZS5nLiBwYXJlbnQgZm9ybSBzdWJtaXNzaW9ucykuIFRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgd2hhdGV2ZXIgbG9naWMgaXMgaW4gaGVyZSBoYXMgdG8gYmUgc3VwZXIgbGVhbiBvciB3ZSByaXNrIGRlc3Ryb3lpbmcgdGhlIHBlcmZvcm1hbmNlLlxuICAgICAgdGhpcy51cGRhdGVFcnJvclN0YXRlKCk7XG5cbiAgICAgIGlmICh0aGlzLm5nQ29udHJvbC5kaXNhYmxlZCAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9ICEhdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuXG4gICAgdGhpcy5fZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgfVxuXG4gIC8qKiBBc3NvY2lhdGVzIGFuIEhUTUwgaW5wdXQgZWxlbWVudCB3aXRoIHRoaXMgY2hpcCBsaXN0LiAqL1xuICByZWdpc3RlcklucHV0KGlucHV0RWxlbWVudDogTm92b0NoaXBUZXh0Q29udHJvbCk6IHZvaWQge1xuICAgIHRoaXMuX2NoaXBJbnB1dCA9IGlucHV0RWxlbWVudDtcblxuICAgIC8vIFdlIHVzZSB0aGlzIGF0dHJpYnV0ZSB0byBtYXRjaCB0aGUgY2hpcCBsaXN0IHRvIGl0cyBpbnB1dCBpbiB0ZXN0IGhhcm5lc3Nlcy5cbiAgICAvLyBTZXQgdGhlIGF0dHJpYnV0ZSBkaXJlY3RseSBoZXJlIHRvIGF2b2lkIFwiY2hhbmdlZCBhZnRlciBjaGVja2VkXCIgZXJyb3JzLlxuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbm92by1jaGlwLWlucHV0JywgaW5wdXRFbGVtZW50LmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHNldERlc2NyaWJlZEJ5SWRzKGlkczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9hcmlhRGVzY3JpYmVkYnkgPSBpZHMuam9pbignICcpO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMuX3NldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWUsIGZhbHNlKTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBhZGRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLnZhbHVlLCB2YWx1ZV07XG4gICAgdGhpcy5fY2hpcElucHV0LmNsZWFyVmFsdWUoKTtcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuZmlsdGVyKChpdCkgPT4gIXRoaXMuY29tcGFyZVdpdGgoaXQsIHZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE5vdm9GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX29yaWdpbmF0ZXNGcm9tQ2hpcChldmVudCkpIHtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIGNoaXAgaW4gdGhpcyBjaGlwIGxpc3QsIG9yIHRoZSBhc3NvY2lhdGVkIGlucHV0IHdoZW4gdGhlcmVcbiAgICogYXJlIG5vIGVsaWdpYmxlIGNoaXBzLlxuICAgKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVE9ETzogQVJJQSBzYXlzIHRoaXMgc2hvdWxkIGZvY3VzIHRoZSBmaXJzdCBgc2VsZWN0ZWRgIGNoaXAgaWYgYW55IGFyZSBzZWxlY3RlZC5cbiAgICAvLyBGb2N1cyBvbiBmaXJzdCBlbGVtZW50IGlmIHRoZXJlJ3Mgbm8gY2hpcElucHV0IGluc2lkZSBjaGlwLWxpc3RcbiAgICBpZiAodGhpcy5fY2hpcElucHV0ICYmIHRoaXMuX2NoaXBJbnB1dC5mb2N1c2VkKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfSBlbHNlIGlmICh0aGlzLl9jaGlwSW5wdXQpIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5fZm9jdXNJbnB1dChvcHRpb25zKSk7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNoaXBzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEF0dGVtcHQgdG8gZm9jdXMgYW4gaW5wdXQgaWYgd2UgaGF2ZSBvbmUuICovXG4gIF9mb2N1c0lucHV0KG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5fY2hpcElucHV0KSB7XG4gICAgICB0aGlzLl9jaGlwSW5wdXQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgZXZlbnRzIHRvIHRoZSBrZXlib2FyZCBtYW5hZ2VyLiBBdmFpbGFibGUgaGVyZSBmb3IgdGVzdHMuXG4gICAqL1xuICBfa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgIC8vIElmIHRoZXkgYXJlIG9uIGFuIGVtcHR5IGlucHV0IGFuZCBoaXQgYmFja3NwYWNlLCBmb2N1cyB0aGUgbGFzdCBjaGlwXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gS2V5LkJhY2tzcGFjZSAmJiB0aGlzLl9pc0lucHV0RW1wdHkodGFyZ2V0KSkge1xuICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3ZvLWNoaXAnKSkge1xuICAgICAgdGhpcy5fa2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0aGUgdGFiIGluZGV4IGFzIHlvdSBzaG91bGQgbm90IGJlIGFsbG93ZWQgdG8gZm9jdXMgYW4gZW1wdHkgbGlzdC5cbiAgICovXG4gIHByb3RlY3RlZCBfdXBkYXRlVGFiSW5kZXgoKTogdm9pZCB7XG4gICAgLy8gSWYgd2UgaGF2ZSAwIGNoaXBzLCB3ZSBzaG91bGQgbm90IGFsbG93IGtleWJvYXJkIGZvY3VzXG4gICAgdGhpcy5fdGFiSW5kZXggPSB0aGlzLl91c2VyVGFiSW5kZXggfHwgKHRoaXMuY2hpcHMubGVuZ3RoID09PSAwID8gLTEgOiAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgYW1vdW50IG9mIGNoaXBzIGNoYW5nZWQsIHdlIG5lZWQgdG8gdXBkYXRlIHRoZVxuICAgKiBrZXkgbWFuYWdlciBzdGF0ZSBhbmQgZm9jdXMgdGhlIG5leHQgY2xvc2VzdCBjaGlwLlxuICAgKi9cbiAgcHJvdGVjdGVkIF91cGRhdGVGb2N1c0ZvckRlc3Ryb3llZENoaXBzKCkge1xuICAgIC8vIE1vdmUgZm9jdXMgdG8gdGhlIGNsb3Nlc3QgY2hpcC4gSWYgbm8gb3RoZXIgY2hpcHMgcmVtYWluLCBmb2N1cyB0aGUgY2hpcC1saXN0IGl0c2VsZi5cbiAgICBpZiAodGhpcy5fbGFzdERlc3Ryb3llZENoaXBJbmRleCAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5jaGlwcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbmV3Q2hpcEluZGV4ID0gTWF0aC5taW4odGhpcy5fbGFzdERlc3Ryb3llZENoaXBJbmRleCwgdGhpcy5jaGlwcy5sZW5ndGggLSAxKTtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKG5ld0NoaXBJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fbGFzdERlc3Ryb3llZENoaXBJbmRleCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVXRpbGl0eSB0byBlbnN1cmUgYWxsIGluZGV4ZXMgYXJlIHZhbGlkLlxuICAgKlxuICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IHRvIGJlIGNoZWNrZWQuXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGluZGV4IGlzIHZhbGlkIGZvciBvdXIgbGlzdCBvZiBjaGlwcy5cbiAgICovXG4gIHByaXZhdGUgX2lzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLmNoaXBzLmxlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzSW5wdXRFbXB0eShlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xuICAgICAgbGV0IGlucHV0ID0gZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgcmV0dXJuICFpbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZTogYW55LCBpc1VzZXJJbnB1dDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICB0aGlzLl9jbGVhclNlbGVjdGlvbigpO1xuICAgIHRoaXMuY2hpcHMuZm9yRWFjaCgoY2hpcCkgPT4gY2hpcC5kZXNlbGVjdCgpKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoY3VycmVudFZhbHVlKSA9PiB0aGlzLl9zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUsIGlzVXNlcklucHV0KSk7XG4gICAgICB0aGlzLl9zb3J0VmFsdWVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdDaGlwID0gdGhpcy5fc2VsZWN0VmFsdWUodmFsdWUsIGlzVXNlcklucHV0KTtcblxuICAgICAgLy8gU2hpZnQgZm9jdXMgdG8gdGhlIGFjdGl2ZSBpdGVtLiBOb3RlIHRoYXQgd2Ugc2hvdWxkbid0IGRvIHRoaXMgaW4gbXVsdGlwbGVcbiAgICAgIC8vIG1vZGUsIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGF0IGNoaXAgdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIGxhc3QuXG4gICAgICBpZiAoY29ycmVzcG9uZGluZ0NoaXApIHtcbiAgICAgICAgaWYgKGlzVXNlcklucHV0KSB7XG4gICAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGNvcnJlc3BvbmRpbmdDaGlwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbmQgc2VsZWN0cyB0aGUgY2hpcCBiYXNlZCBvbiBpdHMgdmFsdWUuXG4gICAqIEByZXR1cm5zIENoaXAgdGhhdCBoYXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3RWYWx1ZSh2YWx1ZTogYW55LCBpc1VzZXJJbnB1dDogYm9vbGVhbiA9IHRydWUpOiBOb3ZvQ2hpcEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdDaGlwID0gdGhpcy5jaGlwcy5maW5kKChjaGlwKSA9PiB7XG4gICAgICByZXR1cm4gY2hpcC52YWx1ZSAhPSBudWxsICYmIHRoaXMuX2NvbXBhcmVXaXRoKGNoaXAudmFsdWUsIHZhbHVlKTtcbiAgICB9KTtcblxuICAgIGlmIChjb3JyZXNwb25kaW5nQ2hpcCkge1xuICAgICAgaXNVc2VySW5wdXQgPyBjb3JyZXNwb25kaW5nQ2hpcC5zZWxlY3RWaWFJbnRlcmFjdGlvbigpIDogY29ycmVzcG9uZGluZ0NoaXAuc2VsZWN0KCk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoY29ycmVzcG9uZGluZ0NoaXApO1xuICAgIH1cblxuICAgIHJldHVybiBjb3JyZXNwb25kaW5nQ2hpcDtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRpYWxpemVTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5uZ0NvbnRyb2wudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3RzIGV2ZXJ5IGNoaXAgaW4gdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBza2lwIENoaXAgdGhhdCBzaG91bGQgbm90IGJlIGRlc2VsZWN0ZWQuXG4gICAqL1xuICBwcml2YXRlIF9jbGVhclNlbGVjdGlvbihza2lwPzogTm92b0NoaXBFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICB0aGlzLmNoaXBzLmZvckVhY2goKGNoaXApID0+IHtcbiAgICAgIGlmIChjaGlwICE9PSBza2lwKSB7XG4gICAgICAgIGNoaXAuZGVzZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdGhlIG1vZGVsIHZhbHVlcywgZW5zdXJpbmcgdGhhdCB0aGV5IGtlZXAgdGhlIHNhbWVcbiAgICogb3JkZXIgdGhhdCB0aGV5IGhhdmUgaW4gdGhlIHBhbmVsLlxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydFZhbHVlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG5cbiAgICAgIHRoaXMuY2hpcHMuZm9yRWFjaCgoY2hpcCkgPT4ge1xuICAgICAgICBpZiAoY2hpcC5zZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChjaGlwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEVtaXRzIGNoYW5nZSBldmVudCB0byBzZXQgdGhlIG1vZGVsIHZhbHVlLiAqL1xuICBwcml2YXRlIF9wcm9wYWdhdGVDaGFuZ2VzKGZhbGxiYWNrVmFsdWU/OiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgdmFsdWVUb0VtaXQ6IGFueSA9IG51bGw7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnNlbGVjdGVkKSkge1xuICAgICAgdmFsdWVUb0VtaXQgPSB0aGlzLnNlbGVjdGVkLm1hcCgoY2hpcCkgPT4gY2hpcC52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZCA/IHRoaXMuc2VsZWN0ZWQudmFsdWUgOiBmYWxsYmFja1ZhbHVlO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlVG9FbWl0O1xuICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE5vdm9DaGlwTGlzdENoYW5nZSh0aGlzLCB2YWx1ZVRvRW1pdCkpO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZVRvRW1pdCk7XG4gICAgdGhpcy5fb25DaGFuZ2UodmFsdWVUb0VtaXQpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIFdoZW4gYmx1cnJlZCwgbWFyayB0aGUgZmllbGQgYXMgdG91Y2hlZCB3aGVuIGZvY3VzIG1vdmVkIG91dHNpZGUgdGhlIGNoaXAgbGlzdC4gKi9cbiAgX2JsdXIoKSB7XG4gICAgaWYgKCF0aGlzLl9oYXNGb2N1c2VkQ2hpcCgpKSB7XG4gICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgaWYgKHRoaXMuX2NoaXBJbnB1dCkge1xuICAgICAgICAvLyBJZiB0aGVyZSdzIGEgY2hpcCBpbnB1dCwgd2Ugc2hvdWxkIGNoZWNrIHdoZXRoZXIgdGhlIGZvY3VzIG1vdmVkIHRvIGNoaXAgaW5wdXQuXG4gICAgICAgIC8vIElmIHRoZSBmb2N1cyBpcyBub3QgbW92ZWQgdG8gY2hpcCBpbnB1dCwgbWFyayB0aGUgZmllbGQgYXMgdG91Y2hlZC4gSWYgdGhlIGZvY3VzIG1vdmVkXG4gICAgICAgIC8vIHRvIGNoaXAgaW5wdXQsIGRvIG5vdGhpbmcuXG4gICAgICAgIC8vIFRpbWVvdXQgaXMgbmVlZGVkIHRvIHdhaXQgZm9yIHRoZSBmb2N1cygpIGV2ZW50IHRyaWdnZXIgb24gY2hpcCBpbnB1dC5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlcmUncyBubyBjaGlwIGlucHV0LCB0aGVuIG1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQuXG4gICAgICAgIHRoaXMuX21hcmtBc1RvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogTWFyayB0aGUgZmllbGQgYXMgdG91Y2hlZCAqL1xuICBfbWFya0FzVG91Y2hlZCgpIHtcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgYHRhYmluZGV4YCBmcm9tIHRoZSBjaGlwIGxpc3QgYW5kIHJlc2V0cyBpdCBiYWNrIGFmdGVyd2FyZHMsIGFsbG93aW5nIHRoZVxuICAgKiB1c2VyIHRvIHRhYiBvdXQgb2YgaXQuIFRoaXMgcHJldmVudHMgdGhlIGxpc3QgZnJvbSBjYXB0dXJpbmcgZm9jdXMgYW5kIHJlZGlyZWN0aW5nXG4gICAqIGl0IGJhY2sgdG8gdGhlIGZpcnN0IGNoaXAsIGNyZWF0aW5nIGEgZm9jdXMgdHJhcCwgaWYgaXQgdXNlciB0cmllcyB0byB0YWIgYXdheS5cbiAgICovXG4gIF9hbGxvd0ZvY3VzRXNjYXBlKCkge1xuICAgIGlmICh0aGlzLl90YWJJbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX3RhYkluZGV4ID0gLTE7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHRoaXMuX3VzZXJUYWJJbmRleCB8fCAwO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Q2hpcHMoKSB7XG4gICAgdGhpcy5fZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICB0aGlzLl9saXN0ZW5Ub0NoaXBzRm9jdXMoKTtcbiAgICB0aGlzLl9saXN0ZW5Ub0NoaXBzU2VsZWN0aW9uKCk7XG4gICAgdGhpcy5fbGlzdGVuVG9DaGlwc1JlbW92ZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Ryb3BTdWJzY3JpcHRpb25zKCkge1xuICAgIGlmICh0aGlzLl9jaGlwRm9jdXNTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2NoaXBGb2N1c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2hpcEZvY3VzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hpcEJsdXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2NoaXBCbHVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9jaGlwQmx1clN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NoaXBTZWxlY3Rpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2NoaXBTZWxlY3Rpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NoaXBTZWxlY3Rpb25TdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jaGlwUmVtb3ZlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9jaGlwUmVtb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9jaGlwUmVtb3ZlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogTGlzdGVucyB0byB1c2VyLWdlbmVyYXRlZCBzZWxlY3Rpb24gZXZlbnRzIG9uIGVhY2ggY2hpcC4gKi9cbiAgcHJpdmF0ZSBfbGlzdGVuVG9DaGlwc1NlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGlwU2VsZWN0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5jaGlwU2VsZWN0aW9uQ2hhbmdlcy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5zb3VyY2Uuc2VsZWN0ZWQgPyB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoZXZlbnQuc291cmNlKSA6IHRoaXMuX3NlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KGV2ZW50LnNvdXJjZSk7XG5cbiAgICAgIC8vIEZvciBzaW5nbGUgc2VsZWN0aW9uIGNoaXAgbGlzdCwgbWFrZSBzdXJlIHRoZSBkZXNlbGVjdGVkIHZhbHVlIGlzIHVuc2VsZWN0ZWQuXG4gICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5jaGlwcy5mb3JFYWNoKChjaGlwKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3Rpb25Nb2RlbC5pc1NlbGVjdGVkKGNoaXApICYmIGNoaXAuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNoaXAuZGVzZWxlY3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuaXNVc2VySW5wdXQpIHtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRlQ2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIExpc3RlbnMgdG8gdXNlci1nZW5lcmF0ZWQgc2VsZWN0aW9uIGV2ZW50cyBvbiBlYWNoIGNoaXAuICovXG4gIHByaXZhdGUgX2xpc3RlblRvQ2hpcHNGb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGlwRm9jdXNTdWJzY3JpcHRpb24gPSB0aGlzLmNoaXBGb2N1c0NoYW5nZXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgbGV0IGNoaXBJbmRleDogbnVtYmVyID0gdGhpcy5jaGlwcy50b0FycmF5KCkuaW5kZXhPZihldmVudC5jaGlwKTtcblxuICAgICAgaWYgKHRoaXMuX2lzVmFsaWRJbmRleChjaGlwSW5kZXgpKSB7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShjaGlwSW5kZXgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY2hpcEJsdXJTdWJzY3JpcHRpb24gPSB0aGlzLmNoaXBCbHVyQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fYmx1cigpO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9DaGlwc1JlbW92ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fY2hpcFJlbW92ZVN1YnNjcmlwdGlvbiA9IHRoaXMuY2hpcFJlbW92ZUNoYW5nZXMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgY2hpcCA9IGV2ZW50LmNoaXA7XG4gICAgICBjb25zdCBjaGlwSW5kZXggPSB0aGlzLmNoaXBzLnRvQXJyYXkoKS5pbmRleE9mKGV2ZW50LmNoaXApO1xuICAgICAgdGhpcy5yZW1vdmVWYWx1ZShjaGlwLnZhbHVlKTtcbiAgICAgIC8vIEluIGNhc2UgdGhlIGNoaXAgdGhhdCB3aWxsIGJlIHJlbW92ZWQgaXMgY3VycmVudGx5IGZvY3VzZWQsIHdlIHRlbXBvcmFyaWx5IHN0b3JlXG4gICAgICAvLyB0aGUgaW5kZXggaW4gb3JkZXIgdG8gYmUgYWJsZSB0byBkZXRlcm1pbmUgYW4gYXBwcm9wcmlhdGUgc2libGluZyBjaGlwIHRoYXQgd2lsbFxuICAgICAgLy8gcmVjZWl2ZSBmb2N1cy5cbiAgICAgIGlmICh0aGlzLl9pc1ZhbGlkSW5kZXgoY2hpcEluZGV4KSAmJiBjaGlwLl9oYXNGb2N1cykge1xuICAgICAgICB0aGlzLl9sYXN0RGVzdHJveWVkQ2hpcEluZGV4ID0gY2hpcEluZGV4O1xuICAgICAgfVxuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGFuIGV2ZW50IGNvbWVzIGZyb20gaW5zaWRlIGEgY2hpcCBlbGVtZW50LiAqL1xuICBwcml2YXRlIF9vcmlnaW5hdGVzRnJvbUNoaXAoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudCAmJiBjdXJyZW50RWxlbWVudCAhPT0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3ZvLWNoaXAnKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgb2YgdGhlIGNoaXBzIGlzIGZvY3VzZWQuICovXG4gIHByaXZhdGUgX2hhc0ZvY3VzZWRDaGlwKCkge1xuICAgIHJldHVybiB0aGlzLmNoaXBzICYmIHRoaXMuY2hpcHMuc29tZSgoY2hpcCkgPT4gY2hpcC5faGFzRm9jdXMpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBsaXN0J3Mgc3RhdGUgd2l0aCB0aGUgaW5kaXZpZHVhbCBjaGlwcy4gKi9cbiAgcHJpdmF0ZSBfc3luY0NoaXBzU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMuY2hpcHMuZm9yRWFjaCgoY2hpcCkgPT4ge1xuICAgICAgICBjaGlwLl9jaGlwTGlzdERpc2FibGVkID0gdGhpcy5fZGlzYWJsZWQ7XG4gICAgICAgIGNoaXAuX2NoaXBMaXN0TXVsdGlwbGUgPSB0aGlzLm11bHRpcGxlO1xuICAgICAgICBjaGlwLl9jaGlwTGlzdFNlbGVjdGFibGUgPSB0aGlzLnNlbGVjdGFibGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbXVsdGlwbGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlcXVpcmVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0YWJsZTogQm9vbGVhbklucHV0O1xufVxuIl19