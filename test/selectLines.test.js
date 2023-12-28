import { selectLines } from '../src/selectLines.js';

// =====================================================================================================================

export function selectLinesTest() {
    const textExample = [
        'I have some text.',
        '// this is a comment',
        '1 + 1 = 2',
        'Closing with some special characters }]',
        'And "quoting" something'
    ].join('\n');

    return [
        {
            description: 'selectLines - empty text',
            result: selectLines(
                ''
            ),
            expected: ['']
        },
        {
            description: 'selectLines - empty text - {from: 0}',
            result: selectLines(
                '',
                {from: 0}
            ),
            expected: ['']
        },
        {
            description: 'selectLines - empty text - {from: 1}',
            result: selectLines(
                '',
                {from: 1}
            ),
            expected: []
        },
        {
            description: 'selectLines - empty text - {from: 0, to: 0}',
            result: selectLines(
                '',
                {from: 0, to: 0}
            ),
            expected: []
        },
        {
            description: 'selectLines - empty text - {from: 0, to: 1}',
            result: selectLines(
                '',
                {from: 0, to: 1}
            ),
            expected: ['']
        },
        {
            description: 'selectLines - empty text - {matches: ""}',
            result: selectLines(
                '',
                {matches: ''}
            ),
            expected: ['']
        },
        {
            description: 'selectLines - empty text - {matches: " "}',
            result: selectLines(
                '',
                {matches: ' '}
            ),
            expected: []
        },

        {
            description: 'selectLines - example text',
            result: selectLines(
                textExample,
            ),
            expected: textExample.split('\n')
        },
        {
            description: 'selectLines - example text - {from: 1, to: 2}',
            result: selectLines(
                textExample,
                {from: 1, to: 2}
            ),
            expected: ['// this is a comment']
        },
        {
            description: 'selectLines - example text - {from: /have/, to: "+"}',
            result: selectLines(
                textExample,
                {from: /have/, to: '+'}
            ),
            expected: [
                'I have some text.',
                '// this is a comment',
            ]
        },
        {
            description: 'selectLines - example text - {from: /\//, to: "+"}',
            result: selectLines(
                textExample,
                {from: /\//, to: '+'}
            ),
            expected: [
                '// this is a comment',
            ]
        },
        {
            description: 'selectLines - example text - {from: str => str.length > 17, to: /}/}',
            result: selectLines(
                textExample,
                {from: str => str.length > 17, to: /}/}
            ),
            expected: [
                '// this is a comment',
                '1 + 1 = 2'
            ]
        },
        {
            description: 'selectLines - example text - {matches: str => str.length > 17}',
            result: selectLines(
                textExample,
                {matches: str => str.length > 17}
            ),
            expected: [
                '// this is a comment',
                'Closing with some special characters }]',
                'And "quoting" something'
            ]
        },
        {
            description: 'selectLines - example text - {matches: "some"}',
            result: selectLines(
                textExample,
                {matches: 'some'}
            ),
            expected: [
                'I have some text.',
                'Closing with some special characters }]',
                'And "quoting" something'
            ]
        },
        {
            description: 'selectLines - example text - {from: 1, matches: "some"}',
            result: selectLines(
                textExample,
                {from: 1, matches: 'some'}
            ),
            expected: [
                'Closing with some special characters }]',
                'And "quoting" something'
            ]
        },
        {
            description: 'selectLines - example text - {from: 1, to: 4, matches: "some"}',
            result: selectLines(
                textExample,
                {from: 1, to: 4, matches: 'some'}
            ),
            expected: [
                'Closing with some special characters }]',
            ]
        },
    ];
}
