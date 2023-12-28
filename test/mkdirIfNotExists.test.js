import { mkdirIfNotExists } from '../src/mkdirIfNotExists.js';
import { makeFileStructure } from '../src/makeFileStructure.js';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

export function mkdirIfNotExistsTest() {
    makeFileStructure(
        ['playground', {dir: true},
            ['some-dir', {dir: true}],
            ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
            ['some-file', {content: ''}],
            ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}]
        ]
    );

    const someDirPath = path.join('playground', 'some-dir');
    const someFilePath = path.join('playground', 'some-file');
    const nonExistingDirPath = path.join('playground', 'non-existing-dir');

    const tests = [
        {
            description: 'mkdirIfNotExists - playground/some-dir',
            result: [mkdirIfNotExists(someDirPath), fs.existsSync(someDirPath)],
            expected: [false, true]
        },
        {
            description: 'mkdirIfNotExists - playground/some-file',
            result: [mkdirIfNotExists(someFilePath), fs.existsSync(someFilePath)],
            expected: [false, true]
        },
        {
            description: 'mkdirIfNotExists - playground/non-existing-dir',
            result: [mkdirIfNotExists(nonExistingDirPath), fs.existsSync(nonExistingDirPath)],
            expected: [true, true]
        },
    ];

   fs.rmSync('./playground', {recursive: true});

    return tests;
}

