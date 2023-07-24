import { ChangeDetectorRef, Directive, ElementRef, Input } from '@angular/core';
// Vendor
import { from } from 'rxjs';
// APP
import { Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
// import { NovoControlConfig } from 'novo-elements/elements/form'; // actual type of the config property on this is any
/**
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
export class BasePickerResults {
    constructor(element, ref) {
        this._term = '';
        this.selected = [];
        this.hasError = false;
        this.isLoading = false;
        this.isStatic = true;
        this.page = 0;
        this.lastPage = false;
        this.autoSelectFirstOption = true;
        this.optionsFunctionHasChanged = false;
        this.selectingMatches = false;
        this._matches = [];
        this.customTextValue = null;
        this.element = element;
        this.ref = ref;
        this.scrollHandler = this.onScrollDown.bind(this);
    }
    set matches(m) {
        this._matches = m;
    }
    get matches() {
        return this.customTextValue ? [...this._matches, this.customTextValue] : this._matches;
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
    get term() {
        return this._term;
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
                return ~String(match.label).toLowerCase().indexOf(this.term.toLowerCase());
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
     * @deprecated use highlight pipe
     */
    highlight(match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query ? match.replace(new RegExp(this.escapeRegexp(query.trim()), 'gi'), '<strong>$&</strong>') : match;
    }
    preselected(match) {
        let selected = this.selected;
        if (this.config && this.config.selected) {
            selected = [...this.selected, ...this.config.selected];
        }
        if (this.config && this.config.preselected) {
            const preselectedFunc = this.config.preselected;
            return (selected.findIndex((item) => {
                return preselectedFunc(match, item);
            }) !== -1);
        }
        return (selected.findIndex((item) => {
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
BasePickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BasePickerResults, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
BasePickerResults.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: BasePickerResults, inputs: { matches: "matches", term: "term" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BasePickerResults, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { matches: [{
                type: Input
            }], term: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9waWNrZXIvZXh0cmFzL2Jhc2UtcGlja2VyLXJlc3VsdHMvQmFzZVBpY2tlclJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLFNBQVM7QUFDVCxPQUFPLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBQzlDLHdIQUF3SDtBQUV4SDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8saUJBQWlCO0lBOEI1QixZQUFZLE9BQW1CLEVBQUUsR0FBc0I7UUE3QnZELFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUMxQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsYUFBUSxHQUFZLElBQUksQ0FBQztRQU16QixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsMEJBQXFCLEdBQVksSUFBSSxDQUFDO1FBRXRDLDhCQUF5QixHQUFZLEtBQUssQ0FBQztRQUNuQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFMUMsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUMxQixvQkFBZSxHQUFRLElBQUksQ0FBQztRQVkxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJ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QUFLLENBQUMsS0FBSyxDQUFDO2lCQUNsRDtxQkFBTTtvQkFDTCxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUM1QzthQUNGO1lBQ0QsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ1YsQ0FBQztJQUNKLENBQUM7OytHQXhYVSxpQkFBaUI7bUdBQWpCLGlCQUFpQjs0RkFBakIsaUJBQWlCO2tCQUQ3QixTQUFTO2lJQXVCSixPQUFPO3NCQURWLEtBQUs7Z0JBc0NGLElBQUk7c0JBRFAsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbi8vIEFQUFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuLy8gaW1wb3J0IHsgTm92b0NvbnRyb2xDb25maWcgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2Zvcm0nOyAvLyBhY3R1YWwgdHlwZSBvZiB0aGUgY29uZmlnIHByb3BlcnR5IG9uIHRoaXMgaXMgYW55XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgdGhlIGFjdHVhbCBsaXN0IG9mIG1hdGNoZXMgdGhhdCBnZXRzIGluamVjdGVkIGludG8gdGhlIERPTS4gSXQncyBhbHNvIHRoZSBwaWVjZSB0aGF0IGNhbiBiZVxuICogb3ZlcndyaXR0ZW4gaWYgY3VzdG9tIGxpc3Qgb3B0aW9ucyBhcmUgbmVlZGVkLlxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBCYXNlUGlja2VyUmVzdWx0cyB7XG4gIF90ZXJtOiBzdHJpbmcgPSAnJztcbiAgc2VsZWN0ZWQ6IEFycmF5PGFueT4gPSBbXTtcbiAgaGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIGlzU3RhdGljOiBib29sZWFuID0gdHJ1ZTtcbiAgX2NvbmZpZzogYW55O1xuICBhY3RpdmVNYXRjaDogYW55O1xuICBwYXJlbnQ6IGFueTtcbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZjtcbiAgcGFnZTogbnVtYmVyID0gMDtcbiAgbGFzdFBhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYXV0b1NlbGVjdEZpcnN0T3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgb3ZlcmxheTogT3ZlcmxheVJlZjtcbiAgb3B0aW9uc0Z1bmN0aW9uSGFzQ2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGluZ01hdGNoZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzY3JvbGxIYW5kbGVyOiBhbnk7XG4gIF9tYXRjaGVzOiBBcnJheTxhbnk+ID0gW107XG4gIGN1c3RvbVRleHRWYWx1ZTogYW55ID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBzZXQgbWF0Y2hlcyhtOiBBcnJheTxhbnk+KSB7XG4gICAgdGhpcy5fbWF0Y2hlcyA9IG07XG4gIH1cblxuICBnZXQgbWF0Y2hlcygpIHtcbiAgICByZXR1cm4gdGhpcy5jdXN0b21UZXh0VmFsdWUgPyBbLi4udGhpcy5fbWF0Y2hlcywgdGhpcy5jdXN0b21UZXh0VmFsdWVdIDogdGhpcy5fbWF0Y2hlcztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMucmVmID0gcmVmO1xuICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IHRoaXMub25TY3JvbGxEb3duLmJpbmQodGhpcyk7XG4gIH1cblxuICBjbGVhblVwKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdldExpc3RFbGVtZW50KCk7XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3Njcm9sbExpc3RlbmVyJykpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzY3JvbGxMaXN0ZW5lcicpO1xuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2Nyb2xsRG93bihldmVudDogV2hlZWxFdmVudCkge1xuICAgIGNvbnN0IGVsZW1lbnQ6IGFueSA9IGV2ZW50LnRhcmdldDtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBlbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgIGNvbnN0IGJvdHRvbSA9IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gMzAwO1xuICAgICAgaWYgKG9mZnNldCA+PSBib3R0b20pIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICghdGhpcy5sYXN0UGFnZSAmJiAhdGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NTZWFyY2goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB0ZXJtKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkU2VhcmNoKHZhbHVlKSkge1xuICAgICAgdGhpcy5fdGVybSA9IHZhbHVlO1xuICAgICAgdGhpcy5wYWdlID0gMDtcbiAgICAgIHRoaXMub3B0aW9uc0Z1bmN0aW9uSGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICB0aGlzLnByb2Nlc3NTZWFyY2godHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgdGVybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVybTtcbiAgfVxuXG4gIHNldCBjb25maWcodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5vcHRpb25zICE9PSB2YWx1ZS5vcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnNGdW5jdGlvbkhhc0NoYW5nZWQgPSB0cnVlOyAvLyByZXNldCBwYWdlIHNvIHRoYXQgbmV3IG9wdGlvbnMgY2FsbCBpcyB1c2VkIHRvIHNlYXJjaFxuICAgIH1cbiAgICB0aGlzLl9jb25maWcgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBjb25maWcoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgc2hvdWxkU2VhcmNoKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdGVybUhhc0NoYW5nZWQgPSB2YWx1ZSAhPT0gdGhpcy5fdGVybTtcbiAgICBjb25zdCBvcHRpb25zTm90WWV0Q2FsbGVkID0gdGhpcy5wYWdlID09PSAwO1xuXG4gICAgcmV0dXJuIHRlcm1IYXNDaGFuZ2VkIHx8IG9wdGlvbnNOb3RZZXRDYWxsZWQgfHwgdGhpcy5vcHRpb25zRnVuY3Rpb25IYXNDaGFuZ2VkO1xuICB9XG5cbiAgYWRkU2Nyb2xsTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZUluZmluaXRlU2Nyb2xsKSB7XG4gICAgICBjb25zdCBlbGVtZW50OiBFbGVtZW50ID0gdGhpcy5nZXRMaXN0RWxlbWVudCgpO1xuICAgICAgaWYgKGVsZW1lbnQgJiYgIWVsZW1lbnQuaGFzQXR0cmlidXRlKCdzY3JvbGxMaXN0ZW5lcicpKSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzY3JvbGxMaXN0ZW5lcicsICd0cnVlJyk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm9jZXNzU2VhcmNoKHNob3VsZFJlc2V0PzogYm9vbGVhbikge1xuICAgIHRoaXMuaGFzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5zZWFyY2godGhpcy50ZXJtKS5zdWJzY3JpYmUoXG4gICAgICAocmVzdWx0czogYW55KSA9PiB7XG4gICAgICAgIGlmIChzaG91bGRSZXNldCkge1xuICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGljKSB7XG4gICAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXJEYXRhKHJlc3VsdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMubWF0Y2hlcy5jb25jYXQocmVzdWx0cyk7XG4gICAgICAgICAgdGhpcy5sYXN0UGFnZSA9IHJlc3VsdHMgJiYgIXJlc3VsdHMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1hdGNoZXMubGVuZ3RoID4gMCAmJiB0aGlzLmF1dG9TZWxlY3RGaXJzdE9wdGlvbiAmJiAhdGhpcy5zZWxlY3RpbmdNYXRjaGVzKSB7XG4gICAgICAgICAgdGhpcy5uZXh0QWN0aXZlTWF0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vdmVybGF5LnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgdGhpcy5hZGRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9KTsgLy8gQGJraW1iYWxsOiBUaGlzIHdhcyBhZGRlZCBmb3IgRHlsYW4gU2NodWx0ZSwgOS4xOC4yMDE3IDQ6MTRQTSBFU1QsIHlvdSdyZSB3ZWxjb21lIVxuICAgICAgfSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5oYXNFcnJvciA9IHRoaXMudGVybSAmJiB0aGlzLnRlcm0ubGVuZ3RoICE9PSAwO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhc3RQYWdlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMudGVybSAmJiB0aGlzLnRlcm0ubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lbm9cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIHNlYXJjaCh0ZXJtLCBtb2RlPyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XG4gICAgcmV0dXJuIGZyb20oXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIG1hdGNoIGRhdGFcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBkYXRhXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSB0cnVlO1xuICAgICAgICAgICAgLy8gQXJyYXlzIGFyZSByZXR1cm5lZCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnN0cnVjdHVyZUFycmF5KG9wdGlvbnMpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvdWxkQ2FsbE9wdGlvbnNGdW5jdGlvbih0ZXJtKSkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgncmVqZWN0JykgJiYgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgncmVzb2x2ZScpKSB8fFxuICAgICAgICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3B0aW9ucykuaGFzT3duUHJvcGVydHkoJ3RoZW4nKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgLy8gUHJvbWlzZXMgKEVTNiBvciBEZWZlcnJlZCkgYXJlIHJlc29sdmVkIHdoZW5ldmVyIHRoZXkgcmVzb2x2ZVxuICAgICAgICAgICAgICBvcHRpb25zLnRoZW4odGhpcy5zdHJ1Y3R1cmVBcnJheS5iaW5kKHRoaXMpKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgLy8gUHJvbWlzZXMgKEVTNiBvciBEZWZlcnJlZCkgYXJlIHJlc29sdmVkIHdoZW5ldmVyIHRoZXkgcmVzb2x2ZVxuICAgICAgICAgICAgICBvcHRpb25zKHRlcm0sICsrdGhpcy5wYWdlKVxuICAgICAgICAgICAgICAgIC50aGVuKHRoaXMuc3RydWN0dXJlQXJyYXkuYmluZCh0aGlzKSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gQWxsIG90aGVyIGtpbmRzIG9mIGRhdGEgYXJlIHJlamVjdGVkXG4gICAgICAgICAgICAgIHJlamVjdCgnVGhlIGRhdGEgcHJvdmlkZWQgaXMgbm90IGFuIGFycmF5IG9yIGEgcHJvbWlzZScpO1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIHByb3ZpZGVkIGlzIG5vdCBhbiBhcnJheSBvciBhIHByb21pc2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmRlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gdGhpcy5jb25maWcuZGVmYXVsdE9wdGlvbnModGVybSwgKyt0aGlzLnBhZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoZGVmYXVsdE9wdGlvbnMpLmhhc093blByb3BlcnR5KCd0aGVuJykpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zLnRoZW4odGhpcy5zdHJ1Y3R1cmVBcnJheS5iaW5kKHRoaXMpKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5zdHJ1Y3R1cmVBcnJheShkZWZhdWx0T3B0aW9ucykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuc3RydWN0dXJlQXJyYXkodGhpcy5jb25maWcuZGVmYXVsdE9wdGlvbnMpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gTm8gc2VhcmNoIHRlcm0gZ2V0cyByZWplY3RlZFxuICAgICAgICAgICAgICByZWplY3QoJ05vIHNlYXJjaCB0ZXJtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE5vIGRhdGEgZ2V0cyByZWplY3RlZFxuICAgICAgICAgIHJlamVjdCgnZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHNob3VsZENhbGxPcHRpb25zRnVuY3Rpb24odGVybTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY29uZmlnICYmICdtaW5TZWFyY2hMZW5ndGgnIGluIHRoaXMuY29uZmlnICYmIE51bWJlci5pc0ludGVnZXIodGhpcy5jb25maWcubWluU2VhcmNoTGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0ZXJtID09PSAnc3RyaW5nJyAmJiB0ZXJtLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5taW5TZWFyY2hMZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAhISh0ZXJtICYmIHRlcm0ubGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGNvbGxlY3Rpb24gLSB0aGUgZGF0YSBvbmNlIGdldERhdGEgcmVzb2x2ZXMgaXRcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc3RydWN0dXJlcyBhbiBhcnJheSBvZiBub2RlcyBpbnRvIGFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBhXG4gICAqICduYW1lJyBmaWVsZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgc3RydWN0dXJlQXJyYXkoY29sbGVjdGlvbjogYW55KTogYW55IHtcbiAgICBjb25zdCBkYXRhQXJyYXkgPSBjb2xsZWN0aW9uLmRhdGEgPyBjb2xsZWN0aW9uLmRhdGEgOiBjb2xsZWN0aW9uO1xuICAgIGlmIChkYXRhQXJyYXkgJiYgKHR5cGVvZiBkYXRhQXJyYXlbMF0gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBkYXRhQXJyYXlbMF0gPT09ICdudW1iZXInKSkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IGl0ZW0sXG4gICAgICAgICAgbGFiZWw6IGl0ZW0sXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGFBcnJheS5tYXAoKGRhdGEpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuY29uZmlnLmZpZWxkID8gZGF0YVt0aGlzLmNvbmZpZy5maWVsZF0gOiBkYXRhLnZhbHVlIHx8IGRhdGE7XG4gICAgICBpZiAodGhpcy5jb25maWcudmFsdWVGb3JtYXQpIHtcbiAgICAgICAgdmFsdWUgPSBIZWxwZXJzLmludGVycG9sYXRlKHRoaXMuY29uZmlnLnZhbHVlRm9ybWF0LCBkYXRhKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5jb25maWcuZm9ybWF0ID8gSGVscGVycy5pbnRlcnBvbGF0ZSh0aGlzLmNvbmZpZy5mb3JtYXQsIGRhdGEpIDogZGF0YS5sYWJlbCB8fCBTdHJpbmcodmFsdWUpO1xuICAgICAgcmV0dXJuIHsgdmFsdWUsIGxhYmVsLCBkYXRhIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIG1hdGNoZXMgLSBDb2xsZWN0aW9uIG9mIG9iamVjdHM9XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGxvb3BzIHRocm91Z2ggdGhlIHBpY2tlciBvcHRpb25zIGFuZCBjcmVhdGVzIGEgZmlsdGVyZWQgbGlzdCBvZiBvYmplY3RzIHRoYXQgY29udGFpblxuICAgKiB0aGUgbmV3U2VhcmNoLlxuICAgKi9cbiAgZmlsdGVyRGF0YShtYXRjaGVzKTogQXJyYXk8YW55PiB7XG4gICAgaWYgKHRoaXMudGVybSAmJiBtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiB7XG4gICAgICAgIHJldHVybiB+U3RyaW5nKG1hdGNoLmxhYmVsKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy50ZXJtLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFNob3cgbm8gcmVjZW50IHJlc3VsdHMgdGVtcGxhdGVcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBwcmVzc2VzIHRoZSBlbnRlciBrZXkgdG8gY2FsbCB0aGUgc2VsZWN0TWF0Y2ggbWV0aG9kLlxuICAgKi9cbiAgc2VsZWN0QWN0aXZlTWF0Y2goKSB7XG4gICAgdGhpcy5zZWxlY3RNYXRjaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNldHMgYWN0aXZlTWF0Y2ggdG8gdGhlIG1hdGNoIGJlZm9yZSB0aGUgY3VycmVudCBub2RlLlxuICAgKi9cbiAgcHJldkFjdGl2ZU1hdGNoKCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tYXRjaGVzLmluZGV4T2YodGhpcy5hY3RpdmVNYXRjaCk7XG4gICAgdGhpcy5hY3RpdmVNYXRjaCA9IHRoaXMubWF0Y2hlc1tpbmRleCAtIDEgPCAwID8gdGhpcy5tYXRjaGVzLmxlbmd0aCAtIDEgOiBpbmRleCAtIDFdO1xuICAgIHRoaXMuc2Nyb2xsVG9BY3RpdmUoKTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzZXRzIGFjdGl2ZU1hdGNoIHRvIHRoZSBtYXRjaCBhZnRlciB0aGUgY3VycmVudCBub2RlLlxuICAgKi9cbiAgbmV4dEFjdGl2ZU1hdGNoKCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tYXRjaGVzLmluZGV4T2YodGhpcy5hY3RpdmVNYXRjaCk7XG4gICAgdGhpcy5hY3RpdmVNYXRjaCA9IHRoaXMubWF0Y2hlc1tpbmRleCArIDEgPiB0aGlzLm1hdGNoZXMubGVuZ3RoIC0gMSA/IDAgOiBpbmRleCArIDFdO1xuICAgIHRoaXMuc2Nyb2xsVG9BY3RpdmUoKTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldExpc3RFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGdldENoaWxkcmVuT2ZMaXN0RWxlbWVudCgpIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTtcbiAgICBpZiAodGhpcy5nZXRMaXN0RWxlbWVudCgpKSB7XG4gICAgICBjaGlsZHJlbiA9IHRoaXMuZ2V0TGlzdEVsZW1lbnQoKS5jaGlsZHJlbjtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgc2Nyb2xsVG9BY3RpdmUoKSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuZ2V0TGlzdEVsZW1lbnQoKTtcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuZ2V0Q2hpbGRyZW5PZkxpc3RFbGVtZW50KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1hdGNoZXMuaW5kZXhPZih0aGlzLmFjdGl2ZU1hdGNoKTtcbiAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBsaXN0LnNjcm9sbFRvcCA9IGl0ZW0ub2Zmc2V0VG9wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICovXG4gIHNlbGVjdEFjdGl2ZShtYXRjaCkge1xuICAgIHRoaXMuYWN0aXZlTWF0Y2ggPSBtYXRjaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICovXG4gIGlzQWN0aXZlKG1hdGNoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTWF0Y2ggPT09IG1hdGNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2VsZWN0TWF0Y2goZXZlbnQ/OiBhbnksIGl0ZW0/OiBhbnkpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuYWN0aXZlTWF0Y2g7XG4gICAgaWYgKHNlbGVjdGVkICYmIHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC52YWx1ZSA9IHNlbGVjdGVkO1xuICAgICAgdGhpcy5zZWxlY3RpbmdNYXRjaGVzID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnBhcmVudC5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICAgIHRoaXMucGFyZW50LmhpZGVSZXN1bHRzKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW5nTWF0Y2hlcyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gY2FwdHVyZXMgdGhlIHdob2xlIHF1ZXJ5IHN0cmluZyBhbmQgcmVwbGFjZSBpdCB3aXRoIHRoZSBzdHJpbmcgdGhhdCB3aWxsIGJlIHVzZWQgdG9cbiAgICogbWF0Y2guXG4gICAqL1xuICBlc2NhcGVSZWdleHAocXVlcnlUb0VzY2FwZSkge1xuICAgIC8vIEV4OiBpZiB0aGUgY2FwdHVyZSBpcyBcImFcIiB0aGUgcmVzdWx0IHdpbGwgYmUgXFxhXG4gICAgcmV0dXJuIHF1ZXJ5VG9Fc2NhcGUucmVwbGFjZSgvKFsuPyorXiRbXFxdXFxcXCgpe318LV0pL2csICdcXFxcJDEnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgaGlnaGxpZ2h0IHBpcGVcbiAgICovXG4gIGhpZ2hsaWdodChtYXRjaCwgcXVlcnkpIHtcbiAgICAvLyBSZXBsYWNlcyB0aGUgY2FwdHVyZSBzdHJpbmcgd2l0aCBhIHRoZSBzYW1lIHN0cmluZyBpbnNpZGUgb2YgYSBcInN0cm9uZ1wiIHRhZ1xuICAgIHJldHVybiBxdWVyeSA/IG1hdGNoLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLmVzY2FwZVJlZ2V4cChxdWVyeS50cmltKCkpLCAnZ2knKSwgJzxzdHJvbmc+JCY8L3N0cm9uZz4nKSA6IG1hdGNoO1xuICB9XG5cbiAgcHJlc2VsZWN0ZWQobWF0Y2gpIHtcbiAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkO1xuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5zZWxlY3RlZCkge1xuICAgICAgc2VsZWN0ZWQgPSBbLi4udGhpcy5zZWxlY3RlZCwgLi4udGhpcy5jb25maWcuc2VsZWN0ZWRdO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcucHJlc2VsZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHByZXNlbGVjdGVkRnVuYzogRnVuY3Rpb24gPSB0aGlzLmNvbmZpZy5wcmVzZWxlY3RlZDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHNlbGVjdGVkLmZpbmRJbmRleCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJldHVybiBwcmVzZWxlY3RlZEZ1bmMobWF0Y2gsIGl0ZW0pO1xuICAgICAgICB9KSAhPT0gLTFcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBzZWxlY3RlZC5maW5kSW5kZXgoKGl0ZW0pID0+IHtcbiAgICAgICAgbGV0IGlzUHJlc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS52YWx1ZSAmJiBtYXRjaCAmJiBtYXRjaC52YWx1ZSkge1xuICAgICAgICAgIGlmIChpdGVtLnZhbHVlLmlkICYmIG1hdGNoLnZhbHVlLmlkKSB7XG4gICAgICAgICAgICBpc1ByZXNlbGVjdGVkID0gaXRlbS52YWx1ZS5pZCA9PT0gbWF0Y2gudmFsdWUuaWQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0ICYmIGl0ZW0udmFsdWUuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGlzUHJlc2VsZWN0ZWQgPSBpdGVtLnZhbHVlLnZhbHVlID09PSBtYXRjaC52YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNQcmVzZWxlY3RlZCA9IGl0ZW0udmFsdWUgPT09IG1hdGNoLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNQcmVzZWxlY3RlZDtcbiAgICAgIH0pICE9PSAtMVxuICAgICk7XG4gIH1cbn1cbiJdfQ==