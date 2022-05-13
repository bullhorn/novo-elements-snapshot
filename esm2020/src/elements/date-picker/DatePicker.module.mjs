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
import * as i0 from "@angular/core";
export class NovoDatePickerModule {
}
NovoDatePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDatePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDatePickerModule, declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement], imports: [CommonModule,
        FormsModule,
        NovoButtonModule,
        NovoPipesModule,
        NovoOverlayModule,
        TextMaskModule,
        NovoIconModule,
        NovoChipsModule,
        NovoCalendarModule], exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement] });
NovoDatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDatePickerModule, imports: [[
            CommonModule,
            FormsModule,
            NovoButtonModule,
            NovoPipesModule,
            NovoOverlayModule,
            TextMaskModule,
            NovoIconModule,
            NovoChipsModule,
            NovoCalendarModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDatePickerModule, decorators: [{
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
                        NovoCalendarModule,
                    ],
                    declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
                    exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLFNBQVM7QUFDVCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDckQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBZ0I3RCxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsaUJBSGhCLHFCQUFxQixFQUFFLDBCQUEwQixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixhQVZwSCxZQUFZO1FBQ1osV0FBVztRQUNYLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxjQUFjO1FBQ2QsZUFBZTtRQUNmLGtCQUFrQixhQUdWLHFCQUFxQixFQUFFLDBCQUEwQixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QjtrSEFFdEcsb0JBQW9CLFlBZHRCO1lBQ1AsWUFBWTtZQUNaLFdBQVc7WUFDWCxnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLGlCQUFpQjtZQUNqQixjQUFjO1lBQ2QsY0FBYztZQUNkLGVBQWU7WUFDZixrQkFBa0I7U0FDbkI7MkZBSVUsb0JBQW9CO2tCQWZoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLGVBQWU7d0JBQ2Ysa0JBQWtCO3FCQUNuQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQztvQkFDdkgsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLENBQUM7aUJBQ25IIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9QaXBlcy5tb2R1bGUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uJztcbmltcG9ydCB7IE5vdm9DYWxlbmRhck1vZHVsZSB9IGZyb20gJy4uL2NhbGVuZGFyL0NhbGVuZGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXkubW9kdWxlJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9JY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICcuLy4uL2NoaXBzL0NoaXBzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQgfSBmcm9tICcuL0RhdGVQaWNrZXInO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQgfSBmcm9tICcuL0RhdGVQaWNrZXJJbnB1dCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVJhbmdlSW5wdXRFbGVtZW50IH0gZnJvbSAnLi9EYXRlUmFuZ2VJbnB1dCc7XG5pbXBvcnQgeyBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50IH0gZnJvbSAnLi9NdWx0aURhdGVJbnB1dCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b1BpcGVzTW9kdWxlLFxuICAgIE5vdm9PdmVybGF5TW9kdWxlLFxuICAgIFRleHRNYXNrTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgICBOb3ZvQ2FsZW5kYXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9EYXRlUGlja2VyRWxlbWVudCwgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQsIE5vdm9EYXRlUmFuZ2VJbnB1dEVsZW1lbnQsIE5vdm9NdWx0aURhdGVJbnB1dEVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b0RhdGVQaWNrZXJFbGVtZW50LCBOb3ZvRGF0ZVBpY2tlcklucHV0RWxlbWVudCwgTm92b0RhdGVSYW5nZUlucHV0RWxlbWVudCwgTm92b011bHRpRGF0ZUlucHV0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUGlja2VyTW9kdWxlIHt9XG4iXX0=