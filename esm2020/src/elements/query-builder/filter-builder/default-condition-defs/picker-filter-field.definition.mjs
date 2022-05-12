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
import * as i7 from "@angular/common";
/**
 * Handle selection of field values when a list of options is provided.
 */
export class NovoDefaultPickerFilterFieldDef extends DefaultFilterFieldDef {
    constructor(_fb) {
        super(_fb);
        this.defaultOperator = 'includeAny';
    }
}
NovoDefaultPickerFilterFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultPickerFilterFieldDef, deps: [{ token: i1.FilterBuilderComponent, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoDefaultPickerFilterFieldDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoDefaultPickerFilterFieldDef, selector: "novo-picker-filter-field-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="includeAll">Include All</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select formControlName="value" placeholder="Select..." [multiple]="true">
          <!-- WHat about optionUrl/optionType -->
          <novo-option *ngFor="let option of meta?.options" [value]="option.value">
            {{ option.label }}
          </novo-option>
        </novo-select>
      </novo-field>
    </ng-container>
  `, isInline: true, components: [{ type: i2.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i3.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "inert", "value", "disabled"], exportAs: ["novoOption"] }], directives: [{ type: i5.NovoFilterFieldTypeDef, selector: "[novoFilterFieldTypeDef]" }, { type: i5.NovoFilterFieldOperatorsDef, selector: "[novoFilterFieldOperatorsDef]" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.NovoFilterFieldInputDef, selector: "[novoFilterFieldInputDef]" }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultPickerFilterFieldDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-picker-filter-field-def',
                    template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="includeAll">Include All</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select formControlName="value" placeholder="Select..." [multiple]="true">
          <!-- WHat about optionUrl/optionType -->
          <novo-option *ngFor="let option of meta?.options" [value]="option.value">
            {{ option.label }}
          </novo-option>
        </novo-select>
      </novo-field>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }], ctorParameters: function () { return [{ type: i1.FilterBuilderComponent, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLWZpbHRlci1maWVsZC5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9maWx0ZXItYnVpbGRlci9kZWZhdWx0LWNvbmRpdGlvbi1kZWZzL3BpY2tlci1maWx0ZXItZmllbGQuZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Ozs7O0FBRTFFOztHQUVHO0FBeUJILE1BQU0sT0FBTywrQkFBZ0MsU0FBUSxxQkFBcUI7SUFHeEUsWUFBd0IsR0FBZ0M7UUFDdEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBSGIsb0JBQWUsR0FBRyxZQUFZLENBQUM7SUFJL0IsQ0FBQzs7NEhBTFUsK0JBQStCO2dIQUEvQiwrQkFBK0IsMkZBdEJoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JUOzJGQUlVLCtCQUErQjtrQkF4QjNDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRDs7MEJBSWMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9wdGlvbmFsLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyQnVpbGRlckNvbXBvbmVudCB9IGZyb20gJy4uL2ZpbHRlci1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWZhdWx0RmlsdGVyRmllbGREZWYgfSBmcm9tICcuL2RlZmF1bHQtZmlsdGVyLWZpZWxkLmRlZmluaXRpb24nO1xuXG4vKipcbiAqIEhhbmRsZSBzZWxlY3Rpb24gb2YgZmllbGQgdmFsdWVzIHdoZW4gYSBsaXN0IG9mIG9wdGlvbnMgaXMgcHJvdmlkZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcGlja2VyLWZpbHRlci1maWVsZC1kZWYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbm92b0ZpbHRlckZpZWxkVHlwZURlZj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvRmlsdGVyRmllbGRPcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0IHBsYWNlaG9sZGVyPVwiT3BlcmF0b3IuLi5cIiBmb3JtQ29udHJvbE5hbWU9XCJvcGVyYXRvclwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluY2x1ZGVBbnlcIj5JbmNsdWRlIEFueTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFsbFwiPkluY2x1ZGUgQWxsPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJleGNsdWRlQW55XCI+RXhjbHVkZTwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bm92by1maWVsZCAqbm92b0ZpbHRlckZpZWxkSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwOyBmaWVsZE1ldGEgYXMgbWV0YVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiIHBsYWNlaG9sZGVyPVwiU2VsZWN0Li4uXCIgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICAgICAgICA8IS0tIFdIYXQgYWJvdXQgb3B0aW9uVXJsL29wdGlvblR5cGUgLS0+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgbWV0YT8ub3B0aW9uc1wiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIj5cbiAgICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHRQaWNrZXJGaWx0ZXJGaWVsZERlZiBleHRlbmRzIERlZmF1bHRGaWx0ZXJGaWVsZERlZiB7XG4gIGRlZmF1bHRPcGVyYXRvciA9ICdpbmNsdWRlQW55JztcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBfZmI6IEZpbHRlckJ1aWxkZXJDb21wb25lbnQ8YW55Pikge1xuICAgIHN1cGVyKF9mYik7XG4gIH1cbn1cbiJdfQ==