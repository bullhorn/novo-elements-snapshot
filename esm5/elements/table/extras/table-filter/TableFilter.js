/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// NG2
import { Directive, EventEmitter, ElementRef, Renderer2, Input, Output, HostListener, } from '@angular/core';
// APP
import { KeyCodes } from './../../../../utils/key-codes/KeyCodes';
import { Helpers } from './../../../../utils/Helpers';
var TableFilter = /** @class */ (function () {
    function TableFilter(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.onFilterChange = new EventEmitter();
        this.element = element;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    TableFilter.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.ngOnChanges();
    };
    /**
     * @param {?=} changes
     * @return {?}
     */
    TableFilter.prototype.ngOnChanges = /**
     * @param {?=} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var label = '';
        if (this.config.freetextFilter) {
            label = this.config.freetextFilter;
        }
        else if (this.config.filter) {
            label = this.config.filter;
        }
        this.renderer.setProperty(this.element, 'value', label);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TableFilter.prototype.onChangeFilter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        clearTimeout(this.filterThrottle);
        if (KeyCodes.ENTER === event.keyCode) {
            this.config.filter = ((/** @type {?} */ (event.target))).value;
            this.onFilterChange.emit({ filtering: this.config });
        }
        else {
            this.filterThrottle = setTimeout(function () {
                _this.config.filter = ((/** @type {?} */ (event.target))).value;
                _this.onFilterChange.emit({ filtering: _this.config });
            }, 300);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TableFilter.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        Helpers.swallowEvent(event);
    };
    TableFilter.decorators = [
        { type: Directive, args: [{
                    selector: '[novoTableFilter]',
                },] }
    ];
    TableFilter.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    TableFilter.propDecorators = {
        config: [{ type: Input, args: ['novoTableFilter',] }],
        onFilterChange: [{ type: Output }],
        onChangeFilter: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return TableFilter;
}());
export { TableFilter };
if (false) {
    /** @type {?} */
    TableFilter.prototype.config;
    /** @type {?} */
    TableFilter.prototype.onFilterChange;
    /** @type {?} */
    TableFilter.prototype.filterThrottle;
    /** @type {?} */
    TableFilter.prototype.element;
    /** @type {?} */
    TableFilter.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVGaWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGFibGUvZXh0cmFzL3RhYmxlLWZpbHRlci9UYWJsZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7O0FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdEQ7SUFXRSxxQkFBb0IsT0FBbUIsRUFBVSxRQUFtQjtRQUFoRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUpwRSxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBS3JELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCw4QkFBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFRCxpQ0FBVzs7OztJQUFYLFVBQVksT0FBdUI7O1lBQzdCLEtBQUssR0FBRyxFQUFFO1FBQ2QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUM5QixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7U0FDcEM7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7O0lBR00sb0NBQWM7Ozs7SUFEckIsVUFDc0IsS0FBb0I7UUFEMUMsaUJBWUM7UUFWQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxtQkFBQSxLQUFLLENBQUMsTUFBTSxFQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNUO0lBQ0gsQ0FBQzs7Ozs7SUFHTSw2QkFBTzs7OztJQURkLFVBQ2UsS0FBSztRQUNsQixPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7O2dCQS9DRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUI7OztnQkFmQyxVQUFVO2dCQUNWLFNBQVM7Ozt5QkFnQlIsS0FBSyxTQUFDLGlCQUFpQjtpQ0FFdkIsTUFBTTtpQ0F3Qk4sWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzswQkFjbEMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFJbkMsa0JBQUM7Q0FBQSxBQWhERCxJQWdEQztTQTdDWSxXQUFXOzs7SUFDdEIsNkJBQ1k7O0lBQ1oscUNBQ3VEOztJQUV2RCxxQ0FBb0I7O0lBRVIsOEJBQTJCOztJQUFFLCtCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIFJlbmRlcmVyMixcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IEtleUNvZGVzIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi91dGlscy9rZXktY29kZXMvS2V5Q29kZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4vLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvVGFibGVGaWx0ZXJdJyxcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVGaWx0ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgnbm92b1RhYmxlRmlsdGVyJylcbiAgY29uZmlnOiBhbnk7XG4gIEBPdXRwdXQoKVxuICBvbkZpbHRlckNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZmlsdGVyVGhyb3R0bGU6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBsZXQgbGFiZWwgPSAnJztcbiAgICBpZiAodGhpcy5jb25maWcuZnJlZXRleHRGaWx0ZXIpIHtcbiAgICAgIGxhYmVsID0gdGhpcy5jb25maWcuZnJlZXRleHRGaWx0ZXI7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5maWx0ZXIpIHtcbiAgICAgIGxhYmVsID0gdGhpcy5jb25maWcuZmlsdGVyO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudCwgJ3ZhbHVlJywgbGFiZWwpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkNoYW5nZUZpbHRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZpbHRlclRocm90dGxlKTtcbiAgICBpZiAoS2V5Q29kZXMuRU5URVIgPT09IGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIHRoaXMuY29uZmlnLmZpbHRlciA9IChldmVudC50YXJnZXQgYXMgYW55KS52YWx1ZTtcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UuZW1pdCh7IGZpbHRlcmluZzogdGhpcy5jb25maWcgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyVGhyb3R0bGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jb25maWcuZmlsdGVyID0gKGV2ZW50LnRhcmdldCBhcyBhbnkpLnZhbHVlO1xuICAgICAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlLmVtaXQoeyBmaWx0ZXJpbmc6IHRoaXMuY29uZmlnIH0pO1xuICAgICAgfSwgMzAwKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkNsaWNrKGV2ZW50KSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICB9XG59XG4iXX0=