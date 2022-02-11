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
export class NovoAgendaModule {
}
NovoAgendaModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9hZ2VuZGEvQWdlbmRhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxrQkFBa0I7QUFDbEIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsV0FBVztBQUNYLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQy9ELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pFLGFBQWE7QUFDYixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsU0FBUztBQUNULE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEUsWUFBWTtBQUNaLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBK0NsRSxNQUFNLE9BQU8sZ0JBQWdCOzs7WUE3QzVCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDO2dCQUM3RSxZQUFZLEVBQUU7b0JBQ1osMEJBQTBCO29CQUMxQiwwQkFBMEI7b0JBQzFCLDRCQUE0QjtvQkFDNUIseUJBQXlCO29CQUN6Qix5QkFBeUI7b0JBQ3pCLDJCQUEyQjtvQkFDM0IsMEJBQTBCO29CQUMxQix3QkFBd0I7b0JBQ3hCLHlCQUF5QjtvQkFDekIsNEJBQTRCO29CQUM1Qiw0QkFBNEI7b0JBQzVCLDJCQUEyQjtvQkFDM0IsV0FBVztvQkFDWCxjQUFjO29CQUNkLFNBQVM7b0JBQ1QsWUFBWTtvQkFDWixRQUFRO29CQUNSLFNBQVM7b0JBQ1Qsb0JBQW9CO2lCQUNyQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsMEJBQTBCO29CQUMxQiwwQkFBMEI7b0JBQzFCLDRCQUE0QjtvQkFDNUIseUJBQXlCO29CQUN6Qix5QkFBeUI7b0JBQ3pCLDJCQUEyQjtvQkFDM0IsMEJBQTBCO29CQUMxQix3QkFBd0I7b0JBQ3hCLHlCQUF5QjtvQkFDekIsNEJBQTRCO29CQUM1Qiw0QkFBNEI7b0JBQzVCLDJCQUEyQjtvQkFDM0IsV0FBVztvQkFDWCxjQUFjO29CQUNkLFNBQVM7b0JBQ1QsWUFBWTtvQkFDWixRQUFRO29CQUNSLFNBQVM7b0JBQ1Qsb0JBQW9CO2lCQUNyQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJy4uLy4uL3BpcGVzL1BpcGVzLm1vZHVsZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvVG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0FnZW5kYURhdGVDaGFuZ2VFbGVtZW50IH0gZnJvbSAnLi9jb21tb24vQWdlbmRhRGF0ZUNoYW5nZSc7XG4vLyBDb21tb24gRWxlbWVudHNcbmltcG9ydCB7IE5vdm9FdmVudFR5cGVMZWdlbmRFbGVtZW50IH0gZnJvbSAnLi9jb21tb24vRXZlbnRUeXBlTGVnZW5kJztcbmltcG9ydCB7IE5vdm9BZ2VuZGFBbGxEYXlFdmVudEVsZW1lbnQgfSBmcm9tICcuL2RheS9BZ2VuZGFBbGxEYXlFdmVudCc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhRGF5RXZlbnRFbGVtZW50IH0gZnJvbSAnLi9kYXkvQWdlbmRhRGF5RXZlbnQnO1xuLy8gRGF5IFZpZXdcbmltcG9ydCB7IE5vdm9BZ2VuZGFEYXlWaWV3RWxlbWVudCB9IGZyb20gJy4vZGF5L0FnZW5kYURheVZpZXcnO1xuaW1wb3J0IHsgTm92b0FnZW5kYUhvdXJTZWdtZW50RWxlbWVudCB9IGZyb20gJy4vZGF5L0FnZW5kYUhvdXJTZWdtZW50JztcbmltcG9ydCB7IE5vdm9BZ2VuZGFNb250aERheUVsZW1lbnQgfSBmcm9tICcuL21vbnRoL0FnZW5kYU1vbnRoRGF5JztcbmltcG9ydCB7IE5vdm9BZ2VuZGFNb250aEhlYWRlckVsZW1lbnQgfSBmcm9tICcuL21vbnRoL0FnZW5kYU1vbnRoSGVhZGVyJztcbi8vIE1vbnRoIFZpZXdcbmltcG9ydCB7IE5vdm9BZ2VuZGFNb250aFZpZXdFbGVtZW50IH0gZnJvbSAnLi9tb250aC9BZ2VuZGFNb250aFZpZXcnO1xuaW1wb3J0IHsgRGF5T2ZNb250aFBpcGUgfSBmcm9tICcuL3BpcGUvRGF5T2ZNb250aC5waXBlJztcbmltcG9ydCB7IEVuZE9mV2Vla0Rpc3BsYXlQaXBlIH0gZnJvbSAnLi9waXBlL0VuZE9mV2Vla0Rpc3BsYXlQaXBlLnBpcGUnO1xuaW1wb3J0IHsgSG91cnNQaXBlIH0gZnJvbSAnLi9waXBlL0hvdXJzLnBpcGUnO1xuaW1wb3J0IHsgTW9udGhQaXBlIH0gZnJvbSAnLi9waXBlL01vbnRoLnBpcGUnO1xuaW1wb3J0IHsgTW9udGhEYXlQaXBlIH0gZnJvbSAnLi9waXBlL01vbnRoRGF5LnBpcGUnO1xuLy8gQ29tbW9uXG5pbXBvcnQgeyBXZWVrZGF5UGlwZSB9IGZyb20gJy4vcGlwZS9XZWVrZGF5LnBpcGUnO1xuaW1wb3J0IHsgWWVhclBpcGUgfSBmcm9tICcuL3BpcGUvWWVhci5waXBlJztcbmltcG9ydCB7IE5vdm9BZ2VuZGFXZWVrRXZlbnRFbGVtZW50IH0gZnJvbSAnLi93ZWVrL0FnZW5kYVdlZWtFdmVudCc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhV2Vla0hlYWRlckVsZW1lbnQgfSBmcm9tICcuL3dlZWsvQWdlbmRhV2Vla0hlYWRlcic7XG4vLyBXZWVrIFZpZXdcbmltcG9ydCB7IE5vdm9BZ2VuZGFXZWVrVmlld0VsZW1lbnQgfSBmcm9tICcuL3dlZWsvQWdlbmRhV2Vla1ZpZXcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlLCBOb3ZvVG9vbHRpcE1vZHVsZSwgTm92b1BpcGVzTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYU1vbnRoVmlld0VsZW1lbnQsXG4gICAgTm92b0FnZW5kYU1vbnRoSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhTW9udGhEYXlFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFXZWVrVmlld0VsZW1lbnQsXG4gICAgTm92b0FnZW5kYVdlZWtIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFXZWVrRXZlbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFEYXlWaWV3RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhRGF5RXZlbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFIb3VyU2VnbWVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYUFsbERheUV2ZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhRGF0ZUNoYW5nZUVsZW1lbnQsXG4gICAgV2Vla2RheVBpcGUsXG4gICAgRGF5T2ZNb250aFBpcGUsXG4gICAgTW9udGhQaXBlLFxuICAgIE1vbnRoRGF5UGlwZSxcbiAgICBZZWFyUGlwZSxcbiAgICBIb3Vyc1BpcGUsXG4gICAgRW5kT2ZXZWVrRGlzcGxheVBpcGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvRXZlbnRUeXBlTGVnZW5kRWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhTW9udGhWaWV3RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhTW9udGhIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFNb250aERheUVsZW1lbnQsXG4gICAgTm92b0FnZW5kYVdlZWtWaWV3RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhV2Vla0hlYWRlckVsZW1lbnQsXG4gICAgTm92b0FnZW5kYVdlZWtFdmVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYURheVZpZXdFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFEYXlFdmVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYUhvdXJTZWdtZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhQWxsRGF5RXZlbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFEYXRlQ2hhbmdlRWxlbWVudCxcbiAgICBXZWVrZGF5UGlwZSxcbiAgICBEYXlPZk1vbnRoUGlwZSxcbiAgICBNb250aFBpcGUsXG4gICAgTW9udGhEYXlQaXBlLFxuICAgIFllYXJQaXBlLFxuICAgIEhvdXJzUGlwZSxcbiAgICBFbmRPZldlZWtEaXNwbGF5UGlwZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FnZW5kYU1vZHVsZSB7fVxuIl19