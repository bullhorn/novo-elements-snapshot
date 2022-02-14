// NG2
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
function NovoAvatarElement_img_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r0.src, i0.ɵɵsanitizeUrl);
} }
export class NovoAvatarElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    get background() {
        return `url(${this.source.profileImage})`;
    }
    ngOnInit() {
        let src;
        if ((this.source && this.source !== '') || this.label) {
            if (this.source.profileImage) {
                // this.background = this.source.profileImage;
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
}
NovoAvatarElement.ɵfac = function NovoAvatarElement_Factory(t) { return new (t || NovoAvatarElement)(i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
NovoAvatarElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoAvatarElement, selectors: [["novo-avatar"]], hostVars: 3, hostBindings: function NovoAvatarElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("size", ctx.size);
        i0.ɵɵstyleProp("background-image", ctx.background);
    } }, inputs: { source: "source", label: "label", color: "color", theme: "theme", size: "size" }, decls: 1, vars: 1, consts: [[3, "src", 4, "ngIf"], [3, "src"]], template: function NovoAvatarElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoAvatarElement_img_0_Template, 1, 1, "img", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.src);
    } }, directives: [i2.NgIf], styles: ["[_nghost-%COMP%]{background-position:50%;background-size:cover;border-radius:2em;display:inline-block;height:30px;overflow:hidden;width:30px}[_nghost-%COMP%]   img[_ngcontent-%COMP%]{border-radius:inherit;height:inherit;width:inherit}[size=small][_nghost-%COMP%]{height:20px;width:20px}[size=large][_nghost-%COMP%]{height:40px;width:40px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoAvatarElement, [{
        type: Component,
        args: [{
                selector: 'novo-avatar',
                styleUrls: ['./Avatar.scss'],
                template: '<img *ngIf="src" [src]="src"/>',
            }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, { source: [{
            type: Input
        }], label: [{
            type: Input
        }], color: [{
            type: Input
        }], theme: [{
            type: Input
        }], size: [{
            type: HostBinding,
            args: ['attr.size']
        }, {
            type: Input
        }], background: [{
            type: HostBinding,
            args: ['style.backgroundImage']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhdGFyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2F2YXRhci9BdmF0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7O0lBSzVDLHlCQUE4Qjs7O0lBQWIsa0RBQVc7O0FBRXpDLE1BQU0sT0FBTyxpQkFBaUI7SUFpQjVCLFlBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDO0lBUC9DLElBQ0ksVUFBVTtRQUNaLE9BQU8sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDO0lBQzVDLENBQUM7SUFNRCxRQUFRO1FBQ04sSUFBSSxHQUFRLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDNUIsOENBQThDO2dCQUM5QyxPQUFPO2FBQ1I7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDM0IsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3hCO2lCQUFNO2dCQUNMLE1BQU0sS0FBSyxHQUNULElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO29CQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENB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LENBQUMsQ0FBQztnQkFDcEIsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDaEMsT0FBTztpQkFDUjthQUNGO1lBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsUUFBUTthQUNUO1NBQ0Y7SUFDSCxDQUFDOztrRkE5S1UsaUJBQWlCO3NEQUFqQixpQkFBaUI7Ozs7UUFGakIsa0VBQThCOztRQUF6Qiw4QkFBVzs7a0RBRWhCLGlCQUFpQjtjQUw3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDNUIsUUFBUSxFQUFFLGdDQUFnQzthQUMzQzsrREFFVSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFJTixJQUFJO2tCQUZILFdBQVc7bUJBQUMsV0FBVzs7a0JBQ3ZCLEtBQUs7WUFJRixVQUFVO2tCQURiLFdBQVc7bUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hdmF0YXInLFxuICBzdHlsZVVybHM6IFsnLi9BdmF0YXIuc2NzcyddLFxuICB0ZW1wbGF0ZTogJzxpbWcgKm5nSWY9XCJzcmNcIiBbc3JjXT1cInNyY1wiLz4nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQXZhdGFyRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHNvdXJjZTogYW55O1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5zaXplJylcbiAgQElucHV0KClcbiAgc2l6ZTogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuYmFja2dyb3VuZEltYWdlJylcbiAgZ2V0IGJhY2tncm91bmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHVybCgke3RoaXMuc291cmNlLnByb2ZpbGVJbWFnZX0pYDtcbiAgfVxuXG4gIHNyYzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgbmdPbkluaXQoKTogYW55IHtcbiAgICBsZXQgc3JjOiBhbnk7XG4gICAgaWYgKCh0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZSAhPT0gJycpIHx8IHRoaXMubGFiZWwpIHtcbiAgICAgIGlmICh0aGlzLnNvdXJjZS5wcm9maWxlSW1hZ2UpIHtcbiAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5zb3VyY2UucHJvZmlsZUltYWdlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc291cmNlLmxvZ28pIHtcbiAgICAgICAgc3JjID0gdGhpcy5zb3VyY2UubG9nbztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpcnN0OiBhbnkgPVxuICAgICAgICAgIHRoaXMubGFiZWwgfHwgdGhpcy5zb3VyY2UuZmlyc3ROYW1lXG4gICAgICAgICAgICA/IHRoaXMuc291cmNlLmZpcnN0TmFtZS5jaGFyQXQoMClcbiAgICAgICAgICAgIDogdGhpcy5zb3VyY2UubmFtZVxuICAgICAgICAgICAgPyB0aGlzLnNvdXJjZS5uYW1lLmNoYXJBdCgwKVxuICAgICAgICAgICAgOiB0aGlzLnNvdXJjZS51c2VybmFtZVxuICAgICAgICAgICAgPyB0aGlzLnNvdXJjZS51c2VybmFtZS5jaGFyQXQoMClcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IGxhc3Q6IGFueSA9IHRoaXMuc291cmNlLmxhc3ROYW1lID8gdGhpcy5zb3VyY2UubGFzdE5hbWUuY2hhckF0KDApIDogJyc7XG5cbiAgICAgICAgLy8gRGVmaW5pbmcgQ29sb3JzXG4gICAgICAgIGNvbnN0IGNvbG9yczogYW55ID0gW1xuICAgICAgICAgICcjMWFiYzljJyxcbiAgICAgICAgICAnIzE2YTA4NScsXG4gICAgICAgICAgJyNmMWM0MGYnLFxuICAgICAgICAgICcjZjM5YzEyJyxcbiAgICAgICAgICAnIzJlY2M3MScsXG4gICAgICAgICAgJyMyN2FlNjAnLFxuICAgICAgICAgICcjZTY3ZTIyJyxcbiAgICAgICAgICAnI2QzNTQwMCcsXG4gICAgICAgICAgJyMzNDk4ZGInLFxuICAgICAgICAgICcjMjk4MGI5JyxcbiAgICAgICAgICAnI2U3NGMzYycsXG4gICAgICAgICAgJyNjMDM5MmInLFxuICAgICAgICAgICcjOWI1OWI2JyxcbiAgICAgICAgICAnIzhlNDRhZCcsXG4gICAgICAgICAgJyNiZGMzYzcnLFxuICAgICAgICAgICcjMzQ0OTVlJyxcbiAgICAgICAgICAnIzJjM2U1MCcsXG4gICAgICAgICAgJyM5NWE1YTYnLFxuICAgICAgICAgICcjN2Y4YzhkJyxcbiAgICAgICAgICAnI2VjODdiZicsXG4gICAgICAgICAgJyNkODcwYWQnLFxuICAgICAgICAgICcjZjY5Nzg1JyxcbiAgICAgICAgICAnIzliYTM3ZScsXG4gICAgICAgICAgJyNiNDkyNTUnLFxuICAgICAgICAgICcjYjQ5MjU1JyxcbiAgICAgICAgICAnI2E5NDEzNicsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGxpZ2h0ZXJDb2xvcnM6IGFueSA9IFtcbiAgICAgICAgICAnIzE1RDZCMCcsXG4gICAgICAgICAgJyMxNkEwNjknLFxuICAgICAgICAgICcjRjFENjBGJyxcbiAgICAgICAgICAnI0YzQUMxMicsXG4gICAgICAgICAgJyMyRUQ4NUInLFxuICAgICAgICAgICcjMjhCQzdGJyxcbiAgICAgICAgICAnI0U2NjMyMicsXG4gICAgICAgICAgJyNEMzAwMkInLFxuICAgICAgICAgICcjNjUzNERCJyxcbiAgICAgICAgICAnIzI5QjJCOScsXG4gICAgICAgICAgJyNFNzNDNjMnLFxuICAgICAgICAgICcjREI2RDMxJyxcbiAgICAgICAgICAnI0NCNDhCNScsXG4gICAgICAgICAgJyM2OTQ0QUQnLFxuICAgICAgICAgICcjMzg1MzZEJyxcbiAgICAgICAgICAnIzNENjQ3MycsXG4gICAgICAgICAgJyMzOTRBNkMnLFxuICAgICAgICAgICcjOTJCQ0I3JyxcbiAgICAgICAgICAnIzdEOTlBMicsXG4gICAgICAgICAgJyNGMTRGNzYnLFxuICAgICAgICAgICcjQ0I1Q0RBJyxcbiAgICAgICAgICAnI0ZGQjQ3NScsXG4gICAgICAgICAgJyNCOUNFNkUnLFxuICAgICAgICAgICcjRERBQTRGJyxcbiAgICAgICAgICAnI0NENkY0NScsXG4gICAgICAgICAgJyNCOTM1NEEnLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBzZXR0aW5nczogYW55ID0ge1xuICAgICAgICAgIC8vIERlZmF1bHQgc2V0dGluZ3NcbiAgICAgICAgICB0ZXh0Q29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgIGZvbnRTaXplOiA1MCxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYU5ldWUtTGlnaHQsSGVsdmV0aWNhIE5ldWUgTGlnaHQsSGVsdmV0aWNhIE5ldWUsSGVsdmV0aWNhLCBBcmlhbCxMdWNpZGEgR3JhbmRlLCBzYW5zLXNlcmlmJyxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBtYWtpbmcgdGhlIHRleHQgb2JqZWN0XG4gICAgICAgIGNvbnN0IGNvbG9ySW5kZXg6IGFueSA9IE1hdGguZmxvb3IoKGZpcnN0LmNoYXJDb2RlQXQoMCkgLSA2NSkgJSBjb2xvcnMubGVuZ3RoKTtcblxuICAgICAgICBjb25zdCBjb2JqOiBhbnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0Jyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ3gnLCAnNTAlJyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCd5JywgJzUwJScpO1xuICAgICAgICBjb2JqLnNldEF0dHJpYnV0ZSgnZHknLCAnMC4zNWVtJyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XG4gICAgICAgIGNvYmouc2V0QXR0cmlidXRlKCdmaWxsJywgc2V0dGluZ3MudGV4dENvbG9yKTtcbiAgICAgICAgY29iai5zZXRBdHRyaWJ1dGUoJ2ZvbnQtZmFtaWx5Jywgc2V0dGluZ3MuZm9udEZhbWlseSk7XG4gICAgICAgIGNvYmouc3R5bGUuZm9udFdlaWdodCA9IHNldHRpbmdzLmZvbnRXZWlnaHQ7XG4gICAgICAgIGNvYmouc3R5bGUuZm9udFNpemUgPSBgJHtzZXR0aW5ncy5mb250U2l6ZX1weGA7XG5cbiAgICAgICAgY29uc3QgbHRyczogYW55ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5sYWJlbCB8fCBmaXJzdCArIGxhc3QpO1xuICAgICAgICBjb2JqLmFwcGVuZENoaWxkKGx0cnMpO1xuXG4gICAgICAgIGNvbnN0IHN2ZzogYW55ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBzZXR0aW5ncy53aWR0aCk7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHNldHRpbmdzLmhlaWdodCk7XG5cbiAgICAgICAgLy8gdGhpcy5zZXRQcmVmaXhlZFZhbHVlKHN2ZywgJ2JhY2tncm91bmQnLCBjb2xvcnNbY29sb3JJbmRleF0pO1xuICAgICAgICB0aGlzLnNldFByZWZpeGVkVmFsdWUoc3ZnLCAnYmFja2dyb3VuZCcsIGBsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCAke2NvbG9yc1tjb2xvckluZGV4XX0gMCUsICR7bGlnaHRlckNvbG9yc1tjb2xvckluZGV4XX0gMTAwJSlgKTtcblxuICAgICAgICBzdmcuc3R5bGUud2lkdGggPSBgJHtzZXR0aW5ncy53aWR0aH1weGA7XG4gICAgICAgIHN2Zy5zdHlsZS5oZWlnaHQgPSBgJHtzZXR0aW5ncy5oZWlnaHR9cHhgO1xuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQoY29iaik7XG5cbiAgICAgICAgY29uc3QgdG9wOiBhbnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9wLmFwcGVuZENoaWxkKHN2Zyk7XG5cbiAgICAgICAgY29uc3Qgc3ZnSHRtbDogYW55ID0gd2luZG93LmJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHRvcC5pbm5lckhUTUwpKSk7XG4gICAgICAgIHNyYyA9IGBkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCAke3N2Z0h0bWx9YDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3JjID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybChzcmMpO1xuICAgIH1cbiAgfVxuXG4gIHNldFByZWZpeGVkVmFsdWUoZWxtOiBhbnksIHByb3A6IGFueSwgdmFsdWU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgcHJlZml4ZXM6IGFueSA9IFsnLW1vei0nLCAnLXdlYmtpdC0nLCAnLW8tJywgJy1tcy0nLCAnLWtodG1sLSddO1xuXG4gICAgLy8gQ2xlYXJcbiAgICBlbG0uc3R5bGVbcHJvcF0gPSAnJztcbiAgICBjb25zdCBzdGFydGluZzogYW55ID0gZWxtLnN0eWxlW3Byb3BdO1xuXG4gICAgLy8gVHJ5IHJhdyBmaXJzdFxuICAgIHRyeSB7XG4gICAgICBlbG0uc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIGlmIChlbG0uc3R5bGVbcHJvcF0gIT09IHN0YXJ0aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBubyBvcFxuICAgIH1cblxuICAgIC8vIFRyeSBwcmVmaXhlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHYgPSBwcmVmaXhlc1tpXSArIHZhbHVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZWxtLnN0eWxlW3Byb3BdID0gdjtcbiAgICAgICAgaWYgKGVsbS5zdHlsZVtwcm9wXSAhPT0gc3RhcnRpbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUyKSB7XG4gICAgICAgIC8vIG5vIG9wXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=