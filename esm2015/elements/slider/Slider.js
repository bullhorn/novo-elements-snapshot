// NG2
import { Component, ElementRef, Input } from '@angular/core';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
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
        if (event.keyCode === 9) {
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
NovoSliderElement.decorators = [
    { type: Component, args: [{
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
                }
            },] }
];
NovoSliderElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService }
];
NovoSliderElement.propDecorators = {
    slides: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zbGlkZXIvU2xpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQXFCckUsTUFBTSxPQUFPLGlCQUFpQjtJQVc1QixZQUFvQixPQUFtQixFQUFTLE1BQXdCO1FBQXBELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQVB4RSxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixVQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDcEIsZUFBVSxHQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFLbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztTQUNwRDtRQUNELG1CQUFtQjtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFLO1FBQ2pCLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7WUFDdkIsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxTQUFTO1FBQ25CLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3pDLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsRUFBRTtnQkFDM0IsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7U0FDakM7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuRCxDQUFDOzs7WUExRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztLQVlQO2dCQUNILElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsY0FBYztpQkFDMUI7YUFDRjs7O1lBdEJtQixVQUFVO1lBRXJCLGdCQUFnQjs7O3FCQXNCdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tc2xpZGVyJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwic2xpZGVzXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRpdltzbGlkZV1cIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxyXG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIXN0YXJ0XCIgdGhlbWU9XCJpY29uXCIgaWNvbj1cInByZXZpb3VzXCIgKGNsaWNrKT1cImNoYW5nZVNsaWRlKCdiYWNrJylcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZGljYXRvcnNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmRpY2F0b3ItY2lyY2xlXCIgKm5nRm9yPVwibGV0IGluZGljYXRvciBvZiBjdXJyU2xpZGVzOyBsZXQgaSA9IGluZGV4XCIgW25nQ2xhc3NdPVwiaW5kaWNhdG9yXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIWVuZFwiIHRoZW1lPVwicHJpbWFyeVwiIGljb249XCJuZXh0XCIgKGNsaWNrKT1cImNoYW5nZVNsaWRlKCduZXh0JylcIj57eyBsYWJlbHMubmV4dCB9fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJidXR0b25cIiAqbmdJZj1cImVuZFwiPjwvbmctY29udGVudD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzc10nOiAnY3VycmVudENsYXNzJyxcclxuICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1NsaWRlckVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICBzbGlkZXM6IGFueTtcclxuXHJcbiAgY3VycmVudFNsaWRlOiBudW1iZXIgPSAwO1xyXG4gIHN0YXJ0OiBib29sZWFuID0gdHJ1ZTtcclxuICBlbmQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGN1cnJTbGlkZXM6IEFycmF5PGFueT4gPSBbJ2FjdGl2ZSddO1xyXG4gIGhhbmRsZUtleURvd25GdW5jOiBhbnk7XHJcbiAgY3VycmVudENsYXNzOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge1xyXG4gICAgdGhpcy5oYW5kbGVLZXlEb3duRnVuYyA9IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVzOyBpKyspIHtcclxuICAgICAgdGhpcy5jdXJyU2xpZGVzW2ldID0gaSA+IDAgPyAnaW5hY3RpdmUnIDogJ2FjdGl2ZSc7XHJcbiAgICB9XHJcbiAgICAvLyBDYXRjaCBUYWIgRXZlbnRzXHJcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duRnVuYyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd25GdW5jKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUtleURvd24oZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA5KSB7XHJcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlU2xpZGUoZGlyZWN0aW9uKSB7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnbmV4dCcpIHtcclxuICAgICAgaWYgKHRoaXMuY3VycmVudFNsaWRlID09PSB0aGlzLnNsaWRlcyAtIDEpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jdXJyZW50U2xpZGUrKztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTbGlkZSA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZS0tO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZXM7IGkrKykge1xyXG4gICAgICB0aGlzLmN1cnJTbGlkZXNbaV0gPSAnaW5hY3RpdmUnO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VyclNsaWRlc1t0aGlzLmN1cnJlbnRTbGlkZV0gPSAnYWN0aXZlJztcclxuICAgIHRoaXMuc3RhcnQgPSB0aGlzLmN1cnJlbnRTbGlkZSA9PT0gMDtcclxuICAgIHRoaXMuZW5kID0gdGhpcy5jdXJyZW50U2xpZGUgPT09IHRoaXMuc2xpZGVzIC0gMTtcclxuICAgIHRoaXMuY3VycmVudENsYXNzID0gYHNsaWRlLSR7dGhpcy5jdXJyZW50U2xpZGV9YDtcclxuICB9XHJcbn1cclxuIl19