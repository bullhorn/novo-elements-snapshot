// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
export class ThemeColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_textColor() {
        return `novo-theme-${this.theme}`;
    }
}
ThemeColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[theme]',
            },] }
];
ThemeColorDirective.ctorParameters = () => [
    { type: ElementRef }
];
ThemeColorDirective.propDecorators = {
    theme: [{ type: Input }],
    hb_textColor: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL3RoZW1lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQ0FBcUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUsxRSxNQUFNLE9BQU8sbUJBQW1CO0lBUTlCLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUx0QyxJQUNJLFlBQVk7UUFDZCxPQUFPLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BDLENBQUM7OztZQVRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUzthQUNwQjs7O1lBSm1CLFVBQVU7OztvQkFNM0IsS0FBSzsyQkFFTCxXQUFXLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0aGVtZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBUaGVtZUNvbG9yRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX3RleHRDb2xvcigpIHtcbiAgICByZXR1cm4gYG5vdm8tdGhlbWUtJHt0aGlzLnRoZW1lfWA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxufVxuIl19