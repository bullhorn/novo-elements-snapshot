import * as ɵngcc0 from '@angular/core';
export interface Global {
}
export declare abstract class GlobalRef {
    abstract get nativeGlobal(): Global;
}
export declare class BrowserGlobalRef extends GlobalRef {
    get nativeGlobal(): Global;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<BrowserGlobalRef, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<BrowserGlobalRef>;
}
export declare class NodeGlobalRef extends GlobalRef {
    get nativeGlobal(): Global;
}

//# sourceMappingURL=global.service.d.ts.map