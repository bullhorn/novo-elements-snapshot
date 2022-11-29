var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NovoFieldElement, NOVO_FORM_FIELD } from '../field';
import { NovoOverlayTemplateComponent } from 'novo-elements/common/overlay';
import { NovoButtonElement } from 'novo-elements/components/button';
import { BooleanInput } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/components/button";
import * as i2 from "novo-elements/common/overlay";
import * as i3 from "novo-elements/common";
import * as i4 from "../field";
export class NovoPickerToggleElement {
    constructor(_elementRef, cdr, defaultTabIndex, _formField) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this._formField = _formField;
        this._stateChanges = Subscription.EMPTY;
        this._onDestroy = new Subject();
        /** Determines whether the overlay is triggered on input focus or solely button click. */
        this.triggerOnFocus = false;
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        if (this._disabled === undefined && this.picker) {
            return this.picker.disabled;
        }
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnChanges(changes) {
        if (changes.picker) {
            this._watchStateChanges();
        }
    }
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    ngAfterViewInit() {
        this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
    }
    checkPanel() {
        if (this.triggerOnFocus && this._formField._control.focused) {
            this.openPanel();
        }
    }
    togglePanel(event) {
        this.cdr.detectChanges();
        this.overlay.parent = this.element;
        if (!this.overlay.panelOpen) {
            this.openPanel(event);
        }
        else {
            this.closePanel(event);
        }
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel(event) {
        if (!this.overlay.panelOpen) {
            this.overlay.parent = this.element;
            this.overlay.openPanel();
        }
    }
    closePanel(event) {
        this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    _watchStateChanges() {
        this._formField._control?.stateChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.checkPanel();
        });
    }
}
NovoPickerToggleElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerToggleElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoPickerToggleElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: { picker: ["for", "picker"], icon: "icon", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], triggerOnFocus: "triggerOnFocus", overlayId: "overlayId", width: "width", disabled: "disabled" }, host: { listeners: { "focus": "_button.focus()" }, properties: { "attr.tabindex": "disabled ? null : -1", "class.novo-toggle-active": "picker && picker.opened", "class.novo-accent": "picker && picker.color === \"accent\"", "class.novo-warn": "picker && picker.color === \"warn\"" }, classAttribute: "novo-picker-toggle" }, viewQueries: [{ propertyName: "_button", first: true, predicate: ["button"], descendants: true }, { propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoPickerToggle"], usesOnChanges: true, ngImport: i0, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [width]=\"width\" [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", styles: [""], components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }, { type: i2.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "role", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoPickerToggleElement.prototype, "triggerOnFocus", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerToggleElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-picker-toggle', host: {
                        class: 'novo-picker-toggle',
                        // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                        // consumer may have provided, while still being able to receive focus.
                        '[attr.tabindex]': 'disabled ? null : -1',
                        '[class.novo-toggle-active]': 'picker && picker.opened',
                        '[class.novo-accent]': 'picker && picker.color === "accent"',
                        '[class.novo-warn]': 'picker && picker.color === "warn"',
                        '(focus)': '_button.focus()',
                    }, exportAs: 'novoPickerToggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [width]=\"width\" [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }, { type: i4.NovoFieldElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_FORM_FIELD]
                }] }]; }, propDecorators: { picker: [{
                type: Input,
                args: ['for']
            }], icon: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], triggerOnFocus: [{
                type: Input
            }], overlayId: [{
                type: Input
            }], width: [{
                type: Input
            }], disabled: [{
                type: Input
            }], _button: [{
                type: ViewChild,
                args: ['button']
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2ZpZWxkL3RvZ2dsZS9waWNrZXItdG9nZ2xlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZmllbGQvdG9nZ2xlL3BpY2tlci10b2dnbGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUdMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBRVIsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQW9CbkQsTUFBTSxPQUFPLHVCQUF1QjtJQWlEbEMsWUFDVSxXQUF1QixFQUN2QixHQUFzQixFQUNQLGVBQXVCLEVBQ0QsVUFBNEI7UUFIakUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFFZSxlQUFVLEdB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ICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm92b0ZpZWxkRWxlbWVudCwgTk9WT19GT1JNX0ZJRUxEIH0gZnJvbSAnLi4vZmllbGQnO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uL292ZXJsYXknO1xuaW1wb3J0IHsgTm92b0J1dHRvbkVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvYnV0dG9uJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXBpY2tlci10b2dnbGUnLFxuICB0ZW1wbGF0ZVVybDogJ3BpY2tlci10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGlja2VyLXRvZ2dsZS5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXBpY2tlci10b2dnbGUnLFxuICAgIC8vIEFsd2F5cyBzZXQgdGhlIHRhYmluZGV4IHRvIC0xIHNvIHRoYXQgaXQgZG9lc24ndCBvdmVybGFwIHdpdGggYW55IGN1c3RvbSB0YWJpbmRleCB0aGVcbiAgICAvLyBjb25zdW1lciBtYXkgaGF2ZSBwcm92aWRlZCwgd2hpbGUgc3RpbGwgYmVpbmcgYWJsZSB0byByZWNlaXZlIGZvY3VzLlxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyBudWxsIDogLTEnLFxuICAgICdbY2xhc3Mubm92by10b2dnbGUtYWN0aXZlXSc6ICdwaWNrZXIgJiYgcGlja2VyLm9wZW5lZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLWFjY2VudF0nOiAncGlja2VyICYmIHBpY2tlci5jb2xvciA9PT0gXCJhY2NlbnRcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLXdhcm5dJzogJ3BpY2tlciAmJiBwaWNrZXIuY29sb3IgPT09IFwid2FyblwiJyxcbiAgICAnKGZvY3VzKSc6ICdfYnV0dG9uLmZvY3VzKCknLFxuICB9LFxuICBleHBvcnRBczogJ25vdm9QaWNrZXJUb2dnbGUnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQ8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3N0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogRGF0ZXBpY2tlciBpbnN0YW5jZSB0aGF0IHRoZSBidXR0b24gd2lsbCB0b2dnbGUuICovXG4gIEBJbnB1dCgnZm9yJykgcGlja2VyOiBUO1xuXG4gIEBJbnB1dCgpIGljb246IHN0cmluZztcblxuICAvKiogVGFiaW5kZXggZm9yIHRoZSB0b2dnbGUuICovXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXIgfCBudWxsO1xuXG4gIC8qKiBTY3JlZW5yZWFkZXIgbGFiZWwgZm9yIHRoZSBidXR0b24uICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG92ZXJsYXkgaXMgdHJpZ2dlcmVkIG9uIGlucHV0IGZvY3VzIG9yIHNvbGVseSBidXR0b24gY2xpY2suICovXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICB0cmlnZ2VyT25Gb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBBbiBpZCB0byBzZWxlY3QgdGhlIGNvcnJlY3Qgb3ZlcmxheS4qL1xuICBASW5wdXQoKSBvdmVybGF5SWQ6IHN0cmluZztcblxuICAvKiogV2lkdGggdG8gcGFzcyB0byBvdmVybGF5LiovXG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRvZ2dsZSBidXR0b24gaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnBpY2tlcikge1xuICAgICAgcmV0dXJuICh0aGlzLnBpY2tlciBhcyBhbnkpLmRpc2FibGVkO1xuICAgIH1cblxuICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAvKiogVW5kZXJseWluZyBidXR0b24gZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgnYnV0dG9uJykgX2J1dHRvbjogTm92b0J1dHRvbkVsZW1lbnQ7XG5cbiAgLyoqIEVsZW1lbnQgZm9yIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuXG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSBkZWZhdWx0VGFiSW5kZXg6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fRk9STV9GSUVMRCkgcHJpdmF0ZSBfZm9ybUZpZWxkOiBOb3ZvRmllbGRFbGVtZW50LFxuICApIHtcbiAgICBjb25zdCBwYXJzZWRUYWJJbmRleCA9IE51bWJlcihkZWZhdWx0VGFiSW5kZXgpO1xuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZWRUYWJJbmRleCB8fCBwYXJzZWRUYWJJbmRleCA9PT0gMCA/IHBhcnNlZFRhYkluZGV4IDogbnVsbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5waWNrZXIpIHtcbiAgICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl93YXRjaFN0YXRlQ2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuX2Zvcm1GaWVsZC5nZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCkgfHwgdGhpcy5fZWxlbWVudFJlZjtcbiAgfVxuXG4gIGNoZWNrUGFuZWwoKSB7XG4gICAgaWYgKHRoaXMudHJpZ2dlck9uRm9jdXMgJiYgdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLmZvY3VzZWQpIHtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUGFuZWwoZXZlbnQ/OiBFdmVudCkge1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLm92ZXJsYXkucGFyZW50ID0gdGhpcy5lbGVtZW50O1xuICAgIGlmICghdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBCRUdJTjogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5vdmVybGF5LnBhcmVudCA9IHRoaXMuZWxlbWVudDtcbiAgICAgIHRoaXMub3ZlcmxheS5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVBhbmVsKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5ICYmIHRoaXMub3ZlcmxheS5wYW5lbE9wZW47XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFN0YXRlQ2hhbmdlcygpIHtcbiAgICB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2w/LnN0YXRlQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja1BhbmVsKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIjxub3ZvLWJ1dHRvblxuICAjYnV0dG9uXG4gIHRoZW1lPVwiaWNvblwiXG4gIFtpY29uXT1cImljb25cIlxuICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cIidkaWFsb2cnXCJcbiAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyAtMSA6IHRhYkluZGV4XCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgKGNsaWNrKT1cInRvZ2dsZVBhbmVsKCRldmVudClcIj48L25vdm8tYnV0dG9uPlxuXG48bm92by1vdmVybGF5LXRlbXBsYXRlIFt3aWR0aF09XCJ3aWR0aFwiIFtwYXJlbnRdPVwiZWxlbWVudFwiIHBvc2l0aW9uPVwiYWJvdmUtYmVsb3dcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+Il19