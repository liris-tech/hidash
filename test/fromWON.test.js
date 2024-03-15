import { fromWON } from '../src/fromWON.js';
import { isNotObjectOrArray } from '../src/isObjectOrArray.js';

// =====================================================================================================================

export function fromWONTest() {
    return [
        {
            description: 'fromWON - {"*": {c: 1}, a: {}, b: {}}',
            result: fromWON({"*": {c: 1}, a: {}, b: {}}),
            expected: {a: {c: 1}, b: {c: 1}}
        },
        {
            description: 'fromWON - {a: {"*": {c: 1}, d: {}}, b: {}}',
            result: fromWON({
                a: {"*": {c: 1},
                      d: {}},
                b: {}}),
            expected: {a: {d: {c: 1}}, b: {}}
        },
        {
            description: 'fromWON - {a: [{"*": {c: 1}, d: {}}]}',
            result: fromWON({
                a: [{"*": {c: 1}, d: {}}]
            }),
            expected: {a: [{ "*": {c: 1}, d: {}}]}
        },
        {
            description: 'fromWON - {a: [{"*": {c: 1}, d: {}}]} - isLeaf isNotObjectOrArray',
            result: fromWON({
                a: [{"*": {c: 1}, d: {}}]
            }, {isLeaf: isNotObjectOrArray}),
            expected: {a: [{d: {c: 1}}]}
        },
        {
            description: 'fromWON - {a: [{"*": {c: 1}, d: {}}]} - isLeaf isNotObjectOrArray',
            result: fromWON({
                a: [{"*": {c: 1}, d: {}}]
            }, {isLeaf: isNotObjectOrArray}),
            expected: {a: [{d: {c: 1}}]}
        },
        {
            description: 'fromWON - {"*": {"*": {a: 1}}, {b: {}}}]}',
            result: fromWON({
                "*": {"*": {a: 1}},
                  b: {  c: {}}
            }),
            expected: {b: {c: {a: 1}}}
        }
    ];
}