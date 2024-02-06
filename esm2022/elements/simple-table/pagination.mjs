import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { NovoActivityTableState } from './state';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "./state";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "novo-elements/elements/common";
import * as i6 from "novo-elements/elements/button";
import * as i7 from "novo-elements/elements/tiles";
const DEFAULT_PAGE_SIZE = 50;
export class NovoSimpleTablePagination {
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
    get length() {
        return this._length;
    }
    set length(length) {
        this._length = length;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
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
    constructor(changeDetectorRef, labels, state) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this._page = 0;
        this._length = 0;
        this._pageSizeOptions = [];
        this.pageChange = new EventEmitter();
        if (state && state.onReset) {
            this.resetSubscription = this.state.onReset.subscribe((clear) => {
                if (clear) {
                    this.page = 0;
                    this.changeDetectorRef.markForCheck();
                }
            });
        }
    }
    ngOnInit() {
        this._initialized = true;
        this.updateDisplayedPageSizeOptions();
    }
    ngOnDestroy() {
        this.resetSubscription.unsubscribe();
    }
    nextPage() {
        if (!this.hasNextPage()) {
            return;
        }
        this.page++;
        this.emitPageEvent();
    }
    previousPage() {
        if (!this.hasPreviousPage()) {
            return;
        }
        this.page--;
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
        this.emitPageEvent();
    }
    updateDisplayedPageSizeOptions() {
        if (!this._initialized) {
            return;
        }
        if (!this.pageSize) {
            this._pageSize = this.pageSizeOptions.length !== 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
        }
        this.displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this.displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this.displayedPageSizeOptions.push(this.pageSize);
        }
        this.displayedPageSizeOptions.sort((a, b) => a - b);
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    }
    emitPageEvent() {
        const event = {
            page: this.page,
            pageSize: this.pageSize,
            length: this.length,
        };
        this.pageChange.next(event);
        this.state.page = this.page;
        this.state.pageSize = this.pageSize;
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.state.updates.next(event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSimpleTablePagination, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NovoLabelService }, { token: i2.NovoActivityTableState }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoSimpleTablePagination, selector: "novo-simple-table-pagination", inputs: { page: "page", length: "length", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageChange: "pageChange" }, ngImport: i0, template: `
    <div class="novo-simple-table-pagination-size">
      <novo-tiles
        *ngIf="displayedPageSizeOptions.length > 1"
        [(ngModel)]="pageSize"
        [options]="displayedPageSizeOptions"
        (onChange)="changePageSize($event)"
        data-automation-id="novo-simple-table-pagination-tiles"
      >
      </novo-tiles>
      <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
    </div>

    <div class="novo-simple-table-range-label-long" data-automation-id="novo-simple-table-pagination-range-label-long">
      {{ longRangeLabel }}
    </div>
    <div class="novo-simple-table-range-label-short" data-automation-id="novo-simple-table-pagination-range-label-short">
      {{ shortRangeLabel }}
    </div>

    <novo-button
      theme="dialogue"
      type="button"
      class="novo-simple-table-pagination-navigation-previous"
      (click)="previousPage()"
      icon="previous"
      side="left"
      [disabled]="!hasPreviousPage()"
      data-automation-id="novo-simple-table-pagination-previous"
    >
      <span>{{ labels.previous }}</span>
    </novo-button>
    <novo-button
      theme="dialogue"
      type="button"
      class="novo-simple-table-pagination-navigation-next"
      (click)="nextPage()"
      icon="next"
      side="right"
      [disabled]="!hasNextPage()"
      data-automation-id="novo-simple-table-pagination-next"
    >
      <span>{{ labels.next }}</span>
    </novo-button>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i5.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "component", type: i7.NovoTilesElement, selector: "novo-tiles", inputs: ["name", "options", "required", "controlDisabled"], outputs: ["onChange", "onSelectedOptionClick", "onDisabledOptionClick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSimpleTablePagination, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-simple-table-pagination',
                    template: `
    <div class="novo-simple-table-pagination-size">
      <novo-tiles
        *ngIf="displayedPageSizeOptions.length > 1"
        [(ngModel)]="pageSize"
        [options]="displayedPageSizeOptions"
        (onChange)="changePageSize($event)"
        data-automation-id="novo-simple-table-pagination-tiles"
      >
      </novo-tiles>
      <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
    </div>

    <div class="novo-simple-table-range-label-long" data-automation-id="novo-simple-table-pagination-range-label-long">
      {{ longRangeLabel }}
    </div>
    <div class="novo-simple-table-range-label-short" data-automation-id="novo-simple-table-pagination-range-label-short">
      {{ shortRangeLabel }}
    </div>

    <novo-button
      theme="dialogue"
      type="button"
      class="novo-simple-table-pagination-navigation-previous"
      (click)="previousPage()"
      icon="previous"
      side="left"
      [disabled]="!hasPreviousPage()"
      data-automation-id="novo-simple-table-pagination-previous"
    >
      <span>{{ labels.previous }}</span>
    </novo-button>
    <novo-button
      theme="dialogue"
      type="button"
      class="novo-simple-table-pagination-navigation-next"
      (click)="nextPage()"
      icon="next"
      side="right"
      [disabled]="!hasNextPage()"
      data-automation-id="novo-simple-table-pagination-next"
    >
      <span>{{ labels.next }}</span>
    </novo-button>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NovoLabelService }, { type: i2.NovoActivityTableState }]; }, propDecorators: { page: [{
                type: Input
            }], length: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], pageChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3NpbXBsZS10YWJsZS9wYWdpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7O0FBRWpELE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBbUQ3QixNQUFNLE9BQU8seUJBQXlCO0lBR3BDLElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDL0Is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O1FBQzdGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOytHQTFJVSx5QkFBeUI7bUdBQXpCLHlCQUF5QixpTkEvQzFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDVDs7NEZBR1UseUJBQXlCO2tCQWpEckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNENUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs0S0FLSyxJQUFJO3NCQURQLEtBQUs7Z0JBY0YsTUFBTTtzQkFEVCxLQUFLO2dCQWFGLFFBQVE7c0JBRFgsS0FBSztnQkFZRixlQUFlO3NCQURsQixLQUFLO2dCQVdOLFVBQVU7c0JBRFQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IE5vdm9TaW1wbGVQYWdpbmF0aW9uRXZlbnQgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgTm92b0FjdGl2aXR5VGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuXG5jb25zdCBERUZBVUxUX1BBR0VfU0laRSA9IDUwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by1zaW1wbGUtdGFibGUtcGFnaW5hdGlvbi1zaXplXCI+XG4gICAgICA8bm92by10aWxlc1xuICAgICAgICAqbmdJZj1cImRpc3BsYXllZFBhZ2VTaXplT3B0aW9ucy5sZW5ndGggPiAxXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJwYWdlU2l6ZVwiXG4gICAgICAgIFtvcHRpb25zXT1cImRpc3BsYXllZFBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAgIChvbkNoYW5nZSk9XCJjaGFuZ2VQYWdlU2l6ZSgkZXZlbnQpXCJcbiAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1zaW1wbGUtdGFibGUtcGFnaW5hdGlvbi10aWxlc1wiXG4gICAgICA+XG4gICAgICA8L25vdm8tdGlsZXM+XG4gICAgICA8ZGl2ICpuZ0lmPVwiZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLmxlbmd0aCA8PSAxXCI+e3sgcGFnZVNpemUgfX08L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXNpbXBsZS10YWJsZS1yYW5nZS1sYWJlbC1sb25nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1zaW1wbGUtdGFibGUtcGFnaW5hdGlvbi1yYW5nZS1sYWJlbC1sb25nXCI+XG4gICAgICB7eyBsb25nUmFuZ2VMYWJlbCB9fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXNpbXBsZS10YWJsZS1yYW5nZS1sYWJlbC1zaG9ydFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tc2ltcGxlLXRhYmxlLXBhZ2luYXRpb24tcmFuZ2UtbGFiZWwtc2hvcnRcIj5cbiAgICAgIHt7IHNob3J0UmFuZ2VMYWJlbCB9fVxuICAgIDwvZGl2PlxuXG4gICAgPG5vdm8tYnV0dG9uXG4gICAgICB0aGVtZT1cImRpYWxvZ3VlXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3M9XCJub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uLW5hdmlnYXRpb24tcHJldmlvdXNcIlxuICAgICAgKGNsaWNrKT1cInByZXZpb3VzUGFnZSgpXCJcbiAgICAgIGljb249XCJwcmV2aW91c1wiXG4gICAgICBzaWRlPVwibGVmdFwiXG4gICAgICBbZGlzYWJsZWRdPVwiIWhhc1ByZXZpb3VzUGFnZSgpXCJcbiAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tc2ltcGxlLXRhYmxlLXBhZ2luYXRpb24tcHJldmlvdXNcIlxuICAgID5cbiAgICAgIDxzcGFuPnt7IGxhYmVscy5wcmV2aW91cyB9fTwvc3Bhbj5cbiAgICA8L25vdm8tYnV0dG9uPlxuICAgIDxub3ZvLWJ1dHRvblxuICAgICAgdGhlbWU9XCJkaWFsb2d1ZVwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwibm92by1zaW1wbGUtdGFibGUtcGFnaW5hdGlvbi1uYXZpZ2F0aW9uLW5leHRcIlxuICAgICAgKGNsaWNrKT1cIm5leHRQYWdlKClcIlxuICAgICAgaWNvbj1cIm5leHRcIlxuICAgICAgc2lkZT1cInJpZ2h0XCJcbiAgICAgIFtkaXNhYmxlZF09XCIhaGFzTmV4dFBhZ2UoKVwiXG4gICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uLW5leHRcIlxuICAgID5cbiAgICAgIDxzcGFuPnt7IGxhYmVscy5uZXh0IH19PC9zcGFuPlxuICAgIDwvbm92by1idXR0b24+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlVGFibGVQYWdpbmF0aW9uIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9pbml0aWFsaXplZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBnZXQgcGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wYWdlO1xuICB9XG4gIHNldCBwYWdlKHBhZ2U6IG51bWJlcikge1xuICAgIHRoaXMuX3BhZ2UgPSBwYWdlO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5sb25nUmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCBmYWxzZSk7XG4gICAgdGhpcy5zaG9ydFJhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgdHJ1ZSk7XG4gICAgdGhpcy5zdGF0ZS5wYWdlID0gdGhpcy5fcGFnZTtcbiAgfVxuICBfcGFnZTogbnVtYmVyID0gMDtcblxuICBASW5wdXQoKVxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcbiAgfVxuICBzZXQgbGVuZ3RoKGxlbmd0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5sb25nUmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCBmYWxzZSk7XG4gICAgdGhpcy5zaG9ydFJhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgdHJ1ZSk7XG4gIH1cbiAgX2xlbmd0aDogbnVtYmVyID0gMDtcblxuICBASW5wdXQoKVxuICBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XG4gIH1cbiAgc2V0IHBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkUGFnZVNpemVPcHRpb25zKCk7XG4gICAgdGhpcy5zdGF0ZS5wYWdlU2l6ZSA9IHRoaXMuX3BhZ2VTaXplO1xuICB9XG4gIHByaXZhdGUgX3BhZ2VTaXplOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgZ2V0IHBhZ2VTaXplT3B0aW9ucygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2VTaXplT3B0aW9ucztcbiAgfVxuICBzZXQgcGFnZVNpemVPcHRpb25zKHBhZ2VTaXplT3B0aW9uczogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9wYWdlU2l6ZU9wdGlvbnMgPSBwYWdlU2l6ZU9wdGlvbnM7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTtcbiAgfVxuICBwcml2YXRlIF9wYWdlU2l6ZU9wdGlvbnM6IG51bWJlcltdID0gW107XG5cbiAgQE91dHB1dCgpXG4gIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9TaW1wbGVQYWdpbmF0aW9uRXZlbnQ+KCk7XG5cbiAgcHVibGljIGRpc3BsYXllZFBhZ2VTaXplT3B0aW9uczogbnVtYmVyW107XG4gIHB1YmxpYyBsb25nUmFuZ2VMYWJlbDogc3RyaW5nO1xuICBwdWJsaWMgc2hvcnRSYW5nZUxhYmVsOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZXNldFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIHN0YXRlOiBOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlKSB7XG4gICAgaWYgKHN0YXRlICYmIHN0YXRlLm9uUmVzZXQpIHtcbiAgICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLm9uUmVzZXQuc3Vic2NyaWJlKChjbGVhcjogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoY2xlYXIpIHtcbiAgICAgICAgICB0aGlzLnBhZ2UgPSAwO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc05leHRQYWdlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wYWdlKys7XG4gICAgdGhpcy5lbWl0UGFnZUV2ZW50KCk7XG4gIH1cblxuICBwdWJsaWMgcHJldmlvdXNQYWdlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNQcmV2aW91c1BhZ2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBhZ2UtLTtcbiAgICB0aGlzLmVtaXRQYWdlRXZlbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNQcmV2aW91c1BhZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZSA+PSAxICYmIHRoaXMucGFnZVNpemUgIT09IDA7XG4gIH1cblxuICBwdWJsaWMgaGFzTmV4dFBhZ2UoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmxlbmd0aCAvIHRoaXMucGFnZVNpemUpIC0gMTtcbiAgICByZXR1cm4gdGhpcy5wYWdlIDwgbnVtYmVyT2ZQYWdlcyAmJiB0aGlzLnBhZ2VTaXplICE9PSAwO1xuICB9XG5cbiAgcHVibGljIGNoYW5nZVBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMucGFnZVNpemUgPSBwYWdlU2l6ZTtcbiAgICB0aGlzLmVtaXRQYWdlRXZlbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGlzcGxheWVkUGFnZVNpemVPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnBhZ2VTaXplKSB7XG4gICAgICB0aGlzLl9wYWdlU2l6ZSA9IHRoaXMucGFnZVNpemVPcHRpb25zLmxlbmd0aCAhPT0gMCA/IHRoaXMucGFnZVNpemVPcHRpb25zWzBdIDogREVGQVVMVF9QQUdFX1NJWkU7XG4gICAgfVxuICAgIHRoaXMuZGlzcGxheWVkUGFnZVNpemVPcHRpb25zID0gdGhpcy5wYWdlU2l6ZU9wdGlvbnMuc2xpY2UoKTtcbiAgICBpZiAodGhpcy5kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMuaW5kZXhPZih0aGlzLnBhZ2VTaXplKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLnB1c2godGhpcy5wYWdlU2l6ZSk7XG4gICAgfVxuICAgIHRoaXMuZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMubG9uZ1JhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgZmFsc2UpO1xuICAgIHRoaXMuc2hvcnRSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0UGFnZUV2ZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0ge1xuICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICBsZW5ndGg6IHRoaXMubGVuZ3RoLFxuICAgIH07XG4gICAgdGhpcy5wYWdlQ2hhbmdlLm5leHQoZXZlbnQpO1xuICAgIHRoaXMuc3RhdGUucGFnZSA9IHRoaXMucGFnZTtcbiAgICB0aGlzLnN0YXRlLnBhZ2VTaXplID0gdGhpcy5wYWdlU2l6ZTtcbiAgICB0aGlzLmxvbmdSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIGZhbHNlKTtcbiAgICB0aGlzLnNob3J0UmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCB0cnVlKTtcbiAgICB0aGlzLnN0YXRlLnVwZGF0ZXMubmV4dChldmVudCk7XG4gIH1cbn1cbiJdfQ==