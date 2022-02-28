import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as dateFns from 'date-fns';
export class NovoAgendaMonthHeaderElement {
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
NovoAgendaMonthHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-agenda-month-header',
                template: `
    <ng-template #defaultTemplate>
      <div class="agenda-header">
        <div class="agenda-header-top">
          <novo-button theme="icon" icon="previous" (click)="prevMonth($event)"></novo-button>
          <div class="agenda-month">{{ viewDate | month: locale }}</div>
          <novo-button theme="icon" icon="next" (click)="nextMonth($event)"></novo-button>
        </div>
        <div class="agenda-weekdays">
          <div
            class="agenda-weekday"
            *ngFor="let day of days"
            [class.agenda-past]="day.isPast"
            [class.agenda-today]="day.isToday"
            [class.agenda-future]="day.isFuture"
            [class.agenda-weekend]="day.isWeekend"
          >
            {{ day.date | weekday: locale }}
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ days: days, locale: locale, viewDate: viewDate }"
    >
    </ng-template>
  `
            },] }
];
NovoAgendaMonthHeaderElement.propDecorators = {
    viewDate: [{ type: Input }],
    days: [{ type: Input }],
    locale: [{ type: Input }],
    customTemplate: [{ type: Input }],
    viewDateChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhTW9udGhIZWFkZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvYWdlbmRhL21vbnRoL0FnZW5kYU1vbnRoSGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBa0NwQyxNQUFNLE9BQU8sNEJBQTRCO0lBL0J6QztRQTRDRTs7V0FFRztRQUVILG1CQUFjLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7SUFTMUQsQ0FBQztJQVBDLFNBQVMsQ0FBQyxLQUFZO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7WUF4REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUO2FBQ0Y7Ozt1QkFFRSxLQUFLO21CQUdMLEtBQUs7cUJBR0wsS0FBSzs2QkFHTCxLQUFLOzZCQU1MLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgV2Vla0RheSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NhbGVuZGFyLXV0aWxzL0NhbGVuZGFyVXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFnZW5kYS1tb250aC1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cImFnZW5kYS1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFnZW5kYS1oZWFkZXItdG9wXCI+XG4gICAgICAgICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiaWNvblwiIGljb249XCJwcmV2aW91c1wiIChjbGljayk9XCJwcmV2TW9udGgoJGV2ZW50KVwiPjwvbm92by1idXR0b24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFnZW5kYS1tb250aFwiPnt7IHZpZXdEYXRlIHwgbW9udGg6IGxvY2FsZSB9fTwvZGl2PlxuICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwibmV4dFwiIChjbGljayk9XCJuZXh0TW9udGgoJGV2ZW50KVwiPjwvbm92by1idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWdlbmRhLXdlZWtkYXlzXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJhZ2VuZGEtd2Vla2RheVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXNcIlxuICAgICAgICAgICAgW2NsYXNzLmFnZW5kYS1wYXN0XT1cImRheS5pc1Bhc3RcIlxuICAgICAgICAgICAgW2NsYXNzLmFnZW5kYS10b2RheV09XCJkYXkuaXNUb2RheVwiXG4gICAgICAgICAgICBbY2xhc3MuYWdlbmRhLWZ1dHVyZV09XCJkYXkuaXNGdXR1cmVcIlxuICAgICAgICAgICAgW2NsYXNzLmFnZW5kYS13ZWVrZW5kXT1cImRheS5pc1dlZWtlbmRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IGRheS5kYXRlIHwgd2Vla2RheTogbG9jYWxlIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBkYXlzOiBkYXlzLCBsb2NhbGU6IGxvY2FsZSwgdmlld0RhdGU6IHZpZXdEYXRlIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWdlbmRhTW9udGhIZWFkZXJFbGVtZW50IHtcbiAgQElucHV0KClcbiAgdmlld0RhdGU6IERhdGU7XG5cbiAgQElucHV0KClcbiAgZGF5czogV2Vla0RheVtdO1xuXG4gIEBJbnB1dCgpXG4gIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByZXZNb250aChldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoZGF0ZUZucy5zdWJNb250aHModGhpcy52aWV3RGF0ZSwgMSkpO1xuICB9XG5cbiAgbmV4dE1vbnRoKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChkYXRlRm5zLmFkZE1vbnRocyh0aGlzLnZpZXdEYXRlLCAxKSk7XG4gIH1cbn1cbiJdfQ==