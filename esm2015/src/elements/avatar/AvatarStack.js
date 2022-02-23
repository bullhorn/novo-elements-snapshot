// NG2
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { NovoAvatarElement } from './Avatar';
export class NovoAvatarStackElement {
    constructor() {
        this.total = 0;
        this.showTotal = false;
        this.remainingCount = 0;
    }
    ngAfterViewInit() {
        // viewChildren is set
        if (this.total - this.viewChildren.length > 0) {
            this.remainingCount = this.total - this.viewChildren.length;
            this.showTotal = true;
        }
    }
}
NovoAvatarStackElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-avatar-stack',
                template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `,
                styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid #fff}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){display:none;margin-left:-15px;opacity:0;z-index:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}"]
            },] }
];
NovoAvatarStackElement.propDecorators = {
    total: [{ type: Input }],
    viewChildren: [{ type: ViewChildren, args: [NovoAvatarElement,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhdGFyU3RhY2suanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvYXZhdGFyL0F2YXRhclN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFVN0MsTUFBTSxPQUFPLHNCQUFzQjtJQVJuQztRQVVFLFVBQUssR0FBVyxDQUFDLENBQUM7UUFJbEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFXLENBQUMsQ0FBQztJQVE3QixDQUFDO0lBUEMsZUFBZTtRQUNiLHNCQUFzQjtRQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjtJQUNILENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFFN0IsUUFBUSxFQUFFOzs7R0FHVDs7YUFDRjs7O29CQUVFLEtBQUs7MkJBRUwsWUFBWSxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9BdmF0YXJFbGVtZW50IH0gZnJvbSAnLi9BdmF0YXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWF2YXRhci1zdGFjaycsXG4gIHN0eWxlVXJsczogWycuL0F2YXRhclN0YWNrLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5vdm8tYXZhdGFyICpuZ0lmPVwic2hvd1RvdGFsXCIgbGFiZWw9XCIrNVwiPjwvbm92by1hdmF0YXI+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BdmF0YXJTdGFja0VsZW1lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KClcbiAgdG90YWw6IG51bWJlciA9IDA7XG4gIEBWaWV3Q2hpbGRyZW4oTm92b0F2YXRhckVsZW1lbnQpXG4gIHZpZXdDaGlsZHJlbiE6IFF1ZXJ5TGlzdDxOb3ZvQXZhdGFyRWxlbWVudD47XG5cbiAgc2hvd1RvdGFsOiBib29sZWFuID0gZmFsc2U7XG4gIHJlbWFpbmluZ0NvdW50OiBudW1iZXIgPSAwO1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gdmlld0NoaWxkcmVuIGlzIHNldFxuICAgIGlmICh0aGlzLnRvdGFsIC0gdGhpcy52aWV3Q2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZW1haW5pbmdDb3VudCA9IHRoaXMudG90YWwgLSB0aGlzLnZpZXdDaGlsZHJlbi5sZW5ndGg7XG4gICAgICB0aGlzLnNob3dUb3RhbCA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=