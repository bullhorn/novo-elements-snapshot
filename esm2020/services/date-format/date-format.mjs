// NG2
import { Injectable } from '@angular/core';
import { MaskedEnum, MaskedRange } from 'imask';
import { DateUtil, Helpers } from 'novo-elements/utils';
import { NovoLabelService } from '../labels/novo-label-service';
import * as i0 from "@angular/core";
import * as i1 from "../labels/novo-label-service";
export class DateFormatService {
    constructor(labels) {
        this.labels = labels;
    }
    getTimeMask(militaryTime) {
        const amFormat = this.labels.timeFormatAM.toUpperCase();
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        const mask = {
            mask: Date,
            pattern: militaryTime ? 'HH:mm' : 'hh:mm aa',
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1970, 0, 1),
            max: new Date(2030, 0, 1),
            prepare(str) {
                return str.toUpperCase();
            },
            format(date) {
                return DateUtil.format(date, militaryTime ? 'HH:mm' : 'hh:mm A');
            },
            parse: (str) => {
                const time = militaryTime ? str : this.convertTime12to24(str);
                return DateUtil.parse(`${DateUtil.format(Date.now(), 'YYYY-MM-DD')}T${time}`);
            },
            blocks: {
                HH: {
                    mask: MaskedRange,
                    placeholderChar: 'H',
                    maxLength: 2,
                    from: 0,
                    to: 23,
                },
                hh: {
                    mask: MaskedRange,
                    placeholderChar: 'h',
                    maxLength: 2,
                    from: 1,
                    to: 12,
                },
                mm: {
                    mask: MaskedRange,
                    placeholderChar: 'm',
                    maxLength: 2,
                    from: 0,
                    to: 59,
                },
                aa: {
                    mask: MaskedEnum,
                    placeholderChar: 'x',
                    enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
                },
            },
        };
        return mask;
    }
    getDateMask(format) {
        const mask = {
            mask: Date,
            pattern: 'm/`d/`Y',
            overwrite: true,
            autofix: 'pad',
            min: new Date(1970, 0, 1),
            max: new Date(2030, 0, 1),
            prepare(str) {
                return str.toUpperCase();
            },
            format(date) {
                return DateUtil.format(date, format || 'MM/DD/YYYY');
            },
            parse: (str) => {
                return DateUtil.parse(str);
            },
        };
        return mask;
    }
    getDateTimeMask(militaryTime = false) {
        return [this.getDateMask(), /\,?/, /\s/, this.getTimeMask(militaryTime)];
    }
    getTimePlaceHolder(militaryTime) {
        if (militaryTime) {
            return this.labels.timeFormatPlaceholder24Hour;
        }
        return this.labels.timeFormatPlaceholderAM;
    }
    parseDateString(dateString) {
        let dateFormat = this.labels.dateFormatString();
        const dateFormatRegex = /(\w+)[\/|\.|\-](\w+)[\/|\.|\-](\w+)/gi;
        const dateValueRegex = /(\d+)[\/|\.|\-](\d+)[\/|\.|\-](\d+)/gi;
        let dateFormatTokens;
        let dateValueTokens;
        let year;
        let month;
        let day;
        let date = null;
        let isInvalidDate = true;
        if (Helpers.isEmpty(dateFormat)) {
            // Default to MM/dd/yyyy
            dateFormat = 'mm/dd/yyyy';
        }
        else {
            dateFormat = dateFormat.toLowerCase();
        }
        dateFormatTokens = dateFormatRegex.exec(dateFormat);
        dateValueTokens = dateValueRegex.exec(dateString);
        if (dateFormatTokens && dateFormatTokens.length === 4 && dateValueTokens && dateValueTokens.length === 4) {
            for (let i = 1; i < 4; i++) {
                if (dateFormatTokens[i].includes('m')) {
                    month = parseInt(dateValueTokens[i], 10) - 1;
                }
                else if (dateFormatTokens[i].includes('d')) {
                    day = parseInt(dateValueTokens[i], 10);
                }
                else {
                    year = parseInt(dateValueTokens[i], 10);
                }
            }
            if (month >= 0 && month <= 11 && year > 1900 && day > 0 && day <= 31) {
                date = new Date(year, month, day);
                isInvalidDate = false;
            }
        }
        else if (dateFormatTokens && dateFormatTokens.length === 4 && dateString.length >= 1) {
            const twoTokens = /\d{1,4}(\/|\.|\-)(\d{1,2})/.exec(dateString);
            const oneToken = /^(\d{1,4})$/.exec(dateString);
            const delimiter = /\w+(\/|\.|\-)\w+[\/|\.|\-]\w+/gi.exec(dateFormat);
            const dateStringWithDelimiter = dateString[dateString.length - 1].match(/\/|\.|\-/);
            if (twoTokens && twoTokens.length === 3 && this.isValidDatePart(twoTokens[2], dateFormatTokens[2]) && !dateStringWithDelimiter) {
                dateString = `${dateString}${delimiter[1]}`;
            }
            else if (oneToken && oneToken.length === 2 && this.isValidDatePart(oneToken[1], dateFormatTokens[1]) && !dateStringWithDelimiter) {
                dateString = `${dateString}${delimiter[1]}`;
            }
        }
        return [date, dateString, isInvalidDate];
    }
    parseTimeString(timeString, militaryTime) {
        const value = new Date();
        let timeStringParts;
        let amFormat = this.labels.timeFormatAM;
        let pmFormat = this.labels.timeFormatPM;
        if (!(timeString && timeString.includes(':'))) {
            return [value, timeString];
        }
        if (!militaryTime && amFormat && pmFormat) {
            let splits = [];
            let pm = false;
            amFormat = this.labels.timeFormatAM.toLowerCase();
            pmFormat = this.labels.timeFormatPM.toLowerCase();
            timeString = timeString.toLowerCase();
            if (timeString.includes(amFormat)) {
                splits = timeString.split(amFormat);
            }
            else if (timeString.includes(pmFormat)) {
                splits = timeString.split(pmFormat);
                pm = true;
            }
            if (splits && splits.length) {
                for (const item of splits) {
                    if (item && item.trim().includes(':')) {
                        timeStringParts = item.trim().split(':');
                    }
                }
            }
            if (timeStringParts && timeStringParts.length && timeStringParts.length === 2) {
                let hours = parseInt(timeStringParts[0], 10);
                if (hours === 12 && pm) {
                    hours = 12;
                }
                else if (pm) {
                    hours = hours + 12;
                }
                else if (hours === 12) {
                    hours = 0;
                }
                value.setHours(hours);
                value.setMinutes(parseInt(timeStringParts[1], 10));
                value.setSeconds(0);
            }
        }
        else {
            timeStringParts = /(\d{1,2}):(\d{2})/.exec(timeString);
            if (timeStringParts && timeStringParts.length && timeStringParts.length === 3) {
                value.setHours(parseInt(timeStringParts[1], 10));
                value.setMinutes(parseInt(timeStringParts[2], 10));
                value.setSeconds(0);
            }
        }
        return [value, timeString];
    }
    parseString(dateTimeString, militaryTime, type) {
        switch (type) {
            case 'datetime':
                const str = dateTimeString.replace(/-/g, '/');
                const parts = str.split(' ');
                const [dt, dts] = this.parseDateString(parts[0]);
                if (parts.length > 1) {
                    const [tm, tms] = this.parseTimeString(parts[1], militaryTime);
                    return [new Date(dt.setHours(tm.getHours(), tm.getMinutes())), `${dts} ${tms}`];
                }
                return [dt, dts];
            case 'date':
                return this.parseDateString(dateTimeString);
            case 'time':
                return this.parseTimeString(dateTimeString, militaryTime);
            default:
                return;
        }
    }
    convertTime12to24(time12h) {
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (['PM', pmFormat].includes(modifier)) {
            hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
        }
        return `${hours}:${minutes}`;
    }
    isValidDatePart(value, format) {
        const datePart = parseInt(value, 10);
        if (format.includes('m') && (datePart >= 2 || value.length === 2)) {
            return true;
        }
        else if (format.includes('d') && (datePart >= 4 || value.length === 2)) {
            return true;
        }
        else if (format.includes('y') && datePart >= 1000) {
            return true;
        }
        return false;
    }
}
DateFormatService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateFormatService, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Injectable });
DateFormatService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateFormatService, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateFormatService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9zZXJ2aWNlcy9kYXRlLWZvcm1hdC9kYXRlLWZvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7QUFLaEUsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFvQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFHLENBQUM7SUFFakQsV0FBVyxDQUFDLFlBQXFCO1FBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hELE1BQU0sSUFBSSxHQUFHO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVU7WUFDNUMsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxLQUFLO1lBQ1gsR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRztnQkFD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QUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQzNDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDeEUsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ25ELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OytHQXRPVSxpQkFBaUI7bUhBQWpCLGlCQUFpQixjQUZoQixNQUFNOzRGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hc2tlZEVudW0sIE1hc2tlZFJhbmdlIH0gZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi9sYWJlbHMvbm92by1sYWJlbC1zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBgcm9vdGAsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVGb3JtYXRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiBnZXRUaW1lTWFzayhtaWxpdGFyeVRpbWU6IGJvb2xlYW4pIHtcbiAgY29uc3QgYW1Gb3JtYXQgPSB0aGlzLmxhYmVscy50aW1lRm9ybWF0QU0udG9VcHBlckNhc2UoKTtcbiAgY29uc3QgcG1Gb3JtYXQgPSB0aGlzLmxhYmVscy50aW1lRm9ybWF0UE0udG9VcHBlckNhc2UoKTtcbiAgY29uc3QgbWFzayA9IHtcbiAgICBtYXNrOiBEYXRlLFxuICAgIHBhdHRlcm46IG1pbGl0YXJ5VGltZSA/ICdISDptbScgOiAnaGg6bW0gYWEnLFxuICAgIG92ZXJ3cml0ZTogdHJ1ZSxcbiAgICBhdXRvZml4OiB0cnVlLFxuICAgIGxhenk6IGZhbHNlLFxuICAgIG1pbjogbmV3IERhdGUoMTk3MCwgMCwgMSksXG4gICAgbWF4OiBuZXcgRGF0ZSgyMDMwLCAwLCAxKSxcbiAgICBwcmVwYXJlKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci50b1VwcGVyQ2FzZSgpO1xuICAgIH0sXG4gICAgZm9ybWF0KGRhdGUpIHtcbiAgICAgIHJldHVybiBEYXRlVXRpbC5mb3JtYXQoZGF0ZSwgbWlsaXRhcnlUaW1lID8gJ0hIOm1tJyA6ICdoaDptbSBBJyk7XG4gICAgfSxcbiAgICBwYXJzZTogKHN0cikgPT4ge1xuICAgICAgY29uc3QgdGltZSA9IG1pbGl0YXJ5VGltZSA/IHN0ciA6IHRoaXMuY29udmVydFRpbWUxMnRvMjQoc3RyKTtcbiAgICAgIHJldHVybiBEYXRlVXRpbC5wYXJzZShgJHtEYXRlVXRpbC5mb3JtYXQoRGF0ZS5ub3coKSwgJ1lZWVktTU0tREQnKX1UJHt0aW1lfWApO1xuICAgIH0sXG4gICAgYmxvY2tzOiB7XG4gICAgICBISDoge1xuICAgICAgICBtYXNrOiBNYXNrZWRSYW5nZSxcbiAgICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnSCcsXG4gICAgICAgIG1heExlbmd0aDogMixcbiAgICAgICAgZnJvbTogMCxcbiAgICAgICAgdG86IDIzLFxuICAgICAgfSxcbiAgICAgIGhoOiB7XG4gICAgICAgIG1hc2s6IE1hc2tlZFJhbmdlLFxuICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICdoJyxcbiAgICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgICAgICBmcm9tOiAxLFxuICAgICAgICB0bzogMTIsXG4gICAgICB9LFxuICAgICAgbW06IHtcbiAgICAgICAgbWFzazogTWFza2VkUmFuZ2UsXG4gICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ20nLFxuICAgICAgICBtYXhMZW5ndGg6IDIsXG4gICAgICAgIGZyb206IDAsXG4gICAgICAgIHRvOiA1OSxcbiAgICAgIH0sXG4gICAgICBhYToge1xuICAgICAgICBtYXNrOiBNYXNrZWRFbnVtLFxuICAgICAgICBwbGFjZWhvbGRlckNoYXI6ICd4JyxcbiAgICAgICAgZW51bTogWydBTScsICdQTScsICdhbScsICdwbScsIGFtRm9ybWF0LCBwbUZvcm1hdF0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBtYXNrO1xuIH1cblxuICBnZXREYXRlTWFzayhmb3JtYXQ/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBtYXNrID0ge1xuICAgICAgbWFzazogRGF0ZSxcbiAgICAgIHBhdHRlcm46ICdtL2BkL2BZJyxcbiAgICAgIG92ZXJ3cml0ZTogdHJ1ZSxcbiAgICAgIGF1dG9maXg6ICdwYWQnLFxuICAgICAgbWluOiBuZXcgRGF0ZSgxOTcwLCAwLCAxKSxcbiAgICAgIG1heDogbmV3IERhdGUoMjAzMCwgMCwgMSksXG4gICAgICBwcmVwYXJlKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9LFxuICAgICAgZm9ybWF0KGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIERhdGVVdGlsLmZvcm1hdChkYXRlLCBmb3JtYXQgfHwgJ01NL0REL1lZWVknKTtcbiAgICAgIH0sXG4gICAgICBwYXJzZTogKHN0cikgPT4ge1xuICAgICAgICByZXR1cm4gRGF0ZVV0aWwucGFyc2Uoc3RyKTtcbiAgICAgIH0sXG4gICAgfVxuICAgIHJldHVybiBtYXNrO1xuICB9XG5cbiAgZ2V0RGF0ZVRpbWVNYXNrKG1pbGl0YXJ5VGltZTogYm9vbGVhbiA9IGZhbHNlKTogQXJyYXk8YW55PiB7XG4gICAgcmV0dXJuIFt0aGlzLmdldERhdGVNYXNrKCksIC9cXCw/LywgL1xccy8sIHRoaXMuZ2V0VGltZU1hc2sobWlsaXRhcnlUaW1lKV07XG4gIH1cblxuICBnZXRUaW1lUGxhY2VIb2xkZXIobWlsaXRhcnlUaW1lOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAobWlsaXRhcnlUaW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYWJlbHMudGltZUZvcm1hdFBsYWNlaG9sZGVyMjRIb3VyO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sYWJlbHMudGltZUZvcm1hdFBsYWNlaG9sZGVyQU07XG4gIH1cblxuICBwYXJzZURhdGVTdHJpbmcoZGF0ZVN0cmluZzogc3RyaW5nKTogW0RhdGUsIHN0cmluZywgYm9vbGVhbl0ge1xuICAgIGxldCBkYXRlRm9ybWF0OiBzdHJpbmcgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0U3RyaW5nKCk7XG4gICAgY29uc3QgZGF0ZUZvcm1hdFJlZ2V4ID0gLyhcXHcrKVtcXC98XFwufFxcLV0oXFx3KylbXFwvfFxcLnxcXC1dKFxcdyspL2dpO1xuICAgIGNvbnN0IGRhdGVWYWx1ZVJlZ2V4ID0gLyhcXGQrKVtcXC98XFwufFxcLV0oXFxkKylbXFwvfFxcLnxcXC1dKFxcZCspL2dpO1xuICAgIGxldCBkYXRlRm9ybWF0VG9rZW5zOiBBcnJheTxzdHJpbmc+O1xuICAgIGxldCBkYXRlVmFsdWVUb2tlbnM6IEFycmF5PHN0cmluZz47XG4gICAgbGV0IHllYXI6IG51bWJlcjtcbiAgICBsZXQgbW9udGg6IG51bWJlcjtcbiAgICBsZXQgZGF5OiBudW1iZXI7XG4gICAgbGV0IGRhdGU6IERhdGUgPSBudWxsO1xuICAgIGxldCBpc0ludmFsaWREYXRlID0gdHJ1ZTtcbiAgICBpZiAoSGVscGVycy5pc0VtcHR5KGRhdGVGb3JtYXQpKSB7XG4gICAgICAvLyBEZWZhdWx0IHRvIE1NL2RkL3l5eXlcbiAgICAgIGRhdGVGb3JtYXQgPSAnbW0vZGQveXl5eSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0LnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIGRhdGVGb3JtYXRUb2tlbnMgPSBkYXRlRm9ybWF0UmVnZXguZXhlYyhkYXRlRm9ybWF0KTtcbiAgICBkYXRlVmFsdWVUb2tlbnMgPSBkYXRlVmFsdWVSZWdleC5leGVjKGRhdGVTdHJpbmcpO1xuICAgIGlmIChkYXRlRm9ybWF0VG9rZW5zICYmIGRhdGVGb3JtYXRUb2tlbnMubGVuZ3RoID09PSA0ICYmIGRhdGVWYWx1ZVRva2VucyAmJiBkYXRlVmFsdWVUb2tlbnMubGVuZ3RoID09PSA0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKykge1xuICAgICAgICBpZiAoZGF0ZUZvcm1hdFRva2Vuc1tpXS5pbmNsdWRlcygnbScpKSB7XG4gICAgICAgICAgbW9udGggPSBwYXJzZUludChkYXRlVmFsdWVUb2tlbnNbaV0sIDEwKSAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0ZUZvcm1hdFRva2Vuc1tpXS5pbmNsdWRlcygnZCcpKSB7XG4gICAgICAgICAgZGF5ID0gcGFyc2VJbnQoZGF0ZVZhbHVlVG9rZW5zW2ldLCAxMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeWVhciA9IHBhcnNlSW50KGRhdGVWYWx1ZVRva2Vuc1tpXSwgMTApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobW9udGggPj0gMCAmJiBtb250aCA8PSAxMSAmJiB5ZWFyID4gMTkwMCAmJiBkYXkgPiAwICYmIGRheSA8PSAzMSkge1xuICAgICAgICBkYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgIGlzSW52YWxpZERhdGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRhdGVGb3JtYXRUb2tlbnMgJiYgZGF0ZUZvcm1hdFRva2Vucy5sZW5ndGggPT09IDQgJiYgZGF0ZVN0cmluZy5sZW5ndGggPj0gMSkge1xuICAgICAgY29uc3QgdHdvVG9rZW5zID0gL1xcZHsxLDR9KFxcL3xcXC58XFwtKShcXGR7MSwyfSkvLmV4ZWMoZGF0ZVN0cmluZyk7XG4gICAgICBjb25zdCBvbmVUb2tlbiA9IC9eKFxcZHsxLDR9KSQvLmV4ZWMoZGF0ZVN0cmluZyk7XG4gICAgICBjb25zdCBkZWxpbWl0ZXIgPSAvXFx3KyhcXC98XFwufFxcLSlcXHcrW1xcL3xcXC58XFwtXVxcdysvZ2kuZXhlYyhkYXRlRm9ybWF0KTtcbiAgICAgIGNvbnN0IGRhdGVTdHJpbmdXaXRoRGVsaW1pdGVyID0gZGF0ZVN0cmluZ1tkYXRlU3RyaW5nLmxlbmd0aCAtIDFdLm1hdGNoKC9cXC98XFwufFxcLS8pO1xuICAgICAgaWYgKHR3b1Rva2VucyAmJiB0d29Ub2tlbnMubGVuZ3RoID09PSAzICYmIHRoaXMuaXNWYWxpZERhdGVQYXJ0KHR3b1Rva2Vuc1syXSwgZGF0ZUZvcm1hdFRva2Vuc1syXSkgJiYgIWRhdGVTdHJpbmdXaXRoRGVsaW1pdGVyKSB7XG4gICAgICAgIGRhdGVTdHJpbmcgPSBgJHtkYXRlU3RyaW5nfSR7ZGVsaW1pdGVyWzFdfWA7XG4gICAgICB9IGVsc2UgaWYgKG9uZVRva2VuICYmIG9uZVRva2VuLmxlbmd0aCA9PT0gMiAmJiB0aGlzLmlzVmFsaWREYXRlUGFydChvbmVUb2tlblsxXSwgZGF0ZUZvcm1hdFRva2Vuc1sxXSkgJiYgIWRhdGVTdHJpbmdXaXRoRGVsaW1pdGVyKSB7XG4gICAgICAgIGRhdGVTdHJpbmcgPSBgJHtkYXRlU3RyaW5nfSR7ZGVsaW1pdGVyWzFdfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbZGF0ZSwgZGF0ZVN0cmluZywgaXNJbnZhbGlkRGF0ZV07XG4gIH1cblxuICBwYXJzZVRpbWVTdHJpbmcodGltZVN0cmluZzogc3RyaW5nLCBtaWxpdGFyeVRpbWU6IGJvb2xlYW4pOiBbRGF0ZSwgc3RyaW5nXSB7XG4gICAgY29uc3QgdmFsdWU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCB0aW1lU3RyaW5nUGFydHM6IEFycmF5PHN0cmluZz47XG4gICAgbGV0IGFtRm9ybWF0ID0gdGhpcy5sYWJlbHMudGltZUZvcm1hdEFNO1xuICAgIGxldCBwbUZvcm1hdCA9IHRoaXMubGFiZWxzLnRpbWVGb3JtYXRQTTtcbiAgICBpZiAoISh0aW1lU3RyaW5nICYmIHRpbWVTdHJpbmcuaW5jbHVkZXMoJzonKSkpIHtcbiAgICAgIHJldHVybiBbdmFsdWUsIHRpbWVTdHJpbmddO1xuICAgIH1cbiAgICBpZiAoIW1pbGl0YXJ5VGltZSAmJiBhbUZvcm1hdCAmJiBwbUZvcm1hdCkge1xuICAgICAgbGV0IHNwbGl0czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgbGV0IHBtOiBib29sZWFuID0gZmFsc2U7XG4gICAgICBhbUZvcm1hdCA9IHRoaXMubGFiZWxzLnRpbWVGb3JtYXRBTS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcG1Gb3JtYXQgPSB0aGlzLmxhYmVscy50aW1lRm9ybWF0UE0udG9Mb3dlckNhc2UoKTtcbiAgICAgIHRpbWVTdHJpbmcgPSB0aW1lU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAodGltZVN0cmluZy5pbmNsdWRlcyhhbUZvcm1hdCkpIHtcbiAgICAgICAgc3BsaXRzID0gdGltZVN0cmluZy5zcGxpdChhbUZvcm1hdCk7XG4gICAgICB9IGVsc2UgaWYgKHRpbWVTdHJpbmcuaW5jbHVkZXMocG1Gb3JtYXQpKSB7XG4gICAgICAgIHNwbGl0cyA9IHRpbWVTdHJpbmcuc3BsaXQocG1Gb3JtYXQpO1xuICAgICAgICBwbSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoc3BsaXRzICYmIHNwbGl0cy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHNwbGl0cykge1xuICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0udHJpbSgpLmluY2x1ZGVzKCc6JykpIHtcbiAgICAgICAgICAgIHRpbWVTdHJpbmdQYXJ0cyA9IGl0ZW0udHJpbSgpLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGltZVN0cmluZ1BhcnRzICYmIHRpbWVTdHJpbmdQYXJ0cy5sZW5ndGggJiYgdGltZVN0cmluZ1BhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBsZXQgaG91cnM6IG51bWJlciA9IHBhcnNlSW50KHRpbWVTdHJpbmdQYXJ0c1swXSwgMTApO1xuICAgICAgICBpZiAoaG91cnMgPT09IDEyICYmIHBtKSB7XG4gICAgICAgICAgaG91cnMgPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmIChwbSkge1xuICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcbiAgICAgICAgfSBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICAgICAgICBob3VycyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUuc2V0SG91cnMoaG91cnMpO1xuICAgICAgICB2YWx1ZS5zZXRNaW51dGVzKHBhcnNlSW50KHRpbWVTdHJpbmdQYXJ0c1sxXSwgMTApKTtcbiAgICAgICAgdmFsdWUuc2V0U2Vjb25kcygwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGltZVN0cmluZ1BhcnRzID0gLyhcXGR7MSwyfSk6KFxcZHsyfSkvLmV4ZWModGltZVN0cmluZyk7XG4gICAgICBpZiAodGltZVN0cmluZ1BhcnRzICYmIHRpbWVTdHJpbmdQYXJ0cy5sZW5ndGggJiYgdGltZVN0cmluZ1BhcnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICB2YWx1ZS5zZXRIb3VycyhwYXJzZUludCh0aW1lU3RyaW5nUGFydHNbMV0sIDEwKSk7XG4gICAgICAgIHZhbHVlLnNldE1pbnV0ZXMocGFyc2VJbnQodGltZVN0cmluZ1BhcnRzWzJdLCAxMCkpO1xuICAgICAgICB2YWx1ZS5zZXRTZWNvbmRzKDApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW3ZhbHVlLCB0aW1lU3RyaW5nXTtcbiAgfVxuXG4gIHBhcnNlU3RyaW5nKGRhdGVUaW1lU3RyaW5nOiBzdHJpbmcsIG1pbGl0YXJ5VGltZTogYm9vbGVhbiwgdHlwZTogc3RyaW5nKTogW0RhdGUsIHN0cmluZywgYm9vbGVhbj9dIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgICAgY29uc3Qgc3RyID0gZGF0ZVRpbWVTdHJpbmcucmVwbGFjZSgvLS9nLCAnLycpO1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHN0ci5zcGxpdCgnICcpO1xuICAgICAgICBjb25zdCBbZHQsIGR0c10gPSB0aGlzLnBhcnNlRGF0ZVN0cmluZyhwYXJ0c1swXSk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3QgW3RtLCB0bXNdID0gdGhpcy5wYXJzZVRpbWVTdHJpbmcocGFydHNbMV0sIG1pbGl0YXJ5VGltZSk7XG4gICAgICAgICAgcmV0dXJuIFtuZXcgRGF0ZShkdC5zZXRIb3Vycyh0bS5nZXRIb3VycygpLCB0bS5nZXRNaW51dGVzKCkpKSwgYCR7ZHRzfSAke3Rtc31gXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2R0LCBkdHNdO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlRGF0ZVN0cmluZyhkYXRlVGltZVN0cmluZyk7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VUaW1lU3RyaW5nKGRhdGVUaW1lU3RyaW5nLCBtaWxpdGFyeVRpbWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRUaW1lMTJ0bzI0KHRpbWUxMmg6IHN0cmluZykge1xuICAgIGNvbnN0IHBtRm9ybWF0ID0gdGhpcy5sYWJlbHMudGltZUZvcm1hdFBNLnRvVXBwZXJDYXNlKCk7XG5cbiAgICBjb25zdCBbdGltZSwgbW9kaWZpZXJdID0gdGltZTEyaC5zcGxpdCgnICcpO1xuICAgIGxldCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZS5zcGxpdCgnOicpO1xuICAgIGlmIChob3VycyA9PT0gJzEyJykge1xuICAgICAgaG91cnMgPSAnMDAnO1xuICAgIH1cbiAgICBpZiAoWydQTScsIHBtRm9ybWF0XS5pbmNsdWRlcyhtb2RpZmllcikpIHtcbiAgICAgIGhvdXJzID0gYCR7cGFyc2VJbnQoaG91cnMsIDEwKSArIDEyfWAucGFkU3RhcnQoMiwgJzAnKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9YDtcbiAgfVxuXG4gIGlzVmFsaWREYXRlUGFydCh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGVQYXJ0ID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICBpZiAoZm9ybWF0LmluY2x1ZGVzKCdtJykgJiYgKGRhdGVQYXJ0ID49IDIgfHwgdmFsdWUubGVuZ3RoID09PSAyKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChmb3JtYXQuaW5jbHVkZXMoJ2QnKSAmJiAoZGF0ZVBhcnQgPj0gNCB8fCB2YWx1ZS5sZW5ndGggPT09IDIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmNsdWRlcygneScpICYmIGRhdGVQYXJ0ID49IDEwMDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==