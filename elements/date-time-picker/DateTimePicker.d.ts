import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare class NovoDateTimePickerElement implements ControlValueAccessor {
    labels: NovoLabelService;
    private element;
    minYear: any;
    maxYear: any;
    start: any;
    end: any;
    military: any;
    weekStart: number;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDateTimePickerElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoDateTimePickerElement, "novo-date-time-picker", never, { "weekStart": "weekStart"; "minYear": "minYear"; "maxYear": "maxYear"; "start": "start"; "end": "end"; "military": "military"; }, { "onSelect": "onSelect"; }, never, never>;
}

//# sourceMappingURL=DateTimePicker.d.ts.map