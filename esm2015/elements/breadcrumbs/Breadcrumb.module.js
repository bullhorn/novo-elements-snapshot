import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovoButtonModule } from '../button/Button.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
import { BreadcrumbElement } from './Breadcrumb';
import { BreadcrumbItemElement } from './breadcrumb-item/BreadcrumbItem';
import { BreadcrumbService } from './Breadcrumb.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "../dropdown/Dropdown";
import * as i4 from "../search/SearchBox";
import * as i5 from "../button/Button";
import * as i6 from "../icon/Icon";
export class NovoBreadcrumbModule {
}
NovoBreadcrumbModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoBreadcrumbModule });
NovoBreadcrumbModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoBreadcrumbModule_Factory(t) { return new (t || NovoBreadcrumbModule)(); }, providers: [BreadcrumbService], imports: [[CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoBreadcrumbModule, { declarations: [BreadcrumbElement, BreadcrumbItemElement], imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule], exports: [BreadcrumbElement, BreadcrumbItemElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoBreadcrumbModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule],
                exports: [BreadcrumbElement, BreadcrumbItemElement],
                declarations: [BreadcrumbElement, BreadcrumbItemElement],
                providers: [BreadcrumbService],
            }]
    }], null, null); })();
i0.ɵɵsetComponentScope(BreadcrumbElement, [i1.NgClass, i1.NgComponentOutlet, i1.NgForOf, i1.NgIf, i1.NgTemplateOutlet, i1.NgStyle, i1.NgSwitch, i1.NgSwitchCase, i1.NgSwitchDefault, i1.NgPlural, i1.NgPluralCase, i2.RouterOutlet, i2.RouterLink, i2.RouterLinkWithHref, i2.RouterLinkActive, i2.ɵangular_packages_router_router_l, i3.NovoDropdownElement, i3.NovoItemElement, i3.NovoDropdownListElement, i3.NovoDropDownItemHeaderElement, i4.NovoSearchBoxElement, i5.NovoButtonElement, i6.NovoIconComponent, BreadcrumbElement, BreadcrumbItemElement], [i1.AsyncPipe, i1.UpperCasePipe, i1.LowerCasePipe, i1.JsonPipe, i1.SlicePipe, i1.DecimalPipe, i1.PercentPipe, i1.TitleCasePipe, i1.CurrencyPipe, i1.DatePipe, i1.I18nPluralPipe, i1.I18nSelectPipe, i1.KeyValuePipe]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvYnJlYWRjcnVtYnMvQnJlYWRjcnVtYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7O0FBUXpELE1BQU0sT0FBTyxvQkFBb0I7O3dEQUFwQixvQkFBb0I7dUhBQXBCLG9CQUFvQixtQkFGcEIsQ0FBQyxpQkFBaUIsQ0FBQyxZQUhyQixDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO3dGQUtyRyxvQkFBb0IsbUJBSGhCLGlCQUFpQixFQUFFLHFCQUFxQixhQUY3QyxZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsYUFDckcsaUJBQWlCLEVBQUUscUJBQXFCO2tEQUl2QyxvQkFBb0I7Y0FOaEMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO2dCQUNoSCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQztnQkFDbkQsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUM7Z0JBQ3hELFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2FBQy9COzt1QkFGZ0IsaUJBQWlCLDRjQUFqQixpQkFBaUIsRUFBRSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi4vZHJvcGRvd24vRHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9JY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvU2VhcmNoQm94TW9kdWxlIH0gZnJvbSAnLi4vc2VhcmNoL1NlYXJjaEJveC5tb2R1bGUnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYkVsZW1lbnQgfSBmcm9tICcuL0JyZWFkY3J1bWInO1xuaW1wb3J0IHsgQnJlYWRjcnVtYkl0ZW1FbGVtZW50IH0gZnJvbSAnLi9icmVhZGNydW1iLWl0ZW0vQnJlYWRjcnVtYkl0ZW0nO1xuaW1wb3J0IHsgQnJlYWRjcnVtYlNlcnZpY2UgfSBmcm9tICcuL0JyZWFkY3J1bWIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZSwgTm92b0Ryb3Bkb3duTW9kdWxlLCBOb3ZvU2VhcmNoQm94TW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlLCBOb3ZvSWNvbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtCcmVhZGNydW1iRWxlbWVudCwgQnJlYWRjcnVtYkl0ZW1FbGVtZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbQnJlYWRjcnVtYkVsZW1lbnQsIEJyZWFkY3J1bWJJdGVtRWxlbWVudF0sXG4gIHByb3ZpZGVyczogW0JyZWFkY3J1bWJTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0JyZWFkY3J1bWJNb2R1bGUge31cbiJdfQ==