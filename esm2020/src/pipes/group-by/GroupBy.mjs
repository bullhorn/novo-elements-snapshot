import { Pipe } from '@angular/core';
import { can, Helpers } from '../../utils/Helpers';
import * as i0 from "@angular/core";
export class GroupByPipe {
    transform(input, prop) {
        if (!Array.isArray(input)) {
            return input;
        }
        const arr = {};
        for (const value of input) {
            const field = can(value).have(prop);
            if (Helpers.isBlank(arr[field])) {
                arr[field] = [];
            }
            arr[field].push(value);
        }
        return Object.keys(arr).map((key) => ({ key, value: arr[key] }));
    }
}
GroupByPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: GroupByPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
GroupByPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: GroupByPipe, name: "groupBy" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: GroupByPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'groupBy',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBCeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL3BpcGVzL2dyb3VwLWJ5L0dyb3VwQnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFLbkQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsU0FBUyxDQUFDLEtBQVUsRUFBRSxJQUFZO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLEdBQUcsR0FBa0MsRUFBRSxDQUFDO1FBRTlDLEtBQUssTUFBTSxLQUFLLElBQUksS0FBSyxFQUFFO1lBQ3pCLE1BQU0sS0FBSyxHQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2pCO1lBRUQsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtRQUVELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDOzt3R0FsQlUsV0FBVztzR0FBWCxXQUFXOzJGQUFYLFdBQVc7a0JBSHZCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFNBQVM7aUJBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY2FuLCBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2dyb3VwQnknLFxufSlcbmV4cG9ydCBjbGFzcyBHcm91cEJ5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSwgcHJvcDogc3RyaW5nKTogQXJyYXk8YW55PiB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIGNvbnN0IGFycjogeyBba2V5OiBzdHJpbmddOiBBcnJheTxhbnk+IH0gPSB7fTtcblxuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgaW5wdXQpIHtcbiAgICAgIGNvbnN0IGZpZWxkOiBhbnkgPSBjYW4odmFsdWUpLmhhdmUocHJvcCk7XG4gICAgICBpZiAoSGVscGVycy5pc0JsYW5rKGFycltmaWVsZF0pKSB7XG4gICAgICAgIGFycltmaWVsZF0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgYXJyW2ZpZWxkXS5wdXNoKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoYXJyKS5tYXAoKGtleSkgPT4gKHsga2V5LCB2YWx1ZTogYXJyW2tleV0gfSkpO1xuICB9XG59XG4iXX0=