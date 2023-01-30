// NG2
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { NovoAvatarElement } from './Avatar';
import * as i0 from "@angular/core";
import * as i1 from "./Avatar";
import * as i2 from "@angular/common";
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
NovoAvatarStackElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarStackElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAvatarStackElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAvatarStackElement, selector: "novo-avatar-stack", inputs: { total: "total" }, viewQueries: [{ propertyName: "viewChildren", predicate: NovoAvatarElement, descendants: true }], ngImport: i0, template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `, isInline: true, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid #ffffff}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"], components: [{ type: i1.NovoAvatarElement, selector: "novo-avatar", inputs: ["source", "label", "theme", "image", "size", "shape", "color"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarStackElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar-stack', template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid #ffffff}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"] }]
        }], propDecorators: { total: [{
                type: Input
            }], viewChildren: [{
                type: ViewChildren,
                args: [NovoAvatarElement]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhdGFyU3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9hdmF0YXIvQXZhdGFyU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBaUIsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQVU3QyxNQUFNLE9BQU8sc0JBQXNCO0lBUm5DO1FBVUUsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUlsQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0tBUTVCO0lBUEMsZUFBZTtRQUNiLHNCQUFzQjtRQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjtJQUNILENBQUM7O29IQWRVLHNCQUFzQjt3R0FBdEIsc0JBQXNCLHNIQUduQixpQkFBaUIsZ0RBUnJCOzs7R0FHVDs0RkFFVSxzQkFBc0I7a0JBUmxDLFNBQVM7K0JBQ0UsbUJBQW1CLFlBRW5COzs7R0FHVDs4QkFJRCxLQUFLO3NCQURKLEtBQUs7Z0JBR04sWUFBWTtzQkFEWCxZQUFZO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9BdmF0YXJFbGVtZW50IH0gZnJvbSAnLi9BdmF0YXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWF2YXRhci1zdGFjaycsXG4gIHN0eWxlVXJsczogWycuL0F2YXRhclN0YWNrLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5vdm8tYXZhdGFyICpuZ0lmPVwic2hvd1RvdGFsXCIgbGFiZWw9XCIrNVwiPjwvbm92by1hdmF0YXI+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BdmF0YXJTdGFja0VsZW1lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KClcbiAgdG90YWw6IG51bWJlciA9IDA7XG4gIEBWaWV3Q2hpbGRyZW4oTm92b0F2YXRhckVsZW1lbnQpXG4gIHZpZXdDaGlsZHJlbiE6IFF1ZXJ5TGlzdDxOb3ZvQXZhdGFyRWxlbWVudD47XG5cbiAgc2hvd1RvdGFsOiBib29sZWFuID0gZmFsc2U7XG4gIHJlbWFpbmluZ0NvdW50OiBudW1iZXIgPSAwO1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gdmlld0NoaWxkcmVuIGlzIHNldFxuICAgIGlmICh0aGlzLnRvdGFsIC0gdGhpcy52aWV3Q2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZW1haW5pbmdDb3VudCA9IHRoaXMudG90YWwgLSB0aGlzLnZpZXdDaGlsZHJlbi5sZW5ndGg7XG4gICAgICB0aGlzLnNob3dUb3RhbCA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=