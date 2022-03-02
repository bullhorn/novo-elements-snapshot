import { ModuleWithProviders } from '@angular/core';
import { IMenuOptions } from './elements/menu/menu.types';
export declare class NovoElementProviders {
    static forRoot(options?: {
        menu: IMenuOptions;
    }): ModuleWithProviders<NovoElementProviders>;
    static forChild(): ModuleWithProviders<NovoElementProviders>;
}
