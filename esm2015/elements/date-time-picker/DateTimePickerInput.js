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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWVQaWNrZXJJbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0ZS10aW1lLXBpY2tlci9EYXRlVGltZVBpY2tlcklucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFOUMsc0RBQXNEO0FBQ3RELE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDhCQUE4QixDQUFDO0lBQzdELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQTJCRixNQUFNLE9BQU8sOEJBQThCO0lBb0N6QyxZQUFtQixPQUFtQixFQUFTLE1BQXdCLEVBQVUsa0JBQXFDO1FBQW5HLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUEvQnRILHVEQUF1RDtRQUN2RCxjQUFTLEdBQXlCLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU1Qyx1RUFBdUU7UUFDdkUsZUFBVSxHQUFHLEdBQUcsRUFBRSxH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QUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7O1lBaEtGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDthQUNGOzs7WUF0Q3NDLFVBQVU7WUFJeEMsZ0JBQWdCO1lBSmhCLGlCQUFpQjs7O21CQWtEdkIsS0FBSztvQkFFTCxLQUFLO2tCQUVMLEtBQUs7MEJBRUwsS0FBSzswQkFFTCxLQUFLO3VCQUVMLEtBQUs7dUJBRUwsS0FBSztxQkFFTCxLQUFLO3dCQUVMLEtBQUs7d0JBRUwsTUFBTTt5QkFFTixNQUFNOzBCQUVOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vLyBWZW5kb3JcclxuaW1wb3J0IHsgaXNEYXRlLCBwYXJzZSB9IGZyb20gJ2RhdGUtZm5zJztcclxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XHJcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcclxuXHJcbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxyXG5jb25zdCBEQVRFX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlVGltZVBpY2tlcklucHV0RWxlbWVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tZGF0ZS10aW1lLXBpY2tlci1pbnB1dCcsXHJcbiAgcHJvdmlkZXJzOiBbREFURV9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxub3ZvLWRhdGUtcGlja2VyLWlucHV0XHJcbiAgICAgIFtuZ01vZGVsXT1cImRhdGVQYXJ0XCJcclxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlRGF0ZSgkZXZlbnQpXCJcclxuICAgICAgW3N0YXJ0XT1cInN0YXJ0XCJcclxuICAgICAgW2VuZF09XCJlbmRcIlxyXG4gICAgICBbbWFza09wdGlvbnNdPVwibWFza09wdGlvbnNcIlxyXG4gICAgICAoYmx1ckV2ZW50KT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXHJcbiAgICAgIChmb2N1c0V2ZW50KT1cImhhbmRsZUZvY3VzKCRldmVudClcIlxyXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICBbd2Vla1N0YXJ0XT1cIndlZWtTdGFydFwiXHJcbiAgICA+PC9ub3ZvLWRhdGUtcGlja2VyLWlucHV0PlxyXG4gICAgPG5vdm8tdGltZS1waWNrZXItaW5wdXRcclxuICAgICAgW25nTW9kZWxdPVwidGltZVBhcnRcIlxyXG4gICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVUaW1lKCRldmVudClcIlxyXG4gICAgICBbbWlsaXRhcnldPVwibWlsaXRhcnlcIlxyXG4gICAgICAoYmx1ckV2ZW50KT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXHJcbiAgICAgIChmb2N1c0V2ZW50KT1cImhhbmRsZUZvY3VzKCRldmVudClcIlxyXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgPjwvbm92by10aW1lLXBpY2tlci1pbnB1dD5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0RhdGVUaW1lUGlja2VySW5wdXRFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIHB1YmxpYyB2YWx1ZTogYW55O1xyXG4gIHB1YmxpYyBkYXRlUGFydDogYW55O1xyXG4gIHB1YmxpYyB0aW1lUGFydDogYW55O1xyXG5cclxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzICovXHJcbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcclxuXHJcbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gYXV0b2NvbXBsZXRlIGhhcyBiZWVuIHRvdWNoZWQgKi9cclxuICBfb25Ub3VjaGVkID0gKCkgPT4geyB9O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIHN0YXJ0OiBEYXRlO1xyXG4gIEBJbnB1dCgpXHJcbiAgZW5kOiBEYXRlO1xyXG4gIEBJbnB1dCgpXHJcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIG1hc2tPcHRpb25zOiBhbnk7XHJcbiAgQElucHV0KClcclxuICBtaWxpdGFyeTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKVxyXG4gIGZvcm1hdDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla1N0YXJ0OiBudW1iZXIgPSAwO1xyXG4gIEBPdXRwdXQoKVxyXG4gIGJsdXJFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIGZvY3VzRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcclxuICBAT3V0cHV0KClcclxuICBjaGFuZ2VFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmRhdGVQYXJ0ID0gaXNEYXRlKHZhbHVlKSA/IHBhcnNlKHZhbHVlKSA6IHZhbHVlO1xyXG4gICAgdGhpcy50aW1lUGFydCA9IGlzRGF0ZSh2YWx1ZSkgPyBwYXJzZSh2YWx1ZSkgOiB2YWx1ZTtcclxuICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMuX3NldFRyaWdnZXJWYWx1ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICB1cGRhdGVEYXRlKGV2ZW50KSB7XHJcbiAgICB0aGlzLmRhdGVQYXJ0ID0gZXZlbnQ7XHJcbiAgICB0aGlzLmNoZWNrUGFydHMoKTtcclxuICB9XHJcbiAgdXBkYXRlVGltZShldmVudCkge1xyXG4gICAgdGhpcy50aW1lUGFydCA9IGV2ZW50O1xyXG4gICAgdGhpcy5jaGVja1BhcnRzKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVCbHVyKGV2ZW50KSB7XHJcbiAgICB0aGlzLmJsdXJFdmVudC5lbWl0KGV2ZW50KTtcclxuICAgIHRoaXMuY2hhbmdlRXZlbnQuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVGb2N1cyhldmVudCkge1xyXG4gICAgdGhpcy5mb2N1c0V2ZW50LmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tQYXJ0cygpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGVQYXJ0IGluc3RhbmNlb2YgRGF0ZSAmJiB0aGlzLnRpbWVQYXJ0IGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShcclxuICAgICAgICAgIG5ldyBEYXRlKFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVQYXJ0LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBhcnQuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGFydC5nZXREYXRlKCksXHJcbiAgICAgICAgICAgIHRoaXMudGltZVBhcnQuZ2V0SG91cnMoKSxcclxuICAgICAgICAgICAgdGhpcy50aW1lUGFydC5nZXRNaW51dGVzKCksXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlUGFydCBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICB0aGlzLnRpbWVQYXJ0ID0gbmV3IERhdGUodGhpcy5kYXRlUGFydC5nZXRGdWxsWWVhcigpLCB0aGlzLmRhdGVQYXJ0LmdldE1vbnRoKCksIHRoaXMuZGF0ZVBhcnQuZ2V0RGF0ZSgpLCAxMiwgMCk7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKFxyXG4gICAgICAgICAgbmV3IERhdGUoXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBhcnQuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGFydC5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVQYXJ0LmdldERhdGUoKSxcclxuICAgICAgICAgICAgdGhpcy50aW1lUGFydC5nZXRIb3VycygpLFxyXG4gICAgICAgICAgICB0aGlzLnRpbWVQYXJ0LmdldE1pbnV0ZXMoKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UobnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAvLyBEYXRlIG5vdCB2YWxpZFxyXG4gICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UobnVsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcclxuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcclxuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3BhdGNoT25DaGFuZ2UobmV3VmFsdWU/OiBhbnkpIHtcclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xyXG4gICAgICB0aGlzLl9vbkNoYW5nZShuZXdWYWx1ZSk7XHJcbiAgICAgIHRoaXMuX3NldFRyaWdnZXJWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NldFRyaWdnZXJWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRWYWx1ZShldmVudDogYW55IHwgbnVsbCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGUpIHtcclxuICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKGV2ZW50LmRhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFZhbHVlQW5kQ2xvc2UoZXZlbnQ6IGFueSB8IG51bGwpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXHJcbiAgICovXHJcbiAgcHVibGljIGNsZWFyVmFsdWUoKSB7XHJcbiAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UobnVsbCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGhhc1ZhbHVlKCkge1xyXG4gICAgcmV0dXJuICFIZWxwZXJzLmlzRW1wdHkodGhpcy52YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==