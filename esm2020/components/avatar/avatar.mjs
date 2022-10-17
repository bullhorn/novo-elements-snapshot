// NG2
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
export class NovoAvatarElement {
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
NovoAvatarElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAvatarElement, selector: "novo-avatar", inputs: { source: "source", label: "label", theme: "theme", image: "image", size: "size", shape: "shape", color: "color" }, host: { properties: { "class": "this.hb_classBinding", "style.backgroundImage": "this.background" } }, ngImport: i0, template: '<img *ngIf="src" [src]="src"/>', isInline: true, styles: [":host{display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative;background-color:var(--color-background-muted)}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:.4em}:host.avatar-color-person{color:getContrastColor(\"person\");background-color:var(--color-person)}:host.avatar-color-company{color:getContrastColor(\"company\");background-color:var(--color-company)}:host.avatar-color-candidate{color:getContrastColor(\"candidate\");background-color:var(--color-candidate)}:host.avatar-color-lead{color:getContrastColor(\"lead\");background-color:var(--color-lead)}:host.avatar-color-contact{color:getContrastColor(\"contact\");background-color:var(--color-contact)}:host.avatar-color-clientcontact{color:getContrastColor(\"clientcontact\");background-color:var(--color-clientcontact)}:host.avatar-color-opportunity{color:getContrastColor(\"opportunity\");background-color:var(--color-opportunity)}:host.avatar-color-job{color:getContrastColor(\"job\");background-color:var(--color-job)}:host.avatar-color-joborder{color:getContrastColor(\"joborder\");background-color:var(--color-joborder)}:host.avatar-color-submission{color:getContrastColor(\"submission\");background-color:var(--color-submission)}:host.avatar-color-sendout{color:getContrastColor(\"sendout\");background-color:var(--color-sendout)}:host.avatar-color-placement{color:getContrastColor(\"placement\");background-color:var(--color-placement)}:host.avatar-color-note{color:getContrastColor(\"note\");background-color:var(--color-note)}:host.avatar-color-task{color:getContrastColor(\"task\");background-color:var(--color-task)}:host.avatar-color-distribution-list{color:getContrastColor(\"distribution-list\");background-color:var(--color-distribution-list)}:host.avatar-color-credential{color:getContrastColor(\"credential\");background-color:var(--color-credential)}:host.avatar-color-user{color:getContrastColor(\"user\");background-color:var(--color-user)}:host.avatar-color-corporate-user{color:getContrastColor(\"corporate-user\");background-color:var(--color-corporate-user)}:host.avatar-color-contract{color:getContrastColor(\"contract\");background-color:var(--color-contract)}:host.avatar-color-job-code{color:getContrastColor(\"job-code\");background-color:var(--color-job-code)}:host.avatar-color-earn-code{color:getContrastColor(\"earn-code\");background-color:var(--color-earn-code)}:host.avatar-color-billable-charge{color:getContrastColor(\"billable-charge\");background-color:var(--color-billable-charge)}:host.avatar-color-payable-charge{color:getContrastColor(\"payable-charge\");background-color:var(--color-payable-charge)}:host.avatar-color-invoice-statement{color:getContrastColor(\"invoice-statement\");background-color:var(--color-invoice-statement)}:host.avatar-color-selection{color:getContrastColor(\"selection\");background-color:var(--color-selection)}:host.avatar-color-positive{color:getContrastColor(\"positive\");background-color:var(--color-positive)}:host.avatar-color-success{color:getContrastColor(\"success\");background-color:var(--color-success)}:host.avatar-color-warning{color:getContrastColor(\"warning\");background-color:var(--color-warning)}:host.avatar-color-error{color:getContrastColor(\"error\");background-color:var(--color-error)}:host.avatar-color-info{color:getContrastColor(\"info\");background-color:var(--color-info)}:host.avatar-color-disabled{color:getContrastColor(\"disabled\");background-color:var(--color-disabled)}:host.avatar-color-red{color:getContrastColor(\"red\");background-color:var(--palette-red-50)}:host.avatar-color-pink{color:getContrastColor(\"pink\");background-color:var(--palette-pink-50)}:host.avatar-color-orange{color:getContrastColor(\"orange\");background-color:var(--palette-orange-50)}:host.avatar-color-yellow{color:getContrastColor(\"yellow\");background-color:var(--palette-yellow-50)}:host.avatar-color-green{color:getContrastColor(\"green\");background-color:var(--palette-green-50)}:host.avatar-color-teal{color:getContrastColor(\"teal\");background-color:var(--palette-teal-50)}:host.avatar-color-blue{color:getContrastColor(\"blue\");background-color:var(--palette-blue-50)}:host.avatar-color-aqua{color:getContrastColor(\"aqua\");background-color:var(--palette-aqua-50)}:host.avatar-color-indigo{color:getContrastColor(\"indigo\");background-color:var(--palette-indigo-50)}:host.avatar-color-violet{color:getContrastColor(\"violet\");background-color:var(--palette-violet-50)}:host.avatar-color-gray{color:getContrastColor(\"gray\");background-color:var(--palette-gray-50)}:host(.menu-active){box-shadow:0 0 4px 1px var(--color-selection)}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAvatarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar', template: '<img *ngIf="src" [src]="src"/>', styles: [":host{display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative;background-color:var(--color-background-muted)}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:.4em}:host.avatar-color-person{color:getContrastColor(\"person\");background-color:var(--color-person)}:host.avatar-color-company{color:getContrastColor(\"company\");background-color:var(--color-company)}:host.avatar-color-candidate{color:getContrastColor(\"candidate\");background-color:var(--color-candidate)}:host.avatar-color-lead{color:getContrastColor(\"lead\");background-color:var(--color-lead)}:host.avatar-color-contact{color:getContrastColor(\"contact\");background-color:var(--color-contact)}:host.avatar-color-clientcontact{color:getContrastColor(\"clientcontact\");background-color:var(--color-clientcontact)}:host.avatar-color-opportunity{color:getContrastColor(\"opportunity\");background-color:var(--color-opportunity)}:host.avatar-color-job{color:getContrastColor(\"job\");background-color:var(--color-job)}:host.avatar-color-joborder{color:getContrastColor(\"joborder\");background-color:var(--color-joborder)}:host.avatar-color-submission{color:getContrastColor(\"submission\");background-color:var(--color-submission)}:host.avatar-color-sendout{color:getContrastColor(\"sendout\");background-color:var(--color-sendout)}:host.avatar-color-placement{color:getContrastColor(\"placement\");background-color:var(--color-placement)}:host.avatar-color-note{color:getContrastColor(\"note\");background-color:var(--color-note)}:host.avatar-color-task{color:getContrastColor(\"task\");background-color:var(--color-task)}:host.avatar-color-distribution-list{color:getContrastColor(\"distribution-list\");background-color:var(--color-distribution-list)}:host.avatar-color-credential{color:getContrastColor(\"credential\");background-color:var(--color-credential)}:host.avatar-color-user{color:getContrastColor(\"user\");background-color:var(--color-user)}:host.avatar-color-corporate-user{color:getContrastColor(\"corporate-user\");background-color:var(--color-corporate-user)}:host.avatar-color-contract{color:getContrastColor(\"contract\");background-color:var(--color-contract)}:host.avatar-color-job-code{color:getContrastColor(\"job-code\");background-color:var(--color-job-code)}:host.avatar-color-earn-code{color:getContrastColor(\"earn-code\");background-color:var(--color-earn-code)}:host.avatar-color-billable-charge{color:getContrastColor(\"billable-charge\");background-color:var(--color-billable-charge)}:host.avatar-color-payable-charge{color:getContrastColor(\"payable-charge\");background-color:var(--color-payable-charge)}:host.avatar-color-invoice-statement{color:getContrastColor(\"invoice-statement\");background-color:var(--color-invoice-statement)}:host.avatar-color-selection{color:getContrastColor(\"selection\");background-color:var(--color-selection)}:host.avatar-color-positive{color:getContrastColor(\"positive\");background-color:var(--color-positive)}:host.avatar-color-success{color:getContrastColor(\"success\");background-color:var(--color-success)}:host.avatar-color-warning{color:getContrastColor(\"warning\");background-color:var(--color-warning)}:host.avatar-color-error{color:getContrastColor(\"error\");background-color:var(--color-error)}:host.avatar-color-info{color:getContrastColor(\"info\");background-color:var(--color-info)}:host.avatar-color-disabled{color:getContrastColor(\"disabled\");background-color:var(--color-disabled)}:host.avatar-color-red{color:getContrastColor(\"red\");background-color:var(--palette-red-50)}:host.avatar-color-pink{color:getContrastColor(\"pink\");background-color:var(--palette-pink-50)}:host.avatar-color-orange{color:getContrastColor(\"orange\");background-color:var(--palette-orange-50)}:host.avatar-color-yellow{color:getContrastColor(\"yellow\");background-color:var(--palette-yellow-50)}:host.avatar-color-green{color:getContrastColor(\"green\");background-color:var(--palette-green-50)}:host.avatar-color-teal{color:getContrastColor(\"teal\");background-color:var(--palette-teal-50)}:host.avatar-color-blue{color:getContrastColor(\"blue\");background-color:var(--palette-blue-50)}:host.avatar-color-aqua{color:getContrastColor(\"aqua\");background-color:var(--palette-aqua-50)}:host.avatar-color-indigo{color:getContrastColor(\"indigo\");background-color:var(--palette-indigo-50)}:host.avatar-color-violet{color:getContrastColor(\"violet\");background-color:var(--palette-violet-50)}:host.avatar-color-gray{color:getContrastColor(\"gray\");background-color:var(--palette-gray-50)}:host(.menu-active){box-shadow:0 0 4px 1px var(--color-selection)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9hdmF0YXIvYXZhdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7O0FBT3pELE1BQU0sT0FBTyxpQkFBaUI7SUE0QjVCLFlBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFyQjNDLFNBQUksR0FBVyxRQUFRLENBQUM7UUFHeEIsVUFBSyxHQUFXLE9BQU8sQ0FBQztJQWtCc0IsQ0FBQztJQWIvQyxJQUNJLGVBQWU7UUFDakIsT0FBTyxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLGdCQUFnQixJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsZ0JBQWdCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRCxJQUNJLFVBQVU7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDckQsT0FBTyxPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQztJQUMxRCxDQUFDO0lBTUQsUUFBUTtRQUNOLElBQUksR0FBUSxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQzVCLHVDQUF1QztnQkFDdkMsT0FBTzthQUNS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QUlGLGVBQWU7c0JBRGxCLFdBQVc7dUJBQUMsT0FBTztnQkFNaEIsVUFBVTtzQkFEYixXQUFXO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYXZhdGFyJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXZhdGFyLnNjc3MnXSxcbiAgdGVtcGxhdGU6ICc8aW1nICpuZ0lmPVwic3JjXCIgW3NyY109XCJzcmNcIi8+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0F2YXRhckVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBzb3VyY2U6IGFueTtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgaW1hZ2U6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzaXplOiBzdHJpbmcgPSAnbWVkaXVtJztcblxuICBASW5wdXQoKVxuICBzaGFwZTogc3RyaW5nID0gJ3JvdW5kJztcblxuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfY2xhc3NCaW5kaW5nKCkge1xuICAgIHJldHVybiBbYGF2YXRhci1zaXplLSR7dGhpcy5zaXplfWAsIGBhdmF0YXItc2hhcGUtJHt0aGlzLnNoYXBlfWAsIGBhdmF0YXItY29sb3ItJHt0aGlzLmNvbG9yfWBdO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5iYWNrZ3JvdW5kSW1hZ2UnKVxuICBnZXQgYmFja2dyb3VuZCgpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5pbWFnZSAmJiAhdGhpcy5zb3VyY2UucHJvZmlsZUltYWdlKSByZXR1cm47XG4gICAgcmV0dXJuIGB1cmwoJHt0aGlzLmltYWdlIHx8IHRoaXMuc291cmNlLnByb2ZpbGVJbWFnZX0pYDtcbiAgfVxuXG4gIHNyYzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgbmdPbkluaXQoKTogYW55IHtcbiAgICBsZXQgc3JjOiBhbnk7XG4gICAgaWYgKCh0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZSAhPT0gJycpIHx8IHRoaXMubGFiZWwpIHtcbiAgICAgIGlmICh0aGlzLnNvdXJjZS5wcm9maWxlSW1hZ2UpIHtcbiAgICAgICAgLy8gdGhpcy5zcmMgPSB0aGlzLnNvdXJjZS5wcm9maWxlSW1hZ2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3VyY2UubG9nbykge1xuICAgICAgICBzcmMgPSB0aGlzLnNvdXJjZS5sb2dvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmlyc3Q6IGFueSA9XG4gICAgICAgICAgdGhpcy5sYWJlbCB8fCB0aGlzLnNvdXJjZS5maXJzdE5hbWVcbiAgICAgICAgICAgID8gdGhpcy5zb3VyY2UuZmlyc3ROYW1lLmNoYXJBdCgwKVxuICAgICAgICAgICAgOiB0aGlzLnNvdXJjZS5uYW1lXG4gICAgICAgICAgICA/IHRoaXMuc291cmNlLm5hbWUuY2hhckF0KDApXG4gICAgICAgICAgICA6IHRoaXMuc291cmNlLnVzZXJuYW1lXG4gICAgICAgICAgICA/IHRoaXMuc291cmNlLnVzZXJuYW1lLmNoYXJBdCgwKVxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgbGFzdDogYW55ID0gdGhpcy5zb3VyY2UubGFzdE5hbWUgPyB0aGlzLnNvdXJjZS5sYXN0TmFtZS5jaGFyQXQoMCkgOiAnJztcblxuICAgICAgICAvLyBEZWZpbmluZyBDb2xvcnNcbiAgICAgICAgY29uc3QgY29sb3JzOiBhbnkgPSBbXG4gICAgICAgICAgJyMxYWJjOWMnLFxuICAgICAgICAgICcjMTZhMDg1JyxcbiAgICAgICAgICAnI2YxYzQwZicsXG4gICAgICAgICAgJyNmMzljMTInLFxuICAgICAgICAgICcjMmVjYzcxJyxcbiAgICAgICAgICAnIzI3YWU2MCcsXG4gICAgICAgICAgJyNlNjdlMjInLFxuICAgICAgICAgICcjZDM1NDAwJyxcbiAgICAgICAgICAnIzM0OThkYicsXG4gICAgICAgICAgJyMyOTgwYjknLFxuICAgICAgICAgICcjZTc0YzNjJyxcbiAgICAgICAgICAnI2MwMzkyYicsXG4gICAgICAgICAgJyM5YjU5YjYnLFxuICAgICAgICAgICcjOGU0NGFkJyxcbiAgICAgICAgICAnI2JkYzNjNycsXG4gICAgICAgICAgJyMzNDQ5NWUnLFxuICAgICAgICAgICcjMmMzZTUwJyxcbiAgICAgICAgICAnIzk1YTVhNicsXG4gICAgICAgICAgJyM3ZjhjOGQnLFxuICAgICAgICAgICcjZWM4N2JmJyxcbiAgICAgICAgICAnI2Q4NzBhZCcsXG4gICAgICAgICAgJyNmNjk3ODUnLFxuICAgICAgICAgICcjOWJhMzdlJyxcbiAgICAgICAgICAnI2I0OTI1NScsXG4gICAgICAgICAgJyNiNDkyNTUnLFxuICAgICAgICAgICcjYTk0MTM2JyxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgbGlnaHRlckNvbG9yczogYW55ID0gW1xuICAgICAgICAgICcjMTVENkIwJyxcbiAgICAgICAgICAnIzE2QTA2OScsXG4gICAgICAgICAgJyNGMUQ2MEYnLFxuICAgICAgICAgICcjRjNBQzEyJyxcbiAgICAgICAgICAnIzJFRDg1QicsXG4gICAgICAgICAgJyMyOEJDN0YnLFxuICAgICAgICAgICcjRTY2MzIyJyxcbiAgICAgICAgICAnI0QzMDAyQicsXG4gICAgICAgICAgJyM2NTM0REInLFxuICAgICAgICAgICcjMjlCMkI5JyxcbiAgICAgICAgICAnI0U3M0M2MycsXG4gICAgICAgICAgJyNEQjZEMzEnLFxuICAgICAgICAgICcjQ0I0OEI1JyxcbiAgICAgICAgICAnIzY5NDRBRCcsXG4gICAgICAgICAgJyMzODUzNkQnLFxuICAgICAgICAgICcjM0Q2NDczJyxcbiAgICAgICAgICAnIzM5NEE2QycsXG4gICAgICAgICAgJyM5MkJDQjcnLFxuICAgICAgICAgICcjN0Q5OUEyJyxcbiAgICAgICAgICAnI0YxNEY3NicsXG4gICAgICAgICAgJyNDQjVDREEnLFxuICAgICAgICAgICcjRkZCNDc1JyxcbiAgICAgICAgICAnI0I5Q0U2RScsXG4gICAgICAgICAgJyNEREFBNEYnLFxuICAgICAgICAgICcjQ0Q2RjQ1JyxcbiAgICAgICAgICAnI0I5MzU0QScsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNldHRpbmdzOiBhbnkgPSB7XG4gICAgICAgICAgLy8gRGVmYXVsdCBzZXR0aW5nc1xuICAgICAgICAgIHRleHRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICAgIHdpZHRoOiAxMDAsXG4gICAgICAgICAgZm9udFNpemU6IDUwLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhTmV1ZS1MaWdodCxIZWx2ZXRpY2EgTmV1ZSBMaWdodCxIZWx2ZXRpY2EgTmV1ZSxIZWx2ZXRpY2EsIEFyaWFsLEx1Y2lkYSBHcmFuZGUsIHNhbnMtc2VyaWYnLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIG1ha2luZyB0aGUgdGV4dCBvYmplY3RcbiAgICAgICAgY29uc3QgY29sb3JJbmRleDogYW55ID0gTWF0aC5mbG9vcigoZmlyc3QuY2hhckNvZGVBdCgwKSAtIDY1KSAlIGNvbG9ycy5sZW5ndGgpO1xuXG4gICAgICAgIGNvbnN0IGNvYmo6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHQnKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpO1xuICAgICAgICBjb2JqLnNldEF0dHJpYnV0ZSgneCcsICc1MCUnKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ3knLCAnNTAlJyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCdkeScsICcwLjM1ZW0nKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBzZXR0aW5ncy50ZXh0Q29sb3IpO1xuICAgICAgICBjb2JqLnNldEF0dHJpYnV0ZSgnZm9udC1mYW1pbHknLCBzZXR0aW5ncy5mb250RmFtaWx5KTtcbiAgICAgICAgY29iai5zdHlsZS5mb250V2VpZ2h0ID0gc2V0dGluZ3MuZm9udFdlaWdodDtcbiAgICAgICAgY29iai5zdHlsZS5mb250U2l6ZSA9IGAke3NldHRpbmdzLmZvbnRTaXplfXB4YDtcblxuICAgICAgICBjb25zdCBsdHJzOiBhbnkgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmxhYmVsIHx8IGZpcnN0ICsgbGFzdCk7XG4gICAgICAgIGNvYmouYXBwZW5kQ2hpbGQobHRycyk7XG5cbiAgICAgICAgY29uc3Qgc3ZnOiBhbnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNldHRpbmdzLndpZHRoKTtcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jywgc2V0dGluZ3MuaGVpZ2h0KTtcblxuICAgICAgICAvLyB0aGlzLnNldFByZWZpeGVkVmFsdWUoc3ZnLCAnYmFja2dyb3VuZCcsIGNvbG9yc1tjb2xvckluZGV4XSk7XG4gICAgICAgIHRoaXMuc2V0UHJlZml4ZWRWYWx1ZShzdmcsICdiYWNrZ3JvdW5kJywgYGxpbmVhci1ncmFkaWVudCgtNDVkZWcsICR7Y29sb3JzW2NvbG9ySW5kZXhdfSAwJSwgJHtsaWdodGVyQ29sb3JzW2NvbG9ySW5kZXhdfSAxMDAlKWApO1xuXG4gICAgICAgIHN2Zy5zdHlsZS53aWR0aCA9IGAke3NldHRpbmdzLndpZHRofXB4YDtcbiAgICAgICAgc3ZnLnN0eWxlLmhlaWdodCA9IGAke3NldHRpbmdzLmhlaWdodH1weGA7XG4gICAgICAgIHN2Zy5hcHBlbmRDaGlsZChjb2JqKTtcblxuICAgICAgICBjb25zdCB0b3A6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b3AuYXBwZW5kQ2hpbGQoc3ZnKTtcblxuICAgICAgICBjb25zdCBzdmdIdG1sOiBhbnkgPSB3aW5kb3cuYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodG9wLmlubmVySFRNTCkpKTtcbiAgICAgICAgc3JjID0gYGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsICR7c3ZnSHRtbH1gO1xuICAgICAgfVxuICAgICAgdGhpcy5zcmMgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKHNyYyk7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJlZml4ZWRWYWx1ZShlbG06IGFueSwgcHJvcDogYW55LCB2YWx1ZTogYW55KTogYW55IHtcbiAgICBjb25zdCBwcmVmaXhlczogYW55ID0gWyctbW96LScsICctd2Via2l0LScsICctby0nLCAnLW1zLScsICcta2h0bWwtJ107XG5cbiAgICAvLyBDbGVhclxuICAgIGVsbS5zdHlsZVtwcm9wXSA9ICcnO1xuICAgIGNvbnN0IHN0YXJ0aW5nOiBhbnkgPSBlbG0uc3R5bGVbcHJvcF07XG5cbiAgICAvLyBUcnkgcmF3IGZpcnN0XG4gICAgdHJ5IHtcbiAgICAgIGVsbS5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgaWYgKGVsbS5zdHlsZVtwcm9wXSAhPT0gc3RhcnRpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIG5vIG9wXG4gICAgfVxuXG4gICAgLy8gVHJ5IHByZWZpeGVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgdiA9IHByZWZpeGVzW2ldICsgdmFsdWU7XG4gICAgICB0cnkge1xuICAgICAgICBlbG0uc3R5bGVbcHJvcF0gPSB2O1xuICAgICAgICBpZiAoZWxtLnN0eWxlW3Byb3BdICE9PSBzdGFydGluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZTIpIHtcbiAgICAgICAgLy8gbm8gb3BcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc1ZhbGlkVVJMKHN0cjogc3RyaW5nKSB7XG4gICAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoXG4gICAgICAnXihodHRwcz86XFxcXC9cXFxcLyk/JyArIC8vIHByb3RvY29sXG4gICAgICAgICcoKChbYS16XFxcXGRdKFthLXpcXFxcZC1dKlthLXpcXFxcZF0pKilcXFxcLikrW2Etel17Mix9fCcgKyAvLyBkb21haW4gbmFtZVxuICAgICAgICAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJyArIC8vIE9SIGlwICh2NCkgYWRkcmVzc1xuICAgICAgICAnKFxcXFw6XFxcXGQrKT8oXFxcXC9bLWEtelxcXFxkJV8ufitdKikqJyArIC8vIHBvcnQgYW5kIHBhdGhcbiAgICAgICAgJyhcXFxcP1s7JmEtelxcXFxkJV8ufis9LV0qKT8nICsgLy8gcXVlcnkgc3RyaW5nXG4gICAgICAgICcoXFxcXCNbLWEtelxcXFxkX10qKT8kJyxcbiAgICAgICdpJyxcbiAgICApOyAvLyBmcmFnbWVudCBsb2NhdG9yXG4gICAgcmV0dXJuICEhcGF0dGVybi50ZXN0KHN0cik7XG4gIH1cbn1cbiJdfQ==