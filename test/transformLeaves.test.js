import { transformLeaves } from '../src/transformLeaves.js';
import { isNotObjectOrArray } from '../src/isObjectOrArray.js';

// =====================================================================================================================

export function transformLeavesTest() {
    return [
        {
            description: 'transformLeaves - {a: {b: 1}, c: 2}, x => x + 1',
            result: transformLeaves({ a: { b: 1 }, c: 2 }, x => x + 1),
            expected: {a: {b: 2}, c: 3}
        },
        {
            description: 'transformLeaves - [1, [2, [3, 4]], x => x + 1, {isLeaf: isNotObjectOrArray}',
            result: transformLeaves([1, [2, [3, 4]]], x => x + 1, {isLeaf: isNotObjectOrArray}),
            expected: [2, [3, [4, 5]]]
        },
        {
            description: 'transformLeaves - {a: {b: 1}, c: 2}, (value, path) => path.join("."), {isLeaf: isNotObjectOrArray}',
            result: transformLeaves({ a: { b: 1 }, c: [2, [3]] }, (value, path) => path.join('.'),
                {isLeaf: isNotObjectOrArray}),
            expected: {a: {b: 'a.b'}, c: ['c.0', ['c.1.0']]}
        },
    ];
}