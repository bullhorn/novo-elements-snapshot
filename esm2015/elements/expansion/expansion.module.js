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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZXhwYW5zaW9uL2V4cGFuc2lvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUF1QjVILE1BQU0sT0FBTyxtQkFBbUI7OztZQXJCL0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxZQUFZLENBQUM7Z0JBQ3pELE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsMkJBQTJCO29CQUMzQix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtvQkFDdkIsNkJBQTZCO29CQUM3Qix5QkFBeUI7aUJBQzFCO2dCQUNELFlBQVksRUFBRTtvQkFDWixhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsMkJBQTJCO29CQUMzQix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtvQkFDdkIsNkJBQTZCO29CQUM3Qix5QkFBeUI7aUJBQzFCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtBY2NvcmRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYWNjb3JkaW9uJztcclxuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vdm9BY2NvcmRpb24gfSBmcm9tICcuL2FjY29yZGlvbic7XHJcbmltcG9ydCB7IE5vdm9FeHBhbnNpb25QYW5lbCwgTm92b0V4cGFuc2lvblBhbmVsQWN0aW9uUm93IH0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwnO1xyXG5pbXBvcnQgeyBOb3ZvRXhwYW5zaW9uUGFuZWxDb250ZW50IH0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwtY29udGVudCc7XHJcbmltcG9ydCB7IE5vdm9FeHBhbnNpb25QYW5lbERlc2NyaXB0aW9uLCBOb3ZvRXhwYW5zaW9uUGFuZWxIZWFkZXIsIE5vdm9FeHBhbnNpb25QYW5lbFRpdGxlIH0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwtaGVhZGVyJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2RrQWNjb3JkaW9uTW9kdWxlLCBQb3J0YWxNb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5vdm9BY2NvcmRpb24sXHJcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWwsXHJcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxBY3Rpb25Sb3csXHJcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxIZWFkZXIsXHJcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxUaXRsZSxcclxuICAgIE5vdm9FeHBhbnNpb25QYW5lbERlc2NyaXB0aW9uLFxyXG4gICAgTm92b0V4cGFuc2lvblBhbmVsQ29udGVudCxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTm92b0FjY29yZGlvbixcclxuICAgIE5vdm9FeHBhbnNpb25QYW5lbCxcclxuICAgIE5vdm9FeHBhbnNpb25QYW5lbEFjdGlvblJvdyxcclxuICAgIE5vdm9FeHBhbnNpb25QYW5lbEhlYWRlcixcclxuICAgIE5vdm9FeHBhbnNpb25QYW5lbFRpdGxlLFxyXG4gICAgTm92b0V4cGFuc2lvblBhbmVsRGVzY3JpcHRpb24sXHJcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxDb250ZW50LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvRXhwYW5zaW9uTW9kdWxlIHt9XHJcbiJdfQ==