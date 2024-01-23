import { isDir } from './isDir.js';
import { isSymbolicLink } from './isSymbolicLink.js';

import _ from 'lodash';

import path from 'node:path';
import fs from 'node:fs';

// =====================================================================================================================

/**
 * Checks if the directory is empty.
 *
 * @since 0.1.0
 * @category File system
 * @param {string} [dirPath='.'] The absolute path of the directory.
 * @param {Object} [options] Optional options.
 * @param {Array} [ignorePatterns] Regexp patterns of file system entries' (relative) name to be ignored.
 * @param {boolean} [symlink] Should symlink subdirectories be taken into account?
 * @returns {boolean} Returns whether the directory is empty.
 * @example
 *
 * // for a directory at /my/dir1 containing a file some-file and a directory /my/dir2 not containing anything:
 *
 * isDirEmpty('/my/dir1');
 * // => false
 *
 * isDirEmpty('/my/dir2');
 * // => true
 */
export function isDirEmpty(dirPath='.', {ignorePatterns=[], symlink=true} = {}) {
    if (!isDir(dirPath)) {
        throw new Error(`${dirPath} is not a directory.`);
    }
    else {
        return !_(fs.readdirSync(dirPath))
            .filter(name => _.every(ignorePatterns, pat => !pat.test(name)))
            .map(name => path.resolve(dirPath, name))
            .filter(absPath => symlink || !isSymbolicLink(absPath))
            .size();
    }
}
