// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
export class FillColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_textColor() {
        return `novo-fill-${this.fill}`;
    }
}
FillColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fill]',
            },] }
];
FillColorDirective.ctorParameters = () => [
    { type: ElementRef }
];
FillColorDirective.propDecorators = {
    fill: [{ type: Input }],
    hb_textColor: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvY29tbW9uL2RpcmVjdGl2ZXMvZmlsbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUNBQXFDO0FBQ3JDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLMUUsTUFBTSxPQUFPLGtCQUFrQjtJQVE3QixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUFHLENBQUM7SUFMdEMsSUFDSSxZQUFZO1FBQ2QsT0FBTyxhQUFhLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7WUFURixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFFBQVE7YUFDbkI7OztZQUptQixVQUFVOzs7bUJBTTNCLEtBQUs7MkJBRUwsV0FBVyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZmlsbF0nLFxufSlcbmV4cG9ydCBjbGFzcyBGaWxsQ29sb3JEaXJlY3RpdmUge1xuICBASW5wdXQoKSBmaWxsOiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl90ZXh0Q29sb3IoKSB7XG4gICAgcmV0dXJuIGBub3ZvLWZpbGwtJHt0aGlzLmZpbGx9YDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG59XG4iXX0=