import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { LOCALE_ID, Pipe, Inject, EventEmitter, Component, ViewEncapsulation, Input, Output, NgModule } from '@angular/core';
import { getWeekViewHeader, getWeekView, getDayViewHourGrid, CalendarEventResponse, getMonthView, getDayView, DateUtil } from 'novo-elements/utils';
import * as i2 from 'novo-elements/components/tooltip';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { subMonths, addMonths, getYear, getMonth, getDate, setYear, setMonth, setDate, differenceInSeconds, addSeconds } from 'date-fns';
import * as i1$1 from 'novo-elements/components/button';
import { NovoButtonModule } from 'novo-elements/components/button';
import * as i3 from 'novo-elements/pipes';
import { NovoPipesModule } from 'novo-elements/pipes';

class WeekdayPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'short') {
        return new Intl.DateTimeFormat(locale, { weekday: method }).format(date);
    }
}
WeekdayPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WeekdayPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
WeekdayPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WeekdayPipe, name: "weekday" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WeekdayPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'weekday' }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    } });

class MonthDayPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'short') {
        return new Intl.DateTimeFormat(locale, { month: method, day: 'numeric' }).format(date);
    }
}
MonthDayPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MonthDayPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
MonthDayPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MonthDayPipe, name: "monthday" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MonthDayPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'monthday' }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    } });

class NovoAgendaWeekHeaderElement {
    constructor() {
        this.dayClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
    }
}
NovoAgendaWeekHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaWeekHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaWeekHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaWeekHeaderElement, selector: "novo-agenda-week-header", inputs: { days: "days", locale: "locale", customTemplate: "customTemplate" }, outputs: { dayClicked: "dayClicked", eventDropped: "eventDropped" }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div class="cal-day-headers">
        <div
          class="cal-header"
          *ngFor="let day of days"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [class.cal-drag-over]="day.dragOver"
          (click)="dayClicked.emit({ date: day.date })"
          mwlDroppable
          (dragEnter)="day.dragOver = true"
          (dragLeave)="day.dragOver = false"
          (drop)="day.dragOver = false; eventDropped.emit({ event: $event.dropData.event, newStart: day.date })"
        >
          <b>{{ day.date | weekday: locale:'long' }}</b
          ><br />
          <span>{{ day.date | monthday: locale }}</span>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ days: days, locale: locale, dayClicked: dayClicked, eventDropped: eventDropped }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "weekday": WeekdayPipe, "monthday": MonthDayPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaWeekHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-week-header',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div class="cal-day-headers">
        <div
          class="cal-header"
          *ngFor="let day of days"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [class.cal-drag-over]="day.dragOver"
          (click)="dayClicked.emit({ date: day.date })"
          mwlDroppable
          (dragEnter)="day.dragOver = true"
          (dragLeave)="day.dragOver = false"
          (drop)="day.dragOver = false; eventDropped.emit({ event: $event.dropData.event, newStart: day.date })"
        >
          <b>{{ day.date | weekday: locale:'long' }}</b
          ><br />
          <span>{{ day.date | monthday: locale }}</span>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ days: days, locale: locale, dayClicked: dayClicked, eventDropped: eventDropped }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { days: [{
                type: Input
            }], locale: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], dayClicked: [{
                type: Output
            }], eventDropped: [{
                type: Output
            }] } });

class NovoAgendaWeekEventElement {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
NovoAgendaWeekEventElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaWeekEventElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaWeekEventElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaWeekEventElement, selector: "novo-agenda-week-event", inputs: { weekEvent: "weekEvent", tooltipPosition: "tooltipPosition", customTemplate: "customTemplate" }, outputs: { eventClicked: "eventClicked" }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [class.cal-starts-within-week]="!weekEvent.startsBeforeWeek"
        [class.cal-ends-within-week]="!weekEvent.endsAfterWeek"
        [ngClass]="weekEvent.event?.cssClass"
        [tooltip]="weekEvent.event.description"
        [tooltipPosition]="tooltipPosition"
        (click)="eventClicked.emit({ event: weekEvent.event })"
      >
        <div class="cal-event-ribbon" [style.backgroundColor]="weekEvent.event.color.primary"></div>
        <div class="cal-event-title">{{ weekEvent.event?.title }}</div>
        <div class="cal-event-description">{{ weekEvent.event?.description }}</div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ weekEvent: weekEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaWeekEventElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-week-event',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [class.cal-starts-within-week]="!weekEvent.startsBeforeWeek"
        [class.cal-ends-within-week]="!weekEvent.endsAfterWeek"
        [ngClass]="weekEvent.event?.cssClass"
        [tooltip]="weekEvent.event.description"
        [tooltipPosition]="tooltipPosition"
        (click)="eventClicked.emit({ event: weekEvent.event })"
      >
        <div class="cal-event-ribbon" [style.backgroundColor]="weekEvent.event.color.primary"></div>
        <div class="cal-event-title">{{ weekEvent.event?.title }}</div>
        <div class="cal-event-description">{{ weekEvent.event?.description }}</div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ weekEvent: weekEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { weekEvent: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], eventClicked: [{
                type: Output
            }] } });

class HoursPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'numeric') {
        return new Intl.DateTimeFormat(locale, { hour: method }).format(date);
    }
}
HoursPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: HoursPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
HoursPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: HoursPipe, name: "hours" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: HoursPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'hours' }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    } });

class NovoAgendaHourSegmentElement {
}
NovoAgendaHourSegmentElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaHourSegmentElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaHourSegmentElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaHourSegmentElement, selector: "novo-agenda-day-hour-segment", inputs: { segment: "segment", locale: "locale", customTemplate: "customTemplate" }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-hour-segment"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass"
      >
        <div class="cal-time">
          {{ segment.date | hours: locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale
      }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "hours": HoursPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaHourSegmentElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-day-hour-segment',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-hour-segment"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass"
      >
        <div class="cal-time">
          {{ segment.date | hours: locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale
      }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { segment: [{
                type: Input
            }], locale: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }] } });

/**
 * @hidden
 */
const SEGMENT_HEIGHT$1 = 30;
/**
 * @hidden
 */
