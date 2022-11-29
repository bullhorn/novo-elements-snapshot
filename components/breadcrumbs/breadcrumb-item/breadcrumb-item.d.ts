import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { MenuConfig } from '../breadcrumb.types';
import { NovoBreadcrumbRef } from '../breadcrumb.tokens';
import { BreadcrumbService } from '../breadcrumb.service';
import * as i0 from "@angular/core";
export declare class BreadcrumbItemElement implements OnInit {
    private breadcrumbService;
    breadcrumbComponent: NovoBreadcrumbRef;
    showMenu: boolean;
    customMenuTemplate: TemplateRef<any>;
    menuList: Array<MenuConfig>;
    isSearch: boolean;
    toggleEvent: EventEmitter<any>;
    menuListDisplay: Array<MenuConfig>;
    isOpen: boolean;
    constructor(breadcrumbService: BreadcrumbService, breadcrumbComponent: NovoBreadcrumbRef);
    ngOnInit(): void;
    onToggle($event: any): void;
    searchEvent($event: any): void;
    navigateTo($event: any, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbItemElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbItemElement, "novo-breadcrumb-item", never, { "showMenu": "showMenu"; "customMenuTemplate": "customMenuTemplate"; "menuList": "menuList"; "isSearch": "isSearch"; }, { "toggleEvent": "toggleEvent"; }, never, ["*"]>;
}
