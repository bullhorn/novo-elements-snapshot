/**
 * Copyright © 2022 Sasha Koss
 * https://www.npmjs.com/package/@date-fns/upgrade
 **/
const tokensMap = {
    // 'D MMMM': '',
    // 'Do MMMM': '',
    // 'DD MMMM': '',
    M: 'L',
    Mo: 'Mo',
    MM: 'LL',
    MMM: 'LLL',
    MMMM: 'LLLL',
    Q: 'q',
    Qo: 'qo',
    D: 'd',
    Do: 'do',
    DD: 'dd',
    DDD: 'D',
    DDDo: 'Do',
    DDDD: 'DDD',
    d: 'i',
    do: 'io',
    dd: 'iiiiii',
    ddd: 'iii',
    dddd: 'iiii',
    A: 'a',
    a: 'a',
    aa: 'aaaa',
    E: 'i',
    W: 'I',
    Wo: 'Io',
    WW: 'II',
    YY: 'yy',
    YYYY: 'yyyy',
    GG: 'RR',
    GGGG: 'RRRR',
    H: 'H',
    HH: 'HH',
    h: 'h',
    hh: 'hh',
    m: 'm',
    mm: 'mm',
    s: 's',
    ss: 'ss',
    S: 'S',
    SS: 'SS',
    SSS: 'SSS',
    Z: 'xxx',
    ZZ: 'xx',
    X: 't',
    x: 'T'
};
const v1tokens = Object.keys(tokensMap)
    .sort()
    .reverse();
const tokensRegExp = new RegExp('(\\[[^\\[]*\\])|(\\\\)?' + '(' + v1tokens.join('|') + '|.)', 'g');
export function convertTokens(format) {
    const tokensCaptures = format.match(tokensRegExp);
    if (tokensCaptures) {
        return tokensCaptures
            .reduce((acc, tokenString, index) => {
            const v2token = tokensMap[tokenString];
            if (!v2token) {
                const escapedCaptures = tokenString.match(/^\[(.+)\]$/);
                if (escapedCaptures) {
                    acc.textBuffer.push(escapedCaptures[1]);
                }
                else {
                    acc.textBuffer.push(tokenString);
                }
            }
            const endOfString = index === tokensCaptures.length - 1;
            if (acc.textBuffer.length && (v2token || endOfString)) {
                acc.formatBuffer.push(`'${acc.textBuffer.join('')}'`);
                acc.textBuffer = [];
            }
            if (v2token)
                acc.formatBuffer.push(v2token);
            return acc;
        }, { formatBuffer: [], textBuffer: [] })
            .formatBuffer.join('');
    }
    else {
        return format;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC10b2tlbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy91dGlscy9kYXRlL2NvbnZlcnQtdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7SUFHSTtBQU1KLE1BQU0sU0FBUyxHQUFjO0lBQzNCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLENBQUMsRUFBRSxHQUFHO0lBQ04sRUFBRSxFQUFFLElBQUk7SUFDUixFQUFFLEVBQUUsSUFBSTtJQUNSLEdBQUcsRUFBRSxLQUFLO0lBQ1YsSUFBSSxFQUFFLE1BQU07SUFDWixDQUFDLEVBQUUsR0FBRztJQUNOLEVBQUUsRUFBRSxJQUFJO0lBQ1IsQ0FBQyxFQUFFLEdBQUc7SUFDTixFQUFFLEVBQUUsSUFBSTtJQUNSLEVBQUUsRUFBRSxJQUFJO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixJQUFJLEVBQUUsSUFBSTtJQUNWLElBQUksRUFBRSxLQUFLO0lBQ1gsQ0FBQyxFQUFFLEdBQUc7SUFDTixFQUFFLEVBQUUsSUFBSTtJQUNSLEVBQUUsRUFBRSxRQUFRO0lBQ1osR0FBRyxFQUFFLEtBQUs7SUFDVixJQUFJLEVBQUUsTUFBTTtJQUNaLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixFQUFFLEVBQUUsTUFBTTtJQUNWLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixFQUFFLEVBQUUsSUFBSTtJQUNSLEVBQUUsRUFBRSxJQUFJO0lBQ1IsRUFBRSxFQUFFLElBQUk7SUFDUixJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxJQUFJO0lBQ1IsSUFBSSxFQUFFLE1BQU07SUFDWixDQUFDLEVBQUUsR0FBRztJQUNOLEVBQUUsRUFBRSxJQUFJO0lBQ1IsQ0FBQyxFQUFFLEdBQUc7SUFDTixFQUFFLEVBQUUsSUFBSTtJQUNSLENBQUMsRUFBRSxHQUFHO0lBQ04sRUFBRSxFQUFFLElBQUk7SUFDUixDQUFDLEVBQUUsR0FBRztJQUNOLEVBQUUsRUFBRSxJQUFJO0lBQ1IsQ0FBQyxFQUFFLEdBQUc7SUFDTixFQUFFLEVBQUUsSUFBSTtJQUNSLEdBQUcsRUFBRSxLQUFLO0lBQ1YsQ0FBQyxFQUFFLEtBQUs7SUFDUixFQUFFLEVBQUUsSUFBSTtJQUNSLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7Q0FDUCxDQUFBO0FBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDcEMsSUFBSSxFQUFFO0tBQ04sT0FBTyxFQUFFLENBQUE7QUFFWixNQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FDN0IseUJBQXlCLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUM1RCxHQUFHLENBQ0osQ0FBQTtBQU9ELE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBYztJQUMxQyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2pELElBQUksY0FBYyxFQUFFLENBQUM7UUFDbkIsT0FBTyxjQUFjO2FBQ2xCLE1BQU0sQ0FDTCxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDMUIsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBRXRDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDYixNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUN2RCxJQUFJLGVBQWUsRUFBRSxDQUFDO29CQUNwQixHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDekMsQ0FBQztxQkFBTSxDQUFDO29CQUNOLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUNsQyxDQUFDO1lBQ0gsQ0FBQztZQUVELE1BQU0sV0FBVyxHQUFHLEtBQUssS0FBSyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUN2RCxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RELEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNyRCxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtZQUNyQixDQUFDO1lBRUQsSUFBSSxPQUFPO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRTNDLE9BQU8sR0FBRyxDQUFBO1FBQ1osQ0FBQyxFQUNELEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFrQixDQUNyRDthQUNBLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDMUIsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLE1BQU0sQ0FBQTtJQUNmLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFxuICogQ29weXJpZ2h0IMKpIDIwMjIgU2FzaGEgS29zc1xuICogaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvQGRhdGUtZm5zL3VwZ3JhZGVcbiAqKi9cblxudHlwZSBUb2tlbnNNYXAgPSB7XG4gIFt2MXRva2VuOiBzdHJpbmddOiBzdHJpbmdcbn1cblxuY29uc3QgdG9rZW5zTWFwOiBUb2tlbnNNYXAgPSB7XG4gIC8vICdEIE1NTU0nOiAnJyxcbiAgLy8gJ0RvIE1NTU0nOiAnJyxcbiAgLy8gJ0REIE1NTU0nOiAnJyxcbiAgTTogJ0wnLFxuICBNbzogJ01vJyxcbiAgTU06ICdMTCcsXG4gIE1NTTogJ0xMTCcsXG4gIE1NTU06ICdMTExMJyxcbiAgUTogJ3EnLFxuICBRbzogJ3FvJyxcbiAgRDogJ2QnLFxuICBEbzogJ2RvJyxcbiAgREQ6ICdkZCcsXG4gIERERDogJ0QnLFxuICBERERvOiAnRG8nLFxuICBEREREOiAnREREJyxcbiAgZDogJ2knLFxuICBkbzogJ2lvJyxcbiAgZGQ6ICdpaWlpaWknLFxuICBkZGQ6ICdpaWknLFxuICBkZGRkOiAnaWlpaScsXG4gIEE6ICdhJyxcbiAgYTogJ2EnLFxuICBhYTogJ2FhYWEnLFxuICBFOiAnaScsXG4gIFc6ICdJJyxcbiAgV286ICdJbycsXG4gIFdXOiAnSUknLFxuICBZWTogJ3l5JyxcbiAgWVlZWTogJ3l5eXknLFxuICBHRzogJ1JSJyxcbiAgR0dHRzogJ1JSUlInLFxuICBIOiAnSCcsXG4gIEhIOiAnSEgnLFxuICBoOiAnaCcsXG4gIGhoOiAnaGgnLFxuICBtOiAnbScsXG4gIG1tOiAnbW0nLFxuICBzOiAncycsXG4gIHNzOiAnc3MnLFxuICBTOiAnUycsXG4gIFNTOiAnU1MnLFxuICBTU1M6ICdTU1MnLFxuICBaOiAneHh4JyxcbiAgWlo6ICd4eCcsXG4gIFg6ICd0JyxcbiAgeDogJ1QnXG59XG5cbmNvbnN0IHYxdG9rZW5zID0gT2JqZWN0LmtleXModG9rZW5zTWFwKVxuICAuc29ydCgpXG4gIC5yZXZlcnNlKClcblxuY29uc3QgdG9rZW5zUmVnRXhwID0gbmV3IFJlZ0V4cChcbiAgJyhcXFxcW1teXFxcXFtdKlxcXFxdKXwoXFxcXFxcXFwpPycgKyAnKCcgKyB2MXRva2Vucy5qb2luKCd8JykgKyAnfC4pJyxcbiAgJ2cnXG4pXG5cbnR5cGUgVG9rZW5zQnVmZmVyID0ge1xuICBmb3JtYXRCdWZmZXI6IHN0cmluZ1tdXG4gIHRleHRCdWZmZXI6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9rZW5zKGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdG9rZW5zQ2FwdHVyZXMgPSBmb3JtYXQubWF0Y2godG9rZW5zUmVnRXhwKVxuICBpZiAodG9rZW5zQ2FwdHVyZXMpIHtcbiAgICByZXR1cm4gdG9rZW5zQ2FwdHVyZXNcbiAgICAgIC5yZWR1Y2UoXG4gICAgICAgIChhY2MsIHRva2VuU3RyaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHYydG9rZW4gPSB0b2tlbnNNYXBbdG9rZW5TdHJpbmddXG5cbiAgICAgICAgICBpZiAoIXYydG9rZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGVzY2FwZWRDYXB0dXJlcyA9IHRva2VuU3RyaW5nLm1hdGNoKC9eXFxbKC4rKVxcXSQvKVxuICAgICAgICAgICAgaWYgKGVzY2FwZWRDYXB0dXJlcykge1xuICAgICAgICAgICAgICBhY2MudGV4dEJ1ZmZlci5wdXNoKGVzY2FwZWRDYXB0dXJlc1sxXSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFjYy50ZXh0QnVmZmVyLnB1c2godG9rZW5TdHJpbmcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZW5kT2ZTdHJpbmcgPSBpbmRleCA9PT0gdG9rZW5zQ2FwdHVyZXMubGVuZ3RoIC0gMVxuICAgICAgICAgIGlmIChhY2MudGV4dEJ1ZmZlci5sZW5ndGggJiYgKHYydG9rZW4gfHwgZW5kT2ZTdHJpbmcpKSB7XG4gICAgICAgICAgICBhY2MuZm9ybWF0QnVmZmVyLnB1c2goYCcke2FjYy50ZXh0QnVmZmVyLmpvaW4oJycpfSdgKVxuICAgICAgICAgICAgYWNjLnRleHRCdWZmZXIgPSBbXVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2MnRva2VuKSBhY2MuZm9ybWF0QnVmZmVyLnB1c2godjJ0b2tlbilcblxuICAgICAgICAgIHJldHVybiBhY2NcbiAgICAgICAgfSxcbiAgICAgICAgeyBmb3JtYXRCdWZmZXI6IFtdLCB0ZXh0QnVmZmVyOiBbXSB9IGFzIFRva2Vuc0J1ZmZlclxuICAgICAgKVxuICAgICAgLmZvcm1hdEJ1ZmZlci5qb2luKCcnKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmb3JtYXRcbiAgfVxufSJdfQ==