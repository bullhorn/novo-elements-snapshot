// NG2
import { Injectable } from '@angular/core';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
export class DateFormatService {
    constructor(labels) {
        this.labels = labels;
    }
    getTimeMask(militaryTime) {
        let mask = [/\d/, /\d/, /:/, /\d/, /\d/];
        let timeFormatArray = [];
        const timeFormat = this.labels.timeFormatPlaceholderAM.toLowerCase();
        if (militaryTime) {
            return mask;
        }
        else {
            timeFormatArray = timeFormat.split('hh:mm');
            if (timeFormatArray && timeFormatArray.length) {
                mask = [];
                for (const timeFormatPart of timeFormatArray) {
                    if (timeFormatPart === '') {
                        mask = mask.concat([/\d/, /\d|:/, /:|\d/, /\d|\w|\s/, /\d|\s|\w/]);
                    }
                    else if (timeFormatPart.length) {
                        for (let i = 0; i < timeFormatPart.length; i++) {
                            mask.push(/\s|\w|\d|\./);
                        }
                    }
                }
            }
        }
        return mask;
    }
    getDateMask() {
        return [/\d/, /\d|\/|\.|\-/, /\/|\.|\-|\d/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d|\/|\.|\-/, /\d/, /\d/];
    }
    getDateTimeMask(militaryTime = false) {
        return [...this.getDateMask(), /\,?/, /\s/, ...this.getTimeMask(militaryTime)];
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
        let date = new Date();
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
        return [date, dateString];
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
DateFormatService.ɵfac = function DateFormatService_Factory(t) { return new (t || DateFormatService)(i0.ɵɵinject(i1.NovoLabelService)); };
DateFormatService.ɵprov = i0.ɵɵdefineInjectable({ token: DateFormatService, factory: DateFormatService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DateFormatService, [{
        type: Injectable
    }], function () { return [{ type: i1.NovoLabelService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9kYXRlLWZvcm1hdC9EYXRlRm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQUdyRSxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQW9CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUksQ0FBQztJQUVqRCxXQUFXLENBQUMsWUFBcUI7UUFDL0IsSUFBSSxJQUFJLEdBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELElBQUksZUFBZSxHQUFrQixFQUFFLENBQUM7UUFDeEMsTUFBTSxVQUFVLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3RSxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxlQUFlLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLGVBQWUsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFO2dCQUM3QyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNWLEtBQUssTUFBTSxjQUFjLElBQUksZUFBZSxFQUFFO29CQUM1QyxJQUFJLGNBQWMsS0FBSyxFQUFFLEVBQUU7d0JBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxD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LEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkIsS0FBSyxNQUFNO2dCQUNULE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM5QyxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM1RDtnQkFDRSxPQUFPO1NBQ1Y7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQzNDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDeEUsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ25ELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2tGQXhLVSxpQkFBaUI7eURBQWpCLGlCQUFpQixXQUFqQixpQkFBaUI7a0RBQWpCLGlCQUFpQjtjQUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZUZvcm1hdFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkgeyB9XG5cbiAgZ2V0VGltZU1hc2sobWlsaXRhcnlUaW1lOiBib29sZWFuKTogQXJyYXk8UmVnRXhwPiB7XG4gICAgbGV0IG1hc2s6IEFycmF5PFJlZ0V4cD4gPSBbL1xcZC8sIC9cXGQvLCAvOi8sIC9cXGQvLCAvXFxkL107XG4gICAgbGV0IHRpbWVGb3JtYXRBcnJheTogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGNvbnN0IHRpbWVGb3JtYXQ6IHN0cmluZyA9IHRoaXMubGFiZWxzLnRpbWVGb3JtYXRQbGFjZWhvbGRlckFNLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG1pbGl0YXJ5VGltZSkge1xuICAgICAgcmV0dXJuIG1hc2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWVGb3JtYXRBcnJheSA9IHRpbWVGb3JtYXQuc3BsaXQoJ2hoOm1tJyk7XG4gICAgICBpZiAodGltZUZvcm1hdEFycmF5ICYmIHRpbWVGb3JtYXRBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgbWFzayA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHRpbWVGb3JtYXRQYXJ0IG9mIHRpbWVGb3JtYXRBcnJheSkge1xuICAgICAgICAgIGlmICh0aW1lRm9ybWF0UGFydCA9PT0gJycpIHtcbiAgICAgICAgICAgIG1hc2sgPSBtYXNrLmNvbmNhdChbL1xcZC8sIC9cXGR8Oi8sIC86fFxcZC8sIC9cXGR8XFx3fFxccy8sIC9cXGR8XFxzfFxcdy9dKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRpbWVGb3JtYXRQYXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lRm9ybWF0UGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBtYXNrLnB1c2goL1xcc3xcXHd8XFxkfFxcLi8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFzaztcbiAgfVxuXG4gIGdldERhdGVNYXNrKCk6IEFycmF5PFJlZ0V4cD4ge1xuICAgIHJldHVybiBbL1xcZC8sIC9cXGR8XFwvfFxcLnxcXC0vLCAvXFwvfFxcLnxcXC18XFxkLywgL1xcZHxcXC98XFwufFxcLS8sIC9cXGR8XFwvfFxcLnxcXC0vLCAvXFxkfFxcL3xcXC58XFwtLywgL1xcZHxcXC98XFwufFxcLS8sIC9cXGR8XFwvfFxcLnxcXC0vLCAvXFxkLywgL1xcZC9dO1xuICB9XG5cbiAgZ2V0RGF0ZVRpbWVNYXNrKG1pbGl0YXJ5VGltZTogYm9vbGVhbiA9IGZhbHNlKTogQXJyYXk8UmVnRXhwPiB7XG4gICAgcmV0dXJuIFsuLi50aGlzLmdldERhdGVNYXNrKCksIC9cXCw/LywgL1xccy8sIC4uLnRoaXMuZ2V0VGltZU1hc2sobWlsaXRhcnlUaW1lKV07XG4gIH1cblxuICBnZXRUaW1lUGxhY2VIb2xkZXIobWlsaXRhcnlUaW1lOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAobWlsaXRhcnlUaW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYWJlbHMudGltZUZvcm1hdFBsYWNlaG9sZGVyMjRIb3VyO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sYWJlbHMudGltZUZvcm1hdFBsYWNlaG9sZGVyQU07XG4gIH1cblxuICBwYXJzZURhdGVTdHJpbmcoZGF0ZVN0cmluZzogc3RyaW5nKTogW0RhdGUsIHN0cmluZ10ge1xuICAgIGxldCBkYXRlRm9ybWF0OiBzdHJpbmcgPSB0aGlzLmxhYmVscy5kYXRlRm9ybWF0U3RyaW5nKCk7XG4gICAgY29uc3QgZGF0ZUZvcm1hdFJlZ2V4ID0gLyhcXHcrKVtcXC98XFwufFxcLV0oXFx3KylbXFwvfFxcLnxcXC1dKFxcdyspL2dpO1xuICAgIGNvbnN0IGRhdGVWYWx1ZVJlZ2V4ID0gLyhcXGQrKVtcXC98XFwufFxcLV0oXFxkKylbXFwvfFxcLnxcXC1dKFxcZCspL2dpO1xuICAgIGxldCBkYXRlRm9ybWF0VG9rZW5zOiBBcnJheTxzdHJpbmc+O1xuICAgIGxldCBkYXRlVmFsdWVUb2tlbnM6IEFycmF5PHN0cmluZz47XG4gICAgbGV0IHllYXI6IG51bWJlcjtcbiAgICBsZXQgbW9udGg6IG51bWJlcjtcbiAgICBsZXQgZGF5OiBudW1iZXI7XG4gICAgbGV0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGlmIChIZWxwZXJzLmlzRW1wdHkoZGF0ZUZvcm1hdCkpIHtcbiAgICAgIC8vIERlZmF1bHQgdG8gTU0vZGQveXl5eVxuICAgICAgZGF0ZUZvcm1hdCA9ICdtbS9kZC95eXl5JztcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZUZvcm1hdCA9IGRhdGVGb3JtYXQudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgZGF0ZUZvcm1hdFRva2VucyA9IGRhdGVGb3JtYXRSZWdleC5leGVjKGRhdGVGb3JtYXQpO1xuICAgIGRhdGVWYWx1ZVRva2VucyA9IGRhdGVWYWx1ZVJlZ2V4LmV4ZWMoZGF0ZVN0cmluZyk7XG4gICAgaWYgKGRhdGVGb3JtYXRUb2tlbnMgJiYgZGF0ZUZvcm1hdFRva2Vucy5sZW5ndGggPT09IDQgJiYgZGF0ZVZhbHVlVG9rZW5zICYmIGRhdGVWYWx1ZVRva2Vucy5sZW5ndGggPT09IDQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGlmIChkYXRlRm9ybWF0VG9rZW5zW2ldLmluY2x1ZGVzKCdtJykpIHtcbiAgICAgICAgICBtb250aCA9IHBhcnNlSW50KGRhdGVWYWx1ZVRva2Vuc1tpXSwgMTApIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRlRm9ybWF0VG9rZW5zW2ldLmluY2x1ZGVzKCdkJykpIHtcbiAgICAgICAgICBkYXkgPSBwYXJzZUludChkYXRlVmFsdWVUb2tlbnNbaV0sIDEwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5ZWFyID0gcGFyc2VJbnQoZGF0ZVZhbHVlVG9rZW5zW2ldLCAxMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtb250aCA+PSAwICYmIG1vbnRoIDw9IDExICYmIHllYXIgPiAxOTAwICYmIGRheSA+IDAgJiYgZGF5IDw9IDMxKSB7XG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRhdGVGb3JtYXRUb2tlbnMgJiYgZGF0ZUZvcm1hdFRva2Vucy5sZW5ndGggPT09IDQgJiYgZGF0ZVN0cmluZy5sZW5ndGggPj0gMSkge1xuICAgICAgY29uc3QgdHdvVG9rZW5zID0gL1xcZHsxLDR9KFxcL3xcXC58XFwtKShcXGR7MSwyfSkvLmV4ZWMoZGF0ZVN0cmluZyk7XG4gICAgICBjb25zdCBvbmVUb2tlbiA9IC9eKFxcZHsxLDR9KSQvLmV4ZWMoZGF0ZVN0cmluZyk7XG4gICAgICBjb25zdCBkZWxpbWl0ZXIgPSAvXFx3KyhcXC98XFwufFxcLSlcXHcrW1xcL3xcXC58XFwtXVxcdysvZ2kuZXhlYyhkYXRlRm9ybWF0KTtcbiAgICAgIGNvbnN0IGRhdGVTdHJpbmdXaXRoRGVsaW1pdGVyID0gZGF0ZVN0cmluZ1tkYXRlU3RyaW5nLmxlbmd0aCAtIDFdLm1hdGNoKC9cXC98XFwufFxcLS8pO1xuICAgICAgaWYgKHR3b1Rva2VucyAmJiB0d29Ub2tlbnMubGVuZ3RoID09PSAzICYmIHRoaXMuaXNWYWxpZERhdGVQYXJ0KHR3b1Rva2Vuc1syXSwgZGF0ZUZvcm1hdFRva2Vuc1syXSkgJiYgIWRhdGVTdHJpbmdXaXRoRGVsaW1pdGVyKSB7XG4gICAgICAgIGRhdGVTdHJpbmcgPSBgJHtkYXRlU3RyaW5nfSR7ZGVsaW1pdGVyWzFdfWA7XG4gICAgICB9IGVsc2UgaWYgKG9uZVRva2VuICYmIG9uZVRva2VuLmxlbmd0aCA9PT0gMiAmJiB0aGlzLmlzVmFsaWREYXRlUGFydChvbmVUb2tlblsxXSwgZGF0ZUZvcm1hdFRva2Vuc1sxXSkgJiYgIWRhdGVTdHJpbmdXaXRoRGVsaW1pdGVyKSB7XG4gICAgICAgIGRhdGVTdHJpbmcgPSBgJHtkYXRlU3RyaW5nfSR7ZGVsaW1pdGVyWzFdfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbZGF0ZSwgZGF0ZVN0cmluZ107XG4gIH1cblxuICBwYXJzZVRpbWVTdHJpbmcodGltZVN0cmluZzogc3RyaW5nLCBtaWxpdGFyeVRpbWU6IGJvb2xlYW4pOiBbRGF0ZSwgc3RyaW5nXSB7XG4gICAgY29uc3QgdmFsdWU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCB0aW1lU3RyaW5nUGFydHM6IEFycmF5PHN0cmluZz47XG4gICAgbGV0IGFtRm9ybWF0ID0gdGhpcy5sYWJlbHMudGltZUZvcm1hdEFNO1xuICAgIGxldCBwbUZvcm1hdCA9IHRoaXMubGFiZWxzLnRpbWVGb3JtYXRQTTtcbiAgICBpZiAoISh0aW1lU3RyaW5nICYmIHRpbWVTdHJpbmcuaW5jbHVkZXMoJzonKSkpIHtcbiAgICAgIHJldHVybiBbdmFsdWUsIHRpbWVTdHJpbmddO1xuICAgIH1cbiAgICBpZiAoIW1pbGl0YXJ5VGltZSAmJiBhbUZvcm1hdCAmJiBwbUZvcm1hdCkge1xuICAgICAgbGV0IHNwbGl0czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgbGV0IHBtOiBib29sZWFuID0gZmFsc2U7XG4gICAgICBhbUZvcm1hdCA9IHRoaXMubGFiZWxzLnRpbWVGb3JtYXRBTS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcG1Gb3JtYXQgPSB0aGlzLmxhYmVscy50aW1lRm9ybWF0UE0udG9Mb3dlckNhc2UoKTtcbiAgICAgIHRpbWVTdHJpbmcgPSB0aW1lU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAodGltZVN0cmluZy5pbmNsdWRlcyhhbUZvcm1hdCkpIHtcbiAgICAgICAgc3BsaXRzID0gdGltZVN0cmluZy5zcGxpdChhbUZvcm1hdCk7XG4gICAgICB9IGVsc2UgaWYgKHRpbWVTdHJpbmcuaW5jbHVkZXMocG1Gb3JtYXQpKSB7XG4gICAgICAgIHNwbGl0cyA9IHRpbWVTdHJpbmcuc3BsaXQocG1Gb3JtYXQpO1xuICAgICAgICBwbSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoc3BsaXRzICYmIHNwbGl0cy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHNwbGl0cykge1xuICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0udHJpbSgpLmluY2x1ZGVzKCc6JykpIHtcbiAgICAgICAgICAgIHRpbWVTdHJpbmdQYXJ0cyA9IGl0ZW0udHJpbSgpLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGltZVN0cmluZ1BhcnRzICYmIHRpbWVTdHJpbmdQYXJ0cy5sZW5ndGggJiYgdGltZVN0cmluZ1BhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBsZXQgaG91cnM6IG51bWJlciA9IHBhcnNlSW50KHRpbWVTdHJpbmdQYXJ0c1swXSwgMTApO1xuICAgICAgICBpZiAoaG91cnMgPT09IDEyICYmIHBtKSB7XG4gICAgICAgICAgaG91cnMgPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmIChwbSkge1xuICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcbiAgICAgICAgfSBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICAgICAgICBob3VycyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUuc2V0SG91cnMoaG91cnMpO1xuICAgICAgICB2YWx1ZS5zZXRNaW51dGVzKHBhcnNlSW50KHRpbWVTdHJpbmdQYXJ0c1sxXSwgMTApKTtcbiAgICAgICAgdmFsdWUuc2V0U2Vjb25kcygwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGltZVN0cmluZ1BhcnRzID0gLyhcXGR7MSwyfSk6KFxcZHsyfSkvLmV4ZWModGltZVN0cmluZyk7XG4gICAgICBpZiAodGltZVN0cmluZ1BhcnRzICYmIHRpbWVTdHJpbmdQYXJ0cy5sZW5ndGggJiYgdGltZVN0cmluZ1BhcnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICB2YWx1ZS5zZXRIb3VycyhwYXJzZUludCh0aW1lU3RyaW5nUGFydHNbMV0sIDEwKSk7XG4gICAgICAgIHZhbHVlLnNldE1pbnV0ZXMocGFyc2VJbnQodGltZVN0cmluZ1BhcnRzWzJdLCAxMCkpO1xuICAgICAgICB2YWx1ZS5zZXRTZWNvbmRzKDApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW3ZhbHVlLCB0aW1lU3RyaW5nXTtcbiAgfVxuXG4gIHBhcnNlU3RyaW5nKGRhdGVUaW1lU3RyaW5nOiBzdHJpbmcsIG1pbGl0YXJ5VGltZTogYm9vbGVhbiwgdHlwZTogc3RyaW5nKTogW0RhdGUsIHN0cmluZ10ge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgICBjb25zdCBzdHIgPSBkYXRlVGltZVN0cmluZy5yZXBsYWNlKC8tL2csICcvJyk7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gc3RyLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IFtkdCwgZHRzXSA9IHRoaXMucGFyc2VEYXRlU3RyaW5nKHBhcnRzWzBdKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBjb25zdCBbdG0sIHRtc10gPSB0aGlzLnBhcnNlVGltZVN0cmluZyhwYXJ0c1sxXSwgbWlsaXRhcnlUaW1lKTtcbiAgICAgICAgICByZXR1cm4gW25ldyBEYXRlKGR0LnNldEhvdXJzKHRtLmdldEhvdXJzKCksIHRtLmdldE1pbnV0ZXMoKSkpLCBgJHtkdHN9ICR7dG1zfWBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZHQsIGR0c107XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VEYXRlU3RyaW5nKGRhdGVUaW1lU3RyaW5nKTtcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVRpbWVTdHJpbmcoZGF0ZVRpbWVTdHJpbmcsIG1pbGl0YXJ5VGltZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgaXNWYWxpZERhdGVQYXJ0KHZhbHVlOiBzdHJpbmcsIGZvcm1hdDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZVBhcnQgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIGlmIChmb3JtYXQuaW5jbHVkZXMoJ20nKSAmJiAoZGF0ZVBhcnQgPj0gMiB8fCB2YWx1ZS5sZW5ndGggPT09IDIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmNsdWRlcygnZCcpICYmIChkYXRlUGFydCA+PSA0IHx8IHZhbHVlLmxlbmd0aCA9PT0gMikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluY2x1ZGVzKCd5JykgJiYgZGF0ZVBhcnQgPj0gMTAwMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19