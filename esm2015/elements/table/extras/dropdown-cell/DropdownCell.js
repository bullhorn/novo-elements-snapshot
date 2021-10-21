// NG2
import { Component, Input } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
import * as i0 from "@angular/core";
import * as i1 from "../../../dropdown/Dropdown";
import * as i2 from "../../../button/Button";
import * as i3 from "@angular/common";
function NovoDropdownCell_ng_container_5_dropdown_item_header_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "dropdown-item-header");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const config_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(config_r1.category);
} }
function NovoDropdownCell_ng_container_5_item_2_i_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 8);
} }
function NovoDropdownCell_ng_container_5_item_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "item", 6);
    i0.ɵɵlistener("action", function NovoDropdownCell_ng_container_5_item_2_Template_item_action_0_listener() { i0.ɵɵrestoreView(_r11); const option_r7 = ctx.$implicit; const config_r1 = i0.ɵɵnextContext().$implicit; const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.onClick(config_r1, option_r7, option_r7.value); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, NovoDropdownCell_ng_container_5_item_2_i_3_Template, 1, 0, "i", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r7 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", (option_r7 || option_r7.value) === ctx_r4.value);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("data-automation-id", option_r7.label || option_r7);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(option_r7.label || option_r7);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (option_r7 || option_r7.value) === ctx_r4.value);
} }
function NovoDropdownCell_ng_container_5_hr_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "hr");
} }
function NovoDropdownCell_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NovoDropdownCell_ng_container_5_dropdown_item_header_1_Template, 2, 1, "dropdown-item-header", 4);
    i0.ɵɵtemplate(2, NovoDropdownCell_ng_container_5_item_2_Template, 4, 5, "item", 5);
    i0.ɵɵtemplate(3, NovoDropdownCell_ng_container_5_hr_3_Template, 1, 0, "hr", 4);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const config_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", config_r1.category);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", config_r1.options);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i_r2 < ctx_r0.meta.dropdownCellConfig.length - 1);
} }
export class NovoDropdownCell extends BaseRenderer {
    ngOnInit() {
        // Check for and fix bad config
        if (!this.meta.dropdownCellConfig) {
            throw new Error('Missing "dropdownCellConfig" on the column setup');
        }
    }
    onClick(config, option, value) {
        const callback = option.callback || config.callback;
        callback(this.data, value || option);
    }
}
NovoDropdownCell.ɵfac = function NovoDropdownCell_Factory(t) { return ɵNovoDropdownCell_BaseFactory(t || NovoDropdownCell); };
NovoDropdownCell.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDropdownCell, selectors: [["novo-dropdown-cell"]], inputs: { meta: "meta", value: "value" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 6, vars: 2, consts: [["parentScrollSelector", ".table-container", "containerClass", "novo-table-dropdown-cell"], ["type", "button", "theme", "secondary", "icon", "collapse", "inverse", ""], ["data-automation-id", "novo-dropdown-cell-value"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "active", "action", 4, "ngFor", "ngForOf"], [3, "action"], ["class", "bhi-check", 4, "ngIf"], [1, "bhi-check"]], template: function NovoDropdownCell_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-dropdown", 0);
        i0.ɵɵelementStart(1, "button", 1);
        i0.ɵɵelementStart(2, "span", 2);
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "list");
        i0.ɵɵtemplate(5, NovoDropdownCell_ng_container_5_Template, 4, 3, "ng-container", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.value);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.meta.dropdownCellConfig);
    } }, directives: [i1.NovoDropdownElement, i2.NovoButtonElement, i1.NovoDropdownListElement, i3.NgForOf, i3.NgIf, i1.NovoDropDownItemHeaderElement, i1.NovoItemElement], encapsulation: 2 });
const ɵNovoDropdownCell_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoDropdownCell);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDropdownCell, [{
        type: Component,
        args: [{
                selector: 'novo-dropdown-cell',
                template: `
    <novo-dropdown parentScrollSelector=".table-container" containerClass="novo-table-dropdown-cell">
      <button type="button" theme="secondary" icon="collapse" inverse>
        <span data-automation-id="novo-dropdown-cell-value">{{ value }}</span>
      </button>
      <list>
        <ng-container *ngFor="let config of meta.dropdownCellConfig; let i = index">
          <dropdown-item-header *ngIf="config.category">{{ config.category }}</dropdown-item-header>
          <item
            *ngFor="let option of config.options"
            (action)="onClick(config, option, option.value)"
            [class.active]="(option || option.value) === value"
          >
            <span [attr.data-automation-id]="option.label || option">{{ option.label || option }}</span>
            <i *ngIf="(option || option.value) === value" class="bhi-check"></i>
          </item>
          <hr *ngIf="i < meta.dropdownCellConfig.length - 1" />
        </ng-container>
      </list>
    </novo-dropdown>
  `,
            }]
    }], null, { meta: [{
            type: Input
        }], value: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25DZWxsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYmxlL2V4dHJhcy9kcm9wZG93bi1jZWxsL0Ryb3Bkb3duQ2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7O0lBaUJuRCw0Q0FBOEM7SUFBQSxZQUFxQjtJQUFBLGlCQUF1Qjs7O0lBQTVDLGVBQXFCO0lBQXJCLHdDQUFxQjs7O0lBT2pFLHVCQUFvRTs7OztJQU50RSwrQkFLRTtJQUhBLHdUQUFnRDtJQUdoRCw0QkFBeUQ7SUFBQSxZQUE0QjtJQUFBLGlCQUFPO0lBQzVGLG1GQUFnRTtJQUNsRSxpQkFBTzs7OztJQUpMLHlFQUFtRDtJQUU3QyxlQUFrRDtJQUFsRCxrRUFBa0Q7SUFBQyxlQUE0QjtJQUE1QixrREFBNEI7SUFDbEYsZUFBMEM7SUFBMUMsc0VBQTBDOzs7SUFFL0MscUJBQ0Y7OztJQVhBLDZCQUNFO0lBQUEsa0hBQThDO0lBQzlDLGtGQUtFO0lBR0YsOEVBQ0Y7SUFBQSwwQkFBZTs7Ozs7SUFWUyxlQUF1QjtJQUF2Qix5Q0FBdUI7SUFFM0MsZUFBcUM7SUFBckMsMkNBQXFDO0lBT25DLGVBQThDO0lBQTlDLHVFQUE4Qzs7QUFNNUQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFlBQVk7SUFNekMsUUFBUTtRQUNiLCtCQUErQjtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDckU7SUFDSCxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSztRQUNsQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O3lHQWhCVSxnQkFBZ0I7cURBQWhCLGdCQUFnQjtRQXJCekIsd0NBQ0U7UUFBQSxpQ0FDRTtRQUFBLCtCQUFvRDtRQUFBLFlBQVc7UUFBQSxpQkFBTztRQUN4RSxpQkFBUztRQUNULDRCQUNFO1FBQUEsbUZBQ0U7UUFXSixpQkFBTztRQUNULGlCQUFnQjs7UUFoQndDLGVBQVc7UUFBWCwrQkFBVztRQUdqRCxlQUE2RDtRQUE3RCxxREFBNkQ7OzZFQWdCdEUsZ0JBQWdCO2tEQUFoQixnQkFBZ0I7Y0F4QjVCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUO2FBQ0Y7Z0JBR0MsSUFBSTtrQkFESCxLQUFLO1lBR04sS0FBSztrQkFESixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgQmFzZVJlbmRlcmVyIH0gZnJvbSAnLi4vYmFzZS1yZW5kZXJlci9CYXNlUmVuZGVyZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElOb3ZvRHJvcGRvd25DZWxsQ29uZmlnIHtcbiAgY2F0ZWdvcnk/OiBzdHJpbmc7XG4gIGNhbGxiYWNrPzogRnVuY3Rpb247XG4gIG9wdGlvbnM6ICh7IGxhYmVsPzogc3RyaW5nOyB2YWx1ZT86IHN0cmluZzsgY2FsbGJhY2s/OiBGdW5jdGlvbiB9IHwgc3RyaW5nKVtdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRyb3Bkb3duLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWRyb3Bkb3duIHBhcmVudFNjcm9sbFNlbGVjdG9yPVwiLnRhYmxlLWNvbnRhaW5lclwiIGNvbnRhaW5lckNsYXNzPVwibm92by10YWJsZS1kcm9wZG93bi1jZWxsXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cInNlY29uZGFyeVwiIGljb249XCJjb2xsYXBzZVwiIGludmVyc2U+XG4gICAgICAgIDxzcGFuIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZHJvcGRvd24tY2VsbC12YWx1ZVwiPnt7IHZhbHVlIH19PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8bGlzdD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIG1ldGEuZHJvcGRvd25DZWxsQ29uZmlnOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgPGRyb3Bkb3duLWl0ZW0taGVhZGVyICpuZ0lmPVwiY29uZmlnLmNhdGVnb3J5XCI+e3sgY29uZmlnLmNhdGVnb3J5IH19PC9kcm9wZG93bi1pdGVtLWhlYWRlcj5cbiAgICAgICAgICA8aXRlbVxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb25maWcub3B0aW9uc1wiXG4gICAgICAgICAgICAoYWN0aW9uKT1cIm9uQ2xpY2soY29uZmlnLCBvcHRpb24sIG9wdGlvbi52YWx1ZSlcIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCIob3B0aW9uIHx8IG9wdGlvbi52YWx1ZSkgPT09IHZhbHVlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsIHx8IG9wdGlvblwiPnt7IG9wdGlvbi5sYWJlbCB8fCBvcHRpb24gfX08L3NwYW4+XG4gICAgICAgICAgICA8aSAqbmdJZj1cIihvcHRpb24gfHwgb3B0aW9uLnZhbHVlKSA9PT0gdmFsdWVcIiBjbGFzcz1cImJoaS1jaGVja1wiPjwvaT5cbiAgICAgICAgICA8L2l0ZW0+XG4gICAgICAgICAgPGhyICpuZ0lmPVwiaSA8IG1ldGEuZHJvcGRvd25DZWxsQ29uZmlnLmxlbmd0aCAtIDFcIiAvPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbGlzdD5cbiAgICA8L25vdm8tZHJvcGRvd24+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wZG93bkNlbGwgZXh0ZW5kcyBCYXNlUmVuZGVyZXIgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBtZXRhOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHZhbHVlOiBhbnk7XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIENoZWNrIGZvciBhbmQgZml4IGJhZCBjb25maWdcbiAgICBpZiAoIXRoaXMubWV0YS5kcm9wZG93bkNlbGxDb25maWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBcImRyb3Bkb3duQ2VsbENvbmZpZ1wiIG9uIHRoZSBjb2x1bW4gc2V0dXAnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DbGljayhjb25maWcsIG9wdGlvbiwgdmFsdWUpOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFjayA9IG9wdGlvbi5jYWxsYmFjayB8fCBjb25maWcuY2FsbGJhY2s7XG4gICAgY2FsbGJhY2sodGhpcy5kYXRhLCB2YWx1ZSB8fCBvcHRpb24pO1xuICB9XG59XG4iXX0=