import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoAccordion } from './accordion';
import { NovoExpansionPanel, NovoExpansionPanelActionRow } from './expansion-panel';
import { NovoExpansionPanelContent } from './expansion-panel-content';
import { NovoExpansionPanelDescription, NovoExpansionPanelHeader, NovoExpansionPanelTitle } from './expansion-panel-header';
export class NovoExpansionModule {
}
NovoExpansionModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9leHBhbnNpb24vZXhwYW5zaW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQXVCNUgsTUFBTSxPQUFPLG1CQUFtQjs7O1lBckIvQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFlBQVksQ0FBQztnQkFDekQsT0FBTyxFQUFFO29CQUNQLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQiwyQkFBMkI7b0JBQzNCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2Qiw2QkFBNkI7b0JBQzdCLHlCQUF5QjtpQkFDMUI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQiwyQkFBMkI7b0JBQzNCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2Qiw2QkFBNkI7b0JBQzdCLHlCQUF5QjtpQkFDMUI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0FjY29yZGlvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hY2NvcmRpb24nO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9BY2NvcmRpb24gfSBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQgeyBOb3ZvRXhwYW5zaW9uUGFuZWwsIE5vdm9FeHBhbnNpb25QYW5lbEFjdGlvblJvdyB9IGZyb20gJy4vZXhwYW5zaW9uLXBhbmVsJztcbmltcG9ydCB7IE5vdm9FeHBhbnNpb25QYW5lbENvbnRlbnQgfSBmcm9tICcuL2V4cGFuc2lvbi1wYW5lbC1jb250ZW50JztcbmltcG9ydCB7IE5vdm9FeHBhbnNpb25QYW5lbERlc2NyaXB0aW9uLCBOb3ZvRXhwYW5zaW9uUGFuZWxIZWFkZXIsIE5vdm9FeHBhbnNpb25QYW5lbFRpdGxlIH0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwtaGVhZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2RrQWNjb3JkaW9uTW9kdWxlLCBQb3J0YWxNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0FjY29yZGlvbixcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWwsXG4gICAgTm92b0V4cGFuc2lvblBhbmVsQWN0aW9uUm93LFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbEhlYWRlcixcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxUaXRsZSxcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxEZXNjcmlwdGlvbixcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxDb250ZW50LFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvQWNjb3JkaW9uLFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbCxcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxBY3Rpb25Sb3csXG4gICAgTm92b0V4cGFuc2lvblBhbmVsSGVhZGVyLFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbFRpdGxlLFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbERlc2NyaXB0aW9uLFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbENvbnRlbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9FeHBhbnNpb25Nb2R1bGUge31cbiJdfQ==