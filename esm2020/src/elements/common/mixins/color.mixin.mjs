/** Mixin to augment a directive with a `color` property. */
export function mixinColor(base, defaultColor) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.defaultColor = defaultColor;
            // Set the default color that can be specified from the mixin.
            this.color = defaultColor;
        }
        get color() {
            return this._color;
        }
        set color(value) {
            const colorPalette = value || this.defaultColor;
            if (colorPalette !== this._color) {
                if (this._color) {
                    this._elementRef.nativeElement.classList.remove(`novo-color-${this._color}`);
                }
                if (colorPalette) {
                    this._elementRef.nativeElement.classList.add(`novo-color-${colorPalette}`);
                }
                this._color = colorPalette;
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IubWl4aW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jb21tb24vbWl4aW5zL2NvbG9yLm1peGluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQSw0REFBNEQ7QUFDNUQsTUFBTSxVQUFVLFVBQVUsQ0FBdUMsSUFBTyxFQUFFLFlBQTJCO0lBQ25HLE9BQU8sS0FBTSxTQUFRLElBQUk7UUFzQnZCLFlBQVksR0FBRyxJQUFXO1lBQ3hCLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBckJqQixpQkFBWSxHQUFHLFlBQVksQ0FBQztZQXVCMUIsOERBQThEO1lBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQzVCLENBQUM7UUF2QkQsSUFBSSxLQUFLO1lBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7UUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFtQjtZQUMzQixNQUFNLFlBQVksR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztZQUVoRCxJQUFJLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUM5RTtnQkFDRCxJQUFJLFlBQVksRUFBRTtvQkFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLFlBQVksRUFBRSxDQUFDLENBQUM7aUJBQzVFO2dCQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQztLQVFGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0b3IgfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcbmltcG9ydCB7IEhhc0VsZW1lbnRSZWYgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2FuQ29sb3Ige1xuICAvKiogVGhlbWUgY29sb3IgcGFsZXR0ZSBmb3IgdGhlIGNvbXBvbmVudC4gKi9cbiAgY29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICAvKiogRGVmYXVsdCBjb2xvciB0byBmYWxsIGJhY2sgdG8gaWYgbm8gdmFsdWUgaXMgc2V0LiAqL1xuICBkZWZhdWx0Q29sb3I6IFRoZW1lUGFsZXR0ZSB8IHVuZGVmaW5lZDtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCB0eXBlIENhbkNvbG9yQ3RvciA9IENvbnN0cnVjdG9yPENhbkNvbG9yPjtcblxuLyoqIFBvc3NpYmxlIGNvbG9yIHBhbGV0dGUgdmFsdWVzLiAqL1xuZXhwb3J0IHR5cGUgVGhlbWVQYWxldHRlID0gJ3ByaW1hcnknIHwgJ2FjY2VudCcgfCAnd2FybicgfCB1bmRlZmluZWQ7XG5cbi8qKiBNaXhpbiB0byBhdWdtZW50IGEgZGlyZWN0aXZlIHdpdGggYSBgY29sb3JgIHByb3BlcnR5LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluQ29sb3I8VCBleHRlbmRzIENvbnN0cnVjdG9yPEhhc0VsZW1lbnRSZWY+PihiYXNlOiBULCBkZWZhdWx0Q29sb3I/OiBUaGVtZVBhbGV0dGUpOiBDYW5Db2xvckN0b3IgJiBUIHtcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG4gICAgcHJpdmF0ZSBfY29sb3I6IFRoZW1lUGFsZXR0ZTtcbiAgICBkZWZhdWx0Q29sb3IgPSBkZWZhdWx0Q29sb3I7XG5cbiAgICBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICB9XG4gICAgc2V0IGNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpIHtcbiAgICAgIGNvbnN0IGNvbG9yUGFsZXR0ZSA9IHZhbHVlIHx8IHRoaXMuZGVmYXVsdENvbG9yO1xuXG4gICAgICBpZiAoY29sb3JQYWxldHRlICE9PSB0aGlzLl9jb2xvcikge1xuICAgICAgICBpZiAodGhpcy5fY29sb3IpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShgbm92by1jb2xvci0ke3RoaXMuX2NvbG9yfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2xvclBhbGV0dGUpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbm92by1jb2xvci0ke2NvbG9yUGFsZXR0ZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3JQYWxldHRlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0IGNvbG9yIHRoYXQgY2FuIGJlIHNwZWNpZmllZCBmcm9tIHRoZSBtaXhpbi5cbiAgICAgIHRoaXMuY29sb3IgPSBkZWZhdWx0Q29sb3I7XG4gICAgfVxuICB9O1xufVxuIl19