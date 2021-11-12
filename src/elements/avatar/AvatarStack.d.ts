import { AfterViewInit, QueryList } from '@angular/core';
import { NovoAvatarElement } from './Avatar';
export declare class NovoAvatarStackElement implements AfterViewInit {
    total: number;
    viewChildren: QueryList<NovoAvatarElement>;
    showTotal: boolean;
    remainingCount: number;
    ngAfterViewInit(): void;
}
