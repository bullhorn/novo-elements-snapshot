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
        this._config = { fields: [] };
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
            case Conjunction.Or:
                return this.labels.or;
            case Conjunction.Not:
                return this.labels.not;
            case Conjunction.And:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9xdWVyeS1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE9BQU8sRUFBZ0IsV0FBVyxFQUFlLE1BQU0sdUJBQXVCLENBQUM7OztBQUUvRSxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtJQUN2RCxPQUFPLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3pELENBQUMsQ0FBQztBQUdGLE1BQU0sT0FBTyxtQkFBbUI7SUFTOUI7OztPQUdHO0lBQ0gsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBVyxVQUFVLENBQUMsS0FBc0M7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLElBQUksaUJBQWlCLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBR0Q7OztPQUdHO0lBQ0gsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFXLE1BQU0sQ0FBQyxLQUE4QztRQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFHRDs7OztPQUlHO0lBQ0gsSUFBVyxnQkFBZ0I7UUFDekIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQVcsZ0JBQWdCLENBQUMsS0FBb0I7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFHRCxZQUFvQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQWhEcEMscUJBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFDcEQscUJBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQWlDLENBQUM7UUFDcEU7OztXQUdHO1FBQ00saUJBQVksR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQWFuRCxnQkFBVyxHQUFvQyxpQkFBaUIsQ0FBQztRQWFqRSxZQUFPLEdBQTRDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBZ0IzQixDQUFDO0lBRWhELHFGQUFxRjtJQUNyRixnQkFBZ0IsQ0FBQyxRQUErQjtRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsd0ZBQXdGO0lBQ3hGLGtCQUFrQixDQUFDLFFBQStCO1FBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsV0FBbUI7UUFDckMsUUFBUSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1lBQ25ELEtBQUssV0FBVyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDeEIsS0FBSyxXQUFXLENBQUMsR0FBRztnQkFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUN6QixLQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUM7WUFDckI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQzs4R0E3RVUsbUJBQW1CO2tIQUFuQixtQkFBbUI7OzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCYXNlQ29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBCYXNlRmllbGREZWYsIENvbmp1bmN0aW9uLCBGaWVsZENvbmZpZyB9IGZyb20gJy4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RWRpdFR5cGVGbiA9IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiB7XG4gIHJldHVybiBmaWVsZC5pbnB1dFR5cGUgfHwgZmllbGQuZGF0YVR5cGUgfHwgZmllbGQudHlwZTtcbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWVyeUJ1aWxkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfY3VzdG9tRmllbGREZWZzID0gbmV3IFNldDxCYXNlQ29uZGl0aW9uRmllbGREZWY+KCk7XG4gIHByaXZhdGUgX2ZpZWxkRGVmc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBCYXNlQ29uZGl0aW9uRmllbGREZWY+KCk7XG4gIC8qKlxuICAgKiBXaWxsIGRpc3BhdGNoIHdoZW4gcHJvcGVydGllcyBjaGFuZ2VzLCBzdWJzY3JpYmUgdG8gdGhpcyBpZiBjb21wb25lbnQgc2hvdWxkXG4gICAqIHJlLXJlbmRlciB3aGVuIHByb3BzIGFyZSB1cGRhdGVkXG4gICAqL1xuICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBkZXRlcm1pbmUgb3BlcmF0b3IgYW5kIGlucHV0IHRlbXBsYXRlcyBmb3IgYSBmaWVsZC4gIFZhbHVlIHBhc3NlZFxuICAgKiB0aHJvdWdoIHRoZSBjcml0ZXJpYSBidWlsZGVyIElucHV0LlxuICAgKi9cbiAgcHVibGljIGdldCBlZGl0VHlwZUZuKCk6IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9lZGl0VHlwZUZuO1xuICB9XG4gIHB1YmxpYyBzZXQgZWRpdFR5cGVGbih2YWx1ZTogKGZpZWxkOiBCYXNlRmllbGREZWYpID0+IHN0cmluZykge1xuICAgIHRoaXMuX2VkaXRUeXBlRm4gPSB2YWx1ZSA/PyBkZWZhdWx0RWRpdFR5cGVGbjtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cbiAgcHJpdmF0ZSBfZWRpdFR5cGVGbjogKGZpZWxkOiBCYXNlRmllbGREZWYpID0+IHN0cmluZyA9IGRlZmF1bHRFZGl0VHlwZUZuO1xuXG4gIC8qKlxuICAgKiBUaGUgZmllbGQgY29uZmlndXJhdGlvbiB0byBjb250cm9sIHdoaWNoIHR5cGVzIG9mIGZpZWxkcyBhcmUgYXZhaWxhYmxlIHRvIHNlbGVjdFxuICAgKiB3aXRoaW4gdGhlIENvbmRpdGlvbiBCdWlsZGVyLlxuICAgKi9cbiAgcHVibGljIGdldCBjb25maWcoKTogeyBmaWVsZHM6IEZpZWxkQ29uZmlnPEJhc2VGaWVsZERlZj5bXSB9IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG4gIHB1YmxpYyBzZXQgY29uZmlnKHZhbHVlOiB7IGZpZWxkczogRmllbGRDb25maWc8QmFzZUZpZWxkRGVmPltdIH0pIHtcbiAgICB0aGlzLl9jb25maWcgPSB2YWx1ZTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cbiAgcHJpdmF0ZSBfY29uZmlnOiB7IGZpZWxkczogRmllbGRDb25maWc8QmFzZUZpZWxkRGVmPltdIH0gPSB7IGZpZWxkczogW10gfTtcblxuICAvKipcbiAgICogVGhlIGNvbmZpZ3VyYXRpb24gdG8gY29udHJvbCB3aGljaCB0eXBlcyBvZiBjb25qdW50aW9ucyBjYW4gYmUgdXNlZCBpbiB0aGUgcXVlcnkgYnVpbGRlci5cbiAgICogVmFsdWUgcGFzc2VkIHRocm91Z2ggdGhlIGNyaXRlcmlhIGJ1aWxkZXIgSW5wdXRcbiAgICogZWcuIGFuZCwgb3IsIG5vdFxuICAgKi9cbiAgcHVibGljIGdldCBhbGxvd2VkR3JvdXBpbmdzKCk6IENvbmp1bmN0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl9hbGxvd2VkR3JvdXBpbmdzO1xuICB9XG4gIHB1YmxpYyBzZXQgYWxsb3dlZEdyb3VwaW5ncyh2YWx1ZTogQ29uanVuY3Rpb25bXSkge1xuICAgIHRoaXMuX2FsbG93ZWRHcm91cGluZ3MgPSB2YWx1ZTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cbiAgcHJpdmF0ZSBfYWxsb3dlZEdyb3VwaW5nczogQ29uanVuY3Rpb25bXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICAvKiogQWRkcyBhIGZpZWxkIGRlZmluaXRpb24gdGhhdCB3YXMgbm90IGluY2x1ZGVkIGFzIHBhcnQgb2YgdGhlIGNvbnRlbnQgY2hpbGRyZW4uICovXG4gIHJlZ2lzdGVyRmllbGREZWYoZmllbGREZWY6IEJhc2VDb25kaXRpb25GaWVsZERlZikge1xuICAgIHRoaXMuX2N1c3RvbUZpZWxkRGVmcy5hZGQoZmllbGREZWYpO1xuICAgIHRoaXMuX2ZpZWxkRGVmc0J5TmFtZS5zZXQoZmllbGREZWYubmFtZSwgZmllbGREZWYpO1xuICB9XG5cbiAgLyoqIFJlbW92ZXMgYSBmaWVsZCBkZWZpbml0aW9uIHRoYXQgd2FzIG5vdCBpbmNsdWRlZCBhcyBwYXJ0IG9mIHRoZSBjb250ZW50IGNoaWxkcmVuLiAqL1xuICB1bnJlZ2lzdGVyRmllbGREZWYoZmllbGREZWY6IEJhc2VDb25kaXRpb25GaWVsZERlZikge1xuICAgIHRoaXMuX2N1c3RvbUZpZWxkRGVmcy5kZWxldGUoZmllbGREZWYpO1xuICAgIHRoaXMuX2ZpZWxkRGVmc0J5TmFtZS5kZWxldGUoZmllbGREZWYubmFtZSk7XG4gIH1cblxuICBnZXRGaWVsZERlZnNCeU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkRGVmc0J5TmFtZTtcbiAgfVxuXG4gIGdldENvbmp1bmN0aW9uTGFiZWwoY29uanVuY3Rpb246IHN0cmluZykge1xuICAgIHN3aXRjaCAoY29uanVuY3Rpb24ucmVwbGFjZSgnJCcsICcnKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjYXNlIENvbmp1bmN0aW9uLk9yOlxuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbHMub3I7XG4gICAgICBjYXNlIENvbmp1bmN0aW9uLk5vdDpcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxzLm5vdDtcbiAgICAgIGNhc2UgQ29uanVuY3Rpb24uQW5kOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxzLmFuZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==