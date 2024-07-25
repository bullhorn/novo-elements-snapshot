import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { PlacesListComponent } from 'novo-elements/elements/places';
import { NovoLabelService } from 'novo-elements/services';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { Operator } from '../query-builder.types';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/places";
import * as i5 from "novo-elements/elements/common";
import * as i6 from "novo-elements/elements/select";
import * as i7 from "novo-elements/elements/field";
import * as i8 from "novo-elements/elements/icon";
import * as i9 from "novo-elements/elements/chips";
import * as i10 from "../query-builder.directives";
/**
 * Handle selection of field values when a list of options is provided.
 */
export class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
    constructor(element, labels) {
        super(labels);
        this.element = element;
        this.labels = labels;
        this.defaultOperator = Operator.includeAny;
        this.chipListModel = '';
        this.term = '';
    }
    onKeyup(event, viewIndex) {
        if (!["Escape" /* Key.Escape */, "Enter" /* Key.Enter */].includes(event.key)) {
            this.openPlacesList(viewIndex);
        }
        this.term = event.target.value;
    }
    onKeydown(event, viewIndex) {
        if (!this.placesPicker.dropdownOpen) {
            this.openPlacesList(viewIndex);
            this.placesPicker.dropdownOpen = true;
        }
        if (["Escape" /* Key.Escape */, "Tab" /* Key.Tab */].includes(event.key)) {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultAddressConditionDef, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDefaultAddressConditionDef, selector: "novo-address-condition-def", viewQueries: [{ propertyName: "placesPicker", first: true, predicate: ["placesPicker"], descendants: true }, { propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }, { propertyName: "inputChildren", predicate: ["addressInput"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.PlacesListComponent, selector: "google-places-list", inputs: ["userSettings"], outputs: ["termChange", "select"] }, { kind: "component", type: i5.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "directive", type: i5.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i6.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i7.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i7.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "component", type: i7.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i7.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i8.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i9.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i9.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "directive", type: i9.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { kind: "component", type: i9.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { kind: "directive", type: i10.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i10.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i10.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultAddressConditionDef, decorators: [{
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
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }], propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }], inputChildren: [{
                type: ViewChildren,
                args: ['addressInput']
            }], placesPicker: [{
                type: ViewChild,
                args: ['placesPicker']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEksT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7Ozs7QUFFbEQ7O0dBRUc7QUFxQ0gsTUFBTSxPQUFPLDhCQUErQixTQUFRLHlCQUF5QjtJQVMzRSxZQUFtQixPQUFtQixFQUFTLE1BQXdCO1FBQ3JFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQURHLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUp2RSxvQkFBZSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDdEMsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztJQUlsQixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTO1FBQ3RCLElBQUksQ0FBQyxvREFBdUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxD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QUFNLENBQUMsYUFBa0IsRUFBRSxTQUEwQixFQUFFLFNBQWlCO1FBQ3RFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNmLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQTtZQUM3QixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDOzhHQWpGVSw4QkFBOEI7a0dBQTlCLDhCQUE4QixxTUFDM0IsdUJBQXVCLDBKQW5DM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDs7MkZBSVUsOEJBQThCO2tCQXBDMUMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEOzhHQUV3QyxlQUFlO3NCQUFyRCxZQUFZO3VCQUFDLHVCQUF1QjtnQkFDUCxhQUFhO3NCQUExQyxZQUFZO3VCQUFDLGNBQWM7Z0JBQ0QsWUFBWTtzQkFBdEMsU0FBUzt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBQbGFjZXNMaXN0Q29tcG9uZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9wbGFjZXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudHlwZXMnO1xuXG4vKipcbiAqIEhhbmRsZSBzZWxlY3Rpb24gb2YgZmllbGQgdmFsdWVzIHdoZW4gYSBsaXN0IG9mIG9wdGlvbnMgaXMgcHJvdmlkZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYWRkcmVzcy1jb25kaXRpb24tZGVmJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIG5vdm9Db25kaXRpb25GaWVsZERlZj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmPVwibGV0IGZvcm1Hcm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLm9wZXJhdG9yXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIiAob25TZWxlY3QpPVwib25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXApXCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFueVwiPnt7IGxhYmVscy5pbmNsdWRlQW55IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJleGNsdWRlQW55XCI+e3sgbGFiZWxzLmV4Y2x1ZGUgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbm92b0NvbmRpdGlvbklucHV0RGVmPVwibGV0IGZvcm1Hcm91cDsgdmlld0luZGV4IGFzIHZpZXdJbmRleDsgZmllbGRNZXRhIGFzIG1ldGFcIiBbbmdTd2l0Y2hdPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmllbGQgKm5vdm9Td2l0Y2hDYXNlcz1cIlsnaW5jbHVkZUFueScsICdleGNsdWRlQW55J11cIiAjbm92b0ZpZWxkPlxuICAgICAgICAgIDxub3ZvLWNoaXAtbGlzdCBbKG5nTW9kZWwpXT1cImNoaXBMaXN0TW9kZWxcIiBbbmdNb2RlbE9wdGlvbnNdPVwieyBzdGFuZGFsb25lOiB0cnVlIH1cIiAoY2xpY2spPVwib3BlblBsYWNlc0xpc3Qodmlld0luZGV4KVwiPlxuICAgICAgICAgICAgPG5vdm8tY2hpcCAqbmdGb3I9XCJsZXQgaXRlbSBvZiBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnZhbHVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlKGl0ZW0sIGZvcm1Hcm91cCwgdmlld0luZGV4KVwiPlxuICAgICAgICAgICAgICA8bm92by10ZXh0IGVsbGlwc2lzPnt7IGl0ZW0uZm9ybWF0dGVkX2FkZHJlc3MgfX08L25vdm8tdGV4dD5cbiAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT5jbG9zZTwvbm92by1pY29uPlxuICAgICAgICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgbm92b0NoaXBJbnB1dFxuICAgICAgICAgICAgICBbaWRdPVwidmlld0luZGV4XCJcbiAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5sb2NhdGlvblwiXG4gICAgICAgICAgICAgIChrZXl1cCk9XCJvbktleXVwKCRldmVudCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQsIHZpZXdJbmRleClcIlxuICAgICAgICAgICAgICBbcGlja2VyXT1cInBsYWNlc1BpY2tlclwiXG4gICAgICAgICAgICAgICNhZGRyZXNzSW5wdXQgLz5cbiAgICAgICAgICA8L25vdm8tY2hpcC1saXN0PlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBpY29uPVwibG9jYXRpb25cIiBub3ZvU3VmZml4PlxuICAgICAgICAgICAgPGdvb2dsZS1wbGFjZXMtbGlzdCBbdGVybV09XCJ0ZXJtXCIgKHNlbGVjdCk9XCJzZWxlY3RQbGFjZSgkZXZlbnQsIGZvcm1Hcm91cCwgdmlld0luZGV4KVwiIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCIgI3BsYWNlc1BpY2tlcj48L2dvb2dsZS1wbGFjZXMtbGlzdD5cbiAgICAgICAgICA8L25vdm8tcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RlZmF1bHRBZGRyZXNzQ29uZGl0aW9uRGVmIGV4dGVuZHMgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB7XG4gIEBWaWV3Q2hpbGRyZW4oTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQpIG92ZXJsYXlDaGlsZHJlbjogUXVlcnlMaXN0PE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50PjtcbiAgQFZpZXdDaGlsZHJlbignYWRkcmVzc0lucHV0JykgaW5wdXRDaGlsZHJlbjogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkKCdwbGFjZXNQaWNrZXInKSBwbGFjZXNQaWNrZXI6IFBsYWNlc0xpc3RDb21wb25lbnQ7XG5cbiAgZGVmYXVsdE9wZXJhdG9yID0gT3BlcmF0b3IuaW5jbHVkZUFueTtcbiAgY2hpcExpc3RNb2RlbDogYW55ID0gJyc7XG4gIHRlcm06IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobGFiZWxzKTtcbiAgfVxuXG4gIG9uS2V5dXAoZXZlbnQsIHZpZXdJbmRleCkge1xuICAgIGlmICghW0tleS5Fc2NhcGUsIEtleS5FbnRlcl0uaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgICAgdGhpcy5vcGVuUGxhY2VzTGlzdCh2aWV3SW5kZXgpO1xuICAgIH1cbiAgICB0aGlzLnRlcm0gPSBldmVudC50YXJnZXQudmFsdWU7XG4gIH1cblxuICBvbktleWRvd24oZXZlbnQsIHZpZXdJbmRleCkge1xuICAgIGlmICghdGhpcy5wbGFjZXNQaWNrZXIuZHJvcGRvd25PcGVuKSB7XG4gICAgICB0aGlzLm9wZW5QbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gICAgICB0aGlzLnBsYWNlc1BpY2tlci5kcm9wZG93bk9wZW4gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoW0tleS5Fc2NhcGUsIEtleS5UYWJdLmluY2x1ZGVzKGV2ZW50LmtleSkpIHtcbiAgICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGxhY2VzUGlja2VyLm9uS2V5RG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWUoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBhbnlbXSB7XG4gICAgcmV0dXJuIGZvcm1Hcm91cC52YWx1ZS52YWx1ZSB8fCBbXTtcbiAgfVxuXG4gIGdldEN1cnJlbnRPdmVybGF5KHZpZXdJbmRleDogc3RyaW5nKTogTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlDaGlsZHJlbj8uZmluZChpdGVtID0+IGl0ZW0ub3ZlcmxheUlkID09PSB2aWV3SW5kZXgpO1xuICB9XG5cbiAgZ2V0Q3VycmVudElucHV0KHZpZXdJbmRleDogc3RyaW5nKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRDaGlsZHJlbj8uZmluZChpdGVtID0+IChpdGVtIGFzIGFueSkubmF0aXZlRWxlbWVudC5pZCA9PT0gdmlld0luZGV4KTtcbiAgfVxuXG4gIG9wZW5QbGFjZXNMaXN0KHZpZXdJbmRleCkge1xuICAgIHRoaXMuZ2V0Q3VycmVudE92ZXJsYXkodmlld0luZGV4KT8ub3BlblBhbmVsKCk7XG4gIH1cblxuICBjbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KSB7XG4gICAgdGhpcy5nZXRDdXJyZW50T3ZlcmxheSh2aWV3SW5kZXgpPy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBzZWxlY3RQbGFjZShldmVudDogYW55LCBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCwgdmlld0luZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZVRvQWRkID0ge1xuICAgICAgYWRkcmVzc19jb21wb25lbnRzOiBldmVudC5hZGRyZXNzX2NvbXBvbmVudHMsXG4gICAgICBmb3JtYXR0ZWRfYWRkcmVzczogZXZlbnQuZm9ybWF0dGVkX2FkZHJlc3MsXG4gICAgICBnZW9tZXRyeTogZXZlbnQuZ2VvbWV0cnksXG4gICAgICBwbGFjZV9pZDogZXZlbnQucGxhY2VfaWQsXG4gICAgfTtcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5nZXRWYWx1ZShmb3JtR3JvdXApO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJyZW50KSkge1xuICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZShbdmFsdWVUb0FkZF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKFsuLi5jdXJyZW50LCB2YWx1ZVRvQWRkXSk7XG4gICAgfVxuICAgIHRoaXMuaW5wdXRDaGlsZHJlbi5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgIGlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9KVxuICAgIHRoaXMuZ2V0Q3VycmVudElucHV0KHZpZXdJbmRleCk/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLmNsb3NlUGxhY2VzTGlzdCh2aWV3SW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlKHZhbHVlVG9SZW1vdmU6IGFueSwgZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHZpZXdJbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBjb25zdCBpbmRleCA9IGN1cnJlbnQuaW5kZXhPZih2YWx1ZVRvUmVtb3ZlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBbLi4uY3VycmVudF1cbiAgICAgIG9sZFZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKG9sZFZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgfVxufVxuIl19