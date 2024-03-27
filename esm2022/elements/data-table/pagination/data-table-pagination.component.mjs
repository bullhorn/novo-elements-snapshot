import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { DataTableState } from '../state/data-table-state.service';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "../state/data-table-state.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "novo-elements/elements/button";
import * as i6 from "novo-elements/elements/loading";
import * as i7 from "novo-elements/elements/tiles";
import * as i8 from "novo-elements/elements/common";
import * as i9 from "novo-elements/elements/select";
const MAX_PAGES_DISPLAYED = 5;
export class NovoDataTablePagination {
    get page() {
        return this._page;
    }
    set page(page) {
        this._page = page;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.state.page = this._page;
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(pageSize) {
        this._pageSize = pageSize;
        this.updateDisplayedPageSizeOptions();
        this.state.pageSize = this._pageSize;
    }
    get pageSizeOptions() {
        return this._pageSizeOptions;
    }
    set pageSizeOptions(pageSizeOptions) {
        this._pageSizeOptions = pageSizeOptions;
        this.updateDisplayedPageSizeOptions();
    }
    get length() {
        return this._length;
    }
    set length(length) {
        this._length = length;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
    }
    constructor(changeDetectorRef, labels, state) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this.theme = 'standard';
        this._page = 0;
        this._pageSizeOptions = [];
        this.canSelectAll = false;
        this.allMatchingSelected = false;
        this.loading = false;
        this.errorLoading = false;
        this.paginationRefreshSubject = new Subject();
        this._length = 0;
        this.pageChange = new EventEmitter();
        this.resetSubscription = this.state.resetSource.subscribe(() => {
            this.page = 0;
            this.changeDetectorRef.markForCheck();
        });
    }
    ngOnInit() {
        this._initialized = true;
        this.updateDisplayedPageSizeOptions();
    }
    ngOnDestroy() {
        this.resetSubscription.unsubscribe();
    }
    selectPage(page) {
        this.state.checkRetainment('page', this.canSelectAll && this.allMatchingSelected);
        this.page = page;
        this.emitPageEvent();
    }
    nextPage() {
        this.state.checkRetainment('page', this.canSelectAll && this.allMatchingSelected);
        if (!this.hasNextPage()) {
            return;
        }
        this.page++;
        this.pages = this.getPages(this.page, this.totalPages);
        this.emitPageEvent();
    }
    previousPage() {
        this.state.checkRetainment('page', this.canSelectAll && this.allMatchingSelected);
        if (!this.hasPreviousPage()) {
            return;
        }
        this.page--;
        this.pages = this.getPages(this.page, this.totalPages);
        this.emitPageEvent();
    }
    hasPreviousPage() {
        return this.page >= 1 && this.pageSize !== 0;
    }
    hasNextPage() {
        const numberOfPages = Math.ceil(this.length / this.pageSize) - 1;
        return this.page < numberOfPages && this.pageSize !== 0;
    }
    changePageSize(pageSize) {
        this.page = 0;
        this.pageSize = pageSize;
        this.emitPageEvent(true);
    }
    updateDisplayedPageSizeOptions() {
        if (!this._initialized) {
            return;
        }
        if (!this.displayedPageSizeOptions) {
            this.displayedPageSizeOptions = [];
            this.pageSizeOptions.forEach((option) => {
                if (option.hasOwnProperty('value')) {
                    this.displayedPageSizeOptions.push(option);
                }
                else {
                    this.displayedPageSizeOptions.push({
                        value: option,
                        label: option,
                    });
                }
            });
        }
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.changeDetectorRef.detectChanges();
    }
    emitPageEvent(isPageSizeChange = false) {
        const event = {
            page: this.page,
            pageSize: this.pageSize,
            length: this.length,
            filter: this.state.filter,
            sort: this.state.sort,
        };
        this.pageChange.next(event);
        this.state.page = this.page;
        this.state.pageSize = this.pageSize;
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.state.updates.next(event);
        this.state.onPaginationChange(isPageSizeChange, this.pageSize);
    }
    calculateTotalPages() {
        const totalPages = this.pageSize < 1 ? 1 : Math.ceil(this.length / this.pageSize);
        return Math.max(totalPages || 0, 1);
    }
    makePage(number, text, isActive) {
        return {
            number,
            text,
            active: isActive,
        };
    }
    getPages(currentPage, totalPages) {
        const pages = [];
        // Default page limits
        let startPage = 1;
        let endPage = totalPages;
        const isMaxSized = MAX_PAGES_DISPLAYED < totalPages;
        // Recompute if maxPagesDisplayed
        if (isMaxSized) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2), 1);
            endPage = startPage + MAX_PAGES_DISPLAYED - 1;
            // Adjust if limit is exceeded
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - MAX_PAGES_DISPLAYED + 1;
            }
        }
        // Add page number links
        for (let number = startPage; number <= endPage; number++) {
            const page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }
        return pages;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDataTablePagination, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NovoLabelService }, { token: i2.DataTableState }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDataTablePagination, selector: "novo-data-table-pagination", inputs: { theme: "theme", page: "page", pageSize: "pageSize", dataFeatureId: "dataFeatureId", pageSizeOptions: "pageSizeOptions", canSelectAll: "canSelectAll", allMatchingSelected: "allMatchingSelected", loading: "loading", errorLoading: "errorLoading", paginationRefreshSubject: "paginationRefreshSubject", length: "length" }, outputs: { pageChange: "pageChange" }, host: { properties: { "class": "this.theme" } }, ngImport: i0, template: `
    <ng-container *ngIf="theme === 'basic' || theme === 'basic-wide'">
      <div class="novo-data-table-pagination-size">
        <novo-tiles
          class="pagination-tiles"
          *ngIf="displayedPageSizeOptions.length > 1"
          [(ngModel)]="pageSize"
          [options]="displayedPageSizeOptions"
          (onChange)="changePageSize($event)"
          data-automation-id="novo-data-table-pagination-tiles"
        >
        </novo-tiles>
        <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
      </div>

      <div class="novo-data-table-range-label-long" data-automation-id="novo-data-table-pagination-range-label-long">
        {{ longRangeLabel }}
      </div>
      <div class="novo-data-table-range-label-short" data-automation-id="novo-data-table-pagination-range-label-short">
        {{ shortRangeLabel }}
      </div>
      <span class="spacer novo-data-table-spacer" *ngIf="theme === 'basic-wide'"></span>
      <novo-button
        theme="dialogue"
        type="button"
        class="novo-data-table-pagination-navigation-previous"
        (click)="previousPage()"
        icon="previous"
        side="left"
        [disabled]="!hasPreviousPage()"
        data-automation-id="novo-data-table-pagination-previous"
      >
        <span>{{ labels.previous }}</span>
      </novo-button>
      <novo-button
        theme="dialogue"
        type="button"
        class="novo-data-table-pagination-navigation-next"
        (click)="nextPage()"
        icon="next"
        side="right"
        [disabled]="!hasNextPage()"
        data-automation-id="novo-data-table-pagination-next"
      >
        <span>{{ labels.next }}</span>
      </novo-button>
    </ng-container>
    <ng-container *ngIf="theme === 'standard'">
      <h5 class="rows">{{ labels.itemsPerPage }}</h5>
      <novo-select
        [options]="displayedPageSizeOptions"
        [placeholder]="labels.select"
        [(ngModel)]="pageSize"
        (onSelect)="changePageSize($event.selected)"
        data-automation-id="pager-select"
        [attr.data-feature-id]="dataFeatureId"
      >
      </novo-select>
      <span class="spacer"></span>
      <ul *ngIf="!loading && !errorLoading" class="pager" data-automation-id="pager">
        <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: page === 0 }">
          <i class="bhi-previous" data-automation-id="pager-previous"></i>
        </li>
        <li class="page" [ngClass]="{ active: p.number === page + 1 }" *ngFor="let p of pages" (click)="selectPage(p.number - 1)">
          {{ p.text }}
        </li>
        <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: page + 1 === totalPages }">
          <i class="bhi-next" data-automation-id="pager-next"></i>
        </li>
      </ul>
      <novo-loading *ngIf="loading"></novo-loading>
      <button *ngIf="errorLoading"
              theme="primary"
              color="negative"
              icon="refresh"
              (click)="paginationRefreshSubject.next()">{{ labels.refreshPagination }}</button>
    </ng-container>
  `, isInline: true, styles: [":host.basic,:host.basic-wide{display:flex;align-items:center;flex:1}:host.basic ::ng-deep novo-tiles.pagination-tiles>.tile-container .tile,:host.basic-wide ::ng-deep novo-tiles.pagination-tiles>.tile-container .tile{padding:7px 10px}:host.basic>.novo-data-table-pagination-size,:host.basic-wide>.novo-data-table-pagination-size{padding-right:10px}:host.basic>.novo-data-table-range-label-long,:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-short{padding-right:10px;white-space:nowrap}:host.basic>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-long{display:none}@media (min-width: 1000px){:host.basic>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-long{display:block}}:host.basic>.novo-data-table-spacer,:host.basic-wide>.novo-data-table-spacer{width:100%}:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-short{display:block}@media (min-width: 1000px){:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-short{display:none}}:host.basic>button:first-of-type,:host.basic-wide>button:first-of-type{margin-right:5px}:host.basic>button span,:host.basic-wide>button span{display:none}@media (min-width: 1000px){:host.basic>button span,:host.basic-wide>button span{display:block}}:host.basic>button[theme][theme=dialogue][icon][side=left],:host.basic-wide>button[theme][theme=dialogue][icon][side=left]{padding:5px}@media (min-width: 1000px){:host.basic>button[theme][theme=dialogue][icon][side=left],:host.basic-wide>button[theme][theme=dialogue][icon][side=left]{padding:5px 15px 5px 5px}}:host.basic>button[theme][theme=dialogue][icon][side=right],:host.basic-wide>button[theme][theme=dialogue][icon][side=right]{padding:5px}@media (min-width: 1000px){:host.basic>button[theme][theme=dialogue][icon][side=right],:host.basic-wide>button[theme][theme=dialogue][icon][side=right]{padding:5px 5px 5px 15px}}:host.standard{display:flex;flex-flow:row nowrap;flex:1}:host.standard>*{margin:auto 5px}:host.standard h5.rows{padding:0;font-size:12px;opacity:.75;letter-spacing:.1px}:host.standard span.spacer{flex:1}:host.standard novo-select{max-width:100px;min-width:100px}:host.standard novo-select div[type=button]:hover i{opacity:.75}:host.standard novo-select div[type=button]:active i,:host.standard novo-select div[type=button]:focus i{opacity:1}:host.standard novo-select div[type=button] i{opacity:.45}:host.standard .pager{list-style-type:none;-webkit-user-select:none;user-select:none;display:flex}:host.standard .pager .page{display:flex;justify-content:center;align-items:center;width:2.4rem;height:2.4rem;font-size:var(--font-size-text);border-radius:2px;list-style-type:none;cursor:pointer;color:#39d}:host.standard .pager .page.disabled{opacity:.3;pointer-events:none}:host.standard .pager .page.active{color:#39d;background-color:#0000001a;opacity:1}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i5.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "component", type: i6.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i7.NovoTilesElement, selector: "novo-tiles", inputs: ["name", "options", "required", "controlDisabled"], outputs: ["onChange", "onSelectedOptionClick", "onDisabledOptionClick"] }, { kind: "directive", type: i8.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i9.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDataTablePagination, decorators: [{
            type: Component,
            args: [{ selector: 'novo-data-table-pagination', template: `
    <ng-container *ngIf="theme === 'basic' || theme === 'basic-wide'">
      <div class="novo-data-table-pagination-size">
        <novo-tiles
          class="pagination-tiles"
          *ngIf="displayedPageSizeOptions.length > 1"
          [(ngModel)]="pageSize"
          [options]="displayedPageSizeOptions"
          (onChange)="changePageSize($event)"
          data-automation-id="novo-data-table-pagination-tiles"
        >
        </novo-tiles>
        <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
      </div>

      <div class="novo-data-table-range-label-long" data-automation-id="novo-data-table-pagination-range-label-long">
        {{ longRangeLabel }}
      </div>
      <div class="novo-data-table-range-label-short" data-automation-id="novo-data-table-pagination-range-label-short">
        {{ shortRangeLabel }}
      </div>
      <span class="spacer novo-data-table-spacer" *ngIf="theme === 'basic-wide'"></span>
      <novo-button
        theme="dialogue"
        type="button"
        class="novo-data-table-pagination-navigation-previous"
        (click)="previousPage()"
        icon="previous"
        side="left"
        [disabled]="!hasPreviousPage()"
        data-automation-id="novo-data-table-pagination-previous"
      >
        <span>{{ labels.previous }}</span>
      </novo-button>
      <novo-button
        theme="dialogue"
        type="button"
        class="novo-data-table-pagination-navigation-next"
        (click)="nextPage()"
        icon="next"
        side="right"
        [disabled]="!hasNextPage()"
        data-automation-id="novo-data-table-pagination-next"
      >
        <span>{{ labels.next }}</span>
      </novo-button>
    </ng-container>
    <ng-container *ngIf="theme === 'standard'">
      <h5 class="rows">{{ labels.itemsPerPage }}</h5>
      <novo-select
        [options]="displayedPageSizeOptions"
        [placeholder]="labels.select"
        [(ngModel)]="pageSize"
        (onSelect)="changePageSize($event.selected)"
        data-automation-id="pager-select"
        [attr.data-feature-id]="dataFeatureId"
      >
      </novo-select>
      <span class="spacer"></span>
      <ul *ngIf="!loading && !errorLoading" class="pager" data-automation-id="pager">
        <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: page === 0 }">
          <i class="bhi-previous" data-automation-id="pager-previous"></i>
        </li>
        <li class="page" [ngClass]="{ active: p.number === page + 1 }" *ngFor="let p of pages" (click)="selectPage(p.number - 1)">
          {{ p.text }}
        </li>
        <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: page + 1 === totalPages }">
          <i class="bhi-next" data-automation-id="pager-next"></i>
        </li>
      </ul>
      <novo-loading *ngIf="loading"></novo-loading>
      <button *ngIf="errorLoading"
              theme="primary"
              color="negative"
              icon="refresh"
              (click)="paginationRefreshSubject.next()">{{ labels.refreshPagination }}</button>
    </ng-container>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host.basic,:host.basic-wide{display:flex;align-items:center;flex:1}:host.basic ::ng-deep novo-tiles.pagination-tiles>.tile-container .tile,:host.basic-wide ::ng-deep novo-tiles.pagination-tiles>.tile-container .tile{padding:7px 10px}:host.basic>.novo-data-table-pagination-size,:host.basic-wide>.novo-data-table-pagination-size{padding-right:10px}:host.basic>.novo-data-table-range-label-long,:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-short{padding-right:10px;white-space:nowrap}:host.basic>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-long{display:none}@media (min-width: 1000px){:host.basic>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-long{display:block}}:host.basic>.novo-data-table-spacer,:host.basic-wide>.novo-data-table-spacer{width:100%}:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-short{display:block}@media (min-width: 1000px){:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-short{display:none}}:host.basic>button:first-of-type,:host.basic-wide>button:first-of-type{margin-right:5px}:host.basic>button span,:host.basic-wide>button span{display:none}@media (min-width: 1000px){:host.basic>button span,:host.basic-wide>button span{display:block}}:host.basic>button[theme][theme=dialogue][icon][side=left],:host.basic-wide>button[theme][theme=dialogue][icon][side=left]{padding:5px}@media (min-width: 1000px){:host.basic>button[theme][theme=dialogue][icon][side=left],:host.basic-wide>button[theme][theme=dialogue][icon][side=left]{padding:5px 15px 5px 5px}}:host.basic>button[theme][theme=dialogue][icon][side=right],:host.basic-wide>button[theme][theme=dialogue][icon][side=right]{padding:5px}@media (min-width: 1000px){:host.basic>button[theme][theme=dialogue][icon][side=right],:host.basic-wide>button[theme][theme=dialogue][icon][side=right]{padding:5px 5px 5px 15px}}:host.standard{display:flex;flex-flow:row nowrap;flex:1}:host.standard>*{margin:auto 5px}:host.standard h5.rows{padding:0;font-size:12px;opacity:.75;letter-spacing:.1px}:host.standard span.spacer{flex:1}:host.standard novo-select{max-width:100px;min-width:100px}:host.standard novo-select div[type=button]:hover i{opacity:.75}:host.standard novo-select div[type=button]:active i,:host.standard novo-select div[type=button]:focus i{opacity:1}:host.standard novo-select div[type=button] i{opacity:.45}:host.standard .pager{list-style-type:none;-webkit-user-select:none;user-select:none;display:flex}:host.standard .pager .page{display:flex;justify-content:center;align-items:center;width:2.4rem;height:2.4rem;font-size:var(--font-size-text);border-radius:2px;list-style-type:none;cursor:pointer;color:#39d}:host.standard .pager .page.disabled{opacity:.3;pointer-events:none}:host.standard .pager .page.active{color:#39d;background-color:#0000001a;opacity:1}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.NovoLabelService }, { type: i2.DataTableState }], propDecorators: { theme: [{
                type: HostBinding,
                args: ['class']
            }, {
                type: Input
            }], page: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], dataFeatureId: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], canSelectAll: [{
                type: Input
            }], allMatchingSelected: [{
                type: Input
            }], loading: [{
                type: Input
            }], errorLoading: [{
                type: Input
            }], paginationRefreshSubject: [{
                type: Input
            }], length: [{
                type: Input
            }], pageChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1wYWdpbmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RhdGEtdGFibGUvcGFnaW5hdGlvbi9kYXRhLXRhYmxlLXBhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFHTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7OztBQUVuRSxNQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQXFGOUIsTUFBTSxPQUFPLHVCQUF1QjtJQUtsQyxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FB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LFlBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZFVCxtQkFFZ0IsdUJBQXVCLENBQUMsTUFBTTtrSkFLL0MsS0FBSztzQkFGSixXQUFXO3VCQUFDLE9BQU87O3NCQUNuQixLQUFLO2dCQUlGLElBQUk7c0JBRFAsS0FBSztnQkFjRixRQUFRO3NCQURYLEtBQUs7Z0JBVUcsYUFBYTtzQkFBckIsS0FBSztnQkFHRixlQUFlO3NCQURsQixLQUFLO2dCQVdDLFlBQVk7c0JBRGxCLEtBQUs7Z0JBR0MsbUJBQW1CO3NCQUR6QixLQUFLO2dCQUdDLE9BQU87c0JBRGIsS0FBSztnQkFHQyxZQUFZO3NCQURsQixLQUFLO2dCQUdDLHdCQUF3QjtzQkFEOUIsS0FBSztnQkFJRixNQUFNO3NCQURULEtBQUs7Z0JBY0ksVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IElEYXRhVGFibGVQYWdpbmF0aW9uRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcblxuY29uc3QgTUFYX1BBR0VTX0RJU1BMQVlFRCA9IDU7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGhlbWUgPT09ICdiYXNpYycgfHwgdGhlbWUgPT09ICdiYXNpYy13aWRlJ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uLXNpemVcIj5cbiAgICAgICAgPG5vdm8tdGlsZXNcbiAgICAgICAgICBjbGFzcz1cInBhZ2luYXRpb24tdGlsZXNcIlxuICAgICAgICAgICpuZ0lmPVwiZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLmxlbmd0aCA+IDFcIlxuICAgICAgICAgIFsobmdNb2RlbCldPVwicGFnZVNpemVcIlxuICAgICAgICAgIFtvcHRpb25zXT1cImRpc3BsYXllZFBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAgICAgKG9uQ2hhbmdlKT1cImNoYW5nZVBhZ2VTaXplKCRldmVudClcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uLXRpbGVzXCJcbiAgICAgICAgPlxuICAgICAgICA8L25vdm8tdGlsZXM+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJkaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMubGVuZ3RoIDw9IDFcIj57eyBwYWdlU2l6ZSB9fTwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtcmFuZ2UtbGFiZWwtbG9uZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uLXJhbmdlLWxhYmVsLWxvbmdcIj5cbiAgICAgICAge3sgbG9uZ1JhbmdlTGFiZWwgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1yYW5nZS1sYWJlbC1zaG9ydFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uLXJhbmdlLWxhYmVsLXNob3J0XCI+XG4gICAgICAgIHt7IHNob3J0UmFuZ2VMYWJlbCB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8c3BhbiBjbGFzcz1cInNwYWNlciBub3ZvLWRhdGEtdGFibGUtc3BhY2VyXCIgKm5nSWY9XCJ0aGVtZSA9PT0gJ2Jhc2ljLXdpZGUnXCI+PC9zcGFuPlxuICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgIHRoZW1lPVwiZGlhbG9ndWVcIlxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtcGFnaW5hdGlvbi1uYXZpZ2F0aW9uLXByZXZpb3VzXCJcbiAgICAgICAgKGNsaWNrKT1cInByZXZpb3VzUGFnZSgpXCJcbiAgICAgICAgaWNvbj1cInByZXZpb3VzXCJcbiAgICAgICAgc2lkZT1cImxlZnRcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiIWhhc1ByZXZpb3VzUGFnZSgpXCJcbiAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLXBhZ2luYXRpb24tcHJldmlvdXNcIlxuICAgICAgPlxuICAgICAgICA8c3Bhbj57eyBsYWJlbHMucHJldmlvdXMgfX08L3NwYW4+XG4gICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgIHRoZW1lPVwiZGlhbG9ndWVcIlxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtcGFnaW5hdGlvbi1uYXZpZ2F0aW9uLW5leHRcIlxuICAgICAgICAoY2xpY2spPVwibmV4dFBhZ2UoKVwiXG4gICAgICAgIGljb249XCJuZXh0XCJcbiAgICAgICAgc2lkZT1cInJpZ2h0XCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiFoYXNOZXh0UGFnZSgpXCJcbiAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLXBhZ2luYXRpb24tbmV4dFwiXG4gICAgICA+XG4gICAgICAgIDxzcGFuPnt7IGxhYmVscy5uZXh0IH19PC9zcGFuPlxuICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGhlbWUgPT09ICdzdGFuZGFyZCdcIj5cbiAgICAgIDxoNSBjbGFzcz1cInJvd3NcIj57eyBsYWJlbHMuaXRlbXNQZXJQYWdlIH19PC9oNT5cbiAgICAgIDxub3ZvLXNlbGVjdFxuICAgICAgICBbb3B0aW9uc109XCJkaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnNcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnNlbGVjdFwiXG4gICAgICAgIFsobmdNb2RlbCldPVwicGFnZVNpemVcIlxuICAgICAgICAob25TZWxlY3QpPVwiY2hhbmdlUGFnZVNpemUoJGV2ZW50LnNlbGVjdGVkKVwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInBhZ2VyLXNlbGVjdFwiXG4gICAgICAgIFthdHRyLmRhdGEtZmVhdHVyZS1pZF09XCJkYXRhRmVhdHVyZUlkXCJcbiAgICAgID5cbiAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8c3BhbiBjbGFzcz1cInNwYWNlclwiPjwvc3Bhbj5cbiAgICAgIDx1bCAqbmdJZj1cIiFsb2FkaW5nICYmICFlcnJvckxvYWRpbmdcIiBjbGFzcz1cInBhZ2VyXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicGFnZXJcIj5cbiAgICAgICAgPGxpIGNsYXNzPVwicGFnZVwiIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UgLSAxKVwiIFtuZ0NsYXNzXT1cInsgZGlzYWJsZWQ6IHBhZ2UgPT09IDAgfVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXByZXZpb3VzXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicGFnZXItcHJldmlvdXNcIj48L2k+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaSBjbGFzcz1cInBhZ2VcIiBbbmdDbGFzc109XCJ7IGFjdGl2ZTogcC5udW1iZXIgPT09IHBhZ2UgKyAxIH1cIiAqbmdGb3I9XCJsZXQgcCBvZiBwYWdlc1wiIChjbGljayk9XCJzZWxlY3RQYWdlKHAubnVtYmVyIC0gMSlcIj5cbiAgICAgICAgICB7eyBwLnRleHQgfX1cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpIGNsYXNzPVwicGFnZVwiIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UgKyAxKVwiIFtuZ0NsYXNzXT1cInsgZGlzYWJsZWQ6IHBhZ2UgKyAxID09PSB0b3RhbFBhZ2VzIH1cIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImJoaS1uZXh0XCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicGFnZXItbmV4dFwiPjwvaT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgICA8bm92by1sb2FkaW5nICpuZ0lmPVwibG9hZGluZ1wiPjwvbm92by1sb2FkaW5nPlxuICAgICAgPGJ1dHRvbiAqbmdJZj1cImVycm9yTG9hZGluZ1wiXG4gICAgICAgICAgICAgIHRoZW1lPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgICAgICBpY29uPVwicmVmcmVzaFwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJwYWdpbmF0aW9uUmVmcmVzaFN1YmplY3QubmV4dCgpXCI+e3sgbGFiZWxzLnJlZnJlc2hQYWdpbmF0aW9uIH19PC9idXR0b24+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL2RhdGEtdGFibGUtcGFnaW5hdGlvbi5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZVBhZ2luYXRpb248VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nID0gJ3N0YW5kYXJkJztcblxuICBASW5wdXQoKVxuICBnZXQgcGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wYWdlO1xuICB9XG4gIHNldCBwYWdlKHBhZ2U6IG51bWJlcikge1xuICAgIHRoaXMuX3BhZ2UgPSBwYWdlO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5sb25nUmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCBmYWxzZSk7XG4gICAgdGhpcy5zaG9ydFJhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgdHJ1ZSk7XG4gICAgdGhpcy5zdGF0ZS5wYWdlID0gdGhpcy5fcGFnZTtcbiAgfVxuICBfcGFnZTogbnVtYmVyID0gMDtcblxuICBASW5wdXQoKVxuICBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XG4gIH1cbiAgc2V0IHBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkUGFnZVNpemVPcHRpb25zKCk7XG4gICAgdGhpcy5zdGF0ZS5wYWdlU2l6ZSA9IHRoaXMuX3BhZ2VTaXplO1xuICB9XG4gIHByaXZhdGUgX3BhZ2VTaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIGRhdGFGZWF0dXJlSWQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBnZXQgcGFnZVNpemVPcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9wYWdlU2l6ZU9wdGlvbnM7XG4gIH1cbiAgc2V0IHBhZ2VTaXplT3B0aW9ucyhwYWdlU2l6ZU9wdGlvbnM6IGFueVtdKSB7XG4gICAgdGhpcy5fcGFnZVNpemVPcHRpb25zID0gcGFnZVNpemVPcHRpb25zO1xuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkUGFnZVNpemVPcHRpb25zKCk7XG4gIH1cbiAgcHJpdmF0ZSBfcGFnZVNpemVPcHRpb25zID0gW107XG5cbiAgQElucHV0KClcbiAgcHVibGljIGNhblNlbGVjdEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgYWxsTWF0Y2hpbmdTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZXJyb3JMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwYWdpbmF0aW9uUmVmcmVzaFN1YmplY3QgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xuICB9XG4gIHNldCBsZW5ndGgobGVuZ3RoOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmxvbmdSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIGZhbHNlKTtcbiAgICB0aGlzLnNob3J0UmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCB0cnVlKTtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XG4gIH1cbiAgX2xlbmd0aDogbnVtYmVyID0gMDtcblxuICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8SURhdGFUYWJsZVBhZ2luYXRpb25FdmVudD4oKTtcblxuICBwdWJsaWMgZGlzcGxheWVkUGFnZVNpemVPcHRpb25zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdO1xuICBwdWJsaWMgbG9uZ1JhbmdlTGFiZWw6IHN0cmluZztcbiAgcHVibGljIHNob3J0UmFuZ2VMYWJlbDogc3RyaW5nO1xuICBwdWJsaWMgcGFnZXM6IHsgbnVtYmVyOiBudW1iZXI7IHRleHQ6IHN0cmluZzsgYWN0aXZlOiBib29sZWFuIH1bXTtcblxuICBwcml2YXRlIHJlc2V0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyB0b3RhbFBhZ2VzOiBudW1iZXI7XG4gIHByaXZhdGUgX2luaXRpYWxpemVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIHN0YXRlOiBEYXRhVGFibGVTdGF0ZTxUPikge1xuICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLnJlc2V0U291cmNlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnBhZ2UgPSAwO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0UGFnZShwYWdlKSB7XG4gICAgdGhpcy5zdGF0ZS5jaGVja1JldGFpbm1lbnQoJ3BhZ2UnLCB0aGlzLmNhblNlbGVjdEFsbCAmJiB0aGlzLmFsbE1hdGNoaW5nU2VsZWN0ZWQpO1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgdGhpcy5lbWl0UGFnZUV2ZW50KCk7XG4gIH1cblxuICBwdWJsaWMgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5jaGVja1JldGFpbm1lbnQoJ3BhZ2UnLCB0aGlzLmNhblNlbGVjdEFsbCAmJiB0aGlzLmFsbE1hdGNoaW5nU2VsZWN0ZWQpO1xuICAgIGlmICghdGhpcy5oYXNOZXh0UGFnZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGFnZSsrO1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKHRoaXMucGFnZSwgdGhpcy50b3RhbFBhZ2VzKTtcbiAgICB0aGlzLmVtaXRQYWdlRXZlbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91c1BhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5jaGVja1JldGFpbm1lbnQoJ3BhZ2UnLCB0aGlzLmNhblNlbGVjdEFsbCAmJiB0aGlzLmFsbE1hdGNoaW5nU2VsZWN0ZWQpO1xuICAgIGlmICghdGhpcy5oYXNQcmV2aW91c1BhZ2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBhZ2UtLTtcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgdGhpcy5lbWl0UGFnZUV2ZW50KCk7XG4gIH1cblxuICBwdWJsaWMgaGFzUHJldmlvdXNQYWdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2UgPj0gMSAmJiB0aGlzLnBhZ2VTaXplICE9PSAwO1xuICB9XG5cbiAgcHVibGljIGhhc05leHRQYWdlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwodGhpcy5sZW5ndGggLyB0aGlzLnBhZ2VTaXplKSAtIDE7XG4gICAgcmV0dXJuIHRoaXMucGFnZSA8IG51bWJlck9mUGFnZXMgJiYgdGhpcy5wYWdlU2l6ZSAhPT0gMDtcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlID0gMDtcbiAgICB0aGlzLnBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgdGhpcy5lbWl0UGFnZUV2ZW50KHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZGlzcGxheWVkUGFnZVNpemVPcHRpb25zKSB7XG4gICAgICB0aGlzLmRpc3BsYXllZFBhZ2VTaXplT3B0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5wYWdlU2l6ZU9wdGlvbnMuZm9yRWFjaCgob3B0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xuICAgICAgICAgIHRoaXMuZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXllZFBhZ2VTaXplT3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlOiBvcHRpb24sXG4gICAgICAgICAgICBsYWJlbDogb3B0aW9uLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5sb25nUmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCBmYWxzZSk7XG4gICAgdGhpcy5zaG9ydFJhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgdHJ1ZSk7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0UGFnZUV2ZW50KGlzUGFnZVNpemVDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0ge1xuICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICBsZW5ndGg6IHRoaXMubGVuZ3RoLFxuICAgICAgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlcixcbiAgICAgIHNvcnQ6IHRoaXMuc3RhdGUuc29ydCxcbiAgICB9O1xuICAgIHRoaXMucGFnZUNoYW5nZS5uZXh0KGV2ZW50KTtcbiAgICB0aGlzLnN0YXRlLnBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgdGhpcy5zdGF0ZS5wYWdlU2l6ZSA9IHRoaXMucGFnZVNpemU7XG4gICAgdGhpcy5sb25nUmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCBmYWxzZSk7XG4gICAgdGhpcy5zaG9ydFJhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgdHJ1ZSk7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xuICAgIHRoaXMuc3RhdGUudXBkYXRlcy5uZXh0KGV2ZW50KTtcbiAgICB0aGlzLnN0YXRlLm9uUGFnaW5hdGlvbkNoYW5nZShpc1BhZ2VTaXplQ2hhbmdlLCB0aGlzLnBhZ2VTaXplKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlVG90YWxQYWdlcygpIHtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gdGhpcy5wYWdlU2l6ZSA8IDEgPyAxIDogTWF0aC5jZWlsKHRoaXMubGVuZ3RoIC8gdGhpcy5wYWdlU2l6ZSk7XG4gICAgcmV0dXJuIE1hdGgubWF4KHRvdGFsUGFnZXMgfHwgMCwgMSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VQYWdlKG51bWJlcjogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIGlzQWN0aXZlOiBib29sZWFuKTogeyBudW1iZXI6IG51bWJlcjsgdGV4dDogc3RyaW5nOyBhY3RpdmU6IGJvb2xlYW4gfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG51bWJlcixcbiAgICAgIHRleHQsXG4gICAgICBhY3RpdmU6IGlzQWN0aXZlLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldFBhZ2VzKGN1cnJlbnRQYWdlOiBudW1iZXIsIHRvdGFsUGFnZXM6IG51bWJlcik6IHsgbnVtYmVyOiBudW1iZXI7IHRleHQ6IHN0cmluZzsgYWN0aXZlOiBib29sZWFuIH1bXSB7XG4gICAgY29uc3QgcGFnZXMgPSBbXTtcblxuICAgIC8vIERlZmF1bHQgcGFnZSBsaW1pdHNcbiAgICBsZXQgc3RhcnRQYWdlID0gMTtcbiAgICBsZXQgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgY29uc3QgaXNNYXhTaXplZCA9IE1BWF9QQUdFU19ESVNQTEFZRUQgPCB0b3RhbFBhZ2VzO1xuXG4gICAgLy8gUmVjb21wdXRlIGlmIG1heFBhZ2VzRGlzcGxheWVkXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcbiAgICAgIC8vIEN1cnJlbnQgcGFnZSBpcyBkaXNwbGF5ZWQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgdmlzaWJsZSBvbmVzXG4gICAgICBzdGFydFBhZ2UgPSBNYXRoLm1heChjdXJyZW50UGFnZSAtIE1hdGguZmxvb3IoTUFYX1BBR0VTX0RJU1BMQVlFRCAvIDIpLCAxKTtcbiAgICAgIGVuZFBhZ2UgPSBzdGFydFBhZ2UgKyBNQVhfUEFHRVNfRElTUExBWUVEIC0gMTtcblxuICAgICAgLy8gQWRqdXN0IGlmIGxpbWl0IGlzIGV4Y2VlZGVkXG4gICAgICBpZiAoZW5kUGFnZSA+IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgICAgIHN0YXJ0UGFnZSA9IGVuZFBhZ2UgLSBNQVhfUEFHRVNfRElTUExBWUVEICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgcGFnZSBudW1iZXIgbGlua3NcbiAgICBmb3IgKGxldCBudW1iZXIgPSBzdGFydFBhZ2U7IG51bWJlciA8PSBlbmRQYWdlOyBudW1iZXIrKykge1xuICAgICAgY29uc3QgcGFnZSA9IHRoaXMubWFrZVBhZ2UobnVtYmVyLCBudW1iZXIudG9TdHJpbmcoKSwgbnVtYmVyID09PSBjdXJyZW50UGFnZSk7XG4gICAgICBwYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cbn1cbiJdfQ==