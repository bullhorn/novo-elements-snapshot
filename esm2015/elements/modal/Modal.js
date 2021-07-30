// NG2
import { Component, ViewContainerRef, ViewChild, Input, Output, EventEmitter, Injectable } from '@angular/core';
// APP
import { Deferred } from './../../utils/deferred/Deferred';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
export class NovoModalParams {
}
/**
 * Reference to an opened dialog.
 */
export class NovoModalRef {
    constructor() {
        this.component = null;
        this.contentRef = null;
        this.containerRef = null;
        this.isClosed = false;
        this._onClosed = Deferred();
    }
    // Gets a promise that is resolved when the dialog is closed.
    get onClosed() {
        return this._onClosed;
    }
    open() {
        document.body.classList.add('modal-open');
    }
    close(result) {
        document.body.classList.remove('modal-open');
        if (this.contentRef) {
            this.contentRef.destroy();
        }
        if (this.containerRef) {
            this.containerRef.destroy();
        }
        this._onClosed.resolve(result);
    }
}
NovoModalRef.decorators = [
    { type: Injectable }
];
export class NovoModalContainerElement {
    constructor(modalRef, componentUtils) {
        this.modalRef = modalRef;
        this.componentUtils = componentUtils;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.modalRef.contentRef = this.componentUtils.append(this.modalRef.component, this.container);
        });
    }
}
NovoModalContainerElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-modal-container',
                template: '<span #container></span>'
            },] }
];
NovoModalContainerElement.ctorParameters = () => [
    { type: NovoModalRef },
    { type: ComponentUtils }
];
NovoModalContainerElement.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }]
};
export class NovoModalElement {
    constructor(modalRef) {
        this.modalRef = modalRef;
    }
    close() {
        this.modalRef.close();
    }
}
NovoModalElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-modal',
                template: `
    <ng-content select="header"></ng-content>
    <ng-content select="section"></ng-content>
    <footer><ng-content select="button"></ng-content></footer>
  `
            },] }
];
NovoModalElement.ctorParameters = () => [
    { type: NovoModalRef }
];
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
NovoModalNotificationElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-notification',
                template: `
    <button class="modal-close" theme="icon" icon="times" (click)="close()"></button>
    <header><ng-content select="label"></ng-content></header>
    <section class="notification-body">
      <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
      <ng-content select="h1"></ng-content>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
    </section>
    <footer><ng-content select="button"></ng-content></footer>
  `
            },] }
];
NovoModalNotificationElement.ctorParameters = () => [
    { type: NovoModalRef }
];
NovoModalNotificationElement.propDecorators = {
    type: [{ type: Input }],
    icon: [{ type: Input }],
    cancel: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWwuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL21vZGFsL01vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQVUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZJLE1BQU07QUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBUzVFLE1BQU0sT0FBTyxlQUFlO0NBQTBCO0FBRXREOztHQUVHO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFEekI7UUFFRSxjQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLGVBQVUsR0FBUSxJQUFJLENBQUM7UUFDdkIsaUJBQVksR0FBUSxJQUFJLENBQUM7UUFDekIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixjQUFTLEdBQVEsUUFBUSxFQUFFLENBQUM7SUF3QjlCLENBQUM7SUF0QkMsNkRBQTZEO0lBQzdELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSTtRQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQVk7UUFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTdDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDN0I7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUE3QkYsVUFBVTs7QUFvQ1gsTUFBTSxPQUFPLHlCQUF5QjtJQUlwQyxZQUFvQixRQUFzQixFQUFVLGNBQThCO1FBQTlELGFBQVEsR0FBUixRQUFRLENBQWM7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBRyxDQUFDO0lBRXRGLGVBQWU7UUFDYixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pHLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBZEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSwwQkFBMEI7YUFDckM7OztZQUsrQixZQUFZO1lBdERuQyxjQUFjOzs7d0JBbURwQixTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOztBQW9CcEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUFvQixRQUFzQjtRQUF0QixhQUFRLEdBQVIsUUFBUSxDQUFjO0lBQUcsQ0FBQztJQUU5QyxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7WUFiRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7OztHQUlUO2FBQ0Y7OztZQUUrQixZQUFZOztBQXFCNUMsTUFBTSxPQUFPLDRCQUE0QjtJQVd2QyxZQUFvQixRQUFzQjtRQUF0QixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBSjFDLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUs3QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsUUFBUTtRQUNOLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQixLQUFLLFNBQVM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7Z0JBQzVCLE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtJQUNILENBQUM7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7YUFDRjs7O1lBWStCLFlBQVk7OzttQkFWekMsS0FBSzttQkFFTCxLQUFLO3FCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q29udGFpbmVyUmVmLCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBEZWZlcnJlZCB9IGZyb20gJy4vLi4vLi4vdXRpbHMvZGVmZXJyZWQvRGVmZXJyZWQnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRVdGlscyB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbXBvbmVudC11dGlscy9Db21wb25lbnRVdGlscyc7XHJcblxyXG4vKipcclxuICogUGFyYW1zIHRoYXQgY2FuIGJlIHBhc3NlZCB0byB0aGUgTW9kYWxcclxuICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsUGFyYW1zIHtcclxuICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcclxufVxyXG5leHBvcnQgY2xhc3MgTm92b01vZGFsUGFyYW1zIGltcGxlbWVudHMgTW9kYWxQYXJhbXMge31cclxuXHJcbi8qKlxyXG4gKiBSZWZlcmVuY2UgdG8gYW4gb3BlbmVkIGRpYWxvZy5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vdm9Nb2RhbFJlZiB7XHJcbiAgY29tcG9uZW50OiBhbnkgPSBudWxsO1xyXG4gIGNvbnRlbnRSZWY6IGFueSA9IG51bGw7XHJcbiAgY29udGFpbmVyUmVmOiBhbnkgPSBudWxsO1xyXG4gIGlzQ2xvc2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgX29uQ2xvc2VkOiBhbnkgPSBEZWZlcnJlZCgpO1xyXG5cclxuICAvLyBHZXRzIGEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIGRpYWxvZyBpcyBjbG9zZWQuXHJcbiAgZ2V0IG9uQ2xvc2VkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29uQ2xvc2VkO1xyXG4gIH1cclxuXHJcbiAgb3BlbigpIHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbW9kYWwtb3BlbicpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UocmVzdWx0PzogYW55KSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW9wZW4nKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb250ZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuY29udGVudFJlZi5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29udGFpbmVyUmVmKSB7XHJcbiAgICAgIHRoaXMuY29udGFpbmVyUmVmLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9vbkNsb3NlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tbW9kYWwtY29udGFpbmVyJyxcclxuICB0ZW1wbGF0ZTogJzxzcGFuICNjb250YWluZXI+PC9zcGFuPicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvTW9kYWxDb250YWluZXJFbGVtZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXHJcbiAgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsUmVmOiBOb3ZvTW9kYWxSZWYsIHByaXZhdGUgY29tcG9uZW50VXRpbHM6IENvbXBvbmVudFV0aWxzKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5tb2RhbFJlZi5jb250ZW50UmVmID0gdGhpcy5jb21wb25lbnRVdGlscy5hcHBlbmQodGhpcy5tb2RhbFJlZi5jb21wb25lbnQsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLW1vZGFsJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaGVhZGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwic2VjdGlvblwiPjwvbmctY29udGVudD5cclxuICAgIDxmb290ZXI+PG5nLWNvbnRlbnQgc2VsZWN0PVwiYnV0dG9uXCI+PC9uZy1jb250ZW50PjwvZm9vdGVyPlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvTW9kYWxFbGVtZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsUmVmOiBOb3ZvTW9kYWxSZWYpIHt9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5tb2RhbFJlZi5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLW5vdGlmaWNhdGlvbicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxidXR0b24gY2xhc3M9XCJtb2RhbC1jbG9zZVwiIHRoZW1lPVwiaWNvblwiIGljb249XCJ0aW1lc1wiIChjbGljayk9XCJjbG9zZSgpXCI+PC9idXR0b24+XHJcbiAgICA8aGVhZGVyPjxuZy1jb250ZW50IHNlbGVjdD1cImxhYmVsXCI+PC9uZy1jb250ZW50PjwvaGVhZGVyPlxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJub3RpZmljYXRpb24tYm9keVwiPlxyXG4gICAgICA8aSBjbGFzcz1cImluZGljYXRvclwiIFtuZ0NsYXNzXT1cImljb25UeXBlXCIgKm5nSWY9XCJpY29uVHlwZVwiPjwvaT5cclxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaDFcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImgyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwXCI+PC9uZy1jb250ZW50PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICAgPGZvb3Rlcj48bmctY29udGVudCBzZWxlY3Q9XCJidXR0b25cIj48L25nLWNvbnRlbnQ+PC9mb290ZXI+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9Nb2RhbE5vdGlmaWNhdGlvbkVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpXHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgaWNvbjogc3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBjYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBpY29uVHlwZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsUmVmOiBOb3ZvTW9kYWxSZWYpIHtcclxuICAgIHRoaXMubW9kYWxSZWYgPSBtb2RhbFJlZjtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xyXG4gICAgdGhpcy5tb2RhbFJlZi5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlICdzdWNjZXNzJzpcclxuICAgICAgICB0aGlzLmljb25UeXBlID0gJ2JoaS1jaGVjayc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxyXG4gICAgICAgIHRoaXMuaWNvblR5cGUgPSAnYmhpLWNhdXRpb24tbyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Vycm9yJzpcclxuICAgICAgICB0aGlzLmljb25UeXBlID0gJ2JoaS1jYXV0aW9uLW8nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjdXN0b20nOlxyXG4gICAgICAgIHRoaXMuaWNvblR5cGUgPSBgYmhpLSR7dGhpcy5pY29ufWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==