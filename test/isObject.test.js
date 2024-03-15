import { isObject } from '../src/isObject.js'

// =====================================================================================================================

export function isObjectTest() {
    return [
        {
            description: 'isObject - {}',
            result: isObject({}),
            expected: true
        },
        {
            description: 'isObject - []',
            result: isObject([]),
            expected: false
        },
        {
            description: 'isObject - new Date()',
            result: isObject(new Date()),
            expected: false
        },
        {
            description: 'isObject - Date',
            result: isObject(Date),
            expected: false
        },
        {
            description: 'isObject - x => x',
            result: isObject(x => x),
            expected: false
        },
        {
            description: 'isObject - 42',
            result: isObject(42),
            expected: false
        },
        {
            description: 'isObject - undefined',
            result: isObject(undefined),
            expected: false
        },
        {
            description: 'isObject - null',
            result: isObject(null),
            expected: false
        }
    ];
}