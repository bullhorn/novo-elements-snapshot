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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5taXhpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NvbW1vbi9taXhpbnMvc2l6ZS5taXhpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQkEsMkRBQTJEO0FBQzNELE1BQU0sVUFBVSxTQUFTLENBQXVDLElBQU8sRUFBRSxXQUF5QjtJQUNoRyxPQUFPLEtBQU0sU0FBUSxJQUFJO1FBcUJ2QixZQUFZLEdBQUcsSUFBVztZQUN4QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQXBCakIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7WUFxQnhCLDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUMxQixDQUFDO1FBckJELElBQUksSUFBSTtZQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBa0I7WUFDekIsTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDdkMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDdkIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDNUU7Z0JBQ0QsSUFBSSxJQUFJLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ25FO2dCQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ25CO1FBQ0gsQ0FBQztLQU9GLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0b3IgfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcbmltcG9ydCB7IEhhc0VsZW1lbnRSZWYgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIFBvc3NpYmxlIHNpemUgcGFsZXR0ZSB2YWx1ZXMuICovXG5leHBvcnQgdHlwZSBFbGVtZW50U2l6ZSA9ICd4cycgfCAnc20nIHwgJ21kJyB8ICdsZycgfCAneGwnIHwgJzJ4bCcgfCAnM3hsJyB8ICdib2R5JyB8IHVuZGVmaW5lZDtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2FuU2l6ZSB7XG4gIC8qKiBUaGVtZSBzaXplIHBhbGV0dGUgZm9yIHRoZSBjb21wb25lbnQuICovXG4gIHNpemU6IEVsZW1lbnRTaXplO1xuXG4gIC8qKiBEZWZhdWx0IHNpemUgdG8gZmFsbCBiYWNrIHRvIGlmIG5vIHZhbHVlIGlzIHNldC4gKi9cbiAgZGVmYXVsdFNpemU6IEVsZW1lbnRTaXplIHwgdW5kZWZpbmVkO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IHR5cGUgQ2FuU2l6ZUN0b3IgPSBDb25zdHJ1Y3RvcjxDYW5TaXplPjtcblxuLyoqIE1peGluIHRvIGF1Z21lbnQgYSBkaXJlY3RpdmUgd2l0aCBhIGBzaXplYCBwcm9wZXJ0eS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpblNpemU8VCBleHRlbmRzIENvbnN0cnVjdG9yPEhhc0VsZW1lbnRSZWY+PihiYXNlOiBULCBkZWZhdWx0U2l6ZT86IEVsZW1lbnRTaXplKTogQ2FuU2l6ZUN0b3IgJiBUIHtcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG4gICAgcHJpdmF0ZSBfc2l6ZTogRWxlbWVudFNpemU7XG4gICAgZGVmYXVsdFNpemUgPSBkZWZhdWx0U2l6ZTtcblxuICAgIGdldCBzaXplKCk6IEVsZW1lbnRTaXplIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cbiAgICBzZXQgc2l6ZSh2YWx1ZTogRWxlbWVudFNpemUpIHtcbiAgICAgIGNvbnN0IHNpemUgPSB2YWx1ZSB8fCB0aGlzLmRlZmF1bHRTaXplO1xuICAgICAgaWYgKHNpemUgIT09IHRoaXMuX3NpemUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpemUpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShgbm92by1zaXplLSR7dGhpcy5fc2l6ZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2l6ZSkge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBub3ZvLXNpemUtJHtzaXplfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNpemUgdGhhdCBjYW4gYmUgc3BlY2lmaWVkIGZyb20gdGhlIG1peGluLlxuICAgICAgdGhpcy5zaXplID0gZGVmYXVsdFNpemU7XG4gICAgfVxuICB9O1xufVxuIl19