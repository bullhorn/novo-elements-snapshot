import { OnInit, EventEmitter } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoTipWellElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoTipWellElement, "novo-tip-well", never, { "button": "button"; "sanitize": "sanitize"; "tip": "tip"; "buttonText": "buttonText"; "icon": "icon"; "name": "name"; }, { "confirmed": "confirmed"; }, never, never>;
}

//# sourceMappingURL=TipWell.d.ts.map