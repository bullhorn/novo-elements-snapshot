// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, inject, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { ReplaySubject } from 'rxjs';
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { NovoPickerElement } from 'novo-elements/elements/picker';
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
        this.changeRef = inject(ChangeDetectorRef);
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
                    this.updateHiddenChips();
                    this._finalizeItemValue();
                    this._updateOverlay();
                });
            }
        }
        this.updateHiddenChips();
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
        this._updateOverlay();
    }
    _updateOverlay() {
        if (this.picker?.container?.overlayRef) {
            setTimeout(() => {
                this.picker.container.overlayRef.updatePosition();
                this.picker.popup.instance.selected = this.picker.selected;
                this.changeRef.detectChanges();
            });
        }
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoChipsElement, selector: "chips,novo-chips", inputs: { closeOnSelect: "closeOnSelect", placeholder: "placeholder", source: "source", maxlength: "maxlength", type: "type", allowCustomValues: "allowCustomValues", disablePickerInput: "disablePickerInput", overrideElement: "overrideElement", width: "width", minWidth: "minWidth", value: "value" }, outputs: { changed: "changed", focus: "focus", blur: "blur", typing: "typing" }, host: { properties: { "class.with-value": "items.length > 0", "class.disabled": "disablePickerInput" } }, providers: [CHIPS_VALUE_ACCESSOR], viewQueries: [{ propertyName: "preview", first: true, predicate: ["preview"], descendants: true, read: ViewContainerRef }, { propertyName: "picker", first: true, predicate: ["picker"], descendants: true }], ngImport: i0, template: `
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
        <span class="chip-label">{{ item.label }}</span>
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
      <div *ngIf="hiddenChipsCount" class="hidden-chips-toggle" (click)="toggleHiddenChips()">
        <novo-label *ngIf="hiddenChipsLimit !== CHIPS_SHOWN_MAX" color="positive">+ {{ hiddenChipsCount }} {{ labels.more }} </novo-label>
        <novo-label *ngIf="hiddenChipsLimit === CHIPS_SHOWN_MAX" color="positive"><novo-icon>sort-asc</novo-icon> {{labels.showLess}}</novo-label>
      </div>
      <div class="chip-input-container" *ngIf="!maxlength || (maxlength && items.length < maxlength)">
        <novo-picker
          #picker
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
          [width]="width"
          [minWidth]="minWidth"
          [overrideElement]="overrideElement || element"
          [allowCustomValues]="allowCustomValues"
        >
          <ng-content/>
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
  `, isInline: true, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid #afb9c0;transition:all .2s ease-in-out;position:relative;padding:2px 0}:host .hidden-chips-toggle{cursor:pointer;padding-left:.5rem;line-height:2.7rem}:host.with-value{margin-bottom:20px}:host:hover{border-bottom:1px solid #5f6d78}:host.selected,:host.selected:hover{border-bottom:1px solid #4a89dc}:host.selected+i,:host.selected:hover+i{color:#4a89dc}:host.disabled{border-bottom-style:dashed!important}:host .novo-chip-container{flex:1;display:flex;flex-flow:row wrap;gap:.4rem;align-items:center}:host .chip-input-container{flex:1 15rem;padding-left:1rem}:host .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}:host .chip-input-container input:focus{outline:none}:host .chip-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:#da4453;cursor:pointer;display:flex;align-items:center}:host label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}:host i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:#3d464d}:host+i{position:absolute;right:0;bottom:7px}:host.with-value{margin-bottom:0}:host novo-picker{position:inherit;padding-bottom:0}:host novo-picker>::ng-deep input{border:none;border-bottom:none!important}:host novo-picker>::ng-deep input:disabled{border-bottom:none!important}:host novo-picker>::ng-deep i{display:none}:host novo-picker div.picker-results-container{left:0}:host picker-results{position:absolute;color:#000}:host picker-results novo-list{max-height:49vh;overflow:auto}:host picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}:host picker-results novo-list novo-list-item>div{width:100%}:host picker-results novo-list novo-list-item.active{background-color:#e0ebf9}:host picker-results novo-list novo-list-item:hover{background-color:#e0ebf9}:host picker-results novo-list novo-list-item item-content{flex-flow:row wrap}:host picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host picker-results .error-results,:host picker-results .no-recents,:host picker-results .null-results{text-align:center;padding:1em 0 4em}:host picker-results .error-results>i,:host picker-results .no-recents>i,:host picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}:host picker-results .error-results>h4,:host picker-results .error-results>p,:host picker-results .no-recents>h4,:host picker-results .no-recents>p,:host picker-results .null-results>h4,:host picker-results .null-results>p{margin:0;max-width:none;padding:0}:host picker-results .error-results>h4,:host picker-results .no-recents>h4,:host picker-results .null-results>h4{font-weight:500}:host picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .preview-container entity-picker-result{background:#fff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}:host .preview-container entity-picker-result .novo-list-item{flex:0 0}:host .preview-container entity-picker-result .novo-list-item>div{width:100%}:host .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "allowCustomValues", "width", "minWidth", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }, { kind: "component", type: i5.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i6.NovoLabel, selector: "novo-label,[novo-label]" }, { kind: "component", type: i7.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i7.NovoChipAvatar, selector: "novo-chip-avatar, [novoChipAvatar]" }, { kind: "directive", type: i7.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.SlicePipe, name: "slice" }, { kind: "pipe", type: i8.AvatarTypePipe, name: "avatarType" }] }); }
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
        <span class="chip-label">{{ item.label }}</span>
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
      <div *ngIf="hiddenChipsCount" class="hidden-chips-toggle" (click)="toggleHiddenChips()">
        <novo-label *ngIf="hiddenChipsLimit !== CHIPS_SHOWN_MAX" color="positive">+ {{ hiddenChipsCount }} {{ labels.more }} </novo-label>
        <novo-label *ngIf="hiddenChipsLimit === CHIPS_SHOWN_MAX" color="positive"><novo-icon>sort-asc</novo-icon> {{labels.showLess}}</novo-label>
      </div>
      <div class="chip-input-container" *ngIf="!maxlength || (maxlength && items.length < maxlength)">
        <novo-picker
          #picker
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
          [width]="width"
          [minWidth]="minWidth"
          [overrideElement]="overrideElement || element"
          [allowCustomValues]="allowCustomValues"
        >
          <ng-content/>
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
                    }, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid #afb9c0;transition:all .2s ease-in-out;position:relative;padding:2px 0}:host .hidden-chips-toggle{cursor:pointer;padding-left:.5rem;line-height:2.7rem}:host.with-value{margin-bottom:20px}:host:hover{border-bottom:1px solid #5f6d78}:host.selected,:host.selected:hover{border-bottom:1px solid #4a89dc}:host.selected+i,:host.selected:hover+i{color:#4a89dc}:host.disabled{border-bottom-style:dashed!important}:host .novo-chip-container{flex:1;display:flex;flex-flow:row wrap;gap:.4rem;align-items:center}:host .chip-input-container{flex:1 15rem;padding-left:1rem}:host .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}:host .chip-input-container input:focus{outline:none}:host .chip-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:#da4453;cursor:pointer;display:flex;align-items:center}:host label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}:host i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:#3d464d}:host+i{position:absolute;right:0;bottom:7px}:host.with-value{margin-bottom:0}:host novo-picker{position:inherit;padding-bottom:0}:host novo-picker>::ng-deep input{border:none;border-bottom:none!important}:host novo-picker>::ng-deep input:disabled{border-bottom:none!important}:host novo-picker>::ng-deep i{display:none}:host novo-picker div.picker-results-container{left:0}:host picker-results{position:absolute;color:#000}:host picker-results novo-list{max-height:49vh;overflow:auto}:host picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}:host picker-results novo-list novo-list-item>div{width:100%}:host picker-results novo-list novo-list-item.active{background-color:#e0ebf9}:host picker-results novo-list novo-list-item:hover{background-color:#e0ebf9}:host picker-results novo-list novo-list-item item-content{flex-flow:row wrap}:host picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host picker-results .error-results,:host picker-results .no-recents,:host picker-results .null-results{text-align:center;padding:1em 0 4em}:host picker-results .error-results>i,:host picker-results .no-recents>i,:host picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}:host picker-results .error-results>h4,:host picker-results .error-results>p,:host picker-results .no-recents>h4,:host picker-results .no-recents>p,:host picker-results .null-results>h4,:host picker-results .null-results>p{margin:0;max-width:none;padding:0}:host picker-results .error-results>h4,:host picker-results .no-recents>h4,:host picker-results .null-results>h4{font-weight:500}:host picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .preview-container entity-picker-result{background:#fff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}:host .preview-container entity-picker-result .novo-list-item{flex:0 0}:host .preview-container entity-picker-result .novo-list-item>div{width:100%}:host .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}\n"] }]
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
            }], overrideElement: [{
                type: Input
            }], width: [{
                type: Input
            }], minWidth: [{
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
            }], picker: [{
                type: ViewChild,
                args: ['picker', { static: false }]
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGlwcy9DaGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0osT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsT0FBTyxFQUFPLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7Ozs7QUFFbEUsc0RBQXNEO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQThERixNQUFNLE9BQU8sZ0JBQWdCO0lBYzNCLElBQ0ksa0JBQWtCLENBQUMsQ0FBVTtRQUMvQixJQUFJLENBQUMsbUJBQW1CLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lB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SCxDQUFDOzhHQWhUVSxnQkFBZ0I7a0dBQWhCLGdCQUFnQixraEJBMURoQixDQUFDLG9CQUFvQixDQUFDLHlHQWdHSCxnQkFBZ0IsZ0hBL0ZwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrRFQ7OzJGQU9VLGdCQUFnQjtrQkE1RDVCLFNBQVM7K0JBQ0Usa0JBQWtCLGFBQ2pCLENBQUMsb0JBQW9CLENBQUMsWUFDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0RULFFBRUs7d0JBQ0osb0JBQW9CLEVBQUUsa0JBQWtCO3dCQUN4QyxrQkFBa0IsRUFBRSxvQkFBb0I7cUJBQ3pDOzJJQUtELGFBQWE7c0JBRFosS0FBSztnQkFHTixXQUFXO3NCQURWLEtBQUs7Z0JBR04sTUFBTTtzQkFETCxLQUFLO2dCQUdOLFNBQVM7c0JBRFIsS0FBSztnQkFHTixJQUFJO3NCQURILEtBQUs7Z0JBR04saUJBQWlCO3NCQURoQixLQUFLO2dCQUdGLGtCQUFrQjtzQkFEckIsS0FBSztnQkFTTixlQUFlO3NCQURkLEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSztnQkFJTixPQUFPO3NCQUROLE1BQU07Z0JBR1AsS0FBSztzQkFESixNQUFNO2dCQUdQLElBQUk7c0JBREgsTUFBTTtnQkFHUCxNQUFNO3NCQURMLE1BQU07Z0JBSVAsT0FBTztzQkFETixTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtnQkFJaEQsTUFBTTtzQkFETCxTQUFTO3VCQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBa0NsQyxLQUFLO3NCQURSLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIGluamVjdCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMsIE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEhlbHBlcnMsIEtleSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b1BpY2tlckVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3BpY2tlcic7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgQ0hJUFNfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvQ2hpcHNFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjaGlwcyxub3ZvLWNoaXBzJyxcbiAgcHJvdmlkZXJzOiBbQ0hJUFNfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNoaXAtY29udGFpbmVyXCI+XG4gICAgICA8bm92by1jaGlwXG4gICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9pdGVtcyB8IGFzeW5jIHwgc2xpY2U6IDA6aGlkZGVuQ2hpcHNMaW1pdFwiXG4gICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJpdGVtID09IHNlbGVjdGVkXCJcbiAgICAgICAgW3NlbGVjdGFibGVdPVwidHJ1ZVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgICAocmVtb3ZlZCk9XCJyZW1vdmUoJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwic2VsZWN0KCRldmVudCwgaXRlbSlcIlxuICAgICAgICAoZGVzZWxlY3QpPVwiZGVzZWxlY3QoJGV2ZW50LCBpdGVtKVwiXG4gICAgICA+XG4gICAgICAgIDxub3ZvLWljb24gKm5nSWY9XCJpdGVtIHwgYXZhdGFyVHlwZTp0eXBlIGFzIGF2YXRhclR5cGVcIiBjbGFzcz1cInR4Yy17eyBhdmF0YXJUeXBlIH19XCIgbm92b0NoaXBBdmF0YXI+Y2lyY2xlPC9ub3ZvLWljb24+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2hpcC1sYWJlbFwiPnt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgIDxub3ZvLWljb24gKm5nSWY9XCIhZGlzYWJsZVBpY2tlcklucHV0XCIgbm92b0NoaXBSZW1vdmU+eDwvbm92by1pY29uPlxuICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgICA8ZGl2ICpuZ0lmPVwiaGlkZGVuQ2hpcHNDb3VudFwiIGNsYXNzPVwiaGlkZGVuLWNoaXBzLXRvZ2dsZVwiIChjbGljayk9XCJ0b2dnbGVIaWRkZW5DaGlwcygpXCI+XG4gICAgICAgIDxub3ZvLWxhYmVsICpuZ0lmPVwiaGlkZGVuQ2hpcHNMaW1pdCAhPT0gQ0hJUFNfU0hPV05fTUFYXCIgY29sb3I9XCJwb3NpdGl2ZVwiPisge3sgaGlkZGVuQ2hpcHNDb3VudCB9fSB7eyBsYWJlbHMubW9yZSB9fSA8L25vdm8tbGFiZWw+XG4gICAgICAgIDxub3ZvLWxhYmVsICpuZ0lmPVwiaGlkZGVuQ2hpcHNMaW1pdCA9PT0gQ0hJUFNfU0hPV05fTUFYXCIgY29sb3I9XCJwb3NpdGl2ZVwiPjxub3ZvLWljb24+c29ydC1hc2M8L25vdm8taWNvbj4ge3tsYWJlbHMuc2hvd0xlc3N9fTwvbm92by1sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNoaXAtaW5wdXQtY29udGFpbmVyXCIgKm5nSWY9XCIhbWF4bGVuZ3RoIHx8IChtYXhsZW5ndGggJiYgaXRlbXMubGVuZ3RoIDwgbWF4bGVuZ3RoKVwiPlxuICAgICAgICA8bm92by1waWNrZXJcbiAgICAgICAgICAjcGlja2VyXG4gICAgICAgICAgY2xlYXJWYWx1ZU9uU2VsZWN0PVwidHJ1ZVwiXG4gICAgICAgICAgW2Nsb3NlT25TZWxlY3RdPVwiY2xvc2VPblNlbGVjdFwiXG4gICAgICAgICAgW2NvbmZpZ109XCJzb3VyY2VcIlxuICAgICAgICAgIFtkaXNhYmxlUGlja2VySW5wdXRdPVwiZGlzYWJsZVBpY2tlcklucHV0XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFsobmdNb2RlbCldPVwiaXRlbVRvQWRkXCJcbiAgICAgICAgICAoc2VsZWN0KT1cImFkZCgkZXZlbnQpXCJcbiAgICAgICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKHR5cGluZyk9XCJvblR5cGluZygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJvblRvdWNoZWQoJGV2ZW50KVwiXG4gICAgICAgICAgW3NlbGVjdGVkXT1cIml0ZW1zXCJcbiAgICAgICAgICBbd2lkdGhdPVwid2lkdGhcIlxuICAgICAgICAgIFttaW5XaWR0aF09XCJtaW5XaWR0aFwiXG4gICAgICAgICAgW292ZXJyaWRlRWxlbWVudF09XCJvdmVycmlkZUVsZW1lbnQgfHwgZWxlbWVudFwiXG4gICAgICAgICAgW2FsbG93Q3VzdG9tVmFsdWVzXT1cImFsbG93Q3VzdG9tVmFsdWVzXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250ZW50Lz5cbiAgICAgICAgPC9ub3ZvLXBpY2tlcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwcmV2aWV3LWNvbnRhaW5lclwiPlxuICAgICAgPHNwYW4gI3ByZXZpZXc+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxpIGNsYXNzPVwiYmhpLXNlYXJjaFwiIFtjbGFzcy5oYXMtdmFsdWVdPVwiaXRlbXMubGVuZ3RoXCIgKm5nSWY9XCIhZGlzYWJsZVBpY2tlcklucHV0XCI+PC9pPlxuICAgIDxsYWJlbCBjbGFzcz1cImNsZWFyLWFsbFwiICpuZ0lmPVwiaXRlbXMubGVuZ3RoICYmICFkaXNhYmxlUGlja2VySW5wdXRcIiAoY2xpY2spPVwiY2xlYXJWYWx1ZSgpXCJcbiAgICAgID57eyBsYWJlbHMuY2xlYXJBbGwgfX0gPGkgY2xhc3M9XCJiaGktdGltZXNcIj48L2lcbiAgICA+PC9sYWJlbD5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vQ2hpcHMuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy53aXRoLXZhbHVlXSc6ICdpdGVtcy5sZW5ndGggPiAwJyxcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlUGlja2VySW5wdXQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2hpcHNFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHJlYWRvbmx5IENISVBTX1NIT1dOX01BWCA9IDk5OTtcbiAgQElucHV0KClcbiAgY2xvc2VPblNlbGVjdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpXG4gIHNvdXJjZTogYW55O1xuICBASW5wdXQoKVxuICBtYXhsZW5ndGg6IGFueTtcbiAgQElucHV0KClcbiAgdHlwZTogYW55O1xuICBASW5wdXQoKVxuICBhbGxvd0N1c3RvbVZhbHVlcyA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZVBpY2tlcklucHV0KHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlUGlja2VySW5wdXQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gIH1cbiAgZ2V0IGRpc2FibGVQaWNrZXJJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVBpY2tlcklucHV0O1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVQaWNrZXJJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBvdmVycmlkZUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpXG4gIHdpZHRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIG1pbldpZHRoOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIGNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICB0eXBpbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3ByZXZpZXcnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgcHJldmlldzogVmlld0NvbnRhaW5lclJlZjtcblxuICBAVmlld0NoaWxkKCdwaWNrZXInLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcGlja2VyOiBOb3ZvUGlja2VyRWxlbWVudDtcblxuICBpdGVtczogYW55W10gPSBbXTtcbiAgc2VsZWN0ZWQ6IGFueSA9IG51bGw7XG4gIGNvbmZpZzogYW55ID0ge307XG4gIG1vZGVsOiBhbnk7XG4gIGl0ZW1Ub0FkZDogYW55O1xuICBwb3B1cDogYW55O1xuICBoaWRkZW5DaGlwc0xpbWl0OiBudW1iZXI7XG4gIGhpZGRlbkNoaXBzQ291bnQ6IG51bWJlcjtcbiAgLy8gcHJpdmF0ZSBkYXRhIG1vZGVsXG4gIF92YWx1ZTogYW55ID0gJyc7XG4gIF9pdGVtcyA9IG5ldyBSZXBsYXlTdWJqZWN0PGFueVtdPigxKTtcbiAgX2hpZGRlbkNoaXBzTGltaXQ6IG51bWJlcjtcbiAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzXG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGNoYW5nZVJlZiA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY29tcG9uZW50VXRpbHM6IENvbXBvbmVudFV0aWxzLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaGlkZGVuQ2hpcHNMaW1pdCA9IHRoaXMuc291cmNlLmhpZGRlbkNoaXBzTGltaXQ7XG4gICAgdGhpcy5faGlkZGVuQ2hpcHNMaW1pdCA9IHRoaXMuaGlkZGVuQ2hpcHNMaW1pdDsgLy8gY29weSBvZiBvcmlnaW5hbCBjaGlwIGxpbWl0XG4gICAgdGhpcy5zZXRJdGVtcygpO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZShzZWxlY3RlZCkge1xuICAgIHRoaXMuaXRlbVRvQWRkID0gJyc7XG4gICAgdGhpcy5fdmFsdWUgPSBzZWxlY3RlZDtcbiAgfVxuXG4gIGNsZWFyVmFsdWUoKSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgIHRoaXMudXBkYXRlSGlkZGVuQ2hpcHMoKTtcbiAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xuICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIHNldEl0ZW1zKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICBpZiAodGhpcy5tb2RlbCAmJiBBcnJheS5pc0FycmF5KHRoaXMubW9kZWwpKSB7XG4gICAgICBjb25zdCBub0xhYmVscyA9IFtdO1xuICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB0aGlzLm1vZGVsKSB7XG4gICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgaWYgKHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLmZvcm1hdCAmJiBIZWxwZXJzLnZhbGlkYXRlSW50ZXJwb2xhdGlvblByb3BzKHRoaXMuc291cmNlLmZvcm1hdCwgdmFsdWUpKSB7XG4gICAgICAgICAgbGFiZWwgPSBIZWxwZXJzLmludGVycG9sYXRlKHRoaXMuc291cmNlLmZvcm1hdCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZSAmJiBsYWJlbCAmJiBsYWJlbCAhPT0gdGhpcy5zb3VyY2UuZm9ybWF0KSB7XG4gICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3VyY2UuZ2V0TGFiZWxzICYmIHR5cGVvZiB0aGlzLnNvdXJjZS5nZXRMYWJlbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBub0xhYmVscy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNvdXJjZS5vcHRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5zb3VyY2Uub3B0aW9ucykpIHtcbiAgICAgICAgICB0aGlzLml0ZW1zLnB1c2godGhpcy5nZXRMYWJlbEZyb21PcHRpb25zKHZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3VyY2UuY2F0ZWdvcnlNYXAgJiYgdGhpcy5zb3VyY2UuY2F0ZWdvcnlNYXAuc2l6ZSkge1xuICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgbGFiZWw6IHZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobm9MYWJlbHMubGVuZ3RoID4gMCAmJiB0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5nZXRMYWJlbHMgJiYgdHlwZW9mIHRoaXMuc291cmNlLmdldExhYmVscyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnNvdXJjZS5nZXRMYWJlbHMobm9MYWJlbHMpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgcmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoJ2xhYmVsJykpIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogdmFsdWUubGFiZWwsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNvdXJjZS5vcHRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5zb3VyY2Uub3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHRoaXMuZ2V0TGFiZWxGcm9tT3B0aW9ucyh2YWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy51cGRhdGVIaWRkZW5DaGlwcygpO1xuICAgICAgICAgIHRoaXMuX2ZpbmFsaXplSXRlbVZhbHVlKCk7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlT3ZlcmxheSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGVIaWRkZW5DaGlwcygpO1xuICAgIHRoaXMuX2ZpbmFsaXplSXRlbVZhbHVlKCk7XG4gIH1cblxuICBnZXRMYWJlbEZyb21PcHRpb25zKHZhbHVlKSB7XG4gICAgbGV0IGlkID0gdmFsdWU7XG4gICAgbGV0IG9wdExhYmVsID0gdGhpcy5zb3VyY2Uub3B0aW9ucy5maW5kKCh2YWwpID0+IHZhbC52YWx1ZSA9PT0gdmFsdWUpO1xuICAgIGlmICghb3B0TGFiZWwgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgIG9wdExhYmVsID0gdGhpcy5zb3VyY2Uub3B0aW9ucy5maW5kKCh2YWwpID0+IHZhbC52YWx1ZSA9PT0gdmFsdWUuaWQpO1xuICAgICAgaWQgPSB2YWx1ZS5pZDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBpZCxcbiAgICAgIGxhYmVsOiBvcHRMYWJlbCA/IG9wdExhYmVsLmxhYmVsIDogdmFsdWUsXG4gICAgfTtcbiAgfVxuXG4gIGRlc2VsZWN0QWxsKGV2ZW50Pykge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIHRoaXMuaGlkZVByZXZpZXcoKTtcbiAgfVxuXG4gIHNlbGVjdChldmVudD8sIGl0ZW0/KSB7XG4gICAgdGhpcy5ibHVyLmVtaXQoZXZlbnQpO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICB0aGlzLnNlbGVjdGVkID0gaXRlbTtcbiAgICB0aGlzLnNob3dQcmV2aWV3KCk7XG4gIH1cblxuICBkZXNlbGVjdChldmVudD8sIGl0ZW0/KSB7XG4gICAgdGhpcy5ibHVyLmVtaXQoZXZlbnQpO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG4gIG9uVHlwaW5nKGV2ZW50Pykge1xuICAgIHRoaXMudHlwaW5nLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgb25Gb2N1cyhldmVudD8pIHtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB0aGlzLmZvY3VzLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYWRkKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICYmICEoZXZlbnQgaW5zdGFuY2VvZiBFdmVudCkpIHtcbiAgICAgIHRoaXMuaXRlbXMucHVzaChldmVudCk7XG4gICAgICB0aGlzLnVwZGF0ZUhpZGRlbkNoaXBzKCk7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UudmFsdWVGb3JtYXR0ZXIgPyB0aGlzLnNvdXJjZS52YWx1ZUZvcm1hdHRlcih0aGlzLml0ZW1zKSA6IHRoaXMuaXRlbXMubWFwKChpKSA9PiBpLnZhbHVlKTtcbiAgICAgIC8vIFNldCBmb2N1cyBvbiB0aGUgcGlja2VyXG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25vdm8tcGlja2VyID4gaW5wdXQnKTtcbiAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xuICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIHVwZGF0ZUhpZGRlbkNoaXBzKCkge1xuICAgIHRoaXMuaGlkZGVuQ2hpcHNDb3VudCA9IE1hdGgubWF4KDAsIHRoaXMuaXRlbXMubGVuZ3RoIC0gdGhpcy5faGlkZGVuQ2hpcHNMaW1pdCk7XG4gICAgaWYgKCF0aGlzLmhpZGRlbkNoaXBzQ291bnQgJiYgdGhpcy5oaWRkZW5DaGlwc0xpbWl0ID09PSB0aGlzLkNISVBTX1NIT1dOX01BWClcbiAgICAgIHRoaXMuaGlkZGVuQ2hpcHNMaW1pdCA9IHRoaXMuX2hpZGRlbkNoaXBzTGltaXQ7IC8vIHJlc2V0IGhpZGRlbkNoaXBzTGltaXQgdG8gb3JpZ2luYWwgI1xuICB9XG5cbiAgdG9nZ2xlSGlkZGVuQ2hpcHMoKSB7XG4gICAgdGhpcy5oaWRkZW5DaGlwc0xpbWl0ID0gdGhpcy5oaWRkZW5DaGlwc0xpbWl0ID09PSB0aGlzLkNISVBTX1NIT1dOX01BWCA/IHRoaXMuX2hpZGRlbkNoaXBzTGltaXQgOiB0aGlzLkNISVBTX1NIT1dOX01BWDtcbiAgfVxuXG4gIHJlbW92ZShldmVudCwgaXRlbSkge1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XG4gICAgdGhpcy51cGRhdGVIaWRkZW5DaGlwcygpO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UudmFsdWVGb3JtYXR0ZXIgPyB0aGlzLnNvdXJjZS52YWx1ZUZvcm1hdHRlcih0aGlzLml0ZW1zKSA6IHRoaXMuaXRlbXMubWFwKChpKSA9PiBpLnZhbHVlKTtcbiAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xuICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIG9uS2V5RG93bihldmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09IEtleS5CYWNrc3BhY2UpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMCAmJiB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoZXZlbnQsIHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50LCB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IHRvdWNoZWQgb24gYmx1clxuICBvblRvdWNoZWQoZSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIHRoaXMuYmx1ci5lbWl0KGUpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuc2V0SXRlbXMoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZGlzYWJsZVBpY2tlcklucHV0ID0gZGlzYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIF9maW5hbGl6ZUl0ZW1WYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xuICAgIGNvbnN0IHZhbHVlVG9TZXQgPSB0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS52YWx1ZUZvcm1hdHRlciA/IHRoaXMuc291cmNlLnZhbHVlRm9ybWF0dGVyKHRoaXMuaXRlbXMpIDogdGhpcy5pdGVtcy5tYXAoKGkpID0+IGkudmFsdWUpO1xuICAgIGlmIChIZWxwZXJzLmlzQmxhbmsodGhpcy52YWx1ZSkgIT09IEhlbHBlcnMuaXNCbGFuayh2YWx1ZVRvU2V0KSB8fCBKU09OLnN0cmluZ2lmeSh0aGlzLnZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkodmFsdWVUb1NldCkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVRvU2V0O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gc2V0IHRoZSBtb2RlbCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfcHJvcGFnYXRlQ2hhbmdlcyhmYWxsYmFja1ZhbHVlPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VkLmVtaXQoeyB2YWx1ZTogdGhpcy52YWx1ZT8ubGVuZ3RoID8gdGhpcy52YWx1ZSA6ICcnLCByYXdWYWx1ZTogdGhpcy5pdGVtcyB9KTtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgdGhpcy5fdXBkYXRlT3ZlcmxheSgpOyAgICBcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZU92ZXJsYXkoKSB7XG4gICAgaWYgKHRoaXMucGlja2VyPy5jb250YWluZXI/Lm92ZXJsYXlSZWYpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnBpY2tlci5jb250YWluZXIub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLnBpY2tlci5wb3B1cC5pbnN0YW5jZS5zZWxlY3RlZCA9IHRoaXMucGlja2VyLnNlbGVjdGVkO1xuICAgICAgICB0aGlzLmNoYW5nZVJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgc2hvd1ByZXZpZXdcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIHByZXZpZXcgKGNhbGxlZCBwb3B1cCkgYW5kIGFkZHMgYWxsIHRoZSBiaW5kaW5ncyB0byB0aGF0XG4gICAqIGluc3RhbmNlLiBXaWxsIHJldXNlIHRoZSBwb3B1cCBvciBjcmVhdGUgYSBuZXcgb25lIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3QuIFdpbGwgb25seSB3b3JrIGlmIHRoZXJlIGlzXG4gICAqIGEgcHJldmlld1RlbXBsYXRlIGdpdmVuIGluIHRoZSBjb25maWcuXG4gICAqL1xuICBzaG93UHJldmlldygpIHtcbiAgICBpZiAodGhpcy5zb3VyY2UucHJldmlld1RlbXBsYXRlKSB7XG4gICAgICBpZiAoIXRoaXMucG9wdXApIHtcbiAgICAgICAgdGhpcy5wb3B1cCA9IHRoaXMuY29tcG9uZW50VXRpbHMuYXBwZW5kKHRoaXMuc291cmNlLnByZXZpZXdUZW1wbGF0ZSwgdGhpcy5wcmV2aWV3KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UubWF0Y2ggPSB7IGRhdGE6IHRoaXMuc2VsZWN0ZWQuZGF0YSA/PyB0aGlzLnNlbGVjdGVkLnZhbHVlIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIGhpZGVQcmV2aWV3XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvbiAtIFRoaXMgbWV0aG9kIGRlbGV0ZXMgdGhlIHByZXZpZXcgcG9wdXAgZnJvbSB0aGUgRE9NLlxuICAgKi9cbiAgaGlkZVByZXZpZXcoKSB7XG4gICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgIHRoaXMucG9wdXAuZGVzdHJveSgpO1xuICAgICAgdGhpcy5wb3B1cCA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=