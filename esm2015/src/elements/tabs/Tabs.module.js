// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoNavContentElement, NovoNavElement, NovoNavHeaderElement, NovoNavOutletElement, NovoTabButtonElement, NovoTabElement, NovoTabLinkElement, } from './Tabs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvdGFicy9UYWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsTUFBTTtBQUNOLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixvQkFBb0IsRUFDcEIsb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCxrQkFBa0IsR0FDbkIsTUFBTSxRQUFRLENBQUM7QUF1QmhCLE1BQU0sT0FBTyxhQUFhOzs7WUFyQnpCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRTtvQkFDWixjQUFjO29CQUNkLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixvQkFBb0I7aUJBQ3JCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxjQUFjO29CQUNkLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixvQkFBb0I7aUJBQ3JCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQge1xuICBOb3ZvTmF2Q29udGVudEVsZW1lbnQsXG4gIE5vdm9OYXZFbGVtZW50LFxuICBOb3ZvTmF2SGVhZGVyRWxlbWVudCxcbiAgTm92b05hdk91dGxldEVsZW1lbnQsXG4gIE5vdm9UYWJCdXR0b25FbGVtZW50LFxuICBOb3ZvVGFiRWxlbWVudCxcbiAgTm92b1RhYkxpbmtFbGVtZW50LFxufSBmcm9tICcuL1RhYnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b05hdkVsZW1lbnQsXG4gICAgTm92b1RhYkVsZW1lbnQsXG4gICAgTm92b1RhYkJ1dHRvbkVsZW1lbnQsXG4gICAgTm92b1RhYkxpbmtFbGVtZW50LFxuICAgIE5vdm9OYXZPdXRsZXRFbGVtZW50LFxuICAgIE5vdm9OYXZDb250ZW50RWxlbWVudCxcbiAgICBOb3ZvTmF2SGVhZGVyRWxlbWVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9OYXZFbGVtZW50LFxuICAgIE5vdm9UYWJFbGVtZW50LFxuICAgIE5vdm9UYWJCdXR0b25FbGVtZW50LFxuICAgIE5vdm9UYWJMaW5rRWxlbWVudCxcbiAgICBOb3ZvTmF2T3V0bGV0RWxlbWVudCxcbiAgICBOb3ZvTmF2Q29udGVudEVsZW1lbnQsXG4gICAgTm92b05hdkhlYWRlckVsZW1lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJNb2R1bGUge31cbiJdfQ==