import _ from 'lodash';

// =====================================================================================================================

/**
 * Checks recursively whether an object contains a key.
 *
 * @since 0.3.0
 * @category Object
 * @param {Object} obj The object to be recursively traversed.
 * @param {string} key The key that the object may or may not contain.
 * @returns {boolean} Returns whether the object contains the key at any level.
 * @example
 *
 * containsKeyDeep({a: 1}, 'a')
 * // => true
 *
 * containsKeyDeep({a: 1}, 'b')
 * // => false
 *
 * containsKeyDeep({a: {b: {c: 1}}, 'b'})
 * // => true
 *
 * containsKeyDeep({a: {b: {c: 1}}, 'd'})
 * // => false
 */
export function containsKeyDeep(obj, key) {
    if (_.isPlainObject(obj)) {
        const keys = _.keys(obj);
        if (keys.includes(key)) {
            return true
        }
        else {
            let containsKey = false;
            for (const k of keys) {
                const subObjectContainsKey = containsKeyDeep(obj[k], key);
                if (subObjectContainsKey) {
                    containsKey = true;
                }
            }
            return containsKey;
        }
    }
    else {
        return false;
    }
}
