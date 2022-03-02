import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class NovoAvatarElement implements OnInit {
    private sanitizer;
    source: any;
    label: string;
    theme: string;
    image: string;
    size: string;
    shape: string;
    color: string;
    get hb_classBinding(): string[];
    get background(): string;
    src: any;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): any;
    setPrefixedValue(elm: any, prop: any, value: any): any;
    private _isValidURL;
}
