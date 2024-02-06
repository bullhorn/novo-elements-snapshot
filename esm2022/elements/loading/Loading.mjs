// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, Directive, HostBinding, Input, QueryList, TemplateRef, ViewContainerRef, } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoLoadingElement {
    constructor() {
        this.size = 'medium';
    }
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value) {
        console.warn(`'theme' property is deprecated, please use 'color'.`);
        this.color = value;
    }
    get theme() {
        return this.color;
    }
    get hb_class() {
        return [`color-${this.color}`, `size-${this.size}`].join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoLoadingElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoLoadingElement, selector: "novo-loading", inputs: { theme: "theme", color: "color", size: "size" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `, isInline: true, styles: [":host{padding:20px;display:flex;flex-direction:row;font-size:13px;gap:.3em}:host.size-small{padding:8px;font-size:8px}:host.size-large{font-size:18px}:host span.dot{display:block;border-radius:50%;height:1em;width:1em}:host span.dot:nth-of-type(1){background-color:#4a89dc}:host span.dot:nth-of-type(2){background-color:#967adc}:host span.dot:nth-of-type(3){background-color:#da4453}:host span.dot:nth-of-type(4){background-color:#f6b042}:host span.dot:nth-of-type(5){background-color:#37bc9b}:host span.dot:nth-of-type(1){animation:jump 1.6s ease-in-out 70ms forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:70ms;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(2){animation:jump 1.6s ease-in-out .14s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.14s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(3){animation:jump 1.6s ease-in-out .21s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.21s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(4){animation:jump 1.6s ease-in-out .28s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.28s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(5){animation:jump 1.6s ease-in-out .35s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.35s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host.color-aqua span.dot{background-color:#3bafda}:host.color-ocean span.dot{background-color:#4a89dc}:host.color-mint span.dot{background-color:#37bc9b}:host.color-grass span.dot{background-color:#8cc152}:host.color-sunflower span.dot{background-color:#f6b042}:host.color-bittersweet span.dot{background-color:#eb6845}:host.color-grapefruit span.dot{background-color:#da4453}:host.color-carnation span.dot{background-color:#d770ad}:host.color-lavender span.dot{background-color:#967adc}:host.color-mountain span.dot{background-color:#9678b6}:host.white span.dot,:host[inverse] span.dot{background-color:#fff!important}@keyframes jump{0%{transform:translateY(0)}30%{transform:translateY(0);opacity:1}45%{transform:translateY(-1.2em);opacity:.5}60%{transform:translateY(.8em);opacity:.95}to{transform:translateY(0);opacity:1}}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoLoadingElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-loading', template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `, styles: [":host{padding:20px;display:flex;flex-direction:row;font-size:13px;gap:.3em}:host.size-small{padding:8px;font-size:8px}:host.size-large{font-size:18px}:host span.dot{display:block;border-radius:50%;height:1em;width:1em}:host span.dot:nth-of-type(1){background-color:#4a89dc}:host span.dot:nth-of-type(2){background-color:#967adc}:host span.dot:nth-of-type(3){background-color:#da4453}:host span.dot:nth-of-type(4){background-color:#f6b042}:host span.dot:nth-of-type(5){background-color:#37bc9b}:host span.dot:nth-of-type(1){animation:jump 1.6s ease-in-out 70ms forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:70ms;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(2){animation:jump 1.6s ease-in-out .14s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.14s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(3){animation:jump 1.6s ease-in-out .21s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.21s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(4){animation:jump 1.6s ease-in-out .28s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.28s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(5){animation:jump 1.6s ease-in-out .35s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.35s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host.color-aqua span.dot{background-color:#3bafda}:host.color-ocean span.dot{background-color:#4a89dc}:host.color-mint span.dot{background-color:#37bc9b}:host.color-grass span.dot{background-color:#8cc152}:host.color-sunflower span.dot{background-color:#f6b042}:host.color-bittersweet span.dot{background-color:#eb6845}:host.color-grapefruit span.dot{background-color:#da4453}:host.color-carnation span.dot{background-color:#d770ad}:host.color-lavender span.dot{background-color:#967adc}:host.color-mountain span.dot{background-color:#9678b6}:host.white span.dot,:host[inverse] span.dot{background-color:#fff!important}@keyframes jump{0%{transform:translateY(0)}30%{transform:translateY(0);opacity:1}45%{transform:translateY(-1.2em);opacity:.5}60%{transform:translateY(.8em);opacity:.95}to{transform:translateY(0);opacity:1}}\n"] }]
        }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], hb_class: [{
                type: HostBinding,
                args: ['class']
            }] } });
