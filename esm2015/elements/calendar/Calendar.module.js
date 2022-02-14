// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoCalendarDateChangeElement } from './common/CalendarDateChange';
// Common Elements
import { NovoEventTypeLegendElement } from './common/EventTypeLegend';
import { NovoCalendarAllDayEventElement } from './day/CalendarAllDayEvent';
import { NovoCalendarDayEventElement } from './day/CalendarDayEvent';
// Day View
import { NovoCalendarDayViewElement } from './day/CalendarDayView';
import { NovoCalendarHourSegmentElement } from './day/CalendarHourSegment';
import { NovoCalendarMonthDayElement } from './month/CalendarMonthDay';
import { NovoCalendarMonthHeaderElement } from './month/CalendarMonthHeader';
// Month View
import { NovoCalendarMonthViewElement } from './month/CalendarMonthView';
import { DayOfMonthPipe } from './pipe/DayOfMonth.pipe';
import { EndOfWeekDisplayPipe } from './pipe/EndOfWeekDisplayPipe.pipe';
import { HoursPipe } from './pipe/Hours.pipe';
import { MonthPipe } from './pipe/Month.pipe';
import { MonthDayPipe } from './pipe/MonthDay.pipe';
// Common
import { WeekdayPipe } from './pipe/Weekday.pipe';
import { YearPipe } from './pipe/Year.pipe';
import { NovoCalendarWeekEventElement } from './week/CalendarWeekEvent';
import { NovoCalendarWeekHeaderElement } from './week/CalendarWeekHeader';
// Week View
import { NovoCalendarWeekViewElement } from './week/CalendarWeekView';
import * as i0 from "@angular/core";
export class NovoCalendarModule {
}
NovoCalendarModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoCalendarModule });
NovoCalendarModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoCalendarModule_Factory(t) { return new (t || NovoCalendarModule)(); }, imports: [[CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoCalendarModule, { declarations: [NovoEventTypeLegendElement,
        NovoCalendarMonthViewElement,
        NovoCalendarMonthHeaderElement,
        NovoCalendarMonthDayElement,
        NovoCalendarWeekViewElement,
        NovoCalendarWeekHeaderElement,
        NovoCalendarWeekEventElement,
        NovoCalendarDayViewElement,
        NovoCalendarDayEventElement,
        NovoCalendarHourSegmentElement,
        NovoCalendarAllDayEventElement,
        NovoCalendarDateChangeElement,
        WeekdayPipe,
        DayOfMonthPipe,
        MonthPipe,
        MonthDayPipe,
        YearPipe,
        HoursPipe,
        EndOfWeekDisplayPipe], imports: [CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule], exports: [NovoEventTypeLegendElement,
        NovoCalendarMonthViewElement,
        NovoCalendarMonthHeaderElement,
        NovoCalendarMonthDayElement,
        NovoCalendarWeekViewElement,
        NovoCalendarWeekHeaderElement,
        NovoCalendarWeekEventElement,
        NovoCalendarDayViewElement,
        NovoCalendarDayEventElement,
        NovoCalendarHourSegmentElement,
        NovoCalendarAllDayEventElement,
        NovoCalendarDateChangeElement,
        WeekdayPipe,
        DayOfMonthPipe,
        MonthPipe,
        MonthDayPipe,
        YearPipe,
        HoursPipe,
        EndOfWeekDisplayPipe] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCalendarModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule],
                declarations: [
                    NovoEventTypeLegendElement,
                    NovoCalendarMonthViewElement,
                    NovoCalendarMonthHeaderElement,
                    NovoCalendarMonthDayElement,
                    NovoCalendarWeekViewElement,
                    NovoCalendarWeekHeaderElement,
                    NovoCalendarWeekEventElement,
                    NovoCalendarDayViewElement,
                    NovoCalendarDayEventElement,
                    NovoCalendarHourSegmentElement,
                    NovoCalendarAllDayEventElement,
                    NovoCalendarDateChangeElement,
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
                    NovoCalendarMonthViewElement,
                    NovoCalendarMonthHeaderElement,
                    NovoCalendarMonthDayElement,
                    NovoCalendarWeekViewElement,
                    NovoCalendarWeekHeaderElement,
                    NovoCalendarWeekEventElement,
                    NovoCalendarDayViewElement,
                    NovoCalendarDayEventElement,
                    NovoCalendarHourSegmentElement,
                    NovoCalendarAllDayEventElement,
                    NovoCalendarDateChangeElement,
                    WeekdayPipe,
                    DayOfMonthPipe,
                    MonthPipe,
                    MonthDayPipe,
                    YearPipe,
                    HoursPipe,
                    EndOfWeekDisplayPipe,
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NhbGVuZGFyL0NhbGVuZGFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RSxrQkFBa0I7QUFDbEIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckUsV0FBVztBQUNYLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25FLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdFLGFBQWE7QUFDYixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsU0FBUztBQUNULE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsWUFBWTtBQUNaLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQStDdEUsTUFBTSxPQUFPLGtCQUFrQjs7c0RBQWxCLGtCQUFrQjttSEFBbEIsa0JBQWtCLGtCQTVDcEIsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDO3dGQTRDbEUsa0JBQWtCLG1CQTFDM0IsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1Qiw4QkFBOEI7UUFDOUIsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiw2QkFBNkI7UUFDN0IsNEJBQTRCO1FBQzVCLDBCQUEwQjtRQUMxQiwyQkFBMkI7UUFDM0IsOEJBQThCO1FBQzlCLDhCQUE4QjtRQUM5Qiw2QkFBNkI7UUFDN0IsV0FBVztRQUNYLGNBQWM7UUFDZCxTQUFTO1FBQ1QsWUFBWTtRQUNaLFFBQVE7UUFDUixTQUFTO1FBQ1Qsb0JBQW9CLGFBcEJaLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLGFBdUIxRSwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLDhCQUE4QjtRQUM5QiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7UUFDNUIsMEJBQTBCO1FBQzFCLDJCQUEyQjtRQUMzQiw4QkFBOEI7UUFDOUIsOEJBQThCO1FBQzlCLDZCQUE2QjtRQUM3QixXQUFXO1FBQ1gsY0FBYztRQUNkLFNBQVM7UUFDVCxZQUFZO1FBQ1osUUFBUTtRQUNSLFNBQVM7UUFDVCxvQkFBb0I7a0RBR1gsa0JBQWtCO2NBN0M5QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQztnQkFDN0UsWUFBWSxFQUFFO29CQUNaLDBCQUEwQjtvQkFDMUIsNEJBQTRCO29CQUM1Qiw4QkFBOEI7b0JBQzlCLDJCQUEyQjtvQkFDM0IsMkJBQTJCO29CQUMzQiw2QkFBNkI7b0JBQzdCLDRCQUE0QjtvQkFDNUIsMEJBQTBCO29CQUMxQiwyQkFBMkI7b0JBQzNCLDhCQUE4QjtvQkFDOUIsOEJBQThCO29CQUM5Qiw2QkFBNkI7b0JBQzdCLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxTQUFTO29CQUNULFlBQVk7b0JBQ1osUUFBUTtvQkFDUixTQUFTO29CQUNULG9CQUFvQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLDBCQUEwQjtvQkFDMUIsNEJBQTRCO29CQUM1Qiw4QkFBOEI7b0JBQzlCLDJCQUEyQjtvQkFDM0IsMkJBQTJCO29CQUMzQiw2QkFBNkI7b0JBQzdCLDRCQUE0QjtvQkFDNUIsMEJBQTBCO29CQUMxQiwyQkFBMkI7b0JBQzNCLDhCQUE4QjtvQkFDOUIsOEJBQThCO29CQUM5Qiw2QkFBNkI7b0JBQzdCLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxTQUFTO29CQUNULFlBQVk7b0JBQ1osUUFBUTtvQkFDUixTQUFTO29CQUNULG9CQUFvQjtpQkFDckI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9QaXBlcy5tb2R1bGUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL1Rvb2x0aXAubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DYWxlbmRhckRhdGVDaGFuZ2VFbGVtZW50IH0gZnJvbSAnLi9jb21tb24vQ2FsZW5kYXJEYXRlQ2hhbmdlJztcbi8vIENvbW1vbiBFbGVtZW50c1xuaW1wb3J0IHsgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbi9FdmVudFR5cGVMZWdlbmQnO1xuaW1wb3J0IHsgTm92b0NhbGVuZGFyQWxsRGF5RXZlbnRFbGVtZW50IH0gZnJvbSAnLi9kYXkvQ2FsZW5kYXJBbGxEYXlFdmVudCc7XG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJEYXlFdmVudEVsZW1lbnQgfSBmcm9tICcuL2RheS9DYWxlbmRhckRheUV2ZW50Jztcbi8vIERheSBWaWV3XG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJEYXlWaWV3RWxlbWVudCB9IGZyb20gJy4vZGF5L0NhbGVuZGFyRGF5Vmlldyc7XG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJIb3VyU2VnbWVudEVsZW1lbnQgfSBmcm9tICcuL2RheS9DYWxlbmRhckhvdXJTZWdtZW50JztcbmltcG9ydCB7IE5vdm9DYWxlbmRhck1vbnRoRGF5RWxlbWVudCB9IGZyb20gJy4vbW9udGgvQ2FsZW5kYXJNb250aERheSc7XG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJNb250aEhlYWRlckVsZW1lbnQgfSBmcm9tICcuL21vbnRoL0NhbGVuZGFyTW9udGhIZWFkZXInO1xuLy8gTW9udGggVmlld1xuaW1wb3J0IHsgTm92b0NhbGVuZGFyTW9udGhWaWV3RWxlbWVudCB9IGZyb20gJy4vbW9udGgvQ2FsZW5kYXJNb250aFZpZXcnO1xuaW1wb3J0IHsgRGF5T2ZNb250aFBpcGUgfSBmcm9tICcuL3BpcGUvRGF5T2ZNb250aC5waXBlJztcbmltcG9ydCB7IEVuZE9mV2Vla0Rpc3BsYXlQaXBlIH0gZnJvbSAnLi9waXBlL0VuZE9mV2Vla0Rpc3BsYXlQaXBlLnBpcGUnO1xuaW1wb3J0IHsgSG91cnNQaXBlIH0gZnJvbSAnLi9waXBlL0hvdXJzLnBpcGUnO1xuaW1wb3J0IHsgTW9udGhQaXBlIH0gZnJvbSAnLi9waXBlL01vbnRoLnBpcGUnO1xuaW1wb3J0IHsgTW9udGhEYXlQaXBlIH0gZnJvbSAnLi9waXBlL01vbnRoRGF5LnBpcGUnO1xuLy8gQ29tbW9uXG5pbXBvcnQgeyBXZWVrZGF5UGlwZSB9IGZyb20gJy4vcGlwZS9XZWVrZGF5LnBpcGUnO1xuaW1wb3J0IHsgWWVhclBpcGUgfSBmcm9tICcuL3BpcGUvWWVhci5waXBlJztcbmltcG9ydCB7IE5vdm9DYWxlbmRhcldlZWtFdmVudEVsZW1lbnQgfSBmcm9tICcuL3dlZWsvQ2FsZW5kYXJXZWVrRXZlbnQnO1xuaW1wb3J0IHsgTm92b0NhbGVuZGFyV2Vla0hlYWRlckVsZW1lbnQgfSBmcm9tICcuL3dlZWsvQ2FsZW5kYXJXZWVrSGVhZGVyJztcbi8vIFdlZWsgVmlld1xuaW1wb3J0IHsgTm92b0NhbGVuZGFyV2Vla1ZpZXdFbGVtZW50IH0gZnJvbSAnLi93ZWVrL0NhbGVuZGFyV2Vla1ZpZXcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlLCBOb3ZvVG9vbHRpcE1vZHVsZSwgTm92b1BpcGVzTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQsXG4gICAgTm92b0NhbGVuZGFyTW9udGhWaWV3RWxlbWVudCxcbiAgICBOb3ZvQ2FsZW5kYXJNb250aEhlYWRlckVsZW1lbnQsXG4gICAgTm92b0NhbGVuZGFyTW9udGhEYXlFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhcldlZWtWaWV3RWxlbWVudCxcbiAgICBOb3ZvQ2FsZW5kYXJXZWVrSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvQ2FsZW5kYXJXZWVrRXZlbnRFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhckRheVZpZXdFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhckRheUV2ZW50RWxlbWVudCxcbiAgICBOb3ZvQ2FsZW5kYXJIb3VyU2VnbWVudEVsZW1lbnQsXG4gICAgTm92b0NhbGVuZGFyQWxsRGF5RXZlbnRFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhckRhdGVDaGFuZ2VFbGVtZW50LFxuICAgIFdlZWtkYXlQaXBlLFxuICAgIERheU9mTW9udGhQaXBlLFxuICAgIE1vbnRoUGlwZSxcbiAgICBNb250aERheVBpcGUsXG4gICAgWWVhclBpcGUsXG4gICAgSG91cnNQaXBlLFxuICAgIEVuZE9mV2Vla0Rpc3BsYXlQaXBlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQsXG4gICAgTm92b0NhbGVuZGFyTW9udGhWaWV3RWxlbWVudCxcbiAgICBOb3ZvQ2FsZW5kYXJNb250aEhlYWRlckVsZW1lbnQsXG4gICAgTm92b0NhbGVuZGFyTW9udGhEYXlFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhcldlZWtWaWV3RWxlbWVudCxcbiAgICBOb3ZvQ2FsZW5kYXJXZWVrSGVhZGVyRWxlbWVudCxcbiAgICBOb3ZvQ2FsZW5kYXJXZWVrRXZlbnRFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhckRheVZpZXdFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhckRheUV2ZW50RWxlbWVudCxcbiAgICBOb3ZvQ2FsZW5kYXJIb3VyU2VnbWVudEVsZW1lbnQsXG4gICAgTm92b0NhbGVuZGFyQWxsRGF5RXZlbnRFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhckRhdGVDaGFuZ2VFbGVtZW50LFxuICAgIFdlZWtkYXlQaXBlLFxuICAgIERheU9mTW9udGhQaXBlLFxuICAgIE1vbnRoUGlwZSxcbiAgICBNb250aERheVBpcGUsXG4gICAgWWVhclBpcGUsXG4gICAgSG91cnNQaXBlLFxuICAgIEVuZE9mV2Vla0Rpc3BsYXlQaXBlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJNb2R1bGUge31cbiJdfQ==