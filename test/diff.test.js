import { diff } from '../src/diff.js';

// =====================================================================================================================

export function diffTest() {
    return [
        {
            description: 'diff - empty',
            result: diff(
                [],
                []
            ),
            expectedResult: [
                [],
                []
            ]
        },
        {
            description: 'diff - atomic values',
            result: diff(
                ['a', 2, true],
                [2, true, 'hello']
            ),
            expectedResult: [
                ['a'],
                ['hello']
            ]
        },
        {
            description: 'diff - objects',
            result: diff(
                [{a: 1}, {b: {c: 'hi'}}, {d: {e: {f: 3}}}],
                [{a: 2}, {b: {c: 'hi'}}, {d: {e: {f: 4}}}, {g: 5}]
            ),
            expectedResult: [
                [{a: 1}, {d: {e: {f: 3}}}],
                [{a: 2}, {d: {e: {f: 4}}}, {g: 5}]
            ]
        },
        {
            description: 'diff - arrays',
            result: diff(
                [[1, 2, 3], [3, [4, 5]]],
                [[1, 2, 3], [3, [4, 5]], [3, [4, 6]]]
            ),
            expectedResult: [
                [],
                [[3, [4, 6]]]
            ]
        },
        {
            description: 'diff - mix',
            result: diff(
                ['a', {b: 'c'}, ['d', 0, true], {f: ['g', {h: 42}]}],
                ['b', {a: 'c'}, ['d', 0, 0], {f: ['g', {h: 42}]}]
            ),
            expectedResult: [
                ['a', {b: 'c'}, ['d', 0, true]],
                ['b', {a: 'c'}, ['d', 0, 0]]
            ]
        }
    ];
}