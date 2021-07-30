import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEventResponse } from '../../../utils/calendar-utils/CalendarUtils';
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
NovoCalendarMonthDayElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-month-day',
                template: `
    <ng-template #defaultTemplate>
      <div class="calendar-day-top">
        <span class="calendar-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
        <span class="calendar-day-number">{{ day.date | dayofmonth:locale }}</span>
      </div>
      <div class="calendar-events">
        <div
          class="calendar-event"
          *ngFor="let type of day.events | groupBy : 'type'"
          [style.backgroundColor]="type?.value[0]?.color.primary"
          [ngClass]="type?.value[0]?.cssClass"
          (click)="$event.stopPropagation(); eventClicked.emit({event:type?.value[0]})">
          {{type?.value.length}}
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
      }">
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
                }
            },] }
];
NovoCalendarMonthDayElement.propDecorators = {
    day: [{ type: Input }],
    locale: [{ type: Input }],
    tooltipPosition: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJNb250aERheS5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2FsZW5kYXIvbW9udGgvQ2FsZW5kYXJNb250aERheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQStCLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFnRGpILE1BQU0sT0FBTywyQkFBMkI7SUE5Q3hDO1FBNERFLGlCQUFZLEdBQTJDLElBQUksWUFBWSxFQUE0QixDQUFDO0lBNEJ0RyxDQUFDO0lBMUJDLElBQUksUUFBUTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDcEMsT0FBTyxHQUFHLENBQUMsUUFBUSxLQUFLLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BDLE9BQU8sR0FBRyxDQUFDLFFBQVEsS0FBSyxxQkFBcUIsQ0FBQyxRQUFRLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNwQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEtBQUsscUJBQXFCLENBQUMsS0FBSyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBdkZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUO2dCQUNELElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsb0RBQW9EO29CQUMvRCwrQkFBK0IsRUFBRSxpQkFBaUI7b0JBQ2xELCtCQUErQixFQUFFLGlCQUFpQjtvQkFDbEQsdUJBQXVCLEVBQUUsWUFBWTtvQkFDckMsd0JBQXdCLEVBQUUsYUFBYTtvQkFDdkMseUJBQXlCLEVBQUUsY0FBYztvQkFDekMsMEJBQTBCLEVBQUUsZUFBZTtvQkFDM0MsMkJBQTJCLEVBQUUsYUFBYTtvQkFDMUMsNEJBQTRCLEVBQUUsY0FBYztvQkFDNUMsNkJBQTZCLEVBQUUsdUJBQXVCO29CQUN0RCx5QkFBeUIsRUFBRSxxQkFBcUI7aUJBQ2pEO2FBQ0Y7OztrQkFFRSxLQUFLO3FCQUdMLEtBQUs7OEJBR0wsS0FBSzs2QkFHTCxLQUFLOzJCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9udGhWaWV3RGF5LCBDYWxlbmRhckV2ZW50LCBDYWxlbmRhckV2ZW50UmVzcG9uc2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxlbmRhci11dGlscy9DYWxlbmRhclV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1jYWxlbmRhci1tb250aC1kYXknLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWRheS10b3BcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhbGVuZGFyLWRheS1iYWRnZVwiICpuZ0lmPVwiZGF5LmJhZGdlVG90YWwgPiAwXCI+e3sgZGF5LmJhZGdlVG90YWwgfX08L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWxlbmRhci1kYXktbnVtYmVyXCI+e3sgZGF5LmRhdGUgfCBkYXlvZm1vbnRoOmxvY2FsZSB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1ldmVudHNcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzcz1cImNhbGVuZGFyLWV2ZW50XCJcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCB0eXBlIG9mIGRheS5ldmVudHMgfCBncm91cEJ5IDogJ3R5cGUnXCJcclxuICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwidHlwZT8udmFsdWVbMF0/LmNvbG9yLnByaW1hcnlcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwidHlwZT8udmFsdWVbMF0/LmNzc0NsYXNzXCJcclxuICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50Q2xpY2tlZC5lbWl0KHtldmVudDp0eXBlPy52YWx1ZVswXX0pXCI+XHJcbiAgICAgICAgICB7e3R5cGU/LnZhbHVlLmxlbmd0aH19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgIGRheTogZGF5LFxyXG4gICAgICAgIGxvY2FsZTogbG9jYWxlLFxyXG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbjogdG9vbHRpcFBvc2l0aW9uLFxyXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxyXG4gICAgICAgIGFjY2VwdGVkOiBhY2NlcHRlZCxcclxuICAgICAgICByZWplY3RlZDogcmVqZWN0ZWQsXHJcbiAgICAgICAgbWF5YmVzOiBtYXliZXNcclxuICAgICAgfVwiPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3NdJzogJ1wiY2FsZW5kYXItY2VsbCBjYWxlbmRhci1kYXktY2VsbCBcIiArIGRheT8uY3NzQ2xhc3MnLFxyXG4gICAgJ1tjbGFzcy5jYWxlbmRhci1kYXktYWNjZXB0ZWRdJzogJ2FjY2VwdGVkLmxlbmd0aCcsXHJcbiAgICAnW2NsYXNzLmNhbGVuZGFyLWRheS1yZWplY3RlZF0nOiAncmVqZWN0ZWQubGVuZ3RoJyxcclxuICAgICdbY2xhc3MuY2FsZW5kYXItcGFzdF0nOiAnZGF5LmlzUGFzdCcsXHJcbiAgICAnW2NsYXNzLmNhbGVuZGFyLXRvZGF5XSc6ICdkYXkuaXNUb2RheScsXHJcbiAgICAnW2NsYXNzLmNhbGVuZGFyLWZ1dHVyZV0nOiAnZGF5LmlzRnV0dXJlJyxcclxuICAgICdbY2xhc3MuY2FsZW5kYXItd2Vla2VuZF0nOiAnZGF5LmlzV2Vla2VuZCcsXHJcbiAgICAnW2NsYXNzLmNhbGVuZGFyLWluLW1vbnRoXSc6ICdkYXkuaW5Nb250aCcsXHJcbiAgICAnW2NsYXNzLmNhbGVuZGFyLW91dC1tb250aF0nOiAnIWRheS5pbk1vbnRoJyxcclxuICAgICdbY2xhc3MuY2FsZW5kYXItaGFzLWV2ZW50c10nOiAnZGF5LmV2ZW50cy5sZW5ndGggPiAwJyxcclxuICAgICdbc3R5bGUuYmFja2dyb3VuZENvbG9yXSc6ICdkYXkuYmFja2dyb3VuZENvbG9yJyxcclxuICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFyTW9udGhEYXlFbGVtZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGRheTogTW9udGhWaWV3RGF5O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGxvY2FsZTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHRvb2x0aXBQb3NpdGlvbjogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAT3V0cHV0KClcclxuICBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+KCk7XHJcblxyXG4gIGdldCBhY2NlcHRlZCgpOiBBcnJheTxDYWxlbmRhckV2ZW50PiB7XHJcbiAgICBpZiAoIXRoaXMuZGF5KSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmRheS5ldmVudHMuZmlsdGVyKChldnQpID0+IHtcclxuICAgICAgcmV0dXJuIGV2dC5yZXNwb25zZSA9PT0gQ2FsZW5kYXJFdmVudFJlc3BvbnNlLkFjY2VwdGVkO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXQgcmVqZWN0ZWQoKTogQXJyYXk8Q2FsZW5kYXJFdmVudD4ge1xyXG4gICAgaWYgKCF0aGlzLmRheSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5kYXkuZXZlbnRzLmZpbHRlcigoZXZ0KSA9PiB7XHJcbiAgICAgIHJldHVybiBldnQucmVzcG9uc2UgPT09IENhbGVuZGFyRXZlbnRSZXNwb25zZS5SZWplY3RlZDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1heWJlcygpOiBBcnJheTxDYWxlbmRhckV2ZW50PiB7XHJcbiAgICBpZiAoIXRoaXMuZGF5KSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmRheS5ldmVudHMuZmlsdGVyKChldnQpID0+IHtcclxuICAgICAgcmV0dXJuIGV2dC5yZXNwb25zZSA9PT0gQ2FsZW5kYXJFdmVudFJlc3BvbnNlLk1heWJlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==