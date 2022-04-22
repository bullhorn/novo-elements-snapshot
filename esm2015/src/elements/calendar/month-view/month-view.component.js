import { __decorate, __metadata } from "tslib";
// NG2
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { addDays, isAfter, isBefore, isSameDay, isToday, startOfMonth, startOfWeek } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
import { BooleanInput } from '../../../utils';
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
NovoMonthViewElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-month-view',
                template: "<div class=\"calendar-table\" cellspacing=\"0\" cellpadding=\"0\">\n  <div class=\"calendar-thead\">\n    <div class=\"calendar-th weekday\" *ngFor=\"let day of weekdays\" title=\"{{ day }}\"\n      [attr.data-automation-id]=\"day.substr(0, 2)\">\n      {{ day.substr(0, 2) }}\n    </div>\n  </div>\n  <div class=\"calendar-body\">\n    <div class=\"calendar-week\" *ngFor=\"let week of weeks\">\n      <div class=\"calendar-date\" *ngFor=\"let day of week.days\"\n        [class.today]=\"day.isToday\"\n        [class.notinmonth]=\"day.date.getMonth() !== activeDate.getMonth()\"\n        [class.selected]=\"_isSelected(day.date)\"\n        [class.preview]=\"_isPreview(day.date)\"\n        [class.overlay]=\"_isOverlay(day.date)\"\n        [class]=\"_hasOverlayType(day.date)\"\n        [class.inRange]=\"_isInRange(day.date)\"\n        [class.rangeStart]=\"_isRangeStart(day.date)\"\n        [class.rangeEnd]=\"_isRangeEnd(day.date)\"\n        [class.inPreview]=\"_isInPreview(day.date)\"\n        [class.previewStart]=\"_isPreviewStart(day.date)\"\n        [class.previewEnd]=\"_isPreviewEnd(day.date)\"\n        [class.calendar-date]=\"true\"\n        [attr.aria-label]=\"day.name\"\n        [attr.aria-disabled]=\"isDisabled(day.date)\"\n        [attr.aria-selected]=\"_isSelected(day.date)\"\n        [attr.data-automation-id]=\"day.number\"\n        [title]=\"isDisabled(day.date) ? disabledDateMessage : ''\"\n        (mouseover)=\"onHover($event, day)\">\n        <novo-button\n          class=\"day\"\n          [attr.data-automation-id]=\"day.number\"\n          [disabled]=\"isDisabled(day.date)\"\n          (click)=\"onSelect($event, day)\">\n          {{ day.number }}\n        </novo-button>\n      </div>\n    </div>\n  </div>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{background:var(--background-bright);height:-webkit-min-content;height:-moz-min-content;height:min-content;position:relative;width:100%}:host .calendar-table{display:table}:host .calendar-table .calendar-thead{display:table-header-group}:host .calendar-table .calendar-th{display:table-cell;padding:10px 0;width:30px}:host .calendar-table .calendar-body{display:table-row-group}:host .calendar-table .calendar-week{display:table-row}:host .calendar-table .month,:host .calendar-table .year{border-radius:3px;color:#666;font-weight:400;margin:5px;overflow-x:hidden;padding:4px 15px;text-align:center;text-overflow:ellipsis}:host .calendar-table .month.selected,:host .calendar-table .year.selected{background-color:var(--selection);color:#fff}:host .calendar-table .month:hover,:host .calendar-table .year:hover{background-color:var(--selection);color:#fff;cursor:pointer}:host .calendar-table .day{background-color:transparent;border:none;border-radius:50%;box-shadow:inset 0 0 0 2px transparent;color:var(--text-main,#3d464d);font-size:1.2rem;height:3.2rem;line-height:1;padding:1px;position:relative;transition:box-shadow .14s ease-in-out;width:3.2rem}:host .calendar-table .day:focus{outline:none}:host .calendar-table .day:disabled{box-shadow:none!important;color:var(--text-disabled);cursor:not-allowed!important}:host .calendar-table .calendar-date{display:table-cell}:host .calendar-table .calendar-date.notinmonth,:host .calendar-table .calendar-date.notinmonth:not(.selected)>.day{color:var(--text-disabled)}:host .calendar-table .calendar-date:hover .day{box-shadow:inset 0 0 0 2px var(--selection);cursor:pointer}:host .calendar-table .calendar-date.inRange:hover .day{box-shadow:inset 0 0 0 2px #fff}:host .calendar-table .calendar-date.inRange{background:var(--selection);border-radius:0;color:#fff;height:3.2rem;width:3.2rem}:host .calendar-table .calendar-date.inRange .day{color:#fff}:host .calendar-table .calendar-date.rangeStart{border-radius:50% 0 0 50%;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeStart:before{background:#4a89dc;content:\"\";height:100%;position:absolute;right:-5px;top:0;width:10px;z-index:-1}:host .calendar-table .calendar-date.rangeEnd{border-radius:0 50% 50% 0;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeEnd:before{background:var(--selection);content:\"\";height:100%;left:-5px;position:absolute;top:0;width:10px;z-index:-1}:host .calendar-table .calendar-date.selected .day{background:var(--selection);color:#fff}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd) .day{border:1px dashed var(--selection)}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd).selected .day{border:1px dashed #9dbeff}:host .calendar-table .calendar-date.today .day:after{border-radius:100%;box-shadow:inset 0 0 0 2px #dbdbdb;content:\"\";height:100%;left:0;margin:0 auto;max-width:3.2rem;position:absolute;top:0;width:100%}:host .calendar-table .calendar-date.today.inRange .day:after,:host .calendar-table .calendar-date.today.selected .day:after{box-shadow:inset 0 0 0 2px #9dbeff}:host .calendar-table .calendar-date.inPreview .day{border-bottom:1px dashed #4a89dc;border-radius:0;border-top:1px dashed #4a89dc}:host .calendar-table .calendar-date.previewStart .day{border-bottom-right-radius:0;border-left:1px dashed #4a89dc;border-radius:50%;border-top-right-radius:0;box-shadow:none!important}:host .calendar-table .calendar-date.previewEnd .day{border-bottom-left-radius:0;border-radius:50%;border-right:1px dashed #4a89dc;border-top-left-radius:0;box-shadow:none!important}"]
            },] }
];
NovoMonthViewElement.ctorParameters = () => [
    { type: NovoLabelService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: DomSanitizer }
];
NovoMonthViewElement.propDecorators = {
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    preview: [{ type: Input }],
    overlays: [{ type: Input }],
    disabledDateMessage: [{ type: Input }],
    isRange: [{ type: Input }],
    hideOverflowDays: [{ type: Input }, { type: HostBinding, args: ['class.hide-overflow-days',] }],
    weekStartsOn: [{ type: Input }],
    select: [{ type: Output }],
    hover: [{ type: Output }]
};
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoMonthViewElement.prototype, "isRange", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoMonthViewElement.prototype, "hideOverflowDays", void 0);
/** Checks whether a value is the start of a range. */
function isStart(value, range, rangeEnabled) {
    const [start, end] = range !== null && range !== void 0 ? range : [];
    return rangeEnabled && end !== null && !isSameDay(start, end) && value < end && isSameDay(value, start);
}
/** Checks whether a value is the end of a range. */
function isEnd(value, range, rangeEnabled) {
    const [start, end] = range !== null && range !== void 0 ? range : [];
    return rangeEnabled && start !== null && !isSameDay(start, end) && value >= start && isSameDay(value, end);
}
/** Checks whether a value is inside of a range. */
function isInRange(value, range, rangeEnabled) {
    const [start, end] = range !== null && range !== void 0 ? range : [];
    return rangeEnabled && start !== null && end !== null && !isSameDay(start, end) && value >= start && value <= end;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvY2FsZW5kYXIvbW9udGgtdmlldy9tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBRUwsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxTQUFTO0FBQ1QsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFTOUMsTUFBTSxPQUFPLG9CQUFvQjtJQXFEL0IsWUFDUyxNQUF3QixFQUN2QixPQUFtQixFQUNuQixHQUFzQixFQUN0QixVQUF3QjtRQUh6QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQWM7UUFuRGxDLGVBQVUsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzlCLDRDQUE0QztRQUU1QyxhQUFRLEdBQWUsRUFBRSxDQUFDO1FBRTFCLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFFekIsYUFBUSxHQUFrQixFQUFF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akMsT0FBTyxZQUFZLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzFHLENBQUM7QUFFRCxvREFBb0Q7QUFDcEQsU0FBUyxLQUFLLENBQUMsS0FBZSxFQUFFLEtBQXdCLEVBQUUsWUFBcUI7SUFDN0UsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUM7SUFDakMsT0FBTyxZQUFZLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdHLENBQUM7QUFFRCxtREFBbUQ7QUFDbkQsU0FBUyxTQUFTLENBQUMsS0FBZSxFQUFFLEtBQXdCLEVBQUUsWUFBcUI7SUFDakYsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUM7SUFDakMsT0FBTyxZQUFZLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7QUFDcEgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgYWRkRGF5cywgaXNBZnRlciwgaXNCZWZvcmUsIGlzU2FtZURheSwgaXNUb2RheSwgc3RhcnRPZk1vbnRoLCBzdGFydE9mV2VlayB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBEYXRlTGlrZSwgRGF5LCBPdmVybGF5RGF0ZSB9IGZyb20gJy4uLy4uL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1tb250aC12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21vbnRoLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tb250aC12aWV3LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTW9udGhWaWV3RWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIG1pbkRhdGU6IERhdGU7XG4gIEBJbnB1dCgpXG4gIG1heERhdGU6IERhdGU7XG4gIEBJbnB1dCgpXG4gIGFjdGl2ZURhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAvLyBXZWVrc3RhcnQgbXVzdCBiZSAwLTYgKFN1bmRheSAtIFNhdHVyZGF5KVxuICBASW5wdXQoKVxuICBzZWxlY3RlZDogRGF0ZUxpa2VbXSA9IFtdO1xuICBASW5wdXQoKVxuICBwcmV2aWV3OiBEYXRlTGlrZVtdID0gW107XG4gIEBJbnB1dCgpXG4gIG92ZXJsYXlzOiBPdmVybGF5RGF0ZVtdID0gW107XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkRGF0ZU1lc3NhZ2U6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgaXNSYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhpZGUtb3ZlcmZsb3ctZGF5cycpXG4gIHB1YmxpYyBoaWRlT3ZlcmZsb3dEYXlzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgX3dlZWtTdGFydHNPbjogbnVtYmVyID0gMDtcblxuICBASW5wdXQoKVxuICBnZXQgd2Vla1N0YXJ0c09uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3dlZWtTdGFydHNPbjtcbiAgfVxuICBzZXQgd2Vla1N0YXJ0c09uKHZhbHVlKSB7XG4gICAgdGhpcy5fd2Vla1N0YXJ0c09uID0gdmFsdWU7XG4gICAgdGhpcy53ZWVrZGF5cyA9IHRoaXMubGFiZWxzLmdldFdlZWtkYXlzKHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5hY3RpdmVEYXRlKTtcbiAgfVxuXG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XG4gIEBPdXRwdXQoKVxuICBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XG4gIEBPdXRwdXQoKVxuICBob3ZlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAvLyBMaXN0IG9mIGFsbCB0aGUgd2Vla2RheXNcbiAgd2Vla2RheXM6IHN0cmluZ1tdID0gdGhpcy5sYWJlbHMuZ2V0V2Vla2RheXModGhpcy53ZWVrU3RhcnRzT24pO1xuICAvLyBMaXN0IG9mIGFsbCBtb250aHNcbiAgbW9udGhOYW1lczogc3RyaW5nW10gPSB0aGlzLmxhYmVscy5nZXRNb250aHMoKTtcblxuICBtb250aExhYmVsOiBzdHJpbmc7XG4gIHdlZWtzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gU2V0IGxhYmVsc1xuICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgdXBkYXRlVmlldyhkYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5tb250aExhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5hY3RpdmVEYXRlLCB7IG1vbnRoOiAnc2hvcnQnIH0pO1xuICAgIHRoaXMuYnVpbGRNb250aCh0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgb25TZWxlY3QoZXZlbnQ6IEV2ZW50LCBkYXk6IERheSkge1xuICAgIC8vIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdC5uZXh0KHsgZXZlbnQsIGRheSB9KTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uSG92ZXIoZXZlbnQ6IEV2ZW50LCBkYXk6IERheSk6IHZvaWQge1xuICAgIHRoaXMuaXNSYW5nZSAmJiB0aGlzLmhvdmVyLm5leHQoeyBldmVudCwgZGF5IH0pO1xuICB9XG5cbiAgYnVpbGRNb250aChtb250aDogRGF0ZSkge1xuICAgIC8vIFJlc2V0IHRoZSB3ZWVrc1xuICAgIHRoaXMud2Vla3MgPSBbXTtcbiAgICBjb25zdCBzdGFydCA9IHN0YXJ0T2ZNb250aChtb250aCk7XG5cbiAgICAvLyBIb3VzZSBrZWVwaW5nIHZhcmlhYmxlcyB0byBrbm93IHdoZW4gd2UgYXJlIGRvbmUgYnVpbGRpbmcgdGhlIG1vbnRoXG4gICAgbGV0IGRvbmUgPSBmYWxzZSxcbiAgICAgIGRhdGUgPSBzdGFydE9mV2VlayhzdGFydCwgeyB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uIH0pLFxuICAgICAgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgIGNvdW50ID0gMDtcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgLy8gQnVpbGQgdGhlIGRheXMgZm9yIHRoZSB3ZWVrc1xuICAgICAgdGhpcy53ZWVrcy5wdXNoKHsgZGF5czogdGhpcy5idWlsZFdlZWsobmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpLCBtb250aCkgfSk7XG5cbiAgICAgIC8vIEluY3JlbWVudCB2YXJpYWJsZXMgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgZGF0ZSA9IGFkZERheXMoZGF0ZSwgNyk7XG4gICAgICBkb25lID0gY291bnQrKyA+IDIgJiYgbW9udGhJbmRleCAhPT0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICB9XG4gIH1cblxuICBidWlsZFdlZWsoZGF0ZTogRGF0ZSwgbW9udGg6IERhdGUpOiBBcnJheTxPYmplY3Q+IHtcbiAgICAvLyBCdWlsZCBvdXQgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWtcbiAgICBjb25zdCBkYXlzID0gW107XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBkYXlzIG9mIHRoZSB3ZWVrXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgIC8vIFB1c2ggYSB2YXJpYWJsZSBvbiB0aGUgZGF5IGFycmF5IHdpdGggbG90cyBvZiBoZWxwZXJzIHRvIG1ha2UgdGhlIHRlbXBsYXRlIGVhc2llclxuICAgICAgZGF5cy5wdXNoKHtcbiAgICAgICAgbmFtZTogdGhpcy53ZWVrZGF5c1tpXSxcbiAgICAgICAgbnVtYmVyOiBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgaXNUb2RheTogaXNUb2RheShkYXRlKSxcbiAgICAgICAgZGF0ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJbmNyZW1lbnQgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgZGF0ZSA9IGFkZERheXMoZGF0ZSwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRheXM7XG4gIH1cblxuICBpc0Rpc2FibGVkKGRheTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gKHRoaXMubWluRGF0ZSAmJiBpc0JlZm9yZShkYXksIHRoaXMubWluRGF0ZSkpIHx8ICh0aGlzLm1heERhdGUgJiYgaXNBZnRlcihkYXksIHRoaXMubWF4RGF0ZSkpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgd2hldGhlciBhIGNlbGwgc2hvdWxkIGJlIG1hcmtlZCBhcyBzZWxlY3RlZC4gKi9cbiAgX2lzU2VsZWN0ZWQodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZC5maW5kKChkKSA9PiBpc1NhbWVEYXkoZCwgdmFsdWUpKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgYSBjZWxsIHNob3VsZCBiZSBtYXJrZWQgYXMgcHJldmlldy4gKi9cbiAgX2lzUHJldmlldyh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2aWV3ICYmIHRoaXMucHJldmlldy5maW5kKChkKSA9PiBpc1NhbWVEYXkoZCwgdmFsdWUpKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgYSBjZWxsIHNob3VsZCBiZSBtYXJrZWQgYXMgYW4gb3ZlcmxheS4gKi9cbiAgX2lzT3ZlcmxheSh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5cyAmJiB0aGlzLm92ZXJsYXlzLmZpbmQoKG8pID0+IGlzU2FtZURheShvLmRhdGUsIHZhbHVlKSk7XG4gIH1cblxuICAvKiogUmV0dXJucyB3aGV0aGVyIGEgY2VsbCBzaG91bGQgYmUgbWFya2VkIGFzIGFuIG92ZXJsYXkuICovXG4gIF9oYXNPdmVybGF5VHlwZSh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICBsZXQgb3ZlcmxheSA9IHRoaXMub3ZlcmxheXMgJiYgdGhpcy5vdmVybGF5cy5maW5kKChvKSA9PiBpc1NhbWVEYXkoby5kYXRlLCB2YWx1ZSkpO1xuICAgIHJldHVybiBvdmVybGF5ID8gb3ZlcmxheS50eXBlIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgc3RhcnQgb2YgdGhlIG1haW4gcmFuZ2UuICovXG4gIF9pc1JhbmdlU3RhcnQodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIGlzU3RhcnQodmFsdWUsIHRoaXMuc2VsZWN0ZWQsIHRoaXMuaXNSYW5nZSk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIGVuZCBvZiB0aGUgbWFpbiByYW5nZS4gKi9cbiAgX2lzUmFuZ2VFbmQodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIGlzRW5kKHZhbHVlLCB0aGlzLnNlbGVjdGVkLCB0aGlzLmlzUmFuZ2UpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIHdpdGhpbiB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHJhbmdlLiAqL1xuICBfaXNJblJhbmdlKHZhbHVlOiBEYXRlTGlrZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0luUmFuZ2UodmFsdWUsIHRoaXMuc2VsZWN0ZWQsIHRoaXMuaXNSYW5nZSk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIHN0YXJ0IG9mIHRoZSBwcmV2aWV3IHJhbmdlLiAqL1xuICBfaXNQcmV2aWV3U3RhcnQodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIGlzU3RhcnQodmFsdWUsIHRoaXMucHJldmlldywgdGhpcy5pc1JhbmdlKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgZW5kIG9mIHRoZSBwcmV2aWV3IHJhbmdlLiAqL1xuICBfaXNQcmV2aWV3RW5kKHZhbHVlOiBEYXRlTGlrZSkge1xuICAgIHJldHVybiBpc0VuZCh2YWx1ZSwgdGhpcy5wcmV2aWV3LCB0aGlzLmlzUmFuZ2UpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIGluc2lkZSB0aGUgcHJldmlldyByYW5nZS4gKi9cbiAgX2lzSW5QcmV2aWV3KHZhbHVlOiBEYXRlTGlrZSkge1xuICAgIHJldHVybiBpc0luUmFuZ2UodmFsdWUsIHRoaXMucHJldmlldywgdGhpcy5pc1JhbmdlKTtcbiAgfVxufVxuXG4vKiogQ2hlY2tzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgc3RhcnQgb2YgYSByYW5nZS4gKi9cbmZ1bmN0aW9uIGlzU3RhcnQodmFsdWU6IERhdGVMaWtlLCByYW5nZTogRGF0ZUxpa2VbXSB8IG51bGwsIHJhbmdlRW5hYmxlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZSA/PyBbXTtcbiAgcmV0dXJuIHJhbmdlRW5hYmxlZCAmJiBlbmQgIT09IG51bGwgJiYgIWlzU2FtZURheShzdGFydCwgZW5kKSAmJiB2YWx1ZSA8IGVuZCAmJiBpc1NhbWVEYXkodmFsdWUsIHN0YXJ0KTtcbn1cblxuLyoqIENoZWNrcyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIGVuZCBvZiBhIHJhbmdlLiAqL1xuZnVuY3Rpb24gaXNFbmQodmFsdWU6IERhdGVMaWtlLCByYW5nZTogRGF0ZUxpa2VbXSB8IG51bGwsIHJhbmdlRW5hYmxlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZSA/PyBbXTtcbiAgcmV0dXJuIHJhbmdlRW5hYmxlZCAmJiBzdGFydCAhPT0gbnVsbCAmJiAhaXNTYW1lRGF5KHN0YXJ0LCBlbmQpICYmIHZhbHVlID49IHN0YXJ0ICYmIGlzU2FtZURheSh2YWx1ZSwgZW5kKTtcbn1cblxuLyoqIENoZWNrcyB3aGV0aGVyIGEgdmFsdWUgaXMgaW5zaWRlIG9mIGEgcmFuZ2UuICovXG5mdW5jdGlvbiBpc0luUmFuZ2UodmFsdWU6IERhdGVMaWtlLCByYW5nZTogRGF0ZUxpa2VbXSB8IG51bGwsIHJhbmdlRW5hYmxlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZSA/PyBbXTtcbiAgcmV0dXJuIHJhbmdlRW5hYmxlZCAmJiBzdGFydCAhPT0gbnVsbCAmJiBlbmQgIT09IG51bGwgJiYgIWlzU2FtZURheShzdGFydCwgZW5kKSAmJiB2YWx1ZSA+PSBzdGFydCAmJiB2YWx1ZSA8PSBlbmQ7XG59XG4iXX0=