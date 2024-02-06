/** Mixin to augment a directive with a `color` property. */
export function mixinColor(base, defaultColor) {
    return class extends base {
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
        constructor(...args) {
            super(...args);
            this.defaultColor = defaultColor;
            // Set the default color that can be specified from the mixin.
            this.color = defaultColor;
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IubWl4aW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jb21tb24vbWl4aW5zL2NvbG9yLm1peGluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQSw0REFBNEQ7QUFDNUQsTUFBTSxVQUFVLFVBQVUsQ0FBdUMsSUFBTyxFQUFFLFlBQTJCO0lBQ25HLE9BQU8sS0FBTSxTQUFRLElBQUk7UUFJdkIsSUFBSSxLQUFLO1lBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7UUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFtQjtZQUMzQixNQUFNLFlBQVksR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztZQUVoRCxJQUFJLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUM5RTtnQkFDRCxJQUFJLFlBQVksRUFBRTtvQkFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLFlBQVksRUFBRSxDQUFDLENBQUM7aUJBQzVFO2dCQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQztRQUVELFlBQVksR0FBRyxJQUFXO1lBQ3hCLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBckJqQixpQkFBWSxHQUFHLFlBQVksQ0FBQztZQXVCMUIsOERBQThEO1lBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQzVCLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdG9yIH0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5pbXBvcnQgeyBIYXNFbGVtZW50UmVmIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgaW50ZXJmYWNlIENhbkNvbG9yIHtcbiAgLyoqIFRoZW1lIGNvbG9yIHBhbGV0dGUgZm9yIHRoZSBjb21wb25lbnQuICovXG4gIGNvbG9yOiBUaGVtZVBhbGV0dGU7XG5cbiAgLyoqIERlZmF1bHQgY29sb3IgdG8gZmFsbCBiYWNrIHRvIGlmIG5vIHZhbHVlIGlzIHNldC4gKi9cbiAgZGVmYXVsdENvbG9yOiBUaGVtZVBhbGV0dGUgfCB1bmRlZmluZWQ7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgdHlwZSBDYW5Db2xvckN0b3IgPSBDb25zdHJ1Y3RvcjxDYW5Db2xvcj47XG5cbi8qKiBQb3NzaWJsZSBjb2xvciBwYWxldHRlIHZhbHVlcy4gKi9cbmV4cG9ydCB0eXBlIFRoZW1lUGFsZXR0ZSA9ICdwcmltYXJ5JyB8ICdhY2NlbnQnIHwgJ3dhcm4nIHwgdW5kZWZpbmVkO1xuXG4vKiogTWl4aW4gdG8gYXVnbWVudCBhIGRpcmVjdGl2ZSB3aXRoIGEgYGNvbG9yYCBwcm9wZXJ0eS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbkNvbG9yPFQgZXh0ZW5kcyBDb25zdHJ1Y3RvcjxIYXNFbGVtZW50UmVmPj4oYmFzZTogVCwgZGVmYXVsdENvbG9yPzogVGhlbWVQYWxldHRlKTogQ2FuQ29sb3JDdG9yICYgVCB7XG4gIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgIHByaXZhdGUgX2NvbG9yOiBUaGVtZVBhbGV0dGU7XG4gICAgZGVmYXVsdENvbG9yID0gZGVmYXVsdENvbG9yO1xuXG4gICAgZ2V0IGNvbG9yKCk6IFRoZW1lUGFsZXR0ZSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgfVxuICAgIHNldCBjb2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgICBjb25zdCBjb2xvclBhbGV0dGUgPSB2YWx1ZSB8fCB0aGlzLmRlZmF1bHRDb2xvcjtcblxuICAgICAgaWYgKGNvbG9yUGFsZXR0ZSAhPT0gdGhpcy5fY29sb3IpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbG9yKSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYG5vdm8tY29sb3ItJHt0aGlzLl9jb2xvcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sb3JQYWxldHRlKSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG5vdm8tY29sb3ItJHtjb2xvclBhbGV0dGV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yUGFsZXR0ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgIC8vIFNldCB0aGUgZGVmYXVsdCBjb2xvciB0aGF0IGNhbiBiZSBzcGVjaWZpZWQgZnJvbSB0aGUgbWl4aW4uXG4gICAgICB0aGlzLmNvbG9yID0gZGVmYXVsdENvbG9yO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==