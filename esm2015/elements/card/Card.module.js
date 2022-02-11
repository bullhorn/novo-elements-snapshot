// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
import { NovoIconModule } from '../icon';
// APP
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { CardActionsElement, CardContentElement, CardElement, CardFooterElement, CardHeaderElement } from './Card';
import * as i0 from "@angular/core";
export class NovoCardModule {
}
NovoCardModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoCardModule });
NovoCardModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoCardModule_Factory(t) { return new (t || NovoCardModule)(); }, imports: [[CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoCardModule, { declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement], imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule], exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCardModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
                declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2FyZC9DYXJkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6QyxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7QUFPbkgsTUFBTSxPQUFPLGNBQWM7O2tEQUFkLGNBQWM7MkdBQWQsY0FBYyxrQkFKaEIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO3dGQUlwRixjQUFjLG1CQUhWLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsYUFEOUYsWUFBWSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsYUFFcEYsV0FBVyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQjtrREFFeEYsY0FBYztjQUwxQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztnQkFDL0YsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO2dCQUN6RyxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7YUFDckciLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbic7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi4vbG9hZGluZy9Mb2FkaW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvVG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FyZEFjdGlvbnNFbGVtZW50LCBDYXJkQ29udGVudEVsZW1lbnQsIENhcmRFbGVtZW50LCBDYXJkRm9vdGVyRWxlbWVudCwgQ2FyZEhlYWRlckVsZW1lbnQgfSBmcm9tICcuL0NhcmQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvSWNvbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZSwgTm92b0xvYWRpbmdNb2R1bGUsIE5vdm9Ub29sdGlwTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2FyZEVsZW1lbnQsIENhcmRBY3Rpb25zRWxlbWVudCwgQ2FyZENvbnRlbnRFbGVtZW50LCBDYXJkSGVhZGVyRWxlbWVudCwgQ2FyZEZvb3RlckVsZW1lbnRdLFxuICBleHBvcnRzOiBbQ2FyZEVsZW1lbnQsIENhcmRBY3Rpb25zRWxlbWVudCwgQ2FyZENvbnRlbnRFbGVtZW50LCBDYXJkSGVhZGVyRWxlbWVudCwgQ2FyZEZvb3RlckVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FyZE1vZHVsZSB7fVxuIl19