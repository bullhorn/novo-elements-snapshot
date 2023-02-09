import { Component, QueryList, ViewChildren } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../services/template/NovoTemplateService";
import * as i2 from "../ckeditor/CKEditor";
import * as i3 from "../ace-editor/AceEditor";
import * as i4 from "./extras/file/FileInput";
import * as i5 from "../tiles/Tiles";
import * as i6 from "../picker/Picker";
import * as i7 from "../chips/Chips";
import * as i8 from "../chips/RowChips";
import * as i9 from "../select/Select";
import * as i10 from "../radio/RadioGroup";
import * as i11 from "../radio/Radio";
import * as i12 from "../time-picker/TimePickerInput";
import * as i13 from "../date-picker/DatePickerInput";
import * as i14 from "../date-time-picker/DateTimePickerInput";
import * as i15 from "./extras/address/Address";
import * as i16 from "../checkbox/Checkbox";
import * as i17 from "../switch/Switch";
import * as i18 from "../checkbox/CheckList";
import * as i19 from "../quick-note/QuickNote";
import * as i20 from "../common/novo-template/novo-template.directive";
import * as i21 from "@angular/forms";
import * as i22 from "../tooltip/Tooltip.directive";
import * as i23 from "../popover/PopOver";
import * as i24 from "@angular/common";
import * as i25 from "angular2-text-mask";
import * as i26 from "./Control";
import * as i27 from "../common/directives/theme.directive";
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
        <novo-radio-group [name]="control.key" [formControlName]="control.key">
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
  `, isInline: true, components: [{ type: i2.NovoCKEditorElement, selector: "novo-editor", inputs: ["config", "debounce", "name", "minimal", "startupFocus", "fileBrowserImageUploadUrl", "disabled", "value"], outputs: ["change", "ready", "blur", "focus", "paste", "loaded"] }, { type: i3.NovoAceEditor, selector: "novo-ace-editor", inputs: ["theme", "options", "mode", "name"], outputs: ["blur", "focus"] }, { type: i4.NovoFileInputElement, selector: "novo-file-input", inputs: ["id", "tabindex", "errorStateMatcher", "multiple", "layoutOptions", "value", "dataFeatureId", "name", "disabled", "required", "placeholder"], outputs: ["edit", "save", "delete", "upload"] }, { type: i5.NovoTilesElement, selector: "novo-tiles", inputs: ["name", "options", "required", "controlDisabled"], outputs: ["onChange", "onSelectedOptionClick", "onDisabledOptionClick"] }, { type: i6.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }, { type: i7.NovoChipsElement, selector: "chips,novo-chips", inputs: ["closeOnSelect", "placeholder", "source", "maxlength", "type", "disablePickerInput", "value"], outputs: ["changed", "focus", "blur", "typing"] }, { type: i8.NovoRowChipsElement, selector: "novo-row-chips", inputs: ["closeOnSelect"] }, { type: i9.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i10.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i11.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "checked", "value", "disabled"], outputs: ["change", "blur", "focus"] }, { type: i12.NovoTimePickerInputElement, selector: "novo-time-picker-input", inputs: ["name", "placeholder", "military", "maskOptions", "disabled", "analog"], outputs: ["blurEvent", "focusEvent"] }, { type: i13.NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: ["name", "start", "end", "placeholder", "maskOptions", "format", "textMaskEnabled", "allowInvalidDate", "disabled", "disabledDateMessage", "weekStart"], outputs: ["blurEvent", "focusEvent", "changeEvent"] }, { type: i14.NovoDateTimePickerInputElement, selector: "novo-date-time-picker-input", inputs: ["name", "start", "end", "placeholder", "maskOptions", "military", "disabled", "format", "weekStart", "disabledDateMessage"], outputs: ["blurEvent", "focusEvent", "changeEvent"] }, { type: i15.NovoAddressElement, selector: "novo-address", inputs: ["config", "readOnly"], outputs: ["change", "focus", "blur", "validityChange"] }, { type: i16.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { type: i17.NovoSwitchElement, selector: "novo-switch", inputs: ["theme", "icons", "disabled"], outputs: ["onChange"] }, { type: i18.NovoCheckListElement, selector: "novo-check-list", inputs: ["name", "options", "disabled"], outputs: ["onSelect"] }, { type: i19.QuickNoteElement, selector: "novo-quick-note", inputs: ["config", "startupFocus", "placeholder"], outputs: ["focus", "blur", "change"] }], directives: [{ type: i20.NovoTemplate, selector: "[novoTemplate]", inputs: ["type", "novoTemplate"] }, { type: i21.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i21.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i22.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i23.PopOverDirective, selector: "[popover]", inputs: ["popover", "popoverHtmlContent", "popoverDisabled", "popoverAlways", "popoverAnimation", "popoverPlacement", "popoverTitle", "popoverOnHover", "popoverDismissTimeout"], outputs: ["onShown", "onHidden"] }, { type: i24.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i21.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i25.MaskedInputDirective, selector: "[textMask]", inputs: ["textMask"], exportAs: ["textMask"] }, { type: i21.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i21.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i21.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i26.NovoAutoSize, selector: "textarea[autosize]" }, { type: i21.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i21.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i21.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i24.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i27.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
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
        <novo-radio-group [name]="control.key" [formControlName]="control.key">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbFRlbXBsYXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vQ29udHJvbFRlbXBsYXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtckIvRSxNQUFNLE9BQU8sb0JBQW9CO0lBRy9CLFlBQW9CLFNBQThCO1FBQTlCLGNBQVMsR0FBVCxTQUFTLENBQXFCO0lBQUcsQ0FBQztJQUV0RCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztrSEFYVSxvQkFBb0I7c0dBQXBCLG9CQUFvQixtR0FDakIsWUFBWSxnREFqckJoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4cUJUOzRGQUVVLG9CQUFvQjtrQkFsckJoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4cUJUO2lCQUNGOzBHQUdDLGdCQUFnQjtzQkFEZixZQUFZO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGVtcGxhdGUvTm92b1RlbXBsYXRlU2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGUgfSBmcm9tICcuLi9jb21tb24vbm92by10ZW1wbGF0ZS9ub3ZvLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNvbnRyb2wtdGVtcGxhdGVzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tLVJlYWRvbmx5LS0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJyZWFkLW9ubHlcIiBsZXQtZm9ybT1cImZvcm1cIiBsZXQtY29udHJvbD5cbiAgICAgIDxkaXY+e3sgZm9ybS5nZXRSYXdWYWx1ZSgpW2NvbnRyb2wua2V5XSB9fTwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLVRleHRib3gtLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRleHRib3hcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIFtmb3JtR3JvdXBdPVwiZm9ybVwiXG4gICAgICAgIGNsYXNzPVwibm92by1jb250cm9sLWlucHV0LWNvbnRhaW5lciBub3ZvLWNvbnRyb2wtaW5wdXQtd2l0aC1sYWJlbFwiXG4gICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2w/LnRvb2x0aXBcIlxuICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAqbmdJZj1cImNvbnRyb2w/LnR5cGUgIT09ICdudW1iZXInICYmIGNvbnRyb2w/LnRleHRNYXNrRW5hYmxlZFwiXG4gICAgICAgICAgW3RleHRNYXNrXT1cImNvbnRyb2wubWFza09wdGlvbnNcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3R5cGVdPVwiY29udHJvbD8udHlwZVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2w/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAoaW5wdXQpPVwibWV0aG9kcy5lbWl0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBhdXRvY29tcGxldGVcbiAgICAgICAgLz5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgKm5nSWY9XCJjb250cm9sPy50eXBlICE9PSAnbnVtYmVyJyAmJiAhY29udHJvbD8udGV4dE1hc2tFbmFibGVkXCJcbiAgICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImVycm9ycz8ubWF4bGVuZ3RoXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbaWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFt0eXBlXT1cImNvbnRyb2w/LnR5cGVcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgKGlucHV0KT1cIm1ldGhvZHMuZW1pdENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbnRyb2w/Lm1heGxlbmd0aFwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIGF1dG9jb21wbGV0ZVxuICAgICAgICAvPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAqbmdJZj1cImNvbnRyb2w/LnR5cGUgPT09ICdudW1iZXInICYmIGNvbnRyb2w/LnN1YlR5cGUgIT09ICdwZXJjZW50YWdlJ1wiXG4gICAgICAgICAgW2NsYXNzLm1heGxlbmd0aC1lcnJvcl09XCJlcnJvcnM/Lm1heGxlbmd0aFwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2lkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbdHlwZV09XCJjb250cm9sPy50eXBlXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbD8ucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIChrZXlkb3duKT1cIm1ldGhvZHMucmVzdHJpY3RLZXlzKCRldmVudClcIlxuICAgICAgICAgIChpbnB1dCk9XCJtZXRob2RzLmVtaXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgW21heGxlbmd0aF09XCJjb250cm9sPy5tYXhsZW5ndGhcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBzdGVwPVwiYW55XCJcbiAgICAgICAgICAobW91c2V3aGVlbCk9XCJudW1iZXJJbnB1dC5ibHVyKClcIlxuICAgICAgICAgICNudW1iZXJJbnB1dFxuICAgICAgICAvPlxuICAgICAgICA8IS0tIHRoZSBwZXJjZW50YWdlIGlucHV0IGRvZXMgbm90IHVzZSBmb3JtQ29udHJvbE5hbWUgbGlrZSBhIG5vcm1hbCByZWFjdGl2ZSBpbnB1dCBiZWNhdXNlIGluc3RlYWQgb2ZcbiAgICAgICAgICBzZXR0aW5nIHRoZSBmbG9hdGluZyBwb2ludCB2YWx1ZSBkaXJlY3RseSwgaXQgaXMgbXVsdGlwbGllZCBieSAxMDAgaW50byBhIHBlcmNlbnRhZ2UgdmFsdWUgLS0+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICpuZ0lmPVwiY29udHJvbD8udHlwZSA9PT0gJ251bWJlcicgJiYgY29udHJvbD8uc3ViVHlwZSA9PT0gJ3BlcmNlbnRhZ2UnXCJcbiAgICAgICAgICBbaWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFt0eXBlXT1cImNvbnRyb2w/LnR5cGVcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgKGtleWRvd24pPVwibWV0aG9kcy5yZXN0cmljdEtleXMoJGV2ZW50KVwiXG4gICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2w/LnBlcmNlbnRWYWx1ZVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2w/LnJlYWRPbmx5XCJcbiAgICAgICAgICAoaW5wdXQpPVwibWV0aG9kcy5oYW5kbGVQZXJjZW50Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBzdGVwPVwiYW55XCJcbiAgICAgICAgICAobW91c2V3aGVlbCk9XCJwZXJjZW50SW5wdXQuYmx1cigpXCJcbiAgICAgICAgICAjcGVyY2VudElucHV0XG4gICAgICAgIC8+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImlucHV0LWxhYmVsXCIgKm5nSWY9XCJjb250cm9sPy5zdWJUeXBlID09PSAnY3VycmVuY3knXCI+e3sgY29udHJvbC5jdXJyZW5jeUZvcm1hdCB9fTwvbGFiZWw+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImlucHV0LWxhYmVsXCIgKm5nSWY9XCJjb250cm9sPy5zdWJUeXBlID09PSAncGVyY2VudGFnZSdcIj4lPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tVGV4dGFyZWEtLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRleHQtYXJlYVwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJ0ZXh0YXJlYS1jb250YWluZXJcIlxuICAgICAgICBbZm9ybUdyb3VwXT1cImZvcm1cIlxuICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sPy50b29sdGlwXCJcbiAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgID5cbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgW2NsYXNzLm1heGxlbmd0aC1lcnJvcl09XCJlcnJvcnM/Lm1heGxlbmd0aFwiXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFthdHRyLmlkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgYXV0b3NpemVcbiAgICAgICAgICAoaW5wdXQpPVwibWV0aG9kcy5oYW5kbGVUZXh0QXJlYUlucHV0KCRldmVudClcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbnRyb2w/Lm1heGxlbmd0aFwiXG4gICAgICAgID48L3RleHRhcmVhPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1FZGl0b3ItLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZWRpdG9yXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tZWRpdG9yXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtzdGFydHVwRm9jdXNdPVwiY29udHJvbC5zdGFydHVwRm9jdXNcIlxuICAgICAgICAgIFttaW5pbWFsXT1cImNvbnRyb2wubWluaW1hbFwiXG4gICAgICAgICAgW2ZpbGVCcm93c2VySW1hZ2VVcGxvYWRVcmxdPVwiY29udHJvbC5maWxlQnJvd3NlckltYWdlVXBsb2FkVXJsXCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgW2NvbmZpZ109XCJjb250cm9sLmNvbmZpZ1wiXG4gICAgICAgID48L25vdm8tZWRpdG9yPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1BY2VFZGl0b3ItLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiYWNlLWVkaXRvclwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLWFjZS1lZGl0b3JcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICA+PC9ub3ZvLWFjZS1lZGl0b3I+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLUhUTUw1IFNlbGVjdC0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJuYXRpdmUtc2VsZWN0XCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2wudG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVySHRtbENvbnRlbnRdPVwiY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgICAgW3BvcG92ZXJPbkhvdmVyXT1cImNvbnRyb2wucG9wb3Zlck9uSG92ZXJcIlxuICAgICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgICAgW3BvcG92ZXJBbmltYXRpb25dPVwiY29udHJvbC5wb3BvdmVyQW5pbWF0aW9uXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb24gKm5nSWY9XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZCBoaWRkZW4+e3sgY29udHJvbC5wbGFjZWhvbGRlciB9fTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdCBvZiBjb250cm9sLm9wdGlvbnNcIiBbdmFsdWVdPVwib3B0LmtleVwiPnt7IG9wdC52YWx1ZSB9fTwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tRmlsZS0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJmaWxlXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tZmlsZS1pbnB1dFxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbdmFsdWVdPVwiY29udHJvbC52YWx1ZVwiXG4gICAgICAgICAgW211bHRpcGxlXT1cImNvbnRyb2wubXVsdGlwbGVcIlxuICAgICAgICAgIFtsYXlvdXRPcHRpb25zXT1cImNvbnRyb2wubGF5b3V0T3B0aW9uc1wiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2wudG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVySHRtbENvbnRlbnRdPVwiY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgICAgW3BvcG92ZXJPbkhvdmVyXT1cImNvbnRyb2wucG9wb3Zlck9uSG92ZXJcIlxuICAgICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgICAgW3BvcG92ZXJBbmltYXRpb25dPVwiY29udHJvbC5wb3BvdmVyQW5pbWF0aW9uXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgICAgICAoZWRpdCk9XCJtZXRob2RzLmhhbmRsZUVkaXQoJGV2ZW50KVwiXG4gICAgICAgICAgKHNhdmUpPVwibWV0aG9kcy5oYW5kbGVTYXZlKCRldmVudClcIlxuICAgICAgICAgIChkZWxldGUpPVwibWV0aG9kcy5oYW5kbGVEZWxldGUoJGV2ZW50KVwiXG4gICAgICAgICAgKHVwbG9hZCk9XCJtZXRob2RzLmhhbmRsZVVwbG9hZCgkZXZlbnQpXCJcbiAgICAgICAgPjwvbm92by1maWxlLWlucHV0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1UaWxlcy0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJ0aWxlc1wiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLXRpbGVzXG4gICAgICAgICAgW29wdGlvbnNdPVwiY29udHJvbC5vcHRpb25zXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICAob25DaGFuZ2UpPVwibWV0aG9kcy5tb2RlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICAgIFtjb250cm9sRGlzYWJsZWRdPVwiY29udHJvbC5kaXNhYmxlZFwiXG4gICAgICAgID48L25vdm8tdGlsZXM+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLVBpY2tlci0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJwaWNrZXJcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiIGNsYXNzPVwibm92by1jb250cm9sLWlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICA8bm92by1waWNrZXJcbiAgICAgICAgICBbY29uZmlnXT1cImNvbnRyb2wuY29uZmlnXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW3BhcmVudFNjcm9sbFNlbGVjdG9yXT1cImNvbnRyb2wucGFyZW50U2Nyb2xsU2VsZWN0b3JcIlxuICAgICAgICAgICpuZ0lmPVwiIWNvbnRyb2wubXVsdGlwbGVcIlxuICAgICAgICAgIChzZWxlY3QpPVwibWV0aG9kcy5tb2RlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAoY2hhbmdlZCk9XCJtZXRob2RzLm1vZGVsQ2hhbmdlV2l0aFJhdygkZXZlbnQpXCJcbiAgICAgICAgICAodHlwaW5nKT1cIm1ldGhvZHMuaGFuZGxlVHlwaW5nKCRldmVudClcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICA+PC9ub3ZvLXBpY2tlcj5cbiAgICAgICAgPG5vdm8tY2hpcHNcbiAgICAgICAgICBbc291cmNlXT1cImNvbnRyb2wuY29uZmlnXCJcbiAgICAgICAgICBbdHlwZV09XCJjb250cm9sLmNvbmZpZy50eXBlXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW21heGxlbmd0aF09XCJjb250cm9sPy5tYXhsZW5ndGhcIlxuICAgICAgICAgICpuZ0lmPVwiY29udHJvbC5tdWx0aXBsZSAmJiAhY29udHJvbC5jb25maWcuY29sdW1uc1wiXG4gICAgICAgICAgW2Nsb3NlT25TZWxlY3RdPVwiY29udHJvbC5jbG9zZU9uU2VsZWN0XCJcbiAgICAgICAgICAoY2hhbmdlZCk9XCJtZXRob2RzLm1vZGVsQ2hhbmdlV2l0aFJhdygkZXZlbnQpXCJcbiAgICAgICAgICAodHlwaW5nKT1cIm1ldGhvZHMuaGFuZGxlVHlwaW5nKCRldmVudClcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICA+PC9ub3ZvLWNoaXBzPlxuICAgICAgICA8bm92by1yb3ctY2hpcHNcbiAgICAgICAgICBbc291cmNlXT1cImNvbnRyb2wuY29uZmlnXCJcbiAgICAgICAgICBbdHlwZV09XCJjb250cm9sLmNvbmZpZy50eXBlXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW21heGxlbmd0aF09XCJjb250cm9sPy5tYXhsZW5ndGhcIlxuICAgICAgICAgICpuZ0lmPVwiY29udHJvbC5tdWx0aXBsZSAmJiBjb250cm9sLmNvbmZpZy5jb2x1bW5zXCJcbiAgICAgICAgICBbY2xvc2VPblNlbGVjdF09XCJjb250cm9sLmNsb3NlT25TZWxlY3RcIlxuICAgICAgICAgIChjaGFuZ2VkKT1cIm1ldGhvZHMubW9kZWxDaGFuZ2VXaXRoUmF3KCRldmVudClcIlxuICAgICAgICAgICh0eXBpbmcpPVwibWV0aG9kcy5oYW5kbGVUeXBpbmcoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgID48L25vdm8tcm93LWNoaXBzPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1Ob3ZvIFNlbGVjdC0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJzZWxlY3RcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1zZWxlY3RcbiAgICAgICAgICBbb3B0aW9uc109XCJjb250cm9sLm9wdGlvbnNcIlxuICAgICAgICAgIFtoZWFkZXJDb25maWddPVwiY29udHJvbC5oZWFkZXJDb25maWdcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJdPVwiY29udHJvbC5wb3BvdmVyQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgICAgW3BvcG92ZXJQbGFjZW1lbnRdPVwiY29udHJvbC5wb3BvdmVyUGxhY2VtZW50XCJcbiAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc2FibGVkXT1cImNvbnRyb2wucG9wb3ZlckRpc2FibGVkXCJcbiAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgICAgIChvblNlbGVjdCk9XCJtZXRob2RzLm1vZGVsQ2hhbmdlKCRldmVudClcIlxuICAgICAgICA+PC9ub3ZvLXNlbGVjdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tVGltZXpvbmUgLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRpbWV6b25lXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0XG4gICAgICAgICAgW29wdGlvbnNdPVwiY29udHJvbC5vcHRpb25zXCJcbiAgICAgICAgICBbaGVhZGVyQ29uZmlnXT1cImNvbnRyb2wuaGVhZGVyQ29uZmlnXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2wudG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVySHRtbENvbnRlbnRdPVwiY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgICAgW3BvcG92ZXJPbkhvdmVyXT1cImNvbnRyb2wucG9wb3Zlck9uSG92ZXJcIlxuICAgICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgICAgW3BvcG92ZXJBbmltYXRpb25dPVwiY29udHJvbC5wb3BvdmVyQW5pbWF0aW9uXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgICAgICBwb3NpdGlvbj1cImJvdHRvbVwiXG4gICAgICAgICAgKG9uU2VsZWN0KT1cIm1ldGhvZHMubW9kZWxDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1SYWRpby0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJyYWRpb1wiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCIgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgIDxub3ZvLXJhZGlvLWdyb3VwIFtuYW1lXT1cImNvbnRyb2wua2V5XCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiPlxuICAgICAgICAgIDxub3ZvLXJhZGlvXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbnRyb2wub3B0aW9uc1wiXG4gICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICAgIFtsYWJlbF09XCJvcHRpb24ubGFiZWxcIlxuICAgICAgICAgICAgW2NoZWNrZWRdPVwiXG4gICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9PT0gZm9ybS5nZXRSYXdWYWx1ZSgpW2NvbnRyb2wua2V5XSB8fFxuICAgICAgICAgICAgICAoZm9ybS5nZXRSYXdWYWx1ZSgpW2NvbnRyb2wua2V5XSAmJiBvcHRpb24udmFsdWUgPT09IGZvcm0uZ2V0UmF3VmFsdWUoKVtjb250cm9sLmtleV0uaWQpXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgICAgICBbYnV0dG9uXT1cIiEhb3B0aW9uLmljb25cIlxuICAgICAgICAgICAgW2ljb25dPVwib3B0aW9uLmljb25cIlxuICAgICAgICAgICAgW2NvbG9yXT1cIm9wdGlvbi5jb2xvclwiXG4gICAgICAgICAgICBbdGhlbWVdPVwiISFvcHRpb24uaWNvbiAmJiAhb3B0aW9uLmxhYmVsID8gJ2ljb24nIDogJ3NlY29uZGFyeSdcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNvbnRyb2wua2V5ICsgJy0nICsgKG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uPy52YWx1ZSlcIlxuICAgICAgICAgID48L25vdm8tcmFkaW8+XG4gICAgICAgIDwvbm92by1yYWRpby1ncm91cD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tVGltZS0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJ0aW1lXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdlxuICAgICAgICBbZm9ybUdyb3VwXT1cImZvcm1cIlxuICAgICAgICBjbGFzcz1cIm5vdm8tY29udHJvbC1pbnB1dC1jb250YWluZXJcIlxuICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sPy50b29sdGlwXCJcbiAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgID5cbiAgICAgICAgPG5vdm8tdGltZS1waWNrZXItaW5wdXRcbiAgICAgICAgICBbYXR0ci5pZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbbWlsaXRhcnldPVwiY29udHJvbC5taWxpdGFyeVwiXG4gICAgICAgID48L25vdm8tdGltZS1waWNrZXItaW5wdXQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLU5hdGl2ZSBJbnB1dC0tLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwibmF0aXZlLWlucHV0XCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdlxuICAgICAgICBbZm9ybUdyb3VwXT1cImZvcm1cIlxuICAgICAgICBjbGFzcz1cIm5vdm8tY29udHJvbC1pbnB1dC1jb250YWluZXIgbm92by1jb250cm9sLWlucHV0LXdpdGgtbGFiZWxcIlxuICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sPy50b29sdGlwXCJcbiAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgW3BvcG92ZXJIdG1sQ29udGVudF09XCJjb250cm9sLnBvcG92ZXJIdG1sQ29udGVudFwiXG4gICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICBbcG9wb3Zlck9uSG92ZXJdPVwiY29udHJvbC5wb3BvdmVyT25Ib3ZlclwiXG4gICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICBbcG9wb3ZlckFuaW1hdGlvbl09XCJjb250cm9sLnBvcG92ZXJBbmltYXRpb25cIlxuICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2lkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbdHlwZV09XCJjb250cm9sLnR5cGVcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgKGlucHV0KT1cIm1ldGhvZHMuZW1pdENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLURhdGUtLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZGF0ZVwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgPlxuICAgICAgICA8bm92by1kYXRlLXBpY2tlci1pbnB1dFxuICAgICAgICAgIFthdHRyLmlkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3N0YXJ0XT1cImNvbnRyb2wuc3RhcnREYXRlXCJcbiAgICAgICAgICBbZW5kXT1cImNvbnRyb2wuZW5kRGF0ZVwiXG4gICAgICAgICAgW2Zvcm1hdF09XCJjb250cm9sLmRhdGVGb3JtYXRcIlxuICAgICAgICAgIFthbGxvd0ludmFsaWREYXRlXT1cImNvbnRyb2wuYWxsb3dJbnZhbGlkRGF0ZVwiXG4gICAgICAgICAgW3RleHRNYXNrRW5hYmxlZF09XCJjb250cm9sLnRleHRNYXNrRW5hYmxlZFwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFt3ZWVrU3RhcnRdPVwiY29udHJvbC53ZWVrU3RhcnRcIlxuICAgICAgICAgIFtkaXNhYmxlZERhdGVNZXNzYWdlXT1cImNvbnRyb2wuZGlzYWJsZWREYXRlTWVzc2FnZVwiXG4gICAgICAgICAgKGZvY3VzRXZlbnQpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1ckV2ZW50KT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAoY2hhbmdlRXZlbnQpPVwibWV0aG9kcy5lbWl0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICA+PC9ub3ZvLWRhdGUtcGlja2VyLWlucHV0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1EYXRlIGFuZCBUaW1lLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImRhdGUtdGltZVwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgW3BvcG92ZXJUaXRsZV09XCJjb250cm9sLnBvcG92ZXJUaXRsZVwiXG4gICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgW3BvcG92ZXJBbHdheXNdPVwiY29udHJvbC5wb3BvdmVyQWx3YXlzXCJcbiAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgIFtwb3BvdmVyRGlzbWlzc1RpbWVvdXRdPVwiY29udHJvbC5wb3BvdmVyRGlzbWlzc1RpbWVvdXRcIlxuICAgICAgPlxuICAgICAgICA8bm92by1kYXRlLXRpbWUtcGlja2VyLWlucHV0XG4gICAgICAgICAgW2F0dHIuaWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbc3RhcnRdPVwiY29udHJvbC5zdGFydERhdGVcIlxuICAgICAgICAgIFtlbmRdPVwiY29udHJvbC5lbmREYXRlXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW21pbGl0YXJ5XT1cImNvbnRyb2wubWlsaXRhcnlcIlxuICAgICAgICAgIFt3ZWVrU3RhcnRdPVwiY29udHJvbC53ZWVrU3RhcnRcIlxuICAgICAgICAgIChmb2N1c0V2ZW50KT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXJFdmVudCk9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgKGNoYW5nZUV2ZW50KT1cIm1ldGhvZHMuZW1pdENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgPjwvbm92by1kYXRlLXRpbWUtcGlja2VyLWlucHV0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1BZGRyZXNzLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImFkZHJlc3NcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1hZGRyZXNzXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2NvbmZpZ109XCJjb250cm9sPy5jb25maWdcIlxuICAgICAgICAgIFtyZWFkT25seV09XCJjb250cm9sPy5yZWFkT25seVwiXG4gICAgICAgICAgKGNoYW5nZSk9XCJtZXRob2RzLmhhbmRsZUFkZHJlc3NDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50LmV2ZW50LCAkZXZlbnQuZmllbGQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50LmV2ZW50LCAkZXZlbnQuZmllbGQpXCJcbiAgICAgICAgICAodmFsaWRpdHlDaGFuZ2UpPVwibWV0aG9kcy51cGRhdGVWYWxpZGl0eSgpXCJcbiAgICAgICAgPjwvbm92by1hZGRyZXNzPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1DaGVja2JveC0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJjaGVja2JveFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLWNoZWNrYm94XG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sPy5rZXlcIlxuICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2w/LmtleVwiXG4gICAgICAgICAgW2xhYmVsXT1cImNvbnRyb2w/LmNoZWNrYm94TGFiZWxcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2w/LnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICAgIFtwb3BvdmVyXT1cImNvbnRyb2wucG9wb3ZlckNvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVySHRtbENvbnRlbnRdPVwiY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnRcIlxuICAgICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiY29udHJvbC5wb3BvdmVyVGl0bGVcIlxuICAgICAgICAgIFtwb3BvdmVyUGxhY2VtZW50XT1cImNvbnRyb2wucG9wb3ZlclBsYWNlbWVudFwiXG4gICAgICAgICAgW3BvcG92ZXJPbkhvdmVyXT1cImNvbnRyb2wucG9wb3Zlck9uSG92ZXJcIlxuICAgICAgICAgIFtwb3BvdmVyQWx3YXlzXT1cImNvbnRyb2wucG9wb3ZlckFsd2F5c1wiXG4gICAgICAgICAgW3BvcG92ZXJEaXNhYmxlZF09XCJjb250cm9sLnBvcG92ZXJEaXNhYmxlZFwiXG4gICAgICAgICAgW3BvcG92ZXJBbmltYXRpb25dPVwiY29udHJvbC5wb3BvdmVyQW5pbWF0aW9uXCJcbiAgICAgICAgICBbcG9wb3ZlckRpc21pc3NUaW1lb3V0XT1cImNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0XCJcbiAgICAgICAgICBbbGF5b3V0T3B0aW9uc109XCJjb250cm9sPy5sYXlvdXRPcHRpb25zXCJcbiAgICAgICAgPjwvbm92by1jaGVja2JveD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tU3dpdGNoLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInN3aXRjaFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLXN3aXRjaFxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbD8ua2V5XCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sPy50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgID48L25vdm8tc3dpdGNoPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1DaGVja2xpc3QtLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiY2hlY2tsaXN0XCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tY2hlY2stbGlzdFxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbb3B0aW9uc109XCJjb250cm9sPy5vcHRpb25zXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sPy50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgICAgKG9uU2VsZWN0KT1cIm1ldGhvZHMubW9kZWxDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tY2hlY2stbGlzdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tUXVpY2tOb3RlLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInF1aWNrLW5vdGVcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1xdWljay1ub3RlXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3N0YXJ0dXBGb2N1c109XCJjb250cm9sPy5zdGFydHVwRm9jdXNcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW2NvbmZpZ109XCJjb250cm9sPy5jb25maWdcIlxuICAgICAgICAgIChjaGFuZ2UpPVwibWV0aG9kcy5tb2RlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sPy50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbcG9wb3Zlcl09XCJjb250cm9sLnBvcG92ZXJDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3Zlckh0bWxDb250ZW50XT1cImNvbnRyb2wucG9wb3Zlckh0bWxDb250ZW50XCJcbiAgICAgICAgICBbcG9wb3ZlclRpdGxlXT1cImNvbnRyb2wucG9wb3ZlclRpdGxlXCJcbiAgICAgICAgICBbcG9wb3ZlclBsYWNlbWVudF09XCJjb250cm9sLnBvcG92ZXJQbGFjZW1lbnRcIlxuICAgICAgICAgIFtwb3BvdmVyT25Ib3Zlcl09XCJjb250cm9sLnBvcG92ZXJPbkhvdmVyXCJcbiAgICAgICAgICBbcG9wb3ZlckFsd2F5c109XCJjb250cm9sLnBvcG92ZXJBbHdheXNcIlxuICAgICAgICAgIFtwb3BvdmVyRGlzYWJsZWRdPVwiY29udHJvbC5wb3BvdmVyRGlzYWJsZWRcIlxuICAgICAgICAgIFtwb3BvdmVyQW5pbWF0aW9uXT1cImNvbnRyb2wucG9wb3ZlckFuaW1hdGlvblwiXG4gICAgICAgICAgW3BvcG92ZXJEaXNtaXNzVGltZW91dF09XCJjb250cm9sLnBvcG92ZXJEaXNtaXNzVGltZW91dFwiXG4gICAgICAgID48L25vdm8tcXVpY2stbm90ZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db250cm9sVGVtcGxhdGVzIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGRyZW4oTm92b1RlbXBsYXRlKVxuICBkZWZhdWx0VGVtcGxhdGVzOiBRdWVyeUxpc3Q8Tm92b1RlbXBsYXRlPjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0ZW1wbGF0ZXM6IE5vdm9UZW1wbGF0ZVNlcnZpY2UpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRlZmF1bHRUZW1wbGF0ZXMgJiYgdGhpcy5kZWZhdWx0VGVtcGxhdGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5kZWZhdWx0VGVtcGxhdGVzLmZvckVhY2goKHRlbXBsYXRlOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuYWRkRGVmYXVsdCh0ZW1wbGF0ZS5uYW1lLCB0ZW1wbGF0ZS50ZW1wbGF0ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==