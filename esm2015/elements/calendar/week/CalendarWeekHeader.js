import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../pipe/Weekday.pipe";
import * as i3 from "../pipe/MonthDay.pipe";
function NovoCalendarWeekHeaderElement_ng_template_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵlistener("click", function NovoCalendarWeekHeaderElement_ng_template_0_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r6); const day_r4 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.dayClicked.emit({ date: day_r4.date }); })("dragEnter", function NovoCalendarWeekHeaderElement_ng_template_0_div_1_Template_div_dragEnter_0_listener() { const day_r4 = ctx.$implicit; return day_r4.dragOver = true; })("dragLeave", function NovoCalendarWeekHeaderElement_ng_template_0_div_1_Template_div_dragLeave_0_listener() { const day_r4 = ctx.$implicit; return day_r4.dragOver = false; })("drop", function NovoCalendarWeekHeaderElement_ng_template_0_div_1_Template_div_drop_0_listener($event) { i0.ɵɵrestoreView(_r6); const day_r4 = ctx.$implicit; const ctx_r9 = i0.ɵɵnextContext(2); day_r4.dragOver = false; return ctx_r9.eventDropped.emit({ event: $event.dropData.event, newStart: day_r4.date }); });
    i0.ɵɵelementStart(1, "b");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "weekday");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "br");
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "monthday");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("cal-past", day_r4.isPast)("cal-today", day_r4.isToday)("cal-future", day_r4.isFuture)("cal-weekend", day_r4.isWeekend)("cal-drag-over", day_r4.dragOver);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind3(3, 12, day_r4.date, ctx_r3.locale, "long"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 16, day_r4.date, ctx_r3.locale));
} }
function NovoCalendarWeekHeaderElement_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, NovoCalendarWeekHeaderElement_ng_template_0_div_1_Template, 8, 19, "div", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.days);
} }
function NovoCalendarWeekHeaderElement_ng_template_2_Template(rf, ctx) { }
const _c0 = function (a0, a1, a2, a3) { return { days: a0, locale: a1, dayClicked: a2, eventDropped: a3 }; };
export class NovoCalendarWeekHeaderElement {
    constructor() {
        this.dayClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
    }
}
NovoCalendarWeekHeaderElement.ɵfac = function NovoCalendarWeekHeaderElement_Factory(t) { return new (t || NovoCalendarWeekHeaderElement)(); };
NovoCalendarWeekHeaderElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCalendarWeekHeaderElement, selectors: [["novo-calendar-week-header"]], inputs: { days: "days", locale: "locale", customTemplate: "customTemplate" }, outputs: { dayClicked: "dayClicked", eventDropped: "eventDropped" }, decls: 3, vars: 7, consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "cal-day-headers"], ["class", "cal-header", "mwlDroppable", "", 3, "cal-past", "cal-today", "cal-future", "cal-weekend", "cal-drag-over", "click", "dragEnter", "dragLeave", "drop", 4, "ngFor", "ngForOf"], ["mwlDroppable", "", 1, "cal-header", 3, "click", "dragEnter", "dragLeave", "drop"]], template: function NovoCalendarWeekHeaderElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoCalendarWeekHeaderElement_ng_template_0_Template, 2, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(2, NovoCalendarWeekHeaderElement_ng_template_2_Template, 0, 0, "ng-template", 1);
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(1);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || _r0)("ngTemplateOutletContext", i0.ɵɵpureFunction4(2, _c0, ctx.days, ctx.locale, ctx.dayClicked, ctx.eventDropped));
    } }, directives: [i1.NgTemplateOutlet, i1.NgForOf], pipes: [i2.WeekdayPipe, i3.MonthDayPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCalendarWeekHeaderElement, [{
        type: Component,
        args: [{
                selector: 'novo-calendar-week-header',
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
    }], null, { days: [{
            type: Input
        }], locale: [{
            type: Input
        }], customTemplate: [{
            type: Input
        }], dayClicked: [{
            type: Output
        }], eventDropped: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJXZWVrSGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NhbGVuZGFyL3dlZWsvQ2FsZW5kYXJXZWVrSGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0lBUTVFLDhCQWNFO0lBTkEsb05BQVMsNkNBQW1DLElBQUMsc0tBRWpCLElBQUksSUFGYSxzS0FHakIsS0FBSyxJQUhZLHNOQUl0QixLQUFLLFNBQUUsaUZBQXVFLElBSnhEO0lBTTdDLHlCQUFHO0lBQUEsWUFBdUM7O0lBQUEsaUJBQ3pDO0lBQUEscUJBQ0Q7SUFBQSw0QkFBTTtJQUFBLFlBQWlDOztJQUFBLGlCQUFPO0lBQ2hELGlCQUFNOzs7O0lBZEoseUNBQTZCLDZCQUFBLCtCQUFBLGlDQUFBLGtDQUFBO0lBVzFCLGVBQXVDO0lBQXZDLCtFQUF1QztJQUVwQyxlQUFpQztJQUFqQyx1RUFBaUM7OztJQWpCM0MsOEJBQ0U7SUFBQSw2RkFjRTtJQUlKLGlCQUFNOzs7SUFoQkYsZUFBd0I7SUFBeEIscUNBQXdCOzs7O0FBeUJsQyxNQUFNLE9BQU8sNkJBQTZCO0lBaEMxQztRQTJDRSxlQUFVLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRzlFLGlCQUFZLEdBQTJELElBQUksWUFBWSxFQUE0QyxDQUFDO0tBQ3JJOzswR0FmWSw2QkFBNkI7a0VBQTdCLDZCQUE2QjtRQTdCdEMsK0hBQ0U7UUFxQkYsOEZBSUE7OztRQUhFLGVBQXNEO1FBQXRELDREQUFzRCwrR0FBQTs7a0RBTS9DLDZCQUE2QjtjQWhDekMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCVDthQUNGO2dCQUdDLElBQUk7a0JBREgsS0FBSztZQUlOLE1BQU07a0JBREwsS0FBSztZQUlOLGNBQWM7a0JBRGIsS0FBSztZQUlOLFVBQVU7a0JBRFQsTUFBTTtZQUlQLFlBQVk7a0JBRFgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCwgV2Vla0RheSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NhbGVuZGFyLXV0aWxzL0NhbGVuZGFyVXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhbGVuZGFyLXdlZWstaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5LWhlYWRlcnNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWhlYWRlclwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXBhc3RdPVwiZGF5LmlzUGFzdFwiXG4gICAgICAgICAgW2NsYXNzLmNhbC10b2RheV09XCJkYXkuaXNUb2RheVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1mdXR1cmVdPVwiZGF5LmlzRnV0dXJlXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXdlZWtlbmRdPVwiZGF5LmlzV2Vla2VuZFwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1kcmFnLW92ZXJdPVwiZGF5LmRyYWdPdmVyXCJcbiAgICAgICAgICAoY2xpY2spPVwiZGF5Q2xpY2tlZC5lbWl0KHsgZGF0ZTogZGF5LmRhdGUgfSlcIlxuICAgICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAgIChkcmFnRW50ZXIpPVwiZGF5LmRyYWdPdmVyID0gdHJ1ZVwiXG4gICAgICAgICAgKGRyYWdMZWF2ZSk9XCJkYXkuZHJhZ092ZXIgPSBmYWxzZVwiXG4gICAgICAgICAgKGRyb3ApPVwiZGF5LmRyYWdPdmVyID0gZmFsc2U7IGV2ZW50RHJvcHBlZC5lbWl0KHsgZXZlbnQ6ICRldmVudC5kcm9wRGF0YS5ldmVudCwgbmV3U3RhcnQ6IGRheS5kYXRlIH0pXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxiPnt7IGRheS5kYXRlIHwgd2Vla2RheTogbG9jYWxlOidsb25nJyB9fTwvYlxuICAgICAgICAgID48YnIgLz5cbiAgICAgICAgICA8c3Bhbj57eyBkYXkuZGF0ZSB8IG1vbnRoZGF5OiBsb2NhbGUgfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBkYXlzOiBkYXlzLCBsb2NhbGU6IGxvY2FsZSwgZGF5Q2xpY2tlZDogZGF5Q2xpY2tlZCwgZXZlbnREcm9wcGVkOiBldmVudERyb3BwZWQgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DYWxlbmRhcldlZWtIZWFkZXJFbGVtZW50IHtcbiAgQElucHV0KClcbiAgZGF5czogV2Vla0RheVtdO1xuXG4gIEBJbnB1dCgpXG4gIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKVxuICBkYXlDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGRhdGU6IERhdGUgfT4oKTtcblxuICBAT3V0cHV0KClcbiAgZXZlbnREcm9wcGVkOiBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudDsgbmV3U3RhcnQ6IERhdGUgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7IG5ld1N0YXJ0OiBEYXRlIH0+KCk7XG59XG4iXX0=