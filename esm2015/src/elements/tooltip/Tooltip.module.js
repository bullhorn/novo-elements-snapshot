// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoTooltip } from './Tooltip.component';
// APP
import { TooltipDirective } from './Tooltip.directive';
export class NovoTooltipModule {
}
NovoTooltipModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TooltipDirective, NovoTooltip],
                exports: [TooltipDirective],
                imports: [CommonModule],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvdG9vbHRpcC9Ub29sdGlwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU92RCxNQUFNLE9BQU8saUJBQWlCOzs7WUFMN0IsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztnQkFDN0MsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzNCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN4QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvVG9vbHRpcCB9IGZyb20gJy4vVG9vbHRpcC5jb21wb25lbnQnO1xuLy8gQVBQXG5pbXBvcnQgeyBUb29sdGlwRGlyZWN0aXZlIH0gZnJvbSAnLi9Ub29sdGlwLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1Rvb2x0aXBEaXJlY3RpdmUsIE5vdm9Ub29sdGlwXSxcbiAgZXhwb3J0czogW1Rvb2x0aXBEaXJlY3RpdmVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1Rvb2x0aXBNb2R1bGUge31cbiJdfQ==