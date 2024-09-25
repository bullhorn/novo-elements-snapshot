import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { Operator } from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/common";
import * as i5 from "novo-elements/elements/select";
import * as i6 from "novo-elements/elements/field";
import * as i7 from "novo-elements/elements/radio";
import * as i8 from "../query-builder.directives";
/**
 * Handle selection of field values when a list of options is provided.
 */
export class NovoDefaultPickerConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.includeAny;
        this.defineOperatorEditGroup(Operator.includeAny, Operator.includeAll, Operator.excludeAny);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultPickerConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDefaultPickerConditionDef, selector: "novo-picker-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-select extupdatefix formControlName="value" [placeholder]="labels.select" [multiple]="true">
            <!-- WHat about optionUrl/optionType -->
            <novo-option *ngFor="let option of meta?.options" [value]="option.value" [attr.data-automation-value]="option.label">
              {{ option.label }}
            </novo-option>
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i4.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "directive", type: i5.NovoSelectExtUpdateFix, selector: "novo-select[extupdatefix]" }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "component", type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i7.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i7.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "directive", type: i8.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i8.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i8.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultPickerConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-picker-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-select extupdatefix formControlName="value" [placeholder]="labels.select" [multiple]="true">
            <!-- WHat about optionUrl/optionType -->
            <novo-option *ngFor="let option of meta?.options" [value]="option.value" [attr.data-automation-value]="option.label">
              {{ option.label }}
            </novo-option>
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
        }], ctorParameters: () => [{ type: i1.NovoLabelService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvcGlja2VyLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7O0FBRTVFOztHQUVHO0FBa0NILE1BQU0sT0FBTyw2QkFBOEIsU0FBUSx5QkFBeUI7SUFHMUUsWUFBWSxZQUE4QjtRQUN4QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFIdEIsb0JBQWUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBSXBDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlGLENBQUM7OEdBTlUsNkJBQTZCO2tHQUE3Qiw2QkFBNkIsd0ZBL0I5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUOzsyRkFJVSw2QkFBNkI7a0JBakN6QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnR5cGVzJztcbmltcG9ydCB7IEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL2Fic3RyYWN0LWNvbmRpdGlvbi5kZWZpbml0aW9uJztcblxuLyoqXG4gKiBIYW5kbGUgc2VsZWN0aW9uIG9mIGZpZWxkIHZhbHVlcyB3aGVuIGEgbGlzdCBvZiBvcHRpb25zIGlzIHByb3ZpZGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXBpY2tlci1jb25kaXRpb24tZGVmJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIG5vdm9Db25kaXRpb25GaWVsZERlZj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmPVwibGV0IGZvcm1Hcm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLm9wZXJhdG9yXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIiAob25TZWxlY3QpPVwib25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXApXCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFueVwiPnt7IGxhYmVscy5pbmNsdWRlQW55IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpbmNsdWRlQWxsXCI+e3sgbGFiZWxzLmluY2x1ZGVBbGwgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImV4Y2x1ZGVBbnlcIj57eyBsYWJlbHMuZXhjbHVkZSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaXNOdWxsXCI+e3sgbGFiZWxzLmlzRW1wdHkgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbm92b0NvbmRpdGlvbklucHV0RGVmPVwibGV0IGZvcm1Hcm91cDsgZmllbGRNZXRhIGFzIG1ldGFcIiBbbmdTd2l0Y2hdPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnaW5jbHVkZUFueScsICdpbmNsdWRlQWxsJywgJ2V4Y2x1ZGVBbnknXVwiPlxuICAgICAgICAgIDxub3ZvLXNlbGVjdCBleHR1cGRhdGVmaXggZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnNlbGVjdFwiIFttdWx0aXBsZV09XCJ0cnVlXCI+XG4gICAgICAgICAgICA8IS0tIFdIYXQgYWJvdXQgb3B0aW9uVXJsL29wdGlvblR5cGUgLS0+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBtZXRhPy5vcHRpb25zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi12YWx1ZV09XCJvcHRpb24ubGFiZWxcIj5cbiAgICAgICAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnaXNOdWxsJ11cIj5cbiAgICAgICAgICA8bm92by1yYWRpby1ncm91cCBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cInRydWVcIj57eyBsYWJlbHMueWVzIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cImZhbHNlXCI+e3sgbGFiZWxzLm5vIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgIDwvbm92by1yYWRpby1ncm91cD5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHRQaWNrZXJDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIHtcbiAgZGVmYXVsdE9wZXJhdG9yID0gT3BlcmF0b3IuaW5jbHVkZUFueTtcblxuICBjb25zdHJ1Y3RvcihsYWJlbFNlcnZpY2U6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihsYWJlbFNlcnZpY2UpO1xuICAgIHRoaXMuZGVmaW5lT3BlcmF0b3JFZGl0R3JvdXAoT3BlcmF0b3IuaW5jbHVkZUFueSwgT3BlcmF0b3IuaW5jbHVkZUFsbCwgT3BlcmF0b3IuZXhjbHVkZUFueSk7XG4gIH1cbn1cbiJdfQ==