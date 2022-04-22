import { Overlay } from '@angular/cdk/overlay';
import { Injector, ViewContainerRef } from '@angular/core';
import { NovoModalRef } from './modal-ref';
export declare class NovoModalService {
    private injector;
    private overlay;
    _parentViewContainer: ViewContainerRef;
    set parentViewContainer(view: ViewContainerRef);
    constructor(injector: Injector, overlay: Overlay);
    open<T extends Record<string, any>>(component: any, params?: Partial<T>): NovoModalRef<Partial<T>, any>;
    private createOverlay;
    private attachModalContainer;
    private createInjector;
    private getOverlayConfig;
}
