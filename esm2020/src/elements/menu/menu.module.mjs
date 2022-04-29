import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from '../common/common.module';
import { NovoIconModule } from '../icon/Icon.module';
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
NovoMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMenuModule, declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective], imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule], exports: [MenuDirective, MenuComponent, MenuItemDirective] });
NovoMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMenuModule, imports: [[CommonModule, OverlayModule, NovoCommonModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective],
                    exports: [MenuDirective, MenuComponent, MenuItemDirective],
                    imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9tZW51L21lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTdDLE1BQU0sT0FBTyxjQUFjO0lBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBc0I7UUFDMUMsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmO29CQUNFLE9BQU8sRUFBRSxZQUFZO29CQUNyQixRQUFRLEVBQUUsT0FBTztpQkFDbEI7Z0JBQ0QsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFO2FBQ3BFO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzJHQWJVLGNBQWM7NEdBQWQsY0FBYyxpQkFKVixhQUFhLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixhQUUxRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsYUFEN0QsYUFBYSxFQUFFLGFBQWEsRUFBRSxpQkFBaUI7NEdBRzlDLGNBQWMsWUFGaEIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQzsyRkFFN0QsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixDQUFDO29CQUNyRixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixDQUFDO29CQUMxRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztpQkFDekUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdWxsc2NyZWVuT3ZlcmxheUNvbnRhaW5lciwgT3ZlcmxheUNvbnRhaW5lciwgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9JY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBNZW51Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vbWVudS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvTWVudVNlcnZpY2UgfSBmcm9tICcuL21lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBNRU5VX09QVElPTlMgfSBmcm9tICcuL21lbnUudG9rZW5zJztcbmltcG9ydCB7IElNZW51T3B0aW9ucyB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW01lbnVEaXJlY3RpdmUsIE1lbnVDb21wb25lbnQsIE1lbnVDb250ZW50Q29tcG9uZW50LCBNZW51SXRlbURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtNZW51RGlyZWN0aXZlLCBNZW51Q29tcG9uZW50LCBNZW51SXRlbURpcmVjdGl2ZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE5vdm9Db21tb25Nb2R1bGUsIE5vdm9JY29uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b01lbnVNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3Qob3B0aW9ucz86IElNZW51T3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tm92b01lbnVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vdm9NZW51TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE5vdm9NZW51U2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1FTlVfT1BUSU9OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogb3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBPdmVybGF5Q29udGFpbmVyLCB1c2VDbGFzczogRnVsbHNjcmVlbk92ZXJsYXlDb250YWluZXIgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19