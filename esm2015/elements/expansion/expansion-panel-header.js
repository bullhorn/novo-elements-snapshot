import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Host, Input, ViewEncapsulation } from '@angular/core';
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
        switch (event.keyCode) {
            // Toggle for space and enter keys.
            case SPACE:
            case ENTER:
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
                template: "<span class=\"novo-content\">\r\n  <ng-content select=\"novo-panel-title\"></ng-content>\r\n  <ng-content select=\"novo-panel-description\"></ng-content>\r\n  <ng-content></ng-content>\r\n</span>\r\n<span [@indicatorRotate]=\"_getExpandedState()\" *ngIf=\"_showToggle()\"\r\n      class=\"novo-expansion-indicator\"></span>\r\n",
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
                styles: [".novo-expansion-panel-header{align-items:center;display:flex;flex-direction:row;padding:0 24px}.novo-expansion-panel-header:focus,.novo-expansion-panel-header:hover{outline:none}.novo-expansion-panel-header.novo-expanded:focus,.novo-expansion-panel-header.novo-expanded:hover{background:inherit}.novo-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.novo-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.novo-expansion-panel-header-description,.novo-expansion-panel-header-title{align-items:center;display:flex;flex-grow:1;margin-right:16px}[dir=rtl] .novo-expansion-panel-header-description,[dir=rtl] .novo-expansion-panel-header-title{margin-left:16px;margin-right:0}.novo-expansion-panel-header-description{flex-grow:2}.novo-expansion-indicator:after{border-style:solid;border-width:0 2px 2px 0;content:\"\";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZXhwYW5zaW9uL2V4cGFuc2lvbi1wYW5lbC1oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBYSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SixPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdkQ7Ozs7R0FJRztBQTRCSCxNQUFNLE9BQU8sd0JBQXdCO0lBR25DLFlBQ2lCLEtBQXlCLEVBQ2hDLFFBQW9CO0lBQzVCLHVDQUF1QztJQUMvQixrQkFBcUM7UUFIOUIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUVwQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBTnZDLDhCQUF5QixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFRckQsK0RBQStEO1FBQy9ELDREQUE0RDtRQUM1RCxJQUFJLENBQUMseUJBQXlCLEdBQUcsS0FBSyxDQUNwQyxLQUFLLENBQUMsTUFBTSxFQUNaLEtBQUssQ0FBQyxNQUFNLEVBQ1osS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQzFGLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRTFELGlEQUFpRDtJQUNuRCxDQUFDO0lBVUQsK0NBQStDO0lBQy9DLE9BQU87UUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELG1EQUFtRDtJQUNuRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQseUJBQXlCO0lBQ3pCLFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx5REFBeUQ7SUFDekQsV0FBVztRQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQ3hELENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsUUFBUSxDQUFDLEtBQW9CO1FBQzNCLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNyQixtQ0FBbUM7WUFDbkMsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEtBQUs7Z0JBQ1IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2YsTUFBTTtZQUNSO2dCQUNFLE9BQU87U0FDVjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLGtFQUFrRTtJQUNwRSxDQUFDOzs7WUFqR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBRXZDLG1WQUE0QztnQkFDNUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxVQUFVLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMscUJBQXFCLENBQUM7Z0JBQ3BHLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsNkJBQTZCO29CQUNwQyxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsaUJBQWlCO29CQUM5QixpQkFBaUIsRUFBRSx5QkFBeUI7b0JBQzVDLHNCQUFzQixFQUFFLGVBQWU7b0JBQ3ZDLHNCQUFzQixFQUFFLGVBQWU7b0JBQ3ZDLHNCQUFzQixFQUFFLGdCQUFnQjtvQkFDeEMsdUJBQXVCLEVBQUUsZUFBZTtvQkFDeEMsU0FBUyxFQUFFLFdBQVc7b0JBQ3RCLFdBQVcsRUFBRSxrQkFBa0I7b0JBQy9CLG9CQUFvQixFQUFFOzs7Ozs7TUFNcEI7aUJBQ0g7O2FBQ0Y7OztZQWpDUSxrQkFBa0IsdUJBc0N0QixJQUFJO1lBMUNrRSxVQUFVO1lBQW5ELGlCQUFpQjs7OzZCQTJEaEQsS0FBSzs4QkFJTCxLQUFLOztBQWdEUjs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLDZCQUE2Qjs7O1lBTnpDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLHlDQUF5QztpQkFDakQ7YUFDRjs7QUFHRDs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBTm5DLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG1DQUFtQztpQkFDM0M7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVOVEVSLCBTUEFDRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3QsIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBub3ZvRXhwYW5zaW9uQW5pbWF0aW9ucyB9IGZyb20gJy4vZXhwYW5zaW9uLWFuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBOb3ZvRXhwYW5zaW9uUGFuZWwgfSBmcm9tICcuL2V4cGFuc2lvbi1wYW5lbCc7XHJcblxyXG4vKipcclxuICogYDxub3ZvLWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+YFxyXG4gKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBjb3JyZXNwb25kcyB0byB0aGUgaGVhZGVyIGVsZW1lbnQgb2YgYW4gYDxub3ZvLWV4cGFuc2lvbi1wYW5lbD5gLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWV4cGFuc2lvbi1wYW5lbC1oZWFkZXInLFxyXG4gIHN0eWxlVXJsczogWycuL2V4cGFuc2lvbi1wYW5lbC1oZWFkZXIuc2NzcyddLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9leHBhbnNpb24tcGFuZWwtaGVhZGVyLmh0bWwnLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgYW5pbWF0aW9uczogW25vdm9FeHBhbnNpb25BbmltYXRpb25zLmluZGljYXRvclJvdGF0ZSwgbm92b0V4cGFuc2lvbkFuaW1hdGlvbnMuZXhwYW5zaW9uSGVhZGVySGVpZ2h0XSxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ25vdm8tZXhwYW5zaW9uLXBhbmVsLWhlYWRlcicsXHJcbiAgICByb2xlOiAnYnV0dG9uJyxcclxuICAgICdbYXR0ci5pZF0nOiAncGFuZWwuX2hlYWRlcklkJyxcclxuICAgICdbYXR0ci50YWJpbmRleF0nOiAncGFuZWwuZGlzYWJsZWQgPyAtMSA6IDAnLFxyXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ19nZXRQYW5lbElkKCknLFxyXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ19pc0V4cGFuZGVkKCknLFxyXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ3BhbmVsLmRpc2FibGVkJyxcclxuICAgICdbY2xhc3Mubm92by1leHBhbmRlZF0nOiAnX2lzRXhwYW5kZWQoKScsXHJcbiAgICAnKGNsaWNrKSc6ICdfdG9nZ2xlKCknLFxyXG4gICAgJyhrZXlkb3duKSc6ICdfa2V5ZG93bigkZXZlbnQpJyxcclxuICAgICdbQGV4cGFuc2lvbkhlaWdodF0nOiBge1xyXG4gICAgICAgIHZhbHVlOiBfZ2V0RXhwYW5kZWRTdGF0ZSgpLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgY29sbGFwc2VkSGVpZ2h0OiBjb2xsYXBzZWRIZWlnaHQsXHJcbiAgICAgICAgICBleHBhbmRlZEhlaWdodDogZXhwYW5kZWRIZWlnaHRcclxuICAgICAgICB9XHJcbiAgICB9YCxcclxuICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0V4cGFuc2lvblBhbmVsSGVhZGVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9wYXJlbnRDaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEhvc3QoKSBwdWJsaWMgcGFuZWw6IE5vdm9FeHBhbnNpb25QYW5lbCxcclxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAvLyBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHtcclxuICAgIC8vIFNpbmNlIHRoZSB0b2dnbGUgc3RhdGUgZGVwZW5kcyBvbiBhbiBASW5wdXQgb24gdGhlIHBhbmVsLCB3ZVxyXG4gICAgLy8gbmVlZCB0byAgc3Vic2NyaWJlIGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gbWFudWFsbHkuXHJcbiAgICB0aGlzLl9wYXJlbnRDaGFuZ2VTdWJzY3JpcHRpb24gPSBtZXJnZShcclxuICAgICAgcGFuZWwub3BlbmVkLFxyXG4gICAgICBwYW5lbC5jbG9zZWQsXHJcbiAgICAgIHBhbmVsLl9pbnB1dENoYW5nZXMucGlwZShmaWx0ZXIoKGNoYW5nZXMpID0+ICEhKGNoYW5nZXMuaGlkZVRvZ2dsZSB8fCBjaGFuZ2VzLmRpc2FibGVkKSkpLFxyXG4gICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xyXG5cclxuICAgIC8vIF9mb2N1c01vbml0b3IubW9uaXRvcihfZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKiBIZWlnaHQgb2YgdGhlIGhlYWRlciB3aGlsZSB0aGUgcGFuZWwgaXMgZXhwYW5kZWQuICovXHJcbiAgQElucHV0KClcclxuICBleHBhbmRlZEhlaWdodDogc3RyaW5nO1xyXG5cclxuICAvKiogSGVpZ2h0IG9mIHRoZSBoZWFkZXIgd2hpbGUgdGhlIHBhbmVsIGlzIGNvbGxhcHNlZC4gKi9cclxuICBASW5wdXQoKVxyXG4gIGNvbGxhcHNlZEhlaWdodDogc3RyaW5nO1xyXG5cclxuICAvKiogVG9nZ2xlcyB0aGUgZXhwYW5kZWQgc3RhdGUgb2YgdGhlIHBhbmVsLiAqL1xyXG4gIF90b2dnbGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhbmVsLnRvZ2dsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgd2hldGhlciB0aGUgcGFuZWwgaXMgZXhwYW5kZWQuICovXHJcbiAgX2lzRXhwYW5kZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wYW5lbC5leHBhbmRlZDtcclxuICB9XHJcblxyXG4gIC8qKiBHZXRzIHRoZSBleHBhbmRlZCBzdGF0ZSBzdHJpbmcgb2YgdGhlIHBhbmVsLiAqL1xyXG4gIF9nZXRFeHBhbmRlZFN0YXRlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wYW5lbC5fZ2V0RXhwYW5kZWRTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgdGhlIHBhbmVsIGlkLiAqL1xyXG4gIF9nZXRQYW5lbElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wYW5lbC5pZDtcclxuICB9XHJcblxyXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIGV4cGFuZCBpbmRpY2F0b3Igc2hvdWxkIGJlIHNob3duLiAqL1xyXG4gIF9zaG93VG9nZ2xlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICF0aGlzLnBhbmVsLmhpZGVUb2dnbGUgJiYgIXRoaXMucGFuZWwuZGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlIGtleWRvd24gZXZlbnQgY2FsbGluZyB0byB0b2dnbGUoKSBpZiBhcHByb3ByaWF0ZS4gKi9cclxuICBfa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgIC8vIFRvZ2dsZSBmb3Igc3BhY2UgYW5kIGVudGVyIGtleXMuXHJcbiAgICAgIGNhc2UgU1BBQ0U6XHJcbiAgICAgIGNhc2UgRU5URVI6XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLl90b2dnbGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3BhcmVudENoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgLy8gdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogYDxub3ZvLXBhbmVsLWRlc2NyaXB0aW9uPmBcclxuICpcclxuICogVGhpcyBkaXJlY3Rpb24gaXMgdG8gYmUgdXNlZCBpbnNpZGUgb2YgdGhlIE5vdm9FeHBhbnNpb25QYW5lbEhlYWRlciBjb21wb25lbnQuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25vdm8tcGFuZWwtZGVzY3JpcHRpb24nLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbm92by1leHBhbnNpb24tcGFuZWwtaGVhZGVyLWRlc2NyaXB0aW9uJyxcclxuICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0V4cGFuc2lvblBhbmVsRGVzY3JpcHRpb24geyB9XHJcblxyXG4vKipcclxuICogYDxub3ZvLXBhbmVsLXRpdGxlPmBcclxuICpcclxuICogVGhpcyBkaXJlY3Rpb24gaXMgdG8gYmUgdXNlZCBpbnNpZGUgb2YgdGhlIE5vdm9FeHBhbnNpb25QYW5lbEhlYWRlciBjb21wb25lbnQuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25vdm8tcGFuZWwtdGl0bGUnLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbm92by1leHBhbnNpb24tcGFuZWwtaGVhZGVyLXRpdGxlJyxcclxuICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0V4cGFuc2lvblBhbmVsVGl0bGUgeyB9XHJcbiJdfQ==