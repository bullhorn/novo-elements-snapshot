import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { _DisposeViewRepeaterStrategy, _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { CdkTable, CDK_TABLE_TEMPLATE, _CoalescedStyleScheduler, _COALESCED_STYLE_SCHEDULER } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, EventEmitter, HostBinding, Input, ViewEncapsulation, } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { notify } from 'novo-elements/utils';
import { NovoActivityTableState } from './state';
import { ActivityTableDataSource } from './table-source';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
import * as i2 from "novo-elements/services";
import * as i3 from "./state";
import * as i4 from "novo-elements/components/search";
import * as i5 from "./pagination";
import * as i6 from "novo-elements/components/loading";
import * as i7 from "./cell";
import * as i8 from "./row";
import * as i9 from "@angular/common";
import * as i10 from "@angular/forms";
import * as i11 from "./sort";
export class NovoTable extends CdkTable {
}
NovoTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTable, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTable, selector: "novo-table,[novo-table]", usesInheritance: true, ngImport: i0, template: "\n  <ng-content select=\"caption\"></ng-content>\n  <ng-content select=\"colgroup, col\"></ng-content>\n  <ng-container headerRowOutlet></ng-container>\n  <ng-container rowOutlet></ng-container>\n  <ng-container noDataRowOutlet></ng-container>\n  <ng-container footerRowOutlet></ng-container>\n", isInline: true, directives: [{ type: i1.HeaderRowOutlet, selector: "[headerRowOutlet]" }, { type: i1.DataRowOutlet, selector: "[rowOutlet]" }, { type: i1.NoDataRowOutlet, selector: "[noDataRowOutlet]" }, { type: i1.FooterRowOutlet, selector: "[footerRowOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTable, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-table,[novo-table]',
                    template: CDK_TABLE_TEMPLATE,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
export class NovoActivityTableActions {
}
NovoActivityTableActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableActions, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableActions.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableActions, selector: "novo-activity-table-actions", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableActions, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-actions',
                }]
        }] });
export class NovoActivityTableCustomHeader {
}
NovoActivityTableCustomHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableCustomHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableCustomHeader.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableCustomHeader, selector: "novo-activity-table-custom-header", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableCustomHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-custom-header',
                }]
        }] });
export class NovoActivityTableCustomFilter {
}
NovoActivityTableCustomFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableCustomFilter, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableCustomFilter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableCustomFilter, selector: "novo-activity-table-custom-filter", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableCustomFilter, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-custom-filter',
                }]
        }] });
export class NovoActivityTableEmptyMessage {
}
NovoActivityTableEmptyMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableEmptyMessage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableEmptyMessage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableEmptyMessage, selector: "novo-activity-table-empty-message", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableEmptyMessage, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-empty-message',
                }]
        }] });
export class NovoActivityTableNoResultsMessage {
}
NovoActivityTableNoResultsMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableNoResultsMessage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableNoResultsMessage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableNoResultsMessage, selector: "novo-activity-table-no-results-message", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableNoResultsMessage, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-no-results-message',
                }]
        }] });
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
NovoActivityTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTable, deps: [{ token: i2.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i3.NovoActivityTableState }], target: i0.ɵɵFactoryTarget.Component });
NovoActivityTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTable, selector: "novo-activity-table", inputs: { activityService: "activityService", columns: "columns", displayedColumns: "displayedColumns", actionColumns: "actionColumns", paginationOptions: "paginationOptions", searchOptions: "searchOptions", defaultSort: "defaultSort", outsideFilter: "outsideFilter", customFilter: "customFilter", forceShowHeader: "forceShowHeader", hideGlobalSearch: "hideGlobalSearch", debug: "debug" }, host: { properties: { "class.global-search-hidden": "this.globalSearchHiddenClassToggle", "class.empty": "this.empty", "class.loading": "this.loadingClass" } }, providers: [
        NovoActivityTableState,
        { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
        { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
    ], usesOnChanges: true, ngImport: i0, template: `
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
      <novo-table-pagination
        *ngIf="paginationOptions"
        [length]="dataSource?.total"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
      >
      </novo-table-pagination>
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
        <novo-table
          *ngIf="columns?.length > 0"
          [dataSource]="dataSource"
          novoSortFilter
          novoSelection
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="dataSource?.totallyEmpty && !state.userFiltered"
        >
          <ng-content></ng-content>
          <ng-container novoColumnDef="selection">
            <novo-checkbox-header-cell *novoHeaderCellDef></novo-checkbox-header-cell>
            <novo-checkbox-cell *novoCellDef="let row; let i = index" [row]="row" [index]="i"></novo-checkbox-cell>
          </ng-container>
          <ng-container *ngFor="let column of actionColumns" [novoColumnDef]="column.id">
            <novo-empty-header-cell
              [class.button-header-cell]="!column.options"
              [class.dropdown-header-cell]="column.options"
              *novoHeaderCellDef
            ></novo-empty-header-cell>
            <novo-action-cell *novoCellDef="let row; let i = index" [row]="row" [column]="column"></novo-action-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns" [novoColumnDef]="column.id">
            <novo-header-cell *novoHeaderCellDef [column]="column">{{ column.label }}</novo-header-cell>
            <novo-cell *novoCellDef="let row" [column]="column" [row]="row"></novo-cell>
          </ng-container>
          <novo-header-row *novoHeaderRowDef="displayedColumns"></novo-header-row>
          <novo-table-row *novoRowDef="let row; columns: displayedColumns"></novo-table-row>
        </novo-table>
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
  `, isInline: true, components: [{ type: i4.NovoSearchBoxElement, selector: "novo-search", inputs: ["name", "icon", "position", "placeholder", "alwaysOpen", "theme", "color", "closeOnSelect", "displayField", "displayValue", "hint", "keepOpen", "hasBackdrop", "allowPropagation"], outputs: ["searchChanged", "applySearch"] }, { type: i5.NovoTablePagination, selector: "novo-table-pagination", inputs: ["page", "length", "pageSize", "pageSizeOptions"], outputs: ["pageChange"] }, { type: i6.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: NovoTable, selector: "novo-table,[novo-table]" }, { type: i7.NovoCheckboxHeaderCell, selector: "novo-checkbox-header-cell" }, { type: i7.NovoCheckboxCell, selector: "novo-checkbox-cell", inputs: ["row", "index"] }, { type: i7.NovoActionCell, selector: "novo-action-cell", inputs: ["row", "column"] }, { type: i7.NovoCell, selector: "novo-cell", inputs: ["row", "column"] }, { type: i8.NovoHeaderRow, selector: "novo-header-row" }, { type: i8.NovoRow, selector: "novo-table-row" }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i11.NovoSortFilter, selector: "[novoSortFilter]", exportAs: ["sort"] }, { type: i11.NovoSelection, selector: "[novoSelection]", outputs: ["novoSelectAllToggle"] }, { type: i7.NovoColumnDef, selector: "[novoColumnDef]", inputs: ["novoColumnDef"] }, { type: i7.NovoHeaderCellDef, selector: "[novoHeaderCellDef]" }, { type: i7.NovoCellDef, selector: "[novoCellDef]" }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.NovoEmptyHeaderCell, selector: "novo-empty-header-cell" }, { type: i7.NovoHeaderCell, selector: "novo-header-cell", inputs: ["column"] }, { type: i8.NovoHeaderRowDef, selector: "[novoHeaderRowDef]", inputs: ["novoHeaderRowDef"] }, { type: i8.NovoRowDef, selector: "[novoRowDef]", inputs: ["novoRowDefColumns"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTable, decorators: [{
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
      <novo-table-pagination
        *ngIf="paginationOptions"
        [length]="dataSource?.total"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
      >
      </novo-table-pagination>
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
        <novo-table
          *ngIf="columns?.length > 0"
          [dataSource]="dataSource"
          novoSortFilter
          novoSelection
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="dataSource?.totallyEmpty && !state.userFiltered"
        >
          <ng-content></ng-content>
          <ng-container novoColumnDef="selection">
            <novo-checkbox-header-cell *novoHeaderCellDef></novo-checkbox-header-cell>
            <novo-checkbox-cell *novoCellDef="let row; let i = index" [row]="row" [index]="i"></novo-checkbox-cell>
          </ng-container>
          <ng-container *ngFor="let column of actionColumns" [novoColumnDef]="column.id">
            <novo-empty-header-cell
              [class.button-header-cell]="!column.options"
              [class.dropdown-header-cell]="column.options"
              *novoHeaderCellDef
            ></novo-empty-header-cell>
            <novo-action-cell *novoCellDef="let row; let i = index" [row]="row" [column]="column"></novo-action-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns" [novoColumnDef]="column.id">
            <novo-header-cell *novoHeaderCellDef [column]="column">{{ column.label }}</novo-header-cell>
            <novo-cell *novoCellDef="let row" [column]="column" [row]="row"></novo-cell>
          </ng-container>
          <novo-header-row *novoHeaderRowDef="displayedColumns"></novo-header-row>
          <novo-table-row *novoRowDef="let row; columns: displayedColumns"></novo-table-row>
        </novo-table>
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
                    providers: [
                        NovoActivityTableState,
                        { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
                        { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i2.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i3.NovoActivityTableState }]; }, propDecorators: { globalSearchHiddenClassToggle: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4SCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUlMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7OztBQVEvRSxNQUFNLE9BQU8sU0FBYSxTQUFRLFFBQVc7O3VHQUFoQyxTQUFTOzJGQUFULFNBQVM7NEZBQVQsU0FBUztrQkFOckIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOztBQVFELE1BQU0sT0FBTyx3QkFBd0I7O3NIQUF4Qix3QkFBd0I7MEdBQXhCLHdCQUF3Qjs0RkFBeEIsd0JB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VUYsZ0JBQWdCO3NCQURuQixLQUFLO2dCQVdGLEtBQUs7c0JBRFIsS0FBSztnQkFlRixLQUFLO3NCQURSLFdBQVc7dUJBQUMsYUFBYTtnQkFNdEIsWUFBWTtzQkFEZixXQUFXO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgX0Rpc3Bvc2VWaWV3UmVwZWF0ZXJTdHJhdGVneSwgX1ZJRVdfUkVQRUFURVJfU1RSQVRFR1kgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQ2RrVGFibGUsIENES19UQUJMRV9URU1QTEFURSwgX0NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLCBfQ09BTEVTQ0VEX1NUWUxFX1NDSEVEVUxFUiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IG5vdGlmeSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUYWJsZUFjdGlvbkNvbHVtbiwgVGFibGVDb2x1bW4sIFRhYmxlUGFnaW5hdGlvbk9wdGlvbnMsIFRhYmxlU2VhcmNoT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBBY3Rpdml0eVRhYmxlRGF0YVNvdXJjZSwgQWN0aXZpdHlUYWJsZVNlcnZpY2UgfSBmcm9tICcuL3RhYmxlLXNvdXJjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGFibGUsW25vdm8tdGFibGVdJyxcbiAgdGVtcGxhdGU6IENES19UQUJMRV9URU1QTEFURSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJsZTxUPiBleHRlbmRzIENka1RhYmxlPFQ+IHtcbiAgLy8gVE9ETzogYWRkIGV4cGxpY2l0IGNvbnN0cnVjdG9yXG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25vdm8tYWN0aXZpdHktdGFibGUtYWN0aW9ucycsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLWN1c3RvbS1oZWFkZXInLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUhlYWRlciB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLWN1c3RvbS1maWx0ZXInLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlciB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLWVtcHR5LW1lc3NhZ2UnLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLW5vLXJlc3VsdHMtbWVzc2FnZScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BY3Rpdml0eVRhYmxlTm9SZXN1bHRzTWVzc2FnZSB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiZGVidWdcIj5cbiAgICAgIDxwPlRvdGFsOiB7eyBkYXRhU291cmNlPy50b3RhbCB9fTwvcD5cbiAgICAgIDxwPkN1cnJlbnQ6IHt7IGRhdGFTb3VyY2U/LmN1cnJlbnQgfX08L3A+XG4gICAgICA8cD5Ub3RhbGx5IEVtcHR5OiB7eyBkYXRhU291cmNlPy50b3RhbGx5RW1wdHkgfX08L3A+XG4gICAgICA8cD5DdXJyZW50bHkgRW1wdHk6IHt7IGRhdGFTb3VyY2U/LmN1cnJlbnRseUVtcHR5IH19PC9wPlxuICAgICAgPHA+TG9hZGluZyAoRGF0YVNvdXJjZSk6IHt7IGRhdGFTb3VyY2U/LmxvYWRpbmcgfX08L3A+XG4gICAgICA8cD5Vc2VyIEZpbHRlcmVkOiB7eyBzdGF0ZS51c2VyRmlsdGVyZWQgfX08L3A+XG4gICAgICA8cD5Mb2FkaW5nIChUYWJsZSk6IHt7IGxvYWRpbmcgfX08L3A+XG4gICAgPC9kaXY+XG4gICAgPGhlYWRlciAqbmdJZj1cIighKGRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhc3RhdGUudXNlckZpbHRlcmVkKSAmJiAhbG9hZGluZykgfHwgZm9yY2VTaG93SGVhZGVyXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbm92by1hY3Rpdml0eS10YWJsZS1jdXN0b20taGVhZGVyXVwiPjwvbmctY29udGVudD5cbiAgICAgIDxub3ZvLXNlYXJjaFxuICAgICAgICBhbHdheXNPcGVuPVwidHJ1ZVwiXG4gICAgICAgIChzZWFyY2hDaGFuZ2VkKT1cIm9uU2VhcmNoQ2hhbmdlKCRldmVudClcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cInN0YXRlLmdsb2JhbFNlYXJjaFwiXG4gICAgICAgICpuZ0lmPVwiIWhpZGVHbG9iYWxTZWFyY2hcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwic2VhcmNoT3B0aW9ucz8ucGxhY2Vob2xkZXJcIlxuICAgICAgICBbaGludF09XCJzZWFyY2hPcHRpb25zPy50b29sdGlwXCJcbiAgICAgID5cbiAgICAgIDwvbm92by1zZWFyY2g+XG4gICAgICA8bm92by10YWJsZS1wYWdpbmF0aW9uXG4gICAgICAgICpuZ0lmPVwicGFnaW5hdGlvbk9wdGlvbnNcIlxuICAgICAgICBbbGVuZ3RoXT1cImRhdGFTb3VyY2U/LnRvdGFsXCJcbiAgICAgICAgW3BhZ2VdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVwiXG4gICAgICAgIFtwYWdlU2l6ZV09XCJwYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZVwiXG4gICAgICAgIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVPcHRpb25zXCJcbiAgICAgID5cbiAgICAgIDwvbm92by10YWJsZS1wYWdpbmF0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtYWN0aW9uc1wiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbm92by1hY3Rpdml0eS10YWJsZS1hY3Rpb25zXVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWxvYWRpbmctbWFza1wiICpuZ0lmPVwiZGF0YVNvdXJjZT8ubG9hZGluZyB8fCBsb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1hY3Rpdml0eS10YWJsZS1sb2FkaW5nXCI+XG4gICAgICA8bm92by1sb2FkaW5nPjwvbm92by1sb2FkaW5nPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWZpbHRlci1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWN1c3RvbS1maWx0ZXJcIiAqbmdJZj1cImN1c3RvbUZpbHRlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbm92by1hY3Rpdml0eS10YWJsZS1jdXN0b20tZmlsdGVyXVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtY29udGFpbmVyXCI+XG4gICAgICAgIDxub3ZvLXRhYmxlXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW5zPy5sZW5ndGggPiAwXCJcbiAgICAgICAgICBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCJcbiAgICAgICAgICBub3ZvU29ydEZpbHRlclxuICAgICAgICAgIG5vdm9TZWxlY3Rpb25cbiAgICAgICAgICBbY2xhc3MuZW1wdHldPVwiZGF0YVNvdXJjZT8uY3VycmVudGx5RW1wdHkgJiYgc3RhdGUudXNlckZpbHRlcmVkXCJcbiAgICAgICAgICBbaGlkZGVuXT1cImRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhc3RhdGUudXNlckZpbHRlcmVkXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICA8bmctY29udGFpbmVyIG5vdm9Db2x1bW5EZWY9XCJzZWxlY3Rpb25cIj5cbiAgICAgICAgICAgIDxub3ZvLWNoZWNrYm94LWhlYWRlci1jZWxsICpub3ZvSGVhZGVyQ2VsbERlZj48L25vdm8tY2hlY2tib3gtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bm92by1jaGVja2JveC1jZWxsICpub3ZvQ2VsbERlZj1cImxldCByb3c7IGxldCBpID0gaW5kZXhcIiBbcm93XT1cInJvd1wiIFtpbmRleF09XCJpXCI+PC9ub3ZvLWNoZWNrYm94LWNlbGw+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGFjdGlvbkNvbHVtbnNcIiBbbm92b0NvbHVtbkRlZl09XCJjb2x1bW4uaWRcIj5cbiAgICAgICAgICAgIDxub3ZvLWVtcHR5LWhlYWRlci1jZWxsXG4gICAgICAgICAgICAgIFtjbGFzcy5idXR0b24taGVhZGVyLWNlbGxdPVwiIWNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmRyb3Bkb3duLWhlYWRlci1jZWxsXT1cImNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgKm5vdm9IZWFkZXJDZWxsRGVmXG4gICAgICAgICAgICA+PC9ub3ZvLWVtcHR5LWhlYWRlci1jZWxsPlxuICAgICAgICAgICAgPG5vdm8tYWN0aW9uLWNlbGwgKm5vdm9DZWxsRGVmPVwibGV0IHJvdzsgbGV0IGkgPSBpbmRleFwiIFtyb3ddPVwicm93XCIgW2NvbHVtbl09XCJjb2x1bW5cIj48L25vdm8tYWN0aW9uLWNlbGw+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIiBbbm92b0NvbHVtbkRlZl09XCJjb2x1bW4uaWRcIj5cbiAgICAgICAgICAgIDxub3ZvLWhlYWRlci1jZWxsICpub3ZvSGVhZGVyQ2VsbERlZiBbY29sdW1uXT1cImNvbHVtblwiPnt7IGNvbHVtbi5sYWJlbCB9fTwvbm92by1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxub3ZvLWNlbGwgKm5vdm9DZWxsRGVmPVwibGV0IHJvd1wiIFtjb2x1bW5dPVwiY29sdW1uXCIgW3Jvd109XCJyb3dcIj48L25vdm8tY2VsbD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bm92by1oZWFkZXItcm93ICpub3ZvSGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvbm92by1oZWFkZXItcm93PlxuICAgICAgICAgIDxub3ZvLXRhYmxlLXJvdyAqbm92b1Jvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnNcIj48L25vdm8tdGFibGUtcm93PlxuICAgICAgICA8L25vdm8tdGFibGU+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtbm8tcmVzdWx0cy1jb250YWluZXJcIlxuICAgICAgICAgICpuZ0lmPVwiZGF0YVNvdXJjZT8uY3VycmVudGx5RW1wdHkgJiYgc3RhdGUudXNlckZpbHRlcmVkICYmICFkYXRhU291cmNlPy5sb2FkaW5nICYmICFsb2FkaW5nICYmICFkYXRhU291cmNlLnByaXN0aW5lXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgI2ZpbHRlcmVkPjxuZy1jb250ZW50IHNlbGVjdD1cIltub3ZvLWFjdGl2aXR5LXRhYmxlLW5vLXJlc3VsdHMtbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiZmlsdGVyZWQuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLXNlYXJjaC1xdWVzdGlvblwiPjwvaT4ge3sgbGFiZWxzLm5vTWF0Y2hpbmdSZWNvcmRzTWVzc2FnZSB9fTwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWVtcHR5LWNvbnRhaW5lclwiXG4gICAgICAgICAgKm5nSWY9XCJkYXRhU291cmNlPy50b3RhbGx5RW1wdHkgJiYgIWRhdGFTb3VyY2U/LmxvYWRpbmcgJiYgIWxvYWRpbmcgJiYgIXN0YXRlLnVzZXJGaWx0ZXJlZCAmJiAhZGF0YVNvdXJjZS5wcmlzdGluZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2ICNlbXB0eT48bmctY29udGVudCBzZWxlY3Q9XCJbbm92by1hY3Rpdml0eS10YWJsZS1lbXB0eS1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJlbXB0eS5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMuZW1wdHlUYWJsZU1lc3NhZ2UgfX08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTm92b0FjdGl2aXR5VGFibGVTdGF0ZSxcbiAgICB7IHByb3ZpZGU6IF9WSUVXX1JFUEVBVEVSX1NUUkFURUdZLCB1c2VDbGFzczogX0Rpc3Bvc2VWaWV3UmVwZWF0ZXJTdHJhdGVneSB9LFxuICAgIHsgcHJvdmlkZTogX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVIsIHVzZUNsYXNzOiBfQ29hbGVzY2VkU3R5bGVTY2hlZHVsZXIgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FjdGl2aXR5VGFibGU8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZ2xvYmFsLXNlYXJjaC1oaWRkZW4nKVxuICBnbG9iYWxTZWFyY2hIaWRkZW5DbGFzc1RvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGFjdGl2aXR5U2VydmljZTogQWN0aXZpdHlUYWJsZVNlcnZpY2U8VD47XG4gIEBJbnB1dCgpXG4gIGNvbHVtbnM6IFRhYmxlQ29sdW1uPFQ+W107XG4gIEBJbnB1dCgpXG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKVxuICBhY3Rpb25Db2x1bW5zOiBUYWJsZUFjdGlvbkNvbHVtbjxUPltdO1xuICBASW5wdXQoKVxuICBwYWdpbmF0aW9uT3B0aW9uczogVGFibGVQYWdpbmF0aW9uT3B0aW9ucztcbiAgQElucHV0KClcbiAgc2VhcmNoT3B0aW9uczogVGFibGVTZWFyY2hPcHRpb25zO1xuICBASW5wdXQoKVxuICBkZWZhdWx0U29ydDogeyBpZDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH07XG4gIEBJbnB1dCgpXG4gIG91dHNpZGVGaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjdXN0b21GaWx0ZXIodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2N1c3RvbUZpbHRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgY3VzdG9tRmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXN0b21GaWx0ZXI7XG4gIH1cbiAgcHJpdmF0ZSBfY3VzdG9tRmlsdGVyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JjZVNob3dIZWFkZXIodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZvcmNlU2hvd0hlYWRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgZm9yY2VTaG93SGVhZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3JjZVNob3dIZWFkZXI7XG4gIH1cbiAgcHJpdmF0ZSBfZm9yY2VTaG93SGVhZGVyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlR2xvYmFsU2VhcmNoKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICAgIHRoaXMuZ2xvYmFsU2VhcmNoSGlkZGVuQ2xhc3NUb2dnbGUgPSB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoO1xuICB9XG4gIGdldCBoaWRlR2xvYmFsU2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLl9oaWRlR2xvYmFsU2VhcmNoO1xuICB9XG4gIHByaXZhdGUgX2hpZGVHbG9iYWxTZWFyY2g6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGRlYnVnKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kZWJ1ZyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgZGVidWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlYnVnO1xuICB9XG4gIHByaXZhdGUgX2RlYnVnOiBib29sZWFuO1xuXG4gIHB1YmxpYyBkYXRhU291cmNlOiBBY3Rpdml0eVRhYmxlRGF0YVNvdXJjZTxUPjtcbiAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHByaXZhdGUgb3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW1wdHknKVxuICBnZXQgZW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLmRhdGFTb3VyY2UudG90YWxseUVtcHR5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5sb2FkaW5nJylcbiAgZ2V0IGxvYWRpbmdDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nIHx8ICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5kYXRhU291cmNlLmxvYWRpbmcpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgc3RhdGU6IE5vdm9BY3Rpdml0eVRhYmxlU3RhdGUpIHtcbiAgICBub3RpZnkoJ1tEZXByZWNhdGVkXTogVGhlIHNpbXBsZSB0YWJsZSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgbWlncmF0ZSB0byBub3ZvLWRhdGEtdGFibGVzIScpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBjaGFuZ2VzLmFjdGl2aXR5U2VydmljZSAmJiAhY2hhbmdlcy5hY3Rpdml0eVNlcnZpY2UuY3VycmVudFZhbHVlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICBpZiAoY2hhbmdlcy5hY3Rpdml0eVNlcnZpY2UgJiYgY2hhbmdlcy5hY3Rpdml0eVNlcnZpY2UuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBBY3Rpdml0eVRhYmxlRGF0YVNvdXJjZTxUPih0aGlzLmFjdGl2aXR5U2VydmljZSwgdGhpcy5zdGF0ZSwgdGhpcy5yZWYpO1xuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5vdXRzaWRlRmlsdGVyICYmIGNoYW5nZXMub3V0c2lkZUZpbHRlci5jdXJyZW50VmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMub3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMub3V0c2lkZUZpbHRlci5zdWJzY3JpYmUoKGZpbHRlcjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5vdXRzaWRlRmlsdGVyID0gZmlsdGVyO1xuICAgICAgICAgIHRoaXMuc3RhdGUudXBkYXRlcy5uZXh0KHsgZ2xvYmFsU2VhcmNoOiB0aGlzLnN0YXRlLmdsb2JhbFNlYXJjaCwgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlciwgc29ydDogdGhpcy5zdGF0ZS5zb3J0IH0pO1xuICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2UgPSAwO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZSkge1xuICAgICAgdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZSA9IDUwO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZU9wdGlvbnMpIHtcbiAgICAgIHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVPcHRpb25zID0gWzEwLCAyNSwgNTAsIDEwMF07XG4gICAgfVxuICAgIHRoaXMuc3RhdGUucGFnZSA9IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgPyB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2UgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZS5wYWdlU2l6ZSA9IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgPyB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplIDogdW5kZWZpbmVkO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIG9uU2VhcmNoQ2hhbmdlKHRlcm06IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoID0gdGVybTtcbiAgICB0aGlzLnN0YXRlLnJlc2V0KGZhbHNlLCB0cnVlKTtcbiAgICB0aGlzLnN0YXRlLnVwZGF0ZXMubmV4dCh7IGdsb2JhbFNlYXJjaDogdGVybSwgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlciwgc29ydDogdGhpcy5zdGF0ZS5zb3J0IH0pO1xuICB9XG59XG4iXX0=