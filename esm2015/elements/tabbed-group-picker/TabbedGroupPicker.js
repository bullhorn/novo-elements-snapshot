import { CdkScrollable } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NovoLabelService } from '../../services/novo-label-service';
import { binarySearch, Helpers } from '../../utils/Helpers';
export class NovoTabbedGroupPickerElement {
    constructor(labelService, ref) {
        this.labelService = labelService;
        this.ref = ref;
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
        this.displayTabs = this.tabs.map((tab) => (Object.assign({}, tab)));
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
        const selectedValues = this.tabs.map((tab) => (Object.assign(Object.assign({}, tab), { data: tab.data.filter(({ selected }) => selected) })));
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
NovoTabbedGroupPickerElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-tabbed-group-picker',
                template: "<novo-dropdown (toggled)=\"onDropdownToggle($event)\">\r\n  <button\r\n    class=\"tabbed-group-picker-button\"\r\n    [theme]=\"buttonConfig.theme\"\r\n    [side]=\"buttonConfig.side\"\r\n    [icon]=\"buttonConfig.icon\"\r\n    [loading]=\"loading\"\r\n  >\r\n    <div class=\"tabbed-group-picker-button-label\">{{ buttonConfig.label }}</div>\r\n  </button>\r\n  <div class=\"tabbed-group-picker-search\" data-automation-id=\"tabbed-group-picker-search\">\r\n    <input type=\"text\" [placeholder]=\"labelService.search\" [value]=\"filterText | async\" (input)=\"onFilter($event)\" />\r\n    <i class=\"bhi-search\" *ngIf=\"!(filterText | async)\"></i>\r\n    <i class=\"bhi-times\" *ngIf=\"(filterText | async)\" (click)=\"onClearFilter($event)\"></i>\r\n  </div>\r\n  <div class=\"tabbed-group-picker-column-container\">\r\n    <div class=\"tabbed-group-picker-column left\">\r\n      <novo-nav theme=\"white\" direction=\"vertical\">\r\n        <novo-tab *ngFor=\"let tab of displayTabs\" [attr.data-automation-id]=\"tab.typeName\" (activeChange)=\"changeTab(tab)\">\r\n          <span>{{ tab.typeLabel }} ({{ tab.data.length }})</span><i class=\"bhi-next\"></i>\r\n        </novo-tab>\r\n      </novo-nav>\r\n      <button *ngIf=\"showClearAll\" class=\"clear-all-button\" theme=\"dialogue\" icon=\"times\" side=\"right\" color=\"grapefruit\" (click)=\"deselectEverything($event)\">{{ labelService.clear }}</button>\r\n    </div>\r\n    <div class=\"tabbed-group-picker-column right\">\r\n      <div class=\"quick-select\" *ngIf=\"quickSelectConfig && !(filterText | async)\">\r\n        <div class=\"quick-select-label\">{{ quickSelectConfig.label }}</div>\r\n        <novo-list class=\"quick-select-list\" direction=\"vertical\">\r\n          <novo-list-item\r\n            class=\"quick-select-item\"\r\n            *ngFor=\"let quickSelect of quickSelectConfig.items\"\r\n            [attr.data-automation-id]=\"quickSelect.label\"\r\n            (click)=\"quickSelect.selected = !quickSelect.selected; onItemToggled(quickSelect)\"\r\n          >\r\n            <item-content>\r\n              <novo-checkbox\r\n                [label]=\"quickSelect.label\"\r\n                [name]=\"'selected'\"\r\n                [(ngModel)]=\"quickSelect.selected\"\r\n                (ngModelChange)=\"onItemToggled(quickSelect)\"\r\n              ></novo-checkbox>\r\n            </item-content>\r\n          </novo-list-item>\r\n        </novo-list>\r\n      </div>\r\n      <novo-list *ngIf=\"displayTab.data.length\" direction=\"vertical\">\r\n        <cdk-virtual-scroll-viewport\r\n          [itemSize]=\"virtualScrollItemSize\"\r\n          [maxBufferPx]=\"maxBufferPx\"\r\n          [minBufferPx]=\"minBufferPx\"\r\n          #tabbedGroupPickerVirtualScrollViewport\r\n        >\r\n          <novo-list-item\r\n            *cdkVirtualFor=\"let item of displayTab.data\"\r\n            [attr.data-automation-id]=\"item[displayTab.labelField]\"\r\n            (click)=\"item.selected = !item.selected; onItemToggled(item)\"\r\n          >\r\n            <item-content>\r\n              <novo-checkbox\r\n                [label]=\"item[displayTab.labelField]\"\r\n                [name]=\"'selected'\"\r\n                [indeterminate]=\"item.indeterminate\"\r\n                [(ngModel)]=\"item.selected\"\r\n                (ngModelChange)=\"onItemToggled(item)\"\r\n              >\r\n              </novo-checkbox>\r\n            </item-content>\r\n          </novo-list-item>\r\n        </cdk-virtual-scroll-viewport>\r\n      </novo-list>\r\n      <div class=\"tabbed-group-picker-empty-item\" *ngIf=\"!displayTab.data.length && (filterText | async)\">\r\n        <i class=\"{{ displayTab.icon || 'bhi-search' }}\"></i>\r\n        <div class=\"empty-item-main-message\">{{ labelService.tabbedGroupPickerEmpty }}</div>\r\n        <div class=\"empty-item-sub-message\">{{ labelService.tabbedGroupClearSuggestion(displayTab.typeLabel) }}</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</novo-dropdown>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoTabbedGroupPickerElement.ctorParameters = () => [
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
NovoTabbedGroupPickerElement.propDecorators = {
    scrollableInstance: [{ type: ViewChild, args: ['tabbedGroupPickerVirtualScrollViewport',] }],
    buttonConfig: [{ type: Input }],
    tabs: [{ type: Input }],
    quickSelectConfig: [{ type: Input }],
    selectionChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFiYmVkR3JvdXBQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYmJlZC1ncm91cC1waWNrZXIvVGFiYmVkR3JvdXBQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWdENUQsTUFBTSxPQUFPLDRCQUE0QjtJQXVCdkMsWUFBbUIsWUFBOEIsRUFDdkMsR0FBc0I7UUFEYixpQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUFDdkMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFoQnRCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFHdkUsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFFNUIsZUFBVSxHQUE0QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUc5RCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFOUIsb0dBQW9HO1FBQ3BHLHlCQUFvQixHQUFXLEdBQUcsQ0FBQztRQUNuQywwQkFBcUIsR0FBVyxFQUFFLENBQUM7UUFtTm5DLHFCQUFnQixHQUFHLENB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aEQsU0FBUyxTQUFDLHdDQUF3QzsyQkFHbEQsS0FBSzttQkFDTCxLQUFLO2dDQUNMLEtBQUs7OEJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka1Njcm9sbGFibGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcclxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBiaW5hcnlTZWFyY2gsIEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcclxuXHJcbmV4cG9ydCB0eXBlIFRhYmJlZEdyb3VwUGlja2VyVGFiID0ge1xyXG4gIHR5cGVOYW1lOiBzdHJpbmc7XHJcbiAgdHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgdmFsdWVGaWVsZDogc3RyaW5nO1xyXG4gIGxhYmVsRmllbGQ6IHN0cmluZztcclxuICBzY3JvbGxPZmZzZXQ/OiBudW1iZXI7XHJcbiAgaWNvbj86IHN0cmluZztcclxufSAmIChQYXJlbnRUYWIgfCBDaGlsZFRhYik7XHJcblxyXG5leHBvcnQgdHlwZSBQYXJlbnRUYWIgPSB7XHJcbiAgY2hpbGRUeXBlTmFtZTogc3RyaW5nO1xyXG4gIGRhdGE6IEFycmF5PFBhcmVudE9wdGlvbj47XHJcbn07XHJcblxyXG50eXBlIFBhcmVudE9wdGlvbiA9IHtcclxuICBzZWxlY3RlZD86IGJvb2xlYW47XHJcbiAgaW5kZXRlcm1pbmF0ZT86IGJvb2xlYW47XHJcbiAgY2hpbGRyZW46IEFycmF5PHsgc2VsZWN0ZWQ/OiBib29sZWFuIH0+O1xyXG59ICYgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcclxuXHJcbmV4cG9ydCB0eXBlIENoaWxkVGFiID0ge1xyXG4gIGRhdGE6IEFycmF5PHsgc2VsZWN0ZWQ/OiBib29sZWFuIH0gJiB7IFtrZXk6IHN0cmluZ106IGFueSB9PjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRhYmJlZEdyb3VwUGlja2VyUXVpY2tTZWxlY3QgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBzZWxlY3RlZD86IGJvb2xlYW47XHJcbiAgY2hpbGRUeXBlTmFtZT86IHN0cmluZztcclxuICBjaGlsZHJlbj86ICgoeyBzZWxlY3RlZD86IGJvb2xlYW4gfSAmIHsgW2tleTogc3RyaW5nXTogYW55IH0pIHwgKG51bWJlcikpW107XHJcbiAgYWxsPzogYm9vbGVhbjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFF1aWNrU2VsZWN0Q29uZmlnID0geyBsYWJlbDogc3RyaW5nOyBpdGVtczogVGFiYmVkR3JvdXBQaWNrZXJRdWlja1NlbGVjdFtdIH07XHJcblxyXG5leHBvcnQgdHlwZSBUYWJiZWRHcm91cFBpY2tlckJ1dHRvbkNvbmZpZyA9IHtcclxuICB0aGVtZTogc3RyaW5nO1xyXG4gIHNpZGU6IHN0cmluZztcclxuICBpY29uOiBzdHJpbmc7XHJcbiAgbGFiZWw6IHN0cmluZztcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by10YWJiZWQtZ3JvdXAtcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vVGFiYmVkR3JvdXBQaWNrZXIuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvVGFiYmVkR3JvdXBQaWNrZXJFbGVtZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xyXG4gIEBWaWV3Q2hpbGQoJ3RhYmJlZEdyb3VwUGlja2VyVmlydHVhbFNjcm9sbFZpZXdwb3J0JylcclxuICBwcml2YXRlIHNjcm9sbGFibGVJbnN0YW5jZTogQ2RrU2Nyb2xsYWJsZTtcclxuXHJcbiAgQElucHV0KCkgYnV0dG9uQ29uZmlnOiBUYWJiZWRHcm91cFBpY2tlckJ1dHRvbkNvbmZpZztcclxuICBASW5wdXQoKSB0YWJzOiBUYWJiZWRHcm91cFBpY2tlclRhYltdO1xyXG4gIEBJbnB1dCgpIHF1aWNrU2VsZWN0Q29uZmlnOiBRdWlja1NlbGVjdENvbmZpZztcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgZGlzcGxheVRhYnM6IFRhYmJlZEdyb3VwUGlja2VyVGFiW107XHJcbiAgZGlzcGxheVRhYkluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICBmaWx0ZXJUZXh0OiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoJycpO1xyXG4gIGZpbHRlclRleHRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgbG9hZGluZyA9IHRydWU7XHJcbiAgc2hvd0NsZWFyQWxsOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8vIEluaXRpYWwgaGVpZ2h0IGJhc2VkIG9uIDEzIHB4IGZvbnQgcmVuZGVyZWQgaW4gY2hyb21lLiBBY3R1YWwgaGVpZ2h0IHJldHJpZXZlZCBvbkRyb3Bkb3duVG9nZ2xlZC5cclxuICBzY3JvbGxWaWV3cG9ydEhlaWdodDogbnVtYmVyID0gMzUxO1xyXG4gIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZTogbnVtYmVyID0gMzk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbFNlcnZpY2U6IE5vdm9MYWJlbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxyXG5cclxuICBnZXQgZGlzcGxheVRhYigpOiBUYWJiZWRHcm91cFBpY2tlclRhYiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5VGFic1t0aGlzLmRpc3BsYXlUYWJJbmRleF07XHJcbiAgfVxyXG4gIHNldCBkaXNwbGF5VGFiKHRhYjogVGFiYmVkR3JvdXBQaWNrZXJUYWIpIHtcclxuICAgIHRoaXMuZGlzcGxheVRhYkluZGV4ID0gdGhpcy50YWJzLm1hcCgoeyB0eXBlTmFtZSB9KSA9PiB0eXBlTmFtZSkuaW5kZXhPZih0YWIudHlwZU5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1pbkJ1ZmZlclB4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsVmlld3BvcnRIZWlnaHQ7IC8vIHJlbmRlciBhdCBsZWFzdCAyeCB0aGUgbnVtYmVyIG9mIGl0ZW1zIHZpc2libGUgKHZpZXdwb3J0ICsgbWluIGJ1ZmZlcilcclxuICB9XHJcblxyXG4gIGdldCBtYXhCdWZmZXJQeCgpIHtcclxuICAgIHJldHVybiAyICogdGhpcy5zY3JvbGxWaWV3cG9ydEhlaWdodDsgLy8gcmVuZGVyIGF0IG1vc3QgM3ggdGhlIG51bWJlciBvZiBpdGVtcyB2aXNpYmxlICh2aWV3cG9ydCArIG1heCBidWZmZXIpXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0dXBEaXNwbGF5RGF0YSgpO1xyXG4gICAgdGhpcy5jcmVhdGVDaGlsZHJlblJlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZURlc2NlbmRhbnRTZWxlY3Rpb24oKTtcclxuICAgIHRoaXMudXBkYXRlUGFyZW50c0FuZFF1aWNrU2VsZWN0KCk7XHJcbiAgICB0aGlzLnVwZGF0ZUNsZWFyQWxsKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbHRlclRleHRTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlclRleHQucGlwZShkZWJvdW5jZVRpbWUoMzAwKSkuc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogdGhpcy5maWx0ZXIsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyVGV4dFN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLmZpbHRlclRleHRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZVRhYih0YWI6IFRhYmJlZEdyb3VwUGlja2VyVGFiKSB7XHJcbiAgICB0aGlzLmRpc3BsYXlUYWIgPSB0YWI7XHJcbiAgICBpZiAodGhpcy5zY3JvbGxhYmxlSW5zdGFuY2UpIHtcclxuICAgICAgdGhpcy5zY3JvbGxhYmxlSW5zdGFuY2Uuc2Nyb2xsVG8oeyBiZWhhdmlvcjogJ2F1dG8nLCB0b3A6IDAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRQaXhlbEhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIE51bWJlcihnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsICcnKS5oZWlnaHQubWF0Y2goLyhcXGQrKFxcLlxcZCspPylweCQvKVsxXSk7XHJcbiAgfVxyXG5cclxuICBzZXR1cERpc3BsYXlEYXRhKCk6IHZvaWQge1xyXG4gICAgLy8gc2hhbGxvdyBjb3B5IGhlcmUgc28gdGhhdCByZWFzc2lnbmluZyBkaXNwbGF5VGFic1tpXS5kYXRhIGRvZXNuJ3QgbXV0YXRlIHRhYnNbaV0uZGF0YVxyXG4gICAgLy8gYnV0IGJvdGggZGF0YSB2YWx1ZXMgcG9pbnQgdG8gdGhlIHNhbWUgaXRlbXNcclxuICAgIHRoaXMuZGlzcGxheVRhYnMgPSB0aGlzLnRhYnMubWFwKCh0YWIpID0+ICh7IC4uLnRhYiB9KSk7XHJcbiAgICB0aGlzLmRpc3BsYXlUYWIgPSB0aGlzLnRhYnNbMF07XHJcbiAgfVxyXG5cclxuICAvLyBSZXBsYWNlIGVhY2ggcGFyZW50J3MgY2hpbGQgb2JqZWN0IHdpdGggYSByZWZlcmVuY2UgdG8gdGhlIGNoaWxkIHRvIGF2b2lkXHJcbiAgLy8gYSBjaGlsZCBsb29rdXAgZm9yIHNlbGVjdGVkIHN0YXR1czsgbGlua2luZyByZWZlcmVuY2VzIGFsbG93cyBNIHggTlxyXG4gIC8vIHRpbWUgY29tcGxleGl0eSBpbnN0ZWFkIG9mIE0geCBOXjJcclxuICBjcmVhdGVDaGlsZHJlblJlZmVyZW5jZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiKSA9PiB7XHJcbiAgICAgIC8vIHdvdWxkIHJhdGhlciBmaWx0ZXIgYnV0IFR5cGVTY3JpcHQgc3RpbGwgd2FudHMgYSB0eXBlIG5hcnJvd2luZyBoZXJlXHJcbiAgICAgIGlmICgnY2hpbGRUeXBlTmFtZScgaW4gdGFiKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRUYWIgPSB0aGlzLnRhYnMuZmluZCgoeyB0eXBlTmFtZSB9KSA9PiB0eXBlTmFtZSA9PT0gdGFiLmNoaWxkVHlwZU5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBhcmVGdW5jdGlvbiA9IHRoaXMubWFrZUNvbXBhcmVGdW5jdGlvbihjaGlsZFRhYi52YWx1ZUZpZWxkKTtcclxuICAgICAgICBjb25zdCB3YXJuRnVuY3Rpb24gPSB0aGlzLm1ha2VXYXJuaW5nRnVuY3Rpb24odGFiLnR5cGVOYW1lLCBjaGlsZFRhYi50eXBlTmFtZSwgY2hpbGRUYWIudmFsdWVGaWVsZCk7XHJcbiAgICAgICAgY29uc3Qgc29ydGVkQ2hpbGRyZW4gPSBjaGlsZFRhYi5kYXRhLnNsaWNlKCkuc29ydChjb21wYXJlRnVuY3Rpb24pO1xyXG5cclxuICAgICAgICB0YWIuZGF0YVxyXG4gICAgICAgICAgLmZpbHRlcigoeyBjaGlsZHJlbiB9KSA9PiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpXHJcbiAgICAgICAgICAuZm9yRWFjaCgocGFyZW50OiB7IGNoaWxkcmVuPzogYW55W10gfSkgPT5cclxuICAgICAgICAgICAgdGhpcy5yZXBsYWNlQ2hpbGRyZW5XaXRoUmVmZXJlbmNlcyhwYXJlbnQgYXMgUGFyZW50T3B0aW9uLCBzb3J0ZWRDaGlsZHJlbiwgY29tcGFyZUZ1bmN0aW9uLCB3YXJuRnVuY3Rpb24pLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5xdWlja1NlbGVjdENvbmZpZykge1xyXG4gICAgICB0aGlzLnF1aWNrU2VsZWN0Q29uZmlnLml0ZW1zXHJcbiAgICAgICAgLmZpbHRlcigocGFyZW50KSA9PiAnYWxsJyBpbiBwYXJlbnQpXHJcbiAgICAgICAgLmZvckVhY2goKHBhcmVudCkgPT4ge1xyXG4gICAgICAgICAgcGFyZW50LmNoaWxkcmVuID0gdGhpcy50YWJzLmZpbmQoKHsgdHlwZU5hbWUgfSkgPT4gcGFyZW50LmNoaWxkVHlwZU5hbWUgPT09IHR5cGVOYW1lKS5kYXRhO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5xdWlja1NlbGVjdENvbmZpZy5pdGVtc1xyXG4gICAgICAgIC5maWx0ZXIoKHBhcmVudCkgPT4gISgnYWxsJyBpbiBwYXJlbnQpKVxyXG4gICAgICAgIC5mb3JFYWNoKChwYXJlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNoaWxkVGFiID0gdGhpcy50YWJzLmZpbmQoKHsgdHlwZU5hbWUgfSkgPT4gdHlwZU5hbWUgPT09IHBhcmVudC5jaGlsZFR5cGVOYW1lKTtcclxuICAgICAgICAgIGNvbnN0IGNvbXBhcmVGdW5jdGlvbiA9IHRoaXMubWFrZUNvbXBhcmVGdW5jdGlvbihjaGlsZFRhYi52YWx1ZUZpZWxkKTtcclxuICAgICAgICAgIGNvbnN0IHdhcm5GdW5jdGlvbiA9IHRoaXMubWFrZVdhcm5pbmdGdW5jdGlvbihwYXJlbnQubGFiZWwsIGNoaWxkVGFiLnR5cGVOYW1lLCBjaGlsZFRhYi52YWx1ZUZpZWxkKTtcclxuICAgICAgICAgIGNvbnN0IHNvcnRlZENoaWxkcmVuID0gY2hpbGRUYWIuZGF0YS5zbGljZSgpLnNvcnQoY29tcGFyZUZ1bmN0aW9uKTtcclxuXHJcbiAgICAgICAgICB0aGlzLnJlcGxhY2VDaGlsZHJlbldpdGhSZWZlcmVuY2VzKHBhcmVudCBhcyBQYXJlbnRPcHRpb24sIHNvcnRlZENoaWxkcmVuLCBjb21wYXJlRnVuY3Rpb24sIHdhcm5GdW5jdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYWtlQ29tcGFyZUZ1bmN0aW9uPFQ+KGtleTogc3RyaW5nKTogKGE6IFQgfCB7IFtrZXk6IHN0cmluZ106IFQgfSwgYjogVCB8IHsgW2tleTogc3RyaW5nXTogVCB9KSA9PiAxIHwgLTEgfCAwIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiAoYTogVCB8IHsgW2tleTogc3RyaW5nXTogVCB9LCBiOiBUIHwgeyBba2V5OiBzdHJpbmddOiBUIH0pID0+IHtcclxuICAgICAgY29uc3QgYVZhbHVlOiBUID0gKGEgJiYgYVtrZXldKSB8fCBhO1xyXG4gICAgICBjb25zdCBiVmFsdWU6IFQgPSAoYiAmJiBiW2tleV0pIHx8IGI7XHJcblxyXG4gICAgICBpZiAoYVZhbHVlIDwgYlZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICB9IGVsc2UgaWYgKGFWYWx1ZSA+IGJWYWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICB9IGVsc2UgaWYgKGFWYWx1ZSA9PT0gYlZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJlcGxhY2VDaGlsZHJlbldpdGhSZWZlcmVuY2VzKFxyXG4gICAgcGFyZW50OiB7IGNoaWxkcmVuOiBhbnlbXSB9LFxyXG4gICAgc29ydGVkRGF0YTogQ2hpbGRUYWJbJ2RhdGEnXSxcclxuICAgIGNvbXBhcmVGdW5jdGlvbjogKGEsIGIpID0+IDEgfCAtMSB8IDAsXHJcbiAgICB3YXJuRnVuY3Rpb246IChjaGlsZCkgPT4gdm9pZCxcclxuICApOiB2b2lkIHtcclxuICAgIHBhcmVudC5jaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlblxyXG4gICAgICAubWFwKChjaGlsZCkgPT4gYmluYXJ5U2VhcmNoKGNoaWxkLCBzb3J0ZWREYXRhLCBjb21wYXJlRnVuY3Rpb24pIHx8IHdhcm5GdW5jdGlvbihjaGlsZCkpXHJcbiAgICAgIC5maWx0ZXIoQm9vbGVhbik7IC8vIHNpbmNlIG1hcCBjYW4gcmV0dXJuIHVuZGVmaW5lZCwgcmVtb3ZlIHVuZGVmaW5lZCBlbGVtZW50c1xyXG4gIH1cclxuXHJcbiAgbWFrZVdhcm5pbmdGdW5jdGlvbihwYXJlbnRMYWJlbDogc3RyaW5nLCBjaGlsZExhYmVsOiBzdHJpbmcsIGNoaWxkVmFsdWVGaWVsZCk6IChjaGlsZCkgPT4gdm9pZCB7XHJcbiAgICByZXR1cm4gKGNoaWxkKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoaWxkVmFsdWUgPSBjaGlsZFtjaGlsZFZhbHVlRmllbGRdIHx8IGNoaWxkO1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vICR7Y2hpbGRMYWJlbH0gZm91bmQgd2l0aCB2YWx1ZSAke2NoaWxkVmFsdWV9IGZvciBwYXJlbnQgJHtwYXJlbnRMYWJlbH1gKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBvbkRyb3Bkb3duVG9nZ2xlKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgdGhpcy5zY3JvbGxWaWV3cG9ydEhlaWdodCA9IHRoaXMuZ2V0UGl4ZWxIZWlnaHQodGhpcy5zY3JvbGxhYmxlSW5zdGFuY2UuZ2V0RWxlbWVudFJlZigpLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB0aGlzLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZSA9IHRoaXMuZ2V0UGl4ZWxIZWlnaHQodGhpcy5zY3JvbGxhYmxlSW5zdGFuY2UuZ2V0RWxlbWVudFJlZigpLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbm92by1saXN0LWl0ZW0nKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkl0ZW1Ub2dnbGVkKGl0ZW06IHsgc2VsZWN0ZWQ/OiBib29sZWFuOyBjaGlsZHJlbj86IEFycmF5PHsgc2VsZWN0ZWQ/OiBib29sZWFuOyBjaGlsZHJlbj86IEFycmF5PHsgc2VsZWN0ZWQ/OiBib29sZWFuIH0+IH0+IH0pIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlRGVzY2VuZGFudHMoaXRlbS5zZWxlY3RlZCwgaXRlbS5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZVBhcmVudHNBbmRRdWlja1NlbGVjdCgpO1xyXG4gICAgdGhpcy51cGRhdGVDbGVhckFsbChpdGVtLnNlbGVjdGVkKTtcclxuICAgIHRoaXMuZW1pdFNlbGVjdGVkVmFsdWVzKCk7XHJcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemVEZXNjZW5kYW50U2VsZWN0aW9uKCkge1xyXG4gICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xyXG4gICAgICBpZiAoJ2NoaWxkVHlwZU5hbWUnIGluIHRhYiAmJiB0YWIuZGF0YSAmJiB0YWIuZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICB0YWIuZGF0YS5mb3JFYWNoKChwYXJlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChwYXJlbnQuc2VsZWN0ZWQgJiYgcGFyZW50LmNoaWxkcmVuICYmIHBhcmVudC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgY2hpbGQuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEZXNjZW5kYW50cyhwYXJlbnRJc1NlbGVjdGVkOiBib29sZWFuLCBjaGlsZHJlbjogQXJyYXk8eyBzZWxlY3RlZD86IGJvb2xlYW47IGNoaWxkcmVuPzogQXJyYXk8eyBzZWxlY3RlZD86IGJvb2xlYW4gfT4gfT4pOiB2b2lkIHtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgcGFyZW50SXNTZWxlY3RlZCA/IChpdGVtLnNlbGVjdGVkID0gdHJ1ZSkgOiBkZWxldGUgaXRlbS5zZWxlY3RlZDtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZURlc2NlbmRhbnRzKGl0ZW0uc2VsZWN0ZWQsIGl0ZW0uY2hpbGRyZW4pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNsZWFyQWxsKGl0ZW1XYXNKdXN0U2VsZWN0ZWQ/OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNob3dDbGVhckFsbCA9IGl0ZW1XYXNKdXN0U2VsZWN0ZWRcclxuICAgICAgPyB0cnVlXHJcbiAgICAgIDogdGhpcy50YWJzLnNvbWUoKHRhYikgPT4ge1xyXG4gICAgICAgIGlmICgodGFiIGFzIFBhcmVudFRhYikuY2hpbGRUeXBlTmFtZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRhYi5kYXRhLnNvbWUoKHsgc2VsZWN0ZWQsIGluZGV0ZXJtaW5hdGUgfSkgPT4gc2VsZWN0ZWQgfHwgaW5kZXRlcm1pbmF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0YWIuZGF0YS5zb21lKCh7IHNlbGVjdGVkIH0pID0+IHNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGFyZW50c0FuZFF1aWNrU2VsZWN0KCk6IHZvaWQge1xyXG4gICAgLy8gbXV0YXRlIGhlcmUgdG8gYXZvaWQgZGVyZWZlcmVuY2luZyB0aGUgb2JqZWN0cyBpbiBkaXNwbGF5VGFic1xyXG4gICAgdGhpcy50YWJzXHJcbiAgICAgIC5maWx0ZXIoKHRhYikgPT4gJ2NoaWxkVHlwZU5hbWUnIGluIHRhYiAmJiAhIXRhYi5jaGlsZFR5cGVOYW1lKVxyXG4gICAgICAuZm9yRWFjaCgodGFiKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50cyA9IHRhYi5kYXRhLmZpbHRlcigoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuPzogYW55W10gfSkgPT4gY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgcGFyZW50cy5mb3JFYWNoKChwYXJlbnQ6IHsgY2hpbGRyZW4/OiB7IHNlbGVjdGVkPzogYm9vbGVhbiB9W10gfSkgPT4ge1xyXG4gICAgICAgICAgWydpbmRldGVybWluYXRlJywgJ3NlbGVjdGVkJ10uZm9yRWFjaCgoc2VsZWN0ZWRTdGF0ZU9wdGlvbikgPT4gZGVsZXRlIHBhcmVudFtzZWxlY3RlZFN0YXRlT3B0aW9uXSk7XHJcblxyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRTdGF0ZSA9IHRoaXMuZ2V0U2VsZWN0ZWRTdGF0ZShwYXJlbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgaWYgKHNlbGVjdGVkU3RhdGUpIHtcclxuICAgICAgICAgICAgcGFyZW50W3NlbGVjdGVkU3RhdGVdID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMucXVpY2tTZWxlY3RDb25maWcpIHtcclxuICAgICAgdGhpcy5xdWlja1NlbGVjdENvbmZpZy5pdGVtcy5mb3JFYWNoKChxdWlja1NlbGVjdCkgPT4ge1xyXG4gICAgICAgIGRlbGV0ZSBxdWlja1NlbGVjdC5zZWxlY3RlZDtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZFN0YXRlID0gdGhpcy5nZXRTZWxlY3RlZFN0YXRlKHF1aWNrU2VsZWN0LmNoaWxkcmVuIGFzICh7IHNlbGVjdGVkPzogYm9vbGVhbiB9ICYgeyBba2V5OiBzdHJpbmddOiBhbnkgfSlbXSk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkU3RhdGUpIHtcclxuICAgICAgICAgIHF1aWNrU2VsZWN0W3NlbGVjdGVkU3RhdGVdID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0ZWRTdGF0ZSA9IChjaGlsZEFycmF5OiB7IHNlbGVjdGVkPzogYm9vbGVhbjsgaW5kZXRlcm1pbmF0ZT86IGJvb2xlYW4gfVtdKTogJ3NlbGVjdGVkJyB8ICdpbmRldGVybWluYXRlJyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgICBjb25zdCBudW1iZXJPZlNlbGVjdGVkSXRlbXMgPSBjaGlsZEFycmF5LmZpbHRlcigoeyBzZWxlY3RlZCB9KSA9PiBzZWxlY3RlZCkubGVuZ3RoO1xyXG4gICAgaWYgKCFudW1iZXJPZlNlbGVjdGVkSXRlbXMpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiBudW1iZXJPZlNlbGVjdGVkSXRlbXMgPT09IGNoaWxkQXJyYXkubGVuZ3RoID8gJ3NlbGVjdGVkJyA6ICdpbmRldGVybWluYXRlJztcclxuICB9O1xyXG5cclxuICBlbWl0U2VsZWN0ZWRWYWx1ZXMoKSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZFZhbHVlczogVGFiYmVkR3JvdXBQaWNrZXJUYWJbXSA9IHRoaXMudGFicy5tYXAoKHRhYikgPT4gKHtcclxuICAgICAgLi4udGFiLFxyXG4gICAgICBkYXRhOiB0YWIuZGF0YS5maWx0ZXIoKHsgc2VsZWN0ZWQgfSkgPT4gc2VsZWN0ZWQpLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChzZWxlY3RlZFZhbHVlcyk7XHJcbiAgfVxyXG5cclxuICBkZXNlbGVjdEV2ZXJ5dGhpbmcoZXZlbnQpIHtcclxuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMuc2hvd0NsZWFyQWxsID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5xdWlja1NlbGVjdENvbmZpZykge1xyXG4gICAgICB0aGlzLnF1aWNrU2VsZWN0Q29uZmlnLml0ZW1zLmZvckVhY2goKHF1aWNrU2VsZWN0KSA9PiB7XHJcbiAgICAgICAgZGVsZXRlIHF1aWNrU2VsZWN0LnNlbGVjdGVkO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWIpID0+IHtcclxuICAgICAgaWYgKCh0YWIgYXMgUGFyZW50VGFiKS5jaGlsZFR5cGVOYW1lKSB7XHJcbiAgICAgICAgdGFiLmRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgZGVsZXRlIGl0ZW0uc2VsZWN0ZWQ7XHJcbiAgICAgICAgICBkZWxldGUgaXRlbS5pbmRldGVybWluYXRlO1xyXG4gICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gZGVsZXRlIGNoaWxkLnNlbGVjdGVkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAodGFiIGFzIENoaWxkVGFiKS5kYXRhLmZvckVhY2goKGl0ZW0pID0+IGRlbGV0ZSBpdGVtLnNlbGVjdGVkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmVtaXRTZWxlY3RlZFZhbHVlcygpO1xyXG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBvbkNsZWFyRmlsdGVyKGV2ZW50KSB7XHJcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmZpbHRlclRleHQubmV4dCgnJyk7XHJcbiAgfVxyXG5cclxuICBvbkZpbHRlcihldmVudDogeyB0YXJnZXQ6IHsgdmFsdWU6IHN0cmluZyB9IH0pIHtcclxuICAgIHRoaXMuZmlsdGVyVGV4dC5uZXh0KGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXIgPSAoc2VhcmNoVGVybTogc3RyaW5nKSA9PiB7XHJcbiAgICB0aGlzLmRpc3BsYXlUYWJzLmZvckVhY2goXHJcbiAgICAgIChkaXNwbGF5VGFiLCBpKSA9PlxyXG4gICAgICAgIChkaXNwbGF5VGFiLmRhdGEgPSB0aGlzLnRhYnNbaV0uZGF0YS5maWx0ZXIoKGl0ZW0pID0+XHJcbiAgICAgICAgICBpdGVtW2Rpc3BsYXlUYWIubGFiZWxGaWVsZF0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpLFxyXG4gICAgICAgICkpLFxyXG4gICAgKTtcclxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH07XHJcbn1cclxuIl19