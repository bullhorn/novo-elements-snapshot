import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Host, Input, ViewEncapsulation, } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { novoExpansionAnimations } from './expansion-animations';
import { NovoExpansionPanel } from './expansion-panel';
/**
 * `<novo-expansion-panel-header>`
 *
 * This component corresponds to the header element of an `<novo-expansion-panel>`.
 */
export class NovoExpansionPanelHeader {
    constructor(panel, _element, 
    // private _focusMonitor: FocusMonitor,
    _changeDetectorRef) {
        this.panel = panel;
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this._parentChangeSubscription = Subscription.EMPTY;
        // Since the toggle state depends on an @Input on the panel, we
        // need to  subscribe and trigger change detection manually.
        this._parentChangeSubscription = merge(panel.opened, panel.closed, panel._inputChanges.pipe(filter((changes) => !!(changes.hideToggle || changes.disabled)))).subscribe(() => this._changeDetectorRef.markForCheck());
        // _focusMonitor.monitor(_element.nativeElement);
    }
    /** Toggles the expanded state of the panel. */
    _toggle() {
        this.panel.toggle();
    }
    /** Gets whether the panel is expanded. */
    _isExpanded() {
        return this.panel.expanded;
    }
    /** Gets the expanded state string of the panel. */
    _getExpandedState() {
        return this.panel._getExpandedState();
    }
    /** Gets the panel id. */
    _getPanelId() {
        return this.panel.id;
    }
    /** Gets whether the expand indicator should be shown. */
    _showToggle() {
        return !this.panel.hideToggle && !this.panel.disabled;
    }
    /** Handle keydown event calling to toggle() if appropriate. */
    _keydown(event) {
        switch (event.key) {
            // Toggle for space and enter keys.
            case " " /* Space */:
            case "Enter" /* Enter */:
                event.preventDefault();
                this._toggle();
                break;
            default:
                return;
        }
    }
    ngOnDestroy() {
        this._parentChangeSubscription.unsubscribe();
        // this._focusMonitor.stopMonitoring(this._element.nativeElement);
    }
}
NovoExpansionPanelHeader.decorators = [
    { type: Component, args: [{
                selector: 'novo-expansion-panel-header',
                template: "<span class=\"novo-content\">\n  <ng-content select=\"novo-panel-title\"></ng-content>\n  <ng-content select=\"novo-panel-description\"></ng-content>\n  <ng-content></ng-content>\n</span>\n<span [@indicatorRotate]=\"_getExpandedState()\" *ngIf=\"_showToggle()\"\n      class=\"novo-expansion-indicator\"></span>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [novoExpansionAnimations.indicatorRotate, novoExpansionAnimations.expansionHeaderHeight],
                host: {
                    class: 'novo-expansion-panel-header',
                    role: 'button',
                    '[attr.id]': 'panel._headerId',
                    '[attr.tabindex]': 'panel.disabled ? -1 : 0',
                    '[attr.aria-controls]': '_getPanelId()',
                    '[attr.aria-expanded]': '_isExpanded()',
                    '[attr.aria-disabled]': 'panel.disabled',
                    '[class.novo-expanded]': '_isExpanded()',
                    '(click)': '_toggle()',
                    '(keydown)': '_keydown($event)',
                    '[@expansionHeight]': `{
        value: _getExpandedState(),
        params: {
          collapsedHeight: collapsedHeight,
          expandedHeight: expandedHeight
        }
    }`,
                },
                styles: [".novo-expansion-panel-header{align-items:center;display:flex;flex-direction:row;padding:0 24px}.novo-expansion-panel-header:focus,.novo-expansion-panel-header:hover{outline:none}.novo-expansion-panel-header.novo-expanded:focus,.novo-expansion-panel-header.novo-expanded:hover{background:inherit}.novo-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.novo-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.novo-expansion-panel-header-description,.novo-expansion-panel-header-title{align-items:center;display:flex;flex-grow:1;gap:1rem;margin-right:16px}[dir=rtl] .novo-expansion-panel-header-description,[dir=rtl] .novo-expansion-panel-header-title{margin-left:16px;margin-right:0}.novo-expansion-panel-header-description{flex-grow:2}.novo-expansion-indicator:after{border-style:solid;border-width:0 2px 2px 0;content:\"\";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}"]
            },] }
];
NovoExpansionPanelHeader.ctorParameters = () => [
    { type: NovoExpansionPanel, decorators: [{ type: Host }] },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
NovoExpansionPanelHeader.propDecorators = {
    expandedHeight: [{ type: Input }],
    collapsedHeight: [{ type: Input }]
};
/**
 * `<novo-panel-description>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
export class NovoExpansionPanelDescription {
}
NovoExpansionPanelDescription.decorators = [
    { type: Directive, args: [{
                selector: 'novo-panel-description',
                host: {
                    class: 'novo-expansion-panel-header-description',
                },
            },] }
];
/**
 * `<novo-panel-title>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
export class NovoExpansionPanelTitle {
}
NovoExpansionPanelTitle.decorators = [
    { type: Directive, args: [{
                selector: 'novo-panel-title',
                host: {
                    class: 'novo-expansion-panel-header-title',
                },
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9leHBhbnNpb24vZXhwYW5zaW9uLXBhbmVsLWhlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixJQUFJLEVBQ0osS0FBSyxFQUVMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdkQ7Ozs7R0FJRztBQTRCSCxNQUFNLE9BQU8sd0JBQXdCO0lBR25DLFlBQ2lCLEtBQXlCLEVBQ2hDLFFBQW9CO0lBQzVCLHVDQUF1QztJQUMvQixrQkFBcUM7UUFIOUIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUVwQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBTnZDLDhCQUF5QixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFRckQsK0RBQStEO1FBQy9ELDREQUE0RDtRQUM1RCxJQUFJLENBQUMseUJBQXlCLEdBQUcsS0FBSyxDQUNwQyxLQUFLLENBQUMsTUFBTSxFQUNaLEtBQUssQ0FBQyxNQUFNLEVBQ1osS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQzFGLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRTFELGlEQUFpRDtJQUNuRCxDQUFDO0lBVUQsK0NBQStDO0lBQy9DLE9BQU87UUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELG1EQUFtRDtJQUNuRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQseUJBQXlCO0lBQ3pCLFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx5REFBeUQ7SUFDekQsV0FBVztRQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQ3hELENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsUUFBUSxDQUFDLEtBQW9CO1FBQzNCLFFBQVEsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNqQixtQ0FBbUM7WUFDbkMscUJBQWU7WUFDZjtnQkFDRSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDZixNQUFNO1lBQ1I7Z0JBQ0UsT0FBTztTQUNWO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0Msa0VBQWtFO0lBQ3BFLENBQUM7OztZQWpHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFFdkMscVVBQTRDO2dCQUM1QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFVBQVUsRUFBRSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDcEcsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSw2QkFBNkI7b0JBQ3BDLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxpQkFBaUI7b0JBQzlCLGlCQUFpQixFQUFFLHlCQUF5QjtvQkFDNUMsc0JBQXNCLEVBQUUsZUFBZTtvQkFDdkMsc0JBQXNCLEVBQUUsZUFBZTtvQkFDdkMsc0JBQXNCLEVBQUUsZ0JBQWdCO29CQUN4Qyx1QkFBdUIsRUFBRSxlQUFlO29CQUN4QyxTQUFTLEVBQUUsV0FBVztvQkFDdEIsV0FBVyxFQUFFLGtCQUFrQjtvQkFDL0Isb0JBQW9CLEVBQUU7Ozs7OztNQU1wQjtpQkFDSDs7YUFDRjs7O1lBakNRLGtCQUFrQix1QkFzQ3RCLElBQUk7WUFoRFAsVUFBVTtZQUhWLGlCQUFpQjs7OzZCQW9FaEIsS0FBSzs4QkFJTCxLQUFLOztBQWdEUjs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLDZCQUE2Qjs7O1lBTnpDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLHlDQUF5QztpQkFDakQ7YUFDRjs7QUFHRDs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBTm5DLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG1DQUFtQztpQkFDM0M7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IG5vdm9FeHBhbnNpb25BbmltYXRpb25zIH0gZnJvbSAnLi9leHBhbnNpb24tYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOb3ZvRXhwYW5zaW9uUGFuZWwgfSBmcm9tICcuL2V4cGFuc2lvbi1wYW5lbCc7XG5cbi8qKlxuICogYDxub3ZvLWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+YFxuICpcbiAqIFRoaXMgY29tcG9uZW50IGNvcnJlc3BvbmRzIHRvIHRoZSBoZWFkZXIgZWxlbWVudCBvZiBhbiBgPG5vdm8tZXhwYW5zaW9uLXBhbmVsPmAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZXhwYW5zaW9uLXBhbmVsLWhlYWRlcicsXG4gIHN0eWxlVXJsczogWycuL2V4cGFuc2lvbi1wYW5lbC1oZWFkZXIuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJy4vZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtub3ZvRXhwYW5zaW9uQW5pbWF0aW9ucy5pbmRpY2F0b3JSb3RhdGUsIG5vdm9FeHBhbnNpb25BbmltYXRpb25zLmV4cGFuc2lvbkhlYWRlckhlaWdodF0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZXhwYW5zaW9uLXBhbmVsLWhlYWRlcicsXG4gICAgcm9sZTogJ2J1dHRvbicsXG4gICAgJ1thdHRyLmlkXSc6ICdwYW5lbC5faGVhZGVySWQnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAncGFuZWwuZGlzYWJsZWQgPyAtMSA6IDAnLFxuICAgICdbYXR0ci5hcmlhLWNvbnRyb2xzXSc6ICdfZ2V0UGFuZWxJZCgpJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnX2lzRXhwYW5kZWQoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ3BhbmVsLmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLm5vdm8tZXhwYW5kZWRdJzogJ19pc0V4cGFuZGVkKCknLFxuICAgICcoY2xpY2spJzogJ190b2dnbGUoKScsXG4gICAgJyhrZXlkb3duKSc6ICdfa2V5ZG93bigkZXZlbnQpJyxcbiAgICAnW0BleHBhbnNpb25IZWlnaHRdJzogYHtcbiAgICAgICAgdmFsdWU6IF9nZXRFeHBhbmRlZFN0YXRlKCksXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGNvbGxhcHNlZEhlaWdodDogY29sbGFwc2VkSGVpZ2h0LFxuICAgICAgICAgIGV4cGFuZGVkSGVpZ2h0OiBleHBhbmRlZEhlaWdodFxuICAgICAgICB9XG4gICAgfWAsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9FeHBhbnNpb25QYW5lbEhlYWRlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3BhcmVudENoYW5nZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASG9zdCgpIHB1YmxpYyBwYW5lbDogTm92b0V4cGFuc2lvblBhbmVsLFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgLy8gcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICAvLyBTaW5jZSB0aGUgdG9nZ2xlIHN0YXRlIGRlcGVuZHMgb24gYW4gQElucHV0IG9uIHRoZSBwYW5lbCwgd2VcbiAgICAvLyBuZWVkIHRvICBzdWJzY3JpYmUgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBtYW51YWxseS5cbiAgICB0aGlzLl9wYXJlbnRDaGFuZ2VTdWJzY3JpcHRpb24gPSBtZXJnZShcbiAgICAgIHBhbmVsLm9wZW5lZCxcbiAgICAgIHBhbmVsLmNsb3NlZCxcbiAgICAgIHBhbmVsLl9pbnB1dENoYW5nZXMucGlwZShmaWx0ZXIoKGNoYW5nZXMpID0+ICEhKGNoYW5nZXMuaGlkZVRvZ2dsZSB8fCBjaGFuZ2VzLmRpc2FibGVkKSkpLFxuICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcblxuICAgIC8vIF9mb2N1c01vbml0b3IubW9uaXRvcihfZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIC8qKiBIZWlnaHQgb2YgdGhlIGhlYWRlciB3aGlsZSB0aGUgcGFuZWwgaXMgZXhwYW5kZWQuICovXG4gIEBJbnB1dCgpXG4gIGV4cGFuZGVkSGVpZ2h0OiBzdHJpbmc7XG5cbiAgLyoqIEhlaWdodCBvZiB0aGUgaGVhZGVyIHdoaWxlIHRoZSBwYW5lbCBpcyBjb2xsYXBzZWQuICovXG4gIEBJbnB1dCgpXG4gIGNvbGxhcHNlZEhlaWdodDogc3RyaW5nO1xuXG4gIC8qKiBUb2dnbGVzIHRoZSBleHBhbmRlZCBzdGF0ZSBvZiB0aGUgcGFuZWwuICovXG4gIF90b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5wYW5lbC50b2dnbGUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIHBhbmVsIGlzIGV4cGFuZGVkLiAqL1xuICBfaXNFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbC5leHBhbmRlZDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBleHBhbmRlZCBzdGF0ZSBzdHJpbmcgb2YgdGhlIHBhbmVsLiAqL1xuICBfZ2V0RXhwYW5kZWRTdGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhbmVsLl9nZXRFeHBhbmRlZFN0YXRlKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgcGFuZWwgaWQuICovXG4gIF9nZXRQYW5lbElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWwuaWQ7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBleHBhbmQgaW5kaWNhdG9yIHNob3VsZCBiZSBzaG93bi4gKi9cbiAgX3Nob3dUb2dnbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLnBhbmVsLmhpZGVUb2dnbGUgJiYgIXRoaXMucGFuZWwuZGlzYWJsZWQ7XG4gIH1cblxuICAvKiogSGFuZGxlIGtleWRvd24gZXZlbnQgY2FsbGluZyB0byB0b2dnbGUoKSBpZiBhcHByb3ByaWF0ZS4gKi9cbiAgX2tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgLy8gVG9nZ2xlIGZvciBzcGFjZSBhbmQgZW50ZXIga2V5cy5cbiAgICAgIGNhc2UgS2V5LlNwYWNlOlxuICAgICAgY2FzZSBLZXkuRW50ZXI6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9wYXJlbnRDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAvLyB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgfVxufVxuXG4vKipcbiAqIGA8bm92by1wYW5lbC1kZXNjcmlwdGlvbj5gXG4gKlxuICogVGhpcyBkaXJlY3Rpb24gaXMgdG8gYmUgdXNlZCBpbnNpZGUgb2YgdGhlIE5vdm9FeHBhbnNpb25QYW5lbEhlYWRlciBjb21wb25lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25vdm8tcGFuZWwtZGVzY3JpcHRpb24nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItZGVzY3JpcHRpb24nLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRXhwYW5zaW9uUGFuZWxEZXNjcmlwdGlvbiB7fVxuXG4vKipcbiAqIGA8bm92by1wYW5lbC10aXRsZT5gXG4gKlxuICogVGhpcyBkaXJlY3Rpb24gaXMgdG8gYmUgdXNlZCBpbnNpZGUgb2YgdGhlIE5vdm9FeHBhbnNpb25QYW5lbEhlYWRlciBjb21wb25lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25vdm8tcGFuZWwtdGl0bGUnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItdGl0bGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRXhwYW5zaW9uUGFuZWxUaXRsZSB7fVxuIl19