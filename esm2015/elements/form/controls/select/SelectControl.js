// APP
import { BaseControl } from './../BaseControl';
export class SelectControl extends BaseControl {
    constructor(config) {
        super('SelectControl', config);
        this.controlType = 'select';
        this.options = [];
        this.options = config.options || [];
        this.placeholder = config.placeholder || '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0Q29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS90cmF2aXMvYnVpbGQvYnVsbGhvcm4vbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Zvcm0vY29udHJvbHMvc2VsZWN0L1NlbGVjdENvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxXQUFXLEVBQXFCLE1BQU0sa0JBQWtCLENBQUM7QUFFbEUsTUFBTSxPQUFPLGFBQWMsU0FBUSxXQUFXO0lBSTVDLFlBQVksTUFBeUI7UUFDbkMsS0FBSyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUpqQyxnQkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2QixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBSVgsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFQUFxuaW1wb3J0IHsgQmFzZUNvbnRyb2wsIE5vdm9Db250cm9sQ29uZmlnIH0gZnJvbSAnLi8uLi9CYXNlQ29udHJvbCc7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3RDb250cm9sIGV4dGVuZHMgQmFzZUNvbnRyb2wge1xuICBjb250cm9sVHlwZSA9ICdzZWxlY3QnO1xuICBvcHRpb25zID0gW107XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZykge1xuICAgIHN1cGVyKCdTZWxlY3RDb250cm9sJywgY29uZmlnKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBjb25maWcub3B0aW9ucyB8fCBbXTtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gY29uZmlnLnBsYWNlaG9sZGVyIHx8ICcnO1xuICB9XG59XG4iXX0=