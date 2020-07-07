/**
 * @fileoverview added by tsickle
 * Generated from: elements/tooltip/Tooltip.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// NG2
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
export class NovoTooltip {
}
NovoTooltip.decorators = [
    { type: Component, args: [{
                selector: 'novo-tooltip',
                template: `<div [@state]="noAnimate ? 'no-animation' : 'visible'"
  [ngClass]="[tooltipType, this.rounded ? 'rounded' : '', size ? size : '', this.preline? 'preline' : '', position]">{{message}}</div>`,
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
                styles: ["novo-tooltip div{background:#383838;color:#fff;padding:8px 10px;font-size:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;line-height:12px;white-space:nowrap;text-shadow:0 -1px 0 #000;box-shadow:4px 4px 8px rgba(0,0,0,.3)}novo-tooltip div.error{background-color:#b34e4d;text-shadow:0 -1px 0 #592726}novo-tooltip div.info{background-color:#3986ac;text-shadow:0 -1px 0 #1a3c4d}novo-tooltip div.warning{background-color:#c09854;text-shadow:0 -1px 0 #6c5328}novo-tooltip div.success{background-color:#458746;text-shadow:0 -1px 0 #1a321a}novo-tooltip div.rounded{border-radius:4px}novo-tooltip div.extra-large,novo-tooltip div.large,novo-tooltip div.medium,novo-tooltip div.small{white-space:normal;line-height:1.4em;word-wrap:break-word}novo-tooltip div.extra-large{width:400px;font-size:1.2vh}novo-tooltip div.large{width:300px}novo-tooltip div.medium{width:150px}novo-tooltip div.small{width:80px}novo-tooltip div.preline{white-space:pre-line}novo-tooltip div.top:before{margin-bottom:-11px;left:calc(50% - 6px);bottom:0;border-top-color:#383838}novo-tooltip div.top.error:before{border-top-color:#b34e4d}novo-tooltip div.top.info:before{border-top-color:#3986ac}novo-tooltip div.top.warning:before{border-top-color:#c09854}novo-tooltip div.top.success:before{border-top-color:#458746}novo-tooltip div.top-left:before{border-top-color:#383838;margin-right:0;margin-bottom:-11px;right:0;bottom:0}novo-tooltip div.top-left.error:before{border-top-color:#b34e4d}novo-tooltip div.top-left.info:before{border-top-color:#3986ac}novo-tooltip div.top-left.warning:before{border-top-color:#c09854}novo-tooltip div.top-left.success:before{border-top-color:#458746}novo-tooltip div.top-right:before{border-top-color:#383838;margin-left:0;margin-bottom:-11px;left:0;bottom:0}novo-tooltip div.top-right.error:before{border-top-color:#b34e4d}novo-tooltip div.top-right.info:before{border-top-color:#3986ac}novo-tooltip div.top-right.warning:before{border-top-color:#c09854}novo-tooltip div.top-right.success:before{border-top-color:#458746}novo-tooltip div.bottom:before{margin-top:-11px;left:calc(50% - 6px);top:0;border-bottom-color:#383838}novo-tooltip div.bottom.error:before{border-top-color:#b34e4d}novo-tooltip div.bottom.info:before{border-top-color:#3986ac}novo-tooltip div.bottom.warning:before{border-top-color:#c09854}novo-tooltip div.bottom.success:before{border-top-color:#458746}novo-tooltip div.bottom-left:before{border-bottom-color:#383838;margin-right:0;margin-top:-11px;right:0;top:0}novo-tooltip div.bottom-left.error:before{border-bottom-color:#b34e4d}novo-tooltip div.bottom-left.info:before{border-bottom-color:#3986ac}novo-tooltip div.bottom-left.warning:before{border-bottom-color:#c09854}novo-tooltip div.bottom-left.success:before{border-bottom-color:#458746}novo-tooltip div.bottom-right:before{border-bottom-color:#383838;margin-left:0;margin-top:-11px;left:0;top:0}novo-tooltip div.bottom-right.error:before{border-bottom-color:#b34e4d}novo-tooltip div.bottom-right.info:before{border-bottom-color:#3986ac}novo-tooltip div.bottom-right.warning:before{border-bottom-color:#c09854}novo-tooltip div.bottom-right.success:before{border-bottom-color:#458746}novo-tooltip div.left:before{border-left-color:#383838;margin-right:-11px;margin-bottom:-6px;right:0;bottom:50%}novo-tooltip div.left.error:before{border-left-color:#b34e4d}novo-tooltip div.left.info:before{border-left-color:#3986ac}novo-tooltip div.left.warning:before{border-left-color:#c09854}novo-tooltip div.left.success:before{border-left-color:#458746}novo-tooltip div.right:before{left:0;bottom:50%;border-right-color:#383838;margin-left:-11px;margin-bottom:-6px}novo-tooltip div.right.error:before{border-right-color:#b34e4d}novo-tooltip div.right.info:before{border-right-color:#3986ac}novo-tooltip div.right.warning:before{border-right-color:#c09854}novo-tooltip div.right.success:before{border-right-color:#458746}novo-tooltip div:before{content:'';position:absolute;background:0 0;border:6px solid transparent;box-sizing:border-box}"]
            }] }
];
if (false) {
    /** @type {?} */
    NovoTooltip.prototype.message;
    /** @type {?} */
    NovoTooltip.prototype.hidden;
    /** @type {?} */
    NovoTooltip.prototype.tooltipType;
    /** @type {?} */
    NovoTooltip.prototype.rounded;
    /** @type {?} */
    NovoTooltip.prototype.size;
    /** @type {?} */
    NovoTooltip.prototype.positionStrategy;
    /** @type {?} */
    NovoTooltip.prototype.preline;
    /** @type {?} */
    NovoTooltip.prototype.noAnimate;
    /** @type {?} */
    NovoTooltip.prototype.position;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdG9vbHRpcC9Ub29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUE0QmpGLE1BQU0sT0FBTyxXQUFXOzs7WUExQnZCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFO3VJQUMySDtnQkFFckksVUFBVSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxPQUFPLEVBQUU7d0JBQ2YsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUN2RCxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUN6QyxVQUFVLENBQUMsY0FBYyxFQUFFOzRCQUN6QixLQUFLLENBQUM7Z0NBQ0osT0FBTyxFQUFFLENBQUM7Z0NBQ1YsVUFBVSxFQUFFLFNBQVM7NkJBQ3RCLENBQUM7NEJBQ0YsT0FBTyxDQUFDLGNBQWMsQ0FBQzt5QkFDeEIsQ0FBQzt3QkFDRixVQUFVLENBQUMsYUFBYSxFQUFFOzRCQUN4QixLQUFLLENBQUM7Z0NBQ0osT0FBTyxFQUFFLENBQUM7Z0NBQ1YsVUFBVSxFQUFFLFFBQVE7NkJBQ3JCLENBQUM7NEJBQ0YsT0FBTyxDQUFDLGNBQWMsQ0FBQzt5QkFDeEIsQ0FBQztxQkFDSCxDQUFDO2lCQUNIOzthQUNGOzs7O0lBRUMsOEJBQXVCOztJQUN2Qiw2QkFBdUI7O0lBQ3ZCLGtDQUEyQjs7SUFDM0IsOEJBQXdCOztJQUN4QiwyQkFBb0I7O0lBQ3BCLHVDQUE2Qjs7SUFDN0IsOEJBQXdCOztJQUN4QixnQ0FBMEI7O0lBQzFCLCtCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10b29sdGlwJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtAc3RhdGVdPVwibm9BbmltYXRlID8gJ25vLWFuaW1hdGlvbicgOiAndmlzaWJsZSdcIlxuICBbbmdDbGFzc109XCJbdG9vbHRpcFR5cGUsIHRoaXMucm91bmRlZCA/ICdyb3VuZGVkJyA6ICcnLCBzaXplID8gc2l6ZSA6ICcnLCB0aGlzLnByZWxpbmU/ICdwcmVsaW5lJyA6ICcnLCBwb3NpdGlvbl1cIj57e21lc3NhZ2V9fTwvZGl2PmAsXG4gIHN0eWxlVXJsczogWycuL1Rvb2x0aXAuc2NzcyddLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc3RhdGUnLCBbXG4gICAgICBzdGF0ZSgnaW5pdGlhbCwgdm9pZCwgaGlkZGVuJywgc3R5bGUoeyBvcGFjaXR5OiAnMCcgfSkpLFxuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7IG9wYWNpdHk6ICcxJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZpc2libGUnLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuM3MgZWFzZS1pbicpLFxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGhpZGRlbicsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjNzIGVhc2UtaW4nKSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVG9vbHRpcCB7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBoaWRkZW46IGJvb2xlYW47XG4gIHB1YmxpYyB0b29sdGlwVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgcm91bmRlZDogYm9vbGVhbjtcbiAgcHVibGljIHNpemU6IHN0cmluZztcbiAgcHVibGljIHBvc2l0aW9uU3RyYXRlZ3k6IGFueTtcbiAgcHVibGljIHByZWxpbmU6IGJvb2xlYW47XG4gIHB1YmxpYyBub0FuaW1hdGU6IGJvb2xlYW47XG4gIHB1YmxpYyBwb3NpdGlvbjogc3RyaW5nO1xufVxuIl19