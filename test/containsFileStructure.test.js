import { containsFileStructure } from '../src/containsFileStructure.js';
import { makeFileStructure } from '../src/makeFileStructure.js';

import path from 'node:path';

// =====================================================================================================================

export function containsFileStructureTest() {
    makeFileStructure(
        ['playground', {dir: true},
            ['some-dir', {dir: true}],
            ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
            ['some-file', {content: '42'}],
            ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}]
        ]
    );

    return [
        {
            description: 'containsFileStructure - playground',
            result: containsFileStructure('.',
                ['playground', {dir: true}]
            ),
            expected: true
        },
        {
            description: 'containsFileStructure - playground as a file',
            result: containsFileStructure('.',
                ['playground', {content: ''}]
            ),
            expected: false
        },
        {
            description: 'containsFileStructure - playground as a symlink',
            result: containsFileStructure('.',
                ['playground', {symlink: '/some/path'}]
            ),
            expected: false
        },
        {
            description: 'containsFileStructure - playground - some-dir',
            result: containsFileStructure('.',
                ['playground', {dir: true},
                    ['some-dir', {dir: true}]]
            ),
            expected: true
        },
        {
            description: 'containsFileStructure - playground - some-dir - non-existing sub-dir',
            result: containsFileStructure('.',
                ['playground', {dir: true},
                    ['some-dir', {dir: true},
                        ['some-sub-dir', {dir: true}]]]
            ),
            expected: false
        },
        {
            description: 'containsFileStructure - playground - symlink-to-some-dir',
            result: containsFileStructure('.',
                ['playground', {dir: true},
                    ['some-dir', {dir: true}],
                    ['symlink-to-some-dir', {dir: true}]]
            ),
            expected: true
        },
        {
            description: 'containsFileStructure - playground - symlink-to-some-dir - right path',
            result: containsFileStructure('.',
                ['playground', {dir: true},
                    ['some-dir', {dir: true}],
                    ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}]]
            ),
            expected: true
        },
        {
            description: 'containsFileStructure - playground - symlink-to-some-dir - wrong path',
            result: containsFileStructure('.',
                ['playground', {dir: true},
                    ['some-dir', {dir: true}],
                    ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dirs')}]]
            ),
            expected: false
        },
        {
            description: 'containsFileStructure - playground - symlink-to-some-dir - wrong type',
            result: containsFileStructure('.',
                ['playground', {dir: true},
                    ['some-dir', {dir: true}],
                    ['symlink-to-some-dir', {symlink: path.join('playground', 'some-dirs')}]]
            ),
            expected: false
        },
        {
            description: 'containsFileStructure - playground - some-file',
            result: containsFileStructure('.',
                ['playground', {dir: true},
                    ['some-file', {}]]
            ),
            expected: true
        },
        {
            description: 'containsFileStructure - playground - some-file - right content',
            result: containsFileStructure('.',
                ['playground', {dir: true},
                    ['some-file', {content: '42'}]]
            ),
            expected: true
        },
        {
            description: 'containsFileStructure - playground - some-file - wrong content',
            result: containsFileStructure('.',
                ['playground', {dir: true},
                    ['some-file', {content: '43'}]]
            ),
            expected: false
        }
    ];
}