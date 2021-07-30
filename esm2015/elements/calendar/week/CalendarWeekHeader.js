import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
export class NovoCalendarWeekHeaderElement {
    constructor() {
        this.dayClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
    }
}
NovoCalendarWeekHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-week-header',
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
          (click)="dayClicked.emit({date: day.date})"
          mwlDroppable
          (dragEnter)="day.dragOver = true"
          (dragLeave)="day.dragOver = false"
          (drop)="day.dragOver = false; eventDropped.emit({event: $event.dropData.event, newStart: day.date})">
          <b>{{ day.date | weekday:locale:'long'}}</b><br>
          <span>{{ day.date | monthday:locale }}</span>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{days: days, locale: locale, dayClicked: dayClicked, eventDropped: eventDropped}">
    </ng-template>
  `
            },] }
];
NovoCalendarWeekHeaderElement.propDecorators = {
    days: [{ type: Input }],
    locale: [{ type: Input }],
    customTemplate: [{ type: Input }],
    dayClicked: [{ type: Output }],
    eventDropped: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJXZWVrSGVhZGVyLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci93ZWVrL0NhbGVuZGFyV2Vla0hlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWdDcEYsTUFBTSxPQUFPLDZCQUE2QjtJQTdCMUM7UUF3Q0UsZUFBVSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUc5RSxpQkFBWSxHQUEyRCxJQUFJLFlBQVksRUFBNEMsQ0FBQztJQUN0SSxDQUFDOzs7WUE1Q0EsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDthQUNGOzs7bUJBRUUsS0FBSztxQkFHTCxLQUFLOzZCQUdMLEtBQUs7eUJBR0wsTUFBTTsyQkFHTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQsIFdlZWtEYXkgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxlbmRhci11dGlscy9DYWxlbmRhclV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1jYWxlbmRhci13ZWVrLWhlYWRlcicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheS1oZWFkZXJzXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3M9XCJjYWwtaGVhZGVyXCJcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5c1wiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXBhc3RdPVwiZGF5LmlzUGFzdFwiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXRvZGF5XT1cImRheS5pc1RvZGF5XCJcclxuICAgICAgICAgIFtjbGFzcy5jYWwtZnV0dXJlXT1cImRheS5pc0Z1dHVyZVwiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXdlZWtlbmRdPVwiZGF5LmlzV2Vla2VuZFwiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLWRyYWctb3Zlcl09XCJkYXkuZHJhZ092ZXJcIlxyXG4gICAgICAgICAgKGNsaWNrKT1cImRheUNsaWNrZWQuZW1pdCh7ZGF0ZTogZGF5LmRhdGV9KVwiXHJcbiAgICAgICAgICBtd2xEcm9wcGFibGVcclxuICAgICAgICAgIChkcmFnRW50ZXIpPVwiZGF5LmRyYWdPdmVyID0gdHJ1ZVwiXHJcbiAgICAgICAgICAoZHJhZ0xlYXZlKT1cImRheS5kcmFnT3ZlciA9IGZhbHNlXCJcclxuICAgICAgICAgIChkcm9wKT1cImRheS5kcmFnT3ZlciA9IGZhbHNlOyBldmVudERyb3BwZWQuZW1pdCh7ZXZlbnQ6ICRldmVudC5kcm9wRGF0YS5ldmVudCwgbmV3U3RhcnQ6IGRheS5kYXRlfSlcIj5cclxuICAgICAgICAgIDxiPnt7IGRheS5kYXRlIHwgd2Vla2RheTpsb2NhbGU6J2xvbmcnfX08L2I+PGJyPlxyXG4gICAgICAgICAgPHNwYW4+e3sgZGF5LmRhdGUgfCBtb250aGRheTpsb2NhbGUgfX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2RheXM6IGRheXMsIGxvY2FsZTogbG9jYWxlLCBkYXlDbGlja2VkOiBkYXlDbGlja2VkLCBldmVudERyb3BwZWQ6IGV2ZW50RHJvcHBlZH1cIj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9DYWxlbmRhcldlZWtIZWFkZXJFbGVtZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGRheXM6IFdlZWtEYXlbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBsb2NhbGU6IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgZGF5Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZGF0ZTogRGF0ZSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIGV2ZW50RHJvcHBlZDogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7IG5ld1N0YXJ0OiBEYXRlIH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50OyBuZXdTdGFydDogRGF0ZSB9PigpO1xyXG59XHJcbiJdfQ==