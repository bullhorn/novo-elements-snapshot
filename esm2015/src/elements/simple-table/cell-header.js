import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Input, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import * as dateFns from 'date-fns';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { NovoDropdownElement } from '../dropdown/Dropdown';
import { NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';
export class NovoSimpleFilterFocus {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        this.element.nativeElement.focus();
    }
}
NovoSimpleFilterFocus.decorators = [
    { type: Directive, args: [{
                selector: '[novoSimpleFilterFocus]',
            },] }
];
NovoSimpleFilterFocus.ctorParameters = () => [
    { type: ElementRef }
];
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
                    min: dateFns.startOfDay(filter.startDate.date),
                    max: dateFns.startOfDay(dateFns.addDays(dateFns.startOfDay(filter.endDate.date), 1)),
                };
            }
            else {
                actualFilter = {
                    min: filter.min ? dateFns.addDays(dateFns.startOfToday(), filter.min) : dateFns.startOfToday(),
                    max: filter.max ? dateFns.addDays(dateFns.startOfTomorrow(), filter.max) : dateFns.startOfTomorrow(),
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
NovoSimpleCellHeader.decorators = [
    { type: Component, args: [{
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
          <list *ngSwitchCase="'date'">
            <ng-container *ngIf="!showCustomRange">
              <item
                [class.active]="activeDateFilter === option.label"
                *ngFor="let option of config.filterConfig.options"
                (click)="filterData(option)"
                [attr.data-automation-id]="'novo-activity-table-filter-' + option.label"
              >
                {{ option.label }} <i class="bhi-check" *ngIf="activeDateFilter === option.label"></i>
              </item>
            </ng-container>
            <item
              [class.active]="labels.customDateRange === activeDateFilter"
              (click)="toggleCustomRange($event, true)"
              *ngIf="config.filterConfig.allowCustomRange && !showCustomRange"
              [keepOpen]="true"
            >
              {{ labels.customDateRange }} <i class="bhi-check" *ngIf="labels.customDateRange === activeDateFilter"></i>
            </item>
            <div class="calendar-container" *ngIf="showCustomRange">
              <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
              <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" range="true"></novo-date-picker>
            </div>
          </list>
          <list *ngSwitchCase="'select'">
            <item
              [class.active]="filter === option"
              *ngFor="let option of config.filterConfig.options"
              (click)="filterData(option)"
              [attr.data-automation-id]="'novo-activity-table-filter-' + (option?.label || option)"
            >
              <span>{{ option?.label || option }}</span>
              <i class="bhi-check" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option"></i>
            </item>
          </list>
          <list *ngSwitchDefault>
            <item class="filter-search" keepOpen="true">
              <input
                type="text"
                [(ngModel)]="filter"
                (ngModelChange)="filterData($event)"
                novoSimpleFilterFocus
                data-automation-id="novo-activity-table-filter-input"
              />
            </item>
          </list>
        </ng-container>
      </novo-dropdown>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoSimpleCellHeader.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NovoLabelService },
    { type: NovoActivityTableState },
    { type: NovoSortFilter, decorators: [{ type: Optional }] },
    { type: CdkColumnDef, decorators: [{ type: Optional }] }
];
NovoSimpleCellHeader.propDecorators = {
    dropdown: [{ type: ViewChild, args: [NovoDropdownElement,] }],
    defaultSort: [{ type: Input }],
    config: [{ type: Input, args: ['novo-simple-cell-config',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1oZWFkZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvc2ltcGxlLXRhYmxlL2NlbGwtaGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFFcEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDeEMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBS2pELE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBb0IsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtJQUFHLENBQUM7SUFFM0MsZUFBZTtRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUM7OztZQVJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2FBQ3BDOzs7WUFuQkMsVUFBVTs7QUFzSFosTUFBTSxPQUFPLG9CQUFv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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9GVDtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQXhIQyxpQkFBaUI7WUFhVixnQkFBZ0I7WUFLaEIsc0JBQXNCO1lBRHRCLGNBQWMsdUJBb0tsQixRQUFRO1lBekxKLFlBQVksdUJBMExoQixRQUFROzs7dUJBNURWLFNBQVMsU0FBQyxtQkFBbUI7MEJBRzdCLEtBQUs7cUJBR0wsS0FBSyxTQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDZGtDb2x1bW5EZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25FbGVtZW50IH0gZnJvbSAnLi4vZHJvcGRvd24vRHJvcGRvd24nO1xuaW1wb3J0IHsgTm92b1NpbXBsZVNvcnRGaWx0ZXIsIE5vdm9TaW1wbGVUYWJsZUNoYW5nZSwgU2ltcGxlVGFibGVDb2x1bW5GaWx0ZXJDb25maWcsIFNpbXBsZVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IE5vdm9Tb3J0RmlsdGVyIH0gZnJvbSAnLi9zb3J0JztcbmltcG9ydCB7IE5vdm9BY3Rpdml0eVRhYmxlU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9TaW1wbGVGaWx0ZXJGb2N1c10nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlRmlsdGVyRm9jdXMgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tub3ZvLXNpbXBsZS1jZWxsLWNvbmZpZ10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsYWJlbCAoY2xpY2spPVwic29ydCgpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1hY3Rpdml0eS10YWJsZS1sYWJlbFwiIFtjbGFzcy5zb3J0LWRpc2FibGVkXT1cIiFjb25maWcuc29ydGFibGVcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2xhYmVsPlxuICAgIDxkaXY+XG4gICAgICA8bm92by1idXR0b25cbiAgICAgICAgKm5nSWY9XCJjb25maWcuc29ydGFibGVcIlxuICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICBbaWNvbl09XCJpY29uXCJcbiAgICAgICAgKGNsaWNrKT1cInNvcnQoKVwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic29ydEFjdGl2ZVwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tYWN0aXZpdHktdGFibGUtc29ydFwiXG4gICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDxub3ZvLWRyb3Bkb3duXG4gICAgICAgICpuZ0lmPVwiY29uZmlnLmZpbHRlcmFibGVcIlxuICAgICAgICBzaWRlPVwicmlnaHRcIlxuICAgICAgICBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi5ub3ZvLXNpbXBsZS10YWJsZVwiXG4gICAgICAgIGNvbnRhaW5lckNsYXNzPVwic2ltcGxlLXRhYmxlLWRyb3Bkb3duXCJcbiAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1hY3Rpdml0eS10YWJsZS1maWx0ZXJcIlxuICAgICAgPlxuICAgICAgICA8bm92by1idXR0b24gdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwiaWNvblwiIGljb249XCJmaWx0ZXJcIiBbY2xhc3MuYWN0aXZlXT1cImZpbHRlckFjdGl2ZVwiPjwvbm92by1idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMuZmlsdGVycyB9fTwvc3Bhbj5cbiAgICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICAgIHRoZW1lPVwiZGlhbG9ndWVcIlxuICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICBpY29uPVwidGltZXNcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImNsZWFyRmlsdGVyKClcIlxuICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJcIlxuICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1hY3Rpdml0eS10YWJsZS1maWx0ZXItY2xlYXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IGxhYmVscy5jbGVhciB9fVxuICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJjb25maWcuZmlsdGVyQ29uZmlnLnR5cGVcIj5cbiAgICAgICAgICA8bGlzdCAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXNob3dDdXN0b21SYW5nZVwiPlxuICAgICAgICAgICAgICA8aXRlbVxuICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlRGF0ZUZpbHRlciA9PT0gb3B0aW9uLmxhYmVsXCJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImZpbHRlckRhdGEob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWFjdGl2aXR5LXRhYmxlLWZpbHRlci0nICsgb3B0aW9uLmxhYmVsXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fSA8aSBjbGFzcz1cImJoaS1jaGVja1wiICpuZ0lmPVwiYWN0aXZlRGF0ZUZpbHRlciA9PT0gb3B0aW9uLmxhYmVsXCI+PC9pPlxuICAgICAgICAgICAgICA8L2l0ZW0+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxpdGVtXG4gICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibGFiZWxzLmN1c3RvbURhdGVSYW5nZSA9PT0gYWN0aXZlRGF0ZUZpbHRlclwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVDdXN0b21SYW5nZSgkZXZlbnQsIHRydWUpXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuZmlsdGVyQ29uZmlnLmFsbG93Q3VzdG9tUmFuZ2UgJiYgIXNob3dDdXN0b21SYW5nZVwiXG4gICAgICAgICAgICAgIFtrZWVwT3Blbl09XCJ0cnVlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3sgbGFiZWxzLmN1c3RvbURhdGVSYW5nZSB9fSA8aSBjbGFzcz1cImJoaS1jaGVja1wiICpuZ0lmPVwibGFiZWxzLmN1c3RvbURhdGVSYW5nZSA9PT0gYWN0aXZlRGF0ZUZpbHRlclwiPjwvaT5cbiAgICAgICAgICAgIDwvaXRlbT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1jb250YWluZXJcIiAqbmdJZj1cInNob3dDdXN0b21SYW5nZVwiPlxuICAgICAgICAgICAgICA8ZGl2IChjbGljayk9XCJ0b2dnbGVDdXN0b21SYW5nZSgkZXZlbnQsIGZhbHNlKVwiPjxpIGNsYXNzPVwiYmhpLXByZXZpb3VzXCI+PC9pPnt7IGxhYmVscy5iYWNrVG9QcmVzZXRGaWx0ZXJzIH19PC9kaXY+XG4gICAgICAgICAgICAgIDxub3ZvLWRhdGUtcGlja2VyIChvblNlbGVjdCk9XCJmaWx0ZXJEYXRhKCRldmVudClcIiBbKG5nTW9kZWwpXT1cImZpbHRlclwiIHJhbmdlPVwidHJ1ZVwiPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbGlzdD5cbiAgICAgICAgICA8bGlzdCAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIj5cbiAgICAgICAgICAgIDxpdGVtXG4gICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiZmlsdGVyID09PSBvcHRpb25cIlxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9uc1wiXG4gICAgICAgICAgICAgIChjbGljayk9XCJmaWx0ZXJEYXRhKG9wdGlvbilcIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tYWN0aXZpdHktdGFibGUtZmlsdGVyLScgKyAob3B0aW9uPy5sYWJlbCB8fCBvcHRpb24pXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4+e3sgb3B0aW9uPy5sYWJlbCB8fCBvcHRpb24gfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNoZWNrXCIgKm5nSWY9XCJvcHRpb24uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPyBmaWx0ZXIgPT09IG9wdGlvbi52YWx1ZSA6IGZpbHRlciA9PT0gb3B0aW9uXCI+PC9pPlxuICAgICAgICAgICAgPC9pdGVtPlxuICAgICAgICAgIDwvbGlzdD5cbiAgICAgICAgICA8bGlzdCAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICAgICAgPGl0ZW0gY2xhc3M9XCJmaWx0ZXItc2VhcmNoXCIga2VlcE9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImZpbHRlclwiXG4gICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiZmlsdGVyRGF0YSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBub3ZvU2ltcGxlRmlsdGVyRm9jdXNcbiAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWZpbHRlci1pbnB1dFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2l0ZW0+XG4gICAgICAgICAgPC9saXN0PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbm92by1kcm9wZG93bj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVDZWxsSGVhZGVyIGltcGxlbWVudHMgTm92b1NpbXBsZVNvcnRGaWx0ZXIsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZChOb3ZvRHJvcGRvd25FbGVtZW50KVxuICBkcm9wZG93bjogTm92b0Ryb3Bkb3duRWxlbWVudDtcblxuICBASW5wdXQoKVxuICBkZWZhdWx0U29ydDogeyBpZDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH07XG5cbiAgQElucHV0KCdub3ZvLXNpbXBsZS1jZWxsLWNvbmZpZycpXG4gIGdldCBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIHNldCBjb25maWcodikge1xuICAgIGlmICghdikge1xuICAgICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgICAgICBmaWx0ZXJDb25maWc6IHtcbiAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jb25maWcgPSB7XG4gICAgICAgIHNvcnRhYmxlOiBjb2VyY2VCb29sZWFuUHJvcGVydHkodi5zb3J0YWJsZSksXG4gICAgICAgIGZpbHRlcmFibGU6IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2LmZpbHRlcmFibGUpLFxuICAgICAgICB0cmFuc2Zvcm1zOiB2LnRyYW5zZm9ybXMgfHwge30sXG4gICAgICAgIGZpbHRlckNvbmZpZzogdi5maWx0ZXJDb25maWcgfHwge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuZmlsdGVyQ29uZmlnLnR5cGUgPT09ICdkYXRlJyAmJiAhdGhpcy5fY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5maWx0ZXJDb25maWcub3B0aW9ucyA9IHRoaXMuZ2V0RGVmYXVsdERhdGVGaWx0ZXJPcHRpb25zKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29uZmlnOiB7XG4gICAgc29ydGFibGU6IGJvb2xlYW47XG4gICAgZmlsdGVyYWJsZTogYm9vbGVhbjtcbiAgICB0cmFuc2Zvcm1zPzogeyBmaWx0ZXI/OiBGdW5jdGlvbjsgc29ydD86IEZ1bmN0aW9uIH07XG4gICAgZmlsdGVyQ29uZmlnOiBTaW1wbGVUYWJsZUNvbHVtbkZpbHRlckNvbmZpZztcbiAgfTtcblxuICBwcml2YXRlIF9yZXJlbmRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNoYW5nZVRpbWVvdXQ6IGFueTtcblxuICBwdWJsaWMgaWNvbjogc3RyaW5nID0gJ3NvcnRhYmxlJztcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyBmaWx0ZXI6IHN0cmluZyB8IGJvb2xlYW47XG4gIHB1YmxpYyBkaXJlY3Rpb246IHN0cmluZztcbiAgcHVibGljIGZpbHRlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc29ydEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd0N1c3RvbVJhbmdlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBhY3RpdmVEYXRlRmlsdGVyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIHN0YXRlOiBOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlLFxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfc29ydDogTm92b1NvcnRGaWx0ZXIsXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9jZGtDb2x1bW5EZWY6IENka0NvbHVtbkRlZixcbiAgKSB7XG4gICAgdGhpcy5fcmVyZW5kZXJTdWJzY3JpcHRpb24gPSBzdGF0ZS51cGRhdGVzLnN1YnNjcmliZSgoY2hhbmdlOiBOb3ZvU2ltcGxlVGFibGVDaGFuZ2UpID0+IHtcbiAgICAgIGlmIChjaGFuZ2Uuc29ydCAmJiBjaGFuZ2Uuc29ydC5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgICB0aGlzLmljb24gPSBgc29ydC0ke2NoYW5nZS5zb3J0LnZhbHVlfWA7XG4gICAgICAgIHRoaXMuc29ydEFjdGl2ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmljb24gPSAnc29ydGFibGUnO1xuICAgICAgICB0aGlzLnNvcnRBY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2UuZmlsdGVyICYmIGNoYW5nZS5maWx0ZXIuaWQgPT09IHRoaXMuaWQpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJBY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmZpbHRlciA9IGNoYW5nZS5maWx0ZXIudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpbHRlckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZpbHRlciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jZGtDb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLl9jZGtDb2x1bW5EZWYubmFtZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGVmYXVsdFNvcnQgJiYgdGhpcy5pZCA9PT0gdGhpcy5kZWZhdWx0U29ydC5pZCkge1xuICAgICAgdGhpcy5pY29uID0gYHNvcnQtJHt0aGlzLmRlZmF1bHRTb3J0LnZhbHVlfWA7XG4gICAgICB0aGlzLnNvcnRBY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVyZW5kZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3J0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoYW5nZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNoYW5nZVRpbWVvdXQpO1xuICAgIH1cbiAgICB0aGlzLmNoYW5nZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5nZXROZXh0U29ydERpcmVjdGlvbih0aGlzLmRpcmVjdGlvbik7XG4gICAgICB0aGlzLl9zb3J0LnNvcnQodGhpcy5pZCwgdGhpcy5kaXJlY3Rpb24sIHRoaXMuX2NvbmZpZy50cmFuc2Zvcm1zLnNvcnQpO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9LCAzMDApO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUN1c3RvbVJhbmdlKGV2ZW50OiBFdmVudCwgdmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zaG93Q3VzdG9tUmFuZ2UgPSB2YWx1ZTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuZHJvcGRvd24ub3BlblBhbmVsKCk7IC8vIEVuc3VyZXMgdGhhdCB0aGUgcGFuZWwgY29ycmVjdGx5IHVwZGF0ZXMgdG8gdGhlIGR5bmFtaWMgc2l6ZSBvZiB0aGUgZHJvcGRvd25cbiAgfVxuXG4gIHB1YmxpYyBmaWx0ZXJEYXRhKGZpbHRlcj86IGFueSk6IHZvaWQge1xuICAgIGxldCBhY3R1YWxGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy50eXBlID09PSAnZGF0ZScgJiYgZmlsdGVyKSB7XG4gICAgICB0aGlzLmFjdGl2ZURhdGVGaWx0ZXIgPSBmaWx0ZXIubGFiZWwgfHwgdGhpcy5sYWJlbHMuY3VzdG9tRGF0ZVJhbmdlO1xuICAgICAgaWYgKGZpbHRlci5zdGFydERhdGUgJiYgZmlsdGVyLmVuZERhdGUpIHtcbiAgICAgICAgYWN0dWFsRmlsdGVyID0ge1xuICAgICAgICAgIG1pbjogZGF0ZUZucy5zdGFydE9mRGF5KGZpbHRlci5zdGFydERhdGUuZGF0ZSksXG4gICAgICAgICAgbWF4OiBkYXRlRm5zLnN0YXJ0T2ZEYXkoZGF0ZUZucy5hZGREYXlzKGRhdGVGbnMuc3RhcnRPZkRheShmaWx0ZXIuZW5kRGF0ZS5kYXRlKSwgMSkpLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0dWFsRmlsdGVyID0ge1xuICAgICAgICAgIG1pbjogZmlsdGVyLm1pbiA/IGRhdGVGbnMuYWRkRGF5cyhkYXRlRm5zLnN0YXJ0T2ZUb2RheSgpLCBmaWx0ZXIubWluKSA6IGRhdGVGbnMuc3RhcnRPZlRvZGF5KCksXG4gICAgICAgICAgbWF4OiBmaWx0ZXIubWF4ID8gZGF0ZUZucy5hZGREYXlzKGRhdGVGbnMuc3RhcnRPZlRvbW9ycm93KCksIGZpbHRlci5tYXgpIDogZGF0ZUZucy5zdGFydE9mVG9tb3Jyb3coKSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWN0dWFsRmlsdGVyICYmIGFjdHVhbEZpbHRlci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xuICAgICAgYWN0dWFsRmlsdGVyID0gZmlsdGVyLnZhbHVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNoYW5nZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNoYW5nZVRpbWVvdXQpO1xuICAgIH1cblxuICAgIHRoaXMuY2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGFjdHVhbEZpbHRlciA9PT0gJycpIHtcbiAgICAgICAgYWN0dWFsRmlsdGVyID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgdGhpcy5fc29ydC5maWx0ZXIodGhpcy5pZCwgYWN0dWFsRmlsdGVyLCB0aGlzLmNvbmZpZy50cmFuc2Zvcm1zLmZpbHRlcik7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIDMwMCk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJGaWx0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5hY3RpdmVEYXRlRmlsdGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsdGVyRGF0YSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROZXh0U29ydERpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiAnYXNjJztcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2FzYycpIHtcbiAgICAgIHJldHVybiAnZGVzYyc7XG4gICAgfVxuICAgIHJldHVybiAnYXNjJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdERhdGVGaWx0ZXJPcHRpb25zKCk6IFNpbXBsZVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uW10ge1xuICAgIGNvbnN0IG9wdHM6IFNpbXBsZVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uW10gPSBbXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MURheSwgbWluOiAtMSwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0N0RheXMsIG1pbjogLTcsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDMwRGF5cywgbWluOiAtMzAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDkwRGF5cywgbWluOiAtOTAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFZZWFyLCBtaW46IC0zNjYsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFEYXksIG1pbjogMCwgbWF4OiAxIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0N0RheXMsIG1pbjogMCwgbWF4OiA3IH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MzBEYXlzLCBtaW46IDAsIG1heDogMzAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQ5MERheXMsIG1pbjogMCwgbWF4OiA5MCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFZZWFyLCBtaW46IDAsIG1heDogMzY2IH0sXG4gICAgXTtcbiAgICByZXR1cm4gb3B0cztcbiAgfVxufVxuIl19