// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoAvatarElement } from './Avatar';
import { NovoAvatarStackElement } from './AvatarStack';
export class NovoAvatarModule {
}
NovoAvatarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NovoAvatarElement, NovoAvatarStackElement],
                exports: [NovoAvatarElement, NovoAvatarStackElement],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhdGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9hdmF0YXIvQXZhdGFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdkQsTUFBTSxPQUFPLGdCQUFnQjs7O1lBTDVCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHNCQUFzQixDQUFDO2dCQUN6RCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxzQkFBc0IsQ0FBQzthQUNyRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9BdmF0YXJFbGVtZW50IH0gZnJvbSAnLi9BdmF0YXInO1xuaW1wb3J0IHsgTm92b0F2YXRhclN0YWNrRWxlbWVudCB9IGZyb20gJy4vQXZhdGFyU3RhY2snO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b0F2YXRhckVsZW1lbnQsIE5vdm9BdmF0YXJTdGFja0VsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b0F2YXRhckVsZW1lbnQsIE5vdm9BdmF0YXJTdGFja0VsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQXZhdGFyTW9kdWxlIHt9XG4iXX0=