export class ActivityTableRenderers {
    static propertyRenderer(prop) {
        const ret = (data) => {
            // TODO - allow for dots and sub props
            return data[prop];
        };
        return ret;
    }
    static dateRenderer(prop) {
        const ret = (data) => {
            return data[prop] ? new Date(data[prop]).toLocaleDateString() : '';
        };
        return ret;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktdGFibGUtcmVuZGVyZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2ltcGxlLXRhYmxlL2FjdGl2aXR5LXRhYmxlLXJlbmRlcmVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBSSxJQUFZO1FBQ3JDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBTyxFQUFVLEVBQUU7WUFDOUIsc0NBQXNDO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztRQUNGLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUksSUFBWTtRQUNqQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQU8sRUFBVSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDckUsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQWN0aXZpdHlUYWJsZVJlbmRlcmVycyB7XG4gIHN0YXRpYyBwcm9wZXJ0eVJlbmRlcmVyPFQ+KHByb3A6IHN0cmluZyk6IEZ1bmN0aW9uIHtcbiAgICBjb25zdCByZXQgPSAoZGF0YTogVCk6IHN0cmluZyA9PiB7XG4gICAgICAvLyBUT0RPIC0gYWxsb3cgZm9yIGRvdHMgYW5kIHN1YiBwcm9wc1xuICAgICAgcmV0dXJuIGRhdGFbcHJvcF07XG4gICAgfTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIGRhdGVSZW5kZXJlcjxUPihwcm9wOiBzdHJpbmcpOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgcmV0ID0gKGRhdGE6IFQpOiBzdHJpbmcgPT4ge1xuICAgICAgcmV0dXJuIGRhdGFbcHJvcF0gPyBuZXcgRGF0ZShkYXRhW3Byb3BdKS50b0xvY2FsZURhdGVTdHJpbmcoKSA6ICcnO1xuICAgIH07XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuIl19