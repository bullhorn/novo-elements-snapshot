import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NovoAgendaAllDayEventElement {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
NovoAgendaAllDayEventElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaAllDayEventElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaAllDayEventElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaAllDayEventElement, selector: "novo-agenda-all-day-event", inputs: { event: "event", customTemplate: "customTemplate" }, outputs: { eventClicked: "eventClicked" }, ngImport: i0, template: `
    <ng-template #defaultTemplate>
      <div class="cal-all-day-event" [style.backgroundColor]="event.color.secondary" [style.borderColor]="event.color.primary">
        {{ event.title }}
        <!--<novo-agenda-event-title
          [event]="event"
          view="day"
          (click)="eventClicked.emit()">
        </novo-agenda-event-title>
        <novo-agenda-event-actions [event]="event"></novo-agenda-event-actions>-->
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        eventClicked: eventClicked
      }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaAllDayEventElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-all-day-event',
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #defaultTemplate>
      <div class="cal-all-day-event" [style.backgroundColor]="event.color.secondary" [style.borderColor]="event.color.primary">
        {{ event.title }}
        <!--<novo-agenda-event-title
          [event]="event"
          view="day"
          (click)="eventClicked.emit()">
        </novo-agenda-event-title>
        <novo-agenda-event-actions [event]="event"></novo-agenda-event-actions>-->
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        eventClicked: eventClicked
      }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { event: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], eventClicked: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmRhLWFsbC1kYXktZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2FnZW5kYS9kYXkvYWdlbmRhLWFsbC1kYXktZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQTRCdkcsTUFBTSxPQUFPLDRCQUE0QjtJQXpCekM7UUFpQ0UsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQUN0RDs7MEhBVFksNEJBQTRCOzhHQUE1Qiw0QkFBNEIsMEtBdEI3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7NEZBRVUsNEJBQTRCO2tCQXpCeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtpQkFDRjs4QkFHQyxLQUFLO3NCQURKLEtBQUs7Z0JBSU4sY0FBYztzQkFEYixLQUFLO2dCQUlOLFlBQVk7c0JBRFgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZ2VuZGEtYWxsLWRheS1ldmVudCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWFsbC1kYXktZXZlbnRcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImV2ZW50LmNvbG9yLnNlY29uZGFyeVwiIFtzdHlsZS5ib3JkZXJDb2xvcl09XCJldmVudC5jb2xvci5wcmltYXJ5XCI+XG4gICAgICAgIHt7IGV2ZW50LnRpdGxlIH19XG4gICAgICAgIDwhLS08bm92by1hZ2VuZGEtZXZlbnQtdGl0bGVcbiAgICAgICAgICBbZXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgIHZpZXc9XCJkYXlcIlxuICAgICAgICAgIChjbGljayk9XCJldmVudENsaWNrZWQuZW1pdCgpXCI+XG4gICAgICAgIDwvbm92by1hZ2VuZGEtZXZlbnQtdGl0bGU+XG4gICAgICAgIDxub3ZvLWFnZW5kYS1ldmVudC1hY3Rpb25zIFtldmVudF09XCJldmVudFwiPjwvbm92by1hZ2VuZGEtZXZlbnQtYWN0aW9ucz4tLT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZFxuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BZ2VuZGFBbGxEYXlFdmVudEVsZW1lbnQge1xuICBASW5wdXQoKVxuICBldmVudDogQ2FsZW5kYXJFdmVudDtcblxuICBASW5wdXQoKVxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiJdfQ==