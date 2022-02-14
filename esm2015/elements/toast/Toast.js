// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Deferred } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
function NovoToastElement_h5_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h5");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.title);
} }
function NovoToastElement_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 9);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("message-only", !ctx_r1.title);
    i0.ɵɵproperty("innerHtml", ctx_r1._message, i0.ɵɵsanitizeHtml);
} }
function NovoToastElement_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelement(1, "input", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r2.link);
} }
function NovoToastElement_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelementStart(1, "button", 13);
    i0.ɵɵlistener("click", function NovoToastElement_div_8_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.actionHandler($event); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.action);
} }
function NovoToastElement_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵlistener("click", function NovoToastElement_div_9_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.close($event); });
    i0.ɵɵelement(1, "i", 15);
    i0.ɵɵelementEnd();
} }
const _c0 = ["*"];
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
NovoToastElement.ɵfac = function NovoToastElement_Factory(t) { return new (t || NovoToastElement)(i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
NovoToastElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoToastElement, selectors: [["novo-toast"]], hostVars: 8, hostBindings: function NovoToastElement_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function NovoToastElement_click_HostBindingHandler($event) { return !ctx.isCloseable && ctx.clickHandler($event); });
    } if (rf & 2) {
        i0.ɵɵclassMap(ctx.alertTheme);
        i0.ɵɵclassProp("show", ctx.show)("animate", ctx.animate)("embedded", ctx.embedded);
    } }, inputs: { theme: "theme", icon: "icon", title: "title", action: "action", hasDialogue: "hasDialogue", link: "link", isCloseable: "isCloseable", message: "message" }, outputs: { closed: "closed" }, features: [i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c0, decls: 10, vars: 6, consts: [[1, "toast-icon"], [3, "ngClass"], [1, "toast-content"], [4, "ngIf"], [3, "message-only", "innerHtml", 4, "ngIf"], ["class", "link-generated", 4, "ngIf"], [1, "dialogue"], ["class", "action", 4, "ngIf"], ["class", "close-icon", 3, "click", 4, "ngIf"], [3, "innerHtml"], [1, "link-generated"], ["type", "text", "onfocus", "this.select();", 3, "value"], [1, "action"], ["theme", "dialogue", "color", "white", 3, "click"], [1, "close-icon", 3, "click"], [1, "bhi-times"]], template: function NovoToastElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "i", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵtemplate(3, NovoToastElement_h5_3_Template, 2, 1, "h5", 3);
        i0.ɵɵtemplate(4, NovoToastElement_p_4_Template, 1, 3, "p", 4);
        i0.ɵɵtemplate(5, NovoToastElement_div_5_Template, 2, 1, "div", 5);
        i0.ɵɵelementStart(6, "div", 6);
        i0.ɵɵprojection(7);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(8, NovoToastElement_div_8_Template, 3, 1, "div", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, NovoToastElement_div_9_Template, 2, 0, "div", 8);
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.iconClass);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx._message);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.link);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.action);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isCloseable);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoToastElement, [{
        type: Component,
        args: [{
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
    }], function () { return [{ type: i1.DomSanitizer }]; }, { theme: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9hc3QuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdG9hc3QvVG9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsWUFBWSxFQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBbUIsTUFBTSxhQUFhLENBQUM7Ozs7SUFnQmxELDBCQUFrQjtJQUFBLFlBQVc7SUFBQSxpQkFBSzs7O0lBQWhCLGVBQVc7SUFBWCxrQ0FBVzs7O0lBQzdCLHVCQUE2RTs7O0lBQXpELDZDQUE2QjtJQUFDLDhEQUFzQjs7O0lBQ3hFLCtCQUNFO0lBQUEsNEJBQ0Y7SUFBQSxpQkFBTTs7O0lBRGUsZUFBYztJQUFkLG1DQUFjOzs7O0lBS25DLCtCQUNFO0lBQUEsa0NBQXVFO0lBQWhDLG1NQUErQjtJQUFDLFlBQVk7SUFBQSxpQkFBUztJQUM5RixpQkFBTTs7O0lBRG1FLGVBQVk7SUFBWixtQ0FBWTs7OztJQUd2RiwrQkFDRTtJQUQwQyx3TEFBdUI7SUFDakUsd0JBQXlCO0lBQzNCLGlCQUFNOzs7QUFHVixNQUFNLE9BQU8sZ0JBQWdCO0lBa0MzQixZQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBaEMzQyxVQUFLLEdBQVcsUUFBUSxDQUFDO1FBRXpCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFNekIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFJN0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFNN0IsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRy9DLFNBQUksR0FBWSxLQUFLLENBQUM7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QUFxQjtRQUFyQix1Q0FBcUI7UUFHcEIsZUFBYTtRQUFiLGdDQUFhO1FBQ2QsZUFBZ0I7UUFBaEIsbUNBQWdCO1FBQ2QsZUFBWTtRQUFaLCtCQUFZO1FBTVosZUFBYztRQUFkLGlDQUFjO1FBSUcsZUFBbUI7UUFBbkIsc0NBQW1COztrREFLbEMsZ0JBQWdCO2NBL0I1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsWUFBWTtvQkFDdkIsY0FBYyxFQUFFLE1BQU07b0JBQ3RCLGlCQUFpQixFQUFFLFNBQVM7b0JBQzVCLGtCQUFrQixFQUFFLFVBQVU7b0JBQzlCLFNBQVMsRUFBRSxzQ0FBc0M7aUJBQ2xEO2dCQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7YUFDRjsrREFHQyxLQUFLO2tCQURKLEtBQUs7WUFHTixJQUFJO2tCQURILEtBQUs7WUFHTixLQUFLO2tCQURKLEtBQUs7WUFHTixNQUFNO2tCQURMLEtBQUs7WUFHTixXQUFXO2tCQURWLEtBQUs7WUFHTixJQUFJO2tCQURILEtBQUs7WUFHTixXQUFXO2tCQURWLEtBQUs7WUFHRixPQUFPO2tCQURWLEtBQUs7WUFLTixNQUFNO2tCQURMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRGVmZXJyZWQsIERlZmVycmVkUHJvbWlzZSB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10b2FzdCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6ICdhbGVydFRoZW1lJyxcbiAgICAnW2NsYXNzLnNob3ddJzogJ3Nob3cnLFxuICAgICdbY2xhc3MuYW5pbWF0ZV0nOiAnYW5pbWF0ZScsXG4gICAgJ1tjbGFzcy5lbWJlZGRlZF0nOiAnZW1iZWRkZWQnLFxuICAgICcoY2xpY2spJzogJyFpc0Nsb3NlYWJsZSAmJiBjbGlja0hhbmRsZXIoJGV2ZW50KScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LWljb25cIj5cbiAgICAgIDxpIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiPjwvaT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidG9hc3QtY29udGVudFwiPlxuICAgICAgPGg1ICpuZ0lmPVwidGl0bGVcIj57eyB0aXRsZSB9fTwvaDU+XG4gICAgICA8cCAqbmdJZj1cIl9tZXNzYWdlXCIgW2NsYXNzLm1lc3NhZ2Utb25seV09XCIhdGl0bGVcIiBbaW5uZXJIdG1sXT1cIl9tZXNzYWdlXCI+PC9wPlxuICAgICAgPGRpdiAqbmdJZj1cImxpbmtcIiBjbGFzcz1cImxpbmstZ2VuZXJhdGVkXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFt2YWx1ZV09XCJsaW5rXCIgb25mb2N1cz1cInRoaXMuc2VsZWN0KCk7XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZ3VlXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cImFjdGlvblwiIGNsYXNzPVwiYWN0aW9uXCI+XG4gICAgICAgIDxidXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIGNvbG9yPVwid2hpdGVcIiAoY2xpY2spPVwiYWN0aW9uSGFuZGxlcigkZXZlbnQpXCI+e3sgYWN0aW9uIH19PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2xvc2UtaWNvblwiICpuZ0lmPVwiaXNDbG9zZWFibGVcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiPlxuICAgICAgPGkgY2xhc3M9XCJiaGktdGltZXNcIj48L2k+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ub2FzdEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmcgPSAnZGFuZ2VyJztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nID0gJ2NhdXRpb24nO1xuICBASW5wdXQoKVxuICB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBhY3Rpb246IHN0cmluZztcbiAgQElucHV0KClcbiAgaGFzRGlhbG9ndWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgbGluazogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpc0Nsb3NlYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzZXQgbWVzc2FnZShtOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tZXNzYWdlID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobSk7XG4gIH1cbiAgQE91dHB1dCgpXG4gIGNsb3NlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX21lc3NhZ2U6IFNhZmVIdG1sO1xuICBzaG93OiBib29sZWFuID0gZmFsc2U7XG4gIGFuaW1hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcGFyZW50OiBhbnkgPSBudWxsO1xuICBsYXVuY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwb3NpdGlvbjogYW55O1xuICB0aW1lOiBhbnk7XG4gIGljb25DbGFzczogc3RyaW5nO1xuICBhbGVydFRoZW1lOiBzdHJpbmc7XG4gIGVtYmVkZGVkOiBhbnk7XG4gIG9uQWN0aW9uUHJvbWlzZTogRGVmZXJyZWRQcm9taXNlID0gRGVmZXJyZWQoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5sYXVuY2hlZCkge1xuICAgICAgLy8gY2xlYXIgcG9zaXRpb24gYW5kIHRpbWVcbiAgICAgIHRoaXMucG9zaXRpb24gPSBudWxsO1xuICAgICAgdGhpcy50aW1lID0gbnVsbDtcblxuICAgICAgLy8gc2V0IGljb24gYW5kIHN0eWxpbmdcbiAgICAgIHRoaXMuaWNvbkNsYXNzID0gYGJoaS0ke3RoaXMuaWNvbn1gO1xuICAgICAgdGhpcy5hbGVydFRoZW1lID0gYCR7dGhpcy50aGVtZX0gdG9hc3QtY29udGFpbmVyIGVtYmVkZGVkYDtcbiAgICAgIGlmICh0aGlzLmhhc0RpYWxvZ3VlKSB7XG4gICAgICAgIHRoaXMuYWxlcnRUaGVtZSArPSAnIGRpYWxvZ3VlJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIHNldCBpY29uIGFuZCBzdHlsaW5nXG4gICAgdGhpcy5pY29uQ2xhc3MgPSBgYmhpLSR7dGhpcy5pY29ufWA7XG4gICAgdGhpcy5hbGVydFRoZW1lID0gYCR7dGhpcy50aGVtZX0gdG9hc3QtY29udGFpbmVyIGVtYmVkZGVkYDtcbiAgICBpZiAodGhpcy5oYXNEaWFsb2d1ZSkge1xuICAgICAgdGhpcy5hbGVydFRoZW1lICs9ICcgZGlhbG9ndWUnO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrSGFuZGxlcihldmVudCkge1xuICAgIGlmICghdGhpcy5pc0Nsb3NlYWJsZSkge1xuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgIHRoaXMucGFyZW50LmhpZGUodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KHsgY2xvc2VkOiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsb3NlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQuaGlkZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZWQuZW1pdCh7IGNsb3NlZDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBhY3Rpb25IYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy5vbkFjdGlvblByb21pc2UucmVzb2x2ZShldmVudCk7XG4gIH1cblxuICBvbkFjdGlvbihmbjogKCkgPT4gdm9pZCkge1xuICAgIHJldHVybiB0aGlzLm9uQWN0aW9uUHJvbWlzZS50aGVuKGZuKTtcbiAgfVxufVxuIl19