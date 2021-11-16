import { ComponentFactoryResolver, ComponentRef, StaticProvider, Type, ViewContainerRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class ComponentUtils {
    componentFactoryResolver: ComponentFactoryResolver;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    append<T>(ComponentClass: Type<T>, location: ViewContainerRef, providers?: StaticProvider[], onTop?: boolean): ComponentRef<T>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ComponentUtils, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ComponentUtils>;
}

//# sourceMappingURL=ComponentUtils.d.ts.map