const MINUTES_IN_HOUR$1 = 60;
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * &lt;novo-agenda-week
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-agenda-week&gt;
 * ```
 */
class NovoAgendaWeekViewElement {
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
            segmentHeight: SEGMENT_HEIGHT$1,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute,
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute,
            },
            // precision: this.precision
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
NovoAgendaWeekViewElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaWeekViewElement, deps: [{ token: i0.ChangeDetectorRef }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaWeekViewElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaWeekViewElement, selector: "novo-agenda-week", inputs: { viewDate: "viewDate", events: "events", excludeDays: "excludeDays", refresh: "refresh", locale: "locale", tooltipPosition: "tooltipPosition", weekStartsOn: "weekStartsOn", headerTemplate: "headerTemplate", eventTemplate: "eventTemplate", precision: "precision", hourSegments: "hourSegments", dayStartHour: "dayStartHour", dayStartMinute: "dayStartMinute", dayEndHour: "dayEndHour", dayEndMinute: "dayEndMinute", hourSegmentTemplate: "hourSegmentTemplate" }, outputs: { hourSegmentClicked: "hourSegmentClicked", dayClicked: "dayClicked", eventClicked: "eventClicked", eventTimesChanged: "eventTimesChanged" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="cal-week-view" #weekViewContainer>
      <novo-agenda-week-header [days]="days" [locale]="locale" [customTemplate]="headerTemplate" (dayClicked)="dayClicked.emit($event)">
      </novo-agenda-week-header>
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
          <novo-agenda-week-event
            [weekEvent]="weekEvent"
            [tooltipPosition]="tooltipPosition"
            [customTemplate]="eventTemplate"
            (eventClicked)="eventClicked.emit($event)"
          >
          </novo-agenda-week-event>
        </div>
      </div>
      <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="70">
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
  `, isInline: true, styles: [".cal-week-view{position:relative}.cal-week-view .cal-day-headers{display:flex;border:1px solid #e1e1e1}.cal-week-view .cal-day-headers .cal-header{flex:1;text-align:center;padding:5px;background-color:var(--color-background-secondary)}.cal-week-view .cal-day-headers .cal-header:not(:last-child){border-right:1px solid #e1e1e1}.cal-week-view .cal-day-headers .cal-header:hover,.cal-week-view .cal-day-headers .cal-drag-over{background-color:#ededed}.cal-week-view .cal-day-headers span{font-weight:400;opacity:.5}.cal-week-view .cal-event-container{position:absolute}.cal-week-view .cal-event-container:nth-child(n+2){border-left:var(--border-main)}.cal-week-view .cal-event-container novo-agenda-week-event{height:inherit}.cal-week-view .cal-event-container novo-agenda-week-event .cal-event{height:inherit;font-size:12px;min-height:30px;display:flex;flex-flow:column;background-color:var(--color-background-secondary)}.cal-week-view .cal-event-container novo-agenda-week-event .cal-event .cal-event-ribbon{min-height:4px;width:100%}.cal-week-view .cal-event-container novo-agenda-week-event .cal-event .cal-event-title{padding:0 0 0 10px;line-height:26px;overflow:hidden;text-overflow:ellipsis}.cal-week-view .cal-event-container novo-agenda-week-event .cal-event .cal-event-description{font-size:10px;line-height:13px;padding:0 0 0 10px;overflow:hidden;text-overflow:ellipsis}.cal-week-view .cal-draggable{cursor:move}.cal-week-view .cal-header.cal-today{background-color:#e8fde7}.cal-week-view .cal-header.cal-weekend span{color:#8b0000}.cal-week-view .cal-event,.cal-week-view .cal-header{text-overflow:ellipsis;white-space:nowrap}\n", "@charset \"UTF-8\";.cal-day-view .cal-hour-rows,.cal-week-view .cal-hour-rows{width:100%;border:solid 1px #e1e1e1;overflow-x:scroll;position:relative}.cal-day-view .cal-hour:nth-child(even),.cal-week-view .cal-hour:nth-child(even){background-color:var(--color-background-secondary)}.cal-day-view .cal-hour:nth-child(odd),.cal-week-view .cal-hour:nth-child(odd){background-color:var(--color-background)}.cal-day-view .cal-hour-segment,.cal-week-view .cal-hour-segment{height:30px}.cal-day-view .cal-hour-segment:after,.cal-week-view .cal-hour-segment:after{content:\"\\a0\"}.cal-day-view .cal-hour:not(:last-child) .cal-hour-segment,.cal-day-view .cal-hour:last-child :not(:last-child) .cal-hour-segment,.cal-week-view .cal-hour:not(:last-child) .cal-hour-segment,.cal-week-view .cal-hour:last-child :not(:last-child) .cal-hour-segment{border-bottom:thin dashed #e1e1e1}.cal-day-view .cal-time,.cal-week-view .cal-time{font-weight:700;padding-top:5px;width:70px;text-align:center;color:var(--color-text-muted)}.cal-day-view .cal-hour-segment.cal-after-hour-start .cal-time,.cal-week-view .cal-hour-segment.cal-after-hour-start .cal-time{display:none}.cal-day-view .cal-hour-segment:hover,.cal-day-view .cal-drag-over .cal-hour-segment,.cal-week-view .cal-hour-segment:hover,.cal-week-view .cal-drag-over .cal-hour-segment{background-color:#ededed}\n"], components: [{ type: NovoAgendaWeekHeaderElement, selector: "novo-agenda-week-header", inputs: ["days", "locale", "customTemplate"], outputs: ["dayClicked", "eventDropped"] }, { type: NovoAgendaWeekEventElement, selector: "novo-agenda-week-event", inputs: ["weekEvent", "tooltipPosition", "customTemplate"], outputs: ["eventClicked"] }, { type: NovoAgendaHourSegmentElement, selector: "novo-agenda-day-hour-segment", inputs: ["segment", "locale", "customTemplate"] }], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaWeekViewElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-agenda-week', encapsulation: ViewEncapsulation.None, template: `
    <div class="cal-week-view" #weekViewContainer>
      <novo-agenda-week-header [days]="days" [locale]="locale" [customTemplate]="headerTemplate" (dayClicked)="dayClicked.emit($event)">
      </novo-agenda-week-header>
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
          <novo-agenda-week-event
            [weekEvent]="weekEvent"
            [tooltipPosition]="tooltipPosition"
            [customTemplate]="eventTemplate"
            (eventClicked)="eventClicked.emit($event)"
          >
          </novo-agenda-week-event>
        </div>
      </div>
      <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="70">
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
  `, styles: [".cal-week-view{position:relative}.cal-week-view .cal-day-headers{display:flex;border:1px solid #e1e1e1}.cal-week-view .cal-day-headers .cal-header{flex:1;text-align:center;padding:5px;background-color:var(--color-background-secondary)}.cal-week-view .cal-day-headers .cal-header:not(:last-child){border-right:1px solid #e1e1e1}.cal-week-view .cal-day-headers .cal-header:hover,.cal-week-view .cal-day-headers .cal-drag-over{background-color:#ededed}.cal-week-view .cal-day-headers span{font-weight:400;opacity:.5}.cal-week-view .cal-event-container{position:absolute}.cal-week-view .cal-event-container:nth-child(n+2){border-left:var(--border-main)}.cal-week-view .cal-event-container novo-agenda-week-event{height:inherit}.cal-week-view .cal-event-container novo-agenda-week-event .cal-event{height:inherit;font-size:12px;min-height:30px;display:flex;flex-flow:column;background-color:var(--color-background-secondary)}.cal-week-view .cal-event-container novo-agenda-week-event .cal-event .cal-event-ribbon{min-height:4px;width:100%}.cal-week-view .cal-event-container novo-agenda-week-event .cal-event .cal-event-title{padding:0 0 0 10px;line-height:26px;overflow:hidden;text-overflow:ellipsis}.cal-week-view .cal-event-container novo-agenda-week-event .cal-event .cal-event-description{font-size:10px;line-height:13px;padding:0 0 0 10px;overflow:hidden;text-overflow:ellipsis}.cal-week-view .cal-draggable{cursor:move}.cal-week-view .cal-header.cal-today{background-color:#e8fde7}.cal-week-view .cal-header.cal-weekend span{color:#8b0000}.cal-week-view .cal-event,.cal-week-view .cal-header{text-overflow:ellipsis;white-space:nowrap}\n", "@charset \"UTF-8\";.cal-day-view .cal-hour-rows,.cal-week-view .cal-hour-rows{width:100%;border:solid 1px #e1e1e1;overflow-x:scroll;position:relative}.cal-day-view .cal-hour:nth-child(even),.cal-week-view .cal-hour:nth-child(even){background-color:var(--color-background-secondary)}.cal-day-view .cal-hour:nth-child(odd),.cal-week-view .cal-hour:nth-child(odd){background-color:var(--color-background)}.cal-day-view .cal-hour-segment,.cal-week-view .cal-hour-segment{height:30px}.cal-day-view .cal-hour-segment:after,.cal-week-view .cal-hour-segment:after{content:\"\\a0\"}.cal-day-view .cal-hour:not(:last-child) .cal-hour-segment,.cal-day-view .cal-hour:last-child :not(:last-child) .cal-hour-segment,.cal-week-view .cal-hour:not(:last-child) .cal-hour-segment,.cal-week-view .cal-hour:last-child :not(:last-child) .cal-hour-segment{border-bottom:thin dashed #e1e1e1}.cal-day-view .cal-time,.cal-week-view .cal-time{font-weight:700;padding-top:5px;width:70px;text-align:center;color:var(--color-text-muted)}.cal-day-view .cal-hour-segment.cal-after-hour-start .cal-time,.cal-week-view .cal-hour-segment.cal-after-hour-start .cal-time{display:none}.cal-day-view .cal-hour-segment:hover,.cal-day-view .cal-drag-over .cal-hour-segment,.cal-week-view .cal-hour-segment:hover,.cal-week-view .cal-drag-over .cal-hour-segment{background-color:#ededed}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    }, propDecorators: { viewDate: [{
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
            }] } });

class YearPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'numeric') {
        return new Intl.DateTimeFormat(locale, { year: method }).format(date);
    }
}
YearPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: YearPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
YearPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: YearPipe, name: "year" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: YearPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'year' }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    } });

class MonthPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'long') {
        return new Intl.DateTimeFormat(locale, { month: method }).format(date);
    }
}
MonthPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MonthPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
MonthPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MonthPipe, name: "month" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MonthPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'month' }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    } });

class EndOfWeekDisplayPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(endOfWeek, startOfWeek, locale = this.locale, method = 'short') {
        if (endOfWeek.getMonth() === startOfWeek.getMonth()) {
            return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(endOfWeek);
        }
        return new Intl.DateTimeFormat(locale, { month: method, day: 'numeric' }).format(endOfWeek);
    }
}
EndOfWeekDisplayPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EndOfWeekDisplayPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
EndOfWeekDisplayPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EndOfWeekDisplayPipe, name: "endofweekdisplay" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EndOfWeekDisplayPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'endofweekdisplay' }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    } });

class DayOfMonthPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'numeric') {
        return new Intl.DateTimeFormat(locale, { day: method }).format(date);
    }
}
DayOfMonthPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DayOfMonthPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
DayOfMonthPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DayOfMonthPipe, name: "dayofmonth" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DayOfMonthPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'dayofmonth' }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    } });

class NovoAgendaMonthHeaderElement {
    constructor() {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    prevMonth(event) {
        this.viewDateChange.emit(subMonths(this.viewDate, 1));
    }
    nextMonth(event) {
        this.viewDateChange.emit(addMonths(this.viewDate, 1));
    }
}
NovoAgendaMonthHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaMonthHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaMonthHeaderElement, selector: "novo-agenda-month-header", inputs: { viewDate: "viewDate", days: "days", locale: "locale", customTemplate: "customTemplate" }, outputs: { viewDateChange: "viewDateChange" }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div class="agenda-header">
        <div class="agenda-header-top">
          <novo-button theme="icon" icon="previous" (click)="prevMonth($event)"></novo-button>
          <div class="agenda-month">{{ viewDate | month: locale }}</div>
          <novo-button theme="icon" icon="next" (click)="nextMonth($event)"></novo-button>
        </div>
        <div class="agenda-weekdays">
          <div
            class="agenda-weekday"
            *ngFor="let day of days"
            [class.agenda-past]="day.isPast"
            [class.agenda-today]="day.isToday"
            [class.agenda-future]="day.isFuture"
            [class.agenda-weekend]="day.isWeekend"
          >
            {{ day.date | weekday: locale }}
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ days: days, locale: locale, viewDate: viewDate }"
    >
    </ng-template>
  `, isInline: true, components: [{ type: i1$1.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "month": MonthPipe, "weekday": WeekdayPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-month-header',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div class="agenda-header">
        <div class="agenda-header-top">
          <novo-button theme="icon" icon="previous" (click)="prevMonth($event)"></novo-button>
          <div class="agenda-month">{{ viewDate | month: locale }}</div>
          <novo-button theme="icon" icon="next" (click)="nextMonth($event)"></novo-button>
        </div>
        <div class="agenda-weekdays">
          <div
            class="agenda-weekday"
            *ngFor="let day of days"
            [class.agenda-past]="day.isPast"
            [class.agenda-today]="day.isToday"
            [class.agenda-future]="day.isFuture"
            [class.agenda-weekend]="day.isWeekend"
          >
            {{ day.date | weekday: locale }}
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ days: days, locale: locale, viewDate: viewDate }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { viewDate: [{
                type: Input
            }], days: [{
                type: Input
            }], locale: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], viewDateChange: [{
                type: Output
            }] } });

