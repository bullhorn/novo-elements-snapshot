import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, Input, HostBinding, Output, ViewChild, NgModule } from '@angular/core';
import * as i4$1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { isDate, isValid, subDays } from 'date-fns';
import { DateUtil, Helpers, BooleanInput } from 'novo-elements/utils';
import * as i1 from 'novo-elements/services';
import * as i2 from '@angular/platform-browser';
import * as i3 from 'novo-elements/components/calendar';
import { NovoCalendarModule } from 'novo-elements/components/calendar';
import * as i4 from 'novo-elements/components/button';
import { NovoButtonModule } from 'novo-elements/components/button';
import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from 'angular-imask';
import { IMaskDirectiveModule } from 'angular-imask';
import * as i2$1 from 'novo-elements/common/overlay';
import { NovoOverlayTemplateComponent, NovoOverlayModule } from 'novo-elements/common/overlay';
import * as i2$3 from 'novo-elements/components/chips';
import { NovoChipsModule } from 'novo-elements/components/chips';
import * as i2$2 from 'novo-elements/components/icon';
import { NovoIconModule } from 'novo-elements/components/icon';
import * as i8 from 'novo-elements/pipes';
import { NovoPipesModule } from 'novo-elements/pipes';

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
  `, isInline: true, styles: [":host{display:block}:host .hide-overflow-days .notinmonth{visibility:hidden}:host .calendar.popup{display:none;position:absolute}:host .calendar.popup.open{display:block}:host .date-picker-container{border-radius:4px;width:-webkit-min-content;width:-moz-min-content;width:min-content;text-align:center;background:var(--color-background-secondary);color:#3a3a3a;-webkit-user-select:none;-moz-user-select:none;user-select:none;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;position:relative}:host .date-picker-container .month-view+.month-view{border-collapse:unset;border-left:var(--border-main);margin-left:.5rem;padding-left:.5rem}:host .date-picker-container .calendar-top{display:flex;flex-flow:column;background:var(--color-selection);color:#fff;font-size:14px;border-top-right-radius:4px;border-top-left-radius:4px}:host .date-picker-container .calendar-top h1{font-weight:600;font-size:4.2em;color:#fff;margin:0;padding:0}:host .date-picker-container .calendar-top h2{font-weight:300;opacity:1;margin:10px auto;padding:0}:host .date-picker-container .calendar-top h3{font-weight:400;opacity:.4;margin:15px auto;padding:0}:host .date-picker-container .calendar-top h4{background:rgba(0,0,0,.15);font-size:1em;font-weight:300;padding:10px}:host .date-picker-container .date-range-tabs{border-bottom:1px solid var(--color-background-secondary);display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-picker-container .date-range-tabs.week-select-mode>span{cursor:default;color:var(--color-text);pointer-events:none;opacity:1!important}:host .date-picker-container .date-range-tabs.week-select-mode .indicator{display:none}:host .date-picker-container .date-range-tabs>span{color:var(--color-selection);text-align:center;flex:1;cursor:pointer;font-weight:500;transition:opacity .2s ease-in-out;opacity:.6}:host .date-picker-container .date-range-tabs>span:hover{opacity:1!important}:host .date-picker-container .date-range-tabs .indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:var(--color-selection);transition:transform .2s ease-in-out}:host .date-picker-container .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:14px 0;-webkit-user-select:none;justify-content:space-between;cursor:default;border-bottom:1px solid var(--color-background-secondary)}:host .date-picker-container .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .previous:hover:after{border-right:4px solid var(--color-selection);cursor:pointer}:host .date-picker-container .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:var(--color-selection);font-weight:600}:host .date-picker-container .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .month:hover{background:var(--color-selection);color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .year:hover{background:var(--color-selection);color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .next:hover:before{opacity:1;border-left:4px solid var(--color-selection);cursor:pointer}:host .date-picker-container section.calendar-content{display:flex;flex-flow:column}:host .date-picker-container section.calendar-content span{display:block}:host .date-picker-container section.calendar-content.days{flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host .date-picker-container .calendar-content{width:100%;height:230px;overflow-y:scroll;position:static;top:0;left:0;transform-origin:209px 26px;transform:scale(1)}:host .date-picker-container .calendar-footer{width:100%;padding:1rem .8rem;text-align:left}\n"], components: [{ type: i3.NovoCalendarElement, selector: "novo-calendar", inputs: ["minYear", "maxYear", "minDate", "maxDate", "activeView", "layout", "selected", "preview", "overlays", "disabledDateMessage", "activeDate", "weekStartsOn", "numberOfMonths", "mode"], outputs: ["selectedChange", "previewChange", "activeDateChange"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
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
  `, styles: [":host{display:block}:host .hide-overflow-days .notinmonth{visibility:hidden}:host .calendar.popup{display:none;position:absolute}:host .calendar.popup.open{display:block}:host .date-picker-container{border-radius:4px;width:-webkit-min-content;width:-moz-min-content;width:min-content;text-align:center;background:var(--color-background-secondary);color:#3a3a3a;-webkit-user-select:none;-moz-user-select:none;user-select:none;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;position:relative}:host .date-picker-container .month-view+.month-view{border-collapse:unset;border-left:var(--border-main);margin-left:.5rem;padding-left:.5rem}:host .date-picker-container .calendar-top{display:flex;flex-flow:column;background:var(--color-selection);color:#fff;font-size:14px;border-top-right-radius:4px;border-top-left-radius:4px}:host .date-picker-container .calendar-top h1{font-weight:600;font-size:4.2em;color:#fff;margin:0;padding:0}:host .date-picker-container .calendar-top h2{font-weight:300;opacity:1;margin:10px auto;padding:0}:host .date-picker-container .calendar-top h3{font-weight:400;opacity:.4;margin:15px auto;padding:0}:host .date-picker-container .calendar-top h4{background:rgba(0,0,0,.15);font-size:1em;font-weight:300;padding:10px}:host .date-picker-container .date-range-tabs{border-bottom:1px solid var(--color-background-secondary);display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-picker-container .date-range-tabs.week-select-mode>span{cursor:default;color:var(--color-text);pointer-events:none;opacity:1!important}:host .date-picker-container .date-range-tabs.week-select-mode .indicator{display:none}:host .date-picker-container .date-range-tabs>span{color:var(--color-selection);text-align:center;flex:1;cursor:pointer;font-weight:500;transition:opacity .2s ease-in-out;opacity:.6}:host .date-picker-container .date-range-tabs>span:hover{opacity:1!important}:host .date-picker-container .date-range-tabs .indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:var(--color-selection);transition:transform .2s ease-in-out}:host .date-picker-container .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:14px 0;-webkit-user-select:none;justify-content:space-between;cursor:default;border-bottom:1px solid var(--color-background-secondary)}:host .date-picker-container .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .previous:hover:after{border-right:4px solid var(--color-selection);cursor:pointer}:host .date-picker-container .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:var(--color-selection);font-weight:600}:host .date-picker-container .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .month:hover{background:var(--color-selection);color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .date-picker-container .calendar-header .heading .year:hover{background:var(--color-selection);color:#fff;cursor:pointer}:host .date-picker-container .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .date-picker-container .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .date-picker-container .calendar-header .next:hover:before{opacity:1;border-left:4px solid var(--color-selection);cursor:pointer}:host .date-picker-container section.calendar-content{display:flex;flex-flow:column}:host .date-picker-container section.calendar-content span{display:block}:host .date-picker-container section.calendar-content.days{flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host .date-picker-container .calendar-content{width:100%;height:230px;overflow-y:scroll;position:static;top:0;left:0;transform-origin:209px 26px;transform:scale(1)}:host .date-picker-container .calendar-footer{width:100%;padding:1rem .8rem;text-align:left}\n"] }]
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
            this.maskOptions = this.maskOptions || this.dateFormatService.getDateMask(this.format);
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
        var _a;
        try {
            const [dateTimeValue, formatted, isInvalidDate] = this.dateFormatService.parseString(value, false, 'date');
            this.isInvalidDate = isInvalidDate;
            // if we have a full date - set the dateTimeValue
            if (((_a = dateTimeValue === null || dateTimeValue === void 0 ? void 0 : dateTimeValue.getFullYear()) === null || _a === void 0 ? void 0 : _a.toString().length) === 4) {
                const dt = new Date(dateTimeValue);
                this.dispatchOnChange(dt, blur);
                // if we only have a partial date - set the value to null
            }
            else if (isNaN(dateTimeValue === null || dateTimeValue === void 0 ? void 0 : dateTimeValue.getUTCDate())) {
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
      [imask]="maskOptions"
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
  `, isInline: true, styles: [":host{flex:1;position:relative;padding:6px;font-size:14px;line-height:14px;color:var(--color-text);width:-webkit-max-content;width:-moz-max-content;width:max-content;display:block;flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:var(--border-main);background:transparent!important;border-radius:0;outline:none;height:2rem;width:12em;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--color-text)}:host input:focus{border-bottom:1px solid var(--color-selection)}:host span.error-text{color:var(--color-error);padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:.6rem;top:1rem;font-size:1.2rem}\n"], components: [{ type: i2$1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "role", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i4$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.IMaskDirective, selector: "[imask]", inputs: ["imaskElement", "imask", "unmask"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-picker-input', providers: [DATE_VALUE_ACCESSOR$1], template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="formattedValue"
      [imask]="maskOptions"
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
  `, styles: [":host{flex:1;position:relative;padding:6px;font-size:14px;line-height:14px;color:var(--color-text);width:-webkit-max-content;width:-moz-max-content;width:max-content;display:block;flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host.disabled{pointer-events:none;opacity:1}:host input{font-size:1em;border:none;border-bottom:var(--border-main);background:transparent!important;border-radius:0;outline:none;height:2rem;width:12em;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--color-text)}:host input:focus{border-bottom:1px solid var(--color-selection)}:host span.error-text{color:var(--color-error);padding-top:10px;flex:1;display:flex}:host>i.bhi-clock,:host>i.bhi-search,:host>i.bhi-times,:host>i.bhi-calendar{position:absolute;right:.6rem;top:1rem;font-size:1.2rem}\n"] }]
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
            this.maskOptions = this.maskOptions || this.dateFormatService.getDateMask(this.format);
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
            return dateTimeValue ? new Date(dateTimeValue) : null;
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
        [imask]="maskOptions"
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
        [imask]="maskOptions"
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
  `, isInline: true, styles: [":host{flex:1;position:relative;display:flex;flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host.disabled{pointer-events:none;opacity:1}:host .date-range-input-container{position:relative;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host .date-range-input-divider{font-weight:800;margin:0 .5em;align-self:center;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host input{font-size:1em;border:none;border-bottom:var(--border-main);background:transparent!important;border-radius:0;outline:none;height:2rem;width:9em;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--color-text)}:host input:focus{border-bottom:1px solid var(--color-selection)}:host novo-icon{position:absolute;right:0;top:0;font-size:1em}:host novo-icon[size=small]{top:calc(50% - .75em);font-size:.5em}\n"], components: [{ type: i2$2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2$1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "role", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i4$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.IMaskDirective, selector: "[imask]", inputs: ["imaskElement", "imask", "unmask"], outputs: ["accept", "complete"], exportAs: ["imask"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDateRangeInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-range-input', providers: [DATE_VALUE_ACCESSOR], template: `
    <div class="date-range-input-container">
      <input
        type="text"
        [name]="name"
        [(ngModel)]="formattedStartDate"
        [imask]="maskOptions"
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
        [imask]="maskOptions"
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
  `, styles: [":host{flex:1;position:relative;display:flex;flex-flow:row nowrap;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host.disabled{pointer-events:none;opacity:1}:host .date-range-input-container{position:relative;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host .date-range-input-divider{font-weight:800;margin:0 .5em;align-self:center;height:-webkit-min-content;height:-moz-min-content;height:min-content}:host input{font-size:1em;border:none;border-bottom:var(--border-main);background:transparent!important;border-radius:0;outline:none;height:2rem;width:9em;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--color-text)}:host input:focus{border-bottom:1px solid var(--color-selection)}:host novo-icon{position:absolute;right:0;top:0;font-size:1em}:host novo-icon[size=small]{top:calc(50% - .75em);font-size:.5em}\n"] }]
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
  `, isInline: true, styles: [".novo-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.novo-chip{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;background:var(--color-background-muted);box-sizing:border-box;border:1px solid transparent;transition:all .2s ease-in-out;display:inline-flex;align-items:center;cursor:default;gap:1rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-md);min-height:2.4rem;height:1px}.novo-chip.text-capitalize{text-transform:capitalize}.novo-chip.text-uppercase{text-transform:uppercase}.novo-chip.text-nowrap{white-space:nowrap}.novo-chip.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-chip.text-size-default{font-size:inherit}.novo-chip.text-size-body{font-size:var(--font-size-body)}.novo-chip.text-size-xs{font-size:var(--font-size-xs)}.novo-chip.text-size-sm{font-size:var(--font-size-sm)}.novo-chip.text-size-md{font-size:var(--font-size-md)}.novo-chip.text-size-lg{font-size:var(--font-size-lg)}.novo-chip.text-size-xl{font-size:var(--font-size-xl)}.novo-chip.text-size-2xl{font-size:var(--font-size-2xl)}.novo-chip.text-size-3xl{font-size:var(--font-size-3xl)}.novo-chip.text-size-smaller{font-size:.8em}.novo-chip.text-size-larger{font-size:1.2em}.novo-chip.text-color-person{color:var(--color-person)}.novo-chip.text-color-company{color:var(--color-company)}.novo-chip.text-color-candidate{color:var(--color-candidate)}.novo-chip.text-color-lead{color:var(--color-lead)}.novo-chip.text-color-contact{color:var(--color-contact)}.novo-chip.text-color-clientcontact{color:var(--color-clientcontact)}.novo-chip.text-color-opportunity{color:var(--color-opportunity)}.novo-chip.text-color-job{color:var(--color-job)}.novo-chip.text-color-joborder{color:var(--color-joborder)}.novo-chip.text-color-submission{color:var(--color-submission)}.novo-chip.text-color-sendout{color:var(--color-sendout)}.novo-chip.text-color-placement{color:var(--color-placement)}.novo-chip.text-color-note{color:var(--color-note)}.novo-chip.text-color-task{color:var(--color-task)}.novo-chip.text-color-distribution-list{color:var(--color-distribution-list)}.novo-chip.text-color-credential{color:var(--color-credential)}.novo-chip.text-color-user{color:var(--color-user)}.novo-chip.text-color-corporate-user{color:var(--color-corporate-user)}.novo-chip.text-color-contract{color:var(--color-contract)}.novo-chip.text-color-job-code{color:var(--color-job-code)}.novo-chip.text-color-earn-code{color:var(--color-earn-code)}.novo-chip.text-color-billable-charge{color:var(--color-billable-charge)}.novo-chip.text-color-payable-charge{color:var(--color-payable-charge)}.novo-chip.text-color-invoice-statement{color:var(--color-invoice-statement)}.novo-chip.text-color-selection{color:var(--color-selection)}.novo-chip.text-color-positive{color:var(--color-positive)}.novo-chip.text-color-success{color:var(--color-success)}.novo-chip.text-color-warning{color:var(--color-warning)}.novo-chip.text-color-error{color:var(--color-error)}.novo-chip.text-color-info{color:var(--color-info)}.novo-chip.text-color-disabled{color:var(--color-disabled)}.novo-chip.text-color-red{color:var(--palette-red-50)}.novo-chip.text-color-pink{color:var(--palette-pink-50)}.novo-chip.text-color-orange{color:var(--palette-orange-50)}.novo-chip.text-color-yellow{color:var(--palette-yellow-50)}.novo-chip.text-color-green{color:var(--palette-green-50)}.novo-chip.text-color-teal{color:var(--palette-teal-50)}.novo-chip.text-color-blue{color:var(--palette-blue-50)}.novo-chip.text-color-aqua{color:var(--palette-aqua-50)}.novo-chip.text-color-indigo{color:var(--palette-indigo-50)}.novo-chip.text-color-violet{color:var(--palette-violet-50)}.novo-chip.text-color-gray{color:var(--palette-gray-50)}.novo-chip.margin-before{margin-top:.4rem}.novo-chip.margin-after{margin-bottom:.8rem}.novo-chip.text-length-small{max-width:40ch}.novo-chip.text-length-medium{max-width:55ch}.novo-chip.text-length-large{max-width:70ch}.novo-chip.text-weight-hairline{font-weight:100}.novo-chip.text-weight-thin{font-weight:200}.novo-chip.text-weight-light{font-weight:300}.novo-chip.text-weight-normal{font-weight:400}.novo-chip.text-weight-medium{font-weight:500}.novo-chip.text-weight-semibold{font-weight:600}.novo-chip.text-weight-bold{font-weight:700}.novo-chip.text-weight-extrabold{font-weight:800}.novo-chip.text-weight-heavy{font-weight:900}.novo-chip.text-weight-lighter{font-weight:lighter}.novo-chip.text-weight-bolder{font-weight:bolder}.novo-chip.novo-chip-selectable{color:var(--color-selection)}.novo-chip.novo-chip-selectable:after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;background-color:#000;content:\"\";pointer-events:none;transition:opacity .2s ease-in-out}.novo-chip.novo-chip-selectable:focus{outline:none;border:1px solid var(--color-selection)}.novo-chip.novo-chip-selectable:focus:after{opacity:.16}.novo-chip.novo-chip-selectable:hover{border:1px solid var(--color-selection)}.novo-chip.novo-chip-disabled{color:var(--color-text);opacity:.7;pointer-events:none}.novo-chip.novo-chip-disabled:after{opacity:0}.novo-chip.novo-chip-disabled .novo-chip-remove,.novo-chip.novo-chip-disabled .novo-chip-trailing-icon{cursor:default}.novo-chip .novo-chip-avatar::not(novo-icon){width:24px;height:24px}.novo-chip .novo-chip-avatar{margin-right:0rem;margin-left:0rem}.novo-chip .novo-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;-o-object-fit:cover;object-fit:cover}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{margin-left:0rem;margin-right:0}.novo-chip .novo-chip-remove{color:var(--color-empty)}.novo-chip:not(.novo-chip-disabled) .novo-chip-remove:hover{color:var(--color-empty-tint)}.novo-chip.novo-size-xs{font-size:.8rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-xs);min-height:1.6rem;gap:var(--spacing-xs)}.novo-chip.novo-size-xs.novo-chip-with-avatar{padding-left:calc(var(--spacing-xs) / 2)}.novo-chip.novo-size-xs.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-xs) / 2)}.novo-chip.novo-size-xs .novo-text{font-size:inherit}.novo-chip.novo-size-sm{font-size:1rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-sm);min-height:2rem;gap:var(--spacing-sm)}.novo-chip.novo-size-sm.novo-chip-with-avatar{padding-left:calc(var(--spacing-sm) / 2)}.novo-chip.novo-size-sm.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-sm) / 2)}.novo-chip.novo-size-sm .novo-text{font-size:inherit}.novo-chip.novo-size-md{font-size:1.2rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-md);min-height:2.8rem;gap:var(--spacing-md)}.novo-chip.novo-size-md.novo-chip-with-avatar{padding-left:calc(var(--spacing-md) / 2)}.novo-chip.novo-size-md.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-md) / 2)}.novo-chip.novo-size-md .novo-text{font-size:inherit}.novo-chip.novo-size-lg{font-size:1.4rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-lg);min-height:3.2rem;gap:var(--spacing-lg)}.novo-chip.novo-size-lg.novo-chip-with-avatar{padding-left:calc(var(--spacing-lg) / 2)}.novo-chip.novo-size-lg.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-lg) / 2)}.novo-chip.novo-size-lg .novo-text{font-size:inherit}.novo-chip.novo-size-xl{font-size:1.8rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-xl);min-height:3.6rem;gap:var(--spacing-xl)}.novo-chip.novo-size-xl.novo-chip-with-avatar{padding-left:calc(var(--spacing-xl) / 2)}.novo-chip.novo-size-xl.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-xl) / 2)}.novo-chip.novo-size-xl .novo-text{font-size:inherit}.novo-chip.novo-color-person{color:var(--color-person-contrast);background:var(--color-person)}.novo-chip.novo-color-person>*{color:inherit}.novo-chip.novo-accent-person{border:2px solid var(--color-person);color:var(--color-person)}.novo-chip.novo-color-company{color:var(--color-company-contrast);background:var(--color-company)}.novo-chip.novo-color-company>*{color:inherit}.novo-chip.novo-accent-company{border:2px solid var(--color-company);color:var(--color-company)}.novo-chip.novo-color-candidate{color:var(--color-candidate-contrast);background:var(--color-candidate)}.novo-chip.novo-color-candidate>*{color:inherit}.novo-chip.novo-accent-candidate{border:2px solid var(--color-candidate);color:var(--color-candidate)}.novo-chip.novo-color-lead{color:var(--color-lead-contrast);background:var(--color-lead)}.novo-chip.novo-color-lead>*{color:inherit}.novo-chip.novo-accent-lead{border:2px solid var(--color-lead);color:var(--color-lead)}.novo-chip.novo-color-contact{color:var(--color-contact-contrast);background:var(--color-contact)}.novo-chip.novo-color-contact>*{color:inherit}.novo-chip.novo-accent-contact{border:2px solid var(--color-contact);color:var(--color-contact)}.novo-chip.novo-color-clientcontact{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}.novo-chip.novo-color-clientcontact>*{color:inherit}.novo-chip.novo-accent-clientcontact{border:2px solid var(--color-clientcontact);color:var(--color-clientcontact)}.novo-chip.novo-color-opportunity{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}.novo-chip.novo-color-opportunity>*{color:inherit}.novo-chip.novo-accent-opportunity{border:2px solid var(--color-opportunity);color:var(--color-opportunity)}.novo-chip.novo-color-job{color:var(--color-job-contrast);background:var(--color-job)}.novo-chip.novo-color-job>*{color:inherit}.novo-chip.novo-accent-job{border:2px solid var(--color-job);color:var(--color-job)}.novo-chip.novo-color-joborder{color:var(--color-joborder-contrast);background:var(--color-joborder)}.novo-chip.novo-color-joborder>*{color:inherit}.novo-chip.novo-accent-joborder{border:2px solid var(--color-joborder);color:var(--color-joborder)}.novo-chip.novo-color-submission{color:var(--color-submission-contrast);background:var(--color-submission)}.novo-chip.novo-color-submission>*{color:inherit}.novo-chip.novo-accent-submission{border:2px solid var(--color-submission);color:var(--color-submission)}.novo-chip.novo-color-sendout{color:var(--color-sendout-contrast);background:var(--color-sendout)}.novo-chip.novo-color-sendout>*{color:inherit}.novo-chip.novo-accent-sendout{border:2px solid var(--color-sendout);color:var(--color-sendout)}.novo-chip.novo-color-placement{color:var(--color-placement-contrast);background:var(--color-placement)}.novo-chip.novo-color-placement>*{color:inherit}.novo-chip.novo-accent-placement{border:2px solid var(--color-placement);color:var(--color-placement)}.novo-chip.novo-color-note{color:var(--color-note-contrast);background:var(--color-note)}.novo-chip.novo-color-note>*{color:inherit}.novo-chip.novo-accent-note{border:2px solid var(--color-note);color:var(--color-note)}.novo-chip.novo-color-task{color:var(--color-task-contrast);background:var(--color-task)}.novo-chip.novo-color-task>*{color:inherit}.novo-chip.novo-accent-task{border:2px solid var(--color-task);color:var(--color-task)}.novo-chip.novo-color-distribution-list{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}.novo-chip.novo-color-distribution-list>*{color:inherit}.novo-chip.novo-accent-distribution-list{border:2px solid var(--color-distribution-list);color:var(--color-distribution-list)}.novo-chip.novo-color-credential{color:var(--color-credential-contrast);background:var(--color-credential)}.novo-chip.novo-color-credential>*{color:inherit}.novo-chip.novo-accent-credential{border:2px solid var(--color-credential);color:var(--color-credential)}.novo-chip.novo-color-user{color:var(--color-user-contrast);background:var(--color-user)}.novo-chip.novo-color-user>*{color:inherit}.novo-chip.novo-accent-user{border:2px solid var(--color-user);color:var(--color-user)}.novo-chip.novo-color-corporate-user{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}.novo-chip.novo-color-corporate-user>*{color:inherit}.novo-chip.novo-accent-corporate-user{border:2px solid var(--color-corporate-user);color:var(--color-corporate-user)}.novo-chip.novo-color-contract{color:var(--color-contract-contrast);background:var(--color-contract)}.novo-chip.novo-color-contract>*{color:inherit}.novo-chip.novo-accent-contract{border:2px solid var(--color-contract);color:var(--color-contract)}.novo-chip.novo-color-job-code{color:var(--color-job-code-contrast);background:var(--color-job-code)}.novo-chip.novo-color-job-code>*{color:inherit}.novo-chip.novo-accent-job-code{border:2px solid var(--color-job-code);color:var(--color-job-code)}.novo-chip.novo-color-earn-code{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}.novo-chip.novo-color-earn-code>*{color:inherit}.novo-chip.novo-accent-earn-code{border:2px solid var(--color-earn-code);color:var(--color-earn-code)}.novo-chip.novo-color-billable-charge{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}.novo-chip.novo-color-billable-charge>*{color:inherit}.novo-chip.novo-accent-billable-charge{border:2px solid var(--color-billable-charge);color:var(--color-billable-charge)}.novo-chip.novo-color-payable-charge{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}.novo-chip.novo-color-payable-charge>*{color:inherit}.novo-chip.novo-accent-payable-charge{border:2px solid var(--color-payable-charge);color:var(--color-payable-charge)}.novo-chip.novo-color-invoice-statement{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}.novo-chip.novo-color-invoice-statement>*{color:inherit}.novo-chip.novo-accent-invoice-statement{border:2px solid var(--color-invoice-statement);color:var(--color-invoice-statement)}.novo-chip.novo-color-selection{color:var(--color-selection-contrast);background:var(--color-selection)}.novo-chip.novo-color-selection>*{color:inherit}.novo-chip.novo-accent-selection{border:2px solid var(--color-selection);color:var(--color-selection)}.novo-chip.novo-color-positive{color:var(--color-positive-contrast);background:var(--color-positive)}.novo-chip.novo-color-positive>*{color:inherit}.novo-chip.novo-accent-positive{border:2px solid var(--color-positive);color:var(--color-positive)}.novo-chip.novo-color-success{color:var(--color-success-contrast);background:var(--color-success)}.novo-chip.novo-color-success>*{color:inherit}.novo-chip.novo-accent-success{border:2px solid var(--color-success);color:var(--color-success)}.novo-chip.novo-color-warning{color:var(--color-warning-contrast);background:var(--color-warning)}.novo-chip.novo-color-warning>*{color:inherit}.novo-chip.novo-accent-warning{border:2px solid var(--color-warning);color:var(--color-warning)}.novo-chip.novo-color-error{color:var(--color-error-contrast);background:var(--color-error)}.novo-chip.novo-color-error>*{color:inherit}.novo-chip.novo-accent-error{border:2px solid var(--color-error);color:var(--color-error)}.novo-chip.novo-color-info{color:var(--color-info-contrast);background:var(--color-info)}.novo-chip.novo-color-info>*{color:inherit}.novo-chip.novo-accent-info{border:2px solid var(--color-info);color:var(--color-info)}.novo-chip.novo-color-disabled{color:var(--color-disabled-contrast);background:var(--color-disabled)}.novo-chip.novo-color-disabled>*{color:inherit}.novo-chip.novo-accent-disabled{border:2px solid var(--color-disabled);color:var(--color-disabled)}.novo-chip.novo-color-red{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}.novo-chip.novo-color-red>*{color:inherit}.novo-chip.novo-accent-red{border:2px solid var(--palette-red-50);color:var(--palette-red-50)}.novo-chip.novo-color-pink{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}.novo-chip.novo-color-pink>*{color:inherit}.novo-chip.novo-accent-pink{border:2px solid var(--palette-pink-50);color:var(--palette-pink-50)}.novo-chip.novo-color-orange{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}.novo-chip.novo-color-orange>*{color:inherit}.novo-chip.novo-accent-orange{border:2px solid var(--palette-orange-50);color:var(--palette-orange-50)}.novo-chip.novo-color-yellow{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}.novo-chip.novo-color-yellow>*{color:inherit}.novo-chip.novo-accent-yellow{border:2px solid var(--palette-yellow-50);color:var(--palette-yellow-50)}.novo-chip.novo-color-green{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}.novo-chip.novo-color-green>*{color:inherit}.novo-chip.novo-accent-green{border:2px solid var(--palette-green-50);color:var(--palette-green-50)}.novo-chip.novo-color-teal{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}.novo-chip.novo-color-teal>*{color:inherit}.novo-chip.novo-accent-teal{border:2px solid var(--palette-teal-50);color:var(--palette-teal-50)}.novo-chip.novo-color-blue{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}.novo-chip.novo-color-blue>*{color:inherit}.novo-chip.novo-accent-blue{border:2px solid var(--palette-blue-50);color:var(--palette-blue-50)}.novo-chip.novo-color-aqua{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}.novo-chip.novo-color-aqua>*{color:inherit}.novo-chip.novo-accent-aqua{border:2px solid var(--palette-aqua-50);color:var(--palette-aqua-50)}.novo-chip.novo-color-indigo{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}.novo-chip.novo-color-indigo>*{color:inherit}.novo-chip.novo-accent-indigo{border:2px solid var(--palette-indigo-50);color:var(--palette-indigo-50)}.novo-chip.novo-color-violet{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}.novo-chip.novo-color-violet>*{color:inherit}.novo-chip.novo-accent-violet{border:2px solid var(--palette-violet-50);color:var(--palette-violet-50)}.novo-chip.novo-color-gray{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}.novo-chip.novo-color-gray>*{color:inherit}.novo-chip.novo-accent-gray{border:2px solid var(--palette-gray-50);color:var(--palette-gray-50)}:host .chip-input-container{padding-top:10px}:host .chip-input-container .placeholder{color:var(--form-placeholder)}:host .panel-toggle{padding:.2em}:host .panel-toggle i{margin:0}:host .panel-toggle.selected{background:var(--color-selection-overlay);border-radius:50%}:host ul.summary{display:inline;list-style:none;color:#868686;padding:0 10px}:host ul.summary li{display:inline;padding:0 3px}:host ul.summary li:after{content:\", \"}:host ul.summary li:last-child:after{content:\" \"}:host chip span{text-transform:capitalize}\n"], components: [{ type: i2$3.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i2$3.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i2$2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2$1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "role", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }, { type: NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2$3.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "default": i8.DefaultPipe, "date": i6.DatePipe } });
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
  `, styles: [".novo-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.novo-chip{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;background:var(--color-background-muted);box-sizing:border-box;border:1px solid transparent;transition:all .2s ease-in-out;display:inline-flex;align-items:center;cursor:default;gap:1rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-md);min-height:2.4rem;height:1px}.novo-chip.text-capitalize{text-transform:capitalize}.novo-chip.text-uppercase{text-transform:uppercase}.novo-chip.text-nowrap{white-space:nowrap}.novo-chip.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-chip.text-size-default{font-size:inherit}.novo-chip.text-size-body{font-size:var(--font-size-body)}.novo-chip.text-size-xs{font-size:var(--font-size-xs)}.novo-chip.text-size-sm{font-size:var(--font-size-sm)}.novo-chip.text-size-md{font-size:var(--font-size-md)}.novo-chip.text-size-lg{font-size:var(--font-size-lg)}.novo-chip.text-size-xl{font-size:var(--font-size-xl)}.novo-chip.text-size-2xl{font-size:var(--font-size-2xl)}.novo-chip.text-size-3xl{font-size:var(--font-size-3xl)}.novo-chip.text-size-smaller{font-size:.8em}.novo-chip.text-size-larger{font-size:1.2em}.novo-chip.text-color-person{color:var(--color-person)}.novo-chip.text-color-company{color:var(--color-company)}.novo-chip.text-color-candidate{color:var(--color-candidate)}.novo-chip.text-color-lead{color:var(--color-lead)}.novo-chip.text-color-contact{color:var(--color-contact)}.novo-chip.text-color-clientcontact{color:var(--color-clientcontact)}.novo-chip.text-color-opportunity{color:var(--color-opportunity)}.novo-chip.text-color-job{color:var(--color-job)}.novo-chip.text-color-joborder{color:var(--color-joborder)}.novo-chip.text-color-submission{color:var(--color-submission)}.novo-chip.text-color-sendout{color:var(--color-sendout)}.novo-chip.text-color-placement{color:var(--color-placement)}.novo-chip.text-color-note{color:var(--color-note)}.novo-chip.text-color-task{color:var(--color-task)}.novo-chip.text-color-distribution-list{color:var(--color-distribution-list)}.novo-chip.text-color-credential{color:var(--color-credential)}.novo-chip.text-color-user{color:var(--color-user)}.novo-chip.text-color-corporate-user{color:var(--color-corporate-user)}.novo-chip.text-color-contract{color:var(--color-contract)}.novo-chip.text-color-job-code{color:var(--color-job-code)}.novo-chip.text-color-earn-code{color:var(--color-earn-code)}.novo-chip.text-color-billable-charge{color:var(--color-billable-charge)}.novo-chip.text-color-payable-charge{color:var(--color-payable-charge)}.novo-chip.text-color-invoice-statement{color:var(--color-invoice-statement)}.novo-chip.text-color-selection{color:var(--color-selection)}.novo-chip.text-color-positive{color:var(--color-positive)}.novo-chip.text-color-success{color:var(--color-success)}.novo-chip.text-color-warning{color:var(--color-warning)}.novo-chip.text-color-error{color:var(--color-error)}.novo-chip.text-color-info{color:var(--color-info)}.novo-chip.text-color-disabled{color:var(--color-disabled)}.novo-chip.text-color-red{color:var(--palette-red-50)}.novo-chip.text-color-pink{color:var(--palette-pink-50)}.novo-chip.text-color-orange{color:var(--palette-orange-50)}.novo-chip.text-color-yellow{color:var(--palette-yellow-50)}.novo-chip.text-color-green{color:var(--palette-green-50)}.novo-chip.text-color-teal{color:var(--palette-teal-50)}.novo-chip.text-color-blue{color:var(--palette-blue-50)}.novo-chip.text-color-aqua{color:var(--palette-aqua-50)}.novo-chip.text-color-indigo{color:var(--palette-indigo-50)}.novo-chip.text-color-violet{color:var(--palette-violet-50)}.novo-chip.text-color-gray{color:var(--palette-gray-50)}.novo-chip.margin-before{margin-top:.4rem}.novo-chip.margin-after{margin-bottom:.8rem}.novo-chip.text-length-small{max-width:40ch}.novo-chip.text-length-medium{max-width:55ch}.novo-chip.text-length-large{max-width:70ch}.novo-chip.text-weight-hairline{font-weight:100}.novo-chip.text-weight-thin{font-weight:200}.novo-chip.text-weight-light{font-weight:300}.novo-chip.text-weight-normal{font-weight:400}.novo-chip.text-weight-medium{font-weight:500}.novo-chip.text-weight-semibold{font-weight:600}.novo-chip.text-weight-bold{font-weight:700}.novo-chip.text-weight-extrabold{font-weight:800}.novo-chip.text-weight-heavy{font-weight:900}.novo-chip.text-weight-lighter{font-weight:lighter}.novo-chip.text-weight-bolder{font-weight:bolder}.novo-chip.novo-chip-selectable{color:var(--color-selection)}.novo-chip.novo-chip-selectable:after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;background-color:#000;content:\"\";pointer-events:none;transition:opacity .2s ease-in-out}.novo-chip.novo-chip-selectable:focus{outline:none;border:1px solid var(--color-selection)}.novo-chip.novo-chip-selectable:focus:after{opacity:.16}.novo-chip.novo-chip-selectable:hover{border:1px solid var(--color-selection)}.novo-chip.novo-chip-disabled{color:var(--color-text);opacity:.7;pointer-events:none}.novo-chip.novo-chip-disabled:after{opacity:0}.novo-chip.novo-chip-disabled .novo-chip-remove,.novo-chip.novo-chip-disabled .novo-chip-trailing-icon{cursor:default}.novo-chip .novo-chip-avatar::not(novo-icon){width:24px;height:24px}.novo-chip .novo-chip-avatar{margin-right:0rem;margin-left:0rem}.novo-chip .novo-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;-o-object-fit:cover;object-fit:cover}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{margin-left:0rem;margin-right:0}.novo-chip .novo-chip-remove{color:var(--color-empty)}.novo-chip:not(.novo-chip-disabled) .novo-chip-remove:hover{color:var(--color-empty-tint)}.novo-chip.novo-size-xs{font-size:.8rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-xs);min-height:1.6rem;gap:var(--spacing-xs)}.novo-chip.novo-size-xs.novo-chip-with-avatar{padding-left:calc(var(--spacing-xs) / 2)}.novo-chip.novo-size-xs.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-xs) / 2)}.novo-chip.novo-size-xs .novo-text{font-size:inherit}.novo-chip.novo-size-sm{font-size:1rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-sm);min-height:2rem;gap:var(--spacing-sm)}.novo-chip.novo-size-sm.novo-chip-with-avatar{padding-left:calc(var(--spacing-sm) / 2)}.novo-chip.novo-size-sm.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-sm) / 2)}.novo-chip.novo-size-sm .novo-text{font-size:inherit}.novo-chip.novo-size-md{font-size:1.2rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-md);min-height:2.8rem;gap:var(--spacing-md)}.novo-chip.novo-size-md.novo-chip-with-avatar{padding-left:calc(var(--spacing-md) / 2)}.novo-chip.novo-size-md.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-md) / 2)}.novo-chip.novo-size-md .novo-text{font-size:inherit}.novo-chip.novo-size-lg{font-size:1.4rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-lg);min-height:3.2rem;gap:var(--spacing-lg)}.novo-chip.novo-size-lg.novo-chip-with-avatar{padding-left:calc(var(--spacing-lg) / 2)}.novo-chip.novo-size-lg.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-lg) / 2)}.novo-chip.novo-size-lg .novo-text{font-size:inherit}.novo-chip.novo-size-xl{font-size:1.8rem;border-radius:.4rem;padding:var(--spacing-none) var(--spacing-xl);min-height:3.6rem;gap:var(--spacing-xl)}.novo-chip.novo-size-xl.novo-chip-with-avatar{padding-left:calc(var(--spacing-xl) / 2)}.novo-chip.novo-size-xl.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-xl) / 2)}.novo-chip.novo-size-xl .novo-text{font-size:inherit}.novo-chip.novo-color-person{color:var(--color-person-contrast);background:var(--color-person)}.novo-chip.novo-color-person>*{color:inherit}.novo-chip.novo-accent-person{border:2px solid var(--color-person);color:var(--color-person)}.novo-chip.novo-color-company{color:var(--color-company-contrast);background:var(--color-company)}.novo-chip.novo-color-company>*{color:inherit}.novo-chip.novo-accent-company{border:2px solid var(--color-company);color:var(--color-company)}.novo-chip.novo-color-candidate{color:var(--color-candidate-contrast);background:var(--color-candidate)}.novo-chip.novo-color-candidate>*{color:inherit}.novo-chip.novo-accent-candidate{border:2px solid var(--color-candidate);color:var(--color-candidate)}.novo-chip.novo-color-lead{color:var(--color-lead-contrast);background:var(--color-lead)}.novo-chip.novo-color-lead>*{color:inherit}.novo-chip.novo-accent-lead{border:2px solid var(--color-lead);color:var(--color-lead)}.novo-chip.novo-color-contact{color:var(--color-contact-contrast);background:var(--color-contact)}.novo-chip.novo-color-contact>*{color:inherit}.novo-chip.novo-accent-contact{border:2px solid var(--color-contact);color:var(--color-contact)}.novo-chip.novo-color-clientcontact{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}.novo-chip.novo-color-clientcontact>*{color:inherit}.novo-chip.novo-accent-clientcontact{border:2px solid var(--color-clientcontact);color:var(--color-clientcontact)}.novo-chip.novo-color-opportunity{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}.novo-chip.novo-color-opportunity>*{color:inherit}.novo-chip.novo-accent-opportunity{border:2px solid var(--color-opportunity);color:var(--color-opportunity)}.novo-chip.novo-color-job{color:var(--color-job-contrast);background:var(--color-job)}.novo-chip.novo-color-job>*{color:inherit}.novo-chip.novo-accent-job{border:2px solid var(--color-job);color:var(--color-job)}.novo-chip.novo-color-joborder{color:var(--color-joborder-contrast);background:var(--color-joborder)}.novo-chip.novo-color-joborder>*{color:inherit}.novo-chip.novo-accent-joborder{border:2px solid var(--color-joborder);color:var(--color-joborder)}.novo-chip.novo-color-submission{color:var(--color-submission-contrast);background:var(--color-submission)}.novo-chip.novo-color-submission>*{color:inherit}.novo-chip.novo-accent-submission{border:2px solid var(--color-submission);color:var(--color-submission)}.novo-chip.novo-color-sendout{color:var(--color-sendout-contrast);background:var(--color-sendout)}.novo-chip.novo-color-sendout>*{color:inherit}.novo-chip.novo-accent-sendout{border:2px solid var(--color-sendout);color:var(--color-sendout)}.novo-chip.novo-color-placement{color:var(--color-placement-contrast);background:var(--color-placement)}.novo-chip.novo-color-placement>*{color:inherit}.novo-chip.novo-accent-placement{border:2px solid var(--color-placement);color:var(--color-placement)}.novo-chip.novo-color-note{color:var(--color-note-contrast);background:var(--color-note)}.novo-chip.novo-color-note>*{color:inherit}.novo-chip.novo-accent-note{border:2px solid var(--color-note);color:var(--color-note)}.novo-chip.novo-color-task{color:var(--color-task-contrast);background:var(--color-task)}.novo-chip.novo-color-task>*{color:inherit}.novo-chip.novo-accent-task{border:2px solid var(--color-task);color:var(--color-task)}.novo-chip.novo-color-distribution-list{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}.novo-chip.novo-color-distribution-list>*{color:inherit}.novo-chip.novo-accent-distribution-list{border:2px solid var(--color-distribution-list);color:var(--color-distribution-list)}.novo-chip.novo-color-credential{color:var(--color-credential-contrast);background:var(--color-credential)}.novo-chip.novo-color-credential>*{color:inherit}.novo-chip.novo-accent-credential{border:2px solid var(--color-credential);color:var(--color-credential)}.novo-chip.novo-color-user{color:var(--color-user-contrast);background:var(--color-user)}.novo-chip.novo-color-user>*{color:inherit}.novo-chip.novo-accent-user{border:2px solid var(--color-user);color:var(--color-user)}.novo-chip.novo-color-corporate-user{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}.novo-chip.novo-color-corporate-user>*{color:inherit}.novo-chip.novo-accent-corporate-user{border:2px solid var(--color-corporate-user);color:var(--color-corporate-user)}.novo-chip.novo-color-contract{color:var(--color-contract-contrast);background:var(--color-contract)}.novo-chip.novo-color-contract>*{color:inherit}.novo-chip.novo-accent-contract{border:2px solid var(--color-contract);color:var(--color-contract)}.novo-chip.novo-color-job-code{color:var(--color-job-code-contrast);background:var(--color-job-code)}.novo-chip.novo-color-job-code>*{color:inherit}.novo-chip.novo-accent-job-code{border:2px solid var(--color-job-code);color:var(--color-job-code)}.novo-chip.novo-color-earn-code{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}.novo-chip.novo-color-earn-code>*{color:inherit}.novo-chip.novo-accent-earn-code{border:2px solid var(--color-earn-code);color:var(--color-earn-code)}.novo-chip.novo-color-billable-charge{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}.novo-chip.novo-color-billable-charge>*{color:inherit}.novo-chip.novo-accent-billable-charge{border:2px solid var(--color-billable-charge);color:var(--color-billable-charge)}.novo-chip.novo-color-payable-charge{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}.novo-chip.novo-color-payable-charge>*{color:inherit}.novo-chip.novo-accent-payable-charge{border:2px solid var(--color-payable-charge);color:var(--color-payable-charge)}.novo-chip.novo-color-invoice-statement{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}.novo-chip.novo-color-invoice-statement>*{color:inherit}.novo-chip.novo-accent-invoice-statement{border:2px solid var(--color-invoice-statement);color:var(--color-invoice-statement)}.novo-chip.novo-color-selection{color:var(--color-selection-contrast);background:var(--color-selection)}.novo-chip.novo-color-selection>*{color:inherit}.novo-chip.novo-accent-selection{border:2px solid var(--color-selection);color:var(--color-selection)}.novo-chip.novo-color-positive{color:var(--color-positive-contrast);background:var(--color-positive)}.novo-chip.novo-color-positive>*{color:inherit}.novo-chip.novo-accent-positive{border:2px solid var(--color-positive);color:var(--color-positive)}.novo-chip.novo-color-success{color:var(--color-success-contrast);background:var(--color-success)}.novo-chip.novo-color-success>*{color:inherit}.novo-chip.novo-accent-success{border:2px solid var(--color-success);color:var(--color-success)}.novo-chip.novo-color-warning{color:var(--color-warning-contrast);background:var(--color-warning)}.novo-chip.novo-color-warning>*{color:inherit}.novo-chip.novo-accent-warning{border:2px solid var(--color-warning);color:var(--color-warning)}.novo-chip.novo-color-error{color:var(--color-error-contrast);background:var(--color-error)}.novo-chip.novo-color-error>*{color:inherit}.novo-chip.novo-accent-error{border:2px solid var(--color-error);color:var(--color-error)}.novo-chip.novo-color-info{color:var(--color-info-contrast);background:var(--color-info)}.novo-chip.novo-color-info>*{color:inherit}.novo-chip.novo-accent-info{border:2px solid var(--color-info);color:var(--color-info)}.novo-chip.novo-color-disabled{color:var(--color-disabled-contrast);background:var(--color-disabled)}.novo-chip.novo-color-disabled>*{color:inherit}.novo-chip.novo-accent-disabled{border:2px solid var(--color-disabled);color:var(--color-disabled)}.novo-chip.novo-color-red{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}.novo-chip.novo-color-red>*{color:inherit}.novo-chip.novo-accent-red{border:2px solid var(--palette-red-50);color:var(--palette-red-50)}.novo-chip.novo-color-pink{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}.novo-chip.novo-color-pink>*{color:inherit}.novo-chip.novo-accent-pink{border:2px solid var(--palette-pink-50);color:var(--palette-pink-50)}.novo-chip.novo-color-orange{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}.novo-chip.novo-color-orange>*{color:inherit}.novo-chip.novo-accent-orange{border:2px solid var(--palette-orange-50);color:var(--palette-orange-50)}.novo-chip.novo-color-yellow{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}.novo-chip.novo-color-yellow>*{color:inherit}.novo-chip.novo-accent-yellow{border:2px solid var(--palette-yellow-50);color:var(--palette-yellow-50)}.novo-chip.novo-color-green{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}.novo-chip.novo-color-green>*{color:inherit}.novo-chip.novo-accent-green{border:2px solid var(--palette-green-50);color:var(--palette-green-50)}.novo-chip.novo-color-teal{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}.novo-chip.novo-color-teal>*{color:inherit}.novo-chip.novo-accent-teal{border:2px solid var(--palette-teal-50);color:var(--palette-teal-50)}.novo-chip.novo-color-blue{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}.novo-chip.novo-color-blue>*{color:inherit}.novo-chip.novo-accent-blue{border:2px solid var(--palette-blue-50);color:var(--palette-blue-50)}.novo-chip.novo-color-aqua{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}.novo-chip.novo-color-aqua>*{color:inherit}.novo-chip.novo-accent-aqua{border:2px solid var(--palette-aqua-50);color:var(--palette-aqua-50)}.novo-chip.novo-color-indigo{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}.novo-chip.novo-color-indigo>*{color:inherit}.novo-chip.novo-accent-indigo{border:2px solid var(--palette-indigo-50);color:var(--palette-indigo-50)}.novo-chip.novo-color-violet{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}.novo-chip.novo-color-violet>*{color:inherit}.novo-chip.novo-accent-violet{border:2px solid var(--palette-violet-50);color:var(--palette-violet-50)}.novo-chip.novo-color-gray{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}.novo-chip.novo-color-gray>*{color:inherit}.novo-chip.novo-accent-gray{border:2px solid var(--palette-gray-50);color:var(--palette-gray-50)}:host .chip-input-container{padding-top:10px}:host .chip-input-container .placeholder{color:var(--form-placeholder)}:host .panel-toggle{padding:.2em}:host .panel-toggle i{margin:0}:host .panel-toggle.selected{background:var(--color-selection-overlay);border-radius:50%}:host ul.summary{display:inline;list-style:none;color:#868686;padding:0 10px}:host ul.summary li{display:inline;padding:0 3px}:host ul.summary li:after{content:\", \"}:host ul.summary li:last-child:after{content:\" \"}:host chip span{text-transform:capitalize}\n"] }]
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
        IMaskDirectiveModule,
        NovoIconModule,
        NovoChipsModule,
        NovoCalendarModule], exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement] });
NovoDatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDatePickerModule, imports: [[
            CommonModule,
            FormsModule,
            NovoButtonModule,
            NovoPipesModule,
            NovoOverlayModule,
            IMaskDirectiveModule,
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
                        IMaskDirectiveModule,
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
//# sourceMappingURL=novo-elements-components-date-picker.mjs.map
