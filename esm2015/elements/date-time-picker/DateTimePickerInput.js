// NG
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { isDate, parse } from 'date-fns';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
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
        this.datePart = isDate(value) ? parse(value) : value;
        this.timePart = isDate(value) ? parse(value) : value;
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
NovoDateTimePickerInputElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-date-time-picker-input',
                providers: [DATE_VALUE_ACCESSOR],
                template: `
    <novo-date-picker-input
      [ngModel]="datePart"
      (ngModelChange)="updateDate($event)"
      [start]="start"
      [end]="end"
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
  `
            },] }
];
NovoDateTimePickerInputElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
NovoDateTimePickerInputElement.propDecorators = {
    name: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    placeholder: [{ type: Input }],
    maskOptions: [{ type: Input }],
    military: [{ type: Input }],
    disabled: [{ type: Input }],
    format: [{ type: Input }],
    weekStart: [{ type: Input }],
    blurEvent: [{ type: Output }],
    focusEvent: [{ type: Output }],
    changeEvent: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXJJbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRlLXRpbWUtcGlja2VyL0RhdGVUaW1lUGlja2VySW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSztBQUNMLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsU0FBUztBQUNULE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxzREFBc0Q7QUFDdEQsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsOEJBQThCLENBQUM7SUFDN0QsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBMkJGLE1BQU0sT0FBTyw4QkFBOEI7SUFvQ3pDLFlBQW1CLE9BQW1CLEVBQVMsTUFBd0IsRUFBVSxrQkFBcUM7UUFBbkcsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQS9CdEgsdURBQXVEO1FBQ3ZELGNBQVMsR0FBeUIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTVDLHVFQUF1RTtRQUN2RSxlQUFVLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBYXZCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUkxQixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLGNBQVMsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVyRSxlQUFVLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFdEUsZ0JBQVcsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUVtRCxDQUFDO0lBRTNILFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDckQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNELFVBQVUsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxVQUFVLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUk7WUFDRixJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksSUFBSSxFQUFFO2dCQUNsRSxJQUFJLENBQUMsZ0JBQWdCLENBQ25CLElBQUksSUFBSSxDQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQzNCLENBQ0YsQ0FBQzthQUNIO2lCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxJQUFJLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoSCxJQUFJLENBQUMsZ0JBQWdCLENBQ25CLElBQUksSUFBSSxDQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQzNCLENBQ0YsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QjtTQUNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixpQkFBaUI7WUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQXNCO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsUUFBYztRQUNwQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUNPLGdCQUFnQixDQUFDLEtBQVU7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBaUI7UUFDL0IsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEtBQWlCO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVTtRQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7WUFoS0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUO2FBQ0Y7OztZQXRDc0MsVUFBVTtZQUl4QyxnQkFBZ0I7WUFKaEIsaUJBQWlCOzs7bUJBa0R2QixLQUFLO29CQUVMLEtBQUs7a0JBRUwsS0FBSzswQkFFTCxLQUFLOzBCQUVMLEtBQUs7dUJBRUwsS0FBSzt1QkFFTCxLQUFLO3FCQUVMLEtBQUs7d0JBRUwsS0FBSzt3QkFFTCxNQUFNO3lCQUVOLE1BQU07MEJBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgaXNEYXRlLCBwYXJzZSB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IERBVEVfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvRGF0ZVRpbWVQaWNrZXJJbnB1dEVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0ZS10aW1lLXBpY2tlci1pbnB1dCcsXG4gIHByb3ZpZGVyczogW0RBVEVfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWRhdGUtcGlja2VyLWlucHV0XG4gICAgICBbbmdNb2RlbF09XCJkYXRlUGFydFwiXG4gICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVEYXRlKCRldmVudClcIlxuICAgICAgW3N0YXJ0XT1cInN0YXJ0XCJcbiAgICAgIFtlbmRdPVwiZW5kXCJcbiAgICAgIFttYXNrT3B0aW9uc109XCJtYXNrT3B0aW9uc1wiXG4gICAgICAoYmx1ckV2ZW50KT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAoZm9jdXNFdmVudCk9XCJoYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICBbd2Vla1N0YXJ0XT1cIndlZWtTdGFydFwiXG4gICAgPjwvbm92by1kYXRlLXBpY2tlci1pbnB1dD5cbiAgICA8bm92by10aW1lLXBpY2tlci1pbnB1dFxuICAgICAgW25nTW9kZWxdPVwidGltZVBhcnRcIlxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlVGltZSgkZXZlbnQpXCJcbiAgICAgIFttaWxpdGFyeV09XCJtaWxpdGFyeVwiXG4gICAgICAoYmx1ckV2ZW50KT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAoZm9jdXNFdmVudCk9XCJoYW5kbGVGb2N1cygkZXZlbnQpXCJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgPjwvbm92by10aW1lLXBpY2tlci1pbnB1dD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVUaW1lUGlja2VySW5wdXRFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwdWJsaWMgdmFsdWU6IGFueTtcbiAgcHVibGljIGRhdGVQYXJ0OiBhbnk7XG4gIHB1YmxpYyB0aW1lUGFydDogYW55O1xuXG4gIC8qKiBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXMgKi9cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBhdXRvY29tcGxldGUgaGFzIGJlZW4gdG91Y2hlZCAqL1xuICBfb25Ub3VjaGVkID0gKCkgPT4geyB9O1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgc3RhcnQ6IERhdGU7XG4gIEBJbnB1dCgpXG4gIGVuZDogRGF0ZTtcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KClcbiAgbWFza09wdGlvbnM6IGFueTtcbiAgQElucHV0KClcbiAgbWlsaXRhcnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZm9ybWF0OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHdlZWtTdGFydDogbnVtYmVyID0gMDtcbiAgQE91dHB1dCgpXG4gIGJsdXJFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xuICBAT3V0cHV0KClcbiAgZm9jdXNFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xuICBAT3V0cHV0KClcbiAgY2hhbmdlRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVQYXJ0ID0gaXNEYXRlKHZhbHVlKSA/IHBhcnNlKHZhbHVlKSA6IHZhbHVlO1xuICAgIHRoaXMudGltZVBhcnQgPSBpc0RhdGUodmFsdWUpID8gcGFyc2UodmFsdWUpIDogdmFsdWU7XG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5fc2V0VHJpZ2dlclZhbHVlKHZhbHVlKSk7XG4gIH1cbiAgdXBkYXRlRGF0ZShldmVudCkge1xuICAgIHRoaXMuZGF0ZVBhcnQgPSBldmVudDtcbiAgICB0aGlzLmNoZWNrUGFydHMoKTtcbiAgfVxuICB1cGRhdGVUaW1lKGV2ZW50KSB7XG4gICAgdGhpcy50aW1lUGFydCA9IGV2ZW50O1xuICAgIHRoaXMuY2hlY2tQYXJ0cygpO1xuICB9XG5cbiAgaGFuZGxlQmx1cihldmVudCkge1xuICAgIHRoaXMuYmx1ckV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIHRoaXMuY2hhbmdlRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBoYW5kbGVGb2N1cyhldmVudCkge1xuICAgIHRoaXMuZm9jdXNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGNoZWNrUGFydHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmRhdGVQYXJ0IGluc3RhbmNlb2YgRGF0ZSAmJiB0aGlzLnRpbWVQYXJ0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UoXG4gICAgICAgICAgbmV3IERhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVQYXJ0LmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICB0aGlzLmRhdGVQYXJ0LmdldE1vbnRoKCksXG4gICAgICAgICAgICB0aGlzLmRhdGVQYXJ0LmdldERhdGUoKSxcbiAgICAgICAgICAgIHRoaXMudGltZVBhcnQuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgIHRoaXMudGltZVBhcnQuZ2V0TWludXRlcygpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVBhcnQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHRoaXMudGltZVBhcnQgPSBuZXcgRGF0ZSh0aGlzLmRhdGVQYXJ0LmdldEZ1bGxZZWFyKCksIHRoaXMuZGF0ZVBhcnQuZ2V0TW9udGgoKSwgdGhpcy5kYXRlUGFydC5nZXREYXRlKCksIDEyLCAwKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKFxuICAgICAgICAgIG5ldyBEYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlUGFydC5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgdGhpcy5kYXRlUGFydC5nZXRNb250aCgpLFxuICAgICAgICAgICAgdGhpcy5kYXRlUGFydC5nZXREYXRlKCksXG4gICAgICAgICAgICB0aGlzLnRpbWVQYXJ0LmdldEhvdXJzKCksXG4gICAgICAgICAgICB0aGlzLnRpbWVQYXJ0LmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKG51bGwpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gRGF0ZSBub3QgdmFsaWRcbiAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShudWxsKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG5cbiAgcHVibGljIGRpc3BhdGNoT25DaGFuZ2UobmV3VmFsdWU/OiBhbnkpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuX3NldFRyaWdnZXJWYWx1ZShuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3NldFRyaWdnZXJWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIHNldFZhbHVlKGV2ZW50OiBhbnkgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGUpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShldmVudC5kYXRlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0VmFsdWVBbmRDbG9zZShldmVudDogYW55IHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFueSBwcmV2aW91cyBzZWxlY3RlZCBvcHRpb24gYW5kIGVtaXQgYSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50IGZvciB0aGlzIG9wdGlvblxuICAgKi9cbiAgcHVibGljIGNsZWFyVmFsdWUoKSB7XG4gICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKG51bGwpO1xuICB9XG5cbiAgcHVibGljIGdldCBoYXNWYWx1ZSgpIHtcbiAgICByZXR1cm4gIUhlbHBlcnMuaXNFbXB0eSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19