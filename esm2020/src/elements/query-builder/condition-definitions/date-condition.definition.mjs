import { NovoPickerToggleElement } from './../../field/toggle/picker-toggle.component';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
import * as i1 from "../../field/field";
import * as i2 from "../../select/Select";
import * as i3 from "../../common/option/option.component";
import * as i4 from "../../field/toggle/picker-toggle.component";
import * as i5 from "../../date-picker/DatePicker";
import * as i6 from "../query-builder.directives";
import * as i7 from "@angular/forms";
import * as i8 from "@angular/common";
import * as i9 from "../../common/directives/switch-cases.directive";
import * as i10 from "../../field/input";
import * as i11 from "../../field/formats/date-format";
import * as i12 from "../../field/picker.directive";
import * as i13 from "../../field/formats/date-range-format";
/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
export class NovoDefaultDateConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'within';
    }
    onOperatorSelect(formGroup) {
        formGroup.get('value').setValue(null);
    }
    togglePanel() {
        this.overlay.togglePanel();
    }
}
NovoDefaultDateConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultDateConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultDateConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultDateConditionDef, selector: "novo-date-condition-def", viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoPickerToggleElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">Before</novo-option>
          <novo-option value="after">After</novo-option>
          <novo-option value="between">Between</novo-option>
          <novo-option value="within">Within</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup">
        <ng-container [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
          <novo-field *novoSwitchCases="['before', 'after']">
            <input novoInput (focus)="togglePanel()" dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
            <novo-picker-toggle triggerOnFocus novoSuffix icon="calendar">
              <novo-date-picker (onSelect)="togglePanel()" #datepicker></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['between']">
            <input novoInput (focus)="togglePanel()" dateRangeFormat="iso8601" [picker]="daterangepicker" formControlName="value" />
            <novo-picker-toggle triggerOnFocus novoSuffix icon="calendar">
              <novo-date-picker (onSelect)="togglePanel()" #daterangepicker mode="range" numberOfMonths="2"></novo-date-picker>
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
  `, isInline: true, components: [{ type: i1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i4.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "disabled"], exportAs: ["novoPickerToggle"] }, { type: i5.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i6.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: i6.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i8.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i9.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i10.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i11.NovoDateFormatDirective, selector: "input[dateFormat]", inputs: ["dateFormat"] }, { type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i12.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { type: i1.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { type: i13.NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: ["dateRangeFormat"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultDateConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-condition-def',
                    template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">Before</novo-option>
          <novo-option value="after">After</novo-option>
          <novo-option value="between">Between</novo-option>
          <novo-option value="within">Within</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup">
        <ng-container [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
          <novo-field *novoSwitchCases="['before', 'after']">
            <input novoInput (focus)="togglePanel()" dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
            <novo-picker-toggle triggerOnFocus novoSuffix icon="calendar">
              <novo-date-picker (onSelect)="togglePanel()" #datepicker></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['between']">
            <input novoInput (focus)="togglePanel()" dateRangeFormat="iso8601" [picker]="daterangepicker" formControlName="value" />
            <novo-picker-toggle triggerOnFocus novoSuffix icon="calendar">
              <novo-date-picker (onSelect)="togglePanel()" #daterangepicker mode="range" numberOfMonths="2"></novo-date-picker>
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
        }], propDecorators: { overlay: [{
                type: ViewChild,
                args: [NovoPickerToggleElement]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2RhdGUtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFdkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQUc1RTs7O0dBR0c7QUEwQ0gsTUFBTSxPQUFPLDJCQUE0QixTQUFRLHlCQUF5QjtJQXpDMUU7O1FBNENFLG9CQUFlLEdBQUcsUUFBUSxDQUFDO0tBUzVCO0lBUEMsZ0JBQWdCLENBQUMsU0FBb0I7UUFDakMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7O3lIQVhVLDJCQUEyQjs2R0FBM0IsMkJBQTJCLHdHQUMzQix1QkFBdUIsdUVBeEN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ1Q7NEZBSVUsMkJBQTJCO2tCQXpDdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQ7OEJBR0MsT0FBTztzQkFETixTQUFTO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IH0gZnJvbSAnLi8uLi8uLi9maWVsZC90b2dnbGUvcGlja2VyLXRvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4vYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXknO1xuXG4vKipcbiAqIE1vc3QgY29tcGxpY2F0ZWQgb2YgdGhlIGRlZmF1bHQgY29uZGl0aW9ucyBkZWZzLCBhIGRhdGUgbmVlZHMgdG8gcHJvdmlkZSBhIGRpZmZlcmVudFxuICogaW5wdXQgdHlwZSBkZXBlbmRpbmcgb24gdGhlIG9wZXJhdG9yIHNlbGVjdGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY9XCJEQVRFXCI+XG4gICAgICA8bm92by1maWVsZCAqbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgcGxhY2Vob2xkZXI9XCJPcGVyYXRvci4uLlwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCIgKG9uU2VsZWN0KT1cIm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKVwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImJlZm9yZVwiPkJlZm9yZTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiYWZ0ZXJcIj5BZnRlcjwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiYmV0d2VlblwiPkJldHdlZW48L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIndpdGhpblwiPldpdGhpbjwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bmctY29udGFpbmVyICpub3ZvQ29uZGl0aW9uSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImZvcm1Hcm91cC52YWx1ZS5vcGVyYXRvclwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnYmVmb3JlJywgJ2FmdGVyJ11cIj5cbiAgICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgKGZvY3VzKT1cInRvZ2dsZVBhbmVsKClcIiBkYXRlRm9ybWF0PVwiaXNvODYwMVwiIFtwaWNrZXJdPVwiZGF0ZXBpY2tlclwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIgLz5cbiAgICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgdHJpZ2dlck9uRm9jdXMgbm92b1N1ZmZpeCBpY29uPVwiY2FsZW5kYXJcIj5cbiAgICAgICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXIgKG9uU2VsZWN0KT1cInRvZ2dsZVBhbmVsKClcIiAjZGF0ZXBpY2tlcj48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgICAgICAgICA8L25vdm8tcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnYmV0d2VlbiddXCI+XG4gICAgICAgICAgICA8aW5wdXQgbm92b0lucHV0IChmb2N1cyk9XCJ0b2dnbGVQYW5lbCgpXCIgZGF0ZVJhbmdlRm9ybWF0PVwiaXNvODYwMVwiIFtwaWNrZXJdPVwiZGF0ZXJhbmdlcGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiAvPlxuICAgICAgICAgICAgPG5vdm8tcGlja2VyLXRvZ2dsZSB0cmlnZ2VyT25Gb2N1cyBub3ZvU3VmZml4IGljb249XCJjYWxlbmRhclwiPlxuICAgICAgICAgICAgICA8bm92by1kYXRlLXBpY2tlciAob25TZWxlY3QpPVwidG9nZ2xlUGFuZWwoKVwiICNkYXRlcmFuZ2VwaWNrZXIgbW9kZT1cInJhbmdlXCIgbnVtYmVyT2ZNb250aHM9XCIyXCI+PC9ub3ZvLWRhdGUtcGlja2VyPlxuICAgICAgICAgICAgPC9ub3ZvLXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ3dpdGhpbiddXCI+XG4gICAgICAgICAgICA8bm92by1zZWxlY3QgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRGF0ZSBSYW5nZS4uLlwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIjdcIj5OZXh0IFdlZWs8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItN1wiPkxhc3QgV2Vlazwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIi0zMFwiPkxhc3QgMzAgRGF5czwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIi05MFwiPkxhc3QgOTAgRGF5czwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdERhdGVDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIHtcbiAgQFZpZXdDaGlsZChOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudClcbiAgb3ZlcmxheTogTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQ7XG4gIGRlZmF1bHRPcGVyYXRvciA9ICd3aXRoaW4nO1xuXG4gIG9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUobnVsbCk7XG4gIH1cblxuICB0b2dnbGVQYW5lbCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkudG9nZ2xlUGFuZWwoKTtcbiAgfVxufVxuIl19