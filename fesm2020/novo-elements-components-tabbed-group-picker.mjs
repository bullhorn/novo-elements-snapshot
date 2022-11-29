import * as i6 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewChild, Input, Output, NgModule } from '@angular/core';
import * as i5 from 'novo-elements/common';
import { NOVO_OPTION_PARENT_COMPONENT, NovoOptionModule } from 'novo-elements/common';
import * as i1 from 'novo-elements/services';
import { NovoLabelService } from 'novo-elements/services';
import { binarySearch, Helpers } from 'novo-elements/utils';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i2 from 'novo-elements/components/dropdown';
import { NovoDropdownModule } from 'novo-elements/components/dropdown';
import * as i3 from 'novo-elements/components/button';
import { NovoButtonModule } from 'novo-elements/components/button';
import * as i4 from 'novo-elements/components/tabs';
import { NovoTabModule } from 'novo-elements/components/tabs';
import * as i7 from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NovoListModule } from 'novo-elements/components/list';
import { NovoFormExtrasModule } from 'novo-elements/components/form/extras';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';

class NovoTabbedGroupPickerElement {
    constructor(labelService, ref) {
        this.labelService = labelService;
        this.ref = ref;
        this.multiple = true;
        this.selectionChange = new EventEmitter();
        this.displayTabIndex = 0;
        this.filterText = new BehaviorSubject('');
        this.loading = true;
        this.showClearAll = false;
        // Initial height based on 13 px font rendered in chrome. Actual height retrieved onDropdownToggled.
        this.scrollViewportHeight = 351;
        this.virtualScrollItemSize = 39;
        this.getSelectedState = (childArray) => {
            const numberOfSelectedItems = childArray.filter(({ selected }) => selected).length;
            if (!numberOfSelectedItems) {
                return undefined;
            }
            return numberOfSelectedItems === childArray.length ? 'selected' : 'indeterminate';
        };
        this.filter = (searchTerm) => {
            this.displayTabs.forEach((displayTab, i) => (displayTab.data = this.tabs[i].data.filter((item) => item[displayTab.labelField].toLowerCase().includes(searchTerm.toLowerCase()))));
            this.ref.markForCheck();
        };
    }
    get displayTab() {
        return this.displayTabs[this.displayTabIndex];
    }
    set displayTab(tab) {
        this.displayTabIndex = this.tabs.map(({ typeName }) => typeName).indexOf(tab.typeName);
    }
    get minBufferPx() {
        return this.scrollViewportHeight; // render at least 2x the number of items visible (viewport + min buffer)
    }
    get maxBufferPx() {
        return 2 * this.scrollViewportHeight; // render at most 3x the number of items visible (viewport + max buffer)
    }
    ngOnInit() {
        this.setupDisplayData();
        this.createChildrenReferences();
        this.initializeDescendantSelection();
        this.updateParentsAndQuickSelect();
        this.updateClearAll();
        this.loading = false;
        this.filterTextSubscription = this.filterText.pipe(debounceTime(300)).subscribe({
            next: this.filter,
        });
    }
    ngOnDestroy() {
        if (this.filterTextSubscription) {
            this.filterTextSubscription.unsubscribe();
        }
    }
    changeTab(tab) {
        this.displayTab = tab;
        if (this.scrollableInstance) {
            this.scrollableInstance.scrollTo({ behavior: 'auto', top: 0 });
        }
    }
    getPixelHeight(element) {
        return Number(getComputedStyle(element, '').height.match(/(\d+(\.\d+)?)px$/)[1]);
    }
    setupDisplayData() {
        // shallow copy here so that reassigning displayTabs[i].data doesn't mutate tabs[i].data
        // but both data values point to the same items
        this.displayTabs = this.tabs.map((tab) => ({ ...tab }));
        this.displayTab = this.tabs[0];
    }
    // Replace each parent's child object with a reference to the child to avoid
    // a child lookup for selected status; linking references allows M x N
    // time complexity instead of M x N^2
    createChildrenReferences() {
        this.tabs.forEach((tab) => {
            // would rather filter but TypeScript still wants a type narrowing here
            if ('childTypeName' in tab) {
                const childTab = this.tabs.find(({ typeName }) => typeName === tab.childTypeName);
                const compareFunction = this.makeCompareFunction(childTab.valueField);
                const warnFunction = this.makeWarningFunction(tab.typeName, childTab.typeName, childTab.valueField);
                const sortedChildren = childTab.data.slice().sort(compareFunction);
                tab.data
                    .filter(({ children }) => children && children.length)
                    .forEach((parent) => this.replaceChildrenWithReferences(parent, sortedChildren, compareFunction, warnFunction));
            }
        });
        if (this.quickSelectConfig) {
            this.quickSelectConfig.items
                .filter((parent) => 'all' in parent)
                .forEach((parent) => {
                parent.children = this.tabs.find(({ typeName }) => parent.childTypeName === typeName).data;
            });
            this.quickSelectConfig.items
                .filter((parent) => !('all' in parent))
                .forEach((parent) => {
                const childTab = this.tabs.find(({ typeName }) => typeName === parent.childTypeName);
                const compareFunction = this.makeCompareFunction(childTab.valueField);
                const warnFunction = this.makeWarningFunction(parent.label, childTab.typeName, childTab.valueField);
                const sortedChildren = childTab.data.slice().sort(compareFunction);
                this.replaceChildrenWithReferences(parent, sortedChildren, compareFunction, warnFunction);
            });
        }
    }
    makeCompareFunction(key) {
        return (a, b) => {
            const aValue = (a && a[key]) || a;
            const bValue = (b && b[key]) || b;
            if (aValue < bValue) {
                return -1;
            }
            else if (aValue > bValue) {
                return 1;
            }
            else if (aValue === bValue) {
                return 0;
            }
            else {
                return undefined;
            }
        };
    }
    replaceChildrenWithReferences(parent, sortedData, compareFunction, warnFunction) {
        parent.children = parent.children
            .map((child) => binarySearch(child, sortedData, compareFunction) || warnFunction(child))
            .filter(Boolean); // since map can return undefined, remove undefined elements
    }
    makeWarningFunction(parentLabel, childLabel, childValueField) {
        return (child) => {
            const childValue = child[childValueField] || child;
            console.warn(`No ${childLabel} found with value ${childValue} for parent ${parentLabel}`);
        };
    }
    onDropdownToggle(event) {
        if (event) {
            this.scrollViewportHeight = this.getPixelHeight(this.scrollableInstance.getElementRef().nativeElement);
            this.virtualScrollItemSize = this.getPixelHeight(this.scrollableInstance.getElementRef().nativeElement.querySelector('novo-list-item'));
        }
    }
    onItemToggled(item) {
        if (Array.isArray(item.children)) {
            this.updateDescendants(item.selected, item.children);
        }
        this.updateParentsAndQuickSelect();
        this.updateClearAll(item.selected);
        this.emitSelectedValues();
        this.ref.markForCheck();
    }
    initializeDescendantSelection() {
        this.tabs.forEach((tab) => {
            if ('childTypeName' in tab && tab.data && tab.data.length) {
                tab.data.forEach((parent) => {
                    if (parent.selected && parent.children && parent.children.length) {
                        parent.children.forEach((child) => {
                            child.selected = true;
                        });
                    }
                });
            }
        });
    }
    updateDescendants(parentIsSelected, children) {
        children.forEach((item) => {
            parentIsSelected ? (item.selected = true) : delete item.selected;
            if (Array.isArray(item.children)) {
                this.updateDescendants(item.selected, item.children);
            }
        });
    }
    updateClearAll(itemWasJustSelected) {
        this.showClearAll = itemWasJustSelected
            ? true
            : this.tabs.some((tab) => {
                if (tab.childTypeName) {
                    return tab.data.some(({ selected, indeterminate }) => selected || indeterminate);
                }
                else {
                    return tab.data.some(({ selected }) => selected);
                }
            });
    }
    updateParentsAndQuickSelect() {
        // mutate here to avoid dereferencing the objects in displayTabs
        this.tabs
            .filter((tab) => 'childTypeName' in tab && !!tab.childTypeName)
            .forEach((tab) => {
            const parents = tab.data.filter(({ children }) => children && children.length);
            parents.forEach((parent) => {
                ['indeterminate', 'selected'].forEach((selectedStateOption) => delete parent[selectedStateOption]);
                const selectedState = this.getSelectedState(parent.children);
                if (selectedState) {
                    parent[selectedState] = true;
                }
            });
        });
        if (this.quickSelectConfig) {
            this.quickSelectConfig.items.forEach((quickSelect) => {
                delete quickSelect.selected;
                const selectedState = this.getSelectedState(quickSelect.children);
                if (selectedState) {
                    quickSelect[selectedState] = true;
                }
            });
        }
    }
    emitSelectedValues() {
        const selectedValues = this.tabs.map((tab) => ({
            ...tab,
            data: tab.data.filter(({ selected }) => selected),
        }));
        this.selectionChange.emit(selectedValues);
    }
    deselectEverything(event) {
        Helpers.swallowEvent(event);
        this.showClearAll = false;
        if (this.quickSelectConfig) {
            this.quickSelectConfig.items.forEach((quickSelect) => {
                delete quickSelect.selected;
            });
        }
        this.tabs.forEach((tab) => {
            if (tab.childTypeName) {
                tab.data.forEach((item) => {
                    delete item.selected;
                    delete item.indeterminate;
                    item.children.forEach((child) => delete child.selected);
                });
            }
            else {
                tab.data.forEach((item) => delete item.selected);
            }
        });
        this.emitSelectedValues();
        this.ref.markForCheck();
    }
    onClearFilter(event) {
        Helpers.swallowEvent(event);
        this.filterText.next('');
    }
    onFilter(event) {
        this.filterText.next(event.target.value);
    }
}
NovoTabbedGroupPickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTabbedGroupPickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTabbedGroupPickerElement, selector: "novo-tabbed-group-picker", inputs: { buttonConfig: "buttonConfig", tabs: "tabs", quickSelectConfig: "quickSelectConfig" }, outputs: { selectionChange: "selectionChange" }, providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoTabbedGroupPickerElement }], viewQueries: [{ propertyName: "scrollableInstance", first: true, predicate: ["tabbedGroupPickerVirtualScrollViewport"], descendants: true }], ngImport: i0, template: "<novo-dropdown (toggled)=\"onDropdownToggle($event)\" multiple>\n  <novo-button\n    class=\"tabbed-group-picker-button\"\n    [theme]=\"buttonConfig.theme\"\n    [side]=\"buttonConfig.side\"\n    [icon]=\"buttonConfig.icon\"\n    [loading]=\"loading\">\n    <div class=\"tabbed-group-picker-button-label\">{{ buttonConfig.label }}</div>\n  </novo-button>\n  <div class=\"tabbed-group-picker-search\" data-automation-id=\"tabbed-group-picker-search\">\n    <input type=\"text\" [placeholder]=\"labelService.search\" [value]=\"filterText | async\" (input)=\"onFilter($event)\" />\n    <i class=\"bhi-search\" *ngIf=\"!(filterText | async)\"></i>\n    <i class=\"bhi-times\" *ngIf=\"(filterText | async)\" (click)=\"onClearFilter($event)\"></i>\n  </div>\n  <div class=\"tabbed-group-picker-column-container\">\n    <div class=\"tabbed-group-picker-column left\">\n      <novo-nav theme=\"white\" direction=\"vertical\">\n        <novo-tab *ngFor=\"let tab of displayTabs\" [attr.data-automation-id]=\"tab.typeName\"\n          (activeChange)=\"changeTab(tab)\">\n          <span>{{ tab.typeLabel }} ({{ tab.data.length }})</span><i class=\"bhi-next\"></i>\n        </novo-tab>\n      </novo-nav>\n      <novo-button *ngIf=\"showClearAll\" class=\"clear-all-button\" theme=\"dialogue\" icon=\"times\" side=\"right\"\n        color=\"grapefruit\" (click)=\"deselectEverything($event)\">{{ labelService.clear }}</novo-button>\n    </div>\n    <div class=\"tabbed-group-picker-column right\">\n      <div class=\"quick-select\" *ngIf=\"quickSelectConfig && !(filterText | async)\">\n        <!-- <div class=\"quick-select-label\">{{ quickSelectConfig.label }}</div> -->\n        <novo-optgroup class=\"quick-select-list\" [label]=\"quickSelectConfig.label\">\n          <novo-option\n            class=\"quick-select-item\"\n            *ngFor=\"let quickSelect of quickSelectConfig.items\"\n            [attr.data-automation-id]=\"quickSelect.label\"\n            [selected]=\"quickSelect.selected\"\n            (click)=\"quickSelect.selected = !quickSelect.selected; onItemToggled(quickSelect)\"\n            novoInert>\n            {{quickSelect.label}}\n            <!-- <novo-checkbox\n              [label]=\"quickSelect.label\"\n              [name]=\"'selected'\"\n              [(ngModel)]=\"quickSelect.selected\"\n              (ngModelChange)=\"onItemToggled(quickSelect)\"></novo-checkbox> -->\n          </novo-option>\n        </novo-optgroup>\n      </div>\n      <novo-optgroup *ngIf=\"displayTab.data.length\">\n        <cdk-virtual-scroll-viewport\n          [itemSize]=\"virtualScrollItemSize\"\n          [maxBufferPx]=\"maxBufferPx\"\n          [minBufferPx]=\"minBufferPx\"\n          #tabbedGroupPickerVirtualScrollViewport>\n          <novo-option\n            *cdkVirtualFor=\"let item of displayTab.data\"\n            [attr.data-automation-id]=\"item[displayTab.labelField]\"\n            [selected]=\"item.selected\"\n            (click)=\"item.selected = !item.selected; onItemToggled(item)\"\n            novoInert>\n            {{item[displayTab.labelField]}}\n\n            <!-- <novo-checkbox\n              [label]=\"item[displayTab.labelField]\"\n              [name]=\"'selected'\"\n              [indeterminate]=\"item.indeterminate\"\n              [(ngModel)]=\"item.selected\"\n              (ngModelChange)=\"onItemToggled(item)\">\n            </novo-checkbox> -->\n          </novo-option>\n        </cdk-virtual-scroll-viewport>\n      </novo-optgroup>\n      <div class=\"tabbed-group-picker-empty-item\" *ngIf=\"!displayTab.data.length && (filterText | async)\">\n        <i class=\"{{ displayTab.icon || 'bhi-search' }}\"></i>\n        <div class=\"empty-item-main-message\">{{ labelService.tabbedGroupPickerEmpty }}</div>\n        <div class=\"empty-item-sub-message\">{{ labelService.tabbedGroupClearSuggestion(displayTab.typeLabel) }}\n        </div>\n      </div>\n    </div>\n  </div>\n</novo-dropdown>", styles: [".tabbed-group-picker-button .tabbed-group-picker-button-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:100px;width:100%}.tabbed-group-picker-search{width:100%;padding:.5em;border-bottom:.1em solid #ccc;position:relative}.tabbed-group-picker-search input{font-size:1.2em;background:transparent;border:none;border-radius:0;outline:none;height:2rem;width:95%;margin:0 0 0 1em;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--color-text)}.tabbed-group-picker-search input::-moz-placeholder{color:var(--form-placeholder)}.tabbed-group-picker-search input::placeholder{color:var(--form-placeholder)}.tabbed-group-picker-search i.bhi-search,.tabbed-group-picker-search i.bhi-times{position:absolute;bottom:1em;right:.5em;color:var(--color-text-muted);font-size:1.2rem;margin-right:1em}.tabbed-group-picker-search i.bhi-times{cursor:pointer}.tabbed-group-picker-column-container{display:flex;flex-direction:row}.tabbed-group-picker-column-container .tabbed-group-picker-column{display:flex;flex-direction:column;align-items:center}.tabbed-group-picker-column-container .tabbed-group-picker-column.left{border-right:1px solid var(--color-border);justify-content:space-between}.tabbed-group-picker-column-container .tabbed-group-picker-column.left .clear-all-button{margin-bottom:.5em}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav{overflow:auto}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab{min-height:3em}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab>.novo-tab-link{max-width:100%;height:100%;display:flex;justify-content:space-between;align-items:center}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab.active .novo-tab-link{font-weight:400}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab.active:hover .novo-tab-link{font-weight:400;color:var(--color-selection)}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab:hover .novo-tab-link{font-weight:400;color:var(--color-selection-tint);opacity:1}.tabbed-group-picker-column-container .tabbed-group-picker-column.right{display:block;width:23em;overflow:hidden}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select{font-weight:500}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select .quick-select-label{padding:.7em 1.9em 0;background:var(--color-text-muted);text-transform:uppercase;font-size:.8em}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select .quick-select-list .quick-select-item{background:var(--color-text-muted);padding:.5em 1.75em;border-bottom:none}.tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup cdk-virtual-scroll-viewport{height:27em;overflow-x:hidden}@media (max-height: 720px){.tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup cdk-virtual-scroll-viewport{height:18em}}.tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup novo-option:hover.novo-option-inert{background:var(--color-background-secondary)}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item{display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--color-text-muted);width:100%;height:27em}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item i{padding-bottom:.2em;font-size:3em}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item .empty-item-main-message{font-weight:500;color:var(--color-text)}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item .empty-item-sub-message{font-size:.9em}\n"], components: [{ type: i2.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i3.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }, { type: i4.NovoNavElement, selector: "novo-nav", inputs: ["theme", "direction", "outlet", "router", "condensed", "selectedIndex"], outputs: ["selectedIndexChange"] }, { type: i4.NovoTabElement, selector: "novo-tab", inputs: ["active", "color", "disabled"], outputs: ["activeChange"] }, { type: i5.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i6.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i6.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }], pipes: { "async": i7.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tabbed-group-picker', changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoTabbedGroupPickerElement }], template: "<novo-dropdown (toggled)=\"onDropdownToggle($event)\" multiple>\n  <novo-button\n    class=\"tabbed-group-picker-button\"\n    [theme]=\"buttonConfig.theme\"\n    [side]=\"buttonConfig.side\"\n    [icon]=\"buttonConfig.icon\"\n    [loading]=\"loading\">\n    <div class=\"tabbed-group-picker-button-label\">{{ buttonConfig.label }}</div>\n  </novo-button>\n  <div class=\"tabbed-group-picker-search\" data-automation-id=\"tabbed-group-picker-search\">\n    <input type=\"text\" [placeholder]=\"labelService.search\" [value]=\"filterText | async\" (input)=\"onFilter($event)\" />\n    <i class=\"bhi-search\" *ngIf=\"!(filterText | async)\"></i>\n    <i class=\"bhi-times\" *ngIf=\"(filterText | async)\" (click)=\"onClearFilter($event)\"></i>\n  </div>\n  <div class=\"tabbed-group-picker-column-container\">\n    <div class=\"tabbed-group-picker-column left\">\n      <novo-nav theme=\"white\" direction=\"vertical\">\n        <novo-tab *ngFor=\"let tab of displayTabs\" [attr.data-automation-id]=\"tab.typeName\"\n          (activeChange)=\"changeTab(tab)\">\n          <span>{{ tab.typeLabel }} ({{ tab.data.length }})</span><i class=\"bhi-next\"></i>\n        </novo-tab>\n      </novo-nav>\n      <novo-button *ngIf=\"showClearAll\" class=\"clear-all-button\" theme=\"dialogue\" icon=\"times\" side=\"right\"\n        color=\"grapefruit\" (click)=\"deselectEverything($event)\">{{ labelService.clear }}</novo-button>\n    </div>\n    <div class=\"tabbed-group-picker-column right\">\n      <div class=\"quick-select\" *ngIf=\"quickSelectConfig && !(filterText | async)\">\n        <!-- <div class=\"quick-select-label\">{{ quickSelectConfig.label }}</div> -->\n        <novo-optgroup class=\"quick-select-list\" [label]=\"quickSelectConfig.label\">\n          <novo-option\n            class=\"quick-select-item\"\n            *ngFor=\"let quickSelect of quickSelectConfig.items\"\n            [attr.data-automation-id]=\"quickSelect.label\"\n            [selected]=\"quickSelect.selected\"\n            (click)=\"quickSelect.selected = !quickSelect.selected; onItemToggled(quickSelect)\"\n            novoInert>\n            {{quickSelect.label}}\n            <!-- <novo-checkbox\n              [label]=\"quickSelect.label\"\n              [name]=\"'selected'\"\n              [(ngModel)]=\"quickSelect.selected\"\n              (ngModelChange)=\"onItemToggled(quickSelect)\"></novo-checkbox> -->\n          </novo-option>\n        </novo-optgroup>\n      </div>\n      <novo-optgroup *ngIf=\"displayTab.data.length\">\n        <cdk-virtual-scroll-viewport\n          [itemSize]=\"virtualScrollItemSize\"\n          [maxBufferPx]=\"maxBufferPx\"\n          [minBufferPx]=\"minBufferPx\"\n          #tabbedGroupPickerVirtualScrollViewport>\n          <novo-option\n            *cdkVirtualFor=\"let item of displayTab.data\"\n            [attr.data-automation-id]=\"item[displayTab.labelField]\"\n            [selected]=\"item.selected\"\n            (click)=\"item.selected = !item.selected; onItemToggled(item)\"\n            novoInert>\n            {{item[displayTab.labelField]}}\n\n            <!-- <novo-checkbox\n              [label]=\"item[displayTab.labelField]\"\n              [name]=\"'selected'\"\n              [indeterminate]=\"item.indeterminate\"\n              [(ngModel)]=\"item.selected\"\n              (ngModelChange)=\"onItemToggled(item)\">\n            </novo-checkbox> -->\n          </novo-option>\n        </cdk-virtual-scroll-viewport>\n      </novo-optgroup>\n      <div class=\"tabbed-group-picker-empty-item\" *ngIf=\"!displayTab.data.length && (filterText | async)\">\n        <i class=\"{{ displayTab.icon || 'bhi-search' }}\"></i>\n        <div class=\"empty-item-main-message\">{{ labelService.tabbedGroupPickerEmpty }}</div>\n        <div class=\"empty-item-sub-message\">{{ labelService.tabbedGroupClearSuggestion(displayTab.typeLabel) }}\n        </div>\n      </div>\n    </div>\n  </div>\n</novo-dropdown>", styles: [".tabbed-group-picker-button .tabbed-group-picker-button-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:100px;width:100%}.tabbed-group-picker-search{width:100%;padding:.5em;border-bottom:.1em solid #ccc;position:relative}.tabbed-group-picker-search input{font-size:1.2em;background:transparent;border:none;border-radius:0;outline:none;height:2rem;width:95%;margin:0 0 0 1em;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--color-text)}.tabbed-group-picker-search input::-moz-placeholder{color:var(--form-placeholder)}.tabbed-group-picker-search input::placeholder{color:var(--form-placeholder)}.tabbed-group-picker-search i.bhi-search,.tabbed-group-picker-search i.bhi-times{position:absolute;bottom:1em;right:.5em;color:var(--color-text-muted);font-size:1.2rem;margin-right:1em}.tabbed-group-picker-search i.bhi-times{cursor:pointer}.tabbed-group-picker-column-container{display:flex;flex-direction:row}.tabbed-group-picker-column-container .tabbed-group-picker-column{display:flex;flex-direction:column;align-items:center}.tabbed-group-picker-column-container .tabbed-group-picker-column.left{border-right:1px solid var(--color-border);justify-content:space-between}.tabbed-group-picker-column-container .tabbed-group-picker-column.left .clear-all-button{margin-bottom:.5em}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav{overflow:auto}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab{min-height:3em}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab>.novo-tab-link{max-width:100%;height:100%;display:flex;justify-content:space-between;align-items:center}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab.active .novo-tab-link{font-weight:400}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab.active:hover .novo-tab-link{font-weight:400;color:var(--color-selection)}.tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab:hover .novo-tab-link{font-weight:400;color:var(--color-selection-tint);opacity:1}.tabbed-group-picker-column-container .tabbed-group-picker-column.right{display:block;width:23em;overflow:hidden}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select{font-weight:500}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select .quick-select-label{padding:.7em 1.9em 0;background:var(--color-text-muted);text-transform:uppercase;font-size:.8em}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select .quick-select-list .quick-select-item{background:var(--color-text-muted);padding:.5em 1.75em;border-bottom:none}.tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup cdk-virtual-scroll-viewport{height:27em;overflow-x:hidden}@media (max-height: 720px){.tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup cdk-virtual-scroll-viewport{height:18em}}.tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup novo-option:hover.novo-option-inert{background:var(--color-background-secondary)}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item{display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--color-text-muted);width:100%;height:27em}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item i{padding-bottom:.2em;font-size:3em}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item .empty-item-main-message{font-weight:500;color:var(--color-text)}.tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item .empty-item-sub-message{font-size:.9em}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { scrollableInstance: [{
                type: ViewChild,
                args: ['tabbedGroupPickerVirtualScrollViewport']
            }], buttonConfig: [{
                type: Input
            }], tabs: [{
                type: Input
            }], quickSelectConfig: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });

