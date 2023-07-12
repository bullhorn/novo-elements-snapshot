import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i2 from '@angular/cdk/portal';
import { ComponentPortal, PortalInjector, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Output, Injectable, NgModule } from '@angular/core';
import * as i1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';

class NovoAsideRef {
    constructor(component, params, overlayRef) {
        this.component = component;
        this.params = params;
        this.overlayRef = overlayRef;
        this._beforeClose = new Subject();
        this._afterClosed = new Subject();
        this.isClosed = false;
    }
    // Gets a promise that is resolved when the dialog is closed.
    get onClosed() {
        return this._afterClosed.toPromise();
    }
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    beforeClose() {
        return this._beforeClose.asObservable();
    }
    close(result) {
        // Listen for animation 'start' events
        this.componentInstance.animationStateChanged
            .pipe(filter((event) => event.phaseName === 'start'), take(1))
            .subscribe(() => {
            this._beforeClose.next(result);
            this._beforeClose.complete();
            this.overlayRef.detachBackdrop();
        });
        // Listen for animation 'done' events
        this.componentInstance.animationStateChanged
            .pipe(filter((event) => event.phaseName === 'done' && event.toState === 'leave'), take(1))
            .subscribe(() => {
            this.isClosed = true;
            this.overlayRef.dispose();
            this._afterClosed.next(result);
            this._afterClosed.complete();
            // Make sure to also clear the reference to the
            // component instance to avoid memory leaks
            this.componentInstance = null;
        });
        // Start exit animation
        this.componentInstance.startExitAnimation();
    }
}

const slideInOut = trigger('slideInOut', [
    state('void', style({ transform: 'translateX(100%)' })),
    state('enter', style({ transform: 'none' })),
    state('leave', style({ transform: 'translateX(100%)' })),
    transition('* => *', animate('800ms cubic-bezier(0.2, 1, 0.3, 1)')),
]);

class AsideComponent {
    constructor(injector, asideRef) {
        this.injector = injector;
        this.asideRef = asideRef;
        this.animationStateChanged = new EventEmitter();
        this.animationState = 'enter';
        this.component = new ComponentPortal(asideRef.component, null, injector);
    }
    onAnimationStart(event) {
        this.animationStateChanged.emit(event);
    }
    onAnimationDone(event) {
        this.animationStateChanged.emit(event);
    }
    startExitAnimation() {
        this.animationState = 'leave';
    }
}
AsideComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AsideComponent, deps: [{ token: i0.Injector }, { token: NovoAsideRef }], target: i0.ɵɵFactoryTarget.Component });
AsideComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: AsideComponent, selector: "novo-aside", outputs: { animationStateChanged: "animationStateChanged" }, ngImport: i0, template: "<div class=\"aside-panel\" [@slideInOut]=\"animationState\" (@slideInOut.start)=\"onAnimationStart($event)\"\n  (@slideInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host .aside-panel{background-color:#fff;background-color:var(--background-bright, #ffffff);height:100vh;width:50%;min-width:-webkit-min-content;min-width:-moz-min-content;min-width:min-content;max-width:540px;position:absolute;top:0;right:0px;padding:0;display:flex;justify-content:stretch;align-items:stretch}\n"], directives: [{ type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [slideInOut] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AsideComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-aside', animations: [slideInOut], template: "<div class=\"aside-panel\" [@slideInOut]=\"animationState\" (@slideInOut.start)=\"onAnimationStart($event)\"\n  (@slideInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host .aside-panel{background-color:#fff;background-color:var(--background-bright, #ffffff);height:100vh;width:50%;min-width:-webkit-min-content;min-width:-moz-min-content;min-width:min-content;max-width:540px;position:absolute;top:0;right:0px;padding:0;display:flex;justify-content:stretch;align-items:stretch}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: NovoAsideRef }]; }, propDecorators: { animationStateChanged: [{
                type: Output
            }] } });

const DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: 'aside-overlay-backdrop',
    panelClass: 'aside-overlay-panel',
};
class NovoAsideService {
    constructor(injector, overlay) {
        this.injector = injector;
        this.overlay = overlay;
    }
    open(component, params = {}, config = {}) {
        // Override default configuration
        const asideConfig = this.getOverlayConfig(Object.assign(Object.assign({}, DEFAULT_CONFIG), config));
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

class NovoAsideModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { AsideComponent, NovoAsideModule, NovoAsideRef, NovoAsideService, slideInOut };
//# sourceMappingURL=novo-elements-elements-aside.mjs.map