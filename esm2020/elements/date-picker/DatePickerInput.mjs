// NG
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { isValid } from 'date-fns';
// App
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/common";
import * as i3 from "./DatePicker";
import * as i4 from "@angular/forms";
import * as i5 from "angular-imask";
import * as i6 from "@angular/common";
// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerInputElement),
    multi: true,
};
export class NovoDatePickerInputElement {
    constructor(element, labels, _changeDetectorRef, dateFormatService) {
        this.element = element;
        this.labels = labels;
        this._changeDetectorRef = _changeDetectorRef;
        this.dateFormatService = dateFormatService;
        this.formattedValue = '';
        this.invalidDateErrorMessage = '';
        /** View -> model callback called when value changes */
        this._onChange = () => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
        /**
         * Whether to apply a text mask to the date (see `maskOptions`). Only enabled if allowInvalidDate is false.
         */
        this.textMaskEnabled = true;
        /**
         * Whether the input should emit values when the field does not yet constitute a valid date
         */
        this.allowInvalidDate = false;
        /**
         * Sets the field as to appear disabled, users will not be able to interact with the text field.
         **/
        this.disabled = false;
        /**
         * Day of the week the calendar should display first, Sunday=0...Saturday=6
         **/
        this.weekStart = 0;
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.changeEvent = new EventEmitter();
        this.placeholder = this.labels.localizedDatePlaceholder();
    }
    ngOnInit() {
        this._initFormatOptions();
    }
    ngOnChanges(changes) {
        if (Object.keys(changes).some((key) => ['format'].includes(key))) {
            this._initFormatOptions();
        }
    }
    ngAfterViewInit() {
        this.overlay.panelClosingActions.subscribe(this._handleOverlayClickout.bind(this));
    }
    _initFormatOptions() {
        this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
        if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
            this.maskOptions = this.maskOptions || this.dateFormatService.getDateMask(this.format);
        }
        else {
            this.maskOptions = undefined;
        }
        this.setupInvalidDateErrorMessage();
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        if (!this.disabled) {
            this.overlay.openPanel();
        }
    }
    closePanel() {
        this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay?.panelOpen;
    }
    get overlayElement() {
        return this.overlayOnElement || this.element;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */ || event.key === "Tab" /* Tab */) && this.panelOpen) {
            this._handleValueUpdate(event.target.value, true);
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleInput(event) {
        // if maskOptions is enabled, then we do not want to process inputs until the mask has accepted them - so those events will be
        // handled by the (accept) event.
        if (document.activeElement === event.target && !this.maskOptions) {
            this._handleValueUpdate(event.target.value, false);
        }
    }
    _handleBlur(event) {
        if (!this.overlay.isBlurRecipient(event)) {
            this.handleInvalidDate();
            this.blurEvent.emit(event);
        }
    }
    _handleOverlayClickout() {
        this.handleInvalidDate(/*fromPanelClose:*/ true);
        this.blurEvent.emit();
    }
    _handleFocus(event) {
        this.showInvalidDateError = false;
        this.openPanel();
        this.focusEvent.emit(event);
    }
    _handleValueUpdate(value, blur) {
        if (value === '') {
            this.clearValue();
            this.closePanel();
        }
        else {
            this.formatDate(value, blur);
            this.openPanel();
        }
    }
    handleMaskAccept(maskValue) {
        this._handleValueUpdate(maskValue, false);
    }
    formatDate(value, blur) {
        try {
            let dateTimeValue;
            let isInvalidDate;
            if (this.format) {
                [dateTimeValue, , isInvalidDate] = this.dateFormatService.parseCustomDateString(value, this.format);
            }
            else {
                [dateTimeValue, , isInvalidDate] = this.dateFormatService.parseString(value, false, 'date');
            }
            this.isInvalidDate = isInvalidDate;
            // if we have a full date - set the dateTimeValue
            if (dateTimeValue?.getFullYear()?.toString().length === 4) {
                const dt = new Date(dateTimeValue);
                this.dispatchOnChange(dt, blur);
                // if we only have a partial date - set the value to null
            }
            else if (isNaN(dateTimeValue?.getUTCDate())) {
                this.dispatchOnChange(null, blur);
            }
        }
        catch (err) { }
    }
    writeValue(value) {
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    handleInvalidDate(fromPanelClose = false) {
        if (this.isInvalidDate) { //} && this.value) {
            this.showInvalidDateError = true;
            this.clearValue();
            if (!fromPanelClose) {
                this.closePanel();
            }
        }
    }
    setupInvalidDateErrorMessage() {
        let dateFormat = this.labels.dateFormatString();
        if (Helpers.isEmpty(dateFormat)) {
            // Default to mm/dd/yyyy
            dateFormat = 'mm/dd/yyyy';
        }
        else {
            dateFormat = dateFormat.toLowerCase();
        }
        this.invalidDateErrorMessage = `Invalid date field entered. Date format of ${dateFormat} is required.`;
    }
    dispatchOnChange(newValue, blur = false, skip = false) {
        if (newValue !== this.value) {
            this._onChange(newValue);
            this.changeEvent.emit(newValue);
            if (blur) {
                !skip && this.writeValue(newValue);
            }
            else {
                !skip && this._setCalendarValue(newValue);
            }
        }
    }
    _setTriggerValue(value) {
        this._setCalendarValue(value);
        this._setFormValue(value);
        this._changeDetectorRef.markForCheck();
    }
    _setCalendarValue(value) {
        if (value instanceof Date && this.value instanceof Date) {
            let newDate = new Date(value);
            newDate.setHours(0, 0, 0, 0);
            this.value = newDate;
            return;
        }
        this.value = value;
    }
    _setFormValue(value) {
        if (value) {
            const test = this.formatDateValue(value);
            this.formattedValue = test;
        }
        else {
            this.formattedValue = '';
        }
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event?.date) {
            this.showInvalidDateError = false;
            this.dispatchOnChange(event.date, true);
        }
        this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue() {
        this.formattedValue = '';
        this.dispatchOnChange(null);
    }
    formatDateValue(value) {
        const originalValue = value;
        try {
            if (!value) {
                return '';
            }
            if (this.userDefinedFormat && isValid(value)) {
                return DateUtil.format(value, this.format);
            }
            if (!(value instanceof Date)) {
                value = new Date(value);
            }
            if (!(isNaN(value.valueOf()) && this.allowInvalidDate)) {
                return this.labels.formatDateWithFormat(value, {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                });
            }
            else {
                return originalValue;
            }
        }
        catch (err) {
            return err;
        }
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
}
NovoDatePickerInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i1.DateFormatService }], target: i0.ɵɵFactoryTarget.Component });
NovoDatePickerInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", maskOptions: "maskOptions", format: "format", textMaskEnabled: "textMaskEnabled", allowInvalidDate: "allowInvalidDate", overlayOnElement: "overlayOnElement", disabled: "disabled", disabledDateMessage: "disabledDateMessage", weekStart: "weekStart" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", changeEvent: "changeEvent" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="formattedValue"
      [imask]="maskOptions"
      [placeholder]="placeholder"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      (accept)="handleMaskAccept($event)"
      #input
      data-automation-id="date-input"
      [disabled]="disabled"
    />
    <span class="error-text" *ngIf="showInvalidDateError">{{ invalidDateErrorMessage }}</span>
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
    <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>
    <novo-overlay-template [parent]="overlayElement" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        (onSelect)="setValueAndClose($event)"
        [disabledDateMessage]="disabledDateMessage"
        [ngModel]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{flex:1;position:relative;display:block!important}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:1px solid #dbdbdb;background:transparent!important;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#3d464d}:host input:focus{border-bottom:1px solid #4a89dc}:host span.error-text{color:#da4453;padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:0;top:0px;font-size:1.2rem}\n"], components: [{ type: i2.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: i3.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.IMaskDirective, selector: "[imask]", inputs: ["imaskElement", "imask", "unmask"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-picker-input', providers: [DATE_VALUE_ACCESSOR], template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="formattedValue"
      [imask]="maskOptions"
      [placeholder]="placeholder"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      (accept)="handleMaskAccept($event)"
      #input
      data-automation-id="date-input"
      [disabled]="disabled"
    />
    <span class="error-text" *ngIf="showInvalidDateError">{{ invalidDateErrorMessage }}</span>
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
    <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>
    <novo-overlay-template [parent]="overlayElement" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        (onSelect)="setValueAndClose($event)"
        [disabledDateMessage]="disabledDateMessage"
        [ngModel]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, styles: [":host{flex:1;position:relative;display:block!important}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:1px solid #dbdbdb;background:transparent!important;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#3d464d}:host input:focus{border-bottom:1px solid #4a89dc}:host span.error-text{color:#da4453;padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:0;top:0px;font-size:1.2rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i1.DateFormatService }]; }, propDecorators: { name: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], maskOptions: [{
                type: Input
            }], format: [{
                type: Input
            }], textMaskEnabled: [{
                type: Input
            }], allowInvalidDate: [{
                type: Input
            }], overlayOnElement: [{
                type: Input
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }, {
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlcklucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0ZS1waWNrZXIvRGF0ZVBpY2tlcklucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE1BQU07QUFDTixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBTyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7OztBQUU3RCxzREFBc0Q7QUFDdEQsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQTBCLENBQUM7SUFDekQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBc0NGLE1BQU0sT0FBTywwQkFBMEI7SUFzRnJDLFlBQ1MsT0FBbUIsRUFDbkIsTUFBd0IsRUFDdkIsa0JBQXFDLEVBQ3RDLGlCQUFvQztRQUhwQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3ZCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDdEMsc0JBQWlCLEdB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SVAsT0FBTztzQkFETixTQUFTO3VCQUFDLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBmb3J3YXJkUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSAnZGF0ZS1mbnMnO1xuLy8gQXBwXG5pbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdFNlcnZpY2UsIE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IERhdGVVdGlsLCBIZWxwZXJzLCBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBEQVRFX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0ZS1waWNrZXItaW5wdXQnLFxuICBwcm92aWRlcnM6IFtEQVRFX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgWyhuZ01vZGVsKV09XCJmb3JtYXR0ZWRWYWx1ZVwiXG4gICAgICBbaW1hc2tdPVwibWFza09wdGlvbnNcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIChmb2N1cyk9XCJfaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bik9XCJfaGFuZGxlS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgIChpbnB1dCk9XCJfaGFuZGxlSW5wdXQoJGV2ZW50KVwiXG4gICAgICAoYmx1cik9XCJfaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgIChhY2NlcHQpPVwiaGFuZGxlTWFza0FjY2VwdCgkZXZlbnQpXCJcbiAgICAgICNpbnB1dFxuICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZGF0ZS1pbnB1dFwiXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJlcnJvci10ZXh0XCIgKm5nSWY9XCJzaG93SW52YWxpZERhdGVFcnJvclwiPnt7IGludmFsaWREYXRlRXJyb3JNZXNzYWdlIH19PC9zcGFuPlxuICAgIDxpICpuZ0lmPVwiIWhhc1ZhbHVlXCIgKGNsaWNrKT1cIm9wZW5QYW5lbCgpXCIgY2xhc3M9XCJiaGktY2FsZW5kYXJcIj48L2k+XG4gICAgPGkgKm5nSWY9XCJoYXNWYWx1ZVwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIiBjbGFzcz1cImJoaS10aW1lc1wiPjwvaT5cbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlIFtwYXJlbnRdPVwib3ZlcmxheUVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCI+XG4gICAgICA8bm92by1kYXRlLXBpY2tlclxuICAgICAgICBbc3RhcnRdPVwic3RhcnRcIlxuICAgICAgICBbZW5kXT1cImVuZFwiXG4gICAgICAgIGlubGluZT1cInRydWVcIlxuICAgICAgICAob25TZWxlY3QpPVwic2V0VmFsdWVBbmRDbG9zZSgkZXZlbnQpXCJcbiAgICAgICAgW2Rpc2FibGVkRGF0ZU1lc3NhZ2VdPVwiZGlzYWJsZWREYXRlTWVzc2FnZVwiXG4gICAgICAgIFtuZ01vZGVsXT1cInZhbHVlXCJcbiAgICAgICAgW3dlZWtTdGFydF09XCJ3ZWVrU3RhcnRcIlxuICAgICAgPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vRGF0ZVBpY2tlcklucHV0LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwdWJsaWMgdmFsdWU6IGFueTtcbiAgcHVibGljIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHNob3dJbnZhbGlkRGF0ZUVycm9yOiBib29sZWFuO1xuICBwdWJsaWMgaW52YWxpZERhdGVFcnJvck1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIHVzZXJEZWZpbmVkRm9ybWF0OiBib29sZWFuO1xuICBwcml2YXRlIGlzSW52YWxpZERhdGU6IGJvb2xlYW47XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlcyAqL1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gYXV0b2NvbXBsZXRlIGhhcyBiZWVuIHRvdWNoZWQgKi9cbiAgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCwgZ2V0IHBhc3NlZCB0byB0aGUgbmF0aXZlIGBpbnB1dGAgZWxlbWVudFxuICAgKiovXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWQuXG4gICAqKi9cbiAgQElucHV0KClcbiAgc3RhcnQ6IERhdGU7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGVuZDogRGF0ZTtcbiAgLyoqXG4gICAqIFBsYWNlaG9sZGVyIHRleHQgdG8gZGlzcGxheSBpbiB0aGUgaW5wdXQgd2hlbiBpdCBpcyBlbXB0eS5cbiAgICoqL1xuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAvKipcbiAgICogTWFza09wdGlvbnMgdG8gcGFzcyB0byB0aGUgYW5ndWxhci1pbWFzayBwbHVnaW5cbiAgICoqL1xuICBASW5wdXQoKVxuICBtYXNrT3B0aW9uczogYW55O1xuICAvKipcbiAgICogVGhlIGZvcm1hdCB0byB1c2UgdG8gcGFyc2UgYW5kIHJlbmRlciBkYXRlczogREQvTU0vWVlZWSBvciBNTS9ERC9ZWVlZXG4gICAqKi9cbiAgQElucHV0KClcbiAgZm9ybWF0OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFwcGx5IGEgdGV4dCBtYXNrIHRvIHRoZSBkYXRlIChzZWUgYG1hc2tPcHRpb25zYCkuIE9ubHkgZW5hYmxlZCBpZiBhbGxvd0ludmFsaWREYXRlIGlzIGZhbHNlLlxuICAgKi9cbiAgQElucHV0KClcbiAgdGV4dE1hc2tFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGlucHV0IHNob3VsZCBlbWl0IHZhbHVlcyB3aGVuIHRoZSBmaWVsZCBkb2VzIG5vdCB5ZXQgY29uc3RpdHV0ZSBhIHZhbGlkIGRhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIGFsbG93SW52YWxpZERhdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIFRoZSBlbGVtZW50IHRvIHVzZSBhcyB0aGUgcGFyZW50IGZvciB0aGUgZGF0ZSBwaWNrZXIncyBvdmVybGF5ICh0byBkZXRlcm1pbmUgYm91bmRzIHNpemluZykuIEJ5IGRlZmF1bHQsXG4gICAqIHRoaXMgcmVmZXJzIHRvIHRoZSBpbnB1dCBlbGVtZW50IGl0c2VsZiwgYnV0IG1heSBiZSBhIGNvbnRhaW5lciBpZiBpdCBoYXMgYSBwYWRkZWQgYm9yZGVyLlxuICAgKi9cbiAgQElucHV0KClcbiAgb3ZlcmxheU9uRWxlbWVudDogRWxlbWVudFJlZjtcbiAgLyoqXG4gICAqIFNldHMgdGhlIGZpZWxkIGFzIHRvIGFwcGVhciBkaXNhYmxlZCwgdXNlcnMgd2lsbCBub3QgYmUgYWJsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSB0ZXh0IGZpZWxkLlxuICAgKiovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBASW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogQSBtZXNzYWdlIHRvIGRpc3BsYXkgaW4gdGhlIHBpY2tlciBvdmVybGF5IHdoZW4gYSBnaXZlbiBkYXRlIGlzIGRpc2FibGVkIHRocm91Z2ggbWluaW11bS9tYXhpbXVtXG4gICAqL1xuICBASW5wdXQoKVxuICBkaXNhYmxlZERhdGVNZXNzYWdlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBEYXkgb2YgdGhlIHdlZWsgdGhlIGNhbGVuZGFyIHNob3VsZCBkaXNwbGF5IGZpcnN0LCBTdW5kYXk9MC4uLlNhdHVyZGF5PTZcbiAgICoqL1xuICBASW5wdXQoKVxuICB3ZWVrU3RhcnQ6IERheSA9IDA7XG4gIEBPdXRwdXQoKVxuICBibHVyRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIGZvY3VzRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIGNoYW5nZUV2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgZGF0ZUZvcm1hdFNlcnZpY2U6IERhdGVGb3JtYXRTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5sYWJlbHMubG9jYWxpemVkRGF0ZVBsYWNlaG9sZGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9pbml0Rm9ybWF0T3B0aW9ucygpO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSgoa2V5KSA9PiBbJ2Zvcm1hdCddLmluY2x1ZGVzKGtleSkpKSB7XG4gICAgICB0aGlzLl9pbml0Rm9ybWF0T3B0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkucGFuZWxDbG9zaW5nQWN0aW9ucy5zdWJzY3JpYmUodGhpcy5faGFuZGxlT3ZlcmxheUNsaWNrb3V0LmJpbmQodGhpcykpO1xuICB9XG5cbiAgX2luaXRGb3JtYXRPcHRpb25zKCkge1xuICAgIHRoaXMudXNlckRlZmluZWRGb3JtYXQgPSB0aGlzLmZvcm1hdCA/ICF0aGlzLmZvcm1hdC5tYXRjaCgvXihERFxcL01NXFwvWVlZWXxNTVxcL0REXFwvWVlZWSkkL2cpIDogZmFsc2U7XG4gICAgaWYgKCF0aGlzLnVzZXJEZWZpbmVkRm9ybWF0ICYmIHRoaXMudGV4dE1hc2tFbmFibGVkICYmICF0aGlzLmFsbG93SW52YWxpZERhdGUpIHtcbiAgICAgIHRoaXMubWFza09wdGlvbnMgPSB0aGlzLm1hc2tPcHRpb25zIHx8IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UuZ2V0RGF0ZU1hc2sodGhpcy5mb3JtYXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hc2tPcHRpb25zID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLnNldHVwSW52YWxpZERhdGVFcnJvck1lc3NhZ2UoKTtcbiAgfVxuXG4gIC8qKiBCRUdJTjogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLm92ZXJsYXkub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG4gIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5LmNsb3NlUGFuZWwoKTtcbiAgfVxuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXk/LnBhbmVsT3BlbjtcbiAgfVxuXG4gIGdldCBvdmVybGF5RWxlbWVudCgpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5T25FbGVtZW50IHx8IHRoaXMuZWxlbWVudDtcbiAgfVxuICAvKiogRU5EOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoKGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSB8fCBldmVudC5rZXkgPT09IEtleS5FbnRlciB8fCBldmVudC5rZXkgPT09IEtleS5UYWIpICYmIHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLl9oYW5kbGVWYWx1ZVVwZGF0ZSgoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLCB0cnVlKTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUlucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgLy8gaWYgbWFza09wdGlvbnMgaXMgZW5hYmxlZCwgdGhlbiB3ZSBkbyBub3Qgd2FudCB0byBwcm9jZXNzIGlucHV0cyB1bnRpbCB0aGUgbWFzayBoYXMgYWNjZXB0ZWQgdGhlbSAtIHNvIHRob3NlIGV2ZW50cyB3aWxsIGJlXG4gICAgLy8gaGFuZGxlZCBieSB0aGUgKGFjY2VwdCkgZXZlbnQuXG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCAmJiAhdGhpcy5tYXNrT3B0aW9ucykge1xuICAgICAgdGhpcy5faGFuZGxlVmFsdWVVcGRhdGUoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVCbHVyKGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXkuaXNCbHVyUmVjaXBpZW50KGV2ZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVJbnZhbGlkRGF0ZSgpO1xuICAgICAgdGhpcy5ibHVyRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZU92ZXJsYXlDbGlja291dCgpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZUludmFsaWREYXRlKC8qZnJvbVBhbmVsQ2xvc2U6Ki90cnVlKTtcbiAgICB0aGlzLmJsdXJFdmVudC5lbWl0KCk7XG4gIH1cblxuICBfaGFuZGxlRm9jdXMoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dJbnZhbGlkRGF0ZUVycm9yID0gZmFsc2U7XG4gICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB0aGlzLmZvY3VzRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBfaGFuZGxlVmFsdWVVcGRhdGUodmFsdWU6IHN0cmluZywgYmx1cjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybWF0RGF0ZSh2YWx1ZSwgYmx1cik7XG4gICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1hc2tBY2NlcHQobWFza1ZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9oYW5kbGVWYWx1ZVVwZGF0ZShtYXNrVmFsdWUsIGZhbHNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBmb3JtYXREYXRlKHZhbHVlOiBzdHJpbmcsIGJsdXI6IGJvb2xlYW4pIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGVUaW1lVmFsdWU6IERhdGU7XG4gICAgICBsZXQgaXNJbnZhbGlkRGF0ZTogYm9vbGVhbjtcbiAgICAgIGlmICh0aGlzLmZvcm1hdCkge1xuICAgICAgICBbZGF0ZVRpbWVWYWx1ZSwgLCBpc0ludmFsaWREYXRlXSA9IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UucGFyc2VDdXN0b21EYXRlU3RyaW5nKHZhbHVlLCB0aGlzLmZvcm1hdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbZGF0ZVRpbWVWYWx1ZSwgLCBpc0ludmFsaWREYXRlXSA9IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UucGFyc2VTdHJpbmcodmFsdWUsIGZhbHNlLCAnZGF0ZScpO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0ludmFsaWREYXRlID0gaXNJbnZhbGlkRGF0ZTtcbiAgICAgIC8vIGlmIHdlIGhhdmUgYSBmdWxsIGRhdGUgLSBzZXQgdGhlIGRhdGVUaW1lVmFsdWVcbiAgICAgIGlmIChkYXRlVGltZVZhbHVlPy5nZXRGdWxsWWVhcigpPy50b1N0cmluZygpLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKGRhdGVUaW1lVmFsdWUpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UoZHQsIGJsdXIpO1xuICAgICAgLy8gaWYgd2Ugb25seSBoYXZlIGEgcGFydGlhbCBkYXRlIC0gc2V0IHRoZSB2YWx1ZSB0byBudWxsXG4gICAgICB9IGVsc2UgaWYgKGlzTmFOKGRhdGVUaW1lVmFsdWU/LmdldFVUQ0RhdGUoKSkpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKG51bGwsIGJsdXIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge31cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMuX3NldFRyaWdnZXJWYWx1ZSh2YWx1ZSkpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSkge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIGhhbmRsZUludmFsaWREYXRlKGZyb21QYW5lbENsb3NlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0ludmFsaWREYXRlKSB7IC8vfSAmJiB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnNob3dJbnZhbGlkRGF0ZUVycm9yID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xuICAgICAgaWYgKCFmcm9tUGFuZWxDbG9zZSkge1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXR1cEludmFsaWREYXRlRXJyb3JNZXNzYWdlKCk6IHZvaWQge1xuICAgIGxldCBkYXRlRm9ybWF0OiBzdHJpbmcgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0U3RyaW5nKCk7XG4gICAgaWYgKEhlbHBlcnMuaXNFbXB0eShkYXRlRm9ybWF0KSkge1xuICAgICAgLy8gRGVmYXVsdCB0byBtbS9kZC95eXl5XG4gICAgICBkYXRlRm9ybWF0ID0gJ21tL2RkL3l5eXknO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICB0aGlzLmludmFsaWREYXRlRXJyb3JNZXNzYWdlID0gYEludmFsaWQgZGF0ZSBmaWVsZCBlbnRlcmVkLiBEYXRlIGZvcm1hdCBvZiAke2RhdGVGb3JtYXR9IGlzIHJlcXVpcmVkLmA7XG4gIH1cblxuICBwdWJsaWMgZGlzcGF0Y2hPbkNoYW5nZShuZXdWYWx1ZT86IGFueSwgYmx1cjogYm9vbGVhbiA9IGZhbHNlLCBza2lwOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZW1pdChuZXdWYWx1ZSk7XG4gICAgICBpZiAoYmx1cikge1xuICAgICAgICAhc2tpcCAmJiB0aGlzLndyaXRlVmFsdWUobmV3VmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIXNraXAgJiYgdGhpcy5fc2V0Q2FsZW5kYXJWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VHJpZ2dlclZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRDYWxlbmRhclZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLl9zZXRGb3JtVmFsdWUodmFsdWUpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2FsZW5kYXJWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiB0aGlzLnZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgbGV0IG5ld0RhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICBuZXdEYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgdGhpcy52YWx1ZSA9IG5ld0RhdGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEZvcm1WYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCB0ZXN0ID0gdGhpcy5mb3JtYXREYXRlVmFsdWUodmFsdWUpO1xuICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IHRlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcbiAgICogY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eSBpZiB0aGlzIGludGVyYWN0aW9uXG4gICAqIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBhbnkgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50Py5kYXRlKSB7XG4gICAgICB0aGlzLnNob3dJbnZhbGlkRGF0ZUVycm9yID0gZmFsc2U7XG4gICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UoZXZlbnQuZGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHVibGljIGNsZWFyVmFsdWUoKSB7XG4gICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9ICcnO1xuICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShudWxsKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JtYXREYXRlVmFsdWUodmFsdWUpIHtcbiAgICBjb25zdCBvcmlnaW5hbFZhbHVlID0gdmFsdWU7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudXNlckRlZmluZWRGb3JtYXQgJiYgaXNWYWxpZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIERhdGVVdGlsLmZvcm1hdCh2YWx1ZSwgdGhpcy5mb3JtYXQpO1xuICAgICAgfVxuICAgICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICghKGlzTmFOKHZhbHVlLnZhbHVlT2YoKSkgJiYgdGhpcy5hbGxvd0ludmFsaWREYXRlKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodmFsdWUsIHtcbiAgICAgICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBlcnI7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBoYXNWYWx1ZSgpIHtcbiAgICByZXR1cm4gIUhlbHBlcnMuaXNFbXB0eSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19