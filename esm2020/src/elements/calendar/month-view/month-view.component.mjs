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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { addDays, isAfter, isBefore, isSameDay, isToday, startOfMonth, startOfWeek } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
import { BooleanInput } from '../../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/novo-label-service";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../../button/Button";
import * as i4 from "@angular/common";
export class NovoMonthViewElement {
    constructor(labels, element, cdr, _sanitizer) {
        this.labels = labels;
        this.element = element;
        this.cdr = cdr;
        this._sanitizer = _sanitizer;
        this.activeDate = new Date();
        // Weekstart must be 0-6 (Sunday - Saturday)
        this.selected = [];
        this.preview = [];
        this.overlays = [];
        this.isRange = false;
        this.hideOverflowDays = false;
        this._weekStartsOn = 0;
        // Select callback for output
        this.select = new EventEmitter(false);
        // Select callback for output
        this.hover = new EventEmitter(false);
        // List of all the weekdays
        this.weekdays = this.labels.getWeekdays(this.weekStartsOn);
        // List of all months
        this.monthNames = this.labels.getMonths();
    }
    get weekStartsOn() {
        return this._weekStartsOn;
    }
    set weekStartsOn(value) {
        this._weekStartsOn = value;
        this.weekdays = this.labels.getWeekdays(value);
        this.updateView(this.activeDate);
    }
    ngOnInit() {
        // Set labels
        this.updateView(this.activeDate);
    }
    updateView(date) {
        this.monthLabel = this.labels.formatDateWithFormat(this.activeDate, { month: 'short' });
        this.buildMonth(this.activeDate);
    }
    onSelect(event, day) {
        // Helpers.swallowEvent(event);
        this.select.next({ event, day });
        this.cdr.markForCheck();
    }
    onHover(event, day) {
        this.isRange && this.hover.next({ event, day });
    }
    buildMonth(month) {
        // Reset the weeks
        this.weeks = [];
        const start = startOfMonth(month);
        // House keeping variables to know when we are done building the month
        let done = false, date = startOfWeek(start, { weekStartsOn: this.weekStartsOn }), monthIndex = date.getMonth(), count = 0;
        while (!done) {
            // Build the days for the weeks
            this.weeks.push({ days: this.buildWeek(new Date(date.getTime()), month) });
            // Increment variables for the next iteration
            date = addDays(date, 7);
            done = count++ > 2 && monthIndex !== date.getMonth();
            monthIndex = date.getMonth();
        }
    }
    buildWeek(date, month) {
        // Build out of the days of the week
        const days = [];
        // Iterate over the days of the week
        for (let i = 0; i < 7; i++) {
            // Push a variable on the day array with lots of helpers to make the template easier
            days.push({
                name: this.weekdays[i],
                number: date.getDate(),
                isToday: isToday(date),
                date,
            });
            // Increment for the next iteration
            date = addDays(date, 1);
        }
        return days;
    }
    isDisabled(day) {
        return (this.minDate && isBefore(day, this.minDate)) || (this.maxDate && isAfter(day, this.maxDate));
    }
    /** Returns whether a cell should be marked as selected. */
    _isSelected(value) {
        return this.selected && this.selected.find((d) => isSameDay(d, value));
    }
    /** Returns whether a cell should be marked as preview. */
    _isPreview(value) {
        return this.preview && this.preview.find((d) => isSameDay(d, value));
    }
    /** Returns whether a cell should be marked as an overlay. */
    _isOverlay(value) {
        return this.overlays && this.overlays.find((o) => isSameDay(o.date, value));
    }
    /** Returns whether a cell should be marked as an overlay. */
    _hasOverlayType(value) {
        let overlay = this.overlays && this.overlays.find((o) => isSameDay(o.date, value));
        return overlay ? overlay.type : null;
    }
    /** Gets whether a value is the start of the main range. */
    _isRangeStart(value) {
        return isStart(value, this.selected, this.isRange);
    }
    /** Gets whether a value is the end of the main range. */
    _isRangeEnd(value) {
        return isEnd(value, this.selected, this.isRange);
    }
    /** Gets whether a value is within the currently-selected range. */
    _isInRange(value) {
        return isInRange(value, this.selected, this.isRange);
    }
    /** Gets whether a value is the start of the preview range. */
    _isPreviewStart(value) {
        return isStart(value, this.preview, this.isRange);
    }
    /** Gets whether a value is the end of the preview range. */
    _isPreviewEnd(value) {
        return isEnd(value, this.preview, this.isRange);
    }
    /** Gets whether a value is inside the preview range. */
    _isInPreview(value) {
        return isInRange(value, this.preview, this.isRange);
    }
}
NovoMonthViewElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMonthViewElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoMonthViewElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoMonthViewElement, selector: "novo-month-view", inputs: { minDate: "minDate", maxDate: "maxDate", activeDate: "activeDate", selected: "selected", preview: "preview", overlays: "overlays", disabledDateMessage: "disabledDateMessage", isRange: "isRange", hideOverflowDays: "hideOverflowDays", weekStartsOn: "weekStartsOn" }, outputs: { select: "select", hover: "hover" }, host: { properties: { "class.hide-overflow-days": "this.hideOverflowDays" } }, ngImport: i0, template: "<div class=\"calendar-table\" cellspacing=\"0\" cellpadding=\"0\">\n  <div class=\"calendar-thead\">\n    <div class=\"calendar-th weekday\" *ngFor=\"let day of weekdays\" title=\"{{ day }}\"\n      [attr.data-automation-id]=\"day.substr(0, 2)\">\n      {{ day.substr(0, 2) }}\n    </div>\n  </div>\n  <div class=\"calendar-body\">\n    <div class=\"calendar-week\" *ngFor=\"let week of weeks\">\n      <div class=\"calendar-date\" *ngFor=\"let day of week.days\"\n        [class.today]=\"day.isToday\"\n        [class.notinmonth]=\"day.date.getMonth() !== activeDate.getMonth()\"\n        [class.selected]=\"_isSelected(day.date)\"\n        [class.preview]=\"_isPreview(day.date)\"\n        [class.overlay]=\"_isOverlay(day.date)\"\n        [class]=\"_hasOverlayType(day.date)\"\n        [class.inRange]=\"_isInRange(day.date)\"\n        [class.rangeStart]=\"_isRangeStart(day.date)\"\n        [class.rangeEnd]=\"_isRangeEnd(day.date)\"\n        [class.inPreview]=\"_isInPreview(day.date)\"\n        [class.previewStart]=\"_isPreviewStart(day.date)\"\n        [class.previewEnd]=\"_isPreviewEnd(day.date)\"\n        [class.calendar-date]=\"true\"\n        [attr.aria-label]=\"day.name\"\n        [attr.aria-disabled]=\"isDisabled(day.date)\"\n        [attr.aria-selected]=\"_isSelected(day.date)\"\n        [attr.data-automation-id]=\"day.number\"\n        [title]=\"isDisabled(day.date) ? disabledDateMessage : ''\"\n        (mouseover)=\"onHover($event, day)\">\n        <novo-button\n          class=\"day\"\n          [attr.data-automation-id]=\"day.number\"\n          [disabled]=\"isDisabled(day.date)\"\n          (click)=\"onSelect($event, day)\">\n          {{ day.number }}\n        </novo-button>\n      </div>\n    </div>\n  </div>\n</div>", styles: [":host{background:var(--background-bright);width:100%;height:-webkit-min-content;height:-moz-min-content;height:min-content;position:relative}:host .calendar-table{display:table}:host .calendar-table .calendar-thead{display:table-header-group}:host .calendar-table .calendar-th{display:table-cell;width:30px;padding:10px 0}:host .calendar-table .calendar-body{display:table-row-group}:host .calendar-table .calendar-week{display:table-row}:host .calendar-table .month,:host .calendar-table .year{text-align:center;padding:4px 15px;color:#666;overflow-x:hidden;text-overflow:ellipsis;margin:5px;font-weight:400;border-radius:3px}:host .calendar-table .month.selected,:host .calendar-table .year.selected{background-color:var(--selection);color:#fff}:host .calendar-table .month:hover,:host .calendar-table .year:hover{cursor:pointer;background-color:var(--selection);color:#fff}:host .calendar-table .day{height:3.2rem;width:3.2rem;line-height:1;font-size:1.2rem;padding:1px;border:none;background-color:transparent;border-radius:50%;box-shadow:inset 0 0 0 2px transparent;transition:box-shadow .14s ease-in-out;position:relative;color:#3d464d;color:var(--text-main, #3d464d)}:host .calendar-table .day:focus{outline:none}:host .calendar-table .day:disabled{color:var(--text-disabled);cursor:not-allowed!important;box-shadow:none!important}:host .calendar-table .calendar-date{display:table-cell}:host .calendar-table .calendar-date.notinmonth,:host .calendar-table .calendar-date.notinmonth:not(.selected)>.day{color:var(--text-disabled)}:host .calendar-table .calendar-date:hover .day{cursor:pointer;box-shadow:inset 0 0 0 2px var(--selection)}:host .calendar-table .calendar-date.inRange:hover .day{box-shadow:inset 0 0 0 2px #fff}:host .calendar-table .calendar-date.inRange{background:var(--selection);color:#fff;height:3.2rem;width:3.2rem;border-radius:0}:host .calendar-table .calendar-date.inRange .day{color:#fff}:host .calendar-table .calendar-date.rangeStart{border-radius:50% 0 0 50%;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeStart:before{content:\"\";position:absolute;height:100%;background:#4a89dc;width:10px;top:0;right:-5px;z-index:-1}:host .calendar-table .calendar-date.rangeEnd{border-radius:0 50% 50% 0;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeEnd:before{content:\"\";position:absolute;height:100%;background:var(--selection);width:10px;top:0;left:-5px;z-index:-1}:host .calendar-table .calendar-date.selected .day{background:var(--selection);color:#fff}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd) .day{border:1px dashed var(--selection)}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd).selected .day{border:1px dashed #9dbeff}:host .calendar-table .calendar-date.today .day:after{content:\"\";position:absolute;top:0;left:0;border-radius:100%;width:100%;height:100%;max-width:3.2rem;margin:0 auto;box-shadow:inset 0 0 0 2px #dbdbdb}:host .calendar-table .calendar-date.today.inRange .day:after,:host .calendar-table .calendar-date.today.selected .day:after{box-shadow:inset 0 0 0 2px #9dbeff}:host .calendar-table .calendar-date.inPreview .day{border-radius:0;border-top:1px dashed #4a89dc;border-bottom:1px dashed #4a89dc}:host .calendar-table .calendar-date.previewStart .day{border-radius:50% 0 0 50%;box-shadow:none!important;border-left:1px dashed #4a89dc}:host .calendar-table .calendar-date.previewEnd .day{border-radius:0 50% 50% 0;box-shadow:none!important;border-right:1px dashed #4a89dc}\n"], components: [{ type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoMonthViewElement.prototype, "isRange", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoMonthViewElement.prototype, "hideOverflowDays", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMonthViewElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-month-view', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"calendar-table\" cellspacing=\"0\" cellpadding=\"0\">\n  <div class=\"calendar-thead\">\n    <div class=\"calendar-th weekday\" *ngFor=\"let day of weekdays\" title=\"{{ day }}\"\n      [attr.data-automation-id]=\"day.substr(0, 2)\">\n      {{ day.substr(0, 2) }}\n    </div>\n  </div>\n  <div class=\"calendar-body\">\n    <div class=\"calendar-week\" *ngFor=\"let week of weeks\">\n      <div class=\"calendar-date\" *ngFor=\"let day of week.days\"\n        [class.today]=\"day.isToday\"\n        [class.notinmonth]=\"day.date.getMonth() !== activeDate.getMonth()\"\n        [class.selected]=\"_isSelected(day.date)\"\n        [class.preview]=\"_isPreview(day.date)\"\n        [class.overlay]=\"_isOverlay(day.date)\"\n        [class]=\"_hasOverlayType(day.date)\"\n        [class.inRange]=\"_isInRange(day.date)\"\n        [class.rangeStart]=\"_isRangeStart(day.date)\"\n        [class.rangeEnd]=\"_isRangeEnd(day.date)\"\n        [class.inPreview]=\"_isInPreview(day.date)\"\n        [class.previewStart]=\"_isPreviewStart(day.date)\"\n        [class.previewEnd]=\"_isPreviewEnd(day.date)\"\n        [class.calendar-date]=\"true\"\n        [attr.aria-label]=\"day.name\"\n        [attr.aria-disabled]=\"isDisabled(day.date)\"\n        [attr.aria-selected]=\"_isSelected(day.date)\"\n        [attr.data-automation-id]=\"day.number\"\n        [title]=\"isDisabled(day.date) ? disabledDateMessage : ''\"\n        (mouseover)=\"onHover($event, day)\">\n        <novo-button\n          class=\"day\"\n          [attr.data-automation-id]=\"day.number\"\n          [disabled]=\"isDisabled(day.date)\"\n          (click)=\"onSelect($event, day)\">\n          {{ day.number }}\n        </novo-button>\n      </div>\n    </div>\n  </div>\n</div>", styles: [":host{background:var(--background-bright);width:100%;height:-webkit-min-content;height:-moz-min-content;height:min-content;position:relative}:host .calendar-table{display:table}:host .calendar-table .calendar-thead{display:table-header-group}:host .calendar-table .calendar-th{display:table-cell;width:30px;padding:10px 0}:host .calendar-table .calendar-body{display:table-row-group}:host .calendar-table .calendar-week{display:table-row}:host .calendar-table .month,:host .calendar-table .year{text-align:center;padding:4px 15px;color:#666;overflow-x:hidden;text-overflow:ellipsis;margin:5px;font-weight:400;border-radius:3px}:host .calendar-table .month.selected,:host .calendar-table .year.selected{background-color:var(--selection);color:#fff}:host .calendar-table .month:hover,:host .calendar-table .year:hover{cursor:pointer;background-color:var(--selection);color:#fff}:host .calendar-table .day{height:3.2rem;width:3.2rem;line-height:1;font-size:1.2rem;padding:1px;border:none;background-color:transparent;border-radius:50%;box-shadow:inset 0 0 0 2px transparent;transition:box-shadow .14s ease-in-out;position:relative;color:#3d464d;color:var(--text-main, #3d464d)}:host .calendar-table .day:focus{outline:none}:host .calendar-table .day:disabled{color:var(--text-disabled);cursor:not-allowed!important;box-shadow:none!important}:host .calendar-table .calendar-date{display:table-cell}:host .calendar-table .calendar-date.notinmonth,:host .calendar-table .calendar-date.notinmonth:not(.selected)>.day{color:var(--text-disabled)}:host .calendar-table .calendar-date:hover .day{cursor:pointer;box-shadow:inset 0 0 0 2px var(--selection)}:host .calendar-table .calendar-date.inRange:hover .day{box-shadow:inset 0 0 0 2px #fff}:host .calendar-table .calendar-date.inRange{background:var(--selection);color:#fff;height:3.2rem;width:3.2rem;border-radius:0}:host .calendar-table .calendar-date.inRange .day{color:#fff}:host .calendar-table .calendar-date.rangeStart{border-radius:50% 0 0 50%;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeStart:before{content:\"\";position:absolute;height:100%;background:#4a89dc;width:10px;top:0;right:-5px;z-index:-1}:host .calendar-table .calendar-date.rangeEnd{border-radius:0 50% 50% 0;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeEnd:before{content:\"\";position:absolute;height:100%;background:var(--selection);width:10px;top:0;left:-5px;z-index:-1}:host .calendar-table .calendar-date.selected .day{background:var(--selection);color:#fff}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd) .day{border:1px dashed var(--selection)}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd).selected .day{border:1px dashed #9dbeff}:host .calendar-table .calendar-date.today .day:after{content:\"\";position:absolute;top:0;left:0;border-radius:100%;width:100%;height:100%;max-width:3.2rem;margin:0 auto;box-shadow:inset 0 0 0 2px #dbdbdb}:host .calendar-table .calendar-date.today.inRange .day:after,:host .calendar-table .calendar-date.today.selected .day:after{box-shadow:inset 0 0 0 2px #9dbeff}:host .calendar-table .calendar-date.inPreview .day{border-radius:0;border-top:1px dashed #4a89dc;border-bottom:1px dashed #4a89dc}:host .calendar-table .calendar-date.previewStart .day{border-radius:50% 0 0 50%;box-shadow:none!important;border-left:1px dashed #4a89dc}:host .calendar-table .calendar-date.previewEnd .day{border-radius:0 50% 50% 0;box-shadow:none!important;border-right:1px dashed #4a89dc}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.DomSanitizer }]; }, propDecorators: { minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], selected: [{
                type: Input
            }], preview: [{
                type: Input
            }], overlays: [{
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], isRange: [{
                type: Input
            }], hideOverflowDays: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.hide-overflow-days']
            }], weekStartsOn: [{
                type: Input
            }], select: [{
                type: Output
            }], hover: [{
                type: Output
            }] } });
/** Checks whether a value is the start of a range. */
function isStart(value, range, rangeEnabled) {
    const [start, end] = range ?? [];
    return rangeEnabled && end !== null && !isSameDay(start, end) && value < end && isSameDay(value, start);
}
/** Checks whether a value is the end of a range. */
function isEnd(value, range, rangeEnabled) {
    const [start, end] = range ?? [];
    return rangeEnabled && start !== null && !isSameDay(start, end) && value >= start && isSameDay(value, end);
}
/** Checks whether a value is inside of a range. */
function isInRange(value, range, rangeEnabled) {
    const [start, end] = range ?? [];
    return rangeEnabled && start !== null && end !== null && !isSameDay(start, end) && value >= start && value <= end;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jYWxlbmRhci9tb250aC12aWV3L21vbnRoLXZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvbW9udGgtdmlldy9tb250aC12aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTixPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUVMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsU0FBUztBQUNULE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFTOUMsTUFBTSxPQUFPLG9CQUFvQjtJQXFEL0IsWUFDUyxNQUF3QixFQUN2QixPQUFtQixFQUNuQixHQUFzQixFQUN0QixVQUF3QjtRQUh6QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQWM7UUFuRGxDLGVBQVUsR0FBUyxJQUFJLElBQUksRUFB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aGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBhZGREYXlzLCBpc0FmdGVyLCBpc0JlZm9yZSwgaXNTYW1lRGF5LCBpc1RvZGF5LCBzdGFydE9mTW9udGgsIHN0YXJ0T2ZXZWVrIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi8uLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IERhdGVMaWtlLCBEYXksIE92ZXJsYXlEYXRlIH0gZnJvbSAnLi4vLi4vZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW1vbnRoLXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9udGgtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21vbnRoLXZpZXcuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Nb250aFZpZXdFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbWluRGF0ZTogRGF0ZTtcbiAgQElucHV0KClcbiAgbWF4RGF0ZTogRGF0ZTtcbiAgQElucHV0KClcbiAgYWN0aXZlRGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIC8vIFdlZWtzdGFydCBtdXN0IGJlIDAtNiAoU3VuZGF5IC0gU2F0dXJkYXkpXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkOiBEYXRlTGlrZVtdID0gW107XG4gIEBJbnB1dCgpXG4gIHByZXZpZXc6IERhdGVMaWtlW10gPSBbXTtcbiAgQElucHV0KClcbiAgb3ZlcmxheXM6IE92ZXJsYXlEYXRlW10gPSBbXTtcbiAgQElucHV0KClcbiAgZGlzYWJsZWREYXRlTWVzc2FnZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBpc1JhbmdlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGlkZS1vdmVyZmxvdy1kYXlzJylcbiAgcHVibGljIGhpZGVPdmVyZmxvd0RheXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBfd2Vla1N0YXJ0c09uOiBudW1iZXIgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIGdldCB3ZWVrU3RhcnRzT24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fd2Vla1N0YXJ0c09uO1xuICB9XG4gIHNldCB3ZWVrU3RhcnRzT24odmFsdWUpIHtcbiAgICB0aGlzLl93ZWVrU3RhcnRzT24gPSB2YWx1ZTtcbiAgICB0aGlzLndlZWtkYXlzID0gdGhpcy5sYWJlbHMuZ2V0V2Vla2RheXModmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIGhvdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIC8vIExpc3Qgb2YgYWxsIHRoZSB3ZWVrZGF5c1xuICB3ZWVrZGF5czogc3RyaW5nW10gPSB0aGlzLmxhYmVscy5nZXRXZWVrZGF5cyh0aGlzLndlZWtTdGFydHNPbik7XG4gIC8vIExpc3Qgb2YgYWxsIG1vbnRoc1xuICBtb250aE5hbWVzOiBzdHJpbmdbXSA9IHRoaXMubGFiZWxzLmdldE1vbnRocygpO1xuXG4gIG1vbnRoTGFiZWw6IHN0cmluZztcbiAgd2Vla3M6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBTZXQgbGFiZWxzXG4gICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICB1cGRhdGVWaWV3KGRhdGU6IERhdGUpIHtcbiAgICB0aGlzLm1vbnRoTGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdCh0aGlzLmFjdGl2ZURhdGUsIHsgbW9udGg6ICdzaG9ydCcgfSk7XG4gICAgdGhpcy5idWlsZE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICBvblNlbGVjdChldmVudDogRXZlbnQsIGRheTogRGF5KSB7XG4gICAgLy8gSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VsZWN0Lm5leHQoeyBldmVudCwgZGF5IH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25Ib3ZlcihldmVudDogRXZlbnQsIGRheTogRGF5KTogdm9pZCB7XG4gICAgdGhpcy5pc1JhbmdlICYmIHRoaXMuaG92ZXIubmV4dCh7IGV2ZW50LCBkYXkgfSk7XG4gIH1cblxuICBidWlsZE1vbnRoKG1vbnRoOiBEYXRlKSB7XG4gICAgLy8gUmVzZXQgdGhlIHdlZWtzXG4gICAgdGhpcy53ZWVrcyA9IFtdO1xuICAgIGNvbnN0IHN0YXJ0ID0gc3RhcnRPZk1vbnRoKG1vbnRoKTtcblxuICAgIC8vIEhvdXNlIGtlZXBpbmcgdmFyaWFibGVzIHRvIGtub3cgd2hlbiB3ZSBhcmUgZG9uZSBidWlsZGluZyB0aGUgbW9udGhcbiAgICBsZXQgZG9uZSA9IGZhbHNlLFxuICAgICAgZGF0ZSA9IHN0YXJ0T2ZXZWVrKHN0YXJ0LCB7IHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24gfSksXG4gICAgICBtb250aEluZGV4ID0gZGF0ZS5nZXRNb250aCgpLFxuICAgICAgY291bnQgPSAwO1xuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAvLyBCdWlsZCB0aGUgZGF5cyBmb3IgdGhlIHdlZWtzXG4gICAgICB0aGlzLndlZWtzLnB1c2goeyBkYXlzOiB0aGlzLmJ1aWxkV2VlayhuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSksIG1vbnRoKSB9KTtcblxuICAgICAgLy8gSW5jcmVtZW50IHZhcmlhYmxlcyBmb3IgdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICBkYXRlID0gYWRkRGF5cyhkYXRlLCA3KTtcbiAgICAgIGRvbmUgPSBjb3VudCsrID4gMiAmJiBtb250aEluZGV4ICE9PSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICBtb250aEluZGV4ID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkV2VlayhkYXRlOiBEYXRlLCBtb250aDogRGF0ZSk6IEFycmF5PE9iamVjdD4ge1xuICAgIC8vIEJ1aWxkIG91dCBvZiB0aGUgZGF5cyBvZiB0aGUgd2Vla1xuICAgIGNvbnN0IGRheXMgPSBbXTtcbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGRheXMgb2YgdGhlIHdlZWtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgLy8gUHVzaCBhIHZhcmlhYmxlIG9uIHRoZSBkYXkgYXJyYXkgd2l0aCBsb3RzIG9mIGhlbHBlcnMgdG8gbWFrZSB0aGUgdGVtcGxhdGUgZWFzaWVyXG4gICAgICBkYXlzLnB1c2goe1xuICAgICAgICBuYW1lOiB0aGlzLndlZWtkYXlzW2ldLFxuICAgICAgICBudW1iZXI6IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICBpc1RvZGF5OiBpc1RvZGF5KGRhdGUpLFxuICAgICAgICBkYXRlLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEluY3JlbWVudCBmb3IgdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICBkYXRlID0gYWRkRGF5cyhkYXRlLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF5cztcbiAgfVxuXG4gIGlzRGlzYWJsZWQoZGF5OiBEYXRlTGlrZSkge1xuICAgIHJldHVybiAodGhpcy5taW5EYXRlICYmIGlzQmVmb3JlKGRheSwgdGhpcy5taW5EYXRlKSkgfHwgKHRoaXMubWF4RGF0ZSAmJiBpc0FmdGVyKGRheSwgdGhpcy5tYXhEYXRlKSk7XG4gIH1cblxuICAvKiogUmV0dXJucyB3aGV0aGVyIGEgY2VsbCBzaG91bGQgYmUgbWFya2VkIGFzIHNlbGVjdGVkLiAqL1xuICBfaXNTZWxlY3RlZCh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdGVkLmZpbmQoKGQpID0+IGlzU2FtZURheShkLCB2YWx1ZSkpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgd2hldGhlciBhIGNlbGwgc2hvdWxkIGJlIG1hcmtlZCBhcyBwcmV2aWV3LiAqL1xuICBfaXNQcmV2aWV3KHZhbHVlOiBEYXRlTGlrZSkge1xuICAgIHJldHVybiB0aGlzLnByZXZpZXcgJiYgdGhpcy5wcmV2aWV3LmZpbmQoKGQpID0+IGlzU2FtZURheShkLCB2YWx1ZSkpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgd2hldGhlciBhIGNlbGwgc2hvdWxkIGJlIG1hcmtlZCBhcyBhbiBvdmVybGF5LiAqL1xuICBfaXNPdmVybGF5KHZhbHVlOiBEYXRlTGlrZSkge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlzICYmIHRoaXMub3ZlcmxheXMuZmluZCgobykgPT4gaXNTYW1lRGF5KG8uZGF0ZSwgdmFsdWUpKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgYSBjZWxsIHNob3VsZCBiZSBtYXJrZWQgYXMgYW4gb3ZlcmxheS4gKi9cbiAgX2hhc092ZXJsYXlUeXBlKHZhbHVlOiBEYXRlTGlrZSkge1xuICAgIGxldCBvdmVybGF5ID0gdGhpcy5vdmVybGF5cyAmJiB0aGlzLm92ZXJsYXlzLmZpbmQoKG8pID0+IGlzU2FtZURheShvLmRhdGUsIHZhbHVlKSk7XG4gICAgcmV0dXJuIG92ZXJsYXkgPyBvdmVybGF5LnR5cGUgOiBudWxsO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIHRoZSBzdGFydCBvZiB0aGUgbWFpbiByYW5nZS4gKi9cbiAgX2lzUmFuZ2VTdGFydCh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gaXNTdGFydCh2YWx1ZSwgdGhpcy5zZWxlY3RlZCwgdGhpcy5pc1JhbmdlKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgZW5kIG9mIHRoZSBtYWluIHJhbmdlLiAqL1xuICBfaXNSYW5nZUVuZCh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gaXNFbmQodmFsdWUsIHRoaXMuc2VsZWN0ZWQsIHRoaXMuaXNSYW5nZSk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgd2l0aGluIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgcmFuZ2UuICovXG4gIF9pc0luUmFuZ2UodmFsdWU6IERhdGVMaWtlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzSW5SYW5nZSh2YWx1ZSwgdGhpcy5zZWxlY3RlZCwgdGhpcy5pc1JhbmdlKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgc3RhcnQgb2YgdGhlIHByZXZpZXcgcmFuZ2UuICovXG4gIF9pc1ByZXZpZXdTdGFydCh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gaXNTdGFydCh2YWx1ZSwgdGhpcy5wcmV2aWV3LCB0aGlzLmlzUmFuZ2UpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIHRoZSBlbmQgb2YgdGhlIHByZXZpZXcgcmFuZ2UuICovXG4gIF9pc1ByZXZpZXdFbmQodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIGlzRW5kKHZhbHVlLCB0aGlzLnByZXZpZXcsIHRoaXMuaXNSYW5nZSk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgaW5zaWRlIHRoZSBwcmV2aWV3IHJhbmdlLiAqL1xuICBfaXNJblByZXZpZXcodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIGlzSW5SYW5nZSh2YWx1ZSwgdGhpcy5wcmV2aWV3LCB0aGlzLmlzUmFuZ2UpO1xuICB9XG59XG5cbi8qKiBDaGVja3Mgd2hldGhlciBhIHZhbHVlIGlzIHRoZSBzdGFydCBvZiBhIHJhbmdlLiAqL1xuZnVuY3Rpb24gaXNTdGFydCh2YWx1ZTogRGF0ZUxpa2UsIHJhbmdlOiBEYXRlTGlrZVtdIHwgbnVsbCwgcmFuZ2VFbmFibGVkOiBib29sZWFuKTogYm9vbGVhbiB7XG4gIGNvbnN0IFtzdGFydCwgZW5kXSA9IHJhbmdlID8/IFtdO1xuICByZXR1cm4gcmFuZ2VFbmFibGVkICYmIGVuZCAhPT0gbnVsbCAmJiAhaXNTYW1lRGF5KHN0YXJ0LCBlbmQpICYmIHZhbHVlIDwgZW5kICYmIGlzU2FtZURheSh2YWx1ZSwgc3RhcnQpO1xufVxuXG4vKiogQ2hlY2tzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgZW5kIG9mIGEgcmFuZ2UuICovXG5mdW5jdGlvbiBpc0VuZCh2YWx1ZTogRGF0ZUxpa2UsIHJhbmdlOiBEYXRlTGlrZVtdIHwgbnVsbCwgcmFuZ2VFbmFibGVkOiBib29sZWFuKTogYm9vbGVhbiB7XG4gIGNvbnN0IFtzdGFydCwgZW5kXSA9IHJhbmdlID8/IFtdO1xuICByZXR1cm4gcmFuZ2VFbmFibGVkICYmIHN0YXJ0ICE9PSBudWxsICYmICFpc1NhbWVEYXkoc3RhcnQsIGVuZCkgJiYgdmFsdWUgPj0gc3RhcnQgJiYgaXNTYW1lRGF5KHZhbHVlLCBlbmQpO1xufVxuXG4vKiogQ2hlY2tzIHdoZXRoZXIgYSB2YWx1ZSBpcyBpbnNpZGUgb2YgYSByYW5nZS4gKi9cbmZ1bmN0aW9uIGlzSW5SYW5nZSh2YWx1ZTogRGF0ZUxpa2UsIHJhbmdlOiBEYXRlTGlrZVtdIHwgbnVsbCwgcmFuZ2VFbmFibGVkOiBib29sZWFuKTogYm9vbGVhbiB7XG4gIGNvbnN0IFtzdGFydCwgZW5kXSA9IHJhbmdlID8/IFtdO1xuICByZXR1cm4gcmFuZ2VFbmFibGVkICYmIHN0YXJ0ICE9PSBudWxsICYmIGVuZCAhPT0gbnVsbCAmJiAhaXNTYW1lRGF5KHN0YXJ0LCBlbmQpICYmIHZhbHVlID49IHN0YXJ0ICYmIHZhbHVlIDw9IGVuZDtcbn1cbiIsIjxkaXYgY2xhc3M9XCJjYWxlbmRhci10YWJsZVwiIGNlbGxzcGFjaW5nPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiPlxuICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItdGhlYWRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItdGggd2Vla2RheVwiICpuZ0Zvcj1cImxldCBkYXkgb2Ygd2Vla2RheXNcIiB0aXRsZT1cInt7IGRheSB9fVwiXG4gICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiZGF5LnN1YnN0cigwLCAyKVwiPlxuICAgICAge3sgZGF5LnN1YnN0cigwLCAyKSB9fVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWJvZHlcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItd2Vla1wiICpuZ0Zvcj1cImxldCB3ZWVrIG9mIHdlZWtzXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItZGF0ZVwiICpuZ0Zvcj1cImxldCBkYXkgb2Ygd2Vlay5kYXlzXCJcbiAgICAgICAgW2NsYXNzLnRvZGF5XT1cImRheS5pc1RvZGF5XCJcbiAgICAgICAgW2NsYXNzLm5vdGlubW9udGhdPVwiZGF5LmRhdGUuZ2V0TW9udGgoKSAhPT0gYWN0aXZlRGF0ZS5nZXRNb250aCgpXCJcbiAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cIl9pc1NlbGVjdGVkKGRheS5kYXRlKVwiXG4gICAgICAgIFtjbGFzcy5wcmV2aWV3XT1cIl9pc1ByZXZpZXcoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLm92ZXJsYXldPVwiX2lzT3ZlcmxheShkYXkuZGF0ZSlcIlxuICAgICAgICBbY2xhc3NdPVwiX2hhc092ZXJsYXlUeXBlKGRheS5kYXRlKVwiXG4gICAgICAgIFtjbGFzcy5pblJhbmdlXT1cIl9pc0luUmFuZ2UoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLnJhbmdlU3RhcnRdPVwiX2lzUmFuZ2VTdGFydChkYXkuZGF0ZSlcIlxuICAgICAgICBbY2xhc3MucmFuZ2VFbmRdPVwiX2lzUmFuZ2VFbmQoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLmluUHJldmlld109XCJfaXNJblByZXZpZXcoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLnByZXZpZXdTdGFydF09XCJfaXNQcmV2aWV3U3RhcnQoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLnByZXZpZXdFbmRdPVwiX2lzUHJldmlld0VuZChkYXkuZGF0ZSlcIlxuICAgICAgICBbY2xhc3MuY2FsZW5kYXItZGF0ZV09XCJ0cnVlXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJkYXkubmFtZVwiXG4gICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiaXNEaXNhYmxlZChkYXkuZGF0ZSlcIlxuICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIl9pc1NlbGVjdGVkKGRheS5kYXRlKVwiXG4gICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJkYXkubnVtYmVyXCJcbiAgICAgICAgW3RpdGxlXT1cImlzRGlzYWJsZWQoZGF5LmRhdGUpID8gZGlzYWJsZWREYXRlTWVzc2FnZSA6ICcnXCJcbiAgICAgICAgKG1vdXNlb3Zlcik9XCJvbkhvdmVyKCRldmVudCwgZGF5KVwiPlxuICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICBjbGFzcz1cImRheVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImRheS5udW1iZXJcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0Rpc2FibGVkKGRheS5kYXRlKVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uU2VsZWN0KCRldmVudCwgZGF5KVwiPlxuICAgICAgICAgIHt7IGRheS5udW1iZXIgfX1cbiAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PiJdfQ==