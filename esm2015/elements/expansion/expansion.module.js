import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoAccordion } from './accordion';
import { NovoExpansionPanel, NovoExpansionPanelActionRow } from './expansion-panel';
import { NovoExpansionPanelContent } from './expansion-panel-content';
import { NovoExpansionPanelDescription, NovoExpansionPanelHeader, NovoExpansionPanelTitle } from './expansion-panel-header';
import * as i0 from "@angular/core";
export class NovoExpansionModule {
}
NovoExpansionModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoExpansionModule });
NovoExpansionModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoExpansionModule_Factory(t) { return new (t || NovoExpansionModule)(); }, imports: [[CommonModule, CdkAccordionModule, PortalModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoExpansionModule, { declarations: [NovoAccordion,
        NovoExpansionPanel,
        NovoExpansionPanelActionRow,
        NovoExpansionPanelHeader,
        NovoExpansionPanelTitle,
        NovoExpansionPanelDescription,
        NovoExpansionPanelContent], imports: [CommonModule, CdkAccordionModule, PortalModule], exports: [NovoAccordion,
        NovoExpansionPanel,
        NovoExpansionPanelActionRow,
        NovoExpansionPanelHeader,
        NovoExpansionPanelTitle,
        NovoExpansionPanelDescription,
        NovoExpansionPanelContent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoExpansionModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, CdkAccordionModule, PortalModule],
                exports: [
                    NovoAccordion,
                    NovoExpansionPanel,
                    NovoExpansionPanelActionRow,
                    NovoExpansionPanelHeader,
                    NovoExpansionPanelTitle,
                    NovoExpansionPanelDescription,
                    NovoExpansionPanelContent,
                ],
                declarations: [
                    NovoAccordion,
                    NovoExpansionPanel,
                    NovoExpansionPanelActionRow,
                    NovoExpansionPanelHeader,
                    NovoExpansionPanelTitle,
                    NovoExpansionPanelDescription,
                    NovoExpansionPanelContent,
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9leHBhbnNpb24vZXhwYW5zaW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUF1QjVILE1BQU0sT0FBTyxtQkFBbUI7O3VEQUFuQixtQkFBbUI7cUhBQW5CLG1CQUFtQixrQkFwQnJCLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFlBQVksQ0FBQzt3RkFvQjlDLG1CQUFtQixtQkFUNUIsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQiwyQkFBMkI7UUFDM0Isd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IseUJBQXlCLGFBakJqQixZQUFZLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxhQUV0RCxhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLDJCQUEyQjtRQUMzQix3QkFBd0I7UUFDeEIsdUJBQXVCO1FBQ3ZCLDZCQUE2QjtRQUM3Qix5QkFBeUI7a0RBWWhCLG1CQUFtQjtjQXJCL0IsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxZQUFZLENBQUM7Z0JBQ3pELE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsMkJBQTJCO29CQUMzQix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtvQkFDdkIsNkJBQTZCO29CQUM3Qix5QkFBeUI7aUJBQzFCO2dCQUNELFlBQVksRUFBRTtvQkFDWixhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsMkJBQTJCO29CQUMzQix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtvQkFDdkIsNkJBQTZCO29CQUM3Qix5QkFBeUI7aUJBQzFCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtBY2NvcmRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYWNjb3JkaW9uJztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQWNjb3JkaW9uIH0gZnJvbSAnLi9hY2NvcmRpb24nO1xuaW1wb3J0IHsgTm92b0V4cGFuc2lvblBhbmVsLCBOb3ZvRXhwYW5zaW9uUGFuZWxBY3Rpb25Sb3cgfSBmcm9tICcuL2V4cGFuc2lvbi1wYW5lbCc7XG5pbXBvcnQgeyBOb3ZvRXhwYW5zaW9uUGFuZWxDb250ZW50IH0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwtY29udGVudCc7XG5pbXBvcnQgeyBOb3ZvRXhwYW5zaW9uUGFuZWxEZXNjcmlwdGlvbiwgTm92b0V4cGFuc2lvblBhbmVsSGVhZGVyLCBOb3ZvRXhwYW5zaW9uUGFuZWxUaXRsZSB9IGZyb20gJy4vZXhwYW5zaW9uLXBhbmVsLWhlYWRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENka0FjY29yZGlvbk1vZHVsZSwgUG9ydGFsTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9BY2NvcmRpb24sXG4gICAgTm92b0V4cGFuc2lvblBhbmVsLFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbEFjdGlvblJvdyxcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxIZWFkZXIsXG4gICAgTm92b0V4cGFuc2lvblBhbmVsVGl0bGUsXG4gICAgTm92b0V4cGFuc2lvblBhbmVsRGVzY3JpcHRpb24sXG4gICAgTm92b0V4cGFuc2lvblBhbmVsQ29udGVudCxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b0FjY29yZGlvbixcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWwsXG4gICAgTm92b0V4cGFuc2lvblBhbmVsQWN0aW9uUm93LFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbEhlYWRlcixcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxUaXRsZSxcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxEZXNjcmlwdGlvbixcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxDb250ZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRXhwYW5zaW9uTW9kdWxlIHt9XG4iXX0=