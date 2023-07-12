import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, Input, HostBinding, Output, ViewChild, NgModule } from '@angular/core';
import * as i4$1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { isDate, isValid, subDays } from 'date-fns';
import { DateUtil, Helpers, BooleanInput } from 'novo-elements/utils';
import * as i1 from 'novo-elements/services';
import * as i2 from '@angular/platform-browser';
import * as i3 from 'novo-elements/elements/calendar';
import { NovoCalendarModule } from 'novo-elements/elements/calendar';
import * as i4 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from 'angular2-text-mask';
import { TextMaskModule } from 'angular2-text-mask';
import * as i8 from 'novo-elements/pipes';
import { NovoPipesModule } from 'novo-elements/pipes';
import * as i2$1 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent, NovoOverlayModule } from 'novo-elements/elements/common';
import * as i2$2 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i2$3 from 'novo-elements/elements/chips';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
// Value accessor for the component (supports ngModel)
const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerElement),
    multi: true,
};
class NovoDatePickerElement {
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
        var _a, _b;
        if ((_a = this.model) === null || _a === void 0 ? void 0 : _a.hasOwnProperty('startDate')) {
            // coming from standalone date picker
            const range = this.model;
            this.selection = [range.startDate, range.endDate].filter(Boolean);
        }
        else if ((_b = this.model) === null || _b === void 0 ? void 0 : _b.hasOwnProperty('min')) {
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
NovoDatePickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoDatePickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDatePickerElement, selector: "novo-date-picker", inputs: { minYear: "minYear", maxYear: "maxYear", start: "start", end: "end", inline: "inline", weekStart: "weekStart", preselected: "preselected", hideOverflowDays: "hideOverflowDays", hideFooter: "hideFooter", disabledDateMessage: "disabledDateMessage", numberOfMonths: "numberOfMonths", mode: "mode", range: "range", weekRangeSelect: "weekRangeSelect" }, outputs: { onSelect: "onSelect" }, host: { properties: { "class.hide-overflow-days": "this.hideOverflowDays" } }, providers: [DATE_PICKER_VALUE_ACCESSOR], ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:block}:host .date-picker-container{border-radius:4px;width:-webkit-min-content;width:-moz-min-content;width:min-content;text-align:center;background:var(--background-main);color:#3a3a3a;-webkit-user-select:none;-moz-user-select:none;user-select:none;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:9001;position:relative}:host .date-picker-container .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host .date-picker-container .calendar-top{display:flex;flex-flow:column;background:#4a89dc;color:#fff;font-size:14px;border-top-right-radius:4px;border-top-left-radius:4px}:host .date-picker-container .calendar-top h1{font-weight:600;font-size:4.2em;color:#fff;margin:0;padding:0}:host .date-picker-container .calendar-top h2{font-weight:300;opacity:1;margin:10px auto;padding:0}:host .date-picker-container .calendar-top h3{font-weight:400;opacity:.4;margin:15px auto;padding:0}:host .date-picker-container .calendar-top h4{background:rgba(0,0,0,.15);font-size:1em;font-weight:300;padding:10px}:host .date-picker-container .date-range-tabs{border-bottom:1px solid #f7f7f7;display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-picker-container .date-range-tabs.week-select-mode>span{cursor:default;color:#3d464d;pointer-events:none;opacity:1!important}:host .date-picker-container .date-range-tabs.week-select-mode .indicator{display:none}:host .date-picker-container .date-range-tabs>span{color:#4a89dc;text-align:center;flex:1;cursor:pointer;font-weight:500;transition:opacity .2s ease-in-out;opacity:.6}:host .date-picker-container .date-range-tabs>span:hover{opacity:1!important}:host .date-picker-container .date-range-tabs .indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:#4a89dc;transition:transform .2s ease-in-out}:host .date-picker-container .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:14px 0;-webkit-user-select:none;justify-content:space-between;cursor:default;border-bottom:1px solid #f7f7f7}:host .date-picker-container .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .date-picker-container .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .date-picker-container .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}:host .date-picker-container section.calendar-content{display:flex;flex-flow:column}:host .date-picker-container section.calendar-content span{display:block}:host .date-picker-container section.calendar-content.days{flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host .date-picker-container .calendar-content{width:100%;height:230px;overflow-y:scroll;position:static;top:0;left:0;transform-origin:209px 26px;transform:scale(1)}:host .date-picker-container .calendar-footer{width:100%;padding:1rem .8rem;text-align:left}:host ::ng-deep .hide-overflow-days .notinmonth{visibility:hidden}:host .calendar.popup{display:none;position:absolute;z-index:9001}:host .calendar.popup.open{display:block}\n"], components: [{ type: i3.NovoCalendarElement, selector: "novo-calendar", inputs: ["minYear", "maxYear", "minDate", "maxDate", "activeView", "layout", "selected", "preview", "overlays", "disabledDateMessage", "activeDate", "weekStartsOn", "numberOfMonths", "mode"], outputs: ["selectedChange", "previewChange", "activeDateChange"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerElement, decorators: [{
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
  `, styles: [":host{display:block}:host .date-picker-container{border-radius:4px;width:-webkit-min-content;width:-moz-min-content;width:min-content;text-align:center;background:var(--background-main);color:#3a3a3a;-webkit-user-select:none;-moz-user-select:none;user-select:none;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:9001;position:relative}:host .date-picker-container .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host .date-picker-container .calendar-top{display:flex;flex-flow:column;background:#4a89dc;color:#fff;font-size:14px;border-top-right-radius:4px;border-top-left-radius:4px}:host .date-picker-container .calendar-top h1{font-weight:600;font-size:4.2em;color:#fff;margin:0;padding:0}:host .date-picker-container .calendar-top h2{font-weight:300;opacity:1;margin:10px auto;padding:0}:host .date-picker-container .calendar-top h3{font-weight:400;opacity:.4;margin:15px auto;padding:0}:host .date-picker-container .calendar-top h4{background:rgba(0,0,0,.15);font-size:1em;font-weight:300;padding:10px}:host .date-picker-container .date-range-tabs{border-bottom:1px solid #f7f7f7;display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-picker-container .date-range-tabs.week-select-mode>span{cursor:default;color:#3d464d;pointer-events:none;opacity:1!important}:host .date-picker-container .date-range-tabs.week-select-mode .indicator{display:none}:host .date-picker-container .date-range-tabs>span{color:#4a89dc;text-align:center;flex:1;cursor:pointer;font-weight:500;transition:opacity .2s ease-in-out;opacity:.6}:host .date-picker-container .date-range-tabs>span:hover{opacity:1!important}:host .date-picker-container .date-range-tabs .indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:#4a89dc;transition:transform .2s ease-in-out}:host .date-picker-container .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:14px 0;-webkit-user-select:none;justify-content:space-between;cursor:default;border-bottom:1px solid #f7f7f7}:host .date-picker-container .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .date-picker-container .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .date-picker-container .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}:host .date-picker-container section.calendar-content{display:flex;flex-flow:column}:host .date-picker-container section.calendar-content span{display:block}:host .date-picker-container section.calendar-content.days{flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host .date-picker-container .calendar-content{width:100%;height:230px;overflow-y:scroll;position:static;top:0;left:0;transform-origin:209px 26px;transform:scale(1)}:host .date-picker-container .calendar-footer{width:100%;padding:1rem .8rem;text-align:left}:host ::ng-deep .hide-overflow-days .notinmonth{visibility:hidden}:host .calendar.popup{display:none;position:absolute;z-index:9001}:host .calendar.popup.open{display:block}\n"] }]
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

// NG
// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR$1 = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerInputElement),
    multi: true,
};
class NovoDatePickerInputElement {
    constructor(element, labels, _changeDetectorRef, dateFormatService) {
        this.element = element;
        this.labels = labels;
        this._changeDetectorRef = _changeDetectorRef;
        this.dateFormatService = dateFormatService;
        this.formattedValue = '';
        this.invalidDateErrorMessage = '';
        /** View -> model callback called when value changes */
        this._onChange = () => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
        this.textMaskEnabled = true;
        this.allowInvalidDate = false;
        /**
         * Sets the field as to appear disabled, users will not be able to interact with the text field.
         **/
        this.disabled = false;
        /**
         * Day of the week the calendar should display first, Sunday=0...Saturday=6
         **/
        this.weekStart = 0;
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.changeEvent = new EventEmitter();
        this.placeholder = this.labels.localizedDatePlaceholder();
    }
    ngOnInit() {
        this._initFormatOptions();
    }
    ngOnChanges(changes) {
        if (Object.keys(changes).some((key) => ['format'].includes(key))) {
            this._initFormatOptions();
        }
    }
    _initFormatOptions() {
        this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
        if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
            this.maskOptions = this.maskOptions || {
                mask: this.dateFormatService.getDateMask(),
                pipe: createAutoCorrectedDatePipe((this.format || this.labels.dateFormatString()).toLowerCase()),
                keepCharPositions: false,
                guide: true,
            };
        }
        else {
            this.maskOptions = { mask: false };
        }
        this.setupInvalidDateErrorMessage();
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        if (!this.disabled) {
            this.overlay.openPanel();
        }
    }
    closePanel() {
        this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */ || event.key === "Tab" /* Tab */) && this.panelOpen) {
            this._handleEvent(event, true);
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleInput(event) {
        if (document.activeElement === event.target) {
            this._handleEvent(event, false);
        }
    }
    _handleBlur(event) {
        this.handleInvalidDate();
        this.blurEvent.emit(event);
    }
    _handleFocus(event) {
        this.showInvalidDateError = false;
        this.openPanel();
        this.focusEvent.emit(event);
    }
    _handleEvent(event, blur) {
        const value = event.target.value;
        if (value === '') {
            this.clearValue();
            this.closePanel();
        }
        else {
            this.formatDate(value, blur);
            this.openPanel();
        }
    }
    formatDate(value, blur) {
        try {
            const [dateTimeValue, formatted, isInvalidDate] = this.dateFormatService.parseString(value, false, 'date');
            this.isInvalidDate = isInvalidDate;
            if (!isNaN(dateTimeValue.getUTCDate())) {
                const dt = new Date(dateTimeValue);
                this.dispatchOnChange(dt, blur);
            }
            else {
                this.dispatchOnChange(null, blur);
            }
        }
        catch (err) { }
    }
    writeValue(value) {
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    handleInvalidDate() {
        if (this.isInvalidDate && this.value) {
            this.showInvalidDateError = true;
            this.clearValue();
            this.closePanel();
        }
    }
    setupInvalidDateErrorMessage() {
        let dateFormat = this.labels.dateFormatString();
        if (Helpers.isEmpty(dateFormat)) {
            // Default to mm/dd/yyyy
            dateFormat = 'mm/dd/yyyy';
        }
        else {
            dateFormat = dateFormat.toLowerCase();
        }
        this.invalidDateErrorMessage = `Invalid date field entered. Date format of ${dateFormat} is required.`;
    }
    dispatchOnChange(newValue, blur = false, skip = false) {
        if (newValue !== this.value) {
            this._onChange(newValue);
            this.changeEvent.emit(newValue);
            if (blur) {
                !skip && this.writeValue(newValue);
            }
            else {
                !skip && this._setCalendarValue(newValue);
            }
        }
    }
    _setTriggerValue(value) {
        this._setCalendarValue(value);
        this._setFormValue(value);
        this._changeDetectorRef.markForCheck();
    }
    _setCalendarValue(value) {
        if (value instanceof Date && this.value instanceof Date) {
            let newDate = new Date(value);
            newDate.setHours(0, 0, 0, 0);
            this.value = newDate;
            return;
        }
        this.value = value;
    }
    _setFormValue(value) {
        if (value) {
            const test = this.formatDateValue(value);
            this.formattedValue = test;
        }
        else {
            this.formattedValue = '';
        }
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event && event.date) {
            this.dispatchOnChange(event.date, true);
        }
        this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue() {
        this.formattedValue = '';
        this.dispatchOnChange(null);
    }
    formatDateValue(value) {
        const originalValue = value;
        try {
            if (!value) {
                return '';
            }
            if (this.userDefinedFormat && isValid(value)) {
                return DateUtil.format(value, this.format);
            }
            if (!(value instanceof Date)) {
                value = new Date(value);
            }
            if (!(isNaN(value.valueOf()) && this.allowInvalidDate)) {
                return this.labels.formatDateWithFormat(value, {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                });
            }
            else {
                return originalValue;
            }
        }
        catch (err) {
            return err;
        }
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
}
NovoDatePickerInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i1.DateFormatService }], target: i0.ɵɵFactoryTarget.Component });
NovoDatePickerInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", maskOptions: "maskOptions", format: "format", textMaskEnabled: "textMaskEnabled", allowInvalidDate: "allowInvalidDate", disabled: "disabled", disabledDateMessage: "disabledDateMessage", weekStart: "weekStart" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", changeEvent: "changeEvent" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [DATE_VALUE_ACCESSOR$1], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="formattedValue"
      [textMask]="maskOptions"
      [placeholder]="placeholder"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      #input
      data-automation-id="date-input"
      [disabled]="disabled"
    />
    <span class="error-text" *ngIf="showInvalidDateError">{{ invalidDateErrorMessage }}</span>
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
    <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        (onSelect)="setValueAndClose($event)"
        [disabledDateMessage]="disabledDateMessage"
        [ngModel]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{flex:1;position:relative;display:block!important}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:1px solid #dbdbdb;background:transparent!important;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#3d464d}:host input:focus{border-bottom:1px solid #4a89dc}:host span.error-text{color:#da4453;padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:0;top:0px;font-size:1.2rem}\n"], components: [{ type: i2$1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i4$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.MaskedInputDirective, selector: "[textMask]", inputs: ["textMask"], exportAs: ["textMask"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-picker-input', providers: [DATE_VALUE_ACCESSOR$1], template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="formattedValue"
      [textMask]="maskOptions"
      [placeholder]="placeholder"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      #input
      data-automation-id="date-input"
      [disabled]="disabled"
    />
    <span class="error-text" *ngIf="showInvalidDateError">{{ invalidDateErrorMessage }}</span>
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
    <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        (onSelect)="setValueAndClose($event)"
        [disabledDateMessage]="disabledDateMessage"
        [ngModel]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, styles: [":host{flex:1;position:relative;display:block!important}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:1px solid #dbdbdb;background:transparent!important;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#3d464d}:host input:focus{border-bottom:1px solid #4a89dc}:host span.error-text{color:#da4453;padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:0;top:0px;font-size:1.2rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i1.DateFormatService }]; }, propDecorators: { name: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], maskOptions: [{
                type: Input
            }], format: [{
                type: Input
            }], textMaskEnabled: [{
                type: Input
            }], allowInvalidDate: [{
                type: Input
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }, {
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }] } });

// NG
// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateRangeInputElement),
    multi: true,
};
class NovoDateRangeInputElement {
    constructor(element, labels, cdr, dateFormatService) {
        this.element = element;
        this.labels = labels;
        this.cdr = cdr;
        this.dateFormatService = dateFormatService;
        this.formattedStartDate = '';
        this.formattedEndDate = '';
        this.weekRangeSelect = false;
        this.mode = 'range';
        this.textMaskEnabled = true;
        this.allowInvalidDate = false;
        this.weekStart = 0;
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._value = { startDate: null, endDate: null };
        this._disabled = false;
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
        this.placeholder = this.labels.dateFormatString().toUpperCase() || this.labels.dateFormatPlaceholder;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            this._setFormValue(value);
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngOnInit() {
        this._initFormatOptions();
    }
    ngOnChanges(changes) {
        if (Object.keys(changes).some((key) => ['format'].includes(key))) {
            this._initFormatOptions();
        }
    }
    _initFormatOptions() {
        this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
        if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
            this.maskOptions = this.maskOptions || {
                mask: this.dateFormatService.getDateMask(),
                pipe: createAutoCorrectedDatePipe((this.format || this.labels.dateFormatString()).toLowerCase()),
                keepCharPositions: false,
                guide: true,
            };
        }
        else {
            this.maskOptions = { mask: false };
        }
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        if (!this.disabled) {
            this.overlay.openPanel();
        }
    }
    closePanel() {
        this.overlay && this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */ || event.key === "Tab" /* Tab */) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleBlur(event) {
        this.blurEvent.emit(event);
    }
    _handleFocus(event) {
        this.openPanel();
        this.focusEvent.emit(event);
    }
    formatDate(value) {
        try {
            const [dateTimeValue] = this.dateFormatService.parseString(value, false, 'date');
            return new Date(dateTimeValue);
        }
        catch (err) {
            return null;
        }
    }
    writeValue(value) {
        this.value = value;
        this.cdr.markForCheck();
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    _onStartInputChange(event) {
        this._handleKeydown(event);
        if (document.activeElement === event.target) {
            event.stopPropagation();
            const startDate = this.formatDate(event.target.value);
            if (startDate) {
                this.value = Object.assign(Object.assign({}, this.value), { startDate });
                this.change.emit(this.value);
            }
        }
    }
    _onEndInputChange(event) {
        this._handleKeydown(event);
        if (document.activeElement === event.target) {
            event.stopPropagation();
            const endDate = this.formatDate(event.target.value);
            if (endDate) {
                this.value = Object.assign(Object.assign({}, this.value), { endDate });
                this.change.emit(this.value);
            }
        }
    }
    _setFormValue(value) {
        if (this.value) {
            this.formattedStartDate = this.formatDateValue(this.value.startDate);
            this.formattedEndDate = this.formatDateValue(this.value.endDate);
        }
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event && event.startDate && event.endDate) {
            const startDate = event.startDate.date;
            const endDate = event.endDate.date;
            this.value = { startDate, endDate };
            this.change.emit(this.value);
        }
        this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearStartValue() {
        this.formattedStartDate = '';
        this.value = Object.assign(Object.assign({}, this.value), { startDate: null });
        this.change.emit(this.value);
    }
    clearEndValue() {
        this.formattedEndDate = '';
        this.value = Object.assign(Object.assign({}, this.value), { endDate: null });
        this.change.emit(this.value);
    }
    formatDateValue(value) {
        const originalValue = value;
        try {
            if (!value) {
                return '';
            }
            if (this.userDefinedFormat && isValid(value)) {
                return DateUtil.format(value, this.format);
            }
            if (!(value instanceof Date)) {
                value = new Date(value);
            }
            if (!(isNaN(value.valueOf()) && this.allowInvalidDate)) {
                return this.labels.formatDateWithFormat(value, {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                });
            }
            else {
                return originalValue;
            }
        }
        catch (err) {
            return '';
        }
    }
    get hasStartValue() {
        var _a;
        return !Helpers.isEmpty((_a = this.value) === null || _a === void 0 ? void 0 : _a.startDate);
    }
    get hasEndValue() {
        var _a;
        return !Helpers.isEmpty((_a = this.value) === null || _a === void 0 ? void 0 : _a.endDate);
    }
}
NovoDateRangeInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateRangeInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i1.DateFormatService }], target: i0.ɵɵFactoryTarget.Component });
NovoDateRangeInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDateRangeInputElement, selector: "novo-date-range-input", inputs: { name: "name", start: "start", end: "end", weekRangeSelect: "weekRangeSelect", mode: "mode", placeholder: "placeholder", maskOptions: "maskOptions", format: "format", textMaskEnabled: "textMaskEnabled", allowInvalidDate: "allowInvalidDate", weekStart: "weekStart", value: "value", disabled: "disabled" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div class="date-range-input-container">
      <input
        type="text"
        [name]="name"
        [(ngModel)]="formattedStartDate"
        [textMask]="maskOptions"
        [placeholder]="placeholder"
        (keydown)="_onStartInputChange($event)"
        (input)="_onStartInputChange($event)"
        (focus)="_handleFocus($event)"
        (blur)="_handleBlur($event)"
        #startDate
        data-automation-id="date-range-input-start"
        [disabled]="disabled"
      />
      <novo-icon *ngIf="!hasStartValue" (click)="openPanel()">calendar</novo-icon>
      <novo-icon *ngIf="hasStartValue" (click)="clearStartValue()">x</novo-icon>
    </div>
    <div class="date-range-input-divider">-</div>
    <div class="date-range-input-container">
      <input
        type="text"
        [name]="name"
        [(ngModel)]="formattedEndDate"
        [textMask]="maskOptions"
        [placeholder]="placeholder"
        (keydown)="_onEndInputChange($event)"
        (input)="_onEndInputChange($event)"
        (focus)="_handleFocus($event)"
        (blur)="_handleBlur($event)"
        #endDate
        data-automation-id="date-range-input-end"
        [disabled]="disabled"
      />
      <novo-icon *ngIf="!hasEndValue" (click)="openPanel()">calendar</novo-icon>
      <novo-icon *ngIf="hasEndValue" (click)="clearEndValue()">x</novo-icon>
    </div>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        [mode]="mode"
        range="true"
        inline="true"
        (onSelect)="setValueAndClose($event)"
        [ngModel]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{flex:1;position:relative;display:flex;flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host.disabled{pointer-events:none;opacity:1}:host .date-range-input-container{position:relative;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host .date-range-input-divider{font-weight:800;margin:0 .5em;align-self:center;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host input{font-size:1em;border:none;border-bottom:1px solid var(--border);background:transparent!important;border-radius:0;outline:none;height:2rem;width:9em;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--text-main)}:host input:focus{border-bottom:1px solid #4a89dc}:host novo-icon{position:absolute;right:0;top:0;font-size:1em}:host novo-icon[size=small]{top:calc(50% - .75em);font-size:.5em}\n"], components: [{ type: i2$2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2$1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i4$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.MaskedInputDirective, selector: "[textMask]", inputs: ["textMask"], exportAs: ["textMask"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateRangeInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-range-input', providers: [DATE_VALUE_ACCESSOR], template: `
    <div class="date-range-input-container">
      <input
        type="text"
        [name]="name"
        [(ngModel)]="formattedStartDate"
        [textMask]="maskOptions"
        [placeholder]="placeholder"
        (keydown)="_onStartInputChange($event)"
        (input)="_onStartInputChange($event)"
        (focus)="_handleFocus($event)"
        (blur)="_handleBlur($event)"
        #startDate
        data-automation-id="date-range-input-start"
        [disabled]="disabled"
      />
      <novo-icon *ngIf="!hasStartValue" (click)="openPanel()">calendar</novo-icon>
      <novo-icon *ngIf="hasStartValue" (click)="clearStartValue()">x</novo-icon>
    </div>
    <div class="date-range-input-divider">-</div>
    <div class="date-range-input-container">
      <input
        type="text"
        [name]="name"
        [(ngModel)]="formattedEndDate"
        [textMask]="maskOptions"
        [placeholder]="placeholder"
        (keydown)="_onEndInputChange($event)"
        (input)="_onEndInputChange($event)"
        (focus)="_handleFocus($event)"
        (blur)="_handleBlur($event)"
        #endDate
        data-automation-id="date-range-input-end"
        [disabled]="disabled"
      />
      <novo-icon *ngIf="!hasEndValue" (click)="openPanel()">calendar</novo-icon>
      <novo-icon *ngIf="hasEndValue" (click)="clearEndValue()">x</novo-icon>
    </div>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        [mode]="mode"
        range="true"
        inline="true"
        (onSelect)="setValueAndClose($event)"
        [ngModel]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, styles: [":host{flex:1;position:relative;display:flex;flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host.disabled{pointer-events:none;opacity:1}:host .date-range-input-container{position:relative;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host .date-range-input-divider{font-weight:800;margin:0 .5em;align-self:center;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host input{font-size:1em;border:none;border-bottom:1px solid var(--border);background:transparent!important;border-radius:0;outline:none;height:2rem;width:9em;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--text-main)}:host input:focus{border-bottom:1px solid #4a89dc}:host novo-icon{position:absolute;right:0;top:0;font-size:1em}:host novo-icon[size=small]{top:calc(50% - .75em);font-size:.5em}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i1.DateFormatService }]; }, propDecorators: { name: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], weekRangeSelect: [{
                type: Input
            }], mode: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], maskOptions: [{
                type: Input
            }], format: [{
                type: Input
            }], textMaskEnabled: [{
                type: Input
            }], allowInvalidDate: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }] } });

// NG
// Value accessor for the component (supports ngModel)
const MULTI_DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoMultiDateInputElement),
    multi: true,
};
class NovoMultiDateInputElement {
    constructor(element, labels, cdr, dateFormatService) {
        this.element = element;
        this.labels = labels;
        this.cdr = cdr;
        this.dateFormatService = dateFormatService;
        this.formattedStartDate = '';
        this.formattedEndDate = '';
        this.format = 'shortDate';
        this.allowInvalidDate = false;
        this.weekStart = 0;
        this.chipsCount = 5;
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._value = [];
        this._disabled = false;
        this.notShown = {};
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
        this.placeholder = this.labels.dateFormatString().toUpperCase() || this.labels.dateFormatPlaceholder;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            this._setFormValue(value);
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngOnInit() {
        this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
        // if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
        //   this.maskOptions = this.maskOptions || {
        //     mask: this.dateFormatService.getDateMask(),
        //     pipe: createAutoCorrectedDatePipe(this.format || this.labels.dateFormatString().toLowerCase()),
        //     keepCharPositions: false,
        //     guide: true,
        //   };
        // } else {
        //   this.maskOptions = { mask: false };
        // }
    }
    formatter(value) {
        const [dateTimeValue, formatted] = this.dateFormatService.parseString(value, false, 'date');
        return formatted;
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        if (!this.disabled) {
            this.panelOpen ? this.overlay.closePanel() : this.overlay.openPanel();
        }
    }
    closePanel() {
        this.overlay && this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */ || event.key === "Tab" /* Tab */) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleBlur(event) {
        this.blurEvent.emit(event);
    }
    _handleFocus(event) {
        this.openPanel();
        this.focusEvent.emit(event);
    }
    remove(event, date) {
        const current = new Set(this.value);
        if (current.has(date)) {
            current.delete(date);
        }
        this.value = [...current];
    }
    writeValue(value) {
        this.value = value;
        this.cdr.markForCheck();
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    _setFormValue(value) {
        if (this.value) {
            // this.formattedStartDate = this.formatDateValue(this.value.startDate);
        }
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event = []) {
        if (event) {
            this.value = event;
            this.change.emit(this.value);
        }
        // this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue() {
        this.value = [];
        this.change.emit(this.value);
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
}
NovoMultiDateInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMultiDateInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i1.DateFormatService }], target: i0.ɵɵFactoryTarget.Component });
NovoMultiDateInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoMultiDateInputElement, selector: "novo-multi-date-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", format: "format", allowInvalidDate: "allowInvalidDate", weekStart: "weekStart", chipsCount: "chipsCount", value: "value", disabled: "disabled" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [MULTI_DATE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], ngImport: i0, template: `
    <novo-chip-list>
      <novo-chip *ngFor="let date of value | default: []" (removed)="remove($event, date)">
        {{ date | date: format }}
        <novo-icon novoChipRemove>close</novo-icon>
      </novo-chip>
    </novo-chip-list>
    <!-- <div *ngIf="value.length > chipsCount">
      <ul class="summary">
        <li *ngFor="let type of notShown">+ {{ type.count }} {{ labels.more }} {{ type.type }}</li>
      </ul>
    </div> -->
    <div class="chip-input-container" (click)="_handleFocus($event)">
      <span class="placeholder" *ngIf="!value.length" data-automation-id="multi-date-input">{{ placeholder }}</span>
    </div>
    <novo-icon class="panel-toggle" [class.selected]="panelOpen" (click)="openPanel()">calendar</novo-icon>
    <label class="clear-all" *ngIf="value.length" (click)="clearValue()">{{ labels.clearAll }} <i class="bhi-times"></i></label>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        mode="multiple"
        (onSelect)="setValueAndClose($event)"
        [(ngModel)]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, isInline: true, styles: [".novo-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.novo-chip-list-wrapper input.novo-input-element,.novo-chip-list-wrapper .novo-chip{margin:4px}.novo-chip-list-stacked{flex:1}.novo-chip-list-stacked .novo-chip-list-wrapper{flex-direction:column;align-items:flex-start}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip{width:100%;height:2.8rem}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-remove,.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-trailing-icon{margin-left:auto}.novo-chip-list-stacked .novo-chip-list-wrapper input.novo-chip-input{flex:1 0 auto}novo-field.novo-focused input.novo-chip-input{opacity:1;width:100px;margin:4px;flex:1 0 100px}novo-field:not(.novo-focused) .novo-field-input .novo-chip-list-has-value{margin-right:2rem}novo-field:not(.novo-focused) .novo-field-input .novo-chip-list-has-value input.novo-chip-input{opacity:0;width:0px!important;max-width:0px!important}input.novo-chip-input{width:20px;margin:4px;flex:1 0 20px}chips,:host,novo-chips,entity-chips,novo-entity-chips{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid #afb9c0;transition:all .2s ease-in-out;position:relative;padding:5px 20px 5px 0}chips.with-value,novo-chips.with-value,entity-chips.with-value,novo-entity-chips.with-value{margin-bottom:20px}chips:hover,novo-chips:hover,entity-chips:hover,novo-entity-chips:hover{border-bottom:1px solid #5f6d78}chips.selected,chips.selected:hover,novo-chips.selected,novo-chips.selected:hover,entity-chips.selected,entity-chips.selected:hover,novo-entity-chips.selected,novo-entity-chips.selected:hover{border-bottom:1px solid #4a89dc}chips.selected+i,chips.selected:hover+i,novo-chips.selected+i,novo-chips.selected:hover+i,entity-chips.selected+i,entity-chips.selected:hover+i,novo-entity-chips.selected+i,novo-entity-chips.selected:hover+i{color:#4a89dc}chips.disabled,novo-chips.disabled,entity-chips.disabled,novo-entity-chips.disabled{border-bottom-style:dashed!important}chips .chip-input-container,:host .chip-input-container,novo-chips .chip-input-container,entity-chips .chip-input-container,novo-entity-chips .chip-input-container{flex-grow:4}chips .chip-input-container input,:host .chip-input-container input,novo-chips .chip-input-container input,entity-chips .chip-input-container input,novo-entity-chips .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}chips .chip-input-container input:focus,:host .chip-input-container input:focus,novo-chips .chip-input-container input:focus,entity-chips .chip-input-container input:focus,novo-entity-chips .chip-input-container input:focus{outline:none}chips .novo-chip-container,:host .novo-chip-container,novo-chips .novo-chip-container,entity-chips .novo-chip-container,novo-entity-chips .novo-chip-container{display:flex;flex-flow:row wrap;gap:.4rem}chips novo-picker,:host novo-picker,novo-chips novo-picker,entity-chips novo-picker,novo-entity-chips novo-picker{position:inherit}chips novo-picker>i,:host novo-picker>i,novo-chips novo-picker>i,entity-chips novo-picker>i,novo-entity-chips novo-picker>i{display:none}chips novo-picker div.picker-results-container,:host novo-picker div.picker-results-container,novo-chips novo-picker div.picker-results-container,entity-chips novo-picker div.picker-results-container,novo-entity-chips novo-picker div.picker-results-container{left:0}chips label.clear-all,:host label.clear-all,novo-chips label.clear-all,entity-chips label.clear-all,novo-entity-chips label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:#da4453;cursor:pointer;display:flex;align-items:center}chips label.clear-all i,:host label.clear-all i,novo-chips label.clear-all i,entity-chips label.clear-all i,novo-entity-chips label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}chips i.bhi-search,:host i.bhi-search,novo-chips i.bhi-search,entity-chips i.bhi-search,novo-entity-chips i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:#3d464d}chips,:host,novo-chips,entity-chips,novo-entity-chips{padding:2px 0}chips+i,:host+i,novo-chips+i,entity-chips+i,novo-entity-chips+i{position:absolute;right:0;bottom:7px}chips novo-picker,:host novo-picker,novo-chips novo-picker,entity-chips novo-picker,novo-entity-chips novo-picker{padding-bottom:0}chips novo-picker>input,:host novo-picker>input,novo-chips novo-picker>input,entity-chips novo-picker>input,novo-entity-chips novo-picker>input{border:none;border-bottom:none!important}chips novo-picker>input:disabled,:host novo-picker>input:disabled,novo-chips novo-picker>input:disabled,entity-chips novo-picker>input:disabled,novo-entity-chips novo-picker>input:disabled{border-bottom:none!important}chips.with-value,novo-chips.with-value,entity-chips.with-value,novo-entity-chips.with-value{margin-bottom:0}chips picker-results,:host picker-results,novo-chips picker-results,entity-chips picker-results,novo-entity-chips picker-results{position:absolute;color:#000}chips picker-results novo-list,:host picker-results novo-list,novo-chips picker-results novo-list,entity-chips picker-results novo-list,novo-entity-chips picker-results novo-list{max-height:49vh;overflow:auto}chips picker-results novo-list novo-list-item,:host picker-results novo-list novo-list-item,novo-chips picker-results novo-list novo-list-item,entity-chips picker-results novo-list novo-list-item,novo-entity-chips picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}chips picker-results novo-list novo-list-item>div,:host picker-results novo-list novo-list-item>div,novo-chips picker-results novo-list novo-list-item>div,entity-chips picker-results novo-list novo-list-item>div,novo-entity-chips picker-results novo-list novo-list-item>div{width:100%}chips picker-results novo-list novo-list-item.active,:host picker-results novo-list novo-list-item.active,novo-chips picker-results novo-list novo-list-item.active,entity-chips picker-results novo-list novo-list-item.active,novo-entity-chips picker-results novo-list novo-list-item.active{background-color:#e0ebf9}chips picker-results novo-list novo-list-item:hover,:host picker-results novo-list novo-list-item:hover,novo-chips picker-results novo-list novo-list-item:hover,entity-chips picker-results novo-list novo-list-item:hover,novo-entity-chips picker-results novo-list novo-list-item:hover{background-color:#e0ebf9}chips picker-results novo-list novo-list-item item-content,:host picker-results novo-list novo-list-item item-content,novo-chips picker-results novo-list novo-list-item item-content,entity-chips picker-results novo-list novo-list-item item-content,novo-entity-chips picker-results novo-list novo-list-item item-content{flex-flow:row wrap}chips picker-results novo-list novo-list-item item-content>*,:host picker-results novo-list novo-list-item item-content>*,novo-chips picker-results novo-list novo-list-item item-content>*,entity-chips picker-results novo-list novo-list-item item-content>*,novo-entity-chips picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}chips picker-results .error-results,:host picker-results .error-results,chips picker-results .no-recents,:host picker-results .no-recents,chips picker-results .null-results,:host picker-results .null-results,novo-chips picker-results .error-results,novo-chips picker-results .no-recents,novo-chips picker-results .null-results,entity-chips picker-results .error-results,entity-chips picker-results .no-recents,entity-chips picker-results .null-results,novo-entity-chips picker-results .error-results,novo-entity-chips picker-results .no-recents,novo-entity-chips picker-results .null-results{text-align:center;padding:1em 0 4em}chips picker-results .error-results>i,:host picker-results .error-results>i,chips picker-results .no-recents>i,:host picker-results .no-recents>i,chips picker-results .null-results>i,:host picker-results .null-results>i,novo-chips picker-results .error-results>i,novo-chips picker-results .no-recents>i,novo-chips picker-results .null-results>i,entity-chips picker-results .error-results>i,entity-chips picker-results .no-recents>i,entity-chips picker-results .null-results>i,novo-entity-chips picker-results .error-results>i,novo-entity-chips picker-results .no-recents>i,novo-entity-chips picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}chips picker-results .error-results>h4,:host picker-results .error-results>h4,chips picker-results .error-results>p,:host picker-results .error-results>p,chips picker-results .no-recents>h4,:host picker-results .no-recents>h4,chips picker-results .no-recents>p,:host picker-results .no-recents>p,chips picker-results .null-results>h4,:host picker-results .null-results>h4,chips picker-results .null-results>p,:host picker-results .null-results>p,novo-chips picker-results .error-results>h4,novo-chips picker-results .error-results>p,novo-chips picker-results .no-recents>h4,novo-chips picker-results .no-recents>p,novo-chips picker-results .null-results>h4,novo-chips picker-results .null-results>p,entity-chips picker-results .error-results>h4,entity-chips picker-results .error-results>p,entity-chips picker-results .no-recents>h4,entity-chips picker-results .no-recents>p,entity-chips picker-results .null-results>h4,entity-chips picker-results .null-results>p,novo-entity-chips picker-results .error-results>h4,novo-entity-chips picker-results .error-results>p,novo-entity-chips picker-results .no-recents>h4,novo-entity-chips picker-results .no-recents>p,novo-entity-chips picker-results .null-results>h4,novo-entity-chips picker-results .null-results>p{margin:0;max-width:none;padding:0}chips picker-results .error-results>h4,:host picker-results .error-results>h4,chips picker-results .no-recents>h4,:host picker-results .no-recents>h4,chips picker-results .null-results>h4,:host picker-results .null-results>h4,novo-chips picker-results .error-results>h4,novo-chips picker-results .no-recents>h4,novo-chips picker-results .null-results>h4,entity-chips picker-results .error-results>h4,entity-chips picker-results .no-recents>h4,entity-chips picker-results .null-results>h4,novo-entity-chips picker-results .error-results>h4,novo-entity-chips picker-results .no-recents>h4,novo-entity-chips picker-results .null-results>h4{font-weight:500}chips picker-results section,:host picker-results section,novo-chips picker-results section,entity-chips picker-results section,novo-entity-chips picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}chips .preview-container entity-picker-result,:host .preview-container entity-picker-result,novo-chips .preview-container entity-picker-result,entity-chips .preview-container entity-picker-result,novo-entity-chips .preview-container entity-picker-result{background:#ffffff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}chips .preview-container entity-picker-result .novo-list-item,:host .preview-container entity-picker-result .novo-list-item,novo-chips .preview-container entity-picker-result .novo-list-item,entity-chips .preview-container entity-picker-result .novo-list-item,novo-entity-chips .preview-container entity-picker-result .novo-list-item{flex:0 0}chips .preview-container entity-picker-result .novo-list-item>div,:host .preview-container entity-picker-result .novo-list-item>div,novo-chips .preview-container entity-picker-result .novo-list-item>div,entity-chips .preview-container entity-picker-result .novo-list-item>div,novo-entity-chips .preview-container entity-picker-result .novo-list-item>div{width:100%}chips .preview-container entity-picker-result .novo-list-item .novo-item-content,:host .preview-container entity-picker-result .novo-list-item .novo-item-content,novo-chips .preview-container entity-picker-result .novo-list-item .novo-item-content,entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content,novo-entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}chips .preview-container entity-picker-result .novo-list-item .novo-item-content>*,:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*,novo-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>*,entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>*,novo-entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}chips .preview-container entity-picker-result .novo-list-item .novo-item-content>p,:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p,novo-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>p,entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>p,novo-entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}novo-row-chips{display:flex;flex-flow:column;gap:.8rem}novo-row-chips .novo-row-chips-columns{display:flex;align-items:flex-end;margin-bottom:1em}novo-row-chips .novo-row-chips-columns .column-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1;margin-right:1em}novo-row-chips .novo-row-chips-columns .column-label.text-capitalize{text-transform:capitalize}novo-row-chips .novo-row-chips-columns .column-label.text-uppercase{text-transform:uppercase}novo-row-chips .novo-row-chips-columns .column-label.text-nowrap{white-space:nowrap}novo-row-chips .novo-row-chips-columns .column-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}novo-row-chips .novo-row-chips-columns .column-label.text-size-default{font-size:inherit}novo-row-chips .novo-row-chips-columns .column-label.text-size-body{font-size:1.3rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-xs{font-size:1rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-sm{font-size:1.2rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-md{font-size:1.3rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-lg{font-size:1.6rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-xl{font-size:2rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-2xl{font-size:2.6rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-3xl{font-size:3.2rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-smaller{font-size:.8em}novo-row-chips .novo-row-chips-columns .column-label.text-size-larger{font-size:1.2em}novo-row-chips .novo-row-chips-columns .column-label.text-color-black{color:#000}novo-row-chips .novo-row-chips-columns .column-label.text-color-white{color:#fff}novo-row-chips .novo-row-chips-columns .column-label.text-color-gray{color:#9e9e9e}novo-row-chips .novo-row-chips-columns .column-label.text-color-grey{color:#9e9e9e}novo-row-chips .novo-row-chips-columns .column-label.text-color-offWhite{color:#f7f7f7}novo-row-chips .novo-row-chips-columns .column-label.text-color-bright{color:#f7f7f7}novo-row-chips .novo-row-chips-columns .column-label.text-color-light{color:#dbdbdb}novo-row-chips .novo-row-chips-columns .column-label.text-color-neutral{color:#4f5361}novo-row-chips .novo-row-chips-columns .column-label.text-color-dark{color:#3d464d}novo-row-chips .novo-row-chips-columns .column-label.text-color-orange{color:#ff6900}novo-row-chips .novo-row-chips-columns .column-label.text-color-navigation{color:#202945}novo-row-chips .novo-row-chips-columns .column-label.text-color-skyBlue{color:#009bdf}novo-row-chips .novo-row-chips-columns .column-label.text-color-steel{color:#5b6770}novo-row-chips .novo-row-chips-columns .column-label.text-color-metal{color:#637893}novo-row-chips .novo-row-chips-columns .column-label.text-color-sand{color:#f4f4f4}novo-row-chips .novo-row-chips-columns .column-label.text-color-silver{color:#e2e2e2}novo-row-chips .novo-row-chips-columns .column-label.text-color-stone{color:#bebebe}novo-row-chips .novo-row-chips-columns .column-label.text-color-ash{color:#a0a0a0}novo-row-chips .novo-row-chips-columns .column-label.text-color-slate{color:#707070}novo-row-chips .novo-row-chips-columns .column-label.text-color-onyx{color:#526980}novo-row-chips .novo-row-chips-columns .column-label.text-color-charcoal{color:#282828}novo-row-chips .novo-row-chips-columns .column-label.text-color-moonlight{color:#1a242f}novo-row-chips .novo-row-chips-columns .column-label.text-color-midnight{color:#202945}novo-row-chips .novo-row-chips-columns .column-label.text-color-darkness{color:#161f27}novo-row-chips .novo-row-chips-columns .column-label.text-color-navy{color:#0d2d42}novo-row-chips .novo-row-chips-columns .column-label.text-color-aqua{color:#3bafda}novo-row-chips .novo-row-chips-columns .column-label.text-color-ocean{color:#4a89dc}novo-row-chips .novo-row-chips-columns .column-label.text-color-mint{color:#37bc9b}novo-row-chips .novo-row-chips-columns .column-label.text-color-grass{color:#8cc152}novo-row-chips .novo-row-chips-columns .column-label.text-color-sunflower{color:#f6b042}novo-row-chips .novo-row-chips-columns .column-label.text-color-bittersweet{color:#eb6845}novo-row-chips .novo-row-chips-columns .column-label.text-color-grapefruit{color:#da4453}novo-row-chips .novo-row-chips-columns .column-label.text-color-carnation{color:#d770ad}novo-row-chips .novo-row-chips-columns .column-label.text-color-lavender{color:#967adc}novo-row-chips .novo-row-chips-columns .column-label.text-color-mountain{color:#9678b6}novo-row-chips .novo-row-chips-columns .column-label.text-color-info{color:#4a89dc}novo-row-chips .novo-row-chips-columns .column-label.text-color-positive{color:#4a89dc}novo-row-chips .novo-row-chips-columns .column-label.text-color-success{color:#8cc152}novo-row-chips .novo-row-chips-columns .column-label.text-color-negative{color:#da4453}novo-row-chips .novo-row-chips-columns .column-label.text-color-danger{color:#da4453}novo-row-chips .novo-row-chips-columns .column-label.text-color-error{color:#da4453}novo-row-chips .novo-row-chips-columns .column-label.text-color-warning{color:#f6b042}novo-row-chips .novo-row-chips-columns .column-label.text-color-empty{color:#cccdcc}novo-row-chips .novo-row-chips-columns .column-label.text-color-disabled{color:#bebebe}novo-row-chips .novo-row-chips-columns .column-label.text-color-background{color:#f7f7f7}novo-row-chips .novo-row-chips-columns .column-label.text-color-backgroundDark{color:#e2e2e2}novo-row-chips .novo-row-chips-columns .column-label.text-color-presentation{color:#5b6770}novo-row-chips .novo-row-chips-columns .column-label.text-color-bullhorn{color:#ff6900}novo-row-chips .novo-row-chips-columns .column-label.text-color-pulse{color:#3bafda}novo-row-chips .novo-row-chips-columns .column-label.text-color-company{color:#39d}novo-row-chips .novo-row-chips-columns .column-label.text-color-candidate{color:#4b7}novo-row-chips .novo-row-chips-columns .column-label.text-color-lead{color:#a69}novo-row-chips .novo-row-chips-columns .column-label.text-color-contact{color:#fa4}novo-row-chips .novo-row-chips-columns .column-label.text-color-clientcontact{color:#fa4}novo-row-chips .novo-row-chips-columns .column-label.text-color-opportunity{color:#625}novo-row-chips .novo-row-chips-columns .column-label.text-color-job{color:#b56}novo-row-chips .novo-row-chips-columns .column-label.text-color-joborder{color:#b56}novo-row-chips .novo-row-chips-columns .column-label.text-color-submission{color:#a9adbb}novo-row-chips .novo-row-chips-columns .column-label.text-color-sendout{color:#747884}novo-row-chips .novo-row-chips-columns .column-label.text-color-placement{color:#0b344f}novo-row-chips .novo-row-chips-columns .column-label.text-color-note{color:#747884}novo-row-chips .novo-row-chips-columns .column-label.text-color-contract{color:#454ea0}novo-row-chips .novo-row-chips-columns .column-label.text-color-jobCode{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-earnCode{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-invoiceStatement{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-billableCharge{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-payableCharge{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-user{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-corporateUser{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-distributionList{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-credential{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-person{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.margin-before{margin-top:.4rem}novo-row-chips .novo-row-chips-columns .column-label.margin-after{margin-bottom:.8rem}novo-row-chips .novo-row-chips-columns .column-label.text-length-small{max-width:40ch}novo-row-chips .novo-row-chips-columns .column-label.text-length-medium{max-width:55ch}novo-row-chips .novo-row-chips-columns .column-label.text-length-large{max-width:70ch}novo-row-chips .novo-row-chips-columns .column-label.text-weight-hairline{font-weight:100}novo-row-chips .novo-row-chips-columns .column-label.text-weight-thin{font-weight:200}novo-row-chips .novo-row-chips-columns .column-label.text-weight-light{font-weight:300}novo-row-chips .novo-row-chips-columns .column-label.text-weight-normal{font-weight:400}novo-row-chips .novo-row-chips-columns .column-label.text-weight-medium{font-weight:500}novo-row-chips .novo-row-chips-columns .column-label.text-weight-semibold{font-weight:600}novo-row-chips .novo-row-chips-columns .column-label.text-weight-bold{font-weight:700}novo-row-chips .novo-row-chips-columns .column-label.text-weight-extrabold{font-weight:800}novo-row-chips .novo-row-chips-columns .column-label.text-weight-heavy{font-weight:900}novo-row-chips .novo-row-chips-columns .column-label.text-weight-lighter{font-weight:lighter}novo-row-chips .novo-row-chips-columns .column-label.text-weight-bolder{font-weight:bolder}novo-row-chips .novo-row-chips-columns .column-label:first-of-type{flex:0 0 275px}novo-row-chips .novo-row-chips-columns .column-data{display:flex;align-items:center;background:transparent!important;border:none;border-bottom:1px dashed #85939e;border-radius:0;outline:none;height:2em;width:100%;margin:0 1em 0 0}novo-row-chips .novo-row-chips-columns .column-data.editable{border-bottom:none}novo-row-chips .novo-row-chips-columns .column-data.editable input{background:none;border:none}novo-row-chips .novo-row-chips-columns .column-data:first-of-type{flex:0 0 275px}novo-row-chips .novo-row-chips-columns .column-data span{color:inherit;align-items:flex-start;display:flex;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;line-clamp:2;line-height:1em;max-height:2em;min-height:1em}novo-row-chips .novo-row-chips-columns i.bhi-delete-o{color:#da4453}novo-row-chips .novo-chip.novo-row-chip{padding:0}novo-row-chips .novo-row-chips-empty-message{font-style:italic;color:#9e9e9e}novo-row-chips i{cursor:pointer}:host .chip-input-container{padding-top:10px}:host .chip-input-container .placeholder{color:var(--form-placeholder)}:host .panel-toggle{padding:.2em}:host .panel-toggle i{margin:0}:host .panel-toggle.selected{background:#dbdbdb;border-radius:50%}:host ul.summary{display:inline;list-style:none;color:#868686;padding:0 10px}:host ul.summary li{display:inline;padding:0 3px}:host ul.summary li:after{content:\", \"}:host ul.summary li:last-child:after{content:\" \"}:host chip span{text-transform:capitalize}\n"], components: [{ type: i2$3.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i2$3.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i2$2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2$1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2$3.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "default": i8.DefaultPipe, "date": i6.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMultiDateInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-multi-date-input', providers: [MULTI_DATE_VALUE_ACCESSOR], template: `
    <novo-chip-list>
      <novo-chip *ngFor="let date of value | default: []" (removed)="remove($event, date)">
        {{ date | date: format }}
        <novo-icon novoChipRemove>close</novo-icon>
      </novo-chip>
    </novo-chip-list>
    <!-- <div *ngIf="value.length > chipsCount">
      <ul class="summary">
        <li *ngFor="let type of notShown">+ {{ type.count }} {{ labels.more }} {{ type.type }}</li>
      </ul>
    </div> -->
    <div class="chip-input-container" (click)="_handleFocus($event)">
      <span class="placeholder" *ngIf="!value.length" data-automation-id="multi-date-input">{{ placeholder }}</span>
    </div>
    <novo-icon class="panel-toggle" [class.selected]="panelOpen" (click)="openPanel()">calendar</novo-icon>
    <label class="clear-all" *ngIf="value.length" (click)="clearValue()">{{ labels.clearAll }} <i class="bhi-times"></i></label>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        mode="multiple"
        (onSelect)="setValueAndClose($event)"
        [(ngModel)]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `, styles: [".novo-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.novo-chip-list-wrapper input.novo-input-element,.novo-chip-list-wrapper .novo-chip{margin:4px}.novo-chip-list-stacked{flex:1}.novo-chip-list-stacked .novo-chip-list-wrapper{flex-direction:column;align-items:flex-start}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip{width:100%;height:2.8rem}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-remove,.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-trailing-icon{margin-left:auto}.novo-chip-list-stacked .novo-chip-list-wrapper input.novo-chip-input{flex:1 0 auto}novo-field.novo-focused input.novo-chip-input{opacity:1;width:100px;margin:4px;flex:1 0 100px}novo-field:not(.novo-focused) .novo-field-input .novo-chip-list-has-value{margin-right:2rem}novo-field:not(.novo-focused) .novo-field-input .novo-chip-list-has-value input.novo-chip-input{opacity:0;width:0px!important;max-width:0px!important}input.novo-chip-input{width:20px;margin:4px;flex:1 0 20px}chips,:host,novo-chips,entity-chips,novo-entity-chips{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid #afb9c0;transition:all .2s ease-in-out;position:relative;padding:5px 20px 5px 0}chips.with-value,novo-chips.with-value,entity-chips.with-value,novo-entity-chips.with-value{margin-bottom:20px}chips:hover,novo-chips:hover,entity-chips:hover,novo-entity-chips:hover{border-bottom:1px solid #5f6d78}chips.selected,chips.selected:hover,novo-chips.selected,novo-chips.selected:hover,entity-chips.selected,entity-chips.selected:hover,novo-entity-chips.selected,novo-entity-chips.selected:hover{border-bottom:1px solid #4a89dc}chips.selected+i,chips.selected:hover+i,novo-chips.selected+i,novo-chips.selected:hover+i,entity-chips.selected+i,entity-chips.selected:hover+i,novo-entity-chips.selected+i,novo-entity-chips.selected:hover+i{color:#4a89dc}chips.disabled,novo-chips.disabled,entity-chips.disabled,novo-entity-chips.disabled{border-bottom-style:dashed!important}chips .chip-input-container,:host .chip-input-container,novo-chips .chip-input-container,entity-chips .chip-input-container,novo-entity-chips .chip-input-container{flex-grow:4}chips .chip-input-container input,:host .chip-input-container input,novo-chips .chip-input-container input,entity-chips .chip-input-container input,novo-entity-chips .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}chips .chip-input-container input:focus,:host .chip-input-container input:focus,novo-chips .chip-input-container input:focus,entity-chips .chip-input-container input:focus,novo-entity-chips .chip-input-container input:focus{outline:none}chips .novo-chip-container,:host .novo-chip-container,novo-chips .novo-chip-container,entity-chips .novo-chip-container,novo-entity-chips .novo-chip-container{display:flex;flex-flow:row wrap;gap:.4rem}chips novo-picker,:host novo-picker,novo-chips novo-picker,entity-chips novo-picker,novo-entity-chips novo-picker{position:inherit}chips novo-picker>i,:host novo-picker>i,novo-chips novo-picker>i,entity-chips novo-picker>i,novo-entity-chips novo-picker>i{display:none}chips novo-picker div.picker-results-container,:host novo-picker div.picker-results-container,novo-chips novo-picker div.picker-results-container,entity-chips novo-picker div.picker-results-container,novo-entity-chips novo-picker div.picker-results-container{left:0}chips label.clear-all,:host label.clear-all,novo-chips label.clear-all,entity-chips label.clear-all,novo-entity-chips label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:#da4453;cursor:pointer;display:flex;align-items:center}chips label.clear-all i,:host label.clear-all i,novo-chips label.clear-all i,entity-chips label.clear-all i,novo-entity-chips label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}chips i.bhi-search,:host i.bhi-search,novo-chips i.bhi-search,entity-chips i.bhi-search,novo-entity-chips i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:#3d464d}chips,:host,novo-chips,entity-chips,novo-entity-chips{padding:2px 0}chips+i,:host+i,novo-chips+i,entity-chips+i,novo-entity-chips+i{position:absolute;right:0;bottom:7px}chips novo-picker,:host novo-picker,novo-chips novo-picker,entity-chips novo-picker,novo-entity-chips novo-picker{padding-bottom:0}chips novo-picker>input,:host novo-picker>input,novo-chips novo-picker>input,entity-chips novo-picker>input,novo-entity-chips novo-picker>input{border:none;border-bottom:none!important}chips novo-picker>input:disabled,:host novo-picker>input:disabled,novo-chips novo-picker>input:disabled,entity-chips novo-picker>input:disabled,novo-entity-chips novo-picker>input:disabled{border-bottom:none!important}chips.with-value,novo-chips.with-value,entity-chips.with-value,novo-entity-chips.with-value{margin-bottom:0}chips picker-results,:host picker-results,novo-chips picker-results,entity-chips picker-results,novo-entity-chips picker-results{position:absolute;color:#000}chips picker-results novo-list,:host picker-results novo-list,novo-chips picker-results novo-list,entity-chips picker-results novo-list,novo-entity-chips picker-results novo-list{max-height:49vh;overflow:auto}chips picker-results novo-list novo-list-item,:host picker-results novo-list novo-list-item,novo-chips picker-results novo-list novo-list-item,entity-chips picker-results novo-list novo-list-item,novo-entity-chips picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}chips picker-results novo-list novo-list-item>div,:host picker-results novo-list novo-list-item>div,novo-chips picker-results novo-list novo-list-item>div,entity-chips picker-results novo-list novo-list-item>div,novo-entity-chips picker-results novo-list novo-list-item>div{width:100%}chips picker-results novo-list novo-list-item.active,:host picker-results novo-list novo-list-item.active,novo-chips picker-results novo-list novo-list-item.active,entity-chips picker-results novo-list novo-list-item.active,novo-entity-chips picker-results novo-list novo-list-item.active{background-color:#e0ebf9}chips picker-results novo-list novo-list-item:hover,:host picker-results novo-list novo-list-item:hover,novo-chips picker-results novo-list novo-list-item:hover,entity-chips picker-results novo-list novo-list-item:hover,novo-entity-chips picker-results novo-list novo-list-item:hover{background-color:#e0ebf9}chips picker-results novo-list novo-list-item item-content,:host picker-results novo-list novo-list-item item-content,novo-chips picker-results novo-list novo-list-item item-content,entity-chips picker-results novo-list novo-list-item item-content,novo-entity-chips picker-results novo-list novo-list-item item-content{flex-flow:row wrap}chips picker-results novo-list novo-list-item item-content>*,:host picker-results novo-list novo-list-item item-content>*,novo-chips picker-results novo-list novo-list-item item-content>*,entity-chips picker-results novo-list novo-list-item item-content>*,novo-entity-chips picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}chips picker-results .error-results,:host picker-results .error-results,chips picker-results .no-recents,:host picker-results .no-recents,chips picker-results .null-results,:host picker-results .null-results,novo-chips picker-results .error-results,novo-chips picker-results .no-recents,novo-chips picker-results .null-results,entity-chips picker-results .error-results,entity-chips picker-results .no-recents,entity-chips picker-results .null-results,novo-entity-chips picker-results .error-results,novo-entity-chips picker-results .no-recents,novo-entity-chips picker-results .null-results{text-align:center;padding:1em 0 4em}chips picker-results .error-results>i,:host picker-results .error-results>i,chips picker-results .no-recents>i,:host picker-results .no-recents>i,chips picker-results .null-results>i,:host picker-results .null-results>i,novo-chips picker-results .error-results>i,novo-chips picker-results .no-recents>i,novo-chips picker-results .null-results>i,entity-chips picker-results .error-results>i,entity-chips picker-results .no-recents>i,entity-chips picker-results .null-results>i,novo-entity-chips picker-results .error-results>i,novo-entity-chips picker-results .no-recents>i,novo-entity-chips picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}chips picker-results .error-results>h4,:host picker-results .error-results>h4,chips picker-results .error-results>p,:host picker-results .error-results>p,chips picker-results .no-recents>h4,:host picker-results .no-recents>h4,chips picker-results .no-recents>p,:host picker-results .no-recents>p,chips picker-results .null-results>h4,:host picker-results .null-results>h4,chips picker-results .null-results>p,:host picker-results .null-results>p,novo-chips picker-results .error-results>h4,novo-chips picker-results .error-results>p,novo-chips picker-results .no-recents>h4,novo-chips picker-results .no-recents>p,novo-chips picker-results .null-results>h4,novo-chips picker-results .null-results>p,entity-chips picker-results .error-results>h4,entity-chips picker-results .error-results>p,entity-chips picker-results .no-recents>h4,entity-chips picker-results .no-recents>p,entity-chips picker-results .null-results>h4,entity-chips picker-results .null-results>p,novo-entity-chips picker-results .error-results>h4,novo-entity-chips picker-results .error-results>p,novo-entity-chips picker-results .no-recents>h4,novo-entity-chips picker-results .no-recents>p,novo-entity-chips picker-results .null-results>h4,novo-entity-chips picker-results .null-results>p{margin:0;max-width:none;padding:0}chips picker-results .error-results>h4,:host picker-results .error-results>h4,chips picker-results .no-recents>h4,:host picker-results .no-recents>h4,chips picker-results .null-results>h4,:host picker-results .null-results>h4,novo-chips picker-results .error-results>h4,novo-chips picker-results .no-recents>h4,novo-chips picker-results .null-results>h4,entity-chips picker-results .error-results>h4,entity-chips picker-results .no-recents>h4,entity-chips picker-results .null-results>h4,novo-entity-chips picker-results .error-results>h4,novo-entity-chips picker-results .no-recents>h4,novo-entity-chips picker-results .null-results>h4{font-weight:500}chips picker-results section,:host picker-results section,novo-chips picker-results section,entity-chips picker-results section,novo-entity-chips picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}chips .preview-container entity-picker-result,:host .preview-container entity-picker-result,novo-chips .preview-container entity-picker-result,entity-chips .preview-container entity-picker-result,novo-entity-chips .preview-container entity-picker-result{background:#ffffff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}chips .preview-container entity-picker-result .novo-list-item,:host .preview-container entity-picker-result .novo-list-item,novo-chips .preview-container entity-picker-result .novo-list-item,entity-chips .preview-container entity-picker-result .novo-list-item,novo-entity-chips .preview-container entity-picker-result .novo-list-item{flex:0 0}chips .preview-container entity-picker-result .novo-list-item>div,:host .preview-container entity-picker-result .novo-list-item>div,novo-chips .preview-container entity-picker-result .novo-list-item>div,entity-chips .preview-container entity-picker-result .novo-list-item>div,novo-entity-chips .preview-container entity-picker-result .novo-list-item>div{width:100%}chips .preview-container entity-picker-result .novo-list-item .novo-item-content,:host .preview-container entity-picker-result .novo-list-item .novo-item-content,novo-chips .preview-container entity-picker-result .novo-list-item .novo-item-content,entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content,novo-entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}chips .preview-container entity-picker-result .novo-list-item .novo-item-content>*,:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*,novo-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>*,entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>*,novo-entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}chips .preview-container entity-picker-result .novo-list-item .novo-item-content>p,:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p,novo-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>p,entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>p,novo-entity-chips .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}novo-row-chips{display:flex;flex-flow:column;gap:.8rem}novo-row-chips .novo-row-chips-columns{display:flex;align-items:flex-end;margin-bottom:1em}novo-row-chips .novo-row-chips-columns .column-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1;margin-right:1em}novo-row-chips .novo-row-chips-columns .column-label.text-capitalize{text-transform:capitalize}novo-row-chips .novo-row-chips-columns .column-label.text-uppercase{text-transform:uppercase}novo-row-chips .novo-row-chips-columns .column-label.text-nowrap{white-space:nowrap}novo-row-chips .novo-row-chips-columns .column-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}novo-row-chips .novo-row-chips-columns .column-label.text-size-default{font-size:inherit}novo-row-chips .novo-row-chips-columns .column-label.text-size-body{font-size:1.3rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-xs{font-size:1rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-sm{font-size:1.2rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-md{font-size:1.3rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-lg{font-size:1.6rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-xl{font-size:2rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-2xl{font-size:2.6rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-3xl{font-size:3.2rem}novo-row-chips .novo-row-chips-columns .column-label.text-size-smaller{font-size:.8em}novo-row-chips .novo-row-chips-columns .column-label.text-size-larger{font-size:1.2em}novo-row-chips .novo-row-chips-columns .column-label.text-color-black{color:#000}novo-row-chips .novo-row-chips-columns .column-label.text-color-white{color:#fff}novo-row-chips .novo-row-chips-columns .column-label.text-color-gray{color:#9e9e9e}novo-row-chips .novo-row-chips-columns .column-label.text-color-grey{color:#9e9e9e}novo-row-chips .novo-row-chips-columns .column-label.text-color-offWhite{color:#f7f7f7}novo-row-chips .novo-row-chips-columns .column-label.text-color-bright{color:#f7f7f7}novo-row-chips .novo-row-chips-columns .column-label.text-color-light{color:#dbdbdb}novo-row-chips .novo-row-chips-columns .column-label.text-color-neutral{color:#4f5361}novo-row-chips .novo-row-chips-columns .column-label.text-color-dark{color:#3d464d}novo-row-chips .novo-row-chips-columns .column-label.text-color-orange{color:#ff6900}novo-row-chips .novo-row-chips-columns .column-label.text-color-navigation{color:#202945}novo-row-chips .novo-row-chips-columns .column-label.text-color-skyBlue{color:#009bdf}novo-row-chips .novo-row-chips-columns .column-label.text-color-steel{color:#5b6770}novo-row-chips .novo-row-chips-columns .column-label.text-color-metal{color:#637893}novo-row-chips .novo-row-chips-columns .column-label.text-color-sand{color:#f4f4f4}novo-row-chips .novo-row-chips-columns .column-label.text-color-silver{color:#e2e2e2}novo-row-chips .novo-row-chips-columns .column-label.text-color-stone{color:#bebebe}novo-row-chips .novo-row-chips-columns .column-label.text-color-ash{color:#a0a0a0}novo-row-chips .novo-row-chips-columns .column-label.text-color-slate{color:#707070}novo-row-chips .novo-row-chips-columns .column-label.text-color-onyx{color:#526980}novo-row-chips .novo-row-chips-columns .column-label.text-color-charcoal{color:#282828}novo-row-chips .novo-row-chips-columns .column-label.text-color-moonlight{color:#1a242f}novo-row-chips .novo-row-chips-columns .column-label.text-color-midnight{color:#202945}novo-row-chips .novo-row-chips-columns .column-label.text-color-darkness{color:#161f27}novo-row-chips .novo-row-chips-columns .column-label.text-color-navy{color:#0d2d42}novo-row-chips .novo-row-chips-columns .column-label.text-color-aqua{color:#3bafda}novo-row-chips .novo-row-chips-columns .column-label.text-color-ocean{color:#4a89dc}novo-row-chips .novo-row-chips-columns .column-label.text-color-mint{color:#37bc9b}novo-row-chips .novo-row-chips-columns .column-label.text-color-grass{color:#8cc152}novo-row-chips .novo-row-chips-columns .column-label.text-color-sunflower{color:#f6b042}novo-row-chips .novo-row-chips-columns .column-label.text-color-bittersweet{color:#eb6845}novo-row-chips .novo-row-chips-columns .column-label.text-color-grapefruit{color:#da4453}novo-row-chips .novo-row-chips-columns .column-label.text-color-carnation{color:#d770ad}novo-row-chips .novo-row-chips-columns .column-label.text-color-lavender{color:#967adc}novo-row-chips .novo-row-chips-columns .column-label.text-color-mountain{color:#9678b6}novo-row-chips .novo-row-chips-columns .column-label.text-color-info{color:#4a89dc}novo-row-chips .novo-row-chips-columns .column-label.text-color-positive{color:#4a89dc}novo-row-chips .novo-row-chips-columns .column-label.text-color-success{color:#8cc152}novo-row-chips .novo-row-chips-columns .column-label.text-color-negative{color:#da4453}novo-row-chips .novo-row-chips-columns .column-label.text-color-danger{color:#da4453}novo-row-chips .novo-row-chips-columns .column-label.text-color-error{color:#da4453}novo-row-chips .novo-row-chips-columns .column-label.text-color-warning{color:#f6b042}novo-row-chips .novo-row-chips-columns .column-label.text-color-empty{color:#cccdcc}novo-row-chips .novo-row-chips-columns .column-label.text-color-disabled{color:#bebebe}novo-row-chips .novo-row-chips-columns .column-label.text-color-background{color:#f7f7f7}novo-row-chips .novo-row-chips-columns .column-label.text-color-backgroundDark{color:#e2e2e2}novo-row-chips .novo-row-chips-columns .column-label.text-color-presentation{color:#5b6770}novo-row-chips .novo-row-chips-columns .column-label.text-color-bullhorn{color:#ff6900}novo-row-chips .novo-row-chips-columns .column-label.text-color-pulse{color:#3bafda}novo-row-chips .novo-row-chips-columns .column-label.text-color-company{color:#39d}novo-row-chips .novo-row-chips-columns .column-label.text-color-candidate{color:#4b7}novo-row-chips .novo-row-chips-columns .column-label.text-color-lead{color:#a69}novo-row-chips .novo-row-chips-columns .column-label.text-color-contact{color:#fa4}novo-row-chips .novo-row-chips-columns .column-label.text-color-clientcontact{color:#fa4}novo-row-chips .novo-row-chips-columns .column-label.text-color-opportunity{color:#625}novo-row-chips .novo-row-chips-columns .column-label.text-color-job{color:#b56}novo-row-chips .novo-row-chips-columns .column-label.text-color-joborder{color:#b56}novo-row-chips .novo-row-chips-columns .column-label.text-color-submission{color:#a9adbb}novo-row-chips .novo-row-chips-columns .column-label.text-color-sendout{color:#747884}novo-row-chips .novo-row-chips-columns .column-label.text-color-placement{color:#0b344f}novo-row-chips .novo-row-chips-columns .column-label.text-color-note{color:#747884}novo-row-chips .novo-row-chips-columns .column-label.text-color-contract{color:#454ea0}novo-row-chips .novo-row-chips-columns .column-label.text-color-jobCode{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-earnCode{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-invoiceStatement{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-billableCharge{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-payableCharge{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-user{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-corporateUser{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-distributionList{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-credential{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.text-color-person{color:#696d79}novo-row-chips .novo-row-chips-columns .column-label.margin-before{margin-top:.4rem}novo-row-chips .novo-row-chips-columns .column-label.margin-after{margin-bottom:.8rem}novo-row-chips .novo-row-chips-columns .column-label.text-length-small{max-width:40ch}novo-row-chips .novo-row-chips-columns .column-label.text-length-medium{max-width:55ch}novo-row-chips .novo-row-chips-columns .column-label.text-length-large{max-width:70ch}novo-row-chips .novo-row-chips-columns .column-label.text-weight-hairline{font-weight:100}novo-row-chips .novo-row-chips-columns .column-label.text-weight-thin{font-weight:200}novo-row-chips .novo-row-chips-columns .column-label.text-weight-light{font-weight:300}novo-row-chips .novo-row-chips-columns .column-label.text-weight-normal{font-weight:400}novo-row-chips .novo-row-chips-columns .column-label.text-weight-medium{font-weight:500}novo-row-chips .novo-row-chips-columns .column-label.text-weight-semibold{font-weight:600}novo-row-chips .novo-row-chips-columns .column-label.text-weight-bold{font-weight:700}novo-row-chips .novo-row-chips-columns .column-label.text-weight-extrabold{font-weight:800}novo-row-chips .novo-row-chips-columns .column-label.text-weight-heavy{font-weight:900}novo-row-chips .novo-row-chips-columns .column-label.text-weight-lighter{font-weight:lighter}novo-row-chips .novo-row-chips-columns .column-label.text-weight-bolder{font-weight:bolder}novo-row-chips .novo-row-chips-columns .column-label:first-of-type{flex:0 0 275px}novo-row-chips .novo-row-chips-columns .column-data{display:flex;align-items:center;background:transparent!important;border:none;border-bottom:1px dashed #85939e;border-radius:0;outline:none;height:2em;width:100%;margin:0 1em 0 0}novo-row-chips .novo-row-chips-columns .column-data.editable{border-bottom:none}novo-row-chips .novo-row-chips-columns .column-data.editable input{background:none;border:none}novo-row-chips .novo-row-chips-columns .column-data:first-of-type{flex:0 0 275px}novo-row-chips .novo-row-chips-columns .column-data span{color:inherit;align-items:flex-start;display:flex;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;line-clamp:2;line-height:1em;max-height:2em;min-height:1em}novo-row-chips .novo-row-chips-columns i.bhi-delete-o{color:#da4453}novo-row-chips .novo-chip.novo-row-chip{padding:0}novo-row-chips .novo-row-chips-empty-message{font-style:italic;color:#9e9e9e}novo-row-chips i{cursor:pointer}:host .chip-input-container{padding-top:10px}:host .chip-input-container .placeholder{color:var(--form-placeholder)}:host .panel-toggle{padding:.2em}:host .panel-toggle i{margin:0}:host .panel-toggle.selected{background:#dbdbdb;border-radius:50%}:host ul.summary{display:inline;list-style:none;color:#868686;padding:0 10px}:host ul.summary li{display:inline;padding:0 3px}:host ul.summary li:after{content:\", \"}:host ul.summary li:last-child:after{content:\" \"}:host chip span{text-transform:capitalize}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i1.DateFormatService }]; }, propDecorators: { name: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], format: [{
                type: Input
            }], allowInvalidDate: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], chipsCount: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }] } });

// NG2
class NovoDatePickerModule {
}
NovoDatePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDatePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement], imports: [CommonModule,
        FormsModule,
        NovoButtonModule,
        NovoPipesModule,
        NovoOverlayModule,
        TextMaskModule,
        NovoIconModule,
        NovoChipsModule,
        NovoCalendarModule], exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement] });
NovoDatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, imports: [[
            CommonModule,
            FormsModule,
            NovoButtonModule,
            NovoPipesModule,
            NovoOverlayModule,
            TextMaskModule,
            NovoIconModule,
            NovoChipsModule,
            NovoCalendarModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        NovoButtonModule,
                        NovoPipesModule,
                        NovoOverlayModule,
                        TextMaskModule,
                        NovoIconModule,
                        NovoChipsModule,
                        NovoCalendarModule,
                    ],
                    declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
                    exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoDatePickerElement, NovoDatePickerInputElement, NovoDatePickerModule, NovoDateRangeInputElement, NovoMultiDateInputElement };
//# sourceMappingURL=novo-elements-elements-date-picker.mjs.map
