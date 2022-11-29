import { FocusMonitor, FocusTrapFactory } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, NgZone, Optional, Output, ViewEncapsulation, } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, take, takeUntil } from 'rxjs/operators';
import { novoSidenavAnimations } from './sidenav.animations';
import { NOVO_LAYOUT_CONTAINER } from '../layout.constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/cdk/platform";
export class NovoSidenavComponent {
    constructor(_elementRef, _focusTrapFactory, _focusMonitor, _platform, _ngZone, _doc, _container) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this._focusMonitor = _focusMonitor;
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._doc = _doc;
        this._container = _container;
        this._fixedInViewport = false;
        this._fixedTopGap = 0;
        this._fixedBottomGap = 0;
        this._elementFocusedBeforeDrawerWasOpened = null;
        /** Whether the drawer is initialized. Used for disabling the initial animation. */
        this._enableAnimations = false;
        this._position = 'start';
        this._mode = 'over';
        this._disableClose = false;
        this._opened = false;
        /** Emits whenever the drawer has started animating. */
        this._animationStarted = new Subject();
        /** Emits whenever the drawer is done animating. */
        this._animationEnd = new Subject();
        /** Current state of the sidenav animation. */
        // @HostBinding is used in the class as it is expected to be extended.  Since @Component decorator
        // metadata is not inherited by child classes, instead the host binding data is defined in a way
        // that can be inherited.
        // tslint:disable:no-host-decorator-in-concrete
        this._animationState = 'void';
        /** Event emitted when the drawer open state is changed. */
        this.openedChange = 
        // Note this has to be async in order to avoid some issues with two-bindings (see #8872).
        new EventEmitter(/* isAsync */ true);
        /** Event emitted when the drawer has been opened. */
        this._openedStream = this.openedChange.pipe(filter((o) => o), map(() => { }));
        /** Event emitted when the drawer has started opening. */
        this.openedStart = this._animationStarted.pipe(filter((e) => e.fromState !== e.toState && e.toState.indexOf('open') === 0), mapTo(undefined));
        /** Event emitted when the drawer has been closed. */
        this._closedStream = this.openedChange.pipe(filter((o) => !o), map(() => { }));
        /** Event emitted when the drawer has started closing. */
        this.closedStart = this._animationStarted.pipe(filter((e) => e.fromState !== e.toState && e.toState === 'void'), mapTo(undefined));
        /** Emits when the component is destroyed. */
        this._destroyed = new Subject();
        /** Event emitted when the drawer's position changes. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onPositionChanged = new EventEmitter();
        /**
         * An observable that emits when the drawer mode changes. This is used by the drawer container to
         * to know when to when the mode changes so it can adapt the margins on the content.
         */
        this._modeChanged = new Subject();
        this.openedChange.subscribe((opened) => {
            if (opened) {
                if (this._doc) {
                    this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement;
                }
                this._takeFocus();
            }
            else if (this._isFocusWithinDrawer()) {
                this._restoreFocus();
            }
        });
        /**
         * Listen to `keydown` events outside the zone so that change detection is not run every
         * time a key is pressed. Instead we re-enter the zone only if the `ESC` key is pressed
         * and we don't have close disabled.
         */
        this._ngZone.runOutsideAngular(() => {
            fromEvent(this._elementRef.nativeElement, 'keydown')
                .pipe(filter((event) => {
                return event.key === "Escape" /* Escape */ && !this.disableClose && !hasModifierKey(event);
            }), takeUntil(this._destroyed))
                .subscribe((event) => this._ngZone.run(() => {
                this.close();
                event.stopPropagation();
                event.preventDefault();
            }));
        });
        // We need a Subject with distinctUntilChanged, because the `done` event
        // fires twice on some browsers. See https://github.com/angular/angular/issues/24084
        this._animationEnd
            .pipe(distinctUntilChanged((x, y) => {
            return x.fromState === y.fromState && x.toState === y.toState;
        }))
            .subscribe((event) => {
            const { fromState, toState } = event;
            if ((toState.indexOf('open') === 0 && fromState === 'void') || (toState === 'void' && fromState.indexOf('open') === 0)) {
                this.openedChange.emit(this._opened);
            }
        });
    }
    /** Whether the sidenav is fixed in the viewport. */
    get fixedInViewport() {
        return this._fixedInViewport;
    }
    set fixedInViewport(value) {
        this._fixedInViewport = coerceBooleanProperty(value);
    }
    /**
     * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
     * mode.
     */
    get fixedTopGap() {
        return this._fixedTopGap;
    }
    set fixedTopGap(value) {
        this._fixedTopGap = coerceNumberProperty(value);
    }
    /**
     * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
     * fixed mode.
     */
    get fixedBottomGap() {
        return this._fixedBottomGap;
    }
    set fixedBottomGap(value) {
        this._fixedBottomGap = coerceNumberProperty(value);
    }
    /** The side that the drawer is attached to. */
    get position() {
        return this._position;
    }
    set position(value) {
        // Make sure we have a valid value.
        value = value === 'end' ? 'end' : 'start';
        if (value !== this._position) {
            this._position = value;
            this.onPositionChanged.emit();
        }
    }
    /** Mode of the drawer; one of 'over', 'push' or 'side'. */
    get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
        this._updateFocusTrapState();
        this._modeChanged.next();
    }
    /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
    get disableClose() {
        return this._disableClose;
    }
    set disableClose(value) {
        this._disableClose = coerceBooleanProperty(value);
    }
    /**
     * Whether the drawer should focus the first focusable element automatically when opened.
     * Defaults to false in when `mode` is set to `side`, otherwise defaults to `true`. If explicitly
     * enabled, focus will be moved into the sidenav in `side` mode as well.
     */
    get autoFocus() {
        const value = this._autoFocus;
        // Note that usually we disable auto focusing in `side` mode, because we don't know how the
        // sidenav is being used, but in some cases it still makes sense to do it. If the consumer
        // explicitly enabled `autoFocus`, we take it as them always wanting to enable it.
        return value == null ? this.mode !== 'side' : value;
    }
    set autoFocus(value) {
        this._autoFocus = coerceBooleanProperty(value);
    }
    /**
     * Whether the drawer is opened. We overload this because we trigger an event when it
     * starts or end.
     */
    get opened() {
        return this._opened;
    }
    set opened(value) {
        this.toggle(coerceBooleanProperty(value));
    }
    /**
     * Moves focus into the drawer. Note that this works even if
     * the focus trap is disabled in `side` mode.
     */
    _takeFocus() {
        if (!this.autoFocus || !this._focusTrap) {
            return;
        }
        this._focusTrap.focusInitialElementWhenReady().then((hasMovedFocus) => {
            // If there were no focusable elements, focus the sidenav itself so the keyboard navigation
            // still works. We need to check that `focus` is a function due to Universal.
            if (!hasMovedFocus && typeof this._elementRef.nativeElement.focus === 'function') {
                this._elementRef.nativeElement.focus();
            }
        });
    }
    /**
     * Restores focus to the element that was originally focused when the drawer opened.
     * If no element was focused at that time, the focus will be restored to the drawer.
     */
    _restoreFocus() {
        if (!this.autoFocus) {
            return;
        }
        // Note that we don't check via `instanceof HTMLElement` so that we can cover SVGs as well.
        if (this._elementFocusedBeforeDrawerWasOpened) {
            this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia);
        }
        else {
            this._elementRef.nativeElement.blur();
        }
        this._elementFocusedBeforeDrawerWasOpened = null;
        this._openedVia = null;
    }
    /** Whether focus is currently within the drawer. */
    _isFocusWithinDrawer() {
        const activeEl = this._doc?.activeElement;
        return !!activeEl && this._elementRef.nativeElement.contains(activeEl);
    }
    ngAfterContentInit() {
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        this._updateFocusTrapState();
    }
    ngAfterContentChecked() {
        // Enable the animations after the lifecycle hooks have run, in order to avoid animating
        // drawers that are open by default. When we're on the server, we shouldn't enable the
        // animations, because we don't want the drawer to animate the first time the user sees
        // the page.
        if (this._platform.isBrowser) {
            this._enableAnimations = true;
        }
    }
    ngOnDestroy() {
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
        this._animationStarted.complete();
        this._animationEnd.complete();
        this._modeChanged.complete();
        this._destroyed.next();
        this._destroyed.complete();
    }
    /**
     * Open the drawer.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    open(openedVia) {
        return this.toggle(true, openedVia);
    }
    /** Close the drawer. */
    close() {
        return this.toggle(false);
    }
    /** Closes the drawer with context that the backdrop was clicked. */
    _closeViaBackdropClick() {
        // If the drawer is closed upon a backdrop click, we always want to restore focus. We
        // don't need to check whether focus is currently in the drawer, as clicking on the
        // backdrop causes blurring of the active element.
        return this._setOpen(/* isOpen */ false, /* restoreFocus */ true);
    }
    /**
     * Toggle this drawer.
     * @param isOpen Whether the drawer should be open.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    toggle(isOpen = !this.opened, openedVia) {
        // If the focus is currently inside the drawer content and we are closing the drawer,
        // restore the focus to the initially focused element (when the drawer opened).
        return this._setOpen(isOpen, /* restoreFocus */ !isOpen && this._isFocusWithinDrawer(), openedVia);
    }
    /**
     * Toggles the opened state of the drawer.
     * @param isOpen Whether the drawer should open or close.
     * @param restoreFocus Whether focus should be restored on close.
     * @param openedVia Focus origin that can be optionally set when opening a drawer. The
     *   origin will be used later when focus is restored on drawer close.
     */
    _setOpen(isOpen, restoreFocus, openedVia = 'program') {
        this._opened = isOpen;
        if (isOpen) {
            this._animationState = this._enableAnimations ? 'open' : 'open-instant';
            this._openedVia = openedVia;
        }
        else {
            this._animationState = 'void';
            if (restoreFocus) {
                this._restoreFocus();
            }
        }
        this._updateFocusTrapState();
        return new Promise((resolve) => {
            this.openedChange.pipe(take(1)).subscribe((open) => resolve(open ? 'open' : 'close'));
        });
    }
    _getWidth() {
        return this._elementRef.nativeElement ? this._elementRef.nativeElement.offsetWidth || 0 : 0;
    }
    /** Updates the enabled state of the focus trap. */
    _updateFocusTrapState() {
        if (this._focusTrap) {
            // The focus trap is only enabled when the drawer is open in any mode other than side.
            this._focusTrap.enabled = this.opened && this.mode !== 'side';
        }
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    _animationStartListener(event) {
        this._animationStarted.next(event);
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    _animationDoneListener(event) {
        this._animationEnd.next(event);
    }
}
NovoSidenavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSidenavComponent, deps: [{ token: i0.ElementRef }, { token: i1.FocusTrapFactory }, { token: i1.FocusMonitor }, { token: i2.Platform }, { token: i0.NgZone }, { token: DOCUMENT, optional: true }, { token: NOVO_LAYOUT_CONTAINER, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoSidenavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSidenavComponent, selector: "novo-sidenav", inputs: { fixedInViewport: "fixedInViewport", fixedTopGap: "fixedTopGap", fixedBottomGap: "fixedBottomGap", position: "position", mode: "mode", disableClose: "disableClose", autoFocus: "autoFocus", opened: "opened" }, outputs: { openedChange: "openedChange", _openedStream: "opened", openedStart: "openedStart", _closedStream: "closed", closedStart: "closedStart", onPositionChanged: "positionChanged" }, host: { attributes: { "tabIndex": "-1" }, listeners: { "@transform.start": "_animationStartListener($event)", "@transform.done": "_animationDoneListener($event)" }, properties: { "attr.align": "null", "class.novo-sidenav-end": "position === \"end\"", "class.novo-sidenav-over": "mode === \"over\"", "class.novo-sidenav-push": "mode === \"push\"", "class.novo-sidenav-side": "mode === \"side\"", "class.novo-sidenav-opened": "opened", "class.novo-sidenav-fixed": "fixedInViewport", "style.top.px": "fixedInViewport ? fixedTopGap : null", "style.bottom.px": "fixedInViewport ? fixedBottomGap : null", "@transform": "this._animationState" }, classAttribute: "novo-sidenav" }, exportAs: ["novoSidenav"], ngImport: i0, template: "<div class=\"novo-sidenav-inner-container\">\n  <ng-content></ng-content>\n</div>", styles: [".novo-sidenav-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.novo-sidenav-fixed{position:fixed}.novo-sidenav{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}.novo-sidenav[theme=person]{color:var(--color-person-contrast);background:var(--color-person)}.novo-sidenav[theme=company]{color:var(--color-company-contrast);background:var(--color-company)}.novo-sidenav[theme=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}.novo-sidenav[theme=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}.novo-sidenav[theme=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}.novo-sidenav[theme=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}.novo-sidenav[theme=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}.novo-sidenav[theme=job]{color:var(--color-job-contrast);background:var(--color-job)}.novo-sidenav[theme=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}.novo-sidenav[theme=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}.novo-sidenav[theme=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}.novo-sidenav[theme=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}.novo-sidenav[theme=note]{color:var(--color-note-contrast);background:var(--color-note)}.novo-sidenav[theme=task]{color:var(--color-task-contrast);background:var(--color-task)}.novo-sidenav[theme=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}.novo-sidenav[theme=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}.novo-sidenav[theme=user]{color:var(--color-user-contrast);background:var(--color-user)}.novo-sidenav[theme=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}.novo-sidenav[theme=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}.novo-sidenav[theme=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}.novo-sidenav[theme=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}.novo-sidenav[theme=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}.novo-sidenav[theme=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}.novo-sidenav[theme=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}.novo-sidenav[theme=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}.novo-sidenav[theme=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}.novo-sidenav[theme=success]{color:var(--color-success-contrast);background:var(--color-success)}.novo-sidenav[theme=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}.novo-sidenav[theme=error]{color:var(--color-error-contrast);background:var(--color-error)}.novo-sidenav[theme=info]{color:var(--color-info-contrast);background:var(--color-info)}.novo-sidenav[theme=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}.novo-sidenav[theme=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}.novo-sidenav[theme=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}.novo-sidenav[theme=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}.novo-sidenav[theme=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}.novo-sidenav[theme=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}.novo-sidenav[theme=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}.novo-sidenav[theme=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}.novo-sidenav[theme=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}.novo-sidenav[theme=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}.novo-sidenav[theme=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}.novo-sidenav[theme=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}.novo-sidenav,[dir=rtl] .novo-sidenav.novo-sidenav-end{border-right:solid 1px var(--color-border)}[dir=rtl] .novo-sidenav,.novo-sidenav.novo-sidenav-end{border-left:solid 1px var(--color-border);border-right:none}.novo-sidenav.novo-sidenav-side{z-index:2}.novo-sidenav.novo-sidenav-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav{transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav.novo-sidenav-end{left:0;right:auto;transform:translate3d(-100%,0,0)}\n"], animations: [novoSidenavAnimations.transformDrawer], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSidenavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-sidenav', exportAs: 'novoSidenav', animations: [novoSidenavAnimations.transformDrawer], host: {
                        class: 'novo-sidenav',
                        tabIndex: '-1',
                        // must prevent the browser from aligning text based on value
                        '[attr.align]': 'null',
                        '[class.novo-sidenav-end]': 'position === "end"',
                        '[class.novo-sidenav-over]': 'mode === "over"',
                        '[class.novo-sidenav-push]': 'mode === "push"',
                        '[class.novo-sidenav-side]': 'mode === "side"',
                        '[class.novo-sidenav-opened]': 'opened',
                        '[class.novo-sidenav-fixed]': 'fixedInViewport',
                        '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
                        '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"novo-sidenav-inner-container\">\n  <ng-content></ng-content>\n</div>", styles: [".novo-sidenav-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.novo-sidenav-fixed{position:fixed}.novo-sidenav{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}.novo-sidenav[theme=person]{color:var(--color-person-contrast);background:var(--color-person)}.novo-sidenav[theme=company]{color:var(--color-company-contrast);background:var(--color-company)}.novo-sidenav[theme=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}.novo-sidenav[theme=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}.novo-sidenav[theme=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}.novo-sidenav[theme=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}.novo-sidenav[theme=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}.novo-sidenav[theme=job]{color:var(--color-job-contrast);background:var(--color-job)}.novo-sidenav[theme=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}.novo-sidenav[theme=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}.novo-sidenav[theme=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}.novo-sidenav[theme=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}.novo-sidenav[theme=note]{color:var(--color-note-contrast);background:var(--color-note)}.novo-sidenav[theme=task]{color:var(--color-task-contrast);background:var(--color-task)}.novo-sidenav[theme=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}.novo-sidenav[theme=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}.novo-sidenav[theme=user]{color:var(--color-user-contrast);background:var(--color-user)}.novo-sidenav[theme=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}.novo-sidenav[theme=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}.novo-sidenav[theme=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}.novo-sidenav[theme=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}.novo-sidenav[theme=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}.novo-sidenav[theme=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}.novo-sidenav[theme=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}.novo-sidenav[theme=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}.novo-sidenav[theme=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}.novo-sidenav[theme=success]{color:var(--color-success-contrast);background:var(--color-success)}.novo-sidenav[theme=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}.novo-sidenav[theme=error]{color:var(--color-error-contrast);background:var(--color-error)}.novo-sidenav[theme=info]{color:var(--color-info-contrast);background:var(--color-info)}.novo-sidenav[theme=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}.novo-sidenav[theme=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}.novo-sidenav[theme=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}.novo-sidenav[theme=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}.novo-sidenav[theme=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}.novo-sidenav[theme=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}.novo-sidenav[theme=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}.novo-sidenav[theme=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}.novo-sidenav[theme=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}.novo-sidenav[theme=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}.novo-sidenav[theme=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}.novo-sidenav[theme=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}.novo-sidenav,[dir=rtl] .novo-sidenav.novo-sidenav-end{border-right:solid 1px var(--color-border)}[dir=rtl] .novo-sidenav,.novo-sidenav.novo-sidenav-end{border-left:solid 1px var(--color-border);border-right:none}.novo-sidenav.novo-sidenav-side{z-index:2}.novo-sidenav.novo-sidenav-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav{transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav.novo-sidenav-end{left:0;right:auto;transform:translate3d(-100%,0,0)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusTrapFactory }, { type: i1.FocusMonitor }, { type: i2.Platform }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_LAYOUT_CONTAINER]
                }] }]; }, propDecorators: { fixedInViewport: [{
                type: Input
            }], fixedTopGap: [{
                type: Input
            }], fixedBottomGap: [{
                type: Input
            }], position: [{
                type: Input
            }], mode: [{
                type: Input
            }], disableClose: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], opened: [{
                type: Input
            }], _animationState: [{
                type: HostBinding,
                args: ['@transform']
            }], openedChange: [{
                type: Output
            }], _openedStream: [{
                type: Output,
                args: ['opened']
            }], openedStart: [{
                type: Output
            }], _closedStream: [{
                type: Output,
                args: ['closed']
            }], closedStart: [{
                type: Output
            }], onPositionChanged: [{
                type: Output,
                args: ['positionChanged']
            }], _animationStartListener: [{
                type: HostListener,
                args: ['@transform.start', ['$event']]
            }], _animationDoneListener: [{
                type: HostListener,
                args: ['@transform.done', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2xheW91dC9zaWRlbmF2L3NpZGVuYXYuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9sYXlvdXQvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQTBCLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0YsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxvQkFBb0IsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQy9HLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RCxPQUFPLEVBQTRDLHFCQUFxQixFQUFFLE1BQU0s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RG5CLE1BQU07Z0JBV29CLGlCQUFpQjtzQkFBM0MsTUFBTTt1QkFBQyxpQkFBaUI7Z0JBd056Qix1QkFBdUI7c0JBRHRCLFlBQVk7dUJBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUzVDLHNCQUFzQjtzQkFEckIsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzT3JpZ2luLCBGb2N1c1RyYXAsIEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHksIE51bWJlcklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBtYXBUbywgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgbm92b1NpZGVuYXZBbmltYXRpb25zIH0gZnJvbSAnLi9zaWRlbmF2LmFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTm92b1NpZGVuYXZNb2RlLCBOb3ZvU2lkZW5hdlRvZ2dsZVJlc3VsdCwgTk9WT19MQVlPVVRfQ09OVEFJTkVSIH0gZnJvbSAnLi4vbGF5b3V0LmNvbnN0YW50cyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zaWRlbmF2JyxcbiAgZXhwb3J0QXM6ICdub3ZvU2lkZW5hdicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlbmF2LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZW5hdi5jb21wb25lbnQuc2NzcyddLFxuICBhbmltYXRpb25zOiBbbm92b1NpZGVuYXZBbmltYXRpb25zLnRyYW5zZm9ybURyYXdlcl0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tc2lkZW5hdicsXG4gICAgdGFiSW5kZXg6ICctMScsXG4gICAgLy8gbXVzdCBwcmV2ZW50IHRoZSBicm93c2VyIGZyb20gYWxpZ25pbmcgdGV4dCBiYXNlZCBvbiB2YWx1ZVxuICAgICdbYXR0ci5hbGlnbl0nOiAnbnVsbCcsXG4gICAgJ1tjbGFzcy5ub3ZvLXNpZGVuYXYtZW5kXSc6ICdwb3NpdGlvbiA9PT0gXCJlbmRcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLXNpZGVuYXYtb3Zlcl0nOiAnbW9kZSA9PT0gXCJvdmVyXCInLFxuICAgICdbY2xhc3Mubm92by1zaWRlbmF2LXB1c2hdJzogJ21vZGUgPT09IFwicHVzaFwiJyxcbiAgICAnW2NsYXNzLm5vdm8tc2lkZW5hdi1zaWRlXSc6ICdtb2RlID09PSBcInNpZGVcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLXNpZGVuYXYtb3BlbmVkXSc6ICdvcGVuZWQnLFxuICAgICdbY2xhc3Mubm92by1zaWRlbmF2LWZpeGVkXSc6ICdmaXhlZEluVmlld3BvcnQnLFxuICAgICdbc3R5bGUudG9wLnB4XSc6ICdmaXhlZEluVmlld3BvcnQgPyBmaXhlZFRvcEdhcCA6IG51bGwnLFxuICAgICdbc3R5bGUuYm90dG9tLnB4XSc6ICdmaXhlZEluVmlld3BvcnQgPyBmaXhlZEJvdHRvbUdhcCA6IG51bGwnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpZGVuYXZDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3kge1xuICAvKiogV2hldGhlciB0aGUgc2lkZW5hdiBpcyBmaXhlZCBpbiB0aGUgdmlld3BvcnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBmaXhlZEluVmlld3BvcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkSW5WaWV3cG9ydDtcbiAgfVxuICBzZXQgZml4ZWRJblZpZXdwb3J0KHZhbHVlKSB7XG4gICAgdGhpcy5fZml4ZWRJblZpZXdwb3J0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9maXhlZEluVmlld3BvcnQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIGdhcCBiZXR3ZWVuIHRoZSB0b3Agb2YgdGhlIHNpZGVuYXYgYW5kIHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0IHdoZW4gdGhlIHNpZGVuYXYgaXMgaW4gZml4ZWRcbiAgICogbW9kZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBmaXhlZFRvcEdhcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXhlZFRvcEdhcDtcbiAgfVxuICBzZXQgZml4ZWRUb3BHYXAodmFsdWUpIHtcbiAgICB0aGlzLl9maXhlZFRvcEdhcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9maXhlZFRvcEdhcCA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBnYXAgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSBzaWRlbmF2IGFuZCB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCB3aGVuIHRoZSBzaWRlbmF2IGlzIGluXG4gICAqIGZpeGVkIG1vZGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgZml4ZWRCb3R0b21HYXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWRCb3R0b21HYXA7XG4gIH1cbiAgc2V0IGZpeGVkQm90dG9tR2FwKHZhbHVlKSB7XG4gICAgdGhpcy5fZml4ZWRCb3R0b21HYXAgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZml4ZWRCb3R0b21HYXAgPSAwO1xuXG4gIHByaXZhdGUgX2ZvY3VzVHJhcDogRm9jdXNUcmFwO1xuICBwcml2YXRlIF9lbGVtZW50Rm9jdXNlZEJlZm9yZURyYXdlcldhc09wZW5lZDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgZHJhd2VyIGlzIGluaXRpYWxpemVkLiBVc2VkIGZvciBkaXNhYmxpbmcgdGhlIGluaXRpYWwgYW5pbWF0aW9uLiAqL1xuICBwcml2YXRlIF9lbmFibGVBbmltYXRpb25zID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBzaWRlIHRoYXQgdGhlIGRyYXdlciBpcyBhdHRhY2hlZCB0by4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHBvc2l0aW9uKCk6ICdzdGFydCcgfCAnZW5kJyB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG4gIHNldCBwb3NpdGlvbih2YWx1ZTogJ3N0YXJ0JyB8ICdlbmQnKSB7XG4gICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYSB2YWxpZCB2YWx1ZS5cbiAgICB2YWx1ZSA9IHZhbHVlID09PSAnZW5kJyA/ICdlbmQnIDogJ3N0YXJ0JztcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Bvc2l0aW9uKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgdGhpcy5vblBvc2l0aW9uQ2hhbmdlZC5lbWl0KCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiAnc3RhcnQnIHwgJ2VuZCcgPSAnc3RhcnQnO1xuXG4gIC8qKiBNb2RlIG9mIHRoZSBkcmF3ZXI7IG9uZSBvZiAnb3ZlcicsICdwdXNoJyBvciAnc2lkZScuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtb2RlKCk6IE5vdm9TaWRlbmF2TW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XG4gIH1cbiAgc2V0IG1vZGUodmFsdWU6IE5vdm9TaWRlbmF2TW9kZSkge1xuICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVGb2N1c1RyYXBTdGF0ZSgpO1xuICAgIHRoaXMuX21vZGVDaGFuZ2VkLm5leHQoKTtcbiAgfVxuICBwcml2YXRlIF9tb2RlOiBOb3ZvU2lkZW5hdk1vZGUgPSAnb3Zlcic7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGRyYXdlciBjYW4gYmUgY2xvc2VkIHdpdGggdGhlIGVzY2FwZSBrZXkgb3IgYnkgY2xpY2tpbmcgb24gdGhlIGJhY2tkcm9wLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZUNsb3NlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlQ2xvc2U7XG4gIH1cbiAgc2V0IGRpc2FibGVDbG9zZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVDbG9zZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZUNsb3NlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRyYXdlciBzaG91bGQgZm9jdXMgdGhlIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50IGF1dG9tYXRpY2FsbHkgd2hlbiBvcGVuZWQuXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlIGluIHdoZW4gYG1vZGVgIGlzIHNldCB0byBgc2lkZWAsIG90aGVyd2lzZSBkZWZhdWx0cyB0byBgdHJ1ZWAuIElmIGV4cGxpY2l0bHlcbiAgICogZW5hYmxlZCwgZm9jdXMgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBzaWRlbmF2IGluIGBzaWRlYCBtb2RlIGFzIHdlbGwuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgYXV0b0ZvY3VzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fYXV0b0ZvY3VzO1xuXG4gICAgLy8gTm90ZSB0aGF0IHVzdWFsbHkgd2UgZGlzYWJsZSBhdXRvIGZvY3VzaW5nIGluIGBzaWRlYCBtb2RlLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgaG93IHRoZVxuICAgIC8vIHNpZGVuYXYgaXMgYmVpbmcgdXNlZCwgYnV0IGluIHNvbWUgY2FzZXMgaXQgc3RpbGwgbWFrZXMgc2Vuc2UgdG8gZG8gaXQuIElmIHRoZSBjb25zdW1lclxuICAgIC8vIGV4cGxpY2l0bHkgZW5hYmxlZCBgYXV0b0ZvY3VzYCwgd2UgdGFrZSBpdCBhcyB0aGVtIGFsd2F5cyB3YW50aW5nIHRvIGVuYWJsZSBpdC5cbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IHRoaXMubW9kZSAhPT0gJ3NpZGUnIDogdmFsdWU7XG4gIH1cbiAgc2V0IGF1dG9Gb2N1cyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2F1dG9Gb2N1cyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYXV0b0ZvY3VzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkcmF3ZXIgaXMgb3BlbmVkLiBXZSBvdmVybG9hZCB0aGlzIGJlY2F1c2Ugd2UgdHJpZ2dlciBhbiBldmVudCB3aGVuIGl0XG4gICAqIHN0YXJ0cyBvciBlbmQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgb3BlbmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9vcGVuZWQ7XG4gIH1cbiAgc2V0IG9wZW5lZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMudG9nZ2xlKGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSkpO1xuICB9XG4gIHByaXZhdGUgX29wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBIb3cgdGhlIHNpZGVuYXYgd2FzIG9wZW5lZCAoa2V5cHJlc3MsIG1vdXNlIGNsaWNrIGV0Yy4pICovXG4gIHByaXZhdGUgX29wZW5lZFZpYTogRm9jdXNPcmlnaW4gfCBudWxsO1xuXG4gIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgZHJhd2VyIGhhcyBzdGFydGVkIGFuaW1hdGluZy4gKi9cbiAgX2FuaW1hdGlvblN0YXJ0ZWQgPSBuZXcgU3ViamVjdDxBbmltYXRpb25FdmVudD4oKTtcblxuICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGRyYXdlciBpcyBkb25lIGFuaW1hdGluZy4gKi9cbiAgX2FuaW1hdGlvbkVuZCA9IG5ldyBTdWJqZWN0PEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gIC8qKiBDdXJyZW50IHN0YXRlIG9mIHRoZSBzaWRlbmF2IGFuaW1hdGlvbi4gKi9cbiAgLy8gQEhvc3RCaW5kaW5nIGlzIHVzZWQgaW4gdGhlIGNsYXNzIGFzIGl0IGlzIGV4cGVjdGVkIHRvIGJlIGV4dGVuZGVkLiAgU2luY2UgQENvbXBvbmVudCBkZWNvcmF0b3JcbiAgLy8gbWV0YWRhdGEgaXMgbm90IGluaGVyaXRlZCBieSBjaGlsZCBjbGFzc2VzLCBpbnN0ZWFkIHRoZSBob3N0IGJpbmRpbmcgZGF0YSBpcyBkZWZpbmVkIGluIGEgd2F5XG4gIC8vIHRoYXQgY2FuIGJlIGluaGVyaXRlZC5cbiAgLy8gdHNsaW50OmRpc2FibGU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgQEhvc3RCaW5kaW5nKCdAdHJhbnNmb3JtJylcbiAgX2FuaW1hdGlvblN0YXRlOiAnb3Blbi1pbnN0YW50JyB8ICdvcGVuJyB8ICd2b2lkJyA9ICd2b2lkJztcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmF3ZXIgb3BlbiBzdGF0ZSBpcyBjaGFuZ2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPVxuICAgIC8vIE5vdGUgdGhpcyBoYXMgdG8gYmUgYXN5bmMgaW4gb3JkZXIgdG8gYXZvaWQgc29tZSBpc3N1ZXMgd2l0aCB0d28tYmluZGluZ3MgKHNlZSAjODg3MikuXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigvKiBpc0FzeW5jICovIHRydWUpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYXdlciBoYXMgYmVlbiBvcGVuZWQuICovXG4gIEBPdXRwdXQoJ29wZW5lZCcpXG4gIF9vcGVuZWRTdHJlYW0gPSB0aGlzLm9wZW5lZENoYW5nZS5waXBlKFxuICAgIGZpbHRlcigobykgPT4gbyksXG4gICAgbWFwKCgpID0+IHt9KSxcbiAgKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmF3ZXIgaGFzIHN0YXJ0ZWQgb3BlbmluZy4gKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IG9wZW5lZFN0YXJ0OiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fYW5pbWF0aW9uU3RhcnRlZC5waXBlKFxuICAgIGZpbHRlcigoZSkgPT4gZS5mcm9tU3RhdGUgIT09IGUudG9TdGF0ZSAmJiBlLnRvU3RhdGUuaW5kZXhPZignb3BlbicpID09PSAwKSxcbiAgICBtYXBUbyh1bmRlZmluZWQpLFxuICApO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYXdlciBoYXMgYmVlbiBjbG9zZWQuICovXG4gIEBPdXRwdXQoJ2Nsb3NlZCcpXG4gIF9jbG9zZWRTdHJlYW0gPSB0aGlzLm9wZW5lZENoYW5nZS5waXBlKFxuICAgIGZpbHRlcigobykgPT4gIW8pLFxuICAgIG1hcCgoKSA9PiB7fSksXG4gICk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJhd2VyIGhhcyBzdGFydGVkIGNsb3NpbmcuICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBjbG9zZWRTdGFydDogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2FuaW1hdGlvblN0YXJ0ZWQucGlwZShcbiAgICBmaWx0ZXIoKGUpID0+IGUuZnJvbVN0YXRlICE9PSBlLnRvU3RhdGUgJiYgZS50b1N0YXRlID09PSAndm9pZCcpLFxuICAgIG1hcFRvKHVuZGVmaW5lZCksXG4gICk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJhd2VyJ3MgcG9zaXRpb24gY2hhbmdlcy4gKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgncG9zaXRpb25DaGFuZ2VkJykgb25Qb3NpdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIGRyYXdlciBtb2RlIGNoYW5nZXMuIFRoaXMgaXMgdXNlZCBieSB0aGUgZHJhd2VyIGNvbnRhaW5lciB0b1xuICAgKiB0byBrbm93IHdoZW4gdG8gd2hlbiB0aGUgbW9kZSBjaGFuZ2VzIHNvIGl0IGNhbiBhZGFwdCB0aGUgbWFyZ2lucyBvbiB0aGUgY29udGVudC5cbiAgICovXG4gIHJlYWRvbmx5IF9tb2RlQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfZm9jdXNUcmFwRmFjdG9yeTogRm9jdXNUcmFwRmFjdG9yeSxcbiAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOT1ZPX0xBWU9VVF9DT05UQUlORVIpIHB1YmxpYyBfY29udGFpbmVyPzogYW55LCAvLyBOb3ZvTGF5b3V0Q29udGFpbmVyXG4gICkge1xuICAgIHRoaXMub3BlbmVkQ2hhbmdlLnN1YnNjcmliZSgob3BlbmVkOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAob3BlbmVkKSB7XG4gICAgICAgIGlmICh0aGlzLl9kb2MpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50Rm9jdXNlZEJlZm9yZURyYXdlcldhc09wZW5lZCA9IHRoaXMuX2RvYy5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGFrZUZvY3VzKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2lzRm9jdXNXaXRoaW5EcmF3ZXIoKSkge1xuICAgICAgICB0aGlzLl9yZXN0b3JlRm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBga2V5ZG93bmAgZXZlbnRzIG91dHNpZGUgdGhlIHpvbmUgc28gdGhhdCBjaGFuZ2UgZGV0ZWN0aW9uIGlzIG5vdCBydW4gZXZlcnlcbiAgICAgKiB0aW1lIGEga2V5IGlzIHByZXNzZWQuIEluc3RlYWQgd2UgcmUtZW50ZXIgdGhlIHpvbmUgb25seSBpZiB0aGUgYEVTQ2Aga2V5IGlzIHByZXNzZWRcbiAgICAgKiBhbmQgd2UgZG9uJ3QgaGF2ZSBjbG9zZSBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgKGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJykgYXMgT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PilcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChldmVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSAmJiAhdGhpcy5kaXNhYmxlQ2xvc2UgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50KTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT5cbiAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIFdlIG5lZWQgYSBTdWJqZWN0IHdpdGggZGlzdGluY3RVbnRpbENoYW5nZWQsIGJlY2F1c2UgdGhlIGBkb25lYCBldmVudFxuICAgIC8vIGZpcmVzIHR3aWNlIG9uIHNvbWUgYnJvd3NlcnMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yNDA4NFxuICAgIHRoaXMuX2FuaW1hdGlvbkVuZFxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHguZnJvbVN0YXRlID09PSB5LmZyb21TdGF0ZSAmJiB4LnRvU3RhdGUgPT09IHkudG9TdGF0ZTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgeyBmcm9tU3RhdGUsIHRvU3RhdGUgfSA9IGV2ZW50O1xuXG4gICAgICAgIGlmICgodG9TdGF0ZS5pbmRleE9mKCdvcGVuJykgPT09IDAgJiYgZnJvbVN0YXRlID09PSAndm9pZCcpIHx8ICh0b1N0YXRlID09PSAndm9pZCcgJiYgZnJvbVN0YXRlLmluZGV4T2YoJ29wZW4nKSA9PT0gMCkpIHtcbiAgICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHRoaXMuX29wZW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIGZvY3VzIGludG8gdGhlIGRyYXdlci4gTm90ZSB0aGF0IHRoaXMgd29ya3MgZXZlbiBpZlxuICAgKiB0aGUgZm9jdXMgdHJhcCBpcyBkaXNhYmxlZCBpbiBgc2lkZWAgbW9kZS5cbiAgICovXG4gIHByaXZhdGUgX3Rha2VGb2N1cygpIHtcbiAgICBpZiAoIXRoaXMuYXV0b0ZvY3VzIHx8ICF0aGlzLl9mb2N1c1RyYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9mb2N1c1RyYXAuZm9jdXNJbml0aWFsRWxlbWVudFdoZW5SZWFkeSgpLnRoZW4oKGhhc01vdmVkRm9jdXMpID0+IHtcbiAgICAgIC8vIElmIHRoZXJlIHdlcmUgbm8gZm9jdXNhYmxlIGVsZW1lbnRzLCBmb2N1cyB0aGUgc2lkZW5hdiBpdHNlbGYgc28gdGhlIGtleWJvYXJkIG5hdmlnYXRpb25cbiAgICAgIC8vIHN0aWxsIHdvcmtzLiBXZSBuZWVkIHRvIGNoZWNrIHRoYXQgYGZvY3VzYCBpcyBhIGZ1bmN0aW9uIGR1ZSB0byBVbml2ZXJzYWwuXG4gICAgICBpZiAoIWhhc01vdmVkRm9jdXMgJiYgdHlwZW9mIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlcyBmb2N1cyB0byB0aGUgZWxlbWVudCB0aGF0IHdhcyBvcmlnaW5hbGx5IGZvY3VzZWQgd2hlbiB0aGUgZHJhd2VyIG9wZW5lZC5cbiAgICogSWYgbm8gZWxlbWVudCB3YXMgZm9jdXNlZCBhdCB0aGF0IHRpbWUsIHRoZSBmb2N1cyB3aWxsIGJlIHJlc3RvcmVkIHRvIHRoZSBkcmF3ZXIuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0b3JlRm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLmF1dG9Gb2N1cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBjaGVjayB2aWEgYGluc3RhbmNlb2YgSFRNTEVsZW1lbnRgIHNvIHRoYXQgd2UgY2FuIGNvdmVyIFNWR3MgYXMgd2VsbC5cbiAgICBpZiAodGhpcy5fZWxlbWVudEZvY3VzZWRCZWZvcmVEcmF3ZXJXYXNPcGVuZWQpIHtcbiAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLl9lbGVtZW50Rm9jdXNlZEJlZm9yZURyYXdlcldhc09wZW5lZCwgdGhpcy5fb3BlbmVkVmlhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50Rm9jdXNlZEJlZm9yZURyYXdlcldhc09wZW5lZCA9IG51bGw7XG4gICAgdGhpcy5fb3BlbmVkVmlhID0gbnVsbDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIGZvY3VzIGlzIGN1cnJlbnRseSB3aXRoaW4gdGhlIGRyYXdlci4gKi9cbiAgcHJpdmF0ZSBfaXNGb2N1c1dpdGhpbkRyYXdlcigpOiBib29sZWFuIHtcbiAgICBjb25zdCBhY3RpdmVFbCA9IHRoaXMuX2RvYz8uYWN0aXZlRWxlbWVudDtcbiAgICByZXR1cm4gISFhY3RpdmVFbCAmJiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoYWN0aXZlRWwpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2ZvY3VzVHJhcCA9IHRoaXMuX2ZvY3VzVHJhcEZhY3RvcnkuY3JlYXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5fdXBkYXRlRm9jdXNUcmFwU3RhdGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBFbmFibGUgdGhlIGFuaW1hdGlvbnMgYWZ0ZXIgdGhlIGxpZmVjeWNsZSBob29rcyBoYXZlIHJ1biwgaW4gb3JkZXIgdG8gYXZvaWQgYW5pbWF0aW5nXG4gICAgLy8gZHJhd2VycyB0aGF0IGFyZSBvcGVuIGJ5IGRlZmF1bHQuIFdoZW4gd2UncmUgb24gdGhlIHNlcnZlciwgd2Ugc2hvdWxkbid0IGVuYWJsZSB0aGVcbiAgICAvLyBhbmltYXRpb25zLCBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdGhlIGRyYXdlciB0byBhbmltYXRlIHRoZSBmaXJzdCB0aW1lIHRoZSB1c2VyIHNlZXNcbiAgICAvLyB0aGUgcGFnZS5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLl9lbmFibGVBbmltYXRpb25zID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fZm9jdXNUcmFwKSB7XG4gICAgICB0aGlzLl9mb2N1c1RyYXAuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2FuaW1hdGlvblN0YXJ0ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9hbmltYXRpb25FbmQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9tb2RlQ2hhbmdlZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbiB0aGUgZHJhd2VyLlxuICAgKiBAcGFyYW0gb3BlbmVkVmlhIFdoZXRoZXIgdGhlIGRyYXdlciB3YXMgb3BlbmVkIGJ5IGEga2V5IHByZXNzLCBtb3VzZSBjbGljayBvciBwcm9ncmFtbWF0aWNhbGx5LlxuICAgKiBVc2VkIGZvciBmb2N1cyBtYW5hZ2VtZW50IGFmdGVyIHRoZSBzaWRlbmF2IGlzIGNsb3NlZC5cbiAgICovXG4gIG9wZW4ob3BlbmVkVmlhPzogRm9jdXNPcmlnaW4pOiBQcm9taXNlPE5vdm9TaWRlbmF2VG9nZ2xlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlKHRydWUsIG9wZW5lZFZpYSk7XG4gIH1cblxuICAvKiogQ2xvc2UgdGhlIGRyYXdlci4gKi9cbiAgY2xvc2UoKTogUHJvbWlzZTxOb3ZvU2lkZW5hdlRvZ2dsZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gIH1cblxuICAvKiogQ2xvc2VzIHRoZSBkcmF3ZXIgd2l0aCBjb250ZXh0IHRoYXQgdGhlIGJhY2tkcm9wIHdhcyBjbGlja2VkLiAqL1xuICBfY2xvc2VWaWFCYWNrZHJvcENsaWNrKCk6IFByb21pc2U8Tm92b1NpZGVuYXZUb2dnbGVSZXN1bHQ+IHtcbiAgICAvLyBJZiB0aGUgZHJhd2VyIGlzIGNsb3NlZCB1cG9uIGEgYmFja2Ryb3AgY2xpY2ssIHdlIGFsd2F5cyB3YW50IHRvIHJlc3RvcmUgZm9jdXMuIFdlXG4gICAgLy8gZG9uJ3QgbmVlZCB0byBjaGVjayB3aGV0aGVyIGZvY3VzIGlzIGN1cnJlbnRseSBpbiB0aGUgZHJhd2VyLCBhcyBjbGlja2luZyBvbiB0aGVcbiAgICAvLyBiYWNrZHJvcCBjYXVzZXMgYmx1cnJpbmcgb2YgdGhlIGFjdGl2ZSBlbGVtZW50LlxuICAgIHJldHVybiB0aGlzLl9zZXRPcGVuKC8qIGlzT3BlbiAqLyBmYWxzZSwgLyogcmVzdG9yZUZvY3VzICovIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGlzIGRyYXdlci5cbiAgICogQHBhcmFtIGlzT3BlbiBXaGV0aGVyIHRoZSBkcmF3ZXIgc2hvdWxkIGJlIG9wZW4uXG4gICAqIEBwYXJhbSBvcGVuZWRWaWEgV2hldGhlciB0aGUgZHJhd2VyIHdhcyBvcGVuZWQgYnkgYSBrZXkgcHJlc3MsIG1vdXNlIGNsaWNrIG9yIHByb2dyYW1tYXRpY2FsbHkuXG4gICAqIFVzZWQgZm9yIGZvY3VzIG1hbmFnZW1lbnQgYWZ0ZXIgdGhlIHNpZGVuYXYgaXMgY2xvc2VkLlxuICAgKi9cbiAgdG9nZ2xlKGlzT3BlbjogYm9vbGVhbiA9ICF0aGlzLm9wZW5lZCwgb3BlbmVkVmlhPzogRm9jdXNPcmlnaW4pOiBQcm9taXNlPE5vdm9TaWRlbmF2VG9nZ2xlUmVzdWx0PiB7XG4gICAgLy8gSWYgdGhlIGZvY3VzIGlzIGN1cnJlbnRseSBpbnNpZGUgdGhlIGRyYXdlciBjb250ZW50IGFuZCB3ZSBhcmUgY2xvc2luZyB0aGUgZHJhd2VyLFxuICAgIC8vIHJlc3RvcmUgdGhlIGZvY3VzIHRvIHRoZSBpbml0aWFsbHkgZm9jdXNlZCBlbGVtZW50ICh3aGVuIHRoZSBkcmF3ZXIgb3BlbmVkKS5cbiAgICByZXR1cm4gdGhpcy5fc2V0T3Blbihpc09wZW4sIC8qIHJlc3RvcmVGb2N1cyAqLyAhaXNPcGVuICYmIHRoaXMuX2lzRm9jdXNXaXRoaW5EcmF3ZXIoKSwgb3BlbmVkVmlhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBvcGVuZWQgc3RhdGUgb2YgdGhlIGRyYXdlci5cbiAgICogQHBhcmFtIGlzT3BlbiBXaGV0aGVyIHRoZSBkcmF3ZXIgc2hvdWxkIG9wZW4gb3IgY2xvc2UuXG4gICAqIEBwYXJhbSByZXN0b3JlRm9jdXMgV2hldGhlciBmb2N1cyBzaG91bGQgYmUgcmVzdG9yZWQgb24gY2xvc2UuXG4gICAqIEBwYXJhbSBvcGVuZWRWaWEgRm9jdXMgb3JpZ2luIHRoYXQgY2FuIGJlIG9wdGlvbmFsbHkgc2V0IHdoZW4gb3BlbmluZyBhIGRyYXdlci4gVGhlXG4gICAqICAgb3JpZ2luIHdpbGwgYmUgdXNlZCBsYXRlciB3aGVuIGZvY3VzIGlzIHJlc3RvcmVkIG9uIGRyYXdlciBjbG9zZS5cbiAgICovXG4gIHByaXZhdGUgX3NldE9wZW4oaXNPcGVuOiBib29sZWFuLCByZXN0b3JlRm9jdXM6IGJvb2xlYW4sIG9wZW5lZFZpYTogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbScpOiBQcm9taXNlPE5vdm9TaWRlbmF2VG9nZ2xlUmVzdWx0PiB7XG4gICAgdGhpcy5fb3BlbmVkID0gaXNPcGVuO1xuXG4gICAgaWYgKGlzT3Blbikge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uU3RhdGUgPSB0aGlzLl9lbmFibGVBbmltYXRpb25zID8gJ29wZW4nIDogJ29wZW4taW5zdGFudCc7XG4gICAgICB0aGlzLl9vcGVuZWRWaWEgPSBvcGVuZWRWaWE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlID0gJ3ZvaWQnO1xuICAgICAgaWYgKHJlc3RvcmVGb2N1cykge1xuICAgICAgICB0aGlzLl9yZXN0b3JlRm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVGb2N1c1RyYXBTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPE5vdm9TaWRlbmF2VG9nZ2xlUmVzdWx0PigocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKG9wZW4pID0+IHJlc29sdmUob3BlbiA/ICdvcGVuJyA6ICdjbG9zZScpKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9nZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgPyB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMCA6IDA7XG4gIH1cblxuICAvKiogVXBkYXRlcyB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgZm9jdXMgdHJhcC4gKi9cbiAgcHJpdmF0ZSBfdXBkYXRlRm9jdXNUcmFwU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2ZvY3VzVHJhcCkge1xuICAgICAgLy8gVGhlIGZvY3VzIHRyYXAgaXMgb25seSBlbmFibGVkIHdoZW4gdGhlIGRyYXdlciBpcyBvcGVuIGluIGFueSBtb2RlIG90aGVyIHRoYW4gc2lkZS5cbiAgICAgIHRoaXMuX2ZvY3VzVHJhcC5lbmFibGVkID0gdGhpcy5vcGVuZWQgJiYgdGhpcy5tb2RlICE9PSAnc2lkZSc7XG4gICAgfVxuICB9XG5cbiAgLy8gV2UgaGF2ZSB0byB1c2UgYSBgSG9zdExpc3RlbmVyYCBoZXJlIGluIG9yZGVyIHRvIHN1cHBvcnQgYm90aCBJdnkgYW5kIFZpZXdFbmdpbmUuXG4gIC8vIEluIEl2eSB0aGUgYGhvc3RgIGJpbmRpbmdzIHdpbGwgYmUgbWVyZ2VkIHdoZW4gdGhpcyBjbGFzcyBpcyBleHRlbmRlZCwgd2hlcmVhcyBpblxuICAvLyBWaWV3RW5naW5lIHRoZXkncmUgb3ZlcndyaXR0ZW4uXG4gIEBIb3N0TGlzdGVuZXIoJ0B0cmFuc2Zvcm0uc3RhcnQnLCBbJyRldmVudCddKVxuICBfYW5pbWF0aW9uU3RhcnRMaXN0ZW5lcihldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICB0aGlzLl9hbmltYXRpb25TdGFydGVkLm5leHQoZXZlbnQpO1xuICB9XG5cbiAgLy8gV2UgaGF2ZSB0byB1c2UgYSBgSG9zdExpc3RlbmVyYCBoZXJlIGluIG9yZGVyIHRvIHN1cHBvcnQgYm90aCBJdnkgYW5kIFZpZXdFbmdpbmUuXG4gIC8vIEluIEl2eSB0aGUgYGhvc3RgIGJpbmRpbmdzIHdpbGwgYmUgbWVyZ2VkIHdoZW4gdGhpcyBjbGFzcyBpcyBleHRlbmRlZCwgd2hlcmVhcyBpblxuICAvLyBWaWV3RW5naW5lIHRoZXkncmUgb3ZlcndyaXR0ZW4uXG4gIEBIb3N0TGlzdGVuZXIoJ0B0cmFuc2Zvcm0uZG9uZScsIFsnJGV2ZW50J10pXG4gIF9hbmltYXRpb25Eb25lTGlzdGVuZXIoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5fYW5pbWF0aW9uRW5kLm5leHQoZXZlbnQpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVDbG9zZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0ZvY3VzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vcGVuZWQ6IEJvb2xlYW5JbnB1dDtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZml4ZWRJblZpZXdwb3J0OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXhlZFRvcEdhcDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXhlZEJvdHRvbUdhcDogTnVtYmVySW5wdXQ7XG59XG4iLCI8ZGl2IGNsYXNzPVwibm92by1zaWRlbmF2LWlubmVyLWNvbnRhaW5lclwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj4iXX0=