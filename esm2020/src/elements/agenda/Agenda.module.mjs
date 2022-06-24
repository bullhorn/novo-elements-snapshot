// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoAgendaDateChangeElement } from './common/AgendaDateChange';
// Common Elements
import { NovoEventTypeLegendElement } from './common/EventTypeLegend';
import { NovoAgendaAllDayEventElement } from './day/AgendaAllDayEvent';
import { NovoAgendaDayEventElement } from './day/AgendaDayEvent';
// Day View
import { NovoAgendaDayViewElement } from './day/AgendaDayView';
import { NovoAgendaHourSegmentElement } from './day/AgendaHourSegment';
import { NovoAgendaMonthDayElement } from './month/AgendaMonthDay';
import { NovoAgendaMonthHeaderElement } from './month/AgendaMonthHeader';
// Month View
import { NovoAgendaMonthViewElement } from './month/AgendaMonthView';
import { DayOfMonthPipe } from './pipe/DayOfMonth.pipe';
import { EndOfWeekDisplayPipe } from './pipe/EndOfWeekDisplayPipe.pipe';
import { HoursPipe } from './pipe/Hours.pipe';
import { MonthPipe } from './pipe/Month.pipe';
import { MonthDayPipe } from './pipe/MonthDay.pipe';
// Common
import { WeekdayPipe } from './pipe/Weekday.pipe';
import { YearPipe } from './pipe/Year.pipe';
import { NovoAgendaWeekEventElement } from './week/AgendaWeekEvent';
import { NovoAgendaWeekHeaderElement } from './week/AgendaWeekHeader';
// Week View
import { NovoAgendaWeekViewElement } from './week/AgendaWeekView';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2FnZW5kYS9BZ2VuZGEubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLGtCQUFrQjtBQUNsQixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRSxXQUFXO0FBQ1gsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekUsYUFBYTtBQUNiLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxTQUFTO0FBQ1QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxZQUFZO0FBQ1osT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBK0NsRSxNQUFNLE9BQU8sZ0JBQWdCOzs4R0FBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0IsaUJBMUN6QiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1Qix5QkFBeUI7UUFDekIseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFDNUIsNEJBQTRCO1FBQzVCLDJCQUEyQjtRQUMzQixXQUFXO1FBQ1gsY0FBYztRQUNkLFNBQVM7UUFDVCxZQUFZO1FBQ1osUUFBUTtRQUNSLFNBQVM7UUFDVCxvQkFBb0IsYUFwQlosWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsYUF1QjFFLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLDRCQUE0QjtRQUM1Qiw0QkFBNEI7UUFDNUIsMkJBQTJCO1FBQzNCLFdBQVc7UUFDWCxjQUFjO1FBQ2QsU0FBUztRQUNULFlBQVk7UUFDWixRQUFRO1FBQ1IsU0FBUztRQUNULG9CQUFvQjsrR0FHWCxnQkFBZ0IsWUE1Q2xCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQzs0RkE0Q2xFLGdCQUFnQjtrQkE3QzVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQztvQkFDN0UsWUFBWSxFQUFFO3dCQUNaLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQiw0QkFBNEI7d0JBQzVCLHlCQUF5Qjt3QkFDekIseUJBQXlCO3dCQUN6QiwyQkFBMkI7d0JBQzNCLDBCQUEwQjt3QkFDMUIsd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLDRCQUE0Qjt3QkFDNUIsNEJBQTRCO3dCQUM1QiwyQkFBMkI7d0JBQzNCLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxTQUFTO3dCQUNULFlBQVk7d0JBQ1osUUFBUTt3QkFDUixTQUFTO3dCQUNULG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQiw0QkFBNEI7d0JBQzVCLHlCQUF5Qjt3QkFDekIseUJBQXlCO3dCQUN6QiwyQkFBMkI7d0JBQzNCLDBCQUEwQjt3QkFDMUIsd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLDRCQUE0Qjt3QkFDNUIsNEJBQTRCO3dCQUM1QiwyQkFBMkI7d0JBQzNCLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxTQUFTO3dCQUNULFlBQVk7d0JBQ1osUUFBUTt3QkFDUixTQUFTO3dCQUNULG9CQUFvQjtxQkFDckI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b1BpcGVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvUGlwZXMubW9kdWxlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnLi4vdG9vbHRpcC9Ub29sdGlwLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhRGF0ZUNoYW5nZUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbi9BZ2VuZGFEYXRlQ2hhbmdlJztcbi8vIENvbW1vbiBFbGVtZW50c1xuaW1wb3J0IHsgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbi9FdmVudFR5cGVMZWdlbmQnO1xuaW1wb3J0IHsgTm92b0FnZW5kYUFsbERheUV2ZW50RWxlbWVudCB9IGZyb20gJy4vZGF5L0FnZW5kYUFsbERheUV2ZW50JztcbmltcG9ydCB7IE5vdm9BZ2VuZGFEYXlFdmVudEVsZW1lbnQgfSBmcm9tICcuL2RheS9BZ2VuZGFEYXlFdmVudCc7XG4vLyBEYXkgVmlld1xuaW1wb3J0IHsgTm92b0FnZW5kYURheVZpZXdFbGVtZW50IH0gZnJvbSAnLi9kYXkvQWdlbmRhRGF5Vmlldyc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhSG91clNlZ21lbnRFbGVtZW50IH0gZnJvbSAnLi9kYXkvQWdlbmRhSG91clNlZ21lbnQnO1xuaW1wb3J0IHsgTm92b0FnZW5kYU1vbnRoRGF5RWxlbWVudCB9IGZyb20gJy4vbW9udGgvQWdlbmRhTW9udGhEYXknO1xuaW1wb3J0IHsgTm92b0FnZW5kYU1vbnRoSGVhZGVyRWxlbWVudCB9IGZyb20gJy4vbW9udGgvQWdlbmRhTW9udGhIZWFkZXInO1xuLy8gTW9udGggVmlld1xuaW1wb3J0IHsgTm92b0FnZW5kYU1vbnRoVmlld0VsZW1lbnQgfSBmcm9tICcuL21vbnRoL0FnZW5kYU1vbnRoVmlldyc7XG5pbXBvcnQgeyBEYXlPZk1vbnRoUGlwZSB9IGZyb20gJy4vcGlwZS9EYXlPZk1vbnRoLnBpcGUnO1xuaW1wb3J0IHsgRW5kT2ZXZWVrRGlzcGxheVBpcGUgfSBmcm9tICcuL3BpcGUvRW5kT2ZXZWVrRGlzcGxheVBpcGUucGlwZSc7XG5pbXBvcnQgeyBIb3Vyc1BpcGUgfSBmcm9tICcuL3BpcGUvSG91cnMucGlwZSc7XG5pbXBvcnQgeyBNb250aFBpcGUgfSBmcm9tICcuL3BpcGUvTW9udGgucGlwZSc7XG5pbXBvcnQgeyBNb250aERheVBpcGUgfSBmcm9tICcuL3BpcGUvTW9udGhEYXkucGlwZSc7XG4vLyBDb21tb25cbmltcG9ydCB7IFdlZWtkYXlQaXBlIH0gZnJvbSAnLi9waXBlL1dlZWtkYXkucGlwZSc7XG5pbXBvcnQgeyBZZWFyUGlwZSB9IGZyb20gJy4vcGlwZS9ZZWFyLnBpcGUnO1xuaW1wb3J0IHsgTm92b0FnZW5kYVdlZWtFdmVudEVsZW1lbnQgfSBmcm9tICcuL3dlZWsvQWdlbmRhV2Vla0V2ZW50JztcbmltcG9ydCB7IE5vdm9BZ2VuZGFXZWVrSGVhZGVyRWxlbWVudCB9IGZyb20gJy4vd2Vlay9BZ2VuZGFXZWVrSGVhZGVyJztcbi8vIFdlZWsgVmlld1xuaW1wb3J0IHsgTm92b0FnZW5kYVdlZWtWaWV3RWxlbWVudCB9IGZyb20gJy4vd2Vlay9BZ2VuZGFXZWVrVmlldyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIE5vdm9Ub29sdGlwTW9kdWxlLCBOb3ZvUGlwZXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvRXZlbnRUeXBlTGVnZW5kRWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhTW9udGhWaWV3RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhTW9udGhIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFNb250aERheUVsZW1lbnQsXG4gICAgTm92b0FnZW5kYVdlZWtWaWV3RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhV2Vla0hlYWRlckVsZW1lbnQsXG4gICAgTm92b0FnZW5kYVdlZWtFdmVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYURheVZpZXdFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFEYXlFdmVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYUhvdXJTZWdtZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhQWxsRGF5RXZlbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFEYXRlQ2hhbmdlRWxlbWVudCxcbiAgICBXZWVrZGF5UGlwZSxcbiAgICBEYXlPZk1vbnRoUGlwZSxcbiAgICBNb250aFBpcGUsXG4gICAgTW9udGhEYXlQaXBlLFxuICAgIFllYXJQaXBlLFxuICAgIEhvdXJzUGlwZSxcbiAgICBFbmRPZldlZWtEaXNwbGF5UGlwZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9FdmVudFR5cGVMZWdlbmRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFNb250aFZpZXdFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFNb250aEhlYWRlckVsZW1lbnQsXG4gICAgTm92b0FnZW5kYU1vbnRoRGF5RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhV2Vla1ZpZXdFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFXZWVrSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhV2Vla0V2ZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhRGF5Vmlld0VsZW1lbnQsXG4gICAgTm92b0FnZW5kYURheUV2ZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhSG91clNlZ21lbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFBbGxEYXlFdmVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYURhdGVDaGFuZ2VFbGVtZW50LFxuICAgIFdlZWtkYXlQaXBlLFxuICAgIERheU9mTW9udGhQaXBlLFxuICAgIE1vbnRoUGlwZSxcbiAgICBNb250aERheVBpcGUsXG4gICAgWWVhclBpcGUsXG4gICAgSG91cnNQaXBlLFxuICAgIEVuZE9mV2Vla0Rpc3BsYXlQaXBlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWdlbmRhTW9kdWxlIHt9XG4iXX0=