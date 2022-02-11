// NG2
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = function (a0, a1, a2, a3, a4) { return [a0, a1, a2, a3, a4]; };
export class NovoTooltip {
}
NovoTooltip.ɵfac = function NovoTooltip_Factory(t) { return new (t || NovoTooltip)(); };
NovoTooltip.ɵcmp = i0.ɵɵdefineComponent({ type: NovoTooltip, selectors: [["novo-tooltip"]], decls: 2, vars: 9, consts: [[3, "ngClass"]], template: function NovoTooltip_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("@state", ctx.noAnimate ? "no-animation" : "visible")("ngClass", i0.ɵɵpureFunction5(3, _c0, ctx.tooltipType, ctx.rounded ? "rounded" : "", ctx.size ? ctx.size : "", ctx.preline ? "preline" : "", ctx.position));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.message);
    } }, directives: [i1.NgClass], styles: ["novo-tooltip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{background:#383838;box-shadow:4px 4px 8px rgba(0,0,0,.3);color:#fff;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;line-height:12px;padding:8px 10px;text-shadow:0 -1px 0 #000;white-space:nowrap}novo-tooltip[_ngcontent-%COMP%]   div.error[_ngcontent-%COMP%]{background-color:#b34e4d;text-shadow:0 -1px 0 #592726}novo-tooltip[_ngcontent-%COMP%]   div.info[_ngcontent-%COMP%]{background-color:#3986ac;text-shadow:0 -1px 0 #1a3c4d}novo-tooltip[_ngcontent-%COMP%]   div.warning[_ngcontent-%COMP%]{background-color:#c09854;text-shadow:0 -1px 0 #6c5328}novo-tooltip[_ngcontent-%COMP%]   div.success[_ngcontent-%COMP%]{background-color:#458746;text-shadow:0 -1px 0 #1a321a}novo-tooltip[_ngcontent-%COMP%]   div.rounded[_ngcontent-%COMP%]{border-radius:4px}novo-tooltip[_ngcontent-%COMP%]   div.extra-large[_ngcontent-%COMP%], novo-tooltip[_ngcontent-%COMP%]   div.large[_ngcontent-%COMP%], novo-tooltip[_ngcontent-%COMP%]   div.medium[_ngcontent-%COMP%], novo-tooltip[_ngcontent-%COMP%]   div.small[_ngcontent-%COMP%]{line-height:1.4em;white-space:normal;word-wrap:break-word}novo-tooltip[_ngcontent-%COMP%]   div.extra-large[_ngcontent-%COMP%]{font-size:1.2vh;width:400px}novo-tooltip[_ngcontent-%COMP%]   div.large[_ngcontent-%COMP%]{width:300px}novo-tooltip[_ngcontent-%COMP%]   div.medium[_ngcontent-%COMP%]{width:150px}novo-tooltip[_ngcontent-%COMP%]   div.small[_ngcontent-%COMP%]{width:80px}novo-tooltip[_ngcontent-%COMP%]   div.preline[_ngcontent-%COMP%]{white-space:pre-line}novo-tooltip[_ngcontent-%COMP%]   div.top[_ngcontent-%COMP%]:before{border-top-color:#383838;bottom:0;left:calc(50% - 6px);margin-bottom:-11px}novo-tooltip[_ngcontent-%COMP%]   div.top.error[_ngcontent-%COMP%]:before{border-top-color:#b34e4d}novo-tooltip[_ngcontent-%COMP%]   div.top.info[_ngcontent-%COMP%]:before{border-top-color:#3986ac}novo-tooltip[_ngcontent-%COMP%]   div.top.warning[_ngcontent-%COMP%]:before{border-top-color:#c09854}novo-tooltip[_ngcontent-%COMP%]   div.top.success[_ngcontent-%COMP%]:before{border-top-color:#458746}novo-tooltip[_ngcontent-%COMP%]   div.top-left[_ngcontent-%COMP%]:before{border-top-color:#383838;bottom:0;margin-bottom:-11px;margin-right:0;right:0}novo-tooltip[_ngcontent-%COMP%]   div.top-left.error[_ngcontent-%COMP%]:before{border-top-color:#b34e4d}novo-tooltip[_ngcontent-%COMP%]   div.top-left.info[_ngcontent-%COMP%]:before{border-top-color:#3986ac}novo-tooltip[_ngcontent-%COMP%]   div.top-left.warning[_ngcontent-%COMP%]:before{border-top-color:#c09854}novo-tooltip[_ngcontent-%COMP%]   div.top-left.success[_ngcontent-%COMP%]:before{border-top-color:#458746}novo-tooltip[_ngcontent-%COMP%]   div.top-right[_ngcontent-%COMP%]:before{border-top-color:#383838;bottom:0;left:0;margin-bottom:-11px;margin-left:0}novo-tooltip[_ngcontent-%COMP%]   div.top-right.error[_ngcontent-%COMP%]:before{border-top-color:#b34e4d}novo-tooltip[_ngcontent-%COMP%]   div.top-right.info[_ngcontent-%COMP%]:before{border-top-color:#3986ac}novo-tooltip[_ngcontent-%COMP%]   div.top-right.warning[_ngcontent-%COMP%]:before{border-top-color:#c09854}novo-tooltip[_ngcontent-%COMP%]   div.top-right.success[_ngcontent-%COMP%]:before{border-top-color:#458746}novo-tooltip[_ngcontent-%COMP%]   div.bottom[_ngcontent-%COMP%]:before{border-bottom-color:#383838;left:calc(50% - 6px);margin-top:-11px;top:0}novo-tooltip[_ngcontent-%COMP%]   div.bottom.error[_ngcontent-%COMP%]:before{border-top-color:#b34e4d}novo-tooltip[_ngcontent-%COMP%]   div.bottom.info[_ngcontent-%COMP%]:before{border-top-color:#3986ac}novo-tooltip[_ngcontent-%COMP%]   div.bottom.warning[_ngcontent-%COMP%]:before{border-top-color:#c09854}novo-tooltip[_ngcontent-%COMP%]   div.bottom.success[_ngcontent-%COMP%]:before{border-top-color:#458746}novo-tooltip[_ngcontent-%COMP%]   div.bottom-left[_ngcontent-%COMP%]:before{border-bottom-color:#383838;margin-right:0;margin-top:-11px;right:0;top:0}novo-tooltip[_ngcontent-%COMP%]   div.bottom-left.error[_ngcontent-%COMP%]:before{border-bottom-color:#b34e4d}novo-tooltip[_ngcontent-%COMP%]   div.bottom-left.info[_ngcontent-%COMP%]:before{border-bottom-color:#3986ac}novo-tooltip[_ngcontent-%COMP%]   div.bottom-left.warning[_ngcontent-%COMP%]:before{border-bottom-color:#c09854}novo-tooltip[_ngcontent-%COMP%]   div.bottom-left.success[_ngcontent-%COMP%]:before{border-bottom-color:#458746}novo-tooltip[_ngcontent-%COMP%]   div.bottom-right[_ngcontent-%COMP%]:before{border-bottom-color:#383838;left:0;margin-left:0;margin-top:-11px;top:0}novo-tooltip[_ngcontent-%COMP%]   div.bottom-right.error[_ngcontent-%COMP%]:before{border-bottom-color:#b34e4d}novo-tooltip[_ngcontent-%COMP%]   div.bottom-right.info[_ngcontent-%COMP%]:before{border-bottom-color:#3986ac}novo-tooltip[_ngcontent-%COMP%]   div.bottom-right.warning[_ngcontent-%COMP%]:before{border-bottom-color:#c09854}novo-tooltip[_ngcontent-%COMP%]   div.bottom-right.success[_ngcontent-%COMP%]:before{border-bottom-color:#458746}novo-tooltip[_ngcontent-%COMP%]   div.left[_ngcontent-%COMP%]:before{border-left-color:#383838;bottom:50%;margin-bottom:-6px;margin-right:-11px;right:0}novo-tooltip[_ngcontent-%COMP%]   div.left.error[_ngcontent-%COMP%]:before{border-left-color:#b34e4d}novo-tooltip[_ngcontent-%COMP%]   div.left.info[_ngcontent-%COMP%]:before{border-left-color:#3986ac}novo-tooltip[_ngcontent-%COMP%]   div.left.warning[_ngcontent-%COMP%]:before{border-left-color:#c09854}novo-tooltip[_ngcontent-%COMP%]   div.left.success[_ngcontent-%COMP%]:before{border-left-color:#458746}novo-tooltip[_ngcontent-%COMP%]   div.right[_ngcontent-%COMP%]:before{border-right-color:#383838;bottom:50%;left:0;margin-bottom:-6px;margin-left:-11px}novo-tooltip[_ngcontent-%COMP%]   div.right.error[_ngcontent-%COMP%]:before{border-right-color:#b34e4d}novo-tooltip[_ngcontent-%COMP%]   div.right.info[_ngcontent-%COMP%]:before{border-right-color:#3986ac}novo-tooltip[_ngcontent-%COMP%]   div.right.warning[_ngcontent-%COMP%]:before{border-right-color:#c09854}novo-tooltip[_ngcontent-%COMP%]   div.right.success[_ngcontent-%COMP%]:before{border-right-color:#458746}novo-tooltip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:before{background:0 0;border:6px solid transparent;box-sizing:border-box;content:\"\";position:absolute}"], data: { animation: [
            trigger('state', [
                state('initial, void, hidden', style({ opacity: '0' })),
                state('visible', style({ opacity: '1' })),
                transition('* => visible', [
                    style({
                        opacity: 0,
                        visibility: 'visible',
                    }),
                    animate('0.3s ease-in'),
                ]),
                transition('* => hidden', [
                    style({
                        opacity: 1,
                        visibility: 'hidden',
                    }),
                    animate('0.3s ease-in'),
                ]),
            ]),
        ] } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTooltip, [{
        type: Component,
        args: [{
                selector: 'novo-tooltip',
                templateUrl: './Tooltip.html',
                styleUrls: ['./Tooltip.scss'],
                animations: [
                    trigger('state', [
                        state('initial, void, hidden', style({ opacity: '0' })),
                        state('visible', style({ opacity: '1' })),
                        transition('* => visible', [
                            style({
                                opacity: 0,
                                visibility: 'visible',
                            }),
                            animate('0.3s ease-in'),
                        ]),
                        transition('* => hidden', [
                            style({
                                opacity: 1,
                                visibility: 'hidden',
                            }),
                            animate('0.3s ease-in'),
                        ]),
                    ]),
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdG9vbHRpcC9Ub29sdGlwLmNvbXBvbmVudC50cyIsImVsZW1lbnRzL3Rvb2x0aXAvVG9vbHRpcC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUEyQjFDLE1BQU0sT0FBTyxXQUFXOztzRUFBWCxXQUFXO2dEQUFYLFdBQVc7UUM3QnhCLDhCQUNxSDtRQUFBLFlBQVc7UUFBQSxpQkFBTTs7UUFEakksbUVBQWlELDRKQUFBO1FBQytELGVBQVc7UUFBWCxpQ0FBVztnc01ET2xIO1lBQ1YsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDZixLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZELEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3pDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7b0JBQ3pCLEtBQUssQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQzt3QkFDVixVQUFVLEVBQUUsU0FBUztxQkFDdEIsQ0FBQztvQkFDRixPQUFPLENBQUMsY0FBYyxDQUFDO2lCQUN4QixDQUFDO2dCQUNGLFVBQVUsQ0FBQyxhQUFhLEVBQUU7b0JBQ3hCLEtBQUssQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQzt3QkFDVixVQUFVLEVBQUUsUUFBUTtxQkFDckIsQ0FBQztvQkFDRixPQUFPLENBQUMsY0FBYyxDQUFDO2lCQUN4QixDQUFDO2FBQ0gsQ0FBQztTQUNIO2tEQUVVLFdBQVc7Y0F6QnZCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsV0FBVyxFQUFFLGdCQUFnQjtnQkFDN0IsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzdCLFVBQVUsRUFBRTtvQkFDVixPQUFPLENBQUMsT0FBTyxFQUFFO3dCQUNmLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDdkQsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsVUFBVSxDQUFDLGNBQWMsRUFBRTs0QkFDekIsS0FBSyxDQUFDO2dDQUNKLE9BQU8sRUFBRSxDQUFDO2dDQUNWLFVBQVUsRUFBRSxTQUFTOzZCQUN0QixDQUFDOzRCQUNGLE9BQU8sQ0FBQyxjQUFjLENBQUM7eUJBQ3hCLENBQUM7d0JBQ0YsVUFBVSxDQUFDLGFBQWEsRUFBRTs0QkFDeEIsS0FBSyxDQUFDO2dDQUNKLE9BQU8sRUFBRSxDQUFDO2dDQUNWLFVBQVUsRUFBRSxRQUFROzZCQUNyQixDQUFDOzRCQUNGLE9BQU8sQ0FBQyxjQUFjLENBQUM7eUJBQ3hCLENBQUM7cUJBQ0gsQ0FBQztpQkFDSDthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRvb2x0aXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vVG9vbHRpcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vVG9vbHRpcC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzdGF0ZScsIFtcbiAgICAgIHN0YXRlKCdpbml0aWFsLCB2b2lkLCBoaWRkZW4nLCBzdHlsZSh7IG9wYWNpdHk6ICcwJyB9KSksXG4gICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHsgb3BhY2l0eTogJzEnIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gdmlzaWJsZScsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC4zcyBlYXNlLWluJyksXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gaGlkZGVuJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuM3MgZWFzZS1pbicpLFxuICAgICAgXSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ub29sdGlwIHtcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIGhpZGRlbjogYm9vbGVhbjtcbiAgcHVibGljIHRvb2x0aXBUeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyByb3VuZGVkOiBib29sZWFuO1xuICBwdWJsaWMgc2l6ZTogc3RyaW5nO1xuICBwdWJsaWMgcG9zaXRpb25TdHJhdGVneTogYW55O1xuICBwdWJsaWMgcHJlbGluZTogYm9vbGVhbjtcbiAgcHVibGljIG5vQW5pbWF0ZTogYm9vbGVhbjtcbiAgcHVibGljIHBvc2l0aW9uOiBzdHJpbmc7XG59XG4iLCI8ZGl2IFtAc3RhdGVdPVwibm9BbmltYXRlID8gJ25vLWFuaW1hdGlvbicgOiAndmlzaWJsZSdcIlxuICBbbmdDbGFzc109XCJbdG9vbHRpcFR5cGUsIHRoaXMucm91bmRlZCA/ICdyb3VuZGVkJyA6ICcnLCBzaXplID8gc2l6ZSA6ICcnLCB0aGlzLnByZWxpbmU/ICdwcmVsaW5lJyA6ICcnLCBwb3NpdGlvbl1cIj57e21lc3NhZ2V9fTwvZGl2PiJdfQ==