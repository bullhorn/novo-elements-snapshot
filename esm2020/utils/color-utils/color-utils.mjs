export class Color {
    constructor(value) {
        this.isValid = true;
        if (Color.isHSL(value)) {
            // let { h, s, l, a = 1 } = value as HSLA;
            this.source = rgbToHex(hslToRgb(value));
        }
        else if (Color.isHSV(value)) {
            this.source = rgbToHex(hsvToRgb(value));
        }
        else if (Color.isRGB(value)) {
            this.source = rgbToHex(value);
        }
        else if (Color.isValidHex(value.toString())) {
            this.source = value;
        }
        else {
            this.isValid = false;
            console.error(`Invalid color: ${value}`);
        }
    }
    get hex() {
        return this.source;
    }
    get rgb() {
        return hexToRgb(this.source);
    }
    get hsl() {
        return rgbToHsl(hexToRgb(this.source));
    }
    get hsv() {
        return rgbToHsv(hexToRgb(this.source));
    }
    static isValidHex(h) {
        const clean = h.replace('#', '').toLowerCase();
        const a = parseInt(clean, 16);
        return a.toString(16).padStart(6, '0') === clean;
    }
    static isRGB(obj) {
        const keys = ['r', 'g', 'b'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isRGBA(obj) {
        const keys = ['r', 'g', 'b', 'a'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isHSL(obj) {
        const keys = ['h', 's', 'l'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isHSLA(obj) {
        const keys = ['h', 's', 'l', 'a'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isHSV(obj) {
        const keys = ['h', 's', 'v'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isHSVA(obj) {
        const keys = ['h', 's', 'v', 'a'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
}
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
function rgbToHex({ r, g, b }) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl({ r, g, b }) {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h, s, l };
}
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb({ h, s, l }) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        function hue2rgb(p1, q1, t1) {
            if (t1 < 0) {
                t1 += 1;
            }
            if (t1 > 1) {
                t1 -= 1;
            }
            if (t1 < 1 / 6) {
                return p1 + (q1 - p1) * 6 * t1;
            }
            if (t1 < 1 / 2) {
                return q1;
            }
            if (t1 < 2 / 3) {
                return p1 + (q1 - p1) * (2 / 3 - t1) * 6;
            }
            return p1;
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: r * 255,
        g: g * 255,
        b: b * 255,
    };
}
/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv({ r, g, b }) {
    (r = r / 255), (g = g / 255), (b = b / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h, s, v };
}
/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb({ h, s, v }) {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }
    return {
        r: r * 255,
        g: g * 255,
        b: b * 255,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy91dGlscy9jb2xvci11dGlscy9jb2xvci11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQkEsTUFBTSxPQUFPLEtBQUs7SUFJaEIsWUFBWSxLQUFrQztRQUY5QyxZQUFPLEdBQVksSUFBSSxDQUFDO1FBR3RCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QiwwQ0FBMEM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQVksQ0FBQyxDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQVksQ0FBQyxDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBWSxDQUFDLENBQUM7U0FDdEM7YUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFlLENBQUM7U0FDL0I7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEdBQUc7UUFDTCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFD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S0FDckI7U0FBTTtRQUNMLFFBQVEsR0FBRyxFQUFFO1lBQ1gsS0FBSyxDQUFDO2dCQUNKLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNO1lBQ1IsS0FBSyxDQUFDO2dCQUNKLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixNQUFNO1lBQ1IsS0FBSyxDQUFDO2dCQUNKLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixNQUFNO1NBQ1Q7UUFDRCxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ1I7SUFFRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNyQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILFNBQVMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQU87SUFDaEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVaLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVoQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDYixLQUFLLENBQUM7WUFDSixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNO1FBQ1IsS0FBSyxDQUFDO1lBQ0osQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTTtRQUNSLEtBQUssQ0FBQztZQUNKLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU07UUFDUixLQUFLLENBQUM7WUFDSixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNO1FBQ1IsS0FBSyxDQUFDO1lBQ0osQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTTtRQUNSLEtBQUssQ0FBQztZQUNKLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU07S0FDVDtJQUVELE9BQU87UUFDTCxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUc7UUFDVixDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUc7UUFDVixDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUc7S0FDWCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbInR5cGUgQ29sb3JUeXBlID0gSFNMIHwgSFNMQSB8IEhTViB8IEhTVkEgfCBSR0IgfCBSR0JBIHwgc3RyaW5nO1xuZXhwb3J0IGludGVyZmFjZSBSR0Ige1xuICByOiBudW1iZXI7XG4gIGc6IG51bWJlcjtcbiAgYjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJHQkEgZXh0ZW5kcyBSR0Ige1xuICBhOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSFNMIHtcbiAgaDogbnVtYmVyO1xuICBzOiBudW1iZXI7XG4gIGw6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIU0xBIGV4dGVuZHMgSFNMIHtcbiAgYTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhTViB7XG4gIGg6IG51bWJlcjtcbiAgczogbnVtYmVyO1xuICB2OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSFNWQSBleHRlbmRzIEhTViB7XG4gIGE6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIENvbG9yIHtcbiAgc291cmNlOiBzdHJpbmc7XG4gIGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBIU0xBIHwgSFNWQSB8IFJHQkEgfCBzdHJpbmcpIHtcbiAgICBpZiAoQ29sb3IuaXNIU0wodmFsdWUpKSB7XG4gICAgICAvLyBsZXQgeyBoLCBzLCBsLCBhID0gMSB9ID0gdmFsdWUgYXMgSFNMQTtcbiAgICAgIHRoaXMuc291cmNlID0gcmdiVG9IZXgoaHNsVG9SZ2IodmFsdWUgYXMgSFNMKSk7XG4gICAgfSBlbHNlIGlmIChDb2xvci5pc0hTVih2YWx1ZSkpIHtcbiAgICAgIHRoaXMuc291cmNlID0gcmdiVG9IZXgoaHN2VG9SZ2IodmFsdWUgYXMgSFNWKSk7XG4gICAgfSBlbHNlIGlmIChDb2xvci5pc1JHQih2YWx1ZSkpIHtcbiAgICAgIHRoaXMuc291cmNlID0gcmdiVG9IZXgodmFsdWUgYXMgUkdCKTtcbiAgICB9IGVsc2UgaWYgKENvbG9yLmlzVmFsaWRIZXgodmFsdWUudG9TdHJpbmcoKSkpIHtcbiAgICAgIHRoaXMuc291cmNlID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgY29sb3I6ICR7dmFsdWV9YCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhleCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZTtcbiAgfVxuICBnZXQgcmdiKCk6IFJHQiB7XG4gICAgcmV0dXJuIGhleFRvUmdiKHRoaXMuc291cmNlKTtcbiAgfVxuICBnZXQgaHNsKCk6IEhTTCB7XG4gICAgcmV0dXJuIHJnYlRvSHNsKGhleFRvUmdiKHRoaXMuc291cmNlKSk7XG4gIH1cbiAgZ2V0IGhzdigpOiBIU1Yge1xuICAgIHJldHVybiByZ2JUb0hzdihoZXhUb1JnYih0aGlzLnNvdXJjZSkpO1xuICB9XG5cbiAgc3RhdGljIGlzVmFsaWRIZXgoaDogc3RyaW5nKSB7XG4gICAgY29uc3QgY2xlYW4gPSBoLnJlcGxhY2UoJyMnLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBhID0gcGFyc2VJbnQoY2xlYW4sIDE2KTtcbiAgICByZXR1cm4gYS50b1N0cmluZygxNikucGFkU3RhcnQoNiwgJzAnKSA9PT0gY2xlYW47XG4gIH1cblxuICBzdGF0aWMgaXNSR0Iob2JqOiBhbnkpIHtcbiAgICBjb25zdCBrZXlzID0gWydyJywgJ2cnLCAnYiddO1xuICAgIHJldHVybiBrZXlzLmV2ZXJ5KChpdGVtKSA9PiBvYmouaGFzT3duUHJvcGVydHkoaXRlbSkpO1xuICB9XG4gIHN0YXRpYyBpc1JHQkEob2JqOiBhbnkpIHtcbiAgICBjb25zdCBrZXlzID0gWydyJywgJ2cnLCAnYicsICdhJ107XG4gICAgcmV0dXJuIGtleXMuZXZlcnkoKGl0ZW0pID0+IG9iai5oYXNPd25Qcm9wZXJ0eShpdGVtKSk7XG4gIH1cbiAgc3RhdGljIGlzSFNMKG9iajogYW55KSB7XG4gICAgY29uc3Qga2V5cyA9IFsnaCcsICdzJywgJ2wnXTtcbiAgICByZXR1cm4ga2V5cy5ldmVyeSgoaXRlbSkgPT4gb2JqLmhhc093blByb3BlcnR5KGl0ZW0pKTtcbiAgfVxuICBzdGF0aWMgaXNIU0xBKG9iajogYW55KSB7XG4gICAgY29uc3Qga2V5cyA9IFsnaCcsICdzJywgJ2wnLCAnYSddO1xuICAgIHJldHVybiBrZXlzLmV2ZXJ5KChpdGVtKSA9PiBvYmouaGFzT3duUHJvcGVydHkoaXRlbSkpO1xuICB9XG4gIHN0YXRpYyBpc0hTVihvYmo6IGFueSkge1xuICAgIGNvbnN0IGtleXMgPSBbJ2gnLCAncycsICd2J107XG4gICAgcmV0dXJuIGtleXMuZXZlcnkoKGl0ZW0pID0+IG9iai5oYXNPd25Qcm9wZXJ0eShpdGVtKSk7XG4gIH1cbiAgc3RhdGljIGlzSFNWQShvYmo6IGFueSkge1xuICAgIGNvbnN0IGtleXMgPSBbJ2gnLCAncycsICd2JywgJ2EnXTtcbiAgICByZXR1cm4ga2V5cy5ldmVyeSgoaXRlbSkgPT4gb2JqLmhhc093blByb3BlcnR5KGl0ZW0pKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wb25lbnRUb0hleChjOiBudW1iZXIpIHtcbiAgY29uc3QgaGV4ID0gYy50b1N0cmluZygxNik7XG4gIHJldHVybiBoZXgubGVuZ3RoID09PSAxID8gJzAnICsgaGV4IDogaGV4O1xufVxuXG5mdW5jdGlvbiByZ2JUb0hleCh7IHIsIGcsIGIgfTogUkdCKSB7XG4gIHJldHVybiAnIycgKyBjb21wb25lbnRUb0hleChyKSArIGNvbXBvbmVudFRvSGV4KGcpICsgY29tcG9uZW50VG9IZXgoYik7XG59XG5cbmZ1bmN0aW9uIGhleFRvUmdiKGhleDogc3RyaW5nKTogUkdCIHwgbnVsbCB7XG4gIGNvbnN0IHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICByZXR1cm4gcmVzdWx0XG4gICAgPyB7XG4gICAgICAgIHI6IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpLFxuICAgICAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICAgICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNiksXG4gICAgICB9XG4gICAgOiBudWxsO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLiBDb252ZXJzaW9uIGZvcm11bGFcbiAqIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTTF9jb2xvcl9zcGFjZS5cbiAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZFxuICogcmV0dXJucyBoLCBzLCBhbmQgbCBpbiB0aGUgc2V0IFswLCAxXS5cbiAqXG4gKiBAcGFyYW0gICBOdW1iZXIgIHIgICAgICAgVGhlIHJlZCBjb2xvciB2YWx1ZVxuICogQHBhcmFtICAgTnVtYmVyICBnICAgICAgIFRoZSBncmVlbiBjb2xvciB2YWx1ZVxuICogQHBhcmFtICAgTnVtYmVyICBiICAgICAgIFRoZSBibHVlIGNvbG9yIHZhbHVlXG4gKiBAcmV0dXJuICBBcnJheSAgICAgICAgICAgVGhlIEhTTCByZXByZXNlbnRhdGlvblxuICovXG5mdW5jdGlvbiByZ2JUb0hzbCh7IHIsIGcsIGIgfTogUkdCKTogSFNMIHtcbiAgKHIgLz0gMjU1KSwgKGcgLz0gMjU1KSwgKGIgLz0gMjU1KTtcbiAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gIGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICBsZXQgaDtcbiAgbGV0IHM7XG4gIGNvbnN0IGwgPSAobWF4ICsgbWluKSAvIDI7XG5cbiAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgaCA9IHMgPSAwOyAvLyBhY2hyb21hdGljXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZCA9IG1heCAtIG1pbjtcbiAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG4gICAgc3dpdGNoIChtYXgpIHtcbiAgICAgIGNhc2UgcjpcbiAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZzpcbiAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGI6XG4gICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBoIC89IDY7XG4gIH1cblxuICByZXR1cm4geyBoLCBzLCBsIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi4gQ29udmVyc2lvbiBmb3JtdWxhXG4gKiBhZGFwdGVkIGZyb20gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IU0xfY29sb3Jfc3BhY2UuXG4gKiBBc3N1bWVzIGgsIHMsIGFuZCBsIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMV0gYW5kXG4gKiByZXR1cm5zIHIsIGcsIGFuZCBiIGluIHRoZSBzZXQgWzAsIDI1NV0uXG4gKlxuICogQHBhcmFtICAgTnVtYmVyICBoICAgICAgIFRoZSBodWVcbiAqIEBwYXJhbSAgIE51bWJlciAgcyAgICAgICBUaGUgc2F0dXJhdGlvblxuICogQHBhcmFtICAgTnVtYmVyICBsICAgICAgIFRoZSBsaWdodG5lc3NcbiAqIEByZXR1cm4gIEFycmF5ICAgICAgICAgICBUaGUgUkdCIHJlcHJlc2VudGF0aW9uXG4gKi9cbmZ1bmN0aW9uIGhzbFRvUmdiKHsgaCwgcywgbCB9OiBIU0wpOiBSR0Ige1xuICBsZXQgciwgZywgYjtcblxuICBpZiAocyA9PT0gMCkge1xuICAgIHIgPSBnID0gYiA9IGw7IC8vIGFjaHJvbWF0aWNcbiAgfSBlbHNlIHtcbiAgICBmdW5jdGlvbiBodWUycmdiKHAxLCBxMSwgdDEpIHtcbiAgICAgIGlmICh0MSA8IDApIHtcbiAgICAgICAgdDEgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmICh0MSA+IDEpIHtcbiAgICAgICAgdDEgLT0gMTtcbiAgICAgIH1cbiAgICAgIGlmICh0MSA8IDEgLyA2KSB7XG4gICAgICAgIHJldHVybiBwMSArIChxMSAtIHAxKSAqIDYgKiB0MTtcbiAgICAgIH1cbiAgICAgIGlmICh0MSA8IDEgLyAyKSB7XG4gICAgICAgIHJldHVybiBxMTtcbiAgICAgIH1cbiAgICAgIGlmICh0MSA8IDIgLyAzKSB7XG4gICAgICAgIHJldHVybiBwMSArIChxMSAtIHAxKSAqICgyIC8gMyAtIHQxKSAqIDY7XG4gICAgICB9XG4gICAgICByZXR1cm4gcDE7XG4gICAgfVxuXG4gICAgY29uc3QgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgY29uc3QgcCA9IDIgKiBsIC0gcTtcbiAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMSAvIDMpO1xuICAgIGcgPSBodWUycmdiKHAsIHEsIGgpO1xuICAgIGIgPSBodWUycmdiKHAsIHEsIGggLSAxIC8gMyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHI6IHIgKiAyNTUsXG4gICAgZzogZyAqIDI1NSxcbiAgICBiOiBiICogMjU1LFxuICB9O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU1YuIENvbnZlcnNpb24gZm9ybXVsYVxuICogYWRhcHRlZCBmcm9tIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSFNWX2NvbG9yX3NwYWNlLlxuICogQXNzdW1lcyByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV0gYW5kXG4gKiByZXR1cm5zIGgsIHMsIGFuZCB2IGluIHRoZSBzZXQgWzAsIDFdLlxuICpcbiAqIEBwYXJhbSAgIE51bWJlciAgciAgICAgICBUaGUgcmVkIGNvbG9yIHZhbHVlXG4gKiBAcGFyYW0gICBOdW1iZXIgIGcgICAgICAgVGhlIGdyZWVuIGNvbG9yIHZhbHVlXG4gKiBAcGFyYW0gICBOdW1iZXIgIGIgICAgICAgVGhlIGJsdWUgY29sb3IgdmFsdWVcbiAqIEByZXR1cm4gIEFycmF5ICAgICAgICAgICBUaGUgSFNWIHJlcHJlc2VudGF0aW9uXG4gKi9cbmZ1bmN0aW9uIHJnYlRvSHN2KHsgciwgZywgYiB9OiBSR0IpOiBIU1Yge1xuICAociA9IHIgLyAyNTUpLCAoZyA9IGcgLyAyNTUpLCAoYiA9IGIgLyAyNTUpO1xuICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgY29uc3QgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gIGxldCBoO1xuICBsZXQgcztcbiAgY29uc3QgdiA9IG1heDtcblxuICBjb25zdCBkID0gbWF4IC0gbWluO1xuICBzID0gbWF4ID09PSAwID8gMCA6IGQgLyBtYXg7XG5cbiAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgaCA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgY2FzZSByOlxuICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnOlxuICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgYjpcbiAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGggLz0gNjtcbiAgfVxuXG4gIHJldHVybiB7IGgsIHMsIHYgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBIU1YgY29sb3IgdmFsdWUgdG8gUkdCLiBDb252ZXJzaW9uIGZvcm11bGFcbiAqIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTVl9jb2xvcl9zcGFjZS5cbiAqIEFzc3VtZXMgaCwgcywgYW5kIHYgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAxXSBhbmRcbiAqIHJldHVybnMgciwgZywgYW5kIGIgaW4gdGhlIHNldCBbMCwgMjU1XS5cbiAqXG4gKiBAcGFyYW0gICBOdW1iZXIgIGggICAgICAgVGhlIGh1ZVxuICogQHBhcmFtICAgTnVtYmVyICBzICAgICAgIFRoZSBzYXR1cmF0aW9uXG4gKiBAcGFyYW0gICBOdW1iZXIgIHYgICAgICAgVGhlIHZhbHVlXG4gKiBAcmV0dXJuICBBcnJheSAgICAgICAgICAgVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICovXG5mdW5jdGlvbiBoc3ZUb1JnYih7IGgsIHMsIHYgfTogSFNWKTogUkdCIHtcbiAgbGV0IHIsIGcsIGI7XG5cbiAgY29uc3QgaSA9IE1hdGguZmxvb3IoaCAqIDYpO1xuICBjb25zdCBmID0gaCAqIDYgLSBpO1xuICBjb25zdCBwID0gdiAqICgxIC0gcyk7XG4gIGNvbnN0IHEgPSB2ICogKDEgLSBmICogcyk7XG4gIGNvbnN0IHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XG5cbiAgc3dpdGNoIChpICUgNikge1xuICAgIGNhc2UgMDpcbiAgICAgIChyID0gdiksIChnID0gdCksIChiID0gcCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6XG4gICAgICAociA9IHEpLCAoZyA9IHYpLCAoYiA9IHApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgKHIgPSBwKSwgKGcgPSB2KSwgKGIgPSB0KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIChyID0gcCksIChnID0gcSksIChiID0gdik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICAociA9IHQpLCAoZyA9IHApLCAoYiA9IHYpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA1OlxuICAgICAgKHIgPSB2KSwgKGcgPSBwKSwgKGIgPSBxKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByOiByICogMjU1LFxuICAgIGc6IGcgKiAyNTUsXG4gICAgYjogYiAqIDI1NSxcbiAgfTtcbn1cbiJdfQ==