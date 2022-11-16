import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, Input, Output, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Helpers } from 'novo-elements/utils';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

// NG2
// Value accessor for the component (supports ngModel)
const TILES_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTilesElement),
    multi: true,
};
class NovoTilesElement {
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

// NG2
class NovoTilesModule {
}
NovoTilesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTilesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTilesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTilesModule, declarations: [NovoTilesElement], imports: [CommonModule, ReactiveFormsModule], exports: [NovoTilesElement] });
NovoTilesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTilesModule, imports: [[CommonModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTilesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ReactiveFormsModule],
                    declarations: [NovoTilesElement],
                    exports: [NovoTilesElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoTilesElement, NovoTilesModule };
//# sourceMappingURL=novo-elements-components-tiles.mjs.map
