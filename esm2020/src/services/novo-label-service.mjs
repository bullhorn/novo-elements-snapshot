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
        this.isEmpty = 'Is Empty?';
        this.refreshPagination = 'Refresh Pagination';
        this.location = 'Location';
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
}
NovoLabelService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService, deps: [{ token: LOCALE_ID, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
NovoLabelService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
export const NOVO_ELEMENTS_LABELS_PROVIDERS = [{ provide: NovoLabelService, useClass: NovoLabelService }];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1sYWJlbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWN4RSxNQUFNLE9BQU8sZ0JBQWdCO0lBNkgzQixZQUdTLGFBQWEsT0FBTztRQUFwQixlQUFVLEdBQVYsVUFBVSxDQUFVO1FBL0g3QixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFlBQU8sR0FBRyxRQUFRLENBQUM7UUFDbkIsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsMEJBQXFCLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsMEJBQTBCLENBQUM7UUFDL0MsNkJBQXdCLEdBQUcscUJBQXFCLENBQUM7UUFDakQseUJBQW9CLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsd0JBQW1CLEdBQUcsMEJBQTBCLENBQUM7UUFDakQsZ0JBQVcsR0FBRywwQkFBMEIsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyw4QkFBOEIsQ0FBQztRQUN0RCxnQkFBVyxHQUFHLDBCQUEwQixDQUFDO1FBQ3pDLDJCQUFzQixHQUFHLGtCQUFrQixDQUFDO1FBQzVDLG1CQUFjLEdBQUcsMEJBQTBCLENBQUM7UUFDNUMsbUJBQWMsR0FBRywwQkFBMEIsQ0FBQztRQUM1QyxhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcscUJBQXFCLENBQUM7UUFDdkMsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFdBQU0sR0FBRyxRQUFR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QU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQTZCO1FBQ3RDLE1BQU0sT0FBTyxHQUErQjtZQUMxQywwQkFBMEI7WUFDMUIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BHLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUM7OzhHQXRWVSxnQkFBZ0Isa0JBK0hqQixTQUFTO2tIQS9IUixnQkFBZ0I7NEZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVTs7MEJBK0hOLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsU0FBUzs7QUEwTnJCLE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBMT0NBTEVfSUQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyAgaW1wb3J0IERhdGVUaW1lRm9ybWF0UGFydCA9IEludGwuRGF0ZVRpbWVGb3JtYXRQYXJ0O1xuXG5pbnRlcmZhY2UgVGltZUZvcm1hdFBhcnRzIHtcbiAgaG91cjogc3RyaW5nO1xuICBtaW51dGU6IHN0cmluZztcbiAgZGF5UGVyaW9kPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zIGV4dGVuZHMgSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zIHtcbiAgdXNlQWNjb3VudGluZ0Zvcm1hdD86IGJvb2xlYW47IC8vIFJlbmRlciBuZWdhdGl2ZSBudW1iZXJzIHVzaW5nIHBhcmVucy4gVHJ1ZTogXCIoMy4xNClcIiwgRmFsc2U6IFwiLTMuMTRcIlxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm92b0xhYmVsU2VydmljZSB7XG4gIGFuZCA9ICdhbmQnO1xuICBub3QgPSAnbm90JztcbiAgZmlsdGVycyA9ICdGaWx0ZXInO1xuICBjbGVhciA9ICdDbGVhcic7XG4gIHNvcnQgPSAnU29ydCc7XG4gIGRpc3RyaWJ1dGlvbkxpc3RPd25lciA9ICdPd25lcic7XG4gIGRhdGVBZGRlZCA9ICdEYXRlIEFkZGVkJztcbiAgZW1wdHlUYWJsZU1lc3NhZ2UgPSAnTm8gUmVjb3JkcyB0byBkaXNwbGF5Li4uJztcbiAgbm9NYXRjaGluZ1JlY29yZHNNZXNzYWdlID0gJ05vIE1hdGNoaW5nIFJlY29yZHMnO1xuICBub01vcmVSZWNvcmRzTWVzc2FnZSA9ICdObyBNb3JlIFJlY29yZHMnO1xuICBlcnJvcmVkVGFibGVNZXNzYWdlID0gJ09vcHMhIEFuIGVycm9yIG9jY3VycmVkLic7XG4gIHBpY2tlckVycm9yID0gJ09vcHMhIEFuIGVycm9yIG9jY3VycmVkLic7XG4gIHBpY2tlclRleHRGaWVsZEVtcHR5ID0gJ0JlZ2luIHR5cGluZyB0byBzZWUgcmVzdWx0cy4nO1xuICBwaWNrZXJFbXB0eSA9ICdObyByZXN1bHRzIHRvIGRpc3BsYXkuLi4nO1xuICB0YWJiZWRHcm91cFBpY2tlckVtcHR5ID0gJ05vIHJlc3VsdHMgZm91bmQnO1xuICBxdWlja05vdGVFcnJvciA9ICdPb3BzISBBbiBlcnJvciBvY2N1cnJlZC4nO1xuICBxdWlja05vdGVFbXB0eSA9ICdObyByZXN1bHRzIHRvIGRpc3BsYXkuLi4nO1xuICByZXF1aXJlZCA9ICdSZXF1aXJlZCc7XG4gIG51bWJlclRvb0xhcmdlID0gJ051bWJlciBpcyB0b28gbGFyZ2UnO1xuICBzYXZlID0gJ1NhdmUnO1xuICBjYW5jZWwgPSAnQ2FuY2VsJztcbiAgbmV4dCA9ICdOZXh0JztcbiAgaXRlbXNQZXJQYWdlID0gJ0l0ZW1zIHBlciBwYWdlOic7XG4gIGNob29zZUFGaWVsZCA9ICdDaG9vc2UgYSBmaWVsZC4uLic7XG4gIG9wZXJhdG9yID0gJ09wZXJhdG9yLi4uJztcbiAgc2VsZWN0ID0gJ1NlbGVjdC4uLic7XG4gIHZhbHVlID0gJ1ZhbHVlLi4uJztcbiAgc2VsZWN0RGF0ZVJhbmdlID0gJ1NlbGVjdCBEYXRlIFJhbmdlLi4uJ1xuICB0eXBlVG9BZGRDaGlwcyA9ICdUeXBlIHRvIGFkZCBjaGlwcy4uLidcbiAgc2VsZWN0ZWQgPSAnU2VsZWN0ZWQnO1xuICBzZWxlY3RBbGxPblBhZ2UgPSAnU2VsZWN0IGFsbCBvbiBwYWdlJztcbiAgZGVzZWxlY3RBbGwgPSAnRGVzZWxlY3QgYWxsJztcbiAgcmVmcmVzaCA9ICdSZWZyZXNoJztcbiAgY2xvc2UgPSAnQ2xvc2UnO1xuICBtb3ZlID0gJ01vdmUnO1xuICBzdGFydERhdGUgPSAnU3RhcnQgRGF0ZSc7XG4gIGVuZERhdGUgPSAnRW5kIERhdGUnO1xuICByYXRlID0gJ1JhdGUnO1xuICBtb3JlID0gJ21vcmUnO1xuICBjbGVhckFsbCA9ICdDTEVBUiBBTEwnO1xuICBjbGVhckFsbE5vcm1hbENhc2UgPSAnQ2xlYXIgQWxsJztcbiAgY2xlYXJTb3J0ID0gJ0NsZWFyIFNvcnQnO1xuICBjbGVhckZpbHRlciA9ICdDbGVhciBGaWx0ZXInO1xuICBjbGVhclNlYXJjaCA9ICdDbGVhciBTZWFyY2gnO1xuICBjbGVhclNlbGVjdGVkID0gJ0NsZWFyIFNlbGVjdGVkJztcbiAgdG9kYXkgPSAnVG9kYXknO1xuICBub3cgPSAnTm93JztcbiAgaXNSZXF1aXJlZCA9ICdpcyByZXF1aXJlZCc7XG4gIG5vdFZhbGlkWWVhciA9ICdpcyBub3QgYSB2YWxpZCB5ZWFyJztcbiAgaXNUb29MYXJnZSA9ICdpcyB0b28gbGFyZ2UnO1xuICBpbnZhbGlkQWRkcmVzcyA9ICdyZXF1aXJlcyBhdCBsZWFzdCBvbmUgZmllbGQgZmlsbGVkIG91dCc7XG4gIGludmFsaWRFbWFpbCA9ICdyZXF1aXJlcyBhIHZhbGlkIGVtYWlsIChleC4gYWJjQDEyMy5jb20pJztcbiAgbWluTGVuZ3RoID0gJ2lzIHJlcXVpcmVkIHRvIGJlIGEgbWluaW11bSBsZW5ndGggb2YnO1xuICBwYXN0MURheSA9ICdQYXN0IDEgRGF5JztcbiAgcGFzdDdEYXlzID0gJ1Bhc3QgNyBEYXlzJztcbiAgcGFzdDMwRGF5cyA9ICdQYXN0IDMwIERheXMnO1xuICBwYXN0OTBEYXlzID0gJ1Bhc3QgOTAgRGF5cyc7XG4gIHBhc3QxWWVhciA9ICdQYXN0IDEgWWVhcic7XG4gIG5leHQxRGF5ID0gJ05leHQgMSBEYXknO1xuICBuZXh0N0RheXMgPSAnTmV4dCA3IERheXMnO1xuICBuZXh0MzBEYXlzID0gJ05leHQgMzAgRGF5cyc7XG4gIG5leHQ5MERheXMgPSAnTmV4dCA5MCBEYXlzJztcbiAgbmV4dDFZZWFyID0gJ05leHQgMSBZZWFyJztcbiAgY3VzdG9tRGF0ZVJhbmdlID0gJ0N1c3RvbSBEYXRlIFJhbmdlJztcbiAgYmFja1RvUHJlc2V0RmlsdGVycyA9ICdCYWNrIHRvIFByZXNldCBGaWx0ZXJzJztcbiAgb2tHb3RJdCA9ICdPaywgR290IGl0JztcbiAgYWRkcmVzcyA9ICdBZGRyZXNzJztcbiAgYWRkcmVzczEgPSAnQWRkcmVzcyc7XG4gIGFwdCA9ICdBcHQnOyAvLyBUT0RPIGRlbGV0ZVxuICBhZGRyZXNzMiA9ICdBcHQnO1xuICBjaXR5ID0gJ0NpdHkgLyBMb2NhbGl0eSc7XG4gIHN0YXRlID0gJ1N0YXRlIC8gUmVnaW9uJztcbiAgemlwID0gJ1Bvc3RhbCBDb2RlJztcbiAgemlwQ29kZSA9ICdQb3N0YWwgQ29kZSc7IC8vIFRPRE8gZGVsZXRlXG4gIGNvdW50cnkgPSAnQ291bnRyeSc7XG4gIG9yID0gJ29yJztcbiAgY2xpY2tUb0Jyb3dzZSA9ICdjbGljayB0byBicm93c2UnO1xuICBjaG9vc2VBRmlsZSA9ICdDaG9vc2UgYSBmaWxlJztcbiAgbm8gPSAnTm8nO1xuICB5ZXMgPSAnWWVzJztcbiAgc2VhcmNoID0gJ1NFQVJDSCc7XG4gIG5vSXRlbXMgPSAnVGhlcmUgYXJlIG5vIGl0ZW1zJztcbiAgZGF0ZUZvcm1hdCA9ICdNTS9kZC95eXl5JztcbiAgZGF0ZUZvcm1hdFBsYWNlaG9sZGVyID0gJ01NL0REL1lZWVknO1xuICBsb2NhbERhdGVQbGFjZWhvbGRlciA9ICdtbS9kZC95eXl5JztcbiAgdGltZUZvcm1hdFBsYWNlaG9sZGVyQU0gPSAnaGg6bW0gQU0nO1xuICB0aW1lRm9ybWF0UGxhY2Vob2xkZXIyNEhvdXIgPSAnSEg6bW0nO1xuICB0aW1lRm9ybWF0QU0gPSAnQU0nO1xuICB0aW1lRm9ybWF0UE0gPSAnUE0nO1xuICBjb25maXJtQ2hhbmdlc01vZGFsTWVzc2FnZSA9ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoaXMgZmllbGQ/JztcbiAgcHJvbXB0TW9kYWxNZXNzYWdlID0gJ0RvIHlvdSB3YW50IHRvIHBlcmZvcm0gdGhlIGZvbGxvd2luZyBjaGFuZ2VzPyc7XG4gIGFzeW5jRmFpbHVyZSA9ICdBc3luYyB2YWxpZGF0aW9uIHdhcyBub3QgY2FsbGVkIHdpdGhpbiB0aGUgMTBzIHRocmVzaG9sZCwgeW91IG1pZ2h0IHdhbnQgdG8gcmVsb2FkIHRoZSBwYWdlIHRvIHRyeSBhZ2Fpbic7XG4gIHByZXZpb3VzID0gJ1ByZXZpb3VzJztcbiAgYWN0aW9ucyA9ICdBY3Rpb25zJztcbiAgYWxsID0gJ0FsbCc7XG4gIGdyb3VwZWRNdWx0aVBpY2tlckVtcHR5ID0gJ05vIGl0ZW1zIHRvIGRpc3BsYXknO1xuICBncm91cGVkTXVsdGlQaWNrZXJTZWxlY3RDYXRlZ29yeSA9ICdTZWxlY3QgYSBjYXRlZ29yeSBmcm9tIHRoZSBsZWZ0IHRvIGdldCBzdGFydGVkJztcbiAgYWRkID0gJ0FkZCc7XG4gIGVuY3J5cHRlZEZpZWxkVG9vbHRpcCA9ICdUaGlzIGRhdGEgaGFzIGJlZW4gc3RvcmVkIGF0IHRoZSBoaWdoZXN0IGxldmVsIG9mIHNlY3VyaXR5JztcbiAgbm9TdGF0ZXNGb3JDb3VudHJ5ID0gJ05vIHN0YXRlcyBhdmFpbGFibGUgZm9yIHRoZSBzZWxlY3RlZCBjb3VudHJ5JztcbiAgc2VsZWN0Q291bnRyeUZpcnN0ID0gJ1BsZWFzZSBzZWxlY3QgYSBjb3VudHJ5IGJlZm9yZSBzZWxlY3RpbmcgYSBzdGF0ZSc7XG4gIGludmFsaWRJbnRlZ2VySW5wdXQgPSAnU3BlY2lhbCBjaGFyYWN0ZXJzIGFyZSBub3QgYWxsb3dlZCBmb3InO1xuICBtYXhSZWNvcmRzUmVhY2hlZCA9ICdTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBudW1iZXIgb2YgcmVjb3JkcyBhbGxvd2VkIGZvciB0aGlzIGZpZWxkJztcbiAgc2VsZWN0RmlsdGVyT3B0aW9ucyA9ICdQbGVhc2Ugc2VsZWN0IG9uZSBvciBtb3JlIGZpbHRlciBvcHRpb25zIGJlbG93Lic7XG4gIGFkZENvbmRpdGlvbiA9ICdBZGQgQ29uZGl0aW9uJztcbiAgaW5jbHVkZUFueSA9ICdJbmNsdWRlIEFueSc7XG4gIGluY2x1ZGVBbGwgPSAnSW5jbHVkZSBBbGwnO1xuICBleGNsdWRlID0gJ0V4Y2x1ZGUnO1xuICByYWRpdXMgPSAnUmFkaXVzJztcbiAgZXF1YWxzID0gJ0VxdWFscyc7XG4gIGVxdWFsVG8gPSAnRXF1YWwgVG8nO1xuICBncmVhdGVyVGhhbiA9ICdHcmVhdGVyIFRoYW4nO1xuICBsZXNzVGhhbiA9ICdMZXNzIFRoYW4nO1xuICBkb2VzTm90RXF1YWwgPSAnRG9lcyBOb3QgRXF1YWwnO1xuICB0cnVlID0gJ1RydWUnO1xuICBmYWxzZSA9ICdGYWxzZSc7XG4gIGJlZm9yZSA9ICdCZWZvcmUnO1xuICBhZnRlciA9ICdBZnRlcic7XG4gIGJldHdlZW4gPSAnQmV0d2Vlbic7XG4gIHdpdGhpbiA9ICdXaXRoaW4nO1xuICBpc0VtcHR5ID0gJ0lzIEVtcHR5Pyc7XG4gIHJlZnJlc2hQYWdpbmF0aW9uID0gJ1JlZnJlc2ggUGFnaW5hdGlvbic7XG4gIGxvY2F0aW9uID0gJ0xvY2F0aW9uJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTE9DQUxFX0lEKVxuICAgIHB1YmxpYyB1c2VyTG9jYWxlID0gJ2VuLVVTJyxcbiAgKSB7fVxuXG4gIG1heGxlbmd0aE1ldFdpdGhGaWVsZChmaWVsZDogc3RyaW5nLCBtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciAke2ZpZWxkfS5gO1xuICB9XG5cbiAgbWF4bGVuZ3RoTWV0KG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yIHRoaXMgZmllbGQuYDtcbiAgfVxuXG4gIGludmFsaWRNYXhsZW5ndGhXaXRoRmllbGQoZmllbGQ6IHN0cmluZywgbWF4bGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgU29ycnksIHlvdSBoYXZlIGV4Y2VlZGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yICR7ZmllbGR9LmA7XG4gIH1cblxuICBpbnZhbGlkTWF4bGVuZ3RoKG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSBleGNlZWRlZCB0aGUgbWF4aW11bSBjaGFyYWN0ZXIgY291bnQgb2YgJHttYXhsZW5ndGh9IGZvciB0aGlzIGZpZWxkLmA7XG4gIH1cblxuICBnZXRUb01hbnlQbHVzTW9yZSh0b01hbnk6IHsgcXVhbnRpdHk6IG51bWJlciB9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCske3RvTWFueS5xdWFudGl0eX0gbW9yZWA7XG4gIH1cblxuICBzZWxlY3RlZFJlY29yZHMoc2VsZWN0ZWQ6IG51bWJlcikge1xuICAgIHJldHVybiBgJHtzZWxlY3RlZH0gcmVjb3JkcyBhcmUgc2VsZWN0ZWQuYDtcbiAgfVxuXG4gIHNob3dpbmdYb2ZYUmVzdWx0cyhzaG93bjogbnVtYmVyLCB0b3RhbDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGBTaG93aW5nICR7c2hvd259IG9mICR7dG90YWx9IFJlc3VsdHMuYDtcbiAgfVxuXG4gIHRvdGFsUmVjb3Jkcyh0b3RhbDogbnVtYmVyLCBzZWxlY3QgPSBmYWxzZSkge1xuICAgIHJldHVybiBzZWxlY3QgPyBgU2VsZWN0IGFsbCAke3RvdGFsfSByZWNvcmRzLmAgOiBgRGUtc2VsZWN0IHJlbWFpbmluZyAke3RvdGFsfSByZWNvcmRzLmA7XG4gIH1cblxuICBkYXRlRm9ybWF0U3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdDtcbiAgfVxuXG4gIGxvY2FsaXplZERhdGVQbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvY2FsRGF0ZVBsYWNlaG9sZGVyO1xuICB9XG5cbiAgdGFiYmVkR3JvdXBDbGVhclN1Z2dlc3Rpb24odGFiTGFiZWxQbHVyYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBDbGVhciB5b3VyIHNlYXJjaCB0byBzZWUgYWxsICR7dGFiTGFiZWxQbHVyYWx9LmA7XG4gIH1cblxuICBmb3JtYXREYXRlV2l0aEZvcm1hdCh2YWx1ZTogYW55LCBmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSB7XG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xuICAgIGlmIChkYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgZm9ybWF0KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICBmb3JtYXRUb1RpbWVPbmx5KHBhcmFtKSB7fVxuXG4gIGZvcm1hdFRvRGF0ZU9ubHkocGFyYW0pIHt9XG5cbiAgZm9ybWF0VGltZVdpdGhGb3JtYXQodmFsdWU6IGFueSwgZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyk6IHN0cmluZyB7XG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xuICAgIGlmIChkYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY29uc3QgdGltZVBhcnRzOiB7IFt0eXBlOiBzdHJpbmddOiBzdHJpbmcgfSA9IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBmb3JtYXQpXG4gICAgICAuZm9ybWF0VG9QYXJ0cyhkYXRlKVxuICAgICAgLnJlZHVjZSgob2JqLCBwYXJ0KSA9PiB7XG4gICAgICAgIG9ialtwYXJ0LnR5cGVdID0gcGFydC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0sIHt9KTtcbiAgICBjb25zdCBkYXlQZXJpb2QgPSB0aW1lUGFydHMuZGF5UGVyaW9kID8gdGltZVBhcnRzLmRheVBlcmlvZCA6ICcnO1xuICAgIGNvbnN0IHJlcyA9IGAke3RpbWVQYXJ0cy5ob3VyfToke3RpbWVQYXJ0cy5taW51dGV9ICR7ZGF5UGVyaW9kfWA7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGdldFdlZWtkYXlzKHdlZWtTdGFydHNPbiA9IDApOiBzdHJpbmdbXSB7XG4gICAgZnVuY3Rpb24gZ2V0RGF5KGRheU9mV2Vlaykge1xuICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIGR0LnNldERhdGUoZHQuZ2V0RGF0ZSgpIC0gZHQuZ2V0RGF5KCkgKyBkYXlPZldlZWspO1xuICAgIH1cblxuICAgIGxldCB3ZWVrZGF5cyA9IFtnZXREYXkoMCksIGdldERheSgxKSwgZ2V0RGF5KDIpLCBnZXREYXkoMyksIGdldERheSg0KSwgZ2V0RGF5KDUpLCBnZXREYXkoNildLnJlZHVjZSgod2Vla2RheXMsIGR0KSA9PiB7XG4gICAgICB3ZWVrZGF5cy5wdXNoKG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgeyB3ZWVrZGF5OiAnbG9uZycgfSkuZm9ybWF0KGR0KSk7XG4gICAgICByZXR1cm4gd2Vla2RheXM7XG4gICAgfSwgW10pO1xuXG4gICAgaWYgKHdlZWtTdGFydHNPbiA+IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpIHtcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gd2Vla2RheXMuc3BsaWNlKHdlZWtTdGFydHNPbik7XG4gICAgICB3ZWVrZGF5cyA9IFsuLi5uZXdTdGFydCwgLi4ud2Vla2RheXNdO1xuICAgIH1cbiAgICByZXR1cm4gd2Vla2RheXM7XG4gIH1cblxuICBnZXRNb250aHMoKTogc3RyaW5nW10ge1xuICAgIGZ1bmN0aW9uIGdldE1vbnRoKG1vbnRoKSB7XG4gICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKCk7XG4gICAgICByZXR1cm4gZHQuc2V0TW9udGgobW9udGgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICBnZXRNb250aCgwKSxcbiAgICAgIGdldE1vbnRoKDEpLFxuICAgICAgZ2V0TW9udGgoMiksXG4gICAgICBnZXRNb250aCgzKSxcbiAgICAgIGdldE1vbnRoKDQpLFxuICAgICAgZ2V0TW9udGgoNSksXG4gICAgICBnZXRNb250aCg2KSxcbiAgICAgIGdldE1vbnRoKDcpLFxuICAgICAgZ2V0TW9udGgoOCksXG4gICAgICBnZXRNb250aCg5KSxcbiAgICAgIGdldE1vbnRoKDEwKSxcbiAgICAgIGdldE1vbnRoKDExKSxcbiAgICBdLnJlZHVjZSgobW9udGhzLCBkdCkgPT4ge1xuICAgICAgbW9udGhzLnB1c2gobmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCB7IG1vbnRoOiAnbG9uZycgfSkuZm9ybWF0KGR0KSk7XG4gICAgICByZXR1cm4gbW9udGhzO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGdldFByb3BlcnR5KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpc1t2YWx1ZV07XG4gIH1cblxuICBnZXRSYW5nZVRleHQocGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBsZW5ndGg6IG51bWJlciwgc2hvcnQ6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGlmIChsZW5ndGggPT09IDAgfHwgcGFnZVNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBgRGlzcGxheWluZyAwIG9mICR7bGVuZ3RofWA7XG4gICAgfVxuXG4gICAgbGVuZ3RoID0gTWF0aC5tYXgobGVuZ3RoLCAwKTtcblxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBwYWdlICogcGFnZVNpemU7XG5cbiAgICAvLyBJZiB0aGUgc3RhcnQgaW5kZXggZXhjZWVkcyB0aGUgbGlzdCBsZW5ndGgsIGRvIG5vdCB0cnkgYW5kIGZpeCB0aGUgZW5kIGluZGV4IHRvIHRoZSBlbmQuXG4gICAgY29uc3QgZW5kSW5kZXggPSBzdGFydEluZGV4IDwgbGVuZ3RoID8gTWF0aC5taW4oc3RhcnRJbmRleCArIHBhZ2VTaXplLCBsZW5ndGgpIDogc3RhcnRJbmRleCArIHBhZ2VTaXplO1xuXG4gICAgcmV0dXJuIHNob3J0ID8gYCR7c3RhcnRJbmRleCArIDF9IC0gJHtlbmRJbmRleH0vJHtsZW5ndGh9YCA6IGBEaXNwbGF5aW5nICR7c3RhcnRJbmRleCArIDF9IC0gJHtlbmRJbmRleH0gb2YgJHtsZW5ndGh9YDtcbiAgfVxuXG4gIGZvcm1hdEN1cnJlbmN5KHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1VTRCcgfTtcbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmRzIHRoZSBJbnRsLm51bWJlckZvcm1hdCBjYXBhYmlsaXR5IHdpdGggdHdvIGV4dHJhIGZlYXR1cmVzOlxuICAgKiAgLSBEb2VzIE5PVCByb3VuZCB2YWx1ZXMsIGJ1dCBpbnN0ZWFkIHRydW5jYXRlcyB0byBtYXhpbXVtRnJhY3Rpb25EaWdpdHNcbiAgICogIC0gQnkgZGVmYXVsdCB1c2VzIGFjY291bnRpbmcgZm9ybWF0IGZvciBuZWdhdGl2ZSBudW1iZXJzOiAoMy4xNCkgaW5zdGVhZCBvZiAtMy4xNC5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlICAgICAgICAgICBUaGUgbnVtYmVyIHZhbHVlIHRvIGNvbnZlcnQgdG8gc3RyaW5nXG4gICAqIEBwYXJhbSBvdmVycmlkZU9wdGlvbnMgQWxsb3dzIGZvciBvdmVycmlkaW5nIG9wdGlvbnMgdXNlZCBhbmQgcGFzc2VkIHRvIEludGwuTnVtYmVyRm9ybWF0KClcbiAgICovXG4gIGZvcm1hdEJpZ0RlY2ltYWwodmFsdWU6IG51bWJlciwgb3ZlcnJpZGVPcHRpb25zPzogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zOiBCaWdEZWNpbWFsRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgIHN0eWxlOiAnZGVjaW1hbCcsXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICB1c2VBY2NvdW50aW5nRm9ybWF0OiB0cnVlLFxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9uczogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvdmVycmlkZU9wdGlvbnMpO1xuICAgIGNvbnN0IHRydW5jYXRlZFZhbHVlID0gdGhpcy50cnVuY2F0ZVRvUHJlY2lzaW9uKHZhbHVlLCBvcHRpb25zLm1heGltdW1GcmFjdGlvbkRpZ2l0cyk7XG4gICAgbGV0IF92YWx1ZSA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdCh0cnVuY2F0ZWRWYWx1ZSk7XG4gICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgX3ZhbHVlID0gb3B0aW9ucy51c2VBY2NvdW50aW5nRm9ybWF0ID8gYCgke192YWx1ZS5zbGljZSgxKX0pYCA6IGAtJHtfdmFsdWUuc2xpY2UoMSl9YDtcbiAgICB9XG4gICAgcmV0dXJuIF92YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHN0cmluZy1iYXNlZCB0cnVuY2F0aW5nIG9mIGEgbnVtYmVyIHdpdGggbm8gcm91bmRpbmdcbiAgICovXG4gIHRydW5jYXRlVG9QcmVjaXNpb24odmFsdWU6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgICBsZXQgdmFsdWVBc1N0cmluZyA9IHZhbHVlID8gdmFsdWUudG9TdHJpbmcoKSA6ICcwJztcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWx1ZUFzU3RyaW5nLmluZGV4T2YoJy4nKTtcbiAgICBpZiAoZGVjaW1hbEluZGV4ID4gLTEgJiYgZGVjaW1hbEluZGV4ICsgcHJlY2lzaW9uICsgMSA8IHZhbHVlQXNTdHJpbmcubGVuZ3RoKSB7XG4gICAgICB2YWx1ZUFzU3RyaW5nID0gdmFsdWVBc1N0cmluZy5zdWJzdHJpbmcoMCwgdmFsdWVBc1N0cmluZy5pbmRleE9mKCcuJykgKyBwcmVjaXNpb24gKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZUFzU3RyaW5nKTtcbiAgfVxuXG4gIGZvcm1hdE51bWJlcih2YWx1ZSwgb3B0aW9ucz86IEludGwuTnVtYmVyRm9ybWF0T3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQodmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0RGF0ZVNob3J0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAvLyBERC9NTS9ZWVlZLCBISDpNTSBBIC0gMDIvMTQvMjAxNywgMToxNyBQTVxuICAgICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgfTtcbiAgICBjb25zdCBfdmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyA/IG5ldyBEYXRlKCkgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KF92YWx1ZSk7XG4gIH1cblxuICBmb3JtYXRUaW1lKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAvLyBISDpNTSBBIC0gMToxNyBQTVxuICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgfTtcbiAgICBjb25zdCBfdmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyA/IG5ldyBEYXRlKCkgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KF92YWx1ZSk7XG4gIH1cblxuICBmb3JtYXREYXRlKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAvLyBERC9NTS9ZWVlZIC0gMDIvMTQvMjAxN1xuICAgICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgIH07XG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBOT1ZPX0VMRU1FTlRTX0xBQkVMU19QUk9WSURFUlMgPSBbeyBwcm92aWRlOiBOb3ZvTGFiZWxTZXJ2aWNlLCB1c2VDbGFzczogTm92b0xhYmVsU2VydmljZSB9XTtcbiJdfQ==