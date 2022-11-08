import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
        this.divStyles = {
            background: this.color,
            height: '100%',
            width: '100%',
            cursor: 'pointer',
            position: 'relative',
            outline: 'none',
            ...this.style,
        };
    }
    currentStyles() {
        this.focusStyles = {
            ...this.divStyles,
            ...this.focusStyle,
        };
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
NovoColorSwatchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoColorSwatchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoColorSwatchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoColorSwatchComponent, selector: "novo-color-swatch", inputs: { color: "color", style: "style", focusStyle: "focusStyle", focus: "focus" }, outputs: { onClick: "onClick", onHover: "onHover" }, ngImport: i0, template: `
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
  `, isInline: true, styles: [".swatch{border-radius:.4rem}\n"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoColorSwatchComponent, decorators: [{
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
        }], propDecorators: { color: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Itc3dhdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvY29sb3ItcGlja2VyL2NvbG9yLXN3YXRjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBNEJ4RyxNQUFNLE9BQU8sd0JBQXdCO0lBMUJyQztRQTRCVyxVQUFLLEdBQThCLEVBQUUsQ0FBQztRQUN0QyxlQUFVLEdBQThCLEVBQUUsQ0FBQztRQUUxQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNsQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1QyxjQUFTLEdBQThCLEVBQUUsQ0FBQztRQUMxQyxnQkFBVyxHQUE4QixFQUFFLENBQUM7UUFDNUMsWUFBTyxHQUFHLEtBQUssQ0FBQztLQWdDakI7SUE5QkMsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQWU7WUFDaEMsTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLE9BQU8sRUFBRSxNQUFNO1lBQ2YsR0FBRyxJQUFJLENBQUMsS0FBSztTQUNkLENBQUM7SUFDSixDQUFDO0lBQ0QsYUFBYTtRQUNYLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDakIsR0FBRyxJQUFJLENBQUMsU0FBUztZQUNqQixHQUFHLElBQUksQ0FBQyxVQUFVO1NBQ25CLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsY0FBYztRQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUNELFdBQVcsQ0FBQyxHQUFXLEVBQUUsTUFBTTtRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxXQUFXLENBQUMsR0FBVyxFQUFFLE1BQU07UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDOztzSEF4Q1Usd0JBQXdCOzBHQUF4Qix3QkFBd0Isb01BeEJ6Qjs7Ozs7Ozs7Ozs7Ozs7R0FjVDs0RkFVVSx3QkFBd0I7a0JBMUJwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDtvQkFDRCxNQUFNLEVBQUU7d0JBQ047Ozs7S0FJQztxQkFDRjtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBRVUsS0FBSztzQkFBYixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDSSxPQUFPO3NCQUFoQixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNvbG9yLXN3YXRjaCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJzd2F0Y2hcIlxuICAgICAgW25nU3R5bGVdPVwiY3VycmVudFN0eWxlcygpXCJcbiAgICAgIFthdHRyLnRpdGxlXT1cImNvbG9yXCJcbiAgICAgIChjbGljayk9XCJoYW5kbGVDbGljayhjb2xvciwgJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bi5lbnRlcik9XCJoYW5kbGVDbGljayhjb2xvciwgJGV2ZW50KVwiXG4gICAgICAoZm9jdXMpPVwiaGFuZGxlRm9jdXMoKVwiXG4gICAgICAoYmx1cik9XCJoYW5kbGVGb2N1c091dCgpXCJcbiAgICAgIChtb3VzZW92ZXIpPVwiaGFuZGxlSG92ZXIoY29sb3IsICRldmVudClcIlxuICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICA+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5zd2F0Y2gge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwLjRyZW07XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db2xvclN3YXRjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbG9yITogc3RyaW5nO1xuICBASW5wdXQoKSBzdHlsZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBASW5wdXQoKSBmb2N1c1N0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIEBJbnB1dCgpIGZvY3VzITogYm9vbGVhbjtcbiAgQE91dHB1dCgpIG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG9uSG92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgZGl2U3R5bGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIGZvY3VzU3R5bGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIGluRm9jdXMgPSBmYWxzZTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRpdlN0eWxlcyA9IHtcbiAgICAgIGJhY2tncm91bmQ6IHRoaXMuY29sb3IgYXMgc3RyaW5nLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgIG91dGxpbmU6ICdub25lJyxcbiAgICAgIC4uLnRoaXMuc3R5bGUsXG4gICAgfTtcbiAgfVxuICBjdXJyZW50U3R5bGVzKCkge1xuICAgIHRoaXMuZm9jdXNTdHlsZXMgPSB7XG4gICAgICAuLi50aGlzLmRpdlN0eWxlcyxcbiAgICAgIC4uLnRoaXMuZm9jdXNTdHlsZSxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmZvY3VzIHx8IHRoaXMuaW5Gb2N1cyA/IHRoaXMuZm9jdXNTdHlsZXMgOiB0aGlzLmRpdlN0eWxlcztcbiAgfVxuICBoYW5kbGVGb2N1c091dCgpIHtcbiAgICB0aGlzLmluRm9jdXMgPSBmYWxzZTtcbiAgfVxuICBoYW5kbGVGb2N1cygpIHtcbiAgICB0aGlzLmluRm9jdXMgPSB0cnVlO1xuICB9XG4gIGhhbmRsZUhvdmVyKGhleDogc3RyaW5nLCAkZXZlbnQpIHtcbiAgICB0aGlzLm9uSG92ZXIuZW1pdCh7IGhleCwgJGV2ZW50IH0pO1xuICB9XG4gIGhhbmRsZUNsaWNrKGhleDogc3RyaW5nLCAkZXZlbnQpIHtcbiAgICB0aGlzLm9uQ2xpY2suZW1pdCh7IGhleCwgJGV2ZW50IH0pO1xuICB9XG59XG4iXX0=