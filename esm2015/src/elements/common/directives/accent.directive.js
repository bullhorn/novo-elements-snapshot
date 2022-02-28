// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
export class AccentColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_textColor() {
        return `novo-accent-${this.accent}`;
    }
}
AccentColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[accent]',
            },] }
];
AccentColorDirective.ctorParameters = () => [
    { type: ElementRef }
];
AccentColorDirective.propDecorators = {
    accent: [{ type: Input }],
    hb_textColor: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZW50LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy9hY2NlbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFDQUFxQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzFFLE1BQU0sT0FBTyxvQkFBb0I7SUFRL0IsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDO0lBTHRDLElBQ0ksWUFBWTtRQUNkLE9BQU8sZUFBZSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7O1lBVEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2FBQ3JCOzs7WUFKbUIsVUFBVTs7O3FCQU0zQixLQUFLOzJCQUVMLFdBQVcsU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FjY2VudF0nLFxufSlcbmV4cG9ydCBjbGFzcyBBY2NlbnRDb2xvckRpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGFjY2VudDogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfdGV4dENvbG9yKCkge1xuICAgIHJldHVybiBgbm92by1hY2NlbnQtJHt0aGlzLmFjY2VudH1gO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cbn1cbiJdfQ==