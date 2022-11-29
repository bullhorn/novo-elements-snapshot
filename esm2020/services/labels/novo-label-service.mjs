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
NovoLabelService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabelService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
export const NOVO_ELEMENTS_LABELS_PROVIDERS = [{ provide: NovoLabelService, useClass: NovoLabelService }];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1sYWJlbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvc2VydmljZXMvbGFiZWxzL25vdm8tbGFiZWwtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFnQnhFLE1BQU0sT0FBTyxnQkFBZ0I7SUE0SDNCLFlBR1MsYUFBYSxPQUFPO1FBQXBCLGVBQVUsR0FBVixVQUFVLENBQVU7UUE5SDdCLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osWUFBTyxHQUFHLFFBQVEsQ0FBQztRQUNuQixVQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCwwQkFBcUIsR0FBRyxPQUFPLENBQUM7UUFDaEMsY0FBUyxHQUFHLFlBQVksQ0FBQztRQUN6QixzQkFBaUIsR0FBRywwQkFBMEIsQ0FBQztRQUMvQyw2QkFBd0IsR0FBRyxxQkFBcUIsQ0FBQztRQUNqRCx5QkFBb0IsR0FBRyxpQkFBaUIsQ0FBQztRQUN6Qyx3QkFBbUIsR0FBRywwQkFBMEIsQ0FBQztRQUNqRCxnQkFBVyxHQUFHLDBCQUEwQixDQUFDO1FBQ3pDLHlCQUFvQixHQUFHLDhCQUE4QixDQUFDO1FBQ3RELGdCQUFXLEdBQUcsMEJBQTBCLENBQUM7UUFDekMsMkJBQXNCLEdBQUcsa0JBQWtCLENBQUM7UUFDNUMsbUJBQWMsR0FBRywwQkFBMEIsQ0FBQztRQUM1QyxtQkFBYyxHQUFHLDBCQUEwQixDQUFDO1FBQzVDLGFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxxQkFBcUIsQ0FBQztRQUN2QyxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsV0FBTSxHQUFHLFFBQVEs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QyxDQUFDO0lBQzFFLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBNkI7UUFDdEMsTUFBTSxPQUFPLEdBQStCO1lBQzFDLDBCQUEwQjtZQUMxQixLQUFLLEVBQUUsU0FBUztZQUNoQixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEcsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7OEdBclZVLGdCQUFnQixrQkE4SGpCLFNBQVM7a0hBOUhSLGdCQUFnQixjQUZmLE1BQU07NEZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBOEhJLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsU0FBUzs7QUEwTnJCLE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBMT0NBTEVfSUQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXkgfSBmcm9tICdkYXRlLWZucyc7XG5cbmludGVyZmFjZSBUaW1lRm9ybWF0UGFydHMge1xuICBob3VyOiBzdHJpbmc7XG4gIG1pbnV0ZTogc3RyaW5nO1xuICBkYXlQZXJpb2Q/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMgZXh0ZW5kcyBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMge1xuICB1c2VBY2NvdW50aW5nRm9ybWF0PzogYm9vbGVhbjsgLy8gUmVuZGVyIG5lZ2F0aXZlIG51bWJlcnMgdXNpbmcgcGFyZW5zLiBUcnVlOiBcIigzLjE0KVwiLCBGYWxzZTogXCItMy4xNFwiXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogYHJvb3RgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGFiZWxTZXJ2aWNlIHtcbiAgYW5kID0gJ2FuZCc7XG4gIG5vdCA9ICdub3QnO1xuICBmaWx0ZXJzID0gJ0ZpbHRlcic7XG4gIGNsZWFyID0gJ0NsZWFyJztcbiAgc29ydCA9ICdTb3J0JztcbiAgZGlzdHJpYnV0aW9uTGlzdE93bmVyID0gJ093bmVyJztcbiAgZGF0ZUFkZGVkID0gJ0RhdGUgQWRkZWQnO1xuICBlbXB0eVRhYmxlTWVzc2FnZSA9ICdObyBSZWNvcmRzIHRvIGRpc3BsYXkuLi4nO1xuICBub01hdGNoaW5nUmVjb3Jkc01lc3NhZ2UgPSAnTm8gTWF0Y2hpbmcgUmVjb3Jkcyc7XG4gIG5vTW9yZVJlY29yZHNNZXNzYWdlID0gJ05vIE1vcmUgUmVjb3Jkcyc7XG4gIGVycm9yZWRUYWJsZU1lc3NhZ2UgPSAnT29wcyEgQW4gZXJyb3Igb2NjdXJyZWQuJztcbiAgcGlja2VyRXJyb3IgPSAnT29wcyEgQW4gZXJyb3Igb2NjdXJyZWQuJztcbiAgcGlja2VyVGV4dEZpZWxkRW1wdHkgPSAnQmVnaW4gdHlwaW5nIHRvIHNlZSByZXN1bHRzLic7XG4gIHBpY2tlckVtcHR5ID0gJ05vIHJlc3VsdHMgdG8gZGlzcGxheS4uLic7XG4gIHRhYmJlZEdyb3VwUGlja2VyRW1wdHkgPSAnTm8gcmVzdWx0cyBmb3VuZCc7XG4gIHF1aWNrTm90ZUVycm9yID0gJ09vcHMhIEFuIGVycm9yIG9jY3VycmVkLic7XG4gIHF1aWNrTm90ZUVtcHR5ID0gJ05vIHJlc3VsdHMgdG8gZGlzcGxheS4uLic7XG4gIHJlcXVpcmVkID0gJ1JlcXVpcmVkJztcbiAgbnVtYmVyVG9vTGFyZ2UgPSAnTnVtYmVyIGlzIHRvbyBsYXJnZSc7XG4gIHNhdmUgPSAnU2F2ZSc7XG4gIGNhbmNlbCA9ICdDYW5jZWwnO1xuICBuZXh0ID0gJ05leHQnO1xuICBpdGVtc1BlclBhZ2UgPSAnSXRlbXMgcGVyIHBhZ2U6JztcbiAgY2hvb3NlQUZpZWxkID0gJ0Nob29zZSBhIGZpZWxkLi4uJztcbiAgb3BlcmF0b3IgPSAnT3BlcmF0b3IuLi4nO1xuICBzZWxlY3QgPSAnU2VsZWN0Li4uJztcbiAgdmFsdWUgPSAnVmFsdWUuLi4nO1xuICBzZWxlY3REYXRlUmFuZ2UgPSAnU2VsZWN0IERhdGUgUmFuZ2UuLi4nO1xuICB0eXBlVG9BZGRDaGlwcyA9ICdUeXBlIHRvIGFkZCBjaGlwcy4uLic7XG4gIHNlbGVjdGVkID0gJ1NlbGVjdGVkJztcbiAgc2VsZWN0QWxsT25QYWdlID0gJ1NlbGVjdCBhbGwgb24gcGFnZSc7XG4gIGRlc2VsZWN0QWxsID0gJ0Rlc2VsZWN0IGFsbCc7XG4gIHJlZnJlc2ggPSAnUmVmcmVzaCc7XG4gIGNsb3NlID0gJ0Nsb3NlJztcbiAgbW92ZSA9ICdNb3ZlJztcbiAgc3RhcnREYXRlID0gJ1N0YXJ0IERhdGUnO1xuICBlbmREYXRlID0gJ0VuZCBEYXRlJztcbiAgcmF0ZSA9ICdSYXRlJztcbiAgbW9yZSA9ICdtb3JlJztcbiAgY2xlYXJBbGwgPSAnQ0xFQVIgQUxMJztcbiAgY2xlYXJBbGxOb3JtYWxDYXNlID0gJ0NsZWFyIEFsbCc7XG4gIGNsZWFyU29ydCA9ICdDbGVhciBTb3J0JztcbiAgY2xlYXJGaWx0ZXIgPSAnQ2xlYXIgRmlsdGVyJztcbiAgY2xlYXJTZWFyY2ggPSAnQ2xlYXIgU2VhcmNoJztcbiAgY2xlYXJTZWxlY3RlZCA9ICdDbGVhciBTZWxlY3RlZCc7XG4gIHRvZGF5ID0gJ1RvZGF5JztcbiAgbm93ID0gJ05vdyc7XG4gIGlzUmVxdWlyZWQgPSAnaXMgcmVxdWlyZWQnO1xuICBub3RWYWxpZFllYXIgPSAnaXMgbm90IGEgdmFsaWQgeWVhcic7XG4gIGlzVG9vTGFyZ2UgPSAnaXMgdG9vIGxhcmdlJztcbiAgaW52YWxpZEFkZHJlc3MgPSAncmVxdWlyZXMgYXQgbGVhc3Qgb25lIGZpZWxkIGZpbGxlZCBvdXQnO1xuICBpbnZhbGlkRW1haWwgPSAncmVxdWlyZXMgYSB2YWxpZCBlbWFpbCAoZXguIGFiY0AxMjMuY29tKSc7XG4gIG1pbkxlbmd0aCA9ICdpcyByZXF1aXJlZCB0byBiZSBhIG1pbmltdW0gbGVuZ3RoIG9mJztcbiAgcGFzdDFEYXkgPSAnUGFzdCAxIERheSc7XG4gIHBhc3Q3RGF5cyA9ICdQYXN0IDcgRGF5cyc7XG4gIHBhc3QzMERheXMgPSAnUGFzdCAzMCBEYXlzJztcbiAgcGFzdDkwRGF5cyA9ICdQYXN0IDkwIERheXMnO1xuICBwYXN0MVllYXIgPSAnUGFzdCAxIFllYXInO1xuICBuZXh0MURheSA9ICdOZXh0IDEgRGF5JztcbiAgbmV4dDdEYXlzID0gJ05leHQgNyBEYXlzJztcbiAgbmV4dDMwRGF5cyA9ICdOZXh0IDMwIERheXMnO1xuICBuZXh0OTBEYXlzID0gJ05leHQgOTAgRGF5cyc7XG4gIG5leHQxWWVhciA9ICdOZXh0IDEgWWVhcic7XG4gIGN1c3RvbURhdGVSYW5nZSA9ICdDdXN0b20gRGF0ZSBSYW5nZSc7XG4gIGJhY2tUb1ByZXNldEZpbHRlcnMgPSAnQmFjayB0byBQcmVzZXQgRmlsdGVycyc7XG4gIG9rR290SXQgPSAnT2ssIEdvdCBpdCc7XG4gIGFkZHJlc3MgPSAnQWRkcmVzcyc7XG4gIGFkZHJlc3MxID0gJ0FkZHJlc3MnO1xuICBhcHQgPSAnQXB0JzsgLy8gVE9ETyBkZWxldGVcbiAgYWRkcmVzczIgPSAnQXB0JztcbiAgY2l0eSA9ICdDaXR5IC8gTG9jYWxpdHknO1xuICBzdGF0ZSA9ICdTdGF0ZSAvIFJlZ2lvbic7XG4gIHppcCA9ICdQb3N0YWwgQ29kZSc7XG4gIHppcENvZGUgPSAnUG9zdGFsIENvZGUnOyAvLyBUT0RPIGRlbGV0ZVxuICBjb3VudHJ5ID0gJ0NvdW50cnknO1xuICBvciA9ICdvcic7XG4gIGNsaWNrVG9Ccm93c2UgPSAnY2xpY2sgdG8gYnJvd3NlJztcbiAgY2hvb3NlQUZpbGUgPSAnQ2hvb3NlIGEgZmlsZSc7XG4gIG5vID0gJ05vJztcbiAgeWVzID0gJ1llcyc7XG4gIHNlYXJjaCA9ICdTRUFSQ0gnO1xuICBub0l0ZW1zID0gJ1RoZXJlIGFyZSBubyBpdGVtcyc7XG4gIGRhdGVGb3JtYXQgPSAnTU0vZGQveXl5eSc7XG4gIGRhdGVGb3JtYXRQbGFjZWhvbGRlciA9ICdNTS9ERC9ZWVlZJztcbiAgbG9jYWxEYXRlUGxhY2Vob2xkZXIgPSAnbW0vZGQveXl5eSc7XG4gIHRpbWVGb3JtYXRQbGFjZWhvbGRlckFNID0gJ2hoOm1tIEFNJztcbiAgdGltZUZvcm1hdFBsYWNlaG9sZGVyMjRIb3VyID0gJ0hIOm1tJztcbiAgdGltZUZvcm1hdEFNID0gJ0FNJztcbiAgdGltZUZvcm1hdFBNID0gJ1BNJztcbiAgY29uZmlybUNoYW5nZXNNb2RhbE1lc3NhZ2UgPSAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGlzIGZpZWxkPyc7XG4gIHByb21wdE1vZGFsTWVzc2FnZSA9ICdEbyB5b3Ugd2FudCB0byBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgY2hhbmdlcz8nO1xuICBhc3luY0ZhaWx1cmUgPSAnQXN5bmMgdmFsaWRhdGlvbiB3YXMgbm90IGNhbGxlZCB3aXRoaW4gdGhlIDEwcyB0aHJlc2hvbGQsIHlvdSBtaWdodCB3YW50IHRvIHJlbG9hZCB0aGUgcGFnZSB0byB0cnkgYWdhaW4nO1xuICBwcmV2aW91cyA9ICdQcmV2aW91cyc7XG4gIGFjdGlvbnMgPSAnQWN0aW9ucyc7XG4gIGFsbCA9ICdBbGwnO1xuICBncm91cGVkTXVsdGlQaWNrZXJFbXB0eSA9ICdObyBpdGVtcyB0byBkaXNwbGF5JztcbiAgZ3JvdXBlZE11bHRpUGlja2VyU2VsZWN0Q2F0ZWdvcnkgPSAnU2VsZWN0IGEgY2F0ZWdvcnkgZnJvbSB0aGUgbGVmdCB0byBnZXQgc3RhcnRlZCc7XG4gIGFkZCA9ICdBZGQnO1xuICBlbmNyeXB0ZWRGaWVsZFRvb2x0aXAgPSAnVGhpcyBkYXRhIGhhcyBiZWVuIHN0b3JlZCBhdCB0aGUgaGlnaGVzdCBsZXZlbCBvZiBzZWN1cml0eSc7XG4gIG5vU3RhdGVzRm9yQ291bnRyeSA9ICdObyBzdGF0ZXMgYXZhaWxhYmxlIGZvciB0aGUgc2VsZWN0ZWQgY291bnRyeSc7XG4gIHNlbGVjdENvdW50cnlGaXJzdCA9ICdQbGVhc2Ugc2VsZWN0IGEgY291bnRyeSBiZWZvcmUgc2VsZWN0aW5nIGEgc3RhdGUnO1xuICBpbnZhbGlkSW50ZWdlcklucHV0ID0gJ1NwZWNpYWwgY2hhcmFjdGVycyBhcmUgbm90IGFsbG93ZWQgZm9yJztcbiAgbWF4UmVjb3Jkc1JlYWNoZWQgPSAnU29ycnksIHlvdSBoYXZlIHJlYWNoZWQgdGhlIG1heGltdW0gbnVtYmVyIG9mIHJlY29yZHMgYWxsb3dlZCBmb3IgdGhpcyBmaWVsZCc7XG4gIHNlbGVjdEZpbHRlck9wdGlvbnMgPSAnUGxlYXNlIHNlbGVjdCBvbmUgb3IgbW9yZSBmaWx0ZXIgb3B0aW9ucyBiZWxvdy4nO1xuICBhZGRDb25kaXRpb24gPSAnQWRkIENvbmRpdGlvbic7XG4gIGluY2x1ZGVBbnkgPSAnSW5jbHVkZSBBbnknO1xuICBpbmNsdWRlQWxsID0gJ0luY2x1ZGUgQWxsJztcbiAgZXhjbHVkZSA9ICdFeGNsdWRlJztcbiAgcmFkaXVzID0gJ1JhZGl1cyc7XG4gIGVxdWFscyA9ICdFcXVhbHMnO1xuICBlcXVhbFRvID0gJ0VxdWFsIFRvJztcbiAgZ3JlYXRlclRoYW4gPSAnR3JlYXRlciBUaGFuJztcbiAgbGVzc1RoYW4gPSAnTGVzcyBUaGFuJztcbiAgZG9lc05vdEVxdWFsID0gJ0RvZXMgTm90IEVxdWFsJztcbiAgdHJ1ZSA9ICdUcnVlJztcbiAgZmFsc2UgPSAnRmFsc2UnO1xuICBiZWZvcmUgPSAnQmVmb3JlJztcbiAgYWZ0ZXIgPSAnQWZ0ZXInO1xuICBiZXR3ZWVuID0gJ0JldHdlZW4nO1xuICB3aXRoaW4gPSAnV2l0aGluJztcbiAgaXNFbXB0eSA9ICdJcyBFbXB0eT8nO1xuICByZWZyZXNoUGFnaW5hdGlvbiA9ICdSZWZyZXNoIFBhZ2luYXRpb24nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChMT0NBTEVfSUQpXG4gICAgcHVibGljIHVzZXJMb2NhbGUgPSAnZW4tVVMnLFxuICApIHt9XG5cbiAgbWF4bGVuZ3RoTWV0V2l0aEZpZWxkKGZpZWxkOiBzdHJpbmcsIG1heGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFNvcnJ5LCB5b3UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yICR7ZmllbGR9LmA7XG4gIH1cblxuICBtYXhsZW5ndGhNZXQobWF4bGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgU29ycnksIHlvdSBoYXZlIHJlYWNoZWQgdGhlIG1heGltdW0gY2hhcmFjdGVyIGNvdW50IG9mICR7bWF4bGVuZ3RofSBmb3IgdGhpcyBmaWVsZC5gO1xuICB9XG5cbiAgaW52YWxpZE1heGxlbmd0aFdpdGhGaWVsZChmaWVsZDogc3RyaW5nLCBtYXhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBTb3JyeSwgeW91IGhhdmUgZXhjZWVkZWQgdGhlIG1heGltdW0gY2hhcmFjdGVyIGNvdW50IG9mICR7bWF4bGVuZ3RofSBmb3IgJHtmaWVsZH0uYDtcbiAgfVxuXG4gIGludmFsaWRNYXhsZW5ndGgobWF4bGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgU29ycnksIHlvdSBoYXZlIGV4Y2VlZGVkIHRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudCBvZiAke21heGxlbmd0aH0gZm9yIHRoaXMgZmllbGQuYDtcbiAgfVxuXG4gIGdldFRvTWFueVBsdXNNb3JlKHRvTWFueTogeyBxdWFudGl0eTogbnVtYmVyIH0pOiBzdHJpbmcge1xuICAgIHJldHVybiBgKyR7dG9NYW55LnF1YW50aXR5fSBtb3JlYDtcbiAgfVxuXG4gIHNlbGVjdGVkUmVjb3JkcyhzZWxlY3RlZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGAke3NlbGVjdGVkfSByZWNvcmRzIGFyZSBzZWxlY3RlZC5gO1xuICB9XG5cbiAgc2hvd2luZ1hvZlhSZXN1bHRzKHNob3duOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpIHtcbiAgICByZXR1cm4gYFNob3dpbmcgJHtzaG93bn0gb2YgJHt0b3RhbH0gUmVzdWx0cy5gO1xuICB9XG5cbiAgdG90YWxSZWNvcmRzKHRvdGFsOiBudW1iZXIsIHNlbGVjdCA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHNlbGVjdCA/IGBTZWxlY3QgYWxsICR7dG90YWx9IHJlY29yZHMuYCA6IGBEZS1zZWxlY3QgcmVtYWluaW5nICR7dG90YWx9IHJlY29yZHMuYDtcbiAgfVxuXG4gIGRhdGVGb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0O1xuICB9XG5cbiAgbG9jYWxpemVkRGF0ZVBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxEYXRlUGxhY2Vob2xkZXI7XG4gIH1cblxuICB0YWJiZWRHcm91cENsZWFyU3VnZ2VzdGlvbih0YWJMYWJlbFBsdXJhbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYENsZWFyIHlvdXIgc2VhcmNoIHRvIHNlZSBhbGwgJHt0YWJMYWJlbFBsdXJhbH0uYDtcbiAgfVxuXG4gIGZvcm1hdERhdGVXaXRoRm9ybWF0KHZhbHVlOiBhbnksIGZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXRlID0gdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gdmFsdWUgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgaWYgKGRhdGUuZ2V0VGltZSgpICE9PSBkYXRlLmdldFRpbWUoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBmb3JtYXQpLmZvcm1hdChkYXRlKTtcbiAgfVxuXG4gIGZvcm1hdFRvVGltZU9ubHkocGFyYW0pIHt9XG5cbiAgZm9ybWF0VG9EYXRlT25seShwYXJhbSkge31cblxuICBmb3JtYXRUaW1lV2l0aEZvcm1hdCh2YWx1ZTogYW55LCBmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCBkYXRlID0gdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gdmFsdWUgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgaWYgKGRhdGUuZ2V0VGltZSgpICE9PSBkYXRlLmdldFRpbWUoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjb25zdCB0aW1lUGFydHM6IHsgW3R5cGU6IHN0cmluZ106IHN0cmluZyB9ID0gSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIGZvcm1hdClcbiAgICAgIC5mb3JtYXRUb1BhcnRzKGRhdGUpXG4gICAgICAucmVkdWNlKChvYmosIHBhcnQpID0+IHtcbiAgICAgICAgb2JqW3BhcnQudHlwZV0gPSBwYXJ0LnZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSwge30pO1xuICAgIGNvbnN0IGRheVBlcmlvZCA9IHRpbWVQYXJ0cy5kYXlQZXJpb2QgPyB0aW1lUGFydHMuZGF5UGVyaW9kIDogJyc7XG4gICAgY29uc3QgcmVzID0gYCR7dGltZVBhcnRzLmhvdXJ9OiR7dGltZVBhcnRzLm1pbnV0ZX0gJHtkYXlQZXJpb2R9YDtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgZ2V0V2Vla2RheXMod2Vla1N0YXJ0c09uOiBEYXkgPSAwKTogc3RyaW5nW10ge1xuICAgIGZ1bmN0aW9uIGdldERheShkYXlPZldlZWspIHtcbiAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiBkdC5zZXREYXRlKGR0LmdldERhdGUoKSAtIGR0LmdldERheSgpICsgZGF5T2ZXZWVrKTtcbiAgICB9XG5cbiAgICBsZXQgd2Vla2RheXMgPSBbZ2V0RGF5KDApLCBnZXREYXkoMSksIGdldERheSgyKSwgZ2V0RGF5KDMpLCBnZXREYXkoNCksIGdldERheSg1KSwgZ2V0RGF5KDYpXS5yZWR1Y2UoKHdlZWtkYXlzLCBkdCkgPT4ge1xuICAgICAgd2Vla2RheXMucHVzaChuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pLmZvcm1hdChkdCkpO1xuICAgICAgcmV0dXJuIHdlZWtkYXlzO1xuICAgIH0sIFtdKTtcblxuICAgIGlmICh3ZWVrU3RhcnRzT24gPiAwICYmIHdlZWtTdGFydHNPbiA8PSA2KSB7XG4gICAgICBjb25zdCBuZXdTdGFydCA9IHdlZWtkYXlzLnNwbGljZSh3ZWVrU3RhcnRzT24pO1xuICAgICAgd2Vla2RheXMgPSBbLi4ubmV3U3RhcnQsIC4uLndlZWtkYXlzXTtcbiAgICB9XG4gICAgcmV0dXJuIHdlZWtkYXlzO1xuICB9XG5cbiAgZ2V0TW9udGhzKCk6IHN0cmluZ1tdIHtcbiAgICBmdW5jdGlvbiBnZXRNb250aChtb250aCkge1xuICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIGR0LnNldE1vbnRoKG1vbnRoLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgZ2V0TW9udGgoMCksXG4gICAgICBnZXRNb250aCgxKSxcbiAgICAgIGdldE1vbnRoKDIpLFxuICAgICAgZ2V0TW9udGgoMyksXG4gICAgICBnZXRNb250aCg0KSxcbiAgICAgIGdldE1vbnRoKDUpLFxuICAgICAgZ2V0TW9udGgoNiksXG4gICAgICBnZXRNb250aCg3KSxcbiAgICAgIGdldE1vbnRoKDgpLFxuICAgICAgZ2V0TW9udGgoOSksXG4gICAgICBnZXRNb250aCgxMCksXG4gICAgICBnZXRNb250aCgxMSksXG4gICAgXS5yZWR1Y2UoKG1vbnRocywgZHQpID0+IHtcbiAgICAgIG1vbnRocy5wdXNoKG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgeyBtb250aDogJ2xvbmcnIH0pLmZvcm1hdChkdCkpO1xuICAgICAgcmV0dXJuIG1vbnRocztcbiAgICB9LCBbXSk7XG4gIH1cblxuICBnZXRQcm9wZXJ0eSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXNbdmFsdWVdO1xuICB9XG5cbiAgZ2V0UmFuZ2VUZXh0KHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIsIHNob3J0OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAobGVuZ3RoID09PSAwIHx8IHBhZ2VTaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gYERpc3BsYXlpbmcgMCBvZiAke2xlbmd0aH1gO1xuICAgIH1cblxuICAgIGxlbmd0aCA9IE1hdGgubWF4KGxlbmd0aCwgMCk7XG5cbiAgICBjb25zdCBzdGFydEluZGV4ID0gcGFnZSAqIHBhZ2VTaXplO1xuXG4gICAgLy8gSWYgdGhlIHN0YXJ0IGluZGV4IGV4Y2VlZHMgdGhlIGxpc3QgbGVuZ3RoLCBkbyBub3QgdHJ5IGFuZCBmaXggdGhlIGVuZCBpbmRleCB0byB0aGUgZW5kLlxuICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCA8IGxlbmd0aCA/IE1hdGgubWluKHN0YXJ0SW5kZXggKyBwYWdlU2l6ZSwgbGVuZ3RoKSA6IHN0YXJ0SW5kZXggKyBwYWdlU2l6ZTtcblxuICAgIHJldHVybiBzaG9ydCA/IGAke3N0YXJ0SW5kZXggKyAxfSAtICR7ZW5kSW5kZXh9LyR7bGVuZ3RofWAgOiBgRGlzcGxheWluZyAke3N0YXJ0SW5kZXggKyAxfSAtICR7ZW5kSW5kZXh9IG9mICR7bGVuZ3RofWA7XG4gIH1cblxuICBmb3JtYXRDdXJyZW5jeSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBvcHRpb25zID0geyBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdVU0QnIH07XG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdCh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kcyB0aGUgSW50bC5udW1iZXJGb3JtYXQgY2FwYWJpbGl0eSB3aXRoIHR3byBleHRyYSBmZWF0dXJlczpcbiAgICogIC0gRG9lcyBOT1Qgcm91bmQgdmFsdWVzLCBidXQgaW5zdGVhZCB0cnVuY2F0ZXMgdG8gbWF4aW11bUZyYWN0aW9uRGlnaXRzXG4gICAqICAtIEJ5IGRlZmF1bHQgdXNlcyBhY2NvdW50aW5nIGZvcm1hdCBmb3IgbmVnYXRpdmUgbnVtYmVyczogKDMuMTQpIGluc3RlYWQgb2YgLTMuMTQuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSAgICAgICAgICAgVGhlIG51bWJlciB2YWx1ZSB0byBjb252ZXJ0IHRvIHN0cmluZ1xuICAgKiBAcGFyYW0gb3ZlcnJpZGVPcHRpb25zIEFsbG93cyBmb3Igb3ZlcnJpZGluZyBvcHRpb25zIHVzZWQgYW5kIHBhc3NlZCB0byBJbnRsLk51bWJlckZvcm1hdCgpXG4gICAqL1xuICBmb3JtYXRCaWdEZWNpbWFsKHZhbHVlOiBudW1iZXIsIG92ZXJyaWRlT3B0aW9ucz86IEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogQmlnRGVjaW1hbEZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICBzdHlsZTogJ2RlY2ltYWwnLFxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgdXNlQWNjb3VudGluZ0Zvcm1hdDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnM6IEJpZ0RlY2ltYWxGb3JtYXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3ZlcnJpZGVPcHRpb25zKTtcbiAgICBjb25zdCB0cnVuY2F0ZWRWYWx1ZSA9IHRoaXMudHJ1bmNhdGVUb1ByZWNpc2lvbih2YWx1ZSwgb3B0aW9ucy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMpO1xuICAgIGxldCBfdmFsdWUgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQodHJ1bmNhdGVkVmFsdWUpO1xuICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIF92YWx1ZSA9IG9wdGlvbnMudXNlQWNjb3VudGluZ0Zvcm1hdCA/IGAoJHtfdmFsdWUuc2xpY2UoMSl9KWAgOiBgLSR7X3ZhbHVlLnNsaWNlKDEpfWA7XG4gICAgfVxuICAgIHJldHVybiBfdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzdHJpbmctYmFzZWQgdHJ1bmNhdGluZyBvZiBhIG51bWJlciB3aXRoIG5vIHJvdW5kaW5nXG4gICAqL1xuICB0cnVuY2F0ZVRvUHJlY2lzaW9uKHZhbHVlOiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyKSB7XG4gICAgbGV0IHZhbHVlQXNTdHJpbmcgPSB2YWx1ZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XG4gICAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsdWVBc1N0cmluZy5pbmRleE9mKCcuJyk7XG4gICAgaWYgKGRlY2ltYWxJbmRleCA+IC0xICYmIGRlY2ltYWxJbmRleCArIHByZWNpc2lvbiArIDEgPCB2YWx1ZUFzU3RyaW5nLmxlbmd0aCkge1xuICAgICAgdmFsdWVBc1N0cmluZyA9IHZhbHVlQXNTdHJpbmcuc3Vic3RyaW5nKDAsIHZhbHVlQXNTdHJpbmcuaW5kZXhPZignLicpICsgcHJlY2lzaW9uICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIodmFsdWVBc1N0cmluZyk7XG4gIH1cblxuICBmb3JtYXROdW1iZXIodmFsdWUsIG9wdGlvbnM/OiBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMudXNlckxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KHZhbHVlKTtcbiAgfVxuXG4gIGZvcm1hdERhdGVTaG9ydCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgLy8gREQvTU0vWVlZWSwgSEg6TU0gQSAtIDAyLzE0LzIwMTcsIDE6MTcgUE1cbiAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgIH07XG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0VGltZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgLy8gSEg6TU0gQSAtIDE6MTcgUE1cbiAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgIH07XG4gICAgY29uc3QgX3ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgPyBuZXcgRGF0ZSgpIDogbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLnVzZXJMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChfdmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0RGF0ZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgLy8gREQvTU0vWVlZWSAtIDAyLzE0LzIwMTdcbiAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICB9O1xuICAgIGNvbnN0IF92YWx1ZSA9IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnID8gbmV3IERhdGUoKSA6IG5ldyBEYXRlKHZhbHVlKTtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy51c2VyTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoX3ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTk9WT19FTEVNRU5UU19MQUJFTFNfUFJPVklERVJTID0gW3sgcHJvdmlkZTogTm92b0xhYmVsU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9MYWJlbFNlcnZpY2UgfV07XG4iXX0=