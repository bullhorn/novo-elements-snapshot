import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import * as dateFns from 'date-fns';
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
NovoCalendarMonthHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-month-header',
                template: `
    <ng-template #defaultTemplate>
      <div class="calendar-header">
        <div class="calendar-header-top">
          <button theme="icon" icon="previous" (click)="prevMonth($event)"></button>
          <div class="calendar-month">{{ viewDate | month:locale }}</div>
          <button theme="icon" icon="next" (click)="nextMonth($event)"></button>
        </div>
        <div class="calendar-weekdays">
          <div
            class="calendar-weekday"
            *ngFor="let day of days"
            [class.calendar-past]="day.isPast"
            [class.calendar-today]="day.isToday"
            [class.calendar-future]="day.isFuture"
            [class.calendar-weekend]="day.isWeekend">
            {{ day.date | weekday:locale }}
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{days: days, locale: locale, viewDate: viewDate}">
    </ng-template>
  `
            },] }
];
NovoCalendarMonthHeaderElement.propDecorators = {
    viewDate: [{ type: Input }],
    days: [{ type: Input }],
    locale: [{ type: Input }],
    customTemplate: [{ type: Input }],
    viewDateChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJNb250aEhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2FsZW5kYXIvbW9udGgvQ2FsZW5kYXJNb250aEhlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRixPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQStCcEMsTUFBTSxPQUFPLDhCQUE4QjtJQTdCM0M7UUEwQ0U7O1dBRUc7UUFFSCxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBUzFELENBQUM7SUFQQyxTQUFTLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVk7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7O1lBdERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5QlQ7YUFDRjs7O3VCQUVFLEtBQUs7bUJBR0wsS0FBSztxQkFHTCxLQUFLOzZCQUdMLEtBQUs7NkJBTUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBXZWVrRGF5IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY2FsZW5kYXItdXRpbHMvQ2FsZW5kYXJVdGlscyc7XHJcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWNhbGVuZGFyLW1vbnRoLWhlYWRlcicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItaGVhZGVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWhlYWRlci10b3BcIj5cclxuICAgICAgICAgIDxidXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cInByZXZpb3VzXCIgKGNsaWNrKT1cInByZXZNb250aCgkZXZlbnQpXCI+PC9idXR0b24+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItbW9udGhcIj57eyB2aWV3RGF0ZSB8IG1vbnRoOmxvY2FsZSB9fTwvZGl2PlxyXG4gICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwibmV4dFwiIChjbGljayk9XCJuZXh0TW9udGgoJGV2ZW50KVwiPjwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci13ZWVrZGF5c1wiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzcz1cImNhbGVuZGFyLXdlZWtkYXlcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXNcIlxyXG4gICAgICAgICAgICBbY2xhc3MuY2FsZW5kYXItcGFzdF09XCJkYXkuaXNQYXN0XCJcclxuICAgICAgICAgICAgW2NsYXNzLmNhbGVuZGFyLXRvZGF5XT1cImRheS5pc1RvZGF5XCJcclxuICAgICAgICAgICAgW2NsYXNzLmNhbGVuZGFyLWZ1dHVyZV09XCJkYXkuaXNGdXR1cmVcIlxyXG4gICAgICAgICAgICBbY2xhc3MuY2FsZW5kYXItd2Vla2VuZF09XCJkYXkuaXNXZWVrZW5kXCI+XHJcbiAgICAgICAgICAgIHt7IGRheS5kYXRlIHwgd2Vla2RheTpsb2NhbGUgfX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGVcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkYXlzOiBkYXlzLCBsb2NhbGU6IGxvY2FsZSwgdmlld0RhdGU6IHZpZXdEYXRlfVwiPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFyTW9udGhIZWFkZXJFbGVtZW50IHtcclxuICBASW5wdXQoKVxyXG4gIHZpZXdEYXRlOiBEYXRlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRheXM6IFdlZWtEYXlbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBsb2NhbGU6IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHJldk1vbnRoKGV2ZW50OiBFdmVudCkge1xyXG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGRhdGVGbnMuc3ViTW9udGhzKHRoaXMudmlld0RhdGUsIDEpKTtcclxuICB9XHJcblxyXG4gIG5leHRNb250aChldmVudDogRXZlbnQpIHtcclxuICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChkYXRlRm5zLmFkZE1vbnRocyh0aGlzLnZpZXdEYXRlLCAxKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==