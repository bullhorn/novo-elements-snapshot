// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCommonModule, NovoOptionModule, NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoErrorElement } from './error/error';
import { NovoFieldElement, NovoFieldPrefixDirective, NovoFieldSuffixDirective } from './field';
import { NovoFieldsElement } from './fieldset';
import { NovoDateFormatDirective } from './formats/date-format';
import { NovoDateRangeFormatDirective } from './formats/date-range-format';
import { NovoDateTimeFormatDirective } from './formats/date-time-format';
import { NovoTimeFormatDirective } from './formats/time-format';
import { NovoHintElement } from './hint/hint';
import { NovoInput } from './input';
import { NovoPickerDirective } from './picker.directive';
import { NovoPickerToggleElement } from './toggle/picker-toggle.component';
import * as i0 from "@angular/core";
export class NovoFieldModule {
}
NovoFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, declarations: [NovoFieldElement,
        NovoHintElement,
        NovoErrorElement,
        NovoInput,
        NovoFieldPrefixDirective,
        NovoFieldSuffixDirective,
        NovoFieldsElement,
        NovoTimeFormatDirective,
        NovoDateFormatDirective,
        NovoDateTimeFormatDirective,
        NovoDateRangeFormatDirective,
        NovoPickerToggleElement,
        NovoPickerDirective], imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule], exports: [NovoFieldElement,
        NovoHintElement,
        NovoErrorElement,
        NovoInput,
        NovoFieldPrefixDirective,
        NovoFieldSuffixDirective,
        NovoFieldsElement,
        NovoTimeFormatDirective,
        NovoDateFormatDirective,
        NovoDateRangeFormatDirective,
        NovoDateTimeFormatDirective,
        NovoPickerToggleElement,
        NovoPickerDirective] });
NovoFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, imports: [[CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule],
                    declarations: [
                        NovoFieldElement,
                        NovoHintElement,
                        NovoErrorElement,
                        NovoInput,
                        NovoFieldPrefixDirective,
                        NovoFieldSuffixDirective,
                        NovoFieldsElement,
                        NovoTimeFormatDirective,
                        NovoDateFormatDirective,
                        NovoDateTimeFormatDirective,
                        NovoDateRangeFormatDirective,
                        NovoPickerToggleElement,
                        NovoPickerDirective,
                    ],
                    exports: [
                        NovoFieldElement,
                        NovoHintElement,
                        NovoErrorElement,
                        NovoInput,
                        NovoFieldPrefixDirective,
                        NovoFieldSuffixDirective,
                        NovoFieldsElement,
                        NovoTimeFormatDirective,
                        NovoDateFormatDirective,
                        NovoDateRangeFormatDirective,
                        NovoDateTimeFormatDirective,
                        NovoPickerToggleElement,
                        NovoPickerDirective,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZmllbGQvZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMvRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQW1DM0UsTUFBTSxPQUFPLGVBQWU7OzZHQUFmLGVBQWU7OEdBQWYsZUFBZSxpQkE5QnhCLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLFNBQVM7UUFDVCx3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsdUJBQXVCO1FBQ3ZCLG1CQUFtQixhQWRYLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsYUFpQjdGLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLFNBQVM7UUFDVCx3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLDRCQUE0QjtRQUM1QiwyQkFBMkI7UUFDM0IsdUJBQXVCO1FBQ3ZCLG1CQUFtQjs4R0FHVixlQUFlLFlBaENqQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQzs0RkFnQ3JGLGVBQWU7a0JBakMzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDaEcsWUFBWSxFQUFFO3dCQUNaLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLFNBQVM7d0JBQ1Qsd0JBQXdCO3dCQUN4Qix3QkFBd0I7d0JBQ3hCLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLDJCQUEyQjt3QkFDM0IsNEJBQTRCO3dCQUM1Qix1QkFBdUI7d0JBQ3ZCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLFNBQVM7d0JBQ1Qsd0JBQXdCO3dCQUN4Qix3QkFBd0I7d0JBQ3hCLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLDRCQUE0Qjt3QkFDNUIsMkJBQTJCO3dCQUMzQix1QkFBdUI7d0JBQ3ZCLG1CQUFtQjtxQkFDcEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSwgTm92b09wdGlvbk1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRXJyb3JFbGVtZW50IH0gZnJvbSAnLi9lcnJvci9lcnJvcic7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50LCBOb3ZvRmllbGRQcmVmaXhEaXJlY3RpdmUsIE5vdm9GaWVsZFN1ZmZpeERpcmVjdGl2ZSB9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHsgTm92b0ZpZWxkc0VsZW1lbnQgfSBmcm9tICcuL2ZpZWxkc2V0JztcbmltcG9ydCB7IE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtYXRzL2RhdGUtZm9ybWF0JztcbmltcG9ydCB7IE5vdm9EYXRlUmFuZ2VGb3JtYXREaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm1hdHMvZGF0ZS1yYW5nZS1mb3JtYXQnO1xuaW1wb3J0IHsgTm92b0RhdGVUaW1lRm9ybWF0RGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtYXRzL2RhdGUtdGltZS1mb3JtYXQnO1xuaW1wb3J0IHsgTm92b1RpbWVGb3JtYXREaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm1hdHMvdGltZS1mb3JtYXQnO1xuaW1wb3J0IHsgTm92b0hpbnRFbGVtZW50IH0gZnJvbSAnLi9oaW50L2hpbnQnO1xuaW1wb3J0IHsgTm92b0lucHV0IH0gZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgeyBOb3ZvUGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9waWNrZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50IH0gZnJvbSAnLi90b2dnbGUvcGlja2VyLXRvZ2dsZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlLCBOb3ZvT3ZlcmxheU1vZHVsZSwgTm92b09wdGlvbk1vZHVsZSwgTm92b0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9GaWVsZEVsZW1lbnQsXG4gICAgTm92b0hpbnRFbGVtZW50LFxuICAgIE5vdm9FcnJvckVsZW1lbnQsXG4gICAgTm92b0lucHV0LFxuICAgIE5vdm9GaWVsZFByZWZpeERpcmVjdGl2ZSxcbiAgICBOb3ZvRmllbGRTdWZmaXhEaXJlY3RpdmUsXG4gICAgTm92b0ZpZWxkc0VsZW1lbnQsXG4gICAgTm92b1RpbWVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVUaW1lRm9ybWF0RGlyZWN0aXZlLFxuICAgIE5vdm9EYXRlUmFuZ2VGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQsXG4gICAgTm92b1BpY2tlckRpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9GaWVsZEVsZW1lbnQsXG4gICAgTm92b0hpbnRFbGVtZW50LFxuICAgIE5vdm9FcnJvckVsZW1lbnQsXG4gICAgTm92b0lucHV0LFxuICAgIE5vdm9GaWVsZFByZWZpeERpcmVjdGl2ZSxcbiAgICBOb3ZvRmllbGRTdWZmaXhEaXJlY3RpdmUsXG4gICAgTm92b0ZpZWxkc0VsZW1lbnQsXG4gICAgTm92b1RpbWVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVSYW5nZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBOb3ZvRGF0ZVRpbWVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQsXG4gICAgTm92b1BpY2tlckRpcmVjdGl2ZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ZpZWxkTW9kdWxlIHt9XG4iXX0=