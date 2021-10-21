import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTable, CDK_TABLE_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, EventEmitter, HostBinding, Input, ViewEncapsulation, } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { notify } from '../../utils/notifier/notifier.util';
import { NovoActivityTableState } from './state';
import { ActivityTableDataSource } from './table-source';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
import * as i2 from "../../services/novo-label-service";
import * as i3 from "./state";
import * as i4 from "@angular/common";
import * as i5 from "../search/SearchBox";
import * as i6 from "@angular/forms";
import * as i7 from "./pagination";
import * as i8 from "../loading/Loading";
import * as i9 from "./sort";
import * as i10 from "./cell";
import * as i11 from "./row";
import * as i12 from "./cell-header";
const _c0 = [[["caption"]], [["colgroup"], ["col"]]];
const _c1 = ["caption", "colgroup, col"];
function NovoActivityTable_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Total: ", ctx_r0.dataSource == null ? null : ctx_r0.dataSource.total, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Current: ", ctx_r0.dataSource == null ? null : ctx_r0.dataSource.current, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Totally Empty: ", ctx_r0.dataSource == null ? null : ctx_r0.dataSource.totallyEmpty, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Currently Empty: ", ctx_r0.dataSource == null ? null : ctx_r0.dataSource.currentlyEmpty, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Loading (DataSource): ", ctx_r0.dataSource == null ? null : ctx_r0.dataSource.loading, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("User Filtered: ", ctx_r0.state.userFiltered, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Loading (Table): ", ctx_r0.loading, "");
} }
function NovoActivityTable_header_1_novo_search_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-search", 11);
    i0.ɵɵlistener("searchChanged", function NovoActivityTable_header_1_novo_search_2_Template_novo_search_searchChanged_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.onSearchChange($event); })("ngModelChange", function NovoActivityTable_header_1_novo_search_2_Template_novo_search_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.state.globalSearch = $event; });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngModel", ctx_r7.state.globalSearch)("placeholder", ctx_r7.searchOptions == null ? null : ctx_r7.searchOptions.placeholder)("hint", ctx_r7.searchOptions == null ? null : ctx_r7.searchOptions.tooltip);
} }
function NovoActivityTable_header_1_novo_simple_table_pagination_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-simple-table-pagination", 12);
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("length", ctx_r8.dataSource == null ? null : ctx_r8.dataSource.total)("page", ctx_r8.paginationOptions.page)("pageSize", ctx_r8.paginationOptions.pageSize)("pageSizeOptions", ctx_r8.paginationOptions.pageSizeOptions);
} }
function NovoActivityTable_header_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header");
    i0.ɵɵprojection(1);
    i0.ɵɵtemplate(2, NovoActivityTable_header_1_novo_search_2_Template, 1, 3, "novo-search", 8);
    i0.ɵɵtemplate(3, NovoActivityTable_header_1_novo_simple_table_pagination_3_Template, 1, 4, "novo-simple-table-pagination", 9);
    i0.ɵɵelementStart(4, "div", 10);
    i0.ɵɵprojection(5, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.hideGlobalSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.paginationOptions);
} }
function NovoActivityTable_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelement(1, "novo-loading");
    i0.ɵɵelementEnd();
} }
function NovoActivityTable_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵprojection(1, 2);
    i0.ɵɵelementEnd();
} }
function NovoActivityTable_novo_simple_table_6_novo_simple_checkbox_header_cell_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-simple-checkbox-header-cell");
} }
function NovoActivityTable_novo_simple_table_6_novo_simple_checkbox_cell_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-simple-checkbox-cell", 22);
} if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const i_r19 = ctx.index;
    i0.ɵɵproperty("row", row_r18)("index", i_r19);
} }
function NovoActivityTable_novo_simple_table_6_ng_container_5_novo_simple_empty_header_cell_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-simple-empty-header-cell");
} if (rf & 2) {
    const column_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("button-header-cell", !column_r20.options)("dropdown-header-cell", column_r20.options);
} }
function NovoActivityTable_novo_simple_table_6_ng_container_5_novo_simple_action_cell_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-simple-action-cell", 26);
} if (rf & 2) {
    const row_r24 = ctx.$implicit;
    const column_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("row", row_r24)("column", column_r20);
} }
function NovoActivityTable_novo_simple_table_6_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 23);
    i0.ɵɵtemplate(1, NovoActivityTable_novo_simple_table_6_ng_container_5_novo_simple_empty_header_cell_1_Template, 1, 4, "novo-simple-empty-header-cell", 24);
    i0.ɵɵtemplate(2, NovoActivityTable_novo_simple_table_6_ng_container_5_novo_simple_action_cell_2_Template, 1, 2, "novo-simple-action-cell", 25);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const column_r20 = ctx.$implicit;
    i0.ɵɵproperty("novoSimpleColumnDef", column_r20.id);
} }
function NovoActivityTable_novo_simple_table_6_ng_container_6_novo_simple_header_cell_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-simple-header-cell", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r27 = i0.ɵɵnextContext().$implicit;
    const ctx_r28 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("column", column_r27)("novo-simple-cell-config", column_r27.config)("defaultSort", ctx_r28.defaultSort);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(column_r27.label);
} }
function NovoActivityTable_novo_simple_table_6_ng_container_6_novo_simple_cell_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-simple-cell", 30);
} if (rf & 2) {
    const row_r31 = ctx.$implicit;
    const column_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("column", column_r27)("row", row_r31);
} }
function NovoActivityTable_novo_simple_table_6_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 23);
    i0.ɵɵtemplate(1, NovoActivityTable_novo_simple_table_6_ng_container_6_novo_simple_header_cell_1_Template, 2, 4, "novo-simple-header-cell", 27);
    i0.ɵɵtemplate(2, NovoActivityTable_novo_simple_table_6_ng_container_6_novo_simple_cell_2_Template, 1, 2, "novo-simple-cell", 28);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const column_r27 = ctx.$implicit;
    i0.ɵɵproperty("novoSimpleColumnDef", column_r27.id);
} }
function NovoActivityTable_novo_simple_table_6_novo_simple_header_row_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-simple-header-row");
} }
function NovoActivityTable_novo_simple_table_6_novo_simple_row_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-simple-row");
} }
function NovoActivityTable_novo_simple_table_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-simple-table", 15);
    i0.ɵɵprojection(1, 3);
    i0.ɵɵelementContainerStart(2, 16);
    i0.ɵɵtemplate(3, NovoActivityTable_novo_simple_table_6_novo_simple_checkbox_header_cell_3_Template, 1, 0, "novo-simple-checkbox-header-cell", 17);
    i0.ɵɵtemplate(4, NovoActivityTable_novo_simple_table_6_novo_simple_checkbox_cell_4_Template, 1, 2, "novo-simple-checkbox-cell", 18);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵtemplate(5, NovoActivityTable_novo_simple_table_6_ng_container_5_Template, 3, 1, "ng-container", 19);
    i0.ɵɵtemplate(6, NovoActivityTable_novo_simple_table_6_ng_container_6_Template, 3, 1, "ng-container", 19);
    i0.ɵɵtemplate(7, NovoActivityTable_novo_simple_table_6_novo_simple_header_row_7_Template, 1, 0, "novo-simple-header-row", 20);
    i0.ɵɵtemplate(8, NovoActivityTable_novo_simple_table_6_novo_simple_row_8_Template, 1, 0, "novo-simple-row", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("empty", (ctx_r4.dataSource == null ? null : ctx_r4.dataSource.currentlyEmpty) && ctx_r4.state.userFiltered);
    i0.ɵɵproperty("dataSource", ctx_r4.dataSource)("hidden", (ctx_r4.dataSource == null ? null : ctx_r4.dataSource.totallyEmpty) && !ctx_r4.state.userFiltered);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r4.actionColumns);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.columns);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("novoSimpleHeaderRowDef", ctx_r4.displayedColumns);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("novoSimpleRowDefColumns", ctx_r4.displayedColumns);
} }
function NovoActivityTable_div_7_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵelementStart(1, "h4");
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r35 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r35.labels.noMatchingRecordsMessage, "");
} }
function NovoActivityTable_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵelementStart(1, "div", null, 32);
    i0.ɵɵprojection(3, 4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NovoActivityTable_div_7_div_4_Template, 4, 1, "div", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r34 = i0.ɵɵreference(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", _r34.childNodes.length == 0);
} }
function NovoActivityTable_div_8_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵelementStart(1, "h4");
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r37 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r37.labels.emptyTableMessage, "");
} }
function NovoActivityTable_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelementStart(1, "div", null, 37);
    i0.ɵɵprojection(3, 5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NovoActivityTable_div_8_div_4_Template, 4, 1, "div", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r36 = i0.ɵɵreference(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", _r36.childNodes.length == 0);
} }
const _c2 = [[["", "novo-activity-table-custom-header", ""]], [["", "novo-activity-table-actions", ""]], [["", "novo-activity-table-custom-filter", ""]], "*", [["", "novo-activity-table-no-results-message", ""]], [["", "novo-activity-table-empty-message", ""]]];
const _c3 = ["[novo-activity-table-custom-header]", "[novo-activity-table-actions]", "[novo-activity-table-custom-filter]", "*", "[novo-activity-table-no-results-message]", "[novo-activity-table-empty-message]"];
/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoTable = CdkTable;
export class NovoTable extends _NovoTable {
}
NovoTable.ɵfac = function NovoTable_Factory(t) { return ɵNovoTable_BaseFactory(t || NovoTable); };
NovoTable.ɵcmp = i0.ɵɵdefineComponent({ type: NovoTable, selectors: [["novo-simple-table"]], features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c1, decls: 6, vars: 0, consts: [["headerRowOutlet", ""], ["rowOutlet", ""], ["noDataRowOutlet", ""], ["footerRowOutlet", ""]], template: function NovoTable_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵprojection(0);
        i0.ɵɵprojection(1, 1);
        i0.ɵɵelementContainer(2, 0);
        i0.ɵɵelementContainer(3, 1);
        i0.ɵɵelementContainer(4, 2);
        i0.ɵɵelementContainer(5, 3);
    } }, directives: [i1.HeaderRowOutlet, i1.DataRowOutlet, i1.NoDataRowOutlet, i1.FooterRowOutlet], encapsulation: 2, changeDetection: 0 });
