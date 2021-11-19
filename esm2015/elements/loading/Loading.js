import { Component, ContentChildren, Directive, HostBinding, Input, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
export class NovoLoadingElement {
    constructor() {
        this.size = 'medium';
    }
    set count(value) {
        if (!value) {
            value = 5;
        }
        if (value > 5) {
            console.warn('Only 5 loading dots are allowed');
            value = 5;
        }
        this.countArray = new Array(value);
    }
}
NovoLoadingElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-loading',
                host: {
                    '[class]': 'theme || ""',
                },
                template: `<span class="dot" *ngFor="let dot of countArray"></span>`
            },] }
];
NovoLoadingElement.propDecorators = {
    theme: [{ type: Input }],
    size: [{ type: Input }],
    count: [{ type: Input }]
};
export class NovoSpinnerElement {
}
NovoSpinnerElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-spinner',
                template: `
        <svg class="bullhornSpinner" [ngClass]="theme" height="100" width="100" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" [attr.inverse]="inverse">
            <title>Bullhorn Spinner Animation</title>
            <desc>Spinner animation indicating loading</desc>
            <defs>
                <style>
                    .bullhornSpinner g.circleGroup {
                        -webkit-filter: url("{{baseHref || ''}}#gooEffect");
                        filter: url("{{baseHref || ''}}#gooEffect");
                    }
                    _:-webkit-full-screen:not(:root:root), .bullhornSpinner g.circleGroup {
                        -webkit-filter: none;
                        filter: none;
                    }
                    @supports (-webkit-text-size-adjust:none) and (not (-ms-accelerator:true)) and (not (-moz-appearance:none)) {
                        .bullhornSpinner g.circleGroup {
                            -webkit-filter: none;
                            filter: none;
                        }
                    }
                    @supports (-webkit-text-size-adjust:none) and (not (-ms-accelerator:true)) and (not (-moz-appearance:none)) {
                        .bullhornSpinner g.circleGroup {
                            -webkit-filter: none;
                            filter: none;
                        }
                    }
                </style>
                <filter id="gooEffect">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="
                            1.3 0 0 0 0
                            0 1.3 0 0 0
                            0 0 1.3 0 0
                            0 0 0 19 -7" result="gooEffect" />
                    <feComposite in="SourceGraphic" in2="gooEffect" operator="atop" />
                </filter>
            </defs>
            <path d="M 43 43 L 54 45 L 80 40 L 43 43" stroke="none" fill="none" id="firstLinePath"/>
            <path d="M 43 43 L 48 41 L 48 18 L 43 43" stroke="none" fill="none" id="secondLinePath"/>
            <path d="M 43 43 L 42 45 L 15 40 L 43 43" stroke="none" fill="none" id="thirdLinePath"/>
            <path d="M 43 43 L 44 52 L 29 78 L 43 43" stroke="none" fill="none" id="fourthLinePath"/>
            <path d="M 43 43 L 52 52 L 68 78 L 43 43" stroke="none" fill="none" id="fifthLinePath"/>
            <g class="circleGroup" transform="translate(7, 7)">
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#firstLinePath"/>
                    </animateMotion>
                </circle>
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#secondLinePath"/>
                    </animateMotion>
                </circle>
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#thirdLinePath"/>
                    </animateMotion>
                </circle>
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#fourthLinePath"/>
                    </animateMotion>
                </circle>
                <circle r="6" cx="0" cy="0">
                    <!-- Define the motion path animation -->
                    <animateMotion dur="3.4" repeatCount="indefinite">
                        <mpath xlink:href="#fifthLinePath"/>
                    </animateMotion>
                </circle>
            </g>
        </svg>
    `
            },] }
];
NovoSpinnerElement.propDecorators = {
    theme: [{ type: Input }],
    inverse: [{ type: Input }],
    baseHref: [{ type: Input }]
};
export class NovoSkeletonDirective {
    constructor() {
        this.skeleton = true;
    }
}
NovoSkeletonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[skeleton]',
            },] }
];
NovoSkeletonDirective.propDecorators = {
    skeleton: [{ type: HostBinding, args: ['class.skeleton',] }]
};
export class NovoLoadedDirective {
}
NovoLoadedDirective.decorators = [
    { type: Directive, args: [{
                selector: '[loaded]',
            },] }
];
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
        return templates && templates.map((v) => this.viewContainer.createEmbeddedView(v));
    }
    destroyViews(views) {
        if (views) {
            for (const view of views) {
                view.destroy();
            }
        }
    }
}
NovoIsLoadingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[isLoading]',
            },] }
];
NovoIsLoadingDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
NovoIsLoadingDirective.propDecorators = {
    skeletonTemplates: [{ type: ContentChildren, args: [NovoSkeletonDirective, { read: TemplateRef },] }],
    loadedTemplates: [{ type: ContentChildren, args: [NovoLoadedDirective, { read: TemplateRef },] }],
    isLoading: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9sb2FkaW5nL0xvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFtQixXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTckosTUFBTSxPQUFPLGtCQUFrQjtJQVAvQjtRQVNXLFNBQUksR0FBdUIsUUFBUSxDQUFDO0lBYS9DLENBQUM7SUFWQyxJQUFhLEtBQUssQ0FBQyxLQUFhO1FBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7UUFDRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDaEQsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNYO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7WUFyQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLGFBQWE7aUJBQ3pCO2dCQUNELFFBQVEsRUFBRSwwREFBMEQ7YUFDckU7OztvQkFFRSxLQUFLO21CQUNMLEtBQUs7b0JBR0wsS0FBSzs7QUEyRlIsTUFBTSxPQUFPLGtCQUFrQjs7O1lBL0U5QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkVQO2FBQ0o7OztvQkFFRSxLQUFLO3NCQUVMLEtBQUs7dUJBRUwsS0FBSzs7QUFPUixNQUFNLE9BQU8scUJBQXFCO0lBSGxDO1FBS0UsYUFBUSxHQUFZLElBQUksQ0FBQztJQUMzQixDQUFDOzs7WUFOQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7Ozt1QkFFRSxXQUFXLFNBQUMsZ0JBQWdCOztBQU0vQixNQUFNLE9BQU8sbUJBQW1COzs7WUFIL0IsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2FBQ3JCOztBQU1ELE1BQU0sT0FBTyxzQkFBc0I7SUFVakMsWUFBb0IsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBSjNDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsa0JBQWEsR0FBNkMsRUFBRSxDQUFDO1FBQzdELGdCQUFXLEdBQTJDLEVBQUUsQ0FBQztJQUVWLENBQUM7SUFFeEQsSUFDSSxTQUFTLENBQUMsU0FBa0I7UUFDOUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUNELFdBQVcsQ0FBQyxTQUFzQztRQUNoRCxPQUFPLFNBQVMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUNELFlBQVksQ0FBQyxLQUE2QjtRQUN4QyxJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO2dCQUN4QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7U0FDRjtJQUNILENBQUM7OztZQXBDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7YUFDeEI7OztZQWhJNEcsZ0JBQWdCOzs7Z0NBa0kxSCxlQUFlLFNBQUMscUJBQXFCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOzhCQUU1RCxlQUFlLFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO3dCQVMxRCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1sb2FkaW5nJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ3RoZW1lIHx8IFwiXCInLFxuICB9LFxuICB0ZW1wbGF0ZTogYDxzcGFuIGNsYXNzPVwiZG90XCIgKm5nRm9yPVwibGV0IGRvdCBvZiBjb3VudEFycmF5XCI+PC9zcGFuPmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Mb2FkaW5nRWxlbWVudCB7XG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNpemU6ICdzbWFsbCcgfCAnbWVkaXVtJyA9ICdtZWRpdW0nO1xuXG4gIGNvdW50QXJyYXk6IG51bWJlcltdO1xuICBASW5wdXQoKSBzZXQgY291bnQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gNTtcbiAgICB9XG4gICAgaWYgKHZhbHVlID4gNSkge1xuICAgICAgY29uc29sZS53YXJuKCdPbmx5IDUgbG9hZGluZyBkb3RzIGFyZSBhbGxvd2VkJyk7XG4gICAgICB2YWx1ZSA9IDU7XG4gICAgfVxuICAgIHRoaXMuY291bnRBcnJheSA9IG5ldyBBcnJheSh2YWx1ZSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zcGlubmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHN2ZyBjbGFzcz1cImJ1bGxob3JuU3Bpbm5lclwiIFtuZ0NsYXNzXT1cInRoZW1lXCIgaGVpZ2h0PVwiMTAwXCIgd2lkdGg9XCIxMDBcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIFthdHRyLmludmVyc2VdPVwiaW52ZXJzZVwiPlxuICAgICAgICAgICAgPHRpdGxlPkJ1bGxob3JuIFNwaW5uZXIgQW5pbWF0aW9uPC90aXRsZT5cbiAgICAgICAgICAgIDxkZXNjPlNwaW5uZXIgYW5pbWF0aW9uIGluZGljYXRpbmcgbG9hZGluZzwvZGVzYz5cbiAgICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgICAgIDxzdHlsZT5cbiAgICAgICAgICAgICAgICAgICAgLmJ1bGxob3JuU3Bpbm5lciBnLmNpcmNsZUdyb3VwIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtZmlsdGVyOiB1cmwoXCJ7e2Jhc2VIcmVmIHx8ICcnfX0jZ29vRWZmZWN0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiB1cmwoXCJ7e2Jhc2VIcmVmIHx8ICcnfX0jZ29vRWZmZWN0XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF86LXdlYmtpdC1mdWxsLXNjcmVlbjpub3QoOnJvb3Q6cm9vdCksIC5idWxsaG9yblNwaW5uZXIgZy5jaXJjbGVHcm91cCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAtd2Via2l0LWZpbHRlcjogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBAc3VwcG9ydHMgKC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDpub25lKSBhbmQgKG5vdCAoLW1zLWFjY2VsZXJhdG9yOnRydWUpKSBhbmQgKG5vdCAoLW1vei1hcHBlYXJhbmNlOm5vbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuYnVsbGhvcm5TcGlubmVyIGcuY2lyY2xlR3JvdXAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtZmlsdGVyOiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBAc3VwcG9ydHMgKC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDpub25lKSBhbmQgKG5vdCAoLW1zLWFjY2VsZXJhdG9yOnRydWUpKSBhbmQgKG5vdCAoLW1vei1hcHBlYXJhbmNlOm5vbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuYnVsbGhvcm5TcGlubmVyIGcuY2lyY2xlR3JvdXAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtZmlsdGVyOiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvc3R5bGU+XG4gICAgICAgICAgICAgICAgPGZpbHRlciBpZD1cImdvb0VmZmVjdFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49XCJTb3VyY2VHcmFwaGljXCIgc3RkRGV2aWF0aW9uPVwiNVwiIHJlc3VsdD1cImJsdXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCBpbj1cImJsdXJcIiBtb2RlPVwibWF0cml4XCIgdmFsdWVzPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMS4zIDAgMCAwIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwIDEuMyAwIDAgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgMCAxLjMgMCAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMCAwIDAgMTkgLTdcIiByZXN1bHQ9XCJnb29FZmZlY3RcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49XCJTb3VyY2VHcmFwaGljXCIgaW4yPVwiZ29vRWZmZWN0XCIgb3BlcmF0b3I9XCJhdG9wXCIgLz5cbiAgICAgICAgICAgICAgICA8L2ZpbHRlcj5cbiAgICAgICAgICAgIDwvZGVmcz5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNIDQzIDQzIEwgNTQgNDUgTCA4MCA0MCBMIDQzIDQzXCIgc3Ryb2tlPVwibm9uZVwiIGZpbGw9XCJub25lXCIgaWQ9XCJmaXJzdExpbmVQYXRoXCIvPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0gNDMgNDMgTCA0OCA0MSBMIDQ4IDE4IEwgNDMgNDNcIiBzdHJva2U9XCJub25lXCIgZmlsbD1cIm5vbmVcIiBpZD1cInNlY29uZExpbmVQYXRoXCIvPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0gNDMgNDMgTCA0MiA0NSBMIDE1IDQwIEwgNDMgNDNcIiBzdHJva2U9XCJub25lXCIgZmlsbD1cIm5vbmVcIiBpZD1cInRoaXJkTGluZVBhdGhcIi8+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTSA0MyA0MyBMIDQ0IDUyIEwgMjkgNzggTCA0MyA0M1wiIHN0cm9rZT1cIm5vbmVcIiBmaWxsPVwibm9uZVwiIGlkPVwiZm91cnRoTGluZVBhdGhcIi8+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTSA0MyA0MyBMIDUyIDUyIEwgNjggNzggTCA0MyA0M1wiIHN0cm9rZT1cIm5vbmVcIiBmaWxsPVwibm9uZVwiIGlkPVwiZmlmdGhMaW5lUGF0aFwiLz5cbiAgICAgICAgICAgIDxnIGNsYXNzPVwiY2lyY2xlR3JvdXBcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNywgNylcIj5cbiAgICAgICAgICAgICAgICA8Y2lyY2xlIHI9XCI2XCIgY3g9XCIwXCIgY3k9XCIwXCI+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRGVmaW5lIHRoZSBtb3Rpb24gcGF0aCBhbmltYXRpb24gLS0+XG4gICAgICAgICAgICAgICAgICAgIDxhbmltYXRlTW90aW9uIGR1cj1cIjMuNFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1wYXRoIHhsaW5rOmhyZWY9XCIjZmlyc3RMaW5lUGF0aFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9hbmltYXRlTW90aW9uPlxuICAgICAgICAgICAgICAgIDwvY2lyY2xlPlxuICAgICAgICAgICAgICAgIDxjaXJjbGUgcj1cIjZcIiBjeD1cIjBcIiBjeT1cIjBcIj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBEZWZpbmUgdGhlIG1vdGlvbiBwYXRoIGFuaW1hdGlvbiAtLT5cbiAgICAgICAgICAgICAgICAgICAgPGFuaW1hdGVNb3Rpb24gZHVyPVwiMy40XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bXBhdGggeGxpbms6aHJlZj1cIiNzZWNvbmRMaW5lUGF0aFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9hbmltYXRlTW90aW9uPlxuICAgICAgICAgICAgICAgIDwvY2lyY2xlPlxuICAgICAgICAgICAgICAgIDxjaXJjbGUgcj1cIjZcIiBjeD1cIjBcIiBjeT1cIjBcIj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBEZWZpbmUgdGhlIG1vdGlvbiBwYXRoIGFuaW1hdGlvbiAtLT5cbiAgICAgICAgICAgICAgICAgICAgPGFuaW1hdGVNb3Rpb24gZHVyPVwiMy40XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bXBhdGggeGxpbms6aHJlZj1cIiN0aGlyZExpbmVQYXRoXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2FuaW1hdGVNb3Rpb24+XG4gICAgICAgICAgICAgICAgPC9jaXJjbGU+XG4gICAgICAgICAgICAgICAgPGNpcmNsZSByPVwiNlwiIGN4PVwiMFwiIGN5PVwiMFwiPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIERlZmluZSB0aGUgbW90aW9uIHBhdGggYW5pbWF0aW9uIC0tPlxuICAgICAgICAgICAgICAgICAgICA8YW5pbWF0ZU1vdGlvbiBkdXI9XCIzLjRcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtcGF0aCB4bGluazpocmVmPVwiI2ZvdXJ0aExpbmVQYXRoXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2FuaW1hdGVNb3Rpb24+XG4gICAgICAgICAgICAgICAgPC9jaXJjbGU+XG4gICAgICAgICAgICAgICAgPGNpcmNsZSByPVwiNlwiIGN4PVwiMFwiIGN5PVwiMFwiPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIERlZmluZSB0aGUgbW90aW9uIHBhdGggYW5pbWF0aW9uIC0tPlxuICAgICAgICAgICAgICAgICAgICA8YW5pbWF0ZU1vdGlvbiBkdXI9XCIzLjRcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtcGF0aCB4bGluazpocmVmPVwiI2ZpZnRoTGluZVBhdGhcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvYW5pbWF0ZU1vdGlvbj5cbiAgICAgICAgICAgICAgICA8L2NpcmNsZT5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9zdmc+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NwaW5uZXJFbGVtZW50IHtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgaW52ZXJzZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgYmFzZUhyZWY6IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NrZWxldG9uXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ta2VsZXRvbkRpcmVjdGl2ZSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2tlbGV0b24nKVxuICBza2VsZXRvbjogYm9vbGVhbiA9IHRydWU7XG59XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbG9hZGVkXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Mb2FkZWREaXJlY3RpdmUgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tpc0xvYWRpbmddJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0lzTG9hZGluZ0RpcmVjdGl2ZSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b1NrZWxldG9uRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pXG4gIHB1YmxpYyBza2VsZXRvblRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9Mb2FkZWREaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSlcbiAgcHVibGljIGxvYWRlZFRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gIHByaXZhdGUgaGFzVmlldyA9IGZhbHNlO1xuICBwcml2YXRlIHNrZWxldG9uVmlld3M6IEVtYmVkZGVkVmlld1JlZjxOb3ZvU2tlbGV0b25EaXJlY3RpdmU+W10gPSBbXTtcbiAgcHJpdmF0ZSBsb2FkZWRWaWV3czogRW1iZWRkZWRWaWV3UmVmPE5vdm9Mb2FkZWREaXJlY3RpdmU+W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHsgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBpc0xvYWRpbmcoY29uZGl0aW9uOiBib29sZWFuKSB7XG4gICAgaWYgKCFjb25kaXRpb24gJiYgIXRoaXMuaGFzVmlldykge1xuICAgICAgdGhpcy5kZXN0cm95Vmlld3ModGhpcy5sb2FkZWRWaWV3cyk7XG4gICAgICB0aGlzLnNrZWxldG9uVmlld3MgPSB0aGlzLmNyZWF0ZVZpZXdzKHRoaXMuc2tlbGV0b25UZW1wbGF0ZXMpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGNvbmRpdGlvbiAmJiB0aGlzLmhhc1ZpZXcpIHtcbiAgICAgIHRoaXMuZGVzdHJveVZpZXdzKHRoaXMuc2tlbGV0b25WaWV3cyk7XG4gICAgICB0aGlzLmxvYWRlZFZpZXdzID0gdGhpcy5jcmVhdGVWaWV3cyh0aGlzLmxvYWRlZFRlbXBsYXRlcyk7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgY3JlYXRlVmlld3ModGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj4pIHtcbiAgICByZXR1cm4gdGVtcGxhdGVzICYmIHRlbXBsYXRlcy5tYXAoKHYpID0+IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodikpO1xuICB9XG4gIGRlc3Ryb3lWaWV3cyh2aWV3czogRW1iZWRkZWRWaWV3UmVmPGFueT5bXSkge1xuICAgIGlmICh2aWV3cykge1xuICAgICAgZm9yIChjb25zdCB2aWV3IG9mIHZpZXdzKSB7XG4gICAgICAgIHZpZXcuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19