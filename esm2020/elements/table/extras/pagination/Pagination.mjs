// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
// APP
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/select";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class Pagination {
    constructor(labels) {
        this.labels = labels;
        this.itemsPerPage = 10;
        this.pageChange = new EventEmitter();
        this.itemsPerPageChange = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.maxPagesDisplayed = 5;
    }
    get disablePageSelection() {
        return this.pageSelectDisabled;
    }
    set disablePageSelection(val) {
        this.pageSelectDisabled = coerceBooleanProperty(val);
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
Pagination.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: Pagination, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
Pagination.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: Pagination, selector: "novo-pagination", inputs: { page: "page", totalItems: "totalItems", itemsPerPage: "itemsPerPage", rowOptions: "rowOptions", label: "label", disablePageSelection: "disablePageSelection" }, outputs: { pageChange: "pageChange", itemsPerPageChange: "itemsPerPageChange", onPageChange: "onPageChange" }, usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="rowOptions.length > 1">
      <h5 class="rows">{{ label }}</h5>
      <novo-select
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
  `, isInline: true, components: [{ type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: Pagination, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-pagination',
                    template: `
    <ng-container *ngIf="rowOptions.length > 1">
      <h5 class="rows">{{ label }}</h5>
      <novo-select
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
  `,
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy9wYWdpbmF0aW9uL1BhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUN6RyxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQXdDMUQsTUFBTSxPQUFPLFVBQVU7SUE4QnJCLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBeEIzQyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQWFsQixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoQyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdsQyxzQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFJd0IsQ0FBQztJQW5CL0MsSUFDSSxvQkFBb0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUNELElBQUksb0JBQW9CLENBQUMsR0FBWTtRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQWVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJ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LENBQUMsQ0FBQztJQUN0QyxDQUFDOzt3R0EzSFUsVUFBVTs0RkFBVixVQUFVLHFXQS9CWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7NEZBRVUsVUFBVTtrQkFqQ3RCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDtpQkFDRjt1R0FHQyxJQUFJO3NCQURILEtBQUs7Z0JBR04sVUFBVTtzQkFEVCxLQUFLO2dCQUdOLFlBQVk7c0JBRFgsS0FBSztnQkFHTixVQUFVO3NCQURULEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdGLG9CQUFvQjtzQkFEdkIsS0FBSztnQkFRTixVQUFVO3NCQURULE1BQU07Z0JBR1Asa0JBQWtCO3NCQURqQixNQUFNO2dCQUdQLFlBQVk7c0JBRFgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5cbmludGVyZmFjZSBQYWdlIHtcbiAgbnVtOiBudW1iZXI7XG4gIHRleHQ6IHN0cmluZztcbiAgYWN0aXZlOiBib29sZWFuO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicm93T3B0aW9ucy5sZW5ndGggPiAxXCI+XG4gICAgICA8aDUgY2xhc3M9XCJyb3dzXCI+e3sgbGFiZWwgfX08L2g1PlxuICAgICAgPG5vdm8tc2VsZWN0XG4gICAgICAgIFtvcHRpb25zXT1cInJvd09wdGlvbnNcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnNlbGVjdFwiXG4gICAgICAgIFsobmdNb2RlbCldPVwiaXRlbXNQZXJQYWdlXCJcbiAgICAgICAgKG9uU2VsZWN0KT1cIm9uUGFnZVNpemVDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJwYWdlci1zZWxlY3RcIlxuICAgICAgPjwvbm92by1zZWxlY3Q+XG4gICAgICA8c3BhbiBjbGFzcz1cInNwYWNlclwiPjwvc3Bhbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8dWwgY2xhc3M9XCJwYWdlclwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInBhZ2VyXCI+XG4gICAgICA8bGkgY2xhc3M9XCJwYWdlXCIgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZSAtIDEpXCIgW25nQ2xhc3NdPVwieyBkaXNhYmxlZDogbm9QcmV2aW91cygpIH1cIj5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktcHJldmlvdXNcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJwYWdlci1wcmV2aW91c1wiPjwvaT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGlcbiAgICAgICAgY2xhc3M9XCJwYWdlXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IHAuYWN0aXZlIH1cIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZVBhZ2VTZWxlY3Rpb25cIlxuICAgICAgICAqbmdGb3I9XCJsZXQgcCBvZiBwYWdlc1wiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKHAubnVtLCAkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAge3sgcC50ZXh0IH19XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwicGFnZVwiIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UgKyAxKVwiIFtuZ0NsYXNzXT1cInsgZGlzYWJsZWQ6IG5vTmV4dCgpIH1cIj5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInBhZ2VyLW5leHRcIj48L2k+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIHBhZ2U6IG51bWJlcjtcbiAgQElucHV0KClcbiAgdG90YWxJdGVtczogbnVtYmVyO1xuICBASW5wdXQoKVxuICBpdGVtc1BlclBhZ2UgPSAxMDtcbiAgQElucHV0KClcbiAgcm93T3B0aW9ucztcbiAgQElucHV0KClcbiAgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVQYWdlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VTZWxlY3REaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZVBhZ2VTZWxlY3Rpb24odmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5wYWdlU2VsZWN0RGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgfVxuICBAT3V0cHV0KClcbiAgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGl0ZW1zUGVyUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgcGFnZVNlbGVjdERpc2FibGVkOiBib29sZWFuO1xuICBtYXhQYWdlc0Rpc3BsYXllZCA9IDU7XG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgcGFnZXM6IEFycmF5PFBhZ2U+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWwgfHwgdGhpcy5sYWJlbHMuaXRlbXNQZXJQYWdlO1xuICAgIHRoaXMucm93T3B0aW9ucyA9IHRoaXMucm93T3B0aW9ucyB8fCB0aGlzLmdldERlZmF1bHRSb3dPcHRpb25zKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMucGFnZSA9IHRoaXMucGFnZSB8fCAxO1xuICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKHRoaXMucGFnZSwgdGhpcy50b3RhbFBhZ2VzKTtcbiAgfVxuXG4gIGdldERlZmF1bHRSb3dPcHRpb25zKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7IHZhbHVlOiAxMCwgbGFiZWw6ICcxMCcgfSxcbiAgICAgIHsgdmFsdWU6IDI1LCBsYWJlbDogJzI1JyB9LFxuICAgICAgeyB2YWx1ZTogNTAsIGxhYmVsOiAnNTAnIH0sXG4gICAgICB7IHZhbHVlOiAxMDAsIGxhYmVsOiAnMTAwJyB9LFxuICAgIF07XG4gIH1cblxuICBvblBhZ2VTaXplQ2hhbmdlZChldmVudCkge1xuICAgIHRoaXMucGFnZSA9IDE7XG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBldmVudC5zZWxlY3RlZDtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5wYWdlKTtcbiAgICB0aGlzLml0ZW1zUGVyUGFnZUNoYW5nZS5lbWl0KHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICB0aGlzLm9uUGFnZUNoYW5nZS5lbWl0KHtcbiAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgIGl0ZW1zUGVyUGFnZTogdGhpcy5pdGVtc1BlclBhZ2UsXG4gICAgfSk7XG4gIH1cblxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlciwgZXZlbnQ/OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHRoaXMucGFnZSk7XG4gICAgdGhpcy5vblBhZ2VDaGFuZ2UuZW1pdCh7XG4gICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICBpdGVtc1BlclBhZ2U6IHRoaXMuaXRlbXNQZXJQYWdlLFxuICAgIH0pO1xuICB9XG5cbiAgbm9QcmV2aW91cygpIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlID09PSAxO1xuICB9XG5cbiAgbm9OZXh0KCkge1xuICAgIHJldHVybiB0aGlzLnBhZ2UgPT09IHRoaXMudG90YWxQYWdlcztcbiAgfVxuXG4gIC8vIENyZWF0ZSBwYWdlIG9iamVjdCB1c2VkIGluIHRlbXBsYXRlXG4gIG1ha2VQYWdlKG51bTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIGlzQWN0aXZlOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHsgbnVtLCB0ZXh0LCBhY3RpdmU6IGlzQWN0aXZlIH0gYXMgUGFnZTtcbiAgfVxuXG4gIGdldFBhZ2VzKGN1cnJlbnRQYWdlOiBudW1iZXIsIHRvdGFsUGFnZXM6IG51bWJlcikge1xuICAgIGNvbnN0IHBhZ2VzOiBBcnJheTxQYWdlPiA9IFtdO1xuICAgIC8vIERlZmF1bHQgcGFnZSBsaW1pdHNcbiAgICBsZXQgc3RhcnRQYWdlID0gMTtcbiAgICBsZXQgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgY29uc3QgaXNNYXhTaXplZCA9IHRoaXMubWF4UGFnZXNEaXNwbGF5ZWQgPCB0b3RhbFBhZ2VzO1xuXG4gICAgLy8gcmVjb21wdXRlIGlmIG1heFBhZ2VzRGlzcGxheWVkXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcbiAgICAgIC8vIEN1cnJlbnQgcGFnZSBpcyBkaXNwbGF5ZWQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgdmlzaWJsZSBvbmVzXG4gICAgICBzdGFydFBhZ2UgPSBNYXRoLm1heChjdXJyZW50UGFnZSAtIE1hdGguZmxvb3IodGhpcy5tYXhQYWdlc0Rpc3BsYXllZCAvIDIpLCAxKTtcbiAgICAgIGVuZFBhZ2UgPSBzdGFydFBhZ2UgKyB0aGlzLm1heFBhZ2VzRGlzcGxheWVkIC0gMTtcblxuICAgICAgLy8gQWRqdXN0IGlmIGxpbWl0IGlzIGV4Y2VlZGVkXG4gICAgICBpZiAoZW5kUGFnZSA+IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgICAgIHN0YXJ0UGFnZSA9IGVuZFBhZ2UgLSB0aGlzLm1heFBhZ2VzRGlzcGxheWVkICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgcGFnZSBudW1iZXIgbGlua3NcbiAgICBmb3IgKGxldCBudW0gPSBzdGFydFBhZ2U7IG51bSA8PSBlbmRQYWdlOyBudW0rKykge1xuICAgICAgY29uc3QgcGFnZSA9IHRoaXMubWFrZVBhZ2UobnVtLCBudW0udG9TdHJpbmcoKSwgbnVtID09PSBjdXJyZW50UGFnZSk7XG4gICAgICBwYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICBjYWxjdWxhdGVUb3RhbFBhZ2VzKCkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSB0aGlzLml0ZW1zUGVyUGFnZSA8IDEgPyAxIDogTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICByZXR1cm4gTWF0aC5tYXgodG90YWxQYWdlcyB8fCAwLCAxKTtcbiAgfVxufVxuIl19