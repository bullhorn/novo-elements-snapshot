import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { isValid } from 'date-fns';
import { MaskedRange } from 'imask';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil } from 'novo-elements/utils';
import { DATE_FORMATS, NOVO_INPUT_FORMAT } from './base-format';
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
            parse: (str) => DateUtil.parse(str),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC9mb3JtYXRzL2RhdGUtZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUVoRSxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRztJQUN2QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUM7SUFDdEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBU0YsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGNBQW1CO0lBSzlELFlBQ1UsUUFBb0IsRUFDNUIsU0FBb0IsRUFDcEIsUUFBc0IsRUFDdUIsZ0JBQXlCLEVBQzlELE1BQXdCO1FBRWhDLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFB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OzswQkFBSSxNQUFNOzJCQUFDLHVCQUF1QjsyRUFOcEMsVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT01QT1NJVElPTl9CVUZGRVJfTU9ERSwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZSwgSU1hc2tGYWN0b3J5IH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgTWFza2VkUmFuZ2UgfSBmcm9tICdpbWFzayc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBEYXRlVXRpbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgREFURV9GT1JNQVRTLCBOT1ZPX0lOUFVUX0ZPUk1BVCB9IGZyb20gJy4vYmFzZS1mb3JtYXQnO1xuXG5leHBvcnQgY29uc3QgREFURUZPUk1BVF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtkYXRlRm9ybWF0XScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZGF0ZS1mb3JtYXQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtEQVRFRk9STUFUX1ZBTFVFX0FDQ0VTU09SLCB7IHByb3ZpZGU6IE5PVk9fSU5QVVRfRk9STUFULCB1c2VFeGlzdGluZzogTm92b0RhdGVGb3JtYXREaXJlY3RpdmUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlIGV4dGVuZHMgSU1hc2tEaXJlY3RpdmU8YW55PiB7XG4gIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBkYXRlRm9ybWF0OiBEQVRFX0ZPUk1BVFMgPSBEQVRFX0ZPUk1BVFMuREFURTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIF9mYWN0b3J5OiBJTWFza0ZhY3RvcnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChDT01QT1NJVElPTl9CVUZGRVJfTU9ERSkgX2NvbXBvc2l0aW9uTW9kZTogYm9vbGVhbixcbiAgICBwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoX2VsZW1lbnQsIF9yZW5kZXJlciwgX2ZhY3RvcnksIF9jb21wb3NpdGlvbk1vZGUpO1xuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG5cbiAgICB0aGlzLnVubWFzayA9ICd0eXBlZCc7XG4gICAgdGhpcy5pbWFzayA9IHtcbiAgICAgIG1hc2s6IERhdGUsXG4gICAgICBwYXR0ZXJuOiAnbXsvfWBkey99YFknLFxuICAgICAgb3ZlcndyaXRlOiB0cnVlLFxuICAgICAgYXV0b2ZpeDogdHJ1ZSxcbiAgICAgIGxhenk6IGZhbHNlLFxuICAgICAgbWluOiBuZXcgRGF0ZSgxOTAwLCAwLCAxKSxcbiAgICAgIG1heDogbmV3IERhdGUoMjAzMCwgMCwgMSksXG4gICAgICBwcmVwYXJlOiAoc3RyKSA9PiBzdHIudG9VcHBlckNhc2UoKSxcbiAgICAgIGZvcm1hdDogKGRhdGUpID0+IHRoaXMuZm9ybWF0VmFsdWUoZGF0ZSksXG4gICAgICBwYXJzZTogKHN0cikgPT4gRGF0ZVV0aWwucGFyc2Uoc3RyKSxcbiAgICAgIGJsb2Nrczoge1xuICAgICAgICBkOiB7XG4gICAgICAgICAgbWFzazogTWFza2VkUmFuZ2UsXG4gICAgICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnRCcsXG4gICAgICAgICAgZnJvbTogMSxcbiAgICAgICAgICB0bzogMzEsXG4gICAgICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgICAgICB9LFxuICAgICAgICBtOiB7XG4gICAgICAgICAgbWFzazogTWFza2VkUmFuZ2UsXG4gICAgICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnTScsXG4gICAgICAgICAgZnJvbTogMSxcbiAgICAgICAgICB0bzogMTIsXG4gICAgICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgICAgICB9LFxuICAgICAgICBZOiB7XG4gICAgICAgICAgbWFzazogTWFza2VkUmFuZ2UsXG4gICAgICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnWScsXG4gICAgICAgICAgZnJvbTogMTkwMCxcbiAgICAgICAgICB0bzogOTk5OSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGF0dGVybiA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICByZXR1cm4gRGF0ZVV0aWwuZm9ybWF0KERhdGVVdGlsLnBhcnNlKHZhbHVlKSwgcGF0dGVybik7XG4gIH1cblxuICBmb3JtYXRBc0lzbyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICBpZiAoZGF0ZSAmJiBpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmb3JtYXRWYWx1ZSh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuICcnO1xuICAgIC8vIFVzZSBgcGFyc2VgIGJlY2F1c2UgaXQga2VlcHMgZGF0ZXMgaW4gbG9jYWxlXG4gICAgY29uc3QgZGF0ZSA9IERhdGVVdGlsLnBhcnNlKHZhbHVlKTtcbiAgICBpZiAoaXNWYWxpZChkYXRlKSkge1xuICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICAgIHJldHVybiBEYXRlVXRpbC5mb3JtYXQoZGF0ZSwgZGF0ZUZvcm1hdCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZSh2YWx1ZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBzdXBlci53cml0ZVZhbHVlKHRoaXMuZm9ybWF0VmFsdWUodmFsdWUpKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gKGRhdGU6IGFueSkgPT4ge1xuICAgICAgbGV0IGZvcm1hdHRlZCA9IGRhdGU7XG4gICAgICBzd2l0Y2ggKHRoaXMuZGF0ZUZvcm1hdCkge1xuICAgICAgICBjYXNlIERBVEVfRk9STUFUUy5JU084NjAxOlxuICAgICAgICAgIGZvcm1hdHRlZCA9IHRoaXMuZm9ybWF0QXNJc28oZGF0ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgREFURV9GT1JNQVRTLlNUUklORzpcbiAgICAgICAgICBmb3JtYXR0ZWQgPSB0aGlzLmZvcm1hdFZhbHVlKGRhdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGZvcm1hdHRlZCA9IGRhdGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICBmbihmb3JtYXR0ZWQpO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==