import { Component, Input, Output, EventEmitter, ChangeDetectorRef, LOCALE_ID, Inject, TemplateRef, } from '@angular/core';
import { getWeekViewHeader, getMonthView, } from '../../../utils/calendar-utils/CalendarUtils';
import { Subject } from 'rxjs';
import * as dateFns from 'date-fns';
/**
 * Shows all events on a given month. Example usage:
 *
 * ```
 * &lt;novo-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-calendar-month-view&gt;
 * ```
 */
export class NovoCalendarMonthViewElement {
    /**
     * @hidden
     */
    constructor(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * The locale used to format dates
         */
        this.locale = 'en-US';
        /**
         * The placement of the event tooltip
         */
        this.tooltipPosition = 'top';
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        this.viewDateChange = new EventEmitter();
        this.locale = locale;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (changes.viewDate || changes.excludeDays) {
            this.refreshHeader();
        }
        if (changes.viewDate || changes.events || changes.excludeDays) {
            this.refreshBody();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    eventDropped(day, event) {
        const year = dateFns.getYear(day.date);
        const month = dateFns.getMonth(day.date);
        const date = dateFns.getDate(day.date);
        const newStart = dateFns.setYear(dateFns.setMonth(dateFns.setDate(event.start, date), month), year);
        let newEnd;
        if (event.end) {
            const secondsDiff = dateFns.differenceInSeconds(newStart, event.start);
            newEnd = dateFns.addSeconds(event.end, secondsDiff);
        }
        this.eventTimesChanged.emit({ event, newStart, newEnd });
    }
    refreshHeader() {
        this.columnHeaders = getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
        });
    }
    refreshBody() {
        this.view = getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
        });
        if (this.dayModifier) {
            this.view.days.forEach((day) => this.dayModifier(day));
        }
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.viewDateChange.emit(this.viewDate);
    }
}
NovoCalendarMonthViewElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-month',
                template: `
    <div class="calendar-month-view">
       <novo-calendar-month-header
         [(viewDate)]="viewDate"
         [days]="columnHeaders"
         [locale]="locale"
         [customTemplate]="headerTemplate"
         (viewDateChange)="refreshAll()">
       </novo-calendar-month-header>
      <div class="calendar-days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="calendar-cell-row">
            <novo-calendar-month-day
              *ngFor="let day of view.days | slice : rowIndex : rowIndex + (view.totalDaysVisibleInWeek)"
              [day]="day"
              [locale]="locale"
              [customTemplate]="cellTemplate"
              (click)="dayClicked.emit({day: day})"
              (eventClicked)="eventClicked.emit({ day: day, event: $event.event})">
            </novo-calendar-month-day>
          </div>
        </div>
      </div>
    </div>
  `
            },] }
];
NovoCalendarMonthViewElement.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
NovoCalendarMonthViewElement.propDecorators = {
    viewDate: [{ type: Input }],
    events: [{ type: Input }],
    excludeDays: [{ type: Input }],
    dayModifier: [{ type: Input }],
    refresh: [{ type: Input }],
    locale: [{ type: Input }],
    tooltipPosition: [{ type: Input }],
    weekStartsOn: [{ type: Input }],
    headerTemplate: [{ type: Input }],
    cellTemplate: [{ type: Input }],
    dayClicked: [{ type: Output }],
    eventClicked: [{ type: Output }],
    eventTimesChanged: [{ type: Output }],
    viewDateChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJNb250aFZpZXcuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NhbGVuZGFyL21vbnRoL0NhbGVuZGFyTW9udGhWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBR2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFNTCxpQkFBaUIsRUFDakIsWUFBWSxHQUNiLE1BQU0sNkNBQTZDLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFFcEM7Ozs7Ozs7OztHQVNHO0FBNkJILE1BQU0sT0FBTyw0QkFBNEI7SUFrR3ZDOztPQUVHO0lBQ0gsWUFBb0IsR0FBc0IsRUFBcUIsTUFBYztRQUF6RCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTlGMUM7O1dBRUc7UUFFSCxXQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUU3Qjs7V0FFRztRQUVILGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBZTNCOztXQUVHO1FBRUgsV0FBTSxHQUFXLE9BQU8sQ0FBQztRQUV6Qjs7V0FFRztRQUVILG9CQUFlLEdBQVcsS0FBSyxDQUFDO1FBb0JoQzs7V0FFRztRQUVILGVBQVUsR0FBd0MsSUFBSSxZQUFZLEVBQXlCLENBQUM7UUFFNUY7O1dBRUc7UUFFSCxpQkFBWSxHQUFxRCxJQUFJLFlBQVksRUFBc0MsQ0FBQztRQUV4SDs7V0FFRztRQUVILHNCQUFpQixHQUFpRCxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUdySCxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBcUI1RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLE9BQVk7UUFDdEIsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDM0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUM3RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWSxDQUFDLEdBQWlCLEVBQUUsS0FBb0I7UUFDbEQsTUFBTSxJQUFJLEdBQVcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsTUFBTSxLQUFLLEdBQVcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsTUFBTSxJQUFJLEdBQVcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsTUFBTSxRQUFRLEdBQVMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRyxJQUFJLE1BQVksQ0FBQztRQUNqQixJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDYixNQUFNLFdBQVcsR0FBVyxPQUFPLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvRSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLGlCQUFpQixDQUFDO1lBQ3JDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVztTQUMzQixDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRU0sVUFBVTtRQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7OztZQTlNRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3QlQ7YUFDRjs7O1lBeERDLGlCQUFpQjt5Q0E4SjRCLE1BQU0sU0FBQyxTQUFTOzs7dUJBakc1RCxLQUFLO3FCQU1MLEtBQUs7MEJBTUwsS0FBSzswQkFPTCxLQUFLO3NCQU1MLEtBQUs7cUJBTUwsS0FBSzs4QkFNTCxLQUFLOzJCQU1MLEtBQUs7NkJBTUwsS0FBSzsyQkFNTCxLQUFLO3lCQU1MLE1BQU07MkJBTU4sTUFBTTtnQ0FNTixNQUFNOzZCQUdOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIExPQ0FMRV9JRCxcclxuICBJbmplY3QsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ2FsZW5kYXJFdmVudCxcclxuICBXZWVrRGF5LFxyXG4gIE1vbnRoVmlldyxcclxuICBNb250aFZpZXdEYXksXHJcbiAgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50LFxyXG4gIGdldFdlZWtWaWV3SGVhZGVyLFxyXG4gIGdldE1vbnRoVmlldyxcclxufSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxlbmRhci11dGlscy9DYWxlbmRhclV0aWxzJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xyXG5cclxuLyoqXHJcbiAqIFNob3dzIGFsbCBldmVudHMgb24gYSBnaXZlbiBtb250aC4gRXhhbXBsZSB1c2FnZTpcclxuICpcclxuICogYGBgXHJcbiAqICZsdDtub3ZvLWNhbGVuZGFyLW1vbnRoLXZpZXdcclxuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXHJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiJmd0O1xyXG4gKiAmbHQ7L25vdm8tY2FsZW5kYXItbW9udGgtdmlldyZndDtcclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXItbW9udGgnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItbW9udGgtdmlld1wiPlxyXG4gICAgICAgPG5vdm8tY2FsZW5kYXItbW9udGgtaGVhZGVyXHJcbiAgICAgICAgIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcclxuICAgICAgICAgW2RheXNdPVwiY29sdW1uSGVhZGVyc1wiXHJcbiAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcclxuICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhlYWRlclRlbXBsYXRlXCJcclxuICAgICAgICAgKHZpZXdEYXRlQ2hhbmdlKT1cInJlZnJlc2hBbGwoKVwiPlxyXG4gICAgICAgPC9ub3ZvLWNhbGVuZGFyLW1vbnRoLWhlYWRlcj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWRheXNcIj5cclxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCByb3dJbmRleCBvZiB2aWV3LnJvd09mZnNldHNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1jZWxsLXJvd1wiPlxyXG4gICAgICAgICAgICA8bm92by1jYWxlbmRhci1tb250aC1kYXlcclxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIHZpZXcuZGF5cyB8IHNsaWNlIDogcm93SW5kZXggOiByb3dJbmRleCArICh2aWV3LnRvdGFsRGF5c1Zpc2libGVJbldlZWspXCJcclxuICAgICAgICAgICAgICBbZGF5XT1cImRheVwiXHJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxyXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJjZWxsVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJkYXlDbGlja2VkLmVtaXQoe2RheTogZGF5fSlcIlxyXG4gICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoeyBkYXk6IGRheSwgZXZlbnQ6ICRldmVudC5ldmVudH0pXCI+XHJcbiAgICAgICAgICAgIDwvbm92by1jYWxlbmRhci1tb250aC1kYXk+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFyTW9udGhWaWV3RWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgdmlld0RhdGU6IERhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCB3aWxsIGJlIGhpZGRlbiBvbiB0aGUgdmlld1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgZWFjaCBjZWxsIGlzIHJlbmRlcmVkLiBUaGUgZmlyc3QgYXJndW1lbnQgd2lsbCBjb250YWluIHRoZSBjYWxlbmRhciBjZWxsLlxyXG4gICAqIElmIHlvdSBhZGQgdGhlIGBjc3NDbGFzc2AgcHJvcGVydHkgdG8gdGhlIGNlbGwgaXQgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgY2VsbCBpbiB0aGUgdGVtcGxhdGVcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGRheU1vZGlmaWVyOiBGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICByZWZyZXNoOiBTdWJqZWN0PGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGxvY2FsZTogc3RyaW5nID0gJ2VuLVVTJztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHBsYWNlbWVudCBvZiB0aGUgZXZlbnQgdG9vbHRpcFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgdG9vbHRpcFBvc2l0aW9uOiBzdHJpbmcgPSAndG9wJztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0YXJ0IG51bWJlciBvZiB0aGUgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla1N0YXJ0c09uOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBoZWFkZXJcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgZGF5IGNlbGxcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGNlbGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGRheSBjZWxsIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBkYXlDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBkYXk6IE1vbnRoVmlld0RheSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBkYXk6IE1vbnRoVmlld0RheSB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZGF5OiBhbnk7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGRheTogYW55OyBldmVudDogQ2FsZW5kYXJFdmVudCB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyBkcmFnZ2VkIGFuZCBkcm9wcGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZXZlbnRUaW1lc0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIHZpZXdEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBjb2x1bW5IZWFkZXJzOiBXZWVrRGF5W107XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB2aWV3OiBNb250aFZpZXc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xyXG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZXhjbHVkZURheXMpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlcy52aWV3RGF0ZSB8fCBjaGFuZ2VzLmV2ZW50cyB8fCBjaGFuZ2VzLmV4Y2x1ZGVEYXlzKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZXZlbnREcm9wcGVkKGRheTogTW9udGhWaWV3RGF5LCBldmVudDogQ2FsZW5kYXJFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgeWVhcjogbnVtYmVyID0gZGF0ZUZucy5nZXRZZWFyKGRheS5kYXRlKTtcclxuICAgIGNvbnN0IG1vbnRoOiBudW1iZXIgPSBkYXRlRm5zLmdldE1vbnRoKGRheS5kYXRlKTtcclxuICAgIGNvbnN0IGRhdGU6IG51bWJlciA9IGRhdGVGbnMuZ2V0RGF0ZShkYXkuZGF0ZSk7XHJcbiAgICBjb25zdCBuZXdTdGFydDogRGF0ZSA9IGRhdGVGbnMuc2V0WWVhcihkYXRlRm5zLnNldE1vbnRoKGRhdGVGbnMuc2V0RGF0ZShldmVudC5zdGFydCwgZGF0ZSksIG1vbnRoKSwgeWVhcik7XHJcbiAgICBsZXQgbmV3RW5kOiBEYXRlO1xyXG4gICAgaWYgKGV2ZW50LmVuZCkge1xyXG4gICAgICBjb25zdCBzZWNvbmRzRGlmZjogbnVtYmVyID0gZGF0ZUZucy5kaWZmZXJlbmNlSW5TZWNvbmRzKG5ld1N0YXJ0LCBldmVudC5zdGFydCk7XHJcbiAgICAgIG5ld0VuZCA9IGRhdGVGbnMuYWRkU2Vjb25kcyhldmVudC5lbmQsIHNlY29uZHNEaWZmKTtcclxuICAgIH1cclxuICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7IGV2ZW50LCBuZXdTdGFydCwgbmV3RW5kIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb2x1bW5IZWFkZXJzID0gZ2V0V2Vla1ZpZXdIZWFkZXIoe1xyXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcclxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcclxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaEJvZHkoKTogdm9pZCB7XHJcbiAgICB0aGlzLnZpZXcgPSBnZXRNb250aFZpZXcoe1xyXG4gICAgICBldmVudHM6IHRoaXMuZXZlbnRzLFxyXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcclxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcclxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLmRheU1vZGlmaWVyKSB7XHJcbiAgICAgIHRoaXMudmlldy5kYXlzLmZvckVhY2goKGRheSkgPT4gdGhpcy5kYXlNb2RpZmllcihkYXkpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWZyZXNoQWxsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XHJcbiAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XHJcbiAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQodGhpcy52aWV3RGF0ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==