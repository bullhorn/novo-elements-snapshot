import * as i0 from '@angular/core';
import { Directive, Input, Component, HostBinding, EventEmitter, Output, ViewChild, forwardRef, ViewContainerRef, NgModule } from '@angular/core';
import { Helpers, notify } from 'novo-elements/utils';
import { from, fromEvent } from 'rxjs';
import * as i1 from 'novo-elements/services';
import * as i3 from 'novo-elements/components/loading';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i6 from 'novo-elements/common';
import { NovoCommonModule } from 'novo-elements/common';
import * as i1$1 from '@angular/platform-browser';
import * as i2 from 'novo-elements/components/list';
import { NovoListModule } from 'novo-elements/components/list';
import * as i6$1 from 'novo-elements/pipes';
import { NovoPipesModule } from 'novo-elements/pipes';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as i3$1 from 'novo-elements/components/switch';
import { NovoSwitchModule } from 'novo-elements/components/switch';
import * as i6$2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i4$1 from 'novo-elements/common/overlay';
import { NovoOverlayTemplateComponent, NovoOverlayModule } from 'novo-elements/common/overlay';
import * as i2$1 from 'novo-elements/components/field';
import { NovoFieldModule } from 'novo-elements/components/field';
import * as i3$2 from 'novo-elements/components/icon';
import { NovoIconModule } from 'novo-elements/components/icon';

/**
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
class BasePickerResults {
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
BasePickerResults.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: BasePickerResults, inputs: { matches: "matches" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BasePickerResults, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { matches: [{
                type: Input
            }] } });

// NG2
/**
 * @description This is the actual list of matches that gets injected into the DOM.
 */
class ChecklistPickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.labels = labels;
    }
    search() {
        const options = this.config.options;
        // only set this the first time
        return from(new Promise((resolve, reject) => {
            // Check if there is match data
            if (options) {
                // Resolve the data
                if (Array.isArray(options)) {
                    this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(options);
                }
                else {
                    // All other kinds of data are rejected
                    reject('The data provided is not an array or a promise');
                    throw new Error('The data provided is not an array or a promise');
                }
            }
            else {
                // No data gets rejected
                reject('error');
            }
        }));
    }
    /**
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches) {
        if (this.term && matches) {
            this.filteredMatches = matches.map((section) => {
                const items = section.originalData.filter((match) => {
                    return ~String(match.label).toLowerCase().indexOf(this.term.toLowerCase());
                });
                section.data = items;
                return section;
            }, this);
            return this.filteredMatches;
        }
        else if (this.term === '') {
            matches.forEach((section) => {
                section.data = section.originalData;
            });
            return matches;
        }
        // Show no recent results template
        return matches;
    }
    selectMatch(event, item) {
        Helpers.swallowEvent(event);
        if (item.indeterminate) {
            item.indeterminate = false;
            item.checked = true;
        }
        else {
            item.checked = !item.checked;
        }
        const selected = this.activeMatch;
        if (selected) {
            this.parent.value = selected;
        }
        this.ref.markForCheck();
        return false;
    }
}
ChecklistPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ChecklistPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ChecklistPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ChecklistPickerResults, selector: "checklist-picker-results", host: { classAttribute: "active picker-results" }, usesInheritance: true, ngImport: i0, template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <ul *ngIf="matches.length > 0">
      <span *ngFor="let section of matches; let i = index">
        <li class="header caption" *ngIf="section.data.length > 0">{{ section.label || section.type }}</li>
        <li
          *ngFor="let match of section.data; let i = index"
          [ngClass]="{ checked: match.checked }"
          (click)="selectMatch($event, match)"
          [class.active]="match === activeMatch"
          (mouseenter)="selectActive(match)"
        >
          <label>
            <i
              [ngClass]="{
                'bhi-checkbox-empty': !match.checked,
                'bhi-checkbox-filled': match.checked,
                'bhi-checkbox-indeterminate': match.indeterminate
              }"
            ></i>
            {{ match.label }}
          </label>
        </li>
      </span>
    </ul>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="!isLoading && !matches.length && !hasError && term !== ''">{{ labels.pickerEmpty }}</p>
  `, isInline: true, components: [{ type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ChecklistPickerResults, decorators: [{
            type: Component,
            args: [{
                    selector: 'checklist-picker-results',
                    host: {
                        class: 'active picker-results',
                    },
                    template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <ul *ngIf="matches.length > 0">
      <span *ngFor="let section of matches; let i = index">
        <li class="header caption" *ngIf="section.data.length > 0">{{ section.label || section.type }}</li>
        <li
          *ngFor="let match of section.data; let i = index"
          [ngClass]="{ checked: match.checked }"
          (click)="selectMatch($event, match)"
          [class.active]="match === activeMatch"
          (mouseenter)="selectActive(match)"
        >
          <label>
            <i
              [ngClass]="{
                'bhi-checkbox-empty': !match.checked,
                'bhi-checkbox-filled': match.checked,
                'bhi-checkbox-indeterminate': match.indeterminate
              }"
            ></i>
            {{ match.label }}
          </label>
        </li>
      </span>
    </ul>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="!isLoading && !matches.length && !hasError && term !== ''">{{ labels.pickerEmpty }}</p>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; } });

// NG2
class DistributionListPickerResults extends BasePickerResults {
    constructor(element, sanitizer, labels, ref) {
        super(element, ref);
        this.sanitizer = sanitizer;
        this.labels = labels;
        this.active = true;
        this.sanitizer = sanitizer;
    }
    get isHidden() {
        return this.matches.length === 0;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    sanitizeHTML(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
DistributionListPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DistributionListPickerResults, deps: [{ token: i0.ElementRef }, { token: i1$1.DomSanitizer }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
DistributionListPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: DistributionListPickerResults, selector: "distribution-list-picker-results", host: { properties: { "class.active": "this.active", "hidden": "this.isHidden" } }, usesInheritance: true, ngImport: i0, template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match.label)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.distributionListOwner }}: </span><span>{{ match?.data?.owner?.name }}</span>
          </p>
          <p>
            <span class="label">{{ labels.dateAdded }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.dateAdded, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { type: i2.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DistributionListPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'distribution-list-picker-results', template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match.label)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.distributionListOwner }}: </span><span>{{ match?.data?.owner?.name }}</span>
          </p>
          <p>
            <span class="label">{{ labels.dateAdded }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.dateAdded, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1$1.DomSanitizer }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { active: [{
                type: HostBinding,
                args: ['class.active']
            }], isHidden: [{
                type: HostBinding,
                args: ['hidden']
            }] } });

class EntityPickerResult {
    constructor(labels) {
        this.labels = labels;
        this.select = new EventEmitter();
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
        return query && match ? match.replace(new RegExp(this.escapeRegexp(query.trim()), 'gi'), '<strong>$&</strong>') : match;
    }
    getIconForResult(result) {
        if (result) {
            switch (result.searchEntity) {
                case 'ClientContact':
                    return 'person contact';
                case 'ClientCorporation':
                    return 'company';
                case 'Opportunity':
                    return 'opportunity';
                case 'Candidate':
                    return 'candidate';
                case 'Lead':
                    return 'lead';
                case 'JobOrder':
                    return 'job';
                case 'Placement':
                    return 'star placement';
                case 'CorporateUser':
                    return 'user';
                case 'CorporationDepartment':
                    return 'department';
                case 'JobShift':
                    return 'timetable contract';
                default:
                    return '';
            }
        }
        return '';
    }
    renderTimestamp(date) {
        let timestamp = '';
        if (date) {
            timestamp = this.labels.formatDateWithFormat(date, { year: 'numeric', month: 'numeric', day: 'numeric' });
        }
        return timestamp;
    }
    renderTime(dateStr) {
        let timestamp = '';
        if (dateStr) {
            timestamp = this.labels.formatTime(new Date(dateStr));
        }
        return timestamp;
    }
    renderTimeNoOffset(dateStr) {
        let timestamp = '';
        if (dateStr) {
            dateStr = dateStr.slice(0, 19);
            timestamp = this.labels.formatTime(dateStr);
        }
        return timestamp;
    }
    getNameForResult(result) {
        var _a, _b, _c;
        if (result) {
            switch (result.searchEntity) {
                case 'Lead':
                case 'CorporateUser':
                case 'ClientContact':
                case 'Candidate':
                case 'Person':
                    if ('firstName' in result) {
                        return `${result.firstName} ${result.lastName}`.trim();
                    }
                    return `${result.name || ''}`.trim();
                case 'ClientCorporation':
                    return `${result.name || ''}`.trim();
                case 'Opportunity':
                case 'JobOrder':
                case 'BillingProfile':
                case 'InvoiceTerm':
                    return `${result.id} | ${result.title || ''}`.trim();
                case 'Placement':
                    let label = `${result.id}`;
                    if (result.candidate || result.jobOrder) {
                        if (result.candidate && result.jobOrder) {
                            label = `${label} | ${result.candidate.firstName} ${result.candidate.lastName} - ${result.jobOrder.title}`.trim();
                        }
                        else if (result.jobOrder) {
                            label = `${label} | ${result.jobOrder.title}`.trim();
                        }
                        else {
                            label = `${label} | ${result.candidate.firstName} ${result.candidate.lastName}`.trim();
                        }
                    }
                    return label;
                case 'JobShift':
                    return `${(_a = result.jobOrder) === null || _a === void 0 ? void 0 : _a.title} @ ${((_c = (_b = result.jobOrder) === null || _b === void 0 ? void 0 : _b.clientCorporation) === null || _c === void 0 ? void 0 : _c.name) || ''}`.trim();
                default:
                    return `${result.name || result.label || ''}`.trim();
            }
        }
        return '';
    }
}
EntityPickerResult.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EntityPickerResult, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
EntityPickerResult.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: EntityPickerResult, selector: "entity-picker-result", inputs: { match: "match", term: "term" }, outputs: { select: "select" }, ngImport: i0, template: `
    <novo-list-item *ngIf="match.data" (click)="select.next(match.data)">
      <novo-item-header>
        <novo-item-avatar [icon]="getIconForResult(match.data)"></novo-item-avatar>
        <novo-item-title> <span [innerHtml]="getNameForResult(match.data) | highlight: term"></span> </novo-item-title>
      </novo-item-header>
      <novo-item-content direction="horizontal">
        <!-- COMPANY 1 -->
        <novo-text smaller class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
          <i class="bhi-company company"></i>
          <span [innerHtml]="match.data.companyName || match.data?.clientCorporation?.name | highlight: term"></span>
        </novo-text>
        <!-- CLIENT CONTACT -->
        <novo-text smaller class="contact" *ngIf="match.data?.clientContact?.firstName">
          <i class="bhi-person contact person"></i>
          <span [innerHtml]="match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName | highlight: term"></span>
        </novo-text>
        <!-- CANDIDATE -->
        <novo-text smaller class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
          <i class="bhi-candidate candidate"></i>
          <span [innerHtml]="match.data.candidate.firstName + ' ' + match.data.candidate.lastName | highlight: term"></span>
        </novo-text>
        <!-- START & END DATE -->
        <novo-text smaller class="start-date" *ngIf="match.data.dateBegin && match.data.searchEntity === 'Placement'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)"></span>
        </novo-text>
        <!-- START Date -->
        <novo-text smaller class="start-date" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.startTime)"></span>
        </novo-text>
        <!-- START & END TIME -->
        <novo-text smaller class="start-time" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-clock"></i>
          <span [innerHtml]="renderTimeNoOffset(match.data.startTime) + ' - ' + renderTimeNoOffset(match.data.endTime)"></span>
        </novo-text>
        <!-- JOBORDER -->
        <novo-text smaller class="job" *ngIf="match.data.jobOrder && match.data.searchEntity === 'JobShift'">
          <i class="bhi-job job"></i>
          <span [innerHtml]="match.data.jobOrder.title | highlight: term"></span>
        </novo-text>
        <!-- OPENINGS -->
        <novo-text smaller class="openings" *ngIf="match.data.openings && match.data.searchEntity === 'JobShift'">
          <i class="bhi-candidate"></i>
          <span>{{ match.data.numAssigned }} / {{ match.data.openings }}</span>
        </novo-text>
        <!-- EMAIL -->
        <novo-text smaller class="email" *ngIf="match.data.email">
          <i class="bhi-email"></i> <span [innerHtml]="match.data.email | highlight: term"></span>
        </novo-text>
        <!-- PHONE -->
        <novo-text smaller class="phone" *ngIf="match.data.phone">
          <i class="bhi-phone"></i> <span [innerHtml]="match.data.phone | highlight: term"></span>
        </novo-text>
        <!-- ADDRESS -->
        <novo-text smaller class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
          <i class="bhi-location"></i> <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
          <span *ngIf="match.data.address.city && match.data.address.state">, </span>
          <span *ngIf="match.data.address.state" [innerHtml]="match.data.address.state | highlight: term"></span>
        </novo-text>
        <!-- STATUS -->
        <novo-text smaller class="status" *ngIf="match.data.status">
          <i class="bhi-info"></i> <span [innerHtml]="match.data.status | highlight: term"></span>
        </novo-text>
        <!-- OWNER -->
        <novo-text smaller class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
          <i class="bhi-person"></i> <span [innerHtml]="match.data.owner.name | highlight: term"></span>
        </novo-text>
        <!-- PRIMARY DEPARTMENT -->
        <novo-text
          smaller
          class="primary-department"
          *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'"
        >
          <i class="bhi-department"></i> <span [innerHtml]="match.data.primaryDepartment.name | highlight: term"></span>
        </novo-text>
        <!-- OCCUPATION -->
        <novo-text smaller class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
          <i class="bhi-occupation"></i> <span [innerHtml]="match.data.occupation | highlight: term"></span>
        </novo-text>
      </novo-item-content>
    </novo-list-item>
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { type: i2.NovoItemAvatarElement, selector: "item-avatar, novo-item-avatar", inputs: ["icon", "color"] }, { type: i2.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i6.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "highlight": i6$1.HighlightPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EntityPickerResult, decorators: [{
            type: Component,
            args: [{ selector: 'entity-picker-result', template: `
    <novo-list-item *ngIf="match.data" (click)="select.next(match.data)">
      <novo-item-header>
        <novo-item-avatar [icon]="getIconForResult(match.data)"></novo-item-avatar>
        <novo-item-title> <span [innerHtml]="getNameForResult(match.data) | highlight: term"></span> </novo-item-title>
      </novo-item-header>
      <novo-item-content direction="horizontal">
        <!-- COMPANY 1 -->
        <novo-text smaller class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
          <i class="bhi-company company"></i>
          <span [innerHtml]="match.data.companyName || match.data?.clientCorporation?.name | highlight: term"></span>
        </novo-text>
        <!-- CLIENT CONTACT -->
        <novo-text smaller class="contact" *ngIf="match.data?.clientContact?.firstName">
          <i class="bhi-person contact person"></i>
          <span [innerHtml]="match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName | highlight: term"></span>
        </novo-text>
        <!-- CANDIDATE -->
        <novo-text smaller class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
          <i class="bhi-candidate candidate"></i>
          <span [innerHtml]="match.data.candidate.firstName + ' ' + match.data.candidate.lastName | highlight: term"></span>
        </novo-text>
        <!-- START & END DATE -->
        <novo-text smaller class="start-date" *ngIf="match.data.dateBegin && match.data.searchEntity === 'Placement'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)"></span>
        </novo-text>
        <!-- START Date -->
        <novo-text smaller class="start-date" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.startTime)"></span>
        </novo-text>
        <!-- START & END TIME -->
        <novo-text smaller class="start-time" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-clock"></i>
          <span [innerHtml]="renderTimeNoOffset(match.data.startTime) + ' - ' + renderTimeNoOffset(match.data.endTime)"></span>
        </novo-text>
        <!-- JOBORDER -->
        <novo-text smaller class="job" *ngIf="match.data.jobOrder && match.data.searchEntity === 'JobShift'">
          <i class="bhi-job job"></i>
          <span [innerHtml]="match.data.jobOrder.title | highlight: term"></span>
        </novo-text>
        <!-- OPENINGS -->
        <novo-text smaller class="openings" *ngIf="match.data.openings && match.data.searchEntity === 'JobShift'">
          <i class="bhi-candidate"></i>
          <span>{{ match.data.numAssigned }} / {{ match.data.openings }}</span>
        </novo-text>
        <!-- EMAIL -->
        <novo-text smaller class="email" *ngIf="match.data.email">
          <i class="bhi-email"></i> <span [innerHtml]="match.data.email | highlight: term"></span>
        </novo-text>
        <!-- PHONE -->
        <novo-text smaller class="phone" *ngIf="match.data.phone">
          <i class="bhi-phone"></i> <span [innerHtml]="match.data.phone | highlight: term"></span>
        </novo-text>
        <!-- ADDRESS -->
        <novo-text smaller class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
          <i class="bhi-location"></i> <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
          <span *ngIf="match.data.address.city && match.data.address.state">, </span>
          <span *ngIf="match.data.address.state" [innerHtml]="match.data.address.state | highlight: term"></span>
        </novo-text>
        <!-- STATUS -->
        <novo-text smaller class="status" *ngIf="match.data.status">
          <i class="bhi-info"></i> <span [innerHtml]="match.data.status | highlight: term"></span>
        </novo-text>
        <!-- OWNER -->
        <novo-text smaller class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
          <i class="bhi-person"></i> <span [innerHtml]="match.data.owner.name | highlight: term"></span>
        </novo-text>
        <!-- PRIMARY DEPARTMENT -->
        <novo-text
          smaller
          class="primary-department"
          *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'"
        >
          <i class="bhi-department"></i> <span [innerHtml]="match.data.primaryDepartment.name | highlight: term"></span>
        </novo-text>
        <!-- OCCUPATION -->
        <novo-text smaller class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
          <i class="bhi-occupation"></i> <span [innerHtml]="match.data.occupation | highlight: term"></span>
        </novo-text>
      </novo-item-content>
    </novo-list-item>
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { match: [{
                type: Input
            }], term: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
class EntityPickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.labels = labels;
        this.select = new EventEmitter();
    }
    get hasNonErrorMessage() {
        return !this.isLoading && !this.matches.length && !this.hasError;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    selectMatch(event, item) {
        this.select.next(item);
        return super.selectMatch(event, item);
    }
}
EntityPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EntityPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
EntityPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: EntityPickerResults, selector: "entity-picker-results", outputs: { select: "select" }, host: { classAttribute: "novo-entity-picker-results" }, usesInheritance: true, ngImport: i0, template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <entity-picker-result
        *ngFor="let match of matches"
        [match]="match"
        [term]="term"
        [ngClass]="{ active: isActive(match) }"
        (click)="selectMatch($event, match)"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
      </entity-picker-result>
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term !== ''">{{ labels.pickerEmpty }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term === ''">{{ labels.pickerTextFieldEmpty }}</div>
  `, isInline: true, components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: EntityPickerResult, selector: "entity-picker-result", inputs: ["match", "term"], outputs: ["select"] }, { type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EntityPickerResults, decorators: [{
            type: Component,
            args: [{
                    selector: 'entity-picker-results',
                    template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <entity-picker-result
        *ngFor="let match of matches"
        [match]="match"
        [term]="term"
        [ngClass]="{ active: isActive(match) }"
        (click)="selectMatch($event, match)"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
      </entity-picker-result>
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term !== ''">{{ labels.pickerEmpty }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term === ''">{{ labels.pickerTextFieldEmpty }}</div>
  `,
                    host: {
                        class: 'novo-entity-picker-results',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { select: [{
                type: Output
            }] } });

class GroupedMultiPickerResults extends BasePickerResults {
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.customFilterEnabled = false;
        this.placeholder = '';
        this.internalMap = new Map();
    }
    set term(value) {
        // Display all only will work for static categories
        if (this.config.displayAll && this.config.getItemsForCategoryAsync) {
            throw new Error('[GroupedMultiPickerResults] - you can only have `displayAll` with a static `categoryMap`. Not available with `getItemsForCategoryAsync`');
        }
        // Custom filter
        if (this.config.customFilter) {
            this.customFilterEnabled = true;
            this.customFilterLabel = this.config.customFilter.label;
            this.customFilterValue = !!this.config.customFilter.defaultFilterValue;
            this.ref.markForCheck();
            if (!this.customFilterLabel || !this.config.customFilter.matchFunction) {
                throw new Error('[GroupedMultiPickerResults] - custom filter/matchFunction set no label was provided!');
            }
        }
        else {
            this.customFilterEnabled = false;
        }
        // Configure ALL
        if (this.config.displayAll && !this.selectedCategory) {
            this.setAllCategory();
        }
        // Placeholder
        if (this.config.placeholder) {
            this.placeholder = this.config.placeholder;
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    get categories() {
        if (this.config.categories || this.config.categoryMap) {
            return (this.config.categories ||
                Array.from(this.config.categoryMap.values()).filter((category) => {
                    return category.value !== 'all';
                }));
        }
        return [];
    }
    ngOnInit() {
        // Subscribe to keyboard events and debounce
        this.keyboardSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
            .pipe(debounceTime(350), distinctUntilChanged())
            .subscribe((event) => {
            this.searchTerm = event.target.value;
            this.matches = this.filterData();
            this.ref.markForCheck();
        });
    }
    ngOnDestroy() {
        // Cleanup
        this.keyboardSubscription.unsubscribe();
    }
    setAllCategory() {
        // If we have display all, set the all categories up
        if (this.config.displayAll) {
            this.selectedCategory = { value: 'all', label: 'all' };
            const allItems = [];
            Array.from(this.config.categoryMap.values())
                .filter((category) => {
                return category.value !== 'all';
            })
                .forEach((v) => allItems.push(...v.items));
            this.matches = this.filter(allItems);
            this.config.categoryMap.set('all', { value: 'all', label: 'All', items: allItems });
            this.ref.markForCheck();
        }
    }
    selectCategory(category) {
        // Scroll to top
        this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
        // Set focus
        this.inputElement.nativeElement.focus();
        // Find new items
        const key = category.value;
        this.selectedCategory = category;
        // Clear
        this.matches = [];
        this.ref.markForCheck();
        // New matches
        this.getNewMatches(category, key);
    }
    clearSearchTerm(event) {
        Helpers.swallowEvent(event);
        this.searchTerm = '';
        this.selectCategory({ value: this.selectedCategory.value, label: this.selectedCategory.label });
        this.ref.markForCheck();
    }
    selectMatch(event, item) {
        // Set focus
        this.inputElement.nativeElement.focus();
        return super.selectMatch(event);
    }
    fireCustomFilter(value) {
        this.customFilterValue = value;
        // Clear cache map
        this.internalMap.clear();
        // Only fire if we have a selected category
        if (this.selectCategory) {
            // Find new items
            const key = this.selectedCategory.value;
            // Get new matches
            this.getNewMatches(this.selectedCategory, key);
            this.ref.markForCheck();
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    filterData() {
        if (this.selectedCategory) {
            if (this.config.categoryMap) {
                return this.filter(this.config.categoryMap.get(this.selectedCategory.value).items);
            }
            else {
                return this.filter(this.internalMap.get(this.selectedCategory.value).items);
            }
        }
        return [];
    }
    getNewMatches(category, key) {
        // Get new matches
        if (this.config.categoryMap) {
            this.matches = this.filter(this.config.categoryMap.get(key).items);
            this.ref.markForCheck();
        }
        else {
            if (!this.config.getItemsForCategoryAsync) {
                throw new Error('The "config" for the Chips must include a function "getItemsForCategoryAsync(categoryKey: string)" to retrieve the items by category. Or if you have static data provide a "categoryMap"');
            }
            if (!this.internalMap.get(key)) {
                this.isLoading = true;
                this.config.getItemsForCategoryAsync(key, this.customFilterValue).then((items) => {
                    this.internalMap.set(key, { value: category.value, label: category.label, items });
                    this.matches = this.filter(items, true);
                    this.isLoading = false;
                    this.ref.markForCheck();
                    setTimeout(() => {
                        this.inputElement.nativeElement.focus();
                    });
                });
            }
            else {
                this.matches = this.filter(this.internalMap.get(key).items);
                this.ref.markForCheck();
            }
        }
    }
    filter(array, ignoreCustomFilter = false) {
        let matches = array;
        if (this.searchTerm && this.searchTerm.length !== 0 && this.selectedCategory) {
            matches = matches.filter((match) => {
                const searchTerm = this.searchTerm.toLowerCase();
                return match.label.toLowerCase().indexOf(searchTerm) > -1 || match.value.toLowerCase().indexOf(searchTerm) > -1;
            });
        }
        if (this.customFilterEnabled && this.config.customFilter.matchFunction && !ignoreCustomFilter) {
            matches = matches.filter((match) => this.config.customFilter.matchFunction(match, this.customFilterValue));
        }
        return matches;
    }
}
GroupedMultiPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GroupedMultiPickerResults, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GroupedMultiPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: GroupedMultiPickerResults, selector: "grouped-multi-picker-results", viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "listElement", first: true, predicate: ["list"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <div class="grouped-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngIf="config.displayAll"
          (click)="selectCategory({ value: 'all', label: 'all' })"
          [class.active]="selectedCategory?.value === 'all'"
          data-automation-id="display-all"
          [class.disabled]="isLoading"
        >
          <item-content>
            <span data-automation-id="label">{{ labels.all }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
        <novo-list-item
          *ngFor="let category of categories"
          (click)="selectCategory(category)"
          [class.active]="selectedCategory?.value === category.value"
          [attr.data-automation-id]="category.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="category.iconClass" [class]="category.iconClass"></i>
            <span data-automation-id="label">{{ category.label }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
      <footer
        class="grouped-multi-picker-groups-footer"
        *ngIf="customFilterEnabled"
        data-automation-id="footer"
        [class.disabled]="isLoading"
      >
        <novo-switch [(ngModel)]="customFilterValue" (onChange)="fireCustomFilter($event)" data-automation-id="switch"></novo-switch>
        <label data-automation-id="label">{{ customFilterLabel }}</label>
      </footer>
    </div>
    <div class="grouped-multi-picker-matches">
      <div class="grouped-multi-picker-input-container" [hidden]="!selectedCategory" data-automation-id="input-container">
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="grouped-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="grouped-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedCategory"
          data-automation-id="empty-message"
        >
          {{ labels.groupedMultiPickerEmpty }}
        </div>
        <div
          class="grouped-multi-picker-no-category"
          *ngIf="matches.length === 0 && !isLoading && !selectedCategory"
          data-automation-id="select-category-message"
        >
          {{ labels.groupedMultiPickerSelectCategory }}
        </div>
        <div class="grouped-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [":host{background-color:var(--color-background);max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;padding:10px;border-bottom:none;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host novo-list-item div.list-item{flex:1!important}:host>.grouped-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-groups novo-list{overflow:auto}:host>.grouped-multi-picker-groups footer{flex-basis:50px;min-height:50px;height:50px;display:flex;align-items:center;border-top:1px solid var(--color-border) label;border-top-font-weight:500}:host>.grouped-multi-picker-groups footer.disabled{pointer-events:none;opacity:.75}:host>.grouped-multi-picker-groups novo-list-item{font-weight:500;color:#999;border-left:3px solid transparent}:host>.grouped-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.grouped-multi-picker-groups novo-list-item item-end{color:#999}:host>.grouped-multi-picker-groups novo-list-item.active{color:var(--color-selection);border-left-color:var(--color-selection);background-color:#e9e9e9}:host>.grouped-multi-picker-groups novo-list-item.active item-end{color:var(--color-selection)}:host>.grouped-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:var(--color-selection)!important}:host>.grouped-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-matches novo-list{overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container{position:relative}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:var(--border-main);border-left:var(--border-main);border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:hover{border-bottom:var(--border-main)}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:focus{border-bottom:1px solid var(--color-selection);border-left:1px solid var(--color-selection)}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search.disabled,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.grouped-multi-picker-matches .grouped-multi-picker-list-container{border-left:var(--border-main);flex:1;display:flex;flex-direction:column;overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-no-category,:host>.grouped-multi-picker-matches .grouped-multi-picker-no-results,:host>.grouped-multi-picker-matches .grouped-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"], components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i2.NovoItemEndElement, selector: "item-end, novo-item-end" }, { type: i3$1.NovoSwitchElement, selector: "novo-switch", inputs: ["icons", "disabled"], outputs: ["onChange"] }, { type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GroupedMultiPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'grouped-multi-picker-results', template: `
    <div class="grouped-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngIf="config.displayAll"
          (click)="selectCategory({ value: 'all', label: 'all' })"
          [class.active]="selectedCategory?.value === 'all'"
          data-automation-id="display-all"
          [class.disabled]="isLoading"
        >
          <item-content>
            <span data-automation-id="label">{{ labels.all }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
        <novo-list-item
          *ngFor="let category of categories"
          (click)="selectCategory(category)"
          [class.active]="selectedCategory?.value === category.value"
          [attr.data-automation-id]="category.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="category.iconClass" [class]="category.iconClass"></i>
            <span data-automation-id="label">{{ category.label }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
      <footer
        class="grouped-multi-picker-groups-footer"
        *ngIf="customFilterEnabled"
        data-automation-id="footer"
        [class.disabled]="isLoading"
      >
        <novo-switch [(ngModel)]="customFilterValue" (onChange)="fireCustomFilter($event)" data-automation-id="switch"></novo-switch>
        <label data-automation-id="label">{{ customFilterLabel }}</label>
      </footer>
    </div>
    <div class="grouped-multi-picker-matches">
      <div class="grouped-multi-picker-input-container" [hidden]="!selectedCategory" data-automation-id="input-container">
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="grouped-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="grouped-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedCategory"
          data-automation-id="empty-message"
        >
          {{ labels.groupedMultiPickerEmpty }}
        </div>
        <div
          class="grouped-multi-picker-no-category"
          *ngIf="matches.length === 0 && !isLoading && !selectedCategory"
          data-automation-id="select-category-message"
        >
          {{ labels.groupedMultiPickerSelectCategory }}
        </div>
        <div class="grouped-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>
  `, styles: [":host{background-color:var(--color-background);max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;padding:10px;border-bottom:none;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host novo-list-item div.list-item{flex:1!important}:host>.grouped-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-groups novo-list{overflow:auto}:host>.grouped-multi-picker-groups footer{flex-basis:50px;min-height:50px;height:50px;display:flex;align-items:center;border-top:1px solid var(--color-border) label;border-top-font-weight:500}:host>.grouped-multi-picker-groups footer.disabled{pointer-events:none;opacity:.75}:host>.grouped-multi-picker-groups novo-list-item{font-weight:500;color:#999;border-left:3px solid transparent}:host>.grouped-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.grouped-multi-picker-groups novo-list-item item-end{color:#999}:host>.grouped-multi-picker-groups novo-list-item.active{color:var(--color-selection);border-left-color:var(--color-selection);background-color:#e9e9e9}:host>.grouped-multi-picker-groups novo-list-item.active item-end{color:var(--color-selection)}:host>.grouped-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:var(--color-selection)!important}:host>.grouped-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-matches novo-list{overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container{position:relative}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:var(--border-main);border-left:var(--border-main);border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:hover{border-bottom:var(--border-main)}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:focus{border-bottom:1px solid var(--color-selection);border-left:1px solid var(--color-selection)}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search.disabled,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.grouped-multi-picker-matches .grouped-multi-picker-list-container{border-left:var(--border-main);flex:1;display:flex;flex-direction:column;overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-no-category,:host>.grouped-multi-picker-matches .grouped-multi-picker-no-results,:host>.grouped-multi-picker-matches .grouped-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], listElement: [{
                type: ViewChild,
                args: ['list']
            }] } });

class MixedMultiPickerResults extends BasePickerResults {
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.placeholder = '';
        this.emptyOptionsLabel = '';
        this.internalMap = new Map();
    }
    set term(value) {
        if (this.config.placeholder) {
            this.placeholder = this.config.placeholder;
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    get options() {
        return this.config.options || [];
    }
    ngOnDestroy() {
        // Cleanup
        if (this.keyboardSubscription) {
            this.keyboardSubscription.unsubscribe();
        }
        if (this.config.options) {
            this.config.options.forEach((option) => {
                if (option.clearSecondaryOptions) {
                    option.clearSecondaryOptions.unsubscribe();
                }
            });
        }
    }
    selectPrimaryOption(primaryOption, event) {
        if (this.keyboardSubscription) {
            this.keyboardSubscription.unsubscribe();
        }
        // Scroll to top
        this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
        // Set focus
        this.inputElement.nativeElement.focus();
        // Find new items
        const key = primaryOption.value;
        this.selectedPrimaryOption = primaryOption;
        // Clear
        this.matches = [];
        this.ref.markForCheck();
        // New matches
        if (this.optionHasSecondaryOptions(primaryOption)) {
            // Subscribe to keyboard events and debounce
            this.keyboardSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
                .pipe(debounceTime(350), distinctUntilChanged())
                .subscribe((keyEvent) => {
                this.searchTerm = keyEvent.target.value;
                this.matches = this.filterData();
                this.ref.markForCheck();
            });
            this.getNewMatches(primaryOption);
        }
        else {
            this.selectActive(primaryOption);
            this.selectMatch(event);
        }
    }
    selectMatch(event) {
        // Set focus
        this.inputElement.nativeElement.focus();
        return super.selectMatch(event);
    }
    clearSearchTerm(event) {
        Helpers.swallowEvent(event);
        this.searchTerm = '';
        this.selectPrimaryOption({ value: this.selectedPrimaryOption.value, label: this.selectedPrimaryOption.label });
        this.ref.markForCheck();
    }
    optionHasSecondaryOptions(primaryOption) {
        return !!(primaryOption && (primaryOption.secondaryOptions || primaryOption.getSecondaryOptionsAsync));
    }
    shouldShowSearchBox(primaryOption) {
        return !!(primaryOption && primaryOption.showSearchOnSecondaryOptions);
    }
    clearPrimaryOption(primaryOption) {
        var _a;
        if (this.internalMap.get(primaryOption.value)) {
            if (primaryOption.value === ((_a = this.selectedPrimaryOption) === null || _a === void 0 ? void 0 : _a.value)) {
                this.activeMatch = null;
                this.matches = [];
                this.selectedPrimaryOption = null;
            }
            this.internalMap.delete(primaryOption.value);
            this.ref.markForCheck();
        }
    }
    filterData() {
        if (this.selectedPrimaryOption) {
            if (this.selectedPrimaryOption.secondaryOptions) {
                return this.filter(this.selectedPrimaryOption.secondaryOptions);
            }
            else {
                return this.filter(this.internalMap.get(this.selectedPrimaryOption.value).items);
            }
        }
        return [];
    }
    filter(array) {
        let matches = array;
        if (this.searchTerm && this.searchTerm.length !== 0 && this.selectedPrimaryOption) {
            matches = matches.filter((match) => {
                const searchTerm = this.searchTerm.toLowerCase();
                return match.label.toLowerCase().indexOf(searchTerm) > -1 || match.value.toLowerCase().indexOf(searchTerm) > -1;
            });
        }
        return matches;
    }
    getNewMatches(primaryOption) {
        // Get new matches
        if (primaryOption.secondaryOptions) {
            this.matches = this.filter(primaryOption.secondaryOptions);
            this.ref.markForCheck();
        }
        else {
            if (!primaryOption.getSecondaryOptionsAsync) {
                throw new Error('An option needs to have either an array of secondaryOptions or a function getSecondaryOptionsAsync');
            }
            if (!this.internalMap.get(primaryOption.value)) {
                this.isLoading = true;
                primaryOption.getSecondaryOptionsAsync().then((items) => {
                    this.internalMap.set(primaryOption.value, { value: primaryOption.value, label: primaryOption.label, items });
                    this.matches = this.filter(items);
                    this.isLoading = false;
                    this.ref.markForCheck();
                    setTimeout(() => {
                        this.inputElement.nativeElement.focus();
                    });
                });
                if (primaryOption.clearSecondaryOptions) {
                    primaryOption.clearSecondaryOptions.subscribe(() => {
                        this.clearPrimaryOption(primaryOption);
                    });
                }
            }
            else {
                this.matches = this.filter(this.internalMap.get(primaryOption.value).items);
                this.ref.markForCheck();
            }
        }
    }
}
MixedMultiPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MixedMultiPickerResults, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MixedMultiPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: MixedMultiPickerResults, selector: "mixed-multi-picker-results", viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "listElement", first: true, predicate: ["list"], descendants: true }], usesInheritance: true, ngImport: i0, template: ` <div class="mixed-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngFor="let option of options"
          (click)="selectPrimaryOption(option, $event)"
          [class.active]="selectedPrimaryOption?.value === option.value"
          [attr.data-automation-id]="option.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="option.iconClass" [class]="option.iconClass"></i>
            <span data-automation-id="label">{{ option.label }}</span>
          </item-content>
          <item-end *ngIf="optionHasSecondaryOptions(option)">
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
    </div>
    <div class="mixed-multi-picker-matches" [hidden]="!optionHasSecondaryOptions(selectedPrimaryOption)">
      <div
        class="mixed-multi-picker-input-container"
        [hidden]="!shouldShowSearchBox(selectedPrimaryOption)"
        data-automation-id="input-container"
      >
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="mixed-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="mixed-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedPrimaryOption"
          data-automation-id="empty-message"
        >
          {{ config.emptyOptionsLabel ? config.emptyOptionsLabel : labels.groupedMultiPickerEmpty }}
        </div>
        <div class="mixed-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>`, isInline: true, styles: [":host{background-color:var(--color-background);max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;padding:10px;border-bottom:none;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host>.mixed-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-groups novo-list{overflow:auto}:host>.mixed-multi-picker-groups novo-list-item{color:#999;border-left:3px solid transparent;transition:background-color .25s}:host>.mixed-multi-picker-groups novo-list-item>div{width:100%}:host>.mixed-multi-picker-groups novo-list-item:hover{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.mixed-multi-picker-groups novo-list-item item-end{color:#999}:host>.mixed-multi-picker-groups novo-list-item.active{color:var(--color-selection);border-left-color:var(--color-selection);background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-groups novo-list-item.active item-end{color:var(--color-selection)}:host>.mixed-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:var(--color-selection)!important}:host>.mixed-multi-picker-groups novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-groups novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-matches novo-list{overflow:auto}:host>.mixed-multi-picker-matches novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host>.mixed-multi-picker-matches novo-list novo-list-item>div{width:100%}:host>.mixed-multi-picker-matches novo-list novo-list-item.active{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-matches novo-list novo-list-item:hover{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container{position:relative}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:var(--border-main);border-left:var(--border-main);border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:hover{border-bottom:var(--border-main)}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:focus{border-bottom:1px solid var(--color-selection);border-left:1px solid var(--color-selection)}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search.disabled,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.mixed-multi-picker-matches .mixed-multi-picker-list-container{border-left:var(--border-main);flex:1;display:flex;flex-direction:column;overflow:auto}:host>.mixed-multi-picker-matches .mixed-multi-picker-no-primary,:host>.mixed-multi-picker-matches .mixed-multi-picker-no-results,:host>.mixed-multi-picker-matches .mixed-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"], components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i2.NovoItemEndElement, selector: "item-end, novo-item-end" }, { type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i6$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MixedMultiPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'mixed-multi-picker-results', template: ` <div class="mixed-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngFor="let option of options"
          (click)="selectPrimaryOption(option, $event)"
          [class.active]="selectedPrimaryOption?.value === option.value"
          [attr.data-automation-id]="option.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="option.iconClass" [class]="option.iconClass"></i>
            <span data-automation-id="label">{{ option.label }}</span>
          </item-content>
          <item-end *ngIf="optionHasSecondaryOptions(option)">
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
    </div>
    <div class="mixed-multi-picker-matches" [hidden]="!optionHasSecondaryOptions(selectedPrimaryOption)">
      <div
        class="mixed-multi-picker-input-container"
        [hidden]="!shouldShowSearchBox(selectedPrimaryOption)"
        data-automation-id="input-container"
      >
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="mixed-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="mixed-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedPrimaryOption"
          data-automation-id="empty-message"
        >
          {{ config.emptyOptionsLabel ? config.emptyOptionsLabel : labels.groupedMultiPickerEmpty }}
        </div>
        <div class="mixed-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>`, styles: [":host{background-color:var(--color-background);max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;padding:10px;border-bottom:none;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host>.mixed-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-groups novo-list{overflow:auto}:host>.mixed-multi-picker-groups novo-list-item{color:#999;border-left:3px solid transparent;transition:background-color .25s}:host>.mixed-multi-picker-groups novo-list-item>div{width:100%}:host>.mixed-multi-picker-groups novo-list-item:hover{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.mixed-multi-picker-groups novo-list-item item-end{color:#999}:host>.mixed-multi-picker-groups novo-list-item.active{color:var(--color-selection);border-left-color:var(--color-selection);background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-groups novo-list-item.active item-end{color:var(--color-selection)}:host>.mixed-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:var(--color-selection)!important}:host>.mixed-multi-picker-groups novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-groups novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-matches novo-list{overflow:auto}:host>.mixed-multi-picker-matches novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host>.mixed-multi-picker-matches novo-list novo-list-item>div{width:100%}:host>.mixed-multi-picker-matches novo-list novo-list-item.active{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-matches novo-list novo-list-item:hover{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container{position:relative}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:var(--border-main);border-left:var(--border-main);border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:hover{border-bottom:var(--border-main)}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:focus{border-bottom:1px solid var(--color-selection);border-left:1px solid var(--color-selection)}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search.disabled,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.mixed-multi-picker-matches .mixed-multi-picker-list-container{border-left:var(--border-main);flex:1;display:flex;flex-direction:column;overflow:auto}:host>.mixed-multi-picker-matches .mixed-multi-picker-no-primary,:host>.mixed-multi-picker-matches .mixed-multi-picker-no-results,:host>.mixed-multi-picker-matches .mixed-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], listElement: [{
                type: ViewChild,
                args: ['list']
            }] } });

// NG2
class PickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.labels = labels;
    }
    get hasNonErrorMessage() {
        return !this.isLoading && !this.matches.length && !this.hasError;
    }
    getEmptyMessage() {
        if (this.shouldShowMessageForZeroLengthSearch()) {
            // this property comes from Field Interactions
            return this.config.emptyPickerMessage;
        }
        else {
            return this.term === '' ? this.labels.pickerTextFieldEmpty : this.labels.pickerEmpty;
        }
    }
    shouldShowMessageForZeroLengthSearch() {
        return this.config && this.config.minSearchLength === 0 && this.term === '' && this.config.emptyPickerMessage;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
}
PickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PickerResults, selector: "picker-results", host: { classAttribute: "active" }, usesInheritance: true, ngImport: i0, template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
        data-automation-id="picker-result-list-item"
      >
        <item-content> <span [innerHtml]="match.label | highlight: term"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], pipes: { "highlight": i6$1.HighlightPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'picker-results', host: {
                        class: 'active',
                    }, template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
        data-automation-id="picker-result-list-item"
      >
        <item-content> <span [innerHtml]="match.label | highlight: term"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; } });

// NG2
class SkillsSpecialtyPickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.element = element;
        this.labels = labels;
        this.active = true;
        this.limitedTo = false;
        this.limit = 200;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection) {
        let data = collection;
        if (collection.hasOwnProperty('data')) {
            this.limitedTo = collection.limitedTo200;
            this.total = collection.total;
            data = collection.data;
        }
        else if (data.length > this.limit) {
            this.limitedTo = true;
            this.total = data.length;
            data = data.slice(0, this.limit);
        }
        return super.structureArray(data);
    }
}
SkillsSpecialtyPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SkillsSpecialtyPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
SkillsSpecialtyPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: SkillsSpecialtyPickerResults, selector: "skill-specialty-picker-results", host: { properties: { "class.active": "this.active" } }, usesInheritance: true, ngImport: i0, template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length"><novo-loading theme="line"></novo-loading></section>
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-content>
          <h6><span [innerHtml]="match.label | highlight: term"></span></h6>
          <div class="category">
            <i class="bhi-category-tags"></i
            ><span [innerHtml]="match.data.categories || match.data.parentCategory.name | highlight: term"></span>
          </div>
        </item-content>
      </novo-list-item>
      <novo-list-item *ngIf="limitedTo"
        ><div>{{ labels.showingXofXResults(limit, total) }}</div></novo-list-item
      >
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "highlight": i6$1.HighlightPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SkillsSpecialtyPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'skill-specialty-picker-results', template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length"><novo-loading theme="line"></novo-loading></section>
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-content>
          <h6><span [innerHtml]="match.label | highlight: term"></span></h6>
          <div class="category">
            <i class="bhi-category-tags"></i
            ><span [innerHtml]="match.data.categories || match.data.parentCategory.name | highlight: term"></span>
          </div>
        </item-content>
      </novo-list-item>
      <novo-list-item *ngIf="limitedTo"
        ><div>{{ labels.showingXofXResults(limit, total) }}</div></novo-list-item
      >
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { active: [{
                type: HostBinding,
                args: ['class.active']
            }] } });

// NG2
class WorkersCompCodesPickerResults extends PickerResults {
    constructor(element, sanitizer, labels, ref) {
        super(element, labels, ref);
        this.sanitizer = sanitizer;
        this.labels = labels;
    }
    sanitizeHTML(compCode, name) {
        return this.sanitizer.bypassSecurityTrustHtml(`${compCode} | ${name}`);
    }
}
WorkersCompCodesPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WorkersCompCodesPickerResults, deps: [{ token: i0.ElementRef }, { token: i1$1.DomSanitizer }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
WorkersCompCodesPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: WorkersCompCodesPickerResults, selector: "workers-comp-codes-picker-results", host: { classAttribute: "active" }, usesInheritance: true, ngImport: i0, template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match?.data?.compensation?.code, match?.data?.compensation?.name)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.state }}: </span><span>{{ match?.data?.compensation?.state }}</span>
          </p>
          <p>
            <span class="label">{{ labels.rate }}: </span><span>{{ labels.formatCurrency(match?.data?.rate) }}</span>
          </p>
        </item-content>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.startDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.startDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
          <p>
            <span class="label">{{ labels.endDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.endDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { type: i2.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WorkersCompCodesPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'workers-comp-codes-picker-results', host: {
                        class: 'active',
                    }, template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match?.data?.compensation?.code, match?.data?.compensation?.name)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.state }}: </span><span>{{ match?.data?.compensation?.state }}</span>
          </p>
          <p>
            <span class="label">{{ labels.rate }}: </span><span>{{ labels.formatCurrency(match?.data?.rate) }}</span>
          </p>
        </item-content>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.startDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.startDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
          <p>
            <span class="label">{{ labels.endDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.endDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1$1.DomSanitizer }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; } });

// NG2
// Value accessor for the component (supports ngModel)
const PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoPickerElement),
    multi: true,
};
/**
 * @description This class is the directive definition of the Picker. If you add and attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
class NovoPickerElement {
    constructor(element, componentUtils, ref) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.ref = ref;
        this.closeOnSelect = true;
        this.selected = [];
        // Deprecated
        this.appendToBody = false;
        // Deprecated
        this.parentScrollAction = 'close';
        // Side the dropdown will open
        this.side = 'left';
        // FormField appearance
        this.appearance = 'standard';
        // Autoselects the first option in the results
        this.autoSelectFirstOption = true;
        this._disablePickerInput = false;
        // Emitter for selects
        this.changed = new EventEmitter();
        this.select = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.typing = new EventEmitter();
        this.term = '';
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    // Disable from typing into the picker (result template does everything)
    set disablePickerInput(v) {
        this._disablePickerInput = coerceBooleanProperty(v);
    }
    get disablePickerInput() {
        return this._disablePickerInput;
    }
    ngOnInit() {
        if (this.overrideElement) {
            this.element = this.overrideElement;
        }
        if (this.appendToBody) {
            notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
        }
        // Custom results template
        this.resultsComponent = this.config.resultsTemplate || PickerResults;
        // Get all distinct key up events from the input and only fire if long enough and distinct
        // let input = this.element.nativeElement.querySelector('input');
        const pasteObserver = fromEvent(this.input.nativeElement, 'paste').pipe(debounceTime(250), distinctUntilChanged());
        pasteObserver.subscribe((event) => this.onDebouncedKeyup(event), (err) => this.hideResults(err));
        const keyboardObserver = fromEvent(this.input.nativeElement, 'keyup').pipe(debounceTime(250), distinctUntilChanged());
        keyboardObserver.subscribe((event) => this.onDebouncedKeyup(event), (err) => this.hideResults(err));
    }
    onDebouncedKeyup(event) {
        if (["Escape" /* Escape */, "ArrowDown" /* ArrowDown */, "ArrowUp" /* ArrowUp */, "Enter" /* Enter */, "Tab" /* Tab */].some((key) => key === event.key)) {
            return;
        }
        this.show(event.target.value);
    }
    openPanel() {
        this.container.openPanel();
    }
    closePanel() {
        this.container.closePanel();
    }
    get panelOpen() {
        return this.container && this.container.panelOpen;
    }
    show(term) {
        this.openPanel();
        // Show the results inside
        this.showResults(term);
    }
    onKeyDown(event) {
        if (this.disablePickerInput) {
            Helpers.swallowEvent(event);
            return;
        }
        if (this.panelOpen && !this.disablePickerInput) {
            if (event.key === "Escape" /* Escape */ || event.key === "Tab" /* Tab */) {
                this.hideResults();
                return;
            }
            if (event.key === "ArrowUp" /* ArrowUp */) {
                this.popup.instance.prevActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.key === "ArrowDown" /* ArrowDown */) {
                this.popup.instance.nextActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.key === "Enter" /* Enter */) {
                const activeMatch = this.popup.instance.activeMatch;
                if (!this.selected.find((selected) => activeMatch && activeMatch.value && selected.value === activeMatch.value)) {
                    this.popup.instance.selectActiveMatch();
                    this.ref.markForCheck();
                }
                return;
            }
            if ((event.key === "Backspace" /* Backspace */ || event.key === "Delete" /* Delete */) && !Helpers.isEmpty(this._value) && (this._value === this.term)) {
                this.clearValue(false);
                this.closePanel();
            }
            if (event.key === "Delete" /* Delete */ && Helpers.isBlank(this._value)) {
                this.clearValue(true);
            }
        }
    }
    clearValue(wipeTerm) {
        this._value = null;
        this.select.emit(this._value);
        this.changed.emit({ value: this._value, rawValue: { label: '', value: this._value } });
        this.onModelChange(this._value);
        if (wipeTerm) {
            this.term = '';
            this.hideResults();
        }
        this.ref.markForCheck();
    }
    /**
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event) {
        if (!this.panelOpen) {
            this.show();
        }
        this.focus.emit(event);
    }
    // Creates an instance of the results (called popup) and adds all the bindings to that instance.
    showResults(term) {
        // Update Matches
        if (this.popup) {
            // Update existing list or create the DOM element
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
            this.ref.markForCheck();
        }
        else {
            this.popup = this.componentUtils.append(this.resultsComponent, this.results);
            this.popup.instance.parent = this;
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
            this.popup.instance.overlay = this.container.overlayRef;
            this.ref.markForCheck();
        }
    }
    // Tells the overlay component to hide the picker results from the DOM without deleting the dynamically allocated popup instance created in
    // showResults. The popup instance will remain in memory from the first time the results are shown until this component is destroyed.
    hideResults(err) {
        this.closePanel();
        this.ref.markForCheck();
    }
    // Cleans up listeners for the popup - will get executed no matter how the popup is closed.
    onOverlayClosed() {
        if (this.popup && this.popup.instance && this.popup.instance.cleanUp) {
            this.popup.instance.cleanUp();
        }
    }
    // get accessor
    get value() {
        return this._value;
    }
    // set accessor including call the onchange callback
    set value(selected) {
        if (!selected) {
            this.term = '';
            this._value = null;
            this.onModelChange(this._value);
        }
        else if (selected.value !== this._value) {
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this._value = selected.value;
            this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: selected.value } });
            this.select.emit(selected);
            this.onModelChange(selected.value);
            if (this.popup) {
                this.popup.instance.selected = this.selected;
            }
        }
        else {
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: this._value } });
            this.select.emit(selected);
        }
        this.ref.markForCheck();
    }
    // Makes sure to clear the model if the user clears the text box
    checkTerm(event) {
        this.typing.emit(event);
        if ((!event || !event.length) && !Helpers.isEmpty(this._value)) {
            this._value = null;
            this.onModelChange(this._value);
        }
        this.ref.markForCheck();
    }
    // Set touched on blur
    onTouched(event) {
        this.onModelTouched();
        this.blur.emit(event);
    }
    // From ControlValueAccessor interface
    writeValue(value) {
        if (this.clearValueOnSelect) {
            this.term = '';
        }
        else {
            if (typeof value === 'string' && !this.config.useGetLabels) {
                this.term = value;
            }
            else if (value && value.label) {
                this.term = value.label;
            }
            else if (value && value.firstName) {
                this.term = `${value.firstName} ${value.lastName}`;
            }
            else if (value && value.name) {
                this.term = value.name;
            }
            else if (typeof this.config.getLabels === 'function') {
                this.config.getLabels(value).then((result) => {
                    if (result) {
                        this.term = result.length ? result[0].label || '' : result.label || '';
                    }
                    else {
                        this.term = value;
                    }
                    this.ref.markForCheck();
                });
            }
            else if (value && value.title) {
                this.term = value.title;
            }
            else {
                this.term = value || '';
            }
        }
        this._value = value;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this._disablePickerInput = disabled;
    }
}
NovoPickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerElement, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoPickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoPickerElement, selector: "novo-picker", inputs: { config: "config", placeholder: "placeholder", clearValueOnSelect: "clearValueOnSelect", closeOnSelect: "closeOnSelect", selected: "selected", appendToBody: "appendToBody", parentScrollSelector: "parentScrollSelector", parentScrollAction: "parentScrollAction", containerClass: "containerClass", side: "side", appearance: "appearance", autoSelectFirstOption: "autoSelectFirstOption", overrideElement: "overrideElement", disablePickerInput: "disablePickerInput" }, outputs: { changed: "changed", select: "select", focus: "focus", blur: "blur", typing: "typing" }, providers: [PICKER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "results", first: true, predicate: ["results"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "container", first: true, predicate: NovoOverlayTemplateComponent, descendants: true, static: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
    <novo-field [appearance]="appearance">
      <novo-icon novoPrefix *ngIf="config?.entityIcon && !_value">more</novo-icon>
      <novo-icon novoPrefix *ngIf="config?.entityIcon && _value">{{ config?.entityIcon }}</novo-icon>
      <novo-icon novoSuffix *ngIf="(!_value || clearValueOnSelect) && !disablePickerInput">search</novo-icon>
      <novo-icon
        novoSuffix
        *ngIf="_value && !clearValueOnSelect && !disablePickerInput"
        [class.entity-selected]="config?.entityIcon && _value"
        (click)="clearValue(true)"
        >x</novo-icon
      >
      <input
        #input
        novoInput
        type="text"
        class="picker-input"
        [class.entity-picker]="config?.entityIcon"
        [class.entity-selected]="config?.entityIcon && _value"
        [placeholder]="placeholder"
        [(ngModel)]="term"
        (ngModelChange)="checkTerm($event)"
        (keydown)="onKeyDown($event)"
        (focus)="onFocus($event)"
        (click)="onFocus($event)"
        (blur)="onTouched($event)"
        autocomplete="off"
        [disabled]="disablePickerInput"
      />
    </novo-field>
    <novo-overlay-template class="picker-results-container" [parent]="element" position="above-below" (closing)="onOverlayClosed()">
      <span #results></span>
      <ng-content></ng-content>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;padding-bottom:5px;transition:all .2s ease-in-out;position:relative}:host.selected+i,:host.selected:hover+i{color:var(--color-selection)}:host{padding-bottom:0}:host.ng-touched.ng-invalid:not(.ng-pristine)>input,:host.ng-touched.ng-invalid:not(.ng-pristine)>input:hover,:host.ng-touched.ng-invalid:not(.ng-pristine)>input:focus{border-bottom-color:transparent!important}.picker-results,.quick-note-results,picker-results,quick-note-results{background-color:var(--color-background);cursor:default;line-height:26px;width:100%}.picker-results novo-list,.picker-results ul,.quick-note-results novo-list,.quick-note-results ul,picker-results novo-list,picker-results ul,quick-note-results novo-list,quick-note-results ul{background-color:var(--color-background);max-height:200px;overflow:auto;list-style:none;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:block}.picker-results novo-list novo-list-item,.picker-results novo-list li,.picker-results ul novo-list-item,.picker-results ul li,.quick-note-results novo-list novo-list-item,.quick-note-results novo-list li,.quick-note-results ul novo-list-item,.quick-note-results ul li,picker-results novo-list novo-list-item,picker-results novo-list li,picker-results ul novo-list-item,picker-results ul li,quick-note-results novo-list novo-list-item,quick-note-results novo-list li,quick-note-results ul novo-list-item,quick-note-results ul li{cursor:pointer;padding:5px 16px;font-size:.9em}.picker-results novo-list novo-list-item span,.picker-results novo-list li span,.picker-results ul novo-list-item span,.picker-results ul li span,.quick-note-results novo-list novo-list-item span,.quick-note-results novo-list li span,.quick-note-results ul novo-list-item span,.quick-note-results ul li span,picker-results novo-list novo-list-item span,picker-results novo-list li span,picker-results ul novo-list-item span,picker-results ul li span,quick-note-results novo-list novo-list-item span,quick-note-results novo-list li span,quick-note-results ul novo-list-item span,quick-note-results ul li span{display:inline-block;min-width:100px;margin:2px 0}.picker-results novo-list novo-list-item h6,.picker-results novo-list li h6,.picker-results ul novo-list-item h6,.picker-results ul li h6,.quick-note-results novo-list novo-list-item h6,.quick-note-results novo-list li h6,.quick-note-results ul novo-list-item h6,.quick-note-results ul li h6,picker-results novo-list novo-list-item h6,picker-results novo-list li h6,picker-results ul novo-list-item h6,picker-results ul li h6,quick-note-results novo-list novo-list-item h6,quick-note-results novo-list li h6,quick-note-results ul novo-list-item h6,quick-note-results ul li h6{padding-top:0;font-weight:400;color:var(--color-text-muted)}.picker-results novo-list novo-list-item h6 strong,.picker-results novo-list li h6 strong,.picker-results ul novo-list-item h6 strong,.picker-results ul li h6 strong,.quick-note-results novo-list novo-list-item h6 strong,.quick-note-results novo-list li h6 strong,.quick-note-results ul novo-list-item h6 strong,.quick-note-results ul li h6 strong,picker-results novo-list novo-list-item h6 strong,picker-results novo-list li h6 strong,picker-results ul novo-list-item h6 strong,picker-results ul li h6 strong,quick-note-results novo-list novo-list-item h6 strong,quick-note-results novo-list li h6 strong,quick-note-results ul novo-list-item h6 strong,quick-note-results ul li h6 strong{font-weight:400;color:var(--color-text)}.picker-results novo-list novo-list-item.active,.picker-results novo-list novo-list-item:focus,.picker-results novo-list novo-list-item:hover,.picker-results novo-list li.active,.picker-results novo-list li:focus,.picker-results novo-list li:hover,.picker-results ul novo-list-item.active,.picker-results ul novo-list-item:focus,.picker-results ul novo-list-item:hover,.picker-results ul li.active,.picker-results ul li:focus,.picker-results ul li:hover,.quick-note-results novo-list novo-list-item.active,.quick-note-results novo-list novo-list-item:focus,.quick-note-results novo-list novo-list-item:hover,.quick-note-results novo-list li.active,.quick-note-results novo-list li:focus,.quick-note-results novo-list li:hover,.quick-note-results ul novo-list-item.active,.quick-note-results ul novo-list-item:focus,.quick-note-results ul novo-list-item:hover,.quick-note-results ul li.active,.quick-note-results ul li:focus,.quick-note-results ul li:hover,picker-results novo-list novo-list-item.active,picker-results novo-list novo-list-item:focus,picker-results novo-list novo-list-item:hover,picker-results novo-list li.active,picker-results novo-list li:focus,picker-results novo-list li:hover,picker-results ul novo-list-item.active,picker-results ul novo-list-item:focus,picker-results ul novo-list-item:hover,picker-results ul li.active,picker-results ul li:focus,picker-results ul li:hover,quick-note-results novo-list novo-list-item.active,quick-note-results novo-list novo-list-item:focus,quick-note-results novo-list novo-list-item:hover,quick-note-results novo-list li.active,quick-note-results novo-list li:focus,quick-note-results novo-list li:hover,quick-note-results ul novo-list-item.active,quick-note-results ul novo-list-item:focus,quick-note-results ul novo-list-item:hover,quick-note-results ul li.active,quick-note-results ul li:focus,quick-note-results ul li:hover{background-color:var(--color-selection-overlay)}.picker-results novo-list novo-list-item.disabled,.picker-results novo-list li.disabled,.picker-results ul novo-list-item.disabled,.picker-results ul li.disabled,.quick-note-results novo-list novo-list-item.disabled,.quick-note-results novo-list li.disabled,.quick-note-results ul novo-list-item.disabled,.quick-note-results ul li.disabled,picker-results novo-list novo-list-item.disabled,picker-results novo-list li.disabled,picker-results ul novo-list-item.disabled,picker-results ul li.disabled,quick-note-results novo-list novo-list-item.disabled,quick-note-results novo-list li.disabled,quick-note-results ul novo-list-item.disabled,quick-note-results ul li.disabled{opacity:.5;pointer-events:none}.picker-results novo-list novo-list-item item-content,.picker-results novo-list li item-content,.picker-results ul novo-list-item item-content,.picker-results ul li item-content,.quick-note-results novo-list novo-list-item item-content,.quick-note-results novo-list li item-content,.quick-note-results ul novo-list-item item-content,.quick-note-results ul li item-content,picker-results novo-list novo-list-item item-content,picker-results novo-list li item-content,picker-results ul novo-list-item item-content,picker-results ul li item-content,quick-note-results novo-list novo-list-item item-content,quick-note-results novo-list li item-content,quick-note-results ul novo-list-item item-content,quick-note-results ul li item-content{display:block}.picker-results novo-list novo-loading,.picker-results ul novo-loading,.quick-note-results novo-list novo-loading,.quick-note-results ul novo-loading,picker-results novo-list novo-loading,picker-results ul novo-loading,quick-note-results novo-list novo-loading,quick-note-results ul novo-loading{justify-content:center}.picker-results ul li,.quick-note-results ul li,picker-results ul li,quick-note-results ul li{padding:10px 16px;box-sizing:border-box;display:flex;flex-wrap:wrap;flex-direction:column}.picker-results.active,.quick-note-results.active,picker-results.active,quick-note-results.active{z-index:1000}.picker-results:focus,.quick-note-results:focus,picker-results:focus,quick-note-results:focus{outline:none}.novo-list-item.disabled,entity-picker-result.disabled{opacity:.5;pointer-events:none}entity-picker-result.active>novo-list-item{background-color:var(--color-selection-overlay)}.novo-entity-picker-results{background:var(--color-background);width:100%}.novo-entity-picker-results .novo-list{background:var(--color-background)}.novo-entity-picker-results .novo-list .novo-item-content{margin-top:var(--spacing-sm);margin-left:1.8rem;row-gap:1rem}.novo-entity-picker-results .novo-list .novo-item-content .novo-text{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}.novo-entity-picker-results .novo-list novo-loading{justify-content:center}.picker-error,.picker-loader,.picker-null-recent-results,.picker-null-results{color:var(--color-text-muted);background-color:var(--color-background);border:1px solid var(--color-selection);box-shadow:var(--shadow-z2);text-align:center;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);padding:var(--spacing-sm)}p.picker-error,p.picker-loader,p.picker-null-recent-results,p.picker-null-results{max-width:inherit;padding:5px}.picker-loader{background-color:var(--color-background);display:flex;align-items:center;flex-direction:column;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1)}entity-picker-results{min-width:250px}entity-picker-results novo-list{max-height:49vh;overflow:auto}entity-picker-results,picker-results{color:#000;min-width:100%;max-width:100%;z-index:10;top:100%}entity-picker-results .novo-list,picker-results .novo-list{border:1px solid #4a89dc}entity-picker-results .novo-list .novo-list-item,picker-results .novo-list .novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}entity-picker-results .novo-list .novo-list-item>div,picker-results .novo-list .novo-list-item>div{width:100%}entity-picker-results .novo-list .novo-list-item.active,picker-results .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}entity-picker-results .novo-list .novo-list-item:hover,picker-results .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}entity-picker-results .novo-list .novo-list-item .novo-item-content,picker-results .novo-list .novo-list-item .novo-item-content{flex-flow:row wrap}entity-picker-results .novo-list .novo-list-item .novo-item-content>*,picker-results .novo-list .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}entity-picker-results .error-results,entity-picker-results .no-recents,entity-picker-results .null-results,picker-results .error-results,picker-results .no-recents,picker-results .null-results{text-align:center;padding:1em 0 4em}entity-picker-results .error-results>i,entity-picker-results .no-recents>i,entity-picker-results .null-results>i,picker-results .error-results>i,picker-results .no-recents>i,picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}entity-picker-results .error-results>h4,entity-picker-results .error-results>p,entity-picker-results .no-recents>h4,entity-picker-results .no-recents>p,entity-picker-results .null-results>h4,entity-picker-results .null-results>p,picker-results .error-results>h4,picker-results .error-results>p,picker-results .no-recents>h4,picker-results .no-recents>p,picker-results .null-results>h4,picker-results .null-results>p{margin:0;max-width:none;padding:0}entity-picker-results .error-results>h4,entity-picker-results .no-recents>h4,entity-picker-results .null-results>h4,picker-results .error-results>h4,picker-results .no-recents>h4,picker-results .null-results>h4{font-weight:500}entity-picker-results section,picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:var(--color-background);color:#000}workers-comp-codes-picker-results,distribution-list-picker-results{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}workers-comp-codes-picker-results.active,distribution-list-picker-results.active{border:1px solid var(--color-selection)}workers-comp-codes-picker-results .novo-list,distribution-list-picker-results .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}workers-comp-codes-picker-results .novo-list .novo-list-item,distribution-list-picker-results .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:1px solid var(--color-border);cursor:pointer}workers-comp-codes-picker-results .novo-list .novo-list-item.disabled,distribution-list-picker-results .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6,distribution-list-picker-results .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6 span,distribution-list-picker-results .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}workers-comp-codes-picker-results .novo-list .novo-list-item>div,distribution-list-picker-results .novo-list .novo-list-item>div{width:100%;margin-left:15px}workers-comp-codes-picker-results .novo-list .novo-list-item.active,distribution-list-picker-results .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}workers-comp-codes-picker-results .novo-list .novo-list-item:hover,distribution-list-picker-results .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}workers-comp-codes-picker-results .novo-list .novo-list-item item-content,distribution-list-picker-results .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}workers-comp-codes-picker-results .novo-list .novo-list-item item-content>*,distribution-list-picker-results .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p,distribution-list-picker-results .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p .label,distribution-list-picker-results .novo-list .novo-list-item item-content p .label{font-weight:700}workers-comp-codes-picker-results .novo-list novo-loading,distribution-list-picker-results .novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results .picker-loader,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-null-results,distribution-list-picker-results .picker-loader,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-null-results{border:none}workers-comp-codes-picker-results .picker-null,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-loading,workers-comp-codes-picker-results .picker-no-recents,workers-comp-codes-picker-results .picker-error,distribution-list-picker-results .picker-null,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-loading,distribution-list-picker-results .picker-no-recents,distribution-list-picker-results .picker-error{text-align:center;padding:1em 0 4em}workers-comp-codes-picker-results .picker-null>i,workers-comp-codes-picker-results .picker-error>i,workers-comp-codes-picker-results .picker-loading>i,workers-comp-codes-picker-results .picker-no-recents>i,workers-comp-codes-picker-results .picker-error>i,distribution-list-picker-results .picker-null>i,distribution-list-picker-results .picker-error>i,distribution-list-picker-results .picker-loading>i,distribution-list-picker-results .picker-no-recents>i,distribution-list-picker-results .picker-error>i{font-size:3em;margin:.5em;color:#0000004d}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-null>p,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-error>p,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-loading>p,workers-comp-codes-picker-results .picker-no-recents>h4,workers-comp-codes-picker-results .picker-no-recents>p,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-error>p,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-null>p,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-error>p,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-loading>p,distribution-list-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-no-recents>p,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-error>p{margin:0;max-width:none;padding:0}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-no-recents>h4,workers-comp-codes-picker-results .picker-error>h4,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-error>h4{font-weight:500}workers-comp-codes-picker-results section,distribution-list-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i2$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i3$2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i4$1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "role", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2$1.NovoFieldPrefixDirective, selector: "[novoPrefix]" }, { type: i2$1.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { type: i2$1.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i6$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i6$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-picker', providers: [PICKER_VALUE_ACCESSOR], template: `
    <novo-field [appearance]="appearance">
      <novo-icon novoPrefix *ngIf="config?.entityIcon && !_value">more</novo-icon>
      <novo-icon novoPrefix *ngIf="config?.entityIcon && _value">{{ config?.entityIcon }}</novo-icon>
      <novo-icon novoSuffix *ngIf="(!_value || clearValueOnSelect) && !disablePickerInput">search</novo-icon>
      <novo-icon
        novoSuffix
        *ngIf="_value && !clearValueOnSelect && !disablePickerInput"
        [class.entity-selected]="config?.entityIcon && _value"
        (click)="clearValue(true)"
        >x</novo-icon
      >
      <input
        #input
        novoInput
        type="text"
        class="picker-input"
        [class.entity-picker]="config?.entityIcon"
        [class.entity-selected]="config?.entityIcon && _value"
        [placeholder]="placeholder"
        [(ngModel)]="term"
        (ngModelChange)="checkTerm($event)"
        (keydown)="onKeyDown($event)"
        (focus)="onFocus($event)"
        (click)="onFocus($event)"
        (blur)="onTouched($event)"
        autocomplete="off"
        [disabled]="disablePickerInput"
      />
    </novo-field>
    <novo-overlay-template class="picker-results-container" [parent]="element" position="above-below" (closing)="onOverlayClosed()">
      <span #results></span>
      <ng-content></ng-content>
    </novo-overlay-template>
  `, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;padding-bottom:5px;transition:all .2s ease-in-out;position:relative}:host.selected+i,:host.selected:hover+i{color:var(--color-selection)}:host{padding-bottom:0}:host.ng-touched.ng-invalid:not(.ng-pristine)>input,:host.ng-touched.ng-invalid:not(.ng-pristine)>input:hover,:host.ng-touched.ng-invalid:not(.ng-pristine)>input:focus{border-bottom-color:transparent!important}.picker-results,.quick-note-results,picker-results,quick-note-results{background-color:var(--color-background);cursor:default;line-height:26px;width:100%}.picker-results novo-list,.picker-results ul,.quick-note-results novo-list,.quick-note-results ul,picker-results novo-list,picker-results ul,quick-note-results novo-list,quick-note-results ul{background-color:var(--color-background);max-height:200px;overflow:auto;list-style:none;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:block}.picker-results novo-list novo-list-item,.picker-results novo-list li,.picker-results ul novo-list-item,.picker-results ul li,.quick-note-results novo-list novo-list-item,.quick-note-results novo-list li,.quick-note-results ul novo-list-item,.quick-note-results ul li,picker-results novo-list novo-list-item,picker-results novo-list li,picker-results ul novo-list-item,picker-results ul li,quick-note-results novo-list novo-list-item,quick-note-results novo-list li,quick-note-results ul novo-list-item,quick-note-results ul li{cursor:pointer;padding:5px 16px;font-size:.9em}.picker-results novo-list novo-list-item span,.picker-results novo-list li span,.picker-results ul novo-list-item span,.picker-results ul li span,.quick-note-results novo-list novo-list-item span,.quick-note-results novo-list li span,.quick-note-results ul novo-list-item span,.quick-note-results ul li span,picker-results novo-list novo-list-item span,picker-results novo-list li span,picker-results ul novo-list-item span,picker-results ul li span,quick-note-results novo-list novo-list-item span,quick-note-results novo-list li span,quick-note-results ul novo-list-item span,quick-note-results ul li span{display:inline-block;min-width:100px;margin:2px 0}.picker-results novo-list novo-list-item h6,.picker-results novo-list li h6,.picker-results ul novo-list-item h6,.picker-results ul li h6,.quick-note-results novo-list novo-list-item h6,.quick-note-results novo-list li h6,.quick-note-results ul novo-list-item h6,.quick-note-results ul li h6,picker-results novo-list novo-list-item h6,picker-results novo-list li h6,picker-results ul novo-list-item h6,picker-results ul li h6,quick-note-results novo-list novo-list-item h6,quick-note-results novo-list li h6,quick-note-results ul novo-list-item h6,quick-note-results ul li h6{padding-top:0;font-weight:400;color:var(--color-text-muted)}.picker-results novo-list novo-list-item h6 strong,.picker-results novo-list li h6 strong,.picker-results ul novo-list-item h6 strong,.picker-results ul li h6 strong,.quick-note-results novo-list novo-list-item h6 strong,.quick-note-results novo-list li h6 strong,.quick-note-results ul novo-list-item h6 strong,.quick-note-results ul li h6 strong,picker-results novo-list novo-list-item h6 strong,picker-results novo-list li h6 strong,picker-results ul novo-list-item h6 strong,picker-results ul li h6 strong,quick-note-results novo-list novo-list-item h6 strong,quick-note-results novo-list li h6 strong,quick-note-results ul novo-list-item h6 strong,quick-note-results ul li h6 strong{font-weight:400;color:var(--color-text)}.picker-results novo-list novo-list-item.active,.picker-results novo-list novo-list-item:focus,.picker-results novo-list novo-list-item:hover,.picker-results novo-list li.active,.picker-results novo-list li:focus,.picker-results novo-list li:hover,.picker-results ul novo-list-item.active,.picker-results ul novo-list-item:focus,.picker-results ul novo-list-item:hover,.picker-results ul li.active,.picker-results ul li:focus,.picker-results ul li:hover,.quick-note-results novo-list novo-list-item.active,.quick-note-results novo-list novo-list-item:focus,.quick-note-results novo-list novo-list-item:hover,.quick-note-results novo-list li.active,.quick-note-results novo-list li:focus,.quick-note-results novo-list li:hover,.quick-note-results ul novo-list-item.active,.quick-note-results ul novo-list-item:focus,.quick-note-results ul novo-list-item:hover,.quick-note-results ul li.active,.quick-note-results ul li:focus,.quick-note-results ul li:hover,picker-results novo-list novo-list-item.active,picker-results novo-list novo-list-item:focus,picker-results novo-list novo-list-item:hover,picker-results novo-list li.active,picker-results novo-list li:focus,picker-results novo-list li:hover,picker-results ul novo-list-item.active,picker-results ul novo-list-item:focus,picker-results ul novo-list-item:hover,picker-results ul li.active,picker-results ul li:focus,picker-results ul li:hover,quick-note-results novo-list novo-list-item.active,quick-note-results novo-list novo-list-item:focus,quick-note-results novo-list novo-list-item:hover,quick-note-results novo-list li.active,quick-note-results novo-list li:focus,quick-note-results novo-list li:hover,quick-note-results ul novo-list-item.active,quick-note-results ul novo-list-item:focus,quick-note-results ul novo-list-item:hover,quick-note-results ul li.active,quick-note-results ul li:focus,quick-note-results ul li:hover{background-color:var(--color-selection-overlay)}.picker-results novo-list novo-list-item.disabled,.picker-results novo-list li.disabled,.picker-results ul novo-list-item.disabled,.picker-results ul li.disabled,.quick-note-results novo-list novo-list-item.disabled,.quick-note-results novo-list li.disabled,.quick-note-results ul novo-list-item.disabled,.quick-note-results ul li.disabled,picker-results novo-list novo-list-item.disabled,picker-results novo-list li.disabled,picker-results ul novo-list-item.disabled,picker-results ul li.disabled,quick-note-results novo-list novo-list-item.disabled,quick-note-results novo-list li.disabled,quick-note-results ul novo-list-item.disabled,quick-note-results ul li.disabled{opacity:.5;pointer-events:none}.picker-results novo-list novo-list-item item-content,.picker-results novo-list li item-content,.picker-results ul novo-list-item item-content,.picker-results ul li item-content,.quick-note-results novo-list novo-list-item item-content,.quick-note-results novo-list li item-content,.quick-note-results ul novo-list-item item-content,.quick-note-results ul li item-content,picker-results novo-list novo-list-item item-content,picker-results novo-list li item-content,picker-results ul novo-list-item item-content,picker-results ul li item-content,quick-note-results novo-list novo-list-item item-content,quick-note-results novo-list li item-content,quick-note-results ul novo-list-item item-content,quick-note-results ul li item-content{display:block}.picker-results novo-list novo-loading,.picker-results ul novo-loading,.quick-note-results novo-list novo-loading,.quick-note-results ul novo-loading,picker-results novo-list novo-loading,picker-results ul novo-loading,quick-note-results novo-list novo-loading,quick-note-results ul novo-loading{justify-content:center}.picker-results ul li,.quick-note-results ul li,picker-results ul li,quick-note-results ul li{padding:10px 16px;box-sizing:border-box;display:flex;flex-wrap:wrap;flex-direction:column}.picker-results.active,.quick-note-results.active,picker-results.active,quick-note-results.active{z-index:1000}.picker-results:focus,.quick-note-results:focus,picker-results:focus,quick-note-results:focus{outline:none}.novo-list-item.disabled,entity-picker-result.disabled{opacity:.5;pointer-events:none}entity-picker-result.active>novo-list-item{background-color:var(--color-selection-overlay)}.novo-entity-picker-results{background:var(--color-background);width:100%}.novo-entity-picker-results .novo-list{background:var(--color-background)}.novo-entity-picker-results .novo-list .novo-item-content{margin-top:var(--spacing-sm);margin-left:1.8rem;row-gap:1rem}.novo-entity-picker-results .novo-list .novo-item-content .novo-text{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}.novo-entity-picker-results .novo-list novo-loading{justify-content:center}.picker-error,.picker-loader,.picker-null-recent-results,.picker-null-results{color:var(--color-text-muted);background-color:var(--color-background);border:1px solid var(--color-selection);box-shadow:var(--shadow-z2);text-align:center;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);padding:var(--spacing-sm)}p.picker-error,p.picker-loader,p.picker-null-recent-results,p.picker-null-results{max-width:inherit;padding:5px}.picker-loader{background-color:var(--color-background);display:flex;align-items:center;flex-direction:column;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1)}entity-picker-results{min-width:250px}entity-picker-results novo-list{max-height:49vh;overflow:auto}entity-picker-results,picker-results{color:#000;min-width:100%;max-width:100%;z-index:10;top:100%}entity-picker-results .novo-list,picker-results .novo-list{border:1px solid #4a89dc}entity-picker-results .novo-list .novo-list-item,picker-results .novo-list .novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}entity-picker-results .novo-list .novo-list-item>div,picker-results .novo-list .novo-list-item>div{width:100%}entity-picker-results .novo-list .novo-list-item.active,picker-results .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}entity-picker-results .novo-list .novo-list-item:hover,picker-results .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}entity-picker-results .novo-list .novo-list-item .novo-item-content,picker-results .novo-list .novo-list-item .novo-item-content{flex-flow:row wrap}entity-picker-results .novo-list .novo-list-item .novo-item-content>*,picker-results .novo-list .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}entity-picker-results .error-results,entity-picker-results .no-recents,entity-picker-results .null-results,picker-results .error-results,picker-results .no-recents,picker-results .null-results{text-align:center;padding:1em 0 4em}entity-picker-results .error-results>i,entity-picker-results .no-recents>i,entity-picker-results .null-results>i,picker-results .error-results>i,picker-results .no-recents>i,picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}entity-picker-results .error-results>h4,entity-picker-results .error-results>p,entity-picker-results .no-recents>h4,entity-picker-results .no-recents>p,entity-picker-results .null-results>h4,entity-picker-results .null-results>p,picker-results .error-results>h4,picker-results .error-results>p,picker-results .no-recents>h4,picker-results .no-recents>p,picker-results .null-results>h4,picker-results .null-results>p{margin:0;max-width:none;padding:0}entity-picker-results .error-results>h4,entity-picker-results .no-recents>h4,entity-picker-results .null-results>h4,picker-results .error-results>h4,picker-results .no-recents>h4,picker-results .null-results>h4{font-weight:500}entity-picker-results section,picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:var(--color-background);color:#000}workers-comp-codes-picker-results,distribution-list-picker-results{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}workers-comp-codes-picker-results.active,distribution-list-picker-results.active{border:1px solid var(--color-selection)}workers-comp-codes-picker-results .novo-list,distribution-list-picker-results .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}workers-comp-codes-picker-results .novo-list .novo-list-item,distribution-list-picker-results .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:1px solid var(--color-border);cursor:pointer}workers-comp-codes-picker-results .novo-list .novo-list-item.disabled,distribution-list-picker-results .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6,distribution-list-picker-results .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}workers-comp-codes-picker-results .novo-list .novo-list-item item-title h6 span,distribution-list-picker-results .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}workers-comp-codes-picker-results .novo-list .novo-list-item>div,distribution-list-picker-results .novo-list .novo-list-item>div{width:100%;margin-left:15px}workers-comp-codes-picker-results .novo-list .novo-list-item.active,distribution-list-picker-results .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}workers-comp-codes-picker-results .novo-list .novo-list-item:hover,distribution-list-picker-results .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}workers-comp-codes-picker-results .novo-list .novo-list-item item-content,distribution-list-picker-results .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}workers-comp-codes-picker-results .novo-list .novo-list-item item-content>*,distribution-list-picker-results .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p,distribution-list-picker-results .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}workers-comp-codes-picker-results .novo-list .novo-list-item item-content p .label,distribution-list-picker-results .novo-list .novo-list-item item-content p .label{font-weight:700}workers-comp-codes-picker-results .novo-list novo-loading,distribution-list-picker-results .novo-list novo-loading{justify-content:center}workers-comp-codes-picker-results .picker-loader,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-null-results,distribution-list-picker-results .picker-loader,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-null-results{border:none}workers-comp-codes-picker-results .picker-null,workers-comp-codes-picker-results .picker-error,workers-comp-codes-picker-results .picker-loading,workers-comp-codes-picker-results .picker-no-recents,workers-comp-codes-picker-results .picker-error,distribution-list-picker-results .picker-null,distribution-list-picker-results .picker-error,distribution-list-picker-results .picker-loading,distribution-list-picker-results .picker-no-recents,distribution-list-picker-results .picker-error{text-align:center;padding:1em 0 4em}workers-comp-codes-picker-results .picker-null>i,workers-comp-codes-picker-results .picker-error>i,workers-comp-codes-picker-results .picker-loading>i,workers-comp-codes-picker-results .picker-no-recents>i,workers-comp-codes-picker-results .picker-error>i,distribution-list-picker-results .picker-null>i,distribution-list-picker-results .picker-error>i,distribution-list-picker-results .picker-loading>i,distribution-list-picker-results .picker-no-recents>i,distribution-list-picker-results .picker-error>i{font-size:3em;margin:.5em;color:#0000004d}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-null>p,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-error>p,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-loading>p,workers-comp-codes-picker-results .picker-no-recents>h4,workers-comp-codes-picker-results .picker-no-recents>p,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-error>p,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-null>p,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-error>p,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-loading>p,distribution-list-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-no-recents>p,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-error>p{margin:0;max-width:none;padding:0}workers-comp-codes-picker-results .picker-null>h4,workers-comp-codes-picker-results .picker-error>h4,workers-comp-codes-picker-results .picker-loading>h4,workers-comp-codes-picker-results .picker-no-recents>h4,workers-comp-codes-picker-results .picker-error>h4,distribution-list-picker-results .picker-null>h4,distribution-list-picker-results .picker-error>h4,distribution-list-picker-results .picker-loading>h4,distribution-list-picker-results .picker-no-recents>h4,distribution-list-picker-results .picker-error>h4{font-weight:500}workers-comp-codes-picker-results section,distribution-list-picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.ComponentUtils }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { results: [{
                type: ViewChild,
                args: ['results', { read: ViewContainerRef, static: true }]
            }], config: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], clearValueOnSelect: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], selected: [{
                type: Input
            }], appendToBody: [{
                type: Input
            }], parentScrollSelector: [{
                type: Input
            }], parentScrollAction: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], side: [{
                type: Input
            }], appearance: [{
                type: Input
            }], autoSelectFirstOption: [{
                type: Input
            }], overrideElement: [{
                type: Input
            }], disablePickerInput: [{
                type: Input
            }], changed: [{
                type: Output
            }], select: [{
                type: Output
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }], typing: [{
                type: Output
            }], container: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent, { static: true }]
            }], input: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }] } });

// NG2
class NovoPickerModule {
}
NovoPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, declarations: [NovoPickerElement,
        PickerResults,
        EntityPickerResult,
        EntityPickerResults,
        ChecklistPickerResults,
        GroupedMultiPickerResults,
        MixedMultiPickerResults,
        DistributionListPickerResults,
        WorkersCompCodesPickerResults,
        SkillsSpecialtyPickerResults], imports: [CommonModule,
        NovoPipesModule,
        FormsModule,
        NovoCommonModule,
        NovoLoadingModule,
        NovoListModule,
        NovoOverlayModule,
        NovoSwitchModule,
        NovoFieldModule,
        NovoIconModule], exports: [NovoPickerElement,
        PickerResults,
        EntityPickerResult,
        EntityPickerResults,
        ChecklistPickerResults,
        GroupedMultiPickerResults,
        MixedMultiPickerResults,
        DistributionListPickerResults,
        WorkersCompCodesPickerResults,
        SkillsSpecialtyPickerResults] });
NovoPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, imports: [[
            CommonModule,
            NovoPipesModule,
            FormsModule,
            NovoCommonModule,
            NovoLoadingModule,
            NovoListModule,
            NovoOverlayModule,
            NovoSwitchModule,
            NovoFieldModule,
            NovoIconModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        NovoPipesModule,
                        FormsModule,
                        NovoCommonModule,
                        NovoLoadingModule,
                        NovoListModule,
                        NovoOverlayModule,
                        NovoSwitchModule,
                        NovoFieldModule,
                        NovoIconModule,
                    ],
                    declarations: [
                        NovoPickerElement,
                        PickerResults,
                        EntityPickerResult,
                        EntityPickerResults,
                        ChecklistPickerResults,
                        GroupedMultiPickerResults,
                        MixedMultiPickerResults,
                        DistributionListPickerResults,
                        WorkersCompCodesPickerResults,
                        SkillsSpecialtyPickerResults,
                    ],
                    exports: [
                        NovoPickerElement,
                        PickerResults,
                        EntityPickerResult,
                        EntityPickerResults,
                        ChecklistPickerResults,
                        GroupedMultiPickerResults,
                        MixedMultiPickerResults,
                        DistributionListPickerResults,
                        WorkersCompCodesPickerResults,
                        SkillsSpecialtyPickerResults,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BasePickerResults, ChecklistPickerResults, DistributionListPickerResults, EntityPickerResult, EntityPickerResults, GroupedMultiPickerResults, MixedMultiPickerResults, NovoPickerElement, NovoPickerModule, PickerResults, SkillsSpecialtyPickerResults, WorkersCompCodesPickerResults };
//# sourceMappingURL=novo-elements-components-picker.mjs.map
