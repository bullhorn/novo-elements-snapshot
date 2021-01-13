import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { NovoAsideRef } from './aside-ref';
import { AsideComponent } from './aside.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
const DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: 'aside-overlay-backdrop',
    panelClass: 'aside-overlay-panel',
};
export class NovoAsideService {
    constructor(injector, overlay) {
        this.injector = injector;
        this.overlay = overlay;
    }
    open(component, params = {}) {
        // Override default configuration
        const asideConfig = DEFAULT_CONFIG;
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(asideConfig);
        // Instantiate remote control
        const asideRef = new NovoAsideRef(component, params, overlayRef);
        const overlayComponent = this.attachAsideContainer(AsideComponent, overlayRef, asideConfig, asideRef);
        // Pass the instance of the overlay component to the remote control
        asideRef.componentInstance = overlayComponent;
        overlayRef.backdropClick().subscribe(() => asideRef.close());
        return overlayRef;
    }
    createOverlay(config) {
        // const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(config);
    }
    attachAsideContainer(component, overlayRef, config, asideRef) {
        const injector = this.createInjector(config, asideRef);
        const containerPortal = new ComponentPortal(component, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    createInjector(config, asideRef) {
        const injectionTokens = new WeakMap();
        injectionTokens.set(NovoAsideRef, asideRef);
        return new PortalInjector(this.injector, injectionTokens);
    }
    getOverlayConfig(config) {
        const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
        const overlayConfig = new OverlayConfig({
            positionStrategy,
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
        });
        return overlayConfig;
    }
}
NovoAsideService.ɵfac = function NovoAsideService_Factory(t) { return new (t || NovoAsideService)(i0.ɵɵinject(i0.Injector), i0.ɵɵinject(i1.Overlay)); };
NovoAsideService.ɵprov = i0.ɵɵdefineInjectable({ token: NovoAsideService, factory: NovoAsideService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoAsideService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i0.Injector }, { type: i1.Overlay }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNpZGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS90cmF2aXMvYnVpbGQvYnVsbGhvcm4vbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2FzaWRlL2FzaWRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBUW5ELE1BQU0sY0FBYyxHQUFnQjtJQUNsQyxXQUFXLEVBQUUsSUFBSTtJQUNqQixhQUFhLEVBQUUsd0JBQXdCO0lBQ3ZDLFVBQVUsRUFBRSxxQkFBcUI7Q0FDbEMsQ0FBQztBQUdGLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBb0IsUUFBa0IsRUFBVSxPQUFnQjtRQUE1QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUztJQUFHLENBQUM7SUFFcEUsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEdBQUcsRUFBRTtRQUN6QixpQ0FBaUM7UUFDakMsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDO1FBRW5DLDhDQUE4QztRQUM5QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRW5ELDZCQUE2QjtRQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXRHLG1FQUFtRTtRQUNuRSxRQUFRLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFFOUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUU3RCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQW1CO1FBQ3ZDLHVEQUF1RDtRQUN2RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsVUFBc0IsRUFBRSxNQUFtQixFQUFFLFFBQXNCO1FBQ3pHLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkUsTUFBTSxZQUFZLEdBQXNCLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFM0UsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFTyxjQUFjLENBQUMsTUFBbUIsRUFBRSxRQUFzQjtRQUNoRSxNQUFNLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRXRDLGVBQWUsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTVDLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsTUFBbUI7UUFDMUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUVsRyxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQztZQUN0QyxnQkFBZ0I7WUFDaEIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQy9CLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtZQUNuQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzs7Z0ZBeERVLGdCQUFnQjt3REFBaEIsZ0JBQWdCLFdBQWhCLGdCQUFnQixtQkFESCxNQUFNO2tEQUNuQixnQkFBZ0I7Y0FENUIsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwsIFBvcnRhbEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRSZWYsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQXNpZGVSZWYgfSBmcm9tICcuL2FzaWRlLXJlZic7XG5pbXBvcnQgeyBBc2lkZUNvbXBvbmVudCB9IGZyb20gJy4vYXNpZGUuY29tcG9uZW50JztcblxuaW50ZXJmYWNlIEFzaWRlQ29uZmlnIHtcbiAgcGFuZWxDbGFzcz86IHN0cmluZztcbiAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xuICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xufVxuXG5jb25zdCBERUZBVUxUX0NPTkZJRzogQXNpZGVDb25maWcgPSB7XG4gIGhhc0JhY2tkcm9wOiB0cnVlLFxuICBiYWNrZHJvcENsYXNzOiAnYXNpZGUtb3ZlcmxheS1iYWNrZHJvcCcsXG4gIHBhbmVsQ2xhc3M6ICdhc2lkZS1vdmVybGF5LXBhbmVsJyxcbn07XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTm92b0FzaWRlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXkpIHt9XG5cbiAgb3Blbihjb21wb25lbnQsIHBhcmFtcyA9IHt9KSB7XG4gICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uXG4gICAgY29uc3QgYXNpZGVDb25maWcgPSBERUZBVUxUX0NPTkZJRztcblxuICAgIC8vIFJldHVybnMgYW4gT3ZlcmxheVJlZiB3aGljaCBpcyBhIFBvcnRhbEhvc3RcbiAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KGFzaWRlQ29uZmlnKTtcblxuICAgIC8vIEluc3RhbnRpYXRlIHJlbW90ZSBjb250cm9sXG4gICAgY29uc3QgYXNpZGVSZWYgPSBuZXcgTm92b0FzaWRlUmVmKGNvbXBvbmVudCwgcGFyYW1zLCBvdmVybGF5UmVmKTtcblxuICAgIGNvbnN0IG92ZXJsYXlDb21wb25lbnQgPSB0aGlzLmF0dGFjaEFzaWRlQ29udGFpbmVyKEFzaWRlQ29tcG9uZW50LCBvdmVybGF5UmVmLCBhc2lkZUNvbmZpZywgYXNpZGVSZWYpO1xuXG4gICAgLy8gUGFzcyB0aGUgaW5zdGFuY2Ugb2YgdGhlIG92ZXJsYXkgY29tcG9uZW50IHRvIHRoZSByZW1vdGUgY29udHJvbFxuICAgIGFzaWRlUmVmLmNvbXBvbmVudEluc3RhbmNlID0gb3ZlcmxheUNvbXBvbmVudDtcblxuICAgIG92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiBhc2lkZVJlZi5jbG9zZSgpKTtcblxuICAgIHJldHVybiBvdmVybGF5UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KGNvbmZpZzogQXNpZGVDb25maWcpIHtcbiAgICAvLyBjb25zdCBvdmVybGF5Q29uZmlnID0gdGhpcy5nZXRPdmVybGF5Q29uZmlnKGNvbmZpZyk7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheS5jcmVhdGUoY29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoQXNpZGVDb250YWluZXIoY29tcG9uZW50LCBvdmVybGF5UmVmOiBPdmVybGF5UmVmLCBjb25maWc6IEFzaWRlQ29uZmlnLCBhc2lkZVJlZjogTm92b0FzaWRlUmVmKSB7XG4gICAgY29uc3QgaW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yKGNvbmZpZywgYXNpZGVSZWYpO1xuXG4gICAgY29uc3QgY29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnQsIG51bGwsIGluamVjdG9yKTtcbiAgICBjb25zdCBjb250YWluZXJSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gb3ZlcmxheVJlZi5hdHRhY2goY29udGFpbmVyUG9ydGFsKTtcblxuICAgIHJldHVybiBjb250YWluZXJSZWYuaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUluamVjdG9yKGNvbmZpZzogQXNpZGVDb25maWcsIGFzaWRlUmVmOiBOb3ZvQXNpZGVSZWYpOiBQb3J0YWxJbmplY3RvciB7XG4gICAgY29uc3QgaW5qZWN0aW9uVG9rZW5zID0gbmV3IFdlYWtNYXAoKTtcblxuICAgIGluamVjdGlvblRva2Vucy5zZXQoTm92b0FzaWRlUmVmLCBhc2lkZVJlZik7XG5cbiAgICByZXR1cm4gbmV3IFBvcnRhbEluamVjdG9yKHRoaXMuaW5qZWN0b3IsIGluamVjdGlvblRva2Vucyk7XG4gIH1cblxuICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoY29uZmlnOiBBc2lkZUNvbmZpZyk6IE92ZXJsYXlDb25maWcge1xuICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKS5jZW50ZXJIb3Jpem9udGFsbHkoKS5jZW50ZXJWZXJ0aWNhbGx5KCk7XG5cbiAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneSxcbiAgICAgIGhhc0JhY2tkcm9wOiBjb25maWcuaGFzQmFja2Ryb3AsXG4gICAgICBiYWNrZHJvcENsYXNzOiBjb25maWcuYmFja2Ryb3BDbGFzcyxcbiAgICAgIHBhbmVsQ2xhc3M6IGNvbmZpZy5wYW5lbENsYXNzLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG92ZXJsYXlDb25maWc7XG4gIH1cbn1cbiJdfQ==