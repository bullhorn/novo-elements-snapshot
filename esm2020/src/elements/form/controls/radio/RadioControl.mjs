// APP
import { BaseControl } from './../BaseControl';
export class RadioControl extends BaseControl {
    constructor(config) {
        super('RadioControl', config);
        this.controlType = 'radio';
        this.options = [];
        this.options = config.options || [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9Db250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZm9ybS9jb250cm9scy9yYWRpby9SYWRpb0NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxXQUFXLEVBQXFCLE1BQU0sa0JBQWtCLENBQUM7QUFFbEUsTUFBTSxPQUFPLFlBQWEsU0FBUSxXQUFXO0lBSTNDLFlBQVksTUFBeUI7UUFDbkMsS0FBSyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUpoQyxnQkFBVyxHQUFHLE9BQU8sQ0FBQztRQUN0QixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBSVgsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBUFBcbmltcG9ydCB7IEJhc2VDb250cm9sLCBOb3ZvQ29udHJvbENvbmZpZyB9IGZyb20gJy4vLi4vQmFzZUNvbnRyb2wnO1xuXG5leHBvcnQgY2xhc3MgUmFkaW9Db250cm9sIGV4dGVuZHMgQmFzZUNvbnRyb2wge1xuICBjb250cm9sVHlwZSA9ICdyYWRpbyc7XG4gIG9wdGlvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5vdm9Db250cm9sQ29uZmlnKSB7XG4gICAgc3VwZXIoJ1JhZGlvQ29udHJvbCcsIGNvbmZpZyk7XG4gICAgdGhpcy5vcHRpb25zID0gY29uZmlnLm9wdGlvbnMgfHwgW107XG4gIH1cbn1cbiJdfQ==