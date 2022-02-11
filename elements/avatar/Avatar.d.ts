import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class NovoAvatarElement implements OnInit {
    private sanitizer;
    source: any;
    label: string;
    color: string;
    theme: string;
    size: string;
    get background(): string;
    src: any;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): any;
    setPrefixedValue(elm: any, prop: any, value: any): any;
    static ɵfac: i0.ɵɵFactoryDef<NovoAvatarElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoAvatarElement, "novo-avatar", never, { "source": "source"; "label": "label"; "color": "color"; "theme": "theme"; "size": "size"; }, {}, never, never>;
}
