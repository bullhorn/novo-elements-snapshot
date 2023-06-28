import { TemplateRef } from '@angular/core';
// @dynamic
export class Helpers {
    static isTemplateRef(value) {
        return value instanceof TemplateRef;
    }
    /**
     * Swallows an event to stop further execution
     */
    static swallowEvent(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    static interpolate(str, props) {
        if (typeof str === 'function') {
            return str(props);
        }
        if (this.isDate(props)) {
            props = this.dateToObject(props);
        }
        // else {
        //   props = Object.entries(props).reduce((obj, [key, value]) => {
        //     const res = { ...obj, [key]: value };
        //     if (this.isIsoDate(value as string)) {
        //       res[`${key}Parts`] = this.dateToObject(new Date(value as string));
        //     }
        //     return res;
        //   }, {});
        // }
        return str.replace(/\$([\w\.]+)/g, (original, key) => {
            const keys = key.split('.');
            let value = props[keys.shift()];
            while (keys.length && value !== undefined) {
                const k = keys.shift();
                value = k ? value[k] : `${value}.`;
            }
            return value !== undefined ? value : '';
        });
    }
    static interpolateWithFallback(formatString, data) {
        // Format string can be an array, it will attempt to interpolate each item
        // in the array, if there is a failure to replace it will mark it as such
        // It will either return the first successful replacement of ALL variables,
        // or an empty string
        if (Array.isArray(formatString)) {
            const successes = [];
            const failures = [];
            formatString.forEach((format) => {
                let isSuccess = true;
                const attempt = format.replace(/\$([\w\.]+)/g, (original, key) => {
                    const keys = key.split('.');
                    let value = data[keys.shift()];
                    while (keys.length && value !== undefined) {
                        const k = keys.shift();
                        value = k ? value[k] : `${value}.`;
                    }
                    if (isSuccess && Helpers.isEmpty(value)) {
                        isSuccess = false;
                    }
                    return Helpers.isEmpty(value) ? '' : value;
                });
                if (isSuccess) {
                    successes.push(attempt);
                }
                else {
                    failures.push(attempt);
                }
            });
            if (successes.length !== 0) {
                return successes[0];
            }
            return '';
        }
        else {
            return Helpers.interpolate(formatString, data);
        }
    }
    /**
     * Verifies that an object has every property expected by a string to interpolate
     * @param str   The string to interpolate
     * @param props The params to replace in string.
     */
    static validateInterpolationProps(str, props) {
        if (typeof str === 'function') {
            return true;
        }
        const keys = str.match(/\$([\w\.]+)/g);
        return keys.every((key) => {
            return props.hasOwnProperty(key.substr(1));
        });
    }
    static isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
    }
    /**
     * Checks to see if the object is a string
     */
    static isString(obj) {
        return typeof obj === 'string';
    }
    static escapeString(obj) {
        if (Helpers.isString(obj)) {
            return obj.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        return obj;
    }
    static isNumber(val, includeNegatives = false) {
        const numberRegex = includeNegatives ? /^-{0,1}\d*\.?\d*$/ : /^\d*\.?\d*$/;
        if (typeof val === 'string') {
            return val.length > 0 && val !== '.' && numberRegex.test(val);
        }
        else {
            return !isNaN(parseFloat(val));
        }
    }
    /**
     * Checks to see if the object is a undefined or null
     */
    static isBlank(obj) {
        return obj === undefined || obj === null;
    }
    /**
     * Checks to see if the object is a undefined or null
     */
    static isEmpty(obj) {
        return Helpers.isBlank(obj) || obj === '' || (Array.isArray(obj) && obj.length === 0);
    }
    /**
     * Checks to see if the object is a function
     */
    static isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }
    /**
     * Checks to see if the object is a Date
     */
    static isDate(obj) {
        return obj instanceof Date;
    }
    static isIsoDate(str) {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
            return false;
        }
        const d = new Date(str);
        return d.toISOString() === str;
    }
    static convertToArray(obj) {
        if (obj === undefined) {
            return [];
        }
        else if (!Array.isArray(obj)) {
            return [obj];
        }
        return obj;
    }
    static sortByField(fields, reverse = false) {
        return (previous, current) => {
            if (Helpers.isFunction(fields)) {
                return fields(reverse ? 'desc' : 'asc', previous, current);
            }
            if (!Array.isArray(fields)) {
                fields = [fields];
            }
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                let first = previous[field] || '';
                let second = current[field] || '';
                if (Helpers.isDate(first) && Helpers.isDate(second)) {
                    // Dates
                    first = first.getTime();
                    second = second.getTime();
                }
                else if (Helpers.isString(first) && Helpers.isString(second)) {
                    // Basic strings
                    first = first.toLowerCase();
                    second = second.toLowerCase();
                }
                else {
                    // Numbers
                    first = isNaN(Number(first)) ? first : Number(first);
                    second = isNaN(Number(second)) ? second : Number(second);
                }
                if (first > second) {
                    return reverse ? -1 : 1;
                }
                else if (first < second) {
                    return reverse ? 1 : -1;
                }
            }
            return 0;
        };
    }
    static filterByField(key, value) {
        return (item) => {
            const results = [];
            let field = can(item).have(key);
            if (value instanceof Function) {
                results.push(value(field, item));
            }
            else if (Array.isArray(value)) {
                results.push(value.includes(field));
            }
            else if (value instanceof Object) {
                if (field instanceof Date) {
                    field = field.getTime();
                }
                if (value.min) {
                    results.push(field >= value.min);
                }
                if (value.max) {
                    results.push(field <= value.max);
                }
                if (value.any && Array.isArray(value.any)) {
                    if (Array.isArray(field)) {
                        results.push(value.any.some((v) => field.includes(v)));
                    }
                    else {
                        results.push(value.any.includes(field));
                    }
                }
                if (value.all && Array.isArray(value.all)) {
                    results.push(value.all.every((v) => field.includes(v)));
                }
                if (value.not) {
                    results.push(!Helpers.filterByField(key, value.not)(item));
                }
                for (const subkey in value) {
                    if (['min', 'max', 'any', 'all', 'not'].indexOf(subkey) < 0) {
                        const subvalue = value[subkey];
                        results.push(Helpers.filterByField(`${key}.${subkey}`, subvalue)(item));
                    }
                }
            }
            else {
                results.push(JSON.stringify(field).match(new RegExp(value, 'gi')));
            }
            return results.every((x) => x);
        };
    }
    static findAncestor(element, selector) {
        while ((element = element.parentElement) && !element.matches.call(element, selector))
            ; // tslint:disable-line
        return element;
    }
    static deepClone(item) {
        if (Array.isArray(item)) {
            const newArr = [];
            for (let i = item.length; i-- > 0;) {
                // tslint:disable-line
                newArr[i] = Helpers.deepClone(item[i]);
            }
            return newArr;
        }
        if (typeof item === 'function' && !/\(\) \{ \[native/.test(item.toString()) && !item.toString().startsWith('class')) {
            let obj;
            for (const k in item) {
                if (k in item) {
                    obj[k] = Helpers.deepClone(item[k]);
                }
            }
            return obj;
        }
        if (item && typeof item === 'object') {
            const obj = {};
            for (const k in item) {
                if (k in item) {
                    obj[k] = Helpers.deepClone(item[k]);
                }
            }
            return obj;
        }
        return item;
    }
    static deepAssign(...objs) {
        if (objs.length < 2) {
            throw new Error('Need two or more objects to merge');
        }
        const target = Object.assign({}, objs[0]);
        for (let i = 1; i < objs.length; i++) {
            const source = Object.assign({}, objs[i]);
            Object.keys(source).forEach((prop) => {
                const value = source[prop];
                if (Helpers.isObject(value)) {
                    if (target.hasOwnProperty(prop) && Helpers.isObject(target[prop])) {
                        target[prop] = Helpers.deepAssign(target[prop], value);
                    }
                    else {
                        target[prop] = value;
                    }
                }
                else if (Array.isArray(value)) {
                    if (target.hasOwnProperty(prop) && Array.isArray(target[prop])) {
                        const targetArray = target[prop];
                        value.forEach((sourceItem, itemIndex) => {
                            if (itemIndex < targetArray.length) {
                                const targetItem = targetArray[itemIndex];
                                if (Object.is(targetItem, sourceItem)) {
                                    return;
                                }
                                if (Helpers.isObject(targetItem) && Helpers.isObject(sourceItem)) {
                                    targetArray[itemIndex] = Helpers.deepAssign(targetItem, sourceItem);
                                }
                                else if (Array.isArray(targetItem) && Array.isArray(sourceItem)) {
                                    targetArray[itemIndex] = Helpers.deepAssign(targetItem, sourceItem);
                                }
                                else {
                                    targetArray[itemIndex] = sourceItem;
                                }
                            }
                            else {
                                targetArray.push(sourceItem);
                            }
                        });
                    }
                    else {
                        target[prop] = value;
                    }
                }
                else {
                    target[prop] = value;
                }
            });
        }
        return target;
    }
    /**
     * Workaround for Edge browser since Element:nextElementSibling is undefined inside of template directives
     * @param element any document element
     * @returns the next sibling node that is of type: Element
     */
    static getNextElementSibling(element) {
        if (element.nextElementSibling) {
            return element.nextElementSibling;
        }
        else {
            let e = element.nextSibling;
            while (e && 1 !== e.nodeType) {
                e = e.nextSibling;
            }
            return e;
        }
    }
    static dateToObject(date) {
        const dateObj = {
            day: '',
            dayPeriod: '',
            era: '',
            hour: '',
            minute: '',
            month: '',
            second: '',
            weekday: '',
            year: '',
        };
        Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            era: 'short',
            hour: 'numeric',
            minute: 'numeric',
            month: 'numeric',
            second: 'numeric',
            weekday: 'long',
            year: 'numeric',
        })
            .formatToParts(date)
            .forEach((dateTimeFormatPart) => {
            if (dateTimeFormatPart.type !== 'literal') {
                dateObj[dateTimeFormatPart.type] = dateTimeFormatPart.value;
            }
        });
        return dateObj;
    }
}
export class Can {
    constructor(obj) {
        this.obj = obj;
    }
    have(key) {
        const props = key.split('.');
        let item = this.obj;
        for (let i = 0; i < props.length; i++) {
            item = item[props[i]];
            if (this.check(item) === false) {
                return item;
            }
        }
        return item;
    }
    check(thing) {
        return thing !== void 0;
    }
}
export function can(obj) {
    return new Can(obj);
}
// Assumes data is already sorted
export function binarySearch(item, array, compare) {
    return search(0, array.length - 1);
    function search(min, max) {
        if (min > max) {
            return undefined;
        }
        const guess = min + Math.floor((max - min) / 2);
        const comparison = compare(item, array[guess]);
        if (comparison === 0) {
            return array[guess];
        }
        else if (comparison === -1) {
            return search(min, guess - 1);
        }
        else if (comparison === 1) {
            return search(guess + 1, max);
        }
        else {
            throw new Error(`Input mismatch: ${JSON.stringify(item)} not comparable to ${JSON.stringify(array[guess])}`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL3V0aWxzL0hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1QyxXQUFXO0FBQ1gsTUFBTSxPQUFPLE9BQU87SUFDbEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFVO1FBQzdCLE9BQU8sS0FBSyxZQUFZLFdBQVcsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUs7UUFDdkIsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBc0IsRUFBRSxLQUFVO1FBQ25ELElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUFFO1lBQzdCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsU0FBUztRQUNULGtFQUFrRTtRQUNsRSw0Q0FBNEM7UUFDNUMsNkNBQTZDO1FBQzdDLDJFQUEyRTtRQUMzRSxRQUFRO1FBQ1Isa0JBQWtCO1FBQ2xCLFlBQVk7UUFDWixJQUFJO1FBRUosT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLFFBQWdCLEVBQUUsR0FBVyxFQUFFLEVBQUU7WUFDbkUsTUFBTSxJQUFJLEdBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLEtBQUssR0FBRyxL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RUFBRSxHQUFXO1FBQ3RDLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtZQUNiLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUUvQyxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckI7YUFBTSxJQUFJLFVBQVUsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM1QixPQUFPLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE9BQU8sTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5RztJQUNILENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gQGR5bmFtaWNcbmV4cG9ydCBjbGFzcyBIZWxwZXJzIHtcbiAgc3RhdGljIGlzVGVtcGxhdGVSZWYodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3YWxsb3dzIGFuIGV2ZW50IHRvIHN0b3AgZnVydGhlciBleGVjdXRpb25cbiAgICovXG4gIHN0YXRpYyBzd2FsbG93RXZlbnQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgaW50ZXJwb2xhdGUoc3RyOiBzdHJpbmcgfCBGdW5jdGlvbiwgcHJvcHM6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiBzdHIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBzdHIocHJvcHMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0RhdGUocHJvcHMpKSB7XG4gICAgICBwcm9wcyA9IHRoaXMuZGF0ZVRvT2JqZWN0KHByb3BzKTtcbiAgICB9XG4gICAgLy8gZWxzZSB7XG4gICAgLy8gICBwcm9wcyA9IE9iamVjdC5lbnRyaWVzKHByb3BzKS5yZWR1Y2UoKG9iaiwgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHJlcyA9IHsgLi4ub2JqLCBba2V5XTogdmFsdWUgfTtcbiAgICAvLyAgICAgaWYgKHRoaXMuaXNJc29EYXRlKHZhbHVlIGFzIHN0cmluZykpIHtcbiAgICAvLyAgICAgICByZXNbYCR7a2V5fVBhcnRzYF0gPSB0aGlzLmRhdGVUb09iamVjdChuZXcgRGF0ZSh2YWx1ZSBhcyBzdHJpbmcpKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gcmVzO1xuICAgIC8vICAgfSwge30pO1xuICAgIC8vIH1cblxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwkKFtcXHdcXC5dKykvZywgKG9yaWdpbmFsOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgbGV0IHZhbHVlID0gcHJvcHNba2V5cy5zaGlmdCgpXTtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGsgPSBrZXlzLnNoaWZ0KCk7XG4gICAgICAgIHZhbHVlID0gayA/IHZhbHVlW2tdIDogYCR7dmFsdWV9LmA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogJyc7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgaW50ZXJwb2xhdGVXaXRoRmFsbGJhY2soZm9ybWF0U3RyaW5nOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICAvLyBGb3JtYXQgc3RyaW5nIGNhbiBiZSBhbiBhcnJheSwgaXQgd2lsbCBhdHRlbXB0IHRvIGludGVycG9sYXRlIGVhY2ggaXRlbVxuICAgIC8vIGluIHRoZSBhcnJheSwgaWYgdGhlcmUgaXMgYSBmYWlsdXJlIHRvIHJlcGxhY2UgaXQgd2lsbCBtYXJrIGl0IGFzIHN1Y2hcbiAgICAvLyBJdCB3aWxsIGVpdGhlciByZXR1cm4gdGhlIGZpcnN0IHN1Y2Nlc3NmdWwgcmVwbGFjZW1lbnQgb2YgQUxMIHZhcmlhYmxlcyxcbiAgICAvLyBvciBhbiBlbXB0eSBzdHJpbmdcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmb3JtYXRTdHJpbmcpKSB7XG4gICAgICBjb25zdCBzdWNjZXNzZXM6IHN0cmluZ1tdID0gW107XG4gICAgICBjb25zdCBmYWlsdXJlczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvcm1hdFN0cmluZy5mb3JFYWNoKChmb3JtYXQ6IHN0cmluZykgPT4ge1xuICAgICAgICBsZXQgaXNTdWNjZXNzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgYXR0ZW1wdCA9IGZvcm1hdC5yZXBsYWNlKC9cXCQoW1xcd1xcLl0rKS9nLCAob3JpZ2luYWwsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgICBsZXQgdmFsdWUgPSBkYXRhW2tleXMuc2hpZnQoKV07XG4gICAgICAgICAgd2hpbGUgKGtleXMubGVuZ3RoICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGsgPSBrZXlzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YWx1ZSA9IGsgPyB2YWx1ZVtrXSA6IGAke3ZhbHVlfS5gO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNTdWNjZXNzICYmIEhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlzU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gSGVscGVycy5pc0VtcHR5KHZhbHVlKSA/ICcnIDogdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaXNTdWNjZXNzKSB7XG4gICAgICAgICAgc3VjY2Vzc2VzLnB1c2goYXR0ZW1wdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFpbHVyZXMucHVzaChhdHRlbXB0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoc3VjY2Vzc2VzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gc3VjY2Vzc2VzWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gSGVscGVycy5pbnRlcnBvbGF0ZShmb3JtYXRTdHJpbmcsIGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB0aGF0IGFuIG9iamVjdCBoYXMgZXZlcnkgcHJvcGVydHkgZXhwZWN0ZWQgYnkgYSBzdHJpbmcgdG8gaW50ZXJwb2xhdGVcbiAgICogQHBhcmFtIHN0ciAgIFRoZSBzdHJpbmcgdG8gaW50ZXJwb2xhdGVcbiAgICogQHBhcmFtIHByb3BzIFRoZSBwYXJhbXMgdG8gcmVwbGFjZSBpbiBzdHJpbmcuXG4gICAqL1xuICBzdGF0aWMgdmFsaWRhdGVJbnRlcnBvbGF0aW9uUHJvcHMoc3RyOiBzdHJpbmcgfCBGdW5jdGlvbiwgcHJvcHM6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2Ygc3RyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3Qga2V5cyA9IHN0ci5tYXRjaCgvXFwkKFtcXHdcXC5dKykvZyk7XG4gICAgcmV0dXJuIGtleXMuZXZlcnkoKGtleSkgPT4ge1xuICAgICAgcmV0dXJuIHByb3BzLmhhc093blByb3BlcnR5KGtleS5zdWJzdHIoMSkpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGlzT2JqZWN0KGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaXRlbSkgJiYgaXRlbSAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBvYmplY3QgaXMgYSBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBpc1N0cmluZyhvYmo6IGFueSkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIHN0YXRpYyBlc2NhcGVTdHJpbmcob2JqOiBhbnkpOiBhbnkge1xuICAgIGlmIChIZWxwZXJzLmlzU3RyaW5nKG9iaikpIHtcbiAgICAgIHJldHVybiBvYmoucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHN0YXRpYyBpc051bWJlcih2YWw6IGFueSwgaW5jbHVkZU5lZ2F0aXZlczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgbnVtYmVyUmVnZXggPSBpbmNsdWRlTmVnYXRpdmVzID8gL14tezAsMX1cXGQqXFwuP1xcZCokLyA6IC9eXFxkKlxcLj9cXGQqJC87XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdmFsLmxlbmd0aCA+IDAgJiYgdmFsICE9PSAnLicgJiYgbnVtYmVyUmVnZXgudGVzdCh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIG9iamVjdCBpcyBhIHVuZGVmaW5lZCBvciBudWxsXG4gICAqL1xuICBzdGF0aWMgaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgb2JqZWN0IGlzIGEgdW5kZWZpbmVkIG9yIG51bGxcbiAgICovXG4gIHN0YXRpYyBpc0VtcHR5KG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEhlbHBlcnMuaXNCbGFuayhvYmopIHx8IG9iaiA9PT0gJycgfHwgKEFycmF5LmlzQXJyYXkob2JqKSAmJiBvYmoubGVuZ3RoID09PSAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBvYmplY3QgaXMgYSBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGlzRnVuY3Rpb24ob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEob2JqICYmIG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY2FsbCAmJiBvYmouYXBwbHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIG9iamVjdCBpcyBhIERhdGVcbiAgICovXG4gIHN0YXRpYyBpc0RhdGUob2JqOiBhbnkpIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRGF0ZTtcbiAgfVxuXG4gIHN0YXRpYyBpc0lzb0RhdGUoc3RyOiBzdHJpbmcpIHtcbiAgICBpZiAoIS9cXGR7NH0tXFxkezJ9LVxcZHsyfVRcXGR7Mn06XFxkezJ9OlxcZHsyfS5cXGR7M31aLy50ZXN0KHN0cikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHN0cik7XG4gICAgcmV0dXJuIGQudG9JU09TdHJpbmcoKSA9PT0gc3RyO1xuICB9XG5cbiAgc3RhdGljIGNvbnZlcnRUb0FycmF5KG9iajogdW5rbm93bikge1xuICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgcmV0dXJuIFtvYmpdO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgc3RhdGljIHNvcnRCeUZpZWxkKGZpZWxkczogYW55LCByZXZlcnNlID0gZmFsc2UpIHtcbiAgICByZXR1cm4gKHByZXZpb3VzOiBhbnksIGN1cnJlbnQ6IGFueSkgPT4ge1xuICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbihmaWVsZHMpKSB7XG4gICAgICAgIHJldHVybiBmaWVsZHMocmV2ZXJzZSA/ICdkZXNjJyA6ICdhc2MnLCBwcmV2aW91cywgY3VycmVudCk7XG4gICAgICB9XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmllbGRzKSkge1xuICAgICAgICBmaWVsZHMgPSBbZmllbGRzXTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkOiBzdHJpbmcgPSBmaWVsZHNbaV07XG4gICAgICAgIGxldCBmaXJzdCA9IHByZXZpb3VzW2ZpZWxkXSB8fCAnJztcbiAgICAgICAgbGV0IHNlY29uZCA9IGN1cnJlbnRbZmllbGRdIHx8ICcnO1xuXG4gICAgICAgIGlmIChIZWxwZXJzLmlzRGF0ZShmaXJzdCkgJiYgSGVscGVycy5pc0RhdGUoc2Vjb25kKSkge1xuICAgICAgICAgIC8vIERhdGVzXG4gICAgICAgICAgZmlyc3QgPSBmaXJzdC5nZXRUaW1lKCk7XG4gICAgICAgICAgc2Vjb25kID0gc2Vjb25kLmdldFRpbWUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzU3RyaW5nKGZpcnN0KSAmJiBIZWxwZXJzLmlzU3RyaW5nKHNlY29uZCkpIHtcbiAgICAgICAgICAvLyBCYXNpYyBzdHJpbmdzXG4gICAgICAgICAgZmlyc3QgPSBmaXJzdC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHNlY29uZCA9IHNlY29uZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE51bWJlcnNcbiAgICAgICAgICBmaXJzdCA9IGlzTmFOKE51bWJlcihmaXJzdCkpID8gZmlyc3QgOiBOdW1iZXIoZmlyc3QpO1xuICAgICAgICAgIHNlY29uZCA9IGlzTmFOKE51bWJlcihzZWNvbmQpKSA/IHNlY29uZCA6IE51bWJlcihzZWNvbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpcnN0ID4gc2Vjb25kKSB7XG4gICAgICAgICAgcmV0dXJuIHJldmVyc2UgPyAtMSA6IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZmlyc3QgPCBzZWNvbmQpIHtcbiAgICAgICAgICByZXR1cm4gcmV2ZXJzZSA/IDEgOiAtMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmaWx0ZXJCeUZpZWxkKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgIGxldCBmaWVsZCA9IGNhbihpdGVtKS5oYXZlKGtleSk7XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICByZXN1bHRzLnB1c2godmFsdWUoZmllbGQsIGl0ZW0pKTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHZhbHVlLmluY2x1ZGVzKGZpZWxkKSk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmIChmaWVsZCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICBmaWVsZCA9IGZpZWxkLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUubWluKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKGZpZWxkID49IHZhbHVlLm1pbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlLm1heCkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChmaWVsZCA8PSB2YWx1ZS5tYXgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5hbnkgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZS5hbnkpKSB7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmllbGQpKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2godmFsdWUuYW55LnNvbWUoKHYpID0+IGZpZWxkLmluY2x1ZGVzKHYpKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh2YWx1ZS5hbnkuaW5jbHVkZXMoZmllbGQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlLmFsbCAmJiBBcnJheS5pc0FycmF5KHZhbHVlLmFsbCkpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2godmFsdWUuYWxsLmV2ZXJ5KCh2KSA9PiBmaWVsZC5pbmNsdWRlcyh2KSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5ub3QpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goIUhlbHBlcnMuZmlsdGVyQnlGaWVsZChrZXksIHZhbHVlLm5vdCkoaXRlbSkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc3Via2V5IGluIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKFsnbWluJywgJ21heCcsICdhbnknLCAnYWxsJywgJ25vdCddLmluZGV4T2Yoc3Via2V5KSA8IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YnZhbHVlID0gdmFsdWVbc3Via2V5XTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChIZWxwZXJzLmZpbHRlckJ5RmllbGQoYCR7a2V5fS4ke3N1YmtleX1gLCBzdWJ2YWx1ZSkoaXRlbSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKEpTT04uc3RyaW5naWZ5KGZpZWxkKS5tYXRjaChuZXcgUmVnRXhwKHZhbHVlLCAnZ2knKSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHMuZXZlcnkoKHgpID0+IHgpO1xuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZmluZEFuY2VzdG9yKGVsZW1lbnQ6IEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICB3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQpICYmICFlbGVtZW50Lm1hdGNoZXMuY2FsbChlbGVtZW50LCBzZWxlY3RvcikpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgZGVlcENsb25lKGl0ZW06IGFueSk6IGFueSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGNvbnN0IG5ld0FyciA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IGl0ZW0ubGVuZ3RoOyBpLS0gPiAwOyApIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICBuZXdBcnJbaV0gPSBIZWxwZXJzLmRlZXBDbG9uZShpdGVtW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdBcnI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ2Z1bmN0aW9uJyAmJiAhL1xcKFxcKSBcXHsgXFxbbmF0aXZlLy50ZXN0KGl0ZW0udG9TdHJpbmcoKSkgJiYgIWl0ZW0udG9TdHJpbmcoKS5zdGFydHNXaXRoKCdjbGFzcycpKSB7XG4gICAgICBsZXQgb2JqO1xuICAgICAgZm9yIChjb25zdCBrIGluIGl0ZW0pIHtcbiAgICAgICAgaWYgKGsgaW4gaXRlbSkge1xuICAgICAgICAgIG9ialtrXSA9IEhlbHBlcnMuZGVlcENsb25lKGl0ZW1ba10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBpZiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgZm9yIChjb25zdCBrIGluIGl0ZW0pIHtcbiAgICAgICAgaWYgKGsgaW4gaXRlbSkge1xuICAgICAgICAgIG9ialtrXSA9IEhlbHBlcnMuZGVlcENsb25lKGl0ZW1ba10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuXG4gIHN0YXRpYyBkZWVwQXNzaWduKC4uLm9ianMpIHtcbiAgICBpZiAob2Jqcy5sZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZWQgdHdvIG9yIG1vcmUgb2JqZWN0cyB0byBtZXJnZScpO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBPYmplY3QuYXNzaWduKHt9LCBvYmpzWzBdKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG9ianMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIG9ianNbaV0pO1xuICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gc291cmNlW3Byb3BdO1xuICAgICAgICBpZiAoSGVscGVycy5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KHByb3ApICYmIEhlbHBlcnMuaXNPYmplY3QodGFyZ2V0W3Byb3BdKSkge1xuICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gSGVscGVycy5kZWVwQXNzaWduKHRhcmdldFtwcm9wXSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KHByb3ApICYmIEFycmF5LmlzQXJyYXkodGFyZ2V0W3Byb3BdKSkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0QXJyYXkgPSB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChzb3VyY2VJdGVtLCBpdGVtSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1JbmRleCA8IHRhcmdldEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEl0ZW0gPSB0YXJnZXRBcnJheVtpdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaXModGFyZ2V0SXRlbSwgc291cmNlSXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKEhlbHBlcnMuaXNPYmplY3QodGFyZ2V0SXRlbSkgJiYgSGVscGVycy5pc09iamVjdChzb3VyY2VJdGVtKSkge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0QXJyYXlbaXRlbUluZGV4XSA9IEhlbHBlcnMuZGVlcEFzc2lnbih0YXJnZXRJdGVtLCBzb3VyY2VJdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0SXRlbSkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2VJdGVtKSkge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0QXJyYXlbaXRlbUluZGV4XSA9IEhlbHBlcnMuZGVlcEFzc2lnbih0YXJnZXRJdGVtLCBzb3VyY2VJdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0QXJyYXlbaXRlbUluZGV4XSA9IHNvdXJjZUl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlSXRlbSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogV29ya2Fyb3VuZCBmb3IgRWRnZSBicm93c2VyIHNpbmNlIEVsZW1lbnQ6bmV4dEVsZW1lbnRTaWJsaW5nIGlzIHVuZGVmaW5lZCBpbnNpZGUgb2YgdGVtcGxhdGUgZGlyZWN0aXZlc1xuICAgKiBAcGFyYW0gZWxlbWVudCBhbnkgZG9jdW1lbnQgZWxlbWVudFxuICAgKiBAcmV0dXJucyB0aGUgbmV4dCBzaWJsaW5nIG5vZGUgdGhhdCBpcyBvZiB0eXBlOiBFbGVtZW50XG4gICAqL1xuICBzdGF0aWMgZ2V0TmV4dEVsZW1lbnRTaWJsaW5nKGVsZW1lbnQ6IEVsZW1lbnQpOiBOb2RlIHtcbiAgICBpZiAoZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIHJldHVybiBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGUgPSBlbGVtZW50Lm5leHRTaWJsaW5nO1xuICAgICAgd2hpbGUgKGUgJiYgMSAhPT0gZS5ub2RlVHlwZSkge1xuICAgICAgICBlID0gZS5uZXh0U2libGluZztcbiAgICAgIH1cbiAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkYXRlVG9PYmplY3QoZGF0ZTogRGF0ZSk6IHtcbiAgICBkYXk6IHN0cmluZztcbiAgICBkYXlQZXJpb2Q6IHN0cmluZztcbiAgICBlcmE6IHN0cmluZztcbiAgICBob3VyOiBzdHJpbmc7XG4gICAgbWludXRlOiBzdHJpbmc7XG4gICAgbW9udGg6IHN0cmluZztcbiAgICBzZWNvbmQ6IHN0cmluZztcbiAgICB3ZWVrZGF5OiBzdHJpbmc7XG4gICAgeWVhcjogc3RyaW5nO1xuICB9IHtcbiAgICBjb25zdCBkYXRlT2JqID0ge1xuICAgICAgZGF5OiAnJyxcbiAgICAgIGRheVBlcmlvZDogJycsXG4gICAgICBlcmE6ICcnLFxuICAgICAgaG91cjogJycsXG4gICAgICBtaW51dGU6ICcnLFxuICAgICAgbW9udGg6ICcnLFxuICAgICAgc2Vjb25kOiAnJyxcbiAgICAgIHdlZWtkYXk6ICcnLFxuICAgICAgeWVhcjogJycsXG4gICAgfTtcbiAgICBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgZXJhOiAnc2hvcnQnLFxuICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgbWludXRlOiAnbnVtZXJpYycsXG4gICAgICBtb250aDogJ251bWVyaWMnLFxuICAgICAgc2Vjb25kOiAnbnVtZXJpYycsXG4gICAgICB3ZWVrZGF5OiAnbG9uZycsXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgfSlcbiAgICAgIC5mb3JtYXRUb1BhcnRzKGRhdGUpXG4gICAgICAuZm9yRWFjaCgoZGF0ZVRpbWVGb3JtYXRQYXJ0OiBJbnRsLkRhdGVUaW1lRm9ybWF0UGFydCkgPT4ge1xuICAgICAgICBpZiAoZGF0ZVRpbWVGb3JtYXRQYXJ0LnR5cGUgIT09ICdsaXRlcmFsJykge1xuICAgICAgICAgIGRhdGVPYmpbZGF0ZVRpbWVGb3JtYXRQYXJ0LnR5cGVdID0gZGF0ZVRpbWVGb3JtYXRQYXJ0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICByZXR1cm4gZGF0ZU9iajtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FuIHtcbiAgb2JqOiBPYmplY3Q7XG5cbiAgY29uc3RydWN0b3Iob2JqOiBPYmplY3QpIHtcbiAgICB0aGlzLm9iaiA9IG9iajtcbiAgfVxuXG4gIGhhdmUoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHByb3BzID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgbGV0IGl0ZW06IGFueSA9IHRoaXMub2JqO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZW0gPSBpdGVtW3Byb3BzW2ldXTtcbiAgICAgIGlmICh0aGlzLmNoZWNrKGl0ZW0pID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cblxuICBjaGVjayh0aGluZzogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaW5nICE9PSB2b2lkIDA7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbihvYmo6IGFueSkge1xuICByZXR1cm4gbmV3IENhbihvYmopO1xufVxuXG4vLyBBc3N1bWVzIGRhdGEgaXMgYWxyZWFkeSBzb3J0ZWRcbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlTZWFyY2g8VD4oaXRlbTogVCwgYXJyYXk6IFRbXSwgY29tcGFyZTogKGE6IFQsIGI6IFQpID0+IDEgfCAtMSB8IDAgfCB1bmRlZmluZWQpOiBUIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIHNlYXJjaCgwLCBhcnJheS5sZW5ndGggLSAxKTtcblxuICBmdW5jdGlvbiBzZWFyY2gobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogVCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKG1pbiA+IG1heCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgZ3Vlc3MgPSBtaW4gKyBNYXRoLmZsb29yKChtYXggLSBtaW4pIC8gMik7XG4gICAgY29uc3QgY29tcGFyaXNvbiA9IGNvbXBhcmUoaXRlbSwgYXJyYXlbZ3Vlc3NdKTtcblxuICAgIGlmIChjb21wYXJpc29uID09PSAwKSB7XG4gICAgICByZXR1cm4gYXJyYXlbZ3Vlc3NdO1xuICAgIH0gZWxzZSBpZiAoY29tcGFyaXNvbiA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBzZWFyY2gobWluLCBndWVzcyAtIDEpO1xuICAgIH0gZWxzZSBpZiAoY29tcGFyaXNvbiA9PT0gMSkge1xuICAgICAgcmV0dXJuIHNlYXJjaChndWVzcyArIDEsIG1heCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW5wdXQgbWlzbWF0Y2g6ICR7SlNPTi5zdHJpbmdpZnkoaXRlbSl9IG5vdCBjb21wYXJhYmxlIHRvICR7SlNPTi5zdHJpbmdpZnkoYXJyYXlbZ3Vlc3NdKX1gKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==