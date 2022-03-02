import { EventEmitter, OnInit } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import type { DateLike } from '../../date-picker/date-picker.types';
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
}
