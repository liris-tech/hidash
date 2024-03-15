import { mapLeaves } from './mapLeaves.js'
import { isNotObject } from './isObject.js';

import _ from 'lodash';

// =====================================================================================================================

/**
 * Determines whether an object conforms to the Wildcard Object Notation (WON).
 * The Wildcard Object Notation is a succinct way to denote redundant substructures in an object, using the '*'
 * character as a wildcard key.
 *
 * @since 0.2.0
 * @category Object
 * @param {Object} obj The object to be tested.
 * @param {Object} [options] Options.
 * @param {Function} [options.isLeaf=isNotObject] A predicate determining which values qualify as a leaf.
 * @param {Boolean} [options.explain=false] Whether explanations should be given if obj is not a valid WON.
 * @returns {Boolean|Object} Returns whether the object conforms to WON. If explain is false, returns simply a boolean,
 * otherwise, returns an object of the shape {result, reason?}
 *
 * @example
 * isValidWON({
 *     a: {c: 1},
 *     b: {c: 1}
 * });
 * // => returns true. A standard object is also a valid WON.
 *
 * @example
 * The previous example can also be written as follows:
 * isValidWON({
 *     *: {c: 1},
 *     a: {},
 *     b: {}
 * });
 * // => returns true.
 *
 * @example
 * However, ambiguity is not allowed. The following example is incorrect:
 * isValidWON({
 *   *: {c: 1},
 *   a: {c: 2},
 *   b: {}
 * });
 * // => returns false.
 *
 * @example
 * Previous example with explain=true:
 * isValidWON({
 *   *: {c: 1},
 *   a: {c: 2},
 *   b: {}
 * }, {explain: true});
 * // => returns {result: false, reason: ""}.
 */
export function isValidWON(obj, {isLeaf=isNotObject, explain=false}={}) {
    if (isLeaf(obj)) {
        throw new Error('argument to isValidWON cannot be a leaf');
    }
    const {result, reason} = _isValidWON(obj, {isLeaf, explain, currentPath: []});

    if (explain && result) {
        return {result}
    }
    else if (explain) {
        return {result, reason}
    }
    else {
        return result;
    }
}


function _isValidWON(subObj, {isLeaf, currentPath}) {
    if (isLeaf(subObj)) {
        return {result: true};
    }
    else {
        const allKeys = _.keys(subObj);
        const [regularKeys, [wildcard]] = _.partition(allKeys, k => k != '*');
        if (wildcard) {
            // Given subObj = {'*': {c: {e: 1, f: 2}},
            //                   b: {c: {e: 2}}}}
            // subPathsThatShouldNotBePresentFromRegularKeys are [['c', 'e'], ['c', 'f']]
            //
            // If such paths would exist from regular keys, we will have a merge conflict.
            // From the example: subObj.*.c.e = 1, when subObj.b.c.e = 2
            // Notice also that {isLeaf: (v) => isLeaf(v) || _.isArray(v)} implies that subPaths to arrays also count as
            // subPaths that shouldn't exist from regular keys. The reason is the same: as there is no unambiguous way
            // to merge 2 arrays, a merge conflict will occur.
            const subPathsThatShouldNotBePresentFromRegularKeys = mapLeaves(subObj['*'], ((__, path) => path),
                {isLeaf: (v) => isLeaf(v) || _.isArray(v)});
            for (const k of regularKeys) {
                for (const path of subPathsThatShouldNotBePresentFromRegularKeys) {
                    if (_.has(subObj[k], path)) {
                        return {
                            result: false,
                            reason: `Conflict at paths ${currentPath.concat('*').concat(path).join('.')} and ${currentPath.concat(k).concat(path).join('.')}`
                        }
                    }
                }

                // Take care of situations like subObj = {'*': {c: {e: 1, f: 2}},
                //                                          b: {c: 2}}}
                // subObj.*.c = {e: 1, f: 2} vs subObj.b.c = 2 <= merge conflicts
                const testedSubPaths = {};
                for (const path of subPathsThatShouldNotBePresentFromRegularKeys.filter(path => path.length > 1)) {
                    for (let i=1; i<path.length; ++i) {
                        const subPath = path.slice(0, i).join('.');
                        if (!testedSubPaths[subPath]) {
                            const valueAtSubPath = _.get(subObj[k], subPath);
                            if (!_.isUndefined(valueAtSubPath) && isLeaf(valueAtSubPath)) {
                                return {
                                    result: false,
                                    reason: `Conflict at paths ${currentPath.concat('*').concat(subPath).join('.')} and ${currentPath.concat(k).concat(subPath).join('.')}`
                                }
                            }
                            testedSubPaths[subPath] = true;
                        }
                    }
                }
            }
        }
        for (const k of allKeys) {
            return _isValidWON(subObj[k], {isLeaf, currentPath: currentPath.concat(k)});
        }
        return {result: true};
    }
}