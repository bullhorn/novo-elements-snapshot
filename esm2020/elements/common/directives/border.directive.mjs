// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class BorderDirective {
    constructor(el) {
        this.el = el;
        this.borderStyle = 'solid';
        this.borderColor = '#eaecef';
        this.borderWidth = 1;
    }
    // @HostBinding('style.borderStyle') get getBorderStyle() {
    //   return this.border;
    // }
    // @HostBinding('style.borderWidth') get getBorderWidth() {
    //   return this.width;
    // }
    // @HostBinding('style.borderColor') get getBorderColor() {
    //   return this.borderColor;
    // }
    get hb_border() {
        return `border-${this.border}`;
    }
    get hb_border_left() {
        return this.borderLeft || this.bl || this.bx || this.borderX;
    }
    get hb_border_right() {
        return this.borderRight || this.bt || this.bx || this.borderX;
    }
    get hb_border_top() {
        return this.borderTop || this.bt || this.by || this.borderY;
    }
    get hb_border_bottom() {
        return this.borderBottom || this.bt || this.by || this.borderY;
    }
}
BorderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BorderDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
BorderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: BorderDirective, selector: "[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]", inputs: { borderStyle: "borderStyle", borderColor: "borderColor", borderWidth: "borderWidth", border: "border", borderLeft: "borderLeft", bl: "bl", borderRight: "borderRight", br: "br", borderTop: "borderTop", bt: "bt", borderBottom: "borderBottom", bb: "bb", borderX: "borderX", bx: "bx", borderY: "borderY", by: "by" }, host: { properties: { "class": "this.hb_border", "style.border-left": "this.hb_border_left", "style.border-right": "this.hb_border_right", "style.border-top": "this.hb_border_top", "style.border-bottom": "this.hb_border_bottom" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BorderDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { borderStyle: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], border: [{
                type: Input
            }], borderLeft: [{
                type: Input
            }], bl: [{
                type: Input
            }], borderRight: [{
                type: Input
            }], br: [{
                type: Input
            }], borderTop: [{
                type: Input
            }], bt: [{
                type: Input
            }], borderBottom: [{
                type: Input
            }], bb: [{
                type: Input
            }], borderX: [{
                type: Input
            }], bx: [{
                type: Input
            }], borderY: [{
                type: Input
            }], by: [{
                type: Input
            }], hb_border: [{
                type: HostBinding,
                args: ['class']
            }], hb_border_left: [{
                type: HostBinding,
                args: ['style.border-left']
            }], hb_border_right: [{
                type: HostBinding,
                args: ['style.border-right']
            }], hb_border_top: [{
                type: HostBinding,
                args: ['style.border-top']
            }], hb_border_bottom: [{
                type: HostBinding,
                args: ['style.border-bottom']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9yZGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL2JvcmRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUNBQXFDO0FBQ3JDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTFFLE1BQU0sT0FBTyxlQUFlO0lBK0MxQixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTlDekIsZ0JBQVcsR0FBRyxPQUFPLENBQUM7UUFDdEIsZ0JBQVcsR0FBRyxTQUFTLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7SUE0Q1ksQ0FBQztJQTVCdEMsMkRBQTJEO0lBQzNELHdCQUF3QjtJQUN4QixJQUFJO0lBRUosMkRBQTJEO0lBQzNELHVCQUF1QjtJQUN2QixJQUFJO0lBRUosMkRBQTJEO0lBQzNELDZCQUE2QjtJQUM3QixJQUFJO0lBRUosSUFBMEIsU0FBUztRQUNqQyxPQUFPLFVBQVUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFzQyxjQUFjO1FBQ2xELE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMvRCxDQUFDO0lBQ0QsSUFBdUMsZUFBZTtRQUNwRCxPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDaEUsQ0FBQztJQUNELElBQXFDLGFBQWE7UUFDaEQsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzlELENBQUM7SUFDRCxJQUF3QyxnQkFBZ0I7UUFDdEQsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2pFLENBQUM7OzRHQTdDVSxlQUFlO2dHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFIM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsOEhBQThIO2lCQUN6STtpR0FFVSxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQWNvQixTQUFTO3NCQUFsQyxXQUFXO3VCQUFDLE9BQU87Z0JBR2tCLGNBQWM7c0JBQW5ELFdBQVc7dUJBQUMsbUJBQW1CO2dCQUdPLGVBQWU7c0JBQXJELFdBQVc7dUJBQUMsb0JBQW9CO2dCQUdJLGFBQWE7c0JBQWpELFdBQVc7dUJBQUMsa0JBQWtCO2dCQUdTLGdCQUFnQjtzQkFBdkQsV0FBVzt1QkFBQyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JvcmRlcl0sIFtiYl0sIFtib3JkZXJCb3R0b21dLCBbYnRdLCBbYm9yZGVyVG9wXSwgW2JsXSwgW2JvcmRlckxlZnRdLCBbYnJdLCBbYm9yZGVyUmlnaHRdLCBbYnhdLCBbYm9yZGVyWF0sIFtieV0sIFtib3JkZXJZXScsXG59KVxuZXhwb3J0IGNsYXNzIEJvcmRlckRpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGJvcmRlclN0eWxlID0gJ3NvbGlkJztcbiAgQElucHV0KCkgYm9yZGVyQ29sb3IgPSAnI2VhZWNlZic7XG4gIEBJbnB1dCgpIGJvcmRlcldpZHRoID0gMTtcblxuICBASW5wdXQoKSBib3JkZXI6IHN0cmluZztcbiAgQElucHV0KCkgYm9yZGVyTGVmdDogc3RyaW5nO1xuICBASW5wdXQoKSBibDogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJSaWdodDogc3RyaW5nO1xuICBASW5wdXQoKSBicjogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJUb3A6IHN0cmluZztcbiAgQElucHV0KCkgYnQ6IHN0cmluZztcbiAgQElucHV0KCkgYm9yZGVyQm90dG9tOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJiOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJvcmRlclg6IHN0cmluZztcbiAgQElucHV0KCkgYng6IHN0cmluZztcbiAgQElucHV0KCkgYm9yZGVyWTogc3RyaW5nO1xuICBASW5wdXQoKSBieTogc3RyaW5nO1xuXG4gIC8vIEBIb3N0QmluZGluZygnc3R5bGUuYm9yZGVyU3R5bGUnKSBnZXQgZ2V0Qm9yZGVyU3R5bGUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuYm9yZGVyO1xuICAvLyB9XG5cbiAgLy8gQEhvc3RCaW5kaW5nKCdzdHlsZS5ib3JkZXJXaWR0aCcpIGdldCBnZXRCb3JkZXJXaWR0aCgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy53aWR0aDtcbiAgLy8gfVxuXG4gIC8vIEBIb3N0QmluZGluZygnc3R5bGUuYm9yZGVyQ29sb3InKSBnZXQgZ2V0Qm9yZGVyQ29sb3IoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuYm9yZGVyQ29sb3I7XG4gIC8vIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgZ2V0IGhiX2JvcmRlcigpIHtcbiAgICByZXR1cm4gYGJvcmRlci0ke3RoaXMuYm9yZGVyfWA7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ib3JkZXItbGVmdCcpIGdldCBoYl9ib3JkZXJfbGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5ib3JkZXJMZWZ0IHx8IHRoaXMuYmwgfHwgdGhpcy5ieCB8fCB0aGlzLmJvcmRlclg7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ib3JkZXItcmlnaHQnKSBnZXQgaGJfYm9yZGVyX3JpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmJvcmRlclJpZ2h0IHx8IHRoaXMuYnQgfHwgdGhpcy5ieCB8fCB0aGlzLmJvcmRlclg7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ib3JkZXItdG9wJykgZ2V0IGhiX2JvcmRlcl90b3AoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9yZGVyVG9wIHx8IHRoaXMuYnQgfHwgdGhpcy5ieSB8fCB0aGlzLmJvcmRlclk7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ib3JkZXItYm90dG9tJykgZ2V0IGhiX2JvcmRlcl9ib3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9yZGVyQm90dG9tIHx8IHRoaXMuYnQgfHwgdGhpcy5ieSB8fCB0aGlzLmJvcmRlclk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxufVxuIl19