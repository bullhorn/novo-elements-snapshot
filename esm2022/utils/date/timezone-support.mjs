/**
 * Copyright © 2018-2022 Ferdinand Prantl
 * https://www.npmjs.com/package/timezone-support
 **/
const formattingToken = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?|DD?|d|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g;
const formatTokenFunctions = {};
const formatters = {};
export function formatZonedTime(time, format) {
    let formatter = formatters[format];
    if (!formatter) {
        formatter = formatters[format] = makeFormatter(format);
    }
    return formatter(time);
}
function makeFormatter(format) {
    const array = format.match(formattingToken);
    const { length } = array;
    for (let i = 0; i < length; ++i) {
        const token = array[i];
        const formatter = formatTokenFunctions[token];
        if (formatter) {
            array[i] = formatter;
        }
        else {
            array[i] = token.replace(/^\[|\]$/g, '');
        }
    }
    return function (time) {
        let output = '';
        for (const token of array) {
            output += typeof token === 'function' ? token.call(time) : token;
        }
        return output;
    };
}
const addFormatToken = function (token, padded, property) {
    const callback = typeof property === 'string' ? function () {
        return this[property];
    } : property;
    if (token) {
        formatTokenFunctions[token] = callback;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return padWithZeros(callback.call(this), padded[1]);
        };
    }
};
addFormatToken('A', 0, function () { return this.hours < 12 ? 'AM' : 'PM'; });
addFormatToken('a', 0, function () { return this.hours < 12 ? 'am' : 'pm'; });
addFormatToken('S', 0, function () { return Math.floor(this.milliseconds / 100); });
addFormatToken(0, ['SS', 2], function () { return Math.floor(this.milliseconds / 10); });
addFormatToken(0, ['SSS', 3], 'milliseconds');
addFormatToken('s', ['ss', 2], 'seconds');
addFormatToken('m', ['mm', 2], 'minutes');
addFormatToken('h', ['hh', 2], function () { return (this.hours % 12) || 12; });
addFormatToken('H', ['HH', 2], 'hours');
addFormatToken('d', 0, 'dayOfWeek');
addFormatToken('D', ['DD', 2], 'day');
addFormatToken('M', ['MM', 2], 'month');
addFormatToken(0, ['YY', 2], function () { return this.year % 100; });
addFormatToken('Y', ['YYYY', 4], 'year');
addFormatToken('z', 0, function () { return this.zone.abbreviation; });
function addTimeZoneFormatToken(token, separator) {
    addFormatToken(token, 0, function () {
        let offset = -this.zone.offset;
        const sign = offset < 0 ? '-' : '+';
        offset = Math.abs(offset);
        return sign + padWithZeros(Math.floor(offset / 60), 2) + separator + padWithZeros(offset % 60, 2);
    });
}
addTimeZoneFormatToken('Z', ':');
addTimeZoneFormatToken('ZZ', '');
const padToN = [undefined, undefined, padToTwo, padToThree, padToFour];
function padWithZeros(number, length) {
    return padToN[length](number);
}
function padToTwo(number) {
    return number > 9 ? number : '0' + number;
}
function padToThree(number) {
    return number > 99 ? number : number > 9 ? '0' + number : '00' + number;
}
function padToFour(number) {
    return number > 999 ? number : number > 99 ? '0' + number : number > 9 ? '00' + number : '000' + number;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXpvbmUtc3VwcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL3V0aWxzL2RhdGUvdGltZXpvbmUtc3VwcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0lBR0k7QUFFSixNQUFNLGVBQWUsR0FBRyxrRkFBa0YsQ0FBQztBQUMzRyxNQUFNLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztBQUNoQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFFdEIsTUFBTSxVQUFVLGVBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTTtJQUMxQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2YsU0FBUyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBRSxNQUFNO0lBQzVCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDNUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztJQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDaEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksU0FBUyxFQUFFLENBQUM7WUFDZCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLENBQUM7YUFBTSxDQUFDO1lBQ04sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxVQUFVLElBQUk7UUFDbkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssTUFBTSxLQUFLLElBQUksS0FBSyxFQUFFLENBQUM7WUFDMUIsTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ25FLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDLENBQUE7QUFDSCxDQUFDO0FBRUQsTUFBTSxjQUFjLEdBQUcsVUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVE7SUFDdEQsTUFBTSxRQUFRLEdBQUcsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNiLElBQUksS0FBSyxFQUFFLENBQUM7UUFDVixvQkFBb0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDekMsQ0FBQztJQUNELElBQUksTUFBTSxFQUFFLENBQUM7UUFDWCxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztZQUNoQyxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQTtJQUNILENBQUM7QUFDSCxDQUFDLENBQUE7QUFFRCxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxjQUFjLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0UsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsY0FBYyxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdFLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLGNBQWMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRixjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLGNBQWMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RixjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzlDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDMUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLGNBQWMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0UsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4QyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNwQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDeEMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxjQUFjLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLGNBQWMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXRFLFNBQVMsc0JBQXNCLENBQUUsS0FBSyxFQUFFLFNBQVM7SUFDL0MsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7UUFDdkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQixNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNwQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELHNCQUFzQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNqQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFakMsTUFBTSxNQUFNLEdBQUcsQ0FBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFFLENBQUM7QUFFekUsU0FBUyxZQUFZLENBQUUsTUFBTSxFQUFFLE1BQU07SUFDbkMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFFLE1BQU07SUFDdkIsT0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7QUFDNUMsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFFLE1BQU07SUFDekIsT0FBTyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7QUFDMUUsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFFLE1BQU07SUFDeEIsT0FBTyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDMUcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBcbiAqIENvcHlyaWdodCDCqSAyMDE4LTIwMjIgRmVyZGluYW5kIFByYW50bFxuICogaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvdGltZXpvbmUtc3VwcG9ydFxuICoqL1xuXG5jb25zdCBmb3JtYXR0aW5nVG9rZW4gPSAvKFxcW1teW10qXFxdKXwoWy06Ly4oKVxcc10rKXwoQXxhfFlZWVl8WVk/fE1NP3xERD98ZHxoaD98SEg/fG1tP3xzcz98U3sxLDN9fHp8Wlo/KS9nO1xuY29uc3QgZm9ybWF0VG9rZW5GdW5jdGlvbnMgPSB7fTtcbmNvbnN0IGZvcm1hdHRlcnMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFpvbmVkVGltZSh0aW1lLCBmb3JtYXQpIHtcbiAgbGV0IGZvcm1hdHRlciA9IGZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgaWYgKCFmb3JtYXR0ZXIpIHtcbiAgICBmb3JtYXR0ZXIgPSBmb3JtYXR0ZXJzW2Zvcm1hdF0gPSBtYWtlRm9ybWF0dGVyKGZvcm1hdCk7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdHRlcih0aW1lKTtcbn1cblxuZnVuY3Rpb24gbWFrZUZvcm1hdHRlciAoZm9ybWF0KSB7XG4gIGNvbnN0IGFycmF5ID0gZm9ybWF0Lm1hdGNoKGZvcm1hdHRpbmdUb2tlbik7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBhcnJheTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHRva2VuID0gYXJyYXlbaV07XG4gICAgY29uc3QgZm9ybWF0dGVyID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dO1xuICAgIGlmIChmb3JtYXR0ZXIpIHtcbiAgICAgIGFycmF5W2ldID0gZm9ybWF0dGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnJheVtpXSA9IHRva2VuLnJlcGxhY2UoL15cXFt8XFxdJC9nLCAnJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmdW5jdGlvbiAodGltZSkge1xuICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICBmb3IgKGNvbnN0IHRva2VuIG9mIGFycmF5KSB7XG4gICAgICBvdXRwdXQgKz0gdHlwZW9mIHRva2VuID09PSAnZnVuY3Rpb24nID8gdG9rZW4uY2FsbCh0aW1lKSA6IHRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG59XG5cbmNvbnN0IGFkZEZvcm1hdFRva2VuID0gZnVuY3Rpb24gKHRva2VuLCBwYWRkZWQsIHByb3BlcnR5KSB7XG4gIGNvbnN0IGNhbGxiYWNrID0gdHlwZW9mIHByb3BlcnR5ID09PSAnc3RyaW5nJyA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpc1twcm9wZXJ0eV07XG4gIH0gOiBwcm9wZXJ0eTtcbiAgaWYgKHRva2VuKSB7XG4gICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dID0gY2FsbGJhY2s7XG4gIH1cbiAgaWYgKHBhZGRlZCkge1xuICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3BhZGRlZFswXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcGFkV2l0aFplcm9zKGNhbGxiYWNrLmNhbGwodGhpcyksIHBhZGRlZFsxXSk7XG4gICAgfVxuICB9XG59XG5cbmFkZEZvcm1hdFRva2VuKCdBJywgMCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5ob3VycyA8IDEyID8gJ0FNJyA6ICdQTScgfSk7XG5hZGRGb3JtYXRUb2tlbignYScsIDAsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaG91cnMgPCAxMiA/ICdhbScgOiAncG0nIH0pO1xuYWRkRm9ybWF0VG9rZW4oJ1MnLCAwLCBmdW5jdGlvbiAoKSB7IHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzIC8gMTAwKSB9KTtcbmFkZEZvcm1hdFRva2VuKDAsIFsnU1MnLCAyXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kcyAvIDEwKSB9KTtcbmFkZEZvcm1hdFRva2VuKDAsIFsnU1NTJywgM10sICdtaWxsaXNlY29uZHMnKTtcbmFkZEZvcm1hdFRva2VuKCdzJywgWydzcycsIDJdLCAnc2Vjb25kcycpO1xuYWRkRm9ybWF0VG9rZW4oJ20nLCBbJ21tJywgMl0sICdtaW51dGVzJyk7XG5hZGRGb3JtYXRUb2tlbignaCcsIFsnaGgnLCAyXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKHRoaXMuaG91cnMgJSAxMikgfHwgMTIgfSk7XG5hZGRGb3JtYXRUb2tlbignSCcsIFsnSEgnLCAyXSwgJ2hvdXJzJyk7XG5hZGRGb3JtYXRUb2tlbignZCcsIDAsICdkYXlPZldlZWsnKTtcbmFkZEZvcm1hdFRva2VuKCdEJywgWydERCcsIDJdLCAnZGF5Jyk7XG5hZGRGb3JtYXRUb2tlbignTScsIFsnTU0nLCAyXSwgJ21vbnRoJyk7XG5hZGRGb3JtYXRUb2tlbigwLCBbJ1lZJywgMl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMueWVhciAlIDEwMCB9KTtcbmFkZEZvcm1hdFRva2VuKCdZJywgWydZWVlZJywgNF0sICd5ZWFyJyk7XG5hZGRGb3JtYXRUb2tlbigneicsIDAsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuem9uZS5hYmJyZXZpYXRpb24gfSk7XG5cbmZ1bmN0aW9uIGFkZFRpbWVab25lRm9ybWF0VG9rZW4gKHRva2VuLCBzZXBhcmF0b3IpIHtcbiAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgb2Zmc2V0ID0gLXRoaXMuem9uZS5vZmZzZXQ7XG4gICAgY29uc3Qgc2lnbiA9IG9mZnNldCA8IDAgPyAnLScgOiAnKyc7XG4gICAgb2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICByZXR1cm4gc2lnbiArIHBhZFdpdGhaZXJvcyhNYXRoLmZsb29yKG9mZnNldCAvIDYwKSwgMikgKyBzZXBhcmF0b3IgKyBwYWRXaXRoWmVyb3Mob2Zmc2V0ICUgNjAsIDIpO1xuICB9KTtcbn1cblxuYWRkVGltZVpvbmVGb3JtYXRUb2tlbignWicsICc6Jyk7XG5hZGRUaW1lWm9uZUZvcm1hdFRva2VuKCdaWicsICcnKTtcblxuY29uc3QgcGFkVG9OID0gWyB1bmRlZmluZWQsIHVuZGVmaW5lZCwgcGFkVG9Ud28sIHBhZFRvVGhyZWUsIHBhZFRvRm91ciBdO1xuXG5mdW5jdGlvbiBwYWRXaXRoWmVyb3MgKG51bWJlciwgbGVuZ3RoKSB7XG4gIHJldHVybiBwYWRUb05bbGVuZ3RoXShudW1iZXIpO1xufVxuXG5mdW5jdGlvbiBwYWRUb1R3byAobnVtYmVyKSB7XG4gIHJldHVybiBudW1iZXIgPiA5ID8gbnVtYmVyIDogJzAnICsgbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBwYWRUb1RocmVlIChudW1iZXIpIHtcbiAgcmV0dXJuIG51bWJlciA+IDk5ID8gbnVtYmVyIDogbnVtYmVyID4gOSA/ICcwJyArIG51bWJlciA6ICcwMCcgKyBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIHBhZFRvRm91ciAobnVtYmVyKSB7XG4gIHJldHVybiBudW1iZXIgPiA5OTkgPyBudW1iZXIgOiBudW1iZXIgPiA5OSA/ICcwJyArIG51bWJlciA6IG51bWJlciA+IDkgPyAnMDAnICsgbnVtYmVyIDogJzAwMCcgKyBudW1iZXI7XG59XG4iXX0=