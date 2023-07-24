import { Directive, Input, ViewChild } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { NovoConditionFieldDef } from '../query-builder.directives';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
export class AbstractConditionFieldDef {
    constructor(labels) {
        this.labels = labels;
    }
    /** Column name that should be used to reference this column. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
        // With Ivy, inputs can be initialized before static query results are
        // available. In that case, we defer the synchronization until "ngOnInit" fires.
        this._syncFieldDefName();
    }
    ngOnInit() {
        this._syncFieldDefName();
        this._syncFieldDefOperatorValue();
        // Need to add self to FilterBuilder because "ContentChildren won't find it"
        this.fieldDef?.register();
    }
    ngOnDestroy() {
        this.fieldDef?.unregister();
    }
    onOperatorSelect(formGroup) {
        formGroup.get('value').setValue(null);
    }
    /** Synchronizes the column definition name with the text column name. */
    _syncFieldDefName() {
        if (this.fieldDef) {
            this.fieldDef.name = this.name;
        }
    }
    _syncFieldDefOperatorValue() {
        if (this.fieldDef) {
            this.fieldDef.defaultOperator = this.defaultOperator;
        }
    }
}
AbstractConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AbstractConditionFieldDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
AbstractConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: AbstractConditionFieldDef, inputs: { name: "name" }, viewQueries: [{ propertyName: "fieldDef", first: true, predicate: NovoConditionFieldDef, descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AbstractConditionFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { name: [{
                type: Input
            }], fieldDef: [{
                type: ViewChild,
                args: [NovoConditionFieldDef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFHcEUsTUFBTSxPQUFnQix5QkFBeUI7SUFrQjdDLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQWpCL0MsZ0VBQWdFO0lBQ2hFLElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixzRUFBc0U7UUFDdEUsZ0ZBQWdGO1FBQ2hGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFTRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxTQUFvQjtRQUNuQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQseUVBQXlFO0lBQ2pFLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNoQztJQUNILENBQUM7SUFFTywwQkFBMEI7UUFDaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDdEQ7SUFDSCxDQUFDOzt1SEE5Q21CLHlCQUF5QjsyR0FBekIseUJBQXlCLDhGQWdCbEMscUJBQXFCOzRGQWhCWix5QkFBeUI7a0JBRDlDLFNBQVM7dUdBSUosSUFBSTtzQkFEUCxLQUFLO2dCQWM4QyxRQUFRO3NCQUEzRCxTQUFTO3VCQUFDLHFCQUFxQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IE5vdm9Db25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIC8qKiBDb2x1bW4gbmFtZSB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIHJlZmVyZW5jZSB0aGlzIGNvbHVtbi4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAvLyBXaXRoIEl2eSwgaW5wdXRzIGNhbiBiZSBpbml0aWFsaXplZCBiZWZvcmUgc3RhdGljIHF1ZXJ5IHJlc3VsdHMgYXJlXG4gICAgLy8gYXZhaWxhYmxlLiBJbiB0aGF0IGNhc2UsIHdlIGRlZmVyIHRoZSBzeW5jaHJvbml6YXRpb24gdW50aWwgXCJuZ09uSW5pdFwiIGZpcmVzLlxuICAgIHRoaXMuX3N5bmNGaWVsZERlZk5hbWUoKTtcbiAgfVxuICBfbmFtZTogc3RyaW5nO1xuXG4gIGRlZmF1bHRPcGVyYXRvcjogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoTm92b0NvbmRpdGlvbkZpZWxkRGVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaWVsZERlZjogTm92b0NvbmRpdGlvbkZpZWxkRGVmO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fc3luY0ZpZWxkRGVmTmFtZSgpO1xuICAgIHRoaXMuX3N5bmNGaWVsZERlZk9wZXJhdG9yVmFsdWUoKTtcbiAgICAvLyBOZWVkIHRvIGFkZCBzZWxmIHRvIEZpbHRlckJ1aWxkZXIgYmVjYXVzZSBcIkNvbnRlbnRDaGlsZHJlbiB3b24ndCBmaW5kIGl0XCJcbiAgICB0aGlzLmZpZWxkRGVmPy5yZWdpc3RlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5maWVsZERlZj8udW5yZWdpc3RlcigpO1xuICB9XG5cbiAgb25PcGVyYXRvclNlbGVjdChmb3JtR3JvdXA6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUobnVsbCk7XG4gIH1cblxuICAvKiogU3luY2hyb25pemVzIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBuYW1lIHdpdGggdGhlIHRleHQgY29sdW1uIG5hbWUuICovXG4gIHByaXZhdGUgX3N5bmNGaWVsZERlZk5hbWUoKSB7XG4gICAgaWYgKHRoaXMuZmllbGREZWYpIHtcbiAgICAgIHRoaXMuZmllbGREZWYubmFtZSA9IHRoaXMubmFtZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zeW5jRmllbGREZWZPcGVyYXRvclZhbHVlKCkge1xuICAgIGlmICh0aGlzLmZpZWxkRGVmKSB7XG4gICAgICB0aGlzLmZpZWxkRGVmLmRlZmF1bHRPcGVyYXRvciA9IHRoaXMuZGVmYXVsdE9wZXJhdG9yO1xuICAgIH1cbiAgfVxufVxuIl19