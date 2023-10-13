import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
export class NovoDragBoxParent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.$destroy = new ReplaySubject(1);
        this.novoDragDropFinish = new EventEmitter();
        this.mutationObserver = new MutationObserver(this.mutationDetected.bind(this));
    }
    get itemsReordered() {
        return this.trackedItems.map(item => item.item);
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
            this.renderer.listen(element, 'dragstart', this.onDragPickup.bind(this)),
            this.renderer.listen(element, 'drop', this.onDragFinish.bind(this)),
            this.renderer.listen(element, 'dragover', this.onDragOver.bind(this)),
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
    onDragPickup(event) {
        if (this.shouldBlockDragStart(event)) {
            event.preventDefault();
            return;
        }
        const dataTransfer = event.dataTransfer;
        // Present a native 'move item' effect
        dataTransfer.effectAllowed = 'move';
        this.pickedUp = event.target;
        this.savedOrder = [...this.trackedItems];
    }
    onDragOver(event) {
        // If this element doesn't containt the target, then this is for a different drag region - ignore
        event.preventDefault();
        if (!this.pickedUp) {
            event.dataTransfer.dropEffect = 'none';
            // Received dragover event when no object was picked up. This may be targeting another region
            return;
        }
        event.dataTransfer.dropEffect = 'move';
        this.applyTempSort(this.pickedUp, event.currentTarget);
    }
    // Equivalent of "finally" - this runs whether or not the drag finished on a valid ending location
    onDragStop(event) {
        this.pickedUp = null;
        this.savedOrder = null;
    }
    onDragFinish(event) {
        event.preventDefault();
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
    onDragContinuous(event) {
        if (!this.isElementWithinEventBounds(this.element, event)) {
            // The user's mouse has exited the bounds of the draggable container - reset to the last saved state
            event.dataTransfer.dropEffect = 'none';
            this.resetSorting();
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
NovoDragBoxParent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDragBoxParent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NovoDragBoxParent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDragBoxParent, selector: "[novoDragDrop]", inputs: { items: ["novoDragDrop", "items"] }, outputs: { novoDragDropFinish: "novoDragDropFinish" }, host: { listeners: { "drag": "onDragContinuous($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDragBoxParent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoDragDrop]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { items: [{
                type: Input,
                args: ['novoDragDrop']
            }], novoDragDropFinish: [{
                type: Output
            }], onDragContinuous: [{
                type: HostListener,
                args: ['drag', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLWJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RyYWctZHJvcC9kcmFnLWRyb3AtYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RJLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBZ0JyQyxNQUFNLE9BQU8saUJBQWlCO0lBbUIxQixZQUFvQixVQUFzQixFQUFVLFFBQW1CO1FBQW5ELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBZHZFLGFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBTyxDQUFDLENBQUMsQ0FBQztRQUk1Qix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBMEIsQ0FBQztRQVExRSxxQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVDLENBQUM7SUFONUUsSUFBSSxjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBTUQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN6QyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVB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QUFLLENBQUMsQ0FBQztTQUNsRTtJQUNMLENBQUM7SUFFTSwwQkFBMEIsQ0FBQyxPQUFnQixFQUFFLEtBQWdCO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLO1lBQ3BFLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDNUQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQzs7K0dBNU1RLGlCQUFpQjttR0FBakIsaUJBQWlCOzRGQUFqQixpQkFBaUI7a0JBSDdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtpQkFDN0I7eUhBUTBCLEtBQUs7c0JBQTNCLEtBQUs7dUJBQUMsY0FBYztnQkFFWCxrQkFBa0I7c0JBQTNCLE1BQU07Z0JBeUlQLGdCQUFnQjtzQkFEZixZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b0RyYWdGaW5pc2hFdmVudDxUPiB7XG4gICAgZHJhZ2dlZEl0ZW06IFQ7XG4gICAgYWxsSXRlbXM6IFRbXTtcbiAgICBldmVudDogRHJhZ0V2ZW50O1xufVxuXG5pbnRlcmZhY2UgTm92b0RyYWdJdGVtPFQ+IHtcbiAgICBpdGVtOiBUO1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tub3ZvRHJhZ0Ryb3BdJ1xufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHJhZ0JveFBhcmVudDxUPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBwaWNrZWRVcD86IEhUTUxFbGVtZW50O1xuICAgIHNhdmVkT3JkZXI/OiBOb3ZvRHJhZ0l0ZW08VD5bXTtcblxuICAgICRkZXN0cm95ID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oMSk7XG5cbiAgICBASW5wdXQoJ25vdm9EcmFnRHJvcCcpIGl0ZW1zOiBUW107XG5cbiAgICBAT3V0cHV0KCkgbm92b0RyYWdEcm9wRmluaXNoID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvRHJhZ0ZpbmlzaEV2ZW50PFQ+PigpO1xuXG4gICAgcHJpdmF0ZSB0cmFja2VkSXRlbXM6IE5vdm9EcmFnSXRlbTxUPltdO1xuXG4gICAgZ2V0IGl0ZW1zUmVvcmRlcmVkKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWNrZWRJdGVtcy5tYXAoaXRlbSA9PiBpdGVtLml0ZW0pO1xuICAgIH1cblxuICAgIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLm11dGF0aW9uRGV0ZWN0ZWQuYmluZCh0aGlzKSk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBnZXQgZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kZGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyQ2hpbGRyZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoICE9PSB0aGlzLmVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBtYXRjaCBpdGVtIGxpc3QgdG8gY2hpbGRyZW4gbGlzdCAtIGRyYWcgYm94IGNvbnRhaW5zICR7dGhpcy5pdGVtcy5sZW5ndGh9IGl0ZW1zLCBidXQgaGFzICR7dGhpcy5lbGVtZW50LmNoaWxkcmVuLmxlbmd0aH0gZWxlbWVudHNgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyYWNrZWRJdGVtcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNoaWxkKHRoaXMuZWxlbWVudC5jaGlsZHJlbltpXSBhcyBIVE1MRWxlbWVudCwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlckNoaWxkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IFtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdkcmFnc3RhcnQnLCB0aGlzLm9uRHJhZ1BpY2t1cC5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdkcm9wJywgdGhpcy5vbkRyYWdGaW5pc2guYmluZCh0aGlzKSksXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCAnZHJhZ292ZXInLCB0aGlzLm9uRHJhZ092ZXIuYmluZCh0aGlzKSksXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCAnZHJhZ2VuZCcsIHRoaXMub25EcmFnU3RvcC5iaW5kKHRoaXMpKVxuICAgICAgICBdO1xuICAgICAgICBlbGVtZW50LmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kuc3Vic2NyaWJlKCgpID0+IGxpc3RlbmVycy5mb3JFYWNoKGNiID0+IGNiKCkpKTtcbiAgICAgICAgdGhpcy50cmFja2VkSXRlbXMucHVzaCh7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1zW2luZGV4XSxcbiAgICAgICAgICAgIGVsZW1lbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbXV0YXRpb25EZXRlY3RlZChtdXRhdGlvbnM6IE11dGF0aW9uUmVjb3JkW10pIHtcbiAgICAgICAgaWYgKHRoaXMucGlja2VkVXApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhZGRlZE5vZGVzID0gbmV3IFNldDxIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlZE5vZGVzID0gbmV3IFNldDxIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgZm9yIChsZXQgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goKGE6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZW1vdmVkTm9kZXMuZGVsZXRlKGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZXMuYWRkKGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmZvckVhY2goKGE6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFhZGRlZE5vZGVzLmRlbGV0ZShhKSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVkTm9kZXMuYWRkKGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGFkZGVkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcy5lbGVtZW50LmNoaWxkcmVuLCBub2RlKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDaGlsZChub2RlLCBpZHgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHJlbW92ZWROb2Rlcy5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy50cmFja2VkSXRlbXMgPSB0aGlzLnRyYWNrZWRJdGVtcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgaXRlbSA9PiAhcmVtb3ZlZE5vZGVzLmhhcyhpdGVtLmVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBQZXItaXRlbSBsaXN0ZW5lcnMgKi9cblxuICAgIG9uRHJhZ1BpY2t1cChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZEJsb2NrRHJhZ1N0YXJ0KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhVHJhbnNmZXIgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgICAgIC8vIFByZXNlbnQgYSBuYXRpdmUgJ21vdmUgaXRlbScgZWZmZWN0XG4gICAgICAgIGRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICB0aGlzLnBpY2tlZFVwID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICB0aGlzLnNhdmVkT3JkZXIgPSBbLi4udGhpcy50cmFja2VkSXRlbXNdO1xuICAgIH1cblxuICAgIG9uRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICAvLyBJZiB0aGlzIGVsZW1lbnQgZG9lc24ndCBjb250YWludCB0aGUgdGFyZ2V0LCB0aGVuIHRoaXMgaXMgZm9yIGEgZGlmZmVyZW50IGRyYWcgcmVnaW9uIC0gaWdub3JlXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICghdGhpcy5waWNrZWRVcCkge1xuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbm9uZSc7XG4gICAgICAgICAgICAvLyBSZWNlaXZlZCBkcmFnb3ZlciBldmVudCB3aGVuIG5vIG9iamVjdCB3YXMgcGlja2VkIHVwLiBUaGlzIG1heSBiZSB0YXJnZXRpbmcgYW5vdGhlciByZWdpb25cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgICAgdGhpcy5hcHBseVRlbXBTb3J0KHRoaXMucGlja2VkVXAsIGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIEVxdWl2YWxlbnQgb2YgXCJmaW5hbGx5XCIgLSB0aGlzIHJ1bnMgd2hldGhlciBvciBub3QgdGhlIGRyYWcgZmluaXNoZWQgb24gYSB2YWxpZCBlbmRpbmcgbG9jYXRpb25cbiAgICBvbkRyYWdTdG9wKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5waWNrZWRVcCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2F2ZWRPcmRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgb25EcmFnRmluaXNoKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQuY29udGFpbnMoZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgZm9yIGEgZGlmZmVyZW50IGRyYWcgcmVnaW9uIC0gaWdub3JlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZHJhZ2dlZEl0ZW0gPSB0aGlzLnRyYWNrZWRJdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5lbGVtZW50ID09PSB0aGlzLnBpY2tlZFVwKT8uaXRlbTtcbiAgICAgICAgdGhpcy50cmFja2VkSXRlbXMgPSBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwodGhpcy5lbGVtZW50LmNoaWxkcmVuLCBjaGlsZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy50cmFja2VkSXRlbXMuZmluZChpdGVtID0+IGl0ZW0uZWxlbWVudCA9PT0gY2hpbGQpO1xuICAgICAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEcmFnRHJvcDogRXJyb3IgLSBjb3VsZCBub3QgcmVhc3NvY2lhdGUgYW4gaXRlbSBwb3N0LWRyYWcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub3ZvRHJhZ0Ryb3BGaW5pc2guZW1pdCh7XG4gICAgICAgICAgICBkcmFnZ2VkSXRlbSxcbiAgICAgICAgICAgIGFsbEl0ZW1zOiB0aGlzLml0ZW1zUmVvcmRlcmVkLFxuICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICAvKiogLSBlbmQgcGVyLWl0ZW0gbGlzdGVuZXJzICovXG5cbiAgICBASG9zdExpc3RlbmVyKCdkcmFnJywgWyckZXZlbnQnXSlcbiAgICBvbkRyYWdDb250aW51b3VzKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRWxlbWVudFdpdGhpbkV2ZW50Qm91bmRzKHRoaXMuZWxlbWVudCwgZXZlbnQpKSB7XG4gICAgICAgICAgICAvLyBUaGUgdXNlcidzIG1vdXNlIGhhcyBleGl0ZWQgdGhlIGJvdW5kcyBvZiB0aGUgZHJhZ2dhYmxlIGNvbnRhaW5lciAtIHJlc2V0IHRvIHRoZSBsYXN0IHNhdmVkIHN0YXRlXG4gICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMucmVzZXRTb3J0aW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5VGVtcFNvcnQoc2hvd1hFbGVtZW50OiBIVE1MRWxlbWVudCwgaW5QbGFjZU9mWTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHNob3dYRWxlbWVudCA9PT0gaW5QbGFjZU9mWSkge1xuICAgICAgICAgICAgLy8gc2FtZSBlbGVtZW50IC0gaWdub3JpbmdcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBcHBseSB0aGUgXCJwcmV2aWV3XCIgZWZmZWN0IGZyb20gZHJhZ2dpbmcgb25lIGl0ZW0gdG8gYW5vdGhlclxuICAgICAgICBjb25zdCBhSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLCBzaG93WEVsZW1lbnQpO1xuICAgICAgICBjb25zdCBiSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLCBpblBsYWNlT2ZZKTtcbiAgICAgICAgY29uc3QgZGlmZiA9IGJJbmRleCAtIGFJbmRleDtcbiAgICAgICAgbGV0IGluc2VydFBvc2l0aW9uOiBJbnNlcnRQb3NpdGlvbjtcbiAgICAgICAgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgICAgICBpbnNlcnRQb3NpdGlvbiA9ICdhZnRlcmVuZCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIGluc2VydFBvc2l0aW9uID0gJ2JlZm9yZWJlZ2luJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHJhZ0Ryb3A6IFR3byBlbGVtZW50cyBhcmUgaW4gdGhlIHNhbWUgcG9zaXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpblBsYWNlT2ZZLmluc2VydEFkamFjZW50RWxlbWVudChpbnNlcnRQb3NpdGlvbiwgc2hvd1hFbGVtZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0U29ydGluZygpOiB2b2lkIHtcbiAgICAgICAgLy8gcmV0dXJuIHRvIHRoZSBvcmRlciBvZiBlbGVtZW50cyBmcm9tIHRoZSBsYXN0IHRpbWUgd2UgY2FsbGVkIG9uRHJhZ1BpY2t1cFxuICAgICAgICBpZiAoIXRoaXMuc2F2ZWRPcmRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEcmFnRHJvcDogQ2Fubm90IHJlc2V0IHNvcnRpbmcgd2l0aCBubyBzYXZlZCBvcmRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveEVsZW0gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib3hFbGVtLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gYm94RWxlbS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNhdmVkT3JkZXJbaV0uZWxlbWVudCAhPT0gaXRlbSAmJiBpID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWRPcmRlcltpIC0gMV0uZWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgdGhpcy5zYXZlZE9yZGVyW2ldLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHVzZXIgaGFzIHByb3ZpZGVkIGNsYXNzZXMgaW5kaWNhdGluZyB0aGV5IG9ubHkgd2FudCBhIGNlcnRhaW4gcmVnaW9uIHRvIGJlIGRyYWdnYWJsZSwgaWdub3JlXG4gICAgLy8gdGhpcyBkcmFnIGV2ZW50IGlmIGl0IGlzIG91dHNpZGUgb2YgdGhlcmUuXG4gICAgcHJpdmF0ZSBzaG91bGRCbG9ja0RyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGRyYWdUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIC8vIFRPRE86IEFsbG93IGZvciBtdWx0aXBsZSBkcmFnIHRhcmdldHMsIGFuZCBkcmFnIGV4Y2x1c2lvbiB0YXJnZXRzXG4gICAgICAgIGNvbnN0IHVzZXJEcmFnVGFyZ2V0ID0gZHJhZ1RhcmdldC5xdWVyeVNlbGVjdG9yKCcubm92by1kcmFnLXRhcmdldCcpO1xuICAgICAgICBpZiAodXNlckRyYWdUYXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc0VsZW1lbnRXaXRoaW5FdmVudEJvdW5kcyh1c2VyRHJhZ1RhcmdldCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzRWxlbWVudFdpdGhpbkV2ZW50Qm91bmRzKGVsZW1lbnQ6IEVsZW1lbnQsIGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGlzSW5zaWRlID0gZXZlbnQuY2xpZW50WCA+IHJlY3QubGVmdCAmJiBldmVudC5jbGllbnRYIDwgcmVjdC5yaWdodCAmJlxuICAgICAgICAgICAgZXZlbnQuY2xpZW50WSA8IHJlY3QuYm90dG9tICYmIGV2ZW50LmNsaWVudFkgPiByZWN0LnRvcDtcbiAgICAgICAgcmV0dXJuIGlzSW5zaWRlO1xuICAgIH1cbn0iXX0=