import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
export declare class CardActionsElement {
}
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export declare class CardContentElement {
    condensed: boolean;
}
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export declare class CardHeaderElement {
}
export declare class CardFooterElement {
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
    inline: boolean;
    inset: string;
    get hbInset(): string;
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
}
