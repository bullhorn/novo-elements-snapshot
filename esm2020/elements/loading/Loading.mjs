// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, Directive, HostBinding, Input, QueryList, TemplateRef, ViewContainerRef, } from '@angular/core';
import * as i0 from "@angular/core";
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
NovoLoadingElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoLoadingElement, selector: "novo-loading", inputs: { theme: "theme", color: "color", size: "size" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `, isInline: true });
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
  `,
                }]
        }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2xvYWRpbmcvTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFdBQVcsRUFDWCxLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7O0FBWXZCLE1BQU0sT0FBTyxrQkFBa0I7SUFWL0I7UUE0QkUsU0FBSSxHQUFXLFFBQVEsQ0FBQztLQU16QjtJQXZCQzs7O1FBR0k7SUFDSixJQUNJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMscURBQXFELENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFRRCxJQUNJLFFBQVE7UUFDVixPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7Z0hBdkJVLGtCQUFrQjtvR0FBbEIsa0JBQWtCLGtLQVJuQjs7Ozs7O0dBTVQ7NEZBRVUsa0JBQWtCO2tCQVY5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUU7Ozs7OztHQU1UO2lCQUNGOzhCQU9LLEtBQUs7c0JBRFIsS0FBSztnQkFVTixLQUFLO3NCQURKLEtBQUs7Z0JBSU4sSUFBSTtzQkFESCxLQUFLO2dC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QUMsU0FBc0M7UUFDaEQsT0FBTyxTQUFTLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFDRCxZQUFZLENBQUMsS0FBNkI7UUFDeEMsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCO1NBQ0Y7SUFDSCxDQUFDOztvSEFqQ1Usc0JBQXNCO3dHQUF0QixzQkFBc0IseUhBQ2hCLHFCQUFxQixRQUFVLFdBQVcsa0RBRTFDLG1CQUFtQixRQUFVLFdBQVc7NEZBSDlDLHNCQUFzQjtrQkFIbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtpQkFDeEI7dUdBR1EsaUJBQWlCO3NCQUR2QixlQUFlO3VCQUFDLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtnQkFHdEQsZUFBZTtzQkFEckIsZUFBZTt1QkFBQyxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7Z0JBVXZELFNBQVM7c0JBRFosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1sb2FkaW5nJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0xvYWRpbmdFbGVtZW50IHtcbiAgLyoqXG4gICAqICoqZGVwcmVjYXRlZCoqIHBsZWFzZSB1c2UgYGNvbG9yYC5cbiAgICogQGRlcHJlY2F0ZWRcbiAgICoqL1xuICBASW5wdXQoKVxuICBzZXQgdGhlbWUodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnNvbGUud2FybihgJ3RoZW1lJyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICdjb2xvcicuYCk7XG4gICAgdGhpcy5jb2xvciA9IHZhbHVlO1xuICB9XG4gIGdldCB0aGVtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICB9XG5cbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzaXplOiBzdHJpbmcgPSAnbWVkaXVtJztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX2NsYXNzKCkge1xuICAgIHJldHVybiBbYGNvbG9yLSR7dGhpcy5jb2xvcn1gLCBgc2l6ZS0ke3RoaXMuc2l6ZX1gXS5qb2luKCcgJyk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zcGlubmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZG90MSBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90MiBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90MyBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90NCBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90NSBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90NiBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90NyBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90OCBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90OSBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90MTAgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDExIGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3QxMiBkb3RcIj48L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NwaW5uZXJFbGVtZW50IHtcbiAgLyoqXG4gICAqICoqZGVwcmVjYXRlZCoqIHBsZWFzZSB1c2UgYGNvbG9yYC5cbiAgICogQGRlcHJlY2F0ZWRcbiAgICoqL1xuICBASW5wdXQoKVxuICBzZXQgdGhlbWUodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnNvbGUud2FybihgJ3RoZW1lJyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICdjb2xvcicuYCk7XG4gICAgdGhpcy5jb2xvciA9IHZhbHVlO1xuICB9XG4gIGdldCB0aGVtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICB9XG5cbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzaXplOiBzdHJpbmcgPSAnbWVkaXVtJztcblxuICBwcml2YXRlIF9pbnZlcnNlOiBib29sZWFuO1xuICBnZXQgaW52ZXJzZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW52ZXJzZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaW52ZXJzZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2ludmVyc2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl9jbGFzcygpIHtcbiAgICByZXR1cm4gW3RoaXMuaW52ZXJzZSA/ICdjb2xvci13aGl0ZScgOiBgY29sb3ItJHt0aGlzLmNvbG9yfWAsIGBzaXplLSR7dGhpcy5zaXplfWBdLmpvaW4oJyAnKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc2tlbGV0b25dJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NrZWxldG9uRGlyZWN0aXZlIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5za2VsZXRvbicpXG4gIHNrZWxldG9uOiBib29sZWFuID0gdHJ1ZTtcbn1cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsb2FkZWRdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0xvYWRlZERpcmVjdGl2ZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaXNMb2FkaW5nXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Jc0xvYWRpbmdEaXJlY3RpdmUge1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9Ta2VsZXRvbkRpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KVxuICBwdWJsaWMgc2tlbGV0b25UZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvTG9hZGVkRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pXG4gIHB1YmxpYyBsb2FkZWRUZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICBwcml2YXRlIGhhc1ZpZXcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBza2VsZXRvblZpZXdzOiBFbWJlZGRlZFZpZXdSZWY8Tm92b1NrZWxldG9uRGlyZWN0aXZlPltdID0gW107XG4gIHByaXZhdGUgbG9hZGVkVmlld3M6IEVtYmVkZGVkVmlld1JlZjxOb3ZvTG9hZGVkRGlyZWN0aXZlPltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXG4gIEBJbnB1dCgpXG4gIHNldCBpc0xvYWRpbmcoY29uZGl0aW9uOiBib29sZWFuKSB7XG4gICAgaWYgKCFjb25kaXRpb24gJiYgIXRoaXMuaGFzVmlldykge1xuICAgICAgdGhpcy5kZXN0cm95Vmlld3ModGhpcy5sb2FkZWRWaWV3cyk7XG4gICAgICB0aGlzLnNrZWxldG9uVmlld3MgPSB0aGlzLmNyZWF0ZVZpZXdzKHRoaXMuc2tlbGV0b25UZW1wbGF0ZXMpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGNvbmRpdGlvbiAmJiB0aGlzLmhhc1ZpZXcpIHtcbiAgICAgIHRoaXMuZGVzdHJveVZpZXdzKHRoaXMuc2tlbGV0b25WaWV3cyk7XG4gICAgICB0aGlzLmxvYWRlZFZpZXdzID0gdGhpcy5jcmVhdGVWaWV3cyh0aGlzLmxvYWRlZFRlbXBsYXRlcyk7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgY3JlYXRlVmlld3ModGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj4pIHtcbiAgICByZXR1cm4gdGVtcGxhdGVzICYmIHRlbXBsYXRlcy5tYXAoKHYsIGkpID0+IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodiwgbnVsbCwgaSkpO1xuICB9XG4gIGRlc3Ryb3lWaWV3cyh2aWV3czogRW1iZWRkZWRWaWV3UmVmPGFueT5bXSkge1xuICAgIGlmICh2aWV3cykge1xuICAgICAgZm9yIChjb25zdCB2aWV3IG9mIHZpZXdzKSB7XG4gICAgICAgIHZpZXcuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19