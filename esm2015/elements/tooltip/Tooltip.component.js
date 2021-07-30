// NG2
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
export class NovoTooltip {
}
NovoTooltip.decorators = [
    { type: Component, args: [{
                selector: 'novo-tooltip',
                template: `
    <div [@state]="noAnimate ? 'no-animation' : 'visible'"
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
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3Rvb2x0aXAvVG9vbHRpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQTRCakYsTUFBTSxPQUFPLFdBQVc7OztZQTFCdkIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUU7OzhJQUVrSTtnQkFDNUksVUFBVSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxPQUFPLEVBQUU7d0JBQ2YsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUN2RCxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUN6QyxVQUFVLENBQUMsY0FBYyxFQUFFOzRCQUN6QixLQUFLLENBQUM7Z0NBQ0osT0FBTyxFQUFFLENBQUM7Z0NBQ1YsVUFBVSxFQUFFLFNBQVM7NkJBQ3RCLENBQUM7NEJBQ0YsT0FBTyxDQUFDLGNBQWMsQ0FBQzt5QkFDeEIsQ0FBQzt3QkFDRixVQUFVLENBQUMsYUFBYSxFQUFFOzRCQUN4QixLQUFLLENBQUM7Z0NBQ0osT0FBTyxFQUFFLENBQUM7Z0NBQ1YsVUFBVSxFQUFFLFFBQVE7NkJBQ3JCLENBQUM7NEJBQ0YsT0FBTyxDQUFDLGNBQWMsQ0FBQzt5QkFDeEIsQ0FBQztxQkFDSCxDQUFDO2lCQUNIO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXRvb2x0aXAnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IFtAc3RhdGVdPVwibm9BbmltYXRlID8gJ25vLWFuaW1hdGlvbicgOiAndmlzaWJsZSdcIlxyXG4gICAgICAgICBbbmdDbGFzc109XCJbdG9vbHRpcFR5cGUsIHRoaXMucm91bmRlZCA/ICdyb3VuZGVkJyA6ICcnLCBzaXplID8gc2l6ZSA6ICcnLCB0aGlzLnByZWxpbmU/ICdwcmVsaW5lJyA6ICcnLCBwb3NpdGlvbl1cIj57e21lc3NhZ2V9fTwvZGl2PmAsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignc3RhdGUnLCBbXHJcbiAgICAgIHN0YXRlKCdpbml0aWFsLCB2b2lkLCBoaWRkZW4nLCBzdHlsZSh7IG9wYWNpdHk6ICcwJyB9KSksXHJcbiAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoeyBvcGFjaXR5OiAnMScgfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZpc2libGUnLCBbXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKCcwLjNzIGVhc2UtaW4nKSxcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gaGlkZGVuJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKCcwLjNzIGVhc2UtaW4nKSxcclxuICAgICAgXSksXHJcbiAgICBdKSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1Rvb2x0aXAge1xyXG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgcHVibGljIGhpZGRlbjogYm9vbGVhbjtcclxuICBwdWJsaWMgdG9vbHRpcFR5cGU6IHN0cmluZztcclxuICBwdWJsaWMgcm91bmRlZDogYm9vbGVhbjtcclxuICBwdWJsaWMgc2l6ZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBwb3NpdGlvblN0cmF0ZWd5OiBhbnk7XHJcbiAgcHVibGljIHByZWxpbmU6IGJvb2xlYW47XHJcbiAgcHVibGljIG5vQW5pbWF0ZTogYm9vbGVhbjtcclxuICBwdWJsaWMgcG9zaXRpb246IHN0cmluZztcclxufVxyXG4iXX0=