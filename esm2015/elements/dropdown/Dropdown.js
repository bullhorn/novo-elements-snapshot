// NG2
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, ViewChild, } from '@angular/core';
import { Helpers } from '../../utils/Helpers';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { notify } from '../../utils/notifier/notifier.util';
// APP
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
export class NovoDropdownElement {
    constructor(element, ref) {
        this.element = element;
        this.ref = ref;
        this.parentScrollAction = 'close';
        this.side = 'default';
        this.scrollStrategy = 'reposition';
        this.width = -1; // Defaults to dynamic width (no hardcoded width value and no host width lookup)
        this.appendToBody = false; // Deprecated
        this.toggled = new EventEmitter();
        this.activeIndex = -1;
        this.filterTerm = '';
        this.clickHandler = this.togglePanel.bind(this);
        this.closeHandler = this.closePanel.bind(this);
    }
    ngOnInit() {
        if (this.appendToBody) {
            notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
        }
        // Add a click handler to the button to toggle the menu
        const button = this.element.nativeElement.querySelector('button');
        button.addEventListener('click', this.clickHandler);
        if (this.parentScrollSelector) {
            this.parentScrollElement = Helpers.findAncestor(this.element.nativeElement, this.parentScrollSelector);
        }
    }
    ngOnDestroy() {
        // Remove listener
        const button = this.element.nativeElement.querySelector('button');
        if (button) {
            button.removeEventListener('click', this.clickHandler);
        }
        if (this.parentScrollElement && this.parentScrollAction === 'close') {
            this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
        }
    }
    set items(items) {
        this._items = items;
        this.activeIndex = -1;
        // Get the innerText of all the items to allow for searching
        this._textItems = items.map((item) => {
            return item.element.nativeElement.innerText;
        });
    }
    /** BEGIN: Convenient Panel Methods. */
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    openPanel() {
        this.overlay.openPanel();
        if (this.parentScrollElement && this.parentScrollAction === 'close') {
            this.parentScrollElement.addEventListener('scroll', this.closeHandler);
        }
        this.toggled.emit(true);
    }
    closePanel() {
        this.overlay.closePanel();
        if (this.parentScrollElement && this.parentScrollAction === 'close') {
            this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
        }
        // Clear active index
        if (this.activeIndex !== -1) {
            this._items.toArray()[this.activeIndex].active = false;
        }
        this.activeIndex = -1;
        this.ref.markForCheck();
        this.toggled.emit(false);
    }
    togglePanel() {
        this.panelOpen ? this.closePanel() : this.openPanel();
    }
    /** END: Convenient Panel Methods. */
    onKeyDown(event) {
        if (this.panelOpen && event.keyCode === KeyCodes.ESC) {
            Helpers.swallowEvent(event);
            // active & esc hit -- close
            this.closePanel();
        }
        else if (event.keyCode === KeyCodes.ENTER) {
            Helpers.swallowEvent(event);
            // enter -- perform the "click"
            this._items.toArray()[this.activeIndex].onClick(event);
        }
        else if (event.keyCode === KeyCodes.DOWN) {
            Helpers.swallowEvent(event);
            // down - navigate through the list ignoring disabled ones
            if (this.activeIndex !== -1) {
                this._items.toArray()[this.activeIndex].active = false;
            }
            this.activeIndex++;
            if (this.activeIndex === this._items.length) {
                this.activeIndex = 0;
            }
            while (this._items.toArray()[this.activeIndex].disabled) {
                this.activeIndex++;
                if (this.activeIndex === this._items.length) {
                    this.activeIndex = 0;
                }
            }
            this._items.toArray()[this.activeIndex].active = true;
            this.scrollToActive();
        }
        else if (event.keyCode === KeyCodes.UP) {
            Helpers.swallowEvent(event);
            // up -- navigate through the list ignoring disabled ones
            if (this.activeIndex !== -1) {
                this._items.toArray()[this.activeIndex].active = false;
            }
            this.activeIndex--;
            if (this.activeIndex < 0) {
                this.activeIndex = this._items.length - 1;
            }
            while (this._items.toArray()[this.activeIndex].disabled) {
                this.activeIndex--;
                if (this.activeIndex < 0) {
                    this.activeIndex = this._items.length - 1;
                }
            }
            this._items.toArray()[this.activeIndex].active = true;
            this.scrollToActive();
        }
        else if ((event.keyCode >= 65 && event.keyCode <= 90) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            (event.keyCode >= 48 && event.keyCode <= 57) ||
            event.keyCode === KeyCodes.SPACE) {
            Helpers.swallowEvent(event);
            // A-Z, 0-9, space -- filter the list and scroll to active filter
            // filter has hard reset after 2s
            clearTimeout(this.filterTermTimeout);
            this.filterTermTimeout = setTimeout(() => {
                this.filterTerm = '';
            }, 2000);
            const char = event.key;
            this.filterTerm = this.filterTerm.concat(char);
            const index = this._textItems.findIndex((value) => {
                return new RegExp(`^${this.filterTerm.toLowerCase()}`).test(value.trim().toLowerCase());
            });
            if (index !== -1) {
                if (this.activeIndex !== -1) {
                    this._items.toArray()[this.activeIndex].active = false;
                }
                this.activeIndex = index;
                this._items.toArray()[this.activeIndex].active = true;
                this.scrollToActive();
            }
        }
        else if ([KeyCodes.BACKSPACE, KeyCodes.DELETE].includes(event.keyCode)) {
            Helpers.swallowEvent(event);
            // backspace, delete -- remove partial filters
            clearTimeout(this.filterTermTimeout);
            this.filterTermTimeout = setTimeout(() => {
                this.filterTerm = '';
            }, 2000);
            this.filterTerm = this.filterTerm.slice(0, -1);
        }
    }
    onOverlayKeyDown(event) {
        if (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER) {
            Helpers.swallowEvent(event);
            this.closePanel();
        }
    }
    scrollToActive() {
        const container = this.overlay.overlayRef.overlayElement.querySelector('.dropdown-container');
        const item = this._items.toArray()[this.activeIndex];
        if (container && item) {
            container.scrollTop = item.element.nativeElement.offsetTop;
        }
    }
}
NovoDropdownElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-dropdown',
                template: `
    <ng-content select="button" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div
        class="dropdown-container {{ containerClass }}"
        [style.height.px]="height"
        [class.has-height]="!!height"
        (keydown)="onOverlayKeyDown($event)"
      >
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `
            },] }
];
NovoDropdownElement.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
NovoDropdownElement.propDecorators = {
    parentScrollSelector: [{ type: Input }],
    parentScrollAction: [{ type: Input }],
    containerClass: [{ type: Input }],
    side: [{ type: Input }],
    scrollStrategy: [{ type: Input }],
    height: [{ type: Input }],
    width: [{ type: Input }],
    appendToBody: [{ type: Input }],
    toggled: [{ type: Output }],
    overlay: [{ type: ViewChild, args: [NovoOverlayTemplateComponent,] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
export class NovoItemElement {
    constructor(dropdown, element) {
        this.dropdown = dropdown;
        this.element = element;
        this.keepOpen = false;
        this.action = new EventEmitter();
        this.active = false;
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
NovoItemElement.decorators = [
    { type: Component, args: [{
                selector: 'item',
                template: '<ng-content></ng-content>',
                host: {
                    '[class.disabled]': 'disabled',
                    '[class.active]': 'active',
                }
            },] }
];
NovoItemElement.ctorParameters = () => [
    { type: NovoDropdownElement },
    { type: ElementRef }
];
NovoItemElement.propDecorators = {
    disabled: [{ type: Input }],
    keepOpen: [{ type: Input }],
    action: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
export class NovoDropdownListElement {
    constructor(dropdown) {
        this.dropdown = dropdown;
    }
    ngAfterContentInit() {
        this.dropdown.items = this.items;
        this.items.changes.subscribe(() => {
            this.dropdown.items = this.items;
        });
    }
}
NovoDropdownListElement.decorators = [
    { type: Component, args: [{
                selector: 'list',
                template: '<ng-content></ng-content>'
            },] }
];
NovoDropdownListElement.ctorParameters = () => [
    { type: NovoDropdownElement }
];
NovoDropdownListElement.propDecorators = {
    items: [{ type: ContentChildren, args: [NovoItemElement,] }]
};
export class NovoDropDownItemHeaderElement {
}
NovoDropDownItemHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'dropdown-item-header',
                template: '<ng-content></ng-content>'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Ryb3Bkb3duL0Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVELE1BQU07QUFDTixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWtCbEUsTUFBTSxPQUFPLG1CQUFtQjtJQTJDOUIsWUFBbUIsT0FBbUIsRUFBVSxHQUFzQjtRQUFuRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF2Q3RFLHVCQUFrQixHQUFXLE9BQU8sQ0FBQztRQUlyQyxTQUFJLEdBVWMsU0FBUyxDQUFDO1FBRTVCLG1CQUFjLEdBQXFDLFlBQVksQ0FBQztRQUloRSxVQUFLLEdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnRkFBZ0Y7UUFFcEcsaUJBQVksR0FBWSxLQUFLLENBQUMsQ0FBQyxhQUFhO1FBRzVDLFlBQU8sR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQVVyRCxnQkFBVyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFJOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENB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SUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQWZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsUUFBUSxFQUFFLDJCQUEyQjthQUN0Qzs7O1lBSytCLG1CQUFtQjs7O29CQUhoRCxlQUFlLFNBQUMsZUFBZTs7QUFpQmxDLE1BQU0sT0FBTyw2QkFBNkI7OztZQUp6QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFLDJCQUEyQjthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xyXG5pbXBvcnQgeyBLZXlDb2RlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2tleS1jb2Rlcy9LZXlDb2Rlcyc7XHJcbmltcG9ydCB7IG5vdGlmeSB9IGZyb20gJy4uLy4uL3V0aWxzL25vdGlmaWVyL25vdGlmaWVyLnV0aWwnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL292ZXJsYXkvT3ZlcmxheSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tZHJvcGRvd24nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJidXR0b25cIiAjdHJpZ2dlcj48L25nLWNvbnRlbnQ+XHJcbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlIFtwYXJlbnRdPVwiZWxlbWVudFwiIFt3aWR0aF09XCJ3aWR0aFwiIFtwb3NpdGlvbl09XCJzaWRlXCIgW3Njcm9sbFN0cmF0ZWd5XT1cInNjcm9sbFN0cmF0ZWd5XCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzcz1cImRyb3Bkb3duLWNvbnRhaW5lciB7eyBjb250YWluZXJDbGFzcyB9fVwiXHJcbiAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJoZWlnaHRcIlxyXG4gICAgICAgIFtjbGFzcy5oYXMtaGVpZ2h0XT1cIiEhaGVpZ2h0XCJcclxuICAgICAgICAoa2V5ZG93bik9XCJvbk92ZXJsYXlLZXlEb3duKCRldmVudClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbm92by1vdmVybGF5LXRlbXBsYXRlPlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvRHJvcGRvd25FbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpXHJcbiAgcGFyZW50U2Nyb2xsU2VsZWN0b3I6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIHBhcmVudFNjcm9sbEFjdGlvbjogc3RyaW5nID0gJ2Nsb3NlJztcclxuICBASW5wdXQoKVxyXG4gIGNvbnRhaW5lckNsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBzaWRlOlxyXG4gICAgfCAnZGVmYXVsdCdcclxuICAgIHwgJ3JpZ2h0J1xyXG4gICAgfCAnYWJvdmUtYmVsb3cnXHJcbiAgICB8ICdyaWdodC1hYm92ZS1iZWxvdydcclxuICAgIHwgJ2NlbnRlcidcclxuICAgIHwgJ2JvdHRvbSdcclxuICAgIHwgJ2JvdHRvbS1sZWZ0J1xyXG4gICAgfCAnYm90dG9tLXJpZ2h0J1xyXG4gICAgfCAndG9wLWxlZnQnXHJcbiAgICB8ICd0b3AtcmlnaHQnID0gJ2RlZmF1bHQnO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2Nyb2xsU3RyYXRlZ3k6ICdyZXBvc2l0aW9uJyB8ICdibG9jaycgfCAnY2xvc2UnID0gJ3JlcG9zaXRpb24nO1xyXG4gIEBJbnB1dCgpXHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgQElucHV0KClcclxuICB3aWR0aDogbnVtYmVyID0gLTE7IC8vIERlZmF1bHRzIHRvIGR5bmFtaWMgd2lkdGggKG5vIGhhcmRjb2RlZCB3aWR0aCB2YWx1ZSBhbmQgbm8gaG9zdCB3aWR0aCBsb29rdXApXHJcbiAgQElucHV0KClcclxuICBhcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSBmYWxzZTsgLy8gRGVwcmVjYXRlZFxyXG5cclxuICBAT3V0cHV0KClcclxuICB0b2dnbGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcclxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xyXG5cclxuICBjbGlja0hhbmRsZXI6IGFueTtcclxuICBjbG9zZUhhbmRsZXI6IGFueTtcclxuICBwYXJlbnRTY3JvbGxFbGVtZW50OiBFbGVtZW50O1xyXG4gIHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8Tm92b0l0ZW1FbGVtZW50PjtcclxuICBwcml2YXRlIF90ZXh0SXRlbXM6IHN0cmluZ1tdO1xyXG4gIHByaXZhdGUgYWN0aXZlSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gIHByaXZhdGUgZmlsdGVyVGVybTogc3RyaW5nID0gJyc7XHJcbiAgcHJpdmF0ZSBmaWx0ZXJUZXJtVGltZW91dDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlUGFuZWwuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuY2xvc2VIYW5kbGVyID0gdGhpcy5jbG9zZVBhbmVsLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkpIHtcclxuICAgICAgbm90aWZ5KGAnYXBwZW5kVG9Cb2R5JyBoYXMgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgcmVtb3ZlIHRoaXMgYXR0cmlidXRlLmApO1xyXG4gICAgfVxyXG4gICAgLy8gQWRkIGEgY2xpY2sgaGFuZGxlciB0byB0aGUgYnV0dG9uIHRvIHRvZ2dsZSB0aGUgbWVudVxyXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRTY3JvbGxTZWxlY3Rvcikge1xyXG4gICAgICB0aGlzLnBhcmVudFNjcm9sbEVsZW1lbnQgPSBIZWxwZXJzLmZpbmRBbmNlc3Rvcih0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5wYXJlbnRTY3JvbGxTZWxlY3Rvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvLyBSZW1vdmUgbGlzdGVuZXJcclxuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG4gICAgaWYgKGJ1dHRvbikge1xyXG4gICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wYXJlbnRTY3JvbGxFbGVtZW50ICYmIHRoaXMucGFyZW50U2Nyb2xsQWN0aW9uID09PSAnY2xvc2UnKSB7XHJcbiAgICAgIHRoaXMucGFyZW50U2Nyb2xsRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmNsb3NlSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGl0ZW1zKGl0ZW1zOiBRdWVyeUxpc3Q8Tm92b0l0ZW1FbGVtZW50Pikge1xyXG4gICAgdGhpcy5faXRlbXMgPSBpdGVtcztcclxuICAgIHRoaXMuYWN0aXZlSW5kZXggPSAtMTtcclxuICAgIC8vIEdldCB0aGUgaW5uZXJUZXh0IG9mIGFsbCB0aGUgaXRlbXMgdG8gYWxsb3cgZm9yIHNlYXJjaGluZ1xyXG4gICAgdGhpcy5fdGV4dEl0ZW1zID0gaXRlbXMubWFwKChpdGVtOiBOb3ZvSXRlbUVsZW1lbnQpID0+IHtcclxuICAgICAgcmV0dXJuIGl0ZW0uZWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVyVGV4dDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEJFR0lOOiBDb252ZW5pZW50IFBhbmVsIE1ldGhvZHMuICovXHJcbiAgcHVibGljIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5ICYmIHRoaXMub3ZlcmxheS5wYW5lbE9wZW47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlblBhbmVsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xyXG4gICAgaWYgKHRoaXMucGFyZW50U2Nyb2xsRWxlbWVudCAmJiB0aGlzLnBhcmVudFNjcm9sbEFjdGlvbiA9PT0gJ2Nsb3NlJykge1xyXG4gICAgICB0aGlzLnBhcmVudFNjcm9sbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5jbG9zZUhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVkLmVtaXQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvc2VQYW5lbCgpOiB2b2lkIHtcclxuICAgIHRoaXMub3ZlcmxheS5jbG9zZVBhbmVsKCk7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRTY3JvbGxFbGVtZW50ICYmIHRoaXMucGFyZW50U2Nyb2xsQWN0aW9uID09PSAnY2xvc2UnKSB7XHJcbiAgICAgIHRoaXMucGFyZW50U2Nyb2xsRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmNsb3NlSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICAvLyBDbGVhciBhY3RpdmUgaW5kZXhcclxuICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9PSAtMSkge1xyXG4gICAgICB0aGlzLl9pdGVtcy50b0FycmF5KClbdGhpcy5hY3RpdmVJbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZUluZGV4ID0gLTE7XHJcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIHRoaXMudG9nZ2xlZC5lbWl0KGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVQYW5lbCgpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWxPcGVuID8gdGhpcy5jbG9zZVBhbmVsKCkgOiB0aGlzLm9wZW5QYW5lbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVORDogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuRVNDKSB7XHJcbiAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcclxuICAgICAgLy8gYWN0aXZlICYgZXNjIGhpdCAtLSBjbG9zZVxyXG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuRU5URVIpIHtcclxuICAgICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgICAvLyBlbnRlciAtLSBwZXJmb3JtIHRoZSBcImNsaWNrXCJcclxuICAgICAgdGhpcy5faXRlbXMudG9BcnJheSgpW3RoaXMuYWN0aXZlSW5kZXhdLm9uQ2xpY2soZXZlbnQpO1xyXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2Rlcy5ET1dOKSB7XHJcbiAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcclxuICAgICAgLy8gZG93biAtIG5hdmlnYXRlIHRocm91Z2ggdGhlIGxpc3QgaWdub3JpbmcgZGlzYWJsZWQgb25lc1xyXG4gICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICB0aGlzLl9pdGVtcy50b0FycmF5KClbdGhpcy5hY3RpdmVJbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5hY3RpdmVJbmRleCsrO1xyXG4gICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCA9PT0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgd2hpbGUgKHRoaXMuX2l0ZW1zLnRvQXJyYXkoKVt0aGlzLmFjdGl2ZUluZGV4XS5kaXNhYmxlZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXgrKztcclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCA9PT0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5faXRlbXMudG9BcnJheSgpW3RoaXMuYWN0aXZlSW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc2Nyb2xsVG9BY3RpdmUoKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuVVApIHtcclxuICAgICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgICAvLyB1cCAtLSBuYXZpZ2F0ZSB0aHJvdWdoIHRoZSBsaXN0IGlnbm9yaW5nIGRpc2FibGVkIG9uZXNcclxuICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5faXRlbXMudG9BcnJheSgpW3RoaXMuYWN0aXZlSW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYWN0aXZlSW5kZXgtLTtcclxuICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggPCAwKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuICAgICAgd2hpbGUgKHRoaXMuX2l0ZW1zLnRvQXJyYXkoKVt0aGlzLmFjdGl2ZUluZGV4XS5kaXNhYmxlZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXgtLTtcclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCA8IDApIHtcclxuICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9pdGVtcy50b0FycmF5KClbdGhpcy5hY3RpdmVJbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zY3JvbGxUb0FjdGl2ZSgpO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgKGV2ZW50LmtleUNvZGUgPj0gNjUgJiYgZXZlbnQua2V5Q29kZSA8PSA5MCkgfHxcclxuICAgICAgKGV2ZW50LmtleUNvZGUgPj0gOTYgJiYgZXZlbnQua2V5Q29kZSA8PSAxMDUpIHx8XHJcbiAgICAgIChldmVudC5rZXlDb2RlID49IDQ4ICYmIGV2ZW50LmtleUNvZGUgPD0gNTcpIHx8XHJcbiAgICAgIGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGVzLlNQQUNFXHJcbiAgICApIHtcclxuICAgICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgICAvLyBBLVosIDAtOSwgc3BhY2UgLS0gZmlsdGVyIHRoZSBsaXN0IGFuZCBzY3JvbGwgdG8gYWN0aXZlIGZpbHRlclxyXG4gICAgICAvLyBmaWx0ZXIgaGFzIGhhcmQgcmVzZXQgYWZ0ZXIgMnNcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZmlsdGVyVGVybVRpbWVvdXQpO1xyXG4gICAgICB0aGlzLmZpbHRlclRlcm1UaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJUZXJtID0gJyc7XHJcbiAgICAgIH0sIDIwMDApO1xyXG4gICAgICBjb25zdCBjaGFyID0gZXZlbnQua2V5O1xyXG4gICAgICB0aGlzLmZpbHRlclRlcm0gPSB0aGlzLmZpbHRlclRlcm0uY29uY2F0KGNoYXIpO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX3RleHRJdGVtcy5maW5kSW5kZXgoKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgXiR7dGhpcy5maWx0ZXJUZXJtLnRvTG93ZXJDYXNlKCl9YCkudGVzdCh2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLl9pdGVtcy50b0FycmF5KClbdGhpcy5hY3RpdmVJbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLl9pdGVtcy50b0FycmF5KClbdGhpcy5hY3RpdmVJbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRvQWN0aXZlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoW0tleUNvZGVzLkJBQ0tTUEFDRSwgS2V5Q29kZXMuREVMRVRFXS5pbmNsdWRlcyhldmVudC5rZXlDb2RlKSkge1xyXG4gICAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XHJcbiAgICAgIC8vIGJhY2tzcGFjZSwgZGVsZXRlIC0tIHJlbW92ZSBwYXJ0aWFsIGZpbHRlcnNcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZmlsdGVyVGVybVRpbWVvdXQpO1xyXG4gICAgICB0aGlzLmZpbHRlclRlcm1UaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJUZXJtID0gJyc7XHJcbiAgICAgIH0sIDIwMDApO1xyXG4gICAgICB0aGlzLmZpbHRlclRlcm0gPSB0aGlzLmZpbHRlclRlcm0uc2xpY2UoMCwgLTEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uT3ZlcmxheUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2Rlcy5FU0MgfHwgZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuRU5URVIpIHtcclxuICAgICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2Nyb2xsVG9BY3RpdmUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLm92ZXJsYXkub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMudG9BcnJheSgpW3RoaXMuYWN0aXZlSW5kZXhdO1xyXG4gICAgaWYgKGNvbnRhaW5lciAmJiBpdGVtKSB7XHJcbiAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBpdGVtLmVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2l0ZW0nLFxyXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXHJcbiAgfSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtRWxlbWVudCB7XHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBwdWJsaWMga2VlcE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICBAT3V0cHV0KClcclxuICBwdWJsaWMgYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHVibGljIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRyb3Bkb3duOiBOb3ZvRHJvcGRvd25FbGVtZW50LCBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge31cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgLy8gUG9vciBtYW4ncyBkaXNhYmxlXHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgLy8gQ2xvc2UgaWYga2VlcE9wZW4gaXMgZmFsc2VcclxuICAgICAgaWYgKCF0aGlzLmtlZXBPcGVuKSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5jbG9zZVBhbmVsKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gRW1pdCB0aGUgYWN0aW9uXHJcbiAgICAgIHRoaXMuYWN0aW9uLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGlzdCcsXHJcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wZG93bkxpc3RFbGVtZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvSXRlbUVsZW1lbnQpXHJcbiAgcHVibGljIGl0ZW1zOiBRdWVyeUxpc3Q8Tm92b0l0ZW1FbGVtZW50PjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkcm9wZG93bjogTm92b0Ryb3Bkb3duRWxlbWVudCkge31cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZHJvcGRvd24uaXRlbXMgPSB0aGlzLml0ZW1zO1xyXG4gICAgdGhpcy5pdGVtcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZHJvcGRvd24uaXRlbXMgPSB0aGlzLml0ZW1zO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Ryb3Bkb3duLWl0ZW0taGVhZGVyJyxcclxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0Ryb3BEb3duSXRlbUhlYWRlckVsZW1lbnQge31cclxuIl19