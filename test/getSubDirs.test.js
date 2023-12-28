import { getSubDirs } from '../src/getSubDirs.js';
import { makeFileStructure } from '../src/makeFileStructure.js';

import _ from 'lodash';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

export function getSubDirsTest() {
    makeFileStructure(
        ['playground', {dir: true},
            ['some-dir', {dir: true}],
            ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
            ['some-other-dir', {dir: true},
                ['nested-dir', {dir: true}],
                ['nested-file']],
            ['.dot-dir', {dir: true}],
            ['some-file', {content: ''}],
            ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}]
        ]
    );

    const tests = [
        {
            description: 'getSubDirs - playground',
            result: getSubDirs('playground').sort(),
            expected: [
                path.resolve(path.join('playground', 'some-dir')),
                path.resolve(path.join('playground', 'symlink-to-some-dir')),
                path.resolve(path.join('playground', 'some-other-dir')),
                // path.resolve(path.join('.dot-dir'))
            ].sort()
        },
        {
            description: 'getSubDirs - playground - {symlink: false}',
            result: getSubDirs('playground', {symlink: false}).sort(),
            expected: [
                path.resolve(path.join('playground', 'some-dir')),
                // path.resolve(path.join('playground', 'symlink-to-some-dir')),
                path.resolve(path.join('playground', 'some-other-dir'))
                // path.resolve(path.join('.dot-dir'))
            ].sort()
        },
        {
            description: 'getSubDirs - playground - {ignorePatterns: []}',
            result: getSubDirs('playground', {ignorePatterns: []}).sort(),
            expected: [
                path.resolve(path.join('playground', 'some-dir')),
                path.resolve(path.join('playground', 'symlink-to-some-dir')),
                path.resolve(path.join('playground', 'some-other-dir')),
                path.resolve(path.join('playground', '.dot-dir'))
            ].sort()
        },
        {
            description: 'getSubDirs - playground - {ignorePatterns: [/some/]}',
            result: getSubDirs('playground', {ignorePatterns: [/some/]}).sort(),
            expected: [
                // path.resolve(path.join('playground', 'some-dir')),
                // path.resolve(path.join('playground', 'symlink-to-some-dir')),
                // path.resolve(path.join('playground', 'some-other-dir')),
                path.resolve(path.join('playground', '.dot-dir'))
            ].sort()
        },
        {
            description: 'getSubDirs - playground - no argument',
            result: getSubDirs().sort(),
            expected: _.intersection(fs.readdirSync('.').map(p => path.resolve(p)), getSubDirs()).sort()
        }
    ];

    fs.rmSync('./playground', {recursive: true});

    return tests;
}