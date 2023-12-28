import { isDir } from './isDir.js';
import { isSymbolicLink } from './isSymbolicLink.js';

import _ from 'lodash';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

/**
 * Gets the absolute paths of a directory's subdirectories.
 *
 * @since 0.1.0
 * @category File system
 * @param {string} [dirPath='.'] The path of the subdirectories parent.
 * @param {Object} [options] Optional options.
 * @param {[RegExp]} [ignorePatterns=[/^\.+/]] Patterns of subdirectories' (relative) name to be ignored.
 * @param {boolean} [symlink=true] Should symlink subdirectories be returns?
 * @returns {[string]} Returns an array of subdirectories.
 * @example
 *
 * // for a directory at /my/dir/path containing 2 subdirectories subDir1 and subDir2:
 *
 * getSubDirs('/my/dir/path')
 * // => ['/my/dir/path/subDir1', '/my/dir/path/subDir2']
 */
export function getSubDirs(dirPath='.', {ignorePatterns=[/^\.+/], symlink=true} = {}) {
    return isDir(dirPath)
        ? _(fs.readdirSync(dirPath))
            .filter(name => _.every(ignorePatterns, pat => !pat.test(name)))
            .map(name => path.resolve(dirPath, name))
            .filter(isDir)
            .filter(absPath => symlink || !isSymbolicLink(absPath))
            .value()
        : [];
}