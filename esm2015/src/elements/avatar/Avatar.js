// NG2
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
NovoAvatarElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-avatar',
                template: '<img *ngIf="src" [src]="src"/>',
                styles: [":host{background-color:var(--background-muted);background-position:50%;background-size:cover;display:inline-block;height:30px;overflow:hidden;position:relative;width:30px}:host img{border-radius:inherit;height:inherit;width:inherit}:host.avatar-size-small{height:20px;width:20px}:host.avatar-size-large{height:40px;width:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:.4em}:host.avatar-color-black{background-color:#000;color:#fff}:host.avatar-color-white{background-color:#fff;color:#3d464d}:host.avatar-color-gray,:host.avatar-color-grey{background-color:#9e9e9e;color:#3d464d}:host.avatar-color-bright,:host.avatar-color-offWhite{background-color:#f7f7f7;color:#3d464d}:host.avatar-color-light{background-color:#dbdbdb;color:#3d464d}:host.avatar-color-neutral{background-color:#4f5361;color:#fff}:host.avatar-color-dark{background-color:#3d464d;color:#fff}:host.avatar-color-orange{background-color:#ff6900;color:#3d464d}:host.avatar-color-navigation{background-color:#202945;color:#fff}:host.avatar-color-skyBlue{background-color:#009bdf;color:#fff}:host.avatar-color-steel{background-color:#5b6770;color:#fff}:host.avatar-color-metal{background-color:#637893;color:#fff}:host.avatar-color-sand{background-color:#f4f4f4;color:#3d464d}:host.avatar-color-silver{background-color:#e2e2e2;color:#3d464d}:host.avatar-color-stone{background-color:#bebebe;color:#3d464d}:host.avatar-color-ash{background-color:#a0a0a0;color:#3d464d}:host.avatar-color-slate{background-color:#707070;color:#fff}:host.avatar-color-onyx{background-color:#526980;color:#fff}:host.avatar-color-charcoal{background-color:#282828;color:#fff}:host.avatar-color-moonlight{background-color:#1a242f;color:#fff}:host.avatar-color-midnight{background-color:#202945;color:#fff}:host.avatar-color-darkness{background-color:#161f27;color:#fff}:host.avatar-color-navy{background-color:#0d2d42;color:#fff}:host.avatar-color-aqua{background-color:#3bafda;color:#3d464d}:host.avatar-color-ocean{background-color:#4a89dc;color:#fff}:host.avatar-color-mint{background-color:#37bc9b;color:#3d464d}:host.avatar-color-grass{background-color:#8cc152;color:#fff}:host.avatar-color-sunflower{background-color:#f6b042;color:#fff}:host.avatar-color-bittersweet{background-color:#eb6845;color:#fff}:host.avatar-color-grapefruit{background-color:#da4453;color:#fff}:host.avatar-color-carnation{background-color:#d770ad;color:#fff}:host.avatar-color-lavender{background-color:#967adc;color:#fff}:host.avatar-color-mountain{background-color:#9678b6;color:#fff}:host.avatar-color-info,:host.avatar-color-positive{background-color:#4a89dc;color:#fff}:host.avatar-color-success{background-color:#8cc152;color:#fff}:host.avatar-color-danger,:host.avatar-color-error,:host.avatar-color-negative{background-color:#da4453;color:#fff}:host.avatar-color-warning{background-color:#f6b042;color:#fff}:host.avatar-color-empty{background-color:#cccdcc;color:#3d464d}:host.avatar-color-disabled{background-color:#bebebe;color:#3d464d}:host.avatar-color-background{background-color:#f7f7f7;color:#3d464d}:host.avatar-color-backgroundDark{background-color:#e2e2e2;color:#3d464d}:host.avatar-color-presentation{background-color:#5b6770;color:#fff}:host.avatar-color-bullhorn{background-color:#ff6900;color:#3d464d}:host.avatar-color-pulse{background-color:#3bafda;color:#3d464d}:host.avatar-color-company{background-color:#39d;color:#fff}:host.avatar-color-candidate{background-color:#4b7;color:#fff}:host.avatar-color-lead{background-color:#a69;color:#fff}:host.avatar-color-clientcontact,:host.avatar-color-contact{background-color:#fa4;color:#fff}:host.avatar-color-opportunity{background-color:#625;color:#fff}:host.avatar-color-job,:host.avatar-color-joborder{background-color:#b56;color:#fff}:host.avatar-color-submission{background-color:#a9adbb;color:#3d464d}:host.avatar-color-sendout{background-color:#747884;color:#fff}:host.avatar-color-placement{background-color:#0b344f;color:#fff}:host.avatar-color-note{background-color:#747884;color:#fff}:host.avatar-color-contract{background-color:#454ea0;color:#fff}:host.avatar-color-billableCharge,:host.avatar-color-corporateUser,:host.avatar-color-credential,:host.avatar-color-distributionList,:host.avatar-color-earnCode,:host.avatar-color-invoiceStatement,:host.avatar-color-jobCode,:host.avatar-color-payableCharge,:host.avatar-color-person,:host.avatar-color-user{background-color:#696d79;color:#fff}:host(.menu-active){box-shadow:0 0 4px 1px var(--selection)}"]
            },] }
];
NovoAvatarElement.ctorParameters = () => [
    { type: DomSanitizer }
];
NovoAvatarElement.propDecorators = {
    source: [{ type: Input }],
    label: [{ type: Input }],
    theme: [{ type: Input }],
    image: [{ type: Input }],
    size: [{ type: Input }],
    shape: [{ type: Input }],
    color: [{ type: Input }],
    hb_classBinding: [{ type: HostBinding, args: ['class',] }],
    background: [{ type: HostBinding, args: ['style.backgroundImage',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhdGFyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2F2YXRhci9BdmF0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFPekQsTUFBTSxPQUFPLGlCQUFpQjtJQTRCNUIsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQXJCM0MsU0FBSSxHQUFXLFFBQVEsQ0FBQztRQUd4QixVQUFLLEdBQVcsT0FBTyxDQUFDO0lBa0JzQixDQUFDO0lBYi9DLElBQ0ksZUFBZTtRQUNqQixPQUFPLENBQUMsZUFBZSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxnQkFBZ0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUVELElBQ0ksVUFBVTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUNyRCxPQUFPLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDO0lBQzFELENBQUM7SUFNRCxRQUFRO1FBQ04sSUFBSSxHQUFRLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVks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ZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYXZhdGFyJyxcbiAgc3R5bGVVcmxzOiBbJy4vQXZhdGFyLnNjc3MnXSxcbiAgdGVtcGxhdGU6ICc8aW1nICpuZ0lmPVwic3JjXCIgW3NyY109XCJzcmNcIi8+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0F2YXRhckVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBzb3VyY2U6IGFueTtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgaW1hZ2U6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzaXplOiBzdHJpbmcgPSAnbWVkaXVtJztcblxuICBASW5wdXQoKVxuICBzaGFwZTogc3RyaW5nID0gJ3JvdW5kJztcblxuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfY2xhc3NCaW5kaW5nKCkge1xuICAgIHJldHVybiBbYGF2YXRhci1zaXplLSR7dGhpcy5zaXplfWAsIGBhdmF0YXItc2hhcGUtJHt0aGlzLnNoYXBlfWAsIGBhdmF0YXItY29sb3ItJHt0aGlzLmNvbG9yfWBdO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5iYWNrZ3JvdW5kSW1hZ2UnKVxuICBnZXQgYmFja2dyb3VuZCgpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5pbWFnZSAmJiAhdGhpcy5zb3VyY2UucHJvZmlsZUltYWdlKSByZXR1cm47XG4gICAgcmV0dXJuIGB1cmwoJHt0aGlzLmltYWdlIHx8IHRoaXMuc291cmNlLnByb2ZpbGVJbWFnZX0pYDtcbiAgfVxuXG4gIHNyYzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgbmdPbkluaXQoKTogYW55IHtcbiAgICBsZXQgc3JjOiBhbnk7XG4gICAgaWYgKCh0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZSAhPT0gJycpIHx8IHRoaXMubGFiZWwpIHtcbiAgICAgIGlmICh0aGlzLnNvdXJjZS5wcm9maWxlSW1hZ2UpIHtcbiAgICAgICAgLy8gdGhpcy5zcmMgPSB0aGlzLnNvdXJjZS5wcm9maWxlSW1hZ2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3VyY2UubG9nbykge1xuICAgICAgICBzcmMgPSB0aGlzLnNvdXJjZS5sb2dvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmlyc3Q6IGFueSA9XG4gICAgICAgICAgdGhpcy5sYWJlbCB8fCB0aGlzLnNvdXJjZS5maXJzdE5hbWVcbiAgICAgICAgICAgID8gdGhpcy5zb3VyY2UuZmlyc3ROYW1lLmNoYXJBdCgwKVxuICAgICAgICAgICAgOiB0aGlzLnNvdXJjZS5uYW1lXG4gICAgICAgICAgICA/IHRoaXMuc291cmNlLm5hbWUuY2hhckF0KDApXG4gICAgICAgICAgICA6IHRoaXMuc291cmNlLnVzZXJuYW1lXG4gICAgICAgICAgICA/IHRoaXMuc291cmNlLnVzZXJuYW1lLmNoYXJBdCgwKVxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgbGFzdDogYW55ID0gdGhpcy5zb3VyY2UubGFzdE5hbWUgPyB0aGlzLnNvdXJjZS5sYXN0TmFtZS5jaGFyQXQoMCkgOiAnJztcblxuICAgICAgICAvLyBEZWZpbmluZyBDb2xvcnNcbiAgICAgICAgY29uc3QgY29sb3JzOiBhbnkgPSBbXG4gICAgICAgICAgJyMxYWJjOWMnLFxuICAgICAgICAgICcjMTZhMDg1JyxcbiAgICAgICAgICAnI2YxYzQwZicsXG4gICAgICAgICAgJyNmMzljMTInLFxuICAgICAgICAgICcjMmVjYzcxJyxcbiAgICAgICAgICAnIzI3YWU2MCcsXG4gICAgICAgICAgJyNlNjdlMjInLFxuICAgICAgICAgICcjZDM1NDAwJyxcbiAgICAgICAgICAnIzM0OThkYicsXG4gICAgICAgICAgJyMyOTgwYjknLFxuICAgICAgICAgICcjZTc0YzNjJyxcbiAgICAgICAgICAnI2MwMzkyYicsXG4gICAgICAgICAgJyM5YjU5YjYnLFxuICAgICAgICAgICcjOGU0NGFkJyxcbiAgICAgICAgICAnI2JkYzNjNycsXG4gICAgICAgICAgJyMzNDQ5NWUnLFxuICAgICAgICAgICcjMmMzZTUwJyxcbiAgICAgICAgICAnIzk1YTVhNicsXG4gICAgICAgICAgJyM3ZjhjOGQnLFxuICAgICAgICAgICcjZWM4N2JmJyxcbiAgICAgICAgICAnI2Q4NzBhZCcsXG4gICAgICAgICAgJyNmNjk3ODUnLFxuICAgICAgICAgICcjOWJhMzdlJyxcbiAgICAgICAgICAnI2I0OTI1NScsXG4gICAgICAgICAgJyNiNDkyNTUnLFxuICAgICAgICAgICcjYTk0MTM2JyxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgbGlnaHRlckNvbG9yczogYW55ID0gW1xuICAgICAgICAgICcjMTVENkIwJyxcbiAgICAgICAgICAnIzE2QTA2OScsXG4gICAgICAgICAgJyNGMUQ2MEYnLFxuICAgICAgICAgICcjRjNBQzEyJyxcbiAgICAgICAgICAnIzJFRDg1QicsXG4gICAgICAgICAgJyMyOEJDN0YnLFxuICAgICAgICAgICcjRTY2MzIyJyxcbiAgICAgICAgICAnI0QzMDAyQicsXG4gICAgICAgICAgJyM2NTM0REInLFxuICAgICAgICAgICcjMjlCMkI5JyxcbiAgICAgICAgICAnI0U3M0M2MycsXG4gICAgICAgICAgJyNEQjZEMzEnLFxuICAgICAgICAgICcjQ0I0OEI1JyxcbiAgICAgICAgICAnIzY5NDRBRCcsXG4gICAgICAgICAgJyMzODUzNkQnLFxuICAgICAgICAgICcjM0Q2NDczJyxcbiAgICAgICAgICAnIzM5NEE2QycsXG4gICAgICAgICAgJyM5MkJDQjcnLFxuICAgICAgICAgICcjN0Q5OUEyJyxcbiAgICAgICAgICAnI0YxNEY3NicsXG4gICAgICAgICAgJyNDQjVDREEnLFxuICAgICAgICAgICcjRkZCNDc1JyxcbiAgICAgICAgICAnI0I5Q0U2RScsXG4gICAgICAgICAgJyNEREFBNEYnLFxuICAgICAgICAgICcjQ0Q2RjQ1JyxcbiAgICAgICAgICAnI0I5MzU0QScsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNldHRpbmdzOiBhbnkgPSB7XG4gICAgICAgICAgLy8gRGVmYXVsdCBzZXR0aW5nc1xuICAgICAgICAgIHRleHRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICAgIHdpZHRoOiAxMDAsXG4gICAgICAgICAgZm9udFNpemU6IDUwLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhTmV1ZS1MaWdodCxIZWx2ZXRpY2EgTmV1ZSBMaWdodCxIZWx2ZXRpY2EgTmV1ZSxIZWx2ZXRpY2EsIEFyaWFsLEx1Y2lkYSBHcmFuZGUsIHNhbnMtc2VyaWYnLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIG1ha2luZyB0aGUgdGV4dCBvYmplY3RcbiAgICAgICAgY29uc3QgY29sb3JJbmRleDogYW55ID0gTWF0aC5mbG9vcigoZmlyc3QuY2hhckNvZGVBdCgwKSAtIDY1KSAlIGNvbG9ycy5sZW5ndGgpO1xuXG4gICAgICAgIGNvbnN0IGNvYmo6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHQnKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpO1xuICAgICAgICBjb2JqLnNldEF0dHJpYnV0ZSgneCcsICc1MCUnKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ3knLCAnNTAlJyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCdkeScsICcwLjM1ZW0nKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBzZXR0aW5ncy50ZXh0Q29sb3IpO1xuICAgICAgICBjb2JqLnNldEF0dHJpYnV0ZSgnZm9udC1mYW1pbHknLCBzZXR0aW5ncy5mb250RmFtaWx5KTtcbiAgICAgICAgY29iai5zdHlsZS5mb250V2VpZ2h0ID0gc2V0dGluZ3MuZm9udFdlaWdodDtcbiAgICAgICAgY29iai5zdHlsZS5mb250U2l6ZSA9IGAke3NldHRpbmdzLmZvbnRTaXplfXB4YDtcblxuICAgICAgICBjb25zdCBsdHJzOiBhbnkgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmxhYmVsIHx8IGZpcnN0ICsgbGFzdCk7XG4gICAgICAgIGNvYmouYXBwZW5kQ2hpbGQobHRycyk7XG5cbiAgICAgICAgY29uc3Qgc3ZnOiBhbnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNldHRpbmdzLndpZHRoKTtcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jywgc2V0dGluZ3MuaGVpZ2h0KTtcblxuICAgICAgICAvLyB0aGlzLnNldFByZWZpeGVkVmFsdWUoc3ZnLCAnYmFja2dyb3VuZCcsIGNvbG9yc1tjb2xvckluZGV4XSk7XG4gICAgICAgIHRoaXMuc2V0UHJlZml4ZWRWYWx1ZShzdmcsICdiYWNrZ3JvdW5kJywgYGxpbmVhci1ncmFkaWVudCgtNDVkZWcsICR7Y29sb3JzW2NvbG9ySW5kZXhdfSAwJSwgJHtsaWdodGVyQ29sb3JzW2NvbG9ySW5kZXhdfSAxMDAlKWApO1xuXG4gICAgICAgIHN2Zy5zdHlsZS53aWR0aCA9IGAke3NldHRpbmdzLndpZHRofXB4YDtcbiAgICAgICAgc3ZnLnN0eWxlLmhlaWdodCA9IGAke3NldHRpbmdzLmhlaWdodH1weGA7XG4gICAgICAgIHN2Zy5hcHBlbmRDaGlsZChjb2JqKTtcblxuICAgICAgICBjb25zdCB0b3A6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b3AuYXBwZW5kQ2hpbGQoc3ZnKTtcblxuICAgICAgICBjb25zdCBzdmdIdG1sOiBhbnkgPSB3aW5kb3cuYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodG9wLmlubmVySFRNTCkpKTtcbiAgICAgICAgc3JjID0gYGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsICR7c3ZnSHRtbH1gO1xuICAgICAgfVxuICAgICAgdGhpcy5zcmMgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKHNyYyk7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJlZml4ZWRWYWx1ZShlbG06IGFueSwgcHJvcDogYW55LCB2YWx1ZTogYW55KTogYW55IHtcbiAgICBjb25zdCBwcmVmaXhlczogYW55ID0gWyctbW96LScsICctd2Via2l0LScsICctby0nLCAnLW1zLScsICcta2h0bWwtJ107XG5cbiAgICAvLyBDbGVhclxuICAgIGVsbS5zdHlsZVtwcm9wXSA9ICcnO1xuICAgIGNvbnN0IHN0YXJ0aW5nOiBhbnkgPSBlbG0uc3R5bGVbcHJvcF07XG5cbiAgICAvLyBUcnkgcmF3IGZpcnN0XG4gICAgdHJ5IHtcbiAgICAgIGVsbS5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgaWYgKGVsbS5zdHlsZVtwcm9wXSAhPT0gc3RhcnRpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIG5vIG9wXG4gICAgfVxuXG4gICAgLy8gVHJ5IHByZWZpeGVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgdiA9IHByZWZpeGVzW2ldICsgdmFsdWU7XG4gICAgICB0cnkge1xuICAgICAgICBlbG0uc3R5bGVbcHJvcF0gPSB2O1xuICAgICAgICBpZiAoZWxtLnN0eWxlW3Byb3BdICE9PSBzdGFydGluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZTIpIHtcbiAgICAgICAgLy8gbm8gb3BcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc1ZhbGlkVVJMKHN0cjogc3RyaW5nKSB7XG4gICAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoXG4gICAgICAnXihodHRwcz86XFxcXC9cXFxcLyk/JyArIC8vIHByb3RvY29sXG4gICAgICAgICcoKChbYS16XFxcXGRdKFthLXpcXFxcZC1dKlthLXpcXFxcZF0pKilcXFxcLikrW2Etel17Mix9fCcgKyAvLyBkb21haW4gbmFtZVxuICAgICAgICAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJyArIC8vIE9SIGlwICh2NCkgYWRkcmVzc1xuICAgICAgICAnKFxcXFw6XFxcXGQrKT8oXFxcXC9bLWEtelxcXFxkJV8ufitdKikqJyArIC8vIHBvcnQgYW5kIHBhdGhcbiAgICAgICAgJyhcXFxcP1s7JmEtelxcXFxkJV8ufis9LV0qKT8nICsgLy8gcXVlcnkgc3RyaW5nXG4gICAgICAgICcoXFxcXCNbLWEtelxcXFxkX10qKT8kJyxcbiAgICAgICdpJyxcbiAgICApOyAvLyBmcmFnbWVudCBsb2NhdG9yXG4gICAgcmV0dXJuICEhcGF0dGVybi50ZXN0KHN0cik7XG4gIH1cbn1cbiJdfQ==