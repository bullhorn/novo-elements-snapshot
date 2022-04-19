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
        this.toggleSelected(true);
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
                styles: [".novo-chip{-moz-appearance:none;-webkit-appearance:none;-webkit-tap-highlight-color:transparent;align-items:center;background:var(--background-main);border:none;border:1px solid transparent;border-radius:.4rem;box-sizing:border-box;color:inherit;cursor:default;display:inline;display:inline-flex;font-size:var(--font-size-text);font-weight:400;gap:1rem;height:1px;min-height:2.4rem;padding:0 1rem;position:relative;transition:.2s ease-out;transition:all .2s ease-in-out;transition-property:color,opacity;vertical-align:middle}.novo-chip.text-nowrap{white-space:nowrap}.novo-chip.text-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.novo-chip.text-size-default{font-size:inherit}.novo-chip.text-size-body{font-size:1.3rem}.novo-chip.text-size-xs{font-size:1rem}.novo-chip.text-size-sm{font-size:1.2rem}.novo-chip.text-size-md{font-size:1.3rem}.novo-chip.text-size-lg{font-size:1.6rem}.novo-chip.text-size-xl{font-size:2rem}.novo-chip.text-size-2xl{font-size:2.6rem}.novo-chip.text-size-3xl{font-size:3.2rem}.novo-chip.text-size-smaller{font-size:.8em}.novo-chip.text-size-larger{font-size:1.2em}.novo-chip.text-color-black{color:#000}.novo-chip.text-color-white{color:#fff}.novo-chip.text-color-gray,.novo-chip.text-color-grey{color:#9e9e9e}.novo-chip.text-color-bright,.novo-chip.text-color-offWhite{color:#f7f7f7}.novo-chip.text-color-light{color:#dbdbdb}.novo-chip.text-color-neutral{color:#4f5361}.novo-chip.text-color-dark{color:#3d464d}.novo-chip.text-color-orange{color:#ff6900}.novo-chip.text-color-navigation{color:#202945}.novo-chip.text-color-skyBlue{color:#009bdf}.novo-chip.text-color-steel{color:#5b6770}.novo-chip.text-color-metal{color:#637893}.novo-chip.text-color-sand{color:#f4f4f4}.novo-chip.text-color-silver{color:#e2e2e2}.novo-chip.text-color-stone{color:#bebebe}.novo-chip.text-color-ash{color:#a0a0a0}.novo-chip.text-color-slate{color:#707070}.novo-chip.text-color-onyx{color:#526980}.novo-chip.text-color-charcoal{color:#282828}.novo-chip.text-color-moonlight{color:#1a242f}.novo-chip.text-color-midnight{color:#202945}.novo-chip.text-color-darkness{color:#161f27}.novo-chip.text-color-navy{color:#0d2d42}.novo-chip.text-color-aqua{color:#3bafda}.novo-chip.text-color-ocean{color:#4a89dc}.novo-chip.text-color-mint{color:#37bc9b}.novo-chip.text-color-grass{color:#8cc152}.novo-chip.text-color-sunflower{color:#f6b042}.novo-chip.text-color-bittersweet{color:#eb6845}.novo-chip.text-color-grapefruit{color:#da4453}.novo-chip.text-color-carnation{color:#d770ad}.novo-chip.text-color-lavender{color:#967adc}.novo-chip.text-color-mountain{color:#9678b6}.novo-chip.text-color-info,.novo-chip.text-color-positive{color:#4a89dc}.novo-chip.text-color-success{color:#8cc152}.novo-chip.text-color-danger,.novo-chip.text-color-error,.novo-chip.text-color-negative{color:#da4453}.novo-chip.text-color-warning{color:#f6b042}.novo-chip.text-color-empty{color:#cccdcc}.novo-chip.text-color-disabled{color:#bebebe}.novo-chip.text-color-background{color:#f7f7f7}.novo-chip.text-color-backgroundDark{color:#e2e2e2}.novo-chip.text-color-presentation{color:#5b6770}.novo-chip.text-color-bullhorn{color:#ff6900}.novo-chip.text-color-pulse{color:#3bafda}.novo-chip.text-color-company{color:#39d}.novo-chip.text-color-candidate{color:#4b7}.novo-chip.text-color-lead{color:#a69}.novo-chip.text-color-clientcontact,.novo-chip.text-color-contact{color:#fa4}.novo-chip.text-color-opportunity{color:#625}.novo-chip.text-color-job,.novo-chip.text-color-joborder{color:#b56}.novo-chip.text-color-submission{color:#a9adbb}.novo-chip.text-color-sendout{color:#747884}.novo-chip.text-color-placement{color:#0b344f}.novo-chip.text-color-note{color:#747884}.novo-chip.text-color-contract{color:#454ea0}.novo-chip.text-color-billableCharge,.novo-chip.text-color-corporateUser,.novo-chip.text-color-credential,.novo-chip.text-color-distributionList,.novo-chip.text-color-earnCode,.novo-chip.text-color-invoiceStatement,.novo-chip.text-color-jobCode,.novo-chip.text-color-payableCharge,.novo-chip.text-color-person,.novo-chip.text-color-user{color:#696d79}.novo-chip.margin-before{margin-top:.4rem}.novo-chip.margin-after{margin-bottom:.8rem}.novo-chip.text-length-small{max-width:40ch}.novo-chip.text-length-medium{max-width:55ch}.novo-chip.text-length-large{max-width:70ch}.novo-chip.text-weight-hairline{font-weight:100}.novo-chip.text-weight-thin{font-weight:200}.novo-chip.text-weight-light{font-weight:300}.novo-chip.text-weight-normal{font-weight:400}.novo-chip.text-weight-medium{font-weight:500}.novo-chip.text-weight-semibold{font-weight:600}.novo-chip.text-weight-bold{font-weight:700}.novo-chip.text-weight-extrabold{font-weight:800}.novo-chip.text-weight-heavy{font-weight:900}.novo-chip.text-weight-lighter{font-weight:lighter}.novo-chip.text-weight-bolder{font-weight:bolder}.novo-chip.novo-chip-selectable{color:var(--selection)}.novo-chip.novo-chip-selectable:after{background-color:#000;border-radius:inherit;bottom:0;content:\"\";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s ease-in-out}.novo-chip.novo-chip-selectable:focus{border:1px solid var(--selection);outline:none}.novo-chip.novo-chip-selectable:focus:after{opacity:.16}.novo-chip.novo-chip-selectable:hover{border:1px solid var(--selection)}.novo-chip.novo-chip-disabled{opacity:.4;pointer-events:none}.novo-chip.novo-chip-disabled:after{opacity:0}.novo-chip.novo-chip-disabled .novo-chip-remove,.novo-chip.novo-chip-disabled .novo-chip-trailing-icon{cursor:default}.novo-chip .novo-chip-avatar::not(novo-icon){height:24px;width:24px}.novo-chip .novo-chip-avatar{-o-object-fit:cover;align-items:center;border-radius:50%;display:flex;justify-content:center;margin-left:0;margin-right:0;object-fit:cover;overflow:hidden}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{cursor:pointer;height:18px;margin-left:0;margin-right:0;width:18px}.novo-chip .novo-chip-remove{color:#dbdbdb}.novo-chip:not(.novo-chip-disabled) .novo-chip-remove:hover{color:#8f8f8f}.novo-chip.novo-size-xs{border-radius:.4rem;font-size:.8rem;gap:.25rem;min-height:1.6rem;padding:0 .25rem}.novo-chip.novo-size-xs.novo-chip-with-avatar{padding-left:.125rem}.novo-chip.novo-size-xs.novo-chip-with-trailing-icon{padding-right:.125rem}.novo-chip.novo-size-xs .novo-text{font-size:inherit}.novo-chip.novo-size-sm{border-radius:.4rem;font-size:1rem;gap:.5rem;min-height:2rem;padding:0 .5rem}.novo-chip.novo-size-sm.novo-chip-with-avatar{padding-left:.25rem}.novo-chip.novo-size-sm.novo-chip-with-trailing-icon{padding-right:.25rem}.novo-chip.novo-size-sm .novo-text{font-size:inherit}.novo-chip.novo-size-md{border-radius:.4rem;font-size:1.2rem;gap:1rem;min-height:2.8rem;padding:0 1rem}.novo-chip.novo-size-md.novo-chip-with-avatar{padding-left:.5rem}.novo-chip.novo-size-md.novo-chip-with-trailing-icon{padding-right:.5rem}.novo-chip.novo-size-md .novo-text{font-size:inherit}.novo-chip.novo-size-lg{border-radius:.4rem;font-size:1.4rem;gap:1.25rem;min-height:3.2rem;padding:0 1.25rem}.novo-chip.novo-size-lg.novo-chip-with-avatar{padding-left:.625rem}.novo-chip.novo-size-lg.novo-chip-with-trailing-icon{padding-right:.625rem}.novo-chip.novo-size-lg .novo-text{font-size:inherit}.novo-chip.novo-size-xl{border-radius:.4rem;font-size:1.8rem;gap:1.5rem;min-height:3.6rem;padding:0 1.5rem}.novo-chip.novo-size-xl.novo-chip-with-avatar{padding-left:.75rem}.novo-chip.novo-size-xl.novo-chip-with-trailing-icon{padding-right:.75rem}.novo-chip.novo-size-xl .novo-text{font-size:inherit}.novo-chip.novo-color-black{background:#000;color:#fff}.novo-chip.novo-color-black>*{color:inherit}.novo-chip.novo-accent-black{border:1px solid #000;color:#000}.novo-chip.novo-color-white{background:#fff;color:#3d464d}.novo-chip.novo-color-white>*{color:inherit}.novo-chip.novo-accent-white{border:1px solid #fff;color:#fff}.novo-chip.novo-color-gray{background:#9e9e9e;color:#3d464d}.novo-chip.novo-color-gray>*{color:inherit}.novo-chip.novo-accent-gray{border:1px solid #9e9e9e;color:#9e9e9e}.novo-chip.novo-color-grey{background:#9e9e9e;color:#3d464d}.novo-chip.novo-color-grey>*{color:inherit}.novo-chip.novo-accent-grey{border:1px solid #9e9e9e;color:#9e9e9e}.novo-chip.novo-color-offWhite{background:#f7f7f7;color:#3d464d}.novo-chip.novo-color-offWhite>*{color:inherit}.novo-chip.novo-accent-offWhite{border:1px solid #f7f7f7;color:#f7f7f7}.novo-chip.novo-color-bright{background:#f7f7f7;color:#3d464d}.novo-chip.novo-color-bright>*{color:inherit}.novo-chip.novo-accent-bright{border:1px solid #f7f7f7;color:#f7f7f7}.novo-chip.novo-color-light{background:#dbdbdb;color:#3d464d}.novo-chip.novo-color-light>*{color:inherit}.novo-chip.novo-accent-light{border:1px solid #dbdbdb;color:#dbdbdb}.novo-chip.novo-color-neutral{background:#4f5361;color:#fff}.novo-chip.novo-color-neutral>*{color:inherit}.novo-chip.novo-accent-neutral{border:1px solid #4f5361;color:#4f5361}.novo-chip.novo-color-dark{background:#3d464d;color:#fff}.novo-chip.novo-color-dark>*{color:inherit}.novo-chip.novo-accent-dark{border:1px solid #3d464d;color:#3d464d}.novo-chip.novo-color-orange{background:#ff6900;color:#3d464d}.novo-chip.novo-color-orange>*{color:inherit}.novo-chip.novo-accent-orange{border:1px solid #ff6900;color:#ff6900}.novo-chip.novo-color-navigation{background:#202945;color:#fff}.novo-chip.novo-color-navigation>*{color:inherit}.novo-chip.novo-accent-navigation{border:1px solid #202945;color:#202945}.novo-chip.novo-color-skyBlue{background:#009bdf;color:#fff}.novo-chip.novo-color-skyBlue>*{color:inherit}.novo-chip.novo-accent-skyBlue{border:1px solid #009bdf;color:#009bdf}.novo-chip.novo-color-steel{background:#5b6770;color:#fff}.novo-chip.novo-color-steel>*{color:inherit}.novo-chip.novo-accent-steel{border:1px solid #5b6770;color:#5b6770}.novo-chip.novo-color-metal{background:#637893;color:#fff}.novo-chip.novo-color-metal>*{color:inherit}.novo-chip.novo-accent-metal{border:1px solid #637893;color:#637893}.novo-chip.novo-color-sand{background:#f4f4f4;color:#3d464d}.novo-chip.novo-color-sand>*{color:inherit}.novo-chip.novo-accent-sand{border:1px solid #f4f4f4;color:#f4f4f4}.novo-chip.novo-color-silver{background:#e2e2e2;color:#3d464d}.novo-chip.novo-color-silver>*{color:inherit}.novo-chip.novo-accent-silver{border:1px solid #e2e2e2;color:#e2e2e2}.novo-chip.novo-color-stone{background:#bebebe;color:#3d464d}.novo-chip.novo-color-stone>*{color:inherit}.novo-chip.novo-accent-stone{border:1px solid #bebebe;color:#bebebe}.novo-chip.novo-color-ash{background:#a0a0a0;color:#3d464d}.novo-chip.novo-color-ash>*{color:inherit}.novo-chip.novo-accent-ash{border:1px solid #a0a0a0;color:#a0a0a0}.novo-chip.novo-color-slate{background:#707070;color:#fff}.novo-chip.novo-color-slate>*{color:inherit}.novo-chip.novo-accent-slate{border:1px solid #707070;color:#707070}.novo-chip.novo-color-onyx{background:#526980;color:#fff}.novo-chip.novo-color-onyx>*{color:inherit}.novo-chip.novo-accent-onyx{border:1px solid #526980;color:#526980}.novo-chip.novo-color-charcoal{background:#282828;color:#fff}.novo-chip.novo-color-charcoal>*{color:inherit}.novo-chip.novo-accent-charcoal{border:1px solid #282828;color:#282828}.novo-chip.novo-color-moonlight{background:#1a242f;color:#fff}.novo-chip.novo-color-moonlight>*{color:inherit}.novo-chip.novo-accent-moonlight{border:1px solid #1a242f;color:#1a242f}.novo-chip.novo-color-midnight{background:#202945;color:#fff}.novo-chip.novo-color-midnight>*{color:inherit}.novo-chip.novo-accent-midnight{border:1px solid #202945;color:#202945}.novo-chip.novo-color-darkness{background:#161f27;color:#fff}.novo-chip.novo-color-darkness>*{color:inherit}.novo-chip.novo-accent-darkness{border:1px solid #161f27;color:#161f27}.novo-chip.novo-color-navy{background:#0d2d42;color:#fff}.novo-chip.novo-color-navy>*{color:inherit}.novo-chip.novo-accent-navy{border:1px solid #0d2d42;color:#0d2d42}.novo-chip.novo-color-aqua{background:#3bafda;color:#3d464d}.novo-chip.novo-color-aqua>*{color:inherit}.novo-chip.novo-accent-aqua{border:1px solid #3bafda;color:#3bafda}.novo-chip.novo-color-ocean{background:#4a89dc;color:#fff}.novo-chip.novo-color-ocean>*{color:inherit}.novo-chip.novo-accent-ocean{border:1px solid #4a89dc;color:#4a89dc}.novo-chip.novo-color-mint{background:#37bc9b;color:#3d464d}.novo-chip.novo-color-mint>*{color:inherit}.novo-chip.novo-accent-mint{border:1px solid #37bc9b;color:#37bc9b}.novo-chip.novo-color-grass{background:#8cc152;color:#fff}.novo-chip.novo-color-grass>*{color:inherit}.novo-chip.novo-accent-grass{border:1px solid #8cc152;color:#8cc152}.novo-chip.novo-color-sunflower{background:#f6b042;color:#fff}.novo-chip.novo-color-sunflower>*{color:inherit}.novo-chip.novo-accent-sunflower{border:1px solid #f6b042;color:#f6b042}.novo-chip.novo-color-bittersweet{background:#eb6845;color:#fff}.novo-chip.novo-color-bittersweet>*{color:inherit}.novo-chip.novo-accent-bittersweet{border:1px solid #eb6845;color:#eb6845}.novo-chip.novo-color-grapefruit{background:#da4453;color:#fff}.novo-chip.novo-color-grapefruit>*{color:inherit}.novo-chip.novo-accent-grapefruit{border:1px solid #da4453;color:#da4453}.novo-chip.novo-color-carnation{background:#d770ad;color:#fff}.novo-chip.novo-color-carnation>*{color:inherit}.novo-chip.novo-accent-carnation{border:1px solid #d770ad;color:#d770ad}.novo-chip.novo-color-lavender{background:#967adc;color:#fff}.novo-chip.novo-color-lavender>*{color:inherit}.novo-chip.novo-accent-lavender{border:1px solid #967adc;color:#967adc}.novo-chip.novo-color-mountain{background:#9678b6;color:#fff}.novo-chip.novo-color-mountain>*{color:inherit}.novo-chip.novo-accent-mountain{border:1px solid #9678b6;color:#9678b6}.novo-chip.novo-color-info{background:#4a89dc;color:#fff}.novo-chip.novo-color-info>*{color:inherit}.novo-chip.novo-accent-info{border:1px solid #4a89dc;color:#4a89dc}.novo-chip.novo-color-positive{background:#4a89dc;color:#fff}.novo-chip.novo-color-positive>*{color:inherit}.novo-chip.novo-accent-positive{border:1px solid #4a89dc;color:#4a89dc}.novo-chip.novo-color-success{background:#8cc152;color:#fff}.novo-chip.novo-color-success>*{color:inherit}.novo-chip.novo-accent-success{border:1px solid #8cc152;color:#8cc152}.novo-chip.novo-color-negative{background:#da4453;color:#fff}.novo-chip.novo-color-negative>*{color:inherit}.novo-chip.novo-accent-negative{border:1px solid #da4453;color:#da4453}.novo-chip.novo-color-danger{background:#da4453;color:#fff}.novo-chip.novo-color-danger>*{color:inherit}.novo-chip.novo-accent-danger{border:1px solid #da4453;color:#da4453}.novo-chip.novo-color-error{background:#da4453;color:#fff}.novo-chip.novo-color-error>*{color:inherit}.novo-chip.novo-accent-error{border:1px solid #da4453;color:#da4453}.novo-chip.novo-color-warning{background:#f6b042;color:#fff}.novo-chip.novo-color-warning>*{color:inherit}.novo-chip.novo-accent-warning{border:1px solid #f6b042;color:#f6b042}.novo-chip.novo-color-empty{background:#cccdcc;color:#3d464d}.novo-chip.novo-color-empty>*{color:inherit}.novo-chip.novo-accent-empty{border:1px solid #cccdcc;color:#cccdcc}.novo-chip.novo-color-disabled{background:#bebebe;color:#3d464d}.novo-chip.novo-color-disabled>*{color:inherit}.novo-chip.novo-accent-disabled{border:1px solid #bebebe;color:#bebebe}.novo-chip.novo-color-background{background:#f7f7f7;color:#3d464d}.novo-chip.novo-color-background>*{color:inherit}.novo-chip.novo-accent-background{border:1px solid #f7f7f7;color:#f7f7f7}.novo-chip.novo-color-backgroundDark{background:#e2e2e2;color:#3d464d}.novo-chip.novo-color-backgroundDark>*{color:inherit}.novo-chip.novo-accent-backgroundDark{border:1px solid #e2e2e2;color:#e2e2e2}.novo-chip.novo-color-presentation{background:#5b6770;color:#fff}.novo-chip.novo-color-presentation>*{color:inherit}.novo-chip.novo-accent-presentation{border:1px solid #5b6770;color:#5b6770}.novo-chip.novo-color-bullhorn{background:#ff6900;color:#3d464d}.novo-chip.novo-color-bullhorn>*{color:inherit}.novo-chip.novo-accent-bullhorn{border:1px solid #ff6900;color:#ff6900}.novo-chip.novo-color-pulse{background:#3bafda;color:#3d464d}.novo-chip.novo-color-pulse>*{color:inherit}.novo-chip.novo-accent-pulse{border:1px solid #3bafda;color:#3bafda}.novo-chip.novo-color-company{background:#39d;color:#fff}.novo-chip.novo-color-company>*{color:inherit}.novo-chip.novo-accent-company{border:1px solid #39d;color:#39d}.novo-chip.novo-color-candidate{background:#4b7;color:#fff}.novo-chip.novo-color-candidate>*{color:inherit}.novo-chip.novo-accent-candidate{border:1px solid #4b7;color:#4b7}.novo-chip.novo-color-lead{background:#a69;color:#fff}.novo-chip.novo-color-lead>*{color:inherit}.novo-chip.novo-accent-lead{border:1px solid #a69;color:#a69}.novo-chip.novo-color-contact{background:#fa4;color:#fff}.novo-chip.novo-color-contact>*{color:inherit}.novo-chip.novo-accent-contact{border:1px solid #fa4;color:#fa4}.novo-chip.novo-color-clientcontact{background:#fa4;color:#fff}.novo-chip.novo-color-clientcontact>*{color:inherit}.novo-chip.novo-accent-clientcontact{border:1px solid #fa4;color:#fa4}.novo-chip.novo-color-opportunity{background:#625;color:#fff}.novo-chip.novo-color-opportunity>*{color:inherit}.novo-chip.novo-accent-opportunity{border:1px solid #625;color:#625}.novo-chip.novo-color-job{background:#b56;color:#fff}.novo-chip.novo-color-job>*{color:inherit}.novo-chip.novo-accent-job{border:1px solid #b56;color:#b56}.novo-chip.novo-color-joborder{background:#b56;color:#fff}.novo-chip.novo-color-joborder>*{color:inherit}.novo-chip.novo-accent-joborder{border:1px solid #b56;color:#b56}.novo-chip.novo-color-submission{background:#a9adbb;color:#3d464d}.novo-chip.novo-color-submission>*{color:inherit}.novo-chip.novo-accent-submission{border:1px solid #a9adbb;color:#a9adbb}.novo-chip.novo-color-sendout{background:#747884;color:#fff}.novo-chip.novo-color-sendout>*{color:inherit}.novo-chip.novo-accent-sendout{border:1px solid #747884;color:#747884}.novo-chip.novo-color-placement{background:#0b344f;color:#fff}.novo-chip.novo-color-placement>*{color:inherit}.novo-chip.novo-accent-placement{border:1px solid #0b344f;color:#0b344f}.novo-chip.novo-color-note{background:#747884;color:#fff}.novo-chip.novo-color-note>*{color:inherit}.novo-chip.novo-accent-note{border:1px solid #747884;color:#747884}.novo-chip.novo-color-contract{background:#454ea0;color:#fff}.novo-chip.novo-color-contract>*{color:inherit}.novo-chip.novo-accent-contract{border:1px solid #454ea0;color:#454ea0}.novo-chip.novo-color-jobCode{background:#696d79;color:#fff}.novo-chip.novo-color-jobCode>*{color:inherit}.novo-chip.novo-accent-jobCode{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-earnCode{background:#696d79;color:#fff}.novo-chip.novo-color-earnCode>*{color:inherit}.novo-chip.novo-accent-earnCode{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-invoiceStatement{background:#696d79;color:#fff}.novo-chip.novo-color-invoiceStatement>*{color:inherit}.novo-chip.novo-accent-invoiceStatement{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-billableCharge{background:#696d79;color:#fff}.novo-chip.novo-color-billableCharge>*{color:inherit}.novo-chip.novo-accent-billableCharge{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-payableCharge{background:#696d79;color:#fff}.novo-chip.novo-color-payableCharge>*{color:inherit}.novo-chip.novo-accent-payableCharge{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-user{background:#696d79;color:#fff}.novo-chip.novo-color-user>*{color:inherit}.novo-chip.novo-accent-user{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-corporateUser{background:#696d79;color:#fff}.novo-chip.novo-color-corporateUser>*{color:inherit}.novo-chip.novo-accent-corporateUser{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-distributionList{background:#696d79;color:#fff}.novo-chip.novo-color-distributionList>*{color:inherit}.novo-chip.novo-accent-distributionList{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-credential{background:#696d79;color:#fff}.novo-chip.novo-color-credential>*{color:inherit}.novo-chip.novo-accent-credential{border:1px solid #696d79;color:#696d79}.novo-chip.novo-color-person{background:#696d79;color:#fff}.novo-chip.novo-color-person>*{color:inherit}.novo-chip.novo-accent-person{border:1px solid #696d79;color:#696d79}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jaGlwcy9DaGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBcUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFRcEksTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUErQixJQUFJLGNBQWMsQ0FBYSxlQUFlLENBQUMsQ0FBQztBQVF6RyxvRUFBb0U7QUFDcEUsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQztJQUNFLG9EQUFvRDtJQUM3QyxNQUF1QjtJQUM5QiwyREFBMkQ7SUFDcEQsUUFBaUI7SUFDeEIsdUVBQXVFO0lBQ2hFLGNBQWMsS0FBSztRQUpuQixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUV2QixhQUFRLEdB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TUFBTTtZQWJDLFFBQVE7WUFJZixpQkFBaUIsdUJBNFBkLFFBQVE7NENBRVIsTUFBTSxTQUFDLFFBQVE7eUNBQ2YsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7eUNBQ3hDLFNBQVMsU0FBQyxVQUFVOzs7cUJBbEd0QixZQUFZLFNBQUMsY0FBYzt5QkFHM0IsWUFBWSxTQUFDLGNBQWM7bUJBRTNCLEtBQUs7dUJBRUwsS0FBSztvQkFlTCxLQUFLO3lCQWVMLEtBQUs7dUJBVUwsS0FBSzt3QkFZTCxLQUFLOzhCQWdCTCxNQUFNO3dCQUdOLE1BQU07c0JBR04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5LCBOdW1iZXJJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQU5JTUFUSU9OX01PRFVMRV9UWVBFIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBDYW5TaXplQ3RvciwgSGFzVGFiSW5kZXgsIEhhc1RhYkluZGV4Q3RvciwgbWl4aW5Db2xvciwgbWl4aW5TaXplLCBtaXhpblRhYkluZGV4IH0gZnJvbSAnLi4vY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBJUmVtb3ZhYmxlIHtcbiAgcmVtb3ZlOiAoKSA9PiB2b2lkO1xuICByZW1vdmFibGU6IGJvb2xlYW47XG4gIGRpc2FibGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgUkVNT1ZBQkxFX1JFRjogSW5qZWN0aW9uVG9rZW48SVJlbW92YWJsZT4gPSBuZXcgSW5qZWN0aW9uVG9rZW48SVJlbW92YWJsZT4oJ1JFTU9WQUJMRV9SRUYnKTtcblxuLyoqIFJlcHJlc2VudHMgYW4gZXZlbnQgZmlyZWQgb24gYW4gaW5kaXZpZHVhbCBgbm92by1jaGlwYC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTm92b0NoaXBFdmVudCB7XG4gIC8qKiBUaGUgY2hpcCB0aGUgZXZlbnQgd2FzIGZpcmVkIG9uLiAqL1xuICBjaGlwOiBOb3ZvQ2hpcEVsZW1lbnQ7XG59XG5cbi8qKiBFdmVudCBvYmplY3QgZW1pdHRlZCBieSBOb3ZvQ2hpcCB3aGVuIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG5leHBvcnQgY2xhc3MgTm92b0NoaXBTZWxlY3Rpb25DaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjaGlwIHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTm92b0NoaXBFbGVtZW50LFxuICAgIC8qKiBXaGV0aGVyIHRoZSBjaGlwIHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQgaXMgc2VsZWN0ZWQuICovXG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuLFxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlIHdhcyBhIHJlc3VsdCBvZiBhIHVzZXIgaW50ZXJhY3Rpb24uICovXG4gICAgcHVibGljIGlzVXNlcklucHV0ID0gZmFsc2UsXG4gICkge31cbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBOb3ZvQ2hpcEVsZW1lbnQuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY2xhc3MgTm92b0NoaXBCYXNlIHtcbiAgLy8gYWJzdHJhY3QgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuY29uc3QgTm92b0NoaXBNaXhpbkJhc2U6IENhblNpemVDdG9yICYgQ2FuQ29sb3JDdG9yICYgSGFzVGFiSW5kZXhDdG9yICYgdHlwZW9mIE5vdm9DaGlwQmFzZSA9IG1peGluU2l6ZShcbiAgbWl4aW5UYWJJbmRleChtaXhpbkNvbG9yKE5vdm9DaGlwQmFzZSwgbnVsbCksIC0xKSxcbiAgJ21kJyxcbik7XG5cbi8qKlxuICogRHVtbXkgZGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3MgdG8gY2hpcCBhdmF0YXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25vdm8tY2hpcC1hdmF0YXIsIFtub3ZvQ2hpcEF2YXRhcl0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jaGlwLWF2YXRhcicgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NoaXBBdmF0YXIge31cblxuLyoqXG4gKiBBcHBsaWVzIHByb3BlciAoY2xpY2spIHN1cHBvcnQgYW5kIGFkZHMgc3R5bGluZyBmb3IgdXNlIHdpdGggQnVsbGhvcm4ncyBcInhcIiBpY29uICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIGA8bm92by1jaGlwPlxuICogICAgICAgPG5vdm8taWNvbiBub3ZvQ2hpcFJlbW92ZT54PC9ub3ZvLWljb24+XG4gKiAgICAgPC9ub3ZvLWNoaXA+YFxuICpcbiAqIFlvdSAqbWF5KiB1c2UgYSBjdXN0b20gaWNvbiwgYnV0IHlvdSBtYXkgbmVlZCB0byBvdmVycmlkZSB0aGUgYG5vdm8tY2hpcC1yZW1vdmVgIHBvc2l0aW9uaW5nXG4gKiBzdHlsZXMgdG8gcHJvcGVybHkgY2VudGVyIHRoZSBpY29uIHdpdGhpbiB0aGUgY2hpcC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9DaGlwUmVtb3ZlXScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tY2hpcC1yZW1vdmUnLFxuICAgICcoY2xpY2spJzogJ19oYW5kbGVDbGljaygkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NoaXBSZW1vdmUge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KFJFTU9WQUJMRV9SRUYpIHByaXZhdGUgX3BhcmVudENoaXA6IElSZW1vdmFibGUsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgaWYgKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENhbGxzIHRoZSBwYXJlbnQgY2hpcCdzIHB1YmxpYyBgcmVtb3ZlKClgIG1ldGhvZCBpZiBhcHBsaWNhYmxlLiAqL1xuICBfaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgcGFyZW50Q2hpcCA9IHRoaXMuX3BhcmVudENoaXA7XG4gICAgaWYgKHBhcmVudENoaXAucmVtb3ZhYmxlICYmICFwYXJlbnRDaGlwLmRpc2FibGVkKSB7XG4gICAgICBwYXJlbnRDaGlwLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gc3RvcCBldmVudCBwcm9wYWdhdGlvbiBiZWNhdXNlIG90aGVyd2lzZSB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gdGhlXG4gICAgLy8gZm9ybSBmaWVsZCBhbmQgY2F1c2UgdGhlIGBvbkNvbnRhaW5lckNsaWNrYCBtZXRob2QgdG8gYmUgaW52b2tlZC4gVGhpcyBtZXRob2Qgd291bGQgdGhlblxuICAgIC8vIHJlc2V0IHRoZSBmb2N1c2VkIGNoaXAgdGhhdCBoYXMgYmVlbiBmb2N1c2VkIGFmdGVyIGNoaXAgcmVtb3ZhbC4gVXN1YWxseSB0aGUgcGFyZW50XG4gICAgLy8gdGhlIHBhcmVudCBjbGljayBsaXN0ZW5lciBvZiB0aGUgYE5vdm9DaGlwYCB3b3VsZCBwcmV2ZW50IHByb3BhZ2F0aW9uLCBidXQgaXQgY2FuIGhhcHBlblxuICAgIC8vIHRoYXQgdGhlIGNoaXAgaXMgYmVpbmcgcmVtb3ZlZCBiZWZvcmUgdGhlIGV2ZW50IGJ1YmJsZXMgdXAuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGlwIGNvbXBvbmVudC4gVXNlZCBpbnNpZGUgdGhlIE5vdm9DaGlwTGlzdCBjb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYG5vdm8tY2hpcCwgW25vdm8tY2hpcF1gLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICBzdHlsZVVybHM6IFsnLi9DaGlwLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ3RhYkluZGV4JywgJ3NpemUnXSxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBSRU1PVkFCTEVfUkVGLCB1c2VFeGlzdGluZzogTm92b0NoaXBFbGVtZW50IH1dLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWNoaXAgbm92by1mb2N1cy1pbmRpY2F0b3InLFxuICAgIHJvbGU6ICdvcHRpb24nLFxuICAgICdbY2xhc3Mubm92by1jaGlwLXNlbGVjdGFibGVdJzogJ3NlbGVjdGFibGUnLFxuICAgICdbY2xhc3Mubm92by1jaGlwLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLWNoaXAtd2l0aC1hdmF0YXJdJzogJ2F2YXRhcicsXG4gICAgJ1tjbGFzcy5ub3ZvLWNoaXAtd2l0aC10cmFpbGluZy1pY29uXSc6ICdyZW1vdmVJY29uJyxcbiAgICAnW2NsYXNzLm5vdm8tY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuX25vdm8tYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uc0Rpc2FibGVkJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IHRhYkluZGV4JyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1zZWxlY3RlZF0nOiAnYXJpYVNlbGVjdGVkJyxcbiAgICAnKGNsaWNrKSc6ICdfaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgLy8gJyhtb3VzZWVudGVyKSc6ICdfaGFuZGxlQWN0aXZhdGUoJGV2ZW50KScsXG4gICAgLy8gJyhtb3VzZWxlYXZlKSc6ICdfaGFuZGxlRGVhY3RpdmF0ZSgkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ19oYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICcoYmx1ciknOiAnX2JsdXIoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGlwRWxlbWVudCBleHRlbmRzIE5vdm9DaGlwTWl4aW5CYXNlIGltcGxlbWVudHMgRm9jdXNhYmxlT3B0aW9uLCBPbkRlc3Ryb3ksIENhbkNvbG9yLCBIYXNUYWJJbmRleCB7XG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGhhcyBmb2N1cy4gKi9cbiAgX2hhc0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgYW5pbWF0aW9ucyBmb3IgdGhlIGNoaXAgYXJlIGVuYWJsZWQuICovXG4gIF9hbmltYXRpb25zRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgbGlzdCBpcyBzZWxlY3RhYmxlICovXG4gIF9jaGlwTGlzdFNlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGxpc3QgaXMgaW4gbXVsdGktc2VsZWN0aW9uIG1vZGUuICovXG4gIF9jaGlwTGlzdE11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgbGlzdCBhcyBhIHdob2xlIGlzIGRpc2FibGVkLiAqL1xuICBfY2hpcExpc3REaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgY2hpcCBhdmF0YXIgKi9cbiAgQENvbnRlbnRDaGlsZChOb3ZvQ2hpcEF2YXRhcikgYXZhdGFyOiBOb3ZvQ2hpcEF2YXRhcjtcblxuICAvKiogVGhlIGNoaXAncyByZW1vdmUgdG9nZ2xlci4gKi9cbiAgQENvbnRlbnRDaGlsZChOb3ZvQ2hpcFJlbW92ZSkgcmVtb3ZlSWNvbjogTm92b0NoaXBSZW1vdmU7XG5cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuICAvKiogV2hldGhlciB0aGUgY2hpcCBpcyBzZWxlY3RlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjb2VyY2VkVmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgaWYgKGNvZXJjZWRWYWx1ZSAhPT0gdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gY29lcmNlZFZhbHVlO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGNoaXAuIERlZmF1bHRzIHRvIHRoZSBjb250ZW50IGluc2lkZSBgPG5vdm8tY2hpcD5gIHRhZ3MuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5fdmFsdWUgOiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG4gIHByb3RlY3RlZCBfdmFsdWU6IGFueTtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIGNoaXAgaXMgc2VsZWN0YWJsZS4gV2hlbiBhIGNoaXAgaXMgbm90IHNlbGVjdGFibGUsXG4gICAqIGNoYW5nZXMgdG8gaXRzIHNlbGVjdGVkIHN0YXRlIGFyZSBhbHdheXMgaWdub3JlZC4gQnkgZGVmYXVsdCBhIGNoaXAgaXNcbiAgICogc2VsZWN0YWJsZSwgYW5kIGl0IGJlY29tZXMgbm9uLXNlbGVjdGFibGUgaWYgaXRzIHBhcmVudCBjaGlwIGxpc3QgaXNcbiAgICogbm90IHNlbGVjdGFibGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0YWJsZSAmJiB0aGlzLl9jaGlwTGlzdFNlbGVjdGFibGU7XG4gIH1cbiAgc2V0IHNlbGVjdGFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3RhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3NlbGVjdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGlwTGlzdERpc2FibGVkIHx8IHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGNoaXAgZGlzcGxheXMgdGhlIHJlbW92ZSBzdHlsaW5nIGFuZCBlbWl0cyAocmVtb3ZlZCkgZXZlbnRzLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVtb3ZhYmxlO1xuICB9XG4gIHNldCByZW1vdmFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZW1vdmFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY2hpcCBpcyBmb2N1c2VkLiAqL1xuICByZWFkb25seSBfb25Gb2N1cyA9IG5ldyBTdWJqZWN0PE5vdm9DaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgYmx1cmVkLiAqL1xuICByZWFkb25seSBfb25CbHVyID0gbmV3IFN1YmplY3Q8Tm92b0NoaXBFdmVudD4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSBjaGlwIGlzIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOb3ZvQ2hpcFNlbGVjdGlvbkNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9DaGlwU2VsZWN0aW9uQ2hhbmdlPigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIGNoaXAgaXMgZGVzdHJveWVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZGVzdHJveWVkOiBFdmVudEVtaXR0ZXI8Tm92b0NoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9DaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiBhIGNoaXAgaXMgdG8gYmUgcmVtb3ZlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJlbW92ZWQ6IEV2ZW50RW1pdHRlcjxOb3ZvQ2hpcEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b0NoaXBFdmVudD4oKTtcblxuICAvKiogVGhlIEFSSUEgc2VsZWN0ZWQgYXBwbGllZCB0byB0aGUgY2hpcC4gKi9cbiAgZ2V0IGFyaWFTZWxlY3RlZCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAvLyBSZW1vdmUgdGhlIGBhcmlhLXNlbGVjdGVkYCB3aGVuIHRoZSBjaGlwIGlzIGRlc2VsZWN0ZWQgaW4gc2luZ2xlLXNlbGVjdGlvbiBtb2RlLCBiZWNhdXNlXG4gICAgLy8gaXQgYWRkcyBub2lzZSB0byBOVkRBIHVzZXJzIHdoZXJlIFwibm90IHNlbGVjdGVkXCIgd2lsbCBiZSByZWFkIG91dCBmb3IgZWFjaCBjaGlwLlxuICAgIHJldHVybiB0aGlzLnNlbGVjdGFibGUgJiYgKHRoaXMuX2NoaXBMaXN0TXVsdGlwbGUgfHwgdGhpcy5zZWxlY3RlZCkgPyB0aGlzLnNlbGVjdGVkLnRvU3RyaW5nKCkgOiBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleD86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgdGhpcy50YWJJbmRleCA9IHRhYkluZGV4ICE9IG51bGwgPyBwYXJzZUludCh0YWJJbmRleCwgMTApIHx8IC0xIDogLTE7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5lbWl0KHsgY2hpcDogdGhpcyB9KTtcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIHRoZSBjaGlwLiAqL1xuICBzZWxlY3QoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEZXNlbGVjdHMgdGhlIGNoaXAuICovXG4gIGRlc2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogU2VsZWN0IHRoaXMgY2hpcCBhbmQgZW1pdCBzZWxlY3RlZCBldmVudCAqL1xuICBzZWxlY3RWaWFJbnRlcmFjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG4gICAgICB0aGlzLl9kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSh0cnVlKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBjdXJyZW50IHNlbGVjdGVkIHN0YXRlIG9mIHRoaXMgY2hpcC4gKi9cbiAgdG9nZ2xlU2VsZWN0ZWQoaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgdGhpcy5fZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgLyoqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBjaGlwLiAqL1xuICBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2hhc0ZvY3VzKSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMuX29uRm9jdXMubmV4dCh7IGNoaXA6IHRoaXMgfSk7XG4gICAgfVxuICAgIHRoaXMuX2hhc0ZvY3VzID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyByZW1vdmFsIG9mIHRoZSBjaGlwLiBDYWxsZWQgYnkgdGhlIE5vdm9DaGlwTGlzdCB3aGVuIHRoZSBERUxFVEUgb3JcbiAgICogQkFDS1NQQUNFIGtleXMgYXJlIHByZXNzZWQuXG4gICAqXG4gICAqIEluZm9ybXMgYW55IGxpc3RlbmVycyBvZiB0aGUgcmVtb3ZhbCByZXF1ZXN0LiBEb2VzIG5vdCByZW1vdmUgdGhlIGNoaXAgZnJvbSB0aGUgRE9NLlxuICAgKi9cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlbW92YWJsZSkge1xuICAgICAgdGhpcy5yZW1vdmVkLmVtaXQoeyBjaGlwOiB0aGlzIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGNsaWNrIGV2ZW50cyBvbiB0aGUgY2hpcC4gKi9cbiAgX2hhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVTZWxlY3RlZCh0cnVlKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGUgY3VzdG9tIGtleSBwcmVzc2VzLiAqL1xuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgIGNhc2UgS2V5LkRlbGV0ZTpcbiAgICAgIGNhc2UgS2V5LkJhY2tzcGFjZTpcbiAgICAgICAgLy8gSWYgd2UgYXJlIHJlbW92YWJsZSwgcmVtb3ZlIHRoZSBmb2N1c2VkIGNoaXBcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgLy8gQWx3YXlzIHByZXZlbnQgc28gcGFnZSBuYXZpZ2F0aW9uIGRvZXMgbm90IG9jY3VyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuU3BhY2U6XG4gICAgICAgIC8vIElmIHdlIGFyZSBzZWxlY3RhYmxlLCB0b2dnbGUgdGhlIGZvY3VzZWQgY2hpcFxuICAgICAgICBpZiAodGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBbHdheXMgcHJldmVudCBzcGFjZSBmcm9tIHNjcm9sbGluZyB0aGUgcGFnZSBzaW5jZSB0aGUgbGlzdCBoYXMgZm9jdXNcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgX2JsdXIoKTogdm9pZCB7XG4gICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIGNoaXAgZnJvbSB0aGUgRE9NIGEgbGl0dGxlXG4gICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIGNoaXAgbGlzdFxuICAgIC8vIHRoYXQgbW92ZXMgZm9jdXMgbm90IHRoZSBuZXh0IGl0ZW0uIFRvIHdvcmsgYXJvdW5kIHRoZSBpc3N1ZSwgd2UgZGVmZXIgbWFya2luZyB0aGUgY2hpcFxuICAgIC8vIGFzIG5vdCBmb2N1c2VkIHVudGlsIHRoZSBuZXh0IHRpbWUgdGhlIHpvbmUgc3RhYmlsaXplcy5cbiAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX29uQmx1ci5uZXh0KHsgY2hpcDogdGhpcyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQgPSBmYWxzZSkge1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgaXNVc2VySW5wdXQsXG4gICAgICBzZWxlY3RlZDogdGhpcy5fc2VsZWN0ZWQsXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0ZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3NlbGVjdGFibGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlbW92YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RhYkluZGV4OiBOdW1iZXJJbnB1dDtcbn1cbiJdfQ==