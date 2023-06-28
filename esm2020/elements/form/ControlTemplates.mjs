import { Component, QueryList, ViewChildren } from '@angular/core';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoTemplate } from 'novo-elements/elements/common';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/addons/ckeditor";
import * as i3 from "novo-elements/addons/ace-editor";
import * as i4 from "./extras/file/FileInput";
import * as i5 from "novo-elements/elements/tiles";
import * as i6 from "novo-elements/elements/picker";
import * as i7 from "novo-elements/elements/chips";
import * as i8 from "novo-elements/elements/select";
import * as i9 from "novo-elements/elements/radio";
import * as i10 from "novo-elements/elements/time-picker";
import * as i11 from "novo-elements/elements/date-picker";
import * as i12 from "novo-elements/elements/date-time-picker";
import * as i13 from "./extras/address/Address";
import * as i14 from "novo-elements/elements/checkbox";
import * as i15 from "novo-elements/elements/switch";
import * as i16 from "novo-elements/elements/quick-note";
import * as i17 from "novo-elements/elements/common";
import * as i18 from "@angular/forms";
import * as i19 from "novo-elements/elements/tooltip";
import * as i20 from "novo-elements/elements/popover";
import * as i21 from "@angular/common";
import * as i22 from "angular2-text-mask";
import * as i23 from "./Control";
export class NovoControlTemplates {
    constructor(templates) {
        this.templates = templates;
    }
    ngAfterViewInit() {
        if (this.defaultTemplates && this.defaultTemplates.length) {
            this.defaultTemplates.forEach((template) => {
                this.templates.addDefault(template.name, template.template);
            });
        }
    }
}
NovoControlTemplates.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlTemplates, deps: [{ token: i1.NovoTemplateService }], target: i0.ɵɵFactoryTarget.Component });
NovoControlTemplates.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoControlTemplates, selector: "novo-control-templates", viewQueries: [{ propertyName: "defaultTemplates", predicate: NovoTemplate, descendants: true }], ngImport: i0, template: `
    <!---Readonly--->
    <ng-template novoTemplate="read-only" let-form="form" let-control>
      <div>{{ form.getRawValue()[control.key] }}</div>
    </ng-template>
    <!--Textbox--->
    <ng-template novoTemplate="textbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container novo-control-input-with-label"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <input
          *ngIf="control?.type !== 'number' && control?.textMaskEnabled"
          [textMask]="control.maskOptions"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type !== 'number' && !control?.textMaskEnabled"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type === 'number' && control?.subType !== 'percentage'"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="numberInput.blur()"
          #numberInput
        />
        <!-- the percentage input does not use formControlName like a normal reactive input because instead of
          setting the floating point value directly, it is multiplied by 100 into a percentage value -->
        <input
          *ngIf="control?.type === 'number' && control?.subType === 'percentage'"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          [value]="control?.percentValue"
          [disabled]="control?.readOnly"
          (input)="methods.handlePercentChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="percentInput.blur()"
          #percentInput
        />
        <label class="input-label" *ngIf="control?.subType === 'currency'">{{ control.currencyFormat }}</label>
        <label class="input-label" *ngIf="control?.subType === 'percentage'">%</label>
      </div>
    </ng-template>

    <!--Textarea--->
    <ng-template novoTemplate="text-area" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        class="textarea-container"
        [formGroup]="form"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <textarea
          [class.maxlength-error]="errors?.maxlength"
          [name]="control.key"
          [attr.id]="control.key"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          autosize
          (input)="methods.handleTextAreaInput($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [maxlength]="control?.maxlength"
        ></textarea>
      </div>
    </ng-template>

    <!--Editor-->
    <ng-template novoTemplate="editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-editor
          [name]="control.key"
          [formControlName]="control.key"
          [startupFocus]="control.startupFocus"
          [minimal]="control.minimal"
          [fileBrowserImageUploadUrl]="control.fileBrowserImageUploadUrl"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [config]="control.config"
        ></novo-editor>
      </div>
    </ng-template>

    <!--AceEditor-->
    <ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>

    <!--HTML5 Select-->
    <ng-template novoTemplate="native-select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <select
          [id]="control.key"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        >
          <option *ngIf="control.placeholder" value="" disabled selected hidden>{{ control.placeholder }}</option>
          <option *ngFor="let opt of control.options" [value]="opt.key">{{ opt.value }}</option>
        </select>
      </div>
    </ng-template>

    <!--File-->
    <ng-template novoTemplate="file" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-file-input
          [formControlName]="control.key"
          [id]="control.key"
          [name]="control.key"
          [placeholder]="control.placeholder"
          [value]="control.value"
          [multiple]="control.multiple"
          [layoutOptions]="control.layoutOptions"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (edit)="methods.handleEdit($event)"
          (save)="methods.handleSave($event)"
          (delete)="methods.handleDelete($event)"
          (upload)="methods.handleUpload($event)"
        ></novo-file-input>
      </div>
    </ng-template>

    <!--Tiles-->
    <ng-template novoTemplate="tiles" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-tiles
          [options]="control.options"
          [formControlName]="control.key"
          (onChange)="methods.modelChange($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          [controlDisabled]="control.disabled"
        ></novo-tiles>
      </div>
    </ng-template>

    <!--Picker-->
    <ng-template novoTemplate="picker" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-picker
          [config]="control.config"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [parentScrollSelector]="control.parentScrollSelector"
          *ngIf="!control.multiple"
          (select)="methods.modelChange($event)"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-picker>
        <novo-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [maxlength]="control?.maxlength"
          *ngIf="control.multiple && !control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-chips>
        <novo-row-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [maxlength]="control?.maxlength"
          *ngIf="control.multiple && control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-row-chips>
      </div>
    </ng-template>

    <!--Novo Select-->
    <ng-template novoTemplate="select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-select
          [options]="control.options"
          [headerConfig]="control.headerConfig"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (onSelect)="methods.modelChange($event)"
        ></novo-select>
      </div>
    </ng-template>

    <!--Timezone -->
    <ng-template novoTemplate="timezone" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-select
          [options]="control.options"
          [headerConfig]="control.headerConfig"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          position="bottom"
          (onSelect)="methods.modelChange($event)"
        ></novo-select>
      </div>
    </ng-template>

    <!--Radio-->
    <ng-template novoTemplate="radio" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-radio-group [name]="control.key" [formControlName]="control.key" [disabled]="control.disabled">
          <novo-radio
            *ngFor="let option of control.options"
            [value]="option.value"
            [label]="option.label"
            [checked]="
              option.value === form.getRawValue()[control.key] ||
              (form.getRawValue()[control.key] && option.value === form.getRawValue()[control.key].id)
            "
            [tooltip]="control.tooltip"
            [tooltipPosition]="control.tooltipPosition"
            [tooltipSize]="control?.tooltipSize"
            [tooltipPreline]="control?.tooltipPreline"
            [removeTooltipArrow]="control?.removeTooltipArrow"
            [tooltipAutoPosition]="control?.tooltipAutoPosition"
            [popover]="control.popoverContent"
            [popoverHtmlContent]="control.popoverHtmlContent"
            [popoverTitle]="control.popoverTitle"
            [popoverPlacement]="control.popoverPlacement"
            [popoverOnHover]="control.popoverOnHover"
            [popoverAlways]="control.popoverAlways"
            [popoverDisabled]="control.popoverDisabled"
            [popoverAnimation]="control.popoverAnimation"
            [popoverDismissTimeout]="control.popoverDismissTimeout"
            [button]="!!option.icon"
            [icon]="option.icon"
            [color]="option.color"
            [theme]="!!option.icon && !option.label ? 'icon' : 'secondary'"
            [attr.data-automation-id]="control.key + '-' + (option?.label || option?.value)"
          ></novo-radio>
        </novo-radio-group>
      </div>
    </ng-template>

    <!--Time-->
    <ng-template novoTemplate="time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [military]="control.military"
        ></novo-time-picker-input>
      </div>
    </ng-template>

    <!--Native Input--->
    <ng-template novoTemplate="native-input" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container novo-control-input-with-label"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <input
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        />
      </div>
    </ng-template>

    <!--Date-->
    <ng-template novoTemplate="date" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-date-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [format]="control.dateFormat"
          [allowInvalidDate]="control.allowInvalidDate"
          [textMaskEnabled]="control.textMaskEnabled"
          [placeholder]="control.placeholder"
          [weekStart]="control.weekStart"
          [disabledDateMessage]="control.disabledDateMessage"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
          (changeEvent)="methods.emitChange($event)"
        ></novo-date-picker-input>
      </div>
    </ng-template>

    <!--Date and Time-->
    <ng-template novoTemplate="date-time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-date-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [placeholder]="control.placeholder"
          [military]="control.military"
          [weekStart]="control.weekStart"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
          (changeEvent)="methods.emitChange($event)"
        ></novo-date-time-picker-input>
      </div>
    </ng-template>

    <!--Address-->
    <ng-template novoTemplate="address" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-address
          [formControlName]="control.key"
          [config]="control?.config"
          [readOnly]="control?.readOnly"
          (change)="methods.handleAddressChange($event)"
          (focus)="methods.handleFocus($event.event, $event.field)"
          (blur)="methods.handleBlur($event.event, $event.field)"
          (validityChange)="methods.updateValidity()"
        ></novo-address>
      </div>
    </ng-template>

    <!--Checkbox-->
    <ng-template novoTemplate="checkbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-checkbox
          [formControlName]="control?.key"
          [name]="control?.key"
          [label]="control?.checkboxLabel"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          [layoutOptions]="control?.layoutOptions"
        ></novo-checkbox>
      </div>
    </ng-template>

    <!--Switch-->
    <ng-template novoTemplate="switch" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-switch
          [formControlName]="control?.key"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-switch>
      </div>
    </ng-template>

    <!--Checklist-->
    <ng-template novoTemplate="checklist" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-check-list
          [formControlName]="control.key"
          [name]="control.key"
          [options]="control?.options"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (onSelect)="methods.modelChange($event)"
        ></novo-check-list>
      </div>
    </ng-template>

    <!--QuickNote-->
    <ng-template novoTemplate="quick-note" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-quick-note
          [formControlName]="control.key"
          [startupFocus]="control?.startupFocus"
          [placeholder]="control?.placeholder"
          [config]="control?.config"
          (change)="methods.modelChange($event)"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-quick-note>
      </div>
    </ng-template>
  `, isInline: true, components: [{ type: i2.NovoCKEditorElement, selector: "novo-editor", inputs: ["config", "debounce", "name", "minimal", "startupFocus", "fileBrowserImageUploadUrl", "disabled", "value"], outputs: ["change", "ready", "blur", "focus", "paste", "loaded"] }, { type: i3.NovoAceEditor, selector: "novo-ace-editor", inputs: ["theme", "options", "mode", "name"], outputs: ["blur", "focus"] }, { type: i4.NovoFileInputElement, selector: "novo-file-input", inputs: ["id", "tabindex", "errorStateMatcher", "multiple", "layoutOptions", "value", "dataFeatureId", "name", "disabled", "required", "placeholder"], outputs: ["edit", "save", "delete", "upload"] }, { type: i5.NovoTilesElement, selector: "novo-tiles", inputs: ["name", "options", "required", "controlDisabled"], outputs: ["onChange", "onSelectedOptionClick", "onDisabledOptionClick"] }, { type: i6.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }, { type: i7.NovoChipsElement, selector: "chips,novo-chips", inputs: ["closeOnSelect", "placeholder", "source", "maxlength", "type", "disablePickerInput", "value"], outputs: ["changed", "focus", "blur", "typing"] }, { type: i7.NovoRowChipsElement, selector: "novo-row-chips", inputs: ["closeOnSelect"] }, { type: i8.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i9.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i9.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { type: i10.NovoTimePickerInputElement, selector: "novo-time-picker-input", inputs: ["name", "placeholder", "military", "maskOptions", "disabled", "analog"], outputs: ["blurEvent", "focusEvent"] }, { type: i11.NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: ["name", "start", "end", "placeholder", "maskOptions", "format", "textMaskEnabled", "allowInvalidDate", "disabled", "disabledDateMessage", "weekStart"], outputs: ["blurEvent", "focusEvent", "changeEvent"] }, { type: i12.NovoDateTimePickerInputElement, selector: "novo-date-time-picker-input", inputs: ["name", "start", "end", "placeholder", "maskOptions", "military", "disabled", "format", "weekStart", "disabledDateMessage"], outputs: ["blurEvent", "focusEvent", "changeEvent"] }, { type: i13.NovoAddressElement, selector: "novo-address", inputs: ["config", "readOnly"], outputs: ["change", "focus", "blur", "validityChange"] }, { type: i14.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { type: i15.NovoSwitchElement, selector: "novo-switch", inputs: ["theme", "icons", "disabled"], outputs: ["onChange"] }, { type: i14.NovoCheckListElement, selector: "novo-check-list", inputs: ["name", "options", "disabled"], outputs: ["onSelect"] }, { type: i16.QuickNoteElement, selector: "novo-quick-note", inputs: ["config", "startupFocus", "placeholder"], outputs: ["focus", "blur", "change"] }], directives: [{ type: i17.NovoTemplate, selector: "[novoTemplate]", inputs: ["type", "novoTemplate"] }, { type: i18.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i18.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i19.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i20.PopOverDirective, selector: "[popover]", inputs: ["popover", "popoverHtmlContent", "popoverDisabled", "popoverAlways", "popoverAnimation", "popoverPlacement", "popoverTitle", "popoverOnHover", "popoverDismissTimeout"], outputs: ["onShown", "onHidden"] }, { type: i21.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i18.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i22.MaskedInputDirective, selector: "[textMask]", inputs: ["textMask"], exportAs: ["textMask"] }, { type: i18.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i18.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i18.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i23.NovoAutoSize, selector: "textarea[autosize]" }, { type: i18.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i18.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i18.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i21.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i17.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlTemplates, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-control-templates',
                    template: `
    <!---Readonly--->
    <ng-template novoTemplate="read-only" let-form="form" let-control>
      <div>{{ form.getRawValue()[control.key] }}</div>
    </ng-template>
    <!--Textbox--->
    <ng-template novoTemplate="textbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container novo-control-input-with-label"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <input
          *ngIf="control?.type !== 'number' && control?.textMaskEnabled"
          [textMask]="control.maskOptions"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type !== 'number' && !control?.textMaskEnabled"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type === 'number' && control?.subType !== 'percentage'"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="numberInput.blur()"
          #numberInput
        />
        <!-- the percentage input does not use formControlName like a normal reactive input because instead of
          setting the floating point value directly, it is multiplied by 100 into a percentage value -->
        <input
          *ngIf="control?.type === 'number' && control?.subType === 'percentage'"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          [value]="control?.percentValue"
          [disabled]="control?.readOnly"
          (input)="methods.handlePercentChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="percentInput.blur()"
          #percentInput
        />
        <label class="input-label" *ngIf="control?.subType === 'currency'">{{ control.currencyFormat }}</label>
        <label class="input-label" *ngIf="control?.subType === 'percentage'">%</label>
      </div>
    </ng-template>

    <!--Textarea--->
    <ng-template novoTemplate="text-area" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        class="textarea-container"
        [formGroup]="form"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <textarea
          [class.maxlength-error]="errors?.maxlength"
          [name]="control.key"
          [attr.id]="control.key"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          autosize
          (input)="methods.handleTextAreaInput($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [maxlength]="control?.maxlength"
        ></textarea>
      </div>
    </ng-template>

    <!--Editor-->
    <ng-template novoTemplate="editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-editor
          [name]="control.key"
          [formControlName]="control.key"
          [startupFocus]="control.startupFocus"
          [minimal]="control.minimal"
          [fileBrowserImageUploadUrl]="control.fileBrowserImageUploadUrl"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [config]="control.config"
        ></novo-editor>
      </div>
    </ng-template>

    <!--AceEditor-->
    <ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>

    <!--HTML5 Select-->
    <ng-template novoTemplate="native-select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <select
          [id]="control.key"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        >
          <option *ngIf="control.placeholder" value="" disabled selected hidden>{{ control.placeholder }}</option>
          <option *ngFor="let opt of control.options" [value]="opt.key">{{ opt.value }}</option>
        </select>
      </div>
    </ng-template>

    <!--File-->
    <ng-template novoTemplate="file" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-file-input
          [formControlName]="control.key"
          [id]="control.key"
          [name]="control.key"
          [placeholder]="control.placeholder"
          [value]="control.value"
          [multiple]="control.multiple"
          [layoutOptions]="control.layoutOptions"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (edit)="methods.handleEdit($event)"
          (save)="methods.handleSave($event)"
          (delete)="methods.handleDelete($event)"
          (upload)="methods.handleUpload($event)"
        ></novo-file-input>
      </div>
    </ng-template>

    <!--Tiles-->
    <ng-template novoTemplate="tiles" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-tiles
          [options]="control.options"
          [formControlName]="control.key"
          (onChange)="methods.modelChange($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          [controlDisabled]="control.disabled"
        ></novo-tiles>
      </div>
    </ng-template>

    <!--Picker-->
    <ng-template novoTemplate="picker" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-picker
          [config]="control.config"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [parentScrollSelector]="control.parentScrollSelector"
          *ngIf="!control.multiple"
          (select)="methods.modelChange($event)"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-picker>
        <novo-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [maxlength]="control?.maxlength"
          *ngIf="control.multiple && !control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-chips>
        <novo-row-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [maxlength]="control?.maxlength"
          *ngIf="control.multiple && control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-row-chips>
      </div>
    </ng-template>

    <!--Novo Select-->
    <ng-template novoTemplate="select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-select
          [options]="control.options"
          [headerConfig]="control.headerConfig"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (onSelect)="methods.modelChange($event)"
        ></novo-select>
      </div>
    </ng-template>

    <!--Timezone -->
    <ng-template novoTemplate="timezone" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-select
          [options]="control.options"
          [headerConfig]="control.headerConfig"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          position="bottom"
          (onSelect)="methods.modelChange($event)"
        ></novo-select>
      </div>
    </ng-template>

    <!--Radio-->
    <ng-template novoTemplate="radio" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-radio-group [name]="control.key" [formControlName]="control.key" [disabled]="control.disabled">
          <novo-radio
            *ngFor="let option of control.options"
            [value]="option.value"
            [label]="option.label"
            [checked]="
              option.value === form.getRawValue()[control.key] ||
              (form.getRawValue()[control.key] && option.value === form.getRawValue()[control.key].id)
            "
            [tooltip]="control.tooltip"
            [tooltipPosition]="control.tooltipPosition"
            [tooltipSize]="control?.tooltipSize"
            [tooltipPreline]="control?.tooltipPreline"
            [removeTooltipArrow]="control?.removeTooltipArrow"
            [tooltipAutoPosition]="control?.tooltipAutoPosition"
            [popover]="control.popoverContent"
            [popoverHtmlContent]="control.popoverHtmlContent"
            [popoverTitle]="control.popoverTitle"
            [popoverPlacement]="control.popoverPlacement"
            [popoverOnHover]="control.popoverOnHover"
            [popoverAlways]="control.popoverAlways"
            [popoverDisabled]="control.popoverDisabled"
            [popoverAnimation]="control.popoverAnimation"
            [popoverDismissTimeout]="control.popoverDismissTimeout"
            [button]="!!option.icon"
            [icon]="option.icon"
            [color]="option.color"
            [theme]="!!option.icon && !option.label ? 'icon' : 'secondary'"
            [attr.data-automation-id]="control.key + '-' + (option?.label || option?.value)"
          ></novo-radio>
        </novo-radio-group>
      </div>
    </ng-template>

    <!--Time-->
    <ng-template novoTemplate="time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [military]="control.military"
        ></novo-time-picker-input>
      </div>
    </ng-template>

    <!--Native Input--->
    <ng-template novoTemplate="native-input" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container novo-control-input-with-label"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <input
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        />
      </div>
    </ng-template>

    <!--Date-->
    <ng-template novoTemplate="date" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-date-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [format]="control.dateFormat"
          [allowInvalidDate]="control.allowInvalidDate"
          [textMaskEnabled]="control.textMaskEnabled"
          [placeholder]="control.placeholder"
          [weekStart]="control.weekStart"
          [disabledDateMessage]="control.disabledDateMessage"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
          (changeEvent)="methods.emitChange($event)"
        ></novo-date-picker-input>
      </div>
    </ng-template>

    <!--Date and Time-->
    <ng-template novoTemplate="date-time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [popover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-date-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [placeholder]="control.placeholder"
          [military]="control.military"
          [weekStart]="control.weekStart"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
          (changeEvent)="methods.emitChange($event)"
        ></novo-date-time-picker-input>
      </div>
    </ng-template>

    <!--Address-->
    <ng-template novoTemplate="address" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-address
          [formControlName]="control.key"
          [config]="control?.config"
          [readOnly]="control?.readOnly"
          (change)="methods.handleAddressChange($event)"
          (focus)="methods.handleFocus($event.event, $event.field)"
          (blur)="methods.handleBlur($event.event, $event.field)"
          (validityChange)="methods.updateValidity()"
        ></novo-address>
      </div>
    </ng-template>

    <!--Checkbox-->
    <ng-template novoTemplate="checkbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-checkbox
          [formControlName]="control?.key"
          [name]="control?.key"
          [label]="control?.checkboxLabel"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          [layoutOptions]="control?.layoutOptions"
        ></novo-checkbox>
      </div>
    </ng-template>

    <!--Switch-->
    <ng-template novoTemplate="switch" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-switch
          [formControlName]="control?.key"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-switch>
      </div>
    </ng-template>

    <!--Checklist-->
    <ng-template novoTemplate="checklist" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-check-list
          [formControlName]="control.key"
          [name]="control.key"
          [options]="control?.options"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (onSelect)="methods.modelChange($event)"
        ></novo-check-list>
      </div>
    </ng-template>

    <!--QuickNote-->
    <ng-template novoTemplate="quick-note" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-quick-note
          [formControlName]="control.key"
          [startupFocus]="control?.startupFocus"
          [placeholder]="control?.placeholder"
          [config]="control?.config"
          (change)="methods.modelChange($event)"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [popover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-quick-note>
      </div>
    </ng-template>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoTemplateService }]; }, propDecorators: { defaultTemplates: [{
                type: ViewChildren,
                args: [NovoTemplate]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbFRlbXBsYXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vQ29udHJvbFRlbXBsYXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1yQjdELE1BQU0sT0FBTyxvQkFBb0I7SUFHL0IsWUFBb0IsU0FBOEI7UUFBOUIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7SUFBRyxDQUFDO0lBRXRELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2tIQVhVLG9CQUFvQjtzR0FBcEIsb0JBQW9CLG1HQUNqQixZQUFZLGdEQWpyQmhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThxQlQ7NEZBRVUsb0JBQW9CO2tCQWxyQmhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThxQlQ7aUJBQ0Y7MEdBR0MsZ0JBQWdCO3NCQURmLFlBQVk7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY29udHJvbC10ZW1wbGF0ZXMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0tUmVhZG9ubHktLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInJlYWQtb25seVwiIGxldC1mb3JtPVwiZm9ybVwiIGxldC1jb250cm9sPlxuICAgICAgPGRpdj57eyBmb3JtLmdldFJhd1ZhbHVlKClbY29udHJvbC5rZXldIH19PC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8IS0tVGV4dGJveC0tLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwidGV4dGJveFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyIG5vdm8tY29udHJvbC1pbnB1dC13aXRoLWxhYmVsXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgIFtwb3BvdmVySHRtbENvbnRlbnRdPVwiY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnRcIlxuICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgW3BvcG92ZXJPbkhvdmVyXT1cImNvbnRyb2wucG9wb3Zlck9uSG92ZXJcIlxuICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgW3BvcG92ZXJBbmltYXRpb25dPVwiY29udHJvbC5wb3BvdmVyQW5pbWF0aW9uXCJcbiAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICpuZ0lmPVwiY29udHJvbD8udHlwZSAhPT0gJ251bWJlcicgJiYgY29udHJvbD8udGV4dE1hc2tFbmFibGVkXCJcbiAgICAgICAgICBbdGV4dE1hc2tdPVwiY29udHJvbC5tYXNrT3B0aW9uc1wiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2lkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbdHlwZV09XCJjb250cm9sPy50eXBlXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbD8ucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIChpbnB1dCk9XCJtZXRob2RzLmVtaXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIGF1dG9jb21wbGV0ZVxuICAgICAgICAvPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAqbmdJZj1cImNvbnRyb2w/LnR5cGUgIT09ICdudW1iZXInICYmICFjb250cm9sPy50ZXh0TWFza0VuYWJsZWRcIlxuICAgICAgICAgIFtjbGFzcy5tYXhsZW5ndGgtZXJyb3JdPVwiZXJyb3JzPy5tYXhsZW5ndGhcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3R5cGVdPVwiY29udHJvbD8udHlwZVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2w/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAoaW5wdXQpPVwibWV0aG9kcy5lbWl0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgIFttYXhsZW5ndGhdPVwiY29udHJvbD8ubWF4bGVuZ3RoXCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgYXV0b2NvbXBsZXRlXG4gICAgICAgIC8+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICpuZ0lmPVwiY29udHJvbD8udHlwZSA9PT0gJ251bWJlcicgJiYgY29udHJvbD8uc3ViVHlwZSAhPT0gJ3BlcmNlbnRhZ2UnXCJcbiAgICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImVycm9ycz8ubWF4bGVuZ3RoXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbaWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFt0eXBlXT1cImNvbnRyb2w/LnR5cGVcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgKGtleWRvd24pPVwibWV0aG9kcy5yZXN0cmljdEtleXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGlucHV0KT1cIm1ldGhvZHMuZW1pdENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbnRyb2w/Lm1heGxlbmd0aFwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIHN0ZXA9XCJhbnlcIlxuICAgICAgICAgIChtb3VzZXdoZWVsKT1cIm51bWJlcklucHV0LmJsdXIoKVwiXG4gICAgICAgICAgI251bWJlcklucHV0XG4gICAgICAgIC8+XG4gICAgICAgIDwhLS0gdGhlIHBlcmNlbnRhZ2UgaW5wdXQgZG9lcyBub3QgdXNlIGZvcm1Db250cm9sTmFtZSBsaWtlIGEgbm9ybWFsIHJlYWN0aXZlIGlucHV0IGJlY2F1c2UgaW5zdGVhZCBvZlxuICAgICAgICAgIHNldHRpbmcgdGhlIGZsb2F0aW5nIHBvaW50IHZhbHVlIGRpcmVjdGx5LCBpdCBpcyBtdWx0aXBsaWVkIGJ5IDEwMCBpbnRvIGEgcGVyY2VudGFnZSB2YWx1ZSAtLT5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgKm5nSWY9XCJjb250cm9sPy50eXBlID09PSAnbnVtYmVyJyAmJiBjb250cm9sPy5zdWJUeXBlID09PSAncGVyY2VudGFnZSdcIlxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3R5cGVdPVwiY29udHJvbD8udHlwZVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2w/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAoa2V5ZG93bik9XCJtZXRob2RzLnJlc3RyaWN0S2V5cygkZXZlbnQpXCJcbiAgICAgICAgICBbdmFsdWVdPVwiY29udHJvbD8ucGVyY2VudFZhbHVlXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbD8ucmVhZE9ubHlcIlxuICAgICAgICAgIChpbnB1dCk9XCJtZXRob2RzLmhhbmRsZVBlcmNlbnRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIHN0ZXA9XCJhbnlcIlxuICAgICAgICAgIChtb3VzZXdoZWVsKT1cInBlcmNlbnRJbnB1dC5ibHVyKClcIlxuICAgICAgICAgICNwZXJjZW50SW5wdXRcbiAgICAgICAgLz5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5wdXQtbGFiZWxcIiAqbmdJZj1cImNvbnRyb2w/LnN1YlR5cGUgPT09ICdjdXJyZW5jeSdcIj57eyBjb250cm9sLmN1cnJlbmN5Rm9ybWF0IH19PC9sYWJlbD5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5wdXQtbGFiZWxcIiAqbmdJZj1cImNvbnRyb2w/LnN1YlR5cGUgPT09ICdwZXJjZW50YWdlJ1wiPiU8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1UZXh0YXJlYS0tLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwidGV4dC1hcmVhXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cInRleHRhcmVhLWNvbnRhaW5lclwiXG4gICAgICAgIFtmb3JtR3JvdXBdPVwiZm9ybVwiXG4gICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2w/LnRvb2x0aXBcIlxuICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgPlxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImVycm9ycz8ubWF4bGVuZ3RoXCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2F0dHIuaWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBhdXRvc2l6ZVxuICAgICAgICAgIChpbnB1dCk9XCJtZXRob2RzLmhhbmRsZVRleHRBcmVhSW5wdXQoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIFttYXhsZW5ndGhdPVwiY29udHJvbD8ubWF4bGVuZ3RoXCJcbiAgICAgICAgPjwvdGV4dGFyZWE+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLUVkaXRvci0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJlZGl0b3JcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1lZGl0b3JcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3N0YXJ0dXBGb2N1c109XCJjb250cm9sLnN0YXJ0dXBGb2N1c1wiXG4gICAgICAgICAgW21pbmltYWxdPVwiY29udHJvbC5taW5pbWFsXCJcbiAgICAgICAgICBbZmlsZUJyb3dzZXJJbWFnZVVwbG9hZFVybF09XCJjb250cm9sLmZpbGVCcm93c2VySW1hZ2VVcGxvYWRVcmxcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBbY29uZmlnXT1cImNvbnRyb2wuY29uZmlnXCJcbiAgICAgICAgPjwvbm92by1lZGl0b3I+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLUFjZUVkaXRvci0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJhY2UtZWRpdG9yXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tYWNlLWVkaXRvclxuICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tYWNlLWVkaXRvcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tSFRNTDUgU2VsZWN0LS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cIm5hdGl2ZS1zZWxlY3RcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgW2lkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICA+XG4gICAgICAgICAgPG9wdGlvbiAqbmdJZj1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkIGhpZGRlbj57eyBjb250cm9sLnBsYWNlaG9sZGVyIH19PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0IG9mIGNvbnRyb2wub3B0aW9uc1wiIFt2YWx1ZV09XCJvcHQua2V5XCI+e3sgb3B0LnZhbHVlIH19PC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1GaWxlLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImZpbGVcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1maWxlLWlucHV0XG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2lkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFt2YWx1ZV09XCJjb250cm9sLnZhbHVlXCJcbiAgICAgICAgICBbbXVsdGlwbGVdPVwiY29udHJvbC5tdWx0aXBsZVwiXG4gICAgICAgICAgW2xheW91dE9wdGlvbnNdPVwiY29udHJvbC5sYXlvdXRPcHRpb25zXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICAgIChlZGl0KT1cIm1ldGhvZHMuaGFuZGxlRWRpdCgkZXZlbnQpXCJcbiAgICAgICAgICAoc2F2ZSk9XCJtZXRob2RzLmhhbmRsZVNhdmUoJGV2ZW50KVwiXG4gICAgICAgICAgKGRlbGV0ZSk9XCJtZXRob2RzLmhhbmRsZURlbGV0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAodXBsb2FkKT1cIm1ldGhvZHMuaGFuZGxlVXBsb2FkKCRldmVudClcIlxuICAgICAgICA+PC9ub3ZvLWZpbGUtaW5wdXQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLVRpbGVzLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRpbGVzXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tdGlsZXNcbiAgICAgICAgICBbb3B0aW9uc109XCJjb250cm9sLm9wdGlvbnNcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIChvbkNoYW5nZSk9XCJtZXRob2RzLm1vZGVsQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgICAgW2NvbnRyb2xEaXNhYmxlZF09XCJjb250cm9sLmRpc2FibGVkXCJcbiAgICAgICAgPjwvbm92by10aWxlcz5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tUGlja2VyLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInBpY2tlclwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCIgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgIDxub3ZvLXBpY2tlclxuICAgICAgICAgIFtjb25maWddPVwiY29udHJvbC5jb25maWdcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbcGFyZW50U2Nyb2xsU2VsZWN0b3JdPVwiY29udHJvbC5wYXJlbnRTY3JvbGxTZWxlY3RvclwiXG4gICAgICAgICAgKm5nSWY9XCIhY29udHJvbC5tdWx0aXBsZVwiXG4gICAgICAgICAgKHNlbGVjdCk9XCJtZXRob2RzLm1vZGVsQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgIChjaGFuZ2VkKT1cIm1ldGhvZHMubW9kZWxDaGFuZ2VXaXRoUmF3KCRldmVudClcIlxuICAgICAgICAgICh0eXBpbmcpPVwibWV0aG9kcy5oYW5kbGVUeXBpbmcoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgID48L25vdm8tcGlja2VyPlxuICAgICAgICA8bm92by1jaGlwc1xuICAgICAgICAgIFtzb3VyY2VdPVwiY29udHJvbC5jb25maWdcIlxuICAgICAgICAgIFt0eXBlXT1cImNvbnRyb2wuY29uZmlnLnR5cGVcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbnRyb2w/Lm1heGxlbmd0aFwiXG4gICAgICAgICAgKm5nSWY9XCJjb250cm9sLm11bHRpcGxlICYmICFjb250cm9sLmNvbmZpZy5jb2x1bW5zXCJcbiAgICAgICAgICBbY2xvc2VPblNlbGVjdF09XCJjb250cm9sLmNsb3NlT25TZWxlY3RcIlxuICAgICAgICAgIChjaGFuZ2VkKT1cIm1ldGhvZHMubW9kZWxDaGFuZ2VXaXRoUmF3KCRldmVudClcIlxuICAgICAgICAgICh0eXBpbmcpPVwibWV0aG9kcy5oYW5kbGVUeXBpbmcoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgID48L25vdm8tY2hpcHM+XG4gICAgICAgIDxub3ZvLXJvdy1jaGlwc1xuICAgICAgICAgIFtzb3VyY2VdPVwiY29udHJvbC5jb25maWdcIlxuICAgICAgICAgIFt0eXBlXT1cImNvbnRyb2wuY29uZmlnLnR5cGVcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbnRyb2w/Lm1heGxlbmd0aFwiXG4gICAgICAgICAgKm5nSWY9XCJjb250cm9sLm11bHRpcGxlICYmIGNvbnRyb2wuY29uZmlnLmNvbHVtbnNcIlxuICAgICAgICAgIFtjbG9zZU9uU2VsZWN0XT1cImNvbnRyb2wuY2xvc2VPblNlbGVjdFwiXG4gICAgICAgICAgKGNoYW5nZWQpPVwibWV0aG9kcy5tb2RlbENoYW5nZVdpdGhSYXcoJGV2ZW50KVwiXG4gICAgICAgICAgKHR5cGluZyk9XCJtZXRob2RzLmhhbmRsZVR5cGluZygkZXZlbnQpXCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2wudG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVySHRtbENvbnRlbnRdPVwiY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgICAgW3BvcG92ZXJPbkhvdmVyXT1cImNvbnRyb2wucG9wb3Zlck9uSG92ZXJcIlxuICAgICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgICAgW3BvcG92ZXJBbmltYXRpb25dPVwiY29udHJvbC5wb3BvdmVyQW5pbWF0aW9uXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgICAgPjwvbm92by1yb3ctY2hpcHM+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLU5vdm8gU2VsZWN0LS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInNlbGVjdFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdFxuICAgICAgICAgIFtvcHRpb25zXT1cImNvbnRyb2wub3B0aW9uc1wiXG4gICAgICAgICAgW2hlYWRlckNvbmZpZ109XCJjb250cm9sLmhlYWRlckNvbmZpZ1wiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgICAgKG9uU2VsZWN0KT1cIm1ldGhvZHMubW9kZWxDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1UaW1lem9uZSAtLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwidGltZXpvbmVcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1zZWxlY3RcbiAgICAgICAgICBbb3B0aW9uc109XCJjb250cm9sLm9wdGlvbnNcIlxuICAgICAgICAgIFtoZWFkZXJDb25maWddPVwiY29udHJvbC5oZWFkZXJDb25maWdcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICAgIHBvc2l0aW9uPVwiYm90dG9tXCJcbiAgICAgICAgICAob25TZWxlY3QpPVwibWV0aG9kcy5tb2RlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgPjwvbm92by1zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLVJhZGlvLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInJhZGlvXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIiBjbGFzcz1cIm5vdm8tY29udHJvbC1pbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgPG5vdm8tcmFkaW8tZ3JvdXAgW25hbWVdPVwiY29udHJvbC5rZXlcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgW2Rpc2FibGVkXT1cImNvbnRyb2wuZGlzYWJsZWRcIj5cbiAgICAgICAgICA8bm92by1yYWRpb1xuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb250cm9sLm9wdGlvbnNcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiXG4gICAgICAgICAgICBbbGFiZWxdPVwib3B0aW9uLmxhYmVsXCJcbiAgICAgICAgICAgIFtjaGVja2VkXT1cIlxuICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPT09IGZvcm0uZ2V0UmF3VmFsdWUoKVtjb250cm9sLmtleV0gfHxcbiAgICAgICAgICAgICAgKGZvcm0uZ2V0UmF3VmFsdWUoKVtjb250cm9sLmtleV0gJiYgb3B0aW9uLnZhbHVlID09PSBmb3JtLmdldFJhd1ZhbHVlKClbY29udHJvbC5rZXldLmlkKVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2wudG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICAgIFtwb3BvdmVySHRtbENvbnRlbnRdPVwiY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnRcIlxuICAgICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgICAgW3BvcG92ZXJPbkhvdmVyXT1cImNvbnRyb2wucG9wb3Zlck9uSG92ZXJcIlxuICAgICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgICAgW3BvcG92ZXJBbmltYXRpb25dPVwiY29udHJvbC5wb3BvdmVyQW5pbWF0aW9uXCJcbiAgICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICAgICAgW2J1dHRvbl09XCIhIW9wdGlvbi5pY29uXCJcbiAgICAgICAgICAgIFtpY29uXT1cIm9wdGlvbi5pY29uXCJcbiAgICAgICAgICAgIFtjb2xvcl09XCJvcHRpb24uY29sb3JcIlxuICAgICAgICAgICAgW3RoZW1lXT1cIiEhb3B0aW9uLmljb24gJiYgIW9wdGlvbi5sYWJlbCA/ICdpY29uJyA6ICdzZWNvbmRhcnknXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjb250cm9sLmtleSArICctJyArIChvcHRpb24/LmxhYmVsIHx8IG9wdGlvbj8udmFsdWUpXCJcbiAgICAgICAgICA+PC9ub3ZvLXJhZGlvPlxuICAgICAgICA8L25vdm8tcmFkaW8tZ3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLVRpbWUtLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwidGltZVwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgIFtwb3BvdmVySHRtbENvbnRlbnRdPVwiY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnRcIlxuICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgW3BvcG92ZXJPbkhvdmVyXT1cImNvbnRyb2wucG9wb3Zlck9uSG92ZXJcIlxuICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgW3BvcG92ZXJBbmltYXRpb25dPVwiY29udHJvbC5wb3BvdmVyQW5pbWF0aW9uXCJcbiAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICA+XG4gICAgICAgIDxub3ZvLXRpbWUtcGlja2VyLWlucHV0XG4gICAgICAgICAgW2F0dHIuaWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW21pbGl0YXJ5XT1cImNvbnRyb2wubWlsaXRhcnlcIlxuICAgICAgICA+PC9ub3ZvLXRpbWUtcGlja2VyLWlucHV0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1OYXRpdmUgSW5wdXQtLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cIm5hdGl2ZS1pbnB1dFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyIG5vdm8tY29udHJvbC1pbnB1dC13aXRoLWxhYmVsXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgIFtwb3BvdmVySHRtbENvbnRlbnRdPVwiY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnRcIlxuICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgW3BvcG92ZXJPbkhvdmVyXT1cImNvbnRyb2wucG9wb3Zlck9uSG92ZXJcIlxuICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgW3BvcG92ZXJBbmltYXRpb25dPVwiY29udHJvbC5wb3BvdmVyQW5pbWF0aW9uXCJcbiAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3R5cGVdPVwiY29udHJvbC50eXBlXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbD8ucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIChpbnB1dCk9XCJtZXRob2RzLmVtaXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1EYXRlLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImRhdGVcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIFtmb3JtR3JvdXBdPVwiZm9ybVwiXG4gICAgICAgIGNsYXNzPVwibm92by1jb250cm9sLWlucHV0LWNvbnRhaW5lclwiXG4gICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgID5cbiAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXItaW5wdXRcbiAgICAgICAgICBbYXR0ci5pZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtzdGFydF09XCJjb250cm9sLnN0YXJ0RGF0ZVwiXG4gICAgICAgICAgW2VuZF09XCJjb250cm9sLmVuZERhdGVcIlxuICAgICAgICAgIFtmb3JtYXRdPVwiY29udHJvbC5kYXRlRm9ybWF0XCJcbiAgICAgICAgICBbYWxsb3dJbnZhbGlkRGF0ZV09XCJjb250cm9sLmFsbG93SW52YWxpZERhdGVcIlxuICAgICAgICAgIFt0ZXh0TWFza0VuYWJsZWRdPVwiY29udHJvbC50ZXh0TWFza0VuYWJsZWRcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbd2Vla1N0YXJ0XT1cImNvbnRyb2wud2Vla1N0YXJ0XCJcbiAgICAgICAgICBbZGlzYWJsZWREYXRlTWVzc2FnZV09XCJjb250cm9sLmRpc2FibGVkRGF0ZU1lc3NhZ2VcIlxuICAgICAgICAgIChmb2N1c0V2ZW50KT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXJFdmVudCk9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgKGNoYW5nZUV2ZW50KT1cIm1ldGhvZHMuZW1pdENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgPjwvbm92by1kYXRlLXBpY2tlci1pbnB1dD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tRGF0ZSBhbmQgVGltZS0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJkYXRlLXRpbWVcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIFtmb3JtR3JvdXBdPVwiZm9ybVwiXG4gICAgICAgIGNsYXNzPVwibm92by1jb250cm9sLWlucHV0LWNvbnRhaW5lclwiXG4gICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgID5cbiAgICAgICAgPG5vdm8tZGF0ZS10aW1lLXBpY2tlci1pbnB1dFxuICAgICAgICAgIFthdHRyLmlkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3N0YXJ0XT1cImNvbnRyb2wuc3RhcnREYXRlXCJcbiAgICAgICAgICBbZW5kXT1cImNvbnRyb2wuZW5kRGF0ZVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFttaWxpdGFyeV09XCJjb250cm9sLm1pbGl0YXJ5XCJcbiAgICAgICAgICBbd2Vla1N0YXJ0XT1cImNvbnRyb2wud2Vla1N0YXJ0XCJcbiAgICAgICAgICAoZm9jdXNFdmVudCk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyRXZlbnQpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIChjaGFuZ2VFdmVudCk9XCJtZXRob2RzLmVtaXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tZGF0ZS10aW1lLXBpY2tlci1pbnB1dD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tQWRkcmVzcy0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJhZGRyZXNzXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tYWRkcmVzc1xuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtjb25maWddPVwiY29udHJvbD8uY29uZmlnXCJcbiAgICAgICAgICBbcmVhZE9ubHldPVwiY29udHJvbD8ucmVhZE9ubHlcIlxuICAgICAgICAgIChjaGFuZ2UpPVwibWV0aG9kcy5oYW5kbGVBZGRyZXNzQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudC5ldmVudCwgJGV2ZW50LmZpZWxkKVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudC5ldmVudCwgJGV2ZW50LmZpZWxkKVwiXG4gICAgICAgICAgKHZhbGlkaXR5Q2hhbmdlKT1cIm1ldGhvZHMudXBkYXRlVmFsaWRpdHkoKVwiXG4gICAgICAgID48L25vdm8tYWRkcmVzcz5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tQ2hlY2tib3gtLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiY2hlY2tib3hcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1jaGVja2JveFxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbD8ua2V5XCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sPy5rZXlcIlxuICAgICAgICAgIFtsYWJlbF09XCJjb250cm9sPy5jaGVja2JveExhYmVsXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sPy50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgICAgW2xheW91dE9wdGlvbnNdPVwiY29udHJvbD8ubGF5b3V0T3B0aW9uc1wiXG4gICAgICAgID48L25vdm8tY2hlY2tib3g+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLVN3aXRjaC0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJzd2l0Y2hcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1zd2l0Y2hcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2w/LmtleVwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICA+PC9ub3ZvLXN3aXRjaD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tQ2hlY2tsaXN0LS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImNoZWNrbGlzdFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLWNoZWNrLWxpc3RcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW29wdGlvbnNdPVwiY29udHJvbD8ub3B0aW9uc1wiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICAgIChvblNlbGVjdCk9XCJtZXRob2RzLm1vZGVsQ2hhbmdlKCRldmVudClcIlxuICAgICAgICA+PC9ub3ZvLWNoZWNrLWxpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLVF1aWNrTm90ZS0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJxdWljay1ub3RlXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tcXVpY2stbm90ZVxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtzdGFydHVwRm9jdXNdPVwiY29udHJvbD8uc3RhcnR1cEZvY3VzXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbD8ucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFtjb25maWddPVwiY29udHJvbD8uY29uZmlnXCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm1ldGhvZHMubW9kZWxDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICA+PC9ub3ZvLXF1aWNrLW5vdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29udHJvbFRlbXBsYXRlcyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkcmVuKE5vdm9UZW1wbGF0ZSlcbiAgZGVmYXVsdFRlbXBsYXRlczogUXVlcnlMaXN0PE5vdm9UZW1wbGF0ZT47XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGVtcGxhdGVzOiBOb3ZvVGVtcGxhdGVTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kZWZhdWx0VGVtcGxhdGVzICYmIHRoaXMuZGVmYXVsdFRlbXBsYXRlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZGVmYXVsdFRlbXBsYXRlcy5mb3JFYWNoKCh0ZW1wbGF0ZTogYW55KSA9PiB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmFkZERlZmF1bHQodGVtcGxhdGUubmFtZSwgdGVtcGxhdGUudGVtcGxhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=