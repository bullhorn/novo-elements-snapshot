/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// NG2
import { ElementRef, Component, EventEmitter, forwardRef, Input, Output, ViewChild, TemplateRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
// Vendor
import * as dateFns from 'date-fns';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';
// Value accessor for the component (supports ngModel)
/** @type {?} */
var DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NovoDatePickerElement; }),
    multi: true,
};
/**
 * @record
 */
export function RangeModal() { }
if (false) {
    /** @type {?} */
    RangeModal.prototype.startDate;
    /** @type {?} */
    RangeModal.prototype.endDate;
}
/**
 * @record
 */
export function Day() { }
if (false) {
    /** @type {?} */
    Day.prototype.date;
    /** @type {?|undefined} */
    Day.prototype.isCurrentMonth;
    /** @type {?|undefined} */
    Day.prototype.isToday;
    /** @type {?|undefined} */
    Day.prototype.name;
    /** @type {?|undefined} */
    Day.prototype.number;
}
var NovoDatePickerElement = /** @class */ (function () {
    function NovoDatePickerElement(labels, element) {
        this.labels = labels;
        this.element = element;
        this.weekStart = 0;
        // Select callback for output
        this.onSelect = new EventEmitter(false);
        // List of all the weekdays
        this.weekdays = [];
        // List of all months
        this.months = [];
        // List of all years (generated in ngOnInit)
        this.years = [];
        // Default view mode (select days)
        this.view = 'days';
        this.rangeSelectMode = 'startDate';
        this._onChange = function () { };
        this._onTouched = function () { };
    }
    /**
     * @return {?}
     */
    NovoDatePickerElement.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Determine the year array
        /** @type {?} */
        var now = new Date();
        /** @type {?} */
        var start = this.minYear ? Number(this.minYear) : now.getFullYear() - 100;
        /** @type {?} */
        var end = this.maxYear ? Number(this.maxYear) : now.getFullYear() + 10;
        for (var i = start; i <= end; i++) {
            this.years.push(i);
        }
        // Set weekdays / months
        this.weekdays = this.setupWeekdays();
        this.months = this.labels.getMonths();
        // Set labels
        this.selectedLabel = this.labels.startDate;
        this.selected2Label = this.labels.endDate;
        this.updateView(this.model, false, true);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NovoDatePickerElement.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var weekRangeSelectChange = changes['weekRangeSelect'];
        if (weekRangeSelectChange &&
            weekRangeSelectChange.currentValue !== weekRangeSelectChange.previousValue &&
            !weekRangeSelectChange.firstChange) {
            this.clearRange();
        }
        /** @type {?} */
        var weekStartChanges = changes['weekStart'];
        if (weekStartChanges && weekStartChanges.currentValue !== weekStartChanges.previousValue && !weekStartChanges.firstChange) {
            this.weekdays = this.setupWeekdays();
            this.updateView(this.model, false, false);
        }
    };
    /**
     * @return {?}
     */
    NovoDatePickerElement.prototype.setupWeekdays = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var weekdays = this.labels.getWeekdays();
        // Weekstart must be 0-6 (Sunday - Saturday)
        if (!Helpers.isBlank(this.weekStart) && this.weekStart > 0 && this.weekStart <= 6) {
            /** @type {?} */
            var newStart = weekdays.splice(this.weekStart);
            weekdays = tslib_1.__spread(newStart, weekdays);
        }
        return weekdays;
    };
    /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @param {?} hoverDay
     * @param {?} rangeSelectMode
     * @param {?} weekRangeSelect
     * @return {?}
     */
    NovoDatePickerElement.prototype.isSelectingRange = /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @param {?} hoverDay
     * @param {?} rangeSelectMode
     * @param {?} weekRangeSelect
     * @return {?}
     */
    function (range, day, selected, selected2, hoverDay, rangeSelectMode, weekRangeSelect) {
        if (range && !weekRangeSelect) {
            /** @type {?} */
            var isRangeModeEndDate = rangeSelectMode === 'endDate' && (selected && selected2 && dateFns.isAfter(day, selected2) && dateFns.isBefore(day, hoverDay));
            /** @type {?} */
            var isRangeModeStartDate = rangeSelectMode === 'startDate' && (selected && selected2 && dateFns.isBefore(day, selected) && dateFns.isAfter(day, hoverDay));
            /** @type {?} */
            var isNotSelected = !selected && selected2 && dateFns.isBefore(day, selected2) && dateFns.isAfter(day, hoverDay);
            /** @type {?} */
            var isNotSelected2 = selected && !selected2 && dateFns.isAfter(day, selected) && dateFns.isBefore(day, hoverDay);
            return isNotSelected2 || isNotSelected || isRangeModeStartDate || isRangeModeEndDate;
        }
        return false;
    };
    /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @return {?}
     */
    NovoDatePickerElement.prototype.isEndFill = /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @return {?}
     */
    function (range, day, selected, selected2) {
        if (range && selected2 && selected) {
            return !dateFns.isSameDay(selected, selected2) && dateFns.isSameDay(day, selected2) && dateFns.isAfter(day, selected);
        }
        return false;
    };
    /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @return {?}
     */
    NovoDatePickerElement.prototype.isStartFill = /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @return {?}
     */
    function (range, day, selected, selected2) {
        if (range && selected2 && selected) {
            return !dateFns.isSameDay(selected, selected2) && dateFns.isSameDay(day, selected) && dateFns.isBefore(day, selected2);
        }
        return false;
    };
    /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @return {?}
     */
    NovoDatePickerElement.prototype.isFiller = /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @return {?}
     */
    function (range, day, selected, selected2) {
        if (range && selected2 && selected) {
            return ((dateFns.isAfter(day, selected) && dateFns.isBefore(day, selected2)) ||
                dateFns.isSameDay(day, selected) ||
                dateFns.isSameDay(day, selected2));
        }
        return false;
    };
    /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @return {?}
     */
    NovoDatePickerElement.prototype.isSelected = /**
     * @param {?} range
     * @param {?} day
     * @param {?} selected
     * @param {?} selected2
     * @return {?}
     */
    function (range, day, selected, selected2) {
        if (range) {
            return (day &&
                ((selected &&
                    (day.getDate() === selected.getDate() &&
                        day.getMonth() === selected.getMonth() &&
                        day.getFullYear() === selected.getFullYear())) ||
                    (selected2 &&
                        (day.getDate() === selected2.getDate() &&
                            day.getMonth() === selected2.getMonth() &&
                            day.getFullYear() === selected2.getFullYear()))));
        }
        return day.getDate() === selected.getDate() && day.getMonth() === selected.getMonth() && day.getFullYear() === selected.getFullYear();
    };
    /**
     * @param {?} day
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    NovoDatePickerElement.prototype.isDisabled = /**
     * @param {?} day
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (day, start, end) {
        return dateFns.isBefore(day, start) || dateFns.isAfter(day, end);
    };
    /**
     * @param {?} date
     * @param {?} fireEvents
     * @param {?} markedSelected
     * @return {?}
     */
    NovoDatePickerElement.prototype.updateView = /**
     * @param {?} date
     * @param {?} fireEvents
     * @param {?} markedSelected
     * @return {?}
     */
    function (date, fireEvents, markedSelected) {
        if (date && date.startDate === null) {
            this.clearRange();
        }
        else {
            if (!date) {
                this.clearRange();
            }
            /** @type {?} */
            var value = date ? new Date(date) : new Date();
            value = this.removeTime(value);
            this.month = new Date(value);
            this.monthLabel = this.labels.formatDateWithFormat(this.month, { month: 'short' });
            /** @type {?} */
            var start = new Date(value.getTime());
            start.setDate(1);
            this.removeTime(start.setDate(1));
            this.buildMonth(start, this.month);
            if (markedSelected) {
                this.select(null, { date: value }, fireEvents);
            }
        }
    };
    /**
     * @return {?}
     */
    NovoDatePickerElement.prototype.setToday = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tmp = new Date();
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    };
    /**
     * @return {?}
     */
    NovoDatePickerElement.prototype.clearRange = /**
     * @return {?}
     */
    function () {
        this.selected = null;
        this.selectedLabel = this.labels.startDate;
        this.selected2 = null;
        this.selected2Label = this.labels.endDate;
    };
    /**
     * @param {?} month
     * @return {?}
     */
    NovoDatePickerElement.prototype.setMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var date = this.month ? this.month : new Date();
        /** @type {?} */
        var tmp = dateFns.setMonth(date, month);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    };
    /**
     * @param {?} year
     * @return {?}
     */
    NovoDatePickerElement.prototype.setYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        /** @type {?} */
        var date = this.month ? this.month : new Date();
        /** @type {?} */
        var tmp = dateFns.setYear(date, year);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    };
    /**
     * @param {?} event
     * @param {?} day
     * @param {?} fireEvents
     * @return {?}
     */
    NovoDatePickerElement.prototype.select = /**
     * @param {?} event
     * @param {?} day
     * @param {?} fireEvents
     * @return {?}
     */
    function (event, day, fireEvents) {
        Helpers.swallowEvent(event);
        if (this.range) {
            if (this.weekRangeSelect) {
                this.selected = dateFns.startOfWeek(day.date, { weekStartsOn: this.weekStart });
                this.selected2 = dateFns.endOfWeek(day.date, { weekStartsOn: this.weekStart });
                this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
                this.selected2Label = this.labels.formatDateWithFormat(this.selected2, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
                // Make sure to fire this, since we default to the current week selected!
                if (!fireEvents && this.weekRangeSelect) {
                    this.fireRangeSelect();
                }
            }
            else if (this.rangeSelectMode === 'startDate') {
                // SET START DATE
                this.selected = dateFns.startOfDay(day.date);
                this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
                if (this.selected2 && dateFns.isAfter(day.date, this.selected2)) {
                    // CLEAR END DATE
                    this.selected2 = null;
                    this.selected2Label = this.labels.endDate;
                }
                if (event) {
                    this.rangeSelectMode = 'endDate';
                }
            }
            else if (this.rangeSelectMode === 'endDate') {
                // SET END DATE
                this.selected2 = dateFns.endOfDay(day.date);
                this.selected2Label = this.labels.formatDateWithFormat(this.selected2, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
                if (this.selected && dateFns.isBefore(day.date, this.selected)) {
                    // CLEAR START DATE
                    this.selected = null;
                    this.selectedLabel = this.labels.startDate;
                }
                if (event) {
                    this.rangeSelectMode = 'startDate';
                }
            }
        }
        else {
            this.selected = day.date;
            this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
            });
            this.updateHeading();
        }
        if (fireEvents && this.selected) {
            // Emit our output
            if (this.range && this.selected && this.selected2) {
                this.fireRangeSelect();
                // Also, update the ngModel
                this._onChange({
                    startDate: this.selected,
                    endDate: this.selected2 ? this.selected2 : null,
                });
                this.model = {
                    startDate: this.selected,
                    endDate: this.selected2 ? this.selected2 : null,
                };
            }
            if (!this.range) {
                this.onSelect.next({
                    month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
                    year: this.selected.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
                    date: this.selected,
                });
                // Also, update the ngModel
                this._onChange(this.selected);
                this.model = this.selected;
            }
        }
    };
    /**
     * @return {?}
     */
    NovoDatePickerElement.prototype.fireRangeSelect = /**
     * @return {?}
     */
    function () {
        // Make sure the start date is before the end date
        if (dateFns.isBefore(this.selected, this.selected2)) {
            this.onSelect.next({
                startDate: {
                    month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
                    year: this.selected.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
                    date: this.selected,
                },
                endDate: {
                    month: this.labels.formatDateWithFormat(this.selected2, { month: 'long' }),
                    year: this.selected2.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected2, { weekday: 'long' }),
                    date: this.selected2,
                },
            });
        }
    };
    /**
     * @param {?} event
     * @param {?} type
     * @return {?}
     */
    NovoDatePickerElement.prototype.open = /**
     * @param {?} event
     * @param {?} type
     * @return {?}
     */
    function (event, type) {
        var _this = this;
        Helpers.swallowEvent(event);
        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.view) {
            this.view = 'days';
        }
        else {
            this.view = type;
        }
        // Make sure to scroll the selected one into view
        if (this.view === 'years' || this.view === 'months') {
            setTimeout(function () {
                /** @type {?} */
                var container = _this.element.nativeElement.querySelector(".calendar-content." + _this.view);
                /** @type {?} */
                var selectedItem = _this.element.nativeElement.querySelector(".calendar-content." + _this.view + " ." + (_this.view === 'years' ? 'year' : 'month') + ".selected");
                if (container && selectedItem) {
                    container.scrollTop = selectedItem.offsetTop - 100;
                }
            });
        }
        this.updateHeading();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NovoDatePickerElement.prototype.prevMonth = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        Helpers.swallowEvent(event);
        /** @type {?} */
        var tmp = dateFns.subMonths(this.month, 1);
        this.updateView(tmp, false, false);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NovoDatePickerElement.prototype.nextMonth = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        Helpers.swallowEvent(event);
        /** @type {?} */
        var tmp = dateFns.addMonths(this.month, 1);
        this.updateView(tmp, false, false);
    };
    /**
     * @return {?}
     */
    NovoDatePickerElement.prototype.updateHeading = /**
     * @return {?}
     */
    function () {
        if (!this.selected) {
            return;
        }
        this.heading = {
            month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
            year: this.selected.getFullYear(),
            day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
            date: this.selected.getDate(),
        };
    };
    /**
     * Remove the time aspect of the date
     * @param date
     * @returns with time stripped out
     */
    /**
     * Remove the time aspect of the date
     * @param {?} date
     * @return {?} with time stripped out
     */
    NovoDatePickerElement.prototype.removeTime = /**
     * Remove the time aspect of the date
     * @param {?} date
     * @return {?} with time stripped out
     */
    function (date) {
        /** @type {?} */
        var ret = new Date(date);
        ret.setHours(12);
        ret.setSeconds(0);
        ret.setMilliseconds(0);
        return ret;
    };
    /**
     * @param {?} start
     * @param {?} month
     * @return {?}
     */
    NovoDatePickerElement.prototype.buildMonth = /**
     * @param {?} start
     * @param {?} month
     * @return {?}
     */
    function (start, month) {
        // Reset the weeks
        this.weeks = [];
        // House keeping variables to know when we are done building the month
        /** @type {?} */
        var done = false;
        /** @type {?} */
        var date = dateFns.startOfWeek(start, { weekStartsOn: this.weekStart });
        /** @type {?} */
        var monthIndex = date.getMonth();
        /** @type {?} */
        var count = 0;
        while (!done) {
            // Build the days for the weeks
            this.weeks.push({ days: this.buildWeek(new Date(date.getTime()), month) });
            // Increment variables for the next iteration
            date = dateFns.addDays(date, 7);
            done = count++ > 2 && monthIndex !== date.getMonth();
            monthIndex = date.getMonth();
        }
    };
    /**
     * @param {?} date
     * @param {?} month
     * @return {?}
     */
    NovoDatePickerElement.prototype.buildWeek = /**
     * @param {?} date
     * @param {?} month
     * @return {?}
     */
    function (date, month) {
        // Build out of the days of the week
        /** @type {?} */
        var days = [];
        // Iterate over the days of the week
        for (var i = 0; i < 7; i++) {
            // Push a variable on the day array with lots of helpers to make the template easier
            days.push({
                name: this.weekdays[i],
                number: date.getDate(),
                isToday: dateFns.isToday(date),
                date: date,
            });
            // Increment for the next iteration
            date = dateFns.addDays(date, 1);
        }
        return days;
    };
    /**
     * @param {?} range
     * @return {?}
     */
    NovoDatePickerElement.prototype.toggleRangeSelect = /**
     * @param {?} range
     * @return {?}
     */
    function (range) {
        this.rangeSelectMode = range;
    };
    /**
     * @param {?} event
     * @param {?} day
     * @return {?}
     */
    NovoDatePickerElement.prototype.rangeHover = /**
     * @param {?} event
     * @param {?} day
     * @return {?}
     */
    function (event, day) {
        this.hoverDay = day.date;
    };
    // ValueAccessor Functions
    // ValueAccessor Functions
    /**
     * @param {?} model
     * @return {?}
     */
    NovoDatePickerElement.prototype.writeValue = 
    // ValueAccessor Functions
    /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        this.model = model;
        if (Helpers.isDate(model)) {
            this.updateView(model, false, true);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NovoDatePickerElement.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NovoDatePickerElement.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    NovoDatePickerElement.decorators = [
        { type: Component, args: [{
                    selector: 'novo-date-picker',
                    providers: [DATE_PICKER_VALUE_ACCESSOR],
                    animations: [
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
                    ],
                    template: "\n        <div class=\"calendar\">\n            <div class=\"calendar-top\" *ngIf=\"!inline && !range\">\n                <h4 class=\"day\" [attr.data-automation-id]=\"heading?.day\">{{heading?.day}}</h4>\n                <h2 class=\"month\" [attr.data-automation-id]=\"heading?.month\">{{heading?.month}}</h2>\n                <h1 class=\"date\" [attr.data-automation-id]=\"heading?.date\">{{heading?.date}}</h1>\n                <h3 class=\"year\" [attr.data-automation-id]=\"heading?.year\">{{heading?.year}}</h3>\n            </div>\n            <div class=\"date-range-tabs\" *ngIf=\"range\" [class.week-select-mode]=\"weekRangeSelect\">\n                <span class=\"range-tab\" (click)=\"toggleRangeSelect('startDate')\" [@startDateTextState]=\"rangeSelectMode\" data-automation-id=\"calendar-start-date\">{{selectedLabel}}</span>\n                <span class=\"range-tab\" (click)=\"toggleRangeSelect('endDate')\" [@endDateTextState]=\"rangeSelectMode\" data-automation-id=\"calendar-end-date\">{{selected2Label}}</span>\n                <i class=\"indicator\" [@indicatorState]=\"rangeSelectMode\"></i>\n            </div>\n            <div class=\"calendar-header\">\n                <span class=\"previous\" (click)=\"prevMonth($event)\" data-automation-id=\"calendar-previous\"></span>\n                <span class=\"heading\">\n                    <span class=\"month\" (click)=\"open($event, 'months')\" data-automation-id=\"header-month\">{{monthLabel}}</span>\n                    <span class=\"year\" (click)=\"open($event, 'years')\" data-automation-id=\"header-year\">{{month?.getFullYear()}}</span>\n                </span>\n                <span class=\"next\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\"></span>\n            </div>\n            <table class=\"calendar-content days\" cellspacing=\"0\" cellpadding=\"0\" [hidden]=\"!(view=='days')\">\n                <thead>\n                    <tr>\n                        <th *ngFor=\"let day of weekdays\" title=\"{{day}}\" class=\"weekday\" [attr.data-automation-id]=\"day.substr(0, 2)\">{{day.substr(0, 2)}}</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let week of weeks\">\n                        <td *ngFor=\"let day of week.days\" [ngClass]=\"{\n                            today: day.isToday,\n                            'notinmonth': day.date.getMonth() !== this.month.getMonth(),\n                            selected: isSelected(range, day.date, selected, selected2),\n                            filler: isFiller(range, day.date, selected, selected2),\n                            startfill: isStartFill(range, day.date, selected, selected2),\n                            endfill: isEndFill(range, day.date, selected, selected2),\n                            'selecting-range': isSelectingRange(range, day.date, selected, selected2, hoverDay, rangeSelectMode, weekRangeSelect)\n                           }\" (mouseover)=\"rangeHover($event, day)\" [attr.data-automation-id]=\"day.number\">\n                            <button class=\"day\" [attr.data-automation-id]=\"day.number\" [disabled]=\"isDisabled(day.date, start, end)\" (click)=\"select($event, day, true)\">{{day.number}}</button>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n            <section class=\"calendar-content months\" [hidden]=\"view !== 'months'\">\n                <div *ngFor=\"let month of months;let i = index\" (click)=\"setMonth(i)\">\n                    <div class=\"month\" [ngClass]=\"{selected: i === selected?.getMonth()}\" [attr.data-automation-id]=\"month\">{{month}}</div>\n                </div>\n            </section>\n            <section class=\"calendar-content years\" [hidden]=\"view !== 'years'\">\n                <div *ngFor=\"let year of years\" (click)=\"setYear(year)\">\n                    <div class=\"year\" [ngClass]=\"{selected: year == selected?.getFullYear()}\" [attr.data-automation-id]=\"year\">{{year}}</div>\n                </div>\n            </section>\n            <div class=\"calendar-footer\">\n                <span (click)=\"setToday()\" class=\"today\" data-automation-id=\"calendar-today\">{{ labels.today }}</span>\n            </div>\n        </div>\n    "
                }] }
    ];
    /** @nocollapse */
    NovoDatePickerElement.ctorParameters = function () { return [
        { type: NovoLabelService },
        { type: ElementRef }
    ]; };
    NovoDatePickerElement.propDecorators = {
        minYear: [{ type: Input }],
        maxYear: [{ type: Input }],
        start: [{ type: Input }],
        end: [{ type: Input }],
        inline: [{ type: Input }],
        range: [{ type: Input }],
        weekRangeSelect: [{ type: Input }],
        weekStart: [{ type: Input }],
        onSelect: [{ type: Output }],
        template: [{ type: ViewChild, args: [TemplateRef,] }]
    };
    return NovoDatePickerElement;
}());
export { NovoDatePickerElement };
if (false) {
    /** @type {?} */
    NovoDatePickerElement.prototype.minYear;
    /** @type {?} */
    NovoDatePickerElement.prototype.maxYear;
    /** @type {?} */
    NovoDatePickerElement.prototype.start;
    /** @type {?} */
    NovoDatePickerElement.prototype.end;
    /** @type {?} */
    NovoDatePickerElement.prototype.inline;
    /** @type {?} */
    NovoDatePickerElement.prototype.range;
    /** @type {?} */
    NovoDatePickerElement.prototype.weekRangeSelect;
    /** @type {?} */
    NovoDatePickerElement.prototype.weekStart;
    /** @type {?} */
    NovoDatePickerElement.prototype.onSelect;
    /** @type {?} */
    NovoDatePickerElement.prototype.template;
    /** @type {?} */
    NovoDatePickerElement.prototype.weekdays;
    /** @type {?} */
    NovoDatePickerElement.prototype.months;
    /** @type {?} */
    NovoDatePickerElement.prototype.years;
    /** @type {?} */
    NovoDatePickerElement.prototype.view;
    /** @type {?} */
    NovoDatePickerElement.prototype.heading;
    /** @type {?} */
    NovoDatePickerElement.prototype.model;
    /** @type {?} */
    NovoDatePickerElement.prototype.month;
    /** @type {?} */
    NovoDatePickerElement.prototype.monthLabel;
    /** @type {?} */
    NovoDatePickerElement.prototype.weeks;
    /** @type {?} */
    NovoDatePickerElement.prototype.selected;
    /** @type {?} */
    NovoDatePickerElement.prototype.selectedLabel;
    /** @type {?} */
    NovoDatePickerElement.prototype.selected2;
    /** @type {?} */
    NovoDatePickerElement.prototype.selected2Label;
    /** @type {?} */
    NovoDatePickerElement.prototype.hoverDay;
    /** @type {?} */
    NovoDatePickerElement.prototype.rangeSelectMode;
    /** @type {?} */
    NovoDatePickerElement.prototype._onChange;
    /** @type {?} */
    NovoDatePickerElement.prototype._onTouched;
    /** @type {?} */
    NovoDatePickerElement.prototype.labels;
    /** @type {?} */
    NovoDatePickerElement.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRlLXBpY2tlci9EYXRlUGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFFTixTQUFTLEVBQ1QsV0FBVyxHQUlaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUVqRixPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQzs7QUFFcEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7SUFHL0QsMEJBQTBCLEdBQUc7SUFDakMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxxQkFBcUIsRUFBckIsQ0FBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaOzs7O0FBRUQsZ0NBR0M7OztJQUZDLCtCQUFnQjs7SUFDaEIsNkJBQWM7Ozs7O0FBSWhCLHlCQU1DOzs7SUFMQyxtQkFBVzs7SUFDWCw2QkFBeUI7O0lBQ3pCLHNCQUFrQjs7SUFDbEIsbUJBQWM7O0lBQ2QscUJBQXlCOztBQUszQjtJQTRKRSwrQkFBbUIsTUFBd0IsRUFBVSxPQUFtQjtRQUFyRCxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVk7UUEvQnhFLGNBQVMsR0FBVyxDQUFDLENBQUM7O1FBR3RCLGFBQVEsR0FBc0Is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LENBQUM7Z0NBQ0osU0FBUyxFQUFFLGdCQUFnQjs2QkFDNUIsQ0FBQyxDQUNIOzRCQUNELEtBQUssQ0FDSCxTQUFTLEVBQ1QsS0FBSyxDQUFDO2dDQUNKLFNBQVMsRUFBRSxrQkFBa0I7NkJBQzlCLENBQUMsQ0FDSDs0QkFDRCxVQUFVLENBQUMsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3lCQUM5RCxDQUFDO3FCQUNIO29CQUNELFFBQVEsRUFBRSw4dUlBeURQO2lCQUNKOzs7O2dCQXJJUSxnQkFBZ0I7Z0JBbkJ2QixVQUFVOzs7MEJBMEpULEtBQUs7MEJBRUwsS0FBSzt3QkFFTCxLQUFLO3NCQUVMLEtBQUs7eUJBRUwsS0FBSzt3QkFFTCxLQUFLO2tDQUVMLEtBQUs7NEJBRUwsS0FBSzsyQkFHTCxNQUFNOzJCQUVOLFNBQVMsU0FBQyxXQUFXOztJQTJheEIsNEJBQUM7Q0FBQSxBQTVpQkQsSUE0aUJDO1NBL2JZLHFCQUFxQjs7O0lBQ2hDLHdDQUN5Qjs7SUFDekIsd0NBQ3lCOztJQUN6QixzQ0FDWTs7SUFDWixvQ0FDVTs7SUFDVix1Q0FDZ0I7O0lBQ2hCLHNDQUNlOztJQUNmLGdEQUN5Qjs7SUFDekIsMENBQ3NCOztJQUV0Qix5Q0FDc0Q7O0lBQ3RELHlDQUMyQjs7SUFHM0IseUNBQXdCOztJQUV4Qix1Q0FBc0I7O0lBRXRCLHNDQUF1Qjs7SUFFdkIscUNBQXNCOztJQUN0Qix3Q0FBYTs7SUFFYixzQ0FBa0I7O0lBQ2xCLHNDQUFZOztJQUNaLDJDQUFtQjs7SUFDbkIsc0NBQVc7O0lBQ1gseUNBQWU7O0lBQ2YsOENBQXNCOztJQUN0QiwwQ0FBZ0I7O0lBQ2hCLCtDQUF1Qjs7SUFDdkIseUNBQWM7O0lBRWQsZ0RBQWdEOztJQUNoRCwwQ0FBK0I7O0lBQy9CLDJDQUFnQzs7SUFFcEIsdUNBQStCOztJQUFFLHdDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgRWxlbWVudFJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2UsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG4vLyBWZW5kb3JcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBEQVRFX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9EYXRlUGlja2VyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBSYW5nZU1vZGFsIHtcbiAgc3RhcnREYXRlOiBEYXRlO1xuICBlbmREYXRlOiBEYXRlO1xufVxuZXhwb3J0IHR5cGUgbW9kZWxUeXBlcyA9IERhdGUgfCBSYW5nZU1vZGFsO1xuXG5leHBvcnQgaW50ZXJmYWNlIERheSB7XG4gIGRhdGU6IERhdGU7XG4gIGlzQ3VycmVudE1vbnRoPzogYm9vbGVhbjtcbiAgaXNUb2RheT86IGJvb2xlYW47XG4gIG5hbWU/OiBzdHJpbmc7XG4gIG51bWJlcj86IHN0cmluZyB8IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgcmFuZ2VTZWxlY3RNb2RlcyA9ICdzdGFydERhdGUnIHwgJ2VuZERhdGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGUtcGlja2VyJyxcbiAgcHJvdmlkZXJzOiBbREFURV9QSUNLRVJfVkFMVUVfQUNDRVNTT1JdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc3RhcnREYXRlVGV4dFN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdzdGFydERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzEuMCcsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnZW5kRGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMC42JyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignc3RhcnREYXRlIDw9PiBlbmREYXRlJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCdlbmREYXRlVGV4dFN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdzdGFydERhdGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogJzAuNicsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnZW5kRGF0ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAnMS4wJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignc3RhcnREYXRlIDw9PiBlbmREYXRlJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCdpbmRpY2F0b3JTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc3RhcnREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICdlbmREYXRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKCdzdGFydERhdGUgPD0+IGVuZERhdGUnLCBhbmltYXRlKCcyMDBtcyBlYXNlLWluJykpLFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci10b3BcIiAqbmdJZj1cIiFpbmxpbmUgJiYgIXJhbmdlXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiZGF5XCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImhlYWRpbmc/LmRheVwiPnt7aGVhZGluZz8uZGF5fX08L2g0PlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cIm1vbnRoXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImhlYWRpbmc/Lm1vbnRoXCI+e3toZWFkaW5nPy5tb250aH19PC9oMj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJkYXRlXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImhlYWRpbmc/LmRhdGVcIj57e2hlYWRpbmc/LmRhdGV9fTwvaDE+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwieWVhclwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJoZWFkaW5nPy55ZWFyXCI+e3toZWFkaW5nPy55ZWFyfX08L2gzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1yYW5nZS10YWJzXCIgKm5nSWY9XCJyYW5nZVwiIFtjbGFzcy53ZWVrLXNlbGVjdC1tb2RlXT1cIndlZWtSYW5nZVNlbGVjdFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmFuZ2UtdGFiXCIgKGNsaWNrKT1cInRvZ2dsZVJhbmdlU2VsZWN0KCdzdGFydERhdGUnKVwiIFtAc3RhcnREYXRlVGV4dFN0YXRlXT1cInJhbmdlU2VsZWN0TW9kZVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLXN0YXJ0LWRhdGVcIj57e3NlbGVjdGVkTGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInJhbmdlLXRhYlwiIChjbGljayk9XCJ0b2dnbGVSYW5nZVNlbGVjdCgnZW5kRGF0ZScpXCIgW0BlbmREYXRlVGV4dFN0YXRlXT1cInJhbmdlU2VsZWN0TW9kZVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLWVuZC1kYXRlXCI+e3tzZWxlY3RlZDJMYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaW5kaWNhdG9yXCIgW0BpbmRpY2F0b3JTdGF0ZV09XCJyYW5nZVNlbGVjdE1vZGVcIj48L2k+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByZXZpb3VzXCIgKGNsaWNrKT1cInByZXZNb250aCgkZXZlbnQpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY2FsZW5kYXItcHJldmlvdXNcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibW9udGhcIiAoY2xpY2spPVwib3BlbigkZXZlbnQsICdtb250aHMnKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImhlYWRlci1tb250aFwiPnt7bW9udGhMYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInllYXJcIiAoY2xpY2spPVwib3BlbigkZXZlbnQsICd5ZWFycycpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaGVhZGVyLXllYXJcIj57e21vbnRoPy5nZXRGdWxsWWVhcigpfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmV4dFwiIChjbGljayk9XCJuZXh0TW9udGgoJGV2ZW50KVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLW5leHRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cImNhbGVuZGFyLWNvbnRlbnQgZGF5c1wiIGNlbGxzcGFjaW5nPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIFtoaWRkZW5dPVwiISh2aWV3PT0nZGF5cycpXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGRheSBvZiB3ZWVrZGF5c1wiIHRpdGxlPVwie3tkYXl9fVwiIGNsYXNzPVwid2Vla2RheVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJkYXkuc3Vic3RyKDAsIDIpXCI+e3tkYXkuc3Vic3RyKDAsIDIpfX08L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHdlZWsgb2Ygd2Vla3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5c1wiIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RheTogZGF5LmlzVG9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vdGlubW9udGgnOiBkYXkuZGF0ZS5nZXRNb250aCgpICE9PSB0aGlzLm1vbnRoLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGlzU2VsZWN0ZWQocmFuZ2UsIGRheS5kYXRlLCBzZWxlY3RlZCwgc2VsZWN0ZWQyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsZXI6IGlzRmlsbGVyKHJhbmdlLCBkYXkuZGF0ZSwgc2VsZWN0ZWQsIHNlbGVjdGVkMiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRmaWxsOiBpc1N0YXJ0RmlsbChyYW5nZSwgZGF5LmRhdGUsIHNlbGVjdGVkLCBzZWxlY3RlZDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZGZpbGw6IGlzRW5kRmlsbChyYW5nZSwgZGF5LmRhdGUsIHNlbGVjdGVkLCBzZWxlY3RlZDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZWxlY3RpbmctcmFuZ2UnOiBpc1NlbGVjdGluZ1JhbmdlKHJhbmdlLCBkYXkuZGF0ZSwgc2VsZWN0ZWQsIHNlbGVjdGVkMiwgaG92ZXJEYXksIHJhbmdlU2VsZWN0TW9kZSwgd2Vla1JhbmdlU2VsZWN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiIChtb3VzZW92ZXIpPVwicmFuZ2VIb3ZlcigkZXZlbnQsIGRheSlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiZGF5Lm51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkYXlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiZGF5Lm51bWJlclwiIFtkaXNhYmxlZF09XCJpc0Rpc2FibGVkKGRheS5kYXRlLCBzdGFydCwgZW5kKVwiIChjbGljayk9XCJzZWxlY3QoJGV2ZW50LCBkYXksIHRydWUpXCI+e3tkYXkubnVtYmVyfX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNhbGVuZGFyLWNvbnRlbnQgbW9udGhzXCIgW2hpZGRlbl09XCJ2aWV3ICE9PSAnbW9udGhzJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRocztsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cInNldE1vbnRoKGkpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb250aFwiIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogaSA9PT0gc2VsZWN0ZWQ/LmdldE1vbnRoKCl9XCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm1vbnRoXCI+e3ttb250aH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNhbGVuZGFyLWNvbnRlbnQgeWVhcnNcIiBbaGlkZGVuXT1cInZpZXcgIT09ICd5ZWFycydcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCB5ZWFyIG9mIHllYXJzXCIgKGNsaWNrKT1cInNldFllYXIoeWVhcilcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInllYXJcIiBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IHllYXIgPT0gc2VsZWN0ZWQ/LmdldEZ1bGxZZWFyKCl9XCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInllYXJcIj57e3llYXJ9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJzZXRUb2RheSgpXCIgY2xhc3M9XCJ0b2RheVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLXRvZGF5XCI+e3sgbGFiZWxzLnRvZGF5IH19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRlUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIG1pblllYXI6IHN0cmluZyB8IG51bWJlcjtcbiAgQElucHV0KClcbiAgbWF4WWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICBASW5wdXQoKVxuICBzdGFydDogRGF0ZTtcbiAgQElucHV0KClcbiAgZW5kOiBEYXRlO1xuICBASW5wdXQoKVxuICBpbmxpbmU6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHJhbmdlOiBib29sZWFuO1xuICBASW5wdXQoKVxuICB3ZWVrUmFuZ2VTZWxlY3Q6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHdlZWtTdGFydDogbnVtYmVyID0gMDtcbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKVxuICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvLyBMaXN0IG9mIGFsbCB0aGUgd2Vla2RheXNcbiAgd2Vla2RheXM6IHN0cmluZ1tdID0gW107XG4gIC8vIExpc3Qgb2YgYWxsIG1vbnRoc1xuICBtb250aHM6IHN0cmluZ1tdID0gW107XG4gIC8vIExpc3Qgb2YgYWxsIHllYXJzIChnZW5lcmF0ZWQgaW4gbmdPbkluaXQpXG4gIHllYXJzOiBBcnJheTxhbnk+ID0gW107XG4gIC8vIERlZmF1bHQgdmlldyBtb2RlIChzZWxlY3QgZGF5cylcbiAgdmlldzogc3RyaW5nID0gJ2RheXMnO1xuICBoZWFkaW5nOiBhbnk7XG5cbiAgbW9kZWw6IG1vZGVsVHlwZXM7XG4gIG1vbnRoOiBEYXRlO1xuICBtb250aExhYmVsOiBzdHJpbmc7XG4gIHdlZWtzOiBhbnk7XG4gIHNlbGVjdGVkOiBEYXRlO1xuICBzZWxlY3RlZExhYmVsOiBzdHJpbmc7XG4gIHNlbGVjdGVkMjogRGF0ZTtcbiAgc2VsZWN0ZWQyTGFiZWw6IHN0cmluZztcbiAgaG92ZXJEYXk6IGFueTtcblxuICByYW5nZVNlbGVjdE1vZGU6IHJhbmdlU2VsZWN0TW9kZXMgPSAnc3RhcnREYXRlJztcbiAgX29uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBfb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBEZXRlcm1pbmUgdGhlIHllYXIgYXJyYXlcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICBsZXQgc3RhcnQgPSB0aGlzLm1pblllYXIgPyBOdW1iZXIodGhpcy5taW5ZZWFyKSA6IG5vdy5nZXRGdWxsWWVhcigpIC0gMTAwO1xuICAgIGxldCBlbmQgPSB0aGlzLm1heFllYXIgPyBOdW1iZXIodGhpcy5tYXhZZWFyKSA6IG5vdy5nZXRGdWxsWWVhcigpICsgMTA7XG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgIHRoaXMueWVhcnMucHVzaChpKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgd2Vla2RheXMgLyBtb250aHNcbiAgICB0aGlzLndlZWtkYXlzID0gdGhpcy5zZXR1cFdlZWtkYXlzKCk7XG4gICAgdGhpcy5tb250aHMgPSB0aGlzLmxhYmVscy5nZXRNb250aHMoKTtcblxuICAgIC8vIFNldCBsYWJlbHNcbiAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5zdGFydERhdGU7XG4gICAgdGhpcy5zZWxlY3RlZDJMYWJlbCA9IHRoaXMubGFiZWxzLmVuZERhdGU7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRoaXMubW9kZWwsIGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgd2Vla1JhbmdlU2VsZWN0Q2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzWyd3ZWVrUmFuZ2VTZWxlY3QnXTtcbiAgICBpZiAoXG4gICAgICB3ZWVrUmFuZ2VTZWxlY3RDaGFuZ2UgJiZcbiAgICAgIHdlZWtSYW5nZVNlbGVjdENoYW5nZS5jdXJyZW50VmFsdWUgIT09IHdlZWtSYW5nZVNlbGVjdENoYW5nZS5wcmV2aW91c1ZhbHVlICYmXG4gICAgICAhd2Vla1JhbmdlU2VsZWN0Q2hhbmdlLmZpcnN0Q2hhbmdlXG4gICAgKSB7XG4gICAgICB0aGlzLmNsZWFyUmFuZ2UoKTtcbiAgICB9XG4gICAgbGV0IHdlZWtTdGFydENoYW5nZXM6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXNbJ3dlZWtTdGFydCddO1xuICAgIGlmICh3ZWVrU3RhcnRDaGFuZ2VzICYmIHdlZWtTdGFydENoYW5nZXMuY3VycmVudFZhbHVlICE9PSB3ZWVrU3RhcnRDaGFuZ2VzLnByZXZpb3VzVmFsdWUgJiYgIXdlZWtTdGFydENoYW5nZXMuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMud2Vla2RheXMgPSB0aGlzLnNldHVwV2Vla2RheXMoKTtcbiAgICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLm1vZGVsLCBmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHNldHVwV2Vla2RheXMoKTogc3RyaW5nW10ge1xuICAgIGxldCB3ZWVrZGF5cyA9IHRoaXMubGFiZWxzLmdldFdlZWtkYXlzKCk7XG4gICAgLy8gV2Vla3N0YXJ0IG11c3QgYmUgMC02IChTdW5kYXkgLSBTYXR1cmRheSlcbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayh0aGlzLndlZWtTdGFydCkgJiYgdGhpcy53ZWVrU3RhcnQgPiAwICYmIHRoaXMud2Vla1N0YXJ0IDw9IDYpIHtcbiAgICAgIGxldCBuZXdTdGFydCA9IHdlZWtkYXlzLnNwbGljZSh0aGlzLndlZWtTdGFydCk7XG4gICAgICB3ZWVrZGF5cyA9IFsuLi5uZXdTdGFydCwgLi4ud2Vla2RheXNdO1xuICAgIH1cbiAgICByZXR1cm4gd2Vla2RheXM7XG4gIH1cblxuICBpc1NlbGVjdGluZ1JhbmdlKHJhbmdlLCBkYXksIHNlbGVjdGVkLCBzZWxlY3RlZDIsIGhvdmVyRGF5LCByYW5nZVNlbGVjdE1vZGUsIHdlZWtSYW5nZVNlbGVjdCkge1xuICAgIGlmIChyYW5nZSAmJiAhd2Vla1JhbmdlU2VsZWN0KSB7XG4gICAgICBsZXQgaXNSYW5nZU1vZGVFbmREYXRlID1cbiAgICAgICAgcmFuZ2VTZWxlY3RNb2RlID09PSAnZW5kRGF0ZScgJiYgKHNlbGVjdGVkICYmIHNlbGVjdGVkMiAmJiBkYXRlRm5zLmlzQWZ0ZXIoZGF5LCBzZWxlY3RlZDIpICYmIGRhdGVGbnMuaXNCZWZvcmUoZGF5LCBob3ZlckRheSkpO1xuICAgICAgbGV0IGlzUmFuZ2VNb2RlU3RhcnREYXRlID1cbiAgICAgICAgcmFuZ2VTZWxlY3RNb2RlID09PSAnc3RhcnREYXRlJyAmJiAoc2VsZWN0ZWQgJiYgc2VsZWN0ZWQyICYmIGRhdGVGbnMuaXNCZWZvcmUoZGF5LCBzZWxlY3RlZCkgJiYgZGF0ZUZucy5pc0FmdGVyKGRheSwgaG92ZXJEYXkpKTtcbiAgICAgIGxldCBpc05vdFNlbGVjdGVkID0gIXNlbGVjdGVkICYmIHNlbGVjdGVkMiAmJiBkYXRlRm5zLmlzQmVmb3JlKGRheSwgc2VsZWN0ZWQyKSAmJiBkYXRlRm5zLmlzQWZ0ZXIoZGF5LCBob3ZlckRheSk7XG4gICAgICBsZXQgaXNOb3RTZWxlY3RlZDIgPSBzZWxlY3RlZCAmJiAhc2VsZWN0ZWQyICYmIGRhdGVGbnMuaXNBZnRlcihkYXksIHNlbGVjdGVkKSAmJiBkYXRlRm5zLmlzQmVmb3JlKGRheSwgaG92ZXJEYXkpO1xuICAgICAgcmV0dXJuIGlzTm90U2VsZWN0ZWQyIHx8IGlzTm90U2VsZWN0ZWQgfHwgaXNSYW5nZU1vZGVTdGFydERhdGUgfHwgaXNSYW5nZU1vZGVFbmREYXRlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0VuZEZpbGwocmFuZ2UsIGRheSwgc2VsZWN0ZWQsIHNlbGVjdGVkMikge1xuICAgIGlmIChyYW5nZSAmJiBzZWxlY3RlZDIgJiYgc2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybiAhZGF0ZUZucy5pc1NhbWVEYXkoc2VsZWN0ZWQsIHNlbGVjdGVkMikgJiYgZGF0ZUZucy5pc1NhbWVEYXkoZGF5LCBzZWxlY3RlZDIpICYmIGRhdGVGbnMuaXNBZnRlcihkYXksIHNlbGVjdGVkKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNTdGFydEZpbGwocmFuZ2UsIGRheSwgc2VsZWN0ZWQsIHNlbGVjdGVkMikge1xuICAgIGlmIChyYW5nZSAmJiBzZWxlY3RlZDIgJiYgc2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybiAhZGF0ZUZucy5pc1NhbWVEYXkoc2VsZWN0ZWQsIHNlbGVjdGVkMikgJiYgZGF0ZUZucy5pc1NhbWVEYXkoZGF5LCBzZWxlY3RlZCkgJiYgZGF0ZUZucy5pc0JlZm9yZShkYXksIHNlbGVjdGVkMik7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRmlsbGVyKHJhbmdlLCBkYXksIHNlbGVjdGVkLCBzZWxlY3RlZDIpIHtcbiAgICBpZiAocmFuZ2UgJiYgc2VsZWN0ZWQyICYmIHNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAoZGF0ZUZucy5pc0FmdGVyKGRheSwgc2VsZWN0ZWQpICYmIGRhdGVGbnMuaXNCZWZvcmUoZGF5LCBzZWxlY3RlZDIpKSB8fFxuICAgICAgICBkYXRlRm5zLmlzU2FtZURheShkYXksIHNlbGVjdGVkKSB8fFxuICAgICAgICBkYXRlRm5zLmlzU2FtZURheShkYXksIHNlbGVjdGVkMilcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQocmFuZ2UsIGRheSwgc2VsZWN0ZWQsIHNlbGVjdGVkMikge1xuICAgIGlmIChyYW5nZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgZGF5ICYmXG4gICAgICAgICgoc2VsZWN0ZWQgJiZcbiAgICAgICAgICAoZGF5LmdldERhdGUoKSA9PT0gc2VsZWN0ZWQuZ2V0RGF0ZSgpICYmXG4gICAgICAgICAgICBkYXkuZ2V0TW9udGgoKSA9PT0gc2VsZWN0ZWQuZ2V0TW9udGgoKSAmJlxuICAgICAgICAgICAgZGF5LmdldEZ1bGxZZWFyKCkgPT09IHNlbGVjdGVkLmdldEZ1bGxZZWFyKCkpKSB8fFxuICAgICAgICAgIChzZWxlY3RlZDIgJiZcbiAgICAgICAgICAgIChkYXkuZ2V0RGF0ZSgpID09PSBzZWxlY3RlZDIuZ2V0RGF0ZSgpICYmXG4gICAgICAgICAgICAgIGRheS5nZXRNb250aCgpID09PSBzZWxlY3RlZDIuZ2V0TW9udGgoKSAmJlxuICAgICAgICAgICAgICBkYXkuZ2V0RnVsbFllYXIoKSA9PT0gc2VsZWN0ZWQyLmdldEZ1bGxZZWFyKCkpKSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkYXkuZ2V0RGF0ZSgpID09PSBzZWxlY3RlZC5nZXREYXRlKCkgJiYgZGF5LmdldE1vbnRoKCkgPT09IHNlbGVjdGVkLmdldE1vbnRoKCkgJiYgZGF5LmdldEZ1bGxZZWFyKCkgPT09IHNlbGVjdGVkLmdldEZ1bGxZZWFyKCk7XG4gIH1cblxuICBpc0Rpc2FibGVkKGRheSwgc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBkYXRlRm5zLmlzQmVmb3JlKGRheSwgc3RhcnQpIHx8IGRhdGVGbnMuaXNBZnRlcihkYXksIGVuZCk7XG4gIH1cblxuICB1cGRhdGVWaWV3KGRhdGUsIGZpcmVFdmVudHM6IGJvb2xlYW4sIG1hcmtlZFNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgaWYgKGRhdGUgJiYgZGF0ZS5zdGFydERhdGUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2xlYXJSYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWRhdGUpIHtcbiAgICAgICAgdGhpcy5jbGVhclJhbmdlKCk7XG4gICAgICB9XG4gICAgICBsZXQgdmFsdWU6IGFueSA9IGRhdGUgPyBuZXcgRGF0ZShkYXRlKSA6IG5ldyBEYXRlKCk7XG4gICAgICB2YWx1ZSA9IHRoaXMucmVtb3ZlVGltZSh2YWx1ZSk7XG4gICAgICB0aGlzLm1vbnRoID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgdGhpcy5tb250aExhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5tb250aCwgeyBtb250aDogJ3Nob3J0JyB9KTtcblxuICAgICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpKTtcbiAgICAgIHN0YXJ0LnNldERhdGUoMSk7XG4gICAgICB0aGlzLnJlbW92ZVRpbWUoc3RhcnQuc2V0RGF0ZSgxKSk7XG5cbiAgICAgIHRoaXMuYnVpbGRNb250aChzdGFydCwgdGhpcy5tb250aCk7XG5cbiAgICAgIGlmIChtYXJrZWRTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdChudWxsLCB7IGRhdGU6IHZhbHVlIH0sIGZpcmVFdmVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFRvZGF5KCkge1xuICAgIGxldCB0bXAgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXAsIHRydWUsIHRydWUpO1xuICAgIC8vIEdvIGJhY2sgdG8gZGF5c1xuICAgIHRoaXMub3BlbihudWxsLCAnZGF5cycpO1xuICB9XG5cbiAgY2xlYXJSYW5nZSgpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5zdGFydERhdGU7XG4gICAgdGhpcy5zZWxlY3RlZDIgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWQyTGFiZWwgPSB0aGlzLmxhYmVscy5lbmREYXRlO1xuICB9XG5cbiAgc2V0TW9udGgobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgIGxldCBkYXRlID0gdGhpcy5tb250aCA/IHRoaXMubW9udGggOiBuZXcgRGF0ZSgpO1xuICAgIGxldCB0bXAgPSBkYXRlRm5zLnNldE1vbnRoKGRhdGUsIG1vbnRoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wLCB0cnVlLCBmYWxzZSk7XG4gICAgLy8gR28gYmFjayB0byBkYXlzXG4gICAgdGhpcy5vcGVuKG51bGwsICdkYXlzJyk7XG4gIH1cblxuICBzZXRZZWFyKHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgIGxldCBkYXRlID0gdGhpcy5tb250aCA/IHRoaXMubW9udGggOiBuZXcgRGF0ZSgpO1xuICAgIGxldCB0bXAgPSBkYXRlRm5zLnNldFllYXIoZGF0ZSwgeWVhcik7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRtcCwgdHJ1ZSwgZmFsc2UpO1xuICAgIC8vIEdvIGJhY2sgdG8gZGF5c1xuICAgIHRoaXMub3BlbihudWxsLCAnZGF5cycpO1xuICB9XG5cbiAgc2VsZWN0KGV2ZW50OiBFdmVudCwgZGF5OiBEYXksIGZpcmVFdmVudHM6IGJvb2xlYW4pIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIGlmICh0aGlzLndlZWtSYW5nZVNlbGVjdCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZUZucy5zdGFydE9mV2VlayhkYXkuZGF0ZSwgeyB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0IH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkMiA9IGRhdGVGbnMuZW5kT2ZXZWVrKGRheS5kYXRlLCB7IHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnQgfSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHtcbiAgICAgICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkMkxhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZDIsIHtcbiAgICAgICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdG8gZmlyZSB0aGlzLCBzaW5jZSB3ZSBkZWZhdWx0IHRvIHRoZSBjdXJyZW50IHdlZWsgc2VsZWN0ZWQhXG4gICAgICAgIGlmICghZmlyZUV2ZW50cyAmJiB0aGlzLndlZWtSYW5nZVNlbGVjdCkge1xuICAgICAgICAgIHRoaXMuZmlyZVJhbmdlU2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5yYW5nZVNlbGVjdE1vZGUgPT09ICdzdGFydERhdGUnKSB7XG4gICAgICAgIC8vIFNFVCBTVEFSVCBEQVRFXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlRm5zLnN0YXJ0T2ZEYXkoZGF5LmRhdGUpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkLCB7XG4gICAgICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQyICYmIGRhdGVGbnMuaXNBZnRlcihkYXkuZGF0ZSwgdGhpcy5zZWxlY3RlZDIpKSB7XG4gICAgICAgICAgLy8gQ0xFQVIgRU5EIERBVEVcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkMiA9IG51bGw7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZDJMYWJlbCA9IHRoaXMubGFiZWxzLmVuZERhdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5yYW5nZVNlbGVjdE1vZGUgPSAnZW5kRGF0ZSc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5yYW5nZVNlbGVjdE1vZGUgPT09ICdlbmREYXRlJykge1xuICAgICAgICAvLyBTRVQgRU5EIERBVEVcbiAgICAgICAgdGhpcy5zZWxlY3RlZDIgPSBkYXRlRm5zLmVuZE9mRGF5KGRheS5kYXRlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZDJMYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQyLCB7XG4gICAgICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgZGF0ZUZucy5pc0JlZm9yZShkYXkuZGF0ZSwgdGhpcy5zZWxlY3RlZCkpIHtcbiAgICAgICAgICAvLyBDTEVBUiBTVEFSVCBEQVRFXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsID0gdGhpcy5sYWJlbHMuc3RhcnREYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIHRoaXMucmFuZ2VTZWxlY3RNb2RlID0gJ3N0YXJ0RGF0ZSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IGRheS5kYXRlO1xuICAgICAgdGhpcy5zZWxlY3RlZExhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZCwge1xuICAgICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIH0pO1xuICAgICAgdGhpcy51cGRhdGVIZWFkaW5nKCk7XG4gICAgfVxuICAgIGlmIChmaXJlRXZlbnRzICYmIHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIC8vIEVtaXQgb3VyIG91dHB1dFxuICAgICAgaWYgKHRoaXMucmFuZ2UgJiYgdGhpcy5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdGVkMikge1xuICAgICAgICB0aGlzLmZpcmVSYW5nZVNlbGVjdCgpO1xuICAgICAgICAvLyBBbHNvLCB1cGRhdGUgdGhlIG5nTW9kZWxcbiAgICAgICAgdGhpcy5fb25DaGFuZ2Uoe1xuICAgICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgICBlbmREYXRlOiB0aGlzLnNlbGVjdGVkMiA/IHRoaXMuc2VsZWN0ZWQyIDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubW9kZWwgPSB7XG4gICAgICAgICAgc3RhcnREYXRlOiB0aGlzLnNlbGVjdGVkLFxuICAgICAgICAgIGVuZERhdGU6IHRoaXMuc2VsZWN0ZWQyID8gdGhpcy5zZWxlY3RlZDIgOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMucmFuZ2UpIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdC5uZXh0KHtcbiAgICAgICAgICBtb250aDogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZCwgeyBtb250aDogJ2xvbmcnIH0pLFxuICAgICAgICAgIHllYXI6IHRoaXMuc2VsZWN0ZWQuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICBkYXk6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHsgd2Vla2RheTogJ2xvbmcnIH0pLFxuICAgICAgICAgIGRhdGU6IHRoaXMuc2VsZWN0ZWQsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBbHNvLCB1cGRhdGUgdGhlIG5nTW9kZWxcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnNlbGVjdGVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpcmVSYW5nZVNlbGVjdCgpIHtcbiAgICAvLyBNYWtlIHN1cmUgdGhlIHN0YXJ0IGRhdGUgaXMgYmVmb3JlIHRoZSBlbmQgZGF0ZVxuICAgIGlmIChkYXRlRm5zLmlzQmVmb3JlKHRoaXMuc2VsZWN0ZWQsIHRoaXMuc2VsZWN0ZWQyKSkge1xuICAgICAgdGhpcy5vblNlbGVjdC5uZXh0KHtcbiAgICAgICAgc3RhcnREYXRlOiB7XG4gICAgICAgICAgbW9udGg6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHsgbW9udGg6ICdsb25nJyB9KSxcbiAgICAgICAgICB5ZWFyOiB0aGlzLnNlbGVjdGVkLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgZGF5OiB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLnNlbGVjdGVkLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcbiAgICAgICAgICBkYXRlOiB0aGlzLnNlbGVjdGVkLFxuICAgICAgICB9LFxuICAgICAgICBlbmREYXRlOiB7XG4gICAgICAgICAgbW9udGg6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQyLCB7IG1vbnRoOiAnbG9uZycgfSksXG4gICAgICAgICAgeWVhcjogdGhpcy5zZWxlY3RlZDIuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICBkYXk6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQyLCB7IHdlZWtkYXk6ICdsb25nJyB9KSxcbiAgICAgICAgICBkYXRlOiB0aGlzLnNlbGVjdGVkMixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oZXZlbnQ6IEV2ZW50LCB0eXBlOiBzdHJpbmcpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG5cbiAgICAvLyBJZiB0aGV5IGNsaWNrIHRoZSB0b2dnbGUgdHdvIHRpbWUgaW4gYSByb3csIGNsb3NlIGl0IChnbyBiYWNrIHRvIGRheXMpXG4gICAgaWYgKHR5cGUgPT09IHRoaXMudmlldykge1xuICAgICAgdGhpcy52aWV3ID0gJ2RheXMnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXcgPSB0eXBlO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0byBzY3JvbGwgdGhlIHNlbGVjdGVkIG9uZSBpbnRvIHZpZXdcbiAgICBpZiAodGhpcy52aWV3ID09PSAneWVhcnMnIHx8IHRoaXMudmlldyA9PT0gJ21vbnRocycpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgLmNhbGVuZGFyLWNvbnRlbnQuJHt0aGlzLnZpZXd9YCk7XG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuY2FsZW5kYXItY29udGVudC4ke3RoaXMudmlld30gLiR7dGhpcy52aWV3ID09PSAneWVhcnMnID8gJ3llYXInIDogJ21vbnRoJ30uc2VsZWN0ZWRgLFxuICAgICAgICApO1xuICAgICAgICBpZiAoY29udGFpbmVyICYmIHNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBzZWxlY3RlZEl0ZW0ub2Zmc2V0VG9wIC0gMTAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUhlYWRpbmcoKTtcbiAgfVxuXG4gIHByZXZNb250aChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgbGV0IHRtcCA9IGRhdGVGbnMuc3ViTW9udGhzKHRoaXMubW9udGgsIDEpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXAsIGZhbHNlLCBmYWxzZSk7XG4gIH1cblxuICBuZXh0TW9udGgoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGxldCB0bXAgPSBkYXRlRm5zLmFkZE1vbnRocyh0aGlzLm1vbnRoLCAxKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wLCBmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgdXBkYXRlSGVhZGluZygpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oZWFkaW5nID0ge1xuICAgICAgbW9udGg6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KHRoaXMuc2VsZWN0ZWQsIHsgbW9udGg6ICdsb25nJyB9KSxcbiAgICAgIHllYXI6IHRoaXMuc2VsZWN0ZWQuZ2V0RnVsbFllYXIoKSxcbiAgICAgIGRheTogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5zZWxlY3RlZCwgeyB3ZWVrZGF5OiAnbG9uZycgfSksXG4gICAgICBkYXRlOiB0aGlzLnNlbGVjdGVkLmdldERhdGUoKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgdGltZSBhc3BlY3Qgb2YgdGhlIGRhdGVcbiAgICogQHBhcmFtIGRhdGVcbiAgICogQHJldHVybnMgd2l0aCB0aW1lIHN0cmlwcGVkIG91dFxuICAgKi9cbiAgcmVtb3ZlVGltZShkYXRlOiBhbnkpOiBEYXRlIHtcbiAgICBsZXQgcmV0ID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgcmV0LnNldEhvdXJzKDEyKTtcbiAgICByZXQuc2V0U2Vjb25kcygwKTtcbiAgICByZXQuc2V0TWlsbGlzZWNvbmRzKDApO1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBidWlsZE1vbnRoKHN0YXJ0OiBEYXRlLCBtb250aDogRGF0ZSkge1xuICAgIC8vIFJlc2V0IHRoZSB3ZWVrc1xuICAgIHRoaXMud2Vla3MgPSBbXTtcblxuICAgIC8vIEhvdXNlIGtlZXBpbmcgdmFyaWFibGVzIHRvIGtub3cgd2hlbiB3ZSBhcmUgZG9uZSBidWlsZGluZyB0aGUgbW9udGhcbiAgICBsZXQgZG9uZSA9IGZhbHNlLFxuICAgICAgZGF0ZSA9IGRhdGVGbnMuc3RhcnRPZldlZWsoc3RhcnQsIHsgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydCB9KSxcbiAgICAgIG1vbnRoSW5kZXggPSBkYXRlLmdldE1vbnRoKCksXG4gICAgICBjb3VudCA9IDA7XG5cbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgIC8vIEJ1aWxkIHRoZSBkYXlzIGZvciB0aGUgd2Vla3NcbiAgICAgIHRoaXMud2Vla3MucHVzaCh7IGRheXM6IHRoaXMuYnVpbGRXZWVrKG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKSwgbW9udGgpIH0pO1xuXG4gICAgICAvLyBJbmNyZW1lbnQgdmFyaWFibGVzIGZvciB0aGUgbmV4dCBpdGVyYXRpb25cbiAgICAgIGRhdGUgPSBkYXRlRm5zLmFkZERheXMoZGF0ZSwgNyk7XG4gICAgICBkb25lID0gY291bnQrKyA+IDIgJiYgbW9udGhJbmRleCAhPT0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICB9XG4gIH1cblxuICBidWlsZFdlZWsoZGF0ZTogRGF0ZSwgbW9udGg6IERhdGUpOiBBcnJheTxPYmplY3Q+IHtcbiAgICAvLyBCdWlsZCBvdXQgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWtcbiAgICBsZXQgZGF5cyA9IFtdO1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBkYXlzIG9mIHRoZSB3ZWVrXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgIC8vIFB1c2ggYSB2YXJpYWJsZSBvbiB0aGUgZGF5IGFycmF5IHdpdGggbG90cyBvZiBoZWxwZXJzIHRvIG1ha2UgdGhlIHRlbXBsYXRlIGVhc2llclxuICAgICAgZGF5cy5wdXNoKHtcbiAgICAgICAgbmFtZTogdGhpcy53ZWVrZGF5c1tpXSxcbiAgICAgICAgbnVtYmVyOiBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgaXNUb2RheTogZGF0ZUZucy5pc1RvZGF5KGRhdGUpLFxuICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEluY3JlbWVudCBmb3IgdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICBkYXRlID0gZGF0ZUZucy5hZGREYXlzKGRhdGUsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXlzO1xuICB9XG5cbiAgdG9nZ2xlUmFuZ2VTZWxlY3QocmFuZ2U6IHJhbmdlU2VsZWN0TW9kZXMpOiB2b2lkIHtcbiAgICB0aGlzLnJhbmdlU2VsZWN0TW9kZSA9IHJhbmdlO1xuICB9XG5cbiAgcmFuZ2VIb3ZlcihldmVudDogRXZlbnQsIGRheTogRGF5KTogdm9pZCB7XG4gICAgdGhpcy5ob3ZlckRheSA9IGRheS5kYXRlO1xuICB9XG5cbiAgLy8gVmFsdWVBY2Nlc3NvciBGdW5jdGlvbnNcbiAgd3JpdGVWYWx1ZShtb2RlbDogbW9kZWxUeXBlcyk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICBpZiAoSGVscGVycy5pc0RhdGUobW9kZWwpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcobW9kZWwsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxufVxuIl19