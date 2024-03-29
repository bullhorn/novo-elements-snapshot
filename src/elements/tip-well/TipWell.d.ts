import { EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NovoLabelService } from '../../services/novo-label-service';
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
}
