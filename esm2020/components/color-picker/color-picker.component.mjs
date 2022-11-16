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
  `, isInline: true, styles: [":host{display:grid;grid-template-rows:6rem 1fr -webkit-min-content;grid-template-rows:6rem 1fr min-content;background-color:var(--color-background);cursor:default;overflow:auto;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);border-radius:.4rem;width:18rem}:host .novo-color-preview{display:flex;align-items:center;justify-content:center}:host .novo-color-swatches{display:grid;grid-template-columns:repeat(6,2.4rem);grid-auto-rows:2.4rem;grid-gap:.4rem;margin:.4rem 0;justify-content:center}:host .novo-color-input{padding:.4rem .8rem}\n"], components: [{ type: i1.NovoColorSwatchComponent, selector: "novo-color-swatch", inputs: ["color", "style", "focusStyle", "focus"], outputs: ["onClick", "onHover"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, preserveWhitespaces: false, styles: [":host{display:grid;grid-template-rows:6rem 1fr -webkit-min-content;grid-template-rows:6rem 1fr min-content;background-color:var(--color-background);cursor:default;overflow:auto;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);border-radius:.4rem;width:18rem}:host .novo-color-preview{display:flex;align-items:center;justify-content:center}:host .novo-color-swatches{display:grid;grid-template-columns:repeat(6,2.4rem);grid-auto-rows:2.4rem;grid-gap:.4rem;margin:.4rem 0;justify-content:center}:host .novo-color-input{padding:.4rem .8rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFnQyxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxLQUFLLEVBQW1DLE1BQU0scUJBQXFCLENBQUM7Ozs7QUF3QjdFLE1BQU0sT0FBTyx3QkFBd0I7SUF0QnJDO1FBdUJFLG1DQUFtQztRQUMxQixVQUFLLEdBQW9CLEdBQUcsQ0FBQztRQUN0QywrQkFBK0I7UUFDdEIsV0FBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEgsVUFBSyxHQUFnQztZQUM1QyxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7UUFDUSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNuQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQVFsRCxnQkFBVyxHQUE4QjtZQUN2QyxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsWUFBWSxFQUFFLEtBQUs7WUFDbkIsUUFBUSxFQUFFLEdBQUc7U0FDZCxDQUFDO1FBQ0YsVUFBSyxHQUE4QjtZQUNqQyxZQUFZLEVBQUUsS0FBSztZQUNuQixzQkFBc0IsRUFBRSxHQUFHO1lBQzNCLG1CQUFtQixFQUFFLEdBQUc7WUFDeEIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixTQUFTLEVBQUUsWUFBWTtZQUN2QixPQUFPLEVBQUUsUUFBUTtZQUNqQixRQUFRLEVBQUUsTUFBTTtZQUNoQixNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRSxHQUFHO1lBQ1osV0FBVyxFQUFFLEtBQUs7WUFDbEIsS0FBSyxFQUFFLE1BQU07WUFDYixLQUFLLEVBQUUsU0FBUztTQUNqQixDQUFDO0tBeURIO0lBdkRDLEtBQUssQ0FBQyxLQUFhO1FBQ2pCLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxLQUFLLEVBQUUsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQU87UUFDcEMsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQU87UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFXO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUNELGtEQUFrRDtJQUNsRCxnQkFBZ0IsS0FBSSxDQUFDO0lBRXJCLGlCQUFpQixDQUFDLE1BQU07UUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDOztzSEFoR1Usd0JBQXdCOzBHQUF4Qix3QkFBd0IscVBBcEJ6Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7NEZBS1Usd0JBQXdCO2tCQXRCcEMsU0FBUzsrQkFDRSxtQkFBbUIsWUFDbkI7Ozs7Ozs7Ozs7Ozs7OztHQWVULG1CQUVnQix1QkFBdUIsQ0FBQyxNQUFNLHVCQUMxQixLQUFLOzhCQUlqQixLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFNSSxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbG9yLCBIU0wsIEhTTEEsIEhTViwgSFNWQSwgUkdCLCBSR0JBIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY29sb3ItcGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by1jb2xvci1wcmV2aWV3XCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjdXJyZW50Q29sb3IuaGV4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1jb2xvci1wcmV2aWV3LXRleHRcIj57eyBoZXggfX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jb2xvci1zd2F0Y2hlc1wiPlxuICAgICAgPG5vdm8tY29sb3Itc3dhdGNoXG4gICAgICAgICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIlxuICAgICAgICBbY29sb3JdPVwiY29sb3JcIlxuICAgICAgICAob25DbGljayk9XCJoYW5kbGVCbG9ja0NoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgKG9uSG92ZXIpPVwiaGFuZGxlU3dhdGNoSG92ZXIoJGV2ZW50KVwiXG4gICAgICA+PC9ub3ZvLWNvbG9yLXN3YXRjaD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jb2xvci1pbnB1dFwiPlxuICAgICAgPGlucHV0IFt2YWx1ZV09XCJoZXgucmVwbGFjZSgnIycsICcnKVwiIChvbkNoYW5nZSk9XCJoYW5kbGVWYWx1ZUNoYW5nZSgkZXZlbnQpXCIgLz5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBQaXhlbCB2YWx1ZSBmb3IgcGlja2VyIHdpZHRoICovXG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmcgfCBudW1iZXIgPSAyNzY7XG4gIC8qKiBDb2xvciBzcXVhcmVzIHRvIGRpc3BsYXkgKi9cbiAgQElucHV0KCkgY29sb3JzID0gWycjRkY2OTAwJywgJyNGQ0I5MDAnLCAnIzdCRENCNScsICcjMDBEMDg0JywgJyM4RUQxRkMnLCAnIzA2OTNFMycsICcjQUJCOEMzJywgJyNFQjE0NEMnLCAnI0Y3OERBNycsICcjOTkwMEVGJ107XG4gIEBJbnB1dCgpIGNvbG9yOiBIU0xBIHwgSFNWQSB8IFJHQkEgfCBzdHJpbmcgPSB7XG4gICAgaDogMjUwLFxuICAgIHM6IDAuNSxcbiAgICBsOiAwLjIsXG4gICAgYTogMSxcbiAgfTtcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZUNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvblN3YXRjaEhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIGhzbCE6IEhTTDtcbiAgaHN2ITogSFNWO1xuICByZ2IhOiBSR0I7XG4gIGhleCE6IHN0cmluZztcbiAgY3VycmVudENvbG9yITogQ29sb3I7XG4gIGNoYW5nZXMhOiBTdWJzY3JpcHRpb247XG5cbiAgc3dhdGNoU3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgd2lkdGg6ICczMHB4JyxcbiAgICBoZWlnaHQ6ICczMHB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgIGZvbnRTaXplOiAnMCcsXG4gIH07XG4gIGlucHV0OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgYm9yZGVyQm90dG9tTGVmdFJhZGl1czogJzAnLFxuICAgIGJvcmRlclRvcExlZnRSYWRpdXM6ICcwJyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgI2U2ZWNmMCcsXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgZGlzcGxheTogJ2lubGluZScsXG4gICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICBoZWlnaHQ6ICczMHB4JyxcbiAgICBwYWRkaW5nOiAnMCcsXG4gICAgcGFkZGluZ0xlZnQ6ICc2cHgnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgY29sb3I6ICcjNjU3Nzg2JyxcbiAgfTtcblxuICBmb2N1cyhjb2xvcjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHsgYm94U2hhZG93OiBgMCAwIDRweCAke2NvbG9yfWAgfTtcbiAgfVxuXG4gIGhhbmRsZUJsb2NrQ2hhbmdlKHsgaGV4LCAkZXZlbnQgfTogYW55KSB7XG4gICAgaWYgKENvbG9yLmlzVmFsaWRIZXgoaGV4KSkge1xuICAgICAgLy8gdGhpcy5oZXggPSBoZXg7XG4gICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7IGhleCwgc291cmNlOiAnaGV4JyB9LCAkZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVZhbHVlQ2hhbmdlKHsgZGF0YSwgJGV2ZW50IH06IGFueSkge1xuICAgIHRoaXMuaGFuZGxlQmxvY2tDaGFuZ2UoeyBoZXg6IGRhdGEsICRldmVudCB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hhbmdlcyA9IHRoaXMub25DaGFuZ2UucGlwZShkZWJvdW5jZVRpbWUoMTAwKSkuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLm9uQ2hhbmdlQ29tcGxldGUuZW1pdCh4KSk7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXcgQ29sb3IodGhpcy5jb2xvcikpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXcgQ29sb3IodGhpcy5jb2xvcikpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzZXRTdGF0ZShkYXRhOiBDb2xvcikge1xuICAgIHRoaXMuY3VycmVudENvbG9yID0gZGF0YTtcbiAgICB0aGlzLmhzbCA9IGRhdGEuaHNsO1xuICAgIHRoaXMuaHN2ID0gZGF0YS5oc3Y7XG4gICAgdGhpcy5yZ2IgPSBkYXRhLnJnYjtcbiAgICB0aGlzLmhleCA9IGRhdGEuaGV4O1xuICAgIHRoaXMuYWZ0ZXJWYWxpZENoYW5nZSgpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKGRhdGEsICRldmVudCkge1xuICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKGRhdGEuaGV4KTtcbiAgICBpZiAoY29sb3IuaXNWYWxpZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShjb2xvcik7XG4gICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoeyBjb2xvciwgJGV2ZW50IH0pO1xuICAgICAgdGhpcy5hZnRlclZhbGlkQ2hhbmdlKCk7XG4gICAgfVxuICB9XG4gIC8qKiBob29rIGZvciBjb21wb25lbnRzIGFmdGVyIGEgY29tcGxldGUgY2hhbmdlICovXG4gIGFmdGVyVmFsaWRDaGFuZ2UoKSB7fVxuXG4gIGhhbmRsZVN3YXRjaEhvdmVyKCRldmVudCkge1xuICAgIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKCRldmVudC5oZXgpO1xuICAgIGlmIChjb2xvci5pc1ZhbGlkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKGNvbG9yKTtcbiAgICAgIHRoaXMub25Td2F0Y2hIb3Zlci5lbWl0KHsgY29sb3IsICRldmVudCB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==