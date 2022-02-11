// NG2
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { NovoAvatarElement } from './Avatar';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./Avatar";
function NovoAvatarStackElement_novo_avatar_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-avatar", 1);
} }
const _c0 = ["*"];
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
NovoAvatarStackElement.ɵfac = function NovoAvatarStackElement_Factory(t) { return new (t || NovoAvatarStackElement)(); };
NovoAvatarStackElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoAvatarStackElement, selectors: [["novo-avatar-stack"]], viewQuery: function NovoAvatarStackElement_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(NovoAvatarElement, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.viewChildren = _t);
    } }, inputs: { total: "total" }, ngContentSelectors: _c0, decls: 2, vars: 1, consts: [["label", "+5", 4, "ngIf"], ["label", "+5"]], template: function NovoAvatarStackElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
        i0.ɵɵtemplate(1, NovoAvatarStackElement_novo_avatar_1_Template, 1, 0, "novo-avatar", 0);
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showTotal);
    } }, directives: [i1.NgIf, i2.NovoAvatarElement], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{display:inline-flex;flex-flow:row nowrap}[_nghost-%COMP%]  novo-avatar{transition:all .1s ease-in-out}[_nghost-%COMP%]  novo-avatar img{border:1px solid #fff}[_nghost-%COMP%]  novo-avatar+novo-avatar{margin-left:-15px}[_nghost-%COMP%]  novo-avatar:first-child{z-index:5}[_nghost-%COMP%]  novo-avatar:nth-child(2){z-index:4}[_nghost-%COMP%]  novo-avatar:nth-child(3){z-index:3}[_nghost-%COMP%]  novo-avatar:nth-child(4){z-index:2}[_nghost-%COMP%]  novo-avatar:nth-child(5){z-index:1}[_nghost-%COMP%]  novo-avatar:nth-child(n+6){display:none;margin-left:-15px;opacity:0;z-index:0}[_nghost-%COMP%]:hover  novo-avatar{margin-left:0;margin-right:1px}[_nghost-%COMP%]:hover  novo-avatar:nth-child(n+6){display:unset;opacity:1}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoAvatarStackElement, [{
        type: Component,
        args: [{
                selector: 'novo-avatar-stack',
                styleUrls: ['./AvatarStack.scss'],
                template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `,
            }]
    }], null, { total: [{
            type: Input
        }], viewChildren: [{
            type: ViewChildren,
            args: [NovoAvatarElement]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhdGFyU3RhY2suanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvYXZhdGFyL0F2YXRhclN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7O0lBT3pDLGlDQUF3RDs7O0FBRzVELE1BQU0sT0FBTyxzQkFBc0I7SUFSbkM7UUFVRSxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBSWxCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsbUJBQWMsR0FBVyxDQUFDLENBQUM7S0FRNUI7SUFQQyxlQUFlO1FBQ2Isc0JBQXNCO1FBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7NEZBZFUsc0JBQXNCOzJEQUF0QixzQkFBc0I7dUJBR25CLGlCQUFpQjs7Ozs7O1FBUDdCLGtCQUFZO1FBQ1osdUZBQTBDOztRQUE3QixlQUFpQjtRQUFqQixvQ0FBaUI7O2tEQUdyQixzQkFBc0I7Y0FSbEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNqQyxRQUFRLEVBQUU7OztHQUdUO2FBQ0Y7Z0JBR0MsS0FBSztrQkFESixLQUFLO1lBR04sWUFBWTtrQkFEWCxZQUFZO21CQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9BdmF0YXJFbGVtZW50IH0gZnJvbSAnLi9BdmF0YXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWF2YXRhci1zdGFjaycsXG4gIHN0eWxlVXJsczogWycuL0F2YXRhclN0YWNrLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5vdm8tYXZhdGFyICpuZ0lmPVwic2hvd1RvdGFsXCIgbGFiZWw9XCIrNVwiPjwvbm92by1hdmF0YXI+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BdmF0YXJTdGFja0VsZW1lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KClcbiAgdG90YWw6IG51bWJlciA9IDA7XG4gIEBWaWV3Q2hpbGRyZW4oTm92b0F2YXRhckVsZW1lbnQpXG4gIHZpZXdDaGlsZHJlbiE6IFF1ZXJ5TGlzdDxOb3ZvQXZhdGFyRWxlbWVudD47XG5cbiAgc2hvd1RvdGFsOiBib29sZWFuID0gZmFsc2U7XG4gIHJlbWFpbmluZ0NvdW50OiBudW1iZXIgPSAwO1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gdmlld0NoaWxkcmVuIGlzIHNldFxuICAgIGlmICh0aGlzLnRvdGFsIC0gdGhpcy52aWV3Q2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZW1haW5pbmdDb3VudCA9IHRoaXMudG90YWwgLSB0aGlzLnZpZXdDaGlsZHJlbi5sZW5ndGg7XG4gICAgICB0aGlzLnNob3dUb3RhbCA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=