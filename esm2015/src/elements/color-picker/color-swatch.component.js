import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
NovoColorSwatchComponent.decorators = [
    { type: Component, args: [{
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
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
      .swatch {
        border-radius: 0.4rem;
      }
    `]
            },] }
];
NovoColorSwatchComponent.propDecorators = {
    color: [{ type: Input }],
    style: [{ type: Input }],
    focusStyle: [{ type: Input }],
    focus: [{ type: Input }],
    onClick: [{ type: Output }],
    onHover: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Itc3dhdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb2xvci1waWNrZXIvY29sb3Itc3dhdGNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBNEJ4RyxNQUFNLE9BQU8sd0JBQXdCO0lBMUJyQztRQTRCVyxVQUFLLEdBQThCLEVBQUUsQ0FBQztRQUN0QyxlQUFVLEdBQThCLEVBQUUsQ0FBQztRQUUxQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNsQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1QyxjQUFTLEdBQThCLEVBQUUsQ0FBQztRQUMxQyxnQkFBVyxHQUE4QixFQUFFLENBQUM7UUFDNUMsWUFBTyxHQUFHLEtBQUssQ0FBQztJQWdDbEIsQ0FBQztJQTlCQyxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsbUJBQ1osVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFlLEVBQ2hDLE1BQU0sRUFBRSxNQUFNLEVBQ2QsS0FBSyxFQUFFLE1BQU0sRUFDYixNQUFNLEVBQUUsU0FBUyxFQUNqQixRQUFRLEVBQUUsVUFBVSxFQUNwQixPQUFPLEVBQUUsTUFBTSxJQUNaLElBQUksQ0FBQyxLQUFLLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFDRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFdBQVcsbUNBQ1gsSUFBSSxDQUFDLFNBQVMsR0FDZCxJQUFJLENBQUMsVUFBVSxDQUNuQixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEUsQ0FBQztJQUNELGNBQWM7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxXQUFXLENBQUMsR0FBVyxFQUFFLE1BQU07UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsV0FBVyxDQUFDLEdBQVcsRUFBRSxNQUFNO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7O1lBbEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7Z0JBUUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07eUJBTjdDOzs7O0tBSUM7YUFHSjs7O29CQUVFLEtBQUs7b0JBQ0wsS0FBSzt5QkFDTCxLQUFLO29CQUNMLEtBQUs7c0JBQ0wsTUFBTTtzQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jb2xvci1zd2F0Y2gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwic3dhdGNoXCJcbiAgICAgIFtuZ1N0eWxlXT1cImN1cnJlbnRTdHlsZXMoKVwiXG4gICAgICBbYXR0ci50aXRsZV09XCJjb2xvclwiXG4gICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soY29sb3IsICRldmVudClcIlxuICAgICAgKGtleWRvd24uZW50ZXIpPVwiaGFuZGxlQ2xpY2soY29sb3IsICRldmVudClcIlxuICAgICAgKGZvY3VzKT1cImhhbmRsZUZvY3VzKClcIlxuICAgICAgKGJsdXIpPVwiaGFuZGxlRm9jdXNPdXQoKVwiXG4gICAgICAobW91c2VvdmVyKT1cImhhbmRsZUhvdmVyKGNvbG9yLCAkZXZlbnQpXCJcbiAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuc3dhdGNoIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29sb3JTd2F0Y2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBjb2xvciE6IHN0cmluZztcbiAgQElucHV0KCkgc3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgQElucHV0KCkgZm9jdXNTdHlsZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBASW5wdXQoKSBmb2N1cyE6IGJvb2xlYW47XG4gIEBPdXRwdXQoKSBvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvbkhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIGRpdlN0eWxlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBmb2N1c1N0eWxlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBpbkZvY3VzID0gZmFsc2U7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kaXZTdHlsZXMgPSB7XG4gICAgICBiYWNrZ3JvdW5kOiB0aGlzLmNvbG9yIGFzIHN0cmluZyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAuLi50aGlzLnN0eWxlLFxuICAgIH07XG4gIH1cbiAgY3VycmVudFN0eWxlcygpIHtcbiAgICB0aGlzLmZvY3VzU3R5bGVzID0ge1xuICAgICAgLi4udGhpcy5kaXZTdHlsZXMsXG4gICAgICAuLi50aGlzLmZvY3VzU3R5bGUsXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5mb2N1cyB8fCB0aGlzLmluRm9jdXMgPyB0aGlzLmZvY3VzU3R5bGVzIDogdGhpcy5kaXZTdHlsZXM7XG4gIH1cbiAgaGFuZGxlRm9jdXNPdXQoKSB7XG4gICAgdGhpcy5pbkZvY3VzID0gZmFsc2U7XG4gIH1cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgdGhpcy5pbkZvY3VzID0gdHJ1ZTtcbiAgfVxuICBoYW5kbGVIb3ZlcihoZXg6IHN0cmluZywgJGV2ZW50KSB7XG4gICAgdGhpcy5vbkhvdmVyLmVtaXQoeyBoZXgsICRldmVudCB9KTtcbiAgfVxuICBoYW5kbGVDbGljayhoZXg6IHN0cmluZywgJGV2ZW50KSB7XG4gICAgdGhpcy5vbkNsaWNrLmVtaXQoeyBoZXgsICRldmVudCB9KTtcbiAgfVxufVxuIl19