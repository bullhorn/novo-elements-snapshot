import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ThSortable {
    config: any;
    column: any;
    onSortChange: EventEmitter<any>;
    onToggleSort(event: any): void;
    static ɵfac: i0.ɵɵFactoryDef<ThSortable, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ThSortable, "[novoThSortable]", never, { "config": "novoThSortable"; "column": "column"; }, { "onSortChange": "onSortChange"; }, never>;
}
