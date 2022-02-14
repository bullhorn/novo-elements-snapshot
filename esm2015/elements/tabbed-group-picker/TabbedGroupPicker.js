import { CdkScrollable } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NovoLabelService } from '../../services/novo-label-service';
import { binarySearch, Helpers } from '../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../dropdown/Dropdown";
import * as i3 from "../button/Button";
import * as i4 from "@angular/common";
import * as i5 from "../tabs/Tabs";
import * as i6 from "../list/List";
import * as i7 from "../form/extras/checkbox/Checkbox";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/cdk/scrolling";
const _c0 = ["tabbedGroupPickerVirtualScrollViewport"];
function NovoTabbedGroupPickerElement_i_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 16);
} }
function NovoTabbedGroupPickerElement_i_9_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 17);
    i0.ɵɵlistener("click", function NovoTabbedGroupPickerElement_i_9_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.onClearFilter($event); });
    i0.ɵɵelementEnd();
} }
function NovoTabbedGroupPickerElement_novo_tab_14_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-tab", 18);
    i0.ɵɵlistener("activeChange", function NovoTabbedGroupPickerElement_novo_tab_14_Template_novo_tab_activeChange_0_listener() { i0.ɵɵrestoreView(_r11); const tab_r9 = ctx.$implicit; const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.changeTab(tab_r9); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "i", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r9 = ctx.$implicit;
    i0.ɵɵattribute("data-automation-id", tab_r9.typeName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", tab_r9.typeLabel, " (", tab_r9.data.length, ")");
} }
function NovoTabbedGroupPickerElement_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function NovoTabbedGroupPickerElement_button_15_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.deselectEverything($event); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r3.labelService.clear);
} }
function NovoTabbedGroupPickerElement_div_17_novo_list_item_4_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 25);
    i0.ɵɵlistener("click", function NovoTabbedGroupPickerElement_div_17_novo_list_item_4_Template_novo_list_item_click_0_listener() { i0.ɵɵrestoreView(_r17); const quickSelect_r15 = ctx.$implicit; const ctx_r16 = i0.ɵɵnextContext(2); quickSelect_r15.selected = !quickSelect_r15.selected; return ctx_r16.onItemToggled(quickSelect_r15); });
    i0.ɵɵelementStart(1, "item-content");
    i0.ɵɵelementStart(2, "novo-checkbox", 26);
    i0.ɵɵlistener("ngModelChange", function NovoTabbedGroupPickerElement_div_17_novo_list_item_4_Template_novo_checkbox_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r17); const quickSelect_r15 = ctx.$implicit; return quickSelect_r15.selected = $event; })("ngModelChange", function NovoTabbedGroupPickerElement_div_17_novo_list_item_4_Template_novo_checkbox_ngModelChange_2_listener() { i0.ɵɵrestoreView(_r17); const quickSelect_r15 = ctx.$implicit; const ctx_r19 = i0.ɵɵnextContext(2); return ctx_r19.onItemToggled(quickSelect_r15); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const quickSelect_r15 = ctx.$implicit;
    i0.ɵɵattribute("data-automation-id", quickSelect_r15.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", quickSelect_r15.label)("name", "selected")("ngModel", quickSelect_r15.selected);
} }
function NovoTabbedGroupPickerElement_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "novo-list", 23);
    i0.ɵɵtemplate(4, NovoTabbedGroupPickerElement_div_17_novo_list_item_4_Template, 3, 4, "novo-list-item", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.quickSelectConfig.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r4.quickSelectConfig.items);
} }
function NovoTabbedGroupPickerElement_novo_list_19_novo_list_item_3_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 31);
    i0.ɵɵlistener("click", function NovoTabbedGroupPickerElement_novo_list_19_novo_list_item_3_Template_novo_list_item_click_0_listener() { i0.ɵɵrestoreView(_r24); const item_r22 = ctx.$implicit; const ctx_r23 = i0.ɵɵnextContext(2); item_r22.selected = !item_r22.selected; return ctx_r23.onItemToggled(item_r22); });
    i0.ɵɵelementStart(1, "item-content");
    i0.ɵɵelementStart(2, "novo-checkbox", 32);
    i0.ɵɵlistener("ngModelChange", function NovoTabbedGroupPickerElement_novo_list_19_novo_list_item_3_Template_novo_checkbox_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r24); const item_r22 = ctx.$implicit; return item_r22.selected = $event; })("ngModelChange", function NovoTabbedGroupPickerElement_novo_list_19_novo_list_item_3_Template_novo_checkbox_ngModelChange_2_listener() { i0.ɵɵrestoreView(_r24); const item_r22 = ctx.$implicit; const ctx_r26 = i0.ɵɵnextContext(2); return ctx_r26.onItemToggled(item_r22); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r22 = ctx.$implicit;
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-automation-id", item_r22[ctx_r21.displayTab.labelField]);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", item_r22[ctx_r21.displayTab.labelField])("name", "selected")("indeterminate", item_r22.indeterminate)("ngModel", item_r22.selected);
} }
function NovoTabbedGroupPickerElement_novo_list_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-list", 27);
    i0.ɵɵelementStart(1, "cdk-virtual-scroll-viewport", 28, 29);
    i0.ɵɵtemplate(3, NovoTabbedGroupPickerElement_novo_list_19_novo_list_item_3_Template, 3, 5, "novo-list-item", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("itemSize", ctx_r5.virtualScrollItemSize)("maxBufferPx", ctx_r5.maxBufferPx)("minBufferPx", ctx_r5.minBufferPx);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("cdkVirtualForOf", ctx_r5.displayTab.data);
} }
function NovoTabbedGroupPickerElement_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵelement(1, "i");
    i0.ɵɵelementStart(2, "div", 34);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 35);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(ctx_r6.displayTab.icon || "bhi-search");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r6.labelService.tabbedGroupPickerEmpty);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r6.labelService.tabbedGroupClearSuggestion(ctx_r6.displayTab.typeLabel));
} }
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
NovoTabbedGroupPickerElement.ɵfac = function NovoTabbedGroupPickerElement_Factory(t) { return new (t || NovoTabbedGroupPickerElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoTabbedGroupPickerElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoTabbedGroupPickerElement, selectors: [["novo-tabbed-group-picker"]], viewQuery: function NovoTabbedGroupPickerElement_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.scrollableInstance = _t.first);
    } }, inputs: { buttonConfig: "buttonConfig", tabs: "tabs", quickSelectConfig: "quickSelectConfig" }, outputs: { selectionChange: "selectionChange" }, decls: 22, vars: 24, consts: [[3, "toggled"], [1, "tabbed-group-picker-button", 3, "theme", "side", "icon", "loading"], [1, "tabbed-group-picker-button-label"], ["data-automation-id", "tabbed-group-picker-search", 1, "tabbed-group-picker-search"], ["type", "text", 3, "placeholder", "value", "input"], ["class", "bhi-search", 4, "ngIf"], ["class", "bhi-times", 3, "click", 4, "ngIf"], [1, "tabbed-group-picker-column-container"], [1, "tabbed-group-picker-column", "left"], ["theme", "white", "direction", "vertical"], [3, "activeChange", 4, "ngFor", "ngForOf"], ["class", "clear-all-button", "theme", "dialogue", "icon", "times", "side", "right", "color", "grapefruit", 3, "click", 4, "ngIf"], [1, "tabbed-group-picker-column", "right"], ["class", "quick-select", 4, "ngIf"], ["direction", "vertical", 4, "ngIf"], ["class", "tabbed-group-picker-empty-item", 4, "ngIf"], [1, "bhi-search"], [1, "bhi-times", 3, "click"], [3, "activeChange"], [1, "bhi-next"], ["theme", "dialogue", "icon", "times", "side", "right", "color", "grapefruit", 1, "clear-all-button", 3, "click"], [1, "quick-select"], [1, "quick-select-label"], ["direction", "vertical", 1, "quick-select-list"], ["class", "quick-select-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "quick-select-item", 3, "click"], [3, "label", "name", "ngModel", "ngModelChange"], ["direction", "vertical"], [3, "itemSize", "maxBufferPx", "minBufferPx"], ["tabbedGroupPickerVirtualScrollViewport", ""], [3, "click", 4, "cdkVirtualFor", "cdkVirtualForOf"], [3, "click"], [3, "label", "name", "indeterminate", "ngModel", "ngModelChange"], [1, "tabbed-group-picker-empty-item"], [1, "empty-item-main-message"], [1, "empty-item-sub-message"]], template: function NovoTabbedGroupPickerElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-dropdown", 0);
        i0.ɵɵlistener("toggled", function NovoTabbedGroupPickerElement_Template_novo_dropdown_toggled_0_listener($event) { return ctx.onDropdownToggle($event); });
        i0.ɵɵelementStart(1, "button", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "div", 3);
        i0.ɵɵelementStart(5, "input", 4);
        i0.ɵɵlistener("input", function NovoTabbedGroupPickerElement_Template_input_input_5_listener($event) { return ctx.onFilter($event); });
        i0.ɵɵpipe(6, "async");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(7, NovoTabbedGroupPickerElement_i_7_Template, 1, 0, "i", 5);
        i0.ɵɵpipe(8, "async");
        i0.ɵɵtemplate(9, NovoTabbedGroupPickerElement_i_9_Template, 1, 0, "i", 6);
        i0.ɵɵpipe(10, "async");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 7);
        i0.ɵɵelementStart(12, "div", 8);
        i0.ɵɵelementStart(13, "novo-nav", 9);
        i0.ɵɵtemplate(14, NovoTabbedGroupPickerElement_novo_tab_14_Template, 4, 3, "novo-tab", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, NovoTabbedGroupPickerElement_button_15_Template, 2, 1, "button", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "div", 12);
        i0.ɵɵtemplate(17, NovoTabbedGroupPickerElement_div_17_Template, 5, 2, "div", 13);
        i0.ɵɵpipe(18, "async");
        i0.ɵɵtemplate(19, NovoTabbedGroupPickerElement_novo_list_19_Template, 4, 4, "novo-list", 14);
        i0.ɵɵtemplate(20, NovoTabbedGroupPickerElement_div_20_Template, 6, 5, "div", 15);
        i0.ɵɵpipe(21, "async");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("theme", ctx.buttonConfig.theme)("side", ctx.buttonConfig.side)("icon", ctx.buttonConfig.icon)("loading", ctx.loading);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.buttonConfig.label);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("placeholder", ctx.labelService.search)("value", i0.ɵɵpipeBind1(6, 14, ctx.filterText));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !i0.ɵɵpipeBind1(8, 16, ctx.filterText));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(10, 18, ctx.filterText));
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngForOf", ctx.displayTabs);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showClearAll);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.quickSelectConfig && !i0.ɵɵpipeBind1(18, 20, ctx.filterText));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.displayTab.data.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.displayTab.data.length && i0.ɵɵpipeBind1(21, 22, ctx.filterText));
    } }, directives: [i2.NovoDropdownElement, i3.NovoButtonElement, i4.NgIf, i5.NovoNavElement, i4.NgForOf, i5.NovoTabElement, i6.NovoListElement, i6.NovoListItemElement, i6.NovoItemContentElement, i7.NovoCheckboxElement, i8.NgControlStatus, i8.NgModel, i9.CdkVirtualScrollViewport, i9.CdkFixedSizeVirtualScroll, i9.CdkVirtualForOf], pipes: [i4.AsyncPipe], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTabbedGroupPickerElement, [{
        type: Component,
        args: [{
                selector: 'novo-tabbed-group-picker',
                templateUrl: './TabbedGroupPicker.html',
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, { scrollableInstance: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFiYmVkR3JvdXBQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGFiYmVkLWdyb3VwLXBpY2tlci9UYWJiZWRHcm91cFBpY2tlci50cyIsImVsZW1lbnRzL3RhYmJlZC1ncm91cC1waWNrZXIvVGFiYmVkR3JvdXBQaWNrZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7OztJQ0h4RCx3QkFBd0Q7Ozs7SUFDeEQsNkJBQXNGO0lBQXBDLHdNQUErQjtJQUFDLGlCQUFJOzs7O0lBS2xGLG9DQUNFO0lBRGlGLDRQQUErQjtJQUNoSCw0QkFBTTtJQUFBLFlBQTJDO0lBQUEsaUJBQU87SUFBQSx3QkFBd0I7SUFDbEYsaUJBQVc7OztJQUYrQixxREFBd0M7SUFDMUUsZUFBMkM7SUFBM0MsMEVBQTJDOzs7O0lBR3JELGtDQUF5SjtJQUFyQywyTkFBb0M7SUFBQyxZQUF3QjtJQUFBLGlCQUFTOzs7SUFBakMsZUFBd0I7SUFBeEIsK0NBQXdCOzs7O0lBTTdLLDBDQU1FO0lBRkEsNlVBQWtG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d0M7WUFHMUMsWUFBWTtrQkFBcEIsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLGlCQUFpQjtrQkFBekIsS0FBSztZQUVJLGVBQWU7a0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtTY3JvbGxhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IGJpbmFyeVNlYXJjaCwgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG5leHBvcnQgdHlwZSBUYWJiZWRHcm91cFBpY2tlclRhYiA9IHtcbiAgdHlwZU5hbWU6IHN0cmluZztcbiAgdHlwZUxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlRmllbGQ6IHN0cmluZztcbiAgbGFiZWxGaWVsZDogc3RyaW5nO1xuICBzY3JvbGxPZmZzZXQ/OiBudW1iZXI7XG4gIGljb24/OiBzdHJpbmc7XG59ICYgKFBhcmVudFRhYiB8IENoaWxkVGFiKTtcblxuZXhwb3J0IHR5cGUgUGFyZW50VGFiID0ge1xuICBjaGlsZFR5cGVOYW1lOiBzdHJpbmc7XG4gIGRhdGE6IEFycmF5PFBhcmVudE9wdGlvbj47XG59O1xuXG50eXBlIFBhcmVudE9wdGlvbiA9IHtcbiAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICBpbmRldGVybWluYXRlPzogYm9vbGVhbjtcbiAgY2hpbGRyZW46IEFycmF5PHsgc2VsZWN0ZWQ/OiBib29sZWFuIH0+O1xufSAmIHsgW2tleTogc3RyaW5nXTogYW55IH07XG5cbmV4cG9ydCB0eXBlIENoaWxkVGFiID0ge1xuICBkYXRhOiBBcnJheTx7IHNlbGVjdGVkPzogYm9vbGVhbiB9ICYgeyBba2V5OiBzdHJpbmddOiBhbnkgfT47XG59O1xuXG5leHBvcnQgdHlwZSBUYWJiZWRHcm91cFBpY2tlclF1aWNrU2VsZWN0ID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBzZWxlY3RlZD86IGJvb2xlYW47XG4gIGNoaWxkVHlwZU5hbWU/OiBzdHJpbmc7XG4gIGNoaWxkcmVuPzogKCh7IHNlbGVjdGVkPzogYm9vbGVhbiB9ICYgeyBba2V5OiBzdHJpbmddOiBhbnkgfSkgfCBudW1iZXIpW107XG4gIGFsbD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBRdWlja1NlbGVjdENvbmZpZyA9IHsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IFRhYmJlZEdyb3VwUGlja2VyUXVpY2tTZWxlY3RbXSB9O1xuXG5leHBvcnQgdHlwZSBUYWJiZWRHcm91cFBpY2tlckJ1dHRvbkNvbmZpZyA9IHtcbiAgdGhlbWU6IHN0cmluZztcbiAgc2lkZTogc3RyaW5nO1xuICBpY29uOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYmJlZC1ncm91cC1waWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vVGFiYmVkR3JvdXBQaWNrZXIuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFiYmVkR3JvdXBQaWNrZXJFbGVtZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBAVmlld0NoaWxkKCd0YWJiZWRHcm91cFBpY2tlclZpcnR1YWxTY3JvbGxWaWV3cG9ydCcpXG4gIHByaXZhdGUgc2Nyb2xsYWJsZUluc3RhbmNlOiBDZGtTY3JvbGxhYmxlO1xuXG4gIEBJbnB1dCgpIGJ1dHRvbkNvbmZpZzogVGFiYmVkR3JvdXBQaWNrZXJCdXR0b25Db25maWc7XG4gIEBJbnB1dCgpIHRhYnM6IFRhYmJlZEdyb3VwUGlja2VyVGFiW107XG4gIEBJbnB1dCgpIHF1aWNrU2VsZWN0Q29uZmlnOiBRdWlja1NlbGVjdENvbmZpZztcblxuICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGRpc3BsYXlUYWJzOiBUYWJiZWRHcm91cFBpY2tlclRhYltdO1xuICBkaXNwbGF5VGFiSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgZmlsdGVyVGV4dDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcbiAgZmlsdGVyVGV4dFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGxvYWRpbmcgPSB0cnVlO1xuICBzaG93Q2xlYXJBbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBJbml0aWFsIGhlaWdodCBiYXNlZCBvbiAxMyBweCBmb250IHJlbmRlcmVkIGluIGNocm9tZS4gQWN0dWFsIGhlaWdodCByZXRyaWV2ZWQgb25Ecm9wZG93blRvZ2dsZWQuXG4gIHNjcm9sbFZpZXdwb3J0SGVpZ2h0OiBudW1iZXIgPSAzNTE7XG4gIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZTogbnVtYmVyID0gMzk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsU2VydmljZTogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIGdldCBkaXNwbGF5VGFiKCk6IFRhYmJlZEdyb3VwUGlja2VyVGFiIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5VGFic1t0aGlzLmRpc3BsYXlUYWJJbmRleF07XG4gIH1cbiAgc2V0IGRpc3BsYXlUYWIodGFiOiBUYWJiZWRHcm91cFBpY2tlclRhYikge1xuICAgIHRoaXMuZGlzcGxheVRhYkluZGV4ID0gdGhpcy50YWJzLm1hcCgoeyB0eXBlTmFtZSB9KSA9PiB0eXBlTmFtZSkuaW5kZXhPZih0YWIudHlwZU5hbWUpO1xuICB9XG5cbiAgZ2V0IG1pbkJ1ZmZlclB4KCkge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbFZpZXdwb3J0SGVpZ2h0OyAvLyByZW5kZXIgYXQgbGVhc3QgMnggdGhlIG51bWJlciBvZiBpdGVtcyB2aXNpYmxlICh2aWV3cG9ydCArIG1pbiBidWZmZXIpXG4gIH1cblxuICBnZXQgbWF4QnVmZmVyUHgoKSB7XG4gICAgcmV0dXJuIDIgKiB0aGlzLnNjcm9sbFZpZXdwb3J0SGVpZ2h0OyAvLyByZW5kZXIgYXQgbW9zdCAzeCB0aGUgbnVtYmVyIG9mIGl0ZW1zIHZpc2libGUgKHZpZXdwb3J0ICsgbWF4IGJ1ZmZlcilcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0dXBEaXNwbGF5RGF0YSgpO1xuICAgIHRoaXMuY3JlYXRlQ2hpbGRyZW5SZWZlcmVuY2VzKCk7XG4gICAgdGhpcy5pbml0aWFsaXplRGVzY2VuZGFudFNlbGVjdGlvbigpO1xuICAgIHRoaXMudXBkYXRlUGFyZW50c0FuZFF1aWNrU2VsZWN0KCk7XG4gICAgdGhpcy51cGRhdGVDbGVhckFsbCgpO1xuXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5maWx0ZXJUZXh0U3Vic2NyaXB0aW9uID0gdGhpcy5maWx0ZXJUZXh0LnBpcGUoZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiB0aGlzLmZpbHRlcixcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZpbHRlclRleHRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZmlsdGVyVGV4dFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZVRhYih0YWI6IFRhYmJlZEdyb3VwUGlja2VyVGFiKSB7XG4gICAgdGhpcy5kaXNwbGF5VGFiID0gdGFiO1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVJbnN0YW5jZSkge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlSW5zdGFuY2Uuc2Nyb2xsVG8oeyBiZWhhdmlvcjogJ2F1dG8nLCB0b3A6IDAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UGl4ZWxIZWlnaHQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgJycpLmhlaWdodC5tYXRjaCgvKFxcZCsoXFwuXFxkKyk/KXB4JC8pWzFdKTtcbiAgfVxuXG4gIHNldHVwRGlzcGxheURhdGEoKTogdm9pZCB7XG4gICAgLy8gc2hhbGxvdyBjb3B5IGhlcmUgc28gdGhhdCByZWFzc2lnbmluZyBkaXNwbGF5VGFic1tpXS5kYXRhIGRvZXNuJ3QgbXV0YXRlIHRhYnNbaV0uZGF0YVxuICAgIC8vIGJ1dCBib3RoIGRhdGEgdmFsdWVzIHBvaW50IHRvIHRoZSBzYW1lIGl0ZW1zXG4gICAgdGhpcy5kaXNwbGF5VGFicyA9IHRoaXMudGFicy5tYXAoKHRhYikgPT4gKHsgLi4udGFiIH0pKTtcbiAgICB0aGlzLmRpc3BsYXlUYWIgPSB0aGlzLnRhYnNbMF07XG4gIH1cblxuICAvLyBSZXBsYWNlIGVhY2ggcGFyZW50J3MgY2hpbGQgb2JqZWN0IHdpdGggYSByZWZlcmVuY2UgdG8gdGhlIGNoaWxkIHRvIGF2b2lkXG4gIC8vIGEgY2hpbGQgbG9va3VwIGZvciBzZWxlY3RlZCBzdGF0dXM7IGxpbmtpbmcgcmVmZXJlbmNlcyBhbGxvd3MgTSB4IE5cbiAgLy8gdGltZSBjb21wbGV4aXR5IGluc3RlYWQgb2YgTSB4IE5eMlxuICBjcmVhdGVDaGlsZHJlblJlZmVyZW5jZXMoKTogdm9pZCB7XG4gICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgLy8gd291bGQgcmF0aGVyIGZpbHRlciBidXQgVHlwZVNjcmlwdCBzdGlsbCB3YW50cyBhIHR5cGUgbmFycm93aW5nIGhlcmVcbiAgICAgIGlmICgnY2hpbGRUeXBlTmFtZScgaW4gdGFiKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkVGFiID0gdGhpcy50YWJzLmZpbmQoKHsgdHlwZU5hbWUgfSkgPT4gdHlwZU5hbWUgPT09IHRhYi5jaGlsZFR5cGVOYW1lKTtcbiAgICAgICAgY29uc3QgY29tcGFyZUZ1bmN0aW9uID0gdGhpcy5tYWtlQ29tcGFyZUZ1bmN0aW9uKGNoaWxkVGFiLnZhbHVlRmllbGQpO1xuICAgICAgICBjb25zdCB3YXJuRnVuY3Rpb24gPSB0aGlzLm1ha2VXYXJuaW5nRnVuY3Rpb24odGFiLnR5cGVOYW1lLCBjaGlsZFRhYi50eXBlTmFtZSwgY2hpbGRUYWIudmFsdWVGaWVsZCk7XG4gICAgICAgIGNvbnN0IHNvcnRlZENoaWxkcmVuID0gY2hpbGRUYWIuZGF0YS5zbGljZSgpLnNvcnQoY29tcGFyZUZ1bmN0aW9uKTtcblxuICAgICAgICB0YWIuZGF0YVxuICAgICAgICAgIC5maWx0ZXIoKHsgY2hpbGRyZW4gfSkgPT4gY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKVxuICAgICAgICAgIC5mb3JFYWNoKChwYXJlbnQ6IHsgY2hpbGRyZW4/OiBhbnlbXSB9KSA9PlxuICAgICAgICAgICAgdGhpcy5yZXBsYWNlQ2hpbGRyZW5XaXRoUmVmZXJlbmNlcyhwYXJlbnQgYXMgUGFyZW50T3B0aW9uLCBzb3J0ZWRDaGlsZHJlbiwgY29tcGFyZUZ1bmN0aW9uLCB3YXJuRnVuY3Rpb24pLFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMucXVpY2tTZWxlY3RDb25maWcpIHtcbiAgICAgIHRoaXMucXVpY2tTZWxlY3RDb25maWcuaXRlbXNcbiAgICAgICAgLmZpbHRlcigocGFyZW50KSA9PiAnYWxsJyBpbiBwYXJlbnQpXG4gICAgICAgIC5mb3JFYWNoKChwYXJlbnQpID0+IHtcbiAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4gPSB0aGlzLnRhYnMuZmluZCgoeyB0eXBlTmFtZSB9KSA9PiBwYXJlbnQuY2hpbGRUeXBlTmFtZSA9PT0gdHlwZU5hbWUpLmRhdGE7XG4gICAgICAgIH0pO1xuXG4gICAgICB0aGlzLnF1aWNrU2VsZWN0Q29uZmlnLml0ZW1zXG4gICAgICAgIC5maWx0ZXIoKHBhcmVudCkgPT4gISgnYWxsJyBpbiBwYXJlbnQpKVxuICAgICAgICAuZm9yRWFjaCgocGFyZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hpbGRUYWIgPSB0aGlzLnRhYnMuZmluZCgoeyB0eXBlTmFtZSB9KSA9PiB0eXBlTmFtZSA9PT0gcGFyZW50LmNoaWxkVHlwZU5hbWUpO1xuICAgICAgICAgIGNvbnN0IGNvbXBhcmVGdW5jdGlvbiA9IHRoaXMubWFrZUNvbXBhcmVGdW5jdGlvbihjaGlsZFRhYi52YWx1ZUZpZWxkKTtcbiAgICAgICAgICBjb25zdCB3YXJuRnVuY3Rpb24gPSB0aGlzLm1ha2VXYXJuaW5nRnVuY3Rpb24ocGFyZW50LmxhYmVsLCBjaGlsZFRhYi50eXBlTmFtZSwgY2hpbGRUYWIudmFsdWVGaWVsZCk7XG4gICAgICAgICAgY29uc3Qgc29ydGVkQ2hpbGRyZW4gPSBjaGlsZFRhYi5kYXRhLnNsaWNlKCkuc29ydChjb21wYXJlRnVuY3Rpb24pO1xuXG4gICAgICAgICAgdGhpcy5yZXBsYWNlQ2hpbGRyZW5XaXRoUmVmZXJlbmNlcyhwYXJlbnQgYXMgUGFyZW50T3B0aW9uLCBzb3J0ZWRDaGlsZHJlbiwgY29tcGFyZUZ1bmN0aW9uLCB3YXJuRnVuY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBtYWtlQ29tcGFyZUZ1bmN0aW9uPFQ+KGtleTogc3RyaW5nKTogKGE6IFQgfCB7IFtrZXk6IHN0cmluZ106IFQgfSwgYjogVCB8IHsgW2tleTogc3RyaW5nXTogVCB9KSA9PiAxIHwgLTEgfCAwIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gKGE6IFQgfCB7IFtrZXk6IHN0cmluZ106IFQgfSwgYjogVCB8IHsgW2tleTogc3RyaW5nXTogVCB9KSA9PiB7XG4gICAgICBjb25zdCBhVmFsdWU6IFQgPSAoYSAmJiBhW2tleV0pIHx8IGE7XG4gICAgICBjb25zdCBiVmFsdWU6IFQgPSAoYiAmJiBiW2tleV0pIHx8IGI7XG5cbiAgICAgIGlmIChhVmFsdWUgPCBiVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfSBlbHNlIGlmIChhVmFsdWUgPiBiVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2UgaWYgKGFWYWx1ZSA9PT0gYlZhbHVlKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmVwbGFjZUNoaWxkcmVuV2l0aFJlZmVyZW5jZXMoXG4gICAgcGFyZW50OiB7IGNoaWxkcmVuOiBhbnlbXSB9LFxuICAgIHNvcnRlZERhdGE6IENoaWxkVGFiWydkYXRhJ10sXG4gICAgY29tcGFyZUZ1bmN0aW9uOiAoYSwgYikgPT4gMSB8IC0xIHwgMCxcbiAgICB3YXJuRnVuY3Rpb246IChjaGlsZCkgPT4gdm9pZCxcbiAgKTogdm9pZCB7XG4gICAgcGFyZW50LmNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuXG4gICAgICAubWFwKChjaGlsZCkgPT4gYmluYXJ5U2VhcmNoKGNoaWxkLCBzb3J0ZWREYXRhLCBjb21wYXJlRnVuY3Rpb24pIHx8IHdhcm5GdW5jdGlvbihjaGlsZCkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pOyAvLyBzaW5jZSBtYXAgY2FuIHJldHVybiB1bmRlZmluZWQsIHJlbW92ZSB1bmRlZmluZWQgZWxlbWVudHNcbiAgfVxuXG4gIG1ha2VXYXJuaW5nRnVuY3Rpb24ocGFyZW50TGFiZWw6IHN0cmluZywgY2hpbGRMYWJlbDogc3RyaW5nLCBjaGlsZFZhbHVlRmllbGQpOiAoY2hpbGQpID0+IHZvaWQge1xuICAgIHJldHVybiAoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkVmFsdWUgPSBjaGlsZFtjaGlsZFZhbHVlRmllbGRdIHx8IGNoaWxkO1xuICAgICAgY29uc29sZS53YXJuKGBObyAke2NoaWxkTGFiZWx9IGZvdW5kIHdpdGggdmFsdWUgJHtjaGlsZFZhbHVlfSBmb3IgcGFyZW50ICR7cGFyZW50TGFiZWx9YCk7XG4gICAgfTtcbiAgfVxuXG4gIG9uRHJvcGRvd25Ub2dnbGUoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuc2Nyb2xsVmlld3BvcnRIZWlnaHQgPSB0aGlzLmdldFBpeGVsSGVpZ2h0KHRoaXMuc2Nyb2xsYWJsZUluc3RhbmNlLmdldEVsZW1lbnRSZWYoKS5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1TaXplID0gdGhpcy5nZXRQaXhlbEhlaWdodChcbiAgICAgICAgdGhpcy5zY3JvbGxhYmxlSW5zdGFuY2UuZ2V0RWxlbWVudFJlZigpLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbm92by1saXN0LWl0ZW0nKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgb25JdGVtVG9nZ2xlZChpdGVtOiB7IHNlbGVjdGVkPzogYm9vbGVhbjsgY2hpbGRyZW4/OiBBcnJheTx7IHNlbGVjdGVkPzogYm9vbGVhbjsgY2hpbGRyZW4/OiBBcnJheTx7IHNlbGVjdGVkPzogYm9vbGVhbiB9PiB9PiB9KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS5jaGlsZHJlbikpIHtcbiAgICAgIHRoaXMudXBkYXRlRGVzY2VuZGFudHMoaXRlbS5zZWxlY3RlZCwgaXRlbS5jaGlsZHJlbik7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlUGFyZW50c0FuZFF1aWNrU2VsZWN0KCk7XG4gICAgdGhpcy51cGRhdGVDbGVhckFsbChpdGVtLnNlbGVjdGVkKTtcbiAgICB0aGlzLmVtaXRTZWxlY3RlZFZhbHVlcygpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZURlc2NlbmRhbnRTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgaWYgKCdjaGlsZFR5cGVOYW1lJyBpbiB0YWIgJiYgdGFiLmRhdGEgJiYgdGFiLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIHRhYi5kYXRhLmZvckVhY2goKHBhcmVudCkgPT4ge1xuICAgICAgICAgIGlmIChwYXJlbnQuc2VsZWN0ZWQgJiYgcGFyZW50LmNoaWxkcmVuICYmIHBhcmVudC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICBjaGlsZC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRGVzY2VuZGFudHMocGFyZW50SXNTZWxlY3RlZDogYm9vbGVhbiwgY2hpbGRyZW46IEFycmF5PHsgc2VsZWN0ZWQ/OiBib29sZWFuOyBjaGlsZHJlbj86IEFycmF5PHsgc2VsZWN0ZWQ/OiBib29sZWFuIH0+IH0+KTogdm9pZCB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgcGFyZW50SXNTZWxlY3RlZCA/IChpdGVtLnNlbGVjdGVkID0gdHJ1ZSkgOiBkZWxldGUgaXRlbS5zZWxlY3RlZDtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRGVzY2VuZGFudHMoaXRlbS5zZWxlY3RlZCwgaXRlbS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVDbGVhckFsbChpdGVtV2FzSnVzdFNlbGVjdGVkPzogYm9vbGVhbikge1xuICAgIHRoaXMuc2hvd0NsZWFyQWxsID0gaXRlbVdhc0p1c3RTZWxlY3RlZFxuICAgICAgPyB0cnVlXG4gICAgICA6IHRoaXMudGFicy5zb21lKCh0YWIpID0+IHtcbiAgICAgICAgICBpZiAoKHRhYiBhcyBQYXJlbnRUYWIpLmNoaWxkVHlwZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0YWIuZGF0YS5zb21lKCh7IHNlbGVjdGVkLCBpbmRldGVybWluYXRlIH0pID0+IHNlbGVjdGVkIHx8IGluZGV0ZXJtaW5hdGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGFiLmRhdGEuc29tZSgoeyBzZWxlY3RlZCB9KSA9PiBzZWxlY3RlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVBhcmVudHNBbmRRdWlja1NlbGVjdCgpOiB2b2lkIHtcbiAgICAvLyBtdXRhdGUgaGVyZSB0byBhdm9pZCBkZXJlZmVyZW5jaW5nIHRoZSBvYmplY3RzIGluIGRpc3BsYXlUYWJzXG4gICAgdGhpcy50YWJzXG4gICAgICAuZmlsdGVyKCh0YWIpID0+ICdjaGlsZFR5cGVOYW1lJyBpbiB0YWIgJiYgISF0YWIuY2hpbGRUeXBlTmFtZSlcbiAgICAgIC5mb3JFYWNoKCh0YWIpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50cyA9IHRhYi5kYXRhLmZpbHRlcigoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuPzogYW55W10gfSkgPT4gY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKTtcblxuICAgICAgICBwYXJlbnRzLmZvckVhY2goKHBhcmVudDogeyBjaGlsZHJlbj86IHsgc2VsZWN0ZWQ/OiBib29sZWFuIH1bXSB9KSA9PiB7XG4gICAgICAgICAgWydpbmRldGVybWluYXRlJywgJ3NlbGVjdGVkJ10uZm9yRWFjaCgoc2VsZWN0ZWRTdGF0ZU9wdGlvbikgPT4gZGVsZXRlIHBhcmVudFtzZWxlY3RlZFN0YXRlT3B0aW9uXSk7XG5cbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFN0YXRlID0gdGhpcy5nZXRTZWxlY3RlZFN0YXRlKHBhcmVudC5jaGlsZHJlbik7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkU3RhdGUpIHtcbiAgICAgICAgICAgIHBhcmVudFtzZWxlY3RlZFN0YXRlXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucXVpY2tTZWxlY3RDb25maWcpIHtcbiAgICAgIHRoaXMucXVpY2tTZWxlY3RDb25maWcuaXRlbXMuZm9yRWFjaCgocXVpY2tTZWxlY3QpID0+IHtcbiAgICAgICAgZGVsZXRlIHF1aWNrU2VsZWN0LnNlbGVjdGVkO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFN0YXRlID0gdGhpcy5nZXRTZWxlY3RlZFN0YXRlKHF1aWNrU2VsZWN0LmNoaWxkcmVuIGFzICh7IHNlbGVjdGVkPzogYm9vbGVhbiB9ICYgeyBba2V5OiBzdHJpbmddOiBhbnkgfSlbXSk7XG4gICAgICAgIGlmIChzZWxlY3RlZFN0YXRlKSB7XG4gICAgICAgICAgcXVpY2tTZWxlY3Rbc2VsZWN0ZWRTdGF0ZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRTZWxlY3RlZFN0YXRlID0gKGNoaWxkQXJyYXk6IHsgc2VsZWN0ZWQ/OiBib29sZWFuOyBpbmRldGVybWluYXRlPzogYm9vbGVhbiB9W10pOiAnc2VsZWN0ZWQnIHwgJ2luZGV0ZXJtaW5hdGUnIHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBudW1iZXJPZlNlbGVjdGVkSXRlbXMgPSBjaGlsZEFycmF5LmZpbHRlcigoeyBzZWxlY3RlZCB9KSA9PiBzZWxlY3RlZCkubGVuZ3RoO1xuICAgIGlmICghbnVtYmVyT2ZTZWxlY3RlZEl0ZW1zKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gbnVtYmVyT2ZTZWxlY3RlZEl0ZW1zID09PSBjaGlsZEFycmF5Lmxlbmd0aCA/ICdzZWxlY3RlZCcgOiAnaW5kZXRlcm1pbmF0ZSc7XG4gIH07XG5cbiAgZW1pdFNlbGVjdGVkVmFsdWVzKCkge1xuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWVzOiBUYWJiZWRHcm91cFBpY2tlclRhYltdID0gdGhpcy50YWJzLm1hcCgodGFiKSA9PiAoe1xuICAgICAgLi4udGFiLFxuICAgICAgZGF0YTogdGFiLmRhdGEuZmlsdGVyKCh7IHNlbGVjdGVkIH0pID0+IHNlbGVjdGVkKSxcbiAgICB9KSk7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChzZWxlY3RlZFZhbHVlcyk7XG4gIH1cblxuICBkZXNlbGVjdEV2ZXJ5dGhpbmcoZXZlbnQpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zaG93Q2xlYXJBbGwgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5xdWlja1NlbGVjdENvbmZpZykge1xuICAgICAgdGhpcy5xdWlja1NlbGVjdENvbmZpZy5pdGVtcy5mb3JFYWNoKChxdWlja1NlbGVjdCkgPT4ge1xuICAgICAgICBkZWxldGUgcXVpY2tTZWxlY3Quc2VsZWN0ZWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgaWYgKCh0YWIgYXMgUGFyZW50VGFiKS5jaGlsZFR5cGVOYW1lKSB7XG4gICAgICAgIHRhYi5kYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBkZWxldGUgaXRlbS5zZWxlY3RlZDtcbiAgICAgICAgICBkZWxldGUgaXRlbS5pbmRldGVybWluYXRlO1xuICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGRlbGV0ZSBjaGlsZC5zZWxlY3RlZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHRhYiBhcyBDaGlsZFRhYikuZGF0YS5mb3JFYWNoKChpdGVtKSA9PiBkZWxldGUgaXRlbS5zZWxlY3RlZCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5lbWl0U2VsZWN0ZWRWYWx1ZXMoKTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uQ2xlYXJGaWx0ZXIoZXZlbnQpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5maWx0ZXJUZXh0Lm5leHQoJycpO1xuICB9XG5cbiAgb25GaWx0ZXIoZXZlbnQ6IHsgdGFyZ2V0OiB7IHZhbHVlOiBzdHJpbmcgfSB9KSB7XG4gICAgdGhpcy5maWx0ZXJUZXh0Lm5leHQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIGZpbHRlciA9IChzZWFyY2hUZXJtOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmRpc3BsYXlUYWJzLmZvckVhY2goXG4gICAgICAoZGlzcGxheVRhYiwgaSkgPT5cbiAgICAgICAgKGRpc3BsYXlUYWIuZGF0YSA9IHRoaXMudGFic1tpXS5kYXRhLmZpbHRlcigoaXRlbSkgPT5cbiAgICAgICAgICBpdGVtW2Rpc3BsYXlUYWIubGFiZWxGaWVsZF0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpLFxuICAgICAgICApKSxcbiAgICApO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9O1xufVxuIiwiPG5vdm8tZHJvcGRvd24gKHRvZ2dsZWQpPVwib25Ecm9wZG93blRvZ2dsZSgkZXZlbnQpXCI+XG4gIDxidXR0b25cbiAgICBjbGFzcz1cInRhYmJlZC1ncm91cC1waWNrZXItYnV0dG9uXCJcbiAgICBbdGhlbWVdPVwiYnV0dG9uQ29uZmlnLnRoZW1lXCJcbiAgICBbc2lkZV09XCJidXR0b25Db25maWcuc2lkZVwiXG4gICAgW2ljb25dPVwiYnV0dG9uQ29uZmlnLmljb25cIlxuICAgIFtsb2FkaW5nXT1cImxvYWRpbmdcIlxuICA+XG4gICAgPGRpdiBjbGFzcz1cInRhYmJlZC1ncm91cC1waWNrZXItYnV0dG9uLWxhYmVsXCI+e3sgYnV0dG9uQ29uZmlnLmxhYmVsIH19PC9kaXY+XG4gIDwvYnV0dG9uPlxuICA8ZGl2IGNsYXNzPVwidGFiYmVkLWdyb3VwLXBpY2tlci1zZWFyY2hcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJ0YWJiZWQtZ3JvdXAtcGlja2VyLXNlYXJjaFwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFtwbGFjZWhvbGRlcl09XCJsYWJlbFNlcnZpY2Uuc2VhcmNoXCIgW3ZhbHVlXT1cImZpbHRlclRleHQgfCBhc3luY1wiIChpbnB1dCk9XCJvbkZpbHRlcigkZXZlbnQpXCIgLz5cbiAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiAqbmdJZj1cIiEoZmlsdGVyVGV4dCB8IGFzeW5jKVwiPjwvaT5cbiAgICA8aSBjbGFzcz1cImJoaS10aW1lc1wiICpuZ0lmPVwiKGZpbHRlclRleHQgfCBhc3luYylcIiAoY2xpY2spPVwib25DbGVhckZpbHRlcigkZXZlbnQpXCI+PC9pPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInRhYmJlZC1ncm91cC1waWNrZXItY29sdW1uLWNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0YWJiZWQtZ3JvdXAtcGlja2VyLWNvbHVtbiBsZWZ0XCI+XG4gICAgICA8bm92by1uYXYgdGhlbWU9XCJ3aGl0ZVwiIGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICAgIDxub3ZvLXRhYiAqbmdGb3I9XCJsZXQgdGFiIG9mIGRpc3BsYXlUYWJzXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInRhYi50eXBlTmFtZVwiIChhY3RpdmVDaGFuZ2UpPVwiY2hhbmdlVGFiKHRhYilcIj5cbiAgICAgICAgICA8c3Bhbj57eyB0YWIudHlwZUxhYmVsIH19ICh7eyB0YWIuZGF0YS5sZW5ndGggfX0pPC9zcGFuPjxpIGNsYXNzPVwiYmhpLW5leHRcIj48L2k+XG4gICAgICAgIDwvbm92by10YWI+XG4gICAgICA8L25vdm8tbmF2PlxuICAgICAgPGJ1dHRvbiAqbmdJZj1cInNob3dDbGVhckFsbFwiIGNsYXNzPVwiY2xlYXItYWxsLWJ1dHRvblwiIHRoZW1lPVwiZGlhbG9ndWVcIiBpY29uPVwidGltZXNcIiBzaWRlPVwicmlnaHRcIiBjb2xvcj1cImdyYXBlZnJ1aXRcIiAoY2xpY2spPVwiZGVzZWxlY3RFdmVyeXRoaW5nKCRldmVudClcIj57eyBsYWJlbFNlcnZpY2UuY2xlYXIgfX08L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidGFiYmVkLWdyb3VwLXBpY2tlci1jb2x1bW4gcmlnaHRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJxdWljay1zZWxlY3RcIiAqbmdJZj1cInF1aWNrU2VsZWN0Q29uZmlnICYmICEoZmlsdGVyVGV4dCB8IGFzeW5jKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicXVpY2stc2VsZWN0LWxhYmVsXCI+e3sgcXVpY2tTZWxlY3RDb25maWcubGFiZWwgfX08L2Rpdj5cbiAgICAgICAgPG5vdm8tbGlzdCBjbGFzcz1cInF1aWNrLXNlbGVjdC1saXN0XCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICAgIGNsYXNzPVwicXVpY2stc2VsZWN0LWl0ZW1cIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHF1aWNrU2VsZWN0IG9mIHF1aWNrU2VsZWN0Q29uZmlnLml0ZW1zXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJxdWlja1NlbGVjdC5sYWJlbFwiXG4gICAgICAgICAgICAoY2xpY2spPVwicXVpY2tTZWxlY3Quc2VsZWN0ZWQgPSAhcXVpY2tTZWxlY3Quc2VsZWN0ZWQ7IG9uSXRlbVRvZ2dsZWQocXVpY2tTZWxlY3QpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICA8bm92by1jaGVja2JveFxuICAgICAgICAgICAgICAgIFtsYWJlbF09XCJxdWlja1NlbGVjdC5sYWJlbFwiXG4gICAgICAgICAgICAgICAgW25hbWVdPVwiJ3NlbGVjdGVkJ1wiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJxdWlja1NlbGVjdC5zZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25JdGVtVG9nZ2xlZChxdWlja1NlbGVjdClcIlxuICAgICAgICAgICAgICA+PC9ub3ZvLWNoZWNrYm94PlxuICAgICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxub3ZvLWxpc3QgKm5nSWY9XCJkaXNwbGF5VGFiLmRhdGEubGVuZ3RoXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydFxuICAgICAgICAgIFtpdGVtU2l6ZV09XCJ2aXJ0dWFsU2Nyb2xsSXRlbVNpemVcIlxuICAgICAgICAgIFttYXhCdWZmZXJQeF09XCJtYXhCdWZmZXJQeFwiXG4gICAgICAgICAgW21pbkJ1ZmZlclB4XT1cIm1pbkJ1ZmZlclB4XCJcbiAgICAgICAgICAjdGFiYmVkR3JvdXBQaWNrZXJWaXJ0dWFsU2Nyb2xsVmlld3BvcnRcbiAgICAgICAgPlxuICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgICAgKmNka1ZpcnR1YWxGb3I9XCJsZXQgaXRlbSBvZiBkaXNwbGF5VGFiLmRhdGFcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIml0ZW1bZGlzcGxheVRhYi5sYWJlbEZpZWxkXVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaXRlbS5zZWxlY3RlZCA9ICFpdGVtLnNlbGVjdGVkOyBvbkl0ZW1Ub2dnbGVkKGl0ZW0pXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICA8bm92by1jaGVja2JveFxuICAgICAgICAgICAgICAgIFtsYWJlbF09XCJpdGVtW2Rpc3BsYXlUYWIubGFiZWxGaWVsZF1cIlxuICAgICAgICAgICAgICAgIFtuYW1lXT1cIidzZWxlY3RlZCdcIlxuICAgICAgICAgICAgICAgIFtpbmRldGVybWluYXRlXT1cIml0ZW0uaW5kZXRlcm1pbmF0ZVwiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJpdGVtLnNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvbkl0ZW1Ub2dnbGVkKGl0ZW0pXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L25vdm8tY2hlY2tib3g+XG4gICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cbiAgICAgIDwvbm92by1saXN0PlxuICAgICAgPGRpdiBjbGFzcz1cInRhYmJlZC1ncm91cC1waWNrZXItZW1wdHktaXRlbVwiICpuZ0lmPVwiIWRpc3BsYXlUYWIuZGF0YS5sZW5ndGggJiYgKGZpbHRlclRleHQgfCBhc3luYylcIj5cbiAgICAgICAgPGkgY2xhc3M9XCJ7eyBkaXNwbGF5VGFiLmljb24gfHwgJ2JoaS1zZWFyY2gnIH19XCI+PC9pPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktaXRlbS1tYWluLW1lc3NhZ2VcIj57eyBsYWJlbFNlcnZpY2UudGFiYmVkR3JvdXBQaWNrZXJFbXB0eSB9fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktaXRlbS1zdWItbWVzc2FnZVwiPnt7IGxhYmVsU2VydmljZS50YWJiZWRHcm91cENsZWFyU3VnZ2VzdGlvbihkaXNwbGF5VGFiLnR5cGVMYWJlbCkgfX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbm92by1kcm9wZG93bj5cbiJdfQ==