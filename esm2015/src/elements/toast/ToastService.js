// NG2
import { Injectable } from '@angular/core';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
// APP
import { NovoToastElement } from './Toast';
export class NovoToastService {
    constructor(componentUtils) {
        this.componentUtils = componentUtils;
        this.references = [];
        this.icons = { default: 'bell', success: 'check', info: 'info', warning: 'warning', danger: 'remove' };
        this.defaults = { hideDelay: 3500, position: 'growlTopRight', theme: 'default' };
    }
    set parentViewContainer(view) {
        this._parentViewContainer = view;
    }
    alert(options, toastElement = NovoToastElement) {
        return new Promise((resolve) => {
            if (!this._parentViewContainer) {
                console.error('No parent view container specified for the ToastService. Set it inside your main application. \nthis.toastService.parentViewContainer = view (ViewContainerRef)');
                return;
            }
            const toast = this.componentUtils.append(toastElement, this._parentViewContainer);
            this.references.push(toast);
            this.handleAlert(toast.instance, options);
            resolve(toast.instance);
        });
    }
    isVisible(toast) {
        return toast.show;
    }
    hide(toast) {
        toast.animate = false;
        setTimeout(() => {
            toast.show = false;
            const REF = this.references.filter((x) => x.instance === toast)[0];
            if (REF) {
                this.references.splice(this.references.indexOf(REF), 1);
                REF.destroy();
            }
        }, 300);
    }
    handleAlert(toast, options) {
        this.setToastOnSession(toast, options);
        setTimeout(() => {
            this.show(toast);
        }, 20);
        if (!toast.isCloseable) {
            this.toastTimer(toast);
        }
    }
    setToastOnSession(toast, opts) {
        const OPTIONS = typeof opts === 'object' ? opts : {};
        toast.parent = this;
        toast.title = OPTIONS.title || '';
        toast.message = OPTIONS.message || '';
        toast.action = OPTIONS.action || null;
        toast.hideDelay = OPTIONS.hideDelay || this.defaults.hideDelay;
        toast.link = OPTIONS.link || '';
        toast.isCloseable = OPTIONS.isCloseable || false;
        const CUSTOM_CLASS = OPTIONS.customClass || '';
        const ALERT_STYLE = OPTIONS.accent ? `novo-accent-${OPTIONS.accent}` : OPTIONS.theme || this.defaults.theme;
        const ALERT_POSITION = OPTIONS.position || this.defaults.position;
        const ALERT_ICON = OPTIONS.icon || this.icons.default;
        toast.iconClass = `bhi-${ALERT_ICON}`;
        toast.launched = true;
        toast.alertTheme = `${ALERT_STYLE} ${ALERT_POSITION} ${CUSTOM_CLASS} toast-container launched`;
    }
    show(toast) {
        toast.show = true;
        setTimeout(addClass, 25);
        /**
         * Adds animate class to be called after a timeout
         **/
        function addClass() {
            toast.animate = true;
        }
    }
    toastTimer(toast) {
        if (toast.hideDelay < 0) {
            return;
        }
        setTimeout(() => {
            this.hide(toast);
        }, toast.hideDelay);
    }
}
NovoToastService.decorators = [
    { type: Injectable }
];
NovoToastService.ctorParameters = () => [
    { type: ComponentUtils }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9hc3RTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3RvYXN0L1RvYXN0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDNUUsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQW9CM0MsTUFBTSxPQUFPLGdCQUFnQjtJQU0zQixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFKbEQsZUFBVSxHQUFlLEVBQUUsQ0FBQztRQUM1QixVQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUNsRyxhQUFRLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBRXZCLENBQUM7SUFFdEQsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJO1FBQzFCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFxQixFQUFFLGVBQW9CLGdCQUFnQjtRQUMvRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLEtBQUssQ0FDWCxpS0FBaUssQ0FDbEss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QUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2xFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFdEQsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLFVBQVUsRUFBRSxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxVQUFVLEdBQUcsR0FBRyxXQUFXLElBQUksY0FBYyxJQUFJLFlBQVksMkJBQTJCLENBQUM7SUFDakcsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFLO1FBQ1IsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6Qjs7WUFFSTtRQUNKLFNBQVMsUUFBUTtZQUNmLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDZCxJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU87U0FDUjtRQUNELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEIsQ0FBQzs7O1lBN0ZGLFVBQVU7OztZQXJCRixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRVdGlscyB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbXBvbmVudC11dGlscy9Db21wb25lbnRVdGlscyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9Ub2FzdEVsZW1lbnQgfSBmcm9tICcuL1RvYXN0JztcblxuZXhwb3J0IHR5cGUgVG9hc3RUaGVtZXMgPSAnZGVmYXVsdCcgfCAnc3VjY2VzcycgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZGFuZ2VyJyB8ICdwb3NpdGl2ZScgfCBzdHJpbmc7XG5leHBvcnQgdHlwZSBUb2FzdEljb25zID0gJ2JlbGwnIHwgJ2NoZWNrJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdyZW1vdmUnIHwgJ2NhdXRpb24nIHwgJ3RpbWVzJyB8ICdjb2ZmZWUnIHwgJ2RhbmdlcicgfCBzdHJpbmc7XG5leHBvcnQgdHlwZSBUb2FzdFBvc2l0aW9ucyA9ICdmaXhlZFRvcCcgfCAnZml4ZWRCb3R0b20nIHwgJ2dyb3dsVG9wUmlnaHQnIHwgJ2dyb3dsVG9wTGVmdCcgfCAnZ3Jvd2xCb3R0b21SaWdodCcgfCAnZ3Jvd2xCb3R0b21MZWZ0JztcblxuZXhwb3J0IGludGVyZmFjZSBUb2FzdE9wdGlvbnMge1xuICB0aXRsZT86IHN0cmluZztcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgYWN0aW9uPzogc3RyaW5nO1xuICBpY29uPzogVG9hc3RJY29ucztcbiAgdGhlbWU/OiBUb2FzdFRoZW1lcztcbiAgYWNjZW50PzogVG9hc3RUaGVtZXM7XG4gIGhpZGVEZWxheT86IG51bWJlcjtcbiAgcG9zaXRpb24/OiBUb2FzdFBvc2l0aW9ucztcbiAgaXNDbG9zZWFibGU/OiBib29sZWFuO1xuICBjdXN0b21DbGFzcz86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdm9Ub2FzdFNlcnZpY2Uge1xuICBfcGFyZW50Vmlld0NvbnRhaW5lcjogYW55O1xuICByZWZlcmVuY2VzOiBBcnJheTxhbnk+ID0gW107XG4gIGljb25zID0geyBkZWZhdWx0OiAnYmVsbCcsIHN1Y2Nlc3M6ICdjaGVjaycsIGluZm86ICdpbmZvJywgd2FybmluZzogJ3dhcm5pbmcnLCBkYW5nZXI6ICdyZW1vdmUnIH07XG4gIGRlZmF1bHRzID0geyBoaWRlRGVsYXk6IDM1MDAsIHBvc2l0aW9uOiAnZ3Jvd2xUb3BSaWdodCcsIHRoZW1lOiAnZGVmYXVsdCcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudFV0aWxzOiBDb21wb25lbnRVdGlscykge31cblxuICBzZXQgcGFyZW50Vmlld0NvbnRhaW5lcih2aWV3KSB7XG4gICAgdGhpcy5fcGFyZW50Vmlld0NvbnRhaW5lciA9IHZpZXc7XG4gIH1cblxuICBhbGVydChvcHRpb25zOiBUb2FzdE9wdGlvbnMsIHRvYXN0RWxlbWVudDogYW55ID0gTm92b1RvYXN0RWxlbWVudCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX3BhcmVudFZpZXdDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAnTm8gcGFyZW50IHZpZXcgY29udGFpbmVyIHNwZWNpZmllZCBmb3IgdGhlIFRvYXN0U2VydmljZS4gU2V0IGl0IGluc2lkZSB5b3VyIG1haW4gYXBwbGljYXRpb24uIFxcbnRoaXMudG9hc3RTZXJ2aWNlLnBhcmVudFZpZXdDb250YWluZXIgPSB2aWV3IChWaWV3Q29udGFpbmVyUmVmKScsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRvYXN0ID0gdGhpcy5jb21wb25lbnRVdGlscy5hcHBlbmQodG9hc3RFbGVtZW50LCB0aGlzLl9wYXJlbnRWaWV3Q29udGFpbmVyKTtcbiAgICAgIHRoaXMucmVmZXJlbmNlcy5wdXNoKHRvYXN0KTtcbiAgICAgIHRoaXMuaGFuZGxlQWxlcnQodG9hc3QuaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgICAgcmVzb2x2ZSh0b2FzdC5pbnN0YW5jZSk7XG4gICAgfSk7XG4gIH1cblxuICBpc1Zpc2libGUodG9hc3QpIHtcbiAgICByZXR1cm4gdG9hc3Quc2hvdztcbiAgfVxuXG4gIGhpZGUodG9hc3QpIHtcbiAgICB0b2FzdC5hbmltYXRlID0gZmFsc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0b2FzdC5zaG93ID0gZmFsc2U7XG4gICAgICBjb25zdCBSRUYgPSB0aGlzLnJlZmVyZW5jZXMuZmlsdGVyKCh4KSA9PiB4Lmluc3RhbmNlID09PSB0b2FzdClbMF07XG4gICAgICBpZiAoUkVGKSB7XG4gICAgICAgIHRoaXMucmVmZXJlbmNlcy5zcGxpY2UodGhpcy5yZWZlcmVuY2VzLmluZGV4T2YoUkVGKSwgMSk7XG4gICAgICAgIFJFRi5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIGhhbmRsZUFsZXJ0KHRvYXN0LCBvcHRpb25zKSB7XG4gICAgdGhpcy5zZXRUb2FzdE9uU2Vzc2lvbih0b2FzdCwgb3B0aW9ucyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNob3codG9hc3QpO1xuICAgIH0sIDIwKTtcbiAgICBpZiAoIXRvYXN0LmlzQ2xvc2VhYmxlKSB7XG4gICAgICB0aGlzLnRvYXN0VGltZXIodG9hc3QpO1xuICAgIH1cbiAgfVxuXG4gIHNldFRvYXN0T25TZXNzaW9uKHRvYXN0LCBvcHRzKSB7XG4gICAgY29uc3QgT1BUSU9OUyA9IHR5cGVvZiBvcHRzID09PSAnb2JqZWN0JyA/IG9wdHMgOiB7fTtcblxuICAgIHRvYXN0LnBhcmVudCA9IHRoaXM7XG4gICAgdG9hc3QudGl0bGUgPSBPUFRJT05TLnRpdGxlIHx8ICcnO1xuICAgIHRvYXN0Lm1lc3NhZ2UgPSBPUFRJT05TLm1lc3NhZ2UgfHwgJyc7XG4gICAgdG9hc3QuYWN0aW9uID0gT1BUSU9OUy5hY3Rpb24gfHwgbnVsbDtcbiAgICB0b2FzdC5oaWRlRGVsYXkgPSBPUFRJT05TLmhpZGVEZWxheSB8fCB0aGlzLmRlZmF1bHRzLmhpZGVEZWxheTtcbiAgICB0b2FzdC5saW5rID0gT1BUSU9OUy5saW5rIHx8ICcnO1xuICAgIHRvYXN0LmlzQ2xvc2VhYmxlID0gT1BUSU9OUy5pc0Nsb3NlYWJsZSB8fCBmYWxzZTtcblxuICAgIGNvbnN0IENVU1RPTV9DTEFTUyA9IE9QVElPTlMuY3VzdG9tQ2xhc3MgfHwgJyc7XG4gICAgY29uc3QgQUxFUlRfU1RZTEUgPSBPUFRJT05TLmFjY2VudCA/IGBub3ZvLWFjY2VudC0ke09QVElPTlMuYWNjZW50fWAgOiBPUFRJT05TLnRoZW1lIHx8IHRoaXMuZGVmYXVsdHMudGhlbWU7XG4gICAgY29uc3QgQUxFUlRfUE9TSVRJT04gPSBPUFRJT05TLnBvc2l0aW9uIHx8IHRoaXMuZGVmYXVsdHMucG9zaXRpb247XG4gICAgY29uc3QgQUxFUlRfSUNPTiA9IE9QVElPTlMuaWNvbiB8fCB0aGlzLmljb25zLmRlZmF1bHQ7XG5cbiAgICB0b2FzdC5pY29uQ2xhc3MgPSBgYmhpLSR7QUxFUlRfSUNPTn1gO1xuICAgIHRvYXN0LmxhdW5jaGVkID0gdHJ1ZTtcbiAgICB0b2FzdC5hbGVydFRoZW1lID0gYCR7QUxFUlRfU1RZTEV9ICR7QUxFUlRfUE9TSVRJT059ICR7Q1VTVE9NX0NMQVNTfSB0b2FzdC1jb250YWluZXIgbGF1bmNoZWRgO1xuICB9XG5cbiAgc2hvdyh0b2FzdCkge1xuICAgIHRvYXN0LnNob3cgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoYWRkQ2xhc3MsIDI1KTtcbiAgICAvKipcbiAgICAgKiBBZGRzIGFuaW1hdGUgY2xhc3MgdG8gYmUgY2FsbGVkIGFmdGVyIGEgdGltZW91dFxuICAgICAqKi9cbiAgICBmdW5jdGlvbiBhZGRDbGFzcygpIHtcbiAgICAgIHRvYXN0LmFuaW1hdGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHRvYXN0VGltZXIodG9hc3QpIHtcbiAgICBpZiAodG9hc3QuaGlkZURlbGF5IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaGlkZSh0b2FzdCk7XG4gICAgfSwgdG9hc3QuaGlkZURlbGF5KTtcbiAgfVxufVxuIl19