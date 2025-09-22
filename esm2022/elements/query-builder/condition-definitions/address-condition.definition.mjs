import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, QueryList, ViewChild, ViewChildren, ViewEncapsulation, } from '@angular/core';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { PlacesListComponent } from 'novo-elements/elements/places';
import { NovoLabelService } from 'novo-elements/services';
import { Subscription } from 'rxjs';
import { Operator, RadiusUnits, } from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoSelectElement } from 'novo-elements/elements/select';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/places";
import * as i5 from "novo-elements/elements/common";
import * as i6 from "novo-elements/elements/select";
import * as i7 from "novo-elements/elements/field";
import * as i8 from "novo-elements/elements/flex";
import * as i9 from "novo-elements/elements/icon";
import * as i10 from "novo-elements/elements/chips";
import * as i11 from "novo-elements/elements/tooltip";
import * as i12 from "../query-builder.directives";
/**
 * Handle selection of field values when a list of options is provided.
 */
export class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        // Overridable defaults
        this.defaults = {
            radiusEnabled: false,
            radiusUnits: 'miles',
        };
        this.config = input();
        this.radiusUnits = computed(() => this.config()?.radiusUnits || this.defaults.radiusUnits);
        this.radiusEnabled = computed(() => this.config()?.radiusEnabled || this.defaults.radiusEnabled);
        this.unitsLabel = computed(() => this.radiusUnits() === RadiusUnits.miles ? this.labels.miles : this.labels.km);
        this.defaultOperator = Operator.includeAny;
        this.chipListModel = '';
        this.term = '';
        this._addressChangesSubscription = Subscription.EMPTY;
        this.element = inject(ElementRef);
        this.defineOperatorEditGroup(Operator.includeAny, Operator.excludeAny, Operator.insideRadius, Operator.outsideRadius);
    }
    ngOnDestroy() {
        this._addressChangesSubscription.unsubscribe();
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
            name: event.name,
            postal_codes: event.postal_codes,
            place_id: event.place_id,
            types: event.types,
        };
        const current = this.getValue(formGroup);
        const updated = Array.isArray(current) ? [...current, valueToAdd] : [valueToAdd];
        formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, updated));
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
    // Override abstract behavior - allow moving location from includeAny to radius, but when moving the opposite direction,
    // trim out radius information from the value
    onOperatorSelect(formGroup) {
        const previousOperator = this._previousOperatorValue;
        super.onOperatorSelect(formGroup);
        if ([previousOperator, formGroup.get('operator').getRawValue()].indexOf(Operator.insideRadius) !== -1 &&
            formGroup.get('value').getRawValue() != null) {
            formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, this.getValue(formGroup)));
        }
    }
    onRadiusSelect(formGroup, event) {
        const maxLengthRadius = event.target.value.slice(0, 4);
        event.target.value = maxLengthRadius;
        formGroup.get('supportingValue').setValue(maxLengthRadius);
        // We must dirty the form explicitly to show up as a user modification when it was done programmatically
        formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, this.getValue(formGroup)));
        formGroup.markAsDirty();
    }
    updateRadiusInValues(formGroup, values) {
        return values.map(val => ({
            ...val,
            radius: this.isRadiusOperatorSelected(formGroup) ? this.getRadiusData(formGroup) : undefined,
        }));
    }
    getRadiusData(formGroup) {
        return {
            value: formGroup.value.supportingValue,
            units: this.radiusUnits(),
            operator: formGroup.value.operator,
        };
    }
    isRadiusOperatorSelected(formGroup) {
        return ['insideRadius', 'outsideRadius'].includes(formGroup.get('operator')?.value) && formGroup.value?.supportingValue !== null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDefaultAddressConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "17.3.12", type: NovoDefaultAddressConditionDef, selector: "novo-address-condition-def", inputs: { config: { classPropertyName: "config", publicName: "config", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "placesPicker", first: true, predicate: ["placesPicker"], descendants: true }, { propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }, { propertyName: "inputChildren", predicate: ["addressInput"], descendants: true }, { propertyName: "addressSideTest", predicate: NovoSelectElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="insideRadius" *ngIf="radiusEnabled()">{{ labels.insideRadius }}</novo-option>
          <novo-option value="outsideRadius" *ngIf="radiusEnabled()">{{ labels.outsideRadius }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [formGroup]="formGroup">
        <novo-flex justify="space-between" align="end">
          <novo-field #input *ngIf="['radius', 'insideRadius', 'outsideRadius'].includes(formGroup.value.operator)" class="address-radius">
            <input
              novoInput
              paddingLeft="3px"
              type="number"
              min="1"
              max="9999"
              step="1"
              formControlName="supportingValue"
              #distanceInput
              (input)="onRadiusSelect(formGroup, $event)"
            />
            <span marginLeft="2px" marginRight="4px" paddingTop="3px">{{ unitsLabel() }}</span>
          </novo-field>
          <novo-field #novoField class="address-location">
            <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
              <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
                <novo-text ellipsis [tooltip]="item.formatted_address" tooltipOnOverflow>{{ item.formatted_address }}</novo-text>
                <novo-icon novoChipRemove>close</novo-icon>
              </novo-chip>
              <input
                novoChipInput
                [id]="viewIndex"
                [placeholder]="labels.location"
                (keyup)="onKeyup($event, viewIndex)"
                (keydown)="onKeydown($event, viewIndex)"
                [picker]="placesPicker"
                #addressInput/>
            </novo-chip-list>
            <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
              <google-places-list
                [term]="term"
                (select)="selectPlace($event, formGroup, viewIndex)"
                formControlName="value"
                #placesPicker/>
            </novo-picker-toggle>
          </novo-field>
        </novo-flex>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { kind: "directive", type: i3.MaxValidator, selector: "input[type=number][max][formControlName],input[type=number][max][formControl],input[type=number][max][ngModel]", inputs: ["max"] }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.PlacesListComponent, selector: "google-places-list", inputs: ["userSettings"], outputs: ["termChange", "select"] }, { kind: "component", type: i5.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "directive", type: i5.MarginDirective, selector: "[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]", inputs: ["margin", "m", "marginLeft", "ml", "marginRight", "mr", "marginTop", "mt", "marginBottom", "mb", "marginX", "mx", "marginY", "my"] }, { kind: "directive", type: i5.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { kind: "component", type: i6.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i7.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i7.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "directive", type: i7.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "component", type: i7.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i7.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i8.NovoFlexElement, selector: "novo-flex,novo-row", inputs: ["direction", "align", "justify", "wrap", "gap"] }, { kind: "component", type: i9.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i10.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i10.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "directive", type: i10.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { kind: "component", type: i10.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { kind: "directive", type: i11.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "directive", type: i12.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i12.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i12.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoDefaultAddressConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-address-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="insideRadius" *ngIf="radiusEnabled()">{{ labels.insideRadius }}</novo-option>
          <novo-option value="outsideRadius" *ngIf="radiusEnabled()">{{ labels.outsideRadius }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [formGroup]="formGroup">
        <novo-flex justify="space-between" align="end">
          <novo-field #input *ngIf="['radius', 'insideRadius', 'outsideRadius'].includes(formGroup.value.operator)" class="address-radius">
            <input
              novoInput
              paddingLeft="3px"
              type="number"
              min="1"
              max="9999"
              step="1"
              formControlName="supportingValue"
              #distanceInput
              (input)="onRadiusSelect(formGroup, $event)"
            />
            <span marginLeft="2px" marginRight="4px" paddingTop="3px">{{ unitsLabel() }}</span>
          </novo-field>
          <novo-field #novoField class="address-location">
            <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
              <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
                <novo-text ellipsis [tooltip]="item.formatted_address" tooltipOnOverflow>{{ item.formatted_address }}</novo-text>
                <novo-icon novoChipRemove>close</novo-icon>
              </novo-chip>
              <input
                novoChipInput
                [id]="viewIndex"
                [placeholder]="labels.location"
                (keyup)="onKeyup($event, viewIndex)"
                (keydown)="onKeydown($event, viewIndex)"
                [picker]="placesPicker"
                #addressInput/>
            </novo-chip-list>
            <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
              <google-places-list
                [term]="term"
                (select)="selectPlace($event, formGroup, viewIndex)"
                formControlName="value"
                #placesPicker/>
            </novo-picker-toggle>
          </novo-field>
        </novo-flex>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }], inputChildren: [{
                type: ViewChildren,
                args: ['addressInput']
            }], placesPicker: [{
                type: ViewChild,
                args: ['placesPicker']
            }], addressSideTest: [{
                type: ViewChildren,
                args: [NovoSelectElement]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUdMLFNBQVMsRUFFVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFLTCxRQUFRLEVBQ1IsV0FBVyxHQUNaLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBRWxFOztHQUVHO0FBMkRILE1BQU0sT0FBTyw4QkFBK0IsU0FBUSx5QkFBeUI7SUE4QjNFLFlBQVksWUFBOEI7UUFDeEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBekJ0Qix1QkFBdUI7UUFDdkIsYUFBUSxHQUEwQjtZQUNoQyxhQUFhLEVBQUUsS0FBSztZQUNwQixXQUFXLEVBQUUsT0FBTztTQUNyQixDQUFDO1FBQ0YsV0FBTSxHQUF1QyxLQUFLLEVBQUUsQ0FBQztRQUNyRCxnQkFBVyxHQUFtQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQzFELElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQ3hELENBQUM7UUFDRixrQkFBYSxHQUFvQixRQUFRLENBQUMsR0FBRyxFQUFFLENBQzdDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxhQUFhLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQzVELENBQUM7UUFDRixlQUFVLEdBQW1CLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FDekMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDOUUsQ0FBQztRQUVGLG9CQUFlLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBRVYsZ0NBQTJCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFaEUsWUFBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUlsQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVM7UUFDdEIsSUFBSSxDQUFDLG9EQUF1QixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDeEMsQ0FBQztRQUNELElBQUksZ0RBQXFCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUEwQjtRQUNqQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsU0FBaUI7UUFDakMsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELGVBQWUsQ0FBQyxTQUFpQjtRQUMvQixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUUsSUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVELGNBQWMsQ0FBQyxTQUFTO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsZUFBZSxDQUFDLFNBQVM7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRCxXQUFXLENBQUMsS0FBVSxFQUFFLFNBQTBCLEVBQUUsU0FBaUI7UUFDbkUsTUFBTSxVQUFVLEdBQWdCO1lBQzlCLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxrQkFBa0I7WUFDNUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLGlCQUFpQjtZQUMxQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtZQUNoQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1NBQ25CLENBQUM7UUFDRixNQUFNLE9BQU8sR0FBZ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxNQUFNLE9BQU8sR0FBa0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFL0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQTBCLEVBQUUsU0FBMEIsRUFBRSxTQUFpQjtRQUM5RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUE7WUFDN0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELHdIQUF3SDtJQUN4SCw2Q0FBNkM7SUFDN0MsZ0JBQWdCLENBQUMsU0FBMkI7UUFDMUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDckQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNqRCxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLENBQUM7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQTBCLEVBQUUsS0FBSztRQUM5QyxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztRQUNyQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNELHdHQUF3RztRQUN4RyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sb0JBQW9CLENBQUMsU0FBMEIsRUFBRSxNQUFxQjtRQUM1RSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLEdBQUcsR0FBRztZQUNOLE1BQU0sRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDN0YsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRU8sYUFBYSxDQUFDLFNBQTBCO1FBQzlDLE9BQU87WUFDTCxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlO1lBQ3RDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3pCLFFBQVEsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVE7U0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxTQUEwQjtRQUN6RCxPQUFPLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsZUFBZSxLQUFLLElBQUksQ0FBQztJQUNuSSxDQUFDOytHQW5KVSw4QkFBOEI7bUdBQTlCLDhCQUE4Qiw0VUFDM0IsdUJBQXVCLHdKQUd2QixpQkFBaUIsdUVBNURyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9EVDs7NEZBSVUsOEJBQThCO2tCQTFEMUMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvRFQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRDtxRkFFd0MsZUFBZTtzQkFBckQsWUFBWTt1QkFBQyx1QkFBdUI7Z0JBQ1AsYUFBYTtzQkFBMUMsWUFBWTt1QkFBQyxjQUFjO2dCQUNELFlBQVk7c0JBQXRDLFNBQVM7dUJBQUMsY0FBYztnQkFDUSxlQUFlO3NCQUEvQyxZQUFZO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIGNvbXB1dGVkLFxuICBFbGVtZW50UmVmLFxuICBpbmplY3QsXG4gIGlucHV0LFxuICBJbnB1dFNpZ25hbCxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFNpZ25hbCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBQbGFjZXNMaXN0Q29tcG9uZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9wbGFjZXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycywgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEFkZHJlc3NDcml0ZXJpYUNvbmZpZyxcbiAgQWRkcmVzc0RhdGEsXG4gIEFkZHJlc3NSYWRpdXMsXG4gIEFkZHJlc3NSYWRpdXNVbml0c05hbWUsXG4gIE9wZXJhdG9yLFxuICBSYWRpdXNVbml0cyxcbn0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0RWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc2VsZWN0JztcblxuLyoqXG4gKiBIYW5kbGUgc2VsZWN0aW9uIG9mIGZpZWxkIHZhbHVlcyB3aGVuIGEgbGlzdCBvZiBvcHRpb25zIGlzIHByb3ZpZGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFkZHJlc3MtY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY+XG4gICAgICA8bm92by1maWVsZCAqbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5vcGVyYXRvclwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCIgKG9uU2VsZWN0KT1cIm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKVwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluY2x1ZGVBbnlcIj57eyBsYWJlbHMuaW5jbHVkZUFueSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiZXhjbHVkZUFueVwiPnt7IGxhYmVscy5leGNsdWRlIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpbnNpZGVSYWRpdXNcIiAqbmdJZj1cInJhZGl1c0VuYWJsZWQoKVwiPnt7IGxhYmVscy5pbnNpZGVSYWRpdXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIm91dHNpZGVSYWRpdXNcIiAqbmdJZj1cInJhZGl1c0VuYWJsZWQoKVwiPnt7IGxhYmVscy5vdXRzaWRlUmFkaXVzIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5vdm9Db25kaXRpb25JbnB1dERlZj1cImxldCBmb3JtR3JvdXA7IHZpZXdJbmRleCBhcyB2aWV3SW5kZXg7IGZpZWxkTWV0YSBhcyBtZXRhXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmxleCBqdXN0aWZ5PVwic3BhY2UtYmV0d2VlblwiIGFsaWduPVwiZW5kXCI+XG4gICAgICAgICAgPG5vdm8tZmllbGQgI2lucHV0ICpuZ0lmPVwiWydyYWRpdXMnLCAnaW5zaWRlUmFkaXVzJywgJ291dHNpZGVSYWRpdXMnXS5pbmNsdWRlcyhmb3JtR3JvdXAudmFsdWUub3BlcmF0b3IpXCIgY2xhc3M9XCJhZGRyZXNzLXJhZGl1c1wiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIG5vdm9JbnB1dFxuICAgICAgICAgICAgICBwYWRkaW5nTGVmdD1cIjNweFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgICAgICAgbWF4PVwiOTk5OVwiXG4gICAgICAgICAgICAgIHN0ZXA9XCIxXCJcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwic3VwcG9ydGluZ1ZhbHVlXCJcbiAgICAgICAgICAgICAgI2Rpc3RhbmNlSW5wdXRcbiAgICAgICAgICAgICAgKGlucHV0KT1cIm9uUmFkaXVzU2VsZWN0KGZvcm1Hcm91cCwgJGV2ZW50KVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHNwYW4gbWFyZ2luTGVmdD1cIjJweFwiIG1hcmdpblJpZ2h0PVwiNHB4XCIgcGFkZGluZ1RvcD1cIjNweFwiPnt7IHVuaXRzTGFiZWwoKSB9fTwvc3Bhbj5cbiAgICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgICAgPG5vdm8tZmllbGQgI25vdm9GaWVsZCBjbGFzcz1cImFkZHJlc3MtbG9jYXRpb25cIj5cbiAgICAgICAgICAgIDxub3ZvLWNoaXAtbGlzdCBbKG5nTW9kZWwpXT1cImNoaXBMaXN0TW9kZWxcIiBbbmdNb2RlbE9wdGlvbnNdPVwieyBzdGFuZGFsb25lOiB0cnVlIH1cIiAoY2xpY2spPVwib3BlblBsYWNlc0xpc3Qodmlld0luZGV4KVwiPlxuICAgICAgICAgICAgICA8bm92by1jaGlwICpuZ0Zvcj1cImxldCBpdGVtIG9mIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykudmFsdWVcIiAocmVtb3ZlZCk9XCJyZW1vdmUoaXRlbSwgZm9ybUdyb3VwLCB2aWV3SW5kZXgpXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tdGV4dCBlbGxpcHNpcyBbdG9vbHRpcF09XCJpdGVtLmZvcm1hdHRlZF9hZGRyZXNzXCIgdG9vbHRpcE9uT3ZlcmZsb3c+e3sgaXRlbS5mb3JtYXR0ZWRfYWRkcmVzcyB9fTwvbm92by10ZXh0PlxuICAgICAgICAgICAgICAgIDxub3ZvLWljb24gbm92b0NoaXBSZW1vdmU+Y2xvc2U8L25vdm8taWNvbj5cbiAgICAgICAgICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIG5vdm9DaGlwSW5wdXRcbiAgICAgICAgICAgICAgICBbaWRdPVwidmlld0luZGV4XCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLmxvY2F0aW9uXCJcbiAgICAgICAgICAgICAgICAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQsIHZpZXdJbmRleClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQsIHZpZXdJbmRleClcIlxuICAgICAgICAgICAgICAgIFtwaWNrZXJdPVwicGxhY2VzUGlja2VyXCJcbiAgICAgICAgICAgICAgICAjYWRkcmVzc0lucHV0Lz5cbiAgICAgICAgICAgIDwvbm92by1jaGlwLWxpc3Q+XG4gICAgICAgICAgICA8bm92by1waWNrZXItdG9nZ2xlIFtvdmVybGF5SWRdPVwidmlld0luZGV4XCIgaWNvbj1cImxvY2F0aW9uXCIgbm92b1N1ZmZpeD5cbiAgICAgICAgICAgICAgPGdvb2dsZS1wbGFjZXMtbGlzdFxuICAgICAgICAgICAgICAgIFt0ZXJtXT1cInRlcm1cIlxuICAgICAgICAgICAgICAgIChzZWxlY3QpPVwic2VsZWN0UGxhY2UoJGV2ZW50LCBmb3JtR3JvdXAsIHZpZXdJbmRleClcIlxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAjcGxhY2VzUGlja2VyLz5cbiAgICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPC9ub3ZvLWZsZXg+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdEFkZHJlc3NDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCkgb3ZlcmxheUNoaWxkcmVuOiBRdWVyeUxpc3Q8Tm92b1BpY2tlclRvZ2dsZUVsZW1lbnQ+O1xuICBAVmlld0NoaWxkcmVuKCdhZGRyZXNzSW5wdXQnKSBpbnB1dENoaWxkcmVuOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIEBWaWV3Q2hpbGQoJ3BsYWNlc1BpY2tlcicpIHBsYWNlc1BpY2tlcjogUGxhY2VzTGlzdENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvU2VsZWN0RWxlbWVudCkgYWRkcmVzc1NpZGVUZXN0OiBhbnk7XG5cbiAgLy8gT3ZlcnJpZGFibGUgZGVmYXVsdHNcbiAgZGVmYXVsdHM6IEFkZHJlc3NDcml0ZXJpYUNvbmZpZyA9IHtcbiAgICByYWRpdXNFbmFibGVkOiBmYWxzZSxcbiAgICByYWRpdXNVbml0czogJ21pbGVzJyxcbiAgfTtcbiAgY29uZmlnOiBJbnB1dFNpZ25hbDxBZGRyZXNzQ3JpdGVyaWFDb25maWc+ID0gaW5wdXQoKTtcbiAgcmFkaXVzVW5pdHM6IFNpZ25hbDxBZGRyZXNzUmFkaXVzVW5pdHNOYW1lPiA9IGNvbXB1dGVkKCgpID0+XG4gICAgdGhpcy5jb25maWcoKT8ucmFkaXVzVW5pdHMgfHwgdGhpcy5kZWZhdWx0cy5yYWRpdXNVbml0c1xuICApO1xuICByYWRpdXNFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj4gPSBjb21wdXRlZCgoKSA9PlxuICAgIHRoaXMuY29uZmlnKCk/LnJhZGl1c0VuYWJsZWQgfHwgdGhpcy5kZWZhdWx0cy5yYWRpdXNFbmFibGVkXG4gICk7XG4gIHVuaXRzTGFiZWw6IFNpZ25hbDxzdHJpbmc+ID0gY29tcHV0ZWQoKCkgPT5cbiAgICB0aGlzLnJhZGl1c1VuaXRzKCkgPT09IFJhZGl1c1VuaXRzLm1pbGVzID8gdGhpcy5sYWJlbHMubWlsZXMgOiB0aGlzLmxhYmVscy5rbVxuICApO1xuXG4gIGRlZmF1bHRPcGVyYXRvciA9IE9wZXJhdG9yLmluY2x1ZGVBbnk7XG4gIGNoaXBMaXN0TW9kZWw6IGFueSA9ICcnO1xuICB0ZXJtOiBzdHJpbmcgPSAnJztcblxuICBwcml2YXRlIF9hZGRyZXNzQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHB1YmxpYyBlbGVtZW50ID0gaW5qZWN0KEVsZW1lbnRSZWYpO1xuXG4gIGNvbnN0cnVjdG9yKGxhYmVsU2VydmljZTogTm92b0xhYmVsU2VydmljZSkge1xuICAgIHN1cGVyKGxhYmVsU2VydmljZSk7XG4gICAgdGhpcy5kZWZpbmVPcGVyYXRvckVkaXRHcm91cChPcGVyYXRvci5pbmNsdWRlQW55LCBPcGVyYXRvci5leGNsdWRlQW55LCBPcGVyYXRvci5pbnNpZGVSYWRpdXMsIE9wZXJhdG9yLm91dHNpZGVSYWRpdXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fYWRkcmVzc0NoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG9uS2V5dXAoZXZlbnQsIHZpZXdJbmRleCkge1xuICAgIGlmICghW0tleS5Fc2NhcGUsIEtleS5FbnRlcl0uaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgICAgdGhpcy5vcGVuUGxhY2VzTGlzdCh2aWV3SW5kZXgpO1xuICAgIH1cbiAgICB0aGlzLnRlcm0gPSBldmVudC50YXJnZXQudmFsdWU7XG4gIH1cblxuICBvbktleWRvd24oZXZlbnQsIHZpZXdJbmRleCkge1xuICAgIGlmICghdGhpcy5wbGFjZXNQaWNrZXIuZHJvcGRvd25PcGVuKSB7XG4gICAgICB0aGlzLm9wZW5QbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gICAgICB0aGlzLnBsYWNlc1BpY2tlci5kcm9wZG93bk9wZW4gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoW0tleS5Fc2NhcGUsIEtleS5UYWJdLmluY2x1ZGVzKGV2ZW50LmtleSkpIHtcbiAgICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGxhY2VzUGlja2VyLm9uS2V5RG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWUoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBBZGRyZXNzRGF0YVtdIHtcbiAgICByZXR1cm4gZm9ybUdyb3VwLnZhbHVlLnZhbHVlIHx8IFtdO1xuICB9XG5cbiAgZ2V0Q3VycmVudE92ZXJsYXkodmlld0luZGV4OiBzdHJpbmcpOiBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheUNoaWxkcmVuPy5maW5kKGl0ZW0gPT4gaXRlbS5vdmVybGF5SWQgPT09IHZpZXdJbmRleCk7XG4gIH1cblxuICBnZXRDdXJyZW50SW5wdXQodmlld0luZGV4OiBzdHJpbmcpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dENoaWxkcmVuPy5maW5kKGl0ZW0gPT4gKGl0ZW0gYXMgYW55KS5uYXRpdmVFbGVtZW50LmlkID09PSB2aWV3SW5kZXgpO1xuICB9XG5cbiAgb3BlblBsYWNlc0xpc3Qodmlld0luZGV4KSB7XG4gICAgdGhpcy5nZXRDdXJyZW50T3ZlcmxheSh2aWV3SW5kZXgpPy5vcGVuUGFuZWwoKTtcbiAgfVxuXG4gIGNsb3NlUGxhY2VzTGlzdCh2aWV3SW5kZXgpIHtcbiAgICB0aGlzLmdldEN1cnJlbnRPdmVybGF5KHZpZXdJbmRleCk/LmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIHNlbGVjdFBsYWNlKGV2ZW50OiBhbnksIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sLCB2aWV3SW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlVG9BZGQ6IEFkZHJlc3NEYXRhID0ge1xuICAgICAgYWRkcmVzc19jb21wb25lbnRzOiBldmVudC5hZGRyZXNzX2NvbXBvbmVudHMsXG4gICAgICBmb3JtYXR0ZWRfYWRkcmVzczogZXZlbnQuZm9ybWF0dGVkX2FkZHJlc3MsXG4gICAgICBnZW9tZXRyeTogZXZlbnQuZ2VvbWV0cnksXG4gICAgICBuYW1lOiBldmVudC5uYW1lLFxuICAgICAgcG9zdGFsX2NvZGVzOiBldmVudC5wb3N0YWxfY29kZXMsXG4gICAgICBwbGFjZV9pZDogZXZlbnQucGxhY2VfaWQsXG4gICAgICB0eXBlczogZXZlbnQudHlwZXMsXG4gICAgfTtcbiAgICBjb25zdCBjdXJyZW50OiBBZGRyZXNzRGF0YSB8IEFkZHJlc3NEYXRhW10gPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgY29uc3QgdXBkYXRlZDogQWRkcmVzc0RhdGFbXSA9IEFycmF5LmlzQXJyYXkoY3VycmVudCkgPyBbLi4uY3VycmVudCwgdmFsdWVUb0FkZF0gOiBbdmFsdWVUb0FkZF07XG4gICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZSh0aGlzLnVwZGF0ZVJhZGl1c0luVmFsdWVzKGZvcm1Hcm91cCwgdXBkYXRlZCkpO1xuXG4gICAgdGhpcy5pbnB1dENoaWxkcmVuLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH0pXG4gICAgdGhpcy5nZXRDdXJyZW50SW5wdXQodmlld0luZGV4KT8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gIH1cblxuICByZW1vdmUodmFsdWVUb1JlbW92ZTogQWRkcmVzc0RhdGEsIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sLCB2aWV3SW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgY29uc3QgaW5kZXggPSBjdXJyZW50LmluZGV4T2YodmFsdWVUb1JlbW92ZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gWy4uLmN1cnJlbnRdXG4gICAgICBvbGRWYWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZShvbGRWYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gIH1cblxuICAvLyBPdmVycmlkZSBhYnN0cmFjdCBiZWhhdmlvciAtIGFsbG93IG1vdmluZyBsb2NhdGlvbiBmcm9tIGluY2x1ZGVBbnkgdG8gcmFkaXVzLCBidXQgd2hlbiBtb3ZpbmcgdGhlIG9wcG9zaXRlIGRpcmVjdGlvbixcbiAgLy8gdHJpbSBvdXQgcmFkaXVzIGluZm9ybWF0aW9uIGZyb20gdGhlIHZhbHVlXG4gIG9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgcHJldmlvdXNPcGVyYXRvciA9IHRoaXMuX3ByZXZpb3VzT3BlcmF0b3JWYWx1ZTtcbiAgICBzdXBlci5vbk9wZXJhdG9yU2VsZWN0KGZvcm1Hcm91cCk7XG4gICAgaWYgKFtwcmV2aW91c09wZXJhdG9yLCBmb3JtR3JvdXAuZ2V0KCdvcGVyYXRvcicpLmdldFJhd1ZhbHVlKCldLmluZGV4T2YoT3BlcmF0b3IuaW5zaWRlUmFkaXVzKSAhPT0gLTEgJiZcbiAgICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5nZXRSYXdWYWx1ZSgpICE9IG51bGwpIHtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUodGhpcy51cGRhdGVSYWRpdXNJblZhbHVlcyhmb3JtR3JvdXAsIHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKSkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUmFkaXVzU2VsZWN0KGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sLCBldmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1heExlbmd0aFJhZGl1cyA9IGV2ZW50LnRhcmdldC52YWx1ZS5zbGljZSgwLCA0KTtcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBtYXhMZW5ndGhSYWRpdXM7XG4gICAgZm9ybUdyb3VwLmdldCgnc3VwcG9ydGluZ1ZhbHVlJykuc2V0VmFsdWUobWF4TGVuZ3RoUmFkaXVzKTtcbiAgICAvLyBXZSBtdXN0IGRpcnR5IHRoZSBmb3JtIGV4cGxpY2l0bHkgdG8gc2hvdyB1cCBhcyBhIHVzZXIgbW9kaWZpY2F0aW9uIHdoZW4gaXQgd2FzIGRvbmUgcHJvZ3JhbW1hdGljYWxseVxuICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUodGhpcy51cGRhdGVSYWRpdXNJblZhbHVlcyhmb3JtR3JvdXAsIHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKSkpO1xuICAgIGZvcm1Hcm91cC5tYXJrQXNEaXJ0eSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSYWRpdXNJblZhbHVlcyhmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCwgdmFsdWVzOiBBZGRyZXNzRGF0YVtdKTogQWRkcmVzc0RhdGFbXSB7XG4gICAgcmV0dXJuIHZhbHVlcy5tYXAodmFsID0+ICh7XG4gICAgICAuLi52YWwsXG4gICAgICByYWRpdXM6IHRoaXMuaXNSYWRpdXNPcGVyYXRvclNlbGVjdGVkKGZvcm1Hcm91cCkgPyB0aGlzLmdldFJhZGl1c0RhdGEoZm9ybUdyb3VwKSA6IHVuZGVmaW5lZCxcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIGdldFJhZGl1c0RhdGEoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBBZGRyZXNzUmFkaXVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IGZvcm1Hcm91cC52YWx1ZS5zdXBwb3J0aW5nVmFsdWUsXG4gICAgICB1bml0czogdGhpcy5yYWRpdXNVbml0cygpLFxuICAgICAgb3BlcmF0b3I6IGZvcm1Hcm91cC52YWx1ZS5vcGVyYXRvcixcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBpc1JhZGl1c09wZXJhdG9yU2VsZWN0ZWQoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBib29sZWFuIHtcbiAgICByZXR1cm4gWydpbnNpZGVSYWRpdXMnLCAnb3V0c2lkZVJhZGl1cyddLmluY2x1ZGVzKGZvcm1Hcm91cC5nZXQoJ29wZXJhdG9yJyk/LnZhbHVlKSAmJiBmb3JtR3JvdXAudmFsdWU/LnN1cHBvcnRpbmdWYWx1ZSAhPT0gbnVsbDtcbiAgfVxufVxuIl19