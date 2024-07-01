import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { Operator } from '../query-builder.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "novo-elements/elements/common";
import * as i4 from "novo-elements/elements/select";
import * as i5 from "novo-elements/elements/field";
import * as i6 from "novo-elements/elements/radio";
import * as i7 from "../query-builder.directives";
/**
 * Handle selection of field values when a list of options is provided.
 */
export class NovoDefaultPickerConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = Operator.includeAny;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultPickerConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i3.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i4.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "directive", type: i4.NovoSelectExtUpdateFix, selector: "novo-select[extupdatefix]" }, { kind: "component", type: i5.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "component", type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i6.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i6.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "directive", type: i7.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i7.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i7.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
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
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvcGlja2VyLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWEsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7QUFHbEQ7O0dBRUc7QUFrQ0gsTUFBTSxPQUFPLDZCQUE4QixTQUFRLHlCQUF5QjtJQWpDNUU7O1FBa0NFLG9CQUFlLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztLQUN2Qzs4R0FGWSw2QkFBNkI7a0dBQTdCLDZCQUE2Qix3RkEvQjlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7OzJGQUlVLDZCQUE2QjtrQkFqQ3pDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL2Fic3RyYWN0LWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0RWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc2VsZWN0JztcblxuLyoqXG4gKiBIYW5kbGUgc2VsZWN0aW9uIG9mIGZpZWxkIHZhbHVlcyB3aGVuIGEgbGlzdCBvZiBvcHRpb25zIGlzIHByb3ZpZGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXBpY2tlci1jb25kaXRpb24tZGVmJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIG5vdm9Db25kaXRpb25GaWVsZERlZj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmPVwibGV0IGZvcm1Hcm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLm9wZXJhdG9yXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIiAob25TZWxlY3QpPVwib25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXApXCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFueVwiPnt7IGxhYmVscy5pbmNsdWRlQW55IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpbmNsdWRlQWxsXCI+e3sgbGFiZWxzLmluY2x1ZGVBbGwgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImV4Y2x1ZGVBbnlcIj57eyBsYWJlbHMuZXhjbHVkZSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaXNOdWxsXCI+e3sgbGFiZWxzLmlzRW1wdHkgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbm92b0NvbmRpdGlvbklucHV0RGVmPVwibGV0IGZvcm1Hcm91cDsgZmllbGRNZXRhIGFzIG1ldGFcIiBbbmdTd2l0Y2hdPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnaW5jbHVkZUFueScsICdpbmNsdWRlQWxsJywgJ2V4Y2x1ZGVBbnknXVwiPlxuICAgICAgICAgIDxub3ZvLXNlbGVjdCBleHR1cGRhdGVmaXggZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnNlbGVjdFwiIFttdWx0aXBsZV09XCJ0cnVlXCI+XG4gICAgICAgICAgICA8IS0tIFdIYXQgYWJvdXQgb3B0aW9uVXJsL29wdGlvblR5cGUgLS0+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBtZXRhPy5vcHRpb25zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi12YWx1ZV09XCJvcHRpb24ubGFiZWxcIj5cbiAgICAgICAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnaXNOdWxsJ11cIj5cbiAgICAgICAgICA8bm92by1yYWRpby1ncm91cCBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cInRydWVcIj57eyBsYWJlbHMueWVzIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cImZhbHNlXCI+e3sgbGFiZWxzLm5vIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgIDwvbm92by1yYWRpby1ncm91cD5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHRQaWNrZXJDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIHtcbiAgZGVmYXVsdE9wZXJhdG9yID0gT3BlcmF0b3IuaW5jbHVkZUFueTtcbn1cbiJdfQ==