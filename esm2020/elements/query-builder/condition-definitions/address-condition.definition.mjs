import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { PlacesListComponent } from 'novo-elements/elements/places';
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
        if (!["Escape" /* Escape */, "Enter" /* Enter */].includes(event.key)) {
            this.openPlacesList(viewIndex);
        }
        this.term = event.target.value;
    }
    onKeydown(event, viewIndex) {
        if (!this.placesPicker.dropdownOpen) {
            this.openPlacesList(viewIndex);
            this.placesPicker.dropdownOpen = true;
        }
        if (["Escape" /* Escape */, "Tab" /* Tab */].includes(event.key)) {
            this.closePlacesList(viewIndex);
        }
        else {
            this.placesPicker.onKeyDown(event);
        }
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
NovoDefaultAddressConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultAddressConditionDef, selector: "novo-address-condition-def", viewQueries: [{ propertyName: "placesPicker", first: true, predicate: ["placesPicker"], descendants: true }, { propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }, { propertyName: "inputChildren", predicate: ["addressInput"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
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
              <novo-text ellipsis>{{ item.formatted_address }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [id]="viewIndex"
              [placeholder]="labels.location"
              (keyup)="onKeyup($event, viewIndex)"
              (keydown)="onKeydown($event, viewIndex)"
              [picker]="placesPicker"
              #addressInput />
          </novo-chip-list>
          <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
            <google-places-list [term]="term" (select)="selectPlace($event, formGroup, viewIndex)" formControlName="value" #placesPicker></google-places-list>
          </novo-picker-toggle>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, components: [{ type: i2.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i3.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i5.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i5.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i4.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { type: i6.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { type: i7.PlacesListComponent, selector: "google-places-list", inputs: ["userSettings"], outputs: ["termChange", "select"] }], directives: [{ type: i8.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: i8.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i9.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i9.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i8.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i5.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { type: i2.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { type: i2.NovoFieldSuffixDirective, selector: "[novoSuffix]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
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
              <novo-text ellipsis>{{ item.formatted_address }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [id]="viewIndex"
              [placeholder]="labels.location"
              (keyup)="onKeyup($event, viewIndex)"
              (keydown)="onKeydown($event, viewIndex)"
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
            }], placesPicker: [{
                type: ViewChild,
                args: ['placesPicker']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEksT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFNUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7OztBQUcxRDs7R0FFRztBQXFDSCxNQUFNLE9BQU8sOEJBQStCLFNBQVEseUJBQXlCO0lBUzNFLFlBQW1CLE9BQW1CLEVBQVMsTUFBd0I7UUFDckUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBREcsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBSnZFLG9CQUFlLEdBQUcsWUFBWSxDQUFDO1FBQy9CLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLFNBQUksR0FBVyxFQUFFLENBQUM7SUFJbEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUztRQUN0QixJQUFJLENBQUMsNENBQXVCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FB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LE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFBO1lBQzdCLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs0SEFqRlUsOEJBQThCO2dIQUE5Qiw4QkFBOEIscU1BQzNCLHVCQUF1QiwwSkFuQzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7NEZBSVUsOEJBQThCO2tCQXBDMUMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEO2dJQUV3QyxlQUFlO3NCQUFyRCxZQUFZO3VCQUFDLHVCQUF1QjtnQkFDUCxhQUFhO3NCQUExQyxZQUFZO3VCQUFDLGNBQWM7Z0JBQ0QsWUFBWTtzQkFBdEMsU0FBUzt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL2Fic3RyYWN0LWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmllbGQnO1xuaW1wb3J0IHsgUGxhY2VzTGlzdENvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcGxhY2VzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEtleSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG4vKipcbiAqIEhhbmRsZSBzZWxlY3Rpb24gb2YgZmllbGQgdmFsdWVzIHdoZW4gYSBsaXN0IG9mIG9wdGlvbnMgaXMgcHJvdmlkZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYWRkcmVzcy1jb25kaXRpb24tZGVmJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIG5vdm9Db25kaXRpb25GaWVsZERlZj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmPVwibGV0IGZvcm1Hcm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLm9wZXJhdG9yXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIiAob25TZWxlY3QpPVwib25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXApXCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFueVwiPnt7IGxhYmVscy5pbmNsdWRlQW55IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJleGNsdWRlQW55XCI+e3sgbGFiZWxzLmV4Y2x1ZGUgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbm92b0NvbmRpdGlvbklucHV0RGVmPVwibGV0IGZvcm1Hcm91cDsgdmlld0luZGV4IGFzIHZpZXdJbmRleDsgZmllbGRNZXRhIGFzIG1ldGFcIiBbbmdTd2l0Y2hdPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnaW5jbHVkZUFueScsICdleGNsdWRlQW55J11cIiAjbm92b0ZpZWxkPlxuICAgICAgICAgIDxub3ZvLWNoaXAtbGlzdCBbKG5nTW9kZWwpXT1cImNoaXBMaXN0TW9kZWxcIiBbbmdNb2RlbE9wdGlvbnNdPVwieyBzdGFuZGFsb25lOiB0cnVlIH1cIiAoY2xpY2spPVwib3BlblBsYWNlc0xpc3Qodmlld0luZGV4KVwiPlxuICAgICAgICAgICAgPG5vdm8tY2hpcCAqbmdGb3I9XCJsZXQgaXRlbSBvZiBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnZhbHVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlKGl0ZW0sIGZvcm1Hcm91cCwgdmlld0luZGV4KVwiPlxuICAgICAgICAgICAgICA8bm92by10ZXh0IGVsbGlwc2lzPnt7IGl0ZW0uZm9ybWF0dGVkX2FkZHJlc3MgfX08L25vdm8tdGV4dD5cbiAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT5jbG9zZTwvbm92by1pY29uPlxuICAgICAgICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgbm92b0NoaXBJbnB1dFxuICAgICAgICAgICAgICBbaWRdPVwidmlld0luZGV4XCJcbiAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5sb2NhdGlvblwiXG4gICAgICAgICAgICAgIChrZXl1cCk9XCJvbktleXVwKCRldmVudCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQsIHZpZXdJbmRleClcIlxuICAgICAgICAgICAgICBbcGlja2VyXT1cInBsYWNlc1BpY2tlclwiXG4gICAgICAgICAgICAgICNhZGRyZXNzSW5wdXQgLz5cbiAgICAgICAgICA8L25vdm8tY2hpcC1saXN0PlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBpY29uPVwibG9jYXRpb25cIiBub3ZvU3VmZml4PlxuICAgICAgICAgICAgPGdvb2dsZS1wbGFjZXMtbGlzdCBbdGVybV09XCJ0ZXJtXCIgKHNlbGVjdCk9XCJzZWxlY3RQbGFjZSgkZXZlbnQsIGZvcm1Hcm91cCwgdmlld0luZGV4KVwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIgI3BsYWNlc1BpY2tlcj48L2dvb2dsZS1wbGFjZXMtbGlzdD5cbiAgICAgICAgICA8L25vdm8tcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHRBZGRyZXNzQ29uZGl0aW9uRGVmIGV4dGVuZHMgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB7XG4gIEBWaWV3Q2hpbGRyZW4oTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQpIG92ZXJsYXlDaGlsZHJlbjogUXVlcnlMaXN0PE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50PjtcbiAgQFZpZXdDaGlsZHJlbignYWRkcmVzc0lucHV0JykgaW5wdXRDaGlsZHJlbjogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkKCdwbGFjZXNQaWNrZXInKSBwbGFjZXNQaWNrZXI6IFBsYWNlc0xpc3RDb21wb25lbnQ7XG5cbiAgZGVmYXVsdE9wZXJhdG9yID0gJ2luY2x1ZGVBbnknO1xuICBjaGlwTGlzdE1vZGVsOiBhbnkgPSAnJztcbiAgdGVybTogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihsYWJlbHMpO1xuICB9XG5cbiAgb25LZXl1cChldmVudCwgdmlld0luZGV4KSB7XG4gICAgaWYgKCFbS2V5LkVzY2FwZSwgS2V5LkVudGVyXS5pbmNsdWRlcyhldmVudC5rZXkpKSB7XG4gICAgICB0aGlzLm9wZW5QbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gICAgfVxuICAgIHRoaXMudGVybSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIG9uS2V5ZG93bihldmVudCwgdmlld0luZGV4KSB7XG4gICAgaWYgKCF0aGlzLnBsYWNlc1BpY2tlci5kcm9wZG93bk9wZW4pIHtcbiAgICAgIHRoaXMub3BlblBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgICAgIHRoaXMucGxhY2VzUGlja2VyLmRyb3Bkb3duT3BlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmIChbS2V5LkVzY2FwZSwgS2V5LlRhYl0uaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgICAgdGhpcy5jbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wbGFjZXNQaWNrZXIub25LZXlEb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZShmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IGFueVtdIHtcbiAgICByZXR1cm4gZm9ybUdyb3VwLnZhbHVlLnZhbHVlIHx8IFtdO1xuICB9XG5cbiAgZ2V0Q3VycmVudE92ZXJsYXkodmlld0luZGV4OiBzdHJpbmcpOiBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheUNoaWxkcmVuPy5maW5kKGl0ZW0gPT4gaXRlbS5vdmVybGF5SWQgPT09IHZpZXdJbmRleCk7XG4gIH1cblxuICBnZXRDdXJyZW50SW5wdXQodmlld0luZGV4OiBzdHJpbmcpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dENoaWxkcmVuPy5maW5kKGl0ZW0gPT4gKGl0ZW0gYXMgYW55KS5uYXRpdmVFbGVtZW50LmlkID09PSB2aWV3SW5kZXgpO1xuICB9XG5cbiAgb3BlblBsYWNlc0xpc3Qodmlld0luZGV4KSB7XG4gICAgdGhpcy5nZXRDdXJyZW50T3ZlcmxheSh2aWV3SW5kZXgpPy5vcGVuUGFuZWwoKTtcbiAgfVxuXG4gIGNsb3NlUGxhY2VzTGlzdCh2aWV3SW5kZXgpIHtcbiAgICB0aGlzLmdldEN1cnJlbnRPdmVybGF5KHZpZXdJbmRleCk/LmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIHNlbGVjdFBsYWNlKGV2ZW50OiBhbnksIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sLCB2aWV3SW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlVG9BZGQgPSB7XG4gICAgICBhZGRyZXNzX2NvbXBvbmVudHM6IGV2ZW50LmFkZHJlc3NfY29tcG9uZW50cyxcbiAgICAgIGZvcm1hdHRlZF9hZGRyZXNzOiBldmVudC5mb3JtYXR0ZWRfYWRkcmVzcyxcbiAgICAgIGdlb21ldHJ5OiBldmVudC5nZW9tZXRyeSxcbiAgICAgIHBsYWNlX2lkOiBldmVudC5wbGFjZV9pZCxcbiAgICB9O1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGN1cnJlbnQpKSB7XG4gICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKFt2YWx1ZVRvQWRkXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUoWy4uLmN1cnJlbnQsIHZhbHVlVG9BZGRdKTtcbiAgICB9XG4gICAgdGhpcy5pbnB1dENoaWxkcmVuLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH0pXG4gICAgdGhpcy5nZXRDdXJyZW50SW5wdXQodmlld0luZGV4KT8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gIH1cblxuICByZW1vdmUodmFsdWVUb1JlbW92ZTogYW55LCBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCwgdmlld0luZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5nZXRWYWx1ZShmb3JtR3JvdXApO1xuICAgIGNvbnN0IGluZGV4ID0gY3VycmVudC5pbmRleE9mKHZhbHVlVG9SZW1vdmUpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IFsuLi5jdXJyZW50XVxuICAgICAgb2xkVmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUob2xkVmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlUGxhY2VzTGlzdCh2aWV3SW5kZXgpO1xuICB9XG59XG4iXX0=