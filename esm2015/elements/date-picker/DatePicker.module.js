// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from '../button';
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoCalendarElement } from './calendar/calendar.component';
import { NovoDatePickerElement } from './DatePicker';
import { NovoDatePickerInputElement } from './DatePickerInput';
import { NovoDateRangeInputElement } from './DateRangeInput';
import { NovoMonthSelectElement } from './month-select/month-select.component';
import { NovoMonthViewElement } from './month-view/month-view.component';
import { NovoMultiDateInputElement } from './MultiDateInput';
import { NovoYearSelectElement } from './year-select/year-select.component';
import * as i0 from "@angular/core";
export class NovoDatePickerModule {
}
NovoDatePickerModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoDatePickerModule });
NovoDatePickerModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoDatePickerModule_Factory(t) { return new (t || NovoDatePickerModule)(); }, imports: [[
            CommonModule,
            FormsModule,
            NovoButtonModule,
            NovoPipesModule,
            NovoOverlayModule,
            TextMaskModule,
            NovoIconModule,
            NovoChipsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoDatePickerModule, { declarations: [NovoDatePickerElement,
        NovoDatePickerInputElement,
        NovoDateRangeInputElement,
        NovoMultiDateInputElement,
        NovoMonthViewElement,
        NovoMonthSelectElement,
        NovoYearSelectElement,
        NovoCalendarElement], imports: [CommonModule,
        FormsModule,
        NovoButtonModule,
        NovoPipesModule,
        NovoOverlayModule,
        TextMaskModule,
        NovoIconModule,
        NovoChipsModule], exports: [NovoDatePickerElement,
        NovoDatePickerInputElement,
        NovoDateRangeInputElement,
        NovoMultiDateInputElement,
        NovoMonthViewElement,
        NovoMonthSelectElement,
        NovoYearSelectElement,
        NovoCalendarElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDatePickerModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    NovoButtonModule,
                    NovoPipesModule,
                    NovoOverlayModule,
                    TextMaskModule,
                    NovoIconModule,
                    NovoChipsModule,
                ],
                declarations: [
                    NovoDatePickerElement,
                    NovoDatePickerInputElement,
                    NovoDateRangeInputElement,
                    NovoMultiDateInputElement,
                    NovoMonthViewElement,
                    NovoMonthSelectElement,
                    NovoYearSelectElement,
                    NovoCalendarElement,
                ],
                exports: [
                    NovoDatePickerElement,
                    NovoDatePickerInputElement,
                    NovoDateRangeInputElement,
                    NovoMultiDateInputElement,
                    NovoMonthViewElement,
                    NovoMonthSelectElement,
                    NovoYearSelectElement,
                    NovoCalendarElement,
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0ZS1waWNrZXIvRGF0ZVBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxTQUFTO0FBQ1QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzdELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQWtDNUUsTUFBTSxPQUFPLG9CQUFvQjs7d0RBQXBCLG9CQUFvQjt1SEFBcEIsb0JBQW9CLGtCQS9CdEI7WUFDUCxZQUFZO1lBQ1osV0FBVztZQUNYLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGNBQWM7WUFDZCxjQUFjO1lBQ2QsZUFBZTtTQUNoQjt3RkFzQlUsb0JBQW9CLG1CQXBCN0IscUJBQXFCO1FBQ3JCLDBCQUEwQjtRQUMxQix5QkFBeUI7UUFDekIseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLG1CQUFtQixhQWpCbkIsWUFBWTtRQUNaLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsY0FBYztRQUNkLGVBQWUsYUFhZixxQkFBcUI7UUFDckIsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsbUJBQW1CO2tEQUdWLG9CQUFvQjtjQWhDaEMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsY0FBYztvQkFDZCxjQUFjO29CQUNkLGVBQWU7aUJBQ2hCO2dCQUNELFlBQVksRUFBRTtvQkFDWixxQkFBcUI7b0JBQ3JCLDBCQUEwQjtvQkFDMUIseUJBQXlCO29CQUN6Qix5QkFBeUI7b0JBQ3pCLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0QixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHFCQUFxQjtvQkFDckIsMEJBQTBCO29CQUMxQix5QkFBeUI7b0JBQ3pCLHlCQUF5QjtvQkFDekIsb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsbUJBQW1CO2lCQUNwQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9QaXBlcy5tb2R1bGUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uJztcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL0ljb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DaGlwc01vZHVsZSB9IGZyb20gJy4vLi4vY2hpcHMvQ2hpcHMubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DYWxlbmRhckVsZW1lbnQgfSBmcm9tICcuL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQgfSBmcm9tICcuL0RhdGVQaWNrZXInO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQgfSBmcm9tICcuL0RhdGVQaWNrZXJJbnB1dCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVJhbmdlSW5wdXRFbGVtZW50IH0gZnJvbSAnLi9EYXRlUmFuZ2VJbnB1dCc7XG5pbXBvcnQgeyBOb3ZvTW9udGhTZWxlY3RFbGVtZW50IH0gZnJvbSAnLi9tb250aC1zZWxlY3QvbW9udGgtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTW9udGhWaWV3RWxlbWVudCB9IGZyb20gJy4vbW9udGgtdmlldy9tb250aC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50IH0gZnJvbSAnLi9NdWx0aURhdGVJbnB1dCc7XG5pbXBvcnQgeyBOb3ZvWWVhclNlbGVjdEVsZW1lbnQgfSBmcm9tICcuL3llYXItc2VsZWN0L3llYXItc2VsZWN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvUGlwZXNNb2R1bGUsXG4gICAgTm92b092ZXJsYXlNb2R1bGUsXG4gICAgVGV4dE1hc2tNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b0NoaXBzTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQsXG4gICAgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQsXG4gICAgTm92b0RhdGVSYW5nZUlucHV0RWxlbWVudCxcbiAgICBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50LFxuICAgIE5vdm9Nb250aFZpZXdFbGVtZW50LFxuICAgIE5vdm9Nb250aFNlbGVjdEVsZW1lbnQsXG4gICAgTm92b1llYXJTZWxlY3RFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhckVsZW1lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQsXG4gICAgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQsXG4gICAgTm92b0RhdGVSYW5nZUlucHV0RWxlbWVudCxcbiAgICBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50LFxuICAgIE5vdm9Nb250aFZpZXdFbGVtZW50LFxuICAgIE5vdm9Nb250aFNlbGVjdEVsZW1lbnQsXG4gICAgTm92b1llYXJTZWxlY3RFbGVtZW50LFxuICAgIE5vdm9DYWxlbmRhckVsZW1lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUGlja2VyTW9kdWxlIHt9XG4iXX0=