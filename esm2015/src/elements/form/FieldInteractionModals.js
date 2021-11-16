// NG2
import { Component } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
// APP
import { NovoModalParams, NovoModalRef } from '../modal/modal-ref';
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
      <h2 *ngIf="!params['message']">
        <label>{{ params['label'] }}:</label> {{ params['oldValue'] }} <i class="bhi-arrow-right"></i> {{ params['newValue'] }}
      </h2>
      <h2 *ngIf="params['message']">{{ params['message'] }}</h2>
      <novo-button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </novo-button>
      <novo-button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-save-' + params['key']"
      >
        {{ labels.save }}
      </novo-button>
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
      <novo-button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </novo-button>
      <novo-button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-yes-' + params['key']"
      >
        {{ labels.yes }}
      </novo-button>
    </novo-notification>
  `
            },] }
];
ControlPromptModal.ctorParameters = () => [
    { type: NovoModalRef },
    { type: NovoModalParams },
    { type: NovoLabelService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRJbnRlcmFjdGlvbk1vZGFscy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9mb3JtL0ZpZWxkSW50ZXJhY3Rpb25Nb2RhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUEwQm5FLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFBb0IsUUFBc0IsRUFBUyxNQUF1QixFQUFTLE1BQXdCO1FBQXZGLGFBQVEsR0FBUixRQUFRLENBQWM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUV4RyxLQUFLLENBQUMsTUFBZTtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7WUE3QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7YUFDRjs7O1lBekJ5QixZQUFZO1lBQTdCLGVBQWU7WUFGZixnQkFBZ0I7O0FBeUR6QixNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLFFBQXNCLEVBQVMsTUFBdUIsRUFBUyxNQUF3QjtRQUF2RixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFHLENBQUM7SUFFeEcsS0FBSyxDQUFDLE1BQWU7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7O1lBMUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUO2FBQ0Y7OztZQXREeUIsWUFBWTtZQUE3QixlQUFlO1lBRmYsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTW9kYWxQYXJhbXMsIE5vdm9Nb2RhbFJlZiB9IGZyb20gJy4uL21vZGFsL21vZGFsLXJlZic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvbnRyb2wtY29uZmlybS1tb2RhbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tbm90aWZpY2F0aW9uIHR5cGU9XCJ3YXJuaW5nXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC0nICsgcGFyYW1zWydrZXknXVwiPlxuICAgICAgPGgxPnt7IGxhYmVscy5jb25maXJtQ2hhbmdlc01vZGFsTWVzc2FnZSB9fTwvaDE+XG4gICAgICA8aDIgKm5nSWY9XCIhcGFyYW1zWydtZXNzYWdlJ11cIj5cbiAgICAgICAgPGxhYmVsPnt7IHBhcmFtc1snbGFiZWwnXSB9fTo8L2xhYmVsPiB7eyBwYXJhbXNbJ29sZFZhbHVlJ10gfX0gPGkgY2xhc3M9XCJiaGktYXJyb3ctcmlnaHRcIj48L2k+IHt7IHBhcmFtc1snbmV3VmFsdWUnXSB9fVxuICAgICAgPC9oMj5cbiAgICAgIDxoMiAqbmdJZj1cInBhcmFtc1snbWVzc2FnZSddXCI+e3sgcGFyYW1zWydtZXNzYWdlJ10gfX08L2gyPlxuICAgICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwic3RhbmRhcmRcIiAoY2xpY2spPVwiY2xvc2UoZmFsc2UpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC1jYW5jZWwnICsgcGFyYW1zWydrZXknXVwiPlxuICAgICAgICB7eyBsYWJlbHMuY2FuY2VsIH19XG4gICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgIHRoZW1lPVwicHJpbWFyeVwiXG4gICAgICAgIGljb249XCJjaGVja1wiXG4gICAgICAgIChjbGljayk9XCJjbG9zZSh0cnVlKVwiXG4gICAgICAgIGF1dG9mb2N1c1xuICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpZWxkLWludGVyYWN0aW9uLW1vZGFsLXNhdmUtJyArIHBhcmFtc1sna2V5J11cIlxuICAgICAgPlxuICAgICAgICB7eyBsYWJlbHMuc2F2ZSB9fVxuICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICA8L25vdm8tbm90aWZpY2F0aW9uPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sQ29uZmlybU1vZGFsIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFJlZjogTm92b01vZGFsUmVmLCBwdWJsaWMgcGFyYW1zOiBOb3ZvTW9kYWxQYXJhbXMsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIGNsb3NlKHJlc3VsdDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubW9kYWxSZWYuY2xvc2UocmVzdWx0KTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjb250cm9sLXByb21wdC1tb2RhbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tbm90aWZpY2F0aW9uIHR5cGU9XCJ3YXJuaW5nXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC0nICsgcGFyYW1zWydrZXknXVwiPlxuICAgICAgPGgxPnt7IGxhYmVscy5wcm9tcHRNb2RhbE1lc3NhZ2UgfX08L2gxPlxuICAgICAgPHAgKm5nRm9yPVwibGV0IGNoYW5nZSBvZiBwYXJhbXNbJ2NoYW5nZXMnXVwiPnt7IGNoYW5nZSB9fTwvcD5cbiAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cInN0YW5kYXJkXCIgKGNsaWNrKT1cImNsb3NlKGZhbHNlKVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmllbGQtaW50ZXJhY3Rpb24tbW9kYWwtY2FuY2VsJyArIHBhcmFtc1sna2V5J11cIj5cbiAgICAgICAge3sgbGFiZWxzLmNhbmNlbCB9fVxuICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICB0aGVtZT1cInByaW1hcnlcIlxuICAgICAgICBpY29uPVwiY2hlY2tcIlxuICAgICAgICAoY2xpY2spPVwiY2xvc2UodHJ1ZSlcIlxuICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC15ZXMtJyArIHBhcmFtc1sna2V5J11cIlxuICAgICAgPlxuICAgICAgICB7eyBsYWJlbHMueWVzIH19XG4gICAgICA8L25vdm8tYnV0dG9uPlxuICAgIDwvbm92by1ub3RpZmljYXRpb24+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRyb2xQcm9tcHRNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxSZWY6IE5vdm9Nb2RhbFJlZiwgcHVibGljIHBhcmFtczogTm92b01vZGFsUGFyYW1zLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBjbG9zZShyZXN1bHQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKHJlc3VsdCk7XG4gIH1cbn1cbiJdfQ==