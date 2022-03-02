// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoToolbar, NovoToolbarRow } from './toolbar.component';
export class NovoToolbarModule {
}
NovoToolbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NovoToolbar, NovoToolbarRow],
                exports: [NovoToolbar, NovoToolbarRow],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvdG9vbGJhci90b29sYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU9sRSxNQUFNLE9BQU8saUJBQWlCOzs7WUFMN0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQztnQkFDM0MsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQzthQUN2QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvVG9vbGJhciwgTm92b1Rvb2xiYXJSb3cgfSBmcm9tICcuL3Rvb2xiYXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9Ub29sYmFyLCBOb3ZvVG9vbGJhclJvd10sXG4gIGV4cG9ydHM6IFtOb3ZvVG9vbGJhciwgTm92b1Rvb2xiYXJSb3ddLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVG9vbGJhck1vZHVsZSB7fVxuIl19