const ɵNovoTable_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoTable);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTable, [{
        type: Component,
        args: [{
                selector: 'novo-simple-table',
                template: CDK_TABLE_TEMPLATE,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], null, null); })();
export class NovoActivityTableActions {
}
NovoActivityTableActions.ɵfac = function NovoActivityTableActions_Factory(t) { return new (t || NovoActivityTableActions)(); };
NovoActivityTableActions.ɵdir = i0.ɵɵdefineDirective({ type: NovoActivityTableActions, selectors: [["novo-activity-table-actions"]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoActivityTableActions, [{
        type: Directive,
        args: [{
                selector: 'novo-activity-table-actions',
            }]
    }], null, null); })();
export class NovoActivityTableCustomHeader {
}
NovoActivityTableCustomHeader.ɵfac = function NovoActivityTableCustomHeader_Factory(t) { return new (t || NovoActivityTableCustomHeader)(); };
NovoActivityTableCustomHeader.ɵdir = i0.ɵɵdefineDirective({ type: NovoActivityTableCustomHeader, selectors: [["novo-activity-table-custom-header"]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoActivityTableCustomHeader, [{
        type: Directive,
        args: [{
                selector: 'novo-activity-table-custom-header',
            }]
    }], null, null); })();
export class NovoActivityTableCustomFilter {
}
NovoActivityTableCustomFilter.ɵfac = function NovoActivityTableCustomFilter_Factory(t) { return new (t || NovoActivityTableCustomFilter)(); };
NovoActivityTableCustomFilter.ɵdir = i0.ɵɵdefineDirective({ type: NovoActivityTableCustomFilter, selectors: [["novo-activity-table-custom-filter"]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoActivityTableCustomFilter, [{
        type: Directive,
        args: [{
                selector: 'novo-activity-table-custom-filter',
            }]
    }], null, null); })();
