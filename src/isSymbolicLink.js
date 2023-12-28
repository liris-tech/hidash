import fs from 'node:fs';

// =====================================================================================================================

/**
 * Checks if an absolute path corresponds to a symlink.
 *
 * @since 0.1.0
 * @category File system
 * @param {string} targetPath The absolute path.
 * @returns {boolean} Returns whether the absolute path corresponds to a symlink.
 * @example
 *
 * // for a file at /my/file and a symlink at /my/symlink
 *
 * isSymbolicLink('/my/file');
 * // => false
 *
 * isSymbolicLink('/my/symlink');
 * // => true
 */
export const isSymbolicLink = (targetPath) => {
    try {
        return fs.lstatSync(targetPath).isSymbolicLink();
    }
    catch (e) {
        return false;
    }
};