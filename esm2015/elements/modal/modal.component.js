// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import * as i0 from "@angular/core";
import * as i1 from "./modal-ref";
import * as i2 from "../button/Button";
import * as i3 from "@angular/common";
const _c0 = [[["header"]], [["section"]], [["button"]]];
const _c1 = ["header", "section", "button"];
function NovoModalNotificationElement_i_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r0.iconType);
} }
const _c2 = [[["label"]], [["h1"]], [["h2"]], [["p"]], [["button"]]];
const _c3 = ["label", "h1", "h2", "p", "button"];
export class NovoModalElement {
    constructor(modalRef) {
        this.modalRef = modalRef;
    }
}
NovoModalElement.ɵfac = function NovoModalElement_Factory(t) { return new (t || NovoModalElement)(i0.ɵɵdirectiveInject(i1.NovoModalRef)); };
NovoModalElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoModalElement, selectors: [["novo-modal"]], ngContentSelectors: _c1, decls: 4, vars: 0, template: function NovoModalElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵprojection(0);
        i0.ɵɵprojection(1, 1);
        i0.ɵɵelementStart(2, "footer");
        i0.ɵɵprojection(3, 2);
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoModalElement, [{
        type: Component,
        args: [{
                selector: 'novo-modal',
                template: `
    <ng-content select="header"></ng-content>
    <ng-content select="section"></ng-content>
    <footer><ng-content select="button"></ng-content></footer>
  `,
            }]
    }], function () { return [{ type: i1.NovoModalRef }]; }, null); })();
export class NovoModalNotificationElement {
    constructor(modalRef) {
        this.modalRef = modalRef;
        this.cancel = new EventEmitter();
        this.modalRef = modalRef;
    }
    close() {
        this.cancel.emit();
        this.modalRef.close();
    }
    ngOnInit() {
        switch (this.type) {
            case 'success':
                this.iconType = 'bhi-check';
                break;
            case 'warning':
                this.iconType = 'bhi-caution-o';
                break;
            case 'error':
                this.iconType = 'bhi-caution-o';
                break;
            case 'custom':
                this.iconType = `bhi-${this.icon}`;
                break;
            default:
                break;
        }
    }
}
NovoModalNotificationElement.ɵfac = function NovoModalNotificationElement_Factory(t) { return new (t || NovoModalNotificationElement)(i0.ɵɵdirectiveInject(i1.NovoModalRef)); };
NovoModalNotificationElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoModalNotificationElement, selectors: [["novo-notification"]], inputs: { type: "type", icon: "icon" }, outputs: { cancel: "cancel" }, ngContentSelectors: _c3, decls: 10, vars: 1, consts: [["theme", "icon", "icon", "x", 1, "modal-close", 3, "click"], [1, "notification-body"], ["class", "indicator", 3, "ngClass", 4, "ngIf"], [1, "indicator", 3, "ngClass"]], template: function NovoModalNotificationElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c2);
        i0.ɵɵelementStart(0, "button", 0);
        i0.ɵɵlistener("click", function NovoModalNotificationElement_Template_button_click_0_listener() { return ctx.close(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(1, "header");
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "section", 1);
        i0.ɵɵtemplate(4, NovoModalNotificationElement_i_4_Template, 1, 1, "i", 2);
        i0.ɵɵprojection(5, 1);
        i0.ɵɵprojection(6, 2);
        i0.ɵɵprojection(7, 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "footer");
        i0.ɵɵprojection(9, 4);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.iconType);
    } }, directives: [i2.NovoButtonElement, i3.NgIf, i3.NgClass], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoModalNotificationElement, [{
        type: Component,
        args: [{
                selector: 'novo-notification',
                template: `
    <button class="modal-close" theme="icon" icon="x" (click)="close()"></button>
    <header><ng-content select="label"></ng-content></header>
    <section class="notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer><ng-content select="button"></ng-content></footer>
  `,
            }]
    }], function () { return [{ type: i1.NovoModalRef }]; }, { type: [{
            type: Input
        }], icon: [{
            type: Input
        }], cancel: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL21vZGFsL21vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7OztJQW9CckMsdUJBQStEOzs7SUFBMUMseUNBQW9COzs7O0FBVi9DLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBb0IsUUFBc0I7UUFBdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztJQUFHLENBQUM7O2dGQURuQyxnQkFBZ0I7cURBQWhCLGdCQUFnQjs7UUFMekIsa0JBQTRCO1FBQzVCLHFCQUE2QjtRQUM3Qiw4QkFBUTtRQUFBLHFCQUE0QjtRQUFhLGlCQUFTOztrREFHakQsZ0JBQWdCO2NBUjVCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7O0dBSVQ7YUFDRjs7QUFtQkQsTUFBTSxPQUFPLDRCQUE0QjtJQVd2QyxZQUFvQixRQUFzQjtRQUF0QixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBSjFDLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUs3QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsUUFBUTtRQUNOLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQixLQUFLLFNBQVM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7Z0JBQzVCLE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtJQUNILENBQUM7O3dHQXJDVSw0QkFBNEI7aUVBQTVCLDRCQUE0Qjs7UUFYckMsaUNBQTZFO1FBQTNCLHlHQUFTLFdBQU8sSUFBQztRQUFDLGlCQUFTO1FBQzdFLDhCQUFRO1FBQUEsa0JBQTJCO1FBQWEsaUJBQVM7UUFDekQsa0NBQ0U7UUFBQSx5RUFBMkQ7UUFDM0QscUJBQXdCO1FBQ3hCLHFCQUF3QjtRQUN4QixxQkFBdUI7UUFDekIsaUJBQVU7UUFDViw4QkFBUTtRQUFBLHFCQUE0QjtRQUFhLGlCQUFTOztRQUxkLGVBQWdCO1FBQWhCLG1DQUFnQjs7a0RBUW5ELDRCQUE0QjtjQWR4QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7YUFDRjsrREFHQyxJQUFJO2tCQURILEtBQUs7WUFHTixJQUFJO2tCQURILEtBQUs7WUFJTixNQUFNO2tCQURMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Nb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1tb2RhbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInNlY3Rpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgPGZvb3Rlcj48bmctY29udGVudCBzZWxlY3Q9XCJidXR0b25cIj48L25nLWNvbnRlbnQ+PC9mb290ZXI+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Nb2RhbEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsUmVmOiBOb3ZvTW9kYWxSZWYpIHt9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbm90aWZpY2F0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uIGNsYXNzPVwibW9kYWwtY2xvc2VcIiB0aGVtZT1cImljb25cIiBpY29uPVwieFwiIChjbGljayk9XCJjbG9zZSgpXCI+PC9idXR0b24+XG4gICAgPGhlYWRlcj48bmctY29udGVudCBzZWxlY3Q9XCJsYWJlbFwiPjwvbmctY29udGVudD48L2hlYWRlcj5cbiAgICA8c2VjdGlvbiBjbGFzcz1cIm5vdGlmaWNhdGlvbi1ib2R5XCI+XG4gICAgICA8aSBjbGFzcz1cImluZGljYXRvclwiIFtuZ0NsYXNzXT1cImljb25UeXBlXCIgKm5nSWY9XCJpY29uVHlwZVwiPjwvaT5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImgxXCI+PC9uZy1jb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaDJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwXCI+PC9uZy1jb250ZW50PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8Zm9vdGVyPjxuZy1jb250ZW50IHNlbGVjdD1cImJ1dHRvblwiPjwvbmctY29udGVudD48L2Zvb3Rlcj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b01vZGFsTm90aWZpY2F0aW9uRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHR5cGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBjYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGljb25UeXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFJlZjogTm92b01vZGFsUmVmKSB7XG4gICAgdGhpcy5tb2RhbFJlZiA9IG1vZGFsUmVmO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xuICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgdGhpcy5pY29uVHlwZSA9ICdiaGktY2hlY2snO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICB0aGlzLmljb25UeXBlID0gJ2JoaS1jYXV0aW9uLW8nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgdGhpcy5pY29uVHlwZSA9ICdiaGktY2F1dGlvbi1vJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICB0aGlzLmljb25UeXBlID0gYGJoaS0ke3RoaXMuaWNvbn1gO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19