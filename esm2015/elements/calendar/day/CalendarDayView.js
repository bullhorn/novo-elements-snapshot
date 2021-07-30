import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, LOCALE_ID, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { getDayView, getDayViewHourGrid } from '../../../utils/calendar-utils/CalendarUtils';
/**
 * @hidden
 */
const SEGMENT_HEIGHT = 30;
/**
 * @hidden
 */
const MINUTES_IN_HOUR = 60;
/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * &lt;novo-calendar-day
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-calendar-day&gt;
 * ```
 */
export class NovoCalendarDayViewElement {
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
         * The width in pixels of each event on the view
         */
        this.eventWidth = 150;
        /**
         * The grid size to snap resizing and dragging of events to
         */
        this.eventSnapSize = 30;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPosition = 'top';
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
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
        this.width = 0;
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
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (changes.viewDate || changes.dayStartHour || changes.dayStartMinute || changes.dayEndHour || changes.dayEndMinute) {
            this.refreshHourGrid();
        }
        if (changes.viewDate ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth) {
            this.refreshView();
        }
    }
    /*
      eventDropped(dropEvent: {dropData?: {event?: CalendarEvent}}, segment: DayViewHourSegment): void {
        if (dropEvent.dropData && dropEvent.dropData.event) {
          this.eventTimesChanged.emit({event: dropEvent.dropData.event, newStart: segment.date});
        }
      }
  
      resizeStarted(event: DayViewEvent, resizeEvent: ResizeEvent, dayViewContainer: HTMLElement): void {
        this.currentResize = {
          originalTop: event.top,
          originalHeight: event.height,
          edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
        };
        const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(dayViewContainer);
        this.validateResize = ({rectangle}) => resizeHelper.validateResize({rectangle});
        this.cdr.detectChanges();
      }
  
      resizing(event: DayViewEvent, resizeEvent: ResizeEvent): void {
        if (resizeEvent.edges.top) {
          event.top = this.currentResize.originalTop + +resizeEvent.edges.top;
          event.height = this.currentResize.originalHeight - +resizeEvent.edges.top;
        } else if (resizeEvent.edges.bottom) {
          event.height = this.currentResize.originalHeight + +resizeEvent.edges.bottom;
        }
      }
  
      resizeEnded(dayEvent: DayViewEvent): void {
  
        let pixelsMoved: number;
        if (this.currentResize.edge === 'top') {
          pixelsMoved = (dayEvent.top - this.currentResize.originalTop);
        } else {
          pixelsMoved = (dayEvent.height - this.currentResize.originalHeight);
        }
  
        dayEvent.top = this.currentResize.originalTop;
        dayEvent.height = this.currentResize.originalHeight;
  
        const pixelAmountInMinutes: number = MINUTES_IN_HOUR / (this.hourSegments * SEGMENT_HEIGHT);
        const minutesMoved: number = pixelsMoved * pixelAmountInMinutes;
        let newStart: Date = dayEvent.event.start;
        let newEnd: Date = dayEvent.event.end;
        if (this.currentResize.edge === 'top') {
          newStart = addMinutes(newStart, minutesMoved);
        } else if (newEnd) {
          newEnd = addMinutes(newEnd, minutesMoved);
        }
  
        this.eventTimesChanged.emit({newStart, newEnd, event: dayEvent.event});
        this.currentResize = null;
  
      }
  
      dragStart(event: HTMLElement, dayViewContainer: HTMLElement): void {
        const dragHelper: CalendarDragHelper = new CalendarDragHelper(dayViewContainer, event);
        this.validateDrag = ({x, y}) => !this.currentResize && dragHelper.validateDrag({x, y});
        this.cdr.detectChanges();
      }
  
      eventDragged(dayEvent: DayViewEvent, draggedInPixels: number): void {
        const pixelAmountInMinutes: number = MINUTES_IN_HOUR / (this.hourSegments * SEGMENT_HEIGHT);
        const minutesMoved: number = draggedInPixels * pixelAmountInMinutes;
        const newStart: Date = addMinutes(dayEvent.event.start, minutesMoved);
        let newEnd: Date;
        if (dayEvent.event.end) {
          newEnd = addMinutes(dayEvent.event.end, minutesMoved);
        }
        this.eventTimesChanged.emit({newStart, newEnd, event: dayEvent.event});
      }
      */
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
        if (this.hourSegmentModifier) {
            this.hours.forEach((hour) => {
                hour.segments.forEach((segment) => this.hourSegmentModifier(segment));
            });
        }
    }
    refreshView() {
        this.view = getDayView({
            events: this.events,
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
            eventWidth: this.eventWidth,
            segmentHeight: SEGMENT_HEIGHT,
        });
    }
    refreshAll() {
        this.refreshHourGrid();
        this.refreshView();
    }
}
NovoCalendarDayViewElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-day',
                template: `
    <div class="cal-day-view" #dayViewContainer>
      <novo-calendar-all-day-event
        *ngFor="let event of view.allDayEvents"
        [event]="event"
        [customTemplate]="allDayEventTemplate"
        (eventClicked)="eventClicked.emit({event: event})">
      </novo-calendar-all-day-event>
      <div class="cal-hour-rows">
        <div class="cal-events">
          <div
            #event
            *ngFor="let dayEvent of view?.events"
            class="cal-event-container"
            [style.marginTop.px]="dayEvent.top"
            [style.height.px]="dayEvent.height"
            [style.marginLeft.px]="dayEvent.left + 70"
            [style.width.px]="dayEvent.width - 1">
            <novo-calendar-day-event
              [dayEvent]="dayEvent"
              [tooltipPosition]="tooltipPosition"
              [customTemplate]="eventTemplate"
              (eventClicked)="eventClicked.emit($event)">
            </novo-calendar-day-event>
          </div>
        </div>
        <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="view?.width + 70">
          <novo-calendar-day-hour-segment
            *ngFor="let segment of hour.segments"
            [segment]="segment"
            [locale]="locale"
            [customTemplate]="hourSegmentTemplate"
            (click)="hourSegmentClicked.emit({date: segment.date})">
          </novo-calendar-day-hour-segment>
        </div>
      </div>
    </div>
  `
            },] }
];
NovoCalendarDayViewElement.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
NovoCalendarDayViewElement.propDecorators = {
    viewDate: [{ type: Input }],
    events: [{ type: Input }],
    hourSegments: [{ type: Input }],
    dayStartHour: [{ type: Input }],
    dayStartMinute: [{ type: Input }],
    dayEndHour: [{ type: Input }],
    dayEndMinute: [{ type: Input }],
    eventWidth: [{ type: Input }],
    refresh: [{ type: Input }],
    locale: [{ type: Input }],
    hourSegmentModifier: [{ type: Input }],
    eventSnapSize: [{ type: Input }],
    tooltipPosition: [{ type: Input }],
    hourSegmentTemplate: [{ type: Input }],
    allDayEventTemplate: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }],
    hourSegmentClicked: [{ type: Output }],
    eventTimesChanged: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJEYXlWaWV3LmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci9kYXkvQ2FsZW5kYXJEYXlWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFnQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hKLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBdUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFbEs7O0dBRUc7QUFDSCxNQUFNLGNBQWMsR0FBVyxFQUFFLENBQUM7QUFFbEM7O0dBRUc7QUFDSCxNQUFNLGVBQWUsR0FBVyxFQUFFLENBQUM7QUFFbkM7Ozs7Ozs7OztHQVNHO0FBMENILE1BQU0sT0FBTywwQkFBMEI7SUEySnJDOztPQUVHO0lBQ0gsWUFBb0IsR0FBc0IsRUFBcUIsTUFBYztRQUF6RCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXZKMUM7O1dBRUc7UUFFSCxXQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUU3Qjs7V0FFRztRQUVILGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCOztXQUVHO1FBRUgsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFFekI7O1dBRUc7UUFFSCxtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUUzQjs7V0FFRztRQUVILGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEI7O1dBRUc7UUFFSCxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQjs7V0FFRztRQUVILGVBQVUsR0FBVyxHQUFHLENBQUM7UUFxQnpCOztXQUVHO1FBRUgsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFFM0I7O1dBRUc7UUFFSCxvQkFBZSxHQUFXLEtBQUssQ0FBQztRQW9CaEM7O1dBRUc7UUFFSCxpQkFBWSxHQUEyQyxJQUFJLFlBQVksRUFBNEIsQ0FBQztRQUVwRzs7V0FFRztRQUVILHVCQUFrQixHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUV0Rjs7V0FFRztRQUVILHNCQUFpQixHQUFpRCxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUVySDs7V0FFRztRQUNILFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBTzFCOztXQUVHO1FBQ0gsVUFBSyxHQUFXLENBQUMsQ0FBQztRQThCaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsT0FBWTtRQUN0QixJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUNwSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUNFLE9BQU8sQ0FBQyxRQUFRO1lBQ2hCLE9BQU8sQ0FBQyxNQUFNO1lBQ2QsT0FBTyxDQUFDLFlBQVk7WUFDcEIsT0FBTyxDQUFDLGNBQWM7WUFDdEIsT0FBTyxDQUFDLFVBQVU7WUFDbEIsT0FBTyxDQUFDLFlBQVk7WUFDcEIsT0FBTyxDQUFDLFVBQVUsRUFDbEI7WUFDQSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFzRUk7SUFFSSxlQUFlO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7WUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWM7YUFDNUI7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDMUI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYzthQUM1QjtZQUNELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWTthQUMxQjtZQUNELFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixhQUFhLEVBQUUsY0FBYztTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sVUFBVTtRQUNoQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7OztZQXRXRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNUO2FBQ0Y7OztZQWhFUSxpQkFBaUI7eUNBK05xQixNQUFNLFNBQUMsU0FBUzs7O3VCQTFKNUQsS0FBSztxQkFNTCxLQUFLOzJCQU1MLEtBQUs7MkJBTUwsS0FBSzs2QkFNTCxLQUFLO3lCQU1MLEtBQUs7MkJBTUwsS0FBSzt5QkFNTCxLQUFLO3NCQU1MLEtBQUs7cUJBTUwsS0FBSztrQ0FPTCxLQUFLOzRCQU1MLEtBQUs7OEJBTUwsS0FBSztrQ0FNTCxLQUFLO2tDQU1MLEtBQUs7NEJBTUwsS0FBSzsyQkFNTCxNQUFNO2lDQU1OLE1BQU07Z0NBTU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgTE9DQUxFX0lELCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50LCBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQsIERheVZpZXcsIERheVZpZXdIb3VyLCBnZXREYXlWaWV3LCBnZXREYXlWaWV3SG91ckdyaWQgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxlbmRhci11dGlscy9DYWxlbmRhclV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBAaGlkZGVuXHJcbiAqL1xyXG5jb25zdCBTRUdNRU5UX0hFSUdIVDogbnVtYmVyID0gMzA7XHJcblxyXG4vKipcclxuICogQGhpZGRlblxyXG4gKi9cclxuY29uc3QgTUlOVVRFU19JTl9IT1VSOiBudW1iZXIgPSA2MDtcclxuXHJcbi8qKlxyXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gZGF5LiBFeGFtcGxlIHVzYWdlOlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqICZsdDtub3ZvLWNhbGVuZGFyLWRheVxyXG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcclxuICogIFtldmVudHNdPVwiZXZlbnRzXCImZ3Q7XHJcbiAqICZsdDsvbm92by1jYWxlbmRhci1kYXkmZ3Q7XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWNhbGVuZGFyLWRheScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5LXZpZXdcIiAjZGF5Vmlld0NvbnRhaW5lcj5cclxuICAgICAgPG5vdm8tY2FsZW5kYXItYWxsLWRheS1ldmVudFxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBldmVudCBvZiB2aWV3LmFsbERheUV2ZW50c1wiXHJcbiAgICAgICAgW2V2ZW50XT1cImV2ZW50XCJcclxuICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiYWxsRGF5RXZlbnRUZW1wbGF0ZVwiXHJcbiAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCh7ZXZlbnQ6IGV2ZW50fSlcIj5cclxuICAgICAgPC9ub3ZvLWNhbGVuZGFyLWFsbC1kYXktZXZlbnQ+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtaG91ci1yb3dzXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudHNcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgI2V2ZW50XHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXlFdmVudCBvZiB2aWV3Py5ldmVudHNcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1jb250YWluZXJcIlxyXG4gICAgICAgICAgICBbc3R5bGUubWFyZ2luVG9wLnB4XT1cImRheUV2ZW50LnRvcFwiXHJcbiAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiZGF5RXZlbnQuaGVpZ2h0XCJcclxuICAgICAgICAgICAgW3N0eWxlLm1hcmdpbkxlZnQucHhdPVwiZGF5RXZlbnQubGVmdCArIDcwXCJcclxuICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImRheUV2ZW50LndpZHRoIC0gMVwiPlxyXG4gICAgICAgICAgICA8bm92by1jYWxlbmRhci1kYXktZXZlbnRcclxuICAgICAgICAgICAgICBbZGF5RXZlbnRdPVwiZGF5RXZlbnRcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwidG9vbHRpcFBvc2l0aW9uXCJcclxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDwvbm92by1jYWxlbmRhci1kYXktZXZlbnQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWhvdXJcIiAqbmdGb3I9XCJsZXQgaG91ciBvZiBob3Vyc1wiIFtzdHlsZS5taW5XaWR0aC5weF09XCJ2aWV3Py53aWR0aCArIDcwXCI+XHJcbiAgICAgICAgICA8bm92by1jYWxlbmRhci1kYXktaG91ci1zZWdtZW50XHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBzZWdtZW50IG9mIGhvdXIuc2VnbWVudHNcIlxyXG4gICAgICAgICAgICBbc2VnbWVudF09XCJzZWdtZW50XCJcclxuICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxyXG4gICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaG91clNlZ21lbnRUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJob3VyU2VnbWVudENsaWNrZWQuZW1pdCh7ZGF0ZTogc2VnbWVudC5kYXRlfSlcIj5cclxuICAgICAgICAgIDwvbm92by1jYWxlbmRhci1kYXktaG91ci1zZWdtZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJEYXlWaWV3RWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgdmlld0RhdGU6IERhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgaW4gYW4gaG91ci4gTXVzdCBiZSA8PSA2XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBob3VyU2VnbWVudHM6IG51bWJlciA9IDI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgc3RhcnQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGRheVN0YXJ0SG91cjogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRheSBzdGFydCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGRheVN0YXJ0TWludXRlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IGVuZCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZGF5RW5kSG91cjogbnVtYmVyID0gMjM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgZW5kIG1pbnV0ZXMuIE11c3QgYmUgMC01OVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZGF5RW5kTWludXRlOiBudW1iZXIgPSA1OTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHdpZHRoIGluIHBpeGVscyBvZiBlYWNoIGV2ZW50IG9uIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBldmVudFdpZHRoOiBudW1iZXIgPSAxNTA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBsb2NhbGU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSBlYWNoIGhvdXIgc2VnbWVudCBpcyBjYWxsZWQuIFRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGNvbnRhaW4gdGhlIGhvdXIgc2VnbWVudC5cclxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIHRoZSBzZWdtZW50IGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhvdXIgc2VnbWVudCBpbiB0aGUgdGVtcGxhdGVcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGhvdXJTZWdtZW50TW9kaWZpZXI6IEZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ3JpZCBzaXplIHRvIHNuYXAgcmVzaXppbmcgYW5kIGRyYWdnaW5nIG9mIGV2ZW50cyB0b1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRTbmFwU2l6ZTogbnVtYmVyID0gMzA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHRvb2x0aXBQb3NpdGlvbjogc3RyaW5nID0gJ3RvcCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBob3VyIHNlZ21lbnRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGhvdXJTZWdtZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgYWxsIGRheSBldmVudHNcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGFsbERheUV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZGF5IHZpZXcgZXZlbnRzXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCB0aXRsZSBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudCB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhbiBob3VyIHNlZ21lbnQgaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGhvdXJTZWdtZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZGF0ZTogRGF0ZSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIHJlc2l6ZWQgb3IgZHJhZ2dlZCBhbmQgZHJvcHBlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGV2ZW50VGltZXNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgaG91cnM6IERheVZpZXdIb3VyW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHZpZXc6IERheVZpZXc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB3aWR0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGN1cnJlbnRSZXNpemU6IHtcclxuICAgIG9yaWdpbmFsVG9wOiBudW1iZXI7XHJcbiAgICBvcmlnaW5hbEhlaWdodDogbnVtYmVyO1xyXG4gICAgZWRnZTogc3RyaW5nO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB2YWxpZGF0ZURyYWc6IEZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdmFsaWRhdGVSZXNpemU6IEZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBASW5qZWN0KExPQ0FMRV9JRCkgbG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVmcmVzaCkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSB0aGlzLnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcclxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8IGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHwgY2hhbmdlcy5kYXlFbmRIb3VyIHx8IGNoYW5nZXMuZGF5RW5kTWludXRlKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaEhvdXJHcmlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XHJcbiAgICAgIGNoYW5nZXMuZXZlbnRzIHx8XHJcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8XHJcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHxcclxuICAgICAgY2hhbmdlcy5kYXlFbmRIb3VyIHx8XHJcbiAgICAgIGNoYW5nZXMuZGF5RW5kTWludXRlIHx8XHJcbiAgICAgIGNoYW5nZXMuZXZlbnRXaWR0aFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICBldmVudERyb3BwZWQoZHJvcEV2ZW50OiB7ZHJvcERhdGE/OiB7ZXZlbnQ/OiBDYWxlbmRhckV2ZW50fX0sIHNlZ21lbnQ6IERheVZpZXdIb3VyU2VnbWVudCk6IHZvaWQge1xyXG4gICAgICBpZiAoZHJvcEV2ZW50LmRyb3BEYXRhICYmIGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7ZXZlbnQ6IGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCwgbmV3U3RhcnQ6IHNlZ21lbnQuZGF0ZX0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplU3RhcnRlZChldmVudDogRGF5Vmlld0V2ZW50LCByZXNpemVFdmVudDogUmVzaXplRXZlbnQsIGRheVZpZXdDb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgIHRoaXMuY3VycmVudFJlc2l6ZSA9IHtcclxuICAgICAgICBvcmlnaW5hbFRvcDogZXZlbnQudG9wLFxyXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBldmVudC5oZWlnaHQsXHJcbiAgICAgICAgZWRnZTogdHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLnRvcCAhPT0gJ3VuZGVmaW5lZCcgPyAndG9wJyA6ICdib3R0b20nXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IHJlc2l6ZUhlbHBlcjogQ2FsZW5kYXJSZXNpemVIZWxwZXIgPSBuZXcgQ2FsZW5kYXJSZXNpemVIZWxwZXIoZGF5Vmlld0NvbnRhaW5lcik7XHJcbiAgICAgIHRoaXMudmFsaWRhdGVSZXNpemUgPSAoe3JlY3RhbmdsZX0pID0+IHJlc2l6ZUhlbHBlci52YWxpZGF0ZVJlc2l6ZSh7cmVjdGFuZ2xlfSk7XHJcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNpemluZyhldmVudDogRGF5Vmlld0V2ZW50LCByZXNpemVFdmVudDogUmVzaXplRXZlbnQpOiB2b2lkIHtcclxuICAgICAgaWYgKHJlc2l6ZUV2ZW50LmVkZ2VzLnRvcCkge1xyXG4gICAgICAgIGV2ZW50LnRvcCA9IHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcCArICtyZXNpemVFdmVudC5lZGdlcy50b3A7XHJcbiAgICAgICAgZXZlbnQuaGVpZ2h0ID0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0IC0gK3Jlc2l6ZUV2ZW50LmVkZ2VzLnRvcDtcclxuICAgICAgfSBlbHNlIGlmIChyZXNpemVFdmVudC5lZGdlcy5ib3R0b20pIHtcclxuICAgICAgICBldmVudC5oZWlnaHQgPSB0aGlzLmN1cnJlbnRSZXNpemUub3JpZ2luYWxIZWlnaHQgKyArcmVzaXplRXZlbnQuZWRnZXMuYm90dG9tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplRW5kZWQoZGF5RXZlbnQ6IERheVZpZXdFdmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgbGV0IHBpeGVsc01vdmVkOiBudW1iZXI7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ3RvcCcpIHtcclxuICAgICAgICBwaXhlbHNNb3ZlZCA9IChkYXlFdmVudC50b3AgLSB0aGlzLmN1cnJlbnRSZXNpemUub3JpZ2luYWxUb3ApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBpeGVsc01vdmVkID0gKGRheUV2ZW50LmhlaWdodCAtIHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbEhlaWdodCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRheUV2ZW50LnRvcCA9IHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcDtcclxuICAgICAgZGF5RXZlbnQuaGVpZ2h0ID0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0O1xyXG5cclxuICAgICAgY29uc3QgcGl4ZWxBbW91bnRJbk1pbnV0ZXM6IG51bWJlciA9IE1JTlVURVNfSU5fSE9VUiAvICh0aGlzLmhvdXJTZWdtZW50cyAqIFNFR01FTlRfSEVJR0hUKTtcclxuICAgICAgY29uc3QgbWludXRlc01vdmVkOiBudW1iZXIgPSBwaXhlbHNNb3ZlZCAqIHBpeGVsQW1vdW50SW5NaW51dGVzO1xyXG4gICAgICBsZXQgbmV3U3RhcnQ6IERhdGUgPSBkYXlFdmVudC5ldmVudC5zdGFydDtcclxuICAgICAgbGV0IG5ld0VuZDogRGF0ZSA9IGRheUV2ZW50LmV2ZW50LmVuZDtcclxuICAgICAgaWYgKHRoaXMuY3VycmVudFJlc2l6ZS5lZGdlID09PSAndG9wJykge1xyXG4gICAgICAgIG5ld1N0YXJ0ID0gYWRkTWludXRlcyhuZXdTdGFydCwgbWludXRlc01vdmVkKTtcclxuICAgICAgfSBlbHNlIGlmIChuZXdFbmQpIHtcclxuICAgICAgICBuZXdFbmQgPSBhZGRNaW51dGVzKG5ld0VuZCwgbWludXRlc01vdmVkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtuZXdTdGFydCwgbmV3RW5kLCBldmVudDogZGF5RXZlbnQuZXZlbnR9KTtcclxuICAgICAgdGhpcy5jdXJyZW50UmVzaXplID0gbnVsbDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ1N0YXJ0KGV2ZW50OiBIVE1MRWxlbWVudCwgZGF5Vmlld0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgY29uc3QgZHJhZ0hlbHBlcjogQ2FsZW5kYXJEcmFnSGVscGVyID0gbmV3IENhbGVuZGFyRHJhZ0hlbHBlcihkYXlWaWV3Q29udGFpbmVyLCBldmVudCk7XHJcbiAgICAgIHRoaXMudmFsaWRhdGVEcmFnID0gKHt4LCB5fSkgPT4gIXRoaXMuY3VycmVudFJlc2l6ZSAmJiBkcmFnSGVscGVyLnZhbGlkYXRlRHJhZyh7eCwgeX0pO1xyXG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnREcmFnZ2VkKGRheUV2ZW50OiBEYXlWaWV3RXZlbnQsIGRyYWdnZWRJblBpeGVsczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgIGNvbnN0IHBpeGVsQW1vdW50SW5NaW51dGVzOiBudW1iZXIgPSBNSU5VVEVTX0lOX0hPVVIgLyAodGhpcy5ob3VyU2VnbWVudHMgKiBTRUdNRU5UX0hFSUdIVCk7XHJcbiAgICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZDogbnVtYmVyID0gZHJhZ2dlZEluUGl4ZWxzICogcGl4ZWxBbW91bnRJbk1pbnV0ZXM7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXJ0OiBEYXRlID0gYWRkTWludXRlcyhkYXlFdmVudC5ldmVudC5zdGFydCwgbWludXRlc01vdmVkKTtcclxuICAgICAgbGV0IG5ld0VuZDogRGF0ZTtcclxuICAgICAgaWYgKGRheUV2ZW50LmV2ZW50LmVuZCkge1xyXG4gICAgICAgIG5ld0VuZCA9IGFkZE1pbnV0ZXMoZGF5RXZlbnQuZXZlbnQuZW5kLCBtaW51dGVzTW92ZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7bmV3U3RhcnQsIG5ld0VuZCwgZXZlbnQ6IGRheUV2ZW50LmV2ZW50fSk7XHJcbiAgICB9XHJcbiAgICAqL1xyXG5cclxuICBwcml2YXRlIHJlZnJlc2hIb3VyR3JpZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaG91cnMgPSBnZXREYXlWaWV3SG91ckdyaWQoe1xyXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcclxuICAgICAgaG91clNlZ21lbnRzOiB0aGlzLmhvdXJTZWdtZW50cyxcclxuICAgICAgZGF5U3RhcnQ6IHtcclxuICAgICAgICBob3VyOiB0aGlzLmRheVN0YXJ0SG91cixcclxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5U3RhcnRNaW51dGUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRheUVuZDoge1xyXG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcclxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5ob3VyU2VnbWVudE1vZGlmaWVyKSB7XHJcbiAgICAgIHRoaXMuaG91cnMuZm9yRWFjaCgoaG91cikgPT4ge1xyXG4gICAgICAgIGhvdXIuc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCkgPT4gdGhpcy5ob3VyU2VnbWVudE1vZGlmaWVyKHNlZ21lbnQpKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2hWaWV3KCk6IHZvaWQge1xyXG4gICAgdGhpcy52aWV3ID0gZ2V0RGF5Vmlldyh7XHJcbiAgICAgIGV2ZW50czogdGhpcy5ldmVudHMsXHJcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxyXG4gICAgICBkYXlTdGFydDoge1xyXG4gICAgICAgIGhvdXI6IHRoaXMuZGF5U3RhcnRIb3VyLFxyXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZSxcclxuICAgICAgfSxcclxuICAgICAgZGF5RW5kOiB7XHJcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxyXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlFbmRNaW51dGUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGV2ZW50V2lkdGg6IHRoaXMuZXZlbnRXaWR0aCxcclxuICAgICAgc2VnbWVudEhlaWdodDogU0VHTUVOVF9IRUlHSFQsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaEFsbCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVmcmVzaEhvdXJHcmlkKCk7XHJcbiAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==