// Angular
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, TemplateRef, ViewChild, ViewContainerRef, } from '@angular/core';
// Vendor
import { fromEvent, merge, of as observableOf } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class NovoOverlayTemplateComponent {
    constructor(overlay, viewContainerRef, zone, changeDetectorRef, document) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.document = document;
        this.id = `novo-overlay-${Date.now()}`;
        this.position = 'default';
        this.scrollStrategy = 'reposition';
        this.closeOnSelect = true;
        this.select = new EventEmitter();
        this.opening = new EventEmitter();
        this.closing = new EventEmitter();
    }
    ngOnDestroy() {
        this.destroyOverlay();
    }
    get panelOpen() {
        return this.overlayRef && this.overlayRef.hasAttached();
    }
    set parent(value) {
        this._parent = value;
        this.checkSizes();
    }
    get parent() {
        return this._parent;
    }
    openPanel() {
        if (!this.overlayRef) {
            this.createOverlay(this.template);
        }
        else {
            this.checkSizes();
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.closingActionsSubscription = this.subscribeToClosingActions();
        }
        this.changeDetectorRef.markForCheck();
        setTimeout(() => {
            if (this.overlayRef) {
                this.overlayRef.updatePosition();
                this.opening.emit(true);
                setTimeout(() => {
                    // TODO: @charlesabarnes Remove this once we remove table
                    if (this.overlayRef) {
                        this.overlayRef.updatePosition();
                    }
                });
            }
        });
    }
    closePanel() {
        this.zone.run(() => {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
                this.closingActionsSubscription.unsubscribe();
            }
            this.closing.emit(false);
            if (this.panelOpen) {
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    onClosingAction(event) {
        this.closePanel();
    }
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions() {
        return merge(
        // this.overlayTemplate._keyManager.tabOut,
        this.outsideClickStream);
    }
    /** Stream of clicks outside of the autocomplete panel. */
    get outsideClickStream() {
        if (!this.document) {
            return observableOf();
        }
        return merge(fromEvent(this.document, 'mouseup'), fromEvent(this.document, 'touchend')).pipe(filter((event) => {
            const clickTarget = event.target;
            const clicked = this.panelOpen &&
                clickTarget !== this.getConnectedElement().nativeElement &&
                !this.getConnectedElement().nativeElement.contains(clickTarget) &&
                !!this.overlayRef &&
                !this.overlayRef.overlayElement.contains(clickTarget);
            // &&!Array.from(document.querySelectorAll('.cdk-overlay-container')).some((el) => el.contains(clickTarget));
            if (this.panelOpen && !!this.overlayRef && this.overlayRef.overlayElement.contains(clickTarget) && this.closeOnSelect) {
                this.select.emit(event);
            }
            return clicked;
        }));
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    subscribeToClosingActions() {
        const firstStable = this.zone.onStable.asObservable().pipe(first());
        // const valueChanges = Observable.from(this.value);
        // When the zone is stable initially, and when the option list changes...
        return (merge(firstStable)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        switchMap(() => {
            return this.panelClosingActions;
        }), 
        // when the first closing event occurs...
        first())
            // set the value, close the panel, and complete.
            .subscribe((event) => this.onClosingAction(event)));
    }
    createOverlay(template) {
        this.portal = new TemplatePortal(template, this.viewContainerRef);
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        this.overlayRef.backdropClick().subscribe(() => this.closePanel());
    }
    destroyOverlay() {
        if (this.overlayRef) {
            this.closePanel();
            this.overlayRef.dispose();
            this.overlayRef = undefined;
        }
    }
    getOverlayConfig() {
        const config = new OverlayConfig();
        if (!this.width) {
            config.width = this.getHostWidth();
        }
        else {
            config.width = this.width;
        }
        if (this.height) {
            config.height = this.height;
        }
        config.positionStrategy = this.getPosition();
        config.hasBackdrop = false;
        config.direction = 'ltr';
        config.scrollStrategy = this.getScrollStrategy();
        return config;
    }
    /**
     * Supports the following position strategies:
     * 'default', 'right', 'bottom', 'center', 'bottom-left', 'bottom-right', 'top-left', 'top-right'
     */
    getPosition() {
        if (this.position === 'center') {
            return this.overlay
                .position()
                .flexibleConnectedTo(this.getConnectedElement())
                .withFlexibleDimensions(false)
                .withPositions([
                { originX: 'start', originY: 'center', overlayX: 'start', overlayY: 'center' },
                { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
            ]);
        }
        const [originX, fallbackX] = this.position.includes('right') ? ['end', 'start'] : ['start', 'end'];
        const [originY, overlayY] = this.position.includes('top') ? ['top', 'bottom'] : ['bottom', 'top'];
        const defaultPosition = { originX, originY, overlayX: originX, overlayY };
        let strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.getConnectedElement())
            .withFlexibleDimensions(false)
            .withPositions([defaultPosition]);
        // .setDirection('ltr');
        if (this.position === 'bottom') {
            strategy = strategy.withPositions([defaultPosition, { originX: fallbackX, originY: 'bottom', overlayX: fallbackX, overlayY: 'top' }]);
        }
        else if (this.position === 'right' || this.position === 'default' || this.position.includes('above-below')) {
            strategy = strategy.withPositions([
                defaultPosition,
                { originX, originY: 'top', overlayX: originX, overlayY: 'bottom' },
                { originX: fallbackX, originY: 'bottom', overlayX: fallbackX, overlayY: 'top' },
                { originX: fallbackX, originY: 'top', overlayX: fallbackX, overlayY: 'bottom' },
            ]);
            if (!this.position.includes('above-below')) {
                strategy = strategy.withPositions([
                    defaultPosition,
                    { originX, originY: 'center', overlayX: originX, overlayY: 'center' },
                    { originX: fallbackX, originY: 'center', overlayX: fallbackX, overlayY: 'center' },
                ]);
            }
        }
        return strategy;
    }
    getScrollStrategy() {
        switch (this.scrollStrategy) {
            case 'block':
                return this.overlay.scrollStrategies.block();
            case 'reposition':
                return this.overlay.scrollStrategies.reposition();
            default:
                return this.overlay.scrollStrategies.close();
        }
    }
    checkSizes() {
        if (this.overlayRef) {
            if (!this.width) {
                this.overlayRef.getConfig().width = this.getHostWidth();
            }
            if (this.height) {
                this.overlayRef.getConfig().height = this.height;
            }
            this.overlayRef.updateSize(this.overlayRef.getConfig());
            this.overlayRef.updatePosition();
            this.changeDetectorRef.markForCheck();
        }
    }
    getConnectedElement() {
        return this.parent;
    }
    getHostWidth() {
        return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
}
NovoOverlayTemplateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoOverlayTemplateComponent, deps: [{ token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoOverlayTemplateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: { position: "position", scrollStrategy: "scrollStrategy", width: "width", height: "height", closeOnSelect: "closeOnSelect", parent: "parent" }, outputs: { select: "select", opening: "opening", closing: "closing" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }], ngImport: i0, template: `
    <ng-template>
      <div class="novo-overlay-panel" role="listbox" [id]="id" #panel><ng-content></ng-content></div>
    </ng-template>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoOverlayTemplateComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-overlay-template',
                    template: `
    <ng-template>
      <div class="novo-overlay-panel" role="listbox" [id]="id" #panel><ng-content></ng-content></div>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { template: [{
                type: ViewChild,
                args: [TemplateRef]
            }], panel: [{
                type: ViewChild,
                args: ['panel']
            }], position: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], select: [{
                type: Output
            }], opening: [{
                type: Output
            }], closing: [{
                type: Output
            }], parent: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi9vdmVybGF5L092ZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUNWLE9BQU8sRUFJTCxPQUFPLEVBQ1AsYUFBYSxHQUlkLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLFNBQVM7QUFDVCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYyxFQUFFLElBQUksWUFBWSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUN0RixPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBVzFELE1BQU0sT0FBTyw0QkFBNEI7SUEyQ3ZDLFlBQ1ksT0FBZ0IsRUFDaEIsZ0JBQWtDLEVBQ2xDLElBQVksRUFDWixpQkFBb0MsRUFHcEMsUUFBYTtRQU5iLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUdwQyxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBakRsQixPQUFFLEdBQVcsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBUTFDLGFBQVEsR0FVRyxTQUFTLENBQUM7UUFFckIsbUJBQWMsR0FBcUMsWUFBWSxDQUFDO1FBTWhFLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvQyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBaUJwRCxDQUFDO0lBRUcsV0FBVztRQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUNXLE1BQU0sQ0FBQyxLQUFpQjtRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0sU0FBUztRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDcEU7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QseURBQXlEO29CQUN6RCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7d0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7cUJBQ2xDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxVQUFVO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2pCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDL0M7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGVBQWUsQ0FBQyxLQUFVO1FBQy9CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxtQkFBbUI7UUFDNUIsT0FBTyxLQUFLO1FBQ1YsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FDeEIsQ0FBQztJQUNKLENBQUM7SUFFRCwwREFBMEQ7SUFDMUQsSUFBYyxrQkFBa0I7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsT0FBTyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtRQUVELE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMxRixNQUFNLENBQUMsQ0FBQyxLQUE4QixFQUFFLEVBQUU7WUFDeEMsTUFBTSxXQUFXLEdBQWdCLEtBQUssQ0FBQyxNQUFxQixDQUFDO1lBQzdELE1BQU0sT0FBTyxHQUNYLElBQUksQ0FBQyxTQUFTO2dCQUNkLFdBQVcsS0FBSyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxhQUFhO2dCQUN4RCxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO2dCQUMvRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVU7Z0JBQ2pCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELDZHQUE2RztZQUM3RyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3JILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDTyx5QkFBeUI7UUFDakMsTUFBTSxXQUFXLEdBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLG9EQUFvRDtRQUNwRCx5RUFBeUU7UUFDekUsT0FBTyxDQUNMLEtBQUssQ0FBQyxXQUFXLENBQUM7YUFDZixJQUFJO1FBQ0gsNkVBQTZFO1FBQzdFLCtFQUErRTtRQUMvRSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDbEMsQ0FBQyxDQUFDO1FBQ0YseUNBQXlDO1FBQ3pDLEtBQUssRUFBRSxDQUNSO1lBQ0QsZ0RBQWdEO2FBQy9DLFNBQVMsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUMxRCxDQUFDO0lBQ0osQ0FBQztJQUVTLGFBQWEsQ0FBQyxRQUEwQjtRQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVTLGNBQWM7UUFDdEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixNQUFNLE1BQU0sR0FBa0IsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3BDO2FBQU07WUFDTCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDN0I7UUFFRCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFakQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNPLFdBQVc7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPO2lCQUNoQixRQUFRLEVBQUU7aUJBQ1YsbUJBQW1CLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7aUJBQy9DLHNCQUFzQixDQUFDLEtBQUssQ0FBQztpQkFDN0IsYUFBYSxDQUFDO2dCQUNiLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtnQkFDOUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO2dCQUN4RSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7YUFDL0UsQ0FBQyxDQUFDO1NBQ047UUFFRCxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxHQUE4QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlILE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQTRCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0gsTUFBTSxlQUFlLEdBQXNCLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQzdGLElBQUksUUFBUSxHQUFzQyxJQUFJLENBQUMsT0FBTzthQUMzRCxRQUFRLEVBQUU7YUFDVixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUMvQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUM7YUFDN0IsYUFBYSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNwQyx3QkFBd0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUM5QixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkk7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzVHLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO2dCQUNoQyxlQUFlO2dCQUNmLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO2dCQUNsRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7Z0JBQy9FLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTthQUNoRixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzFDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO29CQUNoQyxlQUFlO29CQUNmLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO29CQUNyRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7aUJBQ25GLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRVMsaUJBQWlCO1FBQ3pCLFFBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMzQixLQUFLLE9BQU87Z0JBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9DLEtBQUssWUFBWTtnQkFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEQ7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVTLFVBQVU7UUFDbEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN6RDtZQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2xEO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVTLG1CQUFtQjtRQUMzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVTLFlBQVk7UUFDcEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDaEYsQ0FBQzs7eUhBNVJVLDRCQUE0QixnSUFpRDdCLFFBQVE7NkdBakRQLDRCQUE0QixzVUFHNUIsV0FBVyxpSUFWWjs7OztHQUlUOzJGQUdVLDRCQUE0QjtrQkFUeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQWlESSxRQUFROzswQkFDUixNQUFNOzJCQUFDLFFBQVE7NENBN0NYLFFBQVE7c0JBRGQsU0FBUzt1QkFBQyxXQUFXO2dCQUdmLEtBQUs7c0JBRFgsU0FBUzt1QkFBQyxPQUFPO2dCQUlYLFFBQVE7c0JBRGQsS0FBSztnQkFhQyxjQUFjO3NCQURwQixLQUFLO2dCQUdDLEtBQUs7c0JBRFgsS0FBSztnQkFHQyxNQUFNO3NCQURaLEtBQUs7Z0JBR0MsYUFBYTtzQkFEbkIsS0FBSztnQkFJQyxNQUFNO3NCQURaLE1BQU07Z0JBR0EsT0FBTztzQkFEYixNQUFNO2dCQUdBLE9BQU87c0JBRGIsTUFBTTtnQkE2QkksTUFBTTtzQkFEaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXJcbmltcG9ydCB7XG4gIENvbm5lY3RlZFBvc2l0aW9uLFxuICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICBPdmVybGF5LFxuICBPdmVybGF5Q29uZmlnLFxuICBPdmVybGF5UmVmLFxuICBTY3JvbGxTdHJhdGVneSxcbiAgVmVydGljYWxDb25uZWN0aW9uUG9zLFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW92ZXJsYXktdGVtcGxhdGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLW92ZXJsYXktcGFuZWxcIiByb2xlPVwibGlzdGJveFwiIFtpZF09XCJpZFwiICNwYW5lbD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwdWJsaWMgaWQ6IHN0cmluZyA9IGBub3ZvLW92ZXJsYXktJHtEYXRlLm5vdygpfWA7XG5cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZilcbiAgcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAVmlld0NoaWxkKCdwYW5lbCcpXG4gIHB1YmxpYyBwYW5lbDogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcG9zaXRpb246XG4gICAgfCAnZGVmYXVsdCdcbiAgICB8ICdyaWdodCdcbiAgICB8ICdhYm92ZS1iZWxvdydcbiAgICB8ICdyaWdodC1hYm92ZS1iZWxvdydcbiAgICB8ICdjZW50ZXInXG4gICAgfCAnYm90dG9tJ1xuICAgIHwgJ2JvdHRvbS1sZWZ0J1xuICAgIHwgJ2JvdHRvbS1yaWdodCdcbiAgICB8ICd0b3AtbGVmdCdcbiAgICB8ICd0b3AtcmlnaHQnID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2Nyb2xsU3RyYXRlZ3k6ICdyZXBvc2l0aW9uJyB8ICdibG9jaycgfCAnY2xvc2UnID0gJ3JlcG9zaXRpb24nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KClcbiAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKVxuICBwdWJsaWMgY2xvc2VPblNlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgcHVibGljIG9wZW5pbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgcHVibGljIGNsb3Npbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgcHVibGljIHBvcnRhbDogVGVtcGxhdGVQb3J0YWw8YW55PjtcblxuICAvLyBUaGUgc3Vic2NyaXB0aW9uIGZvciBjbG9zaW5nIGFjdGlvbnMgKHNvbWUgYXJlIGJvdW5kIHRvIGRvY3VtZW50KVxuICBwcm90ZWN0ZWQgY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfcGFyZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvdmVybGF5OiBPdmVybGF5LFxuICAgIHByb3RlY3RlZCB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXG4gICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoRE9DVU1FTlQpXG4gICAgcHJvdGVjdGVkIGRvY3VtZW50OiBhbnksXG4gICkge31cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95T3ZlcmxheSgpO1xuICB9XG5cbiAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcbiAgICB0aGlzLmNoZWNrU2l6ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyZW50KCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLmNyZWF0ZU92ZXJsYXkodGhpcy50ZW1wbGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hlY2tTaXplcygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCk7XG4gICAgICB0aGlzLmNsb3NpbmdBY3Rpb25zU3Vic2NyaXB0aW9uID0gdGhpcy5zdWJzY3JpYmVUb0Nsb3NpbmdBY3Rpb25zKCk7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLm9wZW5pbmcuZW1pdCh0cnVlKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgLy8gVE9ETzogQGNoYXJsZXNhYmFybmVzIFJlbW92ZSB0aGlzIG9uY2Ugd2UgcmVtb3ZlIHRhYmxlXG4gICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZVBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIHRoaXMuY2xvc2luZ0FjdGlvbnNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2luZy5lbWl0KGZhbHNlKTtcbiAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uQ2xvc2luZ0FjdGlvbihldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogQSBzdHJlYW0gb2YgYWN0aW9ucyB0aGF0IHNob3VsZCBjbG9zZSB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLCBpbmNsdWRpbmdcbiAgICogd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWQsIG9uIGJsdXIsIGFuZCB3aGVuIFRBQiBpcyBwcmVzc2VkLlxuICAgKi9cbiAgcHVibGljIGdldCBwYW5lbENsb3NpbmdBY3Rpb25zKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIG1lcmdlKFxuICAgICAgLy8gdGhpcy5vdmVybGF5VGVtcGxhdGUuX2tleU1hbmFnZXIudGFiT3V0LFxuICAgICAgdGhpcy5vdXRzaWRlQ2xpY2tTdHJlYW0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBTdHJlYW0gb2YgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC4gKi9cbiAgcHJvdGVjdGVkIGdldCBvdXRzaWRlQ2xpY2tTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoIXRoaXMuZG9jdW1lbnQpIHtcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVyZ2UoZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQsICdtb3VzZXVwJyksIGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCAndG91Y2hlbmQnKSkucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNsaWNrVGFyZ2V0OiBIVE1MRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3QgY2xpY2tlZDogYm9vbGVhbiA9XG4gICAgICAgICAgdGhpcy5wYW5lbE9wZW4gJiZcbiAgICAgICAgICBjbGlja1RhcmdldCAhPT0gdGhpcy5nZXRDb25uZWN0ZWRFbGVtZW50KCkubmF0aXZlRWxlbWVudCAmJlxuICAgICAgICAgICF0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGNsaWNrVGFyZ2V0KSAmJlxuICAgICAgICAgICEhdGhpcy5vdmVybGF5UmVmICYmXG4gICAgICAgICAgIXRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldCk7XG4gICAgICAgIC8vICYmIUFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNkay1vdmVybGF5LWNvbnRhaW5lcicpKS5zb21lKChlbCkgPT4gZWwuY29udGFpbnMoY2xpY2tUYXJnZXQpKTtcbiAgICAgICAgaWYgKHRoaXMucGFuZWxPcGVuICYmICEhdGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldCkgJiYgdGhpcy5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsaWNrZWQ7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGxpc3RlbnMgdG8gYSBzdHJlYW0gb2YgcGFuZWwgY2xvc2luZyBhY3Rpb25zIGFuZCByZXNldHMgdGhlXG4gICAqIHN0cmVhbSBldmVyeSB0aW1lIHRoZSBvcHRpb24gbGlzdCBjaGFuZ2VzLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN1YnNjcmliZVRvQ2xvc2luZ0FjdGlvbnMoKTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBmaXJzdFN0YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy56b25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlyc3QoKSk7XG4gICAgLy8gY29uc3QgdmFsdWVDaGFuZ2VzID0gT2JzZXJ2YWJsZS5mcm9tKHRoaXMudmFsdWUpO1xuICAgIC8vIFdoZW4gdGhlIHpvbmUgaXMgc3RhYmxlIGluaXRpYWxseSwgYW5kIHdoZW4gdGhlIG9wdGlvbiBsaXN0IGNoYW5nZXMuLi5cbiAgICByZXR1cm4gKFxuICAgICAgbWVyZ2UoZmlyc3RTdGFibGUpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBzdHJlYW0gb2YgcGFuZWxDbG9zaW5nQWN0aW9ucywgcmVwbGFjaW5nIGFueSBwcmV2aW91cyBzdHJlYW1zXG4gICAgICAgICAgLy8gdGhhdCB3ZXJlIGNyZWF0ZWQsIGFuZCBmbGF0dGVuIGl0IHNvIG91ciBzdHJlYW0gb25seSBlbWl0cyBjbG9zaW5nIGV2ZW50cy4uLlxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbENsb3NpbmdBY3Rpb25zO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIC8vIHdoZW4gdGhlIGZpcnN0IGNsb3NpbmcgZXZlbnQgb2NjdXJzLi4uXG4gICAgICAgICAgZmlyc3QoKSxcbiAgICAgICAgKVxuICAgICAgICAvLyBzZXQgdGhlIHZhbHVlLCBjbG9zZSB0aGUgcGFuZWwsIGFuZCBjb21wbGV0ZS5cbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IGFueSkgPT4gdGhpcy5vbkNsb3NpbmdBY3Rpb24oZXZlbnQpKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlT3ZlcmxheSh0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pik6IHZvaWQge1xuICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRlbXBsYXRlLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUodGhpcy5nZXRPdmVybGF5Q29uZmlnKCkpO1xuICAgIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VQYW5lbCgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZXN0cm95T3ZlcmxheSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgY29uc3QgY29uZmlnOiBPdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoKTtcblxuICAgIGlmICghdGhpcy53aWR0aCkge1xuICAgICAgY29uZmlnLndpZHRoID0gdGhpcy5nZXRIb3N0V2lkdGgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWlnaHQpIHtcbiAgICAgIGNvbmZpZy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB9XG5cbiAgICBjb25maWcucG9zaXRpb25TdHJhdGVneSA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICBjb25maWcuaGFzQmFja2Ryb3AgPSBmYWxzZTtcbiAgICBjb25maWcuZGlyZWN0aW9uID0gJ2x0cic7XG4gICAgY29uZmlnLnNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5nZXRTY3JvbGxTdHJhdGVneSgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdXBwb3J0cyB0aGUgZm9sbG93aW5nIHBvc2l0aW9uIHN0cmF0ZWdpZXM6XG4gICAqICdkZWZhdWx0JywgJ3JpZ2h0JywgJ2JvdHRvbScsICdjZW50ZXInLCAnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCdcbiAgICovXG4gIHByb3RlY3RlZCBnZXRQb3NpdGlvbigpOiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnY2VudGVyJykge1xuICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVxuICAgICAgICAucG9zaXRpb24oKVxuICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKSlcbiAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInLCBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdjZW50ZXInIH0sXG4gICAgICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9LFxuICAgICAgICAgIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3QgW29yaWdpblgsIGZhbGxiYWNrWF06IEhvcml6b250YWxDb25uZWN0aW9uUG9zW10gPSB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdyaWdodCcpID8gWydlbmQnLCAnc3RhcnQnXSA6IFsnc3RhcnQnLCAnZW5kJ107XG4gICAgY29uc3QgW29yaWdpblksIG92ZXJsYXlZXTogVmVydGljYWxDb25uZWN0aW9uUG9zW10gPSB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKSA/IFsndG9wJywgJ2JvdHRvbSddIDogWydib3R0b20nLCAndG9wJ107XG4gICAgY29uc3QgZGVmYXVsdFBvc2l0aW9uOiBDb25uZWN0ZWRQb3NpdGlvbiA9IHsgb3JpZ2luWCwgb3JpZ2luWSwgb3ZlcmxheVg6IG9yaWdpblgsIG92ZXJsYXlZIH07XG4gICAgbGV0IHN0cmF0ZWd5OiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKSlcbiAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgLndpdGhQb3NpdGlvbnMoW2RlZmF1bHRQb3NpdGlvbl0pO1xuICAgIC8vIC5zZXREaXJlY3Rpb24oJ2x0cicpO1xuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgc3RyYXRlZ3kgPSBzdHJhdGVneS53aXRoUG9zaXRpb25zKFtkZWZhdWx0UG9zaXRpb24sIHsgb3JpZ2luWDogZmFsbGJhY2tYLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6IGZhbGxiYWNrWCwgb3ZlcmxheVk6ICd0b3AnIH1dKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb24gPT09ICdyaWdodCcgfHwgdGhpcy5wb3NpdGlvbiA9PT0gJ2RlZmF1bHQnIHx8IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2Fib3ZlLWJlbG93JykpIHtcbiAgICAgIHN0cmF0ZWd5ID0gc3RyYXRlZ3kud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgIGRlZmF1bHRQb3NpdGlvbixcbiAgICAgICAgeyBvcmlnaW5YLCBvcmlnaW5ZOiAndG9wJywgb3ZlcmxheVg6IG9yaWdpblgsIG92ZXJsYXlZOiAnYm90dG9tJyB9LFxuICAgICAgICB7IG9yaWdpblg6IGZhbGxiYWNrWCwgb3JpZ2luWTogJ2JvdHRvbScsIG92ZXJsYXlYOiBmYWxsYmFja1gsIG92ZXJsYXlZOiAndG9wJyB9LFxuICAgICAgICB7IG9yaWdpblg6IGZhbGxiYWNrWCwgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiBmYWxsYmFja1gsIG92ZXJsYXlZOiAnYm90dG9tJyB9LFxuICAgICAgXSk7XG4gICAgICBpZiAoIXRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2Fib3ZlLWJlbG93JykpIHtcbiAgICAgICAgc3RyYXRlZ3kgPSBzdHJhdGVneS53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICBkZWZhdWx0UG9zaXRpb24sXG4gICAgICAgICAgeyBvcmlnaW5YLCBvcmlnaW5ZOiAnY2VudGVyJywgb3ZlcmxheVg6IG9yaWdpblgsIG92ZXJsYXlZOiAnY2VudGVyJyB9LFxuICAgICAgICAgIHsgb3JpZ2luWDogZmFsbGJhY2tYLCBvcmlnaW5ZOiAnY2VudGVyJywgb3ZlcmxheVg6IGZhbGxiYWNrWCwgb3ZlcmxheVk6ICdjZW50ZXInIH0sXG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyYXRlZ3k7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U2Nyb2xsU3RyYXRlZ3koKTogU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHN3aXRjaCAodGhpcy5zY3JvbGxTdHJhdGVneSkge1xuICAgICAgY2FzZSAnYmxvY2snOlxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKTtcbiAgICAgIGNhc2UgJ3JlcG9zaXRpb24nOlxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNoZWNrU2l6ZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgaWYgKCF0aGlzLndpZHRoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS53aWR0aCA9IHRoaXMuZ2V0SG9zdFdpZHRoKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oZWlnaHQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgfVxuICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVNpemUodGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29ubmVjdGVkRWxlbWVudCgpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SG9zdFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29ubmVjdGVkRWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cbn1cbiJdfQ==