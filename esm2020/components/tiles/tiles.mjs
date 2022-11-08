// NG2
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
NovoTilesElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTilesElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTilesElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTilesElement, selector: "novo-tiles", inputs: { name: "name", options: "options", required: "required", disabled: ["controlDisabled", "disabled"] }, outputs: { onChange: "onChange", onSelectedOptionClick: "onSelectedOptionClick", onDisabledOptionClick: "onDisabledOptionClick" }, providers: [TILES_VALUE_ACCESSOR], usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:inline-block;position:relative;color:var(--color-selection-overlay)}:host input{-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;height:0!important;border:none!important;position:absolute}:host>.tile-container{display:flex;text-align:center;background-color:var(--color-background);border:solid thin var(--color-selection);border-radius:var(--border-radius-round);position:relative;align-items:center}:host>.tile-container .tile{padding:0 var(--spacing-md);line-height:3.2rem;height:100%;z-index:1;position:relative;cursor:pointer;letter-spacing:.02em}:host>.tile-container .tile:not(:last-child){border-right:solid thin var(--color-selection)}:host>.tile-container .tile:not(.disabled){color:var(--color-selection)}:host>.tile-container .tile:not(.disabled).active{box-shadow:inset 3px 2px 4px #0000004d;color:var(--color-selection-contrast);background:var(--color-selection)}:host>.tile-container .tile.active{font-weight:600}:host>.tile-container .tile:hover{box-shadow:0 3px 7px #00000026,0 1px 2px #00000026}:host>.tile-container .tile.disabled{cursor:not-allowed}:host>.tile-container .tile label{z-index:1;position:relative;cursor:inherit}:host>.tile-container.active{color:var(--color-selection);border-color:var(--color-selection);box-shadow:0 0 15px 3px #4a89dc40}:host>.tile-container.disabled{border-color:var(--color-disabled);color:var(--color-disabled)}\n"], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTilesElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tiles', providers: [TILES_VALUE_ACCESSOR], template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:inline-block;position:relative;color:var(--color-selection-overlay)}:host input{-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;height:0!important;border:none!important;position:absolute}:host>.tile-container{display:flex;text-align:center;background-color:var(--color-background);border:solid thin var(--color-selection);border-radius:var(--border-radius-round);position:relative;align-items:center}:host>.tile-container .tile{padding:0 var(--spacing-md);line-height:3.2rem;height:100%;z-index:1;position:relative;cursor:pointer;letter-spacing:.02em}:host>.tile-container .tile:not(:last-child){border-right:solid thin var(--color-selection)}:host>.tile-container .tile:not(.disabled){color:var(--color-selection)}:host>.tile-container .tile:not(.disabled).active{box-shadow:inset 3px 2px 4px #0000004d;color:var(--color-selection-contrast);background:var(--color-selection)}:host>.tile-container .tile.active{font-weight:600}:host>.tile-container .tile:hover{box-shadow:0 3px 7px #00000026,0 1px 2px #00000026}:host>.tile-container .tile.disabled{cursor:not-allowed}:host>.tile-container .tile label{z-index:1;position:relative;cursor:inherit}:host>.tile-container.active{color:var(--color-selection);border-color:var(--color-selection);box-shadow:0 0 15px 3px #4a89dc40}:host>.tile-container.disabled{border-color:var(--color-disabled);color:var(--color-disabled)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { name: [{
                type: Input
            }], options: [{
                type: Input
            }], required: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: ['controlDisabled']
            }], onChange: [{
                type: Output
            }], onSelectedOptionClick: [{
                type: Output
            }], onDisabledOptionClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3RpbGVzL3RpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFFOUMsc0RBQXNEO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQWtDRixNQUFNLE9BQU8sZ0JBQWdCO0lBd0IzQixZQUFvQixPQUFtQixFQUFVLEdBQXNCO1FBQW5ELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXRCdkUsU0FBSSxHQUFXLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFNL0MsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsMEJBQXFCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUQsMEJBQXFCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUQsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUNuQixlQUFVLEdBQVEsSUFBSSxDQUFDO1FBQ3ZCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFHaEMs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QywrQ0FFdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5QlQ7NEZBR1UsZ0JBQWdCO2tCQWhDNUIsU0FBUzsrQkFDRSxZQUFZLGFBQ1gsQ0FBQyxvQkFBb0IsQ0FBQyxZQUV2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTTtpSUFJL0MsSUFBSTtzQkFESCxLQUFLO2dCQUdOLE9BQU87c0JBRE4sS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7Z0JBR04sUUFBUTtzQkFEUCxLQUFLO3VCQUFDLGlCQUFpQjtnQkFHeEIsUUFBUTtzQkFEUCxNQUFNO2dCQUdQLHFCQUFxQjtzQkFEcEIsTUFBTTtnQkFHUCxxQkFBcUI7c0JBRHBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgVElMRVNfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvVGlsZXNFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRpbGVzJyxcbiAgcHJvdmlkZXJzOiBbVElMRVNfVkFMVUVfQUNDRVNTT1JdLFxuICBzdHlsZVVybHM6IFsnLi90aWxlcy5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInRpbGUtY29udGFpbmVyXCIgW2NsYXNzLmFjdGl2ZV09XCJmb2N1c2VkXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwidGlsZVwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgX29wdGlvbnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogb3B0aW9uLmNoZWNrZWQsIGRpc2FibGVkOiBvcHRpb24uZGlzYWJsZWQgfVwiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3QoJGV2ZW50LCBvcHRpb24pXCJcbiAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbCB8fCBvcHRpb25cIlxuICAgICAgPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzcz1cInRpbGVzLWlucHV0XCJcbiAgICAgICAgICBbbmFtZV09XCJuYW1lXCJcbiAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24uY2hlY2tlZCB8fCBvcHRpb24udmFsdWUgfHwgb3B0aW9uXCJcbiAgICAgICAgICBbYXR0ci5pZF09XCJuYW1lICsgaVwiXG4gICAgICAgICAgKGNoYW5nZSk9XCJzZWxlY3QoJGV2ZW50LCBvcHRpb24pXCJcbiAgICAgICAgICAoZm9jdXMpPVwic2V0Rm9jdXModHJ1ZSlcIlxuICAgICAgICAgIChibHVyKT1cInNldEZvY3VzKGZhbHNlKVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGxhYmVsIFthdHRyLmZvcl09XCJuYW1lICsgaVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJvcHRpb24ubGFiZWwgfHwgb3B0aW9uXCI+XG4gICAgICAgICAge3sgb3B0aW9uLmxhYmVsIHx8IG9wdGlvbiB9fVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGlsZXNFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG4gIEBJbnB1dCgpXG4gIG9wdGlvbnM6IGFueTtcbiAgQElucHV0KClcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgnY29udHJvbERpc2FibGVkJylcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpXG4gIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uU2VsZWN0ZWRPcHRpb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvbkRpc2FibGVkT3B0aW9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9vcHRpb25zOiBBcnJheTxhbnk+ID0gW107XG4gIHB1YmxpYyBhY3RpdmVUaWxlOiBhbnkgPSBudWxsO1xuICBwdWJsaWMgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG1vZGVsOiBhbnk7XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIHB1YmxpYyBzZXRGb2N1cyhmb2N1czogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNlZCA9IGZvY3VzO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZSB8fCAnJztcbiAgICB0aGlzLnNldHVwT3B0aW9ucygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZS5vcHRpb25zICYmIGNoYW5nZS5vcHRpb25zLmN1cnJlbnRWYWx1ZSAmJiAhY2hhbmdlLm9wdGlvbnMuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZSB8fCAnJztcbiAgICAgIHRoaXMuX29wdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMuc2V0dXBPcHRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0dXBPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCAmJiAodGhpcy5vcHRpb25zWzBdLnZhbHVlID09PSB1bmRlZmluZWQgfHwgdGhpcy5vcHRpb25zWzBdLnZhbHVlID09PSBudWxsKSkge1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMub3B0aW9ucy5tYXAoKHgpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHsgdmFsdWU6IHgsIGxhYmVsOiB4LCBjaGVja2VkOiB0aGlzLm1vZGVsID09PSB4IH07XG4gICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLnNldFRpbGUoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMub3B0aW9ucy5tYXAoKHgpID0+IHtcbiAgICAgICAgeC5jaGVja2VkID0gdGhpcy5tb2RlbCA9PT0geC52YWx1ZSB8fCAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmlkID09PSB4LnZhbHVlKTtcbiAgICAgICAgaWYgKHguY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMuc2V0VGlsZSh4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNlbGVjdChldmVudCwgaXRlbSkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmICghaXRlbS5kaXNhYmxlZCkge1xuICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xuICAgICAgICB0aGlzLm9uU2VsZWN0ZWRPcHRpb25DbGljay5lbWl0KGl0ZW0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9uLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcbiAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChpdGVtLnZhbHVlKTtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZShpdGVtLnZhbHVlKTtcbiAgICAgIHRoaXMuc2V0VGlsZShpdGVtKTtcbiAgICAgIHRoaXMubW9kZWwgPSBpdGVtLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uRGlzYWJsZWRPcHRpb25DbGljay5lbWl0KGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNldFRpbGUoaXRlbSkge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRpbGUgPSBpdGVtLnZhbHVlO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIGlmICghSGVscGVycy5pc0JsYW5rKG1vZGVsKSkge1xuICAgICAgdGhpcy5zZXR1cE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxufVxuIl19