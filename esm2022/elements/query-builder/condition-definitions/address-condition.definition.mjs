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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUdMLFNBQVMsRUFFVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFLTCxRQUFRLEVBQ1IsV0FBVyxHQUNaLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBRWxFOztHQUVHO0FBMkRILE1BQU0sT0FBTyw4QkFBK0IsU0FBUSx5QkFBeUI7SUE4QjNFLFlBQVksWUFBOEI7UUFDeEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBekJ0Qix1QkFBdUI7UUFDdkIsYUFBUSxHQUEwQjtZQUNoQyxhQUFhLEVBQUUsS0FBSztZQUNwQixXQUFXLEVBQUUsT0FBTztTQUNyQixDQUFDO1FBQ0YsV0FBTSxHQUF1QyxLQUFLLEVB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LENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxlQUFlLEtBQUssSUFBSSxDQUFDO0lBQ25JLENBQUM7K0dBbEpVLDhCQUE4QjttR0FBOUIsOEJBQThCLDRVQUMzQix1QkFBdUIsd0pBR3ZCLGlCQUFpQix1RUE1RHJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RUOzs0RkFJVSw4QkFBOEI7a0JBMUQxQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9EVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEO3FGQUV3QyxlQUFlO3NCQUFyRCxZQUFZO3VCQUFDLHVCQUF1QjtnQkFDUCxhQUFhO3NCQUExQyxZQUFZO3VCQUFDLGNBQWM7Z0JBQ0QsWUFBWTtzQkFBdEMsU0FBUzt1QkFBQyxjQUFjO2dCQUNRLGVBQWU7c0JBQS9DLFlBQVk7dUJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgY29tcHV0ZWQsXG4gIEVsZW1lbnRSZWYsXG4gIGluamVjdCxcbiAgaW5wdXQsXG4gIElucHV0U2lnbmFsLFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgU2lnbmFsLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ZpZWxkJztcbmltcG9ydCB7IFBsYWNlc0xpc3RDb21wb25lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3BsYWNlcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzLCBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQWRkcmVzc0NyaXRlcmlhQ29uZmlnLFxuICBBZGRyZXNzRGF0YSxcbiAgQWRkcmVzc1JhZGl1cyxcbiAgQWRkcmVzc1JhZGl1c1VuaXRzTmFtZSxcbiAgT3BlcmF0b3IsXG4gIFJhZGl1c1VuaXRzLFxufSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnR5cGVzJztcbmltcG9ydCB7IEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL2Fic3RyYWN0LWNvbmRpdGlvbi5kZWZpbml0aW9uJztcbmltcG9ydCB7IE5vdm9TZWxlY3RFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9zZWxlY3QnO1xuXG4vKipcbiAqIEhhbmRsZSBzZWxlY3Rpb24gb2YgZmllbGQgdmFsdWVzIHdoZW4gYSBsaXN0IG9mIG9wdGlvbnMgaXMgcHJvdmlkZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYWRkcmVzcy1jb25kaXRpb24tZGVmJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIG5vdm9Db25kaXRpb25GaWVsZERlZj5cbiAgICAgIDxub3ZvLWZpZWxkICpub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmPVwibGV0IGZvcm1Hcm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLm9wZXJhdG9yXCIgZm9ybUNvbnRyb2xOYW1lPVwib3BlcmF0b3JcIiAob25TZWxlY3QpPVwib25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXApXCI+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiaW5jbHVkZUFueVwiPnt7IGxhYmVscy5pbmNsdWRlQW55IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJleGNsdWRlQW55XCI+e3sgbGFiZWxzLmV4Y2x1ZGUgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluc2lkZVJhZGl1c1wiICpuZ0lmPVwicmFkaXVzRW5hYmxlZCgpXCI+e3sgbGFiZWxzLmluc2lkZVJhZGl1cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwib3V0c2lkZVJhZGl1c1wiICpuZ0lmPVwicmFkaXVzRW5hYmxlZCgpXCI+e3sgbGFiZWxzLm91dHNpZGVSYWRpdXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbm92b0NvbmRpdGlvbklucHV0RGVmPVwibGV0IGZvcm1Hcm91cDsgdmlld0luZGV4IGFzIHZpZXdJbmRleDsgZmllbGRNZXRhIGFzIG1ldGFcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1mbGV4IGp1c3RpZnk9XCJzcGFjZS1iZXR3ZWVuXCIgYWxpZ249XCJlbmRcIj5cbiAgICAgICAgICA8bm92by1maWVsZCAjaW5wdXQgKm5nSWY9XCJbJ3JhZGl1cycsICdpbnNpZGVSYWRpdXMnLCAnb3V0c2lkZVJhZGl1cyddLmluY2x1ZGVzKGZvcm1Hcm91cC52YWx1ZS5vcGVyYXRvcilcIiBjbGFzcz1cImFkZHJlc3MtcmFkaXVzXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgbm92b0lucHV0XG4gICAgICAgICAgICAgIHBhZGRpbmdMZWZ0PVwiM3B4XCJcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIG1pbj1cIjFcIlxuICAgICAgICAgICAgICBtYXg9XCI5OTk5XCJcbiAgICAgICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJzdXBwb3J0aW5nVmFsdWVcIlxuICAgICAgICAgICAgICAjZGlzdGFuY2VJbnB1dFxuICAgICAgICAgICAgICAoaW5wdXQpPVwib25SYWRpdXNTZWxlY3QoZm9ybUdyb3VwLCAkZXZlbnQpXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c3BhbiBtYXJnaW5MZWZ0PVwiMnB4XCIgbWFyZ2luUmlnaHQ9XCI0cHhcIiBwYWRkaW5nVG9wPVwiM3B4XCI+e3sgdW5pdHNMYWJlbCgpIH19PC9zcGFuPlxuICAgICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgICA8bm92by1maWVsZCAjbm92b0ZpZWxkIGNsYXNzPVwiYWRkcmVzcy1sb2NhdGlvblwiPlxuICAgICAgICAgICAgPG5vdm8tY2hpcC1saXN0IFsobmdNb2RlbCldPVwiY2hpcExpc3RNb2RlbFwiIFtuZ01vZGVsT3B0aW9uc109XCJ7IHN0YW5kYWxvbmU6IHRydWUgfVwiIChjbGljayk9XCJvcGVuUGxhY2VzTGlzdCh2aWV3SW5kZXgpXCI+XG4gICAgICAgICAgICAgIDxub3ZvLWNoaXAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZm9ybUdyb3VwLmdldCgndmFsdWUnKS52YWx1ZVwiIChyZW1vdmVkKT1cInJlbW92ZShpdGVtLCBmb3JtR3JvdXAsIHZpZXdJbmRleClcIj5cbiAgICAgICAgICAgICAgICA8bm92by10ZXh0IGVsbGlwc2lzIFt0b29sdGlwXT1cIml0ZW0uZm9ybWF0dGVkX2FkZHJlc3NcIiB0b29sdGlwT25PdmVyZmxvdz57eyBpdGVtLmZvcm1hdHRlZF9hZGRyZXNzIH19PC9ub3ZvLXRleHQ+XG4gICAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT5jbG9zZTwvbm92by1pY29uPlxuICAgICAgICAgICAgICA8L25vdm8tY2hpcD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgbm92b0NoaXBJbnB1dFxuICAgICAgICAgICAgICAgIFtpZF09XCJ2aWV3SW5kZXhcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJsYWJlbHMubG9jYXRpb25cIlxuICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbktleXVwKCRldmVudCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgICAgW3BpY2tlcl09XCJwbGFjZXNQaWNrZXJcIlxuICAgICAgICAgICAgICAgICNhZGRyZXNzSW5wdXQvPlxuICAgICAgICAgICAgPC9ub3ZvLWNoaXAtbGlzdD5cbiAgICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBpY29uPVwibG9jYXRpb25cIiBub3ZvU3VmZml4PlxuICAgICAgICAgICAgICA8Z29vZ2xlLXBsYWNlcy1saXN0XG4gICAgICAgICAgICAgICAgW3Rlcm1dPVwidGVybVwiXG4gICAgICAgICAgICAgICAgKHNlbGVjdCk9XCJzZWxlY3RQbGFjZSgkZXZlbnQsIGZvcm1Hcm91cCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICNwbGFjZXNQaWNrZXIvPlxuICAgICAgICAgICAgPC9ub3ZvLXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8L25vdm8tZmxleD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EZWZhdWx0QWRkcmVzc0NvbmRpdGlvbkRlZiBleHRlbmRzIEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkcmVuKE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50KSBvdmVybGF5Q2hpbGRyZW46IFF1ZXJ5TGlzdDxOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudD47XG4gIEBWaWV3Q2hpbGRyZW4oJ2FkZHJlc3NJbnB1dCcpIGlucHV0Q2hpbGRyZW46IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgQFZpZXdDaGlsZCgncGxhY2VzUGlja2VyJykgcGxhY2VzUGlja2VyOiBQbGFjZXNMaXN0Q29tcG9uZW50O1xuICBAVmlld0NoaWxkcmVuKE5vdm9TZWxlY3RFbGVtZW50KSBhZGRyZXNzU2lkZVRlc3Q6IGFueTtcblxuICAvLyBPdmVycmlkYWJsZSBkZWZhdWx0c1xuICBkZWZhdWx0czogQWRkcmVzc0NyaXRlcmlhQ29uZmlnID0ge1xuICAgIHJhZGl1c0VuYWJsZWQ6IGZhbHNlLFxuICAgIHJhZGl1c1VuaXRzOiAnbWlsZXMnLFxuICB9O1xuICBjb25maWc6IElucHV0U2lnbmFsPEFkZHJlc3NDcml0ZXJpYUNvbmZpZz4gPSBpbnB1dCgpO1xuICByYWRpdXNVbml0czogU2lnbmFsPEFkZHJlc3NSYWRpdXNVbml0c05hbWU+ID0gY29tcHV0ZWQoKCkgPT5cbiAgICB0aGlzLmNvbmZpZygpPy5yYWRpdXNVbml0cyB8fCB0aGlzLmRlZmF1bHRzLnJhZGl1c1VuaXRzXG4gICk7XG4gIHJhZGl1c0VuYWJsZWQ6IFNpZ25hbDxib29sZWFuPiA9IGNvbXB1dGVkKCgpID0+XG4gICAgdGhpcy5jb25maWcoKT8ucmFkaXVzRW5hYmxlZCB8fCB0aGlzLmRlZmF1bHRzLnJhZGl1c0VuYWJsZWRcbiAgKTtcbiAgdW5pdHNMYWJlbDogU2lnbmFsPHN0cmluZz4gPSBjb21wdXRlZCgoKSA9PlxuICAgIHRoaXMucmFkaXVzVW5pdHMoKSA9PT0gUmFkaXVzVW5pdHMubWlsZXMgPyB0aGlzLmxhYmVscy5taWxlcyA6IHRoaXMubGFiZWxzLmttXG4gICk7XG5cbiAgZGVmYXVsdE9wZXJhdG9yID0gT3BlcmF0b3IuaW5jbHVkZUFueTtcbiAgY2hpcExpc3RNb2RlbDogYW55ID0gJyc7XG4gIHRlcm06IHN0cmluZyA9ICcnO1xuXG4gIHByaXZhdGUgX2FkZHJlc3NDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHVibGljIGVsZW1lbnQgPSBpbmplY3QoRWxlbWVudFJlZik7XG5cbiAgY29uc3RydWN0b3IobGFiZWxTZXJ2aWNlOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobGFiZWxTZXJ2aWNlKTtcbiAgICB0aGlzLmRlZmluZU9wZXJhdG9yRWRpdEdyb3VwKE9wZXJhdG9yLmluY2x1ZGVBbnksIE9wZXJhdG9yLmV4Y2x1ZGVBbnksIE9wZXJhdG9yLmluc2lkZVJhZGl1cywgT3BlcmF0b3Iub3V0c2lkZVJhZGl1cyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9hZGRyZXNzQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25LZXl1cChldmVudCwgdmlld0luZGV4KSB7XG4gICAgaWYgKCFbS2V5LkVzY2FwZSwgS2V5LkVudGVyXS5pbmNsdWRlcyhldmVudC5rZXkpKSB7XG4gICAgICB0aGlzLm9wZW5QbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gICAgfVxuICAgIHRoaXMudGVybSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIG9uS2V5ZG93bihldmVudCwgdmlld0luZGV4KSB7XG4gICAgaWYgKCF0aGlzLnBsYWNlc1BpY2tlci5kcm9wZG93bk9wZW4pIHtcbiAgICAgIHRoaXMub3BlblBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgICAgIHRoaXMucGxhY2VzUGlja2VyLmRyb3Bkb3duT3BlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmIChbS2V5LkVzY2FwZSwgS2V5LlRhYl0uaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgICAgdGhpcy5jbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wbGFjZXNQaWNrZXIub25LZXlEb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZShmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IEFkZHJlc3NEYXRhW10ge1xuICAgIHJldHVybiBmb3JtR3JvdXAudmFsdWUudmFsdWUgfHwgW107XG4gIH1cblxuICBnZXRDdXJyZW50T3ZlcmxheSh2aWV3SW5kZXg6IHN0cmluZyk6IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5Q2hpbGRyZW4/LmZpbmQoaXRlbSA9PiBpdGVtLm92ZXJsYXlJZCA9PT0gdmlld0luZGV4KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRJbnB1dCh2aWV3SW5kZXg6IHN0cmluZyk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLmlucHV0Q2hpbGRyZW4/LmZpbmQoaXRlbSA9PiAoaXRlbSBhcyBhbnkpLm5hdGl2ZUVsZW1lbnQuaWQgPT09IHZpZXdJbmRleCk7XG4gIH1cblxuICBvcGVuUGxhY2VzTGlzdCh2aWV3SW5kZXgpIHtcbiAgICB0aGlzLmdldEN1cnJlbnRPdmVybGF5KHZpZXdJbmRleCk/Lm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCkge1xuICAgIHRoaXMuZ2V0Q3VycmVudE92ZXJsYXkodmlld0luZGV4KT8uY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgc2VsZWN0UGxhY2UoZXZlbnQ6IGFueSwgZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHZpZXdJbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVUb0FkZDogQWRkcmVzc0RhdGEgPSB7XG4gICAgICBhZGRyZXNzX2NvbXBvbmVudHM6IGV2ZW50LmFkZHJlc3NfY29tcG9uZW50cyxcbiAgICAgIGZvcm1hdHRlZF9hZGRyZXNzOiBldmVudC5mb3JtYXR0ZWRfYWRkcmVzcyxcbiAgICAgIGdlb21ldHJ5OiBldmVudC5nZW9tZXRyeSxcbiAgICAgIG5hbWU6IGV2ZW50Lm5hbWUsXG4gICAgICBwbGFjZV9pZDogZXZlbnQucGxhY2VfaWQsXG4gICAgICB0eXBlczogZXZlbnQudHlwZXMsXG4gICAgfTtcbiAgICBjb25zdCBjdXJyZW50OiBBZGRyZXNzRGF0YSB8IEFkZHJlc3NEYXRhW10gPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgY29uc3QgdXBkYXRlZDogQWRkcmVzc0RhdGFbXSA9IEFycmF5LmlzQXJyYXkoY3VycmVudCkgPyBbLi4uY3VycmVudCwgdmFsdWVUb0FkZF0gOiBbdmFsdWVUb0FkZF07XG4gICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZSh0aGlzLnVwZGF0ZVJhZGl1c0luVmFsdWVzKGZvcm1Hcm91cCwgdXBkYXRlZCkpO1xuXG4gICAgdGhpcy5pbnB1dENoaWxkcmVuLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH0pXG4gICAgdGhpcy5nZXRDdXJyZW50SW5wdXQodmlld0luZGV4KT8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gIH1cblxuICByZW1vdmUodmFsdWVUb1JlbW92ZTogQWRkcmVzc0RhdGEsIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sLCB2aWV3SW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgY29uc3QgaW5kZXggPSBjdXJyZW50LmluZGV4T2YodmFsdWVUb1JlbW92ZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gWy4uLmN1cnJlbnRdXG4gICAgICBvbGRWYWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZShvbGRWYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gIH1cblxuICAvLyBPdmVycmlkZSBhYnN0cmFjdCBiZWhhdmlvciAtIGFsbG93IG1vdmluZyBsb2NhdGlvbiBmcm9tIGluY2x1ZGVBbnkgdG8gcmFkaXVzLCBidXQgd2hlbiBtb3ZpbmcgdGhlIG9wcG9zaXRlIGRpcmVjdGlvbixcbiAgLy8gdHJpbSBvdXQgcmFkaXVzIGluZm9ybWF0aW9uIGZyb20gdGhlIHZhbHVlXG4gIG9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgcHJldmlvdXNPcGVyYXRvciA9IHRoaXMuX3ByZXZpb3VzT3BlcmF0b3JWYWx1ZTtcbiAgICBzdXBlci5vbk9wZXJhdG9yU2VsZWN0KGZvcm1Hcm91cCk7XG4gICAgaWYgKFtwcmV2aW91c09wZXJhdG9yLCBmb3JtR3JvdXAuZ2V0KCdvcGVyYXRvcicpLmdldFJhd1ZhbHVlKCldLmluZGV4T2YoT3BlcmF0b3IuaW5zaWRlUmFkaXVzKSAhPT0gLTEgJiZcbiAgICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5nZXRSYXdWYWx1ZSgpICE9IG51bGwpIHtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUodGhpcy51cGRhdGVSYWRpdXNJblZhbHVlcyhmb3JtR3JvdXAsIHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKSkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUmFkaXVzU2VsZWN0KGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sLCBldmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1heExlbmd0aFJhZGl1cyA9IGV2ZW50LnRhcmdldC52YWx1ZS5zbGljZSgwLCA0KTtcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBtYXhMZW5ndGhSYWRpdXM7XG4gICAgZm9ybUdyb3VwLmdldCgnc3VwcG9ydGluZ1ZhbHVlJykuc2V0VmFsdWUobWF4TGVuZ3RoUmFkaXVzKTtcbiAgICAvLyBXZSBtdXN0IGRpcnR5IHRoZSBmb3JtIGV4cGxpY2l0bHkgdG8gc2hvdyB1cCBhcyBhIHVzZXIgbW9kaWZpY2F0aW9uIHdoZW4gaXQgd2FzIGRvbmUgcHJvZ3JhbW1hdGljYWxseVxuICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUodGhpcy51cGRhdGVSYWRpdXNJblZhbHVlcyhmb3JtR3JvdXAsIHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKSkpO1xuICAgIGZvcm1Hcm91cC5tYXJrQXNEaXJ0eSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSYWRpdXNJblZhbHVlcyhmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCwgdmFsdWVzOiBBZGRyZXNzRGF0YVtdKTogQWRkcmVzc0RhdGFbXSB7XG4gICAgcmV0dXJuIHZhbHVlcy5tYXAodmFsID0+ICh7XG4gICAgICAuLi52YWwsXG4gICAgICByYWRpdXM6IHRoaXMuaXNSYWRpdXNPcGVyYXRvclNlbGVjdGVkKGZvcm1Hcm91cCkgPyB0aGlzLmdldFJhZGl1c0RhdGEoZm9ybUdyb3VwKSA6IHVuZGVmaW5lZCxcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIGdldFJhZGl1c0RhdGEoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBBZGRyZXNzUmFkaXVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IGZvcm1Hcm91cC52YWx1ZS5zdXBwb3J0aW5nVmFsdWUsXG4gICAgICB1bml0czogdGhpcy5yYWRpdXNVbml0cygpLFxuICAgICAgb3BlcmF0b3I6IGZvcm1Hcm91cC52YWx1ZS5vcGVyYXRvcixcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBpc1JhZGl1c09wZXJhdG9yU2VsZWN0ZWQoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBib29sZWFuIHtcbiAgICByZXR1cm4gWydpbnNpZGVSYWRpdXMnLCAnb3V0c2lkZVJhZGl1cyddLmluY2x1ZGVzKGZvcm1Hcm91cC5nZXQoJ29wZXJhdG9yJyk/LnZhbHVlKSAmJiBmb3JtR3JvdXAudmFsdWU/LnN1cHBvcnRpbmdWYWx1ZSAhPT0gbnVsbDtcbiAgfVxufVxuIl19