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
        this._hideGlobalSearch = true;
        this.preferencesChanged = new EventEmitter();
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
    selectRow(row) {
        const selected = this.isSelected(row);
        if (selected) {
            this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
        }
        else {
            this.state.selectedRows.set(`${row[this.rowIdentifier]}`, row);
        }
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
            <novo-data-table-checkbox-header-cell *cdkHeaderCellDef></novo-data-table-checkbox-header-cell>
            <novo-data-table-checkbox-cell *cdkCellDef="let row; let i = index" [row]="row"></novo-data-table-checkbox-cell>
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
        <list>
          <item
            *ngFor="let option of col?.action?.options"
            (action)="option.handlers.click({ originalEvent: $event?.originalEvent, row: row })"
            [disabled]="isDisabled(option, row)"
          >
            <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
          </item>
        </list>
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
    defaultSort: [{ type: Input }],
    name: [{ type: Input }],
    allowMultipleFilters: [{ type: Input }],
    rowIdentifier: [{ type: Input }],
    activeRowIdentifier: [{ type: Input }],
    trackByFn: [{ type: Input }],
    templates: [{ type: Input }],
    fixedHeader: [{ type: Input }],
    paginatorDataFeatureId: [{ type: Input }],
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
    empty: [{ type: HostBinding, args: ['class.empty',] }],
    loadingClass: [{ type: HostBinding, args: ['class.loading',] }],
    listInteractions: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssSUFBSSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUVULFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMvRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMxRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFXdEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBZ09sRSxNQUFNLE9BQU8sYUFBYTtJQWdMeEIsWUFBbUIsTUFBd0IsRUFBVSxHQUFzQixFQUFTLEtBQXdCO1FBQXpGLFdBQU0sR0FBTixNQUFN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Ozs7Ozs7Ozs7OztHQWlOVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzVCOzs7WUEvT1EsZ0JBQWdCO1lBZnZCLGlCQUFpQjtZQStCVixjQUFjOzs7NENBaU9wQixXQUFXLFNBQUMsNEJBQTRCOzhCQUV4QyxlQUFlLFNBQUMsWUFBWTsrQkFDNUIsWUFBWSxTQUFDLFlBQVk7MEJBQ3pCLFlBQVksU0FBQyx1QkFBdUI7cUNBQ3BDLFNBQVMsU0FBQyx3QkFBd0I7c0JBQ2xDLE1BQU07K0JBRU4sS0FBSztnQ0EwQkwsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7bUJBQ0wsS0FBSzttQ0FDTCxLQUFLOzRCQUNMLEtBQUs7a0NBQ0wsS0FBSzt3QkFFTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSztxQ0FDTCxLQUFLOytCQUVMLEtBQUs7bUJBVUwsS0FBSzs0QkFRTCxLQUFLOzZCQWdCTCxLQUFLO3NCQWdCTCxLQUFLOzJCQVVMLEtBQUs7NkJBU0wsS0FBSzs4QkFTTCxLQUFLOytCQVNMLEtBQUs7aUNBVUwsTUFBTTtvQkFtQk4sV0FBVyxTQUFDLGFBQWE7MkJBS3pCLFdBQVcsU0FBQyxlQUFlOytCQUszQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUgYXMgYW5pbVN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IG5vdGlmeSB9IGZyb20gJy4uLy4uL3V0aWxzL25vdGlmaWVyL25vdGlmaWVyLnV0aWwnO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlIH0gZnJvbSAnLi4vY29tbW9uL25vdm8tdGVtcGxhdGUvbm92by10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUNlbGxIZWFkZXIgfSBmcm9tICcuL2NlbGwtaGVhZGVycy9kYXRhLXRhYmxlLWhlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVTb3VyY2UgfSBmcm9tICcuL2RhdGEtdGFibGUuc291cmNlJztcbmltcG9ydCB7XG4gIElEYXRhVGFibGVDb2x1bW4sXG4gIElEYXRhVGFibGVGaWx0ZXIsXG4gIElEYXRhVGFibGVQYWdpbmF0aW9uT3B0aW9ucyxcbiAgSURhdGFUYWJsZVByZWZlcmVuY2VzLFxuICBJRGF0YVRhYmxlU2VhcmNoT3B0aW9ucyxcbiAgSURhdGFUYWJsZVNlcnZpY2UsXG4gIElEYXRhVGFibGVTb3J0LFxufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgTGlzdEludGVyYWN0aW9uRGljdGlvbmFyeSwgTGlzdEludGVyYWN0aW9uRXZlbnQgfSBmcm9tICcuL0xpc3RJbnRlcmFjdGlvblR5cGVzJztcbmltcG9ydCB7IFN0YXRpY0RhdGFUYWJsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0YXRpYy1kYXRhLXRhYmxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVRhYmxlU3RhdGUgfSBmcm9tICcuL3N0YXRlL2RhdGEtdGFibGUtc3RhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZScsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdleHBhbmQnLCBbXG4gICAgICBhbmltU3RhdGUoJ3ZvaWQnLCBzdHlsZSh7IGhlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnLCB2aXNpYmlsaXR5OiAnaGlkZGVuJyB9KSksXG4gICAgICBhbmltU3RhdGUoJyonLCBzdHlsZSh7IGhlaWdodDogJyonLCB2aXNpYmlsaXR5OiAndmlzaWJsZScgfSkpLFxuICAgICAgdHJhbnNpdGlvbigndm9pZCA8PT4gKicsIGFuaW1hdGUoJzcwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpJykpLFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoZWFkZXJcbiAgICAgICpuZ0lmPVwiKCEoZGF0YVNvdXJjZT8udG90YWxseUVtcHR5ICYmICFzdGF0ZS51c2VyRmlsdGVyZWQpICYmICFsb2FkaW5nKSB8fCBmb3JjZVNob3dIZWFkZXJcIlxuICAgICAgW2NsYXNzLmVtcHR5XT1cImhpZGVHbG9iYWxTZWFyY2ggJiYgIXBhZ2luYXRpb25PcHRpb25zICYmICF0ZW1wbGF0ZXNbJ2N1c3RvbUFjdGlvbnMnXVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snY3VzdG9tSGVhZGVyJ11cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDxub3ZvLXNlYXJjaFxuICAgICAgICBhbHdheXNPcGVuPVwidHJ1ZVwiXG4gICAgICAgIChzZWFyY2hDaGFuZ2VkKT1cIm9uU2VhcmNoQ2hhbmdlKCRldmVudClcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cInN0YXRlLmdsb2JhbFNlYXJjaFwiXG4gICAgICAgICpuZ0lmPVwiIWhpZGVHbG9iYWxTZWFyY2hcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwic2VhcmNoT3B0aW9ucz8ucGxhY2Vob2xkZXJcIlxuICAgICAgICBbaGludF09XCJzZWFyY2hPcHRpb25zPy50b29sdGlwXCJcbiAgICAgID5cbiAgICAgIDwvbm92by1zZWFyY2g+XG4gICAgICA8bm92by1kYXRhLXRhYmxlLXBhZ2luYXRpb25cbiAgICAgICAgKm5nSWY9XCJwYWdpbmF0aW9uT3B0aW9uc1wiXG4gICAgICAgIFt0aGVtZV09XCJwYWdpbmF0aW9uT3B0aW9ucy50aGVtZVwiXG4gICAgICAgIFtsZW5ndGhdPVwiZGF0YVNvdXJjZT8uY3VycmVudFRvdGFsXCJcbiAgICAgICAgW3BhZ2VdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVwiXG4gICAgICAgIFtwYWdlU2l6ZV09XCJwYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZVwiXG4gICAgICAgIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVPcHRpb25zXCJcbiAgICAgICAgW2RhdGFGZWF0dXJlSWRdPVwicGFnaW5hdG9yRGF0YUZlYXR1cmVJZFwiXG4gICAgICA+XG4gICAgICA8L25vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1hY3Rpb25zXCIgKm5nSWY9XCJ0ZW1wbGF0ZXNbJ2N1c3RvbUFjdGlvbnMnXVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVzWydjdXN0b21BY3Rpb25zJ11cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtbG9hZGluZy1tYXNrXCIgKm5nSWY9XCJkYXRhU291cmNlPy5sb2FkaW5nIHx8IGxvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtbG9hZGluZ1wiPlxuICAgICAgPG5vdm8tbG9hZGluZz48L25vdm8tbG9hZGluZz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1kYXRhLXRhYmxlLW91dHNpZGUtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwieyAnbm92by1kYXRhLXRhYmxlLW91dHNpZGUtY29udGFpbmVyLWZpeGVkJzogZml4ZWRIZWFkZXIgfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1jdXN0b20tZmlsdGVyXCIgKm5nSWY9XCJjdXN0b21GaWx0ZXJcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snY3VzdG9tRmlsdGVyJ11cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICAjbm92b0RhdGFUYWJsZUNvbnRhaW5lclxuICAgICAgICBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1jb250YWluZXJcIlxuICAgICAgICBbbmdDbGFzc109XCJ7ICdub3ZvLWRhdGEtdGFibGUtY29udGFpbmVyLWZpeGVkJzogZml4ZWRIZWFkZXIgfVwiXG4gICAgICAgIFtjbGFzcy5lbXB0eS11c2VyLWZpbHRlcmVkXT1cImRhdGFTb3VyY2U/LmN1cnJlbnRseUVtcHR5ICYmIHN0YXRlLnVzZXJGaWx0ZXJlZFwiXG4gICAgICAgIFtjbGFzcy5lbXB0eV09XCJkYXRhU291cmNlPy50b3RhbGx5RW1wdHkgJiYgIWRhdGFTb3VyY2U/LmxvYWRpbmcgJiYgIWxvYWRpbmcgJiYgIXN0YXRlLnVzZXJGaWx0ZXJlZCAmJiAhZGF0YVNvdXJjZS5wcmlzdGluZVwiXG4gICAgICA+XG4gICAgICAgIDxjZGstdGFibGVcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbnM/Lmxlbmd0aCA+IDAgJiYgY29sdW1uc0xvYWRlZCAmJiBkYXRhU291cmNlXCJcbiAgICAgICAgICBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCJcbiAgICAgICAgICBbdHJhY2tCeV09XCJ0cmFja0J5Rm5cIlxuICAgICAgICAgIG5vdm9EYXRhVGFibGVTb3J0RmlsdGVyXG4gICAgICAgICAgW2NsYXNzLmV4cGFuZGFibGVdPVwiZXhwYW5kYWJsZVwiXG4gICAgICAgICAgW2NsYXNzLmVtcHR5XT1cImRhdGFTb3VyY2U/LmN1cnJlbnRseUVtcHR5ICYmIHN0YXRlLnVzZXJGaWx0ZXJlZFwiXG4gICAgICAgICAgW2hpZGRlbl09XCJkYXRhU291cmNlPy50b3RhbGx5RW1wdHkgJiYgIXN0YXRlLnVzZXJGaWx0ZXJlZFwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyIGNka0NvbHVtbkRlZj1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbCAqY2RrSGVhZGVyQ2VsbERlZj48L25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtY2hlY2tib3gtY2VsbCAqY2RrQ2VsbERlZj1cImxldCByb3c7IGxldCBpID0gaW5kZXhcIiBbcm93XT1cInJvd1wiPjwvbm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWNlbGw+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBjZGtDb2x1bW5EZWY9XCJleHBhbmRcIj5cbiAgICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtZXhwYW5kLWhlYWRlci1jZWxsICpjZGtIZWFkZXJDZWxsRGVmPjwvbm92by1kYXRhLXRhYmxlLWV4cGFuZC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtZXhwYW5kLWNlbGwgKmNka0NlbGxEZWY9XCJsZXQgcm93OyBsZXQgaSA9IGluZGV4XCIgW3Jvd109XCJyb3dcIj48L25vdm8tZGF0YS10YWJsZS1leHBhbmQtY2VsbD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uczsgdHJhY2tCeTogdHJhY2tDb2x1bW5zQnlcIiBbY2RrQ29sdW1uRGVmXT1cImNvbHVtbi5pZFwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0YS10YWJsZS1oZWFkZXItY2VsbFxuICAgICAgICAgICAgICAqY2RrSGVhZGVyQ2VsbERlZlxuICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgIFtmaWx0ZXJUZW1wbGF0ZV09XCJ0ZW1wbGF0ZXNbJ2NvbHVtbi1maWx0ZXItJyArIGNvbHVtbi5pZF1cIlxuICAgICAgICAgICAgICBbbm92by1kYXRhLXRhYmxlLWNlbGwtY29uZmlnXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgIFtyZXNpemVkXT1cInJlc2l6ZWRcIlxuICAgICAgICAgICAgICBbZGVmYXVsdFNvcnRdPVwiZGVmYXVsdFNvcnRcIlxuICAgICAgICAgICAgICBbYWxsb3dNdWx0aXBsZUZpbHRlcnNdPVwiYWxsb3dNdWx0aXBsZUZpbHRlcnNcIlxuICAgICAgICAgICAgICBbY2xhc3MuZW1wdHldPVwiY29sdW1uPy50eXBlID09PSAnYWN0aW9uJyAmJiAhY29sdW1uPy5sYWJlbFwiXG4gICAgICAgICAgICAgIFtjbGFzcy5idXR0b24taGVhZGVyLWNlbGxdPVwiY29sdW1uPy50eXBlID09PSAnZXhwYW5kJyB8fCAoY29sdW1uPy50eXBlID09PSAnYWN0aW9uJyAmJiAhY29sdW1uPy5hY3Rpb24/Lm9wdGlvbnMpXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmRyb3Bkb3duLWhlYWRlci1jZWxsXT1cImNvbHVtbj8udHlwZSA9PT0gJ2FjdGlvbicgJiYgY29sdW1uPy5hY3Rpb24/Lm9wdGlvbnNcIlxuICAgICAgICAgICAgICBbY2xhc3MuZml4ZWQtaGVhZGVyXT1cImZpeGVkSGVhZGVyXCJcbiAgICAgICAgICAgID48L25vdm8tZGF0YS10YWJsZS1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtY2VsbFxuICAgICAgICAgICAgICAqY2RrQ2VsbERlZj1cImxldCByb3dcIlxuICAgICAgICAgICAgICBbcmVzaXplZF09XCJyZXNpemVkXCJcbiAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICBbcm93XT1cInJvd1wiXG4gICAgICAgICAgICAgIFt0ZW1wbGF0ZV09XCJjb2x1bW5Ub1RlbXBsYXRlW2NvbHVtbi5pZF1cIlxuICAgICAgICAgICAgICBbY2xhc3MuZW1wdHldPVwiY29sdW1uPy50eXBlID09PSAnYWN0aW9uJyAmJiAhY29sdW1uPy5sYWJlbFwiXG4gICAgICAgICAgICAgIFtjbGFzcy5idXR0b24tY2VsbF09XCJjb2x1bW4/LnR5cGUgPT09ICdleHBhbmQnIHx8IChjb2x1bW4/LnR5cGUgPT09ICdhY3Rpb24nICYmICFjb2x1bW4/LmFjdGlvbj8ub3B0aW9ucylcIlxuICAgICAgICAgICAgICBbY2xhc3MuZHJvcGRvd24tY2VsbF09XCJjb2x1bW4/LnR5cGUgPT09ICdhY3Rpb24nICYmIGNvbHVtbj8uYWN0aW9uPy5vcHRpb25zXCJcbiAgICAgICAgICAgID48L25vdm8tZGF0YS10YWJsZS1jZWxsPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxub3ZvLWRhdGEtdGFibGUtaGVhZGVyLXJvd1xuICAgICAgICAgICAgKmNka0hlYWRlclJvd0RlZj1cImRpc3BsYXllZENvbHVtbnNcIlxuICAgICAgICAgICAgW2ZpeGVkSGVhZGVyXT1cImZpeGVkSGVhZGVyXCJcbiAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1oZWFkZXItcm93XCJcbiAgICAgICAgICA+PC9ub3ZvLWRhdGEtdGFibGUtaGVhZGVyLXJvdz5cbiAgICAgICAgICA8bm92by1kYXRhLXRhYmxlLXJvd1xuICAgICAgICAgICAgKmNka1Jvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnNcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IHJvd1tyb3dJZGVudGlmaWVyXSA9PSBhY3RpdmVSb3dJZGVudGlmaWVyIH1cIlxuICAgICAgICAgICAgW25vdm9EYXRhVGFibGVFeHBhbmRdPVwiZGV0YWlsUm93VGVtcGxhdGVcIlxuICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxuICAgICAgICAgICAgW2lkXT1cIm5hbWUgKyAnLScgKyByb3dbcm93SWRlbnRpZmllcl1cIlxuICAgICAgICAgICAgW2RhdGFBdXRvbWF0aW9uSWRdPVwicm93W3Jvd0lkZW50aWZpZXJdXCJcbiAgICAgICAgICA+PC9ub3ZvLWRhdGEtdGFibGUtcm93PlxuICAgICAgICA8L2Nkay10YWJsZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1mb290ZXJcIiAqbmdJZj1cInRlbXBsYXRlc1snZm9vdGVyJ11cIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVzWydmb290ZXInXTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbHVtbnMsIGRhdGE6IGRhdGFTb3VyY2UuZGF0YSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtbm8tcmVzdWx0cy1jb250YWluZXJcIlxuICAgICAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cInNjcm9sbExlZnRcIlxuICAgICAgICAgICpuZ0lmPVwiZGF0YVNvdXJjZT8uY3VycmVudGx5RW1wdHkgJiYgc3RhdGUudXNlckZpbHRlcmVkICYmICFkYXRhU291cmNlPy5sb2FkaW5nICYmICFsb2FkaW5nICYmICFkYXRhU291cmNlLnByaXN0aW5lXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtZW1wdHktbWVzc2FnZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snbm9SZXN1bHRzTWVzc2FnZSddIHx8IHRlbXBsYXRlc1snZGVmYXVsdE5vUmVzdWx0c01lc3NhZ2UnXVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1lbXB0eS1jb250YWluZXJcIlxuICAgICAgICAqbmdJZj1cImRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhZGF0YVNvdXJjZT8ubG9hZGluZyAmJiAhbG9hZGluZyAmJiAhc3RhdGUudXNlckZpbHRlcmVkICYmICFkYXRhU291cmNlLnByaXN0aW5lXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1lbXB0eS1tZXNzYWdlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlc1snZW1wdHlNZXNzYWdlJ10gfHwgdGVtcGxhdGVzWydkZWZhdWx0Tm9SZXN1bHRzTWVzc2FnZSddXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBERUZBVUxUIENFTEwgVEVNUExBVEUgLS0+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRleHRDZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxzcGFuIFtzdHlsZS53aWR0aC5weF09XCJjb2w/LndpZHRoXCIgW3N0eWxlLm1pbi13aWR0aC5weF09XCJjb2w/LndpZHRoXCIgW3N0eWxlLm1heC13aWR0aC5weF09XCJjb2w/LndpZHRoXCI+e3tcbiAgICAgICAgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sXG4gICAgICB9fTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJkYXRlQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8c3Bhbj57eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfCBkYXRhVGFibGVEYXRlUmVuZGVyZXI6IGNvbCB9fTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJkYXRldGltZUNlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPHNwYW4+e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIHwgZGF0YVRhYmxlRGF0ZVRpbWVSZW5kZXJlcjogY29sIH19PC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInRpbWVDZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxzcGFuPnt7IHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbCB8IGRhdGFUYWJsZVRpbWVSZW5kZXJlcjogY29sIH19PC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImN1cnJlbmN5Q2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8c3Bhbj57eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfCBkYXRhVGFibGVDdXJyZW5jeVJlbmRlcmVyOiBjb2wgfX08L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiYmlnZGVjaW1hbENlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPHNwYW4+e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIHwgZGF0YVRhYmxlQmlnRGVjaW1hbFJlbmRlcmVyOiBjb2wgfX08L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwibnVtYmVyQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8c3Bhbj57eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfCBkYXRhVGFibGVOdW1iZXJSZW5kZXJlcjogY29sIH19PC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cInBlcmNlbnRDZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxzcGFuPnt7IHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbCB8IGRhdGFUYWJsZU51bWJlclJlbmRlcmVyOiBjb2w6dHJ1ZSB9fTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJsaW5rQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8YVxuICAgICAgICBbYXR0ci5kYXRhLWZlYXR1cmUtaWRdPVwiY29sPy5hdHRyaWJ1dGVzPy5kYXRhRmVhdHVyZUlkXCJcbiAgICAgICAgKGNsaWNrKT1cImNvbC5oYW5kbGVycz8uY2xpY2soeyBvcmlnaW5hbEV2ZW50OiAkZXZlbnQsIHJvdzogcm93IH0pXCJcbiAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImNvbD8ud2lkdGhcIlxuICAgICAgICBbc3R5bGUubWluLXdpZHRoLnB4XT1cImNvbD8ud2lkdGhcIlxuICAgICAgICBbc3R5bGUubWF4LXdpZHRoLnB4XT1cImNvbD8ud2lkdGhcIlxuICAgICAgICA+e3sgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sIH19PC9hXG4gICAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwidGVsQ2VsbFRlbXBsYXRlXCIgbGV0LXJvdyBsZXQtY29sPVwiY29sXCI+XG4gICAgICA8YSBocmVmPVwidGVsOnt7IHJvd1tjb2wuaWRdIHwgZGF0YVRhYmxlSW50ZXJwb2xhdGU6IGNvbCB9fVwiIFt0YXJnZXRdPVwiY29sPy5hdHRyaWJ1dGVzPy50YXJnZXRcIj57e1xuICAgICAgICByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2xcbiAgICAgIH19PC9hPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cIm1haWx0b0NlbGxUZW1wbGF0ZVwiIGxldC1yb3cgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgPGEgaHJlZj1cIm1haWx0bzp7eyByb3dbY29sLmlkXSB8IGRhdGFUYWJsZUludGVycG9sYXRlOiBjb2wgfX1cIiBbdGFyZ2V0XT1cImNvbD8uYXR0cmlidXRlcz8udGFyZ2V0XCI+e3tcbiAgICAgICAgcm93W2NvbC5pZF0gfCBkYXRhVGFibGVJbnRlcnBvbGF0ZTogY29sXG4gICAgICB9fTwvYT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBub3ZvVGVtcGxhdGU9XCJidXR0b25DZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICBbdG9vbHRpcF09XCJjb2w/LmFjdGlvbj8udG9vbHRpcFwiXG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgW2F0dHIuZGF0YS1mZWF0dXJlLWlkXT1cImNvbD8uYXR0cmlidXRlcz8uZGF0YUZlYXR1cmVJZFwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJpc0Rpc2FibGVkKGNvbCwgcm93KVwiXG4gICAgICAgIChjbGljayk9XCJjb2wuaGFuZGxlcnM/LmNsaWNrKHsgb3JpZ2luYWxFdmVudDogJGV2ZW50LCByb3c6IHJvdyB9KVwiXG4gICAgICA+XG4gICAgICAgIDxub3ZvLWljb24+e3sgY29sPy5hY3Rpb24/Lmljb24gfX08L25vdm8taWNvbj5cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZHJvcGRvd25DZWxsVGVtcGxhdGVcIiBsZXQtcm93IGxldC1jb2w9XCJjb2xcIj5cbiAgICAgIDxub3ZvLWRyb3Bkb3duIHBhcmVudFNjcm9sbFNlbGVjdG9yPVwiLm5vdm8tZGF0YS10YWJsZS1jb250YWluZXJcIiBjb250YWluZXJDbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1kcm9wZG93blwiPlxuICAgICAgICA8bm92by1idXR0b24gdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwiZGlhbG9ndWVcIiBbaWNvbl09XCJjb2wuYWN0aW9uLmljb25cIiBpbnZlcnNlPnt7IGNvbC5sYWJlbCB9fTwvbm92by1idXR0b24+XG4gICAgICAgIDxsaXN0PlxuICAgICAgICAgIDxpdGVtXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbD8uYWN0aW9uPy5vcHRpb25zXCJcbiAgICAgICAgICAgIChhY3Rpb24pPVwib3B0aW9uLmhhbmRsZXJzLmNsaWNrKHsgb3JpZ2luYWxFdmVudDogJGV2ZW50Py5vcmlnaW5hbEV2ZW50LCByb3c6IHJvdyB9KVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZChvcHRpb24sIHJvdylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJvcHRpb24ubGFiZWxcIj57eyBvcHRpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPC9pdGVtPlxuICAgICAgICA8L2xpc3Q+XG4gICAgICA8L25vdm8tZHJvcGRvd24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZGVmYXVsdE5vUmVzdWx0c01lc3NhZ2VcIj5cbiAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5ub01hdGNoaW5nUmVjb3Jkc01lc3NhZ2UgfX08L2g0PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5vdm9UZW1wbGF0ZT1cImRlZmF1bHRFbXB0eU1lc3NhZ2VcIj5cbiAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5lbXB0eVRhYmxlTWVzc2FnZSB9fTwvaDQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiZXhwYW5kZWRSb3dcIj4gWW91IGRpZCBub3QgcHJvdmlkZSBhbiBcImV4cGFuZGVkUm93XCIgdGVtcGxhdGUhIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNkZXRhaWxSb3dUZW1wbGF0ZSBsZXQtcm93PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1kZXRhaWwtcm93XCIgW0BleHBhbmRdIHN0eWxlPVwib3ZlcmZsb3c6IGhpZGRlblwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVzWydleHBhbmRlZFJvdyddOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogcm93IH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLSBDVVNUT00gQ0VMTFMgUEFTU0VEIElOIC0tPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW0RhdGFUYWJsZVN0YXRlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZTxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZ2xvYmFsLXNlYXJjaC1oaWRkZW4nKSBnbG9iYWxTZWFyY2hIaWRkZW5DbGFzc1RvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b1RlbXBsYXRlKSBjdXN0b21UZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxOb3ZvVGVtcGxhdGU+O1xuICBAVmlld0NoaWxkcmVuKE5vdm9UZW1wbGF0ZSkgZGVmYXVsdFRlbXBsYXRlczogUXVlcnlMaXN0PE5vdm9UZW1wbGF0ZT47XG4gIEBWaWV3Q2hpbGRyZW4oTm92b0RhdGFUYWJsZUNlbGxIZWFkZXIpIGNlbGxIZWFkZXJzOiBRdWVyeUxpc3Q8Tm92b0RhdGFUYWJsZUNlbGxIZWFkZXI8VD4+O1xuICBAVmlld0NoaWxkKCdub3ZvRGF0YVRhYmxlQ29udGFpbmVyJykgbm92b0RhdGFUYWJsZUNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgQE91dHB1dCgpIHJlc2l6ZWQ6IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ29sdW1uPFQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheWVkQ29sdW1ucyhkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSkge1xuICAgIGlmICh0aGlzLmRpc3BsYXllZENvbHVtbnMgJiYgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmxlbmd0aCAhPT0gMCkge1xuICAgICAgaWYgKHRoaXMubmFtZSAhPT0gJ25vdm8tZGF0YS10YWJsZScpIHtcbiAgICAgICAgdGhpcy5wcmVmZXJlbmNlc0NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgIGRpc3BsYXllZENvbHVtbnMsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm90aWZ5KCdNdXN0IGhhdmUgW25hbWVdIHNldCBvbiBkYXRhLXRhYmxlIHRvIHVzZSBwcmVmZXJlbmNlcyEnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZGlzYWJsZWRDb2x1bW5zID0gZGlzcGxheWVkQ29sdW1ucztcbiAgICB0aGlzLmNvbmZpZ3VyZUxhc3REaXNwbGF5ZWRDb2x1bW4oKTtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWRDb2x1bW5zO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkQ29sdW1uczogc3RyaW5nW107XG5cbiAgQElucHV0KCkgcGFnaW5hdGlvbk9wdGlvbnM6IElEYXRhVGFibGVQYWdpbmF0aW9uT3B0aW9ucztcbiAgQElucHV0KCkgc2VhcmNoT3B0aW9uczogSURhdGFUYWJsZVNlYXJjaE9wdGlvbnM7XG4gIEBJbnB1dCgpIGRlZmF1bHRTb3J0OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfTtcbiAgQElucHV0KCkgbmFtZSA9ICdub3ZvLWRhdGEtdGFibGUnO1xuICBASW5wdXQoKSBhbGxvd011bHRpcGxlRmlsdGVycyA9IGZhbHNlO1xuICBASW5wdXQoKSByb3dJZGVudGlmaWVyID0gJ2lkJztcbiAgQElucHV0KCkgYWN0aXZlUm93SWRlbnRpZmllciA9ICcnO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQElucHV0KCkgdHJhY2tCeUZuID0gKGluZGV4LCBpdGVtKSA9PiBpdGVtLmlkO1xuICBASW5wdXQoKSB0ZW1wbGF0ZXM6IHsgW2tleTogc3RyaW5nXTogVGVtcGxhdGVSZWY8YW55PiB9ID0ge307XG4gIEBJbnB1dCgpIGZpeGVkSGVhZGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBhZ2luYXRvckRhdGFGZWF0dXJlSWQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzZXQgZGF0YVRhYmxlU2VydmljZShzZXJ2aWNlOiBJRGF0YVRhYmxlU2VydmljZTxUPikge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIGlmICghc2VydmljZSkge1xuICAgICAgc2VydmljZSA9IG5ldyBTdGF0aWNEYXRhVGFibGVTZXJ2aWNlKFtdKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhU291cmNlID0gbmV3IERhdGFUYWJsZVNvdXJjZTxUPihzZXJ2aWNlLCB0aGlzLnN0YXRlLCB0aGlzLnJlZik7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHJvd3Mocm93czogVFtdKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgY29uc3Qgc2VydmljZSA9IG5ldyBTdGF0aWNEYXRhVGFibGVTZXJ2aWNlKHJvd3MpO1xuICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBEYXRhVGFibGVTb3VyY2U8VD4oc2VydmljZSwgdGhpcy5zdGF0ZSwgdGhpcy5yZWYpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvdXRzaWRlRmlsdGVyKG91dHNpZGVGaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+KSB7XG4gICAgLy8gVW5zdWJzY3JpYmVcbiAgICBpZiAodGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLm91dHNpZGVGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKG91dHNpZGVGaWx0ZXIpIHtcbiAgICAgIC8vIFJlLXN1YnNjcmliZVxuICAgICAgdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uID0gb3V0c2lkZUZpbHRlci5zdWJzY3JpYmUoKGZpbHRlcjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUub3V0c2lkZUZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBnbG9iYWxTZWFyY2g6IHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoLCBmaWx0ZXI6IHRoaXMuc3RhdGUuZmlsdGVyLCBzb3J0OiB0aGlzLnN0YXRlLnNvcnQgfSk7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHJlZnJlc2hTdWJqZWN0KHJlZnJlc2hTdWJqZWN0OiBFdmVudEVtaXR0ZXI8YW55Pikge1xuICAgIC8vIFVuc3Vic2NyaWJlXG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmIChyZWZyZXNoU3ViamVjdCkge1xuICAgICAgLy8gUmUtc3Vic2NyaWJlXG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSByZWZyZXNoU3ViamVjdC5zdWJzY3JpYmUoKGZpbHRlcjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUuaXNGb3JjZVJlZnJlc2ggPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YXRlLnVwZGF0ZXMubmV4dCh7IGdsb2JhbFNlYXJjaDogdGhpcy5zdGF0ZS5nbG9iYWxTZWFyY2gsIGZpbHRlcjogdGhpcy5zdGF0ZS5maWx0ZXIsIHNvcnQ6IHRoaXMuc3RhdGUuc29ydCB9KTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgY29sdW1ucyhjb2x1bW5zOiBJRGF0YVRhYmxlQ29sdW1uPFQ+W10pIHtcbiAgICB0aGlzLl9jb2x1bW5zID0gY29sdW1ucztcbiAgICB0aGlzLmNvbmZpZ3VyZUNvbHVtbnMoKTtcbiAgICB0aGlzLnBlcmZvcm1JbnRlcmFjdGlvbnMoJ2luaXQnKTtcbiAgfVxuICBnZXQgY29sdW1ucygpOiBJRGF0YVRhYmxlQ29sdW1uPFQ+W10ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGN1c3RvbUZpbHRlcih2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fY3VzdG9tRmlsdGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBjdXN0b21GaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbUZpbHRlcjtcbiAgfVxuICBwcml2YXRlIF9jdXN0b21GaWx0ZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGhhc0V4YW5kZWRSb3dzKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNFeGFuZGVkUm93cyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgaGFzRXhhbmRlZFJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0V4YW5kZWRSb3dzO1xuICB9XG4gIHByaXZhdGUgX2hhc0V4YW5kZWRSb3dzOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JjZVNob3dIZWFkZXIodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZvcmNlU2hvd0hlYWRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgZm9yY2VTaG93SGVhZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3JjZVNob3dIZWFkZXI7XG4gIH1cbiAgcHJpdmF0ZSBfZm9yY2VTaG93SGVhZGVyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlR2xvYmFsU2VhcmNoKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICAgIHRoaXMuZ2xvYmFsU2VhcmNoSGlkZGVuQ2xhc3NUb2dnbGUgPSB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoO1xuICB9XG4gIGdldCBoaWRlR2xvYmFsU2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoO1xuICB9XG4gIHByaXZhdGUgX2hpZGVHbG9iYWxTZWFyY2g6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBwcmVmZXJlbmNlc0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlUHJlZmVyZW5jZXM+ID0gbmV3IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlUHJlZmVyZW5jZXM+KCk7XG5cbiAgcHVibGljIGRhdGFTb3VyY2U6IERhdGFUYWJsZVNvdXJjZTxUPjtcbiAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgY29sdW1uVG9UZW1wbGF0ZTogeyBba2V5OiBzdHJpbmddOiBUZW1wbGF0ZVJlZjxhbnk+IH0gPSB7fTtcbiAgcHVibGljIGNvbHVtbnNMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHNlbGVjdGlvbjogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gIHB1YmxpYyBzY3JvbGxMZWZ0OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgZXhwYW5kYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByZXNldFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHBhZ2luYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzb3J0RmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX2NvbHVtbnM6IElEYXRhVGFibGVDb2x1bW48VD5bXTtcbiAgcHJpdmF0ZSBzY3JvbGxMaXN0ZW5lckhhbmRsZXI6IGFueTtcbiAgcHJpdmF0ZSBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW1wdHknKVxuICBnZXQgZW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLmRhdGFTb3VyY2UudG90YWxseUVtcHR5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5sb2FkaW5nJylcbiAgZ2V0IGxvYWRpbmdDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nIHx8ICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5kYXRhU291cmNlLmxvYWRpbmcpO1xuICB9XG5cbiAgQElucHV0KCkgbGlzdEludGVyYWN0aW9uczogTGlzdEludGVyYWN0aW9uRGljdGlvbmFyeTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBzdGF0ZTogRGF0YVRhYmxlU3RhdGU8VD4pIHtcbiAgICB0aGlzLnNjcm9sbExpc3RlbmVySGFuZGxlciA9IHRoaXMuc2Nyb2xsTGlzdGVuZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNvcnRGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLnNvcnRGaWx0ZXJTb3VyY2Uuc3Vic2NyaWJlKFxuICAgICAgKGV2ZW50OiB7IHNvcnQ6IElEYXRhVGFibGVTb3J0OyBmaWx0ZXI6IElEYXRhVGFibGVGaWx0ZXIgfCBJRGF0YVRhYmxlRmlsdGVyW107IGdsb2JhbFNlYXJjaDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPT0gJ25vdm8tZGF0YS10YWJsZScpIHtcbiAgICAgICAgICB0aGlzLnByZWZlcmVuY2VzQ2hhbmdlZC5lbWl0KHsgbmFtZTogdGhpcy5uYW1lLCBzb3J0OiBldmVudC5zb3J0LCBmaWx0ZXI6IGV2ZW50LmZpbHRlciwgZ2xvYmFsU2VhcmNoOiBldmVudC5nbG9iYWxTZWFyY2ggfSk7XG4gICAgICAgICAgdGhpcy5wZXJmb3JtSW50ZXJhY3Rpb25zKCdjaGFuZ2UnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub3RpZnkoJ011c3QgaGF2ZSBbbmFtZV0gc2V0IG9uIGRhdGEtdGFibGUgdG8gdXNlIHByZWZlcmVuY2VzIScpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gICAgdGhpcy5wYWdpbmF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5wYWdpbmF0aW9uU291cmNlLnN1YnNjcmliZSgoZXZlbnQ6IHsgaXNQYWdlU2l6ZUNoYW5nZTogYm9vbGVhbjsgcGFnZVNpemU6IG51bWJlciB9KSA9PiB7XG4gICAgICBpZiAodGhpcy5uYW1lICE9PSAnbm92by1kYXRhLXRhYmxlJykge1xuICAgICAgICBpZiAoZXZlbnQuaXNQYWdlU2l6ZUNoYW5nZSkge1xuICAgICAgICAgIHRoaXMucHJlZmVyZW5jZXNDaGFuZ2VkLmVtaXQoeyBuYW1lOiB0aGlzLm5hbWUsIHBhZ2VTaXplOiBldmVudC5wYWdlU2l6ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm90aWZ5KCdNdXN0IGhhdmUgW25hbWVdIHNldCBvbiBkYXRhLXRhYmxlIHRvIHVzZSBwcmVmZXJlbmNlcyEnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5yZXNldFNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbW9kaWZ5Q2VsbEhlYWRlck11bHRpU2VsZWN0RmlsdGVyT3B0aW9ucyhjb2x1bW46IHN0cmluZywgbmV3T3B0aW9uczogeyB2YWx1ZTogYW55OyBsYWJlbDogc3RyaW5nIH1bXSk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuY2VsbEhlYWRlcnMuZmluZCgoY2VsbEhlYWRlcikgPT4gY2VsbEhlYWRlci5pZCA9PT0gY29sdW1uKTtcbiAgICBpZiAoaGVhZGVyICYmIGhlYWRlci5jb25maWcgJiYgaGVhZGVyLmNvbmZpZy5maWx0ZXJDb25maWcgJiYgaGVhZGVyLmNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9ucykge1xuICAgICAgY29uc3QgZmlsdGVyT3B0aW9uczogYW55W10gPSBoZWFkZXIuY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zO1xuICAgICAgY29uc3Qgb3B0aW9uc1RvS2VlcCA9IGZpbHRlck9wdGlvbnMuZmlsdGVyKFxuICAgICAgICAob3B0KSA9PlxuICAgICAgICAgIGhlYWRlci5pc1NlbGVjdGVkKG9wdCwgaGVhZGVyLm11bHRpU2VsZWN0ZWRPcHRpb25zKSAmJlxuICAgICAgICAgICFuZXdPcHRpb25zLmZpbmQoKG5ld09wdCkgPT4gb3B0LnZhbHVlICYmIG5ld09wdC52YWx1ZSAmJiBuZXdPcHQudmFsdWUgPT09IG9wdC52YWx1ZSksXG4gICAgICApO1xuICAgICAgaGVhZGVyLmNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9ucyA9IFsuLi5vcHRpb25zVG9LZWVwLCAuLi5uZXdPcHRpb25zXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyLmNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9ucyA9IG5ld09wdGlvbnM7XG4gICAgfVxuICAgIGhlYWRlci5zZXR1cEZpbHRlck9wdGlvbnMoKTtcbiAgICBoZWFkZXIuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm5vdm9EYXRhVGFibGVDb250YWluZXIpIHtcbiAgICAgICh0aGlzLm5vdm9EYXRhVGFibGVDb250YWluZXIubmF0aXZlRWxlbWVudCBhcyBFbGVtZW50KS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbExpc3RlbmVySGFuZGxlcik7XG4gICAgfVxuICAgIGlmICh0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZXNldFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZXNldFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0RmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnNvcnRGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc3BsYXllZENvbHVtbnMgJiYgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5leHBhbmRhYmxlID0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmluY2x1ZGVzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHRlbXBsYXRlcyBkZWZpbmVkIGhlcmVcbiAgICB0aGlzLmRlZmF1bHRUZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgLy8gT25seSBvdmVycmlkZSBpZiBpdCBkb2Vzbid0IGFscmVhZHkgZXhpc3RcbiAgICAgIGlmICghdGhpcy50ZW1wbGF0ZXNbaXRlbS5nZXRUeXBlKCldKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzW2l0ZW0uZ2V0VHlwZSgpXSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ3VzdG9tIHRlbXBsYXRlcyBwYXNzZWQgaW5cbiAgICB0aGlzLmN1c3RvbVRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAvLyBPdmVycmlkZSBhbnl0aGluZyB0aGF0IGlzIGN1c3RvbSBhbmQgaW4gSFRNTFxuICAgICAgdGhpcy50ZW1wbGF0ZXNbaXRlbS5nZXRUeXBlKCldID0gaXRlbS50ZW1wbGF0ZTtcbiAgICB9KTtcbiAgICAvLyBMb2FkIGNvbHVtbnNcbiAgICB0aGlzLmNvbmZpZ3VyZUNvbHVtbnMoKTtcblxuICAgIC8vIFN0YXRlXG4gICAgaWYgKHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgJiYgIXRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZSkge1xuICAgICAgdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlID0gMDtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgJiYgIXRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemUpIHtcbiAgICAgIHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemUgPSA1MDtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgJiYgIXRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVPcHRpb25zKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplT3B0aW9ucyA9IFsxMCwgMjUsIDUwLCAxMDBdO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlLnBhZ2UgPSB0aGlzLnBhZ2luYXRpb25PcHRpb25zID8gdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUucGFnZVNpemUgPSB0aGlzLnBhZ2luYXRpb25PcHRpb25zID8gdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIFNjcm9sbGluZyBpbnNpZGUgdGFibGVcbiAgICAodGhpcy5ub3ZvRGF0YVRhYmxlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgYXMgRWxlbWVudCkuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxMaXN0ZW5lckhhbmRsZXIpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIG9uU2VhcmNoQ2hhbmdlKHRlcm06IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoID0gdGVybTtcbiAgICB0aGlzLnN0YXRlLnJlc2V0KGZhbHNlLCB0cnVlKTtcbiAgICB0aGlzLnN0YXRlLnVwZGF0ZXMubmV4dCh7IGdsb2JhbFNlYXJjaDogdGVybSwgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlciwgc29ydDogdGhpcy5zdGF0ZS5zb3J0IH0pO1xuICB9XG5cbiAgcHVibGljIHRyYWNrQ29sdW1uc0J5KGluZGV4OiBudW1iZXIsIGl0ZW06IElEYXRhVGFibGVDb2x1bW48VD4pIHtcbiAgICByZXR1cm4gaXRlbS5pZDtcbiAgfVxuXG4gIHB1YmxpYyBpc0Rpc2FibGVkKGNoZWNrOiBhbnksIHJvdzogVCk6IGJvb2xlYW4ge1xuICAgIGlmIChjaGVjay5kaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjaGVjay5kaXNhYmxlZEZ1bmMpIHtcbiAgICAgIHJldHVybiBjaGVjay5kaXNhYmxlZEZ1bmMocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGlzRXhwYW5kZWQocm93OiBUKTogYm9vbGVhbiB7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZXhwYW5kZWRSb3dzLmhhcyhgJHtyb3dbdGhpcy5yb3dJZGVudGlmaWVyXX1gKTtcbiAgfVxuXG4gIHB1YmxpYyBleHBhbmRSb3cocm93OiBUKTogdm9pZCB7XG4gICAgY29uc3QgZXhwYW5kZWQgPSB0aGlzLmlzRXhwYW5kZWQocm93KTtcblxuICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgdGhpcy5zdGF0ZS5leHBhbmRlZFJvd3MuZGVsZXRlKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLmV4cGFuZGVkUm93cy5hZGQoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUub25FeHBhbmRDaGFuZ2UoKHJvdyBhcyB1bmtub3duIGFzIHsgaWQ6IG51bWJlciB9KS5pZCk7XG4gIH1cblxuICBwdWJsaWMgZXhwYW5kUm93cyhleHBhbmQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAodGhpcy5kYXRhU291cmNlLmRhdGEgfHwgW10pLmZvckVhY2goKHJvdzogVCkgPT4ge1xuICAgICAgaWYgKCFleHBhbmQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRlZFJvd3MuZGVsZXRlKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5leHBhbmRlZFJvd3MuYWRkKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc3RhdGUub25FeHBhbmRDaGFuZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBhbGxDdXJyZW50Um93c0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKHRoaXMuZGF0YVNvdXJjZS5kYXRhIHx8IFtdKS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLmlzRXhwYW5kZWQoKHRoaXMuZGF0YVNvdXJjZS5kYXRhIHx8IFtdKVtpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkKHJvdzogVCk6IGJvb2xlYW4ge1xuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLnNlbGVjdGVkUm93cy5oYXMoYCR7cm93W3RoaXMucm93SWRlbnRpZmllcl19YCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0Um93KHJvdzogVCk6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKHJvdyk7XG5cbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRSb3dzLmRlbGV0ZShgJHtyb3dbdGhpcy5yb3dJZGVudGlmaWVyXX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd3Muc2V0KGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWAsIHJvdyk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RSb3dzKHNlbGVjdGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgKHRoaXMuZGF0YVNvdXJjZS5kYXRhIHx8IFtdKS5mb3JFYWNoKChyb3c6IFQpID0+IHtcbiAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd3MuZGVsZXRlKGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd3Muc2V0KGAke3Jvd1t0aGlzLnJvd0lkZW50aWZpZXJdfWAsIHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdGF0ZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICB9XG5cbiAgcHVibGljIGFsbEN1cnJlbnRSb3dzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAodGhpcy5kYXRhU291cmNlLmRhdGEgfHwgW10pLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZCgodGhpcy5kYXRhU291cmNlLmRhdGEgfHwgW10pW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVMYXN0RGlzcGxheWVkQ29sdW1uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbnMgJiYgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zICYmIDAgIT09IHRoaXMuY29sdW1ucy5sZW5ndGggJiYgMCAhPT0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPikgPT4ge1xuICAgICAgICBpZiAoY29sdW1uLmluaXRpYWxSZXNpemFibGUpIHtcbiAgICAgICAgICBjb2x1bW4ucmVzaXphYmxlID0gY29sdW1uLmluaXRpYWxSZXNpemFibGUucmVzaXphYmxlO1xuICAgICAgICAgIGNvbHVtbi53aWR0aCA9IGNvbHVtbi5pbml0aWFsUmVzaXphYmxlLndpZHRoO1xuICAgICAgICAgIGNvbHVtbi5pbml0aWFsUmVzaXphYmxlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlc2l6YWJsZUNvbHVtbnM6IHN0cmluZ1tdID0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmZpbHRlcigobmFtZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgdGhpcy5jb2x1bW5zLmZpbmRJbmRleCgoY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29sdW1uLnJlc2l6YWJsZSAmJiBjb2x1bW4uaWQgPT09IG5hbWU7XG4gICAgICAgICAgfSkgIT09IC0xXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXNpemFibGVDb2x1bW5zICYmIHJlc2l6YWJsZUNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBsYXN0UmVzaXphYmxlQ29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+ID0gdGhpcy5jb2x1bW5zLmZpbmQoKGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPikgPT4ge1xuICAgICAgICAgIHJldHVybiBjb2x1bW4uaWQgPT09IHJlc2l6YWJsZUNvbHVtbnNbcmVzaXphYmxlQ29sdW1ucy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxhc3RSZXNpemFibGVDb2x1bW4uaW5pdGlhbFJlc2l6YWJsZSA9IHtcbiAgICAgICAgICByZXNpemFibGU6IGxhc3RSZXNpemFibGVDb2x1bW4ucmVzaXphYmxlLFxuICAgICAgICAgIHdpZHRoOiBsYXN0UmVzaXphYmxlQ29sdW1uLndpZHRoLFxuICAgICAgICB9O1xuICAgICAgICBsYXN0UmVzaXphYmxlQ29sdW1uLndpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgICBsYXN0UmVzaXphYmxlQ29sdW1uLnJlc2l6YWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29uZmlndXJlQ29sdW1ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGggIT09IDAgJiYgT2JqZWN0LmtleXModGhpcy50ZW1wbGF0ZXMpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgLy8gRmlndXJlIHRoZSBjb2x1bW4gdGVtcGxhdGVzXG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KSA9PiB7XG4gICAgICAgIC8vIEZpZ3VyZSB0aGUgdGVtcGxhdGVcbiAgICAgICAgbGV0IHRlbXBsYXRlTmFtZTogc3RyaW5nO1xuICAgICAgICBpZiAoY29sdW1uLnRlbXBsYXRlKSB7XG4gICAgICAgICAgLy8gUGFzcyBpdCBpbiBhcyB0ZW1wbGF0ZVxuICAgICAgICAgIHRlbXBsYXRlTmFtZSA9IGNvbHVtbi50ZW1wbGF0ZTtcbiAgICAgICAgfSBlbHNlIGlmICghIXRoaXMudGVtcGxhdGVzW2NvbHVtbi5pZF0pIHtcbiAgICAgICAgICAvLyBDdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBjb2x1bW4gaWRcbiAgICAgICAgICB0ZW1wbGF0ZU5hbWUgPSBjb2x1bW4uaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRGVmYXVsdCB0byB0aGUgZGVmYXVsQ2VsbFRlbXBsYXRlXG4gICAgICAgICAgaWYgKGNvbHVtbi50eXBlID09PSAnYWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKGNvbHVtbi5hY3Rpb24gJiYgY29sdW1uLmFjdGlvbi5vcHRpb25zKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmFjdGlvbi5pY29uKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmFjdGlvbi5pY29uID0gJ2NvbGxhcHNlJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0ZW1wbGF0ZU5hbWUgPSAnZHJvcGRvd25DZWxsVGVtcGxhdGUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVOYW1lID0gJ2J1dHRvbkNlbGxUZW1wbGF0ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb2x1bW4udHlwZSA9PT0gJ2xpbms6dGVsJyB8fCBjb2x1bW4udHlwZSA9PT0gJ2xpbms6bWFpbHRvJykge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZU5hbWUgPSBgJHtjb2x1bW4udHlwZS5zcGxpdCgnOicpWzFdfUNlbGxUZW1wbGF0ZWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZU5hbWUgPSBgJHtjb2x1bW4udHlwZX1DZWxsVGVtcGxhdGVgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbHVtblRvVGVtcGxhdGVbY29sdW1uLmlkXSA9IHRoaXMudGVtcGxhdGVzW3RlbXBsYXRlTmFtZV07XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29uZmlndXJlTGFzdERpc3BsYXllZENvbHVtbigpO1xuICAgICAgdGhpcy5jb2x1bW5zTG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbExpc3RlbmVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldDogRWxlbWVudCA9IHRoaXMubm92b0RhdGFUYWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQ7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gdGFyZ2V0LnNjcm9sbExlZnQ7XG4gICAgaWYgKGxlZnQgIT09IHRoaXMuc2Nyb2xsTGVmdCkge1xuICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0gdGFyZ2V0LnNjcm9sbExlZnQ7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcGVyZm9ybUludGVyYWN0aW9ucyhldmVudDogTGlzdEludGVyYWN0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0SW50ZXJhY3Rpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiB0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgY29uc3QgYWxsTGlzdENvbHVtbkludGVyYWN0aW9ucyA9IHRoaXMubGlzdEludGVyYWN0aW9uc1tjb2x1bW4uaWRdO1xuICAgICAgICBjb25zdCBsaXN0Q29sdW1uSW50ZXJhY3Rpb24gPSBhbGxMaXN0Q29sdW1uSW50ZXJhY3Rpb25zICYmIGFsbExpc3RDb2x1bW5JbnRlcmFjdGlvbnMuZmluZCgoaW50KSA9PiBpbnQuZXZlbnQuaW5jbHVkZXMoZXZlbnQpKTtcbiAgICAgICAgaWYgKGxpc3RDb2x1bW5JbnRlcmFjdGlvbikge1xuICAgICAgICAgIGxpc3RDb2x1bW5JbnRlcmFjdGlvbi5zY3JpcHQodGhpcywgY29sdW1uLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19