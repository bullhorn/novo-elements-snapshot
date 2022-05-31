// NG2
import { Injectable, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
// Rule storage - pluralize and singularize need to be run sequentially,
// while other rules can be optimized using an object for instant lookups.
const pluralRules = [];
const singularRules = [];
const uncountables = {};
const irregularPlurals = {};
const irregularSingles = {};
/**
 * Title case a string.
 */
function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}
/**
 * Sanitize a pluralization rule to a usable regular expression.
 */
function sanitizeRule(rule) {
    if (typeof rule === 'string') {
        return new RegExp('^' + rule + '$', 'i');
    }
    return rule;
}
/**
 * Pass in a word token to produce a function that can replicate the case on
 * another word.
 */
function restoreCase(word, token) {
    // Upper cased words. E.g. "HELLO".
    if (word === word.toUpperCase()) {
        return token.toUpperCase();
    }
    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
        return toTitleCase(token);
    }
    // Lower cased words. E.g. "test".
    return token.toLowerCase();
}
/**
 * Interpolate a regexp string.
 */
function interpolate(str, args) {
    return str.replace(/\$(\d{1,2})/g, (match, index) => {
        return args[index] || '';
    });
}
/**
 * Sanitize a word by passing in the word and sanitization rules.
 */
function sanitizeWord(token, word, collection) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
        return word;
    }
    let len = collection.length;
    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
        const rule = collection[len];
        // If the rule passes, return the replacement.
        if (rule[0].test(word)) {
            return word.replace(rule[0], (match, index, words) => {
                const result = interpolate(rule[1], [match, index, words]);
                if (match === '') {
                    return restoreCase(words[index - 1], result);
                }
                return restoreCase(match, result);
            });
        }
    }
    return word;
}
/**
 * Replace a word with the updated word.
 */
function replaceWord(replaceMap, keepMap, rules) {
    return (word) => {
        // Get the correct token and case restoration functions.
        const token = word.toLowerCase();
        // Check against the keep object map.
        if (keepMap.hasOwnProperty(token)) {
            return restoreCase(word, token);
        }
        // Check against the replacement map for a direct word replacement.
        if (replaceMap.hasOwnProperty(token)) {
            return restoreCase(word, replaceMap[token]);
        }
        // Run all the rules against the word.
        return sanitizeWord(token, word, rules);
    };
}
class Pluralize {
    static pluralize(word, count = 1, inclusive) {
        const pluralized = count === 1 ? Pluralize.singular(word) : Pluralize.plural(word);
        return (inclusive ? `${count} ` : '') + pluralized;
    }
    static singular(word) {
        return replaceWord(irregularSingles, irregularPlurals, pluralRules)(word);
    }
    static plural(word) {
        return replaceWord(irregularPlurals, irregularSingles, singularRules)(word);
    }
    static addPluralRule(rule, replacement) {
        pluralRules.push([sanitizeRule(rule), replacement]);
    }
    static addSingularRule(rule, replacement) {
        singularRules.push([sanitizeRule(rule), replacement]);
    }
    static addUncountableRule(word) {
        if (typeof word === 'string') {
            uncountables[word.toLowerCase()] = true;
            return;
        }
        // Set singular and plural references for the word.
        Pluralize.addPluralRule(word, '$0');
        Pluralize.addSingularRule(word, '$0');
    }
    static addIrregularRule(single, plural) {
        const one = plural.toLowerCase();
        const many = single.toLowerCase();
        irregularSingles[one] = many;
        irregularPlurals[many] = one;
    }
}
/**
 * Irregular rules.
 */
[
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['thief', 'thieves'],
    ['genie', 'genies'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies'],
].forEach((rule) => {
    return Pluralize.addIrregularRule(rule[0], rule[1]);
});
/**
 * Pluralization rules.
 */
[
    [/s?$/i, 's'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you'],
].forEach((rule) => {
    return Pluralize.addPluralRule(rule[0], rule[1]);
});
/**
 * Singularization rules.
 */
[
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(?:sis|ses)$/i, '$1sis'],
    [/(^analy)(?:sis|ses)$/i, '$1sis'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/([^aeiouy]|qu)ies$/i, '$1y'],
    [/(^[pl]|zomb|^(?:neck)?t|[aeo][lt]|cut)ies$/i, '$1ie'],
    [/(\b(?:mon|smil))ies$/i, '$1ey'],
    [/(m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
    [/(e[mn]u)s?$/i, '$1'],
    [/(movie|twelve)s$/i, '$1'],
    [/(cris|test|diagnos)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man'],
].forEach((rule) => {
    return Pluralize.addSingularRule(rule[0], rule[1]);
});
/**
 * Uncountable rules.
 */
[
    // Singular words with no plurals.
    'advice',
    'adulthood',
    'agenda',
    'aid',
    'alcohol',
    'ammo',
    'athletics',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'commerce',
    'cod',
    'cooperation',
    'corps',
    'digestion',
    'debris',
    'diabetes',
    'energy',
    'equipment',
    'elk',
    'excretion',
    'expertise',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'media',
    'mews',
    'moose',
    'music',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'trout',
    'traffic',
    'transporation',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    // Regexes.
    /pox$/i,
    /ois$/i,
    /deer$/i,
    /fish$/i,
    /sheep$/i,
    /measles$/i,
    /[^aeiou]ese$/i, // "chinese", "japanese"
].forEach(Pluralize.addUncountableRule);
export class PluralPipe {
    transform(value) {
        return Pluralize.pluralize(value);
    }
}
PluralPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PluralPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
PluralPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PluralPipe, name: "plural" });
PluralPipe.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PluralPipe });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PluralPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'plural' }]
        }, {
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1cmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvcGlwZXMvcGx1cmFsL1BsdXJhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUVoRSx3RUFBd0U7QUFDeEUsMEVBQTBFO0FBQzFFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN2QixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBRTVCOztHQUVHO0FBQ0gsU0FBUyxXQUFXLENBQUMsR0FBVztJQUM5QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuRSxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFlBQVksQ0FBQyxJQUFxQjtJQUN6QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBWSxFQUFFLEtBQWE7SUFDOUMsbUNBQW1DO0lBQ25DLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUMvQixPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUM1QjtJQUVELG1DQUFtQztJ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VCxlQUFlO0lBQ2YsTUFBTTtJQUNOLFFBQVE7SUFDUixTQUFTO0lBQ1QsU0FBUztJQUNULFlBQVk7SUFDWixVQUFVO0lBQ1YsS0FBSztJQUNMLFdBQVc7SUFDWCxPQUFPO0lBQ1AsT0FBTztJQUNQLFFBQVE7SUFDUixRQUFRO0lBQ1IsU0FBUztJQUNULFdBQVc7SUFDWCxlQUFlLEVBQUUsd0JBQXdCO0NBQzFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBSXhDLE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFNBQVMsQ0FBQyxLQUFLO1FBQ2IsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O3VHQUhVLFVBQVU7cUdBQVYsVUFBVTsyR0FBVixVQUFVOzJGQUFWLFVBQVU7a0JBRnRCLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFOztrQkFDdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBSdWxlIHN0b3JhZ2UgLSBwbHVyYWxpemUgYW5kIHNpbmd1bGFyaXplIG5lZWQgdG8gYmUgcnVuIHNlcXVlbnRpYWxseSxcbi8vIHdoaWxlIG90aGVyIHJ1bGVzIGNhbiBiZSBvcHRpbWl6ZWQgdXNpbmcgYW4gb2JqZWN0IGZvciBpbnN0YW50IGxvb2t1cHMuXG5jb25zdCBwbHVyYWxSdWxlcyA9IFtdO1xuY29uc3Qgc2luZ3VsYXJSdWxlcyA9IFtdO1xuY29uc3QgdW5jb3VudGFibGVzID0ge307XG5jb25zdCBpcnJlZ3VsYXJQbHVyYWxzID0ge307XG5jb25zdCBpcnJlZ3VsYXJTaW5nbGVzID0ge307XG5cbi8qKlxuICogVGl0bGUgY2FzZSBhIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gdG9UaXRsZUNhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgcGx1cmFsaXphdGlvbiBydWxlIHRvIGEgdXNhYmxlIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVSdWxlKHJ1bGU6IFJlZ0V4cCB8IHN0cmluZyk6IFJlZ0V4cCB7XG4gIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBydWxlICsgJyQnLCAnaScpO1xuICB9XG4gIHJldHVybiBydWxlO1xufVxuXG4vKipcbiAqIFBhc3MgaW4gYSB3b3JkIHRva2VuIHRvIHByb2R1Y2UgYSBmdW5jdGlvbiB0aGF0IGNhbiByZXBsaWNhdGUgdGhlIGNhc2Ugb25cbiAqIGFub3RoZXIgd29yZC5cbiAqL1xuZnVuY3Rpb24gcmVzdG9yZUNhc2Uod29yZDogc3RyaW5nLCB0b2tlbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gVXBwZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJIRUxMT1wiLlxuICBpZiAod29yZCA9PT0gd29yZC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgcmV0dXJuIHRva2VuLnRvVXBwZXJDYXNlKCk7XG4gIH1cblxuICAvLyBUaXRsZSBjYXNlZCB3b3Jkcy4gRS5nLiBcIlRpdGxlXCIuXG4gIGlmICh3b3JkWzBdID09PSB3b3JkWzBdLnRvVXBwZXJDYXNlKCkpIHtcbiAgICByZXR1cm4gdG9UaXRsZUNhc2UodG9rZW4pO1xuICB9XG5cbiAgLy8gTG93ZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJ0ZXN0XCIuXG4gIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiAqIEludGVycG9sYXRlIGEgcmVnZXhwIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gaW50ZXJwb2xhdGUoc3RyOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXCQoXFxkezEsMn0pL2csIChtYXRjaCwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gYXJnc1tpbmRleF0gfHwgJyc7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNhbml0aXplIGEgd29yZCBieSBwYXNzaW5nIGluIHRoZSB3b3JkIGFuZCBzYW5pdGl6YXRpb24gcnVsZXMuXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplV29yZCh0b2tlbjogc3RyaW5nLCB3b3JkOiBzdHJpbmcsIGNvbGxlY3Rpb246IFJlZ0V4cFtdKTogc3RyaW5nIHtcbiAgLy8gRW1wdHkgc3RyaW5nIG9yIGRvZXNuJ3QgbmVlZCBmaXhpbmcuXG4gIGlmICghdG9rZW4ubGVuZ3RoIHx8IHVuY291bnRhYmxlcy5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICByZXR1cm4gd29yZDtcbiAgfVxuXG4gIGxldCBsZW4gPSBjb2xsZWN0aW9uLmxlbmd0aDtcbiAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBzYW5pdGl6YXRpb24gcnVsZXMgYW5kIHVzZSB0aGUgZmlyc3Qgb25lIHRvIG1hdGNoLlxuICB3aGlsZSAobGVuLS0pIHtcbiAgICBjb25zdCBydWxlID0gY29sbGVjdGlvbltsZW5dO1xuICAgIC8vIElmIHRoZSBydWxlIHBhc3NlcywgcmV0dXJuIHRoZSByZXBsYWNlbWVudC5cbiAgICBpZiAocnVsZVswXS50ZXN0KHdvcmQpKSB7XG4gICAgICByZXR1cm4gd29yZC5yZXBsYWNlKHJ1bGVbMF0sIChtYXRjaCwgaW5kZXgsIHdvcmRzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGludGVycG9sYXRlKHJ1bGVbMV0sIFttYXRjaCwgaW5kZXgsIHdvcmRzXSk7XG4gICAgICAgIGlmIChtYXRjaCA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZHNbaW5kZXggLSAxXSwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2UobWF0Y2gsIHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdvcmQ7XG59XG5cbi8qKlxuICogUmVwbGFjZSBhIHdvcmQgd2l0aCB0aGUgdXBkYXRlZCB3b3JkLlxuICovXG5mdW5jdGlvbiByZXBsYWNlV29yZChyZXBsYWNlTWFwOiBhbnksIGtlZXBNYXA6IGFueSwgcnVsZXM6IGFueVtdKTogRnVuY3Rpb24ge1xuICByZXR1cm4gKHdvcmQpID0+IHtcbiAgICAvLyBHZXQgdGhlIGNvcnJlY3QgdG9rZW4gYW5kIGNhc2UgcmVzdG9yYXRpb24gZnVuY3Rpb25zLlxuICAgIGNvbnN0IHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUga2VlcCBvYmplY3QgbWFwLlxuICAgIGlmIChrZWVwTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmQsIHRva2VuKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBhZ2FpbnN0IHRoZSByZXBsYWNlbWVudCBtYXAgZm9yIGEgZGlyZWN0IHdvcmQgcmVwbGFjZW1lbnQuXG4gICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZCwgcmVwbGFjZU1hcFt0b2tlbl0pO1xuICAgIH1cblxuICAgIC8vIFJ1biBhbGwgdGhlIHJ1bGVzIGFnYWluc3QgdGhlIHdvcmQuXG4gICAgcmV0dXJuIHNhbml0aXplV29yZCh0b2tlbiwgd29yZCwgcnVsZXMpO1xuICB9O1xufVxuXG5jbGFzcyBQbHVyYWxpemUge1xuICBzdGF0aWMgcGx1cmFsaXplKHdvcmQsIGNvdW50ID0gMSwgaW5jbHVzaXZlPykge1xuICAgIGNvbnN0IHBsdXJhbGl6ZWQgPSBjb3VudCA9PT0gMSA/IFBsdXJhbGl6ZS5zaW5ndWxhcih3b3JkKSA6IFBsdXJhbGl6ZS5wbHVyYWwod29yZCk7XG4gICAgcmV0dXJuIChpbmNsdXNpdmUgPyBgJHtjb3VudH0gYCA6ICcnKSArIHBsdXJhbGl6ZWQ7XG4gIH1cblxuICBzdGF0aWMgc2luZ3VsYXIod29yZCkge1xuICAgIHJldHVybiByZXBsYWNlV29yZChpcnJlZ3VsYXJTaW5nbGVzLCBpcnJlZ3VsYXJQbHVyYWxzLCBwbHVyYWxSdWxlcykod29yZCk7XG4gIH1cblxuICBzdGF0aWMgcGx1cmFsKHdvcmQpIHtcbiAgICByZXR1cm4gcmVwbGFjZVdvcmQoaXJyZWd1bGFyUGx1cmFscywgaXJyZWd1bGFyU2luZ2xlcywgc2luZ3VsYXJSdWxlcykod29yZCk7XG4gIH1cblxuICBzdGF0aWMgYWRkUGx1cmFsUnVsZShydWxlLCByZXBsYWNlbWVudCkge1xuICAgIHBsdXJhbFJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRTaW5ndWxhclJ1bGUocnVsZSwgcmVwbGFjZW1lbnQpIHtcbiAgICBzaW5ndWxhclJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRVbmNvdW50YWJsZVJ1bGUod29yZCkge1xuICAgIGlmICh0eXBlb2Ygd29yZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVuY291bnRhYmxlc1t3b3JkLnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTZXQgc2luZ3VsYXIgYW5kIHBsdXJhbCByZWZlcmVuY2VzIGZvciB0aGUgd29yZC5cbiAgICBQbHVyYWxpemUuYWRkUGx1cmFsUnVsZSh3b3JkLCAnJDAnKTtcbiAgICBQbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHdvcmQsICckMCcpO1xuICB9XG5cbiAgc3RhdGljIGFkZElycmVndWxhclJ1bGUoc2luZ2xlLCBwbHVyYWwpIHtcbiAgICBjb25zdCBvbmUgPSBwbHVyYWwudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBtYW55ID0gc2luZ2xlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpcnJlZ3VsYXJTaW5nbGVzW29uZV0gPSBtYW55O1xuICAgIGlycmVndWxhclBsdXJhbHNbbWFueV0gPSBvbmU7XG4gIH1cbn1cblxuLyoqXG4gKiBJcnJlZ3VsYXIgcnVsZXMuXG4gKi9cbltcbiAgLy8gUHJvbm91bnMuXG4gIFsnSScsICd3ZSddLFxuICBbJ21lJywgJ3VzJ10sXG4gIFsnaGUnLCAndGhleSddLFxuICBbJ3NoZScsICd0aGV5J10sXG4gIFsndGhlbScsICd0aGVtJ10sXG4gIFsnbXlzZWxmJywgJ291cnNlbHZlcyddLFxuICBbJ3lvdXJzZWxmJywgJ3lvdXJzZWx2ZXMnXSxcbiAgWydpdHNlbGYnLCAndGhlbXNlbHZlcyddLFxuICBbJ2hlcnNlbGYnLCAndGhlbXNlbHZlcyddLFxuICBbJ2hpbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICBbJ3RoZW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgWydpcycsICdhcmUnXSxcbiAgWyd0aGlzJywgJ3RoZXNlJ10sXG4gIFsndGhhdCcsICd0aG9zZSddLFxuICAvLyBXb3JkcyBlbmRpbmcgaW4gd2l0aCBhIGNvbnNvbmFudCBhbmQgYG9gLlxuICBbJ2VjaG8nLCAnZWNob2VzJ10sXG4gIFsnZGluZ28nLCAnZGluZ29lcyddLFxuICBbJ3ZvbGNhbm8nLCAndm9sY2Fub2VzJ10sXG4gIFsndG9ybmFkbycsICd0b3JuYWRvZXMnXSxcbiAgWyd0b3JwZWRvJywgJ3RvcnBlZG9lcyddLFxuICAvLyBFbmRzIHdpdGggYHVzYC5cbiAgWydnZW51cycsICdnZW5lcmEnXSxcbiAgWyd2aXNjdXMnLCAndmlzY2VyYSddLFxuICAvLyBFbmRzIHdpdGggYG1hYC5cbiAgWydzdGlnbWEnLCAnc3RpZ21hdGEnXSxcbiAgWydzdG9tYScsICdzdG9tYXRhJ10sXG4gIFsnZG9nbWEnLCAnZG9nbWF0YSddLFxuICBbJ2xlbW1hJywgJ2xlbW1hdGEnXSxcbiAgWydzY2hlbWEnLCAnc2NoZW1hdGEnXSxcbiAgWydhbmF0aGVtYScsICdhbmF0aGVtYXRhJ10sXG4gIC8vIE90aGVyIGlycmVndWxhciBydWxlcy5cbiAgWydveCcsICdveGVuJ10sXG4gIFsnYXhlJywgJ2F4ZXMnXSxcbiAgWydkaWUnLCAnZGljZSddLFxuICBbJ3llcycsICd5ZXNlcyddLFxuICBbJ2Zvb3QnLCAnZmVldCddLFxuICBbJ2VhdmUnLCAnZWF2ZXMnXSxcbiAgWydnb29zZScsICdnZWVzZSddLFxuICBbJ3Rvb3RoJywgJ3RlZXRoJ10sXG4gIFsncXVpeicsICdxdWl6emVzJ10sXG4gIFsnaHVtYW4nLCAnaHVtYW5zJ10sXG4gIFsncHJvb2YnLCAncHJvb2ZzJ10sXG4gIFsnY2FydmUnLCAnY2FydmVzJ10sXG4gIFsndmFsdmUnLCAndmFsdmVzJ10sXG4gIFsndGhpZWYnLCAndGhpZXZlcyddLFxuICBbJ2dlbmllJywgJ2dlbmllcyddLFxuICBbJ2dyb292ZScsICdncm9vdmVzJ10sXG4gIFsncGlja2F4ZScsICdwaWNrYXhlcyddLFxuICBbJ3doaXNrZXknLCAnd2hpc2tpZXMnXSxcbl0uZm9yRWFjaCgocnVsZSkgPT4ge1xuICByZXR1cm4gUGx1cmFsaXplLmFkZElycmVndWxhclJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG59KTtcblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIHJ1bGVzLlxuICovXG5bXG4gIFsvcz8kL2ksICdzJ10sXG4gIFsvKFteYWVpb3VdZXNlKSQvaSwgJyQxJ10sXG4gIFsvKGF4fHRlc3QpaXMkL2ksICckMWVzJ10sXG4gIFsvKGFsaWFzfFteYW91XXVzfHRsYXN8Z2FzfHJpcykkL2ksICckMWVzJ10sXG4gIFsvKGVbbW5ddSlzPyQvaSwgJyQxcyddLFxuICBbLyhbXmxdaWFzfFthZWlvdV1sYXN8W2VtanpyXWFzfFtpdV1hbSkkL2ksICckMSddLFxuICBbLyhhbHVtbnxzeWxsYWJ8b2N0b3B8dmlyfHJhZGl8bnVjbGV8ZnVuZ3xjYWN0fHN0aW11bHx0ZXJtaW58YmFjaWxsfGZvY3x1dGVyfGxvY3xzdHJhdCkoPzp1c3xpKSQvaSwgJyQxaSddLFxuICBbLyhhbHVtbnxhbGd8dmVydGVicikoPzphfGFlKSQvaSwgJyQxYWUnXSxcbiAgWy8oc2VyYXBofGNoZXJ1YikoPzppbSk/JC9pLCAnJDFpbSddLFxuICBbLyhoZXJ8YXR8Z3IpbyQvaSwgJyQxb2VzJ10sXG4gIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfGF1dG9tYXR8cXVvcikoPzphfHVtKSQvaSwgJyQxYSddLFxuICBbLyhhcGhlbGl8aHlwZXJiYXR8cGVyaWhlbGl8YXN5bmRldHxub3VtZW58cGhlbm9tZW58Y3JpdGVyaXxvcmdhbnxwcm9sZWdvbWVufGhlZHJ8YXV0b21hdCkoPzphfG9uKSQvaSwgJyQxYSddLFxuICBbL3NpcyQvaSwgJ3NlcyddLFxuICBbLyg/Oihrbml8d2l8bGkpZmV8KGFyfGx8ZWF8ZW98b2F8aG9vKWYpJC9pLCAnJDEkMnZlcyddLFxuICBbLyhbXmFlaW91eV18cXUpeSQvaSwgJyQxaWVzJ10sXG4gIFsvKFteY2hdW2llb11bbG5dKWV5JC9pLCAnJDFpZXMnXSxcbiAgWy8oeHxjaHxzc3xzaHx6eikkL2ksICckMWVzJ10sXG4gIFsvKG1hdHJ8Y29kfG11cnxzaWx8dmVydHxpbmR8YXBwZW5kKSg/Oml4fGV4KSQvaSwgJyQxaWNlcyddLFxuICBbLyhtfGwpKD86aWNlfG91c2UpJC9pLCAnJDFpY2UnXSxcbiAgWy8ocGUpKD86cnNvbnxvcGxlKSQvaSwgJyQxb3BsZSddLFxuICBbLyhjaGlsZCkoPzpyZW4pPyQvaSwgJyQxcmVuJ10sXG4gIFsvZWF1eCQvaSwgJyQwJ10sXG4gIFsvbVthZV1uJC9pLCAnbWVuJ10sXG4gIFsndGhvdScsICd5b3UnXSxcbl0uZm9yRWFjaCgocnVsZSkgPT4ge1xuICByZXR1cm4gUGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG59KTtcblxuLyoqXG4gKiBTaW5ndWxhcml6YXRpb24gcnVsZXMuXG4gKi9cbltcbiAgWy9zJC9pLCAnJ10sXG4gIFsvKHNzKSQvaSwgJyQxJ10sXG4gIFsvKChhKW5hbHl8KGIpYXwoZClpYWdub3wocClhcmVudGhlfChwKXJvZ25vfChzKXlub3B8KHQpaGUpKD86c2lzfHNlcykkL2ksICckMXNpcyddLFxuICBbLyheYW5hbHkpKD86c2lzfHNlcykkL2ksICckMXNpcyddLFxuICBbLyh3aXxrbml8KD86YWZ0ZXJ8aGFsZnxoaWdofGxvd3xtaWR8bm9ufG5pZ2h0fFteXFx3XXxeKWxpKXZlcyQvaSwgJyQxZmUnXSxcbiAgWy8oYXJ8KD86d298W2FlXSlsfFtlb11bYW9dKXZlcyQvaSwgJyQxZiddLFxuICBbLyhbXmFlaW91eV18cXUpaWVzJC9pLCAnJDF5J10sXG4gIFsvKF5bcGxdfHpvbWJ8Xig/Om5lY2spP3R8W2Flb11bbHRdfGN1dClpZXMkL2ksICckMWllJ10sXG4gIFsvKFxcYig/Om1vbnxzbWlsKSlpZXMkL2ksICckMWV5J10sXG4gIFsvKG18bClpY2UkL2ksICckMW91c2UnXSxcbiAgWy8oc2VyYXBofGNoZXJ1YilpbSQvaSwgJyQxJ10sXG4gIFsvKHh8Y2h8c3N8c2h8enp8dHRvfGdvfGNob3xhbGlhc3xbXmFvdV11c3x0bGFzfGdhc3woPzpoZXJ8YXR8Z3Ipb3xyaXMpKD86ZXMpPyQvaSwgJyQxJ10sXG4gIFsvKGVbbW5ddSlzPyQvaSwgJyQxJ10sXG4gIFsvKG1vdmllfHR3ZWx2ZSlzJC9pLCAnJDEnXSxcbiAgWy8oY3Jpc3x0ZXN0fGRpYWdub3MpKD86aXN8ZXMpJC9pLCAnJDFpcyddLFxuICBbLyhhbHVtbnxzeWxsYWJ8b2N0b3B8dmlyfHJhZGl8bnVjbGV8ZnVuZ3xjYWN0fHN0aW11bHx0ZXJtaW58YmFjaWxsfGZvY3x1dGVyfGxvY3xzdHJhdCkoPzp1c3xpKSQvaSwgJyQxdXMnXSxcbiAgWy8oYWdlbmR8YWRkZW5kfG1pbGxlbm5pfGRhdHxleHRyZW18YmFjdGVyaXxkZXNpZGVyYXR8c3RyYXR8Y2FuZGVsYWJyfGVycmF0fG92fHN5bXBvc2l8Y3VycmljdWx8cXVvcilhJC9pLCAnJDF1bSddLFxuICBbLyhhcGhlbGl8aHlwZXJiYXR8cGVyaWhlbGl8YXN5bmRldHxub3VtZW58cGhlbm9tZW58Y3JpdGVyaXxvcmdhbnxwcm9sZWdvbWVufGhlZHJ8YXV0b21hdClhJC9pLCAnJDFvbiddLFxuICBbLyhhbHVtbnxhbGd8dmVydGVicilhZSQvaSwgJyQxYSddLFxuICBbLyhjb2R8bXVyfHNpbHx2ZXJ0fGluZClpY2VzJC9pLCAnJDFleCddLFxuICBbLyhtYXRyfGFwcGVuZClpY2VzJC9pLCAnJDFpeCddLFxuICBbLyhwZSkocnNvbnxvcGxlKSQvaSwgJyQxcnNvbiddLFxuICBbLyhjaGlsZClyZW4kL2ksICckMSddLFxuICBbLyhlYXUpeD8kL2ksICckMSddLFxuICBbL21lbiQvaSwgJ21hbiddLFxuXS5mb3JFYWNoKChydWxlKSA9PiB7XG4gIHJldHVybiBQbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xufSk7XG5cbi8qKlxuICogVW5jb3VudGFibGUgcnVsZXMuXG4gKi9cbltcbiAgLy8gU2luZ3VsYXIgd29yZHMgd2l0aCBubyBwbHVyYWxzLlxuICAnYWR2aWNlJyxcbiAgJ2FkdWx0aG9vZCcsXG4gICdhZ2VuZGEnLFxuICAnYWlkJyxcbiAgJ2FsY29ob2wnLFxuICAnYW1tbycsXG4gICdhdGhsZXRpY3MnLFxuICAnYmlzb24nLFxuICAnYmxvb2QnLFxuICAnYnJlYW0nLFxuICAnYnVmZmFsbycsXG4gICdidXR0ZXInLFxuICAnY2FycCcsXG4gICdjYXNoJyxcbiAgJ2NoYXNzaXMnLFxuICAnY2hlc3MnLFxuICAnY2xvdGhpbmcnLFxuICAnY29tbWVyY2UnLFxuICAnY29kJyxcbiAgJ2Nvb3BlcmF0aW9uJyxcbiAgJ2NvcnBzJyxcbiAgJ2RpZ2VzdGlvbicsXG4gICdkZWJyaXMnLFxuICAnZGlhYmV0ZXMnLFxuICAnZW5lcmd5JyxcbiAgJ2VxdWlwbWVudCcsXG4gICdlbGsnLFxuICAnZXhjcmV0aW9uJyxcbiAgJ2V4cGVydGlzZScsXG4gICdmbG91bmRlcicsXG4gICdmdW4nLFxuICAnZ2FsbG93cycsXG4gICdnYXJiYWdlJyxcbiAgJ2dyYWZmaXRpJyxcbiAgJ2hlYWRxdWFydGVycycsXG4gICdoZWFsdGgnLFxuICAnaGVycGVzJyxcbiAgJ2hpZ2hqaW5rcycsXG4gICdob21ld29yaycsXG4gICdob3VzZXdvcmsnLFxuICAnaW5mb3JtYXRpb24nLFxuICAnamVhbnMnLFxuICAnanVzdGljZScsXG4gICdrdWRvcycsXG4gICdsYWJvdXInLFxuICAnbGl0ZXJhdHVyZScsXG4gICdtYWNoaW5lcnknLFxuICAnbWFja2VyZWwnLFxuICAnbWVkaWEnLFxuICAnbWV3cycsXG4gICdtb29zZScsXG4gICdtdXNpYycsXG4gICduZXdzJyxcbiAgJ3Bpa2UnLFxuICAncGxhbmt0b24nLFxuICAncGxpZXJzJyxcbiAgJ3BvbGx1dGlvbicsXG4gICdwcmVtaXNlcycsXG4gICdyYWluJyxcbiAgJ3Jlc2VhcmNoJyxcbiAgJ3JpY2UnLFxuICAnc2FsbW9uJyxcbiAgJ3NjaXNzb3JzJyxcbiAgJ3NlcmllcycsXG4gICdzZXdhZ2UnLFxuICAnc2hhbWJsZXMnLFxuICAnc2hyaW1wJyxcbiAgJ3NwZWNpZXMnLFxuICAnc3RhZmYnLFxuICAnc3dpbmUnLFxuICAndHJvdXQnLFxuICAndHJhZmZpYycsXG4gICd0cmFuc3BvcmF0aW9uJyxcbiAgJ3R1bmEnLFxuICAnd2VhbHRoJyxcbiAgJ3dlbGZhcmUnLFxuICAnd2hpdGluZycsXG4gICd3aWxkZWJlZXN0JyxcbiAgJ3dpbGRsaWZlJyxcbiAgJ3lvdScsXG4gIC8vIFJlZ2V4ZXMuXG4gIC9wb3gkL2ksIC8vIFwiY2hpY2twb3hcIiwgXCJzbWFsbHBveFwiXG4gIC9vaXMkL2ksXG4gIC9kZWVyJC9pLCAvLyBcImRlZXJcIiwgXCJyZWluZGVlclwiXG4gIC9maXNoJC9pLCAvLyBcImZpc2hcIiwgXCJibG93ZmlzaFwiLCBcImFuZ2VsZmlzaFwiXG4gIC9zaGVlcCQvaSxcbiAgL21lYXNsZXMkL2ksXG4gIC9bXmFlaW91XWVzZSQvaSwgLy8gXCJjaGluZXNlXCIsIFwiamFwYW5lc2VcIlxuXS5mb3JFYWNoKFBsdXJhbGl6ZS5hZGRVbmNvdW50YWJsZVJ1bGUpO1xuXG5AUGlwZSh7IG5hbWU6ICdwbHVyYWwnIH0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGx1cmFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWUpIHtcbiAgICByZXR1cm4gUGx1cmFsaXplLnBsdXJhbGl6ZSh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==