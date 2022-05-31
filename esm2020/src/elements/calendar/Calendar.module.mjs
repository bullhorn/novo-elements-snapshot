// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from '../button';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoCalendarElement } from './calendar.component';
import { NovoMonthSelectElement } from './month-select/month-select.component';
import { NovoMonthViewElement } from './month-view/month-view.component';
import { NovoYearSelectElement } from './year-select/year-select.component';
import * as i0 from "@angular/core";
export class NovoCalendarModule {
}
NovoCalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCalendarModule, declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement], imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, TextMaskModule, NovoIconModule], exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement] });
NovoCalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCalendarModule, imports: [[CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, TextMaskModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, TextMaskModule, NovoIconModule],
                    declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
                    exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvQ2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsU0FBUztBQUNULE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7O0FBTzVFLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFIZCxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUIsYUFEN0YsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGNBQWMsYUFFNUYsb0JBQW9CLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CO2dIQUV2RixrQkFBa0IsWUFKcEIsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDOzJGQUk1RixrQkFBa0I7a0JBTDlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQztvQkFDdkcsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLENBQUM7b0JBQ3hHLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDO2lCQUNwRyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgVGV4dE1hc2tNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi10ZXh0LW1hc2snO1xuaW1wb3J0IHsgTm92b1BpcGVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvUGlwZXMubW9kdWxlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24vSWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0NhbGVuZGFyRWxlbWVudCB9IGZyb20gJy4vY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Nb250aFNlbGVjdEVsZW1lbnQgfSBmcm9tICcuL21vbnRoLXNlbGVjdC9tb250aC1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Nb250aFZpZXdFbGVtZW50IH0gZnJvbSAnLi9tb250aC12aWV3L21vbnRoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9ZZWFyU2VsZWN0RWxlbWVudCB9IGZyb20gJy4veWVhci1zZWxlY3QveWVhci1zZWxlY3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIE5vdm9QaXBlc01vZHVsZSwgVGV4dE1hc2tNb2R1bGUsIE5vdm9JY29uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b01vbnRoVmlld0VsZW1lbnQsIE5vdm9Nb250aFNlbGVjdEVsZW1lbnQsIE5vdm9ZZWFyU2VsZWN0RWxlbWVudCwgTm92b0NhbGVuZGFyRWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvTW9udGhWaWV3RWxlbWVudCwgTm92b01vbnRoU2VsZWN0RWxlbWVudCwgTm92b1llYXJTZWxlY3RFbGVtZW50LCBOb3ZvQ2FsZW5kYXJFbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFyTW9kdWxlIHt9XG4iXX0=