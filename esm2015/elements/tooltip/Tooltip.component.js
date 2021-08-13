// NG2
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
export class NovoTooltip {
}
NovoTooltip.decorators = [
    { type: Component, args: [{
                selector: 'novo-tooltip',
                template: `
    <div *ngIf="this.isHTML" [@state]="noAnimate ? 'no-animation' : 'visible'"
         [ngClass]="[tooltipType, this.rounded ? 'rounded' : '', size ? size : '', this.preline? 'preline' : '', position]"
         [innerHTML]="message"></div>
    <div *ngIf="!this.isHTML" [@state]="noAnimate ? 'no-animation' : 'visible'"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdG9vbHRpcC9Ub29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBK0JqRixNQUFNLE9BQU8sV0FBVzs7O1lBN0J2QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7OElBS2tJO2dCQUM1SSxVQUFVLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLE9BQU8sRUFBRTt3QkFDZixLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ3ZELEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ3pDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7NEJBQ3pCLEtBQUssQ0FBQztnQ0FDSixPQUFPLEVBQUUsQ0FBQztnQ0FDVixVQUFVLEVBQUUsU0FBUzs2QkFDdEIsQ0FBQzs0QkFDRixPQUFPLENBQUMsY0FBYyxDQUFDO3lCQUN4QixDQUFDO3dCQUNGLFVBQVUsQ0FBQyxhQUFhLEVBQUU7NEJBQ3hCLEtBQUssQ0FBQztnQ0FDSixPQUFPLEVBQUUsQ0FBQztnQ0FDVixVQUFVLEVBQUUsUUFBUTs2QkFDckIsQ0FBQzs0QkFDRixPQUFPLENBQUMsY0FBYyxDQUFDO3lCQUN4QixDQUFDO3FCQUNILENBQUM7aUJBQ0g7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10b29sdGlwJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwidGhpcy5pc0hUTUxcIiBbQHN0YXRlXT1cIm5vQW5pbWF0ZSA/ICduby1hbmltYXRpb24nIDogJ3Zpc2libGUnXCJcbiAgICAgICAgIFtuZ0NsYXNzXT1cIlt0b29sdGlwVHlwZSwgdGhpcy5yb3VuZGVkID8gJ3JvdW5kZWQnIDogJycsIHNpemUgPyBzaXplIDogJycsIHRoaXMucHJlbGluZT8gJ3ByZWxpbmUnIDogJycsIHBvc2l0aW9uXVwiXG4gICAgICAgICBbaW5uZXJIVE1MXT1cIm1lc3NhZ2VcIj48L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwiIXRoaXMuaXNIVE1MXCIgW0BzdGF0ZV09XCJub0FuaW1hdGUgPyAnbm8tYW5pbWF0aW9uJyA6ICd2aXNpYmxlJ1wiXG4gICAgICAgICBbbmdDbGFzc109XCJbdG9vbHRpcFR5cGUsIHRoaXMucm91bmRlZCA/ICdyb3VuZGVkJyA6ICcnLCBzaXplID8gc2l6ZSA6ICcnLCB0aGlzLnByZWxpbmU/ICdwcmVsaW5lJyA6ICcnLCBwb3NpdGlvbl1cIj57e21lc3NhZ2V9fTwvZGl2PmAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzdGF0ZScsIFtcbiAgICAgIHN0YXRlKCdpbml0aWFsLCB2b2lkLCBoaWRkZW4nLCBzdHlsZSh7IG9wYWNpdHk6ICcwJyB9KSksXG4gICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHsgb3BhY2l0eTogJzEnIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gdmlzaWJsZScsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC4zcyBlYXNlLWluJyksXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gaGlkZGVuJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuM3MgZWFzZS1pbicpLFxuICAgICAgXSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ub29sdGlwIHtcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIGhpZGRlbjogYm9vbGVhbjtcbiAgcHVibGljIHRvb2x0aXBUeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyByb3VuZGVkOiBib29sZWFuO1xuICBwdWJsaWMgc2l6ZTogc3RyaW5nO1xuICBwdWJsaWMgcG9zaXRpb25TdHJhdGVneTogYW55O1xuICBwdWJsaWMgcHJlbGluZTogYm9vbGVhbjtcbiAgcHVibGljIG5vQW5pbWF0ZTogYm9vbGVhbjtcbiAgcHVibGljIHBvc2l0aW9uOiBzdHJpbmc7XG4gIHB1YmxpYyBpc0hUTUw6IGJvb2xlYW47XG59XG4iXX0=