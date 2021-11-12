import { __decorate, __metadata } from "tslib";
// NG2
import { Component, Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { BooleanInput } from '../../utils';
export class CardActionsElement {
}
CardActionsElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-card-actions',
                template: '<ng-content></ng-content>'
            },] }
];
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export class CardContentElement {
    constructor() {
        this.condensed = false;
    }
}
CardContentElement.decorators = [
    { type: Directive, args: [{
                selector: 'novo-card-content, [novo-card-content], [novoCardContent]',
                host: { class: 'novo-card-content', '[class.condensed]': 'condensed' },
            },] }
];
CardContentElement.propDecorators = {
    condensed: [{ type: Input }]
};
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardContentElement.prototype, "condensed", void 0);
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export class CardHeaderElement {
}
CardHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-card-header, [novo-card-header], [novoCardHeader]',
                host: { class: 'novo-card-header' },
                template: `
    <ng-content select="novo-avatar, [novo-avatar], novo-icon"></ng-content>
    <div class="novo-card-header-text">
      <ng-content select="novo-title, [novo-title], novo-text, novo-label, novo-caption"></ng-content>
    </div>
    <ng-content></ng-content>
    <div class="novo-card-header-actions">
      <ng-content select="novo-action"></ng-content>
    </div>
  `
            },] }
];
export class CardFooterElement {
}
CardFooterElement.decorators = [
    { type: Directive, args: [{
                selector: 'novo-card-footer, [novo-card-footer], [novoCardFooter]',
                host: { class: 'novo-card-footer' },
            },] }
];
export class CardElement {
    constructor(labels) {
        this.padding = true;
        this.config = {};
        this.inset = 'none';
        this.onClose = new EventEmitter();
        this.onRefresh = new EventEmitter();
        this.labels = labels;
    }
    get hbInset() {
        return `novo-card-inset-${this.inset}`;
    }
    ngOnInit() {
        this.config = this.config || {};
    }
    ngOnChanges(changes) {
        this.config = this.config || {};
        this.cardAutomationId = `${(this.title || this.config.title || 'no-title').toLowerCase().replace(/\s/g, '-')}-card`;
        const newIcon = this.icon || this.config.icon;
        const newMessageIcon = this.messageIcon || this.config.messageIcon;
        this.iconClass = newIcon ? `bhi-${newIcon}` : null;
        this.messageIconClass = newMessageIcon ? `bhi-${newMessageIcon}` : null;
    }
    toggleClose() {
        if (!this.config.onClose) {
            this.onClose.next();
        }
        else {
            this.config.onClose();
        }
    }
    toggleRefresh() {
        if (!this.config.onRefresh) {
            this.onRefresh.next();
        }
        else {
            this.config.onRefresh();
        }
    }
}
CardElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-card',
                host: {
                    class: 'novo-card',
                    '[attr.data-automation-id]': 'cardAutomationId',
                    '[class.loading]': 'loading || config.loading',
                },
                template: `
    <!--Loading-->
    <div class="card-loading-container" *ngIf="loading || config.loading">
      <novo-loading theme="line" [attr.data-automation-id]="cardAutomationId + '-loading'"></novo-loading>
    </div>
    <!--Card Header-->
    <header *ngIf="title || config.title">
      <div class="title">
        <!--Grabber Icon-->
        <span tooltip="{{ labels.move }}" tooltipPosition="bottom-right">
          <novo-icon *ngIf="move || config.move" [attr.data-automation-id]="cardAutomationId + '-move'">move</novo-icon>
        </span>
        <!--Card Title-->
        <h3 [attr.data-automation-id]="cardAutomationId + '-title'">
          <span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="icon" [ngClass]="iconClass"></i></span>
          {{ title || config.title }}
        </h3>
      </div>
      <!--Card Actions-->
      <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
        <ng-content select="novo-card-actions"></ng-content>
        <novo-button
          theme="icon"
          icon="refresh"
          (click)="toggleRefresh()"
          *ngIf="refresh || config.refresh"
          [attr.data-automation-id]="cardAutomationId + '-refresh'"
          tooltip="{{ labels.refresh }}"
          tooltipPosition="bottom-left"
        ></novo-button>

        <novo-button
          theme="icon"
          icon="close-o"
          (click)="toggleClose()"
          *ngIf="close || config.close"
          [attr.data-automation-id]="cardAutomationId + '-close'"
          tooltip="{{ labels.close }}"
          tooltipPosition="bottom-left"
        ></novo-button>
      </div>
    </header>
    <!--Content (transcluded)-->
    <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)"></ng-content>
    <!--Error/Empty Message-->
    <p
      class="card-message"
      *ngIf="!(loading || config.loading) && (message || config.message)"
      [attr.data-automation-id]="cardAutomationId + '-message'"
    >
      <i *ngIf="messageIconClass" [ngClass]="messageIconClass"></i> <span [innerHtml]="message || config.message"></span>
    </p>
    <!--Card Footer-->
    <ng-content
      *ngIf="!(loading || config.loading) && !(message || config.message)"
      select="footer,novo-card-footer,[novo-card-footer],[novoCardFooter]"
    ></ng-content>
  `
            },] }
];
CardElement.ctorParameters = () => [
    { type: NovoLabelService }
];
CardElement.propDecorators = {
    padding: [{ type: Input }],
    config: [{ type: Input }],
    title: [{ type: Input }],
    message: [{ type: Input }],
    messageIcon: [{ type: Input }],
    icon: [{ type: Input }],
    iconTooltip: [{ type: Input }],
    refresh: [{ type: Input }],
    close: [{ type: Input }],
    move: [{ type: Input }],
    loading: [{ type: Input }],
    inline: [{ type: Input }, { type: HostBinding, args: ['class.novo-card-inline',] }],
    inset: [{ type: Input }],
    hbInset: [{ type: HostBinding, args: ['class',] }],
    onClose: [{ type: Output }],
    onRefresh: [{ type: Output }]
};
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardElement.prototype, "inline", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jYXJkL0NhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNqSSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU0zQyxNQUFNLE9BQU8sa0JBQWtCOzs7WUFKOUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSwyQkFBMkI7YUFDdEM7O0FBR0Q7O0dBRUc7QUFLSCxNQUFNLE9BQU8sa0JBQWtCO0lBSi9CO1FBSzJCLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFDdEQsQ0FBQzs7O1lBTkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyREFBMkQ7Z0JBQ3JFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUU7YUFDdkU7Ozt3QkFFRSxLQUFLOztBQUFtQjtJQUFmLFlBQVksRUFBRTs7cURBQTRCO0FBR3REOztHQUVHO0FBZUgsTUFBTSxPQUFPLGlCQUFpQjs7O1lBZDdCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0RBQXdEO2dCQUNsRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7YUFDRjs7QUFPRCxNQUFNLE9BQU8saUJBQWlCOzs7WUFKN0IsU0FBUyxTQUFDO2dC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SUFGQyxZQUFZLEVBQUU7OzJDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FyZC1hY3Rpb25zJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEFjdGlvbnNFbGVtZW50IHt9XG5cbi8qKlxuICogQ29udGVudCBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtY29udGVudCwgW25vdm8tY2FyZC1jb250ZW50XSwgW25vdm9DYXJkQ29udGVudF0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWNvbnRlbnQnLCAnW2NsYXNzLmNvbmRlbnNlZF0nOiAnY29uZGVuc2VkJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkQ29udGVudEVsZW1lbnQge1xuICBASW5wdXQoKSBAQm9vbGVhbklucHV0KCkgY29uZGVuc2VkOiBib29sZWFuID0gZmFsc2U7XG59XG5cbi8qKlxuICogQ29udGVudCBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtaGVhZGVyLCBbbm92by1jYXJkLWhlYWRlcl0sIFtub3ZvQ2FyZEhlYWRlcl0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWhlYWRlcicgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWF2YXRhciwgW25vdm8tYXZhdGFyXSwgbm92by1pY29uXCI+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNhcmQtaGVhZGVyLXRleHRcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGl0bGUsIFtub3ZvLXRpdGxlXSwgbm92by10ZXh0LCBub3ZvLWxhYmVsLCBub3ZvLWNhcHRpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNhcmQtaGVhZGVyLWFjdGlvbnNcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tYWN0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkSGVhZGVyRWxlbWVudCB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtZm9vdGVyLCBbbm92by1jYXJkLWZvb3Rlcl0sIFtub3ZvQ2FyZEZvb3Rlcl0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWZvb3RlcicgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEZvb3RlckVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jYXJkJyxcbiAgICAnW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXSc6ICdjYXJkQXV0b21hdGlvbklkJyxcbiAgICAnW2NsYXNzLmxvYWRpbmddJzogJ2xvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcnLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS1Mb2FkaW5nLS0+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQtbG9hZGluZy1jb250YWluZXJcIiAqbmdJZj1cImxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmdcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWxvYWRpbmcnXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPCEtLUNhcmQgSGVhZGVyLS0+XG4gICAgPGhlYWRlciAqbmdJZj1cInRpdGxlIHx8IGNvbmZpZy50aXRsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgIDwhLS1HcmFiYmVyIEljb24tLT5cbiAgICAgICAgPHNwYW4gdG9vbHRpcD1cInt7IGxhYmVscy5tb3ZlIH19XCIgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLXJpZ2h0XCI+XG4gICAgICAgICAgPG5vdm8taWNvbiAqbmdJZj1cIm1vdmUgfHwgY29uZmlnLm1vdmVcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctbW92ZSdcIj5tb3ZlPC9ub3ZvLWljb24+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPCEtLUNhcmQgVGl0bGUtLT5cbiAgICAgICAgPGgzIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy10aXRsZSdcIj5cbiAgICAgICAgICA8c3BhbiBbdG9vbHRpcF09XCJpY29uVG9vbHRpcFwiIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCI+PGkgKm5nSWY9XCJpY29uXCIgW25nQ2xhc3NdPVwiaWNvbkNsYXNzXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgICB7eyB0aXRsZSB8fCBjb25maWcudGl0bGUgfX1cbiAgICAgICAgPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLUNhcmQgQWN0aW9ucy0tPlxuICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctYWN0aW9ucydcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1jYXJkLWFjdGlvbnNcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgaWNvbj1cInJlZnJlc2hcIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVSZWZyZXNoKClcIlxuICAgICAgICAgICpuZ0lmPVwicmVmcmVzaCB8fCBjb25maWcucmVmcmVzaFwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLXJlZnJlc2gnXCJcbiAgICAgICAgICB0b29sdGlwPVwie3sgbGFiZWxzLnJlZnJlc2ggfX1cIlxuICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbS1sZWZ0XCJcbiAgICAgICAgPjwvbm92by1idXR0b24+XG5cbiAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICBpY29uPVwiY2xvc2Utb1wiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUNsb3NlKClcIlxuICAgICAgICAgICpuZ0lmPVwiY2xvc2UgfHwgY29uZmlnLmNsb3NlXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctY2xvc2UnXCJcbiAgICAgICAgICB0b29sdGlwPVwie3sgbGFiZWxzLmNsb3NlIH19XCJcbiAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b20tbGVmdFwiXG4gICAgICAgID48L25vdm8tYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG4gICAgPCEtLUNvbnRlbnQgKHRyYW5zY2x1ZGVkKS0tPlxuICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIShsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nKSAmJiAhKG1lc3NhZ2UgfHwgY29uZmlnLm1lc3NhZ2UpXCI+PC9uZy1jb250ZW50PlxuICAgIDwhLS1FcnJvci9FbXB0eSBNZXNzYWdlLS0+XG4gICAgPHBcbiAgICAgIGNsYXNzPVwiY2FyZC1tZXNzYWdlXCJcbiAgICAgICpuZ0lmPVwiIShsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nKSAmJiAobWVzc2FnZSB8fCBjb25maWcubWVzc2FnZSlcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLW1lc3NhZ2UnXCJcbiAgICA+XG4gICAgICA8aSAqbmdJZj1cIm1lc3NhZ2VJY29uQ2xhc3NcIiBbbmdDbGFzc109XCJtZXNzYWdlSWNvbkNsYXNzXCI+PC9pPiA8c3BhbiBbaW5uZXJIdG1sXT1cIm1lc3NhZ2UgfHwgY29uZmlnLm1lc3NhZ2VcIj48L3NwYW4+XG4gICAgPC9wPlxuICAgIDwhLS1DYXJkIEZvb3Rlci0tPlxuICAgIDxuZy1jb250ZW50XG4gICAgICAqbmdJZj1cIiEobG9hZGluZyB8fCBjb25maWcubG9hZGluZykgJiYgIShtZXNzYWdlIHx8IGNvbmZpZy5tZXNzYWdlKVwiXG4gICAgICBzZWxlY3Q9XCJmb290ZXIsbm92by1jYXJkLWZvb3Rlcixbbm92by1jYXJkLWZvb3Rlcl0sW25vdm9DYXJkRm9vdGVyXVwiXG4gICAgPjwvbmctY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEVsZW1lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHBhZGRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKVxuICBjb25maWc6IGFueSA9IHt9O1xuICBASW5wdXQoKVxuICB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBtZXNzYWdlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIG1lc3NhZ2VJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvblRvb2x0aXA6IHN0cmluZztcbiAgQElucHV0KClcbiAgcmVmcmVzaDogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgY2xvc2U6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIG1vdmU6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3Mubm92by1jYXJkLWlubGluZScpXG4gIGlubGluZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBpbnNldDogc3RyaW5nID0gJ25vbmUnO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhiSW5zZXQoKSB7XG4gICAgcmV0dXJuIGBub3ZvLWNhcmQtaW5zZXQtJHt0aGlzLmluc2V0fWA7XG4gIH1cblxuICBAT3V0cHV0KClcbiAgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblJlZnJlc2g6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNhcmRBdXRvbWF0aW9uSWQ6IHN0cmluZztcbiAgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlO1xuICBpY29uQ2xhc3M6IHN0cmluZyB8IG51bGw7XG4gIG1lc3NhZ2VJY29uQ2xhc3M6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb25maWcgfHwge307XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb25maWcgfHwge307XG4gICAgdGhpcy5jYXJkQXV0b21hdGlvbklkID0gYCR7KHRoaXMudGl0bGUgfHwgdGhpcy5jb25maWcudGl0bGUgfHwgJ25vLXRpdGxlJykudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJy0nKX0tY2FyZGA7XG5cbiAgICBjb25zdCBuZXdJY29uOiBzdHJpbmcgPSB0aGlzLmljb24gfHwgdGhpcy5jb25maWcuaWNvbjtcbiAgICBjb25zdCBuZXdNZXNzYWdlSWNvbjogc3RyaW5nID0gdGhpcy5tZXNzYWdlSWNvbiB8fCB0aGlzLmNvbmZpZy5tZXNzYWdlSWNvbjtcbiAgICB0aGlzLmljb25DbGFzcyA9IG5ld0ljb24gPyBgYmhpLSR7bmV3SWNvbn1gIDogbnVsbDtcbiAgICB0aGlzLm1lc3NhZ2VJY29uQ2xhc3MgPSBuZXdNZXNzYWdlSWNvbiA/IGBiaGktJHtuZXdNZXNzYWdlSWNvbn1gIDogbnVsbDtcbiAgfVxuXG4gIHRvZ2dsZUNsb3NlKCkge1xuICAgIGlmICghdGhpcy5jb25maWcub25DbG9zZSkge1xuICAgICAgdGhpcy5vbkNsb3NlLm5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb25maWcub25DbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVJlZnJlc2goKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5vblJlZnJlc2gpIHtcbiAgICAgIHRoaXMub25SZWZyZXNoLm5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb25maWcub25SZWZyZXNoKCk7XG4gICAgfVxuICB9XG59XG4iXX0=