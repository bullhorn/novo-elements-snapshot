/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A Promise that uses the deferred anti-pattern
 * @return {?}
 */
export function Deferred() {
    /** @type {?} */
    const temp = {};
    /** @type {?} */
    const promise = new Promise((resolve, reject) => {
        temp.resolve = resolve;
        temp.reject = reject;
    });
    promise.resolve = temp.resolve;
    promise.reject = temp.reject;
    return promise;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmZXJyZWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsidXRpbHMvZGVmZXJyZWQvRGVmZXJyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQSxNQUFNOztVQUNFLElBQUksR0FBUSxFQUFFOztVQUNkLE9BQU8sR0FBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxNQUFXLEVBQUUsRUFBRTtRQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDLENBQUM7SUFDRixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzdCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgUHJvbWlzZSB0aGF0IHVzZXMgdGhlIGRlZmVycmVkIGFudGktcGF0dGVyblxuICovXG5leHBvcnQgZnVuY3Rpb24gRGVmZXJyZWQoKSB7XG4gIGNvbnN0IHRlbXA6IGFueSA9IHt9O1xuICBjb25zdCBwcm9taXNlOiBhbnkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSkgPT4ge1xuICAgIHRlbXAucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgdGVtcC5yZWplY3QgPSByZWplY3Q7XG4gIH0pO1xuICBwcm9taXNlLnJlc29sdmUgPSB0ZW1wLnJlc29sdmU7XG4gIHByb21pc2UucmVqZWN0ID0gdGVtcC5yZWplY3Q7XG4gIHJldHVybiBwcm9taXNlO1xufVxuIl19