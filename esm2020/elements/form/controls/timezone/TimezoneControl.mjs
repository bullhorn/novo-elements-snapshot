// APP
import { findTimeZone, getZonedTime, listTimeZones } from 'timezone-support';
import { formatZonedTime } from 'timezone-support/dist/parse-format';
import { BaseControl } from '../BaseControl';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZXpvbmVDb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZm9ybS9jb250cm9scy90aW1lem9uZS9UaW1lem9uZUNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsV0FBVyxFQUFxQixNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE1BQU0sT0FBTyxlQUFnQixTQUFRLFdBQVc7SUFJOUMsWUFBWSxNQUF5QjtRQUNuQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFKbkMsZ0JBQVcsR0FBRyxVQUFVLENBQUM7UUFDekIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQVdMLG1CQUFjLEdBQUcsQ0FBQyxXQUFpQixFQUFFLEVBQUU7WUFDN0MsTUFBTSxTQUFTLEdBQUcsYUFBYSxFQUFFO2lCQUM5QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDWixNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxJQUFJLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRTFGLE1BQU0sTUFBTSxHQUFHO29CQUNiLEtBQUssRUFBRSxJQUFJO29CQUNYLEtBQUssRUFBRSxTQUFTO29CQUNoQixNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNO2lCQUM5QixDQUFDO2dCQUNGLDhCQUE4QjtnQkFDOUIsaURBQWlEO2dCQUNqRCxJQUFJO2dCQUNKLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQztnQkFDRixzREFBc0Q7aUJBQ3JELEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNkLE1BQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFDO2dCQUMvQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM5QztnQkFDRCxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLENBQUM7Z0JBQ0YsaUdBQWlHO2lCQUNoRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2IsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7b0JBQ3JCLE9BQU8sV0FBVyxDQUFDO2lCQUNwQjtnQkFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDckIsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDckIsT0FBTyxDQUFDLENBQUM7aUJBQ1Y7Z0JBQ0QsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztZQUNMLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsQ0FBQztRQWpEQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDNUMsbUJBQW1CO1FBQ25CLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQTZDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFQUFxuaW1wb3J0IHsgZmluZFRpbWVab25lLCBnZXRab25lZFRpbWUsIGxpc3RUaW1lWm9uZXMgfSBmcm9tICd0aW1lem9uZS1zdXBwb3J0JztcbmltcG9ydCB7IGZvcm1hdFpvbmVkVGltZSB9IGZyb20gJ3RpbWV6b25lLXN1cHBvcnQvZGlzdC9wYXJzZS1mb3JtYXQnO1xuaW1wb3J0IHsgQmFzZUNvbnRyb2wsIE5vdm9Db250cm9sQ29uZmlnIH0gZnJvbSAnLi4vQmFzZUNvbnRyb2wnO1xuXG5leHBvcnQgY2xhc3MgVGltZXpvbmVDb250cm9sIGV4dGVuZHMgQmFzZUNvbnRyb2wge1xuICBjb250cm9sVHlwZSA9ICd0aW1lem9uZSc7XG4gIG9wdGlvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5vdm9Db250cm9sQ29uZmlnKSB7XG4gICAgc3VwZXIoJ1RpbWV6b25lQ29udHJvbCcsIGNvbmZpZyk7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5idWlsZFRpbWV6b25lcyhuZXcgRGF0ZSgpKTtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gY29uZmlnLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIC8vIGN1cnJlbnQgdGltZXpvbmVcbiAgICBjb25zdCB0eiA9IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZTtcbiAgICB0aGlzLnZhbHVlID0gdHo7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkVGltZXpvbmVzID0gKGNvbXBhcmVEYXRlOiBEYXRlKSA9PiB7XG4gICAgY29uc3QgdGltZXpvbmVzID0gbGlzdFRpbWVab25lcygpXG4gICAgICAubWFwKCh6b25lKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWV6b25lID0gZmluZFRpbWVab25lKHpvbmUpO1xuICAgICAgICBjb25zdCB6b25lZFRpbWUgPSBnZXRab25lZFRpbWUoY29tcGFyZURhdGUsIHRpbWV6b25lKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkID0gZm9ybWF0Wm9uZWRUaW1lKHpvbmVkVGltZSwgYHogLSBbJHt6b25lfV0gKFtHTVRdIFopYCkucmVwbGFjZSgnXycsICcgJyk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uID0ge1xuICAgICAgICAgIHZhbHVlOiB6b25lLFxuICAgICAgICAgIGxhYmVsOiBmb3JtYXR0ZWQsXG4gICAgICAgICAgb2Zmc2V0OiB6b25lZFRpbWUuem9uZS5vZmZzZXQsXG4gICAgICAgIH07XG4gICAgICAgIC8vIGlmICh0aGlzLnByb3BzLm1hcExhYmVscykge1xuICAgICAgICAvLyAgIG9wdGlvbi5sYWJlbCA9IHRoaXMucHJvcHMubWFwTGFiZWxzKG9wdGlvbik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgIH0pXG4gICAgICAvLyBGb3JtYXRzICdub2lzeScgdGltZXpvbmVzIHdpdGhvdXQgYSBsZXR0ZXIgYWNyb255bS5cbiAgICAgIC5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICBjb25zdCByZ3ggPSAvKF4oXFwrfC0pXFxkK1xccy0gKS87XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBvcHRpb24ubGFiZWwubWF0Y2gocmd4KTtcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICBjb25zdCBwcmVmaXggPSBtYXRjaGVzWzBdO1xuICAgICAgICAgIG9wdGlvbi5sYWJlbCA9IG9wdGlvbi5sYWJlbC5zcGxpdChwcmVmaXgpWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICB9KVxuICAgICAgLy8gU29ydHMgVyAtPiBFLCBwcmlvcml0aXplcyBhbWVyaWNhLiBjb3VsZCBiZSBtb3JlIG51YW5jZWQgYmFzZWQgb24gc3lzdGVtIHR6IGJ1dCBzaW1wbGUgZm9yIG5vd1xuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0RGVsdGEgPSBiLm9mZnNldCAtIGEub2Zmc2V0O1xuICAgICAgICBpZiAob2Zmc2V0RGVsdGEgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gb2Zmc2V0RGVsdGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGEubGFiZWwgPCBiLmxhYmVsKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhLmxhYmVsID4gYi5sYWJlbCkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIHRpbWV6b25lcztcbiAgfTtcbn1cbiJdfQ==