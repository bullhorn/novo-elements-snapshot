export class CollectionEvent {
    static { this.REFRESH = 'Collection.REFRESH'; }
    static { this.ADD = 'Collection.ADD'; }
    static { this.REMOVE = 'Collection.REMOVE'; }
    static { this.REMOVE_ALL = 'Collection.REMOVE_ALL'; }
    static { this.REPLACE = 'Collection.REPLACE'; }
    static { this.INVALIDATE_ALL = 'Collection.INVALIDATE_ALL'; }
    static { this.SORT = 'Collection.SORT'; }
    static { this.FILTER = 'Collection.FILTER'; }
    static { this.CHANGE = 'Collection.CHANGE'; }
    static { this.CURRENTPAGE_CHANGE = 'Collection.CURRENTPAGE_CHANGE'; }
    static { this.PAGESIZE_CHANGE = 'Collection.PAGESIZE_CHANGE'; }
    static { this.NUMBEROFPAGES_CHANGE = 'Collection.NUMBEROFPAGES_CHANGE'; }
    constructor(type = 'Collection.REFRESH', data = []) {
        this.type = '';
        this.data = [];
        this.type = type;
        this.data = data;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGVjdGlvbkV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvc2VydmljZXMvZGF0YS1wcm92aWRlci9Db2xsZWN0aW9uRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLGVBQWU7YUFDbkIsWUFBTyxHQUFXLG9CQUFvQixBQUEvQixDQUFnQzthQUN2QyxRQUFHLEdBQVcsZ0JBQWdCLEFBQTNCLENBQTRCO2FBQy9CLFdBQU0sR0FBVyxtQkFBbUIsQUFBOUIsQ0FBK0I7YUFDckMsZUFBVSxHQUFXLHVCQUF1QixBQUFsQyxDQUFtQzthQUM3QyxZQUFPLEdBQVcsb0JBQW9CLEFBQS9CLENBQWdDO2FBQ3ZDLG1CQUFjLEdBQVcsMkJBQTJCLEFBQXRDLENBQXVDO2FBQ3JELFNBQUksR0FBVyxpQkFBaUIsQUFBNUIsQ0FBNkI7YUFDakMsV0FBTSxHQUFXLG1CQUFtQixBQUE5QixDQUErQjthQUNyQyxXQUFNLEdBQVcsbUJBQW1CLEFBQTlCLENBQStCO2FBQ3JDLHVCQUFrQixHQUFXLCtCQUErQixBQUExQyxDQUEyQzthQUM3RCxvQkFBZSxHQUFXLDRCQUE0QixBQUF2QyxDQUF3QzthQUN2RCx5QkFBb0IsR0FBVyxpQ0FBaUMsQUFBNUMsQ0FBNkM7SUFLeEUsWUFBWSxJQUFJLEdBQUcsb0JBQW9CLEVBQUUsSUFBSSxHQUFHLEVBQUU7UUFIbEQsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixTQUFJLEdBQWUsRUFBRSxDQUFDO1FBR3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29sbGVjdGlvbkV2ZW50IHtcbiAgc3RhdGljIFJFRlJFU0g6IHN0cmluZyA9ICdDb2xsZWN0aW9uLlJFRlJFU0gnO1xuICBzdGF0aWMgQUREOiBzdHJpbmcgPSAnQ29sbGVjdGlvbi5BREQnO1xuICBzdGF0aWMgUkVNT1ZFOiBzdHJpbmcgPSAnQ29sbGVjdGlvbi5SRU1PVkUnO1xuICBzdGF0aWMgUkVNT1ZFX0FMTDogc3RyaW5nID0gJ0NvbGxlY3Rpb24uUkVNT1ZFX0FMTCc7XG4gIHN0YXRpYyBSRVBMQUNFOiBzdHJpbmcgPSAnQ29sbGVjdGlvbi5SRVBMQUNFJztcbiAgc3RhdGljIElOVkFMSURBVEVfQUxMOiBzdHJpbmcgPSAnQ29sbGVjdGlvbi5JTlZBTElEQVRFX0FMTCc7XG4gIHN0YXRpYyBTT1JUOiBzdHJpbmcgPSAnQ29sbGVjdGlvbi5TT1JUJztcbiAgc3RhdGljIEZJTFRFUjogc3RyaW5nID0gJ0NvbGxlY3Rpb24uRklMVEVSJztcbiAgc3RhdGljIENIQU5HRTogc3RyaW5nID0gJ0NvbGxlY3Rpb24uQ0hBTkdFJztcbiAgc3RhdGljIENVUlJFTlRQQUdFX0NIQU5HRTogc3RyaW5nID0gJ0NvbGxlY3Rpb24uQ1VSUkVOVFBBR0VfQ0hBTkdFJztcbiAgc3RhdGljIFBBR0VTSVpFX0NIQU5HRTogc3RyaW5nID0gJ0NvbGxlY3Rpb24uUEFHRVNJWkVfQ0hBTkdFJztcbiAgc3RhdGljIE5VTUJFUk9GUEFHRVNfQ0hBTkdFOiBzdHJpbmcgPSAnQ29sbGVjdGlvbi5OVU1CRVJPRlBBR0VTX0NIQU5HRSc7XG5cbiAgdHlwZTogc3RyaW5nID0gJyc7XG4gIGRhdGE6IEFycmF5PGFueT4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcih0eXBlID0gJ0NvbGxlY3Rpb24uUkVGUkVTSCcsIGRhdGEgPSBbXSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxufVxuIl19