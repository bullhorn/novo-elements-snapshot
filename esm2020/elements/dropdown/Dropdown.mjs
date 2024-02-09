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
        this._scrollToActiveItemOnOpen = false;
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
    /** Whether the dropdown should scroll to the active item whenever it is opened. */
    get scrollToActiveItemOnOpen() {
        return this._scrollToActiveItemOnOpen;
    }
    set scrollToActiveItemOnOpen(value) {
        this._scrollToActiveItemOnOpen = coerceBooleanProperty(value);
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
    openPanel() {
        super.openPanel();
        if (this.scrollToActiveItemOnOpen) {
            this._scrollOptionIntoView(this.findFirstSelectedOptionIndex(this.options) || 0);
        }
    }
    findFirstSelectedOptionIndex(options) {
        return options.toArray().findIndex((option) => {
            return option.selected === true;
        });
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
                event.source.select();
                if (!this.keepOpen && this.panelOpen) {
                    this.closePanel();
                    this.focus();
                }
            }
            else {
                event.source.select();
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
NovoDropdownElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDropdownElement, selector: "novo-dropdown", inputs: { parentScrollSelector: "parentScrollSelector", parentScrollAction: "parentScrollAction", containerClass: "containerClass", side: "side", scrollStrategy: "scrollStrategy", keepOpen: "keepOpen", height: "height", width: "width", appendToBody: "appendToBody", multiple: "multiple", scrollToActiveItemOnOpen: "scrollToActiveItemOnOpen" }, outputs: { toggled: "toggled" }, host: { listeners: { "keydown": "_handleKeydown($event)" }, properties: { "attr.tabIndex": "disabled ? -1 : 0" } }, queries: [{ propertyName: "_button", first: true, predicate: NovoButtonElement, descendants: true }, { propertyName: "_trigger", first: true, predicate: NovoDropDownTrigger, descendants: true }, { propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "options", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-content select="button,novo-button,[dropdownTrigger]" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div #panel class="dropdown-container {{ containerClass }}" [style.max-height.px]="height" [class.has-height]="!!height">
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{display:inline-block;position:relative;outline:none}:host ::ng-deep .novo-dropdown-trigger{cursor:pointer;-webkit-appearance:none}:host ::ng-deep button,:host ::ng-deep novo-button{position:relative;z-index:0}:host ::ng-deep button .novo-button-icon,:host ::ng-deep novo-button .novo-button-icon{font-size:.8em!important;width:1em!important;height:1em!important;margin:0 .5em}.dropdown-container{background-color:#f7f7f7;background-color:var(--background-bright, #f7f7f7);list-style:none;margin:0;padding:0;min-width:180px;margin-top:.5rem;margin-bottom:.5rem;box-shadow:0 4px 10px #00000040}.dropdown-container.has-height{overflow:auto}.dropdown-container ::ng-deep list dropdown-item-header{color:#9e9e9e;font-size:.8em;flex:1;font-weight:500;text-transform:uppercase;padding:.5rem 1rem;display:block}.dropdown-container ::ng-deep list hr{border:none;height:1px;background:#dbdbdb}.dropdown-container.novo-table-dropdown-cell ::ng-deep list{max-height:400px;display:block;overflow:auto;padding:5px 0}.dropdown-container.novo-table-dropdown-cell ::ng-deep item{height:30px!important;padding:0 16px!important}.dropdown-container.novo-table-dropdown-cell ::ng-deep item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}.dropdown-container.novo-table-dropdown-cell ::ng-deep item.active{font-weight:500}.dropdown-container.novo-table-dropdown-cell ::ng-deep dropdown-item-header{padding:0 10px!important}\n"], components: [{ type: i1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDropdownElement.prototype, "keepOpen", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NovoDropdownElement.prototype, "multiple", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-dropdown', template: `
    <ng-content select="button,novo-button,[dropdownTrigger]" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div #panel class="dropdown-container {{ containerClass }}" [style.max-height.px]="height" [class.has-height]="!!height">
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `, host: {
                        '[attr.tabIndex]': 'disabled ? -1 : 0',
                    }, styles: [":host{display:inline-block;position:relative;outline:none}:host ::ng-deep .novo-dropdown-trigger{cursor:pointer;-webkit-appearance:none}:host ::ng-deep button,:host ::ng-deep novo-button{position:relative;z-index:0}:host ::ng-deep button .novo-button-icon,:host ::ng-deep novo-button .novo-button-icon{font-size:.8em!important;width:1em!important;height:1em!important;margin:0 .5em}.dropdown-container{background-color:#f7f7f7;background-color:var(--background-bright, #f7f7f7);list-style:none;margin:0;padding:0;min-width:180px;margin-top:.5rem;margin-bottom:.5rem;box-shadow:0 4px 10px #00000040}.dropdown-container.has-height{overflow:auto}.dropdown-container ::ng-deep list dropdown-item-header{color:#9e9e9e;font-size:.8em;flex:1;font-weight:500;text-transform:uppercase;padding:.5rem 1rem;display:block}.dropdown-container ::ng-deep list hr{border:none;height:1px;background:#dbdbdb}.dropdown-container.novo-table-dropdown-cell ::ng-deep list{max-height:400px;display:block;overflow:auto;padding:5px 0}.dropdown-container.novo-table-dropdown-cell ::ng-deep item{height:30px!important;padding:0 16px!important}.dropdown-container.novo-table-dropdown-cell ::ng-deep item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}.dropdown-container.novo-table-dropdown-cell ::ng-deep item.active{font-weight:500}.dropdown-container.novo-table-dropdown-cell ::ng-deep dropdown-item-header{padding:0 10px!important}\n"] }]
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
            }], scrollToActiveItemOnOpen: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kcm9wZG93bi9Ecm9wZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixTQUFTO0FBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFJTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixZQUFZLEVBQ1osVUFBVSxFQUVWLDRCQUE0QixFQUM1Qiw2QkFBNkIsRUFDN0Isd0JBQXdCLEdBQ3pCLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLFlBQVksRUFBMkIsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQVFwRixNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQW1CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFBRyxDQUFDOztp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QUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBtZXJnZSwgb2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gQXBwXG5pbXBvcnQgeyBOb3ZvQnV0dG9uRWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvYnV0dG9uJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGVDdG9yLFxuICBIYXNPdmVybGF5Q3RvcixcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpbk92ZXJsYXksXG4gIG1peGluVGFiSW5kZXgsXG4gIE5vdm9PcHRncm91cCxcbiAgTm92b09wdGlvbixcbiAgTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSxcbiAgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCxcbiAgX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24sXG4gIF9nZXRPcHRpb25TY3JvbGxQb3NpdGlvbixcbn0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBCb29sZWFuSW5wdXRBY2NlcHQsIEtleSwgbm90aWZ5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkcm9wZG93blRyaWdnZXJdJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1kcm9wZG93bi10cmlnZ2VyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3BEb3duVHJpZ2dlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyBDcmVhdGUgQmFzZSBDbGFzcyBmcm9tIE1peGluc1xuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGluc1xuY2xhc3MgTm92b0Ryb3Bkb3duQmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbmNvbnN0IE5vdm9Ecm9wZG93TWl4aW5zOiBIYXNPdmVybGF5Q3RvciAmIENhbkRpc2FibGVDdG9yICYgSGFzVGFiSW5kZXhDdG9yICYgdHlwZW9mIE5vdm9Ecm9wZG93bkJhc2UgPSBtaXhpbk92ZXJsYXkoXG4gIG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChOb3ZvRHJvcGRvd25CYXNlKSwgMSksXG4pO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRyb3Bkb3duJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJidXR0b24sbm92by1idXR0b24sW2Ryb3Bkb3duVHJpZ2dlcl1cIiAjdHJpZ2dlcj48L25nLWNvbnRlbnQ+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cImVsZW1lbnRcIiBbd2lkdGhdPVwid2lkdGhcIiBbcG9zaXRpb25dPVwic2lkZVwiIFtzY3JvbGxTdHJhdGVneV09XCJzY3JvbGxTdHJhdGVneVwiPlxuICAgICAgPGRpdiAjcGFuZWwgY2xhc3M9XCJkcm9wZG93bi1jb250YWluZXIge3sgY29udGFpbmVyQ2xhc3MgfX1cIiBbc3R5bGUubWF4LWhlaWdodC5weF09XCJoZWlnaHRcIiBbY2xhc3MuaGFzLWhlaWdodF09XCIhIWhlaWdodFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vRHJvcGRvd24uc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLnRhYkluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogMCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wZG93bkVsZW1lbnQgZXh0ZW5kcyBOb3ZvRHJvcGRvd01peGlucyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgcGFyZW50U2Nyb2xsU2VsZWN0b3I6IHN0cmluZztcbiAgQElucHV0KClcbiAgcGFyZW50U2Nyb2xsQWN0aW9uOiBzdHJpbmcgPSAnY2xvc2UnO1xuICBASW5wdXQoKVxuICBjb250YWluZXJDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzaWRlOlxuICAgIHwgJ2RlZmF1bHQnXG4gICAgfCAncmlnaHQnXG4gICAgfCAnYWJvdmUtYmVsb3cnXG4gICAgfCAncmlnaHQtYWJvdmUtYmVsb3cnXG4gICAgfCAnY2VudGVyJ1xuICAgIHwgJ2JvdHRvbSdcbiAgICB8ICdib3R0b20tbGVmdCdcbiAgICB8ICdib3R0b20tcmlnaHQnXG4gICAgfCAndG9wLWxlZnQnXG4gICAgfCAndG9wLXJpZ2h0JyA9ICdkZWZhdWx0JztcbiAgQElucHV0KClcbiAgc2Nyb2xsU3RyYXRlZ3k6ICdyZXBvc2l0aW9uJyB8ICdibG9jaycgfCAnY2xvc2UnID0gJ3JlcG9zaXRpb24nO1xuXG4gIC8qKlxuICAgKiBLZWVwIGRyb3Bkb3duIG9wZW4gYWZ0ZXIgYW4gaXRlbSBpcyBzZWxlY3RlZFxuICAgKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGtlZXBPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9rZWVwT3BlbjogQm9vbGVhbklucHV0QWNjZXB0O1xuXG4gIEBJbnB1dCgpXG4gIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKVxuICB3aWR0aDogbnVtYmVyID0gLTE7IC8vIERlZmF1bHRzIHRvIGR5bmFtaWMgd2lkdGggKG5vIGhhcmRjb2RlZCB3aWR0aCB2YWx1ZSBhbmQgbm8gaG9zdCB3aWR0aCBsb29rdXApXG4gIEBJbnB1dCgpXG4gIGFwcGVuZFRvQm9keTogYm9vbGVhbiA9IGZhbHNlOyAvLyBEZXByZWNhdGVkXG4gIEBPdXRwdXQoKVxuICB0b2dnbGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoTm92b0J1dHRvbkVsZW1lbnQpXG4gIF9idXR0b246IE5vdm9CdXR0b25FbGVtZW50O1xuICBAQ29udGVudENoaWxkKE5vdm9Ecm9wRG93blRyaWdnZXIpXG4gIF90cmlnZ2VyOiBOb3ZvRHJvcERvd25UcmlnZ2VyO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGdyb3VwLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE5vdm9PcHRncm91cD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBvcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG4gIEBWaWV3Q2hpbGQoJ3BhbmVsJylcbiAgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBjbGlja0hhbmRsZXI6IGFueTtcbiAgcHJpdmF0ZSBjbG9zZUhhbmRsZXI6IGFueTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRPcHRpb25DaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAvKiogVGhlIFN1YmplY3QgdG8gY29tcGxldGUgYWxsIHN1YnNjcmlwdGlvbnMgd2hlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgX29uRGVzdHJveTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG4gIC8qKiBUaGUgRm9jdXNLZXlNYW5hZ2VyIHdoaWNoIGhhbmRsZXMgZm9jdXMuICovXG4gIHByaXZhdGUgX2tleU1hbmFnZXI6IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5vdm9PcHRpb24+O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB1c2VyIHNob3VsZCBiZSBhbGxvd2VkIHRvIHNlbGVjdCBtdWx0aXBsZSBvcHRpb25zLiAqL1xuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX211bHRpcGxlOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBzY3JvbGwgdG8gdGhlIGFjdGl2ZSBpdGVtIHdoZW5ldmVyIGl0IGlzIG9wZW5lZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNjcm9sbFRvQWN0aXZlSXRlbU9uT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsVG9BY3RpdmVJdGVtT25PcGVuO1xuICB9XG4gIHNldCBzY3JvbGxUb0FjdGl2ZUl0ZW1Pbk9wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zY3JvbGxUb0FjdGl2ZUl0ZW1Pbk9wZW4gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3Njcm9sbFRvQWN0aXZlSXRlbU9uT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBidXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXIgfHwgdGhpcy5fYnV0dG9uO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZVBhbmVsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbG9zZUhhbmRsZXIgPSB0aGlzLmNsb3NlUGFuZWwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkpIHtcbiAgICAgIG5vdGlmeShgJ2FwcGVuZFRvQm9keScgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHJlbW92ZSB0aGlzIGF0dHJpYnV0ZS5gKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIEFkZCBhIGNsaWNrIGhhbmRsZXIgdG8gdGhlIGJ1dHRvbiB0byB0b2dnbGUgdGhlIG1lbnVcbiAgICB0aGlzLmJ1dHRvbi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgdGhpcy5idXR0b24uZWxlbWVudC5uYXRpdmVFbGVtZW50LnRhYkluZGV4ID0gLTE7XG4gICAgdGhpcy5vcHRpb25zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX2luaXRLZXlNYW5hZ2VyKCk7XG4gICAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgIH0pO1xuICAgIHRoaXMuX2luaXRLZXlNYW5hZ2VyKCk7XG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3dhdGNoUGFuZWxFdmVudHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIC8vIFJlbW92ZSBsaXN0ZW5lclxuICAgIGlmICh0aGlzLmJ1dHRvbikge1xuICAgICAgdGhpcy5idXR0b24uZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5QYW5lbCgpOiB2b2lkIHtcbiAgICBzdXBlci5vcGVuUGFuZWwoKVxuICAgIGlmICh0aGlzLnNjcm9sbFRvQWN0aXZlSXRlbU9uT3Blbikge1xuICAgICAgdGhpcy5fc2Nyb2xsT3B0aW9uSW50b1ZpZXcodGhpcy5maW5kRmlyc3RTZWxlY3RlZE9wdGlvbkluZGV4KHRoaXMub3B0aW9ucykgfHwgMClcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRGaXJzdFNlbGVjdGVkT3B0aW9uSW5kZXgob3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+KTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIG9wdGlvbnMudG9BcnJheSgpLmZpbmRJbmRleCgob3B0aW9uOiBOb3ZvT3B0aW9uKSA9PiB7XG4gICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkID09PSB0cnVlO1xuICAgIH0pO1xuICB9XG5cblxuICBwdWJsaWMgc2V0IGl0ZW1zKGl0ZW1zOiBRdWVyeUxpc3Q8Tm92b0l0ZW1FbGVtZW50Pikge1xuICAgIC8vIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgLy8gdGhpcy5hY3RpdmVJbmRleCA9IC0xO1xuICAgIC8vIC8vIEdldCB0aGUgaW5uZXJUZXh0IG9mIGFsbCB0aGUgaXRlbXMgdG8gYWxsb3cgZm9yIHNlYXJjaGluZ1xuICAgIC8vIHRoaXMuX3RleHRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbTogTm92b0l0ZW1FbGVtZW50KSA9PiB7XG4gICAgLy8gICByZXR1cm4gaXRlbS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIC8vIH0pO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgYWxsIGtleWRvd24gZXZlbnRzIG9uIHRoZSBzZWxlY3QuICovXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5wYW5lbE9wZW4gPyB0aGlzLl9oYW5kbGVPcGVuS2V5ZG93bihldmVudCkgOiB0aGlzLl9oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hpbGUgdGhlIHNlbGVjdCBpcyBjbG9zZWQuICovXG4gIHByaXZhdGUgX2hhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgY29uc3QgaXNBcnJvd0tleSA9IGtleSA9PT0gS2V5LkFycm93RG93biB8fCBrZXkgPT09IEtleS5BcnJvd1VwIHx8IGtleSA9PT0gS2V5LkFycm93TGVmdCB8fCBrZXkgPT09IEtleS5BcnJvd1JpZ2h0O1xuICAgIGNvbnN0IGlzT3BlbktleSA9IGtleSA9PT0gS2V5LkVudGVyIHx8IGtleSA9PT0gS2V5LlNwYWNlO1xuICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLl9rZXlNYW5hZ2VyO1xuICAgIC8vIE9wZW4gdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgIGlmICgoIW1hbmFnZXIuaXNUeXBpbmcoKSAmJiBpc09wZW5LZXkgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50KSkgfHwgKCh0aGlzLm11bHRpcGxlIHx8IGV2ZW50LmFsdEtleSkgJiYgaXNBcnJvd0tleSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnRzIHRoZSBwYWdlIGZyb20gc2Nyb2xsaW5nIGRvd24gd2hlbiBwcmVzc2luZyBzcGFjZVxuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgd2hlbiB0aGUgc2VsZWN0ZWQgaXMgb3Blbi4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlT3BlbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgY29uc3QgaXNBcnJvd0tleSA9IGtleSA9PT0gS2V5LkFycm93RG93biB8fCBrZXkgPT09IEtleS5BcnJvd1VwO1xuICAgIGNvbnN0IGlzVHlwaW5nID0gbWFuYWdlci5pc1R5cGluZygpO1xuICAgIGNvbnN0IGlzSW5wdXRGaWVsZCA9IGV2ZW50LnRhcmdldDtcbiAgICBpZiAoaXNBcnJvd0tleSAmJiBldmVudC5hbHRLZXkpIHtcbiAgICAgIC8vIENsb3NlIHRoZSBzZWxlY3Qgb24gQUxUICsgYXJyb3cga2V5IHRvIG1hdGNoIHRoZSBuYXRpdmUgPHNlbGVjdD5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIC8vIERvbid0IGRvIGFueXRoaW5nIGluIHRoaXMgY2FzZSBpZiB0aGUgdXNlciBpcyB0eXBpbmcsXG4gICAgICAvLyBiZWNhdXNlIHRoZSB0eXBpbmcgc2VxdWVuY2UgY2FuIGluY2x1ZGUgdGhlIHNwYWNlIGtleS5cbiAgICB9IGVsc2UgaWYgKCFpc1R5cGluZyAmJiAoa2V5ID09PSBLZXkuRW50ZXIgfHwga2V5ID09PSBLZXkuU3BhY2UpICYmIG1hbmFnZXIuYWN0aXZlSXRlbSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5fbXVsdGlwbGUgPyBtYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCkgOiBtYW5hZ2VyLmFjdGl2ZUl0ZW0uX2NsaWNrVmlhSW50ZXJhY3Rpb24oKTtcbiAgICB9IGVsc2UgaWYgKCFpc1R5cGluZyAmJiB0aGlzLl9tdWx0aXBsZSAmJiBbJ2EnLCAnQSddLmluY2x1ZGVzKGtleSkgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGhhc0Rlc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLnNvbWUoKG9wdCkgPT4gIW9wdC5kaXNhYmxlZCAmJiAhb3B0LnNlbGVjdGVkKTtcbiAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKCFvcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgICBoYXNEZXNlbGVjdGVkT3B0aW9ucyA/IG9wdGlvbi5zZWxlY3QoKSA6IG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKEtleS5Fc2NhcGUgPT09IGtleSkge1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkSW5kZXggPSBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleDtcbiAgICAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgIGlmICh0aGlzLl9tdWx0aXBsZSAmJiBpc0Fycm93S2V5ICYmIGV2ZW50LnNoaWZ0S2V5ICYmIG1hbmFnZXIuYWN0aXZlSXRlbSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAhPT0gcHJldmlvdXNseUZvY3VzZWRJbmRleCkge1xuICAgICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW0uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfd2F0Y2hQYW5lbEV2ZW50cygpIHtcbiAgICBjb25zdCBwYW5lbFN0YXRlQ2hhbmdlcyA9IG1lcmdlKHRoaXMub3ZlcmxheS5vcGVuaW5nLCB0aGlzLm92ZXJsYXkuY2xvc2luZyk7XG4gICAgcGFuZWxTdGF0ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKChldmVudDogYm9vbGVhbikgPT4gdGhpcy50b2dnbGVkLmVtaXQoZXZlbnQpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbkV2ZW50cyA9IHRoaXMub3B0aW9ucyA/IG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKSkgOiBvZigpO1xuICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcyA9IHNlbGVjdGlvbkV2ZW50cy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKGV2ZW50OiBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlKSA9PiB7XG4gICAgICAvLyB0aGlzLmhhbmRsZVNlbGVjdGlvbihldmVudC5zb3VyY2UsIGV2ZW50LmlzVXNlcklucHV0KTtcbiAgICAgIGlmIChldmVudC5pc1VzZXJJbnB1dCAmJiAhdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLl9jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24odGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtKTtcbiAgICAgICAgZXZlbnQuc291cmNlLnNlbGVjdCgpO1xuICAgICAgICBpZiAoIXRoaXMua2VlcE9wZW4gJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnNvdXJjZS5zZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oc2tpcDogTm92b09wdGlvbikge1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGlmIChvcHRpb24gIT09IHNraXAgJiYgb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNldHMgdXAgYSBrZXkgbWFuYWdlciB0byBsaXN0ZW4gdG8ga2V5Ym9hcmQgZXZlbnRzIG9uIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBwcml2YXRlIF9pbml0S2V5TWFuYWdlcigpIHtcbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5vdm9PcHRpb24+KHRoaXMub3B0aW9ucykud2l0aFR5cGVBaGVhZCgyNTApLndpdGhIb21lQW5kRW5kKCk7XG4gICAgLy8gLndpdGhBbGxvd2VkTW9kaWZpZXJLZXlzKFsnc2hpZnRLZXknXSk7XG5cbiAgICB0aGlzLl9rZXlNYW5hZ2VyLnRhYk91dC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgIC8vIFJlc3RvcmUgZm9jdXMgdG8gdGhlIHRyaWdnZXIgYmVmb3JlIGNsb3NpbmcuIEVuc3VyZXMgdGhhdCB0aGUgZm9jdXNcbiAgICAgICAgLy8gcG9zaXRpb24gd29uJ3QgYmUgbG9zdCBpZiB0aGUgdXNlciBnb3QgZm9jdXMgaW50byB0aGUgb3ZlcmxheS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgdGhpcy5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbE9wdGlvbkludG9WaWV3KHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNjcm9sbHMgdGhlIGFjdGl2ZSBvcHRpb24gaW50byB2aWV3LiAqL1xuICBwcm90ZWN0ZWQgX3Njcm9sbE9wdGlvbkludG9WaWV3KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBsYWJlbENvdW50ID0gX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oaW5kZXgsIHRoaXMub3B0aW9ucywgdGhpcy5vcHRpb25Hcm91cHMpO1xuICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSB0aGlzLl9nZXRJdGVtSGVpZ2h0KCk7XG4gICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IF9nZXRPcHRpb25TY3JvbGxQb3NpdGlvbihcbiAgICAgIChpbmRleCArIGxhYmVsQ291bnQpICogaXRlbUhlaWdodCxcbiAgICAgIGl0ZW1IZWlnaHQsXG4gICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICApO1xuICB9XG5cbiAgLyoqIENhbGN1bGF0ZXMgdGhlIGhlaWdodCBvZiB0aGUgc2VsZWN0J3Mgb3B0aW9ucy4gKi9cbiAgcHJpdmF0ZSBfZ2V0SXRlbUhlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCBbZmlyc3RdID0gdGhpcy5vcHRpb25zO1xuICAgIGlmIChmaXJzdCkge1xuICAgICAgcmV0dXJuIGZpcnN0Ll9nZXRIb3N0RWxlbWVudCgpLm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxuLy8gRGVwcmVjYXRlZCBiZWxvdyBoZXJlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtJyxcbiAgdGVtcGxhdGU6ICc8bm92by1vcHRpb24+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pjwvbm92by1vcHRpb24+JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1FbGVtZW50IHtcbiAgQElucHV0KClcbiAgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBwdWJsaWMga2VlcE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBhY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRyb3Bkb3duOiBOb3ZvRHJvcGRvd25FbGVtZW50LCBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIG5vdGlmeShgJ2l0ZW0nIGVsZW1lbnQgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSAnbm92by1vcHRpb24nIGFuZCAnbm92by1vcHRncm91cCcuYCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIC8vIFBvb3IgbWFuJ3MgZGlzYWJsZVxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgLy8gQ2xvc2UgaWYga2VlcE9wZW4gaXMgZmFsc2VcbiAgICAgIGlmICghdGhpcy5rZWVwT3Blbikge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlUGFuZWwoKTtcbiAgICAgIH1cbiAgICAgIC8vIEVtaXQgdGhlIGFjdGlvblxuICAgICAgdGhpcy5hY3Rpb24uZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH0pO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaXN0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3Bkb3duTGlzdEVsZW1lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvSXRlbUVsZW1lbnQpXG4gIHB1YmxpYyBpdGVtczogUXVlcnlMaXN0PE5vdm9JdGVtRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkcm9wZG93bjogTm92b0Ryb3Bkb3duRWxlbWVudCkge1xuICAgIG5vdGlmeShgJ2xpc3QnIGVsZW1lbnQgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBub3ZvLW9wdGlvbiBhbmQgbm92by1vcHRncm91cC5gKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kcm9wZG93bi5pdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgdGhpcy5pdGVtcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmRyb3Bkb3duLml0ZW1zID0gdGhpcy5pdGVtcztcbiAgICB9KTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkcm9wZG93bi1pdGVtLWhlYWRlcicsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wRG93bkl0ZW1IZWFkZXJFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbm90aWZ5KGAnZHJvcGRvd24taXRlbS1oZWFkZXInIGVsZW1lbnQgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBub3ZvLW9wdGlvbiBhbmQgbm92by1vcHRncm91cC5gKTtcbiAgfVxufVxuIl19