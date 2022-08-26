import { ChangeDetectionStrategy, Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NovoPickerToggleElement } from './../../field/toggle/picker-toggle.component';
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
    closePanel(event, viewIndex) {
        const overlay = this.overlayChildren.find(item => item.overlayId === viewIndex);
        overlay.closePanel(event);
    }
}
NovoDefaultDateConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultDateConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultDateConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultDateConditionDef, selector: "novo-date-condition-def", viewQueries: [{ propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex">
        <ng-container [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
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
        </ng-container>
      </ng-container>
    </ng-container>
  `, isInline: true, components: [{ type: i1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i4.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "disabled"], exportAs: ["novoPickerToggle"] }, { type: i5.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i6.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: i6.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i8.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i9.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i10.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i11.NovoDateFormatDirective, selector: "input[dateFormat]", inputs: ["dateFormat"] }, { type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i12.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { type: i1.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { type: i13.NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: ["dateRangeFormat"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultDateConditionDef, decorators: [{
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
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex">
        <ng-container [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
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
        </ng-container>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }], propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2RhdGUtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBZ0IsU0FBUyxFQUFhLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4SSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFOzs7R0FHRztBQTBDSCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEseUJBQXlCO0lBekMxRTs7UUE2Q0Usb0JBQWUsR0FBRyxRQUFRLENBQUM7S0FVNUI7SUFSQyxnQkFBZ0IsQ0FBQyxTQUFvQjtRQUNuQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUssRUFBRSxTQUFTO1FBQ3pCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUNoRixPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7O3lIQWJVLDJCQUEyQjs2R0FBM0IsMkJBQTJCLG1HQUN4Qix1QkFBdUIsdUVBeEMzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ1Q7NEZBSVUsMkJBQTJCO2tCQXpDdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQ7OEJBR0MsZUFBZTtzQkFEZCxZQUFZO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IH0gZnJvbSAnLi8uLi8uLi9maWVsZC90b2dnbGUvcGlja2VyLXRvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4vYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuXG4vKipcbiAqIE1vc3QgY29tcGxpY2F0ZWQgb2YgdGhlIGRlZmF1bHQgY29uZGl0aW9ucyBkZWZzLCBhIGRhdGUgbmVlZHMgdG8gcHJvdmlkZSBhIGRpZmZlcmVudFxuICogaW5wdXQgdHlwZSBkZXBlbmRpbmcgb24gdGhlIG9wZXJhdG9yIHNlbGVjdGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY9XCJEQVRFXCI+XG4gICAgICA8bm92by1maWVsZCAqbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5vcGVyYXRvclwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCIgKG9uU2VsZWN0KT1cIm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKVwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImJlZm9yZVwiPnt7IGxhYmVscy5iZWZvcmUgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImFmdGVyXCI+e3sgbGFiZWxzLmFmdGVyIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJiZXR3ZWVuXCI+e3sgbGFiZWxzLmJldHdlZW4gfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIndpdGhpblwiPnt7IGxhYmVscy53aXRoaW4gfX08L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbm92b0NvbmRpdGlvbklucHV0RGVmPVwibGV0IGZvcm1Hcm91cDsgdmlld0luZGV4IGFzIHZpZXdJbmRleFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJmb3JtR3JvdXAudmFsdWUub3BlcmF0b3JcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ2JlZm9yZScsICdhZnRlciddXCI+XG4gICAgICAgICAgICA8aW5wdXQgbm92b0lucHV0IGRhdGVGb3JtYXQ9XCJpc284NjAxXCIgW3BpY2tlcl09XCJkYXRlcGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiAvPlxuICAgICAgICAgICAgPG5vdm8tcGlja2VyLXRvZ2dsZSB0cmlnZ2VyT25Gb2N1cyBbb3ZlcmxheUlkXT1cInZpZXdJbmRleFwiIG5vdm9TdWZmaXggaWNvbj1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICAgIDxub3ZvLWRhdGUtcGlja2VyIChvblNlbGVjdCk9XCJjbG9zZVBhbmVsKCRldmVudCwgdmlld0luZGV4KVwiICNkYXRlcGlja2VyPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydiZXR3ZWVuJ11cIj5cbiAgICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgZGF0ZVJhbmdlRm9ybWF0PVwiZGF0ZVwiIFtwaWNrZXJdPVwiZGF0ZXJhbmdlcGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiAvPlxuICAgICAgICAgICAgPG5vdm8tcGlja2VyLXRvZ2dsZSBbZm9yXT1cImRhdGVyYW5nZXBpY2tlclwiIHRyaWdnZXJPbkZvY3VzIFtvdmVybGF5SWRdPVwidmlld0luZGV4XCIgbm92b1N1ZmZpeCBpY29uPVwiY2FsZW5kYXJcIj5cbiAgICAgICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXIgI2RhdGVyYW5nZXBpY2tlciAob25TZWxlY3QpPVwiY2xvc2VQYW5lbCgkZXZlbnQsIHZpZXdJbmRleClcIiBtb2RlPVwicmFuZ2VcIiBudW1iZXJPZk1vbnRocz1cIjJcIj48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgICAgICAgICA8L25vdm8tcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnd2l0aGluJ11cIj5cbiAgICAgICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnNlbGVjdERhdGVSYW5nZVwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIjdcIj57eyBsYWJlbHMubmV4dDdEYXlzIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiLTdcIj57eyBsYWJlbHMucGFzdDdEYXlzIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiLTMwXCI+e3sgbGFiZWxzLnBhc3QzMERheXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItOTBcIj57eyBsYWJlbHMucGFzdDkwRGF5cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdERhdGVDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIHtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudClcbiAgb3ZlcmxheUNoaWxkcmVuOiBRdWVyeUxpc3Q8Tm92b1BpY2tlclRvZ2dsZUVsZW1lbnQ+O1xuXG4gIGRlZmF1bHRPcGVyYXRvciA9ICd3aXRoaW4nO1xuXG4gIG9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKG51bGwpO1xuICB9XG5cbiAgY2xvc2VQYW5lbChldmVudCwgdmlld0luZGV4KTogdm9pZCB7XG4gICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMub3ZlcmxheUNoaWxkcmVuLmZpbmQoaXRlbSA9PiBpdGVtLm92ZXJsYXlJZCA9PT0gdmlld0luZGV4KTtcbiAgICBvdmVybGF5LmNsb3NlUGFuZWwoZXZlbnQpO1xuICB9XG59XG4iXX0=