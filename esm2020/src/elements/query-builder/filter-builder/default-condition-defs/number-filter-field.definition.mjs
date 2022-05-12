import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DefaultFilterFieldDef } from './default-filter-field.definition';
import * as i0 from "@angular/core";
import * as i1 from "../../../field/field";
import * as i2 from "../../../select/Select";
import * as i3 from "../../../common/option/option.component";
import * as i4 from "../base-filter-field.definition";
import * as i5 from "@angular/forms";
import * as i6 from "../../../field/input";
/**
 * When constructing a query using a field that is an Int, Double, Number ...etc.
 * TODO: Do we implment currency formation here potentially>.?
 */
export class NovoDefaultNumberFilterFieldDef extends DefaultFilterFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'equalTo';
    }
}
NovoDefaultNumberFilterFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultNumberFilterFieldDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultNumberFilterFieldDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoDefaultNumberFilterFieldDef, selector: "novo-number-filter-field-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="greaterThan">Greater Than</novo-option>
          <novo-option value="lessThan">Less Than</novo-option>
          <novo-option value="equalTo">Equal To</novo-option>
          <!-- <novo-option value="equalTo">Between</novo-option> -->
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
        <input novoInput type="number" formControlName="value" />
      </novo-field>
    </ng-container>
  `, isInline: true, components: [{ type: i1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "inert", "value", "disabled"], exportAs: ["novoOption"] }], directives: [{ type: i4.NovoFilterFieldTypeDef, selector: "[novoFilterFieldTypeDef]" }, { type: i4.NovoFilterFieldOperatorsDef, selector: "[novoFilterFieldOperatorsDef]" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.NovoFilterFieldInputDef, selector: "[novoFilterFieldInputDef]" }, { type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i5.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultNumberFilterFieldDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-number-filter-field-def',
                    template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="greaterThan">Greater Than</novo-option>
          <novo-option value="lessThan">Less Than</novo-option>
          <novo-option value="equalTo">Equal To</novo-option>
          <!-- <novo-option value="equalTo">Between</novo-option> -->
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
        <input novoInput type="number" formControlName="value" />
      </novo-field>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWZpbHRlci1maWVsZC5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9maWx0ZXItYnVpbGRlci9kZWZhdWx0LWNvbmRpdGlvbi1kZWZzL251bWJlci1maWx0ZXItZmllbGQuZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7OztBQUUxRTs7O0dBR0c7QUFxQkgsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLHFCQUFxQjtJQXBCMUU7O1FBcUJFLG9CQUFlLEdBQUcsU0FBUyxDQUFDO0tBQzdCOzs0SEFGWSwrQkFBK0I7Z0hBQS9CLCtCQUErQiwyRkFsQmhDOzs7Ozs7Ozs7Ozs7OztHQWNUOzJGQUlVLCtCQUErQjtrQkFwQjNDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVmYXVsdEZpbHRlckZpZWxkRGVmIH0gZnJvbSAnLi9kZWZhdWx0LWZpbHRlci1maWVsZC5kZWZpbml0aW9uJztcblxuLyoqXG4gKiBXaGVuIGNvbnN0cnVjdGluZyBhIHF1ZXJ5IHVzaW5nIGEgZmllbGQgdGhhdCBpcyBhbiBJbnQsIERvdWJsZSwgTnVtYmVyIC4uLmV0Yy5cbiAqIFRPRE86IERvIHdlIGltcGxtZW50IGN1cnJlbmN5IGZvcm1hdGlvbiBoZXJlIHBvdGVudGlhbGx5Pi4/XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbnVtYmVyLWZpbHRlci1maWVsZC1kZWYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbm92b0ZpbHRlckZpZWxkVHlwZURlZj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvRmlsdGVyRmllbGRPcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0IHBsYWNlaG9sZGVyPVwiT3BlcmF0b3IuLi5cIiBmb3JtQ29udHJvbE5hbWU9XCJvcGVyYXRvclwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImdyZWF0ZXJUaGFuXCI+R3JlYXRlciBUaGFuPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJsZXNzVGhhblwiPkxlc3MgVGhhbjwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiZXF1YWxUb1wiPkVxdWFsIFRvPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8IS0tIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImVxdWFsVG9cIj5CZXR3ZWVuPC9ub3ZvLW9wdGlvbj4gLS0+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bm92by1maWVsZCAqbm92b0ZpbHRlckZpZWxkSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwXCIgW3N0eWxlLndpZHRoLnB4XT1cIjEwMFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgdHlwZT1cIm51bWJlclwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIgLz5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdE51bWJlckZpbHRlckZpZWxkRGVmIGV4dGVuZHMgRGVmYXVsdEZpbHRlckZpZWxkRGVmIHtcbiAgZGVmYXVsdE9wZXJhdG9yID0gJ2VxdWFsVG8nO1xufVxuIl19