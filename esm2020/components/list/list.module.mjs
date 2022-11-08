// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoItemAvatarElement, NovoItemContentElement, NovoItemDateElement, NovoItemEndElement, NovoItemHeaderElement, NovoItemTitleElement, NovoListElement, NovoListItemElement, } from './list';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoCommonModule } from 'novo-elements/common';
import * as i0 from "@angular/core";
export class NovoListModule {
}
NovoListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListModule, declarations: [NovoListElement,
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
NovoListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListModule, imports: [[CommonModule, NovoCommonModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2xpc3QvbGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsbUJBQW1CLEdBQ3BCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUF5QnhELE1BQU0sT0FBTyxjQUFjOzs0R0FBZCxjQUFjOzZHQUFkLGNBQWMsaUJBcEJ2QixlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIsc0JBQXNCO1FBQ3RCLGtCQUFrQjtRQUNsQixxQkFBcUI7UUFDckIsbUJBQW1CLGFBVFgsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsYUFZdEQsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsa0JBQWtCO1FBQ2xCLG1CQUFtQjs2R0FHVixjQUFjLFlBdEJoQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7NEZBc0I5QyxjQUFjO2tCQXZCMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO29CQUN6RCxZQUFZLEVBQUU7d0JBQ1osZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsb0JBQW9CO3dCQUNwQixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIscUJBQXFCO3dCQUNyQixtQkFBbUI7cUJBQ3BCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIscUJBQXFCO3dCQUNyQixvQkFBb0I7d0JBQ3BCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0QixrQkFBa0I7d0JBQ2xCLG1CQUFtQjtxQkFDcEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTm92b0l0ZW1BdmF0YXJFbGVtZW50LFxuICBOb3ZvSXRlbUNvbnRlbnRFbGVtZW50LFxuICBOb3ZvSXRlbURhdGVFbGVtZW50LFxuICBOb3ZvSXRlbUVuZEVsZW1lbnQsXG4gIE5vdm9JdGVtSGVhZGVyRWxlbWVudCxcbiAgTm92b0l0ZW1UaXRsZUVsZW1lbnQsXG4gIE5vdm9MaXN0RWxlbWVudCxcbiAgTm92b0xpc3RJdGVtRWxlbWVudCxcbn0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2ljb24nO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0NvbW1vbk1vZHVsZSwgTm92b0ljb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvTGlzdEVsZW1lbnQsXG4gICAgTm92b0xpc3RJdGVtRWxlbWVudCxcbiAgICBOb3ZvSXRlbUF2YXRhckVsZW1lbnQsXG4gICAgTm92b0l0ZW1UaXRsZUVsZW1lbnQsXG4gICAgTm92b0l0ZW1Db250ZW50RWxlbWVudCxcbiAgICBOb3ZvSXRlbUVuZEVsZW1lbnQsXG4gICAgTm92b0l0ZW1IZWFkZXJFbGVtZW50LFxuICAgIE5vdm9JdGVtRGF0ZUVsZW1lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvTGlzdEVsZW1lbnQsXG4gICAgTm92b0xpc3RJdGVtRWxlbWVudCxcbiAgICBOb3ZvSXRlbUF2YXRhckVsZW1lbnQsXG4gICAgTm92b0l0ZW1UaXRsZUVsZW1lbnQsXG4gICAgTm92b0l0ZW1IZWFkZXJFbGVtZW50LFxuICAgIE5vdm9JdGVtQ29udGVudEVsZW1lbnQsXG4gICAgTm92b0l0ZW1FbmRFbGVtZW50LFxuICAgIE5vdm9JdGVtRGF0ZUVsZW1lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9MaXN0TW9kdWxlIHt9XG4iXX0=