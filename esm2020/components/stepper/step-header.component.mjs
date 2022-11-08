import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkStepHeader } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { NovoStepLabel } from './step-label.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "novo-elements/components/icon";
import * as i3 from "./step-status.component";
import * as i4 from "@angular/common";
export class NovoStepHeader extends CdkStepHeader {
    constructor(_focusMonitor, _element) {
        super(_element);
        this._focusMonitor = _focusMonitor;
        this._element = _element;
        _focusMonitor.monitor(_element.nativeElement, true);
    }
    /** Index of the given step. */
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = coerceNumberProperty(value);
    }
    /** Whether the given step is selected. */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = coerceBooleanProperty(value);
    }
    /** Whether the given step label is active. */
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = coerceBooleanProperty(value);
    }
    /** Whether the given step label is active. */
    get touched() {
        return this.selected || this.state === 'edit' || this.state === 'done';
    }
    /** Whether the given step is optional. */
    get optional() {
        return this._optional;
    }
    set optional(value) {
        this._optional = coerceBooleanProperty(value);
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._element.nativeElement);
    }
    /** Returns string label of given step if it is a text label. */
    _stringLabel() {
        return this.label instanceof NovoStepLabel ? null : this.label;
    }
    /** Returns NovoStepLabel if the label of given step is a template label. */
    _templateLabel() {
        return this.label instanceof NovoStepLabel ? this.label : null;
    }
    /** Returns the host HTML element. */
    _getHostElement() {
        return this._element.nativeElement;
    }
}
NovoStepHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepHeader, deps: [{ token: i1.FocusMonitor }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoStepHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoStepHeader, selector: "novo-step-header", inputs: { theme: "theme", color: "color", icon: "icon", state: "state", label: "label", iconOverrides: "iconOverrides", index: "index", selected: "selected", active: "active", optional: "optional" }, host: { attributes: { "role": "tab" }, classAttribute: "novo-step-header" }, usesInheritance: true, ngImport: i0, template: "<div [class.novo-step-icon]=\"touched\"\n  [class.novo-step-icon-not-touched]=\"!touched\">\n  <ng-container *ngIf=\"icon\">\n    <novo-icon raised=\"true\" [theme]=\"theme\">{{icon}}</novo-icon>\n  </ng-container>\n  <ng-container *ngIf=\"!icon\">\n    <span class=\"novo-step-number\">{{index + 1}}</span>\n  </ng-container>\n</div>\n<div class=\"novo-step-label\"\n  [class.novo-step-label-active]=\"active\"\n  [class.novo-step-label-selected]=\"selected\">\n  <!-- If there is a label template, use it. -->\n  <ng-container *ngIf=\"_templateLabel()\" [ngTemplateOutlet]=\"_templateLabel()!.template\">\n  </ng-container>\n  <!-- It there is no label template, fall back to the text label. -->\n  <div class=\"novo-step-text-label\" *ngIf=\"_stringLabel()\">{{label}}</div>\n</div>\n<novo-step-status [state]=\"state\"></novo-step-status>", styles: [".novo-step-header{overflow:visible;outline:none;cursor:pointer;position:relative}.novo-step-optional{font-size:12px}.novo-step-icon,.novo-step-icon-not-touched{border-radius:50%;height:24px;width:24px;align-items:center;justify-content:center;display:flex}.novo-step-icon .novo-step-number,.novo-step-icon-not-touched .novo-step-number{font-size:1em;min-width:1.6em;height:1.6em;box-shadow:2px 2px #0003;display:flex;align-items:center;justify-content:center;border-radius:4px}.novo-step-icon .novo-step-number{background:var(--color-selection);color:var(--color-selection-contrast)}.novo-step-icon-not-touched .novo-step-number{background:var(--color-empty);color:var(--color-empty-contrast)}.novo-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;text-align:center;padding:4px 0}.novo-step-text-label{text-align:center;text-overflow:ellipsis;overflow:hidden}\n"], components: [{ type: i2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i3.NovoStepStatus, selector: "novo-step-status", inputs: ["state"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoStepHeader, decorators: [{
            type: Component,
            args: [{ selector: 'novo-step-header', host: {
                        class: 'novo-step-header',
                        role: 'tab',
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class.novo-step-icon]=\"touched\"\n  [class.novo-step-icon-not-touched]=\"!touched\">\n  <ng-container *ngIf=\"icon\">\n    <novo-icon raised=\"true\" [theme]=\"theme\">{{icon}}</novo-icon>\n  </ng-container>\n  <ng-container *ngIf=\"!icon\">\n    <span class=\"novo-step-number\">{{index + 1}}</span>\n  </ng-container>\n</div>\n<div class=\"novo-step-label\"\n  [class.novo-step-label-active]=\"active\"\n  [class.novo-step-label-selected]=\"selected\">\n  <!-- If there is a label template, use it. -->\n  <ng-container *ngIf=\"_templateLabel()\" [ngTemplateOutlet]=\"_templateLabel()!.template\">\n  </ng-container>\n  <!-- It there is no label template, fall back to the text label. -->\n  <div class=\"novo-step-text-label\" *ngIf=\"_stringLabel()\">{{label}}</div>\n</div>\n<novo-step-status [state]=\"state\"></novo-step-status>", styles: [".novo-step-header{overflow:visible;outline:none;cursor:pointer;position:relative}.novo-step-optional{font-size:12px}.novo-step-icon,.novo-step-icon-not-touched{border-radius:50%;height:24px;width:24px;align-items:center;justify-content:center;display:flex}.novo-step-icon .novo-step-number,.novo-step-icon-not-touched .novo-step-number{font-size:1em;min-width:1.6em;height:1.6em;box-shadow:2px 2px #0003;display:flex;align-items:center;justify-content:center;border-radius:4px}.novo-step-icon .novo-step-number{background:var(--color-selection);color:var(--color-selection-contrast)}.novo-step-icon-not-touched .novo-step-number{background:var(--color-empty);color:var(--color-empty-contrast)}.novo-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;text-align:center;padding:4px 0}.novo-step-text-label{text-align:center;text-overflow:ellipsis;overflow:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FocusMonitor }, { type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], icon: [{
                type: Input
            }], state: [{
                type: Input
            }], label: [{
                type: Input
            }], iconOverrides: [{
                type: Input
            }], index: [{
                type: Input
            }], selected: [{
                type: Input
            }], active: [{
                type: Input
            }], optional: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9zdGVwcGVyL3N0ZXAtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwLWhlYWRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBMEIsTUFBTSxlQUFlLENBQUM7QUFDOUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7QUFhdkQsTUFBTSxPQUFPLGNBQWUsU0FBUSxhQUFhO0lBZ0UvQyxZQUFvQixhQUEyQixFQUFVLFFBQW9CO1FBQzNFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQURFLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUUzRSxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQWhERCwrQkFBK0I7SUFDL0IsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUdELDBDQUEwQztJQUMxQyxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBR0QsOENBQThDO0lBQzlDLElBQ0ksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFHRCw4Q0FBOEM7SUFDOUMsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDO0lBQ3pFLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQVFELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNqRSxDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLFlBQVksYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakUsQ0FBQztJQUVELHFDQUFxQztJQUNyQyxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUNyQyxDQUFDOzs0R0F0RlUsY0FBYztnR0FBZCxjQUFjLG9XQ2pCM0IsNDBCQWtCcUQ7NEZERHhDLGNBQWM7a0JBWDFCLFNBQVM7K0JBQ0Usa0JBQWtCLFFBR3RCO3dCQUNKLEtBQUssRUFBRSxrQkFBa0I7d0JBQ3pCLElBQUksRUFBRSxLQUFLO3FCQUNaLHVCQUNvQixLQUFLLG1CQUNULHVCQUF1QixDQUFDLE1BQU07NEhBSS9DLEtBQUs7c0JBREosS0FBSztnQkFHTixLQUFLO3NCQURKLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUlOLEtBQUs7c0JBREosS0FBSztnQkFLTixLQUFLO3NCQURKLEtBQUs7Z0JBS04sYUFBYTtzQkFEWixLQUFLO2dCQUtGLEtBQUs7c0JBRFIsS0FBSztnQkFXRixRQUFRO3NCQURYLEtBQUs7Z0JBV0YsTUFBTTtzQkFEVCxLQUFLO2dCQWdCRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENka1N0ZXBIZWFkZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc3RlcHBlcic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b1N0ZXBMYWJlbCB9IGZyb20gJy4vc3RlcC1sYWJlbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXN0ZXAtaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzdGVwLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzdGVwLWhlYWRlci5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXN0ZXAtaGVhZGVyJyxcbiAgICByb2xlOiAndGFiJyxcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU3RlcEhlYWRlciBleHRlbmRzIENka1N0ZXBIZWFkZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmc7XG4gIC8qKiBTdGF0ZSBvZiB0aGUgZ2l2ZW4gc3RlcC4gKi9cbiAgQElucHV0KClcbiAgc3RhdGU6IHN0cmluZztcblxuICAvKiogTGFiZWwgb2YgdGhlIGdpdmVuIHN0ZXAuICovXG4gIEBJbnB1dCgpXG4gIGxhYmVsOiBOb3ZvU3RlcExhYmVsIHwgc3RyaW5nO1xuXG4gIC8qKiBPdmVycmlkZXMgZm9yIHRoZSBoZWFkZXIgaWNvbnMsIHBhc3NlZCBpbiB2aWEgdGhlIHN0ZXBwZXIuICovXG4gIEBJbnB1dCgpXG4gIGljb25PdmVycmlkZXM6IHsgW2tleTogc3RyaW5nXTogVGVtcGxhdGVSZWY8YW55PiB9O1xuXG4gIC8qKiBJbmRleCBvZiB0aGUgZ2l2ZW4gc3RlcC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV4O1xuICB9XG4gIHNldCBpbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW5kZXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaW5kZXg6IG51bWJlcjtcblxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4gc3RlcCBpcyBzZWxlY3RlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHN0ZXAgbGFiZWwgaXMgYWN0aXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cbiAgc2V0IGFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYWN0aXZlOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiBzdGVwIGxhYmVsIGlzIGFjdGl2ZS4gKi9cbiAgZ2V0IHRvdWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgfHwgdGhpcy5zdGF0ZSA9PT0gJ2VkaXQnIHx8IHRoaXMuc3RhdGUgPT09ICdkb25lJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiBzdGVwIGlzIG9wdGlvbmFsLiAqL1xuICBASW5wdXQoKVxuICBnZXQgb3B0aW9uYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbmFsO1xuICB9XG4gIHNldCBvcHRpb25hbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX29wdGlvbmFsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9vcHRpb25hbDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKF9lbGVtZW50KTtcbiAgICBfZm9jdXNNb25pdG9yLm1vbml0b3IoX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHN0cmluZyBsYWJlbCBvZiBnaXZlbiBzdGVwIGlmIGl0IGlzIGEgdGV4dCBsYWJlbC4gKi9cbiAgX3N0cmluZ0xhYmVsKCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmxhYmVsIGluc3RhbmNlb2YgTm92b1N0ZXBMYWJlbCA/IG51bGwgOiB0aGlzLmxhYmVsO1xuICB9XG5cbiAgLyoqIFJldHVybnMgTm92b1N0ZXBMYWJlbCBpZiB0aGUgbGFiZWwgb2YgZ2l2ZW4gc3RlcCBpcyBhIHRlbXBsYXRlIGxhYmVsLiAqL1xuICBfdGVtcGxhdGVMYWJlbCgpOiBOb3ZvU3RlcExhYmVsIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubGFiZWwgaW5zdGFuY2VvZiBOb3ZvU3RlcExhYmVsID8gdGhpcy5sYWJlbCA6IG51bGw7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgaG9zdCBIVE1MIGVsZW1lbnQuICovXG4gIF9nZXRIb3N0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG59XG4iLCI8ZGl2IFtjbGFzcy5ub3ZvLXN0ZXAtaWNvbl09XCJ0b3VjaGVkXCJcbiAgW2NsYXNzLm5vdm8tc3RlcC1pY29uLW5vdC10b3VjaGVkXT1cIiF0b3VjaGVkXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJpY29uXCI+XG4gICAgPG5vdm8taWNvbiByYWlzZWQ9XCJ0cnVlXCIgW3RoZW1lXT1cInRoZW1lXCI+e3tpY29ufX08L25vdm8taWNvbj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaWNvblwiPlxuICAgIDxzcGFuIGNsYXNzPVwibm92by1zdGVwLW51bWJlclwiPnt7aW5kZXggKyAxfX08L3NwYW4+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibm92by1zdGVwLWxhYmVsXCJcbiAgW2NsYXNzLm5vdm8tc3RlcC1sYWJlbC1hY3RpdmVdPVwiYWN0aXZlXCJcbiAgW2NsYXNzLm5vdm8tc3RlcC1sYWJlbC1zZWxlY3RlZF09XCJzZWxlY3RlZFwiPlxuICA8IS0tIElmIHRoZXJlIGlzIGEgbGFiZWwgdGVtcGxhdGUsIHVzZSBpdC4gLS0+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJfdGVtcGxhdGVMYWJlbCgpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiX3RlbXBsYXRlTGFiZWwoKSEudGVtcGxhdGVcIj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDwhLS0gSXQgdGhlcmUgaXMgbm8gbGFiZWwgdGVtcGxhdGUsIGZhbGwgYmFjayB0byB0aGUgdGV4dCBsYWJlbC4gLS0+XG4gIDxkaXYgY2xhc3M9XCJub3ZvLXN0ZXAtdGV4dC1sYWJlbFwiICpuZ0lmPVwiX3N0cmluZ0xhYmVsKClcIj57e2xhYmVsfX08L2Rpdj5cbjwvZGl2PlxuPG5vdm8tc3RlcC1zdGF0dXMgW3N0YXRlXT1cInN0YXRlXCI+PC9ub3ZvLXN0ZXAtc3RhdHVzPiJdfQ==