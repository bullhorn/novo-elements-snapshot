import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoOptionModule } from 'novo-elements/elements/common';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { BreadcrumbElement } from './Breadcrumb';
import { BreadcrumbItemElement } from './breadcrumb-item/BreadcrumbItem';
import { BreadcrumbService } from './Breadcrumb.service';
import * as i0 from "@angular/core";
export class NovoBreadcrumbModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoBreadcrumbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.3", ngImport: i0, type: NovoBreadcrumbModule, declarations: [BreadcrumbElement, BreadcrumbItemElement], imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule, NovoOptionModule], exports: [BreadcrumbElement, BreadcrumbItemElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoBreadcrumbModule, providers: [BreadcrumbService], imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule, NovoOptionModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoBreadcrumbModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule, NovoOptionModule],
                    exports: [BreadcrumbElement, BreadcrumbItemElement],
                    declarations: [BreadcrumbElement, BreadcrumbItemElement],
                    providers: [BreadcrumbService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9icmVhZGNydW1icy9CcmVhZGNydW1iLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFRekQsTUFBTSxPQUFPLG9CQUFvQjs4R0FBcEIsb0JBQW9COytHQUFwQixvQkFBb0IsaUJBSGhCLGlCQUFpQixFQUFFLHFCQUFxQixhQUY3QyxZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsYUFDdkgsaUJBQWlCLEVBQUUscUJBQXFCOytHQUl2QyxvQkFBb0IsYUFGcEIsQ0FBQyxpQkFBaUIsQ0FBQyxZQUhwQixZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxnQkFBZ0I7OzJGQUt0SCxvQkFBb0I7a0JBTmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ2xJLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDO29CQUNuRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQztvQkFDeEQsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7aUJBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvYnV0dG9uJztcbmltcG9ydCB7IE5vdm9PcHRpb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2Ryb3Bkb3duJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9pY29uJztcbmltcG9ydCB7IE5vdm9TZWFyY2hCb3hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3NlYXJjaCc7XG5pbXBvcnQgeyBCcmVhZGNydW1iRWxlbWVudCB9IGZyb20gJy4vQnJlYWRjcnVtYic7XG5pbXBvcnQgeyBCcmVhZGNydW1iSXRlbUVsZW1lbnQgfSBmcm9tICcuL2JyZWFkY3J1bWItaXRlbS9CcmVhZGNydW1iSXRlbSc7XG5pbXBvcnQgeyBCcmVhZGNydW1iU2VydmljZSB9IGZyb20gJy4vQnJlYWRjcnVtYi5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBOb3ZvRHJvcGRvd25Nb2R1bGUsIE5vdm9TZWFyY2hCb3hNb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIE5vdm9JY29uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW0JyZWFkY3J1bWJFbGVtZW50LCBCcmVhZGNydW1iSXRlbUVsZW1lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtCcmVhZGNydW1iRWxlbWVudCwgQnJlYWRjcnVtYkl0ZW1FbGVtZW50XSxcbiAgcHJvdmlkZXJzOiBbQnJlYWRjcnVtYlNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQnJlYWRjcnVtYk1vZHVsZSB7fVxuIl19