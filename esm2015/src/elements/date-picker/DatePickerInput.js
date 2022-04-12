// NG
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
// App
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
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
NovoDatePickerInputElement.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NovoDatePickerInputElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: ChangeDetectorRef },
    { type: DateFormatService }
];
NovoDatePickerInputElement.propDecorators = {
    name: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    placeholder: [{ type: Input }],
    maskOptions: [{ type: Input }],
    format: [{ type: Input }],
    textMaskEnabled: [{ type: Input }],
    allowInvalidDate: [{ type: Input }],
    disabled: [{ type: HostBinding, args: ['class.disabled',] }, { type: Input }],
    disabledDateMessage: [{ type: Input }],
    weekStart: [{ type: Input }],
    blurEvent: [{ type: Output }],
    focusEvent: [{ type: Output }],
    changeEvent: [{ type: Output }],
    overlay: [{ type: ViewChild, args: [NovoOverlayTemplateComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlcklucHV0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2RhdGUtcGlja2VyL0RhdGVQaWNrZXJJbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxTQUFTO0FBQ1QsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTywyQkFBMkIsTUFBTSxtREFBbUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsTUFBTTtBQUNOLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXpFLHNEQUFzRDtBQUN0RCxNQUFNLG1CQUFtQixHQUFHO0lBQzFCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztJQUN6RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFvQ0YsTUFBTSxPQUFPLDBCQUEwQjtJQXVFckMsWUFDUyxPQUFtQixFQUNuQixNQUF3QixFQUN2QixrQkFBcUMsRUFDdEMsaUJBQW9DO1FBSHBDLFlBQU8sR0FBUCxPQUFPLENB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QUM1QixLQUFLO2tDQUVMLEtBQUs7d0JBS0wsS0FBSzt3QkFFTCxNQUFNO3lCQUVOLE1BQU07MEJBRU4sTUFBTTtzQkFHTixTQUFTLFNBQUMsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkdcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBjcmVhdGVBdXRvQ29ycmVjdGVkRGF0ZVBpcGUgZnJvbSAndGV4dC1tYXNrLWFkZG9ucy9kaXN0L2NyZWF0ZUF1dG9Db3JyZWN0ZWREYXRlUGlwZSc7XG5pbXBvcnQgeyBEYXRlRm9ybWF0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGUtZm9ybWF0L0RhdGVGb3JtYXQnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG4vLyBBcHBcbmltcG9ydCB7IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vb3ZlcmxheS9PdmVybGF5JztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBEQVRFX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0ZS1waWNrZXItaW5wdXQnLFxuICBwcm92aWRlcnM6IFtEQVRFX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgWyhuZ01vZGVsKV09XCJmb3JtYXR0ZWRWYWx1ZVwiXG4gICAgICBbdGV4dE1hc2tdPVwibWFza09wdGlvbnNcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIChmb2N1cyk9XCJfaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bik9XCJfaGFuZGxlS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgIChpbnB1dCk9XCJfaGFuZGxlSW5wdXQoJGV2ZW50KVwiXG4gICAgICAoYmx1cik9XCJfaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICNpbnB1dFxuICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZGF0ZS1pbnB1dFwiXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJlcnJvci10ZXh0XCIgKm5nSWY9XCJzaG93SW52YWxpZERhdGVFcnJvclwiPnt7IGludmFsaWREYXRlRXJyb3JNZXNzYWdlIH19PC9zcGFuPlxuICAgIDxpICpuZ0lmPVwiIWhhc1ZhbHVlXCIgKGNsaWNrKT1cIm9wZW5QYW5lbCgpXCIgY2xhc3M9XCJiaGktY2FsZW5kYXJcIj48L2k+XG4gICAgPGkgKm5nSWY9XCJoYXNWYWx1ZVwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIiBjbGFzcz1cImJoaS10aW1lc1wiPjwvaT5cbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlIFtwYXJlbnRdPVwiZWxlbWVudFwiIHBvc2l0aW9uPVwiYWJvdmUtYmVsb3dcIj5cbiAgICAgIDxub3ZvLWRhdGUtcGlja2VyXG4gICAgICAgIFtzdGFydF09XCJzdGFydFwiXG4gICAgICAgIFtlbmRdPVwiZW5kXCJcbiAgICAgICAgaW5saW5lPVwidHJ1ZVwiXG4gICAgICAgIChvblNlbGVjdCk9XCJzZXRWYWx1ZUFuZENsb3NlKCRldmVudClcIlxuICAgICAgICBbZGlzYWJsZWREYXRlTWVzc2FnZV09XCJkaXNhYmxlZERhdGVNZXNzYWdlXCJcbiAgICAgICAgW25nTW9kZWxdPVwidmFsdWVcIlxuICAgICAgICBbd2Vla1N0YXJ0XT1cIndlZWtTdGFydFwiXG4gICAgICA+PC9ub3ZvLWRhdGUtcGlja2VyPlxuICAgIDwvbm92by1vdmVybGF5LXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZVBpY2tlcklucHV0RWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHB1YmxpYyB2YWx1ZTogYW55O1xuICBwdWJsaWMgZm9ybWF0dGVkVmFsdWU6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgc2hvd0ludmFsaWREYXRlRXJyb3I6IGJvb2xlYW47XG4gIHB1YmxpYyBpbnZhbGlkRGF0ZUVycm9yTWVzc2FnZTogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgdXNlckRlZmluZWRGb3JtYXQ6IGJvb2xlYW47XG4gIHByaXZhdGUgaXNJbnZhbGlkRGF0ZTogYm9vbGVhbjtcblxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzICovXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBhdXRvY29tcGxldGUgaGFzIGJlZW4gdG91Y2hlZCAqL1xuICBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBmb3JtIGZpZWxkLCBnZXQgcGFzc2VkIHRvIHRoZSBuYXRpdmUgYGlucHV0YCBlbGVtZW50XG4gICAqKi9cbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBzdGFydDogRGF0ZTtcbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWQuXG4gICAqKi9cbiAgQElucHV0KClcbiAgZW5kOiBEYXRlO1xuICAvKipcbiAgICogUGxhY2Vob2xkZXIgdGV4dCB0byBkaXNwbGF5IGluIHRoZSBpbnB1dCB3aGVuIGl0IGlzIGVtcHR5LlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBNYXNrT3B0aW9ucyB0byBwYXNzIHRvIHRoZSB0ZXh0TWFza0FkZG9ucyBwbHVnaW5cbiAgICoqL1xuICBASW5wdXQoKVxuICBtYXNrT3B0aW9uczogYW55O1xuICAvKipcbiAgICogVGhlIGZvcm1hdCB0byB1c2UgdG8gcGFyc2UgYW5kIHJlbmRlciBkYXRlczogREQvTU0vWVlZWSBvciBNTS9ERC9ZWVlZXG4gICAqKi9cbiAgQElucHV0KClcbiAgZm9ybWF0OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHRleHRNYXNrRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIGFsbG93SW52YWxpZERhdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIFNldHMgdGhlIGZpZWxkIGFzIHRvIGFwcGVhciBkaXNhYmxlZCwgdXNlcnMgd2lsbCBub3QgYmUgYWJsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSB0ZXh0IGZpZWxkLlxuICAgKiovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBASW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZERhdGVNZXNzYWdlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBEYXkgb2YgdGhlIHdlZWsgdGhlIGNhbGVuZGFyIHNob3VsZCBkaXNwbGF5IGZpcnN0LCBTdW5kYXk9MC4uLlNhdHVyZGF5PTZcbiAgICoqL1xuICBASW5wdXQoKVxuICB3ZWVrU3RhcnQ6IG51bWJlciA9IDA7XG4gIEBPdXRwdXQoKVxuICBibHVyRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIGZvY3VzRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIGNoYW5nZUV2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgZGF0ZUZvcm1hdFNlcnZpY2U6IERhdGVGb3JtYXRTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5sYWJlbHMubG9jYWxpemVkRGF0ZVBsYWNlaG9sZGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9pbml0Rm9ybWF0T3B0aW9ucygpO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSgoa2V5KSA9PiBbJ2Zvcm1hdCddLmluY2x1ZGVzKGtleSkpKSB7XG4gICAgICB0aGlzLl9pbml0Rm9ybWF0T3B0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIF9pbml0Rm9ybWF0T3B0aW9ucygpIHtcbiAgICB0aGlzLnVzZXJEZWZpbmVkRm9ybWF0ID0gdGhpcy5mb3JtYXQgPyAhdGhpcy5mb3JtYXQubWF0Y2goL14oRERcXC9NTVxcL1lZWVl8TU1cXC9ERFxcL1lZWVkpJC9nKSA6IGZhbHNlO1xuICAgIGlmICghdGhpcy51c2VyRGVmaW5lZEZvcm1hdCAmJiB0aGlzLnRleHRNYXNrRW5hYmxlZCAmJiAhdGhpcy5hbGxvd0ludmFsaWREYXRlKSB7XG4gICAgICB0aGlzLm1hc2tPcHRpb25zID0gdGhpcy5tYXNrT3B0aW9ucyB8fCB7XG4gICAgICAgIG1hc2s6IHRoaXMuZGF0ZUZvcm1hdFNlcnZpY2UuZ2V0RGF0ZU1hc2soKSxcbiAgICAgICAgcGlwZTogY3JlYXRlQXV0b0NvcnJlY3RlZERhdGVQaXBlKCh0aGlzLmZvcm1hdCB8fCB0aGlzLmxhYmVscy5kYXRlRm9ybWF0U3RyaW5nKCkpLnRvTG93ZXJDYXNlKCkpLFxuICAgICAgICBrZWVwQ2hhclBvc2l0aW9uczogZmFsc2UsXG4gICAgICAgIGd1aWRlOiB0cnVlLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXNrT3B0aW9ucyA9IHsgbWFzazogZmFsc2UgfTtcbiAgICB9XG4gICAgdGhpcy5zZXR1cEludmFsaWREYXRlRXJyb3JNZXNzYWdlKCk7XG4gIH1cblxuICAvKiogQkVHSU46IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cbiAgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuICBjbG9zZVBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheS5jbG9zZVBhbmVsKCk7XG4gIH1cbiAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5ICYmIHRoaXMub3ZlcmxheS5wYW5lbE9wZW47XG4gIH1cbiAgLyoqIEVORDogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKChldmVudC5rZXkgPT09IEtleS5Fc2NhcGUgfHwgZXZlbnQua2V5ID09PSBLZXkuRW50ZXIgfHwgZXZlbnQua2V5ID09PSBLZXkuVGFiKSAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5faGFuZGxlRXZlbnQoZXZlbnQsIHRydWUpO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICB0aGlzLl9oYW5kbGVFdmVudChldmVudCwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVCbHVyKGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVJbnZhbGlkRGF0ZSgpO1xuICAgIHRoaXMuYmx1ckV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgX2hhbmRsZUZvY3VzKGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5zaG93SW52YWxpZERhdGVFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgdGhpcy5mb2N1c0V2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgX2hhbmRsZUV2ZW50KGV2ZW50OiBFdmVudCwgYmx1cjogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICB0aGlzLmNsZWFyVmFsdWUoKTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcm1hdERhdGUodmFsdWUsIGJsdXIpO1xuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZm9ybWF0RGF0ZSh2YWx1ZTogc3RyaW5nLCBibHVyOiBib29sZWFuKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IFtkYXRlVGltZVZhbHVlLCBmb3JtYXR0ZWQsIGlzSW52YWxpZERhdGVdID0gdGhpcy5kYXRlRm9ybWF0U2VydmljZS5wYXJzZVN0cmluZyh2YWx1ZSwgZmFsc2UsICdkYXRlJyk7XG4gICAgICB0aGlzLmlzSW52YWxpZERhdGUgPSBpc0ludmFsaWREYXRlO1xuICAgICAgaWYgKCFpc05hTihkYXRlVGltZVZhbHVlLmdldFVUQ0RhdGUoKSkpIHtcbiAgICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZShkYXRlVGltZVZhbHVlKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKGR0LCBibHVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShudWxsLCBibHVyKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHt9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLl9zZXRUcmlnZ2VyVmFsdWUodmFsdWUpKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICBoYW5kbGVJbnZhbGlkRGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0ludmFsaWREYXRlICYmIHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuc2hvd0ludmFsaWREYXRlRXJyb3IgPSB0cnVlO1xuICAgICAgdGhpcy5jbGVhclZhbHVlKCk7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBzZXR1cEludmFsaWREYXRlRXJyb3JNZXNzYWdlKCk6IHZvaWQge1xuICAgIGxldCBkYXRlRm9ybWF0OiBzdHJpbmcgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0U3RyaW5nKCk7XG4gICAgaWYgKEhlbHBlcnMuaXNFbXB0eShkYXRlRm9ybWF0KSkge1xuICAgICAgLy8gRGVmYXVsdCB0byBtbS9kZC95eXl5XG4gICAgICBkYXRlRm9ybWF0ID0gJ21tL2RkL3l5eXknO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICB0aGlzLmludmFsaWREYXRlRXJyb3JNZXNzYWdlID0gYEludmFsaWQgZGF0ZSBmaWVsZCBlbnRlcmVkLiBEYXRlIGZvcm1hdCBvZiAke2RhdGVGb3JtYXR9IGlzIHJlcXVpcmVkLmA7XG4gIH1cblxuICBwdWJsaWMgZGlzcGF0Y2hPbkNoYW5nZShuZXdWYWx1ZT86IGFueSwgYmx1cjogYm9vbGVhbiA9IGZhbHNlLCBza2lwOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZW1pdChuZXdWYWx1ZSk7XG4gICAgICBpZiAoYmx1cikge1xuICAgICAgICAhc2tpcCAmJiB0aGlzLndyaXRlVmFsdWUobmV3VmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIXNraXAgJiYgdGhpcy5fc2V0Q2FsZW5kYXJWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VHJpZ2dlclZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRDYWxlbmRhclZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLl9zZXRGb3JtVmFsdWUodmFsdWUpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2FsZW5kYXJWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiB0aGlzLnZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgbGV0IG5ld0RhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICBuZXdEYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgdGhpcy52YWx1ZSA9IG5ld0RhdGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEZvcm1WYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCB0ZXN0ID0gdGhpcy5mb3JtYXREYXRlVmFsdWUodmFsdWUpO1xuICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IHRlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcbiAgICogY29udHJvbCB0byB0aGF0IHZhbHVlLiBJdCB3aWxsIGFsc28gbWFyayB0aGUgY29udHJvbCBhcyBkaXJ0eSBpZiB0aGlzIGludGVyYWN0aW9uXG4gICAqIHN0ZW1tZWQgZnJvbSB0aGUgdXNlci5cbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBhbnkgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGUpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShldmVudC5kYXRlLCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcbiAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gJyc7XG4gICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKG51bGwpO1xuICB9XG5cbiAgcHVibGljIGZvcm1hdERhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcbiAgICB0cnkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy51c2VyRGVmaW5lZEZvcm1hdCAmJiBkYXRlRm5zLmlzVmFsaWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBkYXRlRm5zLmZvcm1hdCh2YWx1ZSwgdGhpcy5mb3JtYXQpO1xuICAgICAgfVxuICAgICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICghKGlzTmFOKHZhbHVlLnZhbHVlT2YoKSkgJiYgdGhpcy5hbGxvd0ludmFsaWREYXRlKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodmFsdWUsIHtcbiAgICAgICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhhc1ZhbHVlKCkge1xuICAgIHJldHVybiAhSGVscGVycy5pc0VtcHR5KHRoaXMudmFsdWUpO1xuICB9XG59XG4iXX0=