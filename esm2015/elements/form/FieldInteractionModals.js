// NG2
import { Component } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
// APP
import { NovoModalParams, NovoModalRef } from '../modal/modal-ref';
import * as i0 from "@angular/core";
import * as i1 from "../modal/modal-ref";
import * as i2 from "../../services/novo-label-service";
function ControlConfirmModal_h2_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2");
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelement(4, "i", 4);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.params["label"], ":");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.params["oldValue"], " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.params["newValue"], " ");
} }
function ControlConfirmModal_h2_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.params["message"]);
} }
function ControlPromptModal_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const change_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(change_r1);
} }
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
ControlConfirmModal.ɵfac = function ControlConfirmModal_Factory(t) { return new (t || ControlConfirmModal)(i0.ɵɵdirectiveInject(i1.NovoModalRef), i0.ɵɵdirectiveInject(i1.NovoModalParams), i0.ɵɵdirectiveInject(i2.NovoLabelService)); };
ControlConfirmModal.ɵcmp = i0.ɵɵdefineComponent({ type: ControlConfirmModal, selectors: [["control-confirm-modal"]], decls: 9, vars: 8, consts: [["type", "warning"], [4, "ngIf"], ["theme", "standard", 3, "click"], ["theme", "primary", "icon", "check", "autofocus", "", 3, "click"], [1, "bhi-arrow-right"]], template: function ControlConfirmModal_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-notification", 0);
        i0.ɵɵelementStart(1, "h1");
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, ControlConfirmModal_h2_3_Template, 6, 3, "h2", 1);
        i0.ɵɵtemplate(4, ControlConfirmModal_h2_4_Template, 2, 1, "h2", 1);
        i0.ɵɵelementStart(5, "button", 2);
        i0.ɵɵlistener("click", function ControlConfirmModal_Template_button_click_5_listener() { return ctx.close(false); });
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "button", 3);
        i0.ɵɵlistener("click", function ControlConfirmModal_Template_button_click_7_listener() { return ctx.close(true); });
        i0.ɵɵtext(8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵattribute("data-automation-id", "field-interaction-modal-" + ctx.params["key"]);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.labels.confirmChangesModalMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.params["message"]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.params["message"]);
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("data-automation-id", "field-interaction-modal-cancel" + ctx.params["key"]);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.labels.cancel, " ");
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("data-automation-id", "field-interaction-modal-save-" + ctx.params["key"]);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.labels.save, " ");
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ControlConfirmModal, [{
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
      <button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </button>
      <button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-save-' + params['key']"
      >
        {{ labels.save }}
      </button>
    </novo-notification>
  `,
            }]
    }], function () { return [{ type: i1.NovoModalRef }, { type: i1.NovoModalParams }, { type: i2.NovoLabelService }]; }, null); })();
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
ControlPromptModal.ɵfac = function ControlPromptModal_Factory(t) { return new (t || ControlPromptModal)(i0.ɵɵdirectiveInject(i1.NovoModalRef), i0.ɵɵdirectiveInject(i1.NovoModalParams), i0.ɵɵdirectiveInject(i2.NovoLabelService)); };
ControlPromptModal.ɵcmp = i0.ɵɵdefineComponent({ type: ControlPromptModal, selectors: [["control-prompt-modal"]], decls: 8, vars: 7, consts: [["type", "warning"], [4, "ngFor", "ngForOf"], ["theme", "standard", 3, "click"], ["theme", "primary", "icon", "check", "autofocus", "", 3, "click"]], template: function ControlPromptModal_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-notification", 0);
        i0.ɵɵelementStart(1, "h1");
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, ControlPromptModal_p_3_Template, 2, 1, "p", 1);
        i0.ɵɵelementStart(4, "button", 2);
        i0.ɵɵlistener("click", function ControlPromptModal_Template_button_click_4_listener() { return ctx.close(false); });
        i0.ɵɵtext(5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "button", 3);
        i0.ɵɵlistener("click", function ControlPromptModal_Template_button_click_6_listener() { return ctx.close(true); });
        i0.ɵɵtext(7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵattribute("data-automation-id", "field-interaction-modal-" + ctx.params["key"]);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.labels.promptModalMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.params["changes"]);
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("data-automation-id", "field-interaction-modal-cancel" + ctx.params["key"]);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.labels.cancel, " ");
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("data-automation-id", "field-interaction-modal-yes-" + ctx.params["key"]);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.labels.yes, " ");
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ControlPromptModal, [{
        type: Component,
        args: [{
                selector: 'control-prompt-modal',
                template: `
    <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
      <h1>{{ labels.promptModalMessage }}</h1>
      <p *ngFor="let change of params['changes']">{{ change }}</p>
      <button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </button>
      <button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-yes-' + params['key']"
      >
        {{ labels.yes }}
      </button>
    </novo-notification>
  `,
            }]
    }], function () { return [{ type: i1.NovoModalRef }, { type: i1.NovoModalParams }, { type: i2.NovoLabelService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRJbnRlcmFjdGlvbk1vZGFscy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9mb3JtL0ZpZWxkSW50ZXJhY3Rpb25Nb2RhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0lBTzdELDBCQUNFO0lBQUEsNkJBQU87SUFBQSxZQUFzQjtJQUFBLGlCQUFRO0lBQUMsWUFBeUI7SUFBQSx1QkFBK0I7SUFBQyxZQUNqRztJQUFBLGlCQUFLOzs7SUFESSxlQUFzQjtJQUF0QixzREFBc0I7SUFBUyxlQUF5QjtJQUF6QiwwREFBeUI7SUFBZ0MsZUFDakc7SUFEaUcsMERBQ2pHOzs7SUFDQSwwQkFBOEI7SUFBQSxZQUF1QjtJQUFBLGlCQUFLOzs7SUFBNUIsZUFBdUI7SUFBdkIsOENBQXVCOzs7SUE2QnJELHlCQUE0QztJQUFBLFlBQVk7SUFBQSxpQkFBSTs7O0lBQWhCLGVBQVk7SUFBWiwrQkFBWTs7QUFiOUQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFvQixRQUFzQixFQUFTLE1BQXVCLEVBQVMsTUFBd0I7UUFBdkYsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBRyxDQUFDO0lBRXhHLEtBQUssQ0FBQyxNQUFlO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7O3NGQUxVLG1CQUFtQjt3REFBbkIsbUJBQW1CO1FBckI1Qiw0Q0FDRTtRQUFBLDBCQUFJO1FBQUEsWUFBdUM7UUFBQSxpQkFBSztRQUNoRCxrRUFDRTtRQUVGLGtFQUE4QjtRQUM5QixpQ0FDRTtRQUR1QixnR0FBUyxVQUFNLEtBQUssQ0FBQyxJQUFDO1FBQzdDLFlBQ0Y7UUFBQSxpQkFBUztRQUNULGlDQU9FO1FBSkEsZ0dBQVMsVUFBTSxJQUFJLENBQUMsSUFBQztRQUlyQixZQUNGO1FBQUEsaUJBQVM7UUFDWCxpQkFBb0I7O1FBbEJjLG9GQUFzRTtRQUNsRyxlQUF1QztRQUF2QywyREFBdUM7UUFDdkMsZUFBMEI7UUFBMUIsNkNBQTBCO1FBRzFCLGVBQXlCO1FBQXpCLDRDQUF5QjtRQUNtQixlQUE0RTtRQUE1RSwwRkFBNEU7UUFDMUgsZUFDRjtRQURFLGtEQUNGO1FBTUUsZUFBMkU7UUFBM0UseUZBQTJFO1FBRTNFLGVBQ0Y7UUFERSxnREFDRjs7a0RBSU8sbUJBQW1CO2NBeEIvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDthQUNGOztBQThCRCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLFFBQXNCLEVBQVMsTUFBdUIsRUFBUyxNQUF3QjtRQUF2RixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFHLENBQUM7SUFFeEcsS0FBSyxDQUFDLE1BQWU7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7b0ZBTFUsa0JBQWtCO3VEQUFsQixrQkFBa0I7UUFsQjNCLDRDQUNFO1FBQUEsMEJBQUk7UUFBQSxZQUErQjtRQUFBLGlCQUFLO1FBQ3hDLCtEQUE0QztRQUM1QyxpQ0FDRTtRQUR1QiwrRkFBUyxVQUFNLEtBQUssQ0FBQyxJQUFDO1FBQzdDLFlBQ0Y7UUFBQSxpQkFBUztRQUNULGlDQU9FO1FBSkEsK0ZBQVMsVUFBTSxJQUFJLENBQUMsSUFBQztRQUlyQixZQUNGO1FBQUEsaUJBQVM7UUFDWCxpQkFBb0I7O1FBZmMsb0ZBQXNFO1FBQ2xHLGVBQStCO1FBQS9CLG1EQUErQjtRQUNoQyxlQUF3QztRQUF4QywrQ0FBd0M7UUFDSyxlQUE0RTtRQUE1RSwwRkFBNEU7UUFDMUgsZUFDRjtRQURFLGtEQUNGO1FBTUUsZUFBMEU7UUFBMUUsd0ZBQTBFO1FBRTFFLGVBQ0Y7UUFERSwrQ0FDRjs7a0RBSU8sa0JBQWtCO2NBckI5QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTW9kYWxQYXJhbXMsIE5vdm9Nb2RhbFJlZiB9IGZyb20gJy4uL21vZGFsL21vZGFsLXJlZic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvbnRyb2wtY29uZmlybS1tb2RhbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tbm90aWZpY2F0aW9uIHR5cGU9XCJ3YXJuaW5nXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC0nICsgcGFyYW1zWydrZXknXVwiPlxuICAgICAgPGgxPnt7IGxhYmVscy5jb25maXJtQ2hhbmdlc01vZGFsTWVzc2FnZSB9fTwvaDE+XG4gICAgICA8aDIgKm5nSWY9XCIhcGFyYW1zWydtZXNzYWdlJ11cIj5cbiAgICAgICAgPGxhYmVsPnt7IHBhcmFtc1snbGFiZWwnXSB9fTo8L2xhYmVsPiB7eyBwYXJhbXNbJ29sZFZhbHVlJ10gfX0gPGkgY2xhc3M9XCJiaGktYXJyb3ctcmlnaHRcIj48L2k+IHt7IHBhcmFtc1snbmV3VmFsdWUnXSB9fVxuICAgICAgPC9oMj5cbiAgICAgIDxoMiAqbmdJZj1cInBhcmFtc1snbWVzc2FnZSddXCI+e3sgcGFyYW1zWydtZXNzYWdlJ10gfX08L2gyPlxuICAgICAgPGJ1dHRvbiB0aGVtZT1cInN0YW5kYXJkXCIgKGNsaWNrKT1cImNsb3NlKGZhbHNlKVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmllbGQtaW50ZXJhY3Rpb24tbW9kYWwtY2FuY2VsJyArIHBhcmFtc1sna2V5J11cIj5cbiAgICAgICAge3sgbGFiZWxzLmNhbmNlbCB9fVxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHRoZW1lPVwicHJpbWFyeVwiXG4gICAgICAgIGljb249XCJjaGVja1wiXG4gICAgICAgIChjbGljayk9XCJjbG9zZSh0cnVlKVwiXG4gICAgICAgIGF1dG9mb2N1c1xuICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2ZpZWxkLWludGVyYWN0aW9uLW1vZGFsLXNhdmUtJyArIHBhcmFtc1sna2V5J11cIlxuICAgICAgPlxuICAgICAgICB7eyBsYWJlbHMuc2F2ZSB9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9ub3ZvLW5vdGlmaWNhdGlvbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ29udHJvbENvbmZpcm1Nb2RhbCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxSZWY6IE5vdm9Nb2RhbFJlZiwgcHVibGljIHBhcmFtczogTm92b01vZGFsUGFyYW1zLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBjbG9zZShyZXN1bHQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKHJlc3VsdCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29udHJvbC1wcm9tcHQtbW9kYWwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLW5vdGlmaWNhdGlvbiB0eXBlPVwid2FybmluZ1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmllbGQtaW50ZXJhY3Rpb24tbW9kYWwtJyArIHBhcmFtc1sna2V5J11cIj5cbiAgICAgIDxoMT57eyBsYWJlbHMucHJvbXB0TW9kYWxNZXNzYWdlIH19PC9oMT5cbiAgICAgIDxwICpuZ0Zvcj1cImxldCBjaGFuZ2Ugb2YgcGFyYW1zWydjaGFuZ2VzJ11cIj57eyBjaGFuZ2UgfX08L3A+XG4gICAgICA8YnV0dG9uIHRoZW1lPVwic3RhbmRhcmRcIiAoY2xpY2spPVwiY2xvc2UoZmFsc2UpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidmaWVsZC1pbnRlcmFjdGlvbi1tb2RhbC1jYW5jZWwnICsgcGFyYW1zWydrZXknXVwiPlxuICAgICAgICB7eyBsYWJlbHMuY2FuY2VsIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdGhlbWU9XCJwcmltYXJ5XCJcbiAgICAgICAgaWNvbj1cImNoZWNrXCJcbiAgICAgICAgKGNsaWNrKT1cImNsb3NlKHRydWUpXCJcbiAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZmllbGQtaW50ZXJhY3Rpb24tbW9kYWwteWVzLScgKyBwYXJhbXNbJ2tleSddXCJcbiAgICAgID5cbiAgICAgICAge3sgbGFiZWxzLnllcyB9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9ub3ZvLW5vdGlmaWNhdGlvbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ29udHJvbFByb21wdE1vZGFsIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFJlZjogTm92b01vZGFsUmVmLCBwdWJsaWMgcGFyYW1zOiBOb3ZvTW9kYWxQYXJhbXMsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIGNsb3NlKHJlc3VsdDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubW9kYWxSZWYuY2xvc2UocmVzdWx0KTtcbiAgfVxufVxuIl19