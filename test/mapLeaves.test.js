import { mapLeaves } from '../src/mapLeaves.js';
import { isNotObjectOrArray } from '../src/isObjectOrArray.js';

import _ from 'lodash';

// =====================================================================================================================

export function mapLeavesTest() {
    return [
        {
            description: 'mapLeaves - {a: {b: 1}, c: 2}, _.identity',
            result: mapLeaves({a: {b: 1}, c: 2}, _.identity),
            expected: [1, 2]
        },
        {
            description: 'mapLeaves - {a: {b: 1}, c: 2}, (value, path) => ({v: ++value, p: path})',
            result: mapLeaves({a: {b: 1}, c: 2}, (value, path) => ({v: ++value, p: path})),
            expected: [{v: 2, p: ['a', 'b']}, {v: 3, p: ['c']}]
        },
        {
            description: 'mapLeaves - {a: {b: 1}, c: [2, 3]}, _.identity',
            result: mapLeaves({a: {b: 1}, c: [2, 3]}, _.identity),
            expected: [1, [2, 3]]
        },
        {
            description: 'mapLeaves - {a: {b: 1}, c: [2, [3]]}, _.identity',
            result: mapLeaves({a: {b: 1}, c: [2, [3]]}, _.identity),
            expected: [1, [2, [3]]]
        },
        {
            description: 'mapLeaves - {a: {b: 1}, c: [2, [3]]}, _.identity, {isLeaf: not obj or arr}',
            result: mapLeaves({a: {b: 1}, c: [2, [3]]}, _.identity,
                {isLeaf: isNotObjectOrArray}),
            expected: [1, 2, 3]
        },
        {
            description: 'mapLeaves - {a: {b: 1}, c: [2, [3]]}, (value, path) => path, {isLeaf: not obj or arr}',
            result: mapLeaves({a: {b: 1}, c: [2, [3]]}, (value, path) => path,
                {isLeaf: isNotObjectOrArray}),
            expected: [['a', 'b'], ['c', '0'], ['c', '1', '0']]
        },
    ];
}
