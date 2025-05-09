import { Directive, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControlName } from '@angular/forms';
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
        this.operatorEditGroups = [];
    }
    ngOnInit() {
        this._syncFieldDefName();
        this._syncFieldDefOperatorValue();
        this._previousOperatorValue = this.defaultOperator;
        // Need to add self to FilterBuilder because "ContentChildren won't find it"
        this.fieldDef?.register();
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.frameAfterViewInit();
        });
    }
    frameAfterViewInit() {
        const operatorField = this.formControlsByName.find(formControlDirective => formControlDirective.name === 'operator')?.control;
        if (operatorField) {
            this._previousOperatorValue = operatorField.value;
        }
    }
    ngOnDestroy() {
        this.fieldDef?.unregister();
    }
    /**
     * Define an edit group of operators. Once defined, if the user switches from one of these operators to another,
     * then the condition value will not be cleared. This makes sense if both operators use the same UI controls for editing.
     * @param operators The set of Operator values intended to share UI controls.
     */
    defineOperatorEditGroup(...operators) {
        this.operatorEditGroups.push(new Set(operators));
    }
    onOperatorSelect(formGroup) {
        let clearVal = true;
        if (this._previousOperatorValue && this.operatorEditGroups?.length) {
            const previousOperatorGroupIndex = this.operatorEditGroups.findIndex(grp => grp.has(this._previousOperatorValue));
            const newOperatorValue = formGroup.get('operator').getRawValue();
            const newOperatorGroupIndex = this.operatorEditGroups.findIndex(grp => grp.has(newOperatorValue));
            if (previousOperatorGroupIndex !== -1 && newOperatorGroupIndex !== -1 && previousOperatorGroupIndex === newOperatorGroupIndex) {
                clearVal = false;
            }
        }
        this._previousOperatorValue = formGroup.get('operator').value;
        if (clearVal) {
            formGroup.get('value').setValue(null);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AbstractConditionFieldDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.12", type: AbstractConditionFieldDef, inputs: { name: "name" }, viewQueries: [{ propertyName: "fieldDef", first: true, predicate: NovoConditionFieldDef, descendants: true, static: true }, { propertyName: "formControlsByName", predicate: FormControlName, descendants: true }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AbstractConditionFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { name: [{
                type: Input
            }], fieldDef: [{
                type: ViewChild,
                args: [NovoConditionFieldDef, { static: true }]
            }], formControlsByName: [{
                type: ViewChildren,
                args: [FormControlName]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtY29uZGl0aW9uLmRlZmluaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NvbmRpdGlvbi1kZWZpbml0aW9ucy9hYnN0cmFjdC1jb25kaXRpb24uZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxlQUFlLEVBQW9CLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUlwRSxNQUFNLE9BQWdCLHlCQUF5QjtJQUM3QyxnRUFBZ0U7SUFDaEUsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxJQUFZO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLHNFQUFzRTtRQUN0RSxnRkFBZ0Y7UUFDaEYsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQVdELFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBTGpDLHVCQUFrQixHQUFvQixFQUFFLENBQUM7SUFLTCxDQUFDO0lBRS9DLFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGVBQTJCLENBQUM7UUFDL0QsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWU7UUFDYixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsRUFBRSxPQUFPLENBQUM7UUFDOUgsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNwRCxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBQ08sdUJBQXVCLENBQUMsR0FBRyxTQUFxQjtRQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGdCQUFnQixDQUFDLFNBQTJCO1FBQzFDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDbkUsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQ2xILE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqRSxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNsRyxJQUFJLDBCQUEwQixLQUFLLENBQUMsQ0FBQyxJQUFJLHFCQUFxQixLQUFLLENBQUMsQ0FBQyxJQUFJLDBCQUEwQixLQUFLLHFCQUFxQixFQUFFLENBQUM7Z0JBQzlILFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDbkIsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDOUQsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFDSCxDQUFDO0lBRUQseUVBQXlFO0lBQ2pFLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDdkQsQ0FBQztJQUNILENBQUM7K0dBckZtQix5QkFBeUI7bUdBQXpCLHlCQUF5Qiw4RkFtQmxDLHFCQUFxQixzRkFDbEIsZUFBZTs7NEZBcEJULHlCQUF5QjtrQkFEOUMsU0FBUztxRkFJSixJQUFJO3NCQURQLEtBQUs7Z0JBaUI4QyxRQUFRO3NCQUEzRCxTQUFTO3VCQUFDLHFCQUFxQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDbkIsa0JBQWtCO3NCQUFoRCxZQUFZO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xOYW1lLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgTm92b0NvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci5kaXJlY3RpdmVzJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8qKiBDb2x1bW4gbmFtZSB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIHJlZmVyZW5jZSB0aGlzIGNvbHVtbi4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAvLyBXaXRoIEl2eSwgaW5wdXRzIGNhbiBiZSBpbml0aWFsaXplZCBiZWZvcmUgc3RhdGljIHF1ZXJ5IHJlc3VsdHMgYXJlXG4gICAgLy8gYXZhaWxhYmxlLiBJbiB0aGF0IGNhc2UsIHdlIGRlZmVyIHRoZSBzeW5jaHJvbml6YXRpb24gdW50aWwgXCJuZ09uSW5pdFwiIGZpcmVzLlxuICAgIHRoaXMuX3N5bmNGaWVsZERlZk5hbWUoKTtcbiAgfVxuICBfbmFtZTogc3RyaW5nO1xuXG4gIGRlZmF1bHRPcGVyYXRvcjogT3BlcmF0b3IgfCBzdHJpbmc7XG4gIHByb3RlY3RlZCBfcHJldmlvdXNPcGVyYXRvclZhbHVlOiBPcGVyYXRvcjtcblxuICBwcm90ZWN0ZWQgb3BlcmF0b3JFZGl0R3JvdXBzOiBTZXQ8T3BlcmF0b3I+W10gPSBbXTtcblxuICBAVmlld0NoaWxkKE5vdm9Db25kaXRpb25GaWVsZERlZiwgeyBzdGF0aWM6IHRydWUgfSkgZmllbGREZWY6IE5vdm9Db25kaXRpb25GaWVsZERlZjtcbiAgQFZpZXdDaGlsZHJlbihGb3JtQ29udHJvbE5hbWUpIGZvcm1Db250cm9sc0J5TmFtZTogUXVlcnlMaXN0PEZvcm1Db250cm9sTmFtZT47XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9zeW5jRmllbGREZWZOYW1lKCk7XG4gICAgdGhpcy5fc3luY0ZpZWxkRGVmT3BlcmF0b3JWYWx1ZSgpO1xuICAgIHRoaXMuX3ByZXZpb3VzT3BlcmF0b3JWYWx1ZSA9IHRoaXMuZGVmYXVsdE9wZXJhdG9yIGFzIE9wZXJhdG9yO1xuICAgIC8vIE5lZWQgdG8gYWRkIHNlbGYgdG8gRmlsdGVyQnVpbGRlciBiZWNhdXNlIFwiQ29udGVudENoaWxkcmVuIHdvbid0IGZpbmQgaXRcIlxuICAgIHRoaXMuZmllbGREZWY/LnJlZ2lzdGVyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmZyYW1lQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnJhbWVBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IG9wZXJhdG9yRmllbGQgPSB0aGlzLmZvcm1Db250cm9sc0J5TmFtZS5maW5kKGZvcm1Db250cm9sRGlyZWN0aXZlID0+IGZvcm1Db250cm9sRGlyZWN0aXZlLm5hbWUgPT09ICdvcGVyYXRvcicpPy5jb250cm9sO1xuICAgIGlmIChvcGVyYXRvckZpZWxkKSB7XG4gICAgICB0aGlzLl9wcmV2aW91c09wZXJhdG9yVmFsdWUgPSBvcGVyYXRvckZpZWxkLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZmllbGREZWY/LnVucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgYW4gZWRpdCBncm91cCBvZiBvcGVyYXRvcnMuIE9uY2UgZGVmaW5lZCwgaWYgdGhlIHVzZXIgc3dpdGNoZXMgZnJvbSBvbmUgb2YgdGhlc2Ugb3BlcmF0b3JzIHRvIGFub3RoZXIsXG4gICAqIHRoZW4gdGhlIGNvbmRpdGlvbiB2YWx1ZSB3aWxsIG5vdCBiZSBjbGVhcmVkLiBUaGlzIG1ha2VzIHNlbnNlIGlmIGJvdGggb3BlcmF0b3JzIHVzZSB0aGUgc2FtZSBVSSBjb250cm9scyBmb3IgZWRpdGluZy5cbiAgICogQHBhcmFtIG9wZXJhdG9ycyBUaGUgc2V0IG9mIE9wZXJhdG9yIHZhbHVlcyBpbnRlbmRlZCB0byBzaGFyZSBVSSBjb250cm9scy5cbiAgICovXG4gIHByb3RlY3RlZCBkZWZpbmVPcGVyYXRvckVkaXRHcm91cCguLi5vcGVyYXRvcnM6IE9wZXJhdG9yW10pOiB2b2lkIHtcbiAgICB0aGlzLm9wZXJhdG9yRWRpdEdyb3Vwcy5wdXNoKG5ldyBTZXQob3BlcmF0b3JzKSk7XG4gIH1cblxuICBvbk9wZXJhdG9yU2VsZWN0KGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIGxldCBjbGVhclZhbCA9IHRydWU7XG4gICAgaWYgKHRoaXMuX3ByZXZpb3VzT3BlcmF0b3JWYWx1ZSAmJiB0aGlzLm9wZXJhdG9yRWRpdEdyb3Vwcz8ubGVuZ3RoKSB7XG4gICAgICBjb25zdCBwcmV2aW91c09wZXJhdG9yR3JvdXBJbmRleCA9IHRoaXMub3BlcmF0b3JFZGl0R3JvdXBzLmZpbmRJbmRleChncnAgPT4gZ3JwLmhhcyh0aGlzLl9wcmV2aW91c09wZXJhdG9yVmFsdWUpKTtcbiAgICAgIGNvbnN0IG5ld09wZXJhdG9yVmFsdWUgPSBmb3JtR3JvdXAuZ2V0KCdvcGVyYXRvcicpLmdldFJhd1ZhbHVlKCk7XG4gICAgICBjb25zdCBuZXdPcGVyYXRvckdyb3VwSW5kZXggPSB0aGlzLm9wZXJhdG9yRWRpdEdyb3Vwcy5maW5kSW5kZXgoZ3JwID0+IGdycC5oYXMobmV3T3BlcmF0b3JWYWx1ZSkpO1xuICAgICAgaWYgKHByZXZpb3VzT3BlcmF0b3JHcm91cEluZGV4ICE9PSAtMSAmJiBuZXdPcGVyYXRvckdyb3VwSW5kZXggIT09IC0xICYmIHByZXZpb3VzT3BlcmF0b3JHcm91cEluZGV4ID09PSBuZXdPcGVyYXRvckdyb3VwSW5kZXgpIHtcbiAgICAgICAgY2xlYXJWYWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcHJldmlvdXNPcGVyYXRvclZhbHVlID0gZm9ybUdyb3VwLmdldCgnb3BlcmF0b3InKS52YWx1ZTtcbiAgICBpZiAoY2xlYXJWYWwpIHtcbiAgICAgIGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykuc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFN5bmNocm9uaXplcyB0aGUgY29sdW1uIGRlZmluaXRpb24gbmFtZSB3aXRoIHRoZSB0ZXh0IGNvbHVtbiBuYW1lLiAqL1xuICBwcml2YXRlIF9zeW5jRmllbGREZWZOYW1lKCkge1xuICAgIGlmICh0aGlzLmZpZWxkRGVmKSB7XG4gICAgICB0aGlzLmZpZWxkRGVmLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc3luY0ZpZWxkRGVmT3BlcmF0b3JWYWx1ZSgpIHtcbiAgICBpZiAodGhpcy5maWVsZERlZikge1xuICAgICAgdGhpcy5maWVsZERlZi5kZWZhdWx0T3BlcmF0b3IgPSB0aGlzLmRlZmF1bHRPcGVyYXRvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==