export class NovoActivityTableEmptyMessage {
}
NovoActivityTableEmptyMessage.ɵfac = function NovoActivityTableEmptyMessage_Factory(t) { return new (t || NovoActivityTableEmptyMessage)(); };
NovoActivityTableEmptyMessage.ɵdir = i0.ɵɵdefineDirective({ type: NovoActivityTableEmptyMessage, selectors: [["novo-activity-table-empty-message"]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoActivityTableEmptyMessage, [{
        type: Directive,
        args: [{
                selector: 'novo-activity-table-empty-message',
            }]
    }], null, null); })();
export class NovoActivityTableNoResultsMessage {
}
NovoActivityTableNoResultsMessage.ɵfac = function NovoActivityTableNoResultsMessage_Factory(t) { return new (t || NovoActivityTableNoResultsMessage)(); };
NovoActivityTableNoResultsMessage.ɵdir = i0.ɵɵdefineDirective({ type: NovoActivityTableNoResultsMessage, selectors: [["novo-activity-table-no-results-message"]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoActivityTableNoResultsMessage, [{
        type: Directive,
        args: [{
                selector: 'novo-activity-table-no-results-message',
            }]
    }], null, null); })();
export class NovoActivityTable {
    constructor(labels, ref, state) {
        this.labels = labels;
        this.ref = ref;
        this.state = state;
        this.globalSearchHiddenClassToggle = false;
        this.loading = true;
        notify('[Deprecated]: The simple table is deprecated. Please migrate to novo-data-tables!');
    }
    set customFilter(v) {
        this._customFilter = coerceBooleanProperty(v);
    }
    get customFilter() {
        return this._customFilter;
    }
    set forceShowHeader(v) {
        this._forceShowHeader = coerceBooleanProperty(v);
    }
    get forceShowHeader() {
        return this._forceShowHeader;
    }
    set hideGlobalSearch(v) {
        this._hideGlobalSearch = coerceBooleanProperty(v);
        this.globalSearchHiddenClassToggle = this._hideGlobalSearch;
    }
    get hideGlobalSearch() {
        return this._hideGlobalSearch;
    }
    set debug(v) {
        this._debug = coerceBooleanProperty(v);
    }
    get debug() {
        return this._debug;
    }
    get empty() {
        return this.dataSource && this.dataSource.totallyEmpty;
    }
    get loadingClass() {
        return this.loading || (this.dataSource && this.dataSource.loading);
    }
    ngOnChanges(changes) {
        this.loading = changes.activityService && !changes.activityService.currentValue;
        this.ref.detectChanges();
        if (changes.activityService && changes.activityService.currentValue) {
            this.loading = false;
            this.dataSource = new ActivityTableDataSource(this.activityService, this.state, this.ref);
            this.ref.detectChanges();
        }
        if (changes.outsideFilter && changes.outsideFilter.currentValue) {
            if (!this.outsideFilterSubscription) {
                this.outsideFilterSubscription = this.outsideFilter.subscribe((filter) => {
                    this.state.outsideFilter = filter;
                    this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort });
                    this.ref.markForCheck();
                });
            }
        }
    }
    ngOnDestroy() {
        if (this.outsideFilterSubscription) {
            this.outsideFilterSubscription.unsubscribe();
        }
    }
    ngAfterContentInit() {
        if (this.paginationOptions && !this.paginationOptions.page) {
            this.paginationOptions.page = 0;
        }
        if (this.paginationOptions && !this.paginationOptions.pageSize) {
            this.paginationOptions.pageSize = 50;
        }
        if (this.paginationOptions && !this.paginationOptions.pageSizeOptions) {
            this.paginationOptions.pageSizeOptions = [10, 25, 50, 100];
        }
        this.state.page = this.paginationOptions ? this.paginationOptions.page : undefined;
        this.state.pageSize = this.paginationOptions ? this.paginationOptions.pageSize : undefined;
        this.ref.markForCheck();
    }
    onSearchChange(term) {
        this.state.globalSearch = term;
        this.state.reset(false, true);
        this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort });
    }
}
NovoActivityTable.ɵfac = function NovoActivityTable_Factory(t) { return new (t || NovoActivityTable)(i0.ɵɵdirectiveInject(i2.NovoLabelService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3.NovoActivityTableState)); };
NovoActivityTable.ɵcmp = i0.ɵɵdefineComponent({ type: NovoActivityTable, selectors: [["novo-activity-table"]], hostVars: 6, hostBindings: function NovoActivityTable_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("global-search-hidden", ctx.globalSearchHiddenClassToggle)("empty", ctx.empty)("loading", ctx.loadingClass);
    } }, inputs: { activityService: "activityService", columns: "columns", displayedColumns: "displayedColumns", actionColumns: "actionColumns", paginationOptions: "paginationOptions", searchOptions: "searchOptions", defaultSort: "defaultSort", outsideFilter: "outsideFilter", customFilter: "customFilter", forceShowHeader: "forceShowHeader", hideGlobalSearch: "hideGlobalSearch", debug: "debug" }, features: [i0.ɵɵProvidersFeature([NovoActivityTableState]), i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c3, decls: 9, vars: 7, consts: [[4, "ngIf"], ["class", "novo-activity-table-loading-mask", "data-automation-id", "novo-activity-table-loading", 4, "ngIf"], [1, "novo-activity-table-filter-container"], ["class", "novo-activity-table-custom-filter", 4, "ngIf"], [1, "novo-activity-table-container"], ["novoSortFilter", "", "novoSelection", "", 3, "dataSource", "empty", "hidden", 4, "ngIf"], ["class", "novo-activity-table-no-results-container", 4, "ngIf"], ["class", "novo-activity-table-empty-container", 4, "ngIf"], ["alwaysOpen", "true", 3, "ngModel", "placeholder", "hint", "searchChanged", "ngModelChange", 4, "ngIf"], [3, "length", "page", "pageSize", "pageSizeOptions", 4, "ngIf"], [1, "novo-activity-table-actions"], ["alwaysOpen", "true", 3, "ngModel", "placeholder", "hint", "searchChanged", "ngModelChange"], [3, "length", "page", "pageSize", "pageSizeOptions"], ["data-automation-id", "novo-activity-table-loading", 1, "novo-activity-table-loading-mask"], [1, "novo-activity-table-custom-filter"], ["novoSortFilter", "", "novoSelection", "", 3, "dataSource", "hidden"], ["novoSimpleColumnDef", "selection"], [4, "novoSimpleHeaderCellDef"], [3, "row", "index", 4, "novoSimpleCellDef"], [3, "novoSimpleColumnDef", 4, "ngFor", "ngForOf"], [4, "novoSimpleHeaderRowDef"], [4, "novoSimpleRowDef", "novoSimpleRowDefColumns"], [3, "row", "index"], [3, "novoSimpleColumnDef"], [3, "button-header-cell", "dropdown-header-cell", 4, "novoSimpleHeaderCellDef"], [3, "row", "column", 4, "novoSimpleCellDef"], [3, "row", "column"], [3, "column", "novo-simple-cell-config", "defaultSort", 4, "novoSimpleHeaderCellDef"], [3, "column", "row", 4, "novoSimpleCellDef"], [3, "column", "novo-simple-cell-config", "defaultSort"], [3, "column", "row"], [1, "novo-activity-table-no-results-container"], ["filtered", ""], ["class", "novo-activity-table-empty-message", 4, "ngIf"], [1, "novo-activity-table-empty-message"], [1, "bhi-search-question"], [1, "novo-activity-table-empty-container"], ["empty", ""]], template: function NovoActivityTable_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c2);
        i0.ɵɵtemplate(0, NovoActivityTable_div_0_Template, 15, 7, "div", 0);
        i0.ɵɵtemplate(1, NovoActivityTable_header_1_Template, 6, 2, "header", 0);
        i0.ɵɵtemplate(2, NovoActivityTable_div_2_Template, 2, 0, "div", 1);
        i0.ɵɵelementStart(3, "div", 2);
        i0.ɵɵtemplate(4, NovoActivityTable_div_4_Template, 2, 0, "div", 3);
        i0.ɵɵelementStart(5, "div", 4);
        i0.ɵɵtemplate(6, NovoActivityTable_novo_simple_table_6_Template, 9, 8, "novo-simple-table", 5);
        i0.ɵɵtemplate(7, NovoActivityTable_div_7_Template, 5, 1, "div", 6);
        i0.ɵɵtemplate(8, NovoActivityTable_div_8_Template, 5, 1, "div", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.debug);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !((ctx.dataSource == null ? null : ctx.dataSource.totallyEmpty) && !ctx.state.userFiltered) && !ctx.loading || ctx.forceShowHeader);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.dataSource == null ? null : ctx.dataSource.loading) || ctx.loading);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.customFilter);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", (ctx.columns == null ? null : ctx.columns.length) > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.dataSource == null ? null : ctx.dataSource.currentlyEmpty) && ctx.state.userFiltered && !(ctx.dataSource == null ? null : ctx.dataSource.loading) && !ctx.loading && !ctx.dataSource.pristine);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.dataSource == null ? null : ctx.dataSource.totallyEmpty) && !(ctx.dataSource == null ? null : ctx.dataSource.loading) && !ctx.loading && !ctx.state.userFiltered && !ctx.dataSource.pristine);
    } }, directives: [i4.NgIf, i5.NovoSearchBoxElement, i6.NgControlStatus, i6.NgModel, i7.NovoSimpleTablePagination, i8.NovoLoadingElement, NovoTable, i9.NovoSortFilter, i9.NovoSelection, i10.NovoSimpleColumnDef, i10.NovoSimpleHeaderCellDef, i10.NovoSimpleCellDef, i4.NgForOf, i11.NovoSimpleHeaderRowDef, i11.NovoSimpleRowDef, i10.NovoSimpleCheckboxHeaderCell, i10.NovoSimpleCheckboxCell, i10.NovoSimpleEmptyHeaderCell, i10.NovoSimpleActionCell, i10.NovoSimpleHeaderCell, i12.NovoSimpleCellHeader, i10.NovoSimpleCell, i11.NovoSimpleHeaderRow, i11.NovoSimpleRow], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoActivityTable, [{
        type: Component,
        args: [{
                selector: 'novo-activity-table',
                template: `
    <div *ngIf="debug">
      <p>Total: {{ dataSource?.total }}</p>
      <p>Current: {{ dataSource?.current }}</p>
      <p>Totally Empty: {{ dataSource?.totallyEmpty }}</p>
      <p>Currently Empty: {{ dataSource?.currentlyEmpty }}</p>
      <p>Loading (DataSource): {{ dataSource?.loading }}</p>
      <p>User Filtered: {{ state.userFiltered }}</p>
      <p>Loading (Table): {{ loading }}</p>
    </div>
    <header *ngIf="(!(dataSource?.totallyEmpty && !state.userFiltered) && !loading) || forceShowHeader">
      <ng-content select="[novo-activity-table-custom-header]"></ng-content>
      <novo-search
        alwaysOpen="true"
        (searchChanged)="onSearchChange($event)"
        [(ngModel)]="state.globalSearch"
        *ngIf="!hideGlobalSearch"
        [placeholder]="searchOptions?.placeholder"
        [hint]="searchOptions?.tooltip"
      >
      </novo-search>
      <novo-simple-table-pagination
        *ngIf="paginationOptions"
        [length]="dataSource?.total"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
      >
      </novo-simple-table-pagination>
      <div class="novo-activity-table-actions">
        <ng-content select="[novo-activity-table-actions]"></ng-content>
      </div>
    </header>
    <div class="novo-activity-table-loading-mask" *ngIf="dataSource?.loading || loading" data-automation-id="novo-activity-table-loading">
      <novo-loading></novo-loading>
    </div>
    <div class="novo-activity-table-filter-container">
      <div class="novo-activity-table-custom-filter" *ngIf="customFilter">
        <ng-content select="[novo-activity-table-custom-filter]"></ng-content>
      </div>
      <div class="novo-activity-table-container">
        <novo-simple-table
          *ngIf="columns?.length > 0"
          [dataSource]="dataSource"
          novoSortFilter
          novoSelection
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="dataSource?.totallyEmpty && !state.userFiltered"
        >
          <ng-content></ng-content>
          <ng-container novoSimpleColumnDef="selection">
            <novo-simple-checkbox-header-cell *novoSimpleHeaderCellDef></novo-simple-checkbox-header-cell>
            <novo-simple-checkbox-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [index]="i"></novo-simple-checkbox-cell>
          </ng-container>
          <ng-container *ngFor="let column of actionColumns" [novoSimpleColumnDef]="column.id">
            <novo-simple-empty-header-cell
              [class.button-header-cell]="!column.options"
              [class.dropdown-header-cell]="column.options"
              *novoSimpleHeaderCellDef
            ></novo-simple-empty-header-cell>
            <novo-simple-action-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [column]="column"></novo-simple-action-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns" [novoSimpleColumnDef]="column.id">
            <novo-simple-header-cell
              *novoSimpleHeaderCellDef
              [column]="column"
              [novo-simple-cell-config]="column.config"
              [defaultSort]="defaultSort"
              >{{ column.label }}</novo-simple-header-cell
            >
            <novo-simple-cell *novoSimpleCellDef="let row" [column]="column" [row]="row"></novo-simple-cell>
          </ng-container>
          <novo-simple-header-row *novoSimpleHeaderRowDef="displayedColumns"></novo-simple-header-row>
          <novo-simple-row *novoSimpleRowDef="let row; columns: displayedColumns"></novo-simple-row>
        </novo-simple-table>
        <div
          class="novo-activity-table-no-results-container"
          *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div #filtered><ng-content select="[novo-activity-table-no-results-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="filtered.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
          </div>
        </div>
        <div
          class="novo-activity-table-empty-container"
          *ngIf="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
        >
          <div #empty><ng-content select="[novo-activity-table-empty-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="empty.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
          </div>
        </div>
      </div>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [NovoActivityTableState],
            }]
    }], function () { return [{ type: i2.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i3.NovoActivityTableState }]; }, { globalSearchHiddenClassToggle: [{
            type: HostBinding,
            args: ['class.global-search-hidden']
        }], activityService: [{
            type: Input
        }], columns: [{
            type: Input
        }], displayedColumns: [{
            type: Input
        }], actionColumns: [{
            type: Input
        }], paginationOptions: [{
            type: Input
        }], searchOptions: [{
            type: Input
        }], defaultSort: [{
            type: Input
        }], outsideFilter: [{
            type: Input
        }], customFilter: [{
            type: Input
        }], forceShowHeader: [{
            type: Input
        }], hideGlobalSearch: [{
            type: Input
        }], debug: [{
            type: Input
        }], empty: [{
            type: HostBinding,
            args: ['class.empty']
        }], loadingClass: [{
            type: HostBinding,
            args: ['class.loading']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvc2ltcGxlLXRhYmxlL3RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUlMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQzNFLDJCQUNFO0lBQUEseUJBQUc7SUFBQSxZQUE4QjtJQUFBLGlCQUFJO0lBQ3JDLHlCQUFHO0lBQUEsWUFBa0M7SUFBQSxpQkFBSTtJQUN6Qyx5QkFBRztJQUFBLFlBQTZDO0lBQUEsaUJBQUk7SUFDcEQseUJBQUc7SUFBQSxZQUFpRDtJQUFBLGlCQUFJO0lBQ3hELHlCQUFHO0lBQUEsYUFBK0M7SUFBQSxpQkFBSTtJQUN0RCwwQkFBRztJQUFBLGFBQXVDO0lBQUEsaUJBQUk7SUFDOUMsMEJBQUc7SUFBQSxhQUE4QjtJQUFBLGlCQUFJO0lBQ3ZDLGlCQUFNOzs7SUFQRCxlQUE4QjtJQUE5QixnR0FBOEI7SUFDOUIsZUFBa0M7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QUFLO1lBVUYsZUFBZTtrQkFEbEIsS0FBSztZQVVGLGdCQUFnQjtrQkFEbkIsS0FBSztZQVdGLEtBQUs7a0JBRFIsS0FBSztZQWVGLEtBQUs7a0JBRFIsV0FBVzttQkFBQyxhQUFhO1lBTXRCLFlBQVk7a0JBRGYsV0FBVzttQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENka1RhYmxlLCBDREtfVEFCTEVfVEVNUExBVEUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgbm90aWZ5IH0gZnJvbSAnLi4vLi4vdXRpbHMvbm90aWZpZXIvbm90aWZpZXIudXRpbCc7XG5pbXBvcnQgeyBTaW1wbGVUYWJsZUFjdGlvbkNvbHVtbiwgU2ltcGxlVGFibGVDb2x1bW4sIFNpbXBsZVRhYmxlUGFnaW5hdGlvbk9wdGlvbnMsIFNpbXBsZVRhYmxlU2VhcmNoT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBBY3Rpdml0eVRhYmxlRGF0YVNvdXJjZSwgQWN0aXZpdHlUYWJsZVNlcnZpY2UgfSBmcm9tICcuL3RhYmxlLXNvdXJjZSc7XG5cbi8qKiBXb3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNzg0OSAqL1xuZXhwb3J0IGNvbnN0IF9Ob3ZvVGFibGUgPSBDZGtUYWJsZTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zaW1wbGUtdGFibGUnLFxuICB0ZW1wbGF0ZTogQ0RLX1RBQkxFX1RFTVBMQVRFLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYmxlPFQ+IGV4dGVuZHMgX05vdm9UYWJsZTxUPiB7XG4gIC8vIFRPRE86IGFkZCBleHBsaWNpdCBjb25zdHJ1Y3RvclxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLWFjdGlvbnMnLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZUFjdGlvbnMge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpdml0eS10YWJsZS1jdXN0b20taGVhZGVyJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FjdGl2aXR5VGFibGVDdXN0b21IZWFkZXIge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpdml0eS10YWJsZS1jdXN0b20tZmlsdGVyJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FjdGl2aXR5VGFibGVDdXN0b21GaWx0ZXIge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpdml0eS10YWJsZS1lbXB0eS1tZXNzYWdlJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FjdGl2aXR5VGFibGVFbXB0eU1lc3NhZ2Uge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpdml0eS10YWJsZS1uby1yZXN1bHRzLW1lc3NhZ2UnLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZU5vUmVzdWx0c01lc3NhZ2Uge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpdml0eS10YWJsZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cImRlYnVnXCI+XG4gICAgICA8cD5Ub3RhbDoge3sgZGF0YVNvdXJjZT8udG90YWwgfX08L3A+XG4gICAgICA8cD5DdXJyZW50OiB7eyBkYXRhU291cmNlPy5jdXJyZW50IH19PC9wPlxuICAgICAgPHA+VG90YWxseSBFbXB0eToge3sgZGF0YVNvdXJjZT8udG90YWxseUVtcHR5IH19PC9wPlxuICAgICAgPHA+Q3VycmVudGx5IEVtcHR5OiB7eyBkYXRhU291cmNlPy5jdXJyZW50bHlFbXB0eSB9fTwvcD5cbiAgICAgIDxwPkxvYWRpbmcgKERhdGFTb3VyY2UpOiB7eyBkYXRhU291cmNlPy5sb2FkaW5nIH19PC9wPlxuICAgICAgPHA+VXNlciBGaWx0ZXJlZDoge3sgc3RhdGUudXNlckZpbHRlcmVkIH19PC9wPlxuICAgICAgPHA+TG9hZGluZyAoVGFibGUpOiB7eyBsb2FkaW5nIH19PC9wPlxuICAgIDwvZGl2PlxuICAgIDxoZWFkZXIgKm5nSWY9XCIoIShkYXRhU291cmNlPy50b3RhbGx5RW1wdHkgJiYgIXN0YXRlLnVzZXJGaWx0ZXJlZCkgJiYgIWxvYWRpbmcpIHx8IGZvcmNlU2hvd0hlYWRlclwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW25vdm8tYWN0aXZpdHktdGFibGUtY3VzdG9tLWhlYWRlcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bm92by1zZWFyY2hcbiAgICAgICAgYWx3YXlzT3Blbj1cInRydWVcIlxuICAgICAgICAoc2VhcmNoQ2hhbmdlZCk9XCJvblNlYXJjaENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJzdGF0ZS5nbG9iYWxTZWFyY2hcIlxuICAgICAgICAqbmdJZj1cIiFoaWRlR2xvYmFsU2VhcmNoXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInNlYXJjaE9wdGlvbnM/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgW2hpbnRdPVwic2VhcmNoT3B0aW9ucz8udG9vbHRpcFwiXG4gICAgICA+XG4gICAgICA8L25vdm8tc2VhcmNoPlxuICAgICAgPG5vdm8tc2ltcGxlLXRhYmxlLXBhZ2luYXRpb25cbiAgICAgICAgKm5nSWY9XCJwYWdpbmF0aW9uT3B0aW9uc1wiXG4gICAgICAgIFtsZW5ndGhdPVwiZGF0YVNvdXJjZT8udG90YWxcIlxuICAgICAgICBbcGFnZV09XCJwYWdpbmF0aW9uT3B0aW9ucy5wYWdlXCJcbiAgICAgICAgW3BhZ2VTaXplXT1cInBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplXCJcbiAgICAgICAgW3BhZ2VTaXplT3B0aW9uc109XCJwYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZU9wdGlvbnNcIlxuICAgICAgPlxuICAgICAgPC9ub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtYWN0aW9uc1wiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbm92by1hY3Rpdml0eS10YWJsZS1hY3Rpb25zXVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWxvYWRpbmctbWFza1wiICpuZ0lmPVwiZGF0YVNvdXJjZT8ubG9hZGluZyB8fCBsb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1hY3Rpdml0eS10YWJsZS1sb2FkaW5nXCI+XG4gICAgICA8bm92by1sb2FkaW5nPjwvbm92by1sb2FkaW5nPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWZpbHRlci1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWN1c3RvbS1maWx0ZXJcIiAqbmdJZj1cImN1c3RvbUZpbHRlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbm92by1hY3Rpdml0eS10YWJsZS1jdXN0b20tZmlsdGVyXVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtY29udGFpbmVyXCI+XG4gICAgICAgIDxub3ZvLXNpbXBsZS10YWJsZVxuICAgICAgICAgICpuZ0lmPVwiY29sdW1ucz8ubGVuZ3RoID4gMFwiXG4gICAgICAgICAgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiXG4gICAgICAgICAgbm92b1NvcnRGaWx0ZXJcbiAgICAgICAgICBub3ZvU2VsZWN0aW9uXG4gICAgICAgICAgW2NsYXNzLmVtcHR5XT1cImRhdGFTb3VyY2U/LmN1cnJlbnRseUVtcHR5ICYmIHN0YXRlLnVzZXJGaWx0ZXJlZFwiXG4gICAgICAgICAgW2hpZGRlbl09XCJkYXRhU291cmNlPy50b3RhbGx5RW1wdHkgJiYgIXN0YXRlLnVzZXJGaWx0ZXJlZFwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBub3ZvU2ltcGxlQ29sdW1uRGVmPVwic2VsZWN0aW9uXCI+XG4gICAgICAgICAgICA8bm92by1zaW1wbGUtY2hlY2tib3gtaGVhZGVyLWNlbGwgKm5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmPjwvbm92by1zaW1wbGUtY2hlY2tib3gtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bm92by1zaW1wbGUtY2hlY2tib3gtY2VsbCAqbm92b1NpbXBsZUNlbGxEZWY9XCJsZXQgcm93OyBsZXQgaSA9IGluZGV4XCIgW3Jvd109XCJyb3dcIiBbaW5kZXhdPVwiaVwiPjwvbm92by1zaW1wbGUtY2hlY2tib3gtY2VsbD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgYWN0aW9uQ29sdW1uc1wiIFtub3ZvU2ltcGxlQ29sdW1uRGVmXT1cImNvbHVtbi5pZFwiPlxuICAgICAgICAgICAgPG5vdm8tc2ltcGxlLWVtcHR5LWhlYWRlci1jZWxsXG4gICAgICAgICAgICAgIFtjbGFzcy5idXR0b24taGVhZGVyLWNlbGxdPVwiIWNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmRyb3Bkb3duLWhlYWRlci1jZWxsXT1cImNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgKm5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmXG4gICAgICAgICAgICA+PC9ub3ZvLXNpbXBsZS1lbXB0eS1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1hY3Rpb24tY2VsbCAqbm92b1NpbXBsZUNlbGxEZWY9XCJsZXQgcm93OyBsZXQgaSA9IGluZGV4XCIgW3Jvd109XCJyb3dcIiBbY29sdW1uXT1cImNvbHVtblwiPjwvbm92by1zaW1wbGUtYWN0aW9uLWNlbGw+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIiBbbm92b1NpbXBsZUNvbHVtbkRlZl09XCJjb2x1bW4uaWRcIj5cbiAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1oZWFkZXItY2VsbFxuICAgICAgICAgICAgICAqbm92b1NpbXBsZUhlYWRlckNlbGxEZWZcbiAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICBbbm92by1zaW1wbGUtY2VsbC1jb25maWddPVwiY29sdW1uLmNvbmZpZ1wiXG4gICAgICAgICAgICAgIFtkZWZhdWx0U29ydF09XCJkZWZhdWx0U29ydFwiXG4gICAgICAgICAgICAgID57eyBjb2x1bW4ubGFiZWwgfX08L25vdm8tc2ltcGxlLWhlYWRlci1jZWxsXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8bm92by1zaW1wbGUtY2VsbCAqbm92b1NpbXBsZUNlbGxEZWY9XCJsZXQgcm93XCIgW2NvbHVtbl09XCJjb2x1bW5cIiBbcm93XT1cInJvd1wiPjwvbm92by1zaW1wbGUtY2VsbD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bm92by1zaW1wbGUtaGVhZGVyLXJvdyAqbm92b1NpbXBsZUhlYWRlclJvd0RlZj1cImRpc3BsYXllZENvbHVtbnNcIj48L25vdm8tc2ltcGxlLWhlYWRlci1yb3c+XG4gICAgICAgICAgPG5vdm8tc2ltcGxlLXJvdyAqbm92b1NpbXBsZVJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnNcIj48L25vdm8tc2ltcGxlLXJvdz5cbiAgICAgICAgPC9ub3ZvLXNpbXBsZS10YWJsZT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1uby1yZXN1bHRzLWNvbnRhaW5lclwiXG4gICAgICAgICAgKm5nSWY9XCJkYXRhU291cmNlPy5jdXJyZW50bHlFbXB0eSAmJiBzdGF0ZS51c2VyRmlsdGVyZWQgJiYgIWRhdGFTb3VyY2U/LmxvYWRpbmcgJiYgIWxvYWRpbmcgJiYgIWRhdGFTb3VyY2UucHJpc3RpbmVcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiAjZmlsdGVyZWQ+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW25vdm8tYWN0aXZpdHktdGFibGUtbm8tcmVzdWx0cy1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJmaWx0ZXJlZC5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMubm9NYXRjaGluZ1JlY29yZHNNZXNzYWdlIH19PC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtZW1wdHktY29udGFpbmVyXCJcbiAgICAgICAgICAqbmdJZj1cImRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhZGF0YVNvdXJjZT8ubG9hZGluZyAmJiAhbG9hZGluZyAmJiAhc3RhdGUudXNlckZpbHRlcmVkICYmICFkYXRhU291cmNlLnByaXN0aW5lXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgI2VtcHR5PjxuZy1jb250ZW50IHNlbGVjdD1cIltub3ZvLWFjdGl2aXR5LXRhYmxlLWVtcHR5LW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cImVtcHR5LmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5lbXB0eVRhYmxlTWVzc2FnZSB9fTwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FjdGl2aXR5VGFibGU8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZ2xvYmFsLXNlYXJjaC1oaWRkZW4nKVxuICBnbG9iYWxTZWFyY2hIaWRkZW5DbGFzc1RvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGFjdGl2aXR5U2VydmljZTogQWN0aXZpdHlUYWJsZVNlcnZpY2U8VD47XG4gIEBJbnB1dCgpXG4gIGNvbHVtbnM6IFNpbXBsZVRhYmxlQ29sdW1uPFQ+W107XG4gIEBJbnB1dCgpXG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKVxuICBhY3Rpb25Db2x1bW5zOiBTaW1wbGVUYWJsZUFjdGlvbkNvbHVtbjxUPltdO1xuICBASW5wdXQoKVxuICBwYWdpbmF0aW9uT3B0aW9uczogU2ltcGxlVGFibGVQYWdpbmF0aW9uT3B0aW9ucztcbiAgQElucHV0KClcbiAgc2VhcmNoT3B0aW9uczogU2ltcGxlVGFibGVTZWFyY2hPcHRpb25zO1xuICBASW5wdXQoKVxuICBkZWZhdWx0U29ydDogeyBpZDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH07XG4gIEBJbnB1dCgpXG4gIG91dHNpZGVGaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjdXN0b21GaWx0ZXIodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2N1c3RvbUZpbHRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgY3VzdG9tRmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXN0b21GaWx0ZXI7XG4gIH1cbiAgcHJpdmF0ZSBfY3VzdG9tRmlsdGVyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JjZVNob3dIZWFkZXIodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZvcmNlU2hvd0hlYWRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgZm9yY2VTaG93SGVhZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3JjZVNob3dIZWFkZXI7XG4gIH1cbiAgcHJpdmF0ZSBfZm9yY2VTaG93SGVhZGVyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlR2xvYmFsU2VhcmNoKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICAgIHRoaXMuZ2xvYmFsU2VhcmNoSGlkZGVuQ2xhc3NUb2dnbGUgPSB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoO1xuICB9XG4gIGdldCBoaWRlR2xvYmFsU2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoO1xuICB9XG4gIHByaXZhdGUgX2hpZGVHbG9iYWxTZWFyY2g6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGRlYnVnKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kZWJ1ZyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgZGVidWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlYnVnO1xuICB9XG4gIHByaXZhdGUgX2RlYnVnOiBib29sZWFuO1xuXG4gIHB1YmxpYyBkYXRhU291cmNlOiBBY3Rpdml0eVRhYmxlRGF0YVNvdXJjZTxUPjtcbiAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHByaXZhdGUgb3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW1wdHknKVxuICBnZXQgZW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLmRhdGFTb3VyY2UudG90YWxseUVtcHR5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5sb2FkaW5nJylcbiAgZ2V0IGxvYWRpbmdDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nIHx8ICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5kYXRhU291cmNlLmxvYWRpbmcpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgc3RhdGU6IE5vdm9BY3Rpdml0eVRhYmxlU3RhdGUpIHtcbiAgICBub3RpZnkoJ1tEZXByZWNhdGVkXTogVGhlIHNpbXBsZSB0YWJsZSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgbWlncmF0ZSB0byBub3ZvLWRhdGEtdGFibGVzIScpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBjaGFuZ2VzLmFjdGl2aXR5U2VydmljZSAmJiAhY2hhbmdlcy5hY3Rpdml0eVNlcnZpY2UuY3VycmVudFZhbHVlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICBpZiAoY2hhbmdlcy5hY3Rpdml0eVNlcnZpY2UgJiYgY2hhbmdlcy5hY3Rpdml0eVNlcnZpY2UuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBBY3Rpdml0eVRhYmxlRGF0YVNvdXJjZTxUPih0aGlzLmFjdGl2aXR5U2VydmljZSwgdGhpcy5zdGF0ZSwgdGhpcy5yZWYpO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5vdXRzaWRlRmlsdGVyICYmIGNoYW5nZXMub3V0c2lkZUZpbHRlci5jdXJyZW50VmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMub3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMub3V0c2lkZUZpbHRlci5zdWJzY3JpYmUoKGZpbHRlcjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5vdXRzaWRlRmlsdGVyID0gZmlsdGVyO1xuICAgICAgICAgIHRoaXMuc3RhdGUudXBkYXRlcy5uZXh0KHsgZ2xvYmFsU2VhcmNoOiB0aGlzLnN0YXRlLmdsb2JhbFNlYXJjaCwgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlciwgc29ydDogdGhpcy5zdGF0ZS5zb3J0IH0pO1xuICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2UgPSAwO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZSkge1xuICAgICAgdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZSA9IDUwO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZU9wdGlvbnMpIHtcbiAgICAgIHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVPcHRpb25zID0gWzEwLCAyNSwgNTAsIDEwMF07XG4gICAgfVxuICAgIHRoaXMuc3RhdGUucGFnZSA9IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgPyB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2UgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZS5wYWdlU2l6ZSA9IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgPyB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplIDogdW5kZWZpbmVkO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIG9uU2VhcmNoQ2hhbmdlKHRlcm06IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoID0gdGVybTtcbiAgICB0aGlzLnN0YXRlLnJlc2V0KGZhbHNlLCB0cnVlKTtcbiAgICB0aGlzLnN0YXRlLnVwZGF0ZXMubmV4dCh7IGdsb2JhbFNlYXJjaDogdGVybSwgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlciwgc29ydDogdGhpcy5zdGF0ZS5zb3J0IH0pO1xuICB9XG59XG4iXX0=