import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoDividerComponent {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
    /** Whether the divider is vertically aligned. */
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    /** Whether the divider is an inset divider. */
    get inset() {
        return this._inset;
    }
    set inset(value) {
        this._inset = coerceBooleanProperty(value);
    }
}
NovoDividerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoDividerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDividerComponent, selector: "novo-divider", inputs: { vertical: "vertical", inset: "inset" }, host: { attributes: { "role": "separator" }, properties: { "attr.aria-orientation": "vertical ? \"vertical\" : \"horizontal\"", "class.novo-divider-vertical": "vertical", "class.novo-divider-horizontal": "!vertical", "class.novo-divider-inset": "inset" }, classAttribute: "novo-divider" }, ngImport: i0, template: '', isInline: true, styles: [".novo-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid;border-top-color:var(--color-border)}.novo-divider.novo-divider-vertical{display:inline;border-top:0;border-right-width:1px;border-right-style:solid;border-right-color:var(--color-border);margin-left:var(--spacing-md);margin-right:var(--spacing-md)}.novo-divider.novo-divider-inset{margin-left:80px}[dir=rtl] .novo-divider.novo-divider-inset{margin-left:auto;margin-right:80px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDividerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-divider', host: {
                        role: 'separator',
                        '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                        '[class.novo-divider-vertical]': 'vertical',
                        '[class.novo-divider-horizontal]': '!vertical',
                        '[class.novo-divider-inset]': 'inset',
                        class: 'novo-divider',
                    }, template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".novo-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid;border-top-color:var(--color-border)}.novo-divider.novo-divider-vertical{display:inline;border-top:0;border-right-width:1px;border-right-style:solid;border-right-color:var(--color-border);margin-left:var(--spacing-md);margin-right:var(--spacing-md)}.novo-divider.novo-divider-inset{margin-left:80px}[dir=rtl] .novo-divider.novo-divider-inset{margin-left:auto;margin-right:80px}\n"] }]
        }], propDecorators: { vertical: [{
                type: Input
            }], inset: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2RpdmlkZXIvZGl2aWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWlCN0YsTUFBTSxPQUFPLG9CQUFvQjtJQWZqQztRQXdCVSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBVTNCLFdBQU0sR0FBWSxLQUFLLENBQUM7S0FJakM7SUF0QkMsaURBQWlEO0lBQ2pELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFHRCwrQ0FBK0M7SUFDL0MsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFjO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7a0hBbEJVLG9CQUFvQjtzR0FBcEIsb0JBQW9CLHdZQUxyQixFQUFFOzRGQUtELG9CQUFvQjtrQkFmaEMsU0FBUzsrQkFDRSxjQUFjLFFBQ2xCO3dCQUNKLElBQUksRUFBRSxXQUFXO3dCQUNqQix5QkFBeUIsRUFBRSxzQ0FBc0M7d0JBQ2pFLCtCQUErQixFQUFFLFVBQVU7d0JBQzNDLGlDQUFpQyxFQUFFLFdBQVc7d0JBQzlDLDRCQUE0QixFQUFFLE9BQU87d0JBQ3JDLEtBQUssRUFBRSxjQUFjO3FCQUN0QixZQUNTLEVBQUUsaUJBRUcsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4QkFLM0MsUUFBUTtzQkFEWCxLQUFLO2dCQVdGLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRpdmlkZXInLFxuICBob3N0OiB7XG4gICAgcm9sZTogJ3NlcGFyYXRvcicsXG4gICAgJ1thdHRyLmFyaWEtb3JpZW50YXRpb25dJzogJ3ZlcnRpY2FsID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCInLFxuICAgICdbY2xhc3Mubm92by1kaXZpZGVyLXZlcnRpY2FsXSc6ICd2ZXJ0aWNhbCcsXG4gICAgJ1tjbGFzcy5ub3ZvLWRpdmlkZXItaG9yaXpvbnRhbF0nOiAnIXZlcnRpY2FsJyxcbiAgICAnW2NsYXNzLm5vdm8tZGl2aWRlci1pbnNldF0nOiAnaW5zZXQnLFxuICAgIGNsYXNzOiAnbm92by1kaXZpZGVyJyxcbiAgfSxcbiAgdGVtcGxhdGU6ICcnLFxuICBzdHlsZVVybHM6IFsnLi9kaXZpZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGl2aWRlckNvbXBvbmVudCB7XG4gIC8qKiBXaGV0aGVyIHRoZSBkaXZpZGVyIGlzIHZlcnRpY2FsbHkgYWxpZ25lZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcbiAgfVxuICBzZXQgdmVydGljYWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92ZXJ0aWNhbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdmVydGljYWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgZGl2aWRlciBpcyBhbiBpbnNldCBkaXZpZGVyLiAqL1xuICBASW5wdXQoKVxuICBnZXQgaW5zZXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luc2V0O1xuICB9XG4gIHNldCBpbnNldCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2luc2V0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9pbnNldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92ZXJ0aWNhbDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaW5zZXQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==