import * as i0 from "@angular/core";
export interface Global {
}
export declare abstract class GlobalRef {
    abstract get nativeGlobal(): Global;
}
export declare class BrowserGlobalRef extends GlobalRef {
    get nativeGlobal(): Global;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserGlobalRef, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BrowserGlobalRef>;
}
export declare class NodeGlobalRef extends GlobalRef {
    get nativeGlobal(): Global;
}
