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
            // pattern: 'm{/}`d{/}`Y - m{/}`d{/}`Y',
            overwrite: true,
            autofix: true,
            lazy: false,
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
        const date = parse(source);
        if (isValid(date)) {
            const dateRangeFormat = this.labels.dateFormat.toUpperCase();
            return format(date, dateRangeFormat);
        }
        return this.normalize(source);
    }
    writeValue(value) {
        super.writeValue(this.formatValue(value));
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
        const startDate = parse(startStr);
        const endDate = parse(endStr);
        return { startDate, endDate };
    }
    validate(dateStr) {
        const { startDate, endDate } = this.extractDatesFromInput(dateStr);
        return isValid(startDate) && isValid(endDate);
    }
}
NovoDateRangeFormatDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDateRangeFormatDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.IMaskFactory }, { token: COMPOSITION_BUFFER_MODE, optional: true }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
NovoDateRangeFormatDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: { dateRangeFormat: "dateRangeFormat" }, host: { classAttribute: "novo-date-range-format" }, providers: [DATERANGEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateRangeFormatDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDateRangeFormatDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC9mb3JtYXRzL2RhdGUtcmFuZ2UtZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRWhFLE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHO0lBQzVDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztJQUMzRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFjRixNQUFNLE9BQU8sNEJBQTZCLFNBQVEsY0FBbUI7SUFLbkUsWUFDVSxRQUFvQixFQUM1QixTQUFvQixFQUNwQixRQUFzQixFQUN1QixnQkFBeUIsRUFDOUQsTUFBd0I7UUFFaEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFD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QUM7UUFDbEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxPQUFlO1FBQ3RCLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDOzt5SEFsSFUsNEJBQTRCLGlHQVNqQix1QkFBdUI7NkdBVGxDLDRCQUE0QixxSkFGNUIsQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQzsyRkFFM0csNEJBQTRCO2tCQVB4QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsd0JBQXdCO3FCQUNoQztvQkFDRCxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLDhCQUE4QixFQUFFLENBQUM7aUJBQ3ZIOzswQkFVSSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLHVCQUF1QjsyRUFOcEMsZUFBZTtzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT01QT1NJVElPTl9CVUZGRVJfTU9ERSwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZSwgSU1hc2tGYWN0b3J5IH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG5pbXBvcnQgeyBmb3JtYXQsIGlzVmFsaWQsIHBhcnNlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgSU1hc2sgZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBEQVRFX0ZPUk1BVFMsIE5PVk9fSU5QVVRfRk9STUFUIH0gZnJvbSAnLi9iYXNlLWZvcm1hdCc7XG5cbmV4cG9ydCBjb25zdCBEQVRFUkFOR0VGT1JNQVRfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvRGF0ZVJhbmdlRm9ybWF0RGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG50eXBlIERhdGVSYW5nZSA9IHtcbiAgc3RhcnREYXRlOiBEYXRlO1xuICBlbmREYXRlOiBEYXRlO1xufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbZGF0ZVJhbmdlRm9ybWF0XScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZGF0ZS1yYW5nZS1mb3JtYXQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtEQVRFUkFOR0VGT1JNQVRfVkFMVUVfQUNDRVNTT1IsIHsgcHJvdmlkZTogTk9WT19JTlBVVF9GT1JNQVQsIHVzZUV4aXN0aW5nOiBOb3ZvRGF0ZVJhbmdlRm9ybWF0RGlyZWN0aXZlIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZVJhbmdlRm9ybWF0RGlyZWN0aXZlIGV4dGVuZHMgSU1hc2tEaXJlY3RpdmU8YW55PiB7XG4gIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBkYXRlUmFuZ2VGb3JtYXQ6IERBVEVfRk9STUFUUyA9IERBVEVfRk9STUFUUy5EQVRFO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgX2ZhY3Rvcnk6IElNYXNrRmFjdG9yeSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFKSBfY29tcG9zaXRpb25Nb2RlOiBib29sZWFuLFxuICAgIHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihfZWxlbWVudCwgX3JlbmRlcmVyLCBfZmFjdG9yeSwgX2NvbXBvc2l0aW9uTW9kZSk7XG4gICAgY29uc3QgZGF0ZVJhbmdlRm9ybWF0ID0gdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuXG4gICAgdGhpcy51bm1hc2sgPSBmYWxzZTtcbiAgICB0aGlzLmltYXNrID0ge1xuICAgICAgbWFzazogJ217L31gZHsvfWBZIC0gbXsvfWBkey99YFknLFxuICAgICAgLy8gcGF0dGVybjogJ217L31gZHsvfWBZIC0gbXsvfWBkey99YFknLFxuICAgICAgb3ZlcndyaXRlOiB0cnVlLFxuICAgICAgYXV0b2ZpeDogdHJ1ZSxcbiAgICAgIGxhenk6IGZhbHNlLFxuICAgICAgYmxvY2tzOiB7XG4gICAgICAgIGQ6IHtcbiAgICAgICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdEJyxcbiAgICAgICAgICBmcm9tOiAxLFxuICAgICAgICAgIHRvOiAzMSxcbiAgICAgICAgICBtYXhMZW5ndGg6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIG06IHtcbiAgICAgICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdNJyxcbiAgICAgICAgICBmcm9tOiAxLFxuICAgICAgICAgIHRvOiAxMixcbiAgICAgICAgICBtYXhMZW5ndGg6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIFk6IHtcbiAgICAgICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdZJyxcbiAgICAgICAgICBmcm9tOiAxOTAwLFxuICAgICAgICAgIHRvOiA5OTk5LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgbm9ybWFsaXplKHZhbHVlOiBzdHJpbmcgfCBEYXRlKSB7XG4gICAgY29uc3QgcGF0dGVybiA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICByZXR1cm4gZm9ybWF0KHBhcnNlKHZhbHVlKSwgcGF0dGVybik7XG4gIH1cblxuICBmb3JtYXRBc0lzbyh2YWx1ZTogRGF0ZVJhbmdlKTogc3RyaW5nIHtcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gJyc7XG4gICAgY29uc3QgeyBzdGFydERhdGUsIGVuZERhdGUgfSA9IHZhbHVlO1xuICAgIGlmIChzdGFydERhdGUgJiYgaXNWYWxpZChzdGFydERhdGUpICYmIGVuZERhdGUgJiYgaXNWYWxpZChlbmREYXRlKSkge1xuICAgICAgY29uc3Qgc3RhcnRJc28gPSBzdGFydERhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgICBjb25zdCBlbmRJc28gPSBlbmREYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICAgICAgcmV0dXJuIGAke3N0YXJ0SXNvfS8ke2VuZElzb31gO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvcm1hdFZhbHVlKHZhbHVlOiBEYXRlUmFuZ2UpOiBzdHJpbmcge1xuICAgIGlmICghdmFsdWUpIHJldHVybiAnJztcbiAgICBjb25zdCB7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdmFsdWU7XG4gICAgcmV0dXJuIGAke3RoaXMuZm9ybWF0RGF0ZShzdGFydERhdGUpfSAtICR7dGhpcy5mb3JtYXREYXRlKGVuZERhdGUpfWA7XG4gIH1cblxuICBmb3JtYXREYXRlKHNvdXJjZTogRGF0ZSB8IHN0cmluZykge1xuICAgIGNvbnN0IGRhdGUgPSBwYXJzZShzb3VyY2UpO1xuICAgIGlmIChpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICBjb25zdCBkYXRlUmFuZ2VGb3JtYXQgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG4gICAgICByZXR1cm4gZm9ybWF0KGRhdGUsIGRhdGVSYW5nZUZvcm1hdCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZShzb3VyY2UpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgc3VwZXIud3JpdGVWYWx1ZSh0aGlzLmZvcm1hdFZhbHVlKHZhbHVlKSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IChpbnB1dDogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy52YWxpZGF0ZShpbnB1dCkpIHtcbiAgICAgICAgY29uc3QgZGF0ZXMgPSB0aGlzLmV4dHJhY3REYXRlc0Zyb21JbnB1dChpbnB1dCk7XG4gICAgICAgIGxldCBmb3JtYXR0ZWQ6IERhdGVSYW5nZSB8IHN0cmluZyA9IGRhdGVzO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGF0ZVJhbmdlRm9ybWF0KSB7XG4gICAgICAgICAgY2FzZSBEQVRFX0ZPUk1BVFMuSVNPODYwMTpcbiAgICAgICAgICAgIGZvcm1hdHRlZCA9IHRoaXMuZm9ybWF0QXNJc28oZGF0ZXMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBEQVRFX0ZPUk1BVFMuU1RSSU5HOlxuICAgICAgICAgICAgZm9ybWF0dGVkID0gdGhpcy5mb3JtYXRWYWx1ZShkYXRlcyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZm9ybWF0dGVkID0gZGF0ZXM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoZGF0ZXMpO1xuICAgICAgICBmbihmb3JtYXR0ZWQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBleHRyYWN0RGF0ZXNGcm9tSW5wdXQodmFsdWUpIHtcbiAgICBjb25zdCBbc3RhcnRTdHIsIGVuZFN0cl0gPSB2YWx1ZS5zcGxpdCgnIC0gJyk7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gcGFyc2Uoc3RhcnRTdHIpO1xuICAgIGNvbnN0IGVuZERhdGUgPSBwYXJzZShlbmRTdHIpO1xuICAgIHJldHVybiB7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9O1xuICB9XG5cbiAgdmFsaWRhdGUoZGF0ZVN0cjogc3RyaW5nKSB7XG4gICAgY29uc3QgeyBzdGFydERhdGUsIGVuZERhdGUgfSA9IHRoaXMuZXh0cmFjdERhdGVzRnJvbUlucHV0KGRhdGVTdHIpO1xuICAgIHJldHVybiBpc1ZhbGlkKHN0YXJ0RGF0ZSkgJiYgaXNWYWxpZChlbmREYXRlKTtcbiAgfVxufVxuIl19