// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoRadioElement, NovoRadioGroup } from './Radio';
export class NovoRadioModule {
}
NovoRadioModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NovoButtonModule],
                declarations: [NovoRadioElement, NovoRadioGroup],
                exports: [NovoRadioElement, NovoRadioGroup],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW8ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9yYWRpby9SYWRpby5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBTzNELE1BQU0sT0FBTyxlQUFlOzs7WUFMM0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztnQkFDekMsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7YUFDNUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vQnV0dG9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9SYWRpb0VsZW1lbnQsIE5vdm9SYWRpb0dyb3VwIH0gZnJvbSAnLi9SYWRpbyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9CdXR0b25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW05vdm9SYWRpb0VsZW1lbnQsIE5vdm9SYWRpb0dyb3VwXSxcclxuICBleHBvcnRzOiBbTm92b1JhZGlvRWxlbWVudCwgTm92b1JhZGlvR3JvdXBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1JhZGlvTW9kdWxlIHt9XHJcbiJdfQ==