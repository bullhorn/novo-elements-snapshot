// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { addMonths, isDate, isSameDay, setMonth, setYear, startOfDay, startOfMonth, subMonths } from 'date-fns';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { DefaultDateSelectionStrategy, MultiDateSelectionStrategy, RangeSelectionStrategy, WeekSelectionStrategy } from './strategies';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
import * as i4 from "novo-elements/elements/button";
import * as i5 from "./month-view/month-view.component";
import * as i6 from "./month-select/month-select.component";
import * as i7 from "./year-select/year-select.component";
export class NovoCalendarElement {
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
        this.updateView(this.activeDate);
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
        this._activeDate = new Date();
        this._mode = 'single';
        this._numberOfMonths = [0];
        this._weekStartsOn = 0;
        this._strategy = new DefaultDateSelectionStrategy();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoCalendarElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoCalendarElement, selector: "novo-calendar", inputs: { minYear: "minYear", maxYear: "maxYear", minDate: "minDate", maxDate: "maxDate", activeView: "activeView", layout: "layout", selected: "selected", preview: "preview", overlays: "overlays", disabledDateMessage: "disabledDateMessage", activeDate: "activeDate", weekStartsOn: "weekStartsOn", numberOfMonths: "numberOfMonths", mode: "mode" }, outputs: { selectedChange: "selectedChange", previewChange: "previewChange", activeDateChange: "activeDateChange" }, host: { properties: { "style.width": "this.hb_width", "class.layout-horizontal": "this.hb_horiztonal", "class.layout-vertical": "this.hb_vertical" } }, ngImport: i0, template: "<div class=\"calendar-header\">\n  <novo-button theme=\"icon\" icon=\"previous\" size=\"small\" (click)=\"prevMonth($event)\"\n    data-automation-id=\"calendar-previous\" tabindex=\"0\"></novo-button>\n  <ng-container *ngFor=\"let month of months; let i = index;\">\n    <span class=\"heading\" [class.secondary]=\"i > 0\">\n      <span class=\"month\" (click)=\"openView($event, 'months')\"\n        data-automation-id=\"header-month\" tabindex=\"0\">{{ month.label }}</span>\n      <span class=\"year\" (click)=\"openView($event, 'years')\"\n        data-automation-id=\"header-year\" tabindex=\"0\">{{ month.date?.getFullYear() }}</span>\n    </span>\n  </ng-container>\n  <novo-button theme=\"icon\" icon=\"next\" size=\"small\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\" tabindex=\"0\">\n  </novo-button>\n</div>\n<section class=\"calendar-content\" [ngSwitch]=\"activeView\">\n  <ng-container *ngSwitchCase=\"'days'\">\n    <ng-container *ngFor=\"let month of months; let i = index\">\n      <div class=\"calendar-header\" *ngIf=\"layout==='vertical' && i > 0\">\n        <span class=\"previous\" (click)=\"prevMonth($event)\" data-automation-id=\"calendar-previous\" tabindex=\"0\"></span>\n        <span class=\"heading\">\n          <span class=\"month\" (click)=\"openView($event, 'months')\"\n            data-automation-id=\"header-month\" tabindex=\"0\">{{ month.label }}</span>\n          <span class=\"year\" (click)=\"openView($event, 'years')\"\n            data-automation-id=\"header-year\" tabindex=\"0\">{{ month.date?.getFullYear() }}</span>\n        </span>\n        <span class=\"next\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\"></span>\n      </div>\n      <novo-month-view\n        class=\"month-view\"\n        [activeDate]=\"month.date\"\n        [selected]=\"selected\"\n        [preview]=\"preview\"\n        [overlays]=\"overlays\"\n        [isRange]=\"_isRange()\"\n        [hideOverflowDays]=\"months.length > 1\"\n        [weekStartsOn]=\"weekStartsOn\"\n        [disabledDateMessage]=\"disabledDateMessage\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        (select)=\"dateSelected($event)\"\n        (hover)=\"updatePreview($event)\"></novo-month-view>\n    </ng-container>\n  </ng-container>\n  <novo-month-select\n    *ngSwitchCase=\"'months'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"monthSelected($event)\">\n  </novo-month-select>\n  <novo-year-select\n    *ngSwitchCase=\"'years'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"yearSelected($event)\">\n  </novo-year-select>\n</section>", styles: [":host(.layout-horizontal){font-size:1.2rem}:host(.layout-horizontal) .calendar-content{flex-flow:row nowrap}:host(.layout-horizontal) .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host(.layout-vertical) .calendar-content{flex-flow:column nowrap}:host(.layout-vertical) .calendar-header .heading.secondary{display:none}:host{display:block;width:100%;text-align:center;background:var(--background-bright);color:var(--text-main);position:relative;-webkit-user-select:none;user-select:none}:host .calendar-content{display:flex;width:100%;height:min-content;position:static;top:0;left:0;overflow:hidden}:host .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:1rem .8rem;-webkit-user-select:none;justify-content:space-between;align-items:center;cursor:default;border-bottom:1px solid var(--border)}:host .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "component", type: i5.NovoMonthViewElement, selector: "novo-month-view", inputs: ["minDate", "maxDate", "activeDate", "selected", "preview", "overlays", "disabledDateMessage", "isRange", "hideOverflowDays", "weekStartsOn"], outputs: ["select", "hover"] }, { kind: "component", type: i6.NovoMonthSelectElement, selector: "novo-month-select", inputs: ["activeDate", "selected"], outputs: ["select"] }, { kind: "component", type: i7.NovoYearSelectElement, selector: "novo-year-select", inputs: ["minYear", "maxYear", "activeDate", "selected"], outputs: ["select"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoCalendarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-calendar', template: "<div class=\"calendar-header\">\n  <novo-button theme=\"icon\" icon=\"previous\" size=\"small\" (click)=\"prevMonth($event)\"\n    data-automation-id=\"calendar-previous\" tabindex=\"0\"></novo-button>\n  <ng-container *ngFor=\"let month of months; let i = index;\">\n    <span class=\"heading\" [class.secondary]=\"i > 0\">\n      <span class=\"month\" (click)=\"openView($event, 'months')\"\n        data-automation-id=\"header-month\" tabindex=\"0\">{{ month.label }}</span>\n      <span class=\"year\" (click)=\"openView($event, 'years')\"\n        data-automation-id=\"header-year\" tabindex=\"0\">{{ month.date?.getFullYear() }}</span>\n    </span>\n  </ng-container>\n  <novo-button theme=\"icon\" icon=\"next\" size=\"small\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\" tabindex=\"0\">\n  </novo-button>\n</div>\n<section class=\"calendar-content\" [ngSwitch]=\"activeView\">\n  <ng-container *ngSwitchCase=\"'days'\">\n    <ng-container *ngFor=\"let month of months; let i = index\">\n      <div class=\"calendar-header\" *ngIf=\"layout==='vertical' && i > 0\">\n        <span class=\"previous\" (click)=\"prevMonth($event)\" data-automation-id=\"calendar-previous\" tabindex=\"0\"></span>\n        <span class=\"heading\">\n          <span class=\"month\" (click)=\"openView($event, 'months')\"\n            data-automation-id=\"header-month\" tabindex=\"0\">{{ month.label }}</span>\n          <span class=\"year\" (click)=\"openView($event, 'years')\"\n            data-automation-id=\"header-year\" tabindex=\"0\">{{ month.date?.getFullYear() }}</span>\n        </span>\n        <span class=\"next\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\"></span>\n      </div>\n      <novo-month-view\n        class=\"month-view\"\n        [activeDate]=\"month.date\"\n        [selected]=\"selected\"\n        [preview]=\"preview\"\n        [overlays]=\"overlays\"\n        [isRange]=\"_isRange()\"\n        [hideOverflowDays]=\"months.length > 1\"\n        [weekStartsOn]=\"weekStartsOn\"\n        [disabledDateMessage]=\"disabledDateMessage\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        (select)=\"dateSelected($event)\"\n        (hover)=\"updatePreview($event)\"></novo-month-view>\n    </ng-container>\n  </ng-container>\n  <novo-month-select\n    *ngSwitchCase=\"'months'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"monthSelected($event)\">\n  </novo-month-select>\n  <novo-year-select\n    *ngSwitchCase=\"'years'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"yearSelected($event)\">\n  </novo-year-select>\n</section>", styles: [":host(.layout-horizontal){font-size:1.2rem}:host(.layout-horizontal) .calendar-content{flex-flow:row nowrap}:host(.layout-horizontal) .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host(.layout-vertical) .calendar-content{flex-flow:column nowrap}:host(.layout-vertical) .calendar-header .heading.secondary{display:none}:host{display:block;width:100%;text-align:center;background:var(--background-bright);color:var(--text-main);position:relative;-webkit-user-select:none;user-select:none}:host .calendar-content{display:flex;width:100%;height:min-content;position:static;top:0;left:0;overflow:hidden}:host .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:1rem .8rem;-webkit-user-select:none;justify-content:space-between;align-items:center;cursor:default;border-bottom:1px solid var(--border)}:host .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.DomSanitizer }]; }, propDecorators: { minYear: [{
                type: Input
            }], maxYear: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
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
            }], disabledDateMessage: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsU0FBUztBQUNULE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hILE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFTOUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLDBCQUEwQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7Ozs7QUFPdkksTUFBTSxPQUFPLG1CQUFtQjtJQWdCOUIsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1B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LFlBQVksRUFBRTtvQkFDN0IsU0FBUyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztpQkFDcEQ7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQzsrR0ExTlUsbUJBQW1CO21HQUFuQixtQkFBbUIsOHBCQ3ZCaEMsK21GQXVEVTs7NEZEaENHLG1CQUFtQjtrQkFML0IsU0FBUzsrQkFDRSxlQUFlOzJMQU16QixPQUFPO3NCQUROLEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQUdOLE9BQU87c0JBRE4sS0FBSztnQkFHTixPQUFPO3NCQUROLEtBQUs7Z0JBSU4sVUFBVTtzQkFEVCxLQUFLO2dCQUdOLE1BQU07c0JBREwsS0FBSztnQkFLRixRQUFRO3NCQURYLEtBQUs7Z0JBUU4sY0FBYztzQkFEYixNQUFNO2dCQUdQLE9BQU87c0JBRE4sS0FBSztnQkFHTixhQUFhO3NCQURaLE1BQU07Z0JBR1AsZ0JBQWdCO3NCQURmLE1BQU07Z0JBSVAsUUFBUTtzQkFEUCxLQUFLO2dCQUdOLG1CQUFtQjtzQkFEbEIsS0FBSztnQkFZRixVQUFVO3NCQURiLEtBQUs7Z0JBYUYsWUFBWTtzQkFEZixLQUFLO2dCQVlGLGNBQWM7c0JBRGpCLEtBQUs7Z0JBVUYsSUFBSTtzQkFEUCxLQUFLO2dCQTBCRixRQUFRO3NCQURYLFdBQVc7dUJBQUMsYUFBYTtnQkFTdEIsYUFBYTtzQkFEaEIsV0FBVzt1QkFBQyx5QkFBeUI7Z0JBTWxDLFdBQVc7c0JBRGQsV0FBVzt1QkFBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vLyBWZW5kb3JcbmltcG9ydCB7IGFkZE1vbnRocywgaXNEYXRlLCBpc1NhbWVEYXksIHNldE1vbnRoLCBzZXRZZWFyLCBzdGFydE9mRGF5LCBzdGFydE9mTW9udGgsIHN1Yk1vbnRocyB9IGZyb20gJ2RhdGUtZm5zJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHR5cGUge1xuICBEYXRlUGlja2VyU2VsZWN0TW9kZXMsXG4gIE5vdm9EYXRlU2VsZWN0RXZlbnQsXG4gIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3ksXG4gIE5vdm9Nb250aFNlbGVjdEV2ZW50LFxuICBOb3ZvWWVhclNlbGVjdEV2ZW50LFxuICBPdmVybGF5RGF0ZSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBEZWZhdWx0RGF0ZVNlbGVjdGlvblN0cmF0ZWd5LCBNdWx0aURhdGVTZWxlY3Rpb25TdHJhdGVneSwgUmFuZ2VTZWxlY3Rpb25TdHJhdGVneSwgV2Vla1NlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYWxlbmRhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DYWxlbmRhckVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBtaW5ZZWFyOiBzdHJpbmcgfCBudW1iZXI7XG4gIEBJbnB1dCgpXG4gIG1heFllYXI6IHN0cmluZyB8IG51bWJlcjtcbiAgQElucHV0KClcbiAgbWluRGF0ZTogc3RyaW5nIHwgbnVtYmVyO1xuICBASW5wdXQoKVxuICBtYXhEYXRlOiBzdHJpbmcgfCBudW1iZXI7XG4gIC8vIERlZmF1bHQgdmlldyBtb2RlIChzZWxlY3QgZGF5cylcbiAgQElucHV0KClcbiAgYWN0aXZlVmlldzogc3RyaW5nID0gJ2RheXMnO1xuICBASW5wdXQoKVxuICBsYXlvdXQ6IHN0cmluZyA9ICdob3Jpem9udGFsJztcblxuICBfc2VsZWN0ZWQ6IERhdGVbXSA9IFtdO1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogRGF0ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZSA/IHZhbHVlLmZpbHRlcihpc0RhdGUpLm1hcCgoZCkgPT4gc3RhcnRPZkRheShkKSkgOiBbXTtcbiAgfVxuICBAT3V0cHV0KClcbiAgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKVxuICBwcmV2aWV3OiBEYXRlW10gPSBbXTtcbiAgQE91dHB1dCgpXG4gIHByZXZpZXdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgYWN0aXZlRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpXG4gIG92ZXJsYXlzOiBPdmVybGF5RGF0ZVtdID0gW107XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkRGF0ZU1lc3NhZ2U6IHN0cmluZztcblxuICBfYWN0aXZlRGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIF9tb2RlOiBEYXRlUGlja2VyU2VsZWN0TW9kZXMgPSAnc2luZ2xlJztcbiAgX251bWJlck9mTW9udGhzOiBudW1iZXJbXSA9IFswXTtcbiAgX3dlZWtTdGFydHNPbjogRGF5ID0gMDtcbiAgX3N0cmF0ZWd5OiBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5PGFueT4gPSBuZXcgRGVmYXVsdERhdGVTZWxlY3Rpb25TdHJhdGVneSgpO1xuXG4gIG1vbnRoczogYW55O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBhY3RpdmVEYXRlKCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEYXRlO1xuICB9XG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlKSB7XG4gICAgaWYgKCFpc1NhbWVEYXkodmFsdWUsIHRoaXMuX2FjdGl2ZURhdGUpKSB7XG4gICAgICB0aGlzLl9hY3RpdmVEYXRlID0gdmFsdWU7XG4gICAgICB0aGlzLmFjdGl2ZURhdGVDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCB3ZWVrU3RhcnRzT24oKTogRGF5IHtcbiAgICByZXR1cm4gdGhpcy5fd2Vla1N0YXJ0c09uO1xuICB9XG4gIHNldCB3ZWVrU3RhcnRzT24odmFsdWU6IERheSkge1xuICAgIHRoaXMuX3dlZWtTdGFydHNPbiA9IHZhbHVlO1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICd3ZWVrJykge1xuICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgV2Vla1NlbGVjdGlvblN0cmF0ZWd5KHRoaXMud2Vla1N0YXJ0c09uKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgbnVtYmVyT2ZNb250aHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZNb250aHMubGVuZ3RoO1xuICB9XG4gIHNldCBudW1iZXJPZk1vbnRocyh2YWx1ZSkge1xuICAgIHRoaXMuX251bWJlck9mTW9udGhzID0gQXJyYXkuZnJvbShBcnJheShOdW1iZXIodmFsdWUpKS5rZXlzKCkpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IG1vZGUoKTogRGF0ZVBpY2tlclNlbGVjdE1vZGVzIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZTtcbiAgfVxuICBzZXQgbW9kZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9tb2RlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbW9kZSA9IHZhbHVlO1xuICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlICdtdWx0aXBsZSc6XG4gICAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgTXVsdGlEYXRlU2VsZWN0aW9uU3RyYXRlZ3koKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gbmV3IFJhbmdlU2VsZWN0aW9uU3RyYXRlZ3koKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgV2Vla1NlbGVjdGlvblN0cmF0ZWd5KHRoaXMud2Vla1N0YXJ0c09uKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc2luZ2xlJzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLl9zdHJhdGVneSA9IG5ldyBEZWZhdWx0RGF0ZVNlbGVjdGlvblN0cmF0ZWd5KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpXG4gIGdldCBoYl93aWR0aCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGBtaW4tY29udGVudGApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgbWluLWNvbnRlbnRgKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubGF5b3V0LWhvcml6b250YWwnKVxuICBnZXQgaGJfaG9yaXp0b25hbCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgIT09ICd2ZXJ0aWNhbCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxheW91dC12ZXJ0aWNhbCcpXG4gIGdldCBoYl92ZXJ0aWNhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09ICd2ZXJ0aWNhbCc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRGF0ZSkge1xuICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5zZWxlY3RlZC5sZW5ndGggPyB0aGlzLnNlbGVjdGVkWzBdIDogbmV3IERhdGUoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICB1cGRhdGVWaWV3KGFjdGl2ZURhdGU6IERhdGUpIHtcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSBuZXcgRGF0ZShhY3RpdmVEYXRlID8gbmV3IERhdGUoYWN0aXZlRGF0ZSkgOiBuZXcgRGF0ZSgpKTtcbiAgICB0aGlzLm1vbnRocyA9IFtdO1xuICAgIGNvbnN0IG1vbnRoID0gc3RhcnRPZk1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgZm9yIChjb25zdCBpIG9mIHRoaXMuX251bWJlck9mTW9udGhzKSB7XG4gICAgICBjb25zdCBkYXRlID0gYWRkTW9udGhzKG1vbnRoLCBpKTtcbiAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQoZGF0ZSwgeyBtb250aDogJ3Nob3J0JyB9KTtcbiAgICAgIHRoaXMubW9udGhzLnB1c2goeyBkYXRlLCBsYWJlbCB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRUb2RheSgpIHtcbiAgICBjb25zdCB0bXAgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXApO1xuICAgIC8vIEdvIGJhY2sgdG8gZGF5c1xuICAgIHRoaXMub3BlblZpZXcobnVsbCwgJ2RheXMnKTtcbiAgfVxuXG4gIG1vbnRoU2VsZWN0ZWQoeyBldmVudCwgbW9udGggfTogTm92b01vbnRoU2VsZWN0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5hY3RpdmVEYXRlID8gdGhpcy5hY3RpdmVEYXRlIDogbmV3IERhdGUoKS5nZXRNb250aCgpO1xuICAgIGNvbnN0IHRtcCA9IHNldE1vbnRoKGRhdGUsIG1vbnRoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgICAvLyBHbyBiYWNrIHRvIGRheXNcbiAgICB0aGlzLm9wZW5WaWV3KG51bGwsICdkYXlzJyk7XG4gIH1cblxuICB5ZWFyU2VsZWN0ZWQoeyBldmVudCwgeWVhciB9OiBOb3ZvWWVhclNlbGVjdEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuYWN0aXZlRGF0ZSA/IHRoaXMuYWN0aXZlRGF0ZSA6IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgdG1wID0gc2V0WWVhcihkYXRlLCB5ZWFyKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgICAvLyBHbyBiYWNrIHRvIGRheXNcbiAgICB0aGlzLm9wZW5WaWV3KG51bGwsICdkYXlzJyk7XG4gIH1cblxuICBkYXRlU2VsZWN0ZWQoeyBldmVudCwgZGF5IH06IE5vdm9EYXRlU2VsZWN0RXZlbnQpIHtcbiAgICAvLyBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuX3N0cmF0ZWd5LnNlbGVjdGlvbkZpbmlzaGVkKGRheS5kYXRlLCB0aGlzLnNlbGVjdGVkLCBldmVudCk7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgdXBkYXRlUHJldmlldyh7IGV2ZW50LCBkYXkgfTogTm92b0RhdGVTZWxlY3RFdmVudCkge1xuICAgIHRoaXMucHJldmlldyA9IHRoaXMuX3N0cmF0ZWd5LmNyZWF0ZVByZXZpZXcoZGF5LmRhdGUsIHRoaXMuc2VsZWN0ZWQsIGV2ZW50KTtcbiAgICB0aGlzLnByZXZpZXdDaGFuZ2UuZW1pdCh0aGlzLnByZXZpZXcpO1xuICB9XG5cbiAgcHJldk1vbnRoKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICBjb25zdCB0bXAgPSBzdWJNb250aHModGhpcy5hY3RpdmVEYXRlLCAxKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgfVxuXG4gIG5leHRNb250aChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgY29uc3QgdG1wID0gYWRkTW9udGhzKHRoaXMuYWN0aXZlRGF0ZSwgMSk7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRtcCk7XG4gIH1cblxuICBvcGVuVmlldyhldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZykge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcblxuICAgIC8vIElmIHRoZXkgY2xpY2sgdGhlIHRvZ2dsZSB0d28gdGltZSBpbiBhIHJvdywgY2xvc2UgaXQgKGdvIGJhY2sgdG8gZGF5cylcbiAgICBpZiAodHlwZSA9PT0gdGhpcy5hY3RpdmVWaWV3KSB7XG4gICAgICB0aGlzLmFjdGl2ZVZpZXcgPSAnZGF5cyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlVmlldyA9IHR5cGU7XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRvIHNjcm9sbCB0aGUgc2VsZWN0ZWQgb25lIGludG8gdmlld1xuICAgIGlmICh0aGlzLmFjdGl2ZVZpZXcgPT09ICd5ZWFycycgfHwgdGhpcy5hY3RpdmVWaWV3ID09PSAnbW9udGhzJykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jYWxlbmRhci1jb250ZW50LiR7dGhpcy5hY3RpdmVWaWV3fWApO1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuY2FsZW5kYXItY29udGVudC4ke3RoaXMuYWN0aXZlVmlld30gLiR7dGhpcy5hY3RpdmVWaWV3ID09PSAneWVhcnMnID8gJ3llYXInIDogJ21vbnRoJ30uc2VsZWN0ZWRgLFxuICAgICAgICApO1xuICAgICAgICBpZiAoY29udGFpbmVyICYmIHNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBzZWxlY3RlZEl0ZW0ub2Zmc2V0VG9wIC0gMTAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfaXNSYW5nZSgpIHtcbiAgICByZXR1cm4gWyd3ZWVrJywgJ3JhbmdlJ10uaW5jbHVkZXModGhpcy5tb2RlKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNhbGVuZGFyLWhlYWRlclwiPlxuICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cInByZXZpb3VzXCIgc2l6ZT1cInNtYWxsXCIgKGNsaWNrKT1cInByZXZNb250aCgkZXZlbnQpXCJcbiAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1wcmV2aW91c1wiIHRhYmluZGV4PVwiMFwiPjwvbm92by1idXR0b24+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRoczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICA8c3BhbiBjbGFzcz1cImhlYWRpbmdcIiBbY2xhc3Muc2Vjb25kYXJ5XT1cImkgPiAwXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbnRoXCIgKGNsaWNrKT1cIm9wZW5WaWV3KCRldmVudCwgJ21vbnRocycpXCJcbiAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaGVhZGVyLW1vbnRoXCIgdGFiaW5kZXg9XCIwXCI+e3sgbW9udGgubGFiZWwgfX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInllYXJcIiAoY2xpY2spPVwib3BlblZpZXcoJGV2ZW50LCAneWVhcnMnKVwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImhlYWRlci15ZWFyXCIgdGFiaW5kZXg9XCIwXCI+e3sgbW9udGguZGF0ZT8uZ2V0RnVsbFllYXIoKSB9fTwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cIm5leHRcIiBzaXplPVwic21hbGxcIiAoY2xpY2spPVwibmV4dE1vbnRoKCRldmVudClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1uZXh0XCIgdGFiaW5kZXg9XCIwXCI+XG4gIDwvbm92by1idXR0b24+XG48L2Rpdj5cbjxzZWN0aW9uIGNsYXNzPVwiY2FsZW5kYXItY29udGVudFwiIFtuZ1N3aXRjaF09XCJhY3RpdmVWaWV3XCI+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXlzJ1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRoczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWhlYWRlclwiICpuZ0lmPVwibGF5b3V0PT09J3ZlcnRpY2FsJyAmJiBpID4gMFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInByZXZpb3VzXCIgKGNsaWNrKT1cInByZXZNb250aCgkZXZlbnQpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY2FsZW5kYXItcHJldmlvdXNcIiB0YWJpbmRleD1cIjBcIj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaGVhZGluZ1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibW9udGhcIiAoY2xpY2spPVwib3BlblZpZXcoJGV2ZW50LCAnbW9udGhzJylcIlxuICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaGVhZGVyLW1vbnRoXCIgdGFiaW5kZXg9XCIwXCI+e3sgbW9udGgubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ5ZWFyXCIgKGNsaWNrKT1cIm9wZW5WaWV3KCRldmVudCwgJ3llYXJzJylcIlxuICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaGVhZGVyLXllYXJcIiB0YWJpbmRleD1cIjBcIj57eyBtb250aC5kYXRlPy5nZXRGdWxsWWVhcigpIH19PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibmV4dFwiIChjbGljayk9XCJuZXh0TW9udGgoJGV2ZW50KVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLW5leHRcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxub3ZvLW1vbnRoLXZpZXdcbiAgICAgICAgY2xhc3M9XCJtb250aC12aWV3XCJcbiAgICAgICAgW2FjdGl2ZURhdGVdPVwibW9udGguZGF0ZVwiXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgIFtwcmV2aWV3XT1cInByZXZpZXdcIlxuICAgICAgICBbb3ZlcmxheXNdPVwib3ZlcmxheXNcIlxuICAgICAgICBbaXNSYW5nZV09XCJfaXNSYW5nZSgpXCJcbiAgICAgICAgW2hpZGVPdmVyZmxvd0RheXNdPVwibW9udGhzLmxlbmd0aCA+IDFcIlxuICAgICAgICBbd2Vla1N0YXJ0c09uXT1cIndlZWtTdGFydHNPblwiXG4gICAgICAgIFtkaXNhYmxlZERhdGVNZXNzYWdlXT1cImRpc2FibGVkRGF0ZU1lc3NhZ2VcIlxuICAgICAgICBbbWluRGF0ZV09XCJtaW5EYXRlXCJcbiAgICAgICAgW21heERhdGVdPVwibWF4RGF0ZVwiXG4gICAgICAgIChzZWxlY3QpPVwiZGF0ZVNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAoaG92ZXIpPVwidXBkYXRlUHJldmlldygkZXZlbnQpXCI+PC9ub3ZvLW1vbnRoLXZpZXc+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bm92by1tb250aC1zZWxlY3RcbiAgICAqbmdTd2l0Y2hDYXNlPVwiJ21vbnRocydcIlxuICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgKHNlbGVjdCk9XCJtb250aFNlbGVjdGVkKCRldmVudClcIj5cbiAgPC9ub3ZvLW1vbnRoLXNlbGVjdD5cbiAgPG5vdm8teWVhci1zZWxlY3RcbiAgICAqbmdTd2l0Y2hDYXNlPVwiJ3llYXJzJ1wiXG4gICAgW2FjdGl2ZURhdGVdPVwiYWN0aXZlRGF0ZVwiXG4gICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAoc2VsZWN0KT1cInllYXJTZWxlY3RlZCgkZXZlbnQpXCI+XG4gIDwvbm92by15ZWFyLXNlbGVjdD5cbjwvc2VjdGlvbj4iXX0=