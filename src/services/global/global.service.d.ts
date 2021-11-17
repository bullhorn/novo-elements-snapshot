export interface Global {
}
export declare abstract class GlobalRef {
    abstract get nativeGlobal(): Global;
}
export declare class BrowserGlobalRef extends GlobalRef {
    get nativeGlobal(): Global;
}
export declare class NodeGlobalRef extends GlobalRef {
    get nativeGlobal(): Global;
}
