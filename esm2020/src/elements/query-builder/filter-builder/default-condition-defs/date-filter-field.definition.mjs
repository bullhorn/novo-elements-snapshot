import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
import { FilterBuilderComponent } from '../filter-builder.component';
import { DefaultFilterFieldDef } from './default-filter-field.definition';
import * as i0 from "@angular/core";
import * as i1 from "../filter-builder.component";
import * as i2 from "../../../field/field";
import * as i3 from "../../../select/Select";
import * as i4 from "../../../common/option/option.component";
import * as i5 from "../../../field/toggle/picker-toggle.component";
import * as i6 from "../../../date-picker/DatePicker";
import * as i7 from "../base-filter-field.definition";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/common";
import * as i10 from "../../../common/directives/switch-cases.directive";
import * as i11 from "../../../field/input";
import * as i12 from "../../../field/formats/date-format";
import * as i13 from "../../../field/picker.directive";
import * as i14 from "../../../field/formats/date-range-format";
/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
export class NovoDefaultDateFilterFieldDef extends DefaultFilterFieldDef {
    constructor(_fb) {
        super(_fb);
        this.defaultOperator = 'within';
    }
}
NovoDefaultDateFilterFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultDateFilterFieldDef, deps: [{ token: i1.FilterBuilderComponent, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoDefaultDateFilterFieldDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoDefaultDateFilterFieldDef, selector: "novo-date-filter-field-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoFilterFieldTypeDef="DATE">
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="before">Before</novo-option>
          <novo-option value="after">After</novo-option>
          <novo-option value="between">Between</novo-option>
          <novo-option value="within">Within</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoFilterFieldInputDef="let formGroup">
        <ng-container [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
          <novo-field *novoSwitchCases="['before', 'after']">
            <input novoInput dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
            <novo-picker-toggle novoSuffix icon="calendar">
              <novo-date-picker #datepicker></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['between']">
            <input novoInput dateRangeFormat="iso8601" [picker]="daterangepicker" formControlName="value" />
            <novo-picker-toggle novoSuffix icon="calendar">
              <novo-date-picker #daterangepicker mode="range" numberOfMonths="2"></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['within']">
            <novo-select placeholder="Select Date Range..." formControlName="value">
              <novo-option value="7">Next Week</novo-option>
              <novo-option value="-7">Last Week</novo-option>
              <novo-option value="-30">Last 30 Days</novo-option>
              <novo-option value="-90">Last 90 Days</novo-option>
            </novo-select>
          </novo-field>
        </ng-container>
      </ng-container>
    </ng-container>
  `, isInline: true, components: [{ type: i2.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i3.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "inert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i5.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "disabled"], exportAs: ["novoPickerToggle"] }, { type: i6.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i7.NovoFilterFieldTypeDef, selector: "[novoFilterFieldTypeDef]" }, { type: i7.NovoFilterFieldOperatorsDef, selector: "[novoFilterFieldOperatorsDef]" }, { type: i8.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i8.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i7.NovoFilterFieldInputDef, selector: "[novoFilterFieldInputDef]" }, { type: i9.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i10.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i11.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i12.NovoDateFormatDirective, selector: "input[dateFormat]", inputs: ["dateFormat"] }, { type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i13.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { type: i2.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { type: i14.NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: ["dateRangeFormat"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultDateFilterFieldDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-filter-field-def',
                    template: `
    <ng-container novoFilterFieldTypeDef="DATE">
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="before">Before</novo-option>
          <novo-option value="after">After</novo-option>
          <novo-option value="between">Between</novo-option>
          <novo-option value="within">Within</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoFilterFieldInputDef="let formGroup">
        <ng-container [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
          <novo-field *novoSwitchCases="['before', 'after']">
            <input novoInput dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
            <novo-picker-toggle novoSuffix icon="calendar">
              <novo-date-picker #datepicker></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['between']">
            <input novoInput dateRangeFormat="iso8601" [picker]="daterangepicker" formControlName="value" />
            <novo-picker-toggle novoSuffix icon="calendar">
              <novo-date-picker #daterangepicker mode="range" numberOfMonths="2"></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['within']">
            <novo-select placeholder="Select Date Range..." formControlName="value">
              <novo-option value="7">Next Week</novo-option>
              <novo-option value="-7">Last Week</novo-option>
              <novo-option value="-30">Last 30 Days</novo-option>
              <novo-option value="-90">Last 90 Days</novo-option>
            </novo-select>
          </novo-field>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }], ctorParameters: function () { return [{ type: i1.FilterBuilderComponent, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1maWx0ZXItZmllbGQuZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvZmlsdGVyLWJ1aWxkZXIvZGVmYXVsdC1jb25kaXRpb24tZGVmcy9kYXRlLWZpbHRlci1maWVsZC5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBRTFFOzs7R0FHRztBQTBDSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEscUJBQXFCO0lBRXRFLFlBQXdCLEdBQWdDO1FBQ3RELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZiLG9CQUFlLEdBQUcsUUFBUSxDQUFDO0lBRzNCLENBQUM7OzBIQUpVLDZCQUE2Qjs4R0FBN0IsNkJBQTZCLHlGQXZDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNUOzJGQUlVLDZCQUE2QjtrQkF6Q3pDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEOzswQkFHYyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT3B0aW9uYWwsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJCdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWJ1aWxkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlZmF1bHRGaWx0ZXJGaWVsZERlZiB9IGZyb20gJy4vZGVmYXVsdC1maWx0ZXItZmllbGQuZGVmaW5pdGlvbic7XG5cbi8qKlxuICogTW9zdCBjb21wbGljYXRlZCBvZiB0aGUgZGVmYXVsdCBjb25kaXRpb25zIGRlZnMsIGEgZGF0ZSBuZWVkcyB0byBwcm92aWRlIGEgZGlmZmVyZW50XG4gKiBpbnB1dCB0eXBlIGRlcGVuZGluZyBvbiB0aGUgb3BlcmF0b3Igc2VsZWN0ZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0ZS1maWx0ZXItZmllbGQtZGVmJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIG5vdm9GaWx0ZXJGaWVsZFR5cGVEZWY9XCJEQVRFXCI+XG4gICAgICA8bm92by1maWVsZCAqbm92b0ZpbHRlckZpZWxkT3BlcmF0b3JzRGVmPVwibGV0IGZvcm1Hcm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBwbGFjZWhvbGRlcj1cIk9wZXJhdG9yLi4uXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJiZWZvcmVcIj5CZWZvcmU8L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImFmdGVyXCI+QWZ0ZXI8L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImJldHdlZW5cIj5CZXR3ZWVuPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJ3aXRoaW5cIj5XaXRoaW48L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbm92b0ZpbHRlckZpZWxkSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImZvcm1Hcm91cC52YWx1ZS5vcGVyYXRvclwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnYmVmb3JlJywgJ2FmdGVyJ11cIj5cbiAgICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZUZvcm1hdD1cImlzbzg2MDFcIiBbcGlja2VyXT1cImRhdGVwaWNrZXJcIiBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiIC8+XG4gICAgICAgICAgICA8bm92by1waWNrZXItdG9nZ2xlIG5vdm9TdWZmaXggaWNvbj1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICAgIDxub3ZvLWRhdGUtcGlja2VyICNkYXRlcGlja2VyPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydiZXR3ZWVuJ11cIj5cbiAgICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZVJhbmdlRm9ybWF0PVwiaXNvODYwMVwiIFtwaWNrZXJdPVwiZGF0ZXJhbmdlcGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiAvPlxuICAgICAgICAgICAgPG5vdm8tcGlja2VyLXRvZ2dsZSBub3ZvU3VmZml4IGljb249XCJjYWxlbmRhclwiPlxuICAgICAgICAgICAgICA8bm92by1kYXRlLXBpY2tlciAjZGF0ZXJhbmdlcGlja2VyIG1vZGU9XCJyYW5nZVwiIG51bWJlck9mTW9udGhzPVwiMlwiPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWyd3aXRoaW4nXVwiPlxuICAgICAgICAgICAgPG5vdm8tc2VsZWN0IHBsYWNlaG9sZGVyPVwiU2VsZWN0IERhdGUgUmFuZ2UuLi5cIiBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCI3XCI+TmV4dCBXZWVrPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiLTdcIj5MYXN0IFdlZWs8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItMzBcIj5MYXN0IDMwIERheXM8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItOTBcIj5MYXN0IDkwIERheXM8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHREYXRlRmlsdGVyRmllbGREZWYgZXh0ZW5kcyBEZWZhdWx0RmlsdGVyRmllbGREZWYge1xuICBkZWZhdWx0T3BlcmF0b3IgPSAnd2l0aGluJztcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgX2ZiOiBGaWx0ZXJCdWlsZGVyQ29tcG9uZW50PGFueT4pIHtcbiAgICBzdXBlcihfZmIpO1xuICB9XG59XG4iXX0=