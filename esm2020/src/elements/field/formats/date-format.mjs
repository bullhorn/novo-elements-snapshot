import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, PLATFORM_ID, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { format, isValid, parse } from 'date-fns';
import * as IMask from 'imask';
import { NovoLabelService } from '../../../services/novo-label-service';
import { NOVO_INPUT_FORMAT } from './base-format';
import * as i0 from "@angular/core";
import * as i1 from "angular-imask";
import * as i2 from "../../../services/novo-label-service";
export const DATEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateFormatDirective),
    multi: true,
};
export var DATE_FORMATS;
(function (DATE_FORMATS) {
    DATE_FORMATS["DATE"] = "date";
    DATE_FORMATS["ISO8601"] = "iso8601";
    DATE_FORMATS["STRING"] = "string";
})(DATE_FORMATS || (DATE_FORMATS = {}));
export class NovoDateFormatDirective extends IMaskDirective {
    constructor(_element, _renderer, _factory, _platformId, _compositionMode, labels) {
        super(_element, _renderer, _factory, _platformId, _compositionMode);
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
            min: new Date(1970, 0, 1),
            max: new Date(2030, 0, 1),
            prepare: (str) => str.toUpperCase(),
            format: (date) => this.formatValue(date),
            parse: (str) => {
                return parse(str);
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
        return format(parse(value), pattern);
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
        const date = parse(value);
        if (isValid(date)) {
            const dateFormat = this.labels.dateFormat.toUpperCase();
            return format(date, dateFormat);
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
NovoDateFormatDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateFormatDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.IMaskFactory }, { token: PLATFORM_ID, optional: true }, { token: COMPOSITION_BUFFER_MODE, optional: true }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
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
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [COMPOSITION_BUFFER_MODE]
                }] }, { type: i2.NovoLabelService }]; }, propDecorators: { dateFormat: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC9mb3JtYXRzL2RhdGUtZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEQsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRWxELE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHO0lBQ3ZDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztJQUN0RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixNQUFNLENBQU4sSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3RCLDZCQUFhLENBQUE7SUFDYixtQ0FBbUIsQ0FBQTtJQUNuQixpQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSlcsWUFBWSxLQUFaLFlBQVksUUFJdkI7QUFTRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsY0FBbUI7SUFLOUQs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LEVBQUU7d0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtxQkFDMUI7b0JBQ0QsU0FBUyxFQUFFLENBQUMseUJBQXlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyx5QkFBeUIsRUFBRSxDQUFDO2lCQUM3Rzs7MEJBVUksUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxXQUFXOzswQkFDOUIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyx1QkFBdUI7MkVBUHBDLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IElNYXNrRGlyZWN0aXZlLCBJTWFza0ZhY3RvcnkgfSBmcm9tICdhbmd1bGFyLWltYXNrJztcbmltcG9ydCB7IGZvcm1hdCwgaXNWYWxpZCwgcGFyc2UgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgKiBhcyBJTWFzayBmcm9tICdpbWFzayc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IE5PVk9fSU5QVVRfRk9STUFUIH0gZnJvbSAnLi9iYXNlLWZvcm1hdCc7XG5cbmV4cG9ydCBjb25zdCBEQVRFRk9STUFUX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVGb3JtYXREaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBlbnVtIERBVEVfRk9STUFUUyB7XG4gIERBVEUgPSAnZGF0ZScsXG4gIElTTzg2MDEgPSAnaXNvODYwMScsXG4gIFNUUklORyA9ICdzdHJpbmcnLFxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtkYXRlRm9ybWF0XScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZGF0ZS1mb3JtYXQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtEQVRFRk9STUFUX1ZBTFVFX0FDQ0VTU09SLCB7IHByb3ZpZGU6IE5PVk9fSU5QVVRfRk9STUFULCB1c2VFeGlzdGluZzogTm92b0RhdGVGb3JtYXREaXJlY3RpdmUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlIGV4dGVuZHMgSU1hc2tEaXJlY3RpdmU8YW55PiB7XG4gIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBkYXRlRm9ybWF0OiBEQVRFX0ZPUk1BVFMgPSBEQVRFX0ZPUk1BVFMuREFURTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIF9mYWN0b3J5OiBJTWFza0ZhY3RvcnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChQTEFURk9STV9JRCkgX3BsYXRmb3JtSWQ6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFKSBfY29tcG9zaXRpb25Nb2RlOiBib29sZWFuLFxuICAgIHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihfZWxlbWVudCwgX3JlbmRlcmVyLCBfZmFjdG9yeSwgX3BsYXRmb3JtSWQsIF9jb21wb3NpdGlvbk1vZGUpO1xuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG5cbiAgICB0aGlzLnVubWFzayA9ICd0eXBlZCc7XG4gICAgdGhpcy5pbWFzayA9IHtcbiAgICAgIG1hc2s6IERhdGUsXG4gICAgICBwYXR0ZXJuOiAnbXsvfWBkey99YFknLFxuICAgICAgb3ZlcndyaXRlOiB0cnVlLFxuICAgICAgYXV0b2ZpeDogdHJ1ZSxcbiAgICAgIGxhenk6IGZhbHNlLFxuICAgICAgbWluOiBuZXcgRGF0ZSgxOTcwLCAwLCAxKSxcbiAgICAgIG1heDogbmV3IERhdGUoMjAzMCwgMCwgMSksXG4gICAgICBwcmVwYXJlOiAoc3RyKSA9PiBzdHIudG9VcHBlckNhc2UoKSxcbiAgICAgIGZvcm1hdDogKGRhdGUpID0+IHRoaXMuZm9ybWF0VmFsdWUoZGF0ZSksXG4gICAgICBwYXJzZTogKHN0cikgPT4ge1xuICAgICAgICByZXR1cm4gcGFyc2Uoc3RyKTtcbiAgICAgIH0sXG4gICAgICBibG9ja3M6IHtcbiAgICAgICAgZDoge1xuICAgICAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ0QnLFxuICAgICAgICAgIGZyb206IDEsXG4gICAgICAgICAgdG86IDMxLFxuICAgICAgICAgIG1heExlbmd0aDogMixcbiAgICAgICAgfSxcbiAgICAgICAgbToge1xuICAgICAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ00nLFxuICAgICAgICAgIGZyb206IDEsXG4gICAgICAgICAgdG86IDEyLFxuICAgICAgICAgIG1heExlbmd0aDogMixcbiAgICAgICAgfSxcbiAgICAgICAgWToge1xuICAgICAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ1knLFxuICAgICAgICAgIGZyb206IDE5MDAsXG4gICAgICAgICAgdG86IDk5OTksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBub3JtYWxpemUodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBhdHRlcm4gPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIGZvcm1hdChwYXJzZSh2YWx1ZSksIHBhdHRlcm4pO1xuICB9XG5cbiAgZm9ybWF0QXNJc28oZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgaWYgKGRhdGUgJiYgaXNWYWxpZChkYXRlKSkge1xuICAgICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZm9ybWF0VmFsdWUodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiAnJztcbiAgICAvLyBVc2UgYHBhcnNlYCBiZWNhdXNlIGl0IGtlZXBzIGRhdGVzIGluIGxvY2FsZVxuICAgIGNvbnN0IGRhdGUgPSBwYXJzZSh2YWx1ZSk7XG4gICAgaWYgKGlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG4gICAgICByZXR1cm4gZm9ybWF0KGRhdGUsIGRhdGVGb3JtYXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ub3JtYWxpemUodmFsdWUpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgc3VwZXIud3JpdGVWYWx1ZSh0aGlzLmZvcm1hdFZhbHVlKHZhbHVlKSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IChkYXRlOiBhbnkpID0+IHtcbiAgICAgIGxldCBmb3JtYXR0ZWQgPSBkYXRlO1xuICAgICAgc3dpdGNoICh0aGlzLmRhdGVGb3JtYXQpIHtcbiAgICAgICAgY2FzZSBEQVRFX0ZPUk1BVFMuSVNPODYwMTpcbiAgICAgICAgICBmb3JtYXR0ZWQgPSB0aGlzLmZvcm1hdEFzSXNvKGRhdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIERBVEVfRk9STUFUUy5TVFJJTkc6XG4gICAgICAgICAgZm9ybWF0dGVkID0gdGhpcy5mb3JtYXRWYWx1ZShkYXRlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBmb3JtYXR0ZWQgPSBkYXRlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgZm4oZm9ybWF0dGVkKTtcbiAgICB9O1xuICB9XG59XG4iXX0=