var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// NG
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { isValid } from 'date-fns';
// App
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { BooleanInput, DateUtil, Helpers } from 'novo-elements/utils';
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
         * Whether the footer in the date picker which contains `today` button should be hidden.
         **/
        this.hideFooter = false;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDatePickerInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i1.DateFormatService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", maskOptions: "maskOptions", format: "format", textMaskEnabled: "textMaskEnabled", allowInvalidDate: "allowInvalidDate", overlayOnElement: "overlayOnElement", hideFooter: "hideFooter", disabled: "disabled", disabledDateMessage: "disabledDateMessage", weekStart: "weekStart" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", changeEvent: "changeEvent" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
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
        [hideFooter]="hideFooter"
      ></novo-date-picker>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{flex:1;position:relative;display:block!important}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:1px solid #dbdbdb;background:transparent!important;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#3d464d}:host input:focus{border-bottom:1px solid #4a89dc}:host span.error-text{color:#da4453;padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:0;top:0;font-size:1.2rem}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "minWidth", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing", "backDropClicked"] }, { kind: "directive", type: i5.IMaskDirective, selector: "[imask]", inputs: ["imask", "unmask", "imaskElement"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { kind: "component", type: i6.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }] }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDatePickerInputElement.prototype, "hideFooter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDatePickerInputElement, decorators: [{
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
        [hideFooter]="hideFooter"
      ></novo-date-picker>
    </novo-overlay-template>
  `, styles: [":host{flex:1;position:relative;display:block!important}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:1px solid #dbdbdb;background:transparent!important;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#3d464d}:host input:focus{border-bottom:1px solid #4a89dc}:host span.error-text{color:#da4453;padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:0;top:0;font-size:1.2rem}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i1.DateFormatService }], propDecorators: { name: [{
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
            }], hideFooter: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlcklucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0ZS1waWNrZXIvRGF0ZVBpY2tlcklucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLEtBQUs7QUFDTCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE1BQU07QUFDTixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQU8sTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7QUFFM0Usc0RBQXNEO0FBQ3RELE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixDQUFDO0lBQ3pELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQXVDRixNQUFNLE9BQU8sMEJBQTBCO0lBNEZyQyxZQUNTLE9BQW1CLEVBQ25CLE1BQXdCLEVBQ3ZCLGtCQUFxQyxFQUN0QyxpQkFBb0M7UUFIcEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN2Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JUOzhLQXFCRCxJQUFJO3NCQURILEtBQUs7Z0JBTU4sS0FBSztzQkFESixLQUFLO2dCQU1OLEdBQUc7c0JBREYsS0FBSztnQkFNTixXQUFXO3NCQURWLEtBQUs7Z0JBTU4sV0FBVztzQkFEVixLQUFLO2dCQU1OLE1BQU07c0JBREwsS0FBSztnQkFNTixlQUFlO3NCQURkLEtBQUs7Z0JBTU4sZ0JBQWdCO3NCQURmLEtBQUs7Z0JBT04sZ0JBQWdCO3NCQURmLEtBQUs7Z0JBT0MsVUFBVTtzQkFGaEIsS0FBSztnQkFRTixRQUFRO3NCQUZQLFdBQVc7dUJBQUMsZ0JBQWdCOztzQkFDNUIsS0FBSztnQkFNTixtQkFBbUI7c0JBRGxCLEtBQUs7Z0JBTU4sU0FBUztzQkFEUixLQUFLO2dCQUdOLFNBQVM7c0JBRFIsTUFBTTtnQkFHUCxVQUFVO3NCQURULE1BQU07Z0JBR1AsV0FBVztzQkFEVixNQUFNO2dCQUlQLE9BQU87c0JBRE4sU0FBUzt1QkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gJ2RhdGUtZm5zJztcbi8vIEFwcFxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IERhdGVGb3JtYXRTZXJ2aWNlLCBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIERhdGVVdGlsLCBIZWxwZXJzLCBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBEQVRFX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0ZS1waWNrZXItaW5wdXQnLFxuICBwcm92aWRlcnM6IFtEQVRFX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgWyhuZ01vZGVsKV09XCJmb3JtYXR0ZWRWYWx1ZVwiXG4gICAgICBbaW1hc2tdPVwibWFza09wdGlvbnNcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIChmb2N1cyk9XCJfaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bik9XCJfaGFuZGxlS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgIChpbnB1dCk9XCJfaGFuZGxlSW5wdXQoJGV2ZW50KVwiXG4gICAgICAoYmx1cik9XCJfaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgIChhY2NlcHQpPVwiaGFuZGxlTWFza0FjY2VwdCgkZXZlbnQpXCJcbiAgICAgICNpbnB1dFxuICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZGF0ZS1pbnB1dFwiXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJlcnJvci10ZXh0XCIgKm5nSWY9XCJzaG93SW52YWxpZERhdGVFcnJvclwiPnt7IGludmFsaWREYXRlRXJyb3JNZXNzYWdlIH19PC9zcGFuPlxuICAgIDxpICpuZ0lmPVwiIWhhc1ZhbHVlXCIgKGNsaWNrKT1cIm9wZW5QYW5lbCgpXCIgY2xhc3M9XCJiaGktY2FsZW5kYXJcIj48L2k+XG4gICAgPGkgKm5nSWY9XCJoYXNWYWx1ZVwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIiBjbGFzcz1cImJoaS10aW1lc1wiPjwvaT5cbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlIFtwYXJlbnRdPVwib3ZlcmxheUVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCI+XG4gICAgICA8bm92by1kYXRlLXBpY2tlclxuICAgICAgICBbc3RhcnRdPVwic3RhcnRcIlxuICAgICAgICBbZW5kXT1cImVuZFwiXG4gICAgICAgIGlubGluZT1cInRydWVcIlxuICAgICAgICAob25TZWxlY3QpPVwic2V0VmFsdWVBbmRDbG9zZSgkZXZlbnQpXCJcbiAgICAgICAgW2Rpc2FibGVkRGF0ZU1lc3NhZ2VdPVwiZGlzYWJsZWREYXRlTWVzc2FnZVwiXG4gICAgICAgIFtuZ01vZGVsXT1cInZhbHVlXCJcbiAgICAgICAgW3dlZWtTdGFydF09XCJ3ZWVrU3RhcnRcIlxuICAgICAgICBbaGlkZUZvb3Rlcl09XCJoaWRlRm9vdGVyXCJcbiAgICAgID48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL0RhdGVQaWNrZXJJbnB1dC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHVibGljIHZhbHVlOiBhbnk7XG4gIHB1YmxpYyBmb3JtYXR0ZWRWYWx1ZTogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBzaG93SW52YWxpZERhdGVFcnJvcjogYm9vbGVhbjtcbiAgcHVibGljIGludmFsaWREYXRlRXJyb3JNZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSB1c2VyRGVmaW5lZEZvcm1hdDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBpc0ludmFsaWREYXRlOiBib29sZWFuO1xuXG4gIC8qKiBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXMgKi9cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIGF1dG9jb21wbGV0ZSBoYXMgYmVlbiB0b3VjaGVkICovXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGZvcm0gZmllbGQsIGdldCBwYXNzZWQgdG8gdGhlIG5hdGl2ZSBgaW5wdXRgIGVsZW1lbnRcbiAgICoqL1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHN0YXJ0OiBEYXRlO1xuICAvKipcbiAgICogVGhlIG1heGltdW0gZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBlbmQ6IERhdGU7XG4gIC8qKlxuICAgKiBQbGFjZWhvbGRlciB0ZXh0IHRvIGRpc3BsYXkgaW4gdGhlIGlucHV0IHdoZW4gaXQgaXMgZW1wdHkuXG4gICAqKi9cbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgLyoqXG4gICAqIE1hc2tPcHRpb25zIHRvIHBhc3MgdG8gdGhlIGFuZ3VsYXItaW1hc2sgcGx1Z2luXG4gICAqKi9cbiAgQElucHV0KClcbiAgbWFza09wdGlvbnM6IGFueTtcbiAgLyoqXG4gICAqIFRoZSBmb3JtYXQgdG8gdXNlIHRvIHBhcnNlIGFuZCByZW5kZXIgZGF0ZXM6IEREL01NL1lZWVkgb3IgTU0vREQvWVlZWVxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGZvcm1hdDogc3RyaW5nO1xuICAvKipcbiAgICogV2hldGhlciB0byBhcHBseSBhIHRleHQgbWFzayB0byB0aGUgZGF0ZSAoc2VlIGBtYXNrT3B0aW9uc2ApLiBPbmx5IGVuYWJsZWQgaWYgYWxsb3dJbnZhbGlkRGF0ZSBpcyBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHRleHRNYXNrRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBpbnB1dCBzaG91bGQgZW1pdCB2YWx1ZXMgd2hlbiB0aGUgZmllbGQgZG9lcyBub3QgeWV0IGNvbnN0aXR1dGUgYSB2YWxpZCBkYXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBhbGxvd0ludmFsaWREYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBUaGUgZWxlbWVudCB0byB1c2UgYXMgdGhlIHBhcmVudCBmb3IgdGhlIGRhdGUgcGlja2VyJ3Mgb3ZlcmxheSAodG8gZGV0ZXJtaW5lIGJvdW5kcyBzaXppbmcpLiBCeSBkZWZhdWx0LFxuICAgKiB0aGlzIHJlZmVycyB0byB0aGUgaW5wdXQgZWxlbWVudCBpdHNlbGYsIGJ1dCBtYXkgYmUgYSBjb250YWluZXIgaWYgaXQgaGFzIGEgcGFkZGVkIGJvcmRlci5cbiAgICovXG4gIEBJbnB1dCgpXG4gIG92ZXJsYXlPbkVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBmb290ZXIgaW4gdGhlIGRhdGUgcGlja2VyIHdoaWNoIGNvbnRhaW5zIGB0b2RheWAgYnV0dG9uIHNob3VsZCBiZSBoaWRkZW4uXG4gICAqKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHB1YmxpYyBoaWRlRm9vdGVyOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBmaWVsZCBhcyB0byBhcHBlYXIgZGlzYWJsZWQsIHVzZXJzIHdpbGwgbm90IGJlIGFibGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgdGV4dCBmaWVsZC5cbiAgICoqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIEEgbWVzc2FnZSB0byBkaXNwbGF5IGluIHRoZSBwaWNrZXIgb3ZlcmxheSB3aGVuIGEgZ2l2ZW4gZGF0ZSBpcyBkaXNhYmxlZCB0aHJvdWdoIG1pbmltdW0vbWF4aW11bVxuICAgKi9cbiAgQElucHV0KClcbiAgZGlzYWJsZWREYXRlTWVzc2FnZTogc3RyaW5nO1xuICAvKipcbiAgICogRGF5IG9mIHRoZSB3ZWVrIHRoZSBjYWxlbmRhciBzaG91bGQgZGlzcGxheSBmaXJzdCwgU3VuZGF5PTAuLi5TYXR1cmRheT02XG4gICAqKi9cbiAgQElucHV0KClcbiAgd2Vla1N0YXJ0OiBEYXkgPSAwO1xuICBAT3V0cHV0KClcbiAgYmx1ckV2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1c0V2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKVxuICBjaGFuZ2VFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXG4gIG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGRhdGVGb3JtYXRTZXJ2aWNlOiBEYXRlRm9ybWF0U2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMubGFiZWxzLmxvY2FsaXplZERhdGVQbGFjZWhvbGRlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5faW5pdEZvcm1hdE9wdGlvbnMoKTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGtleSkgPT4gWydmb3JtYXQnXS5pbmNsdWRlcyhrZXkpKSkge1xuICAgICAgdGhpcy5faW5pdEZvcm1hdE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5LnBhbmVsQ2xvc2luZ0FjdGlvbnMuc3Vic2NyaWJlKHRoaXMuX2hhbmRsZU92ZXJsYXlDbGlja291dC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIF9pbml0Rm9ybWF0T3B0aW9ucygpIHtcbiAgICB0aGlzLnVzZXJEZWZpbmVkRm9ybWF0ID0gdGhpcy5mb3JtYXQgPyAhdGhpcy5mb3JtYXQubWF0Y2goL14oRERcXC9NTVxcL1lZWVl8TU1cXC9ERFxcL1lZWVkpJC9nKSA6IGZhbHNlO1xuICAgIGlmICghdGhpcy51c2VyRGVmaW5lZEZvcm1hdCAmJiB0aGlzLnRleHRNYXNrRW5hYmxlZCAmJiAhdGhpcy5hbGxvd0ludmFsaWREYXRlKSB7XG4gICAgICB0aGlzLm1hc2tPcHRpb25zID0gdGhpcy5tYXNrT3B0aW9ucyB8fCB0aGlzLmRhdGVGb3JtYXRTZXJ2aWNlLmdldERhdGVNYXNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWFza09wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuc2V0dXBJbnZhbGlkRGF0ZUVycm9yTWVzc2FnZSgpO1xuICB9XG5cbiAgLyoqIEJFR0lOOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG4gIG9wZW5QYW5lbCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMub3ZlcmxheS5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cbiAgY2xvc2VQYW5lbCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpO1xuICB9XG4gIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheT8ucGFuZWxPcGVuO1xuICB9XG5cbiAgZ2V0IG92ZXJsYXlFbGVtZW50KCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlPbkVsZW1lbnQgfHwgdGhpcy5lbGVtZW50O1xuICB9XG4gIC8qKiBFTkQ6IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICgoZXZlbnQua2V5ID09PSBLZXkuRXNjYXBlIHx8IGV2ZW50LmtleSA9PT0gS2V5LkVudGVyIHx8IGV2ZW50LmtleSA9PT0gS2V5LlRhYikgJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuX2hhbmRsZVZhbHVlVXBkYXRlKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUsIHRydWUpO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBpZiBtYXNrT3B0aW9ucyBpcyBlbmFibGVkLCB0aGVuIHdlIGRvIG5vdCB3YW50IHRvIHByb2Nlc3MgaW5wdXRzIHVudGlsIHRoZSBtYXNrIGhhcyBhY2NlcHRlZCB0aGVtIC0gc28gdGhvc2UgZXZlbnRzIHdpbGwgYmVcbiAgICAvLyBoYW5kbGVkIGJ5IHRoZSAoYWNjZXB0KSBldmVudC5cbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0ICYmICF0aGlzLm1hc2tPcHRpb25zKSB7XG4gICAgICB0aGlzLl9oYW5kbGVWYWx1ZVVwZGF0ZSgoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3ZlcmxheS5pc0JsdXJSZWNpcGllbnQoZXZlbnQpKSB7XG4gICAgICB0aGlzLmhhbmRsZUludmFsaWREYXRlKCk7XG4gICAgICB0aGlzLmJsdXJFdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlT3ZlcmxheUNsaWNrb3V0KCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlSW52YWxpZERhdGUoLypmcm9tUGFuZWxDbG9zZToqL3RydWUpO1xuICAgIHRoaXMuYmx1ckV2ZW50LmVtaXQoKTtcbiAgfVxuXG4gIF9oYW5kbGVGb2N1cyhldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0ludmFsaWREYXRlRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIHRoaXMuZm9jdXNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9oYW5kbGVWYWx1ZVVwZGF0ZSh2YWx1ZTogc3RyaW5nLCBibHVyOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgdGhpcy5jbGVhclZhbHVlKCk7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtYXREYXRlKHZhbHVlLCBibHVyKTtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWFza0FjY2VwdChtYXNrVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2hhbmRsZVZhbHVlVXBkYXRlKG1hc2tWYWx1ZSwgZmFsc2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGZvcm1hdERhdGUodmFsdWU6IHN0cmluZywgYmx1cjogYm9vbGVhbikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGF0ZVRpbWVWYWx1ZTogRGF0ZTtcbiAgICAgIGxldCBpc0ludmFsaWREYXRlOiBib29sZWFuO1xuICAgICAgaWYgKHRoaXMuZm9ybWF0KSB7XG4gICAgICAgIFtkYXRlVGltZVZhbHVlLCAsIGlzSW52YWxpZERhdGVdID0gdGhpcy5kYXRlRm9ybWF0U2VydmljZS5wYXJzZUN1c3RvbURhdGVTdHJpbmcodmFsdWUsIHRoaXMuZm9ybWF0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtkYXRlVGltZVZhbHVlLCAsIGlzSW52YWxpZERhdGVdID0gdGhpcy5kYXRlRm9ybWF0U2VydmljZS5wYXJzZVN0cmluZyh2YWx1ZSwgZmFsc2UsICdkYXRlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmlzSW52YWxpZERhdGUgPSBpc0ludmFsaWREYXRlO1xuICAgICAgLy8gaWYgd2UgaGF2ZSBhIGZ1bGwgZGF0ZSAtIHNldCB0aGUgZGF0ZVRpbWVWYWx1ZVxuICAgICAgaWYgKGRhdGVUaW1lVmFsdWU/LmdldEZ1bGxZZWFyKCk/LnRvU3RyaW5nKCkubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoZGF0ZVRpbWVWYWx1ZSk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShkdCwgYmx1cik7XG4gICAgICAvLyBpZiB3ZSBvbmx5IGhhdmUgYSBwYXJ0aWFsIGRhdGUgLSBzZXQgdGhlIHZhbHVlIHRvIG51bGxcbiAgICAgIH0gZWxzZSBpZiAoaXNOYU4oZGF0ZVRpbWVWYWx1ZT8uZ2V0VVRDRGF0ZSgpKSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UobnVsbCwgYmx1cik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5fc2V0VHJpZ2dlclZhbHVlKHZhbHVlKSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG5cbiAgaGFuZGxlSW52YWxpZERhdGUoZnJvbVBhbmVsQ2xvc2UgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW52YWxpZERhdGUpIHsgLy99ICYmIHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuc2hvd0ludmFsaWREYXRlRXJyb3IgPSB0cnVlO1xuICAgICAgdGhpcy5jbGVhclZhbHVlKCk7XG4gICAgICBpZiAoIWZyb21QYW5lbENsb3NlKSB7XG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldHVwSW52YWxpZERhdGVFcnJvck1lc3NhZ2UoKTogdm9pZCB7XG4gICAgbGV0IGRhdGVGb3JtYXQ6IHN0cmluZyA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXRTdHJpbmcoKTtcbiAgICBpZiAoSGVscGVycy5pc0VtcHR5KGRhdGVGb3JtYXQpKSB7XG4gICAgICAvLyBEZWZhdWx0IHRvIG1tL2RkL3l5eXlcbiAgICAgIGRhdGVGb3JtYXQgPSAnbW0vZGQveXl5eSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0LnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIHRoaXMuaW52YWxpZERhdGVFcnJvck1lc3NhZ2UgPSBgSW52YWxpZCBkYXRlIGZpZWxkIGVudGVyZWQuIERhdGUgZm9ybWF0IG9mICR7ZGF0ZUZvcm1hdH0gaXMgcmVxdWlyZWQuYDtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwYXRjaE9uQ2hhbmdlKG5ld1ZhbHVlPzogYW55LCBibHVyOiBib29sZWFuID0gZmFsc2UsIHNraXA6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5fb25DaGFuZ2UobmV3VmFsdWUpO1xuICAgICAgdGhpcy5jaGFuZ2VFdmVudC5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgIGlmIChibHVyKSB7XG4gICAgICAgICFza2lwICYmIHRoaXMud3JpdGVWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAhc2tpcCAmJiB0aGlzLl9zZXRDYWxlbmRhclZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRUcmlnZ2VyVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NldENhbGVuZGFyVmFsdWUodmFsdWUpO1xuICAgIHRoaXMuX3NldEZvcm1WYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDYWxlbmRhclZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlICYmIHRoaXMudmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICBsZXQgbmV3RGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgIG5ld0RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICB0aGlzLnZhbHVlID0gbmV3RGF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Rm9ybVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGNvbnN0IHRlc3QgPSB0aGlzLmZvcm1hdERhdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gdGVzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZFxuICAgKiBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5IGlmIHRoaXMgaW50ZXJhY3Rpb25cbiAgICogc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgKi9cbiAgcHVibGljIHNldFZhbHVlQW5kQ2xvc2UoZXZlbnQ6IGFueSB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQ/LmRhdGUpIHtcbiAgICAgIHRoaXMuc2hvd0ludmFsaWREYXRlRXJyb3IgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShldmVudC5kYXRlLCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcbiAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gJyc7XG4gICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKG51bGwpO1xuICB9XG5cbiAgcHVibGljIGZvcm1hdERhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcbiAgICB0cnkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy51c2VyRGVmaW5lZEZvcm1hdCAmJiBpc1ZhbGlkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gRGF0ZVV0aWwuZm9ybWF0KHZhbHVlLCB0aGlzLmZvcm1hdCk7XG4gICAgICB9XG4gICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKCEoaXNOYU4odmFsdWUudmFsdWVPZigpKSAmJiB0aGlzLmFsbG93SW52YWxpZERhdGUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh2YWx1ZSwge1xuICAgICAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGVycjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhhc1ZhbHVlKCkge1xuICAgIHJldHVybiAhSGVscGVycy5pc0VtcHR5KHRoaXMudmFsdWUpO1xuICB9XG59XG4iXX0=