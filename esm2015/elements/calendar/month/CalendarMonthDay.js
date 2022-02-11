import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CalendarEventResponse } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../pipe/DayOfMonth.pipe";
import * as i3 from "../../../pipes/group-by/GroupBy";
function NovoCalendarMonthDayElement_ng_template_0_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r3.day.badgeTotal);
} }
function NovoCalendarMonthDayElement_ng_template_0_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵlistener("click", function NovoCalendarMonthDayElement_ng_template_0_div_6_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r7); const type_r5 = ctx.$implicit; const ctx_r6 = i0.ɵɵnextContext(2); $event.stopPropagation(); return ctx_r6.eventClicked.emit({ event: type_r5 == null ? null : type_r5.value[0] }); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r5 = ctx.$implicit;
    i0.ɵɵstyleProp("background-color", type_r5 == null ? null : type_r5.value[0] == null ? null : type_r5.value[0].color.primary);
    i0.ɵɵproperty("ngClass", type_r5 == null ? null : type_r5.value[0] == null ? null : type_r5.value[0].cssClass);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", type_r5 == null ? null : type_r5.value.length, " ");
} }
function NovoCalendarMonthDayElement_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, NovoCalendarMonthDayElement_ng_template_0_span_1_Template, 2, 1, "span", 3);
    i0.ɵɵelementStart(2, "span", 4);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "dayofmonth");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 5);
    i0.ɵɵtemplate(6, NovoCalendarMonthDayElement_ng_template_0_div_6_Template, 2, 4, "div", 6);
    i0.ɵɵpipe(7, "groupBy");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.day.badgeTotal > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 3, ctx_r1.day.date, ctx_r1.locale));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(7, 6, ctx_r1.day.events, "type"));
} }
function NovoCalendarMonthDayElement_ng_template_2_Template(rf, ctx) { }
const _c0 = function (a0, a1, a2, a3, a4, a5, a6) { return { day: a0, locale: a1, tooltipPosition: a2, eventClicked: a3, accepted: a4, rejected: a5, maybes: a6 }; };
export class NovoCalendarMonthDayElement {
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
NovoCalendarMonthDayElement.ɵfac = function NovoCalendarMonthDayElement_Factory(t) { return new (t || NovoCalendarMonthDayElement)(); };
NovoCalendarMonthDayElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCalendarMonthDayElement, selectors: [["novo-calendar-month-day"]], hostVars: 22, hostBindings: function NovoCalendarMonthDayElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap("calendar-cell calendar-day-cell " + (ctx.day == null ? null : ctx.day.cssClass));
        i0.ɵɵstyleProp("background-color", ctx.day.backgroundColor);
        i0.ɵɵclassProp("calendar-day-accepted", ctx.accepted.length)("calendar-day-rejected", ctx.rejected.length)("calendar-past", ctx.day.isPast)("calendar-today", ctx.day.isToday)("calendar-future", ctx.day.isFuture)("calendar-weekend", ctx.day.isWeekend)("calendar-in-month", ctx.day.inMonth)("calendar-out-month", !ctx.day.inMonth)("calendar-has-events", ctx.day.events.length > 0);
    } }, inputs: { day: "day", locale: "locale", tooltipPosition: "tooltipPosition", customTemplate: "customTemplate" }, outputs: { eventClicked: "eventClicked" }, decls: 3, vars: 10, consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "calendar-day-top"], ["class", "calendar-day-badge", 4, "ngIf"], [1, "calendar-day-number"], [1, "calendar-events"], ["class", "calendar-event", 3, "backgroundColor", "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "calendar-day-badge"], [1, "calendar-event", 3, "ngClass", "click"]], template: function NovoCalendarMonthDayElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoCalendarMonthDayElement_ng_template_0_Template, 8, 9, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(2, NovoCalendarMonthDayElement_ng_template_2_Template, 0, 0, "ng-template", 1);
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(1);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || _r0)("ngTemplateOutletContext", i0.ɵɵpureFunction7(2, _c0, ctx.day, ctx.locale, ctx.tooltipPosition, ctx.eventClicked, ctx.accepted, ctx.rejected, ctx.maybes));
    } }, directives: [i1.NgTemplateOutlet, i1.NgIf, i1.NgForOf, i1.NgClass], pipes: [i2.DayOfMonthPipe, i3.GroupByPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCalendarMonthDayElement, [{
        type: Component,
        args: [{
                selector: 'novo-calendar-month-day',
                template: `
    <ng-template #defaultTemplate>
      <div class="calendar-day-top">
        <span class="calendar-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
        <span class="calendar-day-number">{{ day.date | dayofmonth: locale }}</span>
      </div>
      <div class="calendar-events">
        <div
          class="calendar-event"
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
                    '[class]': '"calendar-cell calendar-day-cell " + day?.cssClass',
                    '[class.calendar-day-accepted]': 'accepted.length',
                    '[class.calendar-day-rejected]': 'rejected.length',
                    '[class.calendar-past]': 'day.isPast',
                    '[class.calendar-today]': 'day.isToday',
                    '[class.calendar-future]': 'day.isFuture',
                    '[class.calendar-weekend]': 'day.isWeekend',
                    '[class.calendar-in-month]': 'day.inMonth',
                    '[class.calendar-out-month]': '!day.inMonth',
                    '[class.calendar-has-events]': 'day.events.length > 0',
                    '[style.backgroundColor]': 'day.backgroundColor',
                },
            }]
    }], null, { day: [{
            type: Input
        }], locale: [{
            type: Input
        }], tooltipPosition: [{
            type: Input
        }], customTemplate: [{
            type: Input
        }], eventClicked: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJNb250aERheS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci9tb250aC9DYWxlbmRhck1vbnRoRGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBaUIscUJBQXFCLEVBQWdCLE1BQU0sNkNBQTZDLENBQUM7Ozs7OztJQU96RywrQkFBNEQ7SUFBQSxZQUFvQjtJQUFBLGlCQUFPOzs7SUFBM0IsZUFBb0I7SUFBcEIsMkNBQW9COzs7O0lBSWhGLDhCQU9FO0lBRkEsa05BQVMsd0JBQXdCLFNBQUUseUVBQXVDLENBQUMsSUFBSSxJQUFDO0lBRWhGLFlBQ0Y7SUFBQSxpQkFBTTs7O0lBTEosNkhBQXVEO0lBQ3ZELDhHQUFvQztJQUdwQyxlQUNGO0lBREUsOEVBQ0Y7OztJQWJGLDhCQUNFO0lBQUEsNEZBQTREO0lBQzVELCtCQUFrQztJQUFBLFlBQW1DOztJQUFBLGlCQUFPO0lBQzlFLGlCQUFNO0lBQ04sOEJBQ0U7SUFBQSwwRkFPRTs7SUFFSixpQkFBTTs7O0lBYjZCLGVBQTBCO0lBQTFCLGdEQUEwQjtJQUN6QixlQUFtQztJQUFuQywwRUFBbUM7SUFLbkUsZUFBaUQ7SUFBakQseUVBQWlEOzs7O0FBcUMzRCxNQUFNLE9BQU8sMkJBQTJCO0lBaER4QztRQThERSxpQkFBWSxHQUEyQyxJQUFJLFlBQVksRUFBNEIsQ0FBQztLQTRCckc7SUExQkMsSUFBSSxRQUFRO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNwQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEtBQUsscUJBQXFCLENBQUMsUUFBUSxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDcEMsT0FBTyxHQUFHLENBQUMsUUFBUSxLQUFLLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BDLE9BQU8sR0FBRyxDQUFDLFFBQVEsS0FBSyxxQkFBcUIsQ0FBQyxLQUFLLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztzR0F6Q1UsMkJBQTJCO2dFQUEzQiwyQkFBMkI7Ozs7O1FBN0NwQyw2SEFDRTtRQWdCRiw0RkFZQTs7O1FBWEUsZUFBc0Q7UUFBdEQsNERBQXNELDJKQUFBOztrREEyQi9DLDJCQUEyQjtjQWhEdkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLG9EQUFvRDtvQkFDL0QsK0JBQStCLEVBQUUsaUJBQWlCO29CQUNsRCwrQkFBK0IsRUFBRSxpQkFBaUI7b0JBQ2xELHVCQUF1QixFQUFFLFlBQVk7b0JBQ3JDLHdCQUF3QixFQUFFLGFBQWE7b0JBQ3ZDLHlCQUF5QixFQUFFLGNBQWM7b0JBQ3pDLDBCQUEwQixFQUFFLGVBQWU7b0JBQzNDLDJCQUEyQixFQUFFLGFBQWE7b0JBQzFDLDRCQUE0QixFQUFFLGNBQWM7b0JBQzVDLDZCQUE2QixFQUFFLHVCQUF1QjtvQkFDdEQseUJBQXlCLEVBQUUscUJBQXFCO2lCQUNqRDthQUNGO2dCQUdDLEdBQUc7a0JBREYsS0FBSztZQUlOLE1BQU07a0JBREwsS0FBSztZQUlOLGVBQWU7a0JBRGQsS0FBSztZQUlOLGNBQWM7a0JBRGIsS0FBSztZQUlOLFlBQVk7a0JBRFgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCwgQ2FsZW5kYXJFdmVudFJlc3BvbnNlLCBNb250aFZpZXdEYXkgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxlbmRhci11dGlscy9DYWxlbmRhclV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYWxlbmRhci1tb250aC1kYXknLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWRheS10b3BcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWxlbmRhci1kYXktYmFkZ2VcIiAqbmdJZj1cImRheS5iYWRnZVRvdGFsID4gMFwiPnt7IGRheS5iYWRnZVRvdGFsIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhbGVuZGFyLWRheS1udW1iZXJcIj57eyBkYXkuZGF0ZSB8IGRheW9mbW9udGg6IGxvY2FsZSB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWV2ZW50c1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWxlbmRhci1ldmVudFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHR5cGUgb2YgZGF5LmV2ZW50cyB8IGdyb3VwQnk6ICd0eXBlJ1wiXG4gICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJ0eXBlPy52YWx1ZVswXT8uY29sb3IucHJpbWFyeVwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwidHlwZT8udmFsdWVbMF0/LmNzc0NsYXNzXCJcbiAgICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudENsaWNrZWQuZW1pdCh7IGV2ZW50OiB0eXBlPy52YWx1ZVswXSB9KVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyB0eXBlPy52YWx1ZS5sZW5ndGggfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGRheTogZGF5LFxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgdG9vbHRpcFBvc2l0aW9uOiB0b29sdGlwUG9zaXRpb24sXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxuICAgICAgICBhY2NlcHRlZDogYWNjZXB0ZWQsXG4gICAgICAgIHJlamVjdGVkOiByZWplY3RlZCxcbiAgICAgICAgbWF5YmVzOiBtYXliZXNcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnXCJjYWxlbmRhci1jZWxsIGNhbGVuZGFyLWRheS1jZWxsIFwiICsgZGF5Py5jc3NDbGFzcycsXG4gICAgJ1tjbGFzcy5jYWxlbmRhci1kYXktYWNjZXB0ZWRdJzogJ2FjY2VwdGVkLmxlbmd0aCcsXG4gICAgJ1tjbGFzcy5jYWxlbmRhci1kYXktcmVqZWN0ZWRdJzogJ3JlamVjdGVkLmxlbmd0aCcsXG4gICAgJ1tjbGFzcy5jYWxlbmRhci1wYXN0XSc6ICdkYXkuaXNQYXN0JyxcbiAgICAnW2NsYXNzLmNhbGVuZGFyLXRvZGF5XSc6ICdkYXkuaXNUb2RheScsXG4gICAgJ1tjbGFzcy5jYWxlbmRhci1mdXR1cmVdJzogJ2RheS5pc0Z1dHVyZScsXG4gICAgJ1tjbGFzcy5jYWxlbmRhci13ZWVrZW5kXSc6ICdkYXkuaXNXZWVrZW5kJyxcbiAgICAnW2NsYXNzLmNhbGVuZGFyLWluLW1vbnRoXSc6ICdkYXkuaW5Nb250aCcsXG4gICAgJ1tjbGFzcy5jYWxlbmRhci1vdXQtbW9udGhdJzogJyFkYXkuaW5Nb250aCcsXG4gICAgJ1tjbGFzcy5jYWxlbmRhci1oYXMtZXZlbnRzXSc6ICdkYXkuZXZlbnRzLmxlbmd0aCA+IDAnLFxuICAgICdbc3R5bGUuYmFja2dyb3VuZENvbG9yXSc6ICdkYXkuYmFja2dyb3VuZENvbG9yJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFyTW9udGhEYXlFbGVtZW50IHtcbiAgQElucHV0KClcbiAgZGF5OiBNb250aFZpZXdEYXk7XG5cbiAgQElucHV0KClcbiAgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcFBvc2l0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4oKTtcblxuICBnZXQgYWNjZXB0ZWQoKTogQXJyYXk8Q2FsZW5kYXJFdmVudD4ge1xuICAgIGlmICghdGhpcy5kYXkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGF5LmV2ZW50cy5maWx0ZXIoKGV2dCkgPT4ge1xuICAgICAgcmV0dXJuIGV2dC5yZXNwb25zZSA9PT0gQ2FsZW5kYXJFdmVudFJlc3BvbnNlLkFjY2VwdGVkO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHJlamVjdGVkKCk6IEFycmF5PENhbGVuZGFyRXZlbnQ+IHtcbiAgICBpZiAoIXRoaXMuZGF5KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRheS5ldmVudHMuZmlsdGVyKChldnQpID0+IHtcbiAgICAgIHJldHVybiBldnQucmVzcG9uc2UgPT09IENhbGVuZGFyRXZlbnRSZXNwb25zZS5SZWplY3RlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBtYXliZXMoKTogQXJyYXk8Q2FsZW5kYXJFdmVudD4ge1xuICAgIGlmICghdGhpcy5kYXkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGF5LmV2ZW50cy5maWx0ZXIoKGV2dCkgPT4ge1xuICAgICAgcmV0dXJuIGV2dC5yZXNwb25zZSA9PT0gQ2FsZW5kYXJFdmVudFJlc3BvbnNlLk1heWJlO1xuICAgIH0pO1xuICB9XG59XG4iXX0=