// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoModalContainerComponent } from './modal-container.component';
import { NovoModalElement, NovoModalNotificationElement } from './modal.component';
import { NovoModalService } from './modal.service';
import * as i0 from "@angular/core";
export class NovoModalModule {
}
NovoModalModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoModalModule });
NovoModalModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoModalModule_Factory(t) { return new (t || NovoModalModule)(); }, providers: [NovoModalService], imports: [[OverlayModule, PortalModule, CommonModule, NovoButtonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoModalModule, { declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement], imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule], exports: [NovoModalElement, NovoModalNotificationElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoModalModule, [{
        type: NgModule,
        args: [{
                imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule],
                declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement],
                exports: [NovoModalElement, NovoModalNotificationElement],
                providers: [NovoModalService],
                entryComponents: [NovoModalContainerComponent],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL21vZGFsL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBU25ELE1BQU0sT0FBTyxlQUFlOzttREFBZixlQUFlOzZHQUFmLGVBQWUsbUJBSGYsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUhwQixDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixDQUFDO3dGQU0zRCxlQUFlLG1CQUxYLDJCQUEyQixFQUFFLGdCQUFnQixFQUFFLDRCQUE0QixhQURoRixhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsYUFFM0QsZ0JBQWdCLEVBQUUsNEJBQTRCO2tEQUk3QyxlQUFlO2NBUDNCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztnQkFDdEUsWUFBWSxFQUFFLENBQUMsMkJBQTJCLEVBQUUsZ0JBQWdCLEVBQUUsNEJBQTRCLENBQUM7Z0JBQzNGLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLDRCQUE0QixDQUFDO2dCQUN6RCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0IsZUFBZSxFQUFFLENBQUMsMkJBQTJCLENBQUM7YUFDL0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Nb2RhbEVsZW1lbnQsIE5vdm9Nb2RhbE5vdGlmaWNhdGlvbkVsZW1lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW092ZXJsYXlNb2R1bGUsIFBvcnRhbE1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOb3ZvQnV0dG9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50LCBOb3ZvTW9kYWxFbGVtZW50LCBOb3ZvTW9kYWxOb3RpZmljYXRpb25FbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9Nb2RhbEVsZW1lbnQsIE5vdm9Nb2RhbE5vdGlmaWNhdGlvbkVsZW1lbnRdLFxuICBwcm92aWRlcnM6IFtOb3ZvTW9kYWxTZXJ2aWNlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b01vZGFsTW9kdWxlIHt9XG4iXX0=