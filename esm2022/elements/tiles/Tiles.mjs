// NG2
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoTilesElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoTilesElement, selector: "novo-tiles", inputs: { name: "name", options: "options", required: "required", disabled: ["controlDisabled", "disabled"] }, outputs: { onChange: "onChange", onSelectedOptionClick: "onSelectedOptionClick", onDisabledOptionClick: "onDisabledOptionClick" }, providers: [TILES_VALUE_ACCESSOR], usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:inline-block;position:relative;color:#4a89dc}:host input{appearance:none!important;height:0!important;border:none!important;position:absolute}:host>.tile-container{display:flex;text-align:center;background-color:var(--background-bright);border:solid thin #4a89dc;border-radius:3px;position:relative;align-items:center}:host>.tile-container .tile{padding:0 1rem;line-height:3.2rem;height:100%;z-index:1;position:relative;cursor:pointer;letter-spacing:.02em}:host>.tile-container .tile:not(:last-child){border-right:solid thin #4a89dc}:host>.tile-container .tile:not(.disabled).active{box-shadow:inset 3px 2px 4px #0000004d;color:#fff;background:#4a89dc}:host>.tile-container .tile:not(.disabled):hover{box-shadow:0 3px 7px #00000026,0 1px 2px #00000026}:host>.tile-container .tile.active{font-weight:600}:host>.tile-container .tile.disabled{cursor:not-allowed;opacity:.4}:host>.tile-container .tile label{z-index:1;position:relative;cursor:inherit}:host>.tile-container.active{color:#4a89dc;border-color:#4a89dc;box-shadow:0 0 15px 3px #4a89dc40}:host>.tile-container.disabled{border-color:#d1d1d1;opacity:.4;pointer-events:auto;cursor:not-allowed}:host>.tile-container.disabled .tile{pointer-events:none;opacity:1}:host>.tile-container.disabled .tile:hover{box-shadow:none}:host>.tile-container.disabled .tile.active{box-shadow:inset 3px 2px 4px #0000004d}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoTilesElement, decorators: [{
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:inline-block;position:relative;color:#4a89dc}:host input{appearance:none!important;height:0!important;border:none!important;position:absolute}:host>.tile-container{display:flex;text-align:center;background-color:var(--background-bright);border:solid thin #4a89dc;border-radius:3px;position:relative;align-items:center}:host>.tile-container .tile{padding:0 1rem;line-height:3.2rem;height:100%;z-index:1;position:relative;cursor:pointer;letter-spacing:.02em}:host>.tile-container .tile:not(:last-child){border-right:solid thin #4a89dc}:host>.tile-container .tile:not(.disabled).active{box-shadow:inset 3px 2px 4px #0000004d;color:#fff;background:#4a89dc}:host>.tile-container .tile:not(.disabled):hover{box-shadow:0 3px 7px #00000026,0 1px 2px #00000026}:host>.tile-container .tile.active{font-weight:600}:host>.tile-container .tile.disabled{cursor:not-allowed;opacity:.4}:host>.tile-container .tile label{z-index:1;position:relative;cursor:inherit}:host>.tile-container.active{color:#4a89dc;border-color:#4a89dc;box-shadow:0 0 15px 3px #4a89dc40}:host>.tile-container.disabled{border-color:#d1d1d1;opacity:.4;pointer-events:auto;cursor:not-allowed}:host>.tile-container.disabled .tile{pointer-events:none;opacity:1}:host>.tile-container.disabled .tile:hover{box-shadow:none}:host>.tile-container.disabled .tile.active{box-shadow:inset 3px 2px 4px #0000004d}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90aWxlcy9UaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUU5QyxzREFBc0Q7QUFDdEQsTUFBTSxvQkFBb0IsR0FBRztJQUMzQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBa0NGLE1BQU0sT0FBTyxnQkFBZ0I7SUF3QjNCLFlBQW9CLE9BQW1CLEVBQVUsR0FBc0I7UUFBbkQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBdEJ2RSxTQUFJLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQU0vQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCwwQkFBcUIsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5RCwwQkFBcUIsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5RCxhQUFRLEdBQWUsRUFBRSxDQUFDO1FBQ25CLGVBQVUsR0FBUSxJQUFJLENBQUM7UUFDdkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUdoQyxrQkFBYSxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNuQyxtQkFBYyxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUVzQyxDQUFDO0lBRXBFLFFBQVEsQ0FBQyxLQUFjO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFxQjtRQUMvQixJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNoRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2xILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDckMsTUFBTSxJQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQy9ELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEI7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hGLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQjtnQkFDRCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDaEIsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxPQUFPO2FBQ1I7WUFFRCxLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOytHQW5IVSxnQkFBZ0I7bUdBQWhCLGdCQUFnQix1UkE5QmhCLENBQUMsb0JBQW9CLENBQUMsK0NBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUOzs0RkFJVSxnQkFBZ0I7a0JBaEM1QixTQUFTOytCQUNFLFlBQVksYUFDWCxDQUFDLG9CQUFvQixDQUFDLFlBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJULG1CQUVnQix1QkFBdUIsQ0FBQyxNQUFNO2lJQUkvQyxJQUFJO3NCQURILEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7dUJBQUMsaUJBQWlCO2dCQUd4QixRQUFRO3NCQURQLE1BQU07Z0JBR1AscUJBQXFCO3NCQURwQixNQUFNO2dCQUdQLHFCQUFxQjtzQkFEcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFQUFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFRJTEVTX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1RpbGVzRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10aWxlcycsXG4gIHByb3ZpZGVyczogW1RJTEVTX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidGlsZS1jb250YWluZXJcIiBbY2xhc3MuYWN0aXZlXT1cImZvY3VzZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJ0aWxlXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBfb3B0aW9uczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBvcHRpb24uY2hlY2tlZCwgZGlzYWJsZWQ6IG9wdGlvbi5kaXNhYmxlZCB9XCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdCgkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsIHx8IG9wdGlvblwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzPVwidGlsZXMtaW5wdXRcIlxuICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi5jaGVja2VkIHx8IG9wdGlvbi52YWx1ZSB8fCBvcHRpb25cIlxuICAgICAgICAgIFthdHRyLmlkXT1cIm5hbWUgKyBpXCJcbiAgICAgICAgICAoY2hhbmdlKT1cInNlbGVjdCgkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICAgIChmb2N1cyk9XCJzZXRGb2N1cyh0cnVlKVwiXG4gICAgICAgICAgKGJsdXIpPVwic2V0Rm9jdXMoZmFsc2UpXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgW2F0dHIuZm9yXT1cIm5hbWUgKyBpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbCB8fCBvcHRpb25cIj5cbiAgICAgICAgICB7eyBvcHRpb24ubGFiZWwgfHwgb3B0aW9uIH19XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vVGlsZXMuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RpbGVzRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmcgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuICBASW5wdXQoKVxuICBvcHRpb25zOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICBASW5wdXQoJ2NvbnRyb2xEaXNhYmxlZCcpXG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKVxuICBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdGVkT3B0aW9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgb25EaXNhYmxlZE9wdGlvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfb3B0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuICBwdWJsaWMgYWN0aXZlVGlsZTogYW55ID0gbnVsbDtcbiAgcHVibGljIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtb2RlbDogYW55O1xuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBwdWJsaWMgc2V0Rm9jdXMoZm9jdXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzZWQgPSBmb2N1cztcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLm5hbWUgfHwgJyc7XG4gICAgdGhpcy5zZXR1cE9wdGlvbnMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2Uub3B0aW9ucyAmJiBjaGFuZ2Uub3B0aW9ucy5jdXJyZW50VmFsdWUgJiYgIWNoYW5nZS5vcHRpb25zLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLm5hbWUgfHwgJyc7XG4gICAgICB0aGlzLl9vcHRpb25zID0gW107XG4gICAgICB0aGlzLnNldHVwT3B0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIHNldHVwT3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5sZW5ndGggJiYgKHRoaXMub3B0aW9uc1swXS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMub3B0aW9uc1swXS52YWx1ZSA9PT0gbnVsbCkpIHtcbiAgICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKCh4KSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB7IHZhbHVlOiB4LCBsYWJlbDogeCwgY2hlY2tlZDogdGhpcy5tb2RlbCA9PT0geCB9O1xuICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5zZXRUaWxlKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKCh4KSA9PiB7XG4gICAgICAgIHguY2hlY2tlZCA9IHRoaXMubW9kZWwgPT09IHgudmFsdWUgfHwgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5pZCA9PT0geC52YWx1ZSk7XG4gICAgICAgIGlmICh4LmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLnNldFRpbGUoeCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHg7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzZWxlY3QoZXZlbnQsIGl0ZW0pIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIWl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGVkT3B0aW9uQ2xpY2suZW1pdChpdGVtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbi5jaGVja2VkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGl0ZW0uY2hlY2tlZCA9ICFpdGVtLmNoZWNrZWQ7XG4gICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoaXRlbS52YWx1ZSk7XG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoaXRlbS52YWx1ZSk7XG4gICAgICB0aGlzLnNldFRpbGUoaXRlbSk7XG4gICAgICB0aGlzLm1vZGVsID0gaXRlbS52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkRpc2FibGVkT3B0aW9uQ2xpY2suZW1pdChpdGVtKTtcbiAgICB9XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzZXRUaWxlKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgdGhpcy5hY3RpdmVUaWxlID0gaXRlbS52YWx1ZTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayhtb2RlbCkpIHtcbiAgICAgIHRoaXMuc2V0dXBPcHRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==