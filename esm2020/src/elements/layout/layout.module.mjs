// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoLayoutContainer } from './container/layout-container.component';
import { NovoLayoutContent } from './content/layout-content.component';
import { NovoRailComponent } from './rail/rail.component';
import { NovoSidenavComponent } from './sidenav/sidenav.component';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2xheW91dC9sYXlvdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxNQUFNO0FBQ04sT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBTW5FLE1BQU0sT0FBTyxnQkFBZ0I7OzhHQUFoQixnQkFBZ0I7K0dBQWhCLGdCQUFnQixpQkFIWixtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsYUFEcEYsWUFBWSxhQUVaLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQjsrR0FFOUUsZ0JBQWdCLFlBSmxCLENBQUMsWUFBWSxDQUFDOzRGQUlaLGdCQUFnQjtrQkFMNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixDQUFDO29CQUMvRixPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsQ0FBQztpQkFDM0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGF5b3V0Q29udGFpbmVyIH0gZnJvbSAnLi9jb250YWluZXIvbGF5b3V0LWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b0xheW91dENvbnRlbnQgfSBmcm9tICcuL2NvbnRlbnQvbGF5b3V0LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9SYWlsQ29tcG9uZW50IH0gZnJvbSAnLi9yYWlsL3JhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TaWRlbmF2Q29tcG9uZW50IH0gZnJvbSAnLi9zaWRlbmF2L3NpZGVuYXYuY29tcG9uZW50JztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvTGF5b3V0Q29udGFpbmVyLCBOb3ZvTGF5b3V0Q29udGVudCwgTm92b1NpZGVuYXZDb21wb25lbnQsIE5vdm9SYWlsQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05vdm9MYXlvdXRDb250YWluZXIsIE5vdm9MYXlvdXRDb250ZW50LCBOb3ZvU2lkZW5hdkNvbXBvbmVudCwgTm92b1JhaWxDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGF5b3V0TW9kdWxlIHt9XG4iXX0=