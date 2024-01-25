import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export class FlexDirective {
    get flex() {
        return this._flex;
    }
    set flex(value) {
        if (!value) {
            this._flex = '1 1 auto';
        }
        else {
            this._flex = value;
        }
    }
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        // this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    }
}
FlexDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlexDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
FlexDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: FlexDirective, selector: "[flex]", inputs: { flex: "flex" }, host: { properties: { "style.flex": "this.flex" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlexDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[flex]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { flex: [{
                type: HostBinding,
                args: ['style.flex']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy9mbGV4LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFNckYsTUFBTSxPQUFPLGFBQWE7SUFleEIsSUFFVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFXLElBQUksQ0FBQyxLQUFhO1FBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUN6QjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsWUFBNkIsRUFBYyxFQUFtQixRQUFtQjtRQUFwRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQW1CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDL0Usb0VBQW9FO0lBQ3RFLENBQUM7OzJHQS9CVSxhQUFhOytGQUFiLGFBQWE7NEZBQWIsYUFBYTtrQkFKekIsU0FBUzttQkFBQztvQkFDVCwrQ0FBK0M7b0JBQy9DLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjt5SEFrQlksSUFBSTtzQkFGZCxXQUFXO3VCQUFDLFlBQVk7O3NCQUN4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbZmxleF0nLFxufSlcbmV4cG9ydCBjbGFzcyBGbGV4RGlyZWN0aXZlIHtcbiAgLy8gQEhvc3RCaW5kaW5nKCdzdHlsZS5hbGlnbi1pdGVtcycpXG4gIC8vIEBJbnB1dCgpXG4gIC8vIGFsaWduOiBzdHJpbmcgPSAnY2VudGVyJztcblxuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLmp1c3RpZnktY29udGVudCcpXG4gIC8vIEBJbnB1dCgpXG4gIC8vIGp1c3RpZnk6IHN0cmluZyA9ICdmbGV4LXN0YXJ0JztcblxuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtZmxvdycpXG4gIC8vIEBJbnB1dCgpXG4gIC8vIGZsb3c6IHN0cmluZyA9ICdyb3cgbm93cmFwJztcblxuICBwcml2YXRlIF9mbGV4OiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4JylcbiAgQElucHV0KClcbiAgcHVibGljIGdldCBmbGV4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsZXg7XG4gIH1cblxuICBwdWJsaWMgc2V0IGZsZXgodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuX2ZsZXggPSAnMSAxIGF1dG8nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9mbGV4ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgLy8gdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2ZsZXgnKTtcbiAgfVxufVxuIl19