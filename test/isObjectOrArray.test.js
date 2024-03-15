import { isObjectOrArray } from '../src/isObjectOrArray.js'

// =====================================================================================================================

export function isObjectOrArrayTest() {
    return [
        {
            description: 'isObjectOrArray - {}',
            result: isObjectOrArray({}),
            expected: true
        },
        {
            description: 'isObjectOrArray - []',
            result: isObjectOrArray([]),
            expected: true
        },
        {
            description: 'isObjectOrArray - new Date()',
            result: isObjectOrArray(new Date()),
            expected: false
        },
        {
            description: 'isObjectOrArray - Date',
            result: isObjectOrArray(Date),
            expected: false
        },
        {
            description: 'isObjectOrArray - x => x',
            result: isObjectOrArray(x => x),
            expected: false
        },
        {
            description: 'isObjectOrArray - 42',
            result: isObjectOrArray(42),
            expected: false
        },
        {
            description: 'isObjectOrArray - undefined',
            result: isObjectOrArray(undefined),
            expected: false
        },
        {
            description: 'isObjectOrArray - null',
            result: isObjectOrArray(null),
            expected: false
        }
    ];
}