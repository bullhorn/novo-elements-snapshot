import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { NovoStepLabel } from './step-label.component';
import { CdkStepHeader } from '@angular/cdk/stepper';
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
NovoStepHeader.decorators = [
    { type: Component, args: [{
                selector: 'novo-step-header',
                template: "<div [class.novo-step-icon]=\"touched\"\r\n     [class.novo-step-icon-not-touched]=\"!touched\">\r\n  <ng-container *ngIf=\"icon\">\r\n    <novo-icon size=\"small\" raised=\"true\" [theme]=\"theme\">{{icon}}</novo-icon>\r\n  </ng-container>\r\n  <ng-container *ngIf=\"!icon\">\r\n    <span class=\"novo-step-number\">{{index + 1}}</span>\r\n  </ng-container>\r\n</div>\r\n<div class=\"novo-step-label\"\r\n     [class.novo-step-label-active]=\"active\"\r\n     [class.novo-step-label-selected]=\"selected\">\r\n  <!-- If there is a label template, use it. -->\r\n  <ng-container *ngIf=\"_templateLabel()\" [ngTemplateOutlet]=\"_templateLabel()!.template\">\r\n  </ng-container>\r\n  <!-- It there is no label template, fall back to the text label. -->\r\n  <div class=\"novo-step-text-label\" *ngIf=\"_stringLabel()\">{{label}}</div>\r\n</div>\r\n<novo-step-status [state]=\"state\"></novo-step-status>\r\n",
                host: {
                    class: 'novo-step-header',
                    role: 'tab',
                },
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-step-header{cursor:pointer;outline:none;overflow:visible;position:relative}.novo-step-optional{font-size:12px}.novo-step-icon,.novo-step-icon-not-touched{align-items:center;border-radius:50%;display:flex;height:24px;justify-content:center;width:24px}.novo-step-icon-not-touched .novo-step-number,.novo-step-icon .novo-step-number{align-items:center;border-radius:4px;box-shadow:2px 2px 0 rgba(0,0,0,.2);display:flex;font-size:1em;height:1.6em;justify-content:center;min-width:1.6em}.novo-step-icon .novo-step-number{background:#4a89dc;color:#fff}.novo-step-icon-not-touched .novo-step-number{background:#a9adbb;color:#fff}.novo-step-label{display:inline-block;min-width:50px;padding:4px 0;vertical-align:middle;white-space:nowrap}.novo-step-label,.novo-step-text-label{overflow:hidden;text-align:center;text-overflow:ellipsis}"]
            },] }
];
NovoStepHeader.ctorParameters = () => [
    { type: FocusMonitor },
    { type: ElementRef }
];
NovoStepHeader.propDecorators = {
    theme: [{ type: Input }],
    color: [{ type: Input }],
    icon: [{ type: Input }],
    state: [{ type: Input }],
    label: [{ type: Input }],
    iconOverrides: [{ type: Input }],
    index: [{ type: Input }],
    selected: [{ type: Input }],
    active: [{ type: Input }],
    optional: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zdGVwcGVyL3N0ZXAtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUEwQixNQUFNLGVBQWUsQ0FBQztBQUM5RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBYXJELE1BQU0sT0FBTyxjQUFlLFNBQVEsYUFBYTtJQWdFL0MsWUFBb0IsYUFBMkIsRUFBVSxRQUFvQjtRQUMzRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFERSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFFM0UsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFoREQsK0JBQStCO0lBQy9CLElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFHRCwwQ0FBMEM7SUFDMUMsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdELDhDQUE4QztJQUM5QyxJQUNJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksTUFBTSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBR0QsOENBQThDO0lBQzlDLElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQztJQUN6RSxDQUFDO0lBRUQsMENBQTBDO0lBQzFDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFRRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsZ0VBQWdFO0lBQ2hFLFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLFlBQVksYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDakUsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxZQUFZLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxxQ0FBcUM7SUFDckMsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7SUFDckMsQ0FBQzs7O1lBakdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixzNUJBQXlDO2dCQUV6QyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtvQkFDekIsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUFoQlEsWUFBWTtZQUV3QixVQUFVOzs7b0JBZ0JwRCxLQUFLO29CQUVMLEtBQUs7bUJBRUwsS0FBSztvQkFHTCxLQUFLO29CQUlMLEtBQUs7NEJBSUwsS0FBSztvQkFJTCxLQUFLO3VCQVVMLEtBQUs7cUJBVUwsS0FBSzt1QkFlTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xyXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTm92b1N0ZXBMYWJlbCB9IGZyb20gJy4vc3RlcC1sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDZGtTdGVwSGVhZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3N0ZXBwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXN0ZXAtaGVhZGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJ3N0ZXAtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnc3RlcC1oZWFkZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ25vdm8tc3RlcC1oZWFkZXInLFxyXG4gICAgcm9sZTogJ3RhYicsXHJcbiAgfSxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwSGVhZGVyIGV4dGVuZHMgQ2RrU3RlcEhlYWRlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICB0aGVtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgY29sb3I6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGljb246IHN0cmluZztcclxuICAvKiogU3RhdGUgb2YgdGhlIGdpdmVuIHN0ZXAuICovXHJcbiAgQElucHV0KClcclxuICBzdGF0ZTogc3RyaW5nO1xyXG5cclxuICAvKiogTGFiZWwgb2YgdGhlIGdpdmVuIHN0ZXAuICovXHJcbiAgQElucHV0KClcclxuICBsYWJlbDogTm92b1N0ZXBMYWJlbCB8IHN0cmluZztcclxuXHJcbiAgLyoqIE92ZXJyaWRlcyBmb3IgdGhlIGhlYWRlciBpY29ucywgcGFzc2VkIGluIHZpYSB0aGUgc3RlcHBlci4gKi9cclxuICBASW5wdXQoKVxyXG4gIGljb25PdmVycmlkZXM6IHsgW2tleTogc3RyaW5nXTogVGVtcGxhdGVSZWY8YW55PiB9O1xyXG5cclxuICAvKiogSW5kZXggb2YgdGhlIGdpdmVuIHN0ZXAuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgaW5kZXgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmRleDtcclxuICB9XHJcbiAgc2V0IGluZGV4KHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2luZGV4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9pbmRleDogbnVtYmVyO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4gc3RlcCBpcyBzZWxlY3RlZC4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4gc3RlcCBsYWJlbCBpcyBhY3RpdmUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcclxuICB9XHJcbiAgc2V0IGFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fYWN0aXZlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfYWN0aXZlOiBib29sZWFuO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4gc3RlcCBsYWJlbCBpcyBhY3RpdmUuICovXHJcbiAgZ2V0IHRvdWNoZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCB8fCB0aGlzLnN0YXRlID09PSAnZWRpdCcgfHwgdGhpcy5zdGF0ZSA9PT0gJ2RvbmUnO1xyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHN0ZXAgaXMgb3B0aW9uYWwuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgb3B0aW9uYWwoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uYWw7XHJcbiAgfVxyXG4gIHNldCBvcHRpb25hbCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fb3B0aW9uYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9vcHRpb25hbDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIHN1cGVyKF9lbGVtZW50KTtcclxuICAgIF9mb2N1c01vbml0b3IubW9uaXRvcihfZWxlbWVudC5uYXRpdmVFbGVtZW50LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICAvKiogUmV0dXJucyBzdHJpbmcgbGFiZWwgb2YgZ2l2ZW4gc3RlcCBpZiBpdCBpcyBhIHRleHQgbGFiZWwuICovXHJcbiAgX3N0cmluZ0xhYmVsKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMubGFiZWwgaW5zdGFuY2VvZiBOb3ZvU3RlcExhYmVsID8gbnVsbCA6IHRoaXMubGFiZWw7XHJcbiAgfVxyXG5cclxuICAvKiogUmV0dXJucyBOb3ZvU3RlcExhYmVsIGlmIHRoZSBsYWJlbCBvZiBnaXZlbiBzdGVwIGlzIGEgdGVtcGxhdGUgbGFiZWwuICovXHJcbiAgX3RlbXBsYXRlTGFiZWwoKTogTm92b1N0ZXBMYWJlbCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMubGFiZWwgaW5zdGFuY2VvZiBOb3ZvU3RlcExhYmVsID8gdGhpcy5sYWJlbCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKiogUmV0dXJucyB0aGUgaG9zdCBIVE1MIGVsZW1lbnQuICovXHJcbiAgX2dldEhvc3RFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbn1cclxuIl19