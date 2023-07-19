import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NovoDateTimePickerElement implements ControlValueAccessor {
    labels: NovoLabelService;
    private element;
    defaultTime: string;
    minYear: any;
    maxYear: any;
    start: any;
    end: any;
    military: any;
    weekStart: number;
    disabledDateMessage: string;
    onSelect: EventEmitter<any>;
    componentTabState: string;
    selectedLabel: string;
    hours: string;
    minutes: string;
    meridian: string;
    datePickerValue: Date;
    timePickerValue: Date;
    model: any;
    _onChange: Function;
    _onTouched: Function;
    constructor(labels: NovoLabelService, element: ElementRef);
    toggleView(tab: string): void;
    onModelChange(event: any): void;
    setDateLabels(value: Date): void;
    setTimeLabels(value: Date): void;
    onDateSelected(event: {
        month?: any;
        year?: any;
        day?: any;
        date?: Date;
    }): void;
    onTimeSelected(event: {
        hours?: number;
        minutes?: number;
        meridian?: string;
        date?: Date;
        text?: string;
    }): void;
    createFullDateValue(datePickerValue: Date, timePickerValue: Date): Date;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateTimePickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDateTimePickerElement, "novo-date-time-picker", never, { "defaultTime": "defaultTime"; "minYear": "minYear"; "maxYear": "maxYear"; "start": "start"; "end": "end"; "military": "military"; "weekStart": "weekStart"; "disabledDateMessage": "disabledDateMessage"; }, { "onSelect": "onSelect"; }, never, never>;
}
