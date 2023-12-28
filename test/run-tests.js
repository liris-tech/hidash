import { diffTest } from './diff.test.js';

import { makeFileStructureTest } from './makeFileStructure.test.js';
import { isDirTest } from './isDir.test.js';

import _ from 'lodash';

// =====================================================================================================================

const functionsToTest = [diffTest, makeFileStructureTest, isDirTest];

export function runTests() {
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
        }
    }

    const descriptionMaxLength = _(allTests).map(t => t.description.length).max();

    for (const test of allTests) {
        const nDashes = descriptionMaxLength - test.description.length + 10;
        const dashes = _.repeat('-', nDashes);

        if (test.passes) {
            console.log(`${test.description}: ${dashes} passes`);
        }
        else {
            console.log(`${test.description}: ${dashes} FAILS`);
            console.log(`--- result: ${JSON.stringify(test.result)}`);
            console.log(`--- expected result: ${JSON.stringify(test.expected)}`);
        }
    }
}

runTests();