// NG2
import { Component, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
// Vendor
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// APP
import { ComponentUtils } from 'novo-elements/services';
import { BaseRenderer } from './../base-renderer';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "../date-cell/DateCell";
export class TableCell {
    constructor(element, componentUtils) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.value = '';
        this.element = element;
        this.componentUtils = componentUtils;
    }
    ngOnInit() {
        this.column._type = this.column.type || 'text';
        if (this.column.renderer) {
            if (this.column.renderer.prototype instanceof BaseRenderer) {
                this.column._type = 'custom';
                const componentRef = this.componentUtils.append(this.column.renderer, this.container);
                componentRef.instance.meta = this.column;
                componentRef.instance.data = this.row;
                componentRef.instance.value = this.form && this.hasEditor ? this.form.getRawValue()[this.column.name] : this.row[this.column.name];
                // TODO - save ref to this and update in the valueChanges below!!
            }
            else {
                // TODO - wtf to do here?
                this.value = this.column.renderer(this.row);
            }
        }
        else {
            this.value = this.form && this.hasEditor ? this.form.getRawValue()[this.column.name] : this.row[this.column.name];
        }
        if (this.form && this.hasEditor) {
            this.valueChangeSubscription = this.form.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
                this.value = value[this.column.name];
            });
        }
    }
    ngOnDestroy() {
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    }
    onClick(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.column.onClick) {
            this.column.onClick(this.row);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableCell, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableCell, selector: "novo-table-cell", inputs: { column: "column", row: "row", form: "form", hasEditor: "hasEditor" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <div [ngSwitch]="column._type">
      <span #container></span>
      <date-cell *ngSwitchCase="'date'" [value]="value"></date-cell>
      <a *ngSwitchCase="'link'" (click)="onClick($event)">{{ value }}</a> <span *ngSwitchDefault>{{ value }}</span>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i3.DateCell, selector: "date-cell", inputs: ["value"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-table-cell',
                    template: `
    <div [ngSwitch]="column._type">
      <span #container></span>
      <date-cell *ngSwitchCase="'date'" [value]="value"></date-cell>
      <a *ngSwitchCase="'link'" (click)="onClick($event)">{{ value }}</a> <span *ngSwitchDefault>{{ value }}</span>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.ComponentUtils }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], column: [{
                type: Input
            }], row: [{
                type: Input
            }], form: [{
                type: Input
            }], hasEditor: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVDZWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdGFibGUvZXh0cmFzL3RhYmxlLWNlbGwvVGFibGVDZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRCxTQUFTO0FBQ1QsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE1BQU07QUFDTixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7OztBQVlsRCxNQUFNLE9BQU8sU0FBUztJQWdCcEIsWUFBb0IsT0FBbUIsRUFBVSxjQUE4QjtRQUEzRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBSHhFLFVBQUssR0FBUSxFQUFFLENBQUM7UUFJckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsWUFBWSxZQUFZLEVBQUU7Z0JBQzFELElBQUksQ0FB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b3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIEFQUFxuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEJhc2VSZW5kZXJlciB9IGZyb20gJy4vLi4vYmFzZS1yZW5kZXJlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGFibGUtY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbbmdTd2l0Y2hdPVwiY29sdW1uLl90eXBlXCI+XG4gICAgICA8c3BhbiAjY29udGFpbmVyPjwvc3Bhbj5cbiAgICAgIDxkYXRlLWNlbGwgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiIFt2YWx1ZV09XCJ2YWx1ZVwiPjwvZGF0ZS1jZWxsPlxuICAgICAgPGEgKm5nU3dpdGNoQ2FzZT1cIidsaW5rJ1wiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj57eyB2YWx1ZSB9fTwvYT4gPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD57eyB2YWx1ZSB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVDZWxsIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgQElucHV0KClcbiAgY29sdW1uOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHJvdzogYW55O1xuICBASW5wdXQoKVxuICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBASW5wdXQoKVxuICBoYXNFZGl0b3I6IGJvb2xlYW47XG5cbiAgcHVibGljIHZhbHVlOiBhbnkgPSAnJztcbiAgcHJpdmF0ZSB2YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuY29tcG9uZW50VXRpbHMgPSBjb21wb25lbnRVdGlscztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29sdW1uLl90eXBlID0gdGhpcy5jb2x1bW4udHlwZSB8fCAndGV4dCc7XG4gICAgaWYgKHRoaXMuY29sdW1uLnJlbmRlcmVyKSB7XG4gICAgICBpZiAodGhpcy5jb2x1bW4ucmVuZGVyZXIucHJvdG90eXBlIGluc3RhbmNlb2YgQmFzZVJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMuY29sdW1uLl90eXBlID0gJ2N1c3RvbSc7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuY29tcG9uZW50VXRpbHMuYXBwZW5kKHRoaXMuY29sdW1uLnJlbmRlcmVyLCB0aGlzLmNvbnRhaW5lcikgYXMgYW55O1xuICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UubWV0YSA9IHRoaXMuY29sdW1uO1xuICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuZGF0YSA9IHRoaXMucm93O1xuICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UudmFsdWUgPSB0aGlzLmZvcm0gJiYgdGhpcy5oYXNFZGl0b3IgPyB0aGlzLmZvcm0uZ2V0UmF3VmFsdWUoKVt0aGlzLmNvbHVtbi5uYW1lXSA6IHRoaXMucm93W3RoaXMuY29sdW1uLm5hbWVdO1xuICAgICAgICAvLyBUT0RPIC0gc2F2ZSByZWYgdG8gdGhpcyBhbmQgdXBkYXRlIGluIHRoZSB2YWx1ZUNoYW5nZXMgYmVsb3chIVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyAtIHd0ZiB0byBkbyBoZXJlP1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5jb2x1bW4ucmVuZGVyZXIodGhpcy5yb3cpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5mb3JtICYmIHRoaXMuaGFzRWRpdG9yID8gdGhpcy5mb3JtLmdldFJhd1ZhbHVlKClbdGhpcy5jb2x1bW4ubmFtZV0gOiB0aGlzLnJvd1t0aGlzLmNvbHVtbi5uYW1lXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JtICYmIHRoaXMuaGFzRWRpdG9yKSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5waXBlKGRlYm91bmNlVGltZSgzMDApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVt0aGlzLmNvbHVtbi5uYW1lXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgb25DbGljayhldmVudCkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb2x1bW4ub25DbGljaykge1xuICAgICAgdGhpcy5jb2x1bW4ub25DbGljayh0aGlzLnJvdyk7XG4gICAgfVxuICB9XG59XG4iXX0=