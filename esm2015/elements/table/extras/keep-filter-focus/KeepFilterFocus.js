// NG2
import { Directive, ElementRef } from '@angular/core';
export class NovoTableKeepFilterFocus {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        this.element.nativeElement.focus();
    }
}
NovoTableKeepFilterFocus.decorators = [
    { type: Directive, args: [{
                selector: '[keepFilterFocused]',
            },] }
];
NovoTableKeepFilterFocus.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2VlcEZpbHRlckZvY3VzLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy90YWJsZS9leHRyYXMva2VlcC1maWx0ZXItZm9jdXMvS2VlcEZpbHRlckZvY3VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFpQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLckUsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQyxZQUFvQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQUcsQ0FBQztJQUUzQyxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7O1lBUkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7YUFDaEM7OztZQUprQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdba2VlcEZpbHRlckZvY3VzZWRdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9UYWJsZUtlZXBGaWx0ZXJGb2N1cyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge31cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICB9XHJcbn1cclxuIl19