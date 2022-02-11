import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as dateFns from 'date-fns';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../button/Button";
import * as i3 from "../pipe/Month.pipe";
import * as i4 from "../pipe/Weekday.pipe";
function NovoCalendarMonthHeaderElement_ng_template_0_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "weekday");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("calendar-past", day_r4.isPast)("calendar-today", day_r4.isToday)("calendar-future", day_r4.isFuture)("calendar-weekend", day_r4.isWeekend);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 9, day_r4.date, ctx_r3.locale), " ");
} }
function NovoCalendarMonthHeaderElement_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelementStart(1, "div", 3);
    i0.ɵɵelementStart(2, "button", 4);
    i0.ɵɵlistener("click", function NovoCalendarMonthHeaderElement_ng_template_0_Template_button_click_2_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.prevMonth($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 5);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "month");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 6);
    i0.ɵɵlistener("click", function NovoCalendarMonthHeaderElement_ng_template_0_Template_button_click_6_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.nextMonth($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 7);
    i0.ɵɵtemplate(8, NovoCalendarMonthHeaderElement_ng_template_0_div_8_Template, 3, 12, "div", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 2, ctx_r1.viewDate, ctx_r1.locale));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.days);
} }
function NovoCalendarMonthHeaderElement_ng_template_2_Template(rf, ctx) { }
const _c0 = function (a0, a1, a2) { return { days: a0, locale: a1, viewDate: a2 }; };
export class NovoCalendarMonthHeaderElement {
    constructor() {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    prevMonth(event) {
        this.viewDateChange.emit(dateFns.subMonths(this.viewDate, 1));
    }
    nextMonth(event) {
        this.viewDateChange.emit(dateFns.addMonths(this.viewDate, 1));
    }
}
NovoCalendarMonthHeaderElement.ɵfac = function NovoCalendarMonthHeaderElement_Factory(t) { return new (t || NovoCalendarMonthHeaderElement)(); };
NovoCalendarMonthHeaderElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCalendarMonthHeaderElement, selectors: [["novo-calendar-month-header"]], inputs: { viewDate: "viewDate", days: "days", locale: "locale", customTemplate: "customTemplate" }, outputs: { viewDateChange: "viewDateChange" }, decls: 3, vars: 6, consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "calendar-header"], [1, "calendar-header-top"], ["theme", "icon", "icon", "previous", 3, "click"], [1, "calendar-month"], ["theme", "icon", "icon", "next", 3, "click"], [1, "calendar-weekdays"], ["class", "calendar-weekday", 3, "calendar-past", "calendar-today", "calendar-future", "calendar-weekend", 4, "ngFor", "ngForOf"], [1, "calendar-weekday"]], template: function NovoCalendarMonthHeaderElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoCalendarMonthHeaderElement_ng_template_0_Template, 9, 5, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(2, NovoCalendarMonthHeaderElement_ng_template_2_Template, 0, 0, "ng-template", 1);
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(1);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || _r0)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c0, ctx.days, ctx.locale, ctx.viewDate));
    } }, directives: [i1.NgTemplateOutlet, i2.NovoButtonElement, i1.NgForOf], pipes: [i3.MonthPipe, i4.WeekdayPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCalendarMonthHeaderElement, [{
        type: Component,
        args: [{
                selector: 'novo-calendar-month-header',
                template: `
    <ng-template #defaultTemplate>
      <div class="calendar-header">
        <div class="calendar-header-top">
          <button theme="icon" icon="previous" (click)="prevMonth($event)"></button>
          <div class="calendar-month">{{ viewDate | month: locale }}</div>
          <button theme="icon" icon="next" (click)="nextMonth($event)"></button>
        </div>
        <div class="calendar-weekdays">
          <div
            class="calendar-weekday"
            *ngFor="let day of days"
            [class.calendar-past]="day.isPast"
            [class.calendar-today]="day.isToday"
            [class.calendar-future]="day.isFuture"
            [class.calendar-weekend]="day.isWeekend"
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
    }], null, { viewDate: [{
            type: Input
        }], days: [{
            type: Input
        }], locale: [{
            type: Input
        }], customTemplate: [{
            type: Input
        }], viewDateChange: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJNb250aEhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci9tb250aC9DYWxlbmRhck1vbnRoSGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDOzs7Ozs7O0lBYzFCLDhCQVFFO0lBQUEsWUFDRjs7SUFBQSxpQkFBTTs7OztJQU5KLDhDQUFrQyxrQ0FBQSxvQ0FBQSxzQ0FBQTtJQUtsQyxlQUNGO0lBREUsaUZBQ0Y7Ozs7SUFoQkosOEJBQ0U7SUFBQSw4QkFDRTtJQUFBLGlDQUEwRTtJQUFyQyxxTkFBMkI7SUFBQyxpQkFBUztJQUMxRSw4QkFBNEI7SUFBQSxZQUE4Qjs7SUFBQSxpQkFBTTtJQUNoRSxpQ0FBc0U7SUFBckMscU5BQTJCO0lBQUMsaUJBQVM7SUFDeEUsaUJBQU07SUFDTiw4QkFDRTtJQUFBLDhGQVFFO0lBRUosaUJBQU07SUFDUixpQkFBTTs7O0lBZjBCLGVBQThCO0lBQTlCLDBFQUE4QjtJQU14RCxlQUF3QjtJQUF4QixxQ0FBd0I7Ozs7QUFrQnBDLE1BQU0sT0FBTyw4QkFBOEI7SUEvQjNDO1FBNENFOztXQUVHO1FBRUgsbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQVN6RDtJQVBDLFNBQVMsQ0FBQyxLQUFZO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs0R0F6QlUsOEJBQThCO21FQUE5Qiw4QkFBOEI7UUE1QnZDLGdJQUNFO1FBb0JGLCtGQUlBOzs7UUFIRSxlQUFzRDtRQUF0RCw0REFBc0QsMkZBQUE7O2tEQU0vQyw4QkFBOEI7Y0EvQjFDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDthQUNGO2dCQUdDLFFBQVE7a0JBRFAsS0FBSztZQUlOLElBQUk7a0JBREgsS0FBSztZQUlOLE1BQU07a0JBREwsS0FBSztZQUlOLGNBQWM7a0JBRGIsS0FBSztZQU9OLGNBQWM7a0JBRGIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZGF0ZUZucyBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBXZWVrRGF5IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY2FsZW5kYXItdXRpbHMvQ2FsZW5kYXJVdGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXItbW9udGgtaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWhlYWRlci10b3BcIj5cbiAgICAgICAgICA8YnV0dG9uIHRoZW1lPVwiaWNvblwiIGljb249XCJwcmV2aW91c1wiIChjbGljayk9XCJwcmV2TW9udGgoJGV2ZW50KVwiPjwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1tb250aFwiPnt7IHZpZXdEYXRlIHwgbW9udGg6IGxvY2FsZSB9fTwvZGl2PlxuICAgICAgICAgIDxidXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cIm5leHRcIiAoY2xpY2spPVwibmV4dE1vbnRoKCRldmVudClcIj48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci13ZWVrZGF5c1wiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsZW5kYXItd2Vla2RheVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXNcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbGVuZGFyLXBhc3RdPVwiZGF5LmlzUGFzdFwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsZW5kYXItdG9kYXldPVwiZGF5LmlzVG9kYXlcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbGVuZGFyLWZ1dHVyZV09XCJkYXkuaXNGdXR1cmVcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbGVuZGFyLXdlZWtlbmRdPVwiZGF5LmlzV2Vla2VuZFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgZGF5LmRhdGUgfCB3ZWVrZGF5OiBsb2NhbGUgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGRheXM6IGRheXMsIGxvY2FsZTogbG9jYWxlLCB2aWV3RGF0ZTogdmlld0RhdGUgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DYWxlbmRhck1vbnRoSGVhZGVyRWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIHZpZXdEYXRlOiBEYXRlO1xuXG4gIEBJbnB1dCgpXG4gIGRheXM6IFdlZWtEYXlbXTtcblxuICBASW5wdXQoKVxuICBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcmV2TW9udGgoZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGRhdGVGbnMuc3ViTW9udGhzKHRoaXMudmlld0RhdGUsIDEpKTtcbiAgfVxuXG4gIG5leHRNb250aChldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoZGF0ZUZucy5hZGRNb250aHModGhpcy52aWV3RGF0ZSwgMSkpO1xuICB9XG59XG4iXX0=