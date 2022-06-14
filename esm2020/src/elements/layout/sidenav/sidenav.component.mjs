import { FocusMonitor, FocusTrapFactory } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, NgZone, Optional, Output, ViewEncapsulation, } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, take, takeUntil } from 'rxjs/operators';
// import type { NovoLayoutContainer } from '../container/layout-container.component';
import { NOVO_LAYOUT_CONTAINER } from '../layout.constants';
import { novoSidenavAnimations } from './sidenav.animations';
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
NovoSidenavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSidenavComponent, deps: [{ token: i0.ElementRef }, { token: i1.FocusTrapFactory }, { token: i1.FocusMonitor }, { token: i2.Platform }, { token: i0.NgZone }, { token: DOCUMENT, optional: true }, { token: NOVO_LAYOUT_CONTAINER, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoSidenavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoSidenavComponent, selector: "novo-sidenav", inputs: { fixedInViewport: "fixedInViewport", fixedTopGap: "fixedTopGap", fixedBottomGap: "fixedBottomGap", position: "position", mode: "mode", disableClose: "disableClose", autoFocus: "autoFocus", opened: "opened" }, outputs: { openedChange: "openedChange", _openedStream: "opened", openedStart: "openedStart", _closedStream: "closed", closedStart: "closedStart", onPositionChanged: "positionChanged" }, host: { attributes: { "tabIndex": "-1" }, listeners: { "@transform.start": "_animationStartListener($event)", "@transform.done": "_animationDoneListener($event)" }, properties: { "attr.align": "null", "class.novo-sidenav-end": "position === \"end\"", "class.novo-sidenav-over": "mode === \"over\"", "class.novo-sidenav-push": "mode === \"push\"", "class.novo-sidenav-side": "mode === \"side\"", "class.novo-sidenav-opened": "opened", "class.novo-sidenav-fixed": "fixedInViewport", "style.top.px": "fixedInViewport ? fixedTopGap : null", "style.bottom.px": "fixedInViewport ? fixedBottomGap : null", "@transform": "this._animationState" }, classAttribute: "novo-sidenav" }, exportAs: ["novoSidenav"], ngImport: i0, template: "<div class=\"novo-sidenav-inner-container\">\n  <ng-content></ng-content>\n</div>", styles: [".novo-sidenav-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.novo-sidenav-fixed{position:fixed}.novo-sidenav{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}.novo-sidenav[theme=black]{color:#fff;background:#000000}.novo-sidenav[theme=white]{color:#3d464d;background:#ffffff}.novo-sidenav[theme=gray],.novo-sidenav[theme=grey]{color:#3d464d;background:#9e9e9e}.novo-sidenav[theme=offWhite],.novo-sidenav[theme=bright]{color:#3d464d;background:#f7f7f7}.novo-sidenav[theme=light]{color:#3d464d;background:#dbdbdb}.novo-sidenav[theme=neutral]{color:#fff;background:#4f5361}.novo-sidenav[theme=dark]{color:#fff;background:#3d464d}.novo-sidenav[theme=orange]{color:#3d464d;background:#ff6900}.novo-sidenav[theme=navigation]{color:#fff;background:#202945}.novo-sidenav[theme=skyBlue]{color:#fff;background:#009bdf}.novo-sidenav[theme=steel]{color:#fff;background:#5b6770}.novo-sidenav[theme=metal]{color:#fff;background:#637893}.novo-sidenav[theme=sand]{color:#3d464d;background:#f4f4f4}.novo-sidenav[theme=silver]{color:#3d464d;background:#e2e2e2}.novo-sidenav[theme=stone]{color:#3d464d;background:#bebebe}.novo-sidenav[theme=ash]{color:#3d464d;background:#a0a0a0}.novo-sidenav[theme=slate]{color:#fff;background:#707070}.novo-sidenav[theme=onyx]{color:#fff;background:#526980}.novo-sidenav[theme=charcoal]{color:#fff;background:#282828}.novo-sidenav[theme=moonlight]{color:#fff;background:#1a242f}.novo-sidenav[theme=midnight]{color:#fff;background:#202945}.novo-sidenav[theme=darkness]{color:#fff;background:#161f27}.novo-sidenav[theme=navy]{color:#fff;background:#0d2d42}.novo-sidenav[theme=aqua]{color:#3d464d;background:#3bafda}.novo-sidenav[theme=ocean]{color:#fff;background:#4a89dc}.novo-sidenav[theme=mint]{color:#3d464d;background:#37bc9b}.novo-sidenav[theme=grass]{color:#fff;background:#8cc152}.novo-sidenav[theme=sunflower]{color:#fff;background:#f6b042}.novo-sidenav[theme=bittersweet]{color:#fff;background:#eb6845}.novo-sidenav[theme=grapefruit]{color:#fff;background:#da4453}.novo-sidenav[theme=carnation]{color:#fff;background:#d770ad}.novo-sidenav[theme=lavender]{color:#fff;background:#967adc}.novo-sidenav[theme=mountain]{color:#fff;background:#9678b6}.novo-sidenav[theme=info],.novo-sidenav[theme=positive]{color:#fff;background:#4a89dc}.novo-sidenav[theme=success]{color:#fff;background:#8cc152}.novo-sidenav[theme=negative],.novo-sidenav[theme=danger],.novo-sidenav[theme=error]{color:#fff;background:#da4453}.novo-sidenav[theme=warning]{color:#fff;background:#f6b042}.novo-sidenav[theme=empty]{color:#3d464d;background:#cccdcc}.novo-sidenav[theme=disabled]{color:#3d464d;background:#bebebe}.novo-sidenav[theme=background]{color:#3d464d;background:#f7f7f7}.novo-sidenav[theme=backgroundDark]{color:#3d464d;background:#e2e2e2}.novo-sidenav[theme=presentation]{color:#fff;background:#5b6770}.novo-sidenav[theme=bullhorn]{color:#3d464d;background:#ff6900}.novo-sidenav[theme=pulse]{color:#3d464d;background:#3bafda}.novo-sidenav[theme=company]{color:#fff;background:#3399dd}.novo-sidenav[theme=candidate]{color:#fff;background:#44bb77}.novo-sidenav[theme=lead]{color:#fff;background:#aa6699}.novo-sidenav[theme=contact],.novo-sidenav[theme=clientcontact]{color:#fff;background:#ffaa44}.novo-sidenav[theme=opportunity]{color:#fff;background:#662255}.novo-sidenav[theme=job],.novo-sidenav[theme=joborder]{color:#fff;background:#bb5566}.novo-sidenav[theme=submission]{color:#3d464d;background:#a9adbb}.novo-sidenav[theme=sendout]{color:#fff;background:#747884}.novo-sidenav[theme=placement]{color:#fff;background:#0b344f}.novo-sidenav[theme=note]{color:#fff;background:#747884}.novo-sidenav[theme=contract]{color:#fff;background:#454ea0}.novo-sidenav[theme=jobCode],.novo-sidenav[theme=earnCode],.novo-sidenav[theme=invoiceStatement],.novo-sidenav[theme=billableCharge],.novo-sidenav[theme=payableCharge],.novo-sidenav[theme=user],.novo-sidenav[theme=corporateUser],.novo-sidenav[theme=distributionList],.novo-sidenav[theme=credential],.novo-sidenav[theme=person]{color:#fff;background:#696d79}.novo-sidenav,[dir=rtl] .novo-sidenav.novo-sidenav-end{border-right:solid 1px var(--border)}[dir=rtl] .novo-sidenav,.novo-sidenav.novo-sidenav-end{border-left:solid 1px var(--border);border-right:none}.novo-sidenav.novo-sidenav-side{z-index:2}.novo-sidenav.novo-sidenav-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav{transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav.novo-sidenav-end{left:0;right:auto;transform:translate3d(-100%,0,0)}\n"], animations: [novoSidenavAnimations.transformDrawer], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSidenavComponent, decorators: [{
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
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"novo-sidenav-inner-container\">\n  <ng-content></ng-content>\n</div>", styles: [".novo-sidenav-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.novo-sidenav-fixed{position:fixed}.novo-sidenav{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}.novo-sidenav[theme=black]{color:#fff;background:#000000}.novo-sidenav[theme=white]{color:#3d464d;background:#ffffff}.novo-sidenav[theme=gray],.novo-sidenav[theme=grey]{color:#3d464d;background:#9e9e9e}.novo-sidenav[theme=offWhite],.novo-sidenav[theme=bright]{color:#3d464d;background:#f7f7f7}.novo-sidenav[theme=light]{color:#3d464d;background:#dbdbdb}.novo-sidenav[theme=neutral]{color:#fff;background:#4f5361}.novo-sidenav[theme=dark]{color:#fff;background:#3d464d}.novo-sidenav[theme=orange]{color:#3d464d;background:#ff6900}.novo-sidenav[theme=navigation]{color:#fff;background:#202945}.novo-sidenav[theme=skyBlue]{color:#fff;background:#009bdf}.novo-sidenav[theme=steel]{color:#fff;background:#5b6770}.novo-sidenav[theme=metal]{color:#fff;background:#637893}.novo-sidenav[theme=sand]{color:#3d464d;background:#f4f4f4}.novo-sidenav[theme=silver]{color:#3d464d;background:#e2e2e2}.novo-sidenav[theme=stone]{color:#3d464d;background:#bebebe}.novo-sidenav[theme=ash]{color:#3d464d;background:#a0a0a0}.novo-sidenav[theme=slate]{color:#fff;background:#707070}.novo-sidenav[theme=onyx]{color:#fff;background:#526980}.novo-sidenav[theme=charcoal]{color:#fff;background:#282828}.novo-sidenav[theme=moonlight]{color:#fff;background:#1a242f}.novo-sidenav[theme=midnight]{color:#fff;background:#202945}.novo-sidenav[theme=darkness]{color:#fff;background:#161f27}.novo-sidenav[theme=navy]{color:#fff;background:#0d2d42}.novo-sidenav[theme=aqua]{color:#3d464d;background:#3bafda}.novo-sidenav[theme=ocean]{color:#fff;background:#4a89dc}.novo-sidenav[theme=mint]{color:#3d464d;background:#37bc9b}.novo-sidenav[theme=grass]{color:#fff;background:#8cc152}.novo-sidenav[theme=sunflower]{color:#fff;background:#f6b042}.novo-sidenav[theme=bittersweet]{color:#fff;background:#eb6845}.novo-sidenav[theme=grapefruit]{color:#fff;background:#da4453}.novo-sidenav[theme=carnation]{color:#fff;background:#d770ad}.novo-sidenav[theme=lavender]{color:#fff;background:#967adc}.novo-sidenav[theme=mountain]{color:#fff;background:#9678b6}.novo-sidenav[theme=info],.novo-sidenav[theme=positive]{color:#fff;background:#4a89dc}.novo-sidenav[theme=success]{color:#fff;background:#8cc152}.novo-sidenav[theme=negative],.novo-sidenav[theme=danger],.novo-sidenav[theme=error]{color:#fff;background:#da4453}.novo-sidenav[theme=warning]{color:#fff;background:#f6b042}.novo-sidenav[theme=empty]{color:#3d464d;background:#cccdcc}.novo-sidenav[theme=disabled]{color:#3d464d;background:#bebebe}.novo-sidenav[theme=background]{color:#3d464d;background:#f7f7f7}.novo-sidenav[theme=backgroundDark]{color:#3d464d;background:#e2e2e2}.novo-sidenav[theme=presentation]{color:#fff;background:#5b6770}.novo-sidenav[theme=bullhorn]{color:#3d464d;background:#ff6900}.novo-sidenav[theme=pulse]{color:#3d464d;background:#3bafda}.novo-sidenav[theme=company]{color:#fff;background:#3399dd}.novo-sidenav[theme=candidate]{color:#fff;background:#44bb77}.novo-sidenav[theme=lead]{color:#fff;background:#aa6699}.novo-sidenav[theme=contact],.novo-sidenav[theme=clientcontact]{color:#fff;background:#ffaa44}.novo-sidenav[theme=opportunity]{color:#fff;background:#662255}.novo-sidenav[theme=job],.novo-sidenav[theme=joborder]{color:#fff;background:#bb5566}.novo-sidenav[theme=submission]{color:#3d464d;background:#a9adbb}.novo-sidenav[theme=sendout]{color:#fff;background:#747884}.novo-sidenav[theme=placement]{color:#fff;background:#0b344f}.novo-sidenav[theme=note]{color:#fff;background:#747884}.novo-sidenav[theme=contract]{color:#fff;background:#454ea0}.novo-sidenav[theme=jobCode],.novo-sidenav[theme=earnCode],.novo-sidenav[theme=invoiceStatement],.novo-sidenav[theme=billableCharge],.novo-sidenav[theme=payableCharge],.novo-sidenav[theme=user],.novo-sidenav[theme=corporateUser],.novo-sidenav[theme=distributionList],.novo-sidenav[theme=credential],.novo-sidenav[theme=person]{color:#fff;background:#696d79}.novo-sidenav,[dir=rtl] .novo-sidenav.novo-sidenav-end{border-right:solid 1px var(--border)}[dir=rtl] .novo-sidenav,.novo-sidenav.novo-sidenav-end{border-left:solid 1px var(--border);border-right:none}.novo-sidenav.novo-sidenav-side{z-index:2}.novo-sidenav.novo-sidenav-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav{transform:translate3d(100%,0,0)}[dir=rtl] .novo-sidenav.novo-sidenav-end{left:0;right:auto;transform:translate3d(-100%,0,0)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9sYXlvdXQvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2xheW91dC9zaWRlbmF2L3NpZGVuYXYuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBMEIsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRixPQUFPLEVBQWdCLHFCQUFxQixFQUFFLG9CQUFvQixFQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFDL0csT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNGLHNGQUFzRjtBQUN0RixPQUFPLEVBQTRDLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUM7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RFosTUFBTTt1QkFBQyxRQUFRO2dCQVFQLFdBQVc7c0JBRG5CLE1BQU07Z0JBV29CLGlCQUFpQjtzQkFBM0MsTUFBTTt1QkFBQyxpQkFBaUI7Z0JBd056Qix1QkFBdUI7c0JBRHRCLFlBQVk7dUJBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUzVDLHNCQUFzQjtzQkFEckIsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzT3JpZ2luLCBGb2N1c1RyYXAsIEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHksIE51bWJlcklucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBtYXBUbywgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gaW1wb3J0IHR5cGUgeyBOb3ZvTGF5b3V0Q29udGFpbmVyIH0gZnJvbSAnLi4vY29udGFpbmVyL2xheW91dC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TaWRlbmF2TW9kZSwgTm92b1NpZGVuYXZUb2dnbGVSZXN1bHQsIE5PVk9fTEFZT1VUX0NPTlRBSU5FUiB9IGZyb20gJy4uL2xheW91dC5jb25zdGFudHMnO1xuaW1wb3J0IHsgbm92b1NpZGVuYXZBbmltYXRpb25zIH0gZnJvbSAnLi9zaWRlbmF2LmFuaW1hdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNpZGVuYXYnLFxuICBleHBvcnRBczogJ25vdm9TaWRlbmF2JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGVuYXYuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaWRlbmF2LmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtub3ZvU2lkZW5hdkFuaW1hdGlvbnMudHJhbnNmb3JtRHJhd2VyXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1zaWRlbmF2JyxcbiAgICB0YWJJbmRleDogJy0xJyxcbiAgICAvLyBtdXN0IHByZXZlbnQgdGhlIGJyb3dzZXIgZnJvbSBhbGlnbmluZyB0ZXh0IGJhc2VkIG9uIHZhbHVlXG4gICAgJ1thdHRyLmFsaWduXSc6ICdudWxsJyxcbiAgICAnW2NsYXNzLm5vdm8tc2lkZW5hdi1lbmRdJzogJ3Bvc2l0aW9uID09PSBcImVuZFwiJyxcbiAgICAnW2NsYXNzLm5vdm8tc2lkZW5hdi1vdmVyXSc6ICdtb2RlID09PSBcIm92ZXJcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLXNpZGVuYXYtcHVzaF0nOiAnbW9kZSA9PT0gXCJwdXNoXCInLFxuICAgICdbY2xhc3Mubm92by1zaWRlbmF2LXNpZGVdJzogJ21vZGUgPT09IFwic2lkZVwiJyxcbiAgICAnW2NsYXNzLm5vdm8tc2lkZW5hdi1vcGVuZWRdJzogJ29wZW5lZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLXNpZGVuYXYtZml4ZWRdJzogJ2ZpeGVkSW5WaWV3cG9ydCcsXG4gICAgJ1tzdHlsZS50b3AucHhdJzogJ2ZpeGVkSW5WaWV3cG9ydCA/IGZpeGVkVG9wR2FwIDogbnVsbCcsXG4gICAgJ1tzdHlsZS5ib3R0b20ucHhdJzogJ2ZpeGVkSW5WaWV3cG9ydCA/IGZpeGVkQm90dG9tR2FwIDogbnVsbCcsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2lkZW5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG4gIC8qKiBXaGV0aGVyIHRoZSBzaWRlbmF2IGlzIGZpeGVkIGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpeGVkSW5WaWV3cG9ydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWRJblZpZXdwb3J0O1xuICB9XG4gIHNldCBmaXhlZEluVmlld3BvcnQodmFsdWUpIHtcbiAgICB0aGlzLl9maXhlZEluVmlld3BvcnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2ZpeGVkSW5WaWV3cG9ydCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgZ2FwIGJldHdlZW4gdGhlIHRvcCBvZiB0aGUgc2lkZW5hdiBhbmQgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQgd2hlbiB0aGUgc2lkZW5hdiBpcyBpbiBmaXhlZFxuICAgKiBtb2RlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpeGVkVG9wR2FwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkVG9wR2FwO1xuICB9XG4gIHNldCBmaXhlZFRvcEdhcCh2YWx1ZSkge1xuICAgIHRoaXMuX2ZpeGVkVG9wR2FwID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2ZpeGVkVG9wR2FwID0gMDtcblxuICAvKipcbiAgICogVGhlIGdhcCBiZXR3ZWVuIHRoZSBib3R0b20gb2YgdGhlIHNpZGVuYXYgYW5kIHRoZSBib3R0b20gb2YgdGhlIHZpZXdwb3J0IHdoZW4gdGhlIHNpZGVuYXYgaXMgaW5cbiAgICogZml4ZWQgbW9kZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBmaXhlZEJvdHRvbUdhcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXhlZEJvdHRvbUdhcDtcbiAgfVxuICBzZXQgZml4ZWRCb3R0b21HYXAodmFsdWUpIHtcbiAgICB0aGlzLl9maXhlZEJvdHRvbUdhcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9maXhlZEJvdHRvbUdhcCA9IDA7XG5cbiAgcHJpdmF0ZSBfZm9jdXNUcmFwOiBGb2N1c1RyYXA7XG4gIHByaXZhdGUgX2VsZW1lbnRGb2N1c2VkQmVmb3JlRHJhd2VyV2FzT3BlbmVkOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBkcmF3ZXIgaXMgaW5pdGlhbGl6ZWQuIFVzZWQgZm9yIGRpc2FibGluZyB0aGUgaW5pdGlhbCBhbmltYXRpb24uICovXG4gIHByaXZhdGUgX2VuYWJsZUFuaW1hdGlvbnMgPSBmYWxzZTtcblxuICAvKiogVGhlIHNpZGUgdGhhdCB0aGUgZHJhd2VyIGlzIGF0dGFjaGVkIHRvLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcG9zaXRpb24oKTogJ3N0YXJ0JyB8ICdlbmQnIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiAnc3RhcnQnIHwgJ2VuZCcpIHtcbiAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhIHZhbGlkIHZhbHVlLlxuICAgIHZhbHVlID0gdmFsdWUgPT09ICdlbmQnID8gJ2VuZCcgOiAnc3RhcnQnO1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcG9zaXRpb24pIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLm9uUG9zaXRpb25DaGFuZ2VkLmVtaXQoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfcG9zaXRpb246ICdzdGFydCcgfCAnZW5kJyA9ICdzdGFydCc7XG5cbiAgLyoqIE1vZGUgb2YgdGhlIGRyYXdlcjsgb25lIG9mICdvdmVyJywgJ3B1c2gnIG9yICdzaWRlJy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1vZGUoKTogTm92b1NpZGVuYXZNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZTtcbiAgfVxuICBzZXQgbW9kZSh2YWx1ZTogTm92b1NpZGVuYXZNb2RlKSB7XG4gICAgdGhpcy5fbW9kZSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUZvY3VzVHJhcFN0YXRlKCk7XG4gICAgdGhpcy5fbW9kZUNoYW5nZWQubmV4dCgpO1xuICB9XG4gIHByaXZhdGUgX21vZGU6IE5vdm9TaWRlbmF2TW9kZSA9ICdvdmVyJztcblxuICAvKiogV2hldGhlciB0aGUgZHJhd2VyIGNhbiBiZSBjbG9zZWQgd2l0aCB0aGUgZXNjYXBlIGtleSBvciBieSBjbGlja2luZyBvbiB0aGUgYmFja2Ryb3AuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlQ2xvc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVDbG9zZTtcbiAgfVxuICBzZXQgZGlzYWJsZUNsb3NlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZUNsb3NlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlQ2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZHJhd2VyIHNob3VsZCBmb2N1cyB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQgYXV0b21hdGljYWxseSB3aGVuIG9wZW5lZC5cbiAgICogRGVmYXVsdHMgdG8gZmFsc2UgaW4gd2hlbiBgbW9kZWAgaXMgc2V0IHRvIGBzaWRlYCwgb3RoZXJ3aXNlIGRlZmF1bHRzIHRvIGB0cnVlYC4gSWYgZXhwbGljaXRseVxuICAgKiBlbmFibGVkLCBmb2N1cyB3aWxsIGJlIG1vdmVkIGludG8gdGhlIHNpZGVuYXYgaW4gYHNpZGVgIG1vZGUgYXMgd2VsbC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBhdXRvRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl9hdXRvRm9jdXM7XG5cbiAgICAvLyBOb3RlIHRoYXQgdXN1YWxseSB3ZSBkaXNhYmxlIGF1dG8gZm9jdXNpbmcgaW4gYHNpZGVgIG1vZGUsIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyBob3cgdGhlXG4gICAgLy8gc2lkZW5hdiBpcyBiZWluZyB1c2VkLCBidXQgaW4gc29tZSBjYXNlcyBpdCBzdGlsbCBtYWtlcyBzZW5zZSB0byBkbyBpdC4gSWYgdGhlIGNvbnN1bWVyXG4gICAgLy8gZXhwbGljaXRseSBlbmFibGVkIGBhdXRvRm9jdXNgLCB3ZSB0YWtlIGl0IGFzIHRoZW0gYWx3YXlzIHdhbnRpbmcgdG8gZW5hYmxlIGl0LlxuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gdGhpcy5tb2RlICE9PSAnc2lkZScgOiB2YWx1ZTtcbiAgfVxuICBzZXQgYXV0b0ZvY3VzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYXV0b0ZvY3VzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9hdXRvRm9jdXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRyYXdlciBpcyBvcGVuZWQuIFdlIG92ZXJsb2FkIHRoaXMgYmVjYXVzZSB3ZSB0cmlnZ2VyIGFuIGV2ZW50IHdoZW4gaXRcbiAgICogc3RhcnRzIG9yIGVuZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgfVxuICBzZXQgb3BlbmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy50b2dnbGUoY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKSk7XG4gIH1cbiAgcHJpdmF0ZSBfb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEhvdyB0aGUgc2lkZW5hdiB3YXMgb3BlbmVkIChrZXlwcmVzcywgbW91c2UgY2xpY2sgZXRjLikgKi9cbiAgcHJpdmF0ZSBfb3BlbmVkVmlhOiBGb2N1c09yaWdpbiB8IG51bGw7XG5cbiAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBkcmF3ZXIgaGFzIHN0YXJ0ZWQgYW5pbWF0aW5nLiAqL1xuICBfYW5pbWF0aW9uU3RhcnRlZCA9IG5ldyBTdWJqZWN0PEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgZHJhd2VyIGlzIGRvbmUgYW5pbWF0aW5nLiAqL1xuICBfYW5pbWF0aW9uRW5kID0gbmV3IFN1YmplY3Q8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgLyoqIEN1cnJlbnQgc3RhdGUgb2YgdGhlIHNpZGVuYXYgYW5pbWF0aW9uLiAqL1xuICAvLyBASG9zdEJpbmRpbmcgaXMgdXNlZCBpbiB0aGUgY2xhc3MgYXMgaXQgaXMgZXhwZWN0ZWQgdG8gYmUgZXh0ZW5kZWQuICBTaW5jZSBAQ29tcG9uZW50IGRlY29yYXRvclxuICAvLyBtZXRhZGF0YSBpcyBub3QgaW5oZXJpdGVkIGJ5IGNoaWxkIGNsYXNzZXMsIGluc3RlYWQgdGhlIGhvc3QgYmluZGluZyBkYXRhIGlzIGRlZmluZWQgaW4gYSB3YXlcbiAgLy8gdGhhdCBjYW4gYmUgaW5oZXJpdGVkLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdEJpbmRpbmcoJ0B0cmFuc2Zvcm0nKVxuICBfYW5pbWF0aW9uU3RhdGU6ICdvcGVuLWluc3RhbnQnIHwgJ29wZW4nIHwgJ3ZvaWQnID0gJ3ZvaWQnO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYXdlciBvcGVuIHN0YXRlIGlzIGNoYW5nZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9XG4gICAgLy8gTm90ZSB0aGlzIGhhcyB0byBiZSBhc3luYyBpbiBvcmRlciB0byBhdm9pZCBzb21lIGlzc3VlcyB3aXRoIHR3by1iaW5kaW5ncyAoc2VlICM4ODcyKS5cbiAgICBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KC8qIGlzQXN5bmMgKi8gdHJ1ZSk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJhd2VyIGhhcyBiZWVuIG9wZW5lZC4gKi9cbiAgQE91dHB1dCgnb3BlbmVkJylcbiAgX29wZW5lZFN0cmVhbSA9IHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoXG4gICAgZmlsdGVyKChvKSA9PiBvKSxcbiAgICBtYXAoKCkgPT4ge30pLFxuICApO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYXdlciBoYXMgc3RhcnRlZCBvcGVuaW5nLiAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgb3BlbmVkU3RhcnQ6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9hbmltYXRpb25TdGFydGVkLnBpcGUoXG4gICAgZmlsdGVyKChlKSA9PiBlLmZyb21TdGF0ZSAhPT0gZS50b1N0YXRlICYmIGUudG9TdGF0ZS5pbmRleE9mKCdvcGVuJykgPT09IDApLFxuICAgIG1hcFRvKHVuZGVmaW5lZCksXG4gICk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJhd2VyIGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgQE91dHB1dCgnY2xvc2VkJylcbiAgX2Nsb3NlZFN0cmVhbSA9IHRoaXMub3BlbmVkQ2hhbmdlLnBpcGUoXG4gICAgZmlsdGVyKChvKSA9PiAhbyksXG4gICAgbWFwKCgpID0+IHt9KSxcbiAgKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmF3ZXIgaGFzIHN0YXJ0ZWQgY2xvc2luZy4gKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGNsb3NlZFN0YXJ0OiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fYW5pbWF0aW9uU3RhcnRlZC5waXBlKFxuICAgIGZpbHRlcigoZSkgPT4gZS5mcm9tU3RhdGUgIT09IGUudG9TdGF0ZSAmJiBlLnRvU3RhdGUgPT09ICd2b2lkJyksXG4gICAgbWFwVG8odW5kZWZpbmVkKSxcbiAgKTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmF3ZXIncyBwb3NpdGlvbiBjaGFuZ2VzLiAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCdwb3NpdGlvbkNoYW5nZWQnKSBvblBvc2l0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiB0aGUgZHJhd2VyIG1vZGUgY2hhbmdlcy4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBkcmF3ZXIgY29udGFpbmVyIHRvXG4gICAqIHRvIGtub3cgd2hlbiB0byB3aGVuIHRoZSBtb2RlIGNoYW5nZXMgc28gaXQgY2FuIGFkYXB0IHRoZSBtYXJnaW5zIG9uIHRoZSBjb250ZW50LlxuICAgKi9cbiAgcmVhZG9ubHkgX21vZGVDaGFuZ2VkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9mb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LFxuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fTEFZT1VUX0NPTlRBSU5FUikgcHVibGljIF9jb250YWluZXI/OiBhbnksIC8vIE5vdm9MYXlvdXRDb250YWluZXJcbiAgKSB7XG4gICAgdGhpcy5vcGVuZWRDaGFuZ2Uuc3Vic2NyaWJlKChvcGVuZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmIChvcGVuZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RvYykge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnRGb2N1c2VkQmVmb3JlRHJhd2VyV2FzT3BlbmVkID0gdGhpcy5fZG9jLmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90YWtlRm9jdXMoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5faXNGb2N1c1dpdGhpbkRyYXdlcigpKSB7XG4gICAgICAgIHRoaXMuX3Jlc3RvcmVGb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIGBrZXlkb3duYCBldmVudHMgb3V0c2lkZSB0aGUgem9uZSBzbyB0aGF0IGNoYW5nZSBkZXRlY3Rpb24gaXMgbm90IHJ1biBldmVyeVxuICAgICAqIHRpbWUgYSBrZXkgaXMgcHJlc3NlZC4gSW5zdGVhZCB3ZSByZS1lbnRlciB0aGUgem9uZSBvbmx5IGlmIHRoZSBgRVNDYCBrZXkgaXMgcHJlc3NlZFxuICAgICAqIGFuZCB3ZSBkb24ndCBoYXZlIGNsb3NlIGRpc2FibGVkLlxuICAgICAqL1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAoZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2tleWRvd24nKSBhcyBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQua2V5ID09PSBLZXkuRXNjYXBlICYmICF0aGlzLmRpc2FibGVDbG9zZSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PlxuICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gV2UgbmVlZCBhIFN1YmplY3Qgd2l0aCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgYmVjYXVzZSB0aGUgYGRvbmVgIGV2ZW50XG4gICAgLy8gZmlyZXMgdHdpY2Ugb24gc29tZSBicm93c2Vycy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI0MDg0XG4gICAgdGhpcy5fYW5pbWF0aW9uRW5kXG4gICAgICAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHgsIHkpID0+IHtcbiAgICAgICAgICByZXR1cm4geC5mcm9tU3RhdGUgPT09IHkuZnJvbVN0YXRlICYmIHgudG9TdGF0ZSA9PT0geS50b1N0YXRlO1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBBbmltYXRpb25FdmVudCkgPT4ge1xuICAgICAgICBjb25zdCB7IGZyb21TdGF0ZSwgdG9TdGF0ZSB9ID0gZXZlbnQ7XG5cbiAgICAgICAgaWYgKCh0b1N0YXRlLmluZGV4T2YoJ29wZW4nKSA9PT0gMCAmJiBmcm9tU3RhdGUgPT09ICd2b2lkJykgfHwgKHRvU3RhdGUgPT09ICd2b2lkJyAmJiBmcm9tU3RhdGUuaW5kZXhPZignb3BlbicpID09PSAwKSkge1xuICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodGhpcy5fb3BlbmVkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgZm9jdXMgaW50byB0aGUgZHJhd2VyLiBOb3RlIHRoYXQgdGhpcyB3b3JrcyBldmVuIGlmXG4gICAqIHRoZSBmb2N1cyB0cmFwIGlzIGRpc2FibGVkIGluIGBzaWRlYCBtb2RlLlxuICAgKi9cbiAgcHJpdmF0ZSBfdGFrZUZvY3VzKCkge1xuICAgIGlmICghdGhpcy5hdXRvRm9jdXMgfHwgIXRoaXMuX2ZvY3VzVHJhcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2ZvY3VzVHJhcC5mb2N1c0luaXRpYWxFbGVtZW50V2hlblJlYWR5KCkudGhlbigoaGFzTW92ZWRGb2N1cykgPT4ge1xuICAgICAgLy8gSWYgdGhlcmUgd2VyZSBubyBmb2N1c2FibGUgZWxlbWVudHMsIGZvY3VzIHRoZSBzaWRlbmF2IGl0c2VsZiBzbyB0aGUga2V5Ym9hcmQgbmF2aWdhdGlvblxuICAgICAgLy8gc3RpbGwgd29ya3MuIFdlIG5lZWQgdG8gY2hlY2sgdGhhdCBgZm9jdXNgIGlzIGEgZnVuY3Rpb24gZHVlIHRvIFVuaXZlcnNhbC5cbiAgICAgIGlmICghaGFzTW92ZWRGb2N1cyAmJiB0eXBlb2YgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RvcmVzIGZvY3VzIHRvIHRoZSBlbGVtZW50IHRoYXQgd2FzIG9yaWdpbmFsbHkgZm9jdXNlZCB3aGVuIHRoZSBkcmF3ZXIgb3BlbmVkLlxuICAgKiBJZiBubyBlbGVtZW50IHdhcyBmb2N1c2VkIGF0IHRoYXQgdGltZSwgdGhlIGZvY3VzIHdpbGwgYmUgcmVzdG9yZWQgdG8gdGhlIGRyYXdlci5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RvcmVGb2N1cygpIHtcbiAgICBpZiAoIXRoaXMuYXV0b0ZvY3VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IGNoZWNrIHZpYSBgaW5zdGFuY2VvZiBIVE1MRWxlbWVudGAgc28gdGhhdCB3ZSBjYW4gY292ZXIgU1ZHcyBhcyB3ZWxsLlxuICAgIGlmICh0aGlzLl9lbGVtZW50Rm9jdXNlZEJlZm9yZURyYXdlcldhc09wZW5lZCkge1xuICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuX2VsZW1lbnRGb2N1c2VkQmVmb3JlRHJhd2VyV2FzT3BlbmVkLCB0aGlzLl9vcGVuZWRWaWEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnRGb2N1c2VkQmVmb3JlRHJhd2VyV2FzT3BlbmVkID0gbnVsbDtcbiAgICB0aGlzLl9vcGVuZWRWaWEgPSBudWxsO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgZm9jdXMgaXMgY3VycmVudGx5IHdpdGhpbiB0aGUgZHJhd2VyLiAqL1xuICBwcml2YXRlIF9pc0ZvY3VzV2l0aGluRHJhd2VyKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFjdGl2ZUVsID0gdGhpcy5fZG9jPy5hY3RpdmVFbGVtZW50O1xuICAgIHJldHVybiAhIWFjdGl2ZUVsICYmIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhhY3RpdmVFbCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fZm9jdXNUcmFwID0gdGhpcy5fZm9jdXNUcmFwRmFjdG9yeS5jcmVhdGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLl91cGRhdGVGb2N1c1RyYXBTdGF0ZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIEVuYWJsZSB0aGUgYW5pbWF0aW9ucyBhZnRlciB0aGUgbGlmZWN5Y2xlIGhvb2tzIGhhdmUgcnVuLCBpbiBvcmRlciB0byBhdm9pZCBhbmltYXRpbmdcbiAgICAvLyBkcmF3ZXJzIHRoYXQgYXJlIG9wZW4gYnkgZGVmYXVsdC4gV2hlbiB3ZSdyZSBvbiB0aGUgc2VydmVyLCB3ZSBzaG91bGRuJ3QgZW5hYmxlIHRoZVxuICAgIC8vIGFuaW1hdGlvbnMsIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0aGUgZHJhd2VyIHRvIGFuaW1hdGUgdGhlIGZpcnN0IHRpbWUgdGhlIHVzZXIgc2Vlc1xuICAgIC8vIHRoZSBwYWdlLlxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX2VuYWJsZUFuaW1hdGlvbnMgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9mb2N1c1RyYXApIHtcbiAgICAgIHRoaXMuX2ZvY3VzVHJhcC5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYW5pbWF0aW9uU3RhcnRlZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2FuaW1hdGlvbkVuZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX21vZGVDaGFuZ2VkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHRoZSBkcmF3ZXIuXG4gICAqIEBwYXJhbSBvcGVuZWRWaWEgV2hldGhlciB0aGUgZHJhd2VyIHdhcyBvcGVuZWQgYnkgYSBrZXkgcHJlc3MsIG1vdXNlIGNsaWNrIG9yIHByb2dyYW1tYXRpY2FsbHkuXG4gICAqIFVzZWQgZm9yIGZvY3VzIG1hbmFnZW1lbnQgYWZ0ZXIgdGhlIHNpZGVuYXYgaXMgY2xvc2VkLlxuICAgKi9cbiAgb3BlbihvcGVuZWRWaWE/OiBGb2N1c09yaWdpbik6IFByb21pc2U8Tm92b1NpZGVuYXZUb2dnbGVSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGUodHJ1ZSwgb3BlbmVkVmlhKTtcbiAgfVxuXG4gIC8qKiBDbG9zZSB0aGUgZHJhd2VyLiAqL1xuICBjbG9zZSgpOiBQcm9taXNlPE5vdm9TaWRlbmF2VG9nZ2xlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBDbG9zZXMgdGhlIGRyYXdlciB3aXRoIGNvbnRleHQgdGhhdCB0aGUgYmFja2Ryb3Agd2FzIGNsaWNrZWQuICovXG4gIF9jbG9zZVZpYUJhY2tkcm9wQ2xpY2soKTogUHJvbWlzZTxOb3ZvU2lkZW5hdlRvZ2dsZVJlc3VsdD4ge1xuICAgIC8vIElmIHRoZSBkcmF3ZXIgaXMgY2xvc2VkIHVwb24gYSBiYWNrZHJvcCBjbGljaywgd2UgYWx3YXlzIHdhbnQgdG8gcmVzdG9yZSBmb2N1cy4gV2VcbiAgICAvLyBkb24ndCBuZWVkIHRvIGNoZWNrIHdoZXRoZXIgZm9jdXMgaXMgY3VycmVudGx5IGluIHRoZSBkcmF3ZXIsIGFzIGNsaWNraW5nIG9uIHRoZVxuICAgIC8vIGJhY2tkcm9wIGNhdXNlcyBibHVycmluZyBvZiB0aGUgYWN0aXZlIGVsZW1lbnQuXG4gICAgcmV0dXJuIHRoaXMuX3NldE9wZW4oLyogaXNPcGVuICovIGZhbHNlLCAvKiByZXN0b3JlRm9jdXMgKi8gdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoaXMgZHJhd2VyLlxuICAgKiBAcGFyYW0gaXNPcGVuIFdoZXRoZXIgdGhlIGRyYXdlciBzaG91bGQgYmUgb3Blbi5cbiAgICogQHBhcmFtIG9wZW5lZFZpYSBXaGV0aGVyIHRoZSBkcmF3ZXIgd2FzIG9wZW5lZCBieSBhIGtleSBwcmVzcywgbW91c2UgY2xpY2sgb3IgcHJvZ3JhbW1hdGljYWxseS5cbiAgICogVXNlZCBmb3IgZm9jdXMgbWFuYWdlbWVudCBhZnRlciB0aGUgc2lkZW5hdiBpcyBjbG9zZWQuXG4gICAqL1xuICB0b2dnbGUoaXNPcGVuOiBib29sZWFuID0gIXRoaXMub3BlbmVkLCBvcGVuZWRWaWE/OiBGb2N1c09yaWdpbik6IFByb21pc2U8Tm92b1NpZGVuYXZUb2dnbGVSZXN1bHQ+IHtcbiAgICAvLyBJZiB0aGUgZm9jdXMgaXMgY3VycmVudGx5IGluc2lkZSB0aGUgZHJhd2VyIGNvbnRlbnQgYW5kIHdlIGFyZSBjbG9zaW5nIHRoZSBkcmF3ZXIsXG4gICAgLy8gcmVzdG9yZSB0aGUgZm9jdXMgdG8gdGhlIGluaXRpYWxseSBmb2N1c2VkIGVsZW1lbnQgKHdoZW4gdGhlIGRyYXdlciBvcGVuZWQpLlxuICAgIHJldHVybiB0aGlzLl9zZXRPcGVuKGlzT3BlbiwgLyogcmVzdG9yZUZvY3VzICovICFpc09wZW4gJiYgdGhpcy5faXNGb2N1c1dpdGhpbkRyYXdlcigpLCBvcGVuZWRWaWEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIG9wZW5lZCBzdGF0ZSBvZiB0aGUgZHJhd2VyLlxuICAgKiBAcGFyYW0gaXNPcGVuIFdoZXRoZXIgdGhlIGRyYXdlciBzaG91bGQgb3BlbiBvciBjbG9zZS5cbiAgICogQHBhcmFtIHJlc3RvcmVGb2N1cyBXaGV0aGVyIGZvY3VzIHNob3VsZCBiZSByZXN0b3JlZCBvbiBjbG9zZS5cbiAgICogQHBhcmFtIG9wZW5lZFZpYSBGb2N1cyBvcmlnaW4gdGhhdCBjYW4gYmUgb3B0aW9uYWxseSBzZXQgd2hlbiBvcGVuaW5nIGEgZHJhd2VyLiBUaGVcbiAgICogICBvcmlnaW4gd2lsbCBiZSB1c2VkIGxhdGVyIHdoZW4gZm9jdXMgaXMgcmVzdG9yZWQgb24gZHJhd2VyIGNsb3NlLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0T3Blbihpc09wZW46IGJvb2xlYW4sIHJlc3RvcmVGb2N1czogYm9vbGVhbiwgb3BlbmVkVmlhOiBGb2N1c09yaWdpbiA9ICdwcm9ncmFtJyk6IFByb21pc2U8Tm92b1NpZGVuYXZUb2dnbGVSZXN1bHQ+IHtcbiAgICB0aGlzLl9vcGVuZWQgPSBpc09wZW47XG5cbiAgICBpZiAoaXNPcGVuKSB7XG4gICAgICB0aGlzLl9hbmltYXRpb25TdGF0ZSA9IHRoaXMuX2VuYWJsZUFuaW1hdGlvbnMgPyAnb3BlbicgOiAnb3Blbi1pbnN0YW50JztcbiAgICAgIHRoaXMuX29wZW5lZFZpYSA9IG9wZW5lZFZpYTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uU3RhdGUgPSAndm9pZCc7XG4gICAgICBpZiAocmVzdG9yZUZvY3VzKSB7XG4gICAgICAgIHRoaXMuX3Jlc3RvcmVGb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZUZvY3VzVHJhcFN0YXRlKCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8Tm92b1NpZGVuYXZUb2dnbGVSZXN1bHQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLm9wZW5lZENoYW5nZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgob3BlbikgPT4gcmVzb2x2ZShvcGVuID8gJ29wZW4nIDogJ2Nsb3NlJykpO1xuICAgIH0pO1xuICB9XG5cbiAgX2dldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA/IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCAwIDogMDtcbiAgfVxuXG4gIC8qKiBVcGRhdGVzIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBmb2N1cyB0cmFwLiAqL1xuICBwcml2YXRlIF91cGRhdGVGb2N1c1RyYXBTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5fZm9jdXNUcmFwKSB7XG4gICAgICAvLyBUaGUgZm9jdXMgdHJhcCBpcyBvbmx5IGVuYWJsZWQgd2hlbiB0aGUgZHJhd2VyIGlzIG9wZW4gaW4gYW55IG1vZGUgb3RoZXIgdGhhbiBzaWRlLlxuICAgICAgdGhpcy5fZm9jdXNUcmFwLmVuYWJsZWQgPSB0aGlzLm9wZW5lZCAmJiB0aGlzLm1vZGUgIT09ICdzaWRlJztcbiAgICB9XG4gIH1cblxuICAvLyBXZSBoYXZlIHRvIHVzZSBhIGBIb3N0TGlzdGVuZXJgIGhlcmUgaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIEl2eSBhbmQgVmlld0VuZ2luZS5cbiAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgYmluZGluZ3Mgd2lsbCBiZSBtZXJnZWQgd2hlbiB0aGlzIGNsYXNzIGlzIGV4dGVuZGVkLCB3aGVyZWFzIGluXG4gIC8vIFZpZXdFbmdpbmUgdGhleSdyZSBvdmVyd3JpdHRlbi5cbiAgQEhvc3RMaXN0ZW5lcignQHRyYW5zZm9ybS5zdGFydCcsIFsnJGV2ZW50J10pXG4gIF9hbmltYXRpb25TdGFydExpc3RlbmVyKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgIHRoaXMuX2FuaW1hdGlvblN0YXJ0ZWQubmV4dChldmVudCk7XG4gIH1cblxuICAvLyBXZSBoYXZlIHRvIHVzZSBhIGBIb3N0TGlzdGVuZXJgIGhlcmUgaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIEl2eSBhbmQgVmlld0VuZ2luZS5cbiAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgYmluZGluZ3Mgd2lsbCBiZSBtZXJnZWQgd2hlbiB0aGlzIGNsYXNzIGlzIGV4dGVuZGVkLCB3aGVyZWFzIGluXG4gIC8vIFZpZXdFbmdpbmUgdGhleSdyZSBvdmVyd3JpdHRlbi5cbiAgQEhvc3RMaXN0ZW5lcignQHRyYW5zZm9ybS5kb25lJywgWyckZXZlbnQnXSlcbiAgX2FuaW1hdGlvbkRvbmVMaXN0ZW5lcihldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICB0aGlzLl9hbmltYXRpb25FbmQubmV4dChldmVudCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZUNsb3NlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hdXRvRm9jdXM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX29wZW5lZDogQm9vbGVhbklucHV0O1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXhlZEluVmlld3BvcnQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkVG9wR2FwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkQm90dG9tR2FwOiBOdW1iZXJJbnB1dDtcbn1cbiIsIjxkaXYgY2xhc3M9XCJub3ZvLXNpZGVuYXYtaW5uZXItY29udGFpbmVyXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PiJdfQ==