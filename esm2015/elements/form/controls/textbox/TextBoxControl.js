// APP
import { BaseControl } from './../BaseControl';
import { FormValidators } from './../../FormValidators';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEJveENvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Zvcm0vY29udHJvbHMvdGV4dGJveC9UZXh0Qm94Q29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFdBQVcsRUFBcUIsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFeEQsTUFBTSxPQUFPLGNBQWUsU0FBUSxXQUFXO0lBSzdDLFlBQVksTUFBeUI7UUFDbkMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBTGxDLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBTTlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFJO1FBQ2hCLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0MsTUFBTTtZQUNSLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxVQUFVO2dCQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDaEQsTUFBTTtZQUNSLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxZQUFZO2dCQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0MsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdDLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQUk7UUFDakIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFlBQVksQ0FBQztZQUNsQixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssTUFBTTtnQkFDVCxPQUFPLFFBQVEsQ0FBQztZQUNsQjtnQkFDRSxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQVBQXHJcbmltcG9ydCB7IEJhc2VDb250cm9sLCBOb3ZvQ29udHJvbENvbmZpZyB9IGZyb20gJy4vLi4vQmFzZUNvbnRyb2wnO1xyXG5pbXBvcnQgeyBGb3JtVmFsaWRhdG9ycyB9IGZyb20gJy4vLi4vLi4vRm9ybVZhbGlkYXRvcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRCb3hDb250cm9sIGV4dGVuZHMgQmFzZUNvbnRyb2wge1xyXG4gIGNvbnRyb2xUeXBlOiBzdHJpbmcgPSAndGV4dGJveCc7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIHN1YlR5cGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZykge1xyXG4gICAgc3VwZXIoJ1RleHRCb3hDb250cm9sJywgY29uZmlnKTtcclxuICAgIHRoaXMudHlwZSA9IHRoaXMuZ2V0VGV4dGJveFR5cGUoY29uZmlnLnR5cGUpIHx8ICcnO1xyXG4gICAgdGhpcy5zdWJUeXBlID0gY29uZmlnLnR5cGUgfHwgJyc7XHJcbiAgICB0aGlzLnNldFZhbGlkYXRvcnModGhpcy5zdWJUeXBlKTtcclxuICB9XHJcblxyXG4gIHNldFZhbGlkYXRvcnModHlwZSkge1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2VtYWlsJzpcclxuICAgICAgICB0aGlzLnZhbGlkYXRvcnMucHVzaChGb3JtVmFsaWRhdG9ycy5pc0VtYWlsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgY2FzZSAnY3VycmVuY3knOlxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9ycy5wdXNoKEZvcm1WYWxpZGF0b3JzLm1heEludGVnZXIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdmbG9hdCc6XHJcbiAgICAgIGNhc2UgJ3BlcmNlbnRhZ2UnOlxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9ycy5wdXNoKEZvcm1WYWxpZGF0b3JzLm1heERvdWJsZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9ycy5wdXNoKEZvcm1WYWxpZGF0b3JzLm1pblllYXIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0VGV4dGJveFR5cGUodHlwZSkge1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3BlcmNlbnRhZ2UnOlxyXG4gICAgICBjYXNlICdjdXJyZW5jeSc6XHJcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcclxuICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=