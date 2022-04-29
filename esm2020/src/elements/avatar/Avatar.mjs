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
NovoAvatarElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoAvatarElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoAvatarElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoAvatarElement, selector: "novo-avatar", inputs: { source: "source", label: "label", theme: "theme", image: "image", size: "size", shape: "shape", color: "color" }, host: { properties: { "class": "this.hb_classBinding", "style.backgroundImage": "this.background" } }, ngImport: i0, template: '<img *ngIf="src" [src]="src"/>', isInline: true, styles: [":host{display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative;background-color:var(--background-muted)}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:.4em}:host.avatar-color-black{color:#fff;background-color:#000}:host.avatar-color-white{color:#3d464d;background-color:#fff}:host.avatar-color-gray{color:#3d464d;background-color:#9e9e9e}:host.avatar-color-grey{color:#3d464d;background-color:#9e9e9e}:host.avatar-color-offWhite{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-bright{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-light{color:#3d464d;background-color:#dbdbdb}:host.avatar-color-neutral{color:#fff;background-color:#4f5361}:host.avatar-color-dark{color:#fff;background-color:#3d464d}:host.avatar-color-orange{color:#3d464d;background-color:#ff6900}:host.avatar-color-navigation{color:#fff;background-color:#202945}:host.avatar-color-skyBlue{color:#fff;background-color:#009bdf}:host.avatar-color-steel{color:#fff;background-color:#5b6770}:host.avatar-color-metal{color:#fff;background-color:#637893}:host.avatar-color-sand{color:#3d464d;background-color:#f4f4f4}:host.avatar-color-silver{color:#3d464d;background-color:#e2e2e2}:host.avatar-color-stone{color:#3d464d;background-color:#bebebe}:host.avatar-color-ash{color:#3d464d;background-color:#a0a0a0}:host.avatar-color-slate{color:#fff;background-color:#707070}:host.avatar-color-onyx{color:#fff;background-color:#526980}:host.avatar-color-charcoal{color:#fff;background-color:#282828}:host.avatar-color-moonlight{color:#fff;background-color:#1a242f}:host.avatar-color-midnight{color:#fff;background-color:#202945}:host.avatar-color-darkness{color:#fff;background-color:#161f27}:host.avatar-color-navy{color:#fff;background-color:#0d2d42}:host.avatar-color-aqua{color:#3d464d;background-color:#3bafda}:host.avatar-color-ocean{color:#fff;background-color:#4a89dc}:host.avatar-color-mint{color:#3d464d;background-color:#37bc9b}:host.avatar-color-grass{color:#fff;background-color:#8cc152}:host.avatar-color-sunflower{color:#fff;background-color:#f6b042}:host.avatar-color-bittersweet{color:#fff;background-color:#eb6845}:host.avatar-color-grapefruit{color:#fff;background-color:#da4453}:host.avatar-color-carnation{color:#fff;background-color:#d770ad}:host.avatar-color-lavender{color:#fff;background-color:#967adc}:host.avatar-color-mountain{color:#fff;background-color:#9678b6}:host.avatar-color-info{color:#fff;background-color:#4a89dc}:host.avatar-color-positive{color:#fff;background-color:#4a89dc}:host.avatar-color-success{color:#fff;background-color:#8cc152}:host.avatar-color-negative{color:#fff;background-color:#da4453}:host.avatar-color-danger{color:#fff;background-color:#da4453}:host.avatar-color-error{color:#fff;background-color:#da4453}:host.avatar-color-warning{color:#fff;background-color:#f6b042}:host.avatar-color-empty{color:#3d464d;background-color:#cccdcc}:host.avatar-color-disabled{color:#3d464d;background-color:#bebebe}:host.avatar-color-background{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-backgroundDark{color:#3d464d;background-color:#e2e2e2}:host.avatar-color-presentation{color:#fff;background-color:#5b6770}:host.avatar-color-bullhorn{color:#3d464d;background-color:#ff6900}:host.avatar-color-pulse{color:#3d464d;background-color:#3bafda}:host.avatar-color-company{color:#fff;background-color:#39d}:host.avatar-color-candidate{color:#fff;background-color:#4b7}:host.avatar-color-lead{color:#fff;background-color:#a69}:host.avatar-color-contact{color:#fff;background-color:#fa4}:host.avatar-color-clientcontact{color:#fff;background-color:#fa4}:host.avatar-color-opportunity{color:#fff;background-color:#625}:host.avatar-color-job{color:#fff;background-color:#b56}:host.avatar-color-joborder{color:#fff;background-color:#b56}:host.avatar-color-submission{color:#3d464d;background-color:#a9adbb}:host.avatar-color-sendout{color:#fff;background-color:#747884}:host.avatar-color-placement{color:#fff;background-color:#0b344f}:host.avatar-color-note{color:#fff;background-color:#747884}:host.avatar-color-contract{color:#fff;background-color:#454ea0}:host.avatar-color-jobCode{color:#fff;background-color:#696d79}:host.avatar-color-earnCode{color:#fff;background-color:#696d79}:host.avatar-color-invoiceStatement{color:#fff;background-color:#696d79}:host.avatar-color-billableCharge{color:#fff;background-color:#696d79}:host.avatar-color-payableCharge{color:#fff;background-color:#696d79}:host.avatar-color-user{color:#fff;background-color:#696d79}:host.avatar-color-corporateUser{color:#fff;background-color:#696d79}:host.avatar-color-distributionList{color:#fff;background-color:#696d79}:host.avatar-color-credential{color:#fff;background-color:#696d79}:host.avatar-color-person{color:#fff;background-color:#696d79}:host(.menu-active){box-shadow:0 0 4px 1px var(--selection)}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoAvatarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar', template: '<img *ngIf="src" [src]="src"/>', styles: [":host{display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative;background-color:var(--background-muted)}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:.4em}:host.avatar-color-black{color:#fff;background-color:#000}:host.avatar-color-white{color:#3d464d;background-color:#fff}:host.avatar-color-gray{color:#3d464d;background-color:#9e9e9e}:host.avatar-color-grey{color:#3d464d;background-color:#9e9e9e}:host.avatar-color-offWhite{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-bright{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-light{color:#3d464d;background-color:#dbdbdb}:host.avatar-color-neutral{color:#fff;background-color:#4f5361}:host.avatar-color-dark{color:#fff;background-color:#3d464d}:host.avatar-color-orange{color:#3d464d;background-color:#ff6900}:host.avatar-color-navigation{color:#fff;background-color:#202945}:host.avatar-color-skyBlue{color:#fff;background-color:#009bdf}:host.avatar-color-steel{color:#fff;background-color:#5b6770}:host.avatar-color-metal{color:#fff;background-color:#637893}:host.avatar-color-sand{color:#3d464d;background-color:#f4f4f4}:host.avatar-color-silver{color:#3d464d;background-color:#e2e2e2}:host.avatar-color-stone{color:#3d464d;background-color:#bebebe}:host.avatar-color-ash{color:#3d464d;background-color:#a0a0a0}:host.avatar-color-slate{color:#fff;background-color:#707070}:host.avatar-color-onyx{color:#fff;background-color:#526980}:host.avatar-color-charcoal{color:#fff;background-color:#282828}:host.avatar-color-moonlight{color:#fff;background-color:#1a242f}:host.avatar-color-midnight{color:#fff;background-color:#202945}:host.avatar-color-darkness{color:#fff;background-color:#161f27}:host.avatar-color-navy{color:#fff;background-color:#0d2d42}:host.avatar-color-aqua{color:#3d464d;background-color:#3bafda}:host.avatar-color-ocean{color:#fff;background-color:#4a89dc}:host.avatar-color-mint{color:#3d464d;background-color:#37bc9b}:host.avatar-color-grass{color:#fff;background-color:#8cc152}:host.avatar-color-sunflower{color:#fff;background-color:#f6b042}:host.avatar-color-bittersweet{color:#fff;background-color:#eb6845}:host.avatar-color-grapefruit{color:#fff;background-color:#da4453}:host.avatar-color-carnation{color:#fff;background-color:#d770ad}:host.avatar-color-lavender{color:#fff;background-color:#967adc}:host.avatar-color-mountain{color:#fff;background-color:#9678b6}:host.avatar-color-info{color:#fff;background-color:#4a89dc}:host.avatar-color-positive{color:#fff;background-color:#4a89dc}:host.avatar-color-success{color:#fff;background-color:#8cc152}:host.avatar-color-negative{color:#fff;background-color:#da4453}:host.avatar-color-danger{color:#fff;background-color:#da4453}:host.avatar-color-error{color:#fff;background-color:#da4453}:host.avatar-color-warning{color:#fff;background-color:#f6b042}:host.avatar-color-empty{color:#3d464d;background-color:#cccdcc}:host.avatar-color-disabled{color:#3d464d;background-color:#bebebe}:host.avatar-color-background{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-backgroundDark{color:#3d464d;background-color:#e2e2e2}:host.avatar-color-presentation{color:#fff;background-color:#5b6770}:host.avatar-color-bullhorn{color:#3d464d;background-color:#ff6900}:host.avatar-color-pulse{color:#3d464d;background-color:#3bafda}:host.avatar-color-company{color:#fff;background-color:#39d}:host.avatar-color-candidate{color:#fff;background-color:#4b7}:host.avatar-color-lead{color:#fff;background-color:#a69}:host.avatar-color-contact{color:#fff;background-color:#fa4}:host.avatar-color-clientcontact{color:#fff;background-color:#fa4}:host.avatar-color-opportunity{color:#fff;background-color:#625}:host.avatar-color-job{color:#fff;background-color:#b56}:host.avatar-color-joborder{color:#fff;background-color:#b56}:host.avatar-color-submission{color:#3d464d;background-color:#a9adbb}:host.avatar-color-sendout{color:#fff;background-color:#747884}:host.avatar-color-placement{color:#fff;background-color:#0b344f}:host.avatar-color-note{color:#fff;background-color:#747884}:host.avatar-color-contract{color:#fff;background-color:#454ea0}:host.avatar-color-jobCode{color:#fff;background-color:#696d79}:host.avatar-color-earnCode{color:#fff;background-color:#696d79}:host.avatar-color-invoiceStatement{color:#fff;background-color:#696d79}:host.avatar-color-billableCharge{color:#fff;background-color:#696d79}:host.avatar-color-payableCharge{color:#fff;background-color:#696d79}:host.avatar-color-user{color:#fff;background-color:#696d79}:host.avatar-color-corporateUser{color:#fff;background-color:#696d79}:host.avatar-color-distributionList{color:#fff;background-color:#696d79}:host.avatar-color-credential{color:#fff;background-color:#696d79}:host.avatar-color-person{color:#fff;background-color:#696d79}:host(.menu-active){box-shadow:0 0 4px 1px var(--selection)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvYXZhdGFyL0F2YXRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQU96RCxNQUFNLE9BQU8saUJBQWlCO0lBNEI1QixZQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBckIzQyxTQUFJLEdBQVcsUUFBUSxDQUFDO1FBR3hCLFVBQUssR0FBVyxPQUFPLENBQUM7SUFrQnNCLENBQUM7SUFiL0MsSUFDSSxlQUFlO1FBQ2pCLE9BQU8sQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLGdCQUFnQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRUQsSUFDSSxVQUFVO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBQ3JELE9BQU8sT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLENBQUM7SUFDMUQsQ0FBQztJQU1ELFFBQVE7UUFDTixJQUFJLEdBQVEsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO2dCQUM1Qix1Q0FBdUM7Z0JBQ3ZD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REosS0FBSztnQkFJRixlQUFlO3NCQURsQixXQUFXO3VCQUFDLE9BQU87Z0JBTWhCLFVBQVU7c0JBRGIsV0FBVzt1QkFBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWF2YXRhcicsXG4gIHN0eWxlVXJsczogWycuL0F2YXRhci5zY3NzJ10sXG4gIHRlbXBsYXRlOiAnPGltZyAqbmdJZj1cInNyY1wiIFtzcmNdPVwic3JjXCIvPicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BdmF0YXJFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc291cmNlOiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGltYWdlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2l6ZTogc3RyaW5nID0gJ21lZGl1bSc7XG5cbiAgQElucHV0KClcbiAgc2hhcGU6IHN0cmluZyA9ICdyb3VuZCc7XG5cbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiX2NsYXNzQmluZGluZygpIHtcbiAgICByZXR1cm4gW2BhdmF0YXItc2l6ZS0ke3RoaXMuc2l6ZX1gLCBgYXZhdGFyLXNoYXBlLSR7dGhpcy5zaGFwZX1gLCBgYXZhdGFyLWNvbG9yLSR7dGhpcy5jb2xvcn1gXTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuYmFja2dyb3VuZEltYWdlJylcbiAgZ2V0IGJhY2tncm91bmQoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuaW1hZ2UgJiYgIXRoaXMuc291cmNlLnByb2ZpbGVJbWFnZSkgcmV0dXJuO1xuICAgIHJldHVybiBgdXJsKCR7dGhpcy5pbWFnZSB8fCB0aGlzLnNvdXJjZS5wcm9maWxlSW1hZ2V9KWA7XG4gIH1cblxuICBzcmM6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIG5nT25Jbml0KCk6IGFueSB7XG4gICAgbGV0IHNyYzogYW55O1xuICAgIGlmICgodGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UgIT09ICcnKSB8fCB0aGlzLmxhYmVsKSB7XG4gICAgICBpZiAodGhpcy5zb3VyY2UucHJvZmlsZUltYWdlKSB7XG4gICAgICAgIC8vIHRoaXMuc3JjID0gdGhpcy5zb3VyY2UucHJvZmlsZUltYWdlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc291cmNlLmxvZ28pIHtcbiAgICAgICAgc3JjID0gdGhpcy5zb3VyY2UubG9nbztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpcnN0OiBhbnkgPVxuICAgICAgICAgIHRoaXMubGFiZWwgfHwgdGhpcy5zb3VyY2UuZmlyc3ROYW1lXG4gICAgICAgICAgICA/IHRoaXMuc291cmNlLmZpcnN0TmFtZS5jaGFyQXQoMClcbiAgICAgICAgICAgIDogdGhpcy5zb3VyY2UubmFtZVxuICAgICAgICAgICAgPyB0aGlzLnNvdXJjZS5uYW1lLmNoYXJBdCgwKVxuICAgICAgICAgICAgOiB0aGlzLnNvdXJjZS51c2VybmFtZVxuICAgICAgICAgICAgPyB0aGlzLnNvdXJjZS51c2VybmFtZS5jaGFyQXQoMClcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IGxhc3Q6IGFueSA9IHRoaXMuc291cmNlLmxhc3ROYW1lID8gdGhpcy5zb3VyY2UubGFzdE5hbWUuY2hhckF0KDApIDogJyc7XG5cbiAgICAgICAgLy8gRGVmaW5pbmcgQ29sb3JzXG4gICAgICAgIGNvbnN0IGNvbG9yczogYW55ID0gW1xuICAgICAgICAgICcjMWFiYzljJyxcbiAgICAgICAgICAnIzE2YTA4NScsXG4gICAgICAgICAgJyNmMWM0MGYnLFxuICAgICAgICAgICcjZjM5YzEyJyxcbiAgICAgICAgICAnIzJlY2M3MScsXG4gICAgICAgICAgJyMyN2FlNjAnLFxuICAgICAgICAgICcjZTY3ZTIyJyxcbiAgICAgICAgICAnI2QzNTQwMCcsXG4gICAgICAgICAgJyMzNDk4ZGInLFxuICAgICAgICAgICcjMjk4MGI5JyxcbiAgICAgICAgICAnI2U3NGMzYycsXG4gICAgICAgICAgJyNjMDM5MmInLFxuICAgICAgICAgICcjOWI1OWI2JyxcbiAgICAgICAgICAnIzhlNDRhZCcsXG4gICAgICAgICAgJyNiZGMzYzcnLFxuICAgICAgICAgICcjMzQ0OTVlJyxcbiAgICAgICAgICAnIzJjM2U1MCcsXG4gICAgICAgICAgJyM5NWE1YTYnLFxuICAgICAgICAgICcjN2Y4YzhkJyxcbiAgICAgICAgICAnI2VjODdiZicsXG4gICAgICAgICAgJyNkODcwYWQnLFxuICAgICAgICAgICcjZjY5Nzg1JyxcbiAgICAgICAgICAnIzliYTM3ZScsXG4gICAgICAgICAgJyNiNDkyNTUnLFxuICAgICAgICAgICcjYjQ5MjU1JyxcbiAgICAgICAgICAnI2E5NDEzNicsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGxpZ2h0ZXJDb2xvcnM6IGFueSA9IFtcbiAgICAgICAgICAnIzE1RDZCMCcsXG4gICAgICAgICAgJyMxNkEwNjknLFxuICAgICAgICAgICcjRjFENjBGJyxcbiAgICAgICAgICAnI0YzQUMxMicsXG4gICAgICAgICAgJyMyRUQ4NUInLFxuICAgICAgICAgICcjMjhCQzdGJyxcbiAgICAgICAgICAnI0U2NjMyMicsXG4gICAgICAgICAgJyNEMzAwMkInLFxuICAgICAgICAgICcjNjUzNERCJyxcbiAgICAgICAgICAnIzI5QjJCOScsXG4gICAgICAgICAgJyNFNzNDNjMnLFxuICAgICAgICAgICcjREI2RDMxJyxcbiAgICAgICAgICAnI0NCNDhCNScsXG4gICAgICAgICAgJyM2OTQ0QUQnLFxuICAgICAgICAgICcjMzg1MzZEJyxcbiAgICAgICAgICAnIzNENjQ3MycsXG4gICAgICAgICAgJyMzOTRBNkMnLFxuICAgICAgICAgICcjOTJCQ0I3JyxcbiAgICAgICAgICAnIzdEOTlBMicsXG4gICAgICAgICAgJyNGMTRGNzYnLFxuICAgICAgICAgICcjQ0I1Q0RBJyxcbiAgICAgICAgICAnI0ZGQjQ3NScsXG4gICAgICAgICAgJyNCOUNFNkUnLFxuICAgICAgICAgICcjRERBQTRGJyxcbiAgICAgICAgICAnI0NENkY0NScsXG4gICAgICAgICAgJyNCOTM1NEEnLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBzZXR0aW5nczogYW55ID0ge1xuICAgICAgICAgIC8vIERlZmF1bHQgc2V0dGluZ3NcbiAgICAgICAgICB0ZXh0Q29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgIGZvbnRTaXplOiA1MCxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYU5ldWUtTGlnaHQsSGVsdmV0aWNhIE5ldWUgTGlnaHQsSGVsdmV0aWNhIE5ldWUsSGVsdmV0aWNhLCBBcmlhbCxMdWNpZGEgR3JhbmRlLCBzYW5zLXNlcmlmJyxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBtYWtpbmcgdGhlIHRleHQgb2JqZWN0XG4gICAgICAgIGNvbnN0IGNvbG9ySW5kZXg6IGFueSA9IE1hdGguZmxvb3IoKGZpcnN0LmNoYXJDb2RlQXQoMCkgLSA2NSkgJSBjb2xvcnMubGVuZ3RoKTtcblxuICAgICAgICBjb25zdCBjb2JqOiBhbnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0Jyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ3gnLCAnNTAlJyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCd5JywgJzUwJScpO1xuICAgICAgICBjb2JqLnNldEF0dHJpYnV0ZSgnZHknLCAnMC4zNWVtJyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCdmaWxsJywgc2V0dGluZ3MudGV4dENvbG9yKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ2ZvbnQtZmFtaWx5Jywgc2V0dGluZ3MuZm9udEZhbWlseSk7XG4gICAgICAgIGNvYmouc3R5bGUuZm9udFdlaWdodCA9IHNldHRpbmdzLmZvbnRXZWlnaHQ7XG4gICAgICAgIGNvYmouc3R5bGUuZm9udFNpemUgPSBgJHtzZXR0aW5ncy5mb250U2l6ZX1weGA7XG5cbiAgICAgICAgY29uc3QgbHRyczogYW55ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5sYWJlbCB8fCBmaXJzdCArIGxhc3QpO1xuICAgICAgICBjb2JqLmFwcGVuZENoaWxkKGx0cnMpO1xuXG4gICAgICAgIGNvbnN0IHN2ZzogYW55ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzZXR0aW5ncy53aWR0aCk7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHNldHRpbmdzLmhlaWdodCk7XG5cbiAgICAgICAgLy8gdGhpcy5zZXRQcmVmaXhlZFZhbHVlKHN2ZywgJ2JhY2tncm91bmQnLCBjb2xvcnNbY29sb3JJbmRleF0pO1xuICAgICAgICB0aGlzLnNldFByZWZpeGVkVmFsdWUoc3ZnLCAnYmFja2dyb3VuZCcsIGBsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCAke2NvbG9yc1tjb2xvckluZGV4XX0gMCUsICR7bGlnaHRlckNvbG9yc1tjb2xvckluZGV4XX0gMTAwJSlgKTtcblxuICAgICAgICBzdmcuc3R5bGUud2lkdGggPSBgJHtzZXR0aW5ncy53aWR0aH1weGA7XG4gICAgICAgIHN2Zy5zdHlsZS5oZWlnaHQgPSBgJHtzZXR0aW5ncy5oZWlnaHR9cHhgO1xuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQoY29iaik7XG5cbiAgICAgICAgY29uc3QgdG9wOiBhbnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9wLmFwcGVuZENoaWxkKHN2Zyk7XG5cbiAgICAgICAgY29uc3Qgc3ZnSHRtbDogYW55ID0gd2luZG93LmJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHRvcC5pbm5lckhUTUwpKSk7XG4gICAgICAgIHNyYyA9IGBkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCAke3N2Z0h0bWx9YDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3JjID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybChzcmMpO1xuICAgIH1cbiAgfVxuXG4gIHNldFByZWZpeGVkVmFsdWUoZWxtOiBhbnksIHByb3A6IGFueSwgdmFsdWU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgcHJlZml4ZXM6IGFueSA9IFsnLW1vei0nLCAnLXdlYmtpdC0nLCAnLW8tJywgJy1tcy0nLCAnLWtodG1sLSddO1xuXG4gICAgLy8gQ2xlYXJcbiAgICBlbG0uc3R5bGVbcHJvcF0gPSAnJztcbiAgICBjb25zdCBzdGFydGluZzogYW55ID0gZWxtLnN0eWxlW3Byb3BdO1xuXG4gICAgLy8gVHJ5IHJhdyBmaXJzdFxuICAgIHRyeSB7XG4gICAgICBlbG0uc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIGlmIChlbG0uc3R5bGVbcHJvcF0gIT09IHN0YXJ0aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBubyBvcFxuICAgIH1cblxuICAgIC8vIFRyeSBwcmVmaXhlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHYgPSBwcmVmaXhlc1tpXSArIHZhbHVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZWxtLnN0eWxlW3Byb3BdID0gdjtcbiAgICAgICAgaWYgKGVsbS5zdHlsZVtwcm9wXSAhPT0gc3RhcnRpbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUyKSB7XG4gICAgICAgIC8vIG5vIG9wXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNWYWxpZFVSTChzdHI6IHN0cmluZykge1xuICAgIGNvbnN0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKFxuICAgICAgJ14oaHR0cHM/OlxcXFwvXFxcXC8pPycgKyAvLyBwcm90b2NvbFxuICAgICAgICAnKCgoW2EtelxcXFxkXShbYS16XFxcXGQtXSpbYS16XFxcXGRdKSopXFxcXC4pK1thLXpdezIsfXwnICsgLy8gZG9tYWluIG5hbWVcbiAgICAgICAgJygoXFxcXGR7MSwzfVxcXFwuKXszfVxcXFxkezEsM30pKScgKyAvLyBPUiBpcCAodjQpIGFkZHJlc3NcbiAgICAgICAgJyhcXFxcOlxcXFxkKyk/KFxcXFwvWy1hLXpcXFxcZCVfLn4rXSopKicgKyAvLyBwb3J0IGFuZCBwYXRoXG4gICAgICAgICcoXFxcXD9bOyZhLXpcXFxcZCVfLn4rPS1dKik/JyArIC8vIHF1ZXJ5IHN0cmluZ1xuICAgICAgICAnKFxcXFwjWy1hLXpcXFxcZF9dKik/JCcsXG4gICAgICAnaScsXG4gICAgKTsgLy8gZnJhZ21lbnQgbG9jYXRvclxuICAgIHJldHVybiAhIXBhdHRlcm4udGVzdChzdHIpO1xuICB9XG59XG4iXX0=