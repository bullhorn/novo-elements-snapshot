import { Directive, Input, Optional, ViewChild } from '@angular/core';
import { NovoFilterFieldInputDef, NovoFilterFieldOperatorsDef, NovoFilterFieldTypeDef } from '../base-filter-field.definition';
import { FilterBuilderComponent } from '../filter-builder.component';
import * as i0 from "@angular/core";
import * as i1 from "../filter-builder.component";
export class DefaultFilterFieldDef {
    constructor(_fb) {
        this._fb = _fb;
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
        this._fb.addFieldDef(this.fieldDef);
    }
    ngOnDestroy() {
        if (this._fb) {
            // Need to remove self to FilterBuilder
            this._fb.removeFieldDef(this.fieldDef);
        }
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
DefaultFilterFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DefaultFilterFieldDef, deps: [{ token: i1.FilterBuilderComponent, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
DefaultFilterFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: DefaultFilterFieldDef, inputs: { name: "name" }, viewQueries: [{ propertyName: "fieldDef", first: true, predicate: NovoFilterFieldTypeDef, descendants: true, static: true }, { propertyName: "inputDef", first: true, predicate: NovoFilterFieldInputDef, descendants: true, static: true }, { propertyName: "operatorDef", first: true, predicate: NovoFilterFieldOperatorsDef, descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DefaultFilterFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.FilterBuilderComponent, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { name: [{
                type: Input
            }], fieldDef: [{
                type: ViewChild,
                args: [NovoFilterFieldTypeDef, { static: true }]
            }], inputDef: [{
                type: ViewChild,
                args: [NovoFilterFieldInputDef, { static: true }]
            }], operatorDef: [{
                type: ViewChild,
                args: [NovoFilterFieldOperatorsDef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1maWx0ZXItZmllbGQuZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvZmlsdGVyLWJ1aWxkZXIvZGVmYXVsdC1jb25kaXRpb24tZGVmcy9kZWZhdWx0LWZpbHRlci1maWVsZC5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSwyQkFBMkIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ILE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFHckUsTUFBTSxPQUFPLHFCQUFxQjtJQTRCaEMsWUFBZ0MsR0FBZ0M7UUFBaEMsUUFBRyxHQUFILEdBQUcsQ0FBNkI7SUFBRyxDQUFDO0lBM0JwRSxnRUFBZ0U7SUFDaEUsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxJQUFZO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLHNFQUFzRTtRQUN0RSxnRkFBZ0Y7UUFDaEYsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQW1CRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLHVDQUF1QztZQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQseUVBQXlFO0lBQ2pFLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNoQztJQUNILENBQUM7SUFDTywwQkFBMEI7UUFDaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDdEQ7SUFDSCxDQUFDOztrSEF0RFUscUJBQXFCO3NHQUFyQixxQkFBcUIsOEZBZ0JyQixzQkFBc0IseUZBS3RCLHVCQUF1Qiw0RkFLdkIsMkJBQTJCOzJGQTFCM0IscUJBQXFCO2tCQURqQyxTQUFTOzswQkE2QkssUUFBUTs0Q0F6QmpCLElBQUk7c0JBRFAsS0FBSztnQkFjK0MsUUFBUTtzQkFBNUQsU0FBUzt1QkFBQyxzQkFBc0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBS0csUUFBUTtzQkFBN0QsU0FBUzt1QkFBQyx1QkFBdUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBS00sV0FBVztzQkFBcEUsU0FBUzt1QkFBQywyQkFBMkIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0ZpbHRlckZpZWxkSW5wdXREZWYsIE5vdm9GaWx0ZXJGaWVsZE9wZXJhdG9yc0RlZiwgTm92b0ZpbHRlckZpZWxkVHlwZURlZiB9IGZyb20gJy4uL2Jhc2UtZmlsdGVyLWZpZWxkLmRlZmluaXRpb24nO1xuaW1wb3J0IHsgRmlsdGVyQnVpbGRlckNvbXBvbmVudCB9IGZyb20gJy4uL2ZpbHRlci1idWlsZGVyLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIERlZmF1bHRGaWx0ZXJGaWVsZERlZiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgLyoqIENvbHVtbiBuYW1lIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gcmVmZXJlbmNlIHRoaXMgY29sdW1uLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIHNldCBuYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIC8vIFdpdGggSXZ5LCBpbnB1dHMgY2FuIGJlIGluaXRpYWxpemVkIGJlZm9yZSBzdGF0aWMgcXVlcnkgcmVzdWx0cyBhcmVcbiAgICAvLyBhdmFpbGFibGUuIEluIHRoYXQgY2FzZSwgd2UgZGVmZXIgdGhlIHN5bmNocm9uaXphdGlvbiB1bnRpbCBcIm5nT25Jbml0XCIgZmlyZXMuXG4gICAgdGhpcy5fc3luY0ZpZWxkRGVmTmFtZSgpO1xuICB9XG4gIF9uYW1lOiBzdHJpbmc7XG5cbiAgZGVmYXVsdE9wZXJhdG9yOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZChOb3ZvRmlsdGVyRmllbGRUeXBlRGVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaWVsZERlZjogTm92b0ZpbHRlckZpZWxkVHlwZURlZjtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBkZWZpbmVkIGlucHV0IHRlbXBsYXRlIGZvciB0aGUgZmllbGRcbiAgICovXG4gIEBWaWV3Q2hpbGQoTm92b0ZpbHRlckZpZWxkSW5wdXREZWYsIHsgc3RhdGljOiB0cnVlIH0pIGlucHV0RGVmOiBOb3ZvRmlsdGVyRmllbGRJbnB1dERlZjtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBkZWZpbmVkIG9wZXJhdG9yIHRlbXBsYXRlIGZvciB0aGUgZmllbGRcbiAgICovXG4gIEBWaWV3Q2hpbGQoTm92b0ZpbHRlckZpZWxkT3BlcmF0b3JzRGVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBvcGVyYXRvckRlZjogTm92b0ZpbHRlckZpZWxkT3BlcmF0b3JzRGVmO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgX2ZiOiBGaWx0ZXJCdWlsZGVyQ29tcG9uZW50PGFueT4pIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fc3luY0ZpZWxkRGVmTmFtZSgpO1xuICAgIHRoaXMuX3N5bmNGaWVsZERlZk9wZXJhdG9yVmFsdWUoKTtcbiAgICAvLyBOZWVkIHRvIGFkZCBzZWxmIHRvIEZpbHRlckJ1aWxkZXIgYmVjYXVzZSBcIkNvbnRlbnRDaGlsZHJlbiB3b24ndCBmaW5kIGl0XCJcbiAgICB0aGlzLl9mYi5hZGRGaWVsZERlZih0aGlzLmZpZWxkRGVmKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9mYikge1xuICAgICAgLy8gTmVlZCB0byByZW1vdmUgc2VsZiB0byBGaWx0ZXJCdWlsZGVyXG4gICAgICB0aGlzLl9mYi5yZW1vdmVGaWVsZERlZih0aGlzLmZpZWxkRGVmKTtcbiAgICB9XG4gIH1cblxuICAvKiogU3luY2hyb25pemVzIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBuYW1lIHdpdGggdGhlIHRleHQgY29sdW1uIG5hbWUuICovXG4gIHByaXZhdGUgX3N5bmNGaWVsZERlZk5hbWUoKSB7XG4gICAgaWYgKHRoaXMuZmllbGREZWYpIHtcbiAgICAgIHRoaXMuZmllbGREZWYubmFtZSA9IHRoaXMubmFtZTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfc3luY0ZpZWxkRGVmT3BlcmF0b3JWYWx1ZSgpIHtcbiAgICBpZiAodGhpcy5maWVsZERlZikge1xuICAgICAgdGhpcy5maWVsZERlZi5kZWZhdWx0T3BlcmF0b3IgPSB0aGlzLmRlZmF1bHRPcGVyYXRvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==