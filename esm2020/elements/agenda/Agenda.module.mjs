// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
// Common Elements
import { NovoAgendaDateChangeElement } from './common/AgendaDateChange';
import { NovoEventTypeLegendElement } from './common/EventTypeLegend';
// Day View
import { NovoAgendaAllDayEventElement } from './day/AgendaAllDayEvent';
import { NovoAgendaDayEventElement } from './day/AgendaDayEvent';
import { NovoAgendaDayViewElement } from './day/AgendaDayView';
import { NovoAgendaHourSegmentElement } from './day/AgendaHourSegment';
// Month View
import { NovoAgendaMonthDayElement } from './month/AgendaMonthDay';
import { NovoAgendaMonthHeaderElement } from './month/AgendaMonthHeader';
import { NovoAgendaMonthViewElement } from './month/AgendaMonthView';
// Week View
import { NovoAgendaWeekEventElement } from './week/AgendaWeekEvent';
import { NovoAgendaWeekHeaderElement } from './week/AgendaWeekHeader';
import { NovoAgendaWeekViewElement } from './week/AgendaWeekView';
// Pipes
import { DayOfMonthPipe } from './pipe/DayOfMonth.pipe';
import { EndOfWeekDisplayPipe } from './pipe/EndOfWeekDisplayPipe.pipe';
import { HoursPipe } from './pipe/Hours.pipe';
import { MonthPipe } from './pipe/Month.pipe';
import { MonthDayPipe } from './pipe/MonthDay.pipe';
import { WeekdayPipe } from './pipe/Weekday.pipe';
import { YearPipe } from './pipe/Year.pipe';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2FnZW5kYS9BZ2VuZGEubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLGtCQUFrQjtBQUNsQixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxXQUFXO0FBQ1gsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkUsYUFBYTtBQUNiLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JFLFlBQVk7QUFDWixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRSxRQUFRO0FBQ1IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBK0M1QyxNQUFNLE9BQU8sZ0JBQWdCOzs4R0FBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0IsaUJBMUN6QiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1Qix5QkFBeUI7UUFDekIseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFDNUIsNEJBQTRCO1FBQzVCLDJCQUEyQjtRQUMzQixXQUFXO1FBQ1gsY0FBYztRQUNkLFNBQVM7UUFDVCxZQUFZO1FBQ1osUUFBUTtRQUNSLFNBQVM7UUFDVCxvQkFBb0IsYUFwQlosWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsYUF1QjFFLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLDRCQUE0QjtRQUM1Qiw0QkFBNEI7UUFDNUIsMkJBQTJCO1FBQzNCLFdBQVc7UUFDWCxjQUFjO1FBQ2QsU0FBUztRQUNULFlBQVk7UUFDWixRQUFRO1FBQ1IsU0FBUztRQUNULG9CQUFvQjsrR0FHWCxnQkFBZ0IsWUE1Q2xCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQzs0RkE0Q2xFLGdCQUFnQjtrQkE3QzVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQztvQkFDN0UsWUFBWSxFQUFFO3dCQUNaLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQiw0QkFBNEI7d0JBQzVCLHlCQUF5Qjt3QkFDekIseUJBQXlCO3dCQUN6QiwyQkFBMkI7d0JBQzNCLDBCQUEwQjt3QkFDMUIsd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLDRCQUE0Qjt3QkFDNUIsNEJBQTRCO3dCQUM1QiwyQkFBMkI7d0JBQzNCLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxTQUFTO3dCQUNULFlBQVk7d0JBQ1osUUFBUTt3QkFDUixTQUFTO3dCQUNULG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQiw0QkFBNEI7d0JBQzVCLHlCQUF5Qjt3QkFDekIseUJBQXlCO3dCQUN6QiwyQkFBMkI7d0JBQzNCLDBCQUEwQjt3QkFDMUIsd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLDRCQUE0Qjt3QkFDNUIsNEJBQTRCO3dCQUM1QiwyQkFBMkI7d0JBQzNCLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxTQUFTO3dCQUNULFlBQVk7d0JBQ1osUUFBUTt3QkFDUixTQUFTO3dCQUNULG9CQUFvQjtxQkFDckI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b1BpcGVzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9waXBlcyc7XG5pbXBvcnQgeyBOb3ZvVG9vbHRpcE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvdG9vbHRpcCc7XG4vLyBDb21tb24gRWxlbWVudHNcbmltcG9ydCB7IE5vdm9BZ2VuZGFEYXRlQ2hhbmdlRWxlbWVudCB9IGZyb20gJy4vY29tbW9uL0FnZW5kYURhdGVDaGFuZ2UnO1xuaW1wb3J0IHsgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbi9FdmVudFR5cGVMZWdlbmQnO1xuLy8gRGF5IFZpZXdcbmltcG9ydCB7IE5vdm9BZ2VuZGFBbGxEYXlFdmVudEVsZW1lbnQgfSBmcm9tICcuL2RheS9BZ2VuZGFBbGxEYXlFdmVudCc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhRGF5RXZlbnRFbGVtZW50IH0gZnJvbSAnLi9kYXkvQWdlbmRhRGF5RXZlbnQnO1xuaW1wb3J0IHsgTm92b0FnZW5kYURheVZpZXdFbGVtZW50IH0gZnJvbSAnLi9kYXkvQWdlbmRhRGF5Vmlldyc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhSG91clNlZ21lbnRFbGVtZW50IH0gZnJvbSAnLi9kYXkvQWdlbmRhSG91clNlZ21lbnQnO1xuLy8gTW9udGggVmlld1xuaW1wb3J0IHsgTm92b0FnZW5kYU1vbnRoRGF5RWxlbWVudCB9IGZyb20gJy4vbW9udGgvQWdlbmRhTW9udGhEYXknO1xuaW1wb3J0IHsgTm92b0FnZW5kYU1vbnRoSGVhZGVyRWxlbWVudCB9IGZyb20gJy4vbW9udGgvQWdlbmRhTW9udGhIZWFkZXInO1xuaW1wb3J0IHsgTm92b0FnZW5kYU1vbnRoVmlld0VsZW1lbnQgfSBmcm9tICcuL21vbnRoL0FnZW5kYU1vbnRoVmlldyc7XG4vLyBXZWVrIFZpZXdcbmltcG9ydCB7IE5vdm9BZ2VuZGFXZWVrRXZlbnRFbGVtZW50IH0gZnJvbSAnLi93ZWVrL0FnZW5kYVdlZWtFdmVudCc7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhV2Vla0hlYWRlckVsZW1lbnQgfSBmcm9tICcuL3dlZWsvQWdlbmRhV2Vla0hlYWRlcic7XG5pbXBvcnQgeyBOb3ZvQWdlbmRhV2Vla1ZpZXdFbGVtZW50IH0gZnJvbSAnLi93ZWVrL0FnZW5kYVdlZWtWaWV3Jztcbi8vIFBpcGVzXG5pbXBvcnQgeyBEYXlPZk1vbnRoUGlwZSB9IGZyb20gJy4vcGlwZS9EYXlPZk1vbnRoLnBpcGUnO1xuaW1wb3J0IHsgRW5kT2ZXZWVrRGlzcGxheVBpcGUgfSBmcm9tICcuL3BpcGUvRW5kT2ZXZWVrRGlzcGxheVBpcGUucGlwZSc7XG5pbXBvcnQgeyBIb3Vyc1BpcGUgfSBmcm9tICcuL3BpcGUvSG91cnMucGlwZSc7XG5pbXBvcnQgeyBNb250aFBpcGUgfSBmcm9tICcuL3BpcGUvTW9udGgucGlwZSc7XG5pbXBvcnQgeyBNb250aERheVBpcGUgfSBmcm9tICcuL3BpcGUvTW9udGhEYXkucGlwZSc7XG5pbXBvcnQgeyBXZWVrZGF5UGlwZSB9IGZyb20gJy4vcGlwZS9XZWVrZGF5LnBpcGUnO1xuaW1wb3J0IHsgWWVhclBpcGUgfSBmcm9tICcuL3BpcGUvWWVhci5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgTm92b1Rvb2x0aXBNb2R1bGUsIE5vdm9QaXBlc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9FdmVudFR5cGVMZWdlbmRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFNb250aFZpZXdFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFNb250aEhlYWRlckVsZW1lbnQsXG4gICAgTm92b0FnZW5kYU1vbnRoRGF5RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhV2Vla1ZpZXdFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFXZWVrSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhV2Vla0V2ZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhRGF5Vmlld0VsZW1lbnQsXG4gICAgTm92b0FnZW5kYURheUV2ZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhSG91clNlZ21lbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFBbGxEYXlFdmVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYURhdGVDaGFuZ2VFbGVtZW50LFxuICAgIFdlZWtkYXlQaXBlLFxuICAgIERheU9mTW9udGhQaXBlLFxuICAgIE1vbnRoUGlwZSxcbiAgICBNb250aERheVBpcGUsXG4gICAgWWVhclBpcGUsXG4gICAgSG91cnNQaXBlLFxuICAgIEVuZE9mV2Vla0Rpc3BsYXlQaXBlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYU1vbnRoVmlld0VsZW1lbnQsXG4gICAgTm92b0FnZW5kYU1vbnRoSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhTW9udGhEYXlFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFXZWVrVmlld0VsZW1lbnQsXG4gICAgTm92b0FnZW5kYVdlZWtIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFXZWVrRXZlbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFEYXlWaWV3RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhRGF5RXZlbnRFbGVtZW50LFxuICAgIE5vdm9BZ2VuZGFIb3VyU2VnbWVudEVsZW1lbnQsXG4gICAgTm92b0FnZW5kYUFsbERheUV2ZW50RWxlbWVudCxcbiAgICBOb3ZvQWdlbmRhRGF0ZUNoYW5nZUVsZW1lbnQsXG4gICAgV2Vla2RheVBpcGUsXG4gICAgRGF5T2ZNb250aFBpcGUsXG4gICAgTW9udGhQaXBlLFxuICAgIE1vbnRoRGF5UGlwZSxcbiAgICBZZWFyUGlwZSxcbiAgICBIb3Vyc1BpcGUsXG4gICAgRW5kT2ZXZWVrRGlzcGxheVBpcGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BZ2VuZGFNb2R1bGUge31cbiJdfQ==