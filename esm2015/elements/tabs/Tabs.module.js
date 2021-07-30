// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoNavElement, NovoTabElement, NovoTabButtonElement, NovoTabLinkElement, NovoNavOutletElement, NovoNavContentElement, NovoNavHeaderElement, } from './Tabs';
export class NovoTabModule {
}
NovoTabModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [
                    NovoNavElement,
                    NovoTabElement,
                    NovoTabButtonElement,
                    NovoTabLinkElement,
                    NovoNavOutletElement,
                    NovoNavContentElement,
                    NovoNavHeaderElement,
                ],
                exports: [
                    NovoNavElement,
                    NovoTabElement,
                    NovoTabButtonElement,
                    NovoTabLinkElement,
                    NovoNavOutletElement,
                    NovoNavContentElement,
                    NovoNavHeaderElement,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYnMvVGFicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE1BQU07QUFDTixPQUFPLEVBQ0wsY0FBYyxFQUNkLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQixxQkFBcUIsRUFDckIsb0JBQW9CLEdBQ3JCLE1BQU0sUUFBUSxDQUFDO0FBdUJoQixNQUFNLE9BQU8sYUFBYTs7O1lBckJ6QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxjQUFjO29CQUNkLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsb0JBQW9CO2lCQUNyQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsY0FBYztvQkFDZCxjQUFjO29CQUNkLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsb0JBQW9CO2lCQUNyQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbi8vIEFQUFxyXG5pbXBvcnQge1xyXG4gIE5vdm9OYXZFbGVtZW50LFxyXG4gIE5vdm9UYWJFbGVtZW50LFxyXG4gIE5vdm9UYWJCdXR0b25FbGVtZW50LFxyXG4gIE5vdm9UYWJMaW5rRWxlbWVudCxcclxuICBOb3ZvTmF2T3V0bGV0RWxlbWVudCxcclxuICBOb3ZvTmF2Q29udGVudEVsZW1lbnQsXHJcbiAgTm92b05hdkhlYWRlckVsZW1lbnQsXHJcbn0gZnJvbSAnLi9UYWJzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOb3ZvTmF2RWxlbWVudCxcclxuICAgIE5vdm9UYWJFbGVtZW50LFxyXG4gICAgTm92b1RhYkJ1dHRvbkVsZW1lbnQsXHJcbiAgICBOb3ZvVGFiTGlua0VsZW1lbnQsXHJcbiAgICBOb3ZvTmF2T3V0bGV0RWxlbWVudCxcclxuICAgIE5vdm9OYXZDb250ZW50RWxlbWVudCxcclxuICAgIE5vdm9OYXZIZWFkZXJFbGVtZW50LFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTm92b05hdkVsZW1lbnQsXHJcbiAgICBOb3ZvVGFiRWxlbWVudCxcclxuICAgIE5vdm9UYWJCdXR0b25FbGVtZW50LFxyXG4gICAgTm92b1RhYkxpbmtFbGVtZW50LFxyXG4gICAgTm92b05hdk91dGxldEVsZW1lbnQsXHJcbiAgICBOb3ZvTmF2Q29udGVudEVsZW1lbnQsXHJcbiAgICBOb3ZvTmF2SGVhZGVyRWxlbWVudCxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1RhYk1vZHVsZSB7fVxyXG4iXX0=