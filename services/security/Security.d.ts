import { EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class Security {
    credentials: string[];
    change: EventEmitter<any>;
    grant(data: any[] | Object): void;
    has(value: any): boolean;
    revoke(value: any): void;
    clear(): void;
    subscribe(fn: any): void;
    checkRoutes(routes: {
        entities?: any[];
        permissions?: any[] | Function;
        path?: string;
        label?: string;
        canDisable?: Boolean;
    }[], options: {
        entityType?: string;
    }): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Security, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<Security>;
}

//# sourceMappingURL=Security.d.ts.map