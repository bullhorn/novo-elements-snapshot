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
                        NovoPickerToggleElement,
                        NovoPickerDirective,
                        NovoAutocompleteElement,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZmllbGQvZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDL0QsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7QUFxQzNFLE1BQU0sT0FBTyxlQUFlOzs2R0FBZixlQUFlOzhHQUFmLGVBQWUsaUJBaEN4QixnQkFBZ0I7UUFDaEIsb0JBQW9CO1FBQ3BCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsU0FBUztRQUNULHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQzVCLHVCQUF1QjtRQUN2QixtQkFBbUI7UUFDbkIsdUJBQXVCLGFBZmYsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixhQWtCN0YsZ0JBQWdCO1FBQ2hCLG9CQUFvQjtRQUNwQixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLFNBQVM7UUFDVCx3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLDRCQUE0QjtRQUM1Qix1QkFBdUI7UUFDdkIsbUJBQW1CO1FBQ25CLHVCQUF1Qjs4R0FHZCxlQUFlLFlBbENqQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQzs0RkFrQ3JGLGVBQWU7a0JBbkMzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDaEcsWUFBWSxFQUFFO3dCQUNaLGdCQUFnQjt3QkFDaEIsb0JBQW9CO3dCQUNwQixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsU0FBUzt3QkFDVCx3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsNEJBQTRCO3dCQUM1Qix1QkFBdUI7d0JBQ3ZCLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3dCQUNoQixvQkFBb0I7d0JBQ3BCLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixTQUFTO3dCQUNULHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3dCQUN4QixpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3dCQUN2Qiw0QkFBNEI7d0JBQzVCLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3dCQUNuQix1QkFBdUI7cUJBQ3hCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICcuLi9jb21tb24vb3ZlcmxheS9PdmVybGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQXV0b2NvbXBsZXRlRWxlbWVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0Vycm9yRWxlbWVudCB9IGZyb20gJy4vZXJyb3IvZXJyb3InO1xuaW1wb3J0IHsgTm92b0ZpZWxkRWxlbWVudCwgTm92b0ZpZWxkUHJlZml4RGlyZWN0aXZlLCBOb3ZvRmllbGRTdWZmaXhEaXJlY3RpdmUgfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7IE5vdm9GaWVsZHNFbGVtZW50IH0gZnJvbSAnLi9maWVsZHNldCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZUZvcm1hdERpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybWF0cy9kYXRlLWZvcm1hdCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVJhbmdlRm9ybWF0RGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtYXRzL2RhdGUtcmFuZ2UtZm9ybWF0JztcbmltcG9ydCB7IE5vdm9UaW1lRm9ybWF0RGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtYXRzL3RpbWUtZm9ybWF0JztcbmltcG9ydCB7IE5vdm9IaW50RWxlbWVudCB9IGZyb20gJy4vaGludC9oaW50JztcbmltcG9ydCB7IE5vdm9JbnB1dCB9IGZyb20gJy4vaW5wdXQnO1xuaW1wb3J0IHsgTm92b1BpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB9IGZyb20gJy4vdG9nZ2xlL3BpY2tlci10b2dnbGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGUsIE5vdm9Db21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvRmllbGRFbGVtZW50LFxuICAgIC8vIE5vdm9MYWJlbEVsZW1lbnQsXG4gICAgTm92b0hpbnRFbGVtZW50LFxuICAgIE5vdm9FcnJvckVsZW1lbnQsXG4gICAgTm92b0lucHV0LFxuICAgIE5vdm9GaWVsZFByZWZpeERpcmVjdGl2ZSxcbiAgICBOb3ZvRmllbGRTdWZmaXhEaXJlY3RpdmUsXG4gICAgTm92b0ZpZWxkc0VsZW1lbnQsXG4gICAgTm92b1RpbWVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVSYW5nZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCxcbiAgICBOb3ZvUGlja2VyRGlyZWN0aXZlLFxuICAgIE5vdm9BdXRvY29tcGxldGVFbGVtZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0ZpZWxkRWxlbWVudCxcbiAgICAvLyBOb3ZvTGFiZWxFbGVtZW50LFxuICAgIE5vdm9IaW50RWxlbWVudCxcbiAgICBOb3ZvRXJyb3JFbGVtZW50LFxuICAgIE5vdm9JbnB1dCxcbiAgICBOb3ZvRmllbGRQcmVmaXhEaXJlY3RpdmUsXG4gICAgTm92b0ZpZWxkU3VmZml4RGlyZWN0aXZlLFxuICAgIE5vdm9GaWVsZHNFbGVtZW50LFxuICAgIE5vdm9UaW1lRm9ybWF0RGlyZWN0aXZlLFxuICAgIE5vdm9EYXRlRm9ybWF0RGlyZWN0aXZlLFxuICAgIE5vdm9EYXRlUmFuZ2VGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQsXG4gICAgTm92b1BpY2tlckRpcmVjdGl2ZSxcbiAgICBOb3ZvQXV0b2NvbXBsZXRlRWxlbWVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ZpZWxkTW9kdWxlIHt9XG4iXX0=