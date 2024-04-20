import { containsKeyDeep } from '../src/containsKeyDeep.js';

// =====================================================================================================================

export function containsKeyDeepTest() {
    return [
        {
            description: 'containsKeyDeep - {} - "a"',
            result: containsKeyDeep({}, 'a'),
            expected: false
        },
        {
            description: 'containsKeyDeep - {} - ""',
            result: containsKeyDeep({}, ''),
            expected: false
        },
        {
            description: 'containsKeyDeep - {a: 1} - "a"',
            result: containsKeyDeep({a: 1}, 'a'),
            expected: true
        },
        {
            description: 'containsKeyDeep - {a: {b: 1}} - "b"',
            result: containsKeyDeep({a: {b: 1}}, 'b'),
            expected: true
        },
        {
            description: 'containsKeyDeep - {a: {b: 1, c: 2}} - "c"',
            result: containsKeyDeep({a: {b: 1, c: 2}}, 'c'),
            expected: true
        },
        {
            description: 'containsKeyDeep - {a: {b: 1, c: 2}} - "d"',
            result: containsKeyDeep({a: {b: 1, c: 2}}, 'd'),
            expected: false
        }
    ];
}