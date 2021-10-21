// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { addMonths, isDate, isSameDay, setMonth, setYear, startOfDay, startOfMonth, subMonths } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
// APP
import { Helpers } from '../../../utils/Helpers';
import { MultiDateSelectionStrategy, RangeSelectionStrategy, WeekSelectionStrategy } from '../strategies';
import { DefaultDateSelectionStrategy } from '../strategies/default-selection.strategy';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/novo-label-service";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../../button/Button";
import * as i4 from "@angular/common";
import * as i5 from "../month-view/month-view.component";
import * as i6 from "../month-select/month-select.component";
import * as i7 from "../year-select/year-select.component";
function NovoCalendarElement_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 7);
    i0.ɵɵelementStart(2, "span", 8);
    i0.ɵɵlistener("click", function NovoCalendarElement_ng_container_2_Template_span_click_2_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.openView($event, "months"); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 9);
    i0.ɵɵlistener("click", function NovoCalendarElement_ng_container_2_Template_span_click_4_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.openView($event, "years"); });
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const month_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("secondary", i_r5 > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(month_r4.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(month_r4.date == null ? null : month_r4.date.getFullYear());
} }
function NovoCalendarElement_ng_container_5_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 0);
    i0.ɵɵelementStart(1, "span", 12);
    i0.ɵɵlistener("click", function NovoCalendarElement_ng_container_5_ng_container_1_div_1_Template_span_click_1_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(3); return ctx_r13.prevMonth($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 7);
    i0.ɵɵelementStart(3, "span", 8);
    i0.ɵɵlistener("click", function NovoCalendarElement_ng_container_5_ng_container_1_div_1_Template_span_click_3_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r15 = i0.ɵɵnextContext(3); return ctx_r15.openView($event, "months"); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 9);
    i0.ɵɵlistener("click", function NovoCalendarElement_ng_container_5_ng_container_1_div_1_Template_span_click_5_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r16 = i0.ɵɵnextContext(3); return ctx_r16.openView($event, "years"); });
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 13);
    i0.ɵɵlistener("click", function NovoCalendarElement_ng_container_5_ng_container_1_div_1_Template_span_click_7_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r17 = i0.ɵɵnextContext(3); return ctx_r17.nextMonth($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const month_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(month_r10.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(month_r10.date == null ? null : month_r10.date.getFullYear());
} }
function NovoCalendarElement_ng_container_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NovoCalendarElement_ng_container_5_ng_container_1_div_1_Template, 8, 2, "div", 10);
    i0.ɵɵelementStart(2, "novo-month-view", 11);
    i0.ɵɵlistener("select", function NovoCalendarElement_ng_container_5_ng_container_1_Template_novo_month_view_select_2_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(2); return ctx_r19.dateSelected($event); })("hover", function NovoCalendarElement_ng_container_5_ng_container_1_Template_novo_month_view_hover_2_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r21 = i0.ɵɵnextContext(2); return ctx_r21.updatePreview($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const month_r10 = ctx.$implicit;
    const i_r11 = ctx.index;
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.layout === "vertical" && i_r11 > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("activeDate", month_r10.date)("selected", ctx_r9.selected)("preview", ctx_r9.preview)("overlays", ctx_r9.overlays)("isRange", ctx_r9._isRange())("hideOverflowDays", ctx_r9.months.length > 1)("weekStartsOn", ctx_r9.weekStartsOn);
} }
function NovoCalendarElement_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NovoCalendarElement_ng_container_5_ng_container_1_Template, 3, 8, "ng-container", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.months);
} }
function NovoCalendarElement_novo_month_select_6_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-month-select", 14);
    i0.ɵɵlistener("select", function NovoCalendarElement_novo_month_select_6_Template_novo_month_select_select_0_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.monthSelected($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("activeDate", ctx_r2.activeDate)("selected", ctx_r2.selected);
} }
function NovoCalendarElement_novo_year_select_7_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-year-select", 14);
    i0.ɵɵlistener("select", function NovoCalendarElement_novo_year_select_7_Template_novo_year_select_select_0_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(); return ctx_r24.yearSelected($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("activeDate", ctx_r3.activeDate)("selected", ctx_r3.selected);
} }
export class NovoCalendarElement {
    constructor(labels, element, cdr, _sanitizer) {
        this.labels = labels;
        this.element = element;
        this.cdr = cdr;
        this._sanitizer = _sanitizer;
        // Default view mode (select days)
        this.activeView = 'days';
        this.layout = 'horizontal';
        this._selected = [];
        this.selectedChange = new EventEmitter();
        this.preview = [];
        this.previewChange = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        this.overlays = [];
        this._mode = 'single';
        this._numberOfMonths = [0];
        this._weekStartsOn = 0;
        this._strategy = new DefaultDateSelectionStrategy();
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value ? value.filter(isDate).map((d) => startOfDay(d)) : [];
    }
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(value) {
        if (!isSameDay(value, this._activeDate)) {
            this._activeDate = value;
            this.activeDateChange.next(value);
            this.updateView(value);
        }
    }
    get weekStartsOn() {
        return this._weekStartsOn;
    }
    set weekStartsOn(value) {
        this._weekStartsOn = value;
        if (this.mode === 'week') {
            this._strategy = new WeekSelectionStrategy(this.weekStartsOn);
        }
    }
    get numberOfMonths() {
        return this._numberOfMonths.length;
    }
    set numberOfMonths(value) {
        this._numberOfMonths = Array.from(Array(Number(value)).keys());
    }
    get mode() {
        return this._mode;
    }
    set mode(value) {
        if (this._mode !== value) {
            this._mode = value;
            switch (value) {
                case 'multiple':
                    this._strategy = new MultiDateSelectionStrategy();
                    break;
                case 'range':
                    this._strategy = new RangeSelectionStrategy();
                    break;
                case 'week':
                    this._strategy = new WeekSelectionStrategy(this.weekStartsOn);
                    break;
                case 'single':
                default:
                    this._strategy = new DefaultDateSelectionStrategy();
                    break;
            }
        }
    }
    get hb_width() {
        if (this.layout === 'vertical') {
            return this._sanitizer.bypassSecurityTrustStyle(`min-content`);
        }
        return this._sanitizer.bypassSecurityTrustStyle(`min-content`);
    }
    get hb_horiztonal() {
        return this.layout !== 'vertical';
    }
    get hb_vertical() {
        return this.layout === 'vertical';
    }
    ngOnInit() {
        if (!this.activeDate) {
            this.activeDate = this.selected.length ? this.selected[0] : new Date();
        }
        this.updateView(this.activeDate);
    }
    updateView(activeDate) {
        this.activeDate = new Date(activeDate ? new Date(activeDate) : new Date());
        this.months = [];
        const month = startOfMonth(this.activeDate);
        for (const i of this._numberOfMonths) {
            const date = addMonths(month, i);
            const label = this.labels.formatDateWithFormat(date, { month: 'short' });
            this.months.push({ date, label });
        }
    }
    setToday() {
        const tmp = new Date();
        this.updateView(tmp);
        // Go back to days
        this.openView(null, 'days');
    }
    monthSelected({ event, month }) {
        const date = this.activeDate ? this.activeDate : new Date().getMonth();
        const tmp = setMonth(date, month);
        this.updateView(tmp);
        // Go back to days
        this.openView(null, 'days');
    }
    yearSelected({ event, year }) {
        const date = this.activeDate ? this.activeDate : new Date();
        const tmp = setYear(date, year);
        this.updateView(tmp);
        // Go back to days
        this.openView(null, 'days');
    }
    dateSelected({ event, day }) {
        // Helpers.swallowEvent(event);
        this.selected = this._strategy.selectionFinished(day.date, this.selected, event);
        this.selectedChange.emit(this.selected);
        this.cdr.markForCheck();
    }
    updatePreview({ event, day }) {
        this.preview = this._strategy.createPreview(day.date, this.selected, event);
        this.previewChange.emit(this.preview);
    }
    prevMonth(event) {
        Helpers.swallowEvent(event);
        const tmp = subMonths(this.activeDate, 1);
        this.updateView(tmp);
    }
    nextMonth(event) {
        Helpers.swallowEvent(event);
        const tmp = addMonths(this.activeDate, 1);
        this.updateView(tmp);
    }
    openView(event, type) {
        Helpers.swallowEvent(event);
        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.activeView) {
            this.activeView = 'days';
        }
        else {
            this.activeView = type;
        }
        // Make sure to scroll the selected one into view
        if (this.activeView === 'years' || this.activeView === 'months') {
            setTimeout(() => {
                const container = this.element.nativeElement.querySelector(`.calendar-content.${this.activeView}`);
                const selectedItem = this.element.nativeElement.querySelector(`.calendar-content.${this.activeView} .${this.activeView === 'years' ? 'year' : 'month'}.selected`);
                if (container && selectedItem) {
                    container.scrollTop = selectedItem.offsetTop - 100;
                }
            });
        }
    }
    _isRange() {
        return ['week', 'range'].includes(this.mode);
    }
}
NovoCalendarElement.ɵfac = function NovoCalendarElement_Factory(t) { return new (t || NovoCalendarElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.DomSanitizer)); };
NovoCalendarElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCalendarElement, selectors: [["novo-calendar"]], hostVars: 6, hostBindings: function NovoCalendarElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵstyleProp("width", ctx.hb_width);
        i0.ɵɵclassProp("layout-horizontal", ctx.hb_horiztonal)("layout-vertical", ctx.hb_vertical);
    } }, inputs: { minYear: "minYear", maxYear: "maxYear", activeView: "activeView", layout: "layout", selected: "selected", preview: "preview", overlays: "overlays", activeDate: "activeDate", weekStartsOn: "weekStartsOn", numberOfMonths: "numberOfMonths", mode: "mode" }, outputs: { selectedChange: "selectedChange", previewChange: "previewChange", activeDateChange: "activeDateChange" }, decls: 8, vars: 5, consts: [[1, "calendar-header"], ["theme", "icon", "icon", "previous", "size", "small", "data-automation-id", "calendar-previous", 3, "click"], [4, "ngFor", "ngForOf"], ["theme", "icon", "icon", "next", "size", "small", "data-automation-id", "calendar-next", 3, "click"], [1, "calendar-content", 3, "ngSwitch"], [4, "ngSwitchCase"], [3, "activeDate", "selected", "select", 4, "ngSwitchCase"], [1, "heading"], ["data-automation-id", "header-month", 1, "month", 3, "click"], ["data-automation-id", "header-year", 1, "year", 3, "click"], ["class", "calendar-header", 4, "ngIf"], [1, "month-view", 3, "activeDate", "selected", "preview", "overlays", "isRange", "hideOverflowDays", "weekStartsOn", "select", "hover"], ["data-automation-id", "calendar-previous", 1, "previous", 3, "click"], ["data-automation-id", "calendar-next", 1, "next", 3, "click"], [3, "activeDate", "selected", "select"]], template: function NovoCalendarElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "novo-button", 1);
        i0.ɵɵlistener("click", function NovoCalendarElement_Template_novo_button_click_1_listener($event) { return ctx.prevMonth($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, NovoCalendarElement_ng_container_2_Template, 6, 4, "ng-container", 2);
        i0.ɵɵelementStart(3, "novo-button", 3);
        i0.ɵɵlistener("click", function NovoCalendarElement_Template_novo_button_click_3_listener($event) { return ctx.nextMonth($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "section", 4);
        i0.ɵɵtemplate(5, NovoCalendarElement_ng_container_5_Template, 2, 1, "ng-container", 5);
        i0.ɵɵtemplate(6, NovoCalendarElement_novo_month_select_6_Template, 1, 2, "novo-month-select", 6);
        i0.ɵɵtemplate(7, NovoCalendarElement_novo_year_select_7_Template, 1, 2, "novo-year-select", 6);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.months);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngSwitch", ctx.activeView);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "days");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "months");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "years");
    } }, directives: [i3.NovoButtonElement, i4.NgForOf, i4.NgSwitch, i4.NgSwitchCase, i4.NgIf, i5.NovoMonthViewElement, i6.NovoMonthSelectElement, i7.NovoYearSelectElement], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.layout-horizontal[_nghost-%COMP%]{font-size:1.2rem}.layout-horizontal[_nghost-%COMP%]   .calendar-content[_ngcontent-%COMP%]{flex-flow:row nowrap}.layout-horizontal[_nghost-%COMP%]   .month-view[_ngcontent-%COMP%] + .month-view[_ngcontent-%COMP%]{border-collapse:unset;border-left:1px solid #bebebe;margin-left:.5rem;padding-left:.5rem}.layout-vertical[_nghost-%COMP%]   .calendar-content[_ngcontent-%COMP%]{flex-flow:column nowrap}.layout-vertical[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .heading.secondary[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]{-moz-user-select:none;-webkit-user-select:none;background:#fff;color:#3d464d;display:block;position:relative;text-align:center;user-select:none;width:100%}[_nghost-%COMP%]   .calendar-content[_ngcontent-%COMP%]{display:flex;height:-webkit-min-content;height:-moz-min-content;height:min-content;left:0;overflow:hidden;position:static;top:0;width:100%}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]{-webkit-user-select:none;align-items:center;border-bottom:1px solid #f4f4f4;border-collapse:collapse;cursor:default;display:flex;flex-flow:row nowrap;justify-content:space-between;padding:1rem .8rem;width:100%}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .previous[_ngcontent-%COMP%]{cursor:pointer;display:inline-block;height:15px;width:30px}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .previous[_ngcontent-%COMP%]:after{border-bottom:4px solid transparent;border-right:4px solid #aaa;border-top:4px solid transparent;content:\"\";display:inline-block;height:0;vertical-align:middle;width:0}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .previous[_ngcontent-%COMP%]:hover:after{border-right:4px solid #4a89dc;cursor:pointer}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]{color:#4a89dc;display:inline-block;flex:1;font-weight:600;vertical-align:middle}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]   .month[_ngcontent-%COMP%]{border-radius:2px;padding:3px 8px}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]   .month[_ngcontent-%COMP%]:hover{background:#4a89dc;color:#fff;cursor:pointer}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%]{border-radius:2px;padding:3px 8px}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%]:hover{background:#4a89dc;color:#fff;cursor:pointer}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .next[_ngcontent-%COMP%]{cursor:pointer;display:inline-block;height:15px;width:30px}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .next[_ngcontent-%COMP%]:before{border-bottom:4px solid transparent;border-left:4px solid #aaa;border-top:4px solid transparent;content:\"\";display:inline-block;height:0;vertical-align:middle;width:0}[_nghost-%COMP%]   .calendar-header[_ngcontent-%COMP%]   .next[_ngcontent-%COMP%]:hover:before{border-left:4px solid #4a89dc;cursor:pointer;opacity:1}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCalendarElement, [{
        type: Component,
        args: [{
                selector: 'novo-calendar',
                templateUrl: './calendar.component.html',
                styleUrls: ['./calendar.component.scss'],
            }]
    }], function () { return [{ type: i1.NovoLabelService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.DomSanitizer }]; }, { minYear: [{
            type: Input
        }], maxYear: [{
            type: Input
        }], activeView: [{
            type: Input
        }], layout: [{
            type: Input
        }], selected: [{
            type: Input
        }], selectedChange: [{
            type: Output
        }], preview: [{
            type: Input
        }], previewChange: [{
            type: Output
        }], activeDateChange: [{
            type: Output
        }], overlays: [{
            type: Input
        }], activeDate: [{
            type: Input
        }], weekStartsOn: [{
            type: Input
        }], numberOfMonths: [{
            type: Input
        }], mode: [{
            type: Input
        }], hb_width: [{
            type: HostBinding,
            args: ['style.width']
        }], hb_horiztonal: [{
            type: HostBinding,
            args: ['class.layout-horizontal']
        }], hb_vertical: [{
            type: HostBinding,
            args: ['class.layout-vertical']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGUtcGlja2VyL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyIsImVsZW1lbnRzL2RhdGUtcGlja2VyL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELFNBQVM7QUFDVCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBU2pELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7Ozs7Ozs7SUNmdEYsNkJBQ0U7SUFBQSwrQkFDRTtJQUFBLCtCQUNvQztJQURoQixxTUFBMEIsUUFBUSxLQUFFO0lBQ3BCLFlBQWlCO0lBQUEsaUJBQU87SUFDNUQsK0JBQ21DO0lBRGhCLHFNQUEwQixPQUFPLEtBQUU7SUFDbkIsWUFB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LEtBQUs7WUFTRixJQUFJO2tCQURQLEtBQUs7WUEwQkYsUUFBUTtrQkFEWCxXQUFXO21CQUFDLGFBQWE7WUFTdEIsYUFBYTtrQkFEaEIsV0FBVzttQkFBQyx5QkFBeUI7WUFNbEMsV0FBVztrQkFEZCxXQUFXO21CQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgYWRkTW9udGhzLCBpc0RhdGUsIGlzU2FtZURheSwgc2V0TW9udGgsIHNldFllYXIsIHN0YXJ0T2ZEYXksIHN0YXJ0T2ZNb250aCwgc3ViTW9udGhzIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi8uLi91dGlscy9IZWxwZXJzJztcbmltcG9ydCB7XG4gIERhdGVQaWNrZXJTZWxlY3RNb2RlcyxcbiAgTm92b0RhdGVTZWxlY3RFdmVudCxcbiAgTm92b0RhdGVTZWxlY3Rpb25TdHJhdGVneSxcbiAgTm92b01vbnRoU2VsZWN0RXZlbnQsXG4gIE5vdm9ZZWFyU2VsZWN0RXZlbnQsXG4gIE92ZXJsYXlEYXRlLFxufSBmcm9tICcuLi9kYXRlLXBpY2tlci50eXBlcyc7XG5pbXBvcnQgeyBNdWx0aURhdGVTZWxlY3Rpb25TdHJhdGVneSwgUmFuZ2VTZWxlY3Rpb25TdHJhdGVneSwgV2Vla1NlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi4vc3RyYXRlZ2llcyc7XG5pbXBvcnQgeyBEZWZhdWx0RGF0ZVNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi4vc3RyYXRlZ2llcy9kZWZhdWx0LXNlbGVjdGlvbi5zdHJhdGVneSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbWluWWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICBASW5wdXQoKVxuICBtYXhZZWFyOiBzdHJpbmcgfCBudW1iZXI7XG4gIC8vIERlZmF1bHQgdmlldyBtb2RlIChzZWxlY3QgZGF5cylcbiAgQElucHV0KClcbiAgYWN0aXZlVmlldzogc3RyaW5nID0gJ2RheXMnO1xuICBASW5wdXQoKVxuICBsYXlvdXQ6IHN0cmluZyA9ICdob3Jpem9udGFsJztcblxuICBfc2VsZWN0ZWQ6IERhdGVbXSA9IFtdO1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogRGF0ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZSA/IHZhbHVlLmZpbHRlcihpc0RhdGUpLm1hcCgoZCkgPT4gc3RhcnRPZkRheShkKSkgOiBbXTtcbiAgfVxuICBAT3V0cHV0KClcbiAgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKVxuICBwcmV2aWV3OiBEYXRlW10gPSBbXTtcbiAgQE91dHB1dCgpXG4gIHByZXZpZXdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgYWN0aXZlRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpXG4gIG92ZXJsYXlzOiBPdmVybGF5RGF0ZVtdID0gW107XG5cbiAgX2FjdGl2ZURhdGU6IERhdGU7XG4gIF9tb2RlOiBEYXRlUGlja2VyU2VsZWN0TW9kZXMgPSAnc2luZ2xlJztcbiAgX251bWJlck9mTW9udGhzOiBudW1iZXJbXSA9IFswXTtcbiAgX3dlZWtTdGFydHNPbjogbnVtYmVyID0gMDtcbiAgX3N0cmF0ZWd5OiBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5PGFueT4gPSBuZXcgRGVmYXVsdERhdGVTZWxlY3Rpb25TdHJhdGVneSgpO1xuXG4gIG1vbnRoczogYW55O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBhY3RpdmVEYXRlKCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEYXRlO1xuICB9XG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlKSB7XG4gICAgaWYgKCFpc1NhbWVEYXkodmFsdWUsIHRoaXMuX2FjdGl2ZURhdGUpKSB7XG4gICAgICB0aGlzLl9hY3RpdmVEYXRlID0gdmFsdWU7XG4gICAgICB0aGlzLmFjdGl2ZURhdGVDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCB3ZWVrU3RhcnRzT24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fd2Vla1N0YXJ0c09uO1xuICB9XG4gIHNldCB3ZWVrU3RhcnRzT24odmFsdWUpIHtcbiAgICB0aGlzLl93ZWVrU3RhcnRzT24gPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnd2VlaycpIHtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gbmV3IFdlZWtTZWxlY3Rpb25TdHJhdGVneSh0aGlzLndlZWtTdGFydHNPbik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IG51bWJlck9mTW9udGhzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX251bWJlck9mTW9udGhzLmxlbmd0aDtcbiAgfVxuICBzZXQgbnVtYmVyT2ZNb250aHModmFsdWUpIHtcbiAgICB0aGlzLl9udW1iZXJPZk1vbnRocyA9IEFycmF5LmZyb20oQXJyYXkoTnVtYmVyKHZhbHVlKSkua2V5cygpKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBtb2RlKCk6IERhdGVQaWNrZXJTZWxlY3RNb2RlcyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XG4gIH1cbiAgc2V0IG1vZGUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fbW9kZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcbiAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSAnbXVsdGlwbGUnOlxuICAgICAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gbmV3IE11bHRpRGF0ZVNlbGVjdGlvblN0cmF0ZWd5KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgICB0aGlzLl9zdHJhdGVneSA9IG5ldyBSYW5nZVNlbGVjdGlvblN0cmF0ZWd5KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gbmV3IFdlZWtTZWxlY3Rpb25TdHJhdGVneSh0aGlzLndlZWtTdGFydHNPbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgRGVmYXVsdERhdGVTZWxlY3Rpb25TdHJhdGVneSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICBnZXQgaGJfd2lkdGgoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0ID09PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgbWluLWNvbnRlbnRgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYG1pbi1jb250ZW50YCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxheW91dC1ob3Jpem9udGFsJylcbiAgZ2V0IGhiX2hvcml6dG9uYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0ICE9PSAndmVydGljYWwnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5sYXlvdXQtdmVydGljYWwnKVxuICBnZXQgaGJfdmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0ID09PSAndmVydGljYWwnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZURhdGUpIHtcbiAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID8gdGhpcy5zZWxlY3RlZFswXSA6IG5ldyBEYXRlKCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgdXBkYXRlVmlldyhhY3RpdmVEYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5hY3RpdmVEYXRlID0gbmV3IERhdGUoYWN0aXZlRGF0ZSA/IG5ldyBEYXRlKGFjdGl2ZURhdGUpIDogbmV3IERhdGUoKSk7XG4gICAgdGhpcy5tb250aHMgPSBbXTtcbiAgICBjb25zdCBtb250aCA9IHN0YXJ0T2ZNb250aCh0aGlzLmFjdGl2ZURhdGUpO1xuICAgIGZvciAoY29uc3QgaSBvZiB0aGlzLl9udW1iZXJPZk1vbnRocykge1xuICAgICAgY29uc3QgZGF0ZSA9IGFkZE1vbnRocyhtb250aCwgaSk7XG4gICAgICBjb25zdCBsYWJlbCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KGRhdGUsIHsgbW9udGg6ICdzaG9ydCcgfSk7XG4gICAgICB0aGlzLm1vbnRocy5wdXNoKHsgZGF0ZSwgbGFiZWwgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VG9kYXkoKSB7XG4gICAgY29uc3QgdG1wID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgICAvLyBHbyBiYWNrIHRvIGRheXNcbiAgICB0aGlzLm9wZW5WaWV3KG51bGwsICdkYXlzJyk7XG4gIH1cblxuICBtb250aFNlbGVjdGVkKHsgZXZlbnQsIG1vbnRoIH06IE5vdm9Nb250aFNlbGVjdEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuYWN0aXZlRGF0ZSA/IHRoaXMuYWN0aXZlRGF0ZSA6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKTtcbiAgICBjb25zdCB0bXAgPSBzZXRNb250aChkYXRlLCBtb250aCk7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRtcCk7XG4gICAgLy8gR28gYmFjayB0byBkYXlzXG4gICAgdGhpcy5vcGVuVmlldyhudWxsLCAnZGF5cycpO1xuICB9XG5cbiAgeWVhclNlbGVjdGVkKHsgZXZlbnQsIHllYXIgfTogTm92b1llYXJTZWxlY3RFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmFjdGl2ZURhdGUgPyB0aGlzLmFjdGl2ZURhdGUgOiBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHRtcCA9IHNldFllYXIoZGF0ZSwgeWVhcik7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRtcCk7XG4gICAgLy8gR28gYmFjayB0byBkYXlzXG4gICAgdGhpcy5vcGVuVmlldyhudWxsLCAnZGF5cycpO1xuICB9XG5cbiAgZGF0ZVNlbGVjdGVkKHsgZXZlbnQsIGRheSB9OiBOb3ZvRGF0ZVNlbGVjdEV2ZW50KSB7XG4gICAgLy8gSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLl9zdHJhdGVneS5zZWxlY3Rpb25GaW5pc2hlZChkYXkuZGF0ZSwgdGhpcy5zZWxlY3RlZCwgZXZlbnQpO1xuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHVwZGF0ZVByZXZpZXcoeyBldmVudCwgZGF5IH06IE5vdm9EYXRlU2VsZWN0RXZlbnQpIHtcbiAgICB0aGlzLnByZXZpZXcgPSB0aGlzLl9zdHJhdGVneS5jcmVhdGVQcmV2aWV3KGRheS5kYXRlLCB0aGlzLnNlbGVjdGVkLCBldmVudCk7XG4gICAgdGhpcy5wcmV2aWV3Q2hhbmdlLmVtaXQodGhpcy5wcmV2aWV3KTtcbiAgfVxuXG4gIHByZXZNb250aChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgY29uc3QgdG1wID0gc3ViTW9udGhzKHRoaXMuYWN0aXZlRGF0ZSwgMSk7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRtcCk7XG4gIH1cblxuICBuZXh0TW9udGgoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGNvbnN0IHRtcCA9IGFkZE1vbnRocyh0aGlzLmFjdGl2ZURhdGUsIDEpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXApO1xuICB9XG5cbiAgb3BlblZpZXcoZXZlbnQ6IEV2ZW50LCB0eXBlOiBzdHJpbmcpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG5cbiAgICAvLyBJZiB0aGV5IGNsaWNrIHRoZSB0b2dnbGUgdHdvIHRpbWUgaW4gYSByb3csIGNsb3NlIGl0IChnbyBiYWNrIHRvIGRheXMpXG4gICAgaWYgKHR5cGUgPT09IHRoaXMuYWN0aXZlVmlldykge1xuICAgICAgdGhpcy5hY3RpdmVWaWV3ID0gJ2RheXMnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZVZpZXcgPSB0eXBlO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0byBzY3JvbGwgdGhlIHNlbGVjdGVkIG9uZSBpbnRvIHZpZXdcbiAgICBpZiAodGhpcy5hY3RpdmVWaWV3ID09PSAneWVhcnMnIHx8IHRoaXMuYWN0aXZlVmlldyA9PT0gJ21vbnRocycpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuY2FsZW5kYXItY29udGVudC4ke3RoaXMuYWN0aXZlVmlld31gKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmNhbGVuZGFyLWNvbnRlbnQuJHt0aGlzLmFjdGl2ZVZpZXd9IC4ke3RoaXMuYWN0aXZlVmlldyA9PT0gJ3llYXJzJyA/ICd5ZWFyJyA6ICdtb250aCd9LnNlbGVjdGVkYCxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAmJiBzZWxlY3RlZEl0ZW0pIHtcbiAgICAgICAgICBjb250YWluZXIuc2Nyb2xsVG9wID0gc2VsZWN0ZWRJdGVtLm9mZnNldFRvcCAtIDEwMDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgX2lzUmFuZ2UoKSB7XG4gICAgcmV0dXJuIFsnd2VlaycsICdyYW5nZSddLmluY2x1ZGVzKHRoaXMubW9kZSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJjYWxlbmRhci1oZWFkZXJcIj5cbiAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiaWNvblwiIGljb249XCJwcmV2aW91c1wiIHNpemU9XCJzbWFsbFwiIChjbGljayk9XCJwcmV2TW9udGgoJGV2ZW50KVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLXByZXZpb3VzXCI+PC9ub3ZvLWJ1dHRvbj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgIDxzcGFuIGNsYXNzPVwiaGVhZGluZ1wiIFtjbGFzcy5zZWNvbmRhcnldPVwiaSA+IDBcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9udGhcIiAoY2xpY2spPVwib3BlblZpZXcoJGV2ZW50LCAnbW9udGhzJylcIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJoZWFkZXItbW9udGhcIj57eyBtb250aC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwieWVhclwiIChjbGljayk9XCJvcGVuVmlldygkZXZlbnQsICd5ZWFycycpXCJcbiAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaGVhZGVyLXllYXJcIj57eyBtb250aC5kYXRlPy5nZXRGdWxsWWVhcigpIH19PC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwibmV4dFwiIHNpemU9XCJzbWFsbFwiIChjbGljayk9XCJuZXh0TW9udGgoJGV2ZW50KVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLW5leHRcIj48L25vdm8tYnV0dG9uPlxuPC9kaXY+XG48c2VjdGlvbiBjbGFzcz1cImNhbGVuZGFyLWNvbnRlbnRcIiBbbmdTd2l0Y2hdPVwiYWN0aXZlVmlld1wiPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInZGF5cydcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb250aHM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1oZWFkZXJcIiAqbmdJZj1cImxheW91dD09PSd2ZXJ0aWNhbCcgJiYgaSA+IDBcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmV2aW91c1wiIChjbGljayk9XCJwcmV2TW9udGgoJGV2ZW50KVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLXByZXZpb3VzXCI+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRpbmdcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vbnRoXCIgKGNsaWNrKT1cIm9wZW5WaWV3KCRldmVudCwgJ21vbnRocycpXCJcbiAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImhlYWRlci1tb250aFwiPnt7IG1vbnRoLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwieWVhclwiIChjbGljayk9XCJvcGVuVmlldygkZXZlbnQsICd5ZWFycycpXCJcbiAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImhlYWRlci15ZWFyXCI+e3sgbW9udGguZGF0ZT8uZ2V0RnVsbFllYXIoKSB9fTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5leHRcIiAoY2xpY2spPVwibmV4dE1vbnRoKCRldmVudClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1uZXh0XCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8bm92by1tb250aC12aWV3XG4gICAgICAgIGNsYXNzPVwibW9udGgtdmlld1wiXG4gICAgICAgIFthY3RpdmVEYXRlXT1cIm1vbnRoLmRhdGVcIlxuICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICBbcHJldmlld109XCJwcmV2aWV3XCJcbiAgICAgICAgW292ZXJsYXlzXT1cIm92ZXJsYXlzXCJcbiAgICAgICAgW2lzUmFuZ2VdPVwiX2lzUmFuZ2UoKVwiXG4gICAgICAgIFtoaWRlT3ZlcmZsb3dEYXlzXT1cIm1vbnRocy5sZW5ndGggPiAxXCJcbiAgICAgICAgW3dlZWtTdGFydHNPbl09XCJ3ZWVrU3RhcnRzT25cIlxuICAgICAgICAoc2VsZWN0KT1cImRhdGVTZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgKGhvdmVyKT1cInVwZGF0ZVByZXZpZXcoJGV2ZW50KVwiPjwvbm92by1tb250aC12aWV3PlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5vdm8tbW9udGgtc2VsZWN0XG4gICAgKm5nU3dpdGNoQ2FzZT1cIidtb250aHMnXCJcbiAgICBbYWN0aXZlRGF0ZV09XCJhY3RpdmVEYXRlXCJcbiAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgIChzZWxlY3QpPVwibW9udGhTZWxlY3RlZCgkZXZlbnQpXCI+XG4gIDwvbm92by1tb250aC1zZWxlY3Q+XG4gIDxub3ZvLXllYXItc2VsZWN0XG4gICAgKm5nU3dpdGNoQ2FzZT1cIid5ZWFycydcIlxuICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgKHNlbGVjdCk9XCJ5ZWFyU2VsZWN0ZWQoJGV2ZW50KVwiPlxuICA8L25vdm8teWVhci1zZWxlY3Q+XG48L3NlY3Rpb24+Il19