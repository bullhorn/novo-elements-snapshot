import { ChangeDetectorRef, Directive, ElementRef, Input } from '@angular/core';
// Vendor
import { from } from 'rxjs';
// APP
import { Helpers } from '../../../../utils/Helpers';
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
        this.element = element;
        this.ref = ref;
        this.scrollHandler = this.onScrollDown.bind(this);
    }
    set matches(m) {
        this._matches = m;
    }
    get matches() {
        return this._matches;
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
     * @description This function should return a <strong>-tag wrapped HTML string.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvcGlja2VyL2V4dHJhcy9iYXNlLXBpY2tlci1yZXN1bHRzL0Jhc2VQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixTQUFTO0FBQ1QsT0FBTyxFQUFFLElBQUksRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN4QyxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR3BEOzs7R0FHRztBQUVILE1BQU0sT0FBTyxpQkFBaUI7SUE2QjVCLFlBQVksT0FBbUIsRUFBRSxHQUFzQjtRQTVCdkQsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixhQUFRLEdBQWUsRUFBRSxDQUFDO1FBQzFCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBTXpCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQiwwQkFBcUIsR0FBWSxJQUFJLENBQUM7UUFFdEMsOEJBQXlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUUxQyxhQUFRLEdBQWUsRUFBRSxDQUFDO1FBWXhCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENB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YUFBYSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNWLENBQUM7SUFDSixDQUFDOzs7WUF2WEYsU0FBUzs7O1lBWDZCLFVBQVU7WUFBeEMsaUJBQWlCOzs7c0JBZ0N2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuLy8gQVBQXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvQ29udHJvbENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2Zvcm0vY29udHJvbHMvQmFzZUNvbnRyb2wnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGlzIHRoZSBhY3R1YWwgbGlzdCBvZiBtYXRjaGVzIHRoYXQgZ2V0cyBpbmplY3RlZCBpbnRvIHRoZSBET00uIEl0J3MgYWxzbyB0aGUgcGllY2UgdGhhdCBjYW4gYmVcbiAqIG92ZXJ3cml0dGVuIGlmIGN1c3RvbSBsaXN0IG9wdGlvbnMgYXJlIG5lZWRlZC5cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQmFzZVBpY2tlclJlc3VsdHMge1xuICBfdGVybTogc3RyaW5nID0gJyc7XG4gIHNlbGVjdGVkOiBBcnJheTxhbnk+ID0gW107XG4gIGhhc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIGlzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1N0YXRpYzogYm9vbGVhbiA9IHRydWU7XG4gIF9jb25maWc6IE5vdm9Db250cm9sQ29uZmlnWydjb25maWcnXTtcbiAgYWN0aXZlTWF0Y2g6IGFueTtcbiAgcGFyZW50OiBhbnk7XG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG4gIHBhZ2U6IG51bWJlciA9IDA7XG4gIGxhc3RQYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIGF1dG9TZWxlY3RGaXJzdE9wdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gIG92ZXJsYXk6IE92ZXJsYXlSZWY7XG4gIG9wdGlvbnNGdW5jdGlvbkhhc0NoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzZWxlY3RpbmdNYXRjaGVzOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2Nyb2xsSGFuZGxlcjogYW55O1xuICBfbWF0Y2hlczogQXJyYXk8YW55PiA9IFtdO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBtYXRjaGVzKG06IEFycmF5PGFueT4pIHtcbiAgICB0aGlzLl9tYXRjaGVzID0gbTtcbiAgfVxuXG4gIGdldCBtYXRjaGVzKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXRjaGVzO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5yZWYgPSByZWY7XG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gdGhpcy5vblNjcm9sbERvd24uYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNsZWFuVXAoKTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudDogRWxlbWVudCA9IHRoaXMuZ2V0TGlzdEVsZW1lbnQoKTtcbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnc2Nyb2xsTGlzdGVuZXInKSkge1xuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3Njcm9sbExpc3RlbmVyJyk7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgb25TY3JvbGxEb3duKGV2ZW50OiBXaGVlbEV2ZW50KSB7XG4gICAgY29uc3QgZWxlbWVudDogYW55ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBlbGVtZW50Lm9mZnNldEhlaWdodCArIGVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgY29uc3QgYm90dG9tID0gZWxlbWVudC5zY3JvbGxIZWlnaHQgLSAzMDA7XG4gICAgICBpZiAob2Zmc2V0ID49IGJvdHRvbSkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKCF0aGlzLmxhc3RQYWdlICYmICF0aGlzLmlzTG9hZGluZykge1xuICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRlcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlcm07XG4gIH1cblxuICBzZXQgdGVybSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnNob3VsZFNlYXJjaCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX3Rlcm0gPSB2YWx1ZTtcbiAgICAgIHRoaXMucGFnZSA9IDA7XG4gICAgICB0aGlzLm9wdGlvbnNGdW5jdGlvbkhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgdGhpcy5wcm9jZXNzU2VhcmNoKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0IGNvbmZpZyh2YWx1ZTogTm92b0NvbnRyb2xDb25maWdbJ2NvbmZpZyddKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLm9wdGlvbnMgIT09IHZhbHVlLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9uc0Z1bmN0aW9uSGFzQ2hhbmdlZCA9IHRydWU7IC8vIHJlc2V0IHBhZ2Ugc28gdGhhdCBuZXcgb3B0aW9ucyBjYWxsIGlzIHVzZWQgdG8gc2VhcmNoXG4gICAgfVxuICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGNvbmZpZygpOiBOb3ZvQ29udHJvbENvbmZpZ1snY29uZmlnJ10ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBzaG91bGRTZWFyY2godmFsdWU6IHVua25vd24pOiBib29sZWFuIHtcbiAgICBjb25zdCB0ZXJtSGFzQ2hhbmdlZCA9IHZhbHVlICE9PSB0aGlzLl90ZXJtO1xuICAgIGNvbnN0IG9wdGlvbnNOb3RZZXRDYWxsZWQgPSB0aGlzLnBhZ2UgPT09IDA7XG5cbiAgICByZXR1cm4gdGVybUhhc0NoYW5nZWQgfHwgb3B0aW9uc05vdFlldENhbGxlZCB8fCB0aGlzLm9wdGlvbnNGdW5jdGlvbkhhc0NoYW5nZWQ7XG4gIH1cblxuICBhZGRTY3JvbGxMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlSW5maW5pdGVTY3JvbGwpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdldExpc3RFbGVtZW50KCk7XG4gICAgICBpZiAoZWxlbWVudCAmJiAhZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3Njcm9sbExpc3RlbmVyJykpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3Njcm9sbExpc3RlbmVyJywgJ3RydWUnKTtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NTZWFyY2goc2hvdWxkUmVzZXQ/OiBib29sZWFuKSB7XG4gICAgdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLnNlYXJjaCh0aGlzLnRlcm0pLnN1YnNjcmliZShcbiAgICAgIChyZXN1bHRzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHNob3VsZFJlc2V0KSB7XG4gICAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0aWMpIHtcbiAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlckRhdGEocmVzdWx0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5tYXRjaGVzLmNvbmNhdChyZXN1bHRzKTtcbiAgICAgICAgICB0aGlzLmxhc3RQYWdlID0gcmVzdWx0cyAmJiAhcmVzdWx0cy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWF0Y2hlcy5sZW5ndGggPiAwICYmIHRoaXMuYXV0b1NlbGVjdEZpcnN0T3B0aW9uICYmICF0aGlzLnNlbGVjdGluZ01hdGNoZXMpIHtcbiAgICAgICAgICB0aGlzLm5leHRBY3RpdmVNYXRjaCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLm92ZXJsYXkudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgICB0aGlzLmFkZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH0pOyAvLyBAYmtpbWJhbGw6IFRoaXMgd2FzIGFkZGVkIGZvciBEeWxhbiBTY2h1bHRlLCA5LjE4LjIwMTcgNDoxNFBNIEVTVCwgeW91J3JlIHdlbGNvbWUhXG4gICAgICB9LFxuICAgICAgKGVycikgPT4ge1xuICAgICAgICB0aGlzLmhhc0Vycm9yID0gdGhpcy50ZXJtICYmIHRoaXMudGVybS5sZW5ndGggIT09IDA7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGFzdFBhZ2UgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy50ZXJtICYmIHRoaXMudGVybS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVub1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgc2VhcmNoKHRlcm0sIG1vZGU/KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jb25maWcub3B0aW9ucztcbiAgICByZXR1cm4gZnJvbShcbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgbWF0Y2ggZGF0YVxuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgIC8vIFJlc29sdmUgdGhlIGRhdGFcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICAgICAgdGhpcy5pc1N0YXRpYyA9IHRydWU7XG4gICAgICAgICAgICAvLyBBcnJheXMgYXJlIHJldHVybmVkIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMuc3RydWN0dXJlQXJyYXkob3B0aW9ucykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaG91bGRDYWxsT3B0aW9uc0Z1bmN0aW9uKHRlcm0pKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChvcHRpb25zLmhhc093blByb3BlcnR5KCdyZWplY3QnKSAmJiBvcHRpb25zLmhhc093blByb3BlcnR5KCdyZXNvbHZlJykpIHx8XG4gICAgICAgICAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcHRpb25zKS5oYXNPd25Qcm9wZXJ0eSgndGhlbicpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAvLyBQcm9taXNlcyAoRVM2IG9yIERlZmVycmVkKSBhcmUgcmVzb2x2ZWQgd2hlbmV2ZXIgdGhleSByZXNvbHZlXG4gICAgICAgICAgICAgIG9wdGlvbnMudGhlbih0aGlzLnN0cnVjdHVyZUFycmF5LmJpbmQodGhpcykpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAvLyBQcm9taXNlcyAoRVM2IG9yIERlZmVycmVkKSBhcmUgcmVzb2x2ZWQgd2hlbmV2ZXIgdGhleSByZXNvbHZlXG4gICAgICAgICAgICAgIG9wdGlvbnModGVybSwgKyt0aGlzLnBhZ2UpXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5zdHJ1Y3R1cmVBcnJheS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBBbGwgb3RoZXIga2luZHMgb2YgZGF0YSBhcmUgcmVqZWN0ZWRcbiAgICAgICAgICAgICAgcmVqZWN0KCdUaGUgZGF0YSBwcm92aWRlZCBpcyBub3QgYW4gYXJyYXkgb3IgYSBwcm9taXNlJyk7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgcHJvdmlkZWQgaXMgbm90IGFuIGFycmF5IG9yIGEgcHJvbWlzZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmRlZmF1bHRPcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB0aGlzLmNvbmZpZy5kZWZhdWx0T3B0aW9ucyh0ZXJtLCArK3RoaXMucGFnZSk7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihkZWZhdWx0T3B0aW9ucykuaGFzT3duUHJvcGVydHkoJ3RoZW4nKSkge1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMudGhlbih0aGlzLnN0cnVjdHVyZUFycmF5LmJpbmQodGhpcykpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnN0cnVjdHVyZUFycmF5KGRlZmF1bHRPcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5zdHJ1Y3R1cmVBcnJheSh0aGlzLmNvbmZpZy5kZWZhdWx0T3B0aW9ucykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBObyBzZWFyY2ggdGVybSBnZXRzIHJlamVjdGVkXG4gICAgICAgICAgICAgIHJlamVjdCgnTm8gc2VhcmNoIHRlcm0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTm8gZGF0YSBnZXRzIHJlamVjdGVkXG4gICAgICAgICAgcmVqZWN0KCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgc2hvdWxkQ2FsbE9wdGlvbnNGdW5jdGlvbih0ZXJtOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jb25maWcgJiYgJ21pblNlYXJjaExlbmd0aCcgaW4gdGhpcy5jb25maWcgJiYgTnVtYmVyLmlzSW50ZWdlcih0aGlzLmNvbmZpZy5taW5TZWFyY2hMZW5ndGgpKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRlcm0gPT09ICdzdHJpbmcnICYmIHRlcm0ubGVuZ3RoID49IHRoaXMuY29uZmlnLm1pblNlYXJjaExlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICEhKHRlcm0gJiYgdGVybS5sZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gY29sbGVjdGlvbiAtIHRoZSBkYXRhIG9uY2UgZ2V0RGF0YSByZXNvbHZlcyBpdFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzdHJ1Y3R1cmVzIGFuIGFycmF5IG9mIG5vZGVzIGludG8gYW4gYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIGFcbiAgICogJ25hbWUnIGZpZWxkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzdHJ1Y3R1cmVBcnJheShjb2xsZWN0aW9uOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGRhdGFBcnJheSA9IGNvbGxlY3Rpb24uZGF0YSA/IGNvbGxlY3Rpb24uZGF0YSA6IGNvbGxlY3Rpb247XG4gICAgaWYgKGRhdGFBcnJheSAmJiAodHlwZW9mIGRhdGFBcnJheVswXSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGRhdGFBcnJheVswXSA9PT0gJ251bWJlcicpKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbi5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogaXRlbSxcbiAgICAgICAgICBsYWJlbDogaXRlbSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YUFycmF5Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy5jb25maWcuZmllbGQgPyBkYXRhW3RoaXMuY29uZmlnLmZpZWxkXSA6IGRhdGEudmFsdWUgfHwgZGF0YTtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy52YWx1ZUZvcm1hdCkge1xuICAgICAgICB2YWx1ZSA9IEhlbHBlcnMuaW50ZXJwb2xhdGUodGhpcy5jb25maWcudmFsdWVGb3JtYXQsIGRhdGEpO1xuICAgICAgfVxuICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmNvbmZpZy5mb3JtYXQgPyBIZWxwZXJzLmludGVycG9sYXRlKHRoaXMuY29uZmlnLmZvcm1hdCwgZGF0YSkgOiBkYXRhLmxhYmVsIHx8IFN0cmluZyh2YWx1ZSk7XG4gICAgICByZXR1cm4geyB2YWx1ZSwgbGFiZWwsIGRhdGEgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gbWF0Y2hlcyAtIENvbGxlY3Rpb24gb2Ygb2JqZWN0cz1cbiAgICpcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gbG9vcHMgdGhyb3VnaCB0aGUgcGlja2VyIG9wdGlvbnMgYW5kIGNyZWF0ZXMgYSBmaWx0ZXJlZCBsaXN0IG9mIG9iamVjdHMgdGhhdCBjb250YWluXG4gICAqIHRoZSBuZXdTZWFyY2guXG4gICAqL1xuICBmaWx0ZXJEYXRhKG1hdGNoZXMpOiBBcnJheTxhbnk+IHtcbiAgICBpZiAodGhpcy50ZXJtICYmIG1hdGNoZXMpIHtcbiAgICAgIHJldHVybiBtYXRjaGVzLmZpbHRlcigobWF0Y2gpID0+IHtcbiAgICAgICAgcmV0dXJuIH5TdHJpbmcobWF0Y2gubGFiZWwpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnRlcm0udG9Mb3dlckNhc2UoKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gU2hvdyBubyByZWNlbnQgcmVzdWx0cyB0ZW1wbGF0ZVxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgdGhlIGVudGVyIGtleSB0byBjYWxsIHRoZSBzZWxlY3RNYXRjaCBtZXRob2QuXG4gICAqL1xuICBzZWxlY3RBY3RpdmVNYXRjaCgpIHtcbiAgICB0aGlzLnNlbGVjdE1hdGNoKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2V0cyBhY3RpdmVNYXRjaCB0byB0aGUgbWF0Y2ggYmVmb3JlIHRoZSBjdXJyZW50IG5vZGUuXG4gICAqL1xuICBwcmV2QWN0aXZlTWF0Y2goKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1hdGNoZXMuaW5kZXhPZih0aGlzLmFjdGl2ZU1hdGNoKTtcbiAgICB0aGlzLmFjdGl2ZU1hdGNoID0gdGhpcy5tYXRjaGVzW2luZGV4IC0gMSA8IDAgPyB0aGlzLm1hdGNoZXMubGVuZ3RoIC0gMSA6IGluZGV4IC0gMV07XG4gICAgdGhpcy5zY3JvbGxUb0FjdGl2ZSgpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNldHMgYWN0aXZlTWF0Y2ggdG8gdGhlIG1hdGNoIGFmdGVyIHRoZSBjdXJyZW50IG5vZGUuXG4gICAqL1xuICBuZXh0QWN0aXZlTWF0Y2goKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1hdGNoZXMuaW5kZXhPZih0aGlzLmFjdGl2ZU1hdGNoKTtcbiAgICB0aGlzLmFjdGl2ZU1hdGNoID0gdGhpcy5tYXRjaGVzW2luZGV4ICsgMSA+IHRoaXMubWF0Y2hlcy5sZW5ndGggLSAxID8gMCA6IGluZGV4ICsgMV07XG4gICAgdGhpcy5zY3JvbGxUb0FjdGl2ZSgpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0TGlzdEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgZ2V0Q2hpbGRyZW5PZkxpc3RFbGVtZW50KCkge1xuICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuICAgIGlmICh0aGlzLmdldExpc3RFbGVtZW50KCkpIHtcbiAgICAgIGNoaWxkcmVuID0gdGhpcy5nZXRMaXN0RWxlbWVudCgpLmNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICBzY3JvbGxUb0FjdGl2ZSgpIHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5nZXRMaXN0RWxlbWVudCgpO1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRDaGlsZHJlbk9mTGlzdEVsZW1lbnQoKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMubWF0Y2hlcy5pbmRleE9mKHRoaXMuYWN0aXZlTWF0Y2gpO1xuICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbS5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2VsZWN0QWN0aXZlKG1hdGNoKSB7XG4gICAgdGhpcy5hY3RpdmVNYXRjaCA9IG1hdGNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKi9cbiAgaXNBY3RpdmUobWF0Y2gpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVNYXRjaCA9PT0gbWF0Y2g7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZWxlY3RNYXRjaChldmVudD86IGFueSwgaXRlbT86IGFueSkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5hY3RpdmVNYXRjaDtcbiAgICBpZiAoc2VsZWN0ZWQgJiYgdGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50LnZhbHVlID0gc2VsZWN0ZWQ7XG4gICAgICB0aGlzLnNlbGVjdGluZ01hdGNoZXMgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMucGFyZW50LmNsb3NlT25TZWxlY3QpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuaGlkZVJlc3VsdHMoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RpbmdNYXRjaGVzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBjYXB0dXJlcyB0aGUgd2hvbGUgcXVlcnkgc3RyaW5nIGFuZCByZXBsYWNlIGl0IHdpdGggdGhlIHN0cmluZyB0aGF0IHdpbGwgYmUgdXNlZCB0b1xuICAgKiBtYXRjaC5cbiAgICovXG4gIGVzY2FwZVJlZ2V4cChxdWVyeVRvRXNjYXBlKSB7XG4gICAgLy8gRXg6IGlmIHRoZSBjYXB0dXJlIGlzIFwiYVwiIHRoZSByZXN1bHQgd2lsbCBiZSBcXGFcbiAgICByZXR1cm4gcXVlcnlUb0VzY2FwZS5yZXBsYWNlKC8oWy4/KiteJFtcXF1cXFxcKCl7fXwtXSkvZywgJ1xcXFwkMScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSA8c3Ryb25nPi10YWcgd3JhcHBlZCBIVE1MIHN0cmluZy5cbiAgICovXG4gIGhpZ2hsaWdodChtYXRjaCwgcXVlcnkpIHtcbiAgICAvLyBSZXBsYWNlcyB0aGUgY2FwdHVyZSBzdHJpbmcgd2l0aCBhIHRoZSBzYW1lIHN0cmluZyBpbnNpZGUgb2YgYSBcInN0cm9uZ1wiIHRhZ1xuICAgIHJldHVybiBxdWVyeSA/IG1hdGNoLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLmVzY2FwZVJlZ2V4cChxdWVyeS50cmltKCkpLCAnZ2knKSwgJzxzdHJvbmc+JCY8L3N0cm9uZz4nKSA6IG1hdGNoO1xuICB9XG5cbiAgcHJlc2VsZWN0ZWQobWF0Y2gpIHtcbiAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkO1xuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5zZWxlY3RlZCkge1xuICAgICAgc2VsZWN0ZWQgPSBbLi4udGhpcy5zZWxlY3RlZCwgLi4udGhpcy5jb25maWcuc2VsZWN0ZWRdO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcucHJlc2VsZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHByZXNlbGVjdGVkRnVuYzogRnVuY3Rpb24gPSB0aGlzLmNvbmZpZy5wcmVzZWxlY3RlZDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHNlbGVjdGVkLmZpbmRJbmRleCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJldHVybiBwcmVzZWxlY3RlZEZ1bmMobWF0Y2gsIGl0ZW0pO1xuICAgICAgICB9KSAhPT0gLTFcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBzZWxlY3RlZC5maW5kSW5kZXgoKGl0ZW0pID0+IHtcbiAgICAgICAgbGV0IGlzUHJlc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS52YWx1ZSAmJiBtYXRjaCAmJiBtYXRjaC52YWx1ZSkge1xuICAgICAgICAgIGlmIChpdGVtLnZhbHVlLmlkICYmIG1hdGNoLnZhbHVlLmlkKSB7XG4gICAgICAgICAgICBpc1ByZXNlbGVjdGVkID0gaXRlbS52YWx1ZS5pZCA9PT0gbWF0Y2gudmFsdWUuaWQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0ICYmIGl0ZW0udmFsdWUuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGlzUHJlc2VsZWN0ZWQgPSBpdGVtLnZhbHVlLnZhbHVlID09PSBtYXRjaC52YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNQcmVzZWxlY3RlZCA9IGl0ZW0udmFsdWUgPT09IG1hdGNoLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNQcmVzZWxlY3RlZDtcbiAgICAgIH0pICE9PSAtMVxuICAgICk7XG4gIH1cbn1cbiJdfQ==