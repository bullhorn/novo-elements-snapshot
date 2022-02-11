import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation, } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoOptgroup, NovoOptgroupBase, NOVO_OPTGROUP } from './optgroup.component';
import { NOVO_OPTION_PARENT_COMPONENT } from './option-parent';
import * as i0 from "@angular/core";
import * as i1 from "./optgroup.component";
import * as i2 from "@angular/common";
import * as i3 from "../selection/pseudo-checkbox/pseudo-checkbox.component";
function NovoOption_novo_pseudo_checkbox_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-pseudo-checkbox", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("state", ctx_r0.selected ? "checked" : "unchecked")("disabled", ctx_r0.disabled);
} }
function NovoOption_novo_pseudo_checkbox_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-pseudo-checkbox", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.disabled);
} }
function NovoOption_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(", ctx_r2.group.label, ")");
} }
const _c0 = ["*"];
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
        /** The unique ID of the option. */
        this.id = `novo-option-${_uniqueIdCounter++}`;
        /** Event emitted when the option is selected or deselected. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new EventEmitter();
        /** Emits when the state of the option changes and any parents have to be notified. */
        this._stateChanges = new Subject();
        this._element.nativeElement.addEventListener('click', this._handleDisabledClick, false);
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
NovoOptionBase.ɵfac = function NovoOptionBase_Factory(t) { i0.ɵɵinvalidFactory(); };
NovoOptionBase.ɵdir = i0.ɵɵdefineDirective({ type: NovoOptionBase, inputs: { value: "value", id: "id", disabled: "disabled" }, outputs: { onSelectionChange: "onSelectionChange" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoOptionBase, [{
        type: Directive
    }], function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined }, { type: i1.NovoOptgroupBase }]; }, { value: [{
            type: Input
        }], id: [{
            type: Input
        }], disabled: [{
            type: Input
        }], onSelectionChange: [{
            type: Output
        }] }); })();
/**
 * Single option inside of a `<novo-select>` element.
 */
export class NovoOption extends NovoOptionBase {
    constructor(element, changeDetectorRef, parent, group) {
        super(element, changeDetectorRef, parent, group);
    }
}
NovoOption.ɵfac = function NovoOption_Factory(t) { return new (t || NovoOption)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(NOVO_OPTION_PARENT_COMPONENT, 8), i0.ɵɵdirectiveInject(NOVO_OPTGROUP, 8)); };
NovoOption.ɵcmp = i0.ɵɵdefineComponent({ type: NovoOption, selectors: [["novo-option"]], hostAttrs: ["role", "option", 1, "novo-option", "novo-focus-indicator"], hostVars: 12, hostBindings: function NovoOption_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function NovoOption_click_HostBindingHandler() { return ctx._selectViaInteraction(); })("keydown", function NovoOption_keydown_HostBindingHandler($event) { return ctx._handleKeydown($event); });
    } if (rf & 2) {
        i0.ɵɵhostProperty("id", ctx.id);
        i0.ɵɵattribute("tabindex", ctx._getTabIndex())("aria-selected", ctx._getAriaSelected())("aria-disabled", ctx.disabled.toString());
        i0.ɵɵclassProp("novo-active", ctx.active)("novo-selected", ctx.selected)("novo-option-multiple", ctx.multiple)("novo-option-disabled", ctx.disabled);
    } }, exportAs: ["novoOption"], features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 5, vars: 3, consts: [["class", "novo-option-pseudo-checkbox", 3, "state", "disabled", 4, "ngIf"], [1, "novo-option-text"], ["class", "novo-option-pseudo-checkbox", "state", "checked", "shape", "line", 3, "disabled", 4, "ngIf"], ["class", "cdk-visually-hidden", 4, "ngIf"], [1, "novo-option-pseudo-checkbox", 3, "state", "disabled"], ["state", "checked", "shape", "line", 1, "novo-option-pseudo-checkbox", 3, "disabled"], [1, "cdk-visually-hidden"]], template: function NovoOption_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, NovoOption_novo_pseudo_checkbox_0_Template, 1, 2, "novo-pseudo-checkbox", 0);
        i0.ɵɵelementStart(1, "span", 1);
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, NovoOption_novo_pseudo_checkbox_3_Template, 1, 1, "novo-pseudo-checkbox", 2);
        i0.ɵɵtemplate(4, NovoOption_span_4_Template, 2, 1, "span", 3);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.multiple);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", !ctx.multiple && ctx.selected);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.group && ctx.group._inert);
    } }, directives: [i2.NgIf, i3.NovoPseudoCheckbox], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-option{-webkit-tap-highlight-color:transparent;align-items:center;box-sizing:border-box;color:inherit;cursor:pointer;display:inline;display:flex;flex:1;flex-direction:row;font-size:1.2rem;font-weight:400;gap:1rem;line-height:1.5rem;margin:0;max-width:100%;outline:none;padding:1rem 1rem 1rem 1.6rem;position:relative}.novo-option:hover{background:rgba(74,137,220,.1);color:#3d464d}.novo-option:active{background:rgba(74,137,220,.3)}.novo-option.novo-active{background:rgba(74,137,220,.3)}.novo-option.novo-selected{color:#4a89dc}.novo-option.disabled,.novo-option[aria-disabled=true]{color:#bebebe;cursor:not-allowed}.novo-option.disabled:hover,.novo-option[aria-disabled=true]:hover{background:rgba(218,68,83,.1)}.novo-optgroup .novo-option:not(.novo-option-multiple){padding-left:1rem}[dir=rtl] .novo-optgroup .novo-option:not(.novo-option-multiple){padding-left:.5rem;padding-right:1rem}.novo-option-text{align-items:center;display:inline-block;display:inline-flex;flex-direction:row;flex-grow:1;gap:1rem;overflow:hidden;text-overflow:ellipsis}.novo-option-pseudo-checkbox{margin-right:.25rem}[dir=rtl] .novo-option-pseudo-checkbox{margin-left:.25rem;margin-right:0}"], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoOption, [{
        type: Component,
        args: [{
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
                styleUrls: ['option.component.scss'],
                templateUrl: 'option.component.html',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [NOVO_OPTION_PARENT_COMPONENT]
            }] }, { type: i1.NovoOptgroup, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [NOVO_OPTGROUP]
            }] }]; }, null); })();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jb21tb24vb3B0aW9uL29wdGlvbi5jb21wb25lbnQudHMiLCJlbGVtZW50cy9jb21tb24vb3B0aW9uL29wdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBRU4saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRixPQUFPLEVBQTZCLDRCQUE0QixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztJQ3RCMUYsMENBQzRGOzs7SUFBMUYsaUVBQTRDLDZCQUFBOzs7SUFNOUMsMENBQytDOzs7SUFBN0MsMENBQXFCOzs7SUFHdkIsK0JBQWdFO0lBQUEsWUFBbUI7SUFBQSxpQkFBTzs7O0lBQTFCLGVBQW1CO0lBQW5CLG1EQUFtQjs7O0FEYW5GOzs7R0FHRztBQUNILElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBRXpCLHNFQUFzRTtBQUN0RSxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDO0lBQ0Usc0RBQXNEO0lBQy9DLE1BQXNCO0lBQzdC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LEVBQUU7Z0JBQzNFLFlBQVksRUFBRSxDQUFDO2FBQ2hCO1NBQ0Y7UUFFRCxPQUFPLFlBQVksQ0FBQztLQUNyQjtJQUVELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQ3RDLFlBQW9CLEVBQ3BCLFlBQW9CLEVBQ3BCLHFCQUE2QixFQUM3QixXQUFtQjtJQUVuQixJQUFJLFlBQVksR0FBRyxxQkFBcUIsRUFBRTtRQUN4QyxPQUFPLFlBQVksQ0FBQztLQUNyQjtJQUVELElBQUksWUFBWSxHQUFHLFlBQVksR0FBRyxxQkFBcUIsR0FBRyxXQUFXLEVBQUU7UUFDckUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxZQUFZLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDO0tBQy9EO0lBRUQsT0FBTyxxQkFBcUIsQ0FBQztBQUMvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNhYmxlT3B0aW9uLCBGb2N1c09wdGlvbnMsIEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgaGFzTW9kaWZpZXJLZXkgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAncHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvdXRpbHMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b09wdGdyb3VwLCBOb3ZvT3B0Z3JvdXBCYXNlLCBOT1ZPX09QVEdST1VQIH0gZnJvbSAnLi9vcHRncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b09wdGlvblBhcmVudENvbXBvbmVudCwgTk9WT19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCB9IGZyb20gJy4vb3B0aW9uLXBhcmVudCc7XG5cbi8qKlxuICogT3B0aW9uIElEcyBuZWVkIHRvIGJlIHVuaXF1ZSBhY3Jvc3MgY29tcG9uZW50cywgc28gdGhpcyBjb3VudGVyIGV4aXN0cyBvdXRzaWRlIG9mXG4gKiB0aGUgY29tcG9uZW50IGRlZmluaXRpb24uXG4gKi9cbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcblxuLyoqIEV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE5vdm9PcHRpb24gd2hlbiBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuZXhwb3J0IGNsYXNzIE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBvcHRpb24gdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBOb3ZvT3B0aW9uQmFzZSxcbiAgICAvKiogV2hldGhlciB0aGUgY2hhbmdlIGluIHRoZSBvcHRpb24ncyB2YWx1ZSB3YXMgYSByZXN1bHQgb2YgYSB1c2VyIGFjdGlvbi4gKi9cbiAgICBwdWJsaWMgaXNVc2VySW5wdXQgPSBmYWxzZSxcbiAgKSB7fVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBOb3ZvT3B0aW9uQmFzZSBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYWN0aXZlID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX21vc3RSZWNlbnRWaWV3VmFsdWUgPSAnJztcblxuICAvKiogV2hldGhlciB0aGUgd3JhcHBpbmcgY29tcG9uZW50IGlzIGluIG11bHRpcGxlIHNlbGVjdGlvbiBtb2RlLiAqL1xuICBnZXQgbXVsdGlwbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQubXVsdGlwbGU7XG4gIH1cblxuICAvKiogV2hldGhlciBvciBub3QgdGhlIG9wdGlvbiBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuICovXG4gIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICAvKiogVGhlIGZvcm0gdmFsdWUgb2YgdGhlIG9wdGlvbi4gKi9cbiAgQElucHV0KCkgdmFsdWU6IGFueTtcblxuICAvKiogVGhlIHVuaXF1ZSBJRCBvZiB0aGUgb3B0aW9uLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG5vdm8tb3B0aW9uLSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG9wdGlvbiBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiAodGhpcy5ncm91cCAmJiB0aGlzLmdyb3VwLmRpc2FibGVkKSB8fCB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIG9wdGlvbiBpcyBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2U+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSBvcHRpb24gY2hhbmdlcyBhbmQgYW55IHBhcmVudHMgaGF2ZSB0byBiZSBub3RpZmllZC4gKi9cbiAgcmVhZG9ubHkgX3N0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3BhcmVudDogTm92b09wdGlvblBhcmVudENvbXBvbmVudCxcbiAgICByZWFkb25seSBncm91cDogTm92b09wdGdyb3VwQmFzZSxcbiAgKSB7XG4gICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlRGlzYWJsZWRDbGljaywgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSBvcHRpb24gaXMgY3VycmVudGx5IGFjdGl2ZSBhbmQgcmVhZHkgdG8gYmUgc2VsZWN0ZWQuXG4gICAqIEFuIGFjdGl2ZSBvcHRpb24gZGlzcGxheXMgc3R5bGVzIGFzIGlmIGl0IGlzIGZvY3VzZWQsIGJ1dCB0aGVcbiAgICogZm9jdXMgaXMgYWN0dWFsbHkgcmV0YWluZWQgc29tZXdoZXJlIGVsc2UuIFRoaXMgY29tZXMgaW4gaGFuZHlcbiAgICogZm9yIGNvbXBvbmVudHMgbGlrZSBhdXRvY29tcGxldGUgd2hlcmUgZm9jdXMgbXVzdCByZW1haW4gb24gdGhlIGlucHV0LlxuICAgKi9cbiAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkaXNwbGF5ZWQgdmFsdWUgb2YgdGhlIG9wdGlvbi4gSXQgaXMgbmVjZXNzYXJ5IHRvIHNob3cgdGhlIHNlbGVjdGVkIG9wdGlvbiBpbiB0aGVcbiAgICogc2VsZWN0J3MgdHJpZ2dlci5cbiAgICovXG4gIGdldCB2aWV3VmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuX2dldEhvc3RFbGVtZW50KCkudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIHRoZSBvcHRpb24uICovXG4gIHNlbGVjdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX2VtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEZXNlbGVjdHMgdGhlIG9wdGlvbi4gKi9cbiAgZGVzZWxlY3QoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl9lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0cyBmb2N1cyBvbnRvIHRoaXMgb3B0aW9uLiAqL1xuICBmb2N1cyhfb3JpZ2luPzogRm9jdXNPcmlnaW4sIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICAvLyBOb3RlIHRoYXQgd2UgYXJlbid0IHVzaW5nIGBfb3JpZ2luYCwgYnV0IHdlIG5lZWQgdG8ga2VlcCBpdCBiZWNhdXNlIHNvbWUgaW50ZXJuYWwgY29uc3VtZXJzXG4gICAgLy8gdXNlIGBOb3ZvT3B0aW9uYCBpbiBhIGBGb2N1c0tleU1hbmFnZXJgIGFuZCB3ZSBuZWVkIGl0IHRvIG1hdGNoIGBGb2N1c2FibGVPcHRpb25gLlxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9nZXRIb3N0RWxlbWVudCgpO1xuXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50LmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBlbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXRzIGRpc3BsYXkgc3R5bGVzIG9uIHRoZSBvcHRpb24gdG8gbWFrZSBpdCBhcHBlYXJcbiAgICogYWN0aXZlLiBUaGlzIGlzIHVzZWQgYnkgdGhlIEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIHNvIGtleVxuICAgKiBldmVudHMgd2lsbCBkaXNwbGF5IHRoZSBwcm9wZXIgb3B0aW9ucyBhcyBhY3RpdmUgb24gYXJyb3cga2V5IGV2ZW50cy5cbiAgICovXG4gIHNldEFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCByZW1vdmVzIGRpc3BsYXkgc3R5bGVzIG9uIHRoZSBvcHRpb24gdGhhdCBtYWRlIGl0IGFwcGVhclxuICAgKiBhY3RpdmUuIFRoaXMgaXMgdXNlZCBieSB0aGUgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgc28ga2V5XG4gICAqIGV2ZW50cyB3aWxsIGRpc3BsYXkgdGhlIHByb3BlciBvcHRpb25zIGFzIGFjdGl2ZSBvbiBhcnJvdyBrZXkgZXZlbnRzLlxuICAgKi9cbiAgc2V0SW5hY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbGFiZWwgdG8gYmUgdXNlZCB3aGVuIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIG9wdGlvbiBzaG91bGQgYmUgZm9jdXNlZC4gKi9cbiAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy52aWV3VmFsdWU7XG4gIH1cblxuICBfaGFuZGxlRGlzYWJsZWRDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKiogRW5zdXJlcyB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkIHdoZW4gYWN0aXZhdGVkIGZyb20gdGhlIGtleWJvYXJkLiAqL1xuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICgoZXZlbnQua2V5ID09PSBLZXkuRW50ZXIgfHwgZXZlbnQua2V5ID09PSBLZXkuU3BhY2UpICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHtcbiAgICAgIHRoaXMuX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG5cbiAgICAgIC8vIFByZXZlbnQgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biBhbmQgZm9ybSBzdWJtaXRzLlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYFNlbGVjdHMgdGhlIG9wdGlvbiB3aGlsZSBpbmRpY2F0aW5nIHRoZSBzZWxlY3Rpb24gY2FtZSBmcm9tIHRoZSB1c2VyLiBVc2VkIHRvXG4gICAqIGRldGVybWluZSBpZiB0aGUgc2VsZWN0J3MgdmlldyAtPiBtb2RlbCBjYWxsYmFjayBzaG91bGQgYmUgaW52b2tlZC5gXG4gICAqL1xuICBfc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMubXVsdGlwbGUgPyAhdGhpcy5fc2VsZWN0ZWQgOiB0cnVlO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl9lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlIGEgY2xpY2sgZXZlbnRcbiAgICovXG4gIF9jbGlja1ZpYUludGVyYWN0aW9uKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGBhcmlhLXNlbGVjdGVkYCB2YWx1ZSBmb3IgdGhlIG9wdGlvbi4gV2UgZXhwbGljaXRseSBvbWl0IHRoZSBgYXJpYS1zZWxlY3RlZGBcbiAgICogYXR0cmlidXRlIGZyb20gc2luZ2xlLXNlbGVjdGlvbiwgdW5zZWxlY3RlZCBvcHRpb25zLiBJbmNsdWRpbmcgdGhlIGBhcmlhLXNlbGVjdGVkPVwiZmFsc2VcImBcbiAgICogYXR0cmlidXRlcyBhZGRzIGEgc2lnbmlmaWNhbnQgYW1vdW50IG9mIG5vaXNlIHRvIHNjcmVlbi1yZWFkZXIgdXNlcnMgd2l0aG91dCBwcm92aWRpbmcgdXNlZnVsXG4gICAqIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgX2dldEFyaWFTZWxlY3RlZCgpOiBib29sZWFuIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgfHwgKHRoaXMubXVsdGlwbGUgPyBmYWxzZSA6IG51bGwpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGNvcnJlY3QgdGFiaW5kZXggZm9yIHRoZSBvcHRpb24gZGVwZW5kaW5nIG9uIGRpc2FibGVkIHN0YXRlLiAqL1xuICBfZ2V0VGFiSW5kZXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/ICctMScgOiAnMCc7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgaG9zdCBET00gZWxlbWVudC4gKi9cbiAgX2dldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIC8vIFNpbmNlIHBhcmVudCBjb21wb25lbnRzIGNvdWxkIGJlIHVzaW5nIHRoZSBvcHRpb24ncyBsYWJlbCB0byBkaXNwbGF5IHRoZSBzZWxlY3RlZCB2YWx1ZXNcbiAgICAvLyAoZS5nLiBgbm92by1zZWxlY3RgKSBhbmQgdGhleSBkb24ndCBoYXZlIGEgd2F5IG9mIGtub3dpbmcgaWYgdGhlIG9wdGlvbidzIGxhYmVsIGhhcyBjaGFuZ2VkXG4gICAgLy8gd2UgaGF2ZSB0byBjaGVjayBmb3IgY2hhbmdlcyBpbiB0aGUgRE9NIG91cnNlbHZlcyBhbmQgZGlzcGF0Y2ggYW4gZXZlbnQuIFRoZXNlIGNoZWNrcyBhcmVcbiAgICAvLyByZWxhdGl2ZWx5IGNoZWFwLCBob3dldmVyIHdlIHN0aWxsIGxpbWl0IHRoZW0gb25seSB0byBzZWxlY3RlZCBvcHRpb25zIGluIG9yZGVyIHRvIGF2b2lkXG4gICAgLy8gaGl0dGluZyB0aGUgRE9NIHRvbyBvZnRlbi5cbiAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHZpZXdWYWx1ZSA9IHRoaXMudmlld1ZhbHVlO1xuXG4gICAgICBpZiAodmlld1ZhbHVlICE9PSB0aGlzLl9tb3N0UmVjZW50Vmlld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX21vc3RSZWNlbnRWaWV3VmFsdWUgPSB2aWV3VmFsdWU7XG4gICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlRGlzYWJsZWRDbGljaywgZmFsc2UpO1xuICB9XG5cbiAgLyoqIEVtaXRzIHRoZSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50LiAqL1xuICBwcml2YXRlIF9lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoaXNVc2VySW5wdXQgPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UuZW1pdChuZXcgTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSh0aGlzLCBpc1VzZXJJbnB1dCkpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG5cbi8qKlxuICogU2luZ2xlIG9wdGlvbiBpbnNpZGUgb2YgYSBgPG5vdm8tc2VsZWN0PmAgZWxlbWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1vcHRpb24nLFxuICBleHBvcnRBczogJ25vdm9PcHRpb24nLFxuICBob3N0OiB7XG4gICAgcm9sZTogJ29wdGlvbicsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnX2dldFRhYkluZGV4KCknLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICdfZ2V0QXJpYVNlbGVjdGVkKCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2NsYXNzLm5vdm8tYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3Mubm92by1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICdbY2xhc3Mubm92by1vcHRpb24tbXVsdGlwbGVdJzogJ211bHRpcGxlJyxcbiAgICAnW2NsYXNzLm5vdm8tb3B0aW9uLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJyhjbGljayknOiAnX3NlbGVjdFZpYUludGVyYWN0aW9uKCknLFxuICAgICcoa2V5ZG93biknOiAnX2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgY2xhc3M6ICdub3ZvLW9wdGlvbiBub3ZvLWZvY3VzLWluZGljYXRvcicsXG4gIH0sXG4gIHN0eWxlVXJsczogWydvcHRpb24uY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdvcHRpb24uY29tcG9uZW50Lmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b09wdGlvbiBleHRlbmRzIE5vdm9PcHRpb25CYXNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTk9WT19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCkgcGFyZW50OiBOb3ZvT3B0aW9uUGFyZW50Q29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTk9WT19PUFRHUk9VUCkgZ3JvdXA6IE5vdm9PcHRncm91cCxcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY2hhbmdlRGV0ZWN0b3JSZWYsIHBhcmVudCwgZ3JvdXApO1xuICB9XG59XG5cbi8qKlxuICogQ291bnRzIHRoZSBhbW91bnQgb2Ygb3B0aW9uIGdyb3VwIGxhYmVscyB0aGF0IHByZWNlZGUgdGhlIHNwZWNpZmllZCBvcHRpb24uXG4gKiBAcGFyYW0gb3B0aW9uSW5kZXggSW5kZXggb2YgdGhlIG9wdGlvbiBhdCB3aGljaCB0byBzdGFydCBjb3VudGluZy5cbiAqIEBwYXJhbSBvcHRpb25zIEZsYXQgbGlzdCBvZiBhbGwgb2YgdGhlIG9wdGlvbnMuXG4gKiBAcGFyYW0gb3B0aW9uR3JvdXBzIEZsYXQgbGlzdCBvZiBhbGwgb2YgdGhlIG9wdGlvbiBncm91cHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbihcbiAgb3B0aW9uSW5kZXg6IG51bWJlcixcbiAgb3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+LFxuICBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxOb3ZvT3B0Z3JvdXA+LFxuKTogbnVtYmVyIHtcbiAgaWYgKG9wdGlvbkdyb3Vwcy5sZW5ndGgpIHtcbiAgICBsZXQgb3B0aW9uc0FycmF5ID0gb3B0aW9ucy50b0FycmF5KCk7XG4gICAgbGV0IGdyb3VwcyA9IG9wdGlvbkdyb3Vwcy50b0FycmF5KCk7XG4gICAgbGV0IGdyb3VwQ291bnRlciA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbkluZGV4ICsgMTsgaSsrKSB7XG4gICAgICBpZiAob3B0aW9uc0FycmF5W2ldLmdyb3VwICYmIG9wdGlvbnNBcnJheVtpXS5ncm91cCA9PT0gZ3JvdXBzW2dyb3VwQ291bnRlcl0pIHtcbiAgICAgICAgZ3JvdXBDb3VudGVyKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwQ291bnRlcjtcbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgdGhlIHBvc2l0aW9uIHRvIHdoaWNoIHRvIHNjcm9sbCBhIHBhbmVsIGluIG9yZGVyIGZvciBhbiBvcHRpb24gdG8gYmUgaW50byB2aWV3LlxuICogQHBhcmFtIG9wdGlvbk9mZnNldCBPZmZzZXQgb2YgdGhlIG9wdGlvbiBmcm9tIHRoZSB0b3Agb2YgdGhlIHBhbmVsLlxuICogQHBhcmFtIG9wdGlvbkhlaWdodCBIZWlnaHQgb2YgdGhlIG9wdGlvbnMuXG4gKiBAcGFyYW0gY3VycmVudFNjcm9sbFBvc2l0aW9uIEN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBwYW5lbC5cbiAqIEBwYXJhbSBwYW5lbEhlaWdodCBIZWlnaHQgb2YgdGhlIHBhbmVsLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICBvcHRpb25PZmZzZXQ6IG51bWJlcixcbiAgb3B0aW9uSGVpZ2h0OiBudW1iZXIsXG4gIGN1cnJlbnRTY3JvbGxQb3NpdGlvbjogbnVtYmVyLFxuICBwYW5lbEhlaWdodDogbnVtYmVyLFxuKTogbnVtYmVyIHtcbiAgaWYgKG9wdGlvbk9mZnNldCA8IGN1cnJlbnRTY3JvbGxQb3NpdGlvbikge1xuICAgIHJldHVybiBvcHRpb25PZmZzZXQ7XG4gIH1cblxuICBpZiAob3B0aW9uT2Zmc2V0ICsgb3B0aW9uSGVpZ2h0ID4gY3VycmVudFNjcm9sbFBvc2l0aW9uICsgcGFuZWxIZWlnaHQpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgb3B0aW9uT2Zmc2V0IC0gcGFuZWxIZWlnaHQgKyBvcHRpb25IZWlnaHQpO1xuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRTY3JvbGxQb3NpdGlvbjtcbn1cbiIsIjxub3ZvLXBzZXVkby1jaGVja2JveCAqbmdJZj1cIm11bHRpcGxlXCIgY2xhc3M9XCJub3ZvLW9wdGlvbi1wc2V1ZG8tY2hlY2tib3hcIlxuICBbc3RhdGVdPVwic2VsZWN0ZWQgPyAnY2hlY2tlZCcgOiAndW5jaGVja2VkJ1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPjwvbm92by1wc2V1ZG8tY2hlY2tib3g+XG5cbjxzcGFuIGNsYXNzPVwibm92by1vcHRpb24tdGV4dFwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L3NwYW4+XG5cbjxub3ZvLXBzZXVkby1jaGVja2JveCAqbmdJZj1cIiFtdWx0aXBsZSAmJiBzZWxlY3RlZFwiIGNsYXNzPVwibm92by1vcHRpb24tcHNldWRvLWNoZWNrYm94XCIgc3RhdGU9XCJjaGVja2VkXCIgc2hhcGU9XCJsaW5lXCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+PC9ub3ZvLXBzZXVkby1jaGVja2JveD5cblxuPCEtLSBTZWUgYTExeSBub3RlcyBpbnNpZGUgb3B0Z3JvdXAudHMgZm9yIGNvbnRleHQgYmVoaW5kIHRoaXMgZWxlbWVudC4gLS0+XG48c3BhbiBjbGFzcz1cImNkay12aXN1YWxseS1oaWRkZW5cIiAqbmdJZj1cImdyb3VwICYmIGdyb3VwLl9pbmVydFwiPih7eyBncm91cC5sYWJlbCB9fSk8L3NwYW4+Il19