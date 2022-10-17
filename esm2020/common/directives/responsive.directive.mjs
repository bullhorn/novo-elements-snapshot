// tslint:disable: directive-selector
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
const entriesMap = new WeakMap();
const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
        if (entriesMap.has(entry.target)) {
            const comp = entriesMap.get(entry.target);
            comp._resizeCallback(entry);
        }
    }
});
export class ResizeObserverDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.sizes = ['size-s', 'size-m', 'size-l', 'size-xl', 'size-xxl'];
        this.resize = new EventEmitter();
        const target = this.el.nativeElement;
        entriesMap.set(target, this);
        ro.observe(target);
    }
    _resizeCallback(entry) {
        const size = this.responsive.reduce((max, w, idx) => {
            if (entry.contentRect.width > w) {
                max = this.sizes[idx + 1];
            }
            return max;
        }, this.sizes[0]);
        if (size !== this.size) {
            this.renderer.removeClass(this.el.nativeElement, this.size);
            this.renderer.addClass(this.el.nativeElement, size);
            this.size = size;
            this.resize.emit(entry);
        }
    }
    ngOnDestroy() {
        const target = this.el.nativeElement;
        ro.unobserve(target);
        entriesMap.delete(target);
    }
}
ResizeObserverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ResizeObserverDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
ResizeObserverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: ResizeObserverDirective, selector: "[responsive]", inputs: { responsive: "responsive", sizes: "sizes" }, outputs: { resize: "resize" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ResizeObserverDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[responsive]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { responsive: [{
                type: Input
            }], sizes: [{
                type: Input
            }], resize: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2l2ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy9yZXNwb25zaXZlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQ0FBcUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUV6RyxNQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBRWpDLE1BQU0sRUFBRSxHQUFHLElBQUksY0FBYyxDQUFDLENBQUMsT0FBYyxFQUFFLEVBQUU7SUFDL0MsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUU7UUFDM0IsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUdILE1BQU0sT0FBTyx1QkFBdUI7SUFTbEMsWUFBb0IsRUFBYyxFQUFtQixRQUFtQjtRQUFwRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQW1CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFQL0QsVUFBSyxHQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBR2pGLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSzFCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQ3JDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFVO1FBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNsRCxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDL0IsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUNyQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7cUhBbENVLHVCQUF1Qjt5R0FBdkIsdUJBQXVCOzRGQUF2Qix1QkFBdUI7a0JBRG5DLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO3lIQUU1QixVQUFVO3NCQUFsQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFHTixNQUFNO3NCQURMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgZW50cmllc01hcCA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IHJvID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzOiBhbnlbXSkgPT4ge1xuICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICBpZiAoZW50cmllc01hcC5oYXMoZW50cnkudGFyZ2V0KSkge1xuICAgICAgY29uc3QgY29tcCA9IGVudHJpZXNNYXAuZ2V0KGVudHJ5LnRhcmdldCk7XG4gICAgICBjb21wLl9yZXNpemVDYWxsYmFjayhlbnRyeSk7XG4gICAgfVxuICB9XG59KTtcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3Jlc3BvbnNpdmVdJyB9KVxuZXhwb3J0IGNsYXNzIFJlc2l6ZU9ic2VydmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcmVzcG9uc2l2ZTogbnVtYmVyW107XG4gIEBJbnB1dCgpIHNpemVzOiBzdHJpbmdbXSA9IFsnc2l6ZS1zJywgJ3NpemUtbScsICdzaXplLWwnLCAnc2l6ZS14bCcsICdzaXplLXh4bCddO1xuXG4gIEBPdXRwdXQoKVxuICByZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBzaXplOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGVudHJpZXNNYXAuc2V0KHRhcmdldCwgdGhpcyk7XG4gICAgcm8ub2JzZXJ2ZSh0YXJnZXQpO1xuICB9XG5cbiAgX3Jlc2l6ZUNhbGxiYWNrKGVudHJ5OiBhbnkpIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5yZXNwb25zaXZlLnJlZHVjZSgobWF4LCB3LCBpZHgpID0+IHtcbiAgICAgIGlmIChlbnRyeS5jb250ZW50UmVjdC53aWR0aCA+IHcpIHtcbiAgICAgICAgbWF4ID0gdGhpcy5zaXplc1tpZHggKyAxXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXg7XG4gICAgfSwgdGhpcy5zaXplc1swXSk7XG4gICAgaWYgKHNpemUgIT09IHRoaXMuc2l6ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuc2l6ZSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgc2l6ZSk7XG4gICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgdGhpcy5yZXNpemUuZW1pdChlbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIHJvLnVub2JzZXJ2ZSh0YXJnZXQpO1xuICAgIGVudHJpZXNNYXAuZGVsZXRlKHRhcmdldCk7XG4gIH1cbn1cbiJdfQ==