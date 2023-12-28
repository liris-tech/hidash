import fs from 'node:fs';

// =====================================================================================================================

/**
 * Checks if an absolute path corresponds to a directory.
 *
 * @since 0.1.0
 * @category File system
 * @param {string} absPath The absolute path.
 * @returns {boolean} Returns whether the absolute path corresponds to a directory.
 * @example
 *
 * // for a file at /my/file and a directory at /my/dir
 *
 * isDir('/my/file')
 * // => false
 *
 * isDir('/my/dir')
 * // => true
 */
export function isDir(absPath) {
    try {
        return fs.statSync(absPath).isDirectory();
    }
    catch (e) {
        return false;
    }
}
