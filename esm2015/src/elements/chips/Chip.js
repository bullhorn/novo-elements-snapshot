import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Attribute, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewEncapsulation, } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { mixinColor, mixinSize, mixinTabIndex } from '../common';
export const REMOVABLE_REF = new InjectionToken('REMOVABLE_REF');
/** Event object emitted by NovoChip when selected or deselected. */
export class NovoChipSelectionChange {
    constructor(
    /** Reference to the chip that emitted the event. */
    source, 
    /** Whether the chip that emitted the event is selected. */
    selected, 
    /** Whether the selection change was a result of a user interaction. */
    isUserInput = false) {
        this.source = source;
        this.selected = selected;
        this.isUserInput = isUserInput;
    }
}
// Boilerplate for applying mixins to NovoChipElement.
/** @docs-private */
class NovoChipBase {
    // abstract disabled: boolean;
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const NovoChipMixinBase = mixinSize(mixinTabIndex(mixinColor(NovoChipBase, null), -1), 'md');
/**
 * Dummy directive to add CSS class to chip avatar.
 * @docs-private
 */
export class NovoChipAvatar {
}
NovoChipAvatar.decorators = [
    { type: Directive, args: [{
                selector: 'novo-chip-avatar, [novoChipAvatar]',
                host: { class: 'novo-chip-avatar' },
            },] }
];
/**
 * Applies proper (click) support and adds styling for use with Bullhorn's "x" icon *
 * Example:
 *
 *     `<novo-chip>
 *       <novo-icon novoChipRemove>x</novo-icon>
 *     </novo-chip>`
 *
 * You *may* use a custom icon, but you may need to override the `novo-chip-remove` positioning
 * styles to properly center the icon within the chip.
 */
export class NovoChipRemove {
    constructor(_parentChip, elementRef) {
        this._parentChip = _parentChip;
        if (elementRef.nativeElement.nodeName === 'BUTTON') {
            elementRef.nativeElement.setAttribute('type', 'button');
        }
    }
    /** Calls the parent chip's public `remove()` method if applicable. */
    _handleClick(event) {
        const parentChip = this._parentChip;
        if (parentChip.removable && !parentChip.disabled) {
            parentChip.remove();
        }
        // We need to stop event propagation because otherwise the event will bubble up to the
        // form field and cause the `onContainerClick` method to be invoked. This method would then
        // reset the focused chip that has been focused after chip removal. Usually the parent
        // the parent click listener of the `NovoChip` would prevent propagation, but it can happen
        // that the chip is being removed before the event bubbles up.
        event.stopPropagation();
    }
}
NovoChipRemove.decorators = [
    { type: Directive, args: [{
                selector: '[novoChipRemove]',
                host: {
                    class: 'novo-chip-remove',
                    '(click)': '_handleClick($event)',
                },
            },] }
];
NovoChipRemove.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [REMOVABLE_REF,] }] },
    { type: ElementRef }
];
/**
 * Chip component. Used inside the NovoChipList component.
 */
export class NovoChipElement extends NovoChipMixinBase {
    constructor(_elementRef, _ngZone, platform, _changeDetectorRef, _document, animationMode, tabIndex) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        /** Whether the chip has focus. */
        this._hasFocus = false;
        /** Whether the chip list is selectable */
        this._chipListSelectable = true;
        /** Whether the chip list is in multi-selection mode. */
        this._chipListMultiple = false;
        /** Whether the chip list as a whole is disabled. */
        this._chipListDisabled = false;
        this._selected = false;
        this._selectable = false;
        this._disabled = false;
        this._removable = true;
        /** Emits when the chip is focused. */
        this._onFocus = new Subject();
        /** Emits when the chip is blured. */
        this._onBlur = new Subject();
        /** Emitted when the chip is selected or deselected. */
        this.selectionChange = new EventEmitter();
        /** Emitted when the chip is destroyed. */
        this.destroyed = new EventEmitter();
        /** Emitted when a chip is to be removed. */
        this.removed = new EventEmitter();
        this._animationsDisabled = animationMode === 'NoopAnimations';
        this.tabIndex = tabIndex != null ? parseInt(tabIndex, 10) || -1 : -1;
    }
    /** Whether the chip is selected. */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        const coercedValue = coerceBooleanProperty(value);
        if (coercedValue !== this._selected) {
            this._selected = coercedValue;
            this._dispatchSelectionChange();
        }
    }
    /** The value of the chip. Defaults to the content inside `<novo-chip>` tags. */
    get value() {
        return this._value !== undefined ? this._value : this._elementRef.nativeElement.textContent;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Whether or not the chip is selectable. When a chip is not selectable,
     * changes to its selected state are always ignored. By default a chip is
     * selectable, and it becomes non-selectable if its parent chip list is
     * not selectable.
     */
    get selectable() {
        return this._selectable && this._chipListSelectable;
    }
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
    }
    /** Whether the chip is disabled. */
    get disabled() {
        return this._chipListDisabled || this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Determines whether or not the chip displays the remove styling and emits (removed) events.
     */
    get removable() {
        return this._removable;
    }
    set removable(value) {
        this._removable = coerceBooleanProperty(value);
    }
    /** The ARIA selected applied to the chip. */
    get ariaSelected() {
        // Remove the `aria-selected` when the chip is deselected in single-selection mode, because
        // it adds noise to NVDA users where "not selected" will be read out for each chip.
        return this.selectable && (this._chipListMultiple || this.selected) ? this.selected.toString() : null;
    }
    ngOnDestroy() {
        this.destroyed.emit({ chip: this });
    }
    /** Selects the chip. */
    select() {
        if (!this._selected) {
            this._selected = true;
            this._dispatchSelectionChange();
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Deselects the chip. */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this._dispatchSelectionChange();
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Select this chip and emit selected event */
    selectViaInteraction() {
        if (!this._selected) {
            this._selected = true;
            this._dispatchSelectionChange(true);
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Toggles the current selected state of this chip. */
    toggleSelected(isUserInput = false) {
        this._selected = !this.selected;
        this._dispatchSelectionChange(isUserInput);
        this._changeDetectorRef.markForCheck();
        return this.selected;
    }
    /** Allows for programmatic focusing of the chip. */
    focus() {
        if (!this._hasFocus) {
            this._elementRef.nativeElement.focus();
            this._onFocus.next({ chip: this });
        }
        this._hasFocus = true;
    }
    /**
     * Allows for programmatic removal of the chip. Called by the NovoChipList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    remove() {
        if (this.removable) {
            this.removed.emit({ chip: this });
        }
    }
    /** Handles click events on the chip. */
    _handleClick(event) {
        if (this.disabled) {
            event.preventDefault();
        }
        else {
            event.stopPropagation();
        }
    }
    /** Handle custom key presses. */
    _handleKeydown(event) {
        if (this.disabled) {
            return;
        }
        switch (event.key) {
            case "Delete" /* Delete */:
            case "Backspace" /* Backspace */:
                // If we are removable, remove the focused chip
                this.remove();
                // Always prevent so page navigation does not occur
                event.preventDefault();
                break;
            case " " /* Space */:
                // If we are selectable, toggle the focused chip
                if (this.selectable) {
                    this.toggleSelected(true);
                }
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
        }
    }
    _blur() {
        // When animations are enabled, Angular may end up removing the chip from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the chip list
        // that moves focus not the next item. To work around the issue, we defer marking the chip
        // as not focused until the next time the zone stabilizes.
        this._ngZone.onStable.pipe(take(1)).subscribe(() => {
            this._ngZone.run(() => {
                this._hasFocus = false;
                this._onBlur.next({ chip: this });
            });
        });
    }
    _dispatchSelectionChange(isUserInput = false) {
        this.selectionChange.emit({
            source: this,
            isUserInput,
            selected: this._selected,
        });
    }
}
NovoChipElement.decorators = [
    { type: Component, args: [{
                selector: `novo-chip, [novo-chip]`,
                template: `<ng-content></ng-content>`,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color', 'tabIndex', 'size'],
                providers: [{ provide: REMOVABLE_REF, useExisting: NovoChipElement }],
                host: {
                    class: 'novo-chip novo-focus-indicator',
                    role: 'option',
                    '[class.novo-chip-selectable]': 'selectable',
                    '[class.novo-chip-selected]': 'selected',
                    '[class.novo-chip-with-avatar]': 'avatar',
                    '[class.novo-chip-with-trailing-icon]': 'removeIcon',
                    '[class.novo-chip-disabled]': 'disabled',
                    '[class._novo-animation-noopable]': '_animationsDisabled',
                    '[attr.tabindex]': 'disabled ? null : tabIndex',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.aria-selected]': 'ariaSelected',
                    '(click)': '_handleClick($event)',
                    // '(mouseenter)': '_handleActivate($event)',
                    // '(mouseleave)': '_handleDeactivate($event)',
                    '(keydown)': '_handleKeydown($event)',
                    '(focus)': 'focus()',
                    '(blur)': '_blur()',
                },
                styles: [".novo-chip{-moz-appearance:none;-webkit-appearance:none;-webkit-tap-highlight-color:transparent;align-items:center;background:var(--background-main);border:none;border:1px solid transparent;border-radius:.4rem;box-sizing:border-box;color:inherit;cursor:default;display:inline;display:inline-flex;font-size:var(--font-size-text);font-weight:400;gap:1rem;height:1px;min-height:2.4rem;padding:0 1rem;position:relative;transition:.2s ease-out;transition:all .2s ease-in-out}.novo-chip.text-nowrap{white-space:nowrap}.novo-chip.text-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.novo-chip.text-size-default{font-size:inherit}.novo-chip.text-size-body{font-size:1.2rem}.novo-chip.text-size-xs{font-size:.8rem}.novo-chip.text-size-sm{font-size:1rem}.novo-chip.text-size-md{font-size:1.2rem}.novo-chip.text-size-lg{font-size:1.6rem}.novo-chip.text-size-xl{font-size:2rem}.novo-chip.text-size-2xl{font-size:2.6rem}.novo-chip.text-size-3xl{font-size:3.2rem}.novo-chip.text-size-smaller{font-size:.8em}.novo-chip.text-size-larger{font-size:1.2em}.novo-chip.text-color-black{color:#000}.novo-chip.text-color-white{color:#fff}.novo-chip.text-color-gray,.novo-chip.text-color-grey{color:#9e9e9e}.novo-chip.text-color-bright,.novo-chip.text-color-offWhite{color:#f7f7f7}.novo-chip.text-color-light{color:#dbdbdb}.novo-chip.text-color-neutral{color:#4f5361}.novo-chip.text-color-dark{color:#3d464d}.novo-chip.text-color-orange{color:#ff6900}.novo-chip.text-color-navigation{color:#202945}.novo-chip.text-color-skyBlue{color:#009bdf}.novo-chip.text-color-steel{color:#5b6770}.novo-chip.text-color-metal{color:#637893}.novo-chip.text-color-sand{color:#f4f4f4}.novo-chip.text-color-silver{color:#e2e2e2}.novo-chip.text-color-stone{color:#bebebe}.novo-chip.text-color-ash{color:#a0a0a0}.novo-chip.text-color-slate{color:#707070}.novo-chip.text-color-onyx{color:#526980}.novo-chip.text-color-charcoal{color:#282828}.novo-chip.text-color-moonlight{color:#1a242f}.novo-chip.text-color-midnight{color:#202945}.novo-chip.text-color-darkness{color:#161f27}.novo-chip.text-color-navy{color:#0d2d42}.novo-chip.text-color-aqua{color:#3bafda}.novo-chip.text-color-ocean{color:#4a89dc}.novo-chip.text-color-mint{color:#37bc9b}.novo-chip.text-color-grass{color:#8cc152}.novo-chip.text-color-sunflower{color:#f6b042}.novo-chip.text-color-bittersweet{color:#eb6845}.novo-chip.text-color-grapefruit{color:#da4453}.novo-chip.text-color-carnation{color:#d770ad}.novo-chip.text-color-lavender{color:#967adc}.novo-chip.text-color-mountain{color:#9678b6}.novo-chip.text-color-info,.novo-chip.text-color-positive{color:#4a89dc}.novo-chip.text-color-success{color:#8cc152}.novo-chip.text-color-danger,.novo-chip.text-color-error,.novo-chip.text-color-negative{color:#da4453}.novo-chip.text-color-warning{color:#f6b042}.novo-chip.text-color-empty{color:#cccdcc}.novo-chip.text-color-disabled{color:#bebebe}.novo-chip.text-color-background{color:#f7f7f7}.novo-chip.text-color-backgroundDark{color:#e2e2e2}.novo-chip.text-color-presentation{color:#5b6770}.novo-chip.text-color-bullhorn{color:#ff6900}.novo-chip.text-color-pulse{color:#3bafda}.novo-chip.text-color-company{color:#39d}.novo-chip.text-color-candidate{color:#4b7}.novo-chip.text-color-lead{color:#a69}.novo-chip.text-color-contact{color:#fa4}.novo-chip.text-color-opportunity{color:#625}.novo-chip.text-color-job{color:#b56}.novo-chip.text-color-submission{color:#a9adbb}.novo-chip.text-color-sendout{color:#747884}.novo-chip.text-color-placement{color:#0b344f}.novo-chip.text-color-note{color:#747884}.novo-chip.text-color-contract{color:#454ea0}.novo-chip.text-color-billableCharge,.novo-chip.text-color-corporateUser,.novo-chip.text-color-credential,.novo-chip.text-color-distributionList,.novo-chip.text-color-earnCode,.novo-chip.text-color-invoiceStatement,.novo-chip.text-color-jobCode,.novo-chip.text-color-payableCharge,.novo-chip.text-color-person,.novo-chip.text-color-user{color:#696d79}.novo-chip.margin-before{margin-top:.4rem}.novo-chip.margin-after{margin-bottom:.8rem}.novo-chip.text-length-small{max-width:40ch}.novo-chip.text-length-medium{max-width:55ch}.novo-chip.text-length-large{max-width:70ch}.novo-chip.text-weight-hairline{font-weight:100}.novo-chip.text-weight-thin{font-weight:200}.novo-chip.text-weight-light{font-weight:300}.novo-chip.text-weight-normal{font-weight:400}.novo-chip.text-weight-medium{font-weight:500}.novo-chip.text-weight-semibold{font-weight:600}.novo-chip.text-weight-bold{font-weight:700}.novo-chip.text-weight-extrabold{font-weight:800}.novo-chip.text-weight-heavy{font-weight:900}.novo-chip.text-weight-lighter{font-weight:lighter}.novo-chip.text-weight-bolder{font-weight:bolder}.novo-chip.novo-chip-selectable{color:var(--selection)}.novo-chip.novo-chip-selectable:after{background-color:#000;border-radius:inherit;bottom:0;content:\"\";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s ease-in-out}.novo-chip.novo-chip-selectable:focus{border:1px solid var(--selection);outline:none}.novo-chip.novo-chip-selectable:focus:after{opacity:.16}.novo-chip.novo-chip-selectable:hover{border:1px solid var(--selection)}.novo-chip.novo-chip-disabled{opacity:.4;pointer-events:none}.novo-chip.novo-chip-disabled:after{opacity:0}.novo-chip.novo-chip-disabled .novo-chip-remove,.novo-chip.novo-chip-disabled .novo-chip-trailing-icon{cursor:default}.novo-chip .novo-chip-avatar::not(novo-icon){height:24px;width:24px}.novo-chip .novo-chip-avatar{-o-object-fit:cover;align-items:center;border-radius:50%;display:flex;justify-content:center;margin-left:0;margin-right:0;object-fit:cover;overflow:hidden}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{cursor:pointer;height:18px;margin-left:0;margin-right:0;width:18px}.novo-chip .novo-chip-remove{color:#dbdbdb}.novo-chip:not(.novo-chip-disabled) .novo-chip-remove:hover{color:#8f8f8f}.novo-chip.novo-size-xs{border-radius:.4rem;font-size:.8rem;min-height:1.6rem;padding:0 .25rem}.novo-chip.novo-size-xs.novo-chip-with-avatar{padding-left:.125rem}.novo-chip.novo-size-xs.novo-chip-with-trailing-icon{padding-right:.125rem}.novo-chip.novo-size-sm{border-radius:.4rem;font-size:1rem;min-height:2rem;padding:0 .5rem}.novo-chip.novo-size-sm.novo-chip-with-avatar{padding-left:.25rem}.novo-chip.novo-size-sm.novo-chip-with-trailing-icon{padding-right:.25rem}.novo-chip.novo-size-md{border-radius:.4rem;font-size:1.2rem;min-height:2.8rem;padding:0 1rem}.novo-chip.novo-size-md.novo-chip-with-avatar{padding-left:.5rem}.novo-chip.novo-size-md.novo-chip-with-trailing-icon{padding-right:.5rem}.novo-chip.novo-size-lg{border-radius:.4rem;font-size:1.4rem;min-height:3.2rem;padding:0 1.25rem}.novo-chip.novo-size-lg.novo-chip-with-avatar{padding-left:.625rem}.novo-chip.novo-size-lg.novo-chip-with-trailing-icon{padding-right:.625rem}.novo-chip.novo-size-xl{border-radius:.4rem;font-size:1.8rem;min-height:3.6rem;padding:0 1.5rem}.novo-chip.novo-size-xl.novo-chip-with-avatar{padding-left:.75rem}.novo-chip.novo-size-xl.novo-chip-with-trailing-icon{padding-right:.75rem}.novo-chip.novo-color-black{background:#000;color:#fff}.novo-chip.novo-color-black>*{color:inherit}.novo-chip.novo-accent-black{border:1px solid #000;color:#000}.novo-chip.novo-color-white{background:#fff;color:#3d464d}.novo-chip.novo-color-white>*{color:inherit}.novo-chip.novo-accent-white{border:1px solid #fff;color:#fff}.novo-chip.novo-color-gray{background:#9e9e9e;color:#3d464d}.novo-chip.novo-color-gray>*{color:inherit}.novo-chip.novo-accent-gray{border:1px solid #9e9e9e;color:#9e9e9e}.novo-chip.novo-color-grey{background:#9e9e9e;color:#3d464d}.novo-chip.novo-color-grey>*{color:inherit}.novo-chip.novo-accent-grey{border:1px solid #9e9e9e;color:#9e9e9e}.novo-chip.novo-color-offWhite{background:#f7f7f7;color:#3d464d}.novo-chip.novo-color-offWhite>*{color:inherit}.novo-chip.novo-accent-offWhite{border:1px solid #f7f7f7;color:#f7f7f7}.novo-chip.novo-color-bright{background:#f7f7f7;color:#3d464d}.novo-chip.novo-color-bright>*{color:inherit}.novo-chip.novo-accent-bright{border:1px solid #f7f7f7;color:#f7f7f7}.novo-chip.novo-color-light{background:#dbdbdb;color:#3d464d}.novo-chip.novo-color-light>*{color:inherit}.novo-chip.novo-accent-light{border:1px solid #dbdbdb;color:#dbdbdb}.novo-chip.novo-color-neutral{background:#4f5361;color:#fff}.novo-chip.novo-color-neutral>*{color:inherit}.novo-chip.novo-accent-neutral{border:1px solid #4f5361;color:#4f5361}.novo-chip.novo-color-dark{background:#3d464d;color:#fff}.novo-chip.novo-color-dark>*{color:inherit}.novo-chip.novo-accent-dark{border:1px solid #3d464d;color:#3d464d}.novo-chip.novo-color-orange{background:#ff6900;color:#3d464d}.novo-chip.novo-color-orange>*{color:inherit}.novo-chip.novo-accent-orange{border:1px solid #ff6900;color:#ff6900}.novo-chip.novo-color-navigation{background:#202945;color:#fff}.novo-chip.novo-color-navigation>*{color:inherit}.novo-chip.novo-accent-navigation{border:1px solid #202945;color:#202945}.novo-chip.novo-color-skyBlue{background:#009bdf;color:#fff}.novo-chip.novo-color-skyBlue>*{color:inherit}.novo-chip.novo-accent-skyBlue{border:1px solid #009bdf;color:#009bdf}.novo-chip.novo-color-steel{background:#5b6770;color:#fff}.novo-chip.novo-color-steel>*{color:inherit}.novo-chip.novo-accent-steel{border:1px solid #5b6770;color:#5b6770}.novo-chip.novo-color-metal{background:#637893;color:#fff}.novo-chip.novo-color-metal>*{color:inherit}.novo-chip.novo-accent-metal{border:1px solid #637893;color:#637893}.novo-chip.novo-color-sand{background:#f4f4f4;color:#3d464d}.novo-chip.novo-color-sand>*{color:inherit}.novo-chip.novo-accent-sand{border:1px solid #f4f4f4;color:#f4f4f4}.novo-chip.novo-color-silver{background:#e2e2e2;color:#3d464d}.novo-chip.novo-color-silver>*{color:inherit}.novo-chip.novo-accent-silver{border:1px solid #e2e2e2;color:#e2e2e2}.novo-chip.novo-color-stone{background:#bebebe;color:#3d464d}.novo-chip.novo-color-stone>*{color:inherit}.novo-chip.novo-accent-stone{border:1px solid #bebebe;color:#bebebe}.novo-chip.novo-color-ash{background:#a0a0a0;color:#3d464d}.novo-chip.novo-color-ash>*{color:inherit}.novo-chip.novo-accent-ash{border:1px solid #a0a0a0;color:#a0a0a0}.novo-chip.novo-color-slate{background:#707070;color:#fff}.novo-chip.novo-color-slate>*{color:inherit}.novo-chip.novo-accent-slate{border:1px solid #707070;color:#707070}.novo-chip.novo-color-onyx{background:#526980;color:#fff}.novo-chip.novo-color-onyx>*{color:inherit}.novo-chip.novo-accent-onyx{border:1px solid #526980;color:#526980}.novo-chip.novo-color-charcoal{background:#282828;color:#fff}.novo-chip.novo-color-charcoal>*{color:inherit}.novo-chip.novo-accent-charcoal{border:1px solid #282828;color:#282828}.novo-chip.novo-color-moonlight{background:#1a242f;color:#fff}.novo-chip.novo-color-moonlight>*{color:inherit}.novo-chip.novo-accent-moonlight{border:1px solid #1a242f;color:#1a242f}.novo-chip.novo-color-midnight{background:#202945;color:#fff}.novo-chip.novo-color-midnight>*{color:inherit}.novo-chip.novo-accent-midnight{border:1px solid #202945;color:#202945}.novo-chip.novo-color-darkness{background:#161f27;color:#fff}.novo-chip.novo-color-darkness>*{color:inherit}.novo-chip.novo-accent-darkness{border:1px solid #161f27;color:#161f27}.novo-chip.novo-color-navy{background:#0d2d42;color:#fff}.novo-chip.novo-color-navy>*{color:inherit}.novo-chip.novo-accent-navy{border:1px solid #0d2d42;color:#0d2d42}.novo-chip.novo-color-aqua{background:#3bafda;color:#3d464d}.novo-chip.novo-color-aqua>*{color:inherit}.novo-chip.novo-accent-aqua{border:1px solid #3bafda;color:#3bafda}.novo-chip.novo-color-ocean{background:#4a89dc;color:#fff}.novo-chip.novo-color-ocean>*{color:inherit}.novo-chip.novo-accent-ocean{border:1px solid #4a89dc;color:#4a89dc}.novo-chip.novo-color-mint{background:#37bc9b;color:#3d464d}.novo-chip.novo-color-mint>*{color:inherit}.novo-chip.novo-accent-mint{border:1px solid #37bc9b;color:#37bc9b}.novo-chip.novo-color-grass{background:#8cc152;color:#fff}.novo-chip.novo-color-grass>*{color:inherit}.novo-chip.novo-accent-grass{border:1px solid #8cc152;color:#8cc152}.novo-chip.novo-color-sunflower{background:#f6b042;color:#fff}.novo-chip.novo-color-sunflower>*{color:inherit}.novo-chip.novo-accent-sunflower{border:1px solid #f6b042;color:#f6b042}.novo-chip.novo-color-bittersweet{background:#eb6845;color:#fff}.novo-chip.novo-color-bittersweet>*{color:inherit}.novo-chip.novo-accent-bittersweet{border:1px solid #eb6845;color:#eb6845}.novo-chip.novo-color-grapefruit{background:#da4453;color:#fff}.novo-chip.novo-color-grapefruit>*{color:inherit}.novo-chip.novo-accent-grapefruit{border:1px solid #da4453;color:#da4453}.novo-chip.novo-color-carnation{background:#d770ad;color:#fff}.novo-chip.novo-color-carnation>*{color:inherit}.novo-chip.novo-accent-carnation{border:1px solid #d770ad;color:#d770ad}.novo-chip.novo-color-lavender{background:#967adc;color:#fff}.novo-chip.novo-color-lavender>*{color:inherit}.novo-chip.novo-accent-lavender{border:1px solid #967adc;color:#967adc}.novo-chip.novo-color-mountain{background:#9678b6;color:#fff}.novo-chip.novo-color-mountain>*{color:inherit}.novo-chip.novo-accent-mountain{border:1px solid #9678b6;color:#9678b6}.novo-chip.novo-color-info{background:#4a89dc;color:#fff}.novo-chip.novo-color-info>*{color:inherit}.novo-chip.novo-accent-info{border:1px solid #4a89dc;color:#4a89dc}.novo-chip.novo-color-positive{background:#4a89dc;color:#fff}.novo-chip.novo-color-positive>*{color:inherit}.novo-chip.novo-accent-positive{border:1px solid #4a89dc;color:#4a89dc}.novo-chip.novo-color-success{background:#8cc152;color:#fff}.novo-chip.novo-color-success>*{color:inherit}.novo-chip.novo-accent-success{border:1px solid #8cc152;color:#8cc152}.novo-chip.novo-color-negative{background:#da4453;color:#fff}.novo-chip.novo-color-negative>*{color:inherit}.novo-chip.novo-accent-negative{border:1px solid #da4453;color:#da4453}.novo-chip.novo-color-danger{background:#da4453;color:#fff}.novo-chip.novo-color-danger>*{color:inherit}.novo-chip.novo-accent-danger{border:1px solid #da4453;color:#da4453}.novo-chip.novo-color-error{background:#da4453;color:#fff}.novo-chip.novo-color-error>*{color:inherit}.novo-chip.novo-accent-error{border:1px solid #da4453;color:#da4453}.novo-chip.novo-color-warning{background:#f6b042;color:#fff}.novo-chip.novo-color-warning>*{color:inherit}.novo-chip.novo-accent-warning{border:1px solid #f6b042;color:#f6b042}.novo-chip.novo-color-empty{background:#cccdcc;color:#3d464d}.novo-chip.novo-color-empty>*{color:inherit}.novo-chip.novo-accent-empty{border:1px solid #cccdcc;color:#cccdcc}.novo-chip.novo-color-disabled{background:#bebebe;color:#3d464d}.novo-chip.novo-color-disabled>*{color:inherit}.novo-chip.novo-accent-disabled{border:1px solid #bebebe;color:#bebebe}.novo-chip.novo-color-background{background:#f7f7f7;color:#3d464d}.novo-chip.novo-color-background>*{color:inherit}.novo-chip.novo-accent-background{border:1px solid #f7f7f7;color:#f7f7f7}.novo-chip.novo-color-backgroundDark{background:#e2e2e2;color:#3d464d}.novo-chip.novo-color-backgroundDark>*{color:inherit}.novo-chip.novo-accent-backgroundDark{border:1px solid #e2e2e2;color:#e2e2e2}.novo-chip.novo-color-presentation{background:#5b6770;color:#fff}.novo-chip.novo-color-presentation>*{color:inherit}.novo-chip.novo-accent-presentation{border:1px solid #5b6770;color:#5b6770}.novo-chip.novo-color-bullhorn{background:#ff6900;color:#3d464d}.novo-chip.novo-color-bullhorn>*{color:inherit}.novo-chip.novo-accent-bullhorn{border:1px solid #ff6900;color:#ff6900}.novo-chip.novo-color-pulse{background:#3bafda;color:#3d464d}.novo-chip.novo-color-pulse>*{color:inherit}.novo-chip.novo-accent-pulse{border:1px solid #3bafda;color:#3bafda}.novo-chip.novo-color-company{background:#39d;color:#fff}.novo-chip.novo-color-company>*{color:inherit}.novo-chip.novo-accent-company{border:1px solid #39d;color:#39d}.novo-chip.novo-color-candidate{background:#4b7;color:#fff}.novo-chip.novo-color-candidate>*{color:inherit}.novo-chip.novo-accent-candidate{border:1px solid #4b7;color:#4b7}.novo-chip.novo-color-lead{background:#a69;color:#fff}.novo-chip.novo-color-lead>*{color:inherit}.novo-chip.novo-accent-lead{border:1px solid #a69;color:#a69}.novo-chip.novo-color-contact{background:#fa4;color:#fff}.novo-chip.novo-color-contact>*{color:inherit}.novo-chip.novo-accent-contact{border:1px solid #fa4;color:#fa4}.novo-chip.novo-color-opportunity{background:#625;color:#fff}.novo-chip.novo-color-opportunity>*{color:inherit}.novo-chip.novo-accent-opportunity{border:1px solid #625;color:#625}.novo-chip.novo-color-job{background:#b56;color:#fff}.novo-chip.novo-color-job>*{color:inherit}.novo-chip.novo-accent-job{border:1px solid #b56;color:#b56}.novo-chip.novo-color-submission{background:#a9adbb;color:#3d464d}.novo-chip.novo-color-submission>*{color:inherit}.novo-chip.novo-accent-submission{border:1px solid #a9adbb;color:#a9adbb}.novo-chip.novo-color-sendout{background:#747884;color:#fff}.novo-chip.novo-color-sendout>*{color:inherit}.novo-chip.novo-accent-sendout{border:1px solid #747884;color:#747884}.novo-chip.novo-color-placement{background:#0b344f;color:#fff}.novo-chip.novo-color-placement>*{color:inherit}.novo-chip.novo-accent-placement{border:1px solid #0b344f;color:#0b344f}.novo-chip.novo-color-note{background:#747884;color:#fff}.novo-chip.novo-color-note>*{color:inherit}.novo-chip.novo-accent-note{border:1px solid #747884;color:#747884}.novo-chip.novo-color-contract{background:#454ea0;color:#fff}.novo-chip.novo-color-contract>*{color:inherit}.novo-chip.novo-accent-contract{border:1px solid #454ea0;color:#454ea0}.novo-chip.novo-color-jobCode{background:#696d79;color:#fff}.novo-chip.novo-color-jobCode>*{color:inherit}.novo-chip.novo-accent-jobCode{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-earnCode{background:#696d79;color:#fff}.novo-chip.novo-color-earnCode>*{color:inherit}.novo-chip.novo-accent-earnCode{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-invoiceStatement{background:#696d79;color:#fff}.novo-chip.novo-color-invoiceStatement>*{color:inherit}.novo-chip.novo-accent-invoiceStatement{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-billableCharge{background:#696d79;color:#fff}.novo-chip.novo-color-billableCharge>*{color:inherit}.novo-chip.novo-accent-billableCharge{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-payableCharge{background:#696d79;color:#fff}.novo-chip.novo-color-payableCharge>*{color:inherit}.novo-chip.novo-accent-payableCharge{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-user{background:#696d79;color:#fff}.novo-chip.novo-color-user>*{color:inherit}.novo-chip.novo-accent-user{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-corporateUser{background:#696d79;color:#fff}.novo-chip.novo-color-corporateUser>*{color:inherit}.novo-chip.novo-accent-corporateUser{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-distributionList{background:#696d79;color:#fff}.novo-chip.novo-color-distributionList>*{color:inherit}.novo-chip.novo-accent-distributionList{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-credential{background:#696d79;color:#fff}.novo-chip.novo-color-credential>*{color:inherit}.novo-chip.novo-accent-credential{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-person{background:#696d79;color:#fff}.novo-chip.novo-color-person>*{color:inherit}.novo-chip.novo-accent-person{border:1px solid #696d79;color:#696d79}"]
            },] }
];
NovoChipElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Platform },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
];
NovoChipElement.propDecorators = {
    avatar: [{ type: ContentChild, args: [NovoChipAvatar,] }],
    removeIcon: [{ type: ContentChild, args: [NovoChipRemove,] }],
    type: [{ type: Input }],
    selected: [{ type: Input }],
    value: [{ type: Input }],
    selectable: [{ type: Input }],
    disabled: [{ type: Input }],
    removable: [{ type: Input }],
    selectionChange: [{ type: Output }],
    destroyed: [{ type: Output }],
    removed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jaGlwcy9DaGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBcUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFRcEksTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUErQixJQUFJLGNBQWMsQ0FBYSxlQUFlLENBQUMsQ0FBQztBQVF6RyxvRUFBb0U7QUFDcEUsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQztJQUNFLG9EQUFvRDtJQUM3QyxNQUF1QjtJQUM5QiwyREFBMkQ7SUFDcEQsUUFBaUI7SUFDeEIsdUVBQXVFO0lBQ2hFLGNBQWMsS0FBSztRQUpuQixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUV2QixhQUFRLEdB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QUVSLE1BQU0sU0FBQyxRQUFRO3lDQUNmLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCO3lDQUN4QyxTQUFTLFNBQUMsVUFBVTs7O3FCQWxHdEIsWUFBWSxTQUFDLGNBQWM7eUJBRzNCLFlBQVksU0FBQyxjQUFjO21CQUUzQixLQUFLO3VCQUVMLEtBQUs7b0JBZUwsS0FBSzt5QkFlTCxLQUFLO3VCQVVMLEtBQUs7d0JBWUwsS0FBSzs4QkFnQkwsTUFBTTt3QkFHTixNQUFNO3NCQUdOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgTnVtYmVySW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFOSU1BVElPTl9NT0RVTEVfVFlQRSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgQ2FuU2l6ZUN0b3IsIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsIG1peGluQ29sb3IsIG1peGluU2l6ZSwgbWl4aW5UYWJJbmRleCB9IGZyb20gJy4uL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlbW92YWJsZSB7XG4gIHJlbW92ZTogKCkgPT4gdm9pZDtcbiAgcmVtb3ZhYmxlOiBib29sZWFuO1xuICBkaXNhYmxlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IFJFTU9WQUJMRV9SRUY6IEluamVjdGlvblRva2VuPElSZW1vdmFibGU+ID0gbmV3IEluamVjdGlvblRva2VuPElSZW1vdmFibGU+KCdSRU1PVkFCTEVfUkVGJyk7XG5cbi8qKiBSZXByZXNlbnRzIGFuIGV2ZW50IGZpcmVkIG9uIGFuIGluZGl2aWR1YWwgYG5vdm8tY2hpcGAuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdm9DaGlwRXZlbnQge1xuICAvKiogVGhlIGNoaXAgdGhlIGV2ZW50IHdhcyBmaXJlZCBvbi4gKi9cbiAgY2hpcDogTm92b0NoaXBFbGVtZW50O1xufVxuXG4vKiogRXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTm92b0NoaXAgd2hlbiBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuZXhwb3J0IGNsYXNzIE5vdm9DaGlwU2VsZWN0aW9uQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY2hpcCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyBzb3VyY2U6IE5vdm9DaGlwRWxlbWVudCxcbiAgICAvKiogV2hldGhlciB0aGUgY2hpcCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50IGlzIHNlbGVjdGVkLiAqL1xuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbixcbiAgICAvKiogV2hldGhlciB0aGUgc2VsZWN0aW9uIGNoYW5nZSB3YXMgYSByZXN1bHQgb2YgYSB1c2VyIGludGVyYWN0aW9uLiAqL1xuICAgIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlLFxuICApIHt9XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTm92b0NoaXBFbGVtZW50LlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmNsYXNzIE5vdm9DaGlwQmFzZSB7XG4gIC8vIGFic3RyYWN0IGRpc2FibGVkOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbmNvbnN0IE5vdm9DaGlwTWl4aW5CYXNlOiBDYW5TaXplQ3RvciAmIENhbkNvbG9yQ3RvciAmIEhhc1RhYkluZGV4Q3RvciAmIHR5cGVvZiBOb3ZvQ2hpcEJhc2UgPSBtaXhpblNpemUoXG4gIG1peGluVGFiSW5kZXgobWl4aW5Db2xvcihOb3ZvQ2hpcEJhc2UsIG51bGwpLCAtMSksXG4gICdtZCcsXG4pO1xuXG4vKipcbiAqIER1bW15IGRpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzIHRvIGNoaXAgYXZhdGFyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNoaXAtYXZhdGFyLCBbbm92b0NoaXBBdmF0YXJdJyxcbiAgaG9zdDogeyBjbGFzczogJ25vdm8tY2hpcC1hdmF0YXInIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGlwQXZhdGFyIHt9XG5cbi8qKlxuICogQXBwbGllcyBwcm9wZXIgKGNsaWNrKSBzdXBwb3J0IGFuZCBhZGRzIHN0eWxpbmcgZm9yIHVzZSB3aXRoIEJ1bGxob3JuJ3MgXCJ4XCIgaWNvbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICBgPG5vdm8tY2hpcD5cbiAqICAgICAgIDxub3ZvLWljb24gbm92b0NoaXBSZW1vdmU+eDwvbm92by1pY29uPlxuICogICAgIDwvbm92by1jaGlwPmBcbiAqXG4gKiBZb3UgKm1heSogdXNlIGEgY3VzdG9tIGljb24sIGJ1dCB5b3UgbWF5IG5lZWQgdG8gb3ZlcnJpZGUgdGhlIGBub3ZvLWNoaXAtcmVtb3ZlYCBwb3NpdGlvbmluZ1xuICogc3R5bGVzIHRvIHByb3Blcmx5IGNlbnRlciB0aGUgaWNvbiB3aXRoaW4gdGhlIGNoaXAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvQ2hpcFJlbW92ZV0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWNoaXAtcmVtb3ZlJyxcbiAgICAnKGNsaWNrKSc6ICdfaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGlwUmVtb3ZlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChSRU1PVkFCTEVfUkVGKSBwcml2YXRlIF9wYXJlbnRDaGlwOiBJUmVtb3ZhYmxlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIGlmIChlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUgPT09ICdCVVRUT04nKSB7XG4gICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDYWxscyB0aGUgcGFyZW50IGNoaXAncyBwdWJsaWMgYHJlbW92ZSgpYCBtZXRob2QgaWYgYXBwbGljYWJsZS4gKi9cbiAgX2hhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHBhcmVudENoaXAgPSB0aGlzLl9wYXJlbnRDaGlwO1xuICAgIGlmIChwYXJlbnRDaGlwLnJlbW92YWJsZSAmJiAhcGFyZW50Q2hpcC5kaXNhYmxlZCkge1xuICAgICAgcGFyZW50Q2hpcC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIHN0b3AgZXZlbnQgcHJvcGFnYXRpb24gYmVjYXVzZSBvdGhlcndpc2UgdGhlIGV2ZW50IHdpbGwgYnViYmxlIHVwIHRvIHRoZVxuICAgIC8vIGZvcm0gZmllbGQgYW5kIGNhdXNlIHRoZSBgb25Db250YWluZXJDbGlja2AgbWV0aG9kIHRvIGJlIGludm9rZWQuIFRoaXMgbWV0aG9kIHdvdWxkIHRoZW5cbiAgICAvLyByZXNldCB0aGUgZm9jdXNlZCBjaGlwIHRoYXQgaGFzIGJlZW4gZm9jdXNlZCBhZnRlciBjaGlwIHJlbW92YWwuIFVzdWFsbHkgdGhlIHBhcmVudFxuICAgIC8vIHRoZSBwYXJlbnQgY2xpY2sgbGlzdGVuZXIgb2YgdGhlIGBOb3ZvQ2hpcGAgd291bGQgcHJldmVudCBwcm9wYWdhdGlvbiwgYnV0IGl0IGNhbiBoYXBwZW5cbiAgICAvLyB0aGF0IHRoZSBjaGlwIGlzIGJlaW5nIHJlbW92ZWQgYmVmb3JlIHRoZSBldmVudCBidWJibGVzIHVwLlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59XG5cbi8qKlxuICogQ2hpcCBjb21wb25lbnQuIFVzZWQgaW5zaWRlIHRoZSBOb3ZvQ2hpcExpc3QgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IGBub3ZvLWNoaXAsIFtub3ZvLWNoaXBdYCxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgc3R5bGVVcmxzOiBbJy4vQ2hpcC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGlucHV0czogWydjb2xvcicsICd0YWJJbmRleCcsICdzaXplJ10sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogUkVNT1ZBQkxFX1JFRiwgdXNlRXhpc3Rpbmc6IE5vdm9DaGlwRWxlbWVudCB9XSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jaGlwIG5vdm8tZm9jdXMtaW5kaWNhdG9yJyxcbiAgICByb2xlOiAnb3B0aW9uJyxcbiAgICAnW2NsYXNzLm5vdm8tY2hpcC1zZWxlY3RhYmxlXSc6ICdzZWxlY3RhYmxlJyxcbiAgICAnW2NsYXNzLm5vdm8tY2hpcC1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICdbY2xhc3Mubm92by1jaGlwLXdpdGgtYXZhdGFyXSc6ICdhdmF0YXInLFxuICAgICdbY2xhc3Mubm92by1jaGlwLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAncmVtb3ZlSWNvbicsXG4gICAgJ1tjbGFzcy5ub3ZvLWNoaXAtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLl9ub3ZvLWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbnNEaXNhYmxlZCcsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiB0YWJJbmRleCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ2FyaWFTZWxlY3RlZCcsXG4gICAgJyhjbGljayknOiAnX2hhbmRsZUNsaWNrKCRldmVudCknLFxuICAgIC8vICcobW91c2VlbnRlciknOiAnX2hhbmRsZUFjdGl2YXRlKCRldmVudCknLFxuICAgIC8vICcobW91c2VsZWF2ZSknOiAnX2hhbmRsZURlYWN0aXZhdGUoJGV2ZW50KScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGZvY3VzKSc6ICdmb2N1cygpJyxcbiAgICAnKGJsdXIpJzogJ19ibHVyKCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2hpcEVsZW1lbnQgZXh0ZW5kcyBOb3ZvQ2hpcE1peGluQmFzZSBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95LCBDYW5Db2xvciwgSGFzVGFiSW5kZXgge1xuICAvKiogV2hldGhlciB0aGUgY2hpcCBoYXMgZm9jdXMuICovXG4gIF9oYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgZm9yIHRoZSBjaGlwIGFyZSBlbmFibGVkLiAqL1xuICBfYW5pbWF0aW9uc0Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGxpc3QgaXMgc2VsZWN0YWJsZSAqL1xuICBfY2hpcExpc3RTZWxlY3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBsaXN0IGlzIGluIG11bHRpLXNlbGVjdGlvbiBtb2RlLiAqL1xuICBfY2hpcExpc3RNdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGxpc3QgYXMgYSB3aG9sZSBpcyBkaXNhYmxlZC4gKi9cbiAgX2NoaXBMaXN0RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIGNoaXAgYXZhdGFyICovXG4gIEBDb250ZW50Q2hpbGQoTm92b0NoaXBBdmF0YXIpIGF2YXRhcjogTm92b0NoaXBBdmF0YXI7XG5cbiAgLyoqIFRoZSBjaGlwJ3MgcmVtb3ZlIHRvZ2dsZXIuICovXG4gIEBDb250ZW50Q2hpbGQoTm92b0NoaXBSZW1vdmUpIHJlbW92ZUljb246IE5vdm9DaGlwUmVtb3ZlO1xuXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgaXMgc2VsZWN0ZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgY29lcmNlZFZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgIGlmIChjb2VyY2VkVmFsdWUgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IGNvZXJjZWRWYWx1ZTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG4gIHByb3RlY3RlZCBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIHZhbHVlIG9mIHRoZSBjaGlwLiBEZWZhdWx0cyB0byB0aGUgY29udGVudCBpbnNpZGUgYDxub3ZvLWNoaXA+YCB0YWdzLiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUgIT09IHVuZGVmaW5lZCA/IHRoaXMuX3ZhbHVlIDogdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBwcm90ZWN0ZWQgX3ZhbHVlOiBhbnk7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSBjaGlwIGlzIHNlbGVjdGFibGUuIFdoZW4gYSBjaGlwIGlzIG5vdCBzZWxlY3RhYmxlLFxuICAgKiBjaGFuZ2VzIHRvIGl0cyBzZWxlY3RlZCBzdGF0ZSBhcmUgYWx3YXlzIGlnbm9yZWQuIEJ5IGRlZmF1bHQgYSBjaGlwIGlzXG4gICAqIHNlbGVjdGFibGUsIGFuZCBpdCBiZWNvbWVzIG5vbi1zZWxlY3RhYmxlIGlmIGl0cyBwYXJlbnQgY2hpcCBsaXN0IGlzXG4gICAqIG5vdCBzZWxlY3RhYmxlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGFibGUgJiYgdGhpcy5fY2hpcExpc3RTZWxlY3RhYmxlO1xuICB9XG4gIHNldCBzZWxlY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9zZWxlY3RhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpcExpc3REaXNhYmxlZCB8fCB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBjaGlwIGRpc3BsYXlzIHRoZSByZW1vdmUgc3R5bGluZyBhbmQgZW1pdHMgKHJlbW92ZWQpIGV2ZW50cy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbW92YWJsZTtcbiAgfVxuICBzZXQgcmVtb3ZhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVtb3ZhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3JlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgZm9jdXNlZC4gKi9cbiAgcmVhZG9ubHkgX29uRm9jdXMgPSBuZXcgU3ViamVjdDxOb3ZvQ2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGlzIGJsdXJlZC4gKi9cbiAgcmVhZG9ubHkgX29uQmx1ciA9IG5ldyBTdWJqZWN0PE5vdm9DaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgY2hpcCBpcyBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Tm92b0NoaXBTZWxlY3Rpb25DaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvQ2hpcFNlbGVjdGlvbkNoYW5nZT4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSBjaGlwIGlzIGRlc3Ryb3llZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRlc3Ryb3llZDogRXZlbnRFbWl0dGVyPE5vdm9DaGlwRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvQ2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gYSBjaGlwIGlzIHRvIGJlIHJlbW92ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSByZW1vdmVkOiBFdmVudEVtaXR0ZXI8Tm92b0NoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9DaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIFRoZSBBUklBIHNlbGVjdGVkIGFwcGxpZWQgdG8gdGhlIGNoaXAuICovXG4gIGdldCBhcmlhU2VsZWN0ZWQoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgLy8gUmVtb3ZlIHRoZSBgYXJpYS1zZWxlY3RlZGAgd2hlbiB0aGUgY2hpcCBpcyBkZXNlbGVjdGVkIGluIHNpbmdsZS1zZWxlY3Rpb24gbW9kZSwgYmVjYXVzZVxuICAgIC8vIGl0IGFkZHMgbm9pc2UgdG8gTlZEQSB1c2VycyB3aGVyZSBcIm5vdCBzZWxlY3RlZFwiIHdpbGwgYmUgcmVhZCBvdXQgZm9yIGVhY2ggY2hpcC5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RhYmxlICYmICh0aGlzLl9jaGlwTGlzdE11bHRpcGxlIHx8IHRoaXMuc2VsZWN0ZWQpID8gdGhpcy5zZWxlY3RlZC50b1N0cmluZygpIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg/OiBzdHJpbmcsXG4gICkge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB0aGlzLl9hbmltYXRpb25zRGlzYWJsZWQgPSBhbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICAgIHRoaXMudGFiSW5kZXggPSB0YWJJbmRleCAhPSBudWxsID8gcGFyc2VJbnQodGFiSW5kZXgsIDEwKSB8fCAtMSA6IC0xO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7IGNoaXA6IHRoaXMgfSk7XG4gIH1cblxuICAvKiogU2VsZWN0cyB0aGUgY2hpcC4gKi9cbiAgc2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogRGVzZWxlY3RzIHRoZSBjaGlwLiAqL1xuICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNlbGVjdCB0aGlzIGNoaXAgYW5kIGVtaXQgc2VsZWN0ZWQgZXZlbnQgKi9cbiAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UodHJ1ZSk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgY3VycmVudCBzZWxlY3RlZCBzdGF0ZSBvZiB0aGlzIGNoaXAuICovXG4gIHRvZ2dsZVNlbGVjdGVkKGlzVXNlcklucHV0OiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKGlzVXNlcklucHV0KTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxuXG4gIC8qKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyBmb2N1c2luZyBvZiB0aGUgY2hpcC4gKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9oYXNGb2N1cykge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLl9vbkZvY3VzLm5leHQoeyBjaGlwOiB0aGlzIH0pO1xuICAgIH1cbiAgICB0aGlzLl9oYXNGb2N1cyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgcmVtb3ZhbCBvZiB0aGUgY2hpcC4gQ2FsbGVkIGJ5IHRoZSBOb3ZvQ2hpcExpc3Qgd2hlbiB0aGUgREVMRVRFIG9yXG4gICAqIEJBQ0tTUEFDRSBrZXlzIGFyZSBwcmVzc2VkLlxuICAgKlxuICAgKiBJbmZvcm1zIGFueSBsaXN0ZW5lcnMgb2YgdGhlIHJlbW92YWwgcmVxdWVzdC4gRG9lcyBub3QgcmVtb3ZlIHRoZSBjaGlwIGZyb20gdGhlIERPTS5cbiAgICovXG4gIHJlbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZW1vdmFibGUpIHtcbiAgICAgIHRoaXMucmVtb3ZlZC5lbWl0KHsgY2hpcDogdGhpcyB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBjbGljayBldmVudHMgb24gdGhlIGNoaXAuICovXG4gIF9oYW5kbGVDbGljayhldmVudDogRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZSBjdXN0b20ga2V5IHByZXNzZXMuICovXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBLZXkuRGVsZXRlOlxuICAgICAgY2FzZSBLZXkuQmFja3NwYWNlOlxuICAgICAgICAvLyBJZiB3ZSBhcmUgcmVtb3ZhYmxlLCByZW1vdmUgdGhlIGZvY3VzZWQgY2hpcFxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAvLyBBbHdheXMgcHJldmVudCBzbyBwYWdlIG5hdmlnYXRpb24gZG9lcyBub3Qgb2NjdXJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5TcGFjZTpcbiAgICAgICAgLy8gSWYgd2UgYXJlIHNlbGVjdGFibGUsIHRvZ2dsZSB0aGUgZm9jdXNlZCBjaGlwXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVNlbGVjdGVkKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNwYWNlIGZyb20gc2Nyb2xsaW5nIHRoZSBwYWdlIHNpbmNlIHRoZSBsaXN0IGhhcyBmb2N1c1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBfYmx1cigpOiB2b2lkIHtcbiAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgY2hpcCBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgY2hpcCBsaXN0XG4gICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBjaGlwXG4gICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5faGFzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fb25CbHVyLm5leHQoeyBjaGlwOiB0aGlzIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZShpc1VzZXJJbnB1dCA9IGZhbHNlKSB7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh7XG4gICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICBpc1VzZXJJbnB1dCxcbiAgICAgIHNlbGVjdGVkOiB0aGlzLl9zZWxlY3RlZCxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zZWxlY3RlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVtb3ZhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdGFiSW5kZXg6IE51bWJlcklucHV0O1xufVxuIl19