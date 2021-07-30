import { Pipe, LOCALE_ID, Inject } from '@angular/core';
export class WeekdayPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'short') {
        return new Intl.DateTimeFormat(locale, { weekday: method }).format(date);
    }
}
WeekdayPipe.decorators = [
    { type: Pipe, args: [{ name: 'weekday' },] }
];
WeekdayPipe.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2Vla2RheS5waXBlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci9waXBlL1dlZWtkYXkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZFLE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFlBQXVDLFNBQWlCLE9BQU87UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBRyxDQUFDO0lBQ25FLFNBQVMsQ0FBQyxJQUFVLEVBQUUsU0FBaUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFpQixPQUFPO1FBQzFFLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7WUFMRixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFOzs7eUNBRVYsTUFBTSxTQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtLCBMT0NBTEVfSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnd2Vla2RheScgfSlcclxuZXhwb3J0IGNsYXNzIFdlZWtkYXlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcgPSAnZW4tVVMnKSB7fVxyXG4gIHRyYW5zZm9ybShkYXRlOiBEYXRlLCBsb2NhbGU6IHN0cmluZyA9IHRoaXMubG9jYWxlLCBtZXRob2Q6IHN0cmluZyA9ICdzaG9ydCcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB3ZWVrZGF5OiBtZXRob2QgfSkuZm9ybWF0KGRhdGUpO1xyXG4gIH1cclxufVxyXG4iXX0=