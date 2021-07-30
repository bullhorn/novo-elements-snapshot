// NG2
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class NovoToastElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.theme = 'danger';
        this.icon = 'caution';
        this.hasDialogue = false;
        this.isCloseable = false;
        this.closed = new EventEmitter();
        this.show = false;
        this.animate = false;
        this.parent = null;
        this.launched = false;
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
}
NovoToastElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-toast',
                host: {
                    '[class]': 'alertTheme',
                    '[class.show]': 'show',
                    '[class.animate]': 'animate',
                    '[class.embedded]': 'embedded',
                    '(click)': '!isCloseable && clickHandler($event)',
                },
                template: `
        <div class="toast-icon">
            <i [ngClass]="iconClass"></i>
        </div>
        <div class="toast-content">
            <h5 *ngIf="title">{{title}}</h5>
            <p *ngIf="_message" [class.message-only]="!title" [innerHtml]="_message"></p>
            <div *ngIf="link" class="link-generated">
                <input type="text" [value]="link" onfocus="this.select();"/>
            </div>
            <div class="dialogue">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="close-icon" *ngIf="isCloseable" (click)="close($event)">
            <i class="bhi-times"></i>
        </div>
    `
            },] }
];
NovoToastElement.ctorParameters = () => [
    { type: DomSanitizer }
];
NovoToastElement.propDecorators = {
    theme: [{ type: Input }],
    icon: [{ type: Input }],
    title: [{ type: Input }],
    hasDialogue: [{ type: Input }],
    link: [{ type: Input }],
    isCloseable: [{ type: Input }],
    message: [{ type: Input }],
    closed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9hc3QuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RvYXN0L1RvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsWUFBWSxFQUFZLE1BQU0sMkJBQTJCLENBQUM7QUE4Qm5FLE1BQU0sT0FBTyxnQkFBZ0I7SUErQjNCLFlBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUE3QjNDLFVBQUssR0FBVyxRQUFRLENBQUM7UUFFekIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUl6QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUk3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU03QixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHL0MsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFdBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsYUFBUSxHQUFZLEtBQUssQ0FBQztJQU9vQixDQUFDO0lBbEIvQyxJQUNJLE9BQU8sQ0FBQyxDQUFTO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBaUJELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakIsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLDJCQUEyQixDQUFDO1lBQzNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxXQUFXLENBQUM7YUFDaEM7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBdUI7UUFDakMsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLDJCQUEyQixDQUFDO1FBQzNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxJQUFJLFdBQVcsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCxZQUFZLENBQUMsS0FBSztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN4QjtZQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUs7UUFDVCxJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7OztZQTdHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsWUFBWTtvQkFDdkIsY0FBYyxFQUFFLE1BQU07b0JBQ3RCLGlCQUFpQixFQUFFLFNBQVM7b0JBQzVCLGtCQUFrQixFQUFFLFVBQVU7b0JBQzlCLFNBQVMsRUFBRSxzQ0FBc0M7aUJBQ2xEO2dCQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpQlA7YUFDSjs7O1lBN0JRLFlBQVk7OztvQkErQmxCLEtBQUs7bUJBRUwsS0FBSztvQkFFTCxLQUFLOzBCQUVMLEtBQUs7bUJBRUwsS0FBSzswQkFFTCxLQUFLO3NCQUVMLEtBQUs7cUJBSUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXRvYXN0JyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzXSc6ICdhbGVydFRoZW1lJyxcclxuICAgICdbY2xhc3Muc2hvd10nOiAnc2hvdycsXHJcbiAgICAnW2NsYXNzLmFuaW1hdGVdJzogJ2FuaW1hdGUnLFxyXG4gICAgJ1tjbGFzcy5lbWJlZGRlZF0nOiAnZW1iZWRkZWQnLFxyXG4gICAgJyhjbGljayknOiAnIWlzQ2xvc2VhYmxlICYmIGNsaWNrSGFuZGxlcigkZXZlbnQpJyxcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWljb25cIj5cclxuICAgICAgICAgICAgPGkgW25nQ2xhc3NdPVwiaWNvbkNsYXNzXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgIDxoNSAqbmdJZj1cInRpdGxlXCI+e3t0aXRsZX19PC9oNT5cclxuICAgICAgICAgICAgPHAgKm5nSWY9XCJfbWVzc2FnZVwiIFtjbGFzcy5tZXNzYWdlLW9ubHldPVwiIXRpdGxlXCIgW2lubmVySHRtbF09XCJfbWVzc2FnZVwiPjwvcD5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImxpbmtcIiBjbGFzcz1cImxpbmstZ2VuZXJhdGVkXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbdmFsdWVdPVwibGlua1wiIG9uZm9jdXM9XCJ0aGlzLnNlbGVjdCgpO1wiLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2d1ZVwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2UtaWNvblwiICpuZ0lmPVwiaXNDbG9zZWFibGVcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImJoaS10aW1lc1wiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvVG9hc3RFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpXHJcbiAgdGhlbWU6IHN0cmluZyA9ICdkYW5nZXInO1xyXG4gIEBJbnB1dCgpXHJcbiAgaWNvbjogc3RyaW5nID0gJ2NhdXRpb24nO1xyXG4gIEBJbnB1dCgpXHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGhhc0RpYWxvZ3VlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KClcclxuICBsaW5rOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBpc0Nsb3NlYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG1lc3NhZ2UobTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9tZXNzYWdlID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobSk7XHJcbiAgfVxyXG4gIEBPdXRwdXQoKVxyXG4gIGNsb3NlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIF9tZXNzYWdlOiBTYWZlSHRtbDtcclxuICBzaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgYW5pbWF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHBhcmVudDogYW55ID0gbnVsbDtcclxuICBsYXVuY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHBvc2l0aW9uOiBhbnk7XHJcbiAgdGltZTogYW55O1xyXG4gIGljb25DbGFzczogc3RyaW5nO1xyXG4gIGFsZXJ0VGhlbWU6IHN0cmluZztcclxuICBlbWJlZGRlZDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5sYXVuY2hlZCkge1xyXG4gICAgICAvLyBjbGVhciBwb3NpdGlvbiBhbmQgdGltZVxyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gbnVsbDtcclxuICAgICAgdGhpcy50aW1lID0gbnVsbDtcclxuXHJcbiAgICAgIC8vIHNldCBpY29uIGFuZCBzdHlsaW5nXHJcbiAgICAgIHRoaXMuaWNvbkNsYXNzID0gYGJoaS0ke3RoaXMuaWNvbn1gO1xyXG4gICAgICB0aGlzLmFsZXJ0VGhlbWUgPSBgJHt0aGlzLnRoZW1lfSB0b2FzdC1jb250YWluZXIgZW1iZWRkZWRgO1xyXG4gICAgICBpZiAodGhpcy5oYXNEaWFsb2d1ZSkge1xyXG4gICAgICAgIHRoaXMuYWxlcnRUaGVtZSArPSAnIGRpYWxvZ3VlJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIC8vIHNldCBpY29uIGFuZCBzdHlsaW5nXHJcbiAgICB0aGlzLmljb25DbGFzcyA9IGBiaGktJHt0aGlzLmljb259YDtcclxuICAgIHRoaXMuYWxlcnRUaGVtZSA9IGAke3RoaXMudGhlbWV9IHRvYXN0LWNvbnRhaW5lciBlbWJlZGRlZGA7XHJcbiAgICBpZiAodGhpcy5oYXNEaWFsb2d1ZSkge1xyXG4gICAgICB0aGlzLmFsZXJ0VGhlbWUgKz0gJyBkaWFsb2d1ZSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGlja0hhbmRsZXIoZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5pc0Nsb3NlYWJsZSkge1xyXG4gICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xyXG4gICAgICAgIHRoaXMucGFyZW50LmhpZGUodGhpcyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCh7IGNsb3NlZDogdHJ1ZSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xvc2UoZXZlbnQpIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhcmVudCkge1xyXG4gICAgICB0aGlzLnBhcmVudC5oaWRlKHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jbG9zZWQuZW1pdCh7IGNsb3NlZDogdHJ1ZSB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19