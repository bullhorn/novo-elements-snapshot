// NG2
import { Directive, ElementRef, Input } from '@angular/core';
// Vendor
import * as dragulaImported from '@bullhorn/dragula';
const dragula = dragulaImported;
// APP
import { NovoDragulaService } from './DragulaService';
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
NovoDragulaElement.decorators = [
    { type: Directive, args: [{
                selector: '[dragula]',
            },] }
];
NovoDragulaElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoDragulaService }
];
NovoDragulaElement.propDecorators = {
    bag: [{ type: Input, args: ['dragula',] }],
    dragulaModel: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZ3VsYS5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZHJhZ3VsYS9EcmFndWxhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBVSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDaEYsU0FBUztBQUNULE9BQU8sS0FBSyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDO0FBQ2hDLE1BQU07QUFDTixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUt0RCxNQUFNLE9BQU8sa0JBQWtCO0lBUTdCLFlBQVksT0FBbUIsRUFBVSxjQUFrQztRQUFsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFIM0UsVUFBSyxHQUFRLElBQUksQ0FBQztRQUloQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDekMsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFL0MsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO2dCQUNuQixVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQzdCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekM7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBTztRQUNqQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNyQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDakYsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDNUU7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUN6RDthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7WUFwREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2FBQ3RCOzs7WUFUbUIsVUFBVTtZQUtyQixrQkFBa0I7OztrQkFNeEIsS0FBSyxTQUFDLFNBQVM7MkJBRWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBWZW5kb3JcclxuaW1wb3J0ICogYXMgZHJhZ3VsYUltcG9ydGVkIGZyb20gJ0BidWxsaG9ybi9kcmFndWxhJztcclxuY29uc3QgZHJhZ3VsYSA9IGRyYWd1bGFJbXBvcnRlZDtcclxuLy8gQVBQXHJcbmltcG9ydCB7IE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJy4vRHJhZ3VsYVNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbZHJhZ3VsYV0nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0RyYWd1bGFFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgnZHJhZ3VsYScpXHJcbiAgYmFnOiBhbnk7XHJcbiAgQElucHV0KClcclxuICBkcmFndWxhTW9kZWw6IGFueTtcclxuICBkcmFrZTogYW55ID0gbnVsbDtcclxuICBjb250YWluZXI6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkcmFndWxhU2VydmljZTogTm92b0RyYWd1bGFTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgYmFnID0gdGhpcy5kcmFndWxhU2VydmljZS5maW5kKHRoaXMuYmFnKTtcclxuXHJcbiAgICBpZiAoYmFnKSB7XHJcbiAgICAgIHRoaXMuZHJha2UgPSBiYWcuZHJha2U7XHJcbiAgICAgIHRoaXMuY2hlY2tNb2RlbCgpO1xyXG4gICAgICB0aGlzLmRyYWtlLmNvbnRhaW5lcnMucHVzaCh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRyYWtlID0gZHJhZ3VsYSh7XHJcbiAgICAgICAgY29udGFpbmVyczogW3RoaXMuY29udGFpbmVyXSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuY2hlY2tNb2RlbCgpO1xyXG4gICAgICB0aGlzLmRyYWd1bGFTZXJ2aWNlLmFkZCh0aGlzLmJhZywgdGhpcy5kcmFrZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja01vZGVsKCkge1xyXG4gICAgaWYgKHRoaXMuZHJhZ3VsYU1vZGVsKSB7XHJcbiAgICAgIGlmICh0aGlzLmRyYWtlLm1vZGVscykge1xyXG4gICAgICAgIHRoaXMuZHJha2UubW9kZWxzLnB1c2godGhpcy5kcmFndWxhTW9kZWwpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZHJha2UubW9kZWxzID0gW3RoaXMuZHJhZ3VsYU1vZGVsXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMgJiYgY2hhbmdlcy5kcmFndWxhTW9kZWwpIHtcclxuICAgICAgaWYgKHRoaXMuZHJha2UpIHtcclxuICAgICAgICBpZiAodGhpcy5kcmFrZS5tb2RlbHMpIHtcclxuICAgICAgICAgIGNvbnN0IG1vZGVsSW5kZXggPSB0aGlzLmRyYWtlLm1vZGVscy5pbmRleE9mKGNoYW5nZXMuZHJhZ3VsYU1vZGVsLnByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgdGhpcy5kcmFrZS5tb2RlbHMuc3BsaWNlKG1vZGVsSW5kZXgsIDEsIGNoYW5nZXMuZHJhZ3VsYU1vZGVsLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZHJha2UubW9kZWxzID0gW2NoYW5nZXMuZHJhZ3VsYU1vZGVsLmN1cnJlbnRWYWx1ZV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==