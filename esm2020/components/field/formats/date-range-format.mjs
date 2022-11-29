import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { isValid } from 'date-fns';
import { MaskedRange } from 'imask';
import { DATE_FORMATS, NOVO_INPUT_FORMAT } from './base-format';
import { DateUtil } from 'novo-elements/utils';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "angular-imask";
import * as i2 from "novo-elements/services";
export const DATERANGEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateRangeFormatDirective),
    multi: true,
};
export class NovoDateRangeFormatDirective extends IMaskDirective {
    constructor(_element, _renderer, _factory, _compositionMode, labels) {
        super(_element, _renderer, _factory, _compositionMode);
        this._element = _element;
        this.labels = labels;
        this.valueChange = new EventEmitter();
        this.dateRangeFormat = DATE_FORMATS.DATE;
        const dateRangeFormat = this.labels.dateFormat.toUpperCase();
        this.unmask = false;
        this.imask = {
            mask: 'm{/}`d{/}`Y - m{/}`d{/}`Y',
            overwrite: true,
            autofix: true,
            lazy: false,
            blocks: {
                d: {
                    mask: MaskedRange,
                    placeholderChar: 'D',
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: MaskedRange,
                    placeholderChar: 'M',
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: MaskedRange,
                    placeholderChar: 'Y',
                    from: 1900,
                    to: 9999,
                },
            },
        };
    }
    normalize(value) {
        const pattern = this.labels.dateFormat.toUpperCase();
        return DateUtil.format(DateUtil.parse(value), pattern);
    }
    formatAsIso(value) {
        if (!value)
            return '';
        const { startDate, endDate } = value;
        if (startDate && isValid(startDate) && endDate && isValid(endDate)) {
            const startIso = startDate.toISOString().slice(0, 10);
            const endIso = endDate.toISOString().slice(0, 10);
            return `${startIso}/${endIso}`;
        }
        return null;
    }
    formatValue(value) {
        if (!value)
            return '';
        const { startDate, endDate } = value;
        return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
    }
    formatDate(source) {
        const date = DateUtil.parse(source);
        if (isValid(date)) {
            const dateRangeFormat = this.labels.dateFormat.toUpperCase();
            return DateUtil.format(date, dateRangeFormat);
        }
        return this.normalize(source);
    }
    writeValue(value) {
        const formattedValue = this.formatValue(value);
        if (formattedValue !== this.maskValue) {
            super.writeValue(this.formatValue(value));
            this.onChange(this.formatValue(value));
        }
    }
    registerOnChange(fn) {
        this.onChange = (input) => {
            if (this.validate(input)) {
                const dates = this.extractDatesFromInput(input);
                let formatted = dates;
                switch (this.dateRangeFormat) {
                    case DATE_FORMATS.ISO8601:
                        formatted = this.formatAsIso(dates);
                        break;
                    case DATE_FORMATS.STRING:
                        formatted = this.formatValue(dates);
                        break;
                    default:
                        formatted = dates;
                        break;
                }
                this.valueChange.emit(dates);
                fn(formatted);
            }
        };
    }
    extractDatesFromInput(value) {
        const [startStr, endStr] = value.split(' - ');
        const startDate = DateUtil.parse(startStr);
        const endDate = DateUtil.parse(endStr);
        return { startDate, endDate };
    }
    validate(dateStr) {
        const { startDate, endDate } = this.extractDatesFromInput(dateStr);
        return isValid(startDate) && isValid(endDate);
    }
}
NovoDateRangeFormatDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateRangeFormatDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.IMaskFactory }, { token: COMPOSITION_BUFFER_MODE, optional: true }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
NovoDateRangeFormatDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: { dateRangeFormat: "dateRangeFormat" }, host: { classAttribute: "novo-date-range-format" }, providers: [DATERANGEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateRangeFormatDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateRangeFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[dateRangeFormat]',
                    host: {
                        class: 'novo-date-range-format',
                    },
                    providers: [DATERANGEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateRangeFormatDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.IMaskFactory }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [COMPOSITION_BUFFER_MODE]
                }] }, { type: i2.NovoLabelService }]; }, propDecorators: { dateRangeFormat: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2ZpZWxkL2Zvcm1hdHMvZGF0ZS1yYW5nZS1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBRTFELE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHO0lBQzVDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztJQUMzRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFjRixNQUFNLE9BQU8sNEJBQTZCLFNBQVEsY0FBbUI7SUFLbkUsWUFDVSxRQUFvQixFQUM1QixTQUFvQixFQUNwQixRQUFzQixFQUN1QixnQkFBeUIsRUFDOUQsTUFBd0I7UUFFaEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFB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dmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IElNYXNrRGlyZWN0aXZlLCBJTWFza0ZhY3RvcnkgfSBmcm9tICdhbmd1bGFyLWltYXNrJztcbmltcG9ydCB7IGlzVmFsaWQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBNYXNrZWRSYW5nZSB9IGZyb20gJ2ltYXNrJztcbmltcG9ydCB7IERBVEVfRk9STUFUUywgTk9WT19JTlBVVF9GT1JNQVQgfSBmcm9tICcuL2Jhc2UtZm9ybWF0JztcbmltcG9ydCB7IERhdGVVdGlsIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscydcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcblxuZXhwb3J0IGNvbnN0IERBVEVSQU5HRUZPUk1BVF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlUmFuZ2VGb3JtYXREaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbnR5cGUgRGF0ZVJhbmdlID0ge1xuICBzdGFydERhdGU6IERhdGU7XG4gIGVuZERhdGU6IERhdGU7XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtkYXRlUmFuZ2VGb3JtYXRdJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1kYXRlLXJhbmdlLWZvcm1hdCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW0RBVEVSQU5HRUZPUk1BVF9WQUxVRV9BQ0NFU1NPUiwgeyBwcm92aWRlOiBOT1ZPX0lOUFVUX0ZPUk1BVCwgdXNlRXhpc3Rpbmc6IE5vdm9EYXRlUmFuZ2VGb3JtYXREaXJlY3RpdmUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUmFuZ2VGb3JtYXREaXJlY3RpdmUgZXh0ZW5kcyBJTWFza0RpcmVjdGl2ZTxhbnk+IHtcbiAgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIGRhdGVSYW5nZUZvcm1hdDogREFURV9GT1JNQVRTID0gREFURV9GT1JNQVRTLkRBVEU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBfZmFjdG9yeTogSU1hc2tGYWN0b3J5LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQ09NUE9TSVRJT05fQlVGRkVSX01PREUpIF9jb21wb3NpdGlvbk1vZGU6IGJvb2xlYW4sXG4gICAgcHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKF9lbGVtZW50LCBfcmVuZGVyZXIsIF9mYWN0b3J5LCBfY29tcG9zaXRpb25Nb2RlKTtcbiAgICBjb25zdCBkYXRlUmFuZ2VGb3JtYXQgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG5cbiAgICB0aGlzLnVubWFzayA9IGZhbHNlO1xuICAgIHRoaXMuaW1hc2sgPSB7XG4gICAgICBtYXNrOiAnbXsvfWBkey99YFkgLSBtey99YGR7L31gWScsXG4gICAgICBvdmVyd3JpdGU6IHRydWUsXG4gICAgICBhdXRvZml4OiB0cnVlLFxuICAgICAgbGF6eTogZmFsc2UsXG4gICAgICBibG9ja3M6IHtcbiAgICAgICAgZDoge1xuICAgICAgICAgIG1hc2s6IE1hc2tlZFJhbmdlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ0QnLFxuICAgICAgICAgIGZyb206IDEsXG4gICAgICAgICAgdG86IDMxLFxuICAgICAgICAgIG1heExlbmd0aDogMixcbiAgICAgICAgfSxcbiAgICAgICAgbToge1xuICAgICAgICAgIG1hc2s6IE1hc2tlZFJhbmdlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ00nLFxuICAgICAgICAgIGZyb206IDEsXG4gICAgICAgICAgdG86IDEyLFxuICAgICAgICAgIG1heExlbmd0aDogMixcbiAgICAgICAgfSxcbiAgICAgICAgWToge1xuICAgICAgICAgIG1hc2s6IE1hc2tlZFJhbmdlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ1knLFxuICAgICAgICAgIGZyb206IDE5MDAsXG4gICAgICAgICAgdG86IDk5OTksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBub3JtYWxpemUodmFsdWU6IHN0cmluZyB8IERhdGUpIHtcbiAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBEYXRlVXRpbC5mb3JtYXQoRGF0ZVV0aWwucGFyc2UodmFsdWUpLCBwYXR0ZXJuKTtcbiAgfVxuXG4gIGZvcm1hdEFzSXNvKHZhbHVlOiBEYXRlUmFuZ2UpOiBzdHJpbmcge1xuICAgIGlmICghdmFsdWUpIHJldHVybiAnJztcbiAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdmFsdWU7XG4gICAgaWYgKHN0YXJ0RGF0ZSAmJiBpc1ZhbGlkKHN0YXJ0RGF0ZSkgJiYgZW5kRGF0ZSAmJiBpc1ZhbGlkKGVuZERhdGUpKSB7XG4gICAgICBjb25zdCBzdGFydElzbyA9IHN0YXJ0RGF0ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTtcbiAgICAgIGNvbnN0IGVuZElzbyA9IGVuZERhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgICByZXR1cm4gYCR7c3RhcnRJc299LyR7ZW5kSXNvfWA7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZm9ybWF0VmFsdWUodmFsdWU6IERhdGVSYW5nZSk6IHN0cmluZyB7XG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuICcnO1xuICAgIGNvbnN0IHsgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB2YWx1ZTtcbiAgICByZXR1cm4gYCR7dGhpcy5mb3JtYXREYXRlKHN0YXJ0RGF0ZSl9IC0gJHt0aGlzLmZvcm1hdERhdGUoZW5kRGF0ZSl9YDtcbiAgfVxuXG4gIGZvcm1hdERhdGUoc291cmNlOiBEYXRlIHwgc3RyaW5nKSB7XG4gICAgY29uc3QgZGF0ZSA9IERhdGVVdGlsLnBhcnNlKHNvdXJjZSk7XG4gICAgaWYgKGlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgIGNvbnN0IGRhdGVSYW5nZUZvcm1hdCA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICAgIHJldHVybiBEYXRlVXRpbC5mb3JtYXQoZGF0ZSwgZGF0ZVJhbmdlRm9ybWF0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKHNvdXJjZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUodmFsdWUpO1xuICAgIGlmIChmb3JtYXR0ZWRWYWx1ZSAhPT0gdGhpcy5tYXNrVmFsdWUpIHtcbiAgICAgIHN1cGVyLndyaXRlVmFsdWUodGhpcy5mb3JtYXRWYWx1ZSh2YWx1ZSkpO1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmZvcm1hdFZhbHVlKHZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSAoaW5wdXQ6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMudmFsaWRhdGUoaW5wdXQpKSB7XG4gICAgICAgIGNvbnN0IGRhdGVzID0gdGhpcy5leHRyYWN0RGF0ZXNGcm9tSW5wdXQoaW5wdXQpO1xuICAgICAgICBsZXQgZm9ybWF0dGVkOiBEYXRlUmFuZ2UgfCBzdHJpbmcgPSBkYXRlcztcbiAgICAgICAgc3dpdGNoICh0aGlzLmRhdGVSYW5nZUZvcm1hdCkge1xuICAgICAgICAgIGNhc2UgREFURV9GT1JNQVRTLklTTzg2MDE6XG4gICAgICAgICAgICBmb3JtYXR0ZWQgPSB0aGlzLmZvcm1hdEFzSXNvKGRhdGVzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgREFURV9GT1JNQVRTLlNUUklORzpcbiAgICAgICAgICAgIGZvcm1hdHRlZCA9IHRoaXMuZm9ybWF0VmFsdWUoZGF0ZXMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGZvcm1hdHRlZCA9IGRhdGVzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KGRhdGVzKTtcbiAgICAgICAgZm4oZm9ybWF0dGVkKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZXh0cmFjdERhdGVzRnJvbUlucHV0KHZhbHVlKSB7XG4gICAgY29uc3QgW3N0YXJ0U3RyLCBlbmRTdHJdID0gdmFsdWUuc3BsaXQoJyAtICcpO1xuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IERhdGVVdGlsLnBhcnNlKHN0YXJ0U3RyKTtcbiAgICBjb25zdCBlbmREYXRlID0gRGF0ZVV0aWwucGFyc2UoZW5kU3RyKTtcbiAgICByZXR1cm4geyBzdGFydERhdGUsIGVuZERhdGUgfTtcbiAgfVxuXG4gIHZhbGlkYXRlKGRhdGVTdHI6IHN0cmluZykge1xuICAgIGNvbnN0IHsgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLmV4dHJhY3REYXRlc0Zyb21JbnB1dChkYXRlU3RyKTtcbiAgICByZXR1cm4gaXNWYWxpZChzdGFydERhdGUpICYmIGlzVmFsaWQoZW5kRGF0ZSk7XG4gIH1cbn1cbiJdfQ==