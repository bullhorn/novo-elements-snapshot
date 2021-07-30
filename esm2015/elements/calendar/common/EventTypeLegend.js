import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
export class NovoEventTypeLegendElement {
    constructor() {
        this.eventTypeClicked = new EventEmitter();
    }
}
NovoEventTypeLegendElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-event-type-legend',
                template: `
    <ng-template #defaultTemplate>
      <div class="cal-event-legend">
        <div class="cal-event-type"
          *ngFor="let type of events | groupBy : 'type'"
          (click)="$event.stopPropagation(); eventTypeClicked.emit({event:type?.key})">
          <div class="cal-event-type-swatch"></div><div>{{type?.key}}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{events: events, eventTypeClicked: eventTypeClicked}">
    </ng-template>
  `
            },] }
];
NovoEventTypeLegendElement.propDecorators = {
    events: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventTypeClicked: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRUeXBlTGVnZW5kLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci9jb21tb24vRXZlbnRUeXBlTGVnZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBcUJwRixNQUFNLE9BQU8sMEJBQTBCO0lBbEJ2QztRQTBCRSxxQkFBZ0IsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUMzRCxDQUFDOzs7WUEzQkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDthQUNGOzs7cUJBRUUsS0FBSzs2QkFHTCxLQUFLOytCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NhbGVuZGFyLXV0aWxzL0NhbGVuZGFyVXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWV2ZW50LXR5cGUtbGVnZW5kJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnQtbGVnZW5kXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudC10eXBlXCJcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCB0eXBlIG9mIGV2ZW50cyB8IGdyb3VwQnkgOiAndHlwZSdcIlxyXG4gICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgZXZlbnRUeXBlQ2xpY2tlZC5lbWl0KHtldmVudDp0eXBlPy5rZXl9KVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudC10eXBlLXN3YXRjaFwiPjwvZGl2PjxkaXY+e3t0eXBlPy5rZXl9fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGVcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntldmVudHM6IGV2ZW50cywgZXZlbnRUeXBlQ2xpY2tlZDogZXZlbnRUeXBlQ2xpY2tlZH1cIj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9FdmVudFR5cGVMZWdlbmRFbGVtZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGV2ZW50czogQ2FsZW5kYXJFdmVudFtdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAT3V0cHV0KClcclxuICBldmVudFR5cGVDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxufVxyXG4iXX0=