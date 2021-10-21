// NG2
import { Directive, ElementRef, Input } from '@angular/core';
// Vendor
import * as dragulaImported from '@bullhorn/dragula';
// APP
import { NovoDragulaService } from './DragulaService';
import * as i0 from "@angular/core";
import * as i1 from "./DragulaService";
const dragula = dragulaImported;
export class NovoDragulaElement {
    constructor(element, dragulaService) {
        this.dragulaService = dragulaService;
        this.drake = null;
        this.container = element.nativeElement;
    }
    ngOnInit() {
        const bag = this.dragulaService.find(this.bag);
        if (bag) {
            this.drake = bag.drake;
            this.checkModel();
            this.drake.containers.push(this.container);
        }
        else {
            this.drake = dragula({
                containers: [this.container],
            });
            this.checkModel();
            this.dragulaService.add(this.bag, this.drake);
        }
    }
    checkModel() {
        if (this.dragulaModel) {
            if (this.drake.models) {
                this.drake.models.push(this.dragulaModel);
            }
            else {
                this.drake.models = [this.dragulaModel];
            }
        }
    }
    ngOnChanges(changes) {
        if (changes && changes.dragulaModel) {
            if (this.drake) {
                if (this.drake.models) {
                    const modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
                    this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
                }
                else {
                    this.drake.models = [changes.dragulaModel.currentValue];
                }
            }
        }
    }
}
NovoDragulaElement.ɵfac = function NovoDragulaElement_Factory(t) { return new (t || NovoDragulaElement)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NovoDragulaService)); };
NovoDragulaElement.ɵdir = i0.ɵɵdefineDirective({ type: NovoDragulaElement, selectors: [["", "dragula", ""]], inputs: { bag: ["dragula", "bag"], dragulaModel: "dragulaModel" }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDragulaElement, [{
        type: Directive,
        args: [{
                selector: '[dragula]',
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.NovoDragulaService }]; }, { bag: [{
            type: Input,
            args: ['dragula']
        }], dragulaModel: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZ3VsYS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kcmFndWxhL0RyYWd1bGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDaEYsU0FBUztBQUNULE9BQU8sS0FBSyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsTUFBTTtBQUNOLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7QUFDdEQsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDO0FBS2hDLE1BQU0sT0FBTyxrQkFBa0I7SUFRN0IsWUFBWSxPQUFtQixFQUFVLGNBQWtDO1FBQWxDLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUgzRSxVQUFLLEdBQVEsSUFBSSxDQUFDO1FBSWhCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQyxJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7Z0JBQ25CLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDN0IsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6QztTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFPO1FBQ2pCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNqRixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM1RTtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3pEO2FBQ0Y7U0FDRjtJQUNILENBQUM7O29GQWpEVSxrQkFBa0I7dURBQWxCLGtCQUFrQjtrREFBbEIsa0JBQWtCO2NBSDlCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsV0FBVzthQUN0Qjs4RkFHQyxHQUFHO2tCQURGLEtBQUs7bUJBQUMsU0FBUztZQUdoQixZQUFZO2tCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBWZW5kb3JcbmltcG9ydCAqIGFzIGRyYWd1bGFJbXBvcnRlZCBmcm9tICdAYnVsbGhvcm4vZHJhZ3VsYSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJy4vRHJhZ3VsYVNlcnZpY2UnO1xuY29uc3QgZHJhZ3VsYSA9IGRyYWd1bGFJbXBvcnRlZDtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RyYWd1bGFdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RyYWd1bGFFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoJ2RyYWd1bGEnKVxuICBiYWc6IGFueTtcbiAgQElucHV0KClcbiAgZHJhZ3VsYU1vZGVsOiBhbnk7XG4gIGRyYWtlOiBhbnkgPSBudWxsO1xuICBjb250YWluZXI6IGFueTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGRyYWd1bGFTZXJ2aWNlOiBOb3ZvRHJhZ3VsYVNlcnZpY2UpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGJhZyA9IHRoaXMuZHJhZ3VsYVNlcnZpY2UuZmluZCh0aGlzLmJhZyk7XG5cbiAgICBpZiAoYmFnKSB7XG4gICAgICB0aGlzLmRyYWtlID0gYmFnLmRyYWtlO1xuICAgICAgdGhpcy5jaGVja01vZGVsKCk7XG4gICAgICB0aGlzLmRyYWtlLmNvbnRhaW5lcnMucHVzaCh0aGlzLmNvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJha2UgPSBkcmFndWxhKHtcbiAgICAgICAgY29udGFpbmVyczogW3RoaXMuY29udGFpbmVyXSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jaGVja01vZGVsKCk7XG4gICAgICB0aGlzLmRyYWd1bGFTZXJ2aWNlLmFkZCh0aGlzLmJhZywgdGhpcy5kcmFrZSk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tNb2RlbCgpIHtcbiAgICBpZiAodGhpcy5kcmFndWxhTW9kZWwpIHtcbiAgICAgIGlmICh0aGlzLmRyYWtlLm1vZGVscykge1xuICAgICAgICB0aGlzLmRyYWtlLm1vZGVscy5wdXNoKHRoaXMuZHJhZ3VsYU1vZGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZHJha2UubW9kZWxzID0gW3RoaXMuZHJhZ3VsYU1vZGVsXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMgJiYgY2hhbmdlcy5kcmFndWxhTW9kZWwpIHtcbiAgICAgIGlmICh0aGlzLmRyYWtlKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWtlLm1vZGVscykge1xuICAgICAgICAgIGNvbnN0IG1vZGVsSW5kZXggPSB0aGlzLmRyYWtlLm1vZGVscy5pbmRleE9mKGNoYW5nZXMuZHJhZ3VsYU1vZGVsLnByZXZpb3VzVmFsdWUpO1xuICAgICAgICAgIHRoaXMuZHJha2UubW9kZWxzLnNwbGljZShtb2RlbEluZGV4LCAxLCBjaGFuZ2VzLmRyYWd1bGFNb2RlbC5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZHJha2UubW9kZWxzID0gW2NoYW5nZXMuZHJhZ3VsYU1vZGVsLmN1cnJlbnRWYWx1ZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==