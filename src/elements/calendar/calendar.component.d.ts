import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from '../../services/novo-label-service';
import type { DatePickerSelectModes, NovoDateSelectEvent, NovoDateSelectionStrategy, NovoMonthSelectEvent, NovoYearSelectEvent, OverlayDate } from '../date-picker/date-picker.types';
export declare class NovoCalendarElement implements OnInit {
    labels: NovoLabelService;
    private element;
    private cdr;
    private _sanitizer;
    minYear: string | number;
    maxYear: string | number;
    activeView: string;
    layout: string;
    _selected: Date[];
    get selected(): Date[];
    set selected(value: Date[]);
    selectedChange: EventEmitter<Date[]>;
    preview: Date[];
    previewChange: EventEmitter<Date[]>;
    activeDateChange: EventEmitter<Date>;
    overlays: OverlayDate[];
    _activeDate: Date;
    _mode: DatePickerSelectModes;
    _numberOfMonths: number[];
    _weekStartsOn: number;
    _strategy: NovoDateSelectionStrategy<any>;
    months: any;
    get activeDate(): Date;
    set activeDate(value: Date);
    get weekStartsOn(): number;
    set weekStartsOn(value: number);
    get numberOfMonths(): number;
    set numberOfMonths(value: number);
    get mode(): DatePickerSelectModes;
    set mode(value: DatePickerSelectModes);
    get hb_width(): import("@angular/platform-browser").SafeStyle;
    get hb_horiztonal(): boolean;
    get hb_vertical(): boolean;
    constructor(labels: NovoLabelService, element: ElementRef, cdr: ChangeDetectorRef, _sanitizer: DomSanitizer);
    ngOnInit(): void;
    updateView(activeDate: Date): void;
    setToday(): void;
    monthSelected({ event, month }: NovoMonthSelectEvent): void;
    yearSelected({ event, year }: NovoYearSelectEvent): void;
    dateSelected({ event, day }: NovoDateSelectEvent): void;
    updatePreview({ event, day }: NovoDateSelectEvent): void;
    prevMonth(event: Event): void;
    nextMonth(event: Event): void;
    openView(event: Event, type: string): void;
    _isRange(): boolean;
}
