export class DateRange {
    constructor(
    /** The start date of the range. */
    start, 
    /** The end date of the range. */
    end) {
        this.start = start;
        this.end = end;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIudHlwZXMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIudHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLFNBQVM7SUFJcEI7SUFDRSxtQ0FBbUM7SUFDMUIsS0FBZTtJQUN4QixpQ0FBaUM7SUFDeEIsR0FBYTtRQUZiLFVBQUssR0FBTCxLQUFLLENBQVU7UUFFZixRQUFHLEdBQUgsR0FBRyxDQUFVO0lBQ3JCLENBQUM7Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIERhdGVMaWtlID0gRGF0ZSB8IHN0cmluZyB8IG51bWJlcjtcblxuZXhwb3J0IGNsYXNzIERhdGVSYW5nZTxEID0gRGF0ZUxpa2U+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC12YXJpYWJsZVxuICBwcml2YXRlIF9kaXNhYmxlU3RydWN0dXJhbEVxdWl2YWxlbmN5OiBuZXZlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogVGhlIHN0YXJ0IGRhdGUgb2YgdGhlIHJhbmdlLiAqL1xuICAgIHJlYWRvbmx5IHN0YXJ0OiBEIHwgbnVsbCxcbiAgICAvKiogVGhlIGVuZCBkYXRlIG9mIHRoZSByYW5nZS4gKi9cbiAgICByZWFkb25seSBlbmQ6IEQgfCBudWxsLFxuICApIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFuZ2VNb2RlbCB7XG4gIHN0YXJ0RGF0ZTogRGF0ZTtcbiAgZW5kRGF0ZTogRGF0ZTtcbn1cblxuZXhwb3J0IHR5cGUgbW9kZWxUeXBlcyA9IERhdGUgfCBEYXRlW10gfCBSYW5nZU1vZGVsO1xuXG5leHBvcnQgaW50ZXJmYWNlIERheSB7XG4gIGRhdGU6IERhdGU7XG4gIGlzQ3VycmVudE1vbnRoPzogYm9vbGVhbjtcbiAgaXNUb2RheT86IGJvb2xlYW47XG4gIG5hbWU/OiBzdHJpbmc7XG4gIG51bWJlcj86IHN0cmluZyB8IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvRGF0ZVNlbGVjdEV2ZW50IHtcbiAgZXZlbnQ6IEV2ZW50O1xuICBkYXk6IERheTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvTW9udGhTZWxlY3RFdmVudCB7XG4gIGV2ZW50OiBFdmVudDtcbiAgbW9udGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvWWVhclNlbGVjdEV2ZW50IHtcbiAgZXZlbnQ6IEV2ZW50O1xuICB5ZWFyOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERhdGVQaWNrZXJWYWx1ZUZvcm1hdHMgPSAnZGF0ZScgfCAnaXNvODYwMSc7XG5cbmV4cG9ydCB0eXBlIERhdGVQaWNrZXJTZWxlY3RNb2RlcyA9ICdzaW5nbGUnIHwgJ211bHRpcGxlJyB8ICdyYW5nZScgfCAnd2Vlayc7XG5cbmV4cG9ydCB0eXBlIHJhbmdlU2VsZWN0TW9kZXMgPSAnc3RhcnREYXRlJyB8ICdlbmREYXRlJztcblxuLyoqIE9iamVjdCB0aGF0IGNhbiBiZSBwcm92aWRlZCBpbiBvcmRlciB0byBjdXN0b21pemUgdGhlIGRhdGUgcmFuZ2Ugc2VsZWN0aW9uIGJlaGF2aW9yLiAqL1xuZXhwb3J0IGludGVyZmFjZSBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5PEQgPSBEYXRlTGlrZT4ge1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIHNlbGVjdGluZyBhIHZhbHVlLlxuICAgKiBAcGFyYW0gZGF0ZSBEYXRlIHRoYXQgd2FzIHNlbGVjdGVkLiBXaWxsIGJlIG51bGwgaWYgdGhlIHVzZXIgY2xlYXJlZCB0aGUgc2VsZWN0aW9uLlxuICAgKiBAcGFyYW0gY3VycmVudFZhbHVlIEN1cnJlbnQgdmFsdWUgdGhhdCBpcyBjdXJyZW50bHkgc2hvdyBpbiB0aGUgY2FsZW5kYXIuXG4gICAqIEBwYXJhbSBldmVudCBET00gZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIHNlbGVjdGlvbi4gQ3VycmVudGx5IG9ubHkgY29ycmVzcG9uZHMgdG8gYSBgY2xpY2tgXG4gICAqICAgIGV2ZW50LCBidXQgaXQgbWF5IGdldCBleHBhbmRlZCBpbiB0aGUgZnV0dXJlLlxuICAgKi9cbiAgc2VsZWN0aW9uRmluaXNoZWQoZGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50VmFsdWU6IEQsIGV2ZW50OiBFdmVudCk6IEQ7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB1c2VyIGhhcyBhY3RpdmF0ZWQgYSBuZXcgZGF0ZSAoZS5nLiBieSBob3ZlcmluZyBvdmVyXG4gICAqIGl0IG9yIG1vdmluZyBmb2N1cykgYW5kIHRoZSBjYWxlbmRhciB0cmllcyB0byBkaXNwbGF5IGEgZGF0ZSByYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIGFjdGl2ZURhdGUgRGF0ZSB0aGF0IHRoZSB1c2VyIGhhcyBhY3RpdmF0ZWQuIFdpbGwgYmUgbnVsbCBpZiB0aGUgdXNlciBtb3ZlZFxuICAgKiAgICBmb2N1cyB0byBhbiBlbGVtZW50IHRoYXQncyBubyBhIGNhbGVuZGFyIGNlbGwuXG4gICAqIEBwYXJhbSBjdXJyZW50UmFuZ2UgUmFuZ2UgdGhhdCBpcyBjdXJyZW50bHkgc2hvd24gaW4gdGhlIGNhbGVuZGFyLlxuICAgKiBAcGFyYW0gZXZlbnQgRE9NIGV2ZW50IHRoYXQgY2F1c2VkIHRoZSBwcmV2aWV3IHRvIGJlIGNoYW5nZWQuIFdpbGwgYmUgZWl0aGVyIGFcbiAgICogICAgYG1vdXNlZW50ZXJgL2Btb3VzZWxlYXZlYCBvciBgZm9jdXNgL2BibHVyYCBkZXBlbmRpbmcgb24gaG93IHRoZSB1c2VyIGlzIG5hdmlnYXRpbmcuXG4gICAqL1xuICBjcmVhdGVQcmV2aWV3KGFjdGl2ZURhdGU6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFZhbHVlOiBELCBldmVudDogRXZlbnQpOiBEO1xuXG4gIGlzU2VsZWN0ZWQoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50VmFsdWU6IEQpOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE92ZXJsYXlEYXRlIHtcbiAgZGF0ZTogRGF0ZTtcbiAgdHlwZTogc3RyaW5nO1xufVxuIl19