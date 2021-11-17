// NG2
import { Component, ContentChild, ElementRef, Input } from '@angular/core';
export class NovoListElement {
    constructor(element) {
        this.element = element;
    }
}
NovoListElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-list',
                host: {
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"',
                    '[attr.theme]': 'theme',
                },
                template: ` <ng-content></ng-content> `
            },] }
];
NovoListElement.ctorParameters = () => [
    { type: ElementRef }
];
NovoListElement.propDecorators = {
    theme: [{ type: Input }],
    direction: [{ type: Input }]
};
export class NovoItemAvatarElement {
    ngOnChanges(changes) {
        this.iconClass = this.icon ? `bhi-${this.icon}` : null;
        this.classMap = [this.iconClass, this.icon];
    }
    ngOnInit() {
        this.ngOnChanges();
    }
}
NovoItemAvatarElement.decorators = [
    { type: Component, args: [{
                selector: 'item-avatar',
                template: ` <i *ngIf="iconClass" [ngClass]="classMap" theme="contained"></i> `
            },] }
];
NovoItemAvatarElement.propDecorators = {
    icon: [{ type: Input }]
};
export class NovoItemTitleElement {
}
NovoItemTitleElement.decorators = [
    { type: Component, args: [{
                selector: 'item-title',
                template: ` <h6><ng-content></ng-content></h6> `
            },] }
];
export class NovoItemHeaderElement {
}
NovoItemHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'item-header',
                template: `
    <ng-content select="item-avatar"></ng-content>
    <ng-content select="item-title"></ng-content>
    <ng-content select="item-header-end"></ng-content>
  `
            },] }
];
export class NovoItemDateElement {
}
NovoItemDateElement.decorators = [
    { type: Component, args: [{
                selector: 'item-header-end',
                template: ` <ng-content></ng-content> `
            },] }
];
export class NovoItemContentElement {
}
NovoItemContentElement.decorators = [
    { type: Component, args: [{
                selector: 'item-content',
                host: {
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"',
                },
                template: ` <ng-content></ng-content> `
            },] }
];
NovoItemContentElement.propDecorators = {
    direction: [{ type: Input }]
};
export class NovoItemEndElement {
}
NovoItemEndElement.decorators = [
    { type: Component, args: [{
                selector: 'item-end',
                template: ` <ng-content></ng-content> `
            },] }
];
export class NovoListItemElement {
    constructor(element) {
        this.element = element;
        this.avatar = false;
    }
    ngOnInit() {
        this.avatar = !!this.element.nativeElement.querySelector('item-avatar');
    }
}
NovoListItemElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-list-item, a[list-item], button[list-item]',
                template: `
    <div class="list-item" [ngClass]="{ avatar: avatar }" *ngIf="_content || _header">
      <ng-content select="item-header"></ng-content>
      <ng-content select="item-content"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="item-end"></ng-content>
  `
            },] }
];
NovoListItemElement.ctorParameters = () => [
    { type: ElementRef }
];
NovoListItemElement.propDecorators = {
    _content: [{ type: ContentChild, args: [NovoItemContentElement,] }],
    _header: [{ type: ContentChild, args: [NovoItemHeaderElement,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9saXN0L0xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBVzdHLE1BQU0sT0FBTyxlQUFlO0lBTTFCLFlBQW1CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFBRyxDQUFDOzs7WUFmM0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixJQUFJLEVBQUU7b0JBQ0osdUJBQXVCLEVBQUUsMEJBQTBCO29CQUNuRCx5QkFBeUIsRUFBRSw0QkFBNEI7b0JBQ3ZELGNBQWMsRUFBRSxPQUFPO2lCQUN4QjtnQkFDRCxRQUFRLEVBQUUsNkJBQTZCO2FBQ3hDOzs7WUFWaUMsVUFBVTs7O29CQVl6QyxLQUFLO3dCQUVMLEtBQUs7O0FBVVIsTUFBTSxPQUFPLHFCQUFxQjtJQU9oQyxXQUFXLENBQUMsT0FBdUI7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7WUFsQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsb0VBQW9FO2FBQy9FOzs7bUJBRUUsS0FBSzs7QUFvQlIsTUFBTSxPQUFPLG9CQUFvQjs7O1lBSmhDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFLHNDQUFzQzthQUNqRDs7QUFXRCxNQUFNLE9BQU8scUJBQXFCOzs7WUFSakMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7R0FJVDthQUNGOztBQU9ELE1BQU0sT0FBTyxtQkFBbUI7OztZQUovQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLDZCQUE2QjthQUN4Qzs7QUFXRCxNQUFNLE9BQU8sc0JBQXNCOzs7WUFSbEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixJQUFJLEVBQUU7b0JBQ0osdUJBQXVCLEVBQUUsMEJBQTBCO29CQUNuRCx5QkFBeUIsRUFBRSw0QkFBNEI7aUJBQ3hEO2dCQUNELFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7Ozt3QkFFRSxLQUFLOztBQVFSLE1BQU0sT0FBTyxrQkFBa0I7OztZQUo5QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7O0FBY0QsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixZQUFvQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBSnZDLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFJa0IsQ0FBQztJQUUzQyxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7OztZQXBCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlEQUFpRDtnQkFDM0QsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7YUFDRjs7O1lBNUZpQyxVQUFVOzs7dUJBK0Z6QyxZQUFZLFNBQUMsc0JBQXNCO3NCQUNuQyxZQUFZLFNBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbGlzdCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnZlcnRpY2FsLWxpc3RdJzogJ2RpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJyxcbiAgICAnW2NsYXNzLmhvcml6b250YWwtbGlzdF0nOiAnZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgJ1thdHRyLnRoZW1lXSc6ICd0aGVtZScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0xpc3RFbGVtZW50IHtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgZGlyZWN0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0ZW0tYXZhdGFyJyxcbiAgdGVtcGxhdGU6IGAgPGkgKm5nSWY9XCJpY29uQ2xhc3NcIiBbbmdDbGFzc109XCJjbGFzc01hcFwiIHRoZW1lPVwiY29udGFpbmVkXCI+PC9pPiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbUF2YXRhckVsZW1lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcblxuICBpY29uQ2xhc3M6IHN0cmluZztcbiAgY2xhc3NNYXA6IGFueTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuaWNvbkNsYXNzID0gdGhpcy5pY29uID8gYGJoaS0ke3RoaXMuaWNvbn1gIDogbnVsbDtcbiAgICB0aGlzLmNsYXNzTWFwID0gW3RoaXMuaWNvbkNsYXNzLCB0aGlzLmljb25dO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0ZW0tdGl0bGUnLFxuICB0ZW1wbGF0ZTogYCA8aDY+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvaDY+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtVGl0bGVFbGVtZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0ZW0taGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWF2YXRhclwiPjwvbmctY29udGVudD5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0taGVhZGVyLWVuZFwiPjwvbmctY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1IZWFkZXJFbGVtZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0ZW0taGVhZGVyLWVuZCcsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1EYXRlRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWNvbnRlbnQnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy52ZXJ0aWNhbC1saXN0XSc6ICdkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIicsXG4gICAgJ1tjbGFzcy5ob3Jpem9udGFsLWxpc3RdJzogJ2RpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCInLFxuICB9LFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtQ29udGVudEVsZW1lbnQge1xuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS1lbmQnLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtRW5kRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWxpc3QtaXRlbSwgYVtsaXN0LWl0ZW1dLCBidXR0b25bbGlzdC1pdGVtXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiIFtuZ0NsYXNzXT1cInsgYXZhdGFyOiBhdmF0YXIgfVwiICpuZ0lmPVwiX2NvbnRlbnQgfHwgX2hlYWRlclwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0tZW5kXCI+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGlzdEl0ZW1FbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgYXZhdGFyOiBib29sZWFuID0gZmFsc2U7XG4gIEBDb250ZW50Q2hpbGQoTm92b0l0ZW1Db250ZW50RWxlbWVudCkgX2NvbnRlbnQ6IE5vdm9JdGVtQ29udGVudEVsZW1lbnQ7XG4gIEBDb250ZW50Q2hpbGQoTm92b0l0ZW1IZWFkZXJFbGVtZW50KSBfaGVhZGVyOiBOb3ZvSXRlbUhlYWRlckVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXZhdGFyID0gISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpdGVtLWF2YXRhcicpO1xuICB9XG59XG4iXX0=