import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { isValid } from 'date-fns';
import * as IMask from 'imask';
import { DateUtil } from 'novo-elements/utils';
import { DATE_FORMATS, NOVO_INPUT_FORMAT } from './base-format';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "angular-imask";
import * as i2 from "novo-elements/services";
export const DATEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateFormatDirective),
    multi: true,
};
export class NovoDateFormatDirective extends IMaskDirective {
    constructor(_element, _renderer, _factory, _compositionMode, labels) {
        super(_element, _renderer, _factory, _compositionMode);
        this._element = _element;
        this.labels = labels;
        this.valueChange = new EventEmitter();
        this.dateFormat = DATE_FORMATS.DATE;
        const dateFormat = this.labels.dateFormat.toUpperCase();
        this.unmask = 'typed';
        this.imask = {
            mask: Date,
            pattern: 'm{/}`d{/}`Y',
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1900, 0, 1),
            max: new Date(2030, 0, 1),
            prepare: (str) => str.toUpperCase(),
            format: (date) => this.formatValue(date),
            parse: (str) => {
                return DateUtil.parse(str);
            },
            blocks: {
                d: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'D',
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: IMask.MaskedRange,
                    placeholderChar: 'M',
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: IMask.MaskedRange,
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
    formatAsIso(date) {
        if (date && isValid(date)) {
            return date.toISOString().slice(0, 10);
        }
        return null;
    }
    formatValue(value) {
        if (value == null)
            return '';
        // Use `parse` because it keeps dates in locale
        const date = DateUtil.parse(value);
        if (isValid(date)) {
            const dateFormat = this.labels.dateFormat.toUpperCase();
            return DateUtil.format(date, dateFormat);
        }
        return this.normalize(value);
    }
    writeValue(value) {
        super.writeValue(this.formatValue(value));
    }
    registerOnChange(fn) {
        this.onChange = (date) => {
            let formatted = date;
            switch (this.dateFormat) {
                case DATE_FORMATS.ISO8601:
                    formatted = this.formatAsIso(date);
                    break;
                case DATE_FORMATS.STRING:
                    formatted = this.formatValue(date);
                    break;
                default:
                    formatted = date;
                    break;
            }
            this.valueChange.emit(date);
            fn(formatted);
        };
    }
}
NovoDateFormatDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateFormatDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.IMaskFactory }, { token: COMPOSITION_BUFFER_MODE, optional: true }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
NovoDateFormatDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDateFormatDirective, selector: "input[dateFormat]", inputs: { dateFormat: "dateFormat" }, host: { classAttribute: "novo-date-format" }, providers: [DATEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateFormatDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[dateFormat]',
                    host: {
                        class: 'novo-date-format',
                    },
                    providers: [DATEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateFormatDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.IMaskFactory }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [COMPOSITION_BUFFER_MODE]
                }] }, { type: i2.NovoLabelService }]; }, propDecorators: { dateFormat: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2ZpZWxkL2Zvcm1hdHMvZGF0ZS1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUUxRCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRztJQUN2QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUM7SUFDdEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBU0YsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGNBQW1CO0lBSzlELFlBQ1UsUUFBb0IsRUFDNUIsU0FBb0IsRUFDcEIsUUFBc0IsRUFDdUIsZ0JBQXlCLEVBQzlELE1BQXdCO1FBRWhDLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FB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QUFXLHlCQUF5QixFQUFFLENBQUM7aUJBQzdHOzswQkFVSSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLHVCQUF1QjsyRUFOcEMsVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT01QT1NJVElPTl9CVUZGRVJfTU9ERSwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZSwgSU1hc2tGYWN0b3J5IH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgSU1hc2sgZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgRGF0ZVV0aWwgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IERBVEVfRk9STUFUUywgTk9WT19JTlBVVF9GT1JNQVQgfSBmcm9tICcuL2Jhc2UtZm9ybWF0JztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcblxuZXhwb3J0IGNvbnN0IERBVEVGT1JNQVRfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvRGF0ZUZvcm1hdERpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbZGF0ZUZvcm1hdF0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWRhdGUtZm9ybWF0JyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbREFURUZPUk1BVF9WQUxVRV9BQ0NFU1NPUiwgeyBwcm92aWRlOiBOT1ZPX0lOUFVUX0ZPUk1BVCwgdXNlRXhpc3Rpbmc6IE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZUZvcm1hdERpcmVjdGl2ZSBleHRlbmRzIElNYXNrRGlyZWN0aXZlPGFueT4ge1xuICB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgZGF0ZUZvcm1hdDogREFURV9GT1JNQVRTID0gREFURV9GT1JNQVRTLkRBVEU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBfZmFjdG9yeTogSU1hc2tGYWN0b3J5LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQ09NUE9TSVRJT05fQlVGRkVSX01PREUpIF9jb21wb3NpdGlvbk1vZGU6IGJvb2xlYW4sXG4gICAgcHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKF9lbGVtZW50LCBfcmVuZGVyZXIsIF9mYWN0b3J5LCBfY29tcG9zaXRpb25Nb2RlKTtcbiAgICBjb25zdCBkYXRlRm9ybWF0ID0gdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuXG4gICAgdGhpcy51bm1hc2sgPSAndHlwZWQnO1xuICAgIHRoaXMuaW1hc2sgPSB7XG4gICAgICBtYXNrOiBEYXRlLFxuICAgICAgcGF0dGVybjogJ217L31gZHsvfWBZJyxcbiAgICAgIG92ZXJ3cml0ZTogdHJ1ZSxcbiAgICAgIGF1dG9maXg6IHRydWUsXG4gICAgICBsYXp5OiBmYWxzZSxcbiAgICAgIG1pbjogbmV3IERhdGUoMTkwMCwgMCwgMSksXG4gICAgICBtYXg6IG5ldyBEYXRlKDIwMzAsIDAsIDEpLFxuICAgICAgcHJlcGFyZTogKHN0cikgPT4gc3RyLnRvVXBwZXJDYXNlKCksXG4gICAgICBmb3JtYXQ6IChkYXRlKSA9PiB0aGlzLmZvcm1hdFZhbHVlKGRhdGUpLFxuICAgICAgcGFyc2U6IChzdHIpID0+IHtcbiAgICAgICAgcmV0dXJuIERhdGVVdGlsLnBhcnNlKHN0cik7XG4gICAgICB9LFxuICAgICAgYmxvY2tzOiB7XG4gICAgICAgIGQ6IHtcbiAgICAgICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdEJyxcbiAgICAgICAgICBmcm9tOiAxLFxuICAgICAgICAgIHRvOiAzMSxcbiAgICAgICAgICBtYXhMZW5ndGg6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIG06IHtcbiAgICAgICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdNJyxcbiAgICAgICAgICBmcm9tOiAxLFxuICAgICAgICAgIHRvOiAxMixcbiAgICAgICAgICBtYXhMZW5ndGg6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIFk6IHtcbiAgICAgICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdZJyxcbiAgICAgICAgICBmcm9tOiAxOTAwLFxuICAgICAgICAgIHRvOiA5OTk5LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgbm9ybWFsaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBEYXRlVXRpbC5mb3JtYXQoRGF0ZVV0aWwucGFyc2UodmFsdWUpLCBwYXR0ZXJuKTtcbiAgfVxuXG4gIGZvcm1hdEFzSXNvKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGlmIChkYXRlICYmIGlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvcm1hdFZhbHVlKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gJyc7XG4gICAgLy8gVXNlIGBwYXJzZWAgYmVjYXVzZSBpdCBrZWVwcyBkYXRlcyBpbiBsb2NhbGVcbiAgICBjb25zdCBkYXRlID0gRGF0ZVV0aWwucGFyc2UodmFsdWUpO1xuICAgIGlmIChpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgICAgcmV0dXJuIERhdGVVdGlsLmZvcm1hdChkYXRlLCBkYXRlRm9ybWF0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKHZhbHVlKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHN1cGVyLndyaXRlVmFsdWUodGhpcy5mb3JtYXRWYWx1ZSh2YWx1ZSkpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSAoZGF0ZTogYW55KSA9PiB7XG4gICAgICBsZXQgZm9ybWF0dGVkID0gZGF0ZTtcbiAgICAgIHN3aXRjaCAodGhpcy5kYXRlRm9ybWF0KSB7XG4gICAgICAgIGNhc2UgREFURV9GT1JNQVRTLklTTzg2MDE6XG4gICAgICAgICAgZm9ybWF0dGVkID0gdGhpcy5mb3JtYXRBc0lzbyhkYXRlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBEQVRFX0ZPUk1BVFMuU1RSSU5HOlxuICAgICAgICAgIGZvcm1hdHRlZCA9IHRoaXMuZm9ybWF0VmFsdWUoZGF0ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZm9ybWF0dGVkID0gZGF0ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgIGZuKGZvcm1hdHRlZCk7XG4gICAgfTtcbiAgfVxufVxuIl19