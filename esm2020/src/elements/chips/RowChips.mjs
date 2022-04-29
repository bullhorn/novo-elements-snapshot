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
NovoRowChipElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoRowChipElement, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoRowChipElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoRowChipElement, selector: "novo-row-chip", host: { attributes: { "role": "option" }, listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)", "focus": "focus()", "blur": "_blur()" }, properties: { "attr.tabindex": "disabled ? null : tabIndex", "class.novo-row-chip-selected": "selected", "class.novo-row-chip-with-trailing-icon": "removeIcon", "class.novo-row-chip-disabled": "disabled", "attr.disabled": "disabled || null", "attr.aria-disabled": "disabled.toString()", "attr.aria-selected": "ariaSelected" }, classAttribute: "novo-row-chip novo-focus-indicator" }, usesInheritance: true, ngImport: i0, template: `
    <div class="novo-row-chips-columns">
      <ng-content></ng-content>
      <i class="bhi-delete-o" *ngIf="!disabled" (click)="remove()"></i>
    </div>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoRowChipElement, decorators: [{
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
NovoRowChipsElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoRowChipsElement, deps: [{ token: i0.ElementRef }, { token: i2.ComponentUtils }, { token: i3.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoRowChipsElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoRowChipsElement, selector: "novo-row-chips", inputs: { closeOnSelect: "closeOnSelect" }, host: { properties: { "class.with-value": "items.length > 0" } }, providers: [CHIPS_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: `
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
      [overrideElement]="element"
      *ngIf="!maxlength || (maxlength && items.length < maxlength)"
    >
    </novo-picker>
    <div class="preview-container">
      <span #preview></span>
    </div>
  `, isInline: true, components: [{ type: NovoRowChipElement, selector: "novo-row-chip" }, { type: i4.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"] }, { type: i5.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoRowChipsElement, decorators: [{
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
      [overrideElement]="element"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93Q2hpcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jaGlwcy9Sb3dDaGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7QUFFM0Msc0RBQXNEO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQTBCRixNQUFNLE9BQU8sa0JBQW1CLFNBQVEsZUFBZTtJQUNyRCxRQUFRLENBQUMsQ0FBQztRQUNSLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7K0dBSFUsa0JBQWtCO21HQUFsQixrQkFBa0IsaW5CQXRCbkI7Ozs7O0dBS1Q7MkZBaUJVLGtCQUFrQjtrQkF4QjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRTs7Ozs7R0FLVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLG9DQUFvQzt3QkFDM0MsaUJBQWlCLEVBQUUsNEJBQTRCO3dCQUMvQyxJQUFJLEVBQUUsUUFBUTt3QkFDZCxnQ0FBZ0MsRUFBRSxVQUFVO3dCQUM1QywwQ0FBMEMsRUFBRSxZQUFZO3dCQUN4RCxnQ0FBZ0MsRUFBRSxVQUFVO3dCQUM1QyxpQkFBaUIsRUFBRSxrQkFBa0I7d0JBQ3JDLHNCQUFzQixFQUFFLHFCQUFxQjt3QkFDN0Msc0JBQXNCLEVBQUUsY0FBYzt3QkFDdEMsU0FBUyxFQUFFLHNCQUFzQjt3QkFDakMsV0FBVyxFQUFFLHdCQUF3Qjt3QkFDckMsU0FBUyxFQUFFLFNBQVM7d0JBQ3BCLFFBQVEsRUFBRSxTQUFTO3FCQUNwQjtpQkFDRjs7QUFtRUQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RCxZQUFZLE9BQW1CLEVBQUUsY0FBOEIsRUFBRSxNQUF3QjtRQUN2RixLQUFLLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUh6QyxrQkFBYSxHQUFZLElBQUksQ0FBQztJQUk5QixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUs7UUFDYixPQUFPO0lBQ1QsQ0FBQzs7Z0hBVlUsbUJBQW1CO29HQUFuQixtQkFBbUIsdUpBMURuQixDQUFDLG9CQUFvQixDQUFDLGlEQUl2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9EVCx1Q0FoRVUsa0JBQWtCOzJGQWtFbEIsbUJBQW1CO2tCQTVEL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDakMsSUFBSSxFQUFFO3dCQUNKLG9CQUFvQixFQUFFLGtCQUFrQjtxQkFDekM7b0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RUO2lCQUNGOzZKQUdDLGFBQWE7c0JBRFosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy9jb21wb25lbnQtdXRpbHMvQ29tcG9uZW50VXRpbHMnO1xuaW1wb3J0IHsgTm92b0NoaXBFbGVtZW50IH0gZnJvbSAnLi9DaGlwJztcbmltcG9ydCB7IE5vdm9DaGlwc0VsZW1lbnQgfSBmcm9tICcuL0NoaXBzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBDSElQU19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9Sb3dDaGlwc0VsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcm93LWNoaXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXJvdy1jaGlwcy1jb2x1bW5zXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8aSBjbGFzcz1cImJoaS1kZWxldGUtb1wiICpuZ0lmPVwiIWRpc2FibGVkXCIgKGNsaWNrKT1cInJlbW92ZSgpXCI+PC9pPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXJvdy1jaGlwIG5vdm8tZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IHRhYkluZGV4JyxcbiAgICByb2xlOiAnb3B0aW9uJyxcbiAgICAnW2NsYXNzLm5vdm8tcm93LWNoaXAtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAnW2NsYXNzLm5vdm8tcm93LWNoaXAtd2l0aC10cmFpbGluZy1pY29uXSc6ICdyZW1vdmVJY29uJyxcbiAgICAnW2NsYXNzLm5vdm8tcm93LWNoaXAtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1zZWxlY3RlZF0nOiAnYXJpYVNlbGVjdGVkJyxcbiAgICAnKGNsaWNrKSc6ICdfaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGZvY3VzKSc6ICdmb2N1cygpJyxcbiAgICAnKGJsdXIpJzogJ19ibHVyKCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUm93Q2hpcEVsZW1lbnQgZXh0ZW5kcyBOb3ZvQ2hpcEVsZW1lbnQge1xuICBvblNlbGVjdChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcm93LWNoaXBzJyxcbiAgcHJvdmlkZXJzOiBbQ0hJUFNfVkFMVUVfQUNDRVNTT1JdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy53aXRoLXZhbHVlXSc6ICdpdGVtcy5sZW5ndGggPiAwJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by1yb3ctY2hpcHMtY29sdW1uc1wiICpuZ0lmPVwiaXRlbXMubGVuZ3RoID4gMFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbi1sYWJlbFwiIFtzdHlsZS5mbGV4QmFzaXMucHhdPVwiY29sdW1uLndpZHRoIHx8IDIwMFwiICpuZ0Zvcj1cImxldCBjb2x1bW4gb2Ygc291cmNlLmNvbHVtbnNcIj57eyBjb2x1bW4ubGFiZWwgfX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1yb3ctY2hpcHMtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwic291cmNlLmVtcHR5UmVhZE9ubHlNZXNzYWdlICYmIGRpc2FibGVQaWNrZXJJbnB1dCAmJiBpdGVtcy5sZW5ndGggPT09IDBcIj5cbiAgICAgIHt7IHNvdXJjZS5lbXB0eVJlYWRPbmx5TWVzc2FnZSB9fVxuICAgIDwvZGl2PlxuICAgIDxub3ZvLXJvdy1jaGlwXG4gICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfaXRlbXMgfCBhc3luY1wiXG4gICAgICBbdHlwZV09XCJ0eXBlIHx8IGl0ZW0/LnZhbHVlPy5zZWFyY2hFbnRpdHlcIlxuICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cIml0ZW0gPT0gc2VsZWN0ZWRcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVQaWNrZXJJbnB1dFwiXG4gICAgICAocmVtb3ZlZCk9XCJyZW1vdmUoJGV2ZW50LCBpdGVtKVwiXG4gICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cInNlbGVjdCgkZXZlbnQsIGl0ZW0pXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY29sdW1uLWRhdGFcIlxuICAgICAgICBbY2xhc3MuZWRpdGFibGVdPVwiY29sdW1uLmVkaXRhYmxlXCJcbiAgICAgICAgW3N0eWxlLmZsZXhCYXNpcy5weF09XCJjb2x1bW4ud2lkdGggfHwgMjAwXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBzb3VyY2UuY29sdW1uc1wiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4uZWRpdGFibGVcIj5cbiAgICAgICAgICA8bm92by1maWVsZD5cbiAgICAgICAgICAgIDxpbnB1dCBub3ZvSW5wdXQgW3R5cGVdPVwiY29sdW1uLnR5cGUgfHwgJ3RleHQnXCIgWyhuZ01vZGVsKV09XCJpdGVtLnZhbHVlW2NvbHVtbi5uYW1lXVwiIC8+XG4gICAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjb2x1bW4uZWRpdGFibGVcIj5cbiAgICAgICAgICA8c3Bhbj57eyBjb2x1bW4uZGF0YShpdGVtKSB9fTwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L25vdm8tcm93LWNoaXA+XG4gICAgPG5vdm8tcGlja2VyXG4gICAgICBjbGVhclZhbHVlT25TZWxlY3Q9XCJ0cnVlXCJcbiAgICAgIFtjbG9zZU9uU2VsZWN0XT1cImNsb3NlT25TZWxlY3RcIlxuICAgICAgW2NvbmZpZ109XCJzb3VyY2VcIlxuICAgICAgW2Rpc2FibGVQaWNrZXJJbnB1dF09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgW2hpZGRlbl09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIFsobmdNb2RlbCldPVwiaXRlbVRvQWRkXCJcbiAgICAgIChzZWxlY3QpPVwiYWRkKCRldmVudClcIlxuICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAodHlwaW5nKT1cIm9uVHlwaW5nKCRldmVudClcIlxuICAgICAgKGJsdXIpPVwib25Ub3VjaGVkKCRldmVudClcIlxuICAgICAgW3NlbGVjdGVkXT1cIml0ZW1zXCJcbiAgICAgIFtvdmVycmlkZUVsZW1lbnRdPVwiZWxlbWVudFwiXG4gICAgICAqbmdJZj1cIiFtYXhsZW5ndGggfHwgKG1heGxlbmd0aCAmJiBpdGVtcy5sZW5ndGggPCBtYXhsZW5ndGgpXCJcbiAgICA+XG4gICAgPC9ub3ZvLXBpY2tlcj5cbiAgICA8ZGl2IGNsYXNzPVwicHJldmlldy1jb250YWluZXJcIj5cbiAgICAgIDxzcGFuICNwcmV2aWV3Pjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1Jvd0NoaXBzRWxlbWVudCBleHRlbmRzIE5vdm9DaGlwc0VsZW1lbnQge1xuICBASW5wdXQoKVxuICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMsIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge1xuICAgIHN1cGVyKGVsZW1lbnQsIGNvbXBvbmVudFV0aWxzLCBsYWJlbHMpO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=