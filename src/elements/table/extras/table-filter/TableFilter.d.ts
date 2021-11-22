import { ElementRef, EventEmitter, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
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
}
