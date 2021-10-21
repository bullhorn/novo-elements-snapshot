import { __decorate, __metadata } from "tslib";
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
import * as i3 from "@angular/common";
function NovoMonthViewElement_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r2 = ctx.$implicit;
    i0.ɵɵpropertyInterpolate("title", day_r2);
    i0.ɵɵattribute("data-automation-id", day_r2.substr(0, 2));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", day_r2.substr(0, 2), " ");
} }
function NovoMonthViewElement_tr_5_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 5);
    i0.ɵɵlistener("mouseover", function NovoMonthViewElement_tr_5_td_1_Template_td_mouseover_0_listener($event) { i0.ɵɵrestoreView(_r7); const day_r5 = ctx.$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.onHover($event, day_r5); });
    i0.ɵɵelementStart(1, "button", 6);
    i0.ɵɵlistener("click", function NovoMonthViewElement_tr_5_td_1_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r7); const day_r5 = ctx.$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.onSelect($event, day_r5); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r5 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r4._hasOverlayType(day_r5.date));
    i0.ɵɵclassProp("today", day_r5.isToday)("notinmonth", day_r5.date.getMonth() !== ctx_r4.activeDate.getMonth())("selected", ctx_r4._isSelected(day_r5.date))("preview", ctx_r4._isPreview(day_r5.date))("overlay", ctx_r4._isOverlay(day_r5.date))("inRange", ctx_r4._isInRange(day_r5.date))("rangeStart", ctx_r4._isRangeStart(day_r5.date))("rangeEnd", ctx_r4._isRangeEnd(day_r5.date))("inPreview", ctx_r4._isInPreview(day_r5.date))("previewStart", ctx_r4._isPreviewStart(day_r5.date))("previewEnd", ctx_r4._isPreviewEnd(day_r5.date));
    i0.ɵɵattribute("aria-label", day_r5.name)("aria-disabled", ctx_r4.isDisabled(day_r5.date))("aria-selected", ctx_r4._isSelected(day_r5.date))("data-automation-id", day_r5.number);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r4.isDisabled(day_r5.date));
    i0.ɵɵattribute("data-automation-id", day_r5.number);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", day_r5.number, " ");
} }
function NovoMonthViewElement_tr_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, NovoMonthViewElement_tr_5_td_1_Template, 3, 31, "td", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const week_r3 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", week_r3.days);
} }
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
NovoMonthViewElement.ɵfac = function NovoMonthViewElement_Factory(t) { return new (t || NovoMonthViewElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.DomSanitizer)); };
NovoMonthViewElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoMonthViewElement, selectors: [["novo-month-view"]], hostVars: 2, hostBindings: function NovoMonthViewElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("hide-overflow-days", ctx.hideOverflowDays);
    } }, inputs: { minDate: "minDate", maxDate: "maxDate", activeDate: "activeDate", selected: "selected", preview: "preview", overlays: "overlays", isRange: "isRange", hideOverflowDays: "hideOverflowDays", weekStartsOn: "weekStartsOn" }, outputs: { select: "select", hover: "hover" }, decls: 6, vars: 2, consts: [["cellspacing", "0", "cellpadding", "0", 1, "calendar-table"], ["class", "weekday", 3, "title", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], [1, "weekday", 3, "title"], [3, "today", "notinmonth", "selected", "preview", "overlay", "class", "inRange", "rangeStart", "rangeEnd", "inPreview", "previewStart", "previewEnd", "mouseover", 4, "ngFor", "ngForOf"], [3, "mouseover"], [1, "day", 3, "disabled", "click"]], template: function NovoMonthViewElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "table", 0);
        i0.ɵɵelementStart(1, "thead");
        i0.ɵɵelementStart(2, "tr");
        i0.ɵɵtemplate(3, NovoMonthViewElement_th_3_Template, 2, 3, "th", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "tbody");
        i0.ɵɵtemplate(5, NovoMonthViewElement_tr_5_Template, 2, 1, "tr", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.weekdays);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.weeks);
    } }, directives: [i3.NgForOf], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{height:-webkit-min-content;height:-moz-min-content;height:min-content;position:relative;width:100%}[_nghost-%COMP%], [_nghost-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background:#fff}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:10px 0;width:30px}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   .month[_ngcontent-%COMP%], [_nghost-%COMP%]   table[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%]{border-radius:3px;color:#666;font-weight:400;margin:5px;overflow-x:hidden;padding:4px 15px;text-align:center;text-overflow:ellipsis}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   .month.selected[_ngcontent-%COMP%], [_nghost-%COMP%]   table[_ngcontent-%COMP%]   .year.selected[_ngcontent-%COMP%]{background-color:#4a89dc;color:#fff}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   .month[_ngcontent-%COMP%]:hover, [_nghost-%COMP%]   table[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%]:hover{background-color:#4a89dc;color:#fff;cursor:pointer}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%]{background-color:transparent;border:none;border-radius:50%;box-shadow:inset 0 0 0 2px transparent;font-size:1.2rem;height:3.2rem;line-height:1;padding:1px;position:relative;transition:box-shadow .14s ease-in-out;width:3.2rem}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%]:focus{outline:none}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%]:disabled{box-shadow:none!important;color:#d7d9e4;cursor:not-allowed!important}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.notinmonth[_ngcontent-%COMP%]{color:#d7d9e4}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:hover   .day[_ngcontent-%COMP%]{box-shadow:inset 0 0 0 2px #4a89dc;cursor:pointer}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.inRange[_ngcontent-%COMP%]:hover   .day[_ngcontent-%COMP%]{box-shadow:inset 0 0 0 2px #fff}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.inRange[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background:#4a89dc;border-radius:0;color:#fff;height:3.2rem;width:3.2rem}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.rangeStart[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-bottom-right-radius:0;border-radius:50%;border-top-right-radius:0;box-shadow:none!important;position:relative}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.rangeStart[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:before{background:#4a89dc;content:\"\";height:100%;position:absolute;right:-5px;top:0;width:10px;z-index:-1}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.rangeEnd[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-bottom-left-radius:0;border-radius:50%;border-top-left-radius:0;box-shadow:none!important;position:relative}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.rangeEnd[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:before{background:#4a89dc;content:\"\";height:100%;left:-5px;position:absolute;top:0;width:10px;z-index:-1}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.selected[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%]{background:#4a89dc;color:#fff}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.preview[_ngcontent-%COMP%]:not(.previewStart):not(.previewEnd)   .day[_ngcontent-%COMP%]{border:1px dashed #4a89dc}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.preview[_ngcontent-%COMP%]:not(.previewStart):not(.previewEnd).selected   .day[_ngcontent-%COMP%]{border:1px dashed #9dbeff}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.today[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%]:after{border-radius:100%;box-shadow:inset 0 0 0 2px #bebebe;content:\"\";height:100%;left:0;margin:0 auto;max-width:3.2rem;position:absolute;top:0;width:100%}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.today.inRange[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%]:after, [_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.today.selected[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%]:after{box-shadow:inset 0 0 0 2px #9dbeff}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.inPreview[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-bottom:1px dashed #4a89dc;border-radius:0;border-top:1px dashed #4a89dc}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.previewStart[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-bottom-right-radius:0;border-left:1px dashed #4a89dc;border-radius:50%;border-top-right-radius:0;box-shadow:none!important}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   td.previewEnd[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-bottom-left-radius:0;border-radius:50%;border-right:1px dashed #4a89dc;border-top-left-radius:0;box-shadow:none!important}"], changeDetection: 0 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoMonthViewElement.prototype, "isRange", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoMonthViewElement.prototype, "hideOverflowDays", void 0);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoMonthViewElement, [{
        type: Component,
        args: [{
                selector: 'novo-month-view',
                templateUrl: './month-view.component.html',
                styleUrls: ['./month-view.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.NovoLabelService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.DomSanitizer }]; }, { minDate: [{
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
        }] }); })();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0ZS1waWNrZXIvbW9udGgtdmlldy9tb250aC12aWV3LmNvbXBvbmVudC50cyIsImVsZW1lbnRzL2RhdGUtcGlja2VyL21vbnRoLXZpZXcvbW9udGgtdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBRUwsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxTQUFTO0FBQ1QsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztJQ2J4Qyw2QkFDRTtJQUFBLFlBQ0Y7SUFBQSxpQkFBSzs7O0lBRjRCLHlDQUFpQjtJQUFpQix5REFBNEM7SUFDN0csZUFDRjtJQURFLG9EQUNGOzs7O0lBS0EsNkJBbUJFO0lBREEsZ1BBQWtDO0lBQ2xDLGlDQUtFO0lBREEsNk9BQStCO0lBQy9CLFlBQ0Y7SUFBQSxpQkFBUztJQUNYLGlCQUFLOzs7O0lBbkJILGtEQUFtQztJQUxuQyx1Q0FBMkIsdUVBQUEsNkNBQUEsMkNBQUEsMkNBQUEsMkNBQUEsaURBQUEsNkNBQUEs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RUFBRSxLQUFLLENBQUMsQ0FBQztBQUMxRyxDQUFDO0FBRUQsb0RBQW9EO0FBQ3BELFNBQVMsS0FBSyxDQUFDLEtBQWUsRUFBRSxLQUF3QixFQUFFLFlBQXFCO0lBQzdFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxDQUFDO0lBQ2pDLE9BQU8sWUFBWSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3RyxDQUFDO0FBRUQsbURBQW1EO0FBQ25ELFNBQVMsU0FBUyxDQUFDLEtBQWUsRUFBRSxLQUF3QixFQUFFLFlBQXFCO0lBQ2pGLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxDQUFDO0lBQ2pDLE9BQU8sWUFBWSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDO0FBQ3BILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vLyBWZW5kb3JcbmltcG9ydCB7IGFkZERheXMsIGlzQWZ0ZXIsIGlzQmVmb3JlLCBpc1NhbWVEYXksIGlzVG9kYXksIHN0YXJ0T2ZNb250aCwgc3RhcnRPZldlZWsgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IERhdGVMaWtlLCBEYXksIE92ZXJsYXlEYXRlIH0gZnJvbSAnLi4vZGF0ZS1waWNrZXIudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW1vbnRoLXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9udGgtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21vbnRoLXZpZXcuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Nb250aFZpZXdFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbWluRGF0ZTogRGF0ZTtcbiAgQElucHV0KClcbiAgbWF4RGF0ZTogRGF0ZTtcbiAgQElucHV0KClcbiAgYWN0aXZlRGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIC8vIFdlZWtzdGFydCBtdXN0IGJlIDAtNiAoU3VuZGF5IC0gU2F0dXJkYXkpXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkOiBEYXRlTGlrZVtdID0gW107XG4gIEBJbnB1dCgpXG4gIHByZXZpZXc6IERhdGVMaWtlW10gPSBbXTtcbiAgQElucHV0KClcbiAgb3ZlcmxheXM6IE92ZXJsYXlEYXRlW10gPSBbXTtcblxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgaXNSYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhpZGUtb3ZlcmZsb3ctZGF5cycpXG4gIHB1YmxpYyBoaWRlT3ZlcmZsb3dEYXlzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgX3dlZWtTdGFydHNPbjogbnVtYmVyID0gMDtcblxuICBASW5wdXQoKVxuICBnZXQgd2Vla1N0YXJ0c09uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3dlZWtTdGFydHNPbjtcbiAgfVxuICBzZXQgd2Vla1N0YXJ0c09uKHZhbHVlKSB7XG4gICAgdGhpcy5fd2Vla1N0YXJ0c09uID0gdmFsdWU7XG4gICAgdGhpcy53ZWVrZGF5cyA9IHRoaXMubGFiZWxzLmdldFdlZWtkYXlzKHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5hY3RpdmVEYXRlKTtcbiAgfVxuXG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XG4gIEBPdXRwdXQoKVxuICBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XG4gIEBPdXRwdXQoKVxuICBob3ZlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAvLyBMaXN0IG9mIGFsbCB0aGUgd2Vla2RheXNcbiAgd2Vla2RheXM6IHN0cmluZ1tdID0gdGhpcy5sYWJlbHMuZ2V0V2Vla2RheXModGhpcy53ZWVrU3RhcnRzT24pO1xuICAvLyBMaXN0IG9mIGFsbCBtb250aHNcbiAgbW9udGhOYW1lczogc3RyaW5nW10gPSB0aGlzLmxhYmVscy5nZXRNb250aHMoKTtcblxuICBtb250aExhYmVsOiBzdHJpbmc7XG4gIHdlZWtzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gU2V0IGxhYmVsc1xuICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgdXBkYXRlVmlldyhkYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5tb250aExhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQodGhpcy5hY3RpdmVEYXRlLCB7IG1vbnRoOiAnc2hvcnQnIH0pO1xuICAgIHRoaXMuYnVpbGRNb250aCh0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgb25TZWxlY3QoZXZlbnQ6IEV2ZW50LCBkYXk6IERheSkge1xuICAgIC8vIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdC5uZXh0KHsgZXZlbnQsIGRheSB9KTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uSG92ZXIoZXZlbnQ6IEV2ZW50LCBkYXk6IERheSk6IHZvaWQge1xuICAgIHRoaXMuaXNSYW5nZSAmJiB0aGlzLmhvdmVyLm5leHQoeyBldmVudCwgZGF5IH0pO1xuICB9XG5cbiAgYnVpbGRNb250aChtb250aDogRGF0ZSkge1xuICAgIC8vIFJlc2V0IHRoZSB3ZWVrc1xuICAgIHRoaXMud2Vla3MgPSBbXTtcbiAgICBjb25zdCBzdGFydCA9IHN0YXJ0T2ZNb250aChtb250aCk7XG5cbiAgICAvLyBIb3VzZSBrZWVwaW5nIHZhcmlhYmxlcyB0byBrbm93IHdoZW4gd2UgYXJlIGRvbmUgYnVpbGRpbmcgdGhlIG1vbnRoXG4gICAgbGV0IGRvbmUgPSBmYWxzZSxcbiAgICAgIGRhdGUgPSBzdGFydE9mV2VlayhzdGFydCwgeyB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uIH0pLFxuICAgICAgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgIGNvdW50ID0gMDtcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgLy8gQnVpbGQgdGhlIGRheXMgZm9yIHRoZSB3ZWVrc1xuICAgICAgdGhpcy53ZWVrcy5wdXNoKHsgZGF5czogdGhpcy5idWlsZFdlZWsobmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpLCBtb250aCkgfSk7XG5cbiAgICAgIC8vIEluY3JlbWVudCB2YXJpYWJsZXMgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgZGF0ZSA9IGFkZERheXMoZGF0ZSwgNyk7XG4gICAgICBkb25lID0gY291bnQrKyA+IDIgJiYgbW9udGhJbmRleCAhPT0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICB9XG4gIH1cblxuICBidWlsZFdlZWsoZGF0ZTogRGF0ZSwgbW9udGg6IERhdGUpOiBBcnJheTxPYmplY3Q+IHtcbiAgICAvLyBCdWlsZCBvdXQgb2YgdGhlIGRheXMgb2YgdGhlIHdlZWtcbiAgICBjb25zdCBkYXlzID0gW107XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBkYXlzIG9mIHRoZSB3ZWVrXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgIC8vIFB1c2ggYSB2YXJpYWJsZSBvbiB0aGUgZGF5IGFycmF5IHdpdGggbG90cyBvZiBoZWxwZXJzIHRvIG1ha2UgdGhlIHRlbXBsYXRlIGVhc2llclxuICAgICAgZGF5cy5wdXNoKHtcbiAgICAgICAgbmFtZTogdGhpcy53ZWVrZGF5c1tpXSxcbiAgICAgICAgbnVtYmVyOiBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgaXNUb2RheTogaXNUb2RheShkYXRlKSxcbiAgICAgICAgZGF0ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJbmNyZW1lbnQgZm9yIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgZGF0ZSA9IGFkZERheXMoZGF0ZSwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRheXM7XG4gIH1cblxuICBpc0Rpc2FibGVkKGRheTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gKHRoaXMubWluRGF0ZSAmJiBpc0JlZm9yZShkYXksIHRoaXMubWluRGF0ZSkpIHx8ICh0aGlzLm1heERhdGUgJiYgaXNBZnRlcihkYXksIHRoaXMubWF4RGF0ZSkpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgd2hldGhlciBhIGNlbGwgc2hvdWxkIGJlIG1hcmtlZCBhcyBzZWxlY3RlZC4gKi9cbiAgX2lzU2VsZWN0ZWQodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZC5maW5kKChkKSA9PiBpc1NhbWVEYXkoZCwgdmFsdWUpKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgYSBjZWxsIHNob3VsZCBiZSBtYXJrZWQgYXMgcHJldmlldy4gKi9cbiAgX2lzUHJldmlldyh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2aWV3ICYmIHRoaXMucHJldmlldy5maW5kKChkKSA9PiBpc1NhbWVEYXkoZCwgdmFsdWUpKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgYSBjZWxsIHNob3VsZCBiZSBtYXJrZWQgYXMgYW4gb3ZlcmxheS4gKi9cbiAgX2lzT3ZlcmxheSh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5cyAmJiB0aGlzLm92ZXJsYXlzLmZpbmQoKG8pID0+IGlzU2FtZURheShvLmRhdGUsIHZhbHVlKSk7XG4gIH1cblxuICAvKiogUmV0dXJucyB3aGV0aGVyIGEgY2VsbCBzaG91bGQgYmUgbWFya2VkIGFzIGFuIG92ZXJsYXkuICovXG4gIF9oYXNPdmVybGF5VHlwZSh2YWx1ZTogRGF0ZUxpa2UpIHtcbiAgICBsZXQgb3ZlcmxheSA9IHRoaXMub3ZlcmxheXMgJiYgdGhpcy5vdmVybGF5cy5maW5kKChvKSA9PiBpc1NhbWVEYXkoby5kYXRlLCB2YWx1ZSkpO1xuICAgIHJldHVybiBvdmVybGF5ID8gb3ZlcmxheS50eXBlIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgc3RhcnQgb2YgdGhlIG1haW4gcmFuZ2UuICovXG4gIF9pc1JhbmdlU3RhcnQodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIGlzU3RhcnQodmFsdWUsIHRoaXMuc2VsZWN0ZWQsIHRoaXMuaXNSYW5nZSk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIGVuZCBvZiB0aGUgbWFpbiByYW5nZS4gKi9cbiAgX2lzUmFuZ2VFbmQodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIGlzRW5kKHZhbHVlLCB0aGlzLnNlbGVjdGVkLCB0aGlzLmlzUmFuZ2UpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIHdpdGhpbiB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHJhbmdlLiAqL1xuICBfaXNJblJhbmdlKHZhbHVlOiBEYXRlTGlrZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0luUmFuZ2UodmFsdWUsIHRoaXMuc2VsZWN0ZWQsIHRoaXMuaXNSYW5nZSk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIHN0YXJ0IG9mIHRoZSBwcmV2aWV3IHJhbmdlLiAqL1xuICBfaXNQcmV2aWV3U3RhcnQodmFsdWU6IERhdGVMaWtlKSB7XG4gICAgcmV0dXJuIGlzU3RhcnQodmFsdWUsIHRoaXMucHJldmlldywgdGhpcy5pc1JhbmdlKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgZW5kIG9mIHRoZSBwcmV2aWV3IHJhbmdlLiAqL1xuICBfaXNQcmV2aWV3RW5kKHZhbHVlOiBEYXRlTGlrZSkge1xuICAgIHJldHVybiBpc0VuZCh2YWx1ZSwgdGhpcy5wcmV2aWV3LCB0aGlzLmlzUmFuZ2UpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIGluc2lkZSB0aGUgcHJldmlldyByYW5nZS4gKi9cbiAgX2lzSW5QcmV2aWV3KHZhbHVlOiBEYXRlTGlrZSkge1xuICAgIHJldHVybiBpc0luUmFuZ2UodmFsdWUsIHRoaXMucHJldmlldywgdGhpcy5pc1JhbmdlKTtcbiAgfVxufVxuXG4vKiogQ2hlY2tzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgc3RhcnQgb2YgYSByYW5nZS4gKi9cbmZ1bmN0aW9uIGlzU3RhcnQodmFsdWU6IERhdGVMaWtlLCByYW5nZTogRGF0ZUxpa2VbXSB8IG51bGwsIHJhbmdlRW5hYmxlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZSA/PyBbXTtcbiAgcmV0dXJuIHJhbmdlRW5hYmxlZCAmJiBlbmQgIT09IG51bGwgJiYgIWlzU2FtZURheShzdGFydCwgZW5kKSAmJiB2YWx1ZSA8IGVuZCAmJiBpc1NhbWVEYXkodmFsdWUsIHN0YXJ0KTtcbn1cblxuLyoqIENoZWNrcyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIGVuZCBvZiBhIHJhbmdlLiAqL1xuZnVuY3Rpb24gaXNFbmQodmFsdWU6IERhdGVMaWtlLCByYW5nZTogRGF0ZUxpa2VbXSB8IG51bGwsIHJhbmdlRW5hYmxlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZSA/PyBbXTtcbiAgcmV0dXJuIHJhbmdlRW5hYmxlZCAmJiBzdGFydCAhPT0gbnVsbCAmJiAhaXNTYW1lRGF5KHN0YXJ0LCBlbmQpICYmIHZhbHVlID49IHN0YXJ0ICYmIGlzU2FtZURheSh2YWx1ZSwgZW5kKTtcbn1cblxuLyoqIENoZWNrcyB3aGV0aGVyIGEgdmFsdWUgaXMgaW5zaWRlIG9mIGEgcmFuZ2UuICovXG5mdW5jdGlvbiBpc0luUmFuZ2UodmFsdWU6IERhdGVMaWtlLCByYW5nZTogRGF0ZUxpa2VbXSB8IG51bGwsIHJhbmdlRW5hYmxlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZSA/PyBbXTtcbiAgcmV0dXJuIHJhbmdlRW5hYmxlZCAmJiBzdGFydCAhPT0gbnVsbCAmJiBlbmQgIT09IG51bGwgJiYgIWlzU2FtZURheShzdGFydCwgZW5kKSAmJiB2YWx1ZSA+PSBzdGFydCAmJiB2YWx1ZSA8PSBlbmQ7XG59XG4iLCI8dGFibGUgY2xhc3M9XCJjYWxlbmRhci10YWJsZVwiIGNlbGxzcGFjaW5nPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiPlxuICA8dGhlYWQ+XG4gICAgPHRyPlxuICAgICAgPHRoICpuZ0Zvcj1cImxldCBkYXkgb2Ygd2Vla2RheXNcIiB0aXRsZT1cInt7IGRheSB9fVwiIGNsYXNzPVwid2Vla2RheVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJkYXkuc3Vic3RyKDAsIDIpXCI+XG4gICAgICAgIHt7IGRheS5zdWJzdHIoMCwgMikgfX1cbiAgICAgIDwvdGg+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5PlxuICAgIDx0ciAqbmdGb3I9XCJsZXQgd2VlayBvZiB3ZWVrc1wiPlxuICAgICAgPHRkXG4gICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2Ygd2Vlay5kYXlzXCJcbiAgICAgICAgW2NsYXNzLnRvZGF5XT1cImRheS5pc1RvZGF5XCJcbiAgICAgICAgW2NsYXNzLm5vdGlubW9udGhdPVwiZGF5LmRhdGUuZ2V0TW9udGgoKSAhPT0gYWN0aXZlRGF0ZS5nZXRNb250aCgpXCJcbiAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cIl9pc1NlbGVjdGVkKGRheS5kYXRlKVwiXG4gICAgICAgIFtjbGFzcy5wcmV2aWV3XT1cIl9pc1ByZXZpZXcoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLm92ZXJsYXldPVwiX2lzT3ZlcmxheShkYXkuZGF0ZSlcIlxuICAgICAgICBbY2xhc3NdPVwiX2hhc092ZXJsYXlUeXBlKGRheS5kYXRlKVwiXG4gICAgICAgIFtjbGFzcy5pblJhbmdlXT1cIl9pc0luUmFuZ2UoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLnJhbmdlU3RhcnRdPVwiX2lzUmFuZ2VTdGFydChkYXkuZGF0ZSlcIlxuICAgICAgICBbY2xhc3MucmFuZ2VFbmRdPVwiX2lzUmFuZ2VFbmQoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLmluUHJldmlld109XCJfaXNJblByZXZpZXcoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLnByZXZpZXdTdGFydF09XCJfaXNQcmV2aWV3U3RhcnQoZGF5LmRhdGUpXCJcbiAgICAgICAgW2NsYXNzLnByZXZpZXdFbmRdPVwiX2lzUHJldmlld0VuZChkYXkuZGF0ZSlcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImRheS5uYW1lXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJpc0Rpc2FibGVkKGRheS5kYXRlKVwiXG4gICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiX2lzU2VsZWN0ZWQoZGF5LmRhdGUpXCJcbiAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImRheS5udW1iZXJcIlxuICAgICAgICAobW91c2VvdmVyKT1cIm9uSG92ZXIoJGV2ZW50LCBkYXkpXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzcz1cImRheVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImRheS5udW1iZXJcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0Rpc2FibGVkKGRheS5kYXRlKVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uU2VsZWN0KCRldmVudCwgZGF5KVwiPlxuICAgICAgICAgIHt7IGRheS5udW1iZXIgfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPiJdfQ==