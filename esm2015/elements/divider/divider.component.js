import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoDividerComponent {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
    /** Whether the divider is vertically aligned. */
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    /** Whether the divider is an inset divider. */
    get inset() {
        return this._inset;
    }
    set inset(value) {
        this._inset = coerceBooleanProperty(value);
    }
}
NovoDividerComponent.ɵfac = function NovoDividerComponent_Factory(t) { return new (t || NovoDividerComponent)(); };
NovoDividerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDividerComponent, selectors: [["novo-divider"]], hostAttrs: ["role", "separator", 1, "novo-divider"], hostVars: 7, hostBindings: function NovoDividerComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("aria-orientation", ctx.vertical ? "vertical" : "horizontal");
        i0.ɵɵclassProp("novo-divider-vertical", ctx.vertical)("novo-divider-horizontal", !ctx.vertical)("novo-divider-inset", ctx.inset);
    } }, inputs: { vertical: "vertical", inset: "inset" }, decls: 0, vars: 0, template: function NovoDividerComponent_Template(rf, ctx) { }, styles: [".novo-divider{border-top-style:solid;border-top-width:1px;display:block;margin:0}.novo-divider.novo-divider-vertical{border-right-style:solid;border-right-width:1px;border-top:0}.novo-divider.novo-divider-inset{margin-left:80px}[dir=rtl] .novo-divider.novo-divider-inset{margin-left:auto;margin-right:80px}"], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDividerComponent, [{
        type: Component,
        args: [{
                selector: 'novo-divider',
                host: {
                    role: 'separator',
                    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                    '[class.novo-divider-vertical]': 'vertical',
                    '[class.novo-divider-horizontal]': '!vertical',
                    '[class.novo-divider-inset]': 'inset',
                    class: 'novo-divider',
                },
                template: '',
                styleUrls: ['./divider.component.scss'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], null, { vertical: [{
            type: Input
        }], inset: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGl2aWRlci9kaXZpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBaUI3RixNQUFNLE9BQU8sb0JBQW9CO0lBZmpDO1FBd0JVLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFVM0IsV0FBTSxHQUFZLEtBQUssQ0FBQztLQUlqQztJQXRCQyxpREFBaUQ7SUFDakQsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdELCtDQUErQztJQUMvQyxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQWM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDOzt3RkFsQlUsb0JBQW9CO3lEQUFwQixvQkFBb0I7Ozs7a0RBQXBCLG9CQUFvQjtjQWZoQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsV0FBVztvQkFDakIseUJBQXlCLEVBQUUsc0NBQXNDO29CQUNqRSwrQkFBK0IsRUFBRSxVQUFVO29CQUMzQyxpQ0FBaUMsRUFBRSxXQUFXO29CQUM5Qyw0QkFBNEIsRUFBRSxPQUFPO29CQUNyQyxLQUFLLEVBQUUsY0FBYztpQkFDdEI7Z0JBQ0QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7Z0JBQ3ZDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDtnQkFJSyxRQUFRO2tCQURYLEtBQUs7WUFXRixLQUFLO2tCQURSLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kaXZpZGVyJyxcbiAgaG9zdDoge1xuICAgIHJvbGU6ICdzZXBhcmF0b3InLFxuICAgICdbYXR0ci5hcmlhLW9yaWVudGF0aW9uXSc6ICd2ZXJ0aWNhbCA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAnW2NsYXNzLm5vdm8tZGl2aWRlci12ZXJ0aWNhbF0nOiAndmVydGljYWwnLFxuICAgICdbY2xhc3Mubm92by1kaXZpZGVyLWhvcml6b250YWxdJzogJyF2ZXJ0aWNhbCcsXG4gICAgJ1tjbGFzcy5ub3ZvLWRpdmlkZXItaW5zZXRdJzogJ2luc2V0JyxcbiAgICBjbGFzczogJ25vdm8tZGl2aWRlcicsXG4gIH0sXG4gIHRlbXBsYXRlOiAnJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGl2aWRlci5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RpdmlkZXJDb21wb25lbnQge1xuICAvKiogV2hldGhlciB0aGUgZGl2aWRlciBpcyB2ZXJ0aWNhbGx5IGFsaWduZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XG4gIH1cbiAgc2V0IHZlcnRpY2FsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3ZlcnRpY2FsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGRpdmlkZXIgaXMgYW4gaW5zZXQgZGl2aWRlci4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGluc2V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbnNldDtcbiAgfVxuICBzZXQgaW5zZXQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pbnNldCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaW5zZXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmVydGljYWw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luc2V0OiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=