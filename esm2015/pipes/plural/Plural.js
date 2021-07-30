// NG2
import { Injectable, Pipe } from '@angular/core';
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
    /[^aeiou]ese$/i,
].forEach(Pluralize.addUncountableRule);
export class PluralPipe {
    transform(value) {
        return Pluralize.pluralize(value);
    }
}
PluralPipe.decorators = [
    { type: Pipe, args: [{ name: 'plural' },] },
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1cmFsLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJwaXBlcy9wbHVyYWwvUGx1cmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFaEUsd0VBQXdFO0FBQ3hFLDBFQUEwRTtBQUMxRSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN4QixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUU1Qjs7R0FFRztBQUNILFNBQVMsV0FBVyxDQUFDLEdBQVc7SUFDOUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkUsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxZQUFZLENBQUMsSUFBcUI7SUFDekMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUMxQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsV0FBVyxDQUFDLElBQVksRUFBRSxLQUFhO0lBQzlDLG1DQUFtQztJQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDL0IsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDNUI7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SUFDUCxTQUFTO0lBQ1QsZUFBZTtJQUNmLE1BQU07SUFDTixRQUFRO0lBQ1IsU0FBUztJQUNULFNBQVM7SUFDVCxZQUFZO0lBQ1osVUFBVTtJQUNWLEtBQUs7SUFDTCxXQUFXO0lBQ1gsT0FBTztJQUNQLE9BQU87SUFDUCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxXQUFXO0lBQ1gsZUFBZTtDQUNoQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUl4QyxNQUFNLE9BQU8sVUFBVTtJQUNyQixTQUFTLENBQUMsS0FBSztRQUNiLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUFMRixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ3ZCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLy8gUnVsZSBzdG9yYWdlIC0gcGx1cmFsaXplIGFuZCBzaW5ndWxhcml6ZSBuZWVkIHRvIGJlIHJ1biBzZXF1ZW50aWFsbHksXHJcbi8vIHdoaWxlIG90aGVyIHJ1bGVzIGNhbiBiZSBvcHRpbWl6ZWQgdXNpbmcgYW4gb2JqZWN0IGZvciBpbnN0YW50IGxvb2t1cHMuXHJcbmNvbnN0IHBsdXJhbFJ1bGVzID0gW107XHJcbmNvbnN0IHNpbmd1bGFyUnVsZXMgPSBbXTtcclxuY29uc3QgdW5jb3VudGFibGVzID0ge307XHJcbmNvbnN0IGlycmVndWxhclBsdXJhbHMgPSB7fTtcclxuY29uc3QgaXJyZWd1bGFyU2luZ2xlcyA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIFRpdGxlIGNhc2UgYSBzdHJpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiB0b1RpdGxlQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNhbml0aXplIGEgcGx1cmFsaXphdGlvbiBydWxlIHRvIGEgdXNhYmxlIHJlZ3VsYXIgZXhwcmVzc2lvbi5cclxuICovXHJcbmZ1bmN0aW9uIHNhbml0aXplUnVsZShydWxlOiBSZWdFeHAgfCBzdHJpbmcpOiBSZWdFeHAge1xyXG4gIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJ1bGUgKyAnJCcsICdpJyk7XHJcbiAgfVxyXG4gIHJldHVybiBydWxlO1xyXG59XHJcblxyXG4vKipcclxuICogUGFzcyBpbiBhIHdvcmQgdG9rZW4gdG8gcHJvZHVjZSBhIGZ1bmN0aW9uIHRoYXQgY2FuIHJlcGxpY2F0ZSB0aGUgY2FzZSBvblxyXG4gKiBhbm90aGVyIHdvcmQuXHJcbiAqL1xyXG5mdW5jdGlvbiByZXN0b3JlQ2FzZSh3b3JkOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIC8vIFVwcGVyIGNhc2VkIHdvcmRzLiBFLmcuIFwiSEVMTE9cIi5cclxuICBpZiAod29yZCA9PT0gd29yZC50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICByZXR1cm4gdG9rZW4udG9VcHBlckNhc2UoKTtcclxuICB9XHJcblxyXG4gIC8vIFRpdGxlIGNhc2VkIHdvcmRzLiBFLmcuIFwiVGl0bGVcIi5cclxuICBpZiAod29yZFswXSA9PT0gd29yZFswXS50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICByZXR1cm4gdG9UaXRsZUNhc2UodG9rZW4pO1xyXG4gIH1cclxuXHJcbiAgLy8gTG93ZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJ0ZXN0XCIuXHJcbiAgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcnBvbGF0ZSBhIHJlZ2V4cCBzdHJpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZShzdHI6IHN0cmluZywgYXJnczogYW55W10pOiBzdHJpbmcge1xyXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFwkKFxcZHsxLDJ9KS9nLCAobWF0Y2gsIGluZGV4KSA9PiB7XHJcbiAgICByZXR1cm4gYXJnc1tpbmRleF0gfHwgJyc7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTYW5pdGl6ZSBhIHdvcmQgYnkgcGFzc2luZyBpbiB0aGUgd29yZCBhbmQgc2FuaXRpemF0aW9uIHJ1bGVzLlxyXG4gKi9cclxuZnVuY3Rpb24gc2FuaXRpemVXb3JkKHRva2VuOiBzdHJpbmcsIHdvcmQ6IHN0cmluZywgY29sbGVjdGlvbjogUmVnRXhwW10pOiBzdHJpbmcge1xyXG4gIC8vIEVtcHR5IHN0cmluZyBvciBkb2Vzbid0IG5lZWQgZml4aW5nLlxyXG4gIGlmICghdG9rZW4ubGVuZ3RoIHx8IHVuY291bnRhYmxlcy5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcclxuICAgIHJldHVybiB3b3JkO1xyXG4gIH1cclxuXHJcbiAgbGV0IGxlbiA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xyXG4gIC8vIEl0ZXJhdGUgb3ZlciB0aGUgc2FuaXRpemF0aW9uIHJ1bGVzIGFuZCB1c2UgdGhlIGZpcnN0IG9uZSB0byBtYXRjaC5cclxuICB3aGlsZSAobGVuLS0pIHtcclxuICAgIGNvbnN0IHJ1bGUgPSBjb2xsZWN0aW9uW2xlbl07XHJcbiAgICAvLyBJZiB0aGUgcnVsZSBwYXNzZXMsIHJldHVybiB0aGUgcmVwbGFjZW1lbnQuXHJcbiAgICBpZiAocnVsZVswXS50ZXN0KHdvcmQpKSB7XHJcbiAgICAgIHJldHVybiB3b3JkLnJlcGxhY2UocnVsZVswXSwgKG1hdGNoLCBpbmRleCwgd29yZHMpID0+IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBpbnRlcnBvbGF0ZShydWxlWzFdLCBbbWF0Y2gsIGluZGV4LCB3b3Jkc10pO1xyXG4gICAgICAgIGlmIChtYXRjaCA9PT0gJycpIHtcclxuICAgICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3Jkc1tpbmRleCAtIDFdLCByZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2UobWF0Y2gsIHJlc3VsdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gd29yZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcGxhY2UgYSB3b3JkIHdpdGggdGhlIHVwZGF0ZWQgd29yZC5cclxuICovXHJcbmZ1bmN0aW9uIHJlcGxhY2VXb3JkKHJlcGxhY2VNYXA6IGFueSwga2VlcE1hcDogYW55LCBydWxlczogYW55W10pOiBGdW5jdGlvbiB7XHJcbiAgcmV0dXJuICh3b3JkKSA9PiB7XHJcbiAgICAvLyBHZXQgdGhlIGNvcnJlY3QgdG9rZW4gYW5kIGNhc2UgcmVzdG9yYXRpb24gZnVuY3Rpb25zLlxyXG4gICAgY29uc3QgdG9rZW4gPSB3b3JkLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUga2VlcCBvYmplY3QgbWFwLlxyXG4gICAgaWYgKGtlZXBNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XHJcbiAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCB0b2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUgcmVwbGFjZW1lbnQgbWFwIGZvciBhIGRpcmVjdCB3b3JkIHJlcGxhY2VtZW50LlxyXG4gICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XHJcbiAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCByZXBsYWNlTWFwW3Rva2VuXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUnVuIGFsbCB0aGUgcnVsZXMgYWdhaW5zdCB0aGUgd29yZC5cclxuICAgIHJldHVybiBzYW5pdGl6ZVdvcmQodG9rZW4sIHdvcmQsIHJ1bGVzKTtcclxuICB9O1xyXG59XHJcblxyXG5jbGFzcyBQbHVyYWxpemUge1xyXG4gIHN0YXRpYyBwbHVyYWxpemUod29yZCwgY291bnQgPSAxLCBpbmNsdXNpdmU/KSB7XHJcbiAgICBjb25zdCBwbHVyYWxpemVkID0gY291bnQgPT09IDEgPyBQbHVyYWxpemUuc2luZ3VsYXIod29yZCkgOiBQbHVyYWxpemUucGx1cmFsKHdvcmQpO1xyXG4gICAgcmV0dXJuIChpbmNsdXNpdmUgPyBgJHtjb3VudH0gYCA6ICcnKSArIHBsdXJhbGl6ZWQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2luZ3VsYXIod29yZCkge1xyXG4gICAgcmV0dXJuIHJlcGxhY2VXb3JkKGlycmVndWxhclNpbmdsZXMsIGlycmVndWxhclBsdXJhbHMsIHBsdXJhbFJ1bGVzKSh3b3JkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbHVyYWwod29yZCkge1xyXG4gICAgcmV0dXJuIHJlcGxhY2VXb3JkKGlycmVndWxhclBsdXJhbHMsIGlycmVndWxhclNpbmdsZXMsIHNpbmd1bGFyUnVsZXMpKHdvcmQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZFBsdXJhbFJ1bGUocnVsZSwgcmVwbGFjZW1lbnQpIHtcclxuICAgIHBsdXJhbFJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRTaW5ndWxhclJ1bGUocnVsZSwgcmVwbGFjZW1lbnQpIHtcclxuICAgIHNpbmd1bGFyUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZFVuY291bnRhYmxlUnVsZSh3b3JkKSB7XHJcbiAgICBpZiAodHlwZW9mIHdvcmQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHVuY291bnRhYmxlc1t3b3JkLnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBzaW5ndWxhciBhbmQgcGx1cmFsIHJlZmVyZW5jZXMgZm9yIHRoZSB3b3JkLlxyXG4gICAgUGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUod29yZCwgJyQwJyk7XHJcbiAgICBQbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHdvcmQsICckMCcpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZElycmVndWxhclJ1bGUoc2luZ2xlLCBwbHVyYWwpIHtcclxuICAgIGNvbnN0IG9uZSA9IHBsdXJhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgbWFueSA9IHNpbmdsZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIGlycmVndWxhclNpbmdsZXNbb25lXSA9IG1hbnk7XHJcbiAgICBpcnJlZ3VsYXJQbHVyYWxzW21hbnldID0gb25lO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIElycmVndWxhciBydWxlcy5cclxuICovXHJcbltcclxuICAvLyBQcm9ub3Vucy5cclxuICBbJ0knLCAnd2UnXSxcclxuICBbJ21lJywgJ3VzJ10sXHJcbiAgWydoZScsICd0aGV5J10sXHJcbiAgWydzaGUnLCAndGhleSddLFxyXG4gIFsndGhlbScsICd0aGVtJ10sXHJcbiAgWydteXNlbGYnLCAnb3Vyc2VsdmVzJ10sXHJcbiAgWyd5b3Vyc2VsZicsICd5b3Vyc2VsdmVzJ10sXHJcbiAgWydpdHNlbGYnLCAndGhlbXNlbHZlcyddLFxyXG4gIFsnaGVyc2VsZicsICd0aGVtc2VsdmVzJ10sXHJcbiAgWydoaW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcclxuICBbJ3RoZW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcclxuICBbJ2lzJywgJ2FyZSddLFxyXG4gIFsndGhpcycsICd0aGVzZSddLFxyXG4gIFsndGhhdCcsICd0aG9zZSddLFxyXG4gIC8vIFdvcmRzIGVuZGluZyBpbiB3aXRoIGEgY29uc29uYW50IGFuZCBgb2AuXHJcbiAgWydlY2hvJywgJ2VjaG9lcyddLFxyXG4gIFsnZGluZ28nLCAnZGluZ29lcyddLFxyXG4gIFsndm9sY2FubycsICd2b2xjYW5vZXMnXSxcclxuICBbJ3Rvcm5hZG8nLCAndG9ybmFkb2VzJ10sXHJcbiAgWyd0b3JwZWRvJywgJ3RvcnBlZG9lcyddLFxyXG4gIC8vIEVuZHMgd2l0aCBgdXNgLlxyXG4gIFsnZ2VudXMnLCAnZ2VuZXJhJ10sXHJcbiAgWyd2aXNjdXMnLCAndmlzY2VyYSddLFxyXG4gIC8vIEVuZHMgd2l0aCBgbWFgLlxyXG4gIFsnc3RpZ21hJywgJ3N0aWdtYXRhJ10sXHJcbiAgWydzdG9tYScsICdzdG9tYXRhJ10sXHJcbiAgWydkb2dtYScsICdkb2dtYXRhJ10sXHJcbiAgWydsZW1tYScsICdsZW1tYXRhJ10sXHJcbiAgWydzY2hlbWEnLCAnc2NoZW1hdGEnXSxcclxuICBbJ2FuYXRoZW1hJywgJ2FuYXRoZW1hdGEnXSxcclxuICAvLyBPdGhlciBpcnJlZ3VsYXIgcnVsZXMuXHJcbiAgWydveCcsICdveGVuJ10sXHJcbiAgWydheGUnLCAnYXhlcyddLFxyXG4gIFsnZGllJywgJ2RpY2UnXSxcclxuICBbJ3llcycsICd5ZXNlcyddLFxyXG4gIFsnZm9vdCcsICdmZWV0J10sXHJcbiAgWydlYXZlJywgJ2VhdmVzJ10sXHJcbiAgWydnb29zZScsICdnZWVzZSddLFxyXG4gIFsndG9vdGgnLCAndGVldGgnXSxcclxuICBbJ3F1aXonLCAncXVpenplcyddLFxyXG4gIFsnaHVtYW4nLCAnaHVtYW5zJ10sXHJcbiAgWydwcm9vZicsICdwcm9vZnMnXSxcclxuICBbJ2NhcnZlJywgJ2NhcnZlcyddLFxyXG4gIFsndmFsdmUnLCAndmFsdmVzJ10sXHJcbiAgWyd0aGllZicsICd0aGlldmVzJ10sXHJcbiAgWydnZW5pZScsICdnZW5pZXMnXSxcclxuICBbJ2dyb292ZScsICdncm9vdmVzJ10sXHJcbiAgWydwaWNrYXhlJywgJ3BpY2theGVzJ10sXHJcbiAgWyd3aGlza2V5JywgJ3doaXNraWVzJ10sXHJcbl0uZm9yRWFjaCgocnVsZSkgPT4ge1xyXG4gIHJldHVybiBQbHVyYWxpemUuYWRkSXJyZWd1bGFyUnVsZShydWxlWzBdLCBydWxlWzFdKTtcclxufSk7XHJcblxyXG4vKipcclxuICogUGx1cmFsaXphdGlvbiBydWxlcy5cclxuICovXHJcbltcclxuICBbL3M/JC9pLCAncyddLFxyXG4gIFsvKFteYWVpb3VdZXNlKSQvaSwgJyQxJ10sXHJcbiAgWy8oYXh8dGVzdClpcyQvaSwgJyQxZXMnXSxcclxuICBbLyhhbGlhc3xbXmFvdV11c3x0bGFzfGdhc3xyaXMpJC9pLCAnJDFlcyddLFxyXG4gIFsvKGVbbW5ddSlzPyQvaSwgJyQxcyddLFxyXG4gIFsvKFtebF1pYXN8W2FlaW91XWxhc3xbZW1qenJdYXN8W2l1XWFtKSQvaSwgJyQxJ10sXHJcbiAgWy8oYWx1bW58c3lsbGFifG9jdG9wfHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMWknXSxcclxuICBbLyhhbHVtbnxhbGd8dmVydGVicikoPzphfGFlKSQvaSwgJyQxYWUnXSxcclxuICBbLyhzZXJhcGh8Y2hlcnViKSg/OmltKT8kL2ksICckMWltJ10sXHJcbiAgWy8oaGVyfGF0fGdyKW8kL2ksICckMW9lcyddLFxyXG4gIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfGF1dG9tYXR8cXVvcikoPzphfHVtKSQvaSwgJyQxYSddLFxyXG4gIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KSg/OmF8b24pJC9pLCAnJDFhJ10sXHJcbiAgWy9zaXMkL2ksICdzZXMnXSxcclxuICBbLyg/Oihrbml8d2l8bGkpZmV8KGFyfGx8ZWF8ZW98b2F8aG9vKWYpJC9pLCAnJDEkMnZlcyddLFxyXG4gIFsvKFteYWVpb3V5XXxxdSl5JC9pLCAnJDFpZXMnXSxcclxuICBbLyhbXmNoXVtpZW9dW2xuXSlleSQvaSwgJyQxaWVzJ10sXHJcbiAgWy8oeHxjaHxzc3xzaHx6eikkL2ksICckMWVzJ10sXHJcbiAgWy8obWF0cnxjb2R8bXVyfHNpbHx2ZXJ0fGluZHxhcHBlbmQpKD86aXh8ZXgpJC9pLCAnJDFpY2VzJ10sXHJcbiAgWy8obXxsKSg/OmljZXxvdXNlKSQvaSwgJyQxaWNlJ10sXHJcbiAgWy8ocGUpKD86cnNvbnxvcGxlKSQvaSwgJyQxb3BsZSddLFxyXG4gIFsvKGNoaWxkKSg/OnJlbik/JC9pLCAnJDFyZW4nXSxcclxuICBbL2VhdXgkL2ksICckMCddLFxyXG4gIFsvbVthZV1uJC9pLCAnbWVuJ10sXHJcbiAgWyd0aG91JywgJ3lvdSddLFxyXG5dLmZvckVhY2goKHJ1bGUpID0+IHtcclxuICByZXR1cm4gUGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFNpbmd1bGFyaXphdGlvbiBydWxlcy5cclxuICovXHJcbltcclxuICBbL3MkL2ksICcnXSxcclxuICBbLyhzcykkL2ksICckMSddLFxyXG4gIFsvKChhKW5hbHl8KGIpYXwoZClpYWdub3wocClhcmVudGhlfChwKXJvZ25vfChzKXlub3B8KHQpaGUpKD86c2lzfHNlcykkL2ksICckMXNpcyddLFxyXG4gIFsvKF5hbmFseSkoPzpzaXN8c2VzKSQvaSwgJyQxc2lzJ10sXHJcbiAgWy8od2l8a25pfCg/OmFmdGVyfGhhbGZ8aGlnaHxsb3d8bWlkfG5vbnxuaWdodHxbXlxcd118XilsaSl2ZXMkL2ksICckMWZlJ10sXHJcbiAgWy8oYXJ8KD86d298W2FlXSlsfFtlb11bYW9dKXZlcyQvaSwgJyQxZiddLFxyXG4gIFsvKFteYWVpb3V5XXxxdSlpZXMkL2ksICckMXknXSxcclxuICBbLyheW3BsXXx6b21ifF4oPzpuZWNrKT90fFthZW9dW2x0XXxjdXQpaWVzJC9pLCAnJDFpZSddLFxyXG4gIFsvKFxcYig/Om1vbnxzbWlsKSlpZXMkL2ksICckMWV5J10sXHJcbiAgWy8obXxsKWljZSQvaSwgJyQxb3VzZSddLFxyXG4gIFsvKHNlcmFwaHxjaGVydWIpaW0kL2ksICckMSddLFxyXG4gIFsvKHh8Y2h8c3N8c2h8enp8dHRvfGdvfGNob3xhbGlhc3xbXmFvdV11c3x0bGFzfGdhc3woPzpoZXJ8YXR8Z3Ipb3xyaXMpKD86ZXMpPyQvaSwgJyQxJ10sXHJcbiAgWy8oZVttbl11KXM/JC9pLCAnJDEnXSxcclxuICBbLyhtb3ZpZXx0d2VsdmUpcyQvaSwgJyQxJ10sXHJcbiAgWy8oY3Jpc3x0ZXN0fGRpYWdub3MpKD86aXN8ZXMpJC9pLCAnJDFpcyddLFxyXG4gIFsvKGFsdW1ufHN5bGxhYnxvY3RvcHx2aXJ8cmFkaXxudWNsZXxmdW5nfGNhY3R8c3RpbXVsfHRlcm1pbnxiYWNpbGx8Zm9jfHV0ZXJ8bG9jfHN0cmF0KSg/OnVzfGkpJC9pLCAnJDF1cyddLFxyXG4gIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfHF1b3IpYSQvaSwgJyQxdW0nXSxcclxuICBbLyhhcGhlbGl8aHlwZXJiYXR8cGVyaWhlbGl8YXN5bmRldHxub3VtZW58cGhlbm9tZW58Y3JpdGVyaXxvcmdhbnxwcm9sZWdvbWVufGhlZHJ8YXV0b21hdClhJC9pLCAnJDFvbiddLFxyXG4gIFsvKGFsdW1ufGFsZ3x2ZXJ0ZWJyKWFlJC9pLCAnJDFhJ10sXHJcbiAgWy8oY29kfG11cnxzaWx8dmVydHxpbmQpaWNlcyQvaSwgJyQxZXgnXSxcclxuICBbLyhtYXRyfGFwcGVuZClpY2VzJC9pLCAnJDFpeCddLFxyXG4gIFsvKHBlKShyc29ufG9wbGUpJC9pLCAnJDFyc29uJ10sXHJcbiAgWy8oY2hpbGQpcmVuJC9pLCAnJDEnXSxcclxuICBbLyhlYXUpeD8kL2ksICckMSddLFxyXG4gIFsvbWVuJC9pLCAnbWFuJ10sXHJcbl0uZm9yRWFjaCgocnVsZSkgPT4ge1xyXG4gIHJldHVybiBQbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBVbmNvdW50YWJsZSBydWxlcy5cclxuICovXHJcbltcclxuICAvLyBTaW5ndWxhciB3b3JkcyB3aXRoIG5vIHBsdXJhbHMuXHJcbiAgJ2FkdmljZScsXHJcbiAgJ2FkdWx0aG9vZCcsXHJcbiAgJ2FnZW5kYScsXHJcbiAgJ2FpZCcsXHJcbiAgJ2FsY29ob2wnLFxyXG4gICdhbW1vJyxcclxuICAnYXRobGV0aWNzJyxcclxuICAnYmlzb24nLFxyXG4gICdibG9vZCcsXHJcbiAgJ2JyZWFtJyxcclxuICAnYnVmZmFsbycsXHJcbiAgJ2J1dHRlcicsXHJcbiAgJ2NhcnAnLFxyXG4gICdjYXNoJyxcclxuICAnY2hhc3NpcycsXHJcbiAgJ2NoZXNzJyxcclxuICAnY2xvdGhpbmcnLFxyXG4gICdjb21tZXJjZScsXHJcbiAgJ2NvZCcsXHJcbiAgJ2Nvb3BlcmF0aW9uJyxcclxuICAnY29ycHMnLFxyXG4gICdkaWdlc3Rpb24nLFxyXG4gICdkZWJyaXMnLFxyXG4gICdkaWFiZXRlcycsXHJcbiAgJ2VuZXJneScsXHJcbiAgJ2VxdWlwbWVudCcsXHJcbiAgJ2VsaycsXHJcbiAgJ2V4Y3JldGlvbicsXHJcbiAgJ2V4cGVydGlzZScsXHJcbiAgJ2Zsb3VuZGVyJyxcclxuICAnZnVuJyxcclxuICAnZ2FsbG93cycsXHJcbiAgJ2dhcmJhZ2UnLFxyXG4gICdncmFmZml0aScsXHJcbiAgJ2hlYWRxdWFydGVycycsXHJcbiAgJ2hlYWx0aCcsXHJcbiAgJ2hlcnBlcycsXHJcbiAgJ2hpZ2hqaW5rcycsXHJcbiAgJ2hvbWV3b3JrJyxcclxuICAnaG91c2V3b3JrJyxcclxuICAnaW5mb3JtYXRpb24nLFxyXG4gICdqZWFucycsXHJcbiAgJ2p1c3RpY2UnLFxyXG4gICdrdWRvcycsXHJcbiAgJ2xhYm91cicsXHJcbiAgJ2xpdGVyYXR1cmUnLFxyXG4gICdtYWNoaW5lcnknLFxyXG4gICdtYWNrZXJlbCcsXHJcbiAgJ21lZGlhJyxcclxuICAnbWV3cycsXHJcbiAgJ21vb3NlJyxcclxuICAnbXVzaWMnLFxyXG4gICduZXdzJyxcclxuICAncGlrZScsXHJcbiAgJ3BsYW5rdG9uJyxcclxuICAncGxpZXJzJyxcclxuICAncG9sbHV0aW9uJyxcclxuICAncHJlbWlzZXMnLFxyXG4gICdyYWluJyxcclxuICAncmVzZWFyY2gnLFxyXG4gICdyaWNlJyxcclxuICAnc2FsbW9uJyxcclxuICAnc2Npc3NvcnMnLFxyXG4gICdzZXJpZXMnLFxyXG4gICdzZXdhZ2UnLFxyXG4gICdzaGFtYmxlcycsXHJcbiAgJ3NocmltcCcsXHJcbiAgJ3NwZWNpZXMnLFxyXG4gICdzdGFmZicsXHJcbiAgJ3N3aW5lJyxcclxuICAndHJvdXQnLFxyXG4gICd0cmFmZmljJyxcclxuICAndHJhbnNwb3JhdGlvbicsXHJcbiAgJ3R1bmEnLFxyXG4gICd3ZWFsdGgnLFxyXG4gICd3ZWxmYXJlJyxcclxuICAnd2hpdGluZycsXHJcbiAgJ3dpbGRlYmVlc3QnLFxyXG4gICd3aWxkbGlmZScsXHJcbiAgJ3lvdScsXHJcbiAgLy8gUmVnZXhlcy5cclxuICAvcG94JC9pLCAvLyBcImNoaWNrcG94XCIsIFwic21hbGxwb3hcIlxyXG4gIC9vaXMkL2ksXHJcbiAgL2RlZXIkL2ksIC8vIFwiZGVlclwiLCBcInJlaW5kZWVyXCJcclxuICAvZmlzaCQvaSwgLy8gXCJmaXNoXCIsIFwiYmxvd2Zpc2hcIiwgXCJhbmdlbGZpc2hcIlxyXG4gIC9zaGVlcCQvaSxcclxuICAvbWVhc2xlcyQvaSxcclxuICAvW15hZWlvdV1lc2UkL2ksIC8vIFwiY2hpbmVzZVwiLCBcImphcGFuZXNlXCJcclxuXS5mb3JFYWNoKFBsdXJhbGl6ZS5hZGRVbmNvdW50YWJsZVJ1bGUpO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAncGx1cmFsJyB9KVxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQbHVyYWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gUGx1cmFsaXplLnBsdXJhbGl6ZSh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==