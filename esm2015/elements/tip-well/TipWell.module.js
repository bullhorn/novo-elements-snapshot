// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoTipWellElement } from './TipWell';
export class NovoTipWellModule {
}
NovoTipWellModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NovoButtonModule],
                declarations: [NovoTipWellElement],
                exports: [NovoTipWellElement],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlwV2VsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RpcC13ZWxsL1RpcFdlbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBTy9DLE1BQU0sT0FBTyxpQkFBaUI7OztZQUw3QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2dCQUN6QyxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDbEMsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7YUFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLy4uL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1RpcFdlbGxFbGVtZW50IH0gZnJvbSAnLi9UaXBXZWxsJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0J1dHRvbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTm92b1RpcFdlbGxFbGVtZW50XSxcclxuICBleHBvcnRzOiBbTm92b1RpcFdlbGxFbGVtZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9UaXBXZWxsTW9kdWxlIHt9XHJcbiJdfQ==