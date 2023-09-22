import { Component, ViewChild } from '@angular/core';
import { NovoTemplate } from 'novo-elements/elements/common';
import * as i0 from "@angular/core";
import * as i1 from "./AceEditor";
import * as i2 from "novo-elements/elements/common";
import * as i3 from "@angular/forms";
export class NovoAceEditorFormTemplate {
}
NovoAceEditorFormTemplate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditorFormTemplate, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoAceEditorFormTemplate.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAceEditorFormTemplate, selector: "internal-novo-code-editor-template", viewQueries: [{ propertyName: "template", first: true, predicate: NovoTemplate, descendants: true }], ngImport: i0, template: `<ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>`, isInline: true, components: [{ type: i1.NovoAceEditor, selector: "novo-ace-editor", inputs: ["theme", "options", "mode", "name"], outputs: ["blur", "focus"] }], directives: [{ type: i2.NovoTemplate, selector: "[novoTemplate]", inputs: ["type", "novoTemplate"] }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAceEditorFormTemplate, decorators: [{
            type: Component,
            args: [{
                    template: `<ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>`,
                    selector: 'internal-novo-code-editor-template'
                }]
        }], propDecorators: { template: [{
                type: ViewChild,
                args: [NovoTemplate]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNlRWRpdG9yRm9ybVRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvYWRkb25zL2FjZS1lZGl0b3IvQWNlRWRpdG9yRm9ybVRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7QUFpQjdELE1BQU0sT0FBTyx5QkFBeUI7O3VIQUF6Qix5QkFBeUI7MkdBQXpCLHlCQUF5QixvSEFDdkIsWUFBWSxnREFidkI7Ozs7Ozs7OzttQkFTZTs0RkFHTix5QkFBeUI7a0JBZHJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUNSOzs7Ozs7Ozs7bUJBU2U7b0JBQ2YsUUFBUSxFQUFFLG9DQUFvQztpQkFDakQ7OEJBR0csUUFBUTtzQkFEUCxTQUFTO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgVGVtcGxhdGVIb3N0IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOlxuICAgIGA8bmctdGVtcGxhdGUgbm92b1RlbXBsYXRlPVwiYWNlLWVkaXRvclwiIGxldC1jb250cm9sIGxldC1mb3JtPVwiZm9ybVwiIGxldC1lcnJvcnM9XCJlcnJvcnNcIiBsZXQtbWV0aG9kcz1cIm1ldGhvZHNcIj5cbiAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxub3ZvLWFjZS1lZGl0b3JcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiXG4gICAgICAgICAgKGZvY3VzKT1cIm1ldGhvZHMuaGFuZGxlRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgKGJsdXIpPVwibWV0aG9kcy5oYW5kbGVCbHVyKCRldmVudClcIlxuICAgICAgICA+PC9ub3ZvLWFjZS1lZGl0b3I+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPmAsXG4gICAgc2VsZWN0b3I6ICdpbnRlcm5hbC1ub3ZvLWNvZGUtZWRpdG9yLXRlbXBsYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWNlRWRpdG9yRm9ybVRlbXBsYXRlIGltcGxlbWVudHMgVGVtcGxhdGVIb3N0IHtcbiAgICBAVmlld0NoaWxkKE5vdm9UZW1wbGF0ZSlcbiAgICB0ZW1wbGF0ZTogTm92b1RlbXBsYXRlO1xufSJdfQ==