// NG2
import { Component, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
// Vendor
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';
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
TableCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-table-cell',
                template: `
    <div [ngSwitch]="column._type">
      <span #container></span>
      <date-cell *ngSwitchCase="'date'" [value]="value"></date-cell>
      <a *ngSwitchCase="'link'" (click)="onClick($event)">{{ value }}</a> <span *ngSwitchDefault>{{ value }}</span>
    </div>
  `
            },] }
];
TableCell.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentUtils }
];
TableCell.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef, static: true },] }],
    column: [{ type: Input }],
    row: [{ type: Input }],
    form: [{ type: Input }],
    hasEditor: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVDZWxsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy90YWJsZS1jZWxsL1RhYmxlQ2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLFNBQVM7QUFDVCxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3BGLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFZL0QsTUFBTSxPQUFPLFNBQVM7SUFnQnBCLFlBQW9CLE9BQW1CLEVBQVUsY0FBOEI7UUFBM0QsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUh4RSxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBSXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDO1FBQy9DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLFlBQVksWUFBWSxFQUFFO2dCQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQzdCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQVEsQ0FBQztnQkFDN0YsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDekMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDdEMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkksaUVBQWlFO2FBQ2xFO2lCQUFNO2dCQUNMLHlCQUF5QjtnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0M7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25IO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN4SCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSztRQUNYLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7O1lBdEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7OztHQU1UO2FBQ0Y7OztZQWpCbUIsVUFBVTtZQUlyQixjQUFjOzs7d0JBZXBCLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtxQkFHL0QsS0FBSztrQkFFTCxLQUFLO21CQUVMLEtBQUs7d0JBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3V0aWxzL2NvbXBvbmVudC11dGlscy9Db21wb25lbnRVdGlscyc7XG4vLyBBUFBcbmltcG9ydCB7IEJhc2VSZW5kZXJlciB9IGZyb20gJy4vLi4vYmFzZS1yZW5kZXJlci9CYXNlUmVuZGVyZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYmxlLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW25nU3dpdGNoXT1cImNvbHVtbi5fdHlwZVwiPlxuICAgICAgPHNwYW4gI2NvbnRhaW5lcj48L3NwYW4+XG4gICAgICA8ZGF0ZS1jZWxsICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIiBbdmFsdWVdPVwidmFsdWVcIj48L2RhdGUtY2VsbD5cbiAgICAgIDxhICpuZ1N3aXRjaENhc2U9XCInbGluaydcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+e3sgdmFsdWUgfX08L2E+IDxzcGFuICpuZ1N3aXRjaERlZmF1bHQ+e3sgdmFsdWUgfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlQ2VsbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbjogYW55O1xuICBASW5wdXQoKVxuICByb3c6IGFueTtcbiAgQElucHV0KClcbiAgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKVxuICBoYXNFZGl0b3I6IGJvb2xlYW47XG5cbiAgcHVibGljIHZhbHVlOiBhbnkgPSAnJztcbiAgcHJpdmF0ZSB2YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuY29tcG9uZW50VXRpbHMgPSBjb21wb25lbnRVdGlscztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29sdW1uLl90eXBlID0gdGhpcy5jb2x1bW4udHlwZSB8fCAndGV4dCc7XG4gICAgaWYgKHRoaXMuY29sdW1uLnJlbmRlcmVyKSB7XG4gICAgICBpZiAodGhpcy5jb2x1bW4ucmVuZGVyZXIucHJvdG90eXBlIGluc3RhbmNlb2YgQmFzZVJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMuY29sdW1uLl90eXBlID0gJ2N1c3RvbSc7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuY29tcG9uZW50VXRpbHMuYXBwZW5kKHRoaXMuY29sdW1uLnJlbmRlcmVyLCB0aGlzLmNvbnRhaW5lcikgYXMgYW55O1xuICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UubWV0YSA9IHRoaXMuY29sdW1uO1xuICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuZGF0YSA9IHRoaXMucm93O1xuICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UudmFsdWUgPSB0aGlzLmZvcm0gJiYgdGhpcy5oYXNFZGl0b3IgPyB0aGlzLmZvcm0uZ2V0UmF3VmFsdWUoKVt0aGlzLmNvbHVtbi5uYW1lXSA6IHRoaXMucm93W3RoaXMuY29sdW1uLm5hbWVdO1xuICAgICAgICAvLyBUT0RPIC0gc2F2ZSByZWYgdG8gdGhpcyBhbmQgdXBkYXRlIGluIHRoZSB2YWx1ZUNoYW5nZXMgYmVsb3chIVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyAtIHd0ZiB0byBkbyBoZXJlP1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5jb2x1bW4ucmVuZGVyZXIodGhpcy5yb3cpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5mb3JtICYmIHRoaXMuaGFzRWRpdG9yID8gdGhpcy5mb3JtLmdldFJhd1ZhbHVlKClbdGhpcy5jb2x1bW4ubmFtZV0gOiB0aGlzLnJvd1t0aGlzLmNvbHVtbi5uYW1lXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JtICYmIHRoaXMuaGFzRWRpdG9yKSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5waXBlKGRlYm91bmNlVGltZSgzMDApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVt0aGlzLmNvbHVtbi5uYW1lXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgb25DbGljayhldmVudCkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb2x1bW4ub25DbGljaykge1xuICAgICAgdGhpcy5jb2x1bW4ub25DbGljayh0aGlzLnJvdyk7XG4gICAgfVxuICB9XG59XG4iXX0=