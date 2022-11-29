import { TemplateRef } from '@angular/core';
import { SourceConfig } from './breadcrumb.types';
import { BreadcrumbService } from './breadcrumb.service';
import * as i0 from "@angular/core";
export declare class BreadcrumbElement {
    private breadcrumbService;
    separatorIcon: TemplateRef<any>;
    source: Array<SourceConfig>;
    constructor(breadcrumbService: BreadcrumbService);
    navigateTo($event: any, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbElement, "novo-breadcrumb", never, { "separatorIcon": "separatorIcon"; "source": "source"; }, {}, never, ["*"]>;
}
