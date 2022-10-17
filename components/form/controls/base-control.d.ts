import { ControlConfig, NovoControlConfig } from 'novo-elements/types';
import { NovoControlGroupAddConfig } from '../form-interfaces';
export interface NovoGroupedControlConfig {
    label?: string;
    icon?: string;
    add?: NovoControlGroupAddConfig;
    remove?: boolean;
    key: string;
    initialValue?: {}[];
}
export declare class BaseControl extends ControlConfig {
    __type: string;
    __config: NovoControlConfig;
    constructor(type?: string, config?: NovoControlConfig);
}
