import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
import * as i1 from "../../field/field";
import * as i2 from "../../select/Select";
import * as i3 from "../../common/option/option.component";
import * as i4 from "../../chips/ChipList";
import * as i5 from "../../chips/Chip";
import * as i6 from "../../icon/Icon";
import * as i7 from "../../field/autocomplete/autocomplete.component";
import * as i8 from "../query-builder.directives";
import * as i9 from "@angular/forms";
import * as i10 from "@angular/common";
import * as i11 from "../../chips/ChipInput";
/**
 * Constructing filters against String fields can be complex. Each "chip" added to the
 * condition can be independently used to query a database.  Not all systems support
 * querying within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
export class NovoDefaultStringConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.separatorKeysCodes = [ENTER, COMMA];
        this.defaultOperator = 'includeAny';
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
}
NovoDefaultStringConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultStringConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultStringConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultStringConditionDef, selector: "novo-string-condition-def", usesInheritance: true, ngImport: i0, template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [formGroup]="formGroup">
        <novo-chip-list #chipList aria-label="filter value" formControlName="value">
          <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
            {{ chip }}
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
    </ng-container>
  `, isInline: true, components: [{ type: i1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i4.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i5.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i6.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i7.NovoAutocompleteElement, selector: "novo-autocomplete", inputs: ["tabIndex", "triggerOn", "displayWith", "aria-label", "multiple", "disabled"], outputs: ["optionSelected", "optionActivated"], exportAs: ["novoAutocomplete"] }], directives: [{ type: i8.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: i8.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i9.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i9.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i8.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i11.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultStringConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-string-condition-def',
                    template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [formGroup]="formGroup">
        <novo-chip-list #chipList aria-label="filter value" formControlName="value">
          <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
            {{ chip }}
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
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    // Change detection is intentionally not set to OnPush. This component's template will be provided
                    // to the table to be inserted into its view. This is problematic when change detection runs since
                    // the bindings in this template will be evaluated _after_ the table's view is evaluated, which
                    // mean's the template in the table's view will not have the updated value (and in fact will cause
                    // an ExpressionChangedAfterItHasBeenCheckedError).
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvc3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUU1RTs7Ozs7R0FLRztBQXVDSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEseUJBQXlCO0lBdEM1RTs7UUF1Q0UsdUJBQWtCLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsb0JBQWUsR0FBRyxZQUFZLENBQUM7S0E2QmhDO0lBM0JDLFFBQVEsQ0FBQyxTQUEwQjtRQUNqQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQVUsRUFBRSxTQUEwQjtRQUN4QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxVQUFVLEtBQUssRUFBRSxFQUFFO1lBQ3JCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzNCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUMvQztpQkFBTTtnQkFDTCxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7U0FDRjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsYUFBcUIsRUFBRSxTQUEwQjtRQUN0RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFBO1lBQzdCLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7MkhBOUJVLDZCQUE2QjsrR0FBN0IsNkJBQTZCLHdGQXBDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJUOzRGQVVVLDZCQUE2QjtrQkF0Q3pDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsa0dBQWtHO29CQUNsRyxrR0FBa0c7b0JBQ2xHLCtGQUErRjtvQkFDL0Ysa0dBQWtHO29CQUNsRyxtREFBbUQ7b0JBQ25ELCtDQUErQztvQkFDL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ09NTUEsIEVOVEVSIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4vYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuXG4vKipcbiAqIENvbnN0cnVjdGluZyBmaWx0ZXJzIGFnYWluc3QgU3RyaW5nIGZpZWxkcyBjYW4gYmUgY29tcGxleC4gRWFjaCBcImNoaXBcIiBhZGRlZCB0byB0aGVcbiAqIGNvbmRpdGlvbiBjYW4gYmUgaW5kZXBlbmRlbnRseSB1c2VkIHRvIHF1ZXJ5IGEgZGF0YWJhc2UuICBOb3QgYWxsIHN5c3RlbXMgc3VwcG9ydFxuICogcXVlcnlpbmcgd2l0aGluIGEgdGV4dCBjb2x1bW4sIGllIHNxbCB1bmxlc3MgTElLRSBpcyBlbmFibGVkLiBUaGlzIGNvdWxkIHJlc3VsdCBpbiBhXG4gKiBwZXJmb3JtYW5jZSBwZW5hbHR5LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXN0cmluZy1jb25kaXRpb24tZGVmJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tIGZpZWxkVHlwZXMgc2hvdWxkIGJlIFVQUEVSQ0FTRSAtLT5cbiAgICA8bmctY29udGFpbmVyIG5vdm9Db25kaXRpb25GaWVsZERlZj1cIlNUUklOR1wiPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMub3BlcmF0b3JcIiBmb3JtQ29udHJvbE5hbWU9XCJvcGVyYXRvclwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluY2x1ZGVBbnlcIj57eyBsYWJlbHMuaW5jbHVkZUFueSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFsbFwiPnt7IGxhYmVscy5pbmNsdWRlQWxsIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJleGNsdWRlQW55XCI+e3sgbGFiZWxzLmV4Y2x1ZGUgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25JbnB1dERlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1jaGlwLWxpc3QgI2NoaXBMaXN0IGFyaWEtbGFiZWw9XCJmaWx0ZXIgdmFsdWVcIiBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgIDxub3ZvLWNoaXAgKm5nRm9yPVwibGV0IGNoaXAgb2YgZm9ybUdyb3VwLnZhbHVlPy52YWx1ZSB8fCBbXVwiIFt2YWx1ZV09XCJjaGlwXCIgKHJlbW92ZWQpPVwicmVtb3ZlKGNoaXAsIGZvcm1Hcm91cClcIj5cbiAgICAgICAgICAgIHt7IGNoaXAgfX1cbiAgICAgICAgICAgIDxub3ZvLWljb24gbm92b0NoaXBSZW1vdmU+Y2xvc2U8L25vdm8taWNvbj5cbiAgICAgICAgICA8L25vdm8tY2hpcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5vdm9DaGlwSW5wdXRcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJsYWJlbHMudHlwZVRvQWRkQ2hpcHNcIlxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgIChub3ZvQ2hpcElucHV0VG9rZW5FbmQpPVwiYWRkKCRldmVudCwgZm9ybUdyb3VwKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9ub3ZvLWNoaXAtbGlzdD5cbiAgICAgICAgPG5vdm8tYXV0b2NvbXBsZXRlPjwvbm92by1hdXRvY29tcGxldGU+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIENoYW5nZSBkZXRlY3Rpb24gaXMgaW50ZW50aW9uYWxseSBub3Qgc2V0IHRvIE9uUHVzaC4gVGhpcyBjb21wb25lbnQncyB0ZW1wbGF0ZSB3aWxsIGJlIHByb3ZpZGVkXG4gIC8vIHRvIHRoZSB0YWJsZSB0byBiZSBpbnNlcnRlZCBpbnRvIGl0cyB2aWV3LiBUaGlzIGlzIHByb2JsZW1hdGljIHdoZW4gY2hhbmdlIGRldGVjdGlvbiBydW5zIHNpbmNlXG4gIC8vIHRoZSBiaW5kaW5ncyBpbiB0aGlzIHRlbXBsYXRlIHdpbGwgYmUgZXZhbHVhdGVkIF9hZnRlcl8gdGhlIHRhYmxlJ3MgdmlldyBpcyBldmFsdWF0ZWQsIHdoaWNoXG4gIC8vIG1lYW4ncyB0aGUgdGVtcGxhdGUgaW4gdGhlIHRhYmxlJ3MgdmlldyB3aWxsIG5vdCBoYXZlIHRoZSB1cGRhdGVkIHZhbHVlIChhbmQgaW4gZmFjdCB3aWxsIGNhdXNlXG4gIC8vIGFuIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3IpLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EZWZhdWx0U3RyaW5nQ29uZGl0aW9uRGVmIGV4dGVuZHMgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB7XG4gIHNlcGFyYXRvcktleXNDb2RlczogbnVtYmVyW10gPSBbRU5URVIsIENPTU1BXTtcbiAgZGVmYXVsdE9wZXJhdG9yID0gJ2luY2x1ZGVBbnknO1xuXG4gIGdldFZhbHVlKGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogYW55W10ge1xuICAgIHJldHVybiBmb3JtR3JvdXAudmFsdWU/LnZhbHVlIHx8IFtdO1xuICB9XG5cbiAgYWRkKGV2ZW50OiBhbnksIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC5pbnB1dDtcbiAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgIGNvbnN0IHZhbHVlVG9BZGQgPSBldmVudC52YWx1ZTtcbiAgICBpZiAodmFsdWVUb0FkZCAhPT0gJycpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudCkpIHtcbiAgICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZShbdmFsdWVUb0FkZF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZShbLi4uY3VycmVudCwgdmFsdWVUb0FkZF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSh2YWx1ZVRvUmVtb3ZlOiBzdHJpbmcsIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBjb25zdCBpbmRleCA9IGN1cnJlbnQuaW5kZXhPZih2YWx1ZVRvUmVtb3ZlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBbLi4uY3VycmVudF1cbiAgICAgIG9sZFZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKG9sZFZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==