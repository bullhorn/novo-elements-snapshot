// NG2
import { Directive, ElementRef, Input } from '@angular/core';
// Vendor
import dragula from '@bullhorn/dragula';
// APP
import { notify } from 'novo-elements/utils';
import { NovoDragulaService } from './DragulaService';
import * as i0 from "@angular/core";
import * as i1 from "./DragulaService";
/**
* @deprecated since v8.0.0 - slated for deletion.
*
* Moving away from all CommonJS dependencies to improve tree-shaking.
*
* Please look at built-in ng or third party drag-drop libraries like
* angular-draggable-droppable, ngx-drag-drop, ngx-sortablejs, ng2-dragula.
*/
export class NovoDragulaElement {
    constructor(element, dragulaService) {
        this.dragulaService = dragulaService;
        this.drake = null;
        notify('[dragula] has been deprecated - please look at built-in ng or third party drag-drop libraries instead');
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
NovoDragulaElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDragulaElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoDragulaService }], target: i0.ɵɵFactoryTarget.Directive });
NovoDragulaElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDragulaElement, selector: "[dragula]", inputs: { bag: ["dragula", "bag"], dragulaModel: "dragulaModel" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDragulaElement, decorators: [{
            type: Directive,
            args: [{
                    selector: '[dragula]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoDragulaService }]; }, propDecorators: { bag: [{
                type: Input,
                args: ['dragula']
            }], dragulaModel: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZ3VsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RyYWd1bGEvRHJhZ3VsYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRixTQUFTO0FBQ1QsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsTUFBTTtBQUNOLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBRXREOzs7Ozs7O0VBT0U7QUFJRixNQUFNLE9BQU8sa0JBQWtCO0lBUTdCLFlBQVksT0FBbUIsRUFBVSxjQUFrQztRQUFsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFIM0UsVUFBSyxHQUFRLElBQUksQ0FBQztRQUloQixNQUFNLENBQUMsdUdBQXVHLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDekMsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFL0MsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO2dCQUNuQixVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQzdCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekM7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBTztRQUNqQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNyQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDNUU7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUN6RDthQUNGO1NBQ0Y7SUFDSCxDQUFDOztnSEFsRFUsa0JBQWtCO29HQUFsQixrQkFBa0I7NEZBQWxCLGtCQUFrQjtrQkFIOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztpQkFDdEI7a0lBR0MsR0FBRztzQkFERixLQUFLO3VCQUFDLFNBQVM7Z0JBR2hCLFlBQVk7c0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIFZlbmRvclxuaW1wb3J0IGRyYWd1bGEgZnJvbSAnQGJ1bGxob3JuL2RyYWd1bGEnO1xuLy8gQVBQXG5pbXBvcnQgeyBub3RpZnkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJy4vRHJhZ3VsYVNlcnZpY2UnO1xuXG4vKipcbiogQGRlcHJlY2F0ZWQgc2luY2UgdjguMC4wIC0gc2xhdGVkIGZvciBkZWxldGlvbi5cbipcbiogTW92aW5nIGF3YXkgZnJvbSBhbGwgQ29tbW9uSlMgZGVwZW5kZW5jaWVzIHRvIGltcHJvdmUgdHJlZS1zaGFraW5nLlxuKlxuKiBQbGVhc2UgbG9vayBhdCBidWlsdC1pbiBuZyBvciB0aGlyZCBwYXJ0eSBkcmFnLWRyb3AgbGlicmFyaWVzIGxpa2VcbiogYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlLCBuZ3gtZHJhZy1kcm9wLCBuZ3gtc29ydGFibGVqcywgbmcyLWRyYWd1bGEuXG4qL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RyYWd1bGFdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RyYWd1bGFFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoJ2RyYWd1bGEnKVxuICBiYWc6IGFueTtcbiAgQElucHV0KClcbiAgZHJhZ3VsYU1vZGVsOiBhbnk7XG4gIGRyYWtlOiBhbnkgPSBudWxsO1xuICBjb250YWluZXI6IGFueTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGRyYWd1bGFTZXJ2aWNlOiBOb3ZvRHJhZ3VsYVNlcnZpY2UpIHtcbiAgICBub3RpZnkoJ1tkcmFndWxhXSBoYXMgYmVlbiBkZXByZWNhdGVkIC0gcGxlYXNlIGxvb2sgYXQgYnVpbHQtaW4gbmcgb3IgdGhpcmQgcGFydHkgZHJhZy1kcm9wIGxpYnJhcmllcyBpbnN0ZWFkJyk7XG4gICAgdGhpcy5jb250YWluZXIgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBiYWcgPSB0aGlzLmRyYWd1bGFTZXJ2aWNlLmZpbmQodGhpcy5iYWcpO1xuXG4gICAgaWYgKGJhZykge1xuICAgICAgdGhpcy5kcmFrZSA9IGJhZy5kcmFrZTtcbiAgICAgIHRoaXMuY2hlY2tNb2RlbCgpO1xuICAgICAgdGhpcy5kcmFrZS5jb250YWluZXJzLnB1c2godGhpcy5jb250YWluZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWtlID0gZHJhZ3VsYSh7XG4gICAgICAgIGNvbnRhaW5lcnM6IFt0aGlzLmNvbnRhaW5lcl0sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuY2hlY2tNb2RlbCgpO1xuICAgICAgdGhpcy5kcmFndWxhU2VydmljZS5hZGQodGhpcy5iYWcsIHRoaXMuZHJha2UpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrTW9kZWwoKSB7XG4gICAgaWYgKHRoaXMuZHJhZ3VsYU1vZGVsKSB7XG4gICAgICBpZiAodGhpcy5kcmFrZS5tb2RlbHMpIHtcbiAgICAgICAgdGhpcy5kcmFrZS5tb2RlbHMucHVzaCh0aGlzLmRyYWd1bGFNb2RlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyYWtlLm1vZGVscyA9IFt0aGlzLmRyYWd1bGFNb2RlbF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZHJhZ3VsYU1vZGVsKSB7XG4gICAgICBpZiAodGhpcy5kcmFrZSkge1xuICAgICAgICBpZiAodGhpcy5kcmFrZS5tb2RlbHMpIHtcbiAgICAgICAgICBjb25zdCBtb2RlbEluZGV4ID0gdGhpcy5kcmFrZS5tb2RlbHMuaW5kZXhPZihjaGFuZ2VzLmRyYWd1bGFNb2RlbC5wcmV2aW91c1ZhbHVlKTtcbiAgICAgICAgICB0aGlzLmRyYWtlLm1vZGVscy5zcGxpY2UobW9kZWxJbmRleCwgMSwgY2hhbmdlcy5kcmFndWxhTW9kZWwuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRyYWtlLm1vZGVscyA9IFtjaGFuZ2VzLmRyYWd1bGFNb2RlbC5jdXJyZW50VmFsdWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=