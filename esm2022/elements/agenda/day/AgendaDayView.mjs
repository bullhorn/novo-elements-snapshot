import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, LOCALE_ID, Output, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { getDayView, getDayViewHourGrid, } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./AgendaDayEvent";
import * as i3 from "./AgendaHourSegment";
import * as i4 from "./AgendaAllDayEvent";
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
 * &lt;novo-agenda-day
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-agenda-day&gt;
 * ```
 */
export class NovoAgendaDayViewElement {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoAgendaDayViewElement, deps: [{ token: i0.ChangeDetectorRef }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoAgendaDayViewElement, selector: "novo-agenda-day", inputs: { viewDate: "viewDate", events: "events", hourSegments: "hourSegments", dayStartHour: "dayStartHour", dayStartMinute: "dayStartMinute", dayEndHour: "dayEndHour", dayEndMinute: "dayEndMinute", eventWidth: "eventWidth", refresh: "refresh", locale: "locale", hourSegmentModifier: "hourSegmentModifier", eventSnapSize: "eventSnapSize", tooltipPosition: "tooltipPosition", hourSegmentTemplate: "hourSegmentTemplate", allDayEventTemplate: "allDayEventTemplate", eventTemplate: "eventTemplate" }, outputs: { eventClicked: "eventClicked", hourSegmentClicked: "hourSegmentClicked", eventTimesChanged: "eventTimesChanged" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="cal-day-view" #dayViewContainer>
      <novo-agenda-all-day-event
        *ngFor="let event of view.allDayEvents"
        [event]="event"
        [customTemplate]="allDayEventTemplate"
        (eventClicked)="eventClicked.emit({ event: event })"
      >
      </novo-agenda-all-day-event>
      <div class="cal-hour-rows">
        <div class="cal-events">
          <div
            #event
            *ngFor="let dayEvent of view?.events"
            class="cal-event-container"
            [style.marginTop.px]="dayEvent.top"
            [style.height.px]="dayEvent.height"
            [style.marginLeft.px]="dayEvent.left + 70"
            [style.width.px]="dayEvent.width - 1"
          >
            <novo-agenda-day-event
              [dayEvent]="dayEvent"
              [tooltipPosition]="tooltipPosition"
              [customTemplate]="eventTemplate"
              (eventClicked)="eventClicked.emit($event)"
            >
            </novo-agenda-day-event>
          </div>
        </div>
        <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="view?.width + 70">
          <novo-agenda-day-hour-segment
            *ngFor="let segment of hour.segments"
            [segment]="segment"
            [locale]="locale"
            [customTemplate]="hourSegmentTemplate"
            (click)="hourSegmentClicked.emit({ date: segment.date })"
          >
          </novo-agenda-day-hour-segment>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [":host ::ng-deep .cal-day-view .cal-event-container{position:absolute}:host ::ng-deep .cal-day-view novo-agenda-day-event{height:inherit}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event{height:inherit;font-size:12px;margin-left:2px;margin-right:2px;min-height:30px;display:flex;flex-flow:row nowrap;background-color:#f7f7f7}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event .cal-event-ribbon{width:4px;min-height:100%}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event .cal-event-group{overflow:hidden;flex:1;padding:2px 10px;display:flex;flex-flow:column}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event .cal-event-title{line-height:26px}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event .cal-event-description{font-size:10px;line-height:13px}:host ::ng-deep .cal-day-view .cal-draggable{cursor:move}:host ::ng-deep .cal-day-view .cal-all-day-event{padding:8px;border:solid 1px}\n", "@charset \"UTF-8\";:host ::ng-deep .cal-day-view .cal-hour-rows,:host ::ng-deep .cal-week-view .cal-hour-rows{width:100%;border:solid 1px #e1e1e1;overflow-x:scroll;position:relative}:host ::ng-deep .cal-day-view .cal-hour:nth-child(2n),:host ::ng-deep .cal-week-view .cal-hour:nth-child(2n){background-color:#f7f7f7}:host ::ng-deep .cal-day-view .cal-hour:nth-child(odd),:host ::ng-deep .cal-week-view .cal-hour:nth-child(odd){background-color:#fff}:host ::ng-deep .cal-day-view .cal-hour-segment,:host ::ng-deep .cal-week-view .cal-hour-segment{height:30px}:host ::ng-deep .cal-day-view .cal-hour-segment:after,:host ::ng-deep .cal-week-view .cal-hour-segment:after{content:\"\\a0\"}:host ::ng-deep .cal-day-view .cal-hour:not(:last-child) .cal-hour-segment,:host ::ng-deep .cal-day-view .cal-hour:last-child :not(:last-child) .cal-hour-segment,:host ::ng-deep .cal-week-view .cal-hour:not(:last-child) .cal-hour-segment,:host ::ng-deep .cal-week-view .cal-hour:last-child :not(:last-child) .cal-hour-segment{border-bottom:thin dashed #e1e1e1}:host ::ng-deep .cal-day-view .cal-time,:host ::ng-deep .cal-week-view .cal-time{font-weight:700;padding-top:5px;width:70px;text-align:center;color:#9e9e9e}:host ::ng-deep .cal-day-view .cal-hour-segment.cal-after-hour-start .cal-time,:host ::ng-deep .cal-week-view .cal-hour-segment.cal-after-hour-start .cal-time{display:none}:host ::ng-deep .cal-day-view .cal-hour-segment:hover,:host ::ng-deep .cal-day-view .cal-drag-over .cal-hour-segment,:host ::ng-deep .cal-week-view .cal-hour-segment:hover,:host ::ng-deep .cal-week-view .cal-drag-over .cal-hour-segment{background-color:#ededed}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.NovoAgendaDayEventElement, selector: "novo-agenda-day-event", inputs: ["dayEvent", "tooltipPosition", "customTemplate"], outputs: ["eventClicked"] }, { kind: "component", type: i3.NovoAgendaHourSegmentElement, selector: "novo-agenda-day-hour-segment", inputs: ["segment", "locale", "customTemplate"] }, { kind: "component", type: i4.NovoAgendaAllDayEventElement, selector: "novo-agenda-all-day-event", inputs: ["event", "customTemplate"], outputs: ["eventClicked"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoAgendaDayViewElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-agenda-day', template: `
    <div class="cal-day-view" #dayViewContainer>
      <novo-agenda-all-day-event
        *ngFor="let event of view.allDayEvents"
        [event]="event"
        [customTemplate]="allDayEventTemplate"
        (eventClicked)="eventClicked.emit({ event: event })"
      >
      </novo-agenda-all-day-event>
      <div class="cal-hour-rows">
        <div class="cal-events">
          <div
            #event
            *ngFor="let dayEvent of view?.events"
            class="cal-event-container"
            [style.marginTop.px]="dayEvent.top"
            [style.height.px]="dayEvent.height"
            [style.marginLeft.px]="dayEvent.left + 70"
            [style.width.px]="dayEvent.width - 1"
          >
            <novo-agenda-day-event
              [dayEvent]="dayEvent"
              [tooltipPosition]="tooltipPosition"
              [customTemplate]="eventTemplate"
              (eventClicked)="eventClicked.emit($event)"
            >
            </novo-agenda-day-event>
          </div>
        </div>
        <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="view?.width + 70">
          <novo-agenda-day-hour-segment
            *ngFor="let segment of hour.segments"
            [segment]="segment"
            [locale]="locale"
            [customTemplate]="hourSegmentTemplate"
            (click)="hourSegmentClicked.emit({ date: segment.date })"
          >
          </novo-agenda-day-hour-segment>
        </div>
      </div>
    </div>
  `, styles: [":host ::ng-deep .cal-day-view .cal-event-container{position:absolute}:host ::ng-deep .cal-day-view novo-agenda-day-event{height:inherit}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event{height:inherit;font-size:12px;margin-left:2px;margin-right:2px;min-height:30px;display:flex;flex-flow:row nowrap;background-color:#f7f7f7}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event .cal-event-ribbon{width:4px;min-height:100%}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event .cal-event-group{overflow:hidden;flex:1;padding:2px 10px;display:flex;flex-flow:column}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event .cal-event-title{line-height:26px}:host ::ng-deep .cal-day-view novo-agenda-day-event .cal-event .cal-event-description{font-size:10px;line-height:13px}:host ::ng-deep .cal-day-view .cal-draggable{cursor:move}:host ::ng-deep .cal-day-view .cal-all-day-event{padding:8px;border:solid 1px}\n", "@charset \"UTF-8\";:host ::ng-deep .cal-day-view .cal-hour-rows,:host ::ng-deep .cal-week-view .cal-hour-rows{width:100%;border:solid 1px #e1e1e1;overflow-x:scroll;position:relative}:host ::ng-deep .cal-day-view .cal-hour:nth-child(2n),:host ::ng-deep .cal-week-view .cal-hour:nth-child(2n){background-color:#f7f7f7}:host ::ng-deep .cal-day-view .cal-hour:nth-child(odd),:host ::ng-deep .cal-week-view .cal-hour:nth-child(odd){background-color:#fff}:host ::ng-deep .cal-day-view .cal-hour-segment,:host ::ng-deep .cal-week-view .cal-hour-segment{height:30px}:host ::ng-deep .cal-day-view .cal-hour-segment:after,:host ::ng-deep .cal-week-view .cal-hour-segment:after{content:\"\\a0\"}:host ::ng-deep .cal-day-view .cal-hour:not(:last-child) .cal-hour-segment,:host ::ng-deep .cal-day-view .cal-hour:last-child :not(:last-child) .cal-hour-segment,:host ::ng-deep .cal-week-view .cal-hour:not(:last-child) .cal-hour-segment,:host ::ng-deep .cal-week-view .cal-hour:last-child :not(:last-child) .cal-hour-segment{border-bottom:thin dashed #e1e1e1}:host ::ng-deep .cal-day-view .cal-time,:host ::ng-deep .cal-week-view .cal-time{font-weight:700;padding-top:5px;width:70px;text-align:center;color:#9e9e9e}:host ::ng-deep .cal-day-view .cal-hour-segment.cal-after-hour-start .cal-time,:host ::ng-deep .cal-week-view .cal-hour-segment.cal-after-hour-start .cal-time{display:none}:host ::ng-deep .cal-day-view .cal-hour-segment:hover,:host ::ng-deep .cal-day-view .cal-drag-over .cal-hour-segment,:host ::ng-deep .cal-week-view .cal-hour-segment:hover,:host ::ng-deep .cal-week-view .cal-drag-over .cal-hour-segment{background-color:#ededed}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; }, propDecorators: { viewDate: [{
                type: Input
            }], events: [{
                type: Input
            }], hourSegments: [{
                type: Input
            }], dayStartHour: [{
                type: Input
            }], dayStartMinute: [{
                type: Input
            }], dayEndHour: [{
                type: Input
            }], dayEndMinute: [{
                type: Input
            }], eventWidth: [{
                type: Input
            }], refresh: [{
                type: Input
            }], locale: [{
                type: Input
            }], hourSegmentModifier: [{
                type: Input
            }], eventSnapSize: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], hourSegmentTemplate: [{
                type: Input
            }], allDayEventTemplate: [{
                type: Input
            }], eventTemplate: [{
                type: Input
            }], eventClicked: [{
                type: Output
            }], hourSegmentClicked: [{
                type: Output
            }], eventTimesChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhRGF5Vmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2FnZW5kYS9kYXkvQWdlbmRhRGF5Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBSVQsTUFBTSxFQUNOLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBS0wsVUFBVSxFQUNWLGtCQUFrQixHQUNuQixNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFFN0I7O0dBRUc7QUFDSCxNQUFNLGNBQWMsR0FBVyxFQUFFLENBQUM7QUFFbEM7O0dBRUc7QUFDSCxNQUFNLGVBQWUsR0FBVyxFQUFFLENBQUM7QUFFbkM7Ozs7Ozs7OztHQVNHO0FBK0NILE1BQU0sT0FBTyx3QkFBd0I7SUEySm5DOztPQUVHO0lBQ0gsWUFBb0IsR0FBc0IsRUFBcUIsTUFBYztRQUF6RCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXZKMUM7O1dBRUc7UUFFSCxXQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUU3Qjs7V0FFRztRQUVILGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCOztXQUVHO1FBRUgsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFFekI7O1dBRUc7UUFFSCxtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUUzQjs7V0FFRztRQUVILGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEI7O1dBRUc7UUFFSCxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQjs7V0FFRztRQUVILGVBQVUsR0FBVyxHQUFHLENBQUM7UUFxQnpCOztXQUVHO1FBRUgsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFFM0I7O1dBRUc7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QkFBa0I7c0JBRGpCLE1BQU07Z0JBT1AsaUJBQWlCO3NCQURoQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBMT0NBTEVfSUQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQsXG4gIERheVZpZXcsXG4gIERheVZpZXdIb3VyLFxuICBnZXREYXlWaWV3LFxuICBnZXREYXlWaWV3SG91ckdyaWQsXG59IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgU0VHTUVOVF9IRUlHSFQ6IG51bWJlciA9IDMwO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgTUlOVVRFU19JTl9IT1VSOiBudW1iZXIgPSA2MDtcblxuLyoqXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gZGF5LiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICZsdDtub3ZvLWFnZW5kYS1kYXlcbiAqICBbdmlld0RhdGVdPVwidmlld0RhdGVcIlxuICogIFtldmVudHNdPVwiZXZlbnRzXCImZ3Q7XG4gKiAmbHQ7L25vdm8tYWdlbmRhLWRheSZndDtcbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFnZW5kYS1kYXknLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5LXZpZXdcIiAjZGF5Vmlld0NvbnRhaW5lcj5cbiAgICAgIDxub3ZvLWFnZW5kYS1hbGwtZGF5LWV2ZW50XG4gICAgICAgICpuZ0Zvcj1cImxldCBldmVudCBvZiB2aWV3LmFsbERheUV2ZW50c1wiXG4gICAgICAgIFtldmVudF09XCJldmVudFwiXG4gICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJhbGxEYXlFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCh7IGV2ZW50OiBldmVudCB9KVwiXG4gICAgICA+XG4gICAgICA8L25vdm8tYWdlbmRhLWFsbC1kYXktZXZlbnQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWhvdXItcm93c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50c1wiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICNldmVudFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGRheUV2ZW50IG9mIHZpZXc/LmV2ZW50c1wiXG4gICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgICAgW3N0eWxlLm1hcmdpblRvcC5weF09XCJkYXlFdmVudC50b3BcIlxuICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJkYXlFdmVudC5oZWlnaHRcIlxuICAgICAgICAgICAgW3N0eWxlLm1hcmdpbkxlZnQucHhdPVwiZGF5RXZlbnQubGVmdCArIDcwXCJcbiAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJkYXlFdmVudC53aWR0aCAtIDFcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxub3ZvLWFnZW5kYS1kYXktZXZlbnRcbiAgICAgICAgICAgICAgW2RheUV2ZW50XT1cImRheUV2ZW50XCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJ0b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L25vdm8tYWdlbmRhLWRheS1ldmVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtaG91clwiICpuZ0Zvcj1cImxldCBob3VyIG9mIGhvdXJzXCIgW3N0eWxlLm1pbldpZHRoLnB4XT1cInZpZXc/LndpZHRoICsgNzBcIj5cbiAgICAgICAgICA8bm92by1hZ2VuZGEtZGF5LWhvdXItc2VnbWVudFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHNlZ21lbnQgb2YgaG91ci5zZWdtZW50c1wiXG4gICAgICAgICAgICBbc2VnbWVudF09XCJzZWdtZW50XCJcbiAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJob3VyU2VnbWVudENsaWNrZWQuZW1pdCh7IGRhdGU6IHNlZ21lbnQuZGF0ZSB9KVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvbm92by1hZ2VuZGEtZGF5LWhvdXItc2VnbWVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vQWdlbmRhRGF5Vmlldy5zY3NzJywgJy4uL2NvbW1vbi9BZ2VuZGFIb3Vyc0xheW91dC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BZ2VuZGFEYXlWaWV3RWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKVxuICB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXZlbnRzIHRvIGRpc3BsYXkgb24gdmlld1xuICAgKi9cbiAgQElucHV0KClcbiAgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBzZWdtZW50cyBpbiBhbiBob3VyLiBNdXN0IGJlIDw9IDZcbiAgICovXG4gIEBJbnB1dCgpXG4gIGhvdXJTZWdtZW50czogbnVtYmVyID0gMjtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KClcbiAgZGF5U3RhcnRIb3VyOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KClcbiAgZGF5U3RhcnRNaW51dGU6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKVxuICBkYXlFbmRIb3VyOiBudW1iZXIgPSAyMztcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKVxuICBkYXlFbmRNaW51dGU6IG51bWJlciA9IDU5O1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggaW4gcGl4ZWxzIG9mIGVhY2ggZXZlbnQgb24gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpXG4gIGV2ZW50V2lkdGg6IG51bWJlciA9IDE1MDtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKVxuICByZWZyZXNoOiBTdWJqZWN0PGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcbiAgICovXG4gIEBJbnB1dCgpXG4gIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIGVhY2ggaG91ciBzZWdtZW50IGlzIGNhbGxlZC4gVGhlIGZpcnN0IGFyZ3VtZW50IHdpbGwgY29udGFpbiB0aGUgaG91ciBzZWdtZW50LlxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIHRoZSBzZWdtZW50IGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhvdXIgc2VnbWVudCBpbiB0aGUgdGVtcGxhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIGhvdXJTZWdtZW50TW9kaWZpZXI6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgZ3JpZCBzaXplIHRvIHNuYXAgcmVzaXppbmcgYW5kIGRyYWdnaW5nIG9mIGV2ZW50cyB0b1xuICAgKi9cbiAgQElucHV0KClcbiAgZXZlbnRTbmFwU2l6ZTogbnVtYmVyID0gMzA7XG5cbiAgLyoqXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBQb3NpdGlvbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBob3VyIHNlZ21lbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIGhvdXJTZWdtZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgYWxsIGRheSBldmVudHNcbiAgICovXG4gIEBJbnB1dCgpXG4gIGFsbERheUV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZGF5IHZpZXcgZXZlbnRzXG4gICAqL1xuICBASW5wdXQoKVxuICBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCB0aXRsZSBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudCB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBob3VyIHNlZ21lbnQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGhvdXJTZWdtZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZGF0ZTogRGF0ZSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIHJlc2l6ZWQgb3IgZHJhZ2dlZCBhbmQgZHJvcHBlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50VGltZXNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBob3VyczogRGF5Vmlld0hvdXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2aWV3OiBEYXlWaWV3O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB3aWR0aDogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcmVmcmVzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjdXJyZW50UmVzaXplOiB7XG4gICAgb3JpZ2luYWxUb3A6IG51bWJlcjtcbiAgICBvcmlnaW5hbEhlaWdodDogbnVtYmVyO1xuICAgIGVkZ2U6IHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVEcmFnOiBGdW5jdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVSZXNpemU6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZykge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy52aWV3RGF0ZSB8fCBjaGFuZ2VzLmRheVN0YXJ0SG91ciB8fCBjaGFuZ2VzLmRheVN0YXJ0TWludXRlIHx8IGNoYW5nZXMuZGF5RW5kSG91ciB8fCBjaGFuZ2VzLmRheUVuZE1pbnV0ZSkge1xuICAgICAgdGhpcy5yZWZyZXNoSG91ckdyaWQoKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kSG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuZXZlbnRXaWR0aFxuICAgICkge1xuICAgICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAgZXZlbnREcm9wcGVkKGRyb3BFdmVudDoge2Ryb3BEYXRhPzoge2V2ZW50PzogQ2FsZW5kYXJFdmVudH19LCBzZWdtZW50OiBEYXlWaWV3SG91clNlZ21lbnQpOiB2b2lkIHtcbiAgICAgIGlmIChkcm9wRXZlbnQuZHJvcERhdGEgJiYgZHJvcEV2ZW50LmRyb3BEYXRhLmV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7ZXZlbnQ6IGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCwgbmV3U3RhcnQ6IHNlZ21lbnQuZGF0ZX0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZVN0YXJ0ZWQoZXZlbnQ6IERheVZpZXdFdmVudCwgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50LCBkYXlWaWV3Q29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgdGhpcy5jdXJyZW50UmVzaXplID0ge1xuICAgICAgICBvcmlnaW5hbFRvcDogZXZlbnQudG9wLFxuICAgICAgICBvcmlnaW5hbEhlaWdodDogZXZlbnQuaGVpZ2h0LFxuICAgICAgICBlZGdlOiB0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMudG9wICE9PSAndW5kZWZpbmVkJyA/ICd0b3AnIDogJ2JvdHRvbSdcbiAgICAgIH07XG4gICAgICBjb25zdCByZXNpemVIZWxwZXI6IENhbGVuZGFyUmVzaXplSGVscGVyID0gbmV3IENhbGVuZGFyUmVzaXplSGVscGVyKGRheVZpZXdDb250YWluZXIpO1xuICAgICAgdGhpcy52YWxpZGF0ZVJlc2l6ZSA9ICh7cmVjdGFuZ2xlfSkgPT4gcmVzaXplSGVscGVyLnZhbGlkYXRlUmVzaXplKHtyZWN0YW5nbGV9KTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICByZXNpemluZyhldmVudDogRGF5Vmlld0V2ZW50LCByZXNpemVFdmVudDogUmVzaXplRXZlbnQpOiB2b2lkIHtcbiAgICAgIGlmIChyZXNpemVFdmVudC5lZGdlcy50b3ApIHtcbiAgICAgICAgZXZlbnQudG9wID0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsVG9wICsgK3Jlc2l6ZUV2ZW50LmVkZ2VzLnRvcDtcbiAgICAgICAgZXZlbnQuaGVpZ2h0ID0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0IC0gK3Jlc2l6ZUV2ZW50LmVkZ2VzLnRvcDtcbiAgICAgIH0gZWxzZSBpZiAocmVzaXplRXZlbnQuZWRnZXMuYm90dG9tKSB7XG4gICAgICAgIGV2ZW50LmhlaWdodCA9IHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbEhlaWdodCArICtyZXNpemVFdmVudC5lZGdlcy5ib3R0b207XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzaXplRW5kZWQoZGF5RXZlbnQ6IERheVZpZXdFdmVudCk6IHZvaWQge1xuXG4gICAgICBsZXQgcGl4ZWxzTW92ZWQ6IG51bWJlcjtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgcGl4ZWxzTW92ZWQgPSAoZGF5RXZlbnQudG9wIC0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsVG9wKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBpeGVsc01vdmVkID0gKGRheUV2ZW50LmhlaWdodCAtIHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbEhlaWdodCk7XG4gICAgICB9XG5cbiAgICAgIGRheUV2ZW50LnRvcCA9IHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcDtcbiAgICAgIGRheUV2ZW50LmhlaWdodCA9IHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbEhlaWdodDtcblxuICAgICAgY29uc3QgcGl4ZWxBbW91bnRJbk1pbnV0ZXM6IG51bWJlciA9IE1JTlVURVNfSU5fSE9VUiAvICh0aGlzLmhvdXJTZWdtZW50cyAqIFNFR01FTlRfSEVJR0hUKTtcbiAgICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZDogbnVtYmVyID0gcGl4ZWxzTW92ZWQgKiBwaXhlbEFtb3VudEluTWludXRlcztcbiAgICAgIGxldCBuZXdTdGFydDogRGF0ZSA9IGRheUV2ZW50LmV2ZW50LnN0YXJ0O1xuICAgICAgbGV0IG5ld0VuZDogRGF0ZSA9IGRheUV2ZW50LmV2ZW50LmVuZDtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgbmV3U3RhcnQgPSBhZGRNaW51dGVzKG5ld1N0YXJ0LCBtaW51dGVzTW92ZWQpO1xuICAgICAgfSBlbHNlIGlmIChuZXdFbmQpIHtcbiAgICAgICAgbmV3RW5kID0gYWRkTWludXRlcyhuZXdFbmQsIG1pbnV0ZXNNb3ZlZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7bmV3U3RhcnQsIG5ld0VuZCwgZXZlbnQ6IGRheUV2ZW50LmV2ZW50fSk7XG4gICAgICB0aGlzLmN1cnJlbnRSZXNpemUgPSBudWxsO1xuXG4gICAgfVxuXG4gICAgZHJhZ1N0YXJ0KGV2ZW50OiBIVE1MRWxlbWVudCwgZGF5Vmlld0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgIGNvbnN0IGRyYWdIZWxwZXI6IENhbGVuZGFyRHJhZ0hlbHBlciA9IG5ldyBDYWxlbmRhckRyYWdIZWxwZXIoZGF5Vmlld0NvbnRhaW5lciwgZXZlbnQpO1xuICAgICAgdGhpcy52YWxpZGF0ZURyYWcgPSAoe3gsIHl9KSA9PiAhdGhpcy5jdXJyZW50UmVzaXplICYmIGRyYWdIZWxwZXIudmFsaWRhdGVEcmFnKHt4LCB5fSk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZXZlbnREcmFnZ2VkKGRheUV2ZW50OiBEYXlWaWV3RXZlbnQsIGRyYWdnZWRJblBpeGVsczogbnVtYmVyKTogdm9pZCB7XG4gICAgICBjb25zdCBwaXhlbEFtb3VudEluTWludXRlczogbnVtYmVyID0gTUlOVVRFU19JTl9IT1VSIC8gKHRoaXMuaG91clNlZ21lbnRzICogU0VHTUVOVF9IRUlHSFQpO1xuICAgICAgY29uc3QgbWludXRlc01vdmVkOiBudW1iZXIgPSBkcmFnZ2VkSW5QaXhlbHMgKiBwaXhlbEFtb3VudEluTWludXRlcztcbiAgICAgIGNvbnN0IG5ld1N0YXJ0OiBEYXRlID0gYWRkTWludXRlcyhkYXlFdmVudC5ldmVudC5zdGFydCwgbWludXRlc01vdmVkKTtcbiAgICAgIGxldCBuZXdFbmQ6IERhdGU7XG4gICAgICBpZiAoZGF5RXZlbnQuZXZlbnQuZW5kKSB7XG4gICAgICAgIG5ld0VuZCA9IGFkZE1pbnV0ZXMoZGF5RXZlbnQuZXZlbnQuZW5kLCBtaW51dGVzTW92ZWQpO1xuICAgICAgfVxuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtuZXdTdGFydCwgbmV3RW5kLCBldmVudDogZGF5RXZlbnQuZXZlbnR9KTtcbiAgICB9XG4gICAgKi9cblxuICBwcml2YXRlIHJlZnJlc2hIb3VyR3JpZCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvdXJzID0gZ2V0RGF5Vmlld0hvdXJHcmlkKHtcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgaG91clNlZ21lbnRzOiB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgIGRheVN0YXJ0OiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5U3RhcnRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5U3RhcnRNaW51dGUsXG4gICAgICB9LFxuICAgICAgZGF5RW5kOiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheUVuZE1pbnV0ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHRoaXMuaG91clNlZ21lbnRNb2RpZmllcikge1xuICAgICAgdGhpcy5ob3Vycy5mb3JFYWNoKChob3VyKSA9PiB7XG4gICAgICAgIGhvdXIuc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCkgPT4gdGhpcy5ob3VyU2VnbWVudE1vZGlmaWVyKHNlZ21lbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ID0gZ2V0RGF5Vmlldyh7XG4gICAgICBldmVudHM6IHRoaXMuZXZlbnRzLFxuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgZGF5U3RhcnQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZSxcbiAgICAgIH0sXG4gICAgICBkYXlFbmQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlLFxuICAgICAgfSxcbiAgICAgIGV2ZW50V2lkdGg6IHRoaXMuZXZlbnRXaWR0aCxcbiAgICAgIHNlZ21lbnRIZWlnaHQ6IFNFR01FTlRfSEVJR0hULFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoQWxsKCk6IHZvaWQge1xuICAgIHRoaXMucmVmcmVzaEhvdXJHcmlkKCk7XG4gICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICB9XG59XG4iXX0=