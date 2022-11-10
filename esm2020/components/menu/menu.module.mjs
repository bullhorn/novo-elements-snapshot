import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from 'novo-elements/common';
import { NovoIconModule } from 'novo-elements/components/icon';
import { MenuContentComponent } from './menu-content.component';
import { MenuItemDirective } from './menu-item.directive';
import { MenuComponent } from './menu.component';
import { MenuDirective } from './menu.directive';
import { NovoMenuService } from './menu.service';
import { MENU_OPTIONS } from './menu.tokens';
import * as i0 from "@angular/core";
export class NovoMenuModule {
    static forRoot(options) {
        return {
            ngModule: NovoMenuModule,
            providers: [
                NovoMenuService,
                {
                    provide: MENU_OPTIONS,
                    useValue: options,
                },
                { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
            ],
        };
    }
}
NovoMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMenuModule, declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective], imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule], exports: [MenuDirective, MenuComponent, MenuItemDirective] });
NovoMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMenuModule, imports: [[CommonModule, OverlayModule, NovoCommonModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective],
                    exports: [MenuDirective, MenuComponent, MenuItemDirective],
                    imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL21lbnUvbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLDBCQUEwQixFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25HLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRN0MsTUFBTSxPQUFPLGNBQWM7SUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFzQjtRQUMxQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULGVBQWU7Z0JBQ2Y7b0JBQ0UsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFFBQVEsRUFBRSxPQUFPO2lCQUNsQjtnQkFDRCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUU7YUFDcEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7NEdBYlUsY0FBYzs2R0FBZCxjQUFjLGlCQUpWLGFBQWEsRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLGFBRTFFLFlBQVksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxhQUQ3RCxhQUFhLEVBQUUsYUFBYSxFQUFFLGlCQUFpQjs2R0FHOUMsY0FBYyxZQUZoQixDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDOzRGQUU3RCxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUM7b0JBQ3JGLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLENBQUM7b0JBQzFELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO2lCQUN6RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1bGxzY3JlZW5PdmVybGF5Q29udGFpbmVyLCBPdmVybGF5Q29udGFpbmVyLCBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvaWNvbic7XG5pbXBvcnQgeyBNZW51Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vbWVudS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvTWVudVNlcnZpY2UgfSBmcm9tICcuL21lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBNRU5VX09QVElPTlMgfSBmcm9tICcuL21lbnUudG9rZW5zJztcbmltcG9ydCB7IElNZW51T3B0aW9ucyB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW01lbnVEaXJlY3RpdmUsIE1lbnVDb21wb25lbnQsIE1lbnVDb250ZW50Q29tcG9uZW50LCBNZW51SXRlbURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtNZW51RGlyZWN0aXZlLCBNZW51Q29tcG9uZW50LCBNZW51SXRlbURpcmVjdGl2ZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE5vdm9Db21tb25Nb2R1bGUsIE5vdm9JY29uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b01lbnVNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3Qob3B0aW9ucz86IElNZW51T3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tm92b01lbnVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vdm9NZW51TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE5vdm9NZW51U2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1FTlVfT1BUSU9OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogb3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBPdmVybGF5Q29udGFpbmVyLCB1c2VDbGFzczogRnVsbHNjcmVlbk92ZXJsYXlDb250YWluZXIgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19