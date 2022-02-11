import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoButtonElement } from '../../button';
import { NovoOverlayTemplateComponent } from '../../common/overlay';
import { NovoFieldElement, NOVO_FORM_FIELD } from '../field';
import * as i0 from "@angular/core";
import * as i1 from "../field";
import * as i2 from "../../button/Button";
import * as i3 from "../../common/overlay/Overlay";
const _c0 = ["button"];
const _c1 = ["*"];
export class NovoPickerToggleElement {
    constructor(_elementRef, cdr, defaultTabIndex, _formField) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this._formField = _formField;
        this._stateChanges = Subscription.EMPTY;
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
    togglePanel(event) {
        this.cdr.detectChanges();
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
        // const pickerStateChanged = this.picker ? this.picker.stateChanges : observableOf();
        // const inputStateChanged = this.picker && this.picker.pickerInput ? this.picker.pickerInput.stateChanges : observableOf();
        // const pickerToggled = this.picker ? merge(this.picker.openedStream, this.picker.closedStream) : observableOf();
        // this._stateChanges.unsubscribe();
        // this._stateChanges = merge(pickerStateChanged, inputStateChanged, pickerToggled).subscribe(() => this.cdr.markForCheck());
    }
}
NovoPickerToggleElement.ɵfac = function NovoPickerToggleElement_Factory(t) { return new (t || NovoPickerToggleElement)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵinjectAttribute('tabindex'), i0.ɵɵdirectiveInject(NOVO_FORM_FIELD, 8)); };
NovoPickerToggleElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoPickerToggleElement, selectors: [["novo-picker-toggle"]], viewQuery: function NovoPickerToggleElement_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
        i0.ɵɵviewQuery(NovoOverlayTemplateComponent, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._button = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.overlay = _t.first);
    } }, hostAttrs: [1, "novo-picker-toggle"], hostVars: 7, hostBindings: function NovoPickerToggleElement_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("focus", function NovoPickerToggleElement_focus_HostBindingHandler() { return ctx._button.focus(); });
    } if (rf & 2) {
        i0.ɵɵattribute("tabindex", ctx.disabled ? null : 0 - 1);
        i0.ɵɵclassProp("novo-toggle-active", ctx.picker && ctx.picker.opened)("novo-accent", ctx.picker && ctx.picker.color === "accent")("novo-warn", ctx.picker && ctx.picker.color === "warn");
    } }, inputs: { picker: ["for", "picker"], icon: "icon", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], disabled: "disabled" }, exportAs: ["novoPickerToggle"], features: [i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 4, vars: 5, consts: [["theme", "icon", 3, "icon", "disabled", "click"], ["button", ""], ["position", "above-below", 3, "parent"]], template: function NovoPickerToggleElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "button", 0, 1);
        i0.ɵɵlistener("click", function NovoPickerToggleElement_Template_button_click_0_listener($event) { return ctx.togglePanel($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "novo-overlay-template", 2);
        i0.ɵɵprojection(3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("icon", ctx.icon)("disabled", ctx.disabled);
        i0.ɵɵattribute("aria-haspopup", "dialog")("tabindex", ctx.disabled ? 0 - 1 : ctx.tabIndex);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("parent", ctx.element);
    } }, directives: [i2.NovoButtonElement, i3.NovoOverlayTemplateComponent], styles: [""], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoPickerToggleElement, [{
        type: Component,
        args: [{
                selector: 'novo-picker-toggle',
                templateUrl: 'picker-toggle.component.html',
                styleUrls: ['picker-toggle.component.scss'],
                host: {
                    class: 'novo-picker-toggle',
                    // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                    // consumer may have provided, while still being able to receive focus.
                    '[attr.tabindex]': 'disabled ? null : -1',
                    '[class.novo-toggle-active]': 'picker && picker.opened',
                    '[class.novo-accent]': 'picker && picker.color === "accent"',
                    '[class.novo-warn]': 'picker && picker.color === "warn"',
                    '(focus)': '_button.focus()',
                },
                exportAs: 'novoPickerToggle',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                type: Attribute,
                args: ['tabindex']
            }] }, { type: i1.NovoFieldElement, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [NOVO_FORM_FIELD]
            }] }]; }, { picker: [{
            type: Input,
            args: ['for']
        }], icon: [{
            type: Input
        }], tabIndex: [{
            type: Input
        }], ariaLabel: [{
            type: Input,
            args: ['aria-label']
        }], disabled: [{
            type: Input
        }], _button: [{
            type: ViewChild,
            args: ['button']
        }], overlay: [{
            type: ViewChild,
            args: [NovoOverlayTemplateComponent]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZmllbGQvdG9nZ2xlL3BpY2tlci10b2dnbGUuY29tcG9uZW50LnRzIiwiZWxlbWVudHMvZmllbGQvdG9nZ2xlL3BpY2tlci10b2dnbGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUVSLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7Ozs7OztBQW9CN0QsTUFBTSxPQUFPLHVCQUF1QjtJQXFDbEMsWUFDVSxXQUF1QixFQUN2QixHQUFzQixFQUNQLGVBQXVCLEVBQ0QsVUFBNEI7UUFIakUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFFZSxlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQXhDbkUsa0JBQWEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBMEN6QyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0MsSUFB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QkFBbUIsRUFBRSxtQ0FBbUM7b0JBQ3hELFNBQVMsRUFBRSxpQkFBaUI7aUJBQzdCO2dCQUNELFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7c0JBeUNJLFNBQVM7dUJBQUMsVUFBVTs7c0JBQ3BCLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsZUFBZTt3QkFyQ3ZCLE1BQU07a0JBQW5CLEtBQUs7bUJBQUMsS0FBSztZQUVILElBQUk7a0JBQVosS0FBSztZQUdHLFFBQVE7a0JBQWhCLEtBQUs7WUFHZSxTQUFTO2tCQUE3QixLQUFLO21CQUFDLFlBQVk7WUFJZixRQUFRO2tCQURYLEtBQUs7WUFjZSxPQUFPO2tCQUEzQixTQUFTO21CQUFDLFFBQVE7WUFJbkIsT0FBTztrQkFETixTQUFTO21CQUFDLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIEF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9CdXR0b25FbGVtZW50IH0gZnJvbSAnLi4vLi4vYnV0dG9uJztcbmltcG9ydCB7IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21tb24vb3ZlcmxheSc7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50LCBOT1ZPX0ZPUk1fRklFTEQgfSBmcm9tICcuLi9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcGlja2VyLXRvZ2dsZScsXG4gIHRlbXBsYXRlVXJsOiAncGlja2VyLXRvZ2dsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tcGlja2VyLXRvZ2dsZScsXG4gICAgLy8gQWx3YXlzIHNldCB0aGUgdGFiaW5kZXggdG8gLTEgc28gdGhhdCBpdCBkb2Vzbid0IG92ZXJsYXAgd2l0aCBhbnkgY3VzdG9tIHRhYmluZGV4IHRoZVxuICAgIC8vIGNvbnN1bWVyIG1heSBoYXZlIHByb3ZpZGVkLCB3aGlsZSBzdGlsbCBiZWluZyBhYmxlIHRvIHJlY2VpdmUgZm9jdXMuXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAtMScsXG4gICAgJ1tjbGFzcy5ub3ZvLXRvZ2dsZS1hY3RpdmVdJzogJ3BpY2tlciAmJiBwaWNrZXIub3BlbmVkJyxcbiAgICAnW2NsYXNzLm5vdm8tYWNjZW50XSc6ICdwaWNrZXIgJiYgcGlja2VyLmNvbG9yID09PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm5vdm8td2Fybl0nOiAncGlja2VyICYmIHBpY2tlci5jb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICcoZm9jdXMpJzogJ19idXR0b24uZm9jdXMoKScsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbm92b1BpY2tlclRvZ2dsZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUGlja2VyVG9nZ2xlRWxlbWVudDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBEYXRlcGlja2VyIGluc3RhbmNlIHRoYXQgdGhlIGJ1dHRvbiB3aWxsIHRvZ2dsZS4gKi9cbiAgQElucHV0KCdmb3InKSBwaWNrZXI6IFQ7XG5cbiAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuXG4gIC8qKiBUYWJpbmRleCBmb3IgdGhlIHRvZ2dsZS4gKi9cbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciB8IG51bGw7XG5cbiAgLyoqIFNjcmVlbnJlYWRlciBsYWJlbCBmb3IgdGhlIGJ1dHRvbi4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRvZ2dsZSBidXR0b24gaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnBpY2tlcikge1xuICAgICAgcmV0dXJuICh0aGlzLnBpY2tlciBhcyBhbnkpLmRpc2FibGVkO1xuICAgIH1cblxuICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAvKiogVW5kZXJseWluZyBidXR0b24gZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnYnV0dG9uJykgX2J1dHRvbjogTm92b0J1dHRvbkVsZW1lbnQ7XG5cbiAgLyoqIEVsZW1lbnQgZm9yIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuXG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSBkZWZhdWx0VGFiSW5kZXg6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fRk9STV9GSUVMRCkgcHJpdmF0ZSBfZm9ybUZpZWxkOiBOb3ZvRmllbGRFbGVtZW50LFxuICApIHtcbiAgICBjb25zdCBwYXJzZWRUYWJJbmRleCA9IE51bWJlcihkZWZhdWx0VGFiSW5kZXgpO1xuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZWRUYWJJbmRleCB8fCBwYXJzZWRUYWJJbmRleCA9PT0gMCA/IHBhcnNlZFRhYkluZGV4IDogbnVsbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5waWNrZXIpIHtcbiAgICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLl9mb3JtRmllbGQuZ2V0Q29ubmVjdGVkT3ZlcmxheU9yaWdpbigpIHx8IHRoaXMuX2VsZW1lbnRSZWY7XG4gIH1cblxuICB0b2dnbGVQYW5lbChldmVudD86IEV2ZW50KSB7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIGlmICghdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBCRUdJTjogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlUGFuZWwoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheS5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LnBhbmVsT3BlbjtcbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoU3RhdGVDaGFuZ2VzKCkge1xuICAgIC8vIGNvbnN0IHBpY2tlclN0YXRlQ2hhbmdlZCA9IHRoaXMucGlja2VyID8gdGhpcy5waWNrZXIuc3RhdGVDaGFuZ2VzIDogb2JzZXJ2YWJsZU9mKCk7XG4gICAgLy8gY29uc3QgaW5wdXRTdGF0ZUNoYW5nZWQgPSB0aGlzLnBpY2tlciAmJiB0aGlzLnBpY2tlci5waWNrZXJJbnB1dCA/IHRoaXMucGlja2VyLnBpY2tlcklucHV0LnN0YXRlQ2hhbmdlcyA6IG9ic2VydmFibGVPZigpO1xuICAgIC8vIGNvbnN0IHBpY2tlclRvZ2dsZWQgPSB0aGlzLnBpY2tlciA/IG1lcmdlKHRoaXMucGlja2VyLm9wZW5lZFN0cmVhbSwgdGhpcy5waWNrZXIuY2xvc2VkU3RyZWFtKSA6IG9ic2VydmFibGVPZigpO1xuICAgIC8vIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIC8vIHRoaXMuX3N0YXRlQ2hhbmdlcyA9IG1lcmdlKHBpY2tlclN0YXRlQ2hhbmdlZCwgaW5wdXRTdGF0ZUNoYW5nZWQsIHBpY2tlclRvZ2dsZWQpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxidXR0b25cbiAgI2J1dHRvblxuICB0aGVtZT1cImljb25cIlxuICBbaWNvbl09XCJpY29uXCJcbiAgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCInZGlhbG9nJ1wiXG4gIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gLTEgOiB0YWJJbmRleFwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIChjbGljayk9XCJ0b2dnbGVQYW5lbCgkZXZlbnQpXCI+PC9idXR0b24+XG5cbjxub3ZvLW92ZXJsYXktdGVtcGxhdGUgW3BhcmVudF09XCJlbGVtZW50XCIgcG9zaXRpb249XCJhYm92ZS1iZWxvd1wiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT4iXX0=