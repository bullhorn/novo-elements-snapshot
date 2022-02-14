import { Component, Input, TemplateRef } from '@angular/core';
import { BreadcrumbService } from './Breadcrumb.service';
import * as i0 from "@angular/core";
import * as i1 from "./Breadcrumb.service";
function BreadcrumbElement_ng_container_0_novo_breadcrumb_item_1_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("href", item_r3.link, i0.ɵɵsanitizeUrl)("target", item_r3.target ? item_r3.target : "_self");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r3.title);
} }
function BreadcrumbElement_ng_container_0_novo_breadcrumb_item_1_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵlistener("click", function BreadcrumbElement_ng_container_0_novo_breadcrumb_item_1_a_2_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r9); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.navigateTo($event, item_r3); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("target", item_r3.target)("href", item_r3.link, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r3.title);
} }
function BreadcrumbElement_ng_container_0_novo_breadcrumb_item_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r3.title);
} }
function BreadcrumbElement_ng_container_0_novo_breadcrumb_item_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-breadcrumb-item", 2);
    i0.ɵɵtemplate(1, BreadcrumbElement_ng_container_0_novo_breadcrumb_item_1_a_1_Template, 2, 3, "a", 3);
    i0.ɵɵtemplate(2, BreadcrumbElement_ng_container_0_novo_breadcrumb_item_1_a_2_Template, 2, 3, "a", 4);
    i0.ɵɵtemplate(3, BreadcrumbElement_ng_container_0_novo_breadcrumb_item_1_span_3_Template, 2, 1, "span", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵproperty("showMenu", item_r3.showMenu)("isSearch", item_r3.isSearch)("menuList", item_r3.menuList)("customMenuTemplate", item_r3.customMenuTemplate);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r3.noNavigation && (!item_r3.linkType || item_r3.linkType === "hrefLink"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r3.noNavigation && item_r3.linkType === "routerLink");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r3.noNavigation);
} }
function BreadcrumbElement_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BreadcrumbElement_ng_container_0_novo_breadcrumb_item_1_Template, 4, 7, "novo-breadcrumb-item", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.source);
} }
function BreadcrumbElement_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵprojection(1);
    i0.ɵɵelementContainerEnd();
} }
const _c0 = ["*"];
export class BreadcrumbElement {
    constructor(breadcrumbService) {
        this.breadcrumbService = breadcrumbService;
        this.source = [];
    }
    navigateTo($event, item) {
        this.breadcrumbService.navigateTo($event, item);
    }
}
BreadcrumbElement.ɵfac = function BreadcrumbElement_Factory(t) { return new (t || BreadcrumbElement)(i0.ɵɵdirectiveInject(i1.BreadcrumbService)); };
BreadcrumbElement.ɵcmp = i0.ɵɵdefineComponent({ type: BreadcrumbElement, selectors: [["novo-breadcrumb"]], inputs: { separatorIcon: "separatorIcon", source: "source" }, ngContentSelectors: _c0, decls: 2, vars: 2, consts: [[4, "ngIf"], [3, "showMenu", "isSearch", "menuList", "customMenuTemplate", 4, "ngFor", "ngForOf"], [3, "showMenu", "isSearch", "menuList", "customMenuTemplate"], ["rel", "noopener", 3, "href", "target", 4, "ngIf"], ["rel", "noopener", 3, "target", "href", "click", 4, "ngIf"], ["rel", "noopener", 3, "href", "target"], ["rel", "noopener", 3, "target", "href", "click"]], template: function BreadcrumbElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, BreadcrumbElement_ng_container_0_Template, 2, 1, "ng-container", 0);
        i0.ɵɵtemplate(1, BreadcrumbElement_ng_container_1_Template, 2, 0, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.source && ctx.source.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.source && ctx.source.length));
    } }, styles: ["[_nghost-%COMP%]{align-items:center;display:flex}[_nghost-%COMP%]     novo-breadcrumb-item:last-child .novo-breadcrumb-separator{display:none}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BreadcrumbElement, [{
        type: Component,
        args: [{
                selector: 'novo-breadcrumb',
                templateUrl: './Breadcrumb.html',
                styleUrls: ['./Breadcrumb.scss'],
            }]
    }], function () { return [{ type: i1.BreadcrumbService }]; }, { separatorIcon: [{
            type: Input
        }], source: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9icmVhZGNydW1icy9CcmVhZGNydW1iLnRzIiwiZWxlbWVudHMvYnJlYWRjcnVtYnMvQnJlYWRjcnVtYi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztJQ0VyRCw0QkFDaUQ7SUFBQSxZQUFnQjtJQUFBLGlCQUFJOzs7SUFENEIscURBQWtCLHFEQUFBO0lBQ2xFLGVBQWdCO0lBQWhCLG1DQUFnQjs7OztJQUNqRSw0QkFDd0Q7SUFBbkMsd1JBQWtDO0lBQUMsWUFBZ0I7SUFBQSxpQkFBSTs7O0lBREcsdUNBQXNCLHdDQUFBO0lBQzdDLGVBQWdCO0lBQWhCLG1DQUFnQjs7O0lBQ3hFLDRCQUFnQztJQUFBLFlBQWdCO0lBQUEsaUJBQU87OztJQUF2QixlQUFnQjtJQUFoQixtQ0FBZ0I7OztJQU5sRCwrQ0FFRTtJQUFBLG9HQUNpRDtJQUNqRCxvR0FDd0Q7SUFDeEQsMEdBQWdDO0lBQ2xDLGlCQUF1Qjs7O0lBUDJCLDJDQUEwQiw4QkFBQSw4QkFBQSxrREFBQTtJQUV2RSxlQUE4RTtJQUE5RSxzR0FBOEU7SUFFOUUsZUFBNEQ7SUFBNUQsaUZBQTREO0lBRXpELGVBQXlCO0lBQXpCLDJDQUF5Qjs7O0lBUG5DLDZCQUNFO0lBQUEsbUhBRUU7SUFNSiwwQkFBZTs7O0lBUlMsZUFBMkI7SUFBM0IsdUNBQTJCOzs7SUFTbkQsNkJBQ0U7SUFBQSxrQkFBWTtJQUNkLDBCQUFlOzs7QURIZixNQUFNLE9BQU8saUJBQWlCO0lBSTVCLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRi9DLFdBQU0sR0FBd0IsRUFBRSxDQUFDO0lBRWlCLENBQUM7SUFFNUQsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7O2tGQVJVLGlCQUFpQjtzREFBakIsaUJBQWlCOztRQ1Q5QixvRkFDRTtRQVNGLG9GQUNFOztRQVhZLHNEQUErQjtRQVUvQixlQUFrQztRQUFsQyx5REFBa0M7O2tERERuQyxpQkFBaUI7Y0FMN0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFdBQVcsRUFBRSxtQkFBbUI7Z0JBQ2hDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQ2pDO29FQUVVLGFBQWE7a0JBQXJCLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYlNlcnZpY2UgfSBmcm9tICcuL0JyZWFkY3J1bWIuc2VydmljZSc7XG5pbXBvcnQgeyBTb3VyY2VDb25maWcgfSBmcm9tICcuL0JyZWFkY3J1bWIudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZVVybDogJy4vQnJlYWRjcnVtYi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vQnJlYWRjcnVtYi5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJFbGVtZW50IHtcbiAgQElucHV0KCkgc2VwYXJhdG9ySWNvbjogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgc291cmNlOiBBcnJheTxTb3VyY2VDb25maWc+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBicmVhZGNydW1iU2VydmljZTogQnJlYWRjcnVtYlNlcnZpY2UpIHt9XG5cbiAgbmF2aWdhdGVUbygkZXZlbnQsIGl0ZW0pIHtcbiAgICB0aGlzLmJyZWFkY3J1bWJTZXJ2aWNlLm5hdmlnYXRlVG8oJGV2ZW50LCBpdGVtKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cInNvdXJjZSAmJiBzb3VyY2UubGVuZ3RoXCI+XG4gIDxub3ZvLWJyZWFkY3J1bWItaXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzb3VyY2VcIiBbc2hvd01lbnVdPVwiaXRlbS5zaG93TWVudVwiIFtpc1NlYXJjaF09XCJpdGVtLmlzU2VhcmNoXCJcbiAgICBbbWVudUxpc3RdPVwiaXRlbS5tZW51TGlzdFwiIFtjdXN0b21NZW51VGVtcGxhdGVdPVwiaXRlbS5jdXN0b21NZW51VGVtcGxhdGVcIj5cbiAgICA8YSAqbmdJZj1cIiFpdGVtLm5vTmF2aWdhdGlvbiAmJiAoIWl0ZW0ubGlua1R5cGUgfHwgaXRlbS5saW5rVHlwZSA9PT0gJ2hyZWZMaW5rJylcIiByZWw9XCJub29wZW5lclwiIFtocmVmXT1cIml0ZW0ubGlua1wiXG4gICAgICBbdGFyZ2V0XT1cIml0ZW0udGFyZ2V0ID8gaXRlbS50YXJnZXQgOiAnX3NlbGYnXCI+e3sgaXRlbS50aXRsZSB9fTwvYT5cbiAgICA8YSAqbmdJZj1cIiFpdGVtLm5vTmF2aWdhdGlvbiAmJiBpdGVtLmxpbmtUeXBlID09PSAncm91dGVyTGluaydcIiByZWw9XCJub29wZW5lclwiIFt0YXJnZXRdPVwiaXRlbS50YXJnZXRcIlxuICAgICAgW2hyZWZdPVwiaXRlbS5saW5rXCIgKGNsaWNrKT1cIm5hdmlnYXRlVG8oJGV2ZW50LCBpdGVtKVwiPnt7IGl0ZW0udGl0bGUgfX08L2E+XG4gICAgPHNwYW4gKm5nSWY9XCJpdGVtLm5vTmF2aWdhdGlvblwiPnt7IGl0ZW0udGl0bGUgfX08L3NwYW4+XG4gIDwvbm92by1icmVhZGNydW1iLWl0ZW0+XG48L25nLWNvbnRhaW5lcj5cbjxuZy1jb250YWluZXIgKm5nSWY9XCIhKHNvdXJjZSAmJiBzb3VyY2UubGVuZ3RoKVwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L25nLWNvbnRhaW5lcj4iXX0=