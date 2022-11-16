// NG2
import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import * as i0 from "@angular/core";
export class ComponentUtils {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    append(ComponentClass, location, providers, onTop) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
        const parent = location.injector;
        const index = onTop ? 0 : location.length;
        return location.createComponent(componentFactory, index, Injector.create({ providers, parent }));
    }
}
ComponentUtils.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ComponentUtils, deps: [{ token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
ComponentUtils.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ComponentUtils, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ComponentUtils, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvc2VydmljZXMvY29tcG9uZW50LXV0aWxzL2NvbXBvbmVudC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHdCQUF3QixFQUFnQixVQUFVLEVBQUUsUUFBUSxFQUEwQyxNQUFNLGVBQWUsQ0FBQzs7QUFLckksTUFBTSxPQUFPLGNBQWM7SUFDekIsWUFBbUIsd0JBQWtEO1FBQWxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFBRyxDQUFDO0lBRXpFLE1BQU0sQ0FBSSxjQUF1QixFQUFFLFFBQTBCLEVBQUUsU0FBNEIsRUFBRSxLQUFlO1FBQzFHLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9GLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDMUMsT0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRyxDQUFDOzs0R0FSVSxjQUFjO2dIQUFkLGNBQWMsY0FGYixNQUFNOzRGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIFN0YXRpY1Byb3ZpZGVyLCBUeXBlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogYHJvb3RgLFxufSlcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRVdGlsczxUID0gYW55PiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cblxuICBhcHBlbmQ8VD4oQ29tcG9uZW50Q2xhc3M6IFR5cGU8VD4sIGxvY2F0aW9uOiBWaWV3Q29udGFpbmVyUmVmLCBwcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdLCBvblRvcD86IGJvb2xlYW4pOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShDb21wb25lbnRDbGFzcyk7XG4gICAgY29uc3QgcGFyZW50ID0gbG9jYXRpb24uaW5qZWN0b3I7XG4gICAgY29uc3QgaW5kZXggPSBvblRvcCA/IDAgOiBsb2NhdGlvbi5sZW5ndGg7XG4gICAgcmV0dXJuIGxvY2F0aW9uLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5LCBpbmRleCwgSW5qZWN0b3IuY3JlYXRlKHsgcHJvdmlkZXJzLCBwYXJlbnQgfSkpO1xuICB9XG59XG4iXX0=