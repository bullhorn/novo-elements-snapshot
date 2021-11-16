// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from '../button';
import { NovoCalendarModule } from '../calendar/Calendar.module';
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoDatePickerElement } from './DatePicker';
import { NovoDatePickerInputElement } from './DatePickerInput';
import { NovoDateRangeInputElement } from './DateRangeInput';
import { NovoMultiDateInputElement } from './MultiDateInput';
export class NovoDatePickerModule {
}
NovoDatePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    NovoButtonModule,
                    NovoPipesModule,
                    NovoOverlayModule,
                    TextMaskModule,
                    NovoIconModule,
                    NovoChipsModule,
                    NovoCalendarModule,
                ],
                declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
                exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZGF0ZS1waWNrZXIvRGF0ZVBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxTQUFTO0FBQ1QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzdELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBZ0I3RCxNQUFNLE9BQU8sb0JBQW9COzs7WUFmaEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsY0FBYztvQkFDZCxjQUFjO29CQUNkLGVBQWU7b0JBQ2Ysa0JBQWtCO2lCQUNuQjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQztnQkFDdkgsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLENBQUM7YUFDbkgiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IFRleHRNYXNrTW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItdGV4dC1tYXNrJztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJy4uLy4uL3BpcGVzL1BpcGVzLm1vZHVsZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NhbGVuZGFyTW9kdWxlIH0gZnJvbSAnLi4vY2FsZW5kYXIvQ2FsZW5kYXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL0ljb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DaGlwc01vZHVsZSB9IGZyb20gJy4vLi4vY2hpcHMvQ2hpcHMubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyRWxlbWVudCB9IGZyb20gJy4vRGF0ZVBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlcklucHV0RWxlbWVudCB9IGZyb20gJy4vRGF0ZVBpY2tlcklucHV0JztcbmltcG9ydCB7IE5vdm9EYXRlUmFuZ2VJbnB1dEVsZW1lbnQgfSBmcm9tICcuL0RhdGVSYW5nZUlucHV0JztcbmltcG9ydCB7IE5vdm9NdWx0aURhdGVJbnB1dEVsZW1lbnQgfSBmcm9tICcuL011bHRpRGF0ZUlucHV0JztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvUGlwZXNNb2R1bGUsXG4gICAgTm92b092ZXJsYXlNb2R1bGUsXG4gICAgVGV4dE1hc2tNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b0NoaXBzTW9kdWxlLFxuICAgIE5vdm9DYWxlbmRhck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0RhdGVQaWNrZXJFbGVtZW50LCBOb3ZvRGF0ZVBpY2tlcklucHV0RWxlbWVudCwgTm92b0RhdGVSYW5nZUlucHV0RWxlbWVudCwgTm92b011bHRpRGF0ZUlucHV0RWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvRGF0ZVBpY2tlckVsZW1lbnQsIE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50LCBOb3ZvRGF0ZVJhbmdlSW5wdXRFbGVtZW50LCBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVQaWNrZXJNb2R1bGUge31cbiJdfQ==