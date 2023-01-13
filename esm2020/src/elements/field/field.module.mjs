// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
import { NovoCommonModule, NovoOptionModule } from '../common';
// APP
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoAutocompleteElement } from './autocomplete/autocomplete.component';
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
        // NovoLabelElement,
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
        NovoAutocompleteElement], imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule], exports: [NovoFieldElement,
        // NovoLabelElement,
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
        NovoAutocompleteElement] });
NovoFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, imports: [[CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule],
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
                        NovoDateTimeFormatDirective,
                        NovoDateRangeFormatDirective,
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
                        NovoDateRangeFormatDirective,
                        NovoDateTimeFormatDirective,
                        NovoPickerToggleElement,
                        NovoPickerDirective,
                        NovoAutocompleteElement,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZmllbGQvZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDL0QsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7QUF1QzNFLE1BQU0sT0FBTyxlQUFlOzs2R0FBZixlQUFlOzhHQUFmLGVBQWUsaUJBbEN4QixnQkFBZ0I7UUFDaEIsb0JBQW9CO1FBQ3BCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsU0FBUztRQUNULHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsMkJBQTJCO1FBQzNCLDRCQUE0QjtRQUM1Qix1QkFBdUI7UUFDdkIsbUJBQW1CO1FBQ25CLHVCQUF1QixhQWhCZixZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLGFBbUI3RixnQkFBZ0I7UUFDaEIsb0JBQW9CO1FBQ3BCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsU0FBUztRQUNULHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQzVCLDJCQUEyQjtRQUMzQix1QkFBdUI7UUFDdkIsbUJBQW1CO1FBQ25CLHVCQUF1Qjs4R0FHZCxlQUFlLFlBcENqQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQzs0RkFvQ3JGLGVBQWU7a0JBckMzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDaEcsWUFBWSxFQUFFO3dCQUNaLGdCQUFnQjt3QkFDaEIsb0JBQW9CO3dCQUNwQixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsU0FBUzt3QkFDVCx3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsMkJBQTJCO3dCQUMzQiw0QkFBNEI7d0JBQzVCLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3dCQUNuQix1QkFBdUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLFNBQVM7d0JBQ1Qsd0JBQXdCO3dCQUN4Qix3QkFBd0I7d0JBQ3hCLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLDRCQUE0Qjt3QkFDNUIsMkJBQTJCO3dCQUMzQix1QkFBdUI7d0JBQ3ZCLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3FCQUN4QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSwgTm92b09wdGlvbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbic7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0F1dG9jb21wbGV0ZUVsZW1lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9FcnJvckVsZW1lbnQgfSBmcm9tICcuL2Vycm9yL2Vycm9yJztcbmltcG9ydCB7IE5vdm9GaWVsZEVsZW1lbnQsIE5vdm9GaWVsZFByZWZpeERpcmVjdGl2ZSwgTm92b0ZpZWxkU3VmZml4RGlyZWN0aXZlIH0gZnJvbSAnLi9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvRmllbGRzRWxlbWVudCB9IGZyb20gJy4vZmllbGRzZXQnO1xuaW1wb3J0IHsgTm92b0RhdGVGb3JtYXREaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm1hdHMvZGF0ZS1mb3JtYXQnO1xuaW1wb3J0IHsgTm92b0RhdGVSYW5nZUZvcm1hdERpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybWF0cy9kYXRlLXJhbmdlLWZvcm1hdCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVRpbWVGb3JtYXREaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm1hdHMvZGF0ZS10aW1lLWZvcm1hdCc7XG5pbXBvcnQgeyBOb3ZvVGltZUZvcm1hdERpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybWF0cy90aW1lLWZvcm1hdCc7XG5pbXBvcnQgeyBOb3ZvSGludEVsZW1lbnQgfSBmcm9tICcuL2hpbnQvaGludCc7XG5pbXBvcnQgeyBOb3ZvSW5wdXQgfSBmcm9tICcuL2lucHV0JztcbmltcG9ydCB7IE5vdm9QaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL3BpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQgfSBmcm9tICcuL3RvZ2dsZS9waWNrZXItdG9nZ2xlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlLCBOb3ZvQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b0ZpZWxkRWxlbWVudCxcbiAgICAvLyBOb3ZvTGFiZWxFbGVtZW50LFxuICAgIE5vdm9IaW50RWxlbWVudCxcbiAgICBOb3ZvRXJyb3JFbGVtZW50LFxuICAgIE5vdm9JbnB1dCxcbiAgICBOb3ZvRmllbGRQcmVmaXhEaXJlY3RpdmUsXG4gICAgTm92b0ZpZWxkU3VmZml4RGlyZWN0aXZlLFxuICAgIE5vdm9GaWVsZHNFbGVtZW50LFxuICAgIE5vdm9UaW1lRm9ybWF0RGlyZWN0aXZlLFxuICAgIE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlLFxuICAgIE5vdm9EYXRlVGltZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBOb3ZvRGF0ZVJhbmdlRm9ybWF0RGlyZWN0aXZlLFxuICAgIE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50LFxuICAgIE5vdm9QaWNrZXJEaXJlY3RpdmUsXG4gICAgTm92b0F1dG9jb21wbGV0ZUVsZW1lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvRmllbGRFbGVtZW50LFxuICAgIC8vIE5vdm9MYWJlbEVsZW1lbnQsXG4gICAgTm92b0hpbnRFbGVtZW50LFxuICAgIE5vdm9FcnJvckVsZW1lbnQsXG4gICAgTm92b0lucHV0LFxuICAgIE5vdm9GaWVsZFByZWZpeERpcmVjdGl2ZSxcbiAgICBOb3ZvRmllbGRTdWZmaXhEaXJlY3RpdmUsXG4gICAgTm92b0ZpZWxkc0VsZW1lbnQsXG4gICAgTm92b1RpbWVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVSYW5nZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBOb3ZvRGF0ZVRpbWVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQsXG4gICAgTm92b1BpY2tlckRpcmVjdGl2ZSxcbiAgICBOb3ZvQXV0b2NvbXBsZXRlRWxlbWVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ZpZWxkTW9kdWxlIHt9XG4iXX0=