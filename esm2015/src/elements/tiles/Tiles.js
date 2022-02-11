// NG2
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { Helpers } from '../../utils/Helpers';
// Value accessor for the component (supports ngModel)
const TILES_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTilesElement),
    multi: true,
};
export class NovoTilesElement {
    constructor(element, ref) {
        this.element = element;
        this.ref = ref;
        this.name = new Date().getTime().toString();
        this.disabled = false;
        this.onChange = new EventEmitter();
        this.onSelectedOptionClick = new EventEmitter();
        this.onDisabledOptionClick = new EventEmitter();
        this._options = [];
        this.activeTile = null;
        this.focused = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    setFocus(focus) {
        this.focused = focus;
    }
    ngAfterContentInit() {
        this.name = this.name || '';
        this.setupOptions();
    }
    ngOnChanges(change) {
        if (change.options && change.options.currentValue && !change.options.firstChange) {
            this.name = this.name || '';
            this._options = [];
            this.setupOptions();
        }
    }
    setupOptions() {
        if (this.options && this.options.length && (this.options[0].value === undefined || this.options[0].value === null)) {
            this._options = this.options.map((x) => {
                const item = { value: x, label: x, checked: this.model === x };
                if (item.checked) {
                    this.setTile(item);
                }
                return item;
            });
        }
        else {
            this._options = this.options.map((x) => {
                x.checked = this.model === x.value || (this.model && this.model.id === x.value);
                if (x.checked) {
                    this.setTile(x);
                }
                return x;
            });
        }
        this.ref.markForCheck();
    }
    select(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (!item.disabled) {
            if (item.checked) {
                this.onSelectedOptionClick.emit(item);
                return;
            }
            for (const option of this._options) {
                option.checked = false;
            }
            item.checked = !item.checked;
            this.onChange.emit(item.value);
            this.onModelChange(item.value);
            this.setTile(item);
            this.model = item.value;
        }
        else {
            this.onDisabledOptionClick.emit(item);
        }
        this.ref.markForCheck();
    }
    setTile(item) {
        if (item) {
            this.activeTile = item.value;
            this.ref.markForCheck();
        }
    }
    writeValue(model) {
        this.model = model;
        if (!Helpers.isBlank(model)) {
            this.setupOptions();
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
}
NovoTilesElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-tiles',
                providers: [TILES_VALUE_ACCESSOR],
                template: `
    <div class="tile-container" [class.active]="focused" [class.disabled]="disabled">
      <div
        class="tile"
        *ngFor="let option of _options; let i = index"
        [ngClass]="{ active: option.checked, disabled: option.disabled }"
        (click)="select($event, option)"
        [attr.data-automation-id]="option.label || option"
      >
        <input
          class="tiles-input"
          [name]="name"
          type="radio"
          [value]="option.checked || option.value || option"
          [attr.id]="name + i"
          (change)="select($event, option)"
          (focus)="setFocus(true)"
          (blur)="setFocus(false)"
          [disabled]="disabled"
        />
        <label [attr.for]="name + i" [attr.data-automation-id]="option.label || option">
          {{ option.label || option }}
        </label>
      </div>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoTilesElement.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
NovoTilesElement.propDecorators = {
    name: [{ type: Input }],
    options: [{ type: Input }],
    required: [{ type: Input }],
    disabled: [{ type: Input, args: ['controlDisabled',] }],
    onChange: [{ type: Output }],
    onSelectedOptionClick: [{ type: Output }],
    onDisabledOptionClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlsZXMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvdGlsZXMvVGlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTlDLHNEQUFzRDtBQUN0RCxNQUFNLG9CQUFvQixHQUFHO0lBQzNCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFpQ0YsTUFBTSxPQUFPLGdCQUFnQjtJQXdCM0IsWUFBb0IsT0FBbUIsRUFBVSxHQUFzQjtRQUFuRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF0QnZFLFNBQUksR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBTS9DLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELDBCQUFxQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlELDBCQUFxQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlELGFBQVEsR0FBZSxFQUFFLENBQUM7UUFDbkIsZUFBVSxH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RixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5QlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQWpEQyxVQUFVO1lBRlYsaUJBQWlCOzs7bUJBcURoQixLQUFLO3NCQUVMLEtBQUs7dUJBRUwsS0FBSzt1QkFFTCxLQUFLLFNBQUMsaUJBQWlCO3VCQUV2QixNQUFNO29DQUVOLE1BQU07b0NBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFQUFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFRJTEVTX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1RpbGVzRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10aWxlcycsXG4gIHByb3ZpZGVyczogW1RJTEVTX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidGlsZS1jb250YWluZXJcIiBbY2xhc3MuYWN0aXZlXT1cImZvY3VzZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJ0aWxlXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBfb3B0aW9uczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBvcHRpb24uY2hlY2tlZCwgZGlzYWJsZWQ6IG9wdGlvbi5kaXNhYmxlZCB9XCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdCgkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsIHx8IG9wdGlvblwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzPVwidGlsZXMtaW5wdXRcIlxuICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi5jaGVja2VkIHx8IG9wdGlvbi52YWx1ZSB8fCBvcHRpb25cIlxuICAgICAgICAgIFthdHRyLmlkXT1cIm5hbWUgKyBpXCJcbiAgICAgICAgICAoY2hhbmdlKT1cInNlbGVjdCgkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICAgIChmb2N1cyk9XCJzZXRGb2N1cyh0cnVlKVwiXG4gICAgICAgICAgKGJsdXIpPVwic2V0Rm9jdXMoZmFsc2UpXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgW2F0dHIuZm9yXT1cIm5hbWUgKyBpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbCB8fCBvcHRpb25cIj5cbiAgICAgICAgICB7eyBvcHRpb24ubGFiZWwgfHwgb3B0aW9uIH19XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UaWxlc0VsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcbiAgQElucHV0KClcbiAgb3B0aW9uczogYW55O1xuICBASW5wdXQoKVxuICByZXF1aXJlZDogYm9vbGVhbjtcbiAgQElucHV0KCdjb250cm9sRGlzYWJsZWQnKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KClcbiAgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgb25TZWxlY3RlZE9wdGlvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uRGlzYWJsZWRPcHRpb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX29wdGlvbnM6IEFycmF5PGFueT4gPSBbXTtcbiAgcHVibGljIGFjdGl2ZVRpbGU6IGFueSA9IG51bGw7XG4gIHB1YmxpYyBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbW9kZWw6IGFueTtcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgcHVibGljIHNldEZvY3VzKGZvY3VzOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkID0gZm9jdXM7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5uYW1lIHx8ICcnO1xuICAgIHRoaXMuc2V0dXBPcHRpb25zKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlLm9wdGlvbnMgJiYgY2hhbmdlLm9wdGlvbnMuY3VycmVudFZhbHVlICYmICFjaGFuZ2Uub3B0aW9ucy5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5uYW1lID0gdGhpcy5uYW1lIHx8ICcnO1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5zZXR1cE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBzZXR1cE9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoICYmICh0aGlzLm9wdGlvbnNbMF0udmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm9wdGlvbnNbMF0udmFsdWUgPT09IG51bGwpKSB7XG4gICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5vcHRpb25zLm1hcCgoeCkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0geyB2YWx1ZTogeCwgbGFiZWw6IHgsIGNoZWNrZWQ6IHRoaXMubW9kZWwgPT09IHggfTtcbiAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMuc2V0VGlsZShpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5vcHRpb25zLm1hcCgoeCkgPT4ge1xuICAgICAgICB4LmNoZWNrZWQgPSB0aGlzLm1vZGVsID09PSB4LnZhbHVlIHx8ICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaWQgPT09IHgudmFsdWUpO1xuICAgICAgICBpZiAoeC5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5zZXRUaWxlKHgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc2VsZWN0KGV2ZW50LCBpdGVtKSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKCFpdGVtLmRpc2FibGVkKSB7XG4gICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3RlZE9wdGlvbkNsaWNrLmVtaXQoaXRlbSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5fb3B0aW9ucykge1xuICAgICAgICBvcHRpb24uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpdGVtLmNoZWNrZWQgPSAhaXRlbS5jaGVja2VkO1xuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGl0ZW0udmFsdWUpO1xuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKGl0ZW0udmFsdWUpO1xuICAgICAgdGhpcy5zZXRUaWxlKGl0ZW0pO1xuICAgICAgdGhpcy5tb2RlbCA9IGl0ZW0udmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25EaXNhYmxlZE9wdGlvbkNsaWNrLmVtaXQoaXRlbSk7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc2V0VGlsZShpdGVtKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHRoaXMuYWN0aXZlVGlsZSA9IGl0ZW0udmFsdWU7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKG1vZGVsOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsobW9kZWwpKSB7XG4gICAgICB0aGlzLnNldHVwT3B0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG59XG4iXX0=