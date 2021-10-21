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
NovoMenuModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoMenuModule });
NovoMenuModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoMenuModule_Factory(t) { return new (t || NovoMenuModule)(); }, imports: [[CommonModule, OverlayModule, NovoCommonModule, NovoIconModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoMenuModule, { declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective], imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule], exports: [MenuDirective, MenuComponent, MenuItemDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoMenuModule, [{
        type: NgModule,
        args: [{
                declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective],
                entryComponents: [MenuContentComponent],
                exports: [MenuDirective, MenuComponent, MenuItemDirective],
                imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvbWVudS9tZW51Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVM3QyxNQUFNLE9BQU8sY0FBYztJQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQXNCO1FBQzFDLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZjtvQkFDRSxPQUFPLEVBQUUsWUFBWTtvQkFDckIsUUFBUSxFQUFFLE9BQU87aUJBQ2xCO2dCQUNELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBRTthQUNwRTtTQUNGLENBQUM7SUFDSixDQUFDOztrREFiVSxjQUFjOzJHQUFkLGNBQWMsa0JBRmhCLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7d0ZBRTdELGNBQWMsbUJBTFYsYUFBYSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsYUFHMUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLGFBRDdELGFBQWEsRUFBRSxhQUFhLEVBQUUsaUJBQWlCO2tEQUc5QyxjQUFjO2NBTjFCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixDQUFDO2dCQUNyRixlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDdkMsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQztnQkFDMUQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7YUFDekUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdWxsc2NyZWVuT3ZlcmxheUNvbnRhaW5lciwgT3ZlcmxheUNvbnRhaW5lciwgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9JY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBNZW51Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vbWVudS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvTWVudVNlcnZpY2UgfSBmcm9tICcuL21lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBNRU5VX09QVElPTlMgfSBmcm9tICcuL21lbnUudG9rZW5zJztcbmltcG9ydCB7IElNZW51T3B0aW9ucyB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW01lbnVEaXJlY3RpdmUsIE1lbnVDb21wb25lbnQsIE1lbnVDb250ZW50Q29tcG9uZW50LCBNZW51SXRlbURpcmVjdGl2ZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW01lbnVDb250ZW50Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW01lbnVEaXJlY3RpdmUsIE1lbnVDb21wb25lbnQsIE1lbnVJdGVtRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgTm92b0NvbW1vbk1vZHVsZSwgTm92b0ljb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTWVudU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChvcHRpb25zPzogSU1lbnVPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOb3ZvTWVudU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTm92b01lbnVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTm92b01lbnVTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTUVOVV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IE92ZXJsYXlDb250YWluZXIsIHVzZUNsYXNzOiBGdWxsc2NyZWVuT3ZlcmxheUNvbnRhaW5lciB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=