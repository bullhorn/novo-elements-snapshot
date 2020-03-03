/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// NG2
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';
var NovoCategoryDropdownElement = /** @class */ (function (_super) {
    tslib_1.__extends(NovoCategoryDropdownElement, _super);
    function NovoCategoryDropdownElement(element, labels) {
        var _this = _super.call(this, element) || this;
        _this.labels = labels;
        _this._query = '';
        _this._categoryMap = {};
        _this._categories = [];
        // Boolean to keep the selection persist when closing the dropdown
        _this.persistSelection = false;
        // Boolean to close the dropdown on selection
        _this.closeOnSelect = false;
        // Event that is emitted whenever an item is selected
        _this._select = new EventEmitter();
        // Event that is emitted whenever a category is selected
        _this.categorySelected = new EventEmitter();
        _this.clickHandler = _this.toggleActive.bind(_this);
        return _this;
    }
    Object.defineProperty(NovoCategoryDropdownElement.prototype, "categories", {
        set: /**
         * @param {?} categories
         * @return {?}
         */
        function (categories) {
            this._masterCategoryMap = Object.assign({}, categories);
            this._categoryMap = Object.assign({}, categories);
            this._categories = Object.keys(categories);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NovoCategoryDropdownElement.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var button = this.element.nativeElement.querySelector('button');
        button.addEventListener('click', this.clickHandler);
    };
    /**
     * @return {?}
     */
    NovoCategoryDropdownElement.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var button = this.element.nativeElement.querySelector('button');
        if (button) {
            button.removeEventListener('click', this.clickHandler);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NovoCategoryDropdownElement.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.active && (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER)) {
            this.toggleActive();
        }
    };
    /**
     * @return {?}
     */
    NovoCategoryDropdownElement.prototype.clearSelection = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._categories.forEach(function (category) {
            _this._categoryMap[category].forEach(function (item) {
                item.selected = false;
            });
        });
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    NovoCategoryDropdownElement.prototype.select = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        Helpers.swallowEvent(event);
        // If we persist the selection, clear and show a check
        if (this.persistSelection) {
            this.clearSelection();
            item.selected = true;
        }
        // Emit the item
        this._select.emit(item);
        // Close, if input is set
        if (this.closeOnSelect) {
            this.toggleActive();
        }
    };
    /**
     * @param {?} category
     * @return {?}
     */
    NovoCategoryDropdownElement.prototype.onCategorySelected = /**
     * @param {?} category
     * @return {?}
     */
    function (category) {
        this.categorySelected.emit(category);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NovoCategoryDropdownElement.prototype.clearQuery = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        Helpers.swallowEvent(event);
        this._query = '';
        // Reset the categories
        this._categories.forEach(function (category) {
            _this._categoryMap[category] = _this._masterCategoryMap[category];
        });
    };
    /**
     * @param {?} query
     * @return {?}
     */
    NovoCategoryDropdownElement.prototype.queryCategories = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        var _this = this;
        // Save the query
        this._query = query;
        // Check timeout
        if (this._queryTimeout) {
            clearTimeout(this._queryTimeout);
        }
        // Store a timeout, to debounce user input
        this._queryTimeout = setTimeout(function () {
            _this._categories.forEach(function (category) {
                if (_this.search.compare) {
                    _this._categoryMap[category] = _this._masterCategoryMap[category].filter(function (item) { return _this.search.compare(query, item); });
                }
                else {
                    _this._categoryMap[category] = _this._masterCategoryMap[category].filter(function (item) { return ~item.label.toLowerCase().indexOf(query.toLowerCase()); });
                }
            });
        }, this.search.debounce || 300);
    };
    /**
     * @param {?} event
     * @param {?} link
     * @return {?}
     */
    NovoCategoryDropdownElement.prototype.executeClickCallback = /**
     * @param {?} event
     * @param {?} link
     * @return {?}
     */
    function (event, link) {
        link.callback(event);
        // Close, if input is set
        if (this.closeOnSelect) {
            this.toggleActive();
        }
    };
    NovoCategoryDropdownElement.decorators = [
        { type: Component, args: [{
                    selector: 'novo-category-dropdown',
                    template: "\n        <ng-content select=\"button\"></ng-content>\n        <div class=\"dropdown-container\" *ngIf=\"active\">\n            <div class=\"novo-category-dropdown-search\" *ngIf=\"search\" data-automation-id=\"novo-category-dropdown-search\">\n                <input type=\"text\" [placeholder]=\"search.placeholder || labels.search\" [value]=\"_query\" (input)=\"queryCategories($event.target.value)\"/>\n                <i class=\"bhi-search\" *ngIf=\"!_query\"></i>\n                <i class=\"bhi-times\" *ngIf=\"_query\" (click)=\"clearQuery($event)\"></i>\n            </div>\n            <novo-nav theme=\"white\" [outlet]=\"novoCategoryDropdownOutlet\" direction=\"vertical\">\n                <novo-tab *ngFor=\"let category of _categories\" [attr.data-automation-id]=\"category\" (activeChange)=\"onCategorySelected(category)\">\n                    <span>{{ category }} ({{ _categoryMap[category].length }})</span>\n                </novo-tab>\n            </novo-nav>\n            <novo-nav-outlet #novoCategoryDropdownOutlet>\n                <novo-nav-content *ngFor=\"let category of _categories\">\n                    <novo-list direction=\"vertical\">\n                        <novo-list-item *ngFor=\"let item of _categoryMap[category]\" (click)=\"select($event, item)\" [attr.data-automation-id]=\"item.label\">\n                            <item-content>{{ item.label }}</item-content>\n                            <item-end class=\"novo-category-dropdown-hover\" *ngIf=\"item.hoverText && !item.selected\">{{ item.hoverText }}</item-end>\n                            <item-end class=\"novo-category-dropdown-hover\" *ngIf=\"item.hoverIcon && !item.selected\"><i class=\"bhi-{{ item.hoverIcon }}\"></i></item-end>\n                            <item-end *ngIf=\"item.selected\"><i class=\"bhi-check\"></i></item-end>\n                        </novo-list-item>\n                        <novo-list-item *ngIf=\"_categoryMap[category].length === 0 && search\" class=\"novo-category-dropdown-empty-item\">\n                            <item-content>{{ search.emptyMessage || labels.noItems }}</item-content>\n                        </novo-list-item>\n                    </novo-list>\n                </novo-nav-content>\n            </novo-nav-outlet>\n            <footer *ngIf=\"footer\" class=\"novo-category-dropdown-footer-align-{{ footer.align || 'right' }}\">\n                <a *ngFor=\"let link of footer.links\" (click)=\"executeClickCallback($event, link)\">{{ link.label }}</a>\n            </footer>\n        </div>\n    ",
                    host: {
                        '(keydown)': 'onKeyDown($event)',
                        '[class.active]': 'active',
                    }
                }] }
    ];
    /** @nocollapse */
    NovoCategoryDropdownElement.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NovoLabelService }
    ]; };
    NovoCategoryDropdownElement.propDecorators = {
        persistSelection: [{ type: Input }],
        closeOnSelect: [{ type: Input }],
        search: [{ type: Input }],
        footer: [{ type: Input }],
        _select: [{ type: Output, args: ['itemSelected',] }],
        categorySelected: [{ type: Output }],
        categories: [{ type: Input }]
    };
    return NovoCategoryDropdownElement;
}(OutsideClick));
export { NovoCategoryDropdownElement };
if (false) {
    /** @type {?} */
    NovoCategoryDropdownElement.prototype._query;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype._categoryMap;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype._categories;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype.clickHandler;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype._masterCategoryMap;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype._queryTimeout;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype.persistSelection;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype.closeOnSelect;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype.search;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype.footer;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype._select;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype.categorySelected;
    /** @type {?} */
    NovoCategoryDropdownElement.prototype.labels;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlEcm9wZG93bi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYXRlZ29yeS1kcm9wZG93bi9DYXRlZ29yeURyb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQzs7QUFFdEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFckU7SUF3Q2lELHVEQUFZO0lBMkMzRCxxQ0FBWSxPQUFtQixFQUFTLE1BQXdCO1FBQWhFLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBRWY7UUFIdUMsWUFBTSxHQUFOLE1BQU0sQ0FBa0I7UUExQ2hFLFlBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsa0JBQVksR0FBUSxFQUFFLENBQUM7UUFDdkIsaUJBQVcsR0FBYSxFQUFFLENBQUM7O1FBTTNCLHNCQUFnQixHQUFZLEtBQUssQ0FBQzs7UUFHbEMsbUJBQWEsR0FBWSxLQUFLLENBQUM7O1FBbUIvQixhQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7O1FBR2hELHNCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBVzVELEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7O0lBQ25ELENBQUM7SUFWRCxzQkFDSSxtREFBVTs7Ozs7UUFEZCxVQUNlLFVBQWU7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7OztPQUFBOzs7O0lBT0QsOENBQVE7OztJQUFSOztZQUNNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RELENBQUM7Ozs7SUFFRCxpREFBVzs7O0lBQVg7O1lBQ00sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDL0QsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7Ozs7O0lBRUQsK0NBQVM7Ozs7SUFBVCxVQUFVLEtBQUs7UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7OztJQUVELG9EQUFjOzs7SUFBZDtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQ2hDLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtnQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVELDRDQUFNOzs7OztJQUFOLFVBQU8sS0FBSyxFQUFFLElBQUk7UUFDaEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixzREFBc0Q7UUFDdEQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBQ0QsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLHlCQUF5QjtRQUN6QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCx3REFBa0I7Ozs7SUFBbEIsVUFBbUIsUUFBUTtRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsZ0RBQVU7Ozs7SUFBVixVQUFXLEtBQUs7UUFBaEIsaUJBT0M7UUFOQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7WUFDaEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELHFEQUFlOzs7O0lBQWYsVUFBZ0IsS0FBSztRQUFyQixpQkFtQkM7UUFsQkMsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFnQjtRQUNoQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsQztRQUNELDBDQUEwQztRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztZQUM5QixLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7Z0JBQ2hDLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ3ZCLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO2lCQUNwSDtxQkFBTTtvQkFDTCxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQ3BFLFVBQUMsSUFBSSxJQUFLLE9BQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBdEQsQ0FBc0QsQ0FDakUsQ0FBQztpQkFDSDtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUVELDBEQUFvQjs7Ozs7SUFBcEIsVUFBcUIsS0FBSyxFQUFFLElBQUk7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQix5QkFBeUI7UUFDekIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7O2dCQXpLRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLDQvRUFnQ1A7b0JBQ0gsSUFBSSxFQUFFO3dCQUNKLFdBQVcsRUFBRSxtQkFBbUI7d0JBQ2hDLGdCQUFnQixFQUFFLFFBQVE7cUJBQzNCO2lCQUNGOzs7O2dCQTlDbUIsVUFBVTtnQkFLckIsZ0JBQWdCOzs7bUNBa0R0QixLQUFLO2dDQUdMLEtBQUs7eUJBU0wsS0FBSzt5QkFPTCxLQUFLOzBCQUdMLE1BQU0sU0FBQyxjQUFjO21DQUdyQixNQUFNOzZCQUdOLEtBQUs7O0lBOEZSLGtDQUFDO0NBQUEsQUExS0QsQ0F3Q2lELFlBQVksR0FrSTVEO1NBbElZLDJCQUEyQjs7O0lBQ3RDLDZDQUFvQjs7SUFDcEIsbURBQXVCOztJQUN2QixrREFBMkI7O0lBQzNCLG1EQUF1Qjs7SUFDdkIseURBQXdCOztJQUN4QixvREFBbUI7O0lBRW5CLHVEQUNrQzs7SUFFbEMsb0RBQytCOztJQVEvQiw2Q0FDWTs7SUFNWiw2Q0FDWTs7SUFFWiw4Q0FDZ0Q7O0lBRWhELHVEQUM4RDs7SUFTN0IsNkNBQStCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgT3V0c2lkZUNsaWNrIH0gZnJvbSAnLi4vLi4vdXRpbHMvb3V0c2lkZS1jbGljay9PdXRzaWRlQ2xpY2snO1xuaW1wb3J0IHsgS2V5Q29kZXMgfSBmcm9tICcuLi8uLi91dGlscy9rZXktY29kZXMvS2V5Q29kZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2F0ZWdvcnktZHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJidXR0b25cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1jb250YWluZXJcIiAqbmdJZj1cImFjdGl2ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24tc2VhcmNoXCIgKm5nSWY9XCJzZWFyY2hcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWNhdGVnb3J5LWRyb3Bkb3duLXNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFtwbGFjZWhvbGRlcl09XCJzZWFyY2gucGxhY2Vob2xkZXIgfHwgbGFiZWxzLnNlYXJjaFwiIFt2YWx1ZV09XCJfcXVlcnlcIiAoaW5wdXQpPVwicXVlcnlDYXRlZ29yaWVzKCRldmVudC50YXJnZXQudmFsdWUpXCIvPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXNlYXJjaFwiICpuZ0lmPVwiIV9xdWVyeVwiPjwvaT5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS10aW1lc1wiICpuZ0lmPVwiX3F1ZXJ5XCIgKGNsaWNrKT1cImNsZWFyUXVlcnkoJGV2ZW50KVwiPjwvaT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG5vdm8tbmF2IHRoZW1lPVwid2hpdGVcIiBbb3V0bGV0XT1cIm5vdm9DYXRlZ29yeURyb3Bkb3duT3V0bGV0XCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgICAgICAgICA8bm92by10YWIgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIF9jYXRlZ29yaWVzXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhdGVnb3J5XCIgKGFjdGl2ZUNoYW5nZSk9XCJvbkNhdGVnb3J5U2VsZWN0ZWQoY2F0ZWdvcnkpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGNhdGVnb3J5IH19ICh7eyBfY2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmxlbmd0aCB9fSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9ub3ZvLXRhYj5cbiAgICAgICAgICAgIDwvbm92by1uYXY+XG4gICAgICAgICAgICA8bm92by1uYXYtb3V0bGV0ICNub3ZvQ2F0ZWdvcnlEcm9wZG93bk91dGxldD5cbiAgICAgICAgICAgICAgICA8bm92by1uYXYtY29udGVudCAqbmdGb3I9XCJsZXQgY2F0ZWdvcnkgb2YgX2NhdGVnb3JpZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9jYXRlZ29yeU1hcFtjYXRlZ29yeV1cIiAoY2xpY2spPVwic2VsZWN0KCRldmVudCwgaXRlbSlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaXRlbS5sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgaXRlbS5sYWJlbCB9fTwvaXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpdGVtLWVuZCBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24taG92ZXJcIiAqbmdJZj1cIml0ZW0uaG92ZXJUZXh0ICYmICFpdGVtLnNlbGVjdGVkXCI+e3sgaXRlbS5ob3ZlclRleHQgfX08L2l0ZW0tZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpdGVtLWVuZCBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24taG92ZXJcIiAqbmdJZj1cIml0ZW0uaG92ZXJJY29uICYmICFpdGVtLnNlbGVjdGVkXCI+PGkgY2xhc3M9XCJiaGkte3sgaXRlbS5ob3Zlckljb24gfX1cIj48L2k+PC9pdGVtLWVuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aXRlbS1lbmQgKm5nSWY9XCJpdGVtLnNlbGVjdGVkXCI+PGkgY2xhc3M9XCJiaGktY2hlY2tcIj48L2k+PC9pdGVtLWVuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1saXN0LWl0ZW0gKm5nSWY9XCJfY2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmxlbmd0aCA9PT0gMCAmJiBzZWFyY2hcIiBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24tZW1wdHktaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgc2VhcmNoLmVtcHR5TWVzc2FnZSB8fCBsYWJlbHMubm9JdGVtcyB9fTwvaXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICAgICAgICAgICAgPC9ub3ZvLW5hdi1jb250ZW50PlxuICAgICAgICAgICAgPC9ub3ZvLW5hdi1vdXRsZXQ+XG4gICAgICAgICAgICA8Zm9vdGVyICpuZ0lmPVwiZm9vdGVyXCIgY2xhc3M9XCJub3ZvLWNhdGVnb3J5LWRyb3Bkb3duLWZvb3Rlci1hbGlnbi17eyBmb290ZXIuYWxpZ24gfHwgJ3JpZ2h0JyB9fVwiPlxuICAgICAgICAgICAgICAgIDxhICpuZ0Zvcj1cImxldCBsaW5rIG9mIGZvb3Rlci5saW5rc1wiIChjbGljayk9XCJleGVjdXRlQ2xpY2tDYWxsYmFjaygkZXZlbnQsIGxpbmspXCI+e3sgbGluay5sYWJlbCB9fTwvYT5cbiAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DYXRlZ29yeURyb3Bkb3duRWxlbWVudCBleHRlbmRzIE91dHNpZGVDbGljayBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgX3F1ZXJ5OiBzdHJpbmcgPSAnJztcbiAgX2NhdGVnb3J5TWFwOiBhbnkgPSB7fTtcbiAgX2NhdGVnb3JpZXM6IHN0cmluZ1tdID0gW107XG4gIGNsaWNrSGFuZGxlcjogRnVuY3Rpb247XG4gIF9tYXN0ZXJDYXRlZ29yeU1hcDogYW55O1xuICBfcXVlcnlUaW1lb3V0OiBhbnk7XG4gIC8vIEJvb2xlYW4gdG8ga2VlcCB0aGUgc2VsZWN0aW9uIHBlcnNpc3Qgd2hlbiBjbG9zaW5nIHRoZSBkcm9wZG93blxuICBASW5wdXQoKVxuICBwZXJzaXN0U2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIEJvb2xlYW4gdG8gY2xvc2UgdGhlIGRyb3Bkb3duIG9uIHNlbGVjdGlvblxuICBASW5wdXQoKVxuICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFNlYXJjaCBDb25maWdcbiAgLy8ge1xuICAvLyAgIHBsYWNlaG9sZGVyOiAnU1RSSU5HJyAvLyBkZWZhdWx0cyB0byBcIlNFQVJDSFwiIC0gcGxhY2Vob2xkZXIgZm9yIHNlYXJjaCBpbnB1dFxuICAvLyAgIGVtcHR5TWVzc2FnZTogJ1NUUklORycgLy8gZGVmYXVsdHMgdG8gXCJUaGVyZSBhcmUgbm8gaXRlbXMuXCIgLSBlbXB0eSBtZXNzYWdlIHdoZW4gdGhlcmUgYXJlIG5vIGl0ZW1zIGluIHRoZSBjYXRlZ29yeVxuICAvLyAgIGRlYm91bmNlOiAnTlVNQkVSIChpbiBNUyknIC8vIGRlZmF1bHRzIHRvIDMwMG1zIC0gZGVib3VuY2UgdGltZSBmb3IgdGhlIHNlYXJjaFxuICAvLyAgIGNvbXBhcmU6ICdGVU5DVElPTicgLy8gZGVmYXVsdCB0byBzaW1wbGUgaW5kZXhPZiAtIGNvbXBhcmUgZnVuY3Rpb24gZm9yIGNhdGVnb3J5IHNlYXJjaCwgc2hvdWxkIGFjY2VwdCAocXVlcnksIGl0ZW0pIGFuZCByZXR1cm4gdHJ1ZS9mYWxzZVxuICAvLyB9XG4gIEBJbnB1dCgpXG4gIHNlYXJjaDogYW55O1xuICAvLyBGb290ZXIgY29uZmlnXG4gIC8vIHtcbiAgLy8gICBhbGlnbjogJ1NUUklORycgLy8gZGVmYXVsdHMgdG8gXCJyaWdodFwiIC0gYWxpZ25tZW50IG9mIHRoZSBsaW5rc1xuICAvLyAgIGxpbmtzOiAnQVJSQVknIC8vIGFycmF5IG9mIGxpbmtzIHRvIGdvIGludG8gdGhlIGZvb3RlciwgYmUgYXdheSBvZiBzcGFjaW5nIC0geyBsYWJlbCwgY2FsbGJhY2sgfSBmb3IgdGhlIG9iamVjdCBpbnNpZGVcbiAgLy8gfVxuICBASW5wdXQoKVxuICBmb290ZXI6IGFueTtcbiAgLy8gRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGl0ZW0gaXMgc2VsZWN0ZWRcbiAgQE91dHB1dCgnaXRlbVNlbGVjdGVkJylcbiAgX3NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8vIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhIGNhdGVnb3J5IGlzIHNlbGVjdGVkXG4gIEBPdXRwdXQoKVxuICBjYXRlZ29yeVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjYXRlZ29yaWVzKGNhdGVnb3JpZXM6IGFueSkge1xuICAgIHRoaXMuX21hc3RlckNhdGVnb3J5TWFwID0gT2JqZWN0LmFzc2lnbih7fSwgY2F0ZWdvcmllcyk7XG4gICAgdGhpcy5fY2F0ZWdvcnlNYXAgPSBPYmplY3QuYXNzaWduKHt9LCBjYXRlZ29yaWVzKTtcbiAgICB0aGlzLl9jYXRlZ29yaWVzID0gT2JqZWN0LmtleXMoY2F0ZWdvcmllcyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZUFjdGl2ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IGJ1dHRvbiA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGxldCBidXR0b24gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2Rlcy5FU0MgfHwgZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuRU5URVIpKSB7XG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgIHRoaXMuX2NhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgIHRoaXMuX2NhdGVnb3J5TWFwW2NhdGVnb3J5XS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0KGV2ZW50LCBpdGVtKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIC8vIElmIHdlIHBlcnNpc3QgdGhlIHNlbGVjdGlvbiwgY2xlYXIgYW5kIHNob3cgYSBjaGVja1xuICAgIGlmICh0aGlzLnBlcnNpc3RTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBFbWl0IHRoZSBpdGVtXG4gICAgdGhpcy5fc2VsZWN0LmVtaXQoaXRlbSk7XG4gICAgLy8gQ2xvc2UsIGlmIGlucHV0IGlzIHNldFxuICAgIGlmICh0aGlzLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKCk7XG4gICAgfVxuICB9XG5cbiAgb25DYXRlZ29yeVNlbGVjdGVkKGNhdGVnb3J5KSB7XG4gICAgdGhpcy5jYXRlZ29yeVNlbGVjdGVkLmVtaXQoY2F0ZWdvcnkpO1xuICB9XG5cbiAgY2xlYXJRdWVyeShldmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLl9xdWVyeSA9ICcnO1xuICAgIC8vIFJlc2V0IHRoZSBjYXRlZ29yaWVzXG4gICAgdGhpcy5fY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xuICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldID0gdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldO1xuICAgIH0pO1xuICB9XG5cbiAgcXVlcnlDYXRlZ29yaWVzKHF1ZXJ5KSB7XG4gICAgLy8gU2F2ZSB0aGUgcXVlcnlcbiAgICB0aGlzLl9xdWVyeSA9IHF1ZXJ5O1xuICAgIC8vIENoZWNrIHRpbWVvdXRcbiAgICBpZiAodGhpcy5fcXVlcnlUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fcXVlcnlUaW1lb3V0KTtcbiAgICB9XG4gICAgLy8gU3RvcmUgYSB0aW1lb3V0LCB0byBkZWJvdW5jZSB1c2VyIGlucHV0XG4gICAgdGhpcy5fcXVlcnlUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9jYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaC5jb21wYXJlKSB7XG4gICAgICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldID0gdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmZpbHRlcigoaXRlbSkgPT4gdGhpcy5zZWFyY2guY29tcGFyZShxdWVyeSwgaXRlbSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2NhdGVnb3J5TWFwW2NhdGVnb3J5XSA9IHRoaXMuX21hc3RlckNhdGVnb3J5TWFwW2NhdGVnb3J5XS5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbSkgPT4gfml0ZW0ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIHRoaXMuc2VhcmNoLmRlYm91bmNlIHx8IDMwMCk7XG4gIH1cblxuICBleGVjdXRlQ2xpY2tDYWxsYmFjayhldmVudCwgbGluaykge1xuICAgIGxpbmsuY2FsbGJhY2soZXZlbnQpO1xuICAgIC8vIENsb3NlLCBpZiBpbnB1dCBpcyBzZXRcbiAgICBpZiAodGhpcy5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19