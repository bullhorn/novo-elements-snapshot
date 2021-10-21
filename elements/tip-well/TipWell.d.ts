import { EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NovoLabelService } from '../../services/novo-label-service';
import * as i0 from "@angular/core";
export declare class NovoTipWellElement implements OnInit {
    private labels;
    private sanitizer;
    name: string | number;
    tip: string;
    buttonText: string;
    button: boolean;
    icon: string;
    sanitize: boolean;
    confirmed: EventEmitter<any>;
    isActive: boolean;
    isLocalStorageEnabled: any;
    localStorageKey: string;
    private _tipWithStyles;
    private _lastTipStyled;
    constructor(labels: NovoLabelService, sanitizer: DomSanitizer);
    get tipWithStyles(): SafeHtml;
    ngOnInit(): void;
    hideTip(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoTipWellElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoTipWellElement, "novo-tip-well", never, { "name": "name"; "tip": "tip"; "buttonText": "buttonText"; "button": "button"; "icon": "icon"; "sanitize": "sanitize"; }, { "confirmed": "confirmed"; }, never, never>;
}
