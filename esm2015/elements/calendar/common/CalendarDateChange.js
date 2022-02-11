import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import * as dateFns from 'date-fns';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../pipe/Month.pipe";
import * as i3 from "../pipe/Year.pipe";
import * as i4 from "../pipe/MonthDay.pipe";
import * as i5 from "../pipe/EndOfWeekDisplayPipe.pipe";
import * as i6 from "../pipe/Weekday.pipe";
import * as i7 from "../pipe/DayOfMonth.pipe";
function NovoCalendarDateChangeElement_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "month");
    i0.ɵɵpipe(3, "year");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, ctx_r0.viewDate, ctx_r0.locale) + " " + i0.ɵɵpipeBind2(3, 4, ctx_r0.viewDate, ctx_r0.locale));
} }
function NovoCalendarDateChangeElement_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "monthday");
    i0.ɵɵpipe(3, "endofweekdisplay");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind3(2, 1, ctx_r1.startOfWeek, ctx_r1.locale, "long") + " - " + i0.ɵɵpipeBind4(3, 5, ctx_r1.endOfWeek, ctx_r1.startOfWeek, ctx_r1.locale, "long"));
} }
function NovoCalendarDateChangeElement_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "weekday");
    i0.ɵɵpipe(3, "month");
    i0.ɵɵpipe(4, "dayofmonth");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind3(2, 1, ctx_r2.viewDate, ctx_r2.locale, "long") + ", " + i0.ɵɵpipeBind2(3, 5, ctx_r2.viewDate, ctx_r2.locale) + " " + i0.ɵɵpipeBind2(4, 8, ctx_r2.viewDate, ctx_r2.locale));
} }
export class NovoCalendarDateChangeElement {
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
            day: dateFns.addDays,
            week: dateFns.addWeeks,
            month: dateFns.addMonths,
        }[this.view];
        this.viewDateChange.emit(addFn(this.viewDate, unit));
    }
    get startOfWeek() {
        return dateFns.startOfWeek(this.viewDate);
    }
    get endOfWeek() {
        return dateFns.endOfWeek(this.viewDate);
    }
}
NovoCalendarDateChangeElement.ɵfac = function NovoCalendarDateChangeElement_Factory(t) { return new (t || NovoCalendarDateChangeElement)(i0.ɵɵdirectiveInject(LOCALE_ID)); };
NovoCalendarDateChangeElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCalendarDateChangeElement, selectors: [["novo-calendar-date-change"]], inputs: { view: "view", viewDate: "viewDate", locale: "locale" }, outputs: { viewDateChange: "viewDateChange" }, decls: 7, vars: 4, consts: [[1, "cal-date-change"], [1, "bhi-arrow-left", 3, "click"], [3, "ngSwitch"], [4, "ngSwitchCase"], [1, "bhi-arrow-right", 3, "click"]], template: function NovoCalendarDateChangeElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "i", 1);
        i0.ɵɵlistener("click", function NovoCalendarDateChangeElement_Template_i_click_1_listener() { return ctx.subtractDate(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "span", 2);
        i0.ɵɵtemplate(3, NovoCalendarDateChangeElement_span_3_Template, 4, 7, "span", 3);
        i0.ɵɵtemplate(4, NovoCalendarDateChangeElement_span_4_Template, 4, 10, "span", 3);
        i0.ɵɵtemplate(5, NovoCalendarDateChangeElement_span_5_Template, 5, 11, "span", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "i", 4);
        i0.ɵɵlistener("click", function NovoCalendarDateChangeElement_Template_i_click_6_listener() { return ctx.addDate(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngSwitch", ctx.view);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "month");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "week");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "day");
    } }, directives: [i1.NgSwitch, i1.NgSwitchCase], pipes: [i2.MonthPipe, i3.YearPipe, i4.MonthDayPipe, i5.EndOfWeekDisplayPipe, i6.WeekdayPipe, i7.DayOfMonthPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCalendarDateChangeElement, [{
        type: Component,
        args: [{
                selector: 'novo-calendar-date-change',
                template: `
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
  `,
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [LOCALE_ID]
            }] }]; }, { view: [{
            type: Input
        }], viewDate: [{
            type: Input
        }], locale: [{
            type: Input
        }], viewDateChange: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJEYXRlQ2hhbmdlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NhbGVuZGFyL2NvbW1vbi9DYWxlbmRhckRhdGVDaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDOzs7Ozs7Ozs7O0lBUTVCLDRCQUE4QjtJQUFBLFlBQWtFOzs7SUFBQSxpQkFBTzs7O0lBQXpFLGVBQWtFO0lBQWxFLHVJQUFrRTs7O0lBQ2hHLDRCQUE2QjtJQUFBLFlBRTNCOzs7SUFBQSxpQkFBTzs7O0lBRm9CLGVBRTNCO0lBRjJCLGlMQUUzQjs7O0lBQ0YsNEJBQTRCO0lBQUEsWUFFMUI7Ozs7SUFBQSxpQkFBTzs7O0lBRm1CLGVBRTFCO0lBRjBCLDZNQUUxQjs7QUFNVixNQUFNLE9BQU8sNkJBQTZCO0lBc0J4QyxZQUErQixNQUFjO1FBTjdDOztXQUVHO1FBRUgsbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUd0RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVk7UUFDckIsTUFBTSxLQUFLLEdBQVE7WUFDakIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3BCLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUTtZQUN0QixLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVM7U0FDekIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7OzBHQXJEVSw2QkFBNkIsdUJBc0JwQixTQUFTO2tFQXRCbEIsNkJBQTZCO1FBZnRDLDhCQUNFO1FBQUEsNEJBQXVEO1FBQTdCLHFHQUFTLGtCQUFjLElBQUM7UUFBQyxpQkFBSTtRQUN2RCwrQkFDRTtRQUFBLGdGQUE4QjtRQUM5QixpRkFBNkI7UUFHN0IsaUZBQTRCO1FBRzlCLGlCQUFPO1FBQ1AsNEJBQW1EO1FBQXhCLHFHQUFTLGFBQVMsSUFBQztRQUFDLGlCQUFJO1FBQ3JELGlCQUFNOztRQVZFLGVBQWlCO1FBQWpCLG1DQUFpQjtRQUNmLGVBQXVCO1FBQXZCLHNDQUF1QjtRQUN2QixlQUFzQjtRQUF0QixxQ0FBc0I7UUFHdEIsZUFBcUI7UUFBckIsb0NBQXFCOztrREFRdEIsNkJBQTZCO2NBbEJ6QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO2FBQ0Y7O3NCQXVCYyxNQUFNO3VCQUFDLFNBQVM7d0JBakI3QixJQUFJO2tCQURILEtBQUs7WUFPTixRQUFRO2tCQURQLEtBQUs7WUFJTixNQUFNO2tCQURMLEtBQUs7WUFPTixjQUFjO2tCQURiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgTE9DQUxFX0lELCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhbGVuZGFyLWRhdGUtY2hhbmdlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2FsLWRhdGUtY2hhbmdlXCI+XG4gICAgICA8aSBjbGFzcz1cImJoaS1hcnJvdy1sZWZ0XCIgKGNsaWNrKT1cInN1YnRyYWN0RGF0ZSgpXCI+PC9pPlxuICAgICAgPHNwYW4gW25nU3dpdGNoXT1cInZpZXdcIj5cbiAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidtb250aCdcIj57eyAodmlld0RhdGUgfCBtb250aDogbG9jYWxlKSArICcgJyArICh2aWV3RGF0ZSB8IHllYXI6IGxvY2FsZSkgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInd2VlaydcIj57e1xuICAgICAgICAgIChzdGFydE9mV2VlayB8IG1vbnRoZGF5OiBsb2NhbGU6J2xvbmcnKSArICcgLSAnICsgKGVuZE9mV2VlayB8IGVuZG9md2Vla2Rpc3BsYXk6IHN0YXJ0T2ZXZWVrOmxvY2FsZTonbG9uZycpXG4gICAgICAgIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ2RheSdcIj57e1xuICAgICAgICAgICh2aWV3RGF0ZSB8IHdlZWtkYXk6IGxvY2FsZTonbG9uZycpICsgJywgJyArICh2aWV3RGF0ZSB8IG1vbnRoOiBsb2NhbGUpICsgJyAnICsgKHZpZXdEYXRlIHwgZGF5b2Ztb250aDogbG9jYWxlKVxuICAgICAgICB9fTwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LXJpZ2h0XCIgKGNsaWNrKT1cImFkZERhdGUoKVwiPjwvaT5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFyRGF0ZUNoYW5nZUVsZW1lbnQge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KClcbiAgdmlldzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIHZpZXdEYXRlOiBEYXRlO1xuXG4gIEBJbnB1dCgpXG4gIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZykge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHN1YnRyYWN0RGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZURhdGUoLTEpO1xuICB9XG5cbiAgYWRkRGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZURhdGUoMSk7XG4gIH1cblxuICBjaGFuZ2VEYXRlKHVuaXQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGFkZEZuOiBhbnkgPSB7XG4gICAgICBkYXk6IGRhdGVGbnMuYWRkRGF5cyxcbiAgICAgIHdlZWs6IGRhdGVGbnMuYWRkV2Vla3MsXG4gICAgICBtb250aDogZGF0ZUZucy5hZGRNb250aHMsXG4gICAgfVt0aGlzLnZpZXddO1xuXG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZEZuKHRoaXMudmlld0RhdGUsIHVuaXQpKTtcbiAgfVxuXG4gIGdldCBzdGFydE9mV2VlaygpIHtcbiAgICByZXR1cm4gZGF0ZUZucy5zdGFydE9mV2Vlayh0aGlzLnZpZXdEYXRlKTtcbiAgfVxuXG4gIGdldCBlbmRPZldlZWsoKSB7XG4gICAgcmV0dXJuIGRhdGVGbnMuZW5kT2ZXZWVrKHRoaXMudmlld0RhdGUpO1xuICB9XG59XG4iXX0=