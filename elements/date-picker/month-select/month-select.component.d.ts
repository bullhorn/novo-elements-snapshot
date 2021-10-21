import { EventEmitter, OnInit } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DateLike } from '../date-picker.types';
import * as i0 from "@angular/core";
export declare class NovoMonthSelectElement implements OnInit {
    labels: NovoLabelService;
    activeDate: DateLike;
    selected: DateLike[];
    select: EventEmitter<any>;
    monthNames: string[];
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    onSelect(event: Event, month: number): void;
    _isActive(month: number): boolean;
    _isSelected(month: number): boolean;
    static ɵfac: i0.ɵɵFactoryDef<NovoMonthSelectElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoMonthSelectElement, "novo-month-select", never, { "activeDate": "activeDate"; "selected": "selected"; }, { "select": "select"; }, never, never>;
}
