import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';
export declare class TextBoxControl extends BaseControl {
    controlType: string;
    type: string;
    subType: string;
    constructor(config: NovoControlConfig);
    setValidators(type: any): void;
    getTextboxType(type: any): any;
}
