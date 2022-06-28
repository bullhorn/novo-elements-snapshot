import { __decorate, __metadata } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { BooleanInput as BooleanInputUtil } from '../../../utils';
import { Subscription } from 'rxjs';
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
        /** . */
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
    }
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    ngAfterViewInit() {
        this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
    }
    checkPanel() {
        if (this.triggerOnFocus && this.element) {
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
    }
}
NovoPickerToggleElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerToggleElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoPickerToggleElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: { picker: ["for", "picker"], icon: "icon", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], triggerOnFocus: "triggerOnFocus", disabled: "disabled" }, host: { listeners: { "focus": "_button.focus()" }, properties: { "attr.tabindex": "disabled ? null : -1", "class.novo-toggle-active": "picker && picker.opened", "class.novo-accent": "picker && picker.color === \"accent\"", "class.novo-warn": "picker && picker.color === \"warn\"" }, classAttribute: "novo-picker-toggle" }, viewQueries: [{ propertyName: "_button", first: true, predicate: ["button"], descendants: true }, { propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoPickerToggle"], usesOnChanges: true, ngImport: i0, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", styles: [""], components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i2.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    BooleanInputUtil(),
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
                    }, exportAs: 'novoPickerToggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", styles: [""] }]
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
            }], disabled: [{
                type: Input
            }], _button: [{
                type: ViewChild,
                args: ['button']
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC90b2dnbGUvcGlja2VyLXRvZ2dsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC90b2dnbGUvcGlja2VyLXRvZ2dsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUVSLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksSUFBSSxnQkFBZ0IsRUFBRSxNQUFPLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBTSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFeEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7OztBQW9CN0QsTUFBTSxPQUFPLHVCQUF1QjtJQTBDbEMsWUFDVSxXQUF1QixFQUN2QixHQUFzQixFQUNQLGVBQXVCLEVBQ0QsVUFBNEI7UUFIakUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFFZSxlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQTdDbkUsa0JBQWEsR0FB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QUM1RCxtQkFBbUIsRUFBRSxtQ0FBbUM7d0JBQ3hELFNBQVMsRUFBRSxpQkFBaUI7cUJBQzdCLFlBQ1Msa0JBQWtCLGlCQUNiLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OzBCQStDNUMsU0FBUzsyQkFBQyxVQUFVOzswQkFDcEIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxlQUFlOzRDQTFDdkIsTUFBTTtzQkFBbkIsS0FBSzt1QkFBQyxLQUFLO2dCQUVILElBQUk7c0JBQVosS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdlLFNBQVM7c0JBQTdCLEtBQUs7dUJBQUMsWUFBWTtnQkFLbkIsY0FBYztzQkFGYixLQUFLO2dCQU1GLFFBQVE7c0JBRFgsS0FBSztnQkFjZSxPQUFPO3NCQUEzQixTQUFTO3VCQUFDLFFBQVE7Z0JBSW5CLE9BQU87c0JBRE4sU0FBUzt1QkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IGFzIEJvb2xlYW5JbnB1dFV0aWwgfSAgZnJvbSAnLi4vLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9CdXR0b25FbGVtZW50IH0gZnJvbSAnLi4vLi4vYnV0dG9uJztcbmltcG9ydCB7IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21tb24vb3ZlcmxheSc7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50LCBOT1ZPX0ZPUk1fRklFTEQgfSBmcm9tICcuLi9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcGlja2VyLXRvZ2dsZScsXG4gIHRlbXBsYXRlVXJsOiAncGlja2VyLXRvZ2dsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tcGlja2VyLXRvZ2dsZScsXG4gICAgLy8gQWx3YXlzIHNldCB0aGUgdGFiaW5kZXggdG8gLTEgc28gdGhhdCBpdCBkb2Vzbid0IG92ZXJsYXAgd2l0aCBhbnkgY3VzdG9tIHRhYmluZGV4IHRoZVxuICAgIC8vIGNvbnN1bWVyIG1heSBoYXZlIHByb3ZpZGVkLCB3aGlsZSBzdGlsbCBiZWluZyBhYmxlIHRvIHJlY2VpdmUgZm9jdXMuXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAtMScsXG4gICAgJ1tjbGFzcy5ub3ZvLXRvZ2dsZS1hY3RpdmVdJzogJ3BpY2tlciAmJiBwaWNrZXIub3BlbmVkJyxcbiAgICAnW2NsYXNzLm5vdm8tYWNjZW50XSc6ICdwaWNrZXIgJiYgcGlja2VyLmNvbG9yID09PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm5vdm8td2Fybl0nOiAncGlja2VyICYmIHBpY2tlci5jb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICcoZm9jdXMpJzogJ19idXR0b24uZm9jdXMoKScsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbm92b1BpY2tlclRvZ2dsZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBEYXRlcGlja2VyIGluc3RhbmNlIHRoYXQgdGhlIGJ1dHRvbiB3aWxsIHRvZ2dsZS4gKi9cbiAgQElucHV0KCdmb3InKSBwaWNrZXI6IFQ7XG5cbiAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuXG4gIC8qKiBUYWJpbmRleCBmb3IgdGhlIHRvZ2dsZS4gKi9cbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciB8IG51bGw7XG5cbiAgLyoqIFNjcmVlbnJlYWRlciBsYWJlbCBmb3IgdGhlIGJ1dHRvbi4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqIC4gKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dFV0aWwoKVxuICB0cmlnZ2VyT25Gb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5waWNrZXIpIHtcbiAgICAgIHJldHVybiAodGhpcy5waWNrZXIgYXMgYW55KS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gISF0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqIFVuZGVybHlpbmcgYnV0dG9uIGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvbicpIF9idXR0b246IE5vdm9CdXR0b25FbGVtZW50O1xuXG4gIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcblxuICBlbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgZGVmYXVsdFRhYkluZGV4OiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOT1ZPX0ZPUk1fRklFTEQpIHByaXZhdGUgX2Zvcm1GaWVsZDogTm92b0ZpZWxkRWxlbWVudCxcbiAgKSB7XG4gICAgY29uc3QgcGFyc2VkVGFiSW5kZXggPSBOdW1iZXIoZGVmYXVsdFRhYkluZGV4KTtcbiAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VkVGFiSW5kZXggfHwgcGFyc2VkVGFiSW5kZXggPT09IDAgPyBwYXJzZWRUYWJJbmRleCA6IG51bGw7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMucGlja2VyKSB7XG4gICAgICB0aGlzLl93YXRjaFN0YXRlQ2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5fZm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSB8fCB0aGlzLl9lbGVtZW50UmVmO1xuICB9XG5cbiAgY2hlY2tQYW5lbCgpIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyT25Gb2N1cyAmJiB0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUGFuZWwoZXZlbnQ/OiBFdmVudCkge1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLm92ZXJsYXkucGFyZW50ID0gdGhpcy5lbGVtZW50O1xuICAgIGlmICghdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBCRUdJTjogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlUGFuZWwoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheS5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LnBhbmVsT3BlbjtcbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoU3RhdGVDaGFuZ2VzKCkge1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iLCI8bm92by1idXR0b25cbiAgI2J1dHRvblxuICB0aGVtZT1cImljb25cIlxuICBbaWNvbl09XCJpY29uXCJcbiAgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCInZGlhbG9nJ1wiXG4gIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gLTEgOiB0YWJJbmRleFwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIChjbGljayk9XCJ0b2dnbGVQYW5lbCgkZXZlbnQpXCI+PC9ub3ZvLWJ1dHRvbj5cblxuPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cImVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvbm92by1vdmVybGF5LXRlbXBsYXRlPiJdfQ==