import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/** Change event object emitted by NovoCheckbox. */
export declare class NovoCheckboxChange {
    /** The source NovoCheckbox of the event. */
    source: NovoCheckboxElement;
    /** The new `checked` value of the checkbox. */
    checked: boolean;
}
export declare class NovoCheckboxElement implements ControlValueAccessor, OnInit {
    private _cdr;
    private _focusMonitor;
    /**
     * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
     * take precedence so this may be omitted.
     */
    ariaLabel: string;
    /**
     * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
     */
    ariaLabelledby: string | null;
    /** The 'aria-describedby' attribute is read after the element's label and field type. */
    ariaDescribedby: string;
    private _uniqueId;
    id: string;
    name: string;
    label: string;
    disabled: boolean;
    layoutOptions: {
        iconStyle?: string;
    };
    color: string;
    /** The value attribute of the native input element */
    value: string;
    tabIndex: number;
    /** Whether the checkbox is required. */
    get required(): boolean;
    set required(value: boolean);
    private _required;
    /** Whether the checkbox is checked. */
    get checked(): boolean;
    set checked(value: boolean);
    private _checked;
    get indeterminate(): boolean;
    set indeterminate(value: boolean);
    private _indeterminate;
    /** The native `<input type="checkbox">` element */
    _inputElement: ElementRef<HTMLInputElement>;
    /** Event emitted when the checkbox's `checked` value changes. */
    readonly change: EventEmitter<NovoCheckboxChange>;
    /** Event emitted when the checkbox's `indeterminate` value changes. */
    readonly indeterminateChange: EventEmitter<boolean>;
    onSelect: EventEmitter<any>;
    boxIcon: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(_cdr: ChangeDetectorRef, _focusMonitor: FocusMonitor, tabIndex: string);
    ngOnInit(): void;
    select(event: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    _getAriaChecked(): 'true' | 'false' | 'mixed';
    private _emitChangeEvent;
    /** Toggles the `checked` state of the checkbox. */
    toggle(): void;
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
    _onInputClick(event: Event): void;
    /** Focuses the checkbox. */
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    _onInteractionEvent(event: Event): void;
    private _syncIndeterminate;
}
