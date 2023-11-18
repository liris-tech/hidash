import { diffTest } from './diff.test.js';

import _ from 'lodash';

// =====================================================================================================================

export function runTests() {
    const allTests = [diffTest];
    const allTestResults = [];

    for (const test of allTests) {
        for (const {description, result, expectedResult} of test()) {
            if (_.isEqual(result, expectedResult)) {
                allTestResults.push({
                    description,
                    passes: true
                });
            } else {
                allTestResults.push({
                    description,
                    passes: false,
                    result,
                    expectedResult
                });
            }
        }
    }

    for (const result of allTestResults) {
        if (result.passes) {
            console.log(`${result.description}: passes`);
        }
        else {
            console.log(`${result.description}: fails`);
            console.log(`--- result: ${JSON.stringify(result.result)}`);
            console.log(`--- expected result: ${JSON.stringify(result.expectedResult)}`);
        }
    }
}

runTests();