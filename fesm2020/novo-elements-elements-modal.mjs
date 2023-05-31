import * as i2 from '@angular/cdk/portal';
import { ComponentPortal, PortalInjector, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Output, HostBinding, Input, Injectable, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import * as i2$1 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';

class NovoModalParams {
}
class NovoModalRef {
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

const zoomInOut = trigger('zoomInOut', [
    transition('void => *', [style({ transform: 'scale3d(.3, .3, .3)' }), animate(50)]),
    transition('* => void', [animate(50, style({ transform: 'scale3d(.0, .0, .0)' }))]),
]);

class NovoModalContainerComponent {
    constructor(injector, modalRef) {
        this.injector = injector;
        this.modalRef = modalRef;
        this.animationStateChanged = new EventEmitter();
        this.animationState = 'enter';
        this.initTimestamp = Date.now();
        this.id = `modal-container-${this.initTimestamp}`;
        this.component = new ComponentPortal(modalRef.component, null, injector);
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
NovoModalContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalContainerComponent, deps: [{ token: i0.Injector }, { token: NovoModalRef }], target: i0.ɵɵFactoryTarget.Component });
NovoModalContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoModalContainerComponent, selector: "novo-modal-container", outputs: { animationStateChanged: "animationStateChanged" }, host: { properties: { "id": "this.id" } }, ngImport: i0, template: "<div class=\"modal-container\"\n     [@zoomInOut]=\"animationState\"\n     (@zoomInOut.start)=\"onAnimationStart($event)\"\n     (@zoomInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host{background:rgba(0,0,0,.25)}:host .modal-container{z-index:z(modal);position:fixed;display:flex;align-items:center;justify-content:center;top:0;bottom:0;left:0;right:0}\n"], directives: [{ type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [zoomInOut] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-modal-container', animations: [zoomInOut], template: "<div class=\"modal-container\"\n     [@zoomInOut]=\"animationState\"\n     (@zoomInOut.start)=\"onAnimationStart($event)\"\n     (@zoomInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host{background:rgba(0,0,0,.25)}:host .modal-container{z-index:z(modal);position:fixed;display:flex;align-items:center;justify-content:center;top:0;bottom:0;left:0;right:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: NovoModalRef }]; }, propDecorators: { animationStateChanged: [{
                type: Output
            }], id: [{
                type: HostBinding,
                args: ['id']
            }] } });

// NG2
class NovoModalElement {
    constructor(modalRef) {
        this.modalRef = modalRef;
    }
}
NovoModalElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalElement, deps: [{ token: NovoModalRef }], target: i0.ɵɵFactoryTarget.Component });
NovoModalElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoModalElement, selector: "novo-modal", host: { classAttribute: "novo-modal" }, ngImport: i0, template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer class="novo-modal-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-modal',
                    template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer class="novo-modal-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `,
                    host: {
                        class: 'novo-modal',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NovoModalRef }]; } });
class NovoModalNotificationElement {
    constructor(modalRef) {
        this.modalRef = modalRef;
        this.cancel = new EventEmitter();
        this.modalRef = modalRef;
    }
    close() {
        this.cancel.emit();
        this.modalRef.close();
    }
    ngOnInit() {
        switch (this.type) {
            case 'success':
                this.iconType = 'bhi-check';
                break;
            case 'warning':
                this.iconType = 'bhi-caution-o';
                break;
            case 'error':
                this.iconType = 'bhi-caution-o';
                break;
            case 'custom':
                this.iconType = `bhi-${this.icon}`;
                break;
            default:
                break;
        }
    }
}
NovoModalNotificationElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalNotificationElement, deps: [{ token: NovoModalRef }], target: i0.ɵɵFactoryTarget.Component });
NovoModalNotificationElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoModalNotificationElement, selector: "novo-notification", inputs: { type: "type", icon: "icon" }, outputs: { cancel: "cancel" }, host: { classAttribute: "novo-notification" }, ngImport: i0, template: `
    <novo-button class="modal-close" theme="icon" icon="x" (click)="close()"></novo-button>
    <header class="novo-notification-header"><ng-content select="label,novo-label"></ng-content></header>
    <section class="novo-notification-body notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer class="novo-notification-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, isInline: true, components: [{ type: i2$1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalNotificationElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-notification',
                    template: `
    <novo-button class="modal-close" theme="icon" icon="x" (click)="close()"></novo-button>
    <header class="novo-notification-header"><ng-content select="label,novo-label"></ng-content></header>
    <section class="novo-notification-body notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer class="novo-notification-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `,
                    host: {
                        class: 'novo-notification',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NovoModalRef }]; }, propDecorators: { type: [{
                type: Input
            }], icon: [{
                type: Input
            }], cancel: [{
                type: Output
            }] } });

// NG2
const DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: 'modal-overlay-backdrop',
    panelClass: 'modal-overlay-panel',
};
class NovoModalService {
    constructor(injector, overlay) {
        this.injector = injector;
        this.overlay = overlay;
    }
    set parentViewContainer(view) {
        console.warn('parentViewContainer is deprecated');
        this._parentViewContainer = view;
    }
    open(component, params = {}) {
        // Override default configuration
        const modalConfig = DEFAULT_CONFIG;
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(modalConfig);
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
}
NovoModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalService, deps: [{ token: i0.Injector }, { token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable });
NovoModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.Overlay }]; } });

// NG2
class NovoModalModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { NovoModalContainerComponent, NovoModalElement, NovoModalModule, NovoModalNotificationElement, NovoModalParams, NovoModalRef, NovoModalService, zoomInOut };
//# sourceMappingURL=novo-elements-elements-modal.mjs.map
