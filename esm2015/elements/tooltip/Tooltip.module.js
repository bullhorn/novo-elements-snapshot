// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { TooltipDirective } from './Tooltip.directive';
import { NovoTooltip } from './Tooltip.component';
export class NovoTooltipModule {
}
NovoTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [TooltipDirective, NovoTooltip],
                exports: [TooltipDirective],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3Rvb2x0aXAvVG9vbHRpcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFPbEQsTUFBTSxPQUFPLGlCQUFpQjs7O1lBTDdCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztnQkFDN0MsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IFRvb2x0aXBEaXJlY3RpdmUgfSBmcm9tICcuL1Rvb2x0aXAuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTm92b1Rvb2x0aXAgfSBmcm9tICcuL1Rvb2x0aXAuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbVG9vbHRpcERpcmVjdGl2ZSwgTm92b1Rvb2x0aXBdLFxyXG4gIGV4cG9ydHM6IFtUb29sdGlwRGlyZWN0aXZlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9Ub29sdGlwTW9kdWxlIHsgfVxyXG4iXX0=