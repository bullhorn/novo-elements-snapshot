import { Overlay } from '@angular/cdk/overlay';
import { Injector, ViewContainerRef } from '@angular/core';
import { NovoModalRef } from './modal-ref';
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
}
