// NG2
import { Component, Input, Output, EventEmitter, ViewChild, forwardRef, ElementRef, HostBinding, ChangeDetectorRef, NgZone, ChangeDetectionStrategy, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// APP
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
// Value accessor for the component (supports ngModel)
const SEARCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSearchBoxElement),
    multi: true,
};
export class NovoSearchBoxElement {
    constructor(element, labels, _changeDetectorRef, _zone) {
        this.element = element;
        this.labels = labels;
        this._changeDetectorRef = _changeDetectorRef;
        this._zone = _zone;
        this.icon = 'search';
        this.placeholder = 'Search...';
        this.alwaysOpen = false;
        this.theme = 'positive';
        this.closeOnSelect = true;
        this.searchChanged = new EventEmitter();
        this.focused = false;
        /** View -> model callback called when value changes */
        this._onChange = () => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
    }
    /**
     * @name showFasterFind
     * @description This function shows the picker and adds the active class (for animation)
     */
    showSearch(event, forceClose = false) {
        if (!this.panelOpen) {
            // Reset search
            // Set focus on search
            setTimeout(() => {
                const element = this.input.nativeElement;
                if (element) {
                    element.focus();
                }
            }, 10);
        }
    }
    onFocus() {
        this._zone.run(() => {
            this.focused = true;
            this.openPanel();
        });
    }
    onBlur() {
        this.focused = false;
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        this.overlay.openPanel();
    }
    closePanel() {
        this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    get active() {
        return this.panelOpen || this.alwaysOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.keyCode === ESCAPE || event.keyCode === ENTER || event.keyCode === TAB) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleInput(event) {
        if (document.activeElement === event.target) {
            this._onChange(event.target.value);
            if (this.debounceSearchChange) {
                clearTimeout(this.debounceSearchChange);
            }
            this.debounceSearchChange = setTimeout(() => {
                this.searchChanged.emit(event.target.value);
            }, 400);
        }
    }
    writeValue(value) {
        this._setValue(value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    _setValue(value) {
        this.value = value;
        let toDisplay = value;
        if (value && this.displayField) {
            toDisplay = value.hasOwnProperty(this.displayField) ? value[this.displayField] : value;
        }
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        this.displayValue = toDisplay ? toDisplay : '';
        this.input.nativeElement.value = this.displayValue;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event && event.value) {
            this._setValue(event.value);
            this._onChange(event.value);
        }
        this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(skip) {
        this.writeValue(null);
        this._onChange(null);
    }
}
NovoSearchBoxElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-search',
                providers: [SEARCH_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <!-- SEARCH ICON -->
    <button
      theme="fab"
      [color]="theme"
      [icon]="icon"
      (click)="showSearch()"
      [tooltip]="hint"
      tooltipPosition="bottom"
      data-automation-id="novo-search-fab"
    ></button>
    <!-- SEARCH INPUT -->
    <input
      type="text"
      [attr.name]="name"
      [attr.value]="displayValue"
      [attr.placeholder]="placeholder"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      #input
      data-automation-id="novo-search-input"
    />
    <!-- SEARCH OVERLAY -->
    <novo-overlay-template
      [parent]="element"
      [closeOnSelect]="closeOnSelect"
      position="above-below"
      (select)="closePanel()"
      (closing)="onBlur()"
    >
      <ng-content></ng-content>
    </novo-overlay-template>
  `
            },] }
];
NovoSearchBoxElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
NovoSearchBoxElement.propDecorators = {
    name: [{ type: Input }],
    icon: [{ type: Input }],
    placeholder: [{ type: Input }],
    alwaysOpen: [{ type: Input }],
    theme: [{ type: Input }],
    closeOnSelect: [{ type: Input }],
    displayField: [{ type: Input }],
    displayValue: [{ type: Input }],
    hint: [{ type: Input }],
    searchChanged: [{ type: Output }],
    focused: [{ type: HostBinding, args: ['class.focused',] }],
    overlay: [{ type: ViewChild, args: [NovoOverlayTemplateComponent,] }],
    input: [{ type: ViewChild, args: ['input', { static: true },] }],
    active: [{ type: HostBinding, args: ['class.active',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoQm94LmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zZWFyY2gvU2VhcmNoQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsTUFBTSxFQUNOLHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsTUFBTTtBQUNOLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXJFLHNEQUFzRDtBQUN0RCxNQUFNLHFCQUFxQixHQUFHO0lBQzVCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUEwQ0YsTUFBTSxPQUFPLG9CQUFvQjtJQXNDL0IsWUFDUyxPQUFtQixFQUNuQixNQUF3QixFQUN2QixrQkFBcUMsRUFDckMsS0FBYTtRQUhkLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBdENoQixTQUFJLEdBQVcsUUFBUSxDQUFDO1FB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QUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7OztZQXpMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNsQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NUO2FBQ0Y7OztZQTFEQyxVQUFVO1lBVUgsZ0JBQWdCO1lBUnZCLGlCQUFpQjtZQUNqQixNQUFNOzs7bUJBeURMLEtBQUs7bUJBRUwsS0FBSzswQkFFTCxLQUFLO3lCQUVMLEtBQUs7b0JBRUwsS0FBSzs0QkFFTCxLQUFLOzJCQUVMLEtBQUs7MkJBRUwsS0FBSzttQkFFTCxLQUFLOzRCQUVMLE1BQU07c0JBRU4sV0FBVyxTQUFDLGVBQWU7c0JBVTNCLFNBQVMsU0FBQyw0QkFBNEI7b0JBRXRDLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3FCQStDbkMsV0FBVyxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3Q2hpbGQsXHJcbiAgZm9yd2FyZFJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE5nWm9uZSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBUQUIsIEVOVEVSLCBFU0NBUEUgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL292ZXJsYXkvT3ZlcmxheSc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5cclxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXHJcbmNvbnN0IFNFQVJDSF9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvU2VhcmNoQm94RWxlbWVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tc2VhcmNoJyxcclxuICBwcm92aWRlcnM6IFtTRUFSQ0hfVkFMVUVfQUNDRVNTT1JdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8IS0tIFNFQVJDSCBJQ09OIC0tPlxyXG4gICAgPGJ1dHRvblxyXG4gICAgICB0aGVtZT1cImZhYlwiXHJcbiAgICAgIFtjb2xvcl09XCJ0aGVtZVwiXHJcbiAgICAgIFtpY29uXT1cImljb25cIlxyXG4gICAgICAoY2xpY2spPVwic2hvd1NlYXJjaCgpXCJcclxuICAgICAgW3Rvb2x0aXBdPVwiaGludFwiXHJcbiAgICAgIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbVwiXHJcbiAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tc2VhcmNoLWZhYlwiXHJcbiAgICA+PC9idXR0b24+XHJcbiAgICA8IS0tIFNFQVJDSCBJTlBVVCAtLT5cclxuICAgIDxpbnB1dFxyXG4gICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXHJcbiAgICAgIFthdHRyLnZhbHVlXT1cImRpc3BsYXlWYWx1ZVwiXHJcbiAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcclxuICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoKVwiXHJcbiAgICAgIChibHVyKT1cIm9uQmx1cigpXCJcclxuICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiXHJcbiAgICAgIChpbnB1dCk9XCJfaGFuZGxlSW5wdXQoJGV2ZW50KVwiXHJcbiAgICAgICNpbnB1dFxyXG4gICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXNlYXJjaC1pbnB1dFwiXHJcbiAgICAvPlxyXG4gICAgPCEtLSBTRUFSQ0ggT1ZFUkxBWSAtLT5cclxuICAgIDxub3ZvLW92ZXJsYXktdGVtcGxhdGVcclxuICAgICAgW3BhcmVudF09XCJlbGVtZW50XCJcclxuICAgICAgW2Nsb3NlT25TZWxlY3RdPVwiY2xvc2VPblNlbGVjdFwiXHJcbiAgICAgIHBvc2l0aW9uPVwiYWJvdmUtYmVsb3dcIlxyXG4gICAgICAoc2VsZWN0KT1cImNsb3NlUGFuZWwoKVwiXHJcbiAgICAgIChjbG9zaW5nKT1cIm9uQmx1cigpXCJcclxuICAgID5cclxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9TZWFyY2hCb3hFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBpY29uOiBzdHJpbmcgPSAnc2VhcmNoJztcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1NlYXJjaC4uLic7XHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgYWx3YXlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHRoZW1lOiBzdHJpbmcgPSAncG9zaXRpdmUnO1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGNsb3NlT25TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGRpc3BsYXlGaWVsZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGRpc3BsYXlWYWx1ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGhpbnQ6IHN0cmluZztcclxuICBAT3V0cHV0KClcclxuICBwdWJsaWMgc2VhcmNoQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZvY3VzZWQnKVxyXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgdmFsdWU6IGFueTtcclxuXHJcbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlcyAqL1xyXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcclxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBhdXRvY29tcGxldGUgaGFzIGJlZW4gdG91Y2hlZCAqL1xyXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgLyoqIEVsZW1lbnQgZm9yIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cclxuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXHJcbiAgb3ZlcmxheTogYW55O1xyXG4gIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IHRydWUgfSlcclxuICBpbnB1dDogYW55O1xyXG5cclxuICBwcml2YXRlIGRlYm91bmNlU2VhcmNoQ2hhbmdlOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lLFxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgc2hvd0Zhc3RlckZpbmRcclxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzaG93cyB0aGUgcGlja2VyIGFuZCBhZGRzIHRoZSBhY3RpdmUgY2xhc3MgKGZvciBhbmltYXRpb24pXHJcbiAgICovXHJcbiAgc2hvd1NlYXJjaChldmVudD86IGFueSwgZm9yY2VDbG9zZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoIXRoaXMucGFuZWxPcGVuKSB7XHJcbiAgICAgIC8vIFJlc2V0IHNlYXJjaFxyXG4gICAgICAvLyBTZXQgZm9jdXMgb24gc2VhcmNoXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwKTtcclxuICAgIH1cclxuICB9XHJcbiAgb25Gb2N1cygpIHtcclxuICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBvbkJsdXIoKSB7XHJcbiAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcclxuICB9XHJcbiAgLyoqIEJFR0lOOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXHJcbiAgb3BlblBhbmVsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xyXG4gIH1cclxuICBjbG9zZVBhbmVsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vdmVybGF5LmNsb3NlUGFuZWwoKTtcclxuICB9XHJcbiAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LnBhbmVsT3BlbjtcclxuICB9XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxyXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wYW5lbE9wZW4gfHwgdGhpcy5hbHdheXNPcGVuO1xyXG4gIH1cclxuICAvKiogRU5EOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXHJcblxyXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSB8fCBldmVudC5rZXlDb2RlID09PSBFTlRFUiB8fCBldmVudC5rZXlDb2RlID09PSBUQUIpICYmIHRoaXMucGFuZWxPcGVuKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcbiAgX2hhbmRsZUlucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0KSB7XHJcbiAgICAgIHRoaXMuX29uQ2hhbmdlKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuZGVib3VuY2VTZWFyY2hDaGFuZ2UpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kZWJvdW5jZVNlYXJjaENoYW5nZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kZWJvdW5jZVNlYXJjaENoYW5nZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQ2hhbmdlZC5lbWl0KChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xyXG4gICAgICB9LCA0MDApO1xyXG4gICAgfVxyXG4gIH1cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NldFZhbHVlKHZhbHVlKTtcclxuICB9XHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHt9KTogdm9pZCB7XHJcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcclxuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICBsZXQgdG9EaXNwbGF5ID0gdmFsdWU7XHJcbiAgICBpZiAodmFsdWUgJiYgdGhpcy5kaXNwbGF5RmllbGQpIHtcclxuICAgICAgdG9EaXNwbGF5ID0gdmFsdWUuaGFzT3duUHJvcGVydHkodGhpcy5kaXNwbGF5RmllbGQpID8gdmFsdWVbdGhpcy5kaXNwbGF5RmllbGRdIDogdmFsdWU7XHJcbiAgICB9XHJcbiAgICAvLyBTaW1wbHkgZmFsbGluZyBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZGlzcGxheSB2YWx1ZSBpcyBmYWxzeSBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxyXG4gICAgLy8gVGhlIGRpc3BsYXkgdmFsdWUgY2FuIGFsc28gYmUgdGhlIG51bWJlciB6ZXJvIGFuZCBzaG91bGRuJ3QgZmFsbCBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZy5cclxuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdG9EaXNwbGF5ID8gdG9EaXNwbGF5IDogJyc7XHJcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmRpc3BsYXlWYWx1ZTtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgY2xvc2VzIHRoZSBwYW5lbCwgYW5kIGlmIGEgdmFsdWUgaXMgc3BlY2lmaWVkLCBhbHNvIHNldHMgdGhlIGFzc29jaWF0ZWRcclxuICAgKiBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5IGlmIHRoaXMgaW50ZXJhY3Rpb25cclxuICAgKiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgcHVibGljIHNldFZhbHVlQW5kQ2xvc2UoZXZlbnQ6IGFueSB8IG51bGwpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCAmJiBldmVudC52YWx1ZSkge1xyXG4gICAgICB0aGlzLl9zZXRWYWx1ZShldmVudC52YWx1ZSk7XHJcbiAgICAgIHRoaXMuX29uQ2hhbmdlKGV2ZW50LnZhbHVlKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXHJcbiAgICovXHJcbiAgcHVibGljIGNsZWFyVmFsdWUoc2tpcDogYW55KSB7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUobnVsbCk7XHJcbiAgICB0aGlzLl9vbkNoYW5nZShudWxsKTtcclxuICB9XHJcbn1cclxuIl19