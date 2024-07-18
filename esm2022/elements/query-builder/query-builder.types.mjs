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
    Operator["within"] = "within";
})(Operator || (Operator = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci50eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3F1ZXJ5LWJ1aWxkZXIvcXVlcnktYnVpbGRlci50eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQU4sSUFBWSxXQUlYO0FBSkQsV0FBWSxXQUFXO0lBQ3JCLDBCQUFXLENBQUE7SUFDWCx3QkFBUyxDQUFBO0lBQ1QsMEJBQVcsQ0FBQTtBQUNiLENBQUMsRUFKVyxXQUFXLEtBQVgsV0FBVyxRQUl0QjtBQU1ELE1BQU0sQ0FBTixJQUFZLFFBZVg7QUFmRCxXQUFZLFFBQVE7SUFDbEIsMkJBQWUsQ0FBQTtJQUNmLDZCQUFpQixDQUFBO0lBQ2pCLCtCQUFtQixDQUFBO0lBQ25CLCtCQUFtQixDQUFBO0lBQ25CLCtCQUFtQixDQUFBO0lBQ25CLHFDQUF5QixDQUFBO0lBQ3pCLHVDQUEyQixDQUFBO0lBQzNCLCtCQUFtQixDQUFBO0lBQ25CLHFDQUF5QixDQUFBO0lBQ3pCLHFDQUF5QixDQUFBO0lBQ3pCLCtCQUFtQixDQUFBO0lBQ25CLDZCQUFpQixDQUFBO0lBQ2pCLGlDQUFxQixDQUFBO0lBQ3JCLDZCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFmVyxRQUFRLEtBQVIsUUFBUSxRQWVuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGVudW0gQ29uanVuY3Rpb24ge1xuICBBTkQgPSAnYW5kJyxcbiAgT1IgPSAnb3InLFxuICBOT1QgPSAnbm90Jyxcbn1cblxuZXhwb3J0IHR5cGUgQ29uZGl0aW9uR3JvdXAgPSB7XG4gIFtLIGluIENvbmp1bmN0aW9uIGFzIGAkJHtLfWBdPzogQ29uZGl0aW9uW11cbn07XG5cbmV4cG9ydCBlbnVtIE9wZXJhdG9yIHtcbiAgYWZ0ZXIgPSAnYWZ0ZXInLFxuICBiZWZvcmUgPSAnYmVmb3JlJyxcbiAgYmV0d2VlbiA9ICdiZXR3ZWVuJyxcbiAgZXF1YWxUbyA9ICdlcXVhbFRvJyxcbiAgZXhjbHVkZSA9ICdleGNsdWRlJyxcbiAgZXhjbHVkZUFueSA9ICdleGNsdWRlQW55JyxcbiAgZ3JlYXRlclRoYW4gPSAnZ3JlYXRlclRoYW4nLFxuICBpbmNsdWRlID0gJ2luY2x1ZGUnLFxuICBpbmNsdWRlQWxsID0gJ2luY2x1ZGVBbGwnLFxuICBpbmNsdWRlQW55ID0gJ2luY2x1ZGVBbnknLFxuICBpc0VtcHR5ID0gJ2lzRW1wdHknLFxuICBpc051bGwgPSAnaXNOdWxsJyxcbiAgbGVzc1RoYW4gPSAnbGVzc1RoYW4nLFxuICB3aXRoaW4gPSAnd2l0aGluJyxcbn1cblxuZXhwb3J0IHR5cGUgT3BlcmF0b3JOYW1lID0ga2V5b2YgdHlwZW9mIE9wZXJhdG9yO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmRpdGlvbiB7XG4gIGZpZWxkOiBzdHJpbmc7XG4gIG9wZXJhdG9yOiBPcGVyYXRvck5hbWUgfCBzdHJpbmc7XG4gIHZhbHVlOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JpdGVyaWEge1xuICBjcml0ZXJpYTogQ29uZGl0aW9uR3JvdXBbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlRmllbGREZWYge1xuICBuYW1lOiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIGRhdGFTcGVjaWFsaXphdGlvbj86IHN0cmluZztcbiAgb3B0aW9uYWw/OiBib29sZWFuO1xuICBtdWx0aVZhbHVlPzogYm9vbGVhbjtcbiAgaW5wdXRUeXBlPzogc3RyaW5nO1xuICBvcHRpb25zPzogeyB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyOyBsYWJlbDogc3RyaW5nOyByZWFkT25seT86IGJvb2xlYW4gfVtdO1xuICBvcHRpb25zVXJsPzogc3RyaW5nO1xuICBvcHRpb25zVHlwZT86IHN0cmluZztcbiAgZGF0YVR5cGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRDb25maWc8VCBleHRlbmRzIEJhc2VGaWVsZERlZj4ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBvcHRpb25zOiBUW107XG4gIHNlYXJjaDogKHRlcm06IHN0cmluZykgPT4gVFtdO1xuICBmaW5kOiAobmFtZTogc3RyaW5nKSA9PiBUO1xufVxuXG4vKiogSW50ZXJmYWNlIHVzZWQgdG8gcHJvdmlkZSBhbiBvdXRsZXQgZm9yIHJvd3MgdG8gYmUgaW5zZXJ0ZWQgaW50by4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlGaWx0ZXJPdXRsZXQge1xuICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIl19