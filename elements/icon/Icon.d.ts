import { ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoIconComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoIconComponent, "novo-icon", never, { "size": "size"; "alt": "alt"; "name": "name"; "raised": "raised"; "theme": "theme"; "color": "color"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=Icon.d.ts.map