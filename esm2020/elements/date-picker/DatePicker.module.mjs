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
NovoDatePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDatePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement], imports: [CommonModule,
        FormsModule,
        NovoButtonModule,
        NovoPipesModule,
        NovoOverlayModule,
        IMaskDirectiveModule,
        NovoIconModule,
        NovoChipsModule,
        NovoCalendarModule], exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement] });
NovoDatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, imports: [[
            CommonModule,
            FormsModule,
            NovoButtonModule,
            NovoPipesModule,
            NovoOverlayModule,
            IMaskDirectiveModule,
            NovoIconModule,
            NovoChipsModule,
            NovoCalendarModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLFNBQVM7QUFDVCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNyRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFnQjdELE1BQU0sT0FBTyxvQkFBb0I7O2tIQUFwQixvQkFBb0I7bUhBQXBCLG9CQUFvQixpQkFIaEIscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLGFBVnBILFlBQVk7UUFDWixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCxlQUFlO1FBQ2Ysa0JBQWtCLGFBR1YscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCO21IQUV0RyxvQkFBb0IsWUFkdEI7WUFDUCxZQUFZO1lBQ1osV0FBVztZQUNYLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLG9CQUFvQjtZQUNwQixjQUFjO1lBQ2QsZUFBZTtZQUNmLGtCQUFrQjtTQUNuQjs0RkFJVSxvQkFBb0I7a0JBZmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixrQkFBa0I7cUJBQ25CO29CQUNELFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLDBCQUEwQixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixDQUFDO29CQUN2SCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQztpQkFDbkgiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IElNYXNrRGlyZWN0aXZlTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3BpcGVzJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvYnV0dG9uJztcbmltcG9ydCB7IE5vdm9DYWxlbmRhck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY2FsZW5kYXInO1xuaW1wb3J0IHsgTm92b0NoaXBzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jaGlwcyc7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9pY29uJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyRWxlbWVudCB9IGZyb20gJy4vRGF0ZVBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlcklucHV0RWxlbWVudCB9IGZyb20gJy4vRGF0ZVBpY2tlcklucHV0JztcbmltcG9ydCB7IE5vdm9EYXRlUmFuZ2VJbnB1dEVsZW1lbnQgfSBmcm9tICcuL0RhdGVSYW5nZUlucHV0JztcbmltcG9ydCB7IE5vdm9NdWx0aURhdGVJbnB1dEVsZW1lbnQgfSBmcm9tICcuL011bHRpRGF0ZUlucHV0JztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvUGlwZXNNb2R1bGUsXG4gICAgTm92b092ZXJsYXlNb2R1bGUsXG4gICAgSU1hc2tEaXJlY3RpdmVNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b0NoaXBzTW9kdWxlLFxuICAgIE5vdm9DYWxlbmRhck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0RhdGVQaWNrZXJFbGVtZW50LCBOb3ZvRGF0ZVBpY2tlcklucHV0RWxlbWVudCwgTm92b0RhdGVSYW5nZUlucHV0RWxlbWVudCwgTm92b011bHRpRGF0ZUlucHV0RWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvRGF0ZVBpY2tlckVsZW1lbnQsIE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50LCBOb3ZvRGF0ZVJhbmdlSW5wdXRFbGVtZW50LCBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGVQaWNrZXJNb2R1bGUge31cbiJdfQ==