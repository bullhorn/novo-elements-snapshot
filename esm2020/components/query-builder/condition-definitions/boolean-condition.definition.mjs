import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/components/field";
import * as i2 from "novo-elements/components/select";
import * as i3 from "novo-elements/common";
import * as i4 from "novo-elements/components/radio";
import * as i5 from "../query-builder.directives";
import * as i6 from "@angular/forms";
/**
 * When constructing a query using a field that is a boolean with only true/false as possible values.
 */
export class NovoDefaultBooleanConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'include';
    }
}
NovoDefaultBooleanConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultBooleanConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultBooleanConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultBooleanConditionDef, selector: "novo-boolean-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="include">{{ labels.equals }}</novo-option>
          <novo-option value="exclude">{{ labels.doesNotEqual }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="125" [formGroup]="formGroup">
        <novo-radio-group formControlName="value">
          <novo-radio [value]="true">{{ formGroup.value.operator === 'isNull' ? labels.yes : labels.true }}</novo-radio>
          <novo-radio [value]="false">{{ formGroup.value.operator === 'isNull' ? labels.no : labels.false }}</novo-radio>
        </novo-radio-group>
      </novo-field>
    </ng-container>
  `, isInline: true, components: [{ type: i1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i4.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i4.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "checked", "value", "disabled"], outputs: ["change", "blur", "focus"] }], directives: [{ type: i5.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: i5.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.NovoConditionInputDef, selector: "[novoConditionInputDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultBooleanConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-boolean-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="include">{{ labels.equals }}</novo-option>
          <novo-option value="exclude">{{ labels.doesNotEqual }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="125" [formGroup]="formGroup">
        <novo-radio-group formControlName="value">
          <novo-radio [value]="true">{{ formGroup.value.operator === 'isNull' ? labels.yes : labels.true }}</novo-radio>
          <novo-radio [value]="false">{{ formGroup.value.operator === 'isNull' ? labels.no : labels.false }}</novo-radio>
        </novo-radio-group>
      </novo-field>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvYm9vbGVhbi1jb25kaXRpb24uZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7OztBQUU1RTs7R0FFRztBQXVCSCxNQUFNLE9BQU8sOEJBQStCLFNBQVEseUJBQXlCO0lBdEI3RTs7UUF1QkUsb0JBQWUsR0FBRyxTQUFTLENBQUM7S0FDN0I7OzRIQUZZLDhCQUE4QjtnSEFBOUIsOEJBQThCLHlGQXBCL0I7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQlQ7NEZBSVUsOEJBQThCO2tCQXRCMUMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQlQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5cbi8qKlxuICogV2hlbiBjb25zdHJ1Y3RpbmcgYSBxdWVyeSB1c2luZyBhIGZpZWxkIHRoYXQgaXMgYSBib29sZWFuIHdpdGggb25seSB0cnVlL2ZhbHNlIGFzIHBvc3NpYmxlIHZhbHVlcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1ib29sZWFuLWNvbmRpdGlvbi1kZWYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbm92b0NvbmRpdGlvbkZpZWxkRGVmPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMub3BlcmF0b3JcIiBmb3JtQ29udHJvbE5hbWU9XCJvcGVyYXRvclwiIChvblNlbGVjdCk9XCJvbk9wZXJhdG9yU2VsZWN0KGZvcm1Hcm91cClcIj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpbmNsdWRlXCI+e3sgbGFiZWxzLmVxdWFscyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiZXhjbHVkZVwiPnt7IGxhYmVscy5kb2VzTm90RXF1YWwgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImlzTnVsbFwiPnt7IGxhYmVscy5pc0VtcHR5IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvQ29uZGl0aW9uSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwXCIgW3N0eWxlLndpZHRoLnB4XT1cIjEyNVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXJhZGlvLWdyb3VwIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cInRydWVcIj57eyBmb3JtR3JvdXAudmFsdWUub3BlcmF0b3IgPT09ICdpc051bGwnID8gbGFiZWxzLnllcyA6IGxhYmVscy50cnVlIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgIDxub3ZvLXJhZGlvIFt2YWx1ZV09XCJmYWxzZVwiPnt7IGZvcm1Hcm91cC52YWx1ZS5vcGVyYXRvciA9PT0gJ2lzTnVsbCcgPyBsYWJlbHMubm8gOiBsYWJlbHMuZmFsc2UgfX08L25vdm8tcmFkaW8+XG4gICAgICAgIDwvbm92by1yYWRpby1ncm91cD5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdEJvb2xlYW5Db25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIHtcbiAgZGVmYXVsdE9wZXJhdG9yID0gJ2luY2x1ZGUnO1xufVxuIl19