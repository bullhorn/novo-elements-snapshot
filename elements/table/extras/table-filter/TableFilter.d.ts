import { EventEmitter, ElementRef, Renderer2, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class TableFilter implements OnInit, OnChanges {
    private element;
    private renderer;
    config: any;
    onFilterChange: EventEmitter<any>;
    filterThrottle: any;
    constructor(element: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    onChangeFilter(event: KeyboardEvent): void;
    onClick(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TableFilter, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<TableFilter, "[novoTableFilter]", never, { "config": "novoTableFilter"; }, { "onFilterChange": "onFilterChange"; }, never>;
}

//# sourceMappingURL=TableFilter.d.ts.map