// NG2
import { ElementRef, Input, ChangeDetectorRef, Directive } from '@angular/core';
// APP
import { Helpers } from '../../../../utils/Helpers';
// Vendor
import { from } from 'rxjs';
/**
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
export class BasePickerResults {
    constructor(element, ref) {
        this._term = '';
        this.selected = [];
        this.matches = [];
        this.hasError = false;
        this.isLoading = false;
        this.isStatic = true;
        this.page = 0;
        this.lastPage = false;
        this.autoSelectFirstOption = true;
        this.optionsFunctionHasChanged = false;
        this.selectingMatches = false;
        this.element = element;
        this.ref = ref;
        this.scrollHandler = this.onScrollDown.bind(this);
    }
    cleanUp() {
        const element = this.getListElement();
        if (element && element.hasAttribute('scrollListener')) {
            element.removeAttribute('scrollListener');
            element.removeEventListener('scroll', this.scrollHandler);
        }
    }
    onScrollDown(event) {
        const element = event.target;
        if (element) {
            const offset = element.offsetHeight + element.scrollTop;
            const bottom = element.scrollHeight - 300;
            if (offset >= bottom) {
                event.stopPropagation();
                if (!this.lastPage && !this.isLoading) {
                    this.processSearch();
                }
            }
        }
    }
    get term() {
        return this._term;
    }
    set term(value) {
        if (this.shouldSearch(value)) {
            this._term = value;
            this.page = 0;
            this.optionsFunctionHasChanged = false;
            this.matches = [];
            this.processSearch(true);
        }
        else {
            this.addScrollListener();
        }
    }
    set config(value) {
        if (this.config && this.config.options !== value.options) {
            this.optionsFunctionHasChanged = true; // reset page so that new options call is used to search
        }
        this._config = value;
    }
    get config() {
        return this._config;
    }
    shouldSearch(value) {
        const termHasChanged = value !== this._term;
        const optionsNotYetCalled = this.page === 0;
        return termHasChanged || optionsNotYetCalled || this.optionsFunctionHasChanged;
    }
    addScrollListener() {
        if (this.config.enableInfiniteScroll) {
            const element = this.getListElement();
            if (element && !element.hasAttribute('scrollListener')) {
                element.setAttribute('scrollListener', 'true');
                element.addEventListener('scroll', this.scrollHandler);
            }
        }
    }
    processSearch(shouldReset) {
        this.hasError = false;
        this.isLoading = true;
        this.ref.markForCheck();
        this.search(this.term).subscribe((results) => {
            if (shouldReset) {
                this.matches = [];
            }
            if (this.isStatic) {
                this.matches = this.filterData(results);
            }
            else {
                this.matches = this.matches.concat(results);
                this.lastPage = results && !results.length;
            }
            if (this.matches.length > 0 && this.autoSelectFirstOption && !this.selectingMatches) {
                this.nextActiveMatch();
            }
            this.isLoading = false;
            this.ref.markForCheck();
            setTimeout(() => {
                this.overlay.updatePosition();
                this.addScrollListener();
            }); // @bkimball: This was added for Dylan Schulte, 9.18.2017 4:14PM EST, you're welcome!
        }, (err) => {
            this.hasError = this.term && this.term.length !== 0;
            this.isLoading = false;
            this.lastPage = true;
            if (this.term && this.term.length !== 0) {
                console.error(err); // tslint:disable-lineno
            }
            this.ref.markForCheck();
        });
    }
    search(term, mode) {
        const options = this.config.options;
        return from(new Promise((resolve, reject) => {
            // Check if there is match data
            if (options) {
                // Resolve the data
                if (Array.isArray(options)) {
                    this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(this.structureArray(options));
                }
                else if (this.shouldCallOptionsFunction(term)) {
                    if ((options.hasOwnProperty('reject') && options.hasOwnProperty('resolve')) ||
                        Object.getPrototypeOf(options).hasOwnProperty('then')) {
                        this.isStatic = false;
                        // Promises (ES6 or Deferred) are resolved whenever they resolve
                        options.then(this.structureArray.bind(this)).then(resolve, reject);
                    }
                    else if (typeof options === 'function') {
                        this.isStatic = false;
                        // Promises (ES6 or Deferred) are resolved whenever they resolve
                        options(term, ++this.page)
                            .then(this.structureArray.bind(this))
                            .then(resolve, reject);
                    }
                    else {
                        // All other kinds of data are rejected
                        reject('The data provided is not an array or a promise');
                        throw new Error('The data provided is not an array or a promise');
                    }
                }
                else {
                    if (this.config.defaultOptions) {
                        this.isStatic = false;
                        if (typeof this.config.defaultOptions === 'function') {
                            const defaultOptions = this.config.defaultOptions(term, ++this.page);
                            if (Object.getPrototypeOf(defaultOptions).hasOwnProperty('then')) {
                                defaultOptions.then(this.structureArray.bind(this)).then(resolve, reject);
                            }
                            else {
                                resolve(this.structureArray(defaultOptions));
                            }
                        }
                        else {
                            resolve(this.structureArray(this.config.defaultOptions));
                        }
                    }
                    else {
                        // No search term gets rejected
                        reject('No search term');
                    }
                }
            }
            else {
                // No data gets rejected
                reject('error');
            }
        }));
    }
    shouldCallOptionsFunction(term) {
        if (this.config && 'minSearchLength' in this.config && Number.isInteger(this.config.minSearchLength)) {
            return typeof term === 'string' && term.length >= this.config.minSearchLength;
        }
        else {
            return !!(term && term.length);
        }
    }
    /**
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection) {
        const dataArray = collection.data ? collection.data : collection;
        if (dataArray && (typeof dataArray[0] === 'string' || typeof dataArray[0] === 'number')) {
            return collection.map((item) => {
                return {
                    value: item,
                    label: item,
                };
            });
        }
        return dataArray.map((data) => {
            let value = this.config.field ? data[this.config.field] : data.value || data;
            if (this.config.valueFormat) {
                value = Helpers.interpolate(this.config.valueFormat, data);
            }
            const label = this.config.format ? Helpers.interpolate(this.config.format, data) : data.label || String(value);
            return { value, label, data };
        });
    }
    /**
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches) {
        if (this.term && matches) {
            return matches.filter((match) => {
                return ~String(match.label)
                    .toLowerCase()
                    .indexOf(this.term.toLowerCase());
            });
        }
        // Show no recent results template
        return matches;
    }
    /**
     * @description This function is called when the user presses the enter key to call the selectMatch method.
     */
    selectActiveMatch() {
        this.selectMatch();
    }
    /**
     * @description This function sets activeMatch to the match before the current node.
     */
    prevActiveMatch() {
        const index = this.matches.indexOf(this.activeMatch);
        this.activeMatch = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
        this.scrollToActive();
        this.ref.markForCheck();
    }
    /**
     * @description This function sets activeMatch to the match after the current node.
     */
    nextActiveMatch() {
        const index = this.matches.indexOf(this.activeMatch);
        this.activeMatch = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
        this.scrollToActive();
        this.ref.markForCheck();
    }
    getListElement() {
        return this.element.nativeElement;
    }
    getChildrenOfListElement() {
        let children = [];
        if (this.getListElement()) {
            children = this.getListElement().children;
        }
        return children;
    }
    scrollToActive() {
        const list = this.getListElement();
        const items = this.getChildrenOfListElement();
        const index = this.matches.indexOf(this.activeMatch);
        const item = items[index];
        if (item) {
            list.scrollTop = item.offsetTop;
        }
    }
    /**
     * @description
     */
    selectActive(match) {
        this.activeMatch = match;
    }
    /**
     * @description
     */
    isActive(match) {
        return this.activeMatch === match;
    }
    /**
     * @description
     */
    selectMatch(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        const selected = this.activeMatch;
        if (selected && this.parent) {
            this.parent.value = selected;
            this.selectingMatches = true;
            if (this.parent.closeOnSelect) {
                this.parent.hideResults();
                this.selectingMatches = false;
            }
        }
        this.ref.markForCheck();
        return false;
    }
    /**
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    escapeRegexp(queryToEscape) {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
    /**
     * @description This function should return a <strong>-tag wrapped HTML string.
     */
    highlight(match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query ? match.replace(new RegExp(this.escapeRegexp(query.trim()), 'gi'), '<strong>$&</strong>') : match;
    }
    preselected(match) {
        if (this.config.preselected) {
            const preselectedFunc = this.config.preselected;
            return (this.selected.findIndex((item) => {
                return preselectedFunc(match, item);
            }) !== -1);
        }
        return (this.selected.findIndex((item) => {
            let isPreselected = false;
            if (item && item.value && match && match.value) {
                if (item.value.id && match.value.id) {
                    isPreselected = item.value.id === match.value.id;
                }
                else if (item.value instanceof Object && item.value.hasOwnProperty('value')) {
                    isPreselected = item.value.value === match.value;
                }
                else {
                    isPreselected = item.value === match.value;
                }
            }
            return isPreselected;
        }) !== -1);
    }
}
BasePickerResults.decorators = [
    { type: Directive }
];
BasePickerResults.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
BasePickerResults.propDecorators = {
    matches: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3BpY2tlci9leHRyYXMvYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEQsU0FBUztBQUNULE9BQU8sRUFBRSxJQUFJLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFJeEM7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGlCQUFpQjtJQW9CNUIsWUFBWSxPQUFtQixFQUFFLEdBQXNCO1FBbkJ2RCxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUMzQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsYUFBUSxHQUFZLElBQUksQ0FBQztRQU16QixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsMEJBQXFCLEdBQVksSUFBSSxDQUFDO1FBRXRDLDhCQUF5QixHQUFZLEtBQUssQ0FBQztRQUNuQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFJeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxD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LENBQUM7U0FDSDtRQUNELE9BQU8sQ0FDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQy9CLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUM5QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO29CQUNuQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7aUJBQ2xEO3FCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssWUFBWSxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzdFLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNsRDtxQkFBTTtvQkFDTCxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUM1QzthQUNGO1lBQ0QsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ1YsQ0FBQztJQUNKLENBQUM7OztZQTVXRixTQUFTOzs7WUFaRCxVQUFVO1lBQVMsaUJBQWlCOzs7c0JBZ0IxQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IEVsZW1lbnRSZWYsIElucHV0LCBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcbi8vIFZlbmRvclxyXG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IE5vdm9Db250cm9sQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vZm9ybS9jb250cm9scy9CYXNlQ29udHJvbCc7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgdGhlIGFjdHVhbCBsaXN0IG9mIG1hdGNoZXMgdGhhdCBnZXRzIGluamVjdGVkIGludG8gdGhlIERPTS4gSXQncyBhbHNvIHRoZSBwaWVjZSB0aGF0IGNhbiBiZVxyXG4gKiBvdmVyd3JpdHRlbiBpZiBjdXN0b20gbGlzdCBvcHRpb25zIGFyZSBuZWVkZWQuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGNsYXNzIEJhc2VQaWNrZXJSZXN1bHRzIHtcclxuICBfdGVybTogc3RyaW5nID0gJyc7XHJcbiAgc2VsZWN0ZWQ6IEFycmF5PGFueT4gPSBbXTtcclxuICBASW5wdXQoKSBtYXRjaGVzOiBhbnkgPSBbXTtcclxuICBoYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGlzU3RhdGljOiBib29sZWFuID0gdHJ1ZTtcclxuICBfY29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZ1snY29uZmlnJ107XHJcbiAgYWN0aXZlTWF0Y2g6IGFueTtcclxuICBwYXJlbnQ6IGFueTtcclxuICBlbGVtZW50OiBFbGVtZW50UmVmO1xyXG4gIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XHJcbiAgcGFnZTogbnVtYmVyID0gMDtcclxuICBsYXN0UGFnZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGF1dG9TZWxlY3RGaXJzdE9wdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgb3ZlcmxheTogT3ZlcmxheVJlZjtcclxuICBvcHRpb25zRnVuY3Rpb25IYXNDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzZWxlY3RpbmdNYXRjaGVzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzY3JvbGxIYW5kbGVyOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLnJlZiA9IHJlZjtcclxuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHRoaXMub25TY3JvbGxEb3duLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBjbGVhblVwKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZWxlbWVudDogRWxlbWVudCA9IHRoaXMuZ2V0TGlzdEVsZW1lbnQoKTtcclxuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuaGFzQXR0cmlidXRlKCdzY3JvbGxMaXN0ZW5lcicpKSB7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzY3JvbGxMaXN0ZW5lcicpO1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblNjcm9sbERvd24oZXZlbnQ6IFdoZWVsRXZlbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQ6IGFueSA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgZWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICAgIGNvbnN0IGJvdHRvbSA9IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gMzAwO1xyXG4gICAgICBpZiAob2Zmc2V0ID49IGJvdHRvbSkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmICghdGhpcy5sYXN0UGFnZSAmJiAhdGhpcy5pc0xvYWRpbmcpIHtcclxuICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IHRlcm0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGVybTtcclxuICB9XHJcblxyXG4gIHNldCB0ZXJtKHZhbHVlKSB7XHJcbiAgICBpZiAodGhpcy5zaG91bGRTZWFyY2godmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuX3Rlcm0gPSB2YWx1ZTtcclxuICAgICAgdGhpcy5wYWdlID0gMDtcclxuICAgICAgdGhpcy5vcHRpb25zRnVuY3Rpb25IYXNDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xyXG4gICAgICB0aGlzLnByb2Nlc3NTZWFyY2godHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFkZFNjcm9sbExpc3RlbmVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQgY29uZmlnKHZhbHVlOiBOb3ZvQ29udHJvbENvbmZpZ1snY29uZmlnJ10pIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5vcHRpb25zICE9PSB2YWx1ZS5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub3B0aW9uc0Z1bmN0aW9uSGFzQ2hhbmdlZCA9IHRydWU7IC8vIHJlc2V0IHBhZ2Ugc28gdGhhdCBuZXcgb3B0aW9ucyBjYWxsIGlzIHVzZWQgdG8gc2VhcmNoXHJcbiAgICB9XHJcbiAgICB0aGlzLl9jb25maWcgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBjb25maWcoKTogTm92b0NvbnRyb2xDb25maWdbJ2NvbmZpZyddIHtcclxuICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgfVxyXG5cclxuICBzaG91bGRTZWFyY2godmFsdWU6IHVua25vd24pOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHRlcm1IYXNDaGFuZ2VkID0gdmFsdWUgIT09IHRoaXMuX3Rlcm07XHJcbiAgICBjb25zdCBvcHRpb25zTm90WWV0Q2FsbGVkID0gdGhpcy5wYWdlID09PSAwO1xyXG5cclxuICAgIHJldHVybiB0ZXJtSGFzQ2hhbmdlZCB8fCBvcHRpb25zTm90WWV0Q2FsbGVkIHx8IHRoaXMub3B0aW9uc0Z1bmN0aW9uSGFzQ2hhbmdlZDtcclxuICB9XHJcblxyXG4gIGFkZFNjcm9sbExpc3RlbmVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZUluZmluaXRlU2Nyb2xsKSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdldExpc3RFbGVtZW50KCk7XHJcbiAgICAgIGlmIChlbGVtZW50ICYmICFlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnc2Nyb2xsTGlzdGVuZXInKSkge1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzY3JvbGxMaXN0ZW5lcicsICd0cnVlJyk7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzU2VhcmNoKHNob3VsZFJlc2V0PzogYm9vbGVhbikge1xyXG4gICAgdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB0aGlzLnNlYXJjaCh0aGlzLnRlcm0pLnN1YnNjcmliZShcclxuICAgICAgKHJlc3VsdHM6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChzaG91bGRSZXNldCkge1xyXG4gICAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGljKSB7XHJcbiAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlckRhdGEocmVzdWx0cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMubWF0Y2hlcy5jb25jYXQocmVzdWx0cyk7XHJcbiAgICAgICAgICB0aGlzLmxhc3RQYWdlID0gcmVzdWx0cyAmJiAhcmVzdWx0cy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1hdGNoZXMubGVuZ3RoID4gMCAmJiB0aGlzLmF1dG9TZWxlY3RGaXJzdE9wdGlvbiAmJiAhdGhpcy5zZWxlY3RpbmdNYXRjaGVzKSB7XHJcbiAgICAgICAgICB0aGlzLm5leHRBY3RpdmVNYXRjaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vdmVybGF5LnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICB0aGlzLmFkZFNjcm9sbExpc3RlbmVyKCk7XHJcbiAgICAgICAgfSk7IC8vIEBia2ltYmFsbDogVGhpcyB3YXMgYWRkZWQgZm9yIER5bGFuIFNjaHVsdGUsIDkuMTguMjAxNyA0OjE0UE0gRVNULCB5b3UncmUgd2VsY29tZSFcclxuICAgICAgfSxcclxuICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0aGlzLnRlcm0gJiYgdGhpcy50ZXJtLmxlbmd0aCAhPT0gMDtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGFzdFBhZ2UgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnRlcm0gJiYgdGhpcy50ZXJtLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lbm9cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoKHRlcm0sIG1vZGU/KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gICAgcmV0dXJuIGZyb20oXHJcbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBtYXRjaCBkYXRhXHJcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgIC8vIFJlc29sdmUgdGhlIGRhdGFcclxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBBcnJheXMgYXJlIHJldHVybmVkIGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5zdHJ1Y3R1cmVBcnJheShvcHRpb25zKSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvdWxkQ2FsbE9wdGlvbnNGdW5jdGlvbih0ZXJtKSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3JlamVjdCcpICYmIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3Jlc29sdmUnKSkgfHxcclxuICAgICAgICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3B0aW9ucykuaGFzT3duUHJvcGVydHkoJ3RoZW4nKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICB0aGlzLmlzU3RhdGljID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgLy8gUHJvbWlzZXMgKEVTNiBvciBEZWZlcnJlZCkgYXJlIHJlc29sdmVkIHdoZW5ldmVyIHRoZXkgcmVzb2x2ZVxyXG4gICAgICAgICAgICAgIG9wdGlvbnMudGhlbih0aGlzLnN0cnVjdHVyZUFycmF5LmJpbmQodGhpcykpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAvLyBQcm9taXNlcyAoRVM2IG9yIERlZmVycmVkKSBhcmUgcmVzb2x2ZWQgd2hlbmV2ZXIgdGhleSByZXNvbHZlXHJcbiAgICAgICAgICAgICAgb3B0aW9ucyh0ZXJtLCArK3RoaXMucGFnZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHRoaXMuc3RydWN0dXJlQXJyYXkuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gQWxsIG90aGVyIGtpbmRzIG9mIGRhdGEgYXJlIHJlamVjdGVkXHJcbiAgICAgICAgICAgICAgcmVqZWN0KCdUaGUgZGF0YSBwcm92aWRlZCBpcyBub3QgYW4gYXJyYXkgb3IgYSBwcm9taXNlJyk7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBwcm92aWRlZCBpcyBub3QgYW4gYXJyYXkgb3IgYSBwcm9taXNlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5kZWZhdWx0T3B0aW9ucykge1xyXG4gICAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmRlZmF1bHRPcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHRoaXMuY29uZmlnLmRlZmF1bHRPcHRpb25zKHRlcm0sICsrdGhpcy5wYWdlKTtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoZGVmYXVsdE9wdGlvbnMpLmhhc093blByb3BlcnR5KCd0aGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMudGhlbih0aGlzLnN0cnVjdHVyZUFycmF5LmJpbmQodGhpcykpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5zdHJ1Y3R1cmVBcnJheShkZWZhdWx0T3B0aW9ucykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuc3RydWN0dXJlQXJyYXkodGhpcy5jb25maWcuZGVmYXVsdE9wdGlvbnMpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gTm8gc2VhcmNoIHRlcm0gZ2V0cyByZWplY3RlZFxyXG4gICAgICAgICAgICAgIHJlamVjdCgnTm8gc2VhcmNoIHRlcm0nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBObyBkYXRhIGdldHMgcmVqZWN0ZWRcclxuICAgICAgICAgIHJlamVjdCgnZXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHNob3VsZENhbGxPcHRpb25zRnVuY3Rpb24odGVybTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5jb25maWcgJiYgJ21pblNlYXJjaExlbmd0aCcgaW4gdGhpcy5jb25maWcgJiYgTnVtYmVyLmlzSW50ZWdlcih0aGlzLmNvbmZpZy5taW5TZWFyY2hMZW5ndGgpKSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgdGVybSA9PT0gJ3N0cmluZycgJiYgdGVybS5sZW5ndGggPj0gdGhpcy5jb25maWcubWluU2VhcmNoTGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICEhKHRlcm0gJiYgdGVybS5sZW5ndGgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb24gLSB0aGUgZGF0YSBvbmNlIGdldERhdGEgcmVzb2x2ZXMgaXRcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHN0cnVjdHVyZXMgYW4gYXJyYXkgb2Ygbm9kZXMgaW50byBhbiBhcnJheSBvZiBvYmplY3RzIHdpdGggYVxyXG4gICAqICduYW1lJyBmaWVsZCBieSBkZWZhdWx0LlxyXG4gICAqL1xyXG4gIHN0cnVjdHVyZUFycmF5KGNvbGxlY3Rpb246IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBkYXRhQXJyYXkgPSBjb2xsZWN0aW9uLmRhdGEgPyBjb2xsZWN0aW9uLmRhdGEgOiBjb2xsZWN0aW9uO1xyXG4gICAgaWYgKGRhdGFBcnJheSAmJiAodHlwZW9mIGRhdGFBcnJheVswXSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGRhdGFBcnJheVswXSA9PT0gJ251bWJlcicpKSB7XHJcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB2YWx1ZTogaXRlbSxcclxuICAgICAgICAgIGxhYmVsOiBpdGVtLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGFBcnJheS5tYXAoKGRhdGEpID0+IHtcclxuICAgICAgbGV0IHZhbHVlID0gdGhpcy5jb25maWcuZmllbGQgPyBkYXRhW3RoaXMuY29uZmlnLmZpZWxkXSA6IGRhdGEudmFsdWUgfHwgZGF0YTtcclxuICAgICAgaWYgKHRoaXMuY29uZmlnLnZhbHVlRm9ybWF0KSB7XHJcbiAgICAgICAgdmFsdWUgPSBIZWxwZXJzLmludGVycG9sYXRlKHRoaXMuY29uZmlnLnZhbHVlRm9ybWF0LCBkYXRhKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY29uZmlnLmZvcm1hdCA/IEhlbHBlcnMuaW50ZXJwb2xhdGUodGhpcy5jb25maWcuZm9ybWF0LCBkYXRhKSA6IGRhdGEubGFiZWwgfHwgU3RyaW5nKHZhbHVlKTtcclxuICAgICAgcmV0dXJuIHsgdmFsdWUsIGxhYmVsLCBkYXRhIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBtYXRjaGVzIC0gQ29sbGVjdGlvbiBvZiBvYmplY3RzPVxyXG4gICAqXHJcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gbG9vcHMgdGhyb3VnaCB0aGUgcGlja2VyIG9wdGlvbnMgYW5kIGNyZWF0ZXMgYSBmaWx0ZXJlZCBsaXN0IG9mIG9iamVjdHMgdGhhdCBjb250YWluXHJcbiAgICogdGhlIG5ld1NlYXJjaC5cclxuICAgKi9cclxuICBmaWx0ZXJEYXRhKG1hdGNoZXMpOiBBcnJheTxhbnk+IHtcclxuICAgIGlmICh0aGlzLnRlcm0gJiYgbWF0Y2hlcykge1xyXG4gICAgICByZXR1cm4gbWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIH5TdHJpbmcobWF0Y2gubGFiZWwpXHJcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgLmluZGV4T2YodGhpcy50ZXJtLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIFNob3cgbm8gcmVjZW50IHJlc3VsdHMgdGVtcGxhdGVcclxuICAgIHJldHVybiBtYXRjaGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyB0aGUgZW50ZXIga2V5IHRvIGNhbGwgdGhlIHNlbGVjdE1hdGNoIG1ldGhvZC5cclxuICAgKi9cclxuICBzZWxlY3RBY3RpdmVNYXRjaCgpIHtcclxuICAgIHRoaXMuc2VsZWN0TWF0Y2goKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNldHMgYWN0aXZlTWF0Y2ggdG8gdGhlIG1hdGNoIGJlZm9yZSB0aGUgY3VycmVudCBub2RlLlxyXG4gICAqL1xyXG4gIHByZXZBY3RpdmVNYXRjaCgpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tYXRjaGVzLmluZGV4T2YodGhpcy5hY3RpdmVNYXRjaCk7XHJcbiAgICB0aGlzLmFjdGl2ZU1hdGNoID0gdGhpcy5tYXRjaGVzW2luZGV4IC0gMSA8IDAgPyB0aGlzLm1hdGNoZXMubGVuZ3RoIC0gMSA6IGluZGV4IC0gMV07XHJcbiAgICB0aGlzLnNjcm9sbFRvQWN0aXZlKCk7XHJcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNldHMgYWN0aXZlTWF0Y2ggdG8gdGhlIG1hdGNoIGFmdGVyIHRoZSBjdXJyZW50IG5vZGUuXHJcbiAgICovXHJcbiAgbmV4dEFjdGl2ZU1hdGNoKCkge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1hdGNoZXMuaW5kZXhPZih0aGlzLmFjdGl2ZU1hdGNoKTtcclxuICAgIHRoaXMuYWN0aXZlTWF0Y2ggPSB0aGlzLm1hdGNoZXNbaW5kZXggKyAxID4gdGhpcy5tYXRjaGVzLmxlbmd0aCAtIDEgPyAwIDogaW5kZXggKyAxXTtcclxuICAgIHRoaXMuc2Nyb2xsVG9BY3RpdmUoKTtcclxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGlzdEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRDaGlsZHJlbk9mTGlzdEVsZW1lbnQoKSB7XHJcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTtcclxuICAgIGlmICh0aGlzLmdldExpc3RFbGVtZW50KCkpIHtcclxuICAgICAgY2hpbGRyZW4gPSB0aGlzLmdldExpc3RFbGVtZW50KCkuY2hpbGRyZW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hpbGRyZW47XHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb0FjdGl2ZSgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmdldExpc3RFbGVtZW50KCk7XHJcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuZ2V0Q2hpbGRyZW5PZkxpc3RFbGVtZW50KCk7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMubWF0Y2hlcy5pbmRleE9mKHRoaXMuYWN0aXZlTWF0Y2gpO1xyXG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcclxuICAgIGlmIChpdGVtKSB7XHJcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbS5vZmZzZXRUb3A7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKi9cclxuICBzZWxlY3RBY3RpdmUobWF0Y2gpIHtcclxuICAgIHRoaXMuYWN0aXZlTWF0Y2ggPSBtYXRjaDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqL1xyXG4gIGlzQWN0aXZlKG1hdGNoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVNYXRjaCA9PT0gbWF0Y2g7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKi9cclxuICBzZWxlY3RNYXRjaChldmVudD86IGFueSwgaXRlbT86IGFueSkge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5hY3RpdmVNYXRjaDtcclxuICAgIGlmIChzZWxlY3RlZCAmJiB0aGlzLnBhcmVudCkge1xyXG4gICAgICB0aGlzLnBhcmVudC52YWx1ZSA9IHNlbGVjdGVkO1xyXG4gICAgICB0aGlzLnNlbGVjdGluZ01hdGNoZXMgPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy5wYXJlbnQuY2xvc2VPblNlbGVjdCkge1xyXG4gICAgICAgIHRoaXMucGFyZW50LmhpZGVSZXN1bHRzKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RpbmdNYXRjaGVzID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gY2FwdHVyZXMgdGhlIHdob2xlIHF1ZXJ5IHN0cmluZyBhbmQgcmVwbGFjZSBpdCB3aXRoIHRoZSBzdHJpbmcgdGhhdCB3aWxsIGJlIHVzZWQgdG9cclxuICAgKiBtYXRjaC5cclxuICAgKi9cclxuICBlc2NhcGVSZWdleHAocXVlcnlUb0VzY2FwZSkge1xyXG4gICAgLy8gRXg6IGlmIHRoZSBjYXB0dXJlIGlzIFwiYVwiIHRoZSByZXN1bHQgd2lsbCBiZSBcXGFcclxuICAgIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgPHN0cm9uZz4tdGFnIHdyYXBwZWQgSFRNTCBzdHJpbmcuXHJcbiAgICovXHJcbiAgaGlnaGxpZ2h0KG1hdGNoLCBxdWVyeSkge1xyXG4gICAgLy8gUmVwbGFjZXMgdGhlIGNhcHR1cmUgc3RyaW5nIHdpdGggYSB0aGUgc2FtZSBzdHJpbmcgaW5zaWRlIG9mIGEgXCJzdHJvbmdcIiB0YWdcclxuICAgIHJldHVybiBxdWVyeSA/IG1hdGNoLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLmVzY2FwZVJlZ2V4cChxdWVyeS50cmltKCkpLCAnZ2knKSwgJzxzdHJvbmc+JCY8L3N0cm9uZz4nKSA6IG1hdGNoO1xyXG4gIH1cclxuXHJcbiAgcHJlc2VsZWN0ZWQobWF0Y2gpIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZy5wcmVzZWxlY3RlZCkge1xyXG4gICAgICBjb25zdCBwcmVzZWxlY3RlZEZ1bmM6IEZ1bmN0aW9uID0gdGhpcy5jb25maWcucHJlc2VsZWN0ZWQ7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5maW5kSW5kZXgoKGl0ZW0pID0+IHtcclxuICAgICAgICAgIHJldHVybiBwcmVzZWxlY3RlZEZ1bmMobWF0Y2gsIGl0ZW0pO1xyXG4gICAgICAgIH0pICE9PSAtMVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5zZWxlY3RlZC5maW5kSW5kZXgoKGl0ZW0pID0+IHtcclxuICAgICAgICBsZXQgaXNQcmVzZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0udmFsdWUgJiYgbWF0Y2ggJiYgbWF0Y2gudmFsdWUpIHtcclxuICAgICAgICAgIGlmIChpdGVtLnZhbHVlLmlkICYmIG1hdGNoLnZhbHVlLmlkKSB7XHJcbiAgICAgICAgICAgIGlzUHJlc2VsZWN0ZWQgPSBpdGVtLnZhbHVlLmlkID09PSBtYXRjaC52YWx1ZS5pZDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCAmJiBpdGVtLnZhbHVlLmhhc093blByb3BlcnR5KCd2YWx1ZScpKSB7XHJcbiAgICAgICAgICAgIGlzUHJlc2VsZWN0ZWQgPSBpdGVtLnZhbHVlLnZhbHVlID09PSBtYXRjaC52YWx1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlzUHJlc2VsZWN0ZWQgPSBpdGVtLnZhbHVlID09PSBtYXRjaC52YWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VsZWN0ZWQ7XHJcbiAgICAgIH0pICE9PSAtMVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19