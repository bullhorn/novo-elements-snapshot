// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoItemAvatarElement, NovoItemContentElement, NovoItemDateElement, NovoItemEndElement, NovoItemHeaderElement, NovoItemTitleElement, NovoListElement, NovoListItemElement, } from './List';
export class NovoListModule {
}
NovoListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvbGlzdC9MaXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsTUFBTTtBQUNOLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsbUJBQW1CLEdBQ3BCLE1BQU0sUUFBUSxDQUFDO0FBeUJoQixNQUFNLE9BQU8sY0FBYzs7O1lBdkIxQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUU7b0JBQ1osZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLGtCQUFrQjtvQkFDbEIscUJBQXFCO29CQUNyQixtQkFBbUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIscUJBQXFCO29CQUNyQixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0QixrQkFBa0I7b0JBQ2xCLG1CQUFtQjtpQkFDcEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7XG4gIE5vdm9JdGVtQXZhdGFyRWxlbWVudCxcbiAgTm92b0l0ZW1Db250ZW50RWxlbWVudCxcbiAgTm92b0l0ZW1EYXRlRWxlbWVudCxcbiAgTm92b0l0ZW1FbmRFbGVtZW50LFxuICBOb3ZvSXRlbUhlYWRlckVsZW1lbnQsXG4gIE5vdm9JdGVtVGl0bGVFbGVtZW50LFxuICBOb3ZvTGlzdEVsZW1lbnQsXG4gIE5vdm9MaXN0SXRlbUVsZW1lbnQsXG59IGZyb20gJy4vTGlzdCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvTGlzdEVsZW1lbnQsXG4gICAgTm92b0xpc3RJdGVtRWxlbWVudCxcbiAgICBOb3ZvSXRlbUF2YXRhckVsZW1lbnQsXG4gICAgTm92b0l0ZW1UaXRsZUVsZW1lbnQsXG4gICAgTm92b0l0ZW1Db250ZW50RWxlbWVudCxcbiAgICBOb3ZvSXRlbUVuZEVsZW1lbnQsXG4gICAgTm92b0l0ZW1IZWFkZXJFbGVtZW50LFxuICAgIE5vdm9JdGVtRGF0ZUVsZW1lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvTGlzdEVsZW1lbnQsXG4gICAgTm92b0xpc3RJdGVtRWxlbWVudCxcbiAgICBOb3ZvSXRlbUF2YXRhckVsZW1lbnQsXG4gICAgTm92b0l0ZW1UaXRsZUVsZW1lbnQsXG4gICAgTm92b0l0ZW1IZWFkZXJFbGVtZW50LFxuICAgIE5vdm9JdGVtQ29udGVudEVsZW1lbnQsXG4gICAgTm92b0l0ZW1FbmRFbGVtZW50LFxuICAgIE5vdm9JdGVtRGF0ZUVsZW1lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9MaXN0TW9kdWxlIHt9XG4iXX0=