class NovoAgendaMonthDayElement {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
    get accepted() {
        if (!this.day) {
            return [];
        }
        return this.day.events.filter((evt) => {
            return evt.response === CalendarEventResponse.Accepted;
        });
    }
    get rejected() {
        if (!this.day) {
            return [];
        }
        return this.day.events.filter((evt) => {
            return evt.response === CalendarEventResponse.Rejected;
        });
    }
    get maybes() {
        if (!this.day) {
            return [];
        }
        return this.day.events.filter((evt) => {
            return evt.response === CalendarEventResponse.Maybe;
        });
    }
}
NovoAgendaMonthDayElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthDayElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaMonthDayElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaMonthDayElement, selector: "novo-agenda-month-day", inputs: { day: "day", locale: "locale", tooltipPosition: "tooltipPosition", customTemplate: "customTemplate" }, outputs: { eventClicked: "eventClicked" }, host: { properties: { "class": "\"agenda-cell agenda-day-cell \" + day?.cssClass", "class.agenda-day-accepted": "accepted.length", "class.agenda-day-rejected": "rejected.length", "class.agenda-past": "day.isPast", "class.agenda-today": "day.isToday", "class.agenda-future": "day.isFuture", "class.agenda-weekend": "day.isWeekend", "class.agenda-in-month": "day.inMonth", "class.agenda-out-month": "!day.inMonth", "class.agenda-has-events": "day.events.length > 0", "style.backgroundColor": "day.backgroundColor" } }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div class="agenda-day-top">
        <span class="agenda-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
        <span class="agenda-day-number">{{ day.date | dayofmonth: locale }}</span>
      </div>
      <div class="agenda-events">
        <div
          class="agenda-event"
          *ngFor="let type of day.events | groupBy: 'type'"
          [style.backgroundColor]="type?.value[0]?.color.primary"
          [ngClass]="type?.value[0]?.cssClass"
          (click)="$event.stopPropagation(); eventClicked.emit({ event: type?.value[0] })"
        >
          {{ type?.value.length }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        day: day,
        locale: locale,
        tooltipPosition: tooltipPosition,
        eventClicked: eventClicked,
        accepted: accepted,
        rejected: rejected,
        maybes: maybes
      }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "dayofmonth": DayOfMonthPipe, "groupBy": i3.GroupByPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthDayElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-month-day',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div class="agenda-day-top">
        <span class="agenda-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
        <span class="agenda-day-number">{{ day.date | dayofmonth: locale }}</span>
      </div>
      <div class="agenda-events">
        <div
          class="agenda-event"
          *ngFor="let type of day.events | groupBy: 'type'"
          [style.backgroundColor]="type?.value[0]?.color.primary"
          [ngClass]="type?.value[0]?.cssClass"
          (click)="$event.stopPropagation(); eventClicked.emit({ event: type?.value[0] })"
        >
          {{ type?.value.length }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        day: day,
        locale: locale,
        tooltipPosition: tooltipPosition,
        eventClicked: eventClicked,
        accepted: accepted,
        rejected: rejected,
        maybes: maybes
      }"
    >
    </ng-template>
  `,
                    host: {
                        '[class]': '"agenda-cell agenda-day-cell " + day?.cssClass',
                        '[class.agenda-day-accepted]': 'accepted.length',
                        '[class.agenda-day-rejected]': 'rejected.length',
                        '[class.agenda-past]': 'day.isPast',
                        '[class.agenda-today]': 'day.isToday',
                        '[class.agenda-future]': 'day.isFuture',
                        '[class.agenda-weekend]': 'day.isWeekend',
                        '[class.agenda-in-month]': 'day.inMonth',
                        '[class.agenda-out-month]': '!day.inMonth',
                        '[class.agenda-has-events]': 'day.events.length > 0',
                        '[style.backgroundColor]': 'day.backgroundColor',
                    },
                }]
        }], propDecorators: { day: [{
                type: Input
            }], locale: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], eventClicked: [{
                type: Output
            }] } });

/**
 * Shows all events on a given month. Example usage:
 *
 * ```
 * &lt;novo-agenda-month-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-agenda-month-view&gt;
 * ```
 */
class NovoAgendaMonthViewElement {
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
        const year = getYear(day.date);
        const month = getMonth(day.date);
        const date = getDate(day.date);
        const newStart = setYear(setMonth(setDate(event.start, date), month), year);
        let newEnd;
        if (event.end) {
            const secondsDiff = differenceInSeconds(newStart, event.start);
            newEnd = addSeconds(event.end, secondsDiff);
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
NovoAgendaMonthViewElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthViewElement, deps: [{ token: i0.ChangeDetectorRef }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaMonthViewElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaMonthViewElement, selector: "novo-agenda-month", inputs: { viewDate: "viewDate", events: "events", excludeDays: "excludeDays", dayModifier: "dayModifier", refresh: "refresh", locale: "locale", tooltipPosition: "tooltipPosition", weekStartsOn: "weekStartsOn", headerTemplate: "headerTemplate", cellTemplate: "cellTemplate" }, outputs: { dayClicked: "dayClicked", eventClicked: "eventClicked", eventTimesChanged: "eventTimesChanged", viewDateChange: "viewDateChange" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="agenda-month-view">
      <novo-agenda-month-header
        [(viewDate)]="viewDate"
        [days]="columnHeaders"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (viewDateChange)="refreshAll()"
      >
      </novo-agenda-month-header>
      <div class="agenda-days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="agenda-cell-row">
            <novo-agenda-month-day
              *ngFor="let day of view.days | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek"
              [day]="day"
              [locale]="locale"
              [customTemplate]="cellTemplate"
              (click)="dayClicked.emit({ day: day })"
              (eventClicked)="eventClicked.emit({ day: day, event: $event.event })"
            >
            </novo-agenda-month-day>
          </div>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [".agenda-month-view{background-color:var(--color-background)}.agenda-month-view .agenda-header{display:flex;flex-flow:column;text-align:center;font-weight:bolder;border-bottom:2px solid #e1e1e1}.agenda-month-view .agenda-header .agenda-header-top{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-around}.agenda-month-view .agenda-header .agenda-header-top .agenda-month{font-size:180%}.agenda-month-view .agenda-header .agenda-header-top .agenda-year{color:#999}.agenda-month-view .agenda-header .agenda-weekdays{display:flex;flex-flow:row nowrap}.agenda-month-view .agenda-header .agenda-weekdays .agenda-weekday{padding:5px 0;overflow:hidden;text-overflow:ellipsis;display:block;white-space:nowrap;flex:1}.agenda-month-view .agenda-cell-row{display:flex}.agenda-month-view .agenda-cell-row:hover{background-color:#fafafa}.agenda-month-view .agenda-cell-row .agenda-cell:hover,.agenda-month-view .agenda-cell.agenda-has-events.agenda-open{background-color:#ededed}.agenda-month-view .agenda-days{border:1px solid #e1e1e1;border-bottom:0}.agenda-month-view .agenda-day-top{display:flex;flex-flow:row nowrap;align-items:center;justify-content:flex-end}.agenda-month-view .agenda-cell:hover .agenda-actions{display:flex}.agenda-month-view .agenda-cell{float:left;flex:1;display:flex;flex-direction:column;align-items:stretch;position:relative}.agenda-month-view .agenda-day-cell{min-height:56px}.agenda-month-view .agenda-day-cell:not(:last-child){border-right:1px solid #e1e1e1}.agenda-month-view .agenda-days .agenda-cell-row{border-bottom:1px solid #e1e1e1}.agenda-month-view .agenda-day-badge{background-color:#b94a48;display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:middle;border-radius:10px}.agenda-month-view .agenda-day-number{font-size:1.2em;font-weight:400;opacity:.5;padding:4px}.agenda-month-view .agenda-event{width:22px;height:22px;border-radius:4px;display:inline-block;margin:2px;vertical-align:middle;text-align:center;line-height:22px;font-size:12px;color:var(--color-background)}.agenda-month-view .agenda-day-cell.agenda-in-month.agenda-has-events{cursor:pointer}.agenda-month-view .agenda-day-cell.agenda-out-month .agenda-day-number{opacity:.1;cursor:default}.agenda-month-view .agenda-day-cell.agenda-weekend .agenda-day-number{color:#8b0000}.agenda-month-view .agenda-day-cell.agenda-today{background-color:#e8fde7}.agenda-month-view .agenda-day-cell.agenda-today .agenda-day-number{color:var(--color-text)}.agenda-month-view .agenda-day-cell.agenda-drag-over{background-color:#e0e0e0!important}.agenda-month-view .agenda-open-day-events{padding:15px;color:#fff;background-color:#555;box-shadow:inset 0 0 15px #00000080}.agenda-month-view .agenda-open-day-events .agenda-event{position:relative;top:2px}.agenda-month-view .agenda-event-title{color:#fff}.agenda-month-view .agenda-out-month .agenda-day-badge,.agenda-month-view .agenda-out-month .agenda-event{opacity:.3}\n"], components: [{ type: NovoAgendaMonthHeaderElement, selector: "novo-agenda-month-header", inputs: ["viewDate", "days", "locale", "customTemplate"], outputs: ["viewDateChange"] }, { type: NovoAgendaMonthDayElement, selector: "novo-agenda-month-day", inputs: ["day", "locale", "tooltipPosition", "customTemplate"], outputs: ["eventClicked"] }], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "slice": i1.SlicePipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthViewElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-agenda-month', encapsulation: ViewEncapsulation.None, template: `
    <div class="agenda-month-view">
      <novo-agenda-month-header
        [(viewDate)]="viewDate"
        [days]="columnHeaders"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (viewDateChange)="refreshAll()"
      >
      </novo-agenda-month-header>
      <div class="agenda-days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="agenda-cell-row">
            <novo-agenda-month-day
              *ngFor="let day of view.days | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek"
              [day]="day"
              [locale]="locale"
              [customTemplate]="cellTemplate"
              (click)="dayClicked.emit({ day: day })"
              (eventClicked)="eventClicked.emit({ day: day, event: $event.event })"
            >
            </novo-agenda-month-day>
          </div>
        </div>
      </div>
    </div>
  `, styles: [".agenda-month-view{background-color:var(--color-background)}.agenda-month-view .agenda-header{display:flex;flex-flow:column;text-align:center;font-weight:bolder;border-bottom:2px solid #e1e1e1}.agenda-month-view .agenda-header .agenda-header-top{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-around}.agenda-month-view .agenda-header .agenda-header-top .agenda-month{font-size:180%}.agenda-month-view .agenda-header .agenda-header-top .agenda-year{color:#999}.agenda-month-view .agenda-header .agenda-weekdays{display:flex;flex-flow:row nowrap}.agenda-month-view .agenda-header .agenda-weekdays .agenda-weekday{padding:5px 0;overflow:hidden;text-overflow:ellipsis;display:block;white-space:nowrap;flex:1}.agenda-month-view .agenda-cell-row{display:flex}.agenda-month-view .agenda-cell-row:hover{background-color:#fafafa}.agenda-month-view .agenda-cell-row .agenda-cell:hover,.agenda-month-view .agenda-cell.agenda-has-events.agenda-open{background-color:#ededed}.agenda-month-view .agenda-days{border:1px solid #e1e1e1;border-bottom:0}.agenda-month-view .agenda-day-top{display:flex;flex-flow:row nowrap;align-items:center;justify-content:flex-end}.agenda-month-view .agenda-cell:hover .agenda-actions{display:flex}.agenda-month-view .agenda-cell{float:left;flex:1;display:flex;flex-direction:column;align-items:stretch;position:relative}.agenda-month-view .agenda-day-cell{min-height:56px}.agenda-month-view .agenda-day-cell:not(:last-child){border-right:1px solid #e1e1e1}.agenda-month-view .agenda-days .agenda-cell-row{border-bottom:1px solid #e1e1e1}.agenda-month-view .agenda-day-badge{background-color:#b94a48;display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:middle;border-radius:10px}.agenda-month-view .agenda-day-number{font-size:1.2em;font-weight:400;opacity:.5;padding:4px}.agenda-month-view .agenda-event{width:22px;height:22px;border-radius:4px;display:inline-block;margin:2px;vertical-align:middle;text-align:center;line-height:22px;font-size:12px;color:var(--color-background)}.agenda-month-view .agenda-day-cell.agenda-in-month.agenda-has-events{cursor:pointer}.agenda-month-view .agenda-day-cell.agenda-out-month .agenda-day-number{opacity:.1;cursor:default}.agenda-month-view .agenda-day-cell.agenda-weekend .agenda-day-number{color:#8b0000}.agenda-month-view .agenda-day-cell.agenda-today{background-color:#e8fde7}.agenda-month-view .agenda-day-cell.agenda-today .agenda-day-number{color:var(--color-text)}.agenda-month-view .agenda-day-cell.agenda-drag-over{background-color:#e0e0e0!important}.agenda-month-view .agenda-open-day-events{padding:15px;color:#fff;background-color:#555;box-shadow:inset 0 0 15px #00000080}.agenda-month-view .agenda-open-day-events .agenda-event{position:relative;top:2px}.agenda-month-view .agenda-event-title{color:#fff}.agenda-month-view .agenda-out-month .agenda-day-badge,.agenda-month-view .agenda-out-month .agenda-event{opacity:.3}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    }, propDecorators: { viewDate: [{
                type: Input
            }], events: [{
                type: Input
            }], excludeDays: [{
                type: Input
            }], dayModifier: [{
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
            }], cellTemplate: [{
                type: Input
            }], dayClicked: [{
                type: Output
            }], eventClicked: [{
                type: Output
            }], eventTimesChanged: [{
                type: Output
            }], viewDateChange: [{
                type: Output
            }] } });

class NovoAgendaAllDayEventElement {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
NovoAgendaAllDayEventElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaAllDayEventElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaAllDayEventElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaAllDayEventElement, selector: "novo-agenda-all-day-event", inputs: { event: "event", customTemplate: "customTemplate" }, outputs: { eventClicked: "eventClicked" }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div class="cal-all-day-event" [style.backgroundColor]="event.color.secondary" [style.borderColor]="event.color.primary">
        {{ event.title }}
        <!--<novo-agenda-event-title
          [event]="event"
          view="day"
          (click)="eventClicked.emit()">
        </novo-agenda-event-title>
        <novo-agenda-event-actions [event]="event"></novo-agenda-event-actions>-->
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        eventClicked: eventClicked
      }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaAllDayEventElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-all-day-event',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div class="cal-all-day-event" [style.backgroundColor]="event.color.secondary" [style.borderColor]="event.color.primary">
        {{ event.title }}
        <!--<novo-agenda-event-title
          [event]="event"
          view="day"
          (click)="eventClicked.emit()">
        </novo-agenda-event-title>
        <novo-agenda-event-actions [event]="event"></novo-agenda-event-actions>-->
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        eventClicked: eventClicked
      }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { event: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], eventClicked: [{
                type: Output
            }] } });

class NovoAgendaDayEventElement {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
NovoAgendaDayEventElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaDayEventElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaDayEventElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaDayEventElement, selector: "novo-agenda-day-event", inputs: { dayEvent: "dayEvent", tooltipPosition: "tooltipPosition", customTemplate: "customTemplate" }, outputs: { eventClicked: "eventClicked" }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [style.borderColor]="dayEvent.event.color.secondary"
        [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
        [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
        [ngClass]="dayEvent.event.cssClass"
        [tooltip]="dayEvent.event.description"
        [tooltipPosition]="tooltipPosition"
        (click)="eventClicked.emit({ event: dayEvent.event })"
      >
        <div class="cal-event-ribbon" [style.backgroundColor]="dayEvent.event.color.primary"></div>
        <div class="cal-event-group">
          <div class="cal-event-title">{{ dayEvent.event.title }}</div>
          <div class="cal-event-description">{{ dayEvent.event?.description }}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ dayEvent: dayEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaDayEventElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-day-event',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [style.borderColor]="dayEvent.event.color.secondary"
        [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
        [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
        [ngClass]="dayEvent.event.cssClass"
        [tooltip]="dayEvent.event.description"
        [tooltipPosition]="tooltipPosition"
        (click)="eventClicked.emit({ event: dayEvent.event })"
      >
        <div class="cal-event-ribbon" [style.backgroundColor]="dayEvent.event.color.primary"></div>
        <div class="cal-event-group">
          <div class="cal-event-title">{{ dayEvent.event.title }}</div>
          <div class="cal-event-description">{{ dayEvent.event?.description }}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ dayEvent: dayEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { dayEvent: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], eventClicked: [{
                type: Output
            }] } });

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
class NovoAgendaDayViewElement {
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
NovoAgendaDayViewElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaDayViewElement, deps: [{ token: i0.ChangeDetectorRef }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaDayViewElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaDayViewElement, selector: "novo-agenda-day", inputs: { viewDate: "viewDate", events: "events", hourSegments: "hourSegments", dayStartHour: "dayStartHour", dayStartMinute: "dayStartMinute", dayEndHour: "dayEndHour", dayEndMinute: "dayEndMinute", eventWidth: "eventWidth", refresh: "refresh", locale: "locale", hourSegmentModifier: "hourSegmentModifier", eventSnapSize: "eventSnapSize", tooltipPosition: "tooltipPosition", hourSegmentTemplate: "hourSegmentTemplate", allDayEventTemplate: "allDayEventTemplate", eventTemplate: "eventTemplate" }, outputs: { eventClicked: "eventClicked", hourSegmentClicked: "hourSegmentClicked", eventTimesChanged: "eventTimesChanged" }, usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [".cal-day-view .cal-event-container{position:absolute}.cal-day-view novo-agenda-day-event{height:inherit}.cal-day-view novo-agenda-day-event .cal-event{height:inherit;font-size:12px;margin-left:2px;margin-right:2px;min-height:30px;display:flex;flex-flow:row nowrap;background-color:var(--color-background-secondary)}.cal-day-view novo-agenda-day-event .cal-event .cal-event-ribbon{width:4px;min-height:100%}.cal-day-view novo-agenda-day-event .cal-event .cal-event-group{overflow:hidden;flex:1;padding:2px 10px;display:flex;flex-flow:column}.cal-day-view novo-agenda-day-event .cal-event .cal-event-title{line-height:26px}.cal-day-view novo-agenda-day-event .cal-event .cal-event-description{font-size:10px;line-height:13px}.cal-day-view .cal-draggable{cursor:move}.cal-day-view .cal-all-day-event{padding:8px;border:solid 1px}\n", "@charset \"UTF-8\";.cal-day-view .cal-hour-rows,.cal-week-view .cal-hour-rows{width:100%;border:solid 1px #e1e1e1;overflow-x:scroll;position:relative}.cal-day-view .cal-hour:nth-child(even),.cal-week-view .cal-hour:nth-child(even){background-color:var(--color-background-secondary)}.cal-day-view .cal-hour:nth-child(odd),.cal-week-view .cal-hour:nth-child(odd){background-color:var(--color-background)}.cal-day-view .cal-hour-segment,.cal-week-view .cal-hour-segment{height:30px}.cal-day-view .cal-hour-segment:after,.cal-week-view .cal-hour-segment:after{content:\"\\a0\"}.cal-day-view .cal-hour:not(:last-child) .cal-hour-segment,.cal-day-view .cal-hour:last-child :not(:last-child) .cal-hour-segment,.cal-week-view .cal-hour:not(:last-child) .cal-hour-segment,.cal-week-view .cal-hour:last-child :not(:last-child) .cal-hour-segment{border-bottom:thin dashed #e1e1e1}.cal-day-view .cal-time,.cal-week-view .cal-time{font-weight:700;padding-top:5px;width:70px;text-align:center;color:var(--color-text-muted)}.cal-day-view .cal-hour-segment.cal-after-hour-start .cal-time,.cal-week-view .cal-hour-segment.cal-after-hour-start .cal-time{display:none}.cal-day-view .cal-hour-segment:hover,.cal-day-view .cal-drag-over .cal-hour-segment,.cal-week-view .cal-hour-segment:hover,.cal-week-view .cal-drag-over .cal-hour-segment{background-color:#ededed}\n"], components: [{ type: NovoAgendaAllDayEventElement, selector: "novo-agenda-all-day-event", inputs: ["event", "customTemplate"], outputs: ["eventClicked"] }, { type: NovoAgendaDayEventElement, selector: "novo-agenda-day-event", inputs: ["dayEvent", "tooltipPosition", "customTemplate"], outputs: ["eventClicked"] }, { type: NovoAgendaHourSegmentElement, selector: "novo-agenda-day-hour-segment", inputs: ["segment", "locale", "customTemplate"] }], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaDayViewElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-agenda-day', encapsulation: ViewEncapsulation.None, template: `
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
  `, styles: [".cal-day-view .cal-event-container{position:absolute}.cal-day-view novo-agenda-day-event{height:inherit}.cal-day-view novo-agenda-day-event .cal-event{height:inherit;font-size:12px;margin-left:2px;margin-right:2px;min-height:30px;display:flex;flex-flow:row nowrap;background-color:var(--color-background-secondary)}.cal-day-view novo-agenda-day-event .cal-event .cal-event-ribbon{width:4px;min-height:100%}.cal-day-view novo-agenda-day-event .cal-event .cal-event-group{overflow:hidden;flex:1;padding:2px 10px;display:flex;flex-flow:column}.cal-day-view novo-agenda-day-event .cal-event .cal-event-title{line-height:26px}.cal-day-view novo-agenda-day-event .cal-event .cal-event-description{font-size:10px;line-height:13px}.cal-day-view .cal-draggable{cursor:move}.cal-day-view .cal-all-day-event{padding:8px;border:solid 1px}\n", "@charset \"UTF-8\";.cal-day-view .cal-hour-rows,.cal-week-view .cal-hour-rows{width:100%;border:solid 1px #e1e1e1;overflow-x:scroll;position:relative}.cal-day-view .cal-hour:nth-child(even),.cal-week-view .cal-hour:nth-child(even){background-color:var(--color-background-secondary)}.cal-day-view .cal-hour:nth-child(odd),.cal-week-view .cal-hour:nth-child(odd){background-color:var(--color-background)}.cal-day-view .cal-hour-segment,.cal-week-view .cal-hour-segment{height:30px}.cal-day-view .cal-hour-segment:after,.cal-week-view .cal-hour-segment:after{content:\"\\a0\"}.cal-day-view .cal-hour:not(:last-child) .cal-hour-segment,.cal-day-view .cal-hour:last-child :not(:last-child) .cal-hour-segment,.cal-week-view .cal-hour:not(:last-child) .cal-hour-segment,.cal-week-view .cal-hour:last-child :not(:last-child) .cal-hour-segment{border-bottom:thin dashed #e1e1e1}.cal-day-view .cal-time,.cal-week-view .cal-time{font-weight:700;padding-top:5px;width:70px;text-align:center;color:var(--color-text-muted)}.cal-day-view .cal-hour-segment.cal-after-hour-start .cal-time,.cal-week-view .cal-hour-segment.cal-after-hour-start .cal-time{display:none}.cal-day-view .cal-hour-segment:hover,.cal-day-view .cal-drag-over .cal-hour-segment,.cal-week-view .cal-hour-segment:hover,.cal-week-view .cal-drag-over .cal-hour-segment{background-color:#ededed}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    }, propDecorators: { viewDate: [{
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

class NovoEventTypeLegendElement {
    constructor() {
        this.eventTypeClicked = new EventEmitter();
    }
}
NovoEventTypeLegendElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoEventTypeLegendElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoEventTypeLegendElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoEventTypeLegendElement, selector: "novo-event-type-legend", inputs: { events: "events", customTemplate: "customTemplate" }, outputs: { eventTypeClicked: "eventTypeClicked" }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div class="cal-event-legend">
        <div
          class="cal-event-type"
          *ngFor="let type of events | groupBy: 'type'"
          (click)="$event.stopPropagation(); eventTypeClicked.emit({ event: type?.key })"
        >
          <div class="cal-event-type-swatch"></div>
          <div>{{ type?.key }}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ events: events, eventTypeClicked: eventTypeClicked }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "groupBy": i3.GroupByPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoEventTypeLegendElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-event-type-legend',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div class="cal-event-legend">
        <div
          class="cal-event-type"
          *ngFor="let type of events | groupBy: 'type'"
          (click)="$event.stopPropagation(); eventTypeClicked.emit({ event: type?.key })"
        >
          <div class="cal-event-type-swatch"></div>
          <div>{{ type?.key }}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ events: events, eventTypeClicked: eventTypeClicked }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { events: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], eventTypeClicked: [{
                type: Output
            }] } });

class NovoAgendaDateChangeElement {
    constructor(locale) {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
        this.locale = locale;
    }
    /**
     * @hidden
     */
    subtractDate() {
        this.changeDate(-1);
    }
    addDate() {
        this.changeDate(1);
    }
    changeDate(unit) {
        const addFn = {
            day: DateUtil.addDays,
            week: DateUtil.addWeeks,
            month: DateUtil.addMonths,
        }[this.view];
        this.viewDateChange.emit(addFn(this.viewDate, unit));
    }
    get startOfWeek() {
        return DateUtil.startOfWeek(this.viewDate);
    }
    get endOfWeek() {
        return DateUtil.endOfWeek(this.viewDate);
    }
}
NovoAgendaDateChangeElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaDateChangeElement, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaDateChangeElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaDateChangeElement, selector: "novo-agenda-date-change", inputs: { view: "view", viewDate: "viewDate", locale: "locale" }, outputs: { viewDateChange: "viewDateChange" }, ngImport: i0, template: `
    <div class="cal-date-change">
      <i class="bhi-arrow-left" (click)="subtractDate()"></i>
      <span [ngSwitch]="view">
        <span *ngSwitchCase="'month'">{{ (viewDate | month: locale) + ' ' + (viewDate | year: locale) }}</span>
        <span *ngSwitchCase="'week'">{{
          (startOfWeek | monthday: locale:'long') + ' - ' + (endOfWeek | endofweekdisplay: startOfWeek:locale:'long')
        }}</span>
        <span *ngSwitchCase="'day'">{{
          (viewDate | weekday: locale:'long') + ', ' + (viewDate | month: locale) + ' ' + (viewDate | dayofmonth: locale)
        }}</span>
      </span>
      <i class="bhi-arrow-right" (click)="addDate()"></i>
    </div>
  `, isInline: true, styles: [":host{display:inline-block}:host .cal-date-change{border-radius:3px;border:1px solid #e1e1e1;background-color:var(--color-background);position:relative;padding:10px 15px;text-align:center}:host .cal-date-change>span{padding:5px;color:var(--color-text)}:host .cal-date-change>i{cursor:pointer;padding:2px;font-size:.9em}\n"], directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "month": MonthPipe, "year": YearPipe, "monthday": MonthDayPipe, "endofweekdisplay": EndOfWeekDisplayPipe, "weekday": WeekdayPipe, "dayofmonth": DayOfMonthPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaDateChangeElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-agenda-date-change', template: `
    <div class="cal-date-change">
      <i class="bhi-arrow-left" (click)="subtractDate()"></i>
      <span [ngSwitch]="view">
        <span *ngSwitchCase="'month'">{{ (viewDate | month: locale) + ' ' + (viewDate | year: locale) }}</span>
        <span *ngSwitchCase="'week'">{{
          (startOfWeek | monthday: locale:'long') + ' - ' + (endOfWeek | endofweekdisplay: startOfWeek:locale:'long')
        }}</span>
        <span *ngSwitchCase="'day'">{{
          (viewDate | weekday: locale:'long') + ', ' + (viewDate | month: locale) + ' ' + (viewDate | dayofmonth: locale)
        }}</span>
      </span>
      <i class="bhi-arrow-right" (click)="addDate()"></i>
    </div>
  `, styles: [":host{display:inline-block}:host .cal-date-change{border-radius:3px;border:1px solid #e1e1e1;background-color:var(--color-background);position:relative;padding:10px 15px;text-align:center}:host .cal-date-change>span{padding:5px;color:var(--color-text)}:host .cal-date-change>i{cursor:pointer;padding:2px;font-size:.9em}\n"] }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [LOCALE_ID]
                    }] }];
    }, propDecorators: { view: [{
                type: Input
            }], viewDate: [{
                type: Input
            }], locale: [{
                type: Input
            }], viewDateChange: [{
                type: Output
            }] } });

// NG2
class NovoAgendaModule {
}
NovoAgendaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoAgendaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaModule, declarations: [NovoEventTypeLegendElement,
        NovoAgendaMonthViewElement,
        NovoAgendaMonthHeaderElement,
        NovoAgendaMonthDayElement,
        NovoAgendaWeekViewElement,
        NovoAgendaWeekHeaderElement,
        NovoAgendaWeekEventElement,
        NovoAgendaDayViewElement,
        NovoAgendaDayEventElement,
        NovoAgendaHourSegmentElement,
        NovoAgendaAllDayEventElement,
        NovoAgendaDateChangeElement,
        WeekdayPipe,
        DayOfMonthPipe,
        MonthPipe,
        MonthDayPipe,
        YearPipe,
        HoursPipe,
        EndOfWeekDisplayPipe], imports: [CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule], exports: [NovoEventTypeLegendElement,
        NovoAgendaMonthViewElement,
        NovoAgendaMonthHeaderElement,
        NovoAgendaMonthDayElement,
        NovoAgendaWeekViewElement,
        NovoAgendaWeekHeaderElement,
        NovoAgendaWeekEventElement,
        NovoAgendaDayViewElement,
        NovoAgendaDayEventElement,
        NovoAgendaHourSegmentElement,
        NovoAgendaAllDayEventElement,
        NovoAgendaDateChangeElement,
        WeekdayPipe,
        DayOfMonthPipe,
        MonthPipe,
        MonthDayPipe,
        YearPipe,
        HoursPipe,
        EndOfWeekDisplayPipe] });
NovoAgendaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaModule, imports: [[CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule],
                    declarations: [
                        NovoEventTypeLegendElement,
                        NovoAgendaMonthViewElement,
                        NovoAgendaMonthHeaderElement,
                        NovoAgendaMonthDayElement,
                        NovoAgendaWeekViewElement,
                        NovoAgendaWeekHeaderElement,
                        NovoAgendaWeekEventElement,
                        NovoAgendaDayViewElement,
                        NovoAgendaDayEventElement,
                        NovoAgendaHourSegmentElement,
                        NovoAgendaAllDayEventElement,
                        NovoAgendaDateChangeElement,
                        WeekdayPipe,
                        DayOfMonthPipe,
                        MonthPipe,
                        MonthDayPipe,
                        YearPipe,
                        HoursPipe,
                        EndOfWeekDisplayPipe,
                    ],
                    exports: [
                        NovoEventTypeLegendElement,
                        NovoAgendaMonthViewElement,
                        NovoAgendaMonthHeaderElement,
                        NovoAgendaMonthDayElement,
                        NovoAgendaWeekViewElement,
                        NovoAgendaWeekHeaderElement,
                        NovoAgendaWeekEventElement,
                        NovoAgendaDayViewElement,
                        NovoAgendaDayEventElement,
                        NovoAgendaHourSegmentElement,
                        NovoAgendaAllDayEventElement,
                        NovoAgendaDateChangeElement,
                        WeekdayPipe,
                        DayOfMonthPipe,
                        MonthPipe,
                        MonthDayPipe,
                        YearPipe,
                        HoursPipe,
                        EndOfWeekDisplayPipe,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DayOfMonthPipe, EndOfWeekDisplayPipe, HoursPipe, MonthDayPipe, MonthPipe, NovoAgendaAllDayEventElement, NovoAgendaDateChangeElement, NovoAgendaDayEventElement, NovoAgendaDayViewElement, NovoAgendaHourSegmentElement, NovoAgendaModule, NovoAgendaMonthDayElement, NovoAgendaMonthHeaderElement, NovoAgendaMonthViewElement, NovoAgendaWeekEventElement, NovoAgendaWeekHeaderElement, NovoAgendaWeekViewElement, NovoEventTypeLegendElement, WeekdayPipe, YearPipe };
//# sourceMappingURL=novo-elements-components-agenda.mjs.map
