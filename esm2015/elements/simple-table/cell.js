import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, HostBinding, Input, Optional, Renderer2 } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { NovoSelection } from './sort';
/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoCellDef = CdkCellDef;
export const _NovoHeaderCellDef = CdkHeaderCellDef;
export const _NovoColumnDef = CdkColumnDef;
export const _NovoHeaderCell = CdkHeaderCell;
export const _NovoCell = CdkCell;
export class NovoSimpleCellDef extends _NovoCellDef {
}
NovoSimpleCellDef.decorators = [
    { type: Directive, args: [{
                selector: '[novoSimpleCellDef]',
                providers: [{ provide: CdkCellDef, useExisting: NovoSimpleCellDef }],
            },] }
];
export class NovoSimpleHeaderCellDef extends _NovoHeaderCellDef {
}
NovoSimpleHeaderCellDef.decorators = [
    { type: Directive, args: [{
                selector: '[novoSimpleHeaderCellDef]',
                providers: [{ provide: CdkHeaderCellDef, useExisting: NovoSimpleHeaderCellDef }],
            },] }
];
export class NovoSimpleColumnDef extends _NovoColumnDef {
}
NovoSimpleColumnDef.decorators = [
    { type: Directive, args: [{
                selector: '[novoSimpleColumnDef]',
                providers: [{ provide: CdkColumnDef, useExisting: NovoSimpleColumnDef }],
            },] }
];
NovoSimpleColumnDef.propDecorators = {
    name: [{ type: Input, args: ['novoSimpleColumnDef',] }]
};
export class NovoSimpleHeaderCell extends _NovoHeaderCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.role = 'columnheader';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-header-cell');
    }
    ngOnInit() {
        if (this.column.width) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
        }
    }
}
NovoSimpleHeaderCell.decorators = [
    { type: Directive, args: [{
                selector: 'novo-simple-header-cell',
            },] }
];
NovoSimpleHeaderCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 }
];
NovoSimpleHeaderCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    column: [{ type: Input }]
};
export class NovoSimpleEmptyHeaderCell extends _NovoHeaderCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.role = 'columnheader';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-empty-header-cell');
    }
}
NovoSimpleEmptyHeaderCell.decorators = [
    { type: Directive, args: [{
                selector: 'novo-simple-empty-header-cell',
            },] }
];
NovoSimpleEmptyHeaderCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 }
];
NovoSimpleEmptyHeaderCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }]
};
export class NovoSimpleCheckboxHeaderCell extends _NovoHeaderCell {
    constructor(columnDef, elementRef, renderer, ref, _selection) {
        super(columnDef, elementRef);
        this._selection = _selection;
        this.role = 'columnheader';
        this.selectAll = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-checkbox-header-cell');
        this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe((value) => {
            this.selectAll = value;
            ref.markForCheck();
        });
    }
    ngOnDestroy() {
        this.selectAllSubscription.unsubscribe();
    }
    toggle(value) {
        this._selection.selectAll(value);
    }
}
NovoSimpleCheckboxHeaderCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-simple-checkbox-header-cell',
                template: `<novo-checkbox [(ngModel)]="selectAll" (ngModelChange)="toggle($event)"></novo-checkbox>`
            },] }
];
NovoSimpleCheckboxHeaderCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NovoSelection, decorators: [{ type: Optional }] }
];
NovoSimpleCheckboxHeaderCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }]
};
export class NovoSimpleCell extends _NovoCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.role = 'gridcell';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-cell');
    }
    ngOnInit() {
        if (this.column.customClass) {
            this.renderer.addClass(this.elementRef.nativeElement, this.column.customClass(this.row));
        }
        if (this.column.width) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
            // TODO - this inhibits resizing the page after the initial load -- but do we care?!?!
            // this.renderer.setStyle(this.spanElement.nativeElement, 'min-width', `${this.column.width - 20}px`);
            // this.renderer.setStyle(this.spanElement.nativeElement, 'max-width', `${this.column.width - 20}px`);
            // this.renderer.setStyle(this.spanElement.nativeElement, 'width', `${this.column.width - 20}px`);
        }
        // else {
        //     // TODO - this inhibits resizing the page after the initial load -- but do we care?!?!
        //     this.renderer.setStyle(this.spanElement.nativeElement, 'min-width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
        //     this.renderer.setStyle(this.spanElement.nativeElement, 'max-width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
        //     this.renderer.setStyle(this.spanElement.nativeElement, 'width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
        // }
    }
    onClick(event) {
        Helpers.swallowEvent(event);
        if (this.column.onClick) {
            this.column.onClick(this.row);
        }
        return;
    }
}
NovoSimpleCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-simple-cell',
                template: `
    <span [class.clickable]="!!column.onClick" (click)="onClick($event)" #span>{{ column.renderer(row) }}</span>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoSimpleCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 }
];
NovoSimpleCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    row: [{ type: Input }],
    column: [{ type: Input }]
};
export class NovoSimpleCheckboxCell extends _NovoCell {
    constructor(columnDef, elementRef, renderer, _selection) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this._selection = _selection;
        this.role = 'gridcell';
        this.selected = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-checkbox-cell');
        this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe((value) => {
            this.selected = value;
        });
    }
    ngOnInit() {
        this._selection.register(this.row.id || this.index, this.row);
        this.selected = this._selection.state.selectedRows.has(this.row.id || this.index);
    }
    ngOnDestroy() {
        this._selection.deregister(this.row.id || this.index);
        this.selectAllSubscription.unsubscribe();
    }
    toggle(value) {
        this._selection.toggle(this.row.id || this.index, value, this.row);
    }
}
NovoSimpleCheckboxCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-simple-checkbox-cell',
                template: `
    <novo-checkbox [ngModel]="selected" (ngModelChange)="toggle($event)"></novo-checkbox>
  `
            },] }
];
NovoSimpleCheckboxCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NovoSelection, decorators: [{ type: Optional }] }
];
NovoSimpleCheckboxCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    row: [{ type: Input }],
    index: [{ type: Input }]
};
export class NovoSimpleActionCell extends _NovoCell {
    constructor(columnDef, elementRef, renderer, labels) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.labels = labels;
        this.role = 'gridcell';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-action-column-${columnDef.cssClassFriendlyName}`);
    }
    ngOnInit() {
        if (this.column.options) {
            this.renderer.addClass(this.elementRef.nativeElement, 'novo-simple-dropdown-cell');
        }
        else {
            this.renderer.addClass(this.elementRef.nativeElement, 'novo-simple-button-cell');
        }
    }
    isDisabled(check, row) {
        if (check.disabled === true) {
            return true;
        }
        if (check.disabledCheck) {
            return check.disabledCheck(row);
        }
        return false;
    }
}
NovoSimpleActionCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-simple-action-cell',
                template: `
    <ng-container *ngIf="!column.options">
      <button theme="icon" [icon]="column.icon" (click)="column.onClick(row)" [disabled]="isDisabled(column, row)"></button>
    </ng-container>
    <ng-container *ngIf="column.options">
      <novo-dropdown parentScrollSelector=".novo-simple-table" containerClass="novo-table-dropdown-cell">
        <button type="button" theme="dialogue" icon="collapse" inverse>{{ column.label || labels.actions }}</button>
        <list>
          <item *ngFor="let option of column.options" (action)="option.onClick(row)" [disabled]="isDisabled(option, row)">
            <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
          </item>
        </list>
      </novo-dropdown>
    </ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoSimpleActionCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NovoLabelService }
];
NovoSimpleActionCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    row: [{ type: Input }],
    column: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvc2ltcGxlLXRhYmxlL2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpLLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBR3ZDLHFFQUFxRTtBQUNyRSxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDO0FBQ25ELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxZQUFZLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQztBQUM3QyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDO0FBTWpDLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxZQUFZOzs7WUFKbEQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzthQUNyRTs7QUFTRCxNQUFNLE9B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S0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQWpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7WUEzTzZCLFlBQVk7WUFDaUMsVUFBVTtZQUFtRCxTQUFTO1lBRXhJLGdCQUFnQjs7O21CQTBPdEIsV0FBVyxTQUFDLFdBQVc7a0JBR3ZCLEtBQUs7cUJBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0NlbGwsIENka0NlbGxEZWYsIENka0NvbHVtbkRlZiwgQ2RrSGVhZGVyQ2VsbCwgQ2RrSGVhZGVyQ2VsbERlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XHJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE9wdGlvbmFsLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcbmltcG9ydCB7IFNpbXBsZVRhYmxlQWN0aW9uQ29sdW1uLCBTaW1wbGVUYWJsZUFjdGlvbkNvbHVtbk9wdGlvbiwgU2ltcGxlVGFibGVDb2x1bW4gfSBmcm9tICcuL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBOb3ZvU2VsZWN0aW9uIH0gZnJvbSAnLi9zb3J0JztcclxuXHJcblxyXG4vKiogV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTc4NDkgKi9cclxuZXhwb3J0IGNvbnN0IF9Ob3ZvQ2VsbERlZiA9IENka0NlbGxEZWY7XHJcbmV4cG9ydCBjb25zdCBfTm92b0hlYWRlckNlbGxEZWYgPSBDZGtIZWFkZXJDZWxsRGVmO1xyXG5leHBvcnQgY29uc3QgX05vdm9Db2x1bW5EZWYgPSBDZGtDb2x1bW5EZWY7XHJcbmV4cG9ydCBjb25zdCBfTm92b0hlYWRlckNlbGwgPSBDZGtIZWFkZXJDZWxsO1xyXG5leHBvcnQgY29uc3QgX05vdm9DZWxsID0gQ2RrQ2VsbDtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25vdm9TaW1wbGVDZWxsRGVmXScsXHJcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtDZWxsRGVmLCB1c2VFeGlzdGluZzogTm92b1NpbXBsZUNlbGxEZWYgfV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlQ2VsbERlZiBleHRlbmRzIF9Ob3ZvQ2VsbERlZiB7XHJcbiAgLy8gVE9ETzogYWRkIGV4cGxpY2l0IGNvbnN0cnVjdG9yXHJcbiB9XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tub3ZvU2ltcGxlSGVhZGVyQ2VsbERlZl0nLFxyXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrSGVhZGVyQ2VsbERlZiwgdXNlRXhpc3Rpbmc6IE5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmIH1dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUhlYWRlckNlbGxEZWYgZXh0ZW5kcyBfTm92b0hlYWRlckNlbGxEZWYge1xyXG4gIC8vIFRPRE86IGFkZCBleHBsaWNpdCBjb25zdHJ1Y3RvclxyXG4gfVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbm92b1NpbXBsZUNvbHVtbkRlZl0nLFxyXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrQ29sdW1uRGVmLCB1c2VFeGlzdGluZzogTm92b1NpbXBsZUNvbHVtbkRlZiB9XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVDb2x1bW5EZWYgZXh0ZW5kcyBfTm92b0NvbHVtbkRlZiB7XHJcbiAgQElucHV0KCdub3ZvU2ltcGxlQ29sdW1uRGVmJylcclxuICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1zaW1wbGUtaGVhZGVyLWNlbGwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUhlYWRlckNlbGw8VD4gZXh0ZW5kcyBfTm92b0hlYWRlckNlbGwgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcclxuICBwdWJsaWMgcm9sZSA9ICdjb2x1bW5oZWFkZXInO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBjb2x1bW46IFNpbXBsZVRhYmxlQ29sdW1uPFQ+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IENka0NvbHVtbkRlZiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcclxuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XHJcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGF0YS1hdXRvbWF0aW9uLWlkJywgYG5vdm8tY29sdW1uLWhlYWRlci0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcclxuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xyXG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1zaW1wbGUtaGVhZGVyLWNlbGwnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbi53aWR0aCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWluLXdpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGh9cHhgKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsIGAke3RoaXMuY29sdW1uLndpZHRofXB4YCk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke3RoaXMuY29sdW1uLndpZHRofXB4YCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25vdm8tc2ltcGxlLWVtcHR5LWhlYWRlci1jZWxsJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVFbXB0eUhlYWRlckNlbGwgZXh0ZW5kcyBfTm92b0hlYWRlckNlbGwge1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcclxuICBwdWJsaWMgcm9sZSA9ICdjb2x1bW5oZWFkZXInO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IENka0NvbHVtbkRlZiwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xyXG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcclxuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWF1dG9tYXRpb24taWQnLCBgbm92by1jb2x1bW4taGVhZGVyLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xyXG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgbm92by1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdub3ZvLXNpbXBsZS1lbXB0eS1oZWFkZXItY2VsbCcpO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1jaGVja2JveC1oZWFkZXItY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGA8bm92by1jaGVja2JveCBbKG5nTW9kZWwpXT1cInNlbGVjdEFsbFwiIChuZ01vZGVsQ2hhbmdlKT1cInRvZ2dsZSgkZXZlbnQpXCI+PC9ub3ZvLWNoZWNrYm94PmAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlQ2hlY2tib3hIZWFkZXJDZWxsIGV4dGVuZHMgX05vdm9IZWFkZXJDZWxsIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXHJcbiAgcHVibGljIHJvbGUgPSAnY29sdW1uaGVhZGVyJztcclxuXHJcbiAgcHVibGljIHNlbGVjdEFsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgc2VsZWN0QWxsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXHJcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9zZWxlY3Rpb246IE5vdm9TZWxlY3Rpb24sXHJcbiAgKSB7XHJcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xyXG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi1oZWFkZXItJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcclxuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tc2ltcGxlLWNoZWNrYm94LWhlYWRlci1jZWxsJyk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RBbGxTdWJzY3JpcHRpb24gPSBfc2VsZWN0aW9uLm5vdm9TZWxlY3RBbGxUb2dnbGUuc3Vic2NyaWJlKCh2YWx1ZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICB0aGlzLnNlbGVjdEFsbCA9IHZhbHVlO1xyXG4gICAgICByZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0QWxsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zZWxlY3Rpb24uc2VsZWN0QWxsKHZhbHVlKTtcclxuICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1zaW1wbGUtY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzcGFuIFtjbGFzcy5jbGlja2FibGVdPVwiISFjb2x1bW4ub25DbGlja1wiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIiAjc3Bhbj57eyBjb2x1bW4ucmVuZGVyZXIocm93KSB9fTwvc3Bhbj5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUNlbGw8VD4gZXh0ZW5kcyBfTm92b0NlbGwgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcclxuICBwdWJsaWMgcm9sZSA9ICdncmlkY2VsbCc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHJvdzogYW55O1xyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGNvbHVtbjogU2ltcGxlVGFibGVDb2x1bW48VD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xyXG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcclxuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWF1dG9tYXRpb24taWQnLCBgbm92by1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGBub3ZvLWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcclxuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tc2ltcGxlLWNlbGwnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbi5jdXN0b21DbGFzcykge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmNvbHVtbi5jdXN0b21DbGFzcyh0aGlzLnJvdykpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY29sdW1uLndpZHRoKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtaW4td2lkdGgnLCBgJHt0aGlzLmNvbHVtbi53aWR0aH1weGApO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGh9cHhgKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGh9cHhgKTtcclxuICAgICAgLy8gVE9ETyAtIHRoaXMgaW5oaWJpdHMgcmVzaXppbmcgdGhlIHBhZ2UgYWZ0ZXIgdGhlIGluaXRpYWwgbG9hZCAtLSBidXQgZG8gd2UgY2FyZT8hPyFcclxuICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdtaW4td2lkdGgnLCBgJHt0aGlzLmNvbHVtbi53aWR0aCAtIDIwfXB4YCk7XHJcbiAgICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuRWxlbWVudC5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGggLSAyMH1weGApO1xyXG4gICAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbkVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGggLSAyMH1weGApO1xyXG4gICAgfVxyXG4gICAgLy8gZWxzZSB7XHJcbiAgICAvLyAgICAgLy8gVE9ETyAtIHRoaXMgaW5oaWJpdHMgcmVzaXppbmcgdGhlIHBhZ2UgYWZ0ZXIgdGhlIGluaXRpYWwgbG9hZCAtLSBidXQgZG8gd2UgY2FyZT8hPyFcclxuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbkVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC0gMjB9cHhgKTtcclxuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbkVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC0gMjB9cHhgKTtcclxuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbkVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLSAyMH1weGApO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcclxuICAgIGlmICh0aGlzLmNvbHVtbi5vbkNsaWNrKSB7XHJcbiAgICAgIHRoaXMuY29sdW1uLm9uQ2xpY2sodGhpcy5yb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1jaGVja2JveC1jZWxsJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5vdm8tY2hlY2tib3ggW25nTW9kZWxdPVwic2VsZWN0ZWRcIiAobmdNb2RlbENoYW5nZSk9XCJ0b2dnbGUoJGV2ZW50KVwiPjwvbm92by1jaGVja2JveD5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUNoZWNrYm94Q2VsbCBleHRlbmRzIF9Ob3ZvQ2VsbCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXHJcbiAgcHVibGljIHJvbGUgPSAnZ3JpZGNlbGwnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyByb3c6IGFueTtcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBpbmRleDogYW55O1xyXG5cclxuICBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIHNlbGVjdEFsbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIEBPcHRpb25hbCgpIHB1YmxpYyBfc2VsZWN0aW9uOiBOb3ZvU2VsZWN0aW9uKSB7XHJcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xyXG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcclxuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY2hlY2tib3gtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xyXG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1zaW1wbGUtY2hlY2tib3gtY2VsbCcpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0QWxsU3Vic2NyaXB0aW9uID0gX3NlbGVjdGlvbi5ub3ZvU2VsZWN0QWxsVG9nZ2xlLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zZWxlY3Rpb24ucmVnaXN0ZXIodGhpcy5yb3cuaWQgfHwgdGhpcy5pbmRleCwgdGhpcy5yb3cpO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGlvbi5zdGF0ZS5zZWxlY3RlZFJvd3MuaGFzKHRoaXMucm93LmlkIHx8IHRoaXMuaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2VsZWN0aW9uLmRlcmVnaXN0ZXIodGhpcy5yb3cuaWQgfHwgdGhpcy5pbmRleCk7XHJcbiAgICB0aGlzLnNlbGVjdEFsbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5fc2VsZWN0aW9uLnRvZ2dsZSh0aGlzLnJvdy5pZCB8fCB0aGlzLmluZGV4LCB2YWx1ZSwgdGhpcy5yb3cpO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1hY3Rpb24tY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29sdW1uLm9wdGlvbnNcIj5cclxuICAgICAgPGJ1dHRvbiB0aGVtZT1cImljb25cIiBbaWNvbl09XCJjb2x1bW4uaWNvblwiIChjbGljayk9XCJjb2x1bW4ub25DbGljayhyb3cpXCIgW2Rpc2FibGVkXT1cImlzRGlzYWJsZWQoY29sdW1uLCByb3cpXCI+PC9idXR0b24+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4ub3B0aW9uc1wiPlxyXG4gICAgICA8bm92by1kcm9wZG93biBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi5ub3ZvLXNpbXBsZS10YWJsZVwiIGNvbnRhaW5lckNsYXNzPVwibm92by10YWJsZS1kcm9wZG93bi1jZWxsXCI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGhlbWU9XCJkaWFsb2d1ZVwiIGljb249XCJjb2xsYXBzZVwiIGludmVyc2U+e3sgY29sdW1uLmxhYmVsIHx8IGxhYmVscy5hY3Rpb25zIH19PC9idXR0b24+XHJcbiAgICAgICAgPGxpc3Q+XHJcbiAgICAgICAgICA8aXRlbSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbHVtbi5vcHRpb25zXCIgKGFjdGlvbik9XCJvcHRpb24ub25DbGljayhyb3cpXCIgW2Rpc2FibGVkXT1cImlzRGlzYWJsZWQob3B0aW9uLCByb3cpXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJvcHRpb24ubGFiZWxcIj57eyBvcHRpb24ubGFiZWwgfX08L3NwYW4+XHJcbiAgICAgICAgICA8L2l0ZW0+XHJcbiAgICAgICAgPC9saXN0PlxyXG4gICAgICA8L25vdm8tZHJvcGRvd24+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUFjdGlvbkNlbGw8VD4gZXh0ZW5kcyBfTm92b0NlbGwgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcclxuICBwdWJsaWMgcm9sZSA9ICdncmlkY2VsbCc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHJvdzogVDtcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBjb2x1bW46IFNpbXBsZVRhYmxlQWN0aW9uQ29sdW1uPFQ+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IENka0NvbHVtbkRlZiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcclxuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XHJcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGF0YS1hdXRvbWF0aW9uLWlkJywgYG5vdm8tYWN0aW9uLWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbi5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdub3ZvLXNpbXBsZS1kcm9wZG93bi1jZWxsJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1zaW1wbGUtYnV0dG9uLWNlbGwnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0Rpc2FibGVkKGNoZWNrOiBTaW1wbGVUYWJsZUFjdGlvbkNvbHVtbjxUPiB8IFNpbXBsZVRhYmxlQWN0aW9uQ29sdW1uT3B0aW9uPFQ+LCByb3c6IFQpOiBib29sZWFuIHtcclxuICAgIGlmIChjaGVjay5kaXNhYmxlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChjaGVjay5kaXNhYmxlZENoZWNrKSB7XHJcbiAgICAgIHJldHVybiBjaGVjay5kaXNhYmxlZENoZWNrKHJvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==