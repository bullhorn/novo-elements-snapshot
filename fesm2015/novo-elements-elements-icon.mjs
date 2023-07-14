import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, HostBinding, Input, NgModule } from '@angular/core';
import { BooleanInput } from 'novo-elements/utils';
import * as i1 from '@angular/cdk/observers';
import { ObserversModule } from '@angular/cdk/observers';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
class NovoIconComponent {
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.shape = 'box';
        this.role = 'img';
    }
    set alt(value) {
        this.ariaLabel = value;
    }
    get alt() {
        return this.ariaLabel;
    }
    set name(iconName) {
        this.iconName = `bhi-${iconName}`;
    }
    get name() {
        return this.iconName;
    }
    get hb_classBinding() {
        return [this.color ? `text-color-${this.color}` : null, this.size ? `text-size-${this.size}` : null].filter(Boolean).join(' ');
    }
    ngAfterViewInit() {
        if (this.element.nativeElement.textContent.trim()) {
            Promise.resolve().then(() => {
                this.name = this.element.nativeElement.textContent.trim();
                this.cdr.markForCheck();
            });
        }
    }
    projectContentChanged(record) {
        this.name = this.element.nativeElement.textContent.trim();
        this.cdr.detectChanges();
    }
}
NovoIconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIconComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoIconComponent, selector: "novo-icon", inputs: { raised: "raised", theme: "theme", shape: "shape", color: "color", size: "size", smaller: "smaller", larger: "larger", alt: "alt", name: "name" }, host: { properties: { "class.novo-icon-raised": "this.raised", "attr.theme": "this.theme", "attr.shape": "this.shape", "attr.role": "this.role", "attr.aria-label": "this.ariaLabel", "class.icon-size-smaller": "this.smaller", "class.icon-size-larger": "this.larger", "class": "this.hb_classBinding" }, classAttribute: "novo-icon" }, ngImport: i0, template: `
    <i [class]="iconName"
      ><span (cdkObserveContent)="projectContentChanged($event)"><ng-content></ng-content></span
    ></i>
  `, isInline: true, directives: [{ type: i1.CdkObserveContent, selector: "[cdkObserveContent]", inputs: ["cdkObserveContentDisabled", "debounce"], outputs: ["cdkObserveContent"], exportAs: ["cdkObserveContent"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoIconComponent.prototype, "smaller", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoIconComponent.prototype, "larger", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIconComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-icon',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <i [class]="iconName"
      ><span (cdkObserveContent)="projectContentChanged($event)"><ng-content></ng-content></span
    ></i>
  `,
                    host: {
                        class: 'novo-icon',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { raised: [{
                type: HostBinding,
                args: ['class.novo-icon-raised']
            }, {
                type: Input
            }], theme: [{
                type: HostBinding,
                args: ['attr.theme']
            }, {
                type: Input
            }], shape: [{
                type: HostBinding,
                args: ['attr.shape']
            }, {
                type: Input
            }], color: [{
                type: Input
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], ariaLabel: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], size: [{
                type: Input
            }], smaller: [{
                type: HostBinding,
                args: ['class.icon-size-smaller']
            }, {
                type: Input
            }], larger: [{
                type: HostBinding,
                args: ['class.icon-size-larger']
            }, {
                type: Input
            }], alt: [{
                type: Input
            }], name: [{
                type: Input
            }], hb_classBinding: [{
                type: HostBinding,
                args: ['class']
            }] } });

class NovoIconModule {
}
NovoIconModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIconModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoIconModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIconModule, declarations: [NovoIconComponent], imports: [ObserversModule], exports: [NovoIconComponent] });
NovoIconModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIconModule, imports: [[ObserversModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIconModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ObserversModule],
                    exports: [NovoIconComponent],
                    declarations: [NovoIconComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoIconComponent, NovoIconModule };
//# sourceMappingURL=novo-elements-elements-icon.mjs.map
