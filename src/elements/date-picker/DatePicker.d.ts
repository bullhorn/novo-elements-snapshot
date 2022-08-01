import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from '../../services/novo-label-service';
import { DatePickerSelectModes, modelTypes, rangeSelectModes } from './date-picker.types';
import * as i0 from "@angular/core";
export declare class NovoDatePickerElement implements ControlValueAccessor, OnInit {
    labels: NovoLabelService;
    private element;
    private cdr;
    private _sanitizer;
    /**
     * The minimum year to allow selected in year select view
     **/
    minYear: string | number;
    /**
     * The maximum year to allow selected in year select view
     **/
    maxYear: string | number;
    /**
     * The minimum date that can be selected.
     **/
    start: Date;
    /**
     * The maximum date that can be selected.
     **/
    end: Date;
    /**
     * **Deprecated** Whether the date-picker is used outside of an overlay.
     **/
    inline: boolean;
    /**
     * Day of the week the calendar should display first, Sunday=0...Saturday=6
     **/
    weekStart: number;
    /**
     * Certain dates that are already selected.
     **/
    preselected: Date[];
    /**
     * Whether the days for the previous and next month should be hidden.
     **/
    hideOverflowDays: boolean;
    /**
     * Whether the footer which contains `today` button should be hidden.
     **/
    hideFooter: boolean;
    disabledDateMessage: string;
    onSelect: EventEmitter<any>;
    _mode: DatePickerSelectModes;
    _range: boolean;
    _weekRangeSelect: boolean;
    _numberOfMonths: number[];
    /**
     * Number of months to display at once.
     * @default 1
     **/
    get numberOfMonths(): number;
    set numberOfMonths(value: number);
    /**
     * How the date selection should work.
     * @default single
     **/
    get mode(): DatePickerSelectModes;
    set mode(value: DatePickerSelectModes);
    /**
     * **deprecated** please use `mode="range"`.
     **/
    get range(): boolean;
    set range(value: boolean);
    /**
     * **deprecated** please use `mode="week"`.
     **/
    get weekRangeSelect(): boolean;
    set weekRangeSelect(value: boolean);
    model: modelTypes;
    activeDate: Date;
    _selection: Date[];
    preview: Date[];
    startDateLabel: string;
    endDateLabel: string;
    rangeSelectMode: rangeSelectModes;
    _onChange: Function;
    _onTouched: Function;
    get selection(): Date[];
    set selection(value: Date[]);
    constructor(labels: NovoLabelService, element: ElementRef, cdr: ChangeDetectorRef, _sanitizer: DomSanitizer);
    ngOnInit(): void;
    updateView(date: any): void;
    updateSelection(selected: Date[], fireEvents?: boolean): void;
    eventData(date: Date): {
        year: number;
        month: any;
        day: any;
        date: Date;
    };
    fireSelect(): void;
    fireRangeSelect(): void;
    setToday(): void;
    toggleRangeSelect(range: rangeSelectModes): void;
    modelToSelection(model: modelTypes): void;
    writeValue(model: modelTypes): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDatePickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDatePickerElement, "novo-date-picker", never, { "minYear": "minYear"; "maxYear": "maxYear"; "start": "start"; "end": "end"; "inline": "inline"; "weekStart": "weekStart"; "preselected": "preselected"; "hideOverflowDays": "hideOverflowDays"; "hideFooter": "hideFooter"; "disabledDateMessage": "disabledDateMessage"; "numberOfMonths": "numberOfMonths"; "mode": "mode"; "range": "range"; "weekRangeSelect": "weekRangeSelect"; }, { "onSelect": "onSelect"; }, never, never>;
}
