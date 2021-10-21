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
    /[^aeiou]ese$/i,
].forEach(Pluralize.addUncountableRule);
export class PluralPipe {
    transform(value) {
        return Pluralize.pluralize(value);
    }
}
PluralPipe.ɵfac = function PluralPipe_Factory(t) { return new (t || PluralPipe)(); };
PluralPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "plural", type: PluralPipe, pure: true });
PluralPipe.ɵprov = i0.ɵɵdefineInjectable({ token: PluralPipe, factory: PluralPipe.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PluralPipe, [{
        type: Pipe,
        args: [{ name: 'plural' }]
    }, {
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1cmFsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbInBpcGVzL3BsdXJhbC9QbHVyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFFaEUsd0VBQXdFO0FBQ3hFLDBFQUEwRTtBQUMxRSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN4QixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUU1Qjs7R0FFRztBQUNILFNBQVMsV0FBVyxDQUFDLEdBQVc7SUFDOUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkUsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxZQUFZLENBQUMsSUFBcUI7SUFDekMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUMxQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsV0FBVyxDQUFDLElBQVksRUFBRSxLQUFhO0lBQzlDLG1DQUFtQztJQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDL0IsT0FBTyxLQUFLLENBQUMsV0FBVyxF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T0FBTztJQUNQLE9BQU87SUFDUCxTQUFTO0lBQ1QsZUFBZTtJQUNmLE1BQU07SUFDTixRQUFRO0lBQ1IsU0FBUztJQUNULFNBQVM7SUFDVCxZQUFZO0lBQ1osVUFBVTtJQUNWLEtBQUs7SUFDTCxXQUFXO0lBQ1gsT0FBTztJQUNQLE9BQU87SUFDUCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxXQUFXO0lBQ1gsZUFBZTtDQUNoQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUl4QyxNQUFNLE9BQU8sVUFBVTtJQUNyQixTQUFTLENBQUMsS0FBSztRQUNiLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOztvRUFIVSxVQUFVOzJEQUFWLFVBQVU7a0RBQVYsVUFBVSxXQUFWLFVBQVU7a0RBQVYsVUFBVTtjQUZ0QixJQUFJO2VBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFOztjQUN2QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIFJ1bGUgc3RvcmFnZSAtIHBsdXJhbGl6ZSBhbmQgc2luZ3VsYXJpemUgbmVlZCB0byBiZSBydW4gc2VxdWVudGlhbGx5LFxuLy8gd2hpbGUgb3RoZXIgcnVsZXMgY2FuIGJlIG9wdGltaXplZCB1c2luZyBhbiBvYmplY3QgZm9yIGluc3RhbnQgbG9va3Vwcy5cbmNvbnN0IHBsdXJhbFJ1bGVzID0gW107XG5jb25zdCBzaW5ndWxhclJ1bGVzID0gW107XG5jb25zdCB1bmNvdW50YWJsZXMgPSB7fTtcbmNvbnN0IGlycmVndWxhclBsdXJhbHMgPSB7fTtcbmNvbnN0IGlycmVndWxhclNpbmdsZXMgPSB7fTtcblxuLyoqXG4gKiBUaXRsZSBjYXNlIGEgc3RyaW5nLlxuICovXG5mdW5jdGlvbiB0b1RpdGxlQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSBwbHVyYWxpemF0aW9uIHJ1bGUgdG8gYSB1c2FibGUgcmVndWxhciBleHByZXNzaW9uLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZVJ1bGUocnVsZTogUmVnRXhwIHwgc3RyaW5nKTogUmVnRXhwIHtcbiAgaWYgKHR5cGVvZiBydWxlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJ1bGUgKyAnJCcsICdpJyk7XG4gIH1cbiAgcmV0dXJuIHJ1bGU7XG59XG5cbi8qKlxuICogUGFzcyBpbiBhIHdvcmQgdG9rZW4gdG8gcHJvZHVjZSBhIGZ1bmN0aW9uIHRoYXQgY2FuIHJlcGxpY2F0ZSB0aGUgY2FzZSBvblxuICogYW5vdGhlciB3b3JkLlxuICovXG5mdW5jdGlvbiByZXN0b3JlQ2FzZSh3b3JkOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBVcHBlciBjYXNlZCB3b3Jkcy4gRS5nLiBcIkhFTExPXCIuXG4gIGlmICh3b3JkID09PSB3b3JkLnRvVXBwZXJDYXNlKCkpIHtcbiAgICByZXR1cm4gdG9rZW4udG9VcHBlckNhc2UoKTtcbiAgfVxuXG4gIC8vIFRpdGxlIGNhc2VkIHdvcmRzLiBFLmcuIFwiVGl0bGVcIi5cbiAgaWYgKHdvcmRbMF0gPT09IHdvcmRbMF0udG9VcHBlckNhc2UoKSkge1xuICAgIHJldHVybiB0b1RpdGxlQ2FzZSh0b2tlbik7XG4gIH1cblxuICAvLyBMb3dlciBjYXNlZCB3b3Jkcy4gRS5nLiBcInRlc3RcIi5cbiAgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8qKlxuICogSW50ZXJwb2xhdGUgYSByZWdleHAgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZShzdHI6IHN0cmluZywgYXJnczogYW55W10pOiBzdHJpbmcge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcJChcXGR7MSwyfSkvZywgKG1hdGNoLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiBhcmdzW2luZGV4XSB8fCAnJztcbiAgfSk7XG59XG5cbi8qKlxuICogU2FuaXRpemUgYSB3b3JkIGJ5IHBhc3NpbmcgaW4gdGhlIHdvcmQgYW5kIHNhbml0aXphdGlvbiBydWxlcy5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVXb3JkKHRva2VuOiBzdHJpbmcsIHdvcmQ6IHN0cmluZywgY29sbGVjdGlvbjogUmVnRXhwW10pOiBzdHJpbmcge1xuICAvLyBFbXB0eSBzdHJpbmcgb3IgZG9lc24ndCBuZWVkIGZpeGluZy5cbiAgaWYgKCF0b2tlbi5sZW5ndGggfHwgdW5jb3VudGFibGVzLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgIHJldHVybiB3b3JkO1xuICB9XG5cbiAgbGV0IGxlbiA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuICAvLyBJdGVyYXRlIG92ZXIgdGhlIHNhbml0aXphdGlvbiBydWxlcyBhbmQgdXNlIHRoZSBmaXJzdCBvbmUgdG8gbWF0Y2guXG4gIHdoaWxlIChsZW4tLSkge1xuICAgIGNvbnN0IHJ1bGUgPSBjb2xsZWN0aW9uW2xlbl07XG4gICAgLy8gSWYgdGhlIHJ1bGUgcGFzc2VzLCByZXR1cm4gdGhlIHJlcGxhY2VtZW50LlxuICAgIGlmIChydWxlWzBdLnRlc3Qod29yZCkpIHtcbiAgICAgIHJldHVybiB3b3JkLnJlcGxhY2UocnVsZVswXSwgKG1hdGNoLCBpbmRleCwgd29yZHMpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gaW50ZXJwb2xhdGUocnVsZVsxXSwgW21hdGNoLCBpbmRleCwgd29yZHNdKTtcbiAgICAgICAgaWYgKG1hdGNoID09PSAnJykge1xuICAgICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3Jkc1tpbmRleCAtIDFdLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZShtYXRjaCwgcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gd29yZDtcbn1cblxuLyoqXG4gKiBSZXBsYWNlIGEgd29yZCB3aXRoIHRoZSB1cGRhdGVkIHdvcmQuXG4gKi9cbmZ1bmN0aW9uIHJlcGxhY2VXb3JkKHJlcGxhY2VNYXA6IGFueSwga2VlcE1hcDogYW55LCBydWxlczogYW55W10pOiBGdW5jdGlvbiB7XG4gIHJldHVybiAod29yZCkgPT4ge1xuICAgIC8vIEdldCB0aGUgY29ycmVjdCB0b2tlbiBhbmQgY2FzZSByZXN0b3JhdGlvbiBmdW5jdGlvbnMuXG4gICAgY29uc3QgdG9rZW4gPSB3b3JkLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBDaGVjayBhZ2FpbnN0IHRoZSBrZWVwIG9iamVjdCBtYXAuXG4gICAgaWYgKGtlZXBNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZCwgdG9rZW4pO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGFnYWluc3QgdGhlIHJlcGxhY2VtZW50IG1hcCBmb3IgYSBkaXJlY3Qgd29yZCByZXBsYWNlbWVudC5cbiAgICBpZiAocmVwbGFjZU1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCByZXBsYWNlTWFwW3Rva2VuXSk7XG4gICAgfVxuXG4gICAgLy8gUnVuIGFsbCB0aGUgcnVsZXMgYWdhaW5zdCB0aGUgd29yZC5cbiAgICByZXR1cm4gc2FuaXRpemVXb3JkKHRva2VuLCB3b3JkLCBydWxlcyk7XG4gIH07XG59XG5cbmNsYXNzIFBsdXJhbGl6ZSB7XG4gIHN0YXRpYyBwbHVyYWxpemUod29yZCwgY291bnQgPSAxLCBpbmNsdXNpdmU/KSB7XG4gICAgY29uc3QgcGx1cmFsaXplZCA9IGNvdW50ID09PSAxID8gUGx1cmFsaXplLnNpbmd1bGFyKHdvcmQpIDogUGx1cmFsaXplLnBsdXJhbCh3b3JkKTtcbiAgICByZXR1cm4gKGluY2x1c2l2ZSA/IGAke2NvdW50fSBgIDogJycpICsgcGx1cmFsaXplZDtcbiAgfVxuXG4gIHN0YXRpYyBzaW5ndWxhcih3b3JkKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VXb3JkKGlycmVndWxhclNpbmdsZXMsIGlycmVndWxhclBsdXJhbHMsIHBsdXJhbFJ1bGVzKSh3b3JkKTtcbiAgfVxuXG4gIHN0YXRpYyBwbHVyYWwod29yZCkge1xuICAgIHJldHVybiByZXBsYWNlV29yZChpcnJlZ3VsYXJQbHVyYWxzLCBpcnJlZ3VsYXJTaW5nbGVzLCBzaW5ndWxhclJ1bGVzKSh3b3JkKTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRQbHVyYWxSdWxlKHJ1bGUsIHJlcGxhY2VtZW50KSB7XG4gICAgcGx1cmFsUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFNpbmd1bGFyUnVsZShydWxlLCByZXBsYWNlbWVudCkge1xuICAgIHNpbmd1bGFyUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFVuY291bnRhYmxlUnVsZSh3b3JkKSB7XG4gICAgaWYgKHR5cGVvZiB3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgdW5jb3VudGFibGVzW3dvcmQudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCBzaW5ndWxhciBhbmQgcGx1cmFsIHJlZmVyZW5jZXMgZm9yIHRoZSB3b3JkLlxuICAgIFBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHdvcmQsICckMCcpO1xuICAgIFBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUod29yZCwgJyQwJyk7XG4gIH1cblxuICBzdGF0aWMgYWRkSXJyZWd1bGFyUnVsZShzaW5nbGUsIHBsdXJhbCkge1xuICAgIGNvbnN0IG9uZSA9IHBsdXJhbC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IG1hbnkgPSBzaW5nbGUudG9Mb3dlckNhc2UoKTtcblxuICAgIGlycmVndWxhclNpbmdsZXNbb25lXSA9IG1hbnk7XG4gICAgaXJyZWd1bGFyUGx1cmFsc1ttYW55XSA9IG9uZTtcbiAgfVxufVxuXG4vKipcbiAqIElycmVndWxhciBydWxlcy5cbiAqL1xuW1xuICAvLyBQcm9ub3Vucy5cbiAgWydJJywgJ3dlJ10sXG4gIFsnbWUnLCAndXMnXSxcbiAgWydoZScsICd0aGV5J10sXG4gIFsnc2hlJywgJ3RoZXknXSxcbiAgWyd0aGVtJywgJ3RoZW0nXSxcbiAgWydteXNlbGYnLCAnb3Vyc2VsdmVzJ10sXG4gIFsneW91cnNlbGYnLCAneW91cnNlbHZlcyddLFxuICBbJ2l0c2VsZicsICd0aGVtc2VsdmVzJ10sXG4gIFsnaGVyc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gIFsnaGltc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gIFsndGhlbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICBbJ2lzJywgJ2FyZSddLFxuICBbJ3RoaXMnLCAndGhlc2UnXSxcbiAgWyd0aGF0JywgJ3Rob3NlJ10sXG4gIC8vIFdvcmRzIGVuZGluZyBpbiB3aXRoIGEgY29uc29uYW50IGFuZCBgb2AuXG4gIFsnZWNobycsICdlY2hvZXMnXSxcbiAgWydkaW5nbycsICdkaW5nb2VzJ10sXG4gIFsndm9sY2FubycsICd2b2xjYW5vZXMnXSxcbiAgWyd0b3JuYWRvJywgJ3Rvcm5hZG9lcyddLFxuICBbJ3RvcnBlZG8nLCAndG9ycGVkb2VzJ10sXG4gIC8vIEVuZHMgd2l0aCBgdXNgLlxuICBbJ2dlbnVzJywgJ2dlbmVyYSddLFxuICBbJ3Zpc2N1cycsICd2aXNjZXJhJ10sXG4gIC8vIEVuZHMgd2l0aCBgbWFgLlxuICBbJ3N0aWdtYScsICdzdGlnbWF0YSddLFxuICBbJ3N0b21hJywgJ3N0b21hdGEnXSxcbiAgWydkb2dtYScsICdkb2dtYXRhJ10sXG4gIFsnbGVtbWEnLCAnbGVtbWF0YSddLFxuICBbJ3NjaGVtYScsICdzY2hlbWF0YSddLFxuICBbJ2FuYXRoZW1hJywgJ2FuYXRoZW1hdGEnXSxcbiAgLy8gT3RoZXIgaXJyZWd1bGFyIHJ1bGVzLlxuICBbJ294JywgJ294ZW4nXSxcbiAgWydheGUnLCAnYXhlcyddLFxuICBbJ2RpZScsICdkaWNlJ10sXG4gIFsneWVzJywgJ3llc2VzJ10sXG4gIFsnZm9vdCcsICdmZWV0J10sXG4gIFsnZWF2ZScsICdlYXZlcyddLFxuICBbJ2dvb3NlJywgJ2dlZXNlJ10sXG4gIFsndG9vdGgnLCAndGVldGgnXSxcbiAgWydxdWl6JywgJ3F1aXp6ZXMnXSxcbiAgWydodW1hbicsICdodW1hbnMnXSxcbiAgWydwcm9vZicsICdwcm9vZnMnXSxcbiAgWydjYXJ2ZScsICdjYXJ2ZXMnXSxcbiAgWyd2YWx2ZScsICd2YWx2ZXMnXSxcbiAgWyd0aGllZicsICd0aGlldmVzJ10sXG4gIFsnZ2VuaWUnLCAnZ2VuaWVzJ10sXG4gIFsnZ3Jvb3ZlJywgJ2dyb292ZXMnXSxcbiAgWydwaWNrYXhlJywgJ3BpY2theGVzJ10sXG4gIFsnd2hpc2tleScsICd3aGlza2llcyddLFxuXS5mb3JFYWNoKChydWxlKSA9PiB7XG4gIHJldHVybiBQbHVyYWxpemUuYWRkSXJyZWd1bGFyUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbn0pO1xuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gcnVsZXMuXG4gKi9cbltcbiAgWy9zPyQvaSwgJ3MnXSxcbiAgWy8oW15hZWlvdV1lc2UpJC9pLCAnJDEnXSxcbiAgWy8oYXh8dGVzdClpcyQvaSwgJyQxZXMnXSxcbiAgWy8oYWxpYXN8W15hb3VddXN8dGxhc3xnYXN8cmlzKSQvaSwgJyQxZXMnXSxcbiAgWy8oZVttbl11KXM/JC9pLCAnJDFzJ10sXG4gIFsvKFtebF1pYXN8W2FlaW91XWxhc3xbZW1qenJdYXN8W2l1XWFtKSQvaSwgJyQxJ10sXG4gIFsvKGFsdW1ufHN5bGxhYnxvY3RvcHx2aXJ8cmFkaXxudWNsZXxmdW5nfGNhY3R8c3RpbXVsfHRlcm1pbnxiYWNpbGx8Zm9jfHV0ZXJ8bG9jfHN0cmF0KSg/OnVzfGkpJC9pLCAnJDFpJ10sXG4gIFsvKGFsdW1ufGFsZ3x2ZXJ0ZWJyKSg/OmF8YWUpJC9pLCAnJDFhZSddLFxuICBbLyhzZXJhcGh8Y2hlcnViKSg/OmltKT8kL2ksICckMWltJ10sXG4gIFsvKGhlcnxhdHxncilvJC9pLCAnJDFvZXMnXSxcbiAgWy8oYWdlbmR8YWRkZW5kfG1pbGxlbm5pfGRhdHxleHRyZW18YmFjdGVyaXxkZXNpZGVyYXR8c3RyYXR8Y2FuZGVsYWJyfGVycmF0fG92fHN5bXBvc2l8Y3VycmljdWx8YXV0b21hdHxxdW9yKSg/OmF8dW0pJC9pLCAnJDFhJ10sXG4gIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KSg/OmF8b24pJC9pLCAnJDFhJ10sXG4gIFsvc2lzJC9pLCAnc2VzJ10sXG4gIFsvKD86KGtuaXx3aXxsaSlmZXwoYXJ8bHxlYXxlb3xvYXxob28pZikkL2ksICckMSQydmVzJ10sXG4gIFsvKFteYWVpb3V5XXxxdSl5JC9pLCAnJDFpZXMnXSxcbiAgWy8oW15jaF1baWVvXVtsbl0pZXkkL2ksICckMWllcyddLFxuICBbLyh4fGNofHNzfHNofHp6KSQvaSwgJyQxZXMnXSxcbiAgWy8obWF0cnxjb2R8bXVyfHNpbHx2ZXJ0fGluZHxhcHBlbmQpKD86aXh8ZXgpJC9pLCAnJDFpY2VzJ10sXG4gIFsvKG18bCkoPzppY2V8b3VzZSkkL2ksICckMWljZSddLFxuICBbLyhwZSkoPzpyc29ufG9wbGUpJC9pLCAnJDFvcGxlJ10sXG4gIFsvKGNoaWxkKSg/OnJlbik/JC9pLCAnJDFyZW4nXSxcbiAgWy9lYXV4JC9pLCAnJDAnXSxcbiAgWy9tW2FlXW4kL2ksICdtZW4nXSxcbiAgWyd0aG91JywgJ3lvdSddLFxuXS5mb3JFYWNoKChydWxlKSA9PiB7XG4gIHJldHVybiBQbHVyYWxpemUuYWRkUGx1cmFsUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbn0pO1xuXG4vKipcbiAqIFNpbmd1bGFyaXphdGlvbiBydWxlcy5cbiAqL1xuW1xuICBbL3MkL2ksICcnXSxcbiAgWy8oc3MpJC9pLCAnJDEnXSxcbiAgWy8oKGEpbmFseXwoYilhfChkKWlhZ25vfChwKWFyZW50aGV8KHApcm9nbm98KHMpeW5vcHwodCloZSkoPzpzaXN8c2VzKSQvaSwgJyQxc2lzJ10sXG4gIFsvKF5hbmFseSkoPzpzaXN8c2VzKSQvaSwgJyQxc2lzJ10sXG4gIFsvKHdpfGtuaXwoPzphZnRlcnxoYWxmfGhpZ2h8bG93fG1pZHxub258bmlnaHR8W15cXHddfF4pbGkpdmVzJC9pLCAnJDFmZSddLFxuICBbLyhhcnwoPzp3b3xbYWVdKWx8W2VvXVthb10pdmVzJC9pLCAnJDFmJ10sXG4gIFsvKFteYWVpb3V5XXxxdSlpZXMkL2ksICckMXknXSxcbiAgWy8oXltwbF18em9tYnxeKD86bmVjayk/dHxbYWVvXVtsdF18Y3V0KWllcyQvaSwgJyQxaWUnXSxcbiAgWy8oXFxiKD86bW9ufHNtaWwpKWllcyQvaSwgJyQxZXknXSxcbiAgWy8obXxsKWljZSQvaSwgJyQxb3VzZSddLFxuICBbLyhzZXJhcGh8Y2hlcnViKWltJC9pLCAnJDEnXSxcbiAgWy8oeHxjaHxzc3xzaHx6enx0dG98Z298Y2hvfGFsaWFzfFteYW91XXVzfHRsYXN8Z2FzfCg/OmhlcnxhdHxncilvfHJpcykoPzplcyk/JC9pLCAnJDEnXSxcbiAgWy8oZVttbl11KXM/JC9pLCAnJDEnXSxcbiAgWy8obW92aWV8dHdlbHZlKXMkL2ksICckMSddLFxuICBbLyhjcmlzfHRlc3R8ZGlhZ25vcykoPzppc3xlcykkL2ksICckMWlzJ10sXG4gIFsvKGFsdW1ufHN5bGxhYnxvY3RvcHx2aXJ8cmFkaXxudWNsZXxmdW5nfGNhY3R8c3RpbXVsfHRlcm1pbnxiYWNpbGx8Zm9jfHV0ZXJ8bG9jfHN0cmF0KSg/OnVzfGkpJC9pLCAnJDF1cyddLFxuICBbLyhhZ2VuZHxhZGRlbmR8bWlsbGVubml8ZGF0fGV4dHJlbXxiYWN0ZXJpfGRlc2lkZXJhdHxzdHJhdHxjYW5kZWxhYnJ8ZXJyYXR8b3Z8c3ltcG9zaXxjdXJyaWN1bHxxdW9yKWEkL2ksICckMXVtJ10sXG4gIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KWEkL2ksICckMW9uJ10sXG4gIFsvKGFsdW1ufGFsZ3x2ZXJ0ZWJyKWFlJC9pLCAnJDFhJ10sXG4gIFsvKGNvZHxtdXJ8c2lsfHZlcnR8aW5kKWljZXMkL2ksICckMWV4J10sXG4gIFsvKG1hdHJ8YXBwZW5kKWljZXMkL2ksICckMWl4J10sXG4gIFsvKHBlKShyc29ufG9wbGUpJC9pLCAnJDFyc29uJ10sXG4gIFsvKGNoaWxkKXJlbiQvaSwgJyQxJ10sXG4gIFsvKGVhdSl4PyQvaSwgJyQxJ10sXG4gIFsvbWVuJC9pLCAnbWFuJ10sXG5dLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgcmV0dXJuIFBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG59KTtcblxuLyoqXG4gKiBVbmNvdW50YWJsZSBydWxlcy5cbiAqL1xuW1xuICAvLyBTaW5ndWxhciB3b3JkcyB3aXRoIG5vIHBsdXJhbHMuXG4gICdhZHZpY2UnLFxuICAnYWR1bHRob29kJyxcbiAgJ2FnZW5kYScsXG4gICdhaWQnLFxuICAnYWxjb2hvbCcsXG4gICdhbW1vJyxcbiAgJ2F0aGxldGljcycsXG4gICdiaXNvbicsXG4gICdibG9vZCcsXG4gICdicmVhbScsXG4gICdidWZmYWxvJyxcbiAgJ2J1dHRlcicsXG4gICdjYXJwJyxcbiAgJ2Nhc2gnLFxuICAnY2hhc3NpcycsXG4gICdjaGVzcycsXG4gICdjbG90aGluZycsXG4gICdjb21tZXJjZScsXG4gICdjb2QnLFxuICAnY29vcGVyYXRpb24nLFxuICAnY29ycHMnLFxuICAnZGlnZXN0aW9uJyxcbiAgJ2RlYnJpcycsXG4gICdkaWFiZXRlcycsXG4gICdlbmVyZ3knLFxuICAnZXF1aXBtZW50JyxcbiAgJ2VsaycsXG4gICdleGNyZXRpb24nLFxuICAnZXhwZXJ0aXNlJyxcbiAgJ2Zsb3VuZGVyJyxcbiAgJ2Z1bicsXG4gICdnYWxsb3dzJyxcbiAgJ2dhcmJhZ2UnLFxuICAnZ3JhZmZpdGknLFxuICAnaGVhZHF1YXJ0ZXJzJyxcbiAgJ2hlYWx0aCcsXG4gICdoZXJwZXMnLFxuICAnaGlnaGppbmtzJyxcbiAgJ2hvbWV3b3JrJyxcbiAgJ2hvdXNld29yaycsXG4gICdpbmZvcm1hdGlvbicsXG4gICdqZWFucycsXG4gICdqdXN0aWNlJyxcbiAgJ2t1ZG9zJyxcbiAgJ2xhYm91cicsXG4gICdsaXRlcmF0dXJlJyxcbiAgJ21hY2hpbmVyeScsXG4gICdtYWNrZXJlbCcsXG4gICdtZWRpYScsXG4gICdtZXdzJyxcbiAgJ21vb3NlJyxcbiAgJ211c2ljJyxcbiAgJ25ld3MnLFxuICAncGlrZScsXG4gICdwbGFua3RvbicsXG4gICdwbGllcnMnLFxuICAncG9sbHV0aW9uJyxcbiAgJ3ByZW1pc2VzJyxcbiAgJ3JhaW4nLFxuICAncmVzZWFyY2gnLFxuICAncmljZScsXG4gICdzYWxtb24nLFxuICAnc2Npc3NvcnMnLFxuICAnc2VyaWVzJyxcbiAgJ3Nld2FnZScsXG4gICdzaGFtYmxlcycsXG4gICdzaHJpbXAnLFxuICAnc3BlY2llcycsXG4gICdzdGFmZicsXG4gICdzd2luZScsXG4gICd0cm91dCcsXG4gICd0cmFmZmljJyxcbiAgJ3RyYW5zcG9yYXRpb24nLFxuICAndHVuYScsXG4gICd3ZWFsdGgnLFxuICAnd2VsZmFyZScsXG4gICd3aGl0aW5nJyxcbiAgJ3dpbGRlYmVlc3QnLFxuICAnd2lsZGxpZmUnLFxuICAneW91JyxcbiAgLy8gUmVnZXhlcy5cbiAgL3BveCQvaSwgLy8gXCJjaGlja3BveFwiLCBcInNtYWxscG94XCJcbiAgL29pcyQvaSxcbiAgL2RlZXIkL2ksIC8vIFwiZGVlclwiLCBcInJlaW5kZWVyXCJcbiAgL2Zpc2gkL2ksIC8vIFwiZmlzaFwiLCBcImJsb3dmaXNoXCIsIFwiYW5nZWxmaXNoXCJcbiAgL3NoZWVwJC9pLFxuICAvbWVhc2xlcyQvaSxcbiAgL1teYWVpb3VdZXNlJC9pLCAvLyBcImNoaW5lc2VcIiwgXCJqYXBhbmVzZVwiXG5dLmZvckVhY2goUGx1cmFsaXplLmFkZFVuY291bnRhYmxlUnVsZSk7XG5cbkBQaXBlKHsgbmFtZTogJ3BsdXJhbCcgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQbHVyYWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZSkge1xuICAgIHJldHVybiBQbHVyYWxpemUucGx1cmFsaXplKHZhbHVlKTtcbiAgfVxufVxuIl19