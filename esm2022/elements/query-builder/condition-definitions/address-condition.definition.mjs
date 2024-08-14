import { ChangeDetectionStrategy, Component, computed, ElementRef, input, QueryList, signal, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { PlacesListComponent } from 'novo-elements/elements/places';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { Subscription } from 'rxjs';
import { Operator, RadiusUnits } from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
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
    constructor(element, labels) {
        super(labels);
        this.element = element;
        this.labels = labels;
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
    }
    ngAfterViewInit() {
        setTimeout(() => {
            // Initialize the radius value from existing data
            this.assignRadiusFromValue();
            // Update the radius on address value changes
            this._addressChangesSubscription = this.inputChildren.changes.subscribe(() => {
                this.assignRadiusFromValue();
            });
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultAddressConditionDef, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "17.2.3", type: NovoDefaultAddressConditionDef, selector: "novo-address-condition-def", inputs: { config: { classPropertyName: "config", publicName: "config", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "placesPicker", first: true, predicate: ["placesPicker"], descendants: true }, { propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }, { propertyName: "inputChildren", predicate: ["addressInput"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb25kaXRpb24uZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvY29uZGl0aW9uLWRlZmluaXRpb25zL2FkZHJlc3MtY29uZGl0aW9uLmRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsUUFBUSxFQUNSLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxFQUVULE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFPLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQTZFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxSSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUU1RTs7R0FFRztBQW9ESCxNQUFNLE9BQU8sOEJBQStCLFNBQVEseUJBQXlCO0lBcUMzRSxZQUFtQixPQUFtQixFQUFTLE1BQXdCO1FBQ3JFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQURHLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQWhDdkUsa0JBQWtCO1FBQ2xCLGlCQUFZLEdBQWEsQ0FBQyxDQUFDLEVBQUUs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LEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtTQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVPLFNBQVMsQ0FBQyxTQUEwQjtRQUMxQyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDOUUsQ0FBQztJQUVPLHdCQUF3QixDQUFDLFNBQTBCO1FBQ3pELE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDO0lBQ3RELENBQUM7OEdBbEtVLDhCQUE4QjtrR0FBOUIsOEJBQThCLDRVQUMzQix1QkFBdUIsMEpBbEQzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNUOzsyRkFJVSw4QkFBOEI7a0JBbkQxQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQ7OEdBRXdDLGVBQWU7c0JBQXJELFlBQVk7dUJBQUMsdUJBQXVCO2dCQUNQLGFBQWE7c0JBQTFDLFlBQVk7dUJBQUMsY0FBYztnQkFDRCxZQUFZO3NCQUF0QyxTQUFTO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBjb21wdXRlZCxcbiAgRWxlbWVudFJlZixcbiAgaW5wdXQsXG4gIElucHV0U2lnbmFsLFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgU2lnbmFsLFxuICBzaWduYWwsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgV3JpdGFibGVTaWduYWxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZmllbGQnO1xuaW1wb3J0IHsgUGxhY2VzTGlzdENvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcGxhY2VzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEhlbHBlcnMsIEtleSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBZGRyZXNzQ3JpdGVyaWFDb25maWcsIEFkZHJlc3NEYXRhLCBBZGRyZXNzUmFkaXVzLCBBZGRyZXNzUmFkaXVzVW5pdHNOYW1lLCBPcGVyYXRvciwgUmFkaXVzVW5pdHMgfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnR5cGVzJztcbmltcG9ydCB7IEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL2Fic3RyYWN0LWNvbmRpdGlvbi5kZWZpbml0aW9uJztcblxuLyoqXG4gKiBIYW5kbGUgc2VsZWN0aW9uIG9mIGZpZWxkIHZhbHVlcyB3aGVuIGEgbGlzdCBvZiBvcHRpb25zIGlzIHByb3ZpZGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFkZHJlc3MtY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY+XG4gICAgICA8bm92by1maWVsZCAqbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5vcGVyYXRvclwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCIgKG9uU2VsZWN0KT1cIm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKVwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImluY2x1ZGVBbnlcIj57eyBsYWJlbHMuaW5jbHVkZUFueSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPG5vdm8tb3B0aW9uIHZhbHVlPVwiZXhjbHVkZUFueVwiPnt7IGxhYmVscy5leGNsdWRlIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJyYWRpdXNcIiAqbmdJZj1cInJhZGl1c0VuYWJsZWQoKVwiPnt7IGxhYmVscy5yYWRpdXMgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICA8L25vdm8tc2VsZWN0PlxuICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbm92b0NvbmRpdGlvbklucHV0RGVmPVwibGV0IGZvcm1Hcm91cDsgdmlld0luZGV4IGFzIHZpZXdJbmRleDsgZmllbGRNZXRhIGFzIG1ldGFcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1mbGV4IGp1c3RpZnk9XCJzcGFjZS1iZXR3ZWVuXCIgYWxpZ249XCJlbmRcIj5cbiAgICAgICAgICA8bm92by1maWVsZCAjbm92b1JhZGl1c0ZpZWxkICpuZ0lmPVwiZm9ybUdyb3VwLnZhbHVlLm9wZXJhdG9yID09PSAncmFkaXVzJ1wiIGNsYXNzPVwiYWRkcmVzcy1yYWRpdXNcIj5cbiAgICAgICAgICAgIDxub3ZvLXNlbGVjdFxuICAgICAgICAgICAgICAjcmFkaXVzU2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMucmFkaXVzXCJcbiAgICAgICAgICAgICAgKG9uU2VsZWN0KT1cIm9uUmFkaXVzU2VsZWN0KGZvcm1Hcm91cCwgJGV2ZW50LnNlbGVjdGVkKVwiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJyYWRpdXMoKVwiXG4gICAgICAgICAgICAgIFtvcHRpb25zXT1cInJhZGl1c09wdGlvbnMoKVwiPlxuICAgICAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgICAgPG5vdm8tZmllbGQgI25vdm9GaWVsZCBjbGFzcz1cImFkZHJlc3MtbG9jYXRpb25cIj5cbiAgICAgICAgICAgIDxub3ZvLWNoaXAtbGlzdCBbKG5nTW9kZWwpXT1cImNoaXBMaXN0TW9kZWxcIiBbbmdNb2RlbE9wdGlvbnNdPVwieyBzdGFuZGFsb25lOiB0cnVlIH1cIiAoY2xpY2spPVwib3BlblBsYWNlc0xpc3Qodmlld0luZGV4KVwiPlxuICAgICAgICAgICAgICA8bm92by1jaGlwICpuZ0Zvcj1cImxldCBpdGVtIG9mIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykudmFsdWVcIiAocmVtb3ZlZCk9XCJyZW1vdmUoaXRlbSwgZm9ybUdyb3VwLCB2aWV3SW5kZXgpXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tdGV4dCBlbGxpcHNpcz57eyBpdGVtLmZvcm1hdHRlZF9hZGRyZXNzIH19PC9ub3ZvLXRleHQ+XG4gICAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT5jbG9zZTwvbm92by1pY29uPlxuICAgICAgICAgICAgICA8L25vdm8tY2hpcD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgbm92b0NoaXBJbnB1dFxuICAgICAgICAgICAgICAgIFtpZF09XCJ2aWV3SW5kZXhcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJsYWJlbHMubG9jYXRpb25cIlxuICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbktleXVwKCRldmVudCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgICAgW3BpY2tlcl09XCJwbGFjZXNQaWNrZXJcIlxuICAgICAgICAgICAgICAgICNhZGRyZXNzSW5wdXQvPlxuICAgICAgICAgICAgPC9ub3ZvLWNoaXAtbGlzdD5cbiAgICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBpY29uPVwibG9jYXRpb25cIiBub3ZvU3VmZml4PlxuICAgICAgICAgICAgICA8Z29vZ2xlLXBsYWNlcy1saXN0XG4gICAgICAgICAgICAgICAgW3Rlcm1dPVwidGVybVwiXG4gICAgICAgICAgICAgICAgKHNlbGVjdCk9XCJzZWxlY3RQbGFjZSgkZXZlbnQsIGZvcm1Hcm91cCwgdmlld0luZGV4KVwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICNwbGFjZXNQaWNrZXIvPlxuICAgICAgICAgICAgPC9ub3ZvLXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8L25vdm8tZmxleD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EZWZhdWx0QWRkcmVzc0NvbmRpdGlvbkRlZiBleHRlbmRzIEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkcmVuKE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50KSBvdmVybGF5Q2hpbGRyZW46IFF1ZXJ5TGlzdDxOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudD47XG4gIEBWaWV3Q2hpbGRyZW4oJ2FkZHJlc3NJbnB1dCcpIGlucHV0Q2hpbGRyZW46IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgQFZpZXdDaGlsZCgncGxhY2VzUGlja2VyJykgcGxhY2VzUGlja2VyOiBQbGFjZXNMaXN0Q29tcG9uZW50O1xuXG4gIC8vIFN0YXRpYyBkZWZhdWx0c1xuICByYWRpdXNWYWx1ZXM6IG51bWJlcltdID0gWzUsIDEwLCAyMCwgMzAsIDQwLCA1MCwgMTAwXTtcbiAgZGVmYXVsdFJhZGl1czogbnVtYmVyID0gMzA7XG5cbiAgLy8gT3ZlcnJpZGFibGUgZGVmYXVsdHNcbiAgZGVmYXVsdHM6IEFkZHJlc3NDcml0ZXJpYUNvbmZpZyA9IHtcbiAgICByYWRpdXNFbmFibGVkOiBmYWxzZSxcbiAgICByYWRpdXNVbml0czogJ21pbGVzJyxcbiAgfTtcbiAgY29uZmlnOiBJbnB1dFNpZ25hbDxBZGRyZXNzQ3JpdGVyaWFDb25maWc+ID0gaW5wdXQoKTtcbiAgcmFkaXVzVW5pdHM6IFNpZ25hbDxBZGRyZXNzUmFkaXVzVW5pdHNOYW1lPiA9IGNvbXB1dGVkKCgpID0+XG4gICAgdGhpcy5jb25maWcoKT8ucmFkaXVzVW5pdHMgfHwgdGhpcy5kZWZhdWx0cy5yYWRpdXNVbml0c1xuICApO1xuICByYWRpdXNFbmFibGVkOiBTaWduYWw8Ym9vbGVhbj4gPSBjb21wdXRlZCgoKSA9PlxuICAgIHRoaXMuY29uZmlnKCk/LnJhZGl1c0VuYWJsZWQgfHwgdGhpcy5kZWZhdWx0cy5yYWRpdXNFbmFibGVkXG4gICk7XG5cbiAgcmFkaXVzOiBXcml0YWJsZVNpZ25hbDxudW1iZXI+ID0gc2lnbmFsKHRoaXMuZGVmYXVsdFJhZGl1cyk7XG4gIHJhZGl1c09wdGlvbnM6IFNpZ25hbDx7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBudW1iZXI7IH1bXT4gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgdW5pdHNMYWJlbCA9IHRoaXMucmFkaXVzVW5pdHMoKSA9PT0gUmFkaXVzVW5pdHMubWlsZXMgPyB0aGlzLmxhYmVscy5taWxlcyA6IHRoaXMubGFiZWxzLmttO1xuICAgIHJldHVybiB0aGlzLnJhZGl1c1ZhbHVlcy5tYXAodmFsdWUgPT4gKHtcbiAgICAgIGxhYmVsOiBgJHt2YWx1ZS50b1N0cmluZygpfSAke3VuaXRzTGFiZWx9YCxcbiAgICAgIHZhbHVlLFxuICAgIH0pKTtcbiAgfSk7XG5cbiAgZGVmYXVsdE9wZXJhdG9yID0gT3BlcmF0b3IuaW5jbHVkZUFueTtcbiAgY2hpcExpc3RNb2RlbDogYW55ID0gJyc7XG4gIHRlcm06IHN0cmluZyA9ICcnO1xuXG4gIHByaXZhdGUgX2FkZHJlc3NDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihsYWJlbHMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcmFkaXVzIHZhbHVlIGZyb20gZXhpc3RpbmcgZGF0YVxuICAgICAgdGhpcy5hc3NpZ25SYWRpdXNGcm9tVmFsdWUoKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSByYWRpdXMgb24gYWRkcmVzcyB2YWx1ZSBjaGFuZ2VzXG4gICAgICB0aGlzLl9hZGRyZXNzQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuaW5wdXRDaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXNzaWduUmFkaXVzRnJvbVZhbHVlKCk7XG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fYWRkcmVzc0NoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG9uS2V5dXAoZXZlbnQsIHZpZXdJbmRleCkge1xuICAgIGlmICghW0tleS5Fc2NhcGUsIEtleS5FbnRlcl0uaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgICAgdGhpcy5vcGVuUGxhY2VzTGlzdCh2aWV3SW5kZXgpO1xuICAgIH1cbiAgICB0aGlzLnRlcm0gPSBldmVudC50YXJnZXQudmFsdWU7XG4gIH1cblxuICBvbktleWRvd24oZXZlbnQsIHZpZXdJbmRleCkge1xuICAgIGlmICghdGhpcy5wbGFjZXNQaWNrZXIuZHJvcGRvd25PcGVuKSB7XG4gICAgICB0aGlzLm9wZW5QbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gICAgICB0aGlzLnBsYWNlc1BpY2tlci5kcm9wZG93bk9wZW4gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoW0tleS5Fc2NhcGUsIEtleS5UYWJdLmluY2x1ZGVzKGV2ZW50LmtleSkpIHtcbiAgICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGxhY2VzUGlja2VyLm9uS2V5RG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWUoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBBZGRyZXNzRGF0YVtdIHtcbiAgICByZXR1cm4gZm9ybUdyb3VwLnZhbHVlLnZhbHVlIHx8IFtdO1xuICB9XG5cbiAgZ2V0Q3VycmVudE92ZXJsYXkodmlld0luZGV4OiBzdHJpbmcpOiBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheUNoaWxkcmVuPy5maW5kKGl0ZW0gPT4gaXRlbS5vdmVybGF5SWQgPT09IHZpZXdJbmRleCk7XG4gIH1cblxuICBnZXRDdXJyZW50SW5wdXQodmlld0luZGV4OiBzdHJpbmcpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dENoaWxkcmVuPy5maW5kKGl0ZW0gPT4gKGl0ZW0gYXMgYW55KS5uYXRpdmVFbGVtZW50LmlkID09PSB2aWV3SW5kZXgpO1xuICB9XG5cbiAgb3BlblBsYWNlc0xpc3Qodmlld0luZGV4KSB7XG4gICAgdGhpcy5nZXRDdXJyZW50T3ZlcmxheSh2aWV3SW5kZXgpPy5vcGVuUGFuZWwoKTtcbiAgfVxuXG4gIGNsb3NlUGxhY2VzTGlzdCh2aWV3SW5kZXgpIHtcbiAgICB0aGlzLmdldEN1cnJlbnRPdmVybGF5KHZpZXdJbmRleCk/LmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIHNlbGVjdFBsYWNlKGV2ZW50OiBhbnksIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sLCB2aWV3SW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlVG9BZGQ6IEFkZHJlc3NEYXRhID0ge1xuICAgICAgYWRkcmVzc19jb21wb25lbnRzOiBldmVudC5hZGRyZXNzX2NvbXBvbmVudHMsXG4gICAgICBmb3JtYXR0ZWRfYWRkcmVzczogZXZlbnQuZm9ybWF0dGVkX2FkZHJlc3MsXG4gICAgICBnZW9tZXRyeTogZXZlbnQuZ2VvbWV0cnksXG4gICAgICBwbGFjZV9pZDogZXZlbnQucGxhY2VfaWQsXG4gICAgfTtcbiAgICBjb25zdCBjdXJyZW50OiBBZGRyZXNzRGF0YSB8IEFkZHJlc3NEYXRhW10gPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgY29uc3QgdXBkYXRlZDogQWRkcmVzc0RhdGFbXSA9IEFycmF5LmlzQXJyYXkoY3VycmVudCkgPyBbLi4uY3VycmVudCwgdmFsdWVUb0FkZF0gOiBbdmFsdWVUb0FkZF07XG4gICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZSh0aGlzLnVwZGF0ZVJhZGl1c0luVmFsdWVzKGZvcm1Hcm91cCwgdXBkYXRlZCkpO1xuXG4gICAgdGhpcy5pbnB1dENoaWxkcmVuLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH0pXG4gICAgdGhpcy5nZXRDdXJyZW50SW5wdXQodmlld0luZGV4KT8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gIH1cblxuICByZW1vdmUodmFsdWVUb1JlbW92ZTogQWRkcmVzc0RhdGEsIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sLCB2aWV3SW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmdldFZhbHVlKGZvcm1Hcm91cCk7XG4gICAgY29uc3QgaW5kZXggPSBjdXJyZW50LmluZGV4T2YodmFsdWVUb1JlbW92ZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gWy4uLmN1cnJlbnRdXG4gICAgICBvbGRWYWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZm9ybUdyb3VwLmdldCgndmFsdWUnKS5zZXRWYWx1ZShvbGRWYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VQbGFjZXNMaXN0KHZpZXdJbmRleCk7XG4gIH1cblxuICBvblJhZGl1c1NlbGVjdChmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCwgcmFkaXVzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJhZGl1cy5zZXQocmFkaXVzKTtcbiAgICAvLyBXZSBtdXN0IGRpcnR5IHRoZSBmb3JtIGV4cGxpY2l0bHkgdG8gc2hvdyB1cCBhcyBhIHVzZXIgbW9kaWZpY2F0aW9uIHdoZW4gaXQgd2FzIGRvbmUgcHJvZ3JhbW1hdGljYWxseVxuICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUodGhpcy51cGRhdGVSYWRpdXNJblZhbHVlcyhmb3JtR3JvdXAsIHRoaXMuZ2V0VmFsdWUoZm9ybUdyb3VwKSkpO1xuICAgIGZvcm1Hcm91cC5tYXJrQXNEaXJ0eSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3NpZ25SYWRpdXNGcm9tVmFsdWUoKSB7XG4gICAgaWYgKHRoaXMucGxhY2VzUGlja2VyPy5tb2RlbD8ubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhZGRyZXNzRGF0YTogQWRkcmVzc0RhdGEgPSB0aGlzLnBsYWNlc1BpY2tlci5tb2RlbFswXTtcbiAgICAgIGNvbnN0IGluaXRpYWxSYWRpdXMgPSBhZGRyZXNzRGF0YS5yYWRpdXM/LnZhbHVlO1xuICAgICAgaWYgKGluaXRpYWxSYWRpdXMgJiYgSGVscGVycy5pc051bWJlcihpbml0aWFsUmFkaXVzKSkge1xuICAgICAgICB0aGlzLnJhZGl1cy5zZXQoaW5pdGlhbFJhZGl1cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSYWRpdXNJblZhbHVlcyhmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCwgdmFsdWVzOiBBZGRyZXNzRGF0YVtdKTogQWRkcmVzc0RhdGFbXSB7XG4gICAgcmV0dXJuIHZhbHVlcy5tYXAodmFsID0+ICh7XG4gICAgICAuLi52YWwsXG4gICAgICByYWRpdXM6IHRoaXMuaXNSYWRpdXNPcGVyYXRvclNlbGVjdGVkKGZvcm1Hcm91cCkgPyB0aGlzLmdldFJhZGl1c0RhdGEoZm9ybUdyb3VwKSA6IHVuZGVmaW5lZCxcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIGdldFJhZGl1c0RhdGEoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBBZGRyZXNzUmFkaXVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHRoaXMuZ2V0UmFkaXVzKGZvcm1Hcm91cCksXG4gICAgICB1bml0czogdGhpcy5yYWRpdXNVbml0cygpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldFJhZGl1cyhmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaXNSYWRpdXNPcGVyYXRvclNlbGVjdGVkKGZvcm1Hcm91cCkgPyB0aGlzLnJhZGl1cygpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1JhZGl1c09wZXJhdG9yU2VsZWN0ZWQoZm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2wpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZm9ybUdyb3VwLmdldCgnb3BlcmF0b3InKS52YWx1ZSA9PT0gJ3JhZGl1cyc7XG4gIH1cbn1cbiJdfQ==