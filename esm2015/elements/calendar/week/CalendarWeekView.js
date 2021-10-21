import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, LOCALE_ID, Output, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { getDayViewHourGrid, getWeekView, getWeekViewHeader, } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
import * as i1 from "./CalendarWeekHeader";
import * as i2 from "@angular/common";
import * as i3 from "./CalendarWeekEvent";
import * as i4 from "../day/CalendarHourSegment";
function NovoCalendarWeekViewElement_div_3_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7, 8);
    i0.ɵɵelementStart(2, "novo-calendar-week-event", 9);
    i0.ɵɵlistener("eventClicked", function NovoCalendarWeekViewElement_div_3_div_2_Template_novo_calendar_week_event_eventClicked_2_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.eventClicked.emit($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const weekEvent_r6 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("width", 100 / ctx_r5.days.length * weekEvent_r6.span + "%")("margin-top", weekEvent_r6.top, "px")("height", weekEvent_r6.height, "px")("margin-left", 100 / ctx_r5.days.length * weekEvent_r6.offset + "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("weekEvent", weekEvent_r6)("tooltipPosition", ctx_r5.tooltipPosition)("customTemplate", ctx_r5.eventTemplate);
} }
function NovoCalendarWeekViewElement_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", null, 5);
    i0.ɵɵtemplate(2, NovoCalendarWeekViewElement_div_3_div_2_Template, 3, 11, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const eventRow_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", eventRow_r3.row);
} }
function NovoCalendarWeekViewElement_div_4_novo_calendar_day_hour_segment_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-calendar-day-hour-segment", 12);
    i0.ɵɵlistener("click", function NovoCalendarWeekViewElement_div_4_novo_calendar_day_hour_segment_1_Template_novo_calendar_day_hour_segment_click_0_listener() { i0.ɵɵrestoreView(_r14); const segment_r12 = ctx.$implicit; const ctx_r13 = i0.ɵɵnextContext(2); return ctx_r13.hourSegmentClicked.emit({ date: segment_r12.date }); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const segment_r12 = ctx.$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("segment", segment_r12)("locale", ctx_r11.locale)("customTemplate", ctx_r11.hourSegmentTemplate);
} }
function NovoCalendarWeekViewElement_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtemplate(1, NovoCalendarWeekViewElement_div_4_novo_calendar_day_hour_segment_1_Template, 1, 3, "novo-calendar-day-hour-segment", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hour_r10 = ctx.$implicit;
    i0.ɵɵstyleProp("min-width", 70, "px");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", hour_r10.segments);
} }
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
NovoCalendarWeekViewElement.ɵfac = function NovoCalendarWeekViewElement_Factory(t) { return new (t || NovoCalendarWeekViewElement)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(LOCALE_ID)); };
NovoCalendarWeekViewElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCalendarWeekViewElement, selectors: [["novo-calendar-week"]], inputs: { viewDate: "viewDate", events: "events", excludeDays: "excludeDays", refresh: "refresh", locale: "locale", tooltipPosition: "tooltipPosition", weekStartsOn: "weekStartsOn", headerTemplate: "headerTemplate", eventTemplate: "eventTemplate", precision: "precision", hourSegments: "hourSegments", dayStartHour: "dayStartHour", dayStartMinute: "dayStartMinute", dayEndHour: "dayEndHour", dayEndMinute: "dayEndMinute", hourSegmentTemplate: "hourSegmentTemplate" }, outputs: { hourSegmentClicked: "hourSegmentClicked", dayClicked: "dayClicked", eventClicked: "eventClicked", eventTimesChanged: "eventTimesChanged" }, features: [i0.ɵɵNgOnChangesFeature], decls: 5, vars: 5, consts: [[1, "cal-week-view"], ["weekViewContainer", ""], [3, "days", "locale", "customTemplate", "dayClicked"], [4, "ngFor", "ngForOf"], ["class", "cal-hour", 3, "minWidth", 4, "ngFor", "ngForOf"], ["eventRowContainer", ""], ["class", "cal-event-container", 3, "width", "marginTop", "height", "marginLeft", 4, "ngFor", "ngForOf"], [1, "cal-event-container"], ["event", ""], [3, "weekEvent", "tooltipPosition", "customTemplate", "eventClicked"], [1, "cal-hour"], [3, "segment", "locale", "customTemplate", "click", 4, "ngFor", "ngForOf"], [3, "segment", "locale", "customTemplate", "click"]], template: function NovoCalendarWeekViewElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵelementStart(2, "novo-calendar-week-header", 2);
        i0.ɵɵlistener("dayClicked", function NovoCalendarWeekViewElement_Template_novo_calendar_week_header_dayClicked_2_listener($event) { return ctx.dayClicked.emit($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, NovoCalendarWeekViewElement_div_3_Template, 3, 1, "div", 3);
        i0.ɵɵtemplate(4, NovoCalendarWeekViewElement_div_4_Template, 2, 3, "div", 4);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("days", ctx.days)("locale", ctx.locale)("customTemplate", ctx.headerTemplate);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.eventRows);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.hours);
    } }, directives: [i1.NovoCalendarWeekHeaderElement, i2.NgForOf, i3.NovoCalendarWeekEventElement, i4.NovoCalendarHourSegmentElement], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCalendarWeekViewElement, [{
        type: Component,
        args: [{
                selector: 'novo-calendar-week',
                template: `
    <div class="cal-week-view" #weekViewContainer>
      <novo-calendar-week-header [days]="days" [locale]="locale" [customTemplate]="headerTemplate" (dayClicked)="dayClicked.emit($event)">
      </novo-calendar-week-header>
      <div *ngFor="let eventRow of eventRows" #eventRowContainer>
        <div
          class="cal-event-container"
          #event
          *ngFor="let weekEvent of eventRow.row"
          [style.width]="(100 / days.length) * weekEvent.span + '%'"
          [style.marginTop.px]="weekEvent.top"
          [style.height.px]="weekEvent.height"
          [style.marginLeft]="(100 / days.length) * weekEvent.offset + '%'"
        >
          <novo-calendar-week-event
            [weekEvent]="weekEvent"
            [tooltipPosition]="tooltipPosition"
            [customTemplate]="eventTemplate"
            (eventClicked)="eventClicked.emit($event)"
          >
          </novo-calendar-week-event>
        </div>
      </div>
      <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="70">
        <novo-calendar-day-hour-segment
          *ngFor="let segment of hour.segments"
          [segment]="segment"
          [locale]="locale"
          [customTemplate]="hourSegmentTemplate"
          (click)="hourSegmentClicked.emit({ date: segment.date })"
        >
        </novo-calendar-day-hour-segment>
      </div>
    </div>
  `,
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [LOCALE_ID]
            }] }]; }, { viewDate: [{
            type: Input
        }], events: [{
            type: Input
        }], excludeDays: [{
            type: Input
        }], refresh: [{
            type: Input
        }], locale: [{
            type: Input
        }], tooltipPosition: [{
            type: Input
        }], weekStartsOn: [{
            type: Input
        }], headerTemplate: [{
            type: Input
        }], eventTemplate: [{
            type: Input
        }], precision: [{
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
        }], hourSegmentTemplate: [{
            type: Input
        }], hourSegmentClicked: [{
            type: Output
        }], dayClicked: [{
            type: Output
        }], eventClicked: [{
            type: Output
        }], eventTimesChanged: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJXZWVrVmlldy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci93ZWVrL0NhbGVuZGFyV2Vla1ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUlULE1BQU0sRUFDTixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUlMLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsaUJBQWlCLEdBR2xCLE1BQU0sNkNBQTZDLENBQUM7Ozs7Ozs7O0lBNEI3QyxpQ0FTRTtJQUFBLG1EQU0yQjtJQUZ6QixxTkFBZ0IsZ0NBQXlCLElBQUM7SUFFNUMsaUJBQTJCO0lBQzdCLGlCQUFNOzs7O0lBWkosMkVBQTBELHNDQUFBLHFDQUFBLHFFQUFBO0lBTXhELGVBQXVCO0lBQXZCLHdDQUF1QiwyQ0FBQSx3Q0FBQTs7O0lBWDdCLG9DQUNFO0lBQUEsbUZBU0U7SUFRSixpQkFBTTs7O0lBZEYsZUFBc0M7SUFBdEMseUNBQXNDOzs7O0lBZ0J4QywwREFPaUM7SUFGL0IsdVFBQVMsMkRBQStDLElBQUM7SUFFM0QsaUJBQWlDOzs7O0lBTC9CLHFDQUFtQiwwQkFBQSwrQ0FBQTs7O0lBSHZCLCtCQUNFO0lBQUEseUlBT0E7SUFDRixpQkFBTTs7O0lBVDJDLHFDQUF3QjtJQUVyRSxlQUFxQztJQUFyQywyQ0FBcUM7O0FBOUMvQzs7R0FFRztBQUNILE1BQU0sY0FBYyxHQUFXLEVBQUUsQ0FBQztBQUVsQzs7R0FFRztBQUNILE1BQU0sZUFBZSxHQUFXLEVBQUUsQ0FBQztBQUNuQzs7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UmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTE9DQUxFX0lELFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJFdmVudCxcbiAgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50LFxuICBEYXlWaWV3SG91cixcbiAgZ2V0RGF5Vmlld0hvdXJHcmlkLFxuICBnZXRXZWVrVmlldyxcbiAgZ2V0V2Vla1ZpZXdIZWFkZXIsXG4gIFdlZWtEYXksXG4gIFdlZWtWaWV3RXZlbnRSb3csXG59IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NhbGVuZGFyLXV0aWxzL0NhbGVuZGFyVXRpbHMnO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgU0VHTUVOVF9IRUlHSFQ6IG51bWJlciA9IDMwO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgTUlOVVRFU19JTl9IT1VSOiBudW1iZXIgPSA2MDtcbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIHdlZWsuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogJmx0O25vdm8tY2FsZW5kYXItd2Vla1xuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXG4gKiAgW2V2ZW50c109XCJldmVudHNcIiZndDtcbiAqICZsdDsvbm92by1jYWxlbmRhci13ZWVrJmd0O1xuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXItd2VlaycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNhbC13ZWVrLXZpZXdcIiAjd2Vla1ZpZXdDb250YWluZXI+XG4gICAgICA8bm92by1jYWxlbmRhci13ZWVrLWhlYWRlciBbZGF5c109XCJkYXlzXCIgW2xvY2FsZV09XCJsb2NhbGVcIiBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIiAoZGF5Q2xpY2tlZCk9XCJkYXlDbGlja2VkLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgPC9ub3ZvLWNhbGVuZGFyLXdlZWstaGVhZGVyPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZXZlbnRSb3cgb2YgZXZlbnRSb3dzXCIgI2V2ZW50Um93Q29udGFpbmVyPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyXCJcbiAgICAgICAgICAjZXZlbnRcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgd2Vla0V2ZW50IG9mIGV2ZW50Um93LnJvd1wiXG4gICAgICAgICAgW3N0eWxlLndpZHRoXT1cIigxMDAgLyBkYXlzLmxlbmd0aCkgKiB3ZWVrRXZlbnQuc3BhbiArICclJ1wiXG4gICAgICAgICAgW3N0eWxlLm1hcmdpblRvcC5weF09XCJ3ZWVrRXZlbnQudG9wXCJcbiAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cIndlZWtFdmVudC5oZWlnaHRcIlxuICAgICAgICAgIFtzdHlsZS5tYXJnaW5MZWZ0XT1cIigxMDAgLyBkYXlzLmxlbmd0aCkgKiB3ZWVrRXZlbnQub2Zmc2V0ICsgJyUnXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxub3ZvLWNhbGVuZGFyLXdlZWstZXZlbnRcbiAgICAgICAgICAgIFt3ZWVrRXZlbnRdPVwid2Vla0V2ZW50XCJcbiAgICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwidG9vbHRpcFBvc2l0aW9uXCJcbiAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvbm92by1jYWxlbmRhci13ZWVrLWV2ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1ob3VyXCIgKm5nRm9yPVwibGV0IGhvdXIgb2YgaG91cnNcIiBbc3R5bGUubWluV2lkdGgucHhdPVwiNzBcIj5cbiAgICAgICAgPG5vdm8tY2FsZW5kYXItZGF5LWhvdXItc2VnbWVudFxuICAgICAgICAgICpuZ0Zvcj1cImxldCBzZWdtZW50IG9mIGhvdXIuc2VnbWVudHNcIlxuICAgICAgICAgIFtzZWdtZW50XT1cInNlZ21lbnRcIlxuICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaG91clNlZ21lbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgKGNsaWNrKT1cImhvdXJTZWdtZW50Q2xpY2tlZC5lbWl0KHsgZGF0ZTogc2VnbWVudC5kYXRlIH0pXCJcbiAgICAgICAgPlxuICAgICAgICA8L25vdm8tY2FsZW5kYXItZGF5LWhvdXItc2VnbWVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJXZWVrVmlld0VsZW1lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpXG4gIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdID0gW107XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCB3aWxsIGJlIGhpZGRlbiBvbiB0aGUgdmlld1xuICAgKi9cbiAgQElucHV0KClcbiAgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KClcbiAgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXG4gICAqL1xuICBASW5wdXQoKVxuICBsb2NhbGU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHBsYWNlbWVudCBvZiB0aGUgZXZlbnQgdG9vbHRpcFxuICAgKi9cbiAgQElucHV0KClcbiAgdG9vbHRpcFBvc2l0aW9uOiBzdHJpbmcgPSAnYm90dG9tJztcblxuICAvKipcbiAgICogVGhlIHN0YXJ0IG51bWJlciBvZiB0aGUgd2Vla1xuICAgKi9cbiAgQElucHV0KClcbiAgd2Vla1N0YXJ0c09uOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBoZWFkZXJcbiAgICovXG4gIEBJbnB1dCgpXG4gIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHdlZWsgdmlldyBldmVudHNcbiAgICovXG4gIEBJbnB1dCgpXG4gIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBwcmVjaXNpb24gdG8gZGlzcGxheSBldmVudHMuXG4gICAqIGBkYXlzYCB3aWxsIHJvdW5kIGV2ZW50IHN0YXJ0IGFuZCBlbmQgZGF0ZXMgdG8gdGhlIG5lYXJlc3QgZGF5IGFuZCBgbWludXRlc2Agd2lsbCBub3QgZG8gdGhpcyByb3VuZGluZ1xuICAgKi9cbiAgQElucHV0KClcbiAgcHJlY2lzaW9uOiAnZGF5cycgfCAnbWludXRlcycgPSAnZGF5cyc7XG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIGluIGFuIGhvdXIuIE11c3QgYmUgPD0gNlxuICAgKi9cbiAgQElucHV0KClcbiAgaG91clNlZ21lbnRzOiBudW1iZXIgPSAyO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKVxuICBkYXlTdGFydEhvdXI6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgc3RhcnQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKVxuICBkYXlTdGFydE1pbnV0ZTogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcbiAgICovXG4gIEBJbnB1dCgpXG4gIGRheUVuZEhvdXI6IG51bWJlciA9IDIzO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IGVuZCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcbiAgICovXG4gIEBJbnB1dCgpXG4gIGRheUVuZE1pbnV0ZTogbnVtYmVyID0gNTk7XG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKVxuICBob3VyU2VnbWVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gaG91ciBzZWdtZW50IGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBob3VyU2VnbWVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGRhdGU6IERhdGUgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZGF0ZTogRGF0ZSB9PigpO1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBoZWFkZXIgd2VlayBkYXkgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGRheUNsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGRhdGU6IERhdGUgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZGF0ZTogRGF0ZSB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgaXMgcmVzaXplZCBvciBkcmFnZ2VkIGFuZCBkcm9wcGVkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRUaW1lc0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRheXM6IFdlZWtEYXlbXTtcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGhvdXJzOiBEYXlWaWV3SG91cltdID0gW107XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV2ZW50Um93czogV2Vla1ZpZXdFdmVudFJvd1tdID0gW107XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY3VycmVudFJlc2l6ZToge1xuICAgIG9yaWdpbmFsT2Zmc2V0OiBudW1iZXI7XG4gICAgb3JpZ2luYWxTcGFuOiBudW1iZXI7XG4gICAgZWRnZTogc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2YWxpZGF0ZURyYWc6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2YWxpZGF0ZVJlc2l6ZTogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgQEluamVjdChMT0NBTEVfSUQpIGxvY2FsZTogc3RyaW5nKSB7XG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaCkge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uID0gdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudmlld0RhdGUgfHwgY2hhbmdlcy5leGNsdWRlRGF5cykge1xuICAgICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuZXZlbnRzIHx8IGNoYW5nZXMudmlld0RhdGUgfHwgY2hhbmdlcy5leGNsdWRlRGF5cykge1xuICAgICAgdGhpcy5yZWZyZXNoQm9keSgpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8IGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHwgY2hhbmdlcy5kYXlFbmRIb3VyIHx8IGNoYW5nZXMuZGF5RW5kTWludXRlKSB7XG4gICAgICB0aGlzLnJlZnJlc2hIb3VyR3JpZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgIHJlc2l6ZVN0YXJ0ZWQod2Vla1ZpZXdDb250YWluZXI6IEhUTUxFbGVtZW50LCB3ZWVrRXZlbnQ6IFdlZWtWaWV3RXZlbnQsIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCk6IHZvaWQge1xuICAgICAgdGhpcy5jdXJyZW50UmVzaXplID0ge1xuICAgICAgICBvcmlnaW5hbE9mZnNldDogd2Vla0V2ZW50Lm9mZnNldCxcbiAgICAgICAgb3JpZ2luYWxTcGFuOiB3ZWVrRXZlbnQuc3BhbixcbiAgICAgICAgZWRnZTogdHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgIT09ICd1bmRlZmluZWQnID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc2l6ZUhlbHBlcjogQ2FsZW5kYXJSZXNpemVIZWxwZXIgPSBuZXcgQ2FsZW5kYXJSZXNpemVIZWxwZXIod2Vla1ZpZXdDb250YWluZXIsIHRoaXMuZ2V0RGF5Q29sdW1uV2lkdGgod2Vla1ZpZXdDb250YWluZXIpKTtcbiAgICAgIHRoaXMudmFsaWRhdGVSZXNpemUgPSAoe3JlY3RhbmdsZX0pID0+IHJlc2l6ZUhlbHBlci52YWxpZGF0ZVJlc2l6ZSh7cmVjdGFuZ2xlfSk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcmVzaXppbmcod2Vla0V2ZW50OiBXZWVrVmlld0V2ZW50LCByZXNpemVFdmVudDogUmVzaXplRXZlbnQsIGRheVdpZHRoOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIGlmIChyZXNpemVFdmVudC5lZGdlcy5sZWZ0KSB7XG4gICAgICAgIGNvbnN0IGRpZmY6IG51bWJlciA9IE1hdGgucm91bmQoK3Jlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgLyBkYXlXaWR0aCk7XG4gICAgICAgIHdlZWtFdmVudC5vZmZzZXQgPSB0aGlzLmN1cnJlbnRSZXNpemUub3JpZ2luYWxPZmZzZXQgKyBkaWZmO1xuICAgICAgICB3ZWVrRXZlbnQuc3BhbiA9IHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW4gLSBkaWZmO1xuICAgICAgfSBlbHNlIGlmIChyZXNpemVFdmVudC5lZGdlcy5yaWdodCkge1xuICAgICAgICBjb25zdCBkaWZmOiBudW1iZXIgPSBNYXRoLnJvdW5kKCtyZXNpemVFdmVudC5lZGdlcy5yaWdodCAvIGRheVdpZHRoKTtcbiAgICAgICAgd2Vla0V2ZW50LnNwYW4gPSB0aGlzLmN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuICsgZGlmZjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXNpemVFbmRlZCh3ZWVrRXZlbnQ6IFdlZWtWaWV3RXZlbnQpOiB2b2lkIHtcblxuICAgICAgbGV0IGRheXNEaWZmOiBudW1iZXI7XG4gICAgICBpZiAodGhpcy5jdXJyZW50UmVzaXplLmVkZ2UgPT09ICdsZWZ0Jykge1xuICAgICAgICBkYXlzRGlmZiA9IHdlZWtFdmVudC5vZmZzZXQgLSB0aGlzLmN1cnJlbnRSZXNpemUub3JpZ2luYWxPZmZzZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXlzRGlmZiA9IHdlZWtFdmVudC5zcGFuIC0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbjtcbiAgICAgIH1cblxuICAgICAgd2Vla0V2ZW50Lm9mZnNldCA9IHRoaXMuY3VycmVudFJlc2l6ZS5vcmlnaW5hbE9mZnNldDtcbiAgICAgIHdlZWtFdmVudC5zcGFuID0gdGhpcy5jdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbjtcblxuICAgICAgbGV0IG5ld1N0YXJ0OiBEYXRlID0gd2Vla0V2ZW50LmV2ZW50LnN0YXJ0O1xuICAgICAgbGV0IG5ld0VuZDogRGF0ZSA9IHdlZWtFdmVudC5ldmVudC5lbmQ7XG4gICAgICBpZiAodGhpcy5jdXJyZW50UmVzaXplLmVkZ2UgPT09ICdsZWZ0Jykge1xuICAgICAgICBuZXdTdGFydCA9IGFkZERheXMobmV3U3RhcnQsIGRheXNEaWZmKTtcbiAgICAgIH0gZWxzZSBpZiAobmV3RW5kKSB7XG4gICAgICAgIG5ld0VuZCA9IGFkZERheXMobmV3RW5kLCBkYXlzRGlmZik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7bmV3U3RhcnQsIG5ld0VuZCwgZXZlbnQ6IHdlZWtFdmVudC5ldmVudH0pO1xuICAgICAgdGhpcy5jdXJyZW50UmVzaXplID0gbnVsbDtcblxuICAgIH1cblxuICAgIGV2ZW50RHJhZ2dlZCh3ZWVrRXZlbnQ6IFdlZWtWaWV3RXZlbnQsIGRyYWdnZWRCeVB4OiBudW1iZXIsIGRheVdpZHRoOiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgY29uc3QgZGF5c0RyYWdnZWQ6IG51bWJlciA9IGRyYWdnZWRCeVB4IC8gZGF5V2lkdGg7XG4gICAgICBjb25zdCBuZXdTdGFydDogRGF0ZSA9IGFkZERheXMod2Vla0V2ZW50LmV2ZW50LnN0YXJ0LCBkYXlzRHJhZ2dlZCk7XG4gICAgICBsZXQgbmV3RW5kOiBEYXRlO1xuICAgICAgaWYgKHdlZWtFdmVudC5ldmVudC5lbmQpIHtcbiAgICAgICAgbmV3RW5kID0gYWRkRGF5cyh3ZWVrRXZlbnQuZXZlbnQuZW5kLCBkYXlzRHJhZ2dlZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7bmV3U3RhcnQsIG5ld0VuZCwgZXZlbnQ6IHdlZWtFdmVudC5ldmVudH0pO1xuXG4gICAgfVxuXG4gICAgZHJhZ1N0YXJ0KHdlZWtWaWV3Q29udGFpbmVyOiBIVE1MRWxlbWVudCwgZXZlbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICBjb25zdCBkcmFnSGVscGVyOiBDYWxlbmRhckRyYWdIZWxwZXIgPSBuZXcgQ2FsZW5kYXJEcmFnSGVscGVyKHdlZWtWaWV3Q29udGFpbmVyLCBldmVudCk7XG4gICAgICB0aGlzLnZhbGlkYXRlRHJhZyA9ICh7eCwgeX0pID0+ICF0aGlzLmN1cnJlbnRSZXNpemUgJiYgZHJhZ0hlbHBlci52YWxpZGF0ZURyYWcoe3gsIHl9KTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgKi9cblxuICBnZXREYXlDb2x1bW5XaWR0aChldmVudFJvd0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGV2ZW50Um93Q29udGFpbmVyLm9mZnNldFdpZHRoIC8gdGhpcy5kYXlzLmxlbmd0aCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hIZWFkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5kYXlzID0gZ2V0V2Vla1ZpZXdIZWFkZXIoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xuICAgIHRoaXMuZXZlbnRSb3dzID0gZ2V0V2Vla1ZpZXcoe1xuICAgICAgZXZlbnRzOiB0aGlzLmV2ZW50cyxcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgICAgaG91clNlZ21lbnRzOiB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgIHNlZ21lbnRIZWlnaHQ6IFNFR01FTlRfSEVJR0hULFxuICAgICAgZGF5U3RhcnQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZSxcbiAgICAgIH0sXG4gICAgICBkYXlFbmQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlLFxuICAgICAgfSxcbiAgICAgIC8vIHByZWNpc2lvbjogdGhpcy5wcmVjaXNpb25cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEhvdXJHcmlkKCk6IHZvaWQge1xuICAgIHRoaXMuaG91cnMgPSBnZXREYXlWaWV3SG91ckdyaWQoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgZGF5U3RhcnQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZSxcbiAgICAgIH0sXG4gICAgICBkYXlFbmQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyBpZiAodGhpcy5ob3VyU2VnbWVudE1vZGlmaWVyKSB7XG4gICAgLy8gICB0aGlzLmhvdXJzLmZvckVhY2goaG91ciA9PiB7XG4gICAgLy8gICAgIGhvdXIuc2VnbWVudHMuZm9yRWFjaChzZWdtZW50ID0+IHRoaXMuaG91clNlZ21lbnRNb2RpZmllcihzZWdtZW50KSk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgdGhpcy5yZWZyZXNoSG91ckdyaWQoKTtcbiAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gIH1cbn1cbiJdfQ==