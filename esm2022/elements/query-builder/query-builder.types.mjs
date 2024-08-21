export var Conjunction;
(function (Conjunction) {
    Conjunction["AND"] = "and";
    Conjunction["OR"] = "or";
    Conjunction["NOT"] = "not";
})(Conjunction || (Conjunction = {}));
export var Operator;
(function (Operator) {
    Operator["after"] = "after";
    Operator["before"] = "before";
    Operator["between"] = "between";
    Operator["equalTo"] = "equalTo";
    Operator["exclude"] = "exclude";
    Operator["excludeAny"] = "excludeAny";
    Operator["greaterThan"] = "greaterThan";
    Operator["include"] = "include";
    Operator["includeAll"] = "includeAll";
    Operator["includeAny"] = "includeAny";
    Operator["isEmpty"] = "isEmpty";
    Operator["isNull"] = "isNull";
    Operator["lessThan"] = "lessThan";
    Operator["radius"] = "radius";
    Operator["within"] = "within";
})(Operator || (Operator = {}));
export var RadiusUnits;
(function (RadiusUnits) {
    RadiusUnits["miles"] = "miles";
    RadiusUnits["km"] = "km";
})(RadiusUnits || (RadiusUnits = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci50eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvcXVlcnktYnVpbGRlci50eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQU4sSUFBWSxXQUlYO0FBSkQsV0FBWSxXQUFXO0lBQ3JCLDBCQUFXLENBQUE7SUFDWCx3QkFBUyxDQUFBO0lBQ1QsMEJBQVcsQ0FBQTtBQUNiLENBQUMsRUFKVyxXQUFXLEtBQVgsV0FBVyxRQUl0QjtBQVlELE1BQU0sQ0FBTixJQUFZLFFBZ0JYO0FBaEJELFdBQVksUUFBUTtJQUNsQiwyQkFBZSxDQUFBO0lBQ2YsNkJBQWlCLENBQUE7SUFDakIsK0JBQW1CLENBQUE7SUFDbkIsK0JBQW1CLENBQUE7SUFDbkIsK0JBQW1CLENBQUE7SUFDbkIscUNBQXlCLENBQUE7SUFDekIsdUNBQTJCLENBQUE7SUFDM0IsK0JBQW1CLENBQUE7SUFDbkIscUNBQXlCLENBQUE7SUFDekIscUNBQXlCLENBQUE7SUFDekIsK0JBQW1CLENBQUE7SUFDbkIsNkJBQWlCLENBQUE7SUFDakIsaUNBQXFCLENBQUE7SUFDckIsNkJBQWlCLENBQUE7SUFDakIsNkJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQWhCVyxRQUFRLEtBQVIsUUFBUSxRQWdCbkI7QUE2RUQsTUFBTSxDQUFOLElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNyQiw4QkFBZSxDQUFBO0lBQ2Ysd0JBQVMsQ0FBQTtBQUNYLENBQUMsRUFIVyxXQUFXLEtBQVgsV0FBVyxRQUd0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGVudW0gQ29uanVuY3Rpb24ge1xuICBBTkQgPSAnYW5kJyxcbiAgT1IgPSAnb3InLFxuICBOT1QgPSAnbm90Jyxcbn1cblxuZXhwb3J0IHR5cGUgQ29uZGl0aW9uR3JvdXAgPSB7XG4gIFtLIGluIENvbmp1bmN0aW9uIGFzIGAkJHtLfWBdPzogQ29uZGl0aW9uW107XG59O1xuXG5leHBvcnQgdHlwZSBOZXN0ZWRDb25kaXRpb25Hcm91cCA9IHtcbiAgW0sgaW4gQ29uanVuY3Rpb24gYXMgYCQke0t9YF0/OiBDb25kaXRpb25PckNvbmRpdGlvbkdyb3VwW107XG59O1xuXG5leHBvcnQgdHlwZSBDb25kaXRpb25PckNvbmRpdGlvbkdyb3VwID0gQ29uZGl0aW9uIHwgTmVzdGVkQ29uZGl0aW9uR3JvdXA7XG5cbmV4cG9ydCBlbnVtIE9wZXJhdG9yIHtcbiAgYWZ0ZXIgPSAnYWZ0ZXInLFxuICBiZWZvcmUgPSAnYmVmb3JlJyxcbiAgYmV0d2VlbiA9ICdiZXR3ZWVuJyxcbiAgZXF1YWxUbyA9ICdlcXVhbFRvJyxcbiAgZXhjbHVkZSA9ICdleGNsdWRlJyxcbiAgZXhjbHVkZUFueSA9ICdleGNsdWRlQW55JyxcbiAgZ3JlYXRlclRoYW4gPSAnZ3JlYXRlclRoYW4nLFxuICBpbmNsdWRlID0gJ2luY2x1ZGUnLFxuICBpbmNsdWRlQWxsID0gJ2luY2x1ZGVBbGwnLFxuICBpbmNsdWRlQW55ID0gJ2luY2x1ZGVBbnknLFxuICBpc0VtcHR5ID0gJ2lzRW1wdHknLFxuICBpc051bGwgPSAnaXNOdWxsJyxcbiAgbGVzc1RoYW4gPSAnbGVzc1RoYW4nLFxuICByYWRpdXMgPSAncmFkaXVzJyxcbiAgd2l0aGluID0gJ3dpdGhpbicsXG59XG5cbmV4cG9ydCB0eXBlIE9wZXJhdG9yTmFtZSA9IGtleW9mIHR5cGVvZiBPcGVyYXRvcjtcblxuZXhwb3J0IGludGVyZmFjZSBDb25kaXRpb24ge1xuICBmaWVsZDogc3RyaW5nO1xuICBvcGVyYXRvcjogT3BlcmF0b3JOYW1lIHwgc3RyaW5nO1xuICB2YWx1ZTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENyaXRlcmlhIHtcbiAgY3JpdGVyaWE6IENvbmRpdGlvbkdyb3VwW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmVzdGVkQ3JpdGVyaWEge1xuICBjcml0ZXJpYTogTmVzdGVkQ29uZGl0aW9uR3JvdXBbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlRmllbGREZWYge1xuICBuYW1lOiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIGRhdGFTcGVjaWFsaXphdGlvbj86IHN0cmluZztcbiAgb3B0aW9uYWw/OiBib29sZWFuO1xuICBtdWx0aVZhbHVlPzogYm9vbGVhbjtcbiAgaW5wdXRUeXBlPzogc3RyaW5nO1xuICBvcHRpb25zPzogeyB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyOyBsYWJlbDogc3RyaW5nOyByZWFkT25seT86IGJvb2xlYW4gfVtdO1xuICBvcHRpb25zVXJsPzogc3RyaW5nO1xuICBvcHRpb25zVHlwZT86IHN0cmluZztcbiAgZGF0YVR5cGU/OiBzdHJpbmc7XG4gIGljb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRDb25maWc8VCBleHRlbmRzIEJhc2VGaWVsZERlZj4ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBvcHRpb25zOiBUW107XG4gIHNlYXJjaDogKHRlcm06IHN0cmluZykgPT4gVFtdO1xuICBmaW5kOiAobmFtZTogc3RyaW5nKSA9PiBUO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFkZHJlc3NEYXRhIHtcbiAgYWRkcmVzc19jb21wb25lbnRzOiBBZGRyZXNzQ29tcG9uZW50W107XG4gIGZvcm1hdHRlZF9hZGRyZXNzOiBzdHJpbmc7XG4gIGdlb21ldHJ5OiBBZGRyZXNzR2VvbWV0cnk7XG4gIHBsYWNlX2lkOiBzdHJpbmc7XG4gIHJhZGl1cz86IEFkZHJlc3NSYWRpdXM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkcmVzc1JhZGl1cyB7XG4gIHZhbHVlOiBudW1iZXI7XG4gIHVuaXRzOiBBZGRyZXNzUmFkaXVzVW5pdHNOYW1lO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFkZHJlc3NDb21wb25lbnQge1xuICBsb25nX25hbWU6IHN0cmluZztcbiAgc2hvcnRfbmFtZTogc3RyaW5nO1xuICB0eXBlczogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkcmVzc0dlb21ldHJ5IHtcbiAgbG9jYXRpb246IEFkZHJlc3NHZW9tZXRyeUxvY2F0aW9uO1xuICB2aWV3cG9ydDogQWRkcmVzc0dlb21ldHJ5Vmlld3BvcnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkcmVzc0dlb21ldHJ5TG9jYXRpb24ge1xuICBsYXQ6IG51bWJlcjtcbiAgbG5nOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkcmVzc0dlb21ldHJ5Vmlld3BvcnQge1xuICBub3J0aDogbnVtYmVyO1xuICBzb3V0aDogbnVtYmVyO1xuICBlYXN0OiBudW1iZXI7XG4gIHdlc3Q6IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gUmFkaXVzVW5pdHMge1xuICBtaWxlcyA9ICdtaWxlcycsXG4gIGttID0gJ2ttJyxcbn1cblxuZXhwb3J0IHR5cGUgQWRkcmVzc1JhZGl1c1VuaXRzTmFtZSA9IGtleW9mIHR5cGVvZiBSYWRpdXNVbml0cztcblxuLyoqIEFsbCBvcHRpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzIGZvciB0aGUgYWRkcmVzcyBjcml0ZXJpYSAqL1xuZXhwb3J0IHR5cGUgQWRkcmVzc0NyaXRlcmlhQ29uZmlnID0ge1xuICByYWRpdXNFbmFibGVkPzogYm9vbGVhbjtcbiAgcmFkaXVzVW5pdHM/OiBBZGRyZXNzUmFkaXVzVW5pdHNOYW1lO1xufVxuXG4vKiogSW50ZXJmYWNlIHVzZWQgdG8gcHJvdmlkZSBhbiBvdXRsZXQgZm9yIHJvd3MgdG8gYmUgaW5zZXJ0ZWQgaW50by4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlGaWx0ZXJPdXRsZXQge1xuICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIl19