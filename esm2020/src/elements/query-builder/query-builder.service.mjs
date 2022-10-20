import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoLabelService } from '../../services';
import { Conjunction } from './query-builder.types';
import * as i0 from "@angular/core";
import * as i1 from "../../services";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9xdWVyeS1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxELE9BQU8sRUFBZ0IsV0FBVyxFQUFlLE1BQU0sdUJBQXVCLENBQUM7OztBQUUvRSxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtJQUN2RCxPQUFPLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3pELENBQUMsQ0FBQztBQUdGLE1BQU0sT0FBTyxtQkFBbUI7SUFpRDlCLFlBQW9CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBaERwQyxxQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUNwRCxxQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBaUMsQ0FBQztRQUNwRTs7O1dBR0c7UUFDTSxpQkFBWSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBYW5ELGdCQUFXLEdBQW9DLGlCQUFpQixDQUFDO1FBYWpFLFlBQU8sR0FBNEMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFnQjNCLENBQUM7SUF4Q2hEOzs7T0FHRztJQUNILElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQVcsVUFBVSxDQUFDLEtBQXNDO1FBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxJQUFJLGlCQUFpQixDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUdEOzs7T0FHRztJQUNILElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBVyxNQUFNLENBQUMsS0FBOEM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNILElBQVcsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFDRCxJQUFXLGdCQUFnQixDQUFDLEtBQW9CO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBS0QscUZBQXFGO0lBQ3JGLGdCQUFnQixDQUFDLFFBQStCO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCx3RkFBd0Y7SUFDeEYsa0JBQWtCLENBQUMsUUFBK0I7UUFDaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxXQUFtQjtRQUNyQyxRQUFRLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2xELEtBQUssV0FBVyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDeEIsS0FBSyxXQUFXLENBQUMsR0FBRztnQkFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUN6QixLQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUM7WUFDckI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUMxQjtJQUNILENBQUM7O2lIQTdFVSxtQkFBbUI7cUhBQW5CLG1CQUFtQjs0RkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IEJhc2VDb25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4vcXVlcnktYnVpbGRlci5kaXJlY3RpdmVzJztcbmltcG9ydCB7IEJhc2VGaWVsZERlZiwgQ29uanVuY3Rpb24sIEZpZWxkQ29uZmlnIH0gZnJvbSAnLi9xdWVyeS1idWlsZGVyLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRFZGl0VHlwZUZuID0gKGZpZWxkOiBCYXNlRmllbGREZWYpID0+IHtcbiAgcmV0dXJuIGZpZWxkLmlucHV0VHlwZSB8fCBmaWVsZC5kYXRhVHlwZSB8fCBmaWVsZC50eXBlO1xufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1ZXJ5QnVpbGRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9jdXN0b21GaWVsZERlZnMgPSBuZXcgU2V0PEJhc2VDb25kaXRpb25GaWVsZERlZj4oKTtcbiAgcHJpdmF0ZSBfZmllbGREZWZzQnlOYW1lID0gbmV3IE1hcDxzdHJpbmcsIEJhc2VDb25kaXRpb25GaWVsZERlZj4oKTtcbiAgLyoqXG4gICAqIFdpbGwgZGlzcGF0Y2ggd2hlbiBwcm9wZXJ0aWVzIGNoYW5nZXMsIHN1YnNjcmliZSB0byB0aGlzIGlmIGNvbXBvbmVudCBzaG91bGRcbiAgICogcmUtcmVuZGVyIHdoZW4gcHJvcHMgYXJlIHVwZGF0ZWRcbiAgICovXG4gIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGRldGVybWluZSBvcGVyYXRvciBhbmQgaW5wdXQgdGVtcGxhdGVzIGZvciBhIGZpZWxkLiAgVmFsdWUgcGFzc2VkXG4gICAqIHRocm91Z2ggdGhlIGNyaXRlcmlhIGJ1aWxkZXIgSW5wdXQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGVkaXRUeXBlRm4oKTogKGZpZWxkOiBCYXNlRmllbGREZWYpID0+IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRUeXBlRm47XG4gIH1cbiAgcHVibGljIHNldCBlZGl0VHlwZUZuKHZhbHVlOiAoZmllbGQ6IEJhc2VGaWVsZERlZikgPT4gc3RyaW5nKSB7XG4gICAgdGhpcy5fZWRpdFR5cGVGbiA9IHZhbHVlID8/IGRlZmF1bHRFZGl0VHlwZUZuO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuICBwcml2YXRlIF9lZGl0VHlwZUZuOiAoZmllbGQ6IEJhc2VGaWVsZERlZikgPT4gc3RyaW5nID0gZGVmYXVsdEVkaXRUeXBlRm47XG5cbiAgLyoqXG4gICAqIFRoZSBmaWVsZCBjb25maWd1cmF0aW9uIHRvIGNvbnRyb2wgd2hpY2ggdHlwZXMgb2YgZmllbGRzIGFyZSBhdmFpbGFibGUgdG8gc2VsZWN0XG4gICAqIHdpdGhpbiB0aGUgQ29uZGl0aW9uIEJ1aWxkZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiB7IGZpZWxkczogRmllbGRDb25maWc8QmFzZUZpZWxkRGVmPltdIH0ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cbiAgcHVibGljIHNldCBjb25maWcodmFsdWU6IHsgZmllbGRzOiBGaWVsZENvbmZpZzxCYXNlRmllbGREZWY+W10gfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IHZhbHVlO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuICBwcml2YXRlIF9jb25maWc6IHsgZmllbGRzOiBGaWVsZENvbmZpZzxCYXNlRmllbGREZWY+W10gfSA9IHsgZmllbGRzOiBbXSB9O1xuXG4gIC8qKlxuICAgKiBUaGUgY29uZmlndXJhdGlvbiB0byBjb250cm9sIHdoaWNoIHR5cGVzIG9mIGNvbmp1bnRpb25zIGNhbiBiZSB1c2VkIGluIHRoZSBxdWVyeSBidWlsZGVyLlxuICAgKiBWYWx1ZSBwYXNzZWQgdGhyb3VnaCB0aGUgY3JpdGVyaWEgYnVpbGRlciBJbnB1dFxuICAgKiBlZy4gYW5kLCBvciwgbm90XG4gICAqL1xuICBwdWJsaWMgZ2V0IGFsbG93ZWRHcm91cGluZ3MoKTogQ29uanVuY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbG93ZWRHcm91cGluZ3M7XG4gIH1cbiAgcHVibGljIHNldCBhbGxvd2VkR3JvdXBpbmdzKHZhbHVlOiBDb25qdW5jdGlvbltdKSB7XG4gICAgdGhpcy5fYWxsb3dlZEdyb3VwaW5ncyA9IHZhbHVlO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuICBwcml2YXRlIF9hbGxvd2VkR3JvdXBpbmdzOiBDb25qdW5jdGlvbltdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIC8qKiBBZGRzIGEgZmllbGQgZGVmaW5pdGlvbiB0aGF0IHdhcyBub3QgaW5jbHVkZWQgYXMgcGFydCBvZiB0aGUgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgcmVnaXN0ZXJGaWVsZERlZihmaWVsZERlZjogQmFzZUNvbmRpdGlvbkZpZWxkRGVmKSB7XG4gICAgdGhpcy5fY3VzdG9tRmllbGREZWZzLmFkZChmaWVsZERlZik7XG4gICAgdGhpcy5fZmllbGREZWZzQnlOYW1lLnNldChmaWVsZERlZi5uYW1lLCBmaWVsZERlZik7XG4gIH1cblxuICAvKiogUmVtb3ZlcyBhIGZpZWxkIGRlZmluaXRpb24gdGhhdCB3YXMgbm90IGluY2x1ZGVkIGFzIHBhcnQgb2YgdGhlIGNvbnRlbnQgY2hpbGRyZW4uICovXG4gIHVucmVnaXN0ZXJGaWVsZERlZihmaWVsZERlZjogQmFzZUNvbmRpdGlvbkZpZWxkRGVmKSB7XG4gICAgdGhpcy5fY3VzdG9tRmllbGREZWZzLmRlbGV0ZShmaWVsZERlZik7XG4gICAgdGhpcy5fZmllbGREZWZzQnlOYW1lLmRlbGV0ZShmaWVsZERlZi5uYW1lKTtcbiAgfVxuXG4gIGdldEZpZWxkRGVmc0J5TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGREZWZzQnlOYW1lO1xuICB9XG5cbiAgZ2V0Q29uanVuY3Rpb25MYWJlbChjb25qdW5jdGlvbjogc3RyaW5nKSB7XG4gICAgc3dpdGNoIChjb25qdW5jdGlvbi5yZXBsYWNlKCckJywgJycpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgQ29uanVuY3Rpb24uT1I6XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVscy5vcjtcbiAgICAgIGNhc2UgQ29uanVuY3Rpb24uTk9UOlxuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbHMubm90O1xuICAgICAgY2FzZSBDb25qdW5jdGlvbi5BTkQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbHMuYW5kO1xuICAgIH1cbiAgfVxufVxuIl19