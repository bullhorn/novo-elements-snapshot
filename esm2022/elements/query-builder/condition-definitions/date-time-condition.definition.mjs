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
          <novo-option value="equalTo">{{ labels.equals }}</novo-option>
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
        <novo-field *novoSwitchCases="['equalTo']">
          <input novoInput dateFormat="yyyy-mm-dd" [picker]="datepicker" formControlName="value"/>
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker (onSelect)="closePanel($event, viewIndex)" #datepicker></novo-date-picker>
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i4.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "directive", type: i6.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "directive", type: i6.NovoDateFormatDirective, selector: "input[dateFormat]", inputs: ["dateFormat"] }, { kind: "directive", type: i6.NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: ["dateRangeFormat"] }, { kind: "directive", type: i6.NovoDateTimeFormatDirective, selector: "input[dateTimeFormat]", inputs: ["military", "dateTimeFormat"] }, { kind: "component", type: i6.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i6.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i7.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "hideToday", "disabledDateMessage", "dateForInitialView", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "component", type: i8.NovoDateTimePickerElement, selector: "novo-date-time-picker", inputs: ["defaultTime", "minYear", "maxYear", "start", "end", "military", "weekStart", "disabledDateMessage"], outputs: ["onSelect"] }, { kind: "component", type: i9.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i9.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "directive", type: i10.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i10.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i10.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
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
          <novo-option value="equalTo">{{ labels.equals }}</novo-option>
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
        <novo-field *novoSwitchCases="['equalTo']">
          <input novoInput dateFormat="yyyy-mm-dd" [picker]="datepicker" formControlName="value"/>
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker (onSelect)="closePanel($event, viewIndex)" #datepicker></novo-date-picker>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvZGF0ZS10aW1lLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7OztBQUUxRDs7O0dBR0c7QUE0REgsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLHlCQUF5QjtJQU01RSxZQUFZLFlBQThCO1FBQ3hDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUh0QixvQkFBZSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFJaEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSyxFQUFFLFNBQVM7UUFDekIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQ2hGLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzsrR0FkVSwrQkFBK0I7bUdBQS9CLCtCQUErQix3R0FDNUIsdUJBQXVCLHVFQTFEM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcURUOzs0RkFJVSwrQkFBK0I7a0JBM0QzQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxRFQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRDtxRkFHQyxlQUFlO3NCQURkLFlBQVk7dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4sIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmllbGQnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4vYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnR5cGVzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcblxuLyoqXG4gKiBNb3N0IGNvbXBsaWNhdGVkIG9mIHRoZSBkZWZhdWx0IGNvbmRpdGlvbnMgZGVmcywgYSBkYXRlIG5lZWRzIHRvIHByb3ZpZGUgYSBkaWZmZXJlbnRcbiAqIGlucHV0IHR5cGUgZGVwZW5kaW5nIG9uIHRoZSBvcGVyYXRvciBzZWxlY3RlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRlLXRpbWUtY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY9XCJEQVRFXCI+XG4gICAgICA8bm92by1maWVsZCAqbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXA7IGZpZWxkTWV0YSBhcyBtZXRhXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMub3BlcmF0b3JcIiBmb3JtQ29udHJvbE5hbWU9XCJvcGVyYXRvclwiIChvblNlbGVjdCk9XCJvbk9wZXJhdG9yU2VsZWN0KGZvcm1Hcm91cClcIj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJiZWZvcmVcIj57eyBsYWJlbHMuYmVmb3JlIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJhZnRlclwiPnt7IGxhYmVscy5hZnRlciB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiZXF1YWxUb1wiPnt7IGxhYmVscy5lcXVhbHMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIndpdGhpblwiPnt7IGxhYmVscy53aXRoaW4gfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImJldHdlZW5cIj57eyBsYWJlbHMuYmV0d2VlbiB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaXNOdWxsXCIgKm5nSWY9XCIhbWV0YT8ucmVtb3ZlSXNFbXB0eVwiPnt7IGxhYmVscy5pc0VtcHR5IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5vdm9Db25kaXRpb25JbnB1dERlZj1cImxldCBmb3JtR3JvdXA7IHZpZXdJbmRleCBhcyB2aWV3SW5kZXhcIiBbbmdTd2l0Y2hdPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnYWZ0ZXInXVwiPlxuICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZVRpbWVGb3JtYXQ9XCJpc284NjAxXCIgW3BpY2tlcl09XCJkYXRldGltZXBpY2tlclwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIvPlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgdHJpZ2dlck9uRm9jdXMgW3dpZHRoXT1cIi0xXCIgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBub3ZvU3VmZml4IGljb249XCJjYWxlbmRhclwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0ZS10aW1lLXBpY2tlciBkZWZhdWx0VGltZT1cImVuZFwiIChvblNlbGVjdCk9XCJjbG9zZVBhbmVsKCRldmVudCwgdmlld0luZGV4KVwiICNkYXRldGltZXBpY2tlcj48L25vdm8tZGF0ZS10aW1lLXBpY2tlcj5cbiAgICAgICAgICA8L25vdm8tcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydiZWZvcmUnXVwiPlxuICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZVRpbWVGb3JtYXQ9XCJpc284NjAxXCIgW3BpY2tlcl09XCJkYXRldGltZXBpY2tlcmJlZm9yZVwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIvPlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgdHJpZ2dlck9uRm9jdXMgW3dpZHRoXT1cIi0xXCIgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBub3ZvU3VmZml4IGljb249XCJjYWxlbmRhclwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0ZS10aW1lLXBpY2tlciBkZWZhdWx0VGltZT1cInN0YXJ0XCIgKG9uU2VsZWN0KT1cImNsb3NlUGFuZWwoJGV2ZW50LCB2aWV3SW5kZXgpXCIgI2RhdGV0aW1lcGlja2VyYmVmb3JlPjwvbm92by1kYXRlLXRpbWUtcGlja2VyPlxuICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ2VxdWFsVG8nXVwiPlxuICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZUZvcm1hdD1cInl5eXktbW0tZGRcIiBbcGlja2VyXT1cImRhdGVwaWNrZXJcIiBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiLz5cbiAgICAgICAgICA8bm92by1waWNrZXItdG9nZ2xlIHRyaWdnZXJPbkZvY3VzIFtvdmVybGF5SWRdPVwidmlld0luZGV4XCIgbm92b1N1ZmZpeCBpY29uPVwiY2FsZW5kYXJcIj5cbiAgICAgICAgICAgIDxub3ZvLWRhdGUtcGlja2VyIChvblNlbGVjdCk9XCJjbG9zZVBhbmVsKCRldmVudCwgdmlld0luZGV4KVwiICNkYXRlcGlja2VyPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICA8L25vdm8tcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydiZXR3ZWVuJ11cIj5cbiAgICAgICAgICA8aW5wdXQgbm92b0lucHV0IGRhdGVSYW5nZUZvcm1hdD1cImRhdGVcIiBbcGlja2VyXT1cImRhdGVyYW5nZXBpY2tlclwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIvPlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgW2Zvcl09XCJkYXRlcmFuZ2VwaWNrZXJcIiB0cmlnZ2VyT25Gb2N1cyBbb3ZlcmxheUlkXT1cInZpZXdJbmRleFwiIG5vdm9TdWZmaXggaWNvbj1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICA8bm92by1kYXRlLXBpY2tlciAjZGF0ZXJhbmdlcGlja2VyIChvblNlbGVjdCk9XCJjbG9zZVBhbmVsKCRldmVudCwgdmlld0luZGV4KVwiIG1vZGU9XCJyYW5nZVwiIG51bWJlck9mTW9udGhzPVwiMlwiPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICA8L25vdm8tcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWyd3aXRoaW4nXVwiPlxuICAgICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnNlbGVjdERhdGVSYW5nZVwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCI3XCI+e3sgbGFiZWxzLm5leHQ3RGF5cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItN1wiPnt7IGxhYmVscy5wYXN0N0RheXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiLTMwXCI+e3sgbGFiZWxzLnBhc3QzMERheXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiLTkwXCI+e3sgbGFiZWxzLnBhc3Q5MERheXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnaXNOdWxsJ11cIj5cbiAgICAgICAgICA8bm92by1yYWRpby1ncm91cCBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cInRydWVcIj57eyBsYWJlbHMueWVzIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cImZhbHNlXCI+e3sgbGFiZWxzLm5vIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgIDwvbm92by1yYWRpby1ncm91cD5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHREYXRlVGltZUNvbmRpdGlvbkRlZiBleHRlbmRzIEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYge1xuICBAVmlld0NoaWxkcmVuKE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50KVxuICBvdmVybGF5Q2hpbGRyZW46IFF1ZXJ5TGlzdDxOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudD47XG5cbiAgZGVmYXVsdE9wZXJhdG9yID0gT3BlcmF0b3Iud2l0aGluO1xuXG4gIGNvbnN0cnVjdG9yKGxhYmVsU2VydmljZTogTm92b0xhYmVsU2VydmljZSkge1xuICAgIHN1cGVyKGxhYmVsU2VydmljZSk7XG4gICAgdGhpcy5kZWZpbmVPcGVyYXRvckVkaXRHcm91cChPcGVyYXRvci5iZWZvcmUsIE9wZXJhdG9yLmFmdGVyKTtcbiAgfVxuXG4gIGNsb3NlUGFuZWwoZXZlbnQsIHZpZXdJbmRleCk6IHZvaWQge1xuICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLm92ZXJsYXlDaGlsZHJlbi5maW5kKGl0ZW0gPT4gaXRlbS5vdmVybGF5SWQgPT09IHZpZXdJbmRleCk7XG4gICAgb3ZlcmxheS5jbG9zZVBhbmVsKGV2ZW50KTtcbiAgfVxufVxuIl19