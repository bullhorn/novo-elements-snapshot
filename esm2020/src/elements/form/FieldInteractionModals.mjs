// NG2
import { Component } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
// APP
import { NovoModalParams, NovoModalRef } from '../modal/modal-ref';
import * as i0 from "@angular/core";
import * as i1 from "../modal/modal-ref";
import * as i2 from "../../services/novo-label-service";
import * as i3 from "../modal/modal.component";
import * as i4 from "../button/Button";
import * as i5 from "@angular/common";
import * as i6 from "../common/directives/theme.directive";
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
ControlConfirmModal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ControlConfirmModal, deps: [{ token: i1.NovoModalRef }, { token: i1.NovoModalParams }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
ControlConfirmModal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ControlConfirmModal, selector: "control-confirm-modal", ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i3.NovoModalNotificationElement, selector: "novo-notification", inputs: ["type", "icon"], outputs: ["cancel"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ControlConfirmModal, decorators: [{
            type: Component,
            args: [{
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
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoModalRef }, { type: i1.NovoModalParams }, { type: i2.NovoLabelService }]; } });
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
ControlPromptModal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ControlPromptModal, deps: [{ token: i1.NovoModalRef }, { token: i1.NovoModalParams }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
ControlPromptModal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ControlPromptModal, selector: "control-prompt-modal", ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i3.NovoModalNotificationElement, selector: "novo-notification", inputs: ["type", "icon"], outputs: ["cancel"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ControlPromptModal, decorators: [{
            type: Component,
            args: [{
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
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoModalRef }, { type: i1.NovoModalParams }, { type: i2.NovoLabelService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRJbnRlcmFjdGlvbk1vZGFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vRmllbGRJbnRlcmFjdGlvbk1vZGFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxNQUFNO0FBQ04sT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7QUEwQm5FLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFBb0IsUUFBc0IsRUFBUyxNQUF1QixFQUFTLE1BQXdCO1FBQXZGLGFBQVEsR0FBUixRQUFRLENBQWM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUV4RyxLQUFLLENBQUMsTUFBZTtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOztpSEFMVSxtQkFBbUI7cUdBQW5CLG1CQUFtQiw2REF0QnBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDs0RkFFVSxtQkFBbUI7a0JBeEIvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7aUJBQ0Y7O0FBOEJELE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBb0IsUUFBc0IsRUFBUyxNQUF1QixFQUFTLE1BQXdCO1FBQXZGLGFBQVEsR0FBUixRQUFRLENBQWM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUV4RyxLQUFLLENBQUMsTUFBZTtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOztnSEFMVSxrQkFBa0I7b0dBQWxCLGtCQUFrQiw0REFuQm5COzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDs0RkFFVSxrQkFBa0I7a0JBckI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9Nb2RhbFBhcmFtcywgTm92b01vZGFsUmVmIH0gZnJvbSAnLi4vbW9kYWwvbW9kYWwtcmVmJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29udHJvbC1jb25maXJtLW1vZGFsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1ub3RpZmljYXRpb24gdHlwZT1cIndhcm5pbmdcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpZWxkLWludGVyYWN0aW9uLW1vZGFsLScgKyBwYXJhbXNbJ2tleSddXCI+XG4gICAgICA8aDE+e3sgbGFiZWxzLmNvbmZpcm1DaGFuZ2VzTW9kYWxNZXNzYWdlIH19PC9oMT5cbiAgICAgIDxoMiAqbmdJZj1cIiFwYXJhbXNbJ21lc3NhZ2UnXVwiPlxuICAgICAgICA8bGFiZWw+e3sgcGFyYW1zWydsYWJlbCddIH19OjwvbGFiZWw+IHt7IHBhcmFtc1snb2xkVmFsdWUnXSB9fSA8aSBjbGFzcz1cImJoaS1hcnJvdy1yaWdodFwiPjwvaT4ge3sgcGFyYW1zWyduZXdWYWx1ZSddIH19XG4gICAgICA8L2gyPlxuICAgICAgPGgyICpuZ0lmPVwicGFyYW1zWydtZXNzYWdlJ11cIj57eyBwYXJhbXNbJ21lc3NhZ2UnXSB9fTwvaDI+XG4gICAgICA8bm92by1idXR0b24gdGhlbWU9XCJzdGFuZGFyZFwiIChjbGljayk9XCJjbG9zZShmYWxzZSlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpZWxkLWludGVyYWN0aW9uLW1vZGFsLWNhbmNlbCcgKyBwYXJhbXNbJ2tleSddXCI+XG4gICAgICAgIHt7IGxhYmVscy5jYW5jZWwgfX1cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8bm92by1idXR0b25cbiAgICAgICAgdGhlbWU9XCJwcmltYXJ5XCJcbiAgICAgICAgaWNvbj1cImNoZWNrXCJcbiAgICAgICAgKGNsaWNrKT1cImNsb3NlKHRydWUpXCJcbiAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmllbGQtaW50ZXJhY3Rpb24tbW9kYWwtc2F2ZS0nICsgcGFyYW1zWydrZXknXVwiXG4gICAgICA+XG4gICAgICAgIHt7IGxhYmVscy5zYXZlIH19XG4gICAgICA8L25vdm8tYnV0dG9uPlxuICAgIDwvbm92by1ub3RpZmljYXRpb24+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRyb2xDb25maXJtTW9kYWwge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsUmVmOiBOb3ZvTW9kYWxSZWYsIHB1YmxpYyBwYXJhbXM6IE5vdm9Nb2RhbFBhcmFtcywgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBwdWJsaWMgY2xvc2UocmVzdWx0OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5tb2RhbFJlZi5jbG9zZShyZXN1bHQpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvbnRyb2wtcHJvbXB0LW1vZGFsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1ub3RpZmljYXRpb24gdHlwZT1cIndhcm5pbmdcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpZWxkLWludGVyYWN0aW9uLW1vZGFsLScgKyBwYXJhbXNbJ2tleSddXCI+XG4gICAgICA8aDE+e3sgbGFiZWxzLnByb21wdE1vZGFsTWVzc2FnZSB9fTwvaDE+XG4gICAgICA8cCAqbmdGb3I9XCJsZXQgY2hhbmdlIG9mIHBhcmFtc1snY2hhbmdlcyddXCI+e3sgY2hhbmdlIH19PC9wPlxuICAgICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwic3RhbmRhcmRcIiAoY2xpY2spPVwiY2xvc2UoZmFsc2UpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC1jYW5jZWwnICsgcGFyYW1zWydrZXknXVwiPlxuICAgICAgICB7eyBsYWJlbHMuY2FuY2VsIH19XG4gICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgIHRoZW1lPVwicHJpbWFyeVwiXG4gICAgICAgIGljb249XCJjaGVja1wiXG4gICAgICAgIChjbGljayk9XCJjbG9zZSh0cnVlKVwiXG4gICAgICAgIGF1dG9mb2N1c1xuICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpZWxkLWludGVyYWN0aW9uLW1vZGFsLXllcy0nICsgcGFyYW1zWydrZXknXVwiXG4gICAgICA+XG4gICAgICAgIHt7IGxhYmVscy55ZXMgfX1cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgPC9ub3ZvLW5vdGlmaWNhdGlvbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ29udHJvbFByb21wdE1vZGFsIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFJlZjogTm92b01vZGFsUmVmLCBwdWJsaWMgcGFyYW1zOiBOb3ZvTW9kYWxQYXJhbXMsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIGNsb3NlKHJlc3VsdDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubW9kYWxSZWYuY2xvc2UocmVzdWx0KTtcbiAgfVxufVxuIl19