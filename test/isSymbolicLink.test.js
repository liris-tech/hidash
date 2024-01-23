import { isSymbolicLink } from '../src/isSymbolicLink.js';
import { makeFileStructure } from '../src/makeFileStructure.js';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

export function isSymbolicLinkTest() {
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
            description: 'isSymbolicLink - playground/some-dir',
            result: isSymbolicLink('playground/some-dir'),
            expected: false,
        },
        {
            description: 'isSymbolicLink - playground/symlink-to-some-dir',
            result: isSymbolicLink('playground/symlink-to-some-dir'),
            expected: true,
        },
        {
            description: 'isSymbolicLink - playground/some-file',
            result: isSymbolicLink('playground/some-file'),
            expected: false,
        },
        {
            description: 'isSymbolicLink - playground/symlink-to-some-file',
            result: isSymbolicLink('playground/symlink-to-some-file'),
            expected: true,
        }
    ];
}