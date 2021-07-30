// NG
import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Output, ViewChild, EventEmitter, HostBinding, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ENTER, ESCAPE, TAB } from '@angular/cdk/keycodes';
// Vendor
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
// App
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { DateFormatService } from '../../services/date-format/DateFormat';
// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTimePickerInputElement),
    multi: true,
};
export class NovoTimePickerInputElement {
    constructor(element, labels, dateFormatService, _changeDetectorRef) {
        this.element = element;
        this.labels = labels;
        this.dateFormatService = dateFormatService;
        this._changeDetectorRef = _changeDetectorRef;
        this.formattedValue = '';
        /** View -> model callback called when value changes */
        this._onChange = () => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
        this.military = false;
        this.disabled = false;
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
    }
    ngOnInit() {
        this.placeholder = this.military ? this.labels.timeFormatPlaceholder24Hour : this.labels.timeFormatPlaceholderAM;
        this.maskOptions = {
            mask: this.military ? [/\d/, /\d/, ':', /\d/, /\d/] : [/\d/, /\d/, ':', /\d/, /\d/, ' ', /[aApP上下]/, /[mM午]/],
            pipe: this.military ? createAutoCorrectedDatePipe('HH:MM') : createAutoCorrectedDatePipe('mm:MM'),
            keepCharPositions: false,
            guide: true,
        };
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        if (!this.overlay.panelOpen) {
            this.overlay.openPanel();
            const hour = new Date().getHours();
            Promise.resolve(null).then(() => this.scrollToIndex(hour * 4));
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
        if ((event.keyCode === ESCAPE || event.keyCode === ENTER || event.keyCode === TAB) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    }
    _handleInput(event) {
        if (document.activeElement === event.target) {
            // this._onChange((event.target as HTMLInputElement).value);
            const text = event.target.value;
            if (this.military ? text.replace(/_/g, '').length === 5 : text.replace(/_/g, '').length === 8) {
                const [dateTimeValue, formatted] = this.dateFormatService.parseString(text, this.military, 'time');
                this.dispatchOnChange(dateTimeValue);
            }
            else {
                this.dispatchOnChange(null);
            }
            this.openPanel();
            const num = Number(text.split(':')[0]);
            this.scrollToIndex(num * 4);
        }
    }
    _handleBlur(event) {
        this.blurEvent.emit(event);
    }
    _handleFocus(event) {
        this.openPanel();
        this.focusEvent.emit(event);
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
    dispatchOnChange(newValue, skip = false) {
        if (newValue !== this.value) {
            this._onChange(newValue);
            !skip && this.writeValue(newValue);
        }
    }
    _setTriggerValue(value) {
        if (value instanceof Date && this.value instanceof Date) {
            value = new Date(value.setFullYear(this.value.getFullYear(), this.value.getMonth(), this.value.getDate()));
        }
        this.value = value;
        if (this.value) {
            this.formattedValue = this.formatDateValue(this.value);
        }
        this._changeDetectorRef.markForCheck();
    }
    setValue(event) {
        if (event && event.date) {
            this.dispatchOnChange(event.date);
        }
    }
    setValueAndClose(event) {
        this.setValue(event);
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
        if (!value) {
            return '';
        }
        const format = this.labels.formatTimeWithFormat(value, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: !this.military,
        });
        if (format.split(':')[0].length === 1) {
            return `0${format}`;
        }
        return format;
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
    scrollToIndex(index) {
        const element = this.overlay.overlayRef.overlayElement;
        const list = element.querySelector('.increments');
        const items = list.querySelectorAll('novo-list-item');
        const item = items[index];
        if (item) {
            list.scrollTop = item.offsetTop;
        }
    }
}
NovoTimePickerInputElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-time-picker-input',
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
      data-automation-id="time-input"
      [disabled]="disabled"
    />
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-clock"></i> <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>

    <novo-overlay-template [parent]="element" position="above-below">
      <novo-time-picker inline="true" (onSelect)="setValue($event)" [ngModel]="value" [military]="military"></novo-time-picker>
    </novo-overlay-template>
  `
            },] }
];
NovoTimePickerInputElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: DateFormatService },
    { type: ChangeDetectorRef }
];
NovoTimePickerInputElement.propDecorators = {
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    military: [{ type: Input }],
    maskOptions: [{ type: Input }],
    disabled: [{ type: HostBinding, args: ['class.disabled',] }, { type: Input }],
    blurEvent: [{ type: Output }],
    focusEvent: [{ type: Output }],
    overlay: [{ type: ViewChild, args: [NovoOverlayTemplateComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVBpY2tlcklucHV0LmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy90aW1lLXBpY2tlci9UaW1lUGlja2VySW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSztBQUNMLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFFTixTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsU0FBUztBQUNULE9BQU8sMkJBQTJCLE1BQU0sbURBQW1ELENBQUM7QUFDNUYsTUFBTTtBQUNOLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUUxRSxzREFBc0Q7QUFDdEQsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQTBCLENBQUM7SUFDekQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBMkJGLE1BQU0sT0FBTywwQkFBMEI7SUE0QnJDLFlBQ1MsT0FBbUIsRUFDbkIsTUFBd0IsRUFDeEIsaUJBQW9DLEVBQ2pDLGtCQUFxQztRQUh4QyxZQUFP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QUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0RCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsU0FBUyxHQUFJLElBQW9CLENBQUMsU0FBUyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7O1lBMU1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDthQUNGOzs7WUFsREMsVUFBVTtZQWVILGdCQUFnQjtZQUVoQixpQkFBaUI7WUFuQnhCLGlCQUFpQjs7O21CQThEaEIsS0FBSzswQkFFTCxLQUFLO3VCQUVMLEtBQUs7MEJBRUwsS0FBSzt1QkFFTCxXQUFXLFNBQUMsZ0JBQWdCLGNBQzVCLEtBQUs7d0JBRUwsTUFBTTt5QkFFTixNQUFNO3NCQUdOLFNBQVMsU0FBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIE9uSW5pdCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEVOVEVSLCBFU0NBUEUsIFRBQiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbi8vIFZlbmRvclxyXG5pbXBvcnQgY3JlYXRlQXV0b0NvcnJlY3RlZERhdGVQaXBlIGZyb20gJ3RleHQtbWFzay1hZGRvbnMvZGlzdC9jcmVhdGVBdXRvQ29ycmVjdGVkRGF0ZVBpcGUnO1xyXG4vLyBBcHBcclxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL292ZXJsYXkvT3ZlcmxheSc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcbmltcG9ydCB7IERhdGVGb3JtYXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0ZS1mb3JtYXQvRGF0ZUZvcm1hdCc7XHJcblxyXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcclxuY29uc3QgREFURV9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvVGltZVBpY2tlcklucHV0RWxlbWVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tdGltZS1waWNrZXItaW5wdXQnLFxyXG4gIHByb3ZpZGVyczogW0RBVEVfVkFMVUVfQUNDRVNTT1JdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8aW5wdXRcclxuICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICBbbmFtZV09XCJuYW1lXCJcclxuICAgICAgWyhuZ01vZGVsKV09XCJmb3JtYXR0ZWRWYWx1ZVwiXHJcbiAgICAgIFt0ZXh0TWFza109XCJtYXNrT3B0aW9uc1wiXHJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgIChmb2N1cyk9XCJfaGFuZGxlRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgIChrZXlkb3duKT1cIl9oYW5kbGVLZXlkb3duKCRldmVudClcIlxyXG4gICAgICAoaW5wdXQpPVwiX2hhbmRsZUlucHV0KCRldmVudClcIlxyXG4gICAgICAoYmx1cik9XCJfaGFuZGxlQmx1cigkZXZlbnQpXCJcclxuICAgICAgI2lucHV0XHJcbiAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInRpbWUtaW5wdXRcIlxyXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgLz5cclxuICAgIDxpICpuZ0lmPVwiIWhhc1ZhbHVlXCIgKGNsaWNrKT1cIm9wZW5QYW5lbCgpXCIgY2xhc3M9XCJiaGktY2xvY2tcIj48L2k+IDxpICpuZ0lmPVwiaGFzVmFsdWVcIiAoY2xpY2spPVwiY2xlYXJWYWx1ZSgpXCIgY2xhc3M9XCJiaGktdGltZXNcIj48L2k+XHJcblxyXG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cImVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCI+XHJcbiAgICAgIDxub3ZvLXRpbWUtcGlja2VyIGlubGluZT1cInRydWVcIiAob25TZWxlY3QpPVwic2V0VmFsdWUoJGV2ZW50KVwiIFtuZ01vZGVsXT1cInZhbHVlXCIgW21pbGl0YXJ5XT1cIm1pbGl0YXJ5XCI+PC9ub3ZvLXRpbWUtcGlja2VyPlxyXG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9UaW1lUGlja2VySW5wdXRFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgcHVibGljIHZhbHVlOiBhbnk7XHJcbiAgcHVibGljIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlcyAqL1xyXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcclxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBhdXRvY29tcGxldGUgaGFzIGJlZW4gdG91Y2hlZCAqL1xyXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgQElucHV0KClcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgbWlsaXRhcnk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKVxyXG4gIG1hc2tPcHRpb25zOiBhbnk7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXHJcbiAgQElucHV0KClcclxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKVxyXG4gIGJsdXJFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIGZvY3VzRXZlbnQ6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcclxuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xyXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcclxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcclxuICAgIHB1YmxpYyBkYXRlRm9ybWF0U2VydmljZTogRGF0ZUZvcm1hdFNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMubWlsaXRhcnkgPyB0aGlzLmxhYmVscy50aW1lRm9ybWF0UGxhY2Vob2xkZXIyNEhvdXIgOiB0aGlzLmxhYmVscy50aW1lRm9ybWF0UGxhY2Vob2xkZXJBTTtcclxuICAgIHRoaXMubWFza09wdGlvbnMgPSB7XHJcbiAgICAgIG1hc2s6IHRoaXMubWlsaXRhcnkgPyBbL1xcZC8sIC9cXGQvLCAnOicsIC9cXGQvLCAvXFxkL10gOiBbL1xcZC8sIC9cXGQvLCAnOicsIC9cXGQvLCAvXFxkLywgJyAnLCAvW2FBcFDkuIrkuItdLywgL1ttTeWNiF0vXSxcclxuICAgICAgcGlwZTogdGhpcy5taWxpdGFyeSA/IGNyZWF0ZUF1dG9Db3JyZWN0ZWREYXRlUGlwZSgnSEg6TU0nKSA6IGNyZWF0ZUF1dG9Db3JyZWN0ZWREYXRlUGlwZSgnbW06TU0nKSxcclxuICAgICAga2VlcENoYXJQb3NpdGlvbnM6IGZhbHNlLFxyXG4gICAgICBndWlkZTogdHJ1ZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKiogQkVHSU46IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cclxuICBvcGVuUGFuZWwoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMub3ZlcmxheS5wYW5lbE9wZW4pIHtcclxuICAgICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xyXG4gICAgICBjb25zdCBob3VyID0gbmV3IERhdGUoKS5nZXRIb3VycygpO1xyXG4gICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLnNjcm9sbFRvSW5kZXgoaG91ciAqIDQpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsb3NlUGFuZWwoKTogdm9pZCB7XHJcbiAgICB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LnBhbmVsT3BlbjtcclxuICB9XHJcblxyXG4gIC8qKiBFTkQ6IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cclxuXHJcbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICgoZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFIHx8IGV2ZW50LmtleUNvZGUgPT09IEVOVEVSIHx8IGV2ZW50LmtleUNvZGUgPT09IFRBQikgJiYgdGhpcy5wYW5lbE9wZW4pIHtcclxuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9oYW5kbGVJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCkge1xyXG4gICAgICAvLyB0aGlzLl9vbkNoYW5nZSgoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcclxuICAgICAgY29uc3QgdGV4dCA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLm1pbGl0YXJ5ID8gdGV4dC5yZXBsYWNlKC9fL2csICcnKS5sZW5ndGggPT09IDUgOiB0ZXh0LnJlcGxhY2UoL18vZywgJycpLmxlbmd0aCA9PT0gOCkge1xyXG4gICAgICAgIGNvbnN0IFtkYXRlVGltZVZhbHVlLCBmb3JtYXR0ZWRdID0gdGhpcy5kYXRlRm9ybWF0U2VydmljZS5wYXJzZVN0cmluZyh0ZXh0LCB0aGlzLm1pbGl0YXJ5LCAndGltZScpO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShkYXRlVGltZVZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoT25DaGFuZ2UobnVsbCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcclxuICAgICAgY29uc3QgbnVtID0gTnVtYmVyKHRleHQuc3BsaXQoJzonKVswXSk7XHJcbiAgICAgIHRoaXMuc2Nyb2xsVG9JbmRleChudW0gKiA0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9oYW5kbGVCbHVyKGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmJsdXJFdmVudC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVGb2N1cyhldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5vcGVuUGFuZWwoKTtcclxuICAgIHRoaXMuZm9jdXNFdmVudC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5fc2V0VHJpZ2dlclZhbHVlKHZhbHVlKSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcclxuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcclxuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3BhdGNoT25DaGFuZ2UobmV3VmFsdWU/OiBhbnksIHNraXA6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX29uQ2hhbmdlKG5ld1ZhbHVlKTtcclxuICAgICAgIXNraXAgJiYgdGhpcy53cml0ZVZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldFRyaWdnZXJWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlICYmIHRoaXMudmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUuc2V0RnVsbFllYXIodGhpcy52YWx1ZS5nZXRGdWxsWWVhcigpLCB0aGlzLnZhbHVlLmdldE1vbnRoKCksIHRoaXMudmFsdWUuZ2V0RGF0ZSgpKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlVmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRWYWx1ZShldmVudDogYW55IHwgbnVsbCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGUpIHtcclxuICAgICAgdGhpcy5kaXNwYXRjaE9uQ2hhbmdlKGV2ZW50LmRhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFZhbHVlQW5kQ2xvc2UoZXZlbnQ6IGFueSB8IG51bGwpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQpO1xyXG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb25cclxuICAgKi9cclxuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcclxuICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSAnJztcclxuICAgIHRoaXMuZGlzcGF0Y2hPbkNoYW5nZShudWxsKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmb3JtYXREYXRlVmFsdWUodmFsdWUpIHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5sYWJlbHMuZm9ybWF0VGltZVdpdGhGb3JtYXQodmFsdWUsIHtcclxuICAgICAgaG91cjogJ251bWVyaWMnLFxyXG4gICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcclxuICAgICAgaG91cjEyOiAhdGhpcy5taWxpdGFyeSxcclxuICAgIH0pO1xyXG4gICAgaWYgKGZvcm1hdC5zcGxpdCgnOicpWzBdLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByZXR1cm4gYDAke2Zvcm1hdH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvcm1hdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaGFzVmFsdWUoKSB7XHJcbiAgICByZXR1cm4gIUhlbHBlcnMuaXNFbXB0eSh0aGlzLnZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzY3JvbGxUb0luZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm92ZXJsYXkub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudDtcclxuICAgIGNvbnN0IGxpc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmNyZW1lbnRzJyk7XHJcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnbm92by1saXN0LWl0ZW0nKTtcclxuICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XHJcbiAgICBpZiAoaXRlbSkge1xyXG4gICAgICBsaXN0LnNjcm9sbFRvcCA9IChpdGVtIGFzIEhUTUxFbGVtZW50KS5vZmZzZXRUb3A7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==