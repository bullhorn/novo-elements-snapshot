// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
export class TextColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_textColor() {
        return isValidColor(this.txc) ? 'novo-text-custom' : `novo-text-${this.txc}`;
    }
    get hb_textStyle() {
        return isValidColor(this.txc) ? this.txc : null;
    }
}
TextColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[txc]',
            },] }
];
TextColorDirective.ctorParameters = () => [
    { type: ElementRef }
];
TextColorDirective.propDecorators = {
    txc: [{ type: Input }],
    hb_textColor: [{ type: HostBinding, args: ['class',] }],
    hb_textStyle: [{ type: HostBinding, args: ['style.color',] }]
};
function isValidColor(color) {
    return color.startsWith('#') || color.startsWith('rgb');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL2NvbG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQ0FBcUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUsxRSxNQUFNLE9BQU8sa0JBQWtCO0lBWTdCLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQVR0QyxJQUNJLFlBQVk7UUFDZCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMvRSxDQUFDO0lBQ0QsSUFDSSxZQUFZO1FBQ2QsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQzs7O1lBYkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxPQUFPO2FBQ2xCOzs7WUFKbUIsVUFBVTs7O2tCQU0zQixLQUFLOzJCQUVMLFdBQVcsU0FBQyxPQUFPOzJCQUluQixXQUFXLFNBQUMsYUFBYTs7QUFRNUIsU0FBUyxZQUFZLENBQUMsS0FBYTtJQUNqQyxPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3R4Y10nLFxufSlcbmV4cG9ydCBjbGFzcyBUZXh0Q29sb3JEaXJlY3RpdmUge1xuICBASW5wdXQoKSB0eGM6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX3RleHRDb2xvcigpIHtcbiAgICByZXR1cm4gaXNWYWxpZENvbG9yKHRoaXMudHhjKSA/ICdub3ZvLXRleHQtY3VzdG9tJyA6IGBub3ZvLXRleHQtJHt0aGlzLnR4Y31gO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUuY29sb3InKVxuICBnZXQgaGJfdGV4dFN0eWxlKCkge1xuICAgIHJldHVybiBpc1ZhbGlkQ29sb3IodGhpcy50eGMpID8gdGhpcy50eGMgOiBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cbn1cblxuZnVuY3Rpb24gaXNWYWxpZENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGNvbG9yLnN0YXJ0c1dpdGgoJyMnKSB8fCBjb2xvci5zdGFydHNXaXRoKCdyZ2InKTtcbn1cbiJdfQ==