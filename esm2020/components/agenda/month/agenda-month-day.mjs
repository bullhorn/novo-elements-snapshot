import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CalendarEventResponse } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../pipe/day-of-month.pipe";
import * as i3 from "novo-elements/pipes";
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
NovoAgendaMonthDayElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthDayElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaMonthDayElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaMonthDayElement, selector: "novo-agenda-month-day", inputs: { day: "day", locale: "locale", tooltipPosition: "tooltipPosition", customTemplate: "customTemplate" }, outputs: { eventClicked: "eventClicked" }, host: { properties: { "class": "\"agenda-cell agenda-day-cell \" + day?.cssClass", "class.agenda-day-accepted": "accepted.length", "class.agenda-day-rejected": "rejected.length", "class.agenda-past": "day.isPast", "class.agenda-today": "day.isToday", "class.agenda-future": "day.isFuture", "class.agenda-weekend": "day.isWeekend", "class.agenda-in-month": "day.inMonth", "class.agenda-out-month": "!day.inMonth", "class.agenda-has-events": "day.events.length > 0", "style.backgroundColor": "day.backgroundColor" } }, ngImport: i0, template: `
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
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "dayofmonth": i2.DayOfMonthPipe, "groupBy": i3.GroupByPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthDayElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-month-day',
                    encapsulation: ViewEncapsulation.None,
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
                    },
                }]
        }], propDecorators: { day: [{
                type: Input
            }], locale: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], eventClicked: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmRhLW1vbnRoLWRheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvYWdlbmRhL21vbnRoL2FnZW5kYS1tb250aC1kYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkcsT0FBTyxFQUFpQixxQkFBcUIsRUFBZ0IsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUFtRHpGLE1BQU0sT0FBTyx5QkFBeUI7SUFqRHRDO1FBK0RFLGlCQUFZLEdBQTJDLElBQUksWUFBWSxFQUE0QixDQUFDO0tBNEJyRztJQTFCQyxJQUFJLFFBQVE7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BDLE9BQU8sR0FBRyxDQUFDLFFBQVEsS0FBSyxxQkFBcUIsQ0FBQyxRQUFRLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNwQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEtBQUsscUJBQXFCLENBQUMsUUFBUSxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDcEMsT0FBTyxHQUFHLENBQUMsUUFBUSxLQUFLLHFCQUFxQixDQUFDLEtBQUssQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O3VIQXpDVSx5QkFBeUI7MkdBQXpCLHlCQUF5Qiw2dEJBOUMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCVDs0RkFlVSx5QkFBeUI7a0JBakRyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQlQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSxnREFBZ0Q7d0JBQzNELDZCQUE2QixFQUFFLGlCQUFpQjt3QkFDaEQsNkJBQTZCLEVBQUUsaUJBQWlCO3dCQUNoRCxxQkFBcUIsRUFBRSxZQUFZO3dCQUNuQyxzQkFBc0IsRUFBRSxhQUFhO3dCQUNyQyx1QkFBdUIsRUFBRSxjQUFjO3dCQUN2Qyx3QkFBd0IsRUFBRSxlQUFlO3dCQUN6Qyx5QkFBeUIsRUFBRSxhQUFhO3dCQUN4QywwQkFBMEIsRUFBRSxjQUFjO3dCQUMxQywyQkFBMkIsRUFBRSx1QkFBdUI7d0JBQ3BELHlCQUF5QixFQUFFLHFCQUFxQjtxQkFDakQ7aUJBQ0Y7OEJBR0MsR0FBRztzQkFERixLQUFLO2dCQUlOLE1BQU07c0JBREwsS0FBSztnQkFJTixlQUFlO3NCQURkLEtBQUs7Z0JBSU4sY0FBYztzQkFEYixLQUFLO2dCQUlOLFlBQVk7c0JBRFgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQsIENhbGVuZGFyRXZlbnRSZXNwb25zZSwgTW9udGhWaWV3RGF5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYWdlbmRhLW1vbnRoLWRheScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWdlbmRhLWRheS10b3BcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhZ2VuZGEtZGF5LWJhZGdlXCIgKm5nSWY9XCJkYXkuYmFkZ2VUb3RhbCA+IDBcIj57eyBkYXkuYmFkZ2VUb3RhbCB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhZ2VuZGEtZGF5LW51bWJlclwiPnt7IGRheS5kYXRlIHwgZGF5b2Ztb250aDogbG9jYWxlIH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWdlbmRhLWV2ZW50c1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJhZ2VuZGEtZXZlbnRcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCB0eXBlIG9mIGRheS5ldmVudHMgfCBncm91cEJ5OiAndHlwZSdcIlxuICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwidHlwZT8udmFsdWVbMF0/LmNvbG9yLnByaW1hcnlcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInR5cGU/LnZhbHVlWzBdPy5jc3NDbGFzc1wiXG4gICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgZXZlbnRDbGlja2VkLmVtaXQoeyBldmVudDogdHlwZT8udmFsdWVbMF0gfSlcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgdHlwZT8udmFsdWUubGVuZ3RoIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBkYXk6IGRheSxcbiAgICAgICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbjogdG9vbHRpcFBvc2l0aW9uLFxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZCxcbiAgICAgICAgYWNjZXB0ZWQ6IGFjY2VwdGVkLFxuICAgICAgICByZWplY3RlZDogcmVqZWN0ZWQsXG4gICAgICAgIG1heWJlczogbWF5YmVzXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ1wiYWdlbmRhLWNlbGwgYWdlbmRhLWRheS1jZWxsIFwiICsgZGF5Py5jc3NDbGFzcycsXG4gICAgJ1tjbGFzcy5hZ2VuZGEtZGF5LWFjY2VwdGVkXSc6ICdhY2NlcHRlZC5sZW5ndGgnLFxuICAgICdbY2xhc3MuYWdlbmRhLWRheS1yZWplY3RlZF0nOiAncmVqZWN0ZWQubGVuZ3RoJyxcbiAgICAnW2NsYXNzLmFnZW5kYS1wYXN0XSc6ICdkYXkuaXNQYXN0JyxcbiAgICAnW2NsYXNzLmFnZW5kYS10b2RheV0nOiAnZGF5LmlzVG9kYXknLFxuICAgICdbY2xhc3MuYWdlbmRhLWZ1dHVyZV0nOiAnZGF5LmlzRnV0dXJlJyxcbiAgICAnW2NsYXNzLmFnZW5kYS13ZWVrZW5kXSc6ICdkYXkuaXNXZWVrZW5kJyxcbiAgICAnW2NsYXNzLmFnZW5kYS1pbi1tb250aF0nOiAnZGF5LmluTW9udGgnLFxuICAgICdbY2xhc3MuYWdlbmRhLW91dC1tb250aF0nOiAnIWRheS5pbk1vbnRoJyxcbiAgICAnW2NsYXNzLmFnZW5kYS1oYXMtZXZlbnRzXSc6ICdkYXkuZXZlbnRzLmxlbmd0aCA+IDAnLFxuICAgICdbc3R5bGUuYmFja2dyb3VuZENvbG9yXSc6ICdkYXkuYmFja2dyb3VuZENvbG9yJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FnZW5kYU1vbnRoRGF5RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGRheTogTW9udGhWaWV3RGF5O1xuXG4gIEBJbnB1dCgpXG4gIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBQb3NpdGlvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+KCk7XG5cbiAgZ2V0IGFjY2VwdGVkKCk6IEFycmF5PENhbGVuZGFyRXZlbnQ+IHtcbiAgICBpZiAoIXRoaXMuZGF5KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRheS5ldmVudHMuZmlsdGVyKChldnQpID0+IHtcbiAgICAgIHJldHVybiBldnQucmVzcG9uc2UgPT09IENhbGVuZGFyRXZlbnRSZXNwb25zZS5BY2NlcHRlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCByZWplY3RlZCgpOiBBcnJheTxDYWxlbmRhckV2ZW50PiB7XG4gICAgaWYgKCF0aGlzLmRheSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXkuZXZlbnRzLmZpbHRlcigoZXZ0KSA9PiB7XG4gICAgICByZXR1cm4gZXZ0LnJlc3BvbnNlID09PSBDYWxlbmRhckV2ZW50UmVzcG9uc2UuUmVqZWN0ZWQ7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgbWF5YmVzKCk6IEFycmF5PENhbGVuZGFyRXZlbnQ+IHtcbiAgICBpZiAoIXRoaXMuZGF5KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRheS5ldmVudHMuZmlsdGVyKChldnQpID0+IHtcbiAgICAgIHJldHVybiBldnQucmVzcG9uc2UgPT09IENhbGVuZGFyRXZlbnRSZXNwb25zZS5NYXliZTtcbiAgICB9KTtcbiAgfVxufVxuIl19