import * as i0 from '@angular/core';
import { Component, Input, NgModule } from '@angular/core';
import * as i1 from 'novo-elements/services';
import * as i2 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';

// NG2
class NovoSliderElement {
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

// NG2
class NovoSliderModule {
}
NovoSliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoSliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSliderModule, declarations: [NovoSliderElement], imports: [CommonModule, NovoButtonModule], exports: [NovoSliderElement] });
NovoSliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSliderModule, imports: [[CommonModule, NovoButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule],
                    declarations: [NovoSliderElement],
                    exports: [NovoSliderElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoSliderElement, NovoSliderModule };
//# sourceMappingURL=novo-elements-elements-slider.mjs.map
