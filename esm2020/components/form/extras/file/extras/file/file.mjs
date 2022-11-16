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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZm9ybS9leHRyYXMvZmlsZS9leHRyYXMvZmlsZS9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxRQUFRO0lBYW5CLFlBQVksSUFBSTtRQVpoQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBR2xCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUd4QixXQUFNLEdBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUlwQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUMzQiw0REFBNEQ7WUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ3RCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDaEMsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOb3ZvRmlsZSB7XG4gIG5hbWU6IHN0cmluZyA9ICcnO1xuICBmaWxlOiBhbnk7XG4gIHR5cGU6IGFueTtcbiAgY29udGVudFR5cGU6IHN0cmluZyA9ICcnO1xuICBsYXN0TW9kaWZpZWQ6IG51bWJlciA9IDA7XG4gIHNpemU6IG51bWJlciA9IDA7XG4gIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBmaWxlQ29udGVudHM6IHN0cmluZztcbiAgZGF0YVVSTDogc3RyaW5nO1xuICByZWFkZXI6IEZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICByZWFkUHJvbWlzZTogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3IoZmlsZSkge1xuICAgIHRoaXMubmFtZSA9IGAke2VuY29kZVVSSUNvbXBvbmVudChmaWxlLm5hbWUgfHwgJycpfWA7XG4gICAgdGhpcy5jb250ZW50VHlwZSA9IGZpbGUudHlwZTtcbiAgICB0aGlzLmxhc3RNb2RpZmllZCA9IGZpbGUubGFzdE1vZGlmaWVkO1xuICAgIHRoaXMuc2l6ZSA9IGZpbGUuc2l6ZTtcbiAgICB0aGlzLmZpbGUgPSBmaWxlO1xuICAgIHRoaXMucmVhZGVyLm9ubG9hZCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICB0aGlzLmZpbGVDb250ZW50cyA9IGV2ZW50LnRhcmdldC5yZXN1bHQuc3BsaXQoJywnKVsxXTtcbiAgICAgIHRoaXMuZGF0YVVSTCA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5yZWFkUHJvbWlzZSkge1xuICAgICAgICB0aGlzLnJlYWRQcm9taXNlKHRoaXMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5yZWFkUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICAvLyB3aGVuIHRoZSBmaWxlIGlzIHJlYWQgaXQgdHJpZ2dlcnMgdGhlIG9ubG9hZCBldmVudCBhYm92ZS5cbiAgICAgIHRoaXMucmVhZGVyLnJlYWRBc0RhdGFVUkwodGhpcy5maWxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgY29udGVudFR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGxhc3RNb2RpZmllZDogdGhpcy5sYXN0TW9kaWZpZWQsXG4gICAgICBzaXplOiB0aGlzLnNpemUsXG4gICAgICBmaWxlQ29udGVudHM6IHRoaXMuZmlsZUNvbnRlbnRzLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==