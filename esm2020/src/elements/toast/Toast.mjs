// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Deferred } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "../button/Button";
import * as i3 from "@angular/common";
export class NovoToastElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.appearance = 'banner';
        this.theme = 'danger';
        this.icon = 'caution';
        this.hasDialogue = false;
        this.isCloseable = false;
        this.closed = new EventEmitter();
        this.show = false;
        this.animate = false;
        this.parent = null;
        this.launched = false;
        this.onActionPromise = Deferred();
    }
    set message(m) {
        this._message = this.sanitizer.bypassSecurityTrustHtml(m);
    }
    ngOnInit() {
        if (!this.launched) {
            // clear position and time
            this.position = null;
            this.time = null;
            // set icon and styling
            this.iconClass = `bhi-${this.icon}`;
            this.alertTheme = `${this.theme} toast-container embedded`;
            if (this.hasDialogue) {
                this.alertTheme += ' dialogue';
            }
        }
    }
    ngOnChanges(changes) {
        // set icon and styling
        this.iconClass = `bhi-${this.icon}`;
        this.alertTheme = `${this.theme} toast-container embedded`;
        if (this.hasDialogue) {
            this.alertTheme += ' dialogue';
        }
    }
    clickHandler(event) {
        if (!this.isCloseable) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            if (this.parent) {
                this.parent.hide(this);
            }
            else {
                this.closed.emit({ closed: true });
            }
        }
    }
    close(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (this.parent) {
            this.parent.hide(this);
        }
        else {
            this.closed.emit({ closed: true });
        }
    }
    actionHandler(event) {
        this.onActionPromise.resolve(event);
    }
    onAction(fn) {
        return this.onActionPromise.then(fn);
    }
}
NovoToastElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoToastElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoToastElement, selector: "novo-toast", inputs: { appearance: "appearance", theme: "theme", icon: "icon", title: "title", action: "action", hasDialogue: "hasDialogue", link: "link", isCloseable: "isCloseable", message: "message" }, outputs: { closed: "closed" }, host: { listeners: { "click": "!isCloseable && clickHandler($event)" }, properties: { "class": "alertTheme", "class.growl": "appearance == \"growl\"", "class.banner": "appearance == \"banner\"", "class.show": "show", "class.animate": "animate", "class.embedded": "embedded", "attr.theme": "theme" } }, usesOnChanges: true, ngImport: i0, template: `
    <div class="toast-icon">
      <i [ngClass]="iconClass"></i>
    </div>
    <div class="toast-content">
      <h5 *ngIf="title">{{ title }}</h5>
      <p *ngIf="_message" [class.message-only]="!title" [innerHtml]="_message"></p>
      <div *ngIf="link" class="link-generated">
        <input type="text" [value]="link" onfocus="this.select();" />
      </div>
      <div class="dialogue">
        <ng-content></ng-content>
      </div>
      <div *ngIf="action" class="action">
        <button theme="dialogue" color="white" (click)="actionHandler($event)">{{ action }}</button>
      </div>
    </div>
    <div class="close-icon" *ngIf="isCloseable" (click)="close($event)">
      <i class="bhi-times"></i>
    </div>
  `, isInline: true, components: [{ type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-toast',
                    host: {
                        '[class]': 'alertTheme',
                        '[class.growl]': 'appearance == "growl"',
                        '[class.banner]': 'appearance == "banner"',
                        '[class.show]': 'show',
                        '[class.animate]': 'animate',
                        '[class.embedded]': 'embedded',
                        '[attr.theme]': 'theme',
                        '(click)': '!isCloseable && clickHandler($event)',
                    },
                    template: `
    <div class="toast-icon">
      <i [ngClass]="iconClass"></i>
    </div>
    <div class="toast-content">
      <h5 *ngIf="title">{{ title }}</h5>
      <p *ngIf="_message" [class.message-only]="!title" [innerHtml]="_message"></p>
      <div *ngIf="link" class="link-generated">
        <input type="text" [value]="link" onfocus="this.select();" />
      </div>
      <div class="dialogue">
        <ng-content></ng-content>
      </div>
      <div *ngIf="action" class="action">
        <button theme="dialogue" color="white" (click)="actionHandler($event)">{{ action }}</button>
      </div>
    </div>
    <div class="close-icon" *ngIf="isCloseable" (click)="close($event)">
      <i class="bhi-times"></i>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; }, propDecorators: { appearance: [{
                type: Input
            }], theme: [{
                type: Input
            }], icon: [{
                type: Input
            }], title: [{
                type: Input
            }], action: [{
                type: Input
            }], hasDialogue: [{
                type: Input
            }], link: [{
                type: Input
            }], isCloseable: [{
                type: Input
            }], message: [{
                type: Input
            }], closed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90b2FzdC9Ub2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxZQUFZLEVBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFtQixNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFvQ3hELE1BQU0sT0FBTyxnQkFBZ0I7SUFvQzNCLFlBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFsQzNDLGVBQVUsR0FBdUIsUUFBUSxDQUFDO1FBRTFDLFVBQUssR0FBVyxRQUFRLENBQUM7UUFFekIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQU16QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUk3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU03QixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHL0MsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFdBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQU0xQixvQkFBZSxHQUFvQixRQUFRLEVBQUUsQ0FBQztJQUVBLENBQUM7SUFuQi9DLElBQ0ksT0FBTyxDQUFDLENBQVM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFrQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsUUFB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O3NCQURILEtBQUs7Z0JBR04sV0FBVztzQkFEVixLQUFLO2dCQUdGLE9BQU87c0JBRFYsS0FBSztnQkFLTixNQUFNO3NCQURMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRGVmZXJyZWQsIERlZmVycmVkUHJvbWlzZSB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10b2FzdCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6ICdhbGVydFRoZW1lJyxcbiAgICAnW2NsYXNzLmdyb3dsXSc6ICdhcHBlYXJhbmNlID09IFwiZ3Jvd2xcIicsXG4gICAgJ1tjbGFzcy5iYW5uZXJdJzogJ2FwcGVhcmFuY2UgPT0gXCJiYW5uZXJcIicsXG4gICAgJ1tjbGFzcy5zaG93XSc6ICdzaG93JyxcbiAgICAnW2NsYXNzLmFuaW1hdGVdJzogJ2FuaW1hdGUnLFxuICAgICdbY2xhc3MuZW1iZWRkZWRdJzogJ2VtYmVkZGVkJyxcbiAgICAnW2F0dHIudGhlbWVdJzogJ3RoZW1lJyxcbiAgICAnKGNsaWNrKSc6ICchaXNDbG9zZWFibGUgJiYgY2xpY2tIYW5kbGVyKCRldmVudCknLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1pY29uXCI+XG4gICAgICA8aSBbbmdDbGFzc109XCJpY29uQ2xhc3NcIj48L2k+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LWNvbnRlbnRcIj5cbiAgICAgIDxoNSAqbmdJZj1cInRpdGxlXCI+e3sgdGl0bGUgfX08L2g1PlxuICAgICAgPHAgKm5nSWY9XCJfbWVzc2FnZVwiIFtjbGFzcy5tZXNzYWdlLW9ubHldPVwiIXRpdGxlXCIgW2lubmVySHRtbF09XCJfbWVzc2FnZVwiPjwvcD5cbiAgICAgIDxkaXYgKm5nSWY9XCJsaW5rXCIgY2xhc3M9XCJsaW5rLWdlbmVyYXRlZFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbdmFsdWVdPVwibGlua1wiIG9uZm9jdXM9XCJ0aGlzLnNlbGVjdCgpO1wiIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2d1ZVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJhY3Rpb25cIiBjbGFzcz1cImFjdGlvblwiPlxuICAgICAgICA8YnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiBjb2xvcj1cIndoaXRlXCIgKGNsaWNrKT1cImFjdGlvbkhhbmRsZXIoJGV2ZW50KVwiPnt7IGFjdGlvbiB9fTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNsb3NlLWljb25cIiAqbmdJZj1cImlzQ2xvc2VhYmxlXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIj5cbiAgICAgIDxpIGNsYXNzPVwiYmhpLXRpbWVzXCI+PC9pPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVG9hc3RFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICBhcHBlYXJhbmNlOiAnZ3Jvd2wnIHwgJ2Jhbm5lcicgPSAnYmFubmVyJztcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZyA9ICdkYW5nZXInO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmcgPSAnY2F1dGlvbic7XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGFjdGlvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBoYXNEaWFsb2d1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBsaW5rOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGlzQ2xvc2VhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNldCBtZXNzYWdlKG06IHN0cmluZykge1xuICAgIHRoaXMuX21lc3NhZ2UgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtKTtcbiAgfVxuICBAT3V0cHV0KClcbiAgY2xvc2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfbWVzc2FnZTogU2FmZUh0bWw7XG4gIHNob3c6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYW5pbWF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwYXJlbnQ6IGFueSA9IG51bGw7XG4gIGxhdW5jaGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHBvc2l0aW9uOiBhbnk7XG4gIHRpbWU6IGFueTtcbiAgaWNvbkNsYXNzOiBzdHJpbmc7XG4gIGFsZXJ0VGhlbWU6IHN0cmluZztcbiAgZW1iZWRkZWQ6IGFueTtcbiAgb25BY3Rpb25Qcm9taXNlOiBEZWZlcnJlZFByb21pc2UgPSBEZWZlcnJlZCgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmxhdW5jaGVkKSB7XG4gICAgICAvLyBjbGVhciBwb3NpdGlvbiBhbmQgdGltZVxuICAgICAgdGhpcy5wb3NpdGlvbiA9IG51bGw7XG4gICAgICB0aGlzLnRpbWUgPSBudWxsO1xuXG4gICAgICAvLyBzZXQgaWNvbiBhbmQgc3R5bGluZ1xuICAgICAgdGhpcy5pY29uQ2xhc3MgPSBgYmhpLSR7dGhpcy5pY29ufWA7XG4gICAgICB0aGlzLmFsZXJ0VGhlbWUgPSBgJHt0aGlzLnRoZW1lfSB0b2FzdC1jb250YWluZXIgZW1iZWRkZWRgO1xuICAgICAgaWYgKHRoaXMuaGFzRGlhbG9ndWUpIHtcbiAgICAgICAgdGhpcy5hbGVydFRoZW1lICs9ICcgZGlhbG9ndWUnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gc2V0IGljb24gYW5kIHN0eWxpbmdcbiAgICB0aGlzLmljb25DbGFzcyA9IGBiaGktJHt0aGlzLmljb259YDtcbiAgICB0aGlzLmFsZXJ0VGhlbWUgPSBgJHt0aGlzLnRoZW1lfSB0b2FzdC1jb250YWluZXIgZW1iZWRkZWRgO1xuICAgIGlmICh0aGlzLmhhc0RpYWxvZ3VlKSB7XG4gICAgICB0aGlzLmFsZXJ0VGhlbWUgKz0gJyBkaWFsb2d1ZSc7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tIYW5kbGVyKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzQ2xvc2VhYmxlKSB7XG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuaGlkZSh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoeyBjbG9zZWQ6IHRydWUgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xvc2UoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5oaWRlKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlZC5lbWl0KHsgY2xvc2VkOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFjdGlvbkhhbmRsZXIoZXZlbnQpIHtcbiAgICB0aGlzLm9uQWN0aW9uUHJvbWlzZS5yZXNvbHZlKGV2ZW50KTtcbiAgfVxuXG4gIG9uQWN0aW9uKGZuOiAoKSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIHRoaXMub25BY3Rpb25Qcm9taXNlLnRoZW4oZm4pO1xuICB9XG59XG4iXX0=