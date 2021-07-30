// NG2
import { Component } from '@angular/core';
// APP
import { NovoModalRef, NovoModalParams } from '../modal/Modal';
import { NovoLabelService } from '../../services/novo-label-service';
export class ControlConfirmModal {
    constructor(modalRef, params, labels) {
        this.modalRef = modalRef;
        this.params = params;
        this.labels = labels;
    }
    close(result) {
        this.modalRef.close(result);
    }
}
ControlConfirmModal.decorators = [
    { type: Component, args: [{
                selector: 'control-confirm-modal',
                template: `
        <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
            <h1>{{ labels.confirmChangesModalMessage }}</h1>
            <h2 *ngIf="!params['message']"><label>{{ params['label'] }}:</label> {{ params['oldValue'] }} <i class="bhi-arrow-right"></i> {{ params['newValue'] }}</h2>
            <h2 *ngIf="params['message']">{{ params['message'] }}</h2>
            <button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">{{ labels.cancel }}</button>
            <button theme="primary" icon="check" (click)="close(true)" autofocus [attr.data-automation-id]="'field-interaction-modal-save-' + params['key']">{{ labels.save }}</button>
        </novo-notification>
    `
            },] }
];
ControlConfirmModal.ctorParameters = () => [
    { type: NovoModalRef },
    { type: NovoModalParams },
    { type: NovoLabelService }
];
export class ControlPromptModal {
    constructor(modalRef, params, labels) {
        this.modalRef = modalRef;
        this.params = params;
        this.labels = labels;
    }
    close(result) {
        this.modalRef.close(result);
    }
}
ControlPromptModal.decorators = [
    { type: Component, args: [{
                selector: 'control-prompt-modal',
                template: `
        <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
            <h1>{{ labels.promptModalMessage }}</h1>
            <p *ngFor="let change of params['changes']">{{ change }}</p>
            <button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">{{ labels.cancel }}</button>
            <button theme="primary" icon="check" (click)="close(true)" autofocus [attr.data-automation-id]="'field-interaction-modal-yes-' + params['key']">{{ labels.yes }}</button>
        </novo-notification>
    `
            },] }
];
ControlPromptModal.ctorParameters = () => [
    { type: NovoModalRef },
    { type: NovoModalParams },
    { type: NovoLabelService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRJbnRlcmFjdGlvbk1vZGFscy5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZm9ybS9GaWVsZEludGVyYWN0aW9uTW9kYWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBY3JFLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFBb0IsUUFBc0IsRUFBUyxNQUF1QixFQUFTLE1BQXdCO1FBQXZGLGFBQVEsR0FBUixRQUFRLENBQWM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUV4RyxLQUFLLENBQUMsTUFBZTtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7WUFqQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7S0FRUDthQUNKOzs7WUFkUSxZQUFZO1lBQUUsZUFBZTtZQUM3QixnQkFBZ0I7O0FBaUN6QixNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLFFBQXNCLEVBQVMsTUFBdUIsRUFBUyxNQUF3QjtRQUF2RixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFHLENBQUM7SUFFeEcsS0FBSyxDQUFDLE1BQWU7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7O1lBaEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7S0FPUDthQUNKOzs7WUFqQ1EsWUFBWTtZQUFFLGVBQWU7WUFDN0IsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgTm92b01vZGFsUmVmLCBOb3ZvTW9kYWxQYXJhbXMgfSBmcm9tICcuLi9tb2RhbC9Nb2RhbCc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjb250cm9sLWNvbmZpcm0tbW9kYWwnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG5vdm8tbm90aWZpY2F0aW9uIHR5cGU9XCJ3YXJuaW5nXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC0nICsgcGFyYW1zWydrZXknXVwiPlxyXG4gICAgICAgICAgICA8aDE+e3sgbGFiZWxzLmNvbmZpcm1DaGFuZ2VzTW9kYWxNZXNzYWdlIH19PC9oMT5cclxuICAgICAgICAgICAgPGgyICpuZ0lmPVwiIXBhcmFtc1snbWVzc2FnZSddXCI+PGxhYmVsPnt7IHBhcmFtc1snbGFiZWwnXSB9fTo8L2xhYmVsPiB7eyBwYXJhbXNbJ29sZFZhbHVlJ10gfX0gPGkgY2xhc3M9XCJiaGktYXJyb3ctcmlnaHRcIj48L2k+IHt7IHBhcmFtc1snbmV3VmFsdWUnXSB9fTwvaDI+XHJcbiAgICAgICAgICAgIDxoMiAqbmdJZj1cInBhcmFtc1snbWVzc2FnZSddXCI+e3sgcGFyYW1zWydtZXNzYWdlJ10gfX08L2gyPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHRoZW1lPVwic3RhbmRhcmRcIiAoY2xpY2spPVwiY2xvc2UoZmFsc2UpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC1jYW5jZWwnICsgcGFyYW1zWydrZXknXVwiPnt7IGxhYmVscy5jYW5jZWwgfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cInByaW1hcnlcIiBpY29uPVwiY2hlY2tcIiAoY2xpY2spPVwiY2xvc2UodHJ1ZSlcIiBhdXRvZm9jdXMgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC1zYXZlLScgKyBwYXJhbXNbJ2tleSddXCI+e3sgbGFiZWxzLnNhdmUgfX08L2J1dHRvbj5cclxuICAgICAgICA8L25vdm8tbm90aWZpY2F0aW9uPlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRyb2xDb25maXJtTW9kYWwge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxSZWY6IE5vdm9Nb2RhbFJlZiwgcHVibGljIHBhcmFtczogTm92b01vZGFsUGFyYW1zLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxyXG5cclxuICBwdWJsaWMgY2xvc2UocmVzdWx0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKHJlc3VsdCk7XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2NvbnRyb2wtcHJvbXB0LW1vZGFsJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxub3ZvLW5vdGlmaWNhdGlvbiB0eXBlPVwid2FybmluZ1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmllbGQtaW50ZXJhY3Rpb24tbW9kYWwtJyArIHBhcmFtc1sna2V5J11cIj5cclxuICAgICAgICAgICAgPGgxPnt7IGxhYmVscy5wcm9tcHRNb2RhbE1lc3NhZ2UgfX08L2gxPlxyXG4gICAgICAgICAgICA8cCAqbmdGb3I9XCJsZXQgY2hhbmdlIG9mIHBhcmFtc1snY2hhbmdlcyddXCI+e3sgY2hhbmdlIH19PC9wPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHRoZW1lPVwic3RhbmRhcmRcIiAoY2xpY2spPVwiY2xvc2UoZmFsc2UpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC1jYW5jZWwnICsgcGFyYW1zWydrZXknXVwiPnt7IGxhYmVscy5jYW5jZWwgfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cInByaW1hcnlcIiBpY29uPVwiY2hlY2tcIiAoY2xpY2spPVwiY2xvc2UodHJ1ZSlcIiBhdXRvZm9jdXMgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC15ZXMtJyArIHBhcmFtc1sna2V5J11cIj57eyBsYWJlbHMueWVzIH19PC9idXR0b24+XHJcbiAgICAgICAgPC9ub3ZvLW5vdGlmaWNhdGlvbj5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sUHJvbXB0TW9kYWwge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxSZWY6IE5vdm9Nb2RhbFJlZiwgcHVibGljIHBhcmFtczogTm92b01vZGFsUGFyYW1zLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxyXG5cclxuICBwdWJsaWMgY2xvc2UocmVzdWx0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKHJlc3VsdCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==