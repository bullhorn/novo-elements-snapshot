import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
export class NovoAgendaWeekHeaderElement {
    constructor() {
        this.dayClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
    }
}
NovoAgendaWeekHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-agenda-week-header',
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
  `
            },] }
];
NovoAgendaWeekHeaderElement.propDecorators = {
    days: [{ type: Input }],
    locale: [{ type: Input }],
    customTemplate: [{ type: Input }],
    dayClicked: [{ type: Output }],
    eventDropped: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhV2Vla0hlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9hZ2VuZGEvd2Vlay9BZ2VuZGFXZWVrSGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBbUNwRixNQUFNLE9BQU8sMkJBQTJCO0lBaEN4QztRQTJDRSxlQUFVLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRzlFLGlCQUFZLEdBQTJELElBQUksWUFBWSxFQUE0QyxDQUFDO0lBQ3RJLENBQUM7OztZQS9DQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJUO2FBQ0Y7OzttQkFFRSxLQUFLO3FCQUdMLEtBQUs7NkJBR0wsS0FBSzt5QkFHTCxNQUFNOzJCQUdOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQsIFdlZWtEYXkgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxlbmRhci11dGlscy9DYWxlbmRhclV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZ2VuZGEtd2Vlay1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1kYXktaGVhZGVyc1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtaGVhZGVyXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXNcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtcGFzdF09XCJkYXkuaXNQYXN0XCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXRvZGF5XT1cImRheS5pc1RvZGF5XCJcbiAgICAgICAgICBbY2xhc3MuY2FsLWZ1dHVyZV09XCJkYXkuaXNGdXR1cmVcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtd2Vla2VuZF09XCJkYXkuaXNXZWVrZW5kXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLWRyYWctb3Zlcl09XCJkYXkuZHJhZ092ZXJcIlxuICAgICAgICAgIChjbGljayk9XCJkYXlDbGlja2VkLmVtaXQoeyBkYXRlOiBkYXkuZGF0ZSB9KVwiXG4gICAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgICAgKGRyYWdFbnRlcik9XCJkYXkuZHJhZ092ZXIgPSB0cnVlXCJcbiAgICAgICAgICAoZHJhZ0xlYXZlKT1cImRheS5kcmFnT3ZlciA9IGZhbHNlXCJcbiAgICAgICAgICAoZHJvcCk9XCJkYXkuZHJhZ092ZXIgPSBmYWxzZTsgZXZlbnREcm9wcGVkLmVtaXQoeyBldmVudDogJGV2ZW50LmRyb3BEYXRhLmV2ZW50LCBuZXdTdGFydDogZGF5LmRhdGUgfSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGI+e3sgZGF5LmRhdGUgfCB3ZWVrZGF5OiBsb2NhbGU6J2xvbmcnIH19PC9iXG4gICAgICAgICAgPjxiciAvPlxuICAgICAgICAgIDxzcGFuPnt7IGRheS5kYXRlIHwgbW9udGhkYXk6IGxvY2FsZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGRheXM6IGRheXMsIGxvY2FsZTogbG9jYWxlLCBkYXlDbGlja2VkOiBkYXlDbGlja2VkLCBldmVudERyb3BwZWQ6IGV2ZW50RHJvcHBlZCB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FnZW5kYVdlZWtIZWFkZXJFbGVtZW50IHtcbiAgQElucHV0KClcbiAgZGF5czogV2Vla0RheVtdO1xuXG4gIEBJbnB1dCgpXG4gIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKVxuICBkYXlDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGRhdGU6IERhdGUgfT4oKTtcblxuICBAT3V0cHV0KClcbiAgZXZlbnREcm9wcGVkOiBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudDsgbmV3U3RhcnQ6IERhdGUgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7IG5ld1N0YXJ0OiBEYXRlIH0+KCk7XG59XG4iXX0=