import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoExpansionPanelDescription, NovoExpansionPanelHeader, NovoExpansionPanelTitle, } from './expansion-panel-header';
import { NovoExpansionPanelContent } from './expansion-panel-content';
import { NovoExpansionPanel, NovoExpansionPanelActionRow } from './expansion-panel';
import { NovoAccordion } from './accordion';
import * as i0 from "@angular/core";
export class NovoExpansionModule {
}
NovoExpansionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoExpansionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionModule, declarations: [NovoAccordion,
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
        NovoExpansionPanelContent] });
NovoExpansionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionModule, imports: [[CommonModule, CdkAccordionModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionModule, decorators: [{
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
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZXhwYW5zaW9uL2V4cGFuc2lvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCw2QkFBNkIsRUFDN0Isd0JBQXdCLEVBQ3hCLHVCQUF1QixHQUN4QixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBdUI1QyxNQUFNLE9BQU8sbUJBQW1COztpSEFBbkIsbUJBQW1CO2tIQUFuQixtQkFBbUIsaUJBVDVCLGFBQWE7UUFDYixrQkFBa0I7UUFDbEIsMkJBQTJCO1FBQzNCLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsNkJBQTZCO1FBQzdCLHlCQUF5QixhQWpCakIsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFlBQVksYUFFdEQsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQiwyQkFBMkI7UUFDM0Isd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IseUJBQXlCO2tIQVloQixtQkFBbUIsWUFwQnJCLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFlBQVksQ0FBQzs0RkFvQjlDLG1CQUFtQjtrQkFyQi9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFlBQVksQ0FBQztvQkFDekQsT0FBTyxFQUFFO3dCQUNQLGFBQWE7d0JBQ2Isa0JBQWtCO3dCQUNsQiwyQkFBMkI7d0JBQzNCLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLHlCQUF5QjtxQkFDMUI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGFBQWE7d0JBQ2Isa0JBQWtCO3dCQUNsQiwyQkFBMkI7d0JBQzNCLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLHlCQUF5QjtxQkFDMUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtBY2NvcmRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYWNjb3JkaW9uJztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOb3ZvRXhwYW5zaW9uUGFuZWxEZXNjcmlwdGlvbixcbiAgTm92b0V4cGFuc2lvblBhbmVsSGVhZGVyLFxuICBOb3ZvRXhwYW5zaW9uUGFuZWxUaXRsZSxcbn0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwtaGVhZGVyJztcbmltcG9ydCB7IE5vdm9FeHBhbnNpb25QYW5lbENvbnRlbnQgfSBmcm9tICcuL2V4cGFuc2lvbi1wYW5lbC1jb250ZW50JztcbmltcG9ydCB7IE5vdm9FeHBhbnNpb25QYW5lbCwgTm92b0V4cGFuc2lvblBhbmVsQWN0aW9uUm93IH0gZnJvbSAnLi9leHBhbnNpb24tcGFuZWwnO1xuaW1wb3J0IHsgTm92b0FjY29yZGlvbiB9IGZyb20gJy4vYWNjb3JkaW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2RrQWNjb3JkaW9uTW9kdWxlLCBQb3J0YWxNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0FjY29yZGlvbixcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWwsXG4gICAgTm92b0V4cGFuc2lvblBhbmVsQWN0aW9uUm93LFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbEhlYWRlcixcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxUaXRsZSxcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxEZXNjcmlwdGlvbixcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxDb250ZW50LFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvQWNjb3JkaW9uLFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbCxcbiAgICBOb3ZvRXhwYW5zaW9uUGFuZWxBY3Rpb25Sb3csXG4gICAgTm92b0V4cGFuc2lvblBhbmVsSGVhZGVyLFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbFRpdGxlLFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbERlc2NyaXB0aW9uLFxuICAgIE5vdm9FeHBhbnNpb25QYW5lbENvbnRlbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9FeHBhbnNpb25Nb2R1bGUge31cbiJdfQ==