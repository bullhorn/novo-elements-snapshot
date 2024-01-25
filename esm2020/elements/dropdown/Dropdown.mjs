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
NovoDropDownTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDropDownTrigger, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoDropDownTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NovoDropDownTrigger, selector: "[dropdownTrigger]", host: { classAttribute: "novo-dropdown-trigger" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDropDownTrigger, decorators: [{
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
        const isArrowKey = key === "ArrowDown" /* Key.ArrowDown */ || key === "ArrowUp" /* Key.ArrowUp */ || key === "ArrowLeft" /* Key.ArrowLeft */ || key === "ArrowRight" /* Key.ArrowRight */;
        const isOpenKey = key === "Enter" /* Key.Enter */ || key === " " /* Key.Space */;
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
        const isArrowKey = key === "ArrowDown" /* Key.ArrowDown */ || key === "ArrowUp" /* Key.ArrowUp */;
        const isTyping = manager.isTyping();
        const isInputField = event.target;
        if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.closePanel();
            // Don't do anything in this case if the user is typing,
            // because the typing sequence can include the space key.
        }
        else if (!isTyping && (key === "Enter" /* Key.Enter */ || key === " " /* Key.Space */) && manager.activeItem && !hasModifierKey(event)) {
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
        else if ("Escape" /* Key.Escape */ === key) {
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
NovoDropdownElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDropdownElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoDropdownElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoDropdownElement, selector: "novo-dropdown", inputs: { parentScrollSelector: "parentScrollSelector", parentScrollAction: "parentScrollAction", containerClass: "containerClass", side: "side", scrollStrategy: "scrollStrategy", keepOpen: "keepOpen", height: "height", width: "width", appendToBody: "appendToBody", multiple: "multiple", scrollToActiveItemOnOpen: "scrollToActiveItemOnOpen" }, outputs: { toggled: "toggled" }, host: { listeners: { "keydown": "_handleKeydown($event)" }, properties: { "attr.tabIndex": "disabled ? -1 : 0" } }, queries: [{ propertyName: "_button", first: true, predicate: NovoButtonElement, descendants: true }, { propertyName: "_trigger", first: true, predicate: NovoDropDownTrigger, descendants: true }, { propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "options", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-content select="button,novo-button,[dropdownTrigger]" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div #panel class="dropdown-container {{ containerClass }}" [style.max-height.px]="height" [class.has-height]="!!height">
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{display:inline-block;position:relative;outline:none}:host ::ng-deep .novo-dropdown-trigger{cursor:pointer;-webkit-appearance:none}:host ::ng-deep button,:host ::ng-deep novo-button{position:relative;z-index:0}:host ::ng-deep button .novo-button-icon,:host ::ng-deep novo-button .novo-button-icon{font-size:.8em!important;width:1em!important;height:1em!important;margin:0 .5em}.dropdown-container{background-color:var(--background-bright, #f7f7f7);list-style:none;margin:0;padding:0;min-width:180px;margin-top:.5rem;margin-bottom:.5rem;box-shadow:0 4px 10px #00000040}.dropdown-container.has-height{overflow:auto}.dropdown-container ::ng-deep list dropdown-item-header{color:#9e9e9e;font-size:.8em;flex:1;font-weight:500;text-transform:uppercase;padding:.5rem 1rem;display:block}.dropdown-container ::ng-deep list hr{border:none;height:1px;background:#dbdbdb}.dropdown-container.novo-table-dropdown-cell ::ng-deep list{max-height:400px;display:block;overflow:auto;padding:5px 0}.dropdown-container.novo-table-dropdown-cell ::ng-deep item{height:30px!important;padding:0 16px!important}.dropdown-container.novo-table-dropdown-cell ::ng-deep item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}.dropdown-container.novo-table-dropdown-cell ::ng-deep item.active{font-weight:500}.dropdown-container.novo-table-dropdown-cell ::ng-deep dropdown-item-header{padding:0 10px!important}\n"], dependencies: [{ kind: "component", type: i1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDropdownElement.prototype, "keepOpen", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDropdownElement, decorators: [{
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
                    }, styles: [":host{display:inline-block;position:relative;outline:none}:host ::ng-deep .novo-dropdown-trigger{cursor:pointer;-webkit-appearance:none}:host ::ng-deep button,:host ::ng-deep novo-button{position:relative;z-index:0}:host ::ng-deep button .novo-button-icon,:host ::ng-deep novo-button .novo-button-icon{font-size:.8em!important;width:1em!important;height:1em!important;margin:0 .5em}.dropdown-container{background-color:var(--background-bright, #f7f7f7);list-style:none;margin:0;padding:0;min-width:180px;margin-top:.5rem;margin-bottom:.5rem;box-shadow:0 4px 10px #00000040}.dropdown-container.has-height{overflow:auto}.dropdown-container ::ng-deep list dropdown-item-header{color:#9e9e9e;font-size:.8em;flex:1;font-weight:500;text-transform:uppercase;padding:.5rem 1rem;display:block}.dropdown-container ::ng-deep list hr{border:none;height:1px;background:#dbdbdb}.dropdown-container.novo-table-dropdown-cell ::ng-deep list{max-height:400px;display:block;overflow:auto;padding:5px 0}.dropdown-container.novo-table-dropdown-cell ::ng-deep item{height:30px!important;padding:0 16px!important}.dropdown-container.novo-table-dropdown-cell ::ng-deep item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}.dropdown-container.novo-table-dropdown-cell ::ng-deep item.active{font-weight:500}.dropdown-container.novo-table-dropdown-cell ::ng-deep dropdown-item-header{padding:0 10px!important}\n"] }]
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
NovoItemElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoItemElement, deps: [{ token: NovoDropdownElement }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoItemElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoItemElement, selector: "item", inputs: { disabled: "disabled", keepOpen: "keepOpen" }, outputs: { action: "action" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class.disabled": "disabled", "class.active": "active" } }, ngImport: i0, template: '<novo-option><ng-content></ng-content></novo-option>', isInline: true, dependencies: [{ kind: "component", type: i1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoItemElement, decorators: [{
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
NovoDropdownListElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDropdownListElement, deps: [{ token: NovoDropdownElement }], target: i0.ɵɵFactoryTarget.Component });
NovoDropdownListElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoDropdownListElement, selector: "list", queries: [{ propertyName: "items", predicate: NovoItemElement }], ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDropdownListElement, decorators: [{
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
NovoDropDownItemHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDropDownItemHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoDropDownItemHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoDropDownItemHeaderElement, selector: "dropdown-item-header", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDropDownItemHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'dropdown-item-header',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kcm9wZG93bi9Ecm9wZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixTQUFTO0FBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFJTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixZQUFZLEVBQ1osVUFBVSxFQUVWLDRCQUE0QixFQUM1Qiw2QkFBNkIsRUFDN0Isd0JBQXdCLEdBQ3pCLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLFlBQVksRUFBTyxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBUWhFLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFBbUIsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtJQUFHLENBQUM7O2lI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ZW5kYW50S2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgbWVyZ2UsIG9mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIEFwcFxuaW1wb3J0IHsgTm92b0J1dHRvbkVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2J1dHRvbic7XG5pbXBvcnQge1xuICBDYW5EaXNhYmxlQ3RvcixcbiAgSGFzT3ZlcmxheUN0b3IsXG4gIEhhc1RhYkluZGV4Q3RvcixcbiAgbWl4aW5EaXNhYmxlZCxcbiAgbWl4aW5PdmVybGF5LFxuICBtaXhpblRhYkluZGV4LFxuICBOb3ZvT3B0Z3JvdXAsXG4gIE5vdm9PcHRpb24sXG4gIE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2UsXG4gIE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQsXG4gIF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uLFxuICBfZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24sXG59IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgS2V5LCBub3RpZnkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Ryb3Bkb3duVHJpZ2dlcl0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWRyb3Bkb3duLXRyaWdnZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHJvcERvd25UcmlnZ2VyIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIENyZWF0ZSBCYXNlIENsYXNzIGZyb20gTWl4aW5zXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zXG5jbGFzcyBOb3ZvRHJvcGRvd25CYXNlIHtcbiAgY29uc3RydWN0b3IoKSB7fVxufVxuY29uc3QgTm92b0Ryb3Bkb3dNaXhpbnM6IEhhc092ZXJsYXlDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiBIYXNUYWJJbmRleEN0b3IgJiB0eXBlb2YgTm92b0Ryb3Bkb3duQmFzZSA9IG1peGluT3ZlcmxheShcbiAgbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE5vdm9Ecm9wZG93bkJhc2UpLCAxKSxcbik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJ1dHRvbixub3ZvLWJ1dHRvbixbZHJvcGRvd25UcmlnZ2VyXVwiICN0cmlnZ2VyPjwvbmctY29udGVudD5cbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlIFtwYXJlbnRdPVwiZWxlbWVudFwiIFt3aWR0aF09XCJ3aWR0aFwiIFtwb3NpdGlvbl09XCJzaWRlXCIgW3Njcm9sbFN0cmF0ZWd5XT1cInNjcm9sbFN0cmF0ZWd5XCI+XG4gICAgICA8ZGl2ICNwYW5lbCBjbGFzcz1cImRyb3Bkb3duLWNvbnRhaW5lciB7eyBjb250YWluZXJDbGFzcyB9fVwiIFtzdHlsZS5tYXgtaGVpZ2h0LnB4XT1cImhlaWdodFwiIFtjbGFzcy5oYXMtaGVpZ2h0XT1cIiEhaGVpZ2h0XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbm92by1vdmVybGF5LXRlbXBsYXRlPlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9Ecm9wZG93bi5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIudGFiSW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiAwJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3Bkb3duRWxlbWVudCBleHRlbmRzIE5vdm9Ecm9wZG93TWl4aW5zIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwYXJlbnRTY3JvbGxTZWxlY3Rvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwYXJlbnRTY3JvbGxBY3Rpb246IHN0cmluZyA9ICdjbG9zZSc7XG4gIEBJbnB1dCgpXG4gIGNvbnRhaW5lckNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNpZGU6XG4gICAgfCAnZGVmYXVsdCdcbiAgICB8ICdyaWdodCdcbiAgICB8ICdhYm92ZS1iZWxvdydcbiAgICB8ICdyaWdodC1hYm92ZS1iZWxvdydcbiAgICB8ICdjZW50ZXInXG4gICAgfCAnYm90dG9tJ1xuICAgIHwgJ2JvdHRvbS1sZWZ0J1xuICAgIHwgJ2JvdHRvbS1yaWdodCdcbiAgICB8ICd0b3AtbGVmdCdcbiAgICB8ICd0b3AtcmlnaHQnID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKVxuICBzY3JvbGxTdHJhdGVneTogJ3JlcG9zaXRpb24nIHwgJ2Jsb2NrJyB8ICdjbG9zZScgPSAncmVwb3NpdGlvbic7XG5cbiAgLyoqXG4gICAqIEtlZXAgZHJvcGRvd24gb3BlbiBhZnRlciBhbiBpdGVtIGlzIHNlbGVjdGVkXG4gICAqL1xuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAga2VlcE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBoZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KClcbiAgd2lkdGg6IG51bWJlciA9IC0xOyAvLyBEZWZhdWx0cyB0byBkeW5hbWljIHdpZHRoIChubyBoYXJkY29kZWQgd2lkdGggdmFsdWUgYW5kIG5vIGhvc3Qgd2lkdGggbG9va3VwKVxuICBASW5wdXQoKVxuICBhcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSBmYWxzZTsgLy8gRGVwcmVjYXRlZFxuICBAT3V0cHV0KClcbiAgdG9nZ2xlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKE5vdm9CdXR0b25FbGVtZW50KVxuICBfYnV0dG9uOiBOb3ZvQnV0dG9uRWxlbWVudDtcbiAgQENvbnRlbnRDaGlsZChOb3ZvRHJvcERvd25UcmlnZ2VyKVxuICBfdHJpZ2dlcjogTm92b0Ryb3BEb3duVHJpZ2dlcjtcblxuICBAQ29udGVudENoaWxkcmVuKE5vdm9PcHRncm91cCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxOb3ZvT3B0Z3JvdXA+O1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9PcHRpb24sIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgb3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+O1xuICBAVmlld0NoaWxkKCdwYW5lbCcpXG4gIHBhbmVsOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgY2xpY2tIYW5kbGVyOiBhbnk7XG4gIHByaXZhdGUgY2xvc2VIYW5kbGVyOiBhbnk7XG4gIHByaXZhdGUgX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgLyoqIFRoZSBTdWJqZWN0IHRvIGNvbXBsZXRlIGFsbCBzdWJzY3JpcHRpb25zIHdoZW4gZGVzdHJveWVkLiAqL1xuICBwcml2YXRlIF9vbkRlc3Ryb3k6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuICAvKiogVGhlIEZvY3VzS2V5TWFuYWdlciB3aGljaCBoYW5kbGVzIGZvY3VzLiAqL1xuICBwcml2YXRlIF9rZXlNYW5hZ2VyOiBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxOb3ZvT3B0aW9uPjtcblxuICAvKiogV2hldGhlciB0aGUgdXNlciBzaG91bGQgYmUgYWxsb3dlZCB0byBzZWxlY3QgbXVsdGlwbGUgb3B0aW9ucy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIHNjcm9sbCB0byB0aGUgYWN0aXZlIGl0ZW0gd2hlbmV2ZXIgaXQgaXMgb3BlbmVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2Nyb2xsVG9BY3RpdmVJdGVtT25PcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zY3JvbGxUb0FjdGl2ZUl0ZW1Pbk9wZW47XG4gIH1cbiAgc2V0IHNjcm9sbFRvQWN0aXZlSXRlbU9uT3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Njcm9sbFRvQWN0aXZlSXRlbU9uT3BlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfc2Nyb2xsVG9BY3RpdmVJdGVtT25PcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGJ1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlciB8fCB0aGlzLl9idXR0b247XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlUGFuZWwuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNsb3NlSGFuZGxlciA9IHRoaXMuY2xvc2VQYW5lbC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgbm90aWZ5KGAnYXBwZW5kVG9Cb2R5JyBoYXMgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgcmVtb3ZlIHRoaXMgYXR0cmlidXRlLmApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gQWRkIGEgY2xpY2sgaGFuZGxlciB0byB0aGUgYnV0dG9uIHRvIHRvZ2dsZSB0aGUgbWVudVxuICAgIHRoaXMuYnV0dG9uLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgICB0aGlzLmJ1dHRvbi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGFiSW5kZXggPSAtMTtcbiAgICB0aGlzLm9wdGlvbnMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5faW5pdEtleU1hbmFnZXIoKTtcbiAgICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5faW5pdEtleU1hbmFnZXIoKTtcbiAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fd2F0Y2hQYW5lbEV2ZW50cygpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgLy8gUmVtb3ZlIGxpc3RlbmVyXG4gICAgaWYgKHRoaXMuYnV0dG9uKSB7XG4gICAgICB0aGlzLmJ1dHRvbi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgIHN1cGVyLm9wZW5QYW5lbCgpXG4gICAgaWYgKHRoaXMuc2Nyb2xsVG9BY3RpdmVJdGVtT25PcGVuKSB7XG4gICAgICB0aGlzLl9zY3JvbGxPcHRpb25JbnRvVmlldyh0aGlzLmZpbmRGaXJzdFNlbGVjdGVkT3B0aW9uSW5kZXgodGhpcy5vcHRpb25zKSB8fCAwKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZEZpcnN0U2VsZWN0ZWRPcHRpb25JbmRleChvcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj4pOiBudW1iZXIgfCBudWxsIHtcbiAgICByZXR1cm4gb3B0aW9ucy50b0FycmF5KCkuZmluZEluZGV4KChvcHRpb246IE5vdm9PcHRpb24pID0+IHtcbiAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQgPT09IHRydWU7XG4gICAgfSk7XG4gIH1cblxuXG4gIHB1YmxpYyBzZXQgaXRlbXMoaXRlbXM6IFF1ZXJ5TGlzdDxOb3ZvSXRlbUVsZW1lbnQ+KSB7XG4gICAgLy8gdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgICAvLyB0aGlzLmFjdGl2ZUluZGV4ID0gLTE7XG4gICAgLy8gLy8gR2V0IHRoZSBpbm5lclRleHQgb2YgYWxsIHRoZSBpdGVtcyB0byBhbGxvdyBmb3Igc2VhcmNoaW5nXG4gICAgLy8gdGhpcy5fdGV4dEl0ZW1zID0gaXRlbXMubWFwKChpdGVtOiBOb3ZvSXRlbUVsZW1lbnQpID0+IHtcbiAgICAvLyAgIHJldHVybiBpdGVtLmVsZW1lbnQubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG4gICAgLy8gfSk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBhbGwga2V5ZG93biBldmVudHMgb24gdGhlIHNlbGVjdC4gKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnBhbmVsT3BlbiA/IHRoaXMuX2hhbmRsZU9wZW5LZXlkb3duKGV2ZW50KSA6IHRoaXMuX2hhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGlsZSB0aGUgc2VsZWN0IGlzIGNsb3NlZC4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5ID09PSBLZXkuQXJyb3dEb3duIHx8IGtleSA9PT0gS2V5LkFycm93VXAgfHwga2V5ID09PSBLZXkuQXJyb3dMZWZ0IHx8IGtleSA9PT0gS2V5LkFycm93UmlnaHQ7XG4gICAgY29uc3QgaXNPcGVuS2V5ID0ga2V5ID09PSBLZXkuRW50ZXIgfHwga2V5ID09PSBLZXkuU3BhY2U7XG4gICAgY29uc3QgbWFuYWdlciA9IHRoaXMuX2tleU1hbmFnZXI7XG4gICAgLy8gT3BlbiB0aGUgc2VsZWN0IG9uIEFMVCArIGFycm93IGtleSB0byBtYXRjaCB0aGUgbmF0aXZlIDxzZWxlY3Q+XG4gICAgaWYgKCghbWFuYWdlci5pc1R5cGluZygpICYmIGlzT3BlbktleSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB8fCAoKHRoaXMubXVsdGlwbGUgfHwgZXZlbnQuYWx0S2V5KSAmJiBpc0Fycm93S2V5KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudHMgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biB3aGVuIHByZXNzaW5nIHNwYWNlXG4gICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyB3aGVuIHRoZSBzZWxlY3RlZCBpcyBvcGVuLiAqL1xuICBwcml2YXRlIF9oYW5kbGVPcGVuS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLl9rZXlNYW5hZ2VyO1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5ID09PSBLZXkuQXJyb3dEb3duIHx8IGtleSA9PT0gS2V5LkFycm93VXA7XG4gICAgY29uc3QgaXNUeXBpbmcgPSBtYW5hZ2VyLmlzVHlwaW5nKCk7XG4gICAgY29uc3QgaXNJbnB1dEZpZWxkID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmIChpc0Fycm93S2V5ICYmIGV2ZW50LmFsdEtleSkge1xuICAgICAgLy8gQ2xvc2UgdGhlIHNlbGVjdCBvbiBBTFQgKyBhcnJvdyBrZXkgdG8gbWF0Y2ggdGhlIG5hdGl2ZSA8c2VsZWN0PlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaW4gdGhpcyBjYXNlIGlmIHRoZSB1c2VyIGlzIHR5cGluZyxcbiAgICAgIC8vIGJlY2F1c2UgdGhlIHR5cGluZyBzZXF1ZW5jZSBjYW4gaW5jbHVkZSB0aGUgc3BhY2Uga2V5LlxuICAgIH0gZWxzZSBpZiAoIWlzVHlwaW5nICYmIChrZXkgPT09IEtleS5FbnRlciB8fCBrZXkgPT09IEtleS5TcGFjZSkgJiYgbWFuYWdlci5hY3RpdmVJdGVtICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9tdWx0aXBsZSA/IG1hbmFnZXIuYWN0aXZlSXRlbS5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKSA6IG1hbmFnZXIuYWN0aXZlSXRlbS5fY2xpY2tWaWFJbnRlcmFjdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoIWlzVHlwaW5nICYmIHRoaXMuX211bHRpcGxlICYmIFsnYScsICdBJ10uaW5jbHVkZXMoa2V5KSAmJiBldmVudC5jdHJsS2V5KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgaGFzRGVzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuc29tZSgob3B0KSA9PiAhb3B0LmRpc2FibGVkICYmICFvcHQuc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAoIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgIGhhc0Rlc2VsZWN0ZWRPcHRpb25zID8gb3B0aW9uLnNlbGVjdCgpIDogb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoS2V5LkVzY2FwZSA9PT0ga2V5KSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRJbmRleCA9IG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuICAgICAgbWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgaWYgKHRoaXMuX211bHRpcGxlICYmIGlzQXJyb3dLZXkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgbWFuYWdlci5hY3RpdmVJdGVtICYmIG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEluZGV4KSB7XG4gICAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbS5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFBhbmVsRXZlbnRzKCkge1xuICAgIGNvbnN0IHBhbmVsU3RhdGVDaGFuZ2VzID0gbWVyZ2UodGhpcy5vdmVybGF5Lm9wZW5pbmcsIHRoaXMub3ZlcmxheS5jbG9zaW5nKTtcbiAgICBwYW5lbFN0YXRlQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKGV2ZW50OiBib29sZWFuKSA9PiB0aGlzLnRvZ2dsZWQuZW1pdChldmVudCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2F0Y2hTZWxlY3Rpb25FdmVudHMoKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uRXZlbnRzID0gdGhpcy5vcHRpb25zID8gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpKSA6IG9mKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzID0gc2VsZWN0aW9uRXZlbnRzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoZXZlbnQ6IE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2UpID0+IHtcbiAgICAgIC8vIHRoaXMuaGFuZGxlU2VsZWN0aW9uKGV2ZW50LnNvdXJjZSwgZXZlbnQuaXNVc2VySW5wdXQpO1xuICAgICAgaWYgKGV2ZW50LmlzVXNlcklucHV0ICYmICF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbih0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pO1xuICAgICAgICBldmVudC5zb3VyY2Uuc2VsZWN0KCk7XG4gICAgICAgIGlmICghdGhpcy5rZWVwT3BlbiAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQuc291cmNlLnNlbGVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb25cbiAgICovXG4gIHByaXZhdGUgX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihza2lwOiBOb3ZvT3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgaWYgKG9wdGlvbiAhPT0gc2tpcCAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2V0cyB1cCBhIGtleSBtYW5hZ2VyIHRvIGxpc3RlbiB0byBrZXlib2FyZCBldmVudHMgb24gdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gIHByaXZhdGUgX2luaXRLZXlNYW5hZ2VyKCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5vcHRpb25zKS53aXRoVHlwZUFoZWFkKDI1MCkud2l0aEhvbWVBbmRFbmQoKTtcbiAgICAvLyAud2l0aEFsbG93ZWRNb2RpZmllcktleXMoWydzaGlmdEtleSddKTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIudGFiT3V0LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgLy8gUmVzdG9yZSBmb2N1cyB0byB0aGUgdHJpZ2dlciBiZWZvcmUgY2xvc2luZy4gRW5zdXJlcyB0aGF0IHRoZSBmb2N1c1xuICAgICAgICAvLyBwb3NpdGlvbiB3b24ndCBiZSBsb3N0IGlmIHRoZSB1c2VyIGdvdCBmb2N1cyBpbnRvIHRoZSBvdmVybGF5LlxuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fa2V5TWFuYWdlci5jaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiB0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsT3B0aW9uSW50b1ZpZXcodGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2Nyb2xscyB0aGUgYWN0aXZlIG9wdGlvbiBpbnRvIHZpZXcuICovXG4gIHByb3RlY3RlZCBfc2Nyb2xsT3B0aW9uSW50b1ZpZXcoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxhYmVsQ291bnQgPSBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbihpbmRleCwgdGhpcy5vcHRpb25zLCB0aGlzLm9wdGlvbkdyb3Vwcyk7XG4gICAgY29uc3QgaXRlbUhlaWdodCA9IHRoaXMuX2dldEl0ZW1IZWlnaHQoKTtcbiAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgICAgKGluZGV4ICsgbGFiZWxDb3VudCkgKiBpdGVtSGVpZ2h0LFxuICAgICAgaXRlbUhlaWdodCxcbiAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICk7XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBzZWxlY3QncyBvcHRpb25zLiAqL1xuICBwcml2YXRlIF9nZXRJdGVtSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IFtmaXJzdF0gPSB0aGlzLm9wdGlvbnM7XG4gICAgaWYgKGZpcnN0KSB7XG4gICAgICByZXR1cm4gZmlyc3QuX2dldEhvc3RFbGVtZW50KCkub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG4vLyBEZXByZWNhdGVkIGJlbG93IGhlcmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0ZW0nLFxuICB0ZW1wbGF0ZTogJzxub3ZvLW9wdGlvbj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9ub3ZvLW9wdGlvbj4nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbUVsZW1lbnQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBrZWVwT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KClcbiAgcHVibGljIGFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHJvcGRvd246IE5vdm9Ecm9wZG93bkVsZW1lbnQsIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgbm90aWZ5KGAnaXRlbScgZWxlbWVudCBoYXMgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgdXNlICdub3ZvLW9wdGlvbicgYW5kICdub3ZvLW9wdGdyb3VwJy5gKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgLy8gUG9vciBtYW4ncyBkaXNhYmxlXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAvLyBDbG9zZSBpZiBrZWVwT3BlbiBpcyBmYWxzZVxuICAgICAgaWYgKCF0aGlzLmtlZXBPcGVuKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uY2xvc2VQYW5lbCgpO1xuICAgICAgfVxuICAgICAgLy8gRW1pdCB0aGUgYWN0aW9uXG4gICAgICB0aGlzLmFjdGlvbi5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfSk7XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpc3QnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHJvcGRvd25MaXN0RWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9JdGVtRWxlbWVudClcbiAgcHVibGljIGl0ZW1zOiBRdWVyeUxpc3Q8Tm92b0l0ZW1FbGVtZW50PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRyb3Bkb3duOiBOb3ZvRHJvcGRvd25FbGVtZW50KSB7XG4gICAgbm90aWZ5KGAnbGlzdCcgZWxlbWVudCBoYXMgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG5vdm8tb3B0aW9uIGFuZCBub3ZvLW9wdGdyb3VwLmApO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyb3Bkb3duLml0ZW1zID0gdGhpcy5pdGVtcztcbiAgICB0aGlzLml0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuZHJvcGRvd24uaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgIH0pO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Ryb3Bkb3duLWl0ZW0taGVhZGVyJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3BEb3duSXRlbUhlYWRlckVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBub3RpZnkoYCdkcm9wZG93bi1pdGVtLWhlYWRlcicgZWxlbWVudCBoYXMgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG5vdm8tb3B0aW9uIGFuZCBub3ZvLW9wdGdyb3VwLmApO1xuICB9XG59XG4iXX0=