import { Directive, Input, TemplateRef } from '@angular/core';
export class NovoTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
}
NovoTemplate.decorators = [
    { type: Directive, args: [{
                selector: '[novoTemplate]',
            },] }
];
NovoTemplate.ctorParameters = () => [
    { type: TemplateRef }
];
NovoTemplate.propDecorators = {
    type: [{ type: Input }],
    name: [{ type: Input, args: ['novoTemplate',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by10ZW1wbGF0ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbW1vbi9ub3ZvLXRlbXBsYXRlL25vdm8tdGVtcGxhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUs5RCxNQUFNLE9BQU8sWUFBWTtJQUl2QixZQUFtQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7SUFFakQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDOzs7WUFYRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7O1lBSjBCLFdBQVc7OzttQkFNbkMsS0FBSzttQkFDTCxLQUFLLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tub3ZvVGVtcGxhdGVdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9UZW1wbGF0ZSB7XHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgnbm92b1RlbXBsYXRlJykgbmFtZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcblxyXG4gIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==