// tslint:disable: directive-selector
import { Directive, HostBinding, Input } from '@angular/core';
/*
Prop	CSS Property	Theme Field
m, margin	margin	space
mt, marginTop	margin-top	space
mr, marginRight	margin-right	space
mb, marginBottom	margin-bottom	space
ml, marginLeft	margin-left	space
mx	margin-left and margin-right	space
my	margin-top and margin-bottom	space
p, padding	padding	space
pt, paddingTop	padding-top	space
pr, paddingRight	padding-right	space
pb, paddingBottom	padding-bottom	space
pl, paddingLeft	padding-left	space
px	padding-left and padding-right	space
py	padding-top and padding-bottom	space
*/
/*
// Selectors generated with the following code
const directions = ['Top', 'Right', 'Bottom', 'Left', 'X', 'Y'];
const abbrDirections = directions.map((d) => d.slice(0, 1).toLowerCase());
const marginAttrs = [
  '[m]',
  '[margin]',
  ...directions.map((dir) => `[margin${dir}]`),
  ...abbrDirections.map((dir) => `[m${dir}]`),
];
const paddingAttrs = [
  '[p]',
  '[padding]',
  ...directions.map((dir) => `[padding${dir}]`),
  ...abbrDirections.map((dir) => `[p${dir}]`),
];

const selectors = [...marginAttrs, ...paddingAttrs];
*/
export class MarginDirective {
    get hb_margin() {
        return `margin-${this.margin || this.m}`;
    }
    get hb_margin_left() {
        return this.marginLeft || this.ml || this.mx || this.marginX;
    }
    get hb_margin_right() {
        return this.marginRight || this.mr || this.mx || this.marginX;
    }
    get hb_margin_top() {
        return this.marginTop || this.mt || this.my || this.marginY;
    }
    get hb_margin_bottom() {
        return this.marginBottom || this.mb || this.my || this.marginY;
    }
}
MarginDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line: max-line-length
                selector: '[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]',
            },] }
];
MarginDirective.propDecorators = {
    margin: [{ type: Input }],
    m: [{ type: Input }],
    marginLeft: [{ type: Input }],
    ml: [{ type: Input }],
    marginRight: [{ type: Input }],
    mr: [{ type: Input }],
    marginTop: [{ type: Input }],
    mt: [{ type: Input }],
    marginBottom: [{ type: Input }],
    mb: [{ type: Input }],
    marginX: [{ type: Input }],
    mx: [{ type: Input }],
    marginY: [{ type: Input }],
    my: [{ type: Input }],
    hb_margin: [{ type: HostBinding, args: ['class',] }],
    hb_margin_left: [{ type: HostBinding, args: ['style.margin-left',] }],
    hb_margin_right: [{ type: HostBinding, args: ['style.margin-right',] }],
    hb_margin_top: [{ type: HostBinding, args: ['style.margin-top',] }],
    hb_margin_bottom: [{ type: HostBinding, args: ['style.margin-bottom',] }]
};
export class PaddingDirective {
    // @HostBinding('style.padding') get hb_padding() {
    //   return this.padding || this.p;
    // }
    get hb_padding() {
        return `padding-${this.padding || this.p}`;
    }
    get hb_padding_left() {
        return this.paddingLeft || this.pl || this.px || this.paddingX;
    }
    get hb_padding_right() {
        return this.paddingRight || this.pr || this.px || this.paddingX;
    }
    get hb_padding_top() {
        return this.paddingTop || this.pt || this.py || this.paddingY;
    }
    get hb_padding_bottom() {
        return this.paddingBottom || this.pb || this.py || this.paddingY;
    }
}
PaddingDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line: max-line-length
                selector: '[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]',
            },] }
];
PaddingDirective.propDecorators = {
    padding: [{ type: Input }],
    p: [{ type: Input }],
    paddingLeft: [{ type: Input }],
    pl: [{ type: Input }],
    paddingRight: [{ type: Input }],
    pr: [{ type: Input }],
    paddingTop: [{ type: Input }],
    pt: [{ type: Input }],
    paddingBottom: [{ type: Input }],
    pb: [{ type: Input }],
    paddingX: [{ type: Input }],
    px: [{ type: Input }],
    paddingY: [{ type: Input }],
    py: [{ type: Input }],
    hb_padding: [{ type: HostBinding, args: ['class',] }],
    hb_padding_left: [{ type: HostBinding, args: ['style.padding-left',] }],
    hb_padding_right: [{ type: HostBinding, args: ['style.padding-right',] }],
    hb_padding_top: [{ type: HostBinding, args: ['style.padding-top',] }],
    hb_padding_bottom: [{ type: HostBinding, args: ['style.padding-bottom',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL3NwYWNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQ0FBcUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7O0VBZ0JFO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWtCRTtBQU1GLE1BQU0sT0FBTyxlQUFlO0lBaUIxQixJQUEwQixTQUFTO1FBQ2pDLE9BQU8sVUFBVSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsSUFBc0MsY0FBYztRQUNsRCxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDL0QsQ0FBQztJQUNELElBQXVDLGVBQWU7UUFDcEQsT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2hFLENBQUM7SUFDRCxJQUFxQyxhQUFhO1FBQ2hELE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM5RCxDQUFDO0lBQ0QsSUFBd0MsZ0JBQWdCO1FBQ3RELE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNqRSxDQUFDOzs7WUFuQ0YsU0FBUyxTQUFDO2dCQUNULDRDQUE0QztnQkFDNUMsUUFBUSxFQUFFLHNIQUFzSDthQUNqSTs7O3FCQUdFLEtBQUs7Z0JBQ0wsS0FBSzt5QkFDTCxLQUFLO2lCQUNMLEtBQUs7MEJBQ0wsS0FBSztpQkFDTCxLQUFLO3dCQUNMLEtBQUs7aUJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lCQUNMLEtBQUs7c0JBQ0wsS0FBSztpQkFDTCxLQUFLO3NCQUNMLEtBQUs7aUJBQ0wsS0FBSzt3QkFFTCxXQUFXLFNBQUMsT0FBTzs2QkFHbkIsV0FBVyxTQUFDLG1CQUFtQjs4QkFHL0IsV0FBVyxTQUFDLG9CQUFvQjs0QkFHaEMsV0FBVyxTQUFDLGtCQUFrQjsrQkFHOUIsV0FBVyxTQUFDLHFCQUFxQjs7QUFTcEMsTUFBTSxPQUFPLGdCQUFnQjtJQWlCM0IsbURBQW1EO0lBQ25ELG1DQUFtQztJQUNuQyxJQUFJO0lBQ0osSUFBMEIsVUFBVTtRQUNsQyxPQUFPLFdBQVcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQXVDLGVBQWU7UUFDcEQsT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pFLENBQUM7SUFDRCxJQUF3QyxnQkFBZ0I7UUFDdEQsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2xFLENBQUM7SUFDRCxJQUFzQyxjQUFjO1FBQ2xELE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNoRSxDQUFDO0lBQ0QsSUFBeUMsaUJBQWlCO1FBQ3hELE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuRSxDQUFDOzs7WUF2Q0YsU0FBUyxTQUFDO2dCQUNULDRDQUE0QztnQkFDNUMsUUFBUSxFQUFFLDZIQUE2SDthQUN4STs7O3NCQUdFLEtBQUs7Z0JBQ0wsS0FBSzswQkFDTCxLQUFLO2lCQUNMLEtBQUs7MkJBQ0wsS0FBSztpQkFDTCxLQUFLO3lCQUNMLEtBQUs7aUJBQ0wsS0FBSzs0QkFDTCxLQUFLO2lCQUNMLEtBQUs7dUJBQ0wsS0FBSztpQkFDTCxLQUFLO3VCQUNMLEtBQUs7aUJBQ0wsS0FBSzt5QkFLTCxXQUFXLFNBQUMsT0FBTzs4QkFJbkIsV0FBVyxTQUFDLG9CQUFvQjsrQkFHaEMsV0FBVyxTQUFDLHFCQUFxQjs2QkFHakMsV0FBVyxTQUFDLG1CQUFtQjtnQ0FHL0IsV0FBVyxTQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qXG5Qcm9wXHRDU1MgUHJvcGVydHlcdFRoZW1lIEZpZWxkXG5tLCBtYXJnaW5cdG1hcmdpblx0c3BhY2Vcbm10LCBtYXJnaW5Ub3BcdG1hcmdpbi10b3BcdHNwYWNlXG5tciwgbWFyZ2luUmlnaHRcdG1hcmdpbi1yaWdodFx0c3BhY2Vcbm1iLCBtYXJnaW5Cb3R0b21cdG1hcmdpbi1ib3R0b21cdHNwYWNlXG5tbCwgbWFyZ2luTGVmdFx0bWFyZ2luLWxlZnRcdHNwYWNlXG5teFx0bWFyZ2luLWxlZnQgYW5kIG1hcmdpbi1yaWdodFx0c3BhY2Vcbm15XHRtYXJnaW4tdG9wIGFuZCBtYXJnaW4tYm90dG9tXHRzcGFjZVxucCwgcGFkZGluZ1x0cGFkZGluZ1x0c3BhY2VcbnB0LCBwYWRkaW5nVG9wXHRwYWRkaW5nLXRvcFx0c3BhY2VcbnByLCBwYWRkaW5nUmlnaHRcdHBhZGRpbmctcmlnaHRcdHNwYWNlXG5wYiwgcGFkZGluZ0JvdHRvbVx0cGFkZGluZy1ib3R0b21cdHNwYWNlXG5wbCwgcGFkZGluZ0xlZnRcdHBhZGRpbmctbGVmdFx0c3BhY2VcbnB4XHRwYWRkaW5nLWxlZnQgYW5kIHBhZGRpbmctcmlnaHRcdHNwYWNlXG5weVx0cGFkZGluZy10b3AgYW5kIHBhZGRpbmctYm90dG9tXHRzcGFjZVxuKi9cblxuLypcbi8vIFNlbGVjdG9ycyBnZW5lcmF0ZWQgd2l0aCB0aGUgZm9sbG93aW5nIGNvZGVcbmNvbnN0IGRpcmVjdGlvbnMgPSBbJ1RvcCcsICdSaWdodCcsICdCb3R0b20nLCAnTGVmdCcsICdYJywgJ1knXTtcbmNvbnN0IGFiYnJEaXJlY3Rpb25zID0gZGlyZWN0aW9ucy5tYXAoKGQpID0+IGQuc2xpY2UoMCwgMSkudG9Mb3dlckNhc2UoKSk7XG5jb25zdCBtYXJnaW5BdHRycyA9IFtcbiAgJ1ttXScsXG4gICdbbWFyZ2luXScsXG4gIC4uLmRpcmVjdGlvbnMubWFwKChkaXIpID0+IGBbbWFyZ2luJHtkaXJ9XWApLFxuICAuLi5hYmJyRGlyZWN0aW9ucy5tYXAoKGRpcikgPT4gYFttJHtkaXJ9XWApLFxuXTtcbmNvbnN0IHBhZGRpbmdBdHRycyA9IFtcbiAgJ1twXScsXG4gICdbcGFkZGluZ10nLFxuICAuLi5kaXJlY3Rpb25zLm1hcCgoZGlyKSA9PiBgW3BhZGRpbmcke2Rpcn1dYCksXG4gIC4uLmFiYnJEaXJlY3Rpb25zLm1hcCgoZGlyKSA9PiBgW3Ake2Rpcn1dYCksXG5dO1xuXG5jb25zdCBzZWxlY3RvcnMgPSBbLi4ubWFyZ2luQXR0cnMsIC4uLnBhZGRpbmdBdHRyc107XG4qL1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgc2VsZWN0b3I6ICdbbV0sW21hcmdpbl0sW21hcmdpblRvcF0sW21hcmdpblJpZ2h0XSxbbWFyZ2luQm90dG9tXSxbbWFyZ2luTGVmdF0sW21hcmdpblhdLFttYXJnaW5ZXSxbbXRdLFttcl0sW21iXSxbbWxdLFtteF0sW215XScsXG59KVxuZXhwb3J0IGNsYXNzIE1hcmdpbkRpcmVjdGl2ZSB7XG4gIC8vIE1hcmdpblxuICBASW5wdXQoKSBtYXJnaW46IHN0cmluZztcbiAgQElucHV0KCkgbTogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5MZWZ0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1sOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpblJpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpblRvcDogc3RyaW5nO1xuICBASW5wdXQoKSBtdDogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5Cb3R0b206IHN0cmluZztcbiAgQElucHV0KCkgbWI6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luWDogc3RyaW5nO1xuICBASW5wdXQoKSBteDogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5ZOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG15OiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGdldCBoYl9tYXJnaW4oKSB7XG4gICAgcmV0dXJuIGBtYXJnaW4tJHt0aGlzLm1hcmdpbiB8fCB0aGlzLm19YDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi1sZWZ0JykgZ2V0IGhiX21hcmdpbl9sZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLm1hcmdpbkxlZnQgfHwgdGhpcy5tbCB8fCB0aGlzLm14IHx8IHRoaXMubWFyZ2luWDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi1yaWdodCcpIGdldCBoYl9tYXJnaW5fcmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFyZ2luUmlnaHQgfHwgdGhpcy5tciB8fCB0aGlzLm14IHx8IHRoaXMubWFyZ2luWDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi10b3AnKSBnZXQgaGJfbWFyZ2luX3RvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJnaW5Ub3AgfHwgdGhpcy5tdCB8fCB0aGlzLm15IHx8IHRoaXMubWFyZ2luWTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi1ib3R0b20nKSBnZXQgaGJfbWFyZ2luX2JvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJnaW5Cb3R0b20gfHwgdGhpcy5tYiB8fCB0aGlzLm15IHx8IHRoaXMubWFyZ2luWTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgc2VsZWN0b3I6ICdbcF0sW3BhZGRpbmddLFtwYWRkaW5nVG9wXSxbcGFkZGluZ1JpZ2h0XSxbcGFkZGluZ0JvdHRvbV0sW3BhZGRpbmdMZWZ0XSxbcGFkZGluZ1hdLFtwYWRkaW5nWV0sW3B0XSxbcHJdLFtwYl0sW3BsXSxbcHhdLFtweV0nLFxufSlcbmV4cG9ydCBjbGFzcyBQYWRkaW5nRGlyZWN0aXZlIHtcbiAgLy8gUGFkZGluZ1xuICBASW5wdXQoKSBwYWRkaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHA6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ0xlZnQ6IHN0cmluZztcbiAgQElucHV0KCkgcGw6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ1JpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZGRpbmdUb3A6IHN0cmluZztcbiAgQElucHV0KCkgcHQ6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ0JvdHRvbTogc3RyaW5nO1xuICBASW5wdXQoKSBwYjogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nWDogc3RyaW5nO1xuICBASW5wdXQoKSBweDogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nWTogc3RyaW5nO1xuICBASW5wdXQoKSBweTogc3RyaW5nO1xuXG4gIC8vIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZycpIGdldCBoYl9wYWRkaW5nKCkge1xuICAvLyAgIHJldHVybiB0aGlzLnBhZGRpbmcgfHwgdGhpcy5wO1xuICAvLyB9XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBnZXQgaGJfcGFkZGluZygpIHtcbiAgICByZXR1cm4gYHBhZGRpbmctJHt0aGlzLnBhZGRpbmcgfHwgdGhpcy5wfWA7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBhZGRpbmctbGVmdCcpIGdldCBoYl9wYWRkaW5nX2xlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFkZGluZ0xlZnQgfHwgdGhpcy5wbCB8fCB0aGlzLnB4IHx8IHRoaXMucGFkZGluZ1g7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLXJpZ2h0JykgZ2V0IGhiX3BhZGRpbmdfcmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFkZGluZ1JpZ2h0IHx8IHRoaXMucHIgfHwgdGhpcy5weCB8fCB0aGlzLnBhZGRpbmdYO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy10b3AnKSBnZXQgaGJfcGFkZGluZ190b3AoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFkZGluZ1RvcCB8fCB0aGlzLnB0IHx8IHRoaXMucHkgfHwgdGhpcy5wYWRkaW5nWTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBhZGRpbmctYm90dG9tJykgZ2V0IGhiX3BhZGRpbmdfYm90dG9tKCkge1xuICAgIHJldHVybiB0aGlzLnBhZGRpbmdCb3R0b20gfHwgdGhpcy5wYiB8fCB0aGlzLnB5IHx8IHRoaXMucGFkZGluZ1k7XG4gIH1cbn1cbiJdfQ==