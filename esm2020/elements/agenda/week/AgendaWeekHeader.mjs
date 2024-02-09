import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../pipe/Weekday.pipe";
import * as i3 from "../pipe/MonthDay.pipe";
// TODO: This component contains references to the angular-draggable-droppable library, which we're not currently importing.
// This includes properties on the drag-drop event that can never be there. Should it be cleaned up?
// https://mattlewis-github.com/angular-draggable-droppable/docs/directives/DroppableDirective.html#source
export class NovoAgendaWeekHeaderElement {
    constructor() {
        this.dayClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
    }
}
NovoAgendaWeekHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaWeekHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaWeekHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaWeekHeaderElement, selector: "novo-agenda-week-header", inputs: { days: "days", locale: "locale", customTemplate: "customTemplate" }, outputs: { dayClicked: "dayClicked", eventDropped: "eventDropped" }, ngImport: i0, template: `
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
          (click)="dayClicked.emit({ date: day.date })"
          mwlDroppable
          (dragEnter)="day.dragOver = true"
          (dragLeave)="day.dragOver = false"
          (drop)="day.dragOver = false; eventDropped.emit({ event: $any($event).dropData.event, newStart: day.date })"
        >
          <b>{{ day.date | weekday: locale:'long' }}</b
          ><br />
          <span>{{ day.date | monthday: locale }}</span>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ days: days, locale: locale, dayClicked: dayClicked, eventDropped: eventDropped }"
    >
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "weekday": i2.WeekdayPipe, "monthday": i3.MonthDayPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaWeekHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-week-header',
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
          (click)="dayClicked.emit({ date: day.date })"
          mwlDroppable
          (dragEnter)="day.dragOver = true"
          (dragLeave)="day.dragOver = false"
          (drop)="day.dragOver = false; eventDropped.emit({ event: $any($event).dropData.event, newStart: day.date })"
        >
          <b>{{ day.date | weekday: locale:'long' }}</b
          ><br />
          <span>{{ day.date | monthday: locale }}</span>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ days: days, locale: locale, dayClicked: dayClicked, eventDropped: eventDropped }"
    >
    </ng-template>
  `,
                }]
        }], propDecorators: { days: [{
                type: Input
            }], locale: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], dayClicked: [{
                type: Output
            }], eventDropped: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhV2Vla0hlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2FnZW5kYS93ZWVrL0FnZW5kYVdlZWtIZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBSXBGLDRIQUE0SDtBQUM1SCxvR0FBb0c7QUFDcEcsMEdBQTBHO0FBaUMxRyxNQUFNLE9BQU8sMkJBQTJCO0lBaEN4QztRQTJDRSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQXlDLENBQUM7UUFHdkUsaUJBQVksR0FBMkQsSUFBSSxZQUFZLEVBQTRDLENBQUM7S0FDckk7O3lIQWZZLDJCQUEyQjs2R0FBM0IsMkJBQTJCLGtOQTlCNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlQ7NEZBRVUsMkJBQTJCO2tCQWhDdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QlQ7aUJBQ0Y7OEJBR0MsSUFBSTtzQkFESCxLQUFLO2dCQUlOLE1BQU07c0JBREwsS0FBSztnQkFJTixjQUFjO3NCQURiLEtBQUs7Z0JBSU4sVUFBVTtzQkFEVCxNQUFNO2dCQUlQLFlBQVk7c0JBRFgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCwgV2Vla0RheSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5cbi8vIFRPRE86IFRoaXMgY29tcG9uZW50IGNvbnRhaW5zIHJlZmVyZW5jZXMgdG8gdGhlIGFuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSBsaWJyYXJ5LCB3aGljaCB3ZSdyZSBub3QgY3VycmVudGx5IGltcG9ydGluZy5cbi8vIFRoaXMgaW5jbHVkZXMgcHJvcGVydGllcyBvbiB0aGUgZHJhZy1kcm9wIGV2ZW50IHRoYXQgY2FuIG5ldmVyIGJlIHRoZXJlLiBTaG91bGQgaXQgYmUgY2xlYW5lZCB1cD9cbi8vIGh0dHBzOi8vbWF0dGxld2lzLWdpdGh1Yi5jb20vYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlL2RvY3MvZGlyZWN0aXZlcy9Ecm9wcGFibGVEaXJlY3RpdmUuaHRtbCNzb3VyY2VcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYWdlbmRhLXdlZWstaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5LWhlYWRlcnNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWhlYWRlclwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXBhc3RdPVwiZGF5LmlzUGFzdFwiXG4gICAgICAgICAgW2NsYXNzLmNhbC10b2RheV09XCJkYXkuaXNUb2RheVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1mdXR1cmVdPVwiZGF5LmlzRnV0dXJlXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXdlZWtlbmRdPVwiZGF5LmlzV2Vla2VuZFwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1kcmFnLW92ZXJdPVwiZGF5LmRyYWdPdmVyXCJcbiAgICAgICAgICAoY2xpY2spPVwiZGF5Q2xpY2tlZC5lbWl0KHsgZGF0ZTogZGF5LmRhdGUgfSlcIlxuICAgICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAgIChkcmFnRW50ZXIpPVwiZGF5LmRyYWdPdmVyID0gdHJ1ZVwiXG4gICAgICAgICAgKGRyYWdMZWF2ZSk9XCJkYXkuZHJhZ092ZXIgPSBmYWxzZVwiXG4gICAgICAgICAgKGRyb3ApPVwiZGF5LmRyYWdPdmVyID0gZmFsc2U7IGV2ZW50RHJvcHBlZC5lbWl0KHsgZXZlbnQ6ICRhbnkoJGV2ZW50KS5kcm9wRGF0YS5ldmVudCwgbmV3U3RhcnQ6IGRheS5kYXRlIH0pXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxiPnt7IGRheS5kYXRlIHwgd2Vla2RheTogbG9jYWxlOidsb25nJyB9fTwvYlxuICAgICAgICAgID48YnIgLz5cbiAgICAgICAgICA8c3Bhbj57eyBkYXkuZGF0ZSB8IG1vbnRoZGF5OiBsb2NhbGUgfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBkYXlzOiBkYXlzLCBsb2NhbGU6IGxvY2FsZSwgZGF5Q2xpY2tlZDogZGF5Q2xpY2tlZCwgZXZlbnREcm9wcGVkOiBldmVudERyb3BwZWQgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BZ2VuZGFXZWVrSGVhZGVyRWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGRheXM6IFdlZWtEYXlbXTtcblxuICBASW5wdXQoKVxuICBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KClcbiAgZGF5Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlLCBldmVudD86IENhbGVuZGFyRXZlbnQgfT4oKTtcblxuICBAT3V0cHV0KClcbiAgZXZlbnREcm9wcGVkOiBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudDsgbmV3U3RhcnQ6IERhdGUgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7IG5ld1N0YXJ0OiBEYXRlIH0+KCk7XG59XG4iXX0=