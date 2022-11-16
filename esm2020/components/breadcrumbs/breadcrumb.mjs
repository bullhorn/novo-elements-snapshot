import { Component, Input, TemplateRef } from '@angular/core';
import { NOVO_BREADCRUMB_REF } from './breadcrumb.tokens';
import { BreadcrumbService } from './breadcrumb.service';
import * as i0 from "@angular/core";
import * as i1 from "./breadcrumb.service";
import * as i2 from "./breadcrumb-item/breadcrumb-item";
import * as i3 from "@angular/common";
export class BreadcrumbElement {
    constructor(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.source = [];
    }
    navigateTo($event, item) {
        this.breadcrumbService.navigateTo($event, item);
    }
}
BreadcrumbElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BreadcrumbElement, deps: [{ token: i1.BreadcrumbService }], target: i0.ɵɵFactoryTarget.Component });
BreadcrumbElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: BreadcrumbElement, selector: "novo-breadcrumb", inputs: { separatorIcon: "separatorIcon", source: "source" }, providers: [{ provide: NOVO_BREADCRUMB_REF, useExisting: BreadcrumbElement }], ngImport: i0, template: "<ng-container *ngIf=\"source && source.length\">\n  <novo-breadcrumb-item *ngFor=\"let item of source\" [showMenu]=\"item.showMenu\" [isSearch]=\"item.isSearch\"\n    [menuList]=\"item.menuList\" [customMenuTemplate]=\"item.customMenuTemplate\">\n    <a *ngIf=\"!item.noNavigation && (!item.linkType || item.linkType === 'hrefLink')\" rel=\"noopener\" [href]=\"item.link\"\n      [target]=\"item.target ? item.target : '_self'\">{{ item.title }}</a>\n    <a *ngIf=\"!item.noNavigation && item.linkType === 'routerLink'\" rel=\"noopener\" [target]=\"item.target\"\n      [href]=\"item.link\" (click)=\"navigateTo($event, item)\">{{ item.title }}</a>\n    <span *ngIf=\"item.noNavigation\">{{ item.title }}</span>\n  </novo-breadcrumb-item>\n</ng-container>\n<ng-container *ngIf=\"!(source && source.length)\">\n  <ng-content></ng-content>\n</ng-container>", styles: [":host{display:flex;align-items:center}:host ::ng-deep novo-breadcrumb-item:last-child .novo-breadcrumb-separator{display:none}\n"], components: [{ type: i2.BreadcrumbItemElement, selector: "novo-breadcrumb-item", inputs: ["showMenu", "customMenuTemplate", "menuList", "isSearch"], outputs: ["toggleEvent"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BreadcrumbElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-breadcrumb', providers: [{ provide: NOVO_BREADCRUMB_REF, useExisting: BreadcrumbElement }], template: "<ng-container *ngIf=\"source && source.length\">\n  <novo-breadcrumb-item *ngFor=\"let item of source\" [showMenu]=\"item.showMenu\" [isSearch]=\"item.isSearch\"\n    [menuList]=\"item.menuList\" [customMenuTemplate]=\"item.customMenuTemplate\">\n    <a *ngIf=\"!item.noNavigation && (!item.linkType || item.linkType === 'hrefLink')\" rel=\"noopener\" [href]=\"item.link\"\n      [target]=\"item.target ? item.target : '_self'\">{{ item.title }}</a>\n    <a *ngIf=\"!item.noNavigation && item.linkType === 'routerLink'\" rel=\"noopener\" [target]=\"item.target\"\n      [href]=\"item.link\" (click)=\"navigateTo($event, item)\">{{ item.title }}</a>\n    <span *ngIf=\"item.noNavigation\">{{ item.title }}</span>\n  </novo-breadcrumb-item>\n</ng-container>\n<ng-container *ngIf=\"!(source && source.length)\">\n  <ng-content></ng-content>\n</ng-container>", styles: [":host{display:flex;align-items:center}:host ::ng-deep novo-breadcrumb-item:last-child .novo-breadcrumb-separator{display:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.BreadcrumbService }]; }, propDecorators: { separatorIcon: [{
                type: Input
            }], source: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYi50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFRekQsTUFBTSxPQUFPLGlCQUFpQjtJQUk1QixZQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUYvQyxXQUFNLEdBQXdCLEVBQUUsQ0FBQztJQUVpQixDQUFDO0lBRTVELFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSTtRQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDOzsrR0FSVSxpQkFBaUI7bUdBQWpCLGlCQUFpQix3R0FGakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQywwQkNUL0UsdzFCQVllOzRGRERGLGlCQUFpQjtrQkFON0IsU0FBUzsrQkFDRSxpQkFBaUIsYUFHaEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLG1CQUFtQixFQUFFLENBQUM7d0dBR3BFLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvdXJjZUNvbmZpZyB9IGZyb20gJy4vYnJlYWRjcnVtYi50eXBlcyc7XG5pbXBvcnQgeyBOT1ZPX0JSRUFEQ1JVTUJfUkVGIH0gZnJvbSAnLi9icmVhZGNydW1iLnRva2Vucyc7XG5pbXBvcnQgeyBCcmVhZGNydW1iU2VydmljZSB9IGZyb20gJy4vYnJlYWRjcnVtYi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1icmVhZGNydW1iJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JyZWFkY3J1bWIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JyZWFkY3J1bWIuc2NzcyddLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5PVk9fQlJFQURDUlVNQl9SRUYsIHVzZUV4aXN0aW5nOiBCcmVhZGNydW1iRWxlbWVudCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkVsZW1lbnQge1xuICBASW5wdXQoKSBzZXBhcmF0b3JJY29uOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBzb3VyY2U6IEFycmF5PFNvdXJjZUNvbmZpZz4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyZWFkY3J1bWJTZXJ2aWNlOiBCcmVhZGNydW1iU2VydmljZSkge31cblxuICBuYXZpZ2F0ZVRvKCRldmVudCwgaXRlbSkge1xuICAgIHRoaXMuYnJlYWRjcnVtYlNlcnZpY2UubmF2aWdhdGVUbygkZXZlbnQsIGl0ZW0pO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwic291cmNlICYmIHNvdXJjZS5sZW5ndGhcIj5cbiAgPG5vdm8tYnJlYWRjcnVtYi1pdGVtICpuZ0Zvcj1cImxldCBpdGVtIG9mIHNvdXJjZVwiIFtzaG93TWVudV09XCJpdGVtLnNob3dNZW51XCIgW2lzU2VhcmNoXT1cIml0ZW0uaXNTZWFyY2hcIlxuICAgIFttZW51TGlzdF09XCJpdGVtLm1lbnVMaXN0XCIgW2N1c3RvbU1lbnVUZW1wbGF0ZV09XCJpdGVtLmN1c3RvbU1lbnVUZW1wbGF0ZVwiPlxuICAgIDxhICpuZ0lmPVwiIWl0ZW0ubm9OYXZpZ2F0aW9uICYmICghaXRlbS5saW5rVHlwZSB8fCBpdGVtLmxpbmtUeXBlID09PSAnaHJlZkxpbmsnKVwiIHJlbD1cIm5vb3BlbmVyXCIgW2hyZWZdPVwiaXRlbS5saW5rXCJcbiAgICAgIFt0YXJnZXRdPVwiaXRlbS50YXJnZXQgPyBpdGVtLnRhcmdldCA6ICdfc2VsZidcIj57eyBpdGVtLnRpdGxlIH19PC9hPlxuICAgIDxhICpuZ0lmPVwiIWl0ZW0ubm9OYXZpZ2F0aW9uICYmIGl0ZW0ubGlua1R5cGUgPT09ICdyb3V0ZXJMaW5rJ1wiIHJlbD1cIm5vb3BlbmVyXCIgW3RhcmdldF09XCJpdGVtLnRhcmdldFwiXG4gICAgICBbaHJlZl09XCJpdGVtLmxpbmtcIiAoY2xpY2spPVwibmF2aWdhdGVUbygkZXZlbnQsIGl0ZW0pXCI+e3sgaXRlbS50aXRsZSB9fTwvYT5cbiAgICA8c3BhbiAqbmdJZj1cIml0ZW0ubm9OYXZpZ2F0aW9uXCI+e3sgaXRlbS50aXRsZSB9fTwvc3Bhbj5cbiAgPC9ub3ZvLWJyZWFkY3J1bWItaXRlbT5cbjwvbmctY29udGFpbmVyPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEoc291cmNlICYmIHNvdXJjZS5sZW5ndGgpXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvbmctY29udGFpbmVyPiJdfQ==