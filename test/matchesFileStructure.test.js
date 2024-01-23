import { matchesFileStructure } from '../src/matchesFileStructure.js';
import { makeFileStructure } from '../src/makeFileStructure.js';

import path from 'node:path';

// =====================================================================================================================

export function matchesFileStructureTest() {
    const fileStructure = [
        'playground', {dir: true},
            ['some-dir', {dir: true},
                ['sub-dir', {dir: true}]],
            ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
            ['some-file', {content: '42'}],
            ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}],
            ['some-other-dir', {dir: true},
                ['some-other-sub-dir', {dir: true}]]
    ];

    makeFileStructure(fileStructure);

    return [
        {
            description: 'matchesFileStructure - fileStructure (self)',
            result: matchesFileStructure('.', fileStructure) || console.log('======='),
            expected: true
        },
        {
            description: 'matchesFileStructure - fileStructure (self) - {symlink: false}',
            result: matchesFileStructure('.', fileStructure, {symlink: false}),
            expected: false
        },
        {
            description: 'matchesFileStructure - fileStructure with one more dir',
            result: matchesFileStructure('.', [
                    'playground', {dir: true},
                        ['some-dir', {dir: true},
                            ['sub-dir', {dir: true}]],
                        ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
                        ['some-file', {content: '42'}],
                        ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}],
                        ['some-other-dir', {dir: true},
                            ['some-other-sub-dir', {dir: true}]],
                        ['yet-another-dir', {dir: true}] // additional directory
            ]),
            expected: false
        },
        {
            description: 'matchesFileStructure - fileStructure with one less dir',
            result: matchesFileStructure('.', [
                'playground', {dir: true},
                    ['some-dir', {dir: true},
                        ['sub-dir', {dir: true}]],
                    ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
                    ['some-file', {content: '42'}],
                    ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}],
                  //['some-other-dir', {dir: true}, // removed dir
                  //    ['some-other-sub-dir', {dir: true}]],
            ]),
            expected: true
        },
        {
            description: 'matchesFileStructure - fileStructure with one less dir - {strict: true}',
            result: matchesFileStructure('.', [
                'playground', {dir: true},
                ['some-dir', {dir: true},
                    ['sub-dir', {dir: true}]],
                ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
                ['some-file', {content: '42'}],
                ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}],
                //['some-other-dir', {dir: true}, // removed dir
                //    ['some-other-sub-dir', {dir: true}]],
            ], {strict: true}),
            expected: false
        },
        {
            description: 'matchesFileStructure - fileStructure with one less dir - {ignorePatterns: [/^some-other/]}',
            result: matchesFileStructure('.', [
                'playground', {dir: true},
                    ['some-dir', {dir: true},
                        ['sub-dir', {dir: true}]],
                    ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
                    ['some-file', {content: '42'}],
                    ['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}],
                  //['some-other-dir', {dir: true}, // removed dir
                  //    ['some-other-sub-dir', {dir: true}]],
            ], {ignorePatterns: [/^some-other/]}),
            expected: true
        },
        {
            description: 'matchesFileStructure - fileStructure without symlink - {symlink: false}',
            result: matchesFileStructure('.', [
                'playground', {dir: true},
                    ['some-dir', {dir: true},
                        ['sub-dir', {dir: true}]],
                  //['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
                    ['some-file', {content: '42'}],
                  //['symlink-to-some-file', {symlink: path.join('playground', 'some-file')}],
                    ['some-other-dir', {dir: true}, // removed dir
                        ['some-other-sub-dir', {dir: true}]],
            ], {symlink: false}),
            expected: true
        },
        {
            description: 'matchesFileStructure - fileStructure with bad content',
            result: matchesFileStructure('.', [
                'playground', {dir: true},
                    ['some-dir', {dir: true},
                        ['sub-dir', {dir: true}]],
                    ['symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}],
                    ['some-file', {content: '43'}], // bad content
                    ['symlink-to-some-file', {symlink: path.join('playground', 'some-non-existing-file')}],
                    ['some-other-dir', {dir: true},
                        ['some-other-sub-dir', {dir: true}]]
            ]),
            expected: false
        },
        {
            description: 'matchesFileStructure - dirPath="./playground"',
            result: matchesFileStructure(path.join('.', 'playground'), [
                'some-dir', {dir: true},
                    ['sub-dir', {dir: true}],
            ]),
            expected: true
        },
        {
            description: 'matchesFileStructure - dirPath="./playground" - missing sub-dir',
            result: matchesFileStructure(path.join('.', 'playground'), [
                'some-dir', {dir: true}
            ]),
            expected: true
        },
        {
            description: 'matchesFileStructure - dirPath="./playground" - missing-sub-dir - {strict: true}',
            result: matchesFileStructure(path.join('.', 'playground'), [
                'some-dir', {dir: true}
            ], {strict: true}),
            expected: false
        },
        {
            description: 'matchesFileStructure - dirPath="./playground" - 2',
            result: matchesFileStructure(path.join('.', 'playground'), [
                'symlink-to-some-dir', {dir: true, symlink: path.join('playground', 'some-dir')}
            ]),
            expected: true
        },
        {
            description: 'matchesFileStructure - dirPath="./playground" - fileStructure only file',
            result: matchesFileStructure(path.join('.', 'playground'), [
                'symlink-to-some-file', {}
            ]),
            expected: true
        }
   ];
}