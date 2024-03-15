import _ from 'lodash';

// =====================================================================================================================

/**
 * Determines whether an argument is a plain object.
 *
 * @since 0.2.0
 * @category Lang
 * @param {*} arg The argument to be tested.
 * @returns {Boolean} Returns whether arg is an object
 *
 * @example
 * isObject({});
 * // => returns true.
 *
 * @example
 * isObject([]);
 * // => returns false.
 *
 * @example
 * isObject(new Date());
 * // => returns false.
 */
export function isObject(arg) {
    return _.isPlainObject(arg);
}


export function isNotObject(arg) {
    return !isObject(arg);
}
