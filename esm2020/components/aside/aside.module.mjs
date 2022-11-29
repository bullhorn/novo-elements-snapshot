import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { NovoAsideService } from './aside.service';
import { AsideComponent } from './aside.component';
import * as i0 from "@angular/core";
export class NovoAsideModule {
}
NovoAsideModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAsideModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoAsideModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAsideModule, declarations: [AsideComponent], imports: [OverlayModule, PortalModule] });
NovoAsideModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAsideModule, providers: [NovoAsideService], imports: [[OverlayModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAsideModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule],
                    declarations: [AsideComponent],
                    providers: [NovoAsideService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNpZGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9hc2lkZS9hc2lkZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFPbkQsTUFBTSxPQUFPLGVBQWU7OzZHQUFmLGVBQWU7OEdBQWYsZUFBZSxpQkFIWCxjQUFjLGFBRG5CLGFBQWEsRUFBRSxZQUFZOzhHQUkxQixlQUFlLGFBRmYsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUZwQixDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7NEZBSTNCLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDdEMsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0FzaWRlU2VydmljZSB9IGZyb20gJy4vYXNpZGUuc2VydmljZSc7XG5pbXBvcnQgeyBBc2lkZUNvbXBvbmVudCB9IGZyb20gJy4vYXNpZGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW092ZXJsYXlNb2R1bGUsIFBvcnRhbE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0FzaWRlQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbTm92b0FzaWRlU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Bc2lkZU1vZHVsZSB7fVxuIl19