// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
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
BorderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]',
            },] }
];
BorderDirective.ctorParameters = () => [
    { type: ElementRef }
];
BorderDirective.propDecorators = {
    borderStyle: [{ type: Input }],
    borderColor: [{ type: Input }],
    borderWidth: [{ type: Input }],
    border: [{ type: Input }],
    borderLeft: [{ type: Input }],
    bl: [{ type: Input }],
    borderRight: [{ type: Input }],
    br: [{ type: Input }],
    borderTop: [{ type: Input }],
    bt: [{ type: Input }],
    borderBottom: [{ type: Input }],
    bb: [{ type: Input }],
    borderX: [{ type: Input }],
    bx: [{ type: Input }],
    borderY: [{ type: Input }],
    by: [{ type: Input }],
    hb_border: [{ type: HostBinding, args: ['class',] }],
    hb_border_left: [{ type: HostBinding, args: ['style.border-left',] }],
    hb_border_right: [{ type: HostBinding, args: ['style.border-right',] }],
    hb_border_top: [{ type: HostBinding, args: ['style.border-top',] }],
    hb_border_bottom: [{ type: HostBinding, args: ['style.border-bottom',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9yZGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy9ib3JkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFDQUFxQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTFFLE1BQU0sT0FBTyxlQUFlO0lBK0MxQixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTlDekIsZ0JBQVcsR0FBRyxPQUFPLENBQUM7UUFDdEIsZ0JBQVcsR0FBRyxTQUFTLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7SUE0Q1ksQ0FBQztJQTVCdEMsMkRBQTJEO0lBQzNELHdCQUF3QjtJQUN4QixJQUFJO0lBRUosMkRBQTJEO0lBQzNELHVCQUF1QjtJQUN2QixJQUFJO0lBRUosMkRBQTJEO0lBQzNELDZCQUE2QjtJQUM3QixJQUFJO0lBRUosSUFBMEIsU0FBUztRQUNqQyxPQUFPLFVBQVUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFzQyxjQUFjO1FBQ2xELE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMvRCxDQUFDO0lBQ0QsSUFBdUMsZUFBZTtRQUNwRCxPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDaEUsQ0FBQztJQUNELElBQXFDLGFBQWE7UUFDaEQsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzlELENBQUM7SUFDRCxJQUF3QyxnQkFBZ0I7UUFDdEQsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2pFLENBQUM7OztZQWhERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhIQUE4SDthQUN6STs7O1lBSG1CLFVBQVU7OzswQkFLM0IsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7cUJBRUwsS0FBSzt5QkFDTCxLQUFLO2lCQUNMLEtBQUs7MEJBQ0wsS0FBSztpQkFDTCxLQUFLO3dCQUNMLEtBQUs7aUJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lCQUNMLEtBQUs7c0JBQ0wsS0FBSztpQkFDTCxLQUFLO3NCQUNMLEtBQUs7aUJBQ0wsS0FBSzt3QkFjTCxXQUFXLFNBQUMsT0FBTzs2QkFHbkIsV0FBVyxTQUFDLG1CQUFtQjs4QkFHL0IsV0FBVyxTQUFDLG9CQUFvQjs0QkFHaEMsV0FBVyxTQUFDLGtCQUFrQjsrQkFHOUIsV0FBVyxTQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYm9yZGVyXSwgW2JiXSwgW2JvcmRlckJvdHRvbV0sIFtidF0sIFtib3JkZXJUb3BdLCBbYmxdLCBbYm9yZGVyTGVmdF0sIFticl0sIFtib3JkZXJSaWdodF0sIFtieF0sIFtib3JkZXJYXSwgW2J5XSwgW2JvcmRlclldJyxcbn0pXG5leHBvcnQgY2xhc3MgQm9yZGVyRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgYm9yZGVyU3R5bGUgPSAnc29saWQnO1xuICBASW5wdXQoKSBib3JkZXJDb2xvciA9ICcjZWFlY2VmJztcbiAgQElucHV0KCkgYm9yZGVyV2lkdGggPSAxO1xuXG4gIEBJbnB1dCgpIGJvcmRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJMZWZ0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJvcmRlclJpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJvcmRlclRvcDogc3RyaW5nO1xuICBASW5wdXQoKSBidDogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJCb3R0b206IHN0cmluZztcbiAgQElucHV0KCkgYmI6IHN0cmluZztcbiAgQElucHV0KCkgYm9yZGVyWDogc3RyaW5nO1xuICBASW5wdXQoKSBieDogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJZOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJ5OiBzdHJpbmc7XG5cbiAgLy8gQEhvc3RCaW5kaW5nKCdzdHlsZS5ib3JkZXJTdHlsZScpIGdldCBnZXRCb3JkZXJTdHlsZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5ib3JkZXI7XG4gIC8vIH1cblxuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLmJvcmRlcldpZHRoJykgZ2V0IGdldEJvcmRlcldpZHRoKCkge1xuICAvLyAgIHJldHVybiB0aGlzLndpZHRoO1xuICAvLyB9XG5cbiAgLy8gQEhvc3RCaW5kaW5nKCdzdHlsZS5ib3JkZXJDb2xvcicpIGdldCBnZXRCb3JkZXJDb2xvcigpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5ib3JkZXJDb2xvcjtcbiAgLy8gfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBnZXQgaGJfYm9yZGVyKCkge1xuICAgIHJldHVybiBgYm9yZGVyLSR7dGhpcy5ib3JkZXJ9YDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmJvcmRlci1sZWZ0JykgZ2V0IGhiX2JvcmRlcl9sZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmJvcmRlckxlZnQgfHwgdGhpcy5ibCB8fCB0aGlzLmJ4IHx8IHRoaXMuYm9yZGVyWDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmJvcmRlci1yaWdodCcpIGdldCBoYl9ib3JkZXJfcmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9yZGVyUmlnaHQgfHwgdGhpcy5idCB8fCB0aGlzLmJ4IHx8IHRoaXMuYm9yZGVyWDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmJvcmRlci10b3AnKSBnZXQgaGJfYm9yZGVyX3RvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5ib3JkZXJUb3AgfHwgdGhpcy5idCB8fCB0aGlzLmJ5IHx8IHRoaXMuYm9yZGVyWTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmJvcmRlci1ib3R0b20nKSBnZXQgaGJfYm9yZGVyX2JvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5ib3JkZXJCb3R0b20gfHwgdGhpcy5idCB8fCB0aGlzLmJ5IHx8IHRoaXMuYm9yZGVyWTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG59XG4iXX0=