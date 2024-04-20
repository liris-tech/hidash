import { isNotObject } from './isObject.js';

import _ from 'lodash';

// =====================================================================================================================

/**
 * Recursively walks obj and transforms its leaves by applying f to them.
 *
 * @since 0.3.0
 * @category Collection
 * @param {Object} obj The object to be transformed.
 * @param {Function} f The function to be applied. Takes two arguments: the leaf and its path.
 * @param {Object} [options] Options.
 * @param {Function} [options.isLeaf=isNotObject] A predicate determining which values qualify as a leaf.
 * @returns {Object} The result of applying f on each leaf.
 *
 * @example
 * transformLeaves({
 *     a: {c: {e: 1}},
 *     b: {d: 2}
 * }, x => x + 1);
 * // => {a: {c: {e: 2}}, b: {d: 3}}
 *
 * transformLeaves({
 *     a: {b: 1},
 *     c: [2, [3]]
 * }, (value, path) => path.join('.'), {isLeaf: isNotObjectOrArray});
 * // => {a: {b: 'a.b'}, c: ['c.0', ['c.1.0']]}
 *
 */
export function transformLeaves(obj, f, {isLeaf=isNotObject}={}) {
    if (isLeaf(obj)) {
        throw new Error('argument to transformLeaves cannot be a leaf');
    }
    return _transformLeaves(obj, f, {isLeaf}, []);
}


function _transformLeaves(obj, f, {isLeaf}, path) {
    if (isLeaf(obj)) {
        return _.cloneDeep(f(obj, path));
    }
    else {
        if (_.isPlainObject(obj)) {
            const subObj = {};
            for (const k in obj) {
                subObj[k] = _transformLeaves(obj[k], f, {isLeaf}, path.concat(k));
            }
            return subObj;
        }
        else if (_.isArray(obj)) {
            const subArray = [];
            for (const i in obj) {
                subArray[i] = _transformLeaves(obj[i], f, {isLeaf}, path.concat(i));
            }
            return subArray;
        }
        else {
            throw new Error(`unexpected value of obj: ${obj}`);
        }
    }
}