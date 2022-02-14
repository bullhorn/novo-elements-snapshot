// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import * as i0 from "@angular/core";
import * as i1 from "../../../../services/novo-label-service";
import * as i2 from "@angular/common";
import * as i3 from "../../../select/Select";
import * as i4 from "@angular/forms";
function Pagination_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "h5", 6);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "novo-select", 7);
    i0.ɵɵlistener("ngModelChange", function Pagination_ng_container_0_Template_novo_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.itemsPerPage = $event; })("onSelect", function Pagination_ng_container_0_Template_novo_select_onSelect_3_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onPageSizeChanged($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "span", 8);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("options", ctx_r0.rowOptions)("placeholder", ctx_r0.labels.select)("ngModel", ctx_r0.itemsPerPage);
} }
const _c0 = function (a0) { return { active: a0 }; };
function Pagination_li_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 2);
    i0.ɵɵlistener("click", function Pagination_li_4_Template_li_click_0_listener($event) { i0.ɵɵrestoreView(_r7); const p_r5 = ctx.$implicit; const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.selectPage(p_r5.num, $event); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("disabled", ctx_r1.disablePageSelection);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c0, p_r5.active));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", p_r5.text, " ");
} }
const _c1 = function (a0) { return { disabled: a0 }; };
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
Pagination.ɵfac = function Pagination_Factory(t) { return new (t || Pagination)(i0.ɵɵdirectiveInject(i1.NovoLabelService)); };
Pagination.ɵcmp = i0.ɵɵdefineComponent({ type: Pagination, selectors: [["novo-pagination"]], inputs: { page: "page", totalItems: "totalItems", itemsPerPage: "itemsPerPage", rowOptions: "rowOptions", label: "label", disablePageSelection: "disablePageSelection" }, outputs: { pageChange: "pageChange", itemsPerPageChange: "itemsPerPageChange", onPageChange: "onPageChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 8, consts: [[4, "ngIf"], ["data-automation-id", "pager", 1, "pager"], [1, "page", 3, "ngClass", "click"], ["data-automation-id", "pager-previous", 1, "bhi-previous"], ["class", "page", 3, "ngClass", "disabled", "click", 4, "ngFor", "ngForOf"], ["data-automation-id", "pager-next", 1, "bhi-next"], [1, "rows"], ["data-automation-id", "pager-select", 3, "options", "placeholder", "ngModel", "ngModelChange", "onSelect"], [1, "spacer"]], template: function Pagination_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, Pagination_ng_container_0_Template, 5, 4, "ng-container", 0);
        i0.ɵɵelementStart(1, "ul", 1);
        i0.ɵɵelementStart(2, "li", 2);
        i0.ɵɵlistener("click", function Pagination_Template_li_click_2_listener() { return ctx.selectPage(ctx.page - 1); });
        i0.ɵɵelement(3, "i", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, Pagination_li_4_Template, 2, 6, "li", 4);
        i0.ɵɵelementStart(5, "li", 2);
        i0.ɵɵlistener("click", function Pagination_Template_li_click_5_listener() { return ctx.selectPage(ctx.page + 1); });
        i0.ɵɵelement(6, "i", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.rowOptions.length > 1);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c1, ctx.noPrevious()));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.pages);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c1, ctx.noNext()));
    } }, directives: [i2.NgIf, i2.NgClass, i2.NgForOf, i3.NovoSelectElement, i4.NgControlStatus, i4.NgModel], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Pagination, [{
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
    }], function () { return [{ type: i1.NovoLabelService }]; }, { page: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy90YWJsZS9leHRyYXMvcGFnaW5hdGlvbi9QYWdpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekcsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7Ozs7OztJQVV2RSw2QkFDRTtJQUFBLDZCQUFpQjtJQUFBLFlBQVc7SUFBQSxpQkFBSztJQUNqQyxzQ0FNZTtJQUhiLDJOQUEwQix3TUFBQTtJQUczQixpQkFBYztJQUNmLDBCQUE0QjtJQUM5QiwwQkFBZTs7O0lBVEksZUFBVztJQUFYLGtDQUFXO0lBRTFCLGVBQXNCO0lBQXRCLDJDQUFzQixxQ0FBQSxnQ0FBQTs7Ozs7SUFZeEIsNkJBT0U7SUFGQSwyTkFBbUM7SUFFbkMsWUFDRjtJQUFBLGlCQUFLOzs7O0lBTEgsdURBQXVDO0lBRHZDLGlFQUFnQztJQUtoQyxlQUNGO0lBREUsMENBQ0Y7OztBQU9OLE1BQU0sT0FBTyxVQUFVO0lBOEJyQixZQUFtQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQXhCM0MsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFhbEIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEMsc0JBQWlCLEdBQUcsQ0FBQyxD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WUFHUCxZQUFZO2tCQURYLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5cbmludGVyZmFjZSBQYWdlIHtcbiAgbnVtOiBudW1iZXI7XG4gIHRleHQ6IHN0cmluZztcbiAgYWN0aXZlOiBib29sZWFuO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicm93T3B0aW9ucy5sZW5ndGggPiAxXCI+XG4gICAgICA8aDUgY2xhc3M9XCJyb3dzXCI+e3sgbGFiZWwgfX08L2g1PlxuICAgICAgPG5vdm8tc2VsZWN0XG4gICAgICAgIFtvcHRpb25zXT1cInJvd09wdGlvbnNcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwibGFiZWxzLnNlbGVjdFwiXG4gICAgICAgIFsobmdNb2RlbCldPVwiaXRlbXNQZXJQYWdlXCJcbiAgICAgICAgKG9uU2VsZWN0KT1cIm9uUGFnZVNpemVDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJwYWdlci1zZWxlY3RcIlxuICAgICAgPjwvbm92by1zZWxlY3Q+XG4gICAgICA8c3BhbiBjbGFzcz1cInNwYWNlclwiPjwvc3Bhbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8dWwgY2xhc3M9XCJwYWdlclwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInBhZ2VyXCI+XG4gICAgICA8bGkgY2xhc3M9XCJwYWdlXCIgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZSAtIDEpXCIgW25nQ2xhc3NdPVwieyBkaXNhYmxlZDogbm9QcmV2aW91cygpIH1cIj5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktcHJldmlvdXNcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJwYWdlci1wcmV2aW91c1wiPjwvaT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGlcbiAgICAgICAgY2xhc3M9XCJwYWdlXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IHAuYWN0aXZlIH1cIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZVBhZ2VTZWxlY3Rpb25cIlxuICAgICAgICAqbmdGb3I9XCJsZXQgcCBvZiBwYWdlc1wiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKHAubnVtLCAkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAge3sgcC50ZXh0IH19XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwicGFnZVwiIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UgKyAxKVwiIFtuZ0NsYXNzXT1cInsgZGlzYWJsZWQ6IG5vTmV4dCgpIH1cIj5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInBhZ2VyLW5leHRcIj48L2k+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIHBhZ2U6IG51bWJlcjtcbiAgQElucHV0KClcbiAgdG90YWxJdGVtczogbnVtYmVyO1xuICBASW5wdXQoKVxuICBpdGVtc1BlclBhZ2UgPSAxMDtcbiAgQElucHV0KClcbiAgcm93T3B0aW9ucztcbiAgQElucHV0KClcbiAgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVQYWdlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VTZWxlY3REaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZVBhZ2VTZWxlY3Rpb24odmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5wYWdlU2VsZWN0RGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgfVxuICBAT3V0cHV0KClcbiAgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGl0ZW1zUGVyUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgcGFnZVNlbGVjdERpc2FibGVkOiBib29sZWFuO1xuICBtYXhQYWdlc0Rpc3BsYXllZCA9IDU7XG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgcGFnZXM6IEFycmF5PFBhZ2U+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWwgfHwgdGhpcy5sYWJlbHMuaXRlbXNQZXJQYWdlO1xuICAgIHRoaXMucm93T3B0aW9ucyA9IHRoaXMucm93T3B0aW9ucyB8fCB0aGlzLmdldERlZmF1bHRSb3dPcHRpb25zKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMucGFnZSA9IHRoaXMucGFnZSB8fCAxO1xuICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKHRoaXMucGFnZSwgdGhpcy50b3RhbFBhZ2VzKTtcbiAgfVxuXG4gIGdldERlZmF1bHRSb3dPcHRpb25zKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7IHZhbHVlOiAxMCwgbGFiZWw6ICcxMCcgfSxcbiAgICAgIHsgdmFsdWU6IDI1LCBsYWJlbDogJzI1JyB9LFxuICAgICAgeyB2YWx1ZTogNTAsIGxhYmVsOiAnNTAnIH0sXG4gICAgICB7IHZhbHVlOiAxMDAsIGxhYmVsOiAnMTAwJyB9LFxuICAgIF07XG4gIH1cblxuICBvblBhZ2VTaXplQ2hhbmdlZChldmVudCkge1xuICAgIHRoaXMucGFnZSA9IDE7XG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBldmVudC5zZWxlY3RlZDtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5wYWdlKTtcbiAgICB0aGlzLml0ZW1zUGVyUGFnZUNoYW5nZS5lbWl0KHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICB0aGlzLm9uUGFnZUNoYW5nZS5lbWl0KHtcbiAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgIGl0ZW1zUGVyUGFnZTogdGhpcy5pdGVtc1BlclBhZ2UsXG4gICAgfSk7XG4gIH1cblxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlciwgZXZlbnQ/OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHRoaXMucGFnZSk7XG4gICAgdGhpcy5vblBhZ2VDaGFuZ2UuZW1pdCh7XG4gICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICBpdGVtc1BlclBhZ2U6IHRoaXMuaXRlbXNQZXJQYWdlLFxuICAgIH0pO1xuICB9XG5cbiAgbm9QcmV2aW91cygpIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlID09PSAxO1xuICB9XG5cbiAgbm9OZXh0KCkge1xuICAgIHJldHVybiB0aGlzLnBhZ2UgPT09IHRoaXMudG90YWxQYWdlcztcbiAgfVxuXG4gIC8vIENyZWF0ZSBwYWdlIG9iamVjdCB1c2VkIGluIHRlbXBsYXRlXG4gIG1ha2VQYWdlKG51bTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIGlzQWN0aXZlOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHsgbnVtLCB0ZXh0LCBhY3RpdmU6IGlzQWN0aXZlIH0gYXMgUGFnZTtcbiAgfVxuXG4gIGdldFBhZ2VzKGN1cnJlbnRQYWdlOiBudW1iZXIsIHRvdGFsUGFnZXM6IG51bWJlcikge1xuICAgIGNvbnN0IHBhZ2VzOiBBcnJheTxQYWdlPiA9IFtdO1xuICAgIC8vIERlZmF1bHQgcGFnZSBsaW1pdHNcbiAgICBsZXQgc3RhcnRQYWdlID0gMTtcbiAgICBsZXQgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgY29uc3QgaXNNYXhTaXplZCA9IHRoaXMubWF4UGFnZXNEaXNwbGF5ZWQgPCB0b3RhbFBhZ2VzO1xuXG4gICAgLy8gcmVjb21wdXRlIGlmIG1heFBhZ2VzRGlzcGxheWVkXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcbiAgICAgIC8vIEN1cnJlbnQgcGFnZSBpcyBkaXNwbGF5ZWQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgdmlzaWJsZSBvbmVzXG4gICAgICBzdGFydFBhZ2UgPSBNYXRoLm1heChjdXJyZW50UGFnZSAtIE1hdGguZmxvb3IodGhpcy5tYXhQYWdlc0Rpc3BsYXllZCAvIDIpLCAxKTtcbiAgICAgIGVuZFBhZ2UgPSBzdGFydFBhZ2UgKyB0aGlzLm1heFBhZ2VzRGlzcGxheWVkIC0gMTtcblxuICAgICAgLy8gQWRqdXN0IGlmIGxpbWl0IGlzIGV4Y2VlZGVkXG4gICAgICBpZiAoZW5kUGFnZSA+IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgICAgIHN0YXJ0UGFnZSA9IGVuZFBhZ2UgLSB0aGlzLm1heFBhZ2VzRGlzcGxheWVkICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgcGFnZSBudW1iZXIgbGlua3NcbiAgICBmb3IgKGxldCBudW0gPSBzdGFydFBhZ2U7IG51bSA8PSBlbmRQYWdlOyBudW0rKykge1xuICAgICAgY29uc3QgcGFnZSA9IHRoaXMubWFrZVBhZ2UobnVtLCBudW0udG9TdHJpbmcoKSwgbnVtID09PSBjdXJyZW50UGFnZSk7XG4gICAgICBwYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICBjYWxjdWxhdGVUb3RhbFBhZ2VzKCkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSB0aGlzLml0ZW1zUGVyUGFnZSA8IDEgPyAxIDogTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcbiAgICByZXR1cm4gTWF0aC5tYXgodG90YWxQYWdlcyB8fCAwLCAxKTtcbiAgfVxufVxuIl19