// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// Common Elements
import { NovoEventTypeLegendElement } from './common/EventTypeLegend';
import { NovoCalendarDateChangeElement } from './common/CalendarDateChange';
// Month View
import { NovoCalendarMonthViewElement } from './month/CalendarMonthView';
import { NovoCalendarMonthHeaderElement } from './month/CalendarMonthHeader';
import { NovoCalendarMonthDayElement } from './month/CalendarMonthDay';
// Week View
import { NovoCalendarWeekViewElement } from './week/CalendarWeekView';
import { NovoCalendarWeekHeaderElement } from './week/CalendarWeekHeader';
import { NovoCalendarWeekEventElement } from './week/CalendarWeekEvent';
// Day View
import { NovoCalendarDayViewElement } from './day/CalendarDayView';
import { NovoCalendarDayEventElement } from './day/CalendarDayEvent';
import { NovoCalendarHourSegmentElement } from './day/CalendarHourSegment';
import { NovoCalendarAllDayEventElement } from './day/CalendarAllDayEvent';
// Common
import { WeekdayPipe } from './pipe/Weekday.pipe';
import { MonthPipe } from './pipe/Month.pipe';
import { MonthDayPipe } from './pipe/MonthDay.pipe';
import { YearPipe } from './pipe/Year.pipe';
import { HoursPipe } from './pipe/Hours.pipe';
import { DayOfMonthPipe } from './pipe/DayOfMonth.pipe';
import { EndOfWeekDisplayPipe } from './pipe/EndOfWeekDisplayPipe.pipe';
export class NovoCalendarModule {
}
NovoCalendarModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci9DYWxlbmRhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0Qsa0JBQWtCO0FBQ2xCLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTVFLGFBQWE7QUFDYixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RSxZQUFZO0FBQ1osT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEUsV0FBVztBQUNYLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25FLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNFLFNBQVM7QUFDVCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQStDeEUsTUFBTSxPQUFPLGtCQUFrQjs7O1lBN0M5QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQztnQkFDN0UsWUFBWSxFQUFFO29CQUNaLDBCQUEwQjtvQkFDMUIsNEJBQTRCO29CQUM1Qiw4QkFBOEI7b0JBQzlCLDJCQUEyQjtvQkFDM0IsMkJBQTJCO29CQUMzQiw2QkFBNkI7b0JBQzdCLDRCQUE0QjtvQkFDNUIsMEJBQTBCO29CQUMxQiwyQkFBMkI7b0JBQzNCLDhCQUE4QjtvQkFDOUIsOEJBQThCO29CQUM5Qiw2QkFBNkI7b0JBQzdCLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxTQUFTO29CQUNULFlBQVk7b0JBQ1osUUFBUTtvQkFDUixTQUFTO29CQUNULG9CQUFvQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLDBCQUEwQjtvQkFDMUIsNEJBQTRCO29CQUM1Qiw4QkFBOEI7b0JBQzlCLDJCQUEyQjtvQkFDM0IsMkJBQTJCO29CQUMzQiw2QkFBNkI7b0JBQzdCLDRCQUE0QjtvQkFDNUIsMEJBQTBCO29CQUMxQiwyQkFBMkI7b0JBQzNCLDhCQUE4QjtvQkFDOUIsOEJBQThCO29CQUM5Qiw2QkFBNkI7b0JBQzdCLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxTQUFTO29CQUNULFlBQVk7b0JBQ1osUUFBUTtvQkFDUixTQUFTO29CQUNULG9CQUFvQjtpQkFDckI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL1Rvb2x0aXAubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1BpcGVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvUGlwZXMubW9kdWxlJztcclxuLy8gQ29tbW9uIEVsZW1lbnRzXHJcbmltcG9ydCB7IE5vdm9FdmVudFR5cGVMZWdlbmRFbGVtZW50IH0gZnJvbSAnLi9jb21tb24vRXZlbnRUeXBlTGVnZW5kJztcclxuaW1wb3J0IHsgTm92b0NhbGVuZGFyRGF0ZUNoYW5nZUVsZW1lbnQgfSBmcm9tICcuL2NvbW1vbi9DYWxlbmRhckRhdGVDaGFuZ2UnO1xyXG5cclxuLy8gTW9udGggVmlld1xyXG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJNb250aFZpZXdFbGVtZW50IH0gZnJvbSAnLi9tb250aC9DYWxlbmRhck1vbnRoVmlldyc7XHJcbmltcG9ydCB7IE5vdm9DYWxlbmRhck1vbnRoSGVhZGVyRWxlbWVudCB9IGZyb20gJy4vbW9udGgvQ2FsZW5kYXJNb250aEhlYWRlcic7XHJcbmltcG9ydCB7IE5vdm9DYWxlbmRhck1vbnRoRGF5RWxlbWVudCB9IGZyb20gJy4vbW9udGgvQ2FsZW5kYXJNb250aERheSc7XHJcbi8vIFdlZWsgVmlld1xyXG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJXZWVrVmlld0VsZW1lbnQgfSBmcm9tICcuL3dlZWsvQ2FsZW5kYXJXZWVrVmlldyc7XHJcbmltcG9ydCB7IE5vdm9DYWxlbmRhcldlZWtIZWFkZXJFbGVtZW50IH0gZnJvbSAnLi93ZWVrL0NhbGVuZGFyV2Vla0hlYWRlcic7XHJcbmltcG9ydCB7IE5vdm9DYWxlbmRhcldlZWtFdmVudEVsZW1lbnQgfSBmcm9tICcuL3dlZWsvQ2FsZW5kYXJXZWVrRXZlbnQnO1xyXG4vLyBEYXkgVmlld1xyXG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJEYXlWaWV3RWxlbWVudCB9IGZyb20gJy4vZGF5L0NhbGVuZGFyRGF5Vmlldyc7XHJcbmltcG9ydCB7IE5vdm9DYWxlbmRhckRheUV2ZW50RWxlbWVudCB9IGZyb20gJy4vZGF5L0NhbGVuZGFyRGF5RXZlbnQnO1xyXG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJIb3VyU2VnbWVudEVsZW1lbnQgfSBmcm9tICcuL2RheS9DYWxlbmRhckhvdXJTZWdtZW50JztcclxuaW1wb3J0IHsgTm92b0NhbGVuZGFyQWxsRGF5RXZlbnRFbGVtZW50IH0gZnJvbSAnLi9kYXkvQ2FsZW5kYXJBbGxEYXlFdmVudCc7XHJcbi8vIENvbW1vblxyXG5pbXBvcnQgeyBXZWVrZGF5UGlwZSB9IGZyb20gJy4vcGlwZS9XZWVrZGF5LnBpcGUnO1xyXG5pbXBvcnQgeyBNb250aFBpcGUgfSBmcm9tICcuL3BpcGUvTW9udGgucGlwZSc7XHJcbmltcG9ydCB7IE1vbnRoRGF5UGlwZSB9IGZyb20gJy4vcGlwZS9Nb250aERheS5waXBlJztcclxuaW1wb3J0IHsgWWVhclBpcGUgfSBmcm9tICcuL3BpcGUvWWVhci5waXBlJztcclxuaW1wb3J0IHsgSG91cnNQaXBlIH0gZnJvbSAnLi9waXBlL0hvdXJzLnBpcGUnO1xyXG5pbXBvcnQgeyBEYXlPZk1vbnRoUGlwZSB9IGZyb20gJy4vcGlwZS9EYXlPZk1vbnRoLnBpcGUnO1xyXG5pbXBvcnQgeyBFbmRPZldlZWtEaXNwbGF5UGlwZSB9IGZyb20gJy4vcGlwZS9FbmRPZldlZWtEaXNwbGF5UGlwZS5waXBlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgTm92b1Rvb2x0aXBNb2R1bGUsIE5vdm9QaXBlc01vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOb3ZvRXZlbnRUeXBlTGVnZW5kRWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhck1vbnRoVmlld0VsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJNb250aEhlYWRlckVsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJNb250aERheUVsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJXZWVrVmlld0VsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJXZWVrSGVhZGVyRWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhcldlZWtFdmVudEVsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJEYXlWaWV3RWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhckRheUV2ZW50RWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhckhvdXJTZWdtZW50RWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhckFsbERheUV2ZW50RWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhckRhdGVDaGFuZ2VFbGVtZW50LFxyXG4gICAgV2Vla2RheVBpcGUsXHJcbiAgICBEYXlPZk1vbnRoUGlwZSxcclxuICAgIE1vbnRoUGlwZSxcclxuICAgIE1vbnRoRGF5UGlwZSxcclxuICAgIFllYXJQaXBlLFxyXG4gICAgSG91cnNQaXBlLFxyXG4gICAgRW5kT2ZXZWVrRGlzcGxheVBpcGUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOb3ZvRXZlbnRUeXBlTGVnZW5kRWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhck1vbnRoVmlld0VsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJNb250aEhlYWRlckVsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJNb250aERheUVsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJXZWVrVmlld0VsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJXZWVrSGVhZGVyRWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhcldlZWtFdmVudEVsZW1lbnQsXHJcbiAgICBOb3ZvQ2FsZW5kYXJEYXlWaWV3RWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhckRheUV2ZW50RWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhckhvdXJTZWdtZW50RWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhckFsbERheUV2ZW50RWxlbWVudCxcclxuICAgIE5vdm9DYWxlbmRhckRhdGVDaGFuZ2VFbGVtZW50LFxyXG4gICAgV2Vla2RheVBpcGUsXHJcbiAgICBEYXlPZk1vbnRoUGlwZSxcclxuICAgIE1vbnRoUGlwZSxcclxuICAgIE1vbnRoRGF5UGlwZSxcclxuICAgIFllYXJQaXBlLFxyXG4gICAgSG91cnNQaXBlLFxyXG4gICAgRW5kT2ZXZWVrRGlzcGxheVBpcGUsXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9DYWxlbmRhck1vZHVsZSB7fVxyXG4iXX0=