// NG2
class NovoTabbedGroupPickerModule {
}
NovoTabbedGroupPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTabbedGroupPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerModule, declarations: [NovoTabbedGroupPickerElement], imports: [CommonModule,
        FormsModule,
        ScrollingModule,
        NovoTabModule,
        NovoListModule,
        NovoFormExtrasModule,
        NovoButtonModule,
        NovoDropdownModule,
        NovoOptionModule,
        NovoCheckboxModule], exports: [NovoTabbedGroupPickerElement] });
NovoTabbedGroupPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerModule, providers: [NovoLabelService], imports: [[
            CommonModule,
            FormsModule,
            ScrollingModule,
            NovoTabModule,
            NovoListModule,
            NovoFormExtrasModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoOptionModule,
            NovoCheckboxModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ScrollingModule,
                        NovoTabModule,
                        NovoListModule,
                        NovoFormExtrasModule,
                        NovoButtonModule,
                        NovoDropdownModule,
                        NovoOptionModule,
                        NovoCheckboxModule,
                    ],
                    providers: [NovoLabelService],
                    declarations: [NovoTabbedGroupPickerElement],
                    exports: [NovoTabbedGroupPickerElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoTabbedGroupPickerElement, NovoTabbedGroupPickerModule };
//# sourceMappingURL=novo-elements-components-tabbed-group-picker.mjs.map
