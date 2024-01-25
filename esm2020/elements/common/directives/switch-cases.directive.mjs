import { NgSwitch } from '@angular/common';
import { Directive, Host, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SwitchCasesDirective {
    constructor(viewContainer, templateRef, ngSwitch) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this._created = false;
        this.ngSwitch = ngSwitch;
    }
    ngOnInit() {
        (this.novoSwitchCases || []).forEach(() => this.ngSwitch._addCase());
    }
    ngDoCheck() {
        let enforce = false;
        (this.novoSwitchCases || []).forEach((value) => (enforce = this.ngSwitch._matchCase(value) || enforce));
        this.enforceState(enforce);
    }
    enforceState(created) {
        if (created && !this._created) {
            this._created = true;
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else if (!created && this._created) {
            this._created = false;
            this.viewContainer.clear();
        }
    }
}
SwitchCasesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SwitchCasesDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i1.NgSwitch, host: true }], target: i0.ɵɵFactoryTarget.Directive });
SwitchCasesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: { novoSwitchCases: "novoSwitchCases" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: SwitchCasesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSwitchCases]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i1.NgSwitch, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { novoSwitchCases: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLWNhc2VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi9kaXJlY3RpdmVzL3N3aXRjaC1jYXNlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQVcsSUFBSSxFQUFFLEtBQUssRUFBVSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUt2RyxNQUFNLE9BQU8sb0JBQW9CO0lBTy9CLFlBQW9CLGFBQStCLEVBQVUsV0FBZ0MsRUFBVSxRQUFrQjtRQUFyRyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBcUI7UUFMckYsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU12QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUTtRQUNOLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQWdCO1FBQzNCLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN6RDthQUFNLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7aUhBN0JVLG9CQUFvQjtxR0FBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBSGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUI7OzBCQVFpRyxJQUFJOzRDQUZwRyxlQUFlO3NCQURkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1N3aXRjaCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIERvQ2hlY2ssIEhvc3QsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvU3dpdGNoQ2FzZXNdJyxcbn0pXG5leHBvcnQgY2xhc3MgU3dpdGNoQ2FzZXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xuICBwcml2YXRlIG5nU3dpdGNoOiBhbnk7XG4gIHByaXZhdGUgX2NyZWF0ZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBub3ZvU3dpdGNoQ2FzZXM6IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8T2JqZWN0PiwgQEhvc3QoKSBuZ1N3aXRjaDogTmdTd2l0Y2gpIHtcbiAgICB0aGlzLm5nU3dpdGNoID0gbmdTd2l0Y2g7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAodGhpcy5ub3ZvU3dpdGNoQ2FzZXMgfHwgW10pLmZvckVhY2goKCkgPT4gdGhpcy5uZ1N3aXRjaC5fYWRkQ2FzZSgpKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBsZXQgZW5mb3JjZSA9IGZhbHNlO1xuICAgICh0aGlzLm5vdm9Td2l0Y2hDYXNlcyB8fCBbXSkuZm9yRWFjaCgodmFsdWUpID0+IChlbmZvcmNlID0gdGhpcy5uZ1N3aXRjaC5fbWF0Y2hDYXNlKHZhbHVlKSB8fCBlbmZvcmNlKSk7XG4gICAgdGhpcy5lbmZvcmNlU3RhdGUoZW5mb3JjZSk7XG4gIH1cblxuICBlbmZvcmNlU3RhdGUoY3JlYXRlZDogYm9vbGVhbikge1xuICAgIGlmIChjcmVhdGVkICYmICF0aGlzLl9jcmVhdGVkKSB7XG4gICAgICB0aGlzLl9jcmVhdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG4gICAgfSBlbHNlIGlmICghY3JlYXRlZCAmJiB0aGlzLl9jcmVhdGVkKSB7XG4gICAgICB0aGlzLl9jcmVhdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==