import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { DateUtil } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../pipe/Month.pipe";
import * as i3 from "../pipe/Year.pipe";
import * as i4 from "../pipe/MonthDay.pipe";
import * as i5 from "../pipe/EndOfWeekDisplayPipe.pipe";
import * as i6 from "../pipe/Weekday.pipe";
import * as i7 from "../pipe/DayOfMonth.pipe";
export class NovoAgendaDateChangeElement {
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
  `, isInline: true, directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "month": i2.MonthPipe, "year": i3.YearPipe, "monthday": i4.MonthDayPipe, "endofweekdisplay": i5.EndOfWeekDisplayPipe, "weekday": i6.WeekdayPipe, "dayofmonth": i7.DayOfMonthPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaDateChangeElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-date-change',
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
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; }, propDecorators: { view: [{
                type: Input
            }], viewDate: [{
                type: Input
            }], locale: [{
                type: Input
            }], viewDateChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhRGF0ZUNoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2FnZW5kYS9jb21tb24vQWdlbmRhRGF0ZUNoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7QUFvQi9DLE1BQU0sT0FBTywyQkFBMkI7SUFzQnRDLFlBQStCLE1BQWM7UUFON0M7O1dBRUc7UUFFSCxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR3RELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDVixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBWTtRQUNyQixNQUFNLEtBQUssR0FBUTtZQUNqQixHQUFHLEVBQUUsUUFBUSxDQUFDLE9BQU87WUFDckIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxRQUFRLENBQUMsU0FBUztTQUMxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7eUhBckRVLDJCQUEyQixrQkFzQmxCLFNBQVM7NkdBdEJsQiwyQkFBMkIsZ0xBaEI1Qjs7Ozs7Ozs7Ozs7Ozs7R0FjVDs0RkFFVSwyQkFBMkI7a0JBbEJ2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDtpQkFDRjs7MEJBdUJjLE1BQU07MkJBQUMsU0FBUzs0Q0FqQjdCLElBQUk7c0JBREgsS0FBSztnQkFPTixRQUFRO3NCQURQLEtBQUs7Z0JBSU4sTUFBTTtzQkFETCxLQUFLO2dCQU9OLGNBQWM7c0JBRGIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBMT0NBTEVfSUQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVV0aWwgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZ2VuZGEtZGF0ZS1jaGFuZ2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF0ZS1jaGFuZ2VcIj5cbiAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LWxlZnRcIiAoY2xpY2spPVwic3VidHJhY3REYXRlKClcIj48L2k+XG4gICAgICA8c3BhbiBbbmdTd2l0Y2hdPVwidmlld1wiPlxuICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ21vbnRoJ1wiPnt7ICh2aWV3RGF0ZSB8IG1vbnRoOiBsb2NhbGUpICsgJyAnICsgKHZpZXdEYXRlIHwgeWVhcjogbG9jYWxlKSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIid3ZWVrJ1wiPnt7XG4gICAgICAgICAgKHN0YXJ0T2ZXZWVrIHwgbW9udGhkYXk6IGxvY2FsZTonbG9uZycpICsgJyAtICcgKyAoZW5kT2ZXZWVrIHwgZW5kb2Z3ZWVrZGlzcGxheTogc3RhcnRPZldlZWs6bG9jYWxlOidsb25nJylcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInZGF5J1wiPnt7XG4gICAgICAgICAgKHZpZXdEYXRlIHwgd2Vla2RheTogbG9jYWxlOidsb25nJykgKyAnLCAnICsgKHZpZXdEYXRlIHwgbW9udGg6IGxvY2FsZSkgKyAnICcgKyAodmlld0RhdGUgfCBkYXlvZm1vbnRoOiBsb2NhbGUpXG4gICAgICAgIH19PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPGkgY2xhc3M9XCJiaGktYXJyb3ctcmlnaHRcIiAoY2xpY2spPVwiYWRkRGF0ZSgpXCI+PC9pPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWdlbmRhRGF0ZUNoYW5nZUVsZW1lbnQge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KClcbiAgdmlldzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIHZpZXdEYXRlOiBEYXRlO1xuXG4gIEBJbnB1dCgpXG4gIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZykge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHN1YnRyYWN0RGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZURhdGUoLTEpO1xuICB9XG5cbiAgYWRkRGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZURhdGUoMSk7XG4gIH1cblxuICBjaGFuZ2VEYXRlKHVuaXQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGFkZEZuOiBhbnkgPSB7XG4gICAgICBkYXk6IERhdGVVdGlsLmFkZERheXMsXG4gICAgICB3ZWVrOiBEYXRlVXRpbC5hZGRXZWVrcyxcbiAgICAgIG1vbnRoOiBEYXRlVXRpbC5hZGRNb250aHMsXG4gICAgfVt0aGlzLnZpZXddO1xuXG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZEZuKHRoaXMudmlld0RhdGUsIHVuaXQpKTtcbiAgfVxuXG4gIGdldCBzdGFydE9mV2VlaygpIHtcbiAgICByZXR1cm4gRGF0ZVV0aWwuc3RhcnRPZldlZWsodGhpcy52aWV3RGF0ZSk7XG4gIH1cblxuICBnZXQgZW5kT2ZXZWVrKCkge1xuICAgIHJldHVybiBEYXRlVXRpbC5lbmRPZldlZWsodGhpcy52aWV3RGF0ZSk7XG4gIH1cbn1cbiJdfQ==