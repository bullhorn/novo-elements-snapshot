import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, LOCALE_ID, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import * as dateFns from 'date-fns';
import { getMonthView, getWeekViewHeader, } from 'novo-elements/utils';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./agenda-month-header";
import * as i2 from "./agenda-month-day";
import * as i3 from "@angular/common";
/**
 * Shows all events on a given month. Example usage:
 *
 * ```
 * &lt;novo-agenda-month-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-agenda-month-view&gt;
 * ```
 */
export class NovoAgendaMonthViewElement {
    /**
     * @hidden
     */
    constructor(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * The locale used to format dates
         */
        this.locale = 'en-US';
        /**
         * The placement of the event tooltip
         */
        this.tooltipPosition = 'top';
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        this.viewDateChange = new EventEmitter();
        this.locale = locale;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (changes.viewDate || changes.excludeDays) {
            this.refreshHeader();
        }
        if (changes.viewDate || changes.events || changes.excludeDays) {
            this.refreshBody();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    eventDropped(day, event) {
        const year = dateFns.getYear(day.date);
        const month = dateFns.getMonth(day.date);
        const date = dateFns.getDate(day.date);
        const newStart = dateFns.setYear(dateFns.setMonth(dateFns.setDate(event.start, date), month), year);
        let newEnd;
        if (event.end) {
            const secondsDiff = dateFns.differenceInSeconds(newStart, event.start);
            newEnd = dateFns.addSeconds(event.end, secondsDiff);
        }
        this.eventTimesChanged.emit({ event, newStart, newEnd });
    }
    refreshHeader() {
        this.columnHeaders = getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
        });
    }
    refreshBody() {
        this.view = getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
        });
        if (this.dayModifier) {
            this.view.days.forEach((day) => this.dayModifier(day));
        }
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.viewDateChange.emit(this.viewDate);
    }
}
NovoAgendaMonthViewElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthViewElement, deps: [{ token: i0.ChangeDetectorRef }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component });
NovoAgendaMonthViewElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAgendaMonthViewElement, selector: "novo-agenda-month", inputs: { viewDate: "viewDate", events: "events", excludeDays: "excludeDays", dayModifier: "dayModifier", refresh: "refresh", locale: "locale", tooltipPosition: "tooltipPosition", weekStartsOn: "weekStartsOn", headerTemplate: "headerTemplate", cellTemplate: "cellTemplate" }, outputs: { dayClicked: "dayClicked", eventClicked: "eventClicked", eventTimesChanged: "eventTimesChanged", viewDateChange: "viewDateChange" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="agenda-month-view">
      <novo-agenda-month-header
        [(viewDate)]="viewDate"
        [days]="columnHeaders"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (viewDateChange)="refreshAll()"
      >
      </novo-agenda-month-header>
      <div class="agenda-days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="agenda-cell-row">
            <novo-agenda-month-day
              *ngFor="let day of view.days | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek"
              [day]="day"
              [locale]="locale"
              [customTemplate]="cellTemplate"
              (click)="dayClicked.emit({ day: day })"
              (eventClicked)="eventClicked.emit({ day: day, event: $event.event })"
            >
            </novo-agenda-month-day>
          </div>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [".agenda-month-view{background-color:var(--color-background)}.agenda-month-view .agenda-header{display:flex;flex-flow:column;text-align:center;font-weight:bolder;border-bottom:2px solid #e1e1e1}.agenda-month-view .agenda-header .agenda-header-top{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-around}.agenda-month-view .agenda-header .agenda-header-top .agenda-month{font-size:180%}.agenda-month-view .agenda-header .agenda-header-top .agenda-year{color:#999}.agenda-month-view .agenda-header .agenda-weekdays{display:flex;flex-flow:row nowrap}.agenda-month-view .agenda-header .agenda-weekdays .agenda-weekday{padding:5px 0;overflow:hidden;text-overflow:ellipsis;display:block;white-space:nowrap;flex:1}.agenda-month-view .agenda-cell-row{display:flex}.agenda-month-view .agenda-cell-row:hover{background-color:#fafafa}.agenda-month-view .agenda-cell-row .agenda-cell:hover,.agenda-month-view .agenda-cell.agenda-has-events.agenda-open{background-color:#ededed}.agenda-month-view .agenda-days{border:1px solid #e1e1e1;border-bottom:0}.agenda-month-view .agenda-day-top{display:flex;flex-flow:row nowrap;align-items:center;justify-content:flex-end}.agenda-month-view .agenda-cell:hover .agenda-actions{display:flex}.agenda-month-view .agenda-cell{float:left;flex:1;display:flex;flex-direction:column;align-items:stretch;position:relative}.agenda-month-view .agenda-day-cell{min-height:56px}.agenda-month-view .agenda-day-cell:not(:last-child){border-right:1px solid #e1e1e1}.agenda-month-view .agenda-days .agenda-cell-row{border-bottom:1px solid #e1e1e1}.agenda-month-view .agenda-day-badge{background-color:#b94a48;display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:middle;border-radius:10px}.agenda-month-view .agenda-day-number{font-size:1.2em;font-weight:400;opacity:.5;padding:4px}.agenda-month-view .agenda-event{width:22px;height:22px;border-radius:4px;display:inline-block;margin:2px;vertical-align:middle;text-align:center;line-height:22px;font-size:12px;color:var(--color-background)}.agenda-month-view .agenda-day-cell.agenda-in-month.agenda-has-events{cursor:pointer}.agenda-month-view .agenda-day-cell.agenda-out-month .agenda-day-number{opacity:.1;cursor:default}.agenda-month-view .agenda-day-cell.agenda-weekend .agenda-day-number{color:#8b0000}.agenda-month-view .agenda-day-cell.agenda-today{background-color:#e8fde7}.agenda-month-view .agenda-day-cell.agenda-today .agenda-day-number{color:var(--color-text)}.agenda-month-view .agenda-day-cell.agenda-drag-over{background-color:#e0e0e0!important}.agenda-month-view .agenda-open-day-events{padding:15px;color:#fff;background-color:#555;box-shadow:inset 0 0 15px #00000080}.agenda-month-view .agenda-open-day-events .agenda-event{position:relative;top:2px}.agenda-month-view .agenda-event-title{color:#fff}.agenda-month-view .agenda-out-month .agenda-day-badge,.agenda-month-view .agenda-out-month .agenda-event{opacity:.3}\n"], components: [{ type: i1.NovoAgendaMonthHeaderElement, selector: "novo-agenda-month-header", inputs: ["viewDate", "days", "locale", "customTemplate"], outputs: ["viewDateChange"] }, { type: i2.NovoAgendaMonthDayElement, selector: "novo-agenda-month-day", inputs: ["day", "locale", "tooltipPosition", "customTemplate"], outputs: ["eventClicked"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "slice": i3.SlicePipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaMonthViewElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-agenda-month', encapsulation: ViewEncapsulation.None, template: `
    <div class="agenda-month-view">
      <novo-agenda-month-header
        [(viewDate)]="viewDate"
        [days]="columnHeaders"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (viewDateChange)="refreshAll()"
      >
      </novo-agenda-month-header>
      <div class="agenda-days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="agenda-cell-row">
            <novo-agenda-month-day
              *ngFor="let day of view.days | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek"
              [day]="day"
              [locale]="locale"
              [customTemplate]="cellTemplate"
              (click)="dayClicked.emit({ day: day })"
              (eventClicked)="eventClicked.emit({ day: day, event: $event.event })"
            >
            </novo-agenda-month-day>
          </div>
        </div>
      </div>
    </div>
  `, styles: [".agenda-month-view{background-color:var(--color-background)}.agenda-month-view .agenda-header{display:flex;flex-flow:column;text-align:center;font-weight:bolder;border-bottom:2px solid #e1e1e1}.agenda-month-view .agenda-header .agenda-header-top{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-around}.agenda-month-view .agenda-header .agenda-header-top .agenda-month{font-size:180%}.agenda-month-view .agenda-header .agenda-header-top .agenda-year{color:#999}.agenda-month-view .agenda-header .agenda-weekdays{display:flex;flex-flow:row nowrap}.agenda-month-view .agenda-header .agenda-weekdays .agenda-weekday{padding:5px 0;overflow:hidden;text-overflow:ellipsis;display:block;white-space:nowrap;flex:1}.agenda-month-view .agenda-cell-row{display:flex}.agenda-month-view .agenda-cell-row:hover{background-color:#fafafa}.agenda-month-view .agenda-cell-row .agenda-cell:hover,.agenda-month-view .agenda-cell.agenda-has-events.agenda-open{background-color:#ededed}.agenda-month-view .agenda-days{border:1px solid #e1e1e1;border-bottom:0}.agenda-month-view .agenda-day-top{display:flex;flex-flow:row nowrap;align-items:center;justify-content:flex-end}.agenda-month-view .agenda-cell:hover .agenda-actions{display:flex}.agenda-month-view .agenda-cell{float:left;flex:1;display:flex;flex-direction:column;align-items:stretch;position:relative}.agenda-month-view .agenda-day-cell{min-height:56px}.agenda-month-view .agenda-day-cell:not(:last-child){border-right:1px solid #e1e1e1}.agenda-month-view .agenda-days .agenda-cell-row{border-bottom:1px solid #e1e1e1}.agenda-month-view .agenda-day-badge{background-color:#b94a48;display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:middle;border-radius:10px}.agenda-month-view .agenda-day-number{font-size:1.2em;font-weight:400;opacity:.5;padding:4px}.agenda-month-view .agenda-event{width:22px;height:22px;border-radius:4px;display:inline-block;margin:2px;vertical-align:middle;text-align:center;line-height:22px;font-size:12px;color:var(--color-background)}.agenda-month-view .agenda-day-cell.agenda-in-month.agenda-has-events{cursor:pointer}.agenda-month-view .agenda-day-cell.agenda-out-month .agenda-day-number{opacity:.1;cursor:default}.agenda-month-view .agenda-day-cell.agenda-weekend .agenda-day-number{color:#8b0000}.agenda-month-view .agenda-day-cell.agenda-today{background-color:#e8fde7}.agenda-month-view .agenda-day-cell.agenda-today .agenda-day-number{color:var(--color-text)}.agenda-month-view .agenda-day-cell.agenda-drag-over{background-color:#e0e0e0!important}.agenda-month-view .agenda-open-day-events{padding:15px;color:#fff;background-color:#555;box-shadow:inset 0 0 15px #00000080}.agenda-month-view .agenda-open-day-events .agenda-event{position:relative;top:2px}.agenda-month-view .agenda-event-title{color:#fff}.agenda-month-view .agenda-out-month .agenda-day-badge,.agenda-month-view .agenda-out-month .agenda-event{opacity:.3}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; }, propDecorators: { viewDate: [{
                type: Input
            }], events: [{
                type: Input
            }], excludeDays: [{
                type: Input
            }], dayModifier: [{
                type: Input
            }], refresh: [{
                type: Input
            }], locale: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], weekStartsOn: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], cellTemplate: [{
                type: Input
            }], dayClicked: [{
                type: Output
            }], eventClicked: [{
                type: Output
            }], eventTimesChanged: [{
                type: Output
            }], viewDateChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmRhLW1vbnRoLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2FnZW5kYS9tb250aC9hZ2VuZGEtbW9udGgtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBSVQsTUFBTSxFQUNOLFdBQVcsRUFDWCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUdMLFlBQVksRUFDWixpQkFBaUIsR0FJbEIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFFN0M7Ozs7Ozs7OztHQVNHO0FBaUNILE1BQU0sT0FBTywwQkFBMEI7SUFrR3JDOztPQUVHO0lBQ0gsWUFBb0IsR0FBc0IsRUFBcUIsTUFBYztRQUF6RCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTlGMUM7O1dBRUc7UUFFSCxXQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUU3Qjs7V0FFRztRQUVILGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBZTNCOztXQUVHO1FBRUgsV0FBTSxHQUFXLE9BQU8sQ0FBQztRQUV6Qjs7V0FFRztRQUVILG9CQUFlLEdBQVcsS0FBSyxDQUFDO1FBb0JoQzs7V0FFRztRQUVILGVBQVUsR0FBd0MsSUFBSSxZQUFZLEVBQXlCLENBQUM7UUFFNUY7O1dBRUc7UUFFSCxpQkFBWSxHQUFxRCxJQUFJLFlBQVksRUFBc0MsQ0FBQztRQUV4SDs7V0FFRztRQUVILHNCQUFpQixHQUFpRCxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUdySCxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBcUI1RCxJ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eEQ7SUFDSCxDQUFDO0lBRU0sVUFBVTtRQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7O3dIQWxMVSwwQkFBMEIsbURBcUdlLFNBQVM7NEdBckdsRCwwQkFBMEIsaWZBNUIzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQlQ7NEZBRVUsMEJBQTBCO2tCQWhDdEMsU0FBUzsrQkFDRSxtQkFBbUIsaUJBQ2QsaUJBQWlCLENBQUMsSUFBSSxZQUUzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQlQ7OzBCQXVHNEMsTUFBTTsyQkFBQyxTQUFTOzRDQWhHN0QsUUFBUTtzQkFEUCxLQUFLO2dCQU9OLE1BQU07c0JBREwsS0FBSztnQkFPTixXQUFXO3NCQURWLEtBQUs7Z0JBUU4sV0FBVztzQkFEVixLQUFLO2dCQU9OLE9BQU87c0JBRE4sS0FBSztnQkFPTixNQUFNO3NCQURMLEtBQUs7Z0JBT04sZUFBZTtzQkFEZCxLQUFLO2dCQU9OLFlBQVk7c0JBRFgsS0FBSztnQkFPTixjQUFjO3NCQURiLEtBQUs7Z0JBT04sWUFBWTtzQkFEWCxLQUFLO2dCQU9OLFVBQVU7c0JBRFQsTUFBTTtnQkFPUCxZQUFZO3NCQURYLE1BQU07Z0JBT1AsaUJBQWlCO3NCQURoQixNQUFNO2dCQUlQLGNBQWM7c0JBRGIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTE9DQUxFX0lELFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7XG4gIENhbGVuZGFyRXZlbnQsXG4gIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudCxcbiAgZ2V0TW9udGhWaWV3LFxuICBnZXRXZWVrVmlld0hlYWRlcixcbiAgTW9udGhWaWV3LFxuICBNb250aFZpZXdEYXksXG4gIFdlZWtEYXksXG59IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIG1vbnRoLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYFxuICogJmx0O25vdm8tYWdlbmRhLW1vbnRoLXZpZXdcbiAqICBbdmlld0RhdGVdPVwidmlld0RhdGVcIlxuICogIFtldmVudHNdPVwiZXZlbnRzXCImZ3Q7XG4gKiAmbHQ7L25vdm8tYWdlbmRhLW1vbnRoLXZpZXcmZ3Q7XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZ2VuZGEtbW9udGgnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi9hZ2VuZGEtbW9udGgtdmlldy5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFnZW5kYS1tb250aC12aWV3XCI+XG4gICAgICA8bm92by1hZ2VuZGEtbW9udGgtaGVhZGVyXG4gICAgICAgIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcbiAgICAgICAgW2RheXNdPVwiY29sdW1uSGVhZGVyc1wiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgKHZpZXdEYXRlQ2hhbmdlKT1cInJlZnJlc2hBbGwoKVwiXG4gICAgICA+XG4gICAgICA8L25vdm8tYWdlbmRhLW1vbnRoLWhlYWRlcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhZ2VuZGEtZGF5c1wiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCByb3dJbmRleCBvZiB2aWV3LnJvd09mZnNldHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWdlbmRhLWNlbGwtcm93XCI+XG4gICAgICAgICAgICA8bm92by1hZ2VuZGEtbW9udGgtZGF5XG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2Ygdmlldy5kYXlzIHwgc2xpY2U6IHJvd0luZGV4OnJvd0luZGV4ICsgdmlldy50b3RhbERheXNWaXNpYmxlSW5XZWVrXCJcbiAgICAgICAgICAgICAgW2RheV09XCJkYXlcIlxuICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJjZWxsVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwiZGF5Q2xpY2tlZC5lbWl0KHsgZGF5OiBkYXkgfSlcIlxuICAgICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZGF5OiBkYXksIGV2ZW50OiAkZXZlbnQuZXZlbnQgfSlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9ub3ZvLWFnZW5kYS1tb250aC1kYXk+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BZ2VuZGFNb250aFZpZXdFbGVtZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3XG4gICAqL1xuICBASW5wdXQoKVxuICBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgd2lsbCBiZSBoaWRkZW4gb24gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpXG4gIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIGVhY2ggY2VsbCBpcyByZW5kZXJlZC4gVGhlIGZpcnN0IGFyZ3VtZW50IHdpbGwgY29udGFpbiB0aGUgY2FsZW5kYXIgY2VsbC5cbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byB0aGUgY2VsbCBpdCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBjZWxsIGluIHRoZSB0ZW1wbGF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZGF5TW9kaWZpZXI6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgd2hlbiBlbWl0dGVkIG9uIHdpbGwgcmUtcmVuZGVyIHRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpXG4gIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcblxuICAvKipcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xuICAgKi9cbiAgQElucHV0KClcbiAgbG9jYWxlOiBzdHJpbmcgPSAnZW4tVVMnO1xuXG4gIC8qKlxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKVxuICB0b29sdGlwUG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xuXG4gIC8qKlxuICAgKiBUaGUgc3RhcnQgbnVtYmVyIG9mIHRoZSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKVxuICB3ZWVrU3RhcnRzT246IG51bWJlcjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhlYWRlclxuICAgKi9cbiAgQElucHV0KClcbiAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBkYXkgY2VsbFxuICAgKi9cbiAgQElucHV0KClcbiAgY2VsbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZGF5IGNlbGwgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGRheUNsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGRheTogTW9udGhWaWV3RGF5IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGRheTogTW9udGhWaWV3RGF5IH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBldmVudCB0aXRsZSBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBkYXk6IGFueTsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgZGF5OiBhbnk7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIGRyYWdnZWQgYW5kIGRyb3BwZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBldmVudFRpbWVzQ2hhbmdlZDogRXZlbnRFbWl0dGVyPENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudD4oKTtcblxuICBAT3V0cHV0KClcbiAgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29sdW1uSGVhZGVyczogV2Vla0RheVtdO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2aWV3OiBNb250aFZpZXc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBASW5qZWN0KExPQ0FMRV9JRCkgbG9jYWxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSB0aGlzLnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQWxsKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZXhjbHVkZURheXMpIHtcbiAgICAgIHRoaXMucmVmcmVzaEhlYWRlcigpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy52aWV3RGF0ZSB8fCBjaGFuZ2VzLmV2ZW50cyB8fCBjaGFuZ2VzLmV4Y2x1ZGVEYXlzKSB7XG4gICAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBldmVudERyb3BwZWQoZGF5OiBNb250aFZpZXdEYXksIGV2ZW50OiBDYWxlbmRhckV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgeWVhcjogbnVtYmVyID0gZGF0ZUZucy5nZXRZZWFyKGRheS5kYXRlKTtcbiAgICBjb25zdCBtb250aDogbnVtYmVyID0gZGF0ZUZucy5nZXRNb250aChkYXkuZGF0ZSk7XG4gICAgY29uc3QgZGF0ZTogbnVtYmVyID0gZGF0ZUZucy5nZXREYXRlKGRheS5kYXRlKTtcbiAgICBjb25zdCBuZXdTdGFydDogRGF0ZSA9IGRhdGVGbnMuc2V0WWVhcihkYXRlRm5zLnNldE1vbnRoKGRhdGVGbnMuc2V0RGF0ZShldmVudC5zdGFydCwgZGF0ZSksIG1vbnRoKSwgeWVhcik7XG4gICAgbGV0IG5ld0VuZDogRGF0ZTtcbiAgICBpZiAoZXZlbnQuZW5kKSB7XG4gICAgICBjb25zdCBzZWNvbmRzRGlmZjogbnVtYmVyID0gZGF0ZUZucy5kaWZmZXJlbmNlSW5TZWNvbmRzKG5ld1N0YXJ0LCBldmVudC5zdGFydCk7XG4gICAgICBuZXdFbmQgPSBkYXRlRm5zLmFkZFNlY29uZHMoZXZlbnQuZW5kLCBzZWNvbmRzRGlmZik7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7IGV2ZW50LCBuZXdTdGFydCwgbmV3RW5kIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuY29sdW1uSGVhZGVycyA9IGdldFdlZWtWaWV3SGVhZGVyKHtcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoQm9keSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXcgPSBnZXRNb250aFZpZXcoe1xuICAgICAgZXZlbnRzOiB0aGlzLmV2ZW50cyxcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgIH0pO1xuICAgIGlmICh0aGlzLmRheU1vZGlmaWVyKSB7XG4gICAgICB0aGlzLnZpZXcuZGF5cy5mb3JFYWNoKChkYXkpID0+IHRoaXMuZGF5TW9kaWZpZXIoZGF5KSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgdGhpcy5yZWZyZXNoQm9keSgpO1xuICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdCh0aGlzLnZpZXdEYXRlKTtcbiAgfVxufVxuIl19