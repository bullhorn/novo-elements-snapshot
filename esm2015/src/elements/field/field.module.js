// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
import { NovoOptionModule } from '../common';
// APP
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoAutocompleteElement } from './autocomplete/autocomplete.component';
import { NovoErrorElement } from './error/error';
import { NovoFieldElement, NovoFieldPrefixDirective, NovoFieldSuffixDirective } from './field';
import { NovoFieldsElement } from './fieldset';
import { NovoDateFormatDirective } from './formats/date-format';
import { NovoTimeFormatDirective } from './formats/time-format';
import { NovoHintElement } from './hint/hint';
import { NovoInput } from './input';
import { NovoPickerDirective } from './picker.directive';
import { NovoPickerToggleElement } from './toggle/picker-toggle.component';
export class NovoFieldModule {
}
NovoFieldModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule],
                declarations: [
                    NovoFieldElement,
                    // NovoLabelElement,
                    NovoHintElement,
                    NovoErrorElement,
                    NovoInput,
                    NovoFieldPrefixDirective,
                    NovoFieldSuffixDirective,
                    NovoFieldsElement,
                    NovoTimeFormatDirective,
                    NovoDateFormatDirective,
                    NovoPickerToggleElement,
                    NovoPickerDirective,
                    NovoAutocompleteElement,
                ],
                exports: [
                    NovoFieldElement,
                    // NovoLabelElement,
                    NovoHintElement,
                    NovoErrorElement,
                    NovoInput,
                    NovoFieldPrefixDirective,
                    NovoFieldSuffixDirective,
                    NovoFieldsElement,
                    NovoTimeFormatDirective,
                    NovoDateFormatDirective,
                    NovoPickerToggleElement,
                    NovoPickerDirective,
                    NovoAutocompleteElement,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2ZpZWxkL2ZpZWxkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFtQzNFLE1BQU0sT0FBTyxlQUFlOzs7WUFqQzNCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQzlFLFlBQVksRUFBRTtvQkFDWixnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtvQkFDcEIsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLFNBQVM7b0JBQ1Qsd0JBQXdCO29CQUN4Qix3QkFBd0I7b0JBQ3hCLGlCQUFpQjtvQkFDakIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsbUJBQW1CO29CQUNuQix1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtvQkFDcEIsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLFNBQVM7b0JBQ1Qsd0JBQXdCO29CQUN4Qix3QkFBd0I7b0JBQ3hCLGlCQUFpQjtvQkFDakIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsbUJBQW1CO29CQUNuQix1QkFBdUI7aUJBQ3hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24nO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXkubW9kdWxlJztcbmltcG9ydCB7IE5vdm9BdXRvY29tcGxldGVFbGVtZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvRXJyb3JFbGVtZW50IH0gZnJvbSAnLi9lcnJvci9lcnJvcic7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50LCBOb3ZvRmllbGRQcmVmaXhEaXJlY3RpdmUsIE5vdm9GaWVsZFN1ZmZpeERpcmVjdGl2ZSB9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHsgTm92b0ZpZWxkc0VsZW1lbnQgfSBmcm9tICcuL2ZpZWxkc2V0JztcbmltcG9ydCB7IE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtYXRzL2RhdGUtZm9ybWF0JztcbmltcG9ydCB7IE5vdm9UaW1lRm9ybWF0RGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtYXRzL3RpbWUtZm9ybWF0JztcbmltcG9ydCB7IE5vdm9IaW50RWxlbWVudCB9IGZyb20gJy4vaGludC9oaW50JztcbmltcG9ydCB7IE5vdm9JbnB1dCB9IGZyb20gJy4vaW5wdXQnO1xuaW1wb3J0IHsgTm92b1BpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB9IGZyb20gJy4vdG9nZ2xlL3BpY2tlci10b2dnbGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvRmllbGRFbGVtZW50LFxuICAgIC8vIE5vdm9MYWJlbEVsZW1lbnQsXG4gICAgTm92b0hpbnRFbGVtZW50LFxuICAgIE5vdm9FcnJvckVsZW1lbnQsXG4gICAgTm92b0lucHV0LFxuICAgIE5vdm9GaWVsZFByZWZpeERpcmVjdGl2ZSxcbiAgICBOb3ZvRmllbGRTdWZmaXhEaXJlY3RpdmUsXG4gICAgTm92b0ZpZWxkc0VsZW1lbnQsXG4gICAgTm92b1RpbWVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQsXG4gICAgTm92b1BpY2tlckRpcmVjdGl2ZSxcbiAgICBOb3ZvQXV0b2NvbXBsZXRlRWxlbWVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9GaWVsZEVsZW1lbnQsXG4gICAgLy8gTm92b0xhYmVsRWxlbWVudCxcbiAgICBOb3ZvSGludEVsZW1lbnQsXG4gICAgTm92b0Vycm9yRWxlbWVudCxcbiAgICBOb3ZvSW5wdXQsXG4gICAgTm92b0ZpZWxkUHJlZml4RGlyZWN0aXZlLFxuICAgIE5vdm9GaWVsZFN1ZmZpeERpcmVjdGl2ZSxcbiAgICBOb3ZvRmllbGRzRWxlbWVudCxcbiAgICBOb3ZvVGltZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBOb3ZvRGF0ZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCxcbiAgICBOb3ZvUGlja2VyRGlyZWN0aXZlLFxuICAgIE5vdm9BdXRvY29tcGxldGVFbGVtZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRmllbGRNb2R1bGUge31cbiJdfQ==