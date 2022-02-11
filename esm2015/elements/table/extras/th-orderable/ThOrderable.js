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
ThOrderable.ɵfac = function ThOrderable_Factory(t) { return new (t || ThOrderable)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
ThOrderable.ɵdir = i0.ɵɵdefineDirective({ type: ThOrderable, selectors: [["", "novoThOrderable", ""]], hostBindings: function ThOrderable_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("dragstart", function ThOrderable_dragstart_HostBindingHandler($event) { return ctx.onDragStart($event); })("dragover", function ThOrderable_dragover_HostBindingHandler($event) { return ctx.onDragOver($event); })("dragenter", function ThOrderable_dragenter_HostBindingHandler($event) { return ctx.onDragEnter($event); })("dragleave", function ThOrderable_dragleave_HostBindingHandler($event) { return ctx.onDragLeave($event); })("dragend", function ThOrderable_dragend_HostBindingHandler($event) { return ctx.onDragEnd($event); })("drop", function ThOrderable_drop_HostBindingHandler($event) { return ctx.onDrop($event); });
    } }, inputs: { column: ["novoThOrderable", "column"] }, outputs: { onOrderChange: "onOrderChange" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ThOrderable, [{
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
    }], function () { return [{ type: i0.ElementRef }]; }, { column: [{
            type: Input,
            args: ['novoThOrderable']
        }], onOrderChange: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGhPcmRlcmFibGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGFibGUvZXh0cmFzL3RoLW9yZGVyYWJsZS9UaE9yZGVyYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFhcEQsTUFBTSxPQUFPLFdBQVc7SUFVdEIsWUFBb0IsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQU52QyxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBT3BELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDdkUsTUFBTSxRQUFRLEdBQWUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RyxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFR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QUVELFdBQVcsQ0FBQyxLQUFVO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBVztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7O3NFQXJIVSxXQUFXO2dEQUFYLFdBQVc7c0dBQVgsdUJBQW1CLG1GQUFuQixzQkFBa0IscUZBQWxCLHVCQUFtQixxRkFBbkIsdUJBQW1CLGlGQUFuQixxQkFBaUIsMkVBQWpCLGtCQUFjOztrREFBZCxXQUFXO2NBWHZCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixJQUFJLEVBQUU7b0JBQ0osYUFBYSxFQUFFLHFCQUFxQjtvQkFDcEMsWUFBWSxFQUFFLG9CQUFvQjtvQkFDbEMsYUFBYSxFQUFFLHFCQUFxQjtvQkFDcEMsYUFBYSxFQUFFLHFCQUFxQjtvQkFDcEMsV0FBVyxFQUFFLG1CQUFtQjtvQkFDaEMsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7YUFDRjs2REFHQyxNQUFNO2tCQURMLEtBQUs7bUJBQUMsaUJBQWlCO1lBR3hCLGFBQWE7a0JBRFosTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQXBwXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvVGhPcmRlcmFibGVdJyxcbiAgaG9zdDoge1xuICAgICcoZHJhZ3N0YXJ0KSc6ICdvbkRyYWdTdGFydCgkZXZlbnQpJyxcbiAgICAnKGRyYWdvdmVyKSc6ICdvbkRyYWdPdmVyKCRldmVudCknLFxuICAgICcoZHJhZ2VudGVyKSc6ICdvbkRyYWdFbnRlcigkZXZlbnQpJyxcbiAgICAnKGRyYWdsZWF2ZSknOiAnb25EcmFnTGVhdmUoJGV2ZW50KScsXG4gICAgJyhkcmFnZW5kKSc6ICdvbkRyYWdFbmQoJGV2ZW50KScsXG4gICAgJyhkcm9wKSc6ICdvbkRyb3AoJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFRoT3JkZXJhYmxlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdub3ZvVGhPcmRlcmFibGUnKVxuICBjb2x1bW46IGFueTtcbiAgQE91dHB1dCgpXG4gIG9uT3JkZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHRhYmxlOiBhbnk7XG4gIGNsb25lOiBhbnk7XG4gIHRhcmdldDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXQgaW5kZXgoKSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbjogQXJyYXk8YW55PiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUuY2hpbGRyZW4pO1xuICAgICAgaW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuY29sdW1uLm9yZGVyaW5nKSB7XG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsIHRydWUpO1xuICAgICAgdGhpcy50YWJsZSA9IHRoaXMuZmluZFRhYmxlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBvbkRyYWdTdGFydChldmVudD86IGFueSkge1xuICAgIGlmICh0aGlzLmNvbHVtbi5vcmRlcmluZykge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBKU09OLnN0cmluZ2lmeSh0aGlzLmNvbHVtbikpO1xuXG4gICAgICB0aGlzLmNsb25lID0gdGhpcy50YWJsZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICB0aGlzLmNsb25lLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIHRoaXMuY2xvbmUuc3R5bGUubGVmdCA9ICcxMDAlJztcbiAgICAgIHRoaXMuY2xvbmUuc3R5bGUud2lkdGggPSAnMTUwcHgnO1xuICAgICAgdGhpcy5kZWxldGVDb2x1bW5zKHRoaXMuY2xvbmUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNsb25lKTtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UodGhpcy5jbG9uZSwgNzUsIDMwKTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVDb2x1bW5zKHRhYmxlOiB7IHJvd3M6IEFycmF5PGFueT47IGRlbGV0ZVJvdzogRnVuY3Rpb24gfSkge1xuICAgIC8vIFRPRE86IGB0YWJsZWAgc2hvdWxkIGJlIGltbXV0YWJsZSBhbmQgdGhpcyBtZXRob2Qgc2hvdWxkIHJldHVybiB0aGUgbW9kaWZpZWQgZGF0YSB0byBpdHMgY2FsbGVyXG4gICAgaWYgKHRhYmxlLnJvd3MubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYWxsUm93cyA9IHRhYmxlLnJvd3M7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPiAxMCkge1xuICAgICAgICAgIHRhYmxlLmRlbGV0ZVJvdygtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY2VsbExlbmd0aCA9IGFsbFJvd3NbaV0uY2VsbHMubGVuZ3RoO1xuICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY2VsbExlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICBpZiAoYyA8IHRoaXMuaW5kZXgpIHtcbiAgICAgICAgICAgICAgYWxsUm93c1tpXS5kZWxldGVDZWxsKDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjID4gdGhpcy5pbmRleCkge1xuICAgICAgICAgICAgICBhbGxSb3dzW2ldLmRlbGV0ZUNlbGwoLTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmRUYWJsZShzdGFydCkge1xuICAgIGxldCBodG1sRWxlbWVudE5vZGUgPSBzdGFydDtcbiAgICB3aGlsZSAoaHRtbEVsZW1lbnROb2RlKSB7XG4gICAgICBodG1sRWxlbWVudE5vZGUgPSBodG1sRWxlbWVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgIGlmIChodG1sRWxlbWVudE5vZGUgJiYgaHRtbEVsZW1lbnROb2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RhYmxlJykge1xuICAgICAgICByZXR1cm4gaHRtbEVsZW1lbnROb2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgb25EcmFnKGV2ZW50PzogYW55KSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG9uRHJhZ0VuZChldmVudD86IGFueSkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyJyk7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuY2xvbmUpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG9uRHJvcChldmVudD86IGFueSkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyJyk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSk7XG5cbiAgICB0aGlzLm9uT3JkZXJDaGFuZ2UuZW1pdCh7XG4gICAgICBmaXJzdDogZGF0YSxcbiAgICAgIHNlY29uZDogdGhpcy5jb2x1bW4sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvbkRyYWdPdmVyKGV2ZW50OiB7IHByZXZlbnREZWZhdWx0OiBGdW5jdGlvbjsgZGF0YVRyYW5zZmVyOiB7IGRyb3BFZmZlY3Q6IHN0cmluZyB9OyBzdG9wUHJvcGFnYXRpb246IEZ1bmN0aW9uIH0pOiBib29sZWFuIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgb25EcmFnRW50ZXIoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ292ZXInKTtcbiAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgfVxuXG4gIG9uRHJhZ0xlYXZlKGV2ZW50PzogYW55KSB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcicpO1xuICB9XG59XG4iXX0=