import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovoButtonModule } from '../button/Button.module';
import { NovoOptionModule } from '../common';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
import { BreadcrumbElement } from './Breadcrumb';
import { BreadcrumbItemElement } from './breadcrumb-item/BreadcrumbItem';
import { BreadcrumbService } from './Breadcrumb.service';
import * as i0 from "@angular/core";
export class NovoBreadcrumbModule {
}
NovoBreadcrumbModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBreadcrumbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoBreadcrumbModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBreadcrumbModule, declarations: [BreadcrumbElement, BreadcrumbItemElement], imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule, NovoOptionModule], exports: [BreadcrumbElement, BreadcrumbItemElement] });
NovoBreadcrumbModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBreadcrumbModule, providers: [BreadcrumbService], imports: [[CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule, NovoOptionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBreadcrumbModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule, NovoOptionModule],
                    exports: [BreadcrumbElement, BreadcrumbItemElement],
                    declarations: [BreadcrumbElement, BreadcrumbItemElement],
                    providers: [BreadcrumbService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9icmVhZGNydW1icy9CcmVhZGNydW1iLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBUXpELE1BQU0sT0FBTyxvQkFBb0I7O2tIQUFwQixvQkFBb0I7bUhBQXBCLG9CQUFvQixpQkFIaEIsaUJBQWlCLEVBQUUscUJBQXFCLGFBRjdDLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixhQUN2SCxpQkFBaUIsRUFBRSxxQkFBcUI7bUhBSXZDLG9CQUFvQixhQUZwQixDQUFDLGlCQUFpQixDQUFDLFlBSHJCLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLENBQUM7NEZBS3ZILG9CQUFvQjtrQkFOaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDbEksT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUM7b0JBQ25ELFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDO29CQUN4RCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b09wdGlvbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuLi9kcm9wZG93bi9Ecm9wZG93bi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL0ljb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TZWFyY2hCb3hNb2R1bGUgfSBmcm9tICcuLi9zZWFyY2gvU2VhcmNoQm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBCcmVhZGNydW1iRWxlbWVudCB9IGZyb20gJy4vQnJlYWRjcnVtYic7XG5pbXBvcnQgeyBCcmVhZGNydW1iSXRlbUVsZW1lbnQgfSBmcm9tICcuL2JyZWFkY3J1bWItaXRlbS9CcmVhZGNydW1iSXRlbSc7XG5pbXBvcnQgeyBCcmVhZGNydW1iU2VydmljZSB9IGZyb20gJy4vQnJlYWRjcnVtYi5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBOb3ZvRHJvcGRvd25Nb2R1bGUsIE5vdm9TZWFyY2hCb3hNb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGUsIE5vdm9JY29uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW0JyZWFkY3J1bWJFbGVtZW50LCBCcmVhZGNydW1iSXRlbUVsZW1lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtCcmVhZGNydW1iRWxlbWVudCwgQnJlYWRjcnVtYkl0ZW1FbGVtZW50XSxcbiAgcHJvdmlkZXJzOiBbQnJlYWRjcnVtYlNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQnJlYWRjcnVtYk1vZHVsZSB7fVxuIl19