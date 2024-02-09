import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Color } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "./color-swatch.component";
import * as i2 from "@angular/common";
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
NovoColorPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoColorPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoColorPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoColorPickerComponent, selector: "novo-color-picker", inputs: { width: "width", colors: "colors", color: "color" }, outputs: { onChange: "onChange", onChangeComplete: "onChangeComplete", onSwatchHover: "onSwatchHover" }, usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:grid;grid-template-rows:6rem 1fr -webkit-min-content;grid-template-rows:6rem 1fr min-content;background-color:#fff;background-color:var(--background-bright, #ffffff);cursor:default;overflow:auto;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);border-radius:.4rem;width:18rem}:host .novo-color-preview{display:flex;align-items:center;justify-content:center}:host .novo-color-swatches{display:grid;grid-template-columns:repeat(6,2.4rem);grid-auto-rows:2.4rem;grid-gap:.4rem;margin:.4rem 0;justify-content:center}:host .novo-color-input{padding:.4rem .8rem}\n"], components: [{ type: i1.NovoColorSwatchComponent, selector: "novo-color-swatch", inputs: ["color", "style", "focusStyle", "focus"], outputs: ["onClick", "onHover"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoColorPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-color-picker', template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, preserveWhitespaces: false, styles: [":host{display:grid;grid-template-rows:6rem 1fr -webkit-min-content;grid-template-rows:6rem 1fr min-content;background-color:#fff;background-color:var(--background-bright, #ffffff);cursor:default;overflow:auto;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);border-radius:.4rem;width:18rem}:host .novo-color-preview{display:flex;align-items:center;justify-content:center}:host .novo-color-swatches{display:grid;grid-template-columns:repeat(6,2.4rem);grid-auto-rows:2.4rem;grid-gap:.4rem;margin:.4rem 0;justify-content:center}:host .novo-color-input{padding:.4rem .8rem}\n"] }]
        }], propDecorators: { width: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsS0FBSyxFQUFtQyxNQUFNLHFCQUFxQixDQUFDOzs7O0FBNkI3RSxNQUFNLE9BQU8sd0JBQXdCO0lBdEJyQztRQXVCRSxtQ0FBbUM7UUFDMUIsVUFBSyxHQUFvQixHQUFHLENBQUM7UUFDdEMsK0JBQStCO1FBQ3RCLFdBQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hILFVBQUssR0FBZ0M7WUFDNUMsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFDO1FBQ1EsYUFBUSxHQUFHLElBQUksWUFBWSxFQUE4QixDQUFDO1FBQzFELHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0Msa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBUWxELGdCQUFXLEdBQThCO1lBQ3ZDLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxZQUFZLEVBQUUsS0FBSztZQUNuQixRQUFRLEVBQUUsR0FBRztTQUNkLENB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UUFDcEMsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7O3NIQWhHVSx3QkFBd0I7MEdBQXhCLHdCQUF3QixxUEFwQnpCOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDs0RkFLVSx3QkFBd0I7a0JBdEJwQyxTQUFTOytCQUNFLG1CQUFtQixZQUNuQjs7Ozs7Ozs7Ozs7Ozs7O0dBZVQsbUJBRWdCLHVCQUF1QixDQUFDLE1BQU0sdUJBQzFCLEtBQUs7OEJBSWpCLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQU1JLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29sb3IsIEhTTCwgSFNMQSwgSFNWLCBIU1ZBLCBSR0IsIFJHQkEgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQ29sb3JQaWNrZXJDaGFuZ2VFdmVudCB7XG4gICRldmVudDogRXZlbnQ7XG4gIGNvbG9yOiBDb2xvcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jb2xvci1waWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbG9yLXByZXZpZXdcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImN1cnJlbnRDb2xvci5oZXhcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbG9yLXByZXZpZXctdGV4dFwiPnt7IGhleCB9fTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbG9yLXN3YXRjaGVzXCI+XG4gICAgICA8bm92by1jb2xvci1zd2F0Y2hcbiAgICAgICAgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiXG4gICAgICAgIFtjb2xvcl09XCJjb2xvclwiXG4gICAgICAgIChvbkNsaWNrKT1cImhhbmRsZUJsb2NrQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAob25Ib3Zlcik9XCJoYW5kbGVTd2F0Y2hIb3ZlcigkZXZlbnQpXCJcbiAgICAgID48L25vdm8tY29sb3Itc3dhdGNoPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbG9yLWlucHV0XCI+XG4gICAgICA8aW5wdXQgW3ZhbHVlXT1cImhleC5yZXBsYWNlKCcjJywgJycpXCIgKG9uQ2hhbmdlKT1cImhhbmRsZVZhbHVlQ2hhbmdlKCRldmVudClcIiAvPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9jb2xvci1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29sb3JQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqIFBpeGVsIHZhbHVlIGZvciBwaWNrZXIgd2lkdGggKi9cbiAgQElucHV0KCkgd2lkdGg6IHN0cmluZyB8IG51bWJlciA9IDI3NjtcbiAgLyoqIENvbG9yIHNxdWFyZXMgdG8gZGlzcGxheSAqL1xuICBASW5wdXQoKSBjb2xvcnMgPSBbJyNGRjY5MDAnLCAnI0ZDQjkwMCcsICcjN0JEQ0I1JywgJyMwMEQwODQnLCAnIzhFRDFGQycsICcjMDY5M0UzJywgJyNBQkI4QzMnLCAnI0VCMTQ0QycsICcjRjc4REE3JywgJyM5OTAwRUYnXTtcbiAgQElucHV0KCkgY29sb3I6IEhTTEEgfCBIU1ZBIHwgUkdCQSB8IHN0cmluZyA9IHtcbiAgICBoOiAyNTAsXG4gICAgczogMC41LFxuICAgIGw6IDAuMixcbiAgICBhOiAxLFxuICB9O1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9Db2xvclBpY2tlckNoYW5nZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2VDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb25Td2F0Y2hIb3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBoc2whOiBIU0w7XG4gIGhzdiE6IEhTVjtcbiAgcmdiITogUkdCO1xuICBoZXghOiBzdHJpbmc7XG4gIGN1cnJlbnRDb2xvciE6IENvbG9yO1xuICBjaGFuZ2VzITogU3Vic2NyaXB0aW9uO1xuXG4gIHN3YXRjaFN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgIHdpZHRoOiAnMzBweCcsXG4gICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICBmb250U2l6ZTogJzAnLFxuICB9O1xuICBpbnB1dDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgIGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6ICcwJyxcbiAgICBib3JkZXJUb3BMZWZ0UmFkaXVzOiAnMCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlNmVjZjAnLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgIGRpc3BsYXk6ICdpbmxpbmUnLFxuICAgIGZvbnRTaXplOiAnMTRweCcsXG4gICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgcGFkZGluZzogJzAnLFxuICAgIHBhZGRpbmdMZWZ0OiAnNnB4JyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGNvbG9yOiAnIzY1Nzc4NicsXG4gIH07XG5cbiAgZm9jdXMoY29sb3I6IHN0cmluZykge1xuICAgIHJldHVybiB7IGJveFNoYWRvdzogYDAgMCA0cHggJHtjb2xvcn1gIH07XG4gIH1cblxuICBoYW5kbGVCbG9ja0NoYW5nZSh7IGhleCwgJGV2ZW50IH06IGFueSkge1xuICAgIGlmIChDb2xvci5pc1ZhbGlkSGV4KGhleCkpIHtcbiAgICAgIC8vIHRoaXMuaGV4ID0gaGV4O1xuICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UoeyBoZXgsIHNvdXJjZTogJ2hleCcgfSwgJGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVWYWx1ZUNoYW5nZSh7IGRhdGEsICRldmVudCB9OiBhbnkpIHtcbiAgICB0aGlzLmhhbmRsZUJsb2NrQ2hhbmdlKHsgaGV4OiBkYXRhLCAkZXZlbnQgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLm9uQ2hhbmdlLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5vbkNoYW5nZUNvbXBsZXRlLmVtaXQoeCkpO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3IENvbG9yKHRoaXMuY29sb3IpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2V0U3RhdGUobmV3IENvbG9yKHRoaXMuY29sb3IpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgc2V0U3RhdGUoZGF0YTogQ29sb3IpIHtcbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IGRhdGE7XG4gICAgdGhpcy5oc2wgPSBkYXRhLmhzbDtcbiAgICB0aGlzLmhzdiA9IGRhdGEuaHN2O1xuICAgIHRoaXMucmdiID0gZGF0YS5yZ2I7XG4gICAgdGhpcy5oZXggPSBkYXRhLmhleDtcbiAgICB0aGlzLmFmdGVyVmFsaWRDaGFuZ2UoKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZShkYXRhLCAkZXZlbnQpIHtcbiAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcihkYXRhLmhleCk7XG4gICAgaWYgKGNvbG9yLmlzVmFsaWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoY29sb3IpO1xuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHsgY29sb3IsICRldmVudCB9KTtcbiAgICAgIHRoaXMuYWZ0ZXJWYWxpZENoYW5nZSgpO1xuICAgIH1cbiAgfVxuICAvKiogaG9vayBmb3IgY29tcG9uZW50cyBhZnRlciBhIGNvbXBsZXRlIGNoYW5nZSAqL1xuICBhZnRlclZhbGlkQ2hhbmdlKCkge31cblxuICBoYW5kbGVTd2F0Y2hIb3ZlcigkZXZlbnQpIHtcbiAgICBjb25zdCBjb2xvciA9IG5ldyBDb2xvcigkZXZlbnQuaGV4KTtcbiAgICBpZiAoY29sb3IuaXNWYWxpZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShjb2xvcik7XG4gICAgICB0aGlzLm9uU3dhdGNoSG92ZXIuZW1pdCh7IGNvbG9yLCAkZXZlbnQgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=