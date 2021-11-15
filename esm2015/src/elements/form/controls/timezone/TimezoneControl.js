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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZXpvbmVDb250cm9sLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2Zvcm0vY29udHJvbHMvdGltZXpvbmUvVGltZXpvbmVDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBcUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxXQUFXO0lBSTlDLFlBQVksTUFBeUI7UUFDbkMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBSm5DLGdCQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFXTCxtQkFBYyxHQUFHLENBQUMsV0FBaUIsRUFBRSxFQUFFO1lBQzdDLE1BQU0sU0FBUyxHQUFHLGFBQWEsRUFBRTtpQkFDOUIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1osTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFLFFBQVEsSUFBSSxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUUxRixNQUFNLE1BQU0sR0FBRztvQkFDYixLQUFLLEVBQUUsSUFBSTtvQkFDWCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTTtpQkFDOUIsQ0FBQztnQkFDRiw4QkFBOEI7Z0JBQzlCLGlEQUFpRDtnQkFDakQsSUFBSTtnQkFDSixPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLENBQUM7Z0JBQ0Ysc0RBQXNEO2lCQUNyRCxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDZCxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQztnQkFDL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksT0FBTyxFQUFFO29CQUNYLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUM7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFDO2dCQUNGLGlHQUFpRztpQkFDaEcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNiLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDeEMsSUFBSSxXQUFXLEtBQUssQ0FBQyxFQUFFO29CQUNyQixPQUFPLFdBQVcsQ0FBQztpQkFDcEI7Z0JBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQ3JCLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ1g7Z0JBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQ3JCLE9BQU8sQ0FBQyxDQUFDO2lCQUNWO2dCQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDTCxPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDLENBQUM7UUFqREEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQzVDLG1CQUFtQjtRQUNuQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0E2Q0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBUFBcbmltcG9ydCB7IGZpbmRUaW1lWm9uZSwgZ2V0Wm9uZWRUaW1lLCBsaXN0VGltZVpvbmVzIH0gZnJvbSAndGltZXpvbmUtc3VwcG9ydCc7XG5pbXBvcnQgeyBmb3JtYXRab25lZFRpbWUgfSBmcm9tICd0aW1lem9uZS1zdXBwb3J0L2Rpc3QvcGFyc2UtZm9ybWF0JztcbmltcG9ydCB7IEJhc2VDb250cm9sLCBOb3ZvQ29udHJvbENvbmZpZyB9IGZyb20gJy4uL0Jhc2VDb250cm9sJztcblxuZXhwb3J0IGNsYXNzIFRpbWV6b25lQ29udHJvbCBleHRlbmRzIEJhc2VDb250cm9sIHtcbiAgY29udHJvbFR5cGUgPSAndGltZXpvbmUnO1xuICBvcHRpb25zID0gW107XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZykge1xuICAgIHN1cGVyKCdUaW1lem9uZUNvbnRyb2wnLCBjb25maWcpO1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuYnVpbGRUaW1lem9uZXMobmV3IERhdGUoKSk7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IGNvbmZpZy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICAvLyBjdXJyZW50IHRpbWV6b25lXG4gICAgY29uc3QgdHogPSBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmU7XG4gICAgdGhpcy52YWx1ZSA9IHR6O1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFRpbWV6b25lcyA9IChjb21wYXJlRGF0ZTogRGF0ZSkgPT4ge1xuICAgIGNvbnN0IHRpbWV6b25lcyA9IGxpc3RUaW1lWm9uZXMoKVxuICAgICAgLm1hcCgoem9uZSkgPT4ge1xuICAgICAgICBjb25zdCB0aW1lem9uZSA9IGZpbmRUaW1lWm9uZSh6b25lKTtcbiAgICAgICAgY29uc3Qgem9uZWRUaW1lID0gZ2V0Wm9uZWRUaW1lKGNvbXBhcmVEYXRlLCB0aW1lem9uZSk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGZvcm1hdFpvbmVkVGltZSh6b25lZFRpbWUsIGB6IC0gWyR7em9uZX1dIChbR01UXSBaKWApLnJlcGxhY2UoJ18nLCAnICcpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHtcbiAgICAgICAgICB2YWx1ZTogem9uZSxcbiAgICAgICAgICBsYWJlbDogZm9ybWF0dGVkLFxuICAgICAgICAgIG9mZnNldDogem9uZWRUaW1lLnpvbmUub2Zmc2V0LFxuICAgICAgICB9O1xuICAgICAgICAvLyBpZiAodGhpcy5wcm9wcy5tYXBMYWJlbHMpIHtcbiAgICAgICAgLy8gICBvcHRpb24ubGFiZWwgPSB0aGlzLnByb3BzLm1hcExhYmVscyhvcHRpb24pO1xuICAgICAgICAvLyB9XG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICB9KVxuICAgICAgLy8gRm9ybWF0cyAnbm9pc3knIHRpbWV6b25lcyB3aXRob3V0IGEgbGV0dGVyIGFjcm9ueW0uXG4gICAgICAubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgY29uc3Qgcmd4ID0gLyheKFxcK3wtKVxcZCtcXHMtICkvO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gb3B0aW9uLmxhYmVsLm1hdGNoKHJneCk7XG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgY29uc3QgcHJlZml4ID0gbWF0Y2hlc1swXTtcbiAgICAgICAgICBvcHRpb24ubGFiZWwgPSBvcHRpb24ubGFiZWwuc3BsaXQocHJlZml4KVsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgfSlcbiAgICAgIC8vIFNvcnRzIFcgLT4gRSwgcHJpb3JpdGl6ZXMgYW1lcmljYS4gY291bGQgYmUgbW9yZSBudWFuY2VkIGJhc2VkIG9uIHN5c3RlbSB0eiBidXQgc2ltcGxlIGZvciBub3dcbiAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IG9mZnNldERlbHRhID0gYi5vZmZzZXQgLSBhLm9mZnNldDtcbiAgICAgICAgaWYgKG9mZnNldERlbHRhICE9PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIG9mZnNldERlbHRhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhLmxhYmVsIDwgYi5sYWJlbCkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYS5sYWJlbCA+IGIubGFiZWwpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pO1xuICAgIHJldHVybiB0aW1lem9uZXM7XG4gIH07XG59XG4iXX0=