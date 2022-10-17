import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';
export declare class TimezoneControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
    private buildTimezones;
}
