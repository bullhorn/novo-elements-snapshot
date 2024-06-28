// NG2
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoLabelService {
    constructor(userLocale = 'en-US') {
        this.userLocale = userLocale;
        this.and = 'and';
        this.not = 'not';
        this.filters = 'Filter';
        this.clear = 'Clear';
        this.sort = 'Sort';
        this.distributionListOwner = 'Owner';
        this.dateAdded = 'Date Added';
        this.emptyTableMessage = 'No Records to display...';
        this.noMatchingRecordsMessage = 'No Matching Records';
        this.noMoreRecordsMessage = 'No More Records';
        this.erroredTableMessage = 'Oops! An error occurred.';
        this.pickerError = 'Oops! An error occurred.';
        this.pickerTextFieldEmpty = 'Begin typing to see results.';
        this.pickerEmpty = 'No results to display...';
        this.tabbedGroupPickerEmpty = 'No results found';
        this.quickNoteError = 'Oops! An error occurred.';
        this.quickNoteEmpty = 'No results to display...';
        this.required = 'Required';
        this.numberTooLarge = 'Number is too large';
        this.apply = 'Apply';
        this.save = 'Save';
        this.cancel = 'Cancel';
        this.next = 'Next';
        this.itemsPerPage = 'Items per page:';
        this.chooseAField = 'Choose a field...';
        this.operator = 'Operator...';
        this.select = 'Select...';
        this.value = 'Value...';
        this.selectDateRange = 'Select Date Range...';
        this.typeToAddChips = 'Type to add chips...';
        this.selected = 'Selected';
        this.selectAllOnPage = 'Select all on page';
        this.deselectAll = 'Deselect all';
        this.refresh = 'Refresh';
        this.close = 'Close';
        this.move = 'Move';
        this.startDate = 'Start Date';
        this.endDate = 'End Date';
        this.rate = 'Rate';
        this.more = 'more';
        this.clearAll = 'CLEAR ALL';
        this.clearAllNormalCase = 'Clear All';
        this.clearSort = 'Clear Sort';
        this.clearFilter = 'Clear Filter';
        this.clearSearch = 'Clear Search';
        this.clearSelected = 'Clear Selected';
        this.today = 'Today';
        this.now = 'Now';
        this.isRequired = 'is required';
        this.notValidYear = 'is not a valid year';
        this.isTooLarge = 'is too large';
        this.invalidAddress = 'requires at least one field filled out';
        this.invalidEmail = 'requires a valid email (ex. abc@123.com)';
        this.minLength = 'is required to be a minimum length of';
        this.past1Day = 'Past 1 Day';
        this.past7Days = 'Past 7 Days';
        this.past30Days = 'Past 30 Days';
        this.past90Days = 'Past 90 Days';
        this.past1Year = 'Past 1 Year';
        this.next1Day = 'Next 1 Day';
        this.next7Days = 'Next 7 Days';
        this.next30Days = 'Next 30 Days';
        this.next90Days = 'Next 90 Days';
        this.next1Year = 'Next 1 Year';
        this.customDateRange = 'Custom Date Range';
        this.backToPresetFilters = 'Back to Preset Filters';
        this.okGotIt = 'Ok, Got it';
        this.address = 'Address';
        this.address1 = 'Address';
        this.apt = 'Apt'; // TODO delete
        this.address2 = 'Apt';
        this.city = 'City / Locality';
        this.state = 'State / Region';
        this.zip = 'Postal Code';
        this.zipCode = 'Postal Code'; // TODO delete
        this.country = 'Country';
        this.or = 'or';
        this.clickToBrowse = 'click to browse';
        this.chooseAFile = 'Choose a file';
        this.no = 'No';
        this.yes = 'Yes';
        this.search = 'SEARCH';
        this.noItems = 'There are no items';
        this.dateFormat = 'MM/dd/yyyy';
        this.dateFormatPlaceholder = 'MM/DD/YYYY';
        this.localDatePlaceholder = 'mm/dd/yyyy';
        this.timeFormatPlaceholderAM = 'hh:mm AM';
        this.timeFormatPlaceholder24Hour = 'HH:mm';
        this.timeFormatAM = 'AM';
        this.timeFormatPM = 'PM';
        this.confirmChangesModalMessage = 'Are you sure you want to change this field?';
        this.promptModalMessage = 'Do you want to perform the following changes?';
        this.asyncFailure = 'Async validation was not called within the 10s threshold, you might want to reload the page to try again';
        this.previous = 'Previous';
        this.actions = 'Actions';
        this.all = 'All';
        this.groupedMultiPickerEmpty = 'No items to display';
        this.groupedMultiPickerSelectCategory = 'Select a category from the left to get started';
        this.add = 'Add';
        this.encryptedFieldTooltip = 'This data has been stored at the highest level of security';
        this.noStatesForCountry = 'No states available for the selected country';
        this.selectCountryFirst = 'Please select a country before selecting a state';
        this.invalidIntegerInput = 'Special characters are not allowed for';
        this.maxRecordsReached = 'Sorry, you have reached the maximum number of records allowed for this field';
        this.selectFilterOptions = 'Please select one or more filter options below.';
        this.addCondition = 'Add Condition';
        this.includeAny = 'Include Any';
        this.includeAll = 'Include All';
        this.exclude = 'Exclude';
        this.excludeAny = 'Exclude Any';
        this.radius = 'Radius';
        this.equals = 'Equals';
        this.equalTo = 'Equal To';
        this.greaterThan = 'Greater Than';
        this.lessThan = 'Less Than';
        this.doesNotEqual = 'Does Not Equal';
        this.true = 'True';
        this.false = 'False';
        this.before = 'Before';
        this.after = 'After';
        this.between = 'Between';
        this.within = 'Within';
        this.isNull = 'Is Empty';
        this.isEmpty = 'Is Empty?';
        this.refreshPagination = 'Refresh Pagination';
        this.location = 'Location';
        this.showLess = 'Show Less';
    }
    maxlengthMetWithField(field, maxlength) {
        return `Sorry, you have reached the maximum character count of ${maxlength} for ${field}.`;
    }
    maxlengthMet(maxlength) {
        return `Sorry, you have reached the maximum character count of ${maxlength} for this field.`;
    }
    invalidMaxlengthWithField(field, maxlength) {
        return `Sorry, you have exceeded the maximum character count of ${maxlength} for ${field}.`;
    }
    invalidMaxlength(maxlength) {
        return `Sorry, you have exceeded the maximum character count of ${maxlength} for this field.`;
    }
    getToManyPlusMore(toMany) {
        return `+${toMany.quantity} more`;
    }
    selectedRecords(selected) {
        return `${selected} records are selected.`;
    }
    showingXofXResults(shown, total) {
        return `Showing ${shown} of ${total} Results.`;
    }
    totalRecords(total, select = false) {
        return select ? `Select all ${total} records.` : `De-select remaining ${total} records.`;
    }
    dateFormatString() {
        return this.dateFormat;
    }
    localizedDatePlaceholder() {
        return this.localDatePlaceholder;
    }
    tabbedGroupClearSuggestion(tabLabelPlural) {
        return `Clear your search to see all ${tabLabelPlural}.`;
    }
    formatDateWithFormat(value, format) {
        const date = value instanceof Date ? value : new Date(value);
        if (date.getTime() !== date.getTime()) {
            return value;
        }
        return new Intl.DateTimeFormat(this.userLocale, format).format(date);
    }
    formatToTimeOnly(param) { }
    formatToDateOnly(param) { }
    formatTimeWithFormat(value, format) {
        const date = value instanceof Date ? value : new Date(value);
        if (date.getTime() !== date.getTime()) {
            return value;
        }
        const timeParts = Intl.DateTimeFormat(this.userLocale, format)
            .formatToParts(date)
            .reduce((obj, part) => {
            obj[part.type] = part.value;
            return obj;
        }, {});
        const dayPeriod = timeParts.dayPeriod ? timeParts.dayPeriod : '';
        const res = `${timeParts.hour}:${timeParts.minute} ${dayPeriod}`;
        return res;
    }
    getWeekdays(weekStartsOn = 0) {
        function getDay(dayOfWeek) {
            const dt = new Date();
            return dt.setDate(dt.getDate() - dt.getDay() + dayOfWeek);
        }
        let weekdays = [getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5), getDay(6)].reduce((weekdays, dt) => {
            weekdays.push(new Intl.DateTimeFormat(this.userLocale, { weekday: 'long' }).format(dt));
            return weekdays;
        }, []);
        if (weekStartsOn > 0 && weekStartsOn <= 6) {
            const newStart = weekdays.splice(weekStartsOn);
            weekdays = [...newStart, ...weekdays];
        }
        return weekdays;
    }
    getMonths() {
        function getMonth(month) {
            const dt = new Date();
            return dt.setMonth(month, 1);
        }
        return [
            getMonth(0),
            getMonth(1),
            getMonth(2),
            getMonth(3),
            getMonth(4),
            getMonth(5),
            getMonth(6),
            getMonth(7),
            getMonth(8),
            getMonth(9),
            getMonth(10),
            getMonth(11),
        ].reduce((months, dt) => {
            months.push(new Intl.DateTimeFormat(this.userLocale, { month: 'long' }).format(dt));
            return months;
        }, []);
    }
    getProperty(value) {
        return this[value];
    }
    getRangeText(page, pageSize, length, short) {
        if (length === 0 || pageSize === 0) {
            return `Displaying 0 of ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return short ? `${startIndex + 1} - ${endIndex}/${length}` : `Displaying ${startIndex + 1} - ${endIndex} of ${length}`;
    }
    formatCurrency(value) {
        const options = { style: 'currency', currency: 'USD' };
        return new Intl.NumberFormat(this.userLocale, options).format(value);
    }
    /**
     * Extends the Intl.numberFormat capability with two extra features:
     *  - Does NOT round values, but instead truncates to maximumFractionDigits
     *  - By default uses accounting format for negative numbers: (3.14) instead of -3.14.
     *
     * @param value           The number value to convert to string
     * @param overrideOptions Allows for overriding options used and passed to Intl.NumberFormat()
     */
    formatBigDecimal(value, overrideOptions) {
        const defaultOptions = {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useAccountingFormat: true,
        };
        const options = Object.assign(defaultOptions, overrideOptions);
        const truncatedValue = this.truncateToPrecision(value, options.maximumFractionDigits);
        let _value = new Intl.NumberFormat(this.userLocale, options).format(truncatedValue);
        if (value < 0) {
            _value = options.useAccountingFormat ? `(${_value.slice(1)})` : `-${_value.slice(1)}`;
        }
        return _value;
    }
    /**
     * Performs a string-based truncating of a number with no rounding
     */
    truncateToPrecision(value, precision) {
        let valueAsString = value ? value.toString() : '0';
        const decimalIndex = valueAsString.indexOf('.');
        if (decimalIndex > -1 && decimalIndex + precision + 1 < valueAsString.length) {
            valueAsString = valueAsString.substring(0, valueAsString.indexOf('.') + precision + 1);
        }
        return Number(valueAsString);
    }
    formatNumber(value, options) {
        return new Intl.NumberFormat(this.userLocale, options).format(value);
    }
    formatDateShort(value) {
        const options = {
            // DD/MM/YYYY, HH:MM A - 02/14/2017, 1:17 PM
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        };
        const _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
    }
    formatTime(value) {
        const options = {
            // HH:MM A - 1:17 PM
            hour: 'numeric',
            minute: '2-digit',
        };
        const _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
    }
    formatDate(value) {
        const options = {
            // DD/MM/YYYY - 02/14/2017
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        };
        const _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoLabelService, deps: [{ token: LOCALE_ID, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoLabelService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoLabelService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LOCALE_ID]
                }] }] });
export const NOVO_ELEMENTS_LABELS_PROVIDERS = [{ provide: NovoLabelService, useClass: NovoLabelService }];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1sYWJlbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWN4RSxNQUFNLE9BQU8sZ0JBQWdCO0lBaUkzQixZQUdTLGFBQWEsT0FBTztRQUFwQixlQUFVLEdBQVYsVUFBVSxDQUFVO1FBbkk3QixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFlBQU8sR0FBRyxRQUFRLENBQUM7UUFDbkIsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsMEJBQXFCLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsMEJBQTBCLENBQUM7UUFDL0MsNkJBQXdCLEdBQUcscUJBQXFCLENBQUM7UUFDakQseUJBQW9CLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsd0JBQW1CLEdBQUcsMEJBQTBCLENBQUM7UUFDakQsZ0JBQVcsR0FBRywwQkFBMEIsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyw4QkFBOEIsQ0FBQztRQUN0RCxnQkFBVyxHQUFHLDBCQUEwQixDQUFDO1FBQ3pDLDJCQUFzQixHQUFHLGtCQUFrQixDQUFDO1FBQzVDLG1CQUFjLEdBQUcsMEJBQTBCLENBQUM7UUFDNUMsbUJBQWMsR0FBRywwQkFBMEIsQ0FBQztRQUM1QyxhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcscUJBQXFCLENBQUM7UUFDdkMsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixTQUFJLEdBQUcsTUFBTSxD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QUFTLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEcsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUE2QjtRQUN0QyxNQUFNLE9BQU8sR0FBK0I7WUFDMUMsMEJBQTBCO1lBQzFCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLEdBQUcsRUFBRSxTQUFTO1lBQ2QsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRSxDQUFDOzhHQTFWVSxnQkFBZ0Isa0JBbUlqQixTQUFTO2tIQW5JUixnQkFBZ0I7OzJGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVU7OzBCQW1JTixRQUFROzswQkFDUixNQUFNOzJCQUFDLFNBQVM7O0FBME5yQixNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgTE9DQUxFX0lELCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF5IH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5pbnRlcmZhY2UgVGltZUZvcm1hdFBhcnRzIHtcbiAgaG91cjogc3RyaW5nO1xuICBtaW51dGU6IHN0cmluZztcbiAgZGF5UGVyaW9kPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zIGV4dGVuZHMgSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zIHtcbiAgdXNlQWNjb3VudGluZ0Zvcm1hdD86IGJvb2xlYW47IC8vIFJlbmRlciBuZWdhdGl2ZSBudW1iZXJzIHVzaW5nIHBhcmVucy4gVHJ1ZTogXCIoMy4xNClcIiwgRmFsc2U6IFwiLTMuMTRcIlxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm92b0xhYmVsU2VydmljZSB7XG4gIGFuZCA9ICdhbmQnO1xuICBub3QgPSAnbm90JztcbiAgZmlsdGVycyA9ICdGaWx0ZXInO1xuICBjbGVhciA9ICdDbGVhcic7XG4gIHNvcnQgPSAnU29ydCc7XG4gIGRpc3RyaWJ1dGlvbkxpc3RPd25lciA9ICdPd25lcic7XG4gIGRhdGVBZGRlZCA9ICdEYXRlIEFkZGVkJztcbiAgZW1wdHlUYWJsZU1lc3NhZ2UgPSAnTm8gUmVjb3JkcyB0byBkaXNwbGF5Li4uJztcbiAgbm9NYXRjaGluZ1JlY29yZHNNZXNzYWdlID0gJ05vIE1hdGNoaW5nIFJlY29yZHMnO1xuICBub01vcmVSZWNvcmRzTWVzc2FnZSA9ICdObyBNb3JlIFJlY29yZHMnO1xuICBlcnJvcmVkVGFibGVNZXNzYWdlID0gJ09vcHMhIEFuIGVycm9yIG9jY3VycmVkLic7XG4gIHBpY2tlckVycm9yID0gJ09vcHMhIEFuIGVycm9yIG9jY3VycmVkLic7XG4gIHBpY2tlclRleHRGaWVsZEVtcHR5ID0gJ0JlZ2luIHR5cGluZyB0byBzZWUgcmVzdWx0cy4nO1xuICBwaWNrZXJFbXB0eSA9ICdObyByZXN1bHRzIHRvIGRpc3BsYXkuLi4nO1xuICB0YWJiZWRHcm91cFBpY2tlckVtcHR5ID0gJ05vIHJlc3VsdHMgZm91bmQnO1xuICBxdWlja05vdGVFcnJvciA9ICdPb3BzISBBbiBlcnJvciBvY2N1cnJlZC4nO1xuICBxdWlja05vdGVFbXB0eSA9ICdObyByZXN1bHRzIHRvIGRpc3BsYXkuLi4nO1xuICByZXF1aXJlZCA9ICdSZXF1aXJlZCc7XG4gIG51bWJlclRvb0xhcmdlID0gJ051bWJlciBpcyB0b28gbGFyZ2UnO1xuICBhcHBseSA9ICdBcHBseSc7XG4gIHNhdmUgPSAnU2F2ZSc7XG4gIGNhbmNlbCA9ICdDYW5jZWwnO1xuICBuZXh0ID0gJ05leHQnO1xuICBpdGVtc1BlclBhZ2UgPSAnSXRlbXMgcGVyIHBhZ2U6JztcbiAgY2hvb3NlQUZpZWxkID0gJ0Nob29zZSBhIGZpZWxkLi4uJztcbiAgb3BlcmF0b3IgPSAnT3BlcmF0b3IuLi4nO1xuICBzZWxlY3QgPSAnU2VsZWN0Li4uJztcbiAgdmFsdWUgPSAnVmFsdWUuLi4nO1xuICBzZWxlY3REYXRlUmFuZ2UgPSAnU2VsZWN0IERhdGUgUmFuZ2UuLi4nXG4gIHR5cGVUb0FkZENoaXBzID0gJ1R5cGUgdG8gYWRkIGNoaXBzLi4uJ1xuICBzZWxlY3RlZCA9ICdTZWxlY3RlZCc7XG4gIHNlbGVjdEFsbE9uUGFnZSA9ICdTZWxlY3QgYWxsIG9uIHBhZ2UnO1xuICBkZXNlbGVjdEFsbCA9ICdEZXNlbGVjdCBhbGwnO1xuICByZWZyZXNoID0gJ1JlZnJlc2gnO1xuICBjbG9zZSA9ICdDbG9zZSc7XG4gIG1vdmUgPSAnTW92ZSc7XG4gIHN0YXJ0RGF0ZSA9ICdTdGFydCBEYXRlJztcbiAgZW5kRGF0ZSA9ICdFbmQgRGF0ZSc7XG4gIHJhdGUgPSAnUmF0ZSc7XG4gIG1vcmUgPSAnbW9yZSc7XG4gIGNsZWFyQWxsID0gJ0NMRUFSIEFMTCc7XG4gIGNsZWFyQWxsTm9ybWFsQ2FzZSA9ICdDbGVhciBBbGwnO1xuICBjbGVhclNvcnQgPSAnQ2xlYXIgU29ydCc7XG4gIGNsZWFyRmlsdGVyID0gJ0NsZWFyIEZpbHRlcic7XG4gIGNsZWFyU2VhcmNoID0gJ0NsZWFyIFNlYXJjaCc7XG4gIGNsZWFyU2VsZWN0ZWQgPSAnQ2xlYXIgU2VsZWN0ZWQnO1xuICB0b2RheSA9ICdUb2RheSc7XG4gIG5vdyA9ICdOb3cnO1xuICBpc1JlcXVpcmVkID0gJ2lzIHJlcXVpcmVkJztcbiAgbm90VmFsaWRZZWFyID0gJ2lzIG5vdCBhIHZhbGlkIHllYXInO1xuICBpc1Rvb0xhcmdlID0gJ2lzIHRvbyBsYXJnZSc7XG4gIGludmFsaWRBZGRyZXNzID0gJ3JlcXVpcmVzIGF0IGxlYXN0IG9uZSBmaWVsZCBmaWxsZWQgb3V0JztcbiAgaW52YWxpZEVtYWlsID0gJ3JlcXVpcmVzIGEgdmFsaWQgZW1haWwgKGV4LiBhYmNAMTIzLmNvbSknO1xuICBtaW5MZW5ndGggPSAnaXMgcmVxdWlyZWQgdG8gYmUgYSBtaW5pbXVtIGxlbmd0aCBvZic7XG4gIHBhc3QxRGF5ID0gJ1Bhc3QgMSBEYXknO1xuICBwYXN0N0RheXMgPSAnUGFzdCA3IERheXMnO1xuICBwYXN0MzBEYXlzID0gJ1Bhc3QgMzAgRGF5cyc7XG4gIHBhc3Q5MERheXMgPSAnUGFzdCA5MCBEYXlzJztcbiAgcGFzdDFZZWFyID0gJ1Bhc3QgMSBZZWFyJztcbiAgbmV4dDFEYXkgPSAnTmV4dCAxIERheSc7XG4gIG5leHQ3RGF5cyA9ICdOZXh0IDcgRGF5cyc7XG4gIG5leHQzMERheXMgPSAnTmV4dCAzMCBEYXlzJztcbiAgbmV4dDkwRGF5cyA9ICdOZXh0IDkwIERheXMnO1xuICBuZXh0MVllYXIgPSAnTmV4dCAxIFllYXInO1xuICBjdXN0b21EYXRlUmFuZ2UgPSAnQ3VzdG9tIERhdGUgUmFuZ2UnO1xuICBiYWNrVG9QcmVzZXRGaWx0ZXJzID0gJ0JhY2sgdG8gUHJlc2V0IEZpbHRlcnMnO1xuICBva0dvdEl0ID0gJ09rLCBHb3QgaXQnO1xuICBhZGRyZXNzID0gJ0FkZHJlc3MnO1xuICBhZGRyZXNzMSA9ICdBZGRyZXNzJztcbiAgYXB0ID0gJ0FwdCc7IC8vIFRPRE8gZGVsZXRlXG4gIGFkZHJlc3MyID0gJ0FwdCc7XG4gIGNpdHkgPSAnQ2l0eSAvIExvY2FsaXR5JztcbiAgc3RhdGUgPSAnU3RhdGUgLyBSZWdpb24nO1xuICB6aXAgPSAnUG9zdGFsIENvZGUnO1xuICB6aXBDb2RlID0gJ1Bvc3RhbCBDb2RlJzsgLy8gVE9ETyBkZWxldGVcbiAgY291bnRyeSA9ICdDb3VudHJ5JztcbiAgb3IgPSAnb3InO1xuICBjbGlja1RvQnJvd3NlID0gJ2NsaWNrIHRvIGJyb3dzZSc7XG4gIGNob29zZUFGaWxlID0gJ0Nob29zZSBhIGZpbGUnO1xuICBubyA9ICdObyc7XG4gIHllcyA9ICdZZXMnO1xuICBzZWFyY2ggPSAnU0VBUkNIJztcbiAgbm9JdGVtcyA9ICdUaGVyZSBhcmUgbm8gaXRlbXMnO1xuICBkYXRlRm9ybWF0ID0gJ01NL2RkL3l5eXknO1xuICBkYXRlRm9ybWF0UGxhY2Vob2xkZXIgPSAnTU0vREQvWVlZWSc7XG4gIGxvY2FsRGF0ZVBsYWNlaG9sZGVyID0gJ21tL2RkL3l5eXknO1xuICB0aW1lRm9ybWF0UGxhY2Vob2xkZXJBTSA9ICdoaDptbSBBTSc7XG4gIHRpbWVGb3JtYXRQbGFjZWhvbGRlcjI0SG91ciA9ICdISDptbSc7XG4gIHRpbWVGb3JtYXRBTSA9ICdBTSc7XG4gIHRpbWVGb3JtYXRQTSA9ICdQTSc7XG4gIGNvbmZpcm1DaGFuZ2VzTW9kYWxNZXNzYWdlID0gJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhpcyBmaWVsZD8nO1xuICBwcm9tcHRNb2RhbE1lc3NhZ2UgPSAnRG8geW91IHdhbnQgdG8gcGVyZm9ybSB0aGUgZm9sbG93aW5nIGNoYW5nZXM/JztcbiAgYXN5bmNGYWlsdXJlID0gJ0FzeW5jIHZhbGlkYXRpb24gd2FzIG5vdCBjYWxsZWQgd2l0aGluIHRoZSAxMHMgdGhyZXNob2xkLCB5b3UgbWlnaHQgd2FudCB0byByZWxvYWQgdGhlIHBhZ2UgdG8gdHJ5IGFnYWluJztcbiAgcHJldmlvdXMgPSAnUHJldmlvdXMnO1xuICBhY3Rpb25zID0gJ0FjdGlvbnMnO1xuICBhbGwgPSAnQWxsJztcbiAgZ3JvdXBlZE11bHRpUGlja2VyRW1wdHkgPSAnTm8gaXRlbXMgdG8gZGlzcGxheSc7XG4gIGdyb3VwZWRNdWx0aVBpY2tlclNlbGVjdENhdGVnb3J5ID0gJ1NlbGVjdCBhIGNhdGVnb3J5IGZyb20gdGhlIGxlZnQgdG8gZ2V0IHN0YXJ0ZWQnO1xuICBhZGQgPSAnQWRkJztcbiAgZW5jcnlwdGVkRmllbGRUb29sdGlwID0gJ1RoaXMgZGF0YSBoYXMgYmVlbiBzdG9yZWQgYXQgdGhlIGhpZ2hlc3QgbGV2ZWwgb2Ygc2VjdXJpdHknO1xuICBub1N0YXRlc0ZvckNvdW50cnkgPSAnTm8gc3RhdGVzIGF2YWlsYWJsZSBmb3IgdGhlIHNlbGVjdGVkIGNvdW50cnknO1xuICBzZWxlY3RDb3VudHJ5Rmlyc3QgPSAnUGxlYXNlIHNlbGVjdCBhIGNvdW50cnkgYmVmb3JlIHNlbGVjdGluZyBhIHN0YXRlJztcbiAgaW52YWxpZEludGVnZXJJbnB1dCA9ICdTcGVjaWFsIGNoYXJhY3RlcnMgYXJlIG5vdCBhbGxvd2VkIGZvcic7XG4gIG1heFJlY29yZHNSZWFjaGVkID0gJ1NvcnJ5LCB5b3UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIG51bWJlciBvZiByZWNvcmRzIGFsbG93ZWQgZm9yIHRoaXMgZmllbGQnO1xuICBzZWxlY3RGaWx0ZXJPcHRpb25zID0gJ1BsZWFzZSBzZWxlY3Qgb25lIG9yIG1vcmUgZmlsdGVyIG9wdGlvbnMgYmVsb3cuJztcbiAgYWRkQ29uZGl0aW9uID0gJ0FkZCBDb25kaXRpb24nO1xuICBpbmNsdWRlQW55ID0gJ0luY2x1ZGUgQW55JztcbiAgaW5jbHVkZUFsbCA9ICdJbmNsdWRlIEFsbCc7XG4gIGV4Y2x1ZGUgPSAnRXhjbHVkZSc7XG4gIGV4Y2x1ZGVBbnkgPSAnRXhjbHVkZSBBbnknO1xuICByYWRpdXMgPSAnUmFkaXVzJztcbiAgZXF1YWxzID0gJ0VxdWFscyc7XG4gIGVxdWFsVG8gPSAnRXF1YWwgVG8nO1xuICBncmVhdGVyVGhhbiA9ICdHcmVhdGVyIFRoYW4nO1xuICBsZXNzVGhhbiA9ICdMZXNzIFRoYW4nO1xuICBkb2VzTm90RXF1YWwgPSAnRG9lcyBOb3QgRXF1YWwnO1xuICB0cnVlID0gJ1RydWUnO1xuICBmYWxzZSA9ICdGYWxzZSc7XG4gIGJlZm9yZSA9ICdCZWZvcmUnO1xuICBhZnRlciA9ICdBZnRlcic7XG4gIGJldHdlZW4gPSAnQmV0d2Vlbic7XG4gIHdpdGhpbiA9ICdXaXRoaW4nO1xuICBpc051bGwgPSAnSXMgRW1wdHknO1xuICBpc0VtcHR5ID0gJ0lzIEVtcHR5Pyc7XG4gIHJlZnJlc2hQYWdpbmF0aW9uID0gJ1JlZnJlc2ggUGFnaW5hdGlvbic7XG4gIGxvY2F0aW9uID0gJ0xvY2F0aW9uJztcbiAgc2hvd0xlc3MgPSAnU2hvdyBMZXNzJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTE9DQUxFX0lEKVxuICAgIHB1YmxpYyB1c2VyTG9jYWxlID0gJ2VuLVVTJyxcbiAgKSB7fVxuXG4gIG1heGxlbmd0aE1ldFdpdGhGaWVsZChmaWVsZDogc3RyaW5nLCBtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciAke2ZpZWxkfS5gO1xuICB9XG5cbiAgbWF4bGVuZ3RoTWV0KG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yIHRoaXMgZmllbGQuYDtcbiAgfVxuXG4gIGludmFsaWRNYXhsZW5ndGhXaXRoRmllbGQoZmllbGQ6IHN0cmluZywgbWF4bGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgU29ycnksIHlvdSBoYXZlIGV4Y2VlZGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yICR7ZmllbGR9LmA7XG4gIH1cblxuICBpbnZhbGlkTWF4bGVuZ3RoKG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSBleGNlZWRlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciB0aGlzIGZpZWxkLmA7XG4gIH1cblxuICBnZXRUb01hbnlQbHVzTW9yZSh0b01hbnk6IHsgcXVhbnRpdHk6IG51bWJlciB9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCske3RvTWFueS5xdWFudGl0eX0gbW9yZWA7XG4gIH1cblxuICBzZWxlY3RlZFJlY29yZHMoc2VsZWN0ZWQ6IG51bWJlcikge1xuICAgIHJldHVybiBgJHtzZWxlY3RlZH0gcmVjb3JkcyBhcmUgc2VsZWN0ZWQuYDtcbiAgfVxuXG4gIHNob3dpbmdYb2ZYUmVzdWx0cyhzaG93bjogbnVtYmVyLCB0b3RhbDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGBTaG93aW5nICR7c2hvd259IG9mICR7dG90YWx9IFJlc3VsdHMuYDtcbiAgfVxuXG4gIHRvdGFsUmVjb3Jkcyh0b3RhbDogbnVtYmVyLCBzZWxlY3QgPSBmYWxzZSkge1xuICAgIHJldHVybiBzZWxlY3QgPyBgU2VsZWN0IGFsbCAke3RvdGFsfSByZWNvcmRzLmAgOiBgRGUtc2VsZWN0IHJlbWFpbmluZyAke3RvdGFsfSByZWNvcmRzLmA7XG4gIH1cblxuICBkYXRlRm9ybWF0U3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdDtcbiAgfVxuXG4gIGxvY2FsaXplZERhdGVQbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvY2FsRGF0ZVBsYWNlaG9sZGVyO1xuICB9XG5cbiAgdGFiYmVkR3JvdXBDbGVhclN1Z2dlc3Rpb24odGFiTGFiZWxQbHVyYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBDbGVhciB5b3VyIHNlYXJjaCB0byBzZWUgYWxsICR7dGFiTGFiZWxQbHVyYWx9LmA7XG4gIH1cblxuICBmb3JtYXREYXRlV2l0aEZvcm1hdCh2YWx1ZTogYW55LCBmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSB7XG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xuICAgIGlmIChkYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgZm9ybWF0KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICBmb3JtYXRUb1RpbWVPbmx5KHBhcmFtKSB7fVxuXG4gIGZvcm1hdFRvRGF0ZU9ubHkocGFyYW0pIHt9XG5cbiAgZm9ybWF0VGltZVdpdGhGb3JtYXQodmFsdWU6IGFueSwgZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyk6IHN0cmluZyB7XG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xuICAgIGlmIChkYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY29uc3QgdGltZVBhcnRzOiB7IFt0eXBlOiBzdHJpbmddOiBzdHJpbmcgfSA9IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBmb3JtYXQpXG4gICAgICAuZm9ybWF0VG9QYXJ0cyhkYXRlKVxuICAgICAgLnJlZHVjZSgob2JqLCBwYXJ0KSA9PiB7XG4gICAgICAgIG9ialtwYXJ0LnR5cGVdID0gcGFydC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0sIHt9KTtcbiAgICBjb25zdCBkYXlQZXJpb2QgPSB0aW1lUGFydHMuZGF5UGVyaW9kID8gdGltZVBhcnRzLmRheVBlcmlvZCA6ICcnO1xuICAgIGNvbnN0IHJlcyA9IGAke3RpbWVQYXJ0cy5ob3VyfToke3RpbWVQYXJ0cy5taW51dGV9ICR7ZGF5UGVyaW9kfWA7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGdldFdlZWtkYXlzKHdlZWtTdGFydHNPbjogRGF5ID0gMCk6IHN0cmluZ1tdIHtcbiAgICBmdW5jdGlvbiBnZXREYXkoZGF5T2ZXZWVrKSB7XG4gICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKCk7XG4gICAgICByZXR1cm4gZHQuc2V0RGF0ZShkdC5nZXREYXRlKCkgLSBkdC5nZXREYXkoKSArIGRheU9mV2Vlayk7XG4gICAgfVxuXG4gICAgbGV0IHdlZWtkYXlzID0gW2dldERheSgwKSwgZ2V0RGF5KDEpLCBnZXREYXkoMiksIGdldERheSgzKSwgZ2V0RGF5KDQpLCBnZXREYXkoNSksIGdldERheSg2KV0ucmVkdWNlKCh3ZWVrZGF5cywgZHQpID0+IHtcbiAgICAgIHdlZWtkYXlzLnB1c2gobmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCB7IHdlZWtkYXk6ICdsb25nJyB9KS5mb3JtYXQoZHQpKTtcbiAgICAgIHJldHVybiB3ZWVrZGF5cztcbiAgICB9LCBbXSk7XG5cbiAgICBpZiAod2Vla1N0YXJ0c09uID4gMCAmJiB3ZWVrU3RhcnRzT24gPD0gNikge1xuICAgICAgY29uc3QgbmV3U3RhcnQgPSB3ZWVrZGF5cy5zcGxpY2Uod2Vla1N0YXJ0c09uKTtcbiAgICAgIHdlZWtkYXlzID0gWy4uLm5ld1N0YXJ0LCAuLi53ZWVrZGF5c107XG4gICAgfVxuICAgIHJldHVybiB3ZWVrZGF5cztcbiAgfVxuXG4gIGdldE1vbnRocygpOiBzdHJpbmdbXSB7XG4gICAgZnVuY3Rpb24gZ2V0TW9udGgobW9udGgpIHtcbiAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiBkdC5zZXRNb250aChtb250aCwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIGdldE1vbnRoKDApLFxuICAgICAgZ2V0TW9udGgoMSksXG4gICAgICBnZXRNb250aCgyKSxcbiAgICAgIGdldE1vbnRoKDMpLFxuICAgICAgZ2V0TW9udGgoNCksXG4gICAgICBnZXRNb250aCg1KSxcbiAgICAgIGdldE1vbnRoKDYpLFxuICAgICAgZ2V0TW9udGgoNyksXG4gICAgICBnZXRNb250aCg4KSxcbiAgICAgIGdldE1vbnRoKDkpLFxuICAgICAgZ2V0TW9udGgoMTApLFxuICAgICAgZ2V0TW9udGgoMTEpLFxuICAgIF0ucmVkdWNlKChtb250aHMsIGR0KSA9PiB7XG4gICAgICBtb250aHMucHVzaChuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIHsgbW9udGg6ICdsb25nJyB9KS5mb3JtYXQoZHQpKTtcbiAgICAgIHJldHVybiBtb250aHM7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgZ2V0UHJvcGVydHkodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzW3ZhbHVlXTtcbiAgfVxuXG4gIGdldFJhbmdlVGV4dChwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBzaG9ydDogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCB8fCBwYWdlU2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIGBEaXNwbGF5aW5nIDAgb2YgJHtsZW5ndGh9YDtcbiAgICB9XG5cbiAgICBsZW5ndGggPSBNYXRoLm1heChsZW5ndGgsIDApO1xuXG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHBhZ2UgKiBwYWdlU2l6ZTtcblxuICAgIC8vIElmIHRoZSBzdGFydCBpbmRleCBleGNlZWRzIHRoZSBsaXN0IGxlbmd0aCwgZG8gbm90IHRyeSBhbmQgZml4IHRoZSBlbmQgaW5kZXggdG8gdGhlIGVuZC5cbiAgICBjb25zdCBlbmRJbmRleCA9IHN0YXJ0SW5kZXggPCBsZW5ndGggPyBNYXRoLm1pbihzdGFydEluZGV4ICsgcGFnZVNpemUsIGxlbmd0aCkgOiBzdGFydEluZGV4ICsgcGFnZVNpemU7XG5cbiAgICByZXR1cm4gc2hvcnQgPyBgJHtzdGFydEluZGV4ICsgMX0gLSAke2VuZEluZGV4fS8ke2xlbmd0aH1gIDogYERpc3BsYXlpbmcgJHtzdGFydEluZGV4ICsgMX0gLSAke2VuZEluZGV4fSBvZiAke2xlbmd0aH1gO1xuICB9XG5cbiAgZm9ybWF0Q3VycmVuY3kodmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVVNEJyB9O1xuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZHMgdGhlIEludGwubnVtYmVyRm9ybWF0IGNhcGFiaWxpdHkgd2l0aCB0d28gZXh0cmEgZmVhdHVyZXM6XG4gICAqICAtIERvZXMgTk9UIHJvdW5kIHZhbHVlcywgYnV0IGluc3RlYWQgdHJ1bmNhdGVzIHRvIG1heGltdW1GcmFjdGlvbkRpZ2l0c1xuICAgKiAgLSBCeSBkZWZhdWx0IHVzZXMgYWNjb3VudGluZyBmb3JtYXQgZm9yIG5lZ2F0aXZlIG51bWJlcnM6ICgzLjE0KSBpbnN0ZWFkIG9mIC0zLjE0LlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgICAgICAgICAgIFRoZSBudW1iZXIgdmFsdWUgdG8gY29udmVydCB0byBzdHJpbmdcbiAgICogQHBhcmFtIG92ZXJyaWRlT3B0aW9ucyBBbGxvd3MgZm9yIG92ZXJyaWRpbmcgb3B0aW9ucyB1c2VkIGFuZCBwYXNzZWQgdG8gSW50bC5OdW1iZXJGb3JtYXQoKVxuICAgKi9cbiAgZm9ybWF0QmlnRGVjaW1hbCh2YWx1ZTogbnVtYmVyLCBvdmVycmlkZU9wdGlvbnM/OiBCaWdEZWNpbWFsRm9ybWF0T3B0aW9ucyk6IHN0cmluZyB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnM6IEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zID0ge1xuICAgICAgc3R5bGU6ICdkZWNpbWFsJyxcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgIHVzZUFjY291bnRpbmdGb3JtYXQ6IHRydWUsXG4gICAgfTtcbiAgICBjb25zdCBvcHRpb25zOiBCaWdEZWNpbWFsRm9ybWF0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG92ZXJyaWRlT3B0aW9ucyk7XG4gICAgY29uc3QgdHJ1bmNhdGVkVmFsdWUgPSB0aGlzLnRydW5jYXRlVG9QcmVjaXNpb24odmFsdWUsIG9wdGlvbnMubWF4aW11bUZyYWN0aW9uRGlnaXRzKTtcbiAgICBsZXQgX3ZhbHVlID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KHRydW5jYXRlZFZhbHVlKTtcbiAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICBfdmFsdWUgPSBvcHRpb25zLnVzZUFjY291bnRpbmdGb3JtYXQgPyBgKCR7X3ZhbHVlLnNsaWNlKDEpfSlgIDogYC0ke192YWx1ZS5zbGljZSgxKX1gO1xuICAgIH1cbiAgICByZXR1cm4gX3ZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc3RyaW5nLWJhc2VkIHRydW5jYXRpbmcgb2YgYSBudW1iZXIgd2l0aCBubyByb3VuZGluZ1xuICAgKi9cbiAgdHJ1bmNhdGVUb1ByZWNpc2lvbih2YWx1ZTogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlcikge1xuICAgIGxldCB2YWx1ZUFzU3RyaW5nID0gdmFsdWUgPyB2YWx1ZS50b1N0cmluZygpIDogJzAnO1xuICAgIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbHVlQXNTdHJpbmcuaW5kZXhPZignLicpO1xuICAgIGlmIChkZWNpbWFsSW5kZXggPiAtMSAmJiBkZWNpbWFsSW5kZXggKyBwcmVjaXNpb24gKyAxIDwgdmFsdWVBc1N0cmluZy5sZW5ndGgpIHtcbiAgICAgIHZhbHVlQXNTdHJpbmcgPSB2YWx1ZUFzU3RyaW5nLnN1YnN0cmluZygwLCB2YWx1ZUFzU3RyaW5nLmluZGV4T2YoJy4nKSArIHByZWNpc2lvbiArIDEpO1xuICAgIH1cbiAgICByZXR1cm4gTnVtYmVyKHZhbHVlQXNTdHJpbmcpO1xuICB9XG5cbiAgZm9ybWF0TnVtYmVyKHZhbHVlLCBvcHRpb25zPzogSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdCh2YWx1ZSk7XG4gIH1cblxuICBmb3JtYXREYXRlU2hvcnQodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IERhdGUpIHtcbiAgICBjb25zdCBvcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgIC8vIEREL01NL1lZWVksIEhIOk1NIEEgLSAwMi8xNC8yMDE3LCAxOjE3IFBNXG4gICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICB9O1xuICAgIGNvbnN0IF92YWx1ZSA9IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnID8gbmV3IERhdGUoKSA6IG5ldyBEYXRlKHZhbHVlKTtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoX3ZhbHVlKTtcbiAgfVxuXG4gIGZvcm1hdFRpbWUodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IERhdGUpIHtcbiAgICBjb25zdCBvcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgIC8vIEhIOk1NIEEgLSAxOjE3IFBNXG4gICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICB9O1xuICAgIGNvbnN0IF92YWx1ZSA9IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnID8gbmV3IERhdGUoKSA6IG5ldyBEYXRlKHZhbHVlKTtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoX3ZhbHVlKTtcbiAgfVxuXG4gIGZvcm1hdERhdGUodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IERhdGUpIHtcbiAgICBjb25zdCBvcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgIC8vIEREL01NL1lZWVkgLSAwMi8xNC8yMDE3XG4gICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgfTtcbiAgICBjb25zdCBfdmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyA/IG5ldyBEYXRlKCkgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KF92YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IE5PVk9fRUxFTUVOVFNfTEFCRUxTX1BST1ZJREVSUyA9IFt7IHByb3ZpZGU6IE5vdm9MYWJlbFNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvTGFiZWxTZXJ2aWNlIH1dO1xuIl19