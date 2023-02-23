// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { ReplaySubject } from 'rxjs';
import { NovoLabelService } from '../../services';
import { ComponentUtils } from '../../utils';
import { Helpers } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../../utils";
import * as i2 from "../../services";
import * as i3 from "./Chip";
import * as i4 from "../icon/Icon";
import * as i5 from "../picker/Picker";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoChipsElement),
    multi: true,
};
export class NovoChipsElement {
    constructor(element, componentUtils, labels) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.labels = labels;
        this.closeOnSelect = false;
        this.placeholder = '';
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
    set disablePickerInput(v) {
        this._disablePickerInput = coerceBooleanProperty(v);
    }
    get disablePickerInput() {
        return this._disablePickerInput;
    }
    ngOnInit() {
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
        this._items.next(this.items);
        this.value = null;
        this._propagateChanges();
    }
    async setItems() {
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
                await this.source.getLabels(noLabels).then((result) => {
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
                    this._items.next(this.items);
                });
            }
        }
        this._items.next(this.items);
        const valueToSet = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
        if (Helpers.isBlank(this.value) !== Helpers.isBlank(valueToSet) || JSON.stringify(this.value) !== JSON.stringify(valueToSet)) {
            this.value = valueToSet;
            this._propagateChanges();
        }
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
    getAvatarType(item) {
        return (this.type || item?.value?.searchEntity || '').toLowerCase();
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
    remove(event, item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.deselectAll();
        this.value = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
        this._items.next(this.items);
        this._propagateChanges();
    }
    onKeyDown(event) {
        if (event.key === "Backspace" /* Backspace */) {
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
}
NovoChipsElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipsElement, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoChipsElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoChipsElement, selector: "chips,novo-chips", inputs: { closeOnSelect: "closeOnSelect", placeholder: "placeholder", source: "source", maxlength: "maxlength", type: "type", disablePickerInput: "disablePickerInput", value: "value" }, outputs: { changed: "changed", focus: "focus", blur: "blur", typing: "typing" }, host: { properties: { "class.with-value": "items.length > 0", "class.disabled": "disablePickerInput" } }, providers: [CHIPS_VALUE_ACCESSOR], viewQueries: [{ propertyName: "preview", first: true, predicate: ["preview"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: `
    <div class="novo-chip-container">
      <novo-chip
        *ngFor="let item of _items | async"
        [class.selected]="item == selected"
        [selectable]="true"
        [disabled]="disablePickerInput"
        (removed)="remove($event, item)"
        (selectionChange)="select($event, item)"
        (deselect)="deselect($event, item)"
      >
        <novo-icon *ngIf="getAvatarType(item)" class="txc-{{ getAvatarType(item) }}" novoChipAvatar>circle</novo-icon>
        {{ item.label }}
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
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
      >
      </novo-picker>
    </div>
    <div class="preview-container">
      <span #preview></span>
    </div>
    <i class="bhi-search" [class.has-value]="items.length" *ngIf="!disablePickerInput"></i>
    <label class="clear-all" *ngIf="items.length && !disablePickerInput" (click)="clearValue()"
      >{{ labels.clearAll }} <i class="bhi-times"></i
    ></label>
  `, isInline: true, components: [{ type: i3.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i4.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i5.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }], directives: [{ type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NovoChipAvatar, selector: "novo-chip-avatar, [novoChipAvatar]" }, { type: i3.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i6.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipsElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'chips,novo-chips',
                    providers: [CHIPS_VALUE_ACCESSOR],
                    template: `
    <div class="novo-chip-container">
      <novo-chip
        *ngFor="let item of _items | async"
        [class.selected]="item == selected"
        [selectable]="true"
        [disabled]="disablePickerInput"
        (removed)="remove($event, item)"
        (selectionChange)="select($event, item)"
        (deselect)="deselect($event, item)"
      >
        <novo-icon *ngIf="getAvatarType(item)" class="txc-{{ getAvatarType(item) }}" novoChipAvatar>circle</novo-icon>
        {{ item.label }}
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
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
      >
      </novo-picker>
    </div>
    <div class="preview-container">
      <span #preview></span>
    </div>
    <i class="bhi-search" [class.has-value]="items.length" *ngIf="!disablePickerInput"></i>
    <label class="clear-all" *ngIf="items.length && !disablePickerInput" (click)="clearValue()"
      >{{ labels.clearAll }} <i class="bhi-times"></i
    ></label>
  `,
                    host: {
                        '[class.with-value]': 'items.length > 0',
                        '[class.disabled]': 'disablePickerInput',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.ComponentUtils }, { type: i2.NovoLabelService }]; }, propDecorators: { closeOnSelect: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], source: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], type: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGlwcy9DaGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsU0FBUztBQUNULE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM3QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7QUFFdEMsc0RBQXNEO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQW9ERixNQUFNLE9BQU8sZ0JBQWdCO0lBNkMzQixZQUFtQixPQUFtQixFQUFVLGNBQThCLEVBQVMsTUFBd0I7UUFBNUYsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBM0MvRyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQWNqQix3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QURSLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUdGLGtCQUFrQjtzQkFEckIsS0FBSztnQkFVTixPQUFPO3NCQUROLE1BQU07Z0JBR1AsS0FBSztzQkFESixNQUFNO2dCQUdQLElBQUk7c0JBREgsTUFBTTtnQkFHUCxNQUFNO3NCQURMLE1BQU07Z0JBSVAsT0FBTztzQkFETixTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtnQkEyQjVDLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IENISVBTX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0NoaXBzRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2hpcHMsbm92by1jaGlwcycsXG4gIHByb3ZpZGVyczogW0NISVBTX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by1jaGlwLWNvbnRhaW5lclwiPlxuICAgICAgPG5vdm8tY2hpcFxuICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfaXRlbXMgfCBhc3luY1wiXG4gICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJpdGVtID09IHNlbGVjdGVkXCJcbiAgICAgICAgW3NlbGVjdGFibGVdPVwidHJ1ZVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgICAocmVtb3ZlZCk9XCJyZW1vdmUoJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwic2VsZWN0KCRldmVudCwgaXRlbSlcIlxuICAgICAgICAoZGVzZWxlY3QpPVwiZGVzZWxlY3QoJGV2ZW50LCBpdGVtKVwiXG4gICAgICA+XG4gICAgICAgIDxub3ZvLWljb24gKm5nSWY9XCJnZXRBdmF0YXJUeXBlKGl0ZW0pXCIgY2xhc3M9XCJ0eGMte3sgZ2V0QXZhdGFyVHlwZShpdGVtKSB9fVwiIG5vdm9DaGlwQXZhdGFyPmNpcmNsZTwvbm92by1pY29uPlxuICAgICAgICB7eyBpdGVtLmxhYmVsIH19XG4gICAgICAgIDxub3ZvLWljb24gKm5nSWY9XCIhZGlzYWJsZVBpY2tlcklucHV0XCIgbm92b0NoaXBSZW1vdmU+eDwvbm92by1pY29uPlxuICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNoaXAtaW5wdXQtY29udGFpbmVyXCIgKm5nSWY9XCIhbWF4bGVuZ3RoIHx8IChtYXhsZW5ndGggJiYgaXRlbXMubGVuZ3RoIDwgbWF4bGVuZ3RoKVwiPlxuICAgICAgPG5vdm8tcGlja2VyXG4gICAgICAgIGNsZWFyVmFsdWVPblNlbGVjdD1cInRydWVcIlxuICAgICAgICBbY2xvc2VPblNlbGVjdF09XCJjbG9zZU9uU2VsZWN0XCJcbiAgICAgICAgW2NvbmZpZ109XCJzb3VyY2VcIlxuICAgICAgICBbZGlzYWJsZVBpY2tlcklucHV0XT1cImRpc2FibGVQaWNrZXJJbnB1dFwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgIFsobmdNb2RlbCldPVwiaXRlbVRvQWRkXCJcbiAgICAgICAgKHNlbGVjdCk9XCJhZGQoJGV2ZW50KVwiXG4gICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICh0eXBpbmcpPVwib25UeXBpbmcoJGV2ZW50KVwiXG4gICAgICAgIChibHVyKT1cIm9uVG91Y2hlZCgkZXZlbnQpXCJcbiAgICAgICAgW3NlbGVjdGVkXT1cIml0ZW1zXCJcbiAgICAgICAgW292ZXJyaWRlRWxlbWVudF09XCJlbGVtZW50XCJcbiAgICAgID5cbiAgICAgIDwvbm92by1waWNrZXI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInByZXZpZXctY29udGFpbmVyXCI+XG4gICAgICA8c3BhbiAjcHJldmlldz48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGkgY2xhc3M9XCJiaGktc2VhcmNoXCIgW2NsYXNzLmhhcy12YWx1ZV09XCJpdGVtcy5sZW5ndGhcIiAqbmdJZj1cIiFkaXNhYmxlUGlja2VySW5wdXRcIj48L2k+XG4gICAgPGxhYmVsIGNsYXNzPVwiY2xlYXItYWxsXCIgKm5nSWY9XCJpdGVtcy5sZW5ndGggJiYgIWRpc2FibGVQaWNrZXJJbnB1dFwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIlxuICAgICAgPnt7IGxhYmVscy5jbGVhckFsbCB9fSA8aSBjbGFzcz1cImJoaS10aW1lc1wiPjwvaVxuICAgID48L2xhYmVsPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy53aXRoLXZhbHVlXSc6ICdpdGVtcy5sZW5ndGggPiAwJyxcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlUGlja2VySW5wdXQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2hpcHNFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpXG4gIGNsb3NlT25TZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKVxuICBzb3VyY2U6IGFueTtcbiAgQElucHV0KClcbiAgbWF4bGVuZ3RoOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHR5cGU6IGFueTtcbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVQaWNrZXJJbnB1dCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZVBpY2tlcklucHV0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBkaXNhYmxlUGlja2VySW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVQaWNrZXJJbnB1dDtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlUGlja2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KClcbiAgY2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHR5cGluZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgncHJldmlldycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBwcmV2aWV3OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG4gIHNlbGVjdGVkOiBhbnkgPSBudWxsO1xuICBjb25maWc6IGFueSA9IHt9O1xuICBtb2RlbDogYW55O1xuICBpdGVtVG9BZGQ6IGFueTtcbiAgcG9wdXA6IGFueTtcbiAgLy8gcHJpdmF0ZSBkYXRhIG1vZGVsXG4gIF92YWx1ZTogYW55ID0gJyc7XG4gIF9pdGVtcyA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xuICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3NcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY29tcG9uZW50VXRpbHM6IENvbXBvbmVudFV0aWxzLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0SXRlbXMoKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUoc2VsZWN0ZWQpIHtcbiAgICB0aGlzLml0ZW1Ub0FkZCA9ICcnO1xuICAgIHRoaXMuX3ZhbHVlID0gc2VsZWN0ZWQ7XG4gIH1cblxuICBjbGVhclZhbHVlKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xuICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIGFzeW5jIHNldEl0ZW1zKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICBpZiAodGhpcy5tb2RlbCAmJiBBcnJheS5pc0FycmF5KHRoaXMubW9kZWwpKSB7XG4gICAgICBjb25zdCBub0xhYmVscyA9IFtdO1xuICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB0aGlzLm1vZGVsKSB7XG4gICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgaWYgKHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLmZvcm1hdCAmJiBIZWxwZXJzLnZhbGlkYXRlSW50ZXJwb2xhdGlvblByb3BzKHRoaXMuc291cmNlLmZvcm1hdCwgdmFsdWUpKSB7XG4gICAgICAgICAgbGFiZWwgPSBIZWxwZXJzLmludGVycG9sYXRlKHRoaXMuc291cmNlLmZvcm1hdCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZSAmJiBsYWJlbCAmJiBsYWJlbCAhPT0gdGhpcy5zb3VyY2UuZm9ybWF0KSB7XG4gICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3VyY2UuZ2V0TGFiZWxzICYmIHR5cGVvZiB0aGlzLnNvdXJjZS5nZXRMYWJlbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBub0xhYmVscy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNvdXJjZS5vcHRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5zb3VyY2Uub3B0aW9ucykpIHtcbiAgICAgICAgICB0aGlzLml0ZW1zLnB1c2godGhpcy5nZXRMYWJlbEZyb21PcHRpb25zKHZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3VyY2UuY2F0ZWdvcnlNYXAgJiYgdGhpcy5zb3VyY2UuY2F0ZWdvcnlNYXAuc2l6ZSkge1xuICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgbGFiZWw6IHZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobm9MYWJlbHMubGVuZ3RoID4gMCAmJiB0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5nZXRMYWJlbHMgJiYgdHlwZW9mIHRoaXMuc291cmNlLmdldExhYmVscyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBhd2FpdCB0aGlzLnNvdXJjZS5nZXRMYWJlbHMobm9MYWJlbHMpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgcmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoJ2xhYmVsJykpIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogdmFsdWUubGFiZWwsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNvdXJjZS5vcHRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5zb3VyY2Uub3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHRoaXMuZ2V0TGFiZWxGcm9tT3B0aW9ucyh2YWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2l0ZW1zLm5leHQodGhpcy5pdGVtcyk7XG4gICAgY29uc3QgdmFsdWVUb1NldCA9IHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLnZhbHVlRm9ybWF0dGVyID8gdGhpcy5zb3VyY2UudmFsdWVGb3JtYXR0ZXIodGhpcy5pdGVtcykgOiB0aGlzLml0ZW1zLm1hcCgoaSkgPT4gaS52YWx1ZSk7XG4gICAgaWYgKEhlbHBlcnMuaXNCbGFuayh0aGlzLnZhbHVlKSAhPT0gSGVscGVycy5pc0JsYW5rKHZhbHVlVG9TZXQpIHx8IEpTT04uc3RyaW5naWZ5KHRoaXMudmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeSh2YWx1ZVRvU2V0KSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlVG9TZXQ7XG4gICAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGFiZWxGcm9tT3B0aW9ucyh2YWx1ZSkge1xuICAgIGxldCBpZCA9IHZhbHVlO1xuICAgIGxldCBvcHRMYWJlbCA9IHRoaXMuc291cmNlLm9wdGlvbnMuZmluZCgodmFsKSA9PiB2YWwudmFsdWUgPT09IHZhbHVlKTtcbiAgICBpZiAoIW9wdExhYmVsICYmIHZhbHVlLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICBvcHRMYWJlbCA9IHRoaXMuc291cmNlLm9wdGlvbnMuZmluZCgodmFsKSA9PiB2YWwudmFsdWUgPT09IHZhbHVlLmlkKTtcbiAgICAgIGlkID0gdmFsdWUuaWQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogaWQsXG4gICAgICBsYWJlbDogb3B0TGFiZWwgPyBvcHRMYWJlbC5sYWJlbCA6IHZhbHVlLFxuICAgIH07XG4gIH1cblxuICBnZXRBdmF0YXJUeXBlKGl0ZW06IGFueSkge1xuICAgIHJldHVybiAodGhpcy50eXBlIHx8IGl0ZW0/LnZhbHVlPy5zZWFyY2hFbnRpdHkgfHwgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICBkZXNlbGVjdEFsbChldmVudD8pIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB0aGlzLmhpZGVQcmV2aWV3KCk7XG4gIH1cblxuICBzZWxlY3QoZXZlbnQ/LCBpdGVtPykge1xuICAgIHRoaXMuYmx1ci5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGl0ZW07XG4gICAgdGhpcy5zaG93UHJldmlldygpO1xuICB9XG5cbiAgZGVzZWxlY3QoZXZlbnQ/LCBpdGVtPykge1xuICAgIHRoaXMuYmx1ci5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gIH1cblxuICBvblR5cGluZyhldmVudD8pIHtcbiAgICB0aGlzLnR5cGluZy5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIG9uRm9jdXMoZXZlbnQ/KSB7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgdGhpcy5mb2N1cy5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGFkZChldmVudCkge1xuICAgIGlmIChldmVudCAmJiAhKGV2ZW50IGluc3RhbmNlb2YgRXZlbnQpKSB7XG4gICAgICB0aGlzLml0ZW1zLnB1c2goZXZlbnQpO1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLnZhbHVlRm9ybWF0dGVyID8gdGhpcy5zb3VyY2UudmFsdWVGb3JtYXR0ZXIodGhpcy5pdGVtcykgOiB0aGlzLml0ZW1zLm1hcCgoaSkgPT4gaS52YWx1ZSk7XG4gICAgICAvLyBTZXQgZm9jdXMgb24gdGhlIHBpY2tlclxuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdub3ZvLXBpY2tlciA+IGlucHV0Jyk7XG4gICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcbiAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gIH1cblxuICByZW1vdmUoZXZlbnQsIGl0ZW0pIHtcbiAgICB0aGlzLml0ZW1zLnNwbGljZSh0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UudmFsdWVGb3JtYXR0ZXIgPyB0aGlzLnNvdXJjZS52YWx1ZUZvcm1hdHRlcih0aGlzLml0ZW1zKSA6IHRoaXMuaXRlbXMubWFwKChpKSA9PiBpLnZhbHVlKTtcbiAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xuICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIG9uS2V5RG93bihldmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09IEtleS5CYWNrc3BhY2UpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMCAmJiB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoZXZlbnQsIHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50LCB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IHRvdWNoZWQgb24gYmx1clxuICBvblRvdWNoZWQoZSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIHRoaXMuYmx1ci5lbWl0KGUpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuc2V0SXRlbXMoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZGlzYWJsZVBpY2tlcklucHV0ID0gZGlzYWJsZWQ7XG4gIH1cblxuICAvKiogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIHNldCB0aGUgbW9kZWwgdmFsdWUuICovXG4gIHByaXZhdGUgX3Byb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlZC5lbWl0KHsgdmFsdWU6IHRoaXMudmFsdWU/Lmxlbmd0aCA/IHRoaXMudmFsdWUgOiAnJywgcmF3VmFsdWU6IHRoaXMuaXRlbXMgfSk7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIHNob3dQcmV2aWV3XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBwcmV2aWV3IChjYWxsZWQgcG9wdXApIGFuZCBhZGRzIGFsbCB0aGUgYmluZGluZ3MgdG8gdGhhdFxuICAgKiBpbnN0YW5jZS4gV2lsbCByZXVzZSB0aGUgcG9wdXAgb3IgY3JlYXRlIGEgbmV3IG9uZSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LiBXaWxsIG9ubHkgd29yayBpZiB0aGVyZSBpc1xuICAgKiBhIHByZXZpZXdUZW1wbGF0ZSBnaXZlbiBpbiB0aGUgY29uZmlnLlxuICAgKi9cbiAgc2hvd1ByZXZpZXcoKSB7XG4gICAgaWYgKHRoaXMuc291cmNlLnByZXZpZXdUZW1wbGF0ZSkge1xuICAgICAgaWYgKCF0aGlzLnBvcHVwKSB7XG4gICAgICAgIHRoaXMucG9wdXAgPSB0aGlzLmNvbXBvbmVudFV0aWxzLmFwcGVuZCh0aGlzLnNvdXJjZS5wcmV2aWV3VGVtcGxhdGUsIHRoaXMucHJldmlldyk7XG4gICAgICB9XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLm1hdGNoID0geyBkYXRhOiB0aGlzLnNlbGVjdGVkLmRhdGEgPz8gdGhpcy5zZWxlY3RlZC52YWx1ZSB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBoaWRlUHJldmlld1xuICAgKlxuICAgKiBAZGVzY3JpcHRpb24gLSBUaGlzIG1ldGhvZCBkZWxldGVzIHRoZSBwcmV2aWV3IHBvcHVwIGZyb20gdGhlIERPTS5cbiAgICovXG4gIGhpZGVQcmV2aWV3KCkge1xuICAgIGlmICh0aGlzLnBvcHVwKSB7XG4gICAgICB0aGlzLnBvcHVwLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMucG9wdXAgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19