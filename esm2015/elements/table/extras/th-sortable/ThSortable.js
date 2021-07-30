// NG2
import { Directive, EventEmitter, Input, Output } from '@angular/core';
export class ThSortable {
    constructor() {
        this.onSortChange = new EventEmitter();
    }
    onToggleSort(event) {
        if (event) {
            event.preventDefault();
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
ThSortable.decorators = [
    { type: Directive, args: [{
                selector: '[novoThSortable]',
                host: {
                    '(click)': 'onToggleSort($event)',
                },
            },] }
];
ThSortable.propDecorators = {
    config: [{ type: Input, args: ['novoThSortable',] }],
    column: [{ type: Input }],
    onSortChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGhTb3J0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGFibGUvZXh0cmFzL3RoLXNvcnRhYmxlL1RoU29ydGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRdkUsTUFBTSxPQUFPLFVBQVU7SUFOdkI7UUFZRSxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBb0J2RCxDQUFDO0lBbEJDLFlBQVksQ0FBQyxLQUFLO1FBQ2hCLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUNoRyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUN4QixLQUFLLEtBQUs7b0JBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUMxQixNQUFNO2dCQUNSO29CQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztvQkFDekIsTUFBTTthQUNUO1lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7O1lBL0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLHNCQUFzQjtpQkFDbEM7YUFDRjs7O3FCQUVFLEtBQUssU0FBQyxnQkFBZ0I7cUJBRXRCLEtBQUs7MkJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbm92b1RoU29ydGFibGVdJyxcclxuICBob3N0OiB7XHJcbiAgICAnKGNsaWNrKSc6ICdvblRvZ2dsZVNvcnQoJGV2ZW50KScsXHJcbiAgfSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRoU29ydGFibGUge1xyXG4gIEBJbnB1dCgnbm92b1RoU29ydGFibGUnKVxyXG4gIGNvbmZpZzogYW55O1xyXG4gIEBJbnB1dCgpXHJcbiAgY29sdW1uOiBhbnk7XHJcbiAgQE91dHB1dCgpXHJcbiAgb25Tb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgb25Ub2dnbGVTb3J0KGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb2x1bW4gJiYgdGhpcy5jb25maWcuc29ydGluZyAhPT0gZmFsc2UgJiYgdGhpcy5jb2x1bW4uc29ydGluZyAhPT0gZmFsc2UpIHtcclxuICAgICAgc3dpdGNoICh0aGlzLmNvbHVtbi5zb3J0KSB7XHJcbiAgICAgICAgY2FzZSAnYXNjJzpcclxuICAgICAgICAgIHRoaXMuY29sdW1uLnNvcnQgPSAnZGVzYyc7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5jb2x1bW4uc29ydCA9ICdhc2MnO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMub25Tb3J0Q2hhbmdlLmVtaXQodGhpcy5jb2x1bW4pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=