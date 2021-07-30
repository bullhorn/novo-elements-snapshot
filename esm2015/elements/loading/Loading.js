// NG2
import { Component, ContentChildren, Directive, HostBinding, Input, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
export class NovoLoadingElement {
}
NovoLoadingElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-loading',
                host: {
                    '[class]': 'theme || ""',
                },
                template: `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `
            },] }
];
NovoLoadingElement.propDecorators = {
    theme: [{ type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvbG9hZGluZy9Mb2FkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQW1CLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWVySixNQUFNLE9BQU8sa0JBQWtCOzs7WUFiOUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLGFBQWE7aUJBQ3pCO2dCQUNELFFBQVEsRUFBRTs7Ozs7O0tBTVA7YUFDSjs7O29CQUVFLEtBQUs7O0FBbUZSLE1BQU0sT0FBTyxrQkFBa0I7OztZQS9FOUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTJFUDthQUNKOzs7b0JBRUUsS0FBSztzQkFFTCxLQUFLO3VCQUVMLEtBQUs7O0FBT1IsTUFBTSxPQUFPLHFCQUFxQjtJQUhsQztRQUtFLGFBQVEsR0FBWSxJQUFJLENBQUM7SUFDM0IsQ0FBQzs7O1lBTkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2FBQ3ZCOzs7dUJBRUUsV0FBVyxTQUFDLGdCQUFnQjs7QUFNL0IsTUFBTSxPQUFPLG1CQUFtQjs7O1lBSC9CLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTthQUNyQjs7QUFNRCxNQUFNLE9BQU8sc0JBQXNCO0lBVWpDLFlBQW9CLGFBQStCO1FBQS9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUozQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGtCQUFhLEdBQTZDLEVBQUUsQ0FBQztRQUM3RCxnQkFBVyxHQUEyQyxFQUFFLENBQUM7SUFFVixDQUFDO0lBRXhELElBQ0ksU0FBUyxDQUFDLFNBQWtCO1FBQzlCLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjthQUFNLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN0QjtJQUNILENBQUM7SUFDRCxXQUFXLENBQUMsU0FBc0M7UUFDaEQsT0FBTyxTQUFTLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFDRCxZQUFZLENBQUMsS0FBNkI7UUFDeEMsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCO1NBQ0Y7SUFDSCxDQUFDOzs7WUFwQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCOzs7WUExSDRHLGdCQUFnQjs7O2dDQTRIMUgsZUFBZSxTQUFDLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs4QkFFNUQsZUFBZSxTQUFDLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTt3QkFTMUQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbWJlZGRlZFZpZXdSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWxvYWRpbmcnLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3NdJzogJ3RoZW1lIHx8IFwiXCInLFxyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImRvdFwiPjwvc3Bhbj5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvTG9hZGluZ0VsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgdGhlbWU6IHN0cmluZztcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXNwaW5uZXInLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPHN2ZyBjbGFzcz1cImJ1bGxob3JuU3Bpbm5lclwiIFtuZ0NsYXNzXT1cInRoZW1lXCIgaGVpZ2h0PVwiMTAwXCIgd2lkdGg9XCIxMDBcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIFthdHRyLmludmVyc2VdPVwiaW52ZXJzZVwiPlxyXG4gICAgICAgICAgICA8dGl0bGU+QnVsbGhvcm4gU3Bpbm5lciBBbmltYXRpb248L3RpdGxlPlxyXG4gICAgICAgICAgICA8ZGVzYz5TcGlubmVyIGFuaW1hdGlvbiBpbmRpY2F0aW5nIGxvYWRpbmc8L2Rlc2M+XHJcbiAgICAgICAgICAgIDxkZWZzPlxyXG4gICAgICAgICAgICAgICAgPHN0eWxlPlxyXG4gICAgICAgICAgICAgICAgICAgIC5idWxsaG9yblNwaW5uZXIgZy5jaXJjbGVHcm91cCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtZmlsdGVyOiB1cmwoXCJ7e2Jhc2VIcmVmIHx8ICcnfX0jZ29vRWZmZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IHVybChcInt7YmFzZUhyZWYgfHwgJyd9fSNnb29FZmZlY3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF86LXdlYmtpdC1mdWxsLXNjcmVlbjpub3QoOnJvb3Q6cm9vdCksIC5idWxsaG9yblNwaW5uZXIgZy5jaXJjbGVHcm91cCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtZmlsdGVyOiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IG5vbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIEBzdXBwb3J0cyAoLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0Om5vbmUpIGFuZCAobm90ICgtbXMtYWNjZWxlcmF0b3I6dHJ1ZSkpIGFuZCAobm90ICgtbW96LWFwcGVhcmFuY2U6bm9uZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmJ1bGxob3JuU3Bpbm5lciBnLmNpcmNsZUdyb3VwIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtZmlsdGVyOiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIEBzdXBwb3J0cyAoLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0Om5vbmUpIGFuZCAobm90ICgtbXMtYWNjZWxlcmF0b3I6dHJ1ZSkpIGFuZCAobm90ICgtbW96LWFwcGVhcmFuY2U6bm9uZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmJ1bGxob3JuU3Bpbm5lciBnLmNpcmNsZUdyb3VwIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtZmlsdGVyOiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAgICAgICAgIDxmaWx0ZXIgaWQ9XCJnb29FZmZlY3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49XCJTb3VyY2VHcmFwaGljXCIgc3RkRGV2aWF0aW9uPVwiNVwiIHJlc3VsdD1cImJsdXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPVwiYmx1clwiIG1vZGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEuMyAwIDAgMCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwIDEuMyAwIDAgMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMCAwIDEuMyAwIDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgMCAwIDE5IC03XCIgcmVzdWx0PVwiZ29vRWZmZWN0XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49XCJTb3VyY2VHcmFwaGljXCIgaW4yPVwiZ29vRWZmZWN0XCIgb3BlcmF0b3I9XCJhdG9wXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZmlsdGVyPlxyXG4gICAgICAgICAgICA8L2RlZnM+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNIDQzIDQzIEwgNTQgNDUgTCA4MCA0MCBMIDQzIDQzXCIgc3Ryb2tlPVwibm9uZVwiIGZpbGw9XCJub25lXCIgaWQ9XCJmaXJzdExpbmVQYXRoXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTSA0MyA0MyBMIDQ4IDQxIEwgNDggMTggTCA0MyA0M1wiIHN0cm9rZT1cIm5vbmVcIiBmaWxsPVwibm9uZVwiIGlkPVwic2Vjb25kTGluZVBhdGhcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNIDQzIDQzIEwgNDIgNDUgTCAxNSA0MCBMIDQzIDQzXCIgc3Ryb2tlPVwibm9uZVwiIGZpbGw9XCJub25lXCIgaWQ9XCJ0aGlyZExpbmVQYXRoXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTSA0MyA0MyBMIDQ0IDUyIEwgMjkgNzggTCA0MyA0M1wiIHN0cm9rZT1cIm5vbmVcIiBmaWxsPVwibm9uZVwiIGlkPVwiZm91cnRoTGluZVBhdGhcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNIDQzIDQzIEwgNTIgNTIgTCA2OCA3OCBMIDQzIDQzXCIgc3Ryb2tlPVwibm9uZVwiIGZpbGw9XCJub25lXCIgaWQ9XCJmaWZ0aExpbmVQYXRoXCIvPlxyXG4gICAgICAgICAgICA8ZyBjbGFzcz1cImNpcmNsZUdyb3VwXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDcsIDcpXCI+XHJcbiAgICAgICAgICAgICAgICA8Y2lyY2xlIHI9XCI2XCIgY3g9XCIwXCIgY3k9XCIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLSBEZWZpbmUgdGhlIG1vdGlvbiBwYXRoIGFuaW1hdGlvbiAtLT5cclxuICAgICAgICAgICAgICAgICAgICA8YW5pbWF0ZU1vdGlvbiBkdXI9XCIzLjRcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG1wYXRoIHhsaW5rOmhyZWY9XCIjZmlyc3RMaW5lUGF0aFwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2FuaW1hdGVNb3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8L2NpcmNsZT5cclxuICAgICAgICAgICAgICAgIDxjaXJjbGUgcj1cIjZcIiBjeD1cIjBcIiBjeT1cIjBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8IS0tIERlZmluZSB0aGUgbW90aW9uIHBhdGggYW5pbWF0aW9uIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhbmltYXRlTW90aW9uIGR1cj1cIjMuNFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bXBhdGggeGxpbms6aHJlZj1cIiNzZWNvbmRMaW5lUGF0aFwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2FuaW1hdGVNb3Rpb24+XHJcbiAgICAgICAgICAgICAgICA8L2NpcmNsZT5cclxuICAgICAgICAgICAgICAgIDxjaXJjbGUgcj1cIjZcIiBjeD1cIjBcIiBjeT1cIjBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8IS0tIERlZmluZSB0aGUgbW90aW9uIHBhdGggYW5pbWF0aW9uIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhbmltYXRlTW90aW9uIGR1cj1cIjMuNFwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bXBhdGggeGxpbms6aHJlZj1cIiN0aGlyZExpbmVQYXRoXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYW5pbWF0ZU1vdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvY2lyY2xlPlxyXG4gICAgICAgICAgICAgICAgPGNpcmNsZSByPVwiNlwiIGN4PVwiMFwiIGN5PVwiMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRGVmaW5lIHRoZSBtb3Rpb24gcGF0aCBhbmltYXRpb24gLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGFuaW1hdGVNb3Rpb24gZHVyPVwiMy40XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtcGF0aCB4bGluazpocmVmPVwiI2ZvdXJ0aExpbmVQYXRoXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYW5pbWF0ZU1vdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvY2lyY2xlPlxyXG4gICAgICAgICAgICAgICAgPGNpcmNsZSByPVwiNlwiIGN4PVwiMFwiIGN5PVwiMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRGVmaW5lIHRoZSBtb3Rpb24gcGF0aCBhbmltYXRpb24gLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGFuaW1hdGVNb3Rpb24gZHVyPVwiMy40XCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtcGF0aCB4bGluazpocmVmPVwiI2ZpZnRoTGluZVBhdGhcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hbmltYXRlTW90aW9uPlxyXG4gICAgICAgICAgICAgICAgPC9jaXJjbGU+XHJcbiAgICAgICAgICAgIDwvZz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvU3Bpbm5lckVsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgdGhlbWU6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGludmVyc2U6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBiYXNlSHJlZjogc3RyaW5nO1xyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tza2VsZXRvbl0nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1NrZWxldG9uRGlyZWN0aXZlIHtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNrZWxldG9uJylcclxuICBza2VsZXRvbjogYm9vbGVhbiA9IHRydWU7XHJcbn1cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbG9hZGVkXScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvTG9hZGVkRGlyZWN0aXZlIHsgfVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaXNMb2FkaW5nXScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvSXNMb2FkaW5nRGlyZWN0aXZlIHtcclxuICBAQ29udGVudENoaWxkcmVuKE5vdm9Ta2VsZXRvbkRpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KVxyXG4gIHB1YmxpYyBza2VsZXRvblRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0xvYWRlZERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KVxyXG4gIHB1YmxpYyBsb2FkZWRUZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcclxuXHJcbiAgcHJpdmF0ZSBoYXNWaWV3ID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBza2VsZXRvblZpZXdzOiBFbWJlZGRlZFZpZXdSZWY8Tm92b1NrZWxldG9uRGlyZWN0aXZlPltdID0gW107XHJcbiAgcHJpdmF0ZSBsb2FkZWRWaWV3czogRW1iZWRkZWRWaWV3UmVmPE5vdm9Mb2FkZWREaXJlY3RpdmU+W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7IH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgaXNMb2FkaW5nKGNvbmRpdGlvbjogYm9vbGVhbikge1xyXG4gICAgaWYgKCFjb25kaXRpb24gJiYgIXRoaXMuaGFzVmlldykge1xyXG4gICAgICB0aGlzLmRlc3Ryb3lWaWV3cyh0aGlzLmxvYWRlZFZpZXdzKTtcclxuICAgICAgdGhpcy5za2VsZXRvblZpZXdzID0gdGhpcy5jcmVhdGVWaWV3cyh0aGlzLnNrZWxldG9uVGVtcGxhdGVzKTtcclxuICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoY29uZGl0aW9uICYmIHRoaXMuaGFzVmlldykge1xyXG4gICAgICB0aGlzLmRlc3Ryb3lWaWV3cyh0aGlzLnNrZWxldG9uVmlld3MpO1xyXG4gICAgICB0aGlzLmxvYWRlZFZpZXdzID0gdGhpcy5jcmVhdGVWaWV3cyh0aGlzLmxvYWRlZFRlbXBsYXRlcyk7XHJcbiAgICAgIHRoaXMuaGFzVmlldyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICBjcmVhdGVWaWV3cyh0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+Pikge1xyXG4gICAgcmV0dXJuIHRlbXBsYXRlcyAmJiB0ZW1wbGF0ZXMubWFwKCh2KSA9PiB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHYpKTtcclxuICB9XHJcbiAgZGVzdHJveVZpZXdzKHZpZXdzOiBFbWJlZGRlZFZpZXdSZWY8YW55PltdKSB7XHJcbiAgICBpZiAodmlld3MpIHtcclxuICAgICAgZm9yIChjb25zdCB2aWV3IG9mIHZpZXdzKSB7XHJcbiAgICAgICAgdmlldy5kZXN0cm95KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19