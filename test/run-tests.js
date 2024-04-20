import { fromWONTest } from './fromWON.test.js';
import { isValidWONTest } from './isValidWON.test.js';
import { containsKeyDeepTest } from './containsKeyDeep.test.js';

import { mapLeavesTest } from './mapLeaves.test.js';

import { diffTest } from './diff.test.js';

import { selectLinesTest } from './selectLines.test.js';

import { makeFileStructureTest } from './makeFileStructure.test.js';
import { matchesFileStructureTest } from './matchesFileStructure.test.js';
import { isDirTest } from './isDir.test.js';
import { isSymbolicLinkTest } from './isSymbolicLink.test.js';
import { getSubDirsTest } from './getSubDirs.test.js';
import { isDirEmptyTest } from './isDirEmpty.test.js';
import { mkdirIfNotExistsTest} from './mkdirIfNotExists.test.js';
import { rmdirIfEmptyTest } from './rmdirIfEmpty.test.js';
import { walkDirTest } from './walkDir.test.js';

import { isObjectOrArrayTest } from './isObjectOrArray.test.js';
import { isObjectTest } from'./isObject.test.js';

import _ from 'lodash';

import fs from 'node:fs';
import process from 'node:process';

// =====================================================================================================================

const functionsToTest = [fromWONTest, isValidWONTest, containsKeyDeepTest, mapLeavesTest, diffTest,
    selectLinesTest, makeFileStructureTest, matchesFileStructureTest, isDirTest, isSymbolicLinkTest,
    getSubDirsTest, isDirEmptyTest, mkdirIfNotExistsTest, rmdirIfEmptyTest, walkDirTest,
    isObjectOrArrayTest, isObjectTest];

export function runTests(verbose) {
    const allTests = [];

    for (const test of functionsToTest) {
        for (const {description, result, expected} of test()) {
            if (_.isEqual(result, expected)) {
                allTests.push({
                    description,
                    passes: true
                });
            } else {
                allTests.push({
                    description,
                    passes: false,
                    result,
                    expected
                });
            }
            cleanUpTestDir();
        }
    }

    const loggedTests = verbose ? allTests : allTests.filter(test => !test.passes);
    const descriptionMaxLength = _(loggedTests).map(t => t.description.length).max();

    for (const test of loggedTests) {
        const nDashes = descriptionMaxLength - test.description.length + 10;
        const dashes = _.repeat('-', nDashes);

        if (test.passes) {
            console.log(`${test.description}: ${dashes} passes`);
        }
        else {
            console.log(`${test.description}: ${dashes} FAILS`);
            console.log(`--- result: ${JSON.stringify(test.result)}`);
            console.log(`--- expected: ${JSON.stringify(test.expected)}`);
        }
    }

    const nTestPassed = _.sumBy(allTests, {passes: true});
    if (nTestPassed === allTests.length) {
        console.log(`\nAll tests passed (${nTestPassed}/${allTests.length})`);
    }
    else {
        console.log(`\nSOME TESTS FAILED (${allTests.length-nTestPassed}/${allTests.length})`);
    }
}


function cleanUpTestDir() {
    if (fs.existsSync('./playground')) {
        fs.rmSync('./playground', {recursive: true});
    }
}

const verbose = process.argv.includes('verbose');
runTests(verbose);