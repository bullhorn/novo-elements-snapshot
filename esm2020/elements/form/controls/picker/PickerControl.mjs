// APP
import { BaseControl } from './../BaseControl';
export class PickerControl extends BaseControl {
    constructor(config) {
        super('PickerControl', config);
        this.controlType = 'picker';
        this.options = [];
        this.options = config.options || [];
    }
}
export class TablePickerControl extends PickerControl {
    constructor(config) {
        super(Object.assign(config, { parentScrollSelector: '.table-container' }));
        this.__type = 'TablePickerControl';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vY29udHJvbHMvcGlja2VyL1BpY2tlckNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxXQUFXLEVBQXFCLE1BQU0sa0JBQWtCLENBQUM7QUFFbEUsTUFBTSxPQUFPLGFBQWMsU0FBUSxXQUFXO0lBSTVDLFlBQVksTUFBeUI7UUFDbkMsS0FBSyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUpqQyxnQkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2QixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBSVgsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsYUFBYTtJQUNuRCxZQUFZLE1BQXlCO1FBQ25DLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUM7SUFDckMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQVBQXG5pbXBvcnQgeyBCYXNlQ29udHJvbCwgTm92b0NvbnRyb2xDb25maWcgfSBmcm9tICcuLy4uL0Jhc2VDb250cm9sJztcblxuZXhwb3J0IGNsYXNzIFBpY2tlckNvbnRyb2wgZXh0ZW5kcyBCYXNlQ29udHJvbCB7XG4gIGNvbnRyb2xUeXBlID0gJ3BpY2tlcic7XG4gIG9wdGlvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5vdm9Db250cm9sQ29uZmlnKSB7XG4gICAgc3VwZXIoJ1BpY2tlckNvbnRyb2wnLCBjb25maWcpO1xuICAgIHRoaXMub3B0aW9ucyA9IGNvbmZpZy5vcHRpb25zIHx8IFtdO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZVBpY2tlckNvbnRyb2wgZXh0ZW5kcyBQaWNrZXJDb250cm9sIHtcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZykge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oY29uZmlnLCB7IHBhcmVudFNjcm9sbFNlbGVjdG9yOiAnLnRhYmxlLWNvbnRhaW5lcicgfSkpO1xuICAgIHRoaXMuX190eXBlID0gJ1RhYmxlUGlja2VyQ29udHJvbCc7XG4gIH1cbn1cbiJdfQ==