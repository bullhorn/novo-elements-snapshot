import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
export class NovoDragBoxParent {
    get itemsReordered() {
        return this.trackedItems.map(item => item.item);
    }
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.$destroy = new ReplaySubject(1);
        this.novoDragDropFinish = new EventEmitter();
        this.mutationObserver = new MutationObserver(this.mutationDetected.bind(this));
    }
    get element() {
        return this.elementRef.nativeElement;
    }
    ngAfterViewInit() {
        this.registerChildren();
        this.mutationObserver.observe(this.element, { childList: true });
    }
    ngOnDestroy() {
        this.$destroy.next();
        this.$destroy.complete();
    }
    registerChildren() {
        if (this.items && this.items.length !== this.element.children.length) {
            throw new Error(`Could not match item list to children list - drag box contains ${this.items.length} items, but has ${this.element.children.length} elements`);
        }
        this.trackedItems = [];
        for (let i = 0; i < this.element.children.length; i++) {
            this.registerChild(this.element.children[i], i);
        }
    }
    registerChild(element, index) {
        const listeners = [
            this.renderer.listen(element, 'dragstart', this.onDragStart.bind(this)),
            this.renderer.listen(element, 'drop', this.onDragFinish.bind(this)),
            this.renderer.listen(element, 'dragend', this.onDragStop.bind(this))
        ];
        element.draggable = true;
        this.$destroy.subscribe(() => listeners.forEach(cb => cb()));
        this.trackedItems.push({
            item: this.items[index],
            element
        });
    }
    mutationDetected(mutations) {
        if (this.pickedUp) {
            return;
        }
        const addedNodes = new Set();
        const removedNodes = new Set();
        for (let mutation of mutations) {
            mutation.addedNodes.forEach((a) => {
                if (!removedNodes.delete(a)) {
                    addedNodes.add(a);
                }
            });
            mutation.removedNodes.forEach((a) => {
                if (!addedNodes.delete(a)) {
                    removedNodes.add(a);
                }
            });
        }
        addedNodes.forEach(node => {
            const idx = Array.prototype.indexOf.call(this.element.children, node);
            this.registerChild(node, idx);
        });
        if (removedNodes.size > 0) {
            this.trackedItems = this.trackedItems.filter(item => !removedNodes.has(item.element));
        }
    }
    /** Per-item listeners */
    onDragStart(event) {
        if (this.shouldBlockDragStart(event)) {
            event.preventDefault();
            return;
        }
        const dataTransfer = event.dataTransfer;
        // Present a native 'move item' effect
        dataTransfer.effectAllowed = 'move';
        this.pickedUp = event.target;
        event.stopPropagation();
        this.savedOrder = [...this.trackedItems];
    }
    // Equivalent of "finally" - this runs whether or not the drag finished on a valid ending location
    onDragStop(event) {
        this.pickedUp = null;
        this.savedOrder = null;
        event.stopPropagation();
    }
    onDragFinish(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.element.contains(event.currentTarget)) {
            // this is for a different drag region - ignore
            return;
        }
        const draggedItem = this.trackedItems.find(item => item.element === this.pickedUp)?.item;
        this.trackedItems = Array.prototype.map.call(this.element.children, child => {
            const item = this.trackedItems.find(item => item.element === child);
            if (!item) {
                throw new Error('DragDrop: Error - could not reassociate an item post-drag');
            }
            return item;
        });
        this.novoDragDropFinish.emit({
            draggedItem,
            allItems: this.itemsReordered,
            event
        });
    }
    /** - end per-item listeners */
    onDragOver(event) {
        if (!this.pickedUp) {
            return;
        }
        let target = event.target;
        if (!this.element.contains(target)) {
            target = null;
        }
        // In some cases (maybe browser-specific) we may have this event reported from a sub-element of a drag destination.
        // We need to go upwards in the tree to find the actual target
        if (target && !target.draggable) {
            target = this.findDraggableParentOfElement(target);
        }
        // Check if this drag event is within this drag box
        if (target && target.parentElement === this.element) {
            event.stopPropagation();
            event.preventDefault();
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move';
            }
            this.applyTempSort(this.pickedUp, target);
        }
        else {
            // if not within this drag box, then move this item back to its original position and show a diabled drag effect
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'none';
            }
            this.resetSorting();
        }
    }
    findDraggableParentOfElement(target) {
        const parentElement = target.parentElement;
        if (!parentElement) {
            return null;
        }
        else if (parentElement.draggable) {
            return parentElement;
        }
        else {
            return this.findDraggableParentOfElement(parentElement);
        }
    }
    applyTempSort(showXElement, inPlaceOfY) {
        if (showXElement === inPlaceOfY) {
            // same element - ignoring
            return;
        }
        // Apply the "preview" effect from dragging one item to another
        const aIndex = Array.prototype.indexOf.call(this.elementRef.nativeElement.children, showXElement);
        const bIndex = Array.prototype.indexOf.call(this.elementRef.nativeElement.children, inPlaceOfY);
        const diff = bIndex - aIndex;
        let insertPosition;
        if (diff > 0) {
            insertPosition = 'afterend';
        }
        else if (diff < 0) {
            insertPosition = 'beforebegin';
        }
        else {
            throw new Error('DragDrop: Two elements are in the same position');
        }
        inPlaceOfY.insertAdjacentElement(insertPosition, showXElement);
    }
    resetSorting() {
        // return to the order of elements from the last time we called onDragPickup
        if (!this.savedOrder) {
            throw new Error('DragDrop: Cannot reset sorting with no saved order');
        }
        const boxElem = this.elementRef.nativeElement;
        for (let i = 0; i < boxElem.children.length; i++) {
            const item = boxElem.children[i];
            if (this.savedOrder[i].element !== item && i > 0) {
                this.savedOrder[i - 1].element.insertAdjacentElement('afterend', this.savedOrder[i].element);
            }
        }
    }
    // If the user has provided classes indicating they only want a certain region to be draggable, ignore
    // this drag event if it is outside of there.
    shouldBlockDragStart(event) {
        const dragTarget = event.target;
        // TODO: Allow for multiple drag targets, and drag exclusion targets
        const userDragTarget = dragTarget.querySelector('.novo-drag-target');
        if (userDragTarget) {
            return !this.isElementWithinEventBounds(userDragTarget, event);
        }
    }
    isElementWithinEventBounds(element, event) {
        const rect = element.getBoundingClientRect();
        const isInside = event.clientX > rect.left && event.clientX < rect.right &&
            event.clientY < rect.bottom && event.clientY > rect.top;
        return isInside;
    }
}
NovoDragBoxParent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDragBoxParent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NovoDragBoxParent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NovoDragBoxParent, selector: "[novoDragDrop]", inputs: { items: ["novoDragDrop", "items"] }, outputs: { novoDragDropFinish: "novoDragDropFinish" }, host: { listeners: { "window:dragover": "onDragOver($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDragBoxParent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoDragDrop]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { items: [{
                type: Input,
                args: ['novoDragDrop']
            }], novoDragDropFinish: [{
                type: Output
            }], onDragOver: [{
                type: HostListener,
                args: ['window:dragover', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLWJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RyYWctZHJvcC9kcmFnLWRyb3AtYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RJLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBZ0JyQyxNQUFNLE9BQU8saUJBQWlCO0lBYTFCLElBQUksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUlELFlBQW9CLFVBQXNCLEVBQVUsUUFBbUI7UUFBbkQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFkdkUsYUFBUSxHQUFHLElBQUksYUFBYSxDQUFPLENBQUMsQ0FBQyxDQUFDO1FBSTVCLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUEwQixDQUFDO1FBUTFFLHFCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRUMsQ0FBQztJQUU1RSxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFB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QUFnQjtpQkFDN0I7eUhBUTBCLEtBQUs7c0JBQTNCLEtBQUs7dUJBQUMsY0FBYztnQkFFWCxrQkFBa0I7c0JBQTNCLE1BQU07Z0JBK0hQLFVBQVU7c0JBRFQsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b0RyYWdGaW5pc2hFdmVudDxUPiB7XG4gICAgZHJhZ2dlZEl0ZW06IFQ7XG4gICAgYWxsSXRlbXM6IFRbXTtcbiAgICBldmVudDogRHJhZ0V2ZW50O1xufVxuXG5pbnRlcmZhY2UgTm92b0RyYWdJdGVtPFQ+IHtcbiAgICBpdGVtOiBUO1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tub3ZvRHJhZ0Ryb3BdJ1xufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHJhZ0JveFBhcmVudDxUPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBwaWNrZWRVcD86IEhUTUxFbGVtZW50O1xuICAgIHNhdmVkT3JkZXI/OiBOb3ZvRHJhZ0l0ZW08VD5bXTtcblxuICAgICRkZXN0cm95ID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oMSk7XG5cbiAgICBASW5wdXQoJ25vdm9EcmFnRHJvcCcpIGl0ZW1zOiBUW107XG5cbiAgICBAT3V0cHV0KCkgbm92b0RyYWdEcm9wRmluaXNoID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvRHJhZ0ZpbmlzaEV2ZW50PFQ+PigpO1xuXG4gICAgcHJpdmF0ZSB0cmFja2VkSXRlbXM6IE5vdm9EcmFnSXRlbTxUPltdO1xuXG4gICAgZ2V0IGl0ZW1zUmVvcmRlcmVkKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrZWRJdGVtcy5tYXAoaXRlbSA9PiBpdGVtLml0ZW0pO1xuICAgIH1cblxuICAgIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLm11dGF0aW9uRGV0ZWN0ZWQuYmluZCh0aGlzKSk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBnZXQgZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kZGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyQ2hpbGRyZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoICE9PSB0aGlzLmVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBtYXRjaCBpdGVtIGxpc3QgdG8gY2hpbGRyZW4gbGlzdCAtIGRyYWcgYm94IGNvbnRhaW5zICR7dGhpcy5pdGVtcy5sZW5ndGh9IGl0ZW1zLCBidXQgaGFzICR7dGhpcy5lbGVtZW50LmNoaWxkcmVuLmxlbmd0aH0gZWxlbWVudHNgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyYWNrZWRJdGVtcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNoaWxkKHRoaXMuZWxlbWVudC5jaGlsZHJlbltpXSBhcyBIVE1MRWxlbWVudCwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlckNoaWxkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IFtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdkcmFnc3RhcnQnLCB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcykpLFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudCwgJ2Ryb3AnLCB0aGlzLm9uRHJhZ0ZpbmlzaC5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdkcmFnZW5kJywgdGhpcy5vbkRyYWdTdG9wLmJpbmQodGhpcykpXG4gICAgICAgIF07XG4gICAgICAgIGVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kZGVzdHJveS5zdWJzY3JpYmUoKCkgPT4gbGlzdGVuZXJzLmZvckVhY2goY2IgPT4gY2IoKSkpO1xuICAgICAgICB0aGlzLnRyYWNrZWRJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbXNbaW5kZXhdLFxuICAgICAgICAgICAgZWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtdXRhdGlvbkRldGVjdGVkKG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXSkge1xuICAgICAgICBpZiAodGhpcy5waWNrZWRVcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFkZGVkTm9kZXMgPSBuZXcgU2V0PEhUTUxFbGVtZW50PigpO1xuICAgICAgICBjb25zdCByZW1vdmVkTm9kZXMgPSBuZXcgU2V0PEhUTUxFbGVtZW50PigpO1xuICAgICAgICBmb3IgKGxldCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIG11dGF0aW9uLmFkZGVkTm9kZXMuZm9yRWFjaCgoYTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlbW92ZWROb2Rlcy5kZWxldGUoYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkZWROb2Rlcy5hZGQoYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtdXRhdGlvbi5yZW1vdmVkTm9kZXMuZm9yRWFjaCgoYTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWFkZGVkTm9kZXMuZGVsZXRlKGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZWROb2Rlcy5hZGQoYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbCh0aGlzLmVsZW1lbnQuY2hpbGRyZW4sIG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNoaWxkKG5vZGUsIGlkeCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocmVtb3ZlZE5vZGVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrZWRJdGVtcyA9IHRoaXMudHJhY2tlZEl0ZW1zLmZpbHRlcihcbiAgICAgICAgICAgICAgICBpdGVtID0+ICFyZW1vdmVkTm9kZXMuaGFzKGl0ZW0uZWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFBlci1pdGVtIGxpc3RlbmVycyAqL1xuXG4gICAgb25EcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5zaG91bGRCbG9ja0RyYWdTdGFydChldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YVRyYW5zZmVyID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgICAgICAvLyBQcmVzZW50IGEgbmF0aXZlICdtb3ZlIGl0ZW0nIGVmZmVjdFxuICAgICAgICBkYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgICAgdGhpcy5waWNrZWRVcCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2F2ZWRPcmRlciA9IFsuLi50aGlzLnRyYWNrZWRJdGVtc107XG4gICAgfVxuXG4gICAgLy8gRXF1aXZhbGVudCBvZiBcImZpbmFsbHlcIiAtIHRoaXMgcnVucyB3aGV0aGVyIG9yIG5vdCB0aGUgZHJhZyBmaW5pc2hlZCBvbiBhIHZhbGlkIGVuZGluZyBsb2NhdGlvblxuICAgIG9uRHJhZ1N0b3AoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBpY2tlZFVwID0gbnVsbDtcbiAgICAgICAgdGhpcy5zYXZlZE9yZGVyID0gbnVsbDtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25EcmFnRmluaXNoKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICghdGhpcy5lbGVtZW50LmNvbnRhaW5zKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIGZvciBhIGRpZmZlcmVudCBkcmFnIHJlZ2lvbiAtIGlnbm9yZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRyYWdnZWRJdGVtID0gdGhpcy50cmFja2VkSXRlbXMuZmluZChpdGVtID0+IGl0ZW0uZWxlbWVudCA9PT0gdGhpcy5waWNrZWRVcCk/Lml0ZW07XG4gICAgICAgIHRoaXMudHJhY2tlZEl0ZW1zID0gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHRoaXMuZWxlbWVudC5jaGlsZHJlbiwgY2hpbGQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMudHJhY2tlZEl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmVsZW1lbnQgPT09IGNoaWxkKTtcbiAgICAgICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHJhZ0Ryb3A6IEVycm9yIC0gY291bGQgbm90IHJlYXNzb2NpYXRlIGFuIGl0ZW0gcG9zdC1kcmFnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm92b0RyYWdEcm9wRmluaXNoLmVtaXQoe1xuICAgICAgICAgICAgZHJhZ2dlZEl0ZW0sXG4gICAgICAgICAgICBhbGxJdGVtczogdGhpcy5pdGVtc1Jlb3JkZXJlZCxcbiAgICAgICAgICAgIGV2ZW50XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgLyoqIC0gZW5kIHBlci1pdGVtIGxpc3RlbmVycyAqL1xuXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OmRyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgICBvbkRyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnBpY2tlZFVwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbiBzb21lIGNhc2VzIChtYXliZSBicm93c2VyLXNwZWNpZmljKSB3ZSBtYXkgaGF2ZSB0aGlzIGV2ZW50IHJlcG9ydGVkIGZyb20gYSBzdWItZWxlbWVudCBvZiBhIGRyYWcgZGVzdGluYXRpb24uXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZ28gdXB3YXJkcyBpbiB0aGUgdHJlZSB0byBmaW5kIHRoZSBhY3R1YWwgdGFyZ2V0XG4gICAgICAgIGlmICh0YXJnZXQgJiYgIXRhcmdldC5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuZmluZERyYWdnYWJsZVBhcmVudE9mRWxlbWVudCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIGlmIHRoaXMgZHJhZyBldmVudCBpcyB3aXRoaW4gdGhpcyBkcmFnIGJveFxuICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5wYXJlbnRFbGVtZW50ID09PSB0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXBwbHlUZW1wU29ydCh0aGlzLnBpY2tlZFVwLCB0YXJnZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgbm90IHdpdGhpbiB0aGlzIGRyYWcgYm94LCB0aGVuIG1vdmUgdGhpcyBpdGVtIGJhY2sgdG8gaXRzIG9yaWdpbmFsIHBvc2l0aW9uIGFuZCBzaG93IGEgZGlhYmxlZCBkcmFnIGVmZmVjdFxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZXNldFNvcnRpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmluZERyYWdnYWJsZVBhcmVudE9mRWxlbWVudCh0YXJnZXQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmVudEVsZW1lbnQuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50RWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmREcmFnZ2FibGVQYXJlbnRPZkVsZW1lbnQocGFyZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5VGVtcFNvcnQoc2hvd1hFbGVtZW50OiBIVE1MRWxlbWVudCwgaW5QbGFjZU9mWTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHNob3dYRWxlbWVudCA9PT0gaW5QbGFjZU9mWSkge1xuICAgICAgICAgICAgLy8gc2FtZSBlbGVtZW50IC0gaWdub3JpbmdcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBcHBseSB0aGUgXCJwcmV2aWV3XCIgZWZmZWN0IGZyb20gZHJhZ2dpbmcgb25lIGl0ZW0gdG8gYW5vdGhlclxuICAgICAgICBjb25zdCBhSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLCBzaG93WEVsZW1lbnQpO1xuICAgICAgICBjb25zdCBiSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLCBpblBsYWNlT2ZZKTtcbiAgICAgICAgY29uc3QgZGlmZiA9IGJJbmRleCAtIGFJbmRleDtcbiAgICAgICAgbGV0IGluc2VydFBvc2l0aW9uOiBJbnNlcnRQb3NpdGlvbjtcbiAgICAgICAgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgICAgICBpbnNlcnRQb3NpdGlvbiA9ICdhZnRlcmVuZCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIGluc2VydFBvc2l0aW9uID0gJ2JlZm9yZWJlZ2luJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHJhZ0Ryb3A6IFR3byBlbGVtZW50cyBhcmUgaW4gdGhlIHNhbWUgcG9zaXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpblBsYWNlT2ZZLmluc2VydEFkamFjZW50RWxlbWVudChpbnNlcnRQb3NpdGlvbiwgc2hvd1hFbGVtZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0U29ydGluZygpOiB2b2lkIHtcbiAgICAgICAgLy8gcmV0dXJuIHRvIHRoZSBvcmRlciBvZiBlbGVtZW50cyBmcm9tIHRoZSBsYXN0IHRpbWUgd2UgY2FsbGVkIG9uRHJhZ1BpY2t1cFxuICAgICAgICBpZiAoIXRoaXMuc2F2ZWRPcmRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEcmFnRHJvcDogQ2Fubm90IHJlc2V0IHNvcnRpbmcgd2l0aCBubyBzYXZlZCBvcmRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveEVsZW0gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib3hFbGVtLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gYm94RWxlbS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNhdmVkT3JkZXJbaV0uZWxlbWVudCAhPT0gaXRlbSAmJiBpID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWRPcmRlcltpIC0gMV0uZWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgdGhpcy5zYXZlZE9yZGVyW2ldLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHVzZXIgaGFzIHByb3ZpZGVkIGNsYXNzZXMgaW5kaWNhdGluZyB0aGV5IG9ubHkgd2FudCBhIGNlcnRhaW4gcmVnaW9uIHRvIGJlIGRyYWdnYWJsZSwgaWdub3JlXG4gICAgLy8gdGhpcyBkcmFnIGV2ZW50IGlmIGl0IGlzIG91dHNpZGUgb2YgdGhlcmUuXG4gICAgcHJpdmF0ZSBzaG91bGRCbG9ja0RyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGRyYWdUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIC8vIFRPRE86IEFsbG93IGZvciBtdWx0aXBsZSBkcmFnIHRhcmdldHMsIGFuZCBkcmFnIGV4Y2x1c2lvbiB0YXJnZXRzXG4gICAgICAgIGNvbnN0IHVzZXJEcmFnVGFyZ2V0ID0gZHJhZ1RhcmdldC5xdWVyeVNlbGVjdG9yKCcubm92by1kcmFnLXRhcmdldCcpO1xuICAgICAgICBpZiAodXNlckRyYWdUYXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc0VsZW1lbnRXaXRoaW5FdmVudEJvdW5kcyh1c2VyRHJhZ1RhcmdldCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzRWxlbWVudFdpdGhpbkV2ZW50Qm91bmRzKGVsZW1lbnQ6IEVsZW1lbnQsIGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGlzSW5zaWRlID0gZXZlbnQuY2xpZW50WCA+IHJlY3QubGVmdCAmJiBldmVudC5jbGllbnRYIDwgcmVjdC5yaWdodCAmJlxuICAgICAgICAgICAgZXZlbnQuY2xpZW50WSA8IHJlY3QuYm90dG9tICYmIGV2ZW50LmNsaWVudFkgPiByZWN0LnRvcDtcbiAgICAgICAgcmV0dXJuIGlzSW5zaWRlO1xuICAgIH1cbn0iXX0=