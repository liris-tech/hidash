import { rmdirIfEmpty } from '../src/rmdirIfEmpty.js';
import { makeFileStructure } from '../src/makeFileStructure.js';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

export function rmdirIfEmptyTest() {
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

    return [
        {
            description: 'rmdirIfEmpty - playground',
            result: [rmdirIfEmpty('playground'), fs.existsSync('playground')],
            expected: [false, true]
        },
        {
            description: 'rmdirIfEmpty - playground/some-dir',
            result: [rmdirIfEmpty(someDirPath), fs.existsSync(someDirPath)],
            expected: [true, false]
        },
        {
            description: 'rmdirIfEmpty - playground/some-file',
            result: (() => {
                try {
                    rmdirIfEmpty(someFilePath);
                }
                catch (e) {
                    return 'error: dirPath points to a file';
                }
            })(),
            expected: 'error: dirPath points to a file'
        },
        {
            description: 'rmdirIfEmpty - playground - {ignorePatterns: [/file/]}',
            result: [rmdirIfEmpty('playground', {ignorePatterns: [/file/]}), fs.existsSync('playground')],
            expected: [false, true]
        },
        {
            description: 'rmdirIfEmpty - playground - {ignorePatterns: [/file/], symlink: false}',
            result: [
                rmdirIfEmpty('playground', {ignorePatterns: [/file/], symlink: false}),
                fs.existsSync('playground')
            ],
            expected: [true, false]
        }
    ];
}