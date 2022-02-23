import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import * as dateFns from 'date-fns';
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
NovoAgendaDateChangeElement.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NovoAgendaDateChangeElement.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
NovoAgendaDateChangeElement.propDecorators = {
    view: [{ type: Input }],
    viewDate: [{ type: Input }],
    locale: [{ type: Input }],
    viewDateChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhRGF0ZUNoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9hZ2VuZGEvY29tbW9uL0FnZW5kYURhdGVDaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBb0JwQyxNQUFNLE9BQU8sMkJBQTJCO0lBc0J0QyxZQUErQixNQUFjO1FBTjdDOztXQUVHO1FBRUgsbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUd0RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVk7UUFDckIsTUFBTSxLQUFLLEdBQVE7WUFDakIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3BCLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUTtZQUN0QixLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVM7U0FDekIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7OztZQXZFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO2FBQ0Y7Ozt5Q0F1QmMsTUFBTSxTQUFDLFNBQVM7OzttQkFsQjVCLEtBQUs7dUJBTUwsS0FBSztxQkFHTCxLQUFLOzZCQU1MLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgTE9DQUxFX0lELCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFnZW5kYS1kYXRlLWNoYW5nZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNhbC1kYXRlLWNoYW5nZVwiPlxuICAgICAgPGkgY2xhc3M9XCJiaGktYXJyb3ctbGVmdFwiIChjbGljayk9XCJzdWJ0cmFjdERhdGUoKVwiPjwvaT5cbiAgICAgIDxzcGFuIFtuZ1N3aXRjaF09XCJ2aWV3XCI+XG4gICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInbW9udGgnXCI+e3sgKHZpZXdEYXRlIHwgbW9udGg6IGxvY2FsZSkgKyAnICcgKyAodmlld0RhdGUgfCB5ZWFyOiBsb2NhbGUpIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ3dlZWsnXCI+e3tcbiAgICAgICAgICAoc3RhcnRPZldlZWsgfCBtb250aGRheTogbG9jYWxlOidsb25nJykgKyAnIC0gJyArIChlbmRPZldlZWsgfCBlbmRvZndlZWtkaXNwbGF5OiBzdGFydE9mV2Vlazpsb2NhbGU6J2xvbmcnKVxuICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidkYXknXCI+e3tcbiAgICAgICAgICAodmlld0RhdGUgfCB3ZWVrZGF5OiBsb2NhbGU6J2xvbmcnKSArICcsICcgKyAodmlld0RhdGUgfCBtb250aDogbG9jYWxlKSArICcgJyArICh2aWV3RGF0ZSB8IGRheW9mbW9udGg6IGxvY2FsZSlcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aSBjbGFzcz1cImJoaS1hcnJvdy1yaWdodFwiIChjbGljayk9XCJhZGREYXRlKClcIj48L2k+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BZ2VuZGFEYXRlQ2hhbmdlRWxlbWVudCB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKVxuICB2aWV3OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgdmlld0RhdGU6IERhdGU7XG5cbiAgQElucHV0KClcbiAgbG9jYWxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB2aWV3IGRhdGUgaXMgY2hhbmdlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHZpZXdEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIGxvY2FsZTogc3RyaW5nKSB7XG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgc3VidHJhY3REYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlRGF0ZSgtMSk7XG4gIH1cblxuICBhZGREYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlRGF0ZSgxKTtcbiAgfVxuXG4gIGNoYW5nZURhdGUodW5pdDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYWRkRm46IGFueSA9IHtcbiAgICAgIGRheTogZGF0ZUZucy5hZGREYXlzLFxuICAgICAgd2VlazogZGF0ZUZucy5hZGRXZWVrcyxcbiAgICAgIG1vbnRoOiBkYXRlRm5zLmFkZE1vbnRocyxcbiAgICB9W3RoaXMudmlld107XG5cbiAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoYWRkRm4odGhpcy52aWV3RGF0ZSwgdW5pdCkpO1xuICB9XG5cbiAgZ2V0IHN0YXJ0T2ZXZWVrKCkge1xuICAgIHJldHVybiBkYXRlRm5zLnN0YXJ0T2ZXZWVrKHRoaXMudmlld0RhdGUpO1xuICB9XG5cbiAgZ2V0IGVuZE9mV2VlaygpIHtcbiAgICByZXR1cm4gZGF0ZUZucy5lbmRPZldlZWsodGhpcy52aWV3RGF0ZSk7XG4gIH1cbn1cbiJdfQ==