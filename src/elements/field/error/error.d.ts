import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class NovoErrorElement implements OnInit {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): any;
}
