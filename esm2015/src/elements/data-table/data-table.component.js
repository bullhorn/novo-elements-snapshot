import { animate, state as animState, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { notify } from '../../utils/notifier/notifier.util';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { DataTableSource } from './data-table.source';
import { StaticDataTableService } from './services/static-data-table.service';
import { DataTableState } from './state/data-table-state.service';
export class NovoDataTable {
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
                this.preferencesChanged.emit({ name: this.name, sort: event.sort, filter: event.filter, globalSearch: event.globalSearch });
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
                this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort });
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
            this.refreshSubscription = refreshSubject.subscribe((filter) => {
                this.state.isForceRefresh = true;
                this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort });
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
        return this.dataSource && this.dataSource.totallyEmpty;
    }
    get loadingClass() {
        return this.loading || (this.dataSource && this.dataSource.loading);
    }
    modifyCellHeaderMultiSelectFilterOptions(column, newOptions) {
        const header = this.cellHeaders.find((cellHeader) => cellHeader.id === column);
        if (header && header.config && header.config.filterConfig && header.config.filterConfig.options) {
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
    ngOnDestroy() {
        if (this.outsideFilterSubscription) {
            this.outsideFilterSubscription.unsubscribe();
        }
        if (this.novoDataTableContainer) {
            this.novoDataTableContainer.nativeElement.removeEventListener('scroll', this.scrollListenerHandler);
        }
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
        if (this.sortFilterSubscription) {
            this.sortFilterSubscription.unsubscribe();
        }
        if (this.allMatchingSelectedSubscription) {
            this.allMatchingSelectedSubscription.unsubscribe();
        }
    }
    ngAfterContentInit() {
        var _a;
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
        this.state.selectionOptions = (_a = this.selectionOptions) !== null && _a !== void 0 ? _a : undefined;
        // Scrolling inside table
        this.novoDataTableContainer.nativeElement.addEventListener('scroll', this.scrollListenerHandler);
        this.initialized = true;
        this.ref.markForCheck();
    }
    onSearchChange(term) {
        this.state.globalSearch = term;
        this.state.reset(false, true);
        this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort });
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
        var _a, _b;
        if (this.allMatchingSelected) {
            return true;
        }
        if (!((_b = (_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
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
}
NovoDataTable.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table',
                animations: [
                    trigger('expand', [
                        animState('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
                        animState('*', style({ height: '*', visibility: 'visible' })),
                        transition('void <=> *', animate('70ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                    ]),
                ],
                template: `
    <header
      *ngIf="(!(dataSource?.totallyEmpty && !state.userFiltered) && !loading) || forceShowHeader"
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
        [length]="dataSource?.currentTotal"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
        [dataFeatureId]="paginatorDataFeatureId"
        [canSelectAll]="canSelectAll"
        [allMatchingSelected]="allMatchingSelected"
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
        class="novo-data-table-container"
        [ngClass]="{ 'novo-data-table-container-fixed': fixedHeader }"
        [class.empty-user-filtered]="dataSource?.currentlyEmpty && state.userFiltered"
        [class.empty]="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
      >
        <cdk-table
          *ngIf="columns?.length > 0 && columnsLoaded && dataSource"
          [dataSource]="dataSource"
          [trackBy]="trackByFn"
          novoDataTableSortFilter
          [class.expandable]="expandable"
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="dataSource?.totallyEmpty && !state.userFiltered"
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
              [filterTemplate]="templates['column-filter-' + column.id]"
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
      </div>
      <div
        class="novo-data-table-empty-container"
        *ngIf="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
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
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [DataTableState]
            },] }
];
NovoDataTable.ctorParameters = () => [
    { type: NovoLabelService },
    { type: ChangeDetectorRef },
    { type: DataTableState }
];
NovoDataTable.propDecorators = {
    globalSearchHiddenClassToggle: [{ type: HostBinding, args: ['class.global-search-hidden',] }],
    customTemplates: [{ type: ContentChildren, args: [NovoTemplate,] }],
    defaultTemplates: [{ type: ViewChildren, args: [NovoTemplate,] }],
    cellHeaders: [{ type: ViewChildren, args: [NovoDataTableCellHeader,] }],
    novoDataTableContainer: [{ type: ViewChild, args: ['novoDataTableContainer',] }],
    resized: [{ type: Output }],
    displayedColumns: [{ type: Input }],
    paginationOptions: [{ type: Input }],
    searchOptions: [{ type: Input }],
    selectionOptions: [{ type: Input }],
    defaultSort: [{ type: Input }],
    name: [{ type: Input }],
    allowMultipleFilters: [{ type: Input }],
    rowIdentifier: [{ type: Input }],
    activeRowIdentifier: [{ type: Input }],
    trackByFn: [{ type: Input }],
    templates: [{ type: Input }],
    fixedHeader: [{ type: Input }],
    paginatorDataFeatureId: [{ type: Input }],
    maxSelected: [{ type: Input }],
    canSelectAll: [{ type: Input }],
    allMatchingSelected: [{ type: Input }],
    dataTableService: [{ type: Input }],
    rows: [{ type: Input }],
    outsideFilter: [{ type: Input }],
    refreshSubject: [{ type: Input }],
    columns: [{ type: Input }],
    customFilter: [{ type: Input }],
    hasExandedRows: [{ type: Input }],
    forceShowHeader: [{ type: Input }],
    hideGlobalSearch: [{ type: Input }],
    preferencesChanged: [{ type: Output }],
    allSelected: [{ type: Output }],
    empty: [{ type: HostBinding, args: ['class.empty',] }],
    loadingClass: [{ type: HostBinding, args: ['class.loading',] }],
    listInteractions: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssSUFBSSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUVULFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMvRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMxRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFZdEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBc09sRSxNQUFNLE9BQU8sYUFBYTtJQXlMeEIsWUFBbUIsTUFBd0IsRUFBVSxHQUFzQixFQUFTLEtBQXdCO1FBQXpGLFdBQU0sR0FBTixNQUFN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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVOVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzVCOzs7WUF0UFEsZ0JBQWdCO1lBZnZCLGlCQUFpQjtZQWdDVixjQUFjOzs7NENBdU9wQixXQUFXLFNBQUMsNEJBQTRCOzhCQUV4QyxlQUFlLFNBQUMsWUFBWTsrQkFDNUIsWUFBWSxTQUFDLFlBQVk7MEJBQ3pCLFlBQVksU0FBQyx1QkFBdUI7cUNBQ3BDLFNBQVMsU0FBQyx3QkFBd0I7c0JBQ2xDLE1BQU07K0JBRU4sS0FBSztnQ0EwQkwsS0FBSzs0QkFDTCxLQUFLOytCQUNMLEtBQUs7MEJBQ0wsS0FBSzttQkFDTCxLQUFLO21DQUNMLEtBQUs7NEJBQ0wsS0FBSztrQ0FDTCxLQUFLO3dCQUVMLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxLQUFLO3FDQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLO2tDQUNMLEtBQUs7K0JBRUwsS0FBSzttQkFVTCxLQUFLOzRCQVFMLEtBQUs7NkJBZ0JMLEtBQUs7c0JBZ0JMLEtBQUs7MkJBVUwsS0FBSzs2QkFTTCxLQUFLOzhCQVNMLEtBQUs7K0JBU0wsS0FBSztpQ0FVTCxNQUFNOzBCQUNOLE1BQU07b0JBdUJOLFdBQVcsU0FBQyxhQUFhOzJCQUt6QixXQUFXLFNBQUMsZUFBZTsrQkFLM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlIGFzIGFuaW1TdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBub3RpZnkgfSBmcm9tICcuLi8uLi91dGlscy9ub3RpZmllci9ub3RpZmllci51dGlsJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZSB9IGZyb20gJy4uL2NvbW1vbi9ub3ZvLXRlbXBsYXRlL25vdm8tdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVDZWxsSGVhZGVyIH0gZnJvbSAnLi9jZWxsLWhlYWRlcnMvZGF0YS10YWJsZS1oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlU291cmNlIH0gZnJvbSAnLi9kYXRhLXRhYmxlLnNvdXJjZSc7XG5pbXBvcnQge1xuICBJRGF0YVRhYmxlQ29sdW1uLFxuICBJRGF0YVRhYmxlRmlsdGVyLFxuICBJRGF0YVRhYmxlUGFnaW5hdGlvbk9wdGlvbnMsXG4gIElEYXRhVGFibGVQcmVmZXJlbmNlcyxcbiAgSURhdGFUYWJsZVNlYXJjaE9wdGlvbnMsXG4gIElEYXRhVGFibGVTZWxlY3Rpb25PcHRpb24sXG4gIElEYXRhVGFibGVTZXJ2aWNlLFxuICBJRGF0YVRhYmxlU29ydCxcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IExpc3RJbnRlcmFjdGlvbkRpY3Rpb25hcnksIExpc3RJbnRlcmFjdGlvbkV2ZW50IH0gZnJvbSAnLi9MaXN0SW50ZXJhY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBTdGF0aWNEYXRhVGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdGF0aWMtZGF0YS10YWJsZS5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUnLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZXhwYW5kJywgW1xuICAgICAgYW5pbVN0YXRlKCd2b2lkJywgc3R5bGUoeyBoZWlnaHQ6ICcwcHgnLCBtaW5IZWlnaHQ6ICcwJywgdmlzaWJpbGl0eTogJ2hpZGRlbicgfSkpLFxuICAgICAgYW5pbVN0YXRlKCcqJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgdmlzaWJpbGl0eTogJ3Zpc2libGUnIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPD0+IConLCBhbmltYXRlKCc3MG1zIGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKScpKSxcbiAgICBdKSxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aGVhZGVyXG4gICAgICAqbmdJZj1cIighKGRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhc3RhdGUudXNlckZpbHRlcmVkKSAmJiAhbG9hZGluZykgfHwgZm9yY2VTaG93SGVhZGVyXCJcbiAgICAgIFtjbGFzcy5lbXB0eV09XCJoaWRlR2xvYmFsU2VhcmNoICYmICFwYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGVtcGxhdGVzWydjdXN0b21BY3Rpb25zJ11cIlxuICAgID5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZXNbJ2N1c3RvbUhlYWRlciddXCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8bm92by1zZWFyY2hcbiAgICAgICAgYWx3YXlzT3Blbj1cInRydWVcIlxuICAgICAgICAoc2VhcmNoQ2hhbmdlZCk9XCJvblNlYXJjaENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJzdGF0ZS5nbG9iYWxTZWFyY2hcIlxuICAgICAgICAqbmdJZj1cIiFoaWRlR2xvYmFsU2VhcmNoXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInNlYXJjaE9wdGlvbnM/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgW2hpbnRdPVwic2VhcmNoT3B0aW9ucz8udG9vbHRpcFwiXG4gICAgICA+XG4gICAgICA8L25vdm8tc2VhcmNoPlxuICAgICAgPG5vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uXG4gICAgICAgICpuZ0lmPVwicGFnaW5hdGlvbk9wdGlvbnNcIlxuICAgICAgICBbdGhlbWVdPVwicGFnaW5hdGlvbk9wdGlvbnMudGhlbWVcIlxuICAgICAgICBbbGVuZ3RoXT1cImRhdGFTb3VyY2U/LmN1cnJlbnRUb3RhbFwiXG4gICAgICAgIFtwYWdlXT1cInBhZ2luYXRpb25PcHRpb25zLnBhZ2VcIlxuICAgICAgICBbcGFnZVNpemVdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVcIlxuICAgICAgICBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAgIFtkYXRhRmVhdHVyZUlkXT1cInBhZ2luYXRvckRhdGFGZWF0dXJlSWRcIlxuICAgICAgICBbY2FuU2VsZWN0QWxsXT1cImNhblNlbGVjdEFsbFwiXG4gICAgICAgIFthbGxNYXRjaGluZ1NlbGVjdGVkXT1cImFsbE1hdGNoaW5nU2VsZWN0ZWRcIlxuICAgICAgPlxuICAgICAgPC9ub3ZvLWRhdGEtdGFibGUtcGFnaW5hdGlvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtYWN0aW9uc1wiICpuZ0lmPVwidGVtcGxhdGVzWydjdXN0b21BY3Rpb25zJ11cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snY3VzdG9tQWN0aW9ucyddXCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2hlYWRlcj5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1kYXRhLXRhYmxlLWxvYWRpbmctbWFza1wiICpuZ0lmPVwiZGF0YVNvdXJjZT8ubG9hZGluZyB8fCBsb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWxvYWRpbmdcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmc+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1vdXRzaWRlLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsgJ25vdm8tZGF0YS10YWJsZS1vdXRzaWRlLWNvbnRhaW5lci1maXhlZCc6IGZpeGVkSGVhZGVyIH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtY3VzdG9tLWZpbHRlclwiICpuZ0lmPVwiY3VzdG9tRmlsdGVyXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZXNbJ2N1c3RvbUZpbHRlciddXCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgI25vdm9EYXRhVGFibGVDb250YWluZXJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtY29udGFpbmVyXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnbm92by1kYXRhLXRhYmxlLWNvbnRhaW5lci1maXhlZCc6IGZpeGVkSGVhZGVyIH1cIlxuICAgICAgICBbY2xhc3MuZW1wdHktdXNlci1maWx0ZXJlZF09XCJkYXRhU291cmNlPy5jdXJyZW50bHlFbXB0eSAmJiBzdGF0ZS51c2VyRmlsdGVyZWRcIlxuICAgICAgICBbY2xhc3MuZW1wdHldPVwiZGF0YVNvdXJjZT8udG90YWxseUVtcHR5ICYmICFkYXRhU291cmNlPy5sb2FkaW5nICYmICFsb2FkaW5nICYmICFzdGF0ZS51c2VyRmlsdGVyZWQgJiYgIWRhdGFTb3VyY2UucHJpc3RpbmVcIlxuICAgICAgPlxuICAgICAgICA8Y2RrLXRhYmxlXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW5zPy5sZW5ndGggPiAwICYmIGNvbHVtbnNMb2FkZWQgJiYgZGF0YVNvdXJjZVwiXG4gICAgICAgICAgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiXG4gICAgICAgICAgW3RyYWNrQnldPVwidHJhY2tCeUZuXCJcbiAgICAgICAgICBub3ZvRGF0YVRhYmxlU29ydEZpbHRlclxuICAgICAgICAgIFtjbGFzcy5leHBhbmRhYmxlXT1cImV4cGFuZGFibGVcIlxuICAgICAgICAgIFtjbGFzcy5lbXB0eV09XCJkYXRhU291cmNlPy5jdXJyZW50bHlFbXB0eSAmJiBzdGF0ZS51c2VyRmlsdGVyZWRcIlxuICAgICAgICAgIFtoaWRkZW5dPVwiZGF0YVNvdXJjZT8udG90YWxseUVtcHR5ICYmICFzdGF0ZS51c2VyRmlsdGVyZWRcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBjZGtDb2x1bW5EZWY9XCJzZWxlY3Rpb25cIj5cbiAgICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtY2hlY2tib3gtaGVhZGVyLWNlbGwgKmNka0hlYWRlckNlbGxEZWYgW21heFNlbGVjdGVkXT1cIm1heFNlbGVjdGVkXCI+PC9ub3ZvLWRhdGEtdGFibGUtY2hlY2tib3gtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWNlbGxcbiAgICAgICAgICAgICAgKmNka0NlbGxEZWY9XCJsZXQgcm93OyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxuICAgICAgICAgICAgICBbbWF4U2VsZWN0ZWRdPVwibWF4U2VsZWN0ZWRcIlxuICAgICAgICAgICAgPjwvbm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWNlbGw+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBjZGtDb2x1bW5EZWY9XCJleHBhbmRcIj5cbiAgICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtZXhwYW5kLWhlYWRlci1jZWxsICpjZGtIZWFkZXJDZWxsRGVmPjwvbm92by1kYXRhLXRhYmxlLWV4cGFuZC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtZXhwYW5kLWNlbGwgKmNka0NlbGxEZWY9XCJsZXQgcm93OyBsZXQgaSA9IGluZGV4XCIgW3Jvd109XCJyb3dcIj48L25vdm8tZGF0YS10YWJsZS1leHBhbmQtY2VsbD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uczsgdHJhY2tCeTogdHJhY2tDb2x1bW5zQnlcIiBbY2RrQ29sdW1uRGVmXT1cImNvbHVtbi5pZFwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0YS10YWJsZS1oZWFkZXItY2VsbFxuICAgICAgICAgICAgICAqY2RrSGVhZGVyQ2VsbERlZlxuICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgIFtmaWx0ZXJUZW1wbGF0ZV09XCJ0ZW1wbGF0ZXNbJ2NvbHVtbi1maWx0ZXItJyArIGNvbHVtbi5pZF1cIlxuICAgICAgICAgICAgICBbbm92by1kYXRhLXRhYmxlLWNlbGwtY29uZmlnXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgIFtyZXNpemVkXT1cInJlc2l6ZWRcIlxuICAgICAgICAgICAgICBbZGVmYXVsdFNvcnRdPVwiZGVmYXVsdFNvcnRcIlxuICAgICAgICAgICAgICBbYWxsb3dNdWx0aXBsZUZpbHRlcnNdPVwiYWxsb3dNdWx0aXBsZUZpbHRlcnNcIlxuICAgICAgICAgICAgICBbY2xhc3MuZW1wdHldPVwiY29sdW1uPy50eXBlID09PSAnYWN0aW9uJyAmJiAhY29sdW1uPy5sYWJlbFwiXG4gICAgICAgICAgICAgIFtjbGFzcy5idXR0b24taGVhZGVyLWNlbGxdPVwiY29sdW1uPy50eXBlID09PSAnZXhwYW5kJyB8fCAoY29sdW1uPy50eXBlID09PSAnYWN0aW9uJyAmJiAhY29sdW1uPy5hY3Rpb24/Lm9wdGlvbnMpXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmRyb3Bkb3duLWhlYWRlci1jZWxsXT1cImNvbHVtbj8udHlwZSA9PT0gJ2FjdGlvbicgJiYgY29sdW1uPy5hY3Rpb24/Lm9wdGlvbnNcIlxuICAgICAgICAgICAgICBbY2xhc3MuZml4ZWQtaGVhZGVyXT1cImZpeGVkSGVhZGVyXCJcbiAgICAgICAgICAgID48L25vdm8tZGF0YS10YWJsZS1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtY2VsbFxuICAgICAgICAgICAgICAqY2RrQ2VsbERlZj1cImxldCByb3dcIlxuICAgICAgICAgICAgICBbcmVzaXplZF09XCJyZXNpemVkXCJcbiAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICBbcm93XT1cInJvd1wiXG4gICAgICAgICAgICAgIFt0ZW1wbGF0ZV09XCJjb2x1bW5Ub1RlbXBsYXRlW2NvbHVtbi5pZF1cIlxuICAgICAgICAgICAgICBbY2xhc3MuZW1wdHldPVwiY29sdW1uPy50eXBlID09PSAnYWN0aW9uJyAmJiAhY29sdW1uPy5sYWJlbFwiXG4gICAgICAgICAgICAgIFtjbGFzcy5idXR0b24tY2VsbF09XCJjb2x1bW4/LnR5cGUgPT09ICdleHBhbmQnIHx8IChjb2x1bW4/LnR5cGUgPT09ICdhY3Rpb24nICYmICFjb2x1bW4/LmFjdGlvbj8ub3B0aW9ucylcIlxuICAgICAgICAgICAgICBbY2xhc3MuZHJvcGRvd24tY2VsbF09XCJjb2x1bW4/LnR5cGUgPT09ICdhY3Rpb24nICYmIGNvbHVtbj8uYWN0aW9uPy5vcHRpb25zXCJcbiAgICAgICAgICAgID48L25vdm8tZGF0YS10YWJsZS1jZWxsPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtaGVhZGVyLXJvd1xuICAgICAgICAgICAgKmNka0hlYWRlclJvd0RlZj1cImRpc3BsYXllZENvbHVtbnNcIlxuICAgICAgICAgICAgW2ZpeGVkSGVhZGVyXT1cImZpeGVkSGVhZGVyXCJcbiAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1oZWFkZXItcm93XCJcbiAgICAgICAgICA+PC9ub3ZvLWRhdGEtdGFibGUtaGVhZGVyLXJvdz5cbiAgICAgICAgICA8bm92by1kYXRhLXRhYmxlLXJvd1xuICAgICAgICAgICAgKmNka1Jvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnNcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IHJvd1tyb3dJZGVudGlmaWVyXSA9PSBhY3RpdmVSb3dJZGVudGlmaWVyIH1cIlxuICAgICAgICAgICAgW25vdm9EYXRhVGFibGVFeHBhbmRdPVwiZGV0YWlsUm93VGVtcGxhdGVcIlxuICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxuICAgICAgICAgICAgW2lkXT1cIm5hbWUgKyAnLScgKyByb3dbcm93SWRlbnRpZmllcl1cIlxuICAgICAgICAgICAgW2RhdGFBdXRvbWF0aW9uSWRdPVwicm93W3Jvd0lkZW50aWZpZXJdXCJcbiAgICAgICAgICA+PC9ub3ZvLWRhdGEtdGFibGUtcm93PlxuICAgICAgICA8L2Nkay10YWJsZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1mb290ZXJcIiAqbmdJZj1cInRlbXBsYXRlc1snZm9vdGVyJ11cIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVzWydmb290ZXInXTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbHVtbnMsIGRhdGE6IGRhdGFTb3VyY2UuZGF0YSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtbm8tcmVzdWx0cy1jb250YWluZXJcIlxuICAgICAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cInNjcm9sbExlZnRcIlxuICAgICAgICAgICpuZ0lmPVwiZGF0YVNvdXJjZT8uY3VycmVudGx5RW1wdHkgJiYgc3RhdGUudXNlckZpbHRlcmVkICYmICFkYXRhU291cmNlPy5sb2FkaW5nICYmICFsb2FkaW5nICYmICFkYXRhU291cmNlLnByaXN0aW5lXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtZW1wdHktbWVzc2FnZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snbm9SZXN1bHRzTWVzc2FnZSddIHx8IHRlbXBsYXRlc1snZGVmYXVsdE5vUmVzdWx0c01lc3NhZ2UnXVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1lbXB0eS1jb250YWluZXJcIlxuICAgICAgICAqbmdJZj1cImRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhZGF0YVNvdXJjZT8ubG9hZGluZyAmJiAhbG9hZGluZyAmJiAhc3RhdGUudXNlckZpbHRlcmVkICYmICFkYXRhU291cmNlLnByaXN0aW5lXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1lbXB0eS1tZXNzYWdlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snZW1wdHlNZXNzYWdlJ10gfHwgdGVtcGxhdGVzWydkZWZhdWx0Tm9SZXN1bHRzTWVzc2FnZSddXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBERUZBVUxUIENFTEwgVEVNUExBVEUgLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRleHRDZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxzcGFuIFtzdHlsZS53aWR0aC5weF09XCJjb2w/LndpZHRoXCIgW3N0eWxlLm1pbi13aWR0aC5weF09XCJjb2w/LndpZHRoXCIgW3N0eWxlLm1heC13aWR0aC5weF09XCJjb2w/LndpZHRoXCI+e3tcbiAgICAgICAgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sXG4gICAgICB9fTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJkYXRlQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8c3Bhbj57eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfCBkYXRhVGFibGVEYXRlUmVuZGVyZXI6IGNvbCB9fTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJkYXRldGltZUNlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPHNwYW4+e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIHwgZGF0YVRhYmxlRGF0ZVRpbWVSZW5kZXJlcjogY29sIH19PC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRpbWVDZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxzcGFuPnt7IHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbCB8IGRhdGFUYWJsZVRpbWVSZW5kZXJlcjogY29sIH19PC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImN1cnJlbmN5Q2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8c3Bhbj57eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfCBkYXRhVGFibGVDdXJyZW5jeVJlbmRlcmVyOiBjb2wgfX08L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiYmlnZGVjaW1hbENlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPHNwYW4+e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIHwgZGF0YVRhYmxlQmlnRGVjaW1hbFJlbmRlcmVyOiBjb2wgfX08L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwibnVtYmVyQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8c3Bhbj57eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfCBkYXRhVGFibGVOdW1iZXJSZW5kZXJlcjogY29sIH19PC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInBlcmNlbnRDZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxzcGFuPnt7IHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbCB8IGRhdGFUYWJsZU51bWJlclJlbmRlcmVyOiBjb2w6dHJ1ZSB9fTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJsaW5rQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8YVxuICAgICAgICBbYXR0ci5kYXRhLWZlYXR1cmUtaWRdPVwiY29sPy5hdHRyaWJ1dGVzPy5kYXRhRmVhdHVyZUlkXCJcbiAgICAgICAgKGNsaWNrKT1cImNvbC5oYW5kbGVycz8uY2xpY2soeyBvcmlnaW5hbEV2ZW50OiAkZXZlbnQsIHJvdzogcm93IH0pXCJcbiAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImNvbD8ud2lkdGhcIlxuICAgICAgICBbc3R5bGUubWluLXdpZHRoLnB4XT1cImNvbD8ud2lkdGhcIlxuICAgICAgICBbc3R5bGUubWF4LXdpZHRoLnB4XT1cImNvbD8ud2lkdGhcIlxuICAgICAgICA+e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIH19PC9hXG4gICAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwidGVsQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8YSBocmVmPVwidGVsOnt7IHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbCB9fVwiIFt0YXJnZXRdPVwiY29sPy5hdHRyaWJ1dGVzPy50YXJnZXRcIj57e1xuICAgICAgICByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2xcbiAgICAgIH19PC9hPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cIm1haWx0b0NlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPGEgaHJlZj1cIm1haWx0bzp7eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfX1cIiBbdGFyZ2V0XT1cImNvbD8uYXR0cmlidXRlcz8udGFyZ2V0XCI+e3tcbiAgICAgICAgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sXG4gICAgICB9fTwvYT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJidXR0b25DZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICBbdG9vbHRpcF09XCJjb2w/LmFjdGlvbj8udG9vbHRpcFwiXG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgW2F0dHIuZGF0YS1mZWF0dXJlLWlkXT1cImNvbD8uYXR0cmlidXRlcz8uZGF0YUZlYXR1cmVJZFwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJpc0Rpc2FibGVkKGNvbCwgcm93KVwiXG4gICAgICAgIChjbGljayk9XCJjb2wuaGFuZGxlcnM/LmNsaWNrKHsgb3JpZ2luYWxFdmVudDogJGV2ZW50LCByb3c6IHJvdyB9KVwiXG4gICAgICA+XG4gICAgICAgIDxub3ZvLWljb24+e3sgY29sPy5hY3Rpb24/Lmljb24gfX08L25vdm8taWNvbj5cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZHJvcGRvd25DZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxub3ZvLWRyb3Bkb3duIHBhcmVudFNjcm9sbFNlbGVjdG9yPVwiLm5vdm8tZGF0YS10YWJsZS1jb250YWluZXJcIiBjb250YWluZXJDbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1kcm9wZG93blwiPlxuICAgICAgICA8bm92by1idXR0b24gdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwiZGlhbG9ndWVcIiBbaWNvbl09XCJjb2wuYWN0aW9uLmljb25cIiBpbnZlcnNlPnt7IGNvbC5sYWJlbCB9fTwvbm92by1idXR0b24+XG4gICAgICAgIDxub3ZvLW9wdGdyb3VwPlxuICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb2w/LmFjdGlvbj8ub3B0aW9uc1wiXG4gICAgICAgICAgICAoY2xpY2spPVwib3B0aW9uLmhhbmRsZXJzLmNsaWNrKHsgb3JpZ2luYWxFdmVudDogJGV2ZW50Py5vcmlnaW5hbEV2ZW50LCByb3c6IHJvdyB9KVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZChvcHRpb24sIHJvdylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJvcHRpb24ubGFiZWxcIj57eyBvcHRpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgPC9ub3ZvLW9wdGdyb3VwPlxuICAgICAgPC9ub3ZvLWRyb3Bkb3duPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImRlZmF1bHROb1Jlc3VsdHNNZXNzYWdlXCI+XG4gICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMubm9NYXRjaGluZ1JlY29yZHNNZXNzYWdlIH19PC9oND5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJkZWZhdWx0RW1wdHlNZXNzYWdlXCI+XG4gICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMuZW1wdHlUYWJsZU1lc3NhZ2UgfX08L2g0PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImV4cGFuZGVkUm93XCI+IFlvdSBkaWQgbm90IHByb3ZpZGUgYW4gXCJleHBhbmRlZFJvd1wiIHRlbXBsYXRlISA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGV0YWlsUm93VGVtcGxhdGUgbGV0LXJvdz5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtZGV0YWlsLXJvd1wiIFtAZXhwYW5kXSBzdHlsZT1cIm92ZXJmbG93OiBoaWRkZW5cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snZXhwYW5kZWRSb3cnXTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvdyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwhLS0gQ1VTVE9NIENFTExTIFBBU1NFRCBJTiAtLT5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtEYXRhVGFibGVTdGF0ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGU8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmdsb2JhbC1zZWFyY2gtaGlkZGVuJykgZ2xvYmFsU2VhcmNoSGlkZGVuQ2xhc3NUb2dnbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkcmVuKE5vdm9UZW1wbGF0ZSkgY3VzdG9tVGVtcGxhdGVzOiBRdWVyeUxpc3Q8Tm92b1RlbXBsYXRlPjtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvVGVtcGxhdGUpIGRlZmF1bHRUZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxOb3ZvVGVtcGxhdGU+O1xuICBAVmlld0NoaWxkcmVuKE5vdm9EYXRhVGFibGVDZWxsSGVhZGVyKSBjZWxsSGVhZGVyczogUXVlcnlMaXN0PE5vdm9EYXRhVGFibGVDZWxsSGVhZGVyPFQ+PjtcbiAgQFZpZXdDaGlsZCgnbm92b0RhdGFUYWJsZUNvbnRhaW5lcicpIG5vdm9EYXRhVGFibGVDb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBPdXRwdXQoKSByZXNpemVkOiBFdmVudEVtaXR0ZXI8SURhdGFUYWJsZUNvbHVtbjxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc3BsYXllZENvbHVtbnMoZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5ZWRDb2x1bW5zICYmIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5sZW5ndGggIT09IDApIHtcbiAgICAgIGlmICh0aGlzLm5hbWUgIT09ICdub3ZvLWRhdGEtdGFibGUnKSB7XG4gICAgICAgIHRoaXMucHJlZmVyZW5jZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICBkaXNwbGF5ZWRDb2x1bW5zLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vdGlmeSgnTXVzdCBoYXZlIFtuYW1lXSBzZXQgb24gZGF0YS10YWJsZSB0byB1c2UgcHJlZmVyZW5jZXMhJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Rpc2FibGVkQ29sdW1ucyA9IGRpc3BsYXllZENvbHVtbnM7XG4gICAgdGhpcy5jb25maWd1cmVMYXN0RGlzcGxheWVkQ29sdW1uKCk7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNjcm9sbExpc3RlbmVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgZGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkQ29sdW1ucztcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZENvbHVtbnM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpIHBhZ2luYXRpb25PcHRpb25zOiBJRGF0YVRhYmxlUGFnaW5hdGlvbk9wdGlvbnM7XG4gIEBJbnB1dCgpIHNlYXJjaE9wdGlvbnM6IElEYXRhVGFibGVTZWFyY2hPcHRpb25zO1xuICBASW5wdXQoKSBzZWxlY3Rpb25PcHRpb25zOiBJRGF0YVRhYmxlU2VsZWN0aW9uT3B0aW9uW107XG4gIEBJbnB1dCgpIGRlZmF1bHRTb3J0OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfTtcbiAgQElucHV0KCkgbmFtZSA9ICdub3ZvLWRhdGEtdGFibGUnO1xuICBASW5wdXQoKSBhbGxvd011bHRpcGxlRmlsdGVycyA9IGZhbHNlO1xuICBASW5wdXQoKSByb3dJZGVudGlmaWVyID0gJ2lkJztcbiAgQElucHV0KCkgYWN0aXZlUm93SWRlbnRpZmllciA9ICcnO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQElucHV0KCkgdHJhY2tCeUZuID0gKGluZGV4LCBpdGVtKSA9PiBpdGVtLmlkO1xuICBASW5wdXQoKSB0ZW1wbGF0ZXM6IHsgW2tleTogc3RyaW5nXTogVGVtcGxhdGVSZWY8YW55PiB9ID0ge307XG4gIEBJbnB1dCgpIGZpeGVkSGVhZGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBhZ2luYXRvckRhdGFGZWF0dXJlSWQ6IHN0cmluZztcbiAgQElucHV0KCkgbWF4U2VsZWN0ZWQ6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgY2FuU2VsZWN0QWxsOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGFsbE1hdGNoaW5nU2VsZWN0ZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgZGF0YVRhYmxlU2VydmljZShzZXJ2aWNlOiBJRGF0YVRhYmxlU2VydmljZTxUPikge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIGlmICghc2VydmljZSkge1xuICAgICAgc2VydmljZSA9IG5ldyBTdGF0aWNEYXRhVGFibGVTZXJ2aWNlKFtdKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhU291cmNlID0gbmV3IERhdGFUYWJsZVNvdXJjZTxUPihzZXJ2aWNlLCB0aGlzLnN0YXRlLCB0aGlzLnJlZik7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHJvd3Mocm93czogVFtdKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgY29uc3Qgc2VydmljZSA9IG5ldyBTdGF0aWNEYXRhVGFibGVTZXJ2aWNlKHJvd3MpO1xuICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBEYXRhVGFibGVTb3VyY2U8VD4oc2VydmljZSwgdGhpcy5zdGF0ZSwgdGhpcy5yZWYpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvdXRzaWRlRmlsdGVyKG91dHNpZGVGaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+KSB7XG4gICAgLy8gVW5zdWJzY3JpYmVcbiAgICBpZiAodGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLm91dHNpZGVGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKG91dHNpZGVGaWx0ZXIpIHtcbiAgICAgIC8vIFJlLXN1YnNjcmliZVxuICAgICAgdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uID0gb3V0c2lkZUZpbHRlci5zdWJzY3JpYmUoKGZpbHRlcjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUub3V0c2lkZUZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBnbG9iYWxTZWFyY2g6IHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoLCBmaWx0ZXI6IHRoaXMuc3RhdGUuZmlsdGVyLCBzb3J0OiB0aGlzLnN0YXRlLnNvcnQgfSk7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHJlZnJlc2hTdWJqZWN0KHJlZnJlc2hTdWJqZWN0OiBFdmVudEVtaXR0ZXI8YW55Pikge1xuICAgIC8vIFVuc3Vic2NyaWJlXG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmIChyZWZyZXNoU3ViamVjdCkge1xuICAgICAgLy8gUmUtc3Vic2NyaWJlXG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSByZWZyZXNoU3ViamVjdC5zdWJzY3JpYmUoKGZpbHRlcjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUuaXNGb3JjZVJlZnJlc2ggPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YXRlLnVwZGF0ZXMubmV4dCh7IGdsb2JhbFNlYXJjaDogdGhpcy5zdGF0ZS5nbG9iYWxTZWFyY2gsIGZpbHRlcjogdGhpcy5zdGF0ZS5maWx0ZXIsIHNvcnQ6IHRoaXMuc3RhdGUuc29ydCB9KTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgY29sdW1ucyhjb2x1bW5zOiBJRGF0YVRhYmxlQ29sdW1uPFQ+W10pIHtcbiAgICB0aGlzLl9jb2x1bW5zID0gY29sdW1ucztcbiAgICB0aGlzLmNvbmZpZ3VyZUNvbHVtbnMoKTtcbiAgICB0aGlzLnBlcmZvcm1JbnRlcmFjdGlvbnMoJ2luaXQnKTtcbiAgfVxuICBnZXQgY29sdW1ucygpOiBJRGF0YVRhYmxlQ29sdW1uPFQ+W10ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGN1c3RvbUZpbHRlcih2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fY3VzdG9tRmlsdGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBjdXN0b21GaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbUZpbHRlcjtcbiAgfVxuICBwcml2YXRlIF9jdXN0b21GaWx0ZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGhhc0V4YW5kZWRSb3dzKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNFeGFuZGVkUm93cyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgaGFzRXhhbmRlZFJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0V4YW5kZWRSb3dzO1xuICB9XG4gIHByaXZhdGUgX2hhc0V4YW5kZWRSb3dzOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JjZVNob3dIZWFkZXIodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZvcmNlU2hvd0hlYWRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgZm9yY2VTaG93SGVhZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3JjZVNob3dIZWFkZXI7XG4gIH1cbiAgcHJpdmF0ZSBfZm9yY2VTaG93SGVhZGVyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlR2xvYmFsU2VhcmNoKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICAgIHRoaXMuZ2xvYmFsU2VhcmNoSGlkZGVuQ2xhc3NUb2dnbGUgPSB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoO1xuICB9XG4gIGdldCBoaWRlR2xvYmFsU2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoO1xuICB9XG4gIHByaXZhdGUgX2hpZGVHbG9iYWxTZWFyY2g6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBwcmVmZXJlbmNlc0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlUHJlZmVyZW5jZXM+ID0gbmV3IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlUHJlZmVyZW5jZXM+KCk7XG4gIEBPdXRwdXQoKSBhbGxTZWxlY3RlZDogRXZlbnRFbWl0dGVyPHsgYWxsU2VsZWN0ZWQ6IGJvb2xlYW47IHNlbGVjdGVkQ291bnQ6IG51bWJlciB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGFsbFNlbGVjdGVkOiBib29sZWFuO1xuICAgIHNlbGVjdGVkQ291bnQ6IG51bWJlcjtcbiAgfT4oKTtcblxuICBwdWJsaWMgZGF0YVNvdXJjZTogRGF0YVRhYmxlU291cmNlPFQ+O1xuICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBjb2x1bW5Ub1RlbXBsYXRlOiB7IFtrZXk6IHN0cmluZ106IFRlbXBsYXRlUmVmPGFueT4gfSA9IHt9O1xuICBwdWJsaWMgY29sdW1uc0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2VsZWN0aW9uOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTtcbiAgcHVibGljIHNjcm9sbExlZnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBleHBhbmRhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBvdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcmVmcmVzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHJlc2V0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcGFnaW5hdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHNvcnRGaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBhbGxNYXRjaGluZ1NlbGVjdGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX2NvbHVtbnM6IElEYXRhVGFibGVDb2x1bW48VD5bXTtcbiAgcHJpdmF0ZSBzY3JvbGxMaXN0ZW5lckhhbmRsZXI6IGFueTtcbiAgcHJpdmF0ZSBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW1wdHknKVxuICBnZXQgZW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLmRhdGFTb3VyY2UudG90YWxseUVtcHR5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5sb2FkaW5nJylcbiAgZ2V0IGxvYWRpbmdDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nIHx8ICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5kYXRhU291cmNlLmxvYWRpbmcpO1xuICB9XG5cbiAgQElucHV0KCkgbGlzdEludGVyYWN0aW9uczogTGlzdEludGVyYWN0aW9uRGljdGlvbmFyeTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBzdGF0ZTogRGF0YVRhYmxlU3RhdGU8VD4pIHtcbiAgICB0aGlzLnNjcm9sbExpc3RlbmVySGFuZGxlciA9IHRoaXMuc2Nyb2xsTGlzdGVuZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNvcnRGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLnNvcnRGaWx0ZXJTb3VyY2Uuc3Vic2NyaWJlKFxuICAgICAgKGV2ZW50OiB7IHNvcnQ6IElEYXRhVGFibGVTb3J0OyBmaWx0ZXI6IElEYXRhVGFibGVGaWx0ZXIgfCBJRGF0YVRhYmxlRmlsdGVyW107IGdsb2JhbFNlYXJjaDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPT0gJ25vdm8tZGF0YS10YWJsZScpIHtcbiAgICAgICAgICB0aGlzLnByZWZlcmVuY2VzQ2hhbmdlZC5lbWl0KHsgbmFtZTogdGhpcy5uYW1lLCBzb3J0OiBldmVudC5zb3J0LCBmaWx0ZXI6IGV2ZW50LmZpbHRlciwgZ2xvYmFsU2VhcmNoOiBldmVudC5nbG9iYWxTZWFyY2ggfSk7XG4gICAgICAgICAgdGhpcy5wZXJmb3JtSW50ZXJhY3Rpb25zKCdjaGFuZ2UnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub3RpZnkoJ011c3QgaGF2ZSBbbmFtZV0gc2V0IG9uIGRhdGEtdGFibGUgdG8gdXNlIHByZWZlcmVuY2VzIScpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gICAgdGhpcy5wYWdpbmF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5wYWdpbmF0aW9uU291cmNlLnN1YnNjcmliZSgoZXZlbnQ6IHsgaXNQYWdlU2l6ZUNoYW5nZTogYm9vbGVhbjsgcGFnZVNpemU6IG51bWJlciB9KSA9PiB7XG4gICAgICBpZiAodGhpcy5uYW1lICE9PSAnbm92by1kYXRhLXRhYmxlJykge1xuICAgICAgICBpZiAoZXZlbnQuaXNQYWdlU2l6ZUNoYW5nZSkge1xuICAgICAgICAgIHRoaXMucHJlZmVyZW5jZXNDaGFuZ2VkLmVtaXQoeyBuYW1lOiB0aGlzLm5hbWUsIHBhZ2VTaXplOiBldmVudC5wYWdlU2l6ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm90aWZ5KCdNdXN0IGhhdmUgW25hbWVdIHNldCBvbiBkYXRhLXRhYmxlIHRvIHVzZSBwcmVmZXJlbmNlcyEnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5yZXNldFNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG4gICAgdGhpcy5hbGxNYXRjaGluZ1NlbGVjdGVkU3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5hbGxNYXRjaGluZ1NlbGVjdGVkU291cmNlLnN1YnNjcmliZSgoZXZlbnQ6IGJvb2xlYW4pID0+IHtcbiAgICAgIHRoaXMuYWxsTWF0Y2hpbmdTZWxlY3RlZCA9IGV2ZW50O1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG1vZGlmeUNlbGxIZWFkZXJNdWx0aVNlbGVjdEZpbHRlck9wdGlvbnMoY29sdW1uOiBzdHJpbmcsIG5ld09wdGlvbnM6IHsgdmFsdWU6IGFueTsgbGFiZWw6IHN0cmluZyB9W10pOiB2b2lkIHtcbiAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmNlbGxIZWFkZXJzLmZpbmQoKGNlbGxIZWFkZXIpID0+IGNlbGxIZWFkZXIuaWQgPT09IGNvbHVtbik7XG4gICAgaWYgKGhlYWRlciAmJiBoZWFkZXIuY29uZmlnICYmIGhlYWRlci5jb25maWcuZmlsdGVyQ29uZmlnICYmIGhlYWRlci5jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IGZpbHRlck9wdGlvbnM6IGFueVtdID0gaGVhZGVyLmNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9ucztcbiAgICAgIGNvbnN0IG9wdGlvbnNUb0tlZXAgPSBmaWx0ZXJPcHRpb25zLmZpbHRlcihcbiAgICAgICAgKG9wdCkgPT5cbiAgICAgICAgICBoZWFkZXIuaXNTZWxlY3RlZChvcHQsIGhlYWRlci5tdWx0aVNlbGVjdGVkT3B0aW9ucykgJiZcbiAgICAgICAgICAhbmV3T3B0aW9ucy5maW5kKChuZXdPcHQpID0+IG9wdC52YWx1ZSAmJiBuZXdPcHQudmFsdWUgJiYgbmV3T3B0LnZhbHVlID09PSBvcHQudmFsdWUpLFxuICAgICAgKTtcbiAgICAgIGhlYWRlci5jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnMgPSBbLi4ub3B0aW9uc1RvS2VlcCwgLi4ubmV3T3B0aW9uc107XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlci5jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnMgPSBuZXdPcHRpb25zO1xuICAgIH1cbiAgICBoZWFkZXIuc2V0dXBGaWx0ZXJPcHRpb25zKCk7XG4gICAgaGVhZGVyLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm91dHNpZGVGaWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMub3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5ub3ZvRGF0YVRhYmxlQ29udGFpbmVyKSB7XG4gICAgICAodGhpcy5ub3ZvRGF0YVRhYmxlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgYXMgRWxlbWVudCkucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxMaXN0ZW5lckhhbmRsZXIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzZXRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc29ydEZpbHRlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zb3J0RmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmFsbE1hdGNoaW5nU2VsZWN0ZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuYWxsTWF0Y2hpbmdTZWxlY3RlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzcGxheWVkQ29sdW1ucyAmJiB0aGlzLmRpc3BsYXllZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmV4cGFuZGFibGUgPSB0aGlzLmRpc3BsYXllZENvbHVtbnMuaW5jbHVkZXMoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgdGVtcGxhdGVzIGRlZmluZWQgaGVyZVxuICAgIHRoaXMuZGVmYXVsdFRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAvLyBPbmx5IG92ZXJyaWRlIGlmIGl0IGRvZXNuJ3QgYWxyZWFkeSBleGlzdFxuICAgICAgaWYgKCF0aGlzLnRlbXBsYXRlc1tpdGVtLmdldFR5cGUoKV0pIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXNbaXRlbS5nZXRUeXBlKCldID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBDdXN0b20gdGVtcGxhdGVzIHBhc3NlZCBpblxuICAgIHRoaXMuY3VzdG9tVGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIC8vIE92ZXJyaWRlIGFueXRoaW5nIHRoYXQgaXMgY3VzdG9tIGFuZCBpbiBIVE1MXG4gICAgICB0aGlzLnRlbXBsYXRlc1tpdGVtLmdldFR5cGUoKV0gPSBpdGVtLnRlbXBsYXRlO1xuICAgIH0pO1xuICAgIC8vIExvYWQgY29sdW1uc1xuICAgIHRoaXMuY29uZmlndXJlQ29sdW1ucygpO1xuXG4gICAgLy8gU3RhdGVcbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2UgPSAwO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZSkge1xuICAgICAgdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZSA9IDUwO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZU9wdGlvbnMpIHtcbiAgICAgIHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVPcHRpb25zID0gWzEwLCAyNSwgNTAsIDEwMF07XG4gICAgfVxuICAgIHRoaXMuc3RhdGUucGFnZSA9IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgPyB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2UgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZS5wYWdlU2l6ZSA9IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgPyB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uT3B0aW9ucyA9IHRoaXMuc2VsZWN0aW9uT3B0aW9ucyA/PyB1bmRlZmluZWQ7XG5cbiAgICAvLyBTY3JvbGxpbmcgaW5zaWRlIHRhYmxlXG4gICAgKHRoaXMubm92b0RhdGFUYWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsTGlzdGVuZXJIYW5kbGVyKTtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBvblNlYXJjaENoYW5nZSh0ZXJtOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmdsb2JhbFNlYXJjaCA9IHRlcm07XG4gICAgdGhpcy5zdGF0ZS5yZXNldChmYWxzZSwgdHJ1ZSk7XG4gICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBnbG9iYWxTZWFyY2g6IHRlcm0sIGZpbHRlcjogdGhpcy5zdGF0ZS5maWx0ZXIsIHNvcnQ6IHRoaXMuc3RhdGUuc29ydCB9KTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFja0NvbHVtbnNCeShpbmRleDogbnVtYmVyLCBpdGVtOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KSB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cblxuICBwdWJsaWMgaXNEaXNhYmxlZChjaGVjazogYW55LCByb3c6IFQpOiBib29sZWFuIHtcbiAgICBpZiAoY2hlY2suZGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoY2hlY2suZGlzYWJsZWRGdW5jKSB7XG4gICAgICByZXR1cm4gY2hlY2suZGlzYWJsZWRGdW5jKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBpc0V4cGFuZGVkKHJvdzogVCk6IGJvb2xlYW4ge1xuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLmV4cGFuZGVkUm93cy5oYXMoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCk7XG4gIH1cblxuICBwdWJsaWMgZXhwYW5kUm93KHJvdzogVCk6IHZvaWQge1xuICAgIGNvbnN0IGV4cGFuZGVkID0gdGhpcy5pc0V4cGFuZGVkKHJvdyk7XG5cbiAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuc3RhdGUuZXhwYW5kZWRSb3dzLmRlbGV0ZShgJHtyb3dbdGhpcy5yb3dJZGVudGlmaWVyXX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5leHBhbmRlZFJvd3MuYWRkKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlLm9uRXhwYW5kQ2hhbmdlKChyb3cgYXMgdW5rbm93biBhcyB7IGlkOiBudW1iZXIgfSkuaWQpO1xuICB9XG5cbiAgcHVibGljIGV4cGFuZFJvd3MoZXhwYW5kOiBib29sZWFuKTogdm9pZCB7XG4gICAgKHRoaXMuZGF0YVNvdXJjZS5kYXRhIHx8IFtdKS5mb3JFYWNoKChyb3c6IFQpID0+IHtcbiAgICAgIGlmICghZXhwYW5kKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kZWRSb3dzLmRlbGV0ZShgJHtyb3dbdGhpcy5yb3dJZGVudGlmaWVyXX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kZWRSb3dzLmFkZChgJHtyb3dbdGhpcy5yb3dJZGVudGlmaWVyXX1gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlLm9uRXhwYW5kQ2hhbmdlKCk7XG4gIH1cblxuICBwdWJsaWMgYWxsQ3VycmVudFJvd3NFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8ICh0aGlzLmRhdGFTb3VyY2UuZGF0YSB8fCBbXSkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5pc0V4cGFuZGVkKCh0aGlzLmRhdGFTb3VyY2UuZGF0YSB8fCBbXSlbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZChyb3c6IFQpOiBib29sZWFuIHtcbiAgICBpZiAoIXJvdykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd3MuaGFzKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdFJvdyhyb3c6IFQsIG9yaWdpbj86IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKHJvdyk7XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkUm93cy5kZWxldGUoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNhblNlbGVjdEFsbCAmJiB0aGlzLmFsbE1hdGNoaW5nU2VsZWN0ZWQgJiYgWydvbkNsaWNrJ10uaW5jbHVkZXMob3JpZ2luKSkge1xuICAgICAgICAvLyBXaGVuIGFsbCBtYXRjaGluZyByZWNvcmRzIGFyZSBzZWxlY3RlZCB0aGUgdXNlciBjb3VsZCBiZSBvbiBhbm90aGVyIHBhZ2Ugd2hlcmUgYWxsIHJvd3Mgb25seSBhcHBlYXIgc2VsZWN0ZWRcbiAgICAgICAgLy8gTmVlZCB0byByZXNldCB0aGUgcm93cyB0aGF0IGFyZSBhY3R1YWxseSBzZWxlY3RlZCwgc2VsZWN0IHJvd3Mgb24gdGhlIGN1cnJlbnQgcGFnZSBhbmQgZGVzZWxlY3QgdGhlIGNob3NlbiByZWNvcmRcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd3MuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RSb3dzKHRydWUpO1xuICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkUm93cy5kZWxldGUoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkUm93cy5zZXQoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCwgcm93KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5hbGxNYXRjaGluZ1NlbGVjdGVkU291cmNlLm5leHQoZmFsc2UpO1xuICAgIHRoaXMuc3RhdGUub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RSb3dzKHNlbGVjdGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgKHRoaXMuZGF0YVNvdXJjZS5kYXRhIHx8IFtdKS5mb3JFYWNoKChyb3c6IFQpID0+IHtcbiAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd3MuZGVsZXRlKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd3Muc2V0KGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWAsIHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdGF0ZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICB9XG5cbiAgcHVibGljIGFsbEN1cnJlbnRSb3dzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuYWxsTWF0Y2hpbmdTZWxlY3RlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5kYXRhU291cmNlPy5kYXRhPy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAodGhpcy5kYXRhU291cmNlLmRhdGEgfHwgW10pLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZCgodGhpcy5kYXRhU291cmNlLmRhdGEgfHwgW10pW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVMYXN0RGlzcGxheWVkQ29sdW1uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbnMgJiYgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zICYmIDAgIT09IHRoaXMuY29sdW1ucy5sZW5ndGggJiYgMCAhPT0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPikgPT4ge1xuICAgICAgICBpZiAoY29sdW1uLmluaXRpYWxSZXNpemFibGUpIHtcbiAgICAgICAgICBjb2x1bW4ucmVzaXphYmxlID0gY29sdW1uLmluaXRpYWxSZXNpemFibGUucmVzaXphYmxlO1xuICAgICAgICAgIGNvbHVtbi53aWR0aCA9IGNvbHVtbi5pbml0aWFsUmVzaXphYmxlLndpZHRoO1xuICAgICAgICAgIGNvbHVtbi5pbml0aWFsUmVzaXphYmxlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlc2l6YWJsZUNvbHVtbnM6IHN0cmluZ1tdID0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmZpbHRlcigobmFtZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgdGhpcy5jb2x1bW5zLmZpbmRJbmRleCgoY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29sdW1uLnJlc2l6YWJsZSAmJiBjb2x1bW4uaWQgPT09IG5hbWU7XG4gICAgICAgICAgfSkgIT09IC0xXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXNpemFibGVDb2x1bW5zICYmIHJlc2l6YWJsZUNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBsYXN0UmVzaXphYmxlQ29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+ID0gdGhpcy5jb2x1bW5zLmZpbmQoKGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPikgPT4ge1xuICAgICAgICAgIHJldHVybiBjb2x1bW4uaWQgPT09IHJlc2l6YWJsZUNvbHVtbnNbcmVzaXphYmxlQ29sdW1ucy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxhc3RSZXNpemFibGVDb2x1bW4uaW5pdGlhbFJlc2l6YWJsZSA9IHtcbiAgICAgICAgICByZXNpemFibGU6IGxhc3RSZXNpemFibGVDb2x1bW4ucmVzaXphYmxlLFxuICAgICAgICAgIHdpZHRoOiBsYXN0UmVzaXphYmxlQ29sdW1uLndpZHRoLFxuICAgICAgICB9O1xuICAgICAgICBsYXN0UmVzaXphYmxlQ29sdW1uLndpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgICBsYXN0UmVzaXphYmxlQ29sdW1uLnJlc2l6YWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29uZmlndXJlQ29sdW1ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGggIT09IDAgJiYgT2JqZWN0LmtleXModGhpcy50ZW1wbGF0ZXMpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgLy8gRmlndXJlIHRoZSBjb2x1bW4gdGVtcGxhdGVzXG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KSA9PiB7XG4gICAgICAgIC8vIEZpZ3VyZSB0aGUgdGVtcGxhdGVcbiAgICAgICAgbGV0IHRlbXBsYXRlTmFtZTogc3RyaW5nO1xuICAgICAgICBpZiAoY29sdW1uLnRlbXBsYXRlKSB7XG4gICAgICAgICAgLy8gUGFzcyBpdCBpbiBhcyB0ZW1wbGF0ZVxuICAgICAgICAgIHRlbXBsYXRlTmFtZSA9IGNvbHVtbi50ZW1wbGF0ZTtcbiAgICAgICAgfSBlbHNlIGlmICghIXRoaXMudGVtcGxhdGVzW2NvbHVtbi5pZF0pIHtcbiAgICAgICAgICAvLyBDdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBjb2x1bW4gaWRcbiAgICAgICAgICB0ZW1wbGF0ZU5hbWUgPSBjb2x1bW4uaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRGVmYXVsdCB0byB0aGUgZGVmYXVsQ2VsbFRlbXBsYXRlXG4gICAgICAgICAgaWYgKGNvbHVtbi50eXBlID09PSAnYWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKGNvbHVtbi5hY3Rpb24gJiYgY29sdW1uLmFjdGlvbi5vcHRpb25zKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmFjdGlvbi5pY29uKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmFjdGlvbi5pY29uID0gJ2NvbGxhcHNlJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0ZW1wbGF0ZU5hbWUgPSAnZHJvcGRvd25DZWxsVGVtcGxhdGUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVOYW1lID0gJ2J1dHRvbkNlbGxUZW1wbGF0ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb2x1bW4udHlwZSA9PT0gJ2xpbms6dGVsJyB8fCBjb2x1bW4udHlwZSA9PT0gJ2xpbms6bWFpbHRvJykge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZU5hbWUgPSBgJHtjb2x1bW4udHlwZS5zcGxpdCgnOicpWzFdfUNlbGxUZW1wbGF0ZWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZU5hbWUgPSBgJHtjb2x1bW4udHlwZX1DZWxsVGVtcGxhdGVgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbHVtblRvVGVtcGxhdGVbY29sdW1uLmlkXSA9IHRoaXMudGVtcGxhdGVzW3RlbXBsYXRlTmFtZV07XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29uZmlndXJlTGFzdERpc3BsYXllZENvbHVtbigpO1xuICAgICAgdGhpcy5jb2x1bW5zTG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbExpc3RlbmVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldDogRWxlbWVudCA9IHRoaXMubm92b0RhdGFUYWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQ7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gdGFyZ2V0LnNjcm9sbExlZnQ7XG4gICAgaWYgKGxlZnQgIT09IHRoaXMuc2Nyb2xsTGVmdCkge1xuICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0gdGFyZ2V0LnNjcm9sbExlZnQ7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcGVyZm9ybUludGVyYWN0aW9ucyhldmVudDogTGlzdEludGVyYWN0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0SW50ZXJhY3Rpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiB0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgY29uc3QgYWxsTGlzdENvbHVtbkludGVyYWN0aW9ucyA9IHRoaXMubGlzdEludGVyYWN0aW9uc1tjb2x1bW4uaWRdO1xuICAgICAgICBjb25zdCBsaXN0Q29sdW1uSW50ZXJhY3Rpb24gPSBhbGxMaXN0Q29sdW1uSW50ZXJhY3Rpb25zICYmIGFsbExpc3RDb2x1bW5JbnRlcmFjdGlvbnMuZmluZCgoaW50KSA9PiBpbnQuZXZlbnQuaW5jbHVkZXMoZXZlbnQpKTtcbiAgICAgICAgaWYgKGxpc3RDb2x1bW5JbnRlcmFjdGlvbikge1xuICAgICAgICAgIGxpc3RDb2x1bW5JbnRlcmFjdGlvbi5zY3JpcHQodGhpcywgY29sdW1uLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19