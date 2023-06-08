import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/field";
import * as i3 from "novo-elements/elements/select";
import * as i4 from "novo-elements/elements/common";
import * as i5 from "novo-elements/elements/chips";
import * as i6 from "novo-elements/elements/icon";
import * as i7 from "novo-elements/elements/places";
import * as i8 from "../query-builder.directives";
import * as i9 from "@angular/forms";
import * as i10 from "@angular/common";
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
    onKeyup(event, viewIndex) {
        this.openPlacesList(viewIndex);
        this.term = event.target.value;
    }
    getValue(formGroup) {
        return formGroup.value.value || [];
    }
    getCurrentOverlay(viewIndex) {
        return this.overlayChildren?.find(item => item.overlayId === viewIndex);
    }
    getCurrentInput(viewIndex) {
        return this.inputChildren?.find(item => item.nativeElement.id === viewIndex);
    }
    openPlacesList(viewIndex) {
        this.getCurrentOverlay(viewIndex)?.openPanel();
    }
    closePlacesList(viewIndex) {
        this.getCurrentOverlay(viewIndex)?.closePanel();
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
        this.getCurrentInput(viewIndex)?.nativeElement.focus();
        this.closePlacesList(viewIndex);
    }
    remove(valueToRemove, formGroup, viewIndex) {
        const current = this.getValue(formGroup);
        const index = current.indexOf(valueToRemove);
        if (index >= 0) {
            const oldValue = [...current];
            oldValue.splice(index, 1);
            formGroup.get('value').setValue(oldValue);
        }
        this.closePlacesList(viewIndex);
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
          <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
            <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
              {{ item.formatted_address }}
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [id]="viewIndex"
              [placeholder]="labels.location"
              (keyup)="onKeyup($event, viewIndex)"
              [picker]="placesPicker"
              #addressInput />
          </novo-chip-list>
          <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
            <google-places-list [term]="term" (select)="selectPlace($event, formGroup, viewIndex)" formControlName="value" #placesPicker></google-places-list>
          </novo-picker-toggle>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, components: [{ type: i2.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i3.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i5.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i5.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i6.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { type: i7.PlacesListComponent, selector: "google-places-list", inputs: ["userSettings", "term"], outputs: ["termChange", "select"] }], directives: [{ type: i8.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: i8.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i9.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i9.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i8.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i5.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { type: i2.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { type: i2.NovoFieldSuffixDirective, selector: "[novoSuffix]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
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
          <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
            <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
              {{ item.formatted_address }}
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [id]="viewIndex"
              [placeholder]="labels.location"
              (keyup)="onKeyup($event, viewIndex)"
              [picker]="placesPicker"
              #addressInput />
          </novo-chip-list>
          <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzSCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7O0FBRTFEOztHQUVHO0FBb0NILE1BQU0sT0FBTyw4QkFBK0IsU0FBUSx5QkFBeUI7SUFPM0UsWUFBbUIsT0FBbUIsRUFBUyxNQUF3QjtRQUNyRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFERyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFKdkUsb0JBQWUsR0FBRyxZQUFZLENBQUM7UUFDL0Isa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztJQUlsQixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQTBCO1FBQ2pDLE9BQU8sU0FBUyxDQUFDLEtB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Ozs7O0dBNkJUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQ7Z0lBRXdDLGVBQWU7c0JBQXJELFlBQVk7dUJBQUMsdUJBQXVCO2dCQUNQLGFBQWE7c0JBQTFDLFlBQVk7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4vYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5cbi8qKlxuICogSGFuZGxlIHNlbGVjdGlvbiBvZiBmaWVsZCB2YWx1ZXMgd2hlbiBhIGxpc3Qgb2Ygb3B0aW9ucyBpcyBwcm92aWRlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZGRyZXNzLWNvbmRpdGlvbi1kZWYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbm92b0NvbmRpdGlvbkZpZWxkRGVmPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMub3BlcmF0b3JcIiBmb3JtQ29udHJvbE5hbWU9XCJvcGVyYXRvclwiIChvblNlbGVjdCk9XCJvbk9wZXJhdG9yU2VsZWN0KGZvcm1Hcm91cClcIj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpbmNsdWRlQW55XCI+e3sgbGFiZWxzLmluY2x1ZGVBbnkgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImV4Y2x1ZGVBbnlcIj57eyBsYWJlbHMuZXhjbHVkZSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bmctY29udGFpbmVyICpub3ZvQ29uZGl0aW9uSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwOyB2aWV3SW5kZXggYXMgdmlld0luZGV4OyBmaWVsZE1ldGEgYXMgbWV0YVwiIFtuZ1N3aXRjaF09XCJmb3JtR3JvdXAudmFsdWUub3BlcmF0b3JcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydpbmNsdWRlQW55JywgJ2V4Y2x1ZGVBbnknXVwiICNub3ZvRmllbGQ+XG4gICAgICAgICAgPG5vdm8tY2hpcC1saXN0IFsobmdNb2RlbCldPVwiY2hpcExpc3RNb2RlbFwiIFtuZ01vZGVsT3B0aW9uc109XCJ7IHN0YW5kYWxvbmU6IHRydWUgfVwiIChjbGljayk9XCJvcGVuUGxhY2VzTGlzdCh2aWV3SW5kZXgpXCI+XG4gICAgICAgICAgICA8bm92by1jaGlwICpuZ0Zvcj1cImxldCBpdGVtIG9mIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykudmFsdWVcIiAocmVtb3ZlZCk9XCJyZW1vdmUoaXRlbSwgZm9ybUdyb3VwLCB2aWV3SW5kZXgpXCI+XG4gICAgICAgICAgICAgIHt7IGl0ZW0uZm9ybWF0dGVkX2FkZHJlc3MgfX1cbiAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT5jbG9zZTwvbm92by1pY29uPlxuICAgICAgICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgbm92b0NoaXBJbnB1dFxuICAgICAgICAgICAgICBbaWRdPVwidmlld0luZGV4XCJcbiAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5sb2NhdGlvblwiXG4gICAgICAgICAgICAgIChrZXl1cCk9XCJvbktleXVwKCRldmVudCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgIFtwaWNrZXJdPVwicGxhY2VzUGlja2VyXCJcbiAgICAgICAgICAgICAgI2FkZHJlc3NJbnB1dCAvPlxuICAgICAgICAgIDwvbm92by1jaGlwLWxpc3Q+XG4gICAgICAgICAgPG5vdm8tcGlja2VyLXRvZ2dsZSBbb3ZlcmxheUlkXT1cInZpZXdJbmRleFwiIGljb249XCJsb2NhdGlvblwiIG5vdm9TdWZmaXg+XG4gICAgICAgICAgICA8Z29vZ2xlLXBsYWNlcy1saXN0IFt0ZXJtXT1cInRlcm1cIiAoc2VsZWN0KT1cInNlbGVjdFBsYWNlKCRldmVudCwgZm9ybUdyb3VwLCB2aWV3SW5kZXgpXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiAjcGxhY2VzUGlja2VyPjwvZ29vZ2xlLXBsYWNlcy1saXN0PlxuICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdEFkZHJlc3NDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIHtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCkgb3ZlcmxheUNoaWxkcmVuOiBRdWVyeUxpc3Q8Tm92b1BpY2tlclRvZ2dsZUVsZW1lbnQ+O1xuICBAVmlld0NoaWxkcmVuKCdhZGRyZXNzSW5wdXQnKSBpbnB1dENoaWxkcmVuOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIGRlZmF1bHRPcGVyYXRvciA9ICdpbmNsdWRlQW55JztcbiAgY2hpcExpc3RNb2RlbDogYW55ID0gJyc7XG4gIHRlcm06IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobGFiZWxzKTtcbiAgfVxuXG4gIG9uS2V5dXAoZXZlbnQsIHZpZXdJbmRleCkge1xuICAgIHRoaXMub3BlblBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgICB0aGlzLnRlcm0gPSBldmVudC50YXJnZXQudmFsdWU7XG4gIH1cblxuICBnZXRWYWx1ZShmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IGFueVtdIHtcbiAgICByZXR1cm4gZm9ybUdyb3VwLnZhbHVlLnZhbHVlIHx8IFtdO1xuICB9XG5cbiAgZ2V0Q3VycmVudE92ZXJsYXkodmlld0luZGV4OiBzdHJpbmcpOiBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheUNoaWxkcmVuPy5maW5kKGl0ZW0gPT4gaXRlbS5vdmVybGF5SWQgPT09IHZpZXdJbmRleCk7XG4gIH1cblxuICBnZXRDdXJyZW50SW5wdXQodmlld0luZGV4OiBzdHJpbmcpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dENoaWxkcmVuPy5maW5kKGl0ZW0gPT4gKGl0ZW0gYXMgYW55KS5uYXRpdmVFbGVtZW50LmlkID09PSB2aWV3SW5kZXgpO1xuICB9XG5cbiAgb3BlblBsYWNlc0xpc3Qodmlld0luZGV4KSB7XG4gICAgdGhpcy5nZXRDdXJyZW50T3ZlcmxheSh2aWV3SW5kZXgpPy5vcGVuUGFuZWwoKTtcbiAgfVxuXG4gIGNsb3NlUGxhY2VzTGlzdCh2aWV3SW5kZXgpIHtcbiAgICB0aGlzLmdldEN1cnJlbnRPdmVybGF5KHZpZXdJbmRleCk/LmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIHNlbGVjdFBsYWNlKGV2ZW50OiBhbnksIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sLCB2aWV3SW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlVG9BZGQgPSB7XG4gICAgICBhZGRyZXNzX2NvbXBvbmVudHM6IGV2ZW50LmFkZHJlc3NfY29tcG9uZW50cyxcbiAgICAgIGZvcm1hdHRlZF9hZGRyZXNzOiBldmVudC5mb3JtYXR0ZWRfYWRkcmVzcyxcbiAgICAgIGdlb21ldHJ5OiBldmVudC5nZW9tZXRyeSxcbiAgICAgIHBsYWNlX2lkOiBldmVudC5wbGFjZV9pZCxcbiAgICB9O1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGN1cnJlbnQpKSB7XG4gICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKFt2YWx1ZVRvQWRkXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUoWy4uLmN1cnJlbnQsIHZhbHVlVG9BZGRdKTtcbiAgICB9XG4gICAgdGhpcy5pbnB1dENoaWxkcmVuLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH0pXG4gICAgdGhpcy5nZXRDdXJyZW50SW5wdXQodmlld0luZGV4KT8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gIH1cblxuICByZW1vdmUodmFsdWVUb1JlbW92ZTogYW55LCBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCwgdmlld0luZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5nZXRWYWx1ZShmb3JtR3JvdXApO1xuICAgIGNvbnN0IGluZGV4ID0gY3VycmVudC5pbmRleE9mKHZhbHVlVG9SZW1vdmUpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IFsuLi5jdXJyZW50XVxuICAgICAgb2xkVmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUob2xkVmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlUGxhY2VzTGlzdCh2aWV3SW5kZXgpO1xuICB9XG59XG4iXX0=