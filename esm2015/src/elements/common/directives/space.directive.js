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
const getSpacingToken = (value) => {
    if (Object.keys(tokens.spacing).includes(value)) {
        return tokens.spacing[value];
    }
    // TODO: Maybe Validate Value ie.(rem, px)
    return value;
};
const ɵ0 = getSpacingToken;
export class MarginDirective {
    get hb_margin() {
        return getSpacingToken(this.margin || this.m);
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
    hb_margin: [{ type: HostBinding, args: ['style.margin',] }],
    hb_margin_left: [{ type: HostBinding, args: ['style.margin-left',] }],
    hb_margin_right: [{ type: HostBinding, args: ['style.margin-right',] }],
    hb_margin_top: [{ type: HostBinding, args: ['style.margin-top',] }],
    hb_margin_bottom: [{ type: HostBinding, args: ['style.margin-bottom',] }]
};
export class PaddingDirective {
    get hb_padding() {
        return getSpacingToken(this.padding || this.p);
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
    hb_padding: [{ type: HostBinding, args: ['style.padding',] }],
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL3NwYWNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQ0FBcUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sS0FBSyxNQUFNLE1BQU0sb0JBQW9CLENBQUM7QUFDN0M7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQkU7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0JFO0FBRUYsTUFBTSxlQUFlLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUN4QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMvQyxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7SUFDRCwwQ0FBMEM7SUFDMUMsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7O0FBTUYsTUFBTSxPQUFPLGVBQWU7SUFpQjFCLElBQWlDLFNBQVM7UUFDeEMsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELElBQXNDLGNBQWM7UUFDbEQsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDRCxJQUF1QyxlQUFlO1FBQ3BELE9BQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFX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QUM7OztZQVRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsT0FBTzthQUNsQjs7O2tCQUVFLEtBQUs7cUJBRUwsV0FBVyxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgdG9rZW5zIGZyb20gJ25vdm8tZGVzaWduLXRva2Vucyc7XG4vKlxuUHJvcFx0Q1NTIFByb3BlcnR5XHRUaGVtZSBGaWVsZFxubSwgbWFyZ2luXHRtYXJnaW5cdHNwYWNlXG5tdCwgbWFyZ2luVG9wXHRtYXJnaW4tdG9wXHRzcGFjZVxubXIsIG1hcmdpblJpZ2h0XHRtYXJnaW4tcmlnaHRcdHNwYWNlXG5tYiwgbWFyZ2luQm90dG9tXHRtYXJnaW4tYm90dG9tXHRzcGFjZVxubWwsIG1hcmdpbkxlZnRcdG1hcmdpbi1sZWZ0XHRzcGFjZVxubXhcdG1hcmdpbi1sZWZ0IGFuZCBtYXJnaW4tcmlnaHRcdHNwYWNlXG5teVx0bWFyZ2luLXRvcCBhbmQgbWFyZ2luLWJvdHRvbVx0c3BhY2VcbnAsIHBhZGRpbmdcdHBhZGRpbmdcdHNwYWNlXG5wdCwgcGFkZGluZ1RvcFx0cGFkZGluZy10b3BcdHNwYWNlXG5wciwgcGFkZGluZ1JpZ2h0XHRwYWRkaW5nLXJpZ2h0XHRzcGFjZVxucGIsIHBhZGRpbmdCb3R0b21cdHBhZGRpbmctYm90dG9tXHRzcGFjZVxucGwsIHBhZGRpbmdMZWZ0XHRwYWRkaW5nLWxlZnRcdHNwYWNlXG5weFx0cGFkZGluZy1sZWZ0IGFuZCBwYWRkaW5nLXJpZ2h0XHRzcGFjZVxucHlcdHBhZGRpbmctdG9wIGFuZCBwYWRkaW5nLWJvdHRvbVx0c3BhY2VcbiovXG5cbi8qXG4vLyBTZWxlY3RvcnMgZ2VuZXJhdGVkIHdpdGggdGhlIGZvbGxvd2luZyBjb2RlXG5jb25zdCBkaXJlY3Rpb25zID0gWydUb3AnLCAnUmlnaHQnLCAnQm90dG9tJywgJ0xlZnQnLCAnWCcsICdZJ107XG5jb25zdCBhYmJyRGlyZWN0aW9ucyA9IGRpcmVjdGlvbnMubWFwKChkKSA9PiBkLnNsaWNlKDAsIDEpLnRvTG93ZXJDYXNlKCkpO1xuY29uc3QgbWFyZ2luQXR0cnMgPSBbXG4gICdbbV0nLFxuICAnW21hcmdpbl0nLFxuICAuLi5kaXJlY3Rpb25zLm1hcCgoZGlyKSA9PiBgW21hcmdpbiR7ZGlyfV1gKSxcbiAgLi4uYWJickRpcmVjdGlvbnMubWFwKChkaXIpID0+IGBbbSR7ZGlyfV1gKSxcbl07XG5jb25zdCBwYWRkaW5nQXR0cnMgPSBbXG4gICdbcF0nLFxuICAnW3BhZGRpbmddJyxcbiAgLi4uZGlyZWN0aW9ucy5tYXAoKGRpcikgPT4gYFtwYWRkaW5nJHtkaXJ9XWApLFxuICAuLi5hYmJyRGlyZWN0aW9ucy5tYXAoKGRpcikgPT4gYFtwJHtkaXJ9XWApLFxuXTtcblxuY29uc3Qgc2VsZWN0b3JzID0gWy4uLm1hcmdpbkF0dHJzLCAuLi5wYWRkaW5nQXR0cnNdO1xuKi9cblxuY29uc3QgZ2V0U3BhY2luZ1Rva2VuID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgaWYgKE9iamVjdC5rZXlzKHRva2Vucy5zcGFjaW5nKS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdG9rZW5zLnNwYWNpbmdbdmFsdWVdO1xuICB9XG4gIC8vIFRPRE86IE1heWJlIFZhbGlkYXRlIFZhbHVlIGllLihyZW0sIHB4KVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgc2VsZWN0b3I6ICdbbV0sW21hcmdpbl0sW21hcmdpblRvcF0sW21hcmdpblJpZ2h0XSxbbWFyZ2luQm90dG9tXSxbbWFyZ2luTGVmdF0sW21hcmdpblhdLFttYXJnaW5ZXSxbbXRdLFttcl0sW21iXSxbbWxdLFtteF0sW215XScsXG59KVxuZXhwb3J0IGNsYXNzIE1hcmdpbkRpcmVjdGl2ZSB7XG4gIC8vIE1hcmdpblxuICBASW5wdXQoKSBtYXJnaW46IHN0cmluZztcbiAgQElucHV0KCkgbTogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5MZWZ0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1sOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpblJpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpblRvcDogc3RyaW5nO1xuICBASW5wdXQoKSBtdDogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5Cb3R0b206IHN0cmluZztcbiAgQElucHV0KCkgbWI6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luWDogc3RyaW5nO1xuICBASW5wdXQoKSBteDogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5ZOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG15OiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXJnaW4nKSBnZXQgaGJfbWFyZ2luKCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5tYXJnaW4gfHwgdGhpcy5tKTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi1sZWZ0JykgZ2V0IGhiX21hcmdpbl9sZWZ0KCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5tYXJnaW5MZWZ0IHx8IHRoaXMubWwgfHwgdGhpcy5teCB8fCB0aGlzLm1hcmdpblgpO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUubWFyZ2luLXJpZ2h0JykgZ2V0IGhiX21hcmdpbl9yaWdodCgpIHtcbiAgICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMubWFyZ2luUmlnaHQgfHwgdGhpcy5tciB8fCB0aGlzLm14IHx8IHRoaXMubWFyZ2luWCk7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXJnaW4tdG9wJykgZ2V0IGhiX21hcmdpbl90b3AoKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLm1hcmdpblRvcCB8fCB0aGlzLm10IHx8IHRoaXMubXkgfHwgdGhpcy5tYXJnaW5ZKTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi1ib3R0b20nKSBnZXQgaGJfbWFyZ2luX2JvdHRvbSgpIHtcbiAgICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMubWFyZ2luQm90dG9tIHx8IHRoaXMubWIgfHwgdGhpcy5teSB8fCB0aGlzLm1hcmdpblkpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICBzZWxlY3RvcjogJ1twXSxbcGFkZGluZ10sW3BhZGRpbmdUb3BdLFtwYWRkaW5nUmlnaHRdLFtwYWRkaW5nQm90dG9tXSxbcGFkZGluZ0xlZnRdLFtwYWRkaW5nWF0sW3BhZGRpbmdZXSxbcHRdLFtwcl0sW3BiXSxbcGxdLFtweF0sW3B5XScsXG59KVxuZXhwb3J0IGNsYXNzIFBhZGRpbmdEaXJlY3RpdmUge1xuICAvLyBQYWRkaW5nXG4gIEBJbnB1dCgpIHBhZGRpbmc6IHN0cmluZztcbiAgQElucHV0KCkgcDogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nTGVmdDogc3RyaW5nO1xuICBASW5wdXQoKSBwbDogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nUmlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgcHI6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ1RvcDogc3RyaW5nO1xuICBASW5wdXQoKSBwdDogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nQm90dG9tOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBiOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZGRpbmdYOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB4OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZGRpbmdZOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB5OiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nJykgZ2V0IGhiX3BhZGRpbmcoKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLnBhZGRpbmcgfHwgdGhpcy5wKTtcbiAgfVxuICAvLyBASG9zdEJpbmRpbmcoJ2NsYXNzJykgZ2V0IGhiX3BhZGRpbmcoKSB7XG4gIC8vICAgcmV0dXJuIGBwYWRkaW5nLSR7dGhpcy5wYWRkaW5nIHx8IHRoaXMucH1gO1xuICAvLyB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLWxlZnQnKSBnZXQgaGJfcGFkZGluZ19sZWZ0KCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5wYWRkaW5nTGVmdCB8fCB0aGlzLnBsIHx8IHRoaXMucHggfHwgdGhpcy5wYWRkaW5nWCk7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLXJpZ2h0JykgZ2V0IGhiX3BhZGRpbmdfcmlnaHQoKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLnBhZGRpbmdSaWdodCB8fCB0aGlzLnByIHx8IHRoaXMucHggfHwgdGhpcy5wYWRkaW5nWCk7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLXRvcCcpIGdldCBoYl9wYWRkaW5nX3RvcCgpIHtcbiAgICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMucGFkZGluZ1RvcCB8fCB0aGlzLnB0IHx8IHRoaXMucHkgfHwgdGhpcy5wYWRkaW5nWSk7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLWJvdHRvbScpIGdldCBoYl9wYWRkaW5nX2JvdHRvbSgpIHtcbiAgICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMucGFkZGluZ0JvdHRvbSB8fCB0aGlzLnBiIHx8IHRoaXMucHkgfHwgdGhpcy5wYWRkaW5nWSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2dhcF0nLFxufSlcbmV4cG9ydCBjbGFzcyBHYXBEaXJlY3RpdmUge1xuICBASW5wdXQoKSBnYXA6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmdhcCcpXG4gIGdldCBoYl9nYXAoKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLmdhcCk7XG4gIH1cbn1cbiJdfQ==