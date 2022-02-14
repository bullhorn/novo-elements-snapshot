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
import * as i4 from "../picker/Picker";
import * as i5 from "@angular/forms";
function NovoRowChipElement_i_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 2);
    i0.ɵɵlistener("click", function NovoRowChipElement_i_2_Template_i_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.remove(); });
    i0.ɵɵelementEnd();
} }
const _c0 = ["*"];
function NovoRowChipsElement_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r6 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(column_r6.label);
} }
function NovoRowChipsElement_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtemplate(1, NovoRowChipsElement_div_0_div_1_Template, 2, 1, "div", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.source.columns);
} }
function NovoRowChipsElement_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.source.emptyReadOnlyMessage, " ");
} }
function NovoRowChipsElement_novo_row_chip_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r9 = ctx.$implicit;
    const item_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(column_r9.data(item_r7));
} }
function NovoRowChipsElement_novo_row_chip_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-row-chip", 10);
    i0.ɵɵlistener("removed", function NovoRowChipsElement_novo_row_chip_2_Template_novo_row_chip_removed_0_listener($event) { i0.ɵɵrestoreView(_r12); const item_r7 = ctx.$implicit; const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.remove($event, item_r7); })("selectionChange", function NovoRowChipsElement_novo_row_chip_2_Template_novo_row_chip_selectionChange_0_listener($event) { i0.ɵɵrestoreView(_r12); const item_r7 = ctx.$implicit; const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.select($event, item_r7); });
    i0.ɵɵtemplate(1, NovoRowChipsElement_novo_row_chip_2_div_1_Template, 3, 1, "div", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", item_r7 == ctx_r2.selected);
    i0.ɵɵproperty("type", ctx_r2.type || (item_r7 == null ? null : item_r7.value == null ? null : item_r7.value.searchEntity))("disabled", ctx_r2.disablePickerInput);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.source.columns);
} }
function NovoRowChipsElement_novo_picker_4_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-picker", 13);
    i0.ɵɵlistener("ngModelChange", function NovoRowChipsElement_novo_picker_4_Template_novo_picker_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.itemToAdd = $event; })("select", function NovoRowChipsElement_novo_picker_4_Template_novo_picker_select_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.add($event); })("keydown", function NovoRowChipsElement_novo_picker_4_Template_novo_picker_keydown_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.onKeyDown($event); })("focus", function NovoRowChipsElement_novo_picker_4_Template_novo_picker_focus_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.onFocus($event); })("typing", function NovoRowChipsElement_novo_picker_4_Template_novo_picker_typing_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.onTyping($event); })("blur", function NovoRowChipsElement_novo_picker_4_Template_novo_picker_blur_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r20 = i0.ɵɵnextContext(); return ctx_r20.onTouched($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("closeOnSelect", ctx_r3.closeOnSelect)("config", ctx_r3.source)("disablePickerInput", ctx_r3.disablePickerInput)("hidden", ctx_r3.disablePickerInput)("placeholder", ctx_r3.placeholder)("ngModel", ctx_r3.itemToAdd)("selected", ctx_r3.items)("overrideElement", ctx_r3.element);
} }
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
NovoRowChipElement.ɵfac = function NovoRowChipElement_Factory(t) { return ɵNovoRowChipElement_BaseFactory(t || NovoRowChipElement); };
NovoRowChipElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoRowChipElement, selectors: [["novo-row-chip"]], features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 3, vars: 1, consts: [[1, "novo-row-chips-columns"], ["class", "bhi-delete-o", 3, "click", 4, "ngIf"], [1, "bhi-delete-o", 3, "click"]], template: function NovoRowChipElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵprojection(1);
        i0.ɵɵtemplate(2, NovoRowChipElement_i_2_Template, 1, 0, "i", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.disabled);
    } }, directives: [i1.NgIf], encapsulation: 2 });
const ɵNovoRowChipElement_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoRowChipElement);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoRowChipElement, [{
        type: Component,
        args: [{
                selector: 'novo-row-chip',
                template: `<div class="novo-row-chips-columns">
    <ng-content></ng-content><i class="bhi-delete-o" *ngIf="!disabled" (click)="remove()"></i>
  </div>`,
            }]
    }], null, null); })();
