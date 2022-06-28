import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
import * as i1 from "../../field/field";
import * as i2 from "../../select/Select";
import * as i3 from "../../common/option/option.component";
import * as i4 from "../query-builder.directives";
import * as i5 from "@angular/forms";
import * as i6 from "../../field/input";
/**
 * When constructing a query using a field that is an Int, Double, Number ...etc.
 * TODO: Do we implment currency formation here potentially>.?
 */
export class NovoDefaultNumberConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'equalTo';
    }
}
NovoDefaultNumberConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultNumberConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultNumberConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultNumberConditionDef, selector: "novo-number-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="greaterThan">Greater Than</novo-option>
          <novo-option value="lessThan">Less Than</novo-option>
          <novo-option value="equalTo">Equal To</novo-option>
          <!-- <novo-option value="equalTo">Between</novo-option> -->
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
        <input novoInput type="number" formControlName="value" />
      </novo-field>
    </ng-container>
  `, isInline: true, components: [{ type: i1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }], directives: [{ type: i4.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: i4.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i5.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultNumberConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-number-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="greaterThan">Greater Than</novo-option>
          <novo-option value="lessThan">Less Than</novo-option>
          <novo-option value="equalTo">Equal To</novo-option>
          <!-- <novo-option value="equalTo">Between</novo-option> -->
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
        <input novoInput type="number" formControlName="value" />
      </novo-field>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvbnVtYmVyLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7O0FBRTVFOzs7R0FHRztBQXFCSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEseUJBQXlCO0lBcEI1RTs7UUFxQkUsb0JBQWUsR0FBRyxTQUFTLENBQUM7S0FDN0I7OzJIQUZZLDZCQUE2QjsrR0FBN0IsNkJBQTZCLHdGQWxCOUI7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7NEZBSVUsNkJBQTZCO2tCQXBCekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5cbi8qKlxuICogV2hlbiBjb25zdHJ1Y3RpbmcgYSBxdWVyeSB1c2luZyBhIGZpZWxkIHRoYXQgaXMgYW4gSW50LCBEb3VibGUsIE51bWJlciAuLi5ldGMuXG4gKiBUT0RPOiBEbyB3ZSBpbXBsbWVudCBjdXJyZW5jeSBmb3JtYXRpb24gaGVyZSBwb3RlbnRpYWxseT4uP1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW51bWJlci1jb25kaXRpb24tZGVmJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIG5vdm9Db25kaXRpb25GaWVsZERlZj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmPVwibGV0IGZvcm1Hcm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBwbGFjZWhvbGRlcj1cIk9wZXJhdG9yLi4uXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJncmVhdGVyVGhhblwiPkdyZWF0ZXIgVGhhbjwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwibGVzc1RoYW5cIj5MZXNzIFRoYW48L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImVxdWFsVG9cIj5FcXVhbCBUbzwvbm92by1vcHRpb24+XG4gICAgICAgICAgPCEtLSA8bm92by1vcHRpb24gdmFsdWU9XCJlcXVhbFRvXCI+QmV0d2Vlbjwvbm92by1vcHRpb24+IC0tPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25JbnB1dERlZj1cImxldCBmb3JtR3JvdXBcIiBbc3R5bGUud2lkdGgucHhdPVwiMTAwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPGlucHV0IG5vdm9JbnB1dCB0eXBlPVwibnVtYmVyXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiAvPlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EZWZhdWx0TnVtYmVyQ29uZGl0aW9uRGVmIGV4dGVuZHMgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB7XG4gIGRlZmF1bHRPcGVyYXRvciA9ICdlcXVhbFRvJztcbn1cbiJdfQ==