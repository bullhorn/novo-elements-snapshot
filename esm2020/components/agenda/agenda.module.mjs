// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoAgendaWeekViewElement } from './week/agenda-week-view';
import { NovoAgendaWeekHeaderElement } from './week/agenda-week-header';
import { NovoAgendaWeekEventElement } from './week/agenda-week-event';
import { YearPipe } from './pipe/year.pipe';
import { WeekdayPipe } from './pipe/weekday.pipe';
import { MonthDayPipe } from './pipe/month-day.pipe';
import { MonthPipe } from './pipe/month.pipe';
import { HoursPipe } from './pipe/hours.pipe';
import { EndOfWeekDisplayPipe } from './pipe/end-of-week-display-pipe.pipe';
import { DayOfMonthPipe } from './pipe/day-of-month.pipe';
import { NovoAgendaMonthViewElement } from './month/agenda-month-view';
import { NovoAgendaMonthHeaderElement } from './month/agenda-month-header';
import { NovoAgendaMonthDayElement } from './month/agenda-month-day';
import { NovoAgendaHourSegmentElement } from './day/agenda-hour-segment';
import { NovoAgendaDayViewElement } from './day/agenda-day-view';
import { NovoAgendaDayEventElement } from './day/agenda-day-event';
import { NovoAgendaAllDayEventElement } from './day/agenda-all-day-event';
import { NovoEventTypeLegendElement } from './common/event-type-legend';
import { NovoAgendaDateChangeElement } from './common/agenda-date-change';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoPipesModule } from 'novo-elements/pipes';
import * as i0 from "@angular/core";
export class NovoAgendaModule {
}
NovoAgendaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoAgendaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaModule, declarations: [NovoEventTypeLegendElement,
        NovoAgendaMonthViewElement,
        NovoAgendaMonthHeaderElement,
        NovoAgendaMonthDayElement,
        NovoAgendaWeekViewElement,
        NovoAgendaWeekHeaderElement,
        NovoAgendaWeekEventElement,
        NovoAgendaDayViewElement,
        NovoAgendaDayEventElement,
        NovoAgendaHourSegmentElement,
        NovoAgendaAllDayEventElement,
        NovoAgendaDateChangeElement,
        WeekdayPipe,
        DayOfMonthPipe,
        MonthPipe,
        MonthDayPipe,
        YearPipe,
        HoursPipe,
        EndOfWeekDisplayPipe], imports: [CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule], exports: [NovoEventTypeLegendElement,
        NovoAgendaMonthViewElement,
        NovoAgendaMonthHeaderElement,
        NovoAgendaMonthDayElement,
        NovoAgendaWeekViewElement,
        NovoAgendaWeekHeaderElement,
        NovoAgendaWeekEventElement,
        NovoAgendaDayViewElement,
        NovoAgendaDayEventElement,
        NovoAgendaHourSegmentElement,
        NovoAgendaAllDayEventElement,
        NovoAgendaDateChangeElement,
        WeekdayPipe,
        DayOfMonthPipe,
        MonthPipe,
        MonthDayPipe,
        YearPipe,
        HoursPipe,
        EndOfWeekDisplayPipe] });
NovoAgendaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaModule, imports: [[CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAgendaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule],
                    declarations: [
                        NovoEventTypeLegendElement,
                        NovoAgendaMonthViewElement,
                        NovoAgendaMonthHeaderElement,
                        NovoAgendaMonthDayElement,
                        NovoAgendaWeekViewElement,
                        NovoAgendaWeekHeaderElement,
                        NovoAgendaWeekEventElement,
                        NovoAgendaDayViewElement,
                        NovoAgendaDayEventElement,
                        NovoAgendaHourSegmentElement,
                        NovoAgendaAllDayEventElement,
                        NovoAgendaDateChangeElement,
                        WeekdayPipe,
                        DayOfMonthPipe,
                        MonthPipe,
                        MonthDayPipe,
                        YearPipe,
                        HoursPipe,
                        EndOfWeekDisplayPipe,
                    ],
                    exports: [
                        NovoEventTypeLegendElement,
                        NovoAgendaMonthViewElement,
                        NovoAgendaMonthHeaderElement,
                        NovoAgendaMonthDayElement,
                        NovoAgendaWeekViewElement,
                        NovoAgendaWeekHeaderElement,
                        NovoAgendaWeekEventElement,
                        NovoAgendaDayViewElement,
                        NovoAgendaDayEventElement,
                        NovoAgendaHourSegmentElement,
                        NovoAgendaAllDayEventElement,
                        NovoAgendaDateChangeElement,
                        WeekdayPipe,
                        DayOfMonthPipe,
                        MonthPipe,
                        MonthDayPipe,
                        YearPipe,
                        HoursPipe,
                        EndOfWeekDisplayPipe,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmRhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvYWdlbmRhL2FnZW5kYS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUErQ3RELE1BQU0sT0FBTyxnQkFBZ0I7OzhHQUFoQixnQkFBZ0I7K0dBQWhCLGdCQUFnQixpQkExQ3pCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLDRCQUE0QjtRQUM1Qiw0QkFBNEI7UUFDNUIsMkJBQTJCO1FBQzNCLFdBQVc7UUFDWCxjQUFjO1FBQ2QsU0FBUztRQUNULFlBQVk7UUFDWixRQUFRO1FBQ1IsU0FBUztRQUNULG9CQUFvQixhQXBCWixZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxhQXVCMUUsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQiw0QkFBNEI7UUFDNUIseUJBQXlCO1FBQ3pCLHlCQUF5QjtRQUN6QiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLHdCQUF3QjtRQUN4Qix5QkFBeUI7UUFDekIsNEJBQTRCO1FBQzVCLDRCQUE0QjtRQUM1QiwyQkFBMkI7UUFDM0IsV0FBVztRQUNYLGNBQWM7UUFDZCxTQUFTO1FBQ1QsWUFBWTtRQUNaLFFBQVE7UUFDUixTQUFTO1FBQ1Qsb0JBQW9COytHQUdYLGdCQUFnQixZQTVDbEIsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDOzRGQTRDbEUsZ0JBQWdCO2tCQTdDNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDO29CQUM3RSxZQUFZLEVBQUU7d0JBQ1osMEJBQTBCO3dCQUMxQiwwQkFBMEI7d0JBQzFCLDRCQUE0Qjt3QkFDNUIseUJBQXlCO3dCQUN6Qix5QkFBeUI7d0JBQ3pCLDJCQUEyQjt3QkFDM0IsMEJBQTBCO3dCQUMxQix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsNEJBQTRCO3dCQUM1Qiw0QkFBNEI7d0JBQzVCLDJCQUEyQjt3QkFDM0IsV0FBVzt3QkFDWCxjQUFjO3dCQUNkLFNBQVM7d0JBQ1QsWUFBWTt3QkFDWixRQUFRO3dCQUNSLFNBQVM7d0JBQ1Qsb0JBQW9CO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsMEJBQTBCO3dCQUMxQiwwQkFBMEI7d0JBQzFCLDRCQUE0Qjt3QkFDNUIseUJBQXlCO3dCQUN6Qix5QkFBeUI7d0JBQ3pCLDJCQUEyQjt3QkFDM0IsMEJBQTBCO3dCQUMxQix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsNEJBQTRCO3dCQUM1Qiw0QkFBNEI7d0JBQzVCLDJCQUEyQjt3QkFDM0IsV0FBVzt3QkFDWCxjQUFjO3dCQUNkLFNBQVM7d0JBQ1QsWUFBWTt3QkFDWixRQUFRO3dCQUNSLFNBQVM7d0JBQ1Qsb0JBQW9CO3FCQUNyQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhV2Vla1ZpZXdFbGVtZW50IH0gZnJvbSAnLi93ZWVrL2FnZW5kYS13ZWVrLXZpZXcnO1xuaW1wb3J0IHsgTm92b0FnZW5kYVdlZWtIZWFkZXJFbGVtZW50IH0gZnJvbSAnLi93ZWVrL2FnZW5kYS13ZWVrLWhlYWRlcic7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhV2Vla0V2ZW50RWxlbWVudCB9IGZyb20gJy4vd2Vlay9hZ2VuZGEtd2Vlay1ldmVudCc7XG5pbXBvcnQgeyBZZWFyUGlwZSB9IGZyb20gJy4vcGlwZS95ZWFyLnBpcGUnO1xuaW1wb3J0IHsgV2Vla2RheVBpcGUgfSBmcm9tICcuL3BpcGUvd2Vla2RheS5waXBlJztcbmltcG9ydCB7IE1vbnRoRGF5UGlwZSB9IGZyb20gJy4vcGlwZS9tb250aC1kYXkucGlwZSc7XG5pbXBvcnQgeyBNb250aFBpcGUgfSBmcm9tICcuL3BpcGUvbW9udGgucGlwZSc7XG5pbXBvcnQgeyBIb3Vyc1BpcGUgfSBmcm9tICcuL3BpcGUvaG91cnMucGlwZSc7XG5pbXBvcnQgeyBFbmRPZldlZWtEaXNwbGF5UGlwZSB9IGZyb20gJy4vcGlwZS9lbmQtb2Ytd2Vlay1kaXNwbGF5LXBpcGUucGlwZSc7XG5pbXBvcnQgeyBEYXlPZk1vbnRoUGlwZSB9IGZyb20gJy4vcGlwZS9kYXktb2YtbW9udGgucGlwZSc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhTW9udGhWaWV3RWxlbWVudCB9IGZyb20gJy4vbW9udGgvYWdlbmRhLW1vbnRoLXZpZXcnO1xuaW1wb3J0IHsgTm92b0FnZW5kYU1vbnRoSGVhZGVyRWxlbWVudCB9IGZyb20gJy4vbW9udGgvYWdlbmRhLW1vbnRoLWhlYWRlcic7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhTW9udGhEYXlFbGVtZW50IH0gZnJvbSAnLi9tb250aC9hZ2VuZGEtbW9udGgtZGF5JztcbmltcG9ydCB7IE5vdm9BZ2VuZGFIb3VyU2VnbWVudEVsZW1lbnQgfSBmcm9tICcuL2RheS9hZ2VuZGEtaG91ci1zZWdtZW50JztcbmltcG9ydCB7IE5vdm9BZ2VuZGFEYXlWaWV3RWxlbWVudCB9IGZyb20gJy4vZGF5L2FnZW5kYS1kYXktdmlldyc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhRGF5RXZlbnRFbGVtZW50IH0gZnJvbSAnLi9kYXkvYWdlbmRhLWRheS1ldmVudCc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhQWxsRGF5RXZlbnRFbGVtZW50IH0gZnJvbSAnLi9kYXkvYWdlbmRhLWFsbC1kYXktZXZlbnQnO1xuaW1wb3J0IHsgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbi9ldmVudC10eXBlLWxlZ2VuZCc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhRGF0ZUNoYW5nZUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbi9hZ2VuZGEtZGF0ZS1jaGFuZ2UnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvdG9vbHRpcCc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3BpcGVzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgTm92b1Rvb2x0aXBNb2R1bGUsIE5vdm9QaXBlc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9FdmVudFR5cGVMZWdlbmRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFNb250aFZpZXdFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFNb250aEhlYWRlckVsZW1lbnQsXG4gICAgTm92b0FnZW5kYU1vbnRoRGF5RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhV2Vla1ZpZXdFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFXZWVrSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhV2Vla0V2ZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhRGF5Vmlld0VsZW1lbnQsXG4gICAgTm92b0FnZW5kYURheUV2ZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhSG91clNlZ21lbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFBbGxEYXlFdmVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYURhdGVDaGFuZ2VFbGVtZW50LFxuICAgIFdlZWtkYXlQaXBlLFxuICAgIERheU9mTW9udGhQaXBlLFxuICAgIE1vbnRoUGlwZSxcbiAgICBNb250aERheVBpcGUsXG4gICAgWWVhclBpcGUsXG4gICAgSG91cnNQaXBlLFxuICAgIEVuZE9mV2Vla0Rpc3BsYXlQaXBlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYU1vbnRoVmlld0VsZW1lbnQsXG4gICAgTm92b0FnZW5kYU1vbnRoSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhTW9udGhEYXlFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFXZWVrVmlld0VsZW1lbnQsXG4gICAgTm92b0FnZW5kYVdlZWtIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFXZWVrRXZlbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFEYXlWaWV3RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhRGF5RXZlbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFIb3VyU2VnbWVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYUFsbERheUV2ZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhRGF0ZUNoYW5nZUVsZW1lbnQsXG4gICAgV2Vla2RheVBpcGUsXG4gICAgRGF5T2ZNb250aFBpcGUsXG4gICAgTW9udGhQaXBlLFxuICAgIE1vbnRoRGF5UGlwZSxcbiAgICBZZWFyUGlwZSxcbiAgICBIb3Vyc1BpcGUsXG4gICAgRW5kT2ZXZWVrRGlzcGxheVBpcGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BZ2VuZGFNb2R1bGUge31cbiJdfQ==