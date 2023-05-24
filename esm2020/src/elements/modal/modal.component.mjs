// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import * as i0 from "@angular/core";
import * as i1 from "./modal-ref";
import * as i2 from "../button/Button";
import * as i3 from "@angular/common";
export class NovoModalElement {
    constructor(modalRef) {
        this.modalRef = modalRef;
    }
}
NovoModalElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalElement, deps: [{ token: i1.NovoModalRef }], target: i0.ɵɵFactoryTarget.Component });
NovoModalElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoModalElement, selector: "novo-modal", host: { classAttribute: "novo-modal" }, ngImport: i0, template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer class="novo-modal-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-modal',
                    template: `
    <ng-content select="header,novo-header,novo-card-header"></ng-content>
    <ng-content select="section,novo-card-content"></ng-content>
    <footer class="novo-modal-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `,
                    host: {
                        class: 'novo-modal',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoModalRef }]; } });
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
NovoModalNotificationElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalNotificationElement, deps: [{ token: i1.NovoModalRef }], target: i0.ɵɵFactoryTarget.Component });
NovoModalNotificationElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoModalNotificationElement, selector: "novo-notification", inputs: { type: "type", icon: "icon" }, outputs: { cancel: "cancel" }, host: { classAttribute: "novo-notification" }, ngImport: i0, template: `
    <novo-button class="modal-close" theme="icon" icon="x" (click)="close()"></novo-button>
    <header class="novo-notification-header"><ng-content select="label,novo-label"></ng-content></header>
    <section class="novo-notification-body notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer class="novo-notification-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `, isInline: true, components: [{ type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalNotificationElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-notification',
                    template: `
    <novo-button class="modal-close" theme="icon" icon="x" (click)="close()"></novo-button>
    <header class="novo-notification-header"><ng-content select="label,novo-label"></ng-content></header>
    <section class="novo-notification-body notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer class="novo-notification-footer"><ng-content select="button,novo-button"></ng-content></footer>
  `,
                    host: {
                        class: 'novo-notification',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoModalRef }]; }, propDecorators: { type: [{
                type: Input
            }], icon: [{
                type: Input
            }], cancel: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvbW9kYWwvbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0FBYTNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBb0IsUUFBc0I7UUFBdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztJQUFHLENBQUM7OzhHQURuQyxnQkFBZ0I7a0dBQWhCLGdCQUFnQiwwRkFUakI7Ozs7R0FJVDs0RkFLVSxnQkFBZ0I7a0JBWDVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRTs7OztHQUlUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsWUFBWTtxQkFDcEI7aUJBQ0Y7O0FBc0JELE1BQU0sT0FBTyw0QkFBNEI7SUFXdkMsWUFBb0IsUUFBc0I7UUFBdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUoxQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFFBQVE7UUFDTixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakIsS0FBSyxTQUFTO2dCQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO2dCQUM1QixNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDO2dCQUNoQyxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDO2dCQUNoQyxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ25DLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7SUFDSCxDQUFDOzswSEFyQ1UsNEJBQTRCOzhHQUE1Qiw0QkFBNEIsK0tBZjdCOzs7Ozs7Ozs7O0dBVVQ7NEZBS1UsNEJBQTRCO2tCQWpCeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7R0FVVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtxQkFDM0I7aUJBQ0Y7bUdBR0MsSUFBSTtzQkFESCxLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFJTixNQUFNO3NCQURMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Nb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1tb2RhbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaGVhZGVyLG5vdm8taGVhZGVyLG5vdm8tY2FyZC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwic2VjdGlvbixub3ZvLWNhcmQtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICA8Zm9vdGVyIGNsYXNzPVwibm92by1tb2RhbC1mb290ZXJcIj48bmctY29udGVudCBzZWxlY3Q9XCJidXR0b24sbm92by1idXR0b25cIj48L25nLWNvbnRlbnQ+PC9mb290ZXI+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tbW9kYWwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTW9kYWxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFJlZjogTm92b01vZGFsUmVmKSB7fVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW5vdGlmaWNhdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tYnV0dG9uIGNsYXNzPVwibW9kYWwtY2xvc2VcIiB0aGVtZT1cImljb25cIiBpY29uPVwieFwiIChjbGljayk9XCJjbG9zZSgpXCI+PC9ub3ZvLWJ1dHRvbj5cbiAgICA8aGVhZGVyIGNsYXNzPVwibm92by1ub3RpZmljYXRpb24taGVhZGVyXCI+PG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWwsbm92by1sYWJlbFwiPjwvbmctY29udGVudD48L2hlYWRlcj5cbiAgICA8c2VjdGlvbiBjbGFzcz1cIm5vdm8tbm90aWZpY2F0aW9uLWJvZHkgbm90aWZpY2F0aW9uLWJvZHlcIj5cbiAgICAgIDxpIGNsYXNzPVwiaW5kaWNhdG9yXCIgW25nQ2xhc3NdPVwiaWNvblR5cGVcIiAqbmdJZj1cImljb25UeXBlXCI+PC9pPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaDFcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJoMlwiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInBcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxmb290ZXIgY2xhc3M9XCJub3ZvLW5vdGlmaWNhdGlvbi1mb290ZXJcIj48bmctY29udGVudCBzZWxlY3Q9XCJidXR0b24sbm92by1idXR0b25cIj48L25nLWNvbnRlbnQ+PC9mb290ZXI+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tbm90aWZpY2F0aW9uJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b01vZGFsTm90aWZpY2F0aW9uRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHR5cGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBjYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGljb25UeXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFJlZjogTm92b01vZGFsUmVmKSB7XG4gICAgdGhpcy5tb2RhbFJlZiA9IG1vZGFsUmVmO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xuICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgdGhpcy5pY29uVHlwZSA9ICdiaGktY2hlY2snO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICB0aGlzLmljb25UeXBlID0gJ2JoaS1jYXV0aW9uLW8nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgdGhpcy5pY29uVHlwZSA9ICdiaGktY2F1dGlvbi1vJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICB0aGlzLmljb25UeXBlID0gYGJoaS0ke3RoaXMuaWNvbn1gO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19