import { Directive, Input, ViewChild } from '@angular/core';
import { NovoLabelService } from '../../../services';
import { NovoConditionFieldDef } from '../query-builder.directives';
import * as i0 from "@angular/core";
import * as i1 from "../../../services";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFHcEUsTUFBTSxPQUFnQix5QkFBeUI7SUFrQjdDLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQWpCL0MsZ0VBQWdFO0lBQ2hFLElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixzRUFBc0U7UUFDdEUsZ0ZBQWdGO1FBQ2hGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFTRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCx5RUFBeUU7SUFDakUsaUJBQWlCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVPLDBCQUEwQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUN0RDtJQUNILENBQUM7O3VIQTFDbUIseUJBQXlCOzJHQUF6Qix5QkFBeUIsOEZBZ0JsQyxxQkFBcUI7NEZBaEJaLHlCQUF5QjtrQkFEOUMsU0FBUzt1R0FJSixJQUFJO3NCQURQLEtBQUs7Z0JBYzhDLFFBQVE7c0JBQTNELFNBQVM7dUJBQUMscUJBQXFCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IE5vdm9Db25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIC8qKiBDb2x1bW4gbmFtZSB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIHJlZmVyZW5jZSB0aGlzIGNvbHVtbi4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAvLyBXaXRoIEl2eSwgaW5wdXRzIGNhbiBiZSBpbml0aWFsaXplZCBiZWZvcmUgc3RhdGljIHF1ZXJ5IHJlc3VsdHMgYXJlXG4gICAgLy8gYXZhaWxhYmxlLiBJbiB0aGF0IGNhc2UsIHdlIGRlZmVyIHRoZSBzeW5jaHJvbml6YXRpb24gdW50aWwgXCJuZ09uSW5pdFwiIGZpcmVzLlxuICAgIHRoaXMuX3N5bmNGaWVsZERlZk5hbWUoKTtcbiAgfVxuICBfbmFtZTogc3RyaW5nO1xuXG4gIGRlZmF1bHRPcGVyYXRvcjogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoTm92b0NvbmRpdGlvbkZpZWxkRGVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaWVsZERlZjogTm92b0NvbmRpdGlvbkZpZWxkRGVmO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fc3luY0ZpZWxkRGVmTmFtZSgpO1xuICAgIHRoaXMuX3N5bmNGaWVsZERlZk9wZXJhdG9yVmFsdWUoKTtcbiAgICAvLyBOZWVkIHRvIGFkZCBzZWxmIHRvIEZpbHRlckJ1aWxkZXIgYmVjYXVzZSBcIkNvbnRlbnRDaGlsZHJlbiB3b24ndCBmaW5kIGl0XCJcbiAgICB0aGlzLmZpZWxkRGVmPy5yZWdpc3RlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5maWVsZERlZj8udW5yZWdpc3RlcigpO1xuICB9XG5cbiAgLyoqIFN5bmNocm9uaXplcyB0aGUgY29sdW1uIGRlZmluaXRpb24gbmFtZSB3aXRoIHRoZSB0ZXh0IGNvbHVtbiBuYW1lLiAqL1xuICBwcml2YXRlIF9zeW5jRmllbGREZWZOYW1lKCkge1xuICAgIGlmICh0aGlzLmZpZWxkRGVmKSB7XG4gICAgICB0aGlzLmZpZWxkRGVmLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc3luY0ZpZWxkRGVmT3BlcmF0b3JWYWx1ZSgpIHtcbiAgICBpZiAodGhpcy5maWVsZERlZikge1xuICAgICAgdGhpcy5maWVsZERlZi5kZWZhdWx0T3BlcmF0b3IgPSB0aGlzLmRlZmF1bHRPcGVyYXRvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==