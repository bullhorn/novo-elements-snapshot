import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterBuilderComponent } from '../filter-builder.component';
import { DefaultFilterFieldDef } from './default-filter-field.definition';
import * as i0 from "@angular/core";
import * as i1 from "../filter-builder.component";
import * as i2 from "../../../field/field";
import * as i3 from "../../../select/Select";
import * as i4 from "../../../common/option/option.component";
import * as i5 from "../../../chips/ChipList";
import * as i6 from "../../../chips/Chip";
import * as i7 from "../../../icon/Icon";
import * as i8 from "../../../field/autocomplete/autocomplete.component";
import * as i9 from "../base-filter-field.definition";
import * as i10 from "@angular/forms";
import * as i11 from "@angular/common";
import * as i12 from "../../../chips/ChipInput";
/**
 * Contruction filters against String fields can be complex. Each "chip" added to the
 * condition can be used to indendantly used to query a database.  Not all systems support
 * quering within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
export class NovoDefaultStringFilterFieldDef extends DefaultFilterFieldDef {
    constructor(_fb) {
        super(_fb);
        this.inputCtrl = new FormControl();
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
        const current = this.getValue(formGroup);
        if (!Array.isArray(current)) {
            formGroup.get('value').setValue([valueToAdd]);
        }
        else {
            formGroup.get('value').setValue([...current, valueToAdd]);
        }
    }
    remove(valueToRemove, formGroup) {
        const current = this.getValue(formGroup);
        const index = current.indexOf(valueToRemove);
        if (index >= 0) {
            const oldValue = [...current].splice(index, 1);
            oldValue.splice(index, 1);
            formGroup.get('value').setValue(oldValue);
        }
    }
}
NovoDefaultStringFilterFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultStringFilterFieldDef, deps: [{ token: i1.FilterBuilderComponent, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoDefaultStringFilterFieldDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoDefaultStringFilterFieldDef, selector: "novo-string-filter-field-def", usesInheritance: true, ngImport: i0, template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoFilterFieldTypeDef="STRING">
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="includeAll">Include All</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup">
        <novo-chip-list #chipList aria-label="filter value">
          <novo-chip *ngFor="let chip of getValue(formGroup)" [value]="chip" (removed)="remove(chip, formGroup)">
            {{ chip }}
            <novo-icon novoChipRemove>close</novo-icon>
          </novo-chip>
          <input
            novoChipInput
            placeholder="Type to add chips..."
            [formControl]="inputCtrl"
            autocomplete="off"
            (novoChipInputTokenEnd)="add($event, formGroup)"
          />
        </novo-chip-list>
        <novo-autocomplete></novo-autocomplete>
      </novo-field>
    </ng-container>
  `, isInline: true, components: [{ type: i2.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i3.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "inert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i5.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i6.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i7.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i8.NovoAutocompleteElement, selector: "novo-autocomplete", inputs: ["tabIndex", "triggerOn", "displayWith", "aria-label", "multiple", "disabled"], outputs: ["optionSelected", "optionActivated"], exportAs: ["novoAutocomplete"] }], directives: [{ type: i9.NovoFilterFieldTypeDef, selector: "[novoFilterFieldTypeDef]" }, { type: i9.NovoFilterFieldOperatorsDef, selector: "[novoFilterFieldOperatorsDef]" }, { type: i10.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i10.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i9.NovoFilterFieldInputDef, selector: "[novoFilterFieldInputDef]" }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i12.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { type: i10.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i10.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDefaultStringFilterFieldDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-string-filter-field-def',
                    template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoFilterFieldTypeDef="STRING">
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="includeAll">Include All</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup">
        <novo-chip-list #chipList aria-label="filter value">
          <novo-chip *ngFor="let chip of getValue(formGroup)" [value]="chip" (removed)="remove(chip, formGroup)">
            {{ chip }}
            <novo-icon novoChipRemove>close</novo-icon>
          </novo-chip>
          <input
            novoChipInput
            placeholder="Type to add chips..."
            [formControl]="inputCtrl"
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
        }], ctorParameters: function () { return [{ type: i1.FilterBuilderComponent, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWZpbHRlci1maWVsZC5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9maWx0ZXItYnVpbGRlci9kZWZhdWx0LWNvbmRpdGlvbi1kZWZzL3N0cmluZy1maWx0ZXItZmllbGQuZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBbUIsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBRTFFOzs7OztHQUtHO0FBd0NILE1BQU0sT0FBTywrQkFBZ0MsU0FBUSxxQkFBcUI7SUFLeEUsWUFBd0IsR0FBZ0M7UUFDdEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBTGIsY0FBUyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDOUIsdUJBQWtCLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsb0JBQWUsR0FBRyxZQUFZLENBQUM7SUFJL0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUEwQjtRQUNqQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQVUsRUFBRSxTQUEwQjtRQUN4QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDL0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMzQixTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNMLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsYUFBcUIsRUFBRSxTQUEwQjtRQUN0RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs0SEFqQ1UsK0JBQStCO2dIQUEvQiwrQkFBK0IsMkZBckNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUOzJGQVVVLCtCQUErQjtrQkF2QzNDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGtHQUFrRztvQkFDbEcsa0dBQWtHO29CQUNsRywrRkFBK0Y7b0JBQy9GLGtHQUFrRztvQkFDbEcsbURBQW1EO29CQUNuRCwrQ0FBK0M7b0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRDs7MEJBTWMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENPTU1BLCBFTlRFUiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPcHRpb25hbCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWx0ZXJCdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWJ1aWxkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlZmF1bHRGaWx0ZXJGaWVsZERlZiB9IGZyb20gJy4vZGVmYXVsdC1maWx0ZXItZmllbGQuZGVmaW5pdGlvbic7XG5cbi8qKlxuICogQ29udHJ1Y3Rpb24gZmlsdGVycyBhZ2FpbnN0IFN0cmluZyBmaWVsZHMgY2FuIGJlIGNvbXBsZXguIEVhY2ggXCJjaGlwXCIgYWRkZWQgdG8gdGhlXG4gKiBjb25kaXRpb24gY2FuIGJlIHVzZWQgdG8gaW5kZW5kYW50bHkgdXNlZCB0byBxdWVyeSBhIGRhdGFiYXNlLiAgTm90IGFsbCBzeXN0ZW1zIHN1cHBvcnRcbiAqIHF1ZXJpbmcgd2l0aGluIGEgdGV4dCBjb2x1bW4sIGllIHNxbCB1bmxlc3MgTElLRSBpcyBlbmFibGVkLiBUaGlzIGNvdWxkIHJlc3VsdCBpbiBhXG4gKiBwZXJmb3JtYW5jZSBwZW5hbHR5LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXN0cmluZy1maWx0ZXItZmllbGQtZGVmJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tIGZpZWxkVHlwZXMgc2hvdWxkIGJlIFVQUEVSQ0FTRSAtLT5cbiAgICA8bmctY29udGFpbmVyIG5vdm9GaWx0ZXJGaWVsZFR5cGVEZWY9XCJTVFJJTkdcIj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvRmlsdGVyRmllbGRPcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0IHBsYWNlaG9sZGVyPVwiT3BlcmF0b3IuLi5cIiBmb3JtQ29udHJvbE5hbWU9XCJvcGVyYXRvclwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluY2x1ZGVBbnlcIj5JbmNsdWRlIEFueTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFsbFwiPkluY2x1ZGUgQWxsPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJleGNsdWRlQW55XCI+RXhjbHVkZTwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bm92by1maWVsZCAqbm92b0ZpbHRlckZpZWxkSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLWNoaXAtbGlzdCAjY2hpcExpc3QgYXJpYS1sYWJlbD1cImZpbHRlciB2YWx1ZVwiPlxuICAgICAgICAgIDxub3ZvLWNoaXAgKm5nRm9yPVwibGV0IGNoaXAgb2YgZ2V0VmFsdWUoZm9ybUdyb3VwKVwiIFt2YWx1ZV09XCJjaGlwXCIgKHJlbW92ZWQpPVwicmVtb3ZlKGNoaXAsIGZvcm1Hcm91cClcIj5cbiAgICAgICAgICAgIHt7IGNoaXAgfX1cbiAgICAgICAgICAgIDxub3ZvLWljb24gbm92b0NoaXBSZW1vdmU+Y2xvc2U8L25vdm8taWNvbj5cbiAgICAgICAgICA8L25vdm8tY2hpcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG5vdm9DaGlwSW5wdXRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSB0byBhZGQgY2hpcHMuLi5cIlxuICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImlucHV0Q3RybFwiXG4gICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgKG5vdm9DaGlwSW5wdXRUb2tlbkVuZCk9XCJhZGQoJGV2ZW50LCBmb3JtR3JvdXApXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L25vdm8tY2hpcC1saXN0PlxuICAgICAgICA8bm92by1hdXRvY29tcGxldGU+PC9ub3ZvLWF1dG9jb21wbGV0ZT5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gQ2hhbmdlIGRldGVjdGlvbiBpcyBpbnRlbnRpb25hbGx5IG5vdCBzZXQgdG8gT25QdXNoLiBUaGlzIGNvbXBvbmVudCdzIHRlbXBsYXRlIHdpbGwgYmUgcHJvdmlkZWRcbiAgLy8gdG8gdGhlIHRhYmxlIHRvIGJlIGluc2VydGVkIGludG8gaXRzIHZpZXcuIFRoaXMgaXMgcHJvYmxlbWF0aWMgd2hlbiBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMgc2luY2VcbiAgLy8gdGhlIGJpbmRpbmdzIGluIHRoaXMgdGVtcGxhdGUgd2lsbCBiZSBldmFsdWF0ZWQgX2FmdGVyXyB0aGUgdGFibGUncyB2aWV3IGlzIGV2YWx1YXRlZCwgd2hpY2hcbiAgLy8gbWVhbidzIHRoZSB0ZW1wbGF0ZSBpbiB0aGUgdGFibGUncyB2aWV3IHdpbGwgbm90IGhhdmUgdGhlIHVwZGF0ZWQgdmFsdWUgKGFuZCBpbiBmYWN0IHdpbGwgY2F1c2VcbiAgLy8gYW4gRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvcikuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHRTdHJpbmdGaWx0ZXJGaWVsZERlZiBleHRlbmRzIERlZmF1bHRGaWx0ZXJGaWVsZERlZiB7XG4gIGlucHV0Q3RybCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBzZXBhcmF0b3JLZXlzQ29kZXM6IG51bWJlcltdID0gW0VOVEVSLCBDT01NQV07XG4gIGRlZmF1bHRPcGVyYXRvciA9ICdpbmNsdWRlQW55JztcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBfZmI6IEZpbHRlckJ1aWxkZXJDb21wb25lbnQ8YW55Pikge1xuICAgIHN1cGVyKF9mYik7XG4gIH1cblxuICBnZXRWYWx1ZShmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IGFueVtdIHtcbiAgICByZXR1cm4gZm9ybUdyb3VwLnZhbHVlPy52YWx1ZSB8fCBbXTtcbiAgfVxuXG4gIGFkZChldmVudDogYW55LCBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQuaW5wdXQ7XG4gICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICBjb25zdCB2YWx1ZVRvQWRkID0gZXZlbnQudmFsdWU7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudCkpIHtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUoW3ZhbHVlVG9BZGRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZShbLi4uY3VycmVudCwgdmFsdWVUb0FkZF0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSh2YWx1ZVRvUmVtb3ZlOiBzdHJpbmcsIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBjb25zdCBpbmRleCA9IGN1cnJlbnQuaW5kZXhPZih2YWx1ZVRvUmVtb3ZlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBbLi4uY3VycmVudF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIG9sZFZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKG9sZFZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==