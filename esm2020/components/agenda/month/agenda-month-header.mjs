import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { addMonths, subMonths } from 'date-fns';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/components/button";
import * as i2 from "@angular/common";
import * as i3 from "../pipe/month.pipe";
import * as i4 from "../pipe/weekday.pipe";
export class NovoAgendaMonthHeaderElement {
    constructor() {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    prevMonth(event) {
        this.viewDateChange.emit(subMonths(this.viewDate, 1));
    }
    nextMonth(event) {
        this.viewDateChange.emit(addMonths(this.viewDate, 1));
    }
}
NovoAgendaMonthHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaMonthHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaMonthHeaderElement, selector: "novo-agenda-month-header", inputs: { viewDate: "viewDate", days: "days", locale: "locale", customTemplate: "customTemplate" }, outputs: { viewDateChange: "viewDateChange" }, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "month": i3.MonthPipe, "weekday": i4.WeekdayPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-agenda-month-header',
                    encapsulation: ViewEncapsulation.None,
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
  `,
                }]
        }], propDecorators: { viewDate: [{
                type: Input
            }], days: [{
                type: Input
            }], locale: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], viewDateChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmRhLW1vbnRoLWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvYWdlbmRhL21vbnRoL2FnZW5kYS1tb250aC1oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkcsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7OztBQW1DaEQsTUFBTSxPQUFPLDRCQUE0QjtJQWhDekM7UUE2Q0U7O1dBRUc7UUFFSCxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0tBU3pEO0lBUEMsU0FBUyxDQUFDLEtBQVk7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVk7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOzswSEF6QlUsNEJBQTRCOzhHQUE1Qiw0QkFBNEIsbU5BN0I3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUOzRGQUVVLDRCQUE0QjtrQkFoQ3hDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUO2lCQUNGOzhCQUdDLFFBQVE7c0JBRFAsS0FBSztnQkFJTixJQUFJO3NCQURILEtBQUs7Z0JBSU4sTUFBTTtzQkFETCxLQUFLO2dCQUlOLGNBQWM7c0JBRGIsS0FBSztnQkFPTixjQUFjO3NCQURiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhZGRNb250aHMsIHN1Yk1vbnRocyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IFdlZWtEYXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZ2VuZGEtbW9udGgtaGVhZGVyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJhZ2VuZGEtaGVhZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZ2VuZGEtaGVhZGVyLXRvcFwiPlxuICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwicHJldmlvdXNcIiAoY2xpY2spPVwicHJldk1vbnRoKCRldmVudClcIj48L25vdm8tYnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZ2VuZGEtbW9udGhcIj57eyB2aWV3RGF0ZSB8IG1vbnRoOiBsb2NhbGUgfX08L2Rpdj5cbiAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cIm5leHRcIiAoY2xpY2spPVwibmV4dE1vbnRoKCRldmVudClcIj48L25vdm8tYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFnZW5kYS13ZWVrZGF5c1wiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiYWdlbmRhLXdlZWtkYXlcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzXCJcbiAgICAgICAgICAgIFtjbGFzcy5hZ2VuZGEtcGFzdF09XCJkYXkuaXNQYXN0XCJcbiAgICAgICAgICAgIFtjbGFzcy5hZ2VuZGEtdG9kYXldPVwiZGF5LmlzVG9kYXlcIlxuICAgICAgICAgICAgW2NsYXNzLmFnZW5kYS1mdXR1cmVdPVwiZGF5LmlzRnV0dXJlXCJcbiAgICAgICAgICAgIFtjbGFzcy5hZ2VuZGEtd2Vla2VuZF09XCJkYXkuaXNXZWVrZW5kXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBkYXkuZGF0ZSB8IHdlZWtkYXk6IGxvY2FsZSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZGF5czogZGF5cywgbG9jYWxlOiBsb2NhbGUsIHZpZXdEYXRlOiB2aWV3RGF0ZSB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FnZW5kYU1vbnRoSGVhZGVyRWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIHZpZXdEYXRlOiBEYXRlO1xuXG4gIEBJbnB1dCgpXG4gIGRheXM6IFdlZWtEYXlbXTtcblxuICBASW5wdXQoKVxuICBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcmV2TW9udGgoZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KHN1Yk1vbnRocyh0aGlzLnZpZXdEYXRlLCAxKSk7XG4gIH1cblxuICBuZXh0TW9udGgoZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZE1vbnRocyh0aGlzLnZpZXdEYXRlLCAxKSk7XG4gIH1cbn1cbiJdfQ==