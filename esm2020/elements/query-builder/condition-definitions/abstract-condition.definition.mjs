import { Directive, Input, ViewChild } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { NovoConditionFieldDef } from '../query-builder.directives';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
export class AbstractConditionFieldDef {
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
    constructor(labels) {
        this.labels = labels;
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
AbstractConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AbstractConditionFieldDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
AbstractConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: AbstractConditionFieldDef, inputs: { name: "name" }, viewQueries: [{ propertyName: "fieldDef", first: true, predicate: NovoConditionFieldDef, descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AbstractConditionFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { name: [{
                type: Input
            }], fieldDef: [{
                type: ViewChild,
                args: [NovoConditionFieldDef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFHcEUsTUFBTSxPQUFnQix5QkFBeUI7SUFDN0MsZ0VBQWdFO0lBQ2hFLElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixzRUFBc0U7UUFDdEUsZ0ZBQWdGO1FBQ2hGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFPRCxZQUFtQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFHLENBQUM7SUFFL0MsUUFBUTtRQUNOLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xDLDRFQUE0RTtRQUM1RSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsU0FBMkI7UUFDMUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHlFQUF5RTtJQUNqRSxpQkFBaUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ3REO0lBQ0gsQ0FBQzs7dUhBOUNtQix5QkFBeUI7MkdBQXpCLHlCQUF5Qiw4RkFnQmxDLHFCQUFxQjs0RkFoQloseUJBQXlCO2tCQUQ5QyxTQUFTO3VHQUlKLElBQUk7c0JBRFAsS0FBSztnQkFjOEMsUUFBUTtzQkFBM0QsU0FBUzt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgTm92b0NvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci5kaXJlY3RpdmVzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgLyoqIENvbHVtbiBuYW1lIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gcmVmZXJlbmNlIHRoaXMgY29sdW1uLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIHNldCBuYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIC8vIFdpdGggSXZ5LCBpbnB1dHMgY2FuIGJlIGluaXRpYWxpemVkIGJlZm9yZSBzdGF0aWMgcXVlcnkgcmVzdWx0cyBhcmVcbiAgICAvLyBhdmFpbGFibGUuIEluIHRoYXQgY2FzZSwgd2UgZGVmZXIgdGhlIHN5bmNocm9uaXphdGlvbiB1bnRpbCBcIm5nT25Jbml0XCIgZmlyZXMuXG4gICAgdGhpcy5fc3luY0ZpZWxkRGVmTmFtZSgpO1xuICB9XG4gIF9uYW1lOiBzdHJpbmc7XG5cbiAgZGVmYXVsdE9wZXJhdG9yOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZChOb3ZvQ29uZGl0aW9uRmllbGREZWYsIHsgc3RhdGljOiB0cnVlIH0pIGZpZWxkRGVmOiBOb3ZvQ29uZGl0aW9uRmllbGREZWY7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9zeW5jRmllbGREZWZOYW1lKCk7XG4gICAgdGhpcy5fc3luY0ZpZWxkRGVmT3BlcmF0b3JWYWx1ZSgpO1xuICAgIC8vIE5lZWQgdG8gYWRkIHNlbGYgdG8gRmlsdGVyQnVpbGRlciBiZWNhdXNlIFwiQ29udGVudENoaWxkcmVuIHdvbid0IGZpbmQgaXRcIlxuICAgIHRoaXMuZmllbGREZWY/LnJlZ2lzdGVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmZpZWxkRGVmPy51bnJlZ2lzdGVyKCk7XG4gIH1cblxuICBvbk9wZXJhdG9yU2VsZWN0KGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUobnVsbCk7XG4gIH1cblxuICAvKiogU3luY2hyb25pemVzIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBuYW1lIHdpdGggdGhlIHRleHQgY29sdW1uIG5hbWUuICovXG4gIHByaXZhdGUgX3N5bmNGaWVsZERlZk5hbWUoKSB7XG4gICAgaWYgKHRoaXMuZmllbGREZWYpIHtcbiAgICAgIHRoaXMuZmllbGREZWYubmFtZSA9IHRoaXMubmFtZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zeW5jRmllbGREZWZPcGVyYXRvclZhbHVlKCkge1xuICAgIGlmICh0aGlzLmZpZWxkRGVmKSB7XG4gICAgICB0aGlzLmZpZWxkRGVmLmRlZmF1bHRPcGVyYXRvciA9IHRoaXMuZGVmYXVsdE9wZXJhdG9yO1xuICAgIH1cbiAgfVxufVxuIl19