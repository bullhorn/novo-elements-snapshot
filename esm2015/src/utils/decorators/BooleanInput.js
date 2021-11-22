import { coerceBooleanProperty } from '@angular/cdk/coercion';
export function BooleanInput() {
    return (target, propertyKey) => {
        const key = Symbol();
        return {
            get() {
                return this[key] || false;
            },
            set(value) {
                this[key] = coerceBooleanProperty(value);
            },
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbGVhbklucHV0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL3V0aWxzL2RlY29yYXRvcnMvQm9vbGVhbklucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE1BQU0sVUFBVSxZQUFZO0lBQzFCLE9BQU8sQ0FBQyxNQUFXLEVBQUUsV0FBNEIsRUFBRSxFQUFFO1FBQ25ELE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLE9BQU87WUFDTCxHQUFHO2dCQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQztZQUM1QixDQUFDO1lBQ0QsR0FBRyxDQUFDLEtBQXVCO2dCQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIEJvb2xlYW5JbnB1dCgpOiBhbnkge1xuICByZXR1cm4gKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nIHwgc3ltYm9sKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gU3ltYm9sKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XSB8fCBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBzZXQodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpc1trZXldID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==