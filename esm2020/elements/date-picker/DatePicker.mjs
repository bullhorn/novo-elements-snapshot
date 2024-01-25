var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// NG2
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { isDate, isValid, subDays } from 'date-fns';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInput, DateUtil, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
import * as i4 from "novo-elements/elements/button";
import * as i5 from "novo-elements/elements/calendar";
// Value accessor for the component (supports ngModel)
const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerElement),
    multi: true,
};
export class NovoDatePickerElement {
    /**
     * Number of months to display at once.
     * @default 1
     **/
    get numberOfMonths() {
        return this._numberOfMonths.length;
    }
    set numberOfMonths(value) {
        this._numberOfMonths = Array.from(Array(Number(value)).keys());
    }
    /**
     * How the date selection should work.
     * @default single
     **/
    get mode() {
        return this._mode;
    }
    set mode(value) {
        if (this._mode !== value) {
            this._mode = value;
        }
    }
    /**
     * **deprecated** please use `mode="range"`.
     **/
    get range() {
        return ['range', 'week'].includes(this.mode) || this._range;
    }
    set range(value) {
        console.warn(`'range' property is deprecated, please use 'mode="range"'.`);
        if (this._range !== value) {
            this._range = value;
            this.mode = 'range';
        }
    }
    /**
     * **deprecated** please use `mode="week"`.
     **/
    get weekRangeSelect() {
        return this._mode === 'week' || this._weekRangeSelect;
    }
    set weekRangeSelect(value) {
        console.warn(`'weekRangeSelect' property is deprecated, please use 'mode="week"'.`);
        if (this._weekRangeSelect !== value) {
            this._weekRangeSelect = value;
            this.mode = 'week';
        }
    }
    get selection() {
        return this._selection;
    }
    set selection(value) {
        this._selection = value ? value.filter(isDate).map((d) => DateUtil.startOfDay(d)) : [];
    }
    constructor(labels, element, cdr, _sanitizer) {
        this.labels = labels;
        this.element = element;
        this.cdr = cdr;
        this._sanitizer = _sanitizer;
        /**
         * Day of the week the calendar should display first, Sunday=0...Saturday=6
         **/
        this.weekStart = 0;
        /**
         * Certain dates that are already selected.
         **/
        this.preselected = [];
        /**
         * Whether the days for the previous and next month should be hidden.
         **/
        this.hideOverflowDays = false;
        /**
         * Whether the footer which contains `today` button should be hidden.
         **/
        this.hideFooter = false;
        // Select callback for output
        this.onSelect = new EventEmitter(false);
        this._mode = 'single';
        this._numberOfMonths = [0];
        this._selection = [];
        this.preview = [];
        this.rangeSelectMode = 'startDate';
        this._onChange = () => { };
        this._onTouched = () => { };
    }
    ngOnInit() {
        // Determine the year array
        const now = new Date();
        // Set labels
        if (this.model) {
            this.modelToSelection(this.model);
        }
        if (this.selection && this.selection.length) {
            this.updateView(this.selection[0]);
        }
    }
    updateView(date) {
        const value = date ? new Date(date) : new Date();
        this.activeDate = new Date(value);
    }
    updateSelection(selected, fireEvents = true) {
        // Helpers.swallowEvent(event);
        this.selection = selected;
        this.startDateLabel = this.labels.formatDateWithFormat(this.selection[0], {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
        this.endDateLabel = this.labels.formatDateWithFormat(this.selection[1], {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
        if (fireEvents) {
            switch (this.mode) {
                case 'multiple':
                    this.fireSelect();
                    // Also, update the ngModel
                    this._onChange(this.selection);
                    this.model = this.selection;
                    break;
                case 'range':
                case 'week':
                    if (this.selection.filter(Boolean).length === 2) {
                        this.fireRangeSelect();
                        // Also, update the ngModel
                        const model = {
                            startDate: this.selection[0],
                            endDate: this.selection[1],
                        };
                        this._onChange(model);
                        this.model = model;
                    }
                    break;
                case 'single':
                default:
                    this.fireSelect();
                    // Also, update the ngModel
                    this._onChange(this.selection[0]);
                    this.model = this.selection[0];
                    break;
            }
        }
        this.cdr.markForCheck();
    }
    eventData(date) {
        return {
            year: date.getFullYear(),
            month: this.labels.formatDateWithFormat(date, { month: 'long' }),
            day: this.labels.formatDateWithFormat(date, { weekday: 'long' }),
            date,
        };
    }
    fireSelect() {
        if (this.mode === 'multiple') {
            this.onSelect.next(this.selection);
        }
        else {
            this.onSelect.next(this.eventData(this.selection[0]));
        }
    }
    fireRangeSelect() {
        // Make sure the start date is before the end date
        if (this.selection.filter(Boolean).length === 2) {
            const [start, end] = this.selection;
            this.onSelect.next({
                startDate: this.eventData(start),
                endDate: this.eventData(end),
            });
        }
    }
    setToday() {
        const tmp = new Date();
        this.updateView(tmp);
        this.updateSelection(Array.of(tmp));
    }
    toggleRangeSelect(range) {
        this.rangeSelectMode = range;
        if (range === 'startDate' && this.selection.length) {
            this.updateView(this.selection[0]);
        }
        if (range === 'endDate' && this.selection.length === 2) {
            this.updateView(this.selection[1]);
        }
    }
    modelToSelection(model) {
        switch (this.mode) {
            case 'multiple':
                this.selection = model;
                break;
            case 'range':
            case 'week':
                this.setRangeSelection();
            case 'single':
            default:
                this.selection = [model];
                break;
        }
    }
    // ValueAccessor Functions
    writeValue(model) {
        this.model = model;
        if (this.mode === 'multiple') {
            this.selection = this.model;
        }
        if (this.mode === 'range') {
            this.setRangeSelection();
        }
        if (Helpers.isDate(model)) {
            this.updateView(model);
            this.modelToSelection(model);
        }
        else if (Helpers.isString(model)) {
            const date = DateUtil.parse(model);
            if (isValid(date)) {
                this.updateView(date);
                this.modelToSelection(date);
            }
        }
    }
    setRangeSelection() {
        if (this.model?.hasOwnProperty('startDate')) {
            // coming from standalone date picker
            const range = this.model;
            this.selection = [range.startDate, range.endDate].filter(Boolean);
        }
        else if (this.model?.hasOwnProperty('min')) {
            // coming from data-table filter where model end date is the beginning of the next day
            const range = this.model;
            this.selection = [range.min, subDays(range.max, 1)].filter(Boolean);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
NovoDatePickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDatePickerElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoDatePickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoDatePickerElement, selector: "novo-date-picker", inputs: { minYear: "minYear", maxYear: "maxYear", start: "start", end: "end", inline: "inline", weekStart: "weekStart", preselected: "preselected", hideOverflowDays: "hideOverflowDays", hideFooter: "hideFooter", disabledDateMessage: "disabledDateMessage", numberOfMonths: "numberOfMonths", mode: "mode", range: "range", weekRangeSelect: "weekRangeSelect" }, outputs: { onSelect: "onSelect" }, host: { properties: { "class.hide-overflow-days": "this.hideOverflowDays" } }, providers: [DATE_PICKER_VALUE_ACCESSOR], ngImport: i0, template: `
    <div class="date-picker-container">
      <div class="date-range-tabs" *ngIf="range" [class.week-select-mode]="weekRangeSelect">
        <span
          class="range-tab"
          (click)="toggleRangeSelect('startDate')"
          [@startDateTextState]="rangeSelectMode"
          data-automation-id="calendar-start-date"
          >{{ startDateLabel }}</span
        >
        <span
          class="range-tab"
          (click)="toggleRangeSelect('endDate')"
          [@endDateTextState]="rangeSelectMode"
          data-automation-id="calendar-end-date"
          >{{ endDateLabel }}</span
        >
        <i class="indicator" [@indicatorState]="rangeSelectMode"></i>
      </div>

      <novo-calendar
        [activeDate]="activeDate"
        [(selected)]="selection"
        (selectedChange)="updateSelection($event)"
        [mode]="mode"
        [numberOfMonths]="numberOfMonths"
        [weekStartsOn]="weekStart"
        [disabledDateMessage]="disabledDateMessage"
        [minDate]="start"
        [maxDate]="end"
      ></novo-calendar>

      <div class="calendar-footer" [hidden]="hideFooter">
        <novo-button (click)="setToday()" class="today" size="small" data-automation-id="calendar-today">{{ labels.today }}</novo-button>
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block}:host .date-picker-container{border-radius:4px;width:min-content;text-align:center;background:var(--background-main);color:#3a3a3a;-webkit-user-select:none;user-select:none;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:9001;position:relative}:host .date-picker-container .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host .date-picker-container .calendar-top{display:flex;flex-flow:column;background:#4a89dc;color:#fff;font-size:14px;border-top-right-radius:4px;border-top-left-radius:4px}:host .date-picker-container .calendar-top h1{font-weight:600;font-size:4.2em;color:#fff;margin:0;padding:0}:host .date-picker-container .calendar-top h2{font-weight:300;opacity:1;margin:10px auto;padding:0}:host .date-picker-container .calendar-top h3{font-weight:400;opacity:.4;margin:15px auto;padding:0}:host .date-picker-container .calendar-top h4{background:rgba(0,0,0,.15);font-size:1em;font-weight:300;padding:10px}:host .date-picker-container .date-range-tabs{border-bottom:1px solid #f7f7f7;display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-picker-container .date-range-tabs.week-select-mode>span{cursor:default;color:#3d464d;pointer-events:none;opacity:1!important}:host .date-picker-container .date-range-tabs.week-select-mode .indicator{display:none}:host .date-picker-container .date-range-tabs>span{color:#4a89dc;text-align:center;flex:1;cursor:pointer;font-weight:500;transition:opacity .2s ease-in-out;opacity:.6}:host .date-picker-container .date-range-tabs>span:hover{opacity:1!important}:host .date-picker-container .date-range-tabs .indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:#4a89dc;transition:transform .2s ease-in-out}:host .date-picker-container .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:14px 0;-webkit-user-select:none;justify-content:space-between;cursor:default;border-bottom:1px solid #f7f7f7}:host .date-picker-container .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .date-picker-container .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .date-picker-container .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}:host .date-picker-container section.calendar-content{display:flex;flex-flow:column}:host .date-picker-container section.calendar-content span{display:block}:host .date-picker-container section.calendar-content.days{flex-flow:row nowrap;height:min-content}:host .date-picker-container .calendar-content{width:100%;height:230px;overflow-y:scroll;position:static;top:0;left:0;transform-origin:209px 26px;transform:scale(1)}:host .date-picker-container .calendar-footer{width:100%;padding:1rem .8rem;text-align:left}:host ::ng-deep .hide-overflow-days .notinmonth{visibility:hidden}:host .calendar.popup{display:none;position:absolute;z-index:9001}:host .calendar.popup.open{display:block}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "component", type: i5.NovoCalendarElement, selector: "novo-calendar", inputs: ["minYear", "maxYear", "minDate", "maxDate", "activeView", "layout", "selected", "preview", "overlays", "disabledDateMessage", "activeDate", "weekStartsOn", "numberOfMonths", "mode"], outputs: ["selectedChange", "previewChange", "activeDateChange"] }], animations: [
        trigger('startDateTextState', [
            state('startDate', style({
                opacity: '1.0',
            })),
            state('endDate', style({
                opacity: '0.6',
            })),
            transition('startDate <=> endDate', animate('200ms ease-in')),
        ]),
        trigger('endDateTextState', [
            state('startDate', style({
                opacity: '0.6',
            })),
            state('endDate', style({
                opacity: '1.0',
            })),
            transition('startDate <=> endDate', animate('200ms ease-in')),
        ]),
        trigger('indicatorState', [
            state('startDate', style({
                transform: 'translateX(0%)',
            })),
            state('endDate', style({
                transform: 'translateX(100%)',
            })),
            transition('startDate <=> endDate', animate('200ms ease-in')),
        ]),
    ] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDatePickerElement.prototype, "inline", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDatePickerElement.prototype, "hideOverflowDays", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDatePickerElement.prototype, "hideFooter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDatePickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-picker', providers: [DATE_PICKER_VALUE_ACCESSOR], animations: [
                        trigger('startDateTextState', [
                            state('startDate', style({
                                opacity: '1.0',
                            })),
                            state('endDate', style({
                                opacity: '0.6',
                            })),
                            transition('startDate <=> endDate', animate('200ms ease-in')),
                        ]),
                        trigger('endDateTextState', [
                            state('startDate', style({
                                opacity: '0.6',
                            })),
                            state('endDate', style({
                                opacity: '1.0',
                            })),
                            transition('startDate <=> endDate', animate('200ms ease-in')),
                        ]),
                        trigger('indicatorState', [
                            state('startDate', style({
                                transform: 'translateX(0%)',
                            })),
                            state('endDate', style({
                                transform: 'translateX(100%)',
                            })),
                            transition('startDate <=> endDate', animate('200ms ease-in')),
                        ]),
                    ], template: `
    <div class="date-picker-container">
      <div class="date-range-tabs" *ngIf="range" [class.week-select-mode]="weekRangeSelect">
        <span
          class="range-tab"
          (click)="toggleRangeSelect('startDate')"
          [@startDateTextState]="rangeSelectMode"
          data-automation-id="calendar-start-date"
          >{{ startDateLabel }}</span
        >
        <span
          class="range-tab"
          (click)="toggleRangeSelect('endDate')"
          [@endDateTextState]="rangeSelectMode"
          data-automation-id="calendar-end-date"
          >{{ endDateLabel }}</span
        >
        <i class="indicator" [@indicatorState]="rangeSelectMode"></i>
      </div>

      <novo-calendar
        [activeDate]="activeDate"
        [(selected)]="selection"
        (selectedChange)="updateSelection($event)"
        [mode]="mode"
        [numberOfMonths]="numberOfMonths"
        [weekStartsOn]="weekStart"
        [disabledDateMessage]="disabledDateMessage"
        [minDate]="start"
        [maxDate]="end"
      ></novo-calendar>

      <div class="calendar-footer" [hidden]="hideFooter">
        <novo-button (click)="setToday()" class="today" size="small" data-automation-id="calendar-today">{{ labels.today }}</novo-button>
      </div>
    </div>
  `, styles: [":host{display:block}:host .date-picker-container{border-radius:4px;width:min-content;text-align:center;background:var(--background-main);color:#3a3a3a;-webkit-user-select:none;user-select:none;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:9001;position:relative}:host .date-picker-container .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host .date-picker-container .calendar-top{display:flex;flex-flow:column;background:#4a89dc;color:#fff;font-size:14px;border-top-right-radius:4px;border-top-left-radius:4px}:host .date-picker-container .calendar-top h1{font-weight:600;font-size:4.2em;color:#fff;margin:0;padding:0}:host .date-picker-container .calendar-top h2{font-weight:300;opacity:1;margin:10px auto;padding:0}:host .date-picker-container .calendar-top h3{font-weight:400;opacity:.4;margin:15px auto;padding:0}:host .date-picker-container .calendar-top h4{background:rgba(0,0,0,.15);font-size:1em;font-weight:300;padding:10px}:host .date-picker-container .date-range-tabs{border-bottom:1px solid #f7f7f7;display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-picker-container .date-range-tabs.week-select-mode>span{cursor:default;color:#3d464d;pointer-events:none;opacity:1!important}:host .date-picker-container .date-range-tabs.week-select-mode .indicator{display:none}:host .date-picker-container .date-range-tabs>span{color:#4a89dc;text-align:center;flex:1;cursor:pointer;font-weight:500;transition:opacity .2s ease-in-out;opacity:.6}:host .date-picker-container .date-range-tabs>span:hover{opacity:1!important}:host .date-picker-container .date-range-tabs .indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:#4a89dc;transition:transform .2s ease-in-out}:host .date-picker-container .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:14px 0;-webkit-user-select:none;justify-content:space-between;cursor:default;border-bottom:1px solid #f7f7f7}:host .date-picker-container .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .date-picker-container .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .date-picker-container .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}:host .date-picker-container section.calendar-content{display:flex;flex-flow:column}:host .date-picker-container section.calendar-content span{display:block}:host .date-picker-container section.calendar-content.days{flex-flow:row nowrap;height:min-content}:host .date-picker-container .calendar-content{width:100%;height:230px;overflow-y:scroll;position:static;top:0;left:0;transform-origin:209px 26px;transform:scale(1)}:host .date-picker-container .calendar-footer{width:100%;padding:1rem .8rem;text-align:left}:host ::ng-deep .hide-overflow-days .notinmonth{visibility:hidden}:host .calendar.popup{display:none;position:absolute;z-index:9001}:host .calendar.popup.open{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.DomSanitizer }]; }, propDecorators: { minYear: [{
                type: Input
            }], maxYear: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], inline: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], preselected: [{
                type: Input
            }], hideOverflowDays: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.hide-overflow-days']
            }], hideFooter: [{
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], numberOfMonths: [{
                type: Input
            }], mode: [{
                type: Input
            }], range: [{
                type: Input
            }], weekRangeSelect: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RhdGUtcGlja2VyL0RhdGVQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELFNBQVM7QUFDVCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDcEQsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQThDLFFBQVEsRUFBRSxPQUFPLEVBQTRDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7QUFFNUosc0RBQXNEO0FBQ3RELE1BQU0sMEJBQTBCLEdBQUc7SUFDakMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQTJGRixNQUFNLE9BQU8scUJBQXFCO0lBK0RoQzs7O1FBR0k7SUFDSixJQUNJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FB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VCxLQUFLLENBQUM7Z0NBQ0osU0FBUyxFQUFFLGtCQUFrQjs2QkFDOUIsQ0FBQyxDQUNIOzRCQUNELFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQzlELENBQUM7cUJBQ0gsWUFDUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NUOzJMQVFELE9BQU87c0JBRE4sS0FBSztnQkFNTixPQUFPO3NCQUROLEtBQUs7Z0JBTU4sS0FBSztzQkFESixLQUFLO2dCQU1OLEdBQUc7c0JBREYsS0FBSztnQkFPTixNQUFNO3NCQUZMLEtBQUs7Z0JBT04sU0FBUztzQkFEUixLQUFLO2dCQU1OLFdBQVc7c0JBRFYsS0FBSztnQkFRQyxnQkFBZ0I7c0JBSHRCLEtBQUs7O3NCQUVMLFdBQVc7dUJBQUMsMEJBQTBCO2dCQU9oQyxVQUFVO3NCQUZoQixLQUFLO2dCQUtOLG1CQUFtQjtzQkFEbEIsS0FBSztnQkFLTixRQUFRO3NCQURQLE1BQU07Z0JBYUgsY0FBYztzQkFEakIsS0FBSztnQkFhRixJQUFJO3NCQURQLEtBQUs7Z0JBYUYsS0FBSztzQkFEUixLQUFLO2dCQWVGLGVBQWU7c0JBRGxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgaXNEYXRlLCBpc1ZhbGlkLCBzdWJEYXlzIH0gZnJvbSAnZGF0ZS1mbnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIERhdGFUYWJsZVJhbmdlTW9kZWwsIERhdGVQaWNrZXJTZWxlY3RNb2RlcywgRGF0ZVV0aWwsIEhlbHBlcnMsIG1vZGVsVHlwZXMsIFJhbmdlTW9kZWwsIHJhbmdlU2VsZWN0TW9kZXMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBEQVRFX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlUGlja2VyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRlLXBpY2tlcicsXG4gIHByb3ZpZGVyczogW0RBVEVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3N0YXJ0RGF0ZVRleHRTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc3RhcnREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcxLjAnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2VuZERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ3N0YXJ0RGF0ZSA8PT4gZW5kRGF0ZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignZW5kRGF0ZVRleHRTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc3RhcnREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6ICcwLjYnLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2VuZERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzEuMCcsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ3N0YXJ0RGF0ZSA8PT4gZW5kRGF0ZScsIGFuaW1hdGUoJzIwMG1zIGVhc2UtaW4nKSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignaW5kaWNhdG9yU3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3N0YXJ0RGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnZW5kRGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignc3RhcnREYXRlIDw9PiBlbmREYXRlJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICBdKSxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1waWNrZXItY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1yYW5nZS10YWJzXCIgKm5nSWY9XCJyYW5nZVwiIFtjbGFzcy53ZWVrLXNlbGVjdC1tb2RlXT1cIndlZWtSYW5nZVNlbGVjdFwiPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwicmFuZ2UtdGFiXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlUmFuZ2VTZWxlY3QoJ3N0YXJ0RGF0ZScpXCJcbiAgICAgICAgICBbQHN0YXJ0RGF0ZVRleHRTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLXN0YXJ0LWRhdGVcIlxuICAgICAgICAgID57eyBzdGFydERhdGVMYWJlbCB9fTwvc3BhblxuICAgICAgICA+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3M9XCJyYW5nZS10YWJcIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVSYW5nZVNlbGVjdCgnZW5kRGF0ZScpXCJcbiAgICAgICAgICBbQGVuZERhdGVUZXh0U3RhdGVdPVwicmFuZ2VTZWxlY3RNb2RlXCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1lbmQtZGF0ZVwiXG4gICAgICAgICAgPnt7IGVuZERhdGVMYWJlbCB9fTwvc3BhblxuICAgICAgICA+XG4gICAgICAgIDxpIGNsYXNzPVwiaW5kaWNhdG9yXCIgW0BpbmRpY2F0b3JTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIj48L2k+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPG5vdm8tY2FsZW5kYXJcbiAgICAgICAgW2FjdGl2ZURhdGVdPVwiYWN0aXZlRGF0ZVwiXG4gICAgICAgIFsoc2VsZWN0ZWQpXT1cInNlbGVjdGlvblwiXG4gICAgICAgIChzZWxlY3RlZENoYW5nZSk9XCJ1cGRhdGVTZWxlY3Rpb24oJGV2ZW50KVwiXG4gICAgICAgIFttb2RlXT1cIm1vZGVcIlxuICAgICAgICBbbnVtYmVyT2ZNb250aHNdPVwibnVtYmVyT2ZNb250aHNcIlxuICAgICAgICBbd2Vla1N0YXJ0c09uXT1cIndlZWtTdGFydFwiXG4gICAgICAgIFtkaXNhYmxlZERhdGVNZXNzYWdlXT1cImRpc2FibGVkRGF0ZU1lc3NhZ2VcIlxuICAgICAgICBbbWluRGF0ZV09XCJzdGFydFwiXG4gICAgICAgIFttYXhEYXRlXT1cImVuZFwiXG4gICAgICA+PC9ub3ZvLWNhbGVuZGFyPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItZm9vdGVyXCIgW2hpZGRlbl09XCJoaWRlRm9vdGVyXCI+XG4gICAgICAgIDxub3ZvLWJ1dHRvbiAoY2xpY2spPVwic2V0VG9kYXkoKVwiIGNsYXNzPVwidG9kYXlcIiBzaXplPVwic21hbGxcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci10b2RheVwiPnt7IGxhYmVscy50b2RheSB9fTwvbm92by1idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vRGF0ZVBpY2tlci5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICAvKipcbiAgICogVGhlIG1pbmltdW0geWVhciB0byBhbGxvdyBzZWxlY3RlZCBpbiB5ZWFyIHNlbGVjdCB2aWV3XG4gICAqKi9cbiAgQElucHV0KClcbiAgbWluWWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG1heGltdW0geWVhciB0byBhbGxvdyBzZWxlY3RlZCBpbiB5ZWFyIHNlbGVjdCB2aWV3XG4gICAqKi9cbiAgQElucHV0KClcbiAgbWF4WWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGNhbiBiZSBzZWxlY3RlZC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBzdGFydDogRGF0ZTtcbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWQuXG4gICAqKi9cbiAgQElucHV0KClcbiAgZW5kOiBEYXRlO1xuICAvKipcbiAgICogKipEZXByZWNhdGVkKiogV2hldGhlciB0aGUgZGF0ZS1waWNrZXIgaXMgdXNlZCBvdXRzaWRlIG9mIGFuIG92ZXJsYXkuXG4gICAqKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGlubGluZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIERheSBvZiB0aGUgd2VlayB0aGUgY2FsZW5kYXIgc2hvdWxkIGRpc3BsYXkgZmlyc3QsIFN1bmRheT0wLi4uU2F0dXJkYXk9NlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHdlZWtTdGFydDogRGF5ID0gMDtcbiAgLyoqXG4gICAqIENlcnRhaW4gZGF0ZXMgdGhhdCBhcmUgYWxyZWFkeSBzZWxlY3RlZC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBwcmVzZWxlY3RlZDogRGF0ZVtdID0gW107XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkYXlzIGZvciB0aGUgcHJldmlvdXMgYW5kIG5leHQgbW9udGggc2hvdWxkIGJlIGhpZGRlbi5cbiAgICoqL1xuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oaWRlLW92ZXJmbG93LWRheXMnKVxuICBwdWJsaWMgaGlkZU92ZXJmbG93RGF5czogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogV2hldGhlciB0aGUgZm9vdGVyIHdoaWNoIGNvbnRhaW5zIGB0b2RheWAgYnV0dG9uIHNob3VsZCBiZSBoaWRkZW4uXG4gICAqKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHB1YmxpYyBoaWRlRm9vdGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZGlzYWJsZWREYXRlTWVzc2FnZTogc3RyaW5nO1xuXG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICBfbW9kZTogRGF0ZVBpY2tlclNlbGVjdE1vZGVzID0gJ3NpbmdsZSc7XG4gIF9yYW5nZTogYm9vbGVhbjtcbiAgX3dlZWtSYW5nZVNlbGVjdDogYm9vbGVhbjtcbiAgX251bWJlck9mTW9udGhzOiBudW1iZXJbXSA9IFswXTtcblxuICAvKipcbiAgICogTnVtYmVyIG9mIG1vbnRocyB0byBkaXNwbGF5IGF0IG9uY2UuXG4gICAqIEBkZWZhdWx0IDFcbiAgICoqL1xuICBASW5wdXQoKVxuICBnZXQgbnVtYmVyT2ZNb250aHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZNb250aHMubGVuZ3RoO1xuICB9XG4gIHNldCBudW1iZXJPZk1vbnRocyh2YWx1ZSkge1xuICAgIHRoaXMuX251bWJlck9mTW9udGhzID0gQXJyYXkuZnJvbShBcnJheShOdW1iZXIodmFsdWUpKS5rZXlzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhvdyB0aGUgZGF0ZSBzZWxlY3Rpb24gc2hvdWxkIHdvcmsuXG4gICAqIEBkZWZhdWx0IHNpbmdsZVxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGdldCBtb2RlKCk6IERhdGVQaWNrZXJTZWxlY3RNb2RlcyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XG4gIH1cbiAgc2V0IG1vZGUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fbW9kZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqICoqZGVwcmVjYXRlZCoqIHBsZWFzZSB1c2UgYG1vZGU9XCJyYW5nZVwiYC5cbiAgICoqL1xuICBASW5wdXQoKVxuICBnZXQgcmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFsncmFuZ2UnLCAnd2VlayddLmluY2x1ZGVzKHRoaXMubW9kZSkgfHwgdGhpcy5fcmFuZ2U7XG4gIH1cbiAgc2V0IHJhbmdlKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKGAncmFuZ2UnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJ21vZGU9XCJyYW5nZVwiJy5gKTtcbiAgICBpZiAodGhpcy5fcmFuZ2UgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9yYW5nZSA9IHZhbHVlO1xuICAgICAgdGhpcy5tb2RlID0gJ3JhbmdlJztcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqICoqZGVwcmVjYXRlZCoqIHBsZWFzZSB1c2UgYG1vZGU9XCJ3ZWVrXCJgLlxuICAgKiovXG4gIEBJbnB1dCgpXG4gIGdldCB3ZWVrUmFuZ2VTZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGUgPT09ICd3ZWVrJyB8fCB0aGlzLl93ZWVrUmFuZ2VTZWxlY3Q7XG4gIH1cbiAgc2V0IHdlZWtSYW5nZVNlbGVjdCh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybihgJ3dlZWtSYW5nZVNlbGVjdCcgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnbW9kZT1cIndlZWtcIicuYCk7XG4gICAgaWYgKHRoaXMuX3dlZWtSYW5nZVNlbGVjdCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3dlZWtSYW5nZVNlbGVjdCA9IHZhbHVlO1xuICAgICAgdGhpcy5tb2RlID0gJ3dlZWsnO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICAvLyBnZXQgaGJfd2lkdGgoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYCR7dGhpcy5udW1iZXJPZk1vbnRocyAqIDIyOH1weGApO1xuICAvLyB9XG5cbiAgbW9kZWw6IG1vZGVsVHlwZXM7XG4gIGFjdGl2ZURhdGU6IERhdGU7XG5cbiAgX3NlbGVjdGlvbjogRGF0ZVtdID0gW107XG4gIHByZXZpZXc6IERhdGVbXSA9IFtdO1xuICBzdGFydERhdGVMYWJlbDogc3RyaW5nO1xuICBlbmREYXRlTGFiZWw6IHN0cmluZztcblxuICByYW5nZVNlbGVjdE1vZGU6IHJhbmdlU2VsZWN0TW9kZXMgPSAnc3RhcnREYXRlJztcbiAgX29uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBfb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGdldCBzZWxlY3Rpb24oKTogRGF0ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xuICB9XG4gIHNldCBzZWxlY3Rpb24odmFsdWUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWx1ZSA/IHZhbHVlLmZpbHRlcihpc0RhdGUpLm1hcCgoZCkgPT4gRGF0ZVV0aWwuc3RhcnRPZkRheShkKSkgOiBbXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIERldGVybWluZSB0aGUgeWVhciBhcnJheVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgLy8gU2V0IGxhYmVsc1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLm1vZGVsVG9TZWxlY3Rpb24odGhpcy5tb2RlbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlbGVjdGlvbiAmJiB0aGlzLnNlbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLnNlbGVjdGlvblswXSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmlldyhkYXRlKSB7XG4gICAgY29uc3QgdmFsdWU6IGFueSA9IGRhdGUgPyBuZXcgRGF0ZShkYXRlKSA6IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5hY3RpdmVEYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICB9XG5cbiAgdXBkYXRlU2VsZWN0aW9uKHNlbGVjdGVkOiBEYXRlW10sIGZpcmVFdmVudHMgPSB0cnVlKSB7XG4gICAgLy8gSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gc2VsZWN0ZWQ7XG5cbiAgICB0aGlzLnN0YXJ0RGF0ZUxhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3Rpb25bMF0sIHtcbiAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgfSk7XG5cbiAgICB0aGlzLmVuZERhdGVMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0aW9uWzFdLCB7XG4gICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgIH0pO1xuXG4gICAgaWYgKGZpcmVFdmVudHMpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpcGxlJzpcbiAgICAgICAgICB0aGlzLmZpcmVTZWxlY3QoKTtcbiAgICAgICAgICAvLyBBbHNvLCB1cGRhdGUgdGhlIG5nTW9kZWxcbiAgICAgICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuc2VsZWN0aW9uO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5maWx0ZXIoQm9vbGVhbikubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmVSYW5nZVNlbGVjdCgpO1xuICAgICAgICAgICAgLy8gQWxzbywgdXBkYXRlIHRoZSBuZ01vZGVsXG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IHtcbiAgICAgICAgICAgICAgc3RhcnREYXRlOiB0aGlzLnNlbGVjdGlvblswXSxcbiAgICAgICAgICAgICAgZW5kRGF0ZTogdGhpcy5zZWxlY3Rpb25bMV0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UobW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc2luZ2xlJzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLmZpcmVTZWxlY3QoKTtcbiAgICAgICAgICAvLyBBbHNvLCB1cGRhdGUgdGhlIG5nTW9kZWxcbiAgICAgICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnNlbGVjdGlvblswXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuc2VsZWN0aW9uWzBdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZXZlbnREYXRhKGRhdGU6IERhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgbW9udGg6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KGRhdGUsIHsgbW9udGg6ICdsb25nJyB9KSxcbiAgICAgIGRheTogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQoZGF0ZSwgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gICAgICBkYXRlLFxuICAgIH07XG4gIH1cblxuICBmaXJlU2VsZWN0KCkge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgIHRoaXMub25TZWxlY3QubmV4dCh0aGlzLnNlbGVjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25TZWxlY3QubmV4dCh0aGlzLmV2ZW50RGF0YSh0aGlzLnNlbGVjdGlvblswXSkpO1xuICAgIH1cbiAgfVxuXG4gIGZpcmVSYW5nZVNlbGVjdCgpIHtcbiAgICAvLyBNYWtlIHN1cmUgdGhlIHN0YXJ0IGRhdGUgaXMgYmVmb3JlIHRoZSBlbmQgZGF0ZVxuICAgIGlmICh0aGlzLnNlbGVjdGlvbi5maWx0ZXIoQm9vbGVhbikubGVuZ3RoID09PSAyKSB7XG4gICAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSB0aGlzLnNlbGVjdGlvbjtcbiAgICAgIHRoaXMub25TZWxlY3QubmV4dCh7XG4gICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5ldmVudERhdGEoc3RhcnQpLFxuICAgICAgICBlbmREYXRlOiB0aGlzLmV2ZW50RGF0YShlbmQpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VG9kYXkoKSB7XG4gICAgY29uc3QgdG1wID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbihBcnJheS5vZih0bXApKTtcbiAgfVxuXG4gIHRvZ2dsZVJhbmdlU2VsZWN0KHJhbmdlOiByYW5nZVNlbGVjdE1vZGVzKTogdm9pZCB7XG4gICAgdGhpcy5yYW5nZVNlbGVjdE1vZGUgPSByYW5nZTtcbiAgICBpZiAocmFuZ2UgPT09ICdzdGFydERhdGUnICYmIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuc2VsZWN0aW9uWzBdKTtcbiAgICB9XG4gICAgaWYgKHJhbmdlID09PSAnZW5kRGF0ZScgJiYgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoID09PSAyKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5zZWxlY3Rpb25bMV0pO1xuICAgIH1cbiAgfVxuXG4gIG1vZGVsVG9TZWxlY3Rpb24obW9kZWw6IG1vZGVsVHlwZXMpIHtcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgY2FzZSAnbXVsdGlwbGUnOlxuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG1vZGVsIGFzIERhdGVbXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyYW5nZSc6XG4gICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgdGhpcy5zZXRSYW5nZVNlbGVjdGlvbigpO1xuICAgICAgY2FzZSAnc2luZ2xlJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gW21vZGVsIGFzIERhdGVdO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBWYWx1ZUFjY2Vzc29yIEZ1bmN0aW9uc1xuICB3cml0ZVZhbHVlKG1vZGVsOiBtb2RlbFR5cGVzKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5tb2RlbCBhcyBEYXRlW107XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGUgPT09ICdyYW5nZScpIHtcbiAgICAgIHRoaXMuc2V0UmFuZ2VTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgaWYgKEhlbHBlcnMuaXNEYXRlKG1vZGVsKSkge1xuICAgICAgdGhpcy51cGRhdGVWaWV3KG1vZGVsKTtcbiAgICAgIHRoaXMubW9kZWxUb1NlbGVjdGlvbihtb2RlbCk7XG4gICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzU3RyaW5nKG1vZGVsKSkge1xuICAgICAgY29uc3QgZGF0ZSA9IERhdGVVdGlsLnBhcnNlKG1vZGVsIGFzIGFueSk7XG4gICAgICBpZiAoaXNWYWxpZChkYXRlKSkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoZGF0ZSk7XG4gICAgICAgIHRoaXMubW9kZWxUb1NlbGVjdGlvbihkYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRSYW5nZVNlbGVjdGlvbigpIHtcbiAgICBpZiAodGhpcy5tb2RlbD8uaGFzT3duUHJvcGVydHkoJ3N0YXJ0RGF0ZScpKSB7XG4gICAgICAgLy8gY29taW5nIGZyb20gc3RhbmRhbG9uZSBkYXRlIHBpY2tlclxuICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLm1vZGVsIGFzIFJhbmdlTW9kZWw7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IFtyYW5nZS5zdGFydERhdGUsIHJhbmdlLmVuZERhdGVdLmZpbHRlcihCb29sZWFuKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZWw/Lmhhc093blByb3BlcnR5KCdtaW4nKSkge1xuICAgICAgIC8vIGNvbWluZyBmcm9tIGRhdGEtdGFibGUgZmlsdGVyIHdoZXJlIG1vZGVsIGVuZCBkYXRlIGlzIHRoZSBiZWdpbm5pbmcgb2YgdGhlIG5leHQgZGF5XG4gICAgICBjb25zdCByYW5nZSA9IHRoaXMubW9kZWwgYXMgRGF0YVRhYmxlUmFuZ2VNb2RlbDtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gW3JhbmdlLm1pbiwgc3ViRGF5cyhyYW5nZS5tYXgsIDEpXS5maWx0ZXIoQm9vbGVhbik7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==