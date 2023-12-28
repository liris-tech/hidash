import fs from 'node:fs';

// =====================================================================================================================

/**
 * Creates a directory if no directory or file exists with the same path.
 *
 * @since 0.1.0
 * @category File system
 * @param {string} dirPath The absolute path.
 * @returns {boolean} Returns whether a new directory has been created.
 * @example
 *
 * mkdirIfNotExists('/my/new/dir')
 * // => true if '/my/new/dir' has been created, false otherwise.
 */
export function mkdirIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        return true;
    }
    else {
        return false;
    }
}