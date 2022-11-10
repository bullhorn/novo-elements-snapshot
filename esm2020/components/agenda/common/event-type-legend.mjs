import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "novo-elements/pipes";
export class NovoEventTypeLegendElement {
    constructor() {
        this.eventTypeClicked = new EventEmitter();
    }
}
NovoEventTypeLegendElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoEventTypeLegendElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoEventTypeLegendElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoEventTypeLegendElement, selector: "novo-event-type-legend", inputs: { events: "events", customTemplate: "customTemplate" }, outputs: { eventTypeClicked: "eventTypeClicked" }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div class="cal-event-legend">
        <div
          class="cal-event-type"
          *ngFor="let type of events | groupBy: 'type'"
          (click)="$event.stopPropagation(); eventTypeClicked.emit({ event: type?.key })"
        >
          <div class="cal-event-type-swatch"></div>
          <div>{{ type?.key }}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ events: events, eventTypeClicked: eventTypeClicked }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "groupBy": i2.GroupByPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoEventTypeLegendElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-event-type-legend',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div class="cal-event-legend">
        <div
          class="cal-event-type"
          *ngFor="let type of events | groupBy: 'type'"
          (click)="$event.stopPropagation(); eventTypeClicked.emit({ event: type?.key })"
        >
          <div class="cal-event-type-swatch"></div>
          <div>{{ type?.key }}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ events: events, eventTypeClicked: eventTypeClicked }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { events: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], eventTypeClicked: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtdHlwZS1sZWdlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2FnZW5kYS9jb21tb24vZXZlbnQtdHlwZS1sZWdlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUEwQnZHLE1BQU0sT0FBTywwQkFBMEI7SUF2QnZDO1FBK0JFLHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0tBQzFEOzt3SEFUWSwwQkFBMEI7NEdBQTFCLDBCQUEwQixpTEFwQjNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7NEZBRVUsMEJBQTBCO2tCQXZCdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7aUJBQ0Y7OEJBR0MsTUFBTTtzQkFETCxLQUFLO2dCQUlOLGNBQWM7c0JBRGIsS0FBSztnQkFJTixnQkFBZ0I7c0JBRGYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1ldmVudC10eXBlLWxlZ2VuZCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50LWxlZ2VuZFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtdHlwZVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHR5cGUgb2YgZXZlbnRzIHwgZ3JvdXBCeTogJ3R5cGUnXCJcbiAgICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudFR5cGVDbGlja2VkLmVtaXQoeyBldmVudDogdHlwZT8ua2V5IH0pXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnQtdHlwZS1zd2F0Y2hcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2Pnt7IHR5cGU/LmtleSB9fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZXZlbnRzOiBldmVudHMsIGV2ZW50VHlwZUNsaWNrZWQ6IGV2ZW50VHlwZUNsaWNrZWQgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9FdmVudFR5cGVMZWdlbmRFbGVtZW50IHtcbiAgQElucHV0KClcbiAgZXZlbnRzOiBDYWxlbmRhckV2ZW50W107XG5cbiAgQElucHV0KClcbiAgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpXG4gIGV2ZW50VHlwZUNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xufVxuIl19