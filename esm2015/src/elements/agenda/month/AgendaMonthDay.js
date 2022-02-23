import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CalendarEventResponse } from '../../../utils/calendar-utils/CalendarUtils';
export class NovoAgendaMonthDayElement {
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
NovoAgendaMonthDayElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-agenda-month-day',
                template: `
    <ng-template #defaultTemplate>
      <div class="agenda-day-top">
        <span class="agenda-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
        <span class="agenda-day-number">{{ day.date | dayofmonth: locale }}</span>
      </div>
      <div class="agenda-events">
        <div
          class="agenda-event"
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
                    '[class]': '"agenda-cell agenda-day-cell " + day?.cssClass',
                    '[class.agenda-day-accepted]': 'accepted.length',
                    '[class.agenda-day-rejected]': 'rejected.length',
                    '[class.agenda-past]': 'day.isPast',
                    '[class.agenda-today]': 'day.isToday',
                    '[class.agenda-future]': 'day.isFuture',
                    '[class.agenda-weekend]': 'day.isWeekend',
                    '[class.agenda-in-month]': 'day.inMonth',
                    '[class.agenda-out-month]': '!day.inMonth',
                    '[class.agenda-has-events]': 'day.events.length > 0',
                    '[style.backgroundColor]': 'day.backgroundColor',
                }
            },] }
];
NovoAgendaMonthDayElement.propDecorators = {
    day: [{ type: Input }],
    locale: [{ type: Input }],
    tooltipPosition: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhTW9udGhEYXkuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvYWdlbmRhL21vbnRoL0FnZW5kYU1vbnRoRGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBaUIscUJBQXFCLEVBQWdCLE1BQU0sNkNBQTZDLENBQUM7QUFrRGpILE1BQU0sT0FBTyx5QkFBeUI7SUFoRHRDO1FBOERFLGlCQUFZLEdBQTJDLElBQUksWUFBWSxFQUE0QixDQUFDO0lBNEJ0RyxDQUFDO0lBMUJDLElBQUksUUFBUTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDcEMsT0FBTyxHQUFHLENBQUMsUUFBUSxLQUFLLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BDLE9BQU8sR0FBRyxDQUFDLFFBQVEsS0FBSyxxQkFBcUIsQ0FBQyxRQUFRLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNwQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEtBQUsscUJBQXFCLENBQUMsS0FBSyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBekZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQlQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLFNBQVMsRUFBRSxnREFBZ0Q7b0JBQzNELDZCQUE2QixFQUFFLGlCQUFpQjtvQkFDaEQsNkJBQTZCLEVBQUUsaUJBQWlCO29CQUNoRCxxQkFBcUIsRUFBRSxZQUFZO29CQUNuQyxzQkFBc0IsRUFBRSxhQUFhO29CQUNyQyx1QkFBdUIsRUFBRSxjQUFjO29CQUN2Qyx3QkFBd0IsRUFBRSxlQUFlO29CQUN6Qyx5QkFBeUIsRUFBRSxhQUFhO29CQUN4QywwQkFBMEIsRUFBRSxjQUFjO29CQUMxQywyQkFBMkIsRUFBRSx1QkFBdUI7b0JBQ3BELHlCQUF5QixFQUFFLHFCQUFxQjtpQkFDakQ7YUFDRjs7O2tCQUVFLEtBQUs7cUJBR0wsS0FBSzs4QkFHTCxLQUFLOzZCQUdMLEtBQUs7MkJBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCwgQ2FsZW5kYXJFdmVudFJlc3BvbnNlLCBNb250aFZpZXdEYXkgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxlbmRhci11dGlscy9DYWxlbmRhclV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZ2VuZGEtbW9udGgtZGF5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJhZ2VuZGEtZGF5LXRvcFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFnZW5kYS1kYXktYmFkZ2VcIiAqbmdJZj1cImRheS5iYWRnZVRvdGFsID4gMFwiPnt7IGRheS5iYWRnZVRvdGFsIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFnZW5kYS1kYXktbnVtYmVyXCI+e3sgZGF5LmRhdGUgfCBkYXlvZm1vbnRoOiBsb2NhbGUgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhZ2VuZGEtZXZlbnRzXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImFnZW5kYS1ldmVudFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHR5cGUgb2YgZGF5LmV2ZW50cyB8IGdyb3VwQnk6ICd0eXBlJ1wiXG4gICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJ0eXBlPy52YWx1ZVswXT8uY29sb3IucHJpbWFyeVwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwidHlwZT8udmFsdWVbMF0/LmNzc0NsYXNzXCJcbiAgICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudENsaWNrZWQuZW1pdCh7IGV2ZW50OiB0eXBlPy52YWx1ZVswXSB9KVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyB0eXBlPy52YWx1ZS5sZW5ndGggfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGRheTogZGF5LFxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgdG9vbHRpcFBvc2l0aW9uOiB0b29sdGlwUG9zaXRpb24sXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxuICAgICAgICBhY2NlcHRlZDogYWNjZXB0ZWQsXG4gICAgICAgIHJlamVjdGVkOiByZWplY3RlZCxcbiAgICAgICAgbWF5YmVzOiBtYXliZXNcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnXCJhZ2VuZGEtY2VsbCBhZ2VuZGEtZGF5LWNlbGwgXCIgKyBkYXk/LmNzc0NsYXNzJyxcbiAgICAnW2NsYXNzLmFnZW5kYS1kYXktYWNjZXB0ZWRdJzogJ2FjY2VwdGVkLmxlbmd0aCcsXG4gICAgJ1tjbGFzcy5hZ2VuZGEtZGF5LXJlamVjdGVkXSc6ICdyZWplY3RlZC5sZW5ndGgnLFxuICAgICdbY2xhc3MuYWdlbmRhLXBhc3RdJzogJ2RheS5pc1Bhc3QnLFxuICAgICdbY2xhc3MuYWdlbmRhLXRvZGF5XSc6ICdkYXkuaXNUb2RheScsXG4gICAgJ1tjbGFzcy5hZ2VuZGEtZnV0dXJlXSc6ICdkYXkuaXNGdXR1cmUnLFxuICAgICdbY2xhc3MuYWdlbmRhLXdlZWtlbmRdJzogJ2RheS5pc1dlZWtlbmQnLFxuICAgICdbY2xhc3MuYWdlbmRhLWluLW1vbnRoXSc6ICdkYXkuaW5Nb250aCcsXG4gICAgJ1tjbGFzcy5hZ2VuZGEtb3V0LW1vbnRoXSc6ICchZGF5LmluTW9udGgnLFxuICAgICdbY2xhc3MuYWdlbmRhLWhhcy1ldmVudHNdJzogJ2RheS5ldmVudHMubGVuZ3RoID4gMCcsXG4gICAgJ1tzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdJzogJ2RheS5iYWNrZ3JvdW5kQ29sb3InLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWdlbmRhTW9udGhEYXlFbGVtZW50IHtcbiAgQElucHV0KClcbiAgZGF5OiBNb250aFZpZXdEYXk7XG5cbiAgQElucHV0KClcbiAgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcFBvc2l0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4oKTtcblxuICBnZXQgYWNjZXB0ZWQoKTogQXJyYXk8Q2FsZW5kYXJFdmVudD4ge1xuICAgIGlmICghdGhpcy5kYXkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGF5LmV2ZW50cy5maWx0ZXIoKGV2dCkgPT4ge1xuICAgICAgcmV0dXJuIGV2dC5yZXNwb25zZSA9PT0gQ2FsZW5kYXJFdmVudFJlc3BvbnNlLkFjY2VwdGVkO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHJlamVjdGVkKCk6IEFycmF5PENhbGVuZGFyRXZlbnQ+IHtcbiAgICBpZiAoIXRoaXMuZGF5KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRheS5ldmVudHMuZmlsdGVyKChldnQpID0+IHtcbiAgICAgIHJldHVybiBldnQucmVzcG9uc2UgPT09IENhbGVuZGFyRXZlbnRSZXNwb25zZS5SZWplY3RlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBtYXliZXMoKTogQXJyYXk8Q2FsZW5kYXJFdmVudD4ge1xuICAgIGlmICghdGhpcy5kYXkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGF5LmV2ZW50cy5maWx0ZXIoKGV2dCkgPT4ge1xuICAgICAgcmV0dXJuIGV2dC5yZXNwb25zZSA9PT0gQ2FsZW5kYXJFdmVudFJlc3BvbnNlLk1heWJlO1xuICAgIH0pO1xuICB9XG59XG4iXX0=