import { Pipe } from '@angular/core';
import { can, Helpers } from 'novo-elements/utils';
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
GroupByPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GroupByPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
GroupByPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GroupByPipe, name: "groupBy" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GroupByPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'groupBy',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9waXBlcy9ncm91cC1ieS9ncm91cC1ieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUtuRCxNQUFNLE9BQU8sV0FBVztJQUN0QixTQUFTLENBQUMsS0FBVSxFQUFFLElBQVk7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU0sR0FBRyxHQUFrQyxFQUFFLENBQUM7UUFFOUMsS0FBSyxNQUFNLEtBQUssSUFBSSxLQUFLLEVBQUU7WUFDekIsTUFBTSxLQUFLLEdBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQy9CLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDakI7WUFFRCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7O3lHQWxCVSxXQUFXO3VHQUFYLFdBQVc7NEZBQVgsV0FBVztrQkFIdkIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsU0FBUztpQkFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjYW4sIEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQFBpcGUoe1xuICBuYW1lOiAnZ3JvdXBCeScsXG59KVxuZXhwb3J0IGNsYXNzIEdyb3VwQnlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnB1dDogYW55LCBwcm9wOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgY29uc3QgYXJyOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PGFueT4gfSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBpbnB1dCkge1xuICAgICAgY29uc3QgZmllbGQ6IGFueSA9IGNhbih2YWx1ZSkuaGF2ZShwcm9wKTtcbiAgICAgIGlmIChIZWxwZXJzLmlzQmxhbmsoYXJyW2ZpZWxkXSkpIHtcbiAgICAgICAgYXJyW2ZpZWxkXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBhcnJbZmllbGRdLnB1c2godmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhhcnIpLm1hcCgoa2V5KSA9PiAoeyBrZXksIHZhbHVlOiBhcnJba2V5XSB9KSk7XG4gIH1cbn1cbiJdfQ==