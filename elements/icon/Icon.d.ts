import { ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
export declare class NovoIconComponent implements AfterViewInit {
    element: ElementRef;
    private cdr;
    raised: boolean;
    size: string;
    theme: string;
    color: string;
    role: string;
    ariaLabel: string;
    set alt(value: string);
    get alt(): string;
    set name(iconName: string);
    get name(): string;
    iconName: string;
    constructor(element: ElementRef, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
}
