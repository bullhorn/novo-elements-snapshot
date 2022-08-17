// NG2
import { Component, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
// Vendor
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';
import * as i0 from "@angular/core";
import * as i1 from "./../../../../utils/component-utils/ComponentUtils";
import * as i2 from "../date-cell/DateCell";
import * as i3 from "@angular/common";
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
}
TableCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TableCell, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }], target: i0.ɵɵFactoryTarget.Component });
TableCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: TableCell, selector: "novo-table-cell", inputs: { column: "column", row: "row", form: "form", hasEditor: "hasEditor" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <div [ngSwitch]="column._type">
      <span #container></span>
      <date-cell *ngSwitchCase="'date'" [value]="value"></date-cell>
      <a *ngSwitchCase="'link'" (click)="onClick($event)">{{ value }}</a> <span *ngSwitchDefault>{{ value }}</span>
    </div>
  `, isInline: true, components: [{ type: i2.DateCell, selector: "date-cell", inputs: ["value"] }], directives: [{ type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TableCell, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVDZWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdGFibGUvZXh0cmFzL3RhYmxlLWNlbGwvVGFibGVDZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsU0FBUztBQUNULE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDcEYsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7QUFZL0QsTUFBTSxPQUFPLFNBQVM7SUFnQnBCLFlBQW9CLE9BQW1CLEVBQVUsY0FBOEI7UUFBM0QsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUh4RSxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBSXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDO1FBQy9DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLFlBQVksWUFBWSxFQUFFO2dCQUMxRCxJQUFJLENB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cG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbXBvbmVudFV0aWxzIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi91dGlscy9jb21wb25lbnQtdXRpbHMvQ29tcG9uZW50VXRpbHMnO1xuLy8gQVBQXG5pbXBvcnQgeyBCYXNlUmVuZGVyZXIgfSBmcm9tICcuLy4uL2Jhc2UtcmVuZGVyZXIvQmFzZVJlbmRlcmVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10YWJsZS1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJjb2x1bW4uX3R5cGVcIj5cbiAgICAgIDxzcGFuICNjb250YWluZXI+PC9zcGFuPlxuICAgICAgPGRhdGUtY2VsbCAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCIgW3ZhbHVlXT1cInZhbHVlXCI+PC9kYXRlLWNlbGw+XG4gICAgICA8YSAqbmdTd2l0Y2hDYXNlPVwiJ2xpbmsnXCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPnt7IHZhbHVlIH19PC9hPiA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0Pnt7IHZhbHVlIH19PC9zcGFuPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUNlbGwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBASW5wdXQoKVxuICBjb2x1bW46IGFueTtcbiAgQElucHV0KClcbiAgcm93OiBhbnk7XG4gIEBJbnB1dCgpXG4gIGZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KClcbiAgaGFzRWRpdG9yOiBib29sZWFuO1xuXG4gIHB1YmxpYyB2YWx1ZTogYW55ID0gJyc7XG4gIHByaXZhdGUgdmFsdWVDaGFuZ2VTdWJzY3JpcHRpb246IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY29tcG9uZW50VXRpbHM6IENvbXBvbmVudFV0aWxzKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmNvbXBvbmVudFV0aWxzID0gY29tcG9uZW50VXRpbHM7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbHVtbi5fdHlwZSA9IHRoaXMuY29sdW1uLnR5cGUgfHwgJ3RleHQnO1xuICAgIGlmICh0aGlzLmNvbHVtbi5yZW5kZXJlcikge1xuICAgICAgaWYgKHRoaXMuY29sdW1uLnJlbmRlcmVyLnByb3RvdHlwZSBpbnN0YW5jZW9mIEJhc2VSZW5kZXJlcikge1xuICAgICAgICB0aGlzLmNvbHVtbi5fdHlwZSA9ICdjdXN0b20nO1xuICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmNvbXBvbmVudFV0aWxzLmFwcGVuZCh0aGlzLmNvbHVtbi5yZW5kZXJlciwgdGhpcy5jb250YWluZXIpIGFzIGFueTtcbiAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLm1ldGEgPSB0aGlzLmNvbHVtbjtcbiAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmRhdGEgPSB0aGlzLnJvdztcbiAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnZhbHVlID0gdGhpcy5mb3JtICYmIHRoaXMuaGFzRWRpdG9yID8gdGhpcy5mb3JtLmdldFJhd1ZhbHVlKClbdGhpcy5jb2x1bW4ubmFtZV0gOiB0aGlzLnJvd1t0aGlzLmNvbHVtbi5uYW1lXTtcbiAgICAgICAgLy8gVE9ETyAtIHNhdmUgcmVmIHRvIHRoaXMgYW5kIHVwZGF0ZSBpbiB0aGUgdmFsdWVDaGFuZ2VzIGJlbG93ISFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE8gLSB3dGYgdG8gZG8gaGVyZT9cbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuY29sdW1uLnJlbmRlcmVyKHRoaXMucm93KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZm9ybSAmJiB0aGlzLmhhc0VkaXRvciA/IHRoaXMuZm9ybS5nZXRSYXdWYWx1ZSgpW3RoaXMuY29sdW1uLm5hbWVdIDogdGhpcy5yb3dbdGhpcy5jb2x1bW4ubmFtZV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9ybSAmJiB0aGlzLmhhc0VkaXRvcikge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMucGlwZShkZWJvdW5jZVRpbWUoMzAwKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVbdGhpcy5jb2x1bW4ubmFtZV07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29sdW1uLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMuY29sdW1uLm9uQ2xpY2sodGhpcy5yb3cpO1xuICAgIH1cbiAgfVxufVxuIl19