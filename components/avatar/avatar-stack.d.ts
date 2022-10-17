import { AfterViewInit, QueryList } from '@angular/core';
import { NovoAvatarElement } from './avatar';
import * as i0 from "@angular/core";
export declare class NovoAvatarStackElement implements AfterViewInit {
    total: number;
    viewChildren: QueryList<NovoAvatarElement>;
    showTotal: boolean;
    remainingCount: number;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAvatarStackElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAvatarStackElement, "novo-avatar-stack", never, { "total": "total"; }, {}, never, ["*"]>;
}
