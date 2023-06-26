var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// NG2
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, ViewChild, } from '@angular/core';
// Vendor
import { merge, of, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// App
import { NovoButtonElement } from 'novo-elements/elements/button';
import { mixinDisabled, mixinOverlay, mixinTabIndex, NovoOptgroup, NovoOption, NovoOverlayTemplateComponent, _countGroupLabelsBeforeOption, _getOptionScrollPosition, } from 'novo-elements/elements/common';
import { BooleanInput, notify } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/elements/common";
export class NovoDropDownTrigger {
    constructor(element) {
        this.element = element;
    }
}
NovoDropDownTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropDownTrigger, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoDropDownTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDropDownTrigger, selector: "[dropdownTrigger]", host: { classAttribute: "novo-dropdown-trigger" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropDownTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: '[dropdownTrigger]',
                    host: {
                        class: 'novo-dropdown-trigger',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
// Create Base Class from Mixins
// Boilerplate for applying mixins
class NovoDropdownBase {
    constructor() { }
}
const NovoDropdowMixins = mixinOverlay(mixinTabIndex(mixinDisabled(NovoDropdownBase), 1));
export class NovoDropdownElement extends NovoDropdowMixins {
    constructor(element, ref) {
        super();
        this.element = element;
        this.ref = ref;
        this.parentScrollAction = 'close';
        this.side = 'default';
        this.scrollStrategy = 'reposition';
        /**
         * Keep dropdown open after an item is selected
         */
        this.keepOpen = false;
        this.width = -1; // Defaults to dynamic width (no hardcoded width value and no host width lookup)
        this.appendToBody = false; // Deprecated
        this.toggled = new EventEmitter();
        this._selectedOptionChanges = Subscription.EMPTY;
        /** The Subject to complete all subscriptions when destroyed. */
        this._onDestroy = new Subject();
        this._multiple = false;
        this.clickHandler = this.togglePanel.bind(this);
        this.closeHandler = this.closePanel.bind(this);
    }
    /** Whether the user should be allowed to select multiple options. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    get button() {
        return this._trigger || this._button;
    }
    ngOnInit() {
        if (this.appendToBody) {
            notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
        }
    }
    ngAfterContentInit() {
        // Add a click handler to the button to toggle the menu
        this.button.element.nativeElement.addEventListener('click', this.clickHandler);
        this.button.element.nativeElement.tabIndex = -1;
        this.options.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this._initKeyManager();
            this._watchSelectionEvents();
        });
        this._initKeyManager();
        this._watchSelectionEvents();
        this.focus();
    }
    ngAfterViewInit() {
        this._watchPanelEvents();
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
        // Remove listener
        if (this.button) {
            this.button.element.nativeElement.removeEventListener('click', this.clickHandler);
        }
    }
    focus(options) {
        if (!this.disabled) {
            this.element.nativeElement.focus(options);
        }
    }
    set items(items) {
        // this._items = items;
        // this.activeIndex = -1;
        // // Get the innerText of all the items to allow for searching
        // this._textItems = items.map((item: NovoItemElement) => {
        //   return item.element.nativeElement.innerText;
        // });
    }
    /** Handles all keydown events on the select. */
    _handleKeydown(event) {
        if (!this.disabled) {
            this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
        }
    }
    /** Handles keyboard events while the select is closed. */
    _handleClosedKeydown(event) {
        const key = event.key;
        const isArrowKey = key === "ArrowDown" /* ArrowDown */ || key === "ArrowUp" /* ArrowUp */ || key === "ArrowLeft" /* ArrowLeft */ || key === "ArrowRight" /* ArrowRight */;
        const isOpenKey = key === "Enter" /* Enter */ || key === " " /* Space */;
        const manager = this._keyManager;
        // Open the select on ALT + arrow key to match the native <select>
        if ((!manager.isTyping() && isOpenKey && !hasModifierKey(event)) || ((this.multiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.openPanel();
        }
    }
    /** Handles keyboard events when the selected is open. */
    _handleOpenKeydown(event) {
        const manager = this._keyManager;
        const key = event.key;
        const isArrowKey = key === "ArrowDown" /* ArrowDown */ || key === "ArrowUp" /* ArrowUp */;
        const isTyping = manager.isTyping();
        const isInputField = event.target;
        if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.closePanel();
            // Don't do anything in this case if the user is typing,
            // because the typing sequence can include the space key.
        }
        else if (!isTyping && (key === "Enter" /* Enter */ || key === " " /* Space */) && manager.activeItem && !hasModifierKey(event)) {
            event.preventDefault();
            this._multiple ? manager.activeItem._selectViaInteraction() : manager.activeItem._clickViaInteraction();
        }
        else if (!isTyping && this._multiple && ['a', 'A'].includes(key) && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = this.options.some((opt) => !opt.disabled && !opt.selected);
            this.options.forEach((option) => {
                if (!option.disabled) {
                    hasDeselectedOptions ? option.select() : option.deselect();
                }
            });
        }
        else if ("Escape" /* Escape */ === key) {
            this.closePanel();
        }
        else {
            const previouslyFocusedIndex = manager.activeItemIndex;
            manager.onKeydown(event);
            if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem && manager.activeItemIndex !== previouslyFocusedIndex) {
                manager.activeItem._selectViaInteraction();
            }
        }
    }
    _watchPanelEvents() {
        const panelStateChanges = merge(this.overlay.opening, this.overlay.closing);
        panelStateChanges.pipe(takeUntil(this._onDestroy)).subscribe((event) => this.toggled.emit(event));
    }
    _watchSelectionEvents() {
        const selectionEvents = this.options ? merge(...this.options.map((option) => option.onSelectionChange)) : of();
        this._selectedOptionChanges.unsubscribe();
        this._selectedOptionChanges = selectionEvents.pipe(takeUntil(this._onDestroy)).subscribe((event) => {
            // this.handleSelection(event.source, event.isUserInput);
            if (event.isUserInput && !this.multiple) {
                this._clearPreviousSelectedOption(this._keyManager.activeItem);
                if (!this.keepOpen && this.panelOpen) {
                    this.closePanel();
                    this.focus();
                }
            }
        });
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    _clearPreviousSelectedOption(skip) {
        this.options.forEach((option) => {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        });
    }
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    _initKeyManager() {
        this._keyManager = new ActiveDescendantKeyManager(this.options).withTypeAhead(250).withHomeAndEnd();
        // .withAllowedModifierKeys(['shiftKey']);
        this._keyManager.tabOut.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            if (this.panelOpen) {
                // Restore focus to the trigger before closing. Ensures that the focus
                // position won't be lost if the user got focus into the overlay.
                this.focus();
                this.closePanel();
            }
        });
        this._keyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            if (this.panelOpen && this.overlay) {
                this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0);
            }
        });
    }
    /** Scrolls the active option into view. */
    _scrollOptionIntoView(index) {
        const labelCount = _countGroupLabelsBeforeOption(index, this.options, this.optionGroups);
        const itemHeight = this._getItemHeight();
        this.panel.nativeElement.scrollTop = _getOptionScrollPosition((index + labelCount) * itemHeight, itemHeight, this.panel.nativeElement.scrollTop, this.panel.nativeElement.offsetHeight);
    }
    /** Calculates the height of the select's options. */
    _getItemHeight() {
        let [first] = this.options;
        if (first) {
            return first._getHostElement().offsetHeight;
        }
        return 0;
    }
}
NovoDropdownElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoDropdownElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDropdownElement, selector: "novo-dropdown", inputs: { parentScrollSelector: "parentScrollSelector", parentScrollAction: "parentScrollAction", containerClass: "containerClass", side: "side", scrollStrategy: "scrollStrategy", keepOpen: "keepOpen", height: "height", width: "width", appendToBody: "appendToBody", multiple: "multiple" }, outputs: { toggled: "toggled" }, host: { listeners: { "keydown": "_handleKeydown($event)" }, properties: { "attr.tabIndex": "disabled ? -1 : 0" } }, queries: [{ propertyName: "_button", first: true, predicate: NovoButtonElement, descendants: true }, { propertyName: "_trigger", first: true, predicate: NovoDropDownTrigger, descendants: true }, { propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "options", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-content select="button,novo-button,[dropdownTrigger]" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div #panel class="dropdown-container {{ containerClass }}" [style.height.px]="height" [class.has-height]="!!height">
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `, isInline: true, components: [{ type: i1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDropdownElement.prototype, "keepOpen", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-dropdown',
                    template: `
    <ng-content select="button,novo-button,[dropdownTrigger]" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div #panel class="dropdown-container {{ containerClass }}" [style.height.px]="height" [class.has-height]="!!height">
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `,
                    // providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoDropdownElement }],
                    host: {
                        '[attr.tabIndex]': 'disabled ? -1 : 0',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { parentScrollSelector: [{
                type: Input
            }], parentScrollAction: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], side: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], keepOpen: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], appendToBody: [{
                type: Input
            }], toggled: [{
                type: Output
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }], _button: [{
                type: ContentChild,
                args: [NovoButtonElement]
            }], _trigger: [{
                type: ContentChild,
                args: [NovoDropDownTrigger]
            }], optionGroups: [{
                type: ContentChildren,
                args: [NovoOptgroup, { descendants: true }]
            }], options: [{
                type: ContentChildren,
                args: [NovoOption, { descendants: true }]
            }], panel: [{
                type: ViewChild,
                args: ['panel']
            }], multiple: [{
                type: Input
            }], _handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
// Deprecated below here ---------------------------
export class NovoItemElement {
    constructor(dropdown, element) {
        this.dropdown = dropdown;
        this.element = element;
        this.keepOpen = false;
        this.action = new EventEmitter();
        this.active = false;
        notify(`'item' element has been deprecated. Please use 'novo-option' and 'novo-optgroup'.`);
    }
    onClick(event) {
        // Poor man's disable
        if (!this.disabled) {
            // Close if keepOpen is false
            if (!this.keepOpen) {
                this.dropdown.closePanel();
            }
            // Emit the action
            this.action.emit({ originalEvent: event });
        }
    }
}
NovoItemElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemElement, deps: [{ token: NovoDropdownElement }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoItemElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoItemElement, selector: "item", inputs: { disabled: "disabled", keepOpen: "keepOpen" }, outputs: { action: "action" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class.disabled": "disabled", "class.active": "active" } }, ngImport: i0, template: '<novo-option><ng-content></ng-content></novo-option>', isInline: true, components: [{ type: i1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item',
                    template: '<novo-option><ng-content></ng-content></novo-option>',
                    host: {
                        '[class.disabled]': 'disabled',
                        '[class.active]': 'active',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NovoDropdownElement }, { type: i0.ElementRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], keepOpen: [{
                type: Input
            }], action: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class NovoDropdownListElement {
    constructor(dropdown) {
        this.dropdown = dropdown;
        notify(`'list' element has been deprecated. Please use novo-option and novo-optgroup.`);
    }
    ngAfterContentInit() {
        this.dropdown.items = this.items;
        this.items.changes.subscribe(() => {
            this.dropdown.items = this.items;
        });
    }
}
NovoDropdownListElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownListElement, deps: [{ token: NovoDropdownElement }], target: i0.ɵɵFactoryTarget.Component });
NovoDropdownListElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDropdownListElement, selector: "list", queries: [{ propertyName: "items", predicate: NovoItemElement }], ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownListElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'list',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: NovoDropdownElement }]; }, propDecorators: { items: [{
                type: ContentChildren,
                args: [NovoItemElement]
            }] } });
export class NovoDropDownItemHeaderElement {
    constructor() {
        notify(`'dropdown-item-header' element has been deprecated. Please use novo-option and novo-optgroup.`);
    }
}
NovoDropDownItemHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropDownItemHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoDropDownItemHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDropDownItemHeaderElement, selector: "dropdown-item-header", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropDownItemHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'dropdown-item-header',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kcm9wZG93bi9Ecm9wZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixTQUFTO0FBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFJTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixZQUFZLEVBQ1osVUFBVSxFQUVWLDRCQUE0QixFQUM1Qiw2QkFBNkIsRUFDN0Isd0JBQXdCLEdBQ3pCLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLFlBQVksRUFBTyxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBUWhFLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFBbUIsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtJQUFHLENBQUM7O2lI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LFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLE1BQU07b0JBQ2hCLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3RDOzBEQUsrQixtQkFBbUIsMEJBRjFDLEtBQUs7c0JBRFgsZUFBZTt1QkFBQyxlQUFlOztBQW1CbEMsTUFBTSxPQUFPLDZCQUE2QjtJQUN4QztRQUNFLE1BQU0sQ0FBQywrRkFBK0YsQ0FBQyxDQUFDO0lBQzFHLENBQUM7OzJIQUhVLDZCQUE2QjsrR0FBN0IsNkJBQTZCLDREQUY5QiwyQkFBMkI7NEZBRTFCLDZCQUE2QjtrQkFKekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsMkJBQTJCO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgaGFzTW9kaWZpZXJLZXkgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IG1lcmdlLCBvZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBBcHBcbmltcG9ydCB7IE5vdm9CdXR0b25FbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9idXR0b24nO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIEhhc092ZXJsYXlDdG9yLFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluT3ZlcmxheSxcbiAgbWl4aW5UYWJJbmRleCxcbiAgTm92b09wdGdyb3VwLFxuICBOb3ZvT3B0aW9uLFxuICBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlLFxuICBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50LFxuICBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxufSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIEtleSwgbm90aWZ5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkcm9wZG93blRyaWdnZXJdJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1kcm9wZG93bi10cmlnZ2VyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3BEb3duVHJpZ2dlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyBDcmVhdGUgQmFzZSBDbGFzcyBmcm9tIE1peGluc1xuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGluc1xuY2xhc3MgTm92b0Ryb3Bkb3duQmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbmNvbnN0IE5vdm9Ecm9wZG93TWl4aW5zOiBIYXNPdmVybGF5Q3RvciAmIENhbkRpc2FibGVDdG9yICYgSGFzVGFiSW5kZXhDdG9yICYgdHlwZW9mIE5vdm9Ecm9wZG93bkJhc2UgPSBtaXhpbk92ZXJsYXkoXG4gIG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChOb3ZvRHJvcGRvd25CYXNlKSwgMSksXG4pO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRyb3Bkb3duJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJidXR0b24sbm92by1idXR0b24sW2Ryb3Bkb3duVHJpZ2dlcl1cIiAjdHJpZ2dlcj48L25nLWNvbnRlbnQ+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cImVsZW1lbnRcIiBbd2lkdGhdPVwid2lkdGhcIiBbcG9zaXRpb25dPVwic2lkZVwiIFtzY3JvbGxTdHJhdGVneV09XCJzY3JvbGxTdHJhdGVneVwiPlxuICAgICAgPGRpdiAjcGFuZWwgY2xhc3M9XCJkcm9wZG93bi1jb250YWluZXIge3sgY29udGFpbmVyQ2xhc3MgfX1cIiBbc3R5bGUuaGVpZ2h0LnB4XT1cImhlaWdodFwiIFtjbGFzcy5oYXMtaGVpZ2h0XT1cIiEhaGVpZ2h0XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbm92by1vdmVybGF5LXRlbXBsYXRlPlxuICBgLFxuICAvLyBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBOb3ZvRHJvcGRvd25FbGVtZW50IH1dLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLnRhYkluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogMCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wZG93bkVsZW1lbnQgZXh0ZW5kcyBOb3ZvRHJvcGRvd01peGlucyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgcGFyZW50U2Nyb2xsU2VsZWN0b3I6IHN0cmluZztcbiAgQElucHV0KClcbiAgcGFyZW50U2Nyb2xsQWN0aW9uOiBzdHJpbmcgPSAnY2xvc2UnO1xuICBASW5wdXQoKVxuICBjb250YWluZXJDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzaWRlOlxuICAgIHwgJ2RlZmF1bHQnXG4gICAgfCAncmlnaHQnXG4gICAgfCAnYWJvdmUtYmVsb3cnXG4gICAgfCAncmlnaHQtYWJvdmUtYmVsb3cnXG4gICAgfCAnY2VudGVyJ1xuICAgIHwgJ2JvdHRvbSdcbiAgICB8ICdib3R0b20tbGVmdCdcbiAgICB8ICdib3R0b20tcmlnaHQnXG4gICAgfCAndG9wLWxlZnQnXG4gICAgfCAndG9wLXJpZ2h0JyA9ICdkZWZhdWx0JztcbiAgQElucHV0KClcbiAgc2Nyb2xsU3RyYXRlZ3k6ICdyZXBvc2l0aW9uJyB8ICdibG9jaycgfCAnY2xvc2UnID0gJ3JlcG9zaXRpb24nO1xuXG4gIC8qKlxuICAgKiBLZWVwIGRyb3Bkb3duIG9wZW4gYWZ0ZXIgYW4gaXRlbSBpcyBzZWxlY3RlZFxuICAgKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGtlZXBPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpXG4gIHdpZHRoOiBudW1iZXIgPSAtMTsgLy8gRGVmYXVsdHMgdG8gZHluYW1pYyB3aWR0aCAobm8gaGFyZGNvZGVkIHdpZHRoIHZhbHVlIGFuZCBubyBob3N0IHdpZHRoIGxvb2t1cClcbiAgQElucHV0KClcbiAgYXBwZW5kVG9Cb2R5OiBib29sZWFuID0gZmFsc2U7IC8vIERlcHJlY2F0ZWRcbiAgQE91dHB1dCgpXG4gIHRvZ2dsZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXG4gIG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChOb3ZvQnV0dG9uRWxlbWVudClcbiAgX2J1dHRvbjogTm92b0J1dHRvbkVsZW1lbnQ7XG4gIEBDb250ZW50Q2hpbGQoTm92b0Ryb3BEb3duVHJpZ2dlcilcbiAgX3RyaWdnZXI6IE5vdm9Ecm9wRG93blRyaWdnZXI7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0Z3JvdXAsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8Tm92b09wdGdyb3VwPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIG9wdGlvbnM6IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPjtcbiAgQFZpZXdDaGlsZCgncGFuZWwnKVxuICBwYW5lbDogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIGNsaWNrSGFuZGxlcjogYW55O1xuICBwcml2YXRlIGNsb3NlSGFuZGxlcjogYW55O1xuICBwcml2YXRlIF9zZWxlY3RlZE9wdGlvbkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIC8qKiBUaGUgU3ViamVjdCB0byBjb21wbGV0ZSBhbGwgc3Vic2NyaXB0aW9ucyB3aGVuIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSBfb25EZXN0cm95OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgLyoqIFRoZSBGb2N1c0tleU1hbmFnZXIgd2hpY2ggaGFuZGxlcyBmb2N1cy4gKi9cbiAgcHJpdmF0ZSBfa2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgc2hvdWxkIGJlIGFsbG93ZWQgdG8gc2VsZWN0IG11bHRpcGxlIG9wdGlvbnMuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gIH1cbiAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGJ1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlciB8fCB0aGlzLl9idXR0b247XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlUGFuZWwuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsb3NlSGFuZGxlciA9IHRoaXMuY2xvc2VQYW5lbC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgbm90aWZ5KGAnYXBwZW5kVG9Cb2R5JyBoYXMgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgcmVtb3ZlIHRoaXMgYXR0cmlidXRlLmApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gQWRkIGEgY2xpY2sgaGFuZGxlciB0byB0aGUgYnV0dG9uIHRvIHRvZ2dsZSB0aGUgbWVudVxuICAgIHRoaXMuYnV0dG9uLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLmJ1dHRvbi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGFiSW5kZXggPSAtMTtcbiAgICB0aGlzLm9wdGlvbnMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5faW5pdEtleU1hbmFnZXIoKTtcbiAgICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5faW5pdEtleU1hbmFnZXIoKTtcbiAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fd2F0Y2hQYW5lbEV2ZW50cygpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgLy8gUmVtb3ZlIGxpc3RlbmVyXG4gICAgaWYgKHRoaXMuYnV0dG9uKSB7XG4gICAgICB0aGlzLmJ1dHRvbi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBpdGVtcyhpdGVtczogUXVlcnlMaXN0PE5vdm9JdGVtRWxlbWVudD4pIHtcbiAgICAvLyB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgIC8vIHRoaXMuYWN0aXZlSW5kZXggPSAtMTtcbiAgICAvLyAvLyBHZXQgdGhlIGlubmVyVGV4dCBvZiBhbGwgdGhlIGl0ZW1zIHRvIGFsbG93IGZvciBzZWFyY2hpbmdcbiAgICAvLyB0aGlzLl90ZXh0SXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW06IE5vdm9JdGVtRWxlbWVudCkgPT4ge1xuICAgIC8vICAgcmV0dXJuIGl0ZW0uZWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVyVGV4dDtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGFsbCBrZXlkb3duIGV2ZW50cyBvbiB0aGUgc2VsZWN0LiAqL1xuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMucGFuZWxPcGVuID8gdGhpcy5faGFuZGxlT3BlbktleWRvd24oZXZlbnQpIDogdGhpcy5faGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIHdoaWxlIHRoZSBzZWxlY3QgaXMgY2xvc2VkLiAqL1xuICBwcml2YXRlIF9oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXkgPT09IEtleS5BcnJvd0Rvd24gfHwga2V5ID09PSBLZXkuQXJyb3dVcCB8fCBrZXkgPT09IEtleS5BcnJvd0xlZnQgfHwga2V5ID09PSBLZXkuQXJyb3dSaWdodDtcbiAgICBjb25zdCBpc09wZW5LZXkgPSBrZXkgPT09IEtleS5FbnRlciB8fCBrZXkgPT09IEtleS5TcGFjZTtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcbiAgICAvLyBPcGVuIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICBpZiAoKCFtYW5hZ2VyLmlzVHlwaW5nKCkgJiYgaXNPcGVuS2V5ICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHx8ICgodGhpcy5tdWx0aXBsZSB8fCBldmVudC5hbHRLZXkpICYmIGlzQXJyb3dLZXkpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIHdoZW4gdGhlIHNlbGVjdGVkIGlzIG9wZW4uICovXG4gIHByaXZhdGUgX2hhbmRsZU9wZW5LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbWFuYWdlciA9IHRoaXMuX2tleU1hbmFnZXI7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXkgPT09IEtleS5BcnJvd0Rvd24gfHwga2V5ID09PSBLZXkuQXJyb3dVcDtcbiAgICBjb25zdCBpc1R5cGluZyA9IG1hbmFnZXIuaXNUeXBpbmcoKTtcbiAgICBjb25zdCBpc0lucHV0RmllbGQgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKGlzQXJyb3dLZXkgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAvLyBDbG9zZSB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpbiB0aGlzIGNhc2UgaWYgdGhlIHVzZXIgaXMgdHlwaW5nLFxuICAgICAgLy8gYmVjYXVzZSB0aGUgdHlwaW5nIHNlcXVlbmNlIGNhbiBpbmNsdWRlIHRoZSBzcGFjZSBrZXkuXG4gICAgfSBlbHNlIGlmICghaXNUeXBpbmcgJiYgKGtleSA9PT0gS2V5LkVudGVyIHx8IGtleSA9PT0gS2V5LlNwYWNlKSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0gJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX211bHRpcGxlID8gbWFuYWdlci5hY3RpdmVJdGVtLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpIDogbWFuYWdlci5hY3RpdmVJdGVtLl9jbGlja1ZpYUludGVyYWN0aW9uKCk7XG4gICAgfSBlbHNlIGlmICghaXNUeXBpbmcgJiYgdGhpcy5fbXVsdGlwbGUgJiYgWydhJywgJ0EnXS5pbmNsdWRlcyhrZXkpICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBoYXNEZXNlbGVjdGVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5zb21lKChvcHQpID0+ICFvcHQuZGlzYWJsZWQgJiYgIW9wdC5zZWxlY3RlZCk7XG4gICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmICghb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgaGFzRGVzZWxlY3RlZE9wdGlvbnMgPyBvcHRpb24uc2VsZWN0KCkgOiBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChLZXkuRXNjYXBlID09PSBrZXkpIHtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEluZGV4ID0gbWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG4gICAgICBtYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICBpZiAodGhpcy5fbXVsdGlwbGUgJiYgaXNBcnJvd0tleSAmJiBldmVudC5zaGlmdEtleSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0gJiYgbWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT09IHByZXZpb3VzbHlGb2N1c2VkSW5kZXgpIHtcbiAgICAgICAgbWFuYWdlci5hY3RpdmVJdGVtLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoUGFuZWxFdmVudHMoKSB7XG4gICAgY29uc3QgcGFuZWxTdGF0ZUNoYW5nZXMgPSBtZXJnZSh0aGlzLm92ZXJsYXkub3BlbmluZywgdGhpcy5vdmVybGF5LmNsb3NpbmcpO1xuICAgIHBhbmVsU3RhdGVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoZXZlbnQ6IGJvb2xlYW4pID0+IHRoaXMudG9nZ2xlZC5lbWl0KGV2ZW50KSk7XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFNlbGVjdGlvbkV2ZW50cygpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25FdmVudHMgPSB0aGlzLm9wdGlvbnMgPyBtZXJnZSguLi50aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpIDogb2YoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMgPSBzZWxlY3Rpb25FdmVudHMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKChldmVudDogTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSkgPT4ge1xuICAgICAgLy8gdGhpcy5oYW5kbGVTZWxlY3Rpb24oZXZlbnQuc291cmNlLCBldmVudC5pc1VzZXJJbnB1dCk7XG4gICAgICBpZiAoZXZlbnQuaXNVc2VySW5wdXQgJiYgIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5fY2xlYXJQcmV2aW91c1NlbGVjdGVkT3B0aW9uKHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSk7XG4gICAgICAgIGlmICghdGhpcy5rZWVwT3BlbiAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb25cbiAgICovXG4gIHByaXZhdGUgX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihza2lwOiBOb3ZvT3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgaWYgKG9wdGlvbiAhPT0gc2tpcCAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2V0cyB1cCBhIGtleSBtYW5hZ2VyIHRvIGxpc3RlbiB0byBrZXlib2FyZCBldmVudHMgb24gdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gIHByaXZhdGUgX2luaXRLZXlNYW5hZ2VyKCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5vcHRpb25zKS53aXRoVHlwZUFoZWFkKDI1MCkud2l0aEhvbWVBbmRFbmQoKTtcbiAgICAvLyAud2l0aEFsbG93ZWRNb2RpZmllcktleXMoWydzaGlmdEtleSddKTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIudGFiT3V0LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgLy8gUmVzdG9yZSBmb2N1cyB0byB0aGUgdHJpZ2dlciBiZWZvcmUgY2xvc2luZy4gRW5zdXJlcyB0aGF0IHRoZSBmb2N1c1xuICAgICAgICAvLyBwb3NpdGlvbiB3b24ndCBiZSBsb3N0IGlmIHRoZSB1c2VyIGdvdCBmb2N1cyBpbnRvIHRoZSBvdmVybGF5LlxuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fa2V5TWFuYWdlci5jaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiB0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsT3B0aW9uSW50b1ZpZXcodGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2Nyb2xscyB0aGUgYWN0aXZlIG9wdGlvbiBpbnRvIHZpZXcuICovXG4gIHByb3RlY3RlZCBfc2Nyb2xsT3B0aW9uSW50b1ZpZXcoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxhYmVsQ291bnQgPSBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbihpbmRleCwgdGhpcy5vcHRpb25zLCB0aGlzLm9wdGlvbkdyb3Vwcyk7XG4gICAgY29uc3QgaXRlbUhlaWdodCA9IHRoaXMuX2dldEl0ZW1IZWlnaHQoKTtcbiAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgKGluZGV4ICsgbGFiZWxDb3VudCkgKiBpdGVtSGVpZ2h0LFxuICAgICAgaXRlbUhlaWdodCxcbiAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICk7XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBzZWxlY3QncyBvcHRpb25zLiAqL1xuICBwcml2YXRlIF9nZXRJdGVtSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IFtmaXJzdF0gPSB0aGlzLm9wdGlvbnM7XG4gICAgaWYgKGZpcnN0KSB7XG4gICAgICByZXR1cm4gZmlyc3QuX2dldEhvc3RFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG4vLyBEZXByZWNhdGVkIGJlbG93IGhlcmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0ZW0nLFxuICB0ZW1wbGF0ZTogJzxub3ZvLW9wdGlvbj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9ub3ZvLW9wdGlvbj4nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbUVsZW1lbnQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBrZWVwT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KClcbiAgcHVibGljIGFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHJvcGRvd246IE5vdm9Ecm9wZG93bkVsZW1lbnQsIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgbm90aWZ5KGAnaXRlbScgZWxlbWVudCBoYXMgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgdXNlICdub3ZvLW9wdGlvbicgYW5kICdub3ZvLW9wdGdyb3VwJy5gKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgLy8gUG9vciBtYW4ncyBkaXNhYmxlXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAvLyBDbG9zZSBpZiBrZWVwT3BlbiBpcyBmYWxzZVxuICAgICAgaWYgKCF0aGlzLmtlZXBPcGVuKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uY2xvc2VQYW5lbCgpO1xuICAgICAgfVxuICAgICAgLy8gRW1pdCB0aGUgYWN0aW9uXG4gICAgICB0aGlzLmFjdGlvbi5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfSk7XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpc3QnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHJvcGRvd25MaXN0RWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9JdGVtRWxlbWVudClcbiAgcHVibGljIGl0ZW1zOiBRdWVyeUxpc3Q8Tm92b0l0ZW1FbGVtZW50PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRyb3Bkb3duOiBOb3ZvRHJvcGRvd25FbGVtZW50KSB7XG4gICAgbm90aWZ5KGAnbGlzdCcgZWxlbWVudCBoYXMgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG5vdm8tb3B0aW9uIGFuZCBub3ZvLW9wdGdyb3VwLmApO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyb3Bkb3duLml0ZW1zID0gdGhpcy5pdGVtcztcbiAgICB0aGlzLml0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuZHJvcGRvd24uaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgIH0pO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Ryb3Bkb3duLWl0ZW0taGVhZGVyJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3BEb3duSXRlbUhlYWRlckVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBub3RpZnkoYCdkcm9wZG93bi1pdGVtLWhlYWRlcicgZWxlbWVudCBoYXMgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG5vdm8tb3B0aW9uIGFuZCBub3ZvLW9wdGdyb3VwLmApO1xuICB9XG59XG4iXX0=