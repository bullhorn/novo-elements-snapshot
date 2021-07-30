import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
export class NovoCalendarDayEventElement {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
NovoCalendarDayEventElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-day-event',
                template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [style.borderColor]="dayEvent.event.color.secondary"
        [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
        [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
        [ngClass]="dayEvent.event.cssClass"
        [tooltip]="dayEvent.event.description"
        [tooltipPosition]="tooltipPosition"
        (click)="eventClicked.emit({event: dayEvent.event})">
          <div class="cal-event-ribbon" [style.backgroundColor]="dayEvent.event.color.primary"></div>
          <div class="cal-event-group">
            <div class="cal-event-title">{{dayEvent.event.title}}</div>
            <div class="cal-event-description">{{dayEvent.event?.description}}</div>
          </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{dayEvent: dayEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked}">
    </ng-template>
  `
            },] }
];
NovoCalendarDayEventElement.propDecorators = {
    dayEvent: [{ type: Input }],
    tooltipPosition: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJEYXlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2FsZW5kYXIvZGF5L0NhbGVuZGFyRGF5RXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUE2QnBGLE1BQU0sT0FBTywyQkFBMkI7SUExQnhDO1FBcUNFLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7O1lBdENBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQlQ7YUFDRjs7O3VCQUVFLEtBQUs7OEJBR0wsS0FBSzs2QkFHTCxLQUFLOzJCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF5Vmlld0V2ZW50IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY2FsZW5kYXItdXRpbHMvQ2FsZW5kYXJVdGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXItZGF5LWV2ZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzcz1cImNhbC1ldmVudFwiXHJcbiAgICAgICAgW3N0eWxlLmJvcmRlckNvbG9yXT1cImRheUV2ZW50LmV2ZW50LmNvbG9yLnNlY29uZGFyeVwiXHJcbiAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLWRheV09XCIhZGF5RXZlbnQuc3RhcnRzQmVmb3JlRGF5XCJcclxuICAgICAgICBbY2xhc3MuY2FsLWVuZHMtd2l0aGluLWRheV09XCIhZGF5RXZlbnQuZW5kc0FmdGVyRGF5XCJcclxuICAgICAgICBbbmdDbGFzc109XCJkYXlFdmVudC5ldmVudC5jc3NDbGFzc1wiXHJcbiAgICAgICAgW3Rvb2x0aXBdPVwiZGF5RXZlbnQuZXZlbnQuZGVzY3JpcHRpb25cIlxyXG4gICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwidG9vbHRpcFBvc2l0aW9uXCJcclxuICAgICAgICAoY2xpY2spPVwiZXZlbnRDbGlja2VkLmVtaXQoe2V2ZW50OiBkYXlFdmVudC5ldmVudH0pXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50LXJpYmJvblwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiZGF5RXZlbnQuZXZlbnQuY29sb3IucHJpbWFyeVwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50LXRpdGxlXCI+e3tkYXlFdmVudC5ldmVudC50aXRsZX19PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnQtZGVzY3JpcHRpb25cIj57e2RheUV2ZW50LmV2ZW50Py5kZXNjcmlwdGlvbn19PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGF5RXZlbnQ6IGRheUV2ZW50LCB0b29sdGlwUG9zaXRpb246IHRvb2x0aXBQb3NpdGlvbiwgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWR9XCI+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJEYXlFdmVudEVsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZGF5RXZlbnQ6IERheVZpZXdFdmVudDtcclxuXHJcbiAgQElucHV0KClcclxuICB0b29sdGlwUG9zaXRpb246IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxufVxyXG4iXX0=