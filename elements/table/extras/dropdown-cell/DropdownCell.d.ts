import { OnInit } from '@angular/core';
import { BaseRenderer } from '../base-renderer';
import * as i0 from "@angular/core";
export interface INovoDropdownCellConfig {
    category?: string;
    callback?: Function;
    options: ({
        label?: string;
        value?: string;
        callback?: Function;
    } | string)[];
}
export declare class NovoDropdownCell extends BaseRenderer implements OnInit {
    meta: any;
    set value(v: any);
    get value(): any;
    ngOnInit(): void;
    onClick(config: any, option: any, value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDropdownCell, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDropdownCell, "novo-dropdown-cell", never, { "meta": "meta"; "value": "value"; }, {}, never, never>;
}
