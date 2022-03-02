/** Mixin to augment a directive with a `size` property. */
export function mixinSize(base, defaultSize) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.defaultSize = defaultSize;
            // Set the default size that can be specified from the mixin.
            this.size = defaultSize;
        }
        get size() {
            return this._size;
        }
        set size(value) {
            const size = value || this.defaultSize;
            if (size !== this._size) {
                if (this._size) {
                    this._elementRef.nativeElement.classList.remove(`novo-size-${this._size}`);
                }
                if (size) {
                    this._elementRef.nativeElement.classList.add(`novo-size-${size}`);
                }
                this._size = size;
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5taXhpbi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jb21tb24vbWl4aW5zL3NpemUubWl4aW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JBLDJEQUEyRDtBQUMzRCxNQUFNLFVBQVUsU0FBUyxDQUF1QyxJQUFPLEVBQUUsV0FBeUI7SUFDaEcsT0FBTyxLQUFNLFNBQVEsSUFBSTtRQXFCdkIsWUFBWSxHQUFHLElBQVc7WUFDeEIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFwQmpCLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1lBcUJ4Qiw2REFBNkQ7WUFDN0QsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7UUFDMUIsQ0FBQztRQXJCRCxJQUFJLElBQUk7WUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLEtBQWtCO1lBQ3pCLE1BQU0sSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQzVFO2dCQUNELElBQUksSUFBSSxFQUFFO29CQUNSLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUNuRTtnQkFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNuQjtRQUNILENBQUM7S0FPRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdG9yIH0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5pbXBvcnQgeyBIYXNFbGVtZW50UmVmIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBQb3NzaWJsZSBzaXplIHBhbGV0dGUgdmFsdWVzLiAqL1xuZXhwb3J0IHR5cGUgRWxlbWVudFNpemUgPSAneHMnIHwgJ3NtJyB8ICdtZCcgfCAnbGcnIHwgJ3hsJyB8ICcyeGwnIHwgJzN4bCcgfCAnYm9keScgfCB1bmRlZmluZWQ7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgaW50ZXJmYWNlIENhblNpemUge1xuICAvKiogVGhlbWUgc2l6ZSBwYWxldHRlIGZvciB0aGUgY29tcG9uZW50LiAqL1xuICBzaXplOiBFbGVtZW50U2l6ZTtcblxuICAvKiogRGVmYXVsdCBzaXplIHRvIGZhbGwgYmFjayB0byBpZiBubyB2YWx1ZSBpcyBzZXQuICovXG4gIGRlZmF1bHRTaXplOiBFbGVtZW50U2l6ZSB8IHVuZGVmaW5lZDtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCB0eXBlIENhblNpemVDdG9yID0gQ29uc3RydWN0b3I8Q2FuU2l6ZT47XG5cbi8qKiBNaXhpbiB0byBhdWdtZW50IGEgZGlyZWN0aXZlIHdpdGggYSBgc2l6ZWAgcHJvcGVydHkuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5TaXplPFQgZXh0ZW5kcyBDb25zdHJ1Y3RvcjxIYXNFbGVtZW50UmVmPj4oYmFzZTogVCwgZGVmYXVsdFNpemU/OiBFbGVtZW50U2l6ZSk6IENhblNpemVDdG9yICYgVCB7XG4gIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgIHByaXZhdGUgX3NpemU6IEVsZW1lbnRTaXplO1xuICAgIGRlZmF1bHRTaXplID0gZGVmYXVsdFNpemU7XG5cbiAgICBnZXQgc2l6ZSgpOiBFbGVtZW50U2l6ZSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG4gICAgc2V0IHNpemUodmFsdWU6IEVsZW1lbnRTaXplKSB7XG4gICAgICBjb25zdCBzaXplID0gdmFsdWUgfHwgdGhpcy5kZWZhdWx0U2l6ZTtcbiAgICAgIGlmIChzaXplICE9PSB0aGlzLl9zaXplKSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplKSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYG5vdm8tc2l6ZS0ke3RoaXMuX3NpemV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbm92by1zaXplLSR7c2l6ZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBzdXBlciguLi5hcmdzKTtcbiAgICAgIC8vIFNldCB0aGUgZGVmYXVsdCBzaXplIHRoYXQgY2FuIGJlIHNwZWNpZmllZCBmcm9tIHRoZSBtaXhpbi5cbiAgICAgIHRoaXMuc2l6ZSA9IGRlZmF1bHRTaXplO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==