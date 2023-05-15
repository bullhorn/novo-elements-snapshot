import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { format, isValid, parse } from 'date-fns';
import * as IMask from 'imask';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DATE_FORMATS, NOVO_INPUT_FORMAT } from './base-format';
import * as i0 from "@angular/core";
import * as i1 from "angular-imask";
import * as i2 from "../../../services/novo-label-service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC9mb3JtYXRzL2RhdGUtZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRWhFLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHO0lBQ3ZDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztJQUN0RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFTRixNQUFNLE9BQU8sdUJBQXdCLFNBQVEsY0FBbUI7SUFLOUQsWUFDVSxRQUFvQixFQUM1QixTQUFvQixFQUNwQixRQUFzQixFQUN1QixnQkFBeUIsRUFDOUQsTUFBd0I7UUFFaEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFOL0Ms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QjsyRUFOcEMsVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT01QT1NJVElPTl9CVUZGRVJfTU9ERSwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZSwgSU1hc2tGYWN0b3J5IH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG5pbXBvcnQgeyBmb3JtYXQsIGlzVmFsaWQsIHBhcnNlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgSU1hc2sgZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBEQVRFX0ZPUk1BVFMsIE5PVk9fSU5QVVRfRk9STUFUIH0gZnJvbSAnLi9iYXNlLWZvcm1hdCc7XG5cbmV4cG9ydCBjb25zdCBEQVRFRk9STUFUX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0RhdGVGb3JtYXREaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W2RhdGVGb3JtYXRdJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1kYXRlLWZvcm1hdCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW0RBVEVGT1JNQVRfVkFMVUVfQUNDRVNTT1IsIHsgcHJvdmlkZTogTk9WT19JTlBVVF9GT1JNQVQsIHVzZUV4aXN0aW5nOiBOb3ZvRGF0ZUZvcm1hdERpcmVjdGl2ZSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVGb3JtYXREaXJlY3RpdmUgZXh0ZW5kcyBJTWFza0RpcmVjdGl2ZTxhbnk+IHtcbiAgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIGRhdGVGb3JtYXQ6IERBVEVfRk9STUFUUyA9IERBVEVfRk9STUFUUy5EQVRFO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgX2ZhY3Rvcnk6IElNYXNrRmFjdG9yeSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFKSBfY29tcG9zaXRpb25Nb2RlOiBib29sZWFuLFxuICAgIHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihfZWxlbWVudCwgX3JlbmRlcmVyLCBfZmFjdG9yeSwgX2NvbXBvc2l0aW9uTW9kZSk7XG4gICAgY29uc3QgZGF0ZUZvcm1hdCA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcblxuICAgIHRoaXMudW5tYXNrID0gJ3R5cGVkJztcbiAgICB0aGlzLmltYXNrID0ge1xuICAgICAgbWFzazogRGF0ZSxcbiAgICAgIHBhdHRlcm46ICdtey99YGR7L31gWScsXG4gICAgICBvdmVyd3JpdGU6IHRydWUsXG4gICAgICBhdXRvZml4OiB0cnVlLFxuICAgICAgbGF6eTogZmFsc2UsXG4gICAgICBtaW46IG5ldyBEYXRlKDE5MDAsIDAsIDEpLFxuICAgICAgbWF4OiBuZXcgRGF0ZSgyMDMwLCAwLCAxKSxcbiAgICAgIHByZXBhcmU6IChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpLFxuICAgICAgZm9ybWF0OiAoZGF0ZSkgPT4gdGhpcy5mb3JtYXRWYWx1ZShkYXRlKSxcbiAgICAgIHBhcnNlOiAoc3RyKSA9PiB7XG4gICAgICAgIHJldHVybiBwYXJzZShzdHIpO1xuICAgICAgfSxcbiAgICAgIGJsb2Nrczoge1xuICAgICAgICBkOiB7XG4gICAgICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnRCcsXG4gICAgICAgICAgZnJvbTogMSxcbiAgICAgICAgICB0bzogMzEsXG4gICAgICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgICAgICB9LFxuICAgICAgICBtOiB7XG4gICAgICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnTScsXG4gICAgICAgICAgZnJvbTogMSxcbiAgICAgICAgICB0bzogMTIsXG4gICAgICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgICAgICB9LFxuICAgICAgICBZOiB7XG4gICAgICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnWScsXG4gICAgICAgICAgZnJvbTogMTkwMCxcbiAgICAgICAgICB0bzogOTk5OSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGF0dGVybiA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICByZXR1cm4gZm9ybWF0KHBhcnNlKHZhbHVlKSwgcGF0dGVybik7XG4gIH1cblxuICBmb3JtYXRBc0lzbyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICBpZiAoZGF0ZSAmJiBpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmb3JtYXRWYWx1ZSh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuICcnO1xuICAgIC8vIFVzZSBgcGFyc2VgIGJlY2F1c2UgaXQga2VlcHMgZGF0ZXMgaW4gbG9jYWxlXG4gICAgY29uc3QgZGF0ZSA9IHBhcnNlKHZhbHVlKTtcbiAgICBpZiAoaXNWYWxpZChkYXRlKSkge1xuICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICAgIHJldHVybiBmb3JtYXQoZGF0ZSwgZGF0ZUZvcm1hdCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZSh2YWx1ZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBzdXBlci53cml0ZVZhbHVlKHRoaXMuZm9ybWF0VmFsdWUodmFsdWUpKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gKGRhdGU6IGFueSkgPT4ge1xuICAgICAgbGV0IGZvcm1hdHRlZCA9IGRhdGU7XG4gICAgICBzd2l0Y2ggKHRoaXMuZGF0ZUZvcm1hdCkge1xuICAgICAgICBjYXNlIERBVEVfRk9STUFUUy5JU084NjAxOlxuICAgICAgICAgIGZvcm1hdHRlZCA9IHRoaXMuZm9ybWF0QXNJc28oZGF0ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgREFURV9GT1JNQVRTLlNUUklORzpcbiAgICAgICAgICBmb3JtYXR0ZWQgPSB0aGlzLmZvcm1hdFZhbHVlKGRhdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGZvcm1hdHRlZCA9IGRhdGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICBmbihmb3JtYXR0ZWQpO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==