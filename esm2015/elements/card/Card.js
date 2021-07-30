// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
export class CardActionsElement {
}
CardActionsElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-card-actions',
                template: '<ng-content></ng-content>'
            },] }
];
export class CardElement {
    constructor(labels) {
        this.padding = true;
        this.config = {};
        this.onClose = new EventEmitter();
        this.onRefresh = new EventEmitter();
        this.labels = labels;
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
                template: `
        <div class="novo-card" [attr.data-automation-id]="cardAutomationId" [ngClass]="{'no-padding': !padding}" [class.loading]="loading || config.loading">
            <!--Loading-->
            <div class="card-loading-container" *ngIf="loading || config.loading">
                <novo-loading theme="line" [attr.data-automation-id]="cardAutomationId + '-loading'"></novo-loading>
            </div>
            <!--Card Header-->
            <header>
                <div class="title">
                    <!--Grabber Icon-->
                    <span tooltip="{{ labels.move }}" tooltipPosition="bottom-right"><i *ngIf="move || config.move" class="bhi-move" [attr.data-automation-id]="cardAutomationId + '-move'"></i></span>
                    <!--Card Title-->
                    <h3 [attr.data-automation-id]="cardAutomationId + '-title'"><span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="icon" [ngClass]="iconClass"></i></span> {{title || config.title}}</h3>
                </div>
                <!--Card Actions-->
                <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
                    <ng-content select="novo-card-actions"></ng-content>
                    <button theme="icon" icon="refresh"  (click)="toggleRefresh()" *ngIf="refresh || config.refresh" [attr.data-automation-id]="cardAutomationId + '-refresh'" tooltip="{{ labels.refresh }}" tooltipPosition="bottom-left"></button>
                    <button theme="icon" icon="close-o" (click)="toggleClose()" *ngIf="close || config.close" [attr.data-automation-id]="cardAutomationId + '-close'" tooltip="{{ labels.close }}" tooltipPosition="bottom-left"></button>
                </div>
            </header>
            <!--Card Main-->
            <main>
                <!--Content (transcluded)-->
                <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)"></ng-content>
                <!--Error/Empty Message-->
                <p class="card-message" *ngIf="!(loading || config.loading) && (message || config.message)" [attr.data-automation-id]="cardAutomationId + '-message'"><i *ngIf="messageIconClass" [ngClass]="messageIconClass"></i> <span [innerHtml]="message || config.message"></span></p>
            </main>
            <!--Card Footer-->
            <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)" select="footer"></ng-content>
        </div>
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
    onClose: [{ type: Output }],
    onRefresh: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2FyZC9DYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUN6RyxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFNckUsTUFBTSxPQUFPLGtCQUFrQjs7O1lBSjlCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUUsMkJBQTJCO2FBQ3RDOztBQXNDRCxNQUFNLE9BQU8sV0FBVztJQWtDdEIsWUFBWSxNQUF3QjtRQWhDcEMsWUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBcUJqQixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBUWhELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXVCO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUVwSCxNQUFNLE9BQU8sR0FBVyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3RELE1BQU0sY0FBYyxHQUFXLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDOzs7WUFyR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0ErQlA7YUFDSjs7O1lBMUNRLGdCQUFnQjs7O3NCQTRDdEIsS0FBSztxQkFFTCxLQUFLO29CQUVMLEtBQUs7c0JBRUwsS0FBSzswQkFFTCxLQUFLO21CQUVMLEtBQUs7MEJBRUwsS0FBSztzQkFFTCxLQUFLO29CQUVMLEtBQUs7bUJBRUwsS0FBSztzQkFFTCxLQUFLO3NCQUdMLE1BQU07d0JBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtYWN0aW9ucycsXHJcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIENhcmRBY3Rpb25zRWxlbWVudCB7fVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tY2FyZFwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkXCIgW25nQ2xhc3NdPVwieyduby1wYWRkaW5nJzogIXBhZGRpbmd9XCIgW2NsYXNzLmxvYWRpbmddPVwibG9hZGluZyB8fCBjb25maWcubG9hZGluZ1wiPlxyXG4gICAgICAgICAgICA8IS0tTG9hZGluZy0tPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1sb2FkaW5nLWNvbnRhaW5lclwiICpuZ0lmPVwibG9hZGluZyB8fCBjb25maWcubG9hZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctbG9hZGluZydcIj48L25vdm8tbG9hZGluZz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwhLS1DYXJkIEhlYWRlci0tPlxyXG4gICAgICAgICAgICA8aGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLUdyYWJiZXIgSWNvbi0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHRvb2x0aXA9XCJ7eyBsYWJlbHMubW92ZSB9fVwiIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbS1yaWdodFwiPjxpICpuZ0lmPVwibW92ZSB8fCBjb25maWcubW92ZVwiIGNsYXNzPVwiYmhpLW1vdmVcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctbW92ZSdcIj48L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS1DYXJkIFRpdGxlLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy10aXRsZSdcIj48c3BhbiBbdG9vbHRpcF09XCJpY29uVG9vbHRpcFwiIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCI+PGkgKm5nSWY9XCJpY29uXCIgW25nQ2xhc3NdPVwiaWNvbkNsYXNzXCI+PC9pPjwvc3Bhbj4ge3t0aXRsZSB8fCBjb25maWcudGl0bGV9fTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwhLS1DYXJkIEFjdGlvbnMtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWFjdGlvbnMnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1jYXJkLWFjdGlvbnNcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwicmVmcmVzaFwiICAoY2xpY2spPVwidG9nZ2xlUmVmcmVzaCgpXCIgKm5nSWY9XCJyZWZyZXNoIHx8IGNvbmZpZy5yZWZyZXNoXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLXJlZnJlc2gnXCIgdG9vbHRpcD1cInt7IGxhYmVscy5yZWZyZXNoIH19XCIgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLWxlZnRcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHRoZW1lPVwiaWNvblwiIGljb249XCJjbG9zZS1vXCIgKGNsaWNrKT1cInRvZ2dsZUNsb3NlKClcIiAqbmdJZj1cImNsb3NlIHx8IGNvbmZpZy5jbG9zZVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1jbG9zZSdcIiB0b29sdGlwPVwie3sgbGFiZWxzLmNsb3NlIH19XCIgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLWxlZnRcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICAgICAgPCEtLUNhcmQgTWFpbi0tPlxyXG4gICAgICAgICAgICA8bWFpbj5cclxuICAgICAgICAgICAgICAgIDwhLS1Db250ZW50ICh0cmFuc2NsdWRlZCktLT5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIShsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nKSAmJiAhKG1lc3NhZ2UgfHwgY29uZmlnLm1lc3NhZ2UpXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPCEtLUVycm9yL0VtcHR5IE1lc3NhZ2UtLT5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC1tZXNzYWdlXCIgKm5nSWY9XCIhKGxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcpICYmIChtZXNzYWdlIHx8IGNvbmZpZy5tZXNzYWdlKVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1tZXNzYWdlJ1wiPjxpICpuZ0lmPVwibWVzc2FnZUljb25DbGFzc1wiIFtuZ0NsYXNzXT1cIm1lc3NhZ2VJY29uQ2xhc3NcIj48L2k+IDxzcGFuIFtpbm5lckh0bWxdPVwibWVzc2FnZSB8fCBjb25maWcubWVzc2FnZVwiPjwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgIDwvbWFpbj5cclxuICAgICAgICAgICAgPCEtLUNhcmQgRm9vdGVyLS0+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIShsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nKSAmJiAhKG1lc3NhZ2UgfHwgY29uZmlnLm1lc3NhZ2UpXCIgc2VsZWN0PVwiZm9vdGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIENhcmRFbGVtZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xyXG4gIEBJbnB1dCgpXHJcbiAgcGFkZGluZzogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KClcclxuICBjb25maWc6IGFueSA9IHt9O1xyXG4gIEBJbnB1dCgpXHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIG1lc3NhZ2VJY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBpY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBpY29uVG9vbHRpcDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgcmVmcmVzaDogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIGNsb3NlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpXHJcbiAgbW92ZTogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIGxvYWRpbmc6IGJvb2xlYW47XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIG9uUmVmcmVzaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNhcmRBdXRvbWF0aW9uSWQ6IHN0cmluZztcclxuICBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2U7XHJcbiAgaWNvbkNsYXNzOiBzdHJpbmcgfCBudWxsO1xyXG4gIG1lc3NhZ2VJY29uQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IobGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbmZpZyB8fCB7fTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZmlnIHx8IHt9O1xyXG4gICAgdGhpcy5jYXJkQXV0b21hdGlvbklkID0gYCR7KHRoaXMudGl0bGUgfHwgdGhpcy5jb25maWcudGl0bGUgfHwgJ25vLXRpdGxlJykudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJy0nKX0tY2FyZGA7XHJcblxyXG4gICAgY29uc3QgbmV3SWNvbjogc3RyaW5nID0gdGhpcy5pY29uIHx8IHRoaXMuY29uZmlnLmljb247XHJcbiAgICBjb25zdCBuZXdNZXNzYWdlSWNvbjogc3RyaW5nID0gdGhpcy5tZXNzYWdlSWNvbiB8fCB0aGlzLmNvbmZpZy5tZXNzYWdlSWNvbjtcclxuICAgIHRoaXMuaWNvbkNsYXNzID0gbmV3SWNvbiA/IGBiaGktJHtuZXdJY29ufWAgOiBudWxsO1xyXG4gICAgdGhpcy5tZXNzYWdlSWNvbkNsYXNzID0gbmV3TWVzc2FnZUljb24gPyBgYmhpLSR7bmV3TWVzc2FnZUljb259YCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVDbG9zZSgpIHtcclxuICAgIGlmICghdGhpcy5jb25maWcub25DbG9zZSkge1xyXG4gICAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb25maWcub25DbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlUmVmcmVzaCgpIHtcclxuICAgIGlmICghdGhpcy5jb25maWcub25SZWZyZXNoKSB7XHJcbiAgICAgIHRoaXMub25SZWZyZXNoLm5leHQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29uZmlnLm9uUmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=