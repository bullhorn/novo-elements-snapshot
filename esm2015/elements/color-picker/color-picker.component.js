import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Color } from '../../utils/color-utils/ColorUtils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./color-swatch.component";
function NovoColorPickerComponent_novo_color_swatch_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-color-swatch", 6);
    i0.ɵɵlistener("onClick", function NovoColorPickerComponent_novo_color_swatch_4_Template_novo_color_swatch_onClick_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.handleBlockChange($event); })("onHover", function NovoColorPickerComponent_novo_color_swatch_4_Template_novo_color_swatch_onHover_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.handleSwatchHover($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r1 = ctx.$implicit;
    i0.ɵɵproperty("color", color_r1);
} }
export class NovoColorPickerComponent {
    constructor() {
        /** Pixel value for picker width */
        this.width = 276;
        /** Color squares to display */
        this.colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];
        this.color = {
            h: 250,
            s: 0.5,
            l: 0.2,
            a: 1,
        };
        this.onChange = new EventEmitter();
        this.onChangeComplete = new EventEmitter();
        this.onSwatchHover = new EventEmitter();
        this.swatchStyle = {
            width: '30px',
            height: '30px',
            borderRadius: '4px',
            fontSize: '0',
        };
        this.input = {
            borderRadius: '4px',
            borderBottomLeftRadius: '0',
            borderTopLeftRadius: '0',
            border: '1px solid #e6ecf0',
            boxSizing: 'border-box',
            display: 'inline',
            fontSize: '14px',
            height: '30px',
            padding: '0',
            paddingLeft: '6px',
            width: '100%',
            color: '#657786',
        };
    }
    focus(color) {
        return { boxShadow: `0 0 4px ${color}` };
    }
    handleBlockChange({ hex, $event }) {
        if (Color.isValidHex(hex)) {
            // this.hex = hex;
            this.handleChange({ hex, source: 'hex' }, $event);
        }
    }
    handleValueChange({ data, $event }) {
        this.handleBlockChange({ hex: data, $event });
    }
    ngOnInit() {
        this.changes = this.onChange.pipe(debounceTime(100)).subscribe((x) => this.onChangeComplete.emit(x));
        this.setState(new Color(this.color));
    }
    ngOnChanges() {
        this.setState(new Color(this.color));
    }
    ngOnDestroy() {
        this.changes.unsubscribe();
    }
    setState(data) {
        this.currentColor = data;
        this.hsl = data.hsl;
        this.hsv = data.hsv;
        this.rgb = data.rgb;
        this.hex = data.hex;
        this.afterValidChange();
    }
    handleChange(data, $event) {
        const color = new Color(data.hex);
        if (color.isValid) {
            this.setState(color);
            this.onChange.emit({ color, $event });
            this.afterValidChange();
        }
    }
    /** hook for components after a complete change */
    afterValidChange() { }
    handleSwatchHover($event) {
        const color = new Color($event.hex);
        if (color.isValid) {
            this.setState(color);
            this.onSwatchHover.emit({ color, $event });
        }
    }
}
NovoColorPickerComponent.ɵfac = function NovoColorPickerComponent_Factory(t) { return new (t || NovoColorPickerComponent)(); };
NovoColorPickerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NovoColorPickerComponent, selectors: [["novo-color-picker"]], inputs: { width: "width", colors: "colors", color: "color" }, outputs: { onChange: "onChange", onChangeComplete: "onChangeComplete", onSwatchHover: "onSwatchHover" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 5, consts: [[1, "novo-color-preview"], [1, "novo-color-preview-text"], [1, "novo-color-swatches"], [3, "color", "onClick", "onHover", 4, "ngFor", "ngForOf"], [1, "novo-color-input"], [3, "value", "onChange"], [3, "color", "onClick", "onHover"]], template: function NovoColorPickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div", 2);
        i0.ɵɵtemplate(4, NovoColorPickerComponent_novo_color_swatch_4_Template, 1, 1, "novo-color-swatch", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 4);
        i0.ɵɵelementStart(6, "input", 5);
        i0.ɵɵlistener("onChange", function NovoColorPickerComponent_Template_input_onChange_6_listener($event) { return ctx.handleValueChange($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵstyleProp("background-color", ctx.currentColor.hex);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.hex);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.colors);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("value", ctx.hex.replace("#", ""));
    } }, directives: [i1.NgForOf, i2.NovoColorSwatchComponent], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{background-color:#fff;border-radius:.4rem;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);cursor:default;display:grid;grid-template-rows:6rem 1fr -webkit-min-content;grid-template-rows:6rem 1fr min-content;overflow:auto;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);width:18rem}[_nghost-%COMP%]   .novo-color-preview[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}[_nghost-%COMP%]   .novo-color-swatches[_ngcontent-%COMP%]{display:grid;grid-auto-rows:2.4rem;grid-gap:.4rem;grid-template-columns:repeat(6,2.4rem);justify-content:center;margin:.4rem 0}[_nghost-%COMP%]   .novo-color-input[_ngcontent-%COMP%]{padding:.4rem .8rem}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoColorPickerComponent, [{
        type: Component,
        args: [{
                selector: 'novo-color-picker',
                template: `
    <div class="novo-color-preview" [style.backgroundColor]="currentColor.hex">
      <div class="novo-color-preview-text">{{ hex }}</div>
    </div>
    <div class="novo-color-swatches">
      <novo-color-swatch
        *ngFor="let color of colors"
        [color]="color"
        (onClick)="handleBlockChange($event)"
        (onHover)="handleSwatchHover($event)"
      ></novo-color-swatch>
    </div>
    <div class="novo-color-input">
      <input [value]="hex.replace('#', '')" (onChange)="handleValueChange($event)" />
    </div>
  `,
                styleUrls: ['./color-picker.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
            }]
    }], null, { width: [{
            type: Input
        }], colors: [{
            type: Input
        }], color: [{
            type: Input
        }], onChange: [{
            type: Output
        }], onChangeComplete: [{
            type: Output
        }], onSwatchHover: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5SCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLEtBQUssRUFBbUMsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7O0lBU3RGLDRDQUtxQjtJQUZuQiw0T0FBcUMsK05BQUE7SUFFdEMsaUJBQW9COzs7SUFIbkIsZ0NBQWU7O0FBYXZCLE1BQU0sT0FBTyx3QkFBd0I7SUF0QnJDO1FBdUJFLG1DQUFtQztRQUMxQixVQUFLLEdBQW9CLEdBQUcsQ0FBQztRQUN0QywrQkFBK0I7UUFDdEIsV0FBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEgsVUFBSyxHQUFnQztZQUM1QyxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7UUFDUSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNuQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQVFsRCxnQkFBVyxHQUE4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b21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb2xvciwgSFNMLCBIU0xBLCBIU1YsIEhTVkEsIFJHQiwgUkdCQSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbG9yLXV0aWxzL0NvbG9yVXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNvbG9yLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29sb3ItcHJldmlld1wiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiY3VycmVudENvbG9yLmhleFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tY29sb3ItcHJldmlldy10ZXh0XCI+e3sgaGV4IH19PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29sb3Itc3dhdGNoZXNcIj5cbiAgICAgIDxub3ZvLWNvbG9yLXN3YXRjaFxuICAgICAgICAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCJcbiAgICAgICAgW2NvbG9yXT1cImNvbG9yXCJcbiAgICAgICAgKG9uQ2xpY2spPVwiaGFuZGxlQmxvY2tDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIChvbkhvdmVyKT1cImhhbmRsZVN3YXRjaEhvdmVyKCRldmVudClcIlxuICAgICAgPjwvbm92by1jb2xvci1zd2F0Y2g+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29sb3ItaW5wdXRcIj5cbiAgICAgIDxpbnB1dCBbdmFsdWVdPVwiaGV4LnJlcGxhY2UoJyMnLCAnJylcIiAob25DaGFuZ2UpPVwiaGFuZGxlVmFsdWVDaGFuZ2UoJGV2ZW50KVwiIC8+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL2NvbG9yLXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db2xvclBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKiogUGl4ZWwgdmFsdWUgZm9yIHBpY2tlciB3aWR0aCAqL1xuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nIHwgbnVtYmVyID0gMjc2O1xuICAvKiogQ29sb3Igc3F1YXJlcyB0byBkaXNwbGF5ICovXG4gIEBJbnB1dCgpIGNvbG9ycyA9IFsnI0ZGNjkwMCcsICcjRkNCOTAwJywgJyM3QkRDQjUnLCAnIzAwRDA4NCcsICcjOEVEMUZDJywgJyMwNjkzRTMnLCAnI0FCQjhDMycsICcjRUIxNDRDJywgJyNGNzhEQTcnLCAnIzk5MDBFRiddO1xuICBASW5wdXQoKSBjb2xvcjogSFNMQSB8IEhTVkEgfCBSR0JBIHwgc3RyaW5nID0ge1xuICAgIGg6IDI1MCxcbiAgICBzOiAwLjUsXG4gICAgbDogMC4yLFxuICAgIGE6IDEsXG4gIH07XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2VDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb25Td2F0Y2hIb3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBoc2whOiBIU0w7XG4gIGhzdiE6IEhTVjtcbiAgcmdiITogUkdCO1xuICBoZXghOiBzdHJpbmc7XG4gIGN1cnJlbnRDb2xvciE6IENvbG9yO1xuICBjaGFuZ2VzITogU3Vic2NyaXB0aW9uO1xuXG4gIHN3YXRjaFN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgIHdpZHRoOiAnMzBweCcsXG4gICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICBmb250U2l6ZTogJzAnLFxuICB9O1xuICBpbnB1dDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgIGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6ICcwJyxcbiAgICBib3JkZXJUb3BMZWZ0UmFkaXVzOiAnMCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlNmVjZjAnLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgIGRpc3BsYXk6ICdpbmxpbmUnLFxuICAgIGZvbnRTaXplOiAnMTRweCcsXG4gICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgcGFkZGluZzogJzAnLFxuICAgIHBhZGRpbmdMZWZ0OiAnNnB4JyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGNvbG9yOiAnIzY1Nzc4NicsXG4gIH07XG5cbiAgZm9jdXMoY29sb3I6IHN0cmluZykge1xuICAgIHJldHVybiB7IGJveFNoYWRvdzogYDAgMCA0cHggJHtjb2xvcn1gIH07XG4gIH1cblxuICBoYW5kbGVCbG9ja0NoYW5nZSh7IGhleCwgJGV2ZW50IH06IGFueSkge1xuICAgIGlmIChDb2xvci5pc1ZhbGlkSGV4KGhleCkpIHtcbiAgICAgIC8vIHRoaXMuaGV4ID0gaGV4O1xuICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UoeyBoZXgsIHNvdXJjZTogJ2hleCcgfSwgJGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVWYWx1ZUNoYW5nZSh7IGRhdGEsICRldmVudCB9OiBhbnkpIHtcbiAgICB0aGlzLmhhbmRsZUJsb2NrQ2hhbmdlKHsgaGV4OiBkYXRhLCAkZXZlbnQgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLm9uQ2hhbmdlLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5vbkNoYW5nZUNvbXBsZXRlLmVtaXQoeCkpO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3IENvbG9yKHRoaXMuY29sb3IpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2V0U3RhdGUobmV3IENvbG9yKHRoaXMuY29sb3IpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgc2V0U3RhdGUoZGF0YTogQ29sb3IpIHtcbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IGRhdGE7XG4gICAgdGhpcy5oc2wgPSBkYXRhLmhzbDtcbiAgICB0aGlzLmhzdiA9IGRhdGEuaHN2O1xuICAgIHRoaXMucmdiID0gZGF0YS5yZ2I7XG4gICAgdGhpcy5oZXggPSBkYXRhLmhleDtcbiAgICB0aGlzLmFmdGVyVmFsaWRDaGFuZ2UoKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZShkYXRhLCAkZXZlbnQpIHtcbiAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihkYXRhLmhleCk7XG4gICAgaWYgKGNvbG9yLmlzVmFsaWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoY29sb3IpO1xuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHsgY29sb3IsICRldmVudCB9KTtcbiAgICAgIHRoaXMuYWZ0ZXJWYWxpZENoYW5nZSgpO1xuICAgIH1cbiAgfVxuICAvKiogaG9vayBmb3IgY29tcG9uZW50cyBhZnRlciBhIGNvbXBsZXRlIGNoYW5nZSAqL1xuICBhZnRlclZhbGlkQ2hhbmdlKCkge31cblxuICBoYW5kbGVTd2F0Y2hIb3ZlcigkZXZlbnQpIHtcbiAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcigkZXZlbnQuaGV4KTtcbiAgICBpZiAoY29sb3IuaXNWYWxpZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShjb2xvcik7XG4gICAgICB0aGlzLm9uU3dhdGNoSG92ZXIuZW1pdCh7IGNvbG9yLCAkZXZlbnQgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=