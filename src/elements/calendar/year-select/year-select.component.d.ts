import { EventEmitter, OnInit } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import type { DateLike } from '../../date-picker/date-picker.types';
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
}
