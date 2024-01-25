// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoNavContentElement, NovoNavElement, NovoNavHeaderElement, NovoNavOutletElement, NovoTabButtonElement, NovoTabElement, NovoTabLinkElement, } from './Tabs';
import * as i0 from "@angular/core";
export class NovoTabModule {
}
NovoTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NovoTabModule, declarations: [NovoNavElement,
        NovoTabElement,
        NovoTabButtonElement,
        NovoTabLinkElement,
        NovoNavOutletElement,
        NovoNavContentElement,
        NovoNavHeaderElement], imports: [CommonModule], exports: [NovoNavElement,
        NovoTabElement,
        NovoTabButtonElement,
        NovoTabLinkElement,
        NovoNavOutletElement,
        NovoNavContentElement,
        NovoNavHeaderElement] });
NovoTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTabModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTabModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJzL1RhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxNQUFNO0FBQ04sT0FBTyxFQUNMLHFCQUFxQixFQUNyQixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLG9CQUFvQixFQUNwQixvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLGtCQUFrQixHQUNuQixNQUFNLFFBQVEsQ0FBQzs7QUF1QmhCLE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsaUJBbEJ0QixjQUFjO1FBQ2QsY0FBYztRQUNkLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQixvQkFBb0IsYUFSWixZQUFZLGFBV3BCLGNBQWM7UUFDZCxjQUFjO1FBQ2Qsb0JBQW9CO1FBQ3BCLGtCQUFrQjtRQUNsQixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLG9CQUFvQjsyR0FHWCxhQUFhLFlBcEJkLFlBQVk7MkZBb0JYLGFBQWE7a0JBckJ6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFO3dCQUNaLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLG9CQUFvQjtxQkFDckI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQge1xuICBOb3ZvTmF2Q29udGVudEVsZW1lbnQsXG4gIE5vdm9OYXZFbGVtZW50LFxuICBOb3ZvTmF2SGVhZGVyRWxlbWVudCxcbiAgTm92b05hdk91dGxldEVsZW1lbnQsXG4gIE5vdm9UYWJCdXR0b25FbGVtZW50LFxuICBOb3ZvVGFiRWxlbWVudCxcbiAgTm92b1RhYkxpbmtFbGVtZW50LFxufSBmcm9tICcuL1RhYnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b05hdkVsZW1lbnQsXG4gICAgTm92b1RhYkVsZW1lbnQsXG4gICAgTm92b1RhYkJ1dHRvbkVsZW1lbnQsXG4gICAgTm92b1RhYkxpbmtFbGVtZW50LFxuICAgIE5vdm9OYXZPdXRsZXRFbGVtZW50LFxuICAgIE5vdm9OYXZDb250ZW50RWxlbWVudCxcbiAgICBOb3ZvTmF2SGVhZGVyRWxlbWVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9OYXZFbGVtZW50LFxuICAgIE5vdm9UYWJFbGVtZW50LFxuICAgIE5vdm9UYWJCdXR0b25FbGVtZW50LFxuICAgIE5vdm9UYWJMaW5rRWxlbWVudCxcbiAgICBOb3ZvTmF2T3V0bGV0RWxlbWVudCxcbiAgICBOb3ZvTmF2Q29udGVudEVsZW1lbnQsXG4gICAgTm92b05hdkhlYWRlckVsZW1lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJNb2R1bGUge31cbiJdfQ==