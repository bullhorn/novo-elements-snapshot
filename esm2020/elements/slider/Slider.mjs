// NG2
import { Component, ElementRef, Input } from '@angular/core';
// APP
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/button";
import * as i3 from "@angular/common";
export class NovoSliderElement {
    constructor(element, labels) {
        this.element = element;
        this.labels = labels;
        this.currentSlide = 0;
        this.start = true;
        this.end = true;
        this.currSlides = ['active'];
        this.handleKeyDownFunc = this.handleKeyDown.bind(this);
    }
    ngOnInit() {
        for (let i = 0; i < this.slides; i++) {
            this.currSlides[i] = i > 0 ? 'inactive' : 'active';
        }
        // Catch Tab Events
        this.element.nativeElement.addEventListener('keydown', this.handleKeyDownFunc);
    }
    ngOnDestroy() {
        this.element.nativeElement.removeEventListener('keydown', this.handleKeyDownFunc);
    }
    handleKeyDown(event) {
        if (event.key === "Tab" /* Tab */) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }
    }
    changeSlide(direction) {
        if (direction === 'next') {
            if (this.currentSlide === this.slides - 1) {
                return;
            }
            this.currentSlide++;
        }
        else {
            if (this.currentSlide === 0) {
                return;
            }
            this.currentSlide--;
        }
        for (let i = 0; i < this.slides; i++) {
            this.currSlides[i] = 'inactive';
        }
        this.currSlides[this.currentSlide] = 'active';
        this.start = this.currentSlide === 0;
        this.end = this.currentSlide === this.slides - 1;
        this.currentClass = `slide-${this.currentSlide}`;
    }
}
NovoSliderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSliderElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoSliderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSliderElement, selector: "novo-slider", inputs: { slides: "slides" }, host: { properties: { "class": "currentClass" } }, ngImport: i0, template: `
    <section class="slides">
      <ng-content select="div[slide]"></ng-content>
    </section>
    <div class="controls">
      <button *ngIf="!start" theme="icon" icon="previous" (click)="changeSlide('back')"></button>
      <div class="indicators">
        <div class="indicator-circle" *ngFor="let indicator of currSlides; let i = index" [ngClass]="indicator"></div>
      </div>
      <button *ngIf="!end" theme="primary" icon="next" (click)="changeSlide('next')">{{ labels.next }}</button>
      <ng-content select="button" *ngIf="end"></ng-content>
    </div>
  `, isInline: true, components: [{ type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSliderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-slider',
                    template: `
    <section class="slides">
      <ng-content select="div[slide]"></ng-content>
    </section>
    <div class="controls">
      <button *ngIf="!start" theme="icon" icon="previous" (click)="changeSlide('back')"></button>
      <div class="indicators">
        <div class="indicator-circle" *ngFor="let indicator of currSlides; let i = index" [ngClass]="indicator"></div>
      </div>
      <button *ngIf="!end" theme="primary" icon="next" (click)="changeSlide('next')">{{ labels.next }}</button>
      <ng-content select="button" *ngIf="end"></ng-content>
    </div>
  `,
                    host: {
                        '[class]': 'currentClass',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }]; }, propDecorators: { slides: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2xpZGVyL1NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRixNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBc0IxRCxNQUFNLE9BQU8saUJBQWlCO0lBVzVCLFlBQW9CLE9BQW1CLEVBQVMsTUFBd0I7UUFBcEQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBUHhFLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFDdEIsUUFBRyxHQUFZLElBQUksQ0FBQztRQUNwQixlQUFVLEdBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUtsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELFFBQVE7UUFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1NBQ3BEO1FBQ0QsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQW9CO1FBQ2hDLElBQUksS0FBSyxDQUFDLEdBQUcsb0JBQVksRUFBRTtZQUN6QixLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNqQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLFNBQVM7UUFDbkIsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDekMsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztTQUNqQztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7OytHQXZEVSxpQkFBaUI7bUdBQWpCLGlCQUFpQixvSUFqQmxCOzs7Ozs7Ozs7Ozs7R0FZVDs0RkFLVSxpQkFBaUI7a0JBbkI3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO29CQUNELElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsY0FBYztxQkFDMUI7aUJBQ0Y7Z0lBR0MsTUFBTTtzQkFETCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zbGlkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWN0aW9uIGNsYXNzPVwic2xpZGVzXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkaXZbc2xpZGVdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cbiAgICAgIDxidXR0b24gKm5nSWY9XCIhc3RhcnRcIiB0aGVtZT1cImljb25cIiBpY29uPVwicHJldmlvdXNcIiAoY2xpY2spPVwiY2hhbmdlU2xpZGUoJ2JhY2snKVwiPjwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz1cImluZGljYXRvcnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImluZGljYXRvci1jaXJjbGVcIiAqbmdGb3I9XCJsZXQgaW5kaWNhdG9yIG9mIGN1cnJTbGlkZXM7IGxldCBpID0gaW5kZXhcIiBbbmdDbGFzc109XCJpbmRpY2F0b3JcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiAqbmdJZj1cIiFlbmRcIiB0aGVtZT1cInByaW1hcnlcIiBpY29uPVwibmV4dFwiIChjbGljayk9XCJjaGFuZ2VTbGlkZSgnbmV4dCcpXCI+e3sgbGFiZWxzLm5leHQgfX08L2J1dHRvbj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJ1dHRvblwiICpuZ0lmPVwiZW5kXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnY3VycmVudENsYXNzJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NsaWRlckVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHNsaWRlczogYW55O1xuXG4gIGN1cnJlbnRTbGlkZTogbnVtYmVyID0gMDtcbiAgc3RhcnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBlbmQ6IGJvb2xlYW4gPSB0cnVlO1xuICBjdXJyU2xpZGVzOiBBcnJheTxhbnk+ID0gWydhY3RpdmUnXTtcbiAgaGFuZGxlS2V5RG93bkZ1bmM6IGFueTtcbiAgY3VycmVudENsYXNzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5oYW5kbGVLZXlEb3duRnVuYyA9IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlczsgaSsrKSB7XG4gICAgICB0aGlzLmN1cnJTbGlkZXNbaV0gPSBpID4gMCA/ICdpbmFjdGl2ZScgOiAnYWN0aXZlJztcbiAgICB9XG4gICAgLy8gQ2F0Y2ggVGFiIEV2ZW50c1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd25GdW5jKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd25GdW5jKTtcbiAgfVxuXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuVGFiKSB7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlU2xpZGUoZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2xpZGUgPT09IHRoaXMuc2xpZGVzIC0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2xpZGUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50U2xpZGUtLTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVzOyBpKyspIHtcbiAgICAgIHRoaXMuY3VyclNsaWRlc1tpXSA9ICdpbmFjdGl2ZSc7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyU2xpZGVzW3RoaXMuY3VycmVudFNsaWRlXSA9ICdhY3RpdmUnO1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLmN1cnJlbnRTbGlkZSA9PT0gMDtcbiAgICB0aGlzLmVuZCA9IHRoaXMuY3VycmVudFNsaWRlID09PSB0aGlzLnNsaWRlcyAtIDE7XG4gICAgdGhpcy5jdXJyZW50Q2xhc3MgPSBgc2xpZGUtJHt0aGlzLmN1cnJlbnRTbGlkZX1gO1xuICB9XG59XG4iXX0=