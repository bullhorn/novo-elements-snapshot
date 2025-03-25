import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import * as i0 from "@angular/core";
export declare class NovoDataTableVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    rowHeight: number;
    constructor();
    attach(viewport: CdkVirtualScrollViewport): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableVirtualScrollStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoDataTableVirtualScrollStrategy>;
}
