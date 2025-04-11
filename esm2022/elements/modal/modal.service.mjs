// NG2
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { NovoModalContainerComponent } from './modal-container.component';
// APP
import { NovoModalParams, NovoModalRef } from './modal-ref';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
const DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: 'modal-overlay-backdrop',
    panelClass: 'modal-overlay-panel',
};
export class NovoModalService {
    set parentViewContainer(view) {
        console.warn('parentViewContainer is deprecated');
        this._parentViewContainer = view;
    }
    constructor(injector, overlay) {
        this.injector = injector;
        this.overlay = overlay;
    }
    open(component, params = {}) {
        // Override default configuration
        const modalConfig = DEFAULT_CONFIG;
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(modalConfig);
        this.overlayRef = overlayRef;
        // Instantiate remote control
        const modalRef = new NovoModalRef(component, params, overlayRef);
        const overlayComponent = this.attachModalContainer(NovoModalContainerComponent, overlayRef, modalConfig, modalRef);
        // Pass the instance of the overlay component to the remote control
        modalRef.componentInstance = overlayComponent;
        overlayRef.backdropClick().subscribe(() => modalRef.close());
        return modalRef;
    }
    createOverlay(config) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    attachModalContainer(component, overlayRef, config, modalRef) {
        const injector = this.createInjector(config, modalRef);
        const containerPortal = new ComponentPortal(component, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    createInjector(config, modalRef) {
        const injectionTokens = new WeakMap();
        injectionTokens.set(NovoModalRef, modalRef);
        // Support backwards compatability
        injectionTokens.set(NovoModalParams, modalRef.params);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoModalService, deps: [{ token: i0.Injector }, { token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoModalService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoModalService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i0.Injector }, { type: i1.Overlay }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL21vZGFsL21vZGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLEVBQWdCLFVBQVUsRUFBRSxRQUFRLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFFLE1BQU07QUFDTixPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBUTVELE1BQU0sY0FBYyxHQUFnQjtJQUNsQyxXQUFXLEVBQUUsSUFBSTtJQUNqQixhQUFhLEVBQUUsd0JBQXdCO0lBQ3ZDLFVBQVUsRUFBRSxxQkFBcUI7Q0FDbEMsQ0FBQztBQUdGLE1BQU0sT0FBTyxnQkFBZ0I7SUFJM0IsSUFBSSxtQkFBbUIsQ0FBQyxJQUFzQjtRQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsWUFBb0IsUUFBa0IsRUFBVSxPQUFnQjtRQUE1QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUztJQUFHLENBQUM7SUFFcEUsSUFBSSxDQUFnQyxTQUFTLEVBQUUsU0FBcUIsRUFBRTtRQUNwRSxpQ0FBaUM7UUFDakMsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDO1FBRW5DLDhDQUE4QztRQUM5QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBRTdCLDZCQUE2QjtRQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLFlBQVksQ0FBZ0IsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVoRixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQywyQkFBMkIsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRW5ILG1FQUFtRTtRQUNuRSxRQUFRLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFFOUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUU3RCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQW1CO1FBQ3ZDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsVUFBc0IsRUFBRSxNQUFtQixFQUFFLFFBQXNCO1FBQ3pHLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkUsTUFBTSxZQUFZLEdBQXNCLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFM0UsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFTyxjQUFjLENBQUMsTUFBbUIsRUFBRSxRQUFzQjtRQUNoRSxNQUFNLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRXRDLGVBQWUsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLGtDQUFrQztRQUNsQyxlQUFlLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEQsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxNQUFtQjtRQUMxQyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRWxHLE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDO1lBQ3RDLGdCQUFnQjtZQUNoQixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDL0IsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhO1lBQ25DLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtTQUM5QixDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDOytHQWxFVSxnQkFBZ0I7bUhBQWhCLGdCQUFnQixjQURILE1BQU07OzRGQUNuQixnQkFBZ0I7a0JBRDVCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBQb3J0YWxJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50Jztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b01vZGFsUGFyYW1zLCBOb3ZvTW9kYWxSZWYgfSBmcm9tICcuL21vZGFsLXJlZic7XG5cbmludGVyZmFjZSBNb2RhbENvbmZpZyB7XG4gIHBhbmVsQ2xhc3M/OiBzdHJpbmc7XG4gIGhhc0JhY2tkcm9wPzogYm9vbGVhbjtcbiAgYmFja2Ryb3BDbGFzcz86IHN0cmluZztcbn1cblxuY29uc3QgREVGQVVMVF9DT05GSUc6IE1vZGFsQ29uZmlnID0ge1xuICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgYmFja2Ryb3BDbGFzczogJ21vZGFsLW92ZXJsYXktYmFja2Ryb3AnLFxuICBwYW5lbENsYXNzOiAnbW9kYWwtb3ZlcmxheS1wYW5lbCcsXG59O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE5vdm9Nb2RhbFNlcnZpY2Uge1xuICBfcGFyZW50Vmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbiAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcblxuICBzZXQgcGFyZW50Vmlld0NvbnRhaW5lcih2aWV3OiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgY29uc29sZS53YXJuKCdwYXJlbnRWaWV3Q29udGFpbmVyIGlzIGRlcHJlY2F0ZWQnKTtcbiAgICB0aGlzLl9wYXJlbnRWaWV3Q29udGFpbmVyID0gdmlldztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXkpIHt9XG5cbiAgb3BlbjxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55Pj4oY29tcG9uZW50LCBwYXJhbXM6IFBhcnRpYWw8VD4gPSB7fSkge1xuICAgIC8vIE92ZXJyaWRlIGRlZmF1bHQgY29uZmlndXJhdGlvblxuICAgIGNvbnN0IG1vZGFsQ29uZmlnID0gREVGQVVMVF9DT05GSUc7XG5cbiAgICAvLyBSZXR1cm5zIGFuIE92ZXJsYXlSZWYgd2hpY2ggaXMgYSBQb3J0YWxIb3N0XG4gICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheShtb2RhbENvbmZpZyk7XG4gICAgdGhpcy5vdmVybGF5UmVmID0gb3ZlcmxheVJlZjtcblxuICAgIC8vIEluc3RhbnRpYXRlIHJlbW90ZSBjb250cm9sXG4gICAgY29uc3QgbW9kYWxSZWYgPSBuZXcgTm92b01vZGFsUmVmPHR5cGVvZiBwYXJhbXM+KGNvbXBvbmVudCwgcGFyYW1zLCBvdmVybGF5UmVmKTtcblxuICAgIGNvbnN0IG92ZXJsYXlDb21wb25lbnQgPSB0aGlzLmF0dGFjaE1vZGFsQ29udGFpbmVyKE5vdm9Nb2RhbENvbnRhaW5lckNvbXBvbmVudCwgb3ZlcmxheVJlZiwgbW9kYWxDb25maWcsIG1vZGFsUmVmKTtcblxuICAgIC8vIFBhc3MgdGhlIGluc3RhbmNlIG9mIHRoZSBvdmVybGF5IGNvbXBvbmVudCB0byB0aGUgcmVtb3RlIGNvbnRyb2xcbiAgICBtb2RhbFJlZi5jb21wb25lbnRJbnN0YW5jZSA9IG92ZXJsYXlDb21wb25lbnQ7XG5cbiAgICBvdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4gbW9kYWxSZWYuY2xvc2UoKSk7XG5cbiAgICByZXR1cm4gbW9kYWxSZWY7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoY29uZmlnOiBNb2RhbENvbmZpZykge1xuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSB0aGlzLmdldE92ZXJsYXlDb25maWcoY29uZmlnKTtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoTW9kYWxDb250YWluZXIoY29tcG9uZW50LCBvdmVybGF5UmVmOiBPdmVybGF5UmVmLCBjb25maWc6IE1vZGFsQ29uZmlnLCBtb2RhbFJlZjogTm92b01vZGFsUmVmKSB7XG4gICAgY29uc3QgaW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yKGNvbmZpZywgbW9kYWxSZWYpO1xuICAgIGNvbnN0IGNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50LCBudWxsLCBpbmplY3Rvcik7XG4gICAgY29uc3QgY29udGFpbmVyUmVmOiBDb21wb25lbnRSZWY8YW55PiA9IG92ZXJsYXlSZWYuYXR0YWNoKGNvbnRhaW5lclBvcnRhbCk7XG5cbiAgICByZXR1cm4gY29udGFpbmVyUmVmLmluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbmplY3Rvcihjb25maWc6IE1vZGFsQ29uZmlnLCBtb2RhbFJlZjogTm92b01vZGFsUmVmKTogUG9ydGFsSW5qZWN0b3Ige1xuICAgIGNvbnN0IGluamVjdGlvblRva2VucyA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE5vdm9Nb2RhbFJlZiwgbW9kYWxSZWYpO1xuICAgIC8vIFN1cHBvcnQgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHlcbiAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE5vdm9Nb2RhbFBhcmFtcywgbW9kYWxSZWYucGFyYW1zKTtcblxuICAgIHJldHVybiBuZXcgUG9ydGFsSW5qZWN0b3IodGhpcy5pbmplY3RvciwgaW5qZWN0aW9uVG9rZW5zKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZyhjb25maWc6IE1vZGFsQ29uZmlnKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLmNlbnRlckhvcml6b250YWxseSgpLmNlbnRlclZlcnRpY2FsbHkoKTtcblxuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5LFxuICAgICAgaGFzQmFja2Ryb3A6IGNvbmZpZy5oYXNCYWNrZHJvcCxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IGNvbmZpZy5iYWNrZHJvcENsYXNzLFxuICAgICAgcGFuZWxDbGFzczogY29uZmlnLnBhbmVsQ2xhc3MsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gb3ZlcmxheUNvbmZpZztcbiAgfVxufVxuIl19