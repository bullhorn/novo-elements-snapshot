import { EventEmitter, OnInit } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import type { DateLike } from '../../date-picker/date-picker.types';
import * as i0 from "@angular/core";
export declare class NovoYearSelectElement implements OnInit {
    labels: NovoLabelService;
    minYear: string | number;
    maxYear: string | number;
    activeDate: DateLike;
    selected: DateLike[];
    select: EventEmitter<any>;
    years: Array<any>;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    onSelect(event: Event, year: number): void;
    _isActive(year: number): boolean;
    _isSelected(year: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoYearSelectElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoYearSelectElement, "novo-year-select", never, { "minYear": "minYear"; "maxYear": "maxYear"; "activeDate": "activeDate"; "selected": "selected"; }, { "select": "select"; }, never, never>;
}
