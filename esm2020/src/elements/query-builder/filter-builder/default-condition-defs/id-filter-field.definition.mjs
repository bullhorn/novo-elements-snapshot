import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
import { FilterBuilderComponent } from '../filter-builder.component';
import { DefaultFilterFieldDef } from './default-filter-field.definition';
import * as i0 from "@angular/core";
import * as i1 from "../filter-builder.component";
import * as i2 from "../../../field/field";
import * as i3 from "../../../select/Select";
import * as i4 from "../../../common/option/option.component";
import * as i5 from "../base-filter-field.definition";
import * as i6 from "@angular/forms";
import * as i7 from "../../../field/input";
/**
 * Any condition that has a type of ID usually only is queried by ID.
 */
export class NovoDefaultIdFilterFieldDef extends DefaultFilterFieldDef {
    constructor(_fb) {
        super(_fb);
        this.defaultOperator = 'equalTo';
    }
}
NovoDefaultIdFilterFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultIdFilterFieldDef, deps: [{ token: i1.FilterBuilderComponent, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoDefaultIdFilterFieldDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoDefaultIdFilterFieldDef, selector: "novo-id-filter-field-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="equalTo">Equal To</novo-option>
          <ng-content></ng-content>
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
        <input novoInput type="number" formControlName="value" />
      </novo-field>
    </ng-container>
  `, isInline: true, components: [{ type: i2.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i3.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "inert", "value", "disabled"], exportAs: ["novoOption"] }], directives: [{ type: i5.NovoFilterFieldTypeDef, selector: "[novoFilterFieldTypeDef]" }, { type: i5.NovoFilterFieldOperatorsDef, selector: "[novoFilterFieldOperatorsDef]" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.NovoFilterFieldInputDef, selector: "[novoFilterFieldInputDef]" }, { type: i7.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i6.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultIdFilterFieldDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-id-filter-field-def',
                    template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="equalTo">Equal To</novo-option>
          <ng-content></ng-content>
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
        }], ctorParameters: function () { return [{ type: i1.FilterBuilderComponent, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtZmlsdGVyLWZpZWxkLmRlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2ZpbHRlci1idWlsZGVyL2RlZmF1bHQtY29uZGl0aW9uLWRlZnMvaWQtZmlsdGVyLWZpZWxkLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7OztBQUUxRTs7R0FFRztBQW1CSCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEscUJBQXFCO0lBR3BFLFlBQXdCLEdBQWdDO1FBQ3RELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUhiLG9CQUFlLEdBQUcsU0FBUyxDQUFDO0lBSTVCLENBQUM7O3dIQUxVLDJCQUEyQjs0R0FBM0IsMkJBQTJCLHVGQWhCNUI7Ozs7Ozs7Ozs7OztHQVlUOzJGQUlVLDJCQUEyQjtrQkFsQnZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEOzswQkFJYyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT3B0aW9uYWwsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJCdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWJ1aWxkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlZmF1bHRGaWx0ZXJGaWVsZERlZiB9IGZyb20gJy4vZGVmYXVsdC1maWx0ZXItZmllbGQuZGVmaW5pdGlvbic7XG5cbi8qKlxuICogQW55IGNvbmRpdGlvbiB0aGF0IGhhcyBhIHR5cGUgb2YgSUQgdXN1YWxseSBvbmx5IGlzIHF1ZXJpZWQgYnkgSUQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8taWQtZmlsdGVyLWZpZWxkLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBub3ZvRmlsdGVyRmllbGRUeXBlRGVmPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9GaWx0ZXJGaWVsZE9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgcGxhY2Vob2xkZXI9XCJPcGVyYXRvci4uLlwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiZXF1YWxUb1wiPkVxdWFsIFRvPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bm92by1maWVsZCAqbm92b0ZpbHRlckZpZWxkSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwXCIgW3N0eWxlLndpZHRoLnB4XT1cIjEwMFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgdHlwZT1cIm51bWJlclwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIgLz5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdElkRmlsdGVyRmllbGREZWYgZXh0ZW5kcyBEZWZhdWx0RmlsdGVyRmllbGREZWYge1xuICBkZWZhdWx0T3BlcmF0b3IgPSAnZXF1YWxUbyc7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgX2ZiOiBGaWx0ZXJCdWlsZGVyQ29tcG9uZW50PGFueT4pIHtcbiAgICBzdXBlcihfZmIpO1xuICB9XG59XG4iXX0=