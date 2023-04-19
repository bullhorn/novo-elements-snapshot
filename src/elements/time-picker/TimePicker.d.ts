import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DateFormatService, NovoLabelService } from '../../services';
import * as i0 from "@angular/core";
export declare enum TIME_VALUE_FORMATS {
    iso8601 = "iso8601",
    Date = "Date"
}
export declare class NovoTimePickerElement implements ControlValueAccessor, OnInit, OnChanges {
    element: ElementRef;
    labels: NovoLabelService;
    dateFormatService: DateFormatService;
    protected cdr: ChangeDetectorRef;
    military: boolean;
    analog: boolean;
    inline: boolean;
    step: number;
    onSelect: EventEmitter<any>;
    hours: number;
    minutes: number;
    value: any;
    meridian: string;
    inBetween: boolean;
    hoursClass: string;
    activeHour: any;
    minutesClass: string;
    activeMinute: any;
    increments: string[];
    selected: string;
    MERIDIANS: Array<string>;
    MINUTES: Array<string>;
    HOURS: Array<string>;
    model: any;
    _onChange: Function;
    _onTouched: Function;
    flatten(arr: any): any[];
    constructor(element: ElementRef, labels: NovoLabelService, dateFormatService: DateFormatService, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    init(value: any, dispatch: any): void;
    checkBetween(value: any): void;
    setValue(event: any, value: any): void;
    setHours(event: any, hours: any, dispatch: any): void;
    setMinutes(event: any, minutes: any, dispatch: any): void;
    setPeriod(event: any, period: any, dispatch: any): void;
    dispatchChange(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    convertTime12to24(time12h: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTimePickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTimePickerElement, "novo-time-picker", never, { "military": "military"; "analog": "analog"; "inline": "inline"; "step": "step"; }, { "onSelect": "onSelect"; }, never, never>;
}
