import { makeFileStructure } from '../src/makeFileStructure.js';
import { isDir } from '../src/isDir.js';
import { isSymbolicLink } from '../src/isSymbolicLink.js';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

export function makeFileStructureTest() {
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
            description: 'makeFileStructure - all path exist',
            result: [
                fs.existsSync('playground'),
                fs.existsSync(path.join('playground', 'some-dir')),
                fs.existsSync(path.join('playground', 'symlink-to-some-dir')),
                fs.existsSync(path.join('playground', 'some-file')),
                fs.existsSync(path.join('playground', 'symlink-to-some-file')),
            ],
            expected: [true, true, true, true, true]
        },
        {
            description: 'makeFileStructure - isDir',
            result: [
                isDir('playground'),
                isDir(path.join('playground', 'some-dir')),
                isDir(path.join('playground', 'symlink-to-some-dir')),
                isDir(path.join('playground', 'some-file')),
                isDir(path.join('playground', 'symlink-to-some-file')),
            ],
            expected: [true, true, true, false, false]
        },
        {
            description: 'makeFileStructure - isSymbolicLink',
            result: [
                isSymbolicLink('playground'),
                isSymbolicLink(path.join('playground', 'some-dir')),
                isSymbolicLink(path.join('playground', 'symlink-to-some-dir')),
                isSymbolicLink(path.join('playground', 'some-file')),
                isSymbolicLink(path.join('playground', 'symlink-to-some-file')),
            ],
            expected: [false, false, true, false, true]
        },
        {
            description: 'makeFileStructure - file content',
            result: [
                fs.readFileSync(path.join('playground', 'some-file')).toString(),
                fs.readFileSync(path.join('playground', 'symlink-to-some-file')).toString(),
            ],
            expected: ['42', '42']
        }
    ];
}