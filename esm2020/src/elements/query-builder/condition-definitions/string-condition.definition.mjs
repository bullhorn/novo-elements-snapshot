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
 * Contruction filters against String fields can be complex. Each "chip" added to the
 * condition can be used to indendantly used to query a database.  Not all systems support
 * quering within a text column, ie sql unless LIKE is enabled. This could result in a
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
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="includeAll">Include All</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup">
        <novo-chip-list #chipList aria-label="filter value">
          <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
            {{ chip }}
            <novo-icon novoChipRemove>close</novo-icon>
          </novo-chip>
          <input
            novoChipInput
            placeholder="Type to add chips..."
            autocomplete="off"
            (novoChipInputTokenEnd)="add($event, formGroup)"
          />
        </novo-chip-list>
        <novo-autocomplete></novo-autocomplete>
      </novo-field>
    </ng-container>
  `, isInline: true, components: [{ type: i1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i4.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i5.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i6.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i7.NovoAutocompleteElement, selector: "novo-autocomplete", inputs: ["tabIndex", "triggerOn", "displayWith", "aria-label", "multiple", "disabled"], outputs: ["optionSelected", "optionActivated"], exportAs: ["novoAutocomplete"] }], directives: [{ type: i8.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: i8.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i9.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i9.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i8.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i11.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultStringConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-string-condition-def',
                    template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="includeAll">Include All</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup">
        <novo-chip-list #chipList aria-label="filter value">
          <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
            {{ chip }}
            <novo-icon novoChipRemove>close</novo-icon>
          </novo-chip>
          <input
            novoChipInput
            placeholder="Type to add chips..."
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvc3RyaW5nLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUU1RTs7Ozs7R0FLRztBQXVDSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEseUJBQXlCO0lBdEM1RTs7UUF1Q0UsdUJBQWtCLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsb0JBQWUsR0FBRyxZQUFZLENBQUM7S0E2QmhDO0lBM0JDLFFBQVEsQ0FBQyxTQUEwQjtRQUNqQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQVUsRUFBRSxTQUEwQjtRQUN4QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxVQUFVLEtBQUssRUFBRSxFQUFFO1lBQ3JCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzNCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUMvQztpQkFBTTtnQkFDTCxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7U0FDRjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsYUFBcUIsRUFBRSxTQUEwQjtRQUN0RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFBO1lBQzdCLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7MkhBOUJVLDZCQUE2QjsrR0FBN0IsNkJBQTZCLHdGQXBDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJUOzRGQVVVLDZCQUE2QjtrQkF0Q3pDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsa0dBQWtHO29CQUNsRyxrR0FBa0c7b0JBQ2xHLCtGQUErRjtvQkFDL0Ysa0dBQWtHO29CQUNsRyxtREFBbUQ7b0JBQ25ELCtDQUErQztvQkFDL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ09NTUEsIEVOVEVSIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4vYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuXG4vKipcbiAqIENvbnRydWN0aW9uIGZpbHRlcnMgYWdhaW5zdCBTdHJpbmcgZmllbGRzIGNhbiBiZSBjb21wbGV4LiBFYWNoIFwiY2hpcFwiIGFkZGVkIHRvIHRoZVxuICogY29uZGl0aW9uIGNhbiBiZSB1c2VkIHRvIGluZGVuZGFudGx5IHVzZWQgdG8gcXVlcnkgYSBkYXRhYmFzZS4gIE5vdCBhbGwgc3lzdGVtcyBzdXBwb3J0XG4gKiBxdWVyaW5nIHdpdGhpbiBhIHRleHQgY29sdW1uLCBpZSBzcWwgdW5sZXNzIExJS0UgaXMgZW5hYmxlZC4gVGhpcyBjb3VsZCByZXN1bHQgaW4gYVxuICogcGVyZm9ybWFuY2UgcGVuYWx0eS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zdHJpbmctY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSBmaWVsZFR5cGVzIHNob3VsZCBiZSBVUFBFUkNBU0UgLS0+XG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY9XCJTVFJJTkdcIj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmPVwibGV0IGZvcm1Hcm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBwbGFjZWhvbGRlcj1cIk9wZXJhdG9yLi4uXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpbmNsdWRlQW55XCI+SW5jbHVkZSBBbnk8L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluY2x1ZGVBbGxcIj5JbmNsdWRlIEFsbDwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiZXhjbHVkZUFueVwiPkV4Y2x1ZGU8L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25JbnB1dERlZj1cImxldCBmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tY2hpcC1saXN0ICNjaGlwTGlzdCBhcmlhLWxhYmVsPVwiZmlsdGVyIHZhbHVlXCI+XG4gICAgICAgICAgPG5vdm8tY2hpcCAqbmdGb3I9XCJsZXQgY2hpcCBvZiBmb3JtR3JvdXAudmFsdWU/LnZhbHVlIHx8IFtdXCIgW3ZhbHVlXT1cImNoaXBcIiAocmVtb3ZlZCk9XCJyZW1vdmUoY2hpcCwgZm9ybUdyb3VwKVwiPlxuICAgICAgICAgICAge3sgY2hpcCB9fVxuICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT5jbG9zZTwvbm92by1pY29uPlxuICAgICAgICAgIDwvbm92by1jaGlwPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgbm92b0NoaXBJbnB1dFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHRvIGFkZCBjaGlwcy4uLlwiXG4gICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgKG5vdm9DaGlwSW5wdXRUb2tlbkVuZCk9XCJhZGQoJGV2ZW50LCBmb3JtR3JvdXApXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L25vdm8tY2hpcC1saXN0PlxuICAgICAgICA8bm92by1hdXRvY29tcGxldGU+PC9ub3ZvLWF1dG9jb21wbGV0ZT5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gQ2hhbmdlIGRldGVjdGlvbiBpcyBpbnRlbnRpb25hbGx5IG5vdCBzZXQgdG8gT25QdXNoLiBUaGlzIGNvbXBvbmVudCdzIHRlbXBsYXRlIHdpbGwgYmUgcHJvdmlkZWRcbiAgLy8gdG8gdGhlIHRhYmxlIHRvIGJlIGluc2VydGVkIGludG8gaXRzIHZpZXcuIFRoaXMgaXMgcHJvYmxlbWF0aWMgd2hlbiBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMgc2luY2VcbiAgLy8gdGhlIGJpbmRpbmdzIGluIHRoaXMgdGVtcGxhdGUgd2lsbCBiZSBldmFsdWF0ZWQgX2FmdGVyXyB0aGUgdGFibGUncyB2aWV3IGlzIGV2YWx1YXRlZCwgd2hpY2hcbiAgLy8gbWVhbidzIHRoZSB0ZW1wbGF0ZSBpbiB0aGUgdGFibGUncyB2aWV3IHdpbGwgbm90IGhhdmUgdGhlIHVwZGF0ZWQgdmFsdWUgKGFuZCBpbiBmYWN0IHdpbGwgY2F1c2VcbiAgLy8gYW4gRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvcikuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHRTdHJpbmdDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIHtcbiAgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUiwgQ09NTUFdO1xuICBkZWZhdWx0T3BlcmF0b3IgPSAnaW5jbHVkZUFueSc7XG5cbiAgZ2V0VmFsdWUoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZvcm1Hcm91cC52YWx1ZT8udmFsdWUgfHwgW107XG4gIH1cblxuICBhZGQoZXZlbnQ6IGFueSwgZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LmlucHV0O1xuICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgY29uc3QgdmFsdWVUb0FkZCA9IGV2ZW50LnZhbHVlO1xuICAgIGlmICh2YWx1ZVRvQWRkICE9PSAnJykge1xuICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJyZW50KSkge1xuICAgICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKFt2YWx1ZVRvQWRkXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKFsuLi5jdXJyZW50LCB2YWx1ZVRvQWRkXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKHZhbHVlVG9SZW1vdmU6IHN0cmluZywgZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5nZXRWYWx1ZShmb3JtR3JvdXApO1xuICAgIGNvbnN0IGluZGV4ID0gY3VycmVudC5pbmRleE9mKHZhbHVlVG9SZW1vdmUpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IFsuLi5jdXJyZW50XVxuICAgICAgb2xkVmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUob2xkVmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIl19