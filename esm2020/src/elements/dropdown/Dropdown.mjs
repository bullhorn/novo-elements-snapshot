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
import { BooleanInput } from '../../utils';
import { notify } from '../../utils/notifier/notifier.util';
import { NovoButtonElement } from '../button';
import { mixinDisabled, mixinOverlay, mixinTabIndex, NovoOptgroup, NovoOption, _countGroupLabelsBeforeOption, _getOptionScrollPosition, } from '../common';
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import * as i0 from "@angular/core";
import * as i1 from "../common/overlay/Overlay";
import * as i2 from "../common/option/option.component";
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
NovoItemElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoItemElement, selector: "item", inputs: { disabled: "disabled", keepOpen: "keepOpen" }, outputs: { action: "action" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class.disabled": "disabled", "class.active": "active" } }, ngImport: i0, template: '<novo-option><ng-content></ng-content></novo-option>', isInline: true, components: [{ type: i2.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kcm9wZG93bi9Ecm9wZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixTQUFTO0FBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUczQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlDLE9BQU8sRUFJTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixZQUFZLEVBQ1osVUFBVSxFQUVWLDZCQUE2QixFQUM3Qix3QkFBd0IsR0FDekIsTUFBTSxXQUFXLENBQUM7QUFDbkIsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFRekUsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFtQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQUcsQ0FBQzs7aUhBRC9CLG1CQUFtQjtxR0FBbkIsbUJBQW1COzRGQUFuQixtQkFBbUI7a0JBTi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSx1QkFBdUI7cUJBQy9CO2lCQUNGOztBQUtELGdDQUFnQztBQUNoQyxrQ0FBa0M7QUFDbEMsTUFBTSxnQkFBZ0I7SUFDcEIsZ0JBQWUsQ0FBQztDQUNqQjtBQUNELE1BQU0saUJBQWlCLEdBQWdGLFlBQVksQ0FDakgsYUFBYSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNsRCxDQUFDO0FBaUJGLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxpQkFBaUI7SUEyRXhELFlBQW1CLE9BQW1CLEVBQVUsR0FBc0I7UUFDcEUsS0FBSyxFQUFFLENBQUM7UUFEUyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF2RXRFLHVCQUFrQixHQUFXLE9BQU8sQ0FBQztRQUlyQyxTQUFJLEdBVWMsU0FBUyxDQUFDO1FBRTVCLG1CQUFjLEdBQXFDLFlBQVksQ0FBQztRQUVoRTs7V0FFRztRQUdILGFBQVEsR0FBWSxLQUFLLENBQUM7UUFLMUIsVUFBSyxHQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0ZBQWdGO1FBRXBHLGlCQUFZLEdBQVksS0FBSyxDQUFDLENBQUMsYUFBYTtRQUU1QyxZQUFPLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFtQnJELDJCQUFzQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDcEQsZ0VBQWdFO1FBQ3hELGVBQVUsR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQVkxQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBUWpDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBbEJELHFFQUFxRTtJQUNyRSxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBR0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdkMsQ0FBQztJQVFNLFFBQVE7UUFDYixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsTUFBTSxDQUFDLG1FQUFtRSxDQUFDLENBQUM7U0FDN0U7SUFDSCxDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNuRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVNLGVBQWU7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNCLGtCQUFrQjtRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuRjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBc0I7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUVELElBQVcsS0FBSyxDQUFDLEtBQWlDO1FBQ2hELHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsK0RBQStEO1FBQy9ELDJEQUEyRDtRQUMzRCxpREFBaUQ7UUFDakQsTUFBTTtJQUNSLENBQUM7SUFFRCxnREFBZ0Q7SUFFaEQsY0FBYyxDQUFDLEtBQW9CO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BGO0lBQ0gsQ0FBQztJQUVELDBEQUEwRDtJQUNsRCxvQkFBb0IsQ0FBQyxLQUFvQjtRQUMvQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLEdBQUcsZ0NBQWtCLElBQUksR0FBRyw0QkFBZ0IsSUFBSSxHQUFHLGdDQUFrQixJQUFJLEdBQUcsa0NBQW1CLENBQUM7UUFDbkgsTUFBTSxTQUFTLEdBQUcsR0FBRyx3QkFBYyxJQUFJLEdBQUcsb0JBQWMsQ0FBQztRQUN6RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2pDLGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksU0FBUyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFO1lBQ25ILEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLDREQUE0RDtZQUNwRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRUQseURBQXlEO0lBQ2pELGtCQUFrQixDQUFDLEtBQW9CO1FBQzdDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUN0QixNQUFNLFVBQVUsR0FBRyxHQUFHLGdDQUFrQixJQUFJLEdBQUcsNEJBQWdCLENBQUM7UUFDaEUsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxVQUFVLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUM5QixtRUFBbUU7WUFDbkUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQix3REFBd0Q7WUFDeEQseURBQXlEO1NBQzFEO2FBQU0sSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsd0JBQWMsSUFBSSxHQUFHLG9CQUFjLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hILEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUN6RzthQUFNLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNuRixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUNwQixvQkFBb0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQzVEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksMEJBQWUsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjthQUFNO1lBQ0wsTUFBTSxzQkFBc0IsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO1lBQ3ZELE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLGVBQWUsS0FBSyxzQkFBc0IsRUFBRTtnQkFDOUgsT0FBTyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQzVDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDL0csSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFnQyxFQUFFLEVBQUU7WUFDNUgseURBQXlEO1lBQ3pELElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNwQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDZDthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Q7O09BRUc7SUFDSyw0QkFBNEIsQ0FBQyxJQUFnQjtRQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzlCLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUN0QyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbkI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrRUFBK0U7SUFDdkUsZUFBZTtRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQTBCLENBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNoSCwwQ0FBMEM7UUFFMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3RFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsc0VBQXNFO2dCQUN0RSxpRUFBaUU7Z0JBQ2pFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDbkI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN0RSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ25FO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMkNBQTJDO0lBQ2pDLHFCQUFxQixDQUFDLEtBQWE7UUFDM0MsTUFBTSxVQUFVLEdBQUcsNkJBQTZCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQzNELENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLFVBQVUsRUFDakMsVUFBVSxFQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUN0QyxDQUFDO0lBQ0osQ0FBQztJQUVELHFEQUFxRDtJQUM3QyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzNCLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsWUFBWSxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOztpSEE5UFUsbUJBQW1CO3FHQUFuQixtQkFBbUIsaWhCQXlDaEIsaUJBQWlCLDJFQUVqQixtQkFBbUIsa0VBR2hCLFlBQVksNkRBRVosVUFBVSx5RkFWaEIsNEJBQTRCLHdKQW5EN0I7Ozs7Ozs7R0FPVDtBQWlDRDtJQURDLFlBQVksRUFBRTs7cURBQ1c7NEZBM0JmLG1CQUFtQjtrQkFmL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7b0JBQ0QsNEZBQTRGO29CQUM1RixJQUFJLEVBQUU7d0JBQ0osaUJBQWlCLEVBQUUsbUJBQW1CO3FCQUN2QztpQkFDRjtpSUFHQyxvQkFBb0I7c0JBRG5CLEtBQUs7Z0JBR04sa0JBQWtCO3NCQURqQixLQUFLO2dCQUdOLGNBQWM7c0JBRGIsS0FBSztnQkFHTixJQUFJO3NCQURILEtBQUs7Z0JBYU4sY0FBYztzQkFEYixLQUFLO2dCQVFOLFFBQVE7c0JBRlAsS0FBSztnQkFLTixNQUFNO3NCQURMLEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdOLFlBQVk7c0JBRFgsS0FBSztnQkFHTixPQUFPO3NCQUROLE1BQU07Z0JBSVAsT0FBTztzQkFETixTQUFTO3VCQUFDLDRCQUE0QjtnQkFJdkMsT0FBTztzQkFETixZQUFZO3VCQUFDLGlCQUFpQjtnQkFHL0IsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLG1CQUFtQjtnQkFJakMsWUFBWTtzQkFEWCxlQUFlO3VCQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBR3BELE9BQU87c0JBRE4sZUFBZTt1QkFBQyxVQUFVLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQUdsRCxLQUFLO3NCQURKLFNBQVM7dUJBQUMsT0FBTztnQkFhZCxRQUFRO3NCQURYLEtBQUs7Z0JBb0VOLGNBQWM7c0JBRGIsWUFBWTt1QkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBZ0lyQyxvREFBb0Q7QUFVcEQsTUFBTSxPQUFPLGVBQWU7SUFVMUIsWUFBb0IsUUFBNkIsRUFBUyxPQUFtQjtRQUF6RCxhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFOdEUsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0MsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUc3QixNQUFNLENBQUMsbUZBQW1GLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBR00sT0FBTyxDQUFDLEtBQVk7UUFDekIscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUM1QjtZQUNELGtCQUFrQjtZQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQzs7NkdBekJVLGVBQWUsa0JBVUksbUJBQW1CO2lHQVZ0QyxlQUFlLGdRQU5oQixzREFBc0Q7NEZBTXJELGVBQWU7a0JBUjNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLE1BQU07b0JBQ2hCLFFBQVEsRUFBRSxzREFBc0Q7b0JBQ2hFLElBQUksRUFBRTt3QkFDSixrQkFBa0IsRUFBRSxVQUFVO3dCQUM5QixnQkFBZ0IsRUFBRSxRQUFRO3FCQUMzQjtpQkFDRjswREFXK0IsbUJBQW1CLG1EQVIxQyxRQUFRO3NCQURkLEtBQUs7Z0JBR0MsUUFBUTtzQkFEZCxLQUFLO2dCQUdDLE1BQU07c0JBRFosTUFBTTtnQkFVQSxPQUFPO3NCQURiLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOztBQWtCbkMsTUFBTSxPQUFPLHVCQUF1QjtJQUlsQyxZQUFvQixRQUE2QjtRQUE3QixhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUMvQyxNQUFNLENBQUMsK0VBQStFLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7cUhBYlUsdUJBQXVCLGtCQUlKLG1CQUFtQjt5R0FKdEMsdUJBQXVCLGtFQUNqQixlQUFlLDZCQUh0QiwyQkFBMkI7NEZBRTFCLHVCQUF1QjtrQkFKbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsTUFBTTtvQkFDaEIsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7MERBSytCLG1CQUFtQiwwQkFGMUMsS0FBSztzQkFEWCxlQUFlO3VCQUFDLGVBQWU7O0FBbUJsQyxNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDO1FBQ0UsTUFBTSxDQUFDLCtGQUErRixDQUFDLENBQUM7SUFDMUcsQ0FBQzs7MkhBSFUsNkJBQTZCOytHQUE3Qiw2QkFBNkIsNERBRjlCLDJCQUEyQjs0RkFFMUIsNkJBQTZCO2tCQUp6QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3RDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgbWVyZ2UsIG9mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbi8vIEFwcFxuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5LWNvZGVzJztcbmltcG9ydCB7IG5vdGlmeSB9IGZyb20gJy4uLy4uL3V0aWxzL25vdGlmaWVyL25vdGlmaWVyLnV0aWwnO1xuaW1wb3J0IHsgTm92b0J1dHRvbkVsZW1lbnQgfSBmcm9tICcuLi9idXR0b24nO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIEhhc092ZXJsYXlDdG9yLFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluT3ZlcmxheSxcbiAgbWl4aW5UYWJJbmRleCxcbiAgTm92b09wdGdyb3VwLFxuICBOb3ZvT3B0aW9uLFxuICBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlLFxuICBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxufSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXknO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZHJvcGRvd25UcmlnZ2VyXScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZHJvcGRvd24tdHJpZ2dlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wRG93blRyaWdnZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge31cbn1cblxuLy8gQ3JlYXRlIEJhc2UgQ2xhc3MgZnJvbSBNaXhpbnNcbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnNcbmNsYXNzIE5vdm9Ecm9wZG93bkJhc2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG59XG5jb25zdCBOb3ZvRHJvcGRvd01peGluczogSGFzT3ZlcmxheUN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIEhhc1RhYkluZGV4Q3RvciAmIHR5cGVvZiBOb3ZvRHJvcGRvd25CYXNlID0gbWl4aW5PdmVybGF5KFxuICBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTm92b0Ryb3Bkb3duQmFzZSksIDEpLFxuKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kcm9wZG93bicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYnV0dG9uLG5vdm8tYnV0dG9uLFtkcm9wZG93blRyaWdnZXJdXCIgI3RyaWdnZXI+PC9uZy1jb250ZW50PlxuICAgIDxub3ZvLW92ZXJsYXktdGVtcGxhdGUgW3BhcmVudF09XCJlbGVtZW50XCIgW3dpZHRoXT1cIndpZHRoXCIgW3Bvc2l0aW9uXT1cInNpZGVcIiBbc2Nyb2xsU3RyYXRlZ3ldPVwic2Nyb2xsU3RyYXRlZ3lcIj5cbiAgICAgIDxkaXYgI3BhbmVsIGNsYXNzPVwiZHJvcGRvd24tY29udGFpbmVyIHt7IGNvbnRhaW5lckNsYXNzIH19XCIgW3N0eWxlLmhlaWdodC5weF09XCJoZWlnaHRcIiBbY2xhc3MuaGFzLWhlaWdodF09XCIhIWhlaWdodFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbiAgLy8gcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCB1c2VFeGlzdGluZzogTm92b0Ryb3Bkb3duRWxlbWVudCB9XSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci50YWJJbmRleF0nOiAnZGlzYWJsZWQgPyAtMSA6IDAnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHJvcGRvd25FbGVtZW50IGV4dGVuZHMgTm92b0Ryb3Bkb3dNaXhpbnMgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHBhcmVudFNjcm9sbFNlbGVjdG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHBhcmVudFNjcm9sbEFjdGlvbjogc3RyaW5nID0gJ2Nsb3NlJztcbiAgQElucHV0KClcbiAgY29udGFpbmVyQ2xhc3M6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2lkZTpcbiAgICB8ICdkZWZhdWx0J1xuICAgIHwgJ3JpZ2h0J1xuICAgIHwgJ2Fib3ZlLWJlbG93J1xuICAgIHwgJ3JpZ2h0LWFib3ZlLWJlbG93J1xuICAgIHwgJ2NlbnRlcidcbiAgICB8ICdib3R0b20nXG4gICAgfCAnYm90dG9tLWxlZnQnXG4gICAgfCAnYm90dG9tLXJpZ2h0J1xuICAgIHwgJ3RvcC1sZWZ0J1xuICAgIHwgJ3RvcC1yaWdodCcgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpXG4gIHNjcm9sbFN0cmF0ZWd5OiAncmVwb3NpdGlvbicgfCAnYmxvY2snIHwgJ2Nsb3NlJyA9ICdyZXBvc2l0aW9uJztcblxuICAvKipcbiAgICogS2VlcCBkcm9wZG93biBvcGVuIGFmdGVyIGFuIGl0ZW0gaXMgc2VsZWN0ZWRcbiAgICovXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBrZWVwT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKVxuICB3aWR0aDogbnVtYmVyID0gLTE7IC8vIERlZmF1bHRzIHRvIGR5bmFtaWMgd2lkdGggKG5vIGhhcmRjb2RlZCB3aWR0aCB2YWx1ZSBhbmQgbm8gaG9zdCB3aWR0aCBsb29rdXApXG4gIEBJbnB1dCgpXG4gIGFwcGVuZFRvQm9keTogYm9vbGVhbiA9IGZhbHNlOyAvLyBEZXByZWNhdGVkXG4gIEBPdXRwdXQoKVxuICB0b2dnbGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoTm92b0J1dHRvbkVsZW1lbnQpXG4gIF9idXR0b246IE5vdm9CdXR0b25FbGVtZW50O1xuICBAQ29udGVudENoaWxkKE5vdm9Ecm9wRG93blRyaWdnZXIpXG4gIF90cmlnZ2VyOiBOb3ZvRHJvcERvd25UcmlnZ2VyO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGdyb3VwLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE5vdm9PcHRncm91cD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBvcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG4gIEBWaWV3Q2hpbGQoJ3BhbmVsJylcbiAgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBjbGlja0hhbmRsZXI6IGFueTtcbiAgcHJpdmF0ZSBjbG9zZUhhbmRsZXI6IGFueTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRPcHRpb25DaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAvKiogVGhlIFN1YmplY3QgdG8gY29tcGxldGUgYWxsIHN1YnNjcmlwdGlvbnMgd2hlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgX29uRGVzdHJveTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG4gIC8qKiBUaGUgRm9jdXNLZXlNYW5hZ2VyIHdoaWNoIGhhbmRsZXMgZm9jdXMuICovXG4gIHByaXZhdGUgX2tleU1hbmFnZXI6IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5vdm9PcHRpb24+O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB1c2VyIHNob3VsZCBiZSBhbGxvd2VkIHRvIHNlbGVjdCBtdWx0aXBsZSBvcHRpb25zLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBidXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXIgfHwgdGhpcy5fYnV0dG9uO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZVBhbmVsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbG9zZUhhbmRsZXIgPSB0aGlzLmNsb3NlUGFuZWwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkpIHtcbiAgICAgIG5vdGlmeShgJ2FwcGVuZFRvQm9keScgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHJlbW92ZSB0aGlzIGF0dHJpYnV0ZS5gKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIEFkZCBhIGNsaWNrIGhhbmRsZXIgdG8gdGhlIGJ1dHRvbiB0byB0b2dnbGUgdGhlIG1lbnVcbiAgICB0aGlzLmJ1dHRvbi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgdGhpcy5idXR0b24uZWxlbWVudC5uYXRpdmVFbGVtZW50LnRhYkluZGV4ID0gLTE7XG4gICAgdGhpcy5vcHRpb25zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX2luaXRLZXlNYW5hZ2VyKCk7XG4gICAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgIH0pO1xuICAgIHRoaXMuX2luaXRLZXlNYW5hZ2VyKCk7XG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3dhdGNoUGFuZWxFdmVudHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIC8vIFJlbW92ZSBsaXN0ZW5lclxuICAgIGlmICh0aGlzLmJ1dHRvbikge1xuICAgICAgdGhpcy5idXR0b24uZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgaXRlbXMoaXRlbXM6IFF1ZXJ5TGlzdDxOb3ZvSXRlbUVsZW1lbnQ+KSB7XG4gICAgLy8gdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgICAvLyB0aGlzLmFjdGl2ZUluZGV4ID0gLTE7XG4gICAgLy8gLy8gR2V0IHRoZSBpbm5lclRleHQgb2YgYWxsIHRoZSBpdGVtcyB0byBhbGxvdyBmb3Igc2VhcmNoaW5nXG4gICAgLy8gdGhpcy5fdGV4dEl0ZW1zID0gaXRlbXMubWFwKChpdGVtOiBOb3ZvSXRlbUVsZW1lbnQpID0+IHtcbiAgICAvLyAgIHJldHVybiBpdGVtLmVsZW1lbnQubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG4gICAgLy8gfSk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBhbGwga2V5ZG93biBldmVudHMgb24gdGhlIHNlbGVjdC4gKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnBhbmVsT3BlbiA/IHRoaXMuX2hhbmRsZU9wZW5LZXlkb3duKGV2ZW50KSA6IHRoaXMuX2hhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGlsZSB0aGUgc2VsZWN0IGlzIGNsb3NlZC4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5ID09PSBLZXkuQXJyb3dEb3duIHx8IGtleSA9PT0gS2V5LkFycm93VXAgfHwga2V5ID09PSBLZXkuQXJyb3dMZWZ0IHx8IGtleSA9PT0gS2V5LkFycm93UmlnaHQ7XG4gICAgY29uc3QgaXNPcGVuS2V5ID0ga2V5ID09PSBLZXkuRW50ZXIgfHwga2V5ID09PSBLZXkuU3BhY2U7XG4gICAgY29uc3QgbWFuYWdlciA9IHRoaXMuX2tleU1hbmFnZXI7XG4gICAgLy8gT3BlbiB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgaWYgKCghbWFuYWdlci5pc1R5cGluZygpICYmIGlzT3BlbktleSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB8fCAoKHRoaXMubXVsdGlwbGUgfHwgZXZlbnQuYWx0S2V5KSAmJiBpc0Fycm93S2V5KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudHMgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biB3aGVuIHByZXNzaW5nIHNwYWNlXG4gICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGVuIHRoZSBzZWxlY3RlZCBpcyBvcGVuLiAqL1xuICBwcml2YXRlIF9oYW5kbGVPcGVuS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLl9rZXlNYW5hZ2VyO1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5ID09PSBLZXkuQXJyb3dEb3duIHx8IGtleSA9PT0gS2V5LkFycm93VXA7XG4gICAgY29uc3QgaXNUeXBpbmcgPSBtYW5hZ2VyLmlzVHlwaW5nKCk7XG4gICAgY29uc3QgaXNJbnB1dEZpZWxkID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmIChpc0Fycm93S2V5ICYmIGV2ZW50LmFsdEtleSkge1xuICAgICAgLy8gQ2xvc2UgdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaW4gdGhpcyBjYXNlIGlmIHRoZSB1c2VyIGlzIHR5cGluZyxcbiAgICAgIC8vIGJlY2F1c2UgdGhlIHR5cGluZyBzZXF1ZW5jZSBjYW4gaW5jbHVkZSB0aGUgc3BhY2Uga2V5LlxuICAgIH0gZWxzZSBpZiAoIWlzVHlwaW5nICYmIChrZXkgPT09IEtleS5FbnRlciB8fCBrZXkgPT09IEtleS5TcGFjZSkgJiYgbWFuYWdlci5hY3RpdmVJdGVtICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9tdWx0aXBsZSA/IG1hbmFnZXIuYWN0aXZlSXRlbS5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKSA6IG1hbmFnZXIuYWN0aXZlSXRlbS5fY2xpY2tWaWFJbnRlcmFjdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoIWlzVHlwaW5nICYmIHRoaXMuX211bHRpcGxlICYmIFsnYScsICdBJ10uaW5jbHVkZXMoa2V5KSAmJiBldmVudC5jdHJsS2V5KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgaGFzRGVzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuc29tZSgob3B0KSA9PiAhb3B0LmRpc2FibGVkICYmICFvcHQuc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAoIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgIGhhc0Rlc2VsZWN0ZWRPcHRpb25zID8gb3B0aW9uLnNlbGVjdCgpIDogb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoS2V5LkVzY2FwZSA9PT0ga2V5KSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRJbmRleCA9IG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuICAgICAgbWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgaWYgKHRoaXMuX211bHRpcGxlICYmIGlzQXJyb3dLZXkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgbWFuYWdlci5hY3RpdmVJdGVtICYmIG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEluZGV4KSB7XG4gICAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbS5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFBhbmVsRXZlbnRzKCkge1xuICAgIGNvbnN0IHBhbmVsU3RhdGVDaGFuZ2VzID0gbWVyZ2UodGhpcy5vdmVybGF5Lm9wZW5pbmcsIHRoaXMub3ZlcmxheS5jbG9zaW5nKTtcbiAgICBwYW5lbFN0YXRlQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKGV2ZW50OiBib29sZWFuKSA9PiB0aGlzLnRvZ2dsZWQuZW1pdChldmVudCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2F0Y2hTZWxlY3Rpb25FdmVudHMoKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uRXZlbnRzID0gdGhpcy5vcHRpb25zID8gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpKSA6IG9mKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzID0gc2VsZWN0aW9uRXZlbnRzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoZXZlbnQ6IE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2UpID0+IHtcbiAgICAgIC8vIHRoaXMuaGFuZGxlU2VsZWN0aW9uKGV2ZW50LnNvdXJjZSwgZXZlbnQuaXNVc2VySW5wdXQpO1xuICAgICAgaWYgKGV2ZW50LmlzVXNlcklucHV0ICYmICF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbih0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pO1xuICAgICAgICBpZiAoIXRoaXMua2VlcE9wZW4gJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oc2tpcDogTm92b09wdGlvbikge1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGlmIChvcHRpb24gIT09IHNraXAgJiYgb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNldHMgdXAgYSBrZXkgbWFuYWdlciB0byBsaXN0ZW4gdG8ga2V5Ym9hcmQgZXZlbnRzIG9uIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBwcml2YXRlIF9pbml0S2V5TWFuYWdlcigpIHtcbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5vdm9PcHRpb24+KHRoaXMub3B0aW9ucykud2l0aFR5cGVBaGVhZCgyNTApLndpdGhIb21lQW5kRW5kKCk7XG4gICAgLy8gLndpdGhBbGxvd2VkTW9kaWZpZXJLZXlzKFsnc2hpZnRLZXknXSk7XG5cbiAgICB0aGlzLl9rZXlNYW5hZ2VyLnRhYk91dC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgIC8vIFJlc3RvcmUgZm9jdXMgdG8gdGhlIHRyaWdnZXIgYmVmb3JlIGNsb3NpbmcuIEVuc3VyZXMgdGhhdCB0aGUgZm9jdXNcbiAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgdGhpcy5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbE9wdGlvbkludG9WaWV3KHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNjcm9sbHMgdGhlIGFjdGl2ZSBvcHRpb24gaW50byB2aWV3LiAqL1xuICBwcm90ZWN0ZWQgX3Njcm9sbE9wdGlvbkludG9WaWV3KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBsYWJlbENvdW50ID0gX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oaW5kZXgsIHRoaXMub3B0aW9ucywgdGhpcy5vcHRpb25Hcm91cHMpO1xuICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSB0aGlzLl9nZXRJdGVtSGVpZ2h0KCk7XG4gICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IF9nZXRPcHRpb25TY3JvbGxQb3NpdGlvbihcbiAgICAgIChpbmRleCArIGxhYmVsQ291bnQpICogaXRlbUhlaWdodCxcbiAgICAgIGl0ZW1IZWlnaHQsXG4gICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICApO1xuICB9XG5cbiAgLyoqIENhbGN1bGF0ZXMgdGhlIGhlaWdodCBvZiB0aGUgc2VsZWN0J3Mgb3B0aW9ucy4gKi9cbiAgcHJpdmF0ZSBfZ2V0SXRlbUhlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCBbZmlyc3RdID0gdGhpcy5vcHRpb25zO1xuICAgIGlmIChmaXJzdCkge1xuICAgICAgcmV0dXJuIGZpcnN0Ll9nZXRIb3N0RWxlbWVudCgpLm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxuLy8gRGVwcmVjYXRlZCBiZWxvdyBoZXJlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtJyxcbiAgdGVtcGxhdGU6ICc8bm92by1vcHRpb24+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pjwvbm92by1vcHRpb24+JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1FbGVtZW50IHtcbiAgQElucHV0KClcbiAgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBwdWJsaWMga2VlcE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBhY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRyb3Bkb3duOiBOb3ZvRHJvcGRvd25FbGVtZW50LCBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIG5vdGlmeShgJ2l0ZW0nIGVsZW1lbnQgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSAnbm92by1vcHRpb24nIGFuZCAnbm92by1vcHRncm91cCcuYCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIC8vIFBvb3IgbWFuJ3MgZGlzYWJsZVxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgLy8gQ2xvc2UgaWYga2VlcE9wZW4gaXMgZmFsc2VcbiAgICAgIGlmICghdGhpcy5rZWVwT3Blbikge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICAgIC8vIEVtaXQgdGhlIGFjdGlvblxuICAgICAgdGhpcy5hY3Rpb24uZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH0pO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaXN0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3Bkb3duTGlzdEVsZW1lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvSXRlbUVsZW1lbnQpXG4gIHB1YmxpYyBpdGVtczogUXVlcnlMaXN0PE5vdm9JdGVtRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkcm9wZG93bjogTm92b0Ryb3Bkb3duRWxlbWVudCkge1xuICAgIG5vdGlmeShgJ2xpc3QnIGVsZW1lbnQgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBub3ZvLW9wdGlvbiBhbmQgbm92by1vcHRncm91cC5gKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kcm9wZG93bi5pdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgdGhpcy5pdGVtcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmRyb3Bkb3duLml0ZW1zID0gdGhpcy5pdGVtcztcbiAgICB9KTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkcm9wZG93bi1pdGVtLWhlYWRlcicsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wRG93bkl0ZW1IZWFkZXJFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbm90aWZ5KGAnZHJvcGRvd24taXRlbS1oZWFkZXInIGVsZW1lbnQgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBub3ZvLW9wdGlvbiBhbmQgbm92by1vcHRncm91cC5gKTtcbiAgfVxufVxuIl19