// NG
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, NgZone, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
// App
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
// Value accessor for the component (supports ngModel)
const SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSelectElement),
    multi: true,
};
export class NovoSelectElement {
    constructor(element, labels, ref, focusMonitor, ngZone) {
        this.element = element;
        this.labels = labels;
        this.ref = ref;
        this.focusMonitor = focusMonitor;
        this.ngZone = ngZone;
        this.placeholder = 'Select...';
        this.onSelect = new EventEmitter();
        this.selectedIndex = -1;
        this.empty = true;
        this.header = {
            open: false,
            valid: true,
            value: '',
        };
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.filterTerm = '';
        this.disabled = false;
    }
    ngOnInit() {
        this.focusMonitor.monitor(this.dropdown.nativeElement).subscribe((origin) => this.ngZone.run(() => {
            if (origin === 'keyboard' && !this.disabled) {
                this.openPanel();
            }
        }));
        this.ngOnChanges();
    }
    ngOnChanges(changes) {
        this.readonly = this.readonly === true;
        if (this.options && this.options.length && typeof this.options[0] === 'string') {
            this.filteredOptions = this.options.map((item) => {
                return { value: item, label: item };
            });
        }
        else {
            this.filteredOptions = (this.options || [])
                .filter((item) => {
                return !item.readOnly;
            })
                .map((element) => {
                return Object.assign(Object.assign({}, element), { active: false });
            });
        }
        if (!this.model && !this.createdItem) {
            this.clear();
        }
        else if (this.createdItem) {
            const item = this.options.find((i) => i.label === this.createdItem);
            const index = this.options.indexOf(item);
            this.select(item, index);
        }
        else {
            this.writeValue(this.model);
        }
        if (this.panelOpen) {
            this.openPanel();
        }
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.dropdown.nativeElement);
    }
    /** BEGIN: Convienient Panel Methods. */
    openPanel() {
        this.overlay.openPanel();
    }
    closePanel() {
        this.overlay.closePanel();
    }
    togglePanel() {
        if (this.panelOpen) {
            this.closePanel();
        }
        else {
            setTimeout(() => {
                this.dropdown.nativeElement.focus();
            });
            this.openPanel();
        }
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convenient Panel Methods. */
    /**
     * If the item is not disabled, this method closes the panel, and if a value is specified,
     * also sets the associated control to that value. It will also mark the control as dirty
     * if this interaction stemmed from the user.
     */
    setValueAndClose(event) {
        var _a;
        if (!((_a = event.value) === null || _a === void 0 ? void 0 : _a.disabled)) {
            if (event.value && event.index >= 0) {
                this.select(event.value, event.index);
            }
            this.closePanel();
        }
    }
    select(option, i, fireEvents = true) {
        if (this.selected) {
            this.selected.active = false;
        }
        this.selectedIndex = i;
        this.selected = option;
        this.selected.active = true;
        this.empty = false;
        if (fireEvents) {
            this.onModelChange(this.selected.value);
            this.onSelect.emit({ selected: this.selected.value });
        }
    }
    clear() {
        if (this.selected) {
            this.selected.active = false;
        }
        this.selected = {
            label: this.placeholder,
            value: null,
            active: false,
        };
        this.header = {
            open: false,
            valid: true,
            value: '',
        };
        this.selectedIndex = -1;
        this.empty = true;
    }
    onKeyDown(event) {
        // To prevent default window scrolling
        if ([KeyCodes.UP, KeyCodes.DOWN].includes(event.keyCode)) {
            event.preventDefault();
        }
        if ([KeyCodes.ESC, KeyCodes.TAB].includes(event.keyCode)) {
            this.closePanel();
        }
        else if (event.keyCode === KeyCodes.ENTER) {
            if (this.header.open && this.header.value) {
                this.saveHeader();
            }
            else {
                this.setValueAndClose({
                    value: this.filteredOptions[this.selectedIndex],
                    index: this.selectedIndex,
                });
            }
        }
        else if (event.keyCode === KeyCodes.UP) {
            if (!this.panelOpen) {
                this.openPanel();
            }
            if (this.selectedIndex > 0) {
                this.selectedIndex--;
                this.select(this.filteredOptions[this.selectedIndex], this.selectedIndex);
                this.scrollToSelected();
            }
        }
        else if (event.keyCode === KeyCodes.DOWN) {
            if (!this.panelOpen) {
                this.openPanel();
            }
            if (this.selectedIndex < this.filteredOptions.length - 1) {
                this.selectedIndex++;
                this.select(this.filteredOptions[this.selectedIndex], this.selectedIndex);
                this.scrollToSelected();
                if (this.header.open) {
                    this.toggleHeader(null, false);
                }
            }
        }
        else if (event.keyCode === KeyCodes.UP && this.selectedIndex === 0) {
            if (!this.panelOpen) {
                this.openPanel();
            }
            this.selectedIndex--;
            this.toggleHeader(null, true);
        }
        else if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode === KeyCodes.SPACE) {
            if (event.keyCode === KeyCodes.SPACE) {
                event.preventDefault();
            }
            if (!this.panelOpen) {
                this.openPanel();
            }
            clearTimeout(this.filterTermTimeout);
            this.filterTermTimeout = setTimeout(() => {
                this.filterTerm = '';
            }, 2000);
            const char = event.key;
            this.filterTerm = this.filterTerm.concat(char).toUpperCase();
            const item = this.filteredOptions.find((i) => i.label.toUpperCase().indexOf(this.filterTerm) === 0);
            if (item) {
                this.select(item, this.filteredOptions.indexOf(item));
                this.scrollToSelected();
            }
        }
        else if ([KeyCodes.BACKSPACE, KeyCodes.DELETE].includes(event.keyCode)) {
            clearTimeout(this.filterTermTimeout);
            this.filterTermTimeout = setTimeout(() => {
                this.filterTerm = '';
            }, 2000);
            this.filterTerm = this.filterTerm.slice(0, -1);
        }
    }
    scrollToSelected() {
        this.scrollToIndex(this.selectedIndex);
    }
    scrollToIndex(index) {
        const element = this.overlay.overlayRef.overlayElement;
        const list = element.querySelector('.novo-select-list');
        const items = list.querySelectorAll('li');
        const item = items[this.headerConfig ? index + 1 : index];
        if (item) {
            list.scrollTop = item.offsetTop;
        }
    }
    toggleHeader(event, forceValue = false) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        // Reverse the active property (if forceValue, use that)
        this.header = {
            open: forceValue !== undefined ? forceValue : !this.header.open,
            value: '',
            valid: true,
        };
    }
    highlight(match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
    }
    escapeRegexp(queryToEscape) {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
    saveHeader() {
        if (this.header.value) {
            this.headerConfig.onSave(this.header.value);
            this.createdItem = this.header.value;
            this.closePanel();
        }
        else {
            this.header.valid = false;
        }
    }
    writeValue(model) {
        this.model = model;
        if (this.options) {
            let item = this.filteredOptions.find((i) => i.value === model || (model && i.value === model.id)) || this.options.find((i) => i.value === model || (model && i.value === model.id));
            if (!item && !Helpers.isEmpty(model)) {
                item = {
                    label: model,
                    value: model,
                };
                if (!item.readOnly) {
                    this.options.unshift(item);
                }
            }
            if (item) {
                this.select(item, this.filteredOptions.indexOf(item), false);
                this.empty = false;
            }
            else {
                this.clear();
            }
        }
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
}
NovoSelectElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-select',
                providers: [SELECT_VALUE_ACCESSOR],
                template: `
    <div #dropdownElement (click)="togglePanel(); (false)" tabIndex="{{ disabled ? -1 : 0 }}" type="button" [class.empty]="empty">
      {{ selected.label }}<i class="bhi-collapse"></i>
    </div>
    <novo-overlay-template [parent]="element" position="center" (closing)="dropdown.nativeElement.focus()">
      <ul class="novo-select-list" tabIndex="-1" [class.header]="headerConfig" [class.active]="panelOpen">
        <ng-content></ng-content>
        <li *ngIf="headerConfig" class="select-header" [class.open]="header.open">
          <button *ngIf="!header.open" (click)="toggleHeader($event); (false)" tabIndex="-1" type="button" class="header">
            <i class="bhi-add-thin"></i>&nbsp;{{ headerConfig.label }}
          </button>
          <div *ngIf="header.open" [ngClass]="{ active: header.open }">
            <input
              autofocus
              type="text"
              [placeholder]="headerConfig.placeholder"
              [attr.id]="name"
              autocomplete="false"
              [(ngModel)]="header.value"
              [ngClass]="{ invalid: !header.valid }"
            />
            <footer>
              <button (click)="toggleHeader($event, false)">{{ labels.cancel }}</button>
              <button (click)="saveHeader()" class="primary">{{ labels.save }}</button>
            </footer>
          </div>
        </li>
        <li
          *ngFor="let option of filteredOptions; let i = index"
          [ngClass]="{ active: option.active, disabled: option.disabled }"
          (click)="setValueAndClose({ value: option, index: i })"
          [attr.data-automation-value]="option.label"
          [tooltip]="option.tooltip"
          [tooltipPosition]="option.tooltipPosition || 'right'"
        >
          <span [innerHtml]="highlight(option.label, filterTerm)"></span> <i *ngIf="option.active" class="bhi-check"></i>
        </li>
      </ul>
    </novo-overlay-template>
  `,
                host: {
                    '(keydown)': 'onKeyDown($event)',
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoSelectElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: ChangeDetectorRef },
    { type: FocusMonitor },
    { type: NgZone }
];
NovoSelectElement.propDecorators = {
    name: [{ type: Input }],
    options: [{ type: Input }],
    placeholder: [{ type: Input }],
    readonly: [{ type: Input }],
    headerConfig: [{ type: Input }],
    onSelect: [{ type: Output }],
    overlay: [{ type: ViewChild, args: [NovoOverlayTemplateComponent, { static: true },] }],
    dropdown: [{ type: ViewChild, args: ['dropdownElement', { static: true },] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3NlbGVjdC9TZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSztBQUNMLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUVOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRCxNQUFNO0FBQ04sT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEUsc0RBQXNEO0FBQ3RELE1BQU0scUJBQXFCLEdBQUc7SUFDNUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQWtERixNQUFNLE9BQU8saUJBQWlCO0lBcUM1QixZQUNTLE9BQW1CLEVBQ25CLE1BQXdCLEVBQ3hCLEdBQXNCLEVBQ3JCLFlBQTBCLEVBQzFCLE1BQWM7UUFKZixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFwQ3hCLGdCQUFXLEdBQVcsV0FBVyxDQUFDO1FBTWxDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxrQkFBYSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFDdEIsV0FBTSxHQUFRO1lBQ1osSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQUlGLGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ25DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ3BDLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFHeEIsYUFBUSxHQUFZLEtBQUssQ0FBQztJQWN2QixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUF1QjtRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzlFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDL0MsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztpQkFDeEMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDeEIsQ0FBQyxDQUFDO2lCQUNELEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNmLHVDQUNLLE9BQU8sS0FDVixNQUFNLEVBQUUsS0FBSyxJQUNiO1lBQ0osQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMzQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLFNBQVM7UUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ2hELENBQUM7SUFDRCxxQ0FBcUM7SUFFckM7Ozs7T0FJRztJQUNILGdCQUFnQixDQUFDLEtBQWlCOztRQUNoQyxJQUFJLFFBQUMsS0FBSyxDQUFDLEtBQUssMENBQUUsUUFBUSxDQUFBLEVBQUU7WUFDMUIsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLGFBQXNCLElBQUk7UUFDMUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDOUI7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2QsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3ZCLEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNaLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFHRCxTQUFTLENBQUMsS0FBb0I7UUFDNUIsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUM7b0JBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7b0JBQy9DLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYTtpQkFDMUIsQ0FBQyxDQUFDO2FBQ0o7U0FDRjthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7WUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMxRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUN6QjtTQUNGO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtZQUNELElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO29CQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDaEM7YUFDRjtTQUNGO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLEVBQUU7WUFDcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMvQjthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLEtBQUssRUFBRTtZQUMzRixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDcEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtZQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzdELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekI7U0FDRjthQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hFLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQWE7UUFDekIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO1FBQ3ZELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN4RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFLLEVBQUUsYUFBc0IsS0FBSztRQUM3QyxJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7UUFDRCx3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNaLElBQUksRUFBRSxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQy9ELEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSztRQUNwQiw4RUFBOEU7UUFDOUUsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDMUcsQ0FBQztJQUVELFlBQVksQ0FBQyxhQUFhO1FBQ3hCLGtEQUFrRDtRQUNsRCxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEwsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksR0FBRztvQkFDTCxLQUFLLEVBQUUsS0FBSztvQkFDWixLQUFLLEVBQUUsS0FBSztpQkFDYixDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDNUI7YUFDRjtZQUNELElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtTQUNGO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBWTtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBWTtRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsUUFBaUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQzs7O1lBMVdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNUO2dCQUNELElBQUksRUFBRTtvQkFDSixXQUFXLEVBQUUsbUJBQW1CO2lCQUNqQztnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBMUVDLFVBQVU7WUFjSCxnQkFBZ0I7WUFoQnZCLGlCQUFpQjtZQUhWLFlBQVk7WUFVbkIsTUFBTTs7O21CQXVFTCxLQUFLO3NCQUVMLEtBQUs7MEJBRUwsS0FBSzt1QkFFTCxLQUFLOzJCQUVMLEtBQUs7dUJBRUwsTUFBTTtzQkFxQk4sU0FBUyxTQUFDLDRCQUE0QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt1QkFFeEQsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt3QkFpSTdDLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcbmltcG9ydCB7IEtleUNvZGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5LWNvZGVzL0tleUNvZGVzJztcbi8vIEFwcFxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL292ZXJsYXkvT3ZlcmxheSc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgU0VMRUNUX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1NlbGVjdEVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc2VsZWN0JyxcbiAgcHJvdmlkZXJzOiBbU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICNkcm9wZG93bkVsZW1lbnQgKGNsaWNrKT1cInRvZ2dsZVBhbmVsKCk7IChmYWxzZSlcIiB0YWJJbmRleD1cInt7IGRpc2FibGVkID8gLTEgOiAwIH19XCIgdHlwZT1cImJ1dHRvblwiIFtjbGFzcy5lbXB0eV09XCJlbXB0eVwiPlxuICAgICAge3sgc2VsZWN0ZWQubGFiZWwgfX08aSBjbGFzcz1cImJoaS1jb2xsYXBzZVwiPjwvaT5cbiAgICA8L2Rpdj5cbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlIFtwYXJlbnRdPVwiZWxlbWVudFwiIHBvc2l0aW9uPVwiY2VudGVyXCIgKGNsb3NpbmcpPVwiZHJvcGRvd24ubmF0aXZlRWxlbWVudC5mb2N1cygpXCI+XG4gICAgICA8dWwgY2xhc3M9XCJub3ZvLXNlbGVjdC1saXN0XCIgdGFiSW5kZXg9XCItMVwiIFtjbGFzcy5oZWFkZXJdPVwiaGVhZGVyQ29uZmlnXCIgW2NsYXNzLmFjdGl2ZV09XCJwYW5lbE9wZW5cIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8bGkgKm5nSWY9XCJoZWFkZXJDb25maWdcIiBjbGFzcz1cInNlbGVjdC1oZWFkZXJcIiBbY2xhc3Mub3Blbl09XCJoZWFkZXIub3BlblwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCIhaGVhZGVyLm9wZW5cIiAoY2xpY2spPVwidG9nZ2xlSGVhZGVyKCRldmVudCk7IChmYWxzZSlcIiB0YWJJbmRleD1cIi0xXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1hZGQtdGhpblwiPjwvaT4mbmJzcDt7eyBoZWFkZXJDb25maWcubGFiZWwgfX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVhZGVyLm9wZW5cIiBbbmdDbGFzc109XCJ7IGFjdGl2ZTogaGVhZGVyLm9wZW4gfVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJoZWFkZXJDb25maWcucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICBbYXR0ci5pZF09XCJuYW1lXCJcbiAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImhlYWRlci52YWx1ZVwiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgaW52YWxpZDogIWhlYWRlci52YWxpZCB9XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJ0b2dnbGVIZWFkZXIoJGV2ZW50LCBmYWxzZSlcIj57eyBsYWJlbHMuY2FuY2VsIH19PC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cInNhdmVIZWFkZXIoKVwiIGNsYXNzPVwicHJpbWFyeVwiPnt7IGxhYmVscy5zYXZlIH19PC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJlZE9wdGlvbnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBvcHRpb24uYWN0aXZlLCBkaXNhYmxlZDogb3B0aW9uLmRpc2FibGVkIH1cIlxuICAgICAgICAgIChjbGljayk9XCJzZXRWYWx1ZUFuZENsb3NlKHsgdmFsdWU6IG9wdGlvbiwgaW5kZXg6IGkgfSlcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi12YWx1ZV09XCJvcHRpb24ubGFiZWxcIlxuICAgICAgICAgIFt0b29sdGlwXT1cIm9wdGlvbi50b29sdGlwXCJcbiAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cIm9wdGlvbi50b29sdGlwUG9zaXRpb24gfHwgJ3JpZ2h0J1wiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cImhpZ2hsaWdodChvcHRpb24ubGFiZWwsIGZpbHRlclRlcm0pXCI+PC9zcGFuPiA8aSAqbmdJZj1cIm9wdGlvbi5hY3RpdmVcIiBjbGFzcz1cImJoaS1jaGVja1wiPjwvaT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIG9wdGlvbnM6IEFycmF5PGFueT47XG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VsZWN0Li4uJztcbiAgQElucHV0KClcbiAgcmVhZG9ubHk6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGhlYWRlckNvbmZpZzogYW55O1xuICBAT3V0cHV0KClcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IC0xO1xuICBlbXB0eTogYm9vbGVhbiA9IHRydWU7XG4gIGhlYWRlcjogYW55ID0ge1xuICAgIG9wZW46IGZhbHNlLFxuICAgIHZhbGlkOiB0cnVlLFxuICAgIHZhbHVlOiAnJyxcbiAgfTtcbiAgY3JlYXRlZEl0ZW06IGFueTtcbiAgc2VsZWN0ZWQ6IGFueTtcbiAgbW9kZWw6IGFueTtcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIGZpbHRlclRlcm06IHN0cmluZyA9ICcnO1xuICBmaWx0ZXJUZXJtVGltZW91dDtcbiAgZmlsdGVyZWRPcHRpb25zOiBhbnk7XG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEVsZW1lbnQgZm9yIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdkcm9wZG93bkVsZW1lbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBkcm9wZG93bjogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICAgIHB1YmxpYyByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50KS5zdWJzY3JpYmUoKG9yaWdpbikgPT5cbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgIGlmIChvcmlnaW4gPT09ICdrZXlib2FyZCcgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICAgIHRoaXMubmdPbkNoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5yZWFkb25seSA9IHRoaXMucmVhZG9ubHkgPT09IHRydWU7XG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoICYmIHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGl0ZW0sIGxhYmVsOiBpdGVtIH07XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSAodGhpcy5vcHRpb25zIHx8IFtdKVxuICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICFpdGVtLnJlYWRPbmx5O1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmVsZW1lbnQsXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMubW9kZWwgJiYgIXRoaXMuY3JlYXRlZEl0ZW0pIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3JlYXRlZEl0ZW0pIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLm9wdGlvbnMuZmluZCgoaSkgPT4gaS5sYWJlbCA9PT0gdGhpcy5jcmVhdGVkSXRlbSk7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMub3B0aW9ucy5pbmRleE9mKGl0ZW0pO1xuICAgICAgdGhpcy5zZWxlY3QoaXRlbSwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5tb2RlbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgLyoqIEJFR0lOOiBDb252aWVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgY2xvc2VQYW5lbCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgdG9nZ2xlUGFuZWwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkucGFuZWxPcGVuO1xuICB9XG4gIC8qKiBFTkQ6IENvbnZlbmllbnQgUGFuZWwgTWV0aG9kcy4gKi9cblxuICAvKipcbiAgICogSWYgdGhlIGl0ZW0gaXMgbm90IGRpc2FibGVkLCB0aGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsXG4gICAqIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZCBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5XG4gICAqIGlmIHRoaXMgaW50ZXJhY3Rpb24gc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgKi9cbiAgc2V0VmFsdWVBbmRDbG9zZShldmVudDogYW55IHwgbnVsbCk6IHZvaWQge1xuICAgIGlmICghZXZlbnQudmFsdWU/LmRpc2FibGVkKSB7XG4gICAgICBpZiAoZXZlbnQudmFsdWUgJiYgZXZlbnQuaW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLnNlbGVjdChldmVudC52YWx1ZSwgZXZlbnQuaW5kZXgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0KG9wdGlvbiwgaSwgZmlyZUV2ZW50czogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICB0aGlzLnNlbGVjdGVkID0gb3B0aW9uO1xuICAgIHRoaXMuc2VsZWN0ZWQuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmVtcHR5ID0gZmFsc2U7XG4gICAgaWYgKGZpcmVFdmVudHMpIHtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnNlbGVjdGVkLnZhbHVlKTtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh7IHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkLnZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkID0ge1xuICAgICAgbGFiZWw6IHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLmhlYWRlciA9IHtcbiAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICB2YWx1ZTogJycsXG4gICAgfTtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICB0aGlzLmVtcHR5ID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBUbyBwcmV2ZW50IGRlZmF1bHQgd2luZG93IHNjcm9sbGluZ1xuICAgIGlmIChbS2V5Q29kZXMuVVAsIEtleUNvZGVzLkRPV05dLmluY2x1ZGVzKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoW0tleUNvZGVzLkVTQywgS2V5Q29kZXMuVEFCXS5pbmNsdWRlcyhldmVudC5rZXlDb2RlKSkge1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2Rlcy5FTlRFUikge1xuICAgICAgaWYgKHRoaXMuaGVhZGVyLm9wZW4gJiYgdGhpcy5oZWFkZXIudmFsdWUpIHtcbiAgICAgICAgdGhpcy5zYXZlSGVhZGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFZhbHVlQW5kQ2xvc2Uoe1xuICAgICAgICAgIHZhbHVlOiB0aGlzLmZpbHRlcmVkT3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLFxuICAgICAgICAgIGluZGV4OiB0aGlzLnNlbGVjdGVkSW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuVVApIHtcbiAgICAgIGlmICghdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPiAwKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleC0tO1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmZpbHRlcmVkT3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLCB0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB0aGlzLnNjcm9sbFRvU2VsZWN0ZWQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGVzLkRPV04pIHtcbiAgICAgIGlmICghdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPCB0aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCsrO1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmZpbHRlcmVkT3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLCB0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB0aGlzLnNjcm9sbFRvU2VsZWN0ZWQoKTtcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyLm9wZW4pIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZUhlYWRlcihudWxsLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGVzLlVQICYmIHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgICAgaWYgKCF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4LS07XG4gICAgICB0aGlzLnRvZ2dsZUhlYWRlcihudWxsLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKChldmVudC5rZXlDb2RlID49IDY1ICYmIGV2ZW50LmtleUNvZGUgPD0gOTApIHx8IGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGVzLlNQQUNFKSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuU1BBQ0UpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH1cbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZpbHRlclRlcm1UaW1lb3V0KTtcbiAgICAgIHRoaXMuZmlsdGVyVGVybVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXJUZXJtID0gJyc7XG4gICAgICB9LCAyMDAwKTtcbiAgICAgIGNvbnN0IGNoYXIgPSBldmVudC5rZXk7XG4gICAgICB0aGlzLmZpbHRlclRlcm0gPSB0aGlzLmZpbHRlclRlcm0uY29uY2F0KGNoYXIpLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5maWx0ZXJlZE9wdGlvbnMuZmluZCgoaSkgPT4gaS5sYWJlbC50b1VwcGVyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXJUZXJtKSA9PT0gMCk7XG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICB0aGlzLnNlbGVjdChpdGVtLCB0aGlzLmZpbHRlcmVkT3B0aW9ucy5pbmRleE9mKGl0ZW0pKTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb1NlbGVjdGVkKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChbS2V5Q29kZXMuQkFDS1NQQUNFLCBLZXlDb2Rlcy5ERUxFVEVdLmluY2x1ZGVzKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5maWx0ZXJUZXJtVGltZW91dCk7XG4gICAgICB0aGlzLmZpbHRlclRlcm1UaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZmlsdGVyVGVybSA9ICcnO1xuICAgICAgfSwgMjAwMCk7XG4gICAgICB0aGlzLmZpbHRlclRlcm0gPSB0aGlzLmZpbHRlclRlcm0uc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgfVxuXG4gIHNjcm9sbFRvU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5zY3JvbGxUb0luZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gIH1cblxuICBzY3JvbGxUb0luZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5vdmVybGF5Lm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQ7XG4gICAgY29uc3QgbGlzdCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5vdm8tc2VsZWN0LWxpc3QnKTtcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcbiAgICBjb25zdCBpdGVtID0gaXRlbXNbdGhpcy5oZWFkZXJDb25maWcgPyBpbmRleCArIDEgOiBpbmRleF07XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbS5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlSGVhZGVyKGV2ZW50LCBmb3JjZVZhbHVlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgLy8gUmV2ZXJzZSB0aGUgYWN0aXZlIHByb3BlcnR5IChpZiBmb3JjZVZhbHVlLCB1c2UgdGhhdClcbiAgICB0aGlzLmhlYWRlciA9IHtcbiAgICAgIG9wZW46IGZvcmNlVmFsdWUgIT09IHVuZGVmaW5lZCA/IGZvcmNlVmFsdWUgOiAhdGhpcy5oZWFkZXIub3BlbixcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBoaWdobGlnaHQobWF0Y2gsIHF1ZXJ5KSB7XG4gICAgLy8gUmVwbGFjZXMgdGhlIGNhcHR1cmUgc3RyaW5nIHdpdGggYSB0aGUgc2FtZSBzdHJpbmcgaW5zaWRlIG9mIGEgXCJzdHJvbmdcIiB0YWdcbiAgICByZXR1cm4gcXVlcnkgPyBtYXRjaC5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5lc2NhcGVSZWdleHAocXVlcnkpLCAnZ2knKSwgJzxzdHJvbmc+JCY8L3N0cm9uZz4nKSA6IG1hdGNoO1xuICB9XG5cbiAgZXNjYXBlUmVnZXhwKHF1ZXJ5VG9Fc2NhcGUpIHtcbiAgICAvLyBFeDogaWYgdGhlIGNhcHR1cmUgaXMgXCJhXCIgdGhlIHJlc3VsdCB3aWxsIGJlIFxcYVxuICAgIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XG4gIH1cblxuICBzYXZlSGVhZGVyKCkge1xuICAgIGlmICh0aGlzLmhlYWRlci52YWx1ZSkge1xuICAgICAgdGhpcy5oZWFkZXJDb25maWcub25TYXZlKHRoaXMuaGVhZGVyLnZhbHVlKTtcbiAgICAgIHRoaXMuY3JlYXRlZEl0ZW0gPSB0aGlzLmhlYWRlci52YWx1ZTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlYWRlci52YWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICBsZXQgaXRlbSA9IHRoaXMuZmlsdGVyZWRPcHRpb25zLmZpbmQoKGkpID0+IGkudmFsdWUgPT09IG1vZGVsIHx8IChtb2RlbCAmJiBpLnZhbHVlID09PSBtb2RlbC5pZCkpIHx8IHRoaXMub3B0aW9ucy5maW5kKChpKSA9PiBpLnZhbHVlID09PSBtb2RlbCB8fCAobW9kZWwgJiYgaS52YWx1ZSA9PT0gbW9kZWwuaWQpKTtcbiAgICAgIGlmICghaXRlbSAmJiAhSGVscGVycy5pc0VtcHR5KG1vZGVsKSkge1xuICAgICAgICBpdGVtID0ge1xuICAgICAgICAgIGxhYmVsOiBtb2RlbCxcbiAgICAgICAgICB2YWx1ZTogbW9kZWwsXG4gICAgICAgIH07XG4gICAgICAgIGlmICghaXRlbS5yZWFkT25seSkge1xuICAgICAgICAgIHRoaXMub3B0aW9ucy51bnNoaWZ0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICB0aGlzLnNlbGVjdChpdGVtLCB0aGlzLmZpbHRlcmVkT3B0aW9ucy5pbmRleE9mKGl0ZW0pLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZW1wdHkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxufVxuIl19