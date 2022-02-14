// tslint:disable: directive-selector
import { Directive, HostBinding, Input } from '@angular/core';
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
export class MarginDirective {
    get hb_margin() {
        return this.margin || this.m;
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
MarginDirective.ɵfac = function MarginDirective_Factory(t) { return new (t || MarginDirective)(); };
MarginDirective.ɵdir = i0.ɵɵdefineDirective({ type: MarginDirective, selectors: [["", "m", ""], ["", "margin", ""], ["", "marginTop", ""], ["", "marginRight", ""], ["", "marginBottom", ""], ["", "marginLeft", ""], ["", "marginX", ""], ["", "marginY", ""], ["", "mt", ""], ["", "mr", ""], ["", "mb", ""], ["", "ml", ""], ["", "mx", ""], ["", "my", ""]], hostVars: 10, hostBindings: function MarginDirective_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵstyleProp("margin", ctx.hb_margin)("margin-left", ctx.hb_margin_left)("margin-right", ctx.hb_margin_right)("margin-top", ctx.hb_margin_top)("margin-bottom", ctx.hb_margin_bottom);
    } }, inputs: { margin: "margin", m: "m", marginLeft: "marginLeft", ml: "ml", marginRight: "marginRight", mr: "mr", marginTop: "marginTop", mt: "mt", marginBottom: "marginBottom", mb: "mb", marginX: "marginX", mx: "mx", marginY: "marginY", my: "my" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MarginDirective, [{
        type: Directive,
        args: [{
                // tslint:disable-next-line: max-line-length
                selector: '[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]',
            }]
    }], null, { margin: [{
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
            args: ['style.margin']
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
        }] }); })();
export class PaddingDirective {
    get hb_padding() {
        return this.padding || this.p;
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
PaddingDirective.ɵfac = function PaddingDirective_Factory(t) { return new (t || PaddingDirective)(); };
PaddingDirective.ɵdir = i0.ɵɵdefineDirective({ type: PaddingDirective, selectors: [["", "p", ""], ["", "padding", ""], ["", "paddingTop", ""], ["", "paddingRight", ""], ["", "paddingBottom", ""], ["", "paddingLeft", ""], ["", "paddingX", ""], ["", "paddingY", ""], ["", "pt", ""], ["", "pr", ""], ["", "pb", ""], ["", "pl", ""], ["", "px", ""], ["", "py", ""]], hostVars: 10, hostBindings: function PaddingDirective_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵstyleProp("padding", ctx.hb_padding)("padding-left", ctx.hb_padding_left)("padding-right", ctx.hb_padding_right)("padding-top", ctx.hb_padding_top)("padding-bottom", ctx.hb_padding_bottom);
    } }, inputs: { padding: "padding", p: "p", paddingLeft: "paddingLeft", pl: "pl", paddingRight: "paddingRight", pr: "pr", paddingTop: "paddingTop", pt: "pt", paddingBottom: "paddingBottom", pb: "pb", paddingX: "paddingX", px: "px", paddingY: "paddingY", py: "py" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PaddingDirective, [{
        type: Directive,
        args: [{
                // tslint:disable-next-line: max-line-length
                selector: '[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]',
            }]
    }], null, { padding: [{
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
            args: ['style.padding']
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL3NwYWNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQ0FBcUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7OztFQWdCRTtBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFrQkU7QUFNRixNQUFNLE9BQU8sZUFBZTtJQWlCMUIsSUFBaUMsU0FBUztRQUN4QyxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsSUFBc0MsY0FBYztRQUNsRCxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDL0QsQ0FBQztJQUNELElBQXVDLGVBQWU7UUFDcEQsT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2hFLENBQUM7SUFDRCxJQUFxQyxhQUFhO1FBQ2hELE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM5RCxDQUFDO0lBQ0QsSUFBd0MsZ0JBQWdCO1FBQ3RELE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8s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ZWxlY3RvclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLypcblByb3BcdENTUyBQcm9wZXJ0eVx0VGhlbWUgRmllbGRcbm0sIG1hcmdpblx0bWFyZ2luXHRzcGFjZVxubXQsIG1hcmdpblRvcFx0bWFyZ2luLXRvcFx0c3BhY2Vcbm1yLCBtYXJnaW5SaWdodFx0bWFyZ2luLXJpZ2h0XHRzcGFjZVxubWIsIG1hcmdpbkJvdHRvbVx0bWFyZ2luLWJvdHRvbVx0c3BhY2Vcbm1sLCBtYXJnaW5MZWZ0XHRtYXJnaW4tbGVmdFx0c3BhY2Vcbm14XHRtYXJnaW4tbGVmdCBhbmQgbWFyZ2luLXJpZ2h0XHRzcGFjZVxubXlcdG1hcmdpbi10b3AgYW5kIG1hcmdpbi1ib3R0b21cdHNwYWNlXG5wLCBwYWRkaW5nXHRwYWRkaW5nXHRzcGFjZVxucHQsIHBhZGRpbmdUb3BcdHBhZGRpbmctdG9wXHRzcGFjZVxucHIsIHBhZGRpbmdSaWdodFx0cGFkZGluZy1yaWdodFx0c3BhY2VcbnBiLCBwYWRkaW5nQm90dG9tXHRwYWRkaW5nLWJvdHRvbVx0c3BhY2VcbnBsLCBwYWRkaW5nTGVmdFx0cGFkZGluZy1sZWZ0XHRzcGFjZVxucHhcdHBhZGRpbmctbGVmdCBhbmQgcGFkZGluZy1yaWdodFx0c3BhY2VcbnB5XHRwYWRkaW5nLXRvcCBhbmQgcGFkZGluZy1ib3R0b21cdHNwYWNlXG4qL1xuXG4vKlxuLy8gU2VsZWN0b3JzIGdlbmVyYXRlZCB3aXRoIHRoZSBmb2xsb3dpbmcgY29kZVxuY29uc3QgZGlyZWN0aW9ucyA9IFsnVG9wJywgJ1JpZ2h0JywgJ0JvdHRvbScsICdMZWZ0JywgJ1gnLCAnWSddO1xuY29uc3QgYWJickRpcmVjdGlvbnMgPSBkaXJlY3Rpb25zLm1hcCgoZCkgPT4gZC5zbGljZSgwLCAxKS50b0xvd2VyQ2FzZSgpKTtcbmNvbnN0IG1hcmdpbkF0dHJzID0gW1xuICAnW21dJyxcbiAgJ1ttYXJnaW5dJyxcbiAgLi4uZGlyZWN0aW9ucy5tYXAoKGRpcikgPT4gYFttYXJnaW4ke2Rpcn1dYCksXG4gIC4uLmFiYnJEaXJlY3Rpb25zLm1hcCgoZGlyKSA9PiBgW20ke2Rpcn1dYCksXG5dO1xuY29uc3QgcGFkZGluZ0F0dHJzID0gW1xuICAnW3BdJyxcbiAgJ1twYWRkaW5nXScsXG4gIC4uLmRpcmVjdGlvbnMubWFwKChkaXIpID0+IGBbcGFkZGluZyR7ZGlyfV1gKSxcbiAgLi4uYWJickRpcmVjdGlvbnMubWFwKChkaXIpID0+IGBbcCR7ZGlyfV1gKSxcbl07XG5cbmNvbnN0IHNlbGVjdG9ycyA9IFsuLi5tYXJnaW5BdHRycywgLi4ucGFkZGluZ0F0dHJzXTtcbiovXG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICBzZWxlY3RvcjogJ1ttXSxbbWFyZ2luXSxbbWFyZ2luVG9wXSxbbWFyZ2luUmlnaHRdLFttYXJnaW5Cb3R0b21dLFttYXJnaW5MZWZ0XSxbbWFyZ2luWF0sW21hcmdpblldLFttdF0sW21yXSxbbWJdLFttbF0sW214XSxbbXldJyxcbn0pXG5leHBvcnQgY2xhc3MgTWFyZ2luRGlyZWN0aXZlIHtcbiAgLy8gTWFyZ2luXG4gIEBJbnB1dCgpIG1hcmdpbjogc3RyaW5nO1xuICBASW5wdXQoKSBtOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpbkxlZnQ6IHN0cmluZztcbiAgQElucHV0KCkgbWw6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luUmlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgbXI6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luVG9wOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG10OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpbkJvdHRvbTogc3RyaW5nO1xuICBASW5wdXQoKSBtYjogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5YOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG14OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hcmdpblk6IHN0cmluZztcbiAgQElucHV0KCkgbXk6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbicpIGdldCBoYl9tYXJnaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMubWFyZ2luIHx8IHRoaXMubTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi1sZWZ0JykgZ2V0IGhiX21hcmdpbl9sZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLm1hcmdpbkxlZnQgfHwgdGhpcy5tbCB8fCB0aGlzLm14IHx8IHRoaXMubWFyZ2luWDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi1yaWdodCcpIGdldCBoYl9tYXJnaW5fcmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFyZ2luUmlnaHQgfHwgdGhpcy5tciB8fCB0aGlzLm14IHx8IHRoaXMubWFyZ2luWDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi10b3AnKSBnZXQgaGJfbWFyZ2luX3RvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJnaW5Ub3AgfHwgdGhpcy5tdCB8fCB0aGlzLm15IHx8IHRoaXMubWFyZ2luWTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1hcmdpbi1ib3R0b20nKSBnZXQgaGJfbWFyZ2luX2JvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJnaW5Cb3R0b20gfHwgdGhpcy5tYiB8fCB0aGlzLm15IHx8IHRoaXMubWFyZ2luWTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcbiAgc2VsZWN0b3I6ICdbcF0sW3BhZGRpbmddLFtwYWRkaW5nVG9wXSxbcGFkZGluZ1JpZ2h0XSxbcGFkZGluZ0JvdHRvbV0sW3BhZGRpbmdMZWZ0XSxbcGFkZGluZ1hdLFtwYWRkaW5nWV0sW3B0XSxbcHJdLFtwYl0sW3BsXSxbcHhdLFtweV0nLFxufSlcbmV4cG9ydCBjbGFzcyBQYWRkaW5nRGlyZWN0aXZlIHtcbiAgLy8gUGFkZGluZ1xuICBASW5wdXQoKSBwYWRkaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHA6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ0xlZnQ6IHN0cmluZztcbiAgQElucHV0KCkgcGw6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ1JpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZGRpbmdUb3A6IHN0cmluZztcbiAgQElucHV0KCkgcHQ6IHN0cmluZztcbiAgQElucHV0KCkgcGFkZGluZ0JvdHRvbTogc3RyaW5nO1xuICBASW5wdXQoKSBwYjogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nWDogc3RyaW5nO1xuICBASW5wdXQoKSBweDogc3RyaW5nO1xuICBASW5wdXQoKSBwYWRkaW5nWTogc3RyaW5nO1xuICBASW5wdXQoKSBweTogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZycpIGdldCBoYl9wYWRkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnBhZGRpbmcgfHwgdGhpcy5wO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy1sZWZ0JykgZ2V0IGhiX3BhZGRpbmdfbGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYWRkaW5nTGVmdCB8fCB0aGlzLnBsIHx8IHRoaXMucHggfHwgdGhpcy5wYWRkaW5nWDtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBhZGRpbmctcmlnaHQnKSBnZXQgaGJfcGFkZGluZ19yaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYWRkaW5nUmlnaHQgfHwgdGhpcy5wciB8fCB0aGlzLnB4IHx8IHRoaXMucGFkZGluZ1g7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLXRvcCcpIGdldCBoYl9wYWRkaW5nX3RvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYWRkaW5nVG9wIHx8IHRoaXMucHQgfHwgdGhpcy5weSB8fCB0aGlzLnBhZGRpbmdZO1xuICB9XG4gIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy1ib3R0b20nKSBnZXQgaGJfcGFkZGluZ19ib3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMucGFkZGluZ0JvdHRvbSB8fCB0aGlzLnBiIHx8IHRoaXMucHkgfHwgdGhpcy5wYWRkaW5nWTtcbiAgfVxufVxuIl19