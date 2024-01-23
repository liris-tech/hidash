import { walkDir } from '../src/walkDir.js';
import { makeFileStructure } from '../src/makeFileStructure.js';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

export function walkDirTest() {
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
            description: 'walkDir - playground - no options',
            result: walkDir({fromPath: 'playground'}).sort(),
            expected: [
                'playground',
                path.join('playground', 'some-dir'),
                path.join('playground', 'symlink-to-some-dir')
            ].map(p => path.resolve(p)).sort()
        },
        {
            description: 'walkDir - playground - {options: {ignorePatterns: [/^some/]}}',
            result: walkDir({fromPath: 'playground', options: {ignorePatterns: [/^some/]}}).sort(),
            expected: [
                'playground',
                path.join('playground', 'symlink-to-some-dir')
            ].map(p => path.resolve(p)).sort()
        },
        {
            description: 'walkDir - playground - {options: {ignorePatterns: [/^some/], symlink: false}}',
            result: walkDir({fromPath: 'playground', options: {ignorePatterns: [/^some/], symlink: false}}).sort(),
            expected: [
                'playground',
            ].map(p => path.resolve(p)).sort()
        },
        {
            description: 'walkDir - playground - {callback: absPath => absPath.length}',
            result: walkDir({fromPath: 'playground', callback: absPath => absPath.length}).sort(),
            expected: [
                'playground',
                path.join('playground', 'some-dir'),
                path.join('playground', 'symlink-to-some-dir')
            ].map(p => path.resolve(p).length).sort()
        },
        {
            description: 'walkDir - playground - {callback: absPath => absPath.length}',
            result: walkDir({fromPath: 'playground', callback: absPath => absPath.length}).sort(),
            expected: [
                'playground',
                path.join('playground', 'some-dir'),
                path.join('playground', 'symlink-to-some-dir')
            ].map(p => path.resolve(p).length).sort()
        },
        {
            description: 'walkDir - playground - {callback: absPath => path.relative(".", absPath)}',
            result: walkDir({fromPath: 'playground', callback: absPath => path.relative('.', absPath)}).sort(),
            expected: [
                'playground',
                path.join('playground', 'some-dir'),
                path.join('playground', 'symlink-to-some-dir')
            ].sort()
        },
    ];
}