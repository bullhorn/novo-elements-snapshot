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
NovoConditionInputDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoConditionInputDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionInputDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NovoConditionInputDef, selector: "[novoConditionInputDef]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoConditionInputDef, decorators: [{
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
NovoConditionOperatorsDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoConditionOperatorsDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionOperatorsDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoConditionOperatorsDef, decorators: [{
            type: Directive,
            args: [{ selector: '[novoConditionOperatorsDef]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
export class BaseConditionFieldDef {
    /** Unique name for this field. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._setNameInput(name);
    }
    constructor() { }
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
BaseConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BaseConditionFieldDef, deps: [], target: i0.ɵɵFactoryTarget.Directive });
BaseConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: BaseConditionFieldDef, inputs: { name: ["novoFilterFieldDef", "name"] }, queries: [{ propertyName: "fieldInput", first: true, predicate: NovoConditionInputDef, descendants: true }, { propertyName: "fieldOperators", first: true, predicate: NovoConditionOperatorsDef, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: BaseConditionFieldDef, decorators: [{
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
NovoConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoConditionFieldDef, deps: [{ token: i1.QueryBuilderService }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoConditionFieldDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoConditionFieldDef]',
                }]
        }], ctorParameters: function () { return [{ type: i1.QueryBuilderService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9xdWVyeS1idWlsZGVyLmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBTzlEOzs7R0FHRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBWSxvQkFBb0IsQ0FBUSxRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7O21IQUQzRCxxQkFBcUI7dUdBQXJCLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQURqQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLHlCQUF5QixFQUFFOztBQUtsRDs7R0FFRztBQUVILE1BQU0sT0FBTyx5QkFBeUI7SUFDcEMsWUFBWSxvQkFBb0IsQ0FBUSxRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7O3VIQUQzRCx5QkFBeUI7MkdBQXpCLHlCQUF5Qjs0RkFBekIseUJBQXlCO2tCQURyQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLDZCQUE2QixFQUFFOztBQUt0RDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLGtDQUFrQztJQUNsQyxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBZ0JELGdCQUFlLENBQUM7SUFFaEI7Ozs7OztPQU1HO0lBQ08sd0JBQXdCO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLHFCQUFxQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFUyxhQUFhLENBQUMsS0FBYTtRQUNuQywyRkFBMkY7UUFDM0Ysd0ZBQXdGO1FBQ3hGLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7bUhBN0NVLHFCQUFxQjt1R0FBckIscUJBQXFCLG9IQVdsQixxQkFBcUIsaUZBQ3JCLHlCQUF5Qjs0RkFaNUIscUJBQXFCO2tCQURqQyxTQUFTOzBFQUlKLElBQUk7c0JBRFAsS0FBSzt1QkFBQyxvQkFBb0I7Z0JBU1UsVUFBVTtzQkFBOUMsWUFBWTt1QkFBQyxxQkFBcUI7Z0JBQ00sY0FBYztzQkFBdEQsWUFBWTt1QkFBQyx5QkFBeUI7O0FBdUN6QyxNQUFNLE9BQU8scUJBQXNCLFNBQVEscUJBQXFCO0lBQzlELFlBQW9CLEdBQXdCO1FBQzFDLEtBQUssRUFBRSxDQUFDO1FBRFUsUUFBRyxHQUFILEdBQUcsQ0FBcUI7SUFFNUMsQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzttSEFUVSxxQkFBcUI7dUdBQXJCLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQUhqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7aUJBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGVudENoaWxkLCBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUXVlcnlCdWlsZGVyU2VydmljZSB9IGZyb20gJy4vcXVlcnktYnVpbGRlci5zZXJ2aWNlJztcblxuLyoqIEJhc2UgaW50ZXJmYWNlIGZvciBhIGNvbmRpZGF0aW9uIHRlbXBsYXRlIGRpcmVjdGl2ZXMuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbmRpdGlvbkRlZiB7XG4gIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xufVxuXG4vKipcbiAqIENvbnRhaW5lZCB3aXRoaW4gYSBub3ZvQ29uZGl0aW9uRmllbGQgZGVmaW5pdGlvbiBkZXNjcmliaW5nIHdoYXQgaW5wdXQgc2hvdWxkIGJlXG4gKiB1c2VkIHRvIGNhcHR1cmUgdGhlIGNvbXBhcmUgdmFsdWUgb2YgdGhlIENvbmR0aW9uXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tub3ZvQ29uZGl0aW9uSW5wdXREZWZdJyB9KVxuZXhwb3J0IGNsYXNzIE5vdm9Db25kaXRpb25JbnB1dERlZiBpbXBsZW1lbnRzIENvbmRpdGlvbkRlZiB7XG4gIGNvbnN0cnVjdG9yKC8qKiBAZG9jcy1wcml2YXRlICovIHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBDb250YWluZWQgd2l0aGluIGEgbm92b0NvbmRpdGlvbkZpZWxkIGRlZmluaXRpb24gZGVzY3JpYmluZyB3aGF0IG9wZXJhdG9ycyBzaG91bGQgYmUgYXZhaWxhYmxlLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZl0nIH0pXG5leHBvcnQgY2xhc3MgTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZiBpbXBsZW1lbnRzIENvbmRpdGlvbkRlZiB7XG4gIGNvbnN0cnVjdG9yKC8qKiBAZG9jcy1wcml2YXRlICovIHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBGaWVsZCBGaWVsZCBkZWZpbml0aW9uIGZvciB0aGUgUXVlcnlCdWlsZGVyLlxuICogRGVmaW5lcyB0aGUgaW5wdXRUeXBlIGFuZCBvcGVyYXRvcnMgdG8gdXNlIGZvciB0aGUgcXVlcnkgYnVpbGRlci5cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQmFzZUNvbmRpdGlvbkZpZWxkRGVmIHtcbiAgLyoqIFVuaXF1ZSBuYW1lIGZvciB0aGlzIGZpZWxkLiAqL1xuICBASW5wdXQoJ25vdm9GaWx0ZXJGaWVsZERlZicpXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cbiAgc2V0IG5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2V0TmFtZUlucHV0KG5hbWUpO1xuICB9XG4gIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGQoTm92b0NvbmRpdGlvbklucHV0RGVmKSBmaWVsZElucHV0OiBOb3ZvQ29uZGl0aW9uSW5wdXREZWY7XG4gIEBDb250ZW50Q2hpbGQoTm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZikgZmllbGRPcGVyYXRvcnM6IE5vdm9Db25kaXRpb25PcGVyYXRvcnNEZWY7XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybWVkIHZlcnNpb24gb2YgdGhlIGNvbHVtbiBuYW1lIHRoYXQgY2FuIGJlIHVzZWQgYXMgcGFydCBvZiBhIENTUyBjbGFzc25hbWUuIEV4Y2x1ZGVzXG4gICAqIGFsbCBub24tYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgYW5kIHRoZSBzcGVjaWFsIGNoYXJhY3RlcnMgJy0nIGFuZCAnXycuIEFueSBjaGFyYWN0ZXJzIHRoYXRcbiAgICogZG8gbm90IG1hdGNoIGFyZSByZXBsYWNlZCBieSB0aGUgJy0nIGNoYXJhY3Rlci5cbiAgICovXG4gIGNzc0NsYXNzRnJpZW5kbHlOYW1lOiBzdHJpbmc7XG4gIF9maWVsZENzc0NsYXNzTmFtZTogc3RyaW5nW107XG5cbiAgZGVmYXVsdE9wZXJhdG9yOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBPdmVycmlkYWJsZSBtZXRob2QgdGhhdCBzZXRzIHRoZSBjc3MgY2xhc3NlcyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gZXZlcnkgY2VsbCBpbiB0aGlzXG4gICAqIGNvbHVtbi5cbiAgICogSW4gdGhlIGZ1dHVyZSwgY29sdW1uQ3NzQ2xhc3NOYW1lIHdpbGwgY2hhbmdlIGZyb20gdHlwZSBzdHJpbmdbXSB0byBzdHJpbmcgYW5kIHRoaXNcbiAgICogd2lsbCBzZXQgYSBzaW5nbGUgc3RyaW5nIHZhbHVlLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3VwZGF0ZUZpZWxkQ3NzQ2xhc3NOYW1lKCkge1xuICAgIHRoaXMuX2ZpZWxkQ3NzQ2xhc3NOYW1lID0gW2Bub3ZvLWZpbHRlci1maWVsZC0ke3RoaXMuY3NzQ2xhc3NGcmllbmRseU5hbWV9YF07XG4gIH1cblxuICBwcm90ZWN0ZWQgX3NldE5hbWVJbnB1dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gSWYgdGhlIGRpcmVjdGl2ZSBpcyBzZXQgd2l0aG91dCBhIG5hbWUgKHVwZGF0ZWQgcHJvZ3JhbW1hdGljYWxseSksIHRoZW4gdGhpcyBzZXR0ZXIgd2lsbFxuICAgIC8vIHRyaWdnZXIgd2l0aCBhbiBlbXB0eSBzdHJpbmcgYW5kIHNob3VsZCBub3Qgb3ZlcndyaXRlIHRoZSBwcm9ncmFtbWF0aWNhbGx5IHNldCB2YWx1ZS5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY3NzQ2xhc3NGcmllbmRseU5hbWUgPSB2YWx1ZS5yZXBsYWNlKC9bXmEtejAtOV8tXS9naSwgJy0nKTtcbiAgICAgIHRoaXMuX3VwZGF0ZUZpZWxkQ3NzQ2xhc3NOYW1lKCk7XG4gICAgfVxuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvQ29uZGl0aW9uRmllbGREZWZdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NvbmRpdGlvbkZpZWxkRGVmIGV4dGVuZHMgQmFzZUNvbmRpdGlvbkZpZWxkRGVmIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBxYnM6IFF1ZXJ5QnVpbGRlclNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHJlZ2lzdGVyKCkge1xuICAgIHRoaXMucWJzLnJlZ2lzdGVyRmllbGREZWYodGhpcyk7XG4gIH1cbiAgdW5yZWdpc3RlcigpIHtcbiAgICB0aGlzLnFicy51bnJlZ2lzdGVyRmllbGREZWYodGhpcyk7XG4gIH1cbn1cbiJdfQ==