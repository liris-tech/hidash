import _ from 'lodash';

// =====================================================================================================================

/**
 * Extracts lines from text satisfying some conditions.
 *
 * @since 0.1.0
 * @category String
 * @param {string} text The text to be processed.
 * @param {Object} [options] Extraction parameters.
 * @param {number|RegExp|string|function} [options.from] From which line to start extracting.
 * @param {number|RegExp|string|function} [options.to] At which line to stop extracting.
 * @param {RegExp|string|function} [options.matches] Matching criteria to determine whether add the line to the results.
 * @returns {[string]} Returns the lines satisfying the extraction parameters.
 * @example
 *
 * const text=(
 * `This is
 * an example of
 * a text
 * // with a comment inside
 * the end.`
 * );
 *
 * selectLines(text);
 * // => ['This is', 'an example of', 'a text', '// with a comment inside', 'the end.']
 *
 * selectLines(text, {from: 1});
 * // => ['an example of', 'a text', '// with a comment inside', 'the end.']
 *
 * selectLines(text, {from: 'text', to: 4});
 * // => ['a text', '// with a comment inside']
 *
 * selectLines(text, {from: 0, to: 4, matches: line => line.startsWith('//')});
 * // => ['// with a comment inside']
 */
export function selectLines(text, options) {
    if (!_.isString(text)) {
        throw new Error(`first argument should be a string. Received ${text}`);
    }

    const { from, to, matches} = options || {};

    if (!_.some([_.isNil, _.isNumber, _.isRegExp, _.isString, _.isFunction], (p) => p(from))) {
        throw new Error(`Received start: ${from}. Must be one of the following:
							a line number, a regexp condition, a substring or a predicate`);
    }

    if (!_.some([_.isNil, _.isNumber, _.isRegExp, _.isString, _.isFunction], (p) => p(to))) {
        throw new Error(`Received end: ${to}. Must be one of the following:
							a line number, a regexp condition, a substring or a predicate`);
    }

    if (!_.some([_.isNil, _.isRegExp, _.isString, _.isFunction], (p) => p(matches))) {
        throw new Error(`Received contains: ${matches}. Must be one of the following:
							a regexp condition, a substring or a predicate`);
    }

    const selectedLines = [];

    let fromCondition = false;
    let toCondition = false;

    for (const [i, line] of text.split('\n').entries()) {
        if ((_.isNil(from)) ||
            (_.isNumber(from) && i >= from) ||
            (_.isRegExp(from) && from.test(line)) ||
            (_.isString(from) && line.includes(from)) ||
            (_.isFunction(from) && from(line))) {
            fromCondition = true;
        }

        if ((_.isNumber(to) && i >= to) ||
            (_.isRegExp(to) && to.test(line) && fromCondition === true) ||
            (_.isString(to) && line.includes(to) && fromCondition === true) ||
            (_.isFunction(to) && to(line) && fromCondition === true)) {
            toCondition = true;
        }

        const isMatch = (
            (_.isNil(matches)) ||
            (_.isString(matches) && line.includes(matches)) ||
            (_.isRegExp(matches) && matches.test(line)) ||
            (_.isFunction(matches) && matches(line))
        );

        if (fromCondition && !toCondition && isMatch) {
            selectedLines.push(line);
        }
    }

    return selectedLines;
}