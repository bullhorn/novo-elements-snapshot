import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { BreadcrumbElement } from '../Breadcrumb';
import { BreadcrumbService } from '../Breadcrumb.service';
import { MenuConfig } from '../Breadcrumb.types';
export declare class BreadcrumbItemElement implements OnInit {
    breadcrumbComponent: BreadcrumbElement;
    private breadcrumbService;
    showMenu: boolean;
    customMenuTemplate: TemplateRef<any>;
    menuList: Array<MenuConfig>;
    isSearch: boolean;
    toggleEvent: EventEmitter<any>;
    menuListDisplay: Array<MenuConfig>;
    isOpen: boolean;
    constructor(breadcrumbComponent: BreadcrumbElement, breadcrumbService: BreadcrumbService);
    ngOnInit(): void;
    onToggle($event: any): void;
    searchEvent($event: any): void;
    navigateTo($event: any, item: any): void;
}
