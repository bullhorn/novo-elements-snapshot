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
        this.cardAutomationId = `${(this.title || this.config.title || 'no-title').trim().toLowerCase().replace(/\s/g, '-')}-card`;
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
        <novo-icon
          *ngIf="move || config.move"
          tooltip="{{ labels.move }}"
          tooltipPosition="bottom-right"
          [attr.data-automation-id]="cardAutomationId + '-move'"
          >move</novo-icon
        >
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jYXJkL0NhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNqSSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU0zQyxNQUFNLE9BQU8sa0JBQWtCOzs7WUFKOUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSwyQkFBMkI7YUFDdEM7O0FBR0Q7O0dBRUc7QUFLSCxNQUFNLE9BQU8sa0JBQWtCO0lBSi9CO1FBSzJCLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFDdEQsQ0FBQzs7O1lBTkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyREFBMkQ7Z0JBQ3JFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUU7YUFDdkU7Ozt3QkFFRSxLQUFLOztBQUFtQjtJQUFmLFlBQVksRUFBRTs7cURBQTRCO0FBR3REOztHQUVHO0FBZUgsTUFBTSxPQUFPLGlCQUFpQjs7O1lBZDdCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0RBQXdEO2dCQUNsRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7YUFDRjs7QUFPRCxNQUFNLE9BQU8saUJBQWlCOzs7WUFKN0IsU0FBUyxTQUFDO2dC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TTt3QkFFTixNQUFNOztBQVhQO0lBRkMsWUFBWSxFQUFFOzsyQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtYWN0aW9ucycsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIENhcmRBY3Rpb25zRWxlbWVudCB7fVxuXG4vKipcbiAqIENvbnRlbnQgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkLWNvbnRlbnQsIFtub3ZvLWNhcmQtY29udGVudF0sIFtub3ZvQ2FyZENvbnRlbnRdJyxcbiAgaG9zdDogeyBjbGFzczogJ25vdm8tY2FyZC1jb250ZW50JywgJ1tjbGFzcy5jb25kZW5zZWRdJzogJ2NvbmRlbnNlZCcgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZENvbnRlbnRFbGVtZW50IHtcbiAgQElucHV0KCkgQEJvb2xlYW5JbnB1dCgpIGNvbmRlbnNlZDogYm9vbGVhbiA9IGZhbHNlO1xufVxuXG4vKipcbiAqIENvbnRlbnQgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkLWhlYWRlciwgW25vdm8tY2FyZC1oZWFkZXJdLCBbbm92b0NhcmRIZWFkZXJdJyxcbiAgaG9zdDogeyBjbGFzczogJ25vdm8tY2FyZC1oZWFkZXInIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1hdmF0YXIsIFtub3ZvLWF2YXRhcl0sIG5vdm8taWNvblwiPjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jYXJkLWhlYWRlci10ZXh0XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRpdGxlLCBbbm92by10aXRsZV0sIG5vdm8tdGV4dCwgbm92by1sYWJlbCwgbm92by1jYXB0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jYXJkLWhlYWRlci1hY3Rpb25zXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWFjdGlvblwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEhlYWRlckVsZW1lbnQge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkLWZvb3RlciwgW25vdm8tY2FyZC1mb290ZXJdLCBbbm92b0NhcmRGb290ZXJdJyxcbiAgaG9zdDogeyBjbGFzczogJ25vdm8tY2FyZC1mb290ZXInIH0sXG59KVxuZXhwb3J0IGNsYXNzIENhcmRGb290ZXJFbGVtZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FyZCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tY2FyZCcsXG4gICAgJ1thdHRyLmRhdGEtYXV0b21hdGlvbi1pZF0nOiAnY2FyZEF1dG9tYXRpb25JZCcsXG4gICAgJ1tjbGFzcy5sb2FkaW5nXSc6ICdsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tTG9hZGluZy0tPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLWxvYWRpbmctY29udGFpbmVyXCIgKm5nSWY9XCJsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nXCI+XG4gICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1sb2FkaW5nJ1wiPjwvbm92by1sb2FkaW5nPlxuICAgIDwvZGl2PlxuICAgIDwhLS1DYXJkIEhlYWRlci0tPlxuICAgIDxoZWFkZXIgKm5nSWY9XCJ0aXRsZSB8fCBjb25maWcudGl0bGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICA8IS0tR3JhYmJlciBJY29uLS0+XG4gICAgICAgIDxub3ZvLWljb25cbiAgICAgICAgICAqbmdJZj1cIm1vdmUgfHwgY29uZmlnLm1vdmVcIlxuICAgICAgICAgIHRvb2x0aXA9XCJ7eyBsYWJlbHMubW92ZSB9fVwiXG4gICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLXJpZ2h0XCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctbW92ZSdcIlxuICAgICAgICAgID5tb3ZlPC9ub3ZvLWljb25cbiAgICAgICAgPlxuICAgICAgICA8IS0tQ2FyZCBUaXRsZS0tPlxuICAgICAgICA8aDMgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLXRpdGxlJ1wiPlxuICAgICAgICAgIDxzcGFuIFt0b29sdGlwXT1cImljb25Ub29sdGlwXCIgdG9vbHRpcFBvc2l0aW9uPVwicmlnaHRcIj48aSAqbmdJZj1cImljb25cIiBbbmdDbGFzc109XCJpY29uQ2xhc3NcIj48L2k+PC9zcGFuPlxuICAgICAgICAgIHt7IHRpdGxlIHx8IGNvbmZpZy50aXRsZSB9fVxuICAgICAgICA8L2gzPlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tQ2FyZCBBY3Rpb25zLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1hY3Rpb25zJ1wiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWNhcmQtYWN0aW9uc1wiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICBpY29uPVwicmVmcmVzaFwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVJlZnJlc2goKVwiXG4gICAgICAgICAgKm5nSWY9XCJyZWZyZXNoIHx8IGNvbmZpZy5yZWZyZXNoXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctcmVmcmVzaCdcIlxuICAgICAgICAgIHRvb2x0aXA9XCJ7eyBsYWJlbHMucmVmcmVzaCB9fVwiXG4gICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLWxlZnRcIlxuICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cblxuICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgIGljb249XCJjbG9zZS1vXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlQ2xvc2UoKVwiXG4gICAgICAgICAgKm5nSWY9XCJjbG9zZSB8fCBjb25maWcuY2xvc2VcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1jbG9zZSdcIlxuICAgICAgICAgIHRvb2x0aXA9XCJ7eyBsYWJlbHMuY2xvc2UgfX1cIlxuICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbS1sZWZ0XCJcbiAgICAgICAgPjwvbm92by1idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2hlYWRlcj5cbiAgICA8IS0tQ29udGVudCAodHJhbnNjbHVkZWQpLS0+XG4gICAgPG5nLWNvbnRlbnQgKm5nSWY9XCIhKGxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcpICYmICEobWVzc2FnZSB8fCBjb25maWcubWVzc2FnZSlcIj48L25nLWNvbnRlbnQ+XG4gICAgPCEtLUVycm9yL0VtcHR5IE1lc3NhZ2UtLT5cbiAgICA8cFxuICAgICAgY2xhc3M9XCJjYXJkLW1lc3NhZ2VcIlxuICAgICAgKm5nSWY9XCIhKGxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcpICYmIChtZXNzYWdlIHx8IGNvbmZpZy5tZXNzYWdlKVwiXG4gICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctbWVzc2FnZSdcIlxuICAgID5cbiAgICAgIDxpICpuZ0lmPVwibWVzc2FnZUljb25DbGFzc1wiIFtuZ0NsYXNzXT1cIm1lc3NhZ2VJY29uQ2xhc3NcIj48L2k+IDxzcGFuIFtpbm5lckh0bWxdPVwibWVzc2FnZSB8fCBjb25maWcubWVzc2FnZVwiPjwvc3Bhbj5cbiAgICA8L3A+XG4gICAgPCEtLUNhcmQgRm9vdGVyLS0+XG4gICAgPG5nLWNvbnRlbnRcbiAgICAgICpuZ0lmPVwiIShsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nKSAmJiAhKG1lc3NhZ2UgfHwgY29uZmlnLm1lc3NhZ2UpXCJcbiAgICAgIHNlbGVjdD1cImZvb3Rlcixub3ZvLWNhcmQtZm9vdGVyLFtub3ZvLWNhcmQtZm9vdGVyXSxbbm92b0NhcmRGb290ZXJdXCJcbiAgICA+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkRWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgcGFkZGluZzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogYW55ID0ge307XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgQElucHV0KClcbiAgbWVzc2FnZUljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uVG9vbHRpcDogc3RyaW5nO1xuICBASW5wdXQoKVxuICByZWZyZXNoOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBjbG9zZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgbW92ZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgbG9hZGluZzogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ub3ZvLWNhcmQtaW5saW5lJylcbiAgaW5saW5lOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGluc2V0OiBzdHJpbmcgPSAnbm9uZSc7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJJbnNldCgpIHtcbiAgICByZXR1cm4gYG5vdm8tY2FyZC1pbnNldC0ke3RoaXMuaW5zZXR9YDtcbiAgfVxuXG4gIEBPdXRwdXQoKVxuICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uUmVmcmVzaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY2FyZEF1dG9tYXRpb25JZDogc3RyaW5nO1xuICBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2U7XG4gIGljb25DbGFzczogc3RyaW5nIHwgbnVsbDtcbiAgbWVzc2FnZUljb25DbGFzczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge1xuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLmNhcmRBdXRvbWF0aW9uSWQgPSBgJHsodGhpcy50aXRsZSB8fCB0aGlzLmNvbmZpZy50aXRsZSB8fCAnbm8tdGl0bGUnKS50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJy0nKX0tY2FyZGA7XG5cbiAgICBjb25zdCBuZXdJY29uOiBzdHJpbmcgPSB0aGlzLmljb24gfHwgdGhpcy5jb25maWcuaWNvbjtcbiAgICBjb25zdCBuZXdNZXNzYWdlSWNvbjogc3RyaW5nID0gdGhpcy5tZXNzYWdlSWNvbiB8fCB0aGlzLmNvbmZpZy5tZXNzYWdlSWNvbjtcbiAgICB0aGlzLmljb25DbGFzcyA9IG5ld0ljb24gPyBgYmhpLSR7bmV3SWNvbn1gIDogbnVsbDtcbiAgICB0aGlzLm1lc3NhZ2VJY29uQ2xhc3MgPSBuZXdNZXNzYWdlSWNvbiA/IGBiaGktJHtuZXdNZXNzYWdlSWNvbn1gIDogbnVsbDtcbiAgfVxuXG4gIHRvZ2dsZUNsb3NlKCkge1xuICAgIGlmICghdGhpcy5jb25maWcub25DbG9zZSkge1xuICAgICAgdGhpcy5vbkNsb3NlLm5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb25maWcub25DbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVJlZnJlc2goKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5vblJlZnJlc2gpIHtcbiAgICAgIHRoaXMub25SZWZyZXNoLm5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb25maWcub25SZWZyZXNoKCk7XG4gICAgfVxuICB9XG59XG4iXX0=