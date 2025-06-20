import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { Operator } from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/autocomplete";
import * as i5 from "novo-elements/elements/common";
import * as i6 from "novo-elements/elements/select";
import * as i7 from "novo-elements/elements/field";
import * as i8 from "novo-elements/elements/icon";
import * as i9 from "novo-elements/elements/radio";
import * as i10 from "novo-elements/elements/chips";
import * as i11 from "novo-elements/elements/tooltip";
import * as i12 from "../query-builder.directives";
/**
 * Constructing filters against String fields can be complex. Each "chip" added to the
 * condition can be independently used to query a database.  Not all systems support
 * querying within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
export class NovoDefaultStringConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.includeAny;
        this.defineOperatorEditGroup(Operator.includeAny, Operator.includeAll, Operator.excludeAny);
    }
    getValue(formGroup) {
        return formGroup.value?.value || [];
    }
    add(event, formGroup) {
        const input = event.input;
        input.value = '';
        const valueToAdd = event.value;
        if (valueToAdd !== '') {
            const current = this.getValue(formGroup);
            const newValue = Array.isArray(current) ? [...current, valueToAdd] : [valueToAdd];
            this.setFormValue(formGroup, newValue);
        }
    }
    remove(valueToRemove, formGroup) {
        const current = this.getValue(formGroup);
        const index = current.indexOf(valueToRemove);
        if (index >= 0) {
            const value = [...current];
            value.splice(index, 1);
            this.setFormValue(formGroup, value);
        }
    }
    setFormValue(formGroup, newValue) {
        formGroup.get('value').setValue(newValue);
        formGroup.markAsDirty();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDefaultStringConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: NovoDefaultStringConditionDef, selector: "novo-string-condition-def", usesInheritance: true, ngImport: i0, template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll" *ngIf="!meta?.removeIncludeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isEmpty" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-chip-list #chipList aria-label="filter value" formControlName="value">
            <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
              <novo-text ellipsis [tooltip]="chip" tooltipOnOverflow>{{ chip }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [placeholder]="labels.typeToAddChips"
              autocomplete="off"
              (novoChipInputTokenEnd)="add($event, formGroup)"
            />
          </novo-chip-list>
          <novo-autocomplete></novo-autocomplete>
        </novo-field>
        <novo-field *novoSwitchCases="['isEmpty']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.NovoAutocompleteElement, selector: "novo-autocomplete", inputs: ["tabIndex", "triggerOn", "displayWith", "aria-label", "multiple", "disabled", "makeFirstItemActive"], outputs: ["optionSelected", "optionActivated"], exportAs: ["novoAutocomplete"] }, { kind: "component", type: i5.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "directive", type: i5.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i6.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i7.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i8.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i9.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i9.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "component", type: i10.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i10.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "directive", type: i10.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { kind: "component", type: i10.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { kind: "directive", type: i11.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "directive", type: i12.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i12.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i12.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDefaultStringConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-string-condition-def',
                    template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll" *ngIf="!meta?.removeIncludeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isEmpty" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-chip-list #chipList aria-label="filter value" formControlName="value">
            <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
              <novo-text ellipsis [tooltip]="chip" tooltipOnOverflow>{{ chip }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [placeholder]="labels.typeToAddChips"
              autocomplete="off"
              (novoChipInputTokenEnd)="add($event, formGroup)"
            />
          </novo-chip-list>
          <novo-autocomplete></novo-autocomplete>
        </novo-field>
        <novo-field *novoSwitchCases="['isEmpty']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    // Change detection is intentionally not set to OnPush. This component's template will be provided
                    // to the table to be inserted into its view. This is problematic when change detection runs since
                    // the bindings in this template will be evaluated _after_ the table's view is evaluated, which
                    // means the template in the table's view will not have the updated value (and in fact will cause
                    // an ExpressionChangedAfterItHasBeenCheckedError).
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvc3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7Ozs7OztBQUU1RTs7Ozs7R0FLRztBQWdESCxNQUFNLE9BQU8sNkJBQThCLFNBQVEseUJBQXlCO0lBRzFFLFlBQVksWUFBOEI7UUFDeEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBSHRCLG9CQUFlLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUlwQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQTBCO1FBQ2pDLE9BQU8sU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxHQUFHLENBQUMsS0FBVSxFQUFFLFNBQTBCO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDMUIsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLFVBQVUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN0QixNQUFNLE9BQU8sR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sUUFBUSxHQUFVLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekMsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsYUFBcUIsRUFBRSxTQUEwQjtRQUN0RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZixNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUE7WUFDMUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUNILENBQUM7SUFFTyxZQUFZLENBQUMsU0FBMEIsRUFBRSxRQUFlO1FBQzlELFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQixDQUFDOytHQXBDVSw2QkFBNkI7bUdBQTdCLDZCQUE2Qix3RkE3QzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DVDs7NEZBVVUsNkJBQTZCO2tCQS9DekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxrR0FBa0c7b0JBQ2xHLGtHQUFrRztvQkFDbEcsK0ZBQStGO29CQUMvRixpR0FBaUc7b0JBQ2pHLG1EQUFtRDtvQkFDbkQsK0NBQStDO29CQUMvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnR5cGVzJztcbmltcG9ydCB7IEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL2Fic3RyYWN0LWNvbmRpdGlvbi5kZWZpbml0aW9uJztcblxuLyoqXG4gKiBDb25zdHJ1Y3RpbmcgZmlsdGVycyBhZ2FpbnN0IFN0cmluZyBmaWVsZHMgY2FuIGJlIGNvbXBsZXguIEVhY2ggXCJjaGlwXCIgYWRkZWQgdG8gdGhlXG4gKiBjb25kaXRpb24gY2FuIGJlIGluZGVwZW5kZW50bHkgdXNlZCB0byBxdWVyeSBhIGRhdGFiYXNlLiAgTm90IGFsbCBzeXN0ZW1zIHN1cHBvcnRcbiAqIHF1ZXJ5aW5nIHdpdGhpbiBhIHRleHQgY29sdW1uLCBpZSBzcWwgdW5sZXNzIExJS0UgaXMgZW5hYmxlZC4gVGhpcyBjb3VsZCByZXN1bHQgaW4gYVxuICogcGVyZm9ybWFuY2UgcGVuYWx0eS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zdHJpbmctY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSBmaWVsZFR5cGVzIHNob3VsZCBiZSBVUFBFUkNBU0UgLS0+XG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY9XCJTVFJJTkdcIj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmPVwibGV0IGZvcm1Hcm91cDsgZmllbGRNZXRhIGFzIG1ldGFcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5vcGVyYXRvclwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCIgKG9uU2VsZWN0KT1cIm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKVwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluY2x1ZGVBbnlcIj57eyBsYWJlbHMuaW5jbHVkZUFueSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFsbFwiICpuZ0lmPVwiIW1ldGE/LnJlbW92ZUluY2x1ZGVBbGxcIj57eyBsYWJlbHMuaW5jbHVkZUFsbCB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiZXhjbHVkZUFueVwiPnt7IGxhYmVscy5leGNsdWRlIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpc0VtcHR5XCIgKm5nSWY9XCIhbWV0YT8ucmVtb3ZlSXNFbXB0eVwiPnt7IGxhYmVscy5pc0VtcHR5IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5vdm9Db25kaXRpb25JbnB1dERlZj1cImxldCBmb3JtR3JvdXBcIiBbbmdTd2l0Y2hdPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnaW5jbHVkZUFueScsICdpbmNsdWRlQWxsJywgJ2V4Y2x1ZGVBbnknXVwiPlxuICAgICAgICAgIDxub3ZvLWNoaXAtbGlzdCAjY2hpcExpc3QgYXJpYS1sYWJlbD1cImZpbHRlciB2YWx1ZVwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICA8bm92by1jaGlwICpuZ0Zvcj1cImxldCBjaGlwIG9mIGZvcm1Hcm91cC52YWx1ZT8udmFsdWUgfHwgW11cIiBbdmFsdWVdPVwiY2hpcFwiIChyZW1vdmVkKT1cInJlbW92ZShjaGlwLCBmb3JtR3JvdXApXCI+XG4gICAgICAgICAgICAgIDxub3ZvLXRleHQgZWxsaXBzaXMgW3Rvb2x0aXBdPVwiY2hpcFwiIHRvb2x0aXBPbk92ZXJmbG93Pnt7IGNoaXAgfX08L25vdm8tdGV4dD5cbiAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT5jbG9zZTwvbm92by1pY29uPlxuICAgICAgICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgbm92b0NoaXBJbnB1dFxuICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnR5cGVUb0FkZENoaXBzXCJcbiAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgKG5vdm9DaGlwSW5wdXRUb2tlbkVuZCk9XCJhZGQoJGV2ZW50LCBmb3JtR3JvdXApXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9ub3ZvLWNoaXAtbGlzdD5cbiAgICAgICAgICA8bm92by1hdXRvY29tcGxldGU+PC9ub3ZvLWF1dG9jb21wbGV0ZT5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydpc0VtcHR5J11cIj5cbiAgICAgICAgICA8bm92by1yYWRpby1ncm91cCBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cInRydWVcIj57eyBsYWJlbHMueWVzIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cImZhbHNlXCI+e3sgbGFiZWxzLm5vIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgIDwvbm92by1yYWRpby1ncm91cD5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIENoYW5nZSBkZXRlY3Rpb24gaXMgaW50ZW50aW9uYWxseSBub3Qgc2V0IHRvIE9uUHVzaC4gVGhpcyBjb21wb25lbnQncyB0ZW1wbGF0ZSB3aWxsIGJlIHByb3ZpZGVkXG4gIC8vIHRvIHRoZSB0YWJsZSB0byBiZSBpbnNlcnRlZCBpbnRvIGl0cyB2aWV3LiBUaGlzIGlzIHByb2JsZW1hdGljIHdoZW4gY2hhbmdlIGRldGVjdGlvbiBydW5zIHNpbmNlXG4gIC8vIHRoZSBiaW5kaW5ncyBpbiB0aGlzIHRlbXBsYXRlIHdpbGwgYmUgZXZhbHVhdGVkIF9hZnRlcl8gdGhlIHRhYmxlJ3MgdmlldyBpcyBldmFsdWF0ZWQsIHdoaWNoXG4gIC8vIG1lYW5zIHRoZSB0ZW1wbGF0ZSBpbiB0aGUgdGFibGUncyB2aWV3IHdpbGwgbm90IGhhdmUgdGhlIHVwZGF0ZWQgdmFsdWUgKGFuZCBpbiBmYWN0IHdpbGwgY2F1c2VcbiAgLy8gYW4gRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvcikuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHRTdHJpbmdDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIHtcbiAgZGVmYXVsdE9wZXJhdG9yID0gT3BlcmF0b3IuaW5jbHVkZUFueTtcblxuICBjb25zdHJ1Y3RvcihsYWJlbFNlcnZpY2U6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihsYWJlbFNlcnZpY2UpO1xuICAgIHRoaXMuZGVmaW5lT3BlcmF0b3JFZGl0R3JvdXAoT3BlcmF0b3IuaW5jbHVkZUFueSwgT3BlcmF0b3IuaW5jbHVkZUFsbCwgT3BlcmF0b3IuZXhjbHVkZUFueSk7XG4gIH1cblxuICBnZXRWYWx1ZShmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IGFueVtdIHtcbiAgICByZXR1cm4gZm9ybUdyb3VwLnZhbHVlPy52YWx1ZSB8fCBbXTtcbiAgfVxuXG4gIGFkZChldmVudDogYW55LCBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQuaW5wdXQ7XG4gICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICBjb25zdCB2YWx1ZVRvQWRkID0gZXZlbnQudmFsdWU7XG4gICAgaWYgKHZhbHVlVG9BZGQgIT09ICcnKSB7XG4gICAgICBjb25zdCBjdXJyZW50OiBhbnlbXSA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlOiBhbnlbXSA9IEFycmF5LmlzQXJyYXkoY3VycmVudCkgPyBbLi4uY3VycmVudCwgdmFsdWVUb0FkZF0gOiBbdmFsdWVUb0FkZF07XG4gICAgICB0aGlzLnNldEZvcm1WYWx1ZShmb3JtR3JvdXAsIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUodmFsdWVUb1JlbW92ZTogc3RyaW5nLCBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgY29uc3QgaW5kZXggPSBjdXJyZW50LmluZGV4T2YodmFsdWVUb1JlbW92ZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gWy4uLmN1cnJlbnRdXG4gICAgICB2YWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdGhpcy5zZXRGb3JtVmFsdWUoZm9ybUdyb3VwLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRGb3JtVmFsdWUoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIG5ld1ZhbHVlOiBhbnlbXSkge1xuICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUobmV3VmFsdWUpO1xuICAgIGZvcm1Hcm91cC5tYXJrQXNEaXJ0eSgpO1xuICB9XG59XG4iXX0=