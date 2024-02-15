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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZ3VsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2FkZG9ucy9kcmFndWxhL0RyYWd1bGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDaEYsU0FBUztBQUNULE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hDLE1BQU07QUFDTixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7OztBQUV0RDs7Ozs7OztFQU9FO0FBSUYsTUFBTSxPQUFPLGtCQUFrQjtJQVE3QixZQUFZLE9BQW1CLEVBQVUsY0FBa0M7UUFBbEMsbUJBQWMsR0FBZCxjQUFjLENBQW9CO1FBSDNFLFVBQUssR0FBUSxJQUFJLENBQUM7UUFJaEIsTUFBTSxDQUFDLHVHQUF1RyxDQUFDLENBQUM7UUFDaEgsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9DLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFDbkIsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUM3QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0M7SUFDSCxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3pDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQU87UUFDakIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDckIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzVFO3FCQUFNO29CQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDekQ7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Z0hBbERVLGtCQUFrQjtvR0FBbEIsa0JBQWtCOzRGQUFsQixrQkFBa0I7a0JBSDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCO2tJQUdDLEdBQUc7c0JBREYsS0FBSzt1QkFBQyxTQUFTO2dCQUdoQixZQUFZO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBWZW5kb3JcbmltcG9ydCBkcmFndWxhIGZyb20gJ0BidWxsaG9ybi9kcmFndWxhJztcbi8vIEFQUFxuaW1wb3J0IHsgbm90aWZ5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBOb3ZvRHJhZ3VsYVNlcnZpY2UgfSBmcm9tICcuL0RyYWd1bGFTZXJ2aWNlJztcblxuLyoqXG4qIEBkZXByZWNhdGVkIHNpbmNlIHY4LjAuMCAtIHNsYXRlZCBmb3IgZGVsZXRpb24uXG4qXG4qIE1vdmluZyBhd2F5IGZyb20gYWxsIENvbW1vbkpTIGRlcGVuZGVuY2llcyB0byBpbXByb3ZlIHRyZWUtc2hha2luZy5cbipcbiogUGxlYXNlIGxvb2sgYXQgYnVpbHQtaW4gbmcgb3IgdGhpcmQgcGFydHkgZHJhZy1kcm9wIGxpYnJhcmllcyBsaWtlXG4qIGFuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSwgbmd4LWRyYWctZHJvcCwgbmd4LXNvcnRhYmxlanMsIG5nMi1kcmFndWxhLlxuKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkcmFndWxhXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EcmFndWxhRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCdkcmFndWxhJylcbiAgYmFnOiBhbnk7XG4gIEBJbnB1dCgpXG4gIGRyYWd1bGFNb2RlbDogYW55O1xuICBkcmFrZTogYW55ID0gbnVsbDtcbiAgY29udGFpbmVyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkcmFndWxhU2VydmljZTogTm92b0RyYWd1bGFTZXJ2aWNlKSB7XG4gICAgbm90aWZ5KCdbZHJhZ3VsYV0gaGFzIGJlZW4gZGVwcmVjYXRlZCAtIHBsZWFzZSBsb29rIGF0IGJ1aWx0LWluIG5nIG9yIHRoaXJkIHBhcnR5IGRyYWctZHJvcCBsaWJyYXJpZXMgaW5zdGVhZCcpO1xuICAgIHRoaXMuY29udGFpbmVyID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgYmFnID0gdGhpcy5kcmFndWxhU2VydmljZS5maW5kKHRoaXMuYmFnKTtcblxuICAgIGlmIChiYWcpIHtcbiAgICAgIHRoaXMuZHJha2UgPSBiYWcuZHJha2U7XG4gICAgICB0aGlzLmNoZWNrTW9kZWwoKTtcbiAgICAgIHRoaXMuZHJha2UuY29udGFpbmVycy5wdXNoKHRoaXMuY29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmFrZSA9IGRyYWd1bGEoe1xuICAgICAgICBjb250YWluZXJzOiBbdGhpcy5jb250YWluZXJdLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmNoZWNrTW9kZWwoKTtcbiAgICAgIHRoaXMuZHJhZ3VsYVNlcnZpY2UuYWRkKHRoaXMuYmFnLCB0aGlzLmRyYWtlKTtcbiAgICB9XG4gIH1cblxuICBjaGVja01vZGVsKCkge1xuICAgIGlmICh0aGlzLmRyYWd1bGFNb2RlbCkge1xuICAgICAgaWYgKHRoaXMuZHJha2UubW9kZWxzKSB7XG4gICAgICAgIHRoaXMuZHJha2UubW9kZWxzLnB1c2godGhpcy5kcmFndWxhTW9kZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kcmFrZS5tb2RlbHMgPSBbdGhpcy5kcmFndWxhTW9kZWxdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzLmRyYWd1bGFNb2RlbCkge1xuICAgICAgaWYgKHRoaXMuZHJha2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJha2UubW9kZWxzKSB7XG4gICAgICAgICAgY29uc3QgbW9kZWxJbmRleCA9IHRoaXMuZHJha2UubW9kZWxzLmluZGV4T2YoY2hhbmdlcy5kcmFndWxhTW9kZWwucHJldmlvdXNWYWx1ZSk7XG4gICAgICAgICAgdGhpcy5kcmFrZS5tb2RlbHMuc3BsaWNlKG1vZGVsSW5kZXgsIDEsIGNoYW5nZXMuZHJhZ3VsYU1vZGVsLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kcmFrZS5tb2RlbHMgPSBbY2hhbmdlcy5kcmFndWxhTW9kZWwuY3VycmVudFZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19