// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoModalService } from './modal.service';
import { NovoModalElement, NovoModalNotificationElement } from './modal.component';
import { NovoModalContainerComponent } from './modal-container.component';
import { NovoButtonModule } from 'novo-elements/components/button';
import * as i0 from "@angular/core";
export class NovoModalModule {
}
NovoModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalModule, declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement], imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule], exports: [NovoModalElement, NovoModalNotificationElement] });
NovoModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalModule, providers: [NovoModalService], imports: [[OverlayModule, PortalModule, CommonModule, NovoButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule],
                    declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement],
                    exports: [NovoModalElement, NovoModalNotificationElement],
                    providers: [NovoModalService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9tb2RhbC9tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBUW5FLE1BQU0sT0FBTyxlQUFlOzs2R0FBZixlQUFlOzhHQUFmLGVBQWUsaUJBSlgsMkJBQTJCLEVBQUUsZ0JBQWdCLEVBQUUsNEJBQTRCLGFBRGhGLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixhQUUzRCxnQkFBZ0IsRUFBRSw0QkFBNEI7OEdBRzdDLGVBQWUsYUFGZixDQUFDLGdCQUFnQixDQUFDLFlBSHBCLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7NEZBSzNELGVBQWU7a0JBTjNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3RFLFlBQVksRUFBRSxDQUFDLDJCQUEyQixFQUFFLGdCQUFnQixFQUFFLDRCQUE0QixDQUFDO29CQUMzRixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSw0QkFBNEIsQ0FBQztvQkFDekQsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7aUJBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Nb2RhbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b01vZGFsRWxlbWVudCwgTm92b01vZGFsTm90aWZpY2F0aW9uRWxlbWVudCB9IGZyb20gJy4vbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Nb2RhbENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2J1dHRvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPdmVybGF5TW9kdWxlLCBQb3J0YWxNb2R1bGUsIENvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9Nb2RhbENvbnRhaW5lckNvbXBvbmVudCwgTm92b01vZGFsRWxlbWVudCwgTm92b01vZGFsTm90aWZpY2F0aW9uRWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvTW9kYWxFbGVtZW50LCBOb3ZvTW9kYWxOb3RpZmljYXRpb25FbGVtZW50XSxcbiAgcHJvdmlkZXJzOiBbTm92b01vZGFsU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Nb2RhbE1vZHVsZSB7fVxuIl19