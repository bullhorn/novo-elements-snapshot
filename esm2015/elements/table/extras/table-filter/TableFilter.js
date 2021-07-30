// NG2
import { Directive, EventEmitter, ElementRef, Renderer2, Input, Output, HostListener, } from '@angular/core';
// APP
import { KeyCodes } from './../../../../utils/key-codes/KeyCodes';
import { Helpers } from './../../../../utils/Helpers';
export class TableFilter {
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.onFilterChange = new EventEmitter();
        this.element = element;
        this.renderer = renderer;
    }
    ngOnInit() {
        this.ngOnChanges();
    }
    ngOnChanges(changes) {
        let label = '';
        if (this.config.freetextFilter) {
            label = this.config.freetextFilter;
        }
        else if (this.config.filter) {
            label = this.config.filter;
        }
        this.renderer.setProperty(this.element, 'value', label);
    }
    onChangeFilter(event) {
        clearTimeout(this.filterThrottle);
        if (KeyCodes.ENTER === event.keyCode) {
            this.config.filter = event.target.value;
            this.onFilterChange.emit({ filtering: this.config });
        }
        else {
            this.filterThrottle = setTimeout(() => {
                this.config.filter = event.target.value;
                this.onFilterChange.emit({ filtering: this.config });
            }, 300);
        }
    }
    onClick(event) {
        Helpers.swallowEvent(event);
    }
}
TableFilter.decorators = [
    { type: Directive, args: [{
                selector: '[novoTableFilter]',
            },] }
];
TableFilter.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
TableFilter.propDecorators = {
    config: [{ type: Input, args: ['novoTableFilter',] }],
    onFilterChange: [{ type: Output }],
    onChangeFilter: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVGaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYmxlL2V4dHJhcy90YWJsZS1maWx0ZXIvVGFibGVGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFLdEQsTUFBTSxPQUFPLFdBQVc7SUFRdEIsWUFBb0IsT0FBbUIsRUFBVSxRQUFtQjtRQUFoRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUpwRSxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBS3JELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBdUI7UUFDakMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUM5QixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7U0FDcEM7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFHTSxjQUFjLENBQUMsS0FBb0I7UUFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBSSxLQUFLLENBQUMsTUFBYyxDQUFDLEtBQUssQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN0RDthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBSSxLQUFLLENBQUMsTUFBYyxDQUFDLEtBQUssQ0FBQztnQkFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDdkQsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1Q7SUFDSCxDQUFDO0lBR00sT0FBTyxDQUFDLEtBQUs7UUFDbEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7WUEvQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7YUFDOUI7OztZQWZDLFVBQVU7WUFDVixTQUFTOzs7cUJBZ0JSLEtBQUssU0FBQyxpQkFBaUI7NkJBRXZCLE1BQU07NkJBd0JOLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0JBY2xDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgS2V5Q29kZXMgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3V0aWxzL2tleS1jb2Rlcy9LZXlDb2Rlcyc7XHJcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbm92b1RhYmxlRmlsdGVyXScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUZpbHRlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoJ25vdm9UYWJsZUZpbHRlcicpXHJcbiAgY29uZmlnOiBhbnk7XHJcbiAgQE91dHB1dCgpXHJcbiAgb25GaWx0ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBmaWx0ZXJUaHJvdHRsZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGxldCBsYWJlbCA9ICcnO1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLmZyZWV0ZXh0RmlsdGVyKSB7XHJcbiAgICAgIGxhYmVsID0gdGhpcy5jb25maWcuZnJlZXRleHRGaWx0ZXI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmZpbHRlcikge1xyXG4gICAgICBsYWJlbCA9IHRoaXMuY29uZmlnLmZpbHRlcjtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50LCAndmFsdWUnLCBsYWJlbCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25DaGFuZ2VGaWx0ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZpbHRlclRocm90dGxlKTtcclxuICAgIGlmIChLZXlDb2Rlcy5FTlRFUiA9PT0gZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICB0aGlzLmNvbmZpZy5maWx0ZXIgPSAoZXZlbnQudGFyZ2V0IGFzIGFueSkudmFsdWU7XHJcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UuZW1pdCh7IGZpbHRlcmluZzogdGhpcy5jb25maWcgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbHRlclRocm90dGxlID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb25maWcuZmlsdGVyID0gKGV2ZW50LnRhcmdldCBhcyBhbnkpLnZhbHVlO1xyXG4gICAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UuZW1pdCh7IGZpbHRlcmluZzogdGhpcy5jb25maWcgfSk7XHJcbiAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcclxuICB9XHJcbn1cclxuIl19