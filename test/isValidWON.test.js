import { isValidWON } from '../src/isValidWON.js';
import { isNotObjectOrArray } from '../src/isObjectOrArray.js';

import _ from 'lodash';

// =====================================================================================================================

export function isValidWONTest() {
    return [
        {
            description: 'isValidWON - {}',
            result: isValidWON({}),
            expected: true
        },
        {
            description: 'isValidWON - {} - explain',
            result: isValidWON({}, {explain: true}),
            expected: {result: true}
        },
        {
            description: 'isValidWON - {a: {c: 1}, b: {c: 1}}',
            result: isValidWON({a: {c: 1}, b: {c: 1}}),
            expected: true
        },
        {
            description: 'isValidWON - {"*": {c: 1}, a: {}, b: {}}',
            result: isValidWON({'*': {c: 1}, a: {}, b: {}}),
            expected: true
        },
        {
            description: 'isValidWON - {"*": {c: 1}, a: {c: 1}, b: {}}',
            result: isValidWON({'*': {c: 1}, a: {c: 1}, b: {}}),
            expected: false
        },
        {
            description: 'isValidWON - {"*": {c: 1}, a: {c: 1}, b: {}} - explain',
            result: isValidWON({'*': {c: 1}, a: {c: 1}, b: {}}, {explain: true}),
            expected: {result: false, reason: 'Conflict at paths *.c and a.c'}
        },
        {
            description: 'isValidWON - {"*": {c: 1}, a: {d: 1}, b: {}}',
            result: isValidWON({'*': {c: 1}, a: {d: 1}, b: {}}),
            expected: true
        },
        {
            description: 'isValidWON - {"*": {c: {d: 1}}, a: {c: {e: 1}}, b: {c: {d: 1}}}',
            result: isValidWON({
                '*': {c: {d: 1}},
                  a: {c: {e: 1}},
                  b: {c: {d: 1}}}),
            expected: false
        },
        {
            description: 'isValidWON - {"*": {c: {d: 1}}, a: {c: 2}}, b: {c: {e: 1}}} - explain',
            result: isValidWON({
                '*': {c: {d: 1}},
                  a: {c: 2},
                  b: {c: {e: 1}}}, {explain: true}),
            expected: {result: false, reason: 'Conflict at paths *.c and a.c'}
        },
        {
            description: 'isValidWON - {"*": {c: {d: 1}}, a: {c: {e: 1}}, b: {c: {e: 1}}}',
            result: isValidWON({
                '*': {c: {d: 1}},
                  a: {c: {e: 1}},
                  b: {c: {e: 1}}}),
            expected: true
        },
        {
            description: 'isValidWON - {"*": {c: {d: 1}}, a: {c: {e: 1}}, b: {c: {e: 1}}} - isLeaf {e: 1} - explain',
            result: isValidWON({
                '*': {c: {d: 1}},
                  a: {c: {e: 1}},
                  b: {c: {f: 1}}}, {isLeaf: (v => !_.isPlainObject(v) || _.isEqual(v, { e: 1 })), explain: true}),
            expected: {result: false, reason: 'Conflict at paths *.c and a.c'}
        },
        {
            description: 'isValidWON - {"*": {c: {d: 1}}, a: {c: {e: 1}}, b: {c: {e: 1}}} - isLeaf isNotObjectOrArray',
            result: isValidWON({
                '*': {c: [{f: 1}]},
                  a: {d: [{f: 1}, {e: 1}]}}, {isLeaf: isNotObjectOrArray}),
            expected: true
        },
        {
            description: 'isValidWON - {"*": {c: [{"*": {y: 2}, f: {y: 1}}]}, b: {}} - isLeaf isNotObjectOrArray',
            result: isValidWON({
                '*': {c: [{'*': {y: 2},
                             f: {y: 1}}]},
                b: {}
                }, {isLeaf: isNotObjectOrArray, explain: true}),
            expected: {result: false, reason: 'Conflict at paths *.c.0.*.y and *.c.0.f.y'}
        },
    ];
}