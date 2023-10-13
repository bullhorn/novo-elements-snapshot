import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, HostListener, NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';

class NovoDragBoxParent {
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

class NovoDragDropModule {
}
NovoDragDropModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDragDropModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDragDropModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDragDropModule, declarations: [NovoDragBoxParent], exports: [NovoDragBoxParent] });
NovoDragDropModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDragDropModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDragDropModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NovoDragBoxParent],
                    exports: [NovoDragBoxParent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoDragBoxParent, NovoDragDropModule };
//# sourceMappingURL=novo-elements-elements-drag-drop.mjs.map
