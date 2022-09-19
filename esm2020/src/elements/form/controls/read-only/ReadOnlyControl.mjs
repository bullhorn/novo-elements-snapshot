// APP
import { BaseControl } from './../BaseControl';
export class ReadOnlyControl extends BaseControl {
    constructor(config) {
        super('ReadOnlyControl', config);
        this.controlType = 'read-only';
        config.readOnly = true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZE9ubHlDb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZm9ybS9jb250cm9scy9yZWFkLW9ubHkvUmVhZE9ubHlDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsV0FBVyxFQUFxQixNQUFNLGtCQUFrQixDQUFDO0FBRWxFLE1BQU0sT0FBTyxlQUFnQixTQUFRLFdBQVc7SUFHOUMsWUFBWSxNQUF5QjtRQUNuQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFIbkMsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFJeEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQVBQXG5pbXBvcnQgeyBCYXNlQ29udHJvbCwgTm92b0NvbnRyb2xDb25maWcgfSBmcm9tICcuLy4uL0Jhc2VDb250cm9sJztcblxuZXhwb3J0IGNsYXNzIFJlYWRPbmx5Q29udHJvbCBleHRlbmRzIEJhc2VDb250cm9sIHtcbiAgY29udHJvbFR5cGUgPSAncmVhZC1vbmx5JztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5vdm9Db250cm9sQ29uZmlnKSB7XG4gICAgc3VwZXIoJ1JlYWRPbmx5Q29udHJvbCcsIGNvbmZpZyk7XG4gICAgY29uZmlnLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgfVxufVxuIl19