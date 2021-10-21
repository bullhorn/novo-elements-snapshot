import { ModuleWithProviders } from '@angular/core';
import { IMenuOptions } from './elements/menu/menu.types';
import * as i0 from "@angular/core";
export declare class NovoElementProviders {
    static forRoot(options?: {
        menu: IMenuOptions;
    }): ModuleWithProviders<NovoElementProviders>;
    static forChild(): ModuleWithProviders<NovoElementProviders>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<NovoElementProviders, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDef<NovoElementProviders>;
}
