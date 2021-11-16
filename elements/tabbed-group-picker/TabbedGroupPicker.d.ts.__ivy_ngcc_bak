import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NovoLabelService } from '../../services/novo-label-service';
export declare type TabbedGroupPickerTab = {
    typeName: string;
    typeLabel: string;
    valueField: string;
    labelField: string;
    scrollOffset?: number;
    icon?: string;
} & (ParentTab | ChildTab);
export declare type ParentTab = {
    childTypeName: string;
    data: Array<ParentOption>;
};
declare type ParentOption = {
    selected?: boolean;
    indeterminate?: boolean;
    children: Array<{
        selected?: boolean;
    }>;
} & {
    [key: string]: any;
};
export declare type ChildTab = {
    data: Array<{
        selected?: boolean;
    } & {
        [key: string]: any;
    }>;
};
export declare type TabbedGroupPickerQuickSelect = {
    label: string;
    selected?: boolean;
    childTypeName?: string;
    children?: (({
        selected?: boolean;
    } & {
        [key: string]: any;
    }) | (number))[];
    all?: boolean;
};
export declare type QuickSelectConfig = {
    label: string;
    items: TabbedGroupPickerQuickSelect[];
};
export declare type TabbedGroupPickerButtonConfig = {
    theme: string;
    side: string;
    icon: string;
    label: string;
};
export declare class NovoTabbedGroupPickerElement implements OnDestroy, OnInit {
    labelService: NovoLabelService;
    private ref;
    private scrollableInstance;
    buttonConfig: TabbedGroupPickerButtonConfig;
    tabs: TabbedGroupPickerTab[];
    quickSelectConfig: QuickSelectConfig;
    selectionChange: EventEmitter<any>;
    displayTabs: TabbedGroupPickerTab[];
    displayTabIndex: number;
    filterText: BehaviorSubject<string>;
    filterTextSubscription: Subscription;
    loading: boolean;
    showClearAll: boolean;
    scrollViewportHeight: number;
    virtualScrollItemSize: number;
    constructor(labelService: NovoLabelService, ref: ChangeDetectorRef);
    get displayTab(): TabbedGroupPickerTab;
    set displayTab(tab: TabbedGroupPickerTab);
    get minBufferPx(): number;
    get maxBufferPx(): number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    changeTab(tab: TabbedGroupPickerTab): void;
    getPixelHeight(element: HTMLElement): number;
    setupDisplayData(): void;
    createChildrenReferences(): void;
    makeCompareFunction<T>(key: string): (a: T | {
        [key: string]: T;
    }, b: T | {
        [key: string]: T;
    }) => 1 | -1 | 0 | undefined;
    replaceChildrenWithReferences(parent: {
        children: any[];
    }, sortedData: ChildTab['data'], compareFunction: (a: any, b: any) => 1 | -1 | 0, warnFunction: (child: any) => void): void;
    makeWarningFunction(parentLabel: string, childLabel: string, childValueField: any): (child: any) => void;
    onDropdownToggle(event: any): void;
    onItemToggled(item: {
        selected?: boolean;
        children?: Array<{
            selected?: boolean;
            children?: Array<{
                selected?: boolean;
            }>;
        }>;
    }): void;
    initializeDescendantSelection(): void;
    updateDescendants(parentIsSelected: boolean, children: Array<{
        selected?: boolean;
        children?: Array<{
            selected?: boolean;
        }>;
    }>): void;
    updateClearAll(itemWasJustSelected?: boolean): void;
    updateParentsAndQuickSelect(): void;
    getSelectedState: (childArray: {
        selected?: boolean;
        indeterminate?: boolean;
    }[]) => 'selected' | 'indeterminate' | undefined;
    emitSelectedValues(): void;
    deselectEverything(event: any): void;
    onClearFilter(event: any): void;
    onFilter(event: {
        target: {
            value: string;
        };
    }): void;
    filter: (searchTerm: string) => void;
}
export {};
