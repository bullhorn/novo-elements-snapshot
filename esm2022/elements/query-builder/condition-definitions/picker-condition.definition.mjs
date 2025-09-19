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
import * as i7 from "novo-elements/elements/icon";
import * as i8 from "novo-elements/elements/radio";
import * as i9 from "novo-elements/elements/select-search";
import * as i10 from "../query-builder.directives";
/**
 * Handle selection of field values when a list of options is provided.
 */
export class NovoDefaultPickerConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.includeAny;
        this.defineOperatorEditGroup(Operator.includeAny, Operator.includeAll, Operator.excludeAny);
    }
    showAddOption(meta, select, filterValue) {
        if (!(meta?.allowCustomFilterValues)) {
            return false;
        }
        filterValue = filterValue?.trim().toLowerCase();
        if (!filterValue) {
            return false;
        }
        if (select.value && select.value.find(selectValue => selectValue.trim().toLowerCase() === filterValue)) {
            return false;
        }
        return meta?.options && meta.options.find(opt => {
            const optionLabel = opt.label.trim().toLowerCase();
            return optionLabel === filterValue;
        }) == null;
    }
    optionTracker(option) {
        return `${option.value}~~~${option.label}`;
    }
    hideOption(option, filterValue) {
        return filterValue && (option.value.toString().indexOf(filterValue) === -1 &&
            !option.label.toLowerCase().includes(filterValue.toLowerCase()));
    }
    customOptions(options, select) {
        return select.value?.filter((selectedOption) => {
            return (!options || !(options.find(option => option.value === selectedOption)));
        }).map(value => ({
            value,
            label: value
        }));
    }
    applyCustomItem() {
        // Method to handle adding a new item when "Add Item" is selected
        // This is a placeholder for potential custom logic to add new items
        // Could be implemented to open a modal, trigger a service call, etc.
        console.warn('Custom item addition not implemented');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDefaultPickerConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.12", type: NovoDefaultPickerConditionDef, selector: "novo-picker-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll" *ngIf="!meta?.removeIncludeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-select #select extupdatefix formControlName="value" [placeholder]="labels.select" [multiple]="true">
            <novo-option [disabled]="!meta?.allowCustomFilterValues" [hidden]="!meta?.allowCustomFilterValues">
              <novo-select-search #filterInput allowDeselectDuringFilter></novo-select-search>
            </novo-option>
            <!-- WHat about optionUrl/optionType -->
            @for (option of meta?.options; track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
            @for (option of customOptions(meta?.options, select); track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
            <novo-option class="add-option" *ngIf="showAddOption(meta, select, filterInput?.value)" [value]="filterInput?.value" [allowSelection]="false">
              {{filterInput.value}}
              <novo-icon class="add-icon" novoSuffix>add-thin</novo-icon>
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i4.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "directive", type: i5.NovoSelectExtUpdateFix, selector: "novo-select[extupdatefix]" }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "component", type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i7.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i8.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i8.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "component", type: i9.NovoSelectSearchComponent, selector: "novo-select-search", inputs: ["name", "placeholderLabel", "type", "noEntriesFoundLabel", "indexAndLengthScreenReaderText", "clearSearchInput", "searching", "disableInitialFocus", "enableClearOnEscapePressed", "allowDeselectDuringFilter", "preventHomeEndKeyPropagation", "disableScrollToActiveOnOptionsChanged", "ariaLabel", "showToggleAllCheckbox", "toggleAllCheckboxChecked", "toggleAllCheckboxIndeterminate", "toggleAllCheckboxTooltipMessage", "toogleAllCheckboxTooltipPosition", "hideClearSearchButton", "alwaysRestoreSelectedOptionsMulti"], outputs: ["toggleAll"] }, { kind: "directive", type: i10.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i10.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i10.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDefaultPickerConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-picker-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll" *ngIf="!meta?.removeIncludeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-select #select extupdatefix formControlName="value" [placeholder]="labels.select" [multiple]="true">
            <novo-option [disabled]="!meta?.allowCustomFilterValues" [hidden]="!meta?.allowCustomFilterValues">
              <novo-select-search #filterInput allowDeselectDuringFilter></novo-select-search>
            </novo-option>
            <!-- WHat about optionUrl/optionType -->
            @for (option of meta?.options; track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
            @for (option of customOptions(meta?.options, select); track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
            <novo-option class="add-option" *ngIf="showAddOption(meta, select, filterInput?.value)" [value]="filterInput?.value" [allowSelection]="false">
              {{filterInput.value}}
              <novo-icon class="add-icon" novoSuffix>add-thin</novo-icon>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvcGlja2VyLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFnQixRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FBTTVFOztHQUVHO0FBZ0RILE1BQU0sT0FBTyw2QkFBOEIsU0FBUSx5QkFBeUI7SUFHMUUsWUFBWSxZQUE4QjtRQUN4QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFIdEIsb0JBQWUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBSXBDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFtQjtRQUM3QyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLENBQUMsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELFdBQVcsR0FBRyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQ3ZHLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELE9BQU8sSUFBSSxFQUFFLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25ELE9BQU8sV0FBVyxLQUFLLFdBQVcsQ0FBQztRQUNyQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDYixDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQW1CO1FBQy9CLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxNQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQW1CLEVBQUUsV0FBbUI7UUFDakQsT0FBTyxXQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBc0IsRUFBRSxNQUF5QjtRQUM3RCxPQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsY0FBc0IsRUFBRSxFQUFFO1lBQ3JELE9BQU8sQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDZixLQUFLO1lBQ0wsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxlQUFlO1FBQ2IsaUVBQWlFO1FBQ2pFLG9FQUFvRTtRQUNwRSxxRUFBcUU7UUFDckUsT0FBTyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBRXZELENBQUM7K0dBakRVLDZCQUE2QjttR0FBN0IsNkJBQTZCLHdGQTdDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNUOzs0RkFJVSw2QkFBNkI7a0JBL0N6QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q1Q7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCYXNlRmllbGREZWYsIE9wZXJhdG9yIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9zZWxlY3Qtc2VhcmNoJztcbmltcG9ydCB7IE5vdm9TZWxlY3RFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9zZWxlY3QnO1xuaW1wb3J0IHsgTm92b09wdGlvbiB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcblxudHlwZSBGaWVsZE9wdGlvbiA9IEJhc2VGaWVsZERlZlsnb3B0aW9ucyddW251bWJlcl07XG4vKipcbiAqIEhhbmRsZSBzZWxlY3Rpb24gb2YgZmllbGQgdmFsdWVzIHdoZW4gYSBsaXN0IG9mIG9wdGlvbnMgaXMgcHJvdmlkZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcGlja2VyLWNvbmRpdGlvbi1kZWYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbm92b0NvbmRpdGlvbkZpZWxkRGVmPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwOyBmaWVsZE1ldGEgYXMgbWV0YVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLm9wZXJhdG9yXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIiAob25TZWxlY3QpPVwib25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXApXCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFueVwiPnt7IGxhYmVscy5pbmNsdWRlQW55IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpbmNsdWRlQWxsXCIgKm5nSWY9XCIhbWV0YT8ucmVtb3ZlSW5jbHVkZUFsbFwiPnt7IGxhYmVscy5pbmNsdWRlQWxsIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJleGNsdWRlQW55XCI+e3sgbGFiZWxzLmV4Y2x1ZGUgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImlzTnVsbFwiICpuZ0lmPVwiIW1ldGE/LnJlbW92ZUlzRW1wdHlcIj57eyBsYWJlbHMuaXNFbXB0eSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bmctY29udGFpbmVyICpub3ZvQ29uZGl0aW9uSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwOyBmaWVsZE1ldGEgYXMgbWV0YVwiIFtuZ1N3aXRjaF09XCJmb3JtR3JvdXAudmFsdWUub3BlcmF0b3JcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydpbmNsdWRlQW55JywgJ2luY2x1ZGVBbGwnLCAnZXhjbHVkZUFueSddXCI+XG4gICAgICAgICAgPG5vdm8tc2VsZWN0ICNzZWxlY3QgZXh0dXBkYXRlZml4IGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5zZWxlY3RcIiBbbXVsdGlwbGVdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPG5vdm8tb3B0aW9uIFtkaXNhYmxlZF09XCIhbWV0YT8uYWxsb3dDdXN0b21GaWx0ZXJWYWx1ZXNcIiBbaGlkZGVuXT1cIiFtZXRhPy5hbGxvd0N1c3RvbUZpbHRlclZhbHVlc1wiPlxuICAgICAgICAgICAgICA8bm92by1zZWxlY3Qtc2VhcmNoICNmaWx0ZXJJbnB1dCBhbGxvd0Rlc2VsZWN0RHVyaW5nRmlsdGVyPjwvbm92by1zZWxlY3Qtc2VhcmNoPlxuICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgIDwhLS0gV0hhdCBhYm91dCBvcHRpb25Vcmwvb3B0aW9uVHlwZSAtLT5cbiAgICAgICAgICAgIEBmb3IgKG9wdGlvbiBvZiBtZXRhPy5vcHRpb25zOyB0cmFjayBvcHRpb25UcmFja2VyKSB7XG4gICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBbaGlkZGVuXT1cImhpZGVPcHRpb24ob3B0aW9uLCBmaWx0ZXJJbnB1dD8udmFsdWUpXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi12YWx1ZV09XCJvcHRpb24ubGFiZWxcIj5cbiAgICAgICAgICAgICAgICB7eyBvcHRpb24ubGFiZWx9fVxuICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQGZvciAob3B0aW9uIG9mIGN1c3RvbU9wdGlvbnMobWV0YT8ub3B0aW9ucywgc2VsZWN0KTsgdHJhY2sgb3B0aW9uVHJhY2tlcikge1xuICAgICAgICAgICAgICA8bm92by1vcHRpb24gW2hpZGRlbl09XCJoaWRlT3B0aW9uKG9wdGlvbiwgZmlsdGVySW5wdXQ/LnZhbHVlKVwiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24tdmFsdWVdPVwib3B0aW9uLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAge3sgb3B0aW9uLmxhYmVsfX1cbiAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBjbGFzcz1cImFkZC1vcHRpb25cIiAqbmdJZj1cInNob3dBZGRPcHRpb24obWV0YSwgc2VsZWN0LCBmaWx0ZXJJbnB1dD8udmFsdWUpXCIgW3ZhbHVlXT1cImZpbHRlcklucHV0Py52YWx1ZVwiIFthbGxvd1NlbGVjdGlvbl09XCJmYWxzZVwiPlxuICAgICAgICAgICAgICB7e2ZpbHRlcklucHV0LnZhbHVlfX1cbiAgICAgICAgICAgICAgPG5vdm8taWNvbiBjbGFzcz1cImFkZC1pY29uXCIgbm92b1N1ZmZpeD5hZGQtdGhpbjwvbm92by1pY29uPlxuICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ2lzTnVsbCddXCI+XG4gICAgICAgICAgPG5vdm8tcmFkaW8tZ3JvdXAgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgIDxub3ZvLXJhZGlvIFt2YWx1ZV09XCJ0cnVlXCI+e3sgbGFiZWxzLnllcyB9fTwvbm92by1yYWRpbz5cbiAgICAgICAgICAgIDxub3ZvLXJhZGlvIFt2YWx1ZV09XCJmYWxzZVwiPnt7IGxhYmVscy5ubyB9fTwvbm92by1yYWRpbz5cbiAgICAgICAgICA8L25vdm8tcmFkaW8tZ3JvdXA+XG4gICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EZWZhdWx0UGlja2VyQ29uZGl0aW9uRGVmIGV4dGVuZHMgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB7XG4gIGRlZmF1bHRPcGVyYXRvciA9IE9wZXJhdG9yLmluY2x1ZGVBbnk7XG5cbiAgY29uc3RydWN0b3IobGFiZWxTZXJ2aWNlOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobGFiZWxTZXJ2aWNlKTtcbiAgICB0aGlzLmRlZmluZU9wZXJhdG9yRWRpdEdyb3VwKE9wZXJhdG9yLmluY2x1ZGVBbnksIE9wZXJhdG9yLmluY2x1ZGVBbGwsIE9wZXJhdG9yLmV4Y2x1ZGVBbnkpO1xuICB9XG5cbiAgc2hvd0FkZE9wdGlvbihtZXRhLCBzZWxlY3QsIGZpbHRlclZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIShtZXRhPy5hbGxvd0N1c3RvbUZpbHRlclZhbHVlcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZmlsdGVyVmFsdWUgPSBmaWx0ZXJWYWx1ZT8udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFmaWx0ZXJWYWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0LnZhbHVlICYmIHNlbGVjdC52YWx1ZS5maW5kKHNlbGVjdFZhbHVlID0+IHNlbGVjdFZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBmaWx0ZXJWYWx1ZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG1ldGE/Lm9wdGlvbnMgJiYgbWV0YS5vcHRpb25zLmZpbmQob3B0ID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gb3B0LmxhYmVsLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIG9wdGlvbkxhYmVsID09PSBmaWx0ZXJWYWx1ZTtcbiAgICB9KSA9PSBudWxsO1xuICB9XG5cbiAgb3B0aW9uVHJhY2tlcihvcHRpb246IEZpZWxkT3B0aW9uKSB7XG4gICAgcmV0dXJuIGAke29wdGlvbi52YWx1ZX1+fn4ke29wdGlvbi5sYWJlbH1gO1xuICB9XG5cbiAgaGlkZU9wdGlvbihvcHRpb246IEZpZWxkT3B0aW9uLCBmaWx0ZXJWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZpbHRlclZhbHVlICYmIChvcHRpb24udmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKGZpbHRlclZhbHVlKSA9PT0gLTEgJiZcbiAgICAgICAgIW9wdGlvbi5sYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclZhbHVlLnRvTG93ZXJDYXNlKCkpKTtcbiAgfVxuXG4gIGN1c3RvbU9wdGlvbnMob3B0aW9uczogRmllbGRPcHRpb25bXSwgc2VsZWN0OiBOb3ZvU2VsZWN0RWxlbWVudCk6IEZpZWxkT3B0aW9uW10ge1xuICAgIHJldHVybiBzZWxlY3QudmFsdWU/LmZpbHRlcigoc2VsZWN0ZWRPcHRpb246IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuICghb3B0aW9ucyB8fCAhKG9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBzZWxlY3RlZE9wdGlvbikpKTtcbiAgICB9KS5tYXAodmFsdWUgPT4gKHtcbiAgICAgIHZhbHVlLFxuICAgICAgbGFiZWw6IHZhbHVlXG4gICAgfSkpO1xuICB9XG5cbiAgYXBwbHlDdXN0b21JdGVtKCkge1xuICAgIC8vIE1ldGhvZCB0byBoYW5kbGUgYWRkaW5nIGEgbmV3IGl0ZW0gd2hlbiBcIkFkZCBJdGVtXCIgaXMgc2VsZWN0ZWRcbiAgICAvLyBUaGlzIGlzIGEgcGxhY2Vob2xkZXIgZm9yIHBvdGVudGlhbCBjdXN0b20gbG9naWMgdG8gYWRkIG5ldyBpdGVtc1xuICAgIC8vIENvdWxkIGJlIGltcGxlbWVudGVkIHRvIG9wZW4gYSBtb2RhbCwgdHJpZ2dlciBhIHNlcnZpY2UgY2FsbCwgZXRjLlxuICAgIGNvbnNvbGUud2FybignQ3VzdG9tIGl0ZW0gYWRkaXRpb24gbm90IGltcGxlbWVudGVkJyk7XG5cbiAgfVxufVxuIl19