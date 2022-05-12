// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from '../common';
import { NovoIconModule } from '../icon';
// APP
import { NovoItemAvatarElement, NovoItemContentElement, NovoItemDateElement, NovoItemEndElement, NovoItemHeaderElement, NovoItemTitleElement, NovoListElement, NovoListItemElement, } from './List';
import * as i0 from "@angular/core";
export class NovoListModule {
}
NovoListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoListModule, declarations: [NovoListElement,
        NovoListItemElement,
        NovoItemAvatarElement,
        NovoItemTitleElement,
        NovoItemContentElement,
        NovoItemEndElement,
        NovoItemHeaderElement,
        NovoItemDateElement], imports: [CommonModule, NovoCommonModule, NovoIconModule], exports: [NovoListElement,
        NovoListItemElement,
        NovoItemAvatarElement,
        NovoItemTitleElement,
        NovoItemHeaderElement,
        NovoItemContentElement,
        NovoItemEndElement,
        NovoItemDateElement] });
NovoListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoListModule, imports: [[CommonModule, NovoCommonModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoCommonModule, NovoIconModule],
                    declarations: [
                        NovoListElement,
                        NovoListItemElement,
                        NovoItemAvatarElement,
                        NovoItemTitleElement,
                        NovoItemContentElement,
                        NovoItemEndElement,
                        NovoItemHeaderElement,
                        NovoItemDateElement,
                    ],
                    exports: [
                        NovoListElement,
                        NovoListItemElement,
                        NovoItemAvatarElement,
                        NovoItemTitleElement,
                        NovoItemHeaderElement,
                        NovoItemContentElement,
                        NovoItemEndElement,
                        NovoItemDateElement,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9saXN0L0xpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6QyxNQUFNO0FBQ04sT0FBTyxFQUNMLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixtQkFBbUIsR0FDcEIsTUFBTSxRQUFRLENBQUM7O0FBeUJoQixNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLGlCQXBCdkIsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLG1CQUFtQixhQVRYLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLGFBWXRELGVBQWU7UUFDZixtQkFBbUI7UUFDbkIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLGtCQUFrQjtRQUNsQixtQkFBbUI7NEdBR1YsY0FBYyxZQXRCaEIsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDOzJGQXNCOUMsY0FBYztrQkF2QjFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztvQkFDekQsWUFBWSxFQUFFO3dCQUNaLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3dCQUN0QixrQkFBa0I7d0JBQ2xCLHFCQUFxQjt3QkFDckIsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLHNCQUFzQjt3QkFDdEIsa0JBQWtCO3dCQUNsQixtQkFBbUI7cUJBQ3BCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uJztcbi8vIEFQUFxuaW1wb3J0IHtcbiAgTm92b0l0ZW1BdmF0YXJFbGVtZW50LFxuICBOb3ZvSXRlbUNvbnRlbnRFbGVtZW50LFxuICBOb3ZvSXRlbURhdGVFbGVtZW50LFxuICBOb3ZvSXRlbUVuZEVsZW1lbnQsXG4gIE5vdm9JdGVtSGVhZGVyRWxlbWVudCxcbiAgTm92b0l0ZW1UaXRsZUVsZW1lbnQsXG4gIE5vdm9MaXN0RWxlbWVudCxcbiAgTm92b0xpc3RJdGVtRWxlbWVudCxcbn0gZnJvbSAnLi9MaXN0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0NvbW1vbk1vZHVsZSwgTm92b0ljb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvTGlzdEVsZW1lbnQsXG4gICAgTm92b0xpc3RJdGVtRWxlbWVudCxcbiAgICBOb3ZvSXRlbUF2YXRhckVsZW1lbnQsXG4gICAgTm92b0l0ZW1UaXRsZUVsZW1lbnQsXG4gICAgTm92b0l0ZW1Db250ZW50RWxlbWVudCxcbiAgICBOb3ZvSXRlbUVuZEVsZW1lbnQsXG4gICAgTm92b0l0ZW1IZWFkZXJFbGVtZW50LFxuICAgIE5vdm9JdGVtRGF0ZUVsZW1lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvTGlzdEVsZW1lbnQsXG4gICAgTm92b0xpc3RJdGVtRWxlbWVudCxcbiAgICBOb3ZvSXRlbUF2YXRhckVsZW1lbnQsXG4gICAgTm92b0l0ZW1UaXRsZUVsZW1lbnQsXG4gICAgTm92b0l0ZW1IZWFkZXJFbGVtZW50LFxuICAgIE5vdm9JdGVtQ29udGVudEVsZW1lbnQsXG4gICAgTm92b0l0ZW1FbmRFbGVtZW50LFxuICAgIE5vdm9JdGVtRGF0ZUVsZW1lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9MaXN0TW9kdWxlIHt9XG4iXX0=