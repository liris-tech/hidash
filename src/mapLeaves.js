import { isNotObject } from './isObject.js';

import _ from 'lodash';

// =====================================================================================================================

/**
 * Recursively walks the object and applies f to each leave.
 *
 * @since 0.2.0
 * @category Collection
 * @param {Object} obj The object to be tested.
 * @param {Function} f The function to be applied. Takes two arguments: the leaf and its path.
 * @param {Object} [options] Options.
 * @param {Function} [options.isLeaf=isNotObject] A predicate determining which values qualify as a leaf.
 * @returns {any[]} The results of applying f on each leaf.
 *
 * @example
 * isValidWON({
 *     a: {c: 1},
 *     b: {c: 1}
 * });
 * // => returns true. A standard object is also a valid WON.
 */
export function mapLeaves(obj, f, {isLeaf=isNotObject}={}) {
    if (isLeaf(obj)) {
        throw new Error('argument to mapLeaves cannot be a leaf');
    }
    return _mapLeaves(obj, f, {isLeaf, path: []});
}


function _mapLeaves(subObj, f, {isLeaf, path}) {
    if (isLeaf(subObj)) {
        return [f(subObj, path)];
    }
    else {
        let res = [];
        for (const k of _.keys(subObj)) {
            res = _.concat(res, _mapLeaves(subObj[k], f, {isLeaf, path: path.concat(k)}));
        }
        return res;
    }
}