export class NovoSpinnerElement {
    constructor() {
        this.size = 'medium';
    }
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value) {
        console.warn(`'theme' property is deprecated, please use 'color'.`);
        this.color = value;
    }
    get theme() {
        return this.color;
    }
    get inverse() {
        return this._inverse;
    }
    set inverse(value) {
        this._inverse = coerceBooleanProperty(value);
    }
    get hb_class() {
        return [this.inverse ? 'color-white' : `color-${this.color}`, `size-${this.size}`].join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSpinnerElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoSpinnerElement, selector: "novo-spinner", inputs: { theme: "theme", color: "color", size: "size", inverse: "inverse" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <div class="dot1 dot"></div>
    <div class="dot2 dot"></div>
    <div class="dot3 dot"></div>
    <div class="dot4 dot"></div>
    <div class="dot5 dot"></div>
    <div class="dot6 dot"></div>
    <div class="dot7 dot"></div>
    <div class="dot8 dot"></div>
    <div class="dot9 dot"></div>
    <div class="dot10 dot"></div>
    <div class="dot11 dot"></div>
    <div class="dot12 dot"></div>
  `, isInline: true, styles: [":host{display:inline-block;width:1.8em;height:1.8em;position:relative}:host.size-small{width:1.2em;height:1.2em}:host.size-large{width:2.1em;height:2.1em}:host .dot{width:100%;height:100%;position:absolute;left:0;top:0}:host .dot:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;animation:dotFadeDelay 1.2s infinite ease-in-out both}:host.aqua .dot:before{background-color:#3bafda}:host.ocean .dot:before{background-color:#4a89dc}:host.mint .dot:before{background-color:#37bc9b}:host.grass .dot:before{background-color:#8cc152}:host.sunflower .dot:before{background-color:#f6b042}:host.bittersweet .dot:before{background-color:#eb6845}:host.grapefruit .dot:before{background-color:#da4453}:host.carnation .dot:before{background-color:#d770ad}:host.lavender .dot:before{background-color:#967adc}:host.mountain .dot:before{background-color:#9678b6}:host.multicolor .dot:nth-of-type(1):before{background-color:#3bafda}:host.multicolor .dot:nth-of-type(2):before{background-color:#4a89dc}:host.multicolor .dot:nth-of-type(3):before{background-color:#37bc9b}:host.multicolor .dot:nth-of-type(4):before{background-color:#8cc152}:host.multicolor .dot:nth-of-type(5):before{background-color:#f6b042}:host.multicolor .dot:nth-of-type(6):before{background-color:#eb6845}:host.multicolor .dot:nth-of-type(7):before{background-color:#da4453}:host.multicolor .dot:nth-of-type(8):before{background-color:#d770ad}:host.multicolor .dot:nth-of-type(9):before{background-color:#967adc}:host.multicolor .dot:nth-of-type(10):before{background-color:#9678b6}:host.white .dot:before,:host[inverse] .dot:before{background-color:#fff}:host .dot2{transform:rotate(30deg)}:host .dot3{transform:rotate(60deg)}:host .dot4{transform:rotate(90deg)}:host .dot5{transform:rotate(120deg)}:host .dot6{transform:rotate(150deg)}:host .dot7{transform:rotate(180deg)}:host .dot8{transform:rotate(210deg)}:host .dot9{transform:rotate(240deg)}:host .dot10{transform:rotate(270deg)}:host .dot11{transform:rotate(300deg)}:host .dot12{transform:rotate(330deg)}:host .dot2:before{animation-delay:-1.1s}:host .dot3:before{animation-delay:-1s}:host .dot4:before{animation-delay:-.9s}:host .dot5:before{animation-delay:-.8s}:host .dot6:before{animation-delay:-.7s}:host .dot7:before{animation-delay:-.6s}:host .dot8:before{animation-delay:-.5s}:host .dot9:before{animation-delay:-.4s}:host .dot10:before{animation-delay:-.3s}:host .dot11:before{animation-delay:-.2s}:host .dot12:before{animation-delay:-.1s}@keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSpinnerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-spinner', template: `
    <div class="dot1 dot"></div>
    <div class="dot2 dot"></div>
    <div class="dot3 dot"></div>
    <div class="dot4 dot"></div>
    <div class="dot5 dot"></div>
    <div class="dot6 dot"></div>
    <div class="dot7 dot"></div>
    <div class="dot8 dot"></div>
    <div class="dot9 dot"></div>
    <div class="dot10 dot"></div>
    <div class="dot11 dot"></div>
    <div class="dot12 dot"></div>
  `, styles: [":host{display:inline-block;width:1.8em;height:1.8em;position:relative}:host.size-small{width:1.2em;height:1.2em}:host.size-large{width:2.1em;height:2.1em}:host .dot{width:100%;height:100%;position:absolute;left:0;top:0}:host .dot:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;animation:dotFadeDelay 1.2s infinite ease-in-out both}:host.aqua .dot:before{background-color:#3bafda}:host.ocean .dot:before{background-color:#4a89dc}:host.mint .dot:before{background-color:#37bc9b}:host.grass .dot:before{background-color:#8cc152}:host.sunflower .dot:before{background-color:#f6b042}:host.bittersweet .dot:before{background-color:#eb6845}:host.grapefruit .dot:before{background-color:#da4453}:host.carnation .dot:before{background-color:#d770ad}:host.lavender .dot:before{background-color:#967adc}:host.mountain .dot:before{background-color:#9678b6}:host.multicolor .dot:nth-of-type(1):before{background-color:#3bafda}:host.multicolor .dot:nth-of-type(2):before{background-color:#4a89dc}:host.multicolor .dot:nth-of-type(3):before{background-color:#37bc9b}:host.multicolor .dot:nth-of-type(4):before{background-color:#8cc152}:host.multicolor .dot:nth-of-type(5):before{background-color:#f6b042}:host.multicolor .dot:nth-of-type(6):before{background-color:#eb6845}:host.multicolor .dot:nth-of-type(7):before{background-color:#da4453}:host.multicolor .dot:nth-of-type(8):before{background-color:#d770ad}:host.multicolor .dot:nth-of-type(9):before{background-color:#967adc}:host.multicolor .dot:nth-of-type(10):before{background-color:#9678b6}:host.white .dot:before,:host[inverse] .dot:before{background-color:#fff}:host .dot2{transform:rotate(30deg)}:host .dot3{transform:rotate(60deg)}:host .dot4{transform:rotate(90deg)}:host .dot5{transform:rotate(120deg)}:host .dot6{transform:rotate(150deg)}:host .dot7{transform:rotate(180deg)}:host .dot8{transform:rotate(210deg)}:host .dot9{transform:rotate(240deg)}:host .dot10{transform:rotate(270deg)}:host .dot11{transform:rotate(300deg)}:host .dot12{transform:rotate(330deg)}:host .dot2:before{animation-delay:-1.1s}:host .dot3:before{animation-delay:-1s}:host .dot4:before{animation-delay:-.9s}:host .dot5:before{animation-delay:-.8s}:host .dot6:before{animation-delay:-.7s}:host .dot7:before{animation-delay:-.6s}:host .dot8:before{animation-delay:-.5s}:host .dot9:before{animation-delay:-.4s}:host .dot10:before{animation-delay:-.3s}:host .dot11:before{animation-delay:-.2s}:host .dot12:before{animation-delay:-.1s}@keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}\n"] }]
        }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], inverse: [{
                type: Input
            }], hb_class: [{
                type: HostBinding,
                args: ['class']
            }] } });
export class NovoSkeletonDirective {
    constructor() {
        this.skeleton = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSkeletonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NovoSkeletonDirective, selector: "[skeleton]", host: { properties: { "class.skeleton": "this.skeleton" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSkeletonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[skeleton]',
                }]
        }], propDecorators: { skeleton: [{
                type: HostBinding,
                args: ['class.skeleton']
            }] } });
export class NovoLoadedDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoLoadedDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NovoLoadedDirective, selector: "[loaded]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoLoadedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[loaded]',
                }]
        }] });
export class NovoIsLoadingDirective {
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.hasView = false;
        this.skeletonViews = [];
        this.loadedViews = [];
    }
    set isLoading(condition) {
        if (!condition && !this.hasView) {
            this.destroyViews(this.loadedViews);
            this.skeletonViews = this.createViews(this.skeletonTemplates);
            this.hasView = true;
        }
        else if (condition && this.hasView) {
            this.destroyViews(this.skeletonViews);
            this.loadedViews = this.createViews(this.loadedTemplates);
            this.hasView = false;
        }
    }
    createViews(templates) {
        return templates && templates.map((v, i) => this.viewContainer.createEmbeddedView(v, null, i));
    }
    destroyViews(views) {
        if (views) {
            for (const view of views) {
                view.destroy();
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoIsLoadingDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NovoIsLoadingDirective, selector: "[isLoading]", inputs: { isLoading: "isLoading" }, queries: [{ propertyName: "skeletonTemplates", predicate: NovoSkeletonDirective, read: TemplateRef }, { propertyName: "loadedTemplates", predicate: NovoLoadedDirective, read: TemplateRef }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoIsLoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[isLoading]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { skeletonTemplates: [{
                type: ContentChildren,
                args: [NovoSkeletonDirective, { read: TemplateRef }]
            }], loadedTemplates: [{
                type: ContentChildren,
                args: [NovoLoadedDirective, { read: TemplateRef }]
            }], isLoading: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2xvYWRpbmcvTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFdBQVcsRUFDWCxLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7O0FBYXZCLE1BQU0sT0FBTyxrQkFBa0I7SUFYL0I7UUE2QkUsU0FBSSxHQUFXLFFBQVEsQ0FBQztLQU16QjtJQXZCQzs7O1FBR0k7SUFDSixJQUNJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMscURBQXFELENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFRRCxJQUNJLFFBQVE7UUFDVixPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEUsQ0FBQzsrR0F2QlUsa0JBQWtCO21HQUFsQixrQkFBa0Isa0tBUm5COzs7Ozs7R0FNVDs7NEZBRVUsa0JBQWtCO2tCQVg5QixTQUFTOytCQUNFLGNBQWMsWUFFZDs7Ozs7O0dBTVQ7OEJBUUcsS0FBSztzQkFEUixLQUFLO2dCQVVOLEtBQUs7c0JBREosS0FBSztnQkFJTixJQUFJO3NCQURILEtBQUs7Z0JBSUYsUUFBUTtzQkFEWCxXQUFXO3VCQUFDLE9BQU87O0FB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QyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBQ0QsWUFBWSxDQUFDLEtBQTZCO1FBQ3hDLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtTQUNGO0lBQ0gsQ0FBQzsrR0FqQ1Usc0JBQXNCO21HQUF0QixzQkFBc0IseUhBQ2hCLHFCQUFxQixRQUFVLFdBQVcsa0RBRTFDLG1CQUFtQixRQUFVLFdBQVc7OzRGQUg5QyxzQkFBc0I7a0JBSGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCO3VHQUdRLGlCQUFpQjtzQkFEdkIsZUFBZTt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7Z0JBR3RELGVBQWU7c0JBRHJCLGVBQWU7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2dCQVV2RCxTQUFTO3NCQURaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbG9hZGluZycsXG4gIHN0eWxlVXJsczogWycuL0xvYWRpbmcuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTG9hZGluZ0VsZW1lbnQge1xuICAvKipcbiAgICogKipkZXByZWNhdGVkKiogcGxlYXNlIHVzZSBgY29sb3JgLlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKiovXG4gIEBJbnB1dCgpXG4gIHNldCB0aGVtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc29sZS53YXJuKGAndGhlbWUnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJ2NvbG9yJy5gKTtcbiAgICB0aGlzLmNvbG9yID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHRoZW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3I7XG4gIH1cblxuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNpemU6IHN0cmluZyA9ICdtZWRpdW0nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfY2xhc3MoKSB7XG4gICAgcmV0dXJuIFtgY29sb3ItJHt0aGlzLmNvbG9yfWAsIGBzaXplLSR7dGhpcy5zaXplfWBdLmpvaW4oJyAnKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNwaW5uZXInLFxuICBzdHlsZVVybHM6IFsnLi9Ob3ZvU3Bpbm5lci5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImRvdDEgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDIgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDMgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDQgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDUgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDYgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDcgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDggZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDkgZG90XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdDEwIGRvdFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkb3QxMSBkb3RcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZG90MTIgZG90XCI+PC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TcGlubmVyRWxlbWVudCB7XG4gIC8qKlxuICAgKiAqKmRlcHJlY2F0ZWQqKiBwbGVhc2UgdXNlIGBjb2xvcmAuXG4gICAqIEBkZXByZWNhdGVkXG4gICAqKi9cbiAgQElucHV0KClcbiAgc2V0IHRoZW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLndhcm4oYCd0aGVtZScgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnY29sb3InLmApO1xuICAgIHRoaXMuY29sb3IgPSB2YWx1ZTtcbiAgfVxuICBnZXQgdGhlbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb2xvcjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGNvbG9yOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2l6ZTogc3RyaW5nID0gJ21lZGl1bSc7XG5cbiAgcHJpdmF0ZSBfaW52ZXJzZTogYm9vbGVhbjtcbiAgZ2V0IGludmVyc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ludmVyc2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGludmVyc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pbnZlcnNlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfY2xhc3MoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmludmVyc2UgPyAnY29sb3Itd2hpdGUnIDogYGNvbG9yLSR7dGhpcy5jb2xvcn1gLCBgc2l6ZS0ke3RoaXMuc2l6ZX1gXS5qb2luKCcgJyk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NrZWxldG9uXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ta2VsZXRvbkRpcmVjdGl2ZSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2tlbGV0b24nKVxuICBza2VsZXRvbjogYm9vbGVhbiA9IHRydWU7XG59XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbG9hZGVkXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Mb2FkZWREaXJlY3RpdmUge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2lzTG9hZGluZ10nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXNMb2FkaW5nRGlyZWN0aXZlIHtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvU2tlbGV0b25EaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSlcbiAgcHVibGljIHNrZWxldG9uVGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0xvYWRlZERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KVxuICBwdWJsaWMgbG9hZGVkVGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgcHJpdmF0ZSBoYXNWaWV3ID0gZmFsc2U7XG4gIHByaXZhdGUgc2tlbGV0b25WaWV3czogRW1iZWRkZWRWaWV3UmVmPE5vdm9Ta2VsZXRvbkRpcmVjdGl2ZT5bXSA9IFtdO1xuICBwcml2YXRlIGxvYWRlZFZpZXdzOiBFbWJlZGRlZFZpZXdSZWY8Tm92b0xvYWRlZERpcmVjdGl2ZT5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cblxuICBASW5wdXQoKVxuICBzZXQgaXNMb2FkaW5nKGNvbmRpdGlvbjogYm9vbGVhbikge1xuICAgIGlmICghY29uZGl0aW9uICYmICF0aGlzLmhhc1ZpZXcpIHtcbiAgICAgIHRoaXMuZGVzdHJveVZpZXdzKHRoaXMubG9hZGVkVmlld3MpO1xuICAgICAgdGhpcy5za2VsZXRvblZpZXdzID0gdGhpcy5jcmVhdGVWaWV3cyh0aGlzLnNrZWxldG9uVGVtcGxhdGVzKTtcbiAgICAgIHRoaXMuaGFzVmlldyA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChjb25kaXRpb24gJiYgdGhpcy5oYXNWaWV3KSB7XG4gICAgICB0aGlzLmRlc3Ryb3lWaWV3cyh0aGlzLnNrZWxldG9uVmlld3MpO1xuICAgICAgdGhpcy5sb2FkZWRWaWV3cyA9IHRoaXMuY3JlYXRlVmlld3ModGhpcy5sb2FkZWRUZW1wbGF0ZXMpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGNyZWF0ZVZpZXdzKHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+KSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlcyAmJiB0ZW1wbGF0ZXMubWFwKCh2LCBpKSA9PiB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHYsIG51bGwsIGkpKTtcbiAgfVxuICBkZXN0cm95Vmlld3Modmlld3M6IEVtYmVkZGVkVmlld1JlZjxhbnk+W10pIHtcbiAgICBpZiAodmlld3MpIHtcbiAgICAgIGZvciAoY29uc3QgdmlldyBvZiB2aWV3cykge1xuICAgICAgICB2aWV3LmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==