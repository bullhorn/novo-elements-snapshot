// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Deferred } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "novo-elements/elements/button";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90b2FzdC9Ub2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxZQUFZLEVBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFtQixNQUFNLHFCQUFxQixDQUFDOzs7OztBQW9DaEUsTUFBTSxPQUFPLGdCQUFnQjtJQW9DM0IsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQWxDM0MsZUFBVSxHQUF1QixRQUFRLENBQUM7UUFFMUMsVUFBSyxHQUFXLFFBQVEsQ0FBQztRQUV6QixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBTXpCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBSTdCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBTTdCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUcvQyxTQUFJLEdBQVksS0FBSyxDQUFDO1FBQ3RCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsV0FBTSxHQUFRLElBQUksQ0FBQztRQUNuQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBTTFCLG9CQUFlLEdBQW9CLFFBQVEsRUFBRSxDQUFDO0lBRUEsQ0FBQztJQW5CL0MsSUFDSSxPQUFPLENBQUMsQ0FBUztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQWtCRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxRQUFR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c0JBREgsS0FBSztnQkFHTixXQUFXO3NCQURWLEtBQUs7Z0JBR0YsT0FBTztzQkFEVixLQUFLO2dCQUtOLE1BQU07c0JBREwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBEZWZlcnJlZCwgRGVmZXJyZWRQcm9taXNlIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdG9hc3QnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnYWxlcnRUaGVtZScsXG4gICAgJ1tjbGFzcy5ncm93bF0nOiAnYXBwZWFyYW5jZSA9PSBcImdyb3dsXCInLFxuICAgICdbY2xhc3MuYmFubmVyXSc6ICdhcHBlYXJhbmNlID09IFwiYmFubmVyXCInLFxuICAgICdbY2xhc3Muc2hvd10nOiAnc2hvdycsXG4gICAgJ1tjbGFzcy5hbmltYXRlXSc6ICdhbmltYXRlJyxcbiAgICAnW2NsYXNzLmVtYmVkZGVkXSc6ICdlbWJlZGRlZCcsXG4gICAgJ1thdHRyLnRoZW1lXSc6ICd0aGVtZScsXG4gICAgJyhjbGljayknOiAnIWlzQ2xvc2VhYmxlICYmIGNsaWNrSGFuZGxlcigkZXZlbnQpJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidG9hc3QtaWNvblwiPlxuICAgICAgPGkgW25nQ2xhc3NdPVwiaWNvbkNsYXNzXCI+PC9pPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1jb250ZW50XCI+XG4gICAgICA8aDUgKm5nSWY9XCJ0aXRsZVwiPnt7IHRpdGxlIH19PC9oNT5cbiAgICAgIDxwICpuZ0lmPVwiX21lc3NhZ2VcIiBbY2xhc3MubWVzc2FnZS1vbmx5XT1cIiF0aXRsZVwiIFtpbm5lckh0bWxdPVwiX21lc3NhZ2VcIj48L3A+XG4gICAgICA8ZGl2ICpuZ0lmPVwibGlua1wiIGNsYXNzPVwibGluay1nZW5lcmF0ZWRcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW3ZhbHVlXT1cImxpbmtcIiBvbmZvY3VzPVwidGhpcy5zZWxlY3QoKTtcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9ndWVcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwiYWN0aW9uXCIgY2xhc3M9XCJhY3Rpb25cIj5cbiAgICAgICAgPGJ1dHRvbiB0aGVtZT1cImRpYWxvZ3VlXCIgY29sb3I9XCJ3aGl0ZVwiIChjbGljayk9XCJhY3Rpb25IYW5kbGVyKCRldmVudClcIj57eyBhY3Rpb24gfX08L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1pY29uXCIgKm5nSWY9XCJpc0Nsb3NlYWJsZVwiIChjbGljayk9XCJjbG9zZSgkZXZlbnQpXCI+XG4gICAgICA8aSBjbGFzcz1cImJoaS10aW1lc1wiPjwvaT5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RvYXN0RWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgYXBwZWFyYW5jZTogJ2dyb3dsJyB8ICdiYW5uZXInID0gJ2Jhbm5lcic7XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmcgPSAnZGFuZ2VyJztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nID0gJ2NhdXRpb24nO1xuICBASW5wdXQoKVxuICB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBhY3Rpb246IHN0cmluZztcbiAgQElucHV0KClcbiAgaGFzRGlhbG9ndWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgbGluazogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpc0Nsb3NlYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzZXQgbWVzc2FnZShtOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tZXNzYWdlID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobSk7XG4gIH1cbiAgQE91dHB1dCgpXG4gIGNsb3NlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX21lc3NhZ2U6IFNhZmVIdG1sO1xuICBzaG93OiBib29sZWFuID0gZmFsc2U7XG4gIGFuaW1hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcGFyZW50OiBhbnkgPSBudWxsO1xuICBsYXVuY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwb3NpdGlvbjogYW55O1xuICB0aW1lOiBhbnk7XG4gIGljb25DbGFzczogc3RyaW5nO1xuICBhbGVydFRoZW1lOiBzdHJpbmc7XG4gIGVtYmVkZGVkOiBhbnk7XG4gIG9uQWN0aW9uUHJvbWlzZTogRGVmZXJyZWRQcm9taXNlID0gRGVmZXJyZWQoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5sYXVuY2hlZCkge1xuICAgICAgLy8gY2xlYXIgcG9zaXRpb24gYW5kIHRpbWVcbiAgICAgIHRoaXMucG9zaXRpb24gPSBudWxsO1xuICAgICAgdGhpcy50aW1lID0gbnVsbDtcblxuICAgICAgLy8gc2V0IGljb24gYW5kIHN0eWxpbmdcbiAgICAgIHRoaXMuaWNvbkNsYXNzID0gYGJoaS0ke3RoaXMuaWNvbn1gO1xuICAgICAgdGhpcy5hbGVydFRoZW1lID0gYCR7dGhpcy50aGVtZX0gdG9hc3QtY29udGFpbmVyIGVtYmVkZGVkYDtcbiAgICAgIGlmICh0aGlzLmhhc0RpYWxvZ3VlKSB7XG4gICAgICAgIHRoaXMuYWxlcnRUaGVtZSArPSAnIGRpYWxvZ3VlJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIHNldCBpY29uIGFuZCBzdHlsaW5nXG4gICAgdGhpcy5pY29uQ2xhc3MgPSBgYmhpLSR7dGhpcy5pY29ufWA7XG4gICAgdGhpcy5hbGVydFRoZW1lID0gYCR7dGhpcy50aGVtZX0gdG9hc3QtY29udGFpbmVyIGVtYmVkZGVkYDtcbiAgICBpZiAodGhpcy5oYXNEaWFsb2d1ZSkge1xuICAgICAgdGhpcy5hbGVydFRoZW1lICs9ICcgZGlhbG9ndWUnO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrSGFuZGxlcihldmVudCkge1xuICAgIGlmICghdGhpcy5pc0Nsb3NlYWJsZSkge1xuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgIHRoaXMucGFyZW50LmhpZGUodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KHsgY2xvc2VkOiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsb3NlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQuaGlkZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZWQuZW1pdCh7IGNsb3NlZDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBhY3Rpb25IYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy5vbkFjdGlvblByb21pc2UucmVzb2x2ZShldmVudCk7XG4gIH1cblxuICBvbkFjdGlvbihmbjogKCkgPT4gdm9pZCkge1xuICAgIHJldHVybiB0aGlzLm9uQWN0aW9uUHJvbWlzZS50aGVuKGZuKTtcbiAgfVxufVxuIl19