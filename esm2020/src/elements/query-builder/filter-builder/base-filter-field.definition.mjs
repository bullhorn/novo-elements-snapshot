import { ContentChild, Directive, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { NOVO_FILTER_BUILDER } from '../query-builder.tokens';
import * as i0 from "@angular/core";
/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
export class NovoFilterFieldInputDef {
    constructor(/** @docs-private */ template) {
        this.template = template;
    }
}
NovoFilterFieldInputDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFilterFieldInputDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoFilterFieldInputDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: NovoFilterFieldInputDef, selector: "[novoFilterFieldInputDef]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFilterFieldInputDef, decorators: [{
            type: Directive,
            args: [{ selector: '[novoFilterFieldInputDef]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
export class NovoFilterFieldOperatorsDef {
    constructor(/** @docs-private */ template) {
        this.template = template;
    }
}
NovoFilterFieldOperatorsDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFilterFieldOperatorsDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoFilterFieldOperatorsDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: NovoFilterFieldOperatorsDef, selector: "[novoFilterFieldOperatorsDef]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFilterFieldOperatorsDef, decorators: [{
            type: Directive,
            args: [{ selector: '[novoFilterFieldOperatorsDef]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
export class BaseFilterFieldDef {
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
BaseFilterFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: BaseFilterFieldDef, deps: [], target: i0.ɵɵFactoryTarget.Directive });
BaseFilterFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: BaseFilterFieldDef, inputs: { name: ["novoFilterFieldDef", "name"] }, queries: [{ propertyName: "fieldInput", first: true, predicate: NovoFilterFieldInputDef, descendants: true }, { propertyName: "fieldOperators", first: true, predicate: NovoFilterFieldOperatorsDef, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: BaseFilterFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: function () { return []; }, propDecorators: { name: [{
                type: Input,
                args: ['novoFilterFieldDef']
            }], fieldInput: [{
                type: ContentChild,
                args: [NovoFilterFieldInputDef]
            }], fieldOperators: [{
                type: ContentChild,
                args: [NovoFilterFieldOperatorsDef]
            }] } });
export class NovoFilterFieldDef extends BaseFilterFieldDef {
    constructor(_filterBuilder) {
        super();
        this._filterBuilder = _filterBuilder;
    }
}
NovoFilterFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFilterFieldDef, deps: [{ token: NOVO_FILTER_BUILDER, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NovoFilterFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: NovoFilterFieldDef, selector: "[novoFilterFieldDef]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFilterFieldDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoFilterFieldDef]',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_FILTER_BUILDER]
                }, {
                    type: Optional
                }] }]; } });
export class NovoFilterFieldTypeDef extends BaseFilterFieldDef {
    constructor(_filterBuilder) {
        super();
        this._filterBuilder = _filterBuilder;
    }
}
NovoFilterFieldTypeDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFilterFieldTypeDef, deps: [{ token: NOVO_FILTER_BUILDER, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NovoFilterFieldTypeDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: NovoFilterFieldTypeDef, selector: "[novoFilterFieldTypeDef]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFilterFieldTypeDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoFilterFieldTypeDef]',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_FILTER_BUILDER]
                }, {
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWx0ZXItZmllbGQuZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvZmlsdGVyLWJ1aWxkZXIvYmFzZS1maWx0ZXItZmllbGQuZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBTzlEOzs7R0FHRztBQUVILE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBWSxvQkFBb0IsQ0FBUSxRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7O29IQUQzRCx1QkFBdUI7d0dBQXZCLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQURuQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLDJCQUEyQixFQUFFOztBQUtwRDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sMkJBQTJCO0lBQ3RDLFlBQVksb0JBQW9CLENBQVEsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDOzt3SEFEM0QsMkJBQTJCOzRHQUEzQiwyQkFBMkI7MkZBQTNCLDJCQUEyQjtrQkFEdkMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSwrQkFBK0IsRUFBRTs7QUFLeEQ7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGtCQUFrQjtJQXdCN0IsZ0JBQWUsQ0FBQztJQXZCaEIsa0NBQWtDO0lBQ2xDLElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFrQkQ7Ozs7OztPQU1HO0lBQ08sd0JBQXdCO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLHFCQUFxQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLGFBQWEsQ0FBQyxLQUFhO1FBQ25DLDJGQUEyRjtRQUMzRix3RkFBd0Y7UUFDeEYsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzsrR0FuRFUsa0JBQWtCO21HQUFsQixrQkFBa0Isb0hBV2YsdUJBQXVCLGlGQUN2QiwyQkFBMkI7MkZBWjlCLGtCQUFrQjtrQkFEOUIsU0FBUzswRUFJSixJQUFJO3NCQURQLEtBQUs7dUJBQUMsb0JBQW9CO2dCQVNZLFVBQVU7c0JBQWhELFlBQVk7dUJBQUMsdUJBQXVCO2dCQUNNLGNBQWM7c0JBQXhELFlBQVk7dUJBQUMsMkJBQTJCOztBQTZDM0MsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGtCQUFrQjtJQUN4RCxZQUE0RCxjQUFvQjtRQUM5RSxLQUFLLEVBQUUsQ0FBQztRQURrRCxtQkFBYyxHQUFkLGNBQWMsQ0FBTTtJQUVoRixDQUFDOzsrR0FIVSxrQkFBa0Isa0JBQ1QsbUJBQW1CO21HQUQ1QixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFIOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs7MEJBRWMsTUFBTTsyQkFBQyxtQkFBbUI7OzBCQUFHLFFBQVE7O0FBUXBELE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxrQkFBa0I7SUFDNUQsWUFBNEQsY0FBb0I7UUFDOUUsS0FBSyxFQUFFLENBQUM7UUFEa0QsbUJBQWMsR0FBZCxjQUFjLENBQU07SUFFaEYsQ0FBQzs7bUhBSFUsc0JBQXNCLGtCQUNiLG1CQUFtQjt1R0FENUIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBSGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtpQkFDckM7OzBCQUVjLE1BQU07MkJBQUMsbUJBQW1COzswQkFBRyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGVudENoaWxkLCBEaXJlY3RpdmUsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTk9WT19GSUxURVJfQlVJTERFUiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudG9rZW5zJztcblxuLyoqIEJhc2UgaW50ZXJmYWNlIGZvciBhIGNlbGwgZGVmaW5pdGlvbi4gQ2FwdHVyZXMgYSBjb2x1bW4ncyBjZWxsIHRlbXBsYXRlIGRlZmluaXRpb24uICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckZpZWxkRGVmIHtcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG5cbi8qKlxuICogQ2VsbCBkZWZpbml0aW9uIGZvciBhIENESyB0YWJsZS5cbiAqIENhcHR1cmVzIHRoZSB0ZW1wbGF0ZSBvZiBhIGNvbHVtbidzIGRhdGEgcm93IGNlbGwgYXMgd2VsbCBhcyBjZWxsLXNwZWNpZmljIHByb3BlcnRpZXMuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tub3ZvRmlsdGVyRmllbGRJbnB1dERlZl0nIH0pXG5leHBvcnQgY2xhc3MgTm92b0ZpbHRlckZpZWxkSW5wdXREZWYgaW1wbGVtZW50cyBGaWx0ZXJGaWVsZERlZiB7XG4gIGNvbnN0cnVjdG9yKC8qKiBAZG9jcy1wcml2YXRlICovIHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBDZWxsIGRlZmluaXRpb24gZm9yIGEgQ0RLIHRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIHRlbXBsYXRlIG9mIGEgY29sdW1uJ3MgZGF0YSByb3cgY2VsbCBhcyB3ZWxsIGFzIGNlbGwtc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25vdm9GaWx0ZXJGaWVsZE9wZXJhdG9yc0RlZl0nIH0pXG5leHBvcnQgY2xhc3MgTm92b0ZpbHRlckZpZWxkT3BlcmF0b3JzRGVmIGltcGxlbWVudHMgRmlsdGVyRmllbGREZWYge1xuICBjb25zdHJ1Y3RvcigvKiogQGRvY3MtcHJpdmF0ZSAqLyBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogRmllbGQgRmllbGQgZGVmaW5pdGlvbiBmb3IgdGhlIFF1ZXJ5QnVpbGRlci5cbiAqIERlZmluZXMgdGhlIGlucHV0VHlwZSBhbmQgb3BlcmF0b3JzIHRvIHVzZSBmb3IgdGhlIHF1ZXJ5IGJ1aWxkZXIuXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEJhc2VGaWx0ZXJGaWVsZERlZiB7XG4gIC8qKiBVbmlxdWUgbmFtZSBmb3IgdGhpcyBmaWVsZC4gKi9cbiAgQElucHV0KCdub3ZvRmlsdGVyRmllbGREZWYnKVxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIHNldCBuYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3NldE5hbWVJbnB1dChuYW1lKTtcbiAgfVxuICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkKE5vdm9GaWx0ZXJGaWVsZElucHV0RGVmKSBmaWVsZElucHV0OiBOb3ZvRmlsdGVyRmllbGRJbnB1dERlZjtcbiAgQENvbnRlbnRDaGlsZChOb3ZvRmlsdGVyRmllbGRPcGVyYXRvcnNEZWYpIGZpZWxkT3BlcmF0b3JzOiBOb3ZvRmlsdGVyRmllbGRPcGVyYXRvcnNEZWY7XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybWVkIHZlcnNpb24gb2YgdGhlIGNvbHVtbiBuYW1lIHRoYXQgY2FuIGJlIHVzZWQgYXMgcGFydCBvZiBhIENTUyBjbGFzc25hbWUuIEV4Y2x1ZGVzXG4gICAqIGFsbCBub24tYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgYW5kIHRoZSBzcGVjaWFsIGNoYXJhY3RlcnMgJy0nIGFuZCAnXycuIEFueSBjaGFyYWN0ZXJzIHRoYXRcbiAgICogZG8gbm90IG1hdGNoIGFyZSByZXBsYWNlZCBieSB0aGUgJy0nIGNoYXJhY3Rlci5cbiAgICovXG4gIGNzc0NsYXNzRnJpZW5kbHlOYW1lOiBzdHJpbmc7XG4gIF9maWVsZENzc0NsYXNzTmFtZTogc3RyaW5nW107XG5cbiAgZGVmYXVsdE9wZXJhdG9yOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBPdmVycmlkYWJsZSBtZXRob2QgdGhhdCBzZXRzIHRoZSBjc3MgY2xhc3NlcyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gZXZlcnkgY2VsbCBpbiB0aGlzXG4gICAqIGNvbHVtbi5cbiAgICogSW4gdGhlIGZ1dHVyZSwgY29sdW1uQ3NzQ2xhc3NOYW1lIHdpbGwgY2hhbmdlIGZyb20gdHlwZSBzdHJpbmdbXSB0byBzdHJpbmcgYW5kIHRoaXNcbiAgICogd2lsbCBzZXQgYSBzaW5nbGUgc3RyaW5nIHZhbHVlLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3VwZGF0ZUZpZWxkQ3NzQ2xhc3NOYW1lKCkge1xuICAgIHRoaXMuX2ZpZWxkQ3NzQ2xhc3NOYW1lID0gW2Bub3ZvLWZpbHRlci1maWVsZC0ke3RoaXMuY3NzQ2xhc3NGcmllbmRseU5hbWV9YF07XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBoYXMgYmVlbiBleHRyYWN0ZWQgdG8gYSB1dGlsIGJlY2F1c2Ugb2YgVFMgNCBhbmQgVkUuXG4gICAqIFZpZXcgRW5naW5lIGRvZXNuJ3Qgc3VwcG9ydCBwcm9wZXJ0eSByZW5hbWUgaW5oZXJpdGFuY2UuXG4gICAqIFRTIDQuMCBkb2Vzbid0IGFsbG93IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgYWNjZXNzb3JzIG9yIHZpY2UtdmVyc2EuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByb3RlY3RlZCBfc2V0TmFtZUlucHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyBJZiB0aGUgZGlyZWN0aXZlIGlzIHNldCB3aXRob3V0IGEgbmFtZSAodXBkYXRlZCBwcm9ncmFtbWF0aWNhbGx5KSwgdGhlbiB0aGlzIHNldHRlciB3aWxsXG4gICAgLy8gdHJpZ2dlciB3aXRoIGFuIGVtcHR5IHN0cmluZyBhbmQgc2hvdWxkIG5vdCBvdmVyd3JpdGUgdGhlIHByb2dyYW1tYXRpY2FsbHkgc2V0IHZhbHVlLlxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jc3NDbGFzc0ZyaWVuZGx5TmFtZSA9IHZhbHVlLnJlcGxhY2UoL1teYS16MC05Xy1dL2dpLCAnLScpO1xuICAgICAgdGhpcy5fdXBkYXRlRmllbGRDc3NDbGFzc05hbWUoKTtcbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9GaWx0ZXJGaWVsZERlZl0nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRmlsdGVyRmllbGREZWYgZXh0ZW5kcyBCYXNlRmlsdGVyRmllbGREZWYge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5PVk9fRklMVEVSX0JVSUxERVIpIEBPcHRpb25hbCgpIHB1YmxpYyBfZmlsdGVyQnVpbGRlcj86IGFueSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9GaWx0ZXJGaWVsZFR5cGVEZWZdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ZpbHRlckZpZWxkVHlwZURlZiBleHRlbmRzIEJhc2VGaWx0ZXJGaWVsZERlZiB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTk9WT19GSUxURVJfQlVJTERFUikgQE9wdGlvbmFsKCkgcHVibGljIF9maWx0ZXJCdWlsZGVyPzogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19