import { ComponentFactoryResolver, ComponentRef, StaticProvider, Type, ViewContainerRef } from '@angular/core';
export declare class ComponentUtils<T = any> {
    componentFactoryResolver: ComponentFactoryResolver;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    append<T>(ComponentClass: Type<T>, location: ViewContainerRef, providers?: StaticProvider[], onTop?: boolean): ComponentRef<T>;
}
