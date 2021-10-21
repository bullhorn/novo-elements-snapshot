import { CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Optional, Renderer2, TemplateRef, ViewChild, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { NovoLabelService } from '../../../services/novo-label-service';
import { Helpers } from '../../../utils/Helpers';
import { NovoDropdownElement } from '../../dropdown/Dropdown';
import { NovoDataTableFilterUtils } from '../services/data-table-filter-utils';
import { SortDirection } from '../sort-filter';
import { NovoDataTableSortFilter } from '../sort-filter/sort-filter.directive';
import { DataTableState } from '../state/data-table-state.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/novo-label-service";
import * as i2 from "../state/data-table-state.service";
import * as i3 from "../sort-filter/sort-filter.directive";
import * as i4 from "@angular/cdk/table";
import * as i5 from "@angular/common";
import * as i6 from "../sort-filter/sort-button.component";
import * as i7 from "../../tooltip/Tooltip.directive";
import * as i8 from "../../dropdown/Dropdown";
import * as i9 from "../../button/Button";
import * as i10 from "../../icon/Icon";
import * as i11 from "../../common/typography/label/label.component";
import * as i12 from "../../common/option/optgroup.component";
import * as i13 from "../../common/option/option.component";
import * as i14 from "../../date-picker/DatePicker";
import * as i15 from "@angular/forms";
const _c0 = ["filterInput"];
const _c1 = ["optionFilterInput"];
const _c2 = ["novo-data-table-cell-config", ""];
function NovoDataTableCellHeader_i_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 6);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("bhi-", ctx_r0.labelIcon, " label-icon");
} }
function NovoDataTableCellHeader_novo_sort_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-sort-button", 7);
    i0.ɵɵlistener("sortChange", function NovoDataTableCellHeader_novo_sort_button_4_Template_novo_sort_button_sortChange_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.sort(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("tooltip", ctx_r1.labels.sort)("value", ctx_r1.sortValue);
    i0.ɵɵattribute("data-feature-id", "novo-data-table-sort-" + ctx_r1.id);
} }
function NovoDataTableCellHeader_novo_dropdown_5_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function NovoDataTableCellHeader_novo_dropdown_5_button_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(2); return ctx_r13.clearFilter(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r6.labels.clear, " ");
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_ng_container_1_novo_option_1_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 23);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_ng_container_1_novo_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-option", 21);
    i0.ɵɵlistener("click", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_ng_container_1_novo_option_1_Template_novo_option_click_0_listener() { i0.ɵɵrestoreView(_r22); const option_r19 = ctx.$implicit; const ctx_r21 = i0.ɵɵnextContext(4); return ctx_r21.filterData(option_r19); });
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_ng_container_1_novo_option_1_i_2_Template, 1, 0, "i", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r19 = ctx.$implicit;
    const ctx_r18 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("active", ctx_r18.activeDateFilter === option_r19.label);
    i0.ɵɵattribute("data-automation-id", "novo-data-table-filter-" + option_r19.label);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", option_r19.label, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r18.activeDateFilter === option_r19.label);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_ng_container_1_novo_option_1_Template, 3, 5, "novo-option", 20);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r15.config.filterConfig.options);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_novo_option_2_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 23);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_novo_option_2_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-option", 21);
    i0.ɵɵlistener("click", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_novo_option_2_Template_novo_option_click_0_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(3); return ctx_r24.toggleCustomRange($event, true); });
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_novo_option_2_i_2_Template, 1, 0, "i", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", ctx_r16.labels.customDateRange === ctx_r16.activeDateFilter);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r16.labels.customDateRange, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r16.labels.customDateRange === ctx_r16.activeDateFilter);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelementStart(1, "div", 21);
    i0.ɵɵlistener("click", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_div_3_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r27); const ctx_r26 = i0.ɵɵnextContext(3); return ctx_r26.toggleCustomRange($event, false); });
    i0.ɵɵelement(2, "i", 25);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "novo-date-picker", 26);
    i0.ɵɵlistener("onSelect", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_div_3_Template_novo_date_picker_onSelect_4_listener($event) { i0.ɵɵrestoreView(_r27); const ctx_r28 = i0.ɵɵnextContext(3); return ctx_r28.filterData($event); })("ngModelChange", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_div_3_Template_novo_date_picker_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r27); const ctx_r29 = i0.ɵɵnextContext(3); return ctx_r29.filter = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r17.labels.backToPresetFilters);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r17.filter);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-optgroup");
    i0.ɵɵtemplate(1, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_ng_container_1_Template, 2, 1, "ng-container", 17);
    i0.ɵɵtemplate(2, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_novo_option_2_Template, 3, 4, "novo-option", 18);
    i0.ɵɵtemplate(3, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_div_3_Template, 5, 2, "div", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r7.showCustomRange);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.config.filterConfig.allowCustomRange && !ctx_r7.showCustomRange);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.showCustomRange);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_10_novo_option_1_i_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 23);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_10_novo_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-option", 21);
    i0.ɵɵlistener("click", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_10_novo_option_1_Template_novo_option_click_0_listener() { i0.ɵɵrestoreView(_r34); const option_r31 = ctx.$implicit; const ctx_r33 = i0.ɵɵnextContext(3); return ctx_r33.filterData(option_r31); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_10_novo_option_1_i_3_Template, 1, 0, "i", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r31 = ctx.$implicit;
    const ctx_r30 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", ctx_r30.filter === option_r31);
    i0.ɵɵattribute("data-automation-id", "novo-data-table-filter-" + ((option_r31 == null ? null : option_r31.label) || option_r31));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((option_r31 == null ? null : option_r31.label) || option_r31);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", option_r31.hasOwnProperty("value") ? ctx_r30.filter === option_r31.value : ctx_r30.filter === option_r31);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-optgroup");
    i0.ɵɵtemplate(1, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_10_novo_option_1_Template, 4, 5, "novo-option", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r8.config.filterConfig.options);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_11_novo_option_9_Template(rf, ctx) { if (rf & 1) {
    const _r39 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-option", 36);
    i0.ɵɵlistener("click", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_11_novo_option_9_Template_novo_option_click_0_listener() { i0.ɵɵrestoreView(_r39); const option_r37 = ctx.$implicit; const ctx_r38 = i0.ɵɵnextContext(3); return ctx_r38.toggleSelection(option_r37); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "i");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r37 = ctx.$implicit;
    const ctx_r36 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("hidden", ctx_r36.multiSelectOptionIsHidden(option_r37));
    i0.ɵɵattribute("data-automation-id", "novo-data-table-filter-" + ((option_r37 == null ? null : option_r37.label) || option_r37));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((option_r37 == null ? null : option_r37.label) || option_r37);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("bhi-checkbox-empty", !ctx_r36.isSelected(option_r37, ctx_r36.multiSelectedOptions))("bhi-checkbox-filled", ctx_r36.isSelected(option_r37, ctx_r36.multiSelectedOptions));
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_11_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-optgroup");
    i0.ɵɵelementStart(1, "div", 27);
    i0.ɵɵlistener("keydown", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_11_Template_div_keydown_1_listener($event) { i0.ɵɵrestoreView(_r41); const ctx_r40 = i0.ɵɵnextContext(2); return ctx_r40.multiSelectOptionFilterHandleKeydown($event); });
    i0.ɵɵelementStart(2, "div", 28);
    i0.ɵɵelementStart(3, "input", 29, 30);
    i0.ɵɵlistener("ngModelChange", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_11_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r41); const ctx_r42 = i0.ɵɵnextContext(2); return ctx_r42.optionFilter = $event; })("ngModelChange", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_11_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r41); const ctx_r43 = i0.ɵɵnextContext(2); return ctx_r43.multiSelectOptionFilter($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "i", 31);
    i0.ɵɵelementStart(6, "span", 32);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 33);
    i0.ɵɵtemplate(9, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_11_novo_option_9_Template, 4, 7, "novo-option", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 35);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r9.optionFilter);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("hidden", !ctx_r9.error || !ctx_r9.multiSelectHasVisibleOptions());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r9.labels.selectFilterOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r9.config.filterConfig.options);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("hidden", ctx_r9.multiSelectHasVisibleOptions());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r9.labels.pickerEmpty);
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_12_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c3 = function (a0) { return { $implicit: a0 }; };
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-optgroup");
    i0.ɵɵelementStart(1, "div", 37);
    i0.ɵɵtemplate(2, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_12_ng_container_2_Template, 1, 0, "ng-container", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r10.filterTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c3, ctx_r10.config));
} }
function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_13_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-optgroup");
    i0.ɵɵelementStart(1, "div", 37);
    i0.ɵɵelementStart(2, "input", 39, 40);
    i0.ɵɵlistener("ngModelChange", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_13_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r47); const ctx_r46 = i0.ɵɵnextContext(2); return ctx_r46.filter = $event; })("ngModelChange", function NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_13_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r47); const ctx_r48 = i0.ɵɵnextContext(2); return ctx_r48.filterData($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("type", ctx_r11.config.filterConfig.type)("ngModel", ctx_r11.filter);
} }
function NovoDataTableCellHeader_novo_dropdown_5_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r50 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵelementStart(1, "button", 42);
    i0.ɵɵlistener("click", function NovoDataTableCellHeader_novo_dropdown_5_div_14_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r50); const ctx_r49 = i0.ɵɵnextContext(2); return ctx_r49.cancel(); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 43);
    i0.ɵɵlistener("click", function NovoDataTableCellHeader_novo_dropdown_5_div_14_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r50); const ctx_r51 = i0.ɵɵnextContext(2); return ctx_r51.filterMultiSelect(); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r12.labels.cancel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r12.labels.filters, " ");
} }
function NovoDataTableCellHeader_novo_dropdown_5_Template(rf, ctx) { if (rf & 1) {
    const _r53 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-dropdown", 8);
    i0.ɵɵelementStart(1, "button", 9);
    i0.ɵɵlistener("click", function NovoDataTableCellHeader_novo_dropdown_5_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r53); const ctx_r52 = i0.ɵɵnextContext(); return ctx_r52.focusInput(); });
    i0.ɵɵelementStart(2, "novo-icon");
    i0.ɵɵtext(3, "filter");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 10);
    i0.ɵɵelementStart(5, "novo-label");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, NovoDataTableCellHeader_novo_dropdown_5_button_7_Template, 2, 1, "button", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerStart(8, 12);
    i0.ɵɵtemplate(9, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_9_Template, 4, 3, "novo-optgroup", 13);
    i0.ɵɵtemplate(10, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_10_Template, 2, 1, "novo-optgroup", 13);
    i0.ɵɵtemplate(11, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_11_Template, 12, 6, "novo-optgroup", 13);
    i0.ɵɵtemplate(12, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_12_Template, 3, 4, "novo-optgroup", 13);
    i0.ɵɵtemplate(13, NovoDataTableCellHeader_novo_dropdown_5_novo_optgroup_13_Template, 4, 2, "novo-optgroup", 14);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵtemplate(14, NovoDataTableCellHeader_novo_dropdown_5_div_14_Template, 5, 2, "div", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("tooltip", ctx_r2.labels.filters);
    i0.ɵɵattribute("data-feature-id", "novo-data-table-filter-" + ctx_r2.id);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("filter-active", ctx_r2.filterActive);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.labels.filters);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.filter !== null && ctx_r2.filter !== undefined && ctx_r2.filter !== "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", ctx_r2.config.filterConfig.type);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "date");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "select");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "multi-select");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "custom");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.multiSelect);
} }
function NovoDataTableCellHeader_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r55 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelementStart(1, "span", 45);
    i0.ɵɵlistener("mousedown", function NovoDataTableCellHeader_div_7_Template_span_mousedown_1_listener($event) { i0.ɵɵrestoreView(_r55); const ctx_r54 = i0.ɵɵnextContext(); return ctx_r54.startResize($event); });
    i0.ɵɵtext(2, "\u00A0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class NovoDataTableCellHeader {
    constructor(changeDetectorRef, labels, state, renderer, elementRef, _sort, _cdkColumnDef) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this._sort = _sort;
        this._cdkColumnDef = _cdkColumnDef;
        this.allowMultipleFilters = false;
        this.icon = 'sortable';
        this.filterActive = false;
        this.sortActive = false;
        this.sortValue = SortDirection.NONE;
        this.showCustomRange = false;
        this.multiSelect = false;
        this.multiSelectedOptions = [];
        this.multiSelectedOptionIsHidden = [];
        this.optionFilter = '';
        this.error = false;
        this.subscriptions = [];
        this._rerenderSubscription = state.updates.subscribe((change) => this.checkSortFilterState(change));
    }
    set column(column) {
        this._column = column;
        this.label = column.type === 'action' ? '' : column.label;
        this.labelIcon = column.labelIcon;
        this.config = {
            sortable: !!column.sortable,
            filterable: !!column.filterable,
            resizable: !!column.resizable,
        };
        this.resizable = this.config.resizable;
        const transforms = {};
        if (column.filterable && Helpers.isObject(column.filterable)) {
            this.config.filterConfig = column.filterable;
            if (!this.config.filterConfig.type) {
                this.config.filterConfig = { type: 'text' };
            }
            if (column.filterable.transform) {
                transforms.filter = column.filterable.transform;
            }
        }
        else {
            this.config.filterConfig = { type: 'text' };
        }
        if (column.sortable && Helpers.isObject(column.sortable)) {
            if (column.sortable.transform) {
                transforms.sort = column.sortable.transform;
            }
        }
        if (this.config.filterConfig.type === 'date' && !this.config.filterConfig.options) {
            this.config.filterConfig.options = this.getDefaultDateFilterOptions();
        }
        this.config.transforms = transforms;
    }
    ngOnInit() {
        if (this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }
        this.checkSortFilterState({ filter: this.state.filter, sort: this.state.sort }, true);
        this.multiSelect = this.config.filterConfig && this.config.filterConfig.type ? this.config.filterConfig.type === 'multi-select' : false;
        if (this.multiSelect) {
            this.multiSelectedOptions = this.filter ? [...this.filter] : [];
        }
        this.changeDetectorRef.markForCheck();
    }
    ngOnDestroy() {
        this._rerenderSubscription.unsubscribe();
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
    checkSortFilterState(sortFilterState, initialConfig = false) {
        if (sortFilterState.sort && sortFilterState.sort.id === this.id) {
            this.icon = `sort-${sortFilterState.sort.value}`;
            this.sortValue = sortFilterState.sort.value === 'asc' ? SortDirection.ASC : SortDirection.DESC;
            this.sortActive = true;
        }
        else {
            this.icon = 'sortable';
            this.sortValue = SortDirection.NONE;
            this.sortActive = false;
        }
        const tableFilter = Helpers.convertToArray(sortFilterState.filter);
        const thisFilter = tableFilter.find((filter) => filter && filter.id === this.id);
        if (thisFilter) {
            this.filterActive = true;
            if (initialConfig && thisFilter.type === 'date' && thisFilter.selectedOption) {
                this.activeDateFilter = thisFilter.selectedOption.label || this.labels.customDateRange;
            }
            this.filter = thisFilter.value;
        }
        else {
            this.filterActive = false;
            this.filter = undefined;
            this.activeDateFilter = undefined;
            this.multiSelectedOptions = [];
        }
        if (this.defaultSort && this.id === this.defaultSort.id) {
            this.icon = `sort-${this.defaultSort.value}`;
            this.sortActive = true;
        }
        this.multiSelect = this.config.filterConfig && this.config.filterConfig.type ? this.config.filterConfig.type === 'multi-select' : false;
        if (this.multiSelect) {
            this.multiSelectedOptions = this.filter ? [...this.filter] : [];
            if (this.config.filterConfig.options) {
                if (typeof this.config.filterConfig.options[0] === 'string') {
                    this.multiSelectedOptionIsHidden = this.config.filterConfig.options.map((option) => ({ option, hidden: false }));
                }
                else {
                    this.multiSelectedOptionIsHidden = this.config.filterConfig.options.map((option) => ({
                        option,
                        hidden: false,
                    }));
                }
            }
        }
        this.changeDetectorRef.markForCheck();
    }
    isSelected(option, optionsList) {
        if (optionsList) {
            const optionValue = option.hasOwnProperty('value') ? option.value : option;
            const found = optionsList.find((item) => this.optionPresentCheck(item, optionValue));
            return found !== undefined;
        }
        return false;
    }
    toggleSelection(option) {
        const optionValue = option.hasOwnProperty('value') ? option.value : option;
        const optionIndex = this.multiSelectedOptions.findIndex((item) => this.optionPresentCheck(item, optionValue));
        this.error = false;
        if (optionIndex > -1) {
            this.multiSelectedOptions.splice(optionIndex, 1);
            if (this.optionFilter && !this.getOptionText(option).toLowerCase().startsWith(this.optionFilter.toLowerCase())) {
                this.multiSelectedOptionIsHidden[this.multiSelectedOptionIsHidden.findIndex((record) => record.option === option)].hidden = true;
            }
        }
        else {
            this.multiSelectedOptions.push(optionValue);
        }
    }
    optionPresentCheck(item, optionValue) {
        if (item.hasOwnProperty('value')) {
            return item.value === optionValue;
        }
        else {
            return item === optionValue;
        }
    }
    cancel() {
        this.multiSelectedOptions = this.filter ? [...this.filter] : [];
        this.dropdown.closePanel();
        this.clearOptionFilter();
    }
    filterMultiSelect() {
        if (this.multiSelectedOptions.length === 0 && !this.filter) {
            this.multiSelectHasVisibleOptions() && this.dropdown ? (this.error = true) : null;
        }
        else {
            this.clearOptionFilter();
            const actualFilter = this.multiSelectedOptions.length > 0 ? [...this.multiSelectedOptions] : undefined;
            this.filterData(actualFilter);
            this.dropdown.closePanel();
        }
    }
    multiSelectOptionFilter(optionFilter) {
        this.multiSelectedOptionIsHidden.forEach((record) => {
            if (record.option) {
                record.hidden = !(this.getOptionText(record.option).toLowerCase().startsWith(optionFilter.toLowerCase()) ||
                    this.isSelected(record.option, this.multiSelectedOptions));
            }
        });
    }
    multiSelectOptionIsHidden(option) {
        return this.multiSelectedOptionIsHidden.find((record) => record.option === option).hidden;
    }
    multiSelectHasVisibleOptions() {
        return this.multiSelectedOptionIsHidden.some((record) => !record.hidden);
    }
    getOptionText(option) {
        if (typeof option !== 'object') {
            return option.toString();
        }
        else {
            const opt = option;
            return (opt.label.length > 0 ? opt.label : opt.value).toString();
        }
    }
    multiSelectOptionFilterHandleKeydown(event) {
        if (this.multiSelect) {
            this.error = false;
            if (this.dropdown.panelOpen && event.key === "Escape" /* Escape */) {
                // escape = clear text box and close
                Helpers.swallowEvent(event);
                this.clearOptionFilter();
                this.dropdown.closePanel();
            }
            else if (event.key === "Enter" /* Enter */) {
                Helpers.swallowEvent(event);
                this.filterMultiSelect();
            }
            else if ((event.keyCode >= 65 && event.keyCode <= 90) ||
                (event.keyCode >= 96 && event.keyCode <= 105) ||
                (event.keyCode >= 48 && event.keyCode <= 57)) {
                this.optionFilterInput.nativeElement.focus();
            }
        }
    }
    clearOptionFilter() {
        this.error = false;
        if (this.optionFilter.length > 0) {
            this.optionFilter = '';
            this.multiSelectedOptionIsHidden.forEach((record) => {
                record.hidden = false;
            });
        }
    }
    startResize(mouseDownEvent) {
        mouseDownEvent.preventDefault();
        const minimumWidth = 60 + (this.config.filterable ? 30 : 0) + (this.config.sortable ? 30 : 0);
        const startingWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
        const mouseMoveSubscription = fromEvent(window.document, 'mousemove').subscribe((middleMouseEvent) => {
            const differenceWidth = middleMouseEvent.clientX - mouseDownEvent.clientX;
            let width = startingWidth + differenceWidth;
            if (width < minimumWidth) {
                width = minimumWidth;
            }
            this._column.width = width;
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this._column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this._column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this._column.width}px`);
            this.changeDetectorRef.markForCheck();
            this.resized.next(this._column);
        });
        const mouseUpSubscription = fromEvent(window.document, 'mouseup').subscribe(() => {
            mouseUpSubscription.unsubscribe();
            mouseMoveSubscription.unsubscribe();
            this.changeDetectorRef.markForCheck();
        });
        this.subscriptions.push(mouseMoveSubscription);
        this.subscriptions.push(mouseUpSubscription);
    }
    toggleCustomRange(event, value) {
        Helpers.swallowEvent(event);
        this.showCustomRange = value;
        this.changeDetectorRef.markForCheck();
        this.dropdown.openPanel(); // Ensures that the panel correctly updates to the dynamic size of the dropdown
    }
    focusInput() {
        if (this.filterInput && this.filterInput.nativeElement) {
            setTimeout(() => this.filterInput.nativeElement.focus(), 0);
        }
        if (this.multiSelect && this.dropdown) {
            this.dropdown._handleKeydown = (event) => {
                this.multiSelectOptionFilterHandleKeydown(event);
            };
            setTimeout(() => this.optionFilterInput.nativeElement.focus(), 0);
            this.changeDetectorRef.markForCheck();
        }
    }
    sort() {
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            this.direction = this.getNextSortDirection(this.direction);
            this._sort.sort(this.id, this.direction, this.config.transforms.sort);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    filterData(filter) {
        let actualFilter = NovoDataTableFilterUtils.constructFilter(filter, this.config.filterConfig.type, this.multiSelect);
        const selectedOption = this.config.filterConfig.type === 'date' && filter ? filter : undefined;
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            if (actualFilter === '') {
                actualFilter = undefined;
            }
            this._sort.filter(this.id, this.config.filterConfig.type, actualFilter, this.config.transforms.filter, this.allowMultipleFilters, selectedOption);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    clearFilter() {
        this.filter = undefined;
        this.multiSelectedOptions = [];
        this.activeDateFilter = undefined;
        this.filterData(undefined);
        this.clearOptionFilter();
        this.dropdown.closePanel();
    }
    getNextSortDirection(direction) {
        if (!direction) {
            return 'asc';
        }
        if (direction === 'asc') {
            return 'desc';
        }
        return 'asc';
    }
    getDefaultDateFilterOptions() {
        const opts = [
            { label: this.labels.past1Day, min: -1, max: 0 },
            { label: this.labels.past7Days, min: -7, max: 0 },
            { label: this.labels.past30Days, min: -30, max: 0 },
            { label: this.labels.past90Days, min: -90, max: 0 },
            { label: this.labels.past1Year, min: -366, max: 0 },
            { label: this.labels.next1Day, min: 0, max: 1 },
            { label: this.labels.next7Days, min: 0, max: 7 },
            { label: this.labels.next30Days, min: 0, max: 30 },
            { label: this.labels.next90Days, min: 0, max: 90 },
            { label: this.labels.next1Year, min: 0, max: 366 },
        ];
        return opts;
    }
}
NovoDataTableCellHeader.ɵfac = function NovoDataTableCellHeader_Factory(t) { return new (t || NovoDataTableCellHeader)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i2.DataTableState), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i3.NovoDataTableSortFilter, 8), i0.ɵɵdirectiveInject(i4.CdkColumnDef, 8)); };
NovoDataTableCellHeader.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDataTableCellHeader, selectors: [["", "novo-data-table-cell-config", ""]], viewQuery: function NovoDataTableCellHeader_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
        i0.ɵɵviewQuery(NovoDropdownElement, true);
        i0.ɵɵviewQuery(_c1, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.filterInput = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dropdown = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.optionFilterInput = _t.first);
    } }, hostVars: 2, hostBindings: function NovoDataTableCellHeader_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("keydown", function NovoDataTableCellHeader_keydown_HostBindingHandler($event) { return ctx.multiSelectOptionFilterHandleKeydown($event); });
    } if (rf & 2) {
        i0.ɵɵclassProp("resizable", ctx.resizable);
    } }, inputs: { defaultSort: "defaultSort", allowMultipleFilters: "allowMultipleFilters", resized: "resized", filterTemplate: "filterTemplate", column: ["novo-data-table-cell-config", "column"] }, attrs: _c2, decls: 8, vars: 5, consts: [["data-automation-id", "novo-data-table-header-icon", 3, "class", 4, "ngIf"], ["data-automation-id", "novo-data-table-label"], ["data-automation-id", "novo-data-table-sort", "tooltipPosition", "right", 3, "tooltip", "value", "sortChange", 4, "ngIf"], ["side", "right", "parentScrollSelector", ".novo-data-table-container", "containerClass", "data-table-dropdown", "data-automation-id", "novo-data-table-filter", 4, "ngIf"], [1, "spacer"], ["class", "data-table-header-resizable", 4, "ngIf"], ["data-automation-id", "novo-data-table-header-icon"], ["data-automation-id", "novo-data-table-sort", "tooltipPosition", "right", 3, "tooltip", "value", "sortChange"], ["side", "right", "parentScrollSelector", ".novo-data-table-container", "containerClass", "data-table-dropdown", "data-automation-id", "novo-data-table-filter"], ["type", "button", "theme", "icon", "tooltipPosition", "right", 1, "filter-button", 3, "tooltip", "click"], [1, "header"], ["theme", "dialogue", "color", "negative", "size", "small", "icon", "times", "data-automation-id", "novo-data-table-filter-clear", 3, "click", 4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], ["class", "footer", 4, "ngIf"], ["theme", "dialogue", "color", "negative", "size", "small", "icon", "times", "data-automation-id", "novo-data-table-filter-clear", 3, "click"], [4, "ngIf"], [3, "active", "click", 4, "ngIf"], ["class", "calendar-container", 4, "ngIf"], [3, "active", "click", 4, "ngFor", "ngForOf"], [3, "click"], ["class", "bhi-check", 4, "ngIf"], [1, "bhi-check"], [1, "calendar-container"], [1, "bhi-previous"], ["range", "true", 3, "ngModel", "onSelect", "ngModelChange"], [1, "dropdown-list-filter", 3, "keydown"], ["keepOpen", "true", 1, "filter-search"], ["data-automation-id", "novo-data-table-multi-select-option-filter-input", 3, "ngModel", "ngModelChange"], ["optionFilterInput", ""], [1, "bhi-search"], [1, "error-text", 3, "hidden"], [1, "dropdown-list-options"], [3, "hidden", "click", 4, "ngFor", "ngForOf"], [1, "filter-null-results", 3, "hidden"], [3, "hidden", "click"], [1, "filter-search"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["data-automation-id", "novo-data-table-filter-input", 3, "type", "ngModel", "ngModelChange"], ["filterInput", ""], [1, "footer"], ["theme", "dialogue", "color", "dark", "data-automation-id", "novo-data-table-multi-select-cancel", 3, "click"], ["theme", "dialogue", "color", "positive", "data-automation-id", "novo-data-table-multi-select-filter", 3, "click"], [1, "data-table-header-resizable"], [3, "mousedown"]], template: function NovoDataTableCellHeader_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoDataTableCellHeader_i_0_Template, 1, 3, "i", 0);
        i0.ɵɵelementStart(1, "label", 1);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div");
        i0.ɵɵtemplate(4, NovoDataTableCellHeader_novo_sort_button_4_Template, 1, 3, "novo-sort-button", 2);
        i0.ɵɵtemplate(5, NovoDataTableCellHeader_novo_dropdown_5_Template, 15, 12, "novo-dropdown", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(6, "div", 4);
        i0.ɵɵtemplate(7, NovoDataTableCellHeader_div_7_Template, 3, 0, "div", 5);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.labelIcon);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.label);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.config.sortable);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.config.filterable);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.config.resizable);
    } }, directives: [i5.NgIf, i6.NovoDataTableSortButton, i7.TooltipDirective, i8.NovoDropdownElement, i9.NovoButtonElement, i10.NovoIconComponent, i11.NovoLabel, i5.NgSwitch, i5.NgSwitchCase, i5.NgSwitchDefault, i12.NovoOptgroup, i5.NgForOf, i13.NovoOption, i14.NovoDatePickerElement, i15.NgControlStatus, i15.NgModel, i15.DefaultValueAccessor, i5.NgTemplateOutlet], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDataTableCellHeader, [{
        type: Component,
        args: [{
                selector: '[novo-data-table-cell-config]',
                template: `
    <i class="bhi-{{ labelIcon }} label-icon" *ngIf="labelIcon" data-automation-id="novo-data-table-header-icon"></i>
    <label data-automation-id="novo-data-table-label">{{ label }}</label>
    <div>
      <novo-sort-button
        *ngIf="config.sortable"
        data-automation-id="novo-data-table-sort"
        tooltipPosition="right"
        [tooltip]="labels.sort"
        [attr.data-feature-id]="'novo-data-table-sort-' + this.id"
        (sortChange)="sort()"
        [value]="sortValue"
      ></novo-sort-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="right"
        parentScrollSelector=".novo-data-table-container"
        containerClass="data-table-dropdown"
        data-automation-id="novo-data-table-filter"
      >
        <button
          class="filter-button"
          type="button"
          theme="icon"
          (click)="focusInput()"
          tooltipPosition="right"
          [tooltip]="labels.filters"
          [attr.data-feature-id]="'novo-data-table-filter-' + this.id"
        >
          <novo-icon [class.filter-active]="filterActive">filter</novo-icon>
        </button>
        <div class="header">
          <novo-label>{{ labels.filters }}</novo-label>
          <button
            theme="dialogue"
            color="negative"
            size="small"
            icon="times"
            (click)="clearFilter()"
            *ngIf="filter !== null && filter !== undefined && filter !== ''"
            data-automation-id="novo-data-table-filter-clear"
          >
            {{ labels.clear }}
          </button>
        </div>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <novo-optgroup *ngSwitchCase="'date'">
            <ng-container *ngIf="!showCustomRange">
              <novo-option
                [class.active]="activeDateFilter === option.label"
                *ngFor="let option of config.filterConfig.options"
                (click)="filterData(option)"
                [attr.data-automation-id]="'novo-data-table-filter-' + option.label"
              >
                {{ option.label }} <i class="bhi-check" *ngIf="activeDateFilter === option.label"></i>
              </novo-option>
            </ng-container>
            <novo-option
              [class.active]="labels.customDateRange === activeDateFilter"
              (click)="toggleCustomRange($event, true)"
              *ngIf="config.filterConfig.allowCustomRange && !showCustomRange"
            >
              {{ labels.customDateRange }} <i class="bhi-check" *ngIf="labels.customDateRange === activeDateFilter"></i>
            </novo-option>
            <div class="calendar-container" *ngIf="showCustomRange">
              <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
              <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" range="true"></novo-date-picker>
            </div>
          </novo-optgroup>
          <novo-optgroup *ngSwitchCase="'select'">
            <novo-option
              [class.active]="filter === option"
              *ngFor="let option of config.filterConfig.options"
              (click)="filterData(option)"
              [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)"
            >
              <span>{{ option?.label || option }}</span>
              <i class="bhi-check" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option"></i>
            </novo-option>
          </novo-optgroup>
          <novo-optgroup *ngSwitchCase="'multi-select'">
            <div class="dropdown-list-filter" (keydown)="multiSelectOptionFilterHandleKeydown($event)">
              <div class="filter-search" keepOpen="true">
                <input
                  [(ngModel)]="optionFilter"
                  (ngModelChange)="multiSelectOptionFilter($event)"
                  #optionFilterInput
                  data-automation-id="novo-data-table-multi-select-option-filter-input"
                />
                <i class="bhi-search"></i>
                <span class="error-text" [hidden]="!error || !multiSelectHasVisibleOptions()">{{ labels.selectFilterOptions }}</span>
              </div>
            </div>
            <div class="dropdown-list-options">
              <novo-option
                *ngFor="let option of config.filterConfig.options"
                [hidden]="multiSelectOptionIsHidden(option)"
                (click)="toggleSelection(option)"
                [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)"
              >
                <span>{{ option?.label || option }}</span>
                <i
                  [class.bhi-checkbox-empty]="!isSelected(option, multiSelectedOptions)"
                  [class.bhi-checkbox-filled]="isSelected(option, multiSelectedOptions)"
                ></i>
              </novo-option>
            </div>
            <p class="filter-null-results" [hidden]="multiSelectHasVisibleOptions()">{{ labels.pickerEmpty }}</p>
          </novo-optgroup>
          <novo-optgroup *ngSwitchCase="'custom'">
            <div class="filter-search">
              <ng-container *ngTemplateOutlet="filterTemplate; context: { $implicit: config }"></ng-container>
            </div>
          </novo-optgroup>
          <novo-optgroup *ngSwitchDefault>
            <div class="filter-search">
              <input
                [type]="config.filterConfig.type"
                [(ngModel)]="filter"
                (ngModelChange)="filterData($event)"
                #filterInput
                data-automation-id="novo-data-table-filter-input"
              />
            </div>
          </novo-optgroup>
        </ng-container>
        <div class="footer" *ngIf="multiSelect">
          <button theme="dialogue" color="dark" (click)="cancel()" data-automation-id="novo-data-table-multi-select-cancel">
            {{ labels.cancel }}
          </button>
          <button theme="dialogue" color="positive" (click)="filterMultiSelect()" data-automation-id="novo-data-table-multi-select-filter">
            {{ labels.filters }}
          </button>
        </div>
      </novo-dropdown>
    </div>
    <div class="spacer"></div>
    <div class="data-table-header-resizable" *ngIf="config.resizable"><span (mousedown)="startResize($event)">&nbsp;</span></div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NovoLabelService }, { type: i2.DataTableState }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i3.NovoDataTableSortFilter, decorators: [{
                type: Optional
            }] }, { type: i4.CdkColumnDef, decorators: [{
                type: Optional
            }] }]; }, { filterInput: [{
            type: ViewChild,
            args: ['filterInput']
        }], dropdown: [{
            type: ViewChild,
            args: [NovoDropdownElement]
        }], optionFilterInput: [{
            type: ViewChild,
            args: ['optionFilterInput']
        }], defaultSort: [{
            type: Input
        }], allowMultipleFilters: [{
            type: Input
        }], resized: [{
            type: Input
        }], filterTemplate: [{
            type: Input
        }], resizable: [{
            type: HostBinding,
            args: ['class.resizable']
        }], column: [{
            type: Input,
            args: ['novo-data-table-cell-config']
        }], multiSelectOptionFilterHandleKeydown: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1oZWFkZXItY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0YS10YWJsZS9jZWxsLWhlYWRlcnMvZGF0YS10YWJsZS1oZWFkZXItY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUdMLFFBQVEsRUFDUixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFTOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSy9ELHVCQUFpSDs7O0lBQTlHLGtFQUFzQzs7OztJQUd2QywyQ0FRb0I7SUFGbEIsc05BQXFCO0lBRXRCLGlCQUFtQjs7O0lBSmxC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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrQ29sdW1uRGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICdwcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy91dGlscyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25FbGVtZW50IH0gZnJvbSAnLi4vLi4vZHJvcGRvd24vRHJvcGRvd24nO1xuaW1wb3J0IHtcbiAgSURhdGFUYWJsZUNoYW5nZUV2ZW50LFxuICBJRGF0YVRhYmxlQ29sdW1uLFxuICBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyQ29uZmlnLFxuICBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uLFxuICBJRGF0YVRhYmxlQ29sdW1uU29ydENvbmZpZyxcbiAgSURhdGFUYWJsZVNvcnRGaWx0ZXIsXG59IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUZpbHRlclV0aWxzIH0gZnJvbSAnLi4vc2VydmljZXMvZGF0YS10YWJsZS1maWx0ZXItdXRpbHMnO1xuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJy4uL3NvcnQtZmlsdGVyJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVTb3J0RmlsdGVyIH0gZnJvbSAnLi4vc29ydC1maWx0ZXIvc29ydC1maWx0ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW25vdm8tZGF0YS10YWJsZS1jZWxsLWNvbmZpZ10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpIGNsYXNzPVwiYmhpLXt7IGxhYmVsSWNvbiB9fSBsYWJlbC1pY29uXCIgKm5nSWY9XCJsYWJlbEljb25cIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtaGVhZGVyLWljb25cIj48L2k+XG4gICAgPGxhYmVsIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1sYWJlbFwiPnt7IGxhYmVsIH19PC9sYWJlbD5cbiAgICA8ZGl2PlxuICAgICAgPG5vdm8tc29ydC1idXR0b25cbiAgICAgICAgKm5nSWY9XCJjb25maWcuc29ydGFibGVcIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtc29ydFwiXG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgW3Rvb2x0aXBdPVwibGFiZWxzLnNvcnRcIlxuICAgICAgICBbYXR0ci5kYXRhLWZlYXR1cmUtaWRdPVwiJ25vdm8tZGF0YS10YWJsZS1zb3J0LScgKyB0aGlzLmlkXCJcbiAgICAgICAgKHNvcnRDaGFuZ2UpPVwic29ydCgpXCJcbiAgICAgICAgW3ZhbHVlXT1cInNvcnRWYWx1ZVwiXG4gICAgICA+PC9ub3ZvLXNvcnQtYnV0dG9uPlxuICAgICAgPG5vdm8tZHJvcGRvd25cbiAgICAgICAgKm5nSWY9XCJjb25maWcuZmlsdGVyYWJsZVwiXG4gICAgICAgIHNpZGU9XCJyaWdodFwiXG4gICAgICAgIHBhcmVudFNjcm9sbFNlbGVjdG9yPVwiLm5vdm8tZGF0YS10YWJsZS1jb250YWluZXJcIlxuICAgICAgICBjb250YWluZXJDbGFzcz1cImRhdGEtdGFibGUtZHJvcGRvd25cIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtZmlsdGVyXCJcbiAgICAgID5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzPVwiZmlsdGVyLWJ1dHRvblwiXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAoY2xpY2spPVwiZm9jdXNJbnB1dCgpXCJcbiAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJyaWdodFwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwibGFiZWxzLmZpbHRlcnNcIlxuICAgICAgICAgIFthdHRyLmRhdGEtZmVhdHVyZS1pZF09XCInbm92by1kYXRhLXRhYmxlLWZpbHRlci0nICsgdGhpcy5pZFwiXG4gICAgICAgID5cbiAgICAgICAgICA8bm92by1pY29uIFtjbGFzcy5maWx0ZXItYWN0aXZlXT1cImZpbHRlckFjdGl2ZVwiPmZpbHRlcjwvbm92by1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgIDxub3ZvLWxhYmVsPnt7IGxhYmVscy5maWx0ZXJzIH19PC9ub3ZvLWxhYmVsPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHRoZW1lPVwiZGlhbG9ndWVcIlxuICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgaWNvbj1cInRpbWVzXCJcbiAgICAgICAgICAgIChjbGljayk9XCJjbGVhckZpbHRlcigpXCJcbiAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyICE9PSBudWxsICYmIGZpbHRlciAhPT0gdW5kZWZpbmVkICYmIGZpbHRlciAhPT0gJydcIlxuICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWZpbHRlci1jbGVhclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgbGFiZWxzLmNsZWFyIH19XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJjb25maWcuZmlsdGVyQ29uZmlnLnR5cGVcIj5cbiAgICAgICAgICA8bm92by1vcHRncm91cCAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXNob3dDdXN0b21SYW5nZVwiPlxuICAgICAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZURhdGVGaWx0ZXIgPT09IG9wdGlvbi5sYWJlbFwiXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJmaWx0ZXJEYXRhKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1kYXRhLXRhYmxlLWZpbHRlci0nICsgb3B0aW9uLmxhYmVsXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fSA8aSBjbGFzcz1cImJoaS1jaGVja1wiICpuZ0lmPVwiYWN0aXZlRGF0ZUZpbHRlciA9PT0gb3B0aW9uLmxhYmVsXCI+PC9pPlxuICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJsYWJlbHMuY3VzdG9tRGF0ZVJhbmdlID09PSBhY3RpdmVEYXRlRmlsdGVyXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUN1c3RvbVJhbmdlKCRldmVudCwgdHJ1ZSlcIlxuICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5maWx0ZXJDb25maWcuYWxsb3dDdXN0b21SYW5nZSAmJiAhc2hvd0N1c3RvbVJhbmdlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3sgbGFiZWxzLmN1c3RvbURhdGVSYW5nZSB9fSA8aSBjbGFzcz1cImJoaS1jaGVja1wiICpuZ0lmPVwibGFiZWxzLmN1c3RvbURhdGVSYW5nZSA9PT0gYWN0aXZlRGF0ZUZpbHRlclwiPjwvaT5cbiAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItY29udGFpbmVyXCIgKm5nSWY9XCJzaG93Q3VzdG9tUmFuZ2VcIj5cbiAgICAgICAgICAgICAgPGRpdiAoY2xpY2spPVwidG9nZ2xlQ3VzdG9tUmFuZ2UoJGV2ZW50LCBmYWxzZSlcIj48aSBjbGFzcz1cImJoaS1wcmV2aW91c1wiPjwvaT57eyBsYWJlbHMuYmFja1RvUHJlc2V0RmlsdGVycyB9fTwvZGl2PlxuICAgICAgICAgICAgICA8bm92by1kYXRlLXBpY2tlciAob25TZWxlY3QpPVwiZmlsdGVyRGF0YSgkZXZlbnQpXCIgWyhuZ01vZGVsKV09XCJmaWx0ZXJcIiByYW5nZT1cInRydWVcIj48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nU3dpdGNoQ2FzZT1cIidzZWxlY3QnXCI+XG4gICAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJmaWx0ZXIgPT09IG9wdGlvblwiXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImZpbHRlckRhdGEob3B0aW9uKVwiXG4gICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1kYXRhLXRhYmxlLWZpbHRlci0nICsgKG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19PC9zcGFuPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jaGVja1wiICpuZ0lmPVwib3B0aW9uLmhhc093blByb3BlcnR5KCd2YWx1ZScpID8gZmlsdGVyID09PSBvcHRpb24udmFsdWUgOiBmaWx0ZXIgPT09IG9wdGlvblwiPjwvaT5cbiAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgPC9ub3ZvLW9wdGdyb3VwPlxuICAgICAgICAgIDxub3ZvLW9wdGdyb3VwICpuZ1N3aXRjaENhc2U9XCInbXVsdGktc2VsZWN0J1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLWxpc3QtZmlsdGVyXCIgKGtleWRvd24pPVwibXVsdGlTZWxlY3RPcHRpb25GaWx0ZXJIYW5kbGVLZXlkb3duKCRldmVudClcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlci1zZWFyY2hcIiBrZWVwT3Blbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwib3B0aW9uRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm11bHRpU2VsZWN0T3B0aW9uRmlsdGVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgI29wdGlvbkZpbHRlcklucHV0XG4gICAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtbXVsdGktc2VsZWN0LW9wdGlvbi1maWx0ZXItaW5wdXRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktc2VhcmNoXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItdGV4dFwiIFtoaWRkZW5dPVwiIWVycm9yIHx8ICFtdWx0aVNlbGVjdEhhc1Zpc2libGVPcHRpb25zKClcIj57eyBsYWJlbHMuc2VsZWN0RmlsdGVyT3B0aW9ucyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1saXN0LW9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwibXVsdGlTZWxlY3RPcHRpb25Jc0hpZGRlbihvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1kYXRhLXRhYmxlLWZpbHRlci0nICsgKG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3Bhbj57eyBvcHRpb24/LmxhYmVsIHx8IG9wdGlvbiB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aVxuICAgICAgICAgICAgICAgICAgW2NsYXNzLmJoaS1jaGVja2JveC1lbXB0eV09XCIhaXNTZWxlY3RlZChvcHRpb24sIG11bHRpU2VsZWN0ZWRPcHRpb25zKVwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3MuYmhpLWNoZWNrYm94LWZpbGxlZF09XCJpc1NlbGVjdGVkKG9wdGlvbiwgbXVsdGlTZWxlY3RlZE9wdGlvbnMpXCJcbiAgICAgICAgICAgICAgICA+PC9pPlxuICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImZpbHRlci1udWxsLXJlc3VsdHNcIiBbaGlkZGVuXT1cIm11bHRpU2VsZWN0SGFzVmlzaWJsZU9wdGlvbnMoKVwiPnt7IGxhYmVscy5waWNrZXJFbXB0eSB9fTwvcD5cbiAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nU3dpdGNoQ2FzZT1cIidjdXN0b20nXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZmlsdGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBjb25maWcgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9ub3ZvLW9wdGdyb3VwPlxuICAgICAgICAgIDxub3ZvLW9wdGdyb3VwICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBbdHlwZV09XCJjb25maWcuZmlsdGVyQ29uZmlnLnR5cGVcIlxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJmaWx0ZXJEYXRhKCRldmVudClcIlxuICAgICAgICAgICAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1maWx0ZXItaW5wdXRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9ub3ZvLW9wdGdyb3VwPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvb3RlclwiICpuZ0lmPVwibXVsdGlTZWxlY3RcIj5cbiAgICAgICAgICA8YnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiBjb2xvcj1cImRhcmtcIiAoY2xpY2spPVwiY2FuY2VsKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtbXVsdGktc2VsZWN0LWNhbmNlbFwiPlxuICAgICAgICAgICAge3sgbGFiZWxzLmNhbmNlbCB9fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIGNvbG9yPVwicG9zaXRpdmVcIiAoY2xpY2spPVwiZmlsdGVyTXVsdGlTZWxlY3QoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1tdWx0aS1zZWxlY3QtZmlsdGVyXCI+XG4gICAgICAgICAgICB7eyBsYWJlbHMuZmlsdGVycyB9fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbm92by1kcm9wZG93bj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRhdGEtdGFibGUtaGVhZGVyLXJlc2l6YWJsZVwiICpuZ0lmPVwiY29uZmlnLnJlc2l6YWJsZVwiPjxzcGFuIChtb3VzZWRvd24pPVwic3RhcnRSZXNpemUoJGV2ZW50KVwiPiZuYnNwOzwvc3Bhbj48L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVDZWxsSGVhZGVyPFQ+IGltcGxlbWVudHMgSURhdGFUYWJsZVNvcnRGaWx0ZXIsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnZmlsdGVySW5wdXQnKVxuICBmaWx0ZXJJbnB1dDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChOb3ZvRHJvcGRvd25FbGVtZW50KVxuICBkcm9wZG93bjogTm92b0Ryb3Bkb3duRWxlbWVudDtcbiAgQFZpZXdDaGlsZCgnb3B0aW9uRmlsdGVySW5wdXQnKVxuICBvcHRpb25GaWx0ZXJJbnB1dDogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKVxuICBkZWZhdWx0U29ydDogeyBpZDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH07XG5cbiAgQElucHV0KClcbiAgYWxsb3dNdWx0aXBsZUZpbHRlcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICByZXNpemVkOiBFdmVudEVtaXR0ZXI8SURhdGFUYWJsZUNvbHVtbjxUPj47XG4gIEBJbnB1dCgpXG4gIGZpbHRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnJlc2l6YWJsZScpXG4gIHB1YmxpYyByZXNpemFibGU6IGJvb2xlYW47XG5cbiAgQElucHV0KCdub3ZvLWRhdGEtdGFibGUtY2VsbC1jb25maWcnKVxuICBzZXQgY29sdW1uKGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPikge1xuICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmxhYmVsID0gY29sdW1uLnR5cGUgPT09ICdhY3Rpb24nID8gJycgOiBjb2x1bW4ubGFiZWw7XG4gICAgdGhpcy5sYWJlbEljb24gPSBjb2x1bW4ubGFiZWxJY29uO1xuXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBzb3J0YWJsZTogISFjb2x1bW4uc29ydGFibGUsXG4gICAgICBmaWx0ZXJhYmxlOiAhIWNvbHVtbi5maWx0ZXJhYmxlLFxuICAgICAgcmVzaXphYmxlOiAhIWNvbHVtbi5yZXNpemFibGUsXG4gICAgfTtcbiAgICB0aGlzLnJlc2l6YWJsZSA9IHRoaXMuY29uZmlnLnJlc2l6YWJsZTtcblxuICAgIGNvbnN0IHRyYW5zZm9ybXM6IHsgZmlsdGVyPzogRnVuY3Rpb247IHNvcnQ/OiBGdW5jdGlvbiB9ID0ge307XG5cbiAgICBpZiAoY29sdW1uLmZpbHRlcmFibGUgJiYgSGVscGVycy5pc09iamVjdChjb2x1bW4uZmlsdGVyYWJsZSkpIHtcbiAgICAgIHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZyA9IGNvbHVtbi5maWx0ZXJhYmxlIGFzIElEYXRhVGFibGVDb2x1bW5GaWx0ZXJDb25maWc7XG4gICAgICBpZiAoIXRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy50eXBlKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZyA9IHsgdHlwZTogJ3RleHQnIH07XG4gICAgICB9XG4gICAgICBpZiAoKGNvbHVtbi5maWx0ZXJhYmxlIGFzIElEYXRhVGFibGVDb2x1bW5GaWx0ZXJDb25maWcpLnRyYW5zZm9ybSkge1xuICAgICAgICB0cmFuc2Zvcm1zLmZpbHRlciA9IChjb2x1bW4uZmlsdGVyYWJsZSBhcyBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyQ29uZmlnKS50cmFuc2Zvcm07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZyA9IHsgdHlwZTogJ3RleHQnIH07XG4gICAgfVxuXG4gICAgaWYgKGNvbHVtbi5zb3J0YWJsZSAmJiBIZWxwZXJzLmlzT2JqZWN0KGNvbHVtbi5zb3J0YWJsZSkpIHtcbiAgICAgIGlmICgoY29sdW1uLnNvcnRhYmxlIGFzIElEYXRhVGFibGVDb2x1bW5Tb3J0Q29uZmlnKS50cmFuc2Zvcm0pIHtcbiAgICAgICAgdHJhbnNmb3Jtcy5zb3J0ID0gKGNvbHVtbi5zb3J0YWJsZSBhcyBJRGF0YVRhYmxlQ29sdW1uU29ydENvbmZpZykudHJhbnNmb3JtO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcudHlwZSA9PT0gJ2RhdGUnICYmICF0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9ucykge1xuICAgICAgdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnMgPSB0aGlzLmdldERlZmF1bHREYXRlRmlsdGVyT3B0aW9ucygpO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnLnRyYW5zZm9ybXMgPSB0cmFuc2Zvcm1zO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVyZW5kZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBjaGFuZ2VUaW1lb3V0OiBhbnk7XG5cbiAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBpY29uOiBzdHJpbmcgPSAnc29ydGFibGUnO1xuICBwdWJsaWMgbGFiZWxJY29uOiBzdHJpbmc7XG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuICBwdWJsaWMgZmlsdGVyOiBhbnk7XG4gIHB1YmxpYyBkaXJlY3Rpb246IHN0cmluZztcbiAgcHVibGljIGZpbHRlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc29ydEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc29ydFZhbHVlOiBTb3J0RGlyZWN0aW9uID0gU29ydERpcmVjdGlvbi5OT05FO1xuICBwdWJsaWMgc2hvd0N1c3RvbVJhbmdlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBhY3RpdmVEYXRlRmlsdGVyOiBzdHJpbmc7XG4gIHB1YmxpYyBjb25maWc6IHtcbiAgICBzb3J0YWJsZTogYm9vbGVhbjtcbiAgICBmaWx0ZXJhYmxlOiBib29sZWFuO1xuICAgIHJlc2l6YWJsZTogYm9vbGVhbjtcbiAgICB0cmFuc2Zvcm1zPzogeyBmaWx0ZXI/OiBGdW5jdGlvbjsgc29ydD86IEZ1bmN0aW9uIH07XG4gICAgZmlsdGVyQ29uZmlnPzogSURhdGFUYWJsZUNvbHVtbkZpbHRlckNvbmZpZztcbiAgfTtcbiAgcHVibGljIG11bHRpU2VsZWN0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBtdWx0aVNlbGVjdGVkT3B0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuICBwcml2YXRlIG11bHRpU2VsZWN0ZWRPcHRpb25Jc0hpZGRlbjogQXJyYXk8eyBvcHRpb246IHN0cmluZyB8IElEYXRhVGFibGVDb2x1bW5GaWx0ZXJPcHRpb247IGhpZGRlbjogYm9vbGVhbiB9PiA9IFtdO1xuICBwdWJsaWMgb3B0aW9uRmlsdGVyOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIGVycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdGF0ZTogRGF0YVRhYmxlU3RhdGU8VD4sXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgX3NvcnQ6IE5vdm9EYXRhVGFibGVTb3J0RmlsdGVyPFQ+LFxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfY2RrQ29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICkge1xuICAgIHRoaXMuX3JlcmVuZGVyU3Vic2NyaXB0aW9uID0gc3RhdGUudXBkYXRlcy5zdWJzY3JpYmUoKGNoYW5nZTogSURhdGFUYWJsZUNoYW5nZUV2ZW50KSA9PiB0aGlzLmNoZWNrU29ydEZpbHRlclN0YXRlKGNoYW5nZSkpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jZGtDb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLl9jZGtDb2x1bW5EZWYubmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrU29ydEZpbHRlclN0YXRlKHsgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlciwgc29ydDogdGhpcy5zdGF0ZS5zb3J0IH0sIHRydWUpO1xuXG4gICAgdGhpcy5tdWx0aVNlbGVjdCA9IHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZyAmJiB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcudHlwZSA/IHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy50eXBlID09PSAnbXVsdGktc2VsZWN0JyA6IGZhbHNlO1xuICAgIGlmICh0aGlzLm11bHRpU2VsZWN0KSB7XG4gICAgICB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25zID0gdGhpcy5maWx0ZXIgPyBbLi4udGhpcy5maWx0ZXJdIDogW107XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVyZW5kZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNoZWNrU29ydEZpbHRlclN0YXRlKHNvcnRGaWx0ZXJTdGF0ZTogSURhdGFUYWJsZUNoYW5nZUV2ZW50LCBpbml0aWFsQ29uZmlnOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoc29ydEZpbHRlclN0YXRlLnNvcnQgJiYgc29ydEZpbHRlclN0YXRlLnNvcnQuaWQgPT09IHRoaXMuaWQpIHtcbiAgICAgIHRoaXMuaWNvbiA9IGBzb3J0LSR7c29ydEZpbHRlclN0YXRlLnNvcnQudmFsdWV9YDtcbiAgICAgIHRoaXMuc29ydFZhbHVlID0gc29ydEZpbHRlclN0YXRlLnNvcnQudmFsdWUgPT09ICdhc2MnID8gU29ydERpcmVjdGlvbi5BU0MgOiBTb3J0RGlyZWN0aW9uLkRFU0M7XG4gICAgICB0aGlzLnNvcnRBY3RpdmUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmljb24gPSAnc29ydGFibGUnO1xuICAgICAgdGhpcy5zb3J0VmFsdWUgPSBTb3J0RGlyZWN0aW9uLk5PTkU7XG4gICAgICB0aGlzLnNvcnRBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB0YWJsZUZpbHRlciA9IEhlbHBlcnMuY29udmVydFRvQXJyYXkoc29ydEZpbHRlclN0YXRlLmZpbHRlcik7XG4gICAgY29uc3QgdGhpc0ZpbHRlciA9IHRhYmxlRmlsdGVyLmZpbmQoKGZpbHRlcikgPT4gZmlsdGVyICYmIGZpbHRlci5pZCA9PT0gdGhpcy5pZCk7XG5cbiAgICBpZiAodGhpc0ZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXJBY3RpdmUgPSB0cnVlO1xuICAgICAgaWYgKGluaXRpYWxDb25maWcgJiYgdGhpc0ZpbHRlci50eXBlID09PSAnZGF0ZScgJiYgdGhpc0ZpbHRlci5zZWxlY3RlZE9wdGlvbikge1xuICAgICAgICB0aGlzLmFjdGl2ZURhdGVGaWx0ZXIgPSB0aGlzRmlsdGVyLnNlbGVjdGVkT3B0aW9uLmxhYmVsIHx8IHRoaXMubGFiZWxzLmN1c3RvbURhdGVSYW5nZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsdGVyID0gdGhpc0ZpbHRlci52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWx0ZXJBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5hY3RpdmVEYXRlRmlsdGVyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWZhdWx0U29ydCAmJiB0aGlzLmlkID09PSB0aGlzLmRlZmF1bHRTb3J0LmlkKSB7XG4gICAgICB0aGlzLmljb24gPSBgc29ydC0ke3RoaXMuZGVmYXVsdFNvcnQudmFsdWV9YDtcbiAgICAgIHRoaXMuc29ydEFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMubXVsdGlTZWxlY3QgPSB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcgJiYgdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLnR5cGUgPyB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcudHlwZSA9PT0gJ211bHRpLXNlbGVjdCcgOiBmYWxzZTtcbiAgICBpZiAodGhpcy5tdWx0aVNlbGVjdCkge1xuICAgICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuZmlsdGVyID8gWy4uLnRoaXMuZmlsdGVyXSA6IFtdO1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnNbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9uSXNIaWRkZW4gPSAodGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnMgYXMgc3RyaW5nW10pLm1hcChcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgb3B0aW9uOiBzdHJpbmcsXG4gICAgICAgICAgICApOiB7XG4gICAgICAgICAgICAgIG9wdGlvbjogc3RyaW5nO1xuICAgICAgICAgICAgICBoaWRkZW46IGJvb2xlYW47XG4gICAgICAgICAgICB9ID0+ICh7IG9wdGlvbiwgaGlkZGVuOiBmYWxzZSB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbklzSGlkZGVuID0gKHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zIGFzIElEYXRhVGFibGVDb2x1bW5GaWx0ZXJPcHRpb25bXSkubWFwKFxuICAgICAgICAgICAgKG9wdGlvbjogSURhdGFUYWJsZUNvbHVtbkZpbHRlck9wdGlvbik6IHsgb3B0aW9uOiBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uOyBoaWRkZW46IGJvb2xlYW4gfSA9PiAoe1xuICAgICAgICAgICAgICBvcHRpb24sXG4gICAgICAgICAgICAgIGhpZGRlbjogZmFsc2UsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZChvcHRpb24sIG9wdGlvbnNMaXN0KSB7XG4gICAgaWYgKG9wdGlvbnNMaXN0KSB7XG4gICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvbjtcblxuICAgICAgY29uc3QgZm91bmQgPSBvcHRpb25zTGlzdC5maW5kKChpdGVtKSA9PiB0aGlzLm9wdGlvblByZXNlbnRDaGVjayhpdGVtLCBvcHRpb25WYWx1ZSkpO1xuICAgICAgcmV0dXJuIGZvdW5kICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVTZWxlY3Rpb24ob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBvcHRpb24uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPyBvcHRpb24udmFsdWUgOiBvcHRpb247XG5cbiAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbnMuZmluZEluZGV4KChpdGVtKSA9PiB0aGlzLm9wdGlvblByZXNlbnRDaGVjayhpdGVtLCBvcHRpb25WYWx1ZSkpO1xuICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcbiAgICBpZiAob3B0aW9uSW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9ucy5zcGxpY2Uob3B0aW9uSW5kZXgsIDEpO1xuICAgICAgaWYgKHRoaXMub3B0aW9uRmlsdGVyICYmICF0aGlzLmdldE9wdGlvblRleHQob3B0aW9uKS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgodGhpcy5vcHRpb25GaWx0ZXIudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9uSXNIaWRkZW5bdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9uSXNIaWRkZW4uZmluZEluZGV4KChyZWNvcmQpID0+IHJlY29yZC5vcHRpb24gPT09IG9wdGlvbildLmhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbnMucHVzaChvcHRpb25WYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9wdGlvblByZXNlbnRDaGVjayhpdGVtLCBvcHRpb25WYWx1ZSk6IGJvb2xlYW4ge1xuICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KCd2YWx1ZScpKSB7XG4gICAgICByZXR1cm4gaXRlbS52YWx1ZSA9PT0gb3B0aW9uVmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpdGVtID09PSBvcHRpb25WYWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLmZpbHRlciA/IFsuLi50aGlzLmZpbHRlcl0gOiBbXTtcbiAgICB0aGlzLmRyb3Bkb3duLmNsb3NlUGFuZWwoKTtcbiAgICB0aGlzLmNsZWFyT3B0aW9uRmlsdGVyKCk7XG4gIH1cblxuICBwdWJsaWMgZmlsdGVyTXVsdGlTZWxlY3QoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbnMubGVuZ3RoID09PSAwICYmICF0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5tdWx0aVNlbGVjdEhhc1Zpc2libGVPcHRpb25zKCkgJiYgdGhpcy5kcm9wZG93biA/ICh0aGlzLmVycm9yID0gdHJ1ZSkgOiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsZWFyT3B0aW9uRmlsdGVyKCk7XG4gICAgICBjb25zdCBhY3R1YWxGaWx0ZXIgPSB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA+IDAgPyBbLi4udGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9uc10gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmZpbHRlckRhdGEoYWN0dWFsRmlsdGVyKTtcbiAgICAgIHRoaXMuZHJvcGRvd24uY2xvc2VQYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtdWx0aVNlbGVjdE9wdGlvbkZpbHRlcihvcHRpb25GaWx0ZXI6IHN0cmluZykge1xuICAgIHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbklzSGlkZGVuLmZvckVhY2goKHJlY29yZCkgPT4ge1xuICAgICAgaWYgKHJlY29yZC5vcHRpb24pIHtcbiAgICAgICAgcmVjb3JkLmhpZGRlbiA9ICEoXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb25UZXh0KHJlY29yZC5vcHRpb24pLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChvcHRpb25GaWx0ZXIudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWQocmVjb3JkLm9wdGlvbiwgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9ucylcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBtdWx0aVNlbGVjdE9wdGlvbklzSGlkZGVuKG9wdGlvbjogc3RyaW5nIHwgSURhdGFUYWJsZUNvbHVtbkZpbHRlck9wdGlvbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25Jc0hpZGRlbi5maW5kKChyZWNvcmQpID0+IHJlY29yZC5vcHRpb24gPT09IG9wdGlvbikuaGlkZGVuO1xuICB9XG5cbiAgcHVibGljIG11bHRpU2VsZWN0SGFzVmlzaWJsZU9wdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbklzSGlkZGVuLnNvbWUoKHJlY29yZCkgPT4gIXJlY29yZC5oaWRkZW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25UZXh0KG9wdGlvbjogc3RyaW5nIHwgSURhdGFUYWJsZUNvbHVtbkZpbHRlck9wdGlvbik6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb24gIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9uLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9wdCA9IG9wdGlvbiBhcyBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uO1xuICAgICAgcmV0dXJuIChvcHQubGFiZWwubGVuZ3RoID4gMCA/IG9wdC5sYWJlbCA6IG9wdC52YWx1ZSkudG9TdHJpbmcoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG11bHRpU2VsZWN0T3B0aW9uRmlsdGVySGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLm11bHRpU2VsZWN0KSB7XG4gICAgICB0aGlzLmVycm9yID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5kcm9wZG93bi5wYW5lbE9wZW4gJiYgZXZlbnQua2V5ID09PSBLZXkuRXNjYXBlKSB7XG4gICAgICAgIC8vIGVzY2FwZSA9IGNsZWFyIHRleHQgYm94IGFuZCBjbG9zZVxuICAgICAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgICAgIHRoaXMuY2xlYXJPcHRpb25GaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5jbG9zZVBhbmVsKCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gS2V5LkVudGVyKSB7XG4gICAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICAgICAgdGhpcy5maWx0ZXJNdWx0aVNlbGVjdCgpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKGV2ZW50LmtleUNvZGUgPj0gNjUgJiYgZXZlbnQua2V5Q29kZSA8PSA5MCkgfHxcbiAgICAgICAgKGV2ZW50LmtleUNvZGUgPj0gOTYgJiYgZXZlbnQua2V5Q29kZSA8PSAxMDUpIHx8XG4gICAgICAgIChldmVudC5rZXlDb2RlID49IDQ4ICYmIGV2ZW50LmtleUNvZGUgPD0gNTcpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5vcHRpb25GaWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhck9wdGlvbkZpbHRlcigpIHtcbiAgICB0aGlzLmVycm9yID0gZmFsc2U7XG4gICAgaWYgKHRoaXMub3B0aW9uRmlsdGVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMub3B0aW9uRmlsdGVyID0gJyc7XG4gICAgICB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25Jc0hpZGRlbi5mb3JFYWNoKChyZWNvcmQpID0+IHtcbiAgICAgICAgcmVjb3JkLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXJ0UmVzaXplKG1vdXNlRG93bkV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgbW91c2VEb3duRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBtaW5pbXVtV2lkdGggPSA2MCArICh0aGlzLmNvbmZpZy5maWx0ZXJhYmxlID8gMzAgOiAwKSArICh0aGlzLmNvbmZpZy5zb3J0YWJsZSA/IDMwIDogMCk7XG4gICAgY29uc3Qgc3RhcnRpbmdXaWR0aDogbnVtYmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgY29uc3QgbW91c2VNb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LmRvY3VtZW50LCAnbW91c2Vtb3ZlJykuc3Vic2NyaWJlKChtaWRkbGVNb3VzZUV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkaWZmZXJlbmNlV2lkdGg6IG51bWJlciA9IG1pZGRsZU1vdXNlRXZlbnQuY2xpZW50WCAtIG1vdXNlRG93bkV2ZW50LmNsaWVudFg7XG4gICAgICBsZXQgd2lkdGg6IG51bWJlciA9IHN0YXJ0aW5nV2lkdGggKyBkaWZmZXJlbmNlV2lkdGg7XG4gICAgICBpZiAod2lkdGggPCBtaW5pbXVtV2lkdGgpIHtcbiAgICAgICAgd2lkdGggPSBtaW5pbXVtV2lkdGg7XG4gICAgICB9XG4gICAgICB0aGlzLl9jb2x1bW4ud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtaW4td2lkdGgnLCBgJHt0aGlzLl9jb2x1bW4ud2lkdGh9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtYXgtd2lkdGgnLCBgJHt0aGlzLl9jb2x1bW4ud2lkdGh9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke3RoaXMuX2NvbHVtbi53aWR0aH1weGApO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMucmVzaXplZC5uZXh0KHRoaXMuX2NvbHVtbik7XG4gICAgfSk7XG5cbiAgICBjb25zdCBtb3VzZVVwU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LmRvY3VtZW50LCAnbW91c2V1cCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBtb3VzZVVwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICBtb3VzZU1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gobW91c2VNb3ZlU3Vic2NyaXB0aW9uKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChtb3VzZVVwU3Vic2NyaXB0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVDdXN0b21SYW5nZShldmVudDogRXZlbnQsIHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2hvd0N1c3RvbVJhbmdlID0gdmFsdWU7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmRyb3Bkb3duLm9wZW5QYW5lbCgpOyAvLyBFbnN1cmVzIHRoYXQgdGhlIHBhbmVsIGNvcnJlY3RseSB1cGRhdGVzIHRvIHRoZSBkeW5hbWljIHNpemUgb2YgdGhlIGRyb3Bkb3duXG4gIH1cblxuICBwdWJsaWMgZm9jdXNJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5maWx0ZXJJbnB1dCAmJiB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCksIDApO1xuICAgIH1cbiAgICBpZiAodGhpcy5tdWx0aVNlbGVjdCAmJiB0aGlzLmRyb3Bkb3duKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLl9oYW5kbGVLZXlkb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlTZWxlY3RPcHRpb25GaWx0ZXJIYW5kbGVLZXlkb3duKGV2ZW50KTtcbiAgICAgIH07XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub3B0aW9uRmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpLCAwKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNvcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hhbmdlVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2hhbmdlVGltZW91dCk7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmdldE5leHRTb3J0RGlyZWN0aW9uKHRoaXMuZGlyZWN0aW9uKTtcbiAgICAgIHRoaXMuX3NvcnQuc29ydCh0aGlzLmlkLCB0aGlzLmRpcmVjdGlvbiwgdGhpcy5jb25maWcudHJhbnNmb3Jtcy5zb3J0KTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWx0ZXJEYXRhKGZpbHRlcj86IGFueSk6IHZvaWQge1xuICAgIGxldCBhY3R1YWxGaWx0ZXIgPSBOb3ZvRGF0YVRhYmxlRmlsdGVyVXRpbHMuY29uc3RydWN0RmlsdGVyKGZpbHRlciwgdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLnR5cGUsIHRoaXMubXVsdGlTZWxlY3QpO1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLnR5cGUgPT09ICdkYXRlJyAmJiBmaWx0ZXIgPyBmaWx0ZXIgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAodGhpcy5jaGFuZ2VUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5jaGFuZ2VUaW1lb3V0KTtcbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChhY3R1YWxGaWx0ZXIgPT09ICcnKSB7XG4gICAgICAgIGFjdHVhbEZpbHRlciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NvcnQuZmlsdGVyKFxuICAgICAgICB0aGlzLmlkLFxuICAgICAgICB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcudHlwZSxcbiAgICAgICAgYWN0dWFsRmlsdGVyLFxuICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2Zvcm1zLmZpbHRlcixcbiAgICAgICAgdGhpcy5hbGxvd011bHRpcGxlRmlsdGVycyxcbiAgICAgICAgc2VsZWN0ZWRPcHRpb24sXG4gICAgICApO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9LCAzMDApO1xuICB9XG5cbiAgcHVibGljIGNsZWFyRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLmFjdGl2ZURhdGVGaWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWx0ZXJEYXRhKHVuZGVmaW5lZCk7XG4gICAgdGhpcy5jbGVhck9wdGlvbkZpbHRlcigpO1xuICAgIHRoaXMuZHJvcGRvd24uY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROZXh0U29ydERpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiAnYXNjJztcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2FzYycpIHtcbiAgICAgIHJldHVybiAnZGVzYyc7XG4gICAgfVxuICAgIHJldHVybiAnYXNjJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdERhdGVGaWx0ZXJPcHRpb25zKCk6IElEYXRhVGFibGVDb2x1bW5GaWx0ZXJPcHRpb25bXSB7XG4gICAgY29uc3Qgb3B0czogSURhdGFUYWJsZUNvbHVtbkZpbHRlck9wdGlvbltdID0gW1xuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFEYXksIG1pbjogLTEsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDdEYXlzLCBtaW46IC03LCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QzMERheXMsIG1pbjogLTMwLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3Q5MERheXMsIG1pbjogLTkwLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QxWWVhciwgbWluOiAtMzY2LCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQxRGF5LCBtaW46IDAsIG1heDogMSB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDdEYXlzLCBtaW46IDAsIG1heDogNyB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDMwRGF5cywgbWluOiAwLCBtYXg6IDMwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0OTBEYXlzLCBtaW46IDAsIG1heDogOTAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQxWWVhciwgbWluOiAwLCBtYXg6IDM2NiB9LFxuICAgIF07XG4gICAgcmV0dXJuIG9wdHM7XG4gIH1cbn1cbiJdfQ==