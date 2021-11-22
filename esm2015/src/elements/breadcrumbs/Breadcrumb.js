import { Component, Input, TemplateRef } from '@angular/core';
import { BreadcrumbService } from './Breadcrumb.service';
export class BreadcrumbElement {
    constructor(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.source = [];
    }
    navigateTo($event, item) {
        this.breadcrumbService.navigateTo($event, item);
    }
}
BreadcrumbElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-breadcrumb',
                template: "<ng-container *ngIf=\"source && source.length\">\n  <novo-breadcrumb-item *ngFor=\"let item of source\" [showMenu]=\"item.showMenu\" [isSearch]=\"item.isSearch\"\n    [menuList]=\"item.menuList\" [customMenuTemplate]=\"item.customMenuTemplate\">\n    <a *ngIf=\"!item.noNavigation && (!item.linkType || item.linkType === 'hrefLink')\" rel=\"noopener\" [href]=\"item.link\"\n      [target]=\"item.target ? item.target : '_self'\">{{ item.title }}</a>\n    <a *ngIf=\"!item.noNavigation && item.linkType === 'routerLink'\" rel=\"noopener\" [target]=\"item.target\"\n      [href]=\"item.link\" (click)=\"navigateTo($event, item)\">{{ item.title }}</a>\n    <span *ngIf=\"item.noNavigation\">{{ item.title }}</span>\n  </novo-breadcrumb-item>\n</ng-container>\n<ng-container *ngIf=\"!(source && source.length)\">\n  <ng-content></ng-content>\n</ng-container>",
                styles: [":host{align-items:center;display:flex}:host ::ng-deep novo-breadcrumb-item:last-child .novo-breadcrumb-separator{display:none}"]
            },] }
];
BreadcrumbElement.ctorParameters = () => [
    { type: BreadcrumbService }
];
BreadcrumbElement.propDecorators = {
    separatorIcon: [{ type: Input }],
    source: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9icmVhZGNydW1icy9CcmVhZGNydW1iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVF6RCxNQUFNLE9BQU8saUJBQWlCO0lBSTVCLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRi9DLFdBQU0sR0FBd0IsRUFBRSxDQUFDO0lBRWlCLENBQUM7SUFFNUQsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixrMkJBQWdDOzthQUVqQzs7O1lBUFEsaUJBQWlCOzs7NEJBU3ZCLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcmVhZGNydW1iU2VydmljZSB9IGZyb20gJy4vQnJlYWRjcnVtYi5zZXJ2aWNlJztcbmltcG9ydCB7IFNvdXJjZUNvbmZpZyB9IGZyb20gJy4vQnJlYWRjcnVtYi50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYnJlYWRjcnVtYicsXG4gIHRlbXBsYXRlVXJsOiAnLi9CcmVhZGNydW1iLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9CcmVhZGNydW1iLnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkVsZW1lbnQge1xuICBASW5wdXQoKSBzZXBhcmF0b3JJY29uOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBzb3VyY2U6IEFycmF5PFNvdXJjZUNvbmZpZz4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyZWFkY3J1bWJTZXJ2aWNlOiBCcmVhZGNydW1iU2VydmljZSkge31cblxuICBuYXZpZ2F0ZVRvKCRldmVudCwgaXRlbSkge1xuICAgIHRoaXMuYnJlYWRjcnVtYlNlcnZpY2UubmF2aWdhdGVUbygkZXZlbnQsIGl0ZW0pO1xuICB9XG59XG4iXX0=