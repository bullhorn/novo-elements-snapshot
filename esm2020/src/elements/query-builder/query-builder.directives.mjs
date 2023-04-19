import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { QueryBuilderService } from './query-builder.service';
import * as i0 from "@angular/core";
import * as i1 from "./query-builder.service";
/**
 * Contained within a novoConditionField definition describing what input should be
 * used to capture the compare value of the Condtion
 */
export class NovoConditionInputDef {
    constructor(/** @docs-private */ template) {
        this.template = template;
    }
}
NovoConditionInputDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionInputDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionInputDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoConditionInputDef, selector: "[novoConditionInputDef]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionInputDef, decorators: [{
            type: Directive,
            args: [{ selector: '[novoConditionInputDef]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * Contained within a novoConditionField definition describing what operators should be available.
 */
export class NovoConditionOperatorsDef {
    constructor(/** @docs-private */ template) {
        this.template = template;
    }
}
NovoConditionOperatorsDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionOperatorsDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionOperatorsDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionOperatorsDef, decorators: [{
            type: Directive,
            args: [{ selector: '[novoConditionOperatorsDef]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
export class BaseConditionFieldDef {
    constructor() { }
    /** Unique name for this field. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._setNameInput(name);
    }
    /**
     * Overridable method that sets the css classes that will be added to every cell in this
     * column.
     * In the future, columnCssClassName will change from type string[] to string and this
     * will set a single string value.
     * @docs-private
     */
    _updateFieldCssClassName() {
        this._fieldCssClassName = [`novo-filter-field-${this.cssClassFriendlyName}`];
    }
    _setNameInput(value) {
        // If the directive is set without a name (updated programmatically), then this setter will
        // trigger with an empty string and should not overwrite the programmatically set value.
        if (value) {
            this._name = value;
            this.cssClassFriendlyName = value.replace(/[^a-z0-9_-]/gi, '-');
            this._updateFieldCssClassName();
        }
    }
}
BaseConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BaseConditionFieldDef, deps: [], target: i0.ɵɵFactoryTarget.Directive });
BaseConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: BaseConditionFieldDef, inputs: { name: ["novoFilterFieldDef", "name"] }, queries: [{ propertyName: "fieldInput", first: true, predicate: NovoConditionInputDef, descendants: true }, { propertyName: "fieldOperators", first: true, predicate: NovoConditionOperatorsDef, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BaseConditionFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: function () { return []; }, propDecorators: { name: [{
                type: Input,
                args: ['novoFilterFieldDef']
            }], fieldInput: [{
                type: ContentChild,
                args: [NovoConditionInputDef]
            }], fieldOperators: [{
                type: ContentChild,
                args: [NovoConditionOperatorsDef]
            }] } });
export class NovoConditionFieldDef extends BaseConditionFieldDef {
    constructor(qbs) {
        super();
        this.qbs = qbs;
    }
    register() {
        this.qbs.registerFieldDef(this);
    }
    unregister() {
        this.qbs.unregisterFieldDef(this);
    }
}
NovoConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionFieldDef, deps: [{ token: i1.QueryBuilderService }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionFieldDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoConditionFieldDef]',
                }]
        }], ctorParameters: function () { return [{ type: i1.QueryBuilderService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9xdWVyeS1idWlsZGVyLmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBTzlEOzs7R0FHRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBWSxvQkFBb0IsQ0FBUSxRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7O21IQUQzRCxxQkFBcUI7dUdBQXJCLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQURqQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLHlCQUF5QixFQUFFOztBQUtsRDs7R0FFRztBQUVILE1BQU0sT0FBTyx5QkFBeUI7SUFDcEMsWUFBWSxvQkFBb0IsQ0FBUSxRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7O3VIQUQzRCx5QkFBeUI7MkdBQXpCLHlCQUF5Qjs0RkFBekIseUJBQXlCO2tCQURyQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLDZCQUE2QixFQUFFOztBQUt0RDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBd0JoQyxnQkFBZSxDQUFDO0lBdkJoQixrQ0FBa0M7SUFDbEMsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxJQUFZO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQWtCRDs7Ozs7O09BTUc7SUFDTyx3QkFBd0I7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMscUJBQXFCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVTLGFBQWEsQ0FBQyxLQUFhO1FBQ25DLDJGQUEyRjtRQUMzRix3RkFBd0Y7UUFDeEYsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzttSEE3Q1UscUJBQXFCO3VHQUFyQixxQkFBcUIsb0hBV2xCLHFCQUFxQixpRkFDckIseUJBQXlCOzRGQVo1QixxQkFBcUI7a0JBRGpDLFNBQVM7MEVBSUosSUFBSTtzQkFEUCxLQUFLO3VCQUFDLG9CQUFvQjtnQkFTVSxVQUFVO3NCQUE5QyxZQUFZO3VCQUFDLHFCQUFxQjtnQkFDTSxjQUFjO3NCQUF0RCxZQUFZO3VCQUFDLHlCQUF5Qjs7QUF1Q3pDLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxxQkFBcUI7SUFDOUQsWUFBb0IsR0FBd0I7UUFDMUMsS0FBSyxFQUFFLENBQUM7UUFEVSxRQUFHLEdBQUgsR0FBRyxDQUFxQjtJQUU1QyxDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELFVBQVU7UUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O21IQVRVLHFCQUFxQjt1R0FBckIscUJBQXFCOzRGQUFyQixxQkFBcUI7a0JBSGpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZW50Q2hpbGQsIERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi9xdWVyeS1idWlsZGVyLnNlcnZpY2UnO1xuXG4vKiogQmFzZSBpbnRlcmZhY2UgZm9yIGEgY29uZGlkYXRpb24gdGVtcGxhdGUgZGlyZWN0aXZlcy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZGl0aW9uRGVmIHtcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG5cbi8qKlxuICogQ29udGFpbmVkIHdpdGhpbiBhIG5vdm9Db25kaXRpb25GaWVsZCBkZWZpbml0aW9uIGRlc2NyaWJpbmcgd2hhdCBpbnB1dCBzaG91bGQgYmVcbiAqIHVzZWQgdG8gY2FwdHVyZSB0aGUgY29tcGFyZSB2YWx1ZSBvZiB0aGUgQ29uZHRpb25cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25vdm9Db25kaXRpb25JbnB1dERlZl0nIH0pXG5leHBvcnQgY2xhc3MgTm92b0NvbmRpdGlvbklucHV0RGVmIGltcGxlbWVudHMgQ29uZGl0aW9uRGVmIHtcbiAgY29uc3RydWN0b3IoLyoqIEBkb2NzLXByaXZhdGUgKi8gcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIENvbnRhaW5lZCB3aXRoaW4gYSBub3ZvQ29uZGl0aW9uRmllbGQgZGVmaW5pdGlvbiBkZXNjcmliaW5nIHdoYXQgb3BlcmF0b3JzIHNob3VsZCBiZSBhdmFpbGFibGUuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmXScgfSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmIGltcGxlbWVudHMgQ29uZGl0aW9uRGVmIHtcbiAgY29uc3RydWN0b3IoLyoqIEBkb2NzLXByaXZhdGUgKi8gcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIEZpZWxkIEZpZWxkIGRlZmluaXRpb24gZm9yIHRoZSBRdWVyeUJ1aWxkZXIuXG4gKiBEZWZpbmVzIHRoZSBpbnB1dFR5cGUgYW5kIG9wZXJhdG9ycyB0byB1c2UgZm9yIHRoZSBxdWVyeSBidWlsZGVyLlxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBCYXNlQ29uZGl0aW9uRmllbGREZWYge1xuICAvKiogVW5pcXVlIG5hbWUgZm9yIHRoaXMgZmllbGQuICovXG4gIEBJbnB1dCgnbm92b0ZpbHRlckZpZWxkRGVmJylcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zZXROYW1lSW5wdXQobmFtZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChOb3ZvQ29uZGl0aW9uSW5wdXREZWYpIGZpZWxkSW5wdXQ6IE5vdm9Db25kaXRpb25JbnB1dERlZjtcbiAgQENvbnRlbnRDaGlsZChOb3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmKSBmaWVsZE9wZXJhdG9yczogTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZjtcblxuICAvKipcbiAgICogVHJhbnNmb3JtZWQgdmVyc2lvbiBvZiB0aGUgY29sdW1uIG5hbWUgdGhhdCBjYW4gYmUgdXNlZCBhcyBwYXJ0IG9mIGEgQ1NTIGNsYXNzbmFtZS4gRXhjbHVkZXNcbiAgICogYWxsIG5vbi1hbHBoYW51bWVyaWMgY2hhcmFjdGVycyBhbmQgdGhlIHNwZWNpYWwgY2hhcmFjdGVycyAnLScgYW5kICdfJy4gQW55IGNoYXJhY3RlcnMgdGhhdFxuICAgKiBkbyBub3QgbWF0Y2ggYXJlIHJlcGxhY2VkIGJ5IHRoZSAnLScgY2hhcmFjdGVyLlxuICAgKi9cbiAgY3NzQ2xhc3NGcmllbmRseU5hbWU6IHN0cmluZztcbiAgX2ZpZWxkQ3NzQ2xhc3NOYW1lOiBzdHJpbmdbXTtcblxuICBkZWZhdWx0T3BlcmF0b3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRhYmxlIG1ldGhvZCB0aGF0IHNldHMgdGhlIGNzcyBjbGFzc2VzIHRoYXQgd2lsbCBiZSBhZGRlZCB0byBldmVyeSBjZWxsIGluIHRoaXNcbiAgICogY29sdW1uLlxuICAgKiBJbiB0aGUgZnV0dXJlLCBjb2x1bW5Dc3NDbGFzc05hbWUgd2lsbCBjaGFuZ2UgZnJvbSB0eXBlIHN0cmluZ1tdIHRvIHN0cmluZyBhbmQgdGhpc1xuICAgKiB3aWxsIHNldCBhIHNpbmdsZSBzdHJpbmcgdmFsdWUuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByb3RlY3RlZCBfdXBkYXRlRmllbGRDc3NDbGFzc05hbWUoKSB7XG4gICAgdGhpcy5fZmllbGRDc3NDbGFzc05hbWUgPSBbYG5vdm8tZmlsdGVyLWZpZWxkLSR7dGhpcy5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc2V0TmFtZUlucHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyBJZiB0aGUgZGlyZWN0aXZlIGlzIHNldCB3aXRob3V0IGEgbmFtZSAodXBkYXRlZCBwcm9ncmFtbWF0aWNhbGx5KSwgdGhlbiB0aGlzIHNldHRlciB3aWxsXG4gICAgLy8gdHJpZ2dlciB3aXRoIGFuIGVtcHR5IHN0cmluZyBhbmQgc2hvdWxkIG5vdCBvdmVyd3JpdGUgdGhlIHByb2dyYW1tYXRpY2FsbHkgc2V0IHZhbHVlLlxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jc3NDbGFzc0ZyaWVuZGx5TmFtZSA9IHZhbHVlLnJlcGxhY2UoL1teYS16MC05Xy1dL2dpLCAnLScpO1xuICAgICAgdGhpcy5fdXBkYXRlRmllbGRDc3NDbGFzc05hbWUoKTtcbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9Db25kaXRpb25GaWVsZERlZl0nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29uZGl0aW9uRmllbGREZWYgZXh0ZW5kcyBCYXNlQ29uZGl0aW9uRmllbGREZWYge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHFiczogUXVlcnlCdWlsZGVyU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgcmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5xYnMucmVnaXN0ZXJGaWVsZERlZih0aGlzKTtcbiAgfVxuICB1bnJlZ2lzdGVyKCkge1xuICAgIHRoaXMucWJzLnVucmVnaXN0ZXJGaWVsZERlZih0aGlzKTtcbiAgfVxufVxuIl19