import { AfterContentInit, QueryList } from '@angular/core';
import { NovoFieldElement } from './field';
export declare class NovoFieldsElement implements AfterContentInit {
    _fields: QueryList<NovoFieldElement>;
    _layout: 'horizontal' | 'vertical';
    get layout(): any;
    set layout(value: any);
    _appearance: 'standard' | 'outline' | 'fill' | 'list';
    get appearance(): any;
    set appearance(value: any);
    fullWidth: boolean;
    ngAfterContentInit(): any;
    private _updateFieldLayout;
    private _updateFieldAppearance;
}
