import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
export declare class NovoAsideService {
    private injector;
    private overlay;
    constructor(injector: Injector, overlay: Overlay);
    open(component: any, params?: {}): OverlayRef;
    private createOverlay;
    private attachAsideContainer;
    private createInjector;
    private getOverlayConfig;
}
