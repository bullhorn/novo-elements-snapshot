// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoSidenavComponent } from './sidenav/sidenav.component';
import { NovoRailComponent } from './rail/rail.component';
import { NovoLayoutContent } from './content/layout-content.component';
import { NovoLayoutContainer } from './container/layout-container.component';
import * as i0 from "@angular/core";
export class NovoLayoutModule {
}
NovoLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLayoutModule, declarations: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent], imports: [CommonModule], exports: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent] });
NovoLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLayoutModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent],
                    exports: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvbGF5b3V0L2xheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOztBQU03RSxNQUFNLE9BQU8sZ0JBQWdCOzs4R0FBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0IsaUJBSFosbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLGFBRHBGLFlBQVksYUFFWixtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUI7K0dBRTlFLGdCQUFnQixZQUpsQixDQUFDLFlBQVksQ0FBQzs0RkFJWixnQkFBZ0I7a0JBTDVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsQ0FBQztvQkFDL0YsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUM7aUJBQzNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9TaWRlbmF2Q29tcG9uZW50IH0gZnJvbSAnLi9zaWRlbmF2L3NpZGVuYXYuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9SYWlsQ29tcG9uZW50IH0gZnJvbSAnLi9yYWlsL3JhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9MYXlvdXRDb250ZW50IH0gZnJvbSAnLi9jb250ZW50L2xheW91dC1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTGF5b3V0Q29udGFpbmVyIH0gZnJvbSAnLi9jb250YWluZXIvbGF5b3V0LWNvbnRhaW5lci5jb21wb25lbnQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9MYXlvdXRDb250YWluZXIsIE5vdm9MYXlvdXRDb250ZW50LCBOb3ZvU2lkZW5hdkNvbXBvbmVudCwgTm92b1JhaWxDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTm92b0xheW91dENvbnRhaW5lciwgTm92b0xheW91dENvbnRlbnQsIE5vdm9TaWRlbmF2Q29tcG9uZW50LCBOb3ZvUmFpbENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9MYXlvdXRNb2R1bGUge31cbiJdfQ==