export class NovoRowChipsElement extends NovoChipsElement {
    constructor(element, componentUtils, labels) {
        super(element, componentUtils, labels);
        this.closeOnSelect = true;
    }
    onKeyDown(event) {
        return;
    }
}
NovoRowChipsElement.ɵfac = function NovoRowChipsElement_Factory(t) { return new (t || NovoRowChipsElement)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i2.ComponentUtils), i0.ɵɵdirectiveInject(i3.NovoLabelService)); };
NovoRowChipsElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoRowChipsElement, selectors: [["novo-row-chips"]], hostVars: 2, hostBindings: function NovoRowChipsElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("with-value", ctx.items.length > 0);
    } }, inputs: { closeOnSelect: "closeOnSelect" }, features: [i0.ɵɵProvidersFeature([CHIPS_VALUE_ACCESSOR]), i0.ɵɵInheritDefinitionFeature], decls: 8, vars: 6, consts: [["class", "novo-row-chips-columns", 4, "ngIf"], ["class", "novo-row-chips-empty-message", 4, "ngIf"], [3, "type", "selected", "disabled", "removed", "selectionChange", 4, "ngFor", "ngForOf"], ["clearValueOnSelect", "true", 3, "closeOnSelect", "config", "disablePickerInput", "hidden", "placeholder", "ngModel", "selected", "overrideElement", "ngModelChange", "select", "keydown", "focus", "typing", "blur", 4, "ngIf"], [1, "preview-container"], ["preview", ""], [1, "novo-row-chips-columns"], ["class", "column-label", 4, "ngFor", "ngForOf"], [1, "column-label"], [1, "novo-row-chips-empty-message"], [3, "type", "disabled", "removed", "selectionChange"], ["class", "column-data", 4, "ngFor", "ngForOf"], [1, "column-data"], ["clearValueOnSelect", "true", 3, "closeOnSelect", "config", "disablePickerInput", "hidden", "placeholder", "ngModel", "selected", "overrideElement", "ngModelChange", "select", "keydown", "focus", "typing", "blur"]], template: function NovoRowChipsElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoRowChipsElement_div_0_Template, 2, 1, "div", 0);
        i0.ɵɵtemplate(1, NovoRowChipsElement_div_1_Template, 2, 1, "div", 1);
        i0.ɵɵtemplate(2, NovoRowChipsElement_novo_row_chip_2_Template, 2, 5, "novo-row-chip", 2);
        i0.ɵɵpipe(3, "async");
        i0.ɵɵtemplate(4, NovoRowChipsElement_novo_picker_4_Template, 1, 8, "novo-picker", 3);
        i0.ɵɵelementStart(5, "div", 4);
        i0.ɵɵelement(6, "span", null, 5);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.items.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.source.emptyReadOnlyMessage && ctx.disablePickerInput && ctx.items.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(3, 4, ctx._items));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.maxlength || ctx.maxlength && ctx.items.length < ctx.maxlength);
    } }, directives: [i1.NgIf, i1.NgForOf, NovoRowChipElement, i4.NovoPickerElement, i5.NgControlStatus, i5.NgModel], pipes: [i1.AsyncPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoRowChipsElement, [{
        type: Component,
        args: [{
                selector: 'novo-row-chips',
                providers: [CHIPS_VALUE_ACCESSOR],
                host: {
                    '[class.with-value]': 'items.length > 0',
                },
                template: `
    <div class="novo-row-chips-columns" *ngIf="items.length > 0">
      <div class="column-label" *ngFor="let column of source.columns">{{ column.label }}</div>
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
      <div class="column-data" *ngFor="let column of source.columns">
        <span>{{ column.data(item) }}</span>
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
    }], function () { return [{ type: i0.ElementRef }, { type: i2.ComponentUtils }, { type: i3.NovoLabelService }]; }, { closeOnSelect: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93Q2hpcHMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2hpcHMvUm93Q2hpcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7O0lBWWQsNEJBQWlFO0lBQXZCLDJLQUFrQjtJQUFDLGlCQUFJOzs7O0lBaUJ4Riw4QkFBZ0U7SUFBQSxZQUFrQjtJQUFBLGlCQUFNOzs7SUFBeEIsZUFBa0I7SUFBbEIscUNBQWtCOzs7SUFEcEYsOEJBQ0U7SUFBQSwwRUFBZ0U7SUFDbEUsaUJBQU07OztJQURzQixlQUFxQztJQUFyQywrQ0FBcUM7OztJQUVqRSw4QkFDRTtJQUFBLFlBQ0Y7SUFBQSxpQkFBTTs7O0lBREosZUFDRjtJQURFLG1FQUNGOzs7SUFTRSwrQkFDRTtJQUFBLDRCQUFNO0lBQUEsWUFBdUI7SUFBQSxpQkFBTztJQUN0QyxpQkFBTTs7OztJQURFLGVBQXVCO0lBQXZCLDZDQUF1Qjs7OztJQVRqQyx5Q0FRRTtJQUhBLCtQQUFnQyxrUUFBQTtJQUdoQyxxRkFDRTtJQUVKLGlCQUFnQjs7OztJQVJkLHNEQUFtQztJQURuQywwSEFBMEMsdUNBQUE7SUFNakIsZUFBcUM7SUFBckMsK0NBQXFDOzs7O0lBSWhFLHVDQWlCYztJQVZaLG1PQUF1QixpTUFBQSx5TUFBQSxtTUFBQSxzTUFBQSxtTUFBQTtJQVV6QixpQkFBYzs7O0lBZlosb0RBQStCLHlCQUFBLGlEQUFBLHFDQUFBLG1DQUFBLDZCQUFBLDBCQUFBLG1DQUFBOztBQTlDckMsc0RBQXNEO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQVFGLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxlQUFlO0lBQ3JELFFBQVEsQ0FBQyxDQUFDO1FBQ1IsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzsrR0FIVSxrQkFBa0I7dURBQWxCLGtCQUFrQjs7UUFKbEIsOEJBQ1Q7UUFBQSxrQkFBWTtRQUFhLCtEQUE2RDtRQUN4RixpQkFBTTs7UUFENkMsZUFBaUI7UUFBakIsb0NBQWlCOzsrRUFHekQsa0JBQWtCO2tEQUFsQixrQkFBa0I7Y0FOOUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7O1NBRUg7YUFDUjs7QUF1REQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RCxZQUFZLE9BQW1CLEVBQUUsY0FBOEIsRUFBRSxNQUF3QjtRQUN2RixLQUFLLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUh6QyxrQkFBYSxHQUFZLElBQUksQ0FBQztJQUk5QixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUs7UUFDYixPQUFPO0lBQ1QsQ0FBQzs7c0ZBVlUsbUJBQW1CO3dEQUFuQixtQkFBbUI7O3NGQTlDbkIsQ0FBQyxvQkFBb0IsQ0FBQztRQUsvQixvRUFDRTtRQUVGLG9FQUNFO1FBRUYsd0ZBUUU7O1FBSUYsb0ZBaUJBO1FBQ0EsOEJBQ0U7UUFBQSxnQ0FBc0I7UUFDeEIsaUJBQU07O1FBdEM4QiwyQ0FBd0I7UUFHbEIsZUFBK0U7UUFBL0UsMEdBQStFO1FBSXZILGVBQW1DO1FBQW5DLDBEQUFtQztRQTBCbkMsZUFBNkQ7UUFBN0QsMEZBQTZEOzJDQTlDdEQsa0JBQWtCO2tEQXNEbEIsbUJBQW1CO2NBaEQvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQ2pDLElBQUksRUFBRTtvQkFDSixvQkFBb0IsRUFBRSxrQkFBa0I7aUJBQ3pDO2dCQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDVDthQUNGO3lIQUdDLGFBQWE7a0JBRFosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy9jb21wb25lbnQtdXRpbHMvQ29tcG9uZW50VXRpbHMnO1xuaW1wb3J0IHsgTm92b0NoaXBFbGVtZW50IH0gZnJvbSAnLi9DaGlwJztcbmltcG9ydCB7IE5vdm9DaGlwc0VsZW1lbnQgfSBmcm9tICcuL0NoaXBzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBDSElQU19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9Sb3dDaGlwc0VsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcm93LWNoaXAnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJub3ZvLXJvdy1jaGlwcy1jb2x1bW5zXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjxpIGNsYXNzPVwiYmhpLWRlbGV0ZS1vXCIgKm5nSWY9XCIhZGlzYWJsZWRcIiAoY2xpY2spPVwicmVtb3ZlKClcIj48L2k+XG4gIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Sb3dDaGlwRWxlbWVudCBleHRlbmRzIE5vdm9DaGlwRWxlbWVudCB7XG4gIG9uU2VsZWN0KGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1yb3ctY2hpcHMnLFxuICBwcm92aWRlcnM6IFtDSElQU19WQUxVRV9BQ0NFU1NPUl0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLndpdGgtdmFsdWVdJzogJ2l0ZW1zLmxlbmd0aCA+IDAnLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXJvdy1jaGlwcy1jb2x1bW5zXCIgKm5nSWY9XCJpdGVtcy5sZW5ndGggPiAwXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLWxhYmVsXCIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBzb3VyY2UuY29sdW1uc1wiPnt7IGNvbHVtbi5sYWJlbCB9fTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXJvdy1jaGlwcy1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJzb3VyY2UuZW1wdHlSZWFkT25seU1lc3NhZ2UgJiYgZGlzYWJsZVBpY2tlcklucHV0ICYmIGl0ZW1zLmxlbmd0aCA9PT0gMFwiPlxuICAgICAge3sgc291cmNlLmVtcHR5UmVhZE9ubHlNZXNzYWdlIH19XG4gICAgPC9kaXY+XG4gICAgPG5vdm8tcm93LWNoaXBcbiAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9pdGVtcyB8IGFzeW5jXCJcbiAgICAgIFt0eXBlXT1cInR5cGUgfHwgaXRlbT8udmFsdWU/LnNlYXJjaEVudGl0eVwiXG4gICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiaXRlbSA9PSBzZWxlY3RlZFwiXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZVBpY2tlcklucHV0XCJcbiAgICAgIChyZW1vdmVkKT1cInJlbW92ZSgkZXZlbnQsIGl0ZW0pXCJcbiAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwic2VsZWN0KCRldmVudCwgaXRlbSlcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4tZGF0YVwiICpuZ0Zvcj1cImxldCBjb2x1bW4gb2Ygc291cmNlLmNvbHVtbnNcIj5cbiAgICAgICAgPHNwYW4+e3sgY29sdW1uLmRhdGEoaXRlbSkgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L25vdm8tcm93LWNoaXA+XG4gICAgPG5vdm8tcGlja2VyXG4gICAgICBjbGVhclZhbHVlT25TZWxlY3Q9XCJ0cnVlXCJcbiAgICAgIFtjbG9zZU9uU2VsZWN0XT1cImNsb3NlT25TZWxlY3RcIlxuICAgICAgW2NvbmZpZ109XCJzb3VyY2VcIlxuICAgICAgW2Rpc2FibGVQaWNrZXJJbnB1dF09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgW2hpZGRlbl09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIFsobmdNb2RlbCldPVwiaXRlbVRvQWRkXCJcbiAgICAgIChzZWxlY3QpPVwiYWRkKCRldmVudClcIlxuICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAodHlwaW5nKT1cIm9uVHlwaW5nKCRldmVudClcIlxuICAgICAgKGJsdXIpPVwib25Ub3VjaGVkKCRldmVudClcIlxuICAgICAgW3NlbGVjdGVkXT1cIml0ZW1zXCJcbiAgICAgIFtvdmVycmlkZUVsZW1lbnRdPVwiZWxlbWVudFwiXG4gICAgICAqbmdJZj1cIiFtYXhsZW5ndGggfHwgKG1heGxlbmd0aCAmJiBpdGVtcy5sZW5ndGggPCBtYXhsZW5ndGgpXCJcbiAgICA+XG4gICAgPC9ub3ZvLXBpY2tlcj5cbiAgICA8ZGl2IGNsYXNzPVwicHJldmlldy1jb250YWluZXJcIj5cbiAgICAgIDxzcGFuICNwcmV2aWV3Pjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1Jvd0NoaXBzRWxlbWVudCBleHRlbmRzIE5vdm9DaGlwc0VsZW1lbnQge1xuICBASW5wdXQoKVxuICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMsIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge1xuICAgIHN1cGVyKGVsZW1lbnQsIGNvbXBvbmVudFV0aWxzLCBsYWJlbHMpO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=