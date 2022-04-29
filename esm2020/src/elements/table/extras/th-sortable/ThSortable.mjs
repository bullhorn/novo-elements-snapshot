// NG2
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class ThSortable {
    constructor() {
        this.onSortChange = new EventEmitter();
    }
    onToggleSort(event) {
        if (event) {
            // event.preventDefault();
        }
        if (this.config && this.column && this.config.sorting !== false && this.column.sorting !== false) {
            switch (this.column.sort) {
                case 'asc':
                    this.column.sort = 'desc';
                    break;
                default:
                    this.column.sort = 'asc';
                    break;
            }
            this.onSortChange.emit(this.column);
        }
    }
}
ThSortable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ThSortable, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ThSortable.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: ThSortable, selector: "[novoThSortable]", inputs: { config: ["novoThSortable", "config"], column: "column" }, outputs: { onSortChange: "onSortChange" }, host: { listeners: { "click": "onToggleSort($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ThSortable, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoThSortable]',
                    host: {
                        '(click)': 'onToggleSort($event)',
                    },
                }]
        }], propDecorators: { config: [{
                type: Input,
                args: ['novoThSortable']
            }], column: [{
                type: Input
            }], onSortChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGhTb3J0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy90aC1zb3J0YWJsZS9UaFNvcnRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVF2RSxNQUFNLE9BQU8sVUFBVTtJQU52QjtRQVlFLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7S0FvQnREO0lBbEJDLFlBQVksQ0FBQyxLQUFLO1FBQ2hCLElBQUksS0FBSyxFQUFFO1lBQ1QsMEJBQTBCO1NBQzNCO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUNoRyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUN4QixLQUFLLEtBQUs7b0JBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUMxQixNQUFNO2dCQUNSO29CQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztvQkFDekIsTUFBTTthQUNUO1lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7dUdBekJVLFVBQVU7MkZBQVYsVUFBVTsyRkFBVixVQUFVO2tCQU50QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsc0JBQXNCO3FCQUNsQztpQkFDRjs4QkFHQyxNQUFNO3NCQURMLEtBQUs7dUJBQUMsZ0JBQWdCO2dCQUd2QixNQUFNO3NCQURMLEtBQUs7Z0JBR04sWUFBWTtzQkFEWCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbm92b1RoU29ydGFibGVdJyxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ29uVG9nZ2xlU29ydCgkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgVGhTb3J0YWJsZSB7XG4gIEBJbnB1dCgnbm92b1RoU29ydGFibGUnKVxuICBjb25maWc6IGFueTtcbiAgQElucHV0KClcbiAgY29sdW1uOiBhbnk7XG4gIEBPdXRwdXQoKVxuICBvblNvcnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG9uVG9nZ2xlU29ydChldmVudCkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb2x1bW4gJiYgdGhpcy5jb25maWcuc29ydGluZyAhPT0gZmFsc2UgJiYgdGhpcy5jb2x1bW4uc29ydGluZyAhPT0gZmFsc2UpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5jb2x1bW4uc29ydCkge1xuICAgICAgICBjYXNlICdhc2MnOlxuICAgICAgICAgIHRoaXMuY29sdW1uLnNvcnQgPSAnZGVzYyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5jb2x1bW4uc29ydCA9ICdhc2MnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uU29ydENoYW5nZS5lbWl0KHRoaXMuY29sdW1uKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==