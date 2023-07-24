import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9tZW51L21lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTdDLE1BQU0sT0FBTyxjQUFjO0lBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBc0I7UUFDMUMsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmO29CQUNFLE9BQU8sRUFBRSxZQUFZO29CQUNyQixRQUFRLEVBQUUsT0FBTztpQkFDbEI7Z0JBQ0QsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFO2FBQ3BFO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzRHQWJVLGNBQWM7NkdBQWQsY0FBYyxpQkFKVixhQUFhLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixhQUUxRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsYUFEN0QsYUFBYSxFQUFFLGFBQWEsRUFBRSxpQkFBaUI7NkdBRzlDLGNBQWMsWUFGaEIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQzs0RkFFN0QsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixDQUFDO29CQUNyRixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixDQUFDO29CQUMxRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztpQkFDekUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdWxsc2NyZWVuT3ZlcmxheUNvbnRhaW5lciwgT3ZlcmxheUNvbnRhaW5lciwgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9pY29uJztcbmltcG9ydCB7IE1lbnVDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tZW51LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVDb21wb25lbnQgfSBmcm9tICcuL21lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL21lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vdm9NZW51U2VydmljZSB9IGZyb20gJy4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IE1FTlVfT1BUSU9OUyB9IGZyb20gJy4vbWVudS50b2tlbnMnO1xuaW1wb3J0IHsgSU1lbnVPcHRpb25zIH0gZnJvbSAnLi9tZW51LnR5cGVzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTWVudURpcmVjdGl2ZSwgTWVudUNvbXBvbmVudCwgTWVudUNvbnRlbnRDb21wb25lbnQsIE1lbnVJdGVtRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW01lbnVEaXJlY3RpdmUsIE1lbnVDb21wb25lbnQsIE1lbnVJdGVtRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgTm92b0NvbW1vbk1vZHVsZSwgTm92b0ljb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTWVudU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChvcHRpb25zPzogSU1lbnVPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOb3ZvTWVudU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTm92b01lbnVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTm92b01lbnVTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTUVOVV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IE92ZXJsYXlDb250YWluZXIsIHVzZUNsYXNzOiBGdWxsc2NyZWVuT3ZlcmxheUNvbnRhaW5lciB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=