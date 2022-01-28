// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
export class BackgroundColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_textColor() {
        return `novo-background-${this.bg}`;
    }
}
BackgroundColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bg]',
            },] }
];
BackgroundColorDirective.ctorParameters = () => [
    { type: ElementRef }
];
BackgroundColorDirective.propDecorators = {
    bg: [{ type: Input }],
    hb_textColor: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL2JnLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQ0FBcUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUsxRSxNQUFNLE9BQU8sd0JBQXdCO0lBUW5DLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUx0QyxJQUNJLFlBQVk7UUFDZCxPQUFPLG1CQUFtQixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7O1lBVEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxNQUFNO2FBQ2pCOzs7WUFKbUIsVUFBVTs7O2lCQU0zQixLQUFLOzJCQUVMLFdBQVcsU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JnXScsXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmRDb2xvckRpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGJnOiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl90ZXh0Q29sb3IoKSB7XG4gICAgcmV0dXJuIGBub3ZvLWJhY2tncm91bmQtJHt0aGlzLmJnfWA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxufVxuIl19