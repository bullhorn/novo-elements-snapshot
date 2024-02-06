import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ThSortable {
    config: any;
    column: any;
    onSortChange: EventEmitter<any>;
    onToggleSort(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThSortable, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ThSortable, "[novoThSortable]", never, { "config": { "alias": "novoThSortable"; "required": false; }; "column": { "alias": "column"; "required": false; }; }, { "onSortChange": "onSortChange"; }, never, never, false, never>;
}
