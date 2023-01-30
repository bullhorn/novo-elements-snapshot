import { __decorate, __metadata } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BooleanInput } from '../../../utils';
import { NovoButtonElement } from '../../button';
import { NovoOverlayTemplateComponent } from '../../common/overlay';
import { NovoFieldElement, NOVO_FORM_FIELD } from '../field';
import * as i0 from "@angular/core";
import * as i1 from "../../button/Button";
import * as i2 from "../../common/overlay/Overlay";
import * as i3 from "../../common/directives/theme.directive";
import * as i4 from "../field";
export class NovoPickerToggleElement {
    constructor(_elementRef, cdr, defaultTabIndex, _formField) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this._formField = _formField;
        this._stateChanges = Subscription.EMPTY;
        this._onDestroy = new Subject();
        /** Determines whether the overlay is triggered on input focus or solely button click. */
        this.triggerOnFocus = false;
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        if (this._disabled === undefined && this.picker) {
            return this.picker.disabled;
        }
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnChanges(changes) {
        if (changes.picker) {
            this._watchStateChanges();
        }
    }
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    ngAfterViewInit() {
        this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
    }
    checkPanel() {
        if (this.triggerOnFocus && this._formField._control.focused) {
            this.openPanel();
        }
    }
    togglePanel(event) {
        this.cdr.detectChanges();
        this.overlay.parent = this.element;
        if (!this.overlay.panelOpen) {
            this.openPanel(event);
        }
        else {
            this.closePanel(event);
        }
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel(event) {
        if (!this.overlay.panelOpen) {
            this.overlay.parent = this.element;
            this.overlay.openPanel();
        }
    }
    closePanel(event) {
        this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    _watchStateChanges() {
        this._formField._control?.stateChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.checkPanel();
        });
    }
}
NovoPickerToggleElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerToggleElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoPickerToggleElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: { picker: ["for", "picker"], icon: "icon", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], triggerOnFocus: "triggerOnFocus", overlayId: "overlayId", width: "width", disabled: "disabled" }, host: { listeners: { "focus": "_button.focus()" }, properties: { "attr.tabindex": "disabled ? null : -1", "class.novo-toggle-active": "picker && picker.opened", "class.novo-accent": "picker && picker.color === \"accent\"", "class.novo-warn": "picker && picker.color === \"warn\"" }, classAttribute: "novo-picker-toggle" }, viewQueries: [{ propertyName: "_button", first: true, predicate: ["button"], descendants: true }, { propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoPickerToggle"], usesOnChanges: true, ngImport: i0, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [width]=\"width\" [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", styles: [""], components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i2.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoPickerToggleElement.prototype, "triggerOnFocus", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerToggleElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-picker-toggle', host: {
                        class: 'novo-picker-toggle',
                        // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                        // consumer may have provided, while still being able to receive focus.
                        '[attr.tabindex]': 'disabled ? null : -1',
                        '[class.novo-toggle-active]': 'picker && picker.opened',
                        '[class.novo-accent]': 'picker && picker.color === "accent"',
                        '[class.novo-warn]': 'picker && picker.color === "warn"',
                        '(focus)': '_button.focus()',
                    }, exportAs: 'novoPickerToggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [width]=\"width\" [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }, { type: i4.NovoFieldElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_FORM_FIELD]
                }] }]; }, propDecorators: { picker: [{
                type: Input,
                args: ['for']
            }], icon: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], triggerOnFocus: [{
                type: Input
            }], overlayId: [{
                type: Input
            }], width: [{
                type: Input
            }], disabled: [{
                type: Input
            }], _button: [{
                type: ViewChild,
                args: ['button']
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC90b2dnbGUvcGlja2VyLXRvZ2dsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC90b2dnbGUvcGlja2VyLXRvZ2dsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUdMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBRVIsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7QUFvQjdELE1BQU0sT0FBTyx1QkFBdUI7SUFpRGxDLFlBQ1UsV0FBdUIsRUFDdkIsR0FBc0IsRUFDUCxlQUF1QixFQUNELFVBQTRCO1FBSGpFLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FB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cnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIEF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IE5vdm9CdXR0b25FbGVtZW50IH0gZnJvbSAnLi4vLi4vYnV0dG9uJztcbmltcG9ydCB7IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21tb24vb3ZlcmxheSc7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50LCBOT1ZPX0ZPUk1fRklFTEQgfSBmcm9tICcuLi9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcGlja2VyLXRvZ2dsZScsXG4gIHRlbXBsYXRlVXJsOiAncGlja2VyLXRvZ2dsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tcGlja2VyLXRvZ2dsZScsXG4gICAgLy8gQWx3YXlzIHNldCB0aGUgdGFiaW5kZXggdG8gLTEgc28gdGhhdCBpdCBkb2Vzbid0IG92ZXJsYXAgd2l0aCBhbnkgY3VzdG9tIHRhYmluZGV4IHRoZVxuICAgIC8vIGNvbnN1bWVyIG1heSBoYXZlIHByb3ZpZGVkLCB3aGlsZSBzdGlsbCBiZWluZyBhYmxlIHRvIHJlY2VpdmUgZm9jdXMuXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAtMScsXG4gICAgJ1tjbGFzcy5ub3ZvLXRvZ2dsZS1hY3RpdmVdJzogJ3BpY2tlciAmJiBwaWNrZXIub3BlbmVkJyxcbiAgICAnW2NsYXNzLm5vdm8tYWNjZW50XSc6ICdwaWNrZXIgJiYgcGlja2VyLmNvbG9yID09PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm5vdm8td2Fybl0nOiAncGlja2VyICYmIHBpY2tlci5jb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICcoZm9jdXMpJzogJ19idXR0b24uZm9jdXMoKScsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbm92b1BpY2tlclRvZ2dsZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKiBEYXRlcGlja2VyIGluc3RhbmNlIHRoYXQgdGhlIGJ1dHRvbiB3aWxsIHRvZ2dsZS4gKi9cbiAgQElucHV0KCdmb3InKSBwaWNrZXI6IFQ7XG5cbiAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuXG4gIC8qKiBUYWJpbmRleCBmb3IgdGhlIHRvZ2dsZS4gKi9cbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciB8IG51bGw7XG5cbiAgLyoqIFNjcmVlbnJlYWRlciBsYWJlbCBmb3IgdGhlIGJ1dHRvbi4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqIERldGVybWluZXMgd2hldGhlciB0aGUgb3ZlcmxheSBpcyB0cmlnZ2VyZWQgb24gaW5wdXQgZm9jdXMgb3Igc29sZWx5IGJ1dHRvbiBjbGljay4gKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIHRyaWdnZXJPbkZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEFuIGlkIHRvIHNlbGVjdCB0aGUgY29ycmVjdCBvdmVybGF5LiovXG4gIEBJbnB1dCgpIG92ZXJsYXlJZDogc3RyaW5nO1xuXG4gIC8qKiBXaWR0aCB0byBwYXNzIHRvIG92ZXJsYXkuKi9cbiAgQElucHV0KCkgd2lkdGg6IHN0cmluZztcblxuICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMucGlja2VyKSB7XG4gICAgICByZXR1cm4gKHRoaXMucGlja2VyIGFzIGFueSkuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBVbmRlcmx5aW5nIGJ1dHRvbiBlbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCdidXR0b24nKSBfYnV0dG9uOiBOb3ZvQnV0dG9uRWxlbWVudDtcblxuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXG4gIG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG5cbiAgZWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIGRlZmF1bHRUYWJJbmRleDogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTk9WT19GT1JNX0ZJRUxEKSBwcml2YXRlIF9mb3JtRmllbGQ6IE5vdm9GaWVsZEVsZW1lbnQsXG4gICkge1xuICAgIGNvbnN0IHBhcnNlZFRhYkluZGV4ID0gTnVtYmVyKGRlZmF1bHRUYWJJbmRleCk7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlZFRhYkluZGV4IHx8IHBhcnNlZFRhYkluZGV4ID09PSAwID8gcGFyc2VkVGFiSW5kZXggOiBudWxsO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnBpY2tlcikge1xuICAgICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5fZm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSB8fCB0aGlzLl9lbGVtZW50UmVmO1xuICB9XG5cbiAgY2hlY2tQYW5lbCgpIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyT25Gb2N1cyAmJiB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wuZm9jdXNlZCkge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVQYW5lbChldmVudD86IEV2ZW50KSB7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMub3ZlcmxheS5wYXJlbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXkucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLm9wZW5QYW5lbChldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEJFR0lOOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXG4gIG9wZW5QYW5lbChldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXkucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLm92ZXJsYXkucGFyZW50ID0gdGhpcy5lbGVtZW50O1xuICAgICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlUGFuZWwoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheS5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LnBhbmVsT3BlbjtcbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoU3RhdGVDaGFuZ2VzKCkge1xuICAgIHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbD8uc3RhdGVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrUGFuZWwoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPG5vdm8tYnV0dG9uXG4gICNidXR0b25cbiAgdGhlbWU9XCJpY29uXCJcbiAgW2ljb25dPVwiaWNvblwiXG4gIFthdHRyLmFyaWEtaGFzcG9wdXBdPVwiJ2RpYWxvZydcIlxuICBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/IC0xIDogdGFiSW5kZXhcIlxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAoY2xpY2spPVwidG9nZ2xlUGFuZWwoJGV2ZW50KVwiPjwvbm92by1idXR0b24+XG5cbjxub3ZvLW92ZXJsYXktdGVtcGxhdGUgW3dpZHRoXT1cIndpZHRoXCIgW3BhcmVudF09XCJlbGVtZW50XCIgcG9zaXRpb249XCJhYm92ZS1iZWxvd1wiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT4iXX0=