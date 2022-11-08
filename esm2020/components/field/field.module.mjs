// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/common';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoButtonModule } from 'novo-elements/components/button';
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
        NovoPickerDirective], imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule], exports: [NovoFieldElement,
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
        NovoPickerDirective] });
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
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9maWVsZC9maWVsZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7QUFxQzNFLE1BQU0sT0FBTyxlQUFlOzs2R0FBZixlQUFlOzhHQUFmLGVBQWUsaUJBaEN4QixnQkFBZ0I7UUFDaEIsb0JBQW9CO1FBQ3BCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsU0FBUztRQUNULHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsMkJBQTJCO1FBQzNCLDRCQUE0QjtRQUM1Qix1QkFBdUI7UUFDdkIsbUJBQW1CLGFBZlgsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixhQWtCN0YsZ0JBQWdCO1FBQ2hCLG9CQUFvQjtRQUNwQixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLFNBQVM7UUFDVCx3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLDRCQUE0QjtRQUM1QiwyQkFBMkI7UUFDM0IsdUJBQXVCO1FBQ3ZCLG1CQUFtQjs4R0FHVixlQUFlLFlBbENqQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQzs0RkFrQ3JGLGVBQWU7a0JBbkMzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDaEcsWUFBWSxFQUFFO3dCQUNaLGdCQUFnQjt3QkFDaEIsb0JBQW9CO3dCQUNwQixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsU0FBUzt3QkFDVCx3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsMkJBQTJCO3dCQUMzQiw0QkFBNEI7d0JBQzVCLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3dCQUNoQixvQkFBb0I7d0JBQ3BCLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixTQUFTO3dCQUNULHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3dCQUN4QixpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3dCQUN2Qiw0QkFBNEI7d0JBQzVCLDJCQUEyQjt3QkFDM0IsdUJBQXVCO3dCQUN2QixtQkFBbUI7cUJBQ3BCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uL292ZXJsYXknO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b0Vycm9yRWxlbWVudCB9IGZyb20gJy4vZXJyb3IvZXJyb3InO1xuaW1wb3J0IHsgTm92b0ZpZWxkRWxlbWVudCwgTm92b0ZpZWxkUHJlZml4RGlyZWN0aXZlLCBOb3ZvRmllbGRTdWZmaXhEaXJlY3RpdmUgfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7IE5vdm9GaWVsZHNFbGVtZW50IH0gZnJvbSAnLi9maWVsZHNldCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZUZvcm1hdERpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybWF0cy9kYXRlLWZvcm1hdCc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVJhbmdlRm9ybWF0RGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtYXRzL2RhdGUtcmFuZ2UtZm9ybWF0JztcbmltcG9ydCB7IE5vdm9EYXRlVGltZUZvcm1hdERpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybWF0cy9kYXRlLXRpbWUtZm9ybWF0JztcbmltcG9ydCB7IE5vdm9UaW1lRm9ybWF0RGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtYXRzL3RpbWUtZm9ybWF0JztcbmltcG9ydCB7IE5vdm9IaW50RWxlbWVudCB9IGZyb20gJy4vaGludC9oaW50JztcbmltcG9ydCB7IE5vdm9JbnB1dCB9IGZyb20gJy4vaW5wdXQnO1xuaW1wb3J0IHsgTm92b1BpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCB9IGZyb20gJy4vdG9nZ2xlL3BpY2tlci10b2dnbGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUsIE5vdm9PcHRpb25Nb2R1bGUsIE5vdm9Db21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvRmllbGRFbGVtZW50LFxuICAgIC8vIE5vdm9MYWJlbEVsZW1lbnQsXG4gICAgTm92b0hpbnRFbGVtZW50LFxuICAgIE5vdm9FcnJvckVsZW1lbnQsXG4gICAgTm92b0lucHV0LFxuICAgIE5vdm9GaWVsZFByZWZpeERpcmVjdGl2ZSxcbiAgICBOb3ZvRmllbGRTdWZmaXhEaXJlY3RpdmUsXG4gICAgTm92b0ZpZWxkc0VsZW1lbnQsXG4gICAgTm92b1RpbWVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b0RhdGVUaW1lRm9ybWF0RGlyZWN0aXZlLFxuICAgIE5vdm9EYXRlUmFuZ2VGb3JtYXREaXJlY3RpdmUsXG4gICAgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQsXG4gICAgTm92b1BpY2tlckRpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9GaWVsZEVsZW1lbnQsXG4gICAgLy8gTm92b0xhYmVsRWxlbWVudCxcbiAgICBOb3ZvSGludEVsZW1lbnQsXG4gICAgTm92b0Vycm9yRWxlbWVudCxcbiAgICBOb3ZvSW5wdXQsXG4gICAgTm92b0ZpZWxkUHJlZml4RGlyZWN0aXZlLFxuICAgIE5vdm9GaWVsZFN1ZmZpeERpcmVjdGl2ZSxcbiAgICBOb3ZvRmllbGRzRWxlbWVudCxcbiAgICBOb3ZvVGltZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBOb3ZvRGF0ZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBOb3ZvRGF0ZVJhbmdlRm9ybWF0RGlyZWN0aXZlLFxuICAgIE5vdm9EYXRlVGltZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudCxcbiAgICBOb3ZvUGlja2VyRGlyZWN0aXZlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRmllbGRNb2R1bGUge31cbiJdfQ==