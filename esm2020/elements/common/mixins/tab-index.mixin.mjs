import { coerceNumberProperty } from '@angular/cdk/coercion';
/** Mixin to augment a directive with a `tabIndex` property. */
export function mixinTabIndex(base, defaultTabIndex = 0) {
    // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
    // but given we `extend` it from another class, we can assume a constructor being accessible.
    class Mixin extends base {
        constructor(...args) {
            super(...args);
            this._tabIndex = defaultTabIndex;
            this.defaultTabIndex = defaultTabIndex;
        }
        get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
        }
        set tabIndex(value) {
            // If the specified tabIndex value is null or undefined, fall back to the default value.
            this._tabIndex = value != null ? coerceNumberProperty(value) : this.defaultTabIndex;
        }
    }
    // Since we don't directly extend from `base` with it's original types, and we instruct
    // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
    // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
    return Mixin;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWluZGV4Lm1peGluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY29tbW9uL21peGlucy90YWItaW5kZXgubWl4aW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFnQjdELCtEQUErRDtBQUMvRCxNQUFNLFVBQVUsYUFBYSxDQUE0QyxJQUFPLEVBQUUsZUFBZSxHQUFHLENBQUM7SUFDbkcsMkZBQTJGO0lBQzNGLDZGQUE2RjtJQUM3RixNQUFlLEtBQU0sU0FBUyxJQUEyQztRQVl2RSxZQUFZLEdBQUcsSUFBVztZQUN4QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQVpULGNBQVMsR0FBVyxlQUFlLENBQUM7WUFDNUMsb0JBQWUsR0FBRyxlQUFlLENBQUM7UUFZbEMsQ0FBQztRQVZELElBQUksUUFBUTtZQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDN0MsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLEtBQWE7WUFDeEIsd0ZBQXdGO1lBQ3hGLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDdEYsQ0FBQztLQUtGO0lBRUQsdUZBQXVGO0lBQ3ZGLHlGQUF5RjtJQUN6Rix1RkFBdUY7SUFDdkYsT0FBTyxLQUFnRCxDQUFDO0FBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnN0cnVjdG9yLCBDb25zdHJ1Y3RvciB9IGZyb20gJy4vY29uc3RydWN0b3InO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJy4vZGlzYWJsZWQubWl4aW4nO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGludGVyZmFjZSBIYXNUYWJJbmRleCB7XG4gIC8qKiBUYWJpbmRleCBvZiB0aGUgY29tcG9uZW50LiAqL1xuICB0YWJJbmRleDogbnVtYmVyO1xuXG4gIC8qKiBUYWJpbmRleCB0byB3aGljaCB0byBmYWxsIGJhY2sgdG8gaWYgbm8gdmFsdWUgaXMgc2V0LiAqL1xuICBkZWZhdWx0VGFiSW5kZXg6IG51bWJlcjtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCB0eXBlIEhhc1RhYkluZGV4Q3RvciA9IENvbnN0cnVjdG9yPEhhc1RhYkluZGV4PjtcblxuLyoqIE1peGluIHRvIGF1Z21lbnQgYSBkaXJlY3RpdmUgd2l0aCBhIGB0YWJJbmRleGAgcHJvcGVydHkuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5UYWJJbmRleDxUIGV4dGVuZHMgQWJzdHJhY3RDb25zdHJ1Y3RvcjxDYW5EaXNhYmxlPj4oYmFzZTogVCwgZGVmYXVsdFRhYkluZGV4ID0gMCk6IEhhc1RhYkluZGV4Q3RvciAmIFQge1xuICAvLyBOb3RlOiBXZSBjYXN0IGBiYXNlYCB0byBgdW5rbm93bmAgYW5kIHRoZW4gYENvbnN0cnVjdG9yYC4gSXQgY291bGQgYmUgYW4gYWJzdHJhY3QgY2xhc3MsXG4gIC8vIGJ1dCBnaXZlbiB3ZSBgZXh0ZW5kYCBpdCBmcm9tIGFub3RoZXIgY2xhc3MsIHdlIGNhbiBhc3N1bWUgYSBjb25zdHJ1Y3RvciBiZWluZyBhY2Nlc3NpYmxlLlxuICBhYnN0cmFjdCBjbGFzcyBNaXhpbiBleHRlbmRzIChiYXNlIGFzIHVua25vd24gYXMgQ29uc3RydWN0b3I8Q2FuRGlzYWJsZT4pIHtcbiAgICBwcml2YXRlIF90YWJJbmRleDogbnVtYmVyID0gZGVmYXVsdFRhYkluZGV4O1xuICAgIGRlZmF1bHRUYWJJbmRleCA9IGRlZmF1bHRUYWJJbmRleDtcblxuICAgIGdldCB0YWJJbmRleCgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cbiAgICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgLy8gSWYgdGhlIHNwZWNpZmllZCB0YWJJbmRleCB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZCwgZmFsbCBiYWNrIHRvIHRoZSBkZWZhdWx0IHZhbHVlLlxuICAgICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZSAhPSBudWxsID8gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpIDogdGhpcy5kZWZhdWx0VGFiSW5kZXg7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNpbmNlIHdlIGRvbid0IGRpcmVjdGx5IGV4dGVuZCBmcm9tIGBiYXNlYCB3aXRoIGl0J3Mgb3JpZ2luYWwgdHlwZXMsIGFuZCB3ZSBpbnN0cnVjdFxuICAvLyBUeXBlU2NyaXB0IHRoYXQgYFRgIGFjdHVhbGx5IGlzIGluc3RhbnRpYXRhYmxlIHRocm91Z2ggYG5ld2AsIHRoZSB0eXBlcyBkb24ndCBvdmVybGFwLlxuICAvLyBUaGlzIGlzIGEgbGltaXRhdGlvbiBpbiBUUyBhcyBhYnN0cmFjdCBjbGFzc2VzIGNhbm5vdCBiZSB0eXBlZCBwcm9wZXJseSBkeW5hbWljYWxseS5cbiAgcmV0dXJuIE1peGluIGFzIHVua25vd24gYXMgVCAmIENvbnN0cnVjdG9yPEhhc1RhYkluZGV4Pjtcbn1cbiJdfQ==