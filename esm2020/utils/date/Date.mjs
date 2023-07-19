import { addDays, addMonths, addWeeks, differenceInCalendarDays, differenceInDays, differenceInSeconds, endOfDay, endOfMonth, endOfWeek, format, getMonth, getYear, isAfter, isBefore, isSameDay, isSameMonth, isSameSecond, isWithinInterval, setHours, setMinutes, startOfDay, startOfMinute, startOfMonth, startOfWeek } from 'date-fns';
import { convertTokens } from './convert-tokens';
import { legacyParse } from './legacy-parse';
/**
 * This DateUtil is a wrapper for calling new date-fns v2 functions with existing legacy
 * v1 function calls without having to refactor too much code and potentially introduce
 * breaking changes.
 *
 * The old calls generally called date-fns functions with loosely-typed date values, often
 * of type DateLike (Date | string | number). This was a problem when upgrading to date-fns
 * v2 since functions are now typed more strongly and no longer accept strings.
 *
 * If you are adding a new component/feature and looking here to add a new date-fns wrapper
 * function, strongly consider not doing that and instead refactoring your code to not use
 * DateLike, and calling the date-fns function(s) directly.
 **/
export class DateUtil {
    static getDateFromAnyType(date) {
        return legacyParse(date);
    }
    static getWeekDayFromNumber(weekDay) {
        if (0 <= weekDay && weekDay <= 6) {
            return weekDay;
        }
        else {
            console.warn('Invalid weekDay value:', weekDay);
            return 0;
        }
    }
    static parse(date, options) {
        return legacyParse(date, options);
    }
    static format(date, formatString) {
        if (!date) {
            return '';
        }
        date = this.getDateFromAnyType(date);
        formatString = convertTokens(formatString);
        return format(date, formatString);
    }
    static addDays(date, days) {
        date = this.getDateFromAnyType(date);
        return addDays(date, days);
    }
    static addWeeks(date, weeks) {
        date = this.getDateFromAnyType(date);
        return addWeeks(date, weeks);
    }
    static addMonths(date, months) {
        date = this.getDateFromAnyType(date);
        return addMonths(date, months);
    }
    static startOfMinute(date) {
        date = this.getDateFromAnyType(date);
        return startOfMinute(date);
    }
    static startOfDay(date) {
        date = this.getDateFromAnyType(date);
        return startOfDay(date);
    }
    static startOfWeek(date, options) {
        date = this.getDateFromAnyType(date);
        if (options?.weekStartsOn) {
            options.weekStartsOn = this.getWeekDayFromNumber(options.weekStartsOn);
        }
        return startOfWeek(date, options);
    }
    static startOfMonth(date) {
        date = this.getDateFromAnyType(date);
        return startOfMonth(date);
    }
    static endOfDay(date) {
        date = this.getDateFromAnyType(date);
        return endOfDay(date);
    }
    static endOfWeek(date, options) {
        date = this.getDateFromAnyType(date);
        if (options?.weekStartsOn) {
            options.weekStartsOn = this.getWeekDayFromNumber(options.weekStartsOn);
        }
        return endOfWeek(date, options);
    }
    static endOfMonth(date) {
        date = this.getDateFromAnyType(date);
        return endOfMonth(date);
    }
    static isSameDay(dateLeft, dateRight) {
        dateLeft = this.getDateFromAnyType(dateLeft);
        dateRight = this.getDateFromAnyType(dateRight);
        return isSameDay(dateLeft, dateRight);
    }
    static isSameMonth(dateLeft, dateRight) {
        dateLeft = this.getDateFromAnyType(dateLeft);
        dateRight = this.getDateFromAnyType(dateRight);
        return isSameMonth(dateLeft, dateRight);
    }
    static isSameSecond(dateLeft, dateRight) {
        dateLeft = this.getDateFromAnyType(dateLeft);
        dateRight = this.getDateFromAnyType(dateRight);
        return isSameSecond(dateLeft, dateRight);
    }
    static differenceInSeconds(date, start) {
        date = this.getDateFromAnyType(date);
        start = this.getDateFromAnyType(start);
        return differenceInSeconds(date, start);
    }
    static differenceInCalendarDays(date, start) {
        date = this.getDateFromAnyType(date);
        start = this.getDateFromAnyType(start);
        return differenceInCalendarDays(date, start);
    }
    static differenceInDays(date, start) {
        date = this.getDateFromAnyType(date);
        start = this.getDateFromAnyType(start);
        return differenceInDays(date, start);
    }
    static isWithinRange(date, start, end) {
        date = this.getDateFromAnyType(date);
        const interval = {
            start: this.getDateFromAnyType(start),
            end: this.getDateFromAnyType(end),
        };
        /**
         * Need extra error handling here to retain backwards compatibility because the new
         * isWithinInterval replacement function throws an error for Invalid Dates and Invalid
         * Intervals instead of returning true or false.
         **/
        try {
            return isWithinInterval(date, interval);
        }
        catch (e) {
            console.warn(e.toString());
            return false;
        }
    }
    static getMonth(date) {
        date = this.getDateFromAnyType(date);
        return getMonth(date);
    }
    static getYear(date) {
        date = this.getDateFromAnyType(date);
        return getYear(date);
    }
    static setMinutes(date, minutes) {
        date = this.getDateFromAnyType(date);
        return setMinutes(date, minutes);
    }
    static setHours(date, hours) {
        date = this.getDateFromAnyType(date);
        return setHours(date, hours);
    }
    static isBefore(date, minDate) {
        date = this.getDateFromAnyType(date);
        return isBefore(date, minDate);
    }
    static isAfter(date, maxDate) {
        date = this.getDateFromAnyType(date);
        return isAfter(date, maxDate);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL3V0aWxzL2RhdGUvRGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQU8sd0JBQXdCLEVBQUUsZ0JBQWdCLEVBQ2xGLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUMvRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUN6RSxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVqRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBc0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUlqRTs7Ozs7Ozs7Ozs7O0lBWUk7QUFDSixNQUFNLE9BQU8sUUFBUTtJQUNqQixNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBYztRQUNwQyxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQXFCO1FBQzdDLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO1lBQzlCLE9BQU8sT0FBYyxDQUFDO1NBQ3pCO2FBQU07WUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxDQUFDO1NBQ1o7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFTLEVBQUUsT0FBNEI7UUFDaEQsT0FBTyxXQUFXLENBQUMs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Q0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFjO1FBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQWU7UUFDN0MsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBYyxFQUFFLEtBQWE7UUFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBYyxFQUFFLE9BQXNCO1FBQ2xELElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQWMsRUFBRSxPQUFzQjtRQUNqRCxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhZGREYXlzLCBhZGRNb250aHMsIGFkZFdlZWtzLCBEYXksIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cywgZGlmZmVyZW5jZUluRGF5cyxcbiAgICBkaWZmZXJlbmNlSW5TZWNvbmRzLCBlbmRPZkRheSwgZW5kT2ZNb250aCwgZW5kT2ZXZWVrLCBmb3JtYXQsIGdldE1vbnRoLCBnZXRZZWFyLFxuICAgIGlzQWZ0ZXIsIGlzQmVmb3JlLCBpc1NhbWVEYXksIGlzU2FtZU1vbnRoLCBpc1NhbWVTZWNvbmQsIGlzV2l0aGluSW50ZXJ2YWwsIHBhcnNlLFxuICAgIHNldEhvdXJzLCBzZXRNaW51dGVzLCBzdGFydE9mRGF5LCBzdGFydE9mTWludXRlLCBzdGFydE9mTW9udGgsIHN0YXJ0T2ZXZWVrIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uL0hlbHBlcnMnO1xuaW1wb3J0IHsgY29udmVydFRva2VucyB9IGZyb20gJy4vY29udmVydC10b2tlbnMnO1xuaW1wb3J0IHsgbGVnYWN5UGFyc2UsIExlZ2FjeVBhcnNlT3B0aW9ucyB9IGZyb20gJy4vbGVnYWN5LXBhcnNlJztcblxudHlwZSBEYXRlTGlrZSA9IERhdGUgfCBzdHJpbmcgfCBudW1iZXI7XG5cbi8qKlxuICogVGhpcyBEYXRlVXRpbCBpcyBhIHdyYXBwZXIgZm9yIGNhbGxpbmcgbmV3IGRhdGUtZm5zIHYyIGZ1bmN0aW9ucyB3aXRoIGV4aXN0aW5nIGxlZ2FjeVxuICogdjEgZnVuY3Rpb24gY2FsbHMgd2l0aG91dCBoYXZpbmcgdG8gcmVmYWN0b3IgdG9vIG11Y2ggY29kZSBhbmQgcG90ZW50aWFsbHkgaW50cm9kdWNlXG4gKiBicmVha2luZyBjaGFuZ2VzLlxuICpcbiAqIFRoZSBvbGQgY2FsbHMgZ2VuZXJhbGx5IGNhbGxlZCBkYXRlLWZucyBmdW5jdGlvbnMgd2l0aCBsb29zZWx5LXR5cGVkIGRhdGUgdmFsdWVzLCBvZnRlblxuICogb2YgdHlwZSBEYXRlTGlrZSAoRGF0ZSB8IHN0cmluZyB8IG51bWJlcikuIFRoaXMgd2FzIGEgcHJvYmxlbSB3aGVuIHVwZ3JhZGluZyB0byBkYXRlLWZuc1xuICogdjIgc2luY2UgZnVuY3Rpb25zIGFyZSBub3cgdHlwZWQgbW9yZSBzdHJvbmdseSBhbmQgbm8gbG9uZ2VyIGFjY2VwdCBzdHJpbmdzLlxuICpcbiAqIElmIHlvdSBhcmUgYWRkaW5nIGEgbmV3IGNvbXBvbmVudC9mZWF0dXJlIGFuZCBsb29raW5nIGhlcmUgdG8gYWRkIGEgbmV3IGRhdGUtZm5zIHdyYXBwZXJcbiAqIGZ1bmN0aW9uLCBzdHJvbmdseSBjb25zaWRlciBub3QgZG9pbmcgdGhhdCBhbmQgaW5zdGVhZCByZWZhY3RvcmluZyB5b3VyIGNvZGUgdG8gbm90IHVzZVxuICogRGF0ZUxpa2UsIGFuZCBjYWxsaW5nIHRoZSBkYXRlLWZucyBmdW5jdGlvbihzKSBkaXJlY3RseS5cbiAqKi9cbmV4cG9ydCBjbGFzcyBEYXRlVXRpbCB7XG4gICAgc3RhdGljIGdldERhdGVGcm9tQW55VHlwZShkYXRlOiBEYXRlTGlrZSk6IERhdGUgfCBudW1iZXIge1xuICAgICAgICByZXR1cm4gbGVnYWN5UGFyc2UoZGF0ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFdlZWtEYXlGcm9tTnVtYmVyKHdlZWtEYXk6IG51bWJlciB8IERheSk6IERheSB7XG4gICAgICAgIGlmICgwIDw9IHdlZWtEYXkgJiYgd2Vla0RheSA8PSA2KSB7XG4gICAgICAgICAgICByZXR1cm4gd2Vla0RheSBhcyBEYXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgd2Vla0RheSB2YWx1ZTonLCB3ZWVrRGF5KTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlKGRhdGU6IGFueSwgb3B0aW9ucz86IExlZ2FjeVBhcnNlT3B0aW9ucyk6IERhdGUge1xuICAgICAgICByZXR1cm4gbGVnYWN5UGFyc2UoZGF0ZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZvcm1hdChkYXRlLCBmb3JtYXRTdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIWRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBkYXRlID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZSk7XG4gICAgICAgIGZvcm1hdFN0cmluZyA9IGNvbnZlcnRUb2tlbnMoZm9ybWF0U3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIGZvcm1hdChkYXRlLCBmb3JtYXRTdHJpbmcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGREYXlzKGRhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xuICAgICAgICBkYXRlID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBhZGREYXlzKGRhdGUsIGRheXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRXZWVrcyhkYXRlLCB3ZWVrczogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGFkZFdlZWtzKGRhdGUsIHdlZWtzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkTW9udGhzKGRhdGUsIG1vbnRoczogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGFkZE1vbnRocyhkYXRlLCBtb250aHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdGFydE9mTWludXRlKGRhdGU6IERhdGVMaWtlKTogRGF0ZSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0T2ZNaW51dGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0YXJ0T2ZEYXkoZGF0ZTogRGF0ZUxpa2UpOiBEYXRlIHtcbiAgICAgICAgZGF0ZSA9IHRoaXMuZ2V0RGF0ZUZyb21BbnlUeXBlKGRhdGUpO1xuICAgICAgICByZXR1cm4gc3RhcnRPZkRheShkYXRlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RhcnRPZldlZWsoZGF0ZTogRGF0ZUxpa2UsIG9wdGlvbnM/KTogRGF0ZSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgaWYgKG9wdGlvbnM/LndlZWtTdGFydHNPbikge1xuICAgICAgICAgICAgb3B0aW9ucy53ZWVrU3RhcnRzT24gPSB0aGlzLmdldFdlZWtEYXlGcm9tTnVtYmVyKG9wdGlvbnMud2Vla1N0YXJ0c09uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhcnRPZldlZWsoZGF0ZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0YXJ0T2ZNb250aChkYXRlOiBEYXRlTGlrZSk6IERhdGUge1xuICAgICAgICBkYXRlID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBzdGFydE9mTW9udGgoZGF0ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVuZE9mRGF5KGRhdGU6IERhdGVMaWtlKTogRGF0ZSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGVuZE9mRGF5KGRhdGUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlbmRPZldlZWsoZGF0ZTogRGF0ZUxpa2UsIG9wdGlvbnM/KTogRGF0ZSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgaWYgKG9wdGlvbnM/LndlZWtTdGFydHNPbikge1xuICAgICAgICAgICAgb3B0aW9ucy53ZWVrU3RhcnRzT24gPSB0aGlzLmdldFdlZWtEYXlGcm9tTnVtYmVyKG9wdGlvbnMud2Vla1N0YXJ0c09uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW5kT2ZXZWVrKGRhdGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlbmRPZk1vbnRoKGRhdGU6IERhdGVMaWtlKTogRGF0ZSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGVuZE9mTW9udGgoZGF0ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzU2FtZURheShkYXRlTGVmdDogRGF0ZUxpa2UsIGRhdGVSaWdodDogRGF0ZUxpa2UpOiBib29sZWFuIHtcbiAgICAgICAgZGF0ZUxlZnQgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlTGVmdCk7XG4gICAgICAgIGRhdGVSaWdodCA9IHRoaXMuZ2V0RGF0ZUZyb21BbnlUeXBlKGRhdGVSaWdodCk7XG4gICAgICAgIHJldHVybiBpc1NhbWVEYXkoZGF0ZUxlZnQsIGRhdGVSaWdodCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzU2FtZU1vbnRoKGRhdGVMZWZ0OiBEYXRlTGlrZSwgZGF0ZVJpZ2h0OiBEYXRlTGlrZSk6IGJvb2xlYW4ge1xuICAgICAgICBkYXRlTGVmdCA9IHRoaXMuZ2V0RGF0ZUZyb21BbnlUeXBlKGRhdGVMZWZ0KTtcbiAgICAgICAgZGF0ZVJpZ2h0ID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZVJpZ2h0KTtcbiAgICAgICAgcmV0dXJuIGlzU2FtZU1vbnRoKGRhdGVMZWZ0LCBkYXRlUmlnaHQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1NhbWVTZWNvbmQoZGF0ZUxlZnQ6IERhdGVMaWtlLCBkYXRlUmlnaHQ6IERhdGVMaWtlKTogYm9vbGVhbiB7XG4gICAgICAgIGRhdGVMZWZ0ID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZUxlZnQpO1xuICAgICAgICBkYXRlUmlnaHQgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlUmlnaHQpO1xuICAgICAgICByZXR1cm4gaXNTYW1lU2Vjb25kKGRhdGVMZWZ0LCBkYXRlUmlnaHQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaWZmZXJlbmNlSW5TZWNvbmRzKGRhdGU6IERhdGVMaWtlLCBzdGFydDogRGF0ZUxpa2UpOiBudW1iZXIge1xuICAgICAgICBkYXRlID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZSk7XG4gICAgICAgIHN0YXJ0ID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoc3RhcnQpO1xuICAgICAgICByZXR1cm4gZGlmZmVyZW5jZUluU2Vjb25kcyhkYXRlLCBzdGFydCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlOiBEYXRlTGlrZSwgc3RhcnQ6IERhdGVMaWtlKTogbnVtYmVyIHtcbiAgICAgICAgZGF0ZSA9IHRoaXMuZ2V0RGF0ZUZyb21BbnlUeXBlKGRhdGUpO1xuICAgICAgICBzdGFydCA9IHRoaXMuZ2V0RGF0ZUZyb21BbnlUeXBlKHN0YXJ0KTtcbiAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlLCBzdGFydCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpZmZlcmVuY2VJbkRheXMoZGF0ZTogRGF0ZUxpa2UsIHN0YXJ0OiBEYXRlTGlrZSk6IG51bWJlciB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgc3RhcnQgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShzdGFydCk7XG4gICAgICAgIHJldHVybiBkaWZmZXJlbmNlSW5EYXlzKGRhdGUsIHN0YXJ0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNXaXRoaW5SYW5nZShkYXRlOiBEYXRlTGlrZSB8IG51bGwsIHN0YXJ0OiBEYXRlTGlrZSwgZW5kOiBEYXRlTGlrZSk6IGJvb2xlYW4ge1xuICAgICAgICBkYXRlID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZSk7XG4gICAgICAgIGNvbnN0IGludGVydmFsID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHRoaXMuZ2V0RGF0ZUZyb21BbnlUeXBlKHN0YXJ0KSxcbiAgICAgICAgICAgIGVuZDogdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZW5kKSxcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTmVlZCBleHRyYSBlcnJvciBoYW5kbGluZyBoZXJlIHRvIHJldGFpbiBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBiZWNhdXNlIHRoZSBuZXdcbiAgICAgICAgICogaXNXaXRoaW5JbnRlcnZhbCByZXBsYWNlbWVudCBmdW5jdGlvbiB0aHJvd3MgYW4gZXJyb3IgZm9yIEludmFsaWQgRGF0ZXMgYW5kIEludmFsaWRcbiAgICAgICAgICogSW50ZXJ2YWxzIGluc3RlYWQgb2YgcmV0dXJuaW5nIHRydWUgb3IgZmFsc2UuXG4gICAgICAgICAqKi9cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gaXNXaXRoaW5JbnRlcnZhbChkYXRlLCBpbnRlcnZhbCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oZS50b1N0cmluZygpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TW9udGgoZGF0ZTogRGF0ZUxpa2UpOiBudW1iZXIge1xuICAgICAgICBkYXRlID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBnZXRNb250aChkYXRlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0WWVhcihkYXRlOiBEYXRlTGlrZSk6IG51bWJlciB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFllYXIoZGF0ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldE1pbnV0ZXMoZGF0ZTogRGF0ZUxpa2UsIG1pbnV0ZXM6IG51bWJlcikge1xuICAgICAgICBkYXRlID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBzZXRNaW51dGVzKGRhdGUsIG1pbnV0ZXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRIb3VycyhkYXRlOiBEYXRlTGlrZSwgaG91cnM6IG51bWJlcikge1xuICAgICAgICBkYXRlID0gdGhpcy5nZXREYXRlRnJvbUFueVR5cGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBzZXRIb3VycyhkYXRlLCBob3Vycyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzQmVmb3JlKGRhdGU6IERhdGVMaWtlLCBtaW5EYXRlOiBEYXRlIHwgbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGlzQmVmb3JlKGRhdGUsIG1pbkRhdGUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0FmdGVyKGRhdGU6IERhdGVMaWtlLCBtYXhEYXRlOiBEYXRlIHwgbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmdldERhdGVGcm9tQW55VHlwZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGlzQWZ0ZXIoZGF0ZSwgbWF4RGF0ZSk7XG4gICAgfVxufVxuIl19