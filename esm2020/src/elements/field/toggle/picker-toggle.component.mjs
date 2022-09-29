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
NovoPickerToggleElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: { picker: ["for", "picker"], icon: "icon", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], triggerOnFocus: "triggerOnFocus", overlayId: "overlayId", disabled: "disabled" }, host: { listeners: { "focus": "_button.focus()" }, properties: { "attr.tabindex": "disabled ? null : -1", "class.novo-toggle-active": "picker && picker.opened", "class.novo-accent": "picker && picker.color === \"accent\"", "class.novo-warn": "picker && picker.color === \"warn\"" }, classAttribute: "novo-picker-toggle" }, viewQueries: [{ propertyName: "_button", first: true, predicate: ["button"], descendants: true }, { propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoPickerToggle"], usesOnChanges: true, ngImport: i0, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", styles: [""], components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i2.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
            }], overlayId: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC90b2dnbGUvcGlja2VyLXRvZ2dsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC90b2dnbGUvcGlja2VyLXRvZ2dsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUdMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBRVIsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7QUFvQjdELE1BQU0sT0FBTyx1QkFBdUI7SUE4Q2xDLFlBQ1UsV0FBdUIsRUFDdkIsR0FBc0IsRUFDUCxlQUF1QixFQUNELFVBQTRCO1FBSGpFLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FB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QUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDckYsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7cUhBaEhVLHVCQUF1Qiw2RUFpRHJCLFVBQVUsOEJBQ0QsZUFBZTt5R0FsRDFCLHVCQUF1Qiw2ckJBeUN2Qiw0QkFBNEIscUdDcEZ6QyxnV0FXd0I7QURrRHRCO0lBREMsWUFBWSxFQUFFOzsrREFDaUI7NEZBbEJyQix1QkFBdUI7a0JBbEJuQyxTQUFTOytCQUNFLG9CQUFvQixRQUd4Qjt3QkFDSixLQUFLLEVBQUUsb0JBQW9CO3dCQUMzQix3RkFBd0Y7d0JBQ3hGLHVFQUF1RTt3QkFDdkUsaUJBQWlCLEVBQUUsc0JBQXNCO3dCQUN6Qyw0QkFBNEIsRUFBRSx5QkFBeUI7d0JBQ3ZELHFCQUFxQixFQUFFLHFDQUFxQzt3QkFDNUQsbUJBQW1CLEVBQUUsbUNBQW1DO3dCQUN4RCxTQUFTLEVBQUUsaUJBQWlCO3FCQUM3QixZQUNTLGtCQUFrQixpQkFDYixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzswQkFtRDVDLFNBQVM7MkJBQUMsVUFBVTs7MEJBQ3BCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZUFBZTs0Q0E3Q3ZCLE1BQU07c0JBQW5CLEtBQUs7dUJBQUMsS0FBSztnQkFFSCxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHZSxTQUFTO3NCQUE3QixLQUFLO3VCQUFDLFlBQVk7Z0JBS25CLGNBQWM7c0JBRmIsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUlGLFFBQVE7c0JBRFgsS0FBSztnQkFjZSxPQUFPO3NCQUEzQixTQUFTO3VCQUFDLFFBQVE7Z0JBSW5CLE9BQU87c0JBRE4sU0FBUzt1QkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgTm92b0J1dHRvbkVsZW1lbnQgfSBmcm9tICcuLi8uLi9idXR0b24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbW1vbi9vdmVybGF5JztcbmltcG9ydCB7IE5vdm9GaWVsZEVsZW1lbnQsIE5PVk9fRk9STV9GSUVMRCB9IGZyb20gJy4uL2ZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1waWNrZXItdG9nZ2xlJyxcbiAgdGVtcGxhdGVVcmw6ICdwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BpY2tlci10b2dnbGUuY29tcG9uZW50LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1waWNrZXItdG9nZ2xlJyxcbiAgICAvLyBBbHdheXMgc2V0IHRoZSB0YWJpbmRleCB0byAtMSBzbyB0aGF0IGl0IGRvZXNuJ3Qgb3ZlcmxhcCB3aXRoIGFueSBjdXN0b20gdGFiaW5kZXggdGhlXG4gICAgLy8gY29uc3VtZXIgbWF5IGhhdmUgcHJvdmlkZWQsIHdoaWxlIHN0aWxsIGJlaW5nIGFibGUgdG8gcmVjZWl2ZSBmb2N1cy5cbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IC0xJyxcbiAgICAnW2NsYXNzLm5vdm8tdG9nZ2xlLWFjdGl2ZV0nOiAncGlja2VyICYmIHBpY2tlci5vcGVuZWQnLFxuICAgICdbY2xhc3Mubm92by1hY2NlbnRdJzogJ3BpY2tlciAmJiBwaWNrZXIuY29sb3IgPT09IFwiYWNjZW50XCInLFxuICAgICdbY2xhc3Mubm92by13YXJuXSc6ICdwaWNrZXIgJiYgcGlja2VyLmNvbG9yID09PSBcIndhcm5cIicsXG4gICAgJyhmb2N1cyknOiAnX2J1dHRvbi5mb2N1cygpJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdub3ZvUGlja2VyVG9nZ2xlJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50PFQgPSBhbnk+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9zdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIERhdGVwaWNrZXIgaW5zdGFuY2UgdGhhdCB0aGUgYnV0dG9uIHdpbGwgdG9nZ2xlLiAqL1xuICBASW5wdXQoJ2ZvcicpIHBpY2tlcjogVDtcblxuICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG5cbiAgLyoqIFRhYmluZGV4IGZvciB0aGUgdG9nZ2xlLiAqL1xuICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyIHwgbnVsbDtcblxuICAvKiogU2NyZWVucmVhZGVyIGxhYmVsIGZvciB0aGUgYnV0dG9uLiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBvdmVybGF5IGlzIHRyaWdnZXJlZCBvbiBpbnB1dCBmb2N1cyBvciBzb2xlbHkgYnV0dG9uIGNsaWNrLiAqL1xuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgdHJpZ2dlck9uRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogQW4gaWQgdG8gc2VsZWN0IHRoZSBjb3JyZWN0IG92ZXJsYXkuKi9cbiAgQElucHV0KCkgb3ZlcmxheUlkOiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRvZ2dsZSBidXR0b24gaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnBpY2tlcikge1xuICAgICAgcmV0dXJuICh0aGlzLnBpY2tlciBhcyBhbnkpLmRpc2FibGVkO1xuICAgIH1cblxuICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAvKiogVW5kZXJseWluZyBidXR0b24gZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnYnV0dG9uJykgX2J1dHRvbjogTm92b0J1dHRvbkVsZW1lbnQ7XG5cbiAgLyoqIEVsZW1lbnQgZm9yIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuXG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSBkZWZhdWx0VGFiSW5kZXg6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fRk9STV9GSUVMRCkgcHJpdmF0ZSBfZm9ybUZpZWxkOiBOb3ZvRmllbGRFbGVtZW50LFxuICApIHtcbiAgICBjb25zdCBwYXJzZWRUYWJJbmRleCA9IE51bWJlcihkZWZhdWx0VGFiSW5kZXgpO1xuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZWRUYWJJbmRleCB8fCBwYXJzZWRUYWJJbmRleCA9PT0gMCA/IHBhcnNlZFRhYkluZGV4IDogbnVsbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5waWNrZXIpIHtcbiAgICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl93YXRjaFN0YXRlQ2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuX2Zvcm1GaWVsZC5nZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCkgfHwgdGhpcy5fZWxlbWVudFJlZjtcbiAgfVxuXG4gIGNoZWNrUGFuZWwoKSB7XG4gICAgaWYgKHRoaXMudHJpZ2dlck9uRm9jdXMgJiYgdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLmZvY3VzZWQpIHtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUGFuZWwoZXZlbnQ/OiBFdmVudCkge1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLm92ZXJsYXkucGFyZW50ID0gdGhpcy5lbGVtZW50O1xuICAgIGlmICghdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBCRUdJTjogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vdmVybGF5LnBhcmVudCA9IHRoaXMuZWxlbWVudDtcbiAgICAgIHRoaXMub3ZlcmxheS5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVBhbmVsKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5ICYmIHRoaXMub3ZlcmxheS5wYW5lbE9wZW47XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFN0YXRlQ2hhbmdlcygpIHtcbiAgICB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2w/LnN0YXRlQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja1BhbmVsKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIjxub3ZvLWJ1dHRvblxuICAjYnV0dG9uXG4gIHRoZW1lPVwiaWNvblwiXG4gIFtpY29uXT1cImljb25cIlxuICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cIidkaWFsb2cnXCJcbiAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyAtMSA6IHRhYkluZGV4XCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgKGNsaWNrKT1cInRvZ2dsZVBhbmVsKCRldmVudClcIj48L25vdm8tYnV0dG9uPlxuXG48bm92by1vdmVybGF5LXRlbXBsYXRlIFtwYXJlbnRdPVwiZWxlbWVudFwiIHBvc2l0aW9uPVwiYWJvdmUtYmVsb3dcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+Il19