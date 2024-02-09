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
            max: new Date(2100, 0, 1),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC9mb3JtYXRzL2RhdGUtZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFFckYsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUc7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0lBQ3RELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQVNGLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxjQUFtQjtJQUs5RCxZQUNVLFFBQW9CLEVBQzVCLFNBQW9CLEVBQ3BCLFFBQXNCLEVBQ3VCLGdCQUF5QixFQUM5RCxNQUF3QjtRQUVoQyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQU4vQyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBSXBCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBVGxDLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFM0MsZUFBVSxHQUF3QixZQUFZLENBQUMsSUFBSSxDQUFDO1FBVTNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXhELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6QixHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekIsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO1lBQ25DLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDeEMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNuQyxNQUFNLEVBQUU7Z0JBQ04sQ0FBQyxFQUFFO29CQUNELElBQUksRUFBRSxXQUFXO29CQUNqQixlQUFlLEVBQUUsR0FBRztvQkFDcEIsSUFBSSxFQUFFLENBQUM7b0JBQ1AsRUFBRSxFQUFFLEVBQUU7b0JBQ04sU0FBUyxFQUFFLENBQUM7aUJBQ2I7Z0JBQ0QsQ0FBQyxFQUFFO29CQUNELElBQUksRUFBRSxXQUFXO29CQUNqQixlQUFlLEVBQUUsR0FBRztvQkFDcEIsSUFBSSxFQUFFLENBQUM7b0JBQ1AsRUFBRSxFQUFFLEVBQUU7b0JBQ04sU0FBUyxFQUFFLENBQUM7aUJBQ2I7Z0JBQ0QsQ0FBQyxFQUFFO29CQUNELElBQUksRUFBRSxXQUFXO29CQUNqQixlQUFlLEVBQUUsR0FBRztvQkFDcEIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsRUFBRSxFQUFFLElBQUk7aUJBQ1Q7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWE7UUFDckIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFVO1FBQ3BCLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVU7UUFDcEIsSUFBSSxLQUFLLElBQUksSUFBSTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzdCLCtDQUErQztRQUMvQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFvQjtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLFFBQVEsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDdkIsS0FBSyxZQUFZLENBQUMsT0FBTztvQkFDdkIsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLE1BQU07Z0JBQ1IsS0FBSyxZQUFZLENBQUMsTUFBTTtvQkFDdEIsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLE1BQU07Z0JBQ1I7b0JBQ0UsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDakIsTUFBTTthQUNUO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQztJQUNKLENBQUM7O3FIQWhHVSx1QkFBdUIsaUdBU1osdUJBQXVCO3lHQVRsQyx1QkFBdUIsZ0lBRnZCLENBQUMseUJBQXlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLENBQUM7NEZBRWpHLHVCQUF1QjtrQkFQbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtxQkFDMUI7b0JBQ0QsU0FBUyxFQUFFLENBQUMseUJBQXlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyx5QkFBeUIsRUFBRSxDQUFDO2lCQUM3Rzs7MEJBVUksUUFBUTs7MEJBQUksTUFBTTsyQkFBQyx1QkFBdUI7MkVBTnBDLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ09NUE9TSVRJT05fQlVGRkVSX01PREUsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSU1hc2tEaXJlY3RpdmUsIElNYXNrRmFjdG9yeSB9IGZyb20gJ2FuZ3VsYXItaW1hc2snO1xuaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IE1hc2tlZFJhbmdlIH0gZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZVV0aWwgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IERBVEVfRk9STUFUX1NUUklOR1MsIERBVEVfRk9STUFUUywgTk9WT19JTlBVVF9GT1JNQVQgfSBmcm9tICcuL2Jhc2UtZm9ybWF0JztcblxuZXhwb3J0IGNvbnN0IERBVEVGT1JNQVRfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvRGF0ZUZvcm1hdERpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbZGF0ZUZvcm1hdF0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWRhdGUtZm9ybWF0JyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbREFURUZPUk1BVF9WQUxVRV9BQ0NFU1NPUiwgeyBwcm92aWRlOiBOT1ZPX0lOUFVUX0ZPUk1BVCwgdXNlRXhpc3Rpbmc6IE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZUZvcm1hdERpcmVjdGl2ZSBleHRlbmRzIElNYXNrRGlyZWN0aXZlPGFueT4ge1xuICB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgZGF0ZUZvcm1hdDogREFURV9GT1JNQVRfU1RSSU5HUyA9IERBVEVfRk9STUFUUy5EQVRFO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgX2ZhY3Rvcnk6IElNYXNrRmFjdG9yeSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFKSBfY29tcG9zaXRpb25Nb2RlOiBib29sZWFuLFxuICAgIHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihfZWxlbWVudCwgX3JlbmRlcmVyLCBfZmFjdG9yeSwgX2NvbXBvc2l0aW9uTW9kZSk7XG4gICAgY29uc3QgZGF0ZUZvcm1hdCA9IHRoaXMubGFiZWxzLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcblxuICAgIHRoaXMudW5tYXNrID0gJ3R5cGVkJztcbiAgICB0aGlzLmltYXNrID0ge1xuICAgICAgbWFzazogRGF0ZSxcbiAgICAgIHBhdHRlcm46ICdtey99YGR7L31gWScsXG4gICAgICBvdmVyd3JpdGU6IHRydWUsXG4gICAgICBhdXRvZml4OiB0cnVlLFxuICAgICAgbGF6eTogZmFsc2UsXG4gICAgICBtaW46IG5ldyBEYXRlKDE5MDAsIDAsIDEpLFxuICAgICAgbWF4OiBuZXcgRGF0ZSgyMTAwLCAwLCAxKSxcbiAgICAgIHByZXBhcmU6IChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpLFxuICAgICAgZm9ybWF0OiAoZGF0ZSkgPT4gdGhpcy5mb3JtYXRWYWx1ZShkYXRlKSxcbiAgICAgIHBhcnNlOiAoc3RyKSA9PiBEYXRlVXRpbC5wYXJzZShzdHIpLFxuICAgICAgYmxvY2tzOiB7XG4gICAgICAgIGQ6IHtcbiAgICAgICAgICBtYXNrOiBNYXNrZWRSYW5nZSxcbiAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdEJyxcbiAgICAgICAgICBmcm9tOiAxLFxuICAgICAgICAgIHRvOiAzMSxcbiAgICAgICAgICBtYXhMZW5ndGg6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIG06IHtcbiAgICAgICAgICBtYXNrOiBNYXNrZWRSYW5nZSxcbiAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdNJyxcbiAgICAgICAgICBmcm9tOiAxLFxuICAgICAgICAgIHRvOiAxMixcbiAgICAgICAgICBtYXhMZW5ndGg6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIFk6IHtcbiAgICAgICAgICBtYXNrOiBNYXNrZWRSYW5nZSxcbiAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdZJyxcbiAgICAgICAgICBmcm9tOiAxOTAwLFxuICAgICAgICAgIHRvOiA5OTk5LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgbm9ybWFsaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBEYXRlVXRpbC5mb3JtYXQoRGF0ZVV0aWwucGFyc2UodmFsdWUpLCBwYXR0ZXJuKTtcbiAgfVxuXG4gIGZvcm1hdEFzSXNvKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGlmIChkYXRlICYmIGlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvcm1hdFZhbHVlKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gJyc7XG4gICAgLy8gVXNlIGBwYXJzZWAgYmVjYXVzZSBpdCBrZWVwcyBkYXRlcyBpbiBsb2NhbGVcbiAgICBjb25zdCBkYXRlID0gRGF0ZVV0aWwucGFyc2UodmFsdWUpO1xuICAgIGlmIChpc1ZhbGlkKGRhdGUpKSB7XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gdGhpcy5sYWJlbHMuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgICAgcmV0dXJuIERhdGVVdGlsLmZvcm1hdChkYXRlLCBkYXRlRm9ybWF0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKHZhbHVlKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHN1cGVyLndyaXRlVmFsdWUodGhpcy5mb3JtYXRWYWx1ZSh2YWx1ZSkpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSAoZGF0ZTogYW55KSA9PiB7XG4gICAgICBsZXQgZm9ybWF0dGVkID0gZGF0ZTtcbiAgICAgIHN3aXRjaCAodGhpcy5kYXRlRm9ybWF0KSB7XG4gICAgICAgIGNhc2UgREFURV9GT1JNQVRTLklTTzg2MDE6XG4gICAgICAgICAgZm9ybWF0dGVkID0gdGhpcy5mb3JtYXRBc0lzbyhkYXRlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBEQVRFX0ZPUk1BVFMuU1RSSU5HOlxuICAgICAgICAgIGZvcm1hdHRlZCA9IHRoaXMuZm9ybWF0VmFsdWUoZGF0ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZm9ybWF0dGVkID0gZGF0ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgIGZuKGZvcm1hdHRlZCk7XG4gICAgfTtcbiAgfVxufVxuIl19