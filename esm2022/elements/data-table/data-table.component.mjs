import { animate, state as animState, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation, } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers, notify } from 'novo-elements/utils';
import { NovoTemplate } from 'novo-elements/elements/common';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { DataTableSource } from './data-table.source';
import { NOVO_DATA_TABLE_REF } from './data-table.token';
import { StaticDataTableService } from './services/static-data-table.service';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "./state/data-table-state.service";
import * as i3 from "@angular/cdk/table";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "novo-elements/elements/icon";
import * as i7 from "novo-elements/elements/button";
import * as i8 from "novo-elements/elements/dropdown";
import * as i9 from "novo-elements/elements/loading";
import * as i10 from "novo-elements/elements/search";
import * as i11 from "novo-elements/elements/common";
import * as i12 from "novo-elements/elements/tooltip";
import * as i13 from "@angular/cdk/scrolling";
import * as i14 from "./cell-headers/data-table-header-cell.component";
import * as i15 from "./sort-filter/sort-filter.directive";
import * as i16 from "./cell-headers/data-table-header-cell.directive";
import * as i17 from "./cells/data-table-cell.component";
import * as i18 from "./rows/data-table-header-row.component";
import * as i19 from "./rows/data-table-row.component";
import * as i20 from "./pagination/data-table-pagination.component";
import * as i21 from "./cells/data-table-checkbox-cell.component";
import * as i22 from "./cell-headers/data-table-checkbox-header-cell.component";
import * as i23 from "./cells/data-table-expand-cell.component";
import * as i24 from "./cell-headers/data-table-expand-header-cell.component";
import * as i25 from "./data-table-expand.directive";
import * as i26 from "./data-table.pipes";
export class NovoDataTable {
    set displayedColumns(displayedColumns) {
        if (this.displayedColumns && this.displayedColumns.length !== 0) {
            if (this.name !== 'novo-data-table') {
                this.preferencesChanged.emit({
                    name: this.name,
                    displayedColumns,
                });
            }
            else {
                notify('Must have [name] set on data-table to use preferences!');
            }
        }
        this._disabledColumns = displayedColumns;
        this.configureLastDisplayedColumn();
        if (this.initialized) {
            setTimeout(() => {
                this.scrollListener();
            });
        }
    }
    get displayedColumns() {
        return this._disabledColumns;
    }
    set dataTableService(service) {
        this.loading = false;
        if (!service) {
            service = new StaticDataTableService([]);
        }
        this.dataSource = new DataTableSource(service, this.state, this.ref);
        this.ref.detectChanges();
    }
    set rows(rows) {
        this.loading = false;
        const service = new StaticDataTableService(rows);
        this.dataSource = new DataTableSource(service, this.state, this.ref);
        this.ref.detectChanges();
    }
    set outsideFilter(outsideFilter) {
        // Unsubscribe
        if (this.outsideFilterSubscription) {
            this.outsideFilterSubscription.unsubscribe();
        }
        if (outsideFilter) {
            // Re-subscribe
            this.outsideFilterSubscription = outsideFilter.subscribe((filter) => {
                this.state.outsideFilter = filter;
                this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort, where: this.state.where });
                this.ref.markForCheck();
            });
        }
    }
    set refreshSubject(refreshSubject) {
        // Unsubscribe
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
        if (refreshSubject) {
            // Re-subscribe
            this.refreshSubscription = refreshSubject.subscribe(() => {
                this.state.isForceRefresh = true;
                this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort, where: this.state.where });
                this.ref.markForCheck();
            });
        }
    }
    set columns(columns) {
        this._columns = columns;
        this.configureColumns();
        this.performInteractions('init');
    }
    get columns() {
        return this._columns;
    }
    set customFilter(v) {
        this._customFilter = coerceBooleanProperty(v);
    }
    get customFilter() {
        return this._customFilter;
    }
    set hasExandedRows(v) {
        this._hasExandedRows = coerceBooleanProperty(v);
    }
    get hasExandedRows() {
        return this._hasExandedRows;
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
    get empty() {
        return this.useOverrideTotal ? this.overrideTotal === 0 : this.dataSource?.totallyEmpty;
    }
    get loadingClass() {
        return this.loading || (this.dataSource && this.dataSource.loading);
    }
    get useOverrideTotal() {
        return !Helpers.isBlank(this.overrideTotal);
    }
    constructor(labels, ref, state) {
        this.labels = labels;
        this.ref = ref;
        this.state = state;
        this.globalSearchHiddenClassToggle = false;
        this.resized = new EventEmitter();
        this.name = 'novo-data-table';
        this.allowMultipleFilters = false;
        this.rowIdentifier = 'id';
        this.activeRowIdentifier = '';
        // prettier-ignore
        this.trackByFn = (index, item) => item.id;
        this.templates = {};
        this.fixedHeader = false;
        this.maxSelected = undefined;
        this.canSelectAll = false;
        this.allMatchingSelected = false;
        this._hideGlobalSearch = true;
        this.preferencesChanged = new EventEmitter();
        this.allSelected = new EventEmitter();
        this.loading = true;
        this.columnToTemplate = {};
        this.columnsLoaded = false;
        this.selection = new Set();
        this.scrollLeft = 0;
        this.expandable = false;
        this.initialized = false;
        this.scrollListenerHandler = this.scrollListener.bind(this);
        this.sortFilterSubscription = this.state.sortFilterSource.subscribe((event) => {
            if (this.name !== 'novo-data-table') {
                this.preferencesChanged.emit({
                    name: this.name,
                    sort: event.sort,
                    filter: event.filter,
                    globalSearch: event.globalSearch,
                    where: event.where,
                    savedSearchName: event.savedSearchName,
                });
                this.performInteractions('change');
            }
            else {
                notify('Must have [name] set on data-table to use preferences!');
            }
        });
        this.paginationSubscription = this.state.paginationSource.subscribe((event) => {
            if (this.name !== 'novo-data-table') {
                if (event.isPageSizeChange) {
                    this.preferencesChanged.emit({ name: this.name, pageSize: event.pageSize });
                }
            }
            else {
                notify('Must have [name] set on data-table to use preferences!');
            }
        });
        this.resetSubscription = this.state.resetSource.subscribe(() => {
            setTimeout(() => {
                this.ref.detectChanges();
            }, 300);
        });
        this.allMatchingSelectedSubscription = this.state.allMatchingSelectedSource.subscribe((event) => {
            this.allMatchingSelected = event;
        });
    }
    modifyCellHeaderMultiSelectFilterOptions(column, newOptions) {
        const header = this.cellHeaders.find((cellHeader) => cellHeader.id === column);
        if (header) {
            if (header.config && header.config.filterConfig && header.config.filterConfig.options) {
                const filterOptions = header.config.filterConfig.options;
                const optionsToKeep = filterOptions.filter((opt) => header.isSelected(opt, header.multiSelectedOptions) &&
                    !newOptions.find((newOpt) => opt.value && newOpt.value && newOpt.value === opt.value));
                header.config.filterConfig.options = [...optionsToKeep, ...newOptions];
            }
            else {
                header.config.filterConfig.options = newOptions;
            }
            header.setupFilterOptions();
            header.changeDetectorRef.markForCheck();
        }
    }
    ngOnDestroy() {
        this.outsideFilterSubscription?.unsubscribe();
        this.refreshSubscription?.unsubscribe();
        this.resetSubscription?.unsubscribe();
        this.sortFilterSubscription?.unsubscribe();
        this.allMatchingSelectedSubscription?.unsubscribe();
        if (this.novoDataTableContainer) {
            this.novoDataTableContainer.nativeElement.removeEventListener('scroll', this.scrollListenerHandler);
        }
    }
    ngAfterContentInit() {
        if (this.displayedColumns && this.displayedColumns.length) {
            this.expandable = this.displayedColumns.includes('expand');
        }
        // Default templates defined here
        this.defaultTemplates.forEach((item) => {
            // Only override if it doesn't already exist
            if (!this.templates[item.getType()]) {
                this.templates[item.getType()] = item.template;
            }
        });
        // Custom templates passed in
        this.customTemplates.forEach((item) => {
            // Override anything that is custom and in HTML
            this.templates[item.getType()] = item.template;
        });
        // Load columns
        this.configureColumns();
        // State
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
        this.state.selectionOptions = this.selectionOptions ?? undefined;
        // Scrolling inside table
        this.novoDataTableContainer.nativeElement.addEventListener('scroll', this.scrollListenerHandler);
        this.initialized = true;
        this.ref.markForCheck();
    }
    onSearchChange(term) {
        this.state.globalSearch = term;
        this.state.reset(false, true);
        this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort, where: this.state.where });
    }
    trackColumnsBy(index, item) {
        return item.id;
    }
    isDisabled(check, row) {
        if (check.disabled === true) {
            return true;
        }
        if (check.disabledFunc) {
            return check.disabledFunc(row);
        }
        return false;
    }
    isExpanded(row) {
        if (!row) {
            return false;
        }
        return this.state.expandedRows.has(`${row[this.rowIdentifier]}`);
    }
    expandRow(row) {
        const expanded = this.isExpanded(row);
        if (expanded) {
            this.state.expandedRows.delete(`${row[this.rowIdentifier]}`);
        }
        else {
            this.state.expandedRows.add(`${row[this.rowIdentifier]}`);
        }
        this.state.onExpandChange(row.id);
    }
    expandRows(expand) {
        (this.dataSource.data || []).forEach((row) => {
            if (!expand) {
                this.state.expandedRows.delete(`${row[this.rowIdentifier]}`);
            }
            else {
                this.state.expandedRows.add(`${row[this.rowIdentifier]}`);
            }
        });
        this.state.onExpandChange();
    }
    allCurrentRowsExpanded() {
        for (let i = 0; i < (this.dataSource.data || []).length; i++) {
            if (!this.isExpanded((this.dataSource.data || [])[i])) {
                return false;
            }
        }
        return true;
    }
    isSelected(row) {
        if (!row) {
            return false;
        }
        return this.state.selectedRows.has(`${row[this.rowIdentifier]}`);
    }
    selectRow(row, origin) {
        const selected = this.isSelected(row);
        if (selected) {
            this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
        }
        else {
            if (this.canSelectAll && this.allMatchingSelected && ['onClick'].includes(origin)) {
                // When all matching records are selected the user could be on another page where all rows only appear selected
                // Need to reset the rows that are actually selected, select rows on the current page and deselect the chosen record
                this.state.selectedRows.clear();
                this.selectRows(true);
                this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
            }
            else {
                this.state.selectedRows.set(`${row[this.rowIdentifier]}`, row);
            }
        }
        this.state.allMatchingSelectedSource.next(false);
        this.state.onSelectionChange();
    }
    selectRows(selected) {
        (this.dataSource.data || []).forEach((row) => {
            if (!selected) {
                this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
            }
            else {
                this.state.selectedRows.set(`${row[this.rowIdentifier]}`, row);
            }
        });
        this.state.onSelectionChange();
    }
    allCurrentRowsSelected() {
        if (this.allMatchingSelected) {
            return true;
        }
        if (!this.dataSource?.data?.length) {
            return false;
        }
        for (let i = 0; i < (this.dataSource.data || []).length; i++) {
            if (!this.isSelected((this.dataSource.data || [])[i])) {
                return false;
            }
        }
        return true;
    }
    configureLastDisplayedColumn() {
        if (this.columns && this.displayedColumns && 0 !== this.columns.length && 0 !== this.displayedColumns.length) {
            this.columns.forEach((column) => {
                if (column.initialResizable) {
                    column.resizable = column.initialResizable.resizable;
                    column.width = column.initialResizable.width;
                    column.initialResizable = undefined;
                }
            });
            const resizableColumns = this.displayedColumns.filter((name) => {
                return (this.columns.findIndex((column) => {
                    return column.resizable && column.id === name;
                }) !== -1);
            });
            if (resizableColumns && resizableColumns.length > 0) {
                const lastResizableColumn = this.columns.find((column) => {
                    return column.id === resizableColumns[resizableColumns.length - 1];
                });
                lastResizableColumn.initialResizable = {
                    resizable: lastResizableColumn.resizable,
                    width: lastResizableColumn.width,
                };
                lastResizableColumn.width = undefined;
                lastResizableColumn.resizable = false;
            }
        }
    }
    configureColumns() {
        if (this.columns && this.columns.length !== 0 && Object.keys(this.templates).length !== 0) {
            // Figure the column templates
            this.columns.forEach((column) => {
                // Figure the template
                let templateName;
                if (column.template) {
                    // Pass it in as template
                    templateName = column.template;
                }
                else if (!!this.templates[column.id]) {
                    // Custom template for the column id
                    templateName = column.id;
                }
                else {
                    // Default to the defaulCellTemplate
                    if (column.type === 'action') {
                        if (column.action && column.action.options) {
                            if (!column.action.icon) {
                                column.action.icon = 'collapse';
                            }
                            templateName = 'dropdownCellTemplate';
                        }
                        else {
                            templateName = 'buttonCellTemplate';
                        }
                    }
                    else {
                        if (column.type === 'link:tel' || column.type === 'link:mailto') {
                            templateName = `${column.type.split(':')[1]}CellTemplate`;
                        }
                        else {
                            templateName = `${column.type}CellTemplate`;
                        }
                    }
                }
                this.columnToTemplate[column.id] = this.templates[templateName];
            });
            this.configureLastDisplayedColumn();
            this.columnsLoaded = true;
        }
    }
    scrollListener() {
        const target = this.novoDataTableContainer.nativeElement;
        const left = target.scrollLeft;
        if (left !== this.scrollLeft) {
            this.scrollLeft = target.scrollLeft;
        }
        this.ref.markForCheck();
    }
    performInteractions(event) {
        if (this.listInteractions) {
            for (const column of this.columns) {
                const allListColumnInteractions = this.listInteractions[column.id];
                const listColumnInteraction = allListColumnInteractions && allListColumnInteractions.find((int) => int.event.includes(event));
                if (listColumnInteraction) {
                    listColumnInteraction.script(this, column.id);
                }
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDataTable, deps: [{ token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i2.DataTableState }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDataTable, selector: "novo-data-table", inputs: { displayedColumns: "displayedColumns", paginationOptions: "paginationOptions", searchOptions: "searchOptions", selectionOptions: "selectionOptions", defaultSort: "defaultSort", name: "name", allowMultipleFilters: "allowMultipleFilters", rowIdentifier: "rowIdentifier", activeRowIdentifier: "activeRowIdentifier", trackByFn: "trackByFn", templates: "templates", fixedHeader: "fixedHeader", paginatorDataFeatureId: "paginatorDataFeatureId", maxSelected: "maxSelected", canSelectAll: "canSelectAll", allMatchingSelected: "allMatchingSelected", overrideTotal: "overrideTotal", paginationRefreshSubject: "paginationRefreshSubject", dataTableService: "dataTableService", rows: "rows", outsideFilter: "outsideFilter", refreshSubject: "refreshSubject", columns: "columns", customFilter: "customFilter", hasExandedRows: "hasExandedRows", forceShowHeader: "forceShowHeader", hideGlobalSearch: "hideGlobalSearch", listInteractions: "listInteractions" }, outputs: { resized: "resized", preferencesChanged: "preferencesChanged", allSelected: "allSelected" }, host: { properties: { "class.global-search-hidden": "this.globalSearchHiddenClassToggle", "class.empty": "this.empty", "class.loading": "this.loadingClass" } }, providers: [DataTableState, { provide: NOVO_DATA_TABLE_REF, useExisting: NovoDataTable }], queries: [{ propertyName: "customTemplates", predicate: NovoTemplate }], viewQueries: [{ propertyName: "novoDataTableContainer", first: true, predicate: ["novoDataTableContainer"], descendants: true }, { propertyName: "defaultTemplates", predicate: NovoTemplate, descendants: true }, { propertyName: "cellHeaders", predicate: NovoDataTableCellHeader, descendants: true }], ngImport: i0, template: `
    <header
      *ngIf="(!(empty && !state.userFiltered) && !loading) || forceShowHeader"
      [class.empty]="hideGlobalSearch && !paginationOptions && !templates['customActions']"
    >
      <ng-container *ngTemplateOutlet="templates['customHeader']"></ng-container>
      <novo-search
        alwaysOpen="true"
        (searchChanged)="onSearchChange($event)"
        [(ngModel)]="state.globalSearch"
        *ngIf="!hideGlobalSearch"
        [placeholder]="searchOptions?.placeholder"
        [hint]="searchOptions?.tooltip"
      >
      </novo-search>
      <novo-data-table-pagination
        *ngIf="paginationOptions"
        [theme]="paginationOptions.theme"
        [length]="useOverrideTotal ? overrideTotal : dataSource?.currentTotal"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
        [dataFeatureId]="paginatorDataFeatureId"
        [canSelectAll]="canSelectAll"
        [allMatchingSelected]="allMatchingSelected"
        [loading]="paginationOptions.loading"
        [errorLoading]="paginationOptions.errorLoading"
        [paginationRefreshSubject]="paginationRefreshSubject"
      >
      </novo-data-table-pagination>
      <div class="novo-data-table-actions" *ngIf="templates['customActions']">
        <ng-container *ngTemplateOutlet="templates['customActions']"></ng-container>
      </div>
    </header>
    <div class="novo-data-table-loading-mask" *ngIf="dataSource?.loading || loading" data-automation-id="novo-data-table-loading">
      <novo-loading></novo-loading>
    </div>
    <div class="novo-data-table-outside-container" [ngClass]="{ 'novo-data-table-outside-container-fixed': fixedHeader }">
      <div class="novo-data-table-custom-filter" *ngIf="customFilter">
        <ng-container *ngTemplateOutlet="templates['customFilter']"></ng-container>
      </div>
      <div
        #novoDataTableContainer
        cdkScrollable
        class="novo-data-table-container"
        [ngClass]="{ 'novo-data-table-container-fixed': fixedHeader }"
        [class.empty-user-filtered]="dataSource?.currentlyEmpty && state.userFiltered"
        [class.empty]="empty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
      >
        <cdk-table
          *ngIf="columns?.length > 0 && columnsLoaded && dataSource"
          [dataSource]="dataSource"
          [trackBy]="trackByFn"
          novoDataTableSortFilter
          [class.expandable]="expandable"
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="empty && !state.userFiltered"
        >
          <ng-container cdkColumnDef="selection">
            <novo-data-table-checkbox-header-cell *cdkHeaderCellDef [maxSelected]="maxSelected"></novo-data-table-checkbox-header-cell>
            <novo-data-table-checkbox-cell
              *cdkCellDef="let row; let i = index"
              [row]="row"
              [maxSelected]="maxSelected"
            ></novo-data-table-checkbox-cell>
          </ng-container>
          <ng-container cdkColumnDef="expand">
            <novo-data-table-expand-header-cell *cdkHeaderCellDef></novo-data-table-expand-header-cell>
            <novo-data-table-expand-cell *cdkCellDef="let row; let i = index" [row]="row"></novo-data-table-expand-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns; trackBy: trackColumnsBy" [cdkColumnDef]="column.id">
            <novo-data-table-header-cell
              *cdkHeaderCellDef
              [column]="column"
              [filterTemplate]="templates['column-filter-' + (column.filterable?.customTemplate || column.id)]"
              [novo-data-table-cell-config]="column"
              [resized]="resized"
              [defaultSort]="defaultSort"
              [allowMultipleFilters]="allowMultipleFilters"
              [class.empty]="column?.type === 'action' && !column?.label"
              [class.button-header-cell]="column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)"
              [class.dropdown-header-cell]="column?.type === 'action' && column?.action?.options"
              [class.fixed-header]="fixedHeader"
            ></novo-data-table-header-cell>
            <novo-data-table-cell
              *cdkCellDef="let row"
              [resized]="resized"
              [column]="column"
              [row]="row"
              [template]="columnToTemplate[column.id]"
              [class.empty]="column?.type === 'action' && !column?.label"
              [class.button-cell]="column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)"
              [class.dropdown-cell]="column?.type === 'action' && column?.action?.options"
            ></novo-data-table-cell>
          </ng-container>
          <novo-data-table-header-row
            *cdkHeaderRowDef="displayedColumns"
            [fixedHeader]="fixedHeader"
            data-automation-id="novo-data-table-header-row"
          ></novo-data-table-header-row>
          <novo-data-table-row
            *cdkRowDef="let row; columns: displayedColumns"
            [ngClass]="{ active: row[rowIdentifier] == activeRowIdentifier }"
            [novoDataTableExpand]="detailRowTemplate"
            [row]="row"
            [id]="name + '-' + row[rowIdentifier]"
            [dataAutomationId]="row[rowIdentifier]"
          ></novo-data-table-row>
        </cdk-table>
        <div class="novo-data-table-footer" *ngIf="templates['footer']">
          <ng-container *ngTemplateOutlet="templates['footer']; context: { $implicit: columns, data: dataSource.data }"></ng-container>
        </div>
        <div
          class="novo-data-table-no-results-container"
          [style.left.px]="scrollLeft"
          *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div class="novo-data-table-empty-message">
            <ng-container *ngTemplateOutlet="templates['noResultsMessage'] || templates['defaultNoResultsMessage']"></ng-container>
          </div>
        </div>
        <div
          class="novo-data-table-no-more-results-container"
          [style.left.px]="scrollLeft"
          *ngIf="!empty && dataSource?.currentlyEmpty && !state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div class="novo-data-table-empty-message">
            <ng-container *ngTemplateOutlet="templates['noMoreResultsMessage'] || templates['defaultNoMoreResultsMessage']"></ng-container>
          </div>
        </div>
      </div>
      <div
        class="novo-data-table-empty-container"
        *ngIf="empty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
      >
        <div class="novo-data-table-empty-message">
          <ng-container *ngTemplateOutlet="templates['emptyMessage'] || templates['defaultNoResultsMessage']"></ng-container>
        </div>
      </div>
    </div>
    <!-- DEFAULT CELL TEMPLATE -->
    <ng-template novoTemplate="textCellTemplate" let-row let-col="col">
      <span [style.width.px]="col?.width" [style.min-width.px]="col?.width" [style.max-width.px]="col?.width">{{
        row[col.id] | dataTableInterpolate: col
      }}</span>
    </ng-template>
    <ng-template novoTemplate="dateCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="datetimeCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateTimeRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="timeCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableTimeRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="currencyCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableCurrencyRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="bigdecimalCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableBigDecimalRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="numberCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="percentCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col:true }}</span>
    </ng-template>
    <ng-template novoTemplate="linkCellTemplate" let-row let-col="col">
      <a
        [attr.data-feature-id]="col?.attributes?.dataFeatureId"
        (click)="col.handlers?.click({ originalEvent: $event, row: row })"
        [style.width.px]="col?.width"
        [style.min-width.px]="col?.width"
        [style.max-width.px]="col?.width"
        >{{ row[col.id] | dataTableInterpolate: col }}</a
      >
    </ng-template>
    <ng-template novoTemplate="telCellTemplate" let-row let-col="col">
      <a href="tel:{{ row[col.id] | dataTableInterpolate: col }}" [target]="col?.attributes?.target">{{
        row[col.id] | dataTableInterpolate: col
      }}</a>
    </ng-template>
    <ng-template novoTemplate="mailtoCellTemplate" let-row let-col="col">
      <a href="mailto:{{ row[col.id] | dataTableInterpolate: col }}" [target]="col?.attributes?.target">{{
        row[col.id] | dataTableInterpolate: col
      }}</a>
    </ng-template>
    <ng-template novoTemplate="buttonCellTemplate" let-row let-col="col">
      <novo-button
        size="small"
        theme="icon"
        [tooltip]="col?.action?.tooltip"
        tooltipPosition="right"
        [attr.data-feature-id]="col?.attributes?.dataFeatureId"
        [disabled]="isDisabled(col, row)"
        (click)="col.handlers?.click({ originalEvent: $event, row: row })"
      >
        <novo-icon>{{ col?.action?.icon }}</novo-icon>
      </novo-button>
    </ng-template>
    <ng-template novoTemplate="dropdownCellTemplate" let-row let-col="col">
      <novo-dropdown parentScrollSelector=".novo-data-table-container" containerClass="novo-data-table-dropdown">
        <novo-button type="button" theme="dialogue" [icon]="col.action.icon" inverse>{{ col.label }}</novo-button>
        <novo-optgroup>
          <novo-option
            *ngFor="let option of col?.action?.options"
            (click)="option.handlers.click({ originalEvent: $event?.originalEvent, row: row })"
            [disabled]="isDisabled(option, row)"
          >
            <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
          </novo-option>
        </novo-optgroup>
      </novo-dropdown>
    </ng-template>
    <ng-template novoTemplate="defaultNoResultsMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="defaultNoMoreResultsMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.noMoreRecordsMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="defaultEmptyMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="expandedRow"> You did not provide an "expandedRow" template! </ng-template>
    <ng-template #detailRowTemplate let-row>
      <div class="novo-data-table-detail-row" [@expand] style="overflow: hidden">
        <ng-container *ngTemplateOutlet="templates['expandedRow']; context: { $implicit: row }"></ng-container>
      </div>
    </ng-template>
    <!-- CUSTOM CELLS PASSED IN -->
    <ng-content></ng-content>
  `, isInline: true, styles: ["html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:var(--font-family-mono, \"monospace\");font-size:1em}a,novo-data-table .clickable{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:var(--font-family-mono, \"monospace\");font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none!important}cdk-table{display:block;flex:1}cdk-table.expandable{width:fit-content;min-width:100%}cdk-table.empty{min-height:62px;max-height:62px}cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-checkbox-cell{background-color:var(--background-muted, #f4f4f4)}cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-checkbox-cell{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(odd).active+.novo-data-table-detail-row{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(odd)+.novo-data-table-detail-row{background-color:var(--background-muted, #f4f4f4)}cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-checkbox-cell{background-color:var(--background-body, #ffffff)}cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-checkbox-cell{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(2n).active+.novo-data-table-detail-row{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(2n)+.novo-data-table-detail-row{background-color:var(--background-body, #ffffff)}.novo-data-table-cell-align-right{text-align:right;justify-content:flex-end;overflow:hidden;text-overflow:clip}.novo-data-table-header-row,.novo-data-table-header-cell{position:relative;z-index:1}.novo-data-table-header-row.fixed-header,.novo-data-table-header-cell.fixed-header{position:sticky;top:0}.novo-data-table-row,.novo-data-table-header-row{display:flex;flex-direction:row;flex-wrap:nowrap;background-color:var(--background-body, #ffffff)}.novo-data-table-row .novo-data-table-header-cell,.novo-data-table-row .novo-data-table-checkbox-header-cell,.novo-data-table-header-row .novo-data-table-header-cell,.novo-data-table-header-row .novo-data-table-checkbox-header-cell{background-color:var(--background-body, #ffffff)}.novo-data-table-row.expanded i.bhi-next.data-table-icon,.novo-data-table-header-row.expanded i.bhi-next.data-table-icon{cursor:pointer;transition:all .1s}.novo-data-table-row.expanded i.bhi-next.data-table-icon.expanded,.novo-data-table-header-row.expanded i.bhi-next.data-table-icon.expanded{transform:rotate(90deg)}.novo-data-table-header-cell.resizable{padding-right:0}.novo-data-table-header-cell.resizable:hover{background-color:var(--background-muted, #4f5361)}.novo-data-table-header-cell.resizable .data-table-header-resizable{height:100%}.novo-data-table-header-cell.resizable .data-table-header-resizable span{cursor:ew-resize;background-color:var(--border, #4f5361);width:1px;margin:0 4px;display:block}.novo-data-table-header-cell>div>button{margin-right:2px}.novo-data-table-header-cell>div.spacer{flex-grow:100}.novo-data-table-clear-button button{min-width:80px!important}.novo-data-table-cell,.novo-data-table-header-cell{min-width:200px;padding:9px;flex:1;line-height:1.1em}.novo-data-table-cell>i.label-icon,.novo-data-table-header-cell>i.label-icon{margin-right:.5em}.novo-data-table-cell>span,.novo-data-table-header-cell>span{display:block;min-width:180px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.novo-data-table-cell novo-dropdown,.novo-data-table-header-cell novo-dropdown{display:inline-block}.novo-data-table-cell .filter-button,.novo-data-table-header-cell .filter-button{color:var(--text-muted);background:transparent;pointer-events:all;margin-left:.5rem;line-height:1em;outline:none}.novo-data-table-cell .filter-button:hover,.novo-data-table-header-cell .filter-button:hover{color:var(--text-main)}.novo-data-table-cell .filter-button.filter-active,.novo-data-table-header-cell .filter-button.filter-active{color:var(--selection)}.novo-data-table-cell button.active,.novo-data-table-header-cell button.active{color:#fff;background:#4a89dc}.novo-data-table-cell button.active:hover,.novo-data-table-cell button.active:active,.novo-data-table-cell button.active:focus,.novo-data-table-cell button.active:visited,.novo-data-table-header-cell button.active:hover,.novo-data-table-header-cell button.active:active,.novo-data-table-header-cell button.active:focus,.novo-data-table-header-cell button.active:visited{background:#4a89dc!important}.novo-data-table-cell.clickable,.novo-data-table-header-cell.clickable{cursor:pointer;color:#39d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-data-table-cell{display:flex;flex-direction:row;align-items:center}.novo-data-table-cell.dropdown-cell,.novo-data-table-cell.button-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;padding:0 5px}.novo-data-table-cell.dropdown-cell novo-dropdown button,.novo-data-table-cell.button-cell novo-dropdown button{padding:0 0 0 5px}.novo-data-table-cell.dropdown-cell novo-dropdown button:hover,.novo-data-table-cell.dropdown-cell novo-dropdown button:active,.novo-data-table-cell.dropdown-cell novo-dropdown button:focus,.novo-data-table-cell.button-cell novo-dropdown button:hover,.novo-data-table-cell.button-cell novo-dropdown button:active,.novo-data-table-cell.button-cell novo-dropdown button:focus{background:#0000001a!important}.novo-data-table-cell.button-cell{min-width:40px;max-width:40px}.novo-data-table-cell.dropdown-cell{min-width:98px;max-width:98px}.novo-data-table-cell.dropdown-cell.empty{min-width:39px;max-width:39px}.novo-data-table-cell i.data-table-icon{cursor:pointer;font-size:1.2em;padding:.5em;border-radius:3px}.novo-data-table-cell i.data-table-icon.disabled{pointer-events:none;opacity:.7}.novo-data-table-cell i.data-table-icon:hover{background:#0000001a}.novo-data-table-cell i.data-table-icon:active{background:#00000040}.novo-data-table-header-cell{white-space:normal;overflow-wrap:break-word;display:flex;align-items:center}.novo-data-table-header-cell+.button-header-cell,.novo-data-table-header-cell+.dropdown-header-cell{border-left:none}.novo-data-table-header-cell>label{display:inline-block;padding-right:10px;overflow:hidden;text-overflow:ellipsis}.novo-data-table-header-cell>label.sort-disabled{cursor:default}.novo-data-table-header-cell>div{width:55px;display:flex;align-items:center;flex:0}.novo-data-table-header-cell novo-dropdown[side=right]{display:inline-block}.novo-data-table-header-cell novo-dropdown[side=right]:focus{outline:none}.novo-data-table-header-cell.button-header-cell{min-width:40px;max-width:40px}.novo-data-table-header-cell.dropdown-header-cell{min-width:98px;max-width:98px}.novo-data-table-header-cell.dropdown-header-cell.empty{min-width:39px;max-width:39px}.novo-data-table-expand-header-cell,.novo-data-table-expand-cell{display:flex;align-items:center;justify-content:center;width:30px}.novo-data-table-expand-header-cell i,.novo-data-table-expand-cell i{cursor:pointer;transition:all .1s}.novo-data-table-expand-header-cell i.expanded,.novo-data-table-expand-cell i.expanded{transform:rotate(90deg)}.novo-data-table-checkbox-header-cell,.novo-data-table-checkbox-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;max-width:40px;padding:0 10px}.novo-data-table-checkbox-header-cell div.data-table-checkbox,.novo-data-table-checkbox-cell div.data-table-checkbox{display:flex;cursor:pointer}.novo-data-table-checkbox-header-cell div.data-table-checkbox i,.novo-data-table-checkbox-cell div.data-table-checkbox i{cursor:pointer}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-box-empty,.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-disabled,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-box-empty,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-disabled{cursor:not-allowed!important}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-empty,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-empty{color:#d2d2d2}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-box-yes,.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-filled,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-box-yes,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-filled{color:#4a89dc}.novo-data-table-checkbox-header-cell input,.novo-data-table-checkbox-cell input{appearance:none!important;height:0!important;border:none!important}novo-data-table{position:relative;width:100%;display:flex;flex-direction:column;flex:1}novo-data-table.loading{min-height:300px}novo-data-table header{padding:5px;display:flex;align-items:center;flex-shrink:0;border-bottom:1px solid var(--border, #f7f7f7)}novo-data-table header.empty{padding:0}novo-data-table header>[novo-data-table-custom-header]{flex:1}novo-data-table header>novo-search{padding-right:10px;display:none}@media (min-width: 1000px){novo-data-table header>novo-search{display:flex}}novo-data-table header>novo-search>input{padding:8.5px;font-size:1.1em;height:35px}novo-data-table header>novo-search.active>button[theme=fab]{height:35px;min-height:35px}novo-data-table header>div.novo-data-table-actions{display:flex;align-items:center;justify-content:flex-end}novo-data-table header>div.novo-data-table-actions>*{margin-right:.2em}novo-data-table header>div.novo-data-table-actions>*:last-child{margin-right:0}novo-data-table header>div.novo-data-table-actions>div,novo-data-table header>div.novo-data-table-actions>section{display:flex;align-items:center}novo-data-table header>div.novo-data-table-actions>div button,novo-data-table header>div.novo-data-table-actions>section button{margin-left:3px;margin-bottom:0}novo-data-table header>div.novo-data-table-actions>div button[theme][theme=icon],novo-data-table header>div.novo-data-table-actions>section button[theme][theme=icon]{height:35px;width:35px;font-size:1.4em}novo-data-table header>div.novo-data-table-actions>div novo-dropdown button[theme],novo-data-table header>div.novo-data-table-actions>section novo-dropdown button[theme]{white-space:nowrap;padding:6px 5px 6px 15px!important}novo-data-table button[theme][theme=icon]{height:30px;width:30px;padding:5px}novo-data-table .novo-data-table-loading-mask{position:absolute;display:flex;padding-top:10%;justify-content:center;inset:0;background:#00000012;z-index:10}novo-data-table .novo-data-table-detail-row{padding:1em}novo-data-table .novo-data-table-empty-container{padding-top:0}novo-data-table .novo-data-table-no-results-container,novo-data-table .novo-data-table-no-more-results-container{position:absolute;top:48%;left:0;right:0;width:100%}novo-data-table .novo-data-table-empty-container,novo-data-table .novo-data-table-no-results-container,novo-data-table .novo-data-table-no-more-results-container{padding:2em;flex:1;display:flex;align-items:center;justify-content:center;color:#9e9e9e;z-index:5}novo-data-table .novo-data-table-outside-container{display:flex;flex:1}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter{border-right:1px solid var(--border, #f7f7f7)}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar{box-shadow:none}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar .date-range-tabs{height:51px}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar .calendar-footer{display:none}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter div.period-selector{padding:1em}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter div.period-selector .novo-form-control-label{display:block;max-width:100%;margin-bottom:1em}novo-data-table .novo-data-table-outside-container .novo-data-table-container{flex:1;overflow:auto;position:relative}novo-data-table .novo-data-table-outside-container .novo-data-table-container.empty{display:flex;flex:0}novo-data-table .novo-data-table-outside-container .novo-data-table-container.empty-user-filtered{display:flex;flex-flow:column nowrap;min-height:250px}novo-data-table .novo-data-table-outside-container-fixed{overflow:hidden;position:relative}novo-data-table .novo-data-table-outside-container-fixed .novo-data-table-container-fixed{position:absolute;width:100%;height:100%}novo-data-table .novo-data-table-footer{display:flex;align-items:center}novo-data-table .novo-data-table-footer>div,novo-data-table .novo-data-table-footer div.novo-data-table-footer-cell{border-top:1px solid var(--border, #f7f7f7);flex:1;min-width:200px;display:flex;align-items:center}novo-data-table .novo-data-table-footer>div:not(.button-cell):not(.dropdown-cell),novo-data-table .novo-data-table-footer div.novo-data-table-footer-cell:not(.button-cell):not(.dropdown-cell){padding:10px}.dropdown-container.data-table-dropdown{min-width:220px;max-width:280px;max-height:500px;overflow-x:hidden;overflow-y:hidden}.dropdown-container.data-table-dropdown.right{margin-left:-150px!important}.dropdown-container.data-table-dropdown .header{padding:5px 10px;display:flex;justify-content:space-between;align-items:center}.dropdown-container.data-table-dropdown .optgroup-container,.dropdown-container.data-table-dropdown .dropdown-list-options{max-height:346px;overflow-y:auto;overflow-x:hidden}.dropdown-container.data-table-dropdown .footer{border-top:1px solid var(--border, #f7f7f7);padding:5px 10px;display:flex;justify-content:flex-end;align-items:center}.dropdown-container.data-table-dropdown .footer button icon{font-size:.8em}.dropdown-container.data-table-dropdown list item.active{background:transparent;font-weight:500}.dropdown-container.data-table-dropdown button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.data-table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff;padding:0!important}.dropdown-container.data-table-dropdown .calendar-container .back-link{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.data-table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.data-table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.dropdown-container.data-table-dropdown span.error-text{color:#da4453;position:relative;left:10px;top:-17px;font-size:x-small}.dropdown-container.data-table-dropdown .filter-null-results{background-color:#fff;text-align:center;color:#b5b5b5;background:transparent;font-weight:500}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"], dependencies: [{ kind: "component", type: i3.CdkTable, selector: "cdk-table, table[cdk-table]", inputs: ["trackBy", "dataSource", "multiTemplateDataRows", "fixedLayout"], outputs: ["contentChanged"], exportAs: ["cdkTable"] }, { kind: "directive", type: i3.CdkRowDef, selector: "[cdkRowDef]", inputs: ["cdkRowDefColumns", "cdkRowDefWhen"] }, { kind: "directive", type: i3.CdkCellDef, selector: "[cdkCellDef]" }, { kind: "directive", type: i3.CdkHeaderCellDef, selector: "[cdkHeaderCellDef]" }, { kind: "directive", type: i3.CdkColumnDef, selector: "[cdkColumnDef]", inputs: ["sticky", "cdkColumnDef", "stickyEnd"] }, { kind: "directive", type: i3.CdkHeaderRowDef, selector: "[cdkHeaderRowDef]", inputs: ["cdkHeaderRowDef", "cdkHeaderRowDefSticky"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i6.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i7.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "component", type: i8.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: i9.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i10.NovoSearchBoxElement, selector: "novo-search", inputs: ["name", "icon", "position", "placeholder", "alwaysOpen", "theme", "color", "closeOnSelect", "displayField", "displayValue", "hint", "keepOpen", "hasBackdrop", "allowPropagation"], outputs: ["searchChanged", "applySearch"] }, { kind: "component", type: i11.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i11.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { kind: "directive", type: i11.NovoTemplate, selector: "[novoTemplate]", inputs: ["type", "novoTemplate"] }, { kind: "directive", type: i11.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "directive", type: i12.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { kind: "directive", type: i13.CdkScrollable, selector: "[cdk-scrollable], [cdkScrollable]" }, { kind: "component", type: i14.NovoDataTableCellHeader, selector: "[novo-data-table-cell-config]", inputs: ["defaultSort", "allowMultipleFilters", "resized", "filterTemplate", "novo-data-table-cell-config"] }, { kind: "directive", type: i15.NovoDataTableSortFilter, selector: "[novoDataTableSortFilter]" }, { kind: "directive", type: i16.NovoDataTableHeaderCell, selector: "novo-data-table-header-cell", inputs: ["column"] }, { kind: "component", type: i17.NovoDataTableCell, selector: "novo-data-table-cell", inputs: ["row", "template", "column", "resized"] }, { kind: "component", type: i18.NovoDataTableHeaderRow, selector: "novo-data-table-header-row", inputs: ["fixedHeader"] }, { kind: "component", type: i19.NovoDataTableRow, selector: "novo-data-table-row", inputs: ["id", "dataAutomationId"] }, { kind: "component", type: i20.NovoDataTablePagination, selector: "novo-data-table-pagination", inputs: ["theme", "page", "pageSize", "dataFeatureId", "pageSizeOptions", "canSelectAll", "allMatchingSelected", "loading", "errorLoading", "paginationRefreshSubject", "length"], outputs: ["pageChange"] }, { kind: "component", type: i21.NovoDataTableCheckboxCell, selector: "novo-data-table-checkbox-cell", inputs: ["row", "maxSelected"] }, { kind: "component", type: i22.NovoDataTableCheckboxHeaderCell, selector: "novo-data-table-checkbox-header-cell", inputs: ["maxSelected"] }, { kind: "component", type: i23.NovoDataTableExpandCell, selector: "novo-data-table-expand-cell", inputs: ["row"] }, { kind: "component", type: i24.NovoDataTableExpandHeaderCell, selector: "novo-data-table-expand-header-cell" }, { kind: "directive", type: i25.NovoDataTableExpandDirective, selector: "[novoDataTableExpand]", inputs: ["row", "novoDataTableExpand"] }, { kind: "pipe", type: i26.DataTableInterpolatePipe, name: "dataTableInterpolate" }, { kind: "pipe", type: i26.DateTableDateRendererPipe, name: "dataTableDateRenderer" }, { kind: "pipe", type: i26.DateTableCurrencyRendererPipe, name: "dataTableCurrencyRenderer" }, { kind: "pipe", type: i26.DateTableDateTimeRendererPipe, name: "dataTableDateTimeRenderer" }, { kind: "pipe", type: i26.DateTableNumberRendererPipe, name: "dataTableNumberRenderer" }, { kind: "pipe", type: i26.DateTableTimeRendererPipe, name: "dataTableTimeRenderer" }, { kind: "pipe", type: i26.DataTableBigDecimalRendererPipe, name: "dataTableBigDecimalRenderer" }], animations: [
            trigger('expand', [
                animState('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
                animState('*', style({ height: '*', visibility: 'visible' })),
                transition('void <=> *', animate('70ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDataTable, decorators: [{
            type: Component,
            args: [{ selector: 'novo-data-table', animations: [
                        trigger('expand', [
                            animState('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
                            animState('*', style({ height: '*', visibility: 'visible' })),
                            transition('void <=> *', animate('70ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                        ]),
                    ], template: `
    <header
      *ngIf="(!(empty && !state.userFiltered) && !loading) || forceShowHeader"
      [class.empty]="hideGlobalSearch && !paginationOptions && !templates['customActions']"
    >
      <ng-container *ngTemplateOutlet="templates['customHeader']"></ng-container>
      <novo-search
        alwaysOpen="true"
        (searchChanged)="onSearchChange($event)"
        [(ngModel)]="state.globalSearch"
        *ngIf="!hideGlobalSearch"
        [placeholder]="searchOptions?.placeholder"
        [hint]="searchOptions?.tooltip"
      >
      </novo-search>
      <novo-data-table-pagination
        *ngIf="paginationOptions"
        [theme]="paginationOptions.theme"
        [length]="useOverrideTotal ? overrideTotal : dataSource?.currentTotal"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
        [dataFeatureId]="paginatorDataFeatureId"
        [canSelectAll]="canSelectAll"
        [allMatchingSelected]="allMatchingSelected"
        [loading]="paginationOptions.loading"
        [errorLoading]="paginationOptions.errorLoading"
        [paginationRefreshSubject]="paginationRefreshSubject"
      >
      </novo-data-table-pagination>
      <div class="novo-data-table-actions" *ngIf="templates['customActions']">
        <ng-container *ngTemplateOutlet="templates['customActions']"></ng-container>
      </div>
    </header>
    <div class="novo-data-table-loading-mask" *ngIf="dataSource?.loading || loading" data-automation-id="novo-data-table-loading">
      <novo-loading></novo-loading>
    </div>
    <div class="novo-data-table-outside-container" [ngClass]="{ 'novo-data-table-outside-container-fixed': fixedHeader }">
      <div class="novo-data-table-custom-filter" *ngIf="customFilter">
        <ng-container *ngTemplateOutlet="templates['customFilter']"></ng-container>
      </div>
      <div
        #novoDataTableContainer
        cdkScrollable
        class="novo-data-table-container"
        [ngClass]="{ 'novo-data-table-container-fixed': fixedHeader }"
        [class.empty-user-filtered]="dataSource?.currentlyEmpty && state.userFiltered"
        [class.empty]="empty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
      >
        <cdk-table
          *ngIf="columns?.length > 0 && columnsLoaded && dataSource"
          [dataSource]="dataSource"
          [trackBy]="trackByFn"
          novoDataTableSortFilter
          [class.expandable]="expandable"
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="empty && !state.userFiltered"
        >
          <ng-container cdkColumnDef="selection">
            <novo-data-table-checkbox-header-cell *cdkHeaderCellDef [maxSelected]="maxSelected"></novo-data-table-checkbox-header-cell>
            <novo-data-table-checkbox-cell
              *cdkCellDef="let row; let i = index"
              [row]="row"
              [maxSelected]="maxSelected"
            ></novo-data-table-checkbox-cell>
          </ng-container>
          <ng-container cdkColumnDef="expand">
            <novo-data-table-expand-header-cell *cdkHeaderCellDef></novo-data-table-expand-header-cell>
            <novo-data-table-expand-cell *cdkCellDef="let row; let i = index" [row]="row"></novo-data-table-expand-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns; trackBy: trackColumnsBy" [cdkColumnDef]="column.id">
            <novo-data-table-header-cell
              *cdkHeaderCellDef
              [column]="column"
              [filterTemplate]="templates['column-filter-' + (column.filterable?.customTemplate || column.id)]"
              [novo-data-table-cell-config]="column"
              [resized]="resized"
              [defaultSort]="defaultSort"
              [allowMultipleFilters]="allowMultipleFilters"
              [class.empty]="column?.type === 'action' && !column?.label"
              [class.button-header-cell]="column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)"
              [class.dropdown-header-cell]="column?.type === 'action' && column?.action?.options"
              [class.fixed-header]="fixedHeader"
            ></novo-data-table-header-cell>
            <novo-data-table-cell
              *cdkCellDef="let row"
              [resized]="resized"
              [column]="column"
              [row]="row"
              [template]="columnToTemplate[column.id]"
              [class.empty]="column?.type === 'action' && !column?.label"
              [class.button-cell]="column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)"
              [class.dropdown-cell]="column?.type === 'action' && column?.action?.options"
            ></novo-data-table-cell>
          </ng-container>
          <novo-data-table-header-row
            *cdkHeaderRowDef="displayedColumns"
            [fixedHeader]="fixedHeader"
            data-automation-id="novo-data-table-header-row"
          ></novo-data-table-header-row>
          <novo-data-table-row
            *cdkRowDef="let row; columns: displayedColumns"
            [ngClass]="{ active: row[rowIdentifier] == activeRowIdentifier }"
            [novoDataTableExpand]="detailRowTemplate"
            [row]="row"
            [id]="name + '-' + row[rowIdentifier]"
            [dataAutomationId]="row[rowIdentifier]"
          ></novo-data-table-row>
        </cdk-table>
        <div class="novo-data-table-footer" *ngIf="templates['footer']">
          <ng-container *ngTemplateOutlet="templates['footer']; context: { $implicit: columns, data: dataSource.data }"></ng-container>
        </div>
        <div
          class="novo-data-table-no-results-container"
          [style.left.px]="scrollLeft"
          *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div class="novo-data-table-empty-message">
            <ng-container *ngTemplateOutlet="templates['noResultsMessage'] || templates['defaultNoResultsMessage']"></ng-container>
          </div>
        </div>
        <div
          class="novo-data-table-no-more-results-container"
          [style.left.px]="scrollLeft"
          *ngIf="!empty && dataSource?.currentlyEmpty && !state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div class="novo-data-table-empty-message">
            <ng-container *ngTemplateOutlet="templates['noMoreResultsMessage'] || templates['defaultNoMoreResultsMessage']"></ng-container>
          </div>
        </div>
      </div>
      <div
        class="novo-data-table-empty-container"
        *ngIf="empty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
      >
        <div class="novo-data-table-empty-message">
          <ng-container *ngTemplateOutlet="templates['emptyMessage'] || templates['defaultNoResultsMessage']"></ng-container>
        </div>
      </div>
    </div>
    <!-- DEFAULT CELL TEMPLATE -->
    <ng-template novoTemplate="textCellTemplate" let-row let-col="col">
      <span [style.width.px]="col?.width" [style.min-width.px]="col?.width" [style.max-width.px]="col?.width">{{
        row[col.id] | dataTableInterpolate: col
      }}</span>
    </ng-template>
    <ng-template novoTemplate="dateCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="datetimeCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateTimeRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="timeCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableTimeRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="currencyCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableCurrencyRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="bigdecimalCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableBigDecimalRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="numberCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="percentCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col:true }}</span>
    </ng-template>
    <ng-template novoTemplate="linkCellTemplate" let-row let-col="col">
      <a
        [attr.data-feature-id]="col?.attributes?.dataFeatureId"
        (click)="col.handlers?.click({ originalEvent: $event, row: row })"
        [style.width.px]="col?.width"
        [style.min-width.px]="col?.width"
        [style.max-width.px]="col?.width"
        >{{ row[col.id] | dataTableInterpolate: col }}</a
      >
    </ng-template>
    <ng-template novoTemplate="telCellTemplate" let-row let-col="col">
      <a href="tel:{{ row[col.id] | dataTableInterpolate: col }}" [target]="col?.attributes?.target">{{
        row[col.id] | dataTableInterpolate: col
      }}</a>
    </ng-template>
    <ng-template novoTemplate="mailtoCellTemplate" let-row let-col="col">
      <a href="mailto:{{ row[col.id] | dataTableInterpolate: col }}" [target]="col?.attributes?.target">{{
        row[col.id] | dataTableInterpolate: col
      }}</a>
    </ng-template>
    <ng-template novoTemplate="buttonCellTemplate" let-row let-col="col">
      <novo-button
        size="small"
        theme="icon"
        [tooltip]="col?.action?.tooltip"
        tooltipPosition="right"
        [attr.data-feature-id]="col?.attributes?.dataFeatureId"
        [disabled]="isDisabled(col, row)"
        (click)="col.handlers?.click({ originalEvent: $event, row: row })"
      >
        <novo-icon>{{ col?.action?.icon }}</novo-icon>
      </novo-button>
    </ng-template>
    <ng-template novoTemplate="dropdownCellTemplate" let-row let-col="col">
      <novo-dropdown parentScrollSelector=".novo-data-table-container" containerClass="novo-data-table-dropdown">
        <novo-button type="button" theme="dialogue" [icon]="col.action.icon" inverse>{{ col.label }}</novo-button>
        <novo-optgroup>
          <novo-option
            *ngFor="let option of col?.action?.options"
            (click)="option.handlers.click({ originalEvent: $event?.originalEvent, row: row })"
            [disabled]="isDisabled(option, row)"
          >
            <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
          </novo-option>
        </novo-optgroup>
      </novo-dropdown>
    </ng-template>
    <ng-template novoTemplate="defaultNoResultsMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="defaultNoMoreResultsMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.noMoreRecordsMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="defaultEmptyMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="expandedRow"> You did not provide an "expandedRow" template! </ng-template>
    <ng-template #detailRowTemplate let-row>
      <div class="novo-data-table-detail-row" [@expand] style="overflow: hidden">
        <ng-container *ngTemplateOutlet="templates['expandedRow']; context: { $implicit: row }"></ng-container>
      </div>
    </ng-template>
    <!-- CUSTOM CELLS PASSED IN -->
    <ng-content></ng-content>
  `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [DataTableState, { provide: NOVO_DATA_TABLE_REF, useExisting: NovoDataTable }], styles: ["html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:var(--font-family-mono, \"monospace\");font-size:1em}a,novo-data-table .clickable{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:var(--font-family-mono, \"monospace\");font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none!important}cdk-table{display:block;flex:1}cdk-table.expandable{width:fit-content;min-width:100%}cdk-table.empty{min-height:62px;max-height:62px}cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-checkbox-cell{background-color:var(--background-muted, #f4f4f4)}cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-checkbox-cell{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(odd).active+.novo-data-table-detail-row{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(odd)+.novo-data-table-detail-row{background-color:var(--background-muted, #f4f4f4)}cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-checkbox-cell{background-color:var(--background-body, #ffffff)}cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-checkbox-cell{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(2n).active+.novo-data-table-detail-row{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(2n)+.novo-data-table-detail-row{background-color:var(--background-body, #ffffff)}.novo-data-table-cell-align-right{text-align:right;justify-content:flex-end;overflow:hidden;text-overflow:clip}.novo-data-table-header-row,.novo-data-table-header-cell{position:relative;z-index:1}.novo-data-table-header-row.fixed-header,.novo-data-table-header-cell.fixed-header{position:sticky;top:0}.novo-data-table-row,.novo-data-table-header-row{display:flex;flex-direction:row;flex-wrap:nowrap;background-color:var(--background-body, #ffffff)}.novo-data-table-row .novo-data-table-header-cell,.novo-data-table-row .novo-data-table-checkbox-header-cell,.novo-data-table-header-row .novo-data-table-header-cell,.novo-data-table-header-row .novo-data-table-checkbox-header-cell{background-color:var(--background-body, #ffffff)}.novo-data-table-row.expanded i.bhi-next.data-table-icon,.novo-data-table-header-row.expanded i.bhi-next.data-table-icon{cursor:pointer;transition:all .1s}.novo-data-table-row.expanded i.bhi-next.data-table-icon.expanded,.novo-data-table-header-row.expanded i.bhi-next.data-table-icon.expanded{transform:rotate(90deg)}.novo-data-table-header-cell.resizable{padding-right:0}.novo-data-table-header-cell.resizable:hover{background-color:var(--background-muted, #4f5361)}.novo-data-table-header-cell.resizable .data-table-header-resizable{height:100%}.novo-data-table-header-cell.resizable .data-table-header-resizable span{cursor:ew-resize;background-color:var(--border, #4f5361);width:1px;margin:0 4px;display:block}.novo-data-table-header-cell>div>button{margin-right:2px}.novo-data-table-header-cell>div.spacer{flex-grow:100}.novo-data-table-clear-button button{min-width:80px!important}.novo-data-table-cell,.novo-data-table-header-cell{min-width:200px;padding:9px;flex:1;line-height:1.1em}.novo-data-table-cell>i.label-icon,.novo-data-table-header-cell>i.label-icon{margin-right:.5em}.novo-data-table-cell>span,.novo-data-table-header-cell>span{display:block;min-width:180px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.novo-data-table-cell novo-dropdown,.novo-data-table-header-cell novo-dropdown{display:inline-block}.novo-data-table-cell .filter-button,.novo-data-table-header-cell .filter-button{color:var(--text-muted);background:transparent;pointer-events:all;margin-left:.5rem;line-height:1em;outline:none}.novo-data-table-cell .filter-button:hover,.novo-data-table-header-cell .filter-button:hover{color:var(--text-main)}.novo-data-table-cell .filter-button.filter-active,.novo-data-table-header-cell .filter-button.filter-active{color:var(--selection)}.novo-data-table-cell button.active,.novo-data-table-header-cell button.active{color:#fff;background:#4a89dc}.novo-data-table-cell button.active:hover,.novo-data-table-cell button.active:active,.novo-data-table-cell button.active:focus,.novo-data-table-cell button.active:visited,.novo-data-table-header-cell button.active:hover,.novo-data-table-header-cell button.active:active,.novo-data-table-header-cell button.active:focus,.novo-data-table-header-cell button.active:visited{background:#4a89dc!important}.novo-data-table-cell.clickable,.novo-data-table-header-cell.clickable{cursor:pointer;color:#39d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-data-table-cell{display:flex;flex-direction:row;align-items:center}.novo-data-table-cell.dropdown-cell,.novo-data-table-cell.button-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;padding:0 5px}.novo-data-table-cell.dropdown-cell novo-dropdown button,.novo-data-table-cell.button-cell novo-dropdown button{padding:0 0 0 5px}.novo-data-table-cell.dropdown-cell novo-dropdown button:hover,.novo-data-table-cell.dropdown-cell novo-dropdown button:active,.novo-data-table-cell.dropdown-cell novo-dropdown button:focus,.novo-data-table-cell.button-cell novo-dropdown button:hover,.novo-data-table-cell.button-cell novo-dropdown button:active,.novo-data-table-cell.button-cell novo-dropdown button:focus{background:#0000001a!important}.novo-data-table-cell.button-cell{min-width:40px;max-width:40px}.novo-data-table-cell.dropdown-cell{min-width:98px;max-width:98px}.novo-data-table-cell.dropdown-cell.empty{min-width:39px;max-width:39px}.novo-data-table-cell i.data-table-icon{cursor:pointer;font-size:1.2em;padding:.5em;border-radius:3px}.novo-data-table-cell i.data-table-icon.disabled{pointer-events:none;opacity:.7}.novo-data-table-cell i.data-table-icon:hover{background:#0000001a}.novo-data-table-cell i.data-table-icon:active{background:#00000040}.novo-data-table-header-cell{white-space:normal;overflow-wrap:break-word;display:flex;align-items:center}.novo-data-table-header-cell+.button-header-cell,.novo-data-table-header-cell+.dropdown-header-cell{border-left:none}.novo-data-table-header-cell>label{display:inline-block;padding-right:10px;overflow:hidden;text-overflow:ellipsis}.novo-data-table-header-cell>label.sort-disabled{cursor:default}.novo-data-table-header-cell>div{width:55px;display:flex;align-items:center;flex:0}.novo-data-table-header-cell novo-dropdown[side=right]{display:inline-block}.novo-data-table-header-cell novo-dropdown[side=right]:focus{outline:none}.novo-data-table-header-cell.button-header-cell{min-width:40px;max-width:40px}.novo-data-table-header-cell.dropdown-header-cell{min-width:98px;max-width:98px}.novo-data-table-header-cell.dropdown-header-cell.empty{min-width:39px;max-width:39px}.novo-data-table-expand-header-cell,.novo-data-table-expand-cell{display:flex;align-items:center;justify-content:center;width:30px}.novo-data-table-expand-header-cell i,.novo-data-table-expand-cell i{cursor:pointer;transition:all .1s}.novo-data-table-expand-header-cell i.expanded,.novo-data-table-expand-cell i.expanded{transform:rotate(90deg)}.novo-data-table-checkbox-header-cell,.novo-data-table-checkbox-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;max-width:40px;padding:0 10px}.novo-data-table-checkbox-header-cell div.data-table-checkbox,.novo-data-table-checkbox-cell div.data-table-checkbox{display:flex;cursor:pointer}.novo-data-table-checkbox-header-cell div.data-table-checkbox i,.novo-data-table-checkbox-cell div.data-table-checkbox i{cursor:pointer}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-box-empty,.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-disabled,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-box-empty,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-disabled{cursor:not-allowed!important}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-empty,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-empty{color:#d2d2d2}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-box-yes,.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-filled,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-box-yes,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-filled{color:#4a89dc}.novo-data-table-checkbox-header-cell input,.novo-data-table-checkbox-cell input{appearance:none!important;height:0!important;border:none!important}novo-data-table{position:relative;width:100%;display:flex;flex-direction:column;flex:1}novo-data-table.loading{min-height:300px}novo-data-table header{padding:5px;display:flex;align-items:center;flex-shrink:0;border-bottom:1px solid var(--border, #f7f7f7)}novo-data-table header.empty{padding:0}novo-data-table header>[novo-data-table-custom-header]{flex:1}novo-data-table header>novo-search{padding-right:10px;display:none}@media (min-width: 1000px){novo-data-table header>novo-search{display:flex}}novo-data-table header>novo-search>input{padding:8.5px;font-size:1.1em;height:35px}novo-data-table header>novo-search.active>button[theme=fab]{height:35px;min-height:35px}novo-data-table header>div.novo-data-table-actions{display:flex;align-items:center;justify-content:flex-end}novo-data-table header>div.novo-data-table-actions>*{margin-right:.2em}novo-data-table header>div.novo-data-table-actions>*:last-child{margin-right:0}novo-data-table header>div.novo-data-table-actions>div,novo-data-table header>div.novo-data-table-actions>section{display:flex;align-items:center}novo-data-table header>div.novo-data-table-actions>div button,novo-data-table header>div.novo-data-table-actions>section button{margin-left:3px;margin-bottom:0}novo-data-table header>div.novo-data-table-actions>div button[theme][theme=icon],novo-data-table header>div.novo-data-table-actions>section button[theme][theme=icon]{height:35px;width:35px;font-size:1.4em}novo-data-table header>div.novo-data-table-actions>div novo-dropdown button[theme],novo-data-table header>div.novo-data-table-actions>section novo-dropdown button[theme]{white-space:nowrap;padding:6px 5px 6px 15px!important}novo-data-table button[theme][theme=icon]{height:30px;width:30px;padding:5px}novo-data-table .novo-data-table-loading-mask{position:absolute;display:flex;padding-top:10%;justify-content:center;inset:0;background:#00000012;z-index:10}novo-data-table .novo-data-table-detail-row{padding:1em}novo-data-table .novo-data-table-empty-container{padding-top:0}novo-data-table .novo-data-table-no-results-container,novo-data-table .novo-data-table-no-more-results-container{position:absolute;top:48%;left:0;right:0;width:100%}novo-data-table .novo-data-table-empty-container,novo-data-table .novo-data-table-no-results-container,novo-data-table .novo-data-table-no-more-results-container{padding:2em;flex:1;display:flex;align-items:center;justify-content:center;color:#9e9e9e;z-index:5}novo-data-table .novo-data-table-outside-container{display:flex;flex:1}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter{border-right:1px solid var(--border, #f7f7f7)}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar{box-shadow:none}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar .date-range-tabs{height:51px}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar .calendar-footer{display:none}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter div.period-selector{padding:1em}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter div.period-selector .novo-form-control-label{display:block;max-width:100%;margin-bottom:1em}novo-data-table .novo-data-table-outside-container .novo-data-table-container{flex:1;overflow:auto;position:relative}novo-data-table .novo-data-table-outside-container .novo-data-table-container.empty{display:flex;flex:0}novo-data-table .novo-data-table-outside-container .novo-data-table-container.empty-user-filtered{display:flex;flex-flow:column nowrap;min-height:250px}novo-data-table .novo-data-table-outside-container-fixed{overflow:hidden;position:relative}novo-data-table .novo-data-table-outside-container-fixed .novo-data-table-container-fixed{position:absolute;width:100%;height:100%}novo-data-table .novo-data-table-footer{display:flex;align-items:center}novo-data-table .novo-data-table-footer>div,novo-data-table .novo-data-table-footer div.novo-data-table-footer-cell{border-top:1px solid var(--border, #f7f7f7);flex:1;min-width:200px;display:flex;align-items:center}novo-data-table .novo-data-table-footer>div:not(.button-cell):not(.dropdown-cell),novo-data-table .novo-data-table-footer div.novo-data-table-footer-cell:not(.button-cell):not(.dropdown-cell){padding:10px}.dropdown-container.data-table-dropdown{min-width:220px;max-width:280px;max-height:500px;overflow-x:hidden;overflow-y:hidden}.dropdown-container.data-table-dropdown.right{margin-left:-150px!important}.dropdown-container.data-table-dropdown .header{padding:5px 10px;display:flex;justify-content:space-between;align-items:center}.dropdown-container.data-table-dropdown .optgroup-container,.dropdown-container.data-table-dropdown .dropdown-list-options{max-height:346px;overflow-y:auto;overflow-x:hidden}.dropdown-container.data-table-dropdown .footer{border-top:1px solid var(--border, #f7f7f7);padding:5px 10px;display:flex;justify-content:flex-end;align-items:center}.dropdown-container.data-table-dropdown .footer button icon{font-size:.8em}.dropdown-container.data-table-dropdown list item.active{background:transparent;font-weight:500}.dropdown-container.data-table-dropdown button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.data-table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff;padding:0!important}.dropdown-container.data-table-dropdown .calendar-container .back-link{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.data-table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.data-table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.dropdown-container.data-table-dropdown span.error-text{color:#da4453;position:relative;left:10px;top:-17px;font-size:x-small}.dropdown-container.data-table-dropdown .filter-null-results{background-color:#fff;text-align:center;color:#b5b5b5;background:transparent;font-weight:500}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i2.DataTableState }], propDecorators: { globalSearchHiddenClassToggle: [{
                type: HostBinding,
                args: ['class.global-search-hidden']
            }], customTemplates: [{
                type: ContentChildren,
                args: [NovoTemplate]
            }], defaultTemplates: [{
                type: ViewChildren,
                args: [NovoTemplate]
            }], cellHeaders: [{
                type: ViewChildren,
                args: [NovoDataTableCellHeader]
            }], novoDataTableContainer: [{
                type: ViewChild,
                args: ['novoDataTableContainer']
            }], resized: [{
                type: Output
            }], displayedColumns: [{
                type: Input
            }], paginationOptions: [{
                type: Input
            }], searchOptions: [{
                type: Input
            }], selectionOptions: [{
                type: Input
            }], defaultSort: [{
                type: Input
            }], name: [{
                type: Input
            }], allowMultipleFilters: [{
                type: Input
            }], rowIdentifier: [{
                type: Input
            }], activeRowIdentifier: [{
                type: Input
            }], trackByFn: [{
                type: Input
            }], templates: [{
                type: Input
            }], fixedHeader: [{
                type: Input
            }], paginatorDataFeatureId: [{
                type: Input
            }], maxSelected: [{
                type: Input
            }], canSelectAll: [{
                type: Input
            }], allMatchingSelected: [{
                type: Input
            }], overrideTotal: [{
                type: Input
            }], paginationRefreshSubject: [{
                type: Input
            }], dataTableService: [{
                type: Input
            }], rows: [{
                type: Input
            }], outsideFilter: [{
                type: Input
            }], refreshSubject: [{
                type: Input
            }], columns: [{
                type: Input
            }], customFilter: [{
                type: Input
            }], hasExandedRows: [{
                type: Input
            }], forceShowHeader: [{
                type: Input
            }], hideGlobalSearch: [{
                type: Input
            }], preferencesChanged: [{
                type: Output
            }], allSelected: [{
                type: Output
            }], empty: [{
                type: HostBinding,
                args: ['class.empty']
            }], loadingClass: [{
                type: HostBinding,
                args: ['class.loading']
            }], listInteractions: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRhLXRhYmxlL2RhdGEtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxJQUFJLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBRVQsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDMUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBV3pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7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QUMsZUFBZTtnQkFTbkIsZ0JBQWdCO3NCQUF4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUgYXMgYW5pbVN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycywgbm90aWZ5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlQ2VsbEhlYWRlciB9IGZyb20gJy4vY2VsbC1oZWFkZXJzL2RhdGEtdGFibGUtaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZVNvdXJjZSB9IGZyb20gJy4vZGF0YS10YWJsZS5zb3VyY2UnO1xuaW1wb3J0IHsgTk9WT19EQVRBX1RBQkxFX1JFRiB9IGZyb20gJy4vZGF0YS10YWJsZS50b2tlbic7XG5pbXBvcnQge1xuICBJRGF0YVRhYmxlQ2hhbmdlRXZlbnQsXG4gIElEYXRhVGFibGVDb2x1bW4sXG4gIElEYXRhVGFibGVQYWdpbmF0aW9uT3B0aW9ucyxcbiAgSURhdGFUYWJsZVByZWZlcmVuY2VzLFxuICBJRGF0YVRhYmxlU2VhcmNoT3B0aW9ucyxcbiAgSURhdGFUYWJsZVNlbGVjdGlvbk9wdGlvbixcbiAgSURhdGFUYWJsZVNlcnZpY2UsXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBMaXN0SW50ZXJhY3Rpb25EaWN0aW9uYXJ5LCBMaXN0SW50ZXJhY3Rpb25FdmVudCB9IGZyb20gJy4vTGlzdEludGVyYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgU3RhdGljRGF0YVRhYmxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RhdGljLWRhdGEtdGFibGUuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlJyxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2V4cGFuZCcsIFtcbiAgICAgIGFuaW1TdGF0ZSgndm9pZCcsIHN0eWxlKHsgaGVpZ2h0OiAnMHB4JywgbWluSGVpZ2h0OiAnMCcsIHZpc2liaWxpdHk6ICdoaWRkZW4nIH0pKSxcbiAgICAgIGFuaW1TdGF0ZSgnKicsIHN0eWxlKHsgaGVpZ2h0OiAnKicsIHZpc2liaWxpdHk6ICd2aXNpYmxlJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkIDw9PiAqJywgYW5pbWF0ZSgnNzBtcyBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSknKSksXG4gICAgXSksXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGhlYWRlclxuICAgICAgKm5nSWY9XCIoIShlbXB0eSAmJiAhc3RhdGUudXNlckZpbHRlcmVkKSAmJiAhbG9hZGluZykgfHwgZm9yY2VTaG93SGVhZGVyXCJcbiAgICAgIFtjbGFzcy5lbXB0eV09XCJoaWRlR2xvYmFsU2VhcmNoICYmICFwYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGVtcGxhdGVzWydjdXN0b21BY3Rpb25zJ11cIlxuICAgID5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZXNbJ2N1c3RvbUhlYWRlciddXCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8bm92by1zZWFyY2hcbiAgICAgICAgYWx3YXlzT3Blbj1cInRydWVcIlxuICAgICAgICAoc2VhcmNoQ2hhbmdlZCk9XCJvblNlYXJjaENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJzdGF0ZS5nbG9iYWxTZWFyY2hcIlxuICAgICAgICAqbmdJZj1cIiFoaWRlR2xvYmFsU2VhcmNoXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInNlYXJjaE9wdGlvbnM/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgW2hpbnRdPVwic2VhcmNoT3B0aW9ucz8udG9vbHRpcFwiXG4gICAgICA+XG4gICAgICA8L25vdm8tc2VhcmNoPlxuICAgICAgPG5vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uXG4gICAgICAgICpuZ0lmPVwicGFnaW5hdGlvbk9wdGlvbnNcIlxuICAgICAgICBbdGhlbWVdPVwicGFnaW5hdGlvbk9wdGlvbnMudGhlbWVcIlxuICAgICAgICBbbGVuZ3RoXT1cInVzZU92ZXJyaWRlVG90YWwgPyBvdmVycmlkZVRvdGFsIDogZGF0YVNvdXJjZT8uY3VycmVudFRvdGFsXCJcbiAgICAgICAgW3BhZ2VdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVwiXG4gICAgICAgIFtwYWdlU2l6ZV09XCJwYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZVwiXG4gICAgICAgIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVPcHRpb25zXCJcbiAgICAgICAgW2RhdGFGZWF0dXJlSWRdPVwicGFnaW5hdG9yRGF0YUZlYXR1cmVJZFwiXG4gICAgICAgIFtjYW5TZWxlY3RBbGxdPVwiY2FuU2VsZWN0QWxsXCJcbiAgICAgICAgW2FsbE1hdGNoaW5nU2VsZWN0ZWRdPVwiYWxsTWF0Y2hpbmdTZWxlY3RlZFwiXG4gICAgICAgIFtsb2FkaW5nXT1cInBhZ2luYXRpb25PcHRpb25zLmxvYWRpbmdcIlxuICAgICAgICBbZXJyb3JMb2FkaW5nXT1cInBhZ2luYXRpb25PcHRpb25zLmVycm9yTG9hZGluZ1wiXG4gICAgICAgIFtwYWdpbmF0aW9uUmVmcmVzaFN1YmplY3RdPVwicGFnaW5hdGlvblJlZnJlc2hTdWJqZWN0XCJcbiAgICAgID5cbiAgICAgIDwvbm92by1kYXRhLXRhYmxlLXBhZ2luYXRpb24+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1kYXRhLXRhYmxlLWFjdGlvbnNcIiAqbmdJZj1cInRlbXBsYXRlc1snY3VzdG9tQWN0aW9ucyddXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZXNbJ2N1c3RvbUFjdGlvbnMnXVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1sb2FkaW5nLW1hc2tcIiAqbmdJZj1cImRhdGFTb3VyY2U/LmxvYWRpbmcgfHwgbG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1sb2FkaW5nXCI+XG4gICAgICA8bm92by1sb2FkaW5nPjwvbm92by1sb2FkaW5nPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtb3V0c2lkZS1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7ICdub3ZvLWRhdGEtdGFibGUtb3V0c2lkZS1jb250YWluZXItZml4ZWQnOiBmaXhlZEhlYWRlciB9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1kYXRhLXRhYmxlLWN1c3RvbS1maWx0ZXJcIiAqbmdJZj1cImN1c3RvbUZpbHRlclwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVzWydjdXN0b21GaWx0ZXInXVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgICNub3ZvRGF0YVRhYmxlQ29udGFpbmVyXG4gICAgICAgIGNka1Njcm9sbGFibGVcbiAgICAgICAgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtY29udGFpbmVyXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnbm92by1kYXRhLXRhYmxlLWNvbnRhaW5lci1maXhlZCc6IGZpeGVkSGVhZGVyIH1cIlxuICAgICAgICBbY2xhc3MuZW1wdHktdXNlci1maWx0ZXJlZF09XCJkYXRhU291cmNlPy5jdXJyZW50bHlFbXB0eSAmJiBzdGF0ZS51c2VyRmlsdGVyZWRcIlxuICAgICAgICBbY2xhc3MuZW1wdHldPVwiZW1wdHkgJiYgIWRhdGFTb3VyY2U/LmxvYWRpbmcgJiYgIWxvYWRpbmcgJiYgIXN0YXRlLnVzZXJGaWx0ZXJlZCAmJiAhZGF0YVNvdXJjZS5wcmlzdGluZVwiXG4gICAgICA+XG4gICAgICAgIDxjZGstdGFibGVcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbnM/Lmxlbmd0aCA+IDAgJiYgY29sdW1uc0xvYWRlZCAmJiBkYXRhU291cmNlXCJcbiAgICAgICAgICBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCJcbiAgICAgICAgICBbdHJhY2tCeV09XCJ0cmFja0J5Rm5cIlxuICAgICAgICAgIG5vdm9EYXRhVGFibGVTb3J0RmlsdGVyXG4gICAgICAgICAgW2NsYXNzLmV4cGFuZGFibGVdPVwiZXhwYW5kYWJsZVwiXG4gICAgICAgICAgW2NsYXNzLmVtcHR5XT1cImRhdGFTb3VyY2U/LmN1cnJlbnRseUVtcHR5ICYmIHN0YXRlLnVzZXJGaWx0ZXJlZFwiXG4gICAgICAgICAgW2hpZGRlbl09XCJlbXB0eSAmJiAhc3RhdGUudXNlckZpbHRlcmVkXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgY2RrQ29sdW1uRGVmPVwic2VsZWN0aW9uXCI+XG4gICAgICAgICAgICA8bm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWhlYWRlci1jZWxsICpjZGtIZWFkZXJDZWxsRGVmIFttYXhTZWxlY3RlZF09XCJtYXhTZWxlY3RlZFwiPjwvbm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWhlYWRlci1jZWxsPlxuICAgICAgICAgICAgPG5vdm8tZGF0YS10YWJsZS1jaGVja2JveC1jZWxsXG4gICAgICAgICAgICAgICpjZGtDZWxsRGVmPVwibGV0IHJvdzsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgIFtyb3ddPVwicm93XCJcbiAgICAgICAgICAgICAgW21heFNlbGVjdGVkXT1cIm1heFNlbGVjdGVkXCJcbiAgICAgICAgICAgID48L25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1jZWxsPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgY2RrQ29sdW1uRGVmPVwiZXhwYW5kXCI+XG4gICAgICAgICAgICA8bm92by1kYXRhLXRhYmxlLWV4cGFuZC1oZWFkZXItY2VsbCAqY2RrSGVhZGVyQ2VsbERlZj48L25vdm8tZGF0YS10YWJsZS1leHBhbmQtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bm92by1kYXRhLXRhYmxlLWV4cGFuZC1jZWxsICpjZGtDZWxsRGVmPVwibGV0IHJvdzsgbGV0IGkgPSBpbmRleFwiIFtyb3ddPVwicm93XCI+PC9ub3ZvLWRhdGEtdGFibGUtZXhwYW5kLWNlbGw+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnM7IHRyYWNrQnk6IHRyYWNrQ29sdW1uc0J5XCIgW2Nka0NvbHVtbkRlZl09XCJjb2x1bW4uaWRcIj5cbiAgICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtaGVhZGVyLWNlbGxcbiAgICAgICAgICAgICAgKmNka0hlYWRlckNlbGxEZWZcbiAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICBbZmlsdGVyVGVtcGxhdGVdPVwidGVtcGxhdGVzWydjb2x1bW4tZmlsdGVyLScgKyAoY29sdW1uLmZpbHRlcmFibGU/LmN1c3RvbVRlbXBsYXRlIHx8IGNvbHVtbi5pZCldXCJcbiAgICAgICAgICAgICAgW25vdm8tZGF0YS10YWJsZS1jZWxsLWNvbmZpZ109XCJjb2x1bW5cIlxuICAgICAgICAgICAgICBbcmVzaXplZF09XCJyZXNpemVkXCJcbiAgICAgICAgICAgICAgW2RlZmF1bHRTb3J0XT1cImRlZmF1bHRTb3J0XCJcbiAgICAgICAgICAgICAgW2FsbG93TXVsdGlwbGVGaWx0ZXJzXT1cImFsbG93TXVsdGlwbGVGaWx0ZXJzXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmVtcHR5XT1cImNvbHVtbj8udHlwZSA9PT0gJ2FjdGlvbicgJiYgIWNvbHVtbj8ubGFiZWxcIlxuICAgICAgICAgICAgICBbY2xhc3MuYnV0dG9uLWhlYWRlci1jZWxsXT1cImNvbHVtbj8udHlwZSA9PT0gJ2V4cGFuZCcgfHwgKGNvbHVtbj8udHlwZSA9PT0gJ2FjdGlvbicgJiYgIWNvbHVtbj8uYWN0aW9uPy5vcHRpb25zKVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5kcm9wZG93bi1oZWFkZXItY2VsbF09XCJjb2x1bW4/LnR5cGUgPT09ICdhY3Rpb24nICYmIGNvbHVtbj8uYWN0aW9uPy5vcHRpb25zXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmZpeGVkLWhlYWRlcl09XCJmaXhlZEhlYWRlclwiXG4gICAgICAgICAgICA+PC9ub3ZvLWRhdGEtdGFibGUtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bm92by1kYXRhLXRhYmxlLWNlbGxcbiAgICAgICAgICAgICAgKmNka0NlbGxEZWY9XCJsZXQgcm93XCJcbiAgICAgICAgICAgICAgW3Jlc2l6ZWRdPVwicmVzaXplZFwiXG4gICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxuICAgICAgICAgICAgICBbdGVtcGxhdGVdPVwiY29sdW1uVG9UZW1wbGF0ZVtjb2x1bW4uaWRdXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmVtcHR5XT1cImNvbHVtbj8udHlwZSA9PT0gJ2FjdGlvbicgJiYgIWNvbHVtbj8ubGFiZWxcIlxuICAgICAgICAgICAgICBbY2xhc3MuYnV0dG9uLWNlbGxdPVwiY29sdW1uPy50eXBlID09PSAnZXhwYW5kJyB8fCAoY29sdW1uPy50eXBlID09PSAnYWN0aW9uJyAmJiAhY29sdW1uPy5hY3Rpb24/Lm9wdGlvbnMpXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmRyb3Bkb3duLWNlbGxdPVwiY29sdW1uPy50eXBlID09PSAnYWN0aW9uJyAmJiBjb2x1bW4/LmFjdGlvbj8ub3B0aW9uc1wiXG4gICAgICAgICAgICA+PC9ub3ZvLWRhdGEtdGFibGUtY2VsbD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bm92by1kYXRhLXRhYmxlLWhlYWRlci1yb3dcbiAgICAgICAgICAgICpjZGtIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCJcbiAgICAgICAgICAgIFtmaXhlZEhlYWRlcl09XCJmaXhlZEhlYWRlclwiXG4gICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtaGVhZGVyLXJvd1wiXG4gICAgICAgICAgPjwvbm92by1kYXRhLXRhYmxlLWhlYWRlci1yb3c+XG4gICAgICAgICAgPG5vdm8tZGF0YS10YWJsZS1yb3dcbiAgICAgICAgICAgICpjZGtSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBkaXNwbGF5ZWRDb2x1bW5zXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiByb3dbcm93SWRlbnRpZmllcl0gPT0gYWN0aXZlUm93SWRlbnRpZmllciB9XCJcbiAgICAgICAgICAgIFtub3ZvRGF0YVRhYmxlRXhwYW5kXT1cImRldGFpbFJvd1RlbXBsYXRlXCJcbiAgICAgICAgICAgIFtyb3ddPVwicm93XCJcbiAgICAgICAgICAgIFtpZF09XCJuYW1lICsgJy0nICsgcm93W3Jvd0lkZW50aWZpZXJdXCJcbiAgICAgICAgICAgIFtkYXRhQXV0b21hdGlvbklkXT1cInJvd1tyb3dJZGVudGlmaWVyXVwiXG4gICAgICAgICAgPjwvbm92by1kYXRhLXRhYmxlLXJvdz5cbiAgICAgICAgPC9jZGstdGFibGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtZm9vdGVyXCIgKm5nSWY9XCJ0ZW1wbGF0ZXNbJ2Zvb3RlciddXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snZm9vdGVyJ107IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBjb2x1bW5zLCBkYXRhOiBkYXRhU291cmNlLmRhdGEgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwibm92by1kYXRhLXRhYmxlLW5vLXJlc3VsdHMtY29udGFpbmVyXCJcbiAgICAgICAgICBbc3R5bGUubGVmdC5weF09XCJzY3JvbGxMZWZ0XCJcbiAgICAgICAgICAqbmdJZj1cImRhdGFTb3VyY2U/LmN1cnJlbnRseUVtcHR5ICYmIHN0YXRlLnVzZXJGaWx0ZXJlZCAmJiAhZGF0YVNvdXJjZT8ubG9hZGluZyAmJiAhbG9hZGluZyAmJiAhZGF0YVNvdXJjZS5wcmlzdGluZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1kYXRhLXRhYmxlLWVtcHR5LW1lc3NhZ2VcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZXNbJ25vUmVzdWx0c01lc3NhZ2UnXSB8fCB0ZW1wbGF0ZXNbJ2RlZmF1bHROb1Jlc3VsdHNNZXNzYWdlJ11cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1uby1tb3JlLXJlc3VsdHMtY29udGFpbmVyXCJcbiAgICAgICAgICBbc3R5bGUubGVmdC5weF09XCJzY3JvbGxMZWZ0XCJcbiAgICAgICAgICAqbmdJZj1cIiFlbXB0eSAmJiBkYXRhU291cmNlPy5jdXJyZW50bHlFbXB0eSAmJiAhc3RhdGUudXNlckZpbHRlcmVkICYmICFkYXRhU291cmNlPy5sb2FkaW5nICYmICFsb2FkaW5nICYmICFkYXRhU291cmNlLnByaXN0aW5lXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtZW1wdHktbWVzc2FnZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snbm9Nb3JlUmVzdWx0c01lc3NhZ2UnXSB8fCB0ZW1wbGF0ZXNbJ2RlZmF1bHROb01vcmVSZXN1bHRzTWVzc2FnZSddXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwibm92by1kYXRhLXRhYmxlLWVtcHR5LWNvbnRhaW5lclwiXG4gICAgICAgICpuZ0lmPVwiZW1wdHkgJiYgIWRhdGFTb3VyY2U/LmxvYWRpbmcgJiYgIWxvYWRpbmcgJiYgIXN0YXRlLnVzZXJGaWx0ZXJlZCAmJiAhZGF0YVNvdXJjZS5wcmlzdGluZVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtZW1wdHktbWVzc2FnZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZXNbJ2VtcHR5TWVzc2FnZSddIHx8IHRlbXBsYXRlc1snZGVmYXVsdE5vUmVzdWx0c01lc3NhZ2UnXVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gREVGQVVMVCBDRUxMIFRFTVBMQVRFIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJ0ZXh0Q2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8c3BhbiBbc3R5bGUud2lkdGgucHhdPVwiY29sPy53aWR0aFwiIFtzdHlsZS5taW4td2lkdGgucHhdPVwiY29sPy53aWR0aFwiIFtzdHlsZS5tYXgtd2lkdGgucHhdPVwiY29sPy53aWR0aFwiPnt7XG4gICAgICAgIHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbFxuICAgICAgfX08L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZGF0ZUNlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPHNwYW4+e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIHwgZGF0YVRhYmxlRGF0ZVJlbmRlcmVyOiBjb2wgfX08L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZGF0ZXRpbWVDZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxzcGFuPnt7IHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbCB8IGRhdGFUYWJsZURhdGVUaW1lUmVuZGVyZXI6IGNvbCB9fTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJ0aW1lQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8c3Bhbj57eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfCBkYXRhVGFibGVUaW1lUmVuZGVyZXI6IGNvbCB9fTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJjdXJyZW5jeUNlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPHNwYW4+e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIHwgZGF0YVRhYmxlQ3VycmVuY3lSZW5kZXJlcjogY29sIH19PC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImJpZ2RlY2ltYWxDZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxzcGFuPnt7IHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbCB8IGRhdGFUYWJsZUJpZ0RlY2ltYWxSZW5kZXJlcjogY29sIH19PC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cIm51bWJlckNlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPHNwYW4+e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIHwgZGF0YVRhYmxlTnVtYmVyUmVuZGVyZXI6IGNvbCB9fTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJwZXJjZW50Q2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8c3Bhbj57eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfCBkYXRhVGFibGVOdW1iZXJSZW5kZXJlcjogY29sOnRydWUgfX08L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwibGlua0NlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPGFcbiAgICAgICAgW2F0dHIuZGF0YS1mZWF0dXJlLWlkXT1cImNvbD8uYXR0cmlidXRlcz8uZGF0YUZlYXR1cmVJZFwiXG4gICAgICAgIChjbGljayk9XCJjb2wuaGFuZGxlcnM/LmNsaWNrKHsgb3JpZ2luYWxFdmVudDogJGV2ZW50LCByb3c6IHJvdyB9KVwiXG4gICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJjb2w/LndpZHRoXCJcbiAgICAgICAgW3N0eWxlLm1pbi13aWR0aC5weF09XCJjb2w/LndpZHRoXCJcbiAgICAgICAgW3N0eWxlLm1heC13aWR0aC5weF09XCJjb2w/LndpZHRoXCJcbiAgICAgICAgPnt7IHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbCB9fTwvYVxuICAgICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRlbENlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPGEgaHJlZj1cInRlbDp7eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfX1cIiBbdGFyZ2V0XT1cImNvbD8uYXR0cmlidXRlcz8udGFyZ2V0XCI+e3tcbiAgICAgICAgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sXG4gICAgICB9fTwvYT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJtYWlsdG9DZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxhIGhyZWY9XCJtYWlsdG86e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIH19XCIgW3RhcmdldF09XCJjb2w/LmF0dHJpYnV0ZXM/LnRhcmdldFwiPnt7XG4gICAgICAgIHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbFxuICAgICAgfX08L2E+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiYnV0dG9uQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8bm92by1idXR0b25cbiAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiY29sPy5hY3Rpb24/LnRvb2x0aXBcIlxuICAgICAgICB0b29sdGlwUG9zaXRpb249XCJyaWdodFwiXG4gICAgICAgIFthdHRyLmRhdGEtZmVhdHVyZS1pZF09XCJjb2w/LmF0dHJpYnV0ZXM/LmRhdGFGZWF0dXJlSWRcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZChjb2wsIHJvdylcIlxuICAgICAgICAoY2xpY2spPVwiY29sLmhhbmRsZXJzPy5jbGljayh7IG9yaWdpbmFsRXZlbnQ6ICRldmVudCwgcm93OiByb3cgfSlcIlxuICAgICAgPlxuICAgICAgICA8bm92by1pY29uPnt7IGNvbD8uYWN0aW9uPy5pY29uIH19PC9ub3ZvLWljb24+XG4gICAgICA8L25vdm8tYnV0dG9uPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImRyb3Bkb3duQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8bm92by1kcm9wZG93biBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi5ub3ZvLWRhdGEtdGFibGUtY29udGFpbmVyXCIgY29udGFpbmVyQ2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtZHJvcGRvd25cIj5cbiAgICAgICAgPG5vdm8tYnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cImRpYWxvZ3VlXCIgW2ljb25dPVwiY29sLmFjdGlvbi5pY29uXCIgaW52ZXJzZT57eyBjb2wubGFiZWwgfX08L25vdm8tYnV0dG9uPlxuICAgICAgICA8bm92by1vcHRncm91cD5cbiAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29sPy5hY3Rpb24/Lm9wdGlvbnNcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9wdGlvbi5oYW5kbGVycy5jbGljayh7IG9yaWdpbmFsRXZlbnQ6ICRldmVudD8ub3JpZ2luYWxFdmVudCwgcm93OiByb3cgfSlcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzRGlzYWJsZWQob3B0aW9uLCByb3cpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgIDwvbm92by1kcm9wZG93bj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJkZWZhdWx0Tm9SZXN1bHRzTWVzc2FnZVwiPlxuICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLXNlYXJjaC1xdWVzdGlvblwiPjwvaT4ge3sgbGFiZWxzLm5vTWF0Y2hpbmdSZWNvcmRzTWVzc2FnZSB9fTwvaDQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZGVmYXVsdE5vTW9yZVJlc3VsdHNNZXNzYWdlXCI+XG4gICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMubm9Nb3JlUmVjb3Jkc01lc3NhZ2UgfX08L2g0PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImRlZmF1bHRFbXB0eU1lc3NhZ2VcIj5cbiAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5lbXB0eVRhYmxlTWVzc2FnZSB9fTwvaDQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZXhwYW5kZWRSb3dcIj4gWW91IGRpZCBub3QgcHJvdmlkZSBhbiBcImV4cGFuZGVkUm93XCIgdGVtcGxhdGUhIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNkZXRhaWxSb3dUZW1wbGF0ZSBsZXQtcm93PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1kZXRhaWwtcm93XCIgW0BleHBhbmRdIHN0eWxlPVwib3ZlcmZsb3c6IGhpZGRlblwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVzWydleHBhbmRlZFJvdyddOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogcm93IH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLSBDVVNUT00gQ0VMTFMgUEFTU0VEIElOIC0tPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0YS10YWJsZS5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbRGF0YVRhYmxlU3RhdGUsIHsgcHJvdmlkZTogTk9WT19EQVRBX1RBQkxFX1JFRiwgdXNlRXhpc3Rpbmc6IE5vdm9EYXRhVGFibGUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGU8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmdsb2JhbC1zZWFyY2gtaGlkZGVuJykgZ2xvYmFsU2VhcmNoSGlkZGVuQ2xhc3NUb2dnbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkcmVuKE5vdm9UZW1wbGF0ZSkgY3VzdG9tVGVtcGxhdGVzOiBRdWVyeUxpc3Q8Tm92b1RlbXBsYXRlPjtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvVGVtcGxhdGUpIGRlZmF1bHRUZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxOb3ZvVGVtcGxhdGU+O1xuICBAVmlld0NoaWxkcmVuKE5vdm9EYXRhVGFibGVDZWxsSGVhZGVyKSBjZWxsSGVhZGVyczogUXVlcnlMaXN0PE5vdm9EYXRhVGFibGVDZWxsSGVhZGVyPFQ+PjtcbiAgQFZpZXdDaGlsZCgnbm92b0RhdGFUYWJsZUNvbnRhaW5lcicpIG5vdm9EYXRhVGFibGVDb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBPdXRwdXQoKSByZXNpemVkOiBFdmVudEVtaXR0ZXI8SURhdGFUYWJsZUNvbHVtbjxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc3BsYXllZENvbHVtbnMoZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5ZWRDb2x1bW5zICYmIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5sZW5ndGggIT09IDApIHtcbiAgICAgIGlmICh0aGlzLm5hbWUgIT09ICdub3ZvLWRhdGEtdGFibGUnKSB7XG4gICAgICAgIHRoaXMucHJlZmVyZW5jZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICBkaXNwbGF5ZWRDb2x1bW5zLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vdGlmeSgnTXVzdCBoYXZlIFtuYW1lXSBzZXQgb24gZGF0YS10YWJsZSB0byB1c2UgcHJlZmVyZW5jZXMhJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Rpc2FibGVkQ29sdW1ucyA9IGRpc3BsYXllZENvbHVtbnM7XG4gICAgdGhpcy5jb25maWd1cmVMYXN0RGlzcGxheWVkQ29sdW1uKCk7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNjcm9sbExpc3RlbmVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgZGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkQ29sdW1ucztcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZENvbHVtbnM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpIHBhZ2luYXRpb25PcHRpb25zOiBJRGF0YVRhYmxlUGFnaW5hdGlvbk9wdGlvbnM7XG4gIEBJbnB1dCgpIHNlYXJjaE9wdGlvbnM6IElEYXRhVGFibGVTZWFyY2hPcHRpb25zO1xuICBASW5wdXQoKSBzZWxlY3Rpb25PcHRpb25zOiBJRGF0YVRhYmxlU2VsZWN0aW9uT3B0aW9uW107XG4gIEBJbnB1dCgpIGRlZmF1bHRTb3J0OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfTtcbiAgQElucHV0KCkgbmFtZSA9ICdub3ZvLWRhdGEtdGFibGUnO1xuICBASW5wdXQoKSBhbGxvd011bHRpcGxlRmlsdGVycyA9IGZhbHNlO1xuICBASW5wdXQoKSByb3dJZGVudGlmaWVyID0gJ2lkJztcbiAgQElucHV0KCkgYWN0aXZlUm93SWRlbnRpZmllciA9ICcnO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQElucHV0KCkgdHJhY2tCeUZuID0gKGluZGV4LCBpdGVtKSA9PiBpdGVtLmlkO1xuICBASW5wdXQoKSB0ZW1wbGF0ZXM6IHsgW2tleTogc3RyaW5nXTogVGVtcGxhdGVSZWY8YW55PiB9ID0ge307XG4gIEBJbnB1dCgpIGZpeGVkSGVhZGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBhZ2luYXRvckRhdGFGZWF0dXJlSWQ6IHN0cmluZztcbiAgQElucHV0KCkgbWF4U2VsZWN0ZWQ6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgY2FuU2VsZWN0QWxsOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGFsbE1hdGNoaW5nU2VsZWN0ZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgb3ZlcnJpZGVUb3RhbDogbnVtYmVyO1xuICBASW5wdXQoKSBwYWdpbmF0aW9uUmVmcmVzaFN1YmplY3Q6IFN1YmplY3Q8dm9pZD47XG5cbiAgQElucHV0KClcbiAgc2V0IGRhdGFUYWJsZVNlcnZpY2Uoc2VydmljZTogSURhdGFUYWJsZVNlcnZpY2U8VD4pIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICBpZiAoIXNlcnZpY2UpIHtcbiAgICAgIHNlcnZpY2UgPSBuZXcgU3RhdGljRGF0YVRhYmxlU2VydmljZShbXSk7XG4gICAgfVxuICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBEYXRhVGFibGVTb3VyY2U8VD4oc2VydmljZSwgdGhpcy5zdGF0ZSwgdGhpcy5yZWYpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCByb3dzKHJvd3M6IFRbXSkge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgU3RhdGljRGF0YVRhYmxlU2VydmljZShyb3dzKTtcbiAgICB0aGlzLmRhdGFTb3VyY2UgPSBuZXcgRGF0YVRhYmxlU291cmNlPFQ+KHNlcnZpY2UsIHRoaXMuc3RhdGUsIHRoaXMucmVmKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgb3V0c2lkZUZpbHRlcihvdXRzaWRlRmlsdGVyOiBFdmVudEVtaXR0ZXI8YW55Pikge1xuICAgIC8vIFVuc3Vic2NyaWJlXG4gICAgaWYgKHRoaXMub3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmIChvdXRzaWRlRmlsdGVyKSB7XG4gICAgICAvLyBSZS1zdWJzY3JpYmVcbiAgICAgIHRoaXMub3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbiA9IG91dHNpZGVGaWx0ZXIuc3Vic2NyaWJlKChmaWx0ZXI6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLm91dHNpZGVGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgIHRoaXMuc3RhdGUudXBkYXRlcy5uZXh0KHsgZ2xvYmFsU2VhcmNoOiB0aGlzLnN0YXRlLmdsb2JhbFNlYXJjaCwgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlciwgc29ydDogdGhpcy5zdGF0ZS5zb3J0LCB3aGVyZTogdGhpcy5zdGF0ZS53aGVyZSB9KTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgcmVmcmVzaFN1YmplY3QocmVmcmVzaFN1YmplY3Q6IEV2ZW50RW1pdHRlcjx2b2lkPikge1xuICAgIC8vIFVuc3Vic2NyaWJlXG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmIChyZWZyZXNoU3ViamVjdCkge1xuICAgICAgLy8gUmUtc3Vic2NyaWJlXG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSByZWZyZXNoU3ViamVjdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLmlzRm9yY2VSZWZyZXNoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBnbG9iYWxTZWFyY2g6IHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoLCBmaWx0ZXI6IHRoaXMuc3RhdGUuZmlsdGVyLCBzb3J0OiB0aGlzLnN0YXRlLnNvcnQsIHdoZXJlOiB0aGlzLnN0YXRlLndoZXJlIH0pO1xuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBjb2x1bW5zKGNvbHVtbnM6IElEYXRhVGFibGVDb2x1bW48VD5bXSkge1xuICAgIHRoaXMuX2NvbHVtbnMgPSBjb2x1bW5zO1xuICAgIHRoaXMuY29uZmlndXJlQ29sdW1ucygpO1xuICAgIHRoaXMucGVyZm9ybUludGVyYWN0aW9ucygnaW5pdCcpO1xuICB9XG4gIGdldCBjb2x1bW5zKCk6IElEYXRhVGFibGVDb2x1bW48VD5bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgY3VzdG9tRmlsdGVyKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jdXN0b21GaWx0ZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gIH1cbiAgZ2V0IGN1c3RvbUZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tRmlsdGVyO1xuICB9XG4gIHByaXZhdGUgX2N1c3RvbUZpbHRlcjogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBzZXQgaGFzRXhhbmRlZFJvd3ModjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc0V4YW5kZWRSb3dzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBoYXNFeGFuZGVkUm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRXhhbmRlZFJvd3M7XG4gIH1cbiAgcHJpdmF0ZSBfaGFzRXhhbmRlZFJvd3M6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGZvcmNlU2hvd0hlYWRlcih2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZm9yY2VTaG93SGVhZGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBmb3JjZVNob3dIZWFkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcmNlU2hvd0hlYWRlcjtcbiAgfVxuICBwcml2YXRlIF9mb3JjZVNob3dIZWFkZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGhpZGVHbG9iYWxTZWFyY2godjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVHbG9iYWxTZWFyY2ggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gICAgdGhpcy5nbG9iYWxTZWFyY2hIaWRkZW5DbGFzc1RvZ2dsZSA9IHRoaXMuX2hpZGVHbG9iYWxTZWFyY2g7XG4gIH1cbiAgZ2V0IGhpZGVHbG9iYWxTZWFyY2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVHbG9iYWxTZWFyY2g7XG4gIH1cbiAgcHJpdmF0ZSBfaGlkZUdsb2JhbFNlYXJjaDogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHByZWZlcmVuY2VzQ2hhbmdlZDogRXZlbnRFbWl0dGVyPElEYXRhVGFibGVQcmVmZXJlbmNlcz4gPSBuZXcgRXZlbnRFbWl0dGVyPElEYXRhVGFibGVQcmVmZXJlbmNlcz4oKTtcbiAgQE91dHB1dCgpIGFsbFNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8eyBhbGxTZWxlY3RlZDogYm9vbGVhbjsgc2VsZWN0ZWRDb3VudDogbnVtYmVyIH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgYWxsU2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgc2VsZWN0ZWRDb3VudDogbnVtYmVyO1xuICB9PigpO1xuXG4gIHB1YmxpYyBkYXRhU291cmNlOiBEYXRhVGFibGVTb3VyY2U8VD47XG4gIHB1YmxpYyBsb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGNvbHVtblRvVGVtcGxhdGU6IHsgW2tleTogc3RyaW5nXTogVGVtcGxhdGVSZWY8YW55PiB9ID0ge307XG4gIHB1YmxpYyBjb2x1bW5zTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBzZWxlY3Rpb246IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuICBwdWJsaWMgc2Nyb2xsTGVmdDogbnVtYmVyID0gMDtcbiAgcHVibGljIGV4cGFuZGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIG91dHNpZGVGaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcmVzZXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBwYWdpbmF0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc29ydEZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGFsbE1hdGNoaW5nU2VsZWN0ZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfY29sdW1uczogSURhdGFUYWJsZUNvbHVtbjxUPltdO1xuICBwcml2YXRlIHNjcm9sbExpc3RlbmVySGFuZGxlcjogYW55O1xuICBwcml2YXRlIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5lbXB0eScpXG4gIGdldCBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy51c2VPdmVycmlkZVRvdGFsID8gdGhpcy5vdmVycmlkZVRvdGFsID09PSAwIDogdGhpcy5kYXRhU291cmNlPy50b3RhbGx5RW1wdHk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxvYWRpbmcnKVxuICBnZXQgbG9hZGluZ0NsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRpbmcgfHwgKHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLmRhdGFTb3VyY2UubG9hZGluZyk7XG4gIH1cblxuICBnZXQgdXNlT3ZlcnJpZGVUb3RhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIUhlbHBlcnMuaXNCbGFuayh0aGlzLm92ZXJyaWRlVG90YWwpXG4gIH1cblxuICBASW5wdXQoKSBsaXN0SW50ZXJhY3Rpb25zOiBMaXN0SW50ZXJhY3Rpb25EaWN0aW9uYXJ5O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIHN0YXRlOiBEYXRhVGFibGVTdGF0ZTxUPikge1xuICAgIHRoaXMuc2Nyb2xsTGlzdGVuZXJIYW5kbGVyID0gdGhpcy5zY3JvbGxMaXN0ZW5lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc29ydEZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMuc3RhdGUuc29ydEZpbHRlclNvdXJjZS5zdWJzY3JpYmUoXG4gICAgICAoZXZlbnQ6IElEYXRhVGFibGVDaGFuZ2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5uYW1lICE9PSAnbm92by1kYXRhLXRhYmxlJykge1xuICAgICAgICAgIHRoaXMucHJlZmVyZW5jZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgc29ydDogZXZlbnQuc29ydCxcbiAgICAgICAgICAgIGZpbHRlcjogZXZlbnQuZmlsdGVyLFxuICAgICAgICAgICAgZ2xvYmFsU2VhcmNoOiBldmVudC5nbG9iYWxTZWFyY2gsXG4gICAgICAgICAgICB3aGVyZTogZXZlbnQud2hlcmUsXG4gICAgICAgICAgICBzYXZlZFNlYXJjaE5hbWU6IGV2ZW50LnNhdmVkU2VhcmNoTmFtZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnBlcmZvcm1JbnRlcmFjdGlvbnMoJ2NoYW5nZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vdGlmeSgnTXVzdCBoYXZlIFtuYW1lXSBzZXQgb24gZGF0YS10YWJsZSB0byB1c2UgcHJlZmVyZW5jZXMhJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgICB0aGlzLnBhZ2luYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLnBhZ2luYXRpb25Tb3VyY2Uuc3Vic2NyaWJlKChldmVudDogeyBpc1BhZ2VTaXplQ2hhbmdlOiBib29sZWFuOyBwYWdlU2l6ZTogbnVtYmVyIH0pID0+IHtcbiAgICAgIGlmICh0aGlzLm5hbWUgIT09ICdub3ZvLWRhdGEtdGFibGUnKSB7XG4gICAgICAgIGlmIChldmVudC5pc1BhZ2VTaXplQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5wcmVmZXJlbmNlc0NoYW5nZWQuZW1pdCh7IG5hbWU6IHRoaXMubmFtZSwgcGFnZVNpemU6IGV2ZW50LnBhZ2VTaXplIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3RpZnkoJ011c3QgaGF2ZSBbbmFtZV0gc2V0IG9uIGRhdGEtdGFibGUgdG8gdXNlIHByZWZlcmVuY2VzIScpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLnJlc2V0U291cmNlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSwgMzAwKTtcbiAgICB9KTtcbiAgICB0aGlzLmFsbE1hdGNoaW5nU2VsZWN0ZWRTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLmFsbE1hdGNoaW5nU2VsZWN0ZWRTb3VyY2Uuc3Vic2NyaWJlKChldmVudDogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy5hbGxNYXRjaGluZ1NlbGVjdGVkID0gZXZlbnQ7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbW9kaWZ5Q2VsbEhlYWRlck11bHRpU2VsZWN0RmlsdGVyT3B0aW9ucyhjb2x1bW46IHN0cmluZywgbmV3T3B0aW9uczogeyB2YWx1ZTogYW55OyBsYWJlbDogc3RyaW5nIH1bXSk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuY2VsbEhlYWRlcnMuZmluZCgoY2VsbEhlYWRlcikgPT4gY2VsbEhlYWRlci5pZCA9PT0gY29sdW1uKTtcbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBpZiAoaGVhZGVyLmNvbmZpZyAmJiBoZWFkZXIuY29uZmlnLmZpbHRlckNvbmZpZyAmJiBoZWFkZXIuY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlck9wdGlvbnM6IGFueVtdID0gaGVhZGVyLmNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9ucztcbiAgICAgICAgY29uc3Qgb3B0aW9uc1RvS2VlcCA9IGZpbHRlck9wdGlvbnMuZmlsdGVyKFxuICAgICAgICAgIChvcHQpID0+XG4gICAgICAgICAgICBoZWFkZXIuaXNTZWxlY3RlZChvcHQsIGhlYWRlci5tdWx0aVNlbGVjdGVkT3B0aW9ucykgJiZcbiAgICAgICAgICAgICFuZXdPcHRpb25zLmZpbmQoKG5ld09wdCkgPT4gb3B0LnZhbHVlICYmIG5ld09wdC52YWx1ZSAmJiBuZXdPcHQudmFsdWUgPT09IG9wdC52YWx1ZSksXG4gICAgICAgICk7XG4gICAgICAgIGhlYWRlci5jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnMgPSBbLi4ub3B0aW9uc1RvS2VlcCwgLi4ubmV3T3B0aW9uc107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWFkZXIuY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zID0gbmV3T3B0aW9ucztcbiAgICAgIH1cbiAgICAgIGhlYWRlci5zZXR1cEZpbHRlck9wdGlvbnMoKTtcbiAgICAgIGhlYWRlci5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc29ydEZpbHRlclN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmFsbE1hdGNoaW5nU2VsZWN0ZWRTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMubm92b0RhdGFUYWJsZUNvbnRhaW5lcikge1xuICAgICAgKHRoaXMubm92b0RhdGFUYWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsTGlzdGVuZXJIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc3BsYXllZENvbHVtbnMgJiYgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5leHBhbmRhYmxlID0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmluY2x1ZGVzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHRlbXBsYXRlcyBkZWZpbmVkIGhlcmVcbiAgICB0aGlzLmRlZmF1bHRUZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgLy8gT25seSBvdmVycmlkZSBpZiBpdCBkb2Vzbid0IGFscmVhZHkgZXhpc3RcbiAgICAgIGlmICghdGhpcy50ZW1wbGF0ZXNbaXRlbS5nZXRUeXBlKCldKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzW2l0ZW0uZ2V0VHlwZSgpXSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ3VzdG9tIHRlbXBsYXRlcyBwYXNzZWQgaW5cbiAgICB0aGlzLmN1c3RvbVRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAvLyBPdmVycmlkZSBhbnl0aGluZyB0aGF0IGlzIGN1c3RvbSBhbmQgaW4gSFRNTFxuICAgICAgdGhpcy50ZW1wbGF0ZXNbaXRlbS5nZXRUeXBlKCldID0gaXRlbS50ZW1wbGF0ZTtcbiAgICB9KTtcbiAgICAvLyBMb2FkIGNvbHVtbnNcbiAgICB0aGlzLmNvbmZpZ3VyZUNvbHVtbnMoKTtcblxuICAgIC8vIFN0YXRlXG4gICAgaWYgKHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgJiYgIXRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZSkge1xuICAgICAgdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlID0gMDtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgJiYgIXRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemUpIHtcbiAgICAgIHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemUgPSA1MDtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgJiYgIXRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVPcHRpb25zKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplT3B0aW9ucyA9IFsxMCwgMjUsIDUwLCAxMDBdO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlLnBhZ2UgPSB0aGlzLnBhZ2luYXRpb25PcHRpb25zID8gdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUucGFnZVNpemUgPSB0aGlzLnBhZ2luYXRpb25PcHRpb25zID8gdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZSA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbk9wdGlvbnMgPSB0aGlzLnNlbGVjdGlvbk9wdGlvbnMgPz8gdW5kZWZpbmVkO1xuXG4gICAgLy8gU2Nyb2xsaW5nIGluc2lkZSB0YWJsZVxuICAgICh0aGlzLm5vdm9EYXRhVGFibGVDb250YWluZXIubmF0aXZlRWxlbWVudCBhcyBFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbExpc3RlbmVySGFuZGxlcik7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgb25TZWFyY2hDaGFuZ2UodGVybTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5nbG9iYWxTZWFyY2ggPSB0ZXJtO1xuICAgIHRoaXMuc3RhdGUucmVzZXQoZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuc3RhdGUudXBkYXRlcy5uZXh0KHsgZ2xvYmFsU2VhcmNoOiB0ZXJtLCBmaWx0ZXI6IHRoaXMuc3RhdGUuZmlsdGVyLCBzb3J0OiB0aGlzLnN0YXRlLnNvcnQsIHdoZXJlOiB0aGlzLnN0YXRlLndoZXJlIH0pO1xuICB9XG5cbiAgcHVibGljIHRyYWNrQ29sdW1uc0J5KGluZGV4OiBudW1iZXIsIGl0ZW06IElEYXRhVGFibGVDb2x1bW48VD4pIHtcbiAgICByZXR1cm4gaXRlbS5pZDtcbiAgfVxuXG4gIHB1YmxpYyBpc0Rpc2FibGVkKGNoZWNrOiBhbnksIHJvdzogVCk6IGJvb2xlYW4ge1xuICAgIGlmIChjaGVjay5kaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjaGVjay5kaXNhYmxlZEZ1bmMpIHtcbiAgICAgIHJldHVybiBjaGVjay5kaXNhYmxlZEZ1bmMocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGlzRXhwYW5kZWQocm93OiBUKTogYm9vbGVhbiB7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZXhwYW5kZWRSb3dzLmhhcyhgJHtyb3dbdGhpcy5yb3dJZGVudGlmaWVyXX1gKTtcbiAgfVxuXG4gIHB1YmxpYyBleHBhbmRSb3cocm93OiBUKTogdm9pZCB7XG4gICAgY29uc3QgZXhwYW5kZWQgPSB0aGlzLmlzRXhwYW5kZWQocm93KTtcblxuICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgdGhpcy5zdGF0ZS5leHBhbmRlZFJvd3MuZGVsZXRlKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmV4cGFuZGVkUm93cy5hZGQoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUub25FeHBhbmRDaGFuZ2UoKHJvdyBhcyB1bmtub3duIGFzIHsgaWQ6IG51bWJlciB9KS5pZCk7XG4gIH1cblxuICBwdWJsaWMgZXhwYW5kUm93cyhleHBhbmQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAodGhpcy5kYXRhU291cmNlLmRhdGEgfHwgW10pLmZvckVhY2goKHJvdzogVCkgPT4ge1xuICAgICAgaWYgKCFleHBhbmQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRlZFJvd3MuZGVsZXRlKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRlZFJvd3MuYWRkKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc3RhdGUub25FeHBhbmRDaGFuZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBhbGxDdXJyZW50Um93c0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKHRoaXMuZGF0YVNvdXJjZS5kYXRhIHx8IFtdKS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLmlzRXhwYW5kZWQoKHRoaXMuZGF0YVNvdXJjZS5kYXRhIHx8IFtdKVtpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkKHJvdzogVCk6IGJvb2xlYW4ge1xuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLnNlbGVjdGVkUm93cy5oYXMoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0Um93KHJvdzogVCwgb3JpZ2luPzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQocm93KTtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRSb3dzLmRlbGV0ZShgJHtyb3dbdGhpcy5yb3dJZGVudGlmaWVyXX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY2FuU2VsZWN0QWxsICYmIHRoaXMuYWxsTWF0Y2hpbmdTZWxlY3RlZCAmJiBbJ29uQ2xpY2snXS5pbmNsdWRlcyhvcmlnaW4pKSB7XG4gICAgICAgIC8vIFdoZW4gYWxsIG1hdGNoaW5nIHJlY29yZHMgYXJlIHNlbGVjdGVkIHRoZSB1c2VyIGNvdWxkIGJlIG9uIGFub3RoZXIgcGFnZSB3aGVyZSBhbGwgcm93cyBvbmx5IGFwcGVhciBzZWxlY3RlZFxuICAgICAgICAvLyBOZWVkIHRvIHJlc2V0IHRoZSByb3dzIHRoYXQgYXJlIGFjdHVhbGx5IHNlbGVjdGVkLCBzZWxlY3Qgcm93cyBvbiB0aGUgY3VycmVudCBwYWdlIGFuZCBkZXNlbGVjdCB0aGUgY2hvc2VuIHJlY29yZFxuICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkUm93cy5jbGVhcigpO1xuICAgICAgICB0aGlzLnNlbGVjdFJvd3ModHJ1ZSk7XG4gICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRSb3dzLmRlbGV0ZShgJHtyb3dbdGhpcy5yb3dJZGVudGlmaWVyXX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRSb3dzLnNldChgJHtyb3dbdGhpcy5yb3dJZGVudGlmaWVyXX1gLCByb3cpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnN0YXRlLmFsbE1hdGNoaW5nU2VsZWN0ZWRTb3VyY2UubmV4dChmYWxzZSk7XG4gICAgdGhpcy5zdGF0ZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdFJvd3Moc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAodGhpcy5kYXRhU291cmNlLmRhdGEgfHwgW10pLmZvckVhY2goKHJvdzogVCkgPT4ge1xuICAgICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkUm93cy5kZWxldGUoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkUm93cy5zZXQoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCwgcm93KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gIH1cblxuICBwdWJsaWMgYWxsQ3VycmVudFJvd3NTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5hbGxNYXRjaGluZ1NlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmRhdGFTb3VyY2U/LmRhdGE/Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8ICh0aGlzLmRhdGFTb3VyY2UuZGF0YSB8fCBbXSkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKCh0aGlzLmRhdGFTb3VyY2UuZGF0YSB8fCBbXSlbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGNvbmZpZ3VyZUxhc3REaXNwbGF5ZWRDb2x1bW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sdW1ucyAmJiB0aGlzLmRpc3BsYXllZENvbHVtbnMgJiYgMCAhPT0gdGhpcy5jb2x1bW5zLmxlbmd0aCAmJiAwICE9PSB0aGlzLmRpc3BsYXllZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uaW5pdGlhbFJlc2l6YWJsZSkge1xuICAgICAgICAgIGNvbHVtbi5yZXNpemFibGUgPSBjb2x1bW4uaW5pdGlhbFJlc2l6YWJsZS5yZXNpemFibGU7XG4gICAgICAgICAgY29sdW1uLndpZHRoID0gY29sdW1uLmluaXRpYWxSZXNpemFibGUud2lkdGg7XG4gICAgICAgICAgY29sdW1uLmluaXRpYWxSZXNpemFibGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVzaXphYmxlQ29sdW1uczogc3RyaW5nW10gPSB0aGlzLmRpc3BsYXllZENvbHVtbnMuZmlsdGVyKChuYW1lOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB0aGlzLmNvbHVtbnMuZmluZEluZGV4KChjb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4pOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW4ucmVzaXphYmxlICYmIGNvbHVtbi5pZCA9PT0gbmFtZTtcbiAgICAgICAgICB9KSAhPT0gLTFcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc2l6YWJsZUNvbHVtbnMgJiYgcmVzaXphYmxlQ29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGxhc3RSZXNpemFibGVDb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4gPSB0aGlzLmNvbHVtbnMuZmluZCgoY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbHVtbi5pZCA9PT0gcmVzaXphYmxlQ29sdW1uc1tyZXNpemFibGVDb2x1bW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICB9KTtcbiAgICAgICAgbGFzdFJlc2l6YWJsZUNvbHVtbi5pbml0aWFsUmVzaXphYmxlID0ge1xuICAgICAgICAgIHJlc2l6YWJsZTogbGFzdFJlc2l6YWJsZUNvbHVtbi5yZXNpemFibGUsXG4gICAgICAgICAgd2lkdGg6IGxhc3RSZXNpemFibGVDb2x1bW4ud2lkdGgsXG4gICAgICAgIH07XG4gICAgICAgIGxhc3RSZXNpemFibGVDb2x1bW4ud2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGxhc3RSZXNpemFibGVDb2x1bW4ucmVzaXphYmxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVDb2x1bW5zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbnMgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCAhPT0gMCAmJiBPYmplY3Qua2V5cyh0aGlzLnRlbXBsYXRlcykubGVuZ3RoICE9PSAwKSB7XG4gICAgICAvLyBGaWd1cmUgdGhlIGNvbHVtbiB0ZW1wbGF0ZXNcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4pID0+IHtcbiAgICAgICAgLy8gRmlndXJlIHRoZSB0ZW1wbGF0ZVxuICAgICAgICBsZXQgdGVtcGxhdGVOYW1lOiBzdHJpbmc7XG4gICAgICAgIGlmIChjb2x1bW4udGVtcGxhdGUpIHtcbiAgICAgICAgICAvLyBQYXNzIGl0IGluIGFzIHRlbXBsYXRlXG4gICAgICAgICAgdGVtcGxhdGVOYW1lID0gY29sdW1uLnRlbXBsYXRlO1xuICAgICAgICB9IGVsc2UgaWYgKCEhdGhpcy50ZW1wbGF0ZXNbY29sdW1uLmlkXSkge1xuICAgICAgICAgIC8vIEN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGNvbHVtbiBpZFxuICAgICAgICAgIHRlbXBsYXRlTmFtZSA9IGNvbHVtbi5pZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBEZWZhdWx0IHRvIHRoZSBkZWZhdWxDZWxsVGVtcGxhdGVcbiAgICAgICAgICBpZiAoY29sdW1uLnR5cGUgPT09ICdhY3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uLmFjdGlvbiAmJiBjb2x1bW4uYWN0aW9uLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uYWN0aW9uLmljb24pIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uYWN0aW9uLmljb24gPSAnY29sbGFwc2UnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRlbXBsYXRlTmFtZSA9ICdkcm9wZG93bkNlbGxUZW1wbGF0ZSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZU5hbWUgPSAnYnV0dG9uQ2VsbFRlbXBsYXRlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbHVtbi50eXBlID09PSAnbGluazp0ZWwnIHx8IGNvbHVtbi50eXBlID09PSAnbGluazptYWlsdG8nKSB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlTmFtZSA9IGAke2NvbHVtbi50eXBlLnNwbGl0KCc6JylbMV19Q2VsbFRlbXBsYXRlYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlTmFtZSA9IGAke2NvbHVtbi50eXBlfUNlbGxUZW1wbGF0ZWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29sdW1uVG9UZW1wbGF0ZVtjb2x1bW4uaWRdID0gdGhpcy50ZW1wbGF0ZXNbdGVtcGxhdGVOYW1lXTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jb25maWd1cmVMYXN0RGlzcGxheWVkQ29sdW1uKCk7XG4gICAgICB0aGlzLmNvbHVtbnNMb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0OiBFbGVtZW50ID0gdGhpcy5ub3ZvRGF0YVRhYmxlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgYXMgRWxlbWVudDtcbiAgICBjb25zdCBsZWZ0OiBudW1iZXIgPSB0YXJnZXQuc2Nyb2xsTGVmdDtcbiAgICBpZiAobGVmdCAhPT0gdGhpcy5zY3JvbGxMZWZ0KSB7XG4gICAgICB0aGlzLnNjcm9sbExlZnQgPSB0YXJnZXQuc2Nyb2xsTGVmdDtcbiAgICB9XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwZXJmb3JtSW50ZXJhY3Rpb25zKGV2ZW50OiBMaXN0SW50ZXJhY3Rpb25FdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIHRoaXMuY29sdW1ucykge1xuICAgICAgICBjb25zdCBhbGxMaXN0Q29sdW1uSW50ZXJhY3Rpb25zID0gdGhpcy5saXN0SW50ZXJhY3Rpb25zW2NvbHVtbi5pZF07XG4gICAgICAgIGNvbnN0IGxpc3RDb2x1bW5JbnRlcmFjdGlvbiA9IGFsbExpc3RDb2x1bW5JbnRlcmFjdGlvbnMgJiYgYWxsTGlzdENvbHVtbkludGVyYWN0aW9ucy5maW5kKChpbnQpID0+IGludC5ldmVudC5pbmNsdWRlcyhldmVudCkpO1xuICAgICAgICBpZiAobGlzdENvbHVtbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgbGlzdENvbHVtbkludGVyYWN0aW9uLnNjcmlwdCh0aGlzLCBjb2x1bW4uaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=