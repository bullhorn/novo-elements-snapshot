// APP
import { BaseControl } from './../BaseControl';
export class NativeSelectControl extends BaseControl {
    constructor(config) {
        super('NativeSelectControl', config);
        this.controlType = 'native-select';
        this.options = [];
        this.options = config.options || [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF0aXZlU2VsZWN0Q29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vY29udHJvbHMvbmF0aXZlLXNlbGVjdC9OYXRpdmVTZWxlY3RDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsV0FBVyxFQUFxQixNQUFNLGtCQUFrQixDQUFDO0FBRWxFLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxXQUFXO0lBSWxELFlBQVksTUFBeUI7UUFDbkMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBSnZDLGdCQUFXLEdBQUcsZUFBZSxDQUFDO1FBQzlCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFJWCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFQUFxuaW1wb3J0IHsgQmFzZUNvbnRyb2wsIE5vdm9Db250cm9sQ29uZmlnIH0gZnJvbSAnLi8uLi9CYXNlQ29udHJvbCc7XG5cbmV4cG9ydCBjbGFzcyBOYXRpdmVTZWxlY3RDb250cm9sIGV4dGVuZHMgQmFzZUNvbnRyb2wge1xuICBjb250cm9sVHlwZSA9ICduYXRpdmUtc2VsZWN0JztcbiAgb3B0aW9ucyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTm92b0NvbnRyb2xDb25maWcpIHtcbiAgICBzdXBlcignTmF0aXZlU2VsZWN0Q29udHJvbCcsIGNvbmZpZyk7XG4gICAgdGhpcy5vcHRpb25zID0gY29uZmlnLm9wdGlvbnMgfHwgW107XG4gIH1cbn1cbiJdfQ==