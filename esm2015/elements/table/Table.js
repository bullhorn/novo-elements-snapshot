// NG2
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
import { debounceTime } from 'rxjs/operators';
// APP
import { CollectionEvent } from '../../services/data-provider/CollectionEvent';
import { PagedArrayCollection } from '../../services/data-provider/PagedArrayCollection';
import { NovoLabelService } from '../../services/novo-label-service';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { Helpers } from '../../utils/Helpers';
import { notify } from '../../utils/notifier/notifier.util';
import { ControlFactory, ReadOnlyControl } from './../form/FormControls';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../../utils/form-utils/FormUtils";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
import * as i5 from "./extras/pagination/Pagination";
import * as i6 from "../loading/Loading";
import * as i7 from "../toast/Toast";
import * as i8 from "../form/Form";
import * as i9 from "../button/Button";
import * as i10 from "../form/extras/checkbox/Checkbox";
import * as i11 from "../tooltip/Tooltip.directive";
import * as i12 from "./extras/th-orderable/ThOrderable";
import * as i13 from "./extras/th-sortable/ThSortable";
import * as i14 from "../dropdown/Dropdown";
import * as i15 from "./extras/keep-filter-focus/KeepFilterFocus";
import * as i16 from "./extras/table-filter/TableFilter";
import * as i17 from "../date-picker/DatePicker";
import * as i18 from "./extras/table-cell/TableCell";
import * as i19 from "../form/Control";
import * as i20 from "./extras/row-details/RowDetails";
const _c0 = ["filterInput"];
function NovoTableElement_header_0_novo_pagination_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-pagination", 6);
    i0.ɵɵlistener("pageChange", function NovoTableElement_header_0_novo_pagination_3_Template_novo_pagination_pageChange_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.dataProvider.page = $event; })("itemsPerPageChange", function NovoTableElement_header_0_novo_pagination_3_Template_novo_pagination_itemsPerPageChange_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.dataProvider.pageSize = $event; })("onPageChange", function NovoTableElement_header_0_novo_pagination_3_Template_novo_pagination_onPageChange_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.onPageChange($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("rowOptions", ctx_r4.config.paging.rowOptions)("disablePageSelection", ctx_r4.config.paging.disablePageSelection)("page", ctx_r4.dataProvider.page)("itemsPerPage", ctx_r4.dataProvider.pageSize)("totalItems", ctx_r4.dataProvider.total);
} }
function NovoTableElement_header_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header");
    i0.ɵɵprojection(1);
    i0.ɵɵelementStart(2, "div", 4);
    i0.ɵɵtemplate(3, NovoTableElement_header_0_novo_pagination_3_Template, 1, 5, "novo-pagination", 5);
    i0.ɵɵprojection(4, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.config.paging && !(ctx_r0.dataProvider.isEmpty() && !ctx_r0.dataProvider.isFiltered()));
} }
function NovoTableElement_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "novo-loading");
    i0.ɵɵelementEnd();
} }
function NovoTableElement_novo_toast_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-toast", 8);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("theme", ctx_r2.toast == null ? null : ctx_r2.toast.theme)("icon", ctx_r2.toast == null ? null : ctx_r2.toast.icon)("message", ctx_r2.toast == null ? null : ctx_r2.toast.message);
} }
function NovoTableElement_div_3_thead_3_th_2_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_thead_3_th_2_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(4); return ctx_r21.expandAllOnPage(ctx_r21.config.expandAll); });
    i0.ɵɵelementEnd();
} }
function NovoTableElement_div_3_thead_3_th_2_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_thead_3_th_2_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r23 = i0.ɵɵnextContext(4); return ctx_r23.expandAllOnPage(ctx_r23.config.expandAll); });
    i0.ɵɵelementEnd();
} }
function NovoTableElement_div_3_thead_3_th_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtemplate(1, NovoTableElement_div_3_thead_3_th_2_button_1_Template, 1, 0, "button", 21);
    i0.ɵɵtemplate(2, NovoTableElement_div_3_thead_3_th_2_button_2_Template, 1, 0, "button", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r16.config.expandAll);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r16.config.expandAll);
} }
function NovoTableElement_div_3_thead_3_th_3_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 25);
    i0.ɵɵelementStart(1, "novo-checkbox", 26);
    i0.ɵɵlistener("ngModelChange", function NovoTableElement_div_3_thead_3_th_3_Template_novo_checkbox_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r26); const ctx_r25 = i0.ɵɵnextContext(3); return ctx_r25.master = $event; })("ngModelChange", function NovoTableElement_div_3_thead_3_th_3_Template_novo_checkbox_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r26); const ctx_r27 = i0.ɵɵnextContext(3); return ctx_r27.selectPage($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r17.master)("indeterminate", ctx_r17.pageSelected.length > 0 && ctx_r17.pageSelected.length < ctx_r17.pagedData.length)("tooltip", ctx_r17.master ? ctx_r17.labels.deselectAll : ctx_r17.labels.selectAllOnPage);
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵelement(1, "i", 34);
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r28 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r30 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("tooltip", ctx_r30.labels.sort)("ngClass", column_r28.sort || "");
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r41); const column_r28 = i0.ɵɵnextContext(4).$implicit; const ctx_r39 = i0.ɵɵnextContext(3); return ctx_r39.onFilterClear(column_r28); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r36 = i0.ɵɵnextContext(7);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r36.labels.clear, " ");
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_input_6_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 44, 45);
    i0.ɵɵlistener("onFilterChange", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_input_6_Template_input_onFilterChange_0_listener($event) { i0.ɵɵrestoreView(_r44); const ctx_r43 = i0.ɵɵnextContext(7); return ctx_r43.onFilterKeywords($event); })("ngModelChange", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_input_6_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r44); const column_r28 = i0.ɵɵnextContext(4).$implicit; return column_r28.freetextFilter = $event; });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r28 = i0.ɵɵnextContext(4).$implicit;
    i0.ɵɵproperty("novoTableFilter", column_r28)("ngModel", column_r28.freetextFilter);
    i0.ɵɵattribute("id", column_r28.name + "-input");
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_item_7_i_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 48);
} }
const _c1 = function (a0) { return { active: a0 }; };
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_item_7_Template(rf, ctx) { if (rf & 1) {
    const _r52 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "item", 46);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_item_7_Template_item_click_0_listener() { i0.ɵɵrestoreView(_r52); const option_r48 = ctx.$implicit; const column_r28 = i0.ɵɵnextContext(4).$implicit; const ctx_r50 = i0.ɵɵnextContext(3); return ctx_r50.onFilterClick(column_r28, option_r48); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_item_7_i_3_Template, 1, 0, "i", 47);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r48 = ctx.$implicit;
    const column_r28 = i0.ɵɵnextContext(4).$implicit;
    const ctx_r38 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c1, ctx_r38.isFilterActive(column_r28, option_r48)));
    i0.ɵɵattribute("data-automation-id", ctx_r38.getOptionDataAutomationId(option_r48));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((option_r48 == null ? null : option_r48.label) || option_r48);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r38.isFilterActive(column_r28, option_r48));
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "list");
    i0.ɵɵelementStart(1, "item", 38);
    i0.ɵɵelementStart(2, "div", 39);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_button_5_Template, 2, 1, "button", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_input_6_Template, 2, 3, "input", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_item_7_Template, 4, 6, "item", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r28 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r33 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r33.labels.filters);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", column_r28.filter || column_r28.filter === false);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!column_r28.allowCustomTextOption);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", column_r28.options);
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_3_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_3_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r59); const column_r28 = i0.ɵɵnextContext(4).$implicit; const ctx_r57 = i0.ɵɵnextContext(3); return ctx_r57.onFilterClear(column_r28); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r55 = i0.ɵɵnextContext(7);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r55.labels.clear, " ");
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_3_Template(rf, ctx) { if (rf & 1) {
    const _r61 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "list");
    i0.ɵɵelementStart(1, "item", 38);
    i0.ɵɵelementStart(2, "div", 39);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_3_button_5_Template, 2, 1, "button", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 44, 45);
    i0.ɵɵlistener("onFilterChange", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_3_Template_input_onFilterChange_6_listener($event) { i0.ɵɵrestoreView(_r61); const ctx_r60 = i0.ɵɵnextContext(6); return ctx_r60.onFilterChange($event); })("ngModelChange", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_3_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r61); const column_r28 = i0.ɵɵnextContext(3).$implicit; return column_r28.filter = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r28 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r34 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r34.labels.filters);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", column_r28.filter);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("novoTableFilter", column_r28)("ngModel", column_r28.filter);
    i0.ɵɵattribute("id", column_r28.name + "-input");
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_1_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r71 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_1_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r71); const column_r28 = i0.ɵɵnextContext(5).$implicit; const ctx_r69 = i0.ɵɵnextContext(3); return ctx_r69.onFilterClear(column_r28); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r68 = i0.ɵɵnextContext(8);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r68.labels.clear, " ");
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "item", 38);
    i0.ɵɵelementStart(1, "div", 39);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_1_button_4_Template, 2, 1, "button", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r28 = i0.ɵɵnextContext(4).$implicit;
    const ctx_r65 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r65.labels.filters);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", column_r28.filter);
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_2_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 48);
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_2_Template(rf, ctx) { if (rf & 1) {
    const _r77 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "item", 56);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_2_Template_item_click_0_listener() { i0.ɵɵrestoreView(_r77); const option_r73 = ctx.$implicit; const column_r28 = i0.ɵɵnextContext(4).$implicit; const ctx_r75 = i0.ɵɵnextContext(3); return ctx_r75.onFilterClick(column_r28, option_r73); });
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_2_i_2_Template, 1, 0, "i", 47);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r73 = ctx.$implicit;
    const column_r28 = i0.ɵɵnextContext(4).$implicit;
    const ctx_r66 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c1, ctx_r66.isFilterActive(column_r28, option_r73)))("keepOpen", option_r73.range)("hidden", column_r28.calenderShow);
    i0.ɵɵattribute("data-automation-id", (option_r73 == null ? null : option_r73.label) || option_r73);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", (option_r73 == null ? null : option_r73.label) || option_r73, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r66.isFilterActive(column_r28, option_r73));
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_Template(rf, ctx) { if (rf & 1) {
    const _r81 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "list");
    i0.ɵɵtemplate(1, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_1_Template, 5, 2, "item", 49);
    i0.ɵɵtemplate(2, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_item_2_Template, 3, 8, "item", 50);
    i0.ɵɵelementStart(3, "div", 51);
    i0.ɵɵelementStart(4, "div", 52);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_Template_div_click_4_listener() { i0.ɵɵrestoreView(_r81); const column_r28 = i0.ɵɵnextContext(3).$implicit; return column_r28.calenderShow = false; });
    i0.ɵɵelement(5, "i", 53);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "novo-date-picker", 54, 55);
    i0.ɵɵlistener("onSelect", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_Template_novo_date_picker_onSelect_7_listener($event) { i0.ɵɵrestoreView(_r81); const column_r28 = i0.ɵɵnextContext(3).$implicit; const ctx_r82 = i0.ɵɵnextContext(3); return ctx_r82.onCalenderSelect(column_r28, $event); })("ngModelChange", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_Template_novo_date_picker_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r81); const column_r28 = i0.ɵɵnextContext(3).$implicit; return column_r28.filter = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r28 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r35 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !column_r28.calenderShow);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", column_r28.options);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("hidden", !column_r28.calenderShow);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r35.labels.backToPresetFilters);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", column_r28.filter);
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_Template(rf, ctx) { if (rf & 1) {
    const _r88 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-dropdown", 36);
    i0.ɵɵlistener("toggled", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_Template_novo_dropdown_toggled_0_listener($event) { i0.ɵɵrestoreView(_r88); const column_r28 = i0.ɵɵnextContext(2).$implicit; const ctx_r87 = i0.ɵɵnextContext(3); return ctx_r87.onDropdownToggled($event, column_r28.name); });
    i0.ɵɵelementStart(1, "button", 37);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r88); const ctx_r90 = i0.ɵɵnextContext(5); return ctx_r90.focusInput(); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_2_Template, 8, 4, "list", 0);
    i0.ɵɵtemplate(3, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_3_Template, 8, 5, "list", 0);
    i0.ɵɵtemplate(4, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_list_4_Template, 9, 5, "list", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r28 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r31 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("filtered", column_r28.filter || column_r28.filter === false);
    i0.ɵɵproperty("tooltip", ctx_r31.labels.filters);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ((column_r28 == null ? null : column_r28.options == null ? null : column_r28.options.length) || (column_r28 == null ? null : column_r28.originalOptions == null ? null : column_r28.originalOptions.length)) && (column_r28 == null ? null : column_r28.type) !== "date" && ctx_r31.toggledDropdownMap[column_r28.name]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !((column_r28 == null ? null : column_r28.options == null ? null : column_r28.options.length) || (column_r28 == null ? null : column_r28.originalOptions == null ? null : column_r28.originalOptions.length)) && ctx_r31.toggledDropdownMap[column_r28.name]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (column_r28 == null ? null : column_r28.options == null ? null : column_r28.options.length) && (column_r28 == null ? null : column_r28.type) === "date" && ctx_r31.toggledDropdownMap[column_r28.name]);
} }
function NovoTableElement_div_3_thead_3_th_4_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r93 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵelementStart(1, "div", 30);
    i0.ɵɵlistener("onSortChange", function NovoTableElement_div_3_thead_3_th_4_div_1_Template_div_onSortChange_1_listener($event) { i0.ɵɵrestoreView(_r93); const ctx_r92 = i0.ɵɵnextContext(4); return ctx_r92.onSortChange($event); });
    i0.ɵɵelementStart(2, "label");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NovoTableElement_div_3_thead_3_th_4_div_1_div_4_Template, 3, 2, "div", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, NovoTableElement_div_3_thead_3_th_4_div_1_novo_dropdown_5_Template, 5, 6, "novo-dropdown", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r28 = i0.ɵɵnextContext().$implicit;
    const ctx_r29 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("data-automation-id", column_r28.id || column_r28.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r29.config.sorting !== false && column_r28.sorting !== false ? "sortable" : "")("novoThSortable", ctx_r29.config)("column", column_r28);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(column_r28.title || column_r28.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r29.config.sorting !== false && column_r28.sorting !== false);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r29.config.filtering !== false && column_r28.filtering !== false);
} }
const _c2 = function (a0, a1, a2) { return { "mass-action": a0, actions: a1, preview: a2 }; };
function NovoTableElement_div_3_thead_3_th_4_Template(rf, ctx) { if (rf & 1) {
    const _r96 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 27);
    i0.ɵɵlistener("onOrderChange", function NovoTableElement_div_3_thead_3_th_4_Template_th_onOrderChange_0_listener($event) { i0.ɵɵrestoreView(_r96); const ctx_r95 = i0.ɵɵnextContext(3); return ctx_r95.onOrderChange($event); });
    i0.ɵɵtemplate(1, NovoTableElement_div_3_thead_3_th_4_div_1_Template, 6, 7, "div", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r28 = ctx.$implicit;
    const ctx_r18 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(4, _c2, (ctx_r18.config == null ? null : ctx_r18.config.rowSelectionStyle) === "checkbox", (column_r28 == null ? null : column_r28.actions == null ? null : column_r28.actions.items == null ? null : column_r28.actions.items.length) > 0, (column_r28 == null ? null : column_r28.name) === "preview"))("novoThOrderable", column_r28)("hidden", ctx_r18.isColumnHidden(column_r28));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !column_r28.hideHeader);
} }
function NovoTableElement_div_3_thead_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "thead");
    i0.ɵɵelementStart(1, "tr", 16);
    i0.ɵɵtemplate(2, NovoTableElement_div_3_thead_3_th_2_Template, 3, 2, "th", 17);
    i0.ɵɵtemplate(3, NovoTableElement_div_3_thead_3_th_3_Template, 2, 3, "th", 18);
    i0.ɵɵtemplate(4, NovoTableElement_div_3_thead_3_th_4_Template, 2, 8, "th", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r9.config.hasDetails);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.config.rowSelectionStyle === "checkbox");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r9.columns);
} }
function NovoTableElement_div_3_tbody_4_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r100 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 59);
    i0.ɵɵelementStart(1, "td", 60);
    i0.ɵɵtext(2);
    i0.ɵɵelementStart(3, "a", 61);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_tbody_4_tr_1_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r100); const ctx_r99 = i0.ɵɵnextContext(3); return ctx_r99.selectAll(true); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r97 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r97.labels.selectedRecords(ctx_r97.selected.length), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r97.labels.totalRecords(ctx_r97.dataProvider.total));
} }
function NovoTableElement_div_3_tbody_4_ng_template_2_td_1_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r111 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 68);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_tbody_4_ng_template_2_td_1_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r111); const row_r101 = i0.ɵɵnextContext(2).$implicit; return row_r101._expanded = !row_r101._expanded; });
    i0.ɵɵelementEnd();
} }
function NovoTableElement_div_3_tbody_4_ng_template_2_td_1_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r114 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 69);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_tbody_4_ng_template_2_td_1_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r114); const row_r101 = i0.ɵɵnextContext(2).$implicit; return row_r101._expanded = !row_r101._expanded; });
    i0.ɵɵelementEnd();
} }
function NovoTableElement_div_3_tbody_4_ng_template_2_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 20);
    i0.ɵɵtemplate(1, NovoTableElement_div_3_tbody_4_ng_template_2_td_1_button_1_Template, 1, 0, "button", 66);
    i0.ɵɵtemplate(2, NovoTableElement_div_3_tbody_4_ng_template_2_td_1_button_2_Template, 1, 0, "button", 67);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r101 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !row_r101._expanded);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", row_r101._expanded);
} }
function NovoTableElement_div_3_tbody_4_ng_template_2_td_2_Template(rf, ctx) { if (rf & 1) {
    const _r118 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 70);
    i0.ɵɵelementStart(1, "novo-checkbox", 71);
    i0.ɵɵlistener("ngModelChange", function NovoTableElement_div_3_tbody_4_ng_template_2_td_2_Template_novo_checkbox_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r118); const row_r101 = i0.ɵɵnextContext().$implicit; return row_r101._selected = $event; })("ngModelChange", function NovoTableElement_div_3_tbody_4_ng_template_2_td_2_Template_novo_checkbox_ngModelChange_1_listener() { i0.ɵɵrestoreView(_r118); const row_r101 = i0.ɵɵnextContext().$implicit; const ctx_r119 = i0.ɵɵnextContext(3); return ctx_r119.rowSelectHandler(row_r101); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r101 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", row_r101._selected);
} }
function NovoTableElement_div_3_tbody_4_ng_template_2_td_3_novo_table_cell_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-table-cell", 75);
} if (rf & 2) {
    const column_r122 = i0.ɵɵnextContext().$implicit;
    const ctx_r126 = i0.ɵɵnextContext();
    const row_r101 = ctx_r126.$implicit;
    const i_r102 = ctx_r126.index;
    const ctx_r123 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("hasEditor", ctx_r123.editable)("column", column_r122)("row", row_r101)("form", ctx_r123.getRowControlForm(i_r102));
} }
function NovoTableElement_div_3_tbody_4_ng_template_2_td_3_novo_control_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-control", 76);
} if (rf & 2) {
    const column_r122 = i0.ɵɵnextContext().$implicit;
    const ctx_r127 = i0.ɵɵnextContext();
    const i_r102 = ctx_r127.index;
    const row_r101 = ctx_r127.$implicit;
    const ctx_r124 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("form", ctx_r124.getRowControlForm(i_r102))("control", row_r101.controls[column_r122.name]);
} }
function NovoTableElement_div_3_tbody_4_ng_template_2_td_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 72);
    i0.ɵɵtemplate(1, NovoTableElement_div_3_tbody_4_ng_template_2_td_3_novo_table_cell_1_Template, 1, 4, "novo-table-cell", 73);
    i0.ɵɵtemplate(2, NovoTableElement_div_3_tbody_4_ng_template_2_td_3_novo_control_2_Template, 1, 2, "novo-control", 74);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r122 = ctx.$implicit;
    const row_r101 = i0.ɵɵnextContext().$implicit;
    const ctx_r105 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("novo-form-row", ctx_r105.editable);
    i0.ɵɵproperty("hidden", ctx_r105.isColumnHidden(column_r122));
    i0.ɵɵattribute("data-automation-id", column_r122.id || column_r122.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", row_r101._editing && !row_r101._editing[column_r122.name]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", row_r101._editing && row_r101._editing[column_r122.name]);
} }
function NovoTableElement_div_3_tbody_4_ng_template_2_tr_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 77);
    i0.ɵɵelement(1, "td", 20);
    i0.ɵɵelementStart(2, "td");
    i0.ɵɵelement(3, "novo-row-details", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r101 = i0.ɵɵnextContext().$implicit;
    const ctx_r106 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("hidden", !row_r101._expanded);
    i0.ɵɵattribute("data-automation-id", "details-row-" + row_r101.id);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("colspan", ctx_r106.config.rowSelectionStyle === "checkbox" ? ctx_r106.columns.length + 1 : ctx_r106.columns.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("data", row_r101)("renderer", ctx_r106.config.detailsRenderer);
} }
function NovoTableElement_div_3_tbody_4_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r132 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 62);
    i0.ɵɵlistener("click", function NovoTableElement_div_3_tbody_4_ng_template_2_Template_tr_click_0_listener() { i0.ɵɵrestoreView(_r132); const row_r101 = ctx.$implicit; const ctx_r131 = i0.ɵɵnextContext(3); return ctx_r131.rowClickHandler(row_r101); });
    i0.ɵɵtemplate(1, NovoTableElement_div_3_tbody_4_ng_template_2_td_1_Template, 3, 2, "td", 17);
    i0.ɵɵtemplate(2, NovoTableElement_div_3_tbody_4_ng_template_2_td_2_Template, 2, 1, "td", 63);
    i0.ɵɵtemplate(3, NovoTableElement_div_3_tbody_4_ng_template_2_td_3_Template, 3, 6, "td", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NovoTableElement_div_3_tbody_4_ng_template_2_tr_4_Template, 4, 5, "tr", 65);
} if (rf & 2) {
    const row_r101 = ctx.$implicit;
    const ctx_r98 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", row_r101.id === ctx_r98.activeId);
    i0.ɵɵproperty("ngClass", row_r101.customClass || "")("id", ctx_r98.name + "-" + row_r101[ctx_r98.rowIdentifier]);
    i0.ɵɵattribute("data-automation-id", row_r101.id);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r98.config.hasDetails);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r98.config.rowSelectionStyle === "checkbox");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r98.columns);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r98.config.hasDetails);
} }
function NovoTableElement_div_3_tbody_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody");
    i0.ɵɵtemplate(1, NovoTableElement_div_3_tbody_4_tr_1_Template, 5, 2, "tr", 57);
    i0.ɵɵtemplate(2, NovoTableElement_div_3_tbody_4_ng_template_2_Template, 5, 9, "ng-template", 58);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.config.rowSelectionStyle === "checkbox" && ctx_r10.showSelectAllMessage && ctx_r10.config.selectAllEnabled);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r10.rows);
} }
function NovoTableElement_div_3_tbody_5_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 82);
    i0.ɵɵelementStart(1, "h4");
    i0.ɵɵelement(2, "i", 83);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r134 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r134.labels.emptyTableMessage, "");
} }
function NovoTableElement_div_3_tbody_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 79);
    i0.ɵɵelementStart(1, "tr");
    i0.ɵɵelementStart(2, "td", 60);
    i0.ɵɵelementStart(3, "div", null, 80);
    i0.ɵɵprojection(5, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, NovoTableElement_div_3_tbody_5_div_6_Template, 4, 1, "div", 81);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r133 = i0.ɵɵreference(4);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", _r133.childNodes.length == 0);
} }
function NovoTableElement_div_3_tbody_6_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵelementStart(1, "h4");
    i0.ɵɵelement(2, "i", 83);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r136 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r136.labels.noMatchingRecordsMessage, "");
} }
function NovoTableElement_div_3_tbody_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 79);
    i0.ɵɵelementStart(1, "tr");
    i0.ɵɵelementStart(2, "td", 60);
    i0.ɵɵelementStart(3, "div", null, 84);
    i0.ɵɵprojection(5, 3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, NovoTableElement_div_3_tbody_6_div_6_Template, 4, 1, "div", 85);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r135 = i0.ɵɵreference(4);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", _r135.childNodes.length == 0);
} }
function NovoTableElement_div_3_tbody_7_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 90);
    i0.ɵɵelementStart(1, "h4");
    i0.ɵɵelement(2, "i", 91);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r138 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r138.labels.erroredTableMessage, "");
} }
function NovoTableElement_div_3_tbody_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 87);
    i0.ɵɵelementStart(1, "tr");
    i0.ɵɵelementStart(2, "td", 60);
    i0.ɵɵelementStart(3, "div", null, 88);
    i0.ɵɵprojection(5, 4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, NovoTableElement_div_3_tbody_7_div_6_Template, 4, 1, "div", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r137 = i0.ɵɵreference(4);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", _r137.childNodes.length == 0);
} }
function NovoTableElement_div_3_tfoot_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tfoot", 92);
    i0.ɵɵelementStart(1, "tr");
    i0.ɵɵelementStart(2, "td", 60);
    i0.ɵɵprojection(3, 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r14.dataProvider.length % 2 == 0 ? "odd" : "even");
} }
function NovoTableElement_div_3_tfoot_9_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r142 = ctx.$implicit;
    const ctx_r143 = i0.ɵɵnextContext();
    const i_r140 = ctx_r143.index;
    const footer_r139 = ctx_r143.$implicit;
    i0.ɵɵattribute("data-automation-id", (column_r142.id || column_r142.name) + "-total-" + i_r140);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", footer_r139[column_r142.name], " ");
} }
function NovoTableElement_div_3_tfoot_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tfoot", 93);
    i0.ɵɵelementStart(1, "tr");
    i0.ɵɵtemplate(2, NovoTableElement_div_3_tfoot_9_td_2_Template, 2, 2, "td", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r15.columns);
} }
function NovoTableElement_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelementStart(1, "novo-form", 10);
    i0.ɵɵelementStart(2, "table", 11);
    i0.ɵɵtemplate(3, NovoTableElement_div_3_thead_3_Template, 5, 3, "thead", 0);
    i0.ɵɵtemplate(4, NovoTableElement_div_3_tbody_4_Template, 3, 2, "tbody", 0);
    i0.ɵɵtemplate(5, NovoTableElement_div_3_tbody_5_Template, 7, 1, "tbody", 12);
    i0.ɵɵtemplate(6, NovoTableElement_div_3_tbody_6_Template, 7, 1, "tbody", 12);
    i0.ɵɵtemplate(7, NovoTableElement_div_3_tbody_7_Template, 7, 1, "tbody", 13);
    i0.ɵɵtemplate(8, NovoTableElement_div_3_tfoot_8_Template, 4, 1, "tfoot", 14);
    i0.ɵɵtemplate(9, NovoTableElement_div_3_tfoot_9_Template, 3, 1, "tfoot", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("form", ctx_r3.tableForm);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("table-details", ctx_r3.config.hasDetails);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.columns.length && (!ctx_r3.dataProvider.isEmpty() || ctx_r3.dataProvider.isFiltered() || ctx_r3.skipSortAndFilterClear || ctx_r3.editing));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r3.dataProvider.isEmpty() || ctx_r3.editing);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.dataProvider.isEmpty() && !ctx_r3.dataProvider.isFiltered() && !ctx_r3.editing);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.dataProvider.isEmpty() && ctx_r3.dataProvider.isFiltered());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.dataProvider.hasErrors());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r3.config.footers);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.footers);
} }
const _c3 = [[["novo-table-header"]], [["novo-table-actions"]], [["", "table-empty-message", ""]], [["", "table-no-matching-records-message", ""]], [["", "table-error-message", ""]], [["novo-table-footer"]]];
const _c4 = ["novo-table-header", "novo-table-actions", "[table-empty-message]", "[table-no-matching-records-message]", "[table-error-message]", "novo-table-footer"];
// TODO - support (1) clicking cell to edit, (2) clicking row to edit, (3) button to trigger full table to edit
export var NovoTableMode;
(function (NovoTableMode) {
    NovoTableMode[NovoTableMode["VIEW"] = 1] = "VIEW";
    NovoTableMode[NovoTableMode["EDIT"] = 2] = "EDIT";
})(NovoTableMode || (NovoTableMode = {}));
export class NovoTableElement {
    constructor(labels, formUtils, builder) {
        this.labels = labels;
        this.formUtils = formUtils;
        this.builder = builder;
        this.config = {};
        this.skipSortAndFilterClear = false;
        this.mode = NovoTableMode.VIEW;
        this.editable = false;
        this.rowIdentifier = 'id';
        this.name = 'table';
        this.onRowClick = new EventEmitter();
        this.onRowSelect = new EventEmitter();
        this.onTableChange = new EventEmitter();
        this._rows = [];
        this.selected = [];
        this.activeId = 0;
        this.master = false;
        this.expandAll = false;
        this.indeterminate = false;
        this.lastPage = 0;
        this.selectedPageCount = 0;
        this.showSelectAllMessage = false;
        this.pagedData = [];
        // Map to keep track of what dropdowns are toggled
        // Used to properly *ngIf the <list> so that the keepFilterFocused Directive
        // will properly fire the ngAfterViewInit event
        this.toggledDropdownMap = {};
        this.NovoTableMode = NovoTableMode;
        this.tableForm = new FormGroup({});
        this.footers = [];
        this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
        this.loading = false;
        notify('[Deprecated]: The table is deprecated. Please migrate to novo-data-tables!');
    }
    set rows(rows) {
        this.dataProvider = rows;
        if (rows && rows.length > 0) {
            this.setupColumnDefaults();
        }
        // this is a temporary/hacky fix until async dataloading is handled within the table
        if (!this.skipSortAndFilterClear) {
            this.clearAllSortAndFilters();
        }
    }
    get rows() {
        return this._rows;
    }
    set dataProvider(dp) {
        this._dataProvider = Array.isArray(dp) ? new PagedArrayCollection(dp) : dp;
        this._dataProvider.dataChange.pipe(debounceTime(100)).subscribe((event) => {
            switch (event.type) {
                case CollectionEvent.CHANGE:
                    this._rows = event.data;
                    // Setup form
                    this.tableForm = this.builder.group({
                        rows: this.builder.array([]),
                    });
                    // Remove all selection on sort change if selection is on
                    if (this.config.rowSelectionStyle === 'checkbox') {
                        this.pagedData = event.data;
                        this.pageSelected = this.pagedData.filter((r) => r._selected);
                        this.rowSelectHandler();
                    }
                    // Find that columns we might need to sum up via the footer
                    let columnsToSum = [];
                    const columnSums = {};
                    if (this.config.footers) {
                        this.config.footers.forEach((config) => {
                            columnsToSum.push(...config.columns);
                        });
                        // Only have unique columns, filter out duplicates
                        columnsToSum = columnsToSum.filter((item, index, array) => array.indexOf(item) === index);
                    }
                    // Make a form for each row
                    const tableFormRows = this.tableForm.controls.rows;
                    this._rows.forEach((row, index) => {
                        const rowControls = [];
                        row.controls = {};
                        row._editing = {};
                        row._expanded = this.config.expandAll;
                        row.rowId = this._rows.length;
                        this.columns.forEach((column) => {
                            // Use the control passed or use a ReadOnlyControl so that the form has the values
                            const control = column.editorConfig
                                ? ControlFactory.create(column.editorType, column.editorConfig)
                                : new ReadOnlyControl({ key: column.name });
                            row.controls[column.name] = control;
                            rowControls.push(control);
                        });
                        this.formUtils.setInitialValues(rowControls, row, false);
                        tableFormRows.push(this.formUtils.toFormGroup(rowControls));
                        // Setup the total footer if configured
                        // Array of keys to total
                        if (columnsToSum.length !== 0) {
                            columnsToSum.forEach((column) => {
                                if (Helpers.isBlank(columnSums[column])) {
                                    columnSums[column] = 0;
                                }
                                columnSums[column] += row[column];
                            });
                        }
                    });
                    if (this.mode === NovoTableMode.EDIT) {
                        this.setTableEdit();
                    }
                    // Setup the footers (if any)
                    if (this.config.footers) {
                        this.footers = [];
                        this.config.footers.forEach((footerConfig, footerConfigIndex) => {
                            const footer = {};
                            footer[footerConfig.labelColumn] = footerConfig.label;
                            footerConfig.columns.forEach((column) => {
                                if (footerConfig.method === 'AVG' && this._rows.length !== 0) {
                                    footer[column] = columnSums[column] / this._rows.length;
                                }
                                else {
                                    footer[column] = columnSums[column];
                                }
                            });
                            this.footers.push(footer);
                        });
                    }
                    break;
                default:
                    break;
            }
        });
        if (this.config.paging) {
            this._dataProvider.page = this.config.paging.current;
            this._dataProvider.pageSize = this.config.paging.itemsPerPage;
        }
        else {
            // Paging turned off, return basically all of the data
            this._dataProvider.page = 1;
            this._dataProvider.pageSize = 500;
        }
        if (dp && dp.length > 0) {
            this.setupColumnDefaults();
        }
        this._dataProvider.refresh();
    }
    get dataProvider() {
        return this._dataProvider;
    }
    get editing() {
        return this.mode === NovoTableMode.EDIT;
    }
    get formValue() {
        return this.tableForm.value;
    }
    onDropdownToggled(event, column) {
        this.toggledDropdownMap[column] = event;
    }
    focusInput() {
        if (this.filterInputs && this.filterInputs.length) {
            this.filterInputs.forEach((filterInput) => {
                if (filterInput.nativeElement) {
                    setTimeout(() => filterInput.nativeElement.focus(), 0);
                }
            });
        }
    }
    onPageChange(event) {
        // this.dataProvider.page = event.page;
        // this.dataProvider.pageSize = event.itemsPerPage;
    }
    getOptionDataAutomationId(option) {
        if (!Helpers.isBlank(option.value)) {
            return option.value;
        }
        return option;
    }
    setupColumnDefaults() {
        // Check columns for cell option types
        this.columns.forEach((column) => {
            if (column && column.type) {
                switch (column.type) {
                    case 'date':
                        // Set options based on dates if there are none
                        column.options = column.options || this.getDefaultOptions(column);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    ngDoCheck() {
        if (this.config.paging && this.config.paging.current !== this.lastPage) {
            this.rowSelectHandler();
            this.showSelectAllMessage = false;
        }
        this.lastPage = this.config.paging ? this.config.paging.current : 1;
    }
    getPageStart() {
        return this.config.paging ? (this.dataProvider.page - 1) * this.dataProvider.pageSize : 0;
    }
    getPageEnd() {
        return this.config.paging && this.dataProvider.pageSize > -1 ? this.getPageStart() + this.dataProvider.pageSize : this.rows.length;
    }
    getRowControlForm(i) {
        const tableFormRows = this.tableForm.controls.rows;
        return tableFormRows.controls[i];
    }
    onFilterClick(column, filter) {
        if (filter.range && !column.calendarShow) {
            column.calenderShow = true;
            return;
        }
        if (Array.isArray(column.filter) && column.multiple) {
            if (~column.filter.indexOf(filter)) {
                // Remove filter
                column.filter.splice(column.filter.indexOf(filter), 1);
                if (filter.range) {
                    column.calenderShow = false;
                }
                if (column.filter.length === 0) {
                    column.filter = null;
                }
            }
            else {
                // Add filter
                column.filter.push(filter);
            }
        }
        else if (column.multiple) {
            column.filter = new Array();
            column.filter.push(Helpers.isBlank(filter.value) ? filter : filter.value);
        }
        else {
            column.filter = Helpers.isBlank(filter.value) ? filter : filter.value;
        }
        this.onFilterChange();
    }
    onFilterClear(column) {
        setTimeout(() => {
            column.filter = null;
            column.freetextFilter = null;
            this.onFilterChange();
            if (column.originalOptions) {
                column.options = column.originalOptions;
            }
        });
    }
    clearAllSortAndFilters() {
        if (this.config.filtering) {
            this.columns.forEach((column) => {
                column.filter = null;
                column.sort = null;
            });
        }
    }
    /**
     * @description This method updates the row data to reflect the active filters.
     */
    onFilterChange(event) {
        if (this.config.filtering) {
            // Array of filters
            const filters = this.columns.filter((col) => !Helpers.isEmpty(col.filter));
            if (filters.length) {
                let query = {};
                for (const column of filters) {
                    if (Helpers.isFunction(column.match)) {
                        query[column.name] = (value, record) => {
                            return column.match(record, column.filter);
                        };
                    }
                    else if (column.preFilter && Helpers.isFunction(column.preFilter)) {
                        query = Object.assign({}, query, column.preFilter(this.escapeCharacters(column.filter)));
                    }
                    else if (Array.isArray(column.filter)) {
                        // The filters are an array (multi-select), check value
                        let options = column.filter;
                        // We have an array of {value: '', labels: ''}
                        if (options[0].value || options[0].label) {
                            options = column.filter.map((opt) => opt.value);
                        }
                        query[column.name] = { any: options };
                    }
                    else if (column.type && column.type === 'date') {
                        if (column.filter.startDate && column.filter.endDate) {
                            query[column.name] = {
                                min: dateFns.startOfDay(column.filter.startDate),
                                max: dateFns.startOfDay(dateFns.addDays(dateFns.startOfDay(column.filter.endDate), 1)),
                            };
                        }
                        else {
                            query[column.name] = {
                                min: column.filter.min ? dateFns.addDays(dateFns.startOfToday(), column.filter.min) : dateFns.startOfToday(),
                                max: column.filter.max ? dateFns.addDays(dateFns.startOfTomorrow(), column.filter.max) : dateFns.startOfTomorrow(),
                            };
                        }
                    }
                    else {
                        query[column.name] = column.filter;
                    }
                }
                if (Helpers.isFunction(this.config.filtering)) {
                    this.config.filtering(query);
                }
                else {
                    this._dataProvider.filter = query;
                }
            }
            else {
                this._dataProvider.filter = {};
            }
            // Trickle down to keep sort
            // this.onSortChange(this.currentSortColumn);
            this.fireTableChangeEvent();
            // If paging, reset page
            if (this.config.paging) {
                this.config.paging.current = 1;
            }
            // Remove all selection on sort change if selection is on
            if (this.config.rowSelectionStyle === 'checkbox') {
                this.selectAll(false);
            }
        }
    }
    escapeCharacters(filter) {
        if (typeof filter === 'string') {
            return filter.replace(/'/g, "''");
        }
        return filter;
    }
    isFilterActive(column, filter) {
        // TODO: This needs to be refactored
        let isActive = false;
        if (column && !Helpers.isBlank(column.filter) && !Helpers.isBlank(filter)) {
            if (Array.isArray(column.filter)) {
                if (typeof filter !== 'string') {
                    isActive = column.filter.some((item) => {
                        return item.label === filter.label;
                    });
                }
                else {
                    isActive = column.filter.includes(filter);
                }
            }
            else {
                if (typeof column.filter === typeof filter) {
                    isActive = column.filter === filter;
                }
                else {
                    isActive = column.filter === filter.value;
                }
            }
        }
        return isActive;
    }
    onSortChange(column) {
        this.currentSortColumn = column;
        const sortedColumns = this.columns.filter((thisColumn) => {
            return thisColumn.sort && thisColumn !== this.currentSortColumn;
        });
        for (const sortedColumn of sortedColumns) {
            sortedColumn.sort = null;
        }
        if (column) {
            if (Helpers.isFunction(this.config.sorting)) {
                this.config.sorting();
            }
            else if (Helpers.isFunction(column.preSort)) {
                this._dataProvider.sort = [].concat(column.preSort(column));
            }
            else {
                this._dataProvider.sort = [{ field: column.compare || column.name, reverse: column.sort === 'desc' }];
            }
        }
        // Fire table change event
        // this.fireTableChangeEvent();
        // If paging, reset page
        if (this.config.paging) {
            this.config.paging.current = 1;
        }
        // Remove all selection on sort change if selection is on
        if (this.config.rowSelectionStyle === 'checkbox') {
            this.selectAll(false);
        }
    }
    fireTableChangeEvent() {
        // Construct a table change object
        const onTableChange = {};
        const filters = this.columns.filter((col) => col.filter && col.filter.length);
        onTableChange.filter = filters.length ? filters : false;
        onTableChange.sort = this.currentSortColumn ? this.currentSortColumn : false;
        onTableChange.rows = this.rows;
        // Emit event
        this.onTableChange.emit(onTableChange);
    }
    findColumnIndex(value) {
        for (let i = 0; i < this.columns.length; i += 1) {
            if (this.columns[i].name === value) {
                return i;
            }
        }
        return null;
    }
    onOrderChange(event) {
        const oldIndex = this.findColumnIndex(event.first.name);
        const newIndex = this.findColumnIndex(event.second.name);
        this.columns.splice(newIndex, 0, this.columns.splice(oldIndex, 1)[0]);
        this.onSortChange(this.currentSortColumn);
    }
    expandAllOnPage(expanded) {
        this.config.expandAll = !expanded;
        for (const row of this.dataProvider.list) {
            row._expanded = this.config.expandAll;
        }
    }
    selectPage(data) {
        if (!this.master) {
            this.selectAll(false);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
            this.showSelectAllMessage = false;
        }
        else {
            this.indeterminate = false;
            // this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
            for (const row of this.pagedData) {
                row._selected = this.master;
            }
            this.selected = this.dataProvider.list.filter((r) => r._selected);
            this.pageSelected = this.pagedData.filter((r) => r._selected);
            this.emitSelected(this.selected);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount++;
            this.showSelectAllMessage = this.selectedPageCount === 1 && this.selected.length !== this.dataProvider.total;
        }
    }
    selectAll(value) {
        this.master = value;
        this.indeterminate = false;
        for (const row of this.dataProvider.list) {
            row._selected = value;
        }
        this.selected = value ? this.dataProvider.list : [];
        this.showSelectAllMessage = false;
        this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        this.rowSelectHandler();
    }
    rowSelectHandler(data) {
        // this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
        this.pageSelected = this.pagedData.filter((r) => r._selected);
        this.selected = this.dataProvider.list.filter((r) => r._selected);
        if (this.pageSelected.length === 0) {
            this.master = false;
            this.indeterminate = false;
        }
        else if (this.pageSelected.length === this.pagedData.length) {
            this.master = true;
            this.indeterminate = false;
        }
        else {
            this.master = false;
            this.indeterminate = true;
            // Breaking the selected page count
            this.showSelectAllMessage = false;
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        }
        this.emitSelected(this.selected);
    }
    emitSelected(selected) {
        this.onRowSelect.emit({ length: selected.length, selected });
    }
    rowClickHandler(row) {
        if (this.config.rowSelect) {
            this.activeId = row.id || 0;
            this.onRowClick.emit(row);
        }
    }
    getDefaultOptions(column) {
        // TODO - needs to come from label service - https://github.com/bullhorn/novo-elements/issues/116
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
        if (column && column.range) {
            opts.push({
                label: this.labels.customDateRange,
                range: true,
            });
        }
        return opts;
    }
    onCalenderSelect(column, event) {
        setTimeout(() => {
            if (event.startDate && event.endDate) {
                this.onFilterChange();
            }
        }, 10);
    }
    onFilterKeywords(config) {
        if (config && config.filtering && config.filtering.freetextFilter) {
            const filterKeywords = config.filtering.freetextFilter.toLowerCase();
            if (!config.filtering.originalOptions) {
                config.filtering.originalOptions = config.filtering.options;
            }
            const newOptions = config.filtering.originalOptions.filter((option) => {
                let value = option && option.label ? option.label : option;
                value = value.toLowerCase() ? value.toLowerCase() : value;
                if (value === filterKeywords) {
                    return true;
                }
                else if (~value.indexOf(filterKeywords) || ~value.indexOf(filterKeywords)) {
                    return true;
                }
                return false;
            });
            config.filtering.options = newOptions;
            config.filtering.filter = config.filtering.freetextFilter;
        }
        else {
            config.filtering.options = config.filtering.originalOptions;
        }
        this.onFilterChange();
    }
    /**
     * @description Sets the Table into EDIT mode, based on the row/column passed you can enter in a few states
     * (1) setTableEdit() - don't pass any to put the FULL table into edit mode
     * (2) setTableEdit(1) - pass only row to put that FULL row of the table into edit mode
     * (3) setTableEdit(1, 1) - pass row and column to put that column of the row of the table into edit mode
     * @memberOf NovoTableElement
     */
    setTableEdit(rowNumber, columnNumber) {
        this.mode = NovoTableMode.EDIT;
        this._dataProvider.edit();
        this._rows.forEach((row, rowIndex) => {
            row._editing = row._editing || {};
            this.columns.forEach((column, columnIndex) => {
                if (column.viewOnly) {
                    row._editing[column.name] = false;
                }
                else if (Helpers.isEmpty(rowNumber) && Helpers.isEmpty(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else if (!Helpers.isEmpty(rowNumber) && rowIndex === Number(rowNumber) && Helpers.isEmpty(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else if (!Helpers.isEmpty(rowNumber) &&
                    !Helpers.isEmpty(columnNumber) &&
                    rowIndex === Number(rowNumber) &&
                    columnIndex === Number(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else {
                    row._editing[column.name] = false;
                }
            });
        });
    }
    /**
     * @description Leaves edit mode for the Table and puts everything back to VIEW only
     * @memberOf NovoTableElement
     * @param cancel - whether or not to save data or undo
     */
    leaveEditMode(cancel) {
        this.mode = NovoTableMode.VIEW;
        this._rows.forEach((row) => {
            row._editing = row._editing || {};
            this.columns.forEach((column) => {
                row._editing[column.name] = false;
            });
        });
        if (cancel) {
            this._dataProvider.undo();
        }
        else {
            this._dataProvider.commit();
        }
        this.hideToastMessage();
    }
    /**
     * @description Adds a new row into the table to be edited, can be called from a local reference of the table in your template
     * @memberOf NovoTableElement
     */
    addEditableRow(defaultValue = {}) {
        const tableFormRows = this.tableForm.controls.rows;
        const row = {};
        const rowControls = [];
        row.controls = {};
        row._editing = {};
        row.rowId = this._rows.length + 1;
        this.columns.forEach((column) => {
            // Use the control passed or use a ReadOnlyControl so that the form has the values
            const control = column.editorConfig
                ? ControlFactory.create(column.editorType, column.editorConfig)
                : new ReadOnlyControl({ key: column.name });
            control.value = null; // remove copied column value
            row.controls[column.name] = control;
            row._editing[column.name] = !column.viewOnly;
            rowControls.push(control);
        });
        this.formUtils.setInitialValues(rowControls, defaultValue, false);
        tableFormRows.push(this.formUtils.toFormGroup(rowControls));
        this._rows.push(row);
    }
    /**
     * @description Validates the Form inside of the Table, if there are errors it will display/return the errors for each row.
     * If there are no errors, then it will return ONLY the changed data for each row, the data returned will be in the form:
     * { id: ID_OF_RECORD, key: value } -- data that was updated
     * { id: undefined, key: value } -- data that was added
     * @memberOf NovoTableElement
     */
    validateAndGetUpdatedData() {
        if (this.tableForm && this.tableForm.controls && this.tableForm.controls.rows) {
            const changedRows = [];
            const errors = [];
            // Go over the FormArray's controls
            this.tableForm.controls.rows.controls.forEach((formGroup, index) => {
                let changedRow = null;
                let error = null;
                // Go over the form group controls
                Object.keys(formGroup.controls).forEach((key) => {
                    const control = formGroup.controls[key];
                    // Handle value changing
                    if (control && control.dirty && !control.errors) {
                        if (!changedRow) {
                            // Append the ID, so we have some key to save against
                            changedRow = {};
                            if (this._rows[index].id) {
                                changedRow.id = this._rows[index].id;
                            }
                        }
                        // If dirty, grab value off the form
                        changedRow[key] = this.tableForm.value.rows[index][key];
                        // Set value back to row (should be already done via the server call, but do it anyway)
                        this._rows[index][key] = changedRow[key];
                    }
                    else if (control && control.errors) {
                        // Handle errors
                        if (!error) {
                            error = {};
                        }
                        error[key] = control.errors;
                        control.markAsDirty();
                        control.markAsTouched();
                    }
                });
                if (changedRow) {
                    changedRows.push(changedRow);
                }
                if (error) {
                    errors.push({ errors: error, row: this._rows[index], index });
                }
            });
            const ret = {};
            // Return errors if any, otherwise return the changed rows
            if (errors.length === 0) {
                return { changed: changedRows };
            }
            return { errors };
        }
    }
    /**
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    cancelEditing() {
        this.leaveEditMode(true);
    }
    /**
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    saveChanges() {
        this.leaveEditMode(false);
    }
    /**
     * @description Displays a toast message inside of the table
     * @memberOf NovoTableElement
     */
    displayToastMessage(toast, hideDelay) {
        this.loading = false;
        this.toast = toast;
        if (hideDelay) {
            setTimeout(() => this.hideToastMessage(), hideDelay);
        }
    }
    /**
     * @description Force hide the toast message
     * @memberOf NovoTableElement
     */
    hideToastMessage() {
        this.toast = null;
        // Hack to make the table display properly after hiding the toast
        this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = true;
        setTimeout(() => {
            this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
        });
    }
    /**
     * @description display the loading overlay on the table
     * @memberOf NovoTableElement
     */
    toggleLoading(show) {
        this.loading = show;
    }
    /**
     * @description hide a column in edit or view mode
     * @memberOf NovoTableElement
     */
    isColumnHidden(column) {
        return this.editing ? !!column.hideColumnOnEdit : !!column.hideColumnOnView;
    }
}
NovoTableElement.ɵfac = function NovoTableElement_Factory(t) { return new (t || NovoTableElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i2.FormUtils), i0.ɵɵdirectiveInject(i3.FormBuilder)); };
NovoTableElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoTableElement, selectors: [["novo-table"]], viewQuery: function NovoTableElement_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true, ElementRef);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.filterInputs = _t);
    } }, hostVars: 5, hostBindings: function NovoTableElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("theme", ctx.theme);
        i0.ɵɵclassProp("editing", ctx.mode === ctx.NovoTableMode.EDIT)("novo-table-loading", ctx.loading);
    } }, inputs: { config: "config", columns: "columns", theme: "theme", skipSortAndFilterClear: "skipSortAndFilterClear", mode: "mode", editable: "editable", rowIdentifier: "rowIdentifier", name: "name", rows: "rows", dataProvider: "dataProvider" }, outputs: { onRowClick: "onRowClick", onRowSelect: "onRowSelect", onTableChange: "onTableChange" }, ngContentSelectors: _c4, decls: 4, vars: 4, consts: [[4, "ngIf"], ["class", "novo-table-loading-overlay", 4, "ngIf"], [3, "theme", "icon", "message", 4, "ngIf"], ["class", "table-container", 4, "ngIf"], [1, "header-actions"], [3, "rowOptions", "disablePageSelection", "page", "itemsPerPage", "totalItems", "pageChange", "itemsPerPageChange", "onPageChange", 4, "ngIf"], [3, "rowOptions", "disablePageSelection", "page", "itemsPerPage", "totalItems", "pageChange", "itemsPerPageChange", "onPageChange"], [1, "novo-table-loading-overlay"], [3, "theme", "icon", "message"], [1, "table-container"], ["hideHeader", "true", 3, "form"], ["role", "grid", 1, "table", "table-striped", "dataTable"], ["class", "table-message", "data-automation-id", "empty-table", 4, "ngIf"], ["class", "table-message", "data-automation-id", "table-errors", 4, "ngIf"], [3, "ngClass", 4, "ngIf"], ["class", "novo-table-total-footer", 4, "ngFor", "ngForOf"], ["role", "row"], ["class", "row-actions", 4, "ngIf"], ["class", "row-actions checkbox mass-action", 4, "ngIf"], [3, "ngClass", "novoThOrderable", "hidden", "onOrderChange", 4, "ngFor", "ngForOf"], [1, "row-actions"], ["theme", "icon", "icon", "next", "data-automation-id", "expand-all", 3, "click", 4, "ngIf"], ["theme", "icon", "icon", "sort-desc", "data-automation-id", "collapse-all", 3, "click", 4, "ngIf"], ["theme", "icon", "icon", "next", "data-automation-id", "expand-all", 3, "click"], ["theme", "icon", "icon", "sort-desc", "data-automation-id", "collapse-all", 3, "click"], [1, "row-actions", "checkbox", "mass-action"], ["data-automation-id", "select-all-checkbox", "tooltipPosition", "right", 3, "ngModel", "indeterminate", "tooltip", "ngModelChange"], [3, "ngClass", "novoThOrderable", "hidden", "onOrderChange"], ["class", "th-group", 4, "ngIf"], [1, "th-group"], [1, "th-title", 3, "ngClass", "novoThSortable", "column", "onSortChange"], ["class", "table-sort-icons", "tooltipPosition", "bottom", 3, "tooltip", "ngClass", 4, "ngIf"], ["side", "right", "class", "column-filters", "parentScrollSelector", ".table-container", "containerClass", "table-dropdown", 3, "toggled", 4, "ngIf"], ["tooltipPosition", "bottom", 1, "table-sort-icons", 3, "tooltip", "ngClass"], [1, "bhi-arrow-up"], [1, "bhi-arrow-down"], ["side", "right", "parentScrollSelector", ".table-container", "containerClass", "table-dropdown", 1, "column-filters", 3, "toggled"], ["type", "button", "theme", "icon", "icon", "filter", "tooltipPosition", "bottom", 3, "tooltip", "click"], [1, "filter-search"], [1, "header"], ["theme", "dialogue", "color", "negative", "icon", "times", 3, "click", 4, "ngIf"], ["type", "text", "keepFilterFocused", "", 3, "novoTableFilter", "ngModel", "onFilterChange", "ngModelChange", 4, "ngIf"], [3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["theme", "dialogue", "color", "negative", "icon", "times", 3, "click"], ["type", "text", "keepFilterFocused", "", 3, "novoTableFilter", "ngModel", "onFilterChange", "ngModelChange"], ["filterInput", ""], [3, "ngClass", "click"], ["class", "bhi-check", 4, "ngIf"], [1, "bhi-check"], ["class", "filter-search", 4, "ngIf"], [3, "ngClass", "keepOpen", "hidden", "click", 4, "ngFor", "ngForOf"], [1, "calendar-container", 3, "hidden"], [3, "click"], [1, "bhi-previous"], ["range", "true", 3, "ngModel", "onSelect", "ngModelChange"], ["rangePicker", ""], [3, "ngClass", "keepOpen", "hidden", "click"], ["class", "table-selection-row", "data-automation-id", "table-selection-row", 4, "ngIf"], ["ngFor", "", 3, "ngForOf"], ["data-automation-id", "table-selection-row", 1, "table-selection-row"], ["colspan", "100%"], ["data-automation-id", "all-matching-records", 3, "click"], [1, "table-row", 3, "ngClass", "id", "click"], ["class", "row-actions checkbox", 4, "ngIf"], [3, "novo-form-row", "hidden", 4, "ngFor", "ngForOf"], ["class", "details-row", 3, "hidden", 4, "ngIf"], ["theme", "icon", "icon", "next", 3, "click", 4, "ngIf"], ["theme", "icon", "icon", "sort-desc", 3, "click", 4, "ngIf"], ["theme", "icon", "icon", "next", 3, "click"], ["theme", "icon", "icon", "sort-desc", 3, "click"], [1, "row-actions", "checkbox"], ["data-automation-id", "select-row-checkbox", 3, "ngModel", "ngModelChange"], [3, "hidden"], [3, "hasEditor", "column", "row", "form", 4, "ngIf"], ["condensed", "true", 3, "form", "control", 4, "ngIf"], [3, "hasEditor", "column", "row", "form"], ["condensed", "true", 3, "form", "control"], [1, "details-row", 3, "hidden"], [3, "data", "renderer"], ["data-automation-id", "empty-table", 1, "table-message"], ["emptymessage", ""], ["class", "table-empty-message", 4, "ngIf"], [1, "table-empty-message"], [1, "bhi-search-question"], ["nomatchmessage", ""], ["class", "no-matching-records", 4, "ngIf"], [1, "no-matching-records"], ["data-automation-id", "table-errors", 1, "table-message"], ["errormessage", ""], ["class", "table-error-message", 4, "ngIf"], [1, "table-error-message"], [1, "bhi-caution"], [3, "ngClass"], [1, "novo-table-total-footer"], [4, "ngFor", "ngForOf"]], template: function NovoTableElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c3);
        i0.ɵɵtemplate(0, NovoTableElement_header_0_Template, 5, 1, "header", 0);
        i0.ɵɵtemplate(1, NovoTableElement_div_1_Template, 2, 0, "div", 1);
        i0.ɵɵtemplate(2, NovoTableElement_novo_toast_2_Template, 1, 3, "novo-toast", 2);
        i0.ɵɵtemplate(3, NovoTableElement_div_3_Template, 10, 10, "div", 3);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.columns.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.loading || ctx.dataProvider.isLoading());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.toast);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast);
    } }, directives: [i4.NgIf, i5.Pagination, i6.NovoLoadingElement, i7.NovoToastElement, i8.NovoFormElement, i4.NgForOf, i9.NovoButtonElement, i10.NovoCheckboxElement, i3.NgControlStatus, i3.NgModel, i11.TooltipDirective, i4.NgClass, i12.ThOrderable, i13.ThSortable, i14.NovoDropdownElement, i14.NovoDropdownListElement, i14.NovoItemElement, i3.DefaultValueAccessor, i15.NovoTableKeepFilterFocus, i16.TableFilter, i17.NovoDatePickerElement, i18.TableCell, i19.NovoControlElement, i20.RowDetails], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTableElement, [{
        type: Component,
        args: [{
                selector: 'novo-table',
                host: {
                    '[attr.theme]': 'theme',
                    '[class.editing]': 'mode === NovoTableMode.EDIT',
                    '[class.novo-table-loading]': 'loading',
                },
                // directives: [],
                template: `
    <header *ngIf="columns.length">
      <ng-content select="novo-table-header"></ng-content>
      <div class="header-actions">
        <novo-pagination
          *ngIf="config.paging && !(dataProvider.isEmpty() && !dataProvider.isFiltered())"
          [rowOptions]="config.paging.rowOptions"
          [disablePageSelection]="config.paging.disablePageSelection"
          [(page)]="dataProvider.page"
          [(itemsPerPage)]="dataProvider.pageSize"
          [totalItems]="dataProvider.total"
          (onPageChange)="onPageChange($event)"
        >
        </novo-pagination>
        <ng-content select="novo-table-actions"></ng-content>
      </div>
    </header>
    <div class="novo-table-loading-overlay" *ngIf="loading || dataProvider.isLoading()">
      <novo-loading></novo-loading>
    </div>
    <novo-toast *ngIf="toast" [theme]="toast?.theme" [icon]="toast?.icon" [message]="toast?.message"></novo-toast>
    <div class="table-container" *ngIf="!grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast">
      <novo-form hideHeader="true" [form]="tableForm">
        <table class="table table-striped dataTable" [class.table-details]="config.hasDetails" role="grid">
          <!-- skipSortAndFilterClear is a hack right now, will be removed once Canvas is refactored -->
          <thead *ngIf="columns.length && (!dataProvider.isEmpty() || dataProvider.isFiltered() || skipSortAndFilterClear || editing)">
            <tr role="row">
              <!-- DETAILS -->
              <th class="row-actions" *ngIf="config.hasDetails">
                <button
                  theme="icon"
                  icon="next"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="!config.expandAll"
                  data-automation-id="expand-all"
                ></button>
                <button
                  theme="icon"
                  icon="sort-desc"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="config.expandAll"
                  data-automation-id="collapse-all"
                ></button>
              </th>
              <!-- CHECKBOX -->
              <th class="row-actions checkbox mass-action" *ngIf="config.rowSelectionStyle === 'checkbox'">
                <novo-checkbox
                  [(ngModel)]="master"
                  [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length"
                  (ngModelChange)="selectPage($event)"
                  data-automation-id="select-all-checkbox"
                  [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage"
                  tooltipPosition="right"
                ></novo-checkbox>
              </th>
              <!-- TABLE HEADERS -->
              <th
                *ngFor="let column of columns"
                [ngClass]="{
                  'mass-action': config?.rowSelectionStyle === 'checkbox',
                  actions: column?.actions?.items?.length > 0,
                  preview: column?.name === 'preview'
                }"
                [novoThOrderable]="column"
                (onOrderChange)="onOrderChange($event)"
                [hidden]="isColumnHidden(column)"
              >
                <div class="th-group" [attr.data-automation-id]="column.id || column.name" *ngIf="!column.hideHeader">
                  <!-- LABEL & SORT ARROWS -->
                  <div
                    class="th-title"
                    [ngClass]="config.sorting !== false && column.sorting !== false ? 'sortable' : ''"
                    [novoThSortable]="config"
                    [column]="column"
                    (onSortChange)="onSortChange($event)"
                  >
                    <label>{{ column.title || column.label }}</label>
                    <div
                      class="table-sort-icons"
                      tooltipPosition="bottom"
                      [tooltip]="labels.sort"
                      [ngClass]="column.sort || ''"
                      *ngIf="config.sorting !== false && column.sorting !== false"
                    >
                      <i class="bhi-arrow-up"></i>
                      <i class="bhi-arrow-down"></i>
                    </div>
                  </div>
                  <!-- FILTER DROP-DOWN -->
                  <novo-dropdown
                    side="right"
                    *ngIf="config.filtering !== false && column.filtering !== false"
                    class="column-filters"
                    (toggled)="onDropdownToggled($event, column.name)"
                    parentScrollSelector=".table-container"
                    containerClass="table-dropdown"
                  >
                    <button
                      type="button"
                      theme="icon"
                      icon="filter"
                      tooltipPosition="bottom"
                      [tooltip]="labels.filters"
                      [class.filtered]="column.filter || column.filter === false"
                      (click)="focusInput()"
                    ></button>
                    <!-- FILTER OPTIONS LIST -->
                    <list
                      *ngIf="
                        (column?.options?.length || column?.originalOptions?.length) &&
                        column?.type !== 'date' &&
                        toggledDropdownMap[column.name]
                      "
                    >
                      <item class="filter-search">
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <button
                            theme="dialogue"
                            color="negative"
                            icon="times"
                            (click)="onFilterClear(column)"
                            *ngIf="column.filter || column.filter === false"
                          >
                            {{ labels.clear }}
                          </button>
                        </div>
                        <input
                          type="text"
                          *ngIf="!!column.allowCustomTextOption"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterKeywords($event)"
                          [(ngModel)]="column.freetextFilter"
                          keepFilterFocused
                          #filterInput
                        />
                      </item>
                      <item
                        [ngClass]="{ active: isFilterActive(column, option) }"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [attr.data-automation-id]="getOptionDataAutomationId(option)"
                      >
                        <span>{{ option?.label || option }}</span> <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                      </item>
                    </list>
                    <!-- FILTER SEARCH INPUT -->
                    <list *ngIf="!(column?.options?.length || column?.originalOptions?.length) && toggledDropdownMap[column.name]">
                      <item class="filter-search">
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </button>
                        </div>
                        <input
                          type="text"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterChange($event)"
                          [(ngModel)]="column.filter"
                          keepFilterFocused
                          #filterInput
                        />
                      </item>
                    </list>
                    <!-- FILTER DATE OPTIONS -->
                    <list *ngIf="column?.options?.length && column?.type === 'date' && toggledDropdownMap[column.name]">
                      <item class="filter-search" *ngIf="!column.calenderShow">
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </button>
                        </div>
                      </item>
                      <item
                        [ngClass]="{ active: isFilterActive(column, option) }"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [keepOpen]="option.range"
                        [hidden]="column.calenderShow"
                        [attr.data-automation-id]="option?.label || option"
                      >
                        {{ option?.label || option }} <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                      </item>
                      <div class="calendar-container" [hidden]="!column.calenderShow">
                        <div (click)="column.calenderShow = false"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
                        <novo-date-picker
                          #rangePicker
                          (onSelect)="onCalenderSelect(column, $event)"
                          [(ngModel)]="column.filter"
                          range="true"
                        ></novo-date-picker>
                      </div>
                    </list>
                  </novo-dropdown>
                </div>
              </th>
            </tr>
          </thead>
          <!-- TABLE DATA -->
          <tbody *ngIf="!dataProvider.isEmpty() || editing">
            <tr
              class="table-selection-row"
              *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage && config.selectAllEnabled"
              data-automation-id="table-selection-row"
            >
              <td colspan="100%">
                {{ labels.selectedRecords(selected.length) }}
                <a (click)="selectAll(true)" data-automation-id="all-matching-records">{{ labels.totalRecords(dataProvider.total) }}</a>
              </td>
            </tr>
            <ng-template ngFor let-row="$implicit" let-i="index" [ngForOf]="rows">
              <tr
                class="table-row"
                [ngClass]="row.customClass || ''"
                [id]="name + '-' + row[rowIdentifier]"
                [attr.data-automation-id]="row.id"
                (click)="rowClickHandler(row)"
                [class.active]="row.id === activeId"
              >
                <td class="row-actions" *ngIf="config.hasDetails">
                  <button theme="icon" icon="next" (click)="row._expanded = !row._expanded" *ngIf="!row._expanded"></button>
                  <button theme="icon" icon="sort-desc" (click)="row._expanded = !row._expanded" *ngIf="row._expanded"></button>
                </td>
                <td class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                  <novo-checkbox
                    [(ngModel)]="row._selected"
                    (ngModelChange)="rowSelectHandler(row)"
                    data-automation-id="select-row-checkbox"
                  ></novo-checkbox>
                </td>
                <td
                  *ngFor="let column of columns"
                  [attr.data-automation-id]="column.id || column.name"
                  [class.novo-form-row]="editable"
                  [hidden]="isColumnHidden(column)"
                >
                  <novo-table-cell
                    *ngIf="row._editing && !row._editing[column.name]"
                    [hasEditor]="editable"
                    [column]="column"
                    [row]="row"
                    [form]="getRowControlForm(i)"
                  ></novo-table-cell>
                  <novo-control
                    *ngIf="row._editing && row._editing[column.name]"
                    condensed="true"
                    [form]="getRowControlForm(i)"
                    [control]="row.controls[column.name]"
                  ></novo-control>
                </td>
              </tr>
              <tr
                class="details-row"
                *ngIf="config.hasDetails"
                [hidden]="!row._expanded"
                [attr.data-automation-id]="'details-row-' + row.id"
              >
                <td class="row-actions"></td>
                <td [attr.colspan]="config.rowSelectionStyle === 'checkbox' ? columns.length + 1 : columns.length">
                  <novo-row-details [data]="row" [renderer]="config.detailsRenderer"></novo-row-details>
                </td>
              </tr>
            </ng-template>
          </tbody>
          <!-- NO TABLE DATA PLACEHOLDER -->
          <tbody
            class="table-message"
            *ngIf="dataProvider.isEmpty() && !dataProvider.isFiltered() && !editing"
            data-automation-id="empty-table"
          >
            <tr>
              <td colspan="100%">
                <div #emptymessage><ng-content select="[table-empty-message]"></ng-content></div>
                <div class="table-empty-message" *ngIf="emptymessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- NO MATCHING RECORDS -->
          <tbody class="table-message" *ngIf="dataProvider.isEmpty() && dataProvider.isFiltered()" data-automation-id="empty-table">
            <tr>
              <td colspan="100%">
                <div #nomatchmessage><ng-content select="[table-no-matching-records-message]"></ng-content></div>
                <div class="no-matching-records" *ngIf="nomatchmessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- TABLE DATA ERROR PLACEHOLDER -->
          <tbody class="table-message" *ngIf="dataProvider.hasErrors()" data-automation-id="table-errors">
            <tr>
              <td colspan="100%">
                <div #errormessage><ng-content select="[table-error-message]"></ng-content></div>
                <div class="table-error-message" *ngIf="errormessage.childNodes.length == 0">
                  <h4><i class="bhi-caution"></i> {{ labels.erroredTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot *ngIf="!config.footers" [ngClass]="dataProvider.length % 2 == 0 ? 'odd' : 'even'">
            <tr>
              <td colspan="100%">
                <ng-content select="novo-table-footer"></ng-content>
              </td>
            </tr>
          </tfoot>
          <tfoot *ngFor="let footer of footers; let i = index" class="novo-table-total-footer">
            <tr>
              <td *ngFor="let column of columns" [attr.data-automation-id]="(column.id || column.name) + '-total-' + i">
                {{ footer[column.name] }}
              </td>
            </tr>
          </tfoot>
        </table>
      </novo-form>
    </div>
  `,
            }]
    }], function () { return [{ type: i1.NovoLabelService }, { type: i2.FormUtils }, { type: i3.FormBuilder }]; }, { filterInputs: [{
            type: ViewChildren,
            args: ['filterInput', { read: ElementRef }]
        }], config: [{
            type: Input
        }], columns: [{
            type: Input
        }], theme: [{
            type: Input
        }], skipSortAndFilterClear: [{
            type: Input
        }], mode: [{
            type: Input
        }], editable: [{
            type: Input
        }], rowIdentifier: [{
            type: Input
        }], name: [{
            type: Input
        }], onRowClick: [{
            type: Output
        }], onRowSelect: [{
            type: Output
        }], onTableChange: [{
            type: Output
        }], rows: [{
            type: Input
        }], dataProvider: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGFibGUvVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQVcsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUE4QixXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsU0FBUztBQUNULE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxNQUFNO0FBQ04sT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpRGpFLDBDQVNrQjtJQUxoQixpUEFBNEIsd1BBQUEsa09BQUE7SUFLOUIsaUJBQWtCOzs7SUFQaEIsNERBQXVDLG1FQUFBLGtDQUFBLDhDQUFBLHlDQUFBOzs7SUFMN0MsOEJBQ0U7SUFBQSxrQkFBdUM7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UTtrQkFEUCxLQUFLO1lBR04sYUFBYTtrQkFEWixLQUFLO1lBR04sSUFBSTtrQkFESCxLQUFLO1lBSU4sVUFBVTtrQkFEVCxNQUFNO1lBR1AsV0FBVztrQkFEVixNQUFNO1lBR1AsYUFBYTtrQkFEWixNQUFNO1lBNEJILElBQUk7a0JBRFAsS0FBSztZQWlCRixZQUFZO2tCQURmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRG9DaGVjaywgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBDb2xsZWN0aW9uRXZlbnQgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXByb3ZpZGVyL0NvbGxlY3Rpb25FdmVudCc7XG5pbXBvcnQgeyBQYWdlZEFycmF5Q29sbGVjdGlvbiB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtcHJvdmlkZXIvUGFnZWRBcnJheUNvbGxlY3Rpb24nO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtLXV0aWxzL0Zvcm1VdGlscyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBub3RpZnkgfSBmcm9tICcuLi8uLi91dGlscy9ub3RpZmllci9ub3RpZmllci51dGlsJztcbmltcG9ydCB7IENvbnRyb2xGYWN0b3J5LCBSZWFkT25seUNvbnRyb2wgfSBmcm9tICcuLy4uL2Zvcm0vRm9ybUNvbnRyb2xzJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvVGFibGVDb25maWcge1xuICAvLyBQYWdpbmcgY29uZmlnXG4gIHBhZ2luZz86IHtcbiAgICBjdXJyZW50OiBudW1iZXI7IC8vIGN1cnJlbnQgcGFnZVxuICAgIGl0ZW1zUGVyUGFnZTogbnVtYmVyOyAvLyBpdGVtcyBwZXIgcGFnZVxuICAgIG9uUGFnZUNoYW5nZTogRnVuY3Rpb247IC8vIGZ1bmN0aW9uIHRvIGhhbmRsZSBwYWdlIGNoYW5naW5nXG4gICAgcm93T3B0aW9ucz86IHsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9W107IC8vIHBhZ2Ugb3B0aW9uc1xuICAgIGRpc2FibGVQYWdlU2VsZWN0aW9uPzogYm9vbGVhbjsgLy8gZGlzYWJsZXMgdGhlIHBhZ2VzIGZyb20gYmVpbmcgc2VsZWN0ZWRcbiAgfTtcbiAgLy8gRm9vdGVyIGNvbmZpZyAodG90YWwgZm9vdGVyKVxuICBmb290ZXJzPzogQXJyYXk8e1xuICAgIGNvbHVtbnM6IEFycmF5PHN0cmluZz47IC8vIHN0cmluZyBhcnJheSBvZiBjb2x1bW5zIHRvIHRvdGFsXG4gICAgbWV0aG9kOiBzdHJpbmc7IC8vIG1ldGhvZCB0byB1c2UgZm9yIHRoZSBmb290ZXIsIFNVTSB8IEFWRywgZGVmYXVsdHMgdG8gU1VNXG4gICAgbGFiZWxDb2x1bW46IHN0cmluZzsgLy8gY29sdW1uIHRvIHVzZSBhcyB0aGUgXCJ0b3RhbFwiIGxhYmVsXG4gICAgbGFiZWw6IHN0cmluZzsgLy8gbGFiZWwgdG8gdXNlIGluIHRoZSBcInRvdGFsXCIgbGFiZWxcbiAgfT47XG4gIC8vIFRPRE86IFdoZW4gdGhlc2UgdHlwZXMgYXJlIGVuZm9yY2VkIGFzIGBib29sZWFuIHwgRnVuY3Rpb25gLCB0aGVyZSdzIGEgbGludCBlcnJvci4gVGhhdCdzIGEgYnVnLlxuICBmaWx0ZXJpbmc/OiBib29sZWFuIHwgYW55OyAvLyBUdXJuIG9uIGZpbHRlcmluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBmaWx0ZXJpbmcgY2FsbGJhY2tcbiAgc29ydGluZz86IGJvb2xlYW4gfCBhbnk7IC8vIFR1cm4gb24gc29ydGluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBzb3J0aW5nIGNhbGxiYWNrXG4gIG9yZGVyaW5nPzogYm9vbGVhbiB8IEZ1bmN0aW9uOyAvLyBUdXJuIG9uIG9yZGVyaW5nIGZvciB0aGUgdGFibGUsIGJvb2xlYW4gb3IgZnVuY3Rpb24gZm9yIG9yZGVyaW5nIGNhbGxiYWNrXG4gIHJlc2l6aW5nPzogYm9vbGVhbiB8IEZ1bmN0aW9uOyAvLyBUdXJuIG9uIHJlc2l6aW5nIGZvciB0aGUgdGFibGUsIGJvb2xlYW4gb3IgZnVuY3Rpb24gZm9yIHJlc2l6aW5nIGNhbGxiYWNrXG4gIHJvd1NlbGVjdGlvblN0eWxlPzogc3RyaW5nOyAvLyBSb3cgc2VsZWN0aW9uIHN0eWxlLCBjaGVja2JveCBvciByb3dcbiAgcm93U2VsZWN0PzogYm9vbGVhbjsgLy8gVHVybiBvbiByb3cgc2VsZWN0aW9uXG4gIGhhc0RldGFpbHM/OiBib29sZWFuOyAvLyBUdXJuIG9uIGRldGFpbHMgcm93IGZvciB0aGUgdGFibGVcbiAgZGV0YWlsc1JlbmRlcmVyPzogYW55OyAvLyBSZW5kZXJlci9jb21wb25lbnQgZm9yIHRoZSBkZXRhaWxzIHJvd1xuICBleHBhbmRBbGw/OiBib29sZWFuOyAvLyBzaG91bGQgQWxsIFJvd3MgYmUgZXhwYW5kZWQgYnkgZGVmYXVsdFxuICBzZWxlY3RBbGxFbmFibGVkPzogYm9vbGVhbjsgLy8gQWxsb3dzIHRoZSB0YWJsZSwgd2hpbGUgaW4gc2VsZWN0aW9uIG1vZGUgdG8gaGF2ZSBhIHNlbGVjdCBhbGwgYXQgdGhlIHRvcFxufVxuXG4vLyBUT0RPIC0gc3VwcG9ydCAoMSkgY2xpY2tpbmcgY2VsbCB0byBlZGl0LCAoMikgY2xpY2tpbmcgcm93IHRvIGVkaXQsICgzKSBidXR0b24gdG8gdHJpZ2dlciBmdWxsIHRhYmxlIHRvIGVkaXRcbmV4cG9ydCBlbnVtIE5vdm9UYWJsZU1vZGUge1xuICBWSUVXID0gMSxcbiAgRURJVCA9IDIsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGFibGUnLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLnRoZW1lXSc6ICd0aGVtZScsXG4gICAgJ1tjbGFzcy5lZGl0aW5nXSc6ICdtb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQnLFxuICAgICdbY2xhc3Mubm92by10YWJsZS1sb2FkaW5nXSc6ICdsb2FkaW5nJyxcbiAgfSxcbiAgLy8gZGlyZWN0aXZlczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGhlYWRlciAqbmdJZj1cImNvbHVtbnMubGVuZ3RoXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRhYmxlLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItYWN0aW9uc1wiPlxuICAgICAgICA8bm92by1wYWdpbmF0aW9uXG4gICAgICAgICAgKm5nSWY9XCJjb25maWcucGFnaW5nICYmICEoZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSAmJiAhZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSlcIlxuICAgICAgICAgIFtyb3dPcHRpb25zXT1cImNvbmZpZy5wYWdpbmcucm93T3B0aW9uc1wiXG4gICAgICAgICAgW2Rpc2FibGVQYWdlU2VsZWN0aW9uXT1cImNvbmZpZy5wYWdpbmcuZGlzYWJsZVBhZ2VTZWxlY3Rpb25cIlxuICAgICAgICAgIFsocGFnZSldPVwiZGF0YVByb3ZpZGVyLnBhZ2VcIlxuICAgICAgICAgIFsoaXRlbXNQZXJQYWdlKV09XCJkYXRhUHJvdmlkZXIucGFnZVNpemVcIlxuICAgICAgICAgIFt0b3RhbEl0ZW1zXT1cImRhdGFQcm92aWRlci50b3RhbFwiXG4gICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJvblBhZ2VDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgPC9ub3ZvLXBhZ2luYXRpb24+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtYWN0aW9uc1wiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXRhYmxlLWxvYWRpbmctb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZyB8fCBkYXRhUHJvdmlkZXIuaXNMb2FkaW5nKClcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmc+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPG5vdm8tdG9hc3QgKm5nSWY9XCJ0b2FzdFwiIFt0aGVtZV09XCJ0b2FzdD8udGhlbWVcIiBbaWNvbl09XCJ0b2FzdD8uaWNvblwiIFttZXNzYWdlXT1cInRvYXN0Py5tZXNzYWdlXCI+PC9ub3ZvLXRvYXN0PlxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1jb250YWluZXJcIiAqbmdJZj1cIiFncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0XCI+XG4gICAgICA8bm92by1mb3JtIGhpZGVIZWFkZXI9XCJ0cnVlXCIgW2Zvcm1dPVwidGFibGVGb3JtXCI+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgZGF0YVRhYmxlXCIgW2NsYXNzLnRhYmxlLWRldGFpbHNdPVwiY29uZmlnLmhhc0RldGFpbHNcIiByb2xlPVwiZ3JpZFwiPlxuICAgICAgICAgIDwhLS0gc2tpcFNvcnRBbmRGaWx0ZXJDbGVhciBpcyBhIGhhY2sgcmlnaHQgbm93LCB3aWxsIGJlIHJlbW92ZWQgb25jZSBDYW52YXMgaXMgcmVmYWN0b3JlZCAtLT5cbiAgICAgICAgICA8dGhlYWQgKm5nSWY9XCJjb2x1bW5zLmxlbmd0aCAmJiAoIWRhdGFQcm92aWRlci5pc0VtcHR5KCkgfHwgZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSB8fCBza2lwU29ydEFuZEZpbHRlckNsZWFyIHx8IGVkaXRpbmcpXCI+XG4gICAgICAgICAgICA8dHIgcm9sZT1cInJvd1wiPlxuICAgICAgICAgICAgICA8IS0tIERFVEFJTFMgLS0+XG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1hY3Rpb25zXCIgKm5nSWY9XCJjb25maWcuaGFzRGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwibmV4dFwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZXhwYW5kQWxsT25QYWdlKGNvbmZpZy5leHBhbmRBbGwpXCJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIWNvbmZpZy5leHBhbmRBbGxcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZXhwYW5kLWFsbFwiXG4gICAgICAgICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwic29ydC1kZXNjXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJleHBhbmRBbGxPblBhZ2UoY29uZmlnLmV4cGFuZEFsbClcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuZXhwYW5kQWxsXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImNvbGxhcHNlLWFsbFwiXG4gICAgICAgICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICA8IS0tIENIRUNLQk9YIC0tPlxuICAgICAgICAgICAgICA8dGggY2xhc3M9XCJyb3ctYWN0aW9ucyBjaGVja2JveCBtYXNzLWFjdGlvblwiICpuZ0lmPVwiY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibWFzdGVyXCJcbiAgICAgICAgICAgICAgICAgIFtpbmRldGVybWluYXRlXT1cInBhZ2VTZWxlY3RlZC5sZW5ndGggPiAwICYmIHBhZ2VTZWxlY3RlZC5sZW5ndGggPCBwYWdlZERhdGEubGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInNlbGVjdFBhZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJzZWxlY3QtYWxsLWNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIFt0b29sdGlwXT1cIm1hc3RlciA/IGxhYmVscy5kZXNlbGVjdEFsbCA6IGxhYmVscy5zZWxlY3RBbGxPblBhZ2VcIlxuICAgICAgICAgICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwicmlnaHRcIlxuICAgICAgICAgICAgICAgID48L25vdm8tY2hlY2tib3g+XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgIDwhLS0gVEFCTEUgSEVBREVSUyAtLT5cbiAgICAgICAgICAgICAgPHRoXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgICAnbWFzcy1hY3Rpb24nOiBjb25maWc/LnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgICAgYWN0aW9uczogY29sdW1uPy5hY3Rpb25zPy5pdGVtcz8ubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICAgIHByZXZpZXc6IGNvbHVtbj8ubmFtZSA9PT0gJ3ByZXZpZXcnXG4gICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgW25vdm9UaE9yZGVyYWJsZV09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgIChvbk9yZGVyQ2hhbmdlKT1cIm9uT3JkZXJDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW2hpZGRlbl09XCJpc0NvbHVtbkhpZGRlbihjb2x1bW4pXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aC1ncm91cFwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjb2x1bW4uaWQgfHwgY29sdW1uLm5hbWVcIiAqbmdJZj1cIiFjb2x1bW4uaGlkZUhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgPCEtLSBMQUJFTCAmIFNPUlQgQVJST1dTIC0tPlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRoLXRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29uZmlnLnNvcnRpbmcgIT09IGZhbHNlICYmIGNvbHVtbi5zb3J0aW5nICE9PSBmYWxzZSA/ICdzb3J0YWJsZScgOiAnJ1wiXG4gICAgICAgICAgICAgICAgICAgIFtub3ZvVGhTb3J0YWJsZV09XCJjb25maWdcIlxuICAgICAgICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgIChvblNvcnRDaGFuZ2UpPVwib25Tb3J0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+e3sgY29sdW1uLnRpdGxlIHx8IGNvbHVtbi5sYWJlbCB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRhYmxlLXNvcnQtaWNvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbVwiXG4gICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBdPVwibGFiZWxzLnNvcnRcIlxuICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbHVtbi5zb3J0IHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5zb3J0aW5nICE9PSBmYWxzZSAmJiBjb2x1bW4uc29ydGluZyAhPT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktYXJyb3ctdXBcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktYXJyb3ctZG93blwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIERST1AtRE9XTiAtLT5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWRyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgIHNpZGU9XCJyaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLmZpbHRlcmluZyAhPT0gZmFsc2UgJiYgY29sdW1uLmZpbHRlcmluZyAhPT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNvbHVtbi1maWx0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKHRvZ2dsZWQpPVwib25Ecm9wZG93blRvZ2dsZWQoJGV2ZW50LCBjb2x1bW4ubmFtZSlcIlxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi50YWJsZS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbGFzcz1cInRhYmxlLWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbj1cImZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJsYWJlbHMuZmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZpbHRlcmVkXT1cImNvbHVtbi5maWx0ZXIgfHwgY29sdW1uLmZpbHRlciA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJmb2N1c0lucHV0KClcIlxuICAgICAgICAgICAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIE9QVElPTlMgTElTVCAtLT5cbiAgICAgICAgICAgICAgICAgICAgPGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNvbHVtbj8ub3B0aW9ucz8ubGVuZ3RoIHx8IGNvbHVtbj8ub3JpZ2luYWxPcHRpb25zPy5sZW5ndGgpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4/LnR5cGUgIT09ICdkYXRlJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlZERyb3Bkb3duTWFwW2NvbHVtbi5uYW1lXVxuICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8aXRlbSBjbGFzcz1cImZpbHRlci1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLmZpbHRlcnMgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVtZT1cImRpYWxvZ3VlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPVwidGltZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsZWFyKGNvbHVtbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmZpbHRlciB8fCBjb2x1bW4uZmlsdGVyID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiISFjb2x1bW4uYWxsb3dDdXN0b21UZXh0T3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiY29sdW1uLm5hbWUgKyAnLWlucHV0J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtub3ZvVGFibGVGaWx0ZXJdPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uRmlsdGVyQ2hhbmdlKT1cIm9uRmlsdGVyS2V5d29yZHMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZyZWV0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2VlcEZpbHRlckZvY3VzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgI2ZpbHRlcklucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8aXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29sdW1uLm9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRmlsdGVyQ2xpY2soY29sdW1uLCBvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJnZXRPcHRpb25EYXRhQXV0b21hdGlvbklkKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19PC9zcGFuPiA8aSBjbGFzcz1cImJoaS1jaGVja1wiICpuZ0lmPVwiaXNGaWx0ZXJBY3RpdmUoY29sdW1uLCBvcHRpb24pXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDwvaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPC9saXN0PlxuICAgICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBTRUFSQ0ggSU5QVVQgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxsaXN0ICpuZ0lmPVwiIShjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCB8fCBjb2x1bW4/Lm9yaWdpbmFsT3B0aW9ucz8ubGVuZ3RoKSAmJiB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGl0ZW0gY2xhc3M9XCJmaWx0ZXItc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cInRpbWVzXCIgKGNsaWNrKT1cIm9uRmlsdGVyQ2xlYXIoY29sdW1uKVwiICpuZ0lmPVwiY29sdW1uLmZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5jbGVhciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiY29sdW1uLm5hbWUgKyAnLWlucHV0J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtub3ZvVGFibGVGaWx0ZXJdPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uRmlsdGVyQ2hhbmdlKT1cIm9uRmlsdGVyQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImNvbHVtbi5maWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZWVwRmlsdGVyRm9jdXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlsdGVySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8L2xpc3Q+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIERBVEUgT1BUSU9OUyAtLT5cbiAgICAgICAgICAgICAgICAgICAgPGxpc3QgKm5nSWY9XCJjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCAmJiBjb2x1bW4/LnR5cGUgPT09ICdkYXRlJyAmJiB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGl0ZW0gY2xhc3M9XCJmaWx0ZXItc2VhcmNoXCIgKm5nSWY9XCIhY29sdW1uLmNhbGVuZGVyU2hvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMuZmlsdGVycyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cImRpYWxvZ3VlXCIgY29sb3I9XCJuZWdhdGl2ZVwiIGljb249XCJ0aW1lc1wiIChjbGljayk9XCJvbkZpbHRlckNsZWFyKGNvbHVtbilcIiAqbmdJZj1cImNvbHVtbi5maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2l0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbikgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsaWNrKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBba2VlcE9wZW5dPVwib3B0aW9uLnJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiY29sdW1uLmNhbGVuZGVyU2hvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uPy5sYWJlbCB8fCBvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19IDxpIGNsYXNzPVwiYmhpLWNoZWNrXCIgKm5nSWY9XCJpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbilcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgPC9pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1jb250YWluZXJcIiBbaGlkZGVuXT1cIiFjb2x1bW4uY2FsZW5kZXJTaG93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IChjbGljayk9XCJjb2x1bW4uY2FsZW5kZXJTaG93ID0gZmFsc2VcIj48aSBjbGFzcz1cImJoaS1wcmV2aW91c1wiPjwvaT57eyBsYWJlbHMuYmFja1RvUHJlc2V0RmlsdGVycyB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgI3JhbmdlUGlja2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkNhbGVuZGVyU2VsZWN0KGNvbHVtbiwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9ub3ZvLWRhdGUtcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2xpc3Q+XG4gICAgICAgICAgICAgICAgICA8L25vdm8tZHJvcGRvd24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgPCEtLSBUQUJMRSBEQVRBIC0tPlxuICAgICAgICAgIDx0Ym9keSAqbmdJZj1cIiFkYXRhUHJvdmlkZXIuaXNFbXB0eSgpIHx8IGVkaXRpbmdcIj5cbiAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICBjbGFzcz1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIlxuICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyAmJiBzaG93U2VsZWN0QWxsTWVzc2FnZSAmJiBjb25maWcuc2VsZWN0QWxsRW5hYmxlZFwiXG4gICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICB7eyBsYWJlbHMuc2VsZWN0ZWRSZWNvcmRzKHNlbGVjdGVkLmxlbmd0aCkgfX1cbiAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwic2VsZWN0QWxsKHRydWUpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiYWxsLW1hdGNoaW5nLXJlY29yZHNcIj57eyBsYWJlbHMudG90YWxSZWNvcmRzKGRhdGFQcm92aWRlci50b3RhbCkgfX08L2E+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3c9XCIkaW1wbGljaXRcIiBsZXQtaT1cImluZGV4XCIgW25nRm9yT2ZdPVwicm93c1wiPlxuICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInRhYmxlLXJvd1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwicm93LmN1c3RvbUNsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICBbaWRdPVwibmFtZSArICctJyArIHJvd1tyb3dJZGVudGlmaWVyXVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInJvdy5pZFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInJvd0NsaWNrSGFuZGxlcihyb3cpXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInJvdy5pZCA9PT0gYWN0aXZlSWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnNcIiAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHRoZW1lPVwiaWNvblwiIGljb249XCJuZXh0XCIgKGNsaWNrKT1cInJvdy5fZXhwYW5kZWQgPSAhcm93Ll9leHBhbmRlZFwiICpuZ0lmPVwiIXJvdy5fZXhwYW5kZWRcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cInNvcnQtZGVzY1wiIChjbGljayk9XCJyb3cuX2V4cGFuZGVkID0gIXJvdy5fZXhwYW5kZWRcIiAqbmdJZj1cInJvdy5fZXhwYW5kZWRcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvdy1hY3Rpb25zIGNoZWNrYm94XCIgKm5nSWY9XCJjb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCdcIj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicm93Ll9zZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInJvd1NlbGVjdEhhbmRsZXIocm93KVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlbGVjdC1yb3ctY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgPjwvbm92by1jaGVja2JveD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCJcbiAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjb2x1bW4uaWQgfHwgY29sdW1uLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgW2NsYXNzLm5vdm8tZm9ybS1yb3ddPVwiZWRpdGFibGVcIlxuICAgICAgICAgICAgICAgICAgW2hpZGRlbl09XCJpc0NvbHVtbkhpZGRlbihjb2x1bW4pXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8bm92by10YWJsZS1jZWxsXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwicm93Ll9lZGl0aW5nICYmICFyb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdXCJcbiAgICAgICAgICAgICAgICAgICAgW2hhc0VkaXRvcl09XCJlZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybV09XCJnZXRSb3dDb250cm9sRm9ybShpKVwiXG4gICAgICAgICAgICAgICAgICA+PC9ub3ZvLXRhYmxlLWNlbGw+XG4gICAgICAgICAgICAgICAgICA8bm92by1jb250cm9sXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwicm93Ll9lZGl0aW5nICYmIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV1cIlxuICAgICAgICAgICAgICAgICAgICBjb25kZW5zZWQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1dPVwiZ2V0Um93Q29udHJvbEZvcm0oaSlcIlxuICAgICAgICAgICAgICAgICAgICBbY29udHJvbF09XCJyb3cuY29udHJvbHNbY29sdW1uLm5hbWVdXCJcbiAgICAgICAgICAgICAgICAgID48L25vdm8tY29udHJvbD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImRldGFpbHMtcm93XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCJcbiAgICAgICAgICAgICAgICBbaGlkZGVuXT1cIiFyb3cuX2V4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2RldGFpbHMtcm93LScgKyByb3cuaWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnNcIj48L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyA/IGNvbHVtbnMubGVuZ3RoICsgMSA6IGNvbHVtbnMubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICA8bm92by1yb3ctZGV0YWlscyBbZGF0YV09XCJyb3dcIiBbcmVuZGVyZXJdPVwiY29uZmlnLmRldGFpbHNSZW5kZXJlclwiPjwvbm92by1yb3ctZGV0YWlscz5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwhLS0gTk8gVEFCTEUgREFUQSBQTEFDRUhPTERFUiAtLT5cbiAgICAgICAgICA8dGJvZHlcbiAgICAgICAgICAgIGNsYXNzPVwidGFibGUtbWVzc2FnZVwiXG4gICAgICAgICAgICAqbmdJZj1cImRhdGFQcm92aWRlci5pc0VtcHR5KCkgJiYgIWRhdGFQcm92aWRlci5pc0ZpbHRlcmVkKCkgJiYgIWVkaXRpbmdcIlxuICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZW1wdHktdGFibGVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjZW1wdHltZXNzYWdlPjxuZy1jb250ZW50IHNlbGVjdD1cIlt0YWJsZS1lbXB0eS1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGUtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiZW1wdHltZXNzYWdlLmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5lbXB0eVRhYmxlTWVzc2FnZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPCEtLSBOTyBNQVRDSElORyBSRUNPUkRTIC0tPlxuICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInRhYmxlLW1lc3NhZ2VcIiAqbmdJZj1cImRhdGFQcm92aWRlci5pc0VtcHR5KCkgJiYgZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LXRhYmxlXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgI25vbWF0Y2htZXNzYWdlPjxuZy1jb250ZW50IHNlbGVjdD1cIlt0YWJsZS1uby1tYXRjaGluZy1yZWNvcmRzLW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuby1tYXRjaGluZy1yZWNvcmRzXCIgKm5nSWY9XCJub21hdGNobWVzc2FnZS5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMubm9NYXRjaGluZ1JlY29yZHNNZXNzYWdlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8IS0tIFRBQkxFIERBVEEgRVJST1IgUExBQ0VIT0xERVIgLS0+XG4gICAgICAgICAgPHRib2R5IGNsYXNzPVwidGFibGUtbWVzc2FnZVwiICpuZ0lmPVwiZGF0YVByb3ZpZGVyLmhhc0Vycm9ycygpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwidGFibGUtZXJyb3JzXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgI2Vycm9ybWVzc2FnZT48bmctY29udGVudCBzZWxlY3Q9XCJbdGFibGUtZXJyb3ItbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImVycm9ybWVzc2FnZS5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktY2F1dGlvblwiPjwvaT4ge3sgbGFiZWxzLmVycm9yZWRUYWJsZU1lc3NhZ2UgfX08L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDx0Zm9vdCAqbmdJZj1cIiFjb25maWcuZm9vdGVyc1wiIFtuZ0NsYXNzXT1cImRhdGFQcm92aWRlci5sZW5ndGggJSAyID09IDAgPyAnb2RkJyA6ICdldmVuJ1wiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRhYmxlLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Zm9vdD5cbiAgICAgICAgICA8dGZvb3QgKm5nRm9yPVwibGV0IGZvb3RlciBvZiBmb290ZXJzOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJub3ZvLXRhYmxlLXRvdGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIihjb2x1bW4uaWQgfHwgY29sdW1uLm5hbWUpICsgJy10b3RhbC0nICsgaVwiPlxuICAgICAgICAgICAgICAgIHt7IGZvb3Rlcltjb2x1bW4ubmFtZV0gfX1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Zm9vdD5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvbm92by1mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFibGVFbGVtZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBWaWV3Q2hpbGRyZW4oJ2ZpbHRlcklucHV0JywgeyByZWFkOiBFbGVtZW50UmVmIH0pXG4gIGZpbHRlcklucHV0czogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogTm92b1RhYmxlQ29uZmlnID0ge307XG4gIEBJbnB1dCgpXG4gIGNvbHVtbnM6IEFycmF5PGFueT47XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNraXBTb3J0QW5kRmlsdGVyQ2xlYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgbW9kZTogTm92b1RhYmxlTW9kZSA9IE5vdm9UYWJsZU1vZGUuVklFVztcbiAgQElucHV0KClcbiAgZWRpdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcm93SWRlbnRpZmllcjogc3RyaW5nID0gJ2lkJztcbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nID0gJ3RhYmxlJztcblxuICBAT3V0cHV0KClcbiAgb25Sb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblJvd1NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblRhYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfZGF0YVByb3ZpZGVyOiBQYWdlZEFycmF5Q29sbGVjdGlvbjxhbnk+O1xuICBfcm93czogQXJyYXk8YW55PiA9IFtdO1xuICBzZWxlY3RlZDogQXJyYXk8YW55PiA9IFtdO1xuICBhY3RpdmVJZDogbnVtYmVyID0gMDtcbiAgbWFzdGVyOiBib29sZWFuID0gZmFsc2U7XG4gIGV4cGFuZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIGxhc3RQYWdlOiBudW1iZXIgPSAwO1xuICBzZWxlY3RlZFBhZ2VDb3VudDogbnVtYmVyID0gMDtcbiAgc2hvd1NlbGVjdEFsbE1lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY3VycmVudFNvcnRDb2x1bW46IGFueTtcbiAgcGFnZWREYXRhOiBBcnJheTxhbnk+ID0gW107XG4gIHBhZ2VTZWxlY3RlZDogYW55O1xuICAvLyBNYXAgdG8ga2VlcCB0cmFjayBvZiB3aGF0IGRyb3Bkb3ducyBhcmUgdG9nZ2xlZFxuICAvLyBVc2VkIHRvIHByb3Blcmx5ICpuZ0lmIHRoZSA8bGlzdD4gc28gdGhhdCB0aGUga2VlcEZpbHRlckZvY3VzZWQgRGlyZWN0aXZlXG4gIC8vIHdpbGwgcHJvcGVybHkgZmlyZSB0aGUgbmdBZnRlclZpZXdJbml0IGV2ZW50XG4gIHRvZ2dsZWREcm9wZG93bk1hcDogYW55ID0ge307XG4gIHB1YmxpYyBOb3ZvVGFibGVNb2RlID0gTm92b1RhYmxlTW9kZTtcbiAgcHVibGljIHRhYmxlRm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gIHB1YmxpYyB0b2FzdDogeyB0aGVtZTogc3RyaW5nOyBpY29uOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB9O1xuICBwdWJsaWMgZm9vdGVycyA9IFtdO1xuICBwdWJsaWMgZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCByb3dzKHJvd3M6IEFycmF5PGFueT4pIHtcbiAgICB0aGlzLmRhdGFQcm92aWRlciA9IHJvd3M7XG4gICAgaWYgKHJvd3MgJiYgcm93cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldHVwQ29sdW1uRGVmYXVsdHMoKTtcbiAgICB9XG4gICAgLy8gdGhpcyBpcyBhIHRlbXBvcmFyeS9oYWNreSBmaXggdW50aWwgYXN5bmMgZGF0YWxvYWRpbmcgaXMgaGFuZGxlZCB3aXRoaW4gdGhlIHRhYmxlXG4gICAgaWYgKCF0aGlzLnNraXBTb3J0QW5kRmlsdGVyQ2xlYXIpIHtcbiAgICAgIHRoaXMuY2xlYXJBbGxTb3J0QW5kRmlsdGVycygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRhdGFQcm92aWRlcihkcDogYW55KSB7XG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyID0gQXJyYXkuaXNBcnJheShkcCkgPyBuZXcgUGFnZWRBcnJheUNvbGxlY3Rpb248YW55PihkcCkgOiBkcDtcbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZS5waXBlKGRlYm91bmNlVGltZSgxMDApKS5zdWJzY3JpYmUoKGV2ZW50OiBDb2xsZWN0aW9uRXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICBjYXNlIENvbGxlY3Rpb25FdmVudC5DSEFOR0U6XG4gICAgICAgICAgdGhpcy5fcm93cyA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgLy8gU2V0dXAgZm9ybVxuICAgICAgICAgIHRoaXMudGFibGVGb3JtID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIHJvd3M6IHRoaXMuYnVpbGRlci5hcnJheShbXSksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VkRGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdGhpcy5yb3dTZWxlY3RIYW5kbGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEZpbmQgdGhhdCBjb2x1bW5zIHdlIG1pZ2h0IG5lZWQgdG8gc3VtIHVwIHZpYSB0aGUgZm9vdGVyXG4gICAgICAgICAgbGV0IGNvbHVtbnNUb1N1bSA9IFtdO1xuICAgICAgICAgIGNvbnN0IGNvbHVtblN1bXMgPSB7fTtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuZm9vdGVycykge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuZm9vdGVycy5mb3JFYWNoKChjb25maWcpID0+IHtcbiAgICAgICAgICAgICAgY29sdW1uc1RvU3VtLnB1c2goLi4uY29uZmlnLmNvbHVtbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBPbmx5IGhhdmUgdW5pcXVlIGNvbHVtbnMsIGZpbHRlciBvdXQgZHVwbGljYXRlc1xuICAgICAgICAgICAgY29sdW1uc1RvU3VtID0gY29sdW1uc1RvU3VtLmZpbHRlcigoaXRlbSwgaW5kZXgsIGFycmF5KSA9PiBhcnJheS5pbmRleE9mKGl0ZW0pID09PSBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE1ha2UgYSBmb3JtIGZvciBlYWNoIHJvd1xuICAgICAgICAgIGNvbnN0IHRhYmxlRm9ybVJvd3MgPSB0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzIGFzIEZvcm1BcnJheTtcbiAgICAgICAgICB0aGlzLl9yb3dzLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0NvbnRyb2xzID0gW107XG4gICAgICAgICAgICByb3cuY29udHJvbHMgPSB7fTtcbiAgICAgICAgICAgIHJvdy5fZWRpdGluZyA9IHt9O1xuICAgICAgICAgICAgcm93Ll9leHBhbmRlZCA9IHRoaXMuY29uZmlnLmV4cGFuZEFsbDtcbiAgICAgICAgICAgIHJvdy5yb3dJZCA9IHRoaXMuX3Jvd3MubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAvLyBVc2UgdGhlIGNvbnRyb2wgcGFzc2VkIG9yIHVzZSBhIFJlYWRPbmx5Q29udHJvbCBzbyB0aGF0IHRoZSBmb3JtIGhhcyB0aGUgdmFsdWVzXG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBjb2x1bW4uZWRpdG9yQ29uZmlnXG4gICAgICAgICAgICAgICAgPyBDb250cm9sRmFjdG9yeS5jcmVhdGUoY29sdW1uLmVkaXRvclR5cGUsIGNvbHVtbi5lZGl0b3JDb25maWcpXG4gICAgICAgICAgICAgICAgOiBuZXcgUmVhZE9ubHlDb250cm9sKHsga2V5OiBjb2x1bW4ubmFtZSB9KTtcbiAgICAgICAgICAgICAgcm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXSA9IGNvbnRyb2w7XG4gICAgICAgICAgICAgIHJvd0NvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybVV0aWxzLnNldEluaXRpYWxWYWx1ZXMocm93Q29udHJvbHMsIHJvdywgZmFsc2UpO1xuICAgICAgICAgICAgdGFibGVGb3JtUm93cy5wdXNoKHRoaXMuZm9ybVV0aWxzLnRvRm9ybUdyb3VwKHJvd0NvbnRyb2xzKSk7XG4gICAgICAgICAgICAvLyBTZXR1cCB0aGUgdG90YWwgZm9vdGVyIGlmIGNvbmZpZ3VyZWRcbiAgICAgICAgICAgIC8vIEFycmF5IG9mIGtleXMgdG8gdG90YWxcbiAgICAgICAgICAgIGlmIChjb2x1bW5zVG9TdW0ubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgIGNvbHVtbnNUb1N1bS5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoSGVscGVycy5pc0JsYW5rKGNvbHVtblN1bXNbY29sdW1uXSkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtblN1bXNbY29sdW1uXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtblN1bXNbY29sdW1uXSArPSByb3dbY29sdW1uXTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTm92b1RhYmxlTW9kZS5FRElUKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRhYmxlRWRpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBTZXR1cCB0aGUgZm9vdGVycyAoaWYgYW55KVxuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5mb290ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmZvb3RlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmZvb3RlcnMuZm9yRWFjaCgoZm9vdGVyQ29uZmlnLCBmb290ZXJDb25maWdJbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmb290ZXIgPSB7fTtcbiAgICAgICAgICAgICAgZm9vdGVyW2Zvb3RlckNvbmZpZy5sYWJlbENvbHVtbl0gPSBmb290ZXJDb25maWcubGFiZWw7XG4gICAgICAgICAgICAgIGZvb3RlckNvbmZpZy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmb290ZXJDb25maWcubWV0aG9kID09PSAnQVZHJyAmJiB0aGlzLl9yb3dzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgZm9vdGVyW2NvbHVtbl0gPSBjb2x1bW5TdW1zW2NvbHVtbl0gLyB0aGlzLl9yb3dzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZm9vdGVyW2NvbHVtbl0gPSBjb2x1bW5TdW1zW2NvbHVtbl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5mb290ZXJzLnB1c2goZm9vdGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nKSB7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZSA9IHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50O1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnBhZ2VTaXplID0gdGhpcy5jb25maWcucGFnaW5nLml0ZW1zUGVyUGFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUGFnaW5nIHR1cm5lZCBvZmYsIHJldHVybiBiYXNpY2FsbHkgYWxsIG9mIHRoZSBkYXRhXG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZSA9IDE7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZVNpemUgPSA1MDA7XG4gICAgfVxuICAgIGlmIChkcCAmJiBkcC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldHVwQ29sdW1uRGVmYXVsdHMoKTtcbiAgICB9XG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyLnJlZnJlc2goKTtcbiAgfVxuICBnZXQgZGF0YVByb3ZpZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhUHJvdmlkZXI7XG4gIH1cblxuICBnZXQgZWRpdGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQ7XG4gIH1cblxuICBnZXQgZm9ybVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnRhYmxlRm9ybS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgZm9ybVV0aWxzOiBGb3JtVXRpbHMsIHByaXZhdGUgYnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcbiAgICBub3RpZnkoJ1tEZXByZWNhdGVkXTogVGhlIHRhYmxlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSBtaWdyYXRlIHRvIG5vdm8tZGF0YS10YWJsZXMhJyk7XG4gIH1cblxuICBvbkRyb3Bkb3duVG9nZ2xlZChldmVudCwgY29sdW1uKTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uXSA9IGV2ZW50O1xuICB9XG5cbiAgZm9jdXNJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5maWx0ZXJJbnB1dHMgJiYgdGhpcy5maWx0ZXJJbnB1dHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZpbHRlcklucHV0cy5mb3JFYWNoKChmaWx0ZXJJbnB1dCkgPT4ge1xuICAgICAgICBpZiAoZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25QYWdlQ2hhbmdlKGV2ZW50KSB7XG4gICAgLy8gdGhpcy5kYXRhUHJvdmlkZXIucGFnZSA9IGV2ZW50LnBhZ2U7XG4gICAgLy8gdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgPSBldmVudC5pdGVtc1BlclBhZ2U7XG4gIH1cblxuICBnZXRPcHRpb25EYXRhQXV0b21hdGlvbklkKG9wdGlvbikge1xuICAgIGlmICghSGVscGVycy5pc0JsYW5rKG9wdGlvbi52YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb24udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBzZXR1cENvbHVtbkRlZmF1bHRzKCkge1xuICAgIC8vIENoZWNrIGNvbHVtbnMgZm9yIGNlbGwgb3B0aW9uIHR5cGVzXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4udHlwZSkge1xuICAgICAgICBzd2l0Y2ggKGNvbHVtbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAvLyBTZXQgb3B0aW9ucyBiYXNlZCBvbiBkYXRlcyBpZiB0aGVyZSBhcmUgbm9uZVxuICAgICAgICAgICAgY29sdW1uLm9wdGlvbnMgPSBjb2x1bW4ub3B0aW9ucyB8fCB0aGlzLmdldERlZmF1bHRPcHRpb25zKGNvbHVtbik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nICYmIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ICE9PSB0aGlzLmxhc3RQYWdlKSB7XG4gICAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5sYXN0UGFnZSA9IHRoaXMuY29uZmlnLnBhZ2luZyA/IHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50IDogMTtcbiAgfVxuXG4gIGdldFBhZ2VTdGFydCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYWdpbmcgPyAodGhpcy5kYXRhUHJvdmlkZXIucGFnZSAtIDEpICogdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgOiAwO1xuICB9XG5cbiAgZ2V0UGFnZUVuZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYWdpbmcgJiYgdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgPiAtMSA/IHRoaXMuZ2V0UGFnZVN0YXJ0KCkgKyB0aGlzLmRhdGFQcm92aWRlci5wYWdlU2l6ZSA6IHRoaXMucm93cy5sZW5ndGg7XG4gIH1cblxuICBnZXRSb3dDb250cm9sRm9ybShpKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXk7XG4gICAgcmV0dXJuIHRhYmxlRm9ybVJvd3MuY29udHJvbHNbaV07XG4gIH1cblxuICBvbkZpbHRlckNsaWNrKGNvbHVtbiwgZmlsdGVyKSB7XG4gICAgaWYgKGZpbHRlci5yYW5nZSAmJiAhY29sdW1uLmNhbGVuZGFyU2hvdykge1xuICAgICAgY29sdW1uLmNhbGVuZGVyU2hvdyA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbi5maWx0ZXIpICYmIGNvbHVtbi5tdWx0aXBsZSkge1xuICAgICAgaWYgKH5jb2x1bW4uZmlsdGVyLmluZGV4T2YoZmlsdGVyKSkge1xuICAgICAgICAvLyBSZW1vdmUgZmlsdGVyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIuc3BsaWNlKGNvbHVtbi5maWx0ZXIuaW5kZXhPZihmaWx0ZXIpLCAxKTtcbiAgICAgICAgaWYgKGZpbHRlci5yYW5nZSkge1xuICAgICAgICAgIGNvbHVtbi5jYWxlbmRlclNob3cgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2x1bW4uZmlsdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgZmlsdGVyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIucHVzaChmaWx0ZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29sdW1uLm11bHRpcGxlKSB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gbmV3IEFycmF5KCk7XG4gICAgICBjb2x1bW4uZmlsdGVyLnB1c2goSGVscGVycy5pc0JsYW5rKGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIgOiBmaWx0ZXIudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gSGVscGVycy5pc0JsYW5rKGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIgOiBmaWx0ZXIudmFsdWU7XG4gICAgfVxuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgfVxuXG4gIG9uRmlsdGVyQ2xlYXIoY29sdW1uOiBhbnkpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xuICAgICAgY29sdW1uLmZyZWV0ZXh0RmlsdGVyID0gbnVsbDtcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgICAgIGlmIChjb2x1bW4ub3JpZ2luYWxPcHRpb25zKSB7XG4gICAgICAgIGNvbHVtbi5vcHRpb25zID0gY29sdW1uLm9yaWdpbmFsT3B0aW9ucztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyQWxsU29ydEFuZEZpbHRlcnMoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlcmluZykge1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW4uZmlsdGVyID0gbnVsbDtcbiAgICAgICAgY29sdW1uLnNvcnQgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCB1cGRhdGVzIHRoZSByb3cgZGF0YSB0byByZWZsZWN0IHRoZSBhY3RpdmUgZmlsdGVycy5cbiAgICovXG4gIG9uRmlsdGVyQ2hhbmdlKGV2ZW50PzogRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZmlsdGVyaW5nKSB7XG4gICAgICAvLyBBcnJheSBvZiBmaWx0ZXJzXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5jb2x1bW5zLmZpbHRlcigoY29sKSA9PiAhSGVscGVycy5pc0VtcHR5KGNvbC5maWx0ZXIpKTtcbiAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICBsZXQgcXVlcnkgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgZmlsdGVycykge1xuICAgICAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24oY29sdW1uLm1hdGNoKSkge1xuICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0gKHZhbHVlLCByZWNvcmQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5tYXRjaChyZWNvcmQsIGNvbHVtbi5maWx0ZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi5wcmVGaWx0ZXIgJiYgSGVscGVycy5pc0Z1bmN0aW9uKGNvbHVtbi5wcmVGaWx0ZXIpKSB7XG4gICAgICAgICAgICBxdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5LCBjb2x1bW4ucHJlRmlsdGVyKHRoaXMuZXNjYXBlQ2hhcmFjdGVycyhjb2x1bW4uZmlsdGVyKSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW4uZmlsdGVyKSkge1xuICAgICAgICAgICAgLy8gVGhlIGZpbHRlcnMgYXJlIGFuIGFycmF5IChtdWx0aS1zZWxlY3QpLCBjaGVjayB2YWx1ZVxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBjb2x1bW4uZmlsdGVyO1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSBhbiBhcnJheSBvZiB7dmFsdWU6ICcnLCBsYWJlbHM6ICcnfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnNbMF0udmFsdWUgfHwgb3B0aW9uc1swXS5sYWJlbCkge1xuICAgICAgICAgICAgICBvcHRpb25zID0gY29sdW1uLmZpbHRlci5tYXAoKG9wdCkgPT4gb3B0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHsgYW55OiBvcHRpb25zIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChjb2x1bW4udHlwZSAmJiBjb2x1bW4udHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uLmZpbHRlci5zdGFydERhdGUgJiYgY29sdW1uLmZpbHRlci5lbmREYXRlKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHtcbiAgICAgICAgICAgICAgICBtaW46IGRhdGVGbnMuc3RhcnRPZkRheShjb2x1bW4uZmlsdGVyLnN0YXJ0RGF0ZSksXG4gICAgICAgICAgICAgICAgbWF4OiBkYXRlRm5zLnN0YXJ0T2ZEYXkoZGF0ZUZucy5hZGREYXlzKGRhdGVGbnMuc3RhcnRPZkRheShjb2x1bW4uZmlsdGVyLmVuZERhdGUpLCAxKSksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBxdWVyeVtjb2x1bW4ubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgbWluOiBjb2x1bW4uZmlsdGVyLm1pbiA/IGRhdGVGbnMuYWRkRGF5cyhkYXRlRm5zLnN0YXJ0T2ZUb2RheSgpLCBjb2x1bW4uZmlsdGVyLm1pbikgOiBkYXRlRm5zLnN0YXJ0T2ZUb2RheSgpLFxuICAgICAgICAgICAgICAgIG1heDogY29sdW1uLmZpbHRlci5tYXggPyBkYXRlRm5zLmFkZERheXMoZGF0ZUZucy5zdGFydE9mVG9tb3Jyb3coKSwgY29sdW1uLmZpbHRlci5tYXgpIDogZGF0ZUZucy5zdGFydE9mVG9tb3Jyb3coKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0gY29sdW1uLmZpbHRlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5maWx0ZXJpbmcpKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuZmlsdGVyaW5nKHF1ZXJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZmlsdGVyID0gcXVlcnk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5maWx0ZXIgPSB7fTtcbiAgICAgIH1cbiAgICAgIC8vIFRyaWNrbGUgZG93biB0byBrZWVwIHNvcnRcbiAgICAgIC8vIHRoaXMub25Tb3J0Q2hhbmdlKHRoaXMuY3VycmVudFNvcnRDb2x1bW4pO1xuICAgICAgdGhpcy5maXJlVGFibGVDaGFuZ2VFdmVudCgpO1xuXG4gICAgICAvLyBJZiBwYWdpbmcsIHJlc2V0IHBhZ2VcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcbiAgICAgICAgdGhpcy5jb25maWcucGFnaW5nLmN1cnJlbnQgPSAxO1xuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXG4gICAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RBbGwoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVzY2FwZUNoYXJhY3RlcnMoZmlsdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZmlsdGVyLnJlcGxhY2UoLycvZywgXCInJ1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxuXG4gIGlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgZmlsdGVyKTogYm9vbGVhbiB7XG4gICAgLy8gVE9ETzogVGhpcyBuZWVkcyB0byBiZSByZWZhY3RvcmVkXG4gICAgbGV0IGlzQWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKGNvbHVtbiAmJiAhSGVscGVycy5pc0JsYW5rKGNvbHVtbi5maWx0ZXIpICYmICFIZWxwZXJzLmlzQmxhbmsoZmlsdGVyKSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1uLmZpbHRlcikpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyLnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmxhYmVsID09PSBmaWx0ZXIubGFiZWw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyLmluY2x1ZGVzKGZpbHRlcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29sdW1uLmZpbHRlciA9PT0gdHlwZW9mIGZpbHRlcikge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlciA9PT0gZmlsdGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlciA9PT0gZmlsdGVyLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0FjdGl2ZTtcbiAgfVxuXG4gIG9uU29ydENoYW5nZShjb2x1bW4pIHtcbiAgICB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uID0gY29sdW1uO1xuICAgIGNvbnN0IHNvcnRlZENvbHVtbnM6IGFueSA9IHRoaXMuY29sdW1ucy5maWx0ZXIoKHRoaXNDb2x1bW4pID0+IHtcbiAgICAgIHJldHVybiB0aGlzQ29sdW1uLnNvcnQgJiYgdGhpc0NvbHVtbiAhPT0gdGhpcy5jdXJyZW50U29ydENvbHVtbjtcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IHNvcnRlZENvbHVtbiBvZiBzb3J0ZWRDb2x1bW5zKSB7XG4gICAgICBzb3J0ZWRDb2x1bW4uc29ydCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNvbHVtbikge1xuICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5zb3J0aW5nKSkge1xuICAgICAgICB0aGlzLmNvbmZpZy5zb3J0aW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbihjb2x1bW4ucHJlU29ydCkpIHtcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNvcnQgPSBbXS5jb25jYXQoY29sdW1uLnByZVNvcnQoY29sdW1uKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuc29ydCA9IFt7IGZpZWxkOiBjb2x1bW4uY29tcGFyZSB8fCBjb2x1bW4ubmFtZSwgcmV2ZXJzZTogY29sdW1uLnNvcnQgPT09ICdkZXNjJyB9XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXJlIHRhYmxlIGNoYW5nZSBldmVudFxuICAgIC8vIHRoaXMuZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKTtcblxuICAgIC8vIElmIHBhZ2luZywgcmVzZXQgcGFnZVxuICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcbiAgICAgIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ID0gMTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYWxsIHNlbGVjdGlvbiBvbiBzb3J0IGNoYW5nZSBpZiBzZWxlY3Rpb24gaXMgb25cbiAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBmaXJlVGFibGVDaGFuZ2VFdmVudCgpIHtcbiAgICAvLyBDb25zdHJ1Y3QgYSB0YWJsZSBjaGFuZ2Ugb2JqZWN0XG4gICAgY29uc3Qgb25UYWJsZUNoYW5nZTogYW55ID0ge307XG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuY29sdW1ucy5maWx0ZXIoKGNvbCkgPT4gY29sLmZpbHRlciAmJiBjb2wuZmlsdGVyLmxlbmd0aCk7XG4gICAgb25UYWJsZUNoYW5nZS5maWx0ZXIgPSBmaWx0ZXJzLmxlbmd0aCA/IGZpbHRlcnMgOiBmYWxzZTtcbiAgICBvblRhYmxlQ2hhbmdlLnNvcnQgPSB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uID8gdGhpcy5jdXJyZW50U29ydENvbHVtbiA6IGZhbHNlO1xuICAgIG9uVGFibGVDaGFuZ2Uucm93cyA9IHRoaXMucm93cztcblxuICAgIC8vIEVtaXQgZXZlbnRcbiAgICB0aGlzLm9uVGFibGVDaGFuZ2UuZW1pdChvblRhYmxlQ2hhbmdlKTtcbiAgfVxuXG4gIGZpbmRDb2x1bW5JbmRleCh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5jb2x1bW5zW2ldLm5hbWUgPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uT3JkZXJDaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zdCBvbGRJbmRleCA9IHRoaXMuZmluZENvbHVtbkluZGV4KGV2ZW50LmZpcnN0Lm5hbWUpO1xuICAgIGNvbnN0IG5ld0luZGV4ID0gdGhpcy5maW5kQ29sdW1uSW5kZXgoZXZlbnQuc2Vjb25kLm5hbWUpO1xuICAgIHRoaXMuY29sdW1ucy5zcGxpY2UobmV3SW5kZXgsIDAsIHRoaXMuY29sdW1ucy5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICB0aGlzLm9uU29ydENoYW5nZSh0aGlzLmN1cnJlbnRTb3J0Q29sdW1uKTtcbiAgfVxuXG4gIGV4cGFuZEFsbE9uUGFnZShleHBhbmRlZCkge1xuICAgIHRoaXMuY29uZmlnLmV4cGFuZEFsbCA9ICFleHBhbmRlZDtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLmRhdGFQcm92aWRlci5saXN0KSB7XG4gICAgICByb3cuX2V4cGFuZGVkID0gdGhpcy5jb25maWcuZXhwYW5kQWxsO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFBhZ2UoZGF0YT86IGFueSkge1xuICAgIGlmICghdGhpcy5tYXN0ZXIpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcbiAgICAgIC8vIE9ubHkgc2hvdyB0aGUgc2VsZWN0IGFsbCBtZXNzYWdlIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgbmV3IHBhZ2Ugc2VsZWN0ZWQgYXQgYSB0aW1lXG4gICAgICB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID0gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA+IDAgPyB0aGlzLnNlbGVjdGVkUGFnZUNvdW50IC0gMSA6IDA7XG4gICAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgLy8gdGhpcy5wYWdlZERhdGEgPSB0aGlzLnJvd3Muc2xpY2UodGhpcy5nZXRQYWdlU3RhcnQoKSwgdGhpcy5nZXRQYWdlRW5kKCkpO1xuICAgICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5wYWdlZERhdGEpIHtcbiAgICAgICAgcm93Ll9zZWxlY3RlZCA9IHRoaXMubWFzdGVyO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5zZWxlY3RlZCk7XG4gICAgICAvLyBPbmx5IHNob3cgdGhlIHNlbGVjdCBhbGwgbWVzc2FnZSB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIG5ldyBwYWdlIHNlbGVjdGVkIGF0IGEgdGltZVxuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCsrO1xuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPT09IDEgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggIT09IHRoaXMuZGF0YVByb3ZpZGVyLnRvdGFsO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEFsbCh2YWx1ZSkge1xuICAgIHRoaXMubWFzdGVyID0gdmFsdWU7XG4gICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5kYXRhUHJvdmlkZXIubGlzdCkge1xuICAgICAgcm93Ll9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWUgPyB0aGlzLmRhdGFQcm92aWRlci5saXN0IDogW107XG4gICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID4gMCA/IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgLSAxIDogMDtcbiAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcbiAgfVxuXG4gIHJvd1NlbGVjdEhhbmRsZXIoZGF0YT86IGFueSkge1xuICAgIC8vIHRoaXMucGFnZWREYXRhID0gdGhpcy5yb3dzLnNsaWNlKHRoaXMuZ2V0UGFnZVN0YXJ0KCksIHRoaXMuZ2V0UGFnZUVuZCgpKTtcbiAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRhdGFQcm92aWRlci5saXN0LmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgIGlmICh0aGlzLnBhZ2VTZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubWFzdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFnZVNlbGVjdGVkLmxlbmd0aCA9PT0gdGhpcy5wYWdlZERhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hc3RlciA9IHRydWU7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXN0ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IHRydWU7XG5cbiAgICAgIC8vIEJyZWFraW5nIHRoZSBzZWxlY3RlZCBwYWdlIGNvdW50XG4gICAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgICB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID0gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA+IDAgPyB0aGlzLnNlbGVjdGVkUGFnZUNvdW50IC0gMSA6IDA7XG4gICAgfVxuICAgIHRoaXMuZW1pdFNlbGVjdGVkKHRoaXMuc2VsZWN0ZWQpO1xuICB9XG5cbiAgZW1pdFNlbGVjdGVkKHNlbGVjdGVkKSB7XG4gICAgdGhpcy5vblJvd1NlbGVjdC5lbWl0KHsgbGVuZ3RoOiBzZWxlY3RlZC5sZW5ndGgsIHNlbGVjdGVkIH0pO1xuICB9XG5cbiAgcm93Q2xpY2tIYW5kbGVyKHJvdykge1xuICAgIGlmICh0aGlzLmNvbmZpZy5yb3dTZWxlY3QpIHtcbiAgICAgIHRoaXMuYWN0aXZlSWQgPSByb3cuaWQgfHwgMDtcbiAgICAgIHRoaXMub25Sb3dDbGljay5lbWl0KHJvdyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVmYXVsdE9wdGlvbnMoY29sdW1uKSB7XG4gICAgLy8gVE9ETyAtIG5lZWRzIHRvIGNvbWUgZnJvbSBsYWJlbCBzZXJ2aWNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2J1bGxob3JuL25vdm8tZWxlbWVudHMvaXNzdWVzLzExNlxuICAgIGNvbnN0IG9wdHM6IGFueVtdID0gW1xuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFEYXksIG1pbjogLTEsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDdEYXlzLCBtaW46IC03LCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QzMERheXMsIG1pbjogLTMwLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3Q5MERheXMsIG1pbjogLTkwLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QxWWVhciwgbWluOiAtMzY2LCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQxRGF5LCBtaW46IDAsIG1heDogMSB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDdEYXlzLCBtaW46IDAsIG1heDogNyB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDMwRGF5cywgbWluOiAwLCBtYXg6IDMwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0OTBEYXlzLCBtaW46IDAsIG1heDogOTAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQxWWVhciwgbWluOiAwLCBtYXg6IDM2NiB9LFxuICAgIF07XG5cbiAgICBpZiAoY29sdW1uICYmIGNvbHVtbi5yYW5nZSkge1xuICAgICAgb3B0cy5wdXNoKHtcbiAgICAgICAgbGFiZWw6IHRoaXMubGFiZWxzLmN1c3RvbURhdGVSYW5nZSxcbiAgICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdHM7XG4gIH1cblxuICBvbkNhbGVuZGVyU2VsZWN0KGNvbHVtbiwgZXZlbnQpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChldmVudC5zdGFydERhdGUgJiYgZXZlbnQuZW5kRGF0ZSkge1xuICAgICAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICB9XG5cbiAgb25GaWx0ZXJLZXl3b3Jkcyhjb25maWcpIHtcbiAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5maWx0ZXJpbmcgJiYgY29uZmlnLmZpbHRlcmluZy5mcmVldGV4dEZpbHRlcikge1xuICAgICAgY29uc3QgZmlsdGVyS2V5d29yZHMgPSBjb25maWcuZmlsdGVyaW5nLmZyZWV0ZXh0RmlsdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIWNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zKSB7XG4gICAgICAgIGNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zID0gY29uZmlnLmZpbHRlcmluZy5vcHRpb25zO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3T3B0aW9ucyA9IGNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbiAmJiBvcHRpb24ubGFiZWwgPyBvcHRpb24ubGFiZWwgOiBvcHRpb247XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKSA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBmaWx0ZXJLZXl3b3Jkcykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKH52YWx1ZS5pbmRleE9mKGZpbHRlcktleXdvcmRzKSB8fCB+dmFsdWUuaW5kZXhPZihmaWx0ZXJLZXl3b3JkcykpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcub3B0aW9ucyA9IG5ld09wdGlvbnM7XG4gICAgICBjb25maWcuZmlsdGVyaW5nLmZpbHRlciA9IGNvbmZpZy5maWx0ZXJpbmcuZnJlZXRleHRGaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcub3B0aW9ucyA9IGNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zO1xuICAgIH1cbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgdGhlIFRhYmxlIGludG8gRURJVCBtb2RlLCBiYXNlZCBvbiB0aGUgcm93L2NvbHVtbiBwYXNzZWQgeW91IGNhbiBlbnRlciBpbiBhIGZldyBzdGF0ZXNcbiAgICogKDEpIHNldFRhYmxlRWRpdCgpIC0gZG9uJ3QgcGFzcyBhbnkgdG8gcHV0IHRoZSBGVUxMIHRhYmxlIGludG8gZWRpdCBtb2RlXG4gICAqICgyKSBzZXRUYWJsZUVkaXQoMSkgLSBwYXNzIG9ubHkgcm93IHRvIHB1dCB0aGF0IEZVTEwgcm93IG9mIHRoZSB0YWJsZSBpbnRvIGVkaXQgbW9kZVxuICAgKiAoMykgc2V0VGFibGVFZGl0KDEsIDEpIC0gcGFzcyByb3cgYW5kIGNvbHVtbiB0byBwdXQgdGhhdCBjb2x1bW4gb2YgdGhlIHJvdyBvZiB0aGUgdGFibGUgaW50byBlZGl0IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHNldFRhYmxlRWRpdChyb3dOdW1iZXI/OiBudW1iZXIsIGNvbHVtbk51bWJlcj86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubW9kZSA9IE5vdm9UYWJsZU1vZGUuRURJVDtcbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZWRpdCgpO1xuICAgIHRoaXMuX3Jvd3MuZm9yRWFjaCgocm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgcm93Ll9lZGl0aW5nID0gcm93Ll9lZGl0aW5nIHx8IHt9O1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgY29sdW1uSW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi52aWV3T25seSkge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzRW1wdHkocm93TnVtYmVyKSAmJiBIZWxwZXJzLmlzRW1wdHkoY29sdW1uTnVtYmVyKSkge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFIZWxwZXJzLmlzRW1wdHkocm93TnVtYmVyKSAmJiByb3dJbmRleCA9PT0gTnVtYmVyKHJvd051bWJlcikgJiYgSGVscGVycy5pc0VtcHR5KGNvbHVtbk51bWJlcikpIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAhSGVscGVycy5pc0VtcHR5KHJvd051bWJlcikgJiZcbiAgICAgICAgICAhSGVscGVycy5pc0VtcHR5KGNvbHVtbk51bWJlcikgJiZcbiAgICAgICAgICByb3dJbmRleCA9PT0gTnVtYmVyKHJvd051bWJlcikgJiZcbiAgICAgICAgICBjb2x1bW5JbmRleCA9PT0gTnVtYmVyKGNvbHVtbk51bWJlcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gTGVhdmVzIGVkaXQgbW9kZSBmb3IgdGhlIFRhYmxlIGFuZCBwdXRzIGV2ZXJ5dGhpbmcgYmFjayB0byBWSUVXIG9ubHlcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICogQHBhcmFtIGNhbmNlbCAtIHdoZXRoZXIgb3Igbm90IHRvIHNhdmUgZGF0YSBvciB1bmRvXG4gICAqL1xuICBwcml2YXRlIGxlYXZlRWRpdE1vZGUoY2FuY2VsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlID0gTm92b1RhYmxlTW9kZS5WSUVXO1xuICAgIHRoaXMuX3Jvd3MuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICByb3cuX2VkaXRpbmcgPSByb3cuX2VkaXRpbmcgfHwge307XG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChjYW5jZWwpIHtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci51bmRvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5jb21taXQoKTtcbiAgICB9XG4gICAgdGhpcy5oaWRlVG9hc3RNZXNzYWdlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgYSBuZXcgcm93IGludG8gdGhlIHRhYmxlIHRvIGJlIGVkaXRlZCwgY2FuIGJlIGNhbGxlZCBmcm9tIGEgbG9jYWwgcmVmZXJlbmNlIG9mIHRoZSB0YWJsZSBpbiB5b3VyIHRlbXBsYXRlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBhZGRFZGl0YWJsZVJvdyhkZWZhdWx0VmFsdWU6IGFueSA9IHt9KTogdm9pZCB7XG4gICAgY29uc3QgdGFibGVGb3JtUm93cyA9IHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MgYXMgRm9ybUFycmF5O1xuICAgIGNvbnN0IHJvdzogYW55ID0ge307XG4gICAgY29uc3Qgcm93Q29udHJvbHMgPSBbXTtcbiAgICByb3cuY29udHJvbHMgPSB7fTtcbiAgICByb3cuX2VkaXRpbmcgPSB7fTtcbiAgICByb3cucm93SWQgPSB0aGlzLl9yb3dzLmxlbmd0aCArIDE7XG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgLy8gVXNlIHRoZSBjb250cm9sIHBhc3NlZCBvciB1c2UgYSBSZWFkT25seUNvbnRyb2wgc28gdGhhdCB0aGUgZm9ybSBoYXMgdGhlIHZhbHVlc1xuICAgICAgY29uc3QgY29udHJvbCA9IGNvbHVtbi5lZGl0b3JDb25maWdcbiAgICAgICAgPyBDb250cm9sRmFjdG9yeS5jcmVhdGUoY29sdW1uLmVkaXRvclR5cGUsIGNvbHVtbi5lZGl0b3JDb25maWcpXG4gICAgICAgIDogbmV3IFJlYWRPbmx5Q29udHJvbCh7IGtleTogY29sdW1uLm5hbWUgfSk7XG4gICAgICBjb250cm9sLnZhbHVlID0gbnVsbDsgLy8gcmVtb3ZlIGNvcGllZCBjb2x1bW4gdmFsdWVcbiAgICAgIHJvdy5jb250cm9sc1tjb2x1bW4ubmFtZV0gPSBjb250cm9sO1xuICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9ICFjb2x1bW4udmlld09ubHk7XG4gICAgICByb3dDb250cm9scy5wdXNoKGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHRoaXMuZm9ybVV0aWxzLnNldEluaXRpYWxWYWx1ZXMocm93Q29udHJvbHMsIGRlZmF1bHRWYWx1ZSwgZmFsc2UpO1xuICAgIHRhYmxlRm9ybVJvd3MucHVzaCh0aGlzLmZvcm1VdGlscy50b0Zvcm1Hcm91cChyb3dDb250cm9scykpO1xuICAgIHRoaXMuX3Jvd3MucHVzaChyb3cpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBWYWxpZGF0ZXMgdGhlIEZvcm0gaW5zaWRlIG9mIHRoZSBUYWJsZSwgaWYgdGhlcmUgYXJlIGVycm9ycyBpdCB3aWxsIGRpc3BsYXkvcmV0dXJuIHRoZSBlcnJvcnMgZm9yIGVhY2ggcm93LlxuICAgKiBJZiB0aGVyZSBhcmUgbm8gZXJyb3JzLCB0aGVuIGl0IHdpbGwgcmV0dXJuIE9OTFkgdGhlIGNoYW5nZWQgZGF0YSBmb3IgZWFjaCByb3csIHRoZSBkYXRhIHJldHVybmVkIHdpbGwgYmUgaW4gdGhlIGZvcm06XG4gICAqIHsgaWQ6IElEX09GX1JFQ09SRCwga2V5OiB2YWx1ZSB9IC0tIGRhdGEgdGhhdCB3YXMgdXBkYXRlZFxuICAgKiB7IGlkOiB1bmRlZmluZWQsIGtleTogdmFsdWUgfSAtLSBkYXRhIHRoYXQgd2FzIGFkZGVkXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICB2YWxpZGF0ZUFuZEdldFVwZGF0ZWREYXRhKCk6IHsgY2hhbmdlZD86IGFueVtdOyBlcnJvcnM/OiB7IGVycm9yczogYW55OyByb3c6IGFueTsgaW5kZXg6IG51bWJlciB9W10gfSB7XG4gICAgaWYgKHRoaXMudGFibGVGb3JtICYmIHRoaXMudGFibGVGb3JtLmNvbnRyb2xzICYmIHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MpIHtcbiAgICAgIGNvbnN0IGNoYW5nZWRSb3dzID0gW107XG4gICAgICBjb25zdCBlcnJvcnMgPSBbXTtcbiAgICAgIC8vIEdvIG92ZXIgdGhlIEZvcm1BcnJheSdzIGNvbnRyb2xzXG4gICAgICAodGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzLmZvckVhY2goKGZvcm1Hcm91cDogRm9ybUdyb3VwLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGxldCBjaGFuZ2VkUm93ID0gbnVsbDtcbiAgICAgICAgbGV0IGVycm9yID0gbnVsbDtcbiAgICAgICAgLy8gR28gb3ZlciB0aGUgZm9ybSBncm91cCBjb250cm9sc1xuICAgICAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udHJvbCA9IGZvcm1Hcm91cC5jb250cm9sc1trZXldO1xuICAgICAgICAgIC8vIEhhbmRsZSB2YWx1ZSBjaGFuZ2luZ1xuICAgICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuZGlydHkgJiYgIWNvbnRyb2wuZXJyb3JzKSB7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZWRSb3cpIHtcbiAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBJRCwgc28gd2UgaGF2ZSBzb21lIGtleSB0byBzYXZlIGFnYWluc3RcbiAgICAgICAgICAgICAgY2hhbmdlZFJvdyA9IHt9O1xuICAgICAgICAgICAgICBpZiAodGhpcy5fcm93c1tpbmRleF0uaWQpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkUm93LmlkID0gdGhpcy5fcm93c1tpbmRleF0uaWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGRpcnR5LCBncmFiIHZhbHVlIG9mZiB0aGUgZm9ybVxuICAgICAgICAgICAgY2hhbmdlZFJvd1trZXldID0gdGhpcy50YWJsZUZvcm0udmFsdWUucm93c1tpbmRleF1ba2V5XTtcbiAgICAgICAgICAgIC8vIFNldCB2YWx1ZSBiYWNrIHRvIHJvdyAoc2hvdWxkIGJlIGFscmVhZHkgZG9uZSB2aWEgdGhlIHNlcnZlciBjYWxsLCBidXQgZG8gaXQgYW55d2F5KVxuICAgICAgICAgICAgdGhpcy5fcm93c1tpbmRleF1ba2V5XSA9IGNoYW5nZWRSb3dba2V5XTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5lcnJvcnMpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvcnNcbiAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgZXJyb3IgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycm9yW2tleV0gPSBjb250cm9sLmVycm9ycztcbiAgICAgICAgICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjaGFuZ2VkUm93KSB7XG4gICAgICAgICAgY2hhbmdlZFJvd3MucHVzaChjaGFuZ2VkUm93KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaCh7IGVycm9yczogZXJyb3IsIHJvdzogdGhpcy5fcm93c1tpbmRleF0sIGluZGV4IH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJldCA9IHt9O1xuICAgICAgLy8gUmV0dXJuIGVycm9ycyBpZiBhbnksIG90aGVyd2lzZSByZXR1cm4gdGhlIGNoYW5nZWQgcm93c1xuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHsgY2hhbmdlZDogY2hhbmdlZFJvd3MgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGVycm9ycyB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmVmcmVzaCB0aGUgZGF0YSBwcm92aWRlciBhbmQgbGVhdmUgZWRpdCBtb2RlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBjYW5jZWxFZGl0aW5nKCk6IHZvaWQge1xuICAgIHRoaXMubGVhdmVFZGl0TW9kZSh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmVmcmVzaCB0aGUgZGF0YSBwcm92aWRlciBhbmQgbGVhdmUgZWRpdCBtb2RlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBzYXZlQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmxlYXZlRWRpdE1vZGUoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwbGF5cyBhIHRvYXN0IG1lc3NhZ2UgaW5zaWRlIG9mIHRoZSB0YWJsZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgZGlzcGxheVRvYXN0TWVzc2FnZSh0b2FzdDogeyBpY29uOiBzdHJpbmc7IHRoZW1lOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB9LCBoaWRlRGVsYXk/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnRvYXN0ID0gdG9hc3Q7XG4gICAgaWYgKGhpZGVEZWxheSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGVUb2FzdE1lc3NhZ2UoKSwgaGlkZURlbGF5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEZvcmNlIGhpZGUgdGhlIHRvYXN0IG1lc3NhZ2VcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGhpZGVUb2FzdE1lc3NhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy50b2FzdCA9IG51bGw7XG4gICAgLy8gSGFjayB0byBtYWtlIHRoZSB0YWJsZSBkaXNwbGF5IHByb3Blcmx5IGFmdGVyIGhpZGluZyB0aGUgdG9hc3RcbiAgICB0aGlzLmdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3QgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5ncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0ID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGRpc3BsYXkgdGhlIGxvYWRpbmcgb3ZlcmxheSBvbiB0aGUgdGFibGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHRvZ2dsZUxvYWRpbmcoc2hvdzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IHNob3c7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGhpZGUgYSBjb2x1bW4gaW4gZWRpdCBvciB2aWV3IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGlzQ29sdW1uSGlkZGVuKGNvbHVtbjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWRpdGluZyA/ICEhY29sdW1uLmhpZGVDb2x1bW5PbkVkaXQgOiAhIWNvbHVtbi5oaWRlQ29sdW1uT25WaWV3O1xuICB9XG59XG4iXX0=