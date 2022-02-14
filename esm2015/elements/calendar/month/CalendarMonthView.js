import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, LOCALE_ID, Output, TemplateRef, } from '@angular/core';
import * as dateFns from 'date-fns';
import { Subject } from 'rxjs';
import { getMonthView, getWeekViewHeader, } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
import * as i1 from "./CalendarMonthHeader";
import * as i2 from "@angular/common";
import * as i3 from "./CalendarMonthDay";
function NovoCalendarMonthViewElement_div_3_novo_calendar_month_day_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-calendar-month-day", 6);
    i0.ɵɵlistener("click", function NovoCalendarMonthViewElement_div_3_novo_calendar_month_day_2_Template_novo_calendar_month_day_click_0_listener() { i0.ɵɵrestoreView(_r5); const day_r3 = ctx.$implicit; const ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.dayClicked.emit({ day: day_r3 }); })("eventClicked", function NovoCalendarMonthViewElement_div_3_novo_calendar_month_day_2_Template_novo_calendar_month_day_eventClicked_0_listener($event) { i0.ɵɵrestoreView(_r5); const day_r3 = ctx.$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.eventClicked.emit({ day: day_r3, event: $event.event }); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r3 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("day", day_r3)("locale", ctx_r2.locale)("customTemplate", ctx_r2.cellTemplate);
} }
function NovoCalendarMonthViewElement_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 4);
    i0.ɵɵtemplate(2, NovoCalendarMonthViewElement_div_3_novo_calendar_month_day_2_Template, 1, 3, "novo-calendar-month-day", 5);
    i0.ɵɵpipe(3, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rowIndex_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(3, 1, ctx_r0.view.days, rowIndex_r1, rowIndex_r1 + ctx_r0.view.totalDaysVisibleInWeek));
} }
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
NovoCalendarMonthViewElement.ɵfac = function NovoCalendarMonthViewElement_Factory(t) { return new (t || NovoCalendarMonthViewElement)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(LOCALE_ID)); };
NovoCalendarMonthViewElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCalendarMonthViewElement, selectors: [["novo-calendar-month"]], inputs: { viewDate: "viewDate", events: "events", excludeDays: "excludeDays", dayModifier: "dayModifier", refresh: "refresh", locale: "locale", tooltipPosition: "tooltipPosition", weekStartsOn: "weekStartsOn", headerTemplate: "headerTemplate", cellTemplate: "cellTemplate" }, outputs: { dayClicked: "dayClicked", eventClicked: "eventClicked", eventTimesChanged: "eventTimesChanged", viewDateChange: "viewDateChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 5, consts: [[1, "calendar-month-view"], [3, "viewDate", "days", "locale", "customTemplate", "viewDateChange"], [1, "calendar-days"], [4, "ngFor", "ngForOf"], [1, "calendar-cell-row"], [3, "day", "locale", "customTemplate", "click", "eventClicked", 4, "ngFor", "ngForOf"], [3, "day", "locale", "customTemplate", "click", "eventClicked"]], template: function NovoCalendarMonthViewElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "novo-calendar-month-header", 1);
        i0.ɵɵlistener("viewDateChange", function NovoCalendarMonthViewElement_Template_novo_calendar_month_header_viewDateChange_1_listener($event) { return ctx.viewDate = $event; })("viewDateChange", function NovoCalendarMonthViewElement_Template_novo_calendar_month_header_viewDateChange_1_listener() { return ctx.refreshAll(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵtemplate(3, NovoCalendarMonthViewElement_div_3_Template, 4, 5, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("viewDate", ctx.viewDate)("days", ctx.columnHeaders)("locale", ctx.locale)("customTemplate", ctx.headerTemplate);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.view.rowOffsets);
    } }, directives: [i1.NovoCalendarMonthHeaderElement, i2.NgForOf, i3.NovoCalendarMonthDayElement], pipes: [i2.SlicePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCalendarMonthViewElement, [{
        type: Component,
        args: [{
                selector: 'novo-calendar-month',
                template: `
    <div class="calendar-month-view">
      <novo-calendar-month-header
        [(viewDate)]="viewDate"
        [days]="columnHeaders"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (viewDateChange)="refreshAll()"
      >
      </novo-calendar-month-header>
      <div class="calendar-days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="calendar-cell-row">
            <novo-calendar-month-day
              *ngFor="let day of view.days | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek"
              [day]="day"
              [locale]="locale"
              [customTemplate]="cellTemplate"
              (click)="dayClicked.emit({ day: day })"
              (eventClicked)="eventClicked.emit({ day: day, event: $event.event })"
            >
            </novo-calendar-month-day>
          </div>
        </div>
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJNb250aFZpZXcuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2FsZW5kYXIvbW9udGgvQ2FsZW5kYXJNb250aFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUlULE1BQU0sRUFDTixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUdMLFlBQVksRUFDWixpQkFBaUIsR0FJbEIsTUFBTSw2Q0FBNkMsQ0FBQzs7Ozs7OztJQTJCekMsa0RBUTBCO0lBSHhCLG1QQUFTLHVDQUE2QixJQUFDLDBQQUN2Qiw4REFBb0QsSUFEN0I7SUFHekMsaUJBQTBCOzs7O0lBTnhCLDRCQUFXLHlCQUFBLHVDQUFBOzs7SUFKakIsMkJBQ0U7SUFBQSw4QkFDRTtJQUFBLDJIQVFBOztJQUNGLGlCQUFNO0lBQ1IsaUJBQU07Ozs7SUFUQSxlQUFzRjtJQUF0RiwrSEFBc0Y7O0FBMUJwRzs7Ozs7Ozs7O0dBU0c7QUErQkgsTUFBTSxPQUFPLDRCQUE0QjtJQWtHdkM7O09BRUc7SUFDSCxZQUFvQixHQUFzQixFQUFxQixNQUFjO1FBQXpELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBOUYxQzs7V0FFRztRQUVILFdBQU0sR0FBb0IsRUFBRSxDQUFDO1FBRTdCOztXQUVHO1FBRUgsZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFlM0I7O1dBRUc7UUFFSCxXQUFNLEdBQVcsT0FBTyxDQUFDO1FBRXpCOztXQUVHO1FBRUgsb0JBQWUs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TixjQUFjO2tCQURiLEtBQUs7WUFPTixZQUFZO2tCQURYLEtBQUs7WUFPTixVQUFVO2tCQURULE1BQU07WUFPUCxZQUFZO2tCQURYLE1BQU07WUFPUCxpQkFBaUI7a0JBRGhCLE1BQU07WUFJUCxjQUFjO2tCQURiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIExPQ0FMRV9JRCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJFdmVudCxcbiAgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50LFxuICBnZXRNb250aFZpZXcsXG4gIGdldFdlZWtWaWV3SGVhZGVyLFxuICBNb250aFZpZXcsXG4gIE1vbnRoVmlld0RheSxcbiAgV2Vla0RheSxcbn0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY2FsZW5kYXItdXRpbHMvQ2FsZW5kYXJVdGlscyc7XG5cbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIG1vbnRoLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYFxuICogJmx0O25vdm8tY2FsZW5kYXItbW9udGgtdmlld1xuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXG4gKiAgW2V2ZW50c109XCJldmVudHNcIiZndDtcbiAqICZsdDsvbm92by1jYWxlbmRhci1tb250aC12aWV3Jmd0O1xuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXItbW9udGgnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1tb250aC12aWV3XCI+XG4gICAgICA8bm92by1jYWxlbmRhci1tb250aC1oZWFkZXJcbiAgICAgICAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxuICAgICAgICBbZGF5c109XCJjb2x1bW5IZWFkZXJzXCJcbiAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIlxuICAgICAgICAodmlld0RhdGVDaGFuZ2UpPVwicmVmcmVzaEFsbCgpXCJcbiAgICAgID5cbiAgICAgIDwvbm92by1jYWxlbmRhci1tb250aC1oZWFkZXI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItZGF5c1wiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCByb3dJbmRleCBvZiB2aWV3LnJvd09mZnNldHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItY2VsbC1yb3dcIj5cbiAgICAgICAgICAgIDxub3ZvLWNhbGVuZGFyLW1vbnRoLWRheVxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIHZpZXcuZGF5cyB8IHNsaWNlOiByb3dJbmRleDpyb3dJbmRleCArIHZpZXcudG90YWxEYXlzVmlzaWJsZUluV2Vla1wiXG4gICAgICAgICAgICAgIFtkYXldPVwiZGF5XCJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiY2VsbFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImRheUNsaWNrZWQuZW1pdCh7IGRheTogZGF5IH0pXCJcbiAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCh7IGRheTogZGF5LCBldmVudDogJGV2ZW50LmV2ZW50IH0pXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvbm92by1jYWxlbmRhci1tb250aC1kYXk+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DYWxlbmRhck1vbnRoVmlld0VsZW1lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpXG4gIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdID0gW107XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCB3aWxsIGJlIGhpZGRlbiBvbiB0aGUgdmlld1xuICAgKi9cbiAgQElucHV0KClcbiAgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgZWFjaCBjZWxsIGlzIHJlbmRlcmVkLiBUaGUgZmlyc3QgYXJndW1lbnQgd2lsbCBjb250YWluIHRoZSBjYWxlbmRhciBjZWxsLlxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIHRoZSBjZWxsIGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGNlbGwgaW4gdGhlIHRlbXBsYXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBkYXlNb2RpZmllcjogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KClcbiAgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXG4gICAqL1xuICBASW5wdXQoKVxuICBsb2NhbGU6IHN0cmluZyA9ICdlbi1VUyc7XG5cbiAgLyoqXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBQb3NpdGlvbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgLyoqXG4gICAqIFRoZSBzdGFydCBudW1iZXIgb2YgdGhlIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpXG4gIHdlZWtTdGFydHNPbjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaGVhZGVyXG4gICAqL1xuICBASW5wdXQoKVxuICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGRheSBjZWxsXG4gICAqL1xuICBASW5wdXQoKVxuICBjZWxsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBkYXkgY2VsbCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZGF5Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZGF5OiBNb250aFZpZXdEYXkgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZGF5OiBNb250aFZpZXdEYXkgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGV2ZW50IHRpdGxlIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGRheTogYW55OyBldmVudDogQ2FsZW5kYXJFdmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBkYXk6IGFueTsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgaXMgZHJhZ2dlZCBhbmQgZHJvcHBlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50VGltZXNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PigpO1xuXG4gIEBPdXRwdXQoKVxuICB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb2x1bW5IZWFkZXJzOiBXZWVrRGF5W107XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZpZXc6IE1vbnRoVmlldztcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcmVmcmVzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZykge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudmlld0RhdGUgfHwgY2hhbmdlcy5leGNsdWRlRGF5cykge1xuICAgICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZXZlbnRzIHx8IGNoYW5nZXMuZXhjbHVkZURheXMpIHtcbiAgICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV2ZW50RHJvcHBlZChkYXk6IE1vbnRoVmlld0RheSwgZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB5ZWFyOiBudW1iZXIgPSBkYXRlRm5zLmdldFllYXIoZGF5LmRhdGUpO1xuICAgIGNvbnN0IG1vbnRoOiBudW1iZXIgPSBkYXRlRm5zLmdldE1vbnRoKGRheS5kYXRlKTtcbiAgICBjb25zdCBkYXRlOiBudW1iZXIgPSBkYXRlRm5zLmdldERhdGUoZGF5LmRhdGUpO1xuICAgIGNvbnN0IG5ld1N0YXJ0OiBEYXRlID0gZGF0ZUZucy5zZXRZZWFyKGRhdGVGbnMuc2V0TW9udGgoZGF0ZUZucy5zZXREYXRlKGV2ZW50LnN0YXJ0LCBkYXRlKSwgbW9udGgpLCB5ZWFyKTtcbiAgICBsZXQgbmV3RW5kOiBEYXRlO1xuICAgIGlmIChldmVudC5lbmQpIHtcbiAgICAgIGNvbnN0IHNlY29uZHNEaWZmOiBudW1iZXIgPSBkYXRlRm5zLmRpZmZlcmVuY2VJblNlY29uZHMobmV3U3RhcnQsIGV2ZW50LnN0YXJ0KTtcbiAgICAgIG5ld0VuZCA9IGRhdGVGbnMuYWRkU2Vjb25kcyhldmVudC5lbmQsIHNlY29uZHNEaWZmKTtcbiAgICB9XG4gICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHsgZXZlbnQsIG5ld1N0YXJ0LCBuZXdFbmQgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hIZWFkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5IZWFkZXJzID0gZ2V0V2Vla1ZpZXdIZWFkZXIoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IGdldE1vbnRoVmlldyh7XG4gICAgICBldmVudHM6IHRoaXMuZXZlbnRzLFxuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgfSk7XG4gICAgaWYgKHRoaXMuZGF5TW9kaWZpZXIpIHtcbiAgICAgIHRoaXMudmlldy5kYXlzLmZvckVhY2goKGRheSkgPT4gdGhpcy5kYXlNb2RpZmllcihkYXkpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVmcmVzaEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KHRoaXMudmlld0RhdGUpO1xuICB9XG59XG4iXX0=