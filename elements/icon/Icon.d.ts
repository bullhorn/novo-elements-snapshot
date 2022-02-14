import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
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
    projectContentChanged(record: MutationRecord): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoIconComponent, "novo-icon", never, { "raised": "raised"; "size": "size"; "theme": "theme"; "color": "color"; "alt": "alt"; "name": "name"; }, {}, never, ["*"]>;
}
