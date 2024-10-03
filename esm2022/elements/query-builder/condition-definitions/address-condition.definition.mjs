import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, QueryList, signal, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { PlacesListComponent } from 'novo-elements/elements/places';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { Subscription } from 'rxjs';
import { Operator, RadiusUnits } from '../query-builder.types';
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
import * as i11 from "../query-builder.directives";
/**
 * Handle selection of field values when a list of options is provided.
 */
export class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        // Static defaults
        this.radiusValues = [5, 10, 20, 30, 40, 50, 100];
        this.defaultRadius = 30;
        // Overridable defaults
        this.defaults = {
            radiusEnabled: false,
            radiusUnits: 'miles',
        };
        this.config = input();
        this.radiusUnits = computed(() => this.config()?.radiusUnits || this.defaults.radiusUnits);
        this.radiusEnabled = computed(() => this.config()?.radiusEnabled || this.defaults.radiusEnabled);
        this.radius = signal(this.defaultRadius);
        this.radiusOptions = computed(() => {
            const unitsLabel = this.radiusUnits() === RadiusUnits.miles ? this.labels.miles : this.labels.km;
            return this.radiusValues.map(value => ({
                label: `${value.toString()} ${unitsLabel}`,
                value,
            }));
        });
        this.defaultOperator = Operator.includeAny;
        this.chipListModel = '';
        this.term = '';
        this._addressChangesSubscription = Subscription.EMPTY;
        this.element = inject(ElementRef);
        this.defineOperatorEditGroup(Operator.includeAny, Operator.excludeAny, Operator.radius);
    }
    frameAfterViewInit() {
        super.frameAfterViewInit();
        // Initialize the radius value from existing data
        this.assignRadiusFromValue();
        // Update the radius on address value changes
        this._addressChangesSubscription = this.inputChildren.changes.subscribe(() => {
            this.assignRadiusFromValue();
        });
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
        if ([previousOperator, formGroup.get('operator').getRawValue()].indexOf(Operator.radius) !== -1 &&
            formGroup.get('value').getRawValue() != null) {
            formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, this.getValue(formGroup)));
        }
    }
    onRadiusSelect(formGroup, radius) {
        this.radius.set(radius);
        // We must dirty the form explicitly to show up as a user modification when it was done programmatically
        formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, this.getValue(formGroup)));
        formGroup.markAsDirty();
    }
    assignRadiusFromValue() {
        if (this.placesPicker?.model?.length) {
            const addressData = this.placesPicker.model[0];
            const initialRadius = addressData.radius?.value;
            if (initialRadius && Helpers.isNumber(initialRadius)) {
                this.radius.set(initialRadius);
            }
        }
    }
    updateRadiusInValues(formGroup, values) {
        return values.map(val => ({
            ...val,
            radius: this.isRadiusOperatorSelected(formGroup) ? this.getRadiusData(formGroup) : undefined,
        }));
    }
    getRadiusData(formGroup) {
        return {
            value: this.getRadius(formGroup),
            units: this.radiusUnits(),
        };
    }
    getRadius(formGroup) {
        return this.isRadiusOperatorSelected(formGroup) ? this.radius() : undefined;
    }
    isRadiusOperatorSelected(formGroup) {
        return formGroup.get('operator').value === 'radius';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultAddressConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "17.2.3", type: NovoDefaultAddressConditionDef, selector: "novo-address-condition-def", inputs: { config: { classPropertyName: "config", publicName: "config", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "placesPicker", first: true, predicate: ["placesPicker"], descendants: true }, { propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }, { propertyName: "inputChildren", predicate: ["addressInput"], descendants: true }, { propertyName: "addressSideTest", predicate: NovoSelectElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="radius" *ngIf="radiusEnabled()">{{ labels.radius }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [formGroup]="formGroup">
        <novo-flex justify="space-between" align="end">
          <novo-field #novoRadiusField *ngIf="formGroup.value.operator === 'radius'" class="address-radius">
            <novo-select
              #radiusSelect [placeholder]="labels.radius"
              (onSelect)="onRadiusSelect(formGroup, $event.selected)"
              [value]="radius()"
              [options]="radiusOptions()">
            </novo-select>
          </novo-field>
          <novo-field #novoField class="address-location">
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.PlacesListComponent, selector: "google-places-list", inputs: ["userSettings"], outputs: ["termChange", "select"] }, { kind: "component", type: i5.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "component", type: i6.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i7.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i7.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "component", type: i7.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i7.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i8.NovoFlexElement, selector: "novo-flex,novo-row", inputs: ["direction", "align", "justify", "wrap", "gap"] }, { kind: "component", type: i9.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i10.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i10.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "directive", type: i10.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { kind: "component", type: i10.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { kind: "directive", type: i11.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i11.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i11.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
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
          <novo-option value="radius" *ngIf="radiusEnabled()">{{ labels.radius }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [formGroup]="formGroup">
        <novo-flex justify="space-between" align="end">
          <novo-field #novoRadiusField *ngIf="formGroup.value.operator === 'radius'" class="address-radius">
            <novo-select
              #radiusSelect [placeholder]="labels.radius"
              (onSelect)="onRadiusSelect(formGroup, $event.selected)"
              [value]="radius()"
              [options]="radiusOptions()">
            </novo-select>
          </novo-field>
          <novo-field #novoField class="address-location">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUdMLFNBQVMsRUFFVCxNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFFbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBTyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUE2RSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUksT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFFbEU7O0dBRUc7QUFvREgsTUFBTSxPQUFPLDhCQUErQixTQUFRLHlCQUF5QjtJQXdDM0UsWUFBWSxZQUE4QjtRQUN4QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFuQ3RCLGtCQUFrQjtRQUNsQixpQkFBWSxHQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFB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QUFVLENBQUMsQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDO0lBQ3RELENBQUM7OEdBbExVLDhCQUE4QjtrR0FBOUIsOEJBQThCLDRVQUMzQix1QkFBdUIsd0pBR3ZCLGlCQUFpQix1RUFyRHJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q1Q7OzJGQUlVLDhCQUE4QjtrQkFuRDFDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q1Q7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRDtxRkFFd0MsZUFBZTtzQkFBckQsWUFBWTt1QkFBQyx1QkFBdUI7Z0JBQ1AsYUFBYTtzQkFBMUMsWUFBWTt1QkFBQyxjQUFjO2dCQUNELFlBQVk7c0JBQXRDLFNBQVM7dUJBQUMsY0FBYztnQkFDUSxlQUFlO3NCQUEvQyxZQUFZO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIGNvbXB1dGVkLFxuICBFbGVtZW50UmVmLFxuICBpbmplY3QsXG4gIGlucHV0LFxuICBJbnB1dFNpZ25hbCxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFNpZ25hbCxcbiAgc2lnbmFsLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFdyaXRhYmxlU2lnbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ZpZWxkJztcbmltcG9ydCB7IFBsYWNlc0xpc3RDb21wb25lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3BsYWNlcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzLCBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWRkcmVzc0NyaXRlcmlhQ29uZmlnLCBBZGRyZXNzRGF0YSwgQWRkcmVzc1JhZGl1cywgQWRkcmVzc1JhZGl1c1VuaXRzTmFtZSwgT3BlcmF0b3IsIFJhZGl1c1VuaXRzIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0RWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc2VsZWN0JztcblxuLyoqXG4gKiBIYW5kbGUgc2VsZWN0aW9uIG9mIGZpZWxkIHZhbHVlcyB3aGVuIGEgbGlzdCBvZiBvcHRpb25zIGlzIHByb3ZpZGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFkZHJlc3MtY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY+XG4gICAgICA8bm92by1maWVsZCAqbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5vcGVyYXRvclwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCIgKG9uU2VsZWN0KT1cIm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKVwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluY2x1ZGVBbnlcIj57eyBsYWJlbHMuaW5jbHVkZUFueSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiZXhjbHVkZUFueVwiPnt7IGxhYmVscy5leGNsdWRlIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJyYWRpdXNcIiAqbmdJZj1cInJhZGl1c0VuYWJsZWQoKVwiPnt7IGxhYmVscy5yYWRpdXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbm92b0NvbmRpdGlvbklucHV0RGVmPVwibGV0IGZvcm1Hcm91cDsgdmlld0luZGV4IGFzIHZpZXdJbmRleDsgZmllbGRNZXRhIGFzIG1ldGFcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1mbGV4IGp1c3RpZnk9XCJzcGFjZS1iZXR3ZWVuXCIgYWxpZ249XCJlbmRcIj5cbiAgICAgICAgICA8bm92by1maWVsZCAjbm92b1JhZGl1c0ZpZWxkICpuZ0lmPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yID09PSAncmFkaXVzJ1wiIGNsYXNzPVwiYWRkcmVzcy1yYWRpdXNcIj5cbiAgICAgICAgICAgIDxub3ZvLXNlbGVjdFxuICAgICAgICAgICAgICAjcmFkaXVzU2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMucmFkaXVzXCJcbiAgICAgICAgICAgICAgKG9uU2VsZWN0KT1cIm9uUmFkaXVzU2VsZWN0KGZvcm1Hcm91cCwgJGV2ZW50LnNlbGVjdGVkKVwiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJyYWRpdXMoKVwiXG4gICAgICAgICAgICAgIFtvcHRpb25zXT1cInJhZGl1c09wdGlvbnMoKVwiPlxuICAgICAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgICAgPG5vdm8tZmllbGQgI25vdm9GaWVsZCBjbGFzcz1cImFkZHJlc3MtbG9jYXRpb25cIj5cbiAgICAgICAgICAgIDxub3ZvLWNoaXAtbGlzdCBbKG5nTW9kZWwpXT1cImNoaXBMaXN0TW9kZWxcIiBbbmdNb2RlbE9wdGlvbnNdPVwieyBzdGFuZGFsb25lOiB0cnVlIH1cIiAoY2xpY2spPVwib3BlblBsYWNlc0xpc3Qodmlld0luZGV4KVwiPlxuICAgICAgICAgICAgICA8bm92by1jaGlwICpuZ0Zvcj1cImxldCBpdGVtIG9mIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykudmFsdWVcIiAocmVtb3ZlZCk9XCJyZW1vdmUoaXRlbSwgZm9ybUdyb3VwLCB2aWV3SW5kZXgpXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tdGV4dCBlbGxpcHNpcz57eyBpdGVtLmZvcm1hdHRlZF9hZGRyZXNzIH19PC9ub3ZvLXRleHQ+XG4gICAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT5jbG9zZTwvbm92by1pY29uPlxuICAgICAgICAgICAgICA8L25vdm8tY2hpcD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgbm92b0NoaXBJbnB1dFxuICAgICAgICAgICAgICAgIFtpZF09XCJ2aWV3SW5kZXhcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJsYWJlbHMubG9jYXRpb25cIlxuICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbktleXVwKCRldmVudCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgICAgW3BpY2tlcl09XCJwbGFjZXNQaWNrZXJcIlxuICAgICAgICAgICAgICAgICNhZGRyZXNzSW5wdXQvPlxuICAgICAgICAgICAgPC9ub3ZvLWNoaXAtbGlzdD5cbiAgICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBpY29uPVwibG9jYXRpb25cIiBub3ZvU3VmZml4PlxuICAgICAgICAgICAgICA8Z29vZ2xlLXBsYWNlcy1saXN0XG4gICAgICAgICAgICAgICAgW3Rlcm1dPVwidGVybVwiXG4gICAgICAgICAgICAgICAgKHNlbGVjdCk9XCJzZWxlY3RQbGFjZSgkZXZlbnQsIGZvcm1Hcm91cCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICNwbGFjZXNQaWNrZXIvPlxuICAgICAgICAgICAgPC9ub3ZvLXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8L25vdm8tZmxleD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EZWZhdWx0QWRkcmVzc0NvbmRpdGlvbkRlZiBleHRlbmRzIEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkcmVuKE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50KSBvdmVybGF5Q2hpbGRyZW46IFF1ZXJ5TGlzdDxOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudD47XG4gIEBWaWV3Q2hpbGRyZW4oJ2FkZHJlc3NJbnB1dCcpIGlucHV0Q2hpbGRyZW46IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgQFZpZXdDaGlsZCgncGxhY2VzUGlja2VyJykgcGxhY2VzUGlja2VyOiBQbGFjZXNMaXN0Q29tcG9uZW50O1xuICBAVmlld0NoaWxkcmVuKE5vdm9TZWxlY3RFbGVtZW50KSBhZGRyZXNzU2lkZVRlc3Q6IGFueTtcblxuICAvLyBTdGF0aWMgZGVmYXVsdHNcbiAgcmFkaXVzVmFsdWVzOiBudW1iZXJbXSA9IFs1LCAxMCwgMjAsIDMwLCA0MCwgNTAsIDEwMF07XG4gIGRlZmF1bHRSYWRpdXM6IG51bWJlciA9IDMwO1xuXG4gIC8vIE92ZXJyaWRhYmxlIGRlZmF1bHRzXG4gIGRlZmF1bHRzOiBBZGRyZXNzQ3JpdGVyaWFDb25maWcgPSB7XG4gICAgcmFkaXVzRW5hYmxlZDogZmFsc2UsXG4gICAgcmFkaXVzVW5pdHM6ICdtaWxlcycsXG4gIH07XG4gIGNvbmZpZzogSW5wdXRTaWduYWw8QWRkcmVzc0NyaXRlcmlhQ29uZmlnPiA9IGlucHV0KCk7XG4gIHJhZGl1c1VuaXRzOiBTaWduYWw8QWRkcmVzc1JhZGl1c1VuaXRzTmFtZT4gPSBjb21wdXRlZCgoKSA9PlxuICAgIHRoaXMuY29uZmlnKCk/LnJhZGl1c1VuaXRzIHx8IHRoaXMuZGVmYXVsdHMucmFkaXVzVW5pdHNcbiAgKTtcbiAgcmFkaXVzRW5hYmxlZDogU2lnbmFsPGJvb2xlYW4+ID0gY29tcHV0ZWQoKCkgPT5cbiAgICB0aGlzLmNvbmZpZygpPy5yYWRpdXNFbmFibGVkIHx8IHRoaXMuZGVmYXVsdHMucmFkaXVzRW5hYmxlZFxuICApO1xuXG4gIHJhZGl1czogV3JpdGFibGVTaWduYWw8bnVtYmVyPiA9IHNpZ25hbCh0aGlzLmRlZmF1bHRSYWRpdXMpO1xuICByYWRpdXNPcHRpb25zOiBTaWduYWw8eyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogbnVtYmVyOyB9W10+ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHVuaXRzTGFiZWwgPSB0aGlzLnJhZGl1c1VuaXRzKCkgPT09IFJhZGl1c1VuaXRzLm1pbGVzID8gdGhpcy5sYWJlbHMubWlsZXMgOiB0aGlzLmxhYmVscy5rbTtcbiAgICByZXR1cm4gdGhpcy5yYWRpdXNWYWx1ZXMubWFwKHZhbHVlID0+ICh7XG4gICAgICBsYWJlbDogYCR7dmFsdWUudG9TdHJpbmcoKX0gJHt1bml0c0xhYmVsfWAsXG4gICAgICB2YWx1ZSxcbiAgICB9KSk7XG4gIH0pO1xuXG4gIGRlZmF1bHRPcGVyYXRvciA9IE9wZXJhdG9yLmluY2x1ZGVBbnk7XG4gIGNoaXBMaXN0TW9kZWw6IGFueSA9ICcnO1xuICB0ZXJtOiBzdHJpbmcgPSAnJztcblxuICBwcml2YXRlIF9hZGRyZXNzQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHB1YmxpYyBlbGVtZW50ID0gaW5qZWN0KEVsZW1lbnRSZWYpO1xuXG4gIGNvbnN0cnVjdG9yKGxhYmVsU2VydmljZTogTm92b0xhYmVsU2VydmljZSkge1xuICAgIHN1cGVyKGxhYmVsU2VydmljZSk7XG4gICAgdGhpcy5kZWZpbmVPcGVyYXRvckVkaXRHcm91cChPcGVyYXRvci5pbmNsdWRlQW55LCBPcGVyYXRvci5leGNsdWRlQW55LCBPcGVyYXRvci5yYWRpdXMpO1xuICB9XG5cbiAgZnJhbWVBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLmZyYW1lQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIC8vIEluaXRpYWxpemUgdGhlIHJhZGl1cyB2YWx1ZSBmcm9tIGV4aXN0aW5nIGRhdGFcbiAgICB0aGlzLmFzc2lnblJhZGl1c0Zyb21WYWx1ZSgpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSByYWRpdXMgb24gYWRkcmVzcyB2YWx1ZSBjaGFuZ2VzXG4gICAgdGhpcy5fYWRkcmVzc0NoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0Q2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5hc3NpZ25SYWRpdXNGcm9tVmFsdWUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2FkZHJlc3NDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBvbktleXVwKGV2ZW50LCB2aWV3SW5kZXgpIHtcbiAgICBpZiAoIVtLZXkuRXNjYXBlLCBLZXkuRW50ZXJdLmluY2x1ZGVzKGV2ZW50LmtleSkpIHtcbiAgICAgIHRoaXMub3BlblBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgICB9XG4gICAgdGhpcy50ZXJtID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgb25LZXlkb3duKGV2ZW50LCB2aWV3SW5kZXgpIHtcbiAgICBpZiAoIXRoaXMucGxhY2VzUGlja2VyLmRyb3Bkb3duT3Blbikge1xuICAgICAgdGhpcy5vcGVuUGxhY2VzTGlzdCh2aWV3SW5kZXgpO1xuICAgICAgdGhpcy5wbGFjZXNQaWNrZXIuZHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFtLZXkuRXNjYXBlLCBLZXkuVGFiXS5pbmNsdWRlcyhldmVudC5rZXkpKSB7XG4gICAgICB0aGlzLmNsb3NlUGxhY2VzTGlzdCh2aWV3SW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBsYWNlc1BpY2tlci5vbktleURvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldFZhbHVlKGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogQWRkcmVzc0RhdGFbXSB7XG4gICAgcmV0dXJuIGZvcm1Hcm91cC52YWx1ZS52YWx1ZSB8fCBbXTtcbiAgfVxuXG4gIGdldEN1cnJlbnRPdmVybGF5KHZpZXdJbmRleDogc3RyaW5nKTogTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlDaGlsZHJlbj8uZmluZChpdGVtID0+IGl0ZW0ub3ZlcmxheUlkID09PSB2aWV3SW5kZXgpO1xuICB9XG5cbiAgZ2V0Q3VycmVudElucHV0KHZpZXdJbmRleDogc3RyaW5nKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRDaGlsZHJlbj8uZmluZChpdGVtID0+IChpdGVtIGFzIGFueSkubmF0aXZlRWxlbWVudC5pZCA9PT0gdmlld0luZGV4KTtcbiAgfVxuXG4gIG9wZW5QbGFjZXNMaXN0KHZpZXdJbmRleCkge1xuICAgIHRoaXMuZ2V0Q3VycmVudE92ZXJsYXkodmlld0luZGV4KT8ub3BlblBhbmVsKCk7XG4gIH1cblxuICBjbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KSB7XG4gICAgdGhpcy5nZXRDdXJyZW50T3ZlcmxheSh2aWV3SW5kZXgpPy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBzZWxlY3RQbGFjZShldmVudDogYW55LCBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCwgdmlld0luZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZVRvQWRkOiBBZGRyZXNzRGF0YSA9IHtcbiAgICAgIGFkZHJlc3NfY29tcG9uZW50czogZXZlbnQuYWRkcmVzc19jb21wb25lbnRzLFxuICAgICAgZm9ybWF0dGVkX2FkZHJlc3M6IGV2ZW50LmZvcm1hdHRlZF9hZGRyZXNzLFxuICAgICAgZ2VvbWV0cnk6IGV2ZW50Lmdlb21ldHJ5LFxuICAgICAgbmFtZTogZXZlbnQubmFtZSxcbiAgICAgIHBsYWNlX2lkOiBldmVudC5wbGFjZV9pZCxcbiAgICAgIHR5cGVzOiBldmVudC50eXBlcyxcbiAgICB9O1xuICAgIGNvbnN0IGN1cnJlbnQ6IEFkZHJlc3NEYXRhIHwgQWRkcmVzc0RhdGFbXSA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBjb25zdCB1cGRhdGVkOiBBZGRyZXNzRGF0YVtdID0gQXJyYXkuaXNBcnJheShjdXJyZW50KSA/IFsuLi5jdXJyZW50LCB2YWx1ZVRvQWRkXSA6IFt2YWx1ZVRvQWRkXTtcbiAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKHRoaXMudXBkYXRlUmFkaXVzSW5WYWx1ZXMoZm9ybUdyb3VwLCB1cGRhdGVkKSk7XG5cbiAgICB0aGlzLmlucHV0Q2hpbGRyZW4uZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfSlcbiAgICB0aGlzLmdldEN1cnJlbnRJbnB1dCh2aWV3SW5kZXgpPy5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy5jbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgfVxuXG4gIHJlbW92ZSh2YWx1ZVRvUmVtb3ZlOiBBZGRyZXNzRGF0YSwgZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHZpZXdJbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBjb25zdCBpbmRleCA9IGN1cnJlbnQuaW5kZXhPZih2YWx1ZVRvUmVtb3ZlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBbLi4uY3VycmVudF1cbiAgICAgIG9sZFZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKG9sZFZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgfVxuXG4gIC8vIE92ZXJyaWRlIGFic3RyYWN0IGJlaGF2aW9yIC0gYWxsb3cgbW92aW5nIGxvY2F0aW9uIGZyb20gaW5jbHVkZUFueSB0byByYWRpdXMsIGJ1dCB3aGVuIG1vdmluZyB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uLFxuICAvLyB0cmltIG91dCByYWRpdXMgaW5mb3JtYXRpb24gZnJvbSB0aGUgdmFsdWVcbiAgb25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2aW91c09wZXJhdG9yID0gdGhpcy5fcHJldmlvdXNPcGVyYXRvclZhbHVlO1xuICAgIHN1cGVyLm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKTtcbiAgICBpZiAoW3ByZXZpb3VzT3BlcmF0b3IsIGZvcm1Hcm91cC5nZXQoJ29wZXJhdG9yJykuZ2V0UmF3VmFsdWUoKV0uaW5kZXhPZihPcGVyYXRvci5yYWRpdXMpICE9PSAtMSAmJlxuICAgICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLmdldFJhd1ZhbHVlKCkgIT0gbnVsbCkge1xuICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZSh0aGlzLnVwZGF0ZVJhZGl1c0luVmFsdWVzKGZvcm1Hcm91cCwgdGhpcy5nZXRWYWx1ZShmb3JtR3JvdXApKSk7XG4gICAgfVxuICB9XG5cbiAgb25SYWRpdXNTZWxlY3QoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHJhZGl1czogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yYWRpdXMuc2V0KHJhZGl1cyk7XG4gICAgLy8gV2UgbXVzdCBkaXJ0eSB0aGUgZm9ybSBleHBsaWNpdGx5IHRvIHNob3cgdXAgYXMgYSB1c2VyIG1vZGlmaWNhdGlvbiB3aGVuIGl0IHdhcyBkb25lIHByb2dyYW1tYXRpY2FsbHlcbiAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKHRoaXMudXBkYXRlUmFkaXVzSW5WYWx1ZXMoZm9ybUdyb3VwLCB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCkpKTtcbiAgICBmb3JtR3JvdXAubWFya0FzRGlydHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXNzaWduUmFkaXVzRnJvbVZhbHVlKCkge1xuICAgIGlmICh0aGlzLnBsYWNlc1BpY2tlcj8ubW9kZWw/Lmxlbmd0aCkge1xuICAgICAgY29uc3QgYWRkcmVzc0RhdGE6IEFkZHJlc3NEYXRhID0gdGhpcy5wbGFjZXNQaWNrZXIubW9kZWxbMF07XG4gICAgICBjb25zdCBpbml0aWFsUmFkaXVzID0gYWRkcmVzc0RhdGEucmFkaXVzPy52YWx1ZTtcbiAgICAgIGlmIChpbml0aWFsUmFkaXVzICYmIEhlbHBlcnMuaXNOdW1iZXIoaW5pdGlhbFJhZGl1cykpIHtcbiAgICAgICAgdGhpcy5yYWRpdXMuc2V0KGluaXRpYWxSYWRpdXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUmFkaXVzSW5WYWx1ZXMoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHZhbHVlczogQWRkcmVzc0RhdGFbXSk6IEFkZHJlc3NEYXRhW10ge1xuICAgIHJldHVybiB2YWx1ZXMubWFwKHZhbCA9PiAoe1xuICAgICAgLi4udmFsLFxuICAgICAgcmFkaXVzOiB0aGlzLmlzUmFkaXVzT3BlcmF0b3JTZWxlY3RlZChmb3JtR3JvdXApID8gdGhpcy5nZXRSYWRpdXNEYXRhKGZvcm1Hcm91cCkgOiB1bmRlZmluZWQsXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSYWRpdXNEYXRhKGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogQWRkcmVzc1JhZGl1cyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB0aGlzLmdldFJhZGl1cyhmb3JtR3JvdXApLFxuICAgICAgdW5pdHM6IHRoaXMucmFkaXVzVW5pdHMoKSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSYWRpdXMoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmlzUmFkaXVzT3BlcmF0b3JTZWxlY3RlZChmb3JtR3JvdXApID8gdGhpcy5yYWRpdXMoKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgaXNSYWRpdXNPcGVyYXRvclNlbGVjdGVkKGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZvcm1Hcm91cC5nZXQoJ29wZXJhdG9yJykudmFsdWUgPT09ICdyYWRpdXMnO1xuICB9XG59XG4iXX0=