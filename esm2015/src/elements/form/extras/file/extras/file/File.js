export class NovoFile {
    constructor(file) {
        this.name = '';
        this.contentType = '';
        this.lastModified = 0;
        this.size = 0;
        this.loaded = false;
        this.reader = new FileReader();
        this.name = `${encodeURIComponent(file.name || '')}`;
        this.contentType = file.type;
        this.lastModified = file.lastModified;
        this.size = file.size;
        this.file = file;
        this.reader.onload = (event) => {
            this.fileContents = event.target.result.split(',')[1];
            this.dataURL = event.target.result;
            this.loaded = true;
            if (this.readPromise) {
                this.readPromise(this);
            }
        };
    }
    read() {
        return new Promise((resolve) => {
            this.readPromise = resolve;
            // when the file is read it triggers the onload event above.
            this.reader.readAsDataURL(this.file);
        });
    }
    toJSON() {
        return {
            name: this.name,
            contentType: this.type,
            lastModified: this.lastModified,
            size: this.size,
            fileContents: this.fileContents,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9mb3JtL2V4dHJhcy9maWxlL2V4dHJhcy9maWxlL0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFFBQVE7SUFhbkIsWUFBWSxJQUFJO1FBWmhCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFHbEIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBR3hCLFdBQU0sR0FBZSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBSXBDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJO1FBQ0YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1lBQzNCLDREQUE0RDtZQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDdEIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNoQyxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE5vdm9GaWxlIHtcbiAgbmFtZTogc3RyaW5nID0gJyc7XG4gIGZpbGU6IGFueTtcbiAgdHlwZTogYW55O1xuICBjb250ZW50VHlwZTogc3RyaW5nID0gJyc7XG4gIGxhc3RNb2RpZmllZDogbnVtYmVyID0gMDtcbiAgc2l6ZTogbnVtYmVyID0gMDtcbiAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGZpbGVDb250ZW50czogc3RyaW5nO1xuICBkYXRhVVJMOiBzdHJpbmc7XG4gIHJlYWRlcjogRmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gIHJlYWRQcm9taXNlOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvcihmaWxlKSB7XG4gICAgdGhpcy5uYW1lID0gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGZpbGUubmFtZSB8fCAnJyl9YDtcbiAgICB0aGlzLmNvbnRlbnRUeXBlID0gZmlsZS50eXBlO1xuICAgIHRoaXMubGFzdE1vZGlmaWVkID0gZmlsZS5sYXN0TW9kaWZpZWQ7XG4gICAgdGhpcy5zaXplID0gZmlsZS5zaXplO1xuICAgIHRoaXMuZmlsZSA9IGZpbGU7XG4gICAgdGhpcy5yZWFkZXIub25sb2FkID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIHRoaXMuZmlsZUNvbnRlbnRzID0gZXZlbnQudGFyZ2V0LnJlc3VsdC5zcGxpdCgnLCcpWzFdO1xuICAgICAgdGhpcy5kYXRhVVJMID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnJlYWRQcm9taXNlKSB7XG4gICAgICAgIHRoaXMucmVhZFByb21pc2UodGhpcyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJlYWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLnJlYWRQcm9taXNlID0gcmVzb2x2ZTtcbiAgICAgIC8vIHdoZW4gdGhlIGZpbGUgaXMgcmVhZCBpdCB0cmlnZ2VycyB0aGUgb25sb2FkIGV2ZW50IGFib3ZlLlxuICAgICAgdGhpcy5yZWFkZXIucmVhZEFzRGF0YVVSTCh0aGlzLmZpbGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBjb250ZW50VHlwZTogdGhpcy50eXBlLFxuICAgICAgbGFzdE1vZGlmaWVkOiB0aGlzLmxhc3RNb2RpZmllZCxcbiAgICAgIHNpemU6IHRoaXMuc2l6ZSxcbiAgICAgIGZpbGVDb250ZW50czogdGhpcy5maWxlQ29udGVudHMsXG4gICAgfTtcbiAgfVxufVxuIl19