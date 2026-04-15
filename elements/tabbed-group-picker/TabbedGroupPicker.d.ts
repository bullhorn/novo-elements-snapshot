import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { NovoDropdownElement } from 'novo-elements/elements/dropdown';
import * as i0 from "@angular/core";
export type TabbedGroupPickerTab = {
    typeName: string;
    typeLabel: string;
    valueField: string;
    labelField: string;
    scrollOffset?: number;
    icon?: any;
} & (ParentTab | ChildTab);
export type ParentTab = {
    childTypeName: string;
    data: Array<ParentOption>;
};
type BaseOption = {
    selected?: boolean;
    indeterminate?: boolean;
} & {
    [key: string]: any;
};
type ParentOption = BaseOption & {
    children: Option[];
};
type Option = BaseOption | ParentOption;
export type ChildTab = {
    data: Array<{
        selected?: boolean;
    } & {
        [key: string]: any;
    }>;
};
export type TabbedGroupPickerQuickSelect = {
    label: string;
    selected?: boolean;
    childTypeName?: string;
    children?: (({
        selected?: boolean;
    } & {
        [key: string]: any;
    }) | number)[];
    all?: boolean;
};
export type QuickSelectConfig = {
    label: string;
    items: TabbedGroupPickerQuickSelect[];
};
export type TabbedGroupPickerButtonConfig = {
    theme: string;
    side: string;
    icon: string;
    label: string;
    size?: string;
};
export declare class NovoTabbedGroupPickerElement implements OnDestroy, OnInit {
    labelService: NovoLabelService;
    private ref;
    private scrollableInstance;
    private inputElement;
    dropdown: NovoDropdownElement;
    multiple: boolean;
    buttonConfig: TabbedGroupPickerButtonConfig;
    tabs: TabbedGroupPickerTab[];
    quickSelectConfig: QuickSelectConfig;
    showFooter: boolean;
    useChips: import("@angular/core").InputSignal<boolean>;
    maxChips: import("@angular/core").InputSignal<number>;
    chipSize: import("@angular/core").InputSignal<string>;
    selectionEnabled: boolean;
    activation: EventEmitter<any>;
    selectionChange: EventEmitter<TabbedGroupPickerTab[]>;
    applyChange: EventEmitter<any>;
    cancelChange: EventEmitter<any>;
    tabSelect: EventEmitter<any>;
    displayTabs: TabbedGroupPickerTab[];
    displayTabIndex: number;
    filterText: BehaviorSubject<string>;
    filterTextSubscription: Subscription;
    loading: boolean;
    showClearAll: boolean;
    appliedState: TabbedGroupPickerTab[];
    scrollViewportHeight: number;
    virtualScrollItemSize: number;
    selectedChips: import("@angular/core").WritableSignal<any[]>;
    showAllChips: import("@angular/core").WritableSignal<boolean>;
    displayedChips: import("@angular/core").Signal<any[]>;
    hiddenChips: import("@angular/core").Signal<any[]>;
    chipsInputPlaceholder: import("@angular/core").Signal<string>;
    constructor(labelService: NovoLabelService, ref: ChangeDetectorRef);
    get displayTab(): TabbedGroupPickerTab;
    set displayTab(tab: TabbedGroupPickerTab);
    get minBufferPx(): number;
    get maxBufferPx(): number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    showAllChipsToggle(event: any): void;
    loadValues(): void;
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
    activateItem(item: any, tab?: TabbedGroupPickerTab): void;
    onItemToggled(item: Option): void;
    toggleChip(item: Option): void;
    initializeDescendantSelection(): void;
    updateDescendants(parentIsSelected: boolean, children: Option[]): void;
    updateClearAll(itemWasJustSelected?: boolean): void;
    updateParentsAndQuickSelect(): void;
    getSelectedState: (childArray: Option[]) => "selected" | "indeterminate" | undefined;
    getSelectedValues(): TabbedGroupPickerTab[];
    emitSelectedValues(): void;
    updateAppliedState(): void;
    apply(): void;
    cancel(): void;
    revertState(): void;
    deselectEverything(event: any): void;
    onClearFilter(event: any): void;
    onFilter(event: {
        target: {
            value: string;
        };
    }): void;
    filter: (searchTerm: string) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTabbedGroupPickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTabbedGroupPickerElement, "novo-tabbed-group-picker", never, { "buttonConfig": { "alias": "buttonConfig"; "required": false; }; "tabs": { "alias": "tabs"; "required": false; }; "quickSelectConfig": { "alias": "quickSelectConfig"; "required": false; }; "showFooter": { "alias": "showFooter"; "required": false; }; "useChips": { "alias": "useChips"; "required": false; "isSignal": true; }; "maxChips": { "alias": "maxChips"; "required": false; "isSignal": true; }; "chipSize": { "alias": "chipSize"; "required": false; "isSignal": true; }; "selectionEnabled": { "alias": "selectionEnabled"; "required": false; }; }, { "activation": "activation"; "selectionChange": "selectionChange"; "applyChange": "applyChange"; "cancelChange": "cancelChange"; "tabSelect": "tabSelect"; }, never, ["*"], false, never>;
}
export {};
