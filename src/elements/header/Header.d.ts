export declare class NovoHeaderSpacer {
}
export declare class NovoUtilsComponent {
}
export declare class NovoUtilActionComponent {
    icon: string;
    inverse: boolean;
    disabled: boolean;
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
}
