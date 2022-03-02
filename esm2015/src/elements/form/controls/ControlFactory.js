import { AddressControl, CheckboxControl, CheckListControl, DateTimeControl, EditorControl, FileControl, NativeSelectControl, PickerControl, QuickNoteControl, RadioControl, ReadOnlyControl, SelectControl, SwitchControl, TablePickerControl, TextAreaControl, TextBoxControl, TilesControl, TimeControl, } from './index';
export class ControlFactory {
    static create(type, config) {
        switch (type) {
            case 'AddressControl':
                return new AddressControl(config);
            case 'CheckboxControl':
                return new CheckboxControl(config);
            case 'CheckListControl':
                return new CheckListControl(config);
            case 'CheckListControl':
                return new CheckListControl(config);
            case 'DateTimeControl':
                return new DateTimeControl(config);
            case 'EditorControl':
                return new EditorControl(config);
            case 'FileControl':
                return new FileControl(config);
            case 'NativeSelectControl':
                return new NativeSelectControl(config);
            case 'PickerControl':
                return new PickerControl(config);
            case 'TablePickerControl':
                return new TablePickerControl(config);
            case 'QuickNoteControl':
                return new QuickNoteControl(config);
            case 'RadioControl':
                return new RadioControl(config);
            case 'ReadOnlyControl':
                return new ReadOnlyControl(config);
            case 'TextAreaControl':
                return new TextAreaControl(config);
            case 'TextBoxControl':
                return new TextBoxControl(config);
            case 'SelectControl':
                return new SelectControl(config);
            case 'SwitchControl':
                return new SwitchControl(config);
            case 'TilesControl':
                return new TilesControl(config);
            case 'TimeControl':
                return new TimeControl(config);
            default:
                console.warn('[ControlFactory] - unable to find control for type. Make sure to set "editorType" and "editorConfig" on your column', type);
                return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbEZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZm9ybS9jb250cm9scy9Db250cm9sRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLGFBQWEsRUFDYixXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEVBQ2YsY0FBYyxFQUNkLFlBQVksRUFDWixXQUFXLEdBQ1osTUFBTSxTQUFTLENBQUM7QUFFakIsTUFBTSxPQUFPLGNBQWM7SUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZLEVBQUUsTUFBbUI7UUFDN0MsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLGdCQUFnQjtnQkFDbkIsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxLQUFLLGlCQUFpQjtnQkFDcEIsT0FBTyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxLQUFLLGtCQUFrQjtnQkFDckIsT0FBTyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLEtBQUssa0JBQWtCO2dCQUNyQixPQUFPLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsS0FBSyxpQkFBaUI7Z0JBQ3BCLE9BQU8sSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsS0FBSyxlQUFlO2dCQUNsQixPQUFPLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLEtBQUssYUFBYTtnQkFDaEIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxLQUFLLHFCQUFxQjtnQkFDeEIsT0FBTyxJQUFJLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLEtBQUssZUFBZTtnQkFDbEIsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxLQUFLLG9CQUFvQjtnQkFDdkIsT0FBTyxJQUFJLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLEtBQUssa0JBQWtCO2dCQUNyQixPQUFPLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsS0FBSyxjQUFjO2dCQUNqQixPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLEtBQUssaUJBQWlCO2dCQUNwQixPQUFPLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLEtBQUssaUJBQWlCO2dCQUNwQixPQUFPLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLEtBQUssZ0JBQWdCO2dCQUNuQixPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLEtBQUssZUFBZTtnQkFDbEIsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxLQUFLLGVBQWU7Z0JBQ2xCLE9BQU8sSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsS0FBSyxjQUFjO2dCQUNqQixPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLEtBQUssYUFBYTtnQkFDaEIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQztnQkFDRSxPQUFPLENBQUMsSUFBSSxDQUNWLHFIQUFxSCxFQUNySCxJQUFJLENBQ0wsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUNvbnRyb2wgfSBmcm9tICcuL0Jhc2VDb250cm9sJztcbmltcG9ydCB7XG4gIEFkZHJlc3NDb250cm9sLFxuICBDaGVja2JveENvbnRyb2wsXG4gIENoZWNrTGlzdENvbnRyb2wsXG4gIERhdGVUaW1lQ29udHJvbCxcbiAgRWRpdG9yQ29udHJvbCxcbiAgRmlsZUNvbnRyb2wsXG4gIE5hdGl2ZVNlbGVjdENvbnRyb2wsXG4gIFBpY2tlckNvbnRyb2wsXG4gIFF1aWNrTm90ZUNvbnRyb2wsXG4gIFJhZGlvQ29udHJvbCxcbiAgUmVhZE9ubHlDb250cm9sLFxuICBTZWxlY3RDb250cm9sLFxuICBTd2l0Y2hDb250cm9sLFxuICBUYWJsZVBpY2tlckNvbnRyb2wsXG4gIFRleHRBcmVhQ29udHJvbCxcbiAgVGV4dEJveENvbnRyb2wsXG4gIFRpbGVzQ29udHJvbCxcbiAgVGltZUNvbnRyb2wsXG59IGZyb20gJy4vaW5kZXgnO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbEZhY3Rvcnkge1xuICBzdGF0aWMgY3JlYXRlKHR5cGU6IHN0cmluZywgY29uZmlnOiBCYXNlQ29udHJvbCk6IEJhc2VDb250cm9sIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ0FkZHJlc3NDb250cm9sJzpcbiAgICAgICAgcmV0dXJuIG5ldyBBZGRyZXNzQ29udHJvbChjb25maWcpO1xuICAgICAgY2FzZSAnQ2hlY2tib3hDb250cm9sJzpcbiAgICAgICAgcmV0dXJuIG5ldyBDaGVja2JveENvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ0NoZWNrTGlzdENvbnRyb2wnOlxuICAgICAgICByZXR1cm4gbmV3IENoZWNrTGlzdENvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ0NoZWNrTGlzdENvbnRyb2wnOlxuICAgICAgICByZXR1cm4gbmV3IENoZWNrTGlzdENvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ0RhdGVUaW1lQ29udHJvbCc6XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWVDb250cm9sKGNvbmZpZyk7XG4gICAgICBjYXNlICdFZGl0b3JDb250cm9sJzpcbiAgICAgICAgcmV0dXJuIG5ldyBFZGl0b3JDb250cm9sKGNvbmZpZyk7XG4gICAgICBjYXNlICdGaWxlQ29udHJvbCc6XG4gICAgICAgIHJldHVybiBuZXcgRmlsZUNvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ05hdGl2ZVNlbGVjdENvbnRyb2wnOlxuICAgICAgICByZXR1cm4gbmV3IE5hdGl2ZVNlbGVjdENvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ1BpY2tlckNvbnRyb2wnOlxuICAgICAgICByZXR1cm4gbmV3IFBpY2tlckNvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ1RhYmxlUGlja2VyQ29udHJvbCc6XG4gICAgICAgIHJldHVybiBuZXcgVGFibGVQaWNrZXJDb250cm9sKGNvbmZpZyk7XG4gICAgICBjYXNlICdRdWlja05vdGVDb250cm9sJzpcbiAgICAgICAgcmV0dXJuIG5ldyBRdWlja05vdGVDb250cm9sKGNvbmZpZyk7XG4gICAgICBjYXNlICdSYWRpb0NvbnRyb2wnOlxuICAgICAgICByZXR1cm4gbmV3IFJhZGlvQ29udHJvbChjb25maWcpO1xuICAgICAgY2FzZSAnUmVhZE9ubHlDb250cm9sJzpcbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkT25seUNvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ1RleHRBcmVhQ29udHJvbCc6XG4gICAgICAgIHJldHVybiBuZXcgVGV4dEFyZWFDb250cm9sKGNvbmZpZyk7XG4gICAgICBjYXNlICdUZXh0Qm94Q29udHJvbCc6XG4gICAgICAgIHJldHVybiBuZXcgVGV4dEJveENvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ1NlbGVjdENvbnRyb2wnOlxuICAgICAgICByZXR1cm4gbmV3IFNlbGVjdENvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ1N3aXRjaENvbnRyb2wnOlxuICAgICAgICByZXR1cm4gbmV3IFN3aXRjaENvbnRyb2woY29uZmlnKTtcbiAgICAgIGNhc2UgJ1RpbGVzQ29udHJvbCc6XG4gICAgICAgIHJldHVybiBuZXcgVGlsZXNDb250cm9sKGNvbmZpZyk7XG4gICAgICBjYXNlICdUaW1lQ29udHJvbCc6XG4gICAgICAgIHJldHVybiBuZXcgVGltZUNvbnRyb2woY29uZmlnKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnW0NvbnRyb2xGYWN0b3J5XSAtIHVuYWJsZSB0byBmaW5kIGNvbnRyb2wgZm9yIHR5cGUuIE1ha2Ugc3VyZSB0byBzZXQgXCJlZGl0b3JUeXBlXCIgYW5kIFwiZWRpdG9yQ29uZmlnXCIgb24geW91ciBjb2x1bW4nLFxuICAgICAgICAgIHR5cGUsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19