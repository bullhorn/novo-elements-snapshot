// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { IMaskDirectiveModule } from 'angular-imask';
import { NovoPipesModule } from 'novo-elements/pipes';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCalendarModule } from 'novo-elements/elements/calendar';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoDatePickerElement } from './DatePicker';
import { NovoDatePickerInputElement } from './DatePickerInput';
import { NovoDateRangeInputElement } from './DateRangeInput';
import { NovoMultiDateInputElement } from './MultiDateInput';
import * as i0 from "@angular/core";
export class NovoDatePickerModule {
}
NovoDatePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDatePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: NovoDatePickerModule, declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement], imports: [CommonModule,
        FormsModule,
        NovoButtonModule,
        NovoPipesModule,
        NovoOverlayModule,
        IMaskDirectiveModule,
        NovoIconModule,
        NovoChipsModule,
        NovoCalendarModule], exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement] });
NovoDatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDatePickerModule, imports: [CommonModule,
        FormsModule,
        NovoButtonModule,
        NovoPipesModule,
        NovoOverlayModule,
        IMaskDirectiveModule,
        NovoIconModule,
        NovoChipsModule,
        NovoCalendarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDatePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        NovoButtonModule,
                        NovoPipesModule,
                        NovoOverlayModule,
                        IMaskDirectiveModule,
                        NovoIconModule,
                        NovoChipsModule,
                        NovoCalendarModule,
                    ],
                    declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
                    exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLFNBQVM7QUFDVCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNyRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFnQjdELE1BQU0sT0FBTyxvQkFBb0I7O2tIQUFwQixvQkFBb0I7bUhBQXBCLG9CQUFvQixpQkFIaEIscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLGFBVnBILFlBQVk7UUFDWixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCxlQUFlO1FBQ2Ysa0JBQWtCLGFBR1YscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCO21IQUV0RyxvQkFBb0IsWUFiN0IsWUFBWTtRQUNaLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsY0FBYztRQUNkLGVBQWU7UUFDZixrQkFBa0I7NEZBS1Qsb0JBQW9CO2tCQWZoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLGVBQWU7d0JBQ2Ysa0JBQWtCO3FCQUNuQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQztvQkFDdkgsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLENBQUM7aUJBQ25IIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItaW1hc2snO1xuaW1wb3J0IHsgTm92b1BpcGVzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9waXBlcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NhbGVuZGFyJztcbmltcG9ydCB7IE5vdm9DaGlwc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY2hpcHMnO1xuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQgfSBmcm9tICcuL0RhdGVQaWNrZXInO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQgfSBmcm9tICcuL0RhdGVQaWNrZXJJbnB1dCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVJhbmdlSW5wdXRFbGVtZW50IH0gZnJvbSAnLi9EYXRlUmFuZ2VJbnB1dCc7XG5pbXBvcnQgeyBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50IH0gZnJvbSAnLi9NdWx0aURhdGVJbnB1dCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b1BpcGVzTW9kdWxlLFxuICAgIE5vdm9PdmVybGF5TW9kdWxlLFxuICAgIElNYXNrRGlyZWN0aXZlTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgICBOb3ZvQ2FsZW5kYXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9EYXRlUGlja2VyRWxlbWVudCwgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQsIE5vdm9EYXRlUmFuZ2VJbnB1dEVsZW1lbnQsIE5vdm9NdWx0aURhdGVJbnB1dEVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b0RhdGVQaWNrZXJFbGVtZW50LCBOb3ZvRGF0ZVBpY2tlcklucHV0RWxlbWVudCwgTm92b0RhdGVSYW5nZUlucHV0RWxlbWVudCwgTm92b011bHRpRGF0ZUlucHV0RWxlbWVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUGlja2VyTW9kdWxlIHt9XG4iXX0=