import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import * as dateFns from 'date-fns';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../pipe/month.pipe";
import * as i3 from "../pipe/year.pipe";
import * as i4 from "../pipe/month-day.pipe";
import * as i5 from "../pipe/end-of-week-display-pipe.pipe";
import * as i6 from "../pipe/weekday.pipe";
import * as i7 from "../pipe/day-of-month.pipe";
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
  `, isInline: true, styles: [":host{display:inline-block}:host .cal-date-change{border-radius:3px;border:1px solid #e1e1e1;background-color:var(--color-background);position:relative;padding:10px 15px;text-align:center}:host .cal-date-change>span{padding:5px;color:var(--color-text)}:host .cal-date-change>i{cursor:pointer;padding:2px;font-size:.9em}\n"], directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "month": i2.MonthPipe, "year": i3.YearPipe, "monthday": i4.MonthDayPipe, "endofweekdisplay": i5.EndOfWeekDisplayPipe, "weekday": i6.WeekdayPipe, "dayofmonth": i7.DayOfMonthPipe } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmRhLWRhdGUtY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9hZ2VuZGEvY29tbW9uL2FnZW5kYS1kYXRlLWNoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7Ozs7Ozs7OztBQXFCcEMsTUFBTSxPQUFPLDJCQUEyQjtJQXNCdEMsWUFBK0IsTUFBYztRQU43Qzs7V0FFRztRQUVILG1CQUFjLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWTtRQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLE1BQU0sS0FBSyxHQUFRO1lBQ2pCLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTztZQUNwQixJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1NBQ3pCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDOzt5SEFyRFUsMkJBQTJCLGtCQXNCbEIsU0FBUzs2R0F0QmxCLDJCQUEyQixnTEFoQjVCOzs7Ozs7Ozs7Ozs7OztHQWNUOzRGQUVVLDJCQUEyQjtrQkFuQnZDLFNBQVM7K0JBQ0UseUJBQXlCLFlBRXpCOzs7Ozs7Ozs7Ozs7OztHQWNUOzswQkF3QlksTUFBTTsyQkFBQyxTQUFTOzRDQWpCN0IsSUFBSTtzQkFESCxLQUFLO2dCQU9OLFFBQVE7c0JBRFAsS0FBSztnQkFJTixNQUFNO3NCQURMLEtBQUs7Z0JBT04sY0FBYztzQkFEYixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIExPQ0FMRV9JRCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZ2VuZGEtZGF0ZS1jaGFuZ2UnLFxuICBzdHlsZVVybHM6IFsnLi9hZ2VuZGEtZGF0ZS1jaGFuZ2Uuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF0ZS1jaGFuZ2VcIj5cbiAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LWxlZnRcIiAoY2xpY2spPVwic3VidHJhY3REYXRlKClcIj48L2k+XG4gICAgICA8c3BhbiBbbmdTd2l0Y2hdPVwidmlld1wiPlxuICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ21vbnRoJ1wiPnt7ICh2aWV3RGF0ZSB8IG1vbnRoOiBsb2NhbGUpICsgJyAnICsgKHZpZXdEYXRlIHwgeWVhcjogbG9jYWxlKSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIid3ZWVrJ1wiPnt7XG4gICAgICAgICAgKHN0YXJ0T2ZXZWVrIHwgbW9udGhkYXk6IGxvY2FsZTonbG9uZycpICsgJyAtICcgKyAoZW5kT2ZXZWVrIHwgZW5kb2Z3ZWVrZGlzcGxheTogc3RhcnRPZldlZWs6bG9jYWxlOidsb25nJylcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInZGF5J1wiPnt7XG4gICAgICAgICAgKHZpZXdEYXRlIHwgd2Vla2RheTogbG9jYWxlOidsb25nJykgKyAnLCAnICsgKHZpZXdEYXRlIHwgbW9udGg6IGxvY2FsZSkgKyAnICcgKyAodmlld0RhdGUgfCBkYXlvZm1vbnRoOiBsb2NhbGUpXG4gICAgICAgIH19PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPGkgY2xhc3M9XCJiaGktYXJyb3ctcmlnaHRcIiAoY2xpY2spPVwiYWRkRGF0ZSgpXCI+PC9pPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWdlbmRhRGF0ZUNoYW5nZUVsZW1lbnQge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KClcbiAgdmlldzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIHZpZXdEYXRlOiBEYXRlO1xuXG4gIEBJbnB1dCgpXG4gIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZykge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHN1YnRyYWN0RGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZURhdGUoLTEpO1xuICB9XG5cbiAgYWRkRGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZURhdGUoMSk7XG4gIH1cblxuICBjaGFuZ2VEYXRlKHVuaXQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGFkZEZuOiBhbnkgPSB7XG4gICAgICBkYXk6IGRhdGVGbnMuYWRkRGF5cyxcbiAgICAgIHdlZWs6IGRhdGVGbnMuYWRkV2Vla3MsXG4gICAgICBtb250aDogZGF0ZUZucy5hZGRNb250aHMsXG4gICAgfVt0aGlzLnZpZXddO1xuXG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZEZuKHRoaXMudmlld0RhdGUsIHVuaXQpKTtcbiAgfVxuXG4gIGdldCBzdGFydE9mV2VlaygpIHtcbiAgICByZXR1cm4gZGF0ZUZucy5zdGFydE9mV2Vlayh0aGlzLnZpZXdEYXRlKTtcbiAgfVxuXG4gIGdldCBlbmRPZldlZWsoKSB7XG4gICAgcmV0dXJuIGRhdGVGbnMuZW5kT2ZXZWVrKHRoaXMudmlld0RhdGUpO1xuICB9XG59XG4iXX0=