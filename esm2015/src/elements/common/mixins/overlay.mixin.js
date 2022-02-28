/** Mixin to augment a directive with a `overlay` property. */
export function mixinOverlay(base) {
    // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
    // but given we `extend` it from another class, we can assume a constructor being accessible.
    class Mixin extends base {
        constructor(...args) {
            super(...args);
        }
        openPanel() {
            if (!this.disabled) {
                this.overlay.openPanel();
            }
        }
        closePanel() {
            this.overlay.closePanel();
        }
        togglePanel() {
            if (this.panelOpen) {
                this.closePanel();
            }
            else {
                this.openPanel();
            }
        }
        get panelOpen() {
            return this.overlay && this.overlay.panelOpen;
        }
    }
    // Since we don't directly extend from `base` with it's original types, and we instruct
    // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
    // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
    return Mixin;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5taXhpbi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vbWl4aW5zL292ZXJsYXkubWl4aW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJBLDhEQUE4RDtBQUM5RCxNQUFNLFVBQVUsWUFBWSxDQUE0QyxJQUFPO0lBQzdFLDJGQUEyRjtJQUMzRiw2RkFBNkY7SUFDN0YsTUFBZSxLQUFNLFNBQVMsSUFBMkM7UUFHdkUsWUFBWSxHQUFHLElBQVc7WUFDeEIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDakIsQ0FBQztRQUVELFNBQVM7WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUM7UUFFRCxVQUFVO1lBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQsV0FBVztZQUNULElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtRQUNILENBQUM7UUFFRCxJQUFJLFNBQVM7WUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDaEQsQ0FBQztLQUNGO0lBRUQsdUZBQXVGO0lBQ3ZGLHlGQUF5RjtJQUN6Rix1RkFBdUY7SUFDdkYsT0FBTyxLQUErQyxDQUFDO0FBQ3pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vb3ZlcmxheSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnN0cnVjdG9yLCBDb25zdHJ1Y3RvciB9IGZyb20gJy4vY29uc3RydWN0b3InO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJy4vZGlzYWJsZWQubWl4aW4nO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGludGVyZmFjZSBIYXNPdmVybGF5IHtcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcbiAgcmVhZG9ubHkgcGFuZWxPcGVuOiBib29sZWFuO1xuXG4gIG9wZW5QYW5lbCgpOiB2b2lkO1xuICBjbG9zZVBhbmVsKCk6IHZvaWQ7XG4gIHRvZ2dsZVBhbmVsKCk6IHZvaWQ7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgdHlwZSBIYXNPdmVybGF5Q3RvciA9IENvbnN0cnVjdG9yPEhhc092ZXJsYXk+O1xuXG4vKiogTWl4aW4gdG8gYXVnbWVudCBhIGRpcmVjdGl2ZSB3aXRoIGEgYG92ZXJsYXlgIHByb3BlcnR5LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluT3ZlcmxheTxUIGV4dGVuZHMgQWJzdHJhY3RDb25zdHJ1Y3RvcjxDYW5EaXNhYmxlPj4oYmFzZTogVCk6IEhhc092ZXJsYXlDdG9yICYgVCB7XG4gIC8vIE5vdGU6IFdlIGNhc3QgYGJhc2VgIHRvIGB1bmtub3duYCBhbmQgdGhlbiBgQ29uc3RydWN0b3JgLiBJdCBjb3VsZCBiZSBhbiBhYnN0cmFjdCBjbGFzcyxcbiAgLy8gYnV0IGdpdmVuIHdlIGBleHRlbmRgIGl0IGZyb20gYW5vdGhlciBjbGFzcywgd2UgY2FuIGFzc3VtZSBhIGNvbnN0cnVjdG9yIGJlaW5nIGFjY2Vzc2libGUuXG4gIGFic3RyYWN0IGNsYXNzIE1peGluIGV4dGVuZHMgKGJhc2UgYXMgdW5rbm93biBhcyBDb25zdHJ1Y3RvcjxDYW5EaXNhYmxlPikge1xuICAgIGFic3RyYWN0IG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheS5vcGVuUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZVBhbmVsKCk6IHZvaWQge1xuICAgICAgdGhpcy5vdmVybGF5LmNsb3NlUGFuZWwoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVQYW5lbCgpOiB2b2lkIHtcbiAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LnBhbmVsT3BlbjtcbiAgICB9XG4gIH1cblxuICAvLyBTaW5jZSB3ZSBkb24ndCBkaXJlY3RseSBleHRlbmQgZnJvbSBgYmFzZWAgd2l0aCBpdCdzIG9yaWdpbmFsIHR5cGVzLCBhbmQgd2UgaW5zdHJ1Y3RcbiAgLy8gVHlwZVNjcmlwdCB0aGF0IGBUYCBhY3R1YWxseSBpcyBpbnN0YW50aWF0YWJsZSB0aHJvdWdoIGBuZXdgLCB0aGUgdHlwZXMgZG9uJ3Qgb3ZlcmxhcC5cbiAgLy8gVGhpcyBpcyBhIGxpbWl0YXRpb24gaW4gVFMgYXMgYWJzdHJhY3QgY2xhc3NlcyBjYW5ub3QgYmUgdHlwZWQgcHJvcGVybHkgZHluYW1pY2FsbHkuXG4gIHJldHVybiBNaXhpbiBhcyB1bmtub3duIGFzIFQgJiBDb25zdHJ1Y3RvcjxIYXNPdmVybGF5Pjtcbn1cbiJdfQ==