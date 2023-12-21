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
  `, isInline: true, styles: [":host{display:block;width:100%;max-width:1000px;margin:0 auto;position:relative;overflow:hidden}:host>[slide=\"0\"]{left:0%}:host.slide-0 .slides{transform:translate(0)}:host>[slide=\"1\"]{left:100%}:host.slide-1 .slides{transform:translate(-100%)}:host>[slide=\"2\"]{left:200%}:host.slide-2 .slides{transform:translate(-200%)}:host>[slide=\"3\"]{left:300%}:host.slide-3 .slides{transform:translate(-300%)}:host>[slide=\"4\"]{left:400%}:host.slide-4 .slides{transform:translate(-400%)}:host>[slide=\"5\"]{left:500%}:host.slide-5 .slides{transform:translate(-500%)}:host>[slide=\"6\"]{left:600%}:host.slide-6 .slides{transform:translate(-600%)}:host>[slide=\"7\"]{left:700%}:host.slide-7 .slides{transform:translate(-700%)}:host>[slide=\"8\"]{left:800%}:host.slide-8 .slides{transform:translate(-800%)}:host>[slide=\"9\"]{left:900%}:host.slide-9 .slides{transform:translate(-900%)}:host>[slide=\"10\"]{left:1000%}:host.slide-10 .slides{transform:translate(-1000%)}:host>[slide=\"11\"]{left:1100%}:host.slide-11 .slides{transform:translate(-1100%)}:host>[slide=\"12\"]{left:1200%}:host.slide-12 .slides{transform:translate(-1200%)}:host>[slide=\"13\"]{left:1300%}:host.slide-13 .slides{transform:translate(-1300%)}:host>[slide=\"14\"]{left:1400%}:host.slide-14 .slides{transform:translate(-1400%)}:host>[slide=\"15\"]{left:1500%}:host.slide-15 .slides{transform:translate(-1500%)}:host>[slide=\"16\"]{left:1600%}:host.slide-16 .slides{transform:translate(-1600%)}:host>[slide=\"17\"]{left:1700%}:host.slide-17 .slides{transform:translate(-1700%)}:host>[slide=\"18\"]{left:1800%}:host.slide-18 .slides{transform:translate(-1800%)}:host>[slide=\"19\"]{left:1900%}:host.slide-19 .slides{transform:translate(-1900%)}:host>[slide=\"20\"]{left:2000%}:host.slide-20 .slides{transform:translate(-2000%)}:host>[slide=\"21\"]{left:2100%}:host.slide-21 .slides{transform:translate(-2100%)}:host>[slide=\"22\"]{left:2200%}:host.slide-22 .slides{transform:translate(-2200%)}:host>[slide=\"23\"]{left:2300%}:host.slide-23 .slides{transform:translate(-2300%)}:host>[slide=\"24\"]{left:2400%}:host.slide-24 .slides{transform:translate(-2400%)}:host>[slide=\"25\"]{left:2500%}:host.slide-25 .slides{transform:translate(-2500%)}:host>[slide=\"26\"]{left:2600%}:host.slide-26 .slides{transform:translate(-2600%)}:host>[slide=\"27\"]{left:2700%}:host.slide-27 .slides{transform:translate(-2700%)}:host>[slide=\"28\"]{left:2800%}:host.slide-28 .slides{transform:translate(-2800%)}:host>[slide=\"29\"]{left:2900%}:host.slide-29 .slides{transform:translate(-2900%)}:host>[slide=\"30\"]{left:3000%}:host.slide-30 .slides{transform:translate(-3000%)}:host>[slide=\"31\"]{left:3100%}:host.slide-31 .slides{transform:translate(-3100%)}:host>[slide=\"32\"]{left:3200%}:host.slide-32 .slides{transform:translate(-3200%)}:host>[slide=\"33\"]{left:3300%}:host.slide-33 .slides{transform:translate(-3300%)}:host>[slide=\"34\"]{left:3400%}:host.slide-34 .slides{transform:translate(-3400%)}:host>[slide=\"35\"]{left:3500%}:host.slide-35 .slides{transform:translate(-3500%)}:host>[slide=\"36\"]{left:3600%}:host.slide-36 .slides{transform:translate(-3600%)}:host>[slide=\"37\"]{left:3700%}:host.slide-37 .slides{transform:translate(-3700%)}:host>[slide=\"38\"]{left:3800%}:host.slide-38 .slides{transform:translate(-3800%)}:host>[slide=\"39\"]{left:3900%}:host.slide-39 .slides{transform:translate(-3900%)}:host>[slide=\"40\"]{left:4000%}:host.slide-40 .slides{transform:translate(-4000%)}:host>[slide=\"41\"]{left:4100%}:host.slide-41 .slides{transform:translate(-4100%)}:host>[slide=\"42\"]{left:4200%}:host.slide-42 .slides{transform:translate(-4200%)}:host>[slide=\"43\"]{left:4300%}:host.slide-43 .slides{transform:translate(-4300%)}:host>[slide=\"44\"]{left:4400%}:host.slide-44 .slides{transform:translate(-4400%)}:host>[slide=\"45\"]{left:4500%}:host.slide-45 .slides{transform:translate(-4500%)}:host>[slide=\"46\"]{left:4600%}:host.slide-46 .slides{transform:translate(-4600%)}:host>[slide=\"47\"]{left:4700%}:host.slide-47 .slides{transform:translate(-4700%)}:host>[slide=\"48\"]{left:4800%}:host.slide-48 .slides{transform:translate(-4800%)}:host>[slide=\"49\"]{left:4900%}:host.slide-49 .slides{transform:translate(-4900%)}:host>[slide=\"50\"]{left:5000%}:host.slide-50 .slides{transform:translate(-5000%)}:host>[slide=\"51\"]{left:5100%}:host.slide-51 .slides{transform:translate(-5100%)}:host>[slide=\"52\"]{left:5200%}:host.slide-52 .slides{transform:translate(-5200%)}:host>[slide=\"53\"]{left:5300%}:host.slide-53 .slides{transform:translate(-5300%)}:host>[slide=\"54\"]{left:5400%}:host.slide-54 .slides{transform:translate(-5400%)}:host>[slide=\"55\"]{left:5500%}:host.slide-55 .slides{transform:translate(-5500%)}:host>[slide=\"56\"]{left:5600%}:host.slide-56 .slides{transform:translate(-5600%)}:host>[slide=\"57\"]{left:5700%}:host.slide-57 .slides{transform:translate(-5700%)}:host>[slide=\"58\"]{left:5800%}:host.slide-58 .slides{transform:translate(-5800%)}:host>[slide=\"59\"]{left:5900%}:host.slide-59 .slides{transform:translate(-5900%)}:host>[slide=\"60\"]{left:6000%}:host.slide-60 .slides{transform:translate(-6000%)}:host>[slide=\"61\"]{left:6100%}:host.slide-61 .slides{transform:translate(-6100%)}:host>[slide=\"62\"]{left:6200%}:host.slide-62 .slides{transform:translate(-6200%)}:host>[slide=\"63\"]{left:6300%}:host.slide-63 .slides{transform:translate(-6300%)}:host>[slide=\"64\"]{left:6400%}:host.slide-64 .slides{transform:translate(-6400%)}:host>[slide=\"65\"]{left:6500%}:host.slide-65 .slides{transform:translate(-6500%)}:host>[slide=\"66\"]{left:6600%}:host.slide-66 .slides{transform:translate(-6600%)}:host>[slide=\"67\"]{left:6700%}:host.slide-67 .slides{transform:translate(-6700%)}:host>[slide=\"68\"]{left:6800%}:host.slide-68 .slides{transform:translate(-6800%)}:host>[slide=\"69\"]{left:6900%}:host.slide-69 .slides{transform:translate(-6900%)}:host>[slide=\"70\"]{left:7000%}:host.slide-70 .slides{transform:translate(-7000%)}:host>[slide=\"71\"]{left:7100%}:host.slide-71 .slides{transform:translate(-7100%)}:host>[slide=\"72\"]{left:7200%}:host.slide-72 .slides{transform:translate(-7200%)}:host>[slide=\"73\"]{left:7300%}:host.slide-73 .slides{transform:translate(-7300%)}:host>[slide=\"74\"]{left:7400%}:host.slide-74 .slides{transform:translate(-7400%)}:host>[slide=\"75\"]{left:7500%}:host.slide-75 .slides{transform:translate(-7500%)}:host>[slide=\"76\"]{left:7600%}:host.slide-76 .slides{transform:translate(-7600%)}:host>[slide=\"77\"]{left:7700%}:host.slide-77 .slides{transform:translate(-7700%)}:host>[slide=\"78\"]{left:7800%}:host.slide-78 .slides{transform:translate(-7800%)}:host>[slide=\"79\"]{left:7900%}:host.slide-79 .slides{transform:translate(-7900%)}:host>[slide=\"80\"]{left:8000%}:host.slide-80 .slides{transform:translate(-8000%)}:host>[slide=\"81\"]{left:8100%}:host.slide-81 .slides{transform:translate(-8100%)}:host>[slide=\"82\"]{left:8200%}:host.slide-82 .slides{transform:translate(-8200%)}:host>[slide=\"83\"]{left:8300%}:host.slide-83 .slides{transform:translate(-8300%)}:host>[slide=\"84\"]{left:8400%}:host.slide-84 .slides{transform:translate(-8400%)}:host>[slide=\"85\"]{left:8500%}:host.slide-85 .slides{transform:translate(-8500%)}:host>[slide=\"86\"]{left:8600%}:host.slide-86 .slides{transform:translate(-8600%)}:host>[slide=\"87\"]{left:8700%}:host.slide-87 .slides{transform:translate(-8700%)}:host>[slide=\"88\"]{left:8800%}:host.slide-88 .slides{transform:translate(-8800%)}:host>[slide=\"89\"]{left:8900%}:host.slide-89 .slides{transform:translate(-8900%)}:host>[slide=\"90\"]{left:9000%}:host.slide-90 .slides{transform:translate(-9000%)}:host>[slide=\"91\"]{left:9100%}:host.slide-91 .slides{transform:translate(-9100%)}:host>[slide=\"92\"]{left:9200%}:host.slide-92 .slides{transform:translate(-9200%)}:host>[slide=\"93\"]{left:9300%}:host.slide-93 .slides{transform:translate(-9300%)}:host>[slide=\"94\"]{left:9400%}:host.slide-94 .slides{transform:translate(-9400%)}:host>[slide=\"95\"]{left:9500%}:host.slide-95 .slides{transform:translate(-9500%)}:host>[slide=\"96\"]{left:9600%}:host.slide-96 .slides{transform:translate(-9600%)}:host>[slide=\"97\"]{left:9700%}:host.slide-97 .slides{transform:translate(-9700%)}:host>[slide=\"98\"]{left:9800%}:host.slide-98 .slides{transform:translate(-9800%)}:host>[slide=\"99\"]{left:9900%}:host.slide-99 .slides{transform:translate(-9900%)}:host>[slide=\"100\"]{left:10000%}:host.slide-100 .slides{transform:translate(-10000%)}:host .slides{min-height:250px;transition:all .2s ease-in-out;width:100%;display:flex;flex:1 0 100%}:host .slides>::ng-deep [slide]{display:flex;flex:1 0 100%;justify-content:center;align-items:center;flex-wrap:wrap;flex-direction:column}:host .slides img{display:block;margin:auto}:host .controls{width:100%;position:absolute;bottom:10px}:host .controls button{position:absolute;top:50%;transform:translateY(-50%)}:host .controls button[icon=previous]{left:10px}:host .controls button[icon=next],:host .controls button[icon=check]{right:10px}:host .indicators{display:flex;flex-direction:row;align-items:center;justify-content:center;width:100%;background:rgba(255,255,255,.05);padding:20px}:host .indicators .indicator-circle{width:8px;height:8px;margin:0 5px;border-radius:50%;background:#d8d8d8;opacity:.2;transition:all .2s ease-in-out}:host .indicators .indicator-circle.active{opacity:1}\n"], components: [{ type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSliderElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-slider', template: `
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
  `, host: {
                        '[class]': 'currentClass',
                    }, styles: [":host{display:block;width:100%;max-width:1000px;margin:0 auto;position:relative;overflow:hidden}:host>[slide=\"0\"]{left:0%}:host.slide-0 .slides{transform:translate(0)}:host>[slide=\"1\"]{left:100%}:host.slide-1 .slides{transform:translate(-100%)}:host>[slide=\"2\"]{left:200%}:host.slide-2 .slides{transform:translate(-200%)}:host>[slide=\"3\"]{left:300%}:host.slide-3 .slides{transform:translate(-300%)}:host>[slide=\"4\"]{left:400%}:host.slide-4 .slides{transform:translate(-400%)}:host>[slide=\"5\"]{left:500%}:host.slide-5 .slides{transform:translate(-500%)}:host>[slide=\"6\"]{left:600%}:host.slide-6 .slides{transform:translate(-600%)}:host>[slide=\"7\"]{left:700%}:host.slide-7 .slides{transform:translate(-700%)}:host>[slide=\"8\"]{left:800%}:host.slide-8 .slides{transform:translate(-800%)}:host>[slide=\"9\"]{left:900%}:host.slide-9 .slides{transform:translate(-900%)}:host>[slide=\"10\"]{left:1000%}:host.slide-10 .slides{transform:translate(-1000%)}:host>[slide=\"11\"]{left:1100%}:host.slide-11 .slides{transform:translate(-1100%)}:host>[slide=\"12\"]{left:1200%}:host.slide-12 .slides{transform:translate(-1200%)}:host>[slide=\"13\"]{left:1300%}:host.slide-13 .slides{transform:translate(-1300%)}:host>[slide=\"14\"]{left:1400%}:host.slide-14 .slides{transform:translate(-1400%)}:host>[slide=\"15\"]{left:1500%}:host.slide-15 .slides{transform:translate(-1500%)}:host>[slide=\"16\"]{left:1600%}:host.slide-16 .slides{transform:translate(-1600%)}:host>[slide=\"17\"]{left:1700%}:host.slide-17 .slides{transform:translate(-1700%)}:host>[slide=\"18\"]{left:1800%}:host.slide-18 .slides{transform:translate(-1800%)}:host>[slide=\"19\"]{left:1900%}:host.slide-19 .slides{transform:translate(-1900%)}:host>[slide=\"20\"]{left:2000%}:host.slide-20 .slides{transform:translate(-2000%)}:host>[slide=\"21\"]{left:2100%}:host.slide-21 .slides{transform:translate(-2100%)}:host>[slide=\"22\"]{left:2200%}:host.slide-22 .slides{transform:translate(-2200%)}:host>[slide=\"23\"]{left:2300%}:host.slide-23 .slides{transform:translate(-2300%)}:host>[slide=\"24\"]{left:2400%}:host.slide-24 .slides{transform:translate(-2400%)}:host>[slide=\"25\"]{left:2500%}:host.slide-25 .slides{transform:translate(-2500%)}:host>[slide=\"26\"]{left:2600%}:host.slide-26 .slides{transform:translate(-2600%)}:host>[slide=\"27\"]{left:2700%}:host.slide-27 .slides{transform:translate(-2700%)}:host>[slide=\"28\"]{left:2800%}:host.slide-28 .slides{transform:translate(-2800%)}:host>[slide=\"29\"]{left:2900%}:host.slide-29 .slides{transform:translate(-2900%)}:host>[slide=\"30\"]{left:3000%}:host.slide-30 .slides{transform:translate(-3000%)}:host>[slide=\"31\"]{left:3100%}:host.slide-31 .slides{transform:translate(-3100%)}:host>[slide=\"32\"]{left:3200%}:host.slide-32 .slides{transform:translate(-3200%)}:host>[slide=\"33\"]{left:3300%}:host.slide-33 .slides{transform:translate(-3300%)}:host>[slide=\"34\"]{left:3400%}:host.slide-34 .slides{transform:translate(-3400%)}:host>[slide=\"35\"]{left:3500%}:host.slide-35 .slides{transform:translate(-3500%)}:host>[slide=\"36\"]{left:3600%}:host.slide-36 .slides{transform:translate(-3600%)}:host>[slide=\"37\"]{left:3700%}:host.slide-37 .slides{transform:translate(-3700%)}:host>[slide=\"38\"]{left:3800%}:host.slide-38 .slides{transform:translate(-3800%)}:host>[slide=\"39\"]{left:3900%}:host.slide-39 .slides{transform:translate(-3900%)}:host>[slide=\"40\"]{left:4000%}:host.slide-40 .slides{transform:translate(-4000%)}:host>[slide=\"41\"]{left:4100%}:host.slide-41 .slides{transform:translate(-4100%)}:host>[slide=\"42\"]{left:4200%}:host.slide-42 .slides{transform:translate(-4200%)}:host>[slide=\"43\"]{left:4300%}:host.slide-43 .slides{transform:translate(-4300%)}:host>[slide=\"44\"]{left:4400%}:host.slide-44 .slides{transform:translate(-4400%)}:host>[slide=\"45\"]{left:4500%}:host.slide-45 .slides{transform:translate(-4500%)}:host>[slide=\"46\"]{left:4600%}:host.slide-46 .slides{transform:translate(-4600%)}:host>[slide=\"47\"]{left:4700%}:host.slide-47 .slides{transform:translate(-4700%)}:host>[slide=\"48\"]{left:4800%}:host.slide-48 .slides{transform:translate(-4800%)}:host>[slide=\"49\"]{left:4900%}:host.slide-49 .slides{transform:translate(-4900%)}:host>[slide=\"50\"]{left:5000%}:host.slide-50 .slides{transform:translate(-5000%)}:host>[slide=\"51\"]{left:5100%}:host.slide-51 .slides{transform:translate(-5100%)}:host>[slide=\"52\"]{left:5200%}:host.slide-52 .slides{transform:translate(-5200%)}:host>[slide=\"53\"]{left:5300%}:host.slide-53 .slides{transform:translate(-5300%)}:host>[slide=\"54\"]{left:5400%}:host.slide-54 .slides{transform:translate(-5400%)}:host>[slide=\"55\"]{left:5500%}:host.slide-55 .slides{transform:translate(-5500%)}:host>[slide=\"56\"]{left:5600%}:host.slide-56 .slides{transform:translate(-5600%)}:host>[slide=\"57\"]{left:5700%}:host.slide-57 .slides{transform:translate(-5700%)}:host>[slide=\"58\"]{left:5800%}:host.slide-58 .slides{transform:translate(-5800%)}:host>[slide=\"59\"]{left:5900%}:host.slide-59 .slides{transform:translate(-5900%)}:host>[slide=\"60\"]{left:6000%}:host.slide-60 .slides{transform:translate(-6000%)}:host>[slide=\"61\"]{left:6100%}:host.slide-61 .slides{transform:translate(-6100%)}:host>[slide=\"62\"]{left:6200%}:host.slide-62 .slides{transform:translate(-6200%)}:host>[slide=\"63\"]{left:6300%}:host.slide-63 .slides{transform:translate(-6300%)}:host>[slide=\"64\"]{left:6400%}:host.slide-64 .slides{transform:translate(-6400%)}:host>[slide=\"65\"]{left:6500%}:host.slide-65 .slides{transform:translate(-6500%)}:host>[slide=\"66\"]{left:6600%}:host.slide-66 .slides{transform:translate(-6600%)}:host>[slide=\"67\"]{left:6700%}:host.slide-67 .slides{transform:translate(-6700%)}:host>[slide=\"68\"]{left:6800%}:host.slide-68 .slides{transform:translate(-6800%)}:host>[slide=\"69\"]{left:6900%}:host.slide-69 .slides{transform:translate(-6900%)}:host>[slide=\"70\"]{left:7000%}:host.slide-70 .slides{transform:translate(-7000%)}:host>[slide=\"71\"]{left:7100%}:host.slide-71 .slides{transform:translate(-7100%)}:host>[slide=\"72\"]{left:7200%}:host.slide-72 .slides{transform:translate(-7200%)}:host>[slide=\"73\"]{left:7300%}:host.slide-73 .slides{transform:translate(-7300%)}:host>[slide=\"74\"]{left:7400%}:host.slide-74 .slides{transform:translate(-7400%)}:host>[slide=\"75\"]{left:7500%}:host.slide-75 .slides{transform:translate(-7500%)}:host>[slide=\"76\"]{left:7600%}:host.slide-76 .slides{transform:translate(-7600%)}:host>[slide=\"77\"]{left:7700%}:host.slide-77 .slides{transform:translate(-7700%)}:host>[slide=\"78\"]{left:7800%}:host.slide-78 .slides{transform:translate(-7800%)}:host>[slide=\"79\"]{left:7900%}:host.slide-79 .slides{transform:translate(-7900%)}:host>[slide=\"80\"]{left:8000%}:host.slide-80 .slides{transform:translate(-8000%)}:host>[slide=\"81\"]{left:8100%}:host.slide-81 .slides{transform:translate(-8100%)}:host>[slide=\"82\"]{left:8200%}:host.slide-82 .slides{transform:translate(-8200%)}:host>[slide=\"83\"]{left:8300%}:host.slide-83 .slides{transform:translate(-8300%)}:host>[slide=\"84\"]{left:8400%}:host.slide-84 .slides{transform:translate(-8400%)}:host>[slide=\"85\"]{left:8500%}:host.slide-85 .slides{transform:translate(-8500%)}:host>[slide=\"86\"]{left:8600%}:host.slide-86 .slides{transform:translate(-8600%)}:host>[slide=\"87\"]{left:8700%}:host.slide-87 .slides{transform:translate(-8700%)}:host>[slide=\"88\"]{left:8800%}:host.slide-88 .slides{transform:translate(-8800%)}:host>[slide=\"89\"]{left:8900%}:host.slide-89 .slides{transform:translate(-8900%)}:host>[slide=\"90\"]{left:9000%}:host.slide-90 .slides{transform:translate(-9000%)}:host>[slide=\"91\"]{left:9100%}:host.slide-91 .slides{transform:translate(-9100%)}:host>[slide=\"92\"]{left:9200%}:host.slide-92 .slides{transform:translate(-9200%)}:host>[slide=\"93\"]{left:9300%}:host.slide-93 .slides{transform:translate(-9300%)}:host>[slide=\"94\"]{left:9400%}:host.slide-94 .slides{transform:translate(-9400%)}:host>[slide=\"95\"]{left:9500%}:host.slide-95 .slides{transform:translate(-9500%)}:host>[slide=\"96\"]{left:9600%}:host.slide-96 .slides{transform:translate(-9600%)}:host>[slide=\"97\"]{left:9700%}:host.slide-97 .slides{transform:translate(-9700%)}:host>[slide=\"98\"]{left:9800%}:host.slide-98 .slides{transform:translate(-9800%)}:host>[slide=\"99\"]{left:9900%}:host.slide-99 .slides{transform:translate(-9900%)}:host>[slide=\"100\"]{left:10000%}:host.slide-100 .slides{transform:translate(-10000%)}:host .slides{min-height:250px;transition:all .2s ease-in-out;width:100%;display:flex;flex:1 0 100%}:host .slides>::ng-deep [slide]{display:flex;flex:1 0 100%;justify-content:center;align-items:center;flex-wrap:wrap;flex-direction:column}:host .slides img{display:block;margin:auto}:host .controls{width:100%;position:absolute;bottom:10px}:host .controls button{position:absolute;top:50%;transform:translateY(-50%)}:host .controls button[icon=previous]{left:10px}:host .controls button[icon=next],:host .controls button[icon=check]{right:10px}:host .indicators{display:flex;flex-direction:row;align-items:center;justify-content:center;width:100%;background:rgba(255,255,255,.05);padding:20px}:host .indicators .indicator-circle{width:8px;height:8px;margin:0 5px;border-radius:50%;background:#d8d8d8;opacity:.2;transition:all .2s ease-in-out}:host .indicators .indicator-circle.active{opacity:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }]; }, propDecorators: { slides: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2xpZGVyL1NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRixNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBdUIxRCxNQUFNLE9BQU8saUJBQWlCO0lBVzVCLFlBQW9CLE9BQW1CLEVBQVMsTUFBd0I7UUFBcEQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBUHhFLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFDdEIsUUFBRyxHQUFZLElBQUksQ0FBQztRQUNwQixlQUFVLEdBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUtsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELFFBQVE7UUFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1NBQ3BEO1FBQ0QsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQW9CO1FBQ2hDLElBQUksS0FBSyxDQUFDLEdBQUcsb0JBQVksRUFBRTtZQUN6QixLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNqQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLFNBQVM7UUFDbkIsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDekMsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztTQUNqQztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7OytHQXZEVSxpQkFBaUI7bUdBQWpCLGlCQUFpQixvSUFsQmxCOzs7Ozs7Ozs7Ozs7R0FZVDs0RkFNVSxpQkFBaUI7a0JBcEI3QixTQUFTOytCQUNFLGFBQWEsWUFDYjs7Ozs7Ozs7Ozs7O0dBWVQsUUFFSzt3QkFDSixTQUFTLEVBQUUsY0FBYztxQkFDMUI7Z0lBSUQsTUFBTTtzQkFETCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zbGlkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWN0aW9uIGNsYXNzPVwic2xpZGVzXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkaXZbc2xpZGVdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cbiAgICAgIDxidXR0b24gKm5nSWY9XCIhc3RhcnRcIiB0aGVtZT1cImljb25cIiBpY29uPVwicHJldmlvdXNcIiAoY2xpY2spPVwiY2hhbmdlU2xpZGUoJ2JhY2snKVwiPjwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz1cImluZGljYXRvcnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImluZGljYXRvci1jaXJjbGVcIiAqbmdGb3I9XCJsZXQgaW5kaWNhdG9yIG9mIGN1cnJTbGlkZXM7IGxldCBpID0gaW5kZXhcIiBbbmdDbGFzc109XCJpbmRpY2F0b3JcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiAqbmdJZj1cIiFlbmRcIiB0aGVtZT1cInByaW1hcnlcIiBpY29uPVwibmV4dFwiIChjbGljayk9XCJjaGFuZ2VTbGlkZSgnbmV4dCcpXCI+e3sgbGFiZWxzLm5leHQgfX08L2J1dHRvbj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJ1dHRvblwiICpuZ0lmPVwiZW5kXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9TbGlkZXIuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnY3VycmVudENsYXNzJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NsaWRlckVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHNsaWRlczogYW55O1xuXG4gIGN1cnJlbnRTbGlkZTogbnVtYmVyID0gMDtcbiAgc3RhcnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBlbmQ6IGJvb2xlYW4gPSB0cnVlO1xuICBjdXJyU2xpZGVzOiBBcnJheTxhbnk+ID0gWydhY3RpdmUnXTtcbiAgaGFuZGxlS2V5RG93bkZ1bmM6IGFueTtcbiAgY3VycmVudENsYXNzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5oYW5kbGVLZXlEb3duRnVuYyA9IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlczsgaSsrKSB7XG4gICAgICB0aGlzLmN1cnJTbGlkZXNbaV0gPSBpID4gMCA/ICdpbmFjdGl2ZScgOiAnYWN0aXZlJztcbiAgICB9XG4gICAgLy8gQ2F0Y2ggVGFiIEV2ZW50c1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd25GdW5jKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd25GdW5jKTtcbiAgfVxuXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuVGFiKSB7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlU2xpZGUoZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2xpZGUgPT09IHRoaXMuc2xpZGVzIC0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2xpZGUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50U2xpZGUtLTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVzOyBpKyspIHtcbiAgICAgIHRoaXMuY3VyclNsaWRlc1tpXSA9ICdpbmFjdGl2ZSc7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyU2xpZGVzW3RoaXMuY3VycmVudFNsaWRlXSA9ICdhY3RpdmUnO1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLmN1cnJlbnRTbGlkZSA9PT0gMDtcbiAgICB0aGlzLmVuZCA9IHRoaXMuY3VycmVudFNsaWRlID09PSB0aGlzLnNsaWRlcyAtIDE7XG4gICAgdGhpcy5jdXJyZW50Q2xhc3MgPSBgc2xpZGUtJHt0aGlzLmN1cnJlbnRTbGlkZX1gO1xuICB9XG59XG4iXX0=