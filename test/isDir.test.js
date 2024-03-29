import { isDir } from '../src/isDir.js';
import { makeFileStructure } from '../src/makeFileStructure.js';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

export function isDirTest() {
    makeFileStructure(
        ['playground', {dir: true},
            ['some-dir', {dir: true}],
            ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
            ['some-file', {content: ''}],
            ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}]
        ]
    );

    return [
        {
            description: 'isDir - playground',
            result: isDir('playground'),
            expected: true,
        },
        {
            description: 'isDir - playground/some-file',
            result: isDir(path.join('playground', 'some-file')),
            expected: false,
        },
        {
            description: 'isDir - playground/symlink-to-some-dir',
            result: isDir(path.join('playground', 'symlink-to-some-dir')),
            expected: true,
        },
        {
            description: 'isDir - playground/symlink-to-some-file',
            result: isDir(path.join('playground', 'symlink-to-some-file')),
            expected: false,
        }
    ];
}