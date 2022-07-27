import { OverlayRef } from '@angular/cdk/overlay';
import { AfterViewInit, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { MenuItemDirective } from './menu-item.directive';
import { CloseLeafMenuEvent, IMenuClickEvent } from './menu.service';
import { ILinkConfig } from './menu.types';
import * as i0 from "@angular/core";
export declare class MenuContentComponent implements OnInit, OnDestroy, AfterViewInit {
    menuItems: MenuItemDirective[];
    item: any;
    event: MouseEvent | KeyboardEvent;
    menu: any;
    parentMenu: MenuContentComponent;
    menuClass: string;
    overlay: OverlayRef;
    isLeaf: boolean;
    openSubMenu: EventEmitter<IMenuClickEvent>;
    closeLeafMenu: EventEmitter<CloseLeafMenuEvent>;
    closeAllMenus: EventEmitter<{
        event: MouseEvent;
    }>;
    autoFocus: boolean;
    private _keyManager;
    private subscription;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    stopEvent($event: MouseEvent): void;
    isMenuItemEnabled(menuItem: MenuItemDirective): boolean;
    isMenuItemVisible(menuItem: MenuItemDirective): boolean;
    evaluateIfFunction(value: any): any;
    isDisabled(link: ILinkConfig): boolean;
    onKeyEvent(event: KeyboardEvent): void;
    keyboardOpenSubMenu(event?: KeyboardEvent): void;
    keyboardMenuItemSelect(event?: KeyboardEvent): void;
    onCloseLeafMenu(event: KeyboardEvent): void;
    closeMenu(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
    onOpenSubMenu(menuItem: MenuItemDirective, event?: MouseEvent | KeyboardEvent): void;
    onMenuItemSelect(menuItem: MenuItemDirective, event: MouseEvent | KeyboardEvent): void;
    private cancelEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuContentComponent, "menu-content", never, { "menuItems": "menuItems"; "item": "item"; "event": "event"; "menu": "menu"; "parentMenu": "parentMenu"; "menuClass": "menuClass"; "overlay": "overlay"; "isLeaf": "isLeaf"; }, { "openSubMenu": "openSubMenu"; "closeLeafMenu": "closeLeafMenu"; "closeAllMenus": "closeAllMenus"; }, never, never>;
}
