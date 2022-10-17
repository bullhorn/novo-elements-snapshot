import { CdkAccordion, CdkAccordionItem, CdkAccordionModule } from '@angular/cdk/accordion';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Directive, Input, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, Host, Output, ContentChild, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate, group, query, animateChild } from '@angular/animations';
import * as i2 from '@angular/cdk/collections';
import * as i3 from '@angular/cdk/portal';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { Subject, Subscription, merge } from 'rxjs';
import { startWith, filter, take } from 'rxjs/operators';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';

/**
 * Directive for a Material Design Accordion.
 */
class NovoAccordion extends CdkAccordion {
    constructor() {
        super(...arguments);
        this._hideToggle = false;
        /**
         * The display mode used for all expansion panels in the accordion. Currently two display
         * modes exist:
         *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
         *     panel at a different elevation from the reset of the accordion.
         *  flat - no spacing is placed around expanded panels, showing all panels at the same
         *     elevation.
         */
        this.displayMode = 'default';
    }
    /** Whether the expansion indicator should be hidden. */
    get hideToggle() {
        return this._hideToggle;
    }
    set hideToggle(show) {
        this._hideToggle = coerceBooleanProperty(show);
    }
}
NovoAccordion.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAccordion, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoAccordion.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoAccordion, selector: "novo-accordion", inputs: { hideToggle: "hideToggle", displayMode: "displayMode" }, host: { classAttribute: "novo-accordion" }, exportAs: ["novoAccordion"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAccordion, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-accordion',
                    exportAs: 'novoAccordion',
                    host: {
                        class: 'novo-accordion',
                    },
                }]
        }], propDecorators: { hideToggle: [{
                type: Input
            }], displayMode: [{
                type: Input
            }] } });

/** Time and timing curve for expansion panel animations. */
const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';
/** Animations used by the Material expansion panel. */
const novoExpansionAnimations = {
    /** Animation that rotates the indicator arrow. */
    indicatorRotate: trigger('indicatorRotate', [
        state('collapsed', style({ transform: 'rotate(0deg)' })),
        state('expanded', style({ transform: 'rotate(90deg)' })),
        transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
    ]),
    /** Animation that expands and collapses the panel header height. */
    expansionHeaderHeight: trigger('expansionHeight', [
        state('collapsed', style({
            height: '{{collapsedHeight}}',
        }), {
            params: { collapsedHeight: '48px' },
        }),
        state('expanded', style({
            height: '{{expandedHeight}}',
        }), {
            params: { expandedHeight: '56px' },
        }),
        transition('expanded <=> collapsed', group([query('@indicatorRotate', animateChild(), { optional: true }), animate(EXPANSION_PANEL_ANIMATION_TIMING)])),
    ]),
    /** Animation that expands and collapses the panel content. */
    bodyExpansion: trigger('bodyExpansion', [
        state('collapsed', style({ height: '0px', visibility: 'hidden' })),
        state('expanded', style({ height: '*', visibility: 'visible' })),
        transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
    ]),
};

/**
 * Expansion panel content that will be rendered lazily
 * after the panel is opened for the first time.
 */
class NovoExpansionPanelContent {
    constructor(_template) {
        this._template = _template;
    }
}
NovoExpansionPanelContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelContent, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoExpansionPanelContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoExpansionPanelContent, selector: "ng-template[matExpansionPanelContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[matExpansionPanelContent]',
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

/** Counter for generating unique element ids. */
let uniqueId = 0;
/**
 * `<novo-expansion-panel>`
 *
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the NovoAccordion directive attached.
 */
class NovoExpansionPanel extends CdkAccordionItem {
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
NovoExpansionPanel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanel, deps: [{ token: NovoAccordion, host: true, optional: true }, { token: i0.ChangeDetectorRef }, { token: i2.UniqueSelectionDispatcher }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
NovoExpansionPanel.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoExpansionPanel, selector: "novo-expansion-panel", inputs: { hideToggle: "hideToggle", padding: "padding" }, outputs: { opened: "opened", closed: "closed", expandedChange: "expandedChange" }, host: { properties: { "class.novo-expanded": "expanded", "class.novo-expansion-panel-spacing": "_hasSpacing()", "class.novo-expansion-panel-padding": "padding" }, classAttribute: "novo-expansion-panel" }, queries: [{ propertyName: "_lazyContent", first: true, predicate: NovoExpansionPanelContent, descendants: true }], exportAs: ["novoExpansionPanel"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-content select=\"novo-expansion-panel-header\"></ng-content>\n<div class=\"novo-expansion-panel-content\"\n     role=\"region\"\n     [@bodyExpansion]=\"_getExpandedState()\"\n     (@bodyExpansion.done)=\"_bodyAnimation($event)\"\n     (@bodyExpansion.start)=\"_bodyAnimation($event)\"\n     [attr.aria-labelledby]=\"_headerId\"\n     [id]=\"id\"\n     #body>\n  <div class=\"novo-expansion-panel-body\">\n    <ng-content></ng-content>\n    <ng-template [cdkPortalOutlet]=\"_portal\"></ng-template>\n  </div>\n  <ng-content select=\"novo-action-row\"></ng-content>\n</div>\n", styles: [".novo-expansion-panel{background:var(--color-background);color:var(--color-text)}.novo-action-row{border-top-color:var(--color-border)}.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused,.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]):hover{background:rgba(0,0,0,.04)}.novo-expansion-panel-header-title{color:var(--color-text)}.novo-expansion-panel-header-description,.novo-expansion-indicator{border-color:var(--color-text)}.novo-expansion-panel-header[aria-disabled=true]{color:var(--color-text-disabled);pointer-events:none}.novo-expansion-panel-header[aria-disabled=true] .novo-expansion-panel-header-title,.novo-expansion-panel-header[aria-disabled=true] .novo-expansion-panel-header-description{color:inherit}.novo-expansion-panel.novo-expanded[theme=person],.novo-expansion-panel.novo-expanded[theme=company],.novo-expansion-panel.novo-expanded[theme=candidate],.novo-expansion-panel.novo-expanded[theme=lead],.novo-expansion-panel.novo-expanded[theme=contact],.novo-expansion-panel.novo-expanded[theme=clientcontact],.novo-expansion-panel.novo-expanded[theme=opportunity],.novo-expansion-panel.novo-expanded[theme=job],.novo-expansion-panel.novo-expanded[theme=joborder],.novo-expansion-panel.novo-expanded[theme=submission],.novo-expansion-panel.novo-expanded[theme=sendout],.novo-expansion-panel.novo-expanded[theme=placement],.novo-expansion-panel.novo-expanded[theme=note],.novo-expansion-panel.novo-expanded[theme=task],.novo-expansion-panel.novo-expanded[theme=distribution-list],.novo-expansion-panel.novo-expanded[theme=credential],.novo-expansion-panel.novo-expanded[theme=user],.novo-expansion-panel.novo-expanded[theme=corporate-user],.novo-expansion-panel.novo-expanded[theme=contract],.novo-expansion-panel.novo-expanded[theme=job-code],.novo-expansion-panel.novo-expanded[theme=earn-code],.novo-expansion-panel.novo-expanded[theme=billable-charge],.novo-expansion-panel.novo-expanded[theme=payable-charge],.novo-expansion-panel.novo-expanded[theme=invoice-statement],.novo-expansion-panel.novo-expanded[theme=selection],.novo-expansion-panel.novo-expanded[theme=positive],.novo-expansion-panel.novo-expanded[theme=success],.novo-expansion-panel.novo-expanded[theme=warning],.novo-expansion-panel.novo-expanded[theme=error],.novo-expansion-panel.novo-expanded[theme=info],.novo-expansion-panel.novo-expanded[theme=disabled],.novo-expansion-panel.novo-expanded[theme=red],.novo-expansion-panel.novo-expanded[theme=pink],.novo-expansion-panel.novo-expanded[theme=orange],.novo-expansion-panel.novo-expanded[theme=yellow],.novo-expansion-panel.novo-expanded[theme=green],.novo-expansion-panel.novo-expanded[theme=teal],.novo-expansion-panel.novo-expanded[theme=blue],.novo-expansion-panel.novo-expanded[theme=aqua],.novo-expansion-panel.novo-expanded[theme=indigo],.novo-expansion-panel.novo-expanded[theme=violet],.novo-expansion-panel.novo-expanded[theme=gray]{border-top:3px solid var(--color-border)}.novo-expansion-panel{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;box-sizing:content-box;display:block;transition:margin 225ms ease-in-out;margin:0 16px}.novo-expansion-panel.novo-expanded:first-child{margin-top:0}.novo-expansion-panel.novo-expanded:last-child{margin-bottom:0}.novo-expansion-panel-content{overflow:hidden}.novo-expansion-panel-content.novo-expanded{overflow:visible}.novo-expansion-panel-padding .novo-expansion-panel-body{padding:0 24px 16px}.novo-expansion-panel-spacing{margin:16px 4px}.novo-accordion .novo-expansion-panel-spacing:first-child{margin-top:0}.novo-accordion .novo-expansion-panel-spacing:last-child{margin-bottom:0}.novo-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.novo-action-row button.novo-button{margin-left:8px}[dir=rtl] .novo-action-row button.novo-button{margin-left:0;margin-right:8px}\n"], directives: [{ type: i3.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [novoExpansionAnimations.bodyExpansion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanel, decorators: [{
            type: Component,
            args: [{ selector: 'novo-expansion-panel', exportAs: 'novoExpansionPanel', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [novoExpansionAnimations.bodyExpansion], host: {
                        class: 'novo-expansion-panel',
                        '[class.novo-expanded]': 'expanded',
                        '[class.novo-expansion-panel-spacing]': '_hasSpacing()',
                        '[class.novo-expansion-panel-padding]': 'padding',
                    }, template: "<ng-content select=\"novo-expansion-panel-header\"></ng-content>\n<div class=\"novo-expansion-panel-content\"\n     role=\"region\"\n     [@bodyExpansion]=\"_getExpandedState()\"\n     (@bodyExpansion.done)=\"_bodyAnimation($event)\"\n     (@bodyExpansion.start)=\"_bodyAnimation($event)\"\n     [attr.aria-labelledby]=\"_headerId\"\n     [id]=\"id\"\n     #body>\n  <div class=\"novo-expansion-panel-body\">\n    <ng-content></ng-content>\n    <ng-template [cdkPortalOutlet]=\"_portal\"></ng-template>\n  </div>\n  <ng-content select=\"novo-action-row\"></ng-content>\n</div>\n", styles: [".novo-expansion-panel{background:var(--color-background);color:var(--color-text)}.novo-action-row{border-top-color:var(--color-border)}.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused,.novo-expansion-panel:not(.novo-expanded) .novo-expansion-panel-header:not([aria-disabled=true]):hover{background:rgba(0,0,0,.04)}.novo-expansion-panel-header-title{color:var(--color-text)}.novo-expansion-panel-header-description,.novo-expansion-indicator{border-color:var(--color-text)}.novo-expansion-panel-header[aria-disabled=true]{color:var(--color-text-disabled);pointer-events:none}.novo-expansion-panel-header[aria-disabled=true] .novo-expansion-panel-header-title,.novo-expansion-panel-header[aria-disabled=true] .novo-expansion-panel-header-description{color:inherit}.novo-expansion-panel.novo-expanded[theme=person],.novo-expansion-panel.novo-expanded[theme=company],.novo-expansion-panel.novo-expanded[theme=candidate],.novo-expansion-panel.novo-expanded[theme=lead],.novo-expansion-panel.novo-expanded[theme=contact],.novo-expansion-panel.novo-expanded[theme=clientcontact],.novo-expansion-panel.novo-expanded[theme=opportunity],.novo-expansion-panel.novo-expanded[theme=job],.novo-expansion-panel.novo-expanded[theme=joborder],.novo-expansion-panel.novo-expanded[theme=submission],.novo-expansion-panel.novo-expanded[theme=sendout],.novo-expansion-panel.novo-expanded[theme=placement],.novo-expansion-panel.novo-expanded[theme=note],.novo-expansion-panel.novo-expanded[theme=task],.novo-expansion-panel.novo-expanded[theme=distribution-list],.novo-expansion-panel.novo-expanded[theme=credential],.novo-expansion-panel.novo-expanded[theme=user],.novo-expansion-panel.novo-expanded[theme=corporate-user],.novo-expansion-panel.novo-expanded[theme=contract],.novo-expansion-panel.novo-expanded[theme=job-code],.novo-expansion-panel.novo-expanded[theme=earn-code],.novo-expansion-panel.novo-expanded[theme=billable-charge],.novo-expansion-panel.novo-expanded[theme=payable-charge],.novo-expansion-panel.novo-expanded[theme=invoice-statement],.novo-expansion-panel.novo-expanded[theme=selection],.novo-expansion-panel.novo-expanded[theme=positive],.novo-expansion-panel.novo-expanded[theme=success],.novo-expansion-panel.novo-expanded[theme=warning],.novo-expansion-panel.novo-expanded[theme=error],.novo-expansion-panel.novo-expanded[theme=info],.novo-expansion-panel.novo-expanded[theme=disabled],.novo-expansion-panel.novo-expanded[theme=red],.novo-expansion-panel.novo-expanded[theme=pink],.novo-expansion-panel.novo-expanded[theme=orange],.novo-expansion-panel.novo-expanded[theme=yellow],.novo-expansion-panel.novo-expanded[theme=green],.novo-expansion-panel.novo-expanded[theme=teal],.novo-expansion-panel.novo-expanded[theme=blue],.novo-expansion-panel.novo-expanded[theme=aqua],.novo-expansion-panel.novo-expanded[theme=indigo],.novo-expansion-panel.novo-expanded[theme=violet],.novo-expansion-panel.novo-expanded[theme=gray]{border-top:3px solid var(--color-border)}.novo-expansion-panel{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;box-sizing:content-box;display:block;transition:margin 225ms ease-in-out;margin:0 16px}.novo-expansion-panel.novo-expanded:first-child{margin-top:0}.novo-expansion-panel.novo-expanded:last-child{margin-bottom:0}.novo-expansion-panel-content{overflow:hidden}.novo-expansion-panel-content.novo-expanded{overflow:visible}.novo-expansion-panel-padding .novo-expansion-panel-body{padding:0 24px 16px}.novo-expansion-panel-spacing{margin:16px 4px}.novo-accordion .novo-expansion-panel-spacing:first-child{margin-top:0}.novo-accordion .novo-expansion-panel-spacing:last-child{margin-bottom:0}.novo-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.novo-action-row button.novo-button{margin-left:8px}[dir=rtl] .novo-action-row button.novo-button{margin-left:0;margin-right:8px}\n"] }]
        }], ctorParameters: function () { return [{ type: NovoAccordion, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }, { type: i0.ChangeDetectorRef }, { type: i2.UniqueSelectionDispatcher }, { type: i0.ViewContainerRef }]; }, propDecorators: { hideToggle: [{
                type: Input
            }], padding: [{
                type: Input
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], expandedChange: [{
                type: Output
            }], _lazyContent: [{
                type: ContentChild,
                args: [NovoExpansionPanelContent]
            }] } });
class NovoExpansionPanelActionRow {
}
NovoExpansionPanelActionRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelActionRow, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoExpansionPanelActionRow.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoExpansionPanelActionRow, selector: "novo-action-row", host: { classAttribute: "novo-action-row" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelActionRow, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-action-row',
                    host: {
                        class: 'novo-action-row',
                    },
                }]
        }] });

/**
 * `<novo-expansion-panel-header>`
 *
 * This component corresponds to the header element of an `<novo-expansion-panel>`.
 */
class NovoExpansionPanelHeader {
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
NovoExpansionPanelHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelHeader, deps: [{ token: NovoExpansionPanel, host: true }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoExpansionPanelHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoExpansionPanelHeader, selector: "novo-expansion-panel-header", inputs: { expandedHeight: "expandedHeight", collapsedHeight: "collapsedHeight" }, host: { attributes: { "role": "button" }, listeners: { "click": "_toggle()", "keydown": "_keydown($event)" }, properties: { "attr.id": "panel._headerId", "attr.tabindex": "panel.disabled ? -1 : 0", "attr.aria-controls": "_getPanelId()", "attr.aria-expanded": "_isExpanded()", "attr.aria-disabled": "panel.disabled", "class.novo-expanded": "_isExpanded()", "@expansionHeight": "{\n        value: _getExpandedState(),\n        params: {\n          collapsedHeight: collapsedHeight,\n          expandedHeight: expandedHeight\n        }\n    }" }, classAttribute: "novo-expansion-panel-header" }, ngImport: i0, template: "<span [@indicatorRotate]=\"_getExpandedState()\" *ngIf=\"_showToggle()\"\n      class=\"novo-expansion-indicator\" size=\"lg\"></span>\n<span class=\"novo-content\">\n  <ng-content select=\"novo-panel-title\"></ng-content>\n  <ng-content select=\"novo-panel-description\"></ng-content>\n  <ng-content></ng-content>\n</span>\n", styles: [".novo-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px}.novo-expansion-panel-header:focus,.novo-expansion-panel-header:hover{outline:none}.novo-expansion-panel-header.novo-expanded:focus,.novo-expansion-panel-header.novo-expanded:hover{background:inherit}.novo-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.novo-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.novo-expansion-panel-header-title,.novo-expansion-panel-header-description{display:flex;flex-grow:1;margin-right:16px;align-items:center;gap:1rem}[dir=rtl] .novo-expansion-panel-header-title,[dir=rtl] .novo-expansion-panel-header-description{margin-right:0;margin-left:16px}.novo-expansion-panel-header-description{flex-grow:2}.novo-expansion-indicator{margin-right:10px}.novo-expansion-indicator:after{border-style:solid;border-width:0 2px 2px 0;content:\"\";display:inline-block;padding:3px;transform:rotate(-45deg);vertical-align:middle}\n"], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [novoExpansionAnimations.indicatorRotate, novoExpansionAnimations.expansionHeaderHeight], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelHeader, decorators: [{
            type: Component,
            args: [{ selector: 'novo-expansion-panel-header', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [novoExpansionAnimations.indicatorRotate, novoExpansionAnimations.expansionHeaderHeight], host: {
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
                    }, template: "<span [@indicatorRotate]=\"_getExpandedState()\" *ngIf=\"_showToggle()\"\n      class=\"novo-expansion-indicator\" size=\"lg\"></span>\n<span class=\"novo-content\">\n  <ng-content select=\"novo-panel-title\"></ng-content>\n  <ng-content select=\"novo-panel-description\"></ng-content>\n  <ng-content></ng-content>\n</span>\n", styles: [".novo-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px}.novo-expansion-panel-header:focus,.novo-expansion-panel-header:hover{outline:none}.novo-expansion-panel-header.novo-expanded:focus,.novo-expansion-panel-header.novo-expanded:hover{background:inherit}.novo-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.novo-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.novo-expansion-panel-header-title,.novo-expansion-panel-header-description{display:flex;flex-grow:1;margin-right:16px;align-items:center;gap:1rem}[dir=rtl] .novo-expansion-panel-header-title,[dir=rtl] .novo-expansion-panel-header-description{margin-right:0;margin-left:16px}.novo-expansion-panel-header-description{flex-grow:2}.novo-expansion-indicator{margin-right:10px}.novo-expansion-indicator:after{border-style:solid;border-width:0 2px 2px 0;content:\"\";display:inline-block;padding:3px;transform:rotate(-45deg);vertical-align:middle}\n"] }]
        }], ctorParameters: function () { return [{ type: NovoExpansionPanel, decorators: [{
                    type: Host
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { expandedHeight: [{
                type: Input
            }], collapsedHeight: [{
                type: Input
            }] } });
/**
 * `<novo-panel-description>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
class NovoExpansionPanelDescription {
}
NovoExpansionPanelDescription.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelDescription, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoExpansionPanelDescription.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoExpansionPanelDescription, selector: "novo-panel-description", host: { classAttribute: "novo-expansion-panel-header-description" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelDescription, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-panel-description',
                    host: {
                        class: 'novo-expansion-panel-header-description',
                    },
                }]
        }] });
/**
 * `<novo-panel-title>`
 *
 * This direction is to be used inside of the NovoExpansionPanelHeader component.
 */
class NovoExpansionPanelTitle {
}
NovoExpansionPanelTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelTitle, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoExpansionPanelTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoExpansionPanelTitle, selector: "novo-panel-title", host: { classAttribute: "novo-expansion-panel-header-title" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionPanelTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-panel-title',
                    host: {
                        class: 'novo-expansion-panel-header-title',
                    },
                }]
        }] });

class NovoExpansionModule {
}
NovoExpansionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoExpansionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionModule, declarations: [NovoAccordion,
        NovoExpansionPanel,
        NovoExpansionPanelActionRow,
        NovoExpansionPanelHeader,
        NovoExpansionPanelTitle,
        NovoExpansionPanelDescription,
        NovoExpansionPanelContent], imports: [CommonModule, CdkAccordionModule, PortalModule], exports: [NovoAccordion,
        NovoExpansionPanel,
        NovoExpansionPanelActionRow,
        NovoExpansionPanelHeader,
        NovoExpansionPanelTitle,
        NovoExpansionPanelDescription,
        NovoExpansionPanelContent] });
NovoExpansionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionModule, imports: [[CommonModule, CdkAccordionModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoExpansionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CdkAccordionModule, PortalModule],
                    exports: [
                        NovoAccordion,
                        NovoExpansionPanel,
                        NovoExpansionPanelActionRow,
                        NovoExpansionPanelHeader,
                        NovoExpansionPanelTitle,
                        NovoExpansionPanelDescription,
                        NovoExpansionPanelContent,
                    ],
                    declarations: [
                        NovoAccordion,
                        NovoExpansionPanel,
                        NovoExpansionPanelActionRow,
                        NovoExpansionPanelHeader,
                        NovoExpansionPanelTitle,
                        NovoExpansionPanelDescription,
                        NovoExpansionPanelContent,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { EXPANSION_PANEL_ANIMATION_TIMING, NovoAccordion, NovoExpansionModule, NovoExpansionPanel, NovoExpansionPanelActionRow, NovoExpansionPanelContent, NovoExpansionPanelDescription, NovoExpansionPanelHeader, NovoExpansionPanelTitle, novoExpansionAnimations };
//# sourceMappingURL=novo-elements-components-expansion.mjs.map
