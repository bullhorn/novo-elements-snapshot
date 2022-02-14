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
GroupByPipe.ɵfac = function GroupByPipe_Factory(t) { return new (t || GroupByPipe)(); };
GroupByPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "groupBy", type: GroupByPipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GroupByPipe, [{
        type: Pipe,
        args: [{
                name: 'groupBy',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBCeS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJwaXBlcy9ncm91cC1ieS9Hcm91cEJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBS25ELE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFNBQVMsQ0FBQyxLQUFVLEVBQUUsSUFBWTtRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsTUFBTSxHQUFHLEdBQWtDLEVBQUUsQ0FBQztRQUU5QyxLQUFLLE1BQU0sS0FBSyxJQUFJLEtBQUssRUFBRTtZQUN6QixNQUFNLEtBQUssR0FBUSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDL0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNqQjtZQUVELEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7c0VBbEJVLFdBQVc7NkRBQVgsV0FBVztrREFBWCxXQUFXO2NBSHZCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsU0FBUzthQUNoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNhbiwgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdncm91cEJ5Jyxcbn0pXG5leHBvcnQgY2xhc3MgR3JvdXBCeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIHByb3A6IHN0cmluZyk6IEFycmF5PGFueT4ge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICBjb25zdCBhcnI6IHsgW2tleTogc3RyaW5nXTogQXJyYXk8YW55PiB9ID0ge307XG5cbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGlucHV0KSB7XG4gICAgICBjb25zdCBmaWVsZDogYW55ID0gY2FuKHZhbHVlKS5oYXZlKHByb3ApO1xuICAgICAgaWYgKEhlbHBlcnMuaXNCbGFuayhhcnJbZmllbGRdKSkge1xuICAgICAgICBhcnJbZmllbGRdID0gW107XG4gICAgICB9XG5cbiAgICAgIGFycltmaWVsZF0ucHVzaCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGFycikubWFwKChrZXkpID0+ICh7IGtleSwgdmFsdWU6IGFycltrZXldIH0pKTtcbiAgfVxufVxuIl19