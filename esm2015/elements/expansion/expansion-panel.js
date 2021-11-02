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
                template: "<ng-content select=\"novo-expansion-panel-header\"></ng-content>\n<div class=\"novo-expansion-panel-content\"\n     role=\"region\"\n     [@bodyExpansion]=\"_getExpandedState()\"\n     (@bodyExpansion.done)=\"_bodyAnimation($event)\"\n     (@bodyExpansion.start)=\"_bodyAnimation($event)\"\n     [attr.aria-labelledby]=\"_headerId\"\n     [id]=\"id\"\n     #body>\n  <div class=\"novo-expansion-panel-body\">\n    <ng-content></ng-content>\n    <ng-template [cdkPortalOutlet]=\"_portal\"></ng-template>\n  </div>\n  <ng-content select=\"novo-action-row\"></ng-content>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [novoExpansionAnimations.bodyExpansion],
                host: {
                    class: 'novo-expansion-panel',
                    '[class.novo-expanded]': 'expanded',
                    '[class.novo-expansion-panel-spacing]': '_hasSpacing()',
                    '[class.novo-expansion-panel-padding]': 'padding',
                },
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-expansion-panel{background:#fff;color:#3d464d}.novo-action-row{border-top-color:#3d464d}.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused,.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]):hover{background:rgba(0,0,0,.04)}.novo-expansion-panel-header-title{color:#3d464d}.novo-expansion-indicator:after,.novo-expansion-panel-header-description{color:#999}.novo-expansion-panel-header[aria-disabled=true]{color:#999;pointer-events:none}.novo-expansion-panel-header[aria-disabled=true] .novo-expansion-panel-header-description,.novo-expansion-panel-header[aria-disabled=true] .novo-expansion-panel-header-title{color:inherit}.novo-expansion-panel.novo-expanded[theme=company]{border-top:3px solid #39d}.novo-expansion-panel.novo-expanded[theme=candidate]{border-top:3px solid #4b7}.novo-expansion-panel.novo-expanded[theme=navigation]{border-top:3px solid #2f384f}.novo-expansion-panel.novo-expanded[theme=lead]{border-top:3px solid #a69}.novo-expansion-panel.novo-expanded[theme=contact]{border-top:3px solid #fa4}.novo-expansion-panel.novo-expanded[theme=opportunity]{border-top:3px solid #625}.novo-expansion-panel.novo-expanded[theme=job]{border-top:3px solid #b56}.novo-expansion-panel.novo-expanded[theme=earnCode],.novo-expansion-panel.novo-expanded[theme=jobCode]{border-top:3px solid #696d79}.novo-expansion-panel.novo-expanded[theme=sendout]{border-top:3px solid #747884}.novo-expansion-panel.novo-expanded[theme=placement]{border-top:3px solid #0b344f}.novo-expansion-panel.novo-expanded[theme=corporateuser],.novo-expansion-panel.novo-expanded[theme=credential],.novo-expansion-panel.novo-expanded[theme=distributionList],.novo-expansion-panel.novo-expanded[theme=task],.novo-expansion-panel.novo-expanded[theme=user]{border-top:3px solid #4f5361}.novo-expansion-panel.novo-expanded[theme=aqua]{border-top:3px solid #3bafda}.novo-expansion-panel.novo-expanded[theme=ocean]{border-top:3px solid #4a89dc}.novo-expansion-panel.novo-expanded[theme=mint]{border-top:3px solid #37bc9b}.novo-expansion-panel.novo-expanded[theme=grass]{border-top:3px solid #8cc152}.novo-expansion-panel.novo-expanded[theme=sunflower]{border-top:3px solid #f6b042}.novo-expansion-panel.novo-expanded[theme=bittersweet]{border-top:3px solid #eb6845}.novo-expansion-panel.novo-expanded[theme=grapefruit]{border-top:3px solid #da4453}.novo-expansion-panel.novo-expanded[theme=carnation]{border-top:3px solid #d770ad}.novo-expansion-panel.novo-expanded[theme=lavender]{border-top:3px solid #967adc}.novo-expansion-panel.novo-expanded[theme=positive]{border-top:3px solid #4a89dc}.novo-expansion-panel.novo-expanded[theme=success]{border-top:3px solid #8cc152}.novo-expansion-panel.novo-expanded[theme=negative]{border-top:3px solid #da4453}.novo-expansion-panel.novo-expanded[theme=warning]{border-top:3px solid #f6b042}.novo-expansion-panel.novo-expanded[theme=black]{border-top:3px solid #000}.novo-expansion-panel.novo-expanded[theme=dark]{border-top:3px solid #3d464d}.novo-expansion-panel.novo-expanded[theme=pulse]{border-top:3px solid #3bafda}.novo-expansion-panel.novo-expanded[theme=neutral]{border-top:3px solid #4f5361}.novo-expansion-panel.novo-expanded[theme=navy]{border-top:3px solid #0d2d42}.novo-expansion-panel.novo-expanded[theme=contract]{border-top:3px solid #454ea0}.novo-expansion-panel.novo-expanded[theme=mountain]{border-top:3px solid #9678b6}.novo-expansion-panel.novo-expanded[theme=billableCharge],.novo-expansion-panel.novo-expanded[theme=invoiceStatement],.novo-expansion-panel.novo-expanded[theme=payableCharge]{border-top:3px solid #696d79}.novo-expansion-panel.novo-expanded[theme=submission]{border-top:3px solid #a9adbb}.novo-expansion-panel.novo-expanded[theme=note]{border-top:3px solid #747884}.novo-expansion-panel.novo-expanded[theme=ash]{border-top:3px solid #a0a0a0}.novo-expansion-panel.novo-expanded[theme=slate]{border-top:3px solid #707070}.novo-expansion-panel.novo-expanded[theme=charcoal]{border-top:3px solid #282828}.novo-expansion-panel.novo-expanded[theme=jobShift]{border-top:3px solid #454ea0}.novo-expansion-panel.novo-expanded[theme=background]{border-top:3px solid #f4f4f4}.novo-expansion-panel.novo-expanded[theme=background-dark]{border-top:3px solid #e2e2e2}.novo-expansion-panel.novo-expanded[theme=white]{border-top:3px solid #fff}.novo-expansion-panel.novo-expanded[theme=grey]{border-top:3px solid #999}.novo-expansion-panel.novo-expanded[theme=off-white]{border-top:3px solid #f4f4f4}.novo-expansion-panel.novo-expanded[theme=light]{border-top:3px solid #d9dadc}.novo-expansion-panel.novo-expanded[theme=empty]{border-top:3px solid #cccdcc}.novo-expansion-panel.novo-expanded[theme=sand]{border-top:3px solid #f4f4f4}.novo-expansion-panel.novo-expanded[theme=silver]{border-top:3px solid #e2e2e2}.novo-expansion-panel.novo-expanded[theme=stone]{border-top:3px solid #bebebe}.novo-expansion-panel{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-sizing:content-box;display:block;margin:0 16px;transition:margin 225ms ease-in-out}.novo-expansion-panel.novo-expanded{margin:16px 4px}.novo-expansion-panel.novo-expanded:first-child{margin-top:0}.novo-expansion-panel.novo-expanded:last-child{margin-bottom:0}.novo-expansion-panel-content{overflow:hidden}.novo-expansion-panel-content.novo-expanded{overflow:visible}.novo-expansion-panel-padding .novo-expansion-panel-body{padding:0 24px 16px}.novo-accordion .novo-expansion-panel-spacing:first-child{margin-top:0}.novo-accordion .novo-expansion-panel-spacing:last-child{margin-bottom:0}.novo-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.novo-action-row button.novo-button{margin-left:8px}[dir=rtl] .novo-action-row button.novo-button{margin-left:0;margin-right:8px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2V4cGFuc2lvbi9leHBhbnNpb24tcGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixJQUFJLEVBQ0osS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBRVIsZ0JBQWdCLEVBQ2hCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLdEUsaURBQWlEO0FBQ2pELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQjs7Ozs7R0FLRztBQWdCSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsZ0JBQWdCO0lBK0N0RCxZQUdFLFNBQXdCLEVBQ3hCLGtC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U0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsaUJBQWlCO2lCQUN6QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENka0FjY29yZGlvbkl0ZW0gfSBmcm9tICdAYW5ndWxhci9jZGsvYWNjb3JkaW9uJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN0YXJ0V2l0aCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9BY2NvcmRpb24gfSBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQgeyBub3ZvRXhwYW5zaW9uQW5pbWF0aW9ucyB9IGZyb20gJy4vZXhwYW5zaW9uLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTm92b0V4cGFuc2lvblBhbmVsQ29udGVudCB9IGZyb20gJy4vZXhwYW5zaW9uLXBhbmVsLWNvbnRlbnQnO1xuXG4vKiogTm92b0V4cGFuc2lvblBhbmVsJ3Mgc3RhdGVzLiAqL1xuZXhwb3J0IHR5cGUgTm92b0V4cGFuc2lvblBhbmVsU3RhdGUgPSAnZXhwYW5kZWQnIHwgJ2NvbGxhcHNlZCc7XG5cbi8qKiBDb3VudGVyIGZvciBnZW5lcmF0aW5nIHVuaXF1ZSBlbGVtZW50IGlkcy4gKi9cbmxldCB1bmlxdWVJZCA9IDA7XG5cbi8qKlxuICogYDxub3ZvLWV4cGFuc2lvbi1wYW5lbD5gXG4gKlxuICogVGhpcyBjb21wb25lbnQgY2FuIGJlIHVzZWQgYXMgYSBzaW5nbGUgZWxlbWVudCB0byBzaG93IGV4cGFuZGFibGUgY29udGVudCwgb3IgYXMgb25lIG9mXG4gKiBtdWx0aXBsZSBjaGlsZHJlbiBvZiBhbiBlbGVtZW50IHdpdGggdGhlIE5vdm9BY2NvcmRpb24gZGlyZWN0aXZlIGF0dGFjaGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc3R5bGVVcmxzOiBbJy4vZXhwYW5zaW9uLXBhbmVsLnNjc3MnXSxcbiAgc2VsZWN0b3I6ICdub3ZvLWV4cGFuc2lvbi1wYW5lbCcsXG4gIGV4cG9ydEFzOiAnbm92b0V4cGFuc2lvblBhbmVsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2V4cGFuc2lvbi1wYW5lbC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtub3ZvRXhwYW5zaW9uQW5pbWF0aW9ucy5ib2R5RXhwYW5zaW9uXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1leHBhbnNpb24tcGFuZWwnLFxuICAgICdbY2xhc3Mubm92by1leHBhbmRlZF0nOiAnZXhwYW5kZWQnLFxuICAgICdbY2xhc3Mubm92by1leHBhbnNpb24tcGFuZWwtc3BhY2luZ10nOiAnX2hhc1NwYWNpbmcoKScsXG4gICAgJ1tjbGFzcy5ub3ZvLWV4cGFuc2lvbi1wYW5lbC1wYWRkaW5nXSc6ICdwYWRkaW5nJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0V4cGFuc2lvblBhbmVsIGV4dGVuZHMgQ2RrQWNjb3JkaW9uSXRlbSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGV4cGFuZGVkOiBib29sZWFuO1xuICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGluZGljYXRvciBzaG91bGQgYmUgaGlkZGVuLiAqL1xuICBASW5wdXQoKVxuICBnZXQgaGlkZVRvZ2dsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZVRvZ2dsZTtcbiAgfVxuICBzZXQgaGlkZVRvZ2dsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVUb2dnbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2hpZGVUb2dnbGUgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgcGFkZGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcGFkZGluZztcbiAgfVxuICBzZXQgcGFkZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3BhZGRpbmcgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3BhZGRpbmcgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKVxuICBvcGVuZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZXhwYW5kZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgZm9yIGNoYW5nZXMgaW4gYEBJbnB1dGAgcHJvcGVydGllcy4gKi9cbiAgcmVhZG9ubHkgX2lucHV0Q2hhbmdlcyA9IG5ldyBTdWJqZWN0PFNpbXBsZUNoYW5nZXM+KCk7XG5cbiAgLyoqIE9wdGlvbmFsbHkgZGVmaW5lZCBhY2NvcmRpb24gdGhlIGV4cGFuc2lvbiBwYW5lbCBiZWxvbmdzIHRvLiAqL1xuICBhY2NvcmRpb246IE5vdm9BY2NvcmRpb247XG5cbiAgLyoqIENvbnRlbnQgdGhhdCB3aWxsIGJlIHJlbmRlcmVkIGxhemlseS4gKi9cbiAgQENvbnRlbnRDaGlsZChOb3ZvRXhwYW5zaW9uUGFuZWxDb250ZW50KVxuICBfbGF6eUNvbnRlbnQ6IE5vdm9FeHBhbnNpb25QYW5lbENvbnRlbnQ7XG5cbiAgLyoqIFBvcnRhbCBob2xkaW5nIHRoZSB1c2VyJ3MgY29udGVudC4gKi9cbiAgX3BvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG5cbiAgLyoqIElEIGZvciB0aGUgYXNzb2NpYXRlZCBoZWFkZXIgZWxlbWVudC4gVXNlZCBmb3IgYTExeSBsYWJlbGxpbmcuICovXG4gIF9oZWFkZXJJZCA9IGBub3ZvLWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItJHt1bmlxdWVJZCsrfWA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASG9zdCgpXG4gICAgYWNjb3JkaW9uOiBOb3ZvQWNjb3JkaW9uLFxuICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgX3VuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXI6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIsXG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgKSB7XG4gICAgc3VwZXIoYWNjb3JkaW9uLCBfY2hhbmdlRGV0ZWN0b3JSZWYsIF91bmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyKTtcbiAgICB0aGlzLmFjY29yZGlvbiA9IGFjY29yZGlvbjtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBleHBhbnNpb24gaW5kaWNhdG9yIHNob3VsZCBiZSBoaWRkZW4uICovXG4gIF9nZXRIaWRlVG9nZ2xlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmFjY29yZGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuYWNjb3JkaW9uLmhpZGVUb2dnbGU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmhpZGVUb2dnbGU7XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBleHBhbnNpb24gcGFuZWwgc2hvdWxkIGhhdmUgc3BhY2luZyBiZXR3ZWVuIGl0IGFuZCBpdHMgc2libGluZ3MuICovXG4gIF9oYXNTcGFjaW5nKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmFjY29yZGlvbikge1xuICAgICAgcmV0dXJuICh0aGlzLmV4cGFuZGVkID8gdGhpcy5hY2NvcmRpb24uZGlzcGxheU1vZGUgOiB0aGlzLl9nZXRFeHBhbmRlZFN0YXRlKCkpID09PSAnZGVmYXVsdCc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBleHBhbmRlZCBzdGF0ZSBzdHJpbmcuICovXG4gIF9nZXRFeHBhbmRlZFN0YXRlKCk6IE5vdm9FeHBhbnNpb25QYW5lbFN0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJztcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5fbGF6eUNvbnRlbnQpIHtcbiAgICAgIC8vIFJlbmRlciB0aGUgY29udGVudCBhcyBzb29uIGFzIHRoZSBwYW5lbCBiZWNvbWVzIG9wZW4uXG4gICAgICB0aGlzLm9wZW5lZFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuZXhwYW5kZWQgJiYgIXRoaXMuX3BvcnRhbCksXG4gICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5fbGF6eUNvbnRlbnQuX3RlbXBsYXRlLCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuX2lucHV0Q2hhbmdlcy5uZXh0KGNoYW5nZXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLl9pbnB1dENoYW5nZXMuY29tcGxldGUoKTtcbiAgfVxuXG4gIF9ib2R5QW5pbWF0aW9uKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IGV2ZW50LmVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGNvbnN0IGNzc0NsYXNzID0gJ25vdm8tZXhwYW5kZWQnO1xuICAgIGNvbnN0IHsgcGhhc2VOYW1lLCB0b1N0YXRlIH0gPSBldmVudDtcblxuICAgIC8vIFRvZ2dsZSB0aGUgYm9keSdzIGBvdmVyZmxvdzogaGlkZGVuYCBjbGFzcyB3aGVuIGNsb3Npbmcgc3RhcnRzIG9yIHdoZW4gZXhwYW5zaW9uIGVuZHMgaW5cbiAgICAvLyBvcmRlciB0byBwcmV2ZW50IHRoZSBjYXNlcyB3aGVyZSBzd2l0Y2hpbmcgdG9vIGVhcmx5IHdvdWxkIGNhdXNlIHRoZSBhbmltYXRpb24gdG8ganVtcC5cbiAgICAvLyBOb3RlIHRoYXQgd2UgZG8gaXQgZGlyZWN0bHkgb24gdGhlIERPTSBlbGVtZW50IHRvIGF2b2lkIHRoZSBzbGlnaHQgZGVsYXkgdGhhdCBjb21lc1xuICAgIC8vIHdpdGggZG9pbmcgaXQgdmlhIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgaWYgKHBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIHRvU3RhdGUgPT09ICdleHBhbmRlZCcpIHtcbiAgICAgIGNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgIH0gZWxzZSBpZiAocGhhc2VOYW1lID09PSAnc3RhcnQnICYmIHRvU3RhdGUgPT09ICdjb2xsYXBzZWQnKSB7XG4gICAgICBjbGFzc0xpc3QucmVtb3ZlKGNzc0NsYXNzKTtcbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpb24tcm93JyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1hY3Rpb24tcm93JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0V4cGFuc2lvblBhbmVsQWN0aW9uUm93IHt9XG4iXX0=