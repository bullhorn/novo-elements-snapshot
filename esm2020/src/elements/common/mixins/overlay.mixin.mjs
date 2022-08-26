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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5taXhpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi9taXhpbnMvb3ZlcmxheS5taXhpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkEsOERBQThEO0FBQzlELE1BQU0sVUFBVSxZQUFZLENBQTRDLElBQU87SUFDN0UsMkZBQTJGO0lBQzNGLDZGQUE2RjtJQUM3RixNQUFlLEtBQU0sU0FBUyxJQUEyQztRQUd2RSxZQUFZLEdBQUcsSUFBVztZQUN4QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNqQixDQUFDO1FBRUQsU0FBUztZQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQztRQUVELFVBQVU7WUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQztRQUVELElBQUksU0FBUztZQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNoRCxDQUFDO0tBQ0Y7SUFFRCx1RkFBdUY7SUFDdkYseUZBQXlGO0lBQ3pGLHVGQUF1RjtJQUN2RixPQUFPLEtBQStDLENBQUM7QUFDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQgfSBmcm9tICcuLi9vdmVybGF5JztcbmltcG9ydCB7IEFic3RyYWN0Q29uc3RydWN0b3IsIENvbnN0cnVjdG9yIH0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5pbXBvcnQgeyBDYW5EaXNhYmxlIH0gZnJvbSAnLi9kaXNhYmxlZC5taXhpbic7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgaW50ZXJmYWNlIEhhc092ZXJsYXkge1xuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuICByZWFkb25seSBwYW5lbE9wZW46IGJvb2xlYW47XG5cbiAgb3BlblBhbmVsKCk6IHZvaWQ7XG4gIGNsb3NlUGFuZWwoKTogdm9pZDtcbiAgdG9nZ2xlUGFuZWwoKTogdm9pZDtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCB0eXBlIEhhc092ZXJsYXlDdG9yID0gQ29uc3RydWN0b3I8SGFzT3ZlcmxheT47XG5cbi8qKiBNaXhpbiB0byBhdWdtZW50IGEgZGlyZWN0aXZlIHdpdGggYSBgb3ZlcmxheWAgcHJvcGVydHkuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5PdmVybGF5PFQgZXh0ZW5kcyBBYnN0cmFjdENvbnN0cnVjdG9yPENhbkRpc2FibGU+PihiYXNlOiBUKTogSGFzT3ZlcmxheUN0b3IgJiBUIHtcbiAgLy8gTm90ZTogV2UgY2FzdCBgYmFzZWAgdG8gYHVua25vd25gIGFuZCB0aGVuIGBDb25zdHJ1Y3RvcmAuIEl0IGNvdWxkIGJlIGFuIGFic3RyYWN0IGNsYXNzLFxuICAvLyBidXQgZ2l2ZW4gd2UgYGV4dGVuZGAgaXQgZnJvbSBhbm90aGVyIGNsYXNzLCB3ZSBjYW4gYXNzdW1lIGEgY29uc3RydWN0b3IgYmVpbmcgYWNjZXNzaWJsZS5cbiAgYWJzdHJhY3QgY2xhc3MgTWl4aW4gZXh0ZW5kcyAoYmFzZSBhcyB1bmtub3duIGFzIENvbnN0cnVjdG9yPENhbkRpc2FibGU+KSB7XG4gICAgYWJzdHJhY3Qgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBzdXBlciguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBvcGVuUGFuZWwoKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5Lm9wZW5QYW5lbCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgICB0aGlzLm92ZXJsYXkuY2xvc2VQYW5lbCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZVBhbmVsKCk6IHZvaWQge1xuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkucGFuZWxPcGVuO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNpbmNlIHdlIGRvbid0IGRpcmVjdGx5IGV4dGVuZCBmcm9tIGBiYXNlYCB3aXRoIGl0J3Mgb3JpZ2luYWwgdHlwZXMsIGFuZCB3ZSBpbnN0cnVjdFxuICAvLyBUeXBlU2NyaXB0IHRoYXQgYFRgIGFjdHVhbGx5IGlzIGluc3RhbnRpYXRhYmxlIHRocm91Z2ggYG5ld2AsIHRoZSB0eXBlcyBkb24ndCBvdmVybGFwLlxuICAvLyBUaGlzIGlzIGEgbGltaXRhdGlvbiBpbiBUUyBhcyBhYnN0cmFjdCBjbGFzc2VzIGNhbm5vdCBiZSB0eXBlZCBwcm9wZXJseSBkeW5hbWljYWxseS5cbiAgcmV0dXJuIE1peGluIGFzIHVua25vd24gYXMgVCAmIENvbnN0cnVjdG9yPEhhc092ZXJsYXk+O1xufVxuIl19