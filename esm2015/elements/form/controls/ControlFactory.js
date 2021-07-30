import { AddressControl, CheckboxControl, CheckListControl, DateTimeControl, EditorControl, FileControl, NativeSelectControl, PickerControl, QuickNoteControl, RadioControl, ReadOnlyControl, SelectControl, TablePickerControl, TextAreaControl, TextBoxControl, TilesControl, TimeControl, } from './index';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbEZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Zvcm0vY29udHJvbHMvQ29udHJvbEZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixhQUFhLEVBQ2IsV0FBVyxFQUNYLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixlQUFlLEVBQ2YsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEVBQ2YsY0FBYyxFQUNkLFlBQVksRUFDWixXQUFXLEdBQ1osTUFBTSxTQUFTLENBQUM7QUFHakIsTUFBTSxPQUFPLGNBQWM7SUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZLEVBQUUsTUFBbUI7UUFDN0MsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLGdCQUFnQjtnQkFDbkIsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxLQUFLLGlCQUFpQjtnQkFDcEIsT0FBTyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxLQUFLLGtCQUFrQjtnQkFDckIsT0FBTyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLEtBQUssa0JBQWtCO2dCQUNyQixPQUFPLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsS0FBSyxpQkFBaUI7Z0JBQ3BCLE9BQU8sSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsS0FBSyxlQUFlO2dCQUNsQixPQUFPLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLEtBQUssYUFBYTtnQkFDaEIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxLQUFLLHFCQUFxQjtnQkFDeEIsT0FBTyxJQUFJLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLEtBQUssZUFBZTtnQkFDbEIsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxLQUFLLG9CQUFvQjtnQkFDdkIsT0FBTyxJQUFJLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLEtBQUssa0JBQWtCO2dCQUNyQixPQUFPLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsS0FBSyxjQUFjO2dCQUNqQixPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLEtBQUssaUJBQWlCO2dCQUNwQixPQUFPLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLEtBQUssaUJBQWlCO2dCQUNwQixPQUFPLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLEtBQUssZ0JBQWdCO2dCQUNuQixPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLEtBQUssZUFBZTtnQkFDbEIsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxLQUFLLGNBQWM7Z0JBQ2pCLE9BQU8sSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsS0FBSyxhQUFhO2dCQUNoQixPQUFPLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDO2dCQUNFLE9BQU8sQ0FBQyxJQUFJLENBQ1YscUhBQXFILEVBQ3JILElBQUksQ0FDTCxDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFkZHJlc3NDb250cm9sLFxyXG4gIENoZWNrYm94Q29udHJvbCxcclxuICBDaGVja0xpc3RDb250cm9sLFxyXG4gIERhdGVUaW1lQ29udHJvbCxcclxuICBFZGl0b3JDb250cm9sLFxyXG4gIEZpbGVDb250cm9sLFxyXG4gIE5hdGl2ZVNlbGVjdENvbnRyb2wsXHJcbiAgUGlja2VyQ29udHJvbCxcclxuICBRdWlja05vdGVDb250cm9sLFxyXG4gIFJhZGlvQ29udHJvbCxcclxuICBSZWFkT25seUNvbnRyb2wsXHJcbiAgU2VsZWN0Q29udHJvbCxcclxuICBUYWJsZVBpY2tlckNvbnRyb2wsXHJcbiAgVGV4dEFyZWFDb250cm9sLFxyXG4gIFRleHRCb3hDb250cm9sLFxyXG4gIFRpbGVzQ29udHJvbCxcclxuICBUaW1lQ29udHJvbCxcclxufSBmcm9tICcuL2luZGV4JztcclxuaW1wb3J0IHsgQmFzZUNvbnRyb2wgfSBmcm9tICcuL0Jhc2VDb250cm9sJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sRmFjdG9yeSB7XHJcbiAgc3RhdGljIGNyZWF0ZSh0eXBlOiBzdHJpbmcsIGNvbmZpZzogQmFzZUNvbnRyb2wpOiBCYXNlQ29udHJvbCB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnQWRkcmVzc0NvbnRyb2wnOlxyXG4gICAgICAgIHJldHVybiBuZXcgQWRkcmVzc0NvbnRyb2woY29uZmlnKTtcclxuICAgICAgY2FzZSAnQ2hlY2tib3hDb250cm9sJzpcclxuICAgICAgICByZXR1cm4gbmV3IENoZWNrYm94Q29udHJvbChjb25maWcpO1xyXG4gICAgICBjYXNlICdDaGVja0xpc3RDb250cm9sJzpcclxuICAgICAgICByZXR1cm4gbmV3IENoZWNrTGlzdENvbnRyb2woY29uZmlnKTtcclxuICAgICAgY2FzZSAnQ2hlY2tMaXN0Q29udHJvbCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaGVja0xpc3RDb250cm9sKGNvbmZpZyk7XHJcbiAgICAgIGNhc2UgJ0RhdGVUaW1lQ29udHJvbCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZUNvbnRyb2woY29uZmlnKTtcclxuICAgICAgY2FzZSAnRWRpdG9yQ29udHJvbCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFZGl0b3JDb250cm9sKGNvbmZpZyk7XHJcbiAgICAgIGNhc2UgJ0ZpbGVDb250cm9sJzpcclxuICAgICAgICByZXR1cm4gbmV3IEZpbGVDb250cm9sKGNvbmZpZyk7XHJcbiAgICAgIGNhc2UgJ05hdGl2ZVNlbGVjdENvbnRyb2wnOlxyXG4gICAgICAgIHJldHVybiBuZXcgTmF0aXZlU2VsZWN0Q29udHJvbChjb25maWcpO1xyXG4gICAgICBjYXNlICdQaWNrZXJDb250cm9sJzpcclxuICAgICAgICByZXR1cm4gbmV3IFBpY2tlckNvbnRyb2woY29uZmlnKTtcclxuICAgICAgY2FzZSAnVGFibGVQaWNrZXJDb250cm9sJzpcclxuICAgICAgICByZXR1cm4gbmV3IFRhYmxlUGlja2VyQ29udHJvbChjb25maWcpO1xyXG4gICAgICBjYXNlICdRdWlja05vdGVDb250cm9sJzpcclxuICAgICAgICByZXR1cm4gbmV3IFF1aWNrTm90ZUNvbnRyb2woY29uZmlnKTtcclxuICAgICAgY2FzZSAnUmFkaW9Db250cm9sJzpcclxuICAgICAgICByZXR1cm4gbmV3IFJhZGlvQ29udHJvbChjb25maWcpO1xyXG4gICAgICBjYXNlICdSZWFkT25seUNvbnRyb2wnOlxyXG4gICAgICAgIHJldHVybiBuZXcgUmVhZE9ubHlDb250cm9sKGNvbmZpZyk7XHJcbiAgICAgIGNhc2UgJ1RleHRBcmVhQ29udHJvbCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0QXJlYUNvbnRyb2woY29uZmlnKTtcclxuICAgICAgY2FzZSAnVGV4dEJveENvbnRyb2wnOlxyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dEJveENvbnRyb2woY29uZmlnKTtcclxuICAgICAgY2FzZSAnU2VsZWN0Q29udHJvbCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTZWxlY3RDb250cm9sKGNvbmZpZyk7XHJcbiAgICAgIGNhc2UgJ1RpbGVzQ29udHJvbCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaWxlc0NvbnRyb2woY29uZmlnKTtcclxuICAgICAgY2FzZSAnVGltZUNvbnRyb2wnOlxyXG4gICAgICAgIHJldHVybiBuZXcgVGltZUNvbnRyb2woY29uZmlnKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgICAnW0NvbnRyb2xGYWN0b3J5XSAtIHVuYWJsZSB0byBmaW5kIGNvbnRyb2wgZm9yIHR5cGUuIE1ha2Ugc3VyZSB0byBzZXQgXCJlZGl0b3JUeXBlXCIgYW5kIFwiZWRpdG9yQ29uZmlnXCIgb24geW91ciBjb2x1bW4nLFxyXG4gICAgICAgICAgdHlwZSxcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=