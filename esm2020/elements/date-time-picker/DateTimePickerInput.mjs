// NG
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { isDate } from 'date-fns';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/date-picker";
import * as i3 from "novo-elements/elements/time-picker";
import * as i4 from "@angular/forms";
// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateTimePickerInputElement),
    multi: true,
};
export class NovoDateTimePickerInputElement {
    constructor(element, labels, _changeDetectorRef) {
        this.element = element;
        this.labels = labels;
        this._changeDetectorRef = _changeDetectorRef;
        /** View -> model callback called when value changes */
        this._onChange = () => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
        this.military = false;
        this.disabled = false;
        this.weekStart = 0;
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.changeEvent = new EventEmitter();
    }
    writeValue(value) {
        this.datePart = isDate(value) ? DateUtil.parse(value) : value;
        this.timePart = isDate(value) ? DateUtil.parse(value) : value;
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    updateDate(event) {
        this.datePart = event;
        this.checkParts();
    }
    updateTime(event) {
        this.timePart = event;
        this.checkParts();
    }
    handleBlur(event) {
        this.blurEvent.emit(event);
        this.changeEvent.emit(event);
    }
    handleFocus(event) {
        this.focusEvent.emit(event);
    }
    checkParts() {
        try {
            if (this.datePart instanceof Date && this.timePart instanceof Date) {
                this.dispatchOnChange(new Date(this.datePart.getFullYear(), this.datePart.getMonth(), this.datePart.getDate(), this.timePart.getHours(), this.timePart.getMinutes()));
            }
            else if (this.datePart instanceof Date) {
                this.timePart = new Date(this.datePart.getFullYear(), this.datePart.getMonth(), this.datePart.getDate(), 12, 0);
                this.dispatchOnChange(new Date(this.datePart.getFullYear(), this.datePart.getMonth(), this.datePart.getDate(), this.timePart.getHours(), this.timePart.getMinutes()));
            }
            else {
                this.dispatchOnChange(null);
            }
        }
        catch (err) {
            // Date not valid
            this.dispatchOnChange(null);
        }
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
    dispatchOnChange(newValue) {
        if (newValue !== this.value) {
            this._onChange(newValue);
            this._setTriggerValue(newValue);
        }
    }
    _setTriggerValue(value) {
        this.value = value;
        this._changeDetectorRef.markForCheck();
    }
    setValue(event) {
        if (event && event.date) {
            this.dispatchOnChange(event.date);
        }
    }
    setValueAndClose(event) {
        this.setValue(event);
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue() {
        this.dispatchOnChange(null);
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
}
NovoDateTimePickerInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoDateTimePickerInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDateTimePickerInputElement, selector: "novo-date-time-picker-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", maskOptions: "maskOptions", military: "military", disabled: "disabled", format: "format", weekStart: "weekStart", disabledDateMessage: "disabledDateMessage" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", changeEvent: "changeEvent" }, providers: [DATE_VALUE_ACCESSOR], ngImport: i0, template: `
    <novo-date-picker-input
      [ngModel]="datePart"
      (ngModelChange)="updateDate($event)"
      [start]="start"
      [end]="end"
      [disabledDateMessage]="disabledDateMessage"
      [maskOptions]="maskOptions"
      (blurEvent)="handleBlur($event)"
      (focusEvent)="handleFocus($event)"
      [disabled]="disabled"
      [weekStart]="weekStart"
    ></novo-date-picker-input>
    <novo-time-picker-input
      [ngModel]="timePart"
      (ngModelChange)="updateTime($event)"
      [military]="military"
      (blurEvent)="handleBlur($event)"
      (focusEvent)="handleFocus($event)"
      [disabled]="disabled"
    ></novo-time-picker-input>
  `, isInline: true, styles: [":host{flex:1;position:relative;display:flex;flex-flow:row nowrap;max-width:340px}:host novo-date-picker-input{margin-right:20px}:host novo-time-picker-input{max-width:130px}\n"], components: [{ type: i2.NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: ["name", "start", "end", "placeholder", "maskOptions", "format", "textMaskEnabled", "allowInvalidDate", "overlayOnElement", "disabled", "disabledDateMessage", "weekStart"], outputs: ["blurEvent", "focusEvent", "changeEvent"] }, { type: i3.NovoTimePickerInputElement, selector: "novo-time-picker-input", inputs: ["name", "placeholder", "military", "maskOptions", "disabled", "hasButtons", "saveDisabled", "overlayOnElement", "analog"], outputs: ["blurEvent", "focusEvent", "changeEvent", "onSave", "onCancel"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateTimePickerInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-time-picker-input', providers: [DATE_VALUE_ACCESSOR], template: `
    <novo-date-picker-input
      [ngModel]="datePart"
      (ngModelChange)="updateDate($event)"
      [start]="start"
      [end]="end"
      [disabledDateMessage]="disabledDateMessage"
      [maskOptions]="maskOptions"
      (blurEvent)="handleBlur($event)"
      (focusEvent)="handleFocus($event)"
      [disabled]="disabled"
      [weekStart]="weekStart"
    ></novo-date-picker-input>
    <novo-time-picker-input
      [ngModel]="timePart"
      (ngModelChange)="updateTime($event)"
      [military]="military"
      (blurEvent)="handleBlur($event)"
      (focusEvent)="handleFocus($event)"
      [disabled]="disabled"
    ></novo-time-picker-input>
  `, styles: [":host{flex:1;position:relative;display:flex;flex-flow:row nowrap;max-width:340px}:host novo-date-picker-input{margin-right:20px}:host novo-time-picker-input{max-width:130px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { name: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], maskOptions: [{
                type: Input
            }], military: [{
                type: Input
            }], disabled: [{
                type: Input
            }], format: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXJJbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RhdGUtdGltZS1waWNrZXIvRGF0ZVRpbWVQaWNrZXJJbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxTQUFTO0FBQ1QsT0FBTyxFQUFPLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFFeEQsc0RBQXNEO0FBQ3RELE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDhCQUE4QixDQUFDO0lBQzdELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQTZCRixNQUFNLE9BQU8sOEJBQThCO0lBc0N6QyxZQUFtQixPQUFtQixFQUFTLE1BQXdCLEVBQVUsa0JBQXFDO1FBQW5HLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFqQ3RILHVEQUF1RDtRQUN2RCxjQUFTLEdBQXlCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUUzQyx1RUFBdUU7UUFDdkUsZUFBVSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQWF0QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFJMUIsY0FBUyxHQUFRLENBQUMsQ0FBQztRQUluQixjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFckUsZUFBVSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRXRFLGdCQUFXLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7SUFFa0QsQ0FBQztJQUUxSCxVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzlELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDOUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNELFVBQVUsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxVQUFVLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUk7WUFDRixJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksSUFBSSxFQUFFO2dCQUNsRSxJQUFJLENBQUMsZ0JBQWdCLENBQ25CLElBQUksSUFBSSxDQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQzNCLENBQ0YsQ0FBQzthQUNIO2lCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxJQUFJLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoSCxJQUFJLENBQUMsZ0JBQWdCLENBQ25CLElBQUksSUFBSSxDQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQzNCLENBQ0YsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QjtTQUNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixpQkFBaUI7WUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQXNCO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsUUFBYztRQUNwQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUNPLGdCQUFnQixDQUFDLEtBQVU7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBaUI7UUFDL0IsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEtBQWlCO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVTtRQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs0SEF6SVUsOEJBQThCO2dIQUE5Qiw4QkFBOEIsaVlBekI5QixDQUFDLG1CQUFtQixDQUFDLDBCQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJUOzRGQUdVLDhCQUE4QjtrQkEzQjFDLFNBQVM7K0JBQ0UsNkJBQTZCLGFBQzVCLENBQUMsbUJBQW1CLENBQUMsWUFDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVDtnS0FlRCxJQUFJO3NCQURILEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdOLEdBQUc7c0JBREYsS0FBSztnQkFHTixXQUFXO3NCQURWLEtBQUs7Z0JBR04sV0FBVztzQkFEVixLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7Z0JBR04sTUFBTTtzQkFETCxLQUFLO2dCQUdOLFNBQVM7c0JBRFIsS0FBSztnQkFHTixtQkFBbUI7c0JBRGxCLEtBQUs7Z0JBR04sU0FBUztzQkFEUixNQUFNO2dCQUdQLFVBQVU7c0JBRFQsTUFBTTtnQkFHUCxXQUFXO3NCQURWLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IERheSwgaXNEYXRlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBEQVRFX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVUaW1lUGlja2VySW5wdXRFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtdGltZS1waWNrZXItaW5wdXQnLFxuICBwcm92aWRlcnM6IFtEQVRFX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1kYXRlLXBpY2tlci1pbnB1dFxuICAgICAgW25nTW9kZWxdPVwiZGF0ZVBhcnRcIlxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlRGF0ZSgkZXZlbnQpXCJcbiAgICAgIFtzdGFydF09XCJzdGFydFwiXG4gICAgICBbZW5kXT1cImVuZFwiXG4gICAgICBbZGlzYWJsZWREYXRlTWVzc2FnZV09XCJkaXNhYmxlZERhdGVNZXNzYWdlXCJcbiAgICAgIFttYXNrT3B0aW9uc109XCJtYXNrT3B0aW9uc1wiXG4gICAgICAoYmx1ckV2ZW50KT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAoZm9jdXNFdmVudCk9XCJoYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICBbd2Vla1N0YXJ0XT1cIndlZWtTdGFydFwiXG4gICAgPjwvbm92by1kYXRlLXBpY2tlci1pbnB1dD5cbiAgICA8bm92by10aW1lLXBpY2tlci1pbnB1dFxuICAgICAgW25nTW9kZWxdPVwidGltZVBhcnRcIlxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlVGltZSgkZXZlbnQpXCJcbiAgICAgIFttaWxpdGFyeV09XCJtaWxpdGFyeVwiXG4gICAgICAoYmx1ckV2ZW50KT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAoZm9jdXNFdmVudCk9XCJoYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgPjwvbm92by10aW1lLXBpY2tlci1pbnB1dD5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vRGF0ZVRpbWVQaWNrZXJJbnB1dC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlVGltZVBpY2tlcklucHV0RWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHVibGljIHZhbHVlOiBhbnk7XG4gIHB1YmxpYyBkYXRlUGFydDogYW55O1xuICBwdWJsaWMgdGltZVBhcnQ6IGFueTtcblxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzICovXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBhdXRvY29tcGxldGUgaGFzIGJlZW4gdG91Y2hlZCAqL1xuICBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzdGFydDogRGF0ZTtcbiAgQElucHV0KClcbiAgZW5kOiBEYXRlO1xuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBtYXNrT3B0aW9uczogYW55O1xuICBASW5wdXQoKVxuICBtaWxpdGFyeTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBmb3JtYXQ6IHN0cmluZztcbiAgQElucHV0KClcbiAgd2Vla1N0YXJ0OiBEYXkgPSAwO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZERhdGVNZXNzYWdlOiBzdHJpbmc7XG4gIEBPdXRwdXQoKVxuICBibHVyRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIGZvY3VzRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIGNoYW5nZUV2ZW50OiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVQYXJ0ID0gaXNEYXRlKHZhbHVlKSA/IERhdGVVdGlsLnBhcnNlKHZhbHVlKSA6IHZhbHVlO1xuICAgIHRoaXMudGltZVBhcnQgPSBpc0RhdGUodmFsdWUpID8gRGF0ZVV0aWwucGFyc2UodmFsdWUpIDogdmFsdWU7XG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5fc2V0VHJpZ2dlclZhbHVlKHZhbHVlKSk7XG4gIH1cbiAgdXBkYXRlRGF0ZShldmVudCkge1xuICAgIHRoaXMuZGF0ZVBhcnQgPSBldmVudDtcbiAgICB0aGlzLmNoZWNrUGFydHMoKTtcbiAgfVxuICB1cGRhdGVUaW1lKGV2ZW50KSB7XG4gICAgdGhpcy50aW1lUGFydCA9IGV2ZW50O1xuICAgIHRoaXMuY2hlY2tQYXJ0cygpO1xuICB9XG5cbiAgaGFuZGxlQmx1cihldmVudCkge1xuICAgIHRoaXMuYmx1ckV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIHRoaXMuY2hhbmdlRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBoYW5kbGVGb2N1cyhldmVudCkge1xuICAgIHRoaXMuZm9jdXNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGNoZWNrUGFydHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmRhdGVQYXJ0IGluc3RhbmNlb2YgRGF0ZSAmJiB0aGlzLnRpbWVQYXJ0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UoXG4gICAgICAgICAgbmV3IERhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVQYXJ0LmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICB0aGlzLmRhdGVQYXJ0LmdldE1vbnRoKCksXG4gICAgICAgICAgICB0aGlzLmRhdGVQYXJ0LmdldERhdGUoKSxcbiAgICAgICAgICAgIHRoaXMudGltZVBhcnQuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgIHRoaXMudGltZVBhcnQuZ2V0TWludXRlcygpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVBhcnQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHRoaXMudGltZVBhcnQgPSBuZXcgRGF0ZSh0aGlzLmRhdGVQYXJ0LmdldEZ1bGxZZWFyKCksIHRoaXMuZGF0ZVBhcnQuZ2V0TW9udGgoKSwgdGhpcy5kYXRlUGFydC5nZXREYXRlKCksIDEyLCAwKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKFxuICAgICAgICAgIG5ldyBEYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlUGFydC5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgdGhpcy5kYXRlUGFydC5nZXRNb250aCgpLFxuICAgICAgICAgICAgdGhpcy5kYXRlUGFydC5nZXREYXRlKCksXG4gICAgICAgICAgICB0aGlzLnRpbWVQYXJ0LmdldEhvdXJzKCksXG4gICAgICAgICAgICB0aGlzLnRpbWVQYXJ0LmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKG51bGwpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gRGF0ZSBub3QgdmFsaWRcbiAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShudWxsKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG5cbiAgcHVibGljIGRpc3BhdGNoT25DaGFuZ2UobmV3VmFsdWU/OiBhbnkpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuX3NldFRyaWdnZXJWYWx1ZShuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3NldFRyaWdnZXJWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIHNldFZhbHVlKGV2ZW50OiBhbnkgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGUpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShldmVudC5kYXRlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0VmFsdWVBbmRDbG9zZShldmVudDogYW55IHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHVibGljIGNsZWFyVmFsdWUoKSB7XG4gICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKG51bGwpO1xuICB9XG5cbiAgcHVibGljIGdldCBoYXNWYWx1ZSgpIHtcbiAgICByZXR1cm4gIUhlbHBlcnMuaXNFbXB0eSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19