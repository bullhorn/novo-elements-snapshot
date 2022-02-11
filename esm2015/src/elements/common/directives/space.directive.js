// tslint:disable: directive-selector
import { Directive, HostBinding, Input } from '@angular/core';
import * as tokens from 'novo-design-tokens';
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
export const getSpacingToken = (value) => {
    if (Object.keys(tokens.spacing).includes(value)) {
        return tokens.spacing[value];
    }
    // TODO: Maybe Validate Value ie.(rem, px)
    return value;
};
export class MarginDirective {
    // @HostBinding('style.margin') get hb_margin() {
    //   return getSpacingToken(this.margin || this.m);
    // }
    get hb_margin() {
        return `margin-${this.margin || this.m}`;
    }
    get hb_margin_left() {
        return getSpacingToken(this.marginLeft || this.ml || this.mx || this.marginX);
    }
    get hb_margin_right() {
        return getSpacingToken(this.marginRight || this.mr || this.mx || this.marginX);
    }
    get hb_margin_top() {
        return getSpacingToken(this.marginTop || this.mt || this.my || this.marginY);
    }
    get hb_margin_bottom() {
        return getSpacingToken(this.marginBottom || this.mb || this.my || this.marginY);
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
    get hb_padding() {
        return `padding-${this.padding || this.p}`;
    }
    // @HostBinding('class') get hb_padding() {
    //   return `padding-${this.padding || this.p}`;
    // }
    get hb_padding_left() {
        return getSpacingToken(this.paddingLeft || this.pl || this.px || this.paddingX);
    }
    get hb_padding_right() {
        return getSpacingToken(this.paddingRight || this.pr || this.px || this.paddingX);
    }
    get hb_padding_top() {
        return getSpacingToken(this.paddingTop || this.pt || this.py || this.paddingY);
    }
    get hb_padding_bottom() {
        return getSpacingToken(this.paddingBottom || this.pb || this.py || this.paddingY);
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
export class GapDirective {
    get hb_gap() {
        return getSpacingToken(this.gap);
    }
}
GapDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gap]',
            },] }
];
GapDirective.propDecorators = {
    gap: [{ type: Input }],
    hb_gap: [{ type: HostBinding, args: ['style.gap',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL3NwYWNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQ0FBcUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sS0FBSyxNQUFNLE1BQU0sb0JBQW9CLENBQUM7QUFDN0M7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQkU7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0JFO0FBRUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDL0MsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0MsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsMENBQTBDO0lBQzFDLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBTUYsTUFBTSxPQUFPLGVBQWU7SUFpQjFCLGlEQUFpRDtJQUNqRCxtREFBbUQ7SUFDbkQsSUFBSTtJQUNKLElBQTBCLFNBQVM7UUFDakMsT0FBTyxVQUFVLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFzQyxjQUFjO1FBQ2xELE9BQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0QsSUFBdUMs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QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7O1lBVEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxPQUFPO2FBQ2xCOzs7a0JBRUUsS0FBSztxQkFFTCxXQUFXLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyB0b2tlbnMgZnJvbSAnbm92by1kZXNpZ24tdG9rZW5zJztcbi8qXG5Qcm9wXHRDU1MgUHJvcGVydHlcdFRoZW1lIEZpZWxkXG5tLCBtYXJnaW5cdG1hcmdpblx0c3BhY2Vcbm10LCBtYXJnaW5Ub3BcdG1hcmdpbi10b3BcdHNwYWNlXG5tciwgbWFyZ2luUmlnaHRcdG1hcmdpbi1yaWdodFx0c3BhY2Vcbm1iLCBtYXJnaW5Cb3R0b21cdG1hcmdpbi1ib3R0b21cdHNwYWNlXG5tbCwgbWFyZ2luTGVmdFx0bWFyZ2luLWxlZnRcdHNwYWNlXG5teFx0bWFyZ2luLWxlZnQgYW5kIG1hcmdpbi1yaWdodFx0c3BhY2Vcbm15XHRtYXJnaW4tdG9wIGFuZCBtYXJnaW4tYm90dG9tXHRzcGFjZVxucCwgcGFkZGluZ1x0cGFkZGluZ1x0c3BhY2VcbnB0LCBwYWRkaW5nVG9wXHRwYWRkaW5nLXRvcFx0c3BhY2VcbnByLCBwYWRkaW5nUmlnaHRcdHBhZGRpbmctcmlnaHRcdHNwYWNlXG5wYiwgcGFkZGluZ0JvdHRvbVx0cGFkZGluZy1ib3R0b21cdHNwYWNlXG5wbCwgcGFkZGluZ0xlZnRcdHBhZGRpbmctbGVmdFx0c3BhY2VcbnB4XHRwYWRkaW5nLWxlZnQgYW5kIHBhZGRpbmctcmlnaHRcdHNwYWNlXG5weVx0cGFkZGluZy10b3AgYW5kIHBhZGRpbmctYm90dG9tXHRzcGFjZVxuKi9cblxuLypcbi8vIFNlbGVjdG9ycyBnZW5lcmF0ZWQgd2l0aCB0aGUgZm9sbG93aW5nIGNvZGVcbmNvbnN0IGRpcmVjdGlvbnMgPSBbJ1RvcCcsICdSaWdodCcsICdCb3R0b20nLCAnTGVmdCcsICdYJywgJ1knXTtcbmNvbnN0IGFiYnJEaXJlY3Rpb25zID0gZGlyZWN0aW9ucy5tYXAoKGQpID0+IGQuc2xpY2UoMCwgMSkudG9Mb3dlckNhc2UoKSk7XG5jb25zdCBtYXJnaW5BdHRycyA9IFtcbiAgJ1ttXScsXG4gICdbbWFyZ2luXScsXG4gIC4uLmRpcmVjdGlvbnMubWFwKChkaXIpID0+IGBbbWFyZ2luJHtkaXJ9XWApLFxuICAuLi5hYmJyRGlyZWN0aW9ucy5tYXAoKGRpcikgPT4gYFttJHtkaXJ9XWApLFxuXTtcbmNvbnN0IHBhZGRpbmdBdHRycyA9IFtcbiAgJ1twXScsXG4gICdbcGFkZGluZ10nLFxuICAuLi5kaXJlY3Rpb25zLm1hcCgoZGlyKSA9PiBgW3BhZGRpbmcke2Rpcn1dYCksXG4gIC4uLmFiYnJEaXJlY3Rpb25zLm1hcCgoZGlyKSA9PiBgW3Ake2Rpcn1dYCksXG5dO1xuXG5jb25zdCBzZWxlY3RvcnMgPSBbLi4ubWFyZ2luQXR0cnMsIC4uLnBhZGRpbmdBdHRyc107XG4qL1xuXG5leHBvcnQgY29uc3QgZ2V0U3BhY2luZ1Rva2VuID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgaWYgKE9iamVjdC5rZXlzKHRva2Vucy5zcGFjaW5nKS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdG9rZW5zLnNwYWNpbmdbdmFsdWVdO1xuICB9XG4gIC8vIFRPRE86IE1heWJlIFZhbGlkYXRlIFZhbHVlIGllLihyZW0sIHB4KVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgc2VsZWN0b3I6ICdbbV0sW21hcmdpbl0sW21hcmdpblRvcF0sW21hcmdpblJpZ2h0XSxbbWFyZ2luQm90dG9tXSxbbWFyZ2luTGVmdF0sW21hcmdpblhdLFttYXJnaW5ZXSxbbXRdLFttcl0sW21iXSxbbWxdLFtteF0sW215XScsXG59KVxuZXhwb3J0IGNsYXNzIE1hcmdpbkRpcmVjdGl2ZSB7XG4gIC8vIE1hcmdpblxuICBASW5wdXQoKSBtYXJnaW46IHN0cmluZztcbiAgQElucHV0KCkgbTogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5MZWZ0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1sOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpblJpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpblRvcDogc3RyaW5nO1xuICBASW5wdXQoKSBtdDogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5Cb3R0b206IHN0cmluZztcbiAgQElucHV0KCkgbWI6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luWDogc3RyaW5nO1xuICBASW5wdXQoKSBteDogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5ZOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG15OiBzdHJpbmc7XG5cbiAgLy8gQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXJnaW4nKSBnZXQgaGJfbWFyZ2luKCkge1xuICAvLyAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5tYXJnaW4gfHwgdGhpcy5tKTtcbiAgLy8gfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgZ2V0IGhiX21hcmdpbigpIHtcbiAgICByZXR1cm4gYG1hcmdpbi0ke3RoaXMubWFyZ2luIHx8IHRoaXMubX1gO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXJnaW4tbGVmdCcpIGdldCBoYl9tYXJnaW5fbGVmdCgpIHtcbiAgICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMubWFyZ2luTGVmdCB8fCB0aGlzLm1sIHx8IHRoaXMubXggfHwgdGhpcy5tYXJnaW5YKTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi1yaWdodCcpIGdldCBoYl9tYXJnaW5fcmlnaHQoKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLm1hcmdpblJpZ2h0IHx8IHRoaXMubXIgfHwgdGhpcy5teCB8fCB0aGlzLm1hcmdpblgpO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUubWFyZ2luLXRvcCcpIGdldCBoYl9tYXJnaW5fdG9wKCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5tYXJnaW5Ub3AgfHwgdGhpcy5tdCB8fCB0aGlzLm15IHx8IHRoaXMubWFyZ2luWSk7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXJnaW4tYm90dG9tJykgZ2V0IGhiX21hcmdpbl9ib3R0b20oKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLm1hcmdpbkJvdHRvbSB8fCB0aGlzLm1iIHx8IHRoaXMubXkgfHwgdGhpcy5tYXJnaW5ZKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgc2VsZWN0b3I6ICdbcF0sW3BhZGRpbmddLFtwYWRkaW5nVG9wXSxbcGFkZGluZ1JpZ2h0XSxbcGFkZGluZ0JvdHRvbV0sW3BhZGRpbmdMZWZ0XSxbcGFkZGluZ1hdLFtwYWRkaW5nWV0sW3B0XSxbcHJdLFtwYl0sW3BsXSxbcHhdLFtweV0nLFxufSlcbmV4cG9ydCBjbGFzcyBQYWRkaW5nRGlyZWN0aXZlIHtcbiAgLy8gUGFkZGluZ1xuICBASW5wdXQoKSBwYWRkaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHA6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ0xlZnQ6IHN0cmluZztcbiAgQElucHV0KCkgcGw6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ1JpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZGRpbmdUb3A6IHN0cmluZztcbiAgQElucHV0KCkgcHQ6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ0JvdHRvbTogc3RyaW5nO1xuICBASW5wdXQoKSBwYjogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nWDogc3RyaW5nO1xuICBASW5wdXQoKSBweDogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nWTogc3RyaW5nO1xuICBASW5wdXQoKSBweTogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBnZXQgaGJfcGFkZGluZygpIHtcbiAgICByZXR1cm4gYHBhZGRpbmctJHt0aGlzLnBhZGRpbmcgfHwgdGhpcy5wfWA7XG4gIH1cbiAgLy8gQEhvc3RCaW5kaW5nKCdjbGFzcycpIGdldCBoYl9wYWRkaW5nKCkge1xuICAvLyAgIHJldHVybiBgcGFkZGluZy0ke3RoaXMucGFkZGluZyB8fCB0aGlzLnB9YDtcbiAgLy8gfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy1sZWZ0JykgZ2V0IGhiX3BhZGRpbmdfbGVmdCgpIHtcbiAgICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMucGFkZGluZ0xlZnQgfHwgdGhpcy5wbCB8fCB0aGlzLnB4IHx8IHRoaXMucGFkZGluZ1gpO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy1yaWdodCcpIGdldCBoYl9wYWRkaW5nX3JpZ2h0KCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5wYWRkaW5nUmlnaHQgfHwgdGhpcy5wciB8fCB0aGlzLnB4IHx8IHRoaXMucGFkZGluZ1gpO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy10b3AnKSBnZXQgaGJfcGFkZGluZ190b3AoKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLnBhZGRpbmdUb3AgfHwgdGhpcy5wdCB8fCB0aGlzLnB5IHx8IHRoaXMucGFkZGluZ1kpO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy1ib3R0b20nKSBnZXQgaGJfcGFkZGluZ19ib3R0b20oKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLnBhZGRpbmdCb3R0b20gfHwgdGhpcy5wYiB8fCB0aGlzLnB5IHx8IHRoaXMucGFkZGluZ1kpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tnYXBdJyxcbn0pXG5leHBvcnQgY2xhc3MgR2FwRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgZ2FwOiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5nYXAnKVxuICBnZXQgaGJfZ2FwKCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5nYXApO1xuICB9XG59XG4iXX0=