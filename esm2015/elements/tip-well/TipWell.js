// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "@angular/platform-browser";
function NovoTipWellElement_div_0_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMapInterpolate1("bhi-", ctx_r1.icon, "");
    i0.ɵɵattribute("data-automation-id", "novo-tip-well-icon-" + ctx_r1.name);
} }
function NovoTipWellElement_div_0_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-automation-id", "novo-tip-well-tip-" + ctx_r2.name);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.tip);
} }
function NovoTipWellElement_div_0_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 4);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r3.tipWithStyles, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("data-automation-id", "novo-tip-well-tip-" + ctx_r3.name);
} }
function NovoTipWellElement_div_0_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function NovoTipWellElement_div_0_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.hideTip(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-automation-id", "novo-tip-well-button-" + ctx_r4.name);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.buttonText, " ");
} }
function NovoTipWellElement_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵtemplate(2, NovoTipWellElement_div_0_i_2_Template, 1, 4, "i", 1);
    i0.ɵɵtemplate(3, NovoTipWellElement_div_0_p_3_Template, 2, 2, "p", 0);
    i0.ɵɵtemplate(4, NovoTipWellElement_div_0_p_4_Template, 1, 2, "p", 2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, NovoTipWellElement_div_0_button_5_Template, 2, 2, "button", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.sanitize);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.sanitize);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.button);
} }
export class NovoTipWellElement {
    constructor(labels, sanitizer) {
        this.labels = labels;
        this.sanitizer = sanitizer;
        this.button = true;
        this.sanitize = true;
        this.confirmed = new EventEmitter();
        this.isActive = true;
        this.isActive = true;
        // Check if localStorage is enabled
        this.isLocalStorageEnabled = (() => {
            let isEnabled = false;
            if (typeof localStorage === 'object') {
                try {
                    localStorage.setItem('lsTest', '1');
                    localStorage.removeItem('lsTest');
                    isEnabled = true;
                }
                catch (e) {
                    console.warn('This web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
                }
            }
            return isEnabled;
        })();
    }
    // Trusts the HTML in order to show CSS styles
    get tipWithStyles() {
        if (!this._tipWithStyles || this._lastTipStyled !== this.tip) {
            this._tipWithStyles = this.sanitizer.bypassSecurityTrustHtml(this.tip);
            this._lastTipStyled = this.tip;
        }
        return this._tipWithStyles;
    }
    ngOnInit() {
        this.tip = this.tip || '';
        this.buttonText = this.buttonText || this.labels.okGotIt;
        this.button = typeof this.button === 'string' ? this.button === 'true' : this.button;
        this.icon = this.icon || null;
        // Set a (semi) unique name for the tip-well
        this.name = this.name || Math.round(Math.random() * 100);
        this.localStorageKey = `novo-tw_${this.name}`;
        // Check localStorage for state
        if (this.isLocalStorageEnabled) {
            const storedValue = JSON.parse(localStorage.getItem(this.localStorageKey));
            this.isActive = storedValue !== false;
        }
    }
    hideTip() {
        if (this.isLocalStorageEnabled) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(false));
        }
        this.isActive = false;
        this.confirmed.emit();
    }
}
NovoTipWellElement.ɵfac = function NovoTipWellElement_Factory(t) { return new (t || NovoTipWellElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i2.DomSanitizer)); };
NovoTipWellElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoTipWellElement, selectors: [["novo-tip-well"]], hostVars: 2, hostBindings: function NovoTipWellElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("active", ctx.isActive);
    } }, inputs: { name: "name", tip: "tip", buttonText: "buttonText", button: "button", icon: "icon", sanitize: "sanitize" }, outputs: { confirmed: "confirmed" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "class", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["theme", "dialogue", "size", "small", 3, "click", 4, "ngIf"], [3, "innerHTML"], ["theme", "dialogue", "size", "small", 3, "click"]], template: function NovoTipWellElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoTipWellElement_div_0_Template, 6, 4, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isActive);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTipWellElement, [{
        type: Component,
        args: [{
                selector: 'novo-tip-well',
                template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <p *ngIf="sanitize" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
      </div>
      <button theme="dialogue" size="small" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `,
                host: {
                    '[class.active]': 'isActive',
                },
            }]
    }], function () { return [{ type: i1.NovoLabelService }, { type: i2.DomSanitizer }]; }, { name: [{
            type: Input
        }], tip: [{
            type: Input
        }], buttonText: [{
            type: Input
        }], button: [{
            type: Input
        }], icon: [{
            type: Input
        }], sanitize: [{
            type: Input
        }], confirmed: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlwV2VsbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy90aXAtd2VsbC9UaXBXZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxZQUFZLEVBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7O0lBTzdELG9CQUFvRzs7O0lBQWpHLGtEQUFzQjtJQUFjLHlFQUF3RDs7O0lBQy9GLHlCQUE0RTtJQUFBLFlBQVM7SUFBQSxpQkFBSTs7O0lBQXJFLHdFQUF1RDtJQUFDLGVBQVM7SUFBVCxnQ0FBUzs7O0lBQ3JGLHVCQUE2Rzs7O0lBQWhDLG1FQUEyQjtJQUFuRix3RUFBdUQ7Ozs7SUFFOUUsaUNBQ0U7SUFEb0MsNkxBQW1CO0lBQ3ZELFlBQ0Y7SUFBQSxpQkFBUzs7O0lBRmdFLDJFQUEwRDtJQUNqSSxlQUNGO0lBREUsa0RBQ0Y7OztJQVJGLDJCQUNFO0lBQUEsMkJBQ0U7SUFBQSxxRUFBZ0c7SUFDaEcscUVBQTRFO0lBQzVFLHFFQUF5RztJQUMzRyxpQkFBTTtJQUNOLCtFQUNFO0lBRUosaUJBQU07OztJQVB3QixlQUFZO0lBQVosa0NBQVk7SUFDbkMsZUFBZ0I7SUFBaEIsc0NBQWdCO0lBQ2hCLGVBQWlCO0lBQWpCLHVDQUFpQjtJQUVvQyxlQUFjO0lBQWQsb0NBQWM7O0FBUzlFLE1BQU0sT0FBTyxrQkFBa0I7SUF1QjdCLFlBQW9CLE1BQXdCLEVBQVUsU0FBdUI7UUFBekQsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBZjdFLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFJdkIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6QixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBUXZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLG1DQUFtQztRQUNuQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDakMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxFQUFFO2dCQUNwQyxJQUFJO29CQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNwQyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2lCQUNsQjtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDVixPQUFPLENBQUMsSUFBSSxDQUNWLG1OQUFtTixDQUNwTixDQUFDO2lCQUNIO2FBQ0Y7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1AsQ0FBQztJQUVELDhDQUE4QztJQUM5QyxJQUFJLGFBQWE7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDNUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDaEM7UUFDRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7UUFDOUIsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsZUFBZSxHQUFHLFdBQVcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlDLCtCQUErQjtRQUMvQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLEtBQUssS0FBSyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDOztvRkF6RVUsa0JBQWtCO3VEQUFsQixrQkFBa0I7OztRQWYzQixtRUFDRTs7UUFERyxtQ0FBZ0I7O2tEQWVaLGtCQUFrQjtjQWxCOUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGdCQUFnQixFQUFFLFVBQVU7aUJBQzdCO2FBQ0Y7OEZBR0MsSUFBSTtrQkFESCxLQUFLO1lBR04sR0FBRztrQkFERixLQUFLO1lBR04sVUFBVTtrQkFEVCxLQUFLO1lBR04sTUFBTTtrQkFETCxLQUFLO1lBR04sSUFBSTtrQkFESCxLQUFLO1lBR04sUUFBUTtrQkFEUCxLQUFLO1lBR04sU0FBUztrQkFEUixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRpcC13ZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiaXNBY3RpdmVcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLXt7IGljb24gfX1cIiAqbmdJZj1cImljb25cIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tdGlwLXdlbGwtaWNvbi0nICsgbmFtZVwiPjwvaT5cbiAgICAgICAgPHAgKm5nSWY9XCJzYW5pdGl6ZVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by10aXAtd2VsbC10aXAtJyArIG5hbWVcIj57eyB0aXAgfX08L3A+XG4gICAgICAgIDxwICpuZ0lmPVwiIXNhbml0aXplXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLXRpcC13ZWxsLXRpcC0nICsgbmFtZVwiIFtpbm5lckhUTUxdPVwidGlwV2l0aFN0eWxlc1wiPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiB0aGVtZT1cImRpYWxvZ3VlXCIgc2l6ZT1cInNtYWxsXCIgKGNsaWNrKT1cImhpZGVUaXAoKVwiICpuZ0lmPVwiYnV0dG9uXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLXRpcC13ZWxsLWJ1dHRvbi0nICsgbmFtZVwiPlxuICAgICAgICB7eyBidXR0b25UZXh0IH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdpc0FjdGl2ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UaXBXZWxsRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZyB8IG51bWJlcjtcbiAgQElucHV0KClcbiAgdGlwOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGJ1dHRvblRleHQ6IHN0cmluZztcbiAgQElucHV0KClcbiAgYnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzYW5pdGl6ZTogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKVxuICBjb25maXJtZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgaXNBY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuICBpc0xvY2FsU3RvcmFnZUVuYWJsZWQ6IGFueTtcbiAgbG9jYWxTdG9yYWdlS2V5OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfdGlwV2l0aFN0eWxlczogU2FmZUh0bWw7XG4gIHByaXZhdGUgX2xhc3RUaXBTdHlsZWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgIC8vIENoZWNrIGlmIGxvY2FsU3RvcmFnZSBpcyBlbmFibGVkXG4gICAgdGhpcy5pc0xvY2FsU3RvcmFnZUVuYWJsZWQgPSAoKCkgPT4ge1xuICAgICAgbGV0IGlzRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgaWYgKHR5cGVvZiBsb2NhbFN0b3JhZ2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xzVGVzdCcsICcxJyk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2xzVGVzdCcpO1xuICAgICAgICAgIGlzRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAnVGhpcyB3ZWIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHN0b3Jpbmcgc2V0dGluZ3MgbG9jYWxseS4gSW4gU2FmYXJpLCB0aGUgbW9zdCBjb21tb24gY2F1c2Ugb2YgdGhpcyBpcyB1c2luZyBcIlByaXZhdGUgQnJvd3NpbmcgTW9kZVwiLiBTb21lIHNldHRpbmdzIG1heSBub3Qgc2F2ZSBvciBzb21lIGZlYXR1cmVzIG1heSBub3Qgd29yayBwcm9wZXJseSBmb3IgeW91LicsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGlzRW5hYmxlZDtcbiAgICB9KSgpO1xuICB9XG5cbiAgLy8gVHJ1c3RzIHRoZSBIVE1MIGluIG9yZGVyIHRvIHNob3cgQ1NTIHN0eWxlc1xuICBnZXQgdGlwV2l0aFN0eWxlcygpOiBTYWZlSHRtbCB7XG4gICAgaWYgKCF0aGlzLl90aXBXaXRoU3R5bGVzIHx8IHRoaXMuX2xhc3RUaXBTdHlsZWQgIT09IHRoaXMudGlwKSB7XG4gICAgICB0aGlzLl90aXBXaXRoU3R5bGVzID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGhpcy50aXApO1xuICAgICAgdGhpcy5fbGFzdFRpcFN0eWxlZCA9IHRoaXMudGlwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdGlwV2l0aFN0eWxlcztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudGlwID0gdGhpcy50aXAgfHwgJyc7XG4gICAgdGhpcy5idXR0b25UZXh0ID0gdGhpcy5idXR0b25UZXh0IHx8IHRoaXMubGFiZWxzLm9rR290SXQ7XG4gICAgdGhpcy5idXR0b24gPSB0eXBlb2YgdGhpcy5idXR0b24gPT09ICdzdHJpbmcnID8gdGhpcy5idXR0b24gPT09ICd0cnVlJyA6IHRoaXMuYnV0dG9uO1xuICAgIHRoaXMuaWNvbiA9IHRoaXMuaWNvbiB8fCBudWxsO1xuICAgIC8vIFNldCBhIChzZW1pKSB1bmlxdWUgbmFtZSBmb3IgdGhlIHRpcC13ZWxsXG4gICAgdGhpcy5uYW1lID0gdGhpcy5uYW1lIHx8IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2VLZXkgPSBgbm92by10d18ke3RoaXMubmFtZX1gO1xuICAgIC8vIENoZWNrIGxvY2FsU3RvcmFnZSBmb3Igc3RhdGVcbiAgICBpZiAodGhpcy5pc0xvY2FsU3RvcmFnZUVuYWJsZWQpIHtcbiAgICAgIGNvbnN0IHN0b3JlZFZhbHVlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSkpO1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IHN0b3JlZFZhbHVlICE9PSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoaWRlVGlwKCkge1xuICAgIGlmICh0aGlzLmlzTG9jYWxTdG9yYWdlRW5hYmxlZCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5sb2NhbFN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KGZhbHNlKSk7XG4gICAgfVxuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmNvbmZpcm1lZC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==