// Angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, TemplateRef, ViewChild, ViewContainerRef, } from '@angular/core';
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
// Vendor
import { of as observableOf, merge, fromEvent } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
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
            }
        });
    }
    closePanel() {
        this.zone.run(() => {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
                this.closingActionsSubscription.unsubscribe();
            }
            this.closing.emit(true);
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
        return merge(fromEvent(this.document, 'mousedown'), fromEvent(this.document, 'touchend')).pipe(filter((event) => {
            const clickTarget = event.target;
            const clicked = this.panelOpen &&
                clickTarget !== this.getConnectedElement().nativeElement &&
                !this.getConnectedElement().nativeElement.contains(clickTarget) &&
                (!!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget));
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
                .connectedTo(this.getConnectedElement(), { originX: 'start', originY: 'center' }, { overlayX: 'start', overlayY: 'center' })
                .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
                .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' });
        }
        const [originX, fallbackX] = this.position.includes('right') ? ['end', 'start'] : ['start', 'end'];
        const [originY, overlayY] = this.position.includes('top') ? ['top', 'bottom'] : ['bottom', 'top'];
        let strategy = this.overlay
            .position()
            .connectedTo(this.getConnectedElement(), { originX, originY }, { overlayX: originX, overlayY })
            .withDirection('ltr');
        if (this.position === 'bottom') {
            strategy = strategy.withFallbackPosition({ originX: fallbackX, originY: 'bottom' }, { overlayX: fallbackX, overlayY: 'top' });
        }
        else if (this.position === 'right' || this.position === 'default' || this.position.includes('above-below')) {
            strategy = strategy
                .withFallbackPosition({ originX, originY: 'top' }, { overlayX: originX, overlayY: 'bottom' })
                .withFallbackPosition({ originX: fallbackX, originY: 'bottom' }, { overlayX: fallbackX, overlayY: 'top' })
                .withFallbackPosition({ originX: fallbackX, originY: 'top' }, { overlayX: fallbackX, overlayY: 'bottom' });
            if (!this.position.includes('above-below')) {
                strategy = strategy
                    .withFallbackPosition({ originX, originY: 'center' }, { overlayX: originX, overlayY: 'center' })
                    .withFallbackPosition({ originX: fallbackX, originY: 'center' }, { overlayX: fallbackX, overlayY: 'center' });
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
NovoOverlayTemplateComponent.decorators = [
    { type: Component, args: [{
                selector: 'novo-overlay-template',
                template: `
    <ng-template>
      <div class="novo-overlay-panel" role="listbox" [id]="id" #panel><ng-content></ng-content></div>
    </ng-template>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoOverlayTemplateComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
NovoOverlayTemplateComponent.propDecorators = {
    template: [{ type: ViewChild, args: [TemplateRef,] }],
    panel: [{ type: ViewChild, args: ['panel',] }],
    position: [{ type: Input }],
    scrollStrategy: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    closeOnSelect: [{ type: Input }],
    select: [{ type: Output }],
    closing: [{ type: Output }],
    parent: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvb3ZlcmxheS9PdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUFDVixPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxPQUFPLEVBQ1AsYUFBYSxHQUlkLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxTQUFTO0FBQ1QsT0FBTyxFQUE0QixFQUFFLElBQUksWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEYsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFXMUQsTUFBTSxPQUFPLDRCQUE0QjtJQXlDdkMsWUFDWSxPQUFnQixFQUNoQixnQkFBa0MsRUFDbEMsSUFBWSxFQUNaLGlCQUFvQyxFQUdwQyxRQUFhO1FBTmIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBR3BDLGFBQVEsR0FBUixRQUFRLENBQUs7UUEvQ2xCLE9BQUUsR0FBVyxnQkFBZ0IsSUFBSSxDQUFDLEdB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QUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFUyxtQkFBbUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFUyxZQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2hGLENBQUM7OztZQWpSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQXBCQyxPQUFPO1lBTFAsZ0JBQWdCO1lBTmhCLE1BQU07WUFOTixpQkFBaUI7NENBb0ZkLFFBQVEsWUFDUixNQUFNLFNBQUMsUUFBUTs7O3VCQTVDakIsU0FBUyxTQUFDLFdBQVc7b0JBRXJCLFNBQVMsU0FBQyxPQUFPO3VCQUdqQixLQUFLOzZCQVlMLEtBQUs7b0JBRUwsS0FBSztxQkFFTCxLQUFLOzRCQUVMLEtBQUs7cUJBR0wsTUFBTTtzQkFFTixNQUFNO3FCQTRCTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhclxyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcclxuICBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyxcclxuICBPdmVybGF5LFxyXG4gIE92ZXJsYXlDb25maWcsXHJcbiAgT3ZlcmxheVJlZixcclxuICBTY3JvbGxTdHJhdGVneSxcclxuICBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbi8vIFZlbmRvclxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mIGFzIG9ic2VydmFibGVPZiwgbWVyZ2UsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tb3ZlcmxheS10ZW1wbGF0ZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZT5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tb3ZlcmxheS1wYW5lbFwiIHJvbGU9XCJsaXN0Ym94XCIgW2lkXT1cImlkXCIgI3BhbmVsPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHB1YmxpYyBpZDogc3RyaW5nID0gYG5vdm8tb3ZlcmxheS0ke0RhdGUubm93KCl9YDtcclxuXHJcbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZilcclxuICBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQFZpZXdDaGlsZCgncGFuZWwnKVxyXG4gIHB1YmxpYyBwYW5lbDogRWxlbWVudFJlZjtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgcG9zaXRpb246XHJcbiAgICB8ICdkZWZhdWx0J1xyXG4gICAgfCAncmlnaHQnXHJcbiAgICB8ICdhYm92ZS1iZWxvdydcclxuICAgIHwgJ3JpZ2h0LWFib3ZlLWJlbG93J1xyXG4gICAgfCAnY2VudGVyJ1xyXG4gICAgfCAnYm90dG9tJ1xyXG4gICAgfCAnYm90dG9tLWxlZnQnXHJcbiAgICB8ICdib3R0b20tcmlnaHQnXHJcbiAgICB8ICd0b3AtbGVmdCdcclxuICAgIHwgJ3RvcC1yaWdodCcgPSAnZGVmYXVsdCc7XHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgc2Nyb2xsU3RyYXRlZ3k6ICdyZXBvc2l0aW9uJyB8ICdibG9jaycgfCAnY2xvc2UnID0gJ3JlcG9zaXRpb24nO1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgY2xvc2VPblNlbGVjdDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIHB1YmxpYyBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIHB1YmxpYyBjbG9zaW5nOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHVibGljIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xyXG4gIHB1YmxpYyBwb3J0YWw6IFRlbXBsYXRlUG9ydGFsPGFueT47XHJcblxyXG4gIC8vIFRoZSBzdWJzY3JpcHRpb24gZm9yIGNsb3NpbmcgYWN0aW9ucyAoc29tZSBhcmUgYm91bmQgdG8gZG9jdW1lbnQpXHJcbiAgcHJvdGVjdGVkIGNsb3NpbmdBY3Rpb25zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfcGFyZW50OiBFbGVtZW50UmVmO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBvdmVybGF5OiBPdmVybGF5LFxyXG4gICAgcHJvdGVjdGVkIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwcm90ZWN0ZWQgem9uZTogTmdab25lLFxyXG4gICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKVxyXG4gICAgcHJvdGVjdGVkIGRvY3VtZW50OiBhbnksXHJcbiAgKSB7fVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLmRlc3Ryb3lPdmVybGF5KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgdGhpcy5jaGVja1NpemVzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBFbGVtZW50UmVmIHtcclxuICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlblBhbmVsKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcclxuICAgICAgdGhpcy5jcmVhdGVPdmVybGF5KHRoaXMudGVtcGxhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaGVja1NpemVzKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xyXG4gICAgICB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKTtcclxuICAgICAgdGhpcy5jbG9zaW5nQWN0aW9uc1N1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaWJlVG9DbG9zaW5nQWN0aW9ucygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsb3NlUGFuZWwoKTogdm9pZCB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xyXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcclxuICAgICAgICB0aGlzLmNsb3NpbmdBY3Rpb25zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jbG9zaW5nLmVtaXQodHJ1ZSk7XHJcbiAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2xvc2luZ0FjdGlvbihldmVudDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmNsb3NlUGFuZWwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc3RyZWFtIG9mIGFjdGlvbnMgdGhhdCBzaG91bGQgY2xvc2UgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCwgaW5jbHVkaW5nXHJcbiAgICogd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWQsIG9uIGJsdXIsIGFuZCB3aGVuIFRBQiBpcyBwcmVzc2VkLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgcGFuZWxDbG9zaW5nQWN0aW9ucygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIG1lcmdlKFxyXG4gICAgICAvLyB0aGlzLm92ZXJsYXlUZW1wbGF0ZS5fa2V5TWFuYWdlci50YWJPdXQsXHJcbiAgICAgIHRoaXMub3V0c2lkZUNsaWNrU3RyZWFtLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiBTdHJlYW0gb2YgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC4gKi9cclxuICBwcm90ZWN0ZWQgZ2V0IG91dHNpZGVDbGlja1N0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgaWYgKCF0aGlzLmRvY3VtZW50KSB7XHJcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVyZ2UoZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQsICdtb3VzZWRvd24nKSwgZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQsICd0b3VjaGVuZCcpKS5waXBlKFxyXG4gICAgICBmaWx0ZXIoKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsaWNrVGFyZ2V0OiBIVE1MRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjbGlja2VkOiBib29sZWFuID1cclxuICAgICAgICAgIHRoaXMucGFuZWxPcGVuICYmXHJcbiAgICAgICAgICBjbGlja1RhcmdldCAhPT0gdGhpcy5nZXRDb25uZWN0ZWRFbGVtZW50KCkubmF0aXZlRWxlbWVudCAmJlxyXG4gICAgICAgICAgIXRoaXMuZ2V0Q29ubmVjdGVkRWxlbWVudCgpLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoY2xpY2tUYXJnZXQpICYmXHJcbiAgICAgICAgICAoISF0aGlzLm92ZXJsYXlSZWYgJiYgIXRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldCkpO1xyXG4gICAgICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiAhIXRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY29udGFpbnMoY2xpY2tUYXJnZXQpICYmIHRoaXMuY2xvc2VPblNlbGVjdCkge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3QuZW1pdChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjbGlja2VkO1xyXG4gICAgICB9KSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCBsaXN0ZW5zIHRvIGEgc3RyZWFtIG9mIHBhbmVsIGNsb3NpbmcgYWN0aW9ucyBhbmQgcmVzZXRzIHRoZVxyXG4gICAqIHN0cmVhbSBldmVyeSB0aW1lIHRoZSBvcHRpb24gbGlzdCBjaGFuZ2VzLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBzdWJzY3JpYmVUb0Nsb3NpbmdBY3Rpb25zKCk6IFN1YnNjcmlwdGlvbiB7XHJcbiAgICBjb25zdCBmaXJzdFN0YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy56b25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlyc3QoKSk7XHJcbiAgICAvLyBjb25zdCB2YWx1ZUNoYW5nZXMgPSBPYnNlcnZhYmxlLmZyb20odGhpcy52YWx1ZSk7XHJcbiAgICAvLyBXaGVuIHRoZSB6b25lIGlzIHN0YWJsZSBpbml0aWFsbHksIGFuZCB3aGVuIHRoZSBvcHRpb24gbGlzdCBjaGFuZ2VzLi4uXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBtZXJnZShmaXJzdFN0YWJsZSlcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBzdHJlYW0gb2YgcGFuZWxDbG9zaW5nQWN0aW9ucywgcmVwbGFjaW5nIGFueSBwcmV2aW91cyBzdHJlYW1zXHJcbiAgICAgICAgICAvLyB0aGF0IHdlcmUgY3JlYXRlZCwgYW5kIGZsYXR0ZW4gaXQgc28gb3VyIHN0cmVhbSBvbmx5IGVtaXRzIGNsb3NpbmcgZXZlbnRzLi4uXHJcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbENsb3NpbmdBY3Rpb25zO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICAvLyB3aGVuIHRoZSBmaXJzdCBjbG9zaW5nIGV2ZW50IG9jY3Vycy4uLlxyXG4gICAgICAgICAgZmlyc3QoKSxcclxuICAgICAgICApXHJcbiAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZSwgY2xvc2UgdGhlIHBhbmVsLCBhbmQgY29tcGxldGUuXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IGFueSkgPT4gdGhpcy5vbkNsb3NpbmdBY3Rpb24oZXZlbnQpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPdmVybGF5KHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KTogdm9pZCB7XHJcbiAgICB0aGlzLnBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0ZW1wbGF0ZSwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcclxuICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUodGhpcy5nZXRPdmVybGF5Q29uZmlnKCkpO1xyXG4gICAgdGhpcy5vdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZVBhbmVsKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGRlc3Ryb3lPdmVybGF5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xyXG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcclxuICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcclxuICAgICAgdGhpcy5vdmVybGF5UmVmID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XHJcbiAgICBjb25zdCBjb25maWc6IE92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZygpO1xyXG5cclxuICAgIGlmICghdGhpcy53aWR0aCkge1xyXG4gICAgICBjb25maWcud2lkdGggPSB0aGlzLmdldEhvc3RXaWR0aCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uZmlnLndpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oZWlnaHQpIHtcclxuICAgICAgY29uZmlnLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5nZXRQb3NpdGlvbigpO1xyXG4gICAgY29uZmlnLmhhc0JhY2tkcm9wID0gZmFsc2U7XHJcbiAgICBjb25maWcuZGlyZWN0aW9uID0gJ2x0cic7XHJcbiAgICBjb25maWcuc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLmdldFNjcm9sbFN0cmF0ZWd5KCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbmZpZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1cHBvcnRzIHRoZSBmb2xsb3dpbmcgcG9zaXRpb24gc3RyYXRlZ2llczpcclxuICAgKiAnZGVmYXVsdCcsICdyaWdodCcsICdib3R0b20nLCAnY2VudGVyJywgJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldFBvc2l0aW9uKCk6IENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kge1xyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICdjZW50ZXInKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlcclxuICAgICAgICAucG9zaXRpb24oKVxyXG4gICAgICAgIC5jb25uZWN0ZWRUbyh0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKSwgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnY2VudGVyJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicgfSlcclxuICAgICAgICAud2l0aEZhbGxiYWNrUG9zaXRpb24oeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSlcclxuICAgICAgICAud2l0aEZhbGxiYWNrUG9zaXRpb24oeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgW29yaWdpblgsIGZhbGxiYWNrWF06IEhvcml6b250YWxDb25uZWN0aW9uUG9zW10gPSB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdyaWdodCcpID8gWydlbmQnLCAnc3RhcnQnXSA6IFsnc3RhcnQnLCAnZW5kJ107XHJcbiAgICBjb25zdCBbb3JpZ2luWSwgb3ZlcmxheVldOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3NbXSA9IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ3RvcCcpID8gWyd0b3AnLCAnYm90dG9tJ10gOiBbJ2JvdHRvbScsICd0b3AnXTtcclxuXHJcbiAgICBsZXQgc3RyYXRlZ3k6IENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXlcclxuICAgICAgLnBvc2l0aW9uKClcclxuICAgICAgLmNvbm5lY3RlZFRvKHRoaXMuZ2V0Q29ubmVjdGVkRWxlbWVudCgpLCB7IG9yaWdpblgsIG9yaWdpblkgfSwgeyBvdmVybGF5WDogb3JpZ2luWCwgb3ZlcmxheVkgfSlcclxuICAgICAgLndpdGhEaXJlY3Rpb24oJ2x0cicpO1xyXG5cclxuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnYm90dG9tJykge1xyXG4gICAgICBzdHJhdGVneSA9IHN0cmF0ZWd5LndpdGhGYWxsYmFja1Bvc2l0aW9uKHsgb3JpZ2luWDogZmFsbGJhY2tYLCBvcmlnaW5ZOiAnYm90dG9tJyB9LCB7IG92ZXJsYXlYOiBmYWxsYmFja1gsIG92ZXJsYXlZOiAndG9wJyB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbiA9PT0gJ3JpZ2h0JyB8fCB0aGlzLnBvc2l0aW9uID09PSAnZGVmYXVsdCcgfHwgdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnYWJvdmUtYmVsb3cnKSkge1xyXG4gICAgICBzdHJhdGVneSA9IHN0cmF0ZWd5XHJcbiAgICAgICAgLndpdGhGYWxsYmFja1Bvc2l0aW9uKHsgb3JpZ2luWCwgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogb3JpZ2luWCwgb3ZlcmxheVk6ICdib3R0b20nIH0pXHJcbiAgICAgICAgLndpdGhGYWxsYmFja1Bvc2l0aW9uKHsgb3JpZ2luWDogZmFsbGJhY2tYLCBvcmlnaW5ZOiAnYm90dG9tJyB9LCB7IG92ZXJsYXlYOiBmYWxsYmFja1gsIG92ZXJsYXlZOiAndG9wJyB9KVxyXG4gICAgICAgIC53aXRoRmFsbGJhY2tQb3NpdGlvbih7IG9yaWdpblg6IGZhbGxiYWNrWCwgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogZmFsbGJhY2tYLCBvdmVybGF5WTogJ2JvdHRvbScgfSk7XHJcbiAgICAgIGlmICghdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnYWJvdmUtYmVsb3cnKSkge1xyXG4gICAgICAgIHN0cmF0ZWd5ID0gc3RyYXRlZ3lcclxuICAgICAgICAgIC53aXRoRmFsbGJhY2tQb3NpdGlvbih7IG9yaWdpblgsIG9yaWdpblk6ICdjZW50ZXInIH0sIHsgb3ZlcmxheVg6IG9yaWdpblgsIG92ZXJsYXlZOiAnY2VudGVyJyB9KVxyXG4gICAgICAgICAgLndpdGhGYWxsYmFja1Bvc2l0aW9uKHsgb3JpZ2luWDogZmFsbGJhY2tYLCBvcmlnaW5ZOiAnY2VudGVyJyB9LCB7IG92ZXJsYXlYOiBmYWxsYmFja1gsIG92ZXJsYXlZOiAnY2VudGVyJyB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0cmF0ZWd5O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldFNjcm9sbFN0cmF0ZWd5KCk6IFNjcm9sbFN0cmF0ZWd5IHtcclxuICAgIHN3aXRjaCAodGhpcy5zY3JvbGxTdHJhdGVneSkge1xyXG4gICAgICBjYXNlICdibG9jayc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCk7XHJcbiAgICAgIGNhc2UgJ3JlcG9zaXRpb24nOlxyXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY2hlY2tTaXplcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcclxuICAgICAgaWYgKCF0aGlzLndpZHRoKSB7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLndpZHRoID0gdGhpcy5nZXRIb3N0V2lkdGgoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5oZWlnaHQpIHtcclxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVNpemUodGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpKTtcclxuICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0Q29ubmVjdGVkRWxlbWVudCgpOiBFbGVtZW50UmVmIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRIb3N0V2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gIH1cclxufVxyXG4iXX0=