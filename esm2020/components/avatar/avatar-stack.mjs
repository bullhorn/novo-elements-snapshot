// NG2
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { NovoAvatarElement } from './avatar';
import * as i0 from "@angular/core";
import * as i1 from "./avatar";
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
  `, isInline: true, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid var(--color-border)}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"], components: [{ type: i1.NovoAvatarElement, selector: "novo-avatar", inputs: ["source", "label", "theme", "image", "size", "shape", "color"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarStackElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar-stack', template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid var(--color-border)}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"] }]
        }], propDecorators: { total: [{
                type: Input
            }], viewChildren: [{
                type: ViewChildren,
                args: [NovoAvatarElement]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9hdmF0YXIvYXZhdGFyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7QUFVN0MsTUFBTSxPQUFPLHNCQUFzQjtJQVJuQztRQVVFLFVBQUssR0FBVyxDQUFDLENBQUM7UUFJbEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFXLENBQUMsQ0FBQztLQVE1QjtJQVBDLGVBQWU7UUFDYixzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDNUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDdkI7SUFDSCxDQUFDOztvSEFkVSxzQkFBc0I7d0dBQXRCLHNCQUFzQixzSEFHbkIsaUJBQWlCLGdEQVJyQjs7O0dBR1Q7NEZBRVUsc0JBQXNCO2tCQVJsQyxTQUFTOytCQUNFLG1CQUFtQixZQUVuQjs7O0dBR1Q7OEJBSUQsS0FBSztzQkFESixLQUFLO2dCQUdOLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgSW5wdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQXZhdGFyRWxlbWVudCB9IGZyb20gJy4vYXZhdGFyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hdmF0YXItc3RhY2snLFxuICBzdHlsZVVybHM6IFsnLi9hdmF0YXItc3RhY2suc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8bm92by1hdmF0YXIgKm5nSWY9XCJzaG93VG90YWxcIiBsYWJlbD1cIis1XCI+PC9ub3ZvLWF2YXRhcj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0F2YXRhclN0YWNrRWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKVxuICB0b3RhbDogbnVtYmVyID0gMDtcbiAgQFZpZXdDaGlsZHJlbihOb3ZvQXZhdGFyRWxlbWVudClcbiAgdmlld0NoaWxkcmVuITogUXVlcnlMaXN0PE5vdm9BdmF0YXJFbGVtZW50PjtcblxuICBzaG93VG90YWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVtYWluaW5nQ291bnQ6IG51bWJlciA9IDA7XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyB2aWV3Q2hpbGRyZW4gaXMgc2V0XG4gICAgaWYgKHRoaXMudG90YWwgLSB0aGlzLnZpZXdDaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnJlbWFpbmluZ0NvdW50ID0gdGhpcy50b3RhbCAtIHRoaXMudmlld0NoaWxkcmVuLmxlbmd0aDtcbiAgICAgIHRoaXMuc2hvd1RvdGFsID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==