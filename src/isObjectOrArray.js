import _ from 'lodash';

// =====================================================================================================================

/**
 * Determines whether an argument is an object or an array.
 *
 * @since 0.2.0
 * @category Lang
 * @param {*} arg The argument to be tested.
 * @returns {Boolean} Returns whether arg is an object or an array
 *
 * @example
 * isObjectOrArray({});
 * // => returns true.
 *
 * @example
 * isObjectOrArray([]);
 * // => returns true.
 *
 * @example
 * isObjectOrArray(new Date());
 * // => returns false.
 */
export function isObjectOrArray(arg) {
    return _.isPlainObject(arg) || _.isArray(arg);
}


export function isNotObjectOrArray(arg) {
    return !isObjectOrArray(arg);
}