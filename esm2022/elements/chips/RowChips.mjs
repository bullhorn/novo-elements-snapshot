// NG2
import { Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { NovoChipElement } from './Chip';
import { NovoChipsElement } from './Chips';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "novo-elements/services";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/picker";
import * as i5 from "novo-elements/elements/field";
// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRowChipsElement),
    multi: true,
};
export class NovoRowChipElement extends NovoChipElement {
    onSelect(e) {
        return false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoRowChipElement, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoRowChipElement, selector: "novo-row-chip", host: { attributes: { "role": "option" }, listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)", "focus": "focus()", "blur": "_blur()" }, properties: { "attr.tabindex": "disabled ? null : tabIndex", "class.novo-row-chip-selected": "selected", "class.novo-row-chip-with-trailing-icon": "removeIcon", "class.novo-row-chip-disabled": "disabled", "attr.disabled": "disabled || null", "attr.aria-disabled": "disabled.toString()", "attr.aria-selected": "ariaSelected" }, classAttribute: "novo-row-chip novo-focus-indicator" }, usesInheritance: true, ngImport: i0, template: `
    <div class="novo-row-chips-columns">
      <ng-content></ng-content>
      <i class="bhi-delete-o" *ngIf="!disabled" (click)="remove()"></i>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoRowChipElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-row-chip',
                    template: `
    <div class="novo-row-chips-columns">
      <ng-content></ng-content>
      <i class="bhi-delete-o" *ngIf="!disabled" (click)="remove()"></i>
    </div>
  `,
                    host: {
                        class: 'novo-row-chip novo-focus-indicator',
                        '[attr.tabindex]': 'disabled ? null : tabIndex',
                        role: 'option',
                        '[class.novo-row-chip-selected]': 'selected',
                        '[class.novo-row-chip-with-trailing-icon]': 'removeIcon',
                        '[class.novo-row-chip-disabled]': 'disabled',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-selected]': 'ariaSelected',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                    },
                }]
        }] });
export class NovoRowChipsElement extends NovoChipsElement {
    constructor(element, componentUtils, labels) {
        super(element, componentUtils, labels);
        this.closeOnSelect = true;
    }
    onKeyDown(event) {
        return;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoRowChipsElement, deps: [{ token: i0.ElementRef }, { token: i2.ComponentUtils }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoRowChipsElement, selector: "novo-row-chips", inputs: { closeOnSelect: "closeOnSelect" }, host: { properties: { "class.with-value": "items.length > 0" } }, providers: [CHIPS_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: `
    <div class="novo-row-chips-columns" *ngIf="items.length > 0">
      <div class="column-label" [style.flexBasis.px]="column.width || 200" *ngFor="let column of source.columns">{{ column.label }}</div>
    </div>
    <div class="novo-row-chips-empty-message" *ngIf="source.emptyReadOnlyMessage && disablePickerInput && items.length === 0">
      {{ source.emptyReadOnlyMessage }}
    </div>
    <novo-row-chip
      *ngFor="let item of _items | async"
      [type]="type || item?.value?.searchEntity"
      [class.selected]="item == selected"
      [disabled]="disablePickerInput"
      (removed)="remove($event, item)"
      (selectionChange)="select($event, item)"
    >
      <div
        class="column-data"
        [class.show-overflow]="column.showOverflow"
        [class.editable]="column.editable"
        [style.flexBasis.px]="column.width || 200"
        *ngFor="let column of source.columns"
      >
        <ng-container *ngIf="column.editable">
          <novo-field>
            <input novoInput [type]="column.type || 'text'" [(ngModel)]="item.value[column.name]" />
          </novo-field>
        </ng-container>
        <ng-container *ngIf="!column.editable">
          <span>{{ column.data(item) }}</span>
        </ng-container>
      </div>
    </novo-row-chip>
    <novo-picker
      clearValueOnSelect="true"
      [closeOnSelect]="closeOnSelect"
      [config]="source"
      [disablePickerInput]="disablePickerInput"
      [hidden]="disablePickerInput"
      [placeholder]="placeholder"
      [(ngModel)]="itemToAdd"
      (select)="add($event)"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (typing)="onTyping($event)"
      (blur)="onTouched($event)"
      [selected]="items"
      *ngIf="!maxlength || (maxlength && items.length < maxlength)"
    >
    </novo-picker>
    <div class="preview-container">
      <span #preview></span>
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-flow:column;gap:.8rem}:host ::ng-deep .novo-row-chips-columns{display:flex;align-items:flex-end;margin-bottom:1em}:host ::ng-deep .novo-row-chips-columns .column-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1;margin-right:1em}:host ::ng-deep .novo-row-chips-columns .column-label.text-capitalize{text-transform:capitalize}:host ::ng-deep .novo-row-chips-columns .column-label.text-uppercase{text-transform:uppercase}:host ::ng-deep .novo-row-chips-columns .column-label.text-nowrap{white-space:nowrap}:host ::ng-deep .novo-row-chips-columns .column-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-default{font-size:inherit}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-body{font-size:1.3rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-xs{font-size:1rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-sm{font-size:1.2rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-md{font-size:1.3rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-lg{font-size:1.6rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-xl{font-size:2rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-2xl{font-size:2.6rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-3xl{font-size:3.2rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-smaller{font-size:.8em}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-larger{font-size:1.2em}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-black{color:#000}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-white{color:#fff}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-gray{color:#9e9e9e}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grey{color:#9e9e9e}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-offWhite{color:#f7f7f7}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bright{color:#f7f7f7}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-light{color:#dbdbdb}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-neutral{color:#4f5361}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-dark{color:#3d464d}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-orange{color:#ff6900}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-navigation{color:#202945}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-skyBlue{color:#009bdf}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-steel{color:#5b6770}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-metal{color:#637893}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sand{color:#f4f4f4}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-silver{color:#e2e2e2}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-stone{color:#bebebe}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-ash{color:#a0a0a0}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-slate{color:#707070}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-onyx{color:#526980}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-charcoal{color:#282828}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-moonlight{color:#1a242f}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-midnight{color:#202945}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-darkness{color:#161f27}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-navy{color:#0d2d42}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-aqua{color:#3bafda}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-ocean{color:#4a89dc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-mint{color:#37bc9b}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grass{color:#8cc152}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sunflower{color:#f6b042}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bittersweet{color:#eb6845}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grapefruit{color:#da4453}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-carnation{color:#d770ad}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-lavender{color:#967adc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-mountain{color:#9678b6}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-info{color:#4a89dc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-positive{color:#4a89dc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-success{color:#8cc152}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-negative{color:#da4453}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-danger{color:#da4453}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-error{color:#da4453}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-warning{color:#f6b042}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-empty{color:#cccdcc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-disabled{color:#bebebe}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-background{color:#f7f7f7}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-backgroundDark{color:#e2e2e2}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-presentation{color:#5b6770}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bullhorn{color:#ff6900}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-pulse{color:#3bafda}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-company{color:#39d}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-candidate{color:#4b7}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-lead{color:#a69}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-contact{color:#fa4}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-clientcontact{color:#fa4}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-opportunity{color:#625}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-job{color:#b56}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-joborder{color:#b56}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-submission{color:#a9adbb}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sendout{color:#747884}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-placement{color:#0b344f}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-note{color:#747884}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-contract{color:#454ea0}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-jobCode{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-earnCode{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-invoiceStatement{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-billableCharge{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-payableCharge{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-user{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-corporateUser{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-distributionList{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-credential{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-person{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.margin-before{margin-top:.4rem}:host ::ng-deep .novo-row-chips-columns .column-label.margin-after{margin-bottom:.8rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-small{max-width:40ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-medium{max-width:55ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-large{max-width:70ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-hairline{font-weight:100}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-thin{font-weight:200}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-light{font-weight:300}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-normal{font-weight:400}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-medium{font-weight:500}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-semibold{font-weight:600}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-bold{font-weight:700}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-extrabold{font-weight:800}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-heavy{font-weight:900}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-lighter{font-weight:lighter}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-bolder{font-weight:bolder}:host ::ng-deep .novo-row-chips-columns .column-label:first-of-type{flex:0 0 275px}:host ::ng-deep .novo-row-chips-columns .column-data{display:flex;align-items:center;background:transparent!important;border:none;border-bottom:1px dashed #85939e;border-radius:0;outline:none;height:2em;width:100%;margin:0 1em 0 0}:host ::ng-deep .novo-row-chips-columns .column-data.editable{border-bottom:none}:host ::ng-deep .novo-row-chips-columns .column-data.editable input{background:none;border:none}:host ::ng-deep .novo-row-chips-columns .column-data.show-overflow{height:unset}:host ::ng-deep .novo-row-chips-columns .column-data.show-overflow span{overflow:visible;text-overflow:unset;max-height:unset}:host ::ng-deep .novo-row-chips-columns .column-data:first-of-type{flex:0 0 275px}:host ::ng-deep .novo-row-chips-columns .column-data span{color:inherit;align-items:flex-start;display:flex;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;line-clamp:2;line-height:1em;max-height:2em;min-height:1em}:host ::ng-deep .novo-row-chips-columns i.bhi-delete-o{color:#da4453}:host .novo-chip.novo-row-chip{padding:0}:host .novo-row-chips-empty-message{font-style:italic;color:#9e9e9e}:host i{cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "allowCustomValues", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }, { kind: "component", type: i5.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i5.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { kind: "component", type: NovoRowChipElement, selector: "novo-row-chip" }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoRowChipsElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-row-chips', providers: [CHIPS_VALUE_ACCESSOR], host: {
                        '[class.with-value]': 'items.length > 0',
                    }, template: `
    <div class="novo-row-chips-columns" *ngIf="items.length > 0">
      <div class="column-label" [style.flexBasis.px]="column.width || 200" *ngFor="let column of source.columns">{{ column.label }}</div>
    </div>
    <div class="novo-row-chips-empty-message" *ngIf="source.emptyReadOnlyMessage && disablePickerInput && items.length === 0">
      {{ source.emptyReadOnlyMessage }}
    </div>
    <novo-row-chip
      *ngFor="let item of _items | async"
      [type]="type || item?.value?.searchEntity"
      [class.selected]="item == selected"
      [disabled]="disablePickerInput"
      (removed)="remove($event, item)"
      (selectionChange)="select($event, item)"
    >
      <div
        class="column-data"
        [class.show-overflow]="column.showOverflow"
        [class.editable]="column.editable"
        [style.flexBasis.px]="column.width || 200"
        *ngFor="let column of source.columns"
      >
        <ng-container *ngIf="column.editable">
          <novo-field>
            <input novoInput [type]="column.type || 'text'" [(ngModel)]="item.value[column.name]" />
          </novo-field>
        </ng-container>
        <ng-container *ngIf="!column.editable">
          <span>{{ column.data(item) }}</span>
        </ng-container>
      </div>
    </novo-row-chip>
    <novo-picker
      clearValueOnSelect="true"
      [closeOnSelect]="closeOnSelect"
      [config]="source"
      [disablePickerInput]="disablePickerInput"
      [hidden]="disablePickerInput"
      [placeholder]="placeholder"
      [(ngModel)]="itemToAdd"
      (select)="add($event)"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (typing)="onTyping($event)"
      (blur)="onTouched($event)"
      [selected]="items"
      *ngIf="!maxlength || (maxlength && items.length < maxlength)"
    >
    </novo-picker>
    <div class="preview-container">
      <span #preview></span>
    </div>
  `, styles: [":host{display:flex;flex-flow:column;gap:.8rem}:host ::ng-deep .novo-row-chips-columns{display:flex;align-items:flex-end;margin-bottom:1em}:host ::ng-deep .novo-row-chips-columns .column-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1;margin-right:1em}:host ::ng-deep .novo-row-chips-columns .column-label.text-capitalize{text-transform:capitalize}:host ::ng-deep .novo-row-chips-columns .column-label.text-uppercase{text-transform:uppercase}:host ::ng-deep .novo-row-chips-columns .column-label.text-nowrap{white-space:nowrap}:host ::ng-deep .novo-row-chips-columns .column-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-default{font-size:inherit}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-body{font-size:1.3rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-xs{font-size:1rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-sm{font-size:1.2rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-md{font-size:1.3rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-lg{font-size:1.6rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-xl{font-size:2rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-2xl{font-size:2.6rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-3xl{font-size:3.2rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-smaller{font-size:.8em}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-larger{font-size:1.2em}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-black{color:#000}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-white{color:#fff}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-gray{color:#9e9e9e}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grey{color:#9e9e9e}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-offWhite{color:#f7f7f7}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bright{color:#f7f7f7}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-light{color:#dbdbdb}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-neutral{color:#4f5361}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-dark{color:#3d464d}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-orange{color:#ff6900}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-navigation{color:#202945}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-skyBlue{color:#009bdf}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-steel{color:#5b6770}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-metal{color:#637893}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sand{color:#f4f4f4}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-silver{color:#e2e2e2}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-stone{color:#bebebe}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-ash{color:#a0a0a0}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-slate{color:#707070}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-onyx{color:#526980}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-charcoal{color:#282828}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-moonlight{color:#1a242f}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-midnight{color:#202945}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-darkness{color:#161f27}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-navy{color:#0d2d42}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-aqua{color:#3bafda}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-ocean{color:#4a89dc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-mint{color:#37bc9b}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grass{color:#8cc152}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sunflower{color:#f6b042}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bittersweet{color:#eb6845}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grapefruit{color:#da4453}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-carnation{color:#d770ad}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-lavender{color:#967adc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-mountain{color:#9678b6}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-info{color:#4a89dc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-positive{color:#4a89dc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-success{color:#8cc152}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-negative{color:#da4453}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-danger{color:#da4453}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-error{color:#da4453}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-warning{color:#f6b042}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-empty{color:#cccdcc}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-disabled{color:#bebebe}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-background{color:#f7f7f7}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-backgroundDark{color:#e2e2e2}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-presentation{color:#5b6770}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bullhorn{color:#ff6900}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-pulse{color:#3bafda}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-company{color:#39d}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-candidate{color:#4b7}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-lead{color:#a69}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-contact{color:#fa4}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-clientcontact{color:#fa4}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-opportunity{color:#625}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-job{color:#b56}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-joborder{color:#b56}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-submission{color:#a9adbb}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sendout{color:#747884}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-placement{color:#0b344f}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-note{color:#747884}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-contract{color:#454ea0}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-jobCode{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-earnCode{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-invoiceStatement{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-billableCharge{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-payableCharge{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-user{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-corporateUser{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-distributionList{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-credential{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-person{color:#696d79}:host ::ng-deep .novo-row-chips-columns .column-label.margin-before{margin-top:.4rem}:host ::ng-deep .novo-row-chips-columns .column-label.margin-after{margin-bottom:.8rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-small{max-width:40ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-medium{max-width:55ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-large{max-width:70ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-hairline{font-weight:100}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-thin{font-weight:200}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-light{font-weight:300}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-normal{font-weight:400}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-medium{font-weight:500}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-semibold{font-weight:600}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-bold{font-weight:700}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-extrabold{font-weight:800}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-heavy{font-weight:900}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-lighter{font-weight:lighter}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-bolder{font-weight:bolder}:host ::ng-deep .novo-row-chips-columns .column-label:first-of-type{flex:0 0 275px}:host ::ng-deep .novo-row-chips-columns .column-data{display:flex;align-items:center;background:transparent!important;border:none;border-bottom:1px dashed #85939e;border-radius:0;outline:none;height:2em;width:100%;margin:0 1em 0 0}:host ::ng-deep .novo-row-chips-columns .column-data.editable{border-bottom:none}:host ::ng-deep .novo-row-chips-columns .column-data.editable input{background:none;border:none}:host ::ng-deep .novo-row-chips-columns .column-data.show-overflow{height:unset}:host ::ng-deep .novo-row-chips-columns .column-data.show-overflow span{overflow:visible;text-overflow:unset;max-height:unset}:host ::ng-deep .novo-row-chips-columns .column-data:first-of-type{flex:0 0 275px}:host ::ng-deep .novo-row-chips-columns .column-data span{color:inherit;align-items:flex-start;display:flex;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;line-clamp:2;line-height:1em;max-height:2em;min-height:1em}:host ::ng-deep .novo-row-chips-columns i.bhi-delete-o{color:#da4453}:host .novo-chip.novo-row-chip{padding:0}:host .novo-row-chips-empty-message{font-style:italic;color:#9e9e9e}:host i{cursor:pointer}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i2.ComponentUtils }, { type: i2.NovoLabelService }], propDecorators: { closeOnSelect: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93Q2hpcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGlwcy9Sb3dDaGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7O0FBRTNDLHNEQUFzRDtBQUN0RCxNQUFNLG9CQUFvQixHQUFHO0lBQzNCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUEwQkYsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGVBQWU7SUFDckQsUUFBUSxDQUFDLENBQUM7UUFDUixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OEdBSFUsa0JBQWtCO2tHQUFsQixrQkFBa0IsaW5CQXRCbkI7Ozs7O0dBS1Q7OzJGQWlCVSxrQkFBa0I7a0JBeEI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUU7Ozs7O0dBS1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxvQ0FBb0M7d0JBQzNDLGlCQUFpQixFQUFFLDRCQUE0Qjt3QkFDL0MsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsZ0NBQWdDLEVBQUUsVUFBVTt3QkFDNUMsMENBQTBDLEVBQUUsWUFBWTt3QkFDeEQsZ0NBQWdDLEVBQUUsVUFBVTt3QkFDNUMsaUJBQWlCLEVBQUUsa0JBQWtCO3dCQUNyQyxzQkFBc0IsRUFBRSxxQkFBcUI7d0JBQzdDLHNCQUFzQixFQUFFLGNBQWM7d0JBQ3RDLFNBQVMsRUFBRSxzQkFBc0I7d0JBQ2pDLFdBQVcsRUFBRSx3QkFBd0I7d0JBQ3JDLFNBQVMsRUFBRSxTQUFTO3dCQUNwQixRQUFRLEVBQUUsU0FBUztxQkFDcEI7aUJBQ0Y7O0FBb0VELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFJdkQsWUFBWSxPQUFtQixFQUFFLGNBQThCLEVBQUUsTUFBd0I7UUFDdkYsS0FBSyxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFIekMsa0JBQWEsR0FBWSxJQUFJLENBQUM7SUFJOUIsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFLO1FBQ2IsT0FBTztJQUNULENBQUM7OEdBVlUsbUJBQW1CO2tHQUFuQixtQkFBbUIsdUpBM0RuQixDQUFDLG9CQUFvQixDQUFDLGlEQUl2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9EVCw4allBaEVVLGtCQUFrQjs7MkZBbUVsQixtQkFBbUI7a0JBN0QvQixTQUFTOytCQUNFLGdCQUFnQixhQUNmLENBQUMsb0JBQW9CLENBQUMsUUFDM0I7d0JBQ0osb0JBQW9CLEVBQUUsa0JBQWtCO3FCQUN6QyxZQUNTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RUOzJJQUtELGFBQWE7c0JBRFosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IENvbXBvbmVudFV0aWxzLCBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOb3ZvQ2hpcEVsZW1lbnQgfSBmcm9tICcuL0NoaXAnO1xuaW1wb3J0IHsgTm92b0NoaXBzRWxlbWVudCB9IGZyb20gJy4vQ2hpcHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IENISVBTX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1Jvd0NoaXBzRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1yb3ctY2hpcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tcm93LWNoaXBzLWNvbHVtbnNcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDxpIGNsYXNzPVwiYmhpLWRlbGV0ZS1vXCIgKm5nSWY9XCIhZGlzYWJsZWRcIiAoY2xpY2spPVwicmVtb3ZlKClcIj48L2k+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tcm93LWNoaXAgbm92by1mb2N1cy1pbmRpY2F0b3InLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyBudWxsIDogdGFiSW5kZXgnLFxuICAgIHJvbGU6ICdvcHRpb24nLFxuICAgICdbY2xhc3Mubm92by1yb3ctY2hpcC1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICdbY2xhc3Mubm92by1yb3ctY2hpcC13aXRoLXRyYWlsaW5nLWljb25dJzogJ3JlbW92ZUljb24nLFxuICAgICdbY2xhc3Mubm92by1yb3ctY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICdhcmlhU2VsZWN0ZWQnLFxuICAgICcoY2xpY2spJzogJ19oYW5kbGVDbGljaygkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ19oYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICcoYmx1ciknOiAnX2JsdXIoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Sb3dDaGlwRWxlbWVudCBleHRlbmRzIE5vdm9DaGlwRWxlbWVudCB7XG4gIG9uU2VsZWN0KGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1yb3ctY2hpcHMnLFxuICBwcm92aWRlcnM6IFtDSElQU19WQUxVRV9BQ0NFU1NPUl0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLndpdGgtdmFsdWVdJzogJ2l0ZW1zLmxlbmd0aCA+IDAnLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXJvdy1jaGlwcy1jb2x1bW5zXCIgKm5nSWY9XCJpdGVtcy5sZW5ndGggPiAwXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLWxhYmVsXCIgW3N0eWxlLmZsZXhCYXNpcy5weF09XCJjb2x1bW4ud2lkdGggfHwgMjAwXCIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBzb3VyY2UuY29sdW1uc1wiPnt7IGNvbHVtbi5sYWJlbCB9fTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXJvdy1jaGlwcy1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJzb3VyY2UuZW1wdHlSZWFkT25seU1lc3NhZ2UgJiYgZGlzYWJsZVBpY2tlcklucHV0ICYmIGl0ZW1zLmxlbmd0aCA9PT0gMFwiPlxuICAgICAge3sgc291cmNlLmVtcHR5UmVhZE9ubHlNZXNzYWdlIH19XG4gICAgPC9kaXY+XG4gICAgPG5vdm8tcm93LWNoaXBcbiAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9pdGVtcyB8IGFzeW5jXCJcbiAgICAgIFt0eXBlXT1cInR5cGUgfHwgaXRlbT8udmFsdWU/LnNlYXJjaEVudGl0eVwiXG4gICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiaXRlbSA9PSBzZWxlY3RlZFwiXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZVBpY2tlcklucHV0XCJcbiAgICAgIChyZW1vdmVkKT1cInJlbW92ZSgkZXZlbnQsIGl0ZW0pXCJcbiAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwic2VsZWN0KCRldmVudCwgaXRlbSlcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjb2x1bW4tZGF0YVwiXG4gICAgICAgIFtjbGFzcy5zaG93LW92ZXJmbG93XT1cImNvbHVtbi5zaG93T3ZlcmZsb3dcIlxuICAgICAgICBbY2xhc3MuZWRpdGFibGVdPVwiY29sdW1uLmVkaXRhYmxlXCJcbiAgICAgICAgW3N0eWxlLmZsZXhCYXNpcy5weF09XCJjb2x1bW4ud2lkdGggfHwgMjAwXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBzb3VyY2UuY29sdW1uc1wiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4uZWRpdGFibGVcIj5cbiAgICAgICAgICA8bm92by1maWVsZD5cbiAgICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgW3R5cGVdPVwiY29sdW1uLnR5cGUgfHwgJ3RleHQnXCIgWyhuZ01vZGVsKV09XCJpdGVtLnZhbHVlW2NvbHVtbi5uYW1lXVwiIC8+XG4gICAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjb2x1bW4uZWRpdGFibGVcIj5cbiAgICAgICAgICA8c3Bhbj57eyBjb2x1bW4uZGF0YShpdGVtKSB9fTwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L25vdm8tcm93LWNoaXA+XG4gICAgPG5vdm8tcGlja2VyXG4gICAgICBjbGVhclZhbHVlT25TZWxlY3Q9XCJ0cnVlXCJcbiAgICAgIFtjbG9zZU9uU2VsZWN0XT1cImNsb3NlT25TZWxlY3RcIlxuICAgICAgW2NvbmZpZ109XCJzb3VyY2VcIlxuICAgICAgW2Rpc2FibGVQaWNrZXJJbnB1dF09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgW2hpZGRlbl09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIFsobmdNb2RlbCldPVwiaXRlbVRvQWRkXCJcbiAgICAgIChzZWxlY3QpPVwiYWRkKCRldmVudClcIlxuICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAodHlwaW5nKT1cIm9uVHlwaW5nKCRldmVudClcIlxuICAgICAgKGJsdXIpPVwib25Ub3VjaGVkKCRldmVudClcIlxuICAgICAgW3NlbGVjdGVkXT1cIml0ZW1zXCJcbiAgICAgICpuZ0lmPVwiIW1heGxlbmd0aCB8fCAobWF4bGVuZ3RoICYmIGl0ZW1zLmxlbmd0aCA8IG1heGxlbmd0aClcIlxuICAgID5cbiAgICA8L25vdm8tcGlja2VyPlxuICAgIDxkaXYgY2xhc3M9XCJwcmV2aWV3LWNvbnRhaW5lclwiPlxuICAgICAgPHNwYW4gI3ByZXZpZXc+PC9zcGFuPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9Sb3dDaGlwcy5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Sb3dDaGlwc0VsZW1lbnQgZXh0ZW5kcyBOb3ZvQ2hpcHNFbGVtZW50IHtcbiAgQElucHV0KClcbiAgY2xvc2VPblNlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgY29tcG9uZW50VXRpbHM6IENvbXBvbmVudFV0aWxzLCBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihlbGVtZW50LCBjb21wb25lbnRVdGlscywgbGFiZWxzKTtcbiAgfVxuXG4gIG9uS2V5RG93bihldmVudCkge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19