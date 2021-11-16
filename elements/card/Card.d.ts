import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare class CardActionsElement {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CardActionsElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<CardActionsElement, "novo-card-actions", never, {}, {}, never, ["*"]>;
}
export declare class CardElement implements OnChanges, OnInit {
    padding: boolean;
    config: any;
    title: string;
    message: string;
    messageIcon: string;
    icon: string;
    iconTooltip: string;
    refresh: boolean;
    close: boolean;
    move: boolean;
    loading: boolean;
    onClose: EventEmitter<any>;
    onRefresh: EventEmitter<any>;
    cardAutomationId: string;
    labels: NovoLabelService;
    iconClass: string | null;
    messageIconClass: string;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    toggleClose(): void;
    toggleRefresh(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CardElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<CardElement, "novo-card", never, { "padding": "padding"; "config": "config"; "title": "title"; "message": "message"; "messageIcon": "messageIcon"; "icon": "icon"; "iconTooltip": "iconTooltip"; "refresh": "refresh"; "close": "close"; "move": "move"; "loading": "loading"; }, { "onClose": "onClose"; "onRefresh": "onRefresh"; }, never, ["novo-card-actions", "*", "footer"]>;
}

//# sourceMappingURL=Card.d.ts.map