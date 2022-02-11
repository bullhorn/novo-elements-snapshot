import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DateLike, Day, OverlayDate } from '../date-picker.types';
import * as i0 from "@angular/core";
export declare class NovoMonthViewElement implements OnInit {
    labels: NovoLabelService;
    private element;
    private cdr;
    private _sanitizer;
    minDate: Date;
    maxDate: Date;
    activeDate: Date;
    selected: DateLike[];
    preview: DateLike[];
    overlays: OverlayDate[];
    isRange: boolean;
    hideOverflowDays: boolean;
    _weekStartsOn: number;
    get weekStartsOn(): number;
    set weekStartsOn(value: number);
    select: EventEmitter<any>;
    hover: EventEmitter<any>;
    weekdays: string[];
    monthNames: string[];
    monthLabel: string;
    weeks: any;
    constructor(labels: NovoLabelService, element: ElementRef, cdr: ChangeDetectorRef, _sanitizer: DomSanitizer);
    ngOnInit(): void;
    updateView(date: Date): void;
    onSelect(event: Event, day: Day): void;
    onHover(event: Event, day: Day): void;
    buildMonth(month: Date): void;
    buildWeek(date: Date, month: Date): Array<Object>;
    isDisabled(day: DateLike): boolean;
    /** Returns whether a cell should be marked as selected. */
    _isSelected(value: DateLike): string | number | Date;
    /** Returns whether a cell should be marked as preview. */
    _isPreview(value: DateLike): string | number | Date;
    /** Returns whether a cell should be marked as an overlay. */
    _isOverlay(value: DateLike): OverlayDate;
    /** Returns whether a cell should be marked as an overlay. */
    _hasOverlayType(value: DateLike): string;
    /** Gets whether a value is the start of the main range. */
    _isRangeStart(value: DateLike): boolean;
    /** Gets whether a value is the end of the main range. */
    _isRangeEnd(value: DateLike): boolean;
    /** Gets whether a value is within the currently-selected range. */
    _isInRange(value: DateLike): boolean;
    /** Gets whether a value is the start of the preview range. */
    _isPreviewStart(value: DateLike): boolean;
    /** Gets whether a value is the end of the preview range. */
    _isPreviewEnd(value: DateLike): boolean;
    /** Gets whether a value is inside the preview range. */
    _isInPreview(value: DateLike): boolean;
    static ɵfac: i0.ɵɵFactoryDef<NovoMonthViewElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoMonthViewElement, "novo-month-view", never, { "minDate": "minDate"; "maxDate": "maxDate"; "activeDate": "activeDate"; "selected": "selected"; "preview": "preview"; "overlays": "overlays"; "isRange": "isRange"; "hideOverflowDays": "hideOverflowDays"; "weekStartsOn": "weekStartsOn"; }, { "select": "select"; "hover": "hover"; }, never, never>;
}
