// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoModalContainerComponent } from './modal-container.component';
import { NovoModalElement, NovoModalNotificationElement } from './modal.component';
import { NovoModalService } from './modal.service';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvbW9kYWwvbW9kYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFRbkQsTUFBTSxPQUFPLGVBQWU7OzZHQUFmLGVBQWU7OEdBQWYsZUFBZSxpQkFKWCwyQkFBMkIsRUFBRSxnQkFBZ0IsRUFBRSw0QkFBNEIsYUFEaEYsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLGFBRTNELGdCQUFnQixFQUFFLDRCQUE0Qjs4R0FHN0MsZUFBZSxhQUZmLENBQUMsZ0JBQWdCLENBQUMsWUFIcEIsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQzs0RkFLM0QsZUFBZTtrQkFOM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztvQkFDdEUsWUFBWSxFQUFFLENBQUMsMkJBQTJCLEVBQUUsZ0JBQWdCLEVBQUUsNEJBQTRCLENBQUM7b0JBQzNGLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLDRCQUE0QixDQUFDO29CQUN6RCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Nb2RhbEVsZW1lbnQsIE5vdm9Nb2RhbE5vdGlmaWNhdGlvbkVsZW1lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW092ZXJsYXlNb2R1bGUsIFBvcnRhbE1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50LCBOb3ZvTW9kYWxFbGVtZW50LCBOb3ZvTW9kYWxOb3RpZmljYXRpb25FbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9Nb2RhbEVsZW1lbnQsIE5vdm9Nb2RhbE5vdGlmaWNhdGlvbkVsZW1lbnRdLFxuICBwcm92aWRlcnM6IFtOb3ZvTW9kYWxTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b01vZGFsTW9kdWxlIHt9XG4iXX0=