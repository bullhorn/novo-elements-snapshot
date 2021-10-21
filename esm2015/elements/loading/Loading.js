// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, Directive, HostBinding, Input, QueryList, TemplateRef, ViewContainerRef, } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoLoadingElement {
    constructor() {
        this._small = false;
        this._large = false;
    }
    get small() {
        return this._small;
    }
    set small(value) {
        this._small = coerceBooleanProperty(value);
    }
    get large() {
        return this._large;
    }
}
NovoLoadingElement.ɵfac = function NovoLoadingElement_Factory(t) { return new (t || NovoLoadingElement)(); };
NovoLoadingElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoLoadingElement, selectors: [["novo-loading"]], hostVars: 4, hostBindings: function NovoLoadingElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.theme || "");
        i0.ɵɵclassProp("small", ctx.small);
    } }, inputs: { theme: "theme", small: "small" }, decls: 5, vars: 0, consts: [[1, "dot"]], template: function NovoLoadingElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "span", 0);
        i0.ɵɵelement(1, "span", 0);
        i0.ɵɵelement(2, "span", 0);
        i0.ɵɵelement(3, "span", 0);
        i0.ɵɵelement(4, "span", 0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoLoadingElement, [{
        type: Component,
        args: [{
                selector: 'novo-loading',
                host: {
                    '[class]': 'theme || ""',
                },
                template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `,
            }]
    }], null, { theme: [{
            type: Input
        }], small: [{
            type: Input
        }, {
            type: HostBinding,
            args: ['class.small']
        }] }); })();
export class NovoSpinnerElement {
    constructor() {
        this.theme = 'multicolor';
        this._small = false;
        this._large = false;
    }
    get small() {
        return this._small;
    }
    set small(value) {
        this._small = coerceBooleanProperty(value);
    }
    get large() {
        return this._large;
    }
    set large(value) {
        this._large = coerceBooleanProperty(value);
    }
    get inverse() {
        return this._inverse;
    }
    set inverse(value) {
        this._inverse = coerceBooleanProperty(value);
    }
    get hb_class() {
        return this.inverse ? 'white' : this.theme;
    }
}
NovoSpinnerElement.ɵfac = function NovoSpinnerElement_Factory(t) { return new (t || NovoSpinnerElement)(); };
NovoSpinnerElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoSpinnerElement, selectors: [["novo-spinner"]], hostVars: 6, hostBindings: function NovoSpinnerElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.hb_class);
        i0.ɵɵclassProp("small", ctx.small)("large", ctx.large);
    } }, inputs: { theme: "theme", small: "small", large: "large", inverse: "inverse" }, decls: 12, vars: 0, consts: [[1, "dot1", "dot"], [1, "dot2", "dot"], [1, "dot3", "dot"], [1, "dot4", "dot"], [1, "dot5", "dot"], [1, "dot6", "dot"], [1, "dot7", "dot"], [1, "dot8", "dot"], [1, "dot9", "dot"], [1, "dot10", "dot"], [1, "dot11", "dot"], [1, "dot12", "dot"]], template: function NovoSpinnerElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵelement(2, "div", 2);
        i0.ɵɵelement(3, "div", 3);
        i0.ɵɵelement(4, "div", 4);
        i0.ɵɵelement(5, "div", 5);
        i0.ɵɵelement(6, "div", 6);
        i0.ɵɵelement(7, "div", 7);
        i0.ɵɵelement(8, "div", 8);
        i0.ɵɵelement(9, "div", 9);
        i0.ɵɵelement(10, "div", 10);
        i0.ɵɵelement(11, "div", 11);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSpinnerElement, [{
        type: Component,
        args: [{
                selector: 'novo-spinner',
                template: `
    <div class="dot1 dot"></div>
    <div class="dot2 dot"></div>
    <div class="dot3 dot"></div>
    <div class="dot4 dot"></div>
    <div class="dot5 dot"></div>
    <div class="dot6 dot"></div>
    <div class="dot7 dot"></div>
    <div class="dot8 dot"></div>
    <div class="dot9 dot"></div>
    <div class="dot10 dot"></div>
    <div class="dot11 dot"></div>
    <div class="dot12 dot"></div>
  `,
            }]
    }], null, { theme: [{
            type: Input
        }], small: [{
            type: Input
        }, {
            type: HostBinding,
            args: ['class.small']
        }], large: [{
            type: Input
        }, {
            type: HostBinding,
            args: ['class.large']
        }], inverse: [{
            type: Input
        }], hb_class: [{
            type: HostBinding,
            args: ['class']
        }] }); })();
export class NovoSkeletonDirective {
    constructor() {
        this.skeleton = true;
    }
}
NovoSkeletonDirective.ɵfac = function NovoSkeletonDirective_Factory(t) { return new (t || NovoSkeletonDirective)(); };
NovoSkeletonDirective.ɵdir = i0.ɵɵdefineDirective({ type: NovoSkeletonDirective, selectors: [["", "skeleton", ""]], hostVars: 2, hostBindings: function NovoSkeletonDirective_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("skeleton", ctx.skeleton);
    } } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSkeletonDirective, [{
        type: Directive,
        args: [{
                selector: '[skeleton]',
            }]
    }], null, { skeleton: [{
            type: HostBinding,
            args: ['class.skeleton']
        }] }); })();
export class NovoLoadedDirective {
}
NovoLoadedDirective.ɵfac = function NovoLoadedDirective_Factory(t) { return new (t || NovoLoadedDirective)(); };
NovoLoadedDirective.ɵdir = i0.ɵɵdefineDirective({ type: NovoLoadedDirective, selectors: [["", "loaded", ""]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoLoadedDirective, [{
        type: Directive,
        args: [{
                selector: '[loaded]',
            }]
    }], null, null); })();
export class NovoIsLoadingDirective {
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.hasView = false;
        this.skeletonViews = [];
        this.loadedViews = [];
    }
    set isLoading(condition) {
        if (!condition && !this.hasView) {
            this.destroyViews(this.loadedViews);
            this.skeletonViews = this.createViews(this.skeletonTemplates);
            this.hasView = true;
        }
        else if (condition && this.hasView) {
            this.destroyViews(this.skeletonViews);
            this.loadedViews = this.createViews(this.loadedTemplates);
            this.hasView = false;
        }
    }
    createViews(templates) {
        return templates && templates.map((v) => this.viewContainer.createEmbeddedView(v));
    }
    destroyViews(views) {
        if (views) {
            for (const view of views) {
                view.destroy();
            }
        }
    }
}
NovoIsLoadingDirective.ɵfac = function NovoIsLoadingDirective_Factory(t) { return new (t || NovoIsLoadingDirective)(i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
NovoIsLoadingDirective.ɵdir = i0.ɵɵdefineDirective({ type: NovoIsLoadingDirective, selectors: [["", "isLoading", ""]], contentQueries: function NovoIsLoadingDirective_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, NovoSkeletonDirective, false, TemplateRef);
        i0.ɵɵcontentQuery(dirIndex, NovoLoadedDirective, false, TemplateRef);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.skeletonTemplates = _t);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.loadedTemplates = _t);
    } }, inputs: { isLoading: "isLoading" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoIsLoadingDirective, [{
        type: Directive,
        args: [{
                selector: '[isLoading]',
            }]
    }], function () { return [{ type: i0.ViewContainerRef }]; }, { skeletonTemplates: [{
            type: ContentChildren,
            args: [NovoSkeletonDirective, { read: TemplateRef }]
        }], loadedTemplates: [{
            type: ContentChildren,
            args: [NovoLoadedDirective, { read: TemplateRef }]
        }], isLoading: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9sb2FkaW5nL0xvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFFVCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDOztBQWV2QixNQUFNLE9BQU8sa0JBQWtCO0lBYi9CO1FBZ0JVLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFVeEIsV0FBTSxHQUFZLEtBQUssQ0FBQztLQUlqQztJQWJDLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFFSSxLQUFLLENBQUMsS0FBYztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFHRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7b0ZBaEJVLGtCQUFrQjt1REFBbEIsa0JBQWtCOzs7O1FBUDNCLDBCQUF5QjtRQUN6QiwwQkFBeUI7UUFDekIsMEJBQXlCO1FBQ3pCLDBCQUF5QjtRQUN6QiwwQkFBeUI7O2tEQUdoQixrQkFBa0I7Y0FiOUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLGFBQWE7aUJBQ3pCO2dCQUNELFFBQVEsRUFBRTs7Ozs7O0dBTVQ7YUFDRjtnQkFHQyxLQUFLO2tCQURKLEtBQUs7WUFRRixLQUFL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LElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUNELFdBQVcsQ0FBQyxTQUFzQztRQUNoRCxPQUFPLFNBQVMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUNELFlBQVksQ0FBQyxLQUE2QjtRQUN4QyxJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO2dCQUN4QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7U0FDRjtJQUNILENBQUM7OzRGQWpDVSxzQkFBc0I7MkRBQXRCLHNCQUFzQjtvQ0FDaEIscUJBQXFCLFNBQVUsV0FBVztvQ0FFMUMsbUJBQW1CLFNBQVUsV0FBVzs7Ozs7O2tEQUg5QyxzQkFBc0I7Y0FIbEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCO21FQUdRLGlCQUFpQjtrQkFEdkIsZUFBZTttQkFBQyxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7WUFHdEQsZUFBZTtrQkFEckIsZUFBZTttQkFBQyxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7WUFVdkQsU0FBUztrQkFEWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWxvYWRpbmcnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAndGhlbWUgfHwgXCJcIicsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Mb2FkaW5nRWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX3NtYWxsOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBzbWFsbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc21hbGw7XG4gIH1cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zbWFsbCcpXG4gIHNldCBzbWFsbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3NtYWxsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xhcmdlOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBsYXJnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbGFyZ2U7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zcGlubmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZG90MSBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90MiBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90MyBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90NCBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90NSBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90NiBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90NyBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90OCBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90OSBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90MTAgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDExIGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3QxMiBkb3RcIj48L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NwaW5uZXJFbGVtZW50IHtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZyA9ICdtdWx0aWNvbG9yJztcblxuICBwcml2YXRlIF9zbWFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc21hbGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NtYWxsO1xuICB9XG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc21hbGwnKVxuICBzZXQgc21hbGwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zbWFsbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9sYXJnZTogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgbGFyZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xhcmdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MubGFyZ2UnKVxuICBzZXQgbGFyZ2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9sYXJnZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9pbnZlcnNlOiBib29sZWFuO1xuICBnZXQgaW52ZXJzZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW52ZXJzZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaW52ZXJzZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2ludmVyc2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl9jbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbnZlcnNlID8gJ3doaXRlJyA6IHRoaXMudGhlbWU7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NrZWxldG9uXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ta2VsZXRvbkRpcmVjdGl2ZSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2tlbGV0b24nKVxuICBza2VsZXRvbjogYm9vbGVhbiA9IHRydWU7XG59XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbG9hZGVkXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Mb2FkZWREaXJlY3RpdmUge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2lzTG9hZGluZ10nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXNMb2FkaW5nRGlyZWN0aXZlIHtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvU2tlbGV0b25EaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSlcbiAgcHVibGljIHNrZWxldG9uVGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0xvYWRlZERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KVxuICBwdWJsaWMgbG9hZGVkVGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgcHJpdmF0ZSBoYXNWaWV3ID0gZmFsc2U7XG4gIHByaXZhdGUgc2tlbGV0b25WaWV3czogRW1iZWRkZWRWaWV3UmVmPE5vdm9Ta2VsZXRvbkRpcmVjdGl2ZT5bXSA9IFtdO1xuICBwcml2YXRlIGxvYWRlZFZpZXdzOiBFbWJlZGRlZFZpZXdSZWY8Tm92b0xvYWRlZERpcmVjdGl2ZT5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cblxuICBASW5wdXQoKVxuICBzZXQgaXNMb2FkaW5nKGNvbmRpdGlvbjogYm9vbGVhbikge1xuICAgIGlmICghY29uZGl0aW9uICYmICF0aGlzLmhhc1ZpZXcpIHtcbiAgICAgIHRoaXMuZGVzdHJveVZpZXdzKHRoaXMubG9hZGVkVmlld3MpO1xuICAgICAgdGhpcy5za2VsZXRvblZpZXdzID0gdGhpcy5jcmVhdGVWaWV3cyh0aGlzLnNrZWxldG9uVGVtcGxhdGVzKTtcbiAgICAgIHRoaXMuaGFzVmlldyA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChjb25kaXRpb24gJiYgdGhpcy5oYXNWaWV3KSB7XG4gICAgICB0aGlzLmRlc3Ryb3lWaWV3cyh0aGlzLnNrZWxldG9uVmlld3MpO1xuICAgICAgdGhpcy5sb2FkZWRWaWV3cyA9IHRoaXMuY3JlYXRlVmlld3ModGhpcy5sb2FkZWRUZW1wbGF0ZXMpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGNyZWF0ZVZpZXdzKHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+KSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlcyAmJiB0ZW1wbGF0ZXMubWFwKCh2KSA9PiB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHYpKTtcbiAgfVxuICBkZXN0cm95Vmlld3Modmlld3M6IEVtYmVkZGVkVmlld1JlZjxhbnk+W10pIHtcbiAgICBpZiAodmlld3MpIHtcbiAgICAgIGZvciAoY29uc3QgdmlldyBvZiB2aWV3cykge1xuICAgICAgICB2aWV3LmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==