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
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */ || event.key === "Tab" /* Tab */) && this.panelOpen) {
            this._handleValueUpdate(event.target.value, true);
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleInput(event) {
        if (document.activeElement === event.target) {
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
NovoDatePickerInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", maskOptions: "maskOptions", format: "format", textMaskEnabled: "textMaskEnabled", allowInvalidDate: "allowInvalidDate", disabled: "disabled", disabledDateMessage: "disabledDateMessage", weekStart: "weekStart" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", changeEvent: "changeEvent" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlcklucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0ZS1waWNrZXIvRGF0ZVBpY2tlcklucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE1BQU07QUFDTixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBTyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7OztBQUU3RCxzREFBc0Q7QUFDdEQsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQTBCLENBQUM7SUFDekQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBcUNGLE1BQU0sT0FBTywwQkFBMEI7SUF1RXJDLFlBQ1MsT0FBbUIsRUFDbkIsTUFBd0IsRUFDdkIsa0JBQXFDLEVBQ3RDLGlCQUFvQztRQUhwQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3ZCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDdEMsc0JBQWlCLEdB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LFFBQVE7UUFDakIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O3dIQS9TVSwwQkFBMEI7NEdBQTFCLDBCQUEwQiw2ZUFqQzFCLENBQUMsbUJBQW1CLENBQUMsbUVBcUdyQiw0QkFBNEIscUVBcEc3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7NEZBR1UsMEJBQTBCO2tCQW5DdEMsU0FBUzsrQkFDRSx3QkFBd0IsYUFDdkIsQ0FBQyxtQkFBbUIsQ0FBQyxZQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7Z01BcUJELElBQUk7c0JBREgsS0FBSztnQkFNTixLQUFLO3NCQURKLEtBQUs7Z0JBTU4sR0FBRztzQkFERixLQUFLO2dCQU1OLFdBQVc7c0JBRFYsS0FBSztnQkFNTixXQUFXO3NCQURWLEtBQUs7Z0JBTU4sTUFBTTtzQkFETCxLQUFLO2dCQUdOLGVBQWU7c0JBRGQsS0FBSztnQkFHTixnQkFBZ0I7c0JBRGYsS0FBSztnQkFPTixRQUFRO3NCQUZQLFdBQVc7dUJBQUMsZ0JBQWdCOztzQkFDNUIsS0FBSztnQkFHTixtQkFBbUI7c0JBRGxCLEtBQUs7Z0JBTU4sU0FBUztzQkFEUixLQUFLO2dCQUdOLFNBQVM7c0JBRFIsTUFBTTtnQkFHUCxVQUFVO3NCQURULE1BQU07Z0JBR1AsV0FBVztzQkFEVixNQUFNO2dCQUlQLE9BQU87c0JBRE4sU0FBUzt1QkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gJ2RhdGUtZm5zJztcbi8vIEFwcFxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IERhdGVGb3JtYXRTZXJ2aWNlLCBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBEYXRlVXRpbCwgSGVscGVycywgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgREFURV9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtcGlja2VyLWlucHV0JyxcbiAgcHJvdmlkZXJzOiBbREFURV9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBbbmFtZV09XCJuYW1lXCJcbiAgICAgIFsobmdNb2RlbCldPVwiZm9ybWF0dGVkVmFsdWVcIlxuICAgICAgW2ltYXNrXT1cIm1hc2tPcHRpb25zXCJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAoZm9jdXMpPVwiX2hhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiXG4gICAgICAoaW5wdXQpPVwiX2hhbmRsZUlucHV0KCRldmVudClcIlxuICAgICAgKGJsdXIpPVwiX2hhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAjaW5wdXRcbiAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImRhdGUtaW5wdXRcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAvPlxuICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItdGV4dFwiICpuZ0lmPVwic2hvd0ludmFsaWREYXRlRXJyb3JcIj57eyBpbnZhbGlkRGF0ZUVycm9yTWVzc2FnZSB9fTwvc3Bhbj5cbiAgICA8aSAqbmdJZj1cIiFoYXNWYWx1ZVwiIChjbGljayk9XCJvcGVuUGFuZWwoKVwiIGNsYXNzPVwiYmhpLWNhbGVuZGFyXCI+PC9pPlxuICAgIDxpICpuZ0lmPVwiaGFzVmFsdWVcIiAoY2xpY2spPVwiY2xlYXJWYWx1ZSgpXCIgY2xhc3M9XCJiaGktdGltZXNcIj48L2k+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cImVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCI+XG4gICAgICA8bm92by1kYXRlLXBpY2tlclxuICAgICAgICBbc3RhcnRdPVwic3RhcnRcIlxuICAgICAgICBbZW5kXT1cImVuZFwiXG4gICAgICAgIGlubGluZT1cInRydWVcIlxuICAgICAgICAob25TZWxlY3QpPVwic2V0VmFsdWVBbmRDbG9zZSgkZXZlbnQpXCJcbiAgICAgICAgW2Rpc2FibGVkRGF0ZU1lc3NhZ2VdPVwiZGlzYWJsZWREYXRlTWVzc2FnZVwiXG4gICAgICAgIFtuZ01vZGVsXT1cInZhbHVlXCJcbiAgICAgICAgW3dlZWtTdGFydF09XCJ3ZWVrU3RhcnRcIlxuICAgICAgPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vRGF0ZVBpY2tlcklucHV0LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwdWJsaWMgdmFsdWU6IGFueTtcbiAgcHVibGljIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHNob3dJbnZhbGlkRGF0ZUVycm9yOiBib29sZWFuO1xuICBwdWJsaWMgaW52YWxpZERhdGVFcnJvck1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIHVzZXJEZWZpbmVkRm9ybWF0OiBib29sZWFuO1xuICBwcml2YXRlIGlzSW52YWxpZERhdGU6IGJvb2xlYW47XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlcyAqL1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gYXV0b2NvbXBsZXRlIGhhcyBiZWVuIHRvdWNoZWQgKi9cbiAgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCwgZ2V0IHBhc3NlZCB0byB0aGUgbmF0aXZlIGBpbnB1dGAgZWxlbWVudFxuICAgKiovXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWQuXG4gICAqKi9cbiAgQElucHV0KClcbiAgc3RhcnQ6IERhdGU7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGVuZDogRGF0ZTtcbiAgLyoqXG4gICAqIFBsYWNlaG9sZGVyIHRleHQgdG8gZGlzcGxheSBpbiB0aGUgaW5wdXQgd2hlbiBpdCBpcyBlbXB0eS5cbiAgICoqL1xuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAvKipcbiAgICogTWFza09wdGlvbnMgdG8gcGFzcyB0byB0aGUgYW5ndWxhci1pbWFzayBwbHVnaW5cbiAgICoqL1xuICBASW5wdXQoKVxuICBtYXNrT3B0aW9uczogYW55O1xuICAvKipcbiAgICogVGhlIGZvcm1hdCB0byB1c2UgdG8gcGFyc2UgYW5kIHJlbmRlciBkYXRlczogREQvTU0vWVlZWSBvciBNTS9ERC9ZWVlZXG4gICAqKi9cbiAgQElucHV0KClcbiAgZm9ybWF0OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHRleHRNYXNrRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIGFsbG93SW52YWxpZERhdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIFNldHMgdGhlIGZpZWxkIGFzIHRvIGFwcGVhciBkaXNhYmxlZCwgdXNlcnMgd2lsbCBub3QgYmUgYWJsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSB0ZXh0IGZpZWxkLlxuICAgKiovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBASW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZERhdGVNZXNzYWdlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBEYXkgb2YgdGhlIHdlZWsgdGhlIGNhbGVuZGFyIHNob3VsZCBkaXNwbGF5IGZpcnN0LCBTdW5kYXk9MC4uLlNhdHVyZGF5PTZcbiAgICoqL1xuICBASW5wdXQoKVxuICB3ZWVrU3RhcnQ6IERheSA9IDA7XG4gIEBPdXRwdXQoKVxuICBibHVyRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIGZvY3VzRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIGNoYW5nZUV2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgZGF0ZUZvcm1hdFNlcnZpY2U6IERhdGVGb3JtYXRTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5sYWJlbHMubG9jYWxpemVkRGF0ZVBsYWNlaG9sZGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9pbml0Rm9ybWF0T3B0aW9ucygpO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSgoa2V5KSA9PiBbJ2Zvcm1hdCddLmluY2x1ZGVzKGtleSkpKSB7XG4gICAgICB0aGlzLl9pbml0Rm9ybWF0T3B0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkucGFuZWxDbG9zaW5nQWN0aW9ucy5zdWJzY3JpYmUodGhpcy5faGFuZGxlT3ZlcmxheUNsaWNrb3V0LmJpbmQodGhpcykpO1xuICB9XG5cbiAgX2luaXRGb3JtYXRPcHRpb25zKCkge1xuICAgIHRoaXMudXNlckRlZmluZWRGb3JtYXQgPSB0aGlzLmZvcm1hdCA/ICF0aGlzLmZvcm1hdC5tYXRjaCgvXihERFxcL01NXFwvWVlZWXxNTVxcL0REXFwvWVlZWSkkL2cpIDogZmFsc2U7XG4gICAgaWYgKCF0aGlzLnVzZXJEZWZpbmVkRm9ybWF0ICYmIHRoaXMudGV4dE1hc2tFbmFibGVkICYmICF0aGlzLmFsbG93SW52YWxpZERhdGUpIHtcbiAgICAgIHRoaXMubWFza09wdGlvbnMgPSB0aGlzLm1hc2tPcHRpb25zIHx8IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UuZ2V0RGF0ZU1hc2sodGhpcy5mb3JtYXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hc2tPcHRpb25zID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLnNldHVwSW52YWxpZERhdGVFcnJvck1lc3NhZ2UoKTtcbiAgfVxuXG4gIC8qKiBCRUdJTjogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLm92ZXJsYXkub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG4gIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5LmNsb3NlUGFuZWwoKTtcbiAgfVxuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXk/LnBhbmVsT3BlbjtcbiAgfVxuICAvKiogRU5EOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoKGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSB8fCBldmVudC5rZXkgPT09IEtleS5FbnRlciB8fCBldmVudC5rZXkgPT09IEtleS5UYWIpICYmIHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLl9oYW5kbGVWYWx1ZVVwZGF0ZSgoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLCB0cnVlKTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUlucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgdGhpcy5faGFuZGxlVmFsdWVVcGRhdGUoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVCbHVyKGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXkuaXNCbHVyUmVjaXBpZW50KGV2ZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVJbnZhbGlkRGF0ZSgpO1xuICAgICAgdGhpcy5ibHVyRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZU92ZXJsYXlDbGlja291dCgpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZUludmFsaWREYXRlKC8qZnJvbVBhbmVsQ2xvc2U6Ki90cnVlKTtcbiAgICB0aGlzLmJsdXJFdmVudC5lbWl0KCk7XG4gIH1cblxuICBfaGFuZGxlRm9jdXMoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dJbnZhbGlkRGF0ZUVycm9yID0gZmFsc2U7XG4gICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB0aGlzLmZvY3VzRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBfaGFuZGxlVmFsdWVVcGRhdGUodmFsdWU6IHN0cmluZywgYmx1cjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybWF0RGF0ZSh2YWx1ZSwgYmx1cik7XG4gICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBmb3JtYXREYXRlKHZhbHVlOiBzdHJpbmcsIGJsdXI6IGJvb2xlYW4pIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGVUaW1lVmFsdWU6IERhdGU7XG4gICAgICBsZXQgaXNJbnZhbGlkRGF0ZTogYm9vbGVhbjtcbiAgICAgIGlmICh0aGlzLmZvcm1hdCkge1xuICAgICAgICBbZGF0ZVRpbWVWYWx1ZSwgLCBpc0ludmFsaWREYXRlXSA9IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UucGFyc2VDdXN0b21EYXRlU3RyaW5nKHZhbHVlLCB0aGlzLmZvcm1hdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbZGF0ZVRpbWVWYWx1ZSwgLCBpc0ludmFsaWREYXRlXSA9IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UucGFyc2VTdHJpbmcodmFsdWUsIGZhbHNlLCAnZGF0ZScpO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0ludmFsaWREYXRlID0gaXNJbnZhbGlkRGF0ZTtcbiAgICAgIC8vIGlmIHdlIGhhdmUgYSBmdWxsIGRhdGUgLSBzZXQgdGhlIGRhdGVUaW1lVmFsdWVcbiAgICAgIGlmIChkYXRlVGltZVZhbHVlPy5nZXRGdWxsWWVhcigpPy50b1N0cmluZygpLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKGRhdGVUaW1lVmFsdWUpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UoZHQsIGJsdXIpO1xuICAgICAgLy8gaWYgd2Ugb25seSBoYXZlIGEgcGFydGlhbCBkYXRlIC0gc2V0IHRoZSB2YWx1ZSB0byBudWxsXG4gICAgICB9IGVsc2UgaWYgKGlzTmFOKGRhdGVUaW1lVmFsdWU/LmdldFVUQ0RhdGUoKSkpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKG51bGwsIGJsdXIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge31cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMuX3NldFRyaWdnZXJWYWx1ZSh2YWx1ZSkpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSkge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIGhhbmRsZUludmFsaWREYXRlKGZyb21QYW5lbENsb3NlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0ludmFsaWREYXRlKSB7IC8vfSAmJiB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnNob3dJbnZhbGlkRGF0ZUVycm9yID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xuICAgICAgaWYgKCFmcm9tUGFuZWxDbG9zZSkge1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXR1cEludmFsaWREYXRlRXJyb3JNZXNzYWdlKCk6IHZvaWQge1xuICAgIGxldCBkYXRlRm9ybWF0OiBzdHJpbmcgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0U3RyaW5nKCk7XG4gICAgaWYgKEhlbHBlcnMuaXNFbXB0eShkYXRlRm9ybWF0KSkge1xuICAgICAgLy8gRGVmYXVsdCB0byBtbS9kZC95eXl5XG4gICAgICBkYXRlRm9ybWF0ID0gJ21tL2RkL3l5eXknO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICB0aGlzLmludmFsaWREYXRlRXJyb3JNZXNzYWdlID0gYEludmFsaWQgZGF0ZSBmaWVsZCBlbnRlcmVkLiBEYXRlIGZvcm1hdCBvZiAke2RhdGVGb3JtYXR9IGlzIHJlcXVpcmVkLmA7XG4gIH1cblxuICBwdWJsaWMgZGlzcGF0Y2hPbkNoYW5nZShuZXdWYWx1ZT86IGFueSwgYmx1cjogYm9vbGVhbiA9IGZhbHNlLCBza2lwOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZW1pdChuZXdWYWx1ZSk7XG4gICAgICBpZiAoYmx1cikge1xuICAgICAgICAhc2tpcCAmJiB0aGlzLndyaXRlVmFsdWUobmV3VmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIXNraXAgJiYgdGhpcy5fc2V0Q2FsZW5kYXJWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VHJpZ2dlclZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRDYWxlbmRhclZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLl9zZXRGb3JtVmFsdWUodmFsdWUpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2FsZW5kYXJWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiB0aGlzLnZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgbGV0IG5ld0RhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICBuZXdEYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgdGhpcy52YWx1ZSA9IG5ld0RhdGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEZvcm1WYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCB0ZXN0ID0gdGhpcy5mb3JtYXREYXRlVmFsdWUodmFsdWUpO1xuICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IHRlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcbiAgICogY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eSBpZiB0aGlzIGludGVyYWN0aW9uXG4gICAqIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBhbnkgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50Py5kYXRlKSB7XG4gICAgICB0aGlzLnNob3dJbnZhbGlkRGF0ZUVycm9yID0gZmFsc2U7XG4gICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UoZXZlbnQuZGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHVibGljIGNsZWFyVmFsdWUoKSB7XG4gICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9ICcnO1xuICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShudWxsKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JtYXREYXRlVmFsdWUodmFsdWUpIHtcbiAgICBjb25zdCBvcmlnaW5hbFZhbHVlID0gdmFsdWU7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudXNlckRlZmluZWRGb3JtYXQgJiYgaXNWYWxpZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIERhdGVVdGlsLmZvcm1hdCh2YWx1ZSwgdGhpcy5mb3JtYXQpO1xuICAgICAgfVxuICAgICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICghKGlzTmFOKHZhbHVlLnZhbHVlT2YoKSkgJiYgdGhpcy5hbGxvd0ludmFsaWREYXRlKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodmFsdWUsIHtcbiAgICAgICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBlcnI7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBoYXNWYWx1ZSgpIHtcbiAgICByZXR1cm4gIUhlbHBlcnMuaXNFbXB0eSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19