import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { BreadcrumbElement } from '../Breadcrumb';
import { BreadcrumbService } from '../Breadcrumb.service';
import * as i0 from "@angular/core";
import * as i1 from "../Breadcrumb";
import * as i2 from "../Breadcrumb.service";
import * as i3 from "@angular/common";
import * as i4 from "../../dropdown/Dropdown";
import * as i5 from "../../button/Button";
import * as i6 from "../../search/SearchBox";
function BreadcrumbItemElement_ng_container_0_ng_template_3_Template(rf, ctx) { }
function BreadcrumbItemElement_ng_container_0_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelementStart(1, "novo-search", 14);
    i0.ɵɵlistener("searchFn", function BreadcrumbItemElement_ng_container_0_div_7_Template_novo_search_searchFn_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.searchEvent($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap("search-in-dropdown");
} }
function BreadcrumbItemElement_ng_container_0_item_8_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("href", item_r14.link, i0.ɵɵsanitizeUrl)("target", item_r14.target ? item_r14.target : "_self");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r14.name);
} }
function BreadcrumbItemElement_ng_container_0_item_8_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 19);
    i0.ɵɵlistener("click", function BreadcrumbItemElement_ng_container_0_item_8_a_2_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r19); const item_r14 = i0.ɵɵnextContext().$implicit; const ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.navigateTo($event, item_r14); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("target", item_r14.target)("href", item_r14.link, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r14.name);
} }
function BreadcrumbItemElement_ng_container_0_item_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "item", 15);
    i0.ɵɵtemplate(1, BreadcrumbItemElement_ng_container_0_item_8_a_1_Template, 2, 3, "a", 16);
    i0.ɵɵtemplate(2, BreadcrumbItemElement_ng_container_0_item_8_a_2_Template, 2, 3, "a", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r14 = ctx.$implicit;
    i0.ɵɵpropertyInterpolate("title", item_r14.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r14.linkType || item_r14.linkType === "hrefLink");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r14.linkType === "routerLink");
} }
const _c0 = function (a0) { return { "novo-breadcrumb-item-active": a0 }; };
function BreadcrumbItemElement_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 6, 7);
    i0.ɵɵtemplate(3, BreadcrumbItemElement_ng_container_0_ng_template_3_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementStart(4, "novo-dropdown");
    i0.ɵɵelement(5, "button", 9);
    i0.ɵɵelementStart(6, "list", 10);
    i0.ɵɵtemplate(7, BreadcrumbItemElement_ng_container_0_div_7_Template, 2, 2, "div", 11);
    i0.ɵɵtemplate(8, BreadcrumbItemElement_ng_container_0_item_8_Template, 3, 3, "item", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c0, ctx_r0.isOpen));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", _r1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r0.isSearch);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.menuListDisplay);
} }
function BreadcrumbItemElement_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵprojection(1);
    i0.ɵɵelementEnd();
} }
function BreadcrumbItemElement_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "test");
    i0.ɵɵelementEnd();
} }
function BreadcrumbItemElement_ng_template_6_Template(rf, ctx) { }
function BreadcrumbItemElement_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 3);
    i0.ɵɵtext(1, " / ");
    i0.ɵɵelementEnd();
} }
const _c1 = function (a0) { return { $implicit: a0 }; };
const _c2 = ["*"];
export class BreadcrumbItemElement {
    constructor(breadcrumbComponent, breadcrumbService) {
        this.breadcrumbComponent = breadcrumbComponent;
        this.breadcrumbService = breadcrumbService;
        this.showMenu = false;
        this.isSearch = false;
        this.toggleEvent = new EventEmitter();
    }
    ngOnInit() {
        this.menuListDisplay = this.menuList;
    }
    onToggle($event) {
        this.isOpen = $event;
        this.toggleEvent.emit($event);
    }
    searchEvent($event) {
        if (this.menuList) {
            this.menuListDisplay = this.menuList.filter((item) => item.name.toLowerCase().includes($event.toLowerCase()));
        }
    }
    navigateTo($event, item) {
        this.breadcrumbService.navigateTo($event, item);
    }
}
BreadcrumbItemElement.ɵfac = function BreadcrumbItemElement_Factory(t) { return new (t || BreadcrumbItemElement)(i0.ɵɵdirectiveInject(i1.BreadcrumbElement), i0.ɵɵdirectiveInject(i2.BreadcrumbService)); };
BreadcrumbItemElement.ɵcmp = i0.ɵɵdefineComponent({ type: BreadcrumbItemElement, selectors: [["novo-breadcrumb-item"]], inputs: { showMenu: "showMenu", customMenuTemplate: "customMenuTemplate", menuList: "menuList", isSearch: "isSearch" }, outputs: { toggleEvent: "toggleEvent" }, ngContentSelectors: _c2, decls: 9, vars: 6, consts: [[4, "ngIf", "ngIfElse"], ["breadcrumbContentTpl", ""], ["dropDownMenuTpl", ""], [1, "novo-breadcrumb-separator"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["defaultSeparator", ""], [1, "novo-dropdown-no-border", "novo-dropdown-origin", "novo-breadcrumb-dropdown-origin", 3, "ngClass"], ["origin", ""], [3, "ngTemplateOutlet"], ["theme", "icon", "icon", "collapse", "size", "small"], [1, "novo-breadcrumb-dropdown-menu"], ["class", "dropdown-search-container", 4, "ngIf"], [3, "title", 4, "ngFor", "ngForOf"], [1, "dropdown-search-container"], ["alwaysOpen", "true", 3, "searchFn"], [3, "title"], ["rel", "noopener", 3, "href", "target", 4, "ngIf"], ["rel", "noopener", 3, "target", "href", "click", 4, "ngIf"], ["rel", "noopener", 3, "href", "target"], ["rel", "noopener", 3, "target", "href", "click"], [1, "novo-breadcrumb-item"]], template: function BreadcrumbItemElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, BreadcrumbItemElement_ng_container_0_Template, 9, 6, "ng-container", 0);
        i0.ɵɵtemplate(1, BreadcrumbItemElement_ng_template_1_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(3, BreadcrumbItemElement_ng_template_3_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementStart(5, "span", 3);
        i0.ɵɵtemplate(6, BreadcrumbItemElement_ng_template_6_Template, 0, 0, "ng-template", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(7, BreadcrumbItemElement_ng_template_7_Template, 2, 0, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(2);
        const _r6 = i0.ɵɵreference(8);
        i0.ɵɵproperty("ngIf", ctx.showMenu)("ngIfElse", _r1);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.breadcrumbComponent.separatorIcon ? ctx.breadcrumbComponent.separatorIcon : _r6)("ngTemplateOutletContext", i0.ɵɵpureFunction1(4, _c1, ctx));
    } }, directives: [i3.NgIf, i3.NgTemplateOutlet, i3.NgClass, i4.NovoDropdownElement, i5.NovoButtonElement, i4.NovoDropdownListElement, i3.NgForOf, i6.NovoSearchBoxElement, i4.NovoItemElement], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-breadcrumb-font-style[_ngcontent-%COMP%], [_nghost-%COMP%]   .novo-breadcrumb-item[_ngcontent-%COMP%], [_nghost-%COMP%]   .novo-breadcrumb-item[_ngcontent-%COMP%]     a, [_nghost-%COMP%]   .novo-breadcrumb-separator[_ngcontent-%COMP%]{color:inherit;display:inline;font-size:1.2rem;font-weight:400;line-height:1.5rem}[_nghost-%COMP%], [_nghost-%COMP%]   .novo-breadcrumb-item[_ngcontent-%COMP%]{align-items:center;display:flex;flex-flow:row nowrap}[_nghost-%COMP%]   .novo-breadcrumb-item[_ngcontent-%COMP%]{cursor:auto}[_nghost-%COMP%]   .novo-breadcrumb-item[_ngcontent-%COMP%]     a:hover{text-decoration:none}[_nghost-%COMP%]   .novo-breadcrumb-item[_ngcontent-%COMP%]     a{color:#4a89dc;cursor:pointer}[_nghost-%COMP%]   .novo-breadcrumb-item[_ngcontent-%COMP%]     a:focus{text-decoration:none}[_nghost-%COMP%]   .novo-breadcrumb-down-icon[_ngcontent-%COMP%]{cursor:pointer;display:inline-block;height:16px;margin-right:-5px;outline:none;text-align:center;vertical-align:middle;width:16px}[_nghost-%COMP%]   .novo-breadcrumb-down-icon[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]   g[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%]{fill:#3d464d}[_nghost-%COMP%]   .novo-breadcrumb-item-active[_ngcontent-%COMP%]{color:#3d464d}[_nghost-%COMP%]   .novo-breadcrumb-item-active[_ngcontent-%COMP%]     a{color:#3d464d;text-decoration:none}[_nghost-%COMP%]   .novo-breadcrumb-item-active[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   g[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%]{fill:#3d464d}[_nghost-%COMP%]   .novo-breadcrumb-item-active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#3d464d}[_nghost-%COMP%]   .novo-breadcrumb-separator[_ngcontent-%COMP%]{margin:0 3px}[_nghost-%COMP%]   .novo-breadcrumb-dropdown-menu[_ngcontent-%COMP%]{max-width:200px;padding:10px 0}[_nghost-%COMP%]   .novo-breadcrumb-dropdown-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{cursor:pointer;font-size:12px;line-height:36px;overflow:hidden;padding:0 15px;text-overflow:ellipsis;white-space:nowrap;width:200px}[_nghost-%COMP%]   .novo-breadcrumb-dropdown-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#3d464d;display:inline-block;line-height:36px;width:170px}[_nghost-%COMP%]   .novo-breadcrumb-dropdown-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus{text-decoration:none}[_nghost-%COMP%]   .novo-breadcrumb-dropdown-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background:#bebebe}[_nghost-%COMP%]   .novo-breadcrumb-dropdown-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]{text-decoration:none}[_nghost-%COMP%]   .novo-search-container[_ngcontent-%COMP%]{max-width:200px}[_nghost-%COMP%]   span.novo-breadcrumb-dropdown-origin[_ngcontent-%COMP%]{display:inline-flex;min-width:unset;padding:0}[_nghost-%COMP%]   novo-search[_ngcontent-%COMP%]{width:100%}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BreadcrumbItemElement, [{
        type: Component,
        args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'novo-breadcrumb-item',
                templateUrl: './BreadcrumbItem.html',
                styleUrls: ['./BreadcrumbItem.scss'],
            }]
    }], function () { return [{ type: i1.BreadcrumbElement }, { type: i2.BreadcrumbService }]; }, { showMenu: [{
            type: Input
        }], customMenuTemplate: [{
            type: Input
        }], menuList: [{
            type: Input
        }], isSearch: [{
            type: Input
        }], toggleEvent: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYkl0ZW0uanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYi1pdGVtL0JyZWFkY3J1bWJJdGVtLnRzIiwiZWxlbWVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYi1pdGVtL0JyZWFkY3J1bWJJdGVtLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7Ozs7OztJQ0tsRCwrQkFDRTtJQUFBLHVDQUE2RztJQUE5RSxvT0FBZ0M7SUFBZ0MsaUJBQWM7SUFDL0csaUJBQU07O0lBRDRELGVBQThCO0lBQTlCLG1DQUE4Qjs7O0lBRzlGLDZCQUNpRDtJQUFBLFlBQWU7SUFBQSxpQkFBSTs7O0lBRFYsc0RBQWtCLHVEQUFBO0lBQzNCLGVBQWU7SUFBZixtQ0FBZTs7OztJQUNoRSw2QkFDcUM7SUFBbkMsaVJBQWtDO0lBQUMsWUFBZTtJQUFBLGlCQUFJOzs7SUFEQyx3Q0FBc0IseUNBQUE7SUFDMUMsZUFBZTtJQUFmLG1DQUFlOzs7SUFKdEQsZ0NBQ0U7SUFBQSx5RkFDaUQ7SUFDakQseUZBQ3FDO0lBQ3ZDLGlCQUFPOzs7SUFMb0MsZ0RBQXVCO0lBQzdELGVBQXNEO0lBQXRELDZFQUFzRDtJQUV0RCxlQUFzQztJQUF0Qyx5REFBc0M7Ozs7SUFibkQsNkJBQ0U7SUFBQSxrQ0FFRTtJQUFBLHFHQUF1RDtJQUN2RCxxQ0FDRTtJQUFBLDRCQUEyRDtJQUMzRCxnQ0FDRTtJQUFBLHNGQUNFO0lBRUYsd0ZBQ0U7SUFLSixpQkFBTztJQUNULGlCQUFnQjtJQUNsQixpQkFBTztJQUNULDBCQUFlOzs7O0lBbEJQLGVBQXFEO0lBQXJELG1FQUFxRDtJQUU1QyxlQUF5QztJQUF6QyxzQ0FBeUM7SUFJN0MsZUFBZ0I7SUFBaEIsc0NBQWdCO0lBR2YsZUFBb0M7SUFBcEMsZ0RBQW9DOzs7SUFZaEQsZ0NBQ0U7SUFBQSxrQkFBWTtJQUNkLGlCQUFPOzs7SUFJUCwyQkFBSztJQUFBLG9CQUFJO0lBQUEsaUJBQU07Ozs7SUFjZiwrQkFDRTtJQUFBLG1CQUNGO0lBQUEsaUJBQU87Ozs7QURqQ1QsTUFBTSxPQUFPLHFCQUFxQjtJQVVoQyxZQUFtQixtQkFBc0MsRUFBVSxpQkFBb0M7UUFBcEYsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFUOUYsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7SUFLdUMsQ0FBQztJQUMzRyxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxRQUFRLENBQUMsTUFBTTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxXQUFXLENBQUMsTUFBTTtRQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMvRztJQUNILENBQUM7SUFDRCxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUk7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7MEZBekJVLHFCQUFxQjswREFBckIscUJBQXFCOztRQ1hsQyx3RkFDRTtRQW9CRix1SEFDRTtRQUtGLHVIQUNFO1FBSUYsK0JBQ0U7UUFBQSxzRkFLQTtRQUNGLGlCQUFPO1FBRVAsdUhBQ0U7Ozs7UUExQ1ksbUNBQTJDLGlCQUFBO1FBa0NyRCxlQUE2RztRQUE3RyxzSEFBNkcsNERBQUE7O2tERHZCcEcscUJBQXFCO2NBTmpDLFNBQVM7ZUFBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7YUFDckM7b0dBRVUsUUFBUTtrQkFBaEIsS0FBSztZQUNHLGtCQUFrQjtrQkFBMUIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0ksV0FBVztrQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYkVsZW1lbnQgfSBmcm9tICcuLi9CcmVhZGNydW1iJztcbmltcG9ydCB7IEJyZWFkY3J1bWJTZXJ2aWNlIH0gZnJvbSAnLi4vQnJlYWRjcnVtYi5zZXJ2aWNlJztcbmltcG9ydCB7IE1lbnVDb25maWcgfSBmcm9tICcuLi9CcmVhZGNydW1iLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ25vdm8tYnJlYWRjcnVtYi1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL0JyZWFkY3J1bWJJdGVtLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9CcmVhZGNydW1iSXRlbS5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJJdGVtRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHNob3dNZW51ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbU1lbnVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgbWVudUxpc3Q6IEFycmF5PE1lbnVDb25maWc+O1xuICBASW5wdXQoKSBpc1NlYXJjaCA9IGZhbHNlO1xuICBAT3V0cHV0KCkgdG9nZ2xlRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgbWVudUxpc3REaXNwbGF5OiBBcnJheTxNZW51Q29uZmlnPjtcbiAgaXNPcGVuOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBicmVhZGNydW1iQ29tcG9uZW50OiBCcmVhZGNydW1iRWxlbWVudCwgcHJpdmF0ZSBicmVhZGNydW1iU2VydmljZTogQnJlYWRjcnVtYlNlcnZpY2UpIHt9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubWVudUxpc3REaXNwbGF5ID0gdGhpcy5tZW51TGlzdDtcbiAgfVxuICBvblRvZ2dsZSgkZXZlbnQpIHtcbiAgICB0aGlzLmlzT3BlbiA9ICRldmVudDtcbiAgICB0aGlzLnRvZ2dsZUV2ZW50LmVtaXQoJGV2ZW50KTtcbiAgfVxuICBzZWFyY2hFdmVudCgkZXZlbnQpIHtcbiAgICBpZiAodGhpcy5tZW51TGlzdCkge1xuICAgICAgdGhpcy5tZW51TGlzdERpc3BsYXkgPSB0aGlzLm1lbnVMaXN0LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJGV2ZW50LnRvTG93ZXJDYXNlKCkpKTtcbiAgICB9XG4gIH1cbiAgbmF2aWdhdGVUbygkZXZlbnQsIGl0ZW0pIHtcbiAgICB0aGlzLmJyZWFkY3J1bWJTZXJ2aWNlLm5hdmlnYXRlVG8oJGV2ZW50LCBpdGVtKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dNZW51OyBlbHNlIGJyZWFkY3J1bWJDb250ZW50VHBsXCI+XG4gIDxzcGFuIFtuZ0NsYXNzXT1cInsgJ25vdm8tYnJlYWRjcnVtYi1pdGVtLWFjdGl2ZSc6IGlzT3BlbiB9XCIgI29yaWdpblxuICAgIGNsYXNzPVwibm92by1kcm9wZG93bi1uby1ib3JkZXIgbm92by1kcm9wZG93bi1vcmlnaW4gbm92by1icmVhZGNydW1iLWRyb3Bkb3duLW9yaWdpblwiPlxuICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJicmVhZGNydW1iQ29udGVudFRwbFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPG5vdm8tZHJvcGRvd24+XG4gICAgICA8YnV0dG9uIHRoZW1lPVwiaWNvblwiIGljb249XCJjb2xsYXBzZVwiIHNpemU9XCJzbWFsbFwiPjwvYnV0dG9uPlxuICAgICAgPGxpc3QgY2xhc3M9XCJub3ZvLWJyZWFkY3J1bWItZHJvcGRvd24tbWVudVwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTZWFyY2hcIiBjbGFzcz1cImRyb3Bkb3duLXNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgICA8bm92by1zZWFyY2ggYWx3YXlzT3Blbj1cInRydWVcIiAoc2VhcmNoRm4pPVwic2VhcmNoRXZlbnQoJGV2ZW50KVwiIFtjbGFzc109XCInc2VhcmNoLWluLWRyb3Bkb3duJ1wiPjwvbm92by1zZWFyY2g+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtZW51TGlzdERpc3BsYXlcIiB0aXRsZT1cInt7IGl0ZW0ubmFtZSB9fVwiPlxuICAgICAgICAgIDxhICpuZ0lmPVwiIWl0ZW0ubGlua1R5cGUgfHwgaXRlbS5saW5rVHlwZSA9PT0gJ2hyZWZMaW5rJ1wiIFtocmVmXT1cIml0ZW0ubGlua1wiIHJlbD1cIm5vb3BlbmVyXCJcbiAgICAgICAgICAgIFt0YXJnZXRdPVwiaXRlbS50YXJnZXQgPyBpdGVtLnRhcmdldCA6ICdfc2VsZidcIj57eyBpdGVtLm5hbWUgfX08L2E+XG4gICAgICAgICAgPGEgKm5nSWY9XCJpdGVtLmxpbmtUeXBlID09PSAncm91dGVyTGluaydcIiByZWw9XCJub29wZW5lclwiIFt0YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbaHJlZl09XCJpdGVtLmxpbmtcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm5hdmlnYXRlVG8oJGV2ZW50LCBpdGVtKVwiPnt7IGl0ZW0ubmFtZSB9fTwvYT5cbiAgICAgICAgPC9pdGVtPlxuICAgICAgPC9saXN0PlxuICAgIDwvbm92by1kcm9wZG93bj5cbiAgPC9zcGFuPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjYnJlYWRjcnVtYkNvbnRlbnRUcGw+XG4gIDxzcGFuIGNsYXNzPVwibm92by1icmVhZGNydW1iLWl0ZW1cIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZHJvcERvd25NZW51VHBsPlxuICA8ZGl2PnRlc3Q8L2Rpdj5cblxuPC9uZy10ZW1wbGF0ZT5cblxuPHNwYW4gY2xhc3M9XCJub3ZvLWJyZWFkY3J1bWItc2VwYXJhdG9yXCI+XG4gIDxuZy10ZW1wbGF0ZVxuICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImJyZWFkY3J1bWJDb21wb25lbnQuc2VwYXJhdG9ySWNvbiA/IGJyZWFkY3J1bWJDb21wb25lbnQuc2VwYXJhdG9ySWNvbiA6IGRlZmF1bHRTZXBhcmF0b3JcIlxuICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgJGltcGxpY2l0OiB0aGlzXG4gIH1cIj5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvc3Bhbj5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0U2VwYXJhdG9yPlxuICA8c3BhbiBjbGFzcz1cIm5vdm8tYnJlYWRjcnVtYi1zZXBhcmF0b3JcIj5cbiAgICAvXG4gIDwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+Il19