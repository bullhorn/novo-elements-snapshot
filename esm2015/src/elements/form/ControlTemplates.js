import { Component, QueryList, ViewChildren } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
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
NovoControlTemplates.decorators = [
    { type: Component, args: [{
                selector: 'novo-control-templates',
                template: `
    <!---Readonly--->
    <ng-template novoTemplate="read-only" let-form="form" let-control>
      <div>{{ form.value[control.key] }}</div>
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
        ></novo-chips>
        <novo-row-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
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
            [checked]="option.value === form.value[control.key] || (form.value[control.key] && option.value === form.value[control.key].id)"
            [tooltip]="control.tooltip"
            [tooltipPosition]="control.tooltipPosition"
            [tooltipSize]="control?.tooltipSize"
            [tooltipPreline]="control?.tooltipPreline"
            [removeTooltipArrow]="control?.removeTooltipArrow"
            [tooltipAutoPosition]="control?.tooltipAutoPosition"
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
          [layoutOptions]="control?.layoutOptions"
        ></novo-checkbox>
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
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [tooltipPreline]="control?.tooltipPreline"
        ></novo-quick-note>
      </div>
    </ng-template>
  `
            },] }
];
NovoControlTemplates.ctorParameters = () => [
    { type: NovoTemplateService }
];
NovoControlTemplates.propDecorators = {
    defaultTemplates: [{ type: ViewChildren, args: [NovoTemplate,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbFRlbXBsYXRlcy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9mb3JtL0NvbnRyb2xUZW1wbGF0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saURBQWlELENBQUM7QUFxZi9FLE1BQU0sT0FBTyxvQkFBb0I7SUFHL0IsWUFBb0IsU0FBOEI7UUFBOUIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7SUFBRyxDQUFDO0lBRXRELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OztZQS9mRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ2ZUO2FBQ0Y7OztZQXJmUSxtQkFBbUI7OzsrQkF1ZnpCLFlBQVksU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RlbXBsYXRlL05vdm9UZW1wbGF0ZVNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlIH0gZnJvbSAnLi4vY29tbW9uL25vdm8tdGVtcGxhdGUvbm92by10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jb250cm9sLXRlbXBsYXRlcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLS1SZWFkb25seS0tLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwicmVhZC1vbmx5XCIgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWNvbnRyb2w+XG4gICAgICA8ZGl2Pnt7IGZvcm0udmFsdWVbY29udHJvbC5rZXldIH19PC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8IS0tVGV4dGJveC0tLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwidGV4dGJveFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyIG5vdm8tY29udHJvbC1pbnB1dC13aXRoLWxhYmVsXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgKm5nSWY9XCJjb250cm9sPy50eXBlICE9PSAnbnVtYmVyJyAmJiBjb250cm9sPy50ZXh0TWFza0VuYWJsZWRcIlxuICAgICAgICAgIFt0ZXh0TWFza109XCJjb250cm9sLm1hc2tPcHRpb25zXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbaWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFt0eXBlXT1cImNvbnRyb2w/LnR5cGVcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgKGlucHV0KT1cIm1ldGhvZHMuZW1pdENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgYXV0b2NvbXBsZXRlXG4gICAgICAgIC8+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICpuZ0lmPVwiY29udHJvbD8udHlwZSAhPT0gJ251bWJlcicgJiYgIWNvbnRyb2w/LnRleHRNYXNrRW5hYmxlZFwiXG4gICAgICAgICAgW2NsYXNzLm1heGxlbmd0aC1lcnJvcl09XCJlcnJvcnM/Lm1heGxlbmd0aFwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2lkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbdHlwZV09XCJjb250cm9sPy50eXBlXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbD8ucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIChpbnB1dCk9XCJtZXRob2RzLmVtaXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgW21heGxlbmd0aF09XCJjb250cm9sPy5tYXhsZW5ndGhcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBhdXRvY29tcGxldGVcbiAgICAgICAgLz5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgKm5nSWY9XCJjb250cm9sPy50eXBlID09PSAnbnVtYmVyJyAmJiBjb250cm9sPy5zdWJUeXBlICE9PSAncGVyY2VudGFnZSdcIlxuICAgICAgICAgIFtjbGFzcy5tYXhsZW5ndGgtZXJyb3JdPVwiZXJyb3JzPy5tYXhsZW5ndGhcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3R5cGVdPVwiY29udHJvbD8udHlwZVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2w/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAoa2V5ZG93bik9XCJtZXRob2RzLnJlc3RyaWN0S2V5cygkZXZlbnQpXCJcbiAgICAgICAgICAoaW5wdXQpPVwibWV0aG9kcy5lbWl0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgIFttYXhsZW5ndGhdPVwiY29udHJvbD8ubWF4bGVuZ3RoXCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgc3RlcD1cImFueVwiXG4gICAgICAgICAgKG1vdXNld2hlZWwpPVwibnVtYmVySW5wdXQuYmx1cigpXCJcbiAgICAgICAgICAjbnVtYmVySW5wdXRcbiAgICAgICAgLz5cbiAgICAgICAgPCEtLSB0aGUgcGVyY2VudGFnZSBpbnB1dCBkb2VzIG5vdCB1c2UgZm9ybUNvbnRyb2xOYW1lIGxpa2UgYSBub3JtYWwgcmVhY3RpdmUgaW5wdXQgYmVjYXVzZSBpbnN0ZWFkIG9mXG4gICAgICAgICAgc2V0dGluZyB0aGUgZmxvYXRpbmcgcG9pbnQgdmFsdWUgZGlyZWN0bHksIGl0IGlzIG11bHRpcGxpZWQgYnkgMTAwIGludG8gYSBwZXJjZW50YWdlIHZhbHVlIC0tPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAqbmdJZj1cImNvbnRyb2w/LnR5cGUgPT09ICdudW1iZXInICYmIGNvbnRyb2w/LnN1YlR5cGUgPT09ICdwZXJjZW50YWdlJ1wiXG4gICAgICAgICAgW2lkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbdHlwZV09XCJjb250cm9sPy50eXBlXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbD8ucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIChrZXlkb3duKT1cIm1ldGhvZHMucmVzdHJpY3RLZXlzKCRldmVudClcIlxuICAgICAgICAgIFt2YWx1ZV09XCJjb250cm9sPy5wZXJjZW50VmFsdWVcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sPy5yZWFkT25seVwiXG4gICAgICAgICAgKGlucHV0KT1cIm1ldGhvZHMuaGFuZGxlUGVyY2VudENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgc3RlcD1cImFueVwiXG4gICAgICAgICAgKG1vdXNld2hlZWwpPVwicGVyY2VudElucHV0LmJsdXIoKVwiXG4gICAgICAgICAgI3BlcmNlbnRJbnB1dFxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiICpuZ0lmPVwiY29udHJvbD8uc3ViVHlwZSA9PT0gJ2N1cnJlbmN5J1wiPnt7IGNvbnRyb2wuY3VycmVuY3lGb3JtYXQgfX08L2xhYmVsPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiICpuZ0lmPVwiY29udHJvbD8uc3ViVHlwZSA9PT0gJ3BlcmNlbnRhZ2UnXCI+JTwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLVRleHRhcmVhLS0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJ0ZXh0LWFyZWFcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwidGV4dGFyZWEtY29udGFpbmVyXCJcbiAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgID5cbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgW2NsYXNzLm1heGxlbmd0aC1lcnJvcl09XCJlcnJvcnM/Lm1heGxlbmd0aFwiXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFthdHRyLmlkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgYXV0b3NpemVcbiAgICAgICAgICAoaW5wdXQpPVwibWV0aG9kcy5oYW5kbGVUZXh0QXJlYUlucHV0KCRldmVudClcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbnRyb2w/Lm1heGxlbmd0aFwiXG4gICAgICAgID48L3RleHRhcmVhPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1FZGl0b3ItLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZWRpdG9yXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tZWRpdG9yXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtzdGFydHVwRm9jdXNdPVwiY29udHJvbC5zdGFydHVwRm9jdXNcIlxuICAgICAgICAgIFttaW5pbWFsXT1cImNvbnRyb2wubWluaW1hbFwiXG4gICAgICAgICAgW2ZpbGVCcm93c2VySW1hZ2VVcGxvYWRVcmxdPVwiY29udHJvbC5maWxlQnJvd3NlckltYWdlVXBsb2FkVXJsXCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgW2NvbmZpZ109XCJjb250cm9sLmNvbmZpZ1wiXG4gICAgICAgID48L25vdm8tZWRpdG9yPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1BY2VFZGl0b3ItLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiYWNlLWVkaXRvclwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLWFjZS1lZGl0b3JcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICA+PC9ub3ZvLWFjZS1lZGl0b3I+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLUhUTUw1IFNlbGVjdC0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJuYXRpdmUtc2VsZWN0XCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2wudG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICA+XG4gICAgICAgICAgPG9wdGlvbiAqbmdJZj1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkIGhpZGRlbj57eyBjb250cm9sLnBsYWNlaG9sZGVyIH19PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0IG9mIGNvbnRyb2wub3B0aW9uc1wiIFt2YWx1ZV09XCJvcHQua2V5XCI+e3sgb3B0LnZhbHVlIH19PC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1GaWxlLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImZpbGVcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1maWxlLWlucHV0XG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2lkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFt2YWx1ZV09XCJjb250cm9sLnZhbHVlXCJcbiAgICAgICAgICBbbXVsdGlwbGVdPVwiY29udHJvbC5tdWx0aXBsZVwiXG4gICAgICAgICAgW2xheW91dE9wdGlvbnNdPVwiY29udHJvbC5sYXlvdXRPcHRpb25zXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgKGVkaXQpPVwibWV0aG9kcy5oYW5kbGVFZGl0KCRldmVudClcIlxuICAgICAgICAgIChzYXZlKT1cIm1ldGhvZHMuaGFuZGxlU2F2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAoZGVsZXRlKT1cIm1ldGhvZHMuaGFuZGxlRGVsZXRlKCRldmVudClcIlxuICAgICAgICAgICh1cGxvYWQpPVwibWV0aG9kcy5oYW5kbGVVcGxvYWQoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tZmlsZS1pbnB1dD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tVGlsZXMtLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwidGlsZXNcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by10aWxlc1xuICAgICAgICAgIFtvcHRpb25zXT1cImNvbnRyb2wub3B0aW9uc1wiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgKG9uQ2hhbmdlKT1cIm1ldGhvZHMubW9kZWxDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2wudG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgICBbdG9vbHRpcFNpemVdPVwiY29udHJvbD8udG9vbHRpcFNpemVcIlxuICAgICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICAgIFt0b29sdGlwQXV0b1Bvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBBdXRvUG9zaXRpb25cIlxuICAgICAgICAgIFtjb250cm9sRGlzYWJsZWRdPVwiY29udHJvbC5kaXNhYmxlZFwiXG4gICAgICAgID48L25vdm8tdGlsZXM+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLVBpY2tlci0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJwaWNrZXJcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiIGNsYXNzPVwibm92by1jb250cm9sLWlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICA8bm92by1waWNrZXJcbiAgICAgICAgICBbY29uZmlnXT1cImNvbnRyb2wuY29uZmlnXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW3BhcmVudFNjcm9sbFNlbGVjdG9yXT1cImNvbnRyb2wucGFyZW50U2Nyb2xsU2VsZWN0b3JcIlxuICAgICAgICAgICpuZ0lmPVwiIWNvbnRyb2wubXVsdGlwbGVcIlxuICAgICAgICAgIChzZWxlY3QpPVwibWV0aG9kcy5tb2RlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAoY2hhbmdlZCk9XCJtZXRob2RzLm1vZGVsQ2hhbmdlV2l0aFJhdygkZXZlbnQpXCJcbiAgICAgICAgICAodHlwaW5nKT1cIm1ldGhvZHMuaGFuZGxlVHlwaW5nKCRldmVudClcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyKT1cIm1ldGhvZHMuaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgID48L25vdm8tcGlja2VyPlxuICAgICAgICA8bm92by1jaGlwc1xuICAgICAgICAgIFtzb3VyY2VdPVwiY29udHJvbC5jb25maWdcIlxuICAgICAgICAgIFt0eXBlXT1cImNvbnRyb2wuY29uZmlnLnR5cGVcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbnRyb2w/Lm1heGxlbmd0aFwiXG4gICAgICAgICAgKm5nSWY9XCJjb250cm9sLm11bHRpcGxlICYmICFjb250cm9sLmNvbmZpZy5jb2x1bW5zXCJcbiAgICAgICAgICBbY2xvc2VPblNlbGVjdF09XCJjb250cm9sLmNsb3NlT25TZWxlY3RcIlxuICAgICAgICAgIChjaGFuZ2VkKT1cIm1ldGhvZHMubW9kZWxDaGFuZ2VXaXRoUmF3KCRldmVudClcIlxuICAgICAgICAgICh0eXBpbmcpPVwibWV0aG9kcy5oYW5kbGVUeXBpbmcoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgPjwvbm92by1jaGlwcz5cbiAgICAgICAgPG5vdm8tcm93LWNoaXBzXG4gICAgICAgICAgW3NvdXJjZV09XCJjb250cm9sLmNvbmZpZ1wiXG4gICAgICAgICAgW3R5cGVdPVwiY29udHJvbC5jb25maWcudHlwZVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICpuZ0lmPVwiY29udHJvbC5tdWx0aXBsZSAmJiBjb250cm9sLmNvbmZpZy5jb2x1bW5zXCJcbiAgICAgICAgICBbY2xvc2VPblNlbGVjdF09XCJjb250cm9sLmNsb3NlT25TZWxlY3RcIlxuICAgICAgICAgIChjaGFuZ2VkKT1cIm1ldGhvZHMubW9kZWxDaGFuZ2VXaXRoUmF3KCRldmVudClcIlxuICAgICAgICAgICh0eXBpbmcpPVwibWV0aG9kcy5oYW5kbGVUeXBpbmcoJGV2ZW50KVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgPjwvbm92by1yb3ctY2hpcHM+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLU5vdm8gU2VsZWN0LS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInNlbGVjdFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdFxuICAgICAgICAgIFtvcHRpb25zXT1cImNvbnRyb2wub3B0aW9uc1wiXG4gICAgICAgICAgW2hlYWRlckNvbmZpZ109XCJjb250cm9sLmhlYWRlckNvbmZpZ1wiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICAob25TZWxlY3QpPVwibWV0aG9kcy5tb2RlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgPjwvbm92by1zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLVRpbWV6b25lIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJ0aW1lem9uZVwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdFxuICAgICAgICAgIFtvcHRpb25zXT1cImNvbnRyb2wub3B0aW9uc1wiXG4gICAgICAgICAgW2hlYWRlckNvbmZpZ109XCJjb250cm9sLmhlYWRlckNvbmZpZ1wiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2wudG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBwb3NpdGlvbj1cImJvdHRvbVwiXG4gICAgICAgICAgKG9uU2VsZWN0KT1cIm1ldGhvZHMubW9kZWxDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1SYWRpby0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJyYWRpb1wiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCIgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgIDxub3ZvLXJhZGlvLWdyb3VwIFtuYW1lXT1cImNvbnRyb2wua2V5XCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiPlxuICAgICAgICAgIDxub3ZvLXJhZGlvXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbnRyb2wub3B0aW9uc1wiXG4gICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICAgIFtsYWJlbF09XCJvcHRpb24ubGFiZWxcIlxuICAgICAgICAgICAgW2NoZWNrZWRdPVwib3B0aW9uLnZhbHVlID09PSBmb3JtLnZhbHVlW2NvbnRyb2wua2V5XSB8fCAoZm9ybS52YWx1ZVtjb250cm9sLmtleV0gJiYgb3B0aW9uLnZhbHVlID09PSBmb3JtLnZhbHVlW2NvbnRyb2wua2V5XS5pZClcIlxuICAgICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbC50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICAgIFtidXR0b25dPVwiISFvcHRpb24uaWNvblwiXG4gICAgICAgICAgICBbaWNvbl09XCJvcHRpb24uaWNvblwiXG4gICAgICAgICAgICBbY29sb3JdPVwib3B0aW9uLmNvbG9yXCJcbiAgICAgICAgICAgIFt0aGVtZV09XCIhIW9wdGlvbi5pY29uICYmICFvcHRpb24ubGFiZWwgPyAnaWNvbicgOiAnc2Vjb25kYXJ5J1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY29udHJvbC5rZXkgKyAnLScgKyAob3B0aW9uPy5sYWJlbCB8fCBvcHRpb24/LnZhbHVlKVwiXG4gICAgICAgICAgPjwvbm92by1yYWRpbz5cbiAgICAgICAgPC9ub3ZvLXJhZGlvLWdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1UaW1lLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRpbWVcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIFtmb3JtR3JvdXBdPVwiZm9ybVwiXG4gICAgICAgIGNsYXNzPVwibm92by1jb250cm9sLWlucHV0LWNvbnRhaW5lclwiXG4gICAgICAgIFt0b29sdGlwXT1cImNvbnRyb2w/LnRvb2x0aXBcIlxuICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICA+XG4gICAgICAgIDxub3ZvLXRpbWUtcGlja2VyLWlucHV0XG4gICAgICAgICAgW2F0dHIuaWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW21pbGl0YXJ5XT1cImNvbnRyb2wubWlsaXRhcnlcIlxuICAgICAgICA+PC9ub3ZvLXRpbWUtcGlja2VyLWlucHV0PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS1OYXRpdmUgSW5wdXQtLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cIm5hdGl2ZS1pbnB1dFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyIG5vdm8tY29udHJvbC1pbnB1dC13aXRoLWxhYmVsXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2lkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbdHlwZV09XCJjb250cm9sLnR5cGVcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgKGlucHV0KT1cIm1ldGhvZHMuZW1pdENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAoZm9jdXMpPVwibWV0aG9kcy5oYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAoYmx1cik9XCJtZXRob2RzLmhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLURhdGUtLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZGF0ZVwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW2Zvcm1Hcm91cF09XCJmb3JtXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQtY29udGFpbmVyXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbC50b29sdGlwXCJcbiAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgIFt0b29sdGlwUHJlbGluZV09XCJjb250cm9sPy50b29sdGlwUHJlbGluZVwiXG4gICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICA+XG4gICAgICAgIDxub3ZvLWRhdGUtcGlja2VyLWlucHV0XG4gICAgICAgICAgW2F0dHIuaWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbc3RhcnRdPVwiY29udHJvbC5zdGFydERhdGVcIlxuICAgICAgICAgIFtlbmRdPVwiY29udHJvbC5lbmREYXRlXCJcbiAgICAgICAgICBbZm9ybWF0XT1cImNvbnRyb2wuZGF0ZUZvcm1hdFwiXG4gICAgICAgICAgW2FsbG93SW52YWxpZERhdGVdPVwiY29udHJvbC5hbGxvd0ludmFsaWREYXRlXCJcbiAgICAgICAgICBbdGV4dE1hc2tFbmFibGVkXT1cImNvbnRyb2wudGV4dE1hc2tFbmFibGVkXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW3dlZWtTdGFydF09XCJjb250cm9sLndlZWtTdGFydFwiXG4gICAgICAgICAgW2Rpc2FibGVkRGF0ZU1lc3NhZ2VdPVwiY29udHJvbC5kaXNhYmxlZERhdGVNZXNzYWdlXCJcbiAgICAgICAgICAoZm9jdXNFdmVudCk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyRXZlbnQpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIChjaGFuZ2VFdmVudCk9XCJtZXRob2RzLmVtaXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tZGF0ZS1waWNrZXItaW5wdXQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLURhdGUgYW5kIFRpbWUtLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZGF0ZS10aW1lXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdlxuICAgICAgICBbZm9ybUdyb3VwXT1cImZvcm1cIlxuICAgICAgICBjbGFzcz1cIm5vdm8tY29udHJvbC1pbnB1dC1jb250YWluZXJcIlxuICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sLnRvb2x0aXBcIlxuICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2wudG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgW3JlbW92ZVRvb2x0aXBBcnJvd109XCJjb250cm9sPy5yZW1vdmVUb29sdGlwQXJyb3dcIlxuICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgID5cbiAgICAgICAgPG5vdm8tZGF0ZS10aW1lLXBpY2tlci1pbnB1dFxuICAgICAgICAgIFthdHRyLmlkXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3N0YXJ0XT1cImNvbnRyb2wuc3RhcnREYXRlXCJcbiAgICAgICAgICBbZW5kXT1cImNvbnRyb2wuZW5kRGF0ZVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFttaWxpdGFyeV09XCJjb250cm9sLm1pbGl0YXJ5XCJcbiAgICAgICAgICBbd2Vla1N0YXJ0XT1cImNvbnRyb2wud2Vla1N0YXJ0XCJcbiAgICAgICAgICAoZm9jdXNFdmVudCk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAgIChibHVyRXZlbnQpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICAgIChjaGFuZ2VFdmVudCk9XCJtZXRob2RzLmVtaXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tZGF0ZS10aW1lLXBpY2tlci1pbnB1dD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tQWRkcmVzcy0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJhZGRyZXNzXCIgbGV0LWNvbnRyb2wgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWVycm9ycz1cImVycm9yc1wiIGxldC1tZXRob2RzPVwibWV0aG9kc1wiPlxuICAgICAgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5vdm8tYWRkcmVzc1xuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgIFtjb25maWddPVwiY29udHJvbD8uY29uZmlnXCJcbiAgICAgICAgICBbcmVhZE9ubHldPVwiY29udHJvbD8ucmVhZE9ubHlcIlxuICAgICAgICAgIChjaGFuZ2UpPVwibWV0aG9kcy5oYW5kbGVBZGRyZXNzQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgIChmb2N1cyk9XCJtZXRob2RzLmhhbmRsZUZvY3VzKCRldmVudC5ldmVudCwgJGV2ZW50LmZpZWxkKVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudC5ldmVudCwgJGV2ZW50LmZpZWxkKVwiXG4gICAgICAgICAgKHZhbGlkaXR5Q2hhbmdlKT1cIm1ldGhvZHMudXBkYXRlVmFsaWRpdHkoKVwiXG4gICAgICAgID48L25vdm8tYWRkcmVzcz5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tQ2hlY2tib3gtLT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiY2hlY2tib3hcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1jaGVja2JveFxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbD8ua2V5XCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sPy5rZXlcIlxuICAgICAgICAgIFtsYWJlbF09XCJjb250cm9sPy5jaGVja2JveExhYmVsXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sPy50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcFByZWxpbmVdPVwiY29udHJvbD8udG9vbHRpcFByZWxpbmVcIlxuICAgICAgICAgIFtyZW1vdmVUb29sdGlwQXJyb3ddPVwiY29udHJvbD8ucmVtb3ZlVG9vbHRpcEFycm93XCJcbiAgICAgICAgICBbdG9vbHRpcEF1dG9Qb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwQXV0b1Bvc2l0aW9uXCJcbiAgICAgICAgICBbbGF5b3V0T3B0aW9uc109XCJjb250cm9sPy5sYXlvdXRPcHRpb25zXCJcbiAgICAgICAgPjwvbm92by1jaGVja2JveD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tQ2hlY2tsaXN0LS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImNoZWNrbGlzdFwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLWNoZWNrLWxpc3RcbiAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW29wdGlvbnNdPVwiY29udHJvbD8ub3B0aW9uc1wiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiY29udHJvbD8udG9vbHRpcFwiXG4gICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJjb250cm9sPy50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgIFt0b29sdGlwU2l6ZV09XCJjb250cm9sPy50b29sdGlwU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgKG9uU2VsZWN0KT1cIm1ldGhvZHMubW9kZWxDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID48L25vdm8tY2hlY2stbGlzdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tUXVpY2tOb3RlLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInF1aWNrLW5vdGVcIiBsZXQtY29udHJvbCBsZXQtZm9ybT1cImZvcm1cIiBsZXQtZXJyb3JzPVwiZXJyb3JzXCIgbGV0LW1ldGhvZHM9XCJtZXRob2RzXCI+XG4gICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICA8bm92by1xdWljay1ub3RlXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW3N0YXJ0dXBGb2N1c109XCJjb250cm9sPy5zdGFydHVwRm9jdXNcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgW2NvbmZpZ109XCJjb250cm9sPy5jb25maWdcIlxuICAgICAgICAgIChjaGFuZ2UpPVwibWV0aG9kcy5tb2RlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJjb250cm9sPy50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cImNvbnRyb2w/LnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBTaXplXT1cImNvbnRyb2w/LnRvb2x0aXBTaXplXCJcbiAgICAgICAgICBbcmVtb3ZlVG9vbHRpcEFycm93XT1cImNvbnRyb2w/LnJlbW92ZVRvb2x0aXBBcnJvd1wiXG4gICAgICAgICAgW3Rvb2x0aXBBdXRvUG9zaXRpb25dPVwiY29udHJvbD8udG9vbHRpcEF1dG9Qb3NpdGlvblwiXG4gICAgICAgICAgW3Rvb2x0aXBQcmVsaW5lXT1cImNvbnRyb2w/LnRvb2x0aXBQcmVsaW5lXCJcbiAgICAgICAgPjwvbm92by1xdWljay1ub3RlPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NvbnRyb2xUZW1wbGF0ZXMgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvVGVtcGxhdGUpXG4gIGRlZmF1bHRUZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxOb3ZvVGVtcGxhdGU+O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRlbXBsYXRlczogTm92b1RlbXBsYXRlU2VydmljZSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGVmYXVsdFRlbXBsYXRlcyAmJiB0aGlzLmRlZmF1bHRUZW1wbGF0ZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmRlZmF1bHRUZW1wbGF0ZXMuZm9yRWFjaCgodGVtcGxhdGU6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5hZGREZWZhdWx0KHRlbXBsYXRlLm5hbWUsIHRlbXBsYXRlLnRlbXBsYXRlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19