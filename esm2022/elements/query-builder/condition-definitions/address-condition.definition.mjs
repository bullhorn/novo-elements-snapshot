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
            place_id: event.place_id,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUdMLFNBQVMsRUFFVCxNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFFbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBTyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUE2RSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUksT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFFbEU7O0dBRUc7QUFvREgsTUFBTSxPQUFPLDhCQUErQixTQUFRLHlCQUF5QjtJQXdDM0UsWUFBWSxZQUE4QjtRQUN4QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFuQ3RCLGtCQUFrQjtRQUNsQixpQkFBWSxHQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFB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QTlCLDhCQUE4Qiw0VUFDM0IsdUJBQXVCLHdKQUd2QixpQkFBaUIsdUVBckRyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNUOzsyRkFJVSw4QkFBOEI7a0JBbkQxQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQ7cUZBRXdDLGVBQWU7c0JBQXJELFlBQVk7dUJBQUMsdUJBQXVCO2dCQUNQLGFBQWE7c0JBQTFDLFlBQVk7dUJBQUMsY0FBYztnQkFDRCxZQUFZO3NCQUF0QyxTQUFTO3VCQUFDLGNBQWM7Z0JBQ1EsZUFBZTtzQkFBL0MsWUFBWTt1QkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBjb21wdXRlZCxcbiAgRWxlbWVudFJlZixcbiAgaW5qZWN0LFxuICBpbnB1dCxcbiAgSW5wdXRTaWduYWwsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0LFxuICBTaWduYWwsXG4gIHNpZ25hbCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBXcml0YWJsZVNpZ25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBQbGFjZXNMaXN0Q29tcG9uZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9wbGFjZXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycywgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFkZHJlc3NDcml0ZXJpYUNvbmZpZywgQWRkcmVzc0RhdGEsIEFkZHJlc3NSYWRpdXMsIEFkZHJlc3NSYWRpdXNVbml0c05hbWUsIE9wZXJhdG9yLCBSYWRpdXNVbml0cyB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudHlwZXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4vYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgTm92b1NlbGVjdEVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3NlbGVjdCc7XG5cbi8qKlxuICogSGFuZGxlIHNlbGVjdGlvbiBvZiBmaWVsZCB2YWx1ZXMgd2hlbiBhIGxpc3Qgb2Ygb3B0aW9ucyBpcyBwcm92aWRlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZGRyZXNzLWNvbmRpdGlvbi1kZWYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbm92b0NvbmRpdGlvbkZpZWxkRGVmPlxuICAgICAgPG5vdm8tZmllbGQgKm5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWY9XCJsZXQgZm9ybUdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMub3BlcmF0b3JcIiBmb3JtQ29udHJvbE5hbWU9XCJvcGVyYXRvclwiIChvblNlbGVjdCk9XCJvbk9wZXJhdG9yU2VsZWN0KGZvcm1Hcm91cClcIj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpbmNsdWRlQW55XCI+e3sgbGFiZWxzLmluY2x1ZGVBbnkgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImV4Y2x1ZGVBbnlcIj57eyBsYWJlbHMuZXhjbHVkZSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwicmFkaXVzXCIgKm5nSWY9XCJyYWRpdXNFbmFibGVkKClcIj57eyBsYWJlbHMucmFkaXVzIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgIDwvbm92by1maWVsZD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5vdm9Db25kaXRpb25JbnB1dERlZj1cImxldCBmb3JtR3JvdXA7IHZpZXdJbmRleCBhcyB2aWV3SW5kZXg7IGZpZWxkTWV0YSBhcyBtZXRhXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPG5vdm8tZmxleCBqdXN0aWZ5PVwic3BhY2UtYmV0d2VlblwiIGFsaWduPVwiZW5kXCI+XG4gICAgICAgICAgPG5vdm8tZmllbGQgI25vdm9SYWRpdXNGaWVsZCAqbmdJZj1cImZvcm1Hcm91cC52YWx1ZS5vcGVyYXRvciA9PT0gJ3JhZGl1cydcIiBjbGFzcz1cImFkZHJlc3MtcmFkaXVzXCI+XG4gICAgICAgICAgICA8bm92by1zZWxlY3RcbiAgICAgICAgICAgICAgI3JhZGl1c1NlbGVjdCBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnJhZGl1c1wiXG4gICAgICAgICAgICAgIChvblNlbGVjdCk9XCJvblJhZGl1c1NlbGVjdChmb3JtR3JvdXAsICRldmVudC5zZWxlY3RlZClcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwicmFkaXVzKClcIlxuICAgICAgICAgICAgICBbb3B0aW9uc109XCJyYWRpdXNPcHRpb25zKClcIj5cbiAgICAgICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICAgIDxub3ZvLWZpZWxkICNub3ZvRmllbGQgY2xhc3M9XCJhZGRyZXNzLWxvY2F0aW9uXCI+XG4gICAgICAgICAgICA8bm92by1jaGlwLWxpc3QgWyhuZ01vZGVsKV09XCJjaGlwTGlzdE1vZGVsXCIgW25nTW9kZWxPcHRpb25zXT1cInsgc3RhbmRhbG9uZTogdHJ1ZSB9XCIgKGNsaWNrKT1cIm9wZW5QbGFjZXNMaXN0KHZpZXdJbmRleClcIj5cbiAgICAgICAgICAgICAgPG5vdm8tY2hpcCAqbmdGb3I9XCJsZXQgaXRlbSBvZiBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnZhbHVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlKGl0ZW0sIGZvcm1Hcm91cCwgdmlld0luZGV4KVwiPlxuICAgICAgICAgICAgICAgIDxub3ZvLXRleHQgZWxsaXBzaXM+e3sgaXRlbS5mb3JtYXR0ZWRfYWRkcmVzcyB9fTwvbm92by10ZXh0PlxuICAgICAgICAgICAgICAgIDxub3ZvLWljb24gbm92b0NoaXBSZW1vdmU+Y2xvc2U8L25vdm8taWNvbj5cbiAgICAgICAgICAgICAgPC9ub3ZvLWNoaXA+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIG5vdm9DaGlwSW5wdXRcbiAgICAgICAgICAgICAgICBbaWRdPVwidmlld0luZGV4XCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLmxvY2F0aW9uXCJcbiAgICAgICAgICAgICAgICAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQsIHZpZXdJbmRleClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQsIHZpZXdJbmRleClcIlxuICAgICAgICAgICAgICAgIFtwaWNrZXJdPVwicGxhY2VzUGlja2VyXCJcbiAgICAgICAgICAgICAgICAjYWRkcmVzc0lucHV0Lz5cbiAgICAgICAgICAgIDwvbm92by1jaGlwLWxpc3Q+XG4gICAgICAgICAgICA8bm92by1waWNrZXItdG9nZ2xlIFtvdmVybGF5SWRdPVwidmlld0luZGV4XCIgaWNvbj1cImxvY2F0aW9uXCIgbm92b1N1ZmZpeD5cbiAgICAgICAgICAgICAgPGdvb2dsZS1wbGFjZXMtbGlzdFxuICAgICAgICAgICAgICAgIFt0ZXJtXT1cInRlcm1cIlxuICAgICAgICAgICAgICAgIChzZWxlY3QpPVwic2VsZWN0UGxhY2UoJGV2ZW50LCBmb3JtR3JvdXAsIHZpZXdJbmRleClcIlxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAjcGxhY2VzUGlja2VyLz5cbiAgICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPC9ub3ZvLWZsZXg+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdEFkZHJlc3NDb25kaXRpb25EZWYgZXh0ZW5kcyBBYnN0cmFjdENvbmRpdGlvbkZpZWxkRGVmIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCkgb3ZlcmxheUNoaWxkcmVuOiBRdWVyeUxpc3Q8Tm92b1BpY2tlclRvZ2dsZUVsZW1lbnQ+O1xuICBAVmlld0NoaWxkcmVuKCdhZGRyZXNzSW5wdXQnKSBpbnB1dENoaWxkcmVuOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIEBWaWV3Q2hpbGQoJ3BsYWNlc1BpY2tlcicpIHBsYWNlc1BpY2tlcjogUGxhY2VzTGlzdENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvU2VsZWN0RWxlbWVudCkgYWRkcmVzc1NpZGVUZXN0OiBhbnk7XG5cbiAgLy8gU3RhdGljIGRlZmF1bHRzXG4gIHJhZGl1c1ZhbHVlczogbnVtYmVyW10gPSBbNSwgMTAsIDIwLCAzMCwgNDAsIDUwLCAxMDBdO1xuICBkZWZhdWx0UmFkaXVzOiBudW1iZXIgPSAzMDtcblxuICAvLyBPdmVycmlkYWJsZSBkZWZhdWx0c1xuICBkZWZhdWx0czogQWRkcmVzc0NyaXRlcmlhQ29uZmlnID0ge1xuICAgIHJhZGl1c0VuYWJsZWQ6IGZhbHNlLFxuICAgIHJhZGl1c1VuaXRzOiAnbWlsZXMnLFxuICB9O1xuICBjb25maWc6IElucHV0U2lnbmFsPEFkZHJlc3NDcml0ZXJpYUNvbmZpZz4gPSBpbnB1dCgpO1xuICByYWRpdXNVbml0czogU2lnbmFsPEFkZHJlc3NSYWRpdXNVbml0c05hbWU+ID0gY29tcHV0ZWQoKCkgPT5cbiAgICB0aGlzLmNvbmZpZygpPy5yYWRpdXNVbml0cyB8fCB0aGlzLmRlZmF1bHRzLnJhZGl1c1VuaXRzXG4gICk7XG4gIHJhZGl1c0VuYWJsZWQ6IFNpZ25hbDxib29sZWFuPiA9IGNvbXB1dGVkKCgpID0+XG4gICAgdGhpcy5jb25maWcoKT8ucmFkaXVzRW5hYmxlZCB8fCB0aGlzLmRlZmF1bHRzLnJhZGl1c0VuYWJsZWRcbiAgKTtcblxuICByYWRpdXM6IFdyaXRhYmxlU2lnbmFsPG51bWJlcj4gPSBzaWduYWwodGhpcy5kZWZhdWx0UmFkaXVzKTtcbiAgcmFkaXVzT3B0aW9uczogU2lnbmFsPHsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IG51bWJlcjsgfVtdPiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB1bml0c0xhYmVsID0gdGhpcy5yYWRpdXNVbml0cygpID09PSBSYWRpdXNVbml0cy5taWxlcyA/IHRoaXMubGFiZWxzLm1pbGVzIDogdGhpcy5sYWJlbHMua207XG4gICAgcmV0dXJuIHRoaXMucmFkaXVzVmFsdWVzLm1hcCh2YWx1ZSA9PiAoe1xuICAgICAgbGFiZWw6IGAke3ZhbHVlLnRvU3RyaW5nKCl9ICR7dW5pdHNMYWJlbH1gLFxuICAgICAgdmFsdWUsXG4gICAgfSkpO1xuICB9KTtcblxuICBkZWZhdWx0T3BlcmF0b3IgPSBPcGVyYXRvci5pbmNsdWRlQW55O1xuICBjaGlwTGlzdE1vZGVsOiBhbnkgPSAnJztcbiAgdGVybTogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBfYWRkcmVzc0NoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwdWJsaWMgZWxlbWVudCA9IGluamVjdChFbGVtZW50UmVmKTtcblxuICBjb25zdHJ1Y3RvcihsYWJlbFNlcnZpY2U6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihsYWJlbFNlcnZpY2UpO1xuICAgIHRoaXMuZGVmaW5lT3BlcmF0b3JFZGl0R3JvdXAoT3BlcmF0b3IuaW5jbHVkZUFueSwgT3BlcmF0b3IuZXhjbHVkZUFueSwgT3BlcmF0b3IucmFkaXVzKTtcbiAgfVxuXG4gIGZyYW1lQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5mcmFtZUFmdGVyVmlld0luaXQoKTtcbiAgICAvLyBJbml0aWFsaXplIHRoZSByYWRpdXMgdmFsdWUgZnJvbSBleGlzdGluZyBkYXRhXG4gICAgdGhpcy5hc3NpZ25SYWRpdXNGcm9tVmFsdWUoKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgcmFkaXVzIG9uIGFkZHJlc3MgdmFsdWUgY2hhbmdlc1xuICAgIHRoaXMuX2FkZHJlc3NDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5pbnB1dENoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuYXNzaWduUmFkaXVzRnJvbVZhbHVlKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9hZGRyZXNzQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25LZXl1cChldmVudCwgdmlld0luZGV4KSB7XG4gICAgaWYgKCFbS2V5LkVzY2FwZSwgS2V5LkVudGVyXS5pbmNsdWRlcyhldmVudC5rZXkpKSB7XG4gICAgICB0aGlzLm9wZW5QbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gICAgfVxuICAgIHRoaXMudGVybSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIG9uS2V5ZG93bihldmVudCwgdmlld0luZGV4KSB7XG4gICAgaWYgKCF0aGlzLnBsYWNlc1BpY2tlci5kcm9wZG93bk9wZW4pIHtcbiAgICAgIHRoaXMub3BlblBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgICAgIHRoaXMucGxhY2VzUGlja2VyLmRyb3Bkb3duT3BlbiA9IHRydWU7XG4gICAgfVxuICAgIGlmIChbS2V5LkVzY2FwZSwgS2V5LlRhYl0uaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgICAgdGhpcy5jbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wbGFjZXNQaWNrZXIub25LZXlEb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZShmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IEFkZHJlc3NEYXRhW10ge1xuICAgIHJldHVybiBmb3JtR3JvdXAudmFsdWUudmFsdWUgfHwgW107XG4gIH1cblxuICBnZXRDdXJyZW50T3ZlcmxheSh2aWV3SW5kZXg6IHN0cmluZyk6IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5Q2hpbGRyZW4/LmZpbmQoaXRlbSA9PiBpdGVtLm92ZXJsYXlJZCA9PT0gdmlld0luZGV4KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRJbnB1dCh2aWV3SW5kZXg6IHN0cmluZyk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLmlucHV0Q2hpbGRyZW4/LmZpbmQoaXRlbSA9PiAoaXRlbSBhcyBhbnkpLm5hdGl2ZUVsZW1lbnQuaWQgPT09IHZpZXdJbmRleCk7XG4gIH1cblxuICBvcGVuUGxhY2VzTGlzdCh2aWV3SW5kZXgpIHtcbiAgICB0aGlzLmdldEN1cnJlbnRPdmVybGF5KHZpZXdJbmRleCk/Lm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCkge1xuICAgIHRoaXMuZ2V0Q3VycmVudE92ZXJsYXkodmlld0luZGV4KT8uY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgc2VsZWN0UGxhY2UoZXZlbnQ6IGFueSwgZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHZpZXdJbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVUb0FkZDogQWRkcmVzc0RhdGEgPSB7XG4gICAgICBhZGRyZXNzX2NvbXBvbmVudHM6IGV2ZW50LmFkZHJlc3NfY29tcG9uZW50cyxcbiAgICAgIGZvcm1hdHRlZF9hZGRyZXNzOiBldmVudC5mb3JtYXR0ZWRfYWRkcmVzcyxcbiAgICAgIGdlb21ldHJ5OiBldmVudC5nZW9tZXRyeSxcbiAgICAgIHBsYWNlX2lkOiBldmVudC5wbGFjZV9pZCxcbiAgICB9O1xuICAgIGNvbnN0IGN1cnJlbnQ6IEFkZHJlc3NEYXRhIHwgQWRkcmVzc0RhdGFbXSA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBjb25zdCB1cGRhdGVkOiBBZGRyZXNzRGF0YVtdID0gQXJyYXkuaXNBcnJheShjdXJyZW50KSA/IFsuLi5jdXJyZW50LCB2YWx1ZVRvQWRkXSA6IFt2YWx1ZVRvQWRkXTtcbiAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKHRoaXMudXBkYXRlUmFkaXVzSW5WYWx1ZXMoZm9ybUdyb3VwLCB1cGRhdGVkKSk7XG5cbiAgICB0aGlzLmlucHV0Q2hpbGRyZW4uZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfSlcbiAgICB0aGlzLmdldEN1cnJlbnRJbnB1dCh2aWV3SW5kZXgpPy5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy5jbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgfVxuXG4gIHJlbW92ZSh2YWx1ZVRvUmVtb3ZlOiBBZGRyZXNzRGF0YSwgZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHZpZXdJbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKTtcbiAgICBjb25zdCBpbmRleCA9IGN1cnJlbnQuaW5kZXhPZih2YWx1ZVRvUmVtb3ZlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBbLi4uY3VycmVudF1cbiAgICAgIG9sZFZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKG9sZFZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZVBsYWNlc0xpc3Qodmlld0luZGV4KTtcbiAgfVxuXG4gIC8vIE92ZXJyaWRlIGFic3RyYWN0IGJlaGF2aW9yIC0gYWxsb3cgbW92aW5nIGxvY2F0aW9uIGZyb20gaW5jbHVkZUFueSB0byByYWRpdXMsIGJ1dCB3aGVuIG1vdmluZyB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uLFxuICAvLyB0cmltIG91dCByYWRpdXMgaW5mb3JtYXRpb24gZnJvbSB0aGUgdmFsdWVcbiAgb25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2aW91c09wZXJhdG9yID0gdGhpcy5fcHJldmlvdXNPcGVyYXRvclZhbHVlO1xuICAgIHN1cGVyLm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKTtcbiAgICBpZiAoW3ByZXZpb3VzT3BlcmF0b3IsIGZvcm1Hcm91cC5nZXQoJ29wZXJhdG9yJykuZ2V0UmF3VmFsdWUoKV0uaW5kZXhPZihPcGVyYXRvci5yYWRpdXMpICE9PSAtMSAmJlxuICAgICAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLmdldFJhd1ZhbHVlKCkgIT0gbnVsbCkge1xuICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZSh0aGlzLnVwZGF0ZVJhZGl1c0luVmFsdWVzKGZvcm1Hcm91cCwgdGhpcy5nZXRWYWx1ZShmb3JtR3JvdXApKSk7XG4gICAgfVxuICB9XG5cbiAgb25SYWRpdXNTZWxlY3QoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHJhZGl1czogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yYWRpdXMuc2V0KHJhZGl1cyk7XG4gICAgLy8gV2UgbXVzdCBkaXJ0eSB0aGUgZm9ybSBleHBsaWNpdGx5IHRvIHNob3cgdXAgYXMgYSB1c2VyIG1vZGlmaWNhdGlvbiB3aGVuIGl0IHdhcyBkb25lIHByb2dyYW1tYXRpY2FsbHlcbiAgICBmb3JtR3JvdXAuZ2V0KCd2YWx1ZScpLnNldFZhbHVlKHRoaXMudXBkYXRlUmFkaXVzSW5WYWx1ZXMoZm9ybUdyb3VwLCB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCkpKTtcbiAgICBmb3JtR3JvdXAubWFya0FzRGlydHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXNzaWduUmFkaXVzRnJvbVZhbHVlKCkge1xuICAgIGlmICh0aGlzLnBsYWNlc1BpY2tlcj8ubW9kZWw/Lmxlbmd0aCkge1xuICAgICAgY29uc3QgYWRkcmVzc0RhdGE6IEFkZHJlc3NEYXRhID0gdGhpcy5wbGFjZXNQaWNrZXIubW9kZWxbMF07XG4gICAgICBjb25zdCBpbml0aWFsUmFkaXVzID0gYWRkcmVzc0RhdGEucmFkaXVzPy52YWx1ZTtcbiAgICAgIGlmIChpbml0aWFsUmFkaXVzICYmIEhlbHBlcnMuaXNOdW1iZXIoaW5pdGlhbFJhZGl1cykpIHtcbiAgICAgICAgdGhpcy5yYWRpdXMuc2V0KGluaXRpYWxSYWRpdXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUmFkaXVzSW5WYWx1ZXMoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wsIHZhbHVlczogQWRkcmVzc0RhdGFbXSk6IEFkZHJlc3NEYXRhW10ge1xuICAgIHJldHVybiB2YWx1ZXMubWFwKHZhbCA9PiAoe1xuICAgICAgLi4udmFsLFxuICAgICAgcmFkaXVzOiB0aGlzLmlzUmFkaXVzT3BlcmF0b3JTZWxlY3RlZChmb3JtR3JvdXApID8gdGhpcy5nZXRSYWRpdXNEYXRhKGZvcm1Hcm91cCkgOiB1bmRlZmluZWQsXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSYWRpdXNEYXRhKGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogQWRkcmVzc1JhZGl1cyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB0aGlzLmdldFJhZGl1cyhmb3JtR3JvdXApLFxuICAgICAgdW5pdHM6IHRoaXMucmFkaXVzVW5pdHMoKSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSYWRpdXMoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmlzUmFkaXVzT3BlcmF0b3JTZWxlY3RlZChmb3JtR3JvdXApID8gdGhpcy5yYWRpdXMoKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgaXNSYWRpdXNPcGVyYXRvclNlbGVjdGVkKGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZvcm1Hcm91cC5nZXQoJ29wZXJhdG9yJykudmFsdWUgPT09ICdyYWRpdXMnO1xuICB9XG59XG4iXX0=