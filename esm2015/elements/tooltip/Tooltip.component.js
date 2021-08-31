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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdG9vbHRpcC9Ub29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBNEJqRixNQUFNLE9BQU8sV0FBVzs7O1lBMUJ2QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7OElBRWtJO2dCQUM1SSxVQUFVLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLE9BQU8sRUFBRTt3QkFDZixLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ3ZELEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ3pDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7NEJBQ3pCLEtBQUssQ0FBQztnQ0FDSixPQUFPLEVBQUUsQ0FBQztnQ0FDVixVQUFVLEVBQUUsU0FBUzs2QkFDdEIsQ0FBQzs0QkFDRixPQUFPLENBQUMsY0FBYyxDQUFDO3lCQUN4QixDQUFDO3dCQUNGLFVBQVUsQ0FBQyxhQUFhLEVBQUU7NEJBQ3hCLEtBQUssQ0FBQztnQ0FDSixPQUFPLEVBQUUsQ0FBQztnQ0FDVixVQUFVLEVBQUUsUUFBUTs2QkFDckIsQ0FBQzs0QkFDRixPQUFPLENBQUMsY0FBYyxDQUFDO3lCQUN4QixDQUFDO3FCQUNILENBQUM7aUJBQ0g7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10b29sdGlwJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtAc3RhdGVdPVwibm9BbmltYXRlID8gJ25vLWFuaW1hdGlvbicgOiAndmlzaWJsZSdcIlxuICAgICAgICAgW25nQ2xhc3NdPVwiW3Rvb2x0aXBUeXBlLCB0aGlzLnJvdW5kZWQgPyAncm91bmRlZCcgOiAnJywgc2l6ZSA/IHNpemUgOiAnJywgdGhpcy5wcmVsaW5lPyAncHJlbGluZScgOiAnJywgcG9zaXRpb25dXCI+e3ttZXNzYWdlfX08L2Rpdj5gLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc3RhdGUnLCBbXG4gICAgICBzdGF0ZSgnaW5pdGlhbCwgdm9pZCwgaGlkZGVuJywgc3R5bGUoeyBvcGFjaXR5OiAnMCcgfSkpLFxuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7IG9wYWNpdHk6ICcxJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZpc2libGUnLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuM3MgZWFzZS1pbicpLFxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGhpZGRlbicsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjNzIGVhc2UtaW4nKSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVG9vbHRpcCB7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBoaWRkZW46IGJvb2xlYW47XG4gIHB1YmxpYyB0b29sdGlwVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgcm91bmRlZDogYm9vbGVhbjtcbiAgcHVibGljIHNpemU6IHN0cmluZztcbiAgcHVibGljIHBvc2l0aW9uU3RyYXRlZ3k6IGFueTtcbiAgcHVibGljIHByZWxpbmU6IGJvb2xlYW47XG4gIHB1YmxpYyBub0FuaW1hdGU6IGJvb2xlYW47XG4gIHB1YmxpYyBwb3NpdGlvbjogc3RyaW5nO1xufVxuIl19