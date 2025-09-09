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
import * as i8 from "novo-elements/elements/date-time-picker";
import * as i9 from "novo-elements/elements/radio";
import * as i10 from "../query-builder.directives";
/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
export class NovoDefaultDateTimeConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.within;
        this.defineOperatorEditGroup(Operator.before, Operator.after);
    }
    closePanel(event, viewIndex) {
        const overlay = this.overlayChildren.find(item => item.overlayId === viewIndex);
        overlay.closePanel(event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDefaultDateTimeConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: NovoDefaultDateTimeConditionDef, selector: "novo-date-time-condition-def", viewQueries: [{ propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['after']">
          <input novoInput dateTimeFormat="iso8601" [picker]="datetimepicker" formControlName="value"/>
          <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-time-picker defaultTime="end" (onSelect)="closePanel($event, viewIndex)" #datetimepicker></novo-date-time-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['before']">
          <input novoInput dateTimeFormat="iso8601" [picker]="datetimepickerbefore" formControlName="value"/>
          <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-time-picker defaultTime="start" (onSelect)="closePanel($event, viewIndex)" #datetimepickerbefore></novo-date-time-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['between']">
          <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value"/>
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i4.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "directive", type: i6.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "directive", type: i6.NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: ["dateRangeFormat"] }, { kind: "directive", type: i6.NovoDateTimeFormatDirective, selector: "input[dateTimeFormat]", inputs: ["military", "dateTimeFormat"] }, { kind: "component", type: i6.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i6.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i7.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "dateForInitialView", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "component", type: i8.NovoDateTimePickerElement, selector: "novo-date-time-picker", inputs: ["defaultTime", "minYear", "maxYear", "start", "end", "military", "weekStart", "disabledDateMessage"], outputs: ["onSelect"] }, { kind: "component", type: i9.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i9.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "directive", type: i10.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i10.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i10.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDefaultDateTimeConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-time-condition-def',
                    template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['after']">
          <input novoInput dateTimeFormat="iso8601" [picker]="datetimepicker" formControlName="value"/>
          <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-time-picker defaultTime="end" (onSelect)="closePanel($event, viewIndex)" #datetimepicker></novo-date-time-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['before']">
          <input novoInput dateTimeFormat="iso8601" [picker]="datetimepickerbefore" formControlName="value"/>
          <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-time-picker defaultTime="start" (onSelect)="closePanel($event, viewIndex)" #datetimepickerbefore></novo-date-time-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['between']">
          <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value"/>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvZGF0ZS10aW1lLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7OztBQUUxRDs7O0dBR0c7QUFxREgsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLHlCQUF5QjtJQU01RSxZQUFZLFlBQThCO1FBQ3hDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUh0QixvQkFBZSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFJaEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSyxFQUFFLFNBQVM7UUFDekIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQ2hGLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzsrR0FkVSwrQkFBK0I7bUdBQS9CLCtCQUErQix3R0FDNUIsdUJBQXVCLHVFQW5EM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Q1Q7OzRGQUlVLCtCQUErQjtrQkFwRDNDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQ7cUZBR0MsZUFBZTtzQkFEZCxZQUFZO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ZpZWxkJztcbmltcG9ydCB7IEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL2Fic3RyYWN0LWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5cbi8qKlxuICogTW9zdCBjb21wbGljYXRlZCBvZiB0aGUgZGVmYXVsdCBjb25kaXRpb25zIGRlZnMsIGEgZGF0ZSBuZWVkcyB0byBwcm92aWRlIGEgZGlmZmVyZW50XG4gKiBpbnB1dCB0eXBlIGRlcGVuZGluZyBvbiB0aGUgb3BlcmF0b3Igc2VsZWN0ZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0ZS10aW1lLWNvbmRpdGlvbi1kZWYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbm92b0NvbmRpdGlvbkZpZWxkRGVmPVwiREFURVwiPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwOyBmaWVsZE1ldGEgYXMgbWV0YVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLm9wZXJhdG9yXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIiAob25TZWxlY3QpPVwib25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXApXCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiYmVmb3JlXCI+e3sgbGFiZWxzLmJlZm9yZSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiYWZ0ZXJcIj57eyBsYWJlbHMuYWZ0ZXIgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIndpdGhpblwiPnt7IGxhYmVscy53aXRoaW4gfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImJldHdlZW5cIj57eyBsYWJlbHMuYmV0d2VlbiB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaXNOdWxsXCIgKm5nSWY9XCIhbWV0YT8ucmVtb3ZlSXNFbXB0eVwiPnt7IGxhYmVscy5pc0VtcHR5IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5vdm9Db25kaXRpb25JbnB1dERlZj1cImxldCBmb3JtR3JvdXA7IHZpZXdJbmRleCBhcyB2aWV3SW5kZXhcIiBbbmdTd2l0Y2hdPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnYWZ0ZXInXVwiPlxuICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZVRpbWVGb3JtYXQ9XCJpc284NjAxXCIgW3BpY2tlcl09XCJkYXRldGltZXBpY2tlclwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIvPlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgdHJpZ2dlck9uRm9jdXMgW3dpZHRoXT1cIi0xXCIgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBub3ZvU3VmZml4IGljb249XCJjYWxlbmRhclwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0ZS10aW1lLXBpY2tlciBkZWZhdWx0VGltZT1cImVuZFwiIChvblNlbGVjdCk9XCJjbG9zZVBhbmVsKCRldmVudCwgdmlld0luZGV4KVwiICNkYXRldGltZXBpY2tlcj48L25vdm8tZGF0ZS10aW1lLXBpY2tlcj5cbiAgICAgICAgICA8L25vdm8tcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydiZWZvcmUnXVwiPlxuICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZVRpbWVGb3JtYXQ9XCJpc284NjAxXCIgW3BpY2tlcl09XCJkYXRldGltZXBpY2tlcmJlZm9yZVwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIvPlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgdHJpZ2dlck9uRm9jdXMgW3dpZHRoXT1cIi0xXCIgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBub3ZvU3VmZml4IGljb249XCJjYWxlbmRhclwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0ZS10aW1lLXBpY2tlciBkZWZhdWx0VGltZT1cInN0YXJ0XCIgKG9uU2VsZWN0KT1cImNsb3NlUGFuZWwoJGV2ZW50LCB2aWV3SW5kZXgpXCIgI2RhdGV0aW1lcGlja2VyYmVmb3JlPjwvbm92by1kYXRlLXRpbWUtcGlja2VyPlxuICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ2JldHdlZW4nXVwiPlxuICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZVJhbmdlRm9ybWF0PVwiZGF0ZVwiIFtwaWNrZXJdPVwiZGF0ZXJhbmdlcGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIi8+XG4gICAgICAgICAgPG5vdm8tcGlja2VyLXRvZ2dsZSBbZm9yXT1cImRhdGVyYW5nZXBpY2tlclwiIHRyaWdnZXJPbkZvY3VzIFtvdmVybGF5SWRdPVwidmlld0luZGV4XCIgbm92b1N1ZmZpeCBpY29uPVwiY2FsZW5kYXJcIj5cbiAgICAgICAgICAgIDxub3ZvLWRhdGUtcGlja2VyICNkYXRlcmFuZ2VwaWNrZXIgKG9uU2VsZWN0KT1cImNsb3NlUGFuZWwoJGV2ZW50LCB2aWV3SW5kZXgpXCIgbW9kZT1cInJhbmdlXCIgbnVtYmVyT2ZNb250aHM9XCIyXCI+PC9ub3ZvLWRhdGUtcGlja2VyPlxuICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ3dpdGhpbiddXCI+XG4gICAgICAgICAgPG5vdm8tc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMuc2VsZWN0RGF0ZVJhbmdlXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIjdcIj57eyBsYWJlbHMubmV4dDdEYXlzIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIi03XCI+e3sgbGFiZWxzLnBhc3Q3RGF5cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItMzBcIj57eyBsYWJlbHMucGFzdDMwRGF5cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItOTBcIj57eyBsYWJlbHMucGFzdDkwRGF5cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydpc051bGwnXVwiPlxuICAgICAgICAgIDxub3ZvLXJhZGlvLWdyb3VwIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICA8bm92by1yYWRpbyBbdmFsdWVdPVwidHJ1ZVwiPnt7IGxhYmVscy55ZXMgfX08L25vdm8tcmFkaW8+XG4gICAgICAgICAgICA8bm92by1yYWRpbyBbdmFsdWVdPVwiZmFsc2VcIj57eyBsYWJlbHMubm8gfX08L25vdm8tcmFkaW8+XG4gICAgICAgICAgPC9ub3ZvLXJhZGlvLWdyb3VwPlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdERhdGVUaW1lQ29uZGl0aW9uRGVmIGV4dGVuZHMgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB7XG4gIEBWaWV3Q2hpbGRyZW4oTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQpXG4gIG92ZXJsYXlDaGlsZHJlbjogUXVlcnlMaXN0PE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50PjtcblxuICBkZWZhdWx0T3BlcmF0b3IgPSBPcGVyYXRvci53aXRoaW47XG5cbiAgY29uc3RydWN0b3IobGFiZWxTZXJ2aWNlOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobGFiZWxTZXJ2aWNlKTtcbiAgICB0aGlzLmRlZmluZU9wZXJhdG9yRWRpdEdyb3VwKE9wZXJhdG9yLmJlZm9yZSwgT3BlcmF0b3IuYWZ0ZXIpO1xuICB9XG5cbiAgY2xvc2VQYW5lbChldmVudCwgdmlld0luZGV4KTogdm9pZCB7XG4gICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMub3ZlcmxheUNoaWxkcmVuLmZpbmQoaXRlbSA9PiBpdGVtLm92ZXJsYXlJZCA9PT0gdmlld0luZGV4KTtcbiAgICBvdmVybGF5LmNsb3NlUGFuZWwoZXZlbnQpO1xuICB9XG59XG4iXX0=