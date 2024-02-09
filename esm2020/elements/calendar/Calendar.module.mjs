// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoCalendarElement } from './calendar.component';
import { NovoMonthSelectElement } from './month-select/month-select.component';
import { NovoMonthViewElement } from './month-view/month-view.component';
import { NovoYearSelectElement } from './year-select/year-select.component';
import * as i0 from "@angular/core";
export class NovoCalendarModule {
}
NovoCalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCalendarModule, declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement], imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, NovoIconModule], exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement] });
NovoCalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCalendarModule, imports: [[CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, NovoIconModule],
                    declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
                    exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvQ2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7O0FBTzVFLE1BQU0sT0FBTyxrQkFBa0I7O2dIQUFsQixrQkFBa0I7aUhBQWxCLGtCQUFrQixpQkFIZCxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUIsYUFEN0YsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxhQUU1RSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUI7aUhBRXZGLGtCQUFrQixZQUpwQixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQzs0RkFJNUUsa0JBQWtCO2tCQUw5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQztvQkFDdkYsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLENBQUM7b0JBQ3hHLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDO2lCQUNwRyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvYnV0dG9uJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9pY29uJztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvcGlwZXMnO1xuaW1wb3J0IHsgTm92b0NhbGVuZGFyRWxlbWVudCB9IGZyb20gJy4vY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Nb250aFNlbGVjdEVsZW1lbnQgfSBmcm9tICcuL21vbnRoLXNlbGVjdC9tb250aC1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Nb250aFZpZXdFbGVtZW50IH0gZnJvbSAnLi9tb250aC12aWV3L21vbnRoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9ZZWFyU2VsZWN0RWxlbWVudCB9IGZyb20gJy4veWVhci1zZWxlY3QveWVhci1zZWxlY3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIE5vdm9QaXBlc01vZHVsZSwgTm92b0ljb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvTW9udGhWaWV3RWxlbWVudCwgTm92b01vbnRoU2VsZWN0RWxlbWVudCwgTm92b1llYXJTZWxlY3RFbGVtZW50LCBOb3ZvQ2FsZW5kYXJFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9Nb250aFZpZXdFbGVtZW50LCBOb3ZvTW9udGhTZWxlY3RFbGVtZW50LCBOb3ZvWWVhclNlbGVjdEVsZW1lbnQsIE5vdm9DYWxlbmRhckVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJNb2R1bGUge31cbiJdfQ==