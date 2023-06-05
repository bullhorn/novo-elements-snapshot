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
import * as i3 from "novo-elements/elements/button";
import * as i4 from "./month-view/month-view.component";
import * as i5 from "./month-select/month-select.component";
import * as i6 from "./year-select/year-select.component";
import * as i7 from "@angular/common";
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
        this._activeDate = new Date();
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
NovoCalendarElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCalendarElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoCalendarElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoCalendarElement, selector: "novo-calendar", inputs: { minYear: "minYear", maxYear: "maxYear", minDate: "minDate", maxDate: "maxDate", activeView: "activeView", layout: "layout", selected: "selected", preview: "preview", overlays: "overlays", disabledDateMessage: "disabledDateMessage", activeDate: "activeDate", weekStartsOn: "weekStartsOn", numberOfMonths: "numberOfMonths", mode: "mode" }, outputs: { selectedChange: "selectedChange", previewChange: "previewChange", activeDateChange: "activeDateChange" }, host: { properties: { "style.width": "this.hb_width", "class.layout-horizontal": "this.hb_horiztonal", "class.layout-vertical": "this.hb_vertical" } }, ngImport: i0, template: "<div class=\"calendar-header\">\n  <novo-button theme=\"icon\" icon=\"previous\" size=\"small\" (click)=\"prevMonth($event)\"\n    data-automation-id=\"calendar-previous\"></novo-button>\n  <ng-container *ngFor=\"let month of months; let i = index;\">\n    <span class=\"heading\" [class.secondary]=\"i > 0\">\n      <span class=\"month\" (click)=\"openView($event, 'months')\"\n        data-automation-id=\"header-month\">{{ month.label }}</span>\n      <span class=\"year\" (click)=\"openView($event, 'years')\"\n        data-automation-id=\"header-year\">{{ month.date?.getFullYear() }}</span>\n    </span>\n  </ng-container>\n  <novo-button theme=\"icon\" icon=\"next\" size=\"small\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\">\n  </novo-button>\n</div>\n<section class=\"calendar-content\" [ngSwitch]=\"activeView\">\n  <ng-container *ngSwitchCase=\"'days'\">\n    <ng-container *ngFor=\"let month of months; let i = index\">\n      <div class=\"calendar-header\" *ngIf=\"layout==='vertical' && i > 0\">\n        <span class=\"previous\" (click)=\"prevMonth($event)\" data-automation-id=\"calendar-previous\"></span>\n        <span class=\"heading\">\n          <span class=\"month\" (click)=\"openView($event, 'months')\"\n            data-automation-id=\"header-month\">{{ month.label }}</span>\n          <span class=\"year\" (click)=\"openView($event, 'years')\"\n            data-automation-id=\"header-year\">{{ month.date?.getFullYear() }}</span>\n        </span>\n        <span class=\"next\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\"></span>\n      </div>\n      <novo-month-view\n        class=\"month-view\"\n        [activeDate]=\"month.date\"\n        [selected]=\"selected\"\n        [preview]=\"preview\"\n        [overlays]=\"overlays\"\n        [isRange]=\"_isRange()\"\n        [hideOverflowDays]=\"months.length > 1\"\n        [weekStartsOn]=\"weekStartsOn\"\n        [disabledDateMessage]=\"disabledDateMessage\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        (select)=\"dateSelected($event)\"\n        (hover)=\"updatePreview($event)\"></novo-month-view>\n    </ng-container>\n  </ng-container>\n  <novo-month-select\n    *ngSwitchCase=\"'months'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"monthSelected($event)\">\n  </novo-month-select>\n  <novo-year-select\n    *ngSwitchCase=\"'years'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"yearSelected($event)\">\n  </novo-year-select>\n</section>", styles: [":host(.layout-horizontal){font-size:1.2rem}:host(.layout-horizontal) .calendar-content{flex-flow:row nowrap}:host(.layout-horizontal) .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host(.layout-vertical) .calendar-content{flex-flow:column nowrap}:host(.layout-vertical) .calendar-header .heading.secondary{display:none}:host{display:block;width:100%;text-align:center;background:var(--background-bright);color:var(--text-main);position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host .calendar-content{display:flex;width:100%;height:-webkit-min-content;height:-moz-min-content;height:min-content;position:static;top:0;left:0;overflow:hidden}:host .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:1rem .8rem;-webkit-user-select:none;justify-content:space-between;align-items:center;cursor:default;border-bottom:1px solid var(--border)}:host .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}\n"], components: [{ type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i4.NovoMonthViewElement, selector: "novo-month-view", inputs: ["minDate", "maxDate", "activeDate", "selected", "preview", "overlays", "disabledDateMessage", "isRange", "hideOverflowDays", "weekStartsOn"], outputs: ["select", "hover"] }, { type: i5.NovoMonthSelectElement, selector: "novo-month-select", inputs: ["activeDate", "selected"], outputs: ["select"] }, { type: i6.NovoYearSelectElement, selector: "novo-year-select", inputs: ["minYear", "maxYear", "activeDate", "selected"], outputs: ["select"] }], directives: [{ type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i7.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCalendarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-calendar', template: "<div class=\"calendar-header\">\n  <novo-button theme=\"icon\" icon=\"previous\" size=\"small\" (click)=\"prevMonth($event)\"\n    data-automation-id=\"calendar-previous\"></novo-button>\n  <ng-container *ngFor=\"let month of months; let i = index;\">\n    <span class=\"heading\" [class.secondary]=\"i > 0\">\n      <span class=\"month\" (click)=\"openView($event, 'months')\"\n        data-automation-id=\"header-month\">{{ month.label }}</span>\n      <span class=\"year\" (click)=\"openView($event, 'years')\"\n        data-automation-id=\"header-year\">{{ month.date?.getFullYear() }}</span>\n    </span>\n  </ng-container>\n  <novo-button theme=\"icon\" icon=\"next\" size=\"small\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\">\n  </novo-button>\n</div>\n<section class=\"calendar-content\" [ngSwitch]=\"activeView\">\n  <ng-container *ngSwitchCase=\"'days'\">\n    <ng-container *ngFor=\"let month of months; let i = index\">\n      <div class=\"calendar-header\" *ngIf=\"layout==='vertical' && i > 0\">\n        <span class=\"previous\" (click)=\"prevMonth($event)\" data-automation-id=\"calendar-previous\"></span>\n        <span class=\"heading\">\n          <span class=\"month\" (click)=\"openView($event, 'months')\"\n            data-automation-id=\"header-month\">{{ month.label }}</span>\n          <span class=\"year\" (click)=\"openView($event, 'years')\"\n            data-automation-id=\"header-year\">{{ month.date?.getFullYear() }}</span>\n        </span>\n        <span class=\"next\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\"></span>\n      </div>\n      <novo-month-view\n        class=\"month-view\"\n        [activeDate]=\"month.date\"\n        [selected]=\"selected\"\n        [preview]=\"preview\"\n        [overlays]=\"overlays\"\n        [isRange]=\"_isRange()\"\n        [hideOverflowDays]=\"months.length > 1\"\n        [weekStartsOn]=\"weekStartsOn\"\n        [disabledDateMessage]=\"disabledDateMessage\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        (select)=\"dateSelected($event)\"\n        (hover)=\"updatePreview($event)\"></novo-month-view>\n    </ng-container>\n  </ng-container>\n  <novo-month-select\n    *ngSwitchCase=\"'months'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"monthSelected($event)\">\n  </novo-month-select>\n  <novo-year-select\n    *ngSwitchCase=\"'years'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"yearSelected($event)\">\n  </novo-year-select>\n</section>", styles: [":host(.layout-horizontal){font-size:1.2rem}:host(.layout-horizontal) .calendar-content{flex-flow:row nowrap}:host(.layout-horizontal) .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host(.layout-vertical) .calendar-content{flex-flow:column nowrap}:host(.layout-vertical) .calendar-header .heading.secondary{display:none}:host{display:block;width:100%;text-align:center;background:var(--background-bright);color:var(--text-main);position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host .calendar-content{display:flex;width:100%;height:-webkit-min-content;height:-moz-min-content;height:min-content;position:static;top:0;left:0;overflow:hidden}:host .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:1rem .8rem;-webkit-user-select:none;justify-content:space-between;align-items:center;cursor:default;border-bottom:1px solid var(--border)}:host .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsU0FBUztBQUNULE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hILE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFTOUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLDBCQUEwQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7Ozs7QUFPdkksTUFBTSxPQUFPLG1CQUFtQjtJQXdIOUIsWUFDUyxNQUF3QixFQUN2QixPQUFtQixFQUNuQixHQUFzQixFQUN0QixVQUF3QjtRQUh6QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGVBQVUsR0FBVixV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SSxZQUFZLEVBQUU7b0JBQzdCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7aUJBQ3BEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7O2lIQTFOVSxtQkFBbUI7cUdBQW5CLG1CQUFtQiw4cEJDdkJoQyxzZ0ZBdURVOzRGRGhDRyxtQkFBbUI7a0JBTC9CLFNBQVM7K0JBQ0UsZUFBZTsyTEFNekIsT0FBTztzQkFETixLQUFLO2dCQUdOLE9BQU87c0JBRE4sS0FBSztnQkFHTixPQUFPO3NCQUROLEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQUlOLFVBQVU7c0JBRFQsS0FBSztnQkFHTixNQUFNO3NCQURMLEtBQUs7Z0JBS0YsUUFBUTtzQkFEWCxLQUFLO2dCQVFOLGNBQWM7c0JBRGIsTUFBTTtnQkFHUCxPQUFPO3NCQUROLEtBQUs7Z0JBR04sYUFBYTtzQkFEWixNQUFNO2dCQUdQLGdCQUFnQjtzQkFEZixNQUFNO2dCQUlQLFFBQVE7c0JBRFAsS0FBSztnQkFHTixtQkFBbUI7c0JBRGxCLEtBQUs7Z0JBWUYsVUFBVTtzQkFEYixLQUFLO2dCQWFGLFlBQVk7c0JBRGYsS0FBSztnQkFZRixjQUFjO3NCQURqQixLQUFLO2dCQVVGLElBQUk7c0JBRFAsS0FBSztnQkEwQkYsUUFBUTtzQkFEWCxXQUFXO3VCQUFDLGFBQWE7Z0JBU3RCLGFBQWE7c0JBRGhCLFdBQVc7dUJBQUMseUJBQXlCO2dCQU1sQyxXQUFXO3NCQURkLFdBQVc7dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBhZGRNb250aHMsIGlzRGF0ZSwgaXNTYW1lRGF5LCBzZXRNb250aCwgc2V0WWVhciwgc3RhcnRPZkRheSwgc3RhcnRPZk1vbnRoLCBzdWJNb250aHMgfSBmcm9tICdkYXRlLWZucyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB0eXBlIHtcbiAgRGF0ZVBpY2tlclNlbGVjdE1vZGVzLFxuICBOb3ZvRGF0ZVNlbGVjdEV2ZW50LFxuICBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5LFxuICBOb3ZvTW9udGhTZWxlY3RFdmVudCxcbiAgTm92b1llYXJTZWxlY3RFdmVudCxcbiAgT3ZlcmxheURhdGUsXG59IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgRGVmYXVsdERhdGVTZWxlY3Rpb25TdHJhdGVneSwgTXVsdGlEYXRlU2VsZWN0aW9uU3RyYXRlZ3ksIFJhbmdlU2VsZWN0aW9uU3RyYXRlZ3ksIFdlZWtTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2FsZW5kYXJFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbWluWWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICBASW5wdXQoKVxuICBtYXhZZWFyOiBzdHJpbmcgfCBudW1iZXI7XG4gIEBJbnB1dCgpXG4gIG1pbkRhdGU6IHN0cmluZyB8IG51bWJlcjtcbiAgQElucHV0KClcbiAgbWF4RGF0ZTogc3RyaW5nIHwgbnVtYmVyO1xuICAvLyBEZWZhdWx0IHZpZXcgbW9kZSAoc2VsZWN0IGRheXMpXG4gIEBJbnB1dCgpXG4gIGFjdGl2ZVZpZXc6IHN0cmluZyA9ICdkYXlzJztcbiAgQElucHV0KClcbiAgbGF5b3V0OiBzdHJpbmcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgX3NlbGVjdGVkOiBEYXRlW10gPSBbXTtcbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IERhdGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG4gIHNldCBzZWxlY3RlZCh2YWx1ZSkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsdWUgPyB2YWx1ZS5maWx0ZXIoaXNEYXRlKS5tYXAoKGQpID0+IHN0YXJ0T2ZEYXkoZCkpIDogW107XG4gIH1cbiAgQE91dHB1dCgpXG4gIHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KClcbiAgcHJldmlldzogRGF0ZVtdID0gW107XG4gIEBPdXRwdXQoKVxuICBwcmV2aWV3Q2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGFjdGl2ZURhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKVxuICBvdmVybGF5czogT3ZlcmxheURhdGVbXSA9IFtdO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZERhdGVNZXNzYWdlOiBzdHJpbmc7XG5cbiAgX2FjdGl2ZURhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICBfbW9kZTogRGF0ZVBpY2tlclNlbGVjdE1vZGVzID0gJ3NpbmdsZSc7XG4gIF9udW1iZXJPZk1vbnRoczogbnVtYmVyW10gPSBbMF07XG4gIF93ZWVrU3RhcnRzT246IG51bWJlciA9IDA7XG4gIF9zdHJhdGVneTogTm92b0RhdGVTZWxlY3Rpb25TdHJhdGVneTxhbnk+ID0gbmV3IERlZmF1bHREYXRlU2VsZWN0aW9uU3RyYXRlZ3koKTtcblxuICBtb250aHM6IGFueTtcblxuICBASW5wdXQoKVxuICBnZXQgYWN0aXZlRGF0ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgfVxuICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZSkge1xuICAgIGlmICghaXNTYW1lRGF5KHZhbHVlLCB0aGlzLl9hY3RpdmVEYXRlKSkge1xuICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5hY3RpdmVEYXRlQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgICAgdGhpcy51cGRhdGVWaWV3KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgd2Vla1N0YXJ0c09uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3dlZWtTdGFydHNPbjtcbiAgfVxuICBzZXQgd2Vla1N0YXJ0c09uKHZhbHVlKSB7XG4gICAgdGhpcy5fd2Vla1N0YXJ0c09uID0gdmFsdWU7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ3dlZWsnKSB7XG4gICAgICB0aGlzLl9zdHJhdGVneSA9IG5ldyBXZWVrU2VsZWN0aW9uU3RyYXRlZ3kodGhpcy53ZWVrU3RhcnRzT24pO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBudW1iZXJPZk1vbnRocygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9udW1iZXJPZk1vbnRocy5sZW5ndGg7XG4gIH1cbiAgc2V0IG51bWJlck9mTW9udGhzKHZhbHVlKSB7XG4gICAgdGhpcy5fbnVtYmVyT2ZNb250aHMgPSBBcnJheS5mcm9tKEFycmF5KE51bWJlcih2YWx1ZSkpLmtleXMoKSk7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgbW9kZSgpOiBEYXRlUGlja2VyU2VsZWN0TW9kZXMge1xuICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICB9XG4gIHNldCBtb2RlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX21vZGUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9tb2RlID0gdmFsdWU7XG4gICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpcGxlJzpcbiAgICAgICAgICB0aGlzLl9zdHJhdGVneSA9IG5ldyBNdWx0aURhdGVTZWxlY3Rpb25TdHJhdGVneSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgUmFuZ2VTZWxlY3Rpb25TdHJhdGVneSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICB0aGlzLl9zdHJhdGVneSA9IG5ldyBXZWVrU2VsZWN0aW9uU3RyYXRlZ3kodGhpcy53ZWVrU3RhcnRzT24pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzaW5nbGUnOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gbmV3IERlZmF1bHREYXRlU2VsZWN0aW9uU3RyYXRlZ3koKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgZ2V0IGhiX3dpZHRoKCkge1xuICAgIGlmICh0aGlzLmxheW91dCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYG1pbi1jb250ZW50YCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGBtaW4tY29udGVudGApO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5sYXlvdXQtaG9yaXpvbnRhbCcpXG4gIGdldCBoYl9ob3JpenRvbmFsKCkge1xuICAgIHJldHVybiB0aGlzLmxheW91dCAhPT0gJ3ZlcnRpY2FsJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubGF5b3V0LXZlcnRpY2FsJylcbiAgZ2V0IGhiX3ZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gJ3ZlcnRpY2FsJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5hY3RpdmVEYXRlKSB7XG4gICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aCA/IHRoaXMuc2VsZWN0ZWRbMF0gOiBuZXcgRGF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5hY3RpdmVEYXRlKTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXcoYWN0aXZlRGF0ZTogRGF0ZSkge1xuICAgIHRoaXMuYWN0aXZlRGF0ZSA9IG5ldyBEYXRlKGFjdGl2ZURhdGUgPyBuZXcgRGF0ZShhY3RpdmVEYXRlKSA6IG5ldyBEYXRlKCkpO1xuICAgIHRoaXMubW9udGhzID0gW107XG4gICAgY29uc3QgbW9udGggPSBzdGFydE9mTW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgICBmb3IgKGNvbnN0IGkgb2YgdGhpcy5fbnVtYmVyT2ZNb250aHMpIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBhZGRNb250aHMobW9udGgsIGkpO1xuICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdChkYXRlLCB7IG1vbnRoOiAnc2hvcnQnIH0pO1xuICAgICAgdGhpcy5tb250aHMucHVzaCh7IGRhdGUsIGxhYmVsIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFRvZGF5KCkge1xuICAgIGNvbnN0IHRtcCA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRtcCk7XG4gICAgLy8gR28gYmFjayB0byBkYXlzXG4gICAgdGhpcy5vcGVuVmlldyhudWxsLCAnZGF5cycpO1xuICB9XG5cbiAgbW9udGhTZWxlY3RlZCh7IGV2ZW50LCBtb250aCB9OiBOb3ZvTW9udGhTZWxlY3RFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmFjdGl2ZURhdGUgPyB0aGlzLmFjdGl2ZURhdGUgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCk7XG4gICAgY29uc3QgdG1wID0gc2V0TW9udGgoZGF0ZSwgbW9udGgpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXApO1xuICAgIC8vIEdvIGJhY2sgdG8gZGF5c1xuICAgIHRoaXMub3BlblZpZXcobnVsbCwgJ2RheXMnKTtcbiAgfVxuXG4gIHllYXJTZWxlY3RlZCh7IGV2ZW50LCB5ZWFyIH06IE5vdm9ZZWFyU2VsZWN0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5hY3RpdmVEYXRlID8gdGhpcy5hY3RpdmVEYXRlIDogbmV3IERhdGUoKTtcbiAgICBjb25zdCB0bXAgPSBzZXRZZWFyKGRhdGUsIHllYXIpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXApO1xuICAgIC8vIEdvIGJhY2sgdG8gZGF5c1xuICAgIHRoaXMub3BlblZpZXcobnVsbCwgJ2RheXMnKTtcbiAgfVxuXG4gIGRhdGVTZWxlY3RlZCh7IGV2ZW50LCBkYXkgfTogTm92b0RhdGVTZWxlY3RFdmVudCkge1xuICAgIC8vIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5fc3RyYXRlZ3kuc2VsZWN0aW9uRmluaXNoZWQoZGF5LmRhdGUsIHRoaXMuc2VsZWN0ZWQsIGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICB1cGRhdGVQcmV2aWV3KHsgZXZlbnQsIGRheSB9OiBOb3ZvRGF0ZVNlbGVjdEV2ZW50KSB7XG4gICAgdGhpcy5wcmV2aWV3ID0gdGhpcy5fc3RyYXRlZ3kuY3JlYXRlUHJldmlldyhkYXkuZGF0ZSwgdGhpcy5zZWxlY3RlZCwgZXZlbnQpO1xuICAgIHRoaXMucHJldmlld0NoYW5nZS5lbWl0KHRoaXMucHJldmlldyk7XG4gIH1cblxuICBwcmV2TW9udGgoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGNvbnN0IHRtcCA9IHN1Yk1vbnRocyh0aGlzLmFjdGl2ZURhdGUsIDEpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXApO1xuICB9XG5cbiAgbmV4dE1vbnRoKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICBjb25zdCB0bXAgPSBhZGRNb250aHModGhpcy5hY3RpdmVEYXRlLCAxKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgfVxuXG4gIG9wZW5WaWV3KGV2ZW50OiBFdmVudCwgdHlwZTogc3RyaW5nKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuXG4gICAgLy8gSWYgdGhleSBjbGljayB0aGUgdG9nZ2xlIHR3byB0aW1lIGluIGEgcm93LCBjbG9zZSBpdCAoZ28gYmFjayB0byBkYXlzKVxuICAgIGlmICh0eXBlID09PSB0aGlzLmFjdGl2ZVZpZXcpIHtcbiAgICAgIHRoaXMuYWN0aXZlVmlldyA9ICdkYXlzJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVWaWV3ID0gdHlwZTtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdG8gc2Nyb2xsIHRoZSBzZWxlY3RlZCBvbmUgaW50byB2aWV3XG4gICAgaWYgKHRoaXMuYWN0aXZlVmlldyA9PT0gJ3llYXJzJyB8fCB0aGlzLmFjdGl2ZVZpZXcgPT09ICdtb250aHMnKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgLmNhbGVuZGFyLWNvbnRlbnQuJHt0aGlzLmFjdGl2ZVZpZXd9YCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5jYWxlbmRhci1jb250ZW50LiR7dGhpcy5hY3RpdmVWaWV3fSAuJHt0aGlzLmFjdGl2ZVZpZXcgPT09ICd5ZWFycycgPyAneWVhcicgOiAnbW9udGgnfS5zZWxlY3RlZGAsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChjb250YWluZXIgJiYgc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IHNlbGVjdGVkSXRlbS5vZmZzZXRUb3AgLSAxMDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIF9pc1JhbmdlKCkge1xuICAgIHJldHVybiBbJ3dlZWsnLCAncmFuZ2UnXS5pbmNsdWRlcyh0aGlzLm1vZGUpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY2FsZW5kYXItaGVhZGVyXCI+XG4gIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwicHJldmlvdXNcIiBzaXplPVwic21hbGxcIiAoY2xpY2spPVwicHJldk1vbnRoKCRldmVudClcIlxuICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLXByZXZpb3VzXCI+PC9ub3ZvLWJ1dHRvbj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgIDxzcGFuIGNsYXNzPVwiaGVhZGluZ1wiIFtjbGFzcy5zZWNvbmRhcnldPVwiaSA+IDBcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9udGhcIiAoY2xpY2spPVwib3BlblZpZXcoJGV2ZW50LCAnbW9udGhzJylcIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJoZWFkZXItbW9udGhcIj57eyBtb250aC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwieWVhclwiIChjbGljayk9XCJvcGVuVmlldygkZXZlbnQsICd5ZWFycycpXCJcbiAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaGVhZGVyLXllYXJcIj57eyBtb250aC5kYXRlPy5nZXRGdWxsWWVhcigpIH19PC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwibmV4dFwiIHNpemU9XCJzbWFsbFwiIChjbGljayk9XCJuZXh0TW9udGgoJGV2ZW50KVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNhbGVuZGFyLW5leHRcIj5cbiAgPC9ub3ZvLWJ1dHRvbj5cbjwvZGl2PlxuPHNlY3Rpb24gY2xhc3M9XCJjYWxlbmRhci1jb250ZW50XCIgW25nU3dpdGNoXT1cImFjdGl2ZVZpZXdcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2RheXMnXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItaGVhZGVyXCIgKm5nSWY9XCJsYXlvdXQ9PT0ndmVydGljYWwnICYmIGkgPiAwXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJldmlvdXNcIiAoY2xpY2spPVwicHJldk1vbnRoKCRldmVudClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJjYWxlbmRhci1wcmV2aW91c1wiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWFkaW5nXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtb250aFwiIChjbGljayk9XCJvcGVuVmlldygkZXZlbnQsICdtb250aHMnKVwiXG4gICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJoZWFkZXItbW9udGhcIj57eyBtb250aC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInllYXJcIiAoY2xpY2spPVwib3BlblZpZXcoJGV2ZW50LCAneWVhcnMnKVwiXG4gICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJoZWFkZXIteWVhclwiPnt7IG1vbnRoLmRhdGU/LmdldEZ1bGxZZWFyKCkgfX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJuZXh0XCIgKGNsaWNrKT1cIm5leHRNb250aCgkZXZlbnQpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY2FsZW5kYXItbmV4dFwiPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5vdm8tbW9udGgtdmlld1xuICAgICAgICBjbGFzcz1cIm1vbnRoLXZpZXdcIlxuICAgICAgICBbYWN0aXZlRGF0ZV09XCJtb250aC5kYXRlXCJcbiAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgW3ByZXZpZXddPVwicHJldmlld1wiXG4gICAgICAgIFtvdmVybGF5c109XCJvdmVybGF5c1wiXG4gICAgICAgIFtpc1JhbmdlXT1cIl9pc1JhbmdlKClcIlxuICAgICAgICBbaGlkZU92ZXJmbG93RGF5c109XCJtb250aHMubGVuZ3RoID4gMVwiXG4gICAgICAgIFt3ZWVrU3RhcnRzT25dPVwid2Vla1N0YXJ0c09uXCJcbiAgICAgICAgW2Rpc2FibGVkRGF0ZU1lc3NhZ2VdPVwiZGlzYWJsZWREYXRlTWVzc2FnZVwiXG4gICAgICAgIFttaW5EYXRlXT1cIm1pbkRhdGVcIlxuICAgICAgICBbbWF4RGF0ZV09XCJtYXhEYXRlXCJcbiAgICAgICAgKHNlbGVjdCk9XCJkYXRlU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgIChob3Zlcik9XCJ1cGRhdGVQcmV2aWV3KCRldmVudClcIj48L25vdm8tbW9udGgtdmlldz5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxub3ZvLW1vbnRoLXNlbGVjdFxuICAgICpuZ1N3aXRjaENhc2U9XCInbW9udGhzJ1wiXG4gICAgW2FjdGl2ZURhdGVdPVwiYWN0aXZlRGF0ZVwiXG4gICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAoc2VsZWN0KT1cIm1vbnRoU2VsZWN0ZWQoJGV2ZW50KVwiPlxuICA8L25vdm8tbW9udGgtc2VsZWN0PlxuICA8bm92by15ZWFyLXNlbGVjdFxuICAgICpuZ1N3aXRjaENhc2U9XCIneWVhcnMnXCJcbiAgICBbYWN0aXZlRGF0ZV09XCJhY3RpdmVEYXRlXCJcbiAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgIChzZWxlY3QpPVwieWVhclNlbGVjdGVkKCRldmVudClcIj5cbiAgPC9ub3ZvLXllYXItc2VsZWN0PlxuPC9zZWN0aW9uPiJdfQ==