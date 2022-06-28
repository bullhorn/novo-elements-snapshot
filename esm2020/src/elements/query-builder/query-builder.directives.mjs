import { ContentChild, Directive, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { NOVO_CRITERIA_BUILDER } from './query-builder.tokens';
import * as i0 from "@angular/core";
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
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
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
    constructor(criteriaBuilder) {
        super();
        this.criteriaBuilder = criteriaBuilder;
    }
    register() {
        this.criteriaBuilder.addFieldDef(this);
    }
    unregister() {
        this.criteriaBuilder.removeFieldDef(this);
    }
}
NovoConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionFieldDef, deps: [{ token: NOVO_CRITERIA_BUILDER, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionFieldDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoConditionFieldDef]',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_CRITERIA_BUILDER]
                }, {
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9xdWVyeS1idWlsZGVyLmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQU8vRDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQVksb0JBQW9CLENBQVEsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDOzttSEFEM0QscUJBQXFCO3VHQUFyQixxQkFBcUI7NEZBQXJCLHFCQUFxQjtrQkFEakMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSx5QkFBeUIsRUFBRTs7QUFLbEQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQVksb0JBQW9CLENBQVEsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDOzt1SEFEM0QseUJBQXlCOzJHQUF6Qix5QkFBeUI7NEZBQXpCLHlCQUF5QjtrQkFEckMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSw2QkFBNkIsRUFBRTs7QUFLdEQ7OztHQUdHO0FBRUgsTUFBTSxPQUFPLHFCQUFxQjtJQXdCaEMsZ0JBQWUsQ0FBQztJQXZCaEIsa0NBQWtDO0lBQ2xDLElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFrQkQ7Ozs7OztPQU1HO0lBQ08sd0JBQXdCO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLHFCQUFxQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLGFBQWEsQ0FBQyxLQUFhO1FBQ25DLDJGQUEyRjtRQUMzRix3RkFBd0Y7UUFDeEYsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzttSEFuRFUscUJBQXFCO3VHQUFyQixxQkFBcUIsb0hBV2xCLHFCQUFxQixpRkFDckIseUJBQXlCOzRGQVo1QixxQkFBcUI7a0JBRGpDLFNBQVM7MEVBSUosSUFBSTtzQkFEUCxLQUFLO3VCQUFDLG9CQUFvQjtnQkFTVSxVQUFVO3NCQUE5QyxZQUFZO3VCQUFDLHFCQUFxQjtnQkFDTSxjQUFjO3NCQUF0RCxZQUFZO3VCQUFDLHlCQUF5Qjs7QUE2Q3pDLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxxQkFBcUI7SUFDOUQsWUFBOEQsZUFBcUI7UUFDakYsS0FBSyxFQUFFLENBQUM7UUFEb0Qsb0JBQWUsR0FBZixlQUFlLENBQU07SUFFbkYsQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsVUFBVTtRQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7O21IQVRVLHFCQUFxQixrQkFDWixxQkFBcUI7dUdBRDlCLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQUhqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7aUJBQ3BDOzswQkFFYyxNQUFNOzJCQUFDLHFCQUFxQjs7MEJBQUcsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDaGlsZCwgRGlyZWN0aXZlLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiB9IGZyb20gJy4vcXVlcnktYnVpbGRlci50b2tlbnMnO1xuXG4vKiogQmFzZSBpbnRlcmZhY2UgZm9yIGEgY29uZGlkYXRpb24gdGVtcGxhdGUgZGlyZWN0aXZlcy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZGl0aW9uRGVmIHtcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG5cbi8qKlxuICogQ29udGFpbmVkIHdpdGhpbiBhIG5vdm9Db25kaXRpb25GaWVsZCBkZWZpbml0aW9uIGRlc2NyaWJpbmcgd2hhdCBpbnB1dCBzaG91bGQgYmVcbiAqIHVzZWQgdG8gY2FwdHVyZSB0aGUgY29tcGFyZSB2YWx1ZSBvZiB0aGUgQ29uZHRpb25cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25vdm9Db25kaXRpb25JbnB1dERlZl0nIH0pXG5leHBvcnQgY2xhc3MgTm92b0NvbmRpdGlvbklucHV0RGVmIGltcGxlbWVudHMgQ29uZGl0aW9uRGVmIHtcbiAgY29uc3RydWN0b3IoLyoqIEBkb2NzLXByaXZhdGUgKi8gcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIENvbnRhaW5lZCB3aXRoaW4gYSBub3ZvQ29uZGl0aW9uRmllbGQgZGVmaW5pdGlvbiBkZXNjcmliaW5nIHdoYXQgb3BlcmF0b3JzIHNob3VsZCBiZSBhdmFpbGFibGUuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tub3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmXScgfSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmIGltcGxlbWVudHMgQ29uZGl0aW9uRGVmIHtcbiAgY29uc3RydWN0b3IoLyoqIEBkb2NzLXByaXZhdGUgKi8gcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIEZpZWxkIEZpZWxkIGRlZmluaXRpb24gZm9yIHRoZSBRdWVyeUJ1aWxkZXIuXG4gKiBEZWZpbmVzIHRoZSBpbnB1dFR5cGUgYW5kIG9wZXJhdG9ycyB0byB1c2UgZm9yIHRoZSBxdWVyeSBidWlsZGVyLlxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBCYXNlQ29uZGl0aW9uRmllbGREZWYge1xuICAvKiogVW5pcXVlIG5hbWUgZm9yIHRoaXMgZmllbGQuICovXG4gIEBJbnB1dCgnbm92b0ZpbHRlckZpZWxkRGVmJylcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zZXROYW1lSW5wdXQobmFtZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChOb3ZvQ29uZGl0aW9uSW5wdXREZWYpIGZpZWxkSW5wdXQ6IE5vdm9Db25kaXRpb25JbnB1dERlZjtcbiAgQENvbnRlbnRDaGlsZChOb3ZvQ29uZGl0aW9uT3BlcmF0b3JzRGVmKSBmaWVsZE9wZXJhdG9yczogTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZjtcblxuICAvKipcbiAgICogVHJhbnNmb3JtZWQgdmVyc2lvbiBvZiB0aGUgY29sdW1uIG5hbWUgdGhhdCBjYW4gYmUgdXNlZCBhcyBwYXJ0IG9mIGEgQ1NTIGNsYXNzbmFtZS4gRXhjbHVkZXNcbiAgICogYWxsIG5vbi1hbHBoYW51bWVyaWMgY2hhcmFjdGVycyBhbmQgdGhlIHNwZWNpYWwgY2hhcmFjdGVycyAnLScgYW5kICdfJy4gQW55IGNoYXJhY3RlcnMgdGhhdFxuICAgKiBkbyBub3QgbWF0Y2ggYXJlIHJlcGxhY2VkIGJ5IHRoZSAnLScgY2hhcmFjdGVyLlxuICAgKi9cbiAgY3NzQ2xhc3NGcmllbmRseU5hbWU6IHN0cmluZztcbiAgX2ZpZWxkQ3NzQ2xhc3NOYW1lOiBzdHJpbmdbXTtcblxuICBkZWZhdWx0T3BlcmF0b3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRhYmxlIG1ldGhvZCB0aGF0IHNldHMgdGhlIGNzcyBjbGFzc2VzIHRoYXQgd2lsbCBiZSBhZGRlZCB0byBldmVyeSBjZWxsIGluIHRoaXNcbiAgICogY29sdW1uLlxuICAgKiBJbiB0aGUgZnV0dXJlLCBjb2x1bW5Dc3NDbGFzc05hbWUgd2lsbCBjaGFuZ2UgZnJvbSB0eXBlIHN0cmluZ1tdIHRvIHN0cmluZyBhbmQgdGhpc1xuICAgKiB3aWxsIHNldCBhIHNpbmdsZSBzdHJpbmcgdmFsdWUuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByb3RlY3RlZCBfdXBkYXRlRmllbGRDc3NDbGFzc05hbWUoKSB7XG4gICAgdGhpcy5fZmllbGRDc3NDbGFzc05hbWUgPSBbYG5vdm8tZmlsdGVyLWZpZWxkLSR7dGhpcy5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGhhcyBiZWVuIGV4dHJhY3RlZCB0byBhIHV0aWwgYmVjYXVzZSBvZiBUUyA0IGFuZCBWRS5cbiAgICogVmlldyBFbmdpbmUgZG9lc24ndCBzdXBwb3J0IHByb3BlcnR5IHJlbmFtZSBpbmhlcml0YW5jZS5cbiAgICogVFMgNC4wIGRvZXNuJ3QgYWxsb3cgcHJvcGVydGllcyB0byBvdmVycmlkZSBhY2Nlc3NvcnMgb3IgdmljZS12ZXJzYS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9zZXROYW1lSW5wdXQodmFsdWU6IHN0cmluZykge1xuICAgIC8vIElmIHRoZSBkaXJlY3RpdmUgaXMgc2V0IHdpdGhvdXQgYSBuYW1lICh1cGRhdGVkIHByb2dyYW1tYXRpY2FsbHkpLCB0aGVuIHRoaXMgc2V0dGVyIHdpbGxcbiAgICAvLyB0cmlnZ2VyIHdpdGggYW4gZW1wdHkgc3RyaW5nIGFuZCBzaG91bGQgbm90IG92ZXJ3cml0ZSB0aGUgcHJvZ3JhbW1hdGljYWxseSBzZXQgdmFsdWUuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgICB0aGlzLmNzc0NsYXNzRnJpZW5kbHlOYW1lID0gdmFsdWUucmVwbGFjZSgvW15hLXowLTlfLV0vZ2ksICctJyk7XG4gICAgICB0aGlzLl91cGRhdGVGaWVsZENzc0NsYXNzTmFtZSgpO1xuICAgIH1cbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbm92b0NvbmRpdGlvbkZpZWxkRGVmXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db25kaXRpb25GaWVsZERlZiBleHRlbmRzIEJhc2VDb25kaXRpb25GaWVsZERlZiB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTk9WT19DUklURVJJQV9CVUlMREVSKSBAT3B0aW9uYWwoKSBwdWJsaWMgY3JpdGVyaWFCdWlsZGVyPzogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICByZWdpc3RlcigpIHtcbiAgICB0aGlzLmNyaXRlcmlhQnVpbGRlci5hZGRGaWVsZERlZih0aGlzKTtcbiAgfVxuICB1bnJlZ2lzdGVyKCkge1xuICAgIHRoaXMuY3JpdGVyaWFCdWlsZGVyLnJlbW92ZUZpZWxkRGVmKHRoaXMpO1xuICB9XG59XG4iXX0=