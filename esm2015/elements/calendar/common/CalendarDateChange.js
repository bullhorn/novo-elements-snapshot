import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import * as dateFns from 'date-fns';
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
NovoCalendarDateChangeElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-date-change',
                template: `
    <div class="cal-date-change">
        <i class="bhi-arrow-left" (click)="subtractDate()" ></i>
        <span [ngSwitch]="view">
            <span *ngSwitchCase="'month'">{{ ( viewDate | month:locale ) + ' ' + ( viewDate | year:locale ) }}</span>
            <span *ngSwitchCase="'week'">{{ ( startOfWeek | monthday:locale:'long' ) + ' - ' + ( endOfWeek | endofweekdisplay:startOfWeek:locale:'long' ) }}</span>
            <span *ngSwitchCase="'day'">{{ ( viewDate | weekday:locale:'long' ) + ', ' + ( viewDate | month:locale ) + ' ' + ( viewDate | dayofmonth:locale ) }}</span>
        </span>
        <i class="bhi-arrow-right" (click)="addDate()"></i>
    </div>
  `
            },] }
];
NovoCalendarDateChangeElement.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
NovoCalendarDateChangeElement.propDecorators = {
    view: [{ type: Input }],
    viewDate: [{ type: Input }],
    locale: [{ type: Input }],
    viewDateChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJEYXRlQ2hhbmdlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci9jb21tb24vQ2FsZW5kYXJEYXRlQ2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRixPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQWdCcEMsTUFBTSxPQUFPLDZCQUE2QjtJQXNCeEMsWUFBK0IsTUFBYztRQU43Qzs7V0FFRztRQUVILG1CQUFjLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWTtRQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLE1BQU0sS0FBSyxHQUFRO1lBQ2pCLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTztZQUNwQixJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1NBQ3pCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7WUFuRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO2FBQ0Y7Ozt5Q0F1QmMsTUFBTSxTQUFDLFNBQVM7OzttQkFsQjVCLEtBQUs7dUJBTUwsS0FBSztxQkFHTCxLQUFLOzZCQU1MLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgTE9DQUxFX0lELCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWNhbGVuZGFyLWRhdGUtY2hhbmdlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImNhbC1kYXRlLWNoYW5nZVwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LWxlZnRcIiAoY2xpY2spPVwic3VidHJhY3REYXRlKClcIiA+PC9pPlxyXG4gICAgICAgIDxzcGFuIFtuZ1N3aXRjaF09XCJ2aWV3XCI+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInbW9udGgnXCI+e3sgKCB2aWV3RGF0ZSB8IG1vbnRoOmxvY2FsZSApICsgJyAnICsgKCB2aWV3RGF0ZSB8IHllYXI6bG9jYWxlICkgfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInd2VlaydcIj57eyAoIHN0YXJ0T2ZXZWVrIHwgbW9udGhkYXk6bG9jYWxlOidsb25nJyApICsgJyAtICcgKyAoIGVuZE9mV2VlayB8IGVuZG9md2Vla2Rpc3BsYXk6c3RhcnRPZldlZWs6bG9jYWxlOidsb25nJyApIH19PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ2RheSdcIj57eyAoIHZpZXdEYXRlIHwgd2Vla2RheTpsb2NhbGU6J2xvbmcnICkgKyAnLCAnICsgKCB2aWV3RGF0ZSB8IG1vbnRoOmxvY2FsZSApICsgJyAnICsgKCB2aWV3RGF0ZSB8IGRheW9mbW9udGg6bG9jYWxlICkgfX08L3NwYW4+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LXJpZ2h0XCIgKGNsaWNrKT1cImFkZERhdGUoKVwiPjwvaT5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJEYXRlQ2hhbmdlRWxlbWVudCB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdmlld1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgdmlldzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHZpZXdEYXRlOiBEYXRlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGxvY2FsZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgbG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHN1YnRyYWN0RGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhbmdlRGF0ZSgtMSk7XHJcbiAgfVxyXG5cclxuICBhZGREYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGFuZ2VEYXRlKDEpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlRGF0ZSh1bml0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGFkZEZuOiBhbnkgPSB7XHJcbiAgICAgIGRheTogZGF0ZUZucy5hZGREYXlzLFxyXG4gICAgICB3ZWVrOiBkYXRlRm5zLmFkZFdlZWtzLFxyXG4gICAgICBtb250aDogZGF0ZUZucy5hZGRNb250aHMsXHJcbiAgICB9W3RoaXMudmlld107XHJcblxyXG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZEZuKHRoaXMudmlld0RhdGUsIHVuaXQpKTtcclxuICB9XHJcblxyXG4gIGdldCBzdGFydE9mV2VlaygpIHtcclxuICAgIHJldHVybiBkYXRlRm5zLnN0YXJ0T2ZXZWVrKHRoaXMudmlld0RhdGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGVuZE9mV2VlaygpIHtcclxuICAgIHJldHVybiBkYXRlRm5zLmVuZE9mV2Vlayh0aGlzLnZpZXdEYXRlKTtcclxuICB9XHJcbn1cclxuIl19