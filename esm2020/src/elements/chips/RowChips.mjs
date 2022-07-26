// NG2
import { Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoChipElement } from './Chip';
import { NovoChipsElement } from './Chips';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../utils/component-utils/ComponentUtils";
import * as i3 from "../../services/novo-label-service";
import * as i4 from "../field/field";
import * as i5 from "../picker/Picker";
import * as i6 from "../field/input";
import * as i7 from "@angular/forms";
// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRowChipsElement),
    multi: true,
};
export class NovoRowChipElement extends NovoChipElement {
    onSelect(e) {
        return false;
    }
}
NovoRowChipElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRowChipElement, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoRowChipElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoRowChipElement, selector: "novo-row-chip", host: { attributes: { "role": "option" }, listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)", "focus": "focus()", "blur": "_blur()" }, properties: { "attr.tabindex": "disabled ? null : tabIndex", "class.novo-row-chip-selected": "selected", "class.novo-row-chip-with-trailing-icon": "removeIcon", "class.novo-row-chip-disabled": "disabled", "attr.disabled": "disabled || null", "attr.aria-disabled": "disabled.toString()", "attr.aria-selected": "ariaSelected" }, classAttribute: "novo-row-chip novo-focus-indicator" }, usesInheritance: true, ngImport: i0, template: `
    <div class="novo-row-chips-columns">
      <ng-content></ng-content>
      <i class="bhi-delete-o" *ngIf="!disabled" (click)="remove()"></i>
    </div>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRowChipElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-row-chip',
                    template: `
    <div class="novo-row-chips-columns">
      <ng-content></ng-content>
      <i class="bhi-delete-o" *ngIf="!disabled" (click)="remove()"></i>
    </div>
  `,
                    host: {
                        class: 'novo-row-chip novo-focus-indicator',
                        '[attr.tabindex]': 'disabled ? null : tabIndex',
                        role: 'option',
                        '[class.novo-row-chip-selected]': 'selected',
                        '[class.novo-row-chip-with-trailing-icon]': 'removeIcon',
                        '[class.novo-row-chip-disabled]': 'disabled',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-selected]': 'ariaSelected',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                    },
                }]
        }] });
export class NovoRowChipsElement extends NovoChipsElement {
    constructor(element, componentUtils, labels) {
        super(element, componentUtils, labels);
        this.closeOnSelect = true;
    }
    onKeyDown(event) {
        return;
    }
}
NovoRowChipsElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRowChipsElement, deps: [{ token: i0.ElementRef }, { token: i2.ComponentUtils }, { token: i3.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoRowChipsElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoRowChipsElement, selector: "novo-row-chips", inputs: { closeOnSelect: "closeOnSelect" }, host: { properties: { "class.with-value": "items.length > 0" } }, providers: [CHIPS_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: `
    <div class="novo-row-chips-columns" *ngIf="items.length > 0">
      <div class="column-label" [style.flexBasis.px]="column.width || 200" *ngFor="let column of source.columns">{{ column.label }}</div>
    </div>
    <div class="novo-row-chips-empty-message" *ngIf="source.emptyReadOnlyMessage && disablePickerInput && items.length === 0">
      {{ source.emptyReadOnlyMessage }}
    </div>
    <novo-row-chip
      *ngFor="let item of _items | async"
      [type]="type || item?.value?.searchEntity"
      [class.selected]="item == selected"
      [disabled]="disablePickerInput"
      (removed)="remove($event, item)"
      (selectionChange)="select($event, item)"
    >
      <div
        class="column-data"
        [class.editable]="column.editable"
        [style.flexBasis.px]="column.width || 200"
        *ngFor="let column of source.columns"
      >
        <ng-container *ngIf="column.editable">
          <novo-field>
            <input novoInput [type]="column.type || 'text'" [(ngModel)]="item.value[column.name]" />
          </novo-field>
        </ng-container>
        <ng-container *ngIf="!column.editable">
          <span>{{ column.data(item) }}</span>
        </ng-container>
      </div>
    </novo-row-chip>
    <novo-picker
      clearValueOnSelect="true"
      [closeOnSelect]="closeOnSelect"
      [config]="source"
      [disablePickerInput]="disablePickerInput"
      [hidden]="disablePickerInput"
      [placeholder]="placeholder"
      [(ngModel)]="itemToAdd"
      (select)="add($event)"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (typing)="onTyping($event)"
      (blur)="onTouched($event)"
      [selected]="items"
      *ngIf="!maxlength || (maxlength && items.length < maxlength)"
    >
    </novo-picker>
    <div class="preview-container">
      <span #preview></span>
    </div>
  `, isInline: true, components: [{ type: NovoRowChipElement, selector: "novo-row-chip" }, { type: i4.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i5.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRowChipsElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-row-chips',
                    providers: [CHIPS_VALUE_ACCESSOR],
                    host: {
                        '[class.with-value]': 'items.length > 0',
                    },
                    template: `
    <div class="novo-row-chips-columns" *ngIf="items.length > 0">
      <div class="column-label" [style.flexBasis.px]="column.width || 200" *ngFor="let column of source.columns">{{ column.label }}</div>
    </div>
    <div class="novo-row-chips-empty-message" *ngIf="source.emptyReadOnlyMessage && disablePickerInput && items.length === 0">
      {{ source.emptyReadOnlyMessage }}
    </div>
    <novo-row-chip
      *ngFor="let item of _items | async"
      [type]="type || item?.value?.searchEntity"
      [class.selected]="item == selected"
      [disabled]="disablePickerInput"
      (removed)="remove($event, item)"
      (selectionChange)="select($event, item)"
    >
      <div
        class="column-data"
        [class.editable]="column.editable"
        [style.flexBasis.px]="column.width || 200"
        *ngFor="let column of source.columns"
      >
        <ng-container *ngIf="column.editable">
          <novo-field>
            <input novoInput [type]="column.type || 'text'" [(ngModel)]="item.value[column.name]" />
          </novo-field>
        </ng-container>
        <ng-container *ngIf="!column.editable">
          <span>{{ column.data(item) }}</span>
        </ng-container>
      </div>
    </novo-row-chip>
    <novo-picker
      clearValueOnSelect="true"
      [closeOnSelect]="closeOnSelect"
      [config]="source"
      [disablePickerInput]="disablePickerInput"
      [hidden]="disablePickerInput"
      [placeholder]="placeholder"
      [(ngModel)]="itemToAdd"
      (select)="add($event)"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (typing)="onTyping($event)"
      (blur)="onTouched($event)"
      [selected]="items"
      *ngIf="!maxlength || (maxlength && items.length < maxlength)"
    >
    </novo-picker>
    <div class="preview-container">
      <span #preview></span>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i2.ComponentUtils }, { type: i3.NovoLabelService }]; }, propDecorators: { closeOnSelect: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93Q2hpcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGlwcy9Sb3dDaGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7QUFFM0Msc0RBQXNEO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQTBCRixNQUFNLE9BQU8sa0JBQW1CLFNBQVEsZUFBZTtJQUNyRCxRQUFRLENBQUMsQ0FBQztRQUNSLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0hBSFUsa0JBQWtCO29HQUFsQixrQkFBa0IsaW5CQXRCbkI7Ozs7O0dBS1Q7NEZBaUJVLGtCQUFrQjtrQkF4QjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRTs7Ozs7R0FLVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLG9DQUFvQzt3QkFDM0MsaUJBQWlCLEVBQUUsNEJBQTRCO3dCQUMvQyxJQUFJLEVBQUUsUUFBUTt3QkFDZCxnQ0FBZ0MsRUFBRSxVQUFVO3dCQUM1QywwQ0FBMEMsRUFBRSxZQUFZO3dCQUN4RCxnQ0FBZ0MsRUFBRSxVQUFVO3dCQUM1QyxpQkFBaUIsRUFBRSxrQkFBa0I7d0JBQ3JDLHNCQUFzQixFQUFFLHFCQUFxQjt3QkFDN0Msc0JBQXNCLEVBQUUsY0FBYzt3QkFDdEMsU0FBUyxFQUFFLHNCQUFzQjt3QkFDakMsV0FBVyxFQUFFLHdCQUF3Qjt3QkFDckMsU0FBUyxFQUFFLFNBQVM7d0JBQ3BCLFFBQVEsRUFBRSxTQUFTO3FCQUNwQjtpQkFDRjs7QUFrRUQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RCxZQUFZLE9BQW1CLEVBQUUsY0FBOEIsRUFBRSxNQUF3QjtRQUN2RixLQUFLLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUh6QyxrQkFBYSxHQUFZLElBQUksQ0FBQztJQUk5QixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUs7UUFDYixPQUFPO0lBQ1QsQ0FBQzs7aUhBVlUsbUJBQW1CO3FHQUFuQixtQkFBbUIsdUpBekRuQixDQUFDLG9CQUFvQixDQUFDLGlEQUl2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURULHVDQS9EVSxrQkFBa0I7NEZBaUVsQixtQkFBbUI7a0JBM0QvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUNqQyxJQUFJLEVBQUU7d0JBQ0osb0JBQW9CLEVBQUUsa0JBQWtCO3FCQUN6QztvQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1EVDtpQkFDRjs2SkFHQyxhQUFhO3NCQURaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBvbmVudFV0aWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tcG9uZW50LXV0aWxzL0NvbXBvbmVudFV0aWxzJztcbmltcG9ydCB7IE5vdm9DaGlwRWxlbWVudCB9IGZyb20gJy4vQ2hpcCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNFbGVtZW50IH0gZnJvbSAnLi9DaGlwcyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgQ0hJUFNfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvUm93Q2hpcHNFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXJvdy1jaGlwJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by1yb3ctY2hpcHMtY29sdW1uc1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPGkgY2xhc3M9XCJiaGktZGVsZXRlLW9cIiAqbmdJZj1cIiFkaXNhYmxlZFwiIChjbGljayk9XCJyZW1vdmUoKVwiPjwvaT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1yb3ctY2hpcCBub3ZvLWZvY3VzLWluZGljYXRvcicsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiB0YWJJbmRleCcsXG4gICAgcm9sZTogJ29wdGlvbicsXG4gICAgJ1tjbGFzcy5ub3ZvLXJvdy1jaGlwLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLXJvdy1jaGlwLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAncmVtb3ZlSWNvbicsXG4gICAgJ1tjbGFzcy5ub3ZvLXJvdy1jaGlwLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ2FyaWFTZWxlY3RlZCcsXG4gICAgJyhjbGljayknOiAnX2hhbmRsZUNsaWNrKCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnX2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgJyhibHVyKSc6ICdfYmx1cigpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1Jvd0NoaXBFbGVtZW50IGV4dGVuZHMgTm92b0NoaXBFbGVtZW50IHtcbiAgb25TZWxlY3QoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXJvdy1jaGlwcycsXG4gIHByb3ZpZGVyczogW0NISVBTX1ZBTFVFX0FDQ0VTU09SXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mud2l0aC12YWx1ZV0nOiAnaXRlbXMubGVuZ3RoID4gMCcsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tcm93LWNoaXBzLWNvbHVtbnNcIiAqbmdJZj1cIml0ZW1zLmxlbmd0aCA+IDBcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4tbGFiZWxcIiBbc3R5bGUuZmxleEJhc2lzLnB4XT1cImNvbHVtbi53aWR0aCB8fCAyMDBcIiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHNvdXJjZS5jb2x1bW5zXCI+e3sgY29sdW1uLmxhYmVsIH19PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tcm93LWNoaXBzLWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cInNvdXJjZS5lbXB0eVJlYWRPbmx5TWVzc2FnZSAmJiBkaXNhYmxlUGlja2VySW5wdXQgJiYgaXRlbXMubGVuZ3RoID09PSAwXCI+XG4gICAgICB7eyBzb3VyY2UuZW1wdHlSZWFkT25seU1lc3NhZ2UgfX1cbiAgICA8L2Rpdj5cbiAgICA8bm92by1yb3ctY2hpcFxuICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2l0ZW1zIHwgYXN5bmNcIlxuICAgICAgW3R5cGVdPVwidHlwZSB8fCBpdGVtPy52YWx1ZT8uc2VhcmNoRW50aXR5XCJcbiAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJpdGVtID09IHNlbGVjdGVkXCJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgKHJlbW92ZWQpPVwicmVtb3ZlKCRldmVudCwgaXRlbSlcIlxuICAgICAgKHNlbGVjdGlvbkNoYW5nZSk9XCJzZWxlY3QoJGV2ZW50LCBpdGVtKVwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNvbHVtbi1kYXRhXCJcbiAgICAgICAgW2NsYXNzLmVkaXRhYmxlXT1cImNvbHVtbi5lZGl0YWJsZVwiXG4gICAgICAgIFtzdHlsZS5mbGV4QmFzaXMucHhdPVwiY29sdW1uLndpZHRoIHx8IDIwMFwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2Ygc291cmNlLmNvbHVtbnNcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmVkaXRhYmxlXCI+XG4gICAgICAgICAgPG5vdm8tZmllbGQ+XG4gICAgICAgICAgICA8aW5wdXQgbm92b0lucHV0IFt0eXBlXT1cImNvbHVtbi50eXBlIHx8ICd0ZXh0J1wiIFsobmdNb2RlbCldPVwiaXRlbS52YWx1ZVtjb2x1bW4ubmFtZV1cIiAvPlxuICAgICAgICAgIDwvbm92by1maWVsZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29sdW1uLmVkaXRhYmxlXCI+XG4gICAgICAgICAgPHNwYW4+e3sgY29sdW1uLmRhdGEoaXRlbSkgfX08L3NwYW4+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9ub3ZvLXJvdy1jaGlwPlxuICAgIDxub3ZvLXBpY2tlclxuICAgICAgY2xlYXJWYWx1ZU9uU2VsZWN0PVwidHJ1ZVwiXG4gICAgICBbY2xvc2VPblNlbGVjdF09XCJjbG9zZU9uU2VsZWN0XCJcbiAgICAgIFtjb25maWddPVwic291cmNlXCJcbiAgICAgIFtkaXNhYmxlUGlja2VySW5wdXRdPVwiZGlzYWJsZVBpY2tlcklucHV0XCJcbiAgICAgIFtoaWRkZW5dPVwiZGlzYWJsZVBpY2tlcklucHV0XCJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICBbKG5nTW9kZWwpXT1cIml0ZW1Ub0FkZFwiXG4gICAgICAoc2VsZWN0KT1cImFkZCgkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxuICAgICAgKHR5cGluZyk9XCJvblR5cGluZygkZXZlbnQpXCJcbiAgICAgIChibHVyKT1cIm9uVG91Y2hlZCgkZXZlbnQpXCJcbiAgICAgIFtzZWxlY3RlZF09XCJpdGVtc1wiXG4gICAgICAqbmdJZj1cIiFtYXhsZW5ndGggfHwgKG1heGxlbmd0aCAmJiBpdGVtcy5sZW5ndGggPCBtYXhsZW5ndGgpXCJcbiAgICA+XG4gICAgPC9ub3ZvLXBpY2tlcj5cbiAgICA8ZGl2IGNsYXNzPVwicHJldmlldy1jb250YWluZXJcIj5cbiAgICAgIDxzcGFuICNwcmV2aWV3Pjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1Jvd0NoaXBzRWxlbWVudCBleHRlbmRzIE5vdm9DaGlwc0VsZW1lbnQge1xuICBASW5wdXQoKVxuICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMsIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge1xuICAgIHN1cGVyKGVsZW1lbnQsIGNvbXBvbmVudFV0aWxzLCBsYWJlbHMpO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=