// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { addMonths, isDate, isSameDay, setMonth, setYear, startOfDay, startOfMonth, subMonths } from 'date-fns';
import { NovoLabelService } from '../../services/novo-label-service';
// APP
import { Helpers } from '../../utils/Helpers';
import { DefaultDateSelectionStrategy, MultiDateSelectionStrategy, RangeSelectionStrategy, WeekSelectionStrategy } from './strategies';
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
NovoCalendarElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar',
                template: "<div class=\"calendar-header\">\n  <novo-button theme=\"icon\" icon=\"previous\" size=\"small\" (click)=\"prevMonth($event)\"\n    data-automation-id=\"calendar-previous\"></novo-button>\n  <ng-container *ngFor=\"let month of months; let i = index;\">\n    <span class=\"heading\" [class.secondary]=\"i > 0\">\n      <span class=\"month\" (click)=\"openView($event, 'months')\"\n        data-automation-id=\"header-month\">{{ month.label }}</span>\n      <span class=\"year\" (click)=\"openView($event, 'years')\"\n        data-automation-id=\"header-year\">{{ month.date?.getFullYear() }}</span>\n    </span>\n  </ng-container>\n  <novo-button theme=\"icon\" icon=\"next\" size=\"small\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\">\n  </novo-button>\n</div>\n<section class=\"calendar-content\" [ngSwitch]=\"activeView\">\n  <ng-container *ngSwitchCase=\"'days'\">\n    <ng-container *ngFor=\"let month of months; let i = index\">\n      <div class=\"calendar-header\" *ngIf=\"layout==='vertical' && i > 0\">\n        <span class=\"previous\" (click)=\"prevMonth($event)\" data-automation-id=\"calendar-previous\"></span>\n        <span class=\"heading\">\n          <span class=\"month\" (click)=\"openView($event, 'months')\"\n            data-automation-id=\"header-month\">{{ month.label }}</span>\n          <span class=\"year\" (click)=\"openView($event, 'years')\"\n            data-automation-id=\"header-year\">{{ month.date?.getFullYear() }}</span>\n        </span>\n        <span class=\"next\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\"></span>\n      </div>\n      <novo-month-view\n        class=\"month-view\"\n        [activeDate]=\"month.date\"\n        [selected]=\"selected\"\n        [preview]=\"preview\"\n        [overlays]=\"overlays\"\n        [isRange]=\"_isRange()\"\n        [hideOverflowDays]=\"months.length > 1\"\n        [weekStartsOn]=\"weekStartsOn\"\n        (select)=\"dateSelected($event)\"\n        (hover)=\"updatePreview($event)\"></novo-month-view>\n    </ng-container>\n  </ng-container>\n  <novo-month-select\n    *ngSwitchCase=\"'months'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"monthSelected($event)\">\n  </novo-month-select>\n  <novo-year-select\n    *ngSwitchCase=\"'years'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"yearSelected($event)\">\n  </novo-year-select>\n</section>",
                styles: [":host(.layout-horizontal){font-size:1.2rem}:host(.layout-horizontal) .calendar-content{flex-flow:row nowrap}:host(.layout-horizontal) .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host(.layout-vertical) .calendar-content{flex-flow:column nowrap}:host(.layout-vertical) .calendar-header .heading.secondary{display:none}:host{-moz-user-select:none;-webkit-user-select:none;background:var(--background-bright);color:var(--text-bright);display:block;position:relative;text-align:center;user-select:none;width:100%}:host .calendar-content{display:flex;height:-webkit-min-content;height:-moz-min-content;height:min-content;left:0;overflow:hidden;position:static;top:0;width:100%}:host .calendar-header{-webkit-user-select:none;align-items:center;border-bottom:1px solid var(--border);border-collapse:collapse;cursor:default;display:flex;flex-flow:row nowrap;justify-content:space-between;padding:1rem .8rem;width:100%}:host .calendar-header .previous{cursor:pointer;display:inline-block;height:15px;width:30px}:host .calendar-header .previous:after{border-bottom:4px solid transparent;border-right:4px solid #aaa;border-top:4px solid transparent;content:\"\";display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .calendar-header .heading{color:#4a89dc;display:inline-block;flex:1;font-weight:600;vertical-align:middle}:host .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .next{cursor:pointer;display:inline-block;height:15px;width:30px}:host .calendar-header .next:before{border-bottom:4px solid transparent;border-left:4px solid #aaa;border-top:4px solid transparent;content:\"\";display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .next:hover:before{border-left:4px solid #4a89dc;cursor:pointer;opacity:1}"]
            },] }
];
NovoCalendarElement.ctorParameters = () => [
    { type: NovoLabelService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: DomSanitizer }
];
NovoCalendarElement.propDecorators = {
    minYear: [{ type: Input }],
    maxYear: [{ type: Input }],
    activeView: [{ type: Input }],
    layout: [{ type: Input }],
    selected: [{ type: Input }],
    selectedChange: [{ type: Output }],
    preview: [{ type: Input }],
    previewChange: [{ type: Output }],
    activeDateChange: [{ type: Output }],
    overlays: [{ type: Input }],
    activeDate: [{ type: Input }],
    weekStartsOn: [{ type: Input }],
    numberOfMonths: [{ type: Input }],
    mode: [{ type: Input }],
    hb_width: [{ type: HostBinding, args: ['style.width',] }],
    hb_horiztonal: [{ type: HostBinding, args: ['class.layout-horizontal',] }],
    hb_vertical: [{ type: HostBinding, args: ['class.layout-vertical',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxTQUFTO0FBQ1QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVM5QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsMEJBQTBCLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFPdkksTUFBTSxPQUFPLG1CQUFtQjtJQWtIOUIsWUFDUyxNQUF3QixFQUN2QixPQUFtQixFQUNuQixHQUFzQixFQUN0QixVQUF3QjtRQUh6QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQWM7UUFqSGxDLGtDQUFrQztRQUVsQyxlQUFVLEdBQVcsTUFBTSxDQUFDO1FBRTVCLFdBQU0sR0FB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LENBQUM7aUJBQ3BEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7OztZQXpORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLDI1RUFBd0M7O2FBRXpDOzs7WUFqQlEsZ0JBQWdCO1lBSmMsVUFBVTtZQUF4QyxpQkFBaUI7WUFDakIsWUFBWTs7O3NCQXNCbEIsS0FBSztzQkFFTCxLQUFLO3lCQUdMLEtBQUs7cUJBRUwsS0FBSzt1QkFJTCxLQUFLOzZCQU9MLE1BQU07c0JBRU4sS0FBSzs0QkFFTCxNQUFNOytCQUVOLE1BQU07dUJBR04sS0FBSzt5QkFXTCxLQUFLOzJCQVlMLEtBQUs7NkJBV0wsS0FBSzttQkFTTCxLQUFLO3VCQXlCTCxXQUFXLFNBQUMsYUFBYTs0QkFRekIsV0FBVyxTQUFDLHlCQUF5QjswQkFLckMsV0FBVyxTQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgYWRkTW9udGhzLCBpc0RhdGUsIGlzU2FtZURheSwgc2V0TW9udGgsIHNldFllYXIsIHN0YXJ0T2ZEYXksIHN0YXJ0T2ZNb250aCwgc3ViTW9udGhzIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcbmltcG9ydCB0eXBlIHtcbiAgRGF0ZVBpY2tlclNlbGVjdE1vZGVzLFxuICBOb3ZvRGF0ZVNlbGVjdEV2ZW50LFxuICBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5LFxuICBOb3ZvTW9udGhTZWxlY3RFdmVudCxcbiAgTm92b1llYXJTZWxlY3RFdmVudCxcbiAgT3ZlcmxheURhdGUsXG59IGZyb20gJy4uL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnR5cGVzJztcbmltcG9ydCB7IERlZmF1bHREYXRlU2VsZWN0aW9uU3RyYXRlZ3ksIE11bHRpRGF0ZVNlbGVjdGlvblN0cmF0ZWd5LCBSYW5nZVNlbGVjdGlvblN0cmF0ZWd5LCBXZWVrU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhbGVuZGFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFyRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIG1pblllYXI6IHN0cmluZyB8IG51bWJlcjtcbiAgQElucHV0KClcbiAgbWF4WWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICAvLyBEZWZhdWx0IHZpZXcgbW9kZSAoc2VsZWN0IGRheXMpXG4gIEBJbnB1dCgpXG4gIGFjdGl2ZVZpZXc6IHN0cmluZyA9ICdkYXlzJztcbiAgQElucHV0KClcbiAgbGF5b3V0OiBzdHJpbmcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgX3NlbGVjdGVkOiBEYXRlW10gPSBbXTtcbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IERhdGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG4gIHNldCBzZWxlY3RlZCh2YWx1ZSkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsdWUgPyB2YWx1ZS5maWx0ZXIoaXNEYXRlKS5tYXAoKGQpID0+IHN0YXJ0T2ZEYXkoZCkpIDogW107XG4gIH1cbiAgQE91dHB1dCgpXG4gIHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KClcbiAgcHJldmlldzogRGF0ZVtdID0gW107XG4gIEBPdXRwdXQoKVxuICBwcmV2aWV3Q2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGFjdGl2ZURhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKVxuICBvdmVybGF5czogT3ZlcmxheURhdGVbXSA9IFtdO1xuXG4gIF9hY3RpdmVEYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgX21vZGU6IERhdGVQaWNrZXJTZWxlY3RNb2RlcyA9ICdzaW5nbGUnO1xuICBfbnVtYmVyT2ZNb250aHM6IG51bWJlcltdID0gWzBdO1xuICBfd2Vla1N0YXJ0c09uOiBudW1iZXIgPSAwO1xuICBfc3RyYXRlZ3k6IE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3k8YW55PiA9IG5ldyBEZWZhdWx0RGF0ZVNlbGVjdGlvblN0cmF0ZWd5KCk7XG5cbiAgbW9udGhzOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGFjdGl2ZURhdGUoKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7XG4gIH1cbiAgc2V0IGFjdGl2ZURhdGUodmFsdWUpIHtcbiAgICBpZiAoIWlzU2FtZURheSh2YWx1ZSwgdGhpcy5fYWN0aXZlRGF0ZSkpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuYWN0aXZlRGF0ZUNoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICAgIHRoaXMudXBkYXRlVmlldyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IHdlZWtTdGFydHNPbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl93ZWVrU3RhcnRzT247XG4gIH1cbiAgc2V0IHdlZWtTdGFydHNPbih2YWx1ZSkge1xuICAgIHRoaXMuX3dlZWtTdGFydHNPbiA9IHZhbHVlO1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICd3ZWVrJykge1xuICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgV2Vla1NlbGVjdGlvblN0cmF0ZWd5KHRoaXMud2Vla1N0YXJ0c09uKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgbnVtYmVyT2ZNb250aHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZNb250aHMubGVuZ3RoO1xuICB9XG4gIHNldCBudW1iZXJPZk1vbnRocyh2YWx1ZSkge1xuICAgIHRoaXMuX251bWJlck9mTW9udGhzID0gQXJyYXkuZnJvbShBcnJheShOdW1iZXIodmFsdWUpKS5rZXlzKCkpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IG1vZGUoKTogRGF0ZVBpY2tlclNlbGVjdE1vZGVzIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZTtcbiAgfVxuICBzZXQgbW9kZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9tb2RlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbW9kZSA9IHZhbHVlO1xuICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlICdtdWx0aXBsZSc6XG4gICAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgTXVsdGlEYXRlU2VsZWN0aW9uU3RyYXRlZ3koKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gbmV3IFJhbmdlU2VsZWN0aW9uU3RyYXRlZ3koKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgV2Vla1NlbGVjdGlvblN0cmF0ZWd5KHRoaXMud2Vla1N0YXJ0c09uKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc2luZ2xlJzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLl9zdHJhdGVneSA9IG5ldyBEZWZhdWx0RGF0ZVNlbGVjdGlvblN0cmF0ZWd5KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpXG4gIGdldCBoYl93aWR0aCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGBtaW4tY29udGVudGApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgbWluLWNvbnRlbnRgKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubGF5b3V0LWhvcml6b250YWwnKVxuICBnZXQgaGJfaG9yaXp0b25hbCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgIT09ICd2ZXJ0aWNhbCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxheW91dC12ZXJ0aWNhbCcpXG4gIGdldCBoYl92ZXJ0aWNhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09ICd2ZXJ0aWNhbCc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRGF0ZSkge1xuICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5zZWxlY3RlZC5sZW5ndGggPyB0aGlzLnNlbGVjdGVkWzBdIDogbmV3IERhdGUoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICB1cGRhdGVWaWV3KGFjdGl2ZURhdGU6IERhdGUpIHtcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSBuZXcgRGF0ZShhY3RpdmVEYXRlID8gbmV3IERhdGUoYWN0aXZlRGF0ZSkgOiBuZXcgRGF0ZSgpKTtcbiAgICB0aGlzLm1vbnRocyA9IFtdO1xuICAgIGNvbnN0IG1vbnRoID0gc3RhcnRPZk1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgZm9yIChjb25zdCBpIG9mIHRoaXMuX251bWJlck9mTW9udGhzKSB7XG4gICAgICBjb25zdCBkYXRlID0gYWRkTW9udGhzKG1vbnRoLCBpKTtcbiAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQoZGF0ZSwgeyBtb250aDogJ3Nob3J0JyB9KTtcbiAgICAgIHRoaXMubW9udGhzLnB1c2goeyBkYXRlLCBsYWJlbCB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRUb2RheSgpIHtcbiAgICBjb25zdCB0bXAgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMudXBkYXRlVmlldyh0bXApO1xuICAgIC8vIEdvIGJhY2sgdG8gZGF5c1xuICAgIHRoaXMub3BlblZpZXcobnVsbCwgJ2RheXMnKTtcbiAgfVxuXG4gIG1vbnRoU2VsZWN0ZWQoeyBldmVudCwgbW9udGggfTogTm92b01vbnRoU2VsZWN0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5hY3RpdmVEYXRlID8gdGhpcy5hY3RpdmVEYXRlIDogbmV3IERhdGUoKS5nZXRNb250aCgpO1xuICAgIGNvbnN0IHRtcCA9IHNldE1vbnRoKGRhdGUsIG1vbnRoKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgICAvLyBHbyBiYWNrIHRvIGRheXNcbiAgICB0aGlzLm9wZW5WaWV3KG51bGwsICdkYXlzJyk7XG4gIH1cblxuICB5ZWFyU2VsZWN0ZWQoeyBldmVudCwgeWVhciB9OiBOb3ZvWWVhclNlbGVjdEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuYWN0aXZlRGF0ZSA/IHRoaXMuYWN0aXZlRGF0ZSA6IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgdG1wID0gc2V0WWVhcihkYXRlLCB5ZWFyKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgICAvLyBHbyBiYWNrIHRvIGRheXNcbiAgICB0aGlzLm9wZW5WaWV3KG51bGwsICdkYXlzJyk7XG4gIH1cblxuICBkYXRlU2VsZWN0ZWQoeyBldmVudCwgZGF5IH06IE5vdm9EYXRlU2VsZWN0RXZlbnQpIHtcbiAgICAvLyBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuX3N0cmF0ZWd5LnNlbGVjdGlvbkZpbmlzaGVkKGRheS5kYXRlLCB0aGlzLnNlbGVjdGVkLCBldmVudCk7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgdXBkYXRlUHJldmlldyh7IGV2ZW50LCBkYXkgfTogTm92b0RhdGVTZWxlY3RFdmVudCkge1xuICAgIHRoaXMucHJldmlldyA9IHRoaXMuX3N0cmF0ZWd5LmNyZWF0ZVByZXZpZXcoZGF5LmRhdGUsIHRoaXMuc2VsZWN0ZWQsIGV2ZW50KTtcbiAgICB0aGlzLnByZXZpZXdDaGFuZ2UuZW1pdCh0aGlzLnByZXZpZXcpO1xuICB9XG5cbiAgcHJldk1vbnRoKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICBjb25zdCB0bXAgPSBzdWJNb250aHModGhpcy5hY3RpdmVEYXRlLCAxKTtcbiAgICB0aGlzLnVwZGF0ZVZpZXcodG1wKTtcbiAgfVxuXG4gIG5leHRNb250aChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgY29uc3QgdG1wID0gYWRkTW9udGhzKHRoaXMuYWN0aXZlRGF0ZSwgMSk7XG4gICAgdGhpcy51cGRhdGVWaWV3KHRtcCk7XG4gIH1cblxuICBvcGVuVmlldyhldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZykge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcblxuICAgIC8vIElmIHRoZXkgY2xpY2sgdGhlIHRvZ2dsZSB0d28gdGltZSBpbiBhIHJvdywgY2xvc2UgaXQgKGdvIGJhY2sgdG8gZGF5cylcbiAgICBpZiAodHlwZSA9PT0gdGhpcy5hY3RpdmVWaWV3KSB7XG4gICAgICB0aGlzLmFjdGl2ZVZpZXcgPSAnZGF5cyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlVmlldyA9IHR5cGU7XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRvIHNjcm9sbCB0aGUgc2VsZWN0ZWQgb25lIGludG8gdmlld1xuICAgIGlmICh0aGlzLmFjdGl2ZVZpZXcgPT09ICd5ZWFycycgfHwgdGhpcy5hY3RpdmVWaWV3ID09PSAnbW9udGhzJykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jYWxlbmRhci1jb250ZW50LiR7dGhpcy5hY3RpdmVWaWV3fWApO1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuY2FsZW5kYXItY29udGVudC4ke3RoaXMuYWN0aXZlVmlld30gLiR7dGhpcy5hY3RpdmVWaWV3ID09PSAneWVhcnMnID8gJ3llYXInIDogJ21vbnRoJ30uc2VsZWN0ZWRgLFxuICAgICAgICApO1xuICAgICAgICBpZiAoY29udGFpbmVyICYmIHNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBzZWxlY3RlZEl0ZW0ub2Zmc2V0VG9wIC0gMTAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfaXNSYW5nZSgpIHtcbiAgICByZXR1cm4gWyd3ZWVrJywgJ3JhbmdlJ10uaW5jbHVkZXModGhpcy5tb2RlKTtcbiAgfVxufVxuIl19