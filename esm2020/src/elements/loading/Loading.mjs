// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, Directive, HostBinding, Input, QueryList, TemplateRef, ViewContainerRef, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NovoLoadingElement {
    constructor() {
        this.size = 'medium';
    }
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value) {
        console.warn(`'theme' property is deprecated, please use 'color'.`);
        this.color = value;
    }
    get theme() {
        return this.color;
    }
    get hb_class() {
        return [`color-${this.color}`, `size-${this.size}`].join(' ');
    }
}
NovoLoadingElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoLoadingElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoLoadingElement, selector: "novo-loading", inputs: { theme: "theme", color: "color", size: "size", showLoadMessage: "showLoadMessage" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <div class="message" *ngIf="showLoadMessage"><ng-content></ng-content></div>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-loading',
                    template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <div class="message" *ngIf="showLoadMessage"><ng-content></ng-content></div>
  `,
                }]
        }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], showLoadMessage: [{
                type: Input
            }], hb_class: [{
                type: HostBinding,
                args: ['class']
            }] } });
export class NovoSpinnerElement {
    constructor() {
        this.size = 'medium';
    }
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value) {
        console.warn(`'theme' property is deprecated, please use 'color'.`);
        this.color = value;
    }
    get theme() {
        return this.color;
    }
    get inverse() {
        return this._inverse;
    }
    set inverse(value) {
        this._inverse = coerceBooleanProperty(value);
    }
    get hb_class() {
        return [this.inverse ? 'color-white' : `color-${this.color}`, `size-${this.size}`].join(' ');
    }
}
NovoSpinnerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSpinnerElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoSpinnerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSpinnerElement, selector: "novo-spinner", inputs: { theme: "theme", color: "color", size: "size", inverse: "inverse" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
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
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSpinnerElement, decorators: [{
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
        }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], inverse: [{
                type: Input
            }], hb_class: [{
                type: HostBinding,
                args: ['class']
            }] } });
export class NovoSkeletonDirective {
    constructor() {
        this.skeleton = true;
    }
}
NovoSkeletonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSkeletonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoSkeletonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSkeletonDirective, selector: "[skeleton]", host: { properties: { "class.skeleton": "this.skeleton" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSkeletonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[skeleton]',
                }]
        }], propDecorators: { skeleton: [{
                type: HostBinding,
                args: ['class.skeleton']
            }] } });
export class NovoLoadedDirective {
}
NovoLoadedDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadedDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoLoadedDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoLoadedDirective, selector: "[loaded]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[loaded]',
                }]
        }] });
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
        return templates && templates.map((v, i) => this.viewContainer.createEmbeddedView(v, null, i));
    }
    destroyViews(views) {
        if (views) {
            for (const view of views) {
                view.destroy();
            }
        }
    }
}
NovoIsLoadingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIsLoadingDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoIsLoadingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoIsLoadingDirective, selector: "[isLoading]", inputs: { isLoading: "isLoading" }, queries: [{ propertyName: "skeletonTemplates", predicate: NovoSkeletonDirective, read: TemplateRef }, { propertyName: "loadedTemplates", predicate: NovoLoadedDirective, read: TemplateRef }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIsLoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[isLoading]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { skeletonTemplates: [{
                type: ContentChildren,
                args: [NovoSkeletonDirective, { read: TemplateRef }]
            }], loadedTemplates: [{
                type: ContentChildren,
                args: [NovoLoadedDirective, { read: TemplateRef }]
            }], isLoading: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2xvYWRpbmcvTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFdBQVcsRUFDWCxLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7OztBQWF2QixNQUFNLE9BQU8sa0JBQWtCO0lBWC9CO1FBNkJFLFNBQUksR0FBVyxRQUFRLENBQUM7S0FTekI7SUExQkM7OztRQUdJO0lBQ0osSUFDSSxLQUFLLENBQUMsS0FBYTtRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBV0QsSUFDSSxRQUFRO1FBQ1YsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7O2dIQTFCVSxrQkFBa0I7b0dBQWxCLGtCQUFrQixzTUFUbkI7Ozs7Ozs7R0FPVDs0RkFFVSxrQkFBa0I7a0JBWDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRTs7Ozs7OztHQU9UO2lCQUNGOzhCQU9LLEtBQUs7c0JBRFIsS0FBSztnQkFVTixLQUFLO3NCQURKLEtBQUs7Z0JBSU4sSUFBSTtzQkFESCxL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U0FDdEI7SUFDSCxDQUFDO0lBQ0QsV0FBVyxDQUFDLFNBQXNDO1FBQ2hELE9BQU8sU0FBUyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBQ0QsWUFBWSxDQUFDLEtBQTZCO1FBQ3hDLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtTQUNGO0lBQ0gsQ0FBQzs7b0hBakNVLHNCQUFzQjt3R0FBdEIsc0JBQXNCLHlIQUNoQixxQkFBcUIsUUFBVSxXQUFXLGtEQUUxQyxtQkFBbUIsUUFBVSxXQUFXOzRGQUg5QyxzQkFBc0I7a0JBSGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCO3VHQUdRLGlCQUFpQjtzQkFEdkIsZUFBZTt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7Z0JBR3RELGVBQWU7c0JBRHJCLGVBQWU7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2dCQVV2RCxTQUFTO3NCQURaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbG9hZGluZycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJkb3RcIj48L3NwYW4+XG4gICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIiAqbmdJZj1cInNob3dMb2FkTWVzc2FnZVwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0xvYWRpbmdFbGVtZW50IHtcbiAgLyoqXG4gICAqICoqZGVwcmVjYXRlZCoqIHBsZWFzZSB1c2UgYGNvbG9yYC5cbiAgICogQGRlcHJlY2F0ZWRcbiAgICoqL1xuICBASW5wdXQoKVxuICBzZXQgdGhlbWUodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnNvbGUud2FybihgJ3RoZW1lJyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICdjb2xvcicuYCk7XG4gICAgdGhpcy5jb2xvciA9IHZhbHVlO1xuICB9XG4gIGdldCB0aGVtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICB9XG5cbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzaXplOiBzdHJpbmcgPSAnbWVkaXVtJztcblxuICBASW5wdXQoKVxuICBzaG93TG9hZE1lc3NhZ2U6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl9jbGFzcygpIHtcbiAgICByZXR1cm4gW2Bjb2xvci0ke3RoaXMuY29sb3J9YCwgYHNpemUtJHt0aGlzLnNpemV9YF0uam9pbignICcpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc3Bpbm5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImRvdDEgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDIgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDMgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDQgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDUgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDYgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDcgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDggZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDkgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDEwIGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3QxMSBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90MTIgZG90XCI+PC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TcGlubmVyRWxlbWVudCB7XG4gIC8qKlxuICAgKiAqKmRlcHJlY2F0ZWQqKiBwbGVhc2UgdXNlIGBjb2xvcmAuXG4gICAqIEBkZXByZWNhdGVkXG4gICAqKi9cbiAgQElucHV0KClcbiAgc2V0IHRoZW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLndhcm4oYCd0aGVtZScgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnY29sb3InLmApO1xuICAgIHRoaXMuY29sb3IgPSB2YWx1ZTtcbiAgfVxuICBnZXQgdGhlbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb2xvcjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGNvbG9yOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2l6ZTogc3RyaW5nID0gJ21lZGl1bSc7XG5cbiAgcHJpdmF0ZSBfaW52ZXJzZTogYm9vbGVhbjtcbiAgZ2V0IGludmVyc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ludmVyc2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGludmVyc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pbnZlcnNlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfY2xhc3MoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmludmVyc2UgPyAnY29sb3Itd2hpdGUnIDogYGNvbG9yLSR7dGhpcy5jb2xvcn1gLCBgc2l6ZS0ke3RoaXMuc2l6ZX1gXS5qb2luKCcgJyk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NrZWxldG9uXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ta2VsZXRvbkRpcmVjdGl2ZSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2tlbGV0b24nKVxuICBza2VsZXRvbjogYm9vbGVhbiA9IHRydWU7XG59XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbG9hZGVkXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Mb2FkZWREaXJlY3RpdmUge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2lzTG9hZGluZ10nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXNMb2FkaW5nRGlyZWN0aXZlIHtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvU2tlbGV0b25EaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSlcbiAgcHVibGljIHNrZWxldG9uVGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0xvYWRlZERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KVxuICBwdWJsaWMgbG9hZGVkVGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgcHJpdmF0ZSBoYXNWaWV3ID0gZmFsc2U7XG4gIHByaXZhdGUgc2tlbGV0b25WaWV3czogRW1iZWRkZWRWaWV3UmVmPE5vdm9Ta2VsZXRvbkRpcmVjdGl2ZT5bXSA9IFtdO1xuICBwcml2YXRlIGxvYWRlZFZpZXdzOiBFbWJlZGRlZFZpZXdSZWY8Tm92b0xvYWRlZERpcmVjdGl2ZT5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cblxuICBASW5wdXQoKVxuICBzZXQgaXNMb2FkaW5nKGNvbmRpdGlvbjogYm9vbGVhbikge1xuICAgIGlmICghY29uZGl0aW9uICYmICF0aGlzLmhhc1ZpZXcpIHtcbiAgICAgIHRoaXMuZGVzdHJveVZpZXdzKHRoaXMubG9hZGVkVmlld3MpO1xuICAgICAgdGhpcy5za2VsZXRvblZpZXdzID0gdGhpcy5jcmVhdGVWaWV3cyh0aGlzLnNrZWxldG9uVGVtcGxhdGVzKTtcbiAgICAgIHRoaXMuaGFzVmlldyA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChjb25kaXRpb24gJiYgdGhpcy5oYXNWaWV3KSB7XG4gICAgICB0aGlzLmRlc3Ryb3lWaWV3cyh0aGlzLnNrZWxldG9uVmlld3MpO1xuICAgICAgdGhpcy5sb2FkZWRWaWV3cyA9IHRoaXMuY3JlYXRlVmlld3ModGhpcy5sb2FkZWRUZW1wbGF0ZXMpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGNyZWF0ZVZpZXdzKHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+KSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlcyAmJiB0ZW1wbGF0ZXMubWFwKCh2LCBpKSA9PiB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHYsIG51bGwsIGkpKTtcbiAgfVxuICBkZXN0cm95Vmlld3Modmlld3M6IEVtYmVkZGVkVmlld1JlZjxhbnk+W10pIHtcbiAgICBpZiAodmlld3MpIHtcbiAgICAgIGZvciAoY29uc3QgdmlldyBvZiB2aWV3cykge1xuICAgICAgICB2aWV3LmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==