import { CdkAccordionItem } from '@angular/cdk/accordion';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, EventEmitter, Host, Input, Output, Optional, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, startWith, take } from 'rxjs/operators';
import { NovoAccordion } from './accordion';
import { novoExpansionAnimations } from './expansion-animations';
import { NovoExpansionPanelContent } from './expansion-panel-content';
/** Counter for generating unique element ids. */
let uniqueId = 0;
/**
 * `<novo-expansion-panel>`
 *
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the NovoAccordion directive attached.
 */
export class NovoExpansionPanel extends CdkAccordionItem {
    constructor(accordion, _changeDetectorRef, _uniqueSelectionDispatcher, _viewContainerRef) {
        super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
        this._viewContainerRef = _viewContainerRef;
        this._hideToggle = false;
        this._padding = true;
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.expandedChange = new EventEmitter();
        /** Stream that emits for changes in `@Input` properties. */
        this._inputChanges = new Subject();
        /** ID for the associated header element. Used for a11y labelling. */
        this._headerId = `novo-expansion-panel-header-${uniqueId++}`;
        this.accordion = accordion;
    }
    /** Whether the toggle indicator should be hidden. */
    get hideToggle() {
        return this._hideToggle;
    }
    set hideToggle(value) {
        this._hideToggle = coerceBooleanProperty(value);
    }
    get padding() {
        return this._padding;
    }
    set padding(value) {
        this._padding = coerceBooleanProperty(value);
    }
    /** Whether the expansion indicator should be hidden. */
    _getHideToggle() {
        if (this.accordion) {
            return this.accordion.hideToggle;
        }
        return this.hideToggle;
    }
    /** Determines whether the expansion panel should have spacing between it and its siblings. */
    _hasSpacing() {
        if (this.accordion) {
            return (this.expanded ? this.accordion.displayMode : this._getExpandedState()) === 'default';
        }
        return false;
    }
    /** Gets the expanded state string. */
    _getExpandedState() {
        return this.expanded ? 'expanded' : 'collapsed';
    }
    ngAfterContentInit() {
        if (this._lazyContent) {
            // Render the content as soon as the panel becomes open.
            this.opened
                .pipe(startWith(null), filter(() => this.expanded && !this._portal), take(1))
                .subscribe(() => {
                this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
            });
        }
    }
    ngOnChanges(changes) {
        this._inputChanges.next(changes);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._inputChanges.complete();
    }
    _bodyAnimation(event) {
        const classList = event.element.classList;
        const cssClass = 'novo-expanded';
        const { phaseName, toState } = event;
        // Toggle the body's `overflow: hidden` class when closing starts or when expansion ends in
        // order to prevent the cases where switching too early would cause the animation to jump.
        // Note that we do it directly on the DOM element to avoid the slight delay that comes
        // with doing it via change detection.
        if (phaseName === 'done' && toState === 'expanded') {
            classList.add(cssClass);
        }
        else if (phaseName === 'start' && toState === 'collapsed') {
            classList.remove(cssClass);
        }
    }
}
NovoExpansionPanel.decorators = [
    { type: Component, args: [{
                selector: 'novo-expansion-panel',
                exportAs: 'novoExpansionPanel',
                template: "<ng-content select=\"novo-expansion-panel-header\"></ng-content>\r\n<div class=\"novo-expansion-panel-content\"\r\n     role=\"region\"\r\n     [@bodyExpansion]=\"_getExpandedState()\"\r\n     (@bodyExpansion.done)=\"_bodyAnimation($event)\"\r\n     (@bodyExpansion.start)=\"_bodyAnimation($event)\"\r\n     [attr.aria-labelledby]=\"_headerId\"\r\n     [id]=\"id\"\r\n     #body>\r\n  <div class=\"novo-expansion-panel-body\">\r\n    <ng-content></ng-content>\r\n    <ng-template [cdkPortalOutlet]=\"_portal\"></ng-template>\r\n  </div>\r\n  <ng-content select=\"novo-action-row\"></ng-content>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [novoExpansionAnimations.bodyExpansion],
                host: {
                    class: 'novo-expansion-panel',
                    '[class.novo-expanded]': 'expanded',
                    '[class.novo-expansion-panel-spacing]': '_hasSpacing()',
                    '[class.novo-expansion-panel-padding]': 'padding',
                },
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-expansion-panel{background:#fff;color:#3d464d}.novo-action-row{border-top-color:#3d464d}.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused,.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]):hover{background:rgba(0,0,0,.04)}.novo-expansion-panel-header-title{color:#3d464d}.novo-expansion-indicator:after,.novo-expansion-panel-header-description{color:#999}.novo-expansion-panel-header[aria-disabled=true]{color:#999;pointer-events:none}.novo-expansion-panel-header[aria-disabled=true] .novo-expansion-panel-header-description,.novo-expansion-panel-header[aria-disabled=true] .novo-expansion-panel-header-title{color:inherit}.novo-expansion-panel.novo-expanded[theme=company]{border-top:3px solid #39d}.novo-expansion-panel.novo-expanded[theme=candidate]{border-top:3px solid #4b7}.novo-expansion-panel.novo-expanded[theme=navigation]{border-top:3px solid #2f384f}.novo-expansion-panel.novo-expanded[theme=lead]{border-top:3px solid #a69}.novo-expansion-panel.novo-expanded[theme=contact]{border-top:3px solid #fa4}.novo-expansion-panel.novo-expanded[theme=opportunity]{border-top:3px solid #625}.novo-expansion-panel.novo-expanded[theme=job]{border-top:3px solid #b56}.novo-expansion-panel.novo-expanded[theme=earnCode],.novo-expansion-panel.novo-expanded[theme=jobCode]{border-top:3px solid #696d79}.novo-expansion-panel.novo-expanded[theme=sendout]{border-top:3px solid #747884}.novo-expansion-panel.novo-expanded[theme=placement]{border-top:3px solid #0b344f}.novo-expansion-panel.novo-expanded[theme=corporateuser],.novo-expansion-panel.novo-expanded[theme=credential],.novo-expansion-panel.novo-expanded[theme=distributionList],.novo-expansion-panel.novo-expanded[theme=task],.novo-expansion-panel.novo-expanded[theme=user]{border-top:3px solid #4f5361}.novo-expansion-panel.novo-expanded[theme=aqua]{border-top:3px solid #3bafda}.novo-expansion-panel.novo-expanded[theme=ocean]{border-top:3px solid #4a89dc}.novo-expansion-panel.novo-expanded[theme=mint]{border-top:3px solid #37bc9b}.novo-expansion-panel.novo-expanded[theme=grass]{border-top:3px solid #8cc152}.novo-expansion-panel.novo-expanded[theme=sunflower]{border-top:3px solid #f6b042}.novo-expansion-panel.novo-expanded[theme=bittersweet]{border-top:3px solid #eb6845}.novo-expansion-panel.novo-expanded[theme=grapefruit]{border-top:3px solid #da4453}.novo-expansion-panel.novo-expanded[theme=carnation]{border-top:3px solid #d770ad}.novo-expansion-panel.novo-expanded[theme=lavender]{border-top:3px solid #967adc}.novo-expansion-panel.novo-expanded[theme=positive]{border-top:3px solid #4a89dc}.novo-expansion-panel.novo-expanded[theme=success]{border-top:3px solid #8cc152}.novo-expansion-panel.novo-expanded[theme=negative]{border-top:3px solid #da4453}.novo-expansion-panel.novo-expanded[theme=warning]{border-top:3px solid #f6b042}.novo-expansion-panel.novo-expanded[theme=black]{border-top:3px solid #000}.novo-expansion-panel.novo-expanded[theme=dark]{border-top:3px solid #3d464d}.novo-expansion-panel.novo-expanded[theme=pulse]{border-top:3px solid #3bafda}.novo-expansion-panel.novo-expanded[theme=neutral]{border-top:3px solid #4f5361}.novo-expansion-panel.novo-expanded[theme=navy]{border-top:3px solid #0d2d42}.novo-expansion-panel.novo-expanded[theme=contract]{border-top:3px solid #454ea0}.novo-expansion-panel.novo-expanded[theme=mountain]{border-top:3px solid #9678b6}.novo-expansion-panel.novo-expanded[theme=billableCharge],.novo-expansion-panel.novo-expanded[theme=invoiceStatement],.novo-expansion-panel.novo-expanded[theme=payableCharge]{border-top:3px solid #696d79}.novo-expansion-panel.novo-expanded[theme=submission]{border-top:3px solid #a9adbb}.novo-expansion-panel.novo-expanded[theme=note]{border-top:3px solid #747884}.novo-expansion-panel.novo-expanded[theme=ash]{border-top:3px solid #a0a0a0}.novo-expansion-panel.novo-expanded[theme=slate]{border-top:3px solid #707070}.novo-expansion-panel.novo-expanded[theme=charcoal]{border-top:3px solid #282828}.novo-expansion-panel.novo-expanded[theme=background]{border-top:3px solid #f4f4f4}.novo-expansion-panel.novo-expanded[theme=background-dark]{border-top:3px solid #e2e2e2}.novo-expansion-panel.novo-expanded[theme=white]{border-top:3px solid #fff}.novo-expansion-panel.novo-expanded[theme=grey]{border-top:3px solid #999}.novo-expansion-panel.novo-expanded[theme=off-white]{border-top:3px solid #f4f4f4}.novo-expansion-panel.novo-expanded[theme=light]{border-top:3px solid #d9dadc}.novo-expansion-panel.novo-expanded[theme=empty]{border-top:3px solid #cccdcc}.novo-expansion-panel.novo-expanded[theme=sand]{border-top:3px solid #f4f4f4}.novo-expansion-panel.novo-expanded[theme=silver]{border-top:3px solid #e2e2e2}.novo-expansion-panel.novo-expanded[theme=stone]{border-top:3px solid #bebebe}.novo-expansion-panel{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-sizing:content-box;display:block;margin:0 16px;transition:margin 225ms ease-in-out}.novo-expansion-panel.novo-expanded{margin:16px 4px}.novo-expansion-panel.novo-expanded:first-child{margin-top:0}.novo-expansion-panel.novo-expanded:last-child{margin-bottom:0}.novo-expansion-panel-content{overflow:hidden}.novo-expansion-panel-content.novo-expanded{overflow:visible}.novo-expansion-panel-padding .novo-expansion-panel-body{padding:0 24px 16px}.novo-accordion .novo-expansion-panel-spacing:first-child{margin-top:0}.novo-accordion .novo-expansion-panel-spacing:last-child{margin-bottom:0}.novo-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.novo-action-row button.novo-button{margin-left:8px}[dir=rtl] .novo-action-row button.novo-button{margin-left:0;margin-right:8px}"]
            },] }
];
NovoExpansionPanel.ctorParameters = () => [
    { type: NovoAccordion, decorators: [{ type: Optional }, { type: Host }] },
    { type: ChangeDetectorRef },
    { type: UniqueSelectionDispatcher },
    { type: ViewContainerRef }
];
NovoExpansionPanel.propDecorators = {
    disabled: [{ type: Input }],
    expanded: [{ type: Input }],
    hideToggle: [{ type: Input }],
    padding: [{ type: Input }],
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    expandedChange: [{ type: Output }],
    _lazyContent: [{ type: ContentChild, args: [NovoExpansionPanelContent,] }]
};
export class NovoExpansionPanelActionRow {
}
NovoExpansionPanelActionRow.decorators = [
    { type: Directive, args: [{
                selector: 'novo-action-row',
                host: {
                    class: 'novo-action-row',
                },
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9leHBhbnNpb24vZXhwYW5zaW9uLXBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ1osSUFBSSxFQUNKLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUVSLGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBS3RFLGlEQUFpRDtBQUNqRCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFFakI7Ozs7O0dBS0c7QUFnQkgsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGdCQUFnQjtJQStDdEQsWUFHRSxTQUF3QixFQUN4QixrQkFBcUMsRUFDckMsMEJB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VCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGlCQUFpQjtpQkFDekI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IENka0FjY29yZGlvbkl0ZW0gfSBmcm9tICdAYW5ndWxhci9jZGsvYWNjb3JkaW9uJztcclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XHJcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCBzdGFydFdpdGgsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5vdm9BY2NvcmRpb24gfSBmcm9tICcuL2FjY29yZGlvbic7XHJcbmltcG9ydCB7IG5vdm9FeHBhbnNpb25BbmltYXRpb25zIH0gZnJvbSAnLi9leHBhbnNpb24tYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IE5vdm9FeHBhbnNpb25QYW5lbENvbnRlbnQgfSBmcm9tICcuL2V4cGFuc2lvbi1wYW5lbC1jb250ZW50JztcclxuXHJcbi8qKiBOb3ZvRXhwYW5zaW9uUGFuZWwncyBzdGF0ZXMuICovXHJcbmV4cG9ydCB0eXBlIE5vdm9FeHBhbnNpb25QYW5lbFN0YXRlID0gJ2V4cGFuZGVkJyB8ICdjb2xsYXBzZWQnO1xyXG5cclxuLyoqIENvdW50ZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGVsZW1lbnQgaWRzLiAqL1xyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIGA8bm92by1leHBhbnNpb24tcGFuZWw+YFxyXG4gKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBjYW4gYmUgdXNlZCBhcyBhIHNpbmdsZSBlbGVtZW50IHRvIHNob3cgZXhwYW5kYWJsZSBjb250ZW50LCBvciBhcyBvbmUgb2ZcclxuICogbXVsdGlwbGUgY2hpbGRyZW4gb2YgYW4gZWxlbWVudCB3aXRoIHRoZSBOb3ZvQWNjb3JkaW9uIGRpcmVjdGl2ZSBhdHRhY2hlZC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHN0eWxlVXJsczogWycuL2V4cGFuc2lvbi1wYW5lbC5zY3NzJ10sXHJcbiAgc2VsZWN0b3I6ICdub3ZvLWV4cGFuc2lvbi1wYW5lbCcsXHJcbiAgZXhwb3J0QXM6ICdub3ZvRXhwYW5zaW9uUGFuZWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9leHBhbnNpb24tcGFuZWwuaHRtbCcsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBhbmltYXRpb25zOiBbbm92b0V4cGFuc2lvbkFuaW1hdGlvbnMuYm9keUV4cGFuc2lvbl0sXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdub3ZvLWV4cGFuc2lvbi1wYW5lbCcsXHJcbiAgICAnW2NsYXNzLm5vdm8tZXhwYW5kZWRdJzogJ2V4cGFuZGVkJyxcclxuICAgICdbY2xhc3Mubm92by1leHBhbnNpb24tcGFuZWwtc3BhY2luZ10nOiAnX2hhc1NwYWNpbmcoKScsXHJcbiAgICAnW2NsYXNzLm5vdm8tZXhwYW5zaW9uLXBhbmVsLXBhZGRpbmddJzogJ3BhZGRpbmcnLFxyXG4gIH0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvRXhwYW5zaW9uUGFuZWwgZXh0ZW5kcyBDZGtBY2NvcmRpb25JdGVtIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpXHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBleHBhbmRlZDogYm9vbGVhbjtcclxuICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGluZGljYXRvciBzaG91bGQgYmUgaGlkZGVuLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGhpZGVUb2dnbGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlkZVRvZ2dsZTtcclxuICB9XHJcbiAgc2V0IGhpZGVUb2dnbGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hpZGVUb2dnbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9oaWRlVG9nZ2xlID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBhZGRpbmcoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFkZGluZztcclxuICB9XHJcbiAgc2V0IHBhZGRpbmcodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3BhZGRpbmcgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9wYWRkaW5nID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb3BlbmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgZXhwYW5kZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIGZvciBjaGFuZ2VzIGluIGBASW5wdXRgIHByb3BlcnRpZXMuICovXHJcbiAgcmVhZG9ubHkgX2lucHV0Q2hhbmdlcyA9IG5ldyBTdWJqZWN0PFNpbXBsZUNoYW5nZXM+KCk7XHJcblxyXG4gIC8qKiBPcHRpb25hbGx5IGRlZmluZWQgYWNjb3JkaW9uIHRoZSBleHBhbnNpb24gcGFuZWwgYmVsb25ncyB0by4gKi9cclxuICBhY2NvcmRpb246IE5vdm9BY2NvcmRpb247XHJcblxyXG4gIC8qKiBDb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkuICovXHJcbiAgQENvbnRlbnRDaGlsZChOb3ZvRXhwYW5zaW9uUGFuZWxDb250ZW50KVxyXG4gIF9sYXp5Q29udGVudDogTm92b0V4cGFuc2lvblBhbmVsQ29udGVudDtcclxuXHJcbiAgLyoqIFBvcnRhbCBob2xkaW5nIHRoZSB1c2VyJ3MgY29udGVudC4gKi9cclxuICBfcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcclxuXHJcbiAgLyoqIElEIGZvciB0aGUgYXNzb2NpYXRlZCBoZWFkZXIgZWxlbWVudC4gVXNlZCBmb3IgYTExeSBsYWJlbGxpbmcuICovXHJcbiAgX2hlYWRlcklkID0gYG5vdm8tZXhwYW5zaW9uLXBhbmVsLWhlYWRlci0ke3VuaXF1ZUlkKyt9YDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgQEhvc3QoKVxyXG4gICAgYWNjb3JkaW9uOiBOb3ZvQWNjb3JkaW9uLFxyXG4gICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIF91bmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyOiBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyLFxyXG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICApIHtcclxuICAgIHN1cGVyKGFjY29yZGlvbiwgX2NoYW5nZURldGVjdG9yUmVmLCBfdW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlcik7XHJcbiAgICB0aGlzLmFjY29yZGlvbiA9IGFjY29yZGlvbjtcclxuICB9XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBleHBhbnNpb24gaW5kaWNhdG9yIHNob3VsZCBiZSBoaWRkZW4uICovXHJcbiAgX2dldEhpZGVUb2dnbGUoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5hY2NvcmRpb24pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYWNjb3JkaW9uLmhpZGVUb2dnbGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5oaWRlVG9nZ2xlO1xyXG4gIH1cclxuXHJcbiAgLyoqIERldGVybWluZXMgd2hldGhlciB0aGUgZXhwYW5zaW9uIHBhbmVsIHNob3VsZCBoYXZlIHNwYWNpbmcgYmV0d2VlbiBpdCBhbmQgaXRzIHNpYmxpbmdzLiAqL1xyXG4gIF9oYXNTcGFjaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuYWNjb3JkaW9uKSB7XHJcbiAgICAgIHJldHVybiAodGhpcy5leHBhbmRlZCA/IHRoaXMuYWNjb3JkaW9uLmRpc3BsYXlNb2RlIDogdGhpcy5fZ2V0RXhwYW5kZWRTdGF0ZSgpKSA9PT0gJ2RlZmF1bHQnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgdGhlIGV4cGFuZGVkIHN0YXRlIHN0cmluZy4gKi9cclxuICBfZ2V0RXhwYW5kZWRTdGF0ZSgpOiBOb3ZvRXhwYW5zaW9uUGFuZWxTdGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJztcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLl9sYXp5Q29udGVudCkge1xyXG4gICAgICAvLyBSZW5kZXIgdGhlIGNvbnRlbnQgYXMgc29vbiBhcyB0aGUgcGFuZWwgYmVjb21lcyBvcGVuLlxyXG4gICAgICB0aGlzLm9wZW5lZFxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgc3RhcnRXaXRoKG51bGwpLFxyXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuZXhwYW5kZWQgJiYgIXRoaXMuX3BvcnRhbCksXHJcbiAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuX3BvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLl9sYXp5Q29udGVudC5fdGVtcGxhdGUsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgdGhpcy5faW5wdXRDaGFuZ2VzLm5leHQoY2hhbmdlcyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XHJcbiAgICB0aGlzLl9pbnB1dENoYW5nZXMuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIF9ib2R5QW5pbWF0aW9uKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xyXG4gICAgY29uc3QgY2xhc3NMaXN0ID0gZXZlbnQuZWxlbWVudC5jbGFzc0xpc3Q7XHJcbiAgICBjb25zdCBjc3NDbGFzcyA9ICdub3ZvLWV4cGFuZGVkJztcclxuICAgIGNvbnN0IHsgcGhhc2VOYW1lLCB0b1N0YXRlIH0gPSBldmVudDtcclxuXHJcbiAgICAvLyBUb2dnbGUgdGhlIGJvZHkncyBgb3ZlcmZsb3c6IGhpZGRlbmAgY2xhc3Mgd2hlbiBjbG9zaW5nIHN0YXJ0cyBvciB3aGVuIGV4cGFuc2lvbiBlbmRzIGluXHJcbiAgICAvLyBvcmRlciB0byBwcmV2ZW50IHRoZSBjYXNlcyB3aGVyZSBzd2l0Y2hpbmcgdG9vIGVhcmx5IHdvdWxkIGNhdXNlIHRoZSBhbmltYXRpb24gdG8ganVtcC5cclxuICAgIC8vIE5vdGUgdGhhdCB3ZSBkbyBpdCBkaXJlY3RseSBvbiB0aGUgRE9NIGVsZW1lbnQgdG8gYXZvaWQgdGhlIHNsaWdodCBkZWxheSB0aGF0IGNvbWVzXHJcbiAgICAvLyB3aXRoIGRvaW5nIGl0IHZpYSBjaGFuZ2UgZGV0ZWN0aW9uLlxyXG4gICAgaWYgKHBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIHRvU3RhdGUgPT09ICdleHBhbmRlZCcpIHtcclxuICAgICAgY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XHJcbiAgICB9IGVsc2UgaWYgKHBoYXNlTmFtZSA9PT0gJ3N0YXJ0JyAmJiB0b1N0YXRlID09PSAnY29sbGFwc2VkJykge1xyXG4gICAgICBjbGFzc0xpc3QucmVtb3ZlKGNzc0NsYXNzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpb24tcm93JyxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ25vdm8tYWN0aW9uLXJvdycsXHJcbiAgfSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9FeHBhbnNpb25QYW5lbEFjdGlvblJvdyB7fVxyXG4iXX0=