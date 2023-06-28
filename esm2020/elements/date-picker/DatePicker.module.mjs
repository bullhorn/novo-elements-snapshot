// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoPipesModule } from 'novo-elements/pipes';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCalendarModule } from 'novo-elements/elements/calendar';
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoChipsModule } from 'novo-elements/elements/chips';
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
        TextMaskModule,
        NovoIconModule,
        NovoChipsModule,
        NovoCalendarModule], exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement] });
NovoDatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, imports: [[
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLFNBQVM7QUFDVCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNyRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFnQjdELE1BQU0sT0FBTyxvQkFBb0I7O2tIQUFwQixvQkFBb0I7bUhBQXBCLG9CQUFvQixpQkFIaEIscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLGFBVnBILFlBQVk7UUFDWixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsY0FBYztRQUNkLGNBQWM7UUFDZCxlQUFlO1FBQ2Ysa0JBQWtCLGFBR1YscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCO21IQUV0RyxvQkFBb0IsWUFkdEI7WUFDUCxZQUFZO1lBQ1osV0FBVztZQUNYLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGNBQWM7WUFDZCxjQUFjO1lBQ2QsZUFBZTtZQUNmLGtCQUFrQjtTQUNuQjs0RkFJVSxvQkFBb0I7a0JBZmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixrQkFBa0I7cUJBQ25CO29CQUNELFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLDBCQUEwQixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixDQUFDO29CQUN2SCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQztpQkFDbkgiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IFRleHRNYXNrTW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItdGV4dC1tYXNrJztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvcGlwZXMnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NhbGVuZGFyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jYWxlbmRhcic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9pY29uJztcbmltcG9ydCB7IE5vdm9DaGlwc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY2hpcHMnO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJFbGVtZW50IH0gZnJvbSAnLi9EYXRlUGlja2VyJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50IH0gZnJvbSAnLi9EYXRlUGlja2VySW5wdXQnO1xuaW1wb3J0IHsgTm92b0RhdGVSYW5nZUlucHV0RWxlbWVudCB9IGZyb20gJy4vRGF0ZVJhbmdlSW5wdXQnO1xuaW1wb3J0IHsgTm92b011bHRpRGF0ZUlucHV0RWxlbWVudCB9IGZyb20gJy4vTXVsdGlEYXRlSW5wdXQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxuICAgIE5vdm9QaXBlc01vZHVsZSxcbiAgICBOb3ZvT3ZlcmxheU1vZHVsZSxcbiAgICBUZXh0TWFza01vZHVsZSxcbiAgICBOb3ZvSWNvbk1vZHVsZSxcbiAgICBOb3ZvQ2hpcHNNb2R1bGUsXG4gICAgTm92b0NhbGVuZGFyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvRGF0ZVBpY2tlckVsZW1lbnQsIE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50LCBOb3ZvRGF0ZVJhbmdlSW5wdXRFbGVtZW50LCBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9EYXRlUGlja2VyRWxlbWVudCwgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQsIE5vdm9EYXRlUmFuZ2VJbnB1dEVsZW1lbnQsIE5vdm9NdWx0aURhdGVJbnB1dEVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZVBpY2tlck1vZHVsZSB7fVxuIl19