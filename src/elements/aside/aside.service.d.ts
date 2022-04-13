import { Overlay } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { NovoAsideRef } from './aside-ref';
export declare class NovoAsideService {
    private injector;
    private overlay;
    constructor(injector: Injector, overlay: Overlay);
    open<R = any>(component: any, params?: {}, config?: {}): NovoAsideRef<{}, R>;
    private createOverlay;
    private attachAsideContainer;
    private createInjector;
    private getOverlayConfig;
}
