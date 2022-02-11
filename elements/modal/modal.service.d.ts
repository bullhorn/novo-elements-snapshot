import { Overlay } from '@angular/cdk/overlay';
import { Injector, ViewContainerRef } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import * as i0 from "@angular/core";
export declare class NovoModalService {
    private injector;
    private overlay;
    _parentViewContainer: ViewContainerRef;
    set parentViewContainer(view: ViewContainerRef);
    constructor(injector: Injector, overlay: Overlay);
    open(component: any, params?: {}): NovoModalRef<{}>;
    private createOverlay;
    private attachModalContainer;
    private createInjector;
    private getOverlayConfig;
    static ɵfac: i0.ɵɵFactoryDef<NovoModalService, never>;
    static ɵprov: i0.ɵɵInjectableDef<NovoModalService>;
}
