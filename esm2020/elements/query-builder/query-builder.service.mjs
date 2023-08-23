import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { Conjunction } from './query-builder.types';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
export const defaultEditTypeFn = (field) => {
    return field.inputType || field.dataType || field.type;
};
export class QueryBuilderService {
    constructor(labels) {
        this.labels = labels;
        this._customFieldDefs = new Set();
        this._fieldDefsByName = new Map();
        /**
         * Will dispatch when properties changes, subscribe to this if component should
         * re-render when props are updated
         */
        this.stateChanges = new Subject();
        this._editTypeFn = defaultEditTypeFn;
        this._config = { fields: [] };
    }
    /**
     * Function to determine operator and input templates for a field.  Value passed
     * through the criteria builder Input.
     */
    get editTypeFn() {
        return this._editTypeFn;
    }
    set editTypeFn(value) {
        this._editTypeFn = value ?? defaultEditTypeFn;
        this.stateChanges.next();
    }
    /**
     * The field configuration to control which types of fields are available to select
     * within the Condition Builder.
     */
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
        this.stateChanges.next();
    }
    /**
     * The configuration to control which types of conjuntions can be used in the query builder.
     * Value passed through the criteria builder Input
     * eg. and, or, not
     */
    get allowedGroupings() {
        return this._allowedGroupings;
    }
    set allowedGroupings(value) {
        this._allowedGroupings = value;
        this.stateChanges.next();
    }
    /** Adds a field definition that was not included as part of the content children. */
    registerFieldDef(fieldDef) {
        this._customFieldDefs.add(fieldDef);
        this._fieldDefsByName.set(fieldDef.name, fieldDef);
    }
    /** Removes a field definition that was not included as part of the content children. */
    unregisterFieldDef(fieldDef) {
        this._customFieldDefs.delete(fieldDef);
        this._fieldDefsByName.delete(fieldDef.name);
    }
    getFieldDefsByName() {
        return this._fieldDefsByName;
    }
    getConjunctionLabel(conjunction) {
        switch (conjunction.replace('$', '').toLowerCase()) {
            case Conjunction.OR:
                return this.labels.or;
            case Conjunction.NOT:
                return this.labels.not;
            case Conjunction.AND:
            default:
                return this.labels.and;
        }
    }
}
QueryBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: QueryBuilderService, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Injectable });
QueryBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: QueryBuilderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: QueryBuilderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9xdWVyeS1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE9BQU8sRUFBZ0IsV0FBVyxFQUFlLE1BQU0sdUJBQXVCLENBQUM7OztBQUUvRSxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtJQUN2RCxPQUFPLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3pELENBQUMsQ0FBQztBQUdGLE1BQU0sT0FBTyxtQkFBbUI7SUFpRDlCLFlBQW9CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBaERwQyxxQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUNwRCxxQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBaUMsQ0FBQztRQUNwRTs7O1dBR0c7UUFDTSxpQkFBWSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBYW5ELGdCQUFXLEdBQW9DLGlCQUFpQixDQUFDO1FBYWpFLFlBQU8sR0FBNEMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFnQjNCLENBQUM7SUF4Q2hEOzs7T0FHRztJQUNILElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQVcsVUFBVSxDQUFDLEtBQXNDO1FBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxJQUFJLGlCQUFpQixDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUdEOzs7T0FHRztJQUNILElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBVyxNQUFNLENBQUMsS0FBOEM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNILElBQVcsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFDRCxJQUFXLGdCQUFnQixDQUFDLEtBQW9CO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBS0QscUZBQXFGO0lBQ3JGLGdCQUFnQixDQUFDLFFBQStCO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCx3RkFBd0Y7SUFDeEYsa0JBQWtCLENBQUMsUUFBK0I7UUFDaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxXQUFtQjtRQUNyQyxRQUFRLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2xELEtBQUssV0FBVyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDeEIsS0FBSyxXQUFXLENBQUMsR0FBRztnQkFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUN6QixLQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUM7WUFDckI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUMxQjtJQUNILENBQUM7O2lIQTdFVSxtQkFBbUI7cUhBQW5CLG1CQUFtQjs0RkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgQmFzZUNvbmRpdGlvbkZpZWxkRGVmIH0gZnJvbSAnLi9xdWVyeS1idWlsZGVyLmRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgQmFzZUZpZWxkRGVmLCBDb25qdW5jdGlvbiwgRmllbGRDb25maWcgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEVkaXRUeXBlRm4gPSAoZmllbGQ6IEJhc2VGaWVsZERlZikgPT4ge1xuICByZXR1cm4gZmllbGQuaW5wdXRUeXBlIHx8IGZpZWxkLmRhdGFUeXBlIHx8IGZpZWxkLnR5cGU7XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVlcnlCdWlsZGVyU2VydmljZSB7XG4gIHByaXZhdGUgX2N1c3RvbUZpZWxkRGVmcyA9IG5ldyBTZXQ8QmFzZUNvbmRpdGlvbkZpZWxkRGVmPigpO1xuICBwcml2YXRlIF9maWVsZERlZnNCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgQmFzZUNvbmRpdGlvbkZpZWxkRGVmPigpO1xuICAvKipcbiAgICogV2lsbCBkaXNwYXRjaCB3aGVuIHByb3BlcnRpZXMgY2hhbmdlcywgc3Vic2NyaWJlIHRvIHRoaXMgaWYgY29tcG9uZW50IHNob3VsZFxuICAgKiByZS1yZW5kZXIgd2hlbiBwcm9wcyBhcmUgdXBkYXRlZFxuICAgKi9cbiAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIG9wZXJhdG9yIGFuZCBpbnB1dCB0ZW1wbGF0ZXMgZm9yIGEgZmllbGQuICBWYWx1ZSBwYXNzZWRcbiAgICogdGhyb3VnaCB0aGUgY3JpdGVyaWEgYnVpbGRlciBJbnB1dC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZWRpdFR5cGVGbigpOiAoZmllbGQ6IEJhc2VGaWVsZERlZikgPT4gc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdFR5cGVGbjtcbiAgfVxuICBwdWJsaWMgc2V0IGVkaXRUeXBlRm4odmFsdWU6IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiBzdHJpbmcpIHtcbiAgICB0aGlzLl9lZGl0VHlwZUZuID0gdmFsdWUgPz8gZGVmYXVsdEVkaXRUeXBlRm47XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG4gIHByaXZhdGUgX2VkaXRUeXBlRm46IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiBzdHJpbmcgPSBkZWZhdWx0RWRpdFR5cGVGbjtcblxuICAvKipcbiAgICogVGhlIGZpZWxkIGNvbmZpZ3VyYXRpb24gdG8gY29udHJvbCB3aGljaCB0eXBlcyBvZiBmaWVsZHMgYXJlIGF2YWlsYWJsZSB0byBzZWxlY3RcbiAgICogd2l0aGluIHRoZSBDb25kaXRpb24gQnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IHsgZmllbGRzOiBGaWVsZENvbmZpZzxCYXNlRmllbGREZWY+W10gfSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogeyBmaWVsZHM6IEZpZWxkQ29uZmlnPEJhc2VGaWVsZERlZj5bXSB9KSB7XG4gICAgdGhpcy5fY29uZmlnID0gdmFsdWU7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG4gIHByaXZhdGUgX2NvbmZpZzogeyBmaWVsZHM6IEZpZWxkQ29uZmlnPEJhc2VGaWVsZERlZj5bXSB9ID0geyBmaWVsZHM6IFtdIH07XG5cbiAgLyoqXG4gICAqIFRoZSBjb25maWd1cmF0aW9uIHRvIGNvbnRyb2wgd2hpY2ggdHlwZXMgb2YgY29uanVudGlvbnMgY2FuIGJlIHVzZWQgaW4gdGhlIHF1ZXJ5IGJ1aWxkZXIuXG4gICAqIFZhbHVlIHBhc3NlZCB0aHJvdWdoIHRoZSBjcml0ZXJpYSBidWlsZGVyIElucHV0XG4gICAqIGVnLiBhbmQsIG9yLCBub3RcbiAgICovXG4gIHB1YmxpYyBnZXQgYWxsb3dlZEdyb3VwaW5ncygpOiBDb25qdW5jdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsb3dlZEdyb3VwaW5ncztcbiAgfVxuICBwdWJsaWMgc2V0IGFsbG93ZWRHcm91cGluZ3ModmFsdWU6IENvbmp1bmN0aW9uW10pIHtcbiAgICB0aGlzLl9hbGxvd2VkR3JvdXBpbmdzID0gdmFsdWU7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG4gIHByaXZhdGUgX2FsbG93ZWRHcm91cGluZ3M6IENvbmp1bmN0aW9uW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgLyoqIEFkZHMgYSBmaWVsZCBkZWZpbml0aW9uIHRoYXQgd2FzIG5vdCBpbmNsdWRlZCBhcyBwYXJ0IG9mIHRoZSBjb250ZW50IGNoaWxkcmVuLiAqL1xuICByZWdpc3RlckZpZWxkRGVmKGZpZWxkRGVmOiBCYXNlQ29uZGl0aW9uRmllbGREZWYpIHtcbiAgICB0aGlzLl9jdXN0b21GaWVsZERlZnMuYWRkKGZpZWxkRGVmKTtcbiAgICB0aGlzLl9maWVsZERlZnNCeU5hbWUuc2V0KGZpZWxkRGVmLm5hbWUsIGZpZWxkRGVmKTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVzIGEgZmllbGQgZGVmaW5pdGlvbiB0aGF0IHdhcyBub3QgaW5jbHVkZWQgYXMgcGFydCBvZiB0aGUgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgdW5yZWdpc3RlckZpZWxkRGVmKGZpZWxkRGVmOiBCYXNlQ29uZGl0aW9uRmllbGREZWYpIHtcbiAgICB0aGlzLl9jdXN0b21GaWVsZERlZnMuZGVsZXRlKGZpZWxkRGVmKTtcbiAgICB0aGlzLl9maWVsZERlZnNCeU5hbWUuZGVsZXRlKGZpZWxkRGVmLm5hbWUpO1xuICB9XG5cbiAgZ2V0RmllbGREZWZzQnlOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9maWVsZERlZnNCeU5hbWU7XG4gIH1cblxuICBnZXRDb25qdW5jdGlvbkxhYmVsKGNvbmp1bmN0aW9uOiBzdHJpbmcpIHtcbiAgICBzd2l0Y2ggKGNvbmp1bmN0aW9uLnJlcGxhY2UoJyQnLCAnJykudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2FzZSBDb25qdW5jdGlvbi5PUjpcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxzLm9yO1xuICAgICAgY2FzZSBDb25qdW5jdGlvbi5OT1Q6XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVscy5ub3Q7XG4gICAgICBjYXNlIENvbmp1bmN0aW9uLkFORDpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVscy5hbmQ7XG4gICAgfVxuICB9XG59XG4iXX0=