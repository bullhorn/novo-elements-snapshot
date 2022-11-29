import * as i2 from '@angular/cdk/portal';
import { ComponentPortal, PortalInjector, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Output, HostBinding, Input, Injectable, NgModule } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import * as i2$1 from 'novo-elements/components/button';
import { NovoButtonModule } from 'novo-elements/components/button';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';

const zoomInOut = trigger('zoomInOut', [
    transition('void => *', [style({ transform: 'scale3d(.3, .3, .3)' }), animate(50)]),
    transition('* => void', [animate(50, style({ transform: 'scale3d(.0, .0, .0)' }))]),
]);

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
  `, isInline: true, styles: [":host{display:block;background-color:var(--color-background);border-radius:4px;box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:var(--spacing-xl);top:var(--spacing-xl)}:host>header{border-top-left-radius:4px;border-top-right-radius:4px;overflow:hidden}:host>header h1,:host>header h2{font-weight:500;line-height:1.5;color:var(--color-text);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host>header h1.text-capitalize,:host>header h2.text-capitalize{text-transform:capitalize}:host>header h1.text-uppercase,:host>header h2.text-uppercase{text-transform:uppercase}:host>header h1.text-nowrap,:host>header h2.text-nowrap{white-space:nowrap}:host>header h1.text-ellipsis,:host>header h2.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>header h1.text-size-default,:host>header h2.text-size-default{font-size:inherit}:host>header h1.text-size-body,:host>header h2.text-size-body{font-size:var(--font-size-body)}:host>header h1.text-size-xs,:host>header h2.text-size-xs{font-size:var(--font-size-xs)}:host>header h1.text-size-sm,:host>header h2.text-size-sm{font-size:var(--font-size-sm)}:host>header h1.text-size-md,:host>header h2.text-size-md{font-size:var(--font-size-md)}:host>header h1.text-size-lg,:host>header h2.text-size-lg{font-size:var(--font-size-lg)}:host>header h1.text-size-xl,:host>header h2.text-size-xl{font-size:var(--font-size-xl)}:host>header h1.text-size-2xl,:host>header h2.text-size-2xl{font-size:var(--font-size-2xl)}:host>header h1.text-size-3xl,:host>header h2.text-size-3xl{font-size:var(--font-size-3xl)}:host>header h1.text-size-smaller,:host>header h2.text-size-smaller{font-size:.8em}:host>header h1.text-size-larger,:host>header h2.text-size-larger{font-size:1.2em}:host>header h1.text-color-person,:host>header h2.text-color-person{color:var(--color-person)}:host>header h1.text-color-company,:host>header h2.text-color-company{color:var(--color-company)}:host>header h1.text-color-candidate,:host>header h2.text-color-candidate{color:var(--color-candidate)}:host>header h1.text-color-lead,:host>header h2.text-color-lead{color:var(--color-lead)}:host>header h1.text-color-contact,:host>header h2.text-color-contact{color:var(--color-contact)}:host>header h1.text-color-clientcontact,:host>header h2.text-color-clientcontact{color:var(--color-clientcontact)}:host>header h1.text-color-opportunity,:host>header h2.text-color-opportunity{color:var(--color-opportunity)}:host>header h1.text-color-job,:host>header h2.text-color-job{color:var(--color-job)}:host>header h1.text-color-joborder,:host>header h2.text-color-joborder{color:var(--color-joborder)}:host>header h1.text-color-submission,:host>header h2.text-color-submission{color:var(--color-submission)}:host>header h1.text-color-sendout,:host>header h2.text-color-sendout{color:var(--color-sendout)}:host>header h1.text-color-placement,:host>header h2.text-color-placement{color:var(--color-placement)}:host>header h1.text-color-note,:host>header h2.text-color-note{color:var(--color-note)}:host>header h1.text-color-task,:host>header h2.text-color-task{color:var(--color-task)}:host>header h1.text-color-distribution-list,:host>header h2.text-color-distribution-list{color:var(--color-distribution-list)}:host>header h1.text-color-credential,:host>header h2.text-color-credential{color:var(--color-credential)}:host>header h1.text-color-user,:host>header h2.text-color-user{color:var(--color-user)}:host>header h1.text-color-corporate-user,:host>header h2.text-color-corporate-user{color:var(--color-corporate-user)}:host>header h1.text-color-contract,:host>header h2.text-color-contract{color:var(--color-contract)}:host>header h1.text-color-job-code,:host>header h2.text-color-job-code{color:var(--color-job-code)}:host>header h1.text-color-earn-code,:host>header h2.text-color-earn-code{color:var(--color-earn-code)}:host>header h1.text-color-billable-charge,:host>header h2.text-color-billable-charge{color:var(--color-billable-charge)}:host>header h1.text-color-payable-charge,:host>header h2.text-color-payable-charge{color:var(--color-payable-charge)}:host>header h1.text-color-invoice-statement,:host>header h2.text-color-invoice-statement{color:var(--color-invoice-statement)}:host>header h1.text-color-selection,:host>header h2.text-color-selection{color:var(--color-selection)}:host>header h1.text-color-positive,:host>header h2.text-color-positive{color:var(--color-positive)}:host>header h1.text-color-success,:host>header h2.text-color-success{color:var(--color-success)}:host>header h1.text-color-warning,:host>header h2.text-color-warning{color:var(--color-warning)}:host>header h1.text-color-error,:host>header h2.text-color-error{color:var(--color-error)}:host>header h1.text-color-info,:host>header h2.text-color-info{color:var(--color-info)}:host>header h1.text-color-disabled,:host>header h2.text-color-disabled{color:var(--color-disabled)}:host>header h1.text-color-red,:host>header h2.text-color-red{color:var(--palette-red-50)}:host>header h1.text-color-pink,:host>header h2.text-color-pink{color:var(--palette-pink-50)}:host>header h1.text-color-orange,:host>header h2.text-color-orange{color:var(--palette-orange-50)}:host>header h1.text-color-yellow,:host>header h2.text-color-yellow{color:var(--palette-yellow-50)}:host>header h1.text-color-green,:host>header h2.text-color-green{color:var(--palette-green-50)}:host>header h1.text-color-teal,:host>header h2.text-color-teal{color:var(--palette-teal-50)}:host>header h1.text-color-blue,:host>header h2.text-color-blue{color:var(--palette-blue-50)}:host>header h1.text-color-aqua,:host>header h2.text-color-aqua{color:var(--palette-aqua-50)}:host>header h1.text-color-indigo,:host>header h2.text-color-indigo{color:var(--palette-indigo-50)}:host>header h1.text-color-violet,:host>header h2.text-color-violet{color:var(--palette-violet-50)}:host>header h1.text-color-gray,:host>header h2.text-color-gray{color:var(--palette-gray-50)}:host>header h1.margin-before,:host>header h2.margin-before{margin-top:.4rem}:host>header h1.margin-after,:host>header h2.margin-after{margin-bottom:.8rem}:host>header h1.text-length-small,:host>header h2.text-length-small{max-width:40ch}:host>header h1.text-length-medium,:host>header h2.text-length-medium{max-width:55ch}:host>header h1.text-length-large,:host>header h2.text-length-large{max-width:70ch}:host>header h1.text-weight-hairline,:host>header h2.text-weight-hairline{font-weight:100}:host>header h1.text-weight-thin,:host>header h2.text-weight-thin{font-weight:200}:host>header h1.text-weight-light,:host>header h2.text-weight-light{font-weight:300}:host>header h1.text-weight-normal,:host>header h2.text-weight-normal{font-weight:400}:host>header h1.text-weight-medium,:host>header h2.text-weight-medium{font-weight:500}:host>header h1.text-weight-semibold,:host>header h2.text-weight-semibold{font-weight:600}:host>header h1.text-weight-bold,:host>header h2.text-weight-bold{font-weight:700}:host>header h1.text-weight-extrabold,:host>header h2.text-weight-extrabold{font-weight:800}:host>header h1.text-weight-heavy,:host>header h2.text-weight-heavy{font-weight:900}:host>header h1.text-weight-lighter,:host>header h2.text-weight-lighter{font-weight:lighter}:host>header h1.text-weight-bolder,:host>header h2.text-weight-bolder{font-weight:bolder}:host>section{padding:var(--spacing-md) var(--spacing-xl);max-height:500px;overflow:auto}:host .novo-modal-footer{display:flex;align-items:center;justify-content:flex-end;padding:var(--spacing-md);gap:var(--spacing-md)}:host .novo-modal-footer button{min-width:10rem}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-modal', template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer class="novo-modal-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, host: {
                        class: 'novo-modal',
                    }, styles: [":host{display:block;background-color:var(--color-background);border-radius:4px;box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:500;position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:var(--spacing-xl);top:var(--spacing-xl)}:host>header{border-top-left-radius:4px;border-top-right-radius:4px;overflow:hidden}:host>header h1,:host>header h2{font-weight:500;line-height:1.5;color:var(--color-text);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host>header h1.text-capitalize,:host>header h2.text-capitalize{text-transform:capitalize}:host>header h1.text-uppercase,:host>header h2.text-uppercase{text-transform:uppercase}:host>header h1.text-nowrap,:host>header h2.text-nowrap{white-space:nowrap}:host>header h1.text-ellipsis,:host>header h2.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>header h1.text-size-default,:host>header h2.text-size-default{font-size:inherit}:host>header h1.text-size-body,:host>header h2.text-size-body{font-size:var(--font-size-body)}:host>header h1.text-size-xs,:host>header h2.text-size-xs{font-size:var(--font-size-xs)}:host>header h1.text-size-sm,:host>header h2.text-size-sm{font-size:var(--font-size-sm)}:host>header h1.text-size-md,:host>header h2.text-size-md{font-size:var(--font-size-md)}:host>header h1.text-size-lg,:host>header h2.text-size-lg{font-size:var(--font-size-lg)}:host>header h1.text-size-xl,:host>header h2.text-size-xl{font-size:var(--font-size-xl)}:host>header h1.text-size-2xl,:host>header h2.text-size-2xl{font-size:var(--font-size-2xl)}:host>header h1.text-size-3xl,:host>header h2.text-size-3xl{font-size:var(--font-size-3xl)}:host>header h1.text-size-smaller,:host>header h2.text-size-smaller{font-size:.8em}:host>header h1.text-size-larger,:host>header h2.text-size-larger{font-size:1.2em}:host>header h1.text-color-person,:host>header h2.text-color-person{color:var(--color-person)}:host>header h1.text-color-company,:host>header h2.text-color-company{color:var(--color-company)}:host>header h1.text-color-candidate,:host>header h2.text-color-candidate{color:var(--color-candidate)}:host>header h1.text-color-lead,:host>header h2.text-color-lead{color:var(--color-lead)}:host>header h1.text-color-contact,:host>header h2.text-color-contact{color:var(--color-contact)}:host>header h1.text-color-clientcontact,:host>header h2.text-color-clientcontact{color:var(--color-clientcontact)}:host>header h1.text-color-opportunity,:host>header h2.text-color-opportunity{color:var(--color-opportunity)}:host>header h1.text-color-job,:host>header h2.text-color-job{color:var(--color-job)}:host>header h1.text-color-joborder,:host>header h2.text-color-joborder{color:var(--color-joborder)}:host>header h1.text-color-submission,:host>header h2.text-color-submission{color:var(--color-submission)}:host>header h1.text-color-sendout,:host>header h2.text-color-sendout{color:var(--color-sendout)}:host>header h1.text-color-placement,:host>header h2.text-color-placement{color:var(--color-placement)}:host>header h1.text-color-note,:host>header h2.text-color-note{color:var(--color-note)}:host>header h1.text-color-task,:host>header h2.text-color-task{color:var(--color-task)}:host>header h1.text-color-distribution-list,:host>header h2.text-color-distribution-list{color:var(--color-distribution-list)}:host>header h1.text-color-credential,:host>header h2.text-color-credential{color:var(--color-credential)}:host>header h1.text-color-user,:host>header h2.text-color-user{color:var(--color-user)}:host>header h1.text-color-corporate-user,:host>header h2.text-color-corporate-user{color:var(--color-corporate-user)}:host>header h1.text-color-contract,:host>header h2.text-color-contract{color:var(--color-contract)}:host>header h1.text-color-job-code,:host>header h2.text-color-job-code{color:var(--color-job-code)}:host>header h1.text-color-earn-code,:host>header h2.text-color-earn-code{color:var(--color-earn-code)}:host>header h1.text-color-billable-charge,:host>header h2.text-color-billable-charge{color:var(--color-billable-charge)}:host>header h1.text-color-payable-charge,:host>header h2.text-color-payable-charge{color:var(--color-payable-charge)}:host>header h1.text-color-invoice-statement,:host>header h2.text-color-invoice-statement{color:var(--color-invoice-statement)}:host>header h1.text-color-selection,:host>header h2.text-color-selection{color:var(--color-selection)}:host>header h1.text-color-positive,:host>header h2.text-color-positive{color:var(--color-positive)}:host>header h1.text-color-success,:host>header h2.text-color-success{color:var(--color-success)}:host>header h1.text-color-warning,:host>header h2.text-color-warning{color:var(--color-warning)}:host>header h1.text-color-error,:host>header h2.text-color-error{color:var(--color-error)}:host>header h1.text-color-info,:host>header h2.text-color-info{color:var(--color-info)}:host>header h1.text-color-disabled,:host>header h2.text-color-disabled{color:var(--color-disabled)}:host>header h1.text-color-red,:host>header h2.text-color-red{color:var(--palette-red-50)}:host>header h1.text-color-pink,:host>header h2.text-color-pink{color:var(--palette-pink-50)}:host>header h1.text-color-orange,:host>header h2.text-color-orange{color:var(--palette-orange-50)}:host>header h1.text-color-yellow,:host>header h2.text-color-yellow{color:var(--palette-yellow-50)}:host>header h1.text-color-green,:host>header h2.text-color-green{color:var(--palette-green-50)}:host>header h1.text-color-teal,:host>header h2.text-color-teal{color:var(--palette-teal-50)}:host>header h1.text-color-blue,:host>header h2.text-color-blue{color:var(--palette-blue-50)}:host>header h1.text-color-aqua,:host>header h2.text-color-aqua{color:var(--palette-aqua-50)}:host>header h1.text-color-indigo,:host>header h2.text-color-indigo{color:var(--palette-indigo-50)}:host>header h1.text-color-violet,:host>header h2.text-color-violet{color:var(--palette-violet-50)}:host>header h1.text-color-gray,:host>header h2.text-color-gray{color:var(--palette-gray-50)}:host>header h1.margin-before,:host>header h2.margin-before{margin-top:.4rem}:host>header h1.margin-after,:host>header h2.margin-after{margin-bottom:.8rem}:host>header h1.text-length-small,:host>header h2.text-length-small{max-width:40ch}:host>header h1.text-length-medium,:host>header h2.text-length-medium{max-width:55ch}:host>header h1.text-length-large,:host>header h2.text-length-large{max-width:70ch}:host>header h1.text-weight-hairline,:host>header h2.text-weight-hairline{font-weight:100}:host>header h1.text-weight-thin,:host>header h2.text-weight-thin{font-weight:200}:host>header h1.text-weight-light,:host>header h2.text-weight-light{font-weight:300}:host>header h1.text-weight-normal,:host>header h2.text-weight-normal{font-weight:400}:host>header h1.text-weight-medium,:host>header h2.text-weight-medium{font-weight:500}:host>header h1.text-weight-semibold,:host>header h2.text-weight-semibold{font-weight:600}:host>header h1.text-weight-bold,:host>header h2.text-weight-bold{font-weight:700}:host>header h1.text-weight-extrabold,:host>header h2.text-weight-extrabold{font-weight:800}:host>header h1.text-weight-heavy,:host>header h2.text-weight-heavy{font-weight:900}:host>header h1.text-weight-lighter,:host>header h2.text-weight-lighter{font-weight:lighter}:host>header h1.text-weight-bolder,:host>header h2.text-weight-bolder{font-weight:bolder}:host>section{padding:var(--spacing-md) var(--spacing-xl);max-height:500px;overflow:auto}:host .novo-modal-footer{display:flex;align-items:center;justify-content:flex-end;padding:var(--spacing-md);gap:var(--spacing-md)}:host .novo-modal-footer button{min-width:10rem}\n"] }]
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
  `, isInline: true, styles: [":host{text-align:center;display:block;background-color:var(--color-background);border-radius:4px;box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:z(modal);position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:var(--spacing-xl);top:var(--spacing-xl)}:host .novo-notification-body{display:flex;flex-direction:column;padding:0 var(--spacing-xl);margin:var(--spacing-lg) 0 55px}:host .novo-notification-body>img{width:100%}:host .novo-notification-body h1{font-size:var(--font-size-xxl);margin:10px auto 0}:host .novo-notification-body h2{font-size:var(--font-size-xl);color:var(--color-text-muted);margin:0 auto;padding:0}:host .novo-notification-body h3{font-size:var(--font-size-lg);margin:0 auto}:host .novo-notification-body h4{font-size:var(--font-size-lg);color:var(--color-text-muted);margin:0 auto;padding:0}:host .novo-notification-body h5{font-size:var(--font-size-md);margin:0 auto}:host .novo-notification-body h6{font-size:var(--font-size-md);margin:0 auto}:host .novo-notification-body i.indicator{color:var(--color-text-muted);border:1px solid var(--color-text-muted);font-size:var(--font-size-xxl);border-radius:50%;padding:var(--spacing-md);margin:2rem auto;align-self:center}:host[type=success] .novo-notification-body i.indicator{color:var(--color-success);border-color:var(--color-success)}:host[type=warning] .novo-notification-body i.indicator{color:var(--color-warning);border-color:var(--color-warning)}:host[type=error] .novo-notification-body i.indicator{color:var(--color-error);border-color:var(--color-error)}:host .novo-notification-footer{display:flex;align-items:center;justify-content:flex-end;padding:var(--spacing-md);gap:var(--spacing-md)}:host .novo-notification-footer button{min-width:10rem}\n"], components: [{ type: i2$1.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalNotificationElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-notification', template: `
    <novo-button class="modal-close" theme="icon" icon="x" (click)="close()"></novo-button>
    <header class="novo-notification-header"><ng-content select="label,novo-label"></ng-content></header>
    <section class="novo-notification-body notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer class="novo-notification-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, host: {
                        class: 'novo-notification',
                    }, styles: [":host{text-align:center;display:block;background-color:var(--color-background);border-radius:4px;box-shadow:0 1px 7px #00000017,0 1px 3px #0003;z-index:z(modal);position:relative;min-width:330px;max-width:600px}:host>.novo-button.modal-close{position:absolute;right:var(--spacing-xl);top:var(--spacing-xl)}:host .novo-notification-body{display:flex;flex-direction:column;padding:0 var(--spacing-xl);margin:var(--spacing-lg) 0 55px}:host .novo-notification-body>img{width:100%}:host .novo-notification-body h1{font-size:var(--font-size-xxl);margin:10px auto 0}:host .novo-notification-body h2{font-size:var(--font-size-xl);color:var(--color-text-muted);margin:0 auto;padding:0}:host .novo-notification-body h3{font-size:var(--font-size-lg);margin:0 auto}:host .novo-notification-body h4{font-size:var(--font-size-lg);color:var(--color-text-muted);margin:0 auto;padding:0}:host .novo-notification-body h5{font-size:var(--font-size-md);margin:0 auto}:host .novo-notification-body h6{font-size:var(--font-size-md);margin:0 auto}:host .novo-notification-body i.indicator{color:var(--color-text-muted);border:1px solid var(--color-text-muted);font-size:var(--font-size-xxl);border-radius:50%;padding:var(--spacing-md);margin:2rem auto;align-self:center}:host[type=success] .novo-notification-body i.indicator{color:var(--color-success);border-color:var(--color-success)}:host[type=warning] .novo-notification-body i.indicator{color:var(--color-warning);border-color:var(--color-warning)}:host[type=error] .novo-notification-body i.indicator{color:var(--color-error);border-color:var(--color-error)}:host .novo-notification-footer{display:flex;align-items:center;justify-content:flex-end;padding:var(--spacing-md);gap:var(--spacing-md)}:host .novo-notification-footer button{min-width:10rem}\n"] }]
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
NovoModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalService, decorators: [{
            type: Injectable
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
//# sourceMappingURL=novo-elements-components-modal.mjs.map
