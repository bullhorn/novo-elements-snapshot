import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Input, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { startOfToday, startOfTomorrow } from 'date-fns';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import { NovoDropdownElement } from 'novo-elements/elements/dropdown';
import { NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "./state";
import * as i3 from "./sort";
import * as i4 from "@angular/cdk/table";
import * as i5 from "novo-elements/elements/button";
import * as i6 from "novo-elements/elements/dropdown";
import * as i7 from "novo-elements/elements/common";
import * as i8 from "novo-elements/elements/date-picker";
import * as i9 from "@angular/common";
import * as i10 from "@angular/forms";
export class NovoSimpleFilterFocus {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        this.element.nativeElement.focus();
    }
}
NovoSimpleFilterFocus.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleFilterFocus, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoSimpleFilterFocus.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleFilterFocus, selector: "[novoSimpleFilterFocus]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleFilterFocus, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSimpleFilterFocus]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
export class NovoSimpleCellHeader {
    constructor(changeDetectorRef, labels, state, _sort, _cdkColumnDef) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this._sort = _sort;
        this._cdkColumnDef = _cdkColumnDef;
        this.icon = 'sortable';
        this.filterActive = false;
        this.sortActive = false;
        this.showCustomRange = false;
        this._rerenderSubscription = state.updates.subscribe((change) => {
            if (change.sort && change.sort.id === this.id) {
                this.icon = `sort-${change.sort.value}`;
                this.sortActive = true;
            }
            else {
                this.icon = 'sortable';
                this.sortActive = false;
            }
            if (change.filter && change.filter.id === this.id) {
                this.filterActive = true;
                this.filter = change.filter.value;
            }
            else {
                this.filterActive = false;
                this.filter = undefined;
            }
            changeDetectorRef.markForCheck();
        });
    }
    get config() {
        return this._config;
    }
    set config(v) {
        if (!v) {
            this._config = {
                sortable: false,
                filterable: false,
                filterConfig: {
                    type: 'text',
                },
            };
        }
        else {
            this._config = {
                sortable: coerceBooleanProperty(v.sortable),
                filterable: coerceBooleanProperty(v.filterable),
                transforms: v.transforms || {},
                filterConfig: v.filterConfig || {
                    type: 'text',
                },
            };
            if (this._config.filterConfig.type === 'date' && !this._config.filterConfig.options) {
                this._config.filterConfig.options = this.getDefaultDateFilterOptions();
            }
        }
    }
    ngOnInit() {
        if (this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }
        if (this.defaultSort && this.id === this.defaultSort.id) {
            this.icon = `sort-${this.defaultSort.value}`;
            this.sortActive = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    ngOnDestroy() {
        this._rerenderSubscription.unsubscribe();
    }
    sort() {
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            this.direction = this.getNextSortDirection(this.direction);
            this._sort.sort(this.id, this.direction, this._config.transforms.sort);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    toggleCustomRange(event, value) {
        Helpers.swallowEvent(event);
        this.showCustomRange = value;
        this.changeDetectorRef.markForCheck();
        this.dropdown.openPanel(); // Ensures that the panel correctly updates to the dynamic size of the dropdown
    }
    filterData(filter) {
        let actualFilter = filter;
        if (this.config.filterConfig.type === 'date' && filter) {
            this.activeDateFilter = filter.label || this.labels.customDateRange;
            if (filter.startDate && filter.endDate) {
                actualFilter = {
                    min: DateUtil.startOfDay(filter.startDate.date),
                    max: DateUtil.startOfDay(DateUtil.addDays(DateUtil.startOfDay(filter.endDate.date), 1)),
                };
            }
            else {
                actualFilter = {
                    min: filter.min ? DateUtil.addDays(startOfToday(), filter.min) : startOfToday(),
                    max: filter.max ? DateUtil.addDays(startOfTomorrow(), filter.max) : startOfTomorrow(),
                };
            }
        }
        if (actualFilter && actualFilter.hasOwnProperty('value')) {
            actualFilter = filter.value;
        }
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            if (actualFilter === '') {
                actualFilter = undefined;
            }
            this._sort.filter(this.id, actualFilter, this.config.transforms.filter);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    clearFilter() {
        this.filter = undefined;
        this.activeDateFilter = undefined;
        this.filterData();
    }
    getNextSortDirection(direction) {
        if (!direction) {
            return 'asc';
        }
        if (direction === 'asc') {
            return 'desc';
        }
        return 'asc';
    }
    getDefaultDateFilterOptions() {
        const opts = [
            { label: this.labels.past1Day, min: -1, max: 0 },
            { label: this.labels.past7Days, min: -7, max: 0 },
            { label: this.labels.past30Days, min: -30, max: 0 },
            { label: this.labels.past90Days, min: -90, max: 0 },
            { label: this.labels.past1Year, min: -366, max: 0 },
            { label: this.labels.next1Day, min: 0, max: 1 },
            { label: this.labels.next7Days, min: 0, max: 7 },
            { label: this.labels.next30Days, min: 0, max: 30 },
            { label: this.labels.next90Days, min: 0, max: 90 },
            { label: this.labels.next1Year, min: 0, max: 366 },
        ];
        return opts;
    }
}
NovoSimpleCellHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCellHeader, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NovoLabelService }, { token: i2.NovoActivityTableState }, { token: i3.NovoSortFilter, optional: true }, { token: i4.CdkColumnDef, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoSimpleCellHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleCellHeader, selector: "[novo-simple-cell-config]", inputs: { defaultSort: "defaultSort", config: ["novo-simple-cell-config", "config"] }, viewQueries: [{ propertyName: "dropdown", first: true, predicate: NovoDropdownElement, descendants: true }], ngImport: i0, template: `
    <label (click)="sort()" data-automation-id="novo-activity-table-label" [class.sort-disabled]="!config.sortable">
      <ng-content></ng-content>
    </label>
    <div>
      <novo-button
        *ngIf="config.sortable"
        theme="icon"
        [icon]="icon"
        (click)="sort()"
        [class.active]="sortActive"
        data-automation-id="novo-activity-table-sort"
      ></novo-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="right"
        parentScrollSelector=".novo-simple-table"
        containerClass="simple-table-dropdown"
        data-automation-id="novo-activity-table-filter"
      >
        <novo-button type="button" theme="icon" icon="filter" [class.active]="filterActive"></novo-button>
        <div class="header">
          <span>{{ labels.filters }}</span>
          <novo-button
            theme="dialogue"
            color="negative"
            icon="times"
            (click)="clearFilter()"
            *ngIf="filter"
            data-automation-id="novo-activity-table-filter-clear"
          >
            {{ labels.clear }}
          </novo-button>
        </div>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <novo-optgroup *ngSwitchCase="'date'">
            <ng-container *ngIf="!showCustomRange">
              <novo-option
                [class.active]="activeDateFilter === $any(option).label"
                *ngFor="let option of config.filterConfig.options"
                (click)="filterData(option)"
                [attr.data-automation-id]="'novo-activity-table-filter-' + $any(option).label"
              >
                {{ $any(option).label }} <i class="bhi-check" *ngIf="activeDateFilter === $any(option).label"></i>
              </novo-option>
            </ng-container>
            <novo-option
              [class.active]="labels.customDateRange === activeDateFilter"
              (click)="toggleCustomRange($event, true)"
              *ngIf="config.filterConfig.allowCustomRange && !showCustomRange"
              [keepOpen]="true"
            >
              {{ labels.customDateRange }} <i class="bhi-check" *ngIf="labels.customDateRange === activeDateFilter"></i>
            </novo-option>
            <div class="calendar-container" *ngIf="showCustomRange">
              <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
              <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" [range]="true"></novo-date-picker>
            </div>
          </novo-optgroup>
          <novo-optgroup *ngSwitchCase="'select'">
            <novo-option
              [class.active]="filter === option"
              *ngFor="let option of config.filterConfig.options"
              (click)="filterData(option)"
              [attr.data-automation-id]="'novo-activity-table-filter-' + ($any(option)?.label || option)"
            >
              <span>{{ $any(option)?.label || option }}</span>
              <i class="bhi-check" *ngIf="$any(option).hasOwnProperty('value') ? filter === $any(option).value : filter === option"></i>
            </novo-option>
          </novo-optgroup>
          <novo-optgroup *ngSwitchDefault>
            <novo-option class="filter-search" keepOpen>
              <input
                type="text"
                [(ngModel)]="filter"
                (ngModelChange)="filterData($event)"
                novoSimpleFilterFocus
                data-automation-id="novo-activity-table-filter-input"
              />
            </novo-option>
          </novo-optgroup>
        </ng-container>
      </novo-dropdown>
    </div>
  `, isInline: true, components: [{ type: i5.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i6.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { type: i7.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i7.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i8.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i9.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i9.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i9.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i10.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: NovoSimpleFilterFocus, selector: "[novoSimpleFilterFocus]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCellHeader, decorators: [{
            type: Component,
            args: [{
                    selector: '[novo-simple-cell-config]',
                    template: `
    <label (click)="sort()" data-automation-id="novo-activity-table-label" [class.sort-disabled]="!config.sortable">
      <ng-content></ng-content>
    </label>
    <div>
      <novo-button
        *ngIf="config.sortable"
        theme="icon"
        [icon]="icon"
        (click)="sort()"
        [class.active]="sortActive"
        data-automation-id="novo-activity-table-sort"
      ></novo-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="right"
        parentScrollSelector=".novo-simple-table"
        containerClass="simple-table-dropdown"
        data-automation-id="novo-activity-table-filter"
      >
        <novo-button type="button" theme="icon" icon="filter" [class.active]="filterActive"></novo-button>
        <div class="header">
          <span>{{ labels.filters }}</span>
          <novo-button
            theme="dialogue"
            color="negative"
            icon="times"
            (click)="clearFilter()"
            *ngIf="filter"
            data-automation-id="novo-activity-table-filter-clear"
          >
            {{ labels.clear }}
          </novo-button>
        </div>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <novo-optgroup *ngSwitchCase="'date'">
            <ng-container *ngIf="!showCustomRange">
              <novo-option
                [class.active]="activeDateFilter === $any(option).label"
                *ngFor="let option of config.filterConfig.options"
                (click)="filterData(option)"
                [attr.data-automation-id]="'novo-activity-table-filter-' + $any(option).label"
              >
                {{ $any(option).label }} <i class="bhi-check" *ngIf="activeDateFilter === $any(option).label"></i>
              </novo-option>
            </ng-container>
            <novo-option
              [class.active]="labels.customDateRange === activeDateFilter"
              (click)="toggleCustomRange($event, true)"
              *ngIf="config.filterConfig.allowCustomRange && !showCustomRange"
              [keepOpen]="true"
            >
              {{ labels.customDateRange }} <i class="bhi-check" *ngIf="labels.customDateRange === activeDateFilter"></i>
            </novo-option>
            <div class="calendar-container" *ngIf="showCustomRange">
              <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
              <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" [range]="true"></novo-date-picker>
            </div>
          </novo-optgroup>
          <novo-optgroup *ngSwitchCase="'select'">
            <novo-option
              [class.active]="filter === option"
              *ngFor="let option of config.filterConfig.options"
              (click)="filterData(option)"
              [attr.data-automation-id]="'novo-activity-table-filter-' + ($any(option)?.label || option)"
            >
              <span>{{ $any(option)?.label || option }}</span>
              <i class="bhi-check" *ngIf="$any(option).hasOwnProperty('value') ? filter === $any(option).value : filter === option"></i>
            </novo-option>
          </novo-optgroup>
          <novo-optgroup *ngSwitchDefault>
            <novo-option class="filter-search" keepOpen>
              <input
                type="text"
                [(ngModel)]="filter"
                (ngModelChange)="filterData($event)"
                novoSimpleFilterFocus
                data-automation-id="novo-activity-table-filter-input"
              />
            </novo-option>
          </novo-optgroup>
        </ng-container>
      </novo-dropdown>
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NovoLabelService }, { type: i2.NovoActivityTableState }, { type: i3.NovoSortFilter, decorators: [{
                    type: Optional
                }] }, { type: i4.CdkColumnDef, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { dropdown: [{
                type: ViewChild,
                args: [NovoDropdownElement]
            }], defaultSort: [{
                type: Input
            }], config: [{
                type: Input,
                args: ['novo-simple-cell-config']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1oZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zaW1wbGUtdGFibGUvY2VsbC1oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxRQUFRLEVBQ1IsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDeEMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7QUFLakQsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFvQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQUcsQ0FBQztJQUUzQyxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7bUhBTFUscUJBQXFCO3VHQUFyQixxQkFBcUI7NEZBQXJCLHFCQUFxQjtrQkFIakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUs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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvRlQscytEQTlGVSxxQkFBcUI7NEZBa0dyQixvQkFBb0I7a0JBMUZoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0ZUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQTZESSxRQUFROzswQkFDUixRQUFROzRDQTNEWCxRQUFRO3NCQURQLFNBQVM7dUJBQUMsbUJBQW1CO2dCQUk5QixXQUFXO3NCQURWLEtBQUs7Z0JBSUYsTUFBTTtzQkFEVCxLQUFLO3VCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDZGtDb2x1bW5EZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzdGFydE9mVG9kYXksIHN0YXJ0T2ZUb21vcnJvdyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IE5vdm9Ecm9wZG93bkVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2Ryb3Bkb3duJztcbmltcG9ydCB7IE5vdm9TaW1wbGVTb3J0RmlsdGVyLCBOb3ZvU2ltcGxlVGFibGVDaGFuZ2UsIFNpbXBsZVRhYmxlQ29sdW1uRmlsdGVyQ29uZmlnLCBTaW1wbGVUYWJsZUNvbHVtbkZpbHRlck9wdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOb3ZvU29ydEZpbHRlciB9IGZyb20gJy4vc29ydCc7XG5pbXBvcnQgeyBOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvU2ltcGxlRmlsdGVyRm9jdXNdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUZpbHRlckZvY3VzIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbm92by1zaW1wbGUtY2VsbC1jb25maWddJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGFiZWwgKGNsaWNrKT1cInNvcnQoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tYWN0aXZpdHktdGFibGUtbGFiZWxcIiBbY2xhc3Muc29ydC1kaXNhYmxlZF09XCIhY29uZmlnLnNvcnRhYmxlXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9sYWJlbD5cbiAgICA8ZGl2PlxuICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICpuZ0lmPVwiY29uZmlnLnNvcnRhYmxlXCJcbiAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgW2ljb25dPVwiaWNvblwiXG4gICAgICAgIChjbGljayk9XCJzb3J0KClcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInNvcnRBY3RpdmVcIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLXNvcnRcIlxuICAgICAgPjwvbm92by1idXR0b24+XG4gICAgICA8bm92by1kcm9wZG93blxuICAgICAgICAqbmdJZj1cImNvbmZpZy5maWx0ZXJhYmxlXCJcbiAgICAgICAgc2lkZT1cInJpZ2h0XCJcbiAgICAgICAgcGFyZW50U2Nyb2xsU2VsZWN0b3I9XCIubm92by1zaW1wbGUtdGFibGVcIlxuICAgICAgICBjb250YWluZXJDbGFzcz1cInNpbXBsZS10YWJsZS1kcm9wZG93blwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tYWN0aXZpdHktdGFibGUtZmlsdGVyXCJcbiAgICAgID5cbiAgICAgICAgPG5vdm8tYnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cImljb25cIiBpY29uPVwiZmlsdGVyXCIgW2NsYXNzLmFjdGl2ZV09XCJmaWx0ZXJBY3RpdmVcIj48L25vdm8tYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLmZpbHRlcnMgfX08L3NwYW4+XG4gICAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgICB0aGVtZT1cImRpYWxvZ3VlXCJcbiAgICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgICAgaWNvbj1cInRpbWVzXCJcbiAgICAgICAgICAgIChjbGljayk9XCJjbGVhckZpbHRlcigpXCJcbiAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyXCJcbiAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tYWN0aXZpdHktdGFibGUtZmlsdGVyLWNsZWFyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiY29uZmlnLmZpbHRlckNvbmZpZy50eXBlXCI+XG4gICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFzaG93Q3VzdG9tUmFuZ2VcIj5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uXG4gICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVEYXRlRmlsdGVyID09PSAkYW55KG9wdGlvbikubGFiZWxcIlxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiZmlsdGVyRGF0YShvcHRpb24pXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tYWN0aXZpdHktdGFibGUtZmlsdGVyLScgKyAkYW55KG9wdGlvbikubGFiZWxcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgJGFueShvcHRpb24pLmxhYmVsIH19IDxpIGNsYXNzPVwiYmhpLWNoZWNrXCIgKm5nSWY9XCJhY3RpdmVEYXRlRmlsdGVyID09PSAkYW55KG9wdGlvbikubGFiZWxcIj48L2k+XG4gICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImxhYmVscy5jdXN0b21EYXRlUmFuZ2UgPT09IGFjdGl2ZURhdGVGaWx0ZXJcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlQ3VzdG9tUmFuZ2UoJGV2ZW50LCB0cnVlKVwiXG4gICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLmZpbHRlckNvbmZpZy5hbGxvd0N1c3RvbVJhbmdlICYmICFzaG93Q3VzdG9tUmFuZ2VcIlxuICAgICAgICAgICAgICBba2VlcE9wZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt7IGxhYmVscy5jdXN0b21EYXRlUmFuZ2UgfX0gPGkgY2xhc3M9XCJiaGktY2hlY2tcIiAqbmdJZj1cImxhYmVscy5jdXN0b21EYXRlUmFuZ2UgPT09IGFjdGl2ZURhdGVGaWx0ZXJcIj48L2k+XG4gICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWNvbnRhaW5lclwiICpuZ0lmPVwic2hvd0N1c3RvbVJhbmdlXCI+XG4gICAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cInRvZ2dsZUN1c3RvbVJhbmdlKCRldmVudCwgZmFsc2UpXCI+PGkgY2xhc3M9XCJiaGktcHJldmlvdXNcIj48L2k+e3sgbGFiZWxzLmJhY2tUb1ByZXNldEZpbHRlcnMgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXIgKG9uU2VsZWN0KT1cImZpbHRlckRhdGEoJGV2ZW50KVwiIFsobmdNb2RlbCldPVwiZmlsdGVyXCIgW3JhbmdlXT1cInRydWVcIj48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nU3dpdGNoQ2FzZT1cIidzZWxlY3QnXCI+XG4gICAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJmaWx0ZXIgPT09IG9wdGlvblwiXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImZpbHRlckRhdGEob3B0aW9uKVwiXG4gICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1hY3Rpdml0eS10YWJsZS1maWx0ZXItJyArICgkYW55KG9wdGlvbik/LmxhYmVsIHx8IG9wdGlvbilcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3Bhbj57eyAkYW55KG9wdGlvbik/LmxhYmVsIHx8IG9wdGlvbiB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2hlY2tcIiAqbmdJZj1cIiRhbnkob3B0aW9uKS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA/IGZpbHRlciA9PT0gJGFueShvcHRpb24pLnZhbHVlIDogZmlsdGVyID09PSBvcHRpb25cIj48L2k+XG4gICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICA8bm92by1vcHRncm91cCAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiIGtlZXBPcGVuPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJmaWx0ZXJcIlxuICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cImZpbHRlckRhdGEoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgbm92b1NpbXBsZUZpbHRlckZvY3VzXG4gICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1hY3Rpdml0eS10YWJsZS1maWx0ZXItaW5wdXRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9ub3ZvLWRyb3Bkb3duPlxuICAgIDwvZGl2PlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUNlbGxIZWFkZXIgaW1wbGVtZW50cyBOb3ZvU2ltcGxlU29ydEZpbHRlciwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKE5vdm9Ecm9wZG93bkVsZW1lbnQpXG4gIGRyb3Bkb3duOiBOb3ZvRHJvcGRvd25FbGVtZW50O1xuXG4gIEBJbnB1dCgpXG4gIGRlZmF1bHRTb3J0OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfTtcblxuICBASW5wdXQoJ25vdm8tc2ltcGxlLWNlbGwtY29uZmlnJylcbiAgZ2V0IGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgc2V0IGNvbmZpZyh2KSB7XG4gICAgaWYgKCF2KSB7XG4gICAgICB0aGlzLl9jb25maWcgPSB7XG4gICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgICAgIGZpbHRlckNvbmZpZzoge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgICAgc29ydGFibGU6IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2LnNvcnRhYmxlKSxcbiAgICAgICAgZmlsdGVyYWJsZTogY29lcmNlQm9vbGVhblByb3BlcnR5KHYuZmlsdGVyYWJsZSksXG4gICAgICAgIHRyYW5zZm9ybXM6IHYudHJhbnNmb3JtcyB8fCB7fSxcbiAgICAgICAgZmlsdGVyQ29uZmlnOiB2LmZpbHRlckNvbmZpZyB8fCB7XG4gICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5maWx0ZXJDb25maWcudHlwZSA9PT0gJ2RhdGUnICYmICF0aGlzLl9jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zID0gdGhpcy5nZXREZWZhdWx0RGF0ZUZpbHRlck9wdGlvbnMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb25maWc6IHtcbiAgICBzb3J0YWJsZT86IGJvb2xlYW47XG4gICAgZmlsdGVyYWJsZT86IGJvb2xlYW47XG4gICAgdHJhbnNmb3Jtcz86IHsgZmlsdGVyPzogRnVuY3Rpb247IHNvcnQ/OiBGdW5jdGlvbiB9O1xuICAgIGZpbHRlckNvbmZpZz86IFNpbXBsZVRhYmxlQ29sdW1uRmlsdGVyQ29uZmlnO1xuICB9O1xuXG4gIHByaXZhdGUgX3JlcmVuZGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY2hhbmdlVGltZW91dDogYW55O1xuXG4gIHB1YmxpYyBpY29uOiBzdHJpbmcgPSAnc29ydGFibGUnO1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIGZpbHRlcjogc3RyaW5nIHwgYm9vbGVhbjtcbiAgcHVibGljIGRpcmVjdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgZmlsdGVyQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBzb3J0QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93Q3VzdG9tUmFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGFjdGl2ZURhdGVGaWx0ZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RhdGU6IE5vdm9BY3Rpdml0eVRhYmxlU3RhdGUsXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9zb3J0OiBOb3ZvU29ydEZpbHRlcixcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgX2Nka0NvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICApIHtcbiAgICB0aGlzLl9yZXJlbmRlclN1YnNjcmlwdGlvbiA9IHN0YXRlLnVwZGF0ZXMuc3Vic2NyaWJlKChjaGFuZ2U6IE5vdm9TaW1wbGVUYWJsZUNoYW5nZSkgPT4ge1xuICAgICAgaWYgKGNoYW5nZS5zb3J0ICYmIGNoYW5nZS5zb3J0LmlkID09PSB0aGlzLmlkKSB7XG4gICAgICAgIHRoaXMuaWNvbiA9IGBzb3J0LSR7Y2hhbmdlLnNvcnQudmFsdWV9YDtcbiAgICAgICAgdGhpcy5zb3J0QWN0aXZlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaWNvbiA9ICdzb3J0YWJsZSc7XG4gICAgICAgIHRoaXMuc29ydEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZS5maWx0ZXIgJiYgY2hhbmdlLmZpbHRlci5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgICB0aGlzLmZpbHRlckFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gY2hhbmdlLmZpbHRlci52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlsdGVyQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Nka0NvbHVtbkRlZikge1xuICAgICAgdGhpcy5pZCA9IHRoaXMuX2Nka0NvbHVtbkRlZi5uYW1lO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWZhdWx0U29ydCAmJiB0aGlzLmlkID09PSB0aGlzLmRlZmF1bHRTb3J0LmlkKSB7XG4gICAgICB0aGlzLmljb24gPSBgc29ydC0ke3RoaXMuZGVmYXVsdFNvcnQudmFsdWV9YDtcbiAgICAgIHRoaXMuc29ydEFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXJlbmRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIHNvcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hhbmdlVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2hhbmdlVGltZW91dCk7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmdldE5leHRTb3J0RGlyZWN0aW9uKHRoaXMuZGlyZWN0aW9uKTtcbiAgICAgIHRoaXMuX3NvcnQuc29ydCh0aGlzLmlkLCB0aGlzLmRpcmVjdGlvbiwgdGhpcy5fY29uZmlnLnRyYW5zZm9ybXMuc29ydCk7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIDMwMCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQ3VzdG9tUmFuZ2UoZXZlbnQ6IEV2ZW50LCB2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNob3dDdXN0b21SYW5nZSA9IHZhbHVlO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5kcm9wZG93bi5vcGVuUGFuZWwoKTsgLy8gRW5zdXJlcyB0aGF0IHRoZSBwYW5lbCBjb3JyZWN0bHkgdXBkYXRlcyB0byB0aGUgZHluYW1pYyBzaXplIG9mIHRoZSBkcm9wZG93blxuICB9XG5cbiAgcHVibGljIGZpbHRlckRhdGEoZmlsdGVyPzogYW55KTogdm9pZCB7XG4gICAgbGV0IGFjdHVhbEZpbHRlciA9IGZpbHRlcjtcbiAgICBpZiAodGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLnR5cGUgPT09ICdkYXRlJyAmJiBmaWx0ZXIpIHtcbiAgICAgIHRoaXMuYWN0aXZlRGF0ZUZpbHRlciA9IGZpbHRlci5sYWJlbCB8fCB0aGlzLmxhYmVscy5jdXN0b21EYXRlUmFuZ2U7XG4gICAgICBpZiAoZmlsdGVyLnN0YXJ0RGF0ZSAmJiBmaWx0ZXIuZW5kRGF0ZSkge1xuICAgICAgICBhY3R1YWxGaWx0ZXIgPSB7XG4gICAgICAgICAgbWluOiBEYXRlVXRpbC5zdGFydE9mRGF5KGZpbHRlci5zdGFydERhdGUuZGF0ZSksXG4gICAgICAgICAgbWF4OiBEYXRlVXRpbC5zdGFydE9mRGF5KERhdGVVdGlsLmFkZERheXMoRGF0ZVV0aWwuc3RhcnRPZkRheShmaWx0ZXIuZW5kRGF0ZS5kYXRlKSwgMSkpLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0dWFsRmlsdGVyID0ge1xuICAgICAgICAgIG1pbjogZmlsdGVyLm1pbiA/IERhdGVVdGlsLmFkZERheXMoc3RhcnRPZlRvZGF5KCksIGZpbHRlci5taW4pIDogc3RhcnRPZlRvZGF5KCksXG4gICAgICAgICAgbWF4OiBmaWx0ZXIubWF4ID8gRGF0ZVV0aWwuYWRkRGF5cyhzdGFydE9mVG9tb3Jyb3coKSwgZmlsdGVyLm1heCkgOiBzdGFydE9mVG9tb3Jyb3coKSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWN0dWFsRmlsdGVyICYmIGFjdHVhbEZpbHRlci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xuICAgICAgYWN0dWFsRmlsdGVyID0gZmlsdGVyLnZhbHVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNoYW5nZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNoYW5nZVRpbWVvdXQpO1xuICAgIH1cblxuICAgIHRoaXMuY2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGFjdHVhbEZpbHRlciA9PT0gJycpIHtcbiAgICAgICAgYWN0dWFsRmlsdGVyID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgdGhpcy5fc29ydC5maWx0ZXIodGhpcy5pZCwgYWN0dWFsRmlsdGVyLCB0aGlzLmNvbmZpZy50cmFuc2Zvcm1zLmZpbHRlcik7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIDMwMCk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJGaWx0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5hY3RpdmVEYXRlRmlsdGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsdGVyRGF0YSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROZXh0U29ydERpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiAnYXNjJztcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2FzYycpIHtcbiAgICAgIHJldHVybiAnZGVzYyc7XG4gICAgfVxuICAgIHJldHVybiAnYXNjJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdERhdGVGaWx0ZXJPcHRpb25zKCk6IFNpbXBsZVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uW10ge1xuICAgIGNvbnN0IG9wdHM6IFNpbXBsZVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uW10gPSBbXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MURheSwgbWluOiAtMSwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0N0RheXMsIG1pbjogLTcsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDMwRGF5cywgbWluOiAtMzAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDkwRGF5cywgbWluOiAtOTAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFZZWFyLCBtaW46IC0zNjYsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFEYXksIG1pbjogMCwgbWF4OiAxIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0N0RheXMsIG1pbjogMCwgbWF4OiA3IH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MzBEYXlzLCBtaW46IDAsIG1heDogMzAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQ5MERheXMsIG1pbjogMCwgbWF4OiA5MCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFZZWFyLCBtaW46IDAsIG1heDogMzY2IH0sXG4gICAgXTtcbiAgICByZXR1cm4gb3B0cztcbiAgfVxufVxuIl19