import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { AsideComponent } from './aside.component';
import { NovoAsideRef } from './aside-ref';
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
    open(component, params = {}, config = {}) {
        // Override default configuration
        const asideConfig = this.getOverlayConfig({ ...DEFAULT_CONFIG, ...config });
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(asideConfig);
        // Instantiate remote control
        const asideRef = new NovoAsideRef(component, params, overlayRef);
        const overlayComponent = this.attachAsideContainer(AsideComponent, overlayRef, asideConfig, asideRef);
        // Pass the instance of the overlay component to the remote control
        asideRef.componentInstance = overlayComponent;
        overlayRef.backdropClick().subscribe(() => asideRef.close());
        return asideRef;
    }
    createOverlay(config) {
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
        // const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
        const scrollStrategy = config.hasBackdrop ? this.overlay.scrollStrategies.block() : this.overlay.scrollStrategies.noop();
        return {
            scrollStrategy,
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
        };
    }
}
NovoAsideService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAsideService, deps: [{ token: i0.Injector }, { token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable });
NovoAsideService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAsideService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAsideService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.Overlay }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNpZGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUE2QixNQUFNLHNCQUFzQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEUsT0FBTyxFQUFnQixVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7QUFRM0MsTUFBTSxjQUFjLEdBQWdCO0lBQ2xDLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGFBQWEsRUFBRSx3QkFBd0I7SUFDdkMsVUFBVSxFQUFFLHFCQUFxQjtDQUNsQyxDQUFDO0FBR0YsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUFvQixRQUFrQixFQUFVLE9BQWdCO1FBQTVDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQUcsQ0FBQztJQUVwRSxJQUFJLENBQVUsU0FBUyxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsTUFBTSxHQUFHLEVBQUU7UUFDL0MsaUNBQWlDO1FBQ2pDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsY0FBYyxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUU1RSw4Q0FBOEM7UUFDOUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVuRCw2QkFBNkI7UUFDN0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQW1CLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFbkYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFdEcsbUVBQW1FO1FBQ25FLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUU5QyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRTdELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxhQUFhLENBQUMsTUFBbUI7UUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU8sb0JBQW9CLENBQUMsU0FBUyxFQUFFLFVBQXNCLEVBQUUsTUFBbUIsRUFBRSxRQUFzQjtRQUN6RyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV2RCxNQUFNLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sWUFBWSxHQUFzQixVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTNFLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRU8sY0FBYyxDQUFDLE1BQW1CLEVBQUUsUUFBc0I7UUFDaEUsTUFBTSxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUV0QyxlQUFlLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU1QyxPQUFPLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVPLGdCQUFnQixDQUFDLE1BQW1CO1FBQzFDLHFHQUFxRztRQUNyRyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBRXpILE9BQU87WUFDTCxjQUFjO1lBQ2QsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQy9CLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtZQUNuQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7U0FDOUIsQ0FBQztJQUNKLENBQUM7OzhHQXREVSxnQkFBZ0I7a0hBQWhCLGdCQUFnQixjQURILE1BQU07NEZBQ25CLGdCQUFnQjtrQkFENUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBQb3J0YWxJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXNpZGVDb21wb25lbnQgfSBmcm9tICcuL2FzaWRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvQXNpZGVSZWYgfSBmcm9tICcuL2FzaWRlLXJlZic7XG5cbmludGVyZmFjZSBBc2lkZUNvbmZpZyBleHRlbmRzIE92ZXJsYXlDb25maWcge1xuICBwYW5lbENsYXNzPzogc3RyaW5nO1xuICBoYXNCYWNrZHJvcD86IGJvb2xlYW47XG4gIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmc7XG59XG5cbmNvbnN0IERFRkFVTFRfQ09ORklHOiBBc2lkZUNvbmZpZyA9IHtcbiAgaGFzQmFja2Ryb3A6IHRydWUsXG4gIGJhY2tkcm9wQ2xhc3M6ICdhc2lkZS1vdmVybGF5LWJhY2tkcm9wJyxcbiAgcGFuZWxDbGFzczogJ2FzaWRlLW92ZXJsYXktcGFuZWwnLFxufTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBOb3ZvQXNpZGVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSkge31cblxuICBvcGVuPFIgPSBhbnk+KGNvbXBvbmVudCwgcGFyYW1zID0ge30sIGNvbmZpZyA9IHt9KSB7XG4gICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uXG4gICAgY29uc3QgYXNpZGVDb25maWcgPSB0aGlzLmdldE92ZXJsYXlDb25maWcoeyAuLi5ERUZBVUxUX0NPTkZJRywgLi4uY29uZmlnIH0pO1xuXG4gICAgLy8gUmV0dXJucyBhbiBPdmVybGF5UmVmIHdoaWNoIGlzIGEgUG9ydGFsSG9zdFxuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoYXNpZGVDb25maWcpO1xuXG4gICAgLy8gSW5zdGFudGlhdGUgcmVtb3RlIGNvbnRyb2xcbiAgICBjb25zdCBhc2lkZVJlZiA9IG5ldyBOb3ZvQXNpZGVSZWY8dHlwZW9mIHBhcmFtcywgUj4oY29tcG9uZW50LCBwYXJhbXMsIG92ZXJsYXlSZWYpO1xuXG4gICAgY29uc3Qgb3ZlcmxheUNvbXBvbmVudCA9IHRoaXMuYXR0YWNoQXNpZGVDb250YWluZXIoQXNpZGVDb21wb25lbnQsIG92ZXJsYXlSZWYsIGFzaWRlQ29uZmlnLCBhc2lkZVJlZik7XG5cbiAgICAvLyBQYXNzIHRoZSBpbnN0YW5jZSBvZiB0aGUgb3ZlcmxheSBjb21wb25lbnQgdG8gdGhlIHJlbW90ZSBjb250cm9sXG4gICAgYXNpZGVSZWYuY29tcG9uZW50SW5zdGFuY2UgPSBvdmVybGF5Q29tcG9uZW50O1xuXG4gICAgb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IGFzaWRlUmVmLmNsb3NlKCkpO1xuXG4gICAgcmV0dXJuIGFzaWRlUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KGNvbmZpZzogQXNpZGVDb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5LmNyZWF0ZShjb25maWcpO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hBc2lkZUNvbnRhaW5lcihjb21wb25lbnQsIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsIGNvbmZpZzogQXNpZGVDb25maWcsIGFzaWRlUmVmOiBOb3ZvQXNpZGVSZWYpIHtcbiAgICBjb25zdCBpbmplY3RvciA9IHRoaXMuY3JlYXRlSW5qZWN0b3IoY29uZmlnLCBhc2lkZVJlZik7XG5cbiAgICBjb25zdCBjb250YWluZXJQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudCwgbnVsbCwgaW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlZjogQ29tcG9uZW50UmVmPGFueT4gPSBvdmVybGF5UmVmLmF0dGFjaChjb250YWluZXJQb3J0YWwpO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW5qZWN0b3IoY29uZmlnOiBBc2lkZUNvbmZpZywgYXNpZGVSZWY6IE5vdm9Bc2lkZVJlZik6IFBvcnRhbEluamVjdG9yIHtcbiAgICBjb25zdCBpbmplY3Rpb25Ub2tlbnMgPSBuZXcgV2Vha01hcCgpO1xuXG4gICAgaW5qZWN0aW9uVG9rZW5zLnNldChOb3ZvQXNpZGVSZWYsIGFzaWRlUmVmKTtcblxuICAgIHJldHVybiBuZXcgUG9ydGFsSW5qZWN0b3IodGhpcy5pbmplY3RvciwgaW5qZWN0aW9uVG9rZW5zKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZyhjb25maWc6IEFzaWRlQ29uZmlnKTogQXNpZGVDb25maWcge1xuICAgIC8vIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKS5jZW50ZXJIb3Jpem9udGFsbHkoKS5jZW50ZXJWZXJ0aWNhbGx5KCk7XG4gICAgY29uc3Qgc2Nyb2xsU3RyYXRlZ3kgPSBjb25maWcuaGFzQmFja2Ryb3AgPyB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpIDogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMubm9vcCgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgaGFzQmFja2Ryb3A6IGNvbmZpZy5oYXNCYWNrZHJvcCxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IGNvbmZpZy5iYWNrZHJvcENsYXNzLFxuICAgICAgcGFuZWxDbGFzczogY29uZmlnLnBhbmVsQ2xhc3MsXG4gICAgfTtcbiAgfVxufVxuIl19