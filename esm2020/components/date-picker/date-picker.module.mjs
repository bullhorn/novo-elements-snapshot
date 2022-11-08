// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCalendarModule } from 'novo-elements/components/calendar';
import { NovoChipsModule } from 'novo-elements/components/chips';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoDatePickerElement } from './date-picker';
import { NovoDatePickerInputElement } from './date-picker-input';
import { NovoDateRangeInputElement } from './date-range-input';
import { NovoMultiDateInputElement } from './multi-date-input';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQWdCL0QsTUFBTSxPQUFPLG9CQUFvQjs7a0hBQXBCLG9CQUFvQjttSEFBcEIsb0JBQW9CLGlCQUhoQixxQkFBcUIsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsYUFWcEgsWUFBWTtRQUNaLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsY0FBYztRQUNkLGVBQWU7UUFDZixrQkFBa0IsYUFHVixxQkFBcUIsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUI7bUhBRXRHLG9CQUFvQixZQWR0QjtZQUNQLFlBQVk7WUFDWixXQUFXO1lBQ1gsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsY0FBYztZQUNkLGNBQWM7WUFDZCxlQUFlO1lBQ2Ysa0JBQWtCO1NBQ25COzRGQUlVLG9CQUFvQjtrQkFmaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGtCQUFrQjtxQkFDbkI7b0JBQ0QsWUFBWSxFQUFFLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLENBQUM7b0JBQ3ZILE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLDBCQUEwQixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixDQUFDO2lCQUNuSCIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRleHRNYXNrTW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItdGV4dC1tYXNrJztcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21tb24vb3ZlcmxheSc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvY2FsZW5kYXInO1xuaW1wb3J0IHsgTm92b0NoaXBzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2NoaXBzJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2ljb24nO1xuaW1wb3J0IHsgTm92b1BpcGVzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9waXBlcyc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlckVsZW1lbnQgfSBmcm9tICcuL2RhdGUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50IH0gZnJvbSAnLi9kYXRlLXBpY2tlci1pbnB1dCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVJhbmdlSW5wdXRFbGVtZW50IH0gZnJvbSAnLi9kYXRlLXJhbmdlLWlucHV0JztcbmltcG9ydCB7IE5vdm9NdWx0aURhdGVJbnB1dEVsZW1lbnQgfSBmcm9tICcuL211bHRpLWRhdGUtaW5wdXQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxuICAgIE5vdm9QaXBlc01vZHVsZSxcbiAgICBOb3ZvT3ZlcmxheU1vZHVsZSxcbiAgICBUZXh0TWFza01vZHVsZSxcbiAgICBOb3ZvSWNvbk1vZHVsZSxcbiAgICBOb3ZvQ2hpcHNNb2R1bGUsXG4gICAgTm92b0NhbGVuZGFyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvRGF0ZVBpY2tlckVsZW1lbnQsIE5vdm9EYXRlUGlja2VySW5wdXRFbGVtZW50LCBOb3ZvRGF0ZVJhbmdlSW5wdXRFbGVtZW50LCBOb3ZvTXVsdGlEYXRlSW5wdXRFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9EYXRlUGlja2VyRWxlbWVudCwgTm92b0RhdGVQaWNrZXJJbnB1dEVsZW1lbnQsIE5vdm9EYXRlUmFuZ2VJbnB1dEVsZW1lbnQsIE5vdm9NdWx0aURhdGVJbnB1dEVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0ZVBpY2tlck1vZHVsZSB7fVxuIl19