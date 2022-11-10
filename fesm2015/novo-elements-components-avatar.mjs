import * as i0 from '@angular/core';
import { Component, Input, HostBinding, ViewChildren, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

// NG2
class NovoAvatarElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.size = 'medium';
        this.shape = 'round';
    }
    get hb_classBinding() {
        return [`avatar-size-${this.size}`, `avatar-shape-${this.shape}`, `avatar-color-${this.color}`];
    }
    get background() {
        if (!this.image && !this.source.profileImage)
            return;
        return `url(${this.image || this.source.profileImage})`;
    }
    ngOnInit() {
        let src;
        if ((this.source && this.source !== '') || this.label) {
            if (this.source.profileImage) {
                // this.src = this.source.profileImage;
                return;
            }
            else if (this.source.logo) {
                src = this.source.logo;
            }
            else {
                const first = this.label || this.source.firstName
                    ? this.source.firstName.charAt(0)
                    : this.source.name
                        ? this.source.name.charAt(0)
                        : this.source.username
                            ? this.source.username.charAt(0)
                            : '';
                const last = this.source.lastName ? this.source.lastName.charAt(0) : '';
                // Defining Colors
                const colors = [
                    '#1abc9c',
                    '#16a085',
                    '#f1c40f',
                    '#f39c12',
                    '#2ecc71',
                    '#27ae60',
                    '#e67e22',
                    '#d35400',
                    '#3498db',
                    '#2980b9',
                    '#e74c3c',
                    '#c0392b',
                    '#9b59b6',
                    '#8e44ad',
                    '#bdc3c7',
                    '#34495e',
                    '#2c3e50',
                    '#95a5a6',
                    '#7f8c8d',
                    '#ec87bf',
                    '#d870ad',
                    '#f69785',
                    '#9ba37e',
                    '#b49255',
                    '#b49255',
                    '#a94136',
                ];
                const lighterColors = [
                    '#15D6B0',
                    '#16A069',
                    '#F1D60F',
                    '#F3AC12',
                    '#2ED85B',
                    '#28BC7F',
                    '#E66322',
                    '#D3002B',
                    '#6534DB',
                    '#29B2B9',
                    '#E73C63',
                    '#DB6D31',
                    '#CB48B5',
                    '#6944AD',
                    '#38536D',
                    '#3D6473',
                    '#394A6C',
                    '#92BCB7',
                    '#7D99A2',
                    '#F14F76',
                    '#CB5CDA',
                    '#FFB475',
                    '#B9CE6E',
                    '#DDAA4F',
                    '#CD6F45',
                    '#B9354A',
                ];
                const settings = {
                    // Default settings
                    textColor: '#ffffff',
                    height: 100,
                    width: 100,
                    fontSize: 50,
                    fontWeight: 400,
                    fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
                };
                // making the text object
                const colorIndex = Math.floor((first.charCodeAt(0) - 65) % colors.length);
                const cobj = document.createElement('text');
                cobj.setAttribute('text-anchor', 'middle');
                cobj.setAttribute('x', '50%');
                cobj.setAttribute('y', '50%');
                cobj.setAttribute('dy', '0.35em');
                cobj.setAttribute('pointer-events', 'auto');
                cobj.setAttribute('fill', settings.textColor);
                cobj.setAttribute('font-family', settings.fontFamily);
                cobj.style.fontWeight = settings.fontWeight;
                cobj.style.fontSize = `${settings.fontSize}px`;
                const ltrs = document.createTextNode(this.label || first + last);
                cobj.appendChild(ltrs);
                const svg = document.createElement('svg');
                svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                svg.setAttribute('pointer-events', 'none');
                svg.setAttribute('width', settings.width);
                svg.setAttribute('height', settings.height);
                // this.setPrefixedValue(svg, 'background', colors[colorIndex]);
                this.setPrefixedValue(svg, 'background', `linear-gradient(-45deg, ${colors[colorIndex]} 0%, ${lighterColors[colorIndex]} 100%)`);
                svg.style.width = `${settings.width}px`;
                svg.style.height = `${settings.height}px`;
                svg.appendChild(cobj);
                const top = document.createElement('div');
                top.appendChild(svg);
                const svgHtml = window.btoa(unescape(encodeURIComponent(top.innerHTML)));
                src = `data:image/svg+xml;base64, ${svgHtml}`;
            }
            this.src = this.sanitizer.bypassSecurityTrustUrl(src);
        }
    }
    setPrefixedValue(elm, prop, value) {
        const prefixes = ['-moz-', '-webkit-', '-o-', '-ms-', '-khtml-'];
        // Clear
        elm.style[prop] = '';
        const starting = elm.style[prop];
        // Try raw first
        try {
            elm.style[prop] = value;
            if (elm.style[prop] !== starting) {
                return;
            }
        }
        catch (e) {
            // no op
        }
        // Try prefixes
        for (let i = 0; i < prefixes.length; ++i) {
            const v = prefixes[i] + value;
            try {
                elm.style[prop] = v;
                if (elm.style[prop] !== starting) {
                    return;
                }
            }
            catch (e2) {
                // no op
            }
        }
    }
    _isValidURL(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
}
NovoAvatarElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoAvatarElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAvatarElement, selector: "novo-avatar", inputs: { source: "source", label: "label", theme: "theme", image: "image", size: "size", shape: "shape", color: "color" }, host: { properties: { "class": "this.hb_classBinding", "style.backgroundImage": "this.background" } }, ngImport: i0, template: '<img *ngIf="src" [src]="src"/>', isInline: true, styles: [":host{background-color:var(--color-background-muted);box-shadow:var(--avatar-shadow);border:1px solid var(--avatar-color-border);display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:.4em}:host.avatar-color-person{color:getContrastColor(\"person\");background-color:var(--color-person)}:host.avatar-color-company{color:getContrastColor(\"company\");background-color:var(--color-company)}:host.avatar-color-candidate{color:getContrastColor(\"candidate\");background-color:var(--color-candidate)}:host.avatar-color-lead{color:getContrastColor(\"lead\");background-color:var(--color-lead)}:host.avatar-color-contact{color:getContrastColor(\"contact\");background-color:var(--color-contact)}:host.avatar-color-clientcontact{color:getContrastColor(\"clientcontact\");background-color:var(--color-clientcontact)}:host.avatar-color-opportunity{color:getContrastColor(\"opportunity\");background-color:var(--color-opportunity)}:host.avatar-color-job{color:getContrastColor(\"job\");background-color:var(--color-job)}:host.avatar-color-joborder{color:getContrastColor(\"joborder\");background-color:var(--color-joborder)}:host.avatar-color-submission{color:getContrastColor(\"submission\");background-color:var(--color-submission)}:host.avatar-color-sendout{color:getContrastColor(\"sendout\");background-color:var(--color-sendout)}:host.avatar-color-placement{color:getContrastColor(\"placement\");background-color:var(--color-placement)}:host.avatar-color-note{color:getContrastColor(\"note\");background-color:var(--color-note)}:host.avatar-color-task{color:getContrastColor(\"task\");background-color:var(--color-task)}:host.avatar-color-distribution-list{color:getContrastColor(\"distribution-list\");background-color:var(--color-distribution-list)}:host.avatar-color-credential{color:getContrastColor(\"credential\");background-color:var(--color-credential)}:host.avatar-color-user{color:getContrastColor(\"user\");background-color:var(--color-user)}:host.avatar-color-corporate-user{color:getContrastColor(\"corporate-user\");background-color:var(--color-corporate-user)}:host.avatar-color-contract{color:getContrastColor(\"contract\");background-color:var(--color-contract)}:host.avatar-color-job-code{color:getContrastColor(\"job-code\");background-color:var(--color-job-code)}:host.avatar-color-earn-code{color:getContrastColor(\"earn-code\");background-color:var(--color-earn-code)}:host.avatar-color-billable-charge{color:getContrastColor(\"billable-charge\");background-color:var(--color-billable-charge)}:host.avatar-color-payable-charge{color:getContrastColor(\"payable-charge\");background-color:var(--color-payable-charge)}:host.avatar-color-invoice-statement{color:getContrastColor(\"invoice-statement\");background-color:var(--color-invoice-statement)}:host.avatar-color-selection{color:getContrastColor(\"selection\");background-color:var(--color-selection)}:host.avatar-color-positive{color:getContrastColor(\"positive\");background-color:var(--color-positive)}:host.avatar-color-success{color:getContrastColor(\"success\");background-color:var(--color-success)}:host.avatar-color-warning{color:getContrastColor(\"warning\");background-color:var(--color-warning)}:host.avatar-color-error{color:getContrastColor(\"error\");background-color:var(--color-error)}:host.avatar-color-info{color:getContrastColor(\"info\");background-color:var(--color-info)}:host.avatar-color-disabled{color:getContrastColor(\"disabled\");background-color:var(--color-disabled)}:host.avatar-color-red{color:getContrastColor(\"red\");background-color:var(--palette-red-50)}:host.avatar-color-pink{color:getContrastColor(\"pink\");background-color:var(--palette-pink-50)}:host.avatar-color-orange{color:getContrastColor(\"orange\");background-color:var(--palette-orange-50)}:host.avatar-color-yellow{color:getContrastColor(\"yellow\");background-color:var(--palette-yellow-50)}:host.avatar-color-green{color:getContrastColor(\"green\");background-color:var(--palette-green-50)}:host.avatar-color-teal{color:getContrastColor(\"teal\");background-color:var(--palette-teal-50)}:host.avatar-color-blue{color:getContrastColor(\"blue\");background-color:var(--palette-blue-50)}:host.avatar-color-aqua{color:getContrastColor(\"aqua\");background-color:var(--palette-aqua-50)}:host.avatar-color-indigo{color:getContrastColor(\"indigo\");background-color:var(--palette-indigo-50)}:host.avatar-color-violet{color:getContrastColor(\"violet\");background-color:var(--palette-violet-50)}:host.avatar-color-gray{color:getContrastColor(\"gray\");background-color:var(--palette-gray-50)}:host(.menu-active){box-shadow:0 0 4px 1px var(--color-selection)}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar', template: '<img *ngIf="src" [src]="src"/>', styles: [":host{background-color:var(--color-background-muted);box-shadow:var(--avatar-shadow);border:1px solid var(--avatar-color-border);display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:.4em}:host.avatar-color-person{color:getContrastColor(\"person\");background-color:var(--color-person)}:host.avatar-color-company{color:getContrastColor(\"company\");background-color:var(--color-company)}:host.avatar-color-candidate{color:getContrastColor(\"candidate\");background-color:var(--color-candidate)}:host.avatar-color-lead{color:getContrastColor(\"lead\");background-color:var(--color-lead)}:host.avatar-color-contact{color:getContrastColor(\"contact\");background-color:var(--color-contact)}:host.avatar-color-clientcontact{color:getContrastColor(\"clientcontact\");background-color:var(--color-clientcontact)}:host.avatar-color-opportunity{color:getContrastColor(\"opportunity\");background-color:var(--color-opportunity)}:host.avatar-color-job{color:getContrastColor(\"job\");background-color:var(--color-job)}:host.avatar-color-joborder{color:getContrastColor(\"joborder\");background-color:var(--color-joborder)}:host.avatar-color-submission{color:getContrastColor(\"submission\");background-color:var(--color-submission)}:host.avatar-color-sendout{color:getContrastColor(\"sendout\");background-color:var(--color-sendout)}:host.avatar-color-placement{color:getContrastColor(\"placement\");background-color:var(--color-placement)}:host.avatar-color-note{color:getContrastColor(\"note\");background-color:var(--color-note)}:host.avatar-color-task{color:getContrastColor(\"task\");background-color:var(--color-task)}:host.avatar-color-distribution-list{color:getContrastColor(\"distribution-list\");background-color:var(--color-distribution-list)}:host.avatar-color-credential{color:getContrastColor(\"credential\");background-color:var(--color-credential)}:host.avatar-color-user{color:getContrastColor(\"user\");background-color:var(--color-user)}:host.avatar-color-corporate-user{color:getContrastColor(\"corporate-user\");background-color:var(--color-corporate-user)}:host.avatar-color-contract{color:getContrastColor(\"contract\");background-color:var(--color-contract)}:host.avatar-color-job-code{color:getContrastColor(\"job-code\");background-color:var(--color-job-code)}:host.avatar-color-earn-code{color:getContrastColor(\"earn-code\");background-color:var(--color-earn-code)}:host.avatar-color-billable-charge{color:getContrastColor(\"billable-charge\");background-color:var(--color-billable-charge)}:host.avatar-color-payable-charge{color:getContrastColor(\"payable-charge\");background-color:var(--color-payable-charge)}:host.avatar-color-invoice-statement{color:getContrastColor(\"invoice-statement\");background-color:var(--color-invoice-statement)}:host.avatar-color-selection{color:getContrastColor(\"selection\");background-color:var(--color-selection)}:host.avatar-color-positive{color:getContrastColor(\"positive\");background-color:var(--color-positive)}:host.avatar-color-success{color:getContrastColor(\"success\");background-color:var(--color-success)}:host.avatar-color-warning{color:getContrastColor(\"warning\");background-color:var(--color-warning)}:host.avatar-color-error{color:getContrastColor(\"error\");background-color:var(--color-error)}:host.avatar-color-info{color:getContrastColor(\"info\");background-color:var(--color-info)}:host.avatar-color-disabled{color:getContrastColor(\"disabled\");background-color:var(--color-disabled)}:host.avatar-color-red{color:getContrastColor(\"red\");background-color:var(--palette-red-50)}:host.avatar-color-pink{color:getContrastColor(\"pink\");background-color:var(--palette-pink-50)}:host.avatar-color-orange{color:getContrastColor(\"orange\");background-color:var(--palette-orange-50)}:host.avatar-color-yellow{color:getContrastColor(\"yellow\");background-color:var(--palette-yellow-50)}:host.avatar-color-green{color:getContrastColor(\"green\");background-color:var(--palette-green-50)}:host.avatar-color-teal{color:getContrastColor(\"teal\");background-color:var(--palette-teal-50)}:host.avatar-color-blue{color:getContrastColor(\"blue\");background-color:var(--palette-blue-50)}:host.avatar-color-aqua{color:getContrastColor(\"aqua\");background-color:var(--palette-aqua-50)}:host.avatar-color-indigo{color:getContrastColor(\"indigo\");background-color:var(--palette-indigo-50)}:host.avatar-color-violet{color:getContrastColor(\"violet\");background-color:var(--palette-violet-50)}:host.avatar-color-gray{color:getContrastColor(\"gray\");background-color:var(--palette-gray-50)}:host(.menu-active){box-shadow:0 0 4px 1px var(--color-selection)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; }, propDecorators: { source: [{
                type: Input
            }], label: [{
                type: Input
            }], theme: [{
                type: Input
            }], image: [{
                type: Input
            }], size: [{
                type: Input
            }], shape: [{
                type: Input
            }], color: [{
                type: Input
            }], hb_classBinding: [{
                type: HostBinding,
                args: ['class']
            }], background: [{
                type: HostBinding,
                args: ['style.backgroundImage']
            }] } });

// NG2
class NovoAvatarStackElement {
    constructor() {
        this.total = 0;
        this.showTotal = false;
        this.remainingCount = 0;
    }
    ngAfterViewInit() {
        // viewChildren is set
        if (this.total - this.viewChildren.length > 0) {
            this.remainingCount = this.total - this.viewChildren.length;
            this.showTotal = true;
        }
    }
}
NovoAvatarStackElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarStackElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAvatarStackElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAvatarStackElement, selector: "novo-avatar-stack", inputs: { total: "total" }, viewQueries: [{ propertyName: "viewChildren", predicate: NovoAvatarElement, descendants: true }], ngImport: i0, template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `, isInline: true, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid var(--color-border)}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"], components: [{ type: NovoAvatarElement, selector: "novo-avatar", inputs: ["source", "label", "theme", "image", "size", "shape", "color"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarStackElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar-stack', template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid var(--color-border)}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"] }]
        }], propDecorators: { total: [{
                type: Input
            }], viewChildren: [{
                type: ViewChildren,
                args: [NovoAvatarElement]
            }] } });

// NG2
class NovoAvatarModule {
}
NovoAvatarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoAvatarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarModule, declarations: [NovoAvatarElement, NovoAvatarStackElement], imports: [CommonModule], exports: [NovoAvatarElement, NovoAvatarStackElement] });
NovoAvatarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoAvatarElement, NovoAvatarStackElement],
                    exports: [NovoAvatarElement, NovoAvatarStackElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoAvatarElement, NovoAvatarModule, NovoAvatarStackElement };
//# sourceMappingURL=novo-elements-components-avatar.mjs.map
