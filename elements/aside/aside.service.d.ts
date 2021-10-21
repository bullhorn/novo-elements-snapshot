import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoAsideService {
    private injector;
    private overlay;
    constructor(injector: Injector, overlay: Overlay);
    open(component: any, params?: {}): OverlayRef;
    private createOverlay;
    private attachAsideContainer;
    private createInjector;
    private getOverlayConfig;
    static ɵfac: i0.ɵɵFactoryDef<NovoAsideService, never>;
    static ɵprov: i0.ɵɵInjectableDef<NovoAsideService>;
}
