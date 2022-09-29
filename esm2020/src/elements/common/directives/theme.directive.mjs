// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class ThemeColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_textColor() {
        return `novo-theme-${this.theme}`;
    }
}
ThemeColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ThemeColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ThemeColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: ThemeColorDirective, selector: "[theme]", inputs: { theme: "theme" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ThemeColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[theme]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY29tbW9uL2RpcmVjdGl2ZXMvdGhlbWUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFDQUFxQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUsxRSxNQUFNLE9BQU8sbUJBQW1CO0lBUTlCLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUx0QyxJQUNJLFlBQVk7UUFDZCxPQUFPLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BDLENBQUM7O2lIQU5VLG1CQUFtQjtxR0FBbkIsbUJBQW1COzRGQUFuQixtQkFBbUI7a0JBSC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFNBQVM7aUJBQ3BCO2lHQUVVLEtBQUs7c0JBQWIsS0FBSztnQkFHRixZQUFZO3NCQURmLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0aGVtZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBUaGVtZUNvbG9yRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX3RleHRDb2xvcigpIHtcbiAgICByZXR1cm4gYG5vdm8tdGhlbWUtJHt0aGlzLnRoZW1lfWA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxufVxuIl19