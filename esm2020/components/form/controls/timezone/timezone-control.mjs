import { findTimeZone, getZonedTime, listTimeZones } from 'timezone-support';
import { formatZonedTime } from 'timezone-support/dist/parse-format';
import { BaseControl } from '../base-control';
export class TimezoneControl extends BaseControl {
    constructor(config) {
        super('TimezoneControl', config);
        this.controlType = 'timezone';
        this.options = [];
        this.buildTimezones = (compareDate) => {
            const timezones = listTimeZones()
                .map((zone) => {
                const timezone = findTimeZone(zone);
                const zonedTime = getZonedTime(compareDate, timezone);
                const formatted = formatZonedTime(zonedTime, `z - [${zone}] ([GMT] Z)`).replace('_', ' ');
                const option = {
                    value: zone,
                    label: formatted,
                    offset: zonedTime.zone.offset,
                };
                // if (this.props.mapLabels) {
                //   option.label = this.props.mapLabels(option);
                // }
                return option;
            })
                // Formats 'noisy' timezones without a letter acronym.
                .map((option) => {
                const rgx = /(^(\+|-)\d+\s- )/;
                const matches = option.label.match(rgx);
                if (matches) {
                    const prefix = matches[0];
                    option.label = option.label.split(prefix)[1];
                }
                return option;
            })
                // Sorts W -> E, prioritizes america. could be more nuanced based on system tz but simple for now
                .sort((a, b) => {
                const offsetDelta = b.offset - a.offset;
                if (offsetDelta !== 0) {
                    return offsetDelta;
                }
                if (a.label < b.label) {
                    return -1;
                }
                if (a.label > b.label) {
                    return 1;
                }
                return 0;
            });
            return timezones;
        };
        this.options = this.buildTimezones(new Date());
        this.placeholder = config.placeholder || '';
        // current timezone
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.value = tz;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXpvbmUtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZm9ybS9jb250cm9scy90aW1lem9uZS90aW1lem9uZS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFOUMsTUFBTSxPQUFPLGVBQWdCLFNBQVEsV0FBVztJQUk5QyxZQUFZLE1BQXlCO1FBQ25DLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUpuQyxnQkFBVyxHQUFHLFVBQVUsQ0FBQztRQUN6QixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBV0wsbUJBQWMsR0FBRyxDQUFDLFdBQWlCLEVBQUUsRUFBRTtZQUM3QyxNQUFNLFNBQVMsR0FBRyxhQUFhLEVBQUU7aUJBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNaLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDdEQsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxRQUFRLElBQUksYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFMUYsTUFBTSxNQUFNLEdBQUc7b0JBQ2IsS0FBSyxFQUFFLElBQUk7b0JBQ1gsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU07aUJBQzlCLENBQUM7Z0JBQ0YsOEJBQThCO2dCQUM5QixpREFBaUQ7Z0JBQ2pELElBQUk7Z0JBQ0osT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFDO2dCQUNGLHNEQUFzRDtpQkFDckQsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2QsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLENBQUM7Z0JBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLE9BQU8sRUFBRTtvQkFDWCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlDO2dCQUNELE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQztnQkFDRixpR0FBaUc7aUJBQ2hHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDYixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLElBQUksV0FBVyxLQUFLLENBQUMsRUFBRTtvQkFDckIsT0FBTyxXQUFXLENBQUM7aUJBQ3BCO2dCQUNELElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO29CQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNYO2dCQUNELElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO29CQUNyQixPQUFPLENBQUMsQ0FBQztpQkFDVjtnQkFDRCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ0wsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxDQUFDO1FBakRBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUM1QyxtQkFBbUI7UUFDbkIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBNkNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQ29udHJvbENvbmZpZyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdHlwZXMnO1xuaW1wb3J0IHsgZmluZFRpbWVab25lLCBnZXRab25lZFRpbWUsIGxpc3RUaW1lWm9uZXMgfSBmcm9tICd0aW1lem9uZS1zdXBwb3J0JztcbmltcG9ydCB7IGZvcm1hdFpvbmVkVGltZSB9IGZyb20gJ3RpbWV6b25lLXN1cHBvcnQvZGlzdC9wYXJzZS1mb3JtYXQnO1xuaW1wb3J0IHsgQmFzZUNvbnRyb2wgfSBmcm9tICcuLi9iYXNlLWNvbnRyb2wnO1xuXG5leHBvcnQgY2xhc3MgVGltZXpvbmVDb250cm9sIGV4dGVuZHMgQmFzZUNvbnRyb2wge1xuICBjb250cm9sVHlwZSA9ICd0aW1lem9uZSc7XG4gIG9wdGlvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5vdm9Db250cm9sQ29uZmlnKSB7XG4gICAgc3VwZXIoJ1RpbWV6b25lQ29udHJvbCcsIGNvbmZpZyk7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5idWlsZFRpbWV6b25lcyhuZXcgRGF0ZSgpKTtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gY29uZmlnLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIC8vIGN1cnJlbnQgdGltZXpvbmVcbiAgICBjb25zdCB0eiA9IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZTtcbiAgICB0aGlzLnZhbHVlID0gdHo7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkVGltZXpvbmVzID0gKGNvbXBhcmVEYXRlOiBEYXRlKSA9PiB7XG4gICAgY29uc3QgdGltZXpvbmVzID0gbGlzdFRpbWVab25lcygpXG4gICAgICAubWFwKCh6b25lKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWV6b25lID0gZmluZFRpbWVab25lKHpvbmUpO1xuICAgICAgICBjb25zdCB6b25lZFRpbWUgPSBnZXRab25lZFRpbWUoY29tcGFyZURhdGUsIHRpbWV6b25lKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkID0gZm9ybWF0Wm9uZWRUaW1lKHpvbmVkVGltZSwgYHogLSBbJHt6b25lfV0gKFtHTVRdIFopYCkucmVwbGFjZSgnXycsICcgJyk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uID0ge1xuICAgICAgICAgIHZhbHVlOiB6b25lLFxuICAgICAgICAgIGxhYmVsOiBmb3JtYXR0ZWQsXG4gICAgICAgICAgb2Zmc2V0OiB6b25lZFRpbWUuem9uZS5vZmZzZXQsXG4gICAgICAgIH07XG4gICAgICAgIC8vIGlmICh0aGlzLnByb3BzLm1hcExhYmVscykge1xuICAgICAgICAvLyAgIG9wdGlvbi5sYWJlbCA9IHRoaXMucHJvcHMubWFwTGFiZWxzKG9wdGlvbik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgIH0pXG4gICAgICAvLyBGb3JtYXRzICdub2lzeScgdGltZXpvbmVzIHdpdGhvdXQgYSBsZXR0ZXIgYWNyb255bS5cbiAgICAgIC5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICBjb25zdCByZ3ggPSAvKF4oXFwrfC0pXFxkK1xccy0gKS87XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBvcHRpb24ubGFiZWwubWF0Y2gocmd4KTtcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICBjb25zdCBwcmVmaXggPSBtYXRjaGVzWzBdO1xuICAgICAgICAgIG9wdGlvbi5sYWJlbCA9IG9wdGlvbi5sYWJlbC5zcGxpdChwcmVmaXgpWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICB9KVxuICAgICAgLy8gU29ydHMgVyAtPiBFLCBwcmlvcml0aXplcyBhbWVyaWNhLiBjb3VsZCBiZSBtb3JlIG51YW5jZWQgYmFzZWQgb24gc3lzdGVtIHR6IGJ1dCBzaW1wbGUgZm9yIG5vd1xuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0RGVsdGEgPSBiLm9mZnNldCAtIGEub2Zmc2V0O1xuICAgICAgICBpZiAob2Zmc2V0RGVsdGEgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gb2Zmc2V0RGVsdGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGEubGFiZWwgPCBiLmxhYmVsKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhLmxhYmVsID4gYi5sYWJlbCkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIHRpbWV6b25lcztcbiAgfTtcbn1cbiJdfQ==