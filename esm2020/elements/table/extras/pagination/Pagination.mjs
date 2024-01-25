// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
// APP
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/select";
export class Pagination {
    get disablePageSelection() {
        return this.pageSelectDisabled;
    }
    set disablePageSelection(val) {
        this.pageSelectDisabled = coerceBooleanProperty(val);
    }
    constructor(labels) {
        this.labels = labels;
        this.itemsPerPage = 10;
        this.pageChange = new EventEmitter();
        this.itemsPerPageChange = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.maxPagesDisplayed = 5;
    }
    ngOnInit() {
        this.label = this.label || this.labels.itemsPerPage;
        this.rowOptions = this.rowOptions || this.getDefaultRowOptions();
    }
    ngOnChanges(changes) {
        this.page = this.page || 1;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
    }
    getDefaultRowOptions() {
        return [
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
        ];
    }
    onPageSizeChanged(event) {
        this.page = 1;
        this.itemsPerPage = event.selected;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.pageChange.emit(this.page);
        this.itemsPerPageChange.emit(this.itemsPerPage);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage,
        });
    }
    selectPage(page, event) {
        if (event) {
            event.preventDefault();
        }
        this.page = page;
        this.pages = this.getPages(this.page, this.totalPages);
        this.pageChange.emit(this.page);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage,
        });
    }
    noPrevious() {
        return this.page === 1;
    }
    noNext() {
        return this.page === this.totalPages;
    }
    // Create page object used in template
    makePage(num, text, isActive) {
        return { num, text, active: isActive };
    }
    getPages(currentPage, totalPages) {
        const pages = [];
        // Default page limits
        let startPage = 1;
        let endPage = totalPages;
        const isMaxSized = this.maxPagesDisplayed < totalPages;
        // recompute if maxPagesDisplayed
        if (isMaxSized) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(this.maxPagesDisplayed / 2), 1);
            endPage = startPage + this.maxPagesDisplayed - 1;
            // Adjust if limit is exceeded
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - this.maxPagesDisplayed + 1;
            }
        }
        // Add page number links
        for (let num = startPage; num <= endPage; num++) {
            const page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        return pages;
    }
    calculateTotalPages() {
        const totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }
}
Pagination.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: Pagination, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
Pagination.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: Pagination, selector: "novo-pagination", inputs: { page: "page", totalItems: "totalItems", itemsPerPage: "itemsPerPage", rowOptions: "rowOptions", label: "label", disablePageSelection: "disablePageSelection" }, outputs: { pageChange: "pageChange", itemsPerPageChange: "itemsPerPageChange", onPageChange: "onPageChange" }, usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="rowOptions.length > 1">
      <h5 class="rows">{{ label }}</h5>
      <novo-select
        class="table-pagination-select"
        [options]="rowOptions"
        [placeholder]="labels.select"
        [(ngModel)]="itemsPerPage"
        (onSelect)="onPageSizeChanged($event)"
        data-automation-id="pager-select"
      ></novo-select>
      <span class="spacer"></span>
    </ng-container>
    <ul class="pager" data-automation-id="pager">
      <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: noPrevious() }">
        <i class="bhi-previous" data-automation-id="pager-previous"></i>
      </li>
      <li
        class="page"
        [ngClass]="{ active: p.active }"
        [class.disabled]="disablePageSelection"
        *ngFor="let p of pages"
        (click)="selectPage(p.num, $event)"
      >
        {{ p.text }}
      </li>
      <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: noNext() }">
        <i class="bhi-next" data-automation-id="pager-next"></i>
      </li>
    </ul>
  `, isInline: true, styles: ["novo-pagination{display:flex;flex-flow:row nowrap;padding:10px}novo-pagination>*{margin:auto 5px}novo-pagination h5.rows{padding:0;font-size:1rem;opacity:.75;letter-spacing:.1px}novo-pagination span.spacer{flex:1}novo-pagination novo-select.table-pagination-select{max-width:100px;min-width:100px}novo-pagination novo-select.table-pagination-select div[type=button]:hover i{opacity:.75}novo-pagination novo-select.table-pagination-select div[type=button]:active i,novo-pagination novo-select.table-pagination-select div[type=button]:focus i{opacity:1}novo-pagination novo-select.table-pagination-select div[type=button] i{opacity:.45}novo-pagination .pager{list-style-type:none}novo-pagination .pager .page{display:inline-block;padding:0 10px;line-height:2.4rem;font-size:var(--font-size-text);border-radius:2px;text-align:center;list-style-type:none;cursor:pointer;color:#39d}novo-pagination .pager .page:last-child{padding-right:0}novo-pagination .pager .page.disabled{opacity:.3;pointer-events:none}novo-pagination .pager .page.active{color:#39d;background-color:#f7f7f7;opacity:1}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: Pagination, decorators: [{
            type: Component,
            args: [{ selector: 'novo-pagination', template: `
    <ng-container *ngIf="rowOptions.length > 1">
      <h5 class="rows">{{ label }}</h5>
      <novo-select
        class="table-pagination-select"
        [options]="rowOptions"
        [placeholder]="labels.select"
        [(ngModel)]="itemsPerPage"
        (onSelect)="onPageSizeChanged($event)"
        data-automation-id="pager-select"
      ></novo-select>
      <span class="spacer"></span>
    </ng-container>
    <ul class="pager" data-automation-id="pager">
      <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: noPrevious() }">
        <i class="bhi-previous" data-automation-id="pager-previous"></i>
      </li>
      <li
        class="page"
        [ngClass]="{ active: p.active }"
        [class.disabled]="disablePageSelection"
        *ngFor="let p of pages"
        (click)="selectPage(p.num, $event)"
      >
        {{ p.text }}
      </li>
      <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: noNext() }">
        <i class="bhi-next" data-automation-id="pager-next"></i>
      </li>
    </ul>
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-pagination{display:flex;flex-flow:row nowrap;padding:10px}novo-pagination>*{margin:auto 5px}novo-pagination h5.rows{padding:0;font-size:1rem;opacity:.75;letter-spacing:.1px}novo-pagination span.spacer{flex:1}novo-pagination novo-select.table-pagination-select{max-width:100px;min-width:100px}novo-pagination novo-select.table-pagination-select div[type=button]:hover i{opacity:.75}novo-pagination novo-select.table-pagination-select div[type=button]:active i,novo-pagination novo-select.table-pagination-select div[type=button]:focus i{opacity:1}novo-pagination novo-select.table-pagination-select div[type=button] i{opacity:.45}novo-pagination .pager{list-style-type:none}novo-pagination .pager .page{display:inline-block;padding:0 10px;line-height:2.4rem;font-size:var(--font-size-text);border-radius:2px;text-align:center;list-style-type:none;cursor:pointer;color:#39d}novo-pagination .pager .page:last-child{padding-right:0}novo-pagination .pager .page.disabled{opacity:.3;pointer-events:none}novo-pagination .pager .page.active{color:#39d;background-color:#f7f7f7;opacity:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { page: [{
                type: Input
            }], totalItems: [{
                type: Input
            }], itemsPerPage: [{
                type: Input
            }], rowOptions: [{
                type: Input
            }], label: [{
                type: Input
            }], disablePageSelection: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], itemsPerPageChange: [{
                type: Output
            }], onPageChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy9wYWdpbmF0aW9uL1BhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SCxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQTJDMUQsTUFBTSxPQUFPLFVBQVU7SUFXckIsSUFDSSxvQkFBb0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUNELElBQUksb0JBQW9CLENBQUMsR0FBWTtRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQWFELFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBeEIzQyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQWFsQixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoQyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdsQyxzQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFJd0IsQ0FBQztJQUUvQyxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNuRSxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXVCO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixPQUFPO1lBQ0wsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7WUFDMUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7WUFDMUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7WUFDMUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7U0FDN0IsQ0FBQztJQUNKLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFZLEVBQUUsS0FBa0I7UUFDekMsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsc0NBQXNDO0lBQ3RDLFFBQVEsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLFFBQWlCO1FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQVUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsUUFBUSxDQUFDLFdBQW1CLEVBQUUsVUFBa0I7UUFDOUMsTUFBTSxLQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUM5QixzQkFBc0I7UUFDdEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUN6QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1FBRXZELGlDQUFpQztRQUNqQyxJQUFJLFVBQVUsRUFBRTtZQUNkLDhEQUE4RDtZQUM5RCxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUUsT0FBTyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1lBRWpELDhCQUE4QjtZQUM5QixJQUFJLE9BQU8sR0FBRyxVQUFVLEVBQUU7Z0JBQ3hCLE9BQU8sR0FBRyxVQUFVLENBQUM7Z0JBQ3JCLFNBQVMsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQzthQUNsRDtTQUNGO1FBRUQsd0JBQXdCO1FBQ3hCLEtBQUssSUFBSSxHQUFHLEdBQUcsU0FBUyxFQUFFLEdBQUcsSUFBSSxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsS0FBSyxXQUFXLENBQUMsQ0FBQztZQUNyRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUYsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7d0dBM0hVLFVBQVU7NEZBQVYsVUFBVSxxV0FsQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDs0RkFJVSxVQUFVO2tCQXBDdEIsU0FBUzsrQkFDRSxpQkFBaUIsWUFDakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVCxpQkFFYyxpQkFBaUIsQ0FBQyxJQUFJO3VHQUlyQyxJQUFJO3NCQURILEtBQUs7Z0JBR04sVUFBVTtzQkFEVCxLQUFLO2dCQUdOLFlBQVk7c0JBRFgsS0FBSztnQkFHTixVQUFVO3NCQURULEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdGLG9CQUFvQjtzQkFEdkIsS0FBSztnQkFRTixVQUFVO3NCQURULE1BQU07Z0JBR1Asa0JBQWtCO3NCQURqQixNQUFNO2dCQUdQLFlBQVk7c0JBRFgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuXG5pbnRlcmZhY2UgUGFnZSB7XG4gIG51bTogbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGFjdGl2ZTogYm9vbGVhbjtcbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJvd09wdGlvbnMubGVuZ3RoID4gMVwiPlxuICAgICAgPGg1IGNsYXNzPVwicm93c1wiPnt7IGxhYmVsIH19PC9oNT5cbiAgICAgIDxub3ZvLXNlbGVjdFxuICAgICAgICBjbGFzcz1cInRhYmxlLXBhZ2luYXRpb24tc2VsZWN0XCJcbiAgICAgICAgW29wdGlvbnNdPVwicm93T3B0aW9uc1wiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJsYWJlbHMuc2VsZWN0XCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJpdGVtc1BlclBhZ2VcIlxuICAgICAgICAob25TZWxlY3QpPVwib25QYWdlU2l6ZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInBhZ2VyLXNlbGVjdFwiXG4gICAgICA+PC9ub3ZvLXNlbGVjdD5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3BhY2VyXCI+PC9zcGFuPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDx1bCBjbGFzcz1cInBhZ2VyXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicGFnZXJcIj5cbiAgICAgIDxsaSBjbGFzcz1cInBhZ2VcIiAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlIC0gMSlcIiBbbmdDbGFzc109XCJ7IGRpc2FibGVkOiBub1ByZXZpb3VzKCkgfVwiPlxuICAgICAgICA8aSBjbGFzcz1cImJoaS1wcmV2aW91c1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cInBhZ2VyLXByZXZpb3VzXCI+PC9pPlxuICAgICAgPC9saT5cbiAgICAgIDxsaVxuICAgICAgICBjbGFzcz1cInBhZ2VcIlxuICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogcC5hY3RpdmUgfVwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlUGFnZVNlbGVjdGlvblwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBwIG9mIHBhZ2VzXCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UocC5udW0sICRldmVudClcIlxuICAgICAgPlxuICAgICAgICB7eyBwLnRleHQgfX1cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJwYWdlXCIgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZSArIDEpXCIgW25nQ2xhc3NdPVwieyBkaXNhYmxlZDogbm9OZXh0KCkgfVwiPlxuICAgICAgICA8aSBjbGFzcz1cImJoaS1uZXh0XCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicGFnZXItbmV4dFwiPjwvaT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vUGFnaW5hdGlvbi5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIHBhZ2U6IG51bWJlcjtcbiAgQElucHV0KClcbiAgdG90YWxJdGVtczogbnVtYmVyO1xuICBASW5wdXQoKVxuICBpdGVtc1BlclBhZ2UgPSAxMDtcbiAgQElucHV0KClcbiAgcm93T3B0aW9ucztcbiAgQElucHV0KClcbiAgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVQYWdlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VTZWxlY3REaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZVBhZ2VTZWxlY3Rpb24odmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5wYWdlU2VsZWN0RGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgfVxuICBAT3V0cHV0KClcbiAgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGl0ZW1zUGVyUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgcGFnZVNlbGVjdERpc2FibGVkOiBib29sZWFuO1xuICBtYXhQYWdlc0Rpc3BsYXllZCA9IDU7XG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgcGFnZXM6IEFycmF5PFBhZ2U+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWwgfHwgdGhpcy5sYWJlbHMuaXRlbXNQZXJQYWdlO1xuICAgIHRoaXMucm93T3B0aW9ucyA9IHRoaXMucm93T3B0aW9ucyB8fCB0aGlzLmdldERlZmF1bHRSb3dPcHRpb25zKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMucGFnZSA9IHRoaXMucGFnZSB8fCAxO1xuICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKHRoaXMucGFnZSwgdGhpcy50b3RhbFBhZ2VzKTtcbiAgfVxuXG4gIGdldERlZmF1bHRSb3dPcHRpb25zKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7IHZhbHVlOiAxMCwgbGFiZWw6ICcxMCcgfSxcbiAgICAgIHsgdmFsdWU6IDI1LCBsYWJlbDogJzI1JyB9LFxuICAgICAgeyB2YWx1ZTogNTAsIGxhYmVsOiAnNTAnIH0sXG4gICAgICB7IHZhbHVlOiAxMDAsIGxhYmVsOiAnMTAwJyB9LFxuICAgIF07XG4gIH1cblxuICBvblBhZ2VTaXplQ2hhbmdlZChldmVudCkge1xuICAgIHRoaXMucGFnZSA9IDE7XG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBldmVudC5zZWxlY3RlZDtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5wYWdlKTtcbiAgICB0aGlzLml0ZW1zUGVyUGFnZUNoYW5nZS5lbWl0KHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICB0aGlzLm9uUGFnZUNoYW5nZS5lbWl0KHtcbiAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgIGl0ZW1zUGVyUGFnZTogdGhpcy5pdGVtc1BlclBhZ2UsXG4gICAgfSk7XG4gIH1cblxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlciwgZXZlbnQ/OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHRoaXMucGFnZSk7XG4gICAgdGhpcy5vblBhZ2VDaGFuZ2UuZW1pdCh7XG4gICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICBpdGVtc1BlclBhZ2U6IHRoaXMuaXRlbXNQZXJQYWdlLFxuICAgIH0pO1xuICB9XG5cbiAgbm9QcmV2aW91cygpIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlID09PSAxO1xuICB9XG5cbiAgbm9OZXh0KCkge1xuICAgIHJldHVybiB0aGlzLnBhZ2UgPT09IHRoaXMudG90YWxQYWdlcztcbiAgfVxuXG4gIC8vIENyZWF0ZSBwYWdlIG9iamVjdCB1c2VkIGluIHRlbXBsYXRlXG4gIG1ha2VQYWdlKG51bTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIGlzQWN0aXZlOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHsgbnVtLCB0ZXh0LCBhY3RpdmU6IGlzQWN0aXZlIH0gYXMgUGFnZTtcbiAgfVxuXG4gIGdldFBhZ2VzKGN1cnJlbnRQYWdlOiBudW1iZXIsIHRvdGFsUGFnZXM6IG51bWJlcikge1xuICAgIGNvbnN0IHBhZ2VzOiBBcnJheTxQYWdlPiA9IFtdO1xuICAgIC8vIERlZmF1bHQgcGFnZSBsaW1pdHNcbiAgICBsZXQgc3RhcnRQYWdlID0gMTtcbiAgICBsZXQgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgY29uc3QgaXNNYXhTaXplZCA9IHRoaXMubWF4UGFnZXNEaXNwbGF5ZWQgPCB0b3RhbFBhZ2VzO1xuXG4gICAgLy8gcmVjb21wdXRlIGlmIG1heFBhZ2VzRGlzcGxheWVkXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcbiAgICAgIC8vIEN1cnJlbnQgcGFnZSBpcyBkaXNwbGF5ZWQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgdmlzaWJsZSBvbmVzXG4gICAgICBzdGFydFBhZ2UgPSBNYXRoLm1heChjdXJyZW50UGFnZSAtIE1hdGguZmxvb3IodGhpcy5tYXhQYWdlc0Rpc3BsYXllZCAvIDIpLCAxKTtcbiAgICAgIGVuZFBhZ2UgPSBzdGFydFBhZ2UgKyB0aGlzLm1heFBhZ2VzRGlzcGxheWVkIC0gMTtcblxuICAgICAgLy8gQWRqdXN0IGlmIGxpbWl0IGlzIGV4Y2VlZGVkXG4gICAgICBpZiAoZW5kUGFnZSA+IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgICAgIHN0YXJ0UGFnZSA9IGVuZFBhZ2UgLSB0aGlzLm1heFBhZ2VzRGlzcGxheWVkICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgcGFnZSBudW1iZXIgbGlua3NcbiAgICBmb3IgKGxldCBudW0gPSBzdGFydFBhZ2U7IG51bSA8PSBlbmRQYWdlOyBudW0rKykge1xuICAgICAgY29uc3QgcGFnZSA9IHRoaXMubWFrZVBhZ2UobnVtLCBudW0udG9TdHJpbmcoKSwgbnVtID09PSBjdXJyZW50UGFnZSk7XG4gICAgICBwYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICBjYWxjdWxhdGVUb3RhbFBhZ2VzKCkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSB0aGlzLml0ZW1zUGVyUGFnZSA8IDEgPyAxIDogTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICByZXR1cm4gTWF0aC5tYXgodG90YWxQYWdlcyB8fCAwLCAxKTtcbiAgfVxufVxuIl19