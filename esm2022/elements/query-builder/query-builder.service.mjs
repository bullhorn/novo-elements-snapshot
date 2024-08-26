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
        this._config = {
            fields: [],
            staticFieldSelection: null
        };
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: QueryBuilderService, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: QueryBuilderService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: QueryBuilderService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.NovoLabelService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9xdWVyeS1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE9BQU8sRUFBZ0IsV0FBVyxFQUFlLE1BQU0sdUJBQXVCLENBQUM7OztBQUUvRSxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtJQUN2RCxPQUFPLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3pELENBQUMsQ0FBQztBQVFGLE1BQU0sT0FBTyxtQkFBbUI7SUFTOUI7OztPQUdHO0lBQ0gsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBVyxVQUFVLENBQUMsS0FBc0M7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLElBQUksaUJBQWlCLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBR0Q7OztPQUdHO0lBQ0gsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFXLE1BQU0sQ0FBQyxLQUF5QjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFNRDs7OztPQUlHO0lBQ0gsSUFBVyxnQkFBZ0I7UUFDekIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQVcsZ0JBQWdCLENBQUMsS0FBb0I7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFLRCxZQUFvQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQXJEcEMscUJBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFDcEQscUJBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQWlDLENBQUM7UUFDcEU7OztXQUdHO1FBQ00saUJBQVksR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQWFuRCxnQkFBVyxHQUFvQyxpQkFBaUIsQ0FBQztRQWFqRSxZQUFPLEdBQXVCO1lBQ3BDLE1BQU0sRUFBRSxFQUFFO1lBQ1Ysb0JBQW9CLEVBQUUsSUFBSTtTQUMzQixDQUFDO0lBa0I2QyxDQUFDO0lBRWhELHFGQUFxRjtJQUNyRixnQkFBZ0IsQ0FBQyxRQUErQjtRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsd0ZBQXdGO0lBQ3hGLGtCQUFrQixDQUFDLFFBQStCO1FBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsV0FBbUI7UUFDckMsUUFBUSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1lBQ25ELEtBQUssV0FBVyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDeEIsS0FBSyxXQUFXLENBQUMsR0FBRztnQkFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUN6QixLQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUM7WUFDckI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQzs4R0FsRlUsbUJBQW1CO2tIQUFuQixtQkFBbUI7OzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCYXNlQ29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBCYXNlRmllbGREZWYsIENvbmp1bmN0aW9uLCBGaWVsZENvbmZpZyB9IGZyb20gJy4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RWRpdFR5cGVGbiA9IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiB7XG4gIHJldHVybiBmaWVsZC5pbnB1dFR5cGUgfHwgZmllbGQuZGF0YVR5cGUgfHwgZmllbGQudHlwZTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlCdWlsZGVyQ29uZmlnIHtcbiAgZmllbGRzOiBGaWVsZENvbmZpZzxCYXNlRmllbGREZWY+W107XG4gIHN0YXRpY0ZpZWxkU2VsZWN0aW9uPzogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVlcnlCdWlsZGVyU2VydmljZSB7XG4gIHByaXZhdGUgX2N1c3RvbUZpZWxkRGVmcyA9IG5ldyBTZXQ8QmFzZUNvbmRpdGlvbkZpZWxkRGVmPigpO1xuICBwcml2YXRlIF9maWVsZERlZnNCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgQmFzZUNvbmRpdGlvbkZpZWxkRGVmPigpO1xuICAvKipcbiAgICogV2lsbCBkaXNwYXRjaCB3aGVuIHByb3BlcnRpZXMgY2hhbmdlcywgc3Vic2NyaWJlIHRvIHRoaXMgaWYgY29tcG9uZW50IHNob3VsZFxuICAgKiByZS1yZW5kZXIgd2hlbiBwcm9wcyBhcmUgdXBkYXRlZFxuICAgKi9cbiAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIG9wZXJhdG9yIGFuZCBpbnB1dCB0ZW1wbGF0ZXMgZm9yIGEgZmllbGQuICBWYWx1ZSBwYXNzZWRcbiAgICogdGhyb3VnaCB0aGUgY3JpdGVyaWEgYnVpbGRlciBJbnB1dC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZWRpdFR5cGVGbigpOiAoZmllbGQ6IEJhc2VGaWVsZERlZikgPT4gc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdFR5cGVGbjtcbiAgfVxuICBwdWJsaWMgc2V0IGVkaXRUeXBlRm4odmFsdWU6IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiBzdHJpbmcpIHtcbiAgICB0aGlzLl9lZGl0VHlwZUZuID0gdmFsdWUgPz8gZGVmYXVsdEVkaXRUeXBlRm47XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG4gIHByaXZhdGUgX2VkaXRUeXBlRm46IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiBzdHJpbmcgPSBkZWZhdWx0RWRpdFR5cGVGbjtcblxuICAvKipcbiAgICogVGhlIGZpZWxkIGNvbmZpZ3VyYXRpb24gdG8gY29udHJvbCB3aGljaCB0eXBlcyBvZiBmaWVsZHMgYXJlIGF2YWlsYWJsZSB0byBzZWxlY3RcbiAgICogd2l0aGluIHRoZSBDb25kaXRpb24gQnVpbGRlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IFF1ZXJ5QnVpbGRlckNvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogUXVlcnlCdWlsZGVyQ29uZmlnKSB7XG4gICAgdGhpcy5fY29uZmlnID0gdmFsdWU7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG4gIHByaXZhdGUgX2NvbmZpZzogUXVlcnlCdWlsZGVyQ29uZmlnID0ge1xuICAgIGZpZWxkczogW10sXG4gICAgc3RhdGljRmllbGRTZWxlY3Rpb246IG51bGxcbiAgfTtcblxuICAvKipcbiAgICogVGhlIGNvbmZpZ3VyYXRpb24gdG8gY29udHJvbCB3aGljaCB0eXBlcyBvZiBjb25qdW50aW9ucyBjYW4gYmUgdXNlZCBpbiB0aGUgcXVlcnkgYnVpbGRlci5cbiAgICogVmFsdWUgcGFzc2VkIHRocm91Z2ggdGhlIGNyaXRlcmlhIGJ1aWxkZXIgSW5wdXRcbiAgICogZWcuIGFuZCwgb3IsIG5vdFxuICAgKi9cbiAgcHVibGljIGdldCBhbGxvd2VkR3JvdXBpbmdzKCk6IENvbmp1bmN0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl9hbGxvd2VkR3JvdXBpbmdzO1xuICB9XG4gIHB1YmxpYyBzZXQgYWxsb3dlZEdyb3VwaW5ncyh2YWx1ZTogQ29uanVuY3Rpb25bXSkge1xuICAgIHRoaXMuX2FsbG93ZWRHcm91cGluZ3MgPSB2YWx1ZTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cbiAgcHJpdmF0ZSBfYWxsb3dlZEdyb3VwaW5nczogQ29uanVuY3Rpb25bXTtcblxuICBwdWJsaWMgY29tcG9uZW50SG9zdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIC8qKiBBZGRzIGEgZmllbGQgZGVmaW5pdGlvbiB0aGF0IHdhcyBub3QgaW5jbHVkZWQgYXMgcGFydCBvZiB0aGUgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgcmVnaXN0ZXJGaWVsZERlZihmaWVsZERlZjogQmFzZUNvbmRpdGlvbkZpZWxkRGVmKSB7XG4gICAgdGhpcy5fY3VzdG9tRmllbGREZWZzLmFkZChmaWVsZERlZik7XG4gICAgdGhpcy5fZmllbGREZWZzQnlOYW1lLnNldChmaWVsZERlZi5uYW1lLCBmaWVsZERlZik7XG4gIH1cblxuICAvKiogUmVtb3ZlcyBhIGZpZWxkIGRlZmluaXRpb24gdGhhdCB3YXMgbm90IGluY2x1ZGVkIGFzIHBhcnQgb2YgdGhlIGNvbnRlbnQgY2hpbGRyZW4uICovXG4gIHVucmVnaXN0ZXJGaWVsZERlZihmaWVsZERlZjogQmFzZUNvbmRpdGlvbkZpZWxkRGVmKSB7XG4gICAgdGhpcy5fY3VzdG9tRmllbGREZWZzLmRlbGV0ZShmaWVsZERlZik7XG4gICAgdGhpcy5fZmllbGREZWZzQnlOYW1lLmRlbGV0ZShmaWVsZERlZi5uYW1lKTtcbiAgfVxuXG4gIGdldEZpZWxkRGVmc0J5TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGREZWZzQnlOYW1lO1xuICB9XG5cbiAgZ2V0Q29uanVuY3Rpb25MYWJlbChjb25qdW5jdGlvbjogc3RyaW5nKSB7XG4gICAgc3dpdGNoIChjb25qdW5jdGlvbi5yZXBsYWNlKCckJywgJycpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgQ29uanVuY3Rpb24uT1I6XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVscy5vcjtcbiAgICAgIGNhc2UgQ29uanVuY3Rpb24uTk9UOlxuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbHMubm90O1xuICAgICAgY2FzZSBDb25qdW5jdGlvbi5BTkQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbHMuYW5kO1xuICAgIH1cbiAgfVxufVxuIl19