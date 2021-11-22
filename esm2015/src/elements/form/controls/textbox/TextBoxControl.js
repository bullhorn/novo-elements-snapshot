// APP
import { FormValidators } from './../../FormValidators';
import { BaseControl } from './../BaseControl';
export class TextBoxControl extends BaseControl {
    constructor(config) {
        super('TextBoxControl', config);
        this.controlType = 'textbox';
        this.type = this.getTextboxType(config.type) || '';
        this.subType = config.type || '';
        this.setValidators(this.subType);
    }
    setValidators(type) {
        switch (type) {
            case 'email':
                this.validators.push(FormValidators.isEmail);
                break;
            case 'number':
            case 'currency':
                this.validators.push(FormValidators.maxInteger);
                break;
            case 'float':
            case 'percentage':
                this.validators.push(FormValidators.maxDouble);
                break;
            case 'year':
                this.validators.push(FormValidators.minYear);
                break;
            default:
                break;
        }
    }
    getTextboxType(type) {
        switch (type) {
            case 'percentage':
            case 'currency':
            case 'float':
            case 'year':
                return 'number';
            default:
                return type;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEJveENvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZm9ybS9jb250cm9scy90ZXh0Ym94L1RleHRCb3hDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBcUIsTUFBTSxrQkFBa0IsQ0FBQztBQUVsRSxNQUFNLE9BQU8sY0FBZSxTQUFRLFdBQVc7SUFLN0MsWUFBWSxNQUF5QjtRQUNuQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFMbEMsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFNOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQUk7UUFDaEIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3QyxNQUFNO1lBQ1IsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNO1lBQ1IsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFlBQVk7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0MsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsSUFBSTtRQUNqQixRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssWUFBWSxDQUFDO1lBQ2xCLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxNQUFNO2dCQUNULE9BQU8sUUFBUSxDQUFDO1lBQ2xCO2dCQUNFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBUFBcbmltcG9ydCB7IEZvcm1WYWxpZGF0b3JzIH0gZnJvbSAnLi8uLi8uLi9Gb3JtVmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBCYXNlQ29udHJvbCwgTm92b0NvbnRyb2xDb25maWcgfSBmcm9tICcuLy4uL0Jhc2VDb250cm9sJztcblxuZXhwb3J0IGNsYXNzIFRleHRCb3hDb250cm9sIGV4dGVuZHMgQmFzZUNvbnRyb2wge1xuICBjb250cm9sVHlwZTogc3RyaW5nID0gJ3RleHRib3gnO1xuICB0eXBlOiBzdHJpbmc7XG4gIHN1YlR5cGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5vdm9Db250cm9sQ29uZmlnKSB7XG4gICAgc3VwZXIoJ1RleHRCb3hDb250cm9sJywgY29uZmlnKTtcbiAgICB0aGlzLnR5cGUgPSB0aGlzLmdldFRleHRib3hUeXBlKGNvbmZpZy50eXBlKSB8fCAnJztcbiAgICB0aGlzLnN1YlR5cGUgPSBjb25maWcudHlwZSB8fCAnJztcbiAgICB0aGlzLnNldFZhbGlkYXRvcnModGhpcy5zdWJUeXBlKTtcbiAgfVxuXG4gIHNldFZhbGlkYXRvcnModHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICB0aGlzLnZhbGlkYXRvcnMucHVzaChGb3JtVmFsaWRhdG9ycy5pc0VtYWlsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgICB0aGlzLnZhbGlkYXRvcnMucHVzaChGb3JtVmFsaWRhdG9ycy5tYXhJbnRlZ2VyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdwZXJjZW50YWdlJzpcbiAgICAgICAgdGhpcy52YWxpZGF0b3JzLnB1c2goRm9ybVZhbGlkYXRvcnMubWF4RG91YmxlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgdGhpcy52YWxpZGF0b3JzLnB1c2goRm9ybVZhbGlkYXRvcnMubWluWWVhcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGV4dGJveFR5cGUodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAncGVyY2VudGFnZSc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG59XG4iXX0=