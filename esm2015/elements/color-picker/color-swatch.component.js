import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["*"];
export class NovoColorSwatchComponent {
    constructor() {
        this.style = {};
        this.focusStyle = {};
        this.onClick = new EventEmitter();
        this.onHover = new EventEmitter();
        this.divStyles = {};
        this.focusStyles = {};
        this.inFocus = false;
    }
    ngOnInit() {
        this.divStyles = Object.assign({ background: this.color, height: '100%', width: '100%', cursor: 'pointer', position: 'relative', outline: 'none' }, this.style);
    }
    currentStyles() {
        this.focusStyles = Object.assign(Object.assign({}, this.divStyles), this.focusStyle);
        return this.focus || this.inFocus ? this.focusStyles : this.divStyles;
    }
    handleFocusOut() {
        this.inFocus = false;
    }
    handleFocus() {
        this.inFocus = true;
    }
    handleHover(hex, $event) {
        this.onHover.emit({ hex, $event });
    }
    handleClick(hex, $event) {
        this.onClick.emit({ hex, $event });
    }
}
NovoColorSwatchComponent.ɵfac = function NovoColorSwatchComponent_Factory(t) { return new (t || NovoColorSwatchComponent)(); };
NovoColorSwatchComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NovoColorSwatchComponent, selectors: [["novo-color-swatch"]], inputs: { color: "color", style: "style", focusStyle: "focusStyle", focus: "focus" }, outputs: { onClick: "onClick", onHover: "onHover" }, ngContentSelectors: _c0, decls: 2, vars: 2, consts: [["tabindex", "0", 1, "swatch", 3, "ngStyle", "click", "keydown.enter", "focus", "blur", "mouseover"]], template: function NovoColorSwatchComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("click", function NovoColorSwatchComponent_Template_div_click_0_listener($event) { return ctx.handleClick(ctx.color, $event); })("keydown.enter", function NovoColorSwatchComponent_Template_div_keydown_enter_0_listener($event) { return ctx.handleClick(ctx.color, $event); })("focus", function NovoColorSwatchComponent_Template_div_focus_0_listener() { return ctx.handleFocus(); })("blur", function NovoColorSwatchComponent_Template_div_blur_0_listener() { return ctx.handleFocusOut(); })("mouseover", function NovoColorSwatchComponent_Template_div_mouseover_0_listener($event) { return ctx.handleHover(ctx.color, $event); });
        i0.ɵɵprojection(1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngStyle", ctx.currentStyles());
        i0.ɵɵattribute("title", ctx.color);
    } }, directives: [i1.NgStyle], styles: [".swatch[_ngcontent-%COMP%] {\n        border-radius: 0.4rem;\n      }"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoColorSwatchComponent, [{
        type: Component,
        args: [{
                selector: 'novo-color-swatch',
                template: `
    <div
      class="swatch"
      [ngStyle]="currentStyles()"
      [attr.title]="color"
      (click)="handleClick(color, $event)"
      (keydown.enter)="handleClick(color, $event)"
      (focus)="handleFocus()"
      (blur)="handleFocusOut()"
      (mouseover)="handleHover(color, $event)"
      tabindex="0"
    >
      <ng-content></ng-content>
    </div>
  `,
                styles: [
                    `
      .swatch {
        border-radius: 0.4rem;
      }
    `,
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], null, { color: [{
            type: Input
        }], style: [{
            type: Input
        }], focusStyle: [{
            type: Input
        }], focus: [{
            type: Input
        }], onClick: [{
            type: Output
        }], onHover: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Itc3dhdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jb2xvci1waWNrZXIvY29sb3Itc3dhdGNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBNEJ4RyxNQUFNLE9BQU8sd0JBQXdCO0lBMUJyQztRQTRCVyxVQUFLLEdBQThCLEVBQUUsQ0FBQztRQUN0QyxlQUFVLEdBQThCLEVBQUUsQ0FBQztRQUUxQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNsQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1QyxjQUFTLEdBQThCLEVBQUUsQ0FBQztRQUMxQyxnQkFBVyxHQUE4QixFQUFFLENBQUM7UUFDNUMsWUFBTyxHQUFHLEtBQUssQ0FBQztLQWdDakI7SUE5QkMsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLG1CQUNaLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBZSxFQUNoQyxNQUFNLEVBQUUsTUFBTSxFQUNkLEtBQUssRUFBRSxNQUFNLEVBQ2IsTUFBTSxFQUFFLFNBQVMsRUFDakIsUUFBUSxFQUFFLFVBQVUsRUFDcEIsT0FBTyxFQUFFLE1BQU0sSUFDWixJQUFJLENBQUMsS0FBSyxDQUNkLENBQUM7SUFDSixDQUFDO0lBQ0QsYUFBYTtRQUNYLElBQUksQ0FBQyxXQUFXLG1DQUNYLElBQUksQ0FBQyxTQUFTLEdBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FDbkIsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hFLENBQUM7SUFDRCxjQUFjO1FBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBQ0QsV0FBVyxDQUFDLEdBQVcsRUFBRSxNQUFNO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELFdBQVcsQ0FBQyxHQUFXLEVBQUUsTUFBTTtRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7O2dHQXhDVSx3QkFBd0I7NkRBQXhCLHdCQUF3Qjs7UUF2QmpDLDhCQVdFO1FBUEEsd0dBQVMsa0NBQTBCLElBQUMsMkdBQ25CLGtDQUEwQixJQURQLHFGQUUzQixpQkFBYSxJQUZjLG1GQUc1QixvQkFBZ0IsSUFIWSxtR0FJdkIsa0NBQTBCLElBSkg7UUFPcEMsa0JBQVk7UUFDZCxpQkFBTTs7UUFWSiw2Q0FBMkI7UUFDM0Isa0NBQW9COztrREFvQmIsd0JBQXdCO2NBMUJwQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO2dCQUNELE1BQU0sRUFBRTtvQkFDTjs7OztLQUlDO2lCQUNGO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEO2dCQUVVLEtBQUs7a0JBQWIsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDSSxPQUFPO2tCQUFoQixNQUFNO1lBQ0csT0FBTztrQkFBaEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY29sb3Itc3dhdGNoJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInN3YXRjaFwiXG4gICAgICBbbmdTdHlsZV09XCJjdXJyZW50U3R5bGVzKClcIlxuICAgICAgW2F0dHIudGl0bGVdPVwiY29sb3JcIlxuICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKGNvbG9yLCAkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duLmVudGVyKT1cImhhbmRsZUNsaWNrKGNvbG9yLCAkZXZlbnQpXCJcbiAgICAgIChmb2N1cyk9XCJoYW5kbGVGb2N1cygpXCJcbiAgICAgIChibHVyKT1cImhhbmRsZUZvY3VzT3V0KClcIlxuICAgICAgKG1vdXNlb3Zlcik9XCJoYW5kbGVIb3Zlcihjb2xvciwgJGV2ZW50KVwiXG4gICAgICB0YWJpbmRleD1cIjBcIlxuICAgID5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLnN3YXRjaCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NvbG9yU3dhdGNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgY29sb3IhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIEBJbnB1dCgpIGZvY3VzU3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgQElucHV0KCkgZm9jdXMhOiBib29sZWFuO1xuICBAT3V0cHV0KCkgb25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb25Ib3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBkaXZTdHlsZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgZm9jdXNTdHlsZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgaW5Gb2N1cyA9IGZhbHNlO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGl2U3R5bGVzID0ge1xuICAgICAgYmFja2dyb3VuZDogdGhpcy5jb2xvciBhcyBzdHJpbmcsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgLi4udGhpcy5zdHlsZSxcbiAgICB9O1xuICB9XG4gIGN1cnJlbnRTdHlsZXMoKSB7XG4gICAgdGhpcy5mb2N1c1N0eWxlcyA9IHtcbiAgICAgIC4uLnRoaXMuZGl2U3R5bGVzLFxuICAgICAgLi4udGhpcy5mb2N1c1N0eWxlLFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuZm9jdXMgfHwgdGhpcy5pbkZvY3VzID8gdGhpcy5mb2N1c1N0eWxlcyA6IHRoaXMuZGl2U3R5bGVzO1xuICB9XG4gIGhhbmRsZUZvY3VzT3V0KCkge1xuICAgIHRoaXMuaW5Gb2N1cyA9IGZhbHNlO1xuICB9XG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIHRoaXMuaW5Gb2N1cyA9IHRydWU7XG4gIH1cbiAgaGFuZGxlSG92ZXIoaGV4OiBzdHJpbmcsICRldmVudCkge1xuICAgIHRoaXMub25Ib3Zlci5lbWl0KHsgaGV4LCAkZXZlbnQgfSk7XG4gIH1cbiAgaGFuZGxlQ2xpY2soaGV4OiBzdHJpbmcsICRldmVudCkge1xuICAgIHRoaXMub25DbGljay5lbWl0KHsgaGV4LCAkZXZlbnQgfSk7XG4gIH1cbn1cbiJdfQ==