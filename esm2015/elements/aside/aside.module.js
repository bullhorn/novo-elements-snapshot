import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { AsideComponent } from './aside.component';
import { NovoAsideService } from './aside.service';
import * as i0 from "@angular/core";
export class NovoAsideModule {
}
NovoAsideModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoAsideModule });
NovoAsideModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoAsideModule_Factory(t) { return new (t || NovoAsideModule)(); }, providers: [NovoAsideService], imports: [[OverlayModule, PortalModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoAsideModule, { declarations: [AsideComponent], imports: [OverlayModule, PortalModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoAsideModule, [{
        type: NgModule,
        args: [{
                imports: [OverlayModule, PortalModule],
                declarations: [AsideComponent],
                providers: [NovoAsideService],
                entryComponents: [AsideComponent],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNpZGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2FzaWRlL2FzaWRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQVFuRCxNQUFNLE9BQU8sZUFBZTs7bURBQWYsZUFBZTs2R0FBZixlQUFlLG1CQUhmLENBQUMsZ0JBQWdCLENBQUMsWUFGcEIsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO3dGQUszQixlQUFlLG1CQUpYLGNBQWMsYUFEbkIsYUFBYSxFQUFFLFlBQVk7a0RBSzFCLGVBQWU7Y0FOM0IsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7Z0JBQ3RDLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzdCLGVBQWUsRUFBRSxDQUFDLGNBQWMsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBc2lkZUNvbXBvbmVudCB9IGZyb20gJy4vYXNpZGUuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Bc2lkZVNlcnZpY2UgfSBmcm9tICcuL2FzaWRlLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQXNpZGVDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtOb3ZvQXNpZGVTZXJ2aWNlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbQXNpZGVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQXNpZGVNb2R1bGUge31cbiJdfQ==