import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Host, Input, ViewEncapsulation, } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { novoExpansionAnimations } from './expansion-animations';
import { NovoExpansionPanel } from './expansion-panel';
import * as i0 from "@angular/core";
import * as i1 from "./expansion-panel";
import * as i2 from "@angular/common";
const _c0 = function (a0, a1) { return { collapsedHeight: a0, expandedHeight: a1 }; };
const _c1 = function (a0, a1) { return { value: a0, params: a1 }; };
function NovoExpansionPanelHeader_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@indicatorRotate", ctx_r0._getExpandedState());
} }
const _c2 = [[["novo-panel-title"]], [["novo-panel-description"]], "*"];
const _c3 = ["novo-panel-title", "novo-panel-description", "*"];
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
NovoExpansionPanelHeader.ɵfac = function NovoExpansionPanelHeader_Factory(t) { return new (t || NovoExpansionPanelHeader)(i0.ɵɵdirectiveInject(i1.NovoExpansionPanel, 1), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoExpansionPanelHeader.ɵcmp = i0.ɵɵdefineComponent({ type: NovoExpansionPanelHeader, selectors: [["novo-expansion-panel-header"]], hostAttrs: ["role", "button", 1, "novo-expansion-panel-header"], hostVars: 14, hostBindings: function NovoExpansionPanelHeader_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function NovoExpansionPanelHeader_click_HostBindingHandler() { return ctx._toggle(); })("keydown", function NovoExpansionPanelHeader_keydown_HostBindingHandler($event) { return ctx._keydown($event); });
    } if (rf & 2) {
        i0.ɵɵattribute("id", ctx.panel._headerId)("tabindex", ctx.panel.disabled ? 0 - 1 : 0)("aria-controls", ctx._getPanelId())("aria-expanded", ctx._isExpanded())("aria-disabled", ctx.panel.disabled);
        i0.ɵɵsyntheticHostProperty("@expansionHeight", i0.ɵɵpureFunction2(11, _c1, ctx._getExpandedState(), i0.ɵɵpureFunction2(8, _c0, ctx.collapsedHeight, ctx.expandedHeight)));
        i0.ɵɵclassProp("novo-expanded", ctx._isExpanded());
    } }, inputs: { expandedHeight: "expandedHeight", collapsedHeight: "collapsedHeight" }, ngContentSelectors: _c3, decls: 5, vars: 1, consts: [[1, "novo-content"], ["class", "novo-expansion-indicator", 4, "ngIf"], [1, "novo-expansion-indicator"]], template: function NovoExpansionPanelHeader_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c2);
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵprojection(1);
        i0.ɵɵprojection(2, 1);
        i0.ɵɵprojection(3, 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, NovoExpansionPanelHeader_span_4_Template, 1, 1, "span", 1);
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx._showToggle());
    } }, directives: [i2.NgIf], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-expansion-panel-header{align-items:center;display:flex;flex-direction:row;padding:0 24px}.novo-expansion-panel-header:focus,.novo-expansion-panel-header:hover{outline:none}.novo-expansion-panel-header.novo-expanded:focus,.novo-expansion-panel-header.novo-expanded:hover{background:inherit}.novo-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.novo-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.novo-expansion-panel-header-description,.novo-expansion-panel-header-title{align-items:center;display:flex;flex-grow:1;gap:1rem;margin-right:16px}[dir=rtl] .novo-expansion-panel-header-description,[dir=rtl] .novo-expansion-panel-header-title{margin-left:16px;margin-right:0}.novo-expansion-panel-header-description{flex-grow:2}.novo-expansion-indicator:after{border-style:solid;border-width:0 2px 2px 0;content:\"\";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}"], encapsulation: 2, data: { animation: [novoExpansionAnimations.indicatorRotate, novoExpansionAnimations.expansionHeaderHeight] }, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoExpansionPanelHeader, [{
        type: Component,
        args: [{
                selector: 'novo-expansion-panel-header',
                styleUrls: ['./expansion-panel-header.scss'],
                templateUrl: './expansion-panel-header.html',
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
            }]
    }], function () { return [{ type: i1.NovoExpansionPanel, decorators: [{
                type: Host
            }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { expandedHeight: [{
            type: Input
        }], collapsedHeight: [{
            type: Input
        }] }); })();
/**
 * `<novo-panel-description>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
export class NovoExpansionPanelDescription {
}
NovoExpansionPanelDescription.ɵfac = function NovoExpansionPanelDescription_Factory(t) { return new (t || NovoExpansionPanelDescription)(); };
NovoExpansionPanelDescription.ɵdir = i0.ɵɵdefineDirective({ type: NovoExpansionPanelDescription, selectors: [["novo-panel-description"]], hostAttrs: [1, "novo-expansion-panel-header-description"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoExpansionPanelDescription, [{
        type: Directive,
        args: [{
                selector: 'novo-panel-description',
                host: {
                    class: 'novo-expansion-panel-header-description',
                },
            }]
    }], null, null); })();
/**
 * `<novo-panel-title>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
export class NovoExpansionPanelTitle {
}
NovoExpansionPanelTitle.ɵfac = function NovoExpansionPanelTitle_Factory(t) { return new (t || NovoExpansionPanelTitle)(); };
NovoExpansionPanelTitle.ɵdir = i0.ɵɵdefineDirective({ type: NovoExpansionPanelTitle, selectors: [["novo-panel-title"]], hostAttrs: [1, "novo-expansion-panel-header-title"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoExpansionPanelTitle, [{
        type: Directive,
        args: [{
                selector: 'novo-panel-title',
                host: {
                    class: 'novo-expansion-panel-header-title',
                },
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9leHBhbnNpb24vZXhwYW5zaW9uLXBhbmVsLWhlYWRlci50cyIsImVsZW1lbnRzL2V4cGFuc2lvbi9leHBhbnNpb24tcGFuZWwtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsSUFBSSxFQUNKLEtBQUssRUFFTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7O0lDVnZELDBCQUM4Qzs7O0lBRHhDLDZEQUF3Qzs7OztBRFk5Qzs7OztHQUlHO0FBNEJILE1BQU0sT0FBTyx3QkFBd0I7SUFHbkMsWUFDaUIsS0FBeUIsRUFDaEMsUUFBb0I7SUFDNUIsdUNBQXVDO0lBQy9CLGtCQUFxQztRQUg5QixVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBRXBCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFOdkMsOEJBQXlCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQVFyRCwrREFBK0Q7UUFDL0QsNERBQTREO1FBQzVELElBQUksQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQ3BDLEtBQUssQ0FBQyxN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T0FBTyw2QkFBNkI7OzBHQUE3Qiw2QkFBNkI7a0VBQTdCLDZCQUE2QjtrREFBN0IsNkJBQTZCO2NBTnpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLHlDQUF5QztpQkFDakQ7YUFDRjs7QUFHRDs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLHVCQUF1Qjs7OEZBQXZCLHVCQUF1Qjs0REFBdkIsdUJBQXVCO2tEQUF2Qix1QkFBdUI7Y0FObkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsbUNBQW1DO2lCQUMzQzthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgbm92b0V4cGFuc2lvbkFuaW1hdGlvbnMgfSBmcm9tICcuL2V4cGFuc2lvbi1hbmltYXRpb25zJztcbmltcG9ydCB7IE5vdm9FeHBhbnNpb25QYW5lbCB9IGZyb20gJy4vZXhwYW5zaW9uLXBhbmVsJztcblxuLyoqXG4gKiBgPG5vdm8tZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5gXG4gKlxuICogVGhpcyBjb21wb25lbnQgY29ycmVzcG9uZHMgdG8gdGhlIGhlYWRlciBlbGVtZW50IG9mIGFuIGA8bm92by1leHBhbnNpb24tcGFuZWw+YC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1leHBhbnNpb24tcGFuZWwtaGVhZGVyJyxcbiAgc3R5bGVVcmxzOiBbJy4vZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi9leHBhbnNpb24tcGFuZWwtaGVhZGVyLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW25vdm9FeHBhbnNpb25BbmltYXRpb25zLmluZGljYXRvclJvdGF0ZSwgbm92b0V4cGFuc2lvbkFuaW1hdGlvbnMuZXhwYW5zaW9uSGVhZGVySGVpZ2h0XSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1leHBhbnNpb24tcGFuZWwtaGVhZGVyJyxcbiAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAnW2F0dHIuaWRdJzogJ3BhbmVsLl9oZWFkZXJJZCcsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdwYW5lbC5kaXNhYmxlZCA/IC0xIDogMCcsXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ19nZXRQYW5lbElkKCknLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdfaXNFeHBhbmRlZCgpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAncGFuZWwuZGlzYWJsZWQnLFxuICAgICdbY2xhc3Mubm92by1leHBhbmRlZF0nOiAnX2lzRXhwYW5kZWQoKScsXG4gICAgJyhjbGljayknOiAnX3RvZ2dsZSgpJyxcbiAgICAnKGtleWRvd24pJzogJ19rZXlkb3duKCRldmVudCknLFxuICAgICdbQGV4cGFuc2lvbkhlaWdodF0nOiBge1xuICAgICAgICB2YWx1ZTogX2dldEV4cGFuZGVkU3RhdGUoKSxcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgY29sbGFwc2VkSGVpZ2h0OiBjb2xsYXBzZWRIZWlnaHQsXG4gICAgICAgICAgZXhwYW5kZWRIZWlnaHQ6IGV4cGFuZGVkSGVpZ2h0XG4gICAgICAgIH1cbiAgICB9YCxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0V4cGFuc2lvblBhbmVsSGVhZGVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfcGFyZW50Q2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBIb3N0KCkgcHVibGljIHBhbmVsOiBOb3ZvRXhwYW5zaW9uUGFuZWwsXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAvLyBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIC8vIFNpbmNlIHRoZSB0b2dnbGUgc3RhdGUgZGVwZW5kcyBvbiBhbiBASW5wdXQgb24gdGhlIHBhbmVsLCB3ZVxuICAgIC8vIG5lZWQgdG8gIHN1YnNjcmliZSBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIG1hbnVhbGx5LlxuICAgIHRoaXMuX3BhcmVudENoYW5nZVN1YnNjcmlwdGlvbiA9IG1lcmdlKFxuICAgICAgcGFuZWwub3BlbmVkLFxuICAgICAgcGFuZWwuY2xvc2VkLFxuICAgICAgcGFuZWwuX2lucHV0Q2hhbmdlcy5waXBlKGZpbHRlcigoY2hhbmdlcykgPT4gISEoY2hhbmdlcy5oaWRlVG9nZ2xlIHx8IGNoYW5nZXMuZGlzYWJsZWQpKSksXG4gICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuXG4gICAgLy8gX2ZvY3VzTW9uaXRvci5tb25pdG9yKF9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgLyoqIEhlaWdodCBvZiB0aGUgaGVhZGVyIHdoaWxlIHRoZSBwYW5lbCBpcyBleHBhbmRlZC4gKi9cbiAgQElucHV0KClcbiAgZXhwYW5kZWRIZWlnaHQ6IHN0cmluZztcblxuICAvKiogSGVpZ2h0IG9mIHRoZSBoZWFkZXIgd2hpbGUgdGhlIHBhbmVsIGlzIGNvbGxhcHNlZC4gKi9cbiAgQElucHV0KClcbiAgY29sbGFwc2VkSGVpZ2h0OiBzdHJpbmc7XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIGV4cGFuZGVkIHN0YXRlIG9mIHRoZSBwYW5lbC4gKi9cbiAgX3RvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnBhbmVsLnRvZ2dsZSgpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgcGFuZWwgaXMgZXhwYW5kZWQuICovXG4gIF9pc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhbmVsLmV4cGFuZGVkO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGV4cGFuZGVkIHN0YXRlIHN0cmluZyBvZiB0aGUgcGFuZWwuICovXG4gIF9nZXRFeHBhbmRlZFN0YXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWwuX2dldEV4cGFuZGVkU3RhdGUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBwYW5lbCBpZC4gKi9cbiAgX2dldFBhbmVsSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbC5pZDtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIGV4cGFuZCBpbmRpY2F0b3Igc2hvdWxkIGJlIHNob3duLiAqL1xuICBfc2hvd1RvZ2dsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMucGFuZWwuaGlkZVRvZ2dsZSAmJiAhdGhpcy5wYW5lbC5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBIYW5kbGUga2V5ZG93biBldmVudCBjYWxsaW5nIHRvIHRvZ2dsZSgpIGlmIGFwcHJvcHJpYXRlLiAqL1xuICBfa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAvLyBUb2dnbGUgZm9yIHNwYWNlIGFuZCBlbnRlciBrZXlzLlxuICAgICAgY2FzZSBLZXkuU3BhY2U6XG4gICAgICBjYXNlIEtleS5FbnRlcjpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3BhcmVudENoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIC8vIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICB9XG59XG5cbi8qKlxuICogYDxub3ZvLXBhbmVsLWRlc2NyaXB0aW9uPmBcbiAqXG4gKiBUaGlzIGRpcmVjdGlvbiBpcyB0byBiZSB1c2VkIGluc2lkZSBvZiB0aGUgTm92b0V4cGFuc2lvblBhbmVsSGVhZGVyIGNvbXBvbmVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1wYW5lbC1kZXNjcmlwdGlvbicsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZXhwYW5zaW9uLXBhbmVsLWhlYWRlci1kZXNjcmlwdGlvbicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9FeHBhbnNpb25QYW5lbERlc2NyaXB0aW9uIHt9XG5cbi8qKlxuICogYDxub3ZvLXBhbmVsLXRpdGxlPmBcbiAqXG4gKiBUaGlzIGRpcmVjdGlvbiBpcyB0byBiZSB1c2VkIGluc2lkZSBvZiB0aGUgTm92b0V4cGFuc2lvblBhbmVsSGVhZGVyIGNvbXBvbmVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1wYW5lbC10aXRsZScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZXhwYW5zaW9uLXBhbmVsLWhlYWRlci10aXRsZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9FeHBhbnNpb25QYW5lbFRpdGxlIHt9XG4iLCI8c3BhbiBjbGFzcz1cIm5vdm8tY29udGVudFwiPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXBhbmVsLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXBhbmVsLWRlc2NyaXB0aW9uXCI+PC9uZy1jb250ZW50PlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L3NwYW4+XG48c3BhbiBbQGluZGljYXRvclJvdGF0ZV09XCJfZ2V0RXhwYW5kZWRTdGF0ZSgpXCIgKm5nSWY9XCJfc2hvd1RvZ2dsZSgpXCJcbiAgICAgIGNsYXNzPVwibm92by1leHBhbnNpb24taW5kaWNhdG9yXCI+PC9zcGFuPlxuIl19