// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, Directive, HostBinding, Input, QueryList, TemplateRef, ViewContainerRef, } from '@angular/core';
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
NovoLoadingElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-loading',
                template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `
            },] }
];
NovoLoadingElement.propDecorators = {
    theme: [{ type: Input }],
    color: [{ type: Input }],
    size: [{ type: Input }],
    hb_class: [{ type: HostBinding, args: ['class',] }]
};
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
NovoSpinnerElement.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NovoSpinnerElement.propDecorators = {
    theme: [{ type: Input }],
    color: [{ type: Input }],
    size: [{ type: Input }],
    inverse: [{ type: Input }],
    hb_class: [{ type: HostBinding, args: ['class',] }]
};
export class NovoSkeletonDirective {
    constructor() {
        this.skeleton = true;
    }
}
NovoSkeletonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[skeleton]',
            },] }
];
NovoSkeletonDirective.propDecorators = {
    skeleton: [{ type: HostBinding, args: ['class.skeleton',] }]
};
export class NovoLoadedDirective {
}
NovoLoadedDirective.decorators = [
    { type: Directive, args: [{
                selector: '[loaded]',
            },] }
];
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
NovoIsLoadingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[isLoading]',
            },] }
];
NovoIsLoadingDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
NovoIsLoadingDirective.propDecorators = {
    skeletonTemplates: [{ type: ContentChildren, args: [NovoSkeletonDirective, { read: TemplateRef },] }],
    loadedTemplates: [{ type: ContentChildren, args: [NovoLoadedDirective, { read: TemplateRef },] }],
    isLoading: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9sb2FkaW5nL0xvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFFVCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBWXZCLE1BQU0sT0FBTyxrQkFBa0I7SUFWL0I7UUE0QkUsU0FBSSxHQUFXLFFBQVEsQ0FBQztJQU0xQixDQUFDO0lBdkJDOzs7UUFHSTtJQUNKLElBQ0ksS0FBSyxDQUFDLEtBQWE7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQVFELElBQ0ksUUFBUTtRQUNWLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7WUFqQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUU7Ozs7OztHQU1UO2FBQ0Y7OztvQkFNRSxLQUFLO29CQVNMLEtBQUs7bUJBR0wsS0FBSzt1QkFHTCxXQUFXLFNBQUMsT0FBTzs7QUF1QnRCLE1BQU0sT0FBTyxrQkFBa0I7SUFqQi9CO1FBbUNF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QUNoQjtTQUNGO0lBQ0gsQ0FBQzs7O1lBcENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTthQUN4Qjs7O1lBekdDLGdCQUFnQjs7O2dDQTJHZixlQUFlLFNBQUMscUJBQXFCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOzhCQUU1RCxlQUFlLFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO3dCQVMxRCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWxvYWRpbmcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTG9hZGluZ0VsZW1lbnQge1xuICAvKipcbiAgICogKipkZXByZWNhdGVkKiogcGxlYXNlIHVzZSBgY29sb3JgLlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHNldCB0aGVtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc29sZS53YXJuKGAndGhlbWUnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJ2NvbG9yJy5gKTtcbiAgICB0aGlzLmNvbG9yID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHRoZW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3I7XG4gIH1cblxuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNpemU6IHN0cmluZyA9ICdtZWRpdW0nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfY2xhc3MoKSB7XG4gICAgcmV0dXJuIFtgY29sb3ItJHt0aGlzLmNvbG9yfWAsIGBzaXplLSR7dGhpcy5zaXplfWBdLmpvaW4oJyAnKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNwaW5uZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkb3QxIGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3QyIGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3QzIGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3Q0IGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3Q1IGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3Q2IGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3Q3IGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3Q4IGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3Q5IGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3QxMCBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90MTEgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDEyIGRvdFwiPjwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU3Bpbm5lckVsZW1lbnQge1xuICAvKipcbiAgICogKipkZXByZWNhdGVkKiogcGxlYXNlIHVzZSBgY29sb3JgLlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHNldCB0aGVtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc29sZS53YXJuKGAndGhlbWUnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJ2NvbG9yJy5gKTtcbiAgICB0aGlzLmNvbG9yID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHRoZW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3I7XG4gIH1cblxuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNpemU6IHN0cmluZyA9ICdtZWRpdW0nO1xuXG4gIHByaXZhdGUgX2ludmVyc2U6IGJvb2xlYW47XG4gIGdldCBpbnZlcnNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbnZlcnNlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpbnZlcnNlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faW52ZXJzZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX2NsYXNzKCkge1xuICAgIHJldHVybiBbdGhpcy5pbnZlcnNlID8gJ2NvbG9yLXdoaXRlJyA6IGBjb2xvci0ke3RoaXMuY29sb3J9YCwgYHNpemUtJHt0aGlzLnNpemV9YF0uam9pbignICcpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tza2VsZXRvbl0nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2tlbGV0b25EaXJlY3RpdmUge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNrZWxldG9uJylcbiAgc2tlbGV0b246IGJvb2xlYW4gPSB0cnVlO1xufVxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xvYWRlZF0nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTG9hZGVkRGlyZWN0aXZlIHt9XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tpc0xvYWRpbmddJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0lzTG9hZGluZ0RpcmVjdGl2ZSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b1NrZWxldG9uRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pXG4gIHB1YmxpYyBza2VsZXRvblRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9Mb2FkZWREaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSlcbiAgcHVibGljIGxvYWRlZFRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gIHByaXZhdGUgaGFzVmlldyA9IGZhbHNlO1xuICBwcml2YXRlIHNrZWxldG9uVmlld3M6IEVtYmVkZGVkVmlld1JlZjxOb3ZvU2tlbGV0b25EaXJlY3RpdmU+W10gPSBbXTtcbiAgcHJpdmF0ZSBsb2FkZWRWaWV3czogRW1iZWRkZWRWaWV3UmVmPE5vdm9Mb2FkZWREaXJlY3RpdmU+W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHt9XG5cbiAgQElucHV0KClcbiAgc2V0IGlzTG9hZGluZyhjb25kaXRpb246IGJvb2xlYW4pIHtcbiAgICBpZiAoIWNvbmRpdGlvbiAmJiAhdGhpcy5oYXNWaWV3KSB7XG4gICAgICB0aGlzLmRlc3Ryb3lWaWV3cyh0aGlzLmxvYWRlZFZpZXdzKTtcbiAgICAgIHRoaXMuc2tlbGV0b25WaWV3cyA9IHRoaXMuY3JlYXRlVmlld3ModGhpcy5za2VsZXRvblRlbXBsYXRlcyk7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoY29uZGl0aW9uICYmIHRoaXMuaGFzVmlldykge1xuICAgICAgdGhpcy5kZXN0cm95Vmlld3ModGhpcy5za2VsZXRvblZpZXdzKTtcbiAgICAgIHRoaXMubG9hZGVkVmlld3MgPSB0aGlzLmNyZWF0ZVZpZXdzKHRoaXMubG9hZGVkVGVtcGxhdGVzKTtcbiAgICAgIHRoaXMuaGFzVmlldyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBjcmVhdGVWaWV3cyh0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+Pikge1xuICAgIHJldHVybiB0ZW1wbGF0ZXMgJiYgdGVtcGxhdGVzLm1hcCgodiwgaSkgPT4gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh2LCBudWxsLCBpKSk7XG4gIH1cbiAgZGVzdHJveVZpZXdzKHZpZXdzOiBFbWJlZGRlZFZpZXdSZWY8YW55PltdKSB7XG4gICAgaWYgKHZpZXdzKSB7XG4gICAgICBmb3IgKGNvbnN0IHZpZXcgb2Ygdmlld3MpIHtcbiAgICAgICAgdmlldy5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=