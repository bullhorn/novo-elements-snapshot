import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
export class NovoCalendarWeekEventElement {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
NovoCalendarWeekEventElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-week-event',
                template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [class.cal-starts-within-week]="!weekEvent.startsBeforeWeek"
        [class.cal-ends-within-week]="!weekEvent.endsAfterWeek"
        [ngClass]="weekEvent.event?.cssClass"
        [tooltip]="weekEvent.event.description"
        [tooltipPosition]="tooltipPosition"
        (click)="eventClicked.emit({event: weekEvent.event})">
        <div class="cal-event-ribbon" [style.backgroundColor]="weekEvent.event.color.primary"></div>
        <div class="cal-event-title">{{weekEvent.event?.title}}</div>
        <div class="cal-event-description">{{weekEvent.event?.description}}</div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{weekEvent: weekEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked}">
    </ng-template>
  `
            },] }
];
NovoCalendarWeekEventElement.propDecorators = {
    weekEvent: [{ type: Input }],
    tooltipPosition: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJXZWVrRXZlbnQuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NhbGVuZGFyL3dlZWsvQ2FsZW5kYXJXZWVrRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUEwQnBGLE1BQU0sT0FBTyw0QkFBNEI7SUF2QnpDO1FBa0NFLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7O1lBbkNBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQ7YUFDRjs7O3dCQUVFLEtBQUs7OEJBR0wsS0FBSzs2QkFHTCxLQUFLOzJCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgV2Vla1ZpZXdFdmVudCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NhbGVuZGFyLXV0aWxzL0NhbGVuZGFyVXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWNhbGVuZGFyLXdlZWstZXZlbnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcclxuICAgICAgICBbY2xhc3MuY2FsLXN0YXJ0cy13aXRoaW4td2Vla109XCIhd2Vla0V2ZW50LnN0YXJ0c0JlZm9yZVdlZWtcIlxyXG4gICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4td2Vla109XCIhd2Vla0V2ZW50LmVuZHNBZnRlcldlZWtcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cIndlZWtFdmVudC5ldmVudD8uY3NzQ2xhc3NcIlxyXG4gICAgICAgIFt0b29sdGlwXT1cIndlZWtFdmVudC5ldmVudC5kZXNjcmlwdGlvblwiXHJcbiAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJ0b29sdGlwUG9zaXRpb25cIlxyXG4gICAgICAgIChjbGljayk9XCJldmVudENsaWNrZWQuZW1pdCh7ZXZlbnQ6IHdlZWtFdmVudC5ldmVudH0pXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudC1yaWJib25cIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cIndlZWtFdmVudC5ldmVudC5jb2xvci5wcmltYXJ5XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudC10aXRsZVwiPnt7d2Vla0V2ZW50LmV2ZW50Py50aXRsZX19PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudC1kZXNjcmlwdGlvblwiPnt7d2Vla0V2ZW50LmV2ZW50Py5kZXNjcmlwdGlvbn19PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3dlZWtFdmVudDogd2Vla0V2ZW50LCB0b29sdGlwUG9zaXRpb246IHRvb2x0aXBQb3NpdGlvbiwgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWR9XCI+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJXZWVrRXZlbnRFbGVtZW50IHtcclxuICBASW5wdXQoKVxyXG4gIHdlZWtFdmVudDogV2Vla1ZpZXdFdmVudDtcclxuXHJcbiAgQElucHV0KClcclxuICB0b29sdGlwUG9zaXRpb246IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxufVxyXG4iXX0=