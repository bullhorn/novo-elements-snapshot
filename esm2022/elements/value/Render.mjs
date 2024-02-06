// NG2
import { ChangeDetectorRef, Injectable, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { findByCountryId } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "novo-elements/services";
/**
 * @classdesc
 * Renders data appropriately based on the data type found in Meta
 * All data types defined by bullhorn should be supported:
 *
 * - **String**: trims value and returns
 * - **Integer**: return value
 * - **Double**: return value fixed to 2 decimals
 * - **BigDecimal**: return value fixed to 2 decimals
 * - **Address**: only city and/or state returned
 * - **Address1**: only city and/or state returned
 * - **AddressWithoutCountry**: only city and/or state returned
 * - **Currency**: put a $ in front
 * - **Percentage**: divide by 100 fix to 2 decimals place and return
 * - **Options**: returns the appropriate 'label' for the 'value' from 'options'
 * - **Array**: returns list comma separated
 * - **DateTime**: formats the date
 * - **TimeStamp**: formats the date
 * - **ToOne**: return the entity specific name (ie. name, firstName lastName, title, ...)
 * - **ToMany**: return an array of the entity specific names (ie. name, firstName lastName, title, ...)
 *
 * @example
 * ```
 * {{ expression | render:field }}
 * ```
 */
export class RenderPipe {
    constructor(changeDetector, sanitizationService, labels) {
        this.changeDetector = changeDetector;
        this.sanitizationService = sanitizationService;
        this.labels = labels;
    }
    equals(objectOne, objectTwo) {
        if (objectOne === objectTwo) {
            return true;
        }
        if (objectOne === null || objectTwo === null) {
            return false;
        }
        if (objectOne !== objectOne && objectTwo !== objectTwo) {
            return true;
        }
        const t1 = typeof objectOne;
        const t2 = typeof objectTwo;
        let length;
        let key;
        let keySet;
        if (t1 === t2 && t1 === 'object') {
            if (Array.isArray(objectOne)) {
                if (!Array.isArray(objectTwo)) {
                    return false;
                }
                length = objectOne.length;
                if (length === objectTwo.length) {
                    for (key = 0; key < length; key++) {
                        if (!this.equals(objectOne[key], objectTwo[key])) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            else {
                if (Array.isArray(objectTwo)) {
                    return false;
                }
                keySet = Object.create(null);
                for (key in objectOne) {
                    if (objectOne[key]) {
                        if (!this.equals(objectOne[key], objectTwo[key])) {
                            return false;
                        }
                        keySet[key] = true;
                    }
                }
                for (key in objectTwo) {
                    if (!(key in keySet) && typeof objectTwo[key] !== 'undefined') {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    getEntityLabel(item, entity) {
        switch (entity) {
            case 'CorporateUser':
            case 'ClientContact':
            case 'ClientContact1':
            case 'ClientContact2':
            case 'ClientContact3':
            case 'ClientContact4':
            case 'ClientContact5':
            case 'Lead':
            case 'Candidate':
            case 'Person':
                return `${item.firstName || ''} ${item.lastName || ''}`.trim();
            case 'ClientCorporation':
            case 'ClientCorporation1':
            case 'ClientCorporation2':
            case 'ClientCorporation3':
            case 'ClientCorporation4':
            case 'ClientCorporation5':
                return `${item.name || ''}`.trim();
            case 'JobOrder':
            case 'JobOrder1':
            case 'JobOrder2':
            case 'JobOrder3':
            case 'JobOrder4':
            case 'JobOrder5':
            case 'Opportunity':
                return `${item.title || ''}`.trim();
            case 'Placement':
                let label = '';
                if (item.candidate) {
                    label = `${item.candidate.firstName} ${item.candidate.lastName}`.trim();
                }
                if (item.jobOrder) {
                    label = `${label} - ${item.jobOrder.title}`.trim();
                }
                return label;
            default:
                return '';
        }
    }
    /**
     * Define the fields to set or retrieve for the given entity. Getter and Setter methods will automagically
     * be set up on the entity once the fields are defined.
     * @param args - fields can either be sent as a list of arguments or as an Array
     * @return text
     */
    render(value, args) {
        let type = null;
        let text = value;
        // Handle when we don't have meta, but passing an entity
        if (value && value._subtype && !args) {
            return this.getEntityLabel(value, value._subtype);
        }
        // Stop logic for nulls
        if (value === undefined || value === null || !args) {
            return text;
        }
        if (args.formatter && typeof args.formatter === 'function') {
            return args.formatter(value, args);
        }
        // TODO move this to a service
        // Determine TYPE because its not just 1 value that determines this.
        if (args.type === 'TO_MANY') {
            type = 'ToMany';
        }
        else if (args.type === 'TO_ONE') {
            type = args.associatedEntity.entity;
        }
        else if (args.dataSpecialization === 'DATETIME') {
            type = 'DateTime';
        }
        else if (args.dataSpecialization === 'YEAR') {
            type = 'Year';
        }
        else if (args.dataSpecialization === 'TIME') {
            type = 'Time';
        }
        else if (args.dataSpecialization === 'DATE' && args.dataType === 'Date') {
            type = 'Date';
        }
        else if (args.dataType === 'Timestamp') {
            type = 'Timestamp';
        }
        else if (['mobile', 'phone', 'phone1', 'phone2', 'phone3', 'workPhone'].indexOf(args.name) > -1) {
            type = 'Phone';
        }
        else if (args.name && args.name.substring(0, 5) === 'email') {
            type = 'Email';
        }
        else if ((args.name && args.name === 'address.countryID') || args.optionsType === 'Country') {
            type = 'Country';
        }
        else if (args.optionsType === 'SkillText') {
            type = 'SkillText';
        }
        else if (args.options || args.inputType === 'SELECT' || args.inputType === 'CHECKBOX') {
            type = 'Options';
        }
        else if (['MONEY', 'PERCENTAGE', 'HTML', 'SSN'].indexOf(args.dataSpecialization) > -1) {
            type = this.capitalize(args.dataSpecialization.toLowerCase());
        }
        else {
            type = args.dataType || 'default';
        }
        // Transform data here
        try {
            switch (type) {
                case 'Address':
                case 'Address1':
                case 'AddressWithoutCountry':
                case 'SecondaryAddress':
                case 'BillingAddress':
                    const country = findByCountryId(Number(value.countryName));
                    text = '';
                    if (value.address1 || value.address2) {
                        text += `${value.address1 || ''} ${value.address2 || ''}<br />\n`;
                    }
                    text += `${value.city || ''} ${value.state || ''} ${value.zip || ''}${value.city || value.state || value.zip ? '<br />\n' : ''}`;
                    text += `${country ? country.name : value.countryName || ''}${country || value.countryName ? '<br />\n' : ''}`;
                    text = this.sanitizationService.bypassSecurityTrustHtml(text.trim());
                    break;
                case 'DateTime':
                case 'Timestamp':
                    text = this.labels.formatDateShort(value);
                    break;
                case 'Date':
                    text = this.labels.formatDate(new Date(value));
                    break;
                case 'Year':
                    text = new Date(value).getFullYear();
                    break;
                case 'Time':
                    text = this.labels.formatTimeWithFormat(value, { hour: 'numeric', minute: 'numeric' });
                    break;
                case 'Phone':
                case 'Email':
                    text = value;
                    break;
                case 'Money':
                    text = this.labels.formatCurrency(value);
                    break;
                case 'Percentage':
                    text = this.labels.formatNumber(parseFloat(value).toString(), { style: 'percent', minimumFractionDigits: 2 });
                    break;
                case 'Double':
                case 'BigDecimal':
                    text = this.labels.formatNumber(value, { minimumFractionDigits: this.getNumberDecimalPlaces(value) });
                    break;
                case 'Integer':
                    text = value;
                    break;
                case 'BusinessSector':
                case 'Category':
                case 'Certification':
                case 'ClientCorporation':
                case 'CorporationDepartment':
                case 'DistributionList':
                case 'Skill':
                case 'Tearsheet':
                case 'Specialty':
                    text = value.label || value.name || '';
                    break;
                case 'SkillText':
                    text = Array.isArray(value) ? value.join(', ') : value;
                    break;
                case 'Lead':
                case 'Candidate':
                case 'ClientContact':
                case 'CorporateUser':
                case 'Person':
                    text = value.label || `${value.firstName || ''} ${value.lastName || ''}`;
                    break;
                case 'Opportunity':
                case 'JobOrder':
                    text = value.label || value.title || '';
                    break;
                case 'Placement':
                    if (value.candidate) {
                        text = `${value.candidate.firstName || ''} ${value.candidate.lastName || ''}`;
                    }
                    if (value.jobOrder) {
                        text = value.candidate ? `${text} - ${value.jobOrder.title || ''}` : `${value.jobOrder.title || ''}`;
                    }
                    break;
                case 'JobSubmission':
                    text =
                        value.label ||
                            `${value.jobOrder ? `${value.jobOrder.title} - ` : ''} ${value.candidate ? value.candidate.firstName : ''} ${value.candidate ? value.candidate.lastName : ''}`;
                    break;
                case 'WorkersCompensationRate':
                    text = `${value.compensation ? `${value.compensation.code} - ` : ''} ${value.compensation ? value.compensation.name : ''}`;
                    break;
                case 'Options':
                    text = this.options(value, args.options, args);
                    break;
                case 'ToMany':
                    if (['Candidate', 'CorporateUser', 'Person'].indexOf(args.associatedEntity.entity) > -1) {
                        text = this.concat(value.data, 'firstName', 'lastName');
                        if (value.data.length < value.total) {
                            text = text + ', ' + this.labels.getToManyPlusMore({ quantity: value.total - value.data.length });
                        }
                    }
                    else if (['Category', 'BusinessSector', 'Skill', 'Specialty', 'ClientCorporation', 'CorporationDepartment'].indexOf(args.associatedEntity.entity) > -1) {
                        text = this.concat(value.data, 'name');
                        if (value.data.length < value.total) {
                            text = text + ', ' + this.labels.getToManyPlusMore({ quantity: value.total - value.data.length });
                        }
                    }
                    else if (args.associatedEntity.entity === 'MailListPushHistoryDetail') {
                        text = this.concat(value.data, 'externalListName');
                    }
                    else {
                        text = `${value.total || ''}`;
                    }
                    break;
                case 'Country':
                    const countryObj = findByCountryId(Number(value));
                    text = countryObj ? countryObj.name : value;
                    break;
                case 'Html':
                    if (Array.isArray(value)) {
                        value = value.join(' ');
                    }
                    if (typeof text === 'string') {
                        text = this.sanitizationService.bypassSecurityTrustHtml(value.replace(/\<a/gi, '<a target="_blank"'));
                    }
                    break;
                case 'CandidateComment':
                    text = value.comments ? `${this.labels.formatDateShort(value.dateLastModified)} (${value.name}) - ${value.comments}` : '';
                    break;
                default:
                    text = value.trim ? value.trim() : value;
                    break;
            }
            return text;
        }
        catch (e) {
            console.error(`WARNING: There was a problem rendering the value of the field: ${args.label}. Please check the configuration`);
            console.error(e);
            return text;
        }
    }
    updateValue(value, args) {
        this.value = this.render(value, args);
        this.changeDetector.markForCheck();
    }
    transform(value, args) {
        if (value === undefined || value === null) {
            return '';
        }
        if (this.equals(value, this.lastValue) && this.equals(args, this.lastArgs)) {
            return this.value;
        }
        this.lastValue = value;
        this.lastArgs = args;
        this.updateValue(this.lastValue, this.lastArgs);
        return this.value;
    }
    /**
     * Simple function concat a list of fields from a list of objects
     * @param list - the list of values to use
     * @param fields - list of fields to extract
     */
    concat(list, ...fields) {
        const data = [];
        for (const item of list) {
            const label = [];
            for (const field of fields) {
                label.push(`${item[field]}`);
            }
            data.push(label.join(' '));
        }
        return data.join(', ');
    }
    /**
     * Simple function to look up the **label** to display from options
     * @param value - the value to find
     * @param list - list of options (label/value pairs)
     */
    options(value, list, args) {
        if (!Array.isArray(value)) {
            value = [value];
        }
        try {
            return value.map((item) => {
                for (const option of list) {
                    if (option.value === item) {
                        return option.label;
                    }
                }
                return item;
            });
        }
        catch (e) {
            if (!args.optionsType) {
                throw Error(e);
            }
            return value;
        }
    }
    getNumberDecimalPlaces(value) {
        let decimalPlaces;
        if (value) {
            const numberString = parseFloat(value).toString();
            const decimalPlace = (numberString || '').split('.')[1] || '';
            decimalPlaces = decimalPlace.length;
        }
        return decimalPlaces || 1;
    }
    /**
     * Capitalizes the first letter
     */
    capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RenderPipe, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DomSanitizer }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: RenderPipe, name: "render", pure: false }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RenderPipe }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RenderPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'render',
                    pure: false,
                }]
        }, {
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }, { type: i2.NovoLabelService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdmFsdWUvUmVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFNSCxNQUFNLE9BQU8sVUFBVTtJQUtyQixZQUFvQixjQUFpQyxFQUFVLG1CQUFpQyxFQUFVLE1BQXdCO1FBQTlHLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUV0SSxNQUFNLENBQUMsU0FBYyxFQUFFLFNBQWM7UUFDbkMsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLFNBQVMsS0FBSyxJQUFJLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUM1QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDdEQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE1BQU0sRUFBRSxHQUFRLE9BQU8sU0FBUyxDQUFDO1FBQ2pDLE1BQU0sRUFBRSxHQUFRLE9BQU8sU0FBUyxDQUFDO1FBQ2pDLElBQUksTUFBYyxDQUFDO1FBQ25CLElB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OztPQUVHO0lBQ0gsVUFBVSxDQUFDLEtBQVU7UUFDbkIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzsrR0ExWFUsVUFBVTs2R0FBVixVQUFVO21IQUFWLFVBQVU7OzRGQUFWLFVBQVU7a0JBTHRCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7O2tCQUNBLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBJbmplY3RhYmxlLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgZmluZEJ5Q291bnRyeUlkIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbi8qKlxuICogQGNsYXNzZGVzY1xuICogUmVuZGVycyBkYXRhIGFwcHJvcHJpYXRlbHkgYmFzZWQgb24gdGhlIGRhdGEgdHlwZSBmb3VuZCBpbiBNZXRhXG4gKiBBbGwgZGF0YSB0eXBlcyBkZWZpbmVkIGJ5IGJ1bGxob3JuIHNob3VsZCBiZSBzdXBwb3J0ZWQ6XG4gKlxuICogLSAqKlN0cmluZyoqOiB0cmltcyB2YWx1ZSBhbmQgcmV0dXJuc1xuICogLSAqKkludGVnZXIqKjogcmV0dXJuIHZhbHVlXG4gKiAtICoqRG91YmxlKio6IHJldHVybiB2YWx1ZSBmaXhlZCB0byAyIGRlY2ltYWxzXG4gKiAtICoqQmlnRGVjaW1hbCoqOiByZXR1cm4gdmFsdWUgZml4ZWQgdG8gMiBkZWNpbWFsc1xuICogLSAqKkFkZHJlc3MqKjogb25seSBjaXR5IGFuZC9vciBzdGF0ZSByZXR1cm5lZFxuICogLSAqKkFkZHJlc3MxKio6IG9ubHkgY2l0eSBhbmQvb3Igc3RhdGUgcmV0dXJuZWRcbiAqIC0gKipBZGRyZXNzV2l0aG91dENvdW50cnkqKjogb25seSBjaXR5IGFuZC9vciBzdGF0ZSByZXR1cm5lZFxuICogLSAqKkN1cnJlbmN5Kio6IHB1dCBhICQgaW4gZnJvbnRcbiAqIC0gKipQZXJjZW50YWdlKio6IGRpdmlkZSBieSAxMDAgZml4IHRvIDIgZGVjaW1hbHMgcGxhY2UgYW5kIHJldHVyblxuICogLSAqKk9wdGlvbnMqKjogcmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgJ2xhYmVsJyBmb3IgdGhlICd2YWx1ZScgZnJvbSAnb3B0aW9ucydcbiAqIC0gKipBcnJheSoqOiByZXR1cm5zIGxpc3QgY29tbWEgc2VwYXJhdGVkXG4gKiAtICoqRGF0ZVRpbWUqKjogZm9ybWF0cyB0aGUgZGF0ZVxuICogLSAqKlRpbWVTdGFtcCoqOiBmb3JtYXRzIHRoZSBkYXRlXG4gKiAtICoqVG9PbmUqKjogcmV0dXJuIHRoZSBlbnRpdHkgc3BlY2lmaWMgbmFtZSAoaWUuIG5hbWUsIGZpcnN0TmFtZSBsYXN0TmFtZSwgdGl0bGUsIC4uLilcbiAqIC0gKipUb01hbnkqKjogcmV0dXJuIGFuIGFycmF5IG9mIHRoZSBlbnRpdHkgc3BlY2lmaWMgbmFtZXMgKGllLiBuYW1lLCBmaXJzdE5hbWUgbGFzdE5hbWUsIHRpdGxlLCAuLi4pXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICoge3sgZXhwcmVzc2lvbiB8IHJlbmRlcjpmaWVsZCB9fVxuICogYGBgXG4gKi9cbkBQaXBlKHtcbiAgbmFtZTogJ3JlbmRlcicsXG4gIHB1cmU6IGZhbHNlLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZW5kZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHZhbHVlOiBhbnk7XG4gIGxhc3RWYWx1ZTogYW55O1xuICBsYXN0QXJnczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHNhbml0aXphdGlvblNlcnZpY2U6IERvbVNhbml0aXplciwgcHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgZXF1YWxzKG9iamVjdE9uZTogYW55LCBvYmplY3RUd286IGFueSk6IGFueSB7XG4gICAgaWYgKG9iamVjdE9uZSA9PT0gb2JqZWN0VHdvKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9iamVjdE9uZSA9PT0gbnVsbCB8fCBvYmplY3RUd28gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG9iamVjdE9uZSAhPT0gb2JqZWN0T25lICYmIG9iamVjdFR3byAhPT0gb2JqZWN0VHdvKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgdDE6IGFueSA9IHR5cGVvZiBvYmplY3RPbmU7XG4gICAgY29uc3QgdDI6IGFueSA9IHR5cGVvZiBvYmplY3RUd287XG4gICAgbGV0IGxlbmd0aDogbnVtYmVyO1xuICAgIGxldCBrZXk6IGFueTtcbiAgICBsZXQga2V5U2V0OiBhbnk7XG4gICAgaWYgKHQxID09PSB0MiAmJiB0MSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdE9uZSkpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdFR3bykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0T25lLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gb2JqZWN0VHdvLmxlbmd0aCkge1xuICAgICAgICAgIGZvciAoa2V5ID0gMDsga2V5IDwgbGVuZ3RoOyBrZXkrKykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVxdWFscyhvYmplY3RPbmVba2V5XSwgb2JqZWN0VHdvW2tleV0pKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdFR3bykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAga2V5U2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZm9yIChrZXkgaW4gb2JqZWN0T25lKSB7XG4gICAgICAgICAgaWYgKG9iamVjdE9uZVtrZXldKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZXF1YWxzKG9iamVjdE9uZVtrZXldLCBvYmplY3RUd29ba2V5XSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5U2V0W2tleV0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGtleSBpbiBvYmplY3RUd28pIHtcbiAgICAgICAgICBpZiAoIShrZXkgaW4ga2V5U2V0KSAmJiB0eXBlb2Ygb2JqZWN0VHdvW2tleV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRFbnRpdHlMYWJlbChpdGVtOiBhbnksIGVudGl0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKGVudGl0eSkge1xuICAgICAgY2FzZSAnQ29ycG9yYXRlVXNlcic6XG4gICAgICBjYXNlICdDbGllbnRDb250YWN0JzpcbiAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QxJzpcbiAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QyJzpcbiAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QzJzpcbiAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3Q0JzpcbiAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3Q1JzpcbiAgICAgIGNhc2UgJ0xlYWQnOlxuICAgICAgY2FzZSAnQ2FuZGlkYXRlJzpcbiAgICAgIGNhc2UgJ1BlcnNvbic6XG4gICAgICAgIHJldHVybiBgJHtpdGVtLmZpcnN0TmFtZSB8fCAnJ30gJHtpdGVtLmxhc3ROYW1lIHx8ICcnfWAudHJpbSgpO1xuICAgICAgY2FzZSAnQ2xpZW50Q29ycG9yYXRpb24nOlxuICAgICAgY2FzZSAnQ2xpZW50Q29ycG9yYXRpb24xJzpcbiAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uMic6XG4gICAgICBjYXNlICdDbGllbnRDb3Jwb3JhdGlvbjMnOlxuICAgICAgY2FzZSAnQ2xpZW50Q29ycG9yYXRpb240JzpcbiAgICAgIGNhc2UgJ0NsaWVudENvcnBvcmF0aW9uNSc6XG4gICAgICAgIHJldHVybiBgJHtpdGVtLm5hbWUgfHwgJyd9YC50cmltKCk7XG4gICAgICBjYXNlICdKb2JPcmRlcic6XG4gICAgICBjYXNlICdKb2JPcmRlcjEnOlxuICAgICAgY2FzZSAnSm9iT3JkZXIyJzpcbiAgICAgIGNhc2UgJ0pvYk9yZGVyMyc6XG4gICAgICBjYXNlICdKb2JPcmRlcjQnOlxuICAgICAgY2FzZSAnSm9iT3JkZXI1JzpcbiAgICAgIGNhc2UgJ09wcG9ydHVuaXR5JzpcbiAgICAgICAgcmV0dXJuIGAke2l0ZW0udGl0bGUgfHwgJyd9YC50cmltKCk7XG4gICAgICBjYXNlICdQbGFjZW1lbnQnOlxuICAgICAgICBsZXQgbGFiZWw6IHN0cmluZyA9ICcnO1xuICAgICAgICBpZiAoaXRlbS5jYW5kaWRhdGUpIHtcbiAgICAgICAgICBsYWJlbCA9IGAke2l0ZW0uY2FuZGlkYXRlLmZpcnN0TmFtZX0gJHtpdGVtLmNhbmRpZGF0ZS5sYXN0TmFtZX1gLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5qb2JPcmRlcikge1xuICAgICAgICAgIGxhYmVsID0gYCR7bGFiZWx9IC0gJHtpdGVtLmpvYk9yZGVyLnRpdGxlfWAudHJpbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYWJlbDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lIHRoZSBmaWVsZHMgdG8gc2V0IG9yIHJldHJpZXZlIGZvciB0aGUgZ2l2ZW4gZW50aXR5LiBHZXR0ZXIgYW5kIFNldHRlciBtZXRob2RzIHdpbGwgYXV0b21hZ2ljYWxseVxuICAgKiBiZSBzZXQgdXAgb24gdGhlIGVudGl0eSBvbmNlIHRoZSBmaWVsZHMgYXJlIGRlZmluZWQuXG4gICAqIEBwYXJhbSBhcmdzIC0gZmllbGRzIGNhbiBlaXRoZXIgYmUgc2VudCBhcyBhIGxpc3Qgb2YgYXJndW1lbnRzIG9yIGFzIGFuIEFycmF5XG4gICAqIEByZXR1cm4gdGV4dFxuICAgKi9cbiAgcmVuZGVyKHZhbHVlOiBhbnksIGFyZ3M6IGFueSk6IGFueSB7XG4gICAgbGV0IHR5cGU6IGFueSA9IG51bGw7XG4gICAgbGV0IHRleHQ6IGFueSA9IHZhbHVlO1xuXG4gICAgLy8gSGFuZGxlIHdoZW4gd2UgZG9uJ3QgaGF2ZSBtZXRhLCBidXQgcGFzc2luZyBhbiBlbnRpdHlcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUuX3N1YnR5cGUgJiYgIWFyZ3MpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEVudGl0eUxhYmVsKHZhbHVlLCB2YWx1ZS5fc3VidHlwZSk7XG4gICAgfVxuXG4gICAgLy8gU3RvcCBsb2dpYyBmb3IgbnVsbHNcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCAhYXJncykge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3MuZm9ybWF0dGVyICYmIHR5cGVvZiBhcmdzLmZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGFyZ3MuZm9ybWF0dGVyKHZhbHVlLCBhcmdzKTtcbiAgICB9XG4gICAgLy8gVE9ETyBtb3ZlIHRoaXMgdG8gYSBzZXJ2aWNlXG4gICAgLy8gRGV0ZXJtaW5lIFRZUEUgYmVjYXVzZSBpdHMgbm90IGp1c3QgMSB2YWx1ZSB0aGF0IGRldGVybWluZXMgdGhpcy5cbiAgICBpZiAoYXJncy50eXBlID09PSAnVE9fTUFOWScpIHtcbiAgICAgIHR5cGUgPSAnVG9NYW55JztcbiAgICB9IGVsc2UgaWYgKGFyZ3MudHlwZSA9PT0gJ1RPX09ORScpIHtcbiAgICAgIHR5cGUgPSBhcmdzLmFzc29jaWF0ZWRFbnRpdHkuZW50aXR5O1xuICAgIH0gZWxzZSBpZiAoYXJncy5kYXRhU3BlY2lhbGl6YXRpb24gPT09ICdEQVRFVElNRScpIHtcbiAgICAgIHR5cGUgPSAnRGF0ZVRpbWUnO1xuICAgIH0gZWxzZSBpZiAoYXJncy5kYXRhU3BlY2lhbGl6YXRpb24gPT09ICdZRUFSJykge1xuICAgICAgdHlwZSA9ICdZZWFyJztcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZGF0YVNwZWNpYWxpemF0aW9uID09PSAnVElNRScpIHtcbiAgICAgIHR5cGUgPSAnVGltZSc7XG4gICAgfSBlbHNlIGlmIChhcmdzLmRhdGFTcGVjaWFsaXphdGlvbiA9PT0gJ0RBVEUnICYmIGFyZ3MuZGF0YVR5cGUgPT09ICdEYXRlJykge1xuICAgICAgdHlwZSA9ICdEYXRlJztcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZGF0YVR5cGUgPT09ICdUaW1lc3RhbXAnKSB7XG4gICAgICB0eXBlID0gJ1RpbWVzdGFtcCc7XG4gICAgfSBlbHNlIGlmIChbJ21vYmlsZScsICdwaG9uZScsICdwaG9uZTEnLCAncGhvbmUyJywgJ3Bob25lMycsICd3b3JrUGhvbmUnXS5pbmRleE9mKGFyZ3MubmFtZSkgPiAtMSkge1xuICAgICAgdHlwZSA9ICdQaG9uZSc7XG4gICAgfSBlbHNlIGlmIChhcmdzLm5hbWUgJiYgYXJncy5uYW1lLnN1YnN0cmluZygwLCA1KSA9PT0gJ2VtYWlsJykge1xuICAgICAgdHlwZSA9ICdFbWFpbCc7XG4gICAgfSBlbHNlIGlmICgoYXJncy5uYW1lICYmIGFyZ3MubmFtZSA9PT0gJ2FkZHJlc3MuY291bnRyeUlEJykgfHwgYXJncy5vcHRpb25zVHlwZSA9PT0gJ0NvdW50cnknKSB7XG4gICAgICB0eXBlID0gJ0NvdW50cnknO1xuICAgIH0gZWxzZSBpZiAoYXJncy5vcHRpb25zVHlwZSA9PT0gJ1NraWxsVGV4dCcpIHtcbiAgICAgIHR5cGUgPSAnU2tpbGxUZXh0JztcbiAgICB9IGVsc2UgaWYgKGFyZ3Mub3B0aW9ucyB8fCBhcmdzLmlucHV0VHlwZSA9PT0gJ1NFTEVDVCcgfHwgYXJncy5pbnB1dFR5cGUgPT09ICdDSEVDS0JPWCcpIHtcbiAgICAgIHR5cGUgPSAnT3B0aW9ucyc7XG4gICAgfSBlbHNlIGlmIChbJ01PTkVZJywgJ1BFUkNFTlRBR0UnLCAnSFRNTCcsICdTU04nXS5pbmRleE9mKGFyZ3MuZGF0YVNwZWNpYWxpemF0aW9uKSA+IC0xKSB7XG4gICAgICB0eXBlID0gdGhpcy5jYXBpdGFsaXplKGFyZ3MuZGF0YVNwZWNpYWxpemF0aW9uLnRvTG93ZXJDYXNlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0gYXJncy5kYXRhVHlwZSB8fCAnZGVmYXVsdCc7XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRhdGEgaGVyZVxuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnQWRkcmVzcyc6XG4gICAgICAgIGNhc2UgJ0FkZHJlc3MxJzpcbiAgICAgICAgY2FzZSAnQWRkcmVzc1dpdGhvdXRDb3VudHJ5JzpcbiAgICAgICAgY2FzZSAnU2Vjb25kYXJ5QWRkcmVzcyc6XG4gICAgICAgIGNhc2UgJ0JpbGxpbmdBZGRyZXNzJzpcbiAgICAgICAgICBjb25zdCBjb3VudHJ5OiBhbnkgPSBmaW5kQnlDb3VudHJ5SWQoTnVtYmVyKHZhbHVlLmNvdW50cnlOYW1lKSk7XG4gICAgICAgICAgdGV4dCA9ICcnO1xuICAgICAgICAgIGlmICh2YWx1ZS5hZGRyZXNzMSB8fCB2YWx1ZS5hZGRyZXNzMikge1xuICAgICAgICAgICAgdGV4dCArPSBgJHt2YWx1ZS5hZGRyZXNzMSB8fCAnJ30gJHt2YWx1ZS5hZGRyZXNzMiB8fCAnJ308YnIgLz5cXG5gO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0ZXh0ICs9IGAke3ZhbHVlLmNpdHkgfHwgJyd9ICR7dmFsdWUuc3RhdGUgfHwgJyd9ICR7dmFsdWUuemlwIHx8ICcnfSR7dmFsdWUuY2l0eSB8fCB2YWx1ZS5zdGF0ZSB8fCB2YWx1ZS56aXAgPyAnPGJyIC8+XFxuJyA6ICcnfWA7XG4gICAgICAgICAgdGV4dCArPSBgJHtjb3VudHJ5ID8gY291bnRyeS5uYW1lIDogdmFsdWUuY291bnRyeU5hbWUgfHwgJyd9JHtjb3VudHJ5IHx8IHZhbHVlLmNvdW50cnlOYW1lID8gJzxiciAvPlxcbicgOiAnJ31gO1xuICAgICAgICAgIHRleHQgPSB0aGlzLnNhbml0aXphdGlvblNlcnZpY2UuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGV4dC50cmltKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEYXRlVGltZSc6XG4gICAgICAgIGNhc2UgJ1RpbWVzdGFtcCc6XG4gICAgICAgICAgdGV4dCA9IHRoaXMubGFiZWxzLmZvcm1hdERhdGVTaG9ydCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgIHRleHQgPSB0aGlzLmxhYmVscy5mb3JtYXREYXRlKG5ldyBEYXRlKHZhbHVlKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1llYXInOlxuICAgICAgICAgIHRleHQgPSBuZXcgRGF0ZSh2YWx1ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnVGltZSc6XG4gICAgICAgICAgdGV4dCA9IHRoaXMubGFiZWxzLmZvcm1hdFRpbWVXaXRoRm9ybWF0KHZhbHVlLCB7IGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1Bob25lJzpcbiAgICAgICAgY2FzZSAnRW1haWwnOlxuICAgICAgICAgIHRleHQgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTW9uZXknOlxuICAgICAgICAgIHRleHQgPSB0aGlzLmxhYmVscy5mb3JtYXRDdXJyZW5jeSh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1BlcmNlbnRhZ2UnOlxuICAgICAgICAgIHRleHQgPSB0aGlzLmxhYmVscy5mb3JtYXROdW1iZXIocGFyc2VGbG9hdCh2YWx1ZSkudG9TdHJpbmcoKSwgeyBzdHlsZTogJ3BlcmNlbnQnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RvdWJsZSc6XG4gICAgICAgIGNhc2UgJ0JpZ0RlY2ltYWwnOlxuICAgICAgICAgIHRleHQgPSB0aGlzLmxhYmVscy5mb3JtYXROdW1iZXIodmFsdWUsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiB0aGlzLmdldE51bWJlckRlY2ltYWxQbGFjZXModmFsdWUpIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdJbnRlZ2VyJzpcbiAgICAgICAgICB0ZXh0ID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0J1c2luZXNzU2VjdG9yJzpcbiAgICAgICAgY2FzZSAnQ2F0ZWdvcnknOlxuICAgICAgICBjYXNlICdDZXJ0aWZpY2F0aW9uJzpcbiAgICAgICAgY2FzZSAnQ2xpZW50Q29ycG9yYXRpb24nOlxuICAgICAgICBjYXNlICdDb3Jwb3JhdGlvbkRlcGFydG1lbnQnOlxuICAgICAgICBjYXNlICdEaXN0cmlidXRpb25MaXN0JzpcbiAgICAgICAgY2FzZSAnU2tpbGwnOlxuICAgICAgICBjYXNlICdUZWFyc2hlZXQnOlxuICAgICAgICBjYXNlICdTcGVjaWFsdHknOlxuICAgICAgICAgIHRleHQgPSB2YWx1ZS5sYWJlbCB8fCB2YWx1ZS5uYW1lIHx8ICcnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdTa2lsbFRleHQnOlxuICAgICAgICAgIHRleHQgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTGVhZCc6XG4gICAgICAgIGNhc2UgJ0NhbmRpZGF0ZSc6XG4gICAgICAgIGNhc2UgJ0NsaWVudENvbnRhY3QnOlxuICAgICAgICBjYXNlICdDb3Jwb3JhdGVVc2VyJzpcbiAgICAgICAgY2FzZSAnUGVyc29uJzpcbiAgICAgICAgICB0ZXh0ID0gdmFsdWUubGFiZWwgfHwgYCR7dmFsdWUuZmlyc3ROYW1lIHx8ICcnfSAke3ZhbHVlLmxhc3ROYW1lIHx8ICcnfWA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ09wcG9ydHVuaXR5JzpcbiAgICAgICAgY2FzZSAnSm9iT3JkZXInOlxuICAgICAgICAgIHRleHQgPSB2YWx1ZS5sYWJlbCB8fCB2YWx1ZS50aXRsZSB8fCAnJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUGxhY2VtZW50JzpcbiAgICAgICAgICBpZiAodmFsdWUuY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYCR7dmFsdWUuY2FuZGlkYXRlLmZpcnN0TmFtZSB8fCAnJ30gJHt2YWx1ZS5jYW5kaWRhdGUubGFzdE5hbWUgfHwgJyd9YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZhbHVlLmpvYk9yZGVyKSB7XG4gICAgICAgICAgICB0ZXh0ID0gdmFsdWUuY2FuZGlkYXRlID8gYCR7dGV4dH0gLSAke3ZhbHVlLmpvYk9yZGVyLnRpdGxlIHx8ICcnfWAgOiBgJHt2YWx1ZS5qb2JPcmRlci50aXRsZSB8fCAnJ31gO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnSm9iU3VibWlzc2lvbic6XG4gICAgICAgICAgdGV4dCA9XG4gICAgICAgICAgICB2YWx1ZS5sYWJlbCB8fFxuICAgICAgICAgICAgYCR7dmFsdWUuam9iT3JkZXIgPyBgJHt2YWx1ZS5qb2JPcmRlci50aXRsZX0gLSBgIDogJyd9ICR7dmFsdWUuY2FuZGlkYXRlID8gdmFsdWUuY2FuZGlkYXRlLmZpcnN0TmFtZSA6ICcnfSAke1xuICAgICAgICAgICAgICB2YWx1ZS5jYW5kaWRhdGUgPyB2YWx1ZS5jYW5kaWRhdGUubGFzdE5hbWUgOiAnJ1xuICAgICAgICAgICAgfWA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1dvcmtlcnNDb21wZW5zYXRpb25SYXRlJzpcbiAgICAgICAgICB0ZXh0ID0gYCR7dmFsdWUuY29tcGVuc2F0aW9uID8gYCR7dmFsdWUuY29tcGVuc2F0aW9uLmNvZGV9IC0gYCA6ICcnfSAke3ZhbHVlLmNvbXBlbnNhdGlvbiA/IHZhbHVlLmNvbXBlbnNhdGlvbi5uYW1lIDogJyd9YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnT3B0aW9ucyc6XG4gICAgICAgICAgdGV4dCA9IHRoaXMub3B0aW9ucyh2YWx1ZSwgYXJncy5vcHRpb25zLCBhcmdzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnVG9NYW55JzpcbiAgICAgICAgICBpZiAoWydDYW5kaWRhdGUnLCAnQ29ycG9yYXRlVXNlcicsICdQZXJzb24nXS5pbmRleE9mKGFyZ3MuYXNzb2NpYXRlZEVudGl0eS5lbnRpdHkpID4gLTEpIHtcbiAgICAgICAgICAgIHRleHQgPSB0aGlzLmNvbmNhdCh2YWx1ZS5kYXRhLCAnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJyk7XG4gICAgICAgICAgICBpZiAodmFsdWUuZGF0YS5sZW5ndGggPCB2YWx1ZS50b3RhbCkge1xuICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCArICcsICcgKyB0aGlzLmxhYmVscy5nZXRUb01hbnlQbHVzTW9yZSh7IHF1YW50aXR5OiB2YWx1ZS50b3RhbCAtIHZhbHVlLmRhdGEubGVuZ3RoIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBbJ0NhdGVnb3J5JywgJ0J1c2luZXNzU2VjdG9yJywgJ1NraWxsJywgJ1NwZWNpYWx0eScsICdDbGllbnRDb3Jwb3JhdGlvbicsICdDb3Jwb3JhdGlvbkRlcGFydG1lbnQnXS5pbmRleE9mKFxuICAgICAgICAgICAgICBhcmdzLmFzc29jaWF0ZWRFbnRpdHkuZW50aXR5LFxuICAgICAgICAgICAgKSA+IC0xXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0ZXh0ID0gdGhpcy5jb25jYXQodmFsdWUuZGF0YSwgJ25hbWUnKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5kYXRhLmxlbmd0aCA8IHZhbHVlLnRvdGFsKSB7XG4gICAgICAgICAgICAgIHRleHQgPSB0ZXh0ICsgJywgJyArIHRoaXMubGFiZWxzLmdldFRvTWFueVBsdXNNb3JlKHsgcXVhbnRpdHk6IHZhbHVlLnRvdGFsIC0gdmFsdWUuZGF0YS5sZW5ndGggfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmdzLmFzc29jaWF0ZWRFbnRpdHkuZW50aXR5ID09PSAnTWFpbExpc3RQdXNoSGlzdG9yeURldGFpbCcpIHtcbiAgICAgICAgICAgIHRleHQgPSB0aGlzLmNvbmNhdCh2YWx1ZS5kYXRhLCAnZXh0ZXJuYWxMaXN0TmFtZScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXh0ID0gYCR7dmFsdWUudG90YWwgfHwgJyd9YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0NvdW50cnknOlxuICAgICAgICAgIGNvbnN0IGNvdW50cnlPYmo6IGFueSA9IGZpbmRCeUNvdW50cnlJZChOdW1iZXIodmFsdWUpKTtcbiAgICAgICAgICB0ZXh0ID0gY291bnRyeU9iaiA/IGNvdW50cnlPYmoubmFtZSA6IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdIdG1sJzpcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbignICcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0ZXh0ID0gdGhpcy5zYW5pdGl6YXRpb25TZXJ2aWNlLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlLnJlcGxhY2UoL1xcPGEvZ2ksICc8YSB0YXJnZXQ9XCJfYmxhbmtcIicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0NhbmRpZGF0ZUNvbW1lbnQnOlxuICAgICAgICAgIHRleHQgPSB2YWx1ZS5jb21tZW50cyA/IGAke3RoaXMubGFiZWxzLmZvcm1hdERhdGVTaG9ydCh2YWx1ZS5kYXRlTGFzdE1vZGlmaWVkKX0gKCR7dmFsdWUubmFtZX0pIC0gJHt2YWx1ZS5jb21tZW50c31gIDogJyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGV4dCA9IHZhbHVlLnRyaW0gPyB2YWx1ZS50cmltKCkgOiB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFdBUk5JTkc6IFRoZXJlIHdhcyBhIHByb2JsZW0gcmVuZGVyaW5nIHRoZSB2YWx1ZSBvZiB0aGUgZmllbGQ6ICR7YXJncy5sYWJlbH0uIFBsZWFzZSBjaGVjayB0aGUgY29uZmlndXJhdGlvbmApO1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKHZhbHVlOiBhbnksIGFyZ3M6IGFueSk6IGFueSB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMucmVuZGVyKHZhbHVlLCBhcmdzKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgdHJhbnNmb3JtKHZhbHVlPzogYW55LCBhcmdzPzogYW55KTogYW55IHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVxdWFscyh2YWx1ZSwgdGhpcy5sYXN0VmFsdWUpICYmIHRoaXMuZXF1YWxzKGFyZ3MsIHRoaXMubGFzdEFyZ3MpKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMubGFzdEFyZ3MgPSBhcmdzO1xuXG4gICAgdGhpcy51cGRhdGVWYWx1ZSh0aGlzLmxhc3RWYWx1ZSwgdGhpcy5sYXN0QXJncyk7XG5cbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW1wbGUgZnVuY3Rpb24gY29uY2F0IGEgbGlzdCBvZiBmaWVsZHMgZnJvbSBhIGxpc3Qgb2Ygb2JqZWN0c1xuICAgKiBAcGFyYW0gbGlzdCAtIHRoZSBsaXN0IG9mIHZhbHVlcyB0byB1c2VcbiAgICogQHBhcmFtIGZpZWxkcyAtIGxpc3Qgb2YgZmllbGRzIHRvIGV4dHJhY3RcbiAgICovXG4gIGNvbmNhdChsaXN0OiBhbnksIC4uLmZpZWxkczogYW55W10pOiBhbnkge1xuICAgIGNvbnN0IGRhdGE6IGFueSA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBsaXN0KSB7XG4gICAgICBjb25zdCBsYWJlbDogYW55ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGZpZWxkcykge1xuICAgICAgICBsYWJlbC5wdXNoKGAke2l0ZW1bZmllbGRdfWApO1xuICAgICAgfVxuICAgICAgZGF0YS5wdXNoKGxhYmVsLmpvaW4oJyAnKSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhLmpvaW4oJywgJyk7XG4gIH1cblxuICAvKipcbiAgICogU2ltcGxlIGZ1bmN0aW9uIHRvIGxvb2sgdXAgdGhlICoqbGFiZWwqKiB0byBkaXNwbGF5IGZyb20gb3B0aW9uc1xuICAgKiBAcGFyYW0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gZmluZFxuICAgKiBAcGFyYW0gbGlzdCAtIGxpc3Qgb2Ygb3B0aW9ucyAobGFiZWwvdmFsdWUgcGFpcnMpXG4gICAqL1xuICBvcHRpb25zKHZhbHVlOiBhbnksIGxpc3Q6IGFueSwgYXJnczogYW55KTogYW55IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdmFsdWUubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgbGlzdCkge1xuICAgICAgICAgIGlmIChvcHRpb24udmFsdWUgPT09IGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24ubGFiZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCFhcmdzLm9wdGlvbnNUeXBlKSB7XG4gICAgICAgIHRocm93IEVycm9yKGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldE51bWJlckRlY2ltYWxQbGFjZXModmFsdWU6IGFueSk6IGFueSB7XG4gICAgbGV0IGRlY2ltYWxQbGFjZXM6IGFueTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGNvbnN0IG51bWJlclN0cmluZzogYW55ID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IGRlY2ltYWxQbGFjZTogYW55ID0gKG51bWJlclN0cmluZyB8fCAnJykuc3BsaXQoJy4nKVsxXSB8fCAnJztcbiAgICAgIGRlY2ltYWxQbGFjZXMgPSBkZWNpbWFsUGxhY2UubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gZGVjaW1hbFBsYWNlcyB8fCAxO1xuICB9XG5cbiAgLyoqXG4gICAqIENhcGl0YWxpemVzIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICovXG4gIGNhcGl0YWxpemUodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG4gIH1cbn1cbiJdfQ==