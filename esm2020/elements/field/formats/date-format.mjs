import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { format, isValid, parse } from 'date-fns';
import * as IMask from 'imask';
import { NovoLabelService } from 'novo-elements/services';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC9mb3JtYXRzL2RhdGUtZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRWhFLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHO0lBQ3ZDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztJQUN0RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFTRixNQUFNLE9BQU8sdUJBQXdCLFNBQVEsY0FBbUI7SUFLOUQsWUFDVSxRQUFvQixFQUM1QixTQUFvQixFQUNwQixRQUFzQixFQUN1QixnQkFBeUIsRUFDOUQsTUFBd0I7UUFFaEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFOL0MsYUFB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RUFOcEMsVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT01QT1NJVElPTl9CVUZGRVJfTU9ERSwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZSwgSU1hc2tGYWN0b3J5IH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG5pbXBvcnQgeyBmb3JtYXQsIGlzVmFsaWQsIHBhcnNlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgSU1hc2sgZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgREFURV9GT1JNQVRTLCBOT1ZPX0lOUFVUX0ZPUk1BVCB9IGZyb20gJy4vYmFzZS1mb3JtYXQnO1xuXG5leHBvcnQgY29uc3QgREFURUZPUk1BVF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtkYXRlRm9ybWF0XScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZGF0ZS1mb3JtYXQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtEQVRFRk9STUFUX1ZBTFVFX0FDQ0VTU09SLCB7IHByb3ZpZGU6IE5PVk9fSU5QVVRfRk9STUFULCB1c2VFeGlzdGluZzogTm92b0RhdGVGb3JtYXREaXJlY3RpdmUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlIGV4dGVuZHMgSU1hc2tEaXJlY3RpdmU8YW55PiB7XG4gIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBkYXRlRm9ybWF0OiBEQVRFX0ZPUk1BVFMgPSBEQVRFX0ZPUk1BVFMuREFURTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIF9mYWN0b3J5OiBJTWFza0ZhY3RvcnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChDT01QT1NJVElPTl9CVUZGRVJfTU9ERSkgX2NvbXBvc2l0aW9uTW9kZTogYm9vbGVhbixcbiAgICBwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoX2VsZW1lbnQsIF9yZW5kZXJlciwgX2ZhY3RvcnksIF9jb21wb3NpdGlvbk1vZGUpO1xuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG5cbiAgICB0aGlzLnVubWFzayA9ICd0eXBlZCc7XG4gICAgdGhpcy5pbWFzayA9IHtcbiAgICAgIG1hc2s6IERhdGUsXG4gICAgICBwYXR0ZXJuOiAnbXsvfWBkey99YFknLFxuICAgICAgb3ZlcndyaXRlOiB0cnVlLFxuICAgICAgYXV0b2ZpeDogdHJ1ZSxcbiAgICAgIGxhenk6IGZhbHNlLFxuICAgICAgbWluOiBuZXcgRGF0ZSgxOTAwLCAwLCAxKSxcbiAgICAgIG1heDogbmV3IERhdGUoMjAzMCwgMCwgMSksXG4gICAgICBwcmVwYXJlOiAoc3RyKSA9PiBzdHIudG9VcHBlckNhc2UoKSxcbiAgICAgIGZvcm1hdDogKGRhdGUpID0+IHRoaXMuZm9ybWF0VmFsdWUoZGF0ZSksXG4gICAgICBwYXJzZTogKHN0cikgPT4ge1xuICAgICAgICByZXR1cm4gcGFyc2Uoc3RyKTtcbiAgICAgIH0sXG4gICAgICBibG9ja3M6IHtcbiAgICAgICAgZDoge1xuICAgICAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ0QnLFxuICAgICAgICAgIGZyb206IDEsXG4gICAgICAgICAgdG86IDMxLFxuICAgICAgICAgIG1heExlbmd0aDogMixcbiAgICAgICAgfSxcbiAgICAgICAgbToge1xuICAgICAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ00nLFxuICAgICAgICAgIGZyb206IDEsXG4gICAgICAgICAgdG86IDEyLFxuICAgICAgICAgIG1heExlbmd0aDogMixcbiAgICAgICAgfSxcbiAgICAgICAgWToge1xuICAgICAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ1knLFxuICAgICAgICAgIGZyb206IDE5MDAsXG4gICAgICAgICAgdG86IDk5OTksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBub3JtYWxpemUodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBhdHRlcm4gPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIGZvcm1hdChwYXJzZSh2YWx1ZSksIHBhdHRlcm4pO1xuICB9XG5cbiAgZm9ybWF0QXNJc28oZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgaWYgKGRhdGUgJiYgaXNWYWxpZChkYXRlKSkge1xuICAgICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZm9ybWF0VmFsdWUodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiAnJztcbiAgICAvLyBVc2UgYHBhcnNlYCBiZWNhdXNlIGl0IGtlZXBzIGRhdGVzIGluIGxvY2FsZVxuICAgIGNvbnN0IGRhdGUgPSBwYXJzZSh2YWx1ZSk7XG4gICAgaWYgKGlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG4gICAgICByZXR1cm4gZm9ybWF0KGRhdGUsIGRhdGVGb3JtYXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ub3JtYWxpemUodmFsdWUpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgc3VwZXIud3JpdGVWYWx1ZSh0aGlzLmZvcm1hdFZhbHVlKHZhbHVlKSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IChkYXRlOiBhbnkpID0+IHtcbiAgICAgIGxldCBmb3JtYXR0ZWQgPSBkYXRlO1xuICAgICAgc3dpdGNoICh0aGlzLmRhdGVGb3JtYXQpIHtcbiAgICAgICAgY2FzZSBEQVRFX0ZPUk1BVFMuSVNPODYwMTpcbiAgICAgICAgICBmb3JtYXR0ZWQgPSB0aGlzLmZvcm1hdEFzSXNvKGRhdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIERBVEVfRk9STUFUUy5TVFJJTkc6XG4gICAgICAgICAgZm9ybWF0dGVkID0gdGhpcy5mb3JtYXRWYWx1ZShkYXRlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBmb3JtYXR0ZWQgPSBkYXRlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgZm4oZm9ybWF0dGVkKTtcbiAgICB9O1xuICB9XG59XG4iXX0=