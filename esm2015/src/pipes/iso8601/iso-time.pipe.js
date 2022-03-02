import { Pipe } from '@angular/core';
export class IsoTimePipe {
    constructor() { }
    transform(date) {
        // TODO: Lookup Locale to convert to 12hour
        if (date instanceof Date) {
            return date.toISOString().slice(11, 16);
        }
        return date.slice(11, 16);
    }
}
IsoTimePipe.decorators = [
    { type: Pipe, args: [{ name: 'isoTime' },] }
];
IsoTimePipe.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLXRpbWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9waXBlcy9pc284NjAxL2lzby10aW1lLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsZ0JBQWUsQ0FBQztJQUNoQixTQUFTLENBQUMsSUFBbUI7UUFDM0IsMkNBQTJDO1FBQzNDLElBQUksSUFBSSxZQUFZLElBQUksRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsT0FBUSxJQUFlLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7WUFURixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdpc29UaW1lJyB9KVxuZXhwb3J0IGNsYXNzIElzb1RpbWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgdHJhbnNmb3JtKGRhdGU6IHN0cmluZyB8IERhdGUpOiBzdHJpbmcge1xuICAgIC8vIFRPRE86IExvb2t1cCBMb2NhbGUgdG8gY29udmVydCB0byAxMmhvdXJcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMTEsIDE2KTtcbiAgICB9XG4gICAgcmV0dXJuIChkYXRlIGFzIHN0cmluZykuc2xpY2UoMTEsIDE2KTtcbiAgfVxufVxuIl19