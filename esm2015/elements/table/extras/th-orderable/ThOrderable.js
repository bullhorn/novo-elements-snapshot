// NG2
import { Directive, EventEmitter, ElementRef, Input, Output } from '@angular/core';
// App
import { Helpers } from '../../../../utils/Helpers';
export class ThOrderable {
    constructor(element) {
        this.element = element;
        this.onOrderChange = new EventEmitter();
        this.element = element;
    }
    get index() {
        let index = null;
        if (this.element.nativeElement && this.element.nativeElement.parentNode) {
            const children = Array.prototype.slice.call(this.element.nativeElement.parentNode.children);
            index = children.indexOf(this.element.nativeElement);
        }
        return index;
    }
    ngOnInit() {
        if (this.column.ordering) {
            this.element.nativeElement.setAttribute('draggable', true);
            this.table = this.findTable(this.element.nativeElement);
        }
    }
    onDragStart(event) {
        if (this.column.ordering) {
            this.element.nativeElement.classList.add('dragging');
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', JSON.stringify(this.column));
            this.clone = this.table.cloneNode(true);
            this.clone.style.position = 'absolute';
            this.clone.style.left = '100%';
            this.clone.style.width = '150px';
            this.deleteColumns(this.clone);
            document.body.appendChild(this.clone);
            event.dataTransfer.setDragImage(this.clone, 75, 30);
        }
    }
    deleteColumns(table) {
        // TODO: `table` should be immutable and this method should return the modified data to its caller
        if (table.rows.length > 0) {
            const allRows = table.rows;
            for (let i = 0; i < allRows.length; i++) {
                if (i > 10) {
                    table.deleteRow(-1);
                }
                else {
                    const cellLength = allRows[i].cells.length;
                    for (let c = 0; c < cellLength; c++) {
                        if (c < this.index) {
                            allRows[i].deleteCell(0);
                        }
                        else if (c > this.index) {
                            allRows[i].deleteCell(-1);
                        }
                    }
                }
            }
        }
    }
    findTable(start) {
        let htmlElementNode = start;
        while (htmlElementNode) {
            htmlElementNode = htmlElementNode.parentNode;
            if (htmlElementNode && htmlElementNode.tagName.toLowerCase() === 'table') {
                return htmlElementNode;
            }
        }
        return undefined;
    }
    onDrag(event) {
        Helpers.swallowEvent(event);
        return false;
    }
    onDragEnd(event) {
        Helpers.swallowEvent(event);
        this.element.nativeElement.classList.remove('over');
        this.element.nativeElement.classList.remove('dragging');
        document.body.removeChild(this.clone);
        return false;
    }
    onDrop(event) {
        Helpers.swallowEvent(event);
        this.element.nativeElement.classList.remove('over');
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        this.onOrderChange.emit({
            first: data,
            second: this.column,
        });
        return false;
    }
    onDragOver(event) {
        Helpers.swallowEvent(event);
        event.dataTransfer.dropEffect = 'move';
        return false;
    }
    onDragEnter(event) {
        this.element.nativeElement.classList.add('over');
        this.target = event.target;
    }
    onDragLeave(event) {
        this.element.nativeElement.classList.remove('over');
    }
}
ThOrderable.decorators = [
    { type: Directive, args: [{
                selector: '[novoThOrderable]',
                host: {
                    '(dragstart)': 'onDragStart($event)',
                    '(dragover)': 'onDragOver($event)',
                    '(dragenter)': 'onDragEnter($event)',
                    '(dragleave)': 'onDragLeave($event)',
                    '(dragend)': 'onDragEnd($event)',
                    '(drop)': 'onDrop($event)',
                },
            },] }
];
ThOrderable.ctorParameters = () => [
    { type: ElementRef }
];
ThOrderable.propDecorators = {
    column: [{ type: Input, args: ['novoThOrderable',] }],
    onOrderChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGhPcmRlcmFibGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYmxlL2V4dHJhcy90aC1vcmRlcmFibGUvVGhPcmRlcmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFhcEQsTUFBTSxPQUFPLFdBQVc7SUFVdEIsWUFBb0IsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQU52QyxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBT3BELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDdkUsTUFBTSxRQUFRLEdBQWUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RyxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDeEIsSUFB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QUFVO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBVztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7OztZQWhJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsSUFBSSxFQUFFO29CQUNKLGFBQWEsRUFBRSxxQkFBcUI7b0JBQ3BDLFlBQVksRUFBRSxvQkFBb0I7b0JBQ2xDLGFBQWEsRUFBRSxxQkFBcUI7b0JBQ3BDLGFBQWEsRUFBRSxxQkFBcUI7b0JBQ3BDLFdBQVcsRUFBRSxtQkFBbUI7b0JBQ2hDLFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCO2FBQ0Y7OztZQWRpQyxVQUFVOzs7cUJBZ0J6QyxLQUFLLFNBQUMsaUJBQWlCOzRCQUV2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gQXBwXHJcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9IZWxwZXJzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25vdm9UaE9yZGVyYWJsZV0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICcoZHJhZ3N0YXJ0KSc6ICdvbkRyYWdTdGFydCgkZXZlbnQpJyxcclxuICAgICcoZHJhZ292ZXIpJzogJ29uRHJhZ092ZXIoJGV2ZW50KScsXHJcbiAgICAnKGRyYWdlbnRlciknOiAnb25EcmFnRW50ZXIoJGV2ZW50KScsXHJcbiAgICAnKGRyYWdsZWF2ZSknOiAnb25EcmFnTGVhdmUoJGV2ZW50KScsXHJcbiAgICAnKGRyYWdlbmQpJzogJ29uRHJhZ0VuZCgkZXZlbnQpJyxcclxuICAgICcoZHJvcCknOiAnb25Ecm9wKCRldmVudCknLFxyXG4gIH0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaE9yZGVyYWJsZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCdub3ZvVGhPcmRlcmFibGUnKVxyXG4gIGNvbHVtbjogYW55O1xyXG4gIEBPdXRwdXQoKVxyXG4gIG9uT3JkZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB0YWJsZTogYW55O1xyXG4gIGNsb25lOiBhbnk7XHJcbiAgdGFyZ2V0OiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGdldCBpbmRleCgpIHtcclxuICAgIGxldCBpbmRleDogbnVtYmVyID0gbnVsbDtcclxuICAgIGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlKSB7XHJcbiAgICAgIGNvbnN0IGNoaWxkcmVuOiBBcnJheTxhbnk+ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZHJlbik7XHJcbiAgICAgIGluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZih0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbi5vcmRlcmluZykge1xyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsIHRydWUpO1xyXG4gICAgICB0aGlzLnRhYmxlID0gdGhpcy5maW5kVGFibGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25EcmFnU3RhcnQoZXZlbnQ/OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbi5vcmRlcmluZykge1xyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xyXG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcclxuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBKU09OLnN0cmluZ2lmeSh0aGlzLmNvbHVtbikpO1xyXG5cclxuICAgICAgdGhpcy5jbG9uZSA9IHRoaXMudGFibGUuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICB0aGlzLmNsb25lLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgdGhpcy5jbG9uZS5zdHlsZS5sZWZ0ID0gJzEwMCUnO1xyXG4gICAgICB0aGlzLmNsb25lLnN0eWxlLndpZHRoID0gJzE1MHB4JztcclxuICAgICAgdGhpcy5kZWxldGVDb2x1bW5zKHRoaXMuY2xvbmUpO1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2xvbmUpO1xyXG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKHRoaXMuY2xvbmUsIDc1LCAzMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVDb2x1bW5zKHRhYmxlOiB7IHJvd3M6IEFycmF5PGFueT47IGRlbGV0ZVJvdzogRnVuY3Rpb24gfSkge1xyXG4gICAgLy8gVE9ETzogYHRhYmxlYCBzaG91bGQgYmUgaW1tdXRhYmxlIGFuZCB0aGlzIG1ldGhvZCBzaG91bGQgcmV0dXJuIHRoZSBtb2RpZmllZCBkYXRhIHRvIGl0cyBjYWxsZXJcclxuICAgIGlmICh0YWJsZS5yb3dzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgYWxsUm93cyA9IHRhYmxlLnJvd3M7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpID4gMTApIHtcclxuICAgICAgICAgIHRhYmxlLmRlbGV0ZVJvdygtMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGNlbGxMZW5ndGggPSBhbGxSb3dzW2ldLmNlbGxzLmxlbmd0aDtcclxuICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY2VsbExlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgIGlmIChjIDwgdGhpcy5pbmRleCkge1xyXG4gICAgICAgICAgICAgIGFsbFJvd3NbaV0uZGVsZXRlQ2VsbCgwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjID4gdGhpcy5pbmRleCkge1xyXG4gICAgICAgICAgICAgIGFsbFJvd3NbaV0uZGVsZXRlQ2VsbCgtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRUYWJsZShzdGFydCkge1xyXG4gICAgbGV0IGh0bWxFbGVtZW50Tm9kZSA9IHN0YXJ0O1xyXG4gICAgd2hpbGUgKGh0bWxFbGVtZW50Tm9kZSkge1xyXG4gICAgICBodG1sRWxlbWVudE5vZGUgPSBodG1sRWxlbWVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgaWYgKGh0bWxFbGVtZW50Tm9kZSAmJiBodG1sRWxlbWVudE5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGFibGUnKSB7XHJcbiAgICAgICAgcmV0dXJuIGh0bWxFbGVtZW50Tm9kZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIG9uRHJhZyhldmVudD86IGFueSkge1xyXG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgb25EcmFnRW5kKGV2ZW50PzogYW55KSB7XHJcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyJyk7XHJcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmNsb25lKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG9uRHJvcChldmVudD86IGFueSkge1xyXG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcicpO1xyXG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSk7XHJcblxyXG4gICAgdGhpcy5vbk9yZGVyQ2hhbmdlLmVtaXQoe1xyXG4gICAgICBmaXJzdDogZGF0YSxcclxuICAgICAgc2Vjb25kOiB0aGlzLmNvbHVtbixcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG9uRHJhZ092ZXIoZXZlbnQ6IHsgcHJldmVudERlZmF1bHQ6IEZ1bmN0aW9uOyBkYXRhVHJhbnNmZXI6IHsgZHJvcEVmZmVjdDogc3RyaW5nIH07IHN0b3BQcm9wYWdhdGlvbjogRnVuY3Rpb24gfSk6IGJvb2xlYW4ge1xyXG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBvbkRyYWdFbnRlcihldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvdmVyJyk7XHJcbiAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICB9XHJcblxyXG4gIG9uRHJhZ0xlYXZlKGV2ZW50PzogYW55KSB7XHJcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==