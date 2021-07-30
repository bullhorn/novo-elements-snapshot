// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { EntityList } from './EntityList';
import { RenderPipe } from './Render';
import { NovoValueElement } from './Value';
export class NovoValueModule {
}
NovoValueModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NovoValueElement, RenderPipe, EntityList],
                exports: [NovoValueElement, RenderPipe, EntityList],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy92YWx1ZS9WYWx1ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE1BQU07QUFDTixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBTzNDLE1BQU0sT0FBTyxlQUFlOzs7WUFMM0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztnQkFDeEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQzthQUNwRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgRW50aXR5TGlzdCB9IGZyb20gJy4vRW50aXR5TGlzdCc7XHJcbmltcG9ydCB7IFJlbmRlclBpcGUgfSBmcm9tICcuL1JlbmRlcic7XHJcbmltcG9ydCB7IE5vdm9WYWx1ZUVsZW1lbnQgfSBmcm9tICcuL1ZhbHVlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTm92b1ZhbHVlRWxlbWVudCwgUmVuZGVyUGlwZSwgRW50aXR5TGlzdF0sXHJcbiAgZXhwb3J0czogW05vdm9WYWx1ZUVsZW1lbnQsIFJlbmRlclBpcGUsIEVudGl0eUxpc3RdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1ZhbHVlTW9kdWxlIHsgfVxyXG4iXX0=