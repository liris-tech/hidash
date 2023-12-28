import { isDirEmpty } from '../src/isDirEmpty.js';
import { makeFileStructure } from '../src/makeFileStructure.js';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

export function isDirEmptyTest() {
    makeFileStructure(
        ['playground', {dir: true},
            ['some-dir', {dir: true}],
            ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
            ['some-file', {content: ''}],
            ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}]
        ]
    );

    const tests = [
        {
            description: 'isDirEmpty - playground',
            result: isDirEmpty('playground'),
            expected: false
        },
        {
            description: 'isDirEmpty - playground - {ignorePatterns: [/^some/]}',
            result: isDirEmpty('playground', {ignorePatterns: [/^some/]}),
            expected: false // because of symlink-to-some-dir and symlink-to-some-file
        },
        {
            description: 'isDirEmpty - playground - {ignorePatterns: [/^some/], symlink=false}',
            result: isDirEmpty('playground', {ignorePatterns: [/^some/], symlink: false}),
            expected: true
        },
        {
            description: 'isDirEmpty - playground/some-dir',
            result: isDirEmpty(path.join('playground', 'some-dir')),
            expected: true
        },
        {
            description: 'isDirEmpty - playground/some-file - error',
            result: (() => {
                try {
                    isDirEmpty(path.join('playground', 'some-file'))
                }
                catch (e) {
                    return 'error: dirPath points to a file'
                }

            })(),
            expected: 'error: dirPath points to a file'
        },
        {
            description: 'isDirEmpty - no arguments',
            result: isDirEmpty(),
            expected: false
        }
    ];

    fs.rmSync('./playground', {recursive: true});

    return tests;
}
