/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// NG2
import { Injectable, Pipe } from '@angular/core';
// Rule storage - pluralize and singularize need to be run sequentially,
// while other rules can be optimized using an object for instant lookups.
/** @type {?} */
var pluralRules = [];
/** @type {?} */
var singularRules = [];
/** @type {?} */
var uncountables = {};
/** @type {?} */
var irregularPlurals = {};
/** @type {?} */
var irregularSingles = {};
/**
 * Title case a string.
 * @param {?} str
 * @return {?}
 */
function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}
/**
 * Sanitize a pluralization rule to a usable regular expression.
 * @param {?} rule
 * @return {?}
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
 * @param {?} word
 * @param {?} token
 * @return {?}
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
 * @param {?} str
 * @param {?} args
 * @return {?}
 */
function interpolate(str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
        return args[index] || '';
    });
}
/**
 * Sanitize a word by passing in the word and sanitization rules.
 * @param {?} token
 * @param {?} word
 * @param {?} collection
 * @return {?}
 */
function sanitizeWord(token, word, collection) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
        return word;
    }
    /** @type {?} */
    var len = collection.length;
    var _loop_1 = function () {
        /** @type {?} */
        var rule = collection[len];
        // If the rule passes, return the replacement.
        if (rule[0].test(word)) {
            return { value: word.replace(rule[0], function (match, index, words) {
                    /** @type {?} */
                    var result = interpolate(rule[1], [match, index, words]);
                    if (match === '') {
                        return restoreCase(words[index - 1], result);
                    }
                    return restoreCase(match, result);
                }) };
        }
    };
    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return word;
}
/**
 * Replace a word with the updated word.
 * @param {?} replaceMap
 * @param {?} keepMap
 * @param {?} rules
 * @return {?}
 */
function replaceWord(replaceMap, keepMap, rules) {
    return function (word) {
        // Get the correct token and case restoration functions.
        /** @type {?} */
        var token = word.toLowerCase();
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
var Pluralize = /** @class */ (function () {
    function Pluralize() {
    }
    /**
     * @param {?} word
     * @param {?=} count
     * @param {?=} inclusive
     * @return {?}
     */
    Pluralize.pluralize = /**
     * @param {?} word
     * @param {?=} count
     * @param {?=} inclusive
     * @return {?}
     */
    function (word, count, inclusive) {
        if (count === void 0) { count = 1; }
        /** @type {?} */
        var pluralized = count === 1 ? Pluralize.singular(word) : Pluralize.plural(word);
        return (inclusive ? count + " " : '') + pluralized;
    };
    /**
     * @param {?} word
     * @return {?}
     */
    Pluralize.singular = /**
     * @param {?} word
     * @return {?}
     */
    function (word) {
        return replaceWord(irregularSingles, irregularPlurals, pluralRules)(word);
    };
    /**
     * @param {?} word
     * @return {?}
     */
    Pluralize.plural = /**
     * @param {?} word
     * @return {?}
     */
    function (word) {
        return replaceWord(irregularPlurals, irregularSingles, singularRules)(word);
    };
    /**
     * @param {?} rule
     * @param {?} replacement
     * @return {?}
     */
    Pluralize.addPluralRule = /**
     * @param {?} rule
     * @param {?} replacement
     * @return {?}
     */
    function (rule, replacement) {
        pluralRules.push([sanitizeRule(rule), replacement]);
    };
    /**
     * @param {?} rule
     * @param {?} replacement
     * @return {?}
     */
    Pluralize.addSingularRule = /**
     * @param {?} rule
     * @param {?} replacement
     * @return {?}
     */
    function (rule, replacement) {
        singularRules.push([sanitizeRule(rule), replacement]);
    };
    /**
     * @param {?} word
     * @return {?}
     */
    Pluralize.addUncountableRule = /**
     * @param {?} word
     * @return {?}
     */
    function (word) {
        if (typeof word === 'string') {
            uncountables[word.toLowerCase()] = true;
            return;
        }
        // Set singular and plural references for the word.
        Pluralize.addPluralRule(word, '$0');
        Pluralize.addSingularRule(word, '$0');
    };
    /**
     * @param {?} single
     * @param {?} plural
     * @return {?}
     */
    Pluralize.addIrregularRule = /**
     * @param {?} single
     * @param {?} plural
     * @return {?}
     */
    function (single, plural) {
        /** @type {?} */
        var one = plural.toLowerCase();
        /** @type {?} */
        var many = single.toLowerCase();
        irregularSingles[one] = many;
        irregularPlurals[many] = one;
    };
    return Pluralize;
}());
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
].forEach(function (rule) {
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
].forEach(function (rule) {
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
].forEach(function (rule) {
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
var PluralPipe = /** @class */ (function () {
    function PluralPipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    PluralPipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Pluralize.pluralize(value);
    };
    PluralPipe.decorators = [
        { type: Pipe, args: [{ name: 'plural' },] },
        { type: Injectable }
    ];
    return PluralPipe;
}());
export { PluralPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1cmFsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInBpcGVzL3BsdXJhbC9QbHVyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7SUFJNUQsV0FBVyxHQUFHLEVBQUU7O0lBQ2hCLGFBQWEsR0FBRyxFQUFFOztJQUNsQixZQUFZLEdBQUcsRUFBRTs7SUFDakIsZ0JBQWdCLEdBQUcsRUFBRTs7SUFDckIsZ0JBQWdCLEdBQUcsRUFBRTs7Ozs7O0FBTXpCLHFCQUFxQixHQUFXO0lBQzlCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25FLENBQUM7Ozs7OztBQUtELHNCQUFzQixJQUFxQjtJQUN6QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDOzs7Ozs7OztBQU1ELHFCQUFxQixJQUFZLEVBQUUsS0FBYTtJQUM5QyxtQ0FBbUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQy9CLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzVCO0lBRUQsbUNBQW1DO0lBQ25DLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNyQyxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQjtJQUVELGtDQUFrQztJQUNsQyxPQUFPLEtB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TyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQUxGLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Z0JBQ3ZCLFVBQVU7O0lBS1gsaUJBQUM7Q0FBQSxBQU5ELElBTUM7U0FKWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIFJ1bGUgc3RvcmFnZSAtIHBsdXJhbGl6ZSBhbmQgc2luZ3VsYXJpemUgbmVlZCB0byBiZSBydW4gc2VxdWVudGlhbGx5LFxuLy8gd2hpbGUgb3RoZXIgcnVsZXMgY2FuIGJlIG9wdGltaXplZCB1c2luZyBhbiBvYmplY3QgZm9yIGluc3RhbnQgbG9va3Vwcy5cbmxldCBwbHVyYWxSdWxlcyA9IFtdO1xubGV0IHNpbmd1bGFyUnVsZXMgPSBbXTtcbmxldCB1bmNvdW50YWJsZXMgPSB7fTtcbmxldCBpcnJlZ3VsYXJQbHVyYWxzID0ge307XG5sZXQgaXJyZWd1bGFyU2luZ2xlcyA9IHt9O1xuXG4vKipcbiAqIFRpdGxlIGNhc2UgYSBzdHJpbmcuXG4gKiBAcGFyYW0gc3RyXG4gKi9cbmZ1bmN0aW9uIHRvVGl0bGVDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIHBsdXJhbGl6YXRpb24gcnVsZSB0byBhIHVzYWJsZSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXplUnVsZShydWxlOiBSZWdFeHAgfCBzdHJpbmcpOiBSZWdFeHAge1xuICBpZiAodHlwZW9mIHJ1bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcnVsZSArICckJywgJ2knKTtcbiAgfVxuICByZXR1cm4gcnVsZTtcbn1cblxuLyoqXG4gKiBQYXNzIGluIGEgd29yZCB0b2tlbiB0byBwcm9kdWNlIGEgZnVuY3Rpb24gdGhhdCBjYW4gcmVwbGljYXRlIHRoZSBjYXNlIG9uXG4gKiBhbm90aGVyIHdvcmQuXG4gKi9cbmZ1bmN0aW9uIHJlc3RvcmVDYXNlKHdvcmQ6IHN0cmluZywgdG9rZW46IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIFVwcGVyIGNhc2VkIHdvcmRzLiBFLmcuIFwiSEVMTE9cIi5cbiAgaWYgKHdvcmQgPT09IHdvcmQudG9VcHBlckNhc2UoKSkge1xuICAgIHJldHVybiB0b2tlbi50b1VwcGVyQ2FzZSgpO1xuICB9XG5cbiAgLy8gVGl0bGUgY2FzZWQgd29yZHMuIEUuZy4gXCJUaXRsZVwiLlxuICBpZiAod29yZFswXSA9PT0gd29yZFswXS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgcmV0dXJuIHRvVGl0bGVDYXNlKHRva2VuKTtcbiAgfVxuXG4gIC8vIExvd2VyIGNhc2VkIHdvcmRzLiBFLmcuIFwidGVzdFwiLlxuICByZXR1cm4gdG9rZW4udG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gKiBJbnRlcnBvbGF0ZSBhIHJlZ2V4cCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGludGVycG9sYXRlKHN0cjogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IHN0cmluZyB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFwkKFxcZHsxLDJ9KS9nLCAobWF0Y2gsIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIGFyZ3NbaW5kZXhdIHx8ICcnO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSBhIHdvcmQgYnkgcGFzc2luZyBpbiB0aGUgd29yZCBhbmQgc2FuaXRpemF0aW9uIHJ1bGVzLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZVdvcmQodG9rZW46IHN0cmluZywgd29yZDogc3RyaW5nLCBjb2xsZWN0aW9uOiBSZWdFeHBbXSk6IHN0cmluZyB7XG4gIC8vIEVtcHR5IHN0cmluZyBvciBkb2Vzbid0IG5lZWQgZml4aW5nLlxuICBpZiAoIXRva2VuLmxlbmd0aCB8fCB1bmNvdW50YWJsZXMuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgcmV0dXJuIHdvcmQ7XG4gIH1cblxuICBsZXQgbGVuID0gY29sbGVjdGlvbi5sZW5ndGg7XG4gIC8vIEl0ZXJhdGUgb3ZlciB0aGUgc2FuaXRpemF0aW9uIHJ1bGVzIGFuZCB1c2UgdGhlIGZpcnN0IG9uZSB0byBtYXRjaC5cbiAgd2hpbGUgKGxlbi0tKSB7XG4gICAgbGV0IHJ1bGUgPSBjb2xsZWN0aW9uW2xlbl07XG4gICAgLy8gSWYgdGhlIHJ1bGUgcGFzc2VzLCByZXR1cm4gdGhlIHJlcGxhY2VtZW50LlxuICAgIGlmIChydWxlWzBdLnRlc3Qod29yZCkpIHtcbiAgICAgIHJldHVybiB3b3JkLnJlcGxhY2UocnVsZVswXSwgKG1hdGNoLCBpbmRleCwgd29yZHMpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGludGVycG9sYXRlKHJ1bGVbMV0sIFttYXRjaCwgaW5kZXgsIHdvcmRzXSk7XG4gICAgICAgIGlmIChtYXRjaCA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZHNbaW5kZXggLSAxXSwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2UobWF0Y2gsIHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdvcmQ7XG59XG5cbi8qKlxuICogUmVwbGFjZSBhIHdvcmQgd2l0aCB0aGUgdXBkYXRlZCB3b3JkLlxuICovXG5mdW5jdGlvbiByZXBsYWNlV29yZChyZXBsYWNlTWFwOiBhbnksIGtlZXBNYXA6IGFueSwgcnVsZXM6IGFueVtdKTogRnVuY3Rpb24ge1xuICByZXR1cm4gKHdvcmQpID0+IHtcbiAgICAvLyBHZXQgdGhlIGNvcnJlY3QgdG9rZW4gYW5kIGNhc2UgcmVzdG9yYXRpb24gZnVuY3Rpb25zLlxuICAgIGxldCB0b2tlbiA9IHdvcmQudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIENoZWNrIGFnYWluc3QgdGhlIGtlZXAgb2JqZWN0IG1hcC5cbiAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCB0b2tlbik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUgcmVwbGFjZW1lbnQgbWFwIGZvciBhIGRpcmVjdCB3b3JkIHJlcGxhY2VtZW50LlxuICAgIGlmIChyZXBsYWNlTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmQsIHJlcGxhY2VNYXBbdG9rZW5dKTtcbiAgICB9XG5cbiAgICAvLyBSdW4gYWxsIHRoZSBydWxlcyBhZ2FpbnN0IHRoZSB3b3JkLlxuICAgIHJldHVybiBzYW5pdGl6ZVdvcmQodG9rZW4sIHdvcmQsIHJ1bGVzKTtcbiAgfTtcbn1cblxuY2xhc3MgUGx1cmFsaXplIHtcbiAgc3RhdGljIHBsdXJhbGl6ZSh3b3JkLCBjb3VudCA9IDEsIGluY2x1c2l2ZT8pIHtcbiAgICBsZXQgcGx1cmFsaXplZCA9IGNvdW50ID09PSAxID8gUGx1cmFsaXplLnNpbmd1bGFyKHdvcmQpIDogUGx1cmFsaXplLnBsdXJhbCh3b3JkKTtcbiAgICByZXR1cm4gKGluY2x1c2l2ZSA/IGAke2NvdW50fSBgIDogJycpICsgcGx1cmFsaXplZDtcbiAgfVxuXG4gIHN0YXRpYyBzaW5ndWxhcih3b3JkKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VXb3JkKGlycmVndWxhclNpbmdsZXMsIGlycmVndWxhclBsdXJhbHMsIHBsdXJhbFJ1bGVzKSh3b3JkKTtcbiAgfVxuXG4gIHN0YXRpYyBwbHVyYWwod29yZCkge1xuICAgIHJldHVybiByZXBsYWNlV29yZChpcnJlZ3VsYXJQbHVyYWxzLCBpcnJlZ3VsYXJTaW5nbGVzLCBzaW5ndWxhclJ1bGVzKSh3b3JkKTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRQbHVyYWxSdWxlKHJ1bGUsIHJlcGxhY2VtZW50KSB7XG4gICAgcGx1cmFsUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFNpbmd1bGFyUnVsZShydWxlLCByZXBsYWNlbWVudCkge1xuICAgIHNpbmd1bGFyUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFVuY291bnRhYmxlUnVsZSh3b3JkKSB7XG4gICAgaWYgKHR5cGVvZiB3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgdW5jb3VudGFibGVzW3dvcmQudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCBzaW5ndWxhciBhbmQgcGx1cmFsIHJlZmVyZW5jZXMgZm9yIHRoZSB3b3JkLlxuICAgIFBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHdvcmQsICckMCcpO1xuICAgIFBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUod29yZCwgJyQwJyk7XG4gIH1cblxuICBzdGF0aWMgYWRkSXJyZWd1bGFyUnVsZShzaW5nbGUsIHBsdXJhbCkge1xuICAgIGxldCBvbmUgPSBwbHVyYWwudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgbWFueSA9IHNpbmdsZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaXJyZWd1bGFyU2luZ2xlc1tvbmVdID0gbWFueTtcbiAgICBpcnJlZ3VsYXJQbHVyYWxzW21hbnldID0gb25lO1xuICB9XG59XG5cbi8qKlxuICogSXJyZWd1bGFyIHJ1bGVzLlxuICovXG5bXG4gIC8vIFByb25vdW5zLlxuICBbJ0knLCAnd2UnXSxcbiAgWydtZScsICd1cyddLFxuICBbJ2hlJywgJ3RoZXknXSxcbiAgWydzaGUnLCAndGhleSddLFxuICBbJ3RoZW0nLCAndGhlbSddLFxuICBbJ215c2VsZicsICdvdXJzZWx2ZXMnXSxcbiAgWyd5b3Vyc2VsZicsICd5b3Vyc2VsdmVzJ10sXG4gIFsnaXRzZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgWydoZXJzZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgWydoaW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgWyd0aGVtc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gIFsnaXMnLCAnYXJlJ10sXG4gIFsndGhpcycsICd0aGVzZSddLFxuICBbJ3RoYXQnLCAndGhvc2UnXSxcbiAgLy8gV29yZHMgZW5kaW5nIGluIHdpdGggYSBjb25zb25hbnQgYW5kIGBvYC5cbiAgWydlY2hvJywgJ2VjaG9lcyddLFxuICBbJ2RpbmdvJywgJ2RpbmdvZXMnXSxcbiAgWyd2b2xjYW5vJywgJ3ZvbGNhbm9lcyddLFxuICBbJ3Rvcm5hZG8nLCAndG9ybmFkb2VzJ10sXG4gIFsndG9ycGVkbycsICd0b3JwZWRvZXMnXSxcbiAgLy8gRW5kcyB3aXRoIGB1c2AuXG4gIFsnZ2VudXMnLCAnZ2VuZXJhJ10sXG4gIFsndmlzY3VzJywgJ3Zpc2NlcmEnXSxcbiAgLy8gRW5kcyB3aXRoIGBtYWAuXG4gIFsnc3RpZ21hJywgJ3N0aWdtYXRhJ10sXG4gIFsnc3RvbWEnLCAnc3RvbWF0YSddLFxuICBbJ2RvZ21hJywgJ2RvZ21hdGEnXSxcbiAgWydsZW1tYScsICdsZW1tYXRhJ10sXG4gIFsnc2NoZW1hJywgJ3NjaGVtYXRhJ10sXG4gIFsnYW5hdGhlbWEnLCAnYW5hdGhlbWF0YSddLFxuICAvLyBPdGhlciBpcnJlZ3VsYXIgcnVsZXMuXG4gIFsnb3gnLCAnb3hlbiddLFxuICBbJ2F4ZScsICdheGVzJ10sXG4gIFsnZGllJywgJ2RpY2UnXSxcbiAgWyd5ZXMnLCAneWVzZXMnXSxcbiAgWydmb290JywgJ2ZlZXQnXSxcbiAgWydlYXZlJywgJ2VhdmVzJ10sXG4gIFsnZ29vc2UnLCAnZ2Vlc2UnXSxcbiAgWyd0b290aCcsICd0ZWV0aCddLFxuICBbJ3F1aXonLCAncXVpenplcyddLFxuICBbJ2h1bWFuJywgJ2h1bWFucyddLFxuICBbJ3Byb29mJywgJ3Byb29mcyddLFxuICBbJ2NhcnZlJywgJ2NhcnZlcyddLFxuICBbJ3ZhbHZlJywgJ3ZhbHZlcyddLFxuICBbJ3RoaWVmJywgJ3RoaWV2ZXMnXSxcbiAgWydnZW5pZScsICdnZW5pZXMnXSxcbiAgWydncm9vdmUnLCAnZ3Jvb3ZlcyddLFxuICBbJ3BpY2theGUnLCAncGlja2F4ZXMnXSxcbiAgWyd3aGlza2V5JywgJ3doaXNraWVzJ10sXG5dLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgcmV0dXJuIFBsdXJhbGl6ZS5hZGRJcnJlZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xufSk7XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBydWxlcy5cbiAqL1xuW1xuICBbL3M/JC9pLCAncyddLFxuICBbLyhbXmFlaW91XWVzZSkkL2ksICckMSddLFxuICBbLyhheHx0ZXN0KWlzJC9pLCAnJDFlcyddLFxuICBbLyhhbGlhc3xbXmFvdV11c3x0bGFzfGdhc3xyaXMpJC9pLCAnJDFlcyddLFxuICBbLyhlW21uXXUpcz8kL2ksICckMXMnXSxcbiAgWy8oW15sXWlhc3xbYWVpb3VdbGFzfFtlbWp6cl1hc3xbaXVdYW0pJC9pLCAnJDEnXSxcbiAgWy8oYWx1bW58c3lsbGFifG9jdG9wfHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMWknXSxcbiAgWy8oYWx1bW58YWxnfHZlcnRlYnIpKD86YXxhZSkkL2ksICckMWFlJ10sXG4gIFsvKHNlcmFwaHxjaGVydWIpKD86aW0pPyQvaSwgJyQxaW0nXSxcbiAgWy8oaGVyfGF0fGdyKW8kL2ksICckMW9lcyddLFxuICBbLyhhZ2VuZHxhZGRlbmR8bWlsbGVubml8ZGF0fGV4dHJlbXxiYWN0ZXJpfGRlc2lkZXJhdHxzdHJhdHxjYW5kZWxhYnJ8ZXJyYXR8b3Z8c3ltcG9zaXxjdXJyaWN1bHxhdXRvbWF0fHF1b3IpKD86YXx1bSkkL2ksICckMWEnXSxcbiAgWy8oYXBoZWxpfGh5cGVyYmF0fHBlcmloZWxpfGFzeW5kZXR8bm91bWVufHBoZW5vbWVufGNyaXRlcml8b3JnYW58cHJvbGVnb21lbnxoZWRyfGF1dG9tYXQpKD86YXxvbikkL2ksICckMWEnXSxcbiAgWy9zaXMkL2ksICdzZXMnXSxcbiAgWy8oPzooa25pfHdpfGxpKWZlfChhcnxsfGVhfGVvfG9hfGhvbylmKSQvaSwgJyQxJDJ2ZXMnXSxcbiAgWy8oW15hZWlvdXldfHF1KXkkL2ksICckMWllcyddLFxuICBbLyhbXmNoXVtpZW9dW2xuXSlleSQvaSwgJyQxaWVzJ10sXG4gIFsvKHh8Y2h8c3N8c2h8enopJC9pLCAnJDFlcyddLFxuICBbLyhtYXRyfGNvZHxtdXJ8c2lsfHZlcnR8aW5kfGFwcGVuZCkoPzppeHxleCkkL2ksICckMWljZXMnXSxcbiAgWy8obXxsKSg/OmljZXxvdXNlKSQvaSwgJyQxaWNlJ10sXG4gIFsvKHBlKSg/OnJzb258b3BsZSkkL2ksICckMW9wbGUnXSxcbiAgWy8oY2hpbGQpKD86cmVuKT8kL2ksICckMXJlbiddLFxuICBbL2VhdXgkL2ksICckMCddLFxuICBbL21bYWVdbiQvaSwgJ21lbiddLFxuICBbJ3Rob3UnLCAneW91J10sXG5dLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgcmV0dXJuIFBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xufSk7XG5cbi8qKlxuICogU2luZ3VsYXJpemF0aW9uIHJ1bGVzLlxuICovXG5bXG4gIFsvcyQvaSwgJyddLFxuICBbLyhzcykkL2ksICckMSddLFxuICBbLygoYSluYWx5fChiKWF8KGQpaWFnbm98KHApYXJlbnRoZXwocClyb2dub3wocyl5bm9wfCh0KWhlKSg/OnNpc3xzZXMpJC9pLCAnJDFzaXMnXSxcbiAgWy8oXmFuYWx5KSg/OnNpc3xzZXMpJC9pLCAnJDFzaXMnXSxcbiAgWy8od2l8a25pfCg/OmFmdGVyfGhhbGZ8aGlnaHxsb3d8bWlkfG5vbnxuaWdodHxbXlxcd118XilsaSl2ZXMkL2ksICckMWZlJ10sXG4gIFsvKGFyfCg/OndvfFthZV0pbHxbZW9dW2FvXSl2ZXMkL2ksICckMWYnXSxcbiAgWy8oW15hZWlvdXldfHF1KWllcyQvaSwgJyQxeSddLFxuICBbLyheW3BsXXx6b21ifF4oPzpuZWNrKT90fFthZW9dW2x0XXxjdXQpaWVzJC9pLCAnJDFpZSddLFxuICBbLyhcXGIoPzptb258c21pbCkpaWVzJC9pLCAnJDFleSddLFxuICBbLyhtfGwpaWNlJC9pLCAnJDFvdXNlJ10sXG4gIFsvKHNlcmFwaHxjaGVydWIpaW0kL2ksICckMSddLFxuICBbLyh4fGNofHNzfHNofHp6fHR0b3xnb3xjaG98YWxpYXN8W15hb3VddXN8dGxhc3xnYXN8KD86aGVyfGF0fGdyKW98cmlzKSg/OmVzKT8kL2ksICckMSddLFxuICBbLyhlW21uXXUpcz8kL2ksICckMSddLFxuICBbLyhtb3ZpZXx0d2VsdmUpcyQvaSwgJyQxJ10sXG4gIFsvKGNyaXN8dGVzdHxkaWFnbm9zKSg/OmlzfGVzKSQvaSwgJyQxaXMnXSxcbiAgWy8oYWx1bW58c3lsbGFifG9jdG9wfHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMXVzJ10sXG4gIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfHF1b3IpYSQvaSwgJyQxdW0nXSxcbiAgWy8oYXBoZWxpfGh5cGVyYmF0fHBlcmloZWxpfGFzeW5kZXR8bm91bWVufHBoZW5vbWVufGNyaXRlcml8b3JnYW58cHJvbGVnb21lbnxoZWRyfGF1dG9tYXQpYSQvaSwgJyQxb24nXSxcbiAgWy8oYWx1bW58YWxnfHZlcnRlYnIpYWUkL2ksICckMWEnXSxcbiAgWy8oY29kfG11cnxzaWx8dmVydHxpbmQpaWNlcyQvaSwgJyQxZXgnXSxcbiAgWy8obWF0cnxhcHBlbmQpaWNlcyQvaSwgJyQxaXgnXSxcbiAgWy8ocGUpKHJzb258b3BsZSkkL2ksICckMXJzb24nXSxcbiAgWy8oY2hpbGQpcmVuJC9pLCAnJDEnXSxcbiAgWy8oZWF1KXg/JC9pLCAnJDEnXSxcbiAgWy9tZW4kL2ksICdtYW4nXSxcbl0uZm9yRWFjaCgocnVsZSkgPT4ge1xuICByZXR1cm4gUGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbn0pO1xuXG4vKipcbiAqIFVuY291bnRhYmxlIHJ1bGVzLlxuICovXG5bXG4gIC8vIFNpbmd1bGFyIHdvcmRzIHdpdGggbm8gcGx1cmFscy5cbiAgJ2FkdmljZScsXG4gICdhZHVsdGhvb2QnLFxuICAnYWdlbmRhJyxcbiAgJ2FpZCcsXG4gICdhbGNvaG9sJyxcbiAgJ2FtbW8nLFxuICAnYXRobGV0aWNzJyxcbiAgJ2Jpc29uJyxcbiAgJ2Jsb29kJyxcbiAgJ2JyZWFtJyxcbiAgJ2J1ZmZhbG8nLFxuICAnYnV0dGVyJyxcbiAgJ2NhcnAnLFxuICAnY2FzaCcsXG4gICdjaGFzc2lzJyxcbiAgJ2NoZXNzJyxcbiAgJ2Nsb3RoaW5nJyxcbiAgJ2NvbW1lcmNlJyxcbiAgJ2NvZCcsXG4gICdjb29wZXJhdGlvbicsXG4gICdjb3JwcycsXG4gICdkaWdlc3Rpb24nLFxuICAnZGVicmlzJyxcbiAgJ2RpYWJldGVzJyxcbiAgJ2VuZXJneScsXG4gICdlcXVpcG1lbnQnLFxuICAnZWxrJyxcbiAgJ2V4Y3JldGlvbicsXG4gICdleHBlcnRpc2UnLFxuICAnZmxvdW5kZXInLFxuICAnZnVuJyxcbiAgJ2dhbGxvd3MnLFxuICAnZ2FyYmFnZScsXG4gICdncmFmZml0aScsXG4gICdoZWFkcXVhcnRlcnMnLFxuICAnaGVhbHRoJyxcbiAgJ2hlcnBlcycsXG4gICdoaWdoamlua3MnLFxuICAnaG9tZXdvcmsnLFxuICAnaG91c2V3b3JrJyxcbiAgJ2luZm9ybWF0aW9uJyxcbiAgJ2plYW5zJyxcbiAgJ2p1c3RpY2UnLFxuICAna3Vkb3MnLFxuICAnbGFib3VyJyxcbiAgJ2xpdGVyYXR1cmUnLFxuICAnbWFjaGluZXJ5JyxcbiAgJ21hY2tlcmVsJyxcbiAgJ21lZGlhJyxcbiAgJ21ld3MnLFxuICAnbW9vc2UnLFxuICAnbXVzaWMnLFxuICAnbmV3cycsXG4gICdwaWtlJyxcbiAgJ3BsYW5rdG9uJyxcbiAgJ3BsaWVycycsXG4gICdwb2xsdXRpb24nLFxuICAncHJlbWlzZXMnLFxuICAncmFpbicsXG4gICdyZXNlYXJjaCcsXG4gICdyaWNlJyxcbiAgJ3NhbG1vbicsXG4gICdzY2lzc29ycycsXG4gICdzZXJpZXMnLFxuICAnc2V3YWdlJyxcbiAgJ3NoYW1ibGVzJyxcbiAgJ3NocmltcCcsXG4gICdzcGVjaWVzJyxcbiAgJ3N0YWZmJyxcbiAgJ3N3aW5lJyxcbiAgJ3Ryb3V0JyxcbiAgJ3RyYWZmaWMnLFxuICAndHJhbnNwb3JhdGlvbicsXG4gICd0dW5hJyxcbiAgJ3dlYWx0aCcsXG4gICd3ZWxmYXJlJyxcbiAgJ3doaXRpbmcnLFxuICAnd2lsZGViZWVzdCcsXG4gICd3aWxkbGlmZScsXG4gICd5b3UnLFxuICAvLyBSZWdleGVzLlxuICAvcG94JC9pLCAvLyBcImNoaWNrcG94XCIsIFwic21hbGxwb3hcIlxuICAvb2lzJC9pLFxuICAvZGVlciQvaSwgLy8gXCJkZWVyXCIsIFwicmVpbmRlZXJcIlxuICAvZmlzaCQvaSwgLy8gXCJmaXNoXCIsIFwiYmxvd2Zpc2hcIiwgXCJhbmdlbGZpc2hcIlxuICAvc2hlZXAkL2ksXG4gIC9tZWFzbGVzJC9pLFxuICAvW15hZWlvdV1lc2UkL2ksIC8vIFwiY2hpbmVzZVwiLCBcImphcGFuZXNlXCJcbl0uZm9yRWFjaChQbHVyYWxpemUuYWRkVW5jb3VudGFibGVSdWxlKTtcblxuQFBpcGUoeyBuYW1lOiAncGx1cmFsJyB9KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBsdXJhbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlKSB7XG4gICAgcmV0dXJuIFBsdXJhbGl6ZS5wbHVyYWxpemUodmFsdWUpO1xuICB9XG59XG4iXX0=