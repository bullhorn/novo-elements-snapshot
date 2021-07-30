import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
export class NovoCalendarAllDayEventElement {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
NovoCalendarAllDayEventElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-all-day-event',
                template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-all-day-event"
        [style.backgroundColor]="event.color.secondary"
        [style.borderColor]="event.color.primary">
        {{event.title}}
        <!--<novo-calendar-event-title
          [event]="event"
          view="day"
          (click)="eventClicked.emit()">
        </novo-calendar-event-title>
        <novo-calendar-event-actions [event]="event"></novo-calendar-event-actions>-->
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        eventClicked: eventClicked
      }">
    </ng-template>
  `
            },] }
];
NovoCalendarAllDayEventElement.propDecorators = {
    event: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJBbGxEYXlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2FsZW5kYXIvZGF5L0NhbGVuZGFyQWxsRGF5RXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUE2QnBGLE1BQU0sT0FBTyw4QkFBOEI7SUExQjNDO1FBa0NFLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7O1lBbkNBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQlQ7YUFDRjs7O29CQUVFLEtBQUs7NkJBR0wsS0FBSzsyQkFHTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxlbmRhci11dGlscy9DYWxlbmRhclV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1jYWxlbmRhci1hbGwtZGF5LWV2ZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzcz1cImNhbC1hbGwtZGF5LWV2ZW50XCJcclxuICAgICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImV2ZW50LmNvbG9yLnNlY29uZGFyeVwiXHJcbiAgICAgICAgW3N0eWxlLmJvcmRlckNvbG9yXT1cImV2ZW50LmNvbG9yLnByaW1hcnlcIj5cclxuICAgICAgICB7e2V2ZW50LnRpdGxlfX1cclxuICAgICAgICA8IS0tPG5vdm8tY2FsZW5kYXItZXZlbnQtdGl0bGVcclxuICAgICAgICAgIFtldmVudF09XCJldmVudFwiXHJcbiAgICAgICAgICB2aWV3PVwiZGF5XCJcclxuICAgICAgICAgIChjbGljayk9XCJldmVudENsaWNrZWQuZW1pdCgpXCI+XHJcbiAgICAgICAgPC9ub3ZvLWNhbGVuZGFyLWV2ZW50LXRpdGxlPlxyXG4gICAgICAgIDxub3ZvLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnMgW2V2ZW50XT1cImV2ZW50XCI+PC9ub3ZvLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnM+LS0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZFxyXG4gICAgICB9XCI+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJBbGxEYXlFdmVudEVsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbn1cclxuIl19