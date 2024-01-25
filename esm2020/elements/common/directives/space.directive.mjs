// tslint:disable: directive-selector
import { Directive, HostBinding, Input } from '@angular/core';
import * as tokens from 'novo-design-tokens';
import * as i0 from "@angular/core";
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
MarginDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MarginDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MarginDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MarginDirective, selector: "[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]", inputs: { margin: "margin", m: "m", marginLeft: "marginLeft", ml: "ml", marginRight: "marginRight", mr: "mr", marginTop: "marginTop", mt: "mt", marginBottom: "marginBottom", mb: "mb", marginX: "marginX", mx: "mx", marginY: "marginY", my: "my" }, host: { properties: { "class": "this.hb_margin", "style.margin-left": "this.hb_margin_left", "style.margin-right": "this.hb_margin_right", "style.margin-top": "this.hb_margin_top", "style.margin-bottom": "this.hb_margin_bottom" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MarginDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line: max-line-length
                    selector: '[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]',
                }]
        }], propDecorators: { margin: [{
                type: Input
            }], m: [{
                type: Input
            }], marginLeft: [{
                type: Input
            }], ml: [{
                type: Input
            }], marginRight: [{
                type: Input
            }], mr: [{
                type: Input
            }], marginTop: [{
                type: Input
            }], mt: [{
                type: Input
            }], marginBottom: [{
                type: Input
            }], mb: [{
                type: Input
            }], marginX: [{
                type: Input
            }], mx: [{
                type: Input
            }], marginY: [{
                type: Input
            }], my: [{
                type: Input
            }], hb_margin: [{
                type: HostBinding,
                args: ['class']
            }], hb_margin_left: [{
                type: HostBinding,
                args: ['style.margin-left']
            }], hb_margin_right: [{
                type: HostBinding,
                args: ['style.margin-right']
            }], hb_margin_top: [{
                type: HostBinding,
                args: ['style.margin-top']
            }], hb_margin_bottom: [{
                type: HostBinding,
                args: ['style.margin-bottom']
            }] } });
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
PaddingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: PaddingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
PaddingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: { padding: "padding", p: "p", paddingLeft: "paddingLeft", pl: "pl", paddingRight: "paddingRight", pr: "pr", paddingTop: "paddingTop", pt: "pt", paddingBottom: "paddingBottom", pb: "pb", paddingX: "paddingX", px: "px", paddingY: "paddingY", py: "py" }, host: { properties: { "class": "this.hb_padding", "style.padding-left": "this.hb_padding_left", "style.padding-right": "this.hb_padding_right", "style.padding-top": "this.hb_padding_top", "style.padding-bottom": "this.hb_padding_bottom" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: PaddingDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line: max-line-length
                    selector: '[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]',
                }]
        }], propDecorators: { padding: [{
                type: Input
            }], p: [{
                type: Input
            }], paddingLeft: [{
                type: Input
            }], pl: [{
                type: Input
            }], paddingRight: [{
                type: Input
            }], pr: [{
                type: Input
            }], paddingTop: [{
                type: Input
            }], pt: [{
                type: Input
            }], paddingBottom: [{
                type: Input
            }], pb: [{
                type: Input
            }], paddingX: [{
                type: Input
            }], px: [{
                type: Input
            }], paddingY: [{
                type: Input
            }], py: [{
                type: Input
            }], hb_padding: [{
                type: HostBinding,
                args: ['class']
            }], hb_padding_left: [{
                type: HostBinding,
                args: ['style.padding-left']
            }], hb_padding_right: [{
                type: HostBinding,
                args: ['style.padding-right']
            }], hb_padding_top: [{
                type: HostBinding,
                args: ['style.padding-top']
            }], hb_padding_bottom: [{
                type: HostBinding,
                args: ['style.padding-bottom']
            }] } });
export class GapDirective {
    get hb_gap() {
        return getSpacingToken(this.gap);
    }
}
GapDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GapDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
GapDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: GapDirective, selector: "[gap]", inputs: { gap: "gap" }, host: { properties: { "style.gap": "this.hb_gap" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GapDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gap]',
                }]
        }], propDecorators: { gap: [{
                type: Input
            }], hb_gap: [{
                type: HostBinding,
                args: ['style.gap']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY29tbW9uL2RpcmVjdGl2ZXMvc3BhY2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFDQUFxQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxLQUFLLE1BQU0sTUFBTSxvQkFBb0IsQ0FBQzs7QUFDN0M7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQkU7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0JFO0FBRUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDL0MsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0MsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsMENBQTBDO0lBQzFDLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBTUYsTUFBTSxPQUFPLGVBQWU7SUFpQjFCLGlEQUFpRDtJQUNqRCxtREFBbUQ7SUFDbkQsSUFBSTtJQUNKLElBQTBCLFNBQVM7UUFDakMsT0FBTyxVQUFVLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFzQyxjQUFjO1FBQ2xELE9BQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0QsSUFBdUMsZUFBZTtRQUNwRCxPQUFPLGVBQWUsQ0FBQyxJ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c0JBQW5CLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUVvQixVQUFVO3NCQUFuQyxXQUFXO3VCQUFDLE9BQU87Z0JBT21CLGVBQWU7c0JBQXJELFdBQVc7dUJBQUMsb0JBQW9CO2dCQUdPLGdCQUFnQjtzQkFBdkQsV0FBVzt1QkFBQyxxQkFBcUI7Z0JBR0ksY0FBYztzQkFBbkQsV0FBVzt1QkFBQyxtQkFBbUI7Z0JBR1MsaUJBQWlCO3NCQUF6RCxXQUFXO3VCQUFDLHNCQUFzQjs7QUFRckMsTUFBTSxPQUFPLFlBQVk7SUFHdkIsSUFDSSxNQUFNO1FBQ1IsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7OzBHQU5VLFlBQVk7OEZBQVosWUFBWTs0RkFBWixZQUFZO2tCQUh4QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxPQUFPO2lCQUNsQjs4QkFFVSxHQUFHO3NCQUFYLEtBQUs7Z0JBR0YsTUFBTTtzQkFEVCxXQUFXO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgdG9rZW5zIGZyb20gJ25vdm8tZGVzaWduLXRva2Vucyc7XG4vKlxuUHJvcFx0Q1NTIFByb3BlcnR5XHRUaGVtZSBGaWVsZFxubSwgbWFyZ2luXHRtYXJnaW5cdHNwYWNlXG5tdCwgbWFyZ2luVG9wXHRtYXJnaW4tdG9wXHRzcGFjZVxubXIsIG1hcmdpblJpZ2h0XHRtYXJnaW4tcmlnaHRcdHNwYWNlXG5tYiwgbWFyZ2luQm90dG9tXHRtYXJnaW4tYm90dG9tXHRzcGFjZVxubWwsIG1hcmdpbkxlZnRcdG1hcmdpbi1sZWZ0XHRzcGFjZVxubXhcdG1hcmdpbi1sZWZ0IGFuZCBtYXJnaW4tcmlnaHRcdHNwYWNlXG5teVx0bWFyZ2luLXRvcCBhbmQgbWFyZ2luLWJvdHRvbVx0c3BhY2VcbnAsIHBhZGRpbmdcdHBhZGRpbmdcdHNwYWNlXG5wdCwgcGFkZGluZ1RvcFx0cGFkZGluZy10b3BcdHNwYWNlXG5wciwgcGFkZGluZ1JpZ2h0XHRwYWRkaW5nLXJpZ2h0XHRzcGFjZVxucGIsIHBhZGRpbmdCb3R0b21cdHBhZGRpbmctYm90dG9tXHRzcGFjZVxucGwsIHBhZGRpbmdMZWZ0XHRwYWRkaW5nLWxlZnRcdHNwYWNlXG5weFx0cGFkZGluZy1sZWZ0IGFuZCBwYWRkaW5nLXJpZ2h0XHRzcGFjZVxucHlcdHBhZGRpbmctdG9wIGFuZCBwYWRkaW5nLWJvdHRvbVx0c3BhY2VcbiovXG5cbi8qXG4vLyBTZWxlY3RvcnMgZ2VuZXJhdGVkIHdpdGggdGhlIGZvbGxvd2luZyBjb2RlXG5jb25zdCBkaXJlY3Rpb25zID0gWydUb3AnLCAnUmlnaHQnLCAnQm90dG9tJywgJ0xlZnQnLCAnWCcsICdZJ107XG5jb25zdCBhYmJyRGlyZWN0aW9ucyA9IGRpcmVjdGlvbnMubWFwKChkKSA9PiBkLnNsaWNlKDAsIDEpLnRvTG93ZXJDYXNlKCkpO1xuY29uc3QgbWFyZ2luQXR0cnMgPSBbXG4gICdbbV0nLFxuICAnW21hcmdpbl0nLFxuICAuLi5kaXJlY3Rpb25zLm1hcCgoZGlyKSA9PiBgW21hcmdpbiR7ZGlyfV1gKSxcbiAgLi4uYWJickRpcmVjdGlvbnMubWFwKChkaXIpID0+IGBbbSR7ZGlyfV1gKSxcbl07XG5jb25zdCBwYWRkaW5nQXR0cnMgPSBbXG4gICdbcF0nLFxuICAnW3BhZGRpbmddJyxcbiAgLi4uZGlyZWN0aW9ucy5tYXAoKGRpcikgPT4gYFtwYWRkaW5nJHtkaXJ9XWApLFxuICAuLi5hYmJyRGlyZWN0aW9ucy5tYXAoKGRpcikgPT4gYFtwJHtkaXJ9XWApLFxuXTtcblxuY29uc3Qgc2VsZWN0b3JzID0gWy4uLm1hcmdpbkF0dHJzLCAuLi5wYWRkaW5nQXR0cnNdO1xuKi9cblxuZXhwb3J0IGNvbnN0IGdldFNwYWNpbmdUb2tlbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gIGlmIChPYmplY3Qua2V5cyh0b2tlbnMuc3BhY2luZykuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgcmV0dXJuIHRva2Vucy5zcGFjaW5nW3ZhbHVlXTtcbiAgfVxuICAvLyBUT0RPOiBNYXliZSBWYWxpZGF0ZSBWYWx1ZSBpZS4ocmVtLCBweClcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gIHNlbGVjdG9yOiAnW21dLFttYXJnaW5dLFttYXJnaW5Ub3BdLFttYXJnaW5SaWdodF0sW21hcmdpbkJvdHRvbV0sW21hcmdpbkxlZnRdLFttYXJnaW5YXSxbbWFyZ2luWV0sW210XSxbbXJdLFttYl0sW21sXSxbbXhdLFtteV0nLFxufSlcbmV4cG9ydCBjbGFzcyBNYXJnaW5EaXJlY3RpdmUge1xuICAvLyBNYXJnaW5cbiAgQElucHV0KCkgbWFyZ2luOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG06IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luTGVmdDogc3RyaW5nO1xuICBASW5wdXQoKSBtbDogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5SaWdodDogc3RyaW5nO1xuICBASW5wdXQoKSBtcjogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5Ub3A6IHN0cmluZztcbiAgQElucHV0KCkgbXQ6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luQm90dG9tOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1iOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpblg6IHN0cmluZztcbiAgQElucHV0KCkgbXg6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luWTogc3RyaW5nO1xuICBASW5wdXQoKSBteTogc3RyaW5nO1xuXG4gIC8vIEBIb3N0QmluZGluZygnc3R5bGUubWFyZ2luJykgZ2V0IGhiX21hcmdpbigpIHtcbiAgLy8gICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMubWFyZ2luIHx8IHRoaXMubSk7XG4gIC8vIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGdldCBoYl9tYXJnaW4oKSB7XG4gICAgcmV0dXJuIGBtYXJnaW4tJHt0aGlzLm1hcmdpbiB8fCB0aGlzLm19YDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWFyZ2luLWxlZnQnKSBnZXQgaGJfbWFyZ2luX2xlZnQoKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLm1hcmdpbkxlZnQgfHwgdGhpcy5tbCB8fCB0aGlzLm14IHx8IHRoaXMubWFyZ2luWCk7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXJnaW4tcmlnaHQnKSBnZXQgaGJfbWFyZ2luX3JpZ2h0KCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5tYXJnaW5SaWdodCB8fCB0aGlzLm1yIHx8IHRoaXMubXggfHwgdGhpcy5tYXJnaW5YKTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi10b3AnKSBnZXQgaGJfbWFyZ2luX3RvcCgpIHtcbiAgICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMubWFyZ2luVG9wIHx8IHRoaXMubXQgfHwgdGhpcy5teSB8fCB0aGlzLm1hcmdpblkpO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUubWFyZ2luLWJvdHRvbScpIGdldCBoYl9tYXJnaW5fYm90dG9tKCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5tYXJnaW5Cb3R0b20gfHwgdGhpcy5tYiB8fCB0aGlzLm15IHx8IHRoaXMubWFyZ2luWSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gIHNlbGVjdG9yOiAnW3BdLFtwYWRkaW5nXSxbcGFkZGluZ1RvcF0sW3BhZGRpbmdSaWdodF0sW3BhZGRpbmdCb3R0b21dLFtwYWRkaW5nTGVmdF0sW3BhZGRpbmdYXSxbcGFkZGluZ1ldLFtwdF0sW3ByXSxbcGJdLFtwbF0sW3B4XSxbcHldJyxcbn0pXG5leHBvcnQgY2xhc3MgUGFkZGluZ0RpcmVjdGl2ZSB7XG4gIC8vIFBhZGRpbmdcbiAgQElucHV0KCkgcGFkZGluZzogc3RyaW5nO1xuICBASW5wdXQoKSBwOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZGRpbmdMZWZ0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZGRpbmdSaWdodDogc3RyaW5nO1xuICBASW5wdXQoKSBwcjogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nVG9wOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZGRpbmdCb3R0b206IHN0cmluZztcbiAgQElucHV0KCkgcGI6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ1g6IHN0cmluZztcbiAgQElucHV0KCkgcHg6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ1k6IHN0cmluZztcbiAgQElucHV0KCkgcHk6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgZ2V0IGhiX3BhZGRpbmcoKSB7XG4gICAgcmV0dXJuIGBwYWRkaW5nLSR7dGhpcy5wYWRkaW5nIHx8IHRoaXMucH1gO1xuICB9XG4gIC8vIEBIb3N0QmluZGluZygnY2xhc3MnKSBnZXQgaGJfcGFkZGluZygpIHtcbiAgLy8gICByZXR1cm4gYHBhZGRpbmctJHt0aGlzLnBhZGRpbmcgfHwgdGhpcy5wfWA7XG4gIC8vIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBhZGRpbmctbGVmdCcpIGdldCBoYl9wYWRkaW5nX2xlZnQoKSB7XG4gICAgcmV0dXJuIGdldFNwYWNpbmdUb2tlbih0aGlzLnBhZGRpbmdMZWZ0IHx8IHRoaXMucGwgfHwgdGhpcy5weCB8fCB0aGlzLnBhZGRpbmdYKTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBhZGRpbmctcmlnaHQnKSBnZXQgaGJfcGFkZGluZ19yaWdodCgpIHtcbiAgICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMucGFkZGluZ1JpZ2h0IHx8IHRoaXMucHIgfHwgdGhpcy5weCB8fCB0aGlzLnBhZGRpbmdYKTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBhZGRpbmctdG9wJykgZ2V0IGhiX3BhZGRpbmdfdG9wKCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5wYWRkaW5nVG9wIHx8IHRoaXMucHQgfHwgdGhpcy5weSB8fCB0aGlzLnBhZGRpbmdZKTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBhZGRpbmctYm90dG9tJykgZ2V0IGhiX3BhZGRpbmdfYm90dG9tKCkge1xuICAgIHJldHVybiBnZXRTcGFjaW5nVG9rZW4odGhpcy5wYWRkaW5nQm90dG9tIHx8IHRoaXMucGIgfHwgdGhpcy5weSB8fCB0aGlzLnBhZGRpbmdZKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2FwXScsXG59KVxuZXhwb3J0IGNsYXNzIEdhcERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGdhcDogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZ2FwJylcbiAgZ2V0IGhiX2dhcCgpIHtcbiAgICByZXR1cm4gZ2V0U3BhY2luZ1Rva2VuKHRoaXMuZ2FwKTtcbiAgfVxufVxuIl19