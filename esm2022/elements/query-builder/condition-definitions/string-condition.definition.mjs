import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { Operator } from '../query-builder.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "novo-elements/elements/autocomplete";
import * as i4 from "novo-elements/elements/common";
import * as i5 from "novo-elements/elements/select";
import * as i6 from "novo-elements/elements/field";
import * as i7 from "novo-elements/elements/icon";
import * as i8 from "novo-elements/elements/radio";
import * as i9 from "novo-elements/elements/chips";
import * as i10 from "../query-builder.directives";
/**
 * Constructing filters against String fields can be complex. Each "chip" added to the
 * condition can be independently used to query a database.  Not all systems support
 * querying within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
export class NovoDefaultStringConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = Operator.includeAny;
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
            if (!Array.isArray(current)) {
                formGroup.get('value').setValue([valueToAdd]);
            }
            else {
                formGroup.get('value').setValue([...current, valueToAdd]);
            }
        }
    }
    remove(valueToRemove, formGroup) {
        const current = this.getValue(formGroup);
        const index = current.indexOf(valueToRemove);
        if (index >= 0) {
            const oldValue = [...current];
            oldValue.splice(index, 1);
            formGroup.get('value').setValue(oldValue);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultStringConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDefaultStringConditionDef, selector: "novo-string-condition-def", usesInheritance: true, ngImport: i0, template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-chip-list #chipList aria-label="filter value" formControlName="value">
            <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
              <novo-text ellipsis>{{ chip }}</novo-text>
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3.NovoAutocompleteElement, selector: "novo-autocomplete", inputs: ["tabIndex", "triggerOn", "displayWith", "aria-label", "multiple", "disabled"], outputs: ["optionSelected", "optionActivated"], exportAs: ["novoAutocomplete"] }, { kind: "component", type: i4.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "directive", type: i4.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "component", type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i7.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i8.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i8.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "component", type: i9.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i9.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "directive", type: i9.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { kind: "component", type: i9.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { kind: "directive", type: i10.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i10.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i10.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultStringConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-string-condition-def',
                    template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-chip-list #chipList aria-label="filter value" formControlName="value">
            <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
              <novo-text ellipsis>{{ chip }}</novo-text>
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
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvc3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7Ozs7QUFFbEQ7Ozs7O0dBS0c7QUFnREgsTUFBTSxPQUFPLDZCQUE4QixTQUFRLHlCQUF5QjtJQS9DNUU7O1FBZ0RFLG9CQUFlLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztLQTZCdkM7SUEzQkMsUUFBUSxDQUFDLFNBQTBCO1FBQ2pDLE9BQU8sU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxHQUFHLENBQUMsS0FBVSxFQUFFLFNBQTBCO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDMUIsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLFVBQVUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN0QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQzVCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNoRCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFxQixFQUFFLFNBQTBCO1FBQ3RELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNmLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQTtZQUM3QixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0gsQ0FBQzs4R0E3QlUsNkJBQTZCO2tHQUE3Qiw2QkFBNkIsd0ZBN0M5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ1Q7OzJGQVVVLDZCQUE2QjtrQkEvQ3pDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsa0dBQWtHO29CQUNsRyxrR0FBa0c7b0JBQ2xHLCtGQUErRjtvQkFDL0YsaUdBQWlHO29CQUNqRyxtREFBbUQ7b0JBQ25ELCtDQUErQztvQkFDL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL2Fic3RyYWN0LWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5cbi8qKlxuICogQ29uc3RydWN0aW5nIGZpbHRlcnMgYWdhaW5zdCBTdHJpbmcgZmllbGRzIGNhbiBiZSBjb21wbGV4LiBFYWNoIFwiY2hpcFwiIGFkZGVkIHRvIHRoZVxuICogY29uZGl0aW9uIGNhbiBiZSBpbmRlcGVuZGVudGx5IHVzZWQgdG8gcXVlcnkgYSBkYXRhYmFzZS4gIE5vdCBhbGwgc3lzdGVtcyBzdXBwb3J0XG4gKiBxdWVyeWluZyB3aXRoaW4gYSB0ZXh0IGNvbHVtbiwgaWUgc3FsIHVubGVzcyBMSUtFIGlzIGVuYWJsZWQuIFRoaXMgY291bGQgcmVzdWx0IGluIGFcbiAqIHBlcmZvcm1hbmNlIHBlbmFsdHkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc3RyaW5nLWNvbmRpdGlvbi1kZWYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gZmllbGRUeXBlcyBzaG91bGQgYmUgVVBQRVJDQVNFIC0tPlxuICAgIDxuZy1jb250YWluZXIgbm92b0NvbmRpdGlvbkZpZWxkRGVmPVwiU1RSSU5HXCI+XG4gICAgICA8bm92by1maWVsZCAqbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5vcGVyYXRvclwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCIgKG9uU2VsZWN0KT1cIm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKVwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluY2x1ZGVBbnlcIj57eyBsYWJlbHMuaW5jbHVkZUFueSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFsbFwiPnt7IGxhYmVscy5pbmNsdWRlQWxsIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJleGNsdWRlQW55XCI+e3sgbGFiZWxzLmV4Y2x1ZGUgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImlzRW1wdHlcIj57eyBsYWJlbHMuaXNFbXB0eSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bmctY29udGFpbmVyICpub3ZvQ29uZGl0aW9uSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwXCIgW25nU3dpdGNoXT1cImZvcm1Hcm91cC52YWx1ZS5vcGVyYXRvclwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ2luY2x1ZGVBbnknLCAnaW5jbHVkZUFsbCcsICdleGNsdWRlQW55J11cIj5cbiAgICAgICAgICA8bm92by1jaGlwLWxpc3QgI2NoaXBMaXN0IGFyaWEtbGFiZWw9XCJmaWx0ZXIgdmFsdWVcIiBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgPG5vdm8tY2hpcCAqbmdGb3I9XCJsZXQgY2hpcCBvZiBmb3JtR3JvdXAudmFsdWU/LnZhbHVlIHx8IFtdXCIgW3ZhbHVlXT1cImNoaXBcIiAocmVtb3ZlZCk9XCJyZW1vdmUoY2hpcCwgZm9ybUdyb3VwKVwiPlxuICAgICAgICAgICAgICA8bm92by10ZXh0IGVsbGlwc2lzPnt7IGNoaXAgfX08L25vdm8tdGV4dD5cbiAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT5jbG9zZTwvbm92by1pY29uPlxuICAgICAgICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgbm92b0NoaXBJbnB1dFxuICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnR5cGVUb0FkZENoaXBzXCJcbiAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgKG5vdm9DaGlwSW5wdXRUb2tlbkVuZCk9XCJhZGQoJGV2ZW50LCBmb3JtR3JvdXApXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9ub3ZvLWNoaXAtbGlzdD5cbiAgICAgICAgICA8bm92by1hdXRvY29tcGxldGU+PC9ub3ZvLWF1dG9jb21wbGV0ZT5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydpc0VtcHR5J11cIj5cbiAgICAgICAgICA8bm92by1yYWRpby1ncm91cCBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cInRydWVcIj57eyBsYWJlbHMueWVzIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgICAgPG5vdm8tcmFkaW8gW3ZhbHVlXT1cImZhbHNlXCI+e3sgbGFiZWxzLm5vIH19PC9ub3ZvLXJhZGlvPlxuICAgICAgICAgIDwvbm92by1yYWRpby1ncm91cD5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIENoYW5nZSBkZXRlY3Rpb24gaXMgaW50ZW50aW9uYWxseSBub3Qgc2V0IHRvIE9uUHVzaC4gVGhpcyBjb21wb25lbnQncyB0ZW1wbGF0ZSB3aWxsIGJlIHByb3ZpZGVkXG4gIC8vIHRvIHRoZSB0YWJsZSB0byBiZSBpbnNlcnRlZCBpbnRvIGl0cyB2aWV3LiBUaGlzIGlzIHByb2JsZW1hdGljIHdoZW4gY2hhbmdlIGRldGVjdGlvbiBydW5zIHNpbmNlXG4gIC8vIHRoZSBiaW5kaW5ncyBpbiB0aGlzIHRlbXBsYXRlIHdpbGwgYmUgZXZhbHVhdGVkIF9hZnRlcl8gdGhlIHRhYmxlJ3MgdmlldyBpcyBldmFsdWF0ZWQsIHdoaWNoXG4gIC8vIG1lYW5zIHRoZSB0ZW1wbGF0ZSBpbiB0aGUgdGFibGUncyB2aWV3IHdpbGwgbm90IGhhdmUgdGhlIHVwZGF0ZWQgdmFsdWUgKGFuZCBpbiBmYWN0IHdpbGwgY2F1c2VcbiAgLy8gYW4gRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvcikuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHRTdHJpbmdDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIHtcbiAgZGVmYXVsdE9wZXJhdG9yID0gT3BlcmF0b3IuaW5jbHVkZUFueTtcblxuICBnZXRWYWx1ZShmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IGFueVtdIHtcbiAgICByZXR1cm4gZm9ybUdyb3VwLnZhbHVlPy52YWx1ZSB8fCBbXTtcbiAgfVxuXG4gIGFkZChldmVudDogYW55LCBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQuaW5wdXQ7XG4gICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICBjb25zdCB2YWx1ZVRvQWRkID0gZXZlbnQudmFsdWU7XG4gICAgaWYgKHZhbHVlVG9BZGQgIT09ICcnKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5nZXRWYWx1ZShmb3JtR3JvdXApO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGN1cnJlbnQpKSB7XG4gICAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUoW3ZhbHVlVG9BZGRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUoWy4uLmN1cnJlbnQsIHZhbHVlVG9BZGRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmUodmFsdWVUb1JlbW92ZTogc3RyaW5nLCBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgY29uc3QgaW5kZXggPSBjdXJyZW50LmluZGV4T2YodmFsdWVUb1JlbW92ZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gWy4uLmN1cnJlbnRdXG4gICAgICBvbGRWYWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZShvbGRWYWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=