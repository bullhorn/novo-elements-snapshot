// NG2
import { NgModule } from '@angular/core';
import { NovoCollapsableColumnElement } from './CollapsableColumn.component';
import { NovoDragulaModule } from '../dragula/Dragula.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
export class NovoCollapsableColumnModule {
}
NovoCollapsableColumnModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NovoCollapsableColumnElement],
                exports: [NovoCollapsableColumnElement],
                imports: [
                    NovoDragulaModule,
                    CommonModule,
                    FormsModule,
                    NovoFormExtrasModule,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFwc2FibGVDb2x1bW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbGxhcHNhYmxlLWNvbHVtbi9Db2xsYXBzYWJsZUNvbHVtbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVl4RSxNQUFNLE9BQU8sMkJBQTJCOzs7WUFWdkMsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO2dCQUM1QyxPQUFPLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztnQkFDekMsT0FBTyxFQUFFO29CQUNQLGlCQUFpQjtvQkFDakIsWUFBWTtvQkFDWixXQUFXO29CQUNYLG9CQUFvQjtpQkFDckI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Db2xsYXBzYWJsZUNvbHVtbkVsZW1lbnQgfSBmcm9tICcuL0NvbGxhcHNhYmxlQ29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvRHJhZ3VsYU1vZHVsZSB9IGZyb20gJy4uL2RyYWd1bGEvRHJhZ3VsYS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOb3ZvRm9ybUV4dHJhc01vZHVsZSB9IGZyb20gJy4uL2Zvcm0vZXh0cmFzL0Zvcm1FeHRyYXMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtOb3ZvQ29sbGFwc2FibGVDb2x1bW5FbGVtZW50XSxcbiAgICBleHBvcnRzOiBbTm92b0NvbGxhcHNhYmxlQ29sdW1uRWxlbWVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBOb3ZvRHJhZ3VsYU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTm92b0NvbGxhcHNhYmxlQ29sdW1uTW9kdWxlIHt9XG4iXX0=