// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { ReplaySubject } from 'rxjs';
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/picker";
import * as i5 from "novo-elements/elements/icon";
import * as i6 from "novo-elements/elements/common";
import * as i7 from "./Chip";
import * as i8 from "./pipe/AvatarType.pipe";
// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoChipsElement),
    multi: true,
};
export class NovoChipsElement {
    set disablePickerInput(v) {
        this._disablePickerInput = coerceBooleanProperty(v);
    }
    get disablePickerInput() {
        return this._disablePickerInput;
    }
    constructor(element, componentUtils, labels) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.labels = labels;
        this.CHIPS_SHOWN_MAX = 999;
        this.closeOnSelect = false;
        this.placeholder = '';
        this.allowCustomValues = false;
        this._disablePickerInput = false;
        this.changed = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.typing = new EventEmitter();
        this.items = [];
        this.selected = null;
        this.config = {};
        // private data model
        this._value = '';
        this._items = new ReplaySubject(1);
        // Placeholders for the callbacks
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.hiddenChipsLimit = this.source.hiddenChipsLimit;
        this._hiddenChipsLimit = this.hiddenChipsLimit; // copy of original chip limit
        this.setItems();
    }
    get value() {
        return this._value;
    }
    set value(selected) {
        this.itemToAdd = '';
        this._value = selected;
    }
    clearValue() {
        this.items = [];
        this.updateHiddenChips();
        this._items.next(this.items);
        this.value = null;
        this._propagateChanges();
    }
    setItems() {
        this.items = [];
        if (this.model && Array.isArray(this.model)) {
            const noLabels = [];
            for (const value of this.model) {
                let label;
                if (this.source && this.source.format && Helpers.validateInterpolationProps(this.source.format, value)) {
                    label = Helpers.interpolate(this.source.format, value);
                }
                if (this.source && label && label !== this.source.format) {
                    this.items.push({
                        value,
                        label,
                    });
                }
                else if (this.source.getLabels && typeof this.source.getLabels === 'function') {
                    noLabels.push(value);
                }
                else if (this.source.options && Array.isArray(this.source.options)) {
                    this.items.push(this.getLabelFromOptions(value));
                }
                else if (this.source.categoryMap && this.source.categoryMap.size) {
                    this.items.push(value);
                }
                else {
                    this.items.push({
                        value,
                        label: value,
                    });
                }
            }
            if (noLabels.length > 0 && this.source && this.source.getLabels && typeof this.source.getLabels === 'function') {
                this.source.getLabels(noLabels).then((result) => {
                    for (const value of result) {
                        if (value.hasOwnProperty('label')) {
                            this.items.push({
                                value,
                                label: value.label,
                            });
                        }
                        else if (this.source.options && Array.isArray(this.source.options)) {
                            this.items.push(this.getLabelFromOptions(value));
                        }
                        else {
                            this.items.push(value);
                        }
                    }
                    this._finalizeItemValue();
                });
            }
        }
        this._finalizeItemValue();
    }
    getLabelFromOptions(value) {
        let id = value;
        let optLabel = this.source.options.find((val) => val.value === value);
        if (!optLabel && value.hasOwnProperty('id')) {
            optLabel = this.source.options.find((val) => val.value === value.id);
            id = value.id;
        }
        return {
            value: id,
            label: optLabel ? optLabel.label : value,
        };
    }
    deselectAll(event) {
        this.selected = null;
        this.hidePreview();
    }
    select(event, item) {
        this.blur.emit(event);
        this.deselectAll();
        this.selected = item;
        this.showPreview();
    }
    deselect(event, item) {
        this.blur.emit(event);
        this.deselectAll();
    }
    onTyping(event) {
        this.typing.emit(event);
    }
    onFocus(event) {
        this.deselectAll();
        this.element.nativeElement.classList.add('selected');
        this.focus.emit(event);
    }
    add(event) {
        if (event && !(event instanceof Event)) {
            this.items.push(event);
            this.updateHiddenChips();
            this.value = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
            // Set focus on the picker
            const input = this.element.nativeElement.querySelector('novo-picker > input');
            if (input) {
                input.focus();
            }
        }
        this._items.next(this.items);
        this._propagateChanges();
    }
    updateHiddenChips() {
        this.hiddenChipsCount = Math.max(0, this.items.length - this._hiddenChipsLimit);
        if (!this.hiddenChipsCount && this.hiddenChipsLimit === this.CHIPS_SHOWN_MAX)
            this.hiddenChipsLimit = this._hiddenChipsLimit; // reset hiddenChipsLimit to original #
    }
    toggleHiddenChips() {
        this.hiddenChipsLimit = this.hiddenChipsLimit === this.CHIPS_SHOWN_MAX ? this._hiddenChipsLimit : this.CHIPS_SHOWN_MAX;
    }
    remove(event, item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.updateHiddenChips();
        this.deselectAll();
        this.value = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
        this._items.next(this.items);
        this._propagateChanges();
    }
    onKeyDown(event) {
        if (event.key === "Backspace" /* Key.Backspace */) {
            if (event.target && event.target.value.length === 0 && this.items.length) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (this.selected) {
                    this.remove(event, this.selected);
                }
                else {
                    this.select(event, this.items[this.items.length - 1]);
                }
            }
        }
    }
    // Set touched on blur
    onTouched(e) {
        this.element.nativeElement.classList.remove('selected');
        this.onModelTouched();
        this.blur.emit(e);
    }
    writeValue(model) {
        this.model = model;
        this.setItems();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this._disablePickerInput = disabled;
    }
    _finalizeItemValue() {
        this._items.next(this.items);
        const valueToSet = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
        if (Helpers.isBlank(this.value) !== Helpers.isBlank(valueToSet) || JSON.stringify(this.value) !== JSON.stringify(valueToSet)) {
            this.value = valueToSet;
        }
    }
    /** Emits change event to set the model value. */
    _propagateChanges(fallbackValue) {
        this.changed.emit({ value: this.value?.length ? this.value : '', rawValue: this.items });
        this.onModelChange(this.value);
    }
    /**
     * @name showPreview
     *
     * @description This method creates an instance of the preview (called popup) and adds all the bindings to that
     * instance. Will reuse the popup or create a new one if it does not already exist. Will only work if there is
     * a previewTemplate given in the config.
     */
    showPreview() {
        if (this.source.previewTemplate) {
            if (!this.popup) {
                this.popup = this.componentUtils.append(this.source.previewTemplate, this.preview);
            }
            this.popup.instance.match = { data: this.selected.data ?? this.selected.value };
        }
    }
    /**
     * @name hidePreview
     *
     * @description - This method deletes the preview popup from the DOM.
     */
    hidePreview() {
        if (this.popup) {
            this.popup.destroy();
            this.popup = null;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoChipsElement, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoChipsElement, selector: "chips,novo-chips", inputs: { closeOnSelect: "closeOnSelect", placeholder: "placeholder", source: "source", maxlength: "maxlength", type: "type", allowCustomValues: "allowCustomValues", disablePickerInput: "disablePickerInput", value: "value" }, outputs: { changed: "changed", focus: "focus", blur: "blur", typing: "typing" }, host: { properties: { "class.with-value": "items.length > 0", "class.disabled": "disablePickerInput" } }, providers: [CHIPS_VALUE_ACCESSOR], viewQueries: [{ propertyName: "preview", first: true, predicate: ["preview"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: `
    <div class="novo-chip-container">
      <novo-chip
        *ngFor="let item of _items | async | slice: 0:hiddenChipsLimit"
        [class.selected]="item == selected"
        [selectable]="true"
        [disabled]="disablePickerInput"
        (removed)="remove($event, item)"
        (selectionChange)="select($event, item)"
        (deselect)="deselect($event, item)"
      >
        <novo-icon *ngIf="item | avatarType:type as avatarType" class="txc-{{ avatarType }}" novoChipAvatar>circle</novo-icon>
        {{ item.label }}
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
      <div *ngIf="hiddenChipsCount" class="hidden-chips-toggle" (click)="toggleHiddenChips()">
        <novo-label *ngIf="hiddenChipsLimit !== CHIPS_SHOWN_MAX" color="positive">+ {{ hiddenChipsCount }} {{ labels.more }} </novo-label>
        <novo-label *ngIf="hiddenChipsLimit === CHIPS_SHOWN_MAX" color="positive"><novo-icon>sort-asc</novo-icon> {{labels.showLess}}</novo-label>
      </div>
      <div class="chip-input-container" *ngIf="!maxlength || (maxlength && items.length < maxlength)">
        <novo-picker
          clearValueOnSelect="true"
          [closeOnSelect]="closeOnSelect"
          [config]="source"
          [disablePickerInput]="disablePickerInput"
          [placeholder]="placeholder"
          [(ngModel)]="itemToAdd"
          (select)="add($event)"
          (keydown)="onKeyDown($event)"
          (focus)="onFocus($event)"
          (typing)="onTyping($event)"
          (blur)="onTouched($event)"
          [selected]="items"
          [overrideElement]="element"
          [allowCustomValues]="allowCustomValues"
        >
        </novo-picker>
      </div>
    </div>
    <div class="preview-container">
      <span #preview></span>
    </div>
    <i class="bhi-search" [class.has-value]="items.length" *ngIf="!disablePickerInput"></i>
    <label class="clear-all" *ngIf="items.length && !disablePickerInput" (click)="clearValue()"
      >{{ labels.clearAll }} <i class="bhi-times"></i
    ></label>
  `, isInline: true, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid #afb9c0;transition:all .2s ease-in-out;position:relative;padding:2px 0}:host .hidden-chips-toggle{cursor:pointer;padding-left:.5rem;line-height:2.7rem}:host.with-value{margin-bottom:20px}:host:hover{border-bottom:1px solid #5f6d78}:host.selected,:host.selected:hover{border-bottom:1px solid #4a89dc}:host.selected+i,:host.selected:hover+i{color:#4a89dc}:host.disabled{border-bottom-style:dashed!important}:host .chip-input-container{flex:1 15rem;padding-left:1rem}:host .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}:host .chip-input-container input:focus{outline:none}:host .novo-chip-container{display:flex;flex-flow:row wrap;gap:.4rem;align-items:center}:host label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:#da4453;cursor:pointer;display:flex;align-items:center}:host label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}:host i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:#3d464d}:host+i{position:absolute;right:0;bottom:7px}:host.with-value{margin-bottom:0}:host novo-picker{position:inherit;padding-bottom:0}:host novo-picker>::ng-deep input{border:none;border-bottom:none!important}:host novo-picker>::ng-deep input:disabled{border-bottom:none!important}:host novo-picker>::ng-deep i{display:none}:host novo-picker div.picker-results-container{left:0}:host picker-results{position:absolute;color:#000}:host picker-results novo-list{max-height:49vh;overflow:auto}:host picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}:host picker-results novo-list novo-list-item>div{width:100%}:host picker-results novo-list novo-list-item.active{background-color:#e0ebf9}:host picker-results novo-list novo-list-item:hover{background-color:#e0ebf9}:host picker-results novo-list novo-list-item item-content{flex-flow:row wrap}:host picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host picker-results .error-results,:host picker-results .no-recents,:host picker-results .null-results{text-align:center;padding:1em 0 4em}:host picker-results .error-results>i,:host picker-results .no-recents>i,:host picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}:host picker-results .error-results>h4,:host picker-results .error-results>p,:host picker-results .no-recents>h4,:host picker-results .no-recents>p,:host picker-results .null-results>h4,:host picker-results .null-results>p{margin:0;max-width:none;padding:0}:host picker-results .error-results>h4,:host picker-results .no-recents>h4,:host picker-results .null-results>h4{font-weight:500}:host picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .preview-container entity-picker-result{background:#fff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}:host .preview-container entity-picker-result .novo-list-item{flex:0 0}:host .preview-container entity-picker-result .novo-list-item>div{width:100%}:host .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "allowCustomValues", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }, { kind: "component", type: i5.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i6.NovoLabel, selector: "novo-label,[novo-label]" }, { kind: "component", type: i7.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i7.NovoChipAvatar, selector: "novo-chip-avatar, [novoChipAvatar]" }, { kind: "directive", type: i7.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.SlicePipe, name: "slice" }, { kind: "pipe", type: i8.AvatarTypePipe, name: "avatarType" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoChipsElement, decorators: [{
            type: Component,
            args: [{ selector: 'chips,novo-chips', providers: [CHIPS_VALUE_ACCESSOR], template: `
    <div class="novo-chip-container">
      <novo-chip
        *ngFor="let item of _items | async | slice: 0:hiddenChipsLimit"
        [class.selected]="item == selected"
        [selectable]="true"
        [disabled]="disablePickerInput"
        (removed)="remove($event, item)"
        (selectionChange)="select($event, item)"
        (deselect)="deselect($event, item)"
      >
        <novo-icon *ngIf="item | avatarType:type as avatarType" class="txc-{{ avatarType }}" novoChipAvatar>circle</novo-icon>
        {{ item.label }}
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
      <div *ngIf="hiddenChipsCount" class="hidden-chips-toggle" (click)="toggleHiddenChips()">
        <novo-label *ngIf="hiddenChipsLimit !== CHIPS_SHOWN_MAX" color="positive">+ {{ hiddenChipsCount }} {{ labels.more }} </novo-label>
        <novo-label *ngIf="hiddenChipsLimit === CHIPS_SHOWN_MAX" color="positive"><novo-icon>sort-asc</novo-icon> {{labels.showLess}}</novo-label>
      </div>
      <div class="chip-input-container" *ngIf="!maxlength || (maxlength && items.length < maxlength)">
        <novo-picker
          clearValueOnSelect="true"
          [closeOnSelect]="closeOnSelect"
          [config]="source"
          [disablePickerInput]="disablePickerInput"
          [placeholder]="placeholder"
          [(ngModel)]="itemToAdd"
          (select)="add($event)"
          (keydown)="onKeyDown($event)"
          (focus)="onFocus($event)"
          (typing)="onTyping($event)"
          (blur)="onTouched($event)"
          [selected]="items"
          [overrideElement]="element"
          [allowCustomValues]="allowCustomValues"
        >
        </novo-picker>
      </div>
    </div>
    <div class="preview-container">
      <span #preview></span>
    </div>
    <i class="bhi-search" [class.has-value]="items.length" *ngIf="!disablePickerInput"></i>
    <label class="clear-all" *ngIf="items.length && !disablePickerInput" (click)="clearValue()"
      >{{ labels.clearAll }} <i class="bhi-times"></i
    ></label>
  `, host: {
                        '[class.with-value]': 'items.length > 0',
                        '[class.disabled]': 'disablePickerInput',
                    }, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid #afb9c0;transition:all .2s ease-in-out;position:relative;padding:2px 0}:host .hidden-chips-toggle{cursor:pointer;padding-left:.5rem;line-height:2.7rem}:host.with-value{margin-bottom:20px}:host:hover{border-bottom:1px solid #5f6d78}:host.selected,:host.selected:hover{border-bottom:1px solid #4a89dc}:host.selected+i,:host.selected:hover+i{color:#4a89dc}:host.disabled{border-bottom-style:dashed!important}:host .chip-input-container{flex:1 15rem;padding-left:1rem}:host .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}:host .chip-input-container input:focus{outline:none}:host .novo-chip-container{display:flex;flex-flow:row wrap;gap:.4rem;align-items:center}:host label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:#da4453;cursor:pointer;display:flex;align-items:center}:host label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}:host i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:#3d464d}:host+i{position:absolute;right:0;bottom:7px}:host.with-value{margin-bottom:0}:host novo-picker{position:inherit;padding-bottom:0}:host novo-picker>::ng-deep input{border:none;border-bottom:none!important}:host novo-picker>::ng-deep input:disabled{border-bottom:none!important}:host novo-picker>::ng-deep i{display:none}:host novo-picker div.picker-results-container{left:0}:host picker-results{position:absolute;color:#000}:host picker-results novo-list{max-height:49vh;overflow:auto}:host picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}:host picker-results novo-list novo-list-item>div{width:100%}:host picker-results novo-list novo-list-item.active{background-color:#e0ebf9}:host picker-results novo-list novo-list-item:hover{background-color:#e0ebf9}:host picker-results novo-list novo-list-item item-content{flex-flow:row wrap}:host picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host picker-results .error-results,:host picker-results .no-recents,:host picker-results .null-results{text-align:center;padding:1em 0 4em}:host picker-results .error-results>i,:host picker-results .no-recents>i,:host picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}:host picker-results .error-results>h4,:host picker-results .error-results>p,:host picker-results .no-recents>h4,:host picker-results .no-recents>p,:host picker-results .null-results>h4,:host picker-results .null-results>p{margin:0;max-width:none;padding:0}:host picker-results .error-results>h4,:host picker-results .no-recents>h4,:host picker-results .null-results>h4{font-weight:500}:host picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .preview-container entity-picker-result{background:#fff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}:host .preview-container entity-picker-result .novo-list-item{flex:0 0}:host .preview-container entity-picker-result .novo-list-item>div{width:100%}:host .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.ComponentUtils }, { type: i1.NovoLabelService }], propDecorators: { closeOnSelect: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], source: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], type: [{
                type: Input
            }], allowCustomValues: [{
                type: Input
            }], disablePickerInput: [{
                type: Input
            }], changed: [{
                type: Output
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }], typing: [{
                type: Output
            }], preview: [{
                type: ViewChild,
                args: ['preview', { read: ViewContainerRef }]
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGlwcy9DaGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsU0FBUztBQUNULE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxPQUFPLEVBQU8sTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7OztBQUVuRCxzREFBc0Q7QUFDdEQsTUFBTSxvQkFBb0IsR0FBRztJQUMzQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBMERGLE1BQU0sT0FBTyxnQkFBZ0I7SUFjM0IsSUFDSSxrQkFBa0IsQ0FBQyxDQUFVO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQztJQStCRCxZQUFtQixPQUFtQixFQUFVLGNBQThCLEVBQVMsTUFBd0I7UUFBNUYsWUFBTyxHQUFQLE9B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O2dCQUlQLE9BQU87c0JBRE4sU0FBUzt1QkFBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBZ0M1QyxLQUFLO3NCQURSLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMsIE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEhlbHBlcnMsIEtleSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IENISVBTX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0NoaXBzRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2hpcHMsbm92by1jaGlwcycsXG4gIHByb3ZpZGVyczogW0NISVBTX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by1jaGlwLWNvbnRhaW5lclwiPlxuICAgICAgPG5vdm8tY2hpcFxuICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfaXRlbXMgfCBhc3luYyB8IHNsaWNlOiAwOmhpZGRlbkNoaXBzTGltaXRcIlxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiaXRlbSA9PSBzZWxlY3RlZFwiXG4gICAgICAgIFtzZWxlY3RhYmxlXT1cInRydWVcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZVBpY2tlcklucHV0XCJcbiAgICAgICAgKHJlbW92ZWQpPVwicmVtb3ZlKCRldmVudCwgaXRlbSlcIlxuICAgICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cInNlbGVjdCgkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgKGRlc2VsZWN0KT1cImRlc2VsZWN0KCRldmVudCwgaXRlbSlcIlxuICAgICAgPlxuICAgICAgICA8bm92by1pY29uICpuZ0lmPVwiaXRlbSB8IGF2YXRhclR5cGU6dHlwZSBhcyBhdmF0YXJUeXBlXCIgY2xhc3M9XCJ0eGMte3sgYXZhdGFyVHlwZSB9fVwiIG5vdm9DaGlwQXZhdGFyPmNpcmNsZTwvbm92by1pY29uPlxuICAgICAgICB7eyBpdGVtLmxhYmVsIH19XG4gICAgICAgIDxub3ZvLWljb24gKm5nSWY9XCIhZGlzYWJsZVBpY2tlcklucHV0XCIgbm92b0NoaXBSZW1vdmU+eDwvbm92by1pY29uPlxuICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgICA8ZGl2ICpuZ0lmPVwiaGlkZGVuQ2hpcHNDb3VudFwiIGNsYXNzPVwiaGlkZGVuLWNoaXBzLXRvZ2dsZVwiIChjbGljayk9XCJ0b2dnbGVIaWRkZW5DaGlwcygpXCI+XG4gICAgICAgIDxub3ZvLWxhYmVsICpuZ0lmPVwiaGlkZGVuQ2hpcHNMaW1pdCAhPT0gQ0hJUFNfU0hPV05fTUFYXCIgY29sb3I9XCJwb3NpdGl2ZVwiPisge3sgaGlkZGVuQ2hpcHNDb3VudCB9fSB7eyBsYWJlbHMubW9yZSB9fSA8L25vdm8tbGFiZWw+XG4gICAgICAgIDxub3ZvLWxhYmVsICpuZ0lmPVwiaGlkZGVuQ2hpcHNMaW1pdCA9PT0gQ0hJUFNfU0hPV05fTUFYXCIgY29sb3I9XCJwb3NpdGl2ZVwiPjxub3ZvLWljb24+c29ydC1hc2M8L25vdm8taWNvbj4ge3tsYWJlbHMuc2hvd0xlc3N9fTwvbm92by1sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNoaXAtaW5wdXQtY29udGFpbmVyXCIgKm5nSWY9XCIhbWF4bGVuZ3RoIHx8IChtYXhsZW5ndGggJiYgaXRlbXMubGVuZ3RoIDwgbWF4bGVuZ3RoKVwiPlxuICAgICAgICA8bm92by1waWNrZXJcbiAgICAgICAgICBjbGVhclZhbHVlT25TZWxlY3Q9XCJ0cnVlXCJcbiAgICAgICAgICBbY2xvc2VPblNlbGVjdF09XCJjbG9zZU9uU2VsZWN0XCJcbiAgICAgICAgICBbY29uZmlnXT1cInNvdXJjZVwiXG4gICAgICAgICAgW2Rpc2FibGVQaWNrZXJJbnB1dF09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgWyhuZ01vZGVsKV09XCJpdGVtVG9BZGRcIlxuICAgICAgICAgIChzZWxlY3QpPVwiYWRkKCRldmVudClcIlxuICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAodHlwaW5nKT1cIm9uVHlwaW5nKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm9uVG91Y2hlZCgkZXZlbnQpXCJcbiAgICAgICAgICBbc2VsZWN0ZWRdPVwiaXRlbXNcIlxuICAgICAgICAgIFtvdmVycmlkZUVsZW1lbnRdPVwiZWxlbWVudFwiXG4gICAgICAgICAgW2FsbG93Q3VzdG9tVmFsdWVzXT1cImFsbG93Q3VzdG9tVmFsdWVzXCJcbiAgICAgICAgPlxuICAgICAgICA8L25vdm8tcGlja2VyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInByZXZpZXctY29udGFpbmVyXCI+XG4gICAgICA8c3BhbiAjcHJldmlldz48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGkgY2xhc3M9XCJiaGktc2VhcmNoXCIgW2NsYXNzLmhhcy12YWx1ZV09XCJpdGVtcy5sZW5ndGhcIiAqbmdJZj1cIiFkaXNhYmxlUGlja2VySW5wdXRcIj48L2k+XG4gICAgPGxhYmVsIGNsYXNzPVwiY2xlYXItYWxsXCIgKm5nSWY9XCJpdGVtcy5sZW5ndGggJiYgIWRpc2FibGVQaWNrZXJJbnB1dFwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIlxuICAgICAgPnt7IGxhYmVscy5jbGVhckFsbCB9fSA8aSBjbGFzcz1cImJoaS10aW1lc1wiPjwvaVxuICAgID48L2xhYmVsPlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9DaGlwcy5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLndpdGgtdmFsdWVdJzogJ2l0ZW1zLmxlbmd0aCA+IDAnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVQaWNrZXJJbnB1dCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGlwc0VsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcmVhZG9ubHkgQ0hJUFNfU0hPV05fTUFYID0gOTk5O1xuICBASW5wdXQoKVxuICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KClcbiAgc291cmNlOiBhbnk7XG4gIEBJbnB1dCgpXG4gIG1heGxlbmd0aDogYW55O1xuICBASW5wdXQoKVxuICB0eXBlOiBhbnk7XG4gIEBJbnB1dCgpXG4gIGFsbG93Q3VzdG9tVmFsdWVzID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlUGlja2VySW5wdXQodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVQaWNrZXJJbnB1dCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgZGlzYWJsZVBpY2tlcklucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlUGlja2VySW5wdXQ7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVBpY2tlcklucHV0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIGNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICB0eXBpbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3ByZXZpZXcnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgcHJldmlldzogVmlld0NvbnRhaW5lclJlZjtcblxuICBpdGVtczogYW55W10gPSBbXTtcbiAgc2VsZWN0ZWQ6IGFueSA9IG51bGw7XG4gIGNvbmZpZzogYW55ID0ge307XG4gIG1vZGVsOiBhbnk7XG4gIGl0ZW1Ub0FkZDogYW55O1xuICBwb3B1cDogYW55O1xuICBoaWRkZW5DaGlwc0xpbWl0OiBudW1iZXI7XG4gIGhpZGRlbkNoaXBzQ291bnQ6IG51bWJlcjtcbiAgLy8gcHJpdmF0ZSBkYXRhIG1vZGVsXG4gIF92YWx1ZTogYW55ID0gJyc7XG4gIF9pdGVtcyA9IG5ldyBSZXBsYXlTdWJqZWN0PGFueVtdPigxKTtcbiAgX2hpZGRlbkNoaXBzTGltaXQ6IG51bWJlcjtcbiAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzXG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGNvbXBvbmVudFV0aWxzOiBDb21wb25lbnRVdGlscywgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmhpZGRlbkNoaXBzTGltaXQgPSB0aGlzLnNvdXJjZS5oaWRkZW5DaGlwc0xpbWl0O1xuICAgIHRoaXMuX2hpZGRlbkNoaXBzTGltaXQgPSB0aGlzLmhpZGRlbkNoaXBzTGltaXQ7IC8vIGNvcHkgb2Ygb3JpZ2luYWwgY2hpcCBsaW1pdFxuICAgIHRoaXMuc2V0SXRlbXMoKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUoc2VsZWN0ZWQpIHtcbiAgICB0aGlzLml0ZW1Ub0FkZCA9ICcnO1xuICAgIHRoaXMuX3ZhbHVlID0gc2VsZWN0ZWQ7XG4gIH1cblxuICBjbGVhclZhbHVlKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLnVwZGF0ZUhpZGRlbkNoaXBzKCk7XG4gICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcbiAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gIH1cblxuICBzZXRJdGVtcygpIHtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgaWYgKHRoaXMubW9kZWwgJiYgQXJyYXkuaXNBcnJheSh0aGlzLm1vZGVsKSkge1xuICAgICAgY29uc3Qgbm9MYWJlbHMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdGhpcy5tb2RlbCkge1xuICAgICAgICBsZXQgbGFiZWw7XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5mb3JtYXQgJiYgSGVscGVycy52YWxpZGF0ZUludGVycG9sYXRpb25Qcm9wcyh0aGlzLnNvdXJjZS5mb3JtYXQsIHZhbHVlKSkge1xuICAgICAgICAgIGxhYmVsID0gSGVscGVycy5pbnRlcnBvbGF0ZSh0aGlzLnNvdXJjZS5mb3JtYXQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zb3VyY2UgJiYgbGFiZWwgJiYgbGFiZWwgIT09IHRoaXMuc291cmNlLmZvcm1hdCkge1xuICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc291cmNlLmdldExhYmVscyAmJiB0eXBlb2YgdGhpcy5zb3VyY2UuZ2V0TGFiZWxzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgbm9MYWJlbHMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3VyY2Uub3B0aW9ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMuc291cmNlLm9wdGlvbnMpKSB7XG4gICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHRoaXMuZ2V0TGFiZWxGcm9tT3B0aW9ucyh2YWx1ZSkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc291cmNlLmNhdGVnb3J5TWFwICYmIHRoaXMuc291cmNlLmNhdGVnb3J5TWFwLnNpemUpIHtcbiAgICAgICAgICB0aGlzLml0ZW1zLnB1c2godmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGxhYmVsOiB2YWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG5vTGFiZWxzLmxlbmd0aCA+IDAgJiYgdGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UuZ2V0TGFiZWxzICYmIHR5cGVvZiB0aGlzLnNvdXJjZS5nZXRMYWJlbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5zb3VyY2UuZ2V0TGFiZWxzKG5vTGFiZWxzKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdsYWJlbCcpKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHZhbHVlLmxhYmVsLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3VyY2Uub3B0aW9ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMuc291cmNlLm9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh0aGlzLmdldExhYmVsRnJvbU9wdGlvbnModmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2ZpbmFsaXplSXRlbVZhbHVlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9maW5hbGl6ZUl0ZW1WYWx1ZSgpO1xuICB9XG5cbiAgZ2V0TGFiZWxGcm9tT3B0aW9ucyh2YWx1ZSkge1xuICAgIGxldCBpZCA9IHZhbHVlO1xuICAgIGxldCBvcHRMYWJlbCA9IHRoaXMuc291cmNlLm9wdGlvbnMuZmluZCgodmFsKSA9PiB2YWwudmFsdWUgPT09IHZhbHVlKTtcbiAgICBpZiAoIW9wdExhYmVsICYmIHZhbHVlLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICBvcHRMYWJlbCA9IHRoaXMuc291cmNlLm9wdGlvbnMuZmluZCgodmFsKSA9PiB2YWwudmFsdWUgPT09IHZhbHVlLmlkKTtcbiAgICAgIGlkID0gdmFsdWUuaWQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogaWQsXG4gICAgICBsYWJlbDogb3B0TGFiZWwgPyBvcHRMYWJlbC5sYWJlbCA6IHZhbHVlLFxuICAgIH07XG4gIH1cblxuICBkZXNlbGVjdEFsbChldmVudD8pIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB0aGlzLmhpZGVQcmV2aWV3KCk7XG4gIH1cblxuICBzZWxlY3QoZXZlbnQ/LCBpdGVtPykge1xuICAgIHRoaXMuYmx1ci5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGl0ZW07XG4gICAgdGhpcy5zaG93UHJldmlldygpO1xuICB9XG5cbiAgZGVzZWxlY3QoZXZlbnQ/LCBpdGVtPykge1xuICAgIHRoaXMuYmx1ci5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBvblR5cGluZyhldmVudD8pIHtcbiAgICB0aGlzLnR5cGluZy5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIG9uRm9jdXMoZXZlbnQ/KSB7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgdGhpcy5mb2N1cy5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGFkZChldmVudCkge1xuICAgIGlmIChldmVudCAmJiAhKGV2ZW50IGluc3RhbmNlb2YgRXZlbnQpKSB7XG4gICAgICB0aGlzLml0ZW1zLnB1c2goZXZlbnQpO1xuICAgICAgdGhpcy51cGRhdGVIaWRkZW5DaGlwcygpO1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLnZhbHVlRm9ybWF0dGVyID8gdGhpcy5zb3VyY2UudmFsdWVGb3JtYXR0ZXIodGhpcy5pdGVtcykgOiB0aGlzLml0ZW1zLm1hcCgoaSkgPT4gaS52YWx1ZSk7XG4gICAgICAvLyBTZXQgZm9jdXMgb24gdGhlIHBpY2tlclxuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdub3ZvLXBpY2tlciA+IGlucHV0Jyk7XG4gICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcbiAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gIH1cblxuICB1cGRhdGVIaWRkZW5DaGlwcygpIHtcbiAgICB0aGlzLmhpZGRlbkNoaXBzQ291bnQgPSBNYXRoLm1heCgwLCB0aGlzLml0ZW1zLmxlbmd0aCAtIHRoaXMuX2hpZGRlbkNoaXBzTGltaXQpO1xuICAgIGlmICghdGhpcy5oaWRkZW5DaGlwc0NvdW50ICYmIHRoaXMuaGlkZGVuQ2hpcHNMaW1pdCA9PT0gdGhpcy5DSElQU19TSE9XTl9NQVgpXG4gICAgICB0aGlzLmhpZGRlbkNoaXBzTGltaXQgPSB0aGlzLl9oaWRkZW5DaGlwc0xpbWl0OyAvLyByZXNldCBoaWRkZW5DaGlwc0xpbWl0IHRvIG9yaWdpbmFsICNcbiAgfVxuXG4gIHRvZ2dsZUhpZGRlbkNoaXBzKCkge1xuICAgIHRoaXMuaGlkZGVuQ2hpcHNMaW1pdCA9IHRoaXMuaGlkZGVuQ2hpcHNMaW1pdCA9PT0gdGhpcy5DSElQU19TSE9XTl9NQVggPyB0aGlzLl9oaWRkZW5DaGlwc0xpbWl0IDogdGhpcy5DSElQU19TSE9XTl9NQVg7XG4gIH1cblxuICByZW1vdmUoZXZlbnQsIGl0ZW0pIHtcbiAgICB0aGlzLml0ZW1zLnNwbGljZSh0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xuICAgIHRoaXMudXBkYXRlSGlkZGVuQ2hpcHMoKTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLnZhbHVlRm9ybWF0dGVyID8gdGhpcy5zb3VyY2UudmFsdWVGb3JtYXR0ZXIodGhpcy5pdGVtcykgOiB0aGlzLml0ZW1zLm1hcCgoaSkgPT4gaS52YWx1ZSk7XG4gICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcbiAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuQmFja3NwYWNlKSB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPT09IDAgJiYgdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKGV2ZW50LCB0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdChldmVudCwgdGhpcy5pdGVtc1t0aGlzLml0ZW1zLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNldCB0b3VjaGVkIG9uIGJsdXJcbiAgb25Ub3VjaGVkKGUpIHtcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB0aGlzLmJsdXIuZW1pdChlKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnNldEl0ZW1zKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2Rpc2FibGVQaWNrZXJJbnB1dCA9IGRpc2FibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluYWxpemVJdGVtVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcbiAgICBjb25zdCB2YWx1ZVRvU2V0ID0gdGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UudmFsdWVGb3JtYXR0ZXIgPyB0aGlzLnNvdXJjZS52YWx1ZUZvcm1hdHRlcih0aGlzLml0ZW1zKSA6IHRoaXMuaXRlbXMubWFwKChpKSA9PiBpLnZhbHVlKTtcbiAgICBpZiAoSGVscGVycy5pc0JsYW5rKHRoaXMudmFsdWUpICE9PSBIZWxwZXJzLmlzQmxhbmsodmFsdWVUb1NldCkgfHwgSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHZhbHVlVG9TZXQpKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWVUb1NldDtcbiAgICB9XG4gIH1cblxuICAvKiogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIHNldCB0aGUgbW9kZWwgdmFsdWUuICovXG4gIHByaXZhdGUgX3Byb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlZC5lbWl0KHsgdmFsdWU6IHRoaXMudmFsdWU/Lmxlbmd0aCA/IHRoaXMudmFsdWUgOiAnJywgcmF3VmFsdWU6IHRoaXMuaXRlbXMgfSk7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIHNob3dQcmV2aWV3XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBwcmV2aWV3IChjYWxsZWQgcG9wdXApIGFuZCBhZGRzIGFsbCB0aGUgYmluZGluZ3MgdG8gdGhhdFxuICAgKiBpbnN0YW5jZS4gV2lsbCByZXVzZSB0aGUgcG9wdXAgb3IgY3JlYXRlIGEgbmV3IG9uZSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LiBXaWxsIG9ubHkgd29yayBpZiB0aGVyZSBpc1xuICAgKiBhIHByZXZpZXdUZW1wbGF0ZSBnaXZlbiBpbiB0aGUgY29uZmlnLlxuICAgKi9cbiAgc2hvd1ByZXZpZXcoKSB7XG4gICAgaWYgKHRoaXMuc291cmNlLnByZXZpZXdUZW1wbGF0ZSkge1xuICAgICAgaWYgKCF0aGlzLnBvcHVwKSB7XG4gICAgICAgIHRoaXMucG9wdXAgPSB0aGlzLmNvbXBvbmVudFV0aWxzLmFwcGVuZCh0aGlzLnNvdXJjZS5wcmV2aWV3VGVtcGxhdGUsIHRoaXMucHJldmlldyk7XG4gICAgICB9XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLm1hdGNoID0geyBkYXRhOiB0aGlzLnNlbGVjdGVkLmRhdGEgPz8gdGhpcy5zZWxlY3RlZC52YWx1ZSB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBoaWRlUHJldmlld1xuICAgKlxuICAgKiBAZGVzY3JpcHRpb24gLSBUaGlzIG1ldGhvZCBkZWxldGVzIHRoZSBwcmV2aWV3IHBvcHVwIGZyb20gdGhlIERPTS5cbiAgICovXG4gIGhpZGVQcmV2aWV3KCkge1xuICAgIGlmICh0aGlzLnBvcHVwKSB7XG4gICAgICB0aGlzLnBvcHVwLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMucG9wdXAgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19