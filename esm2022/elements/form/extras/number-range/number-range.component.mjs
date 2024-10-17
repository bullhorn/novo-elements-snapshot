import { Component, forwardRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
import * as i4 from "novo-elements/elements/flex";
import * as i5 from "novo-elements/elements/field";
export class NumberRangeComponent {
    constructor(labels, fb) {
        this.labels = labels;
        this.fb = fb;
        this._onChange = () => { };
        this._onTouched = () => { };
        this._destroyed = new Subject();
    }
    ngOnInit() {
        this.rangeForm = this.fb.group({ min: null, max: null }, { validators: this.minLessThanMaxValidator });
        // Notify parent form when the value changes (and it's valid)
        this.rangeForm.valueChanges.pipe(takeUntil(this._destroyed), filter(() => this.rangeForm.valid)).subscribe(value => this._onChange(value));
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    minLessThanMaxValidator(group) {
        const min = group.get('min').value;
        const max = group.get('max').value;
        const hasError = !Helpers.isBlank(min) && !Helpers.isBlank(max) && min > max;
        const error = hasError ? { minGreaterThanMax: true } : null;
        group.get('min').setErrors(error); // sets error styling
        group.get('max').setErrors(error);
        return error;
    }
    writeValue(value) {
        if (value) {
            this.rangeForm.setValue(value, { emitEvent: false });
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.rangeForm.disable() : this.rangeForm.enable();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NumberRangeComponent, deps: [{ token: i1.NovoLabelService }, { token: i2.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: NumberRangeComponent, selector: "novo-number-range", providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NumberRangeComponent),
                multi: true
            }
        ], ngImport: i0, template: `
    <form [formGroup]="rangeForm">
      <novo-flex justify='space-between' align='end' gap="1rem">
        <novo-field mr="sm">
          <input formControlName="min" novoInput type='number' [placeholder]="labels.minimumPlaceholder"/>
        </novo-field>
        <novo-field ml="sm">
          <input formControlName="max" novoInput type='number' [placeholder]="labels.maximumPlaceholder"/>
        </novo-field>
      </novo-flex>
      <novo-error *ngIf="rangeForm.hasError('minGreaterThanMax')" style="position: absolute">
        {{ labels.minGreaterThanMax }}
      </novo-error>
    </form>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "component", type: i4.NovoFlexElement, selector: "novo-flex,novo-row", inputs: ["direction", "align", "justify", "wrap", "gap"] }, { kind: "component", type: i5.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "component", type: i5.NovoErrorElement, selector: "novo-error" }, { kind: "directive", type: i5.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NumberRangeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-number-range',
                    template: `
    <form [formGroup]="rangeForm">
      <novo-flex justify='space-between' align='end' gap="1rem">
        <novo-field mr="sm">
          <input formControlName="min" novoInput type='number' [placeholder]="labels.minimumPlaceholder"/>
        </novo-field>
        <novo-field ml="sm">
          <input formControlName="max" novoInput type='number' [placeholder]="labels.maximumPlaceholder"/>
        </novo-field>
      </novo-flex>
      <novo-error *ngIf="rangeForm.hasError('minGreaterThanMax')" style="position: absolute">
        {{ labels.minGreaterThanMax }}
      </novo-error>
    </form>
  `,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NumberRangeComponent),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i2.FormBuilder }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXJhbmdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vZXh0cmFzL251bWJlci1yYW5nZS9udW1iZXItcmFuZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQXdCLFdBQVcsRUFBYSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUEyQm5ELE1BQU0sT0FBTyxvQkFBb0I7SUFNL0IsWUFBbUIsTUFBd0IsRUFBVSxFQUFlO1FBQWpELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUpwRSxjQUFTLEdBQXlCLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QyxlQUFVLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFFK0IsQ0FBQztJQUV6RSxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7UUFFdkcsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDOUIsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDMUIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQ25DLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxLQUFnQjtRQUN0QyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNuQyxNQUFNLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0UsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDNUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7UUFDeEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQW1DO1FBQzVDLElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsRSxDQUFDOytHQWpEVSxvQkFBb0I7bUdBQXBCLG9CQUFvQiw0Q0FScEI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNuRCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsMEJBckJTOzs7Ozs7Ozs7Ozs7OztHQWNUOzs0RkFTVSxvQkFBb0I7a0JBekJoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUM7NEJBQ25ELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbnVtYmVyLXJhbmdlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInJhbmdlRm9ybVwiPlxuICAgICAgPG5vdm8tZmxleCBqdXN0aWZ5PSdzcGFjZS1iZXR3ZWVuJyBhbGlnbj0nZW5kJyBnYXA9XCIxcmVtXCI+XG4gICAgICAgIDxub3ZvLWZpZWxkIG1yPVwic21cIj5cbiAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibWluXCIgbm92b0lucHV0IHR5cGU9J251bWJlcicgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5taW5pbXVtUGxhY2Vob2xkZXJcIi8+XG4gICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPG5vdm8tZmllbGQgbWw9XCJzbVwiPlxuICAgICAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJtYXhcIiBub3ZvSW5wdXQgdHlwZT0nbnVtYmVyJyBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLm1heGltdW1QbGFjZWhvbGRlclwiLz5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPC9ub3ZvLWZsZXg+XG4gICAgICA8bm92by1lcnJvciAqbmdJZj1cInJhbmdlRm9ybS5oYXNFcnJvcignbWluR3JlYXRlclRoYW5NYXgnKVwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlXCI+XG4gICAgICAgIHt7IGxhYmVscy5taW5HcmVhdGVyVGhhbk1heCB9fVxuICAgICAgPC9ub3ZvLWVycm9yPlxuICAgIDwvZm9ybT5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOdW1iZXJSYW5nZUNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJSYW5nZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHJhbmdlRm9ybTogRm9ybUdyb3VwO1xuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICBfb25Ub3VjaGVkID0gKCkgPT4geyB9O1xuICBwcml2YXRlIF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJhbmdlRm9ybSA9IHRoaXMuZmIuZ3JvdXAoeyBtaW46IG51bGwsIG1heDogbnVsbCB9LCB7IHZhbGlkYXRvcnM6IHRoaXMubWluTGVzc1RoYW5NYXhWYWxpZGF0b3IgfSk7XG5cbiAgICAvLyBOb3RpZnkgcGFyZW50IGZvcm0gd2hlbiB0aGUgdmFsdWUgY2hhbmdlcyAoYW5kIGl0J3MgdmFsaWQpXG4gICAgdGhpcy5yYW5nZUZvcm0udmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSxcbiAgICAgIGZpbHRlcigoKSA9PiB0aGlzLnJhbmdlRm9ybS52YWxpZClcbiAgICApLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLl9vbkNoYW5nZSh2YWx1ZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIG1pbkxlc3NUaGFuTWF4VmFsaWRhdG9yKGdyb3VwOiBGb3JtR3JvdXApOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB8IG51bGwge1xuICAgIGNvbnN0IG1pbiA9IGdyb3VwLmdldCgnbWluJykudmFsdWU7XG4gICAgY29uc3QgbWF4ID0gZ3JvdXAuZ2V0KCdtYXgnKS52YWx1ZTtcbiAgICBjb25zdCBoYXNFcnJvciA9ICFIZWxwZXJzLmlzQmxhbmsobWluKSAmJiAhSGVscGVycy5pc0JsYW5rKG1heCkgJiYgbWluID4gbWF4O1xuICAgIGNvbnN0IGVycm9yID0gaGFzRXJyb3IgPyB7IG1pbkdyZWF0ZXJUaGFuTWF4OiB0cnVlIH0gOiBudWxsO1xuICAgIGdyb3VwLmdldCgnbWluJykuc2V0RXJyb3JzKGVycm9yKTsgLy8gc2V0cyBlcnJvciBzdHlsaW5nXG4gICAgZ3JvdXAuZ2V0KCdtYXgnKS5zZXRFcnJvcnMoZXJyb3IpO1xuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHsgbWluOiBudW1iZXIsIG1heDogbnVtYmVyIH0pOiB2b2lkIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMucmFuZ2VGb3JtLnNldFZhbHVlKHZhbHVlLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlzRGlzYWJsZWQgPyB0aGlzLnJhbmdlRm9ybS5kaXNhYmxlKCkgOiB0aGlzLnJhbmdlRm9ybS5lbmFibGUoKTtcbiAgfVxufVxuIl19