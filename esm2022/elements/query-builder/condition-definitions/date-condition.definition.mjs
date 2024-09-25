import { ChangeDetectionStrategy, Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { Operator } from '../query-builder.types';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/common";
import * as i5 from "novo-elements/elements/select";
import * as i6 from "novo-elements/elements/field";
import * as i7 from "novo-elements/elements/date-picker";
import * as i8 from "novo-elements/elements/radio";
import * as i9 from "../query-builder.directives";
/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
export class NovoDefaultDateConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.within;
        this.defineOperatorEditGroup(Operator.before, Operator.after);
    }
    closePanel(event, viewIndex) {
        const overlay = this.overlayChildren.find(item => item.overlayId === viewIndex);
        overlay.closePanel(event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultDateConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDefaultDateConditionDef, selector: "novo-date-condition-def", viewQueries: [{ propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['before', 'after']">
          <input novoInput dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker (onSelect)="closePanel($event, viewIndex)" #datepicker></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['between']">
          <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value" />
          <novo-picker-toggle [for]="daterangepicker" triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker #daterangepicker (onSelect)="closePanel($event, viewIndex)" mode="range" numberOfMonths="2"></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['within']">
          <novo-select [placeholder]="labels.selectDateRange" formControlName="value">
            <novo-option value="7">{{ labels.next7Days }}</novo-option>
            <novo-option value="-7">{{ labels.past7Days }}</novo-option>
            <novo-option value="-30">{{ labels.past30Days }}</novo-option>
            <novo-option value="-90">{{ labels.past90Days }}</novo-option>
          </novo-select>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i4.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { kind: "directive", type: i6.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "directive", type: i6.NovoDateFormatDirective, selector: "input[dateFormat]", inputs: ["dateFormat"] }, { kind: "directive", type: i6.NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: ["dateRangeFormat"] }, { kind: "component", type: i6.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i6.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i7.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "component", type: i8.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i8.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "directive", type: i9.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i9.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i9.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultDateConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-condition-def',
                    template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['before', 'after']">
          <input novoInput dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker (onSelect)="closePanel($event, viewIndex)" #datepicker></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['between']">
          <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value" />
          <novo-picker-toggle [for]="daterangepicker" triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker #daterangepicker (onSelect)="closePanel($event, viewIndex)" mode="range" numberOfMonths="2"></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['within']">
          <novo-select [placeholder]="labels.selectDateRange" formControlName="value">
            <novo-option value="7">{{ labels.next7Days }}</novo-option>
            <novo-option value="-7">{{ labels.past7Days }}</novo-option>
            <novo-option value="-30">{{ labels.past30Days }}</novo-option>
            <novo-option value="-90">{{ labels.past90Days }}</novo-option>
          </novo-select>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2RhdGUtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9HLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFFMUQ7OztHQUdHO0FBK0NILE1BQU0sT0FBTywyQkFBNEIsU0FBUSx5QkFBeUI7SUFNeEUsWUFBWSxZQUE4QjtRQUN4QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFIdEIsb0JBQWUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBSWhDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUssRUFBRSxTQUFTO1FBQ3pCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUNoRixPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7OEdBZFUsMkJBQTJCO2tHQUEzQiwyQkFBMkIsbUdBQ3hCLHVCQUF1Qix1RUE3QzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0NUOzsyRkFJVSwyQkFBMkI7a0JBOUN2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEO3FGQUdDLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudHlwZXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuXG4vKipcbiAqIE1vc3QgY29tcGxpY2F0ZWQgb2YgdGhlIGRlZmF1bHQgY29uZGl0aW9ucyBkZWZzLCBhIGRhdGUgbmVlZHMgdG8gcHJvdmlkZSBhIGRpZmZlcmVudFxuICogaW5wdXQgdHlwZSBkZXBlbmRpbmcgb24gdGhlIG9wZXJhdG9yIHNlbGVjdGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY9XCJEQVRFXCI+XG4gICAgICA8bm92by1maWVsZCAqbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5vcGVyYXRvclwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCIgKG9uU2VsZWN0KT1cIm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKVwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImJlZm9yZVwiPnt7IGxhYmVscy5iZWZvcmUgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImFmdGVyXCI+e3sgbGFiZWxzLmFmdGVyIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJiZXR3ZWVuXCI+e3sgbGFiZWxzLmJldHdlZW4gfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIndpdGhpblwiPnt7IGxhYmVscy53aXRoaW4gfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImlzTnVsbFwiPnt7IGxhYmVscy5pc0VtcHR5IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5vdm9Db25kaXRpb25JbnB1dERlZj1cImxldCBmb3JtR3JvdXA7IHZpZXdJbmRleCBhcyB2aWV3SW5kZXhcIiBbbmdTd2l0Y2hdPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnYmVmb3JlJywgJ2FmdGVyJ11cIj5cbiAgICAgICAgICA8aW5wdXQgbm92b0lucHV0IGRhdGVGb3JtYXQ9XCJpc284NjAxXCIgW3BpY2tlcl09XCJkYXRlcGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiAvPlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgdHJpZ2dlck9uRm9jdXMgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBub3ZvU3VmZml4IGljb249XCJjYWxlbmRhclwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXIgKG9uU2VsZWN0KT1cImNsb3NlUGFuZWwoJGV2ZW50LCB2aWV3SW5kZXgpXCIgI2RhdGVwaWNrZXI+PC9ub3ZvLWRhdGUtcGlja2VyPlxuICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ2JldHdlZW4nXVwiPlxuICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZVJhbmdlRm9ybWF0PVwiZGF0ZVwiIFtwaWNrZXJdPVwiZGF0ZXJhbmdlcGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiAvPlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgW2Zvcl09XCJkYXRlcmFuZ2VwaWNrZXJcIiB0cmlnZ2VyT25Gb2N1cyBbb3ZlcmxheUlkXT1cInZpZXdJbmRleFwiIG5vdm9TdWZmaXggaWNvbj1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICA8bm92by1kYXRlLXBpY2tlciAjZGF0ZXJhbmdlcGlja2VyIChvblNlbGVjdCk9XCJjbG9zZVBhbmVsKCRldmVudCwgdmlld0luZGV4KVwiIG1vZGU9XCJyYW5nZVwiIG51bWJlck9mTW9udGhzPVwiMlwiPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICA8L25vdm8tcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWyd3aXRoaW4nXVwiPlxuICAgICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnNlbGVjdERhdGVSYW5nZVwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCI3XCI+e3sgbGFiZWxzLm5leHQ3RGF5cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItN1wiPnt7IGxhYmVscy5wYXN0N0RheXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiLTMwXCI+e3sgbGFiZWxzLnBhc3QzMERheXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiLTkwXCI+e3sgbGFiZWxzLnBhc3Q5MERheXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnaXNOdWxsJ11cIj5cbiAgICAgICAgICA8bm92by1yYWRpby1ncm91cCBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cInRydWVcIj57eyBsYWJlbHMueWVzIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cImZhbHNlXCI+e3sgbGFiZWxzLm5vIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgIDwvbm92by1yYWRpby1ncm91cD5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHREYXRlQ29uZGl0aW9uRGVmIGV4dGVuZHMgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB7XG4gIEBWaWV3Q2hpbGRyZW4oTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQpXG4gIG92ZXJsYXlDaGlsZHJlbjogUXVlcnlMaXN0PE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50PjtcblxuICBkZWZhdWx0T3BlcmF0b3IgPSBPcGVyYXRvci53aXRoaW47XG5cbiAgY29uc3RydWN0b3IobGFiZWxTZXJ2aWNlOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobGFiZWxTZXJ2aWNlKTtcbiAgICB0aGlzLmRlZmluZU9wZXJhdG9yRWRpdEdyb3VwKE9wZXJhdG9yLmJlZm9yZSwgT3BlcmF0b3IuYWZ0ZXIpO1xuICB9XG5cbiAgY2xvc2VQYW5lbChldmVudCwgdmlld0luZGV4KTogdm9pZCB7XG4gICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMub3ZlcmxheUNoaWxkcmVuLmZpbmQoaXRlbSA9PiBpdGVtLm92ZXJsYXlJZCA9PT0gdmlld0luZGV4KTtcbiAgICBvdmVybGF5LmNsb3NlUGFuZWwoZXZlbnQpO1xuICB9XG59XG4iXX0=