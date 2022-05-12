// NG
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
// App
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../../services/date-format/DateFormat";
import * as i3 from "../common/overlay/Overlay";
import * as i4 from "./DatePicker";
import * as i5 from "@angular/forms";
import * as i6 from "angular2-text-mask";
import * as i7 from "@angular/common";
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
        this.textMaskEnabled = true;
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
    _initFormatOptions() {
        this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
        if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
            this.maskOptions = this.maskOptions || {
                mask: this.dateFormatService.getDateMask(),
                pipe: createAutoCorrectedDatePipe((this.format || this.labels.dateFormatString()).toLowerCase()),
                keepCharPositions: false,
                guide: true,
            };
        }
        else {
            this.maskOptions = { mask: false };
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
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */ || event.key === "Tab" /* Tab */) && this.panelOpen) {
            this._handleEvent(event, true);
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleInput(event) {
        if (document.activeElement === event.target) {
            this._handleEvent(event, false);
        }
    }
    _handleBlur(event) {
        this.handleInvalidDate();
        this.blurEvent.emit(event);
    }
    _handleFocus(event) {
        this.showInvalidDateError = false;
        this.openPanel();
        this.focusEvent.emit(event);
    }
    _handleEvent(event, blur) {
        const value = event.target.value;
        if (value === '') {
            this.clearValue();
            this.closePanel();
        }
        else {
            this.formatDate(value, blur);
            this.openPanel();
        }
    }
    formatDate(value, blur) {
        try {
            const [dateTimeValue, formatted, isInvalidDate] = this.dateFormatService.parseString(value, false, 'date');
            this.isInvalidDate = isInvalidDate;
            if (!isNaN(dateTimeValue.getUTCDate())) {
                const dt = new Date(dateTimeValue);
                this.dispatchOnChange(dt, blur);
            }
            else {
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
    handleInvalidDate() {
        if (this.isInvalidDate && this.value) {
            this.showInvalidDateError = true;
            this.clearValue();
            this.closePanel();
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
        if (event && event.date) {
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
            if (this.userDefinedFormat && dateFns.isValid(value)) {
                return dateFns.format(value, this.format);
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
            return '';
        }
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
}
NovoDatePickerInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDatePickerInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i2.DateFormatService }], target: i0.ɵɵFactoryTarget.Component });
NovoDatePickerInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", maskOptions: "maskOptions", format: "format", textMaskEnabled: "textMaskEnabled", allowInvalidDate: "allowInvalidDate", disabled: "disabled", disabledDateMessage: "disabledDateMessage", weekStart: "weekStart" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", changeEvent: "changeEvent" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="formattedValue"
      [textMask]="maskOptions"
      [placeholder]="placeholder"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      #input
      data-automation-id="date-input"
      [disabled]="disabled"
    />
    <span class="error-text" *ngIf="showInvalidDateError">{{ invalidDateErrorMessage }}</span>
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
    <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>
    <novo-overlay-template [parent]="element" position="above-below">
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
  `, isInline: true, components: [{ type: i3.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "parent"], outputs: ["select", "opening", "closing"] }, { type: i4.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.MaskedInputDirective, selector: "[textMask]", inputs: ["textMask"], exportAs: ["textMask"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDatePickerInputElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-picker-input',
                    providers: [DATE_VALUE_ACCESSOR],
                    template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="formattedValue"
      [textMask]="maskOptions"
      [placeholder]="placeholder"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      #input
      data-automation-id="date-input"
      [disabled]="disabled"
    />
    <span class="error-text" *ngIf="showInvalidDateError">{{ invalidDateErrorMessage }}</span>
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
    <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>
    <novo-overlay-template [parent]="element" position="above-below">
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
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i2.DateFormatService }]; }, propDecorators: { name: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlcklucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0ZS1waWNrZXIvRGF0ZVBpY2tlcklucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsTUFBTTtBQUNOLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7QUFFekUsc0RBQXNEO0FBQ3RELE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixDQUFDO0lBQ3pELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQW9DRixNQUFNLE9BQU8sMEJBQTBCO0lBdUVyQyxZQUNTLE9BQW1CLEVBQ25CLE1BQXdCLEVBQ3ZCLGtCQUFxQyxFQUN0QyxpQkFBb0M7UUFIcEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixX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QUc7c0JBREYsS0FBSztnQkFNTixXQUFXO3NCQURWLEtBQUs7Z0JBTU4sV0FBVztzQkFEVixLQUFLO2dCQU1OLE1BQU07c0JBREwsS0FBSztnQkFHTixlQUFlO3NCQURkLEtBQUs7Z0JBR04sZ0JBQWdCO3NCQURmLEtBQUs7Z0JBT04sUUFBUTtzQkFGUCxXQUFXO3VCQUFDLGdCQUFnQjs7c0JBQzVCLEtBQUs7Z0JBR04sbUJBQW1CO3NCQURsQixLQUFLO2dCQU1OLFNBQVM7c0JBRFIsS0FBSztnQkFHTixTQUFTO3NCQURSLE1BQU07Z0JBR1AsVUFBVTtzQkFEVCxNQUFNO2dCQUdQLFdBQVc7c0JBRFYsTUFBTTtnQkFJUCxPQUFPO3NCQUROLFNBQVM7dUJBQUMsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkdcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IGNyZWF0ZUF1dG9Db3JyZWN0ZWREYXRlUGlwZSB9IGZyb20gJ3RleHQtbWFzay1hZGRvbnMnO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRlLWZvcm1hdC9EYXRlRm9ybWF0JztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuLy8gQXBwXG5pbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheSc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgREFURV9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtcGlja2VyLWlucHV0JyxcbiAgcHJvdmlkZXJzOiBbREFURV9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBbbmFtZV09XCJuYW1lXCJcbiAgICAgIFsobmdNb2RlbCldPVwiZm9ybWF0dGVkVmFsdWVcIlxuICAgICAgW3RleHRNYXNrXT1cIm1hc2tPcHRpb25zXCJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAoZm9jdXMpPVwiX2hhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiXG4gICAgICAoaW5wdXQpPVwiX2hhbmRsZUlucHV0KCRldmVudClcIlxuICAgICAgKGJsdXIpPVwiX2hhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAjaW5wdXRcbiAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImRhdGUtaW5wdXRcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAvPlxuICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItdGV4dFwiICpuZ0lmPVwic2hvd0ludmFsaWREYXRlRXJyb3JcIj57eyBpbnZhbGlkRGF0ZUVycm9yTWVzc2FnZSB9fTwvc3Bhbj5cbiAgICA8aSAqbmdJZj1cIiFoYXNWYWx1ZVwiIChjbGljayk9XCJvcGVuUGFuZWwoKVwiIGNsYXNzPVwiYmhpLWNhbGVuZGFyXCI+PC9pPlxuICAgIDxpICpuZ0lmPVwiaGFzVmFsdWVcIiAoY2xpY2spPVwiY2xlYXJWYWx1ZSgpXCIgY2xhc3M9XCJiaGktdGltZXNcIj48L2k+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cImVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCI+XG4gICAgICA8bm92by1kYXRlLXBpY2tlclxuICAgICAgICBbc3RhcnRdPVwic3RhcnRcIlxuICAgICAgICBbZW5kXT1cImVuZFwiXG4gICAgICAgIGlubGluZT1cInRydWVcIlxuICAgICAgICAob25TZWxlY3QpPVwic2V0VmFsdWVBbmRDbG9zZSgkZXZlbnQpXCJcbiAgICAgICAgW2Rpc2FibGVkRGF0ZU1lc3NhZ2VdPVwiZGlzYWJsZWREYXRlTWVzc2FnZVwiXG4gICAgICAgIFtuZ01vZGVsXT1cInZhbHVlXCJcbiAgICAgICAgW3dlZWtTdGFydF09XCJ3ZWVrU3RhcnRcIlxuICAgICAgPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwdWJsaWMgdmFsdWU6IGFueTtcbiAgcHVibGljIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHNob3dJbnZhbGlkRGF0ZUVycm9yOiBib29sZWFuO1xuICBwdWJsaWMgaW52YWxpZERhdGVFcnJvck1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIHVzZXJEZWZpbmVkRm9ybWF0OiBib29sZWFuO1xuICBwcml2YXRlIGlzSW52YWxpZERhdGU6IGJvb2xlYW47XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlcyAqL1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gYXV0b2NvbXBsZXRlIGhhcyBiZWVuIHRvdWNoZWQgKi9cbiAgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCwgZ2V0IHBhc3NlZCB0byB0aGUgbmF0aXZlIGBpbnB1dGAgZWxlbWVudFxuICAgKiovXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWQuXG4gICAqKi9cbiAgQElucHV0KClcbiAgc3RhcnQ6IERhdGU7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGVuZDogRGF0ZTtcbiAgLyoqXG4gICAqIFBsYWNlaG9sZGVyIHRleHQgdG8gZGlzcGxheSBpbiB0aGUgaW5wdXQgd2hlbiBpdCBpcyBlbXB0eS5cbiAgICoqL1xuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAvKipcbiAgICogTWFza09wdGlvbnMgdG8gcGFzcyB0byB0aGUgdGV4dE1hc2tBZGRvbnMgcGx1Z2luXG4gICAqKi9cbiAgQElucHV0KClcbiAgbWFza09wdGlvbnM6IGFueTtcbiAgLyoqXG4gICAqIFRoZSBmb3JtYXQgdG8gdXNlIHRvIHBhcnNlIGFuZCByZW5kZXIgZGF0ZXM6IEREL01NL1lZWVkgb3IgTU0vREQvWVlZWVxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGZvcm1hdDogc3RyaW5nO1xuICBASW5wdXQoKVxuICB0ZXh0TWFza0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKVxuICBhbGxvd0ludmFsaWREYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBmaWVsZCBhcyB0byBhcHBlYXIgZGlzYWJsZWQsIHVzZXJzIHdpbGwgbm90IGJlIGFibGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgdGV4dCBmaWVsZC5cbiAgICoqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZGlzYWJsZWREYXRlTWVzc2FnZTogc3RyaW5nO1xuICAvKipcbiAgICogRGF5IG9mIHRoZSB3ZWVrIHRoZSBjYWxlbmRhciBzaG91bGQgZGlzcGxheSBmaXJzdCwgU3VuZGF5PTAuLi5TYXR1cmRheT02XG4gICAqKi9cbiAgQElucHV0KClcbiAgd2Vla1N0YXJ0OiBudW1iZXIgPSAwO1xuICBAT3V0cHV0KClcbiAgYmx1ckV2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1c0V2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICBjaGFuZ2VFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXG4gIG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGRhdGVGb3JtYXRTZXJ2aWNlOiBEYXRlRm9ybWF0U2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMubGFiZWxzLmxvY2FsaXplZERhdGVQbGFjZWhvbGRlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5faW5pdEZvcm1hdE9wdGlvbnMoKTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGtleSkgPT4gWydmb3JtYXQnXS5pbmNsdWRlcyhrZXkpKSkge1xuICAgICAgdGhpcy5faW5pdEZvcm1hdE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBfaW5pdEZvcm1hdE9wdGlvbnMoKSB7XG4gICAgdGhpcy51c2VyRGVmaW5lZEZvcm1hdCA9IHRoaXMuZm9ybWF0ID8gIXRoaXMuZm9ybWF0Lm1hdGNoKC9eKEREXFwvTU1cXC9ZWVlZfE1NXFwvRERcXC9ZWVlZKSQvZykgOiBmYWxzZTtcbiAgICBpZiAoIXRoaXMudXNlckRlZmluZWRGb3JtYXQgJiYgdGhpcy50ZXh0TWFza0VuYWJsZWQgJiYgIXRoaXMuYWxsb3dJbnZhbGlkRGF0ZSkge1xuICAgICAgdGhpcy5tYXNrT3B0aW9ucyA9IHRoaXMubWFza09wdGlvbnMgfHwge1xuICAgICAgICBtYXNrOiB0aGlzLmRhdGVGb3JtYXRTZXJ2aWNlLmdldERhdGVNYXNrKCksXG4gICAgICAgIHBpcGU6IGNyZWF0ZUF1dG9Db3JyZWN0ZWREYXRlUGlwZSgodGhpcy5mb3JtYXQgfHwgdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdFN0cmluZygpKS50b0xvd2VyQ2FzZSgpKSxcbiAgICAgICAga2VlcENoYXJQb3NpdGlvbnM6IGZhbHNlLFxuICAgICAgICBndWlkZTogdHJ1ZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWFza09wdGlvbnMgPSB7IG1hc2s6IGZhbHNlIH07XG4gICAgfVxuICAgIHRoaXMuc2V0dXBJbnZhbGlkRGF0ZUVycm9yTWVzc2FnZSgpO1xuICB9XG5cbiAgLyoqIEJFR0lOOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG4gIG9wZW5QYW5lbCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMub3ZlcmxheS5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cbiAgY2xvc2VQYW5lbCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpO1xuICB9XG4gIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkucGFuZWxPcGVuO1xuICB9XG4gIC8qKiBFTkQ6IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICgoZXZlbnQua2V5ID09PSBLZXkuRXNjYXBlIHx8IGV2ZW50LmtleSA9PT0gS2V5LkVudGVyIHx8IGV2ZW50LmtleSA9PT0gS2V5LlRhYikgJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuX2hhbmRsZUV2ZW50KGV2ZW50LCB0cnVlKTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUlucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgdGhpcy5faGFuZGxlRXZlbnQoZXZlbnQsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlQmx1cihldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlSW52YWxpZERhdGUoKTtcbiAgICB0aGlzLmJsdXJFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9oYW5kbGVGb2N1cyhldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0ludmFsaWREYXRlRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIHRoaXMuZm9jdXNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9oYW5kbGVFdmVudChldmVudDogRXZlbnQsIGJsdXI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgdGhpcy5jbGVhclZhbHVlKCk7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtYXREYXRlKHZhbHVlLCBibHVyKTtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGZvcm1hdERhdGUodmFsdWU6IHN0cmluZywgYmx1cjogYm9vbGVhbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBbZGF0ZVRpbWVWYWx1ZSwgZm9ybWF0dGVkLCBpc0ludmFsaWREYXRlXSA9IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UucGFyc2VTdHJpbmcodmFsdWUsIGZhbHNlLCAnZGF0ZScpO1xuICAgICAgdGhpcy5pc0ludmFsaWREYXRlID0gaXNJbnZhbGlkRGF0ZTtcbiAgICAgIGlmICghaXNOYU4oZGF0ZVRpbWVWYWx1ZS5nZXRVVENEYXRlKCkpKSB7XG4gICAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoZGF0ZVRpbWVWYWx1ZSk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShkdCwgYmx1cik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UobnVsbCwgYmx1cik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5fc2V0VHJpZ2dlclZhbHVlKHZhbHVlKSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG5cbiAgaGFuZGxlSW52YWxpZERhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJbnZhbGlkRGF0ZSAmJiB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnNob3dJbnZhbGlkRGF0ZUVycm9yID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0dXBJbnZhbGlkRGF0ZUVycm9yTWVzc2FnZSgpOiB2b2lkIHtcbiAgICBsZXQgZGF0ZUZvcm1hdDogc3RyaW5nID0gdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdFN0cmluZygpO1xuICAgIGlmIChIZWxwZXJzLmlzRW1wdHkoZGF0ZUZvcm1hdCkpIHtcbiAgICAgIC8vIERlZmF1bHQgdG8gbW0vZGQveXl5eVxuICAgICAgZGF0ZUZvcm1hdCA9ICdtbS9kZC95eXl5JztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZUZvcm1hdCA9IGRhdGVGb3JtYXQudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgdGhpcy5pbnZhbGlkRGF0ZUVycm9yTWVzc2FnZSA9IGBJbnZhbGlkIGRhdGUgZmllbGQgZW50ZXJlZC4gRGF0ZSBmb3JtYXQgb2YgJHtkYXRlRm9ybWF0fSBpcyByZXF1aXJlZC5gO1xuICB9XG5cbiAgcHVibGljIGRpc3BhdGNoT25DaGFuZ2UobmV3VmFsdWU/OiBhbnksIGJsdXI6IGJvb2xlYW4gPSBmYWxzZSwgc2tpcDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLl9vbkNoYW5nZShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLmNoYW5nZUV2ZW50LmVtaXQobmV3VmFsdWUpO1xuICAgICAgaWYgKGJsdXIpIHtcbiAgICAgICAgIXNraXAgJiYgdGhpcy53cml0ZVZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICFza2lwICYmIHRoaXMuX3NldENhbGVuZGFyVmFsdWUobmV3VmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldFRyaWdnZXJWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2V0Q2FsZW5kYXJWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5fc2V0Rm9ybVZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldENhbGVuZGFyVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgdGhpcy52YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIGxldCBuZXdEYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgbmV3RGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIHRoaXMudmFsdWUgPSBuZXdEYXRlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9zZXRGb3JtVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgdGVzdCA9IHRoaXMuZm9ybWF0RGF0ZVZhbHVlKHZhbHVlKTtcbiAgICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSB0ZXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGNsb3NlcyB0aGUgcGFuZWwsIGFuZCBpZiBhIHZhbHVlIGlzIHNwZWNpZmllZCwgYWxzbyBzZXRzIHRoZSBhc3NvY2lhdGVkXG4gICAqIGNvbnRyb2wgdG8gdGhhdCB2YWx1ZS4gSXQgd2lsbCBhbHNvIG1hcmsgdGhlIGNvbnRyb2wgYXMgZGlydHkgaWYgdGhpcyBpbnRlcmFjdGlvblxuICAgKiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0VmFsdWVBbmRDbG9zZShldmVudDogYW55IHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChldmVudCAmJiBldmVudC5kYXRlKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UoZXZlbnQuZGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHVibGljIGNsZWFyVmFsdWUoKSB7XG4gICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9ICcnO1xuICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShudWxsKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JtYXREYXRlVmFsdWUodmFsdWUpIHtcbiAgICBjb25zdCBvcmlnaW5hbFZhbHVlID0gdmFsdWU7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudXNlckRlZmluZWRGb3JtYXQgJiYgZGF0ZUZucy5pc1ZhbGlkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZGF0ZUZucy5mb3JtYXQodmFsdWUsIHRoaXMuZm9ybWF0KTtcbiAgICAgIH1cbiAgICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoIShpc05hTih2YWx1ZS52YWx1ZU9mKCkpICYmIHRoaXMuYWxsb3dJbnZhbGlkRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHZhbHVlLCB7XG4gICAgICAgICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICAgICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBoYXNWYWx1ZSgpIHtcbiAgICByZXR1cm4gIUhlbHBlcnMuaXNFbXB0eSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19