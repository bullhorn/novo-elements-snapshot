import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation, } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoOptgroup, NovoOptgroupBase, NOVO_OPTGROUP } from './optgroup.component';
import { NOVO_OPTION_PARENT_COMPONENT } from './option-parent';
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;
/** Event object emitted by NovoOption when selected or deselected. */
export class NovoOptionSelectionChange {
    constructor(
    /** Reference to the option that emitted the event. */
    source, 
    /** Whether the change in the option's value was a result of a user action. */
    isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
export class NovoOptionBase {
    constructor(_element, _changeDetectorRef, _parent, group) {
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this._parent = _parent;
        this.group = group;
        this._selected = false;
        this._active = false;
        this._disabled = false;
        this._mostRecentViewValue = '';
        /** TODOL deprecate maybe, check support for table headers */
        this.keepOpen = false;
        /** The unique ID of the option. */
        this.id = `novo-option-${_uniqueIdCounter++}`;
        /** Event emitted when the option is selected or deselected. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new EventEmitter();
        /** Emits when the state of the option changes and any parents have to be notified. */
        this._stateChanges = new Subject();
        this._element.nativeElement.addEventListener('click', this._handleDisabledClick, false);
    }
    /** If there is no parent then nothing is managing the selection. */
    get selectable() {
        return this._parent;
    }
    /** Whether the wrapping component is in multiple selection mode. */
    get multiple() {
        return this._parent && this._parent.multiple;
    }
    /** Whether or not the option is currently selected. */
    get selected() {
        return this._selected;
    }
    /** Whether the option is disabled. */
    get disabled() {
        return (this.group && this.group.disabled) || this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active() {
        return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
        return (this._getHostElement().textContent || '').trim();
    }
    /** Selects the option. */
    select() {
        if (!this._selected) {
            this._selected = true;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent();
        }
    }
    /** Deselects the option. */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent();
        }
    }
    /** Sets focus onto this option. */
    focus(_origin, options) {
        // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
        // use `NovoOption` in a `FocusKeyManager` and we need it to match `FocusableOption`.
        const element = this._getHostElement();
        if (typeof element.focus === 'function') {
            element.focus(options);
        }
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel() {
        return this.viewValue;
    }
    _handleDisabledClick(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    }
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event) {
        if ((event.key === "Enter" /* Enter */ || event.key === " " /* Space */) && !hasModifierKey(event)) {
            this._selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    }
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    _selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent(true);
        }
    }
    /**
     * Force a click event
     */
    _clickViaInteraction() {
        if (!this.disabled) {
            this._element.nativeElement.click();
        }
    }
    /**
     * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
     * attribute from single-selection, unselected options. Including the `aria-selected="false"`
     * attributes adds a significant amount of noise to screen-reader users without providing useful
     * information.
     */
    _getAriaSelected() {
        return this.selected || (this.multiple ? false : null);
    }
    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /** Gets the host DOM element. */
    _getHostElement() {
        return this._element.nativeElement;
    }
    ngAfterViewChecked() {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `novo-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            const viewValue = this.viewValue;
            if (viewValue !== this._mostRecentViewValue) {
                this._mostRecentViewValue = viewValue;
                this._stateChanges.next();
            }
        }
    }
    ngOnDestroy() {
        this._stateChanges.complete();
        this._element.nativeElement.removeEventListener('click', this._handleDisabledClick, false);
    }
    /** Emits the selection change event. */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new NovoOptionSelectionChange(this, isUserInput));
    }
}
NovoOptionBase.decorators = [
    { type: Directive }
];
NovoOptionBase.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NOVO_OPTION_PARENT_COMPONENT,] }] },
    { type: NovoOptgroupBase, decorators: [{ type: Optional }, { type: Inject, args: [NOVO_OPTGROUP,] }] }
];
NovoOptionBase.propDecorators = {
    keepOpen: [{ type: Input }],
    value: [{ type: Input }],
    id: [{ type: Input }],
    disabled: [{ type: Input }],
    onSelectionChange: [{ type: Output }]
};
/**
 * Single option inside of a `<novo-select>` element.
 */
export class NovoOption extends NovoOptionBase {
    constructor(element, changeDetectorRef, parent, group) {
        super(element, changeDetectorRef, parent, group);
    }
}
NovoOption.decorators = [
    { type: Component, args: [{
                selector: 'novo-option',
                exportAs: 'novoOption',
                host: {
                    role: 'option',
                    '[id]': 'id',
                    '[attr.tabindex]': '_getTabIndex()',
                    '[attr.aria-selected]': '_getAriaSelected()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[class.novo-active]': 'active',
                    '[class.novo-selected]': 'selected',
                    '[class.novo-option-multiple]': 'multiple',
                    '[class.novo-option-disabled]': 'disabled',
                    '(click)': '_selectViaInteraction()',
                    '(keydown)': '_handleKeydown($event)',
                    class: 'novo-option novo-focus-indicator',
                },
                template: "<novo-pseudo-checkbox *ngIf=\"selectable && multiple\" class=\"novo-option-pseudo-checkbox\"\n  [state]=\"selected ? 'checked' : 'unchecked'\" [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<span class=\"novo-option-text\">\n  <ng-content></ng-content>\n</span>\n\n<novo-pseudo-checkbox *ngIf=\"selectable && !multiple && selected\" class=\"novo-option-pseudo-checkbox\" state=\"checked\"\n  shape=\"line\"\n  [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<!-- See a11y notes inside optgroup.ts for context behind this element. -->\n<span class=\"cdk-visually-hidden\" *ngIf=\"group && group._inert\">({{ group.label }})</span>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-option{-webkit-tap-highlight-color:transparent;align-items:center;box-sizing:border-box;color:inherit;cursor:pointer;display:inline;display:flex;flex:1;flex-direction:row;font-size:1.2rem;font-weight:400;gap:1rem;margin:0;max-width:100%;outline:none;padding:1rem 1rem 1rem 1.6rem;position:relative}.novo-option:hover{background:var(--background-main,rgba(74,137,220,.1));color:var(--text-bright,#3d464d)}.novo-option.novo-active,.novo-option:active{background:rgba(74,137,220,.3)}.novo-option.novo-selected{color:#4a89dc}.novo-option.disabled,.novo-option[aria-disabled=true]{color:#bebebe;cursor:not-allowed}.novo-option.disabled:hover,.novo-option[aria-disabled=true]:hover{background:rgba(218,68,83,.1)}.novo-optgroup .novo-option:not(.novo-option-multiple){padding-left:1rem}[dir=rtl] .novo-optgroup .novo-option:not(.novo-option-multiple){padding-left:.5rem;padding-right:1rem}.novo-option.novo-accent-black{border-left:4px solid #000}.novo-option.novo-fill-black{background:#000;color:#fff}.novo-option.novo-fill-black:focus,.novo-option.novo-fill-black:hover{background:#333}.novo-option.novo-fill-black:active{background:#000}.novo-option.novo-accent-white{border-left:4px solid #fff}.novo-option.novo-fill-white{background:#fff;color:#000}.novo-option.novo-fill-white:focus,.novo-option.novo-fill-white:hover{background:#fff}.novo-option.novo-fill-white:active{background:#ccc}.novo-option.novo-accent-gray{border-left:4px solid #9e9e9e}.novo-option.novo-fill-gray{background:#9e9e9e;color:#000}.novo-option.novo-fill-gray:focus,.novo-option.novo-fill-gray:hover{background:#d1d1d1}.novo-option.novo-fill-gray:active{background:#6b6b6b}.novo-option.novo-accent-grey{border-left:4px solid #9e9e9e}.novo-option.novo-fill-grey{background:#9e9e9e;color:#000}.novo-option.novo-fill-grey:focus,.novo-option.novo-fill-grey:hover{background:#d1d1d1}.novo-option.novo-fill-grey:active{background:#6b6b6b}.novo-option.novo-accent-offWhite{border-left:4px solid #f7f7f7}.novo-option.novo-fill-offWhite{background:#f7f7f7;color:#000}.novo-option.novo-fill-offWhite:focus,.novo-option.novo-fill-offWhite:hover{background:#fff}.novo-option.novo-fill-offWhite:active{background:#c4c4c4}.novo-option.novo-accent-bright{border-left:4px solid #f7f7f7}.novo-option.novo-fill-bright{background:#f7f7f7;color:#000}.novo-option.novo-fill-bright:focus,.novo-option.novo-fill-bright:hover{background:#fff}.novo-option.novo-fill-bright:active{background:#c4c4c4}.novo-option.novo-accent-light{border-left:4px solid #dbdbdb}.novo-option.novo-fill-light{background:#dbdbdb;color:#000}.novo-option.novo-fill-light:focus,.novo-option.novo-fill-light:hover{background:#fff}.novo-option.novo-fill-light:active{background:#a8a8a8}.novo-option.novo-accent-neutral{border-left:4px solid #4f5361}.novo-option.novo-fill-neutral{background:#4f5361;color:#fff}.novo-option.novo-fill-neutral:focus,.novo-option.novo-fill-neutral:hover{background:#7f8497}.novo-option.novo-fill-neutral:active{background:#212329}.novo-option.novo-accent-dark{border-left:4px solid #3d464d}.novo-option.novo-fill-dark{background:#3d464d;color:#fff}.novo-option.novo-fill-dark:focus,.novo-option.novo-fill-dark:hover{background:#6a7a86}.novo-option.novo-fill-dark:active{background:#101214}.novo-option.novo-accent-orange{border-left:4px solid #ff6900}.novo-option.novo-fill-orange{background:#ff6900;color:#000}.novo-option.novo-fill-orange:focus,.novo-option.novo-fill-orange:hover{background:#ffa566}.novo-option.novo-fill-orange:active{background:#993f00}.novo-option.novo-accent-navigation{border-left:4px solid #202b38}.novo-option.novo-fill-navigation{background:#202b38;color:#fff}.novo-option.novo-fill-navigation:focus,.novo-option.novo-fill-navigation:hover{background:#455d79}.novo-option.novo-fill-navigation:active{background:#000}.novo-option.novo-accent-skyBlue{border-left:4px solid #009bdf}.novo-option.novo-fill-skyBlue{background:#009bdf;color:#fff}.novo-option.novo-fill-skyBlue:focus,.novo-option.novo-fill-skyBlue:hover{background:#46c7ff}.novo-option.novo-fill-skyBlue:active{background:#005479}.novo-option.novo-accent-steel{border-left:4px solid #5b6770}.novo-option.novo-fill-steel{background:#5b6770;color:#fff}.novo-option.novo-fill-steel:focus,.novo-option.novo-fill-steel:hover{background:#8e9aa3}.novo-option.novo-fill-steel:active{background:#2d3338}.novo-option.novo-accent-metal{border-left:4px solid #637893}.novo-option.novo-fill-metal{background:#637893;color:#fff}.novo-option.novo-fill-metal:focus,.novo-option.novo-fill-metal:hover{background:#9eacbe}.novo-option.novo-fill-metal:active{background:#3a4656}.novo-option.novo-accent-sand{border-left:4px solid #f4f4f4}.novo-option.novo-fill-sand{background:#f4f4f4;color:#000}.novo-option.novo-fill-sand:focus,.novo-option.novo-fill-sand:hover{background:#fff}.novo-option.novo-fill-sand:active{background:#c1c1c1}.novo-option.novo-accent-silver{border-left:4px solid #e2e2e2}.novo-option.novo-fill-silver{background:#e2e2e2;color:#000}.novo-option.novo-fill-silver:focus,.novo-option.novo-fill-silver:hover{background:#fff}.novo-option.novo-fill-silver:active{background:#afafaf}.novo-option.novo-accent-stone{border-left:4px solid #bebebe}.novo-option.novo-fill-stone{background:#bebebe;color:#000}.novo-option.novo-fill-stone:focus,.novo-option.novo-fill-stone:hover{background:#f1f1f1}.novo-option.novo-fill-stone:active{background:#8b8b8b}.novo-option.novo-accent-ash{border-left:4px solid #a0a0a0}.novo-option.novo-fill-ash{background:#a0a0a0;color:#000}.novo-option.novo-fill-ash:focus,.novo-option.novo-fill-ash:hover{background:#d3d3d3}.novo-option.novo-fill-ash:active{background:#6d6d6d}.novo-option.novo-accent-slate{border-left:4px solid #707070}.novo-option.novo-fill-slate{background:#707070;color:#fff}.novo-option.novo-fill-slate:focus,.novo-option.novo-fill-slate:hover{background:#a3a3a3}.novo-option.novo-fill-slate:active{background:#3d3d3d}.novo-option.novo-accent-onyx{border-left:4px solid #526980}.novo-option.novo-fill-onyx{background:#526980;color:#fff}.novo-option.novo-fill-onyx:focus,.novo-option.novo-fill-onyx:hover{background:#869cb2}.novo-option.novo-fill-onyx:active{background:#2a3642}.novo-option.novo-accent-charcoal{border-left:4px solid #282828}.novo-option.novo-fill-charcoal{background:#282828;color:#fff}.novo-option.novo-fill-charcoal:focus,.novo-option.novo-fill-charcoal:hover{background:#5b5b5b}.novo-option.novo-fill-charcoal:active{background:#000}.novo-option.novo-accent-moonlight{border-left:4px solid #1a242f}.novo-option.novo-fill-moonlight{background:#1a242f;color:#fff}.novo-option.novo-fill-moonlight:focus,.novo-option.novo-fill-moonlight:hover{background:#3e5671}.novo-option.novo-fill-moonlight:active{background:#000}.novo-option.novo-accent-midnight{border-left:4px solid #202b38}.novo-option.novo-fill-midnight{background:#202b38;color:#fff}.novo-option.novo-fill-midnight:focus,.novo-option.novo-fill-midnight:hover{background:#455d79}.novo-option.novo-fill-midnight:active{background:#000}.novo-option.novo-accent-darkness{border-left:4px solid #161f27}.novo-option.novo-fill-darkness{background:#161f27;color:#fff}.novo-option.novo-fill-darkness:focus,.novo-option.novo-fill-darkness:hover{background:#3b5368}.novo-option.novo-fill-darkness:active{background:#000}.novo-option.novo-accent-navy{border-left:4px solid #0d2d42}.novo-option.novo-fill-navy{background:#0d2d42;color:#fff}.novo-option.novo-fill-navy:focus,.novo-option.novo-fill-navy:hover{background:#1e6797}.novo-option.novo-fill-navy:active{background:#000}.novo-option.novo-accent-aqua{border-left:4px solid #3bafda}.novo-option.novo-fill-aqua{background:#3bafda;color:#000}.novo-option.novo-fill-aqua:focus,.novo-option.novo-fill-aqua:hover{background:#91d2ea}.novo-option.novo-fill-aqua:active{background:#1c7393}.novo-option.novo-accent-ocean{border-left:4px solid #4a89dc}.novo-option.novo-fill-ocean{background:#4a89dc;color:#fff}.novo-option.novo-fill-ocean:focus,.novo-option.novo-fill-ocean:hover{background:#9fc1ed}.novo-option.novo-fill-ocean:active{background:#1f57a1}.novo-option.novo-accent-mint{border-left:4px solid #37bc9b}.novo-option.novo-fill-mint{background:#37bc9b;color:#000}.novo-option.novo-fill-mint:focus,.novo-option.novo-fill-mint:hover{background:#7fdac3}.novo-option.novo-fill-mint:active{background:#206d5a}.novo-option.novo-accent-grass{border-left:4px solid #8cc152}.novo-option.novo-fill-grass{background:#8cc152;color:#000}.novo-option.novo-fill-grass:focus,.novo-option.novo-fill-grass:hover{background:#bedc9d}.novo-option.novo-fill-grass:active{background:#587f2e}.novo-option.novo-accent-sunflower{border-left:4px solid #f6b042}.novo-option.novo-fill-sunflower{background:#f6b042;color:#000}.novo-option.novo-fill-sunflower:focus,.novo-option.novo-fill-sunflower:hover{background:#fbd9a3}.novo-option.novo-fill-sunflower:active{background:#c87e0a}.novo-option.novo-accent-bittersweet{border-left:4px solid #eb6845}.novo-option.novo-fill-bittersweet{background:#eb6845;color:#fff}.novo-option.novo-fill-bittersweet:focus,.novo-option.novo-fill-bittersweet:hover{background:#f5b3a1}.novo-option.novo-fill-bittersweet:active{background:#b63614}.novo-option.novo-accent-grapefruit{border-left:4px solid #da4453}.novo-option.novo-fill-grapefruit{background:#da4453;color:#fff}.novo-option.novo-fill-grapefruit:focus,.novo-option.novo-fill-grapefruit:hover{background:#eb99a1}.novo-option.novo-fill-grapefruit:active{background:#9a1e2b}.novo-option.novo-accent-carnation{border-left:4px solid #d770ad}.novo-option.novo-fill-carnation{background:#d770ad;color:#fff}.novo-option.novo-fill-carnation:focus,.novo-option.novo-fill-carnation:hover{background:#edc0db}.novo-option.novo-fill-carnation:active{background:#b0317c}.novo-option.novo-accent-lavender{border-left:4px solid #967adc}.novo-option.novo-fill-lavender{background:#967adc;color:#fff}.novo-option.novo-fill-lavender:focus,.novo-option.novo-fill-lavender:hover{background:#d6cbf1}.novo-option.novo-fill-lavender:active{background:#5a32be}.novo-option.novo-accent-mountain{border-left:4px solid #9678b6}.novo-option.novo-fill-mountain{background:#9678b6;color:#fff}.novo-option.novo-fill-mountain:focus,.novo-option.novo-fill-mountain:hover{background:#c9bada}.novo-option.novo-fill-mountain:active{background:#634682}.novo-option.novo-accent-positive{border-left:4px solid #4a89dc}.novo-option.novo-fill-positive{background:#4a89dc;color:#fff}.novo-option.novo-fill-positive:focus,.novo-option.novo-fill-positive:hover{background:#9fc1ed}.novo-option.novo-fill-positive:active{background:#1f57a1}.novo-option.novo-accent-success{border-left:4px solid #8cc152}.novo-option.novo-fill-success{background:#8cc152;color:#000}.novo-option.novo-fill-success:focus,.novo-option.novo-fill-success:hover{background:#bedc9d}.novo-option.novo-fill-success:active{background:#587f2e}.novo-option.novo-accent-negative{border-left:4px solid #da4453}.novo-option.novo-fill-negative{background:#da4453;color:#fff}.novo-option.novo-fill-negative:focus,.novo-option.novo-fill-negative:hover{background:#eb99a1}.novo-option.novo-fill-negative:active{background:#9a1e2b}.novo-option.novo-accent-warning{border-left:4px solid #f6b042}.novo-option.novo-fill-warning{background:#f6b042;color:#000}.novo-option.novo-fill-warning:focus,.novo-option.novo-fill-warning:hover{background:#fbd9a3}.novo-option.novo-fill-warning:active{background:#c87e0a}.novo-option.novo-accent-empty{border-left:4px solid #cccdcc}.novo-option.novo-fill-empty{background:#cccdcc;color:#000}.novo-option.novo-fill-empty:focus,.novo-option.novo-fill-empty:hover{background:#fff}.novo-option.novo-fill-empty:active{background:#989b98}.novo-option.novo-accent-disabled{border-left:4px solid #bebebe}.novo-option.novo-fill-disabled{background:#bebebe;color:#000}.novo-option.novo-fill-disabled:focus,.novo-option.novo-fill-disabled:hover{background:#f1f1f1}.novo-option.novo-fill-disabled:active{background:#8b8b8b}.novo-option.novo-accent-background{border-left:4px solid #f7f7f7}.novo-option.novo-fill-background{background:#f7f7f7;color:#000}.novo-option.novo-fill-background:focus,.novo-option.novo-fill-background:hover{background:#fff}.novo-option.novo-fill-background:active{background:#c4c4c4}.novo-option.novo-accent-backgroundDark{border-left:4px solid #e2e2e2}.novo-option.novo-fill-backgroundDark{background:#e2e2e2;color:#000}.novo-option.novo-fill-backgroundDark:focus,.novo-option.novo-fill-backgroundDark:hover{background:#fff}.novo-option.novo-fill-backgroundDark:active{background:#afafaf}.novo-option.novo-accent-presentation{border-left:4px solid #5b6770}.novo-option.novo-fill-presentation{background:#5b6770;color:#fff}.novo-option.novo-fill-presentation:focus,.novo-option.novo-fill-presentation:hover{background:#8e9aa3}.novo-option.novo-fill-presentation:active{background:#2d3338}.novo-option.novo-accent-bullhorn{border-left:4px solid #ff6900}.novo-option.novo-fill-bullhorn{background:#ff6900;color:#000}.novo-option.novo-fill-bullhorn:focus,.novo-option.novo-fill-bullhorn:hover{background:#ffa566}.novo-option.novo-fill-bullhorn:active{background:#993f00}.novo-option.novo-accent-pulse{border-left:4px solid #3bafda}.novo-option.novo-fill-pulse{background:#3bafda;color:#000}.novo-option.novo-fill-pulse:focus,.novo-option.novo-fill-pulse:hover{background:#91d2ea}.novo-option.novo-fill-pulse:active{background:#1c7393}.novo-option.novo-accent-company{border-left:4px solid #39d}.novo-option.novo-fill-company{background:#39d;color:#fff}.novo-option.novo-fill-company:focus,.novo-option.novo-fill-company:hover{background:#8ac5ec}.novo-option.novo-fill-company:active{background:#186192}.novo-option.novo-accent-candidate{border-left:4px solid #4b7}.novo-option.novo-fill-candidate{background:#4b7;color:#000}.novo-option.novo-fill-candidate:focus,.novo-option.novo-fill-candidate:hover{background:#8fd6ad}.novo-option.novo-fill-candidate:active{background:#297047}.novo-option.novo-accent-lead{border-left:4px solid #a69}.novo-option.novo-fill-lead{background:#a69;color:#fff}.novo-option.novo-fill-lead:focus,.novo-option.novo-fill-lead:hover{background:#cea8c5}.novo-option.novo-fill-lead:active{background:#6d3d61}.novo-option.novo-accent-contact{border-left:4px solid #fa4}.novo-option.novo-fill-contact{background:#fa4;color:#000}.novo-option.novo-fill-contact:focus,.novo-option.novo-fill-contact:hover{background:#ffd8aa}.novo-option.novo-fill-contact:active{background:#dd7900}.novo-option.novo-accent-opportunity{border-left:4px solid #625}.novo-option.novo-fill-opportunity{background:#625;color:#fff}.novo-option.novo-fill-opportunity:focus,.novo-option.novo-fill-opportunity:hover{background:#b33b95}.novo-option.novo-fill-opportunity:active{background:#190815}.novo-option.novo-accent-job{border-left:4px solid #b56}.novo-option.novo-fill-job{background:#b56;color:#fff}.novo-option.novo-fill-job:focus,.novo-option.novo-fill-job:hover{background:#d89ea8}.novo-option.novo-fill-job:active{background:#79313d}.novo-option.novo-accent-submission{border-left:4px solid #a9adbb}.novo-option.novo-fill-submission{background:#a9adbb;color:#000}.novo-option.novo-fill-submission:focus,.novo-option.novo-fill-submission:hover{background:#e2e3e8}.novo-option.novo-fill-submission:active{background:#70778e}.novo-option.novo-accent-sendout{border-left:4px solid #747884}.novo-option.novo-fill-sendout{background:#747884;color:#fff}.novo-option.novo-fill-sendout:focus,.novo-option.novo-fill-sendout:hover{background:#aaacb4}.novo-option.novo-fill-sendout:active{background:#44474e}.novo-option.novo-accent-placement{border-left:4px solid #0b344f}.novo-option.novo-fill-placement{background:#0b344f;color:#fff}.novo-option.novo-fill-placement:focus,.novo-option.novo-fill-placement:hover{background:#176fa9}.novo-option.novo-fill-placement:active{background:#000}.novo-option.novo-accent-note{border-left:4px solid #747884}.novo-option.novo-fill-note{background:#747884;color:#fff}.novo-option.novo-fill-note:focus,.novo-option.novo-fill-note:hover{background:#aaacb4}.novo-option.novo-fill-note:active{background:#44474e}.novo-option.novo-accent-contract{border-left:4px solid #454ea0}.novo-option.novo-fill-contract{background:#454ea0;color:#fff}.novo-option.novo-fill-contract:focus,.novo-option.novo-fill-contract:hover{background:#8289c9}.novo-option.novo-fill-contract:active{background:#262b59}.novo-option.novo-accent-jobCode{border-left:4px solid #696d79}.novo-option.novo-fill-jobCode{background:#696d79;color:#fff}.novo-option.novo-fill-jobCode:focus,.novo-option.novo-fill-jobCode:hover{background:#9ea1aa}.novo-option.novo-fill-jobCode:active{background:#3a3c42}.novo-option.novo-accent-earnCode{border-left:4px solid #696d79}.novo-option.novo-fill-earnCode{background:#696d79;color:#fff}.novo-option.novo-fill-earnCode:focus,.novo-option.novo-fill-earnCode:hover{background:#9ea1aa}.novo-option.novo-fill-earnCode:active{background:#3a3c42}.novo-option.novo-accent-invoiceStatement{border-left:4px solid #696d79}.novo-option.novo-fill-invoiceStatement{background:#696d79;color:#fff}.novo-option.novo-fill-invoiceStatement:focus,.novo-option.novo-fill-invoiceStatement:hover{background:#9ea1aa}.novo-option.novo-fill-invoiceStatement:active{background:#3a3c42}.novo-option.novo-accent-billableCharge{border-left:4px solid #696d79}.novo-option.novo-fill-billableCharge{background:#696d79;color:#fff}.novo-option.novo-fill-billableCharge:focus,.novo-option.novo-fill-billableCharge:hover{background:#9ea1aa}.novo-option.novo-fill-billableCharge:active{background:#3a3c42}.novo-option.novo-accent-payableCharge{border-left:4px solid #696d79}.novo-option.novo-fill-payableCharge{background:#696d79;color:#fff}.novo-option.novo-fill-payableCharge:focus,.novo-option.novo-fill-payableCharge:hover{background:#9ea1aa}.novo-option.novo-fill-payableCharge:active{background:#3a3c42}.novo-option.novo-accent-user{border-left:4px solid #696d79}.novo-option.novo-fill-user{background:#696d79;color:#fff}.novo-option.novo-fill-user:focus,.novo-option.novo-fill-user:hover{background:#9ea1aa}.novo-option.novo-fill-user:active{background:#3a3c42}.novo-option.novo-accent-corporateUser{border-left:4px solid #696d79}.novo-option.novo-fill-corporateUser{background:#696d79;color:#fff}.novo-option.novo-fill-corporateUser:focus,.novo-option.novo-fill-corporateUser:hover{background:#9ea1aa}.novo-option.novo-fill-corporateUser:active{background:#3a3c42}.novo-option.novo-accent-distributionList{border-left:4px solid #696d79}.novo-option.novo-fill-distributionList{background:#696d79;color:#fff}.novo-option.novo-fill-distributionList:focus,.novo-option.novo-fill-distributionList:hover{background:#9ea1aa}.novo-option.novo-fill-distributionList:active{background:#3a3c42}.novo-option.novo-accent-credential{border-left:4px solid #696d79}.novo-option.novo-fill-credential{background:#696d79;color:#fff}.novo-option.novo-fill-credential:focus,.novo-option.novo-fill-credential:hover{background:#9ea1aa}.novo-option.novo-fill-credential:active{background:#3a3c42}.novo-option.novo-accent-person{border-left:4px solid #696d79}.novo-option.novo-fill-person{background:#696d79;color:#fff}.novo-option.novo-fill-person:focus,.novo-option.novo-fill-person:hover{background:#9ea1aa}.novo-option.novo-fill-person:active{background:#3a3c42}.novo-option-text{align-items:center;display:inline-block;display:inline-flex;flex-direction:row;flex-grow:1;gap:1rem;overflow:hidden;text-overflow:ellipsis}.novo-option-pseudo-checkbox{margin-right:.25rem}[dir=rtl] .novo-option-pseudo-checkbox{margin-left:.25rem;margin-right:0}"]
            },] }
];
NovoOption.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NOVO_OPTION_PARENT_COMPONENT,] }] },
    { type: NovoOptgroup, decorators: [{ type: Optional }, { type: Inject, args: [NOVO_OPTGROUP,] }] }
];
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
export function _countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
    if (optionGroups.length) {
        let optionsArray = options.toArray();
        let groups = optionGroups.toArray();
        let groupCounter = 0;
        for (let i = 0; i < optionIndex + 1; i++) {
            if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                groupCounter++;
            }
        }
        return groupCounter;
    }
    return 0;
}
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
export function _getOptionScrollPosition(optionOffset, optionHeight, currentScrollPosition, panelHeight) {
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }
    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }
    return currentScrollPosition;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vb3B0aW9uL29wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckYsT0FBTyxFQUE2Qiw0QkFBNEIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTFGOzs7R0FHRztBQUNILElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBRXpCLHNFQUFzRTtBQUN0RSxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDO0lBQ0Usc0RBQXNEO0lBQy9DLE1BQXNCO0lBQzdCLDhFQUE4RTtJQUN2RSxjQUFjLEtBQUs7UUFGbkIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFFdEIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFDekIsQ0FBQztDQUNMO0FBR0QsTUFBTSxPQUFPLGNBQWM7SUErQ3pCLFlBQ1UsUUFBaUMsRUFDakMsa0JBQXFDLEVBQ2EsT0FBa0MsRUFDaEQsS0FBdUI7UUFIM0QsYUFBUSxHQUFS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WSxHQUFHLHFCQUFxQixHQUFHLFdBQVcsRUFBRTtRQUNyRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFlBQVksR0FBRyxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUM7S0FDL0Q7SUFFRCxPQUFPLHFCQUFxQixDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c2FibGVPcHRpb24sIEZvY3VzT3B0aW9ucywgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICdwcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy91dGlscyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvT3B0Z3JvdXAsIE5vdm9PcHRncm91cEJhc2UsIE5PVk9fT1BUR1JPVVAgfSBmcm9tICcuL29wdGdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uUGFyZW50Q29tcG9uZW50LCBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UIH0gZnJvbSAnLi9vcHRpb24tcGFyZW50JztcblxuLyoqXG4gKiBPcHRpb24gSURzIG5lZWQgdG8gYmUgdW5pcXVlIGFjcm9zcyBjb21wb25lbnRzLCBzbyB0aGlzIGNvdW50ZXIgZXhpc3RzIG91dHNpZGUgb2ZcbiAqIHRoZSBjb21wb25lbnQgZGVmaW5pdGlvbi5cbiAqL1xubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG4vKiogRXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTm92b09wdGlvbiB3aGVuIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG5leHBvcnQgY2xhc3MgTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIG9wdGlvbiB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyBzb3VyY2U6IE5vdm9PcHRpb25CYXNlLFxuICAgIC8qKiBXaGV0aGVyIHRoZSBjaGFuZ2UgaW4gdGhlIG9wdGlvbidzIHZhbHVlIHdhcyBhIHJlc3VsdCBvZiBhIHVzZXIgYWN0aW9uLiAqL1xuICAgIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlLFxuICApIHt9XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIE5vdm9PcHRpb25CYXNlIGltcGxlbWVudHMgRm9jdXNhYmxlT3B0aW9uLCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9hY3RpdmUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbW9zdFJlY2VudFZpZXdWYWx1ZSA9ICcnO1xuXG4gIC8qKiBUT0RPTCBkZXByZWNhdGUgbWF5YmUsIGNoZWNrIHN1cHBvcnQgZm9yIHRhYmxlIGhlYWRlcnMgKi9cbiAgQElucHV0KClcbiAga2VlcE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogSWYgdGhlcmUgaXMgbm8gcGFyZW50IHRoZW4gbm90aGluZyBpcyBtYW5hZ2luZyB0aGUgc2VsZWN0aW9uLiAqL1xuICBnZXQgc2VsZWN0YWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHdyYXBwaW5nIGNvbXBvbmVudCBpcyBpbiBtdWx0aXBsZSBzZWxlY3Rpb24gbW9kZS4gKi9cbiAgZ2V0IG11bHRpcGxlKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50Lm11bHRpcGxlO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSBvcHRpb24gaXMgY3VycmVudGx5IHNlbGVjdGVkLiAqL1xuICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgLyoqIFRoZSBmb3JtIHZhbHVlIG9mIHRoZSBvcHRpb24uICovXG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG5cbiAgLyoqIFRoZSB1bmlxdWUgSUQgb2YgdGhlIG9wdGlvbi4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBub3ZvLW9wdGlvbi0ke191bmlxdWVJZENvdW50ZXIrK31gO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBvcHRpb24gaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuZ3JvdXAgJiYgdGhpcy5ncm91cC5kaXNhYmxlZCkgfHwgdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBzdGF0ZSBvZiB0aGUgb3B0aW9uIGNoYW5nZXMgYW5kIGFueSBwYXJlbnRzIGhhdmUgdG8gYmUgbm90aWZpZWQuICovXG4gIHJlYWRvbmx5IF9zdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQpIHByaXZhdGUgX3BhcmVudDogTm92b09wdGlvblBhcmVudENvbXBvbmVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fT1BUR1JPVVApIHJlYWRvbmx5IGdyb3VwOiBOb3ZvT3B0Z3JvdXBCYXNlLFxuICApIHtcbiAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVEaXNhYmxlZENsaWNrLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIG9wdGlvbiBpcyBjdXJyZW50bHkgYWN0aXZlIGFuZCByZWFkeSB0byBiZSBzZWxlY3RlZC5cbiAgICogQW4gYWN0aXZlIG9wdGlvbiBkaXNwbGF5cyBzdHlsZXMgYXMgaWYgaXQgaXMgZm9jdXNlZCwgYnV0IHRoZVxuICAgKiBmb2N1cyBpcyBhY3R1YWxseSByZXRhaW5lZCBzb21ld2hlcmUgZWxzZS4gVGhpcyBjb21lcyBpbiBoYW5keVxuICAgKiBmb3IgY29tcG9uZW50cyBsaWtlIGF1dG9jb21wbGV0ZSB3aGVyZSBmb2N1cyBtdXN0IHJlbWFpbiBvbiB0aGUgaW5wdXQuXG4gICAqL1xuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGRpc3BsYXllZCB2YWx1ZSBvZiB0aGUgb3B0aW9uLiBJdCBpcyBuZWNlc3NhcnkgdG8gc2hvdyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGluIHRoZVxuICAgKiBzZWxlY3QncyB0cmlnZ2VyLlxuICAgKi9cbiAgZ2V0IHZpZXdWYWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5fZ2V0SG9zdEVsZW1lbnQoKS50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgdGhlIG9wdGlvbi4gKi9cbiAgc2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERlc2VsZWN0cyB0aGUgb3B0aW9uLiAqL1xuICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX2VtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIGZvY3VzIG9udG8gdGhpcyBvcHRpb24uICovXG4gIGZvY3VzKF9vcmlnaW4/OiBGb2N1c09yaWdpbiwgb3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBhcmVuJ3QgdXNpbmcgYF9vcmlnaW5gLCBidXQgd2UgbmVlZCB0byBrZWVwIGl0IGJlY2F1c2Ugc29tZSBpbnRlcm5hbCBjb25zdW1lcnNcbiAgICAvLyB1c2UgYE5vdm9PcHRpb25gIGluIGEgYEZvY3VzS2V5TWFuYWdlcmAgYW5kIHdlIG5lZWQgaXQgdG8gbWF0Y2ggYEZvY3VzYWJsZU9wdGlvbmAuXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2dldEhvc3RFbGVtZW50KCk7XG5cbiAgICBpZiAodHlwZW9mIGVsZW1lbnQuZm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldHMgZGlzcGxheSBzdHlsZXMgb24gdGhlIG9wdGlvbiB0byBtYWtlIGl0IGFwcGVhclxuICAgKiBhY3RpdmUuIFRoaXMgaXMgdXNlZCBieSB0aGUgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgc28ga2V5XG4gICAqIGV2ZW50cyB3aWxsIGRpc3BsYXkgdGhlIHByb3BlciBvcHRpb25zIGFzIGFjdGl2ZSBvbiBhcnJvdyBrZXkgZXZlbnRzLlxuICAgKi9cbiAgc2V0QWN0aXZlU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHJlbW92ZXMgZGlzcGxheSBzdHlsZXMgb24gdGhlIG9wdGlvbiB0aGF0IG1hZGUgaXQgYXBwZWFyXG4gICAqIGFjdGl2ZS4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciBzbyBrZXlcbiAgICogZXZlbnRzIHdpbGwgZGlzcGxheSB0aGUgcHJvcGVyIG9wdGlvbnMgYXMgYWN0aXZlIG9uIGFycm93IGtleSBldmVudHMuXG4gICAqL1xuICBzZXRJbmFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBsYWJlbCB0byBiZSB1c2VkIHdoZW4gZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgb3B0aW9uIHNob3VsZCBiZSBmb2N1c2VkLiAqL1xuICBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZpZXdWYWx1ZTtcbiAgfVxuXG4gIF9oYW5kbGVEaXNhYmxlZENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBFbnN1cmVzIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWQgd2hlbiBhY3RpdmF0ZWQgZnJvbSB0aGUga2V5Ym9hcmQuICovXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKChldmVudC5rZXkgPT09IEtleS5FbnRlciB8fCBldmVudC5rZXkgPT09IEtleS5TcGFjZSkgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50KSkge1xuICAgICAgdGhpcy5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcblxuICAgICAgLy8gUHJldmVudCB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIGFuZCBmb3JtIHN1Ym1pdHMuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBgU2VsZWN0cyB0aGUgb3B0aW9uIHdoaWxlIGluZGljYXRpbmcgdGhlIHNlbGVjdGlvbiBjYW1lIGZyb20gdGhlIHVzZXIuIFVzZWQgdG9cbiAgICogZGV0ZXJtaW5lIGlmIHRoZSBzZWxlY3QncyB2aWV3IC0+IG1vZGVsIGNhbGxiYWNrIHNob3VsZCBiZSBpbnZva2VkLmBcbiAgICovXG4gIF9zZWxlY3RWaWFJbnRlcmFjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5tdWx0aXBsZSA/ICF0aGlzLl9zZWxlY3RlZCA6IHRydWU7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX2VtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgYSBjbGljayBldmVudFxuICAgKi9cbiAgX2NsaWNrVmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgYGFyaWEtc2VsZWN0ZWRgIHZhbHVlIGZvciB0aGUgb3B0aW9uLiBXZSBleHBsaWNpdGx5IG9taXQgdGhlIGBhcmlhLXNlbGVjdGVkYFxuICAgKiBhdHRyaWJ1dGUgZnJvbSBzaW5nbGUtc2VsZWN0aW9uLCB1bnNlbGVjdGVkIG9wdGlvbnMuIEluY2x1ZGluZyB0aGUgYGFyaWEtc2VsZWN0ZWQ9XCJmYWxzZVwiYFxuICAgKiBhdHRyaWJ1dGVzIGFkZHMgYSBzaWduaWZpY2FudCBhbW91bnQgb2Ygbm9pc2UgdG8gc2NyZWVuLXJlYWRlciB1c2VycyB3aXRob3V0IHByb3ZpZGluZyB1c2VmdWxcbiAgICogaW5mb3JtYXRpb24uXG4gICAqL1xuICBfZ2V0QXJpYVNlbGVjdGVkKCk6IGJvb2xlYW4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCB8fCAodGhpcy5tdWx0aXBsZSA/IGZhbHNlIDogbnVsbCk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgY29ycmVjdCB0YWJpbmRleCBmb3IgdGhlIG9wdGlvbiBkZXBlbmRpbmcgb24gZGlzYWJsZWQgc3RhdGUuICovXG4gIF9nZXRUYWJJbmRleCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gJy0xJyA6ICcwJztcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBob3N0IERPTSBlbGVtZW50LiAqL1xuICBfZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgLy8gU2luY2UgcGFyZW50IGNvbXBvbmVudHMgY291bGQgYmUgdXNpbmcgdGhlIG9wdGlvbidzIGxhYmVsIHRvIGRpc3BsYXkgdGhlIHNlbGVjdGVkIHZhbHVlc1xuICAgIC8vIChlLmcuIGBub3ZvLXNlbGVjdGApIGFuZCB0aGV5IGRvbid0IGhhdmUgYSB3YXkgb2Yga25vd2luZyBpZiB0aGUgb3B0aW9uJ3MgbGFiZWwgaGFzIGNoYW5nZWRcbiAgICAvLyB3ZSBoYXZlIHRvIGNoZWNrIGZvciBjaGFuZ2VzIGluIHRoZSBET00gb3Vyc2VsdmVzIGFuZCBkaXNwYXRjaCBhbiBldmVudC4gVGhlc2UgY2hlY2tzIGFyZVxuICAgIC8vIHJlbGF0aXZlbHkgY2hlYXAsIGhvd2V2ZXIgd2Ugc3RpbGwgbGltaXQgdGhlbSBvbmx5IHRvIHNlbGVjdGVkIG9wdGlvbnMgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAvLyBoaXR0aW5nIHRoZSBET00gdG9vIG9mdGVuLlxuICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgY29uc3Qgdmlld1ZhbHVlID0gdGhpcy52aWV3VmFsdWU7XG5cbiAgICAgIGlmICh2aWV3VmFsdWUgIT09IHRoaXMuX21vc3RSZWNlbnRWaWV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbW9zdFJlY2VudFZpZXdWYWx1ZSA9IHZpZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVEaXNhYmxlZENsaWNrLCBmYWxzZSk7XG4gIH1cblxuICAvKiogRW1pdHMgdGhlIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQuICovXG4gIHByaXZhdGUgX2VtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudChpc1VzZXJJbnB1dCA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlKHRoaXMsIGlzVXNlcklucHV0KSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cblxuLyoqXG4gKiBTaW5nbGUgb3B0aW9uIGluc2lkZSBvZiBhIGA8bm92by1zZWxlY3Q+YCBlbGVtZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW9wdGlvbicsXG4gIGV4cG9ydEFzOiAnbm92b09wdGlvbicsXG4gIGhvc3Q6IHtcbiAgICByb2xlOiAnb3B0aW9uJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdfZ2V0VGFiSW5kZXgoKScsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ19nZXRBcmlhU2VsZWN0ZWQoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbY2xhc3Mubm92by1hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgJ1tjbGFzcy5ub3ZvLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLW9wdGlvbi1tdWx0aXBsZV0nOiAnbXVsdGlwbGUnLFxuICAgICdbY2xhc3Mubm92by1vcHRpb24tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnKGNsaWNrKSc6ICdfc2VsZWN0VmlhSW50ZXJhY3Rpb24oKScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICBjbGFzczogJ25vdm8tb3B0aW9uIG5vdm8tZm9jdXMtaW5kaWNhdG9yJyxcbiAgfSxcbiAgc3R5bGVVcmxzOiBbJ29wdGlvbi5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJ29wdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvT3B0aW9uIGV4dGVuZHMgTm92b09wdGlvbkJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UKSBwYXJlbnQ6IE5vdm9PcHRpb25QYXJlbnRDb21wb25lbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOT1ZPX09QVEdST1VQKSBncm91cDogTm92b09wdGdyb3VwLFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50LCBjaGFuZ2VEZXRlY3RvclJlZiwgcGFyZW50LCBncm91cCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDb3VudHMgdGhlIGFtb3VudCBvZiBvcHRpb24gZ3JvdXAgbGFiZWxzIHRoYXQgcHJlY2VkZSB0aGUgc3BlY2lmaWVkIG9wdGlvbi5cbiAqIEBwYXJhbSBvcHRpb25JbmRleCBJbmRleCBvZiB0aGUgb3B0aW9uIGF0IHdoaWNoIHRvIHN0YXJ0IGNvdW50aW5nLlxuICogQHBhcmFtIG9wdGlvbnMgRmxhdCBsaXN0IG9mIGFsbCBvZiB0aGUgb3B0aW9ucy5cbiAqIEBwYXJhbSBvcHRpb25Hcm91cHMgRmxhdCBsaXN0IG9mIGFsbCBvZiB0aGUgb3B0aW9uIGdyb3Vwcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKFxuICBvcHRpb25JbmRleDogbnVtYmVyLFxuICBvcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj4sXG4gIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE5vdm9PcHRncm91cD4sXG4pOiBudW1iZXIge1xuICBpZiAob3B0aW9uR3JvdXBzLmxlbmd0aCkge1xuICAgIGxldCBvcHRpb25zQXJyYXkgPSBvcHRpb25zLnRvQXJyYXkoKTtcbiAgICBsZXQgZ3JvdXBzID0gb3B0aW9uR3JvdXBzLnRvQXJyYXkoKTtcbiAgICBsZXQgZ3JvdXBDb3VudGVyID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9uSW5kZXggKyAxOyBpKyspIHtcbiAgICAgIGlmIChvcHRpb25zQXJyYXlbaV0uZ3JvdXAgJiYgb3B0aW9uc0FycmF5W2ldLmdyb3VwID09PSBncm91cHNbZ3JvdXBDb3VudGVyXSkge1xuICAgICAgICBncm91cENvdW50ZXIrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXBDb3VudGVyO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB0aGUgcG9zaXRpb24gdG8gd2hpY2ggdG8gc2Nyb2xsIGEgcGFuZWwgaW4gb3JkZXIgZm9yIGFuIG9wdGlvbiB0byBiZSBpbnRvIHZpZXcuXG4gKiBAcGFyYW0gb3B0aW9uT2Zmc2V0IE9mZnNldCBvZiB0aGUgb3B0aW9uIGZyb20gdGhlIHRvcCBvZiB0aGUgcGFuZWwuXG4gKiBAcGFyYW0gb3B0aW9uSGVpZ2h0IEhlaWdodCBvZiB0aGUgb3B0aW9ucy5cbiAqIEBwYXJhbSBjdXJyZW50U2Nyb2xsUG9zaXRpb24gQ3VycmVudCBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIHBhbmVsLlxuICogQHBhcmFtIHBhbmVsSGVpZ2h0IEhlaWdodCBvZiB0aGUgcGFuZWwuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gIG9wdGlvbk9mZnNldDogbnVtYmVyLFxuICBvcHRpb25IZWlnaHQ6IG51bWJlcixcbiAgY3VycmVudFNjcm9sbFBvc2l0aW9uOiBudW1iZXIsXG4gIHBhbmVsSGVpZ2h0OiBudW1iZXIsXG4pOiBudW1iZXIge1xuICBpZiAob3B0aW9uT2Zmc2V0IDwgY3VycmVudFNjcm9sbFBvc2l0aW9uKSB7XG4gICAgcmV0dXJuIG9wdGlvbk9mZnNldDtcbiAgfVxuXG4gIGlmIChvcHRpb25PZmZzZXQgKyBvcHRpb25IZWlnaHQgPiBjdXJyZW50U2Nyb2xsUG9zaXRpb24gKyBwYW5lbEhlaWdodCkge1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBvcHRpb25PZmZzZXQgLSBwYW5lbEhlaWdodCArIG9wdGlvbkhlaWdodCk7XG4gIH1cblxuICByZXR1cm4gY3VycmVudFNjcm9sbFBvc2l0aW9uO1xufVxuIl19