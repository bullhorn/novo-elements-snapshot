import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { mixinDisabled, mixinOverlay, NovoOptgroup, NovoOption, NOVO_OPTION_PARENT_COMPONENT, } from '../../common';
import { NovoOverlayTemplateComponent } from '../../common/overlay';
import { NovoFieldElement, NOVO_FORM_FIELD } from '../field';
/** Event object that is emitted when an autocomplete option is selected. */
export class NovoOptionSelectedEvent {
    constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    source, 
    /** Option that was selected. */
    option) {
        this.source = source;
        this.option = option;
    }
}
// Boilerplate for applying mixins
class NovoAutocompleteBase {
    constructor() { }
}
const NovoAutocompleteMixins = mixinOverlay(mixinDisabled(NovoAutocompleteBase));
export class NovoAutocompleteElement extends NovoAutocompleteMixins {
    constructor(_elementRef, cdr, defaultTabIndex, _formField) {
        super();
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this._formField = _formField;
        this._stateChanges = Subscription.EMPTY;
        this._activeOptionChanges = Subscription.EMPTY;
        this._selectedOptionChanges = Subscription.EMPTY;
        this._keyDownChanges = Subscription.EMPTY;
        /** Event that is emitted whenever an option from the list is selected. */
        this.optionSelected = new EventEmitter();
        /** Emits whenever an option is activated using the keyboard. */
        this.optionActivated = new EventEmitter();
        /** Key to use to trigger autocomplete. used for textarea. */
        this.triggerOn = (control) => control.focused;
        /** Function that maps an option's control value to its display value in the trigger. */
        this.displayWith = null;
        this._multiple = false;
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }
    /** Whether the user should be allowed to select multiple options. */
    get multiple() {
        var _a, _b;
        return this._multiple || !!((_a = this._formField._control) === null || _a === void 0 ? void 0 : _a.multiple) || ((_b = this._formField._control) === null || _b === void 0 ? void 0 : _b.controlType) === 'chip-list';
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        var _a;
        if (this._disabled === undefined && ((_a = this._formField) === null || _a === void 0 ? void 0 : _a._control)) {
            return this._formField._control.disabled;
        }
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnChanges(changes) {
        this._watchStateChanges();
        this._watchSelectionEvents();
    }
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
        this._activeOptionChanges.unsubscribe();
        this._selectedOptionChanges.unsubscribe();
        this._keyDownChanges.unsubscribe();
    }
    ngAfterContentInit() {
        this._keyManager = new ActiveDescendantKeyManager(this.options).withWrap();
        this._activeOptionChanges = this._keyManager.change.subscribe((index) => {
            this.optionActivated.emit({ source: this, option: this.options.toArray()[index] || null });
        });
        this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
        this._keyDownChanges = fromEvent(this.element.nativeElement, 'keydown').subscribe((event) => this._handleKeydown(event));
        this.options.changes.subscribe(() => {
            this._watchStateChanges();
            this._watchSelectionEvents();
        });
    }
    ngAfterViewInit() {
        this._watchStateChanges();
        this._watchSelectionEvents();
    }
    checkPanel() {
        const isTriggered = this.triggerOn(this._formField._control);
        if (isTriggered && this.element) {
            this.openPanel();
        }
    }
    _setTriggerValue(value) {
        const toDisplay = this.displayWith ? this.displayWith(value) : value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const inputValue = toDisplay != null ? toDisplay : '';
        // If it's used within a `NovoField`, we should set it through the property so it can go
        // through change detection.
        if (this._formField) {
            const { controlType, lastCaretPosition = 0 } = this._formField._control;
            if (controlType === 'textarea') {
                const currentValue = this._formField._control.value.split('');
                currentValue.splice(lastCaretPosition, 0, inputValue);
                this._formField._control.value = currentValue.join('');
            }
            else {
                let valueToEmit = inputValue;
                if (this.multiple) {
                    const currentValue = this._formField._control.value;
                    if (Array.isArray(currentValue)) {
                        valueToEmit = [...currentValue, inputValue];
                    }
                    else {
                        valueToEmit = [currentValue, inputValue];
                    }
                }
                this._formField._control.value = valueToEmit;
            }
        }
        else {
            // this._element.nativeElement.value = inputValue;
            console.warn(`AutoComplete only intended to be used within a NovoField`);
        }
        this._previousValue = inputValue;
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
    /** Emits the `select` event. */
    _emitSelectEvent(option) {
        const event = new NovoOptionSelectedEvent(this, option);
        this.optionSelected.emit(event);
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    _setValueAndClose(event) {
        if (event && event.source) {
            this._clearPreviousSelectedOption(event.source);
            this._setTriggerValue(event.source.value);
            // this._onChange(event.source.value);
            // this._element.nativeElement.focus();
            this._formField._control.focus();
            this._emitSelectEvent(event.source);
            this._watchSelectionEvents();
        }
        if (!this._multiple)
            this.closePanel();
    }
    _watchSelectionEvents() {
        const selectionEvents = this.options ? merge(...this.options.map((option) => option.onSelectionChange)) : of();
        this._selectedOptionChanges.unsubscribe();
        this._selectedOptionChanges = selectionEvents.pipe(take(1)).subscribe((evt) => {
            this._setValueAndClose(evt);
        });
    }
    _watchStateChanges() {
        const inputStateChanged = this._formField && this._formField._control ? this._formField._control.stateChanges : of();
        this._stateChanges.unsubscribe();
        this._stateChanges = merge(inputStateChanged).subscribe(() => {
            this.checkPanel();
            this.cdr.markForCheck();
        });
    }
    /** The currently active option, coerced to MatOption type. */
    get activeOption() {
        if (this._keyManager) {
            return this._keyManager.activeItem;
        }
        return null;
    }
    _handleKeydown(event) {
        const key = event.key;
        // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.
        if (key === "Escape" /* Escape */ && !hasModifierKey(event)) {
            event.preventDefault();
        }
        if (this.activeOption && key === "Enter" /* Enter */ && this.panelOpen) {
            this.activeOption._selectViaInteraction();
            // this._resetActiveItem();
            event.preventDefault();
        }
        else {
            const prevActiveItem = this._keyManager.activeItem;
            const isArrowKey = key === "ArrowUp" /* ArrowUp */ || key === "ArrowDown" /* ArrowDown */;
            if (this.panelOpen || key === "Tab" /* Tab */) {
                this._keyManager.onKeydown(event);
            }
            else if (isArrowKey && !this.overlay.panelOpen) {
                this.openPanel();
            }
            // if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
            //   this._scrollToOption(this.autocomplete._keyManager.activeItemIndex || 0);
            // }
        }
    }
}
NovoAutocompleteElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-autocomplete',
                template: "<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <div class=\"novo-autocomplete-options\" cdk-scrollable>\n    <ng-content></ng-content>\n  </div>\n</novo-overlay-template>",
                host: {
                    class: 'novo-autocomplete',
                    // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                    // consumer may have provided, while still being able to receive focus.
                    '[attr.tabindex]': 'disabled ? null : -1',
                },
                providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoAutocompleteElement }],
                exportAs: 'novoAutocomplete',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".novo-autocomplete-options{-webkit-padding-start:0!important;background-color:var(--background-bright);box-shadow:0 -1px 3px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);cursor:default;list-style:none;padding-inline-start:0!important}"]
            },] }
];
NovoAutocompleteElement.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: NovoFieldElement, decorators: [{ type: Optional }, { type: Inject, args: [NOVO_FORM_FIELD,] }] }
];
NovoAutocompleteElement.propDecorators = {
    optionGroups: [{ type: ContentChildren, args: [NovoOptgroup, { descendants: true },] }],
    options: [{ type: ContentChildren, args: [NovoOption, { descendants: true },] }],
    optionSelected: [{ type: Output }],
    optionActivated: [{ type: Output }],
    tabIndex: [{ type: Input }],
    triggerOn: [{ type: Input }],
    displayWith: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    multiple: [{ type: Input }],
    disabled: [{ type: Input }],
    overlay: [{ type: ViewChild, args: [NovoOverlayTemplateComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9maWVsZC9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFJTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBRVYsNEJBQTRCLEdBQzdCLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHN0QsNEVBQTRFO0FBQzVFLE1BQU0sT0FBTyx1QkFBdUI7SUFDbEM7SUFDRSxrRUFBa0U7SUFDM0QsTUFB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LEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtZQUVELG1GQUFtRjtZQUNuRiw4RUFBOEU7WUFDOUUsSUFBSTtTQUNMO0lBQ0gsQ0FBQzs7O1lBMVBGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixnTkFBMEM7Z0JBRTFDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQix3RkFBd0Y7b0JBQ3hGLHVFQUF1RTtvQkFDdkUsaUJBQWlCLEVBQUUsc0JBQXNCO2lCQUMxQztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztnQkFDNUYsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBL0RDLFVBQVU7WUFIVixpQkFBaUI7eUNBc0lkLFNBQVMsU0FBQyxVQUFVO1lBdkdoQixnQkFBZ0IsdUJBd0dwQixRQUFRLFlBQUksTUFBTSxTQUFDLGVBQWU7OzsyQkFyRHBDLGVBQWUsU0FBQyxZQUFZLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3NCQUNuRCxlQUFlLFNBQUMsVUFBVSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTs2QkFHakQsTUFBTTs4QkFFTixNQUFNO3VCQUdOLEtBQUs7d0JBR0wsS0FBSzswQkFHTCxLQUFLO3dCQUdMLEtBQUssU0FBQyxZQUFZO3VCQUdsQixLQUFLO3VCQVVMLEtBQUs7c0JBYUwsU0FBUyxTQUFDLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgaGFzTW9kaWZpZXJLZXkgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAncHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvdXRpbHMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGUsXG4gIENhbkRpc2FibGVDdG9yLFxuICBIYXNPdmVybGF5Q3RvcixcbiAgbWl4aW5EaXNhYmxlZCxcbiAgbWl4aW5PdmVybGF5LFxuICBOb3ZvT3B0Z3JvdXAsXG4gIE5vdm9PcHRpb24sXG4gIE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2UsXG4gIE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsXG59IGZyb20gJy4uLy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tbW9uL292ZXJsYXknO1xuaW1wb3J0IHsgTm92b0ZpZWxkRWxlbWVudCwgTk9WT19GT1JNX0ZJRUxEIH0gZnJvbSAnLi4vZmllbGQnO1xuaW1wb3J0IHsgTm92b0ZpZWxkQ29udHJvbCB9IGZyb20gJy4uL2ZpZWxkLWNvbnRyb2wnO1xuXG4vKiogRXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIGFuIGF1dG9jb21wbGV0ZSBvcHRpb24gaXMgc2VsZWN0ZWQuICovXG5leHBvcnQgY2xhc3MgTm92b09wdGlvblNlbGVjdGVkRXZlbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBOb3ZvQXV0b2NvbXBsZXRlRWxlbWVudCxcbiAgICAvKiogT3B0aW9uIHRoYXQgd2FzIHNlbGVjdGVkLiAqL1xuICAgIHB1YmxpYyBvcHRpb246IE5vdm9PcHRpb24sXG4gICkge31cbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGluc1xuY2xhc3MgTm92b0F1dG9jb21wbGV0ZUJhc2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG59XG5jb25zdCBOb3ZvQXV0b2NvbXBsZXRlTWl4aW5zOiBIYXNPdmVybGF5Q3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE5vdm9BdXRvY29tcGxldGVCYXNlID0gbWl4aW5PdmVybGF5KFxuICBtaXhpbkRpc2FibGVkKE5vdm9BdXRvY29tcGxldGVCYXNlKSxcbik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGVVcmw6ICdhdXRvY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tYXV0b2NvbXBsZXRlJyxcbiAgICAvLyBBbHdheXMgc2V0IHRoZSB0YWJpbmRleCB0byAtMSBzbyB0aGF0IGl0IGRvZXNuJ3Qgb3ZlcmxhcCB3aXRoIGFueSBjdXN0b20gdGFiaW5kZXggdGhlXG4gICAgLy8gY29uc3VtZXIgbWF5IGhhdmUgcHJvdmlkZWQsIHdoaWxlIHN0aWxsIGJlaW5nIGFibGUgdG8gcmVjZWl2ZSBmb2N1cy5cbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IC0xJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCB1c2VFeGlzdGluZzogTm92b0F1dG9jb21wbGV0ZUVsZW1lbnQgfV0sXG4gIGV4cG9ydEFzOiAnbm92b0F1dG9jb21wbGV0ZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQXV0b2NvbXBsZXRlRWxlbWVudFxuICBleHRlbmRzIE5vdm9BdXRvY29tcGxldGVNaXhpbnNcbiAgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveVxue1xuICBwcml2YXRlIF9zdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2FjdGl2ZU9wdGlvbkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfa2V5RG93bkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqIE1hbmFnZXMgYWN0aXZlIGl0ZW0gaW4gb3B0aW9uIGxpc3QgYmFzZWQgb24ga2V5IGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfa2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj47XG5cbiAgLyoqIE9sZCB2YWx1ZSBvZiB0aGUgbmF0aXZlIGlucHV0LiBVc2VkIHRvIHdvcmsgYXJvdW5kIGlzc3VlcyB3aXRoIHRoZSBgaW5wdXRgIGV2ZW50IG9uIElFLiAqL1xuICBwcml2YXRlIF9wcmV2aW91c1ZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGdyb3VwLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE5vdm9PcHRncm91cD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBvcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBvcHRpb24gZnJvbSB0aGUgbGlzdCBpcyBzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8Tm92b09wdGlvblNlbGVjdGVkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvT3B0aW9uU2VsZWN0ZWRFdmVudD4oKTtcbiAgLyoqIEVtaXRzIHdoZW5ldmVyIGFuIG9wdGlvbiBpcyBhY3RpdmF0ZWQgdXNpbmcgdGhlIGtleWJvYXJkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3B0aW9uQWN0aXZhdGVkOiBFdmVudEVtaXR0ZXI8Tm92b09wdGlvblNlbGVjdGVkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvT3B0aW9uU2VsZWN0ZWRFdmVudD4oKTtcblxuICAvKiogVGFiaW5kZXggZm9yIHRoZSB0b2dnbGUuICovXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXIgfCBudWxsO1xuXG4gIC8qKiBLZXkgdG8gdXNlIHRvIHRyaWdnZXIgYXV0b2NvbXBsZXRlLiB1c2VkIGZvciB0ZXh0YXJlYS4gKi9cbiAgQElucHV0KCkgdHJpZ2dlck9uOiAoY29udHJvbDogTm92b0ZpZWxkQ29udHJvbDxhbnk+KSA9PiBib29sZWFuID0gKGNvbnRyb2wpID0+IGNvbnRyb2wuZm9jdXNlZDtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBtYXBzIGFuIG9wdGlvbidzIGNvbnRyb2wgdmFsdWUgdG8gaXRzIGRpc3BsYXkgdmFsdWUgaW4gdGhlIHRyaWdnZXIuICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAoKHZhbHVlOiBhbnkpID0+IHN0cmluZykgfCBudWxsID0gbnVsbDtcblxuICAvKiogU2NyZWVucmVhZGVyIGxhYmVsIGZvciB0aGUgYnV0dG9uLiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAvKiogV2hldGhlciB0aGUgdXNlciBzaG91bGQgYmUgYWxsb3dlZCB0byBzZWxlY3QgbXVsdGlwbGUgb3B0aW9ucy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZSB8fCAhIXRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbD8ubXVsdGlwbGUgfHwgdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sPy5jb250cm9sVHlwZSA9PT0gJ2NoaXAtbGlzdCc7XG4gIH1cbiAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRvZ2dsZSBidXR0b24gaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLl9mb3JtRmllbGQ/Ll9jb250cm9sKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLmRpc2FibGVkO1xuICAgIH1cbiAgICByZXR1cm4gISF0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqIEVsZW1lbnQgZm9yIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuXG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSBkZWZhdWx0VGFiSW5kZXg6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fRk9STV9GSUVMRCkgcHJpdmF0ZSBfZm9ybUZpZWxkOiBOb3ZvRmllbGRFbGVtZW50LFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHBhcnNlZFRhYkluZGV4ID0gTnVtYmVyKGRlZmF1bHRUYWJJbmRleCk7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlZFRhYkluZGV4IHx8IHBhcnNlZFRhYkluZGV4ID09PSAwID8gcGFyc2VkVGFiSW5kZXggOiBudWxsO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FjdGl2ZU9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9rZXlEb3duQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5vcHRpb25zKS53aXRoV3JhcCgpO1xuICAgIHRoaXMuX2FjdGl2ZU9wdGlvbkNoYW5nZXMgPSB0aGlzLl9rZXlNYW5hZ2VyLmNoYW5nZS5zdWJzY3JpYmUoKGluZGV4KSA9PiB7XG4gICAgICB0aGlzLm9wdGlvbkFjdGl2YXRlZC5lbWl0KHsgc291cmNlOiB0aGlzLCBvcHRpb246IHRoaXMub3B0aW9ucy50b0FycmF5KClbaW5kZXhdIHx8IG51bGwgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5fZm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSB8fCB0aGlzLl9lbGVtZW50UmVmO1xuICAgIHRoaXMuX2tleURvd25DaGFuZ2VzID0gZnJvbUV2ZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicpLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHRoaXMuX2hhbmRsZUtleWRvd24oZXZlbnQpKTtcbiAgICB0aGlzLm9wdGlvbnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICB9XG5cbiAgY2hlY2tQYW5lbCgpIHtcbiAgICBjb25zdCBpc1RyaWdnZXJlZCA9IHRoaXMudHJpZ2dlck9uKHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbCk7XG4gICAgaWYgKGlzVHJpZ2dlcmVkICYmIHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRUcmlnZ2VyVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHRvRGlzcGxheSA9IHRoaXMuZGlzcGxheVdpdGggPyB0aGlzLmRpc3BsYXlXaXRoKHZhbHVlKSA6IHZhbHVlO1xuICAgIC8vIFNpbXBseSBmYWxsaW5nIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBkaXNwbGF5IHZhbHVlIGlzIGZhbHN5IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAgLy8gVGhlIGRpc3BsYXkgdmFsdWUgY2FuIGFsc28gYmUgdGhlIG51bWJlciB6ZXJvIGFuZCBzaG91bGRuJ3QgZmFsbCBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICBjb25zdCBpbnB1dFZhbHVlID0gdG9EaXNwbGF5ICE9IG51bGwgPyB0b0Rpc3BsYXkgOiAnJztcbiAgICAvLyBJZiBpdCdzIHVzZWQgd2l0aGluIGEgYE5vdm9GaWVsZGAsIHdlIHNob3VsZCBzZXQgaXQgdGhyb3VnaCB0aGUgcHJvcGVydHkgc28gaXQgY2FuIGdvXG4gICAgLy8gdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgIGlmICh0aGlzLl9mb3JtRmllbGQpIHtcbiAgICAgIGNvbnN0IHsgY29udHJvbFR5cGUsIGxhc3RDYXJldFBvc2l0aW9uID0gMCB9ID0gdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sO1xuICAgICAgaWYgKGNvbnRyb2xUeXBlID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC52YWx1ZS5zcGxpdCgnJyk7XG4gICAgICAgIGN1cnJlbnRWYWx1ZS5zcGxpY2UobGFzdENhcmV0UG9zaXRpb24sIDAsIGlucHV0VmFsdWUpO1xuICAgICAgICB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wudmFsdWUgPSBjdXJyZW50VmFsdWUuam9pbignJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdmFsdWVUb0VtaXQ6IGFueSA9IGlucHV0VmFsdWU7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLnZhbHVlO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gWy4uLmN1cnJlbnRWYWx1ZSwgaW5wdXRWYWx1ZV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gW2N1cnJlbnRWYWx1ZSwgaW5wdXRWYWx1ZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC52YWx1ZSA9IHZhbHVlVG9FbWl0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgY29uc29sZS53YXJuKGBBdXRvQ29tcGxldGUgb25seSBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGhpbiBhIE5vdm9GaWVsZGApO1xuICAgIH1cbiAgICB0aGlzLl9wcmV2aW91c1ZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb25cbiAgICovXG4gIHByaXZhdGUgX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihza2lwOiBOb3ZvT3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgaWYgKG9wdGlvbiAhPT0gc2tpcCAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogRW1pdHMgdGhlIGBzZWxlY3RgIGV2ZW50LiAqL1xuICBwcml2YXRlIF9lbWl0U2VsZWN0RXZlbnQob3B0aW9uOiBOb3ZvT3B0aW9uKTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgTm92b09wdGlvblNlbGVjdGVkRXZlbnQodGhpcywgb3B0aW9uKTtcbiAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGNsb3NlcyB0aGUgcGFuZWwsIGFuZCBpZiBhIHZhbHVlIGlzIHNwZWNpZmllZCwgYWxzbyBzZXRzIHRoZSBhc3NvY2lhdGVkXG4gICAqIGNvbnRyb2wgdG8gdGhhdCB2YWx1ZS4gSXQgd2lsbCBhbHNvIG1hcmsgdGhlIGNvbnRyb2wgYXMgZGlydHkgaWYgdGhpcyBpbnRlcmFjdGlvblxuICAgKiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXG4gICAqL1xuICBwcml2YXRlIF9zZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChldmVudCAmJiBldmVudC5zb3VyY2UpIHtcbiAgICAgIHRoaXMuX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihldmVudC5zb3VyY2UpO1xuICAgICAgdGhpcy5fc2V0VHJpZ2dlclZhbHVlKGV2ZW50LnNvdXJjZS52YWx1ZSk7XG4gICAgICAvLyB0aGlzLl9vbkNoYW5nZShldmVudC5zb3VyY2UudmFsdWUpO1xuICAgICAgLy8gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wuZm9jdXMoKTtcbiAgICAgIHRoaXMuX2VtaXRTZWxlY3RFdmVudChldmVudC5zb3VyY2UpO1xuICAgICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX211bHRpcGxlKSB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbkV2ZW50cyA9IHRoaXMub3B0aW9ucyA/IG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKSkgOiBvZigpO1xuICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcyA9IHNlbGVjdGlvbkV2ZW50cy5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoZXZ0OiBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlKSA9PiB7XG4gICAgICB0aGlzLl9zZXRWYWx1ZUFuZENsb3NlKGV2dCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFN0YXRlQ2hhbmdlcygpIHtcbiAgICBjb25zdCBpbnB1dFN0YXRlQ2hhbmdlZCA9IHRoaXMuX2Zvcm1GaWVsZCAmJiB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wgPyB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wuc3RhdGVDaGFuZ2VzIDogb2YoKTtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMgPSBtZXJnZShpbnB1dFN0YXRlQ2hhbmdlZCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tQYW5lbCgpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnRseSBhY3RpdmUgb3B0aW9uLCBjb2VyY2VkIHRvIE1hdE9wdGlvbiB0eXBlLiAqL1xuICBnZXQgYWN0aXZlT3B0aW9uKCk6IE5vdm9PcHRpb24gfCBudWxsIHtcbiAgICBpZiAodGhpcy5fa2V5TWFuYWdlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuXG4gICAgLy8gUHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gb24gYWxsIGVzY2FwZSBrZXkgcHJlc3Nlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseSB0byBicmluZyBJRVxuICAgIC8vIGluIGxpbmUgd2l0aCBvdGhlciBicm93c2Vycy4gQnkgZGVmYXVsdCwgcHJlc3NpbmcgZXNjYXBlIG9uIElFIHdpbGwgY2F1c2UgaXQgdG8gcmV2ZXJ0XG4gICAgLy8gdGhlIGlucHV0IHZhbHVlIHRvIHRoZSBvbmUgdGhhdCBpdCBoYWQgb24gZm9jdXMsIGhvd2V2ZXIgaXQgd29uJ3QgZGlzcGF0Y2ggYW55IGV2ZW50c1xuICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgdGhlIG1vZGVsIHZhbHVlIHdpbGwgYmUgb3V0IG9mIHN5bmMgd2l0aCB0aGUgdmlldy5cbiAgICBpZiAoa2V5ID09PSBLZXkuRXNjYXBlICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZlT3B0aW9uICYmIGtleSA9PT0gS2V5LkVudGVyICYmIHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLmFjdGl2ZU9wdGlvbi5fc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcbiAgICAgIC8vIHRoaXMuX3Jlc2V0QWN0aXZlSXRlbSgpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldkFjdGl2ZUl0ZW0gPSB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgICBjb25zdCBpc0Fycm93S2V5ID0ga2V5ID09PSBLZXkuQXJyb3dVcCB8fCBrZXkgPT09IEtleS5BcnJvd0Rvd247XG5cbiAgICAgIGlmICh0aGlzLnBhbmVsT3BlbiB8fCBrZXkgPT09IEtleS5UYWIpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChpc0Fycm93S2V5ICYmICF0aGlzLm92ZXJsYXkucGFuZWxPcGVuKSB7XG4gICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIChpc0Fycm93S2V5IHx8IHRoaXMuYXV0b2NvbXBsZXRlLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gIT09IHByZXZBY3RpdmVJdGVtKSB7XG4gICAgICAvLyAgIHRoaXMuX3Njcm9sbFRvT3B0aW9uKHRoaXMuYXV0b2NvbXBsZXRlLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwKTtcbiAgICAgIC8vIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==