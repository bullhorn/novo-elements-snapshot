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
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/common";
import * as i5 from "angular-imask";
import * as i6 from "./DatePicker";
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
            this.maskOptions = this.maskOptions || this.dateFormatService.getDateMask();
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
        if ((event.key === "Escape" /* Key.Escape */ || event.key === "Enter" /* Key.Enter */ || event.key === "Tab" /* Key.Tab */) && this.panelOpen) {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoDatePickerInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i1.DateFormatService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", maskOptions: "maskOptions", format: "format", textMaskEnabled: "textMaskEnabled", allowInvalidDate: "allowInvalidDate", overlayOnElement: "overlayOnElement", disabled: "disabled", disabledDateMessage: "disabledDateMessage", weekStart: "weekStart" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", changeEvent: "changeEvent" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{flex:1;position:relative;display:block!important}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:1px solid #dbdbdb;background:transparent!important;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#3d464d}:host input:focus{border-bottom:1px solid #4a89dc}:host span.error-text{color:#da4453;padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:0;top:0;font-size:1.2rem}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { kind: "directive", type: i5.IMaskDirective, selector: "[imask]", inputs: ["imask", "unmask", "imaskElement"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { kind: "component", type: i6.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoDatePickerInputElement, decorators: [{
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
  `, styles: [":host{flex:1;position:relative;display:block!important}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:1px solid #dbdbdb;background:transparent!important;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#3d464d}:host input:focus{border-bottom:1px solid #4a89dc}:host span.error-text{color:#da4453;padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:0;top:0;font-size:1.2rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlcklucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0ZS1waWNrZXIvRGF0ZVBpY2tlcklucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE1BQU07QUFDTixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBTyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7OztBQUU3RCxzREFBc0Q7QUFDdEQsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQTBCLENBQUM7SUFDekQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBc0NGLE1BQU0sT0FBTywwQkFBMEI7SUFzRnJDLFlBQ1MsT0FBbUIsRUFDbkIsTUFBd0IsRUFDdkIsa0JBQXFDLEVBQ3RDLGlCQUFvQztRQUhwQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3ZCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDdEMsc0JBQWlCLEdB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QkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gJ2RhdGUtZm5zJztcbi8vIEFwcFxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IERhdGVGb3JtYXRTZXJ2aWNlLCBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBEYXRlVXRpbCwgSGVscGVycywgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgREFURV9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtcGlja2VyLWlucHV0JyxcbiAgcHJvdmlkZXJzOiBbREFURV9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBbbmFtZV09XCJuYW1lXCJcbiAgICAgIFsobmdNb2RlbCldPVwiZm9ybWF0dGVkVmFsdWVcIlxuICAgICAgW2ltYXNrXT1cIm1hc2tPcHRpb25zXCJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAoZm9jdXMpPVwiX2hhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiXG4gICAgICAoaW5wdXQpPVwiX2hhbmRsZUlucHV0KCRldmVudClcIlxuICAgICAgKGJsdXIpPVwiX2hhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAoYWNjZXB0KT1cImhhbmRsZU1hc2tBY2NlcHQoJGV2ZW50KVwiXG4gICAgICAjaW5wdXRcbiAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImRhdGUtaW5wdXRcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAvPlxuICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItdGV4dFwiICpuZ0lmPVwic2hvd0ludmFsaWREYXRlRXJyb3JcIj57eyBpbnZhbGlkRGF0ZUVycm9yTWVzc2FnZSB9fTwvc3Bhbj5cbiAgICA8aSAqbmdJZj1cIiFoYXNWYWx1ZVwiIChjbGljayk9XCJvcGVuUGFuZWwoKVwiIGNsYXNzPVwiYmhpLWNhbGVuZGFyXCI+PC9pPlxuICAgIDxpICpuZ0lmPVwiaGFzVmFsdWVcIiAoY2xpY2spPVwiY2xlYXJWYWx1ZSgpXCIgY2xhc3M9XCJiaGktdGltZXNcIj48L2k+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cIm92ZXJsYXlFbGVtZW50XCIgcG9zaXRpb249XCJhYm92ZS1iZWxvd1wiPlxuICAgICAgPG5vdm8tZGF0ZS1waWNrZXJcbiAgICAgICAgW3N0YXJ0XT1cInN0YXJ0XCJcbiAgICAgICAgW2VuZF09XCJlbmRcIlxuICAgICAgICBpbmxpbmU9XCJ0cnVlXCJcbiAgICAgICAgKG9uU2VsZWN0KT1cInNldFZhbHVlQW5kQ2xvc2UoJGV2ZW50KVwiXG4gICAgICAgIFtkaXNhYmxlZERhdGVNZXNzYWdlXT1cImRpc2FibGVkRGF0ZU1lc3NhZ2VcIlxuICAgICAgICBbbmdNb2RlbF09XCJ2YWx1ZVwiXG4gICAgICAgIFt3ZWVrU3RhcnRdPVwid2Vla1N0YXJ0XCJcbiAgICAgID48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL0RhdGVQaWNrZXJJbnB1dC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHVibGljIHZhbHVlOiBhbnk7XG4gIHB1YmxpYyBmb3JtYXR0ZWRWYWx1ZTogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBzaG93SW52YWxpZERhdGVFcnJvcjogYm9vbGVhbjtcbiAgcHVibGljIGludmFsaWREYXRlRXJyb3JNZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSB1c2VyRGVmaW5lZEZvcm1hdDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBpc0ludmFsaWREYXRlOiBib29sZWFuO1xuXG4gIC8qKiBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXMgKi9cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIGF1dG9jb21wbGV0ZSBoYXMgYmVlbiB0b3VjaGVkICovXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGZvcm0gZmllbGQsIGdldCBwYXNzZWQgdG8gdGhlIG5hdGl2ZSBgaW5wdXRgIGVsZW1lbnRcbiAgICoqL1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHN0YXJ0OiBEYXRlO1xuICAvKipcbiAgICogVGhlIG1heGltdW0gZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBlbmQ6IERhdGU7XG4gIC8qKlxuICAgKiBQbGFjZWhvbGRlciB0ZXh0IHRvIGRpc3BsYXkgaW4gdGhlIGlucHV0IHdoZW4gaXQgaXMgZW1wdHkuXG4gICAqKi9cbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgLyoqXG4gICAqIE1hc2tPcHRpb25zIHRvIHBhc3MgdG8gdGhlIGFuZ3VsYXItaW1hc2sgcGx1Z2luXG4gICAqKi9cbiAgQElucHV0KClcbiAgbWFza09wdGlvbnM6IGFueTtcbiAgLyoqXG4gICAqIFRoZSBmb3JtYXQgdG8gdXNlIHRvIHBhcnNlIGFuZCByZW5kZXIgZGF0ZXM6IEREL01NL1lZWVkgb3IgTU0vREQvWVlZWVxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGZvcm1hdDogc3RyaW5nO1xuICAvKipcbiAgICogV2hldGhlciB0byBhcHBseSBhIHRleHQgbWFzayB0byB0aGUgZGF0ZSAoc2VlIGBtYXNrT3B0aW9uc2ApLiBPbmx5IGVuYWJsZWQgaWYgYWxsb3dJbnZhbGlkRGF0ZSBpcyBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHRleHRNYXNrRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBpbnB1dCBzaG91bGQgZW1pdCB2YWx1ZXMgd2hlbiB0aGUgZmllbGQgZG9lcyBub3QgeWV0IGNvbnN0aXR1dGUgYSB2YWxpZCBkYXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBhbGxvd0ludmFsaWREYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBUaGUgZWxlbWVudCB0byB1c2UgYXMgdGhlIHBhcmVudCBmb3IgdGhlIGRhdGUgcGlja2VyJ3Mgb3ZlcmxheSAodG8gZGV0ZXJtaW5lIGJvdW5kcyBzaXppbmcpLiBCeSBkZWZhdWx0LFxuICAgKiB0aGlzIHJlZmVycyB0byB0aGUgaW5wdXQgZWxlbWVudCBpdHNlbGYsIGJ1dCBtYXkgYmUgYSBjb250YWluZXIgaWYgaXQgaGFzIGEgcGFkZGVkIGJvcmRlci5cbiAgICovXG4gIEBJbnB1dCgpXG4gIG92ZXJsYXlPbkVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBmaWVsZCBhcyB0byBhcHBlYXIgZGlzYWJsZWQsIHVzZXJzIHdpbGwgbm90IGJlIGFibGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgdGV4dCBmaWVsZC5cbiAgICoqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIEEgbWVzc2FnZSB0byBkaXNwbGF5IGluIHRoZSBwaWNrZXIgb3ZlcmxheSB3aGVuIGEgZ2l2ZW4gZGF0ZSBpcyBkaXNhYmxlZCB0aHJvdWdoIG1pbmltdW0vbWF4aW11bVxuICAgKi9cbiAgQElucHV0KClcbiAgZGlzYWJsZWREYXRlTWVzc2FnZTogc3RyaW5nO1xuICAvKipcbiAgICogRGF5IG9mIHRoZSB3ZWVrIHRoZSBjYWxlbmRhciBzaG91bGQgZGlzcGxheSBmaXJzdCwgU3VuZGF5PTAuLi5TYXR1cmRheT02XG4gICAqKi9cbiAgQElucHV0KClcbiAgd2Vla1N0YXJ0OiBEYXkgPSAwO1xuICBAT3V0cHV0KClcbiAgYmx1ckV2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1c0V2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICBjaGFuZ2VFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXG4gIG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGRhdGVGb3JtYXRTZXJ2aWNlOiBEYXRlRm9ybWF0U2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMubGFiZWxzLmxvY2FsaXplZERhdGVQbGFjZWhvbGRlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5faW5pdEZvcm1hdE9wdGlvbnMoKTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGtleSkgPT4gWydmb3JtYXQnXS5pbmNsdWRlcyhrZXkpKSkge1xuICAgICAgdGhpcy5faW5pdEZvcm1hdE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5LnBhbmVsQ2xvc2luZ0FjdGlvbnMuc3Vic2NyaWJlKHRoaXMuX2hhbmRsZU92ZXJsYXlDbGlja291dC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIF9pbml0Rm9ybWF0T3B0aW9ucygpIHtcbiAgICB0aGlzLnVzZXJEZWZpbmVkRm9ybWF0ID0gdGhpcy5mb3JtYXQgPyAhdGhpcy5mb3JtYXQubWF0Y2goL14oRERcXC9NTVxcL1lZWVl8TU1cXC9ERFxcL1lZWVkpJC9nKSA6IGZhbHNlO1xuICAgIGlmICghdGhpcy51c2VyRGVmaW5lZEZvcm1hdCAmJiB0aGlzLnRleHRNYXNrRW5hYmxlZCAmJiAhdGhpcy5hbGxvd0ludmFsaWREYXRlKSB7XG4gICAgICB0aGlzLm1hc2tPcHRpb25zID0gdGhpcy5tYXNrT3B0aW9ucyB8fCB0aGlzLmRhdGVGb3JtYXRTZXJ2aWNlLmdldERhdGVNYXNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWFza09wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuc2V0dXBJbnZhbGlkRGF0ZUVycm9yTWVzc2FnZSgpO1xuICB9XG5cbiAgLyoqIEJFR0lOOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG4gIG9wZW5QYW5lbCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMub3ZlcmxheS5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cbiAgY2xvc2VQYW5lbCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpO1xuICB9XG4gIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheT8ucGFuZWxPcGVuO1xuICB9XG5cbiAgZ2V0IG92ZXJsYXlFbGVtZW50KCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlPbkVsZW1lbnQgfHwgdGhpcy5lbGVtZW50O1xuICB9XG4gIC8qKiBFTkQ6IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICgoZXZlbnQua2V5ID09PSBLZXkuRXNjYXBlIHx8IGV2ZW50LmtleSA9PT0gS2V5LkVudGVyIHx8IGV2ZW50LmtleSA9PT0gS2V5LlRhYikgJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuX2hhbmRsZVZhbHVlVXBkYXRlKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUsIHRydWUpO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBpZiBtYXNrT3B0aW9ucyBpcyBlbmFibGVkLCB0aGVuIHdlIGRvIG5vdCB3YW50IHRvIHByb2Nlc3MgaW5wdXRzIHVudGlsIHRoZSBtYXNrIGhhcyBhY2NlcHRlZCB0aGVtIC0gc28gdGhvc2UgZXZlbnRzIHdpbGwgYmVcbiAgICAvLyBoYW5kbGVkIGJ5IHRoZSAoYWNjZXB0KSBldmVudC5cbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0ICYmICF0aGlzLm1hc2tPcHRpb25zKSB7XG4gICAgICB0aGlzLl9oYW5kbGVWYWx1ZVVwZGF0ZSgoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3ZlcmxheS5pc0JsdXJSZWNpcGllbnQoZXZlbnQpKSB7XG4gICAgICB0aGlzLmhhbmRsZUludmFsaWREYXRlKCk7XG4gICAgICB0aGlzLmJsdXJFdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlT3ZlcmxheUNsaWNrb3V0KCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlSW52YWxpZERhdGUoLypmcm9tUGFuZWxDbG9zZToqL3RydWUpO1xuICAgIHRoaXMuYmx1ckV2ZW50LmVtaXQoKTtcbiAgfVxuXG4gIF9oYW5kbGVGb2N1cyhldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0ludmFsaWREYXRlRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIHRoaXMuZm9jdXNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9oYW5kbGVWYWx1ZVVwZGF0ZSh2YWx1ZTogc3RyaW5nLCBibHVyOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgdGhpcy5jbGVhclZhbHVlKCk7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtYXREYXRlKHZhbHVlLCBibHVyKTtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWFza0FjY2VwdChtYXNrVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2hhbmRsZVZhbHVlVXBkYXRlKG1hc2tWYWx1ZSwgZmFsc2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGZvcm1hdERhdGUodmFsdWU6IHN0cmluZywgYmx1cjogYm9vbGVhbikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGF0ZVRpbWVWYWx1ZTogRGF0ZTtcbiAgICAgIGxldCBpc0ludmFsaWREYXRlOiBib29sZWFuO1xuICAgICAgaWYgKHRoaXMuZm9ybWF0KSB7XG4gICAgICAgIFtkYXRlVGltZVZhbHVlLCAsIGlzSW52YWxpZERhdGVdID0gdGhpcy5kYXRlRm9ybWF0U2VydmljZS5wYXJzZUN1c3RvbURhdGVTdHJpbmcodmFsdWUsIHRoaXMuZm9ybWF0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtkYXRlVGltZVZhbHVlLCAsIGlzSW52YWxpZERhdGVdID0gdGhpcy5kYXRlRm9ybWF0U2VydmljZS5wYXJzZVN0cmluZyh2YWx1ZSwgZmFsc2UsICdkYXRlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmlzSW52YWxpZERhdGUgPSBpc0ludmFsaWREYXRlO1xuICAgICAgLy8gaWYgd2UgaGF2ZSBhIGZ1bGwgZGF0ZSAtIHNldCB0aGUgZGF0ZVRpbWVWYWx1ZVxuICAgICAgaWYgKGRhdGVUaW1lVmFsdWU/LmdldEZ1bGxZZWFyKCk/LnRvU3RyaW5nKCkubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoZGF0ZVRpbWVWYWx1ZSk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShkdCwgYmx1cik7XG4gICAgICAvLyBpZiB3ZSBvbmx5IGhhdmUgYSBwYXJ0aWFsIGRhdGUgLSBzZXQgdGhlIHZhbHVlIHRvIG51bGxcbiAgICAgIH0gZWxzZSBpZiAoaXNOYU4oZGF0ZVRpbWVWYWx1ZT8uZ2V0VVRDRGF0ZSgpKSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UobnVsbCwgYmx1cik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5fc2V0VHJpZ2dlclZhbHVlKHZhbHVlKSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG5cbiAgaGFuZGxlSW52YWxpZERhdGUoZnJvbVBhbmVsQ2xvc2UgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW52YWxpZERhdGUpIHsgLy99ICYmIHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuc2hvd0ludmFsaWREYXRlRXJyb3IgPSB0cnVlO1xuICAgICAgdGhpcy5jbGVhclZhbHVlKCk7XG4gICAgICBpZiAoIWZyb21QYW5lbENsb3NlKSB7XG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldHVwSW52YWxpZERhdGVFcnJvck1lc3NhZ2UoKTogdm9pZCB7XG4gICAgbGV0IGRhdGVGb3JtYXQ6IHN0cmluZyA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXRTdHJpbmcoKTtcbiAgICBpZiAoSGVscGVycy5pc0VtcHR5KGRhdGVGb3JtYXQpKSB7XG4gICAgICAvLyBEZWZhdWx0IHRvIG1tL2RkL3l5eXlcbiAgICAgIGRhdGVGb3JtYXQgPSAnbW0vZGQveXl5eSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0LnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIHRoaXMuaW52YWxpZERhdGVFcnJvck1lc3NhZ2UgPSBgSW52YWxpZCBkYXRlIGZpZWxkIGVudGVyZWQuIERhdGUgZm9ybWF0IG9mICR7ZGF0ZUZvcm1hdH0gaXMgcmVxdWlyZWQuYDtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwYXRjaE9uQ2hhbmdlKG5ld1ZhbHVlPzogYW55LCBibHVyOiBib29sZWFuID0gZmFsc2UsIHNraXA6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5fb25DaGFuZ2UobmV3VmFsdWUpO1xuICAgICAgdGhpcy5jaGFuZ2VFdmVudC5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgIGlmIChibHVyKSB7XG4gICAgICAgICFza2lwICYmIHRoaXMud3JpdGVWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAhc2tpcCAmJiB0aGlzLl9zZXRDYWxlbmRhclZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRUcmlnZ2VyVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NldENhbGVuZGFyVmFsdWUodmFsdWUpO1xuICAgIHRoaXMuX3NldEZvcm1WYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDYWxlbmRhclZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlICYmIHRoaXMudmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICBsZXQgbmV3RGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgIG5ld0RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICB0aGlzLnZhbHVlID0gbmV3RGF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Rm9ybVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGNvbnN0IHRlc3QgPSB0aGlzLmZvcm1hdERhdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gdGVzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZFxuICAgKiBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5IGlmIHRoaXMgaW50ZXJhY3Rpb25cbiAgICogc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgKi9cbiAgcHVibGljIHNldFZhbHVlQW5kQ2xvc2UoZXZlbnQ6IGFueSB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQ/LmRhdGUpIHtcbiAgICAgIHRoaXMuc2hvd0ludmFsaWREYXRlRXJyb3IgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShldmVudC5kYXRlLCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcbiAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gJyc7XG4gICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKG51bGwpO1xuICB9XG5cbiAgcHVibGljIGZvcm1hdERhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcbiAgICB0cnkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy51c2VyRGVmaW5lZEZvcm1hdCAmJiBpc1ZhbGlkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gRGF0ZVV0aWwuZm9ybWF0KHZhbHVlLCB0aGlzLmZvcm1hdCk7XG4gICAgICB9XG4gICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKCEoaXNOYU4odmFsdWUudmFsdWVPZigpKSAmJiB0aGlzLmFsbG93SW52YWxpZERhdGUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh2YWx1ZSwge1xuICAgICAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGVycjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhhc1ZhbHVlKCkge1xuICAgIHJldHVybiAhSGVscGVycy5pc0VtcHR5KHRoaXMudmFsdWUpO1xuICB9XG59XG4iXX0=