import * as i0 from "@angular/core";
export declare class NovoHeaderSpacer {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHeaderSpacer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoHeaderSpacer, "header-spacer", never, {}, {}, never, ["*"], false, never>;
}
export declare class NovoUtilsComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoUtilsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoUtilsComponent, "utils", never, {}, {}, never, ["*"], false, never>;
}
export declare class NovoUtilActionComponent {
    icon: string;
    size: string;
    inverse: boolean;
    disabled: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoUtilActionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoUtilActionComponent, "util-action, novo-action", never, { "icon": "icon"; "size": "size"; "inverse": "inverse"; "disabled": "disabled"; }, {}, never, ["*"], false, never>;
}
export declare class NovoHeaderComponent {
    role: string;
    headerClass: string;
    condensed: boolean;
    title: string;
    subTitle: string;
    inverse: string;
    icon: string;
    size: 'small' | 'medium' | 'large';
    get hb_isSizeSmall(): boolean;
    get hb_isSizeLarge(): boolean;
    get hb_isSizeDefault(): boolean;
    set theme(theme: string);
    get theme(): string;
    private _theme;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoHeaderComponent, "novo-header,header[theme],header[accent]", never, { "condensed": "condensed"; "title": "title"; "subTitle": "subTitle"; "icon": "icon"; "size": "size"; "theme": "theme"; }, {}, never, ["[prefix]", "novo-icon, [novo-icon]", "h1, h2, h3, h4, h5, h6, small, novo-title, [novo-title], [novo-subtitle]", "section", "novo-action,[novo-action]", "utils", "[suffix]", "*"], false, never>;
}
