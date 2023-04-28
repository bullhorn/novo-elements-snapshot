import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoPickerToggleElement } from './../../field/toggle/picker-toggle.component';
import { NovoLabelService } from '../../../services';
import * as i0 from "@angular/core";
import * as i1 from "../../../services";
import * as i2 from "../../field/field";
import * as i3 from "../../select/Select";
import * as i4 from "../../common/option/option.component";
import * as i5 from "../../chips/ChipList";
import * as i6 from "../../chips/Chip";
import * as i7 from "../../icon/Icon";
import * as i8 from "../../field/toggle/picker-toggle.component";
import * as i9 from "../../places/places.component";
import * as i10 from "../query-builder.directives";
import * as i11 from "@angular/forms";
import * as i12 from "@angular/common";
import * as i13 from "../../common/directives/switch-cases.directive";
import * as i14 from "../../chips/ChipInput";
import * as i15 from "../../field/picker.directive";
/**
 * Handle selection of field values when a list of options is provided.
 */
export class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
    constructor(element, labels) {
        super(labels);
        this.element = element;
        this.labels = labels;
        this.defaultOperator = 'includeAny';
        this.chipListModel = '';
        this.term = '';
    }
    onKeyup(event) {
        this.term = event.target.value;
    }
    getValue(formGroup) {
        return formGroup.value.value || [];
    }
    getCurrentOverlay(viewIndex) {
        return this.overlayChildren?.find(item => item.overlayId === viewIndex);
    }
    selectPlace(event, formGroup, viewIndex) {
        const valueToAdd = {
            address_components: event.address_components,
            formatted_address: event.formatted_address,
            geometry: event.geometry,
            place_id: event.place_id,
        };
        const current = this.getValue(formGroup);
        if (!Array.isArray(current)) {
            formGroup.get('value').setValue([valueToAdd]);
        }
        else {
            formGroup.get('value').setValue([...current, valueToAdd]);
        }
        this.inputChildren.forEach(input => {
            input.nativeElement.value = '';
        });
        this.getCurrentOverlay(viewIndex)?.closePanel();
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
NovoDefaultAddressConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultAddressConditionDef, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoDefaultAddressConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultAddressConditionDef, selector: "novo-address-condition-def", viewQueries: [{ propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }, { propertyName: "inputChildren", predicate: ["addressInput"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'excludeAny']" #novoField>
          <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }">
            <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup)">
              {{ item.formatted_address }}
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [placeholder]="labels.location"
              (keyup)="onKeyup($event)"
              [picker]="placesPicker"
              #addressInput />
          </novo-chip-list>
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" icon="location" novoSuffix>
            <google-places-list [term]="term" (select)="selectPlace($event, formGroup, viewIndex)" formControlName="value" #placesPicker></google-places-list>
          </novo-picker-toggle>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, components: [{ type: i2.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i3.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i5.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i6.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i7.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i8.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { type: i9.PlacesListComponent, selector: "google-places-list", inputs: ["userSettings", "term"], outputs: ["termChange", "select"] }], directives: [{ type: i10.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: i10.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i11.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i11.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i11.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i11.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i10.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i12.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i13.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i11.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i12.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i14.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { type: i15.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { type: i2.NovoFieldSuffixDirective, selector: "[novoSuffix]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultAddressConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-address-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'excludeAny']" #novoField>
          <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }">
            <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup)">
              {{ item.formatted_address }}
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [placeholder]="labels.location"
              (keyup)="onKeyup($event)"
              [picker]="placesPicker"
              #addressInput />
          </novo-chip-list>
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" icon="location" novoSuffix>
            <google-places-list [term]="term" (select)="selectPlace($event, formGroup, viewIndex)" formControlName="value" #placesPicker></google-places-list>
          </novo-picker-toggle>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }]; }, propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }], inputChildren: [{
                type: ViewChildren,
                args: ['addressInput']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzSCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFckQ7O0dBRUc7QUFtQ0gsTUFBTSxPQUFPLDhCQUErQixTQUFRLHlCQUF5QjtJQU8zRSxZQUFtQixPQUFtQixFQUFTLE1BQXdCO1FBQ3JFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQURHLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUp2RSxvQkFBZSxHQUFHLFlBQVksQ0FBQztRQUMvQixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixTQUFJLEdBQVcsRUFBRSxDQUFDO0lBSWxCLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSztRQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUEwQjtRQUNqQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsU0FBaUI7UUFDakMsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFVLEVBQUUsU0FBMEIsRUFBRSxTQUFpQjtRQUNuRSxNQUFNLFVBQVUsR0FBRztZQUNqQixrQkFBa0IsRUFBRSxLQUFLLENBQUMsa0JBQWtCO1lBQzVDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUI7WUFDMUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtTQUN6QixDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMzQixTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNMLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWtCLEVBQUUsU0FBMEI7UUFDbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNkLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQTtZQUM3QixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7OzRIQWxEVSw4QkFBOEI7Z0hBQTlCLDhCQUE4QixzR0FDM0IsdUJBQXVCLDBKQWpDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlQ7NEZBSVUsOEJBQThCO2tCQWxDMUMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRDtnSUFFd0MsZUFBZTtzQkFBckQsWUFBWTt1QkFBQyx1QkFBdUI7Z0JBQ1AsYUFBYTtzQkFBMUMsWUFBWTt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4sIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheSc7XG5pbXBvcnQgeyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB9IGZyb20gJy4vLi4vLi4vZmllbGQvdG9nZ2xlL3BpY2tlci10b2dnbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XG5cbi8qKlxuICogSGFuZGxlIHNlbGVjdGlvbiBvZiBmaWVsZCB2YWx1ZXMgd2hlbiBhIGxpc3Qgb2Ygb3B0aW9ucyBpcyBwcm92aWRlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZGRyZXNzLWNvbmRpdGlvbi1kZWYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbm92b0NvbmRpdGlvbkZpZWxkRGVmPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMub3BlcmF0b3JcIiBmb3JtQ29udHJvbE5hbWU9XCJvcGVyYXRvclwiIChvblNlbGVjdCk9XCJvbk9wZXJhdG9yU2VsZWN0KGZvcm1Hcm91cClcIj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpbmNsdWRlQW55XCI+e3sgbGFiZWxzLmluY2x1ZGVBbnkgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImV4Y2x1ZGVBbnlcIj57eyBsYWJlbHMuZXhjbHVkZSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bmctY29udGFpbmVyICpub3ZvQ29uZGl0aW9uSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwOyB2aWV3SW5kZXggYXMgdmlld0luZGV4OyBmaWVsZE1ldGEgYXMgbWV0YVwiIFtuZ1N3aXRjaF09XCJmb3JtR3JvdXAudmFsdWUub3BlcmF0b3JcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydpbmNsdWRlQW55JywgJ2V4Y2x1ZGVBbnknXVwiICNub3ZvRmllbGQ+XG4gICAgICAgICAgPG5vdm8tY2hpcC1saXN0IFsobmdNb2RlbCldPVwiY2hpcExpc3RNb2RlbFwiIFtuZ01vZGVsT3B0aW9uc109XCJ7IHN0YW5kYWxvbmU6IHRydWUgfVwiPlxuICAgICAgICAgICAgPG5vdm8tY2hpcCAqbmdGb3I9XCJsZXQgaXRlbSBvZiBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnZhbHVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlKGl0ZW0sIGZvcm1Hcm91cClcIj5cbiAgICAgICAgICAgICAge3sgaXRlbS5mb3JtYXR0ZWRfYWRkcmVzcyB9fVxuICAgICAgICAgICAgICA8bm92by1pY29uIG5vdm9DaGlwUmVtb3ZlPmNsb3NlPC9ub3ZvLWljb24+XG4gICAgICAgICAgICA8L25vdm8tY2hpcD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBub3ZvQ2hpcElucHV0XG4gICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJsYWJlbHMubG9jYXRpb25cIlxuICAgICAgICAgICAgICAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgW3BpY2tlcl09XCJwbGFjZXNQaWNrZXJcIlxuICAgICAgICAgICAgICAjYWRkcmVzc0lucHV0IC8+XG4gICAgICAgICAgPC9ub3ZvLWNoaXAtbGlzdD5cbiAgICAgICAgICA8bm92by1waWNrZXItdG9nZ2xlIHRyaWdnZXJPbkZvY3VzIFtvdmVybGF5SWRdPVwidmlld0luZGV4XCIgaWNvbj1cImxvY2F0aW9uXCIgbm92b1N1ZmZpeD5cbiAgICAgICAgICAgIDxnb29nbGUtcGxhY2VzLWxpc3QgW3Rlcm1dPVwidGVybVwiIChzZWxlY3QpPVwic2VsZWN0UGxhY2UoJGV2ZW50LCBmb3JtR3JvdXAsIHZpZXdJbmRleClcIiBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiICNwbGFjZXNQaWNrZXI+PC9nb29nbGUtcGxhY2VzLWxpc3Q+XG4gICAgICAgICAgPC9ub3ZvLXBpY2tlci10b2dnbGU+XG4gICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EZWZhdWx0QWRkcmVzc0NvbmRpdGlvbkRlZiBleHRlbmRzIEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYge1xuICBAVmlld0NoaWxkcmVuKE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50KSBvdmVybGF5Q2hpbGRyZW46IFF1ZXJ5TGlzdDxOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudD47XG4gIEBWaWV3Q2hpbGRyZW4oJ2FkZHJlc3NJbnB1dCcpIGlucHV0Q2hpbGRyZW46IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgZGVmYXVsdE9wZXJhdG9yID0gJ2luY2x1ZGVBbnknO1xuICBjaGlwTGlzdE1vZGVsOiBhbnkgPSAnJztcbiAgdGVybTogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihsYWJlbHMpO1xuICB9XG5cbiAgb25LZXl1cChldmVudCkge1xuICAgIHRoaXMudGVybSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIGdldFZhbHVlKGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogYW55W10ge1xuICAgIHJldHVybiBmb3JtR3JvdXAudmFsdWUudmFsdWUgfHwgW107XG4gIH1cblxuICBnZXRDdXJyZW50T3ZlcmxheSh2aWV3SW5kZXg6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlDaGlsZHJlbj8uZmluZChpdGVtID0+IGl0ZW0ub3ZlcmxheUlkID09PSB2aWV3SW5kZXgpO1xuICB9XG5cbiAgc2VsZWN0UGxhY2UoZXZlbnQ6IGFueSwgZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHZpZXdJbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVUb0FkZCA9IHtcbiAgICAgIGFkZHJlc3NfY29tcG9uZW50czogZXZlbnQuYWRkcmVzc19jb21wb25lbnRzLFxuICAgICAgZm9ybWF0dGVkX2FkZHJlc3M6IGV2ZW50LmZvcm1hdHRlZF9hZGRyZXNzLFxuICAgICAgZ2VvbWV0cnk6IGV2ZW50Lmdlb21ldHJ5LFxuICAgICAgcGxhY2VfaWQ6IGV2ZW50LnBsYWNlX2lkLFxuICAgIH07XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudCkpIHtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUoW3ZhbHVlVG9BZGRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZShbLi4uY3VycmVudCwgdmFsdWVUb0FkZF0pO1xuICAgIH1cbiAgICB0aGlzLmlucHV0Q2hpbGRyZW4uZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfSlcbiAgICB0aGlzLmdldEN1cnJlbnRPdmVybGF5KHZpZXdJbmRleCk/LmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIHJlbW92ZSh2YWx1ZVRvUmVtb3ZlOiBhbnksIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBjb25zdCBpbmRleCA9IGN1cnJlbnQuaW5kZXhPZih2YWx1ZVRvUmVtb3ZlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBbLi4uY3VycmVudF1cbiAgICAgIG9sZFZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKG9sZFZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==