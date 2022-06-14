import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { TypographySize } from '../common/typography';
import * as i0 from "@angular/core";
export declare class NovoIconComponent implements AfterViewInit {
    element: ElementRef;
    private cdr;
    raised: boolean;
    theme: string;
    color: string;
    role: string;
    ariaLabel: string;
    size: TypographySize;
    smaller: boolean;
    larger: boolean;
    set alt(value: string);
    get alt(): string;
    set name(iconName: string);
    get name(): string;
    get hb_classBinding(): string;
    iconName: string;
    constructor(element: ElementRef, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    projectContentChanged(record: MutationRecord): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoIconComponent, "novo-icon", never, { "raised": "raised"; "theme": "theme"; "color": "color"; "size": "size"; "smaller": "smaller"; "larger": "larger"; "alt": "alt"; "name": "name"; }, {}, never, ["*"]>;
}
