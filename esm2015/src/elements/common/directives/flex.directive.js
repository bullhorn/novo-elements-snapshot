import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
export class FlexDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        // this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    }
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
}
FlexDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line: directive-selector
                selector: '[flex]',
            },] }
];
FlexDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
FlexDirective.propDecorators = {
    flex: [{ type: HostBinding, args: ['style.flex',] }, { type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvY29tbW9uL2RpcmVjdGl2ZXMvZmxleC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNckYsTUFBTSxPQUFPLGFBQWE7SUE2QnhCLFlBQTZCLEVBQWMsRUFBbUIsUUFBbUI7UUFBcEQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFtQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQy9FLG9FQUFvRTtJQUN0RSxDQUFDO0lBaEJELElBRVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBVyxJQUFJLENBQUMsS0FBYTtRQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7U0FDekI7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7O1lBL0JGLFNBQVMsU0FBQztnQkFDVCwrQ0FBK0M7Z0JBQy9DLFFBQVEsRUFBRSxRQUFRO2FBQ25COzs7WUFMbUIsVUFBVTtZQUFzQixTQUFTOzs7bUJBcUIxRCxXQUFXLFNBQUMsWUFBWSxjQUN4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbZmxleF0nLFxufSlcbmV4cG9ydCBjbGFzcyBGbGV4RGlyZWN0aXZlIHtcbiAgLy8gQEhvc3RCaW5kaW5nKCdzdHlsZS5hbGlnbi1pdGVtcycpXG4gIC8vIEBJbnB1dCgpXG4gIC8vIGFsaWduOiBzdHJpbmcgPSAnY2VudGVyJztcblxuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLmp1c3RpZnktY29udGVudCcpXG4gIC8vIEBJbnB1dCgpXG4gIC8vIGp1c3RpZnk6IHN0cmluZyA9ICdmbGV4LXN0YXJ0JztcblxuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtZmxvdycpXG4gIC8vIEBJbnB1dCgpXG4gIC8vIGZsb3c6IHN0cmluZyA9ICdyb3cgbm93cmFwJztcblxuICBwcml2YXRlIF9mbGV4OiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4JylcbiAgQElucHV0KClcbiAgcHVibGljIGdldCBmbGV4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsZXg7XG4gIH1cblxuICBwdWJsaWMgc2V0IGZsZXgodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuX2ZsZXggPSAnMSAxIGF1dG8nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9mbGV4ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgLy8gdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2ZsZXgnKTtcbiAgfVxufVxuIl19