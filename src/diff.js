import _ from 'lodash';

// =====================================================================================================================

/**
 * Converts 2 arrays and returns their difference.
 *
 * @since 0.0.1
 * @category Array
 * @param {[*]} as The first array to compare with the second one.
 * @param {[*]} bs The second array  to compare with the first one.
 * @returns {[[*], [*]]} Returns an array of 2 elements: the items of as not in bs, and vice versa.
 * @example
 *
 * const as = ['a', 3, {a: 3}, {b: 'hello'}]
 * const bs = ['b', 3, {b: 'hello'}, {a: 4}]
 *
 * diff(as, bs)
 * // => [['a', {a: 3}], ['b', {'a': 4}]]
 */
export function diff(as, bs) {
    const added = _.differenceWith(as, bs, _.isEqual);
    const removed = _.differenceWith(bs, as, _.isEqual);

    return [added, removed];
}