// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoListModule } from './../list/List.module';
import { NovoTabModule } from './../tabs/Tabs.module';
// APP
import { NovoCategoryDropdownElement } from './CategoryDropdown';
export class NovoCategoryDropdownModule {
}
NovoCategoryDropdownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NovoTabModule, NovoListModule],
                declarations: [NovoCategoryDropdownElement],
                exports: [NovoCategoryDropdownElement],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlEcm9wZG93bi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvY2F0ZWdvcnktZHJvcGRvd24vQ2F0ZWdvcnlEcm9wZG93bi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsTUFBTTtBQUNOLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBT2pFLE1BQU0sT0FBTywwQkFBMEI7OztZQUx0QyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUM7Z0JBQ3RELFlBQVksRUFBRSxDQUFDLDJCQUEyQixDQUFDO2dCQUMzQyxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzthQUN2QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGlzdE1vZHVsZSB9IGZyb20gJy4vLi4vbGlzdC9MaXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGFiTW9kdWxlIH0gZnJvbSAnLi8uLi90YWJzL1RhYnMubW9kdWxlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0NhdGVnb3J5RHJvcGRvd25FbGVtZW50IH0gZnJvbSAnLi9DYXRlZ29yeURyb3Bkb3duJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b1RhYk1vZHVsZSwgTm92b0xpc3RNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvQ2F0ZWdvcnlEcm9wZG93bkVsZW1lbnRdLFxuICBleHBvcnRzOiBbTm92b0NhdGVnb3J5RHJvcGRvd25FbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NhdGVnb3J5RHJvcGRvd25Nb2R1bGUge31cbiJdfQ==