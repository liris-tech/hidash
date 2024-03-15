import { isValidWON } from './isValidWON.js';
import { isNotObject } from './isObject.js';

import _ from 'lodash';

// =====================================================================================================================

/**
 * Expands an object from its Wildcard Object Notation (WON) into the traditional one.
 * The Wildcard Object Notation is a succinct way to denote redundant substructures in an object, using the '*'
 * character as a wildcard key.
 *
 * @since 0.2.0
 * @category Object
 * @param {Object} obj The object conforming to WON.
 * @param {Object} [options] Options.
 * @param {Function} [options.isLeaf=isNotObject] A predicate determining which values qualify as a leaf.
 * @returns {Object} Returns the expanded object.
 *
 * @example
 * fromWON({
 *     *: {c: 1},
 *     a: {},
 *     b: {}
 * });
 * // => returns {a: {c: 1}, b: {c: 1}}
 *
 * @example
 * fromWON({
 *   a: {b: [{*: {d: 1}, c: {}}]},
 * });
 * // => returns {a: {b: [{c: {d: 1}}]}}
 */
export function fromWON(obj, {isLeaf=isNotObject}={}) {
    const validity = isValidWON(obj, {isLeaf, explain: true});
    if (!validity.result) {
        throw new Error(`${obj} not a valid WON because: ${validity.reason}`)
    }

    return _fromWON(obj, {isLeaf});
}


export function _fromWON(obj, {isLeaf}) {
    const [regularKeys, [wildcard]] = _.partition(_.keys(obj), k => k != '*');

    if (wildcard) {
        const newObj = {};
        for (const k of regularKeys) {
            newObj[k] = _.mergeWith({}, obj[wildcard], obj[k]);
        }
        return _fromWON(newObj, {isLeaf});
    }
    else if (!isLeaf(obj)) {
        if (_.isPlainObject(obj)) {
            const newObj = {};
            for (const k of regularKeys) {
                newObj[k] = _fromWON(obj[k], { isLeaf });
            }
            return newObj;
        }
        else if (_.isArray(obj)) {
            const newArr = [];
            for (const item of obj) {
                newArr.push(_fromWON(item, { isLeaf }));
            }
            return newArr;
        }
        else {
            throw new Error(`unexpected value ${obj}`);
        }
    }
    else {
        return obj;
    }
}