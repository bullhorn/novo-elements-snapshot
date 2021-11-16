import { ViewContainerRef, Type } from '@angular/core';
import { NovoModalRef } from './Modal';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';
import * as ɵngcc0 from '@angular/core';
export declare class NovoModalService {
    private componentUtils;
    _parentViewContainer: ViewContainerRef;
    constructor(componentUtils: ComponentUtils);
    set parentViewContainer(view: ViewContainerRef);
    open<T>(component: Type<T>, scope?: {}): NovoModalRef;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoModalService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<NovoModalService>;
}

//# sourceMappingURL=ModalService.d.ts.map