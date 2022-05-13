// NG2
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
// App
import { Helpers } from '../../../../utils/Helpers';
import * as i0 from "@angular/core";
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
ThOrderable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ThOrderable, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ThOrderable.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: ThOrderable, selector: "[novoThOrderable]", inputs: { column: ["novoThOrderable", "column"] }, outputs: { onOrderChange: "onOrderChange" }, host: { listeners: { "dragstart": "onDragStart($event)", "dragover": "onDragOver($event)", "dragenter": "onDragEnter($event)", "dragleave": "onDragLeave($event)", "dragend": "onDragEnd($event)", "drop": "onDrop($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ThOrderable, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoThOrderable]',
                    host: {
                        '(dragstart)': 'onDragStart($event)',
                        '(dragover)': 'onDragOver($event)',
                        '(dragenter)': 'onDragEnter($event)',
                        '(dragleave)': 'onDragLeave($event)',
                        '(dragend)': 'onDragEnd($event)',
                        '(drop)': 'onDrop($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { column: [{
                type: Input,
                args: ['novoThOrderable']
            }], onOrderChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGhPcmRlcmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9leHRyYXMvdGgtb3JkZXJhYmxlL1RoT3JkZXJhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQWFwRCxNQUFNLE9BQU8sV0FBVztJQVV0QixZQUFvQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBTnZDLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFPcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUN2RSxNQUFNLFFBQVEsR0FBZSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hHLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFXO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyRCxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDMUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQWdEO1FBQzVELGtHQUFrRztRQUNsRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ1YsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyQjtxQkFBTTtvQkFDTCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDbkMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDbEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDMUI7NkJBQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDekIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUMzQjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUs7UUFDYixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDNUIsT0FBTyxlQUFlLEVBQUU7WUFDdEIsZUFBZSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7WUFDN0MsSUFBSSxlQUFlLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7Z0JBQ3hFLE9BQU8sZUFBZSxDQUFDO2FBQ3hCO1NBQ0Y7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQVc7UUFDaEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBVztRQUNuQixPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQVc7UUFDaEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBb0c7UUFDN0csT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDdkMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVU7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFXO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7d0dBckhVLFdBQVc7NEZBQVgsV0FBVzsyRkFBWCxXQUFXO2tCQVh2QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRTt3QkFDSixhQUFhLEVBQUUscUJBQXFCO3dCQUNwQyxZQUFZLEVBQUUsb0JBQW9CO3dCQUNsQyxhQUFhLEVBQUUscUJBQXFCO3dCQUNwQyxhQUFhLEVBQUUscUJBQXFCO3dCQUNwQyxXQUFXLEVBQUUsbUJBQW1CO3dCQUNoQyxRQUFRLEVBQUUsZ0JBQWdCO3FCQUMzQjtpQkFDRjtpR0FHQyxNQUFNO3NCQURMLEtBQUs7dUJBQUMsaUJBQWlCO2dCQUd4QixhQUFhO3NCQURaLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFwcFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbm92b1RoT3JkZXJhYmxlXScsXG4gIGhvc3Q6IHtcbiAgICAnKGRyYWdzdGFydCknOiAnb25EcmFnU3RhcnQoJGV2ZW50KScsXG4gICAgJyhkcmFnb3ZlciknOiAnb25EcmFnT3ZlcigkZXZlbnQpJyxcbiAgICAnKGRyYWdlbnRlciknOiAnb25EcmFnRW50ZXIoJGV2ZW50KScsXG4gICAgJyhkcmFnbGVhdmUpJzogJ29uRHJhZ0xlYXZlKCRldmVudCknLFxuICAgICcoZHJhZ2VuZCknOiAnb25EcmFnRW5kKCRldmVudCknLFxuICAgICcoZHJvcCknOiAnb25Ecm9wKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUaE9yZGVyYWJsZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgnbm92b1RoT3JkZXJhYmxlJylcbiAgY29sdW1uOiBhbnk7XG4gIEBPdXRwdXQoKVxuICBvbk9yZGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB0YWJsZTogYW55O1xuICBjbG9uZTogYW55O1xuICB0YXJnZXQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICB9XG5cbiAgZ2V0IGluZGV4KCkge1xuICAgIGxldCBpbmRleDogbnVtYmVyID0gbnVsbDtcbiAgICBpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgY29uc3QgY2hpbGRyZW46IEFycmF5PGFueT4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuKTtcbiAgICAgIGluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZih0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmNvbHVtbi5vcmRlcmluZykge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCB0cnVlKTtcbiAgICAgIHRoaXMudGFibGUgPSB0aGlzLmZpbmRUYWJsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgb25EcmFnU3RhcnQoZXZlbnQ/OiBhbnkpIHtcbiAgICBpZiAodGhpcy5jb2x1bW4ub3JkZXJpbmcpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgSlNPTi5zdHJpbmdpZnkodGhpcy5jb2x1bW4pKTtcblxuICAgICAgdGhpcy5jbG9uZSA9IHRoaXMudGFibGUuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgdGhpcy5jbG9uZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICB0aGlzLmNsb25lLnN0eWxlLmxlZnQgPSAnMTAwJSc7XG4gICAgICB0aGlzLmNsb25lLnN0eWxlLndpZHRoID0gJzE1MHB4JztcbiAgICAgIHRoaXMuZGVsZXRlQ29sdW1ucyh0aGlzLmNsb25lKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jbG9uZSk7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKHRoaXMuY2xvbmUsIDc1LCAzMCk7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlQ29sdW1ucyh0YWJsZTogeyByb3dzOiBBcnJheTxhbnk+OyBkZWxldGVSb3c6IEZ1bmN0aW9uIH0pIHtcbiAgICAvLyBUT0RPOiBgdGFibGVgIHNob3VsZCBiZSBpbW11dGFibGUgYW5kIHRoaXMgbWV0aG9kIHNob3VsZCByZXR1cm4gdGhlIG1vZGlmaWVkIGRhdGEgdG8gaXRzIGNhbGxlclxuICAgIGlmICh0YWJsZS5yb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGFsbFJvd3MgPSB0YWJsZS5yb3dzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxSb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpID4gMTApIHtcbiAgICAgICAgICB0YWJsZS5kZWxldGVSb3coLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGNlbGxMZW5ndGggPSBhbGxSb3dzW2ldLmNlbGxzLmxlbmd0aDtcbiAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNlbGxMZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgaWYgKGMgPCB0aGlzLmluZGV4KSB7XG4gICAgICAgICAgICAgIGFsbFJvd3NbaV0uZGVsZXRlQ2VsbCgwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA+IHRoaXMuaW5kZXgpIHtcbiAgICAgICAgICAgICAgYWxsUm93c1tpXS5kZWxldGVDZWxsKC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5kVGFibGUoc3RhcnQpIHtcbiAgICBsZXQgaHRtbEVsZW1lbnROb2RlID0gc3RhcnQ7XG4gICAgd2hpbGUgKGh0bWxFbGVtZW50Tm9kZSkge1xuICAgICAgaHRtbEVsZW1lbnROb2RlID0gaHRtbEVsZW1lbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICBpZiAoaHRtbEVsZW1lbnROb2RlICYmIGh0bWxFbGVtZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0YWJsZScpIHtcbiAgICAgICAgcmV0dXJuIGh0bWxFbGVtZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIG9uRHJhZyhldmVudD86IGFueSkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvbkRyYWdFbmQoZXZlbnQ/OiBhbnkpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcicpO1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmNsb25lKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvbkRyb3AoZXZlbnQ/OiBhbnkpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcicpO1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJykpO1xuXG4gICAgdGhpcy5vbk9yZGVyQ2hhbmdlLmVtaXQoe1xuICAgICAgZmlyc3Q6IGRhdGEsXG4gICAgICBzZWNvbmQ6IHRoaXMuY29sdW1uLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgb25EcmFnT3ZlcihldmVudDogeyBwcmV2ZW50RGVmYXVsdDogRnVuY3Rpb247IGRhdGFUcmFuc2ZlcjogeyBkcm9wRWZmZWN0OiBzdHJpbmcgfTsgc3RvcFByb3BhZ2F0aW9uOiBGdW5jdGlvbiB9KTogYm9vbGVhbiB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG9uRHJhZ0VudGVyKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvdmVyJyk7XG4gICAgdGhpcy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gIH1cblxuICBvbkRyYWdMZWF2ZShldmVudD86IGFueSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ292ZXInKTtcbiAgfVxufVxuIl19