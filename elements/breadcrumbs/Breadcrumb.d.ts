import { TemplateRef } from '@angular/core';
import { BreadcrumbService } from './Breadcrumb.service';
import { NovoBreadcrumbRef } from './Breadcrumb.tokens';
import { SourceConfig } from './Breadcrumb.types';
import * as i0 from "@angular/core";
export declare class BreadcrumbElement implements NovoBreadcrumbRef {
    private breadcrumbService;
    separatorIcon: TemplateRef<any>;
    source: Array<SourceConfig>;
    constructor(breadcrumbService: BreadcrumbService);
    navigateTo($event: any, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbElement, "novo-breadcrumb", never, { "separatorIcon": "separatorIcon"; "source": "source"; }, {}, never, ["*"]>;
}
