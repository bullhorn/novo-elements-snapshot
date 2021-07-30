import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, LOCALE_ID, Output, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { getDayViewHourGrid, getWeekView, getWeekViewHeader, } from '../../../utils/calendar-utils/CalendarUtils';
/**
 * @hidden
 */
const SEGMENT_HEIGHT = 30;
/**
 * @hidden
 */
const MINUTES_IN_HOUR = 60;
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * &lt;novo-calendar-week
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-calendar-week&gt;
 * ```
 */
export class NovoCalendarWeekViewElement {
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
         * The placement of the event tooltip
         */
        this.tooltipPosition = 'bottom';
        /**
         * The precision to display events.
         * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
         */
        this.precision = 'days';
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * Called when a header week day is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * @hidden
         */
        this.hours = [];
        /**
         * @hidden
         */
        this.eventRows = [];
        this.locale = locale;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.detectChanges();
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
        if (changes.events || changes.viewDate || changes.excludeDays) {
            this.refreshBody();
        }
        if (changes.viewDate || changes.dayStartHour || changes.dayStartMinute || changes.dayEndHour || changes.dayEndMinute) {
            this.refreshHourGrid();
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
    /*
      resizeStarted(weekViewContainer: HTMLElement, weekEvent: WeekViewEvent, resizeEvent: ResizeEvent): void {
        this.currentResize = {
          originalOffset: weekEvent.offset,
          originalSpan: weekEvent.span,
          edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        };
        const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(weekViewContainer, this.getDayColumnWidth(weekViewContainer));
        this.validateResize = ({rectangle}) => resizeHelper.validateResize({rectangle});
        this.cdr.detectChanges();
      }
  
      resizing(weekEvent: WeekViewEvent, resizeEvent: ResizeEvent, dayWidth: number): void {
        if (resizeEvent.edges.left) {
          const diff: number = Math.round(+resizeEvent.edges.left / dayWidth);
          weekEvent.offset = this.currentResize.originalOffset + diff;
          weekEvent.span = this.currentResize.originalSpan - diff;
        } else if (resizeEvent.edges.right) {
          const diff: number = Math.round(+resizeEvent.edges.right / dayWidth);
          weekEvent.span = this.currentResize.originalSpan + diff;
        }
      }
  
      resizeEnded(weekEvent: WeekViewEvent): void {
  
        let daysDiff: number;
        if (this.currentResize.edge === 'left') {
          daysDiff = weekEvent.offset - this.currentResize.originalOffset;
        } else {
          daysDiff = weekEvent.span - this.currentResize.originalSpan;
        }
  
        weekEvent.offset = this.currentResize.originalOffset;
        weekEvent.span = this.currentResize.originalSpan;
  
        let newStart: Date = weekEvent.event.start;
        let newEnd: Date = weekEvent.event.end;
        if (this.currentResize.edge === 'left') {
          newStart = addDays(newStart, daysDiff);
        } else if (newEnd) {
          newEnd = addDays(newEnd, daysDiff);
        }
  
        this.eventTimesChanged.emit({newStart, newEnd, event: weekEvent.event});
        this.currentResize = null;
  
      }
  
      eventDragged(weekEvent: WeekViewEvent, draggedByPx: number, dayWidth: number): void {
  
        const daysDragged: number = draggedByPx / dayWidth;
        const newStart: Date = addDays(weekEvent.event.start, daysDragged);
        let newEnd: Date;
        if (weekEvent.event.end) {
          newEnd = addDays(weekEvent.event.end, daysDragged);
        }
  
        this.eventTimesChanged.emit({newStart, newEnd, event: weekEvent.event});
  
      }
  
      dragStart(weekViewContainer: HTMLElement, event: HTMLElement): void {
        const dragHelper: CalendarDragHelper = new CalendarDragHelper(weekViewContainer, event);
        this.validateDrag = ({x, y}) => !this.currentResize && dragHelper.validateDrag({x, y});
        this.cdr.detectChanges();
      }
      */
    getDayColumnWidth(eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    }
    refreshHeader() {
        this.days = getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
        });
    }
    refreshBody() {
        this.eventRows = getWeekView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            hourSegments: this.hourSegments,
            segmentHeight: SEGMENT_HEIGHT,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute,
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute,
            },
        });
    }
    refreshHourGrid() {
        this.hours = getDayViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute,
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute,
            },
        });
        // if (this.hourSegmentModifier) {
        //   this.hours.forEach(hour => {
        //     hour.segments.forEach(segment => this.hourSegmentModifier(segment));
        //   });
        // }
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshHourGrid();
        this.refreshBody();
    }
}
NovoCalendarWeekViewElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-week',
                template: `
    <div class="cal-week-view" #weekViewContainer>
      <novo-calendar-week-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayClicked)="dayClicked.emit($event)">
      </novo-calendar-week-header>
      <div *ngFor="let eventRow of eventRows" #eventRowContainer>
        <div
          class="cal-event-container"
          #event
          *ngFor="let weekEvent of eventRow.row"
          [style.width]="((100 / days.length) * weekEvent.span) + '%'"
          [style.marginTop.px]="weekEvent.top"
          [style.height.px]="weekEvent.height"
          [style.marginLeft]="((100 / days.length) * weekEvent.offset) + '%'">
          <novo-calendar-week-event
            [weekEvent]="weekEvent"
            [tooltipPosition]="tooltipPosition"
            [customTemplate]="eventTemplate"
            (eventClicked)="eventClicked.emit($event)">
          </novo-calendar-week-event>
        </div>
      </div>
      <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="70">
        <novo-calendar-day-hour-segment
          *ngFor="let segment of hour.segments"
          [segment]="segment"
          [locale]="locale"
          [customTemplate]="hourSegmentTemplate"
          (click)="hourSegmentClicked.emit({date: segment.date})">
        </novo-calendar-day-hour-segment>
      </div>
    </div>
  `
            },] }
];
NovoCalendarWeekViewElement.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
NovoCalendarWeekViewElement.propDecorators = {
    viewDate: [{ type: Input }],
    events: [{ type: Input }],
    excludeDays: [{ type: Input }],
    refresh: [{ type: Input }],
    locale: [{ type: Input }],
    tooltipPosition: [{ type: Input }],
    weekStartsOn: [{ type: Input }],
    headerTemplate: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    precision: [{ type: Input }],
    hourSegments: [{ type: Input }],
    dayStartHour: [{ type: Input }],
    dayStartMinute: [{ type: Input }],
    dayEndHour: [{ type: Input }],
    dayEndMinute: [{ type: Input }],
    hourSegmentTemplate: [{ type: Input }],
    hourSegmentClicked: [{ type: Output }],
    dayClicked: [{ type: Output }],
    eventClicked: [{ type: Output }],
    eventTimesChanged: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJXZWVrVmlldy5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2FsZW5kYXIvd2Vlay9DYWxlbmRhcldlZWtWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFJVCxNQUFNLEVBQ04sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFJTCxrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLGlCQUFpQixHQUdsQixNQUFNLDZDQUE2QyxDQUFDO0FBRXJEOztHQUVHO0FBQ0gsTUFBTSxjQUFjLEdBQVcsRUFBRSxDQUFDO0FBRWxDOztHQUVHO0FBQ0gsTUFBTSxlQUFlLEdBQVcsRUFBRSxDQUFDO0FBQ25DOzs7Ozs7Ozs7R0FTRztBQXdDSCxNQUFNLE9BQU8sMkJBQTJCO0lBNEp0Qzs7T0FFRztJQUNILFlBQW9CLEdBQXNCLEVBQXFCLE1BQWM7UUFBekQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF4SjFDOztXQUVHO1FBRUgsV0FBTSxHQUFvQixFQUFFLENBQUM7UUFFN0I7O1dBRUc7UUFFSCxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQWMzQjs7V0FFRztRQUVILG9CQUFlLEdBQVcsUUFBUSxDQUFDO1FBb0JuQzs7O1dBR0c7UUFFSCxjQUFTLEdBQXVCLE1BQU0sQ0FBQztRQUN2Qzs7V0FFRztRQUVILGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCOztXQUVHO1FBRUgsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFFekI7O1dBRUc7UUFFSCxtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUUzQjs7V0FFRztRQUVI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QkFLTixNQUFNOzJCQU1OLE1BQU07Z0NBTU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgTE9DQUxFX0lELFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBUZW1wbGF0ZVJlZixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgQ2FsZW5kYXJFdmVudCxcclxuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQsXHJcbiAgRGF5Vmlld0hvdXIsXHJcbiAgZ2V0RGF5Vmlld0hvdXJHcmlkLFxyXG4gIGdldFdlZWtWaWV3LFxyXG4gIGdldFdlZWtWaWV3SGVhZGVyLFxyXG4gIFdlZWtEYXksXHJcbiAgV2Vla1ZpZXdFdmVudFJvdyxcclxufSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxlbmRhci11dGlscy9DYWxlbmRhclV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBAaGlkZGVuXHJcbiAqL1xyXG5jb25zdCBTRUdNRU5UX0hFSUdIVDogbnVtYmVyID0gMzA7XHJcblxyXG4vKipcclxuICogQGhpZGRlblxyXG4gKi9cclxuY29uc3QgTUlOVVRFU19JTl9IT1VSOiBudW1iZXIgPSA2MDtcclxuLyoqXHJcbiAqIFNob3dzIGFsbCBldmVudHMgb24gYSBnaXZlbiB3ZWVrLiBFeGFtcGxlIHVzYWdlOlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqICZsdDtub3ZvLWNhbGVuZGFyLXdlZWtcclxuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXHJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiJmd0O1xyXG4gKiAmbHQ7L25vdm8tY2FsZW5kYXItd2VlayZndDtcclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXItd2VlaycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJjYWwtd2Vlay12aWV3XCIgI3dlZWtWaWV3Q29udGFpbmVyPlxyXG4gICAgICA8bm92by1jYWxlbmRhci13ZWVrLWhlYWRlclxyXG4gICAgICAgIFtkYXlzXT1cImRheXNcIlxyXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcclxuICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIlxyXG4gICAgICAgIChkYXlDbGlja2VkKT1cImRheUNsaWNrZWQuZW1pdCgkZXZlbnQpXCI+XHJcbiAgICAgIDwvbm92by1jYWxlbmRhci13ZWVrLWhlYWRlcj5cclxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZXZlbnRSb3cgb2YgZXZlbnRSb3dzXCIgI2V2ZW50Um93Q29udGFpbmVyPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWNvbnRhaW5lclwiXHJcbiAgICAgICAgICAjZXZlbnRcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCB3ZWVrRXZlbnQgb2YgZXZlbnRSb3cucm93XCJcclxuICAgICAgICAgIFtzdHlsZS53aWR0aF09XCIoKDEwMCAvIGRheXMubGVuZ3RoKSAqIHdlZWtFdmVudC5zcGFuKSArICclJ1wiXHJcbiAgICAgICAgICBbc3R5bGUubWFyZ2luVG9wLnB4XT1cIndlZWtFdmVudC50b3BcIlxyXG4gICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJ3ZWVrRXZlbnQuaGVpZ2h0XCJcclxuICAgICAgICAgIFtzdHlsZS5tYXJnaW5MZWZ0XT1cIigoMTAwIC8gZGF5cy5sZW5ndGgpICogd2Vla0V2ZW50Lm9mZnNldCkgKyAnJSdcIj5cclxuICAgICAgICAgIDxub3ZvLWNhbGVuZGFyLXdlZWstZXZlbnRcclxuICAgICAgICAgICAgW3dlZWtFdmVudF09XCJ3ZWVrRXZlbnRcIlxyXG4gICAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cInRvb2x0aXBQb3NpdGlvblwiXHJcbiAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICA8L25vdm8tY2FsZW5kYXItd2Vlay1ldmVudD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtaG91clwiICpuZ0Zvcj1cImxldCBob3VyIG9mIGhvdXJzXCIgW3N0eWxlLm1pbldpZHRoLnB4XT1cIjcwXCI+XHJcbiAgICAgICAgPG5vdm8tY2FsZW5kYXItZGF5LWhvdXItc2VnbWVudFxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHNlZ21lbnQgb2YgaG91ci5zZWdtZW50c1wiXHJcbiAgICAgICAgICBbc2VnbWVudF09XCJzZWdtZW50XCJcclxuICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcclxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcclxuICAgICAgICAgIChjbGljayk9XCJob3VyU2VnbWVudENsaWNrZWQuZW1pdCh7ZGF0ZTogc2VnbWVudC5kYXRlfSlcIj5cclxuICAgICAgICA8L25vdm8tY2FsZW5kYXItZGF5LWhvdXItc2VnbWVudD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFyV2Vla1ZpZXdFbGVtZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICB2aWV3RGF0ZTogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb2YgZXZlbnRzIHRvIGRpc3BsYXkgb24gdmlld1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IHdpbGwgYmUgaGlkZGVuIG9uIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICByZWZyZXNoOiBTdWJqZWN0PGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGxvY2FsZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICB0b29sdGlwUG9zaXRpb246IHN0cmluZyA9ICdib3R0b20nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3RhcnQgbnVtYmVyIG9mIHRoZSB3ZWVrXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICB3ZWVrU3RhcnRzT246IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhlYWRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3Igd2VlayB2aWV3IGV2ZW50c1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHByZWNpc2lvbiB0byBkaXNwbGF5IGV2ZW50cy5cclxuICAgKiBgZGF5c2Agd2lsbCByb3VuZCBldmVudCBzdGFydCBhbmQgZW5kIGRhdGVzIHRvIHRoZSBuZWFyZXN0IGRheSBhbmQgYG1pbnV0ZXNgIHdpbGwgbm90IGRvIHRoaXMgcm91bmRpbmdcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHByZWNpc2lvbjogJ2RheXMnIHwgJ21pbnV0ZXMnID0gJ2RheXMnO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgaW4gYW4gaG91ci4gTXVzdCBiZSA8PSA2XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBob3VyU2VnbWVudHM6IG51bWJlciA9IDI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgc3RhcnQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGRheVN0YXJ0SG91cjogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRheSBzdGFydCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGRheVN0YXJ0TWludXRlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IGVuZCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZGF5RW5kSG91cjogbnVtYmVyID0gMjM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgZW5kIG1pbnV0ZXMuIE11c3QgYmUgMC01OVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZGF5RW5kTWludXRlOiBudW1iZXIgPSA1OTtcclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaG91ciBzZWdtZW50XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBob3VyU2VnbWVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIGFuIGhvdXIgc2VnbWVudCBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgaG91clNlZ21lbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGRhdGU6IERhdGUgfT4oKTtcclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhIGhlYWRlciB3ZWVrIGRheSBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZGF5Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZGF0ZTogRGF0ZSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIHRoZSBldmVudCB0aXRsZSBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudCB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyByZXNpemVkIG9yIGRyYWdnZWQgYW5kIGRyb3BwZWRcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBldmVudFRpbWVzQ2hhbmdlZDogRXZlbnRFbWl0dGVyPENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGRheXM6IFdlZWtEYXlbXTtcclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgaG91cnM6IERheVZpZXdIb3VyW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGV2ZW50Um93czogV2Vla1ZpZXdFdmVudFJvd1tdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBjdXJyZW50UmVzaXplOiB7XHJcbiAgICBvcmlnaW5hbE9mZnNldDogbnVtYmVyO1xyXG4gICAgb3JpZ2luYWxTcGFuOiBudW1iZXI7XHJcbiAgICBlZGdlOiBzdHJpbmc7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHZhbGlkYXRlRHJhZzogRnVuY3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB2YWxpZGF0ZVJlc2l6ZTogRnVuY3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy52aWV3RGF0ZSB8fCBjaGFuZ2VzLmV4Y2x1ZGVEYXlzKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaEhlYWRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzLmV2ZW50cyB8fCBjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZXhjbHVkZURheXMpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoQm9keSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8IGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHwgY2hhbmdlcy5kYXlFbmRIb3VyIHx8IGNoYW5nZXMuZGF5RW5kTWludXRlKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaEhvdXJHcmlkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLypcclxuICAgIHJlc2l6ZVN0YXJ0ZWQod2Vla1ZpZXdDb250YWluZXI6IEhUTUxFbGVtZW50LCB3ZWVrRXZlbnQ6IFdlZWtWaWV3RXZlbnQsIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCk6IHZvaWQge1xyXG4gICAgICB0aGlzLmN1cnJlbnRSZXNpemUgPSB7XHJcbiAgICAgICAgb3JpZ2luYWxPZmZzZXQ6IHdlZWtFdmVudC5vZmZzZXQsXHJcbiAgICAgICAgb3JpZ2luYWxTcGFuOiB3ZWVrRXZlbnQuc3BhbixcclxuICAgICAgICBlZGdlOiB0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMubGVmdCAhPT0gJ3VuZGVmaW5lZCcgPyAnbGVmdCcgOiAncmlnaHQnXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IHJlc2l6ZUhlbHBlcjogQ2FsZW5kYXJSZXNpemVIZWxwZXIgPSBuZXcgQ2FsZW5kYXJSZXNpemVIZWxwZXIod2Vla1ZpZXdDb250YWluZXIsIHRoaXMuZ2V0RGF5Q29sdW1uV2lkdGgod2Vla1ZpZXdDb250YWluZXIpKTtcclxuICAgICAgdGhpcy52YWxpZGF0ZVJlc2l6ZSA9ICh7cmVjdGFuZ2xlfSkgPT4gcmVzaXplSGVscGVyLnZhbGlkYXRlUmVzaXplKHtyZWN0YW5nbGV9KTtcclxuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6aW5nKHdlZWtFdmVudDogV2Vla1ZpZXdFdmVudCwgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50LCBkYXlXaWR0aDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgIGlmIChyZXNpemVFdmVudC5lZGdlcy5sZWZ0KSB7XHJcbiAgICAgICAgY29uc3QgZGlmZjogbnVtYmVyID0gTWF0aC5yb3VuZCgrcmVzaXplRXZlbnQuZWRnZXMubGVmdCAvIGRheVdpZHRoKTtcclxuICAgICAgICB3ZWVrRXZlbnQub2Zmc2V0ID0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0ICsgZGlmZjtcclxuICAgICAgICB3ZWVrRXZlbnQuc3BhbiA9IHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW4gLSBkaWZmO1xyXG4gICAgICB9IGVsc2UgaWYgKHJlc2l6ZUV2ZW50LmVkZ2VzLnJpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgZGlmZjogbnVtYmVyID0gTWF0aC5yb3VuZCgrcmVzaXplRXZlbnQuZWRnZXMucmlnaHQgLyBkYXlXaWR0aCk7XHJcbiAgICAgICAgd2Vla0V2ZW50LnNwYW4gPSB0aGlzLmN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuICsgZGlmZjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZUVuZGVkKHdlZWtFdmVudDogV2Vla1ZpZXdFdmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgbGV0IGRheXNEaWZmOiBudW1iZXI7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgZGF5c0RpZmYgPSB3ZWVrRXZlbnQub2Zmc2V0IC0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRheXNEaWZmID0gd2Vla0V2ZW50LnNwYW4gLSB0aGlzLmN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3ZWVrRXZlbnQub2Zmc2V0ID0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0O1xyXG4gICAgICB3ZWVrRXZlbnQuc3BhbiA9IHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW47XHJcblxyXG4gICAgICBsZXQgbmV3U3RhcnQ6IERhdGUgPSB3ZWVrRXZlbnQuZXZlbnQuc3RhcnQ7XHJcbiAgICAgIGxldCBuZXdFbmQ6IERhdGUgPSB3ZWVrRXZlbnQuZXZlbnQuZW5kO1xyXG4gICAgICBpZiAodGhpcy5jdXJyZW50UmVzaXplLmVkZ2UgPT09ICdsZWZ0Jykge1xyXG4gICAgICAgIG5ld1N0YXJ0ID0gYWRkRGF5cyhuZXdTdGFydCwgZGF5c0RpZmYpO1xyXG4gICAgICB9IGVsc2UgaWYgKG5ld0VuZCkge1xyXG4gICAgICAgIG5ld0VuZCA9IGFkZERheXMobmV3RW5kLCBkYXlzRGlmZik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7bmV3U3RhcnQsIG5ld0VuZCwgZXZlbnQ6IHdlZWtFdmVudC5ldmVudH0pO1xyXG4gICAgICB0aGlzLmN1cnJlbnRSZXNpemUgPSBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudERyYWdnZWQod2Vla0V2ZW50OiBXZWVrVmlld0V2ZW50LCBkcmFnZ2VkQnlQeDogbnVtYmVyLCBkYXlXaWR0aDogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICBjb25zdCBkYXlzRHJhZ2dlZDogbnVtYmVyID0gZHJhZ2dlZEJ5UHggLyBkYXlXaWR0aDtcclxuICAgICAgY29uc3QgbmV3U3RhcnQ6IERhdGUgPSBhZGREYXlzKHdlZWtFdmVudC5ldmVudC5zdGFydCwgZGF5c0RyYWdnZWQpO1xyXG4gICAgICBsZXQgbmV3RW5kOiBEYXRlO1xyXG4gICAgICBpZiAod2Vla0V2ZW50LmV2ZW50LmVuZCkge1xyXG4gICAgICAgIG5ld0VuZCA9IGFkZERheXMod2Vla0V2ZW50LmV2ZW50LmVuZCwgZGF5c0RyYWdnZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe25ld1N0YXJ0LCBuZXdFbmQsIGV2ZW50OiB3ZWVrRXZlbnQuZXZlbnR9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ1N0YXJ0KHdlZWtWaWV3Q29udGFpbmVyOiBIVE1MRWxlbWVudCwgZXZlbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgIGNvbnN0IGRyYWdIZWxwZXI6IENhbGVuZGFyRHJhZ0hlbHBlciA9IG5ldyBDYWxlbmRhckRyYWdIZWxwZXIod2Vla1ZpZXdDb250YWluZXIsIGV2ZW50KTtcclxuICAgICAgdGhpcy52YWxpZGF0ZURyYWcgPSAoe3gsIHl9KSA9PiAhdGhpcy5jdXJyZW50UmVzaXplICYmIGRyYWdIZWxwZXIudmFsaWRhdGVEcmFnKHt4LCB5fSk7XHJcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuICAgICovXHJcblxyXG4gIGdldERheUNvbHVtbldpZHRoKGV2ZW50Um93Q29udGFpbmVyOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihldmVudFJvd0NvbnRhaW5lci5vZmZzZXRXaWR0aCAvIHRoaXMuZGF5cy5sZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXlzID0gZ2V0V2Vla1ZpZXdIZWFkZXIoe1xyXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcclxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcclxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaEJvZHkoKTogdm9pZCB7XHJcbiAgICB0aGlzLmV2ZW50Um93cyA9IGdldFdlZWtWaWV3KHtcclxuICAgICAgZXZlbnRzOiB0aGlzLmV2ZW50cyxcclxuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXHJcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXHJcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxyXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxyXG4gICAgICBzZWdtZW50SGVpZ2h0OiBTRUdNRU5UX0hFSUdIVCxcclxuICAgICAgZGF5U3RhcnQ6IHtcclxuICAgICAgICBob3VyOiB0aGlzLmRheVN0YXJ0SG91cixcclxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5U3RhcnRNaW51dGUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRheUVuZDoge1xyXG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcclxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBwcmVjaXNpb246IHRoaXMucHJlY2lzaW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaEhvdXJHcmlkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ob3VycyA9IGdldERheVZpZXdIb3VyR3JpZCh7XHJcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxyXG4gICAgICBkYXlTdGFydDoge1xyXG4gICAgICAgIGhvdXI6IHRoaXMuZGF5U3RhcnRIb3VyLFxyXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZSxcclxuICAgICAgfSxcclxuICAgICAgZGF5RW5kOiB7XHJcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxyXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlFbmRNaW51dGUsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIC8vIGlmICh0aGlzLmhvdXJTZWdtZW50TW9kaWZpZXIpIHtcclxuICAgIC8vICAgdGhpcy5ob3Vycy5mb3JFYWNoKGhvdXIgPT4ge1xyXG4gICAgLy8gICAgIGhvdXIuc2VnbWVudHMuZm9yRWFjaChzZWdtZW50ID0+IHRoaXMuaG91clNlZ21lbnRNb2RpZmllcihzZWdtZW50KSk7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoQWxsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XHJcbiAgICB0aGlzLnJlZnJlc2hIb3VyR3JpZCgpO1xyXG4gICAgdGhpcy5yZWZyZXNoQm9keSgpO1xyXG4gIH1cclxufVxyXG4iXX0=