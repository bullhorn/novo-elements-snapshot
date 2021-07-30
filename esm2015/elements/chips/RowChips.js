// NG2
import { Component, forwardRef, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoChipElement, NovoChipsElement } from './Chips';
// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRowChipsElement),
    multi: true,
};
export class NovoRowChipElement extends NovoChipElement {
    onSelect(e) {
        return false;
    }
}
NovoRowChipElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-row-chip',
                template: `<div class="novo-row-chips-columns"><ng-content></ng-content><i class="bhi-delete-o" *ngIf="!disabled" (click)="onRemove($event)"></i></div>`
            },] }
];
export class NovoRowChipsElement extends NovoChipsElement {
    constructor(element, componentUtils, labels) {
        super(element, componentUtils, labels);
        this.closeOnSelect = true;
    }
    onKeyDown(event) {
        return;
    }
}
NovoRowChipsElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-row-chips',
                providers: [CHIPS_VALUE_ACCESSOR],
                host: {
                    '[class.with-value]': 'items.length > 0',
                },
                template: `
        <div class="novo-row-chips-columns" *ngIf="items.length > 0">
          <div class="column-label" *ngFor="let column of source.columns">{{ column.label }}</div>
        </div>
        <div class="novo-row-chips-empty-message" *ngIf="source.emptyReadOnlyMessage && disablePickerInput && items.length === 0">{{source.emptyReadOnlyMessage}}</div>
        <novo-row-chip
          *ngFor="let item of _items | async"
          [type]="type || item?.value?.searchEntity"
          [class.selected]="item == selected"
          [disabled]="disablePickerInput"
          (remove)="remove($event, item)"
          (select)="select($event, item)">
          <div class="column-data" *ngFor="let column of source.columns"><span>{{ column.data(item) }}</span></div>
        </novo-row-chip>
        <novo-picker
            clearValueOnSelect="true"
            [closeOnSelect]="closeOnSelect"
            [config]="source"
            [disablePickerInput]="disablePickerInput"
            [hidden]="disablePickerInput"
            [placeholder]="placeholder"
            [(ngModel)]="itemToAdd"
            (select)="add($event)"
            (keydown)="onKeyDown($event)"
            (focus)="onFocus($event)"
            (typing)="onTyping($event)"
            (blur)="onTouched($event)"
            [selected]="items"
            [overrideElement]="element"
            *ngIf="!maxlength || (maxlength && items.length < maxlength)">
        </novo-picker>
        <div class="preview-container">
            <span #preview></span>
        </div>
   `
            },] }
];
NovoRowChipsElement.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentUtils },
    { type: NovoLabelService }
];
NovoRowChipsElement.propDecorators = {
    closeOnSelect: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93Q2hpcHMuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NoaXBzL1Jvd0NoaXBzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUU1RCxzREFBc0Q7QUFDdEQsTUFBTSxvQkFBb0IsR0FBRztJQUMzQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBTUYsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGVBQWU7SUFDckQsUUFBUSxDQUFDLENBQUM7UUFDUixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQVBGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLDhJQUE4STthQUN6Sjs7QUFpREQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RCxZQUFZLE9BQW1CLEVBQUUsY0FBOEIsRUFBRSxNQUF3QjtRQUN2RixLQUFLLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUh6QyxrQkFBYSxHQUFZLElBQUksQ0FBQztJQUk5QixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUs7UUFDYixPQUFPO0lBQ1QsQ0FBQzs7O1lBcERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDakMsSUFBSSxFQUFFO29CQUNKLG9CQUFvQixFQUFFLGtCQUFrQjtpQkFDekM7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0NSO2FBQ0g7OztZQWpFK0IsVUFBVTtZQUlqQyxjQUFjO1lBRGQsZ0JBQWdCOzs7NEJBZ0V0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy9jb21wb25lbnQtdXRpbHMvQ29tcG9uZW50VXRpbHMnO1xyXG5pbXBvcnQgeyBOb3ZvQ2hpcEVsZW1lbnQsIE5vdm9DaGlwc0VsZW1lbnQgfSBmcm9tICcuL0NoaXBzJztcclxuXHJcbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxyXG5jb25zdCBDSElQU19WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvUm93Q2hpcHNFbGVtZW50KSxcclxuICBtdWx0aTogdHJ1ZSxcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1yb3ctY2hpcCcsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibm92by1yb3ctY2hpcHMtY29sdW1uc1wiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48aSBjbGFzcz1cImJoaS1kZWxldGUtb1wiICpuZ0lmPVwiIWRpc2FibGVkXCIgKGNsaWNrKT1cIm9uUmVtb3ZlKCRldmVudClcIj48L2k+PC9kaXY+YCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9Sb3dDaGlwRWxlbWVudCBleHRlbmRzIE5vdm9DaGlwRWxlbWVudCB7XHJcbiAgb25TZWxlY3QoZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXJvdy1jaGlwcycsXHJcbiAgcHJvdmlkZXJzOiBbQ0hJUFNfVkFMVUVfQUNDRVNTT1JdLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3Mud2l0aC12YWx1ZV0nOiAnaXRlbXMubGVuZ3RoID4gMCcsXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXJvdy1jaGlwcy1jb2x1bW5zXCIgKm5nSWY9XCJpdGVtcy5sZW5ndGggPiAwXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLWxhYmVsXCIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBzb3VyY2UuY29sdW1uc1wiPnt7IGNvbHVtbi5sYWJlbCB9fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXJvdy1jaGlwcy1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJzb3VyY2UuZW1wdHlSZWFkT25seU1lc3NhZ2UgJiYgZGlzYWJsZVBpY2tlcklucHV0ICYmIGl0ZW1zLmxlbmd0aCA9PT0gMFwiPnt7c291cmNlLmVtcHR5UmVhZE9ubHlNZXNzYWdlfX08L2Rpdj5cclxuICAgICAgICA8bm92by1yb3ctY2hpcFxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2l0ZW1zIHwgYXN5bmNcIlxyXG4gICAgICAgICAgW3R5cGVdPVwidHlwZSB8fCBpdGVtPy52YWx1ZT8uc2VhcmNoRW50aXR5XCJcclxuICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJpdGVtID09IHNlbGVjdGVkXCJcclxuICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxyXG4gICAgICAgICAgKHJlbW92ZSk9XCJyZW1vdmUoJGV2ZW50LCBpdGVtKVwiXHJcbiAgICAgICAgICAoc2VsZWN0KT1cInNlbGVjdCgkZXZlbnQsIGl0ZW0pXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLWRhdGFcIiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHNvdXJjZS5jb2x1bW5zXCI+PHNwYW4+e3sgY29sdW1uLmRhdGEoaXRlbSkgfX08L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgPC9ub3ZvLXJvdy1jaGlwPlxyXG4gICAgICAgIDxub3ZvLXBpY2tlclxyXG4gICAgICAgICAgICBjbGVhclZhbHVlT25TZWxlY3Q9XCJ0cnVlXCJcclxuICAgICAgICAgICAgW2Nsb3NlT25TZWxlY3RdPVwiY2xvc2VPblNlbGVjdFwiXHJcbiAgICAgICAgICAgIFtjb25maWddPVwic291cmNlXCJcclxuICAgICAgICAgICAgW2Rpc2FibGVQaWNrZXJJbnB1dF09XCJkaXNhYmxlUGlja2VySW5wdXRcIlxyXG4gICAgICAgICAgICBbaGlkZGVuXT1cImRpc2FibGVQaWNrZXJJbnB1dFwiXHJcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwiaXRlbVRvQWRkXCJcclxuICAgICAgICAgICAgKHNlbGVjdCk9XCJhZGQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICh0eXBpbmcpPVwib25UeXBpbmcoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChibHVyKT1cIm9uVG91Y2hlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgW3NlbGVjdGVkXT1cIml0ZW1zXCJcclxuICAgICAgICAgICAgW292ZXJyaWRlRWxlbWVudF09XCJlbGVtZW50XCJcclxuICAgICAgICAgICAgKm5nSWY9XCIhbWF4bGVuZ3RoIHx8IChtYXhsZW5ndGggJiYgaXRlbXMubGVuZ3RoIDwgbWF4bGVuZ3RoKVwiPlxyXG4gICAgICAgIDwvbm92by1waWNrZXI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByZXZpZXctY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxzcGFuICNwcmV2aWV3Pjwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9Sb3dDaGlwc0VsZW1lbnQgZXh0ZW5kcyBOb3ZvQ2hpcHNFbGVtZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGNsb3NlT25TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMsIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge1xyXG4gICAgc3VwZXIoZWxlbWVudCwgY29tcG9uZW50VXRpbHMsIGxhYmVscyk7XHJcbiAgfVxyXG5cclxuICBvbktleURvd24oZXZlbnQpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbn1cclxuIl19