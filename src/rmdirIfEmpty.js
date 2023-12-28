import { isDirEmpty } from './isDirEmpty.js';

import fs from 'node:fs';

// =====================================================================================================================

/**
 * Removes a directory if it is empty.
 *
 * @since 0.1.0
 * @category File system
 * @param {string} absPath The absolute path of the directory.
 * @param {Object} [options] Optional options.
 * @param {[RegExp]} [ignorePatterns] Array of patterns of subdirectories' (relative) name to be ignored.
 * @param {boolean} [symlink] Should symlink subdirectories be returns?
 * @returns {boolean} Returns whether the directory has been removed.
 * @example
 *
 * // for a directory at /my/dir1 containing a file some-file and a directory /my/dir2 not  containing anything:
 *
 * rmdirIfEmpty('/my/dir1')
 * // => false, '/my/dir1' has not been removed
 *
 * rmdirIfEmpty('/my/dir2')
 * // => true, '/my/dir2' has been removed
 */
export function rmdirIfEmpty(absPath, {ignorePatterns=[], symlink=true} = {}) {
    if (isDirEmpty(absPath, {ignorePatterns, symlink}))  {
        fs.rmSync(absPath, {recursive: true});
        return true;
    }
    else {
        return false;
    }
}
