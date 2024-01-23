import { isSymbolicLink } from './isSymbolicLink.js';
import { isDir } from './isDir.js';

import _ from 'lodash';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

/**
 * Checks if directory contains the file structure specified via a hiccup-style notation.
 *
 * @since 0.1.1
 * @category File system
 * @param {Array} fileStructure The file structure to be created described with a hiccup-style notation.
 * @param {string} [dirPath='*'] The path of the directory containing (or not) the fileStructure/
 * @returns {boolean} Returns whether the directory contains the file structure.
 * @example
 *
 * containsFileStructure(
 *     ['playground', {dir: true},
 *         ['some-dir', {dir: true}],
 *         ['symlink-of-some-dir', {dir: true, symlink: 'playground/some-dir'}],
 *         ['some-file', {content: 'some-text'}]],
 *     '/my/dir'
 * );
 *
 * // => returns whether 'my/dir' contains the file structure
 */
export function containsFileStructure(dirPath, fileStructure) {
    let itemAbsPath;

    for (const item of fileStructure) {
        if (_.isString(item)) {
            itemAbsPath = path.resolve(dirPath, item);
            if (!fs.existsSync(itemAbsPath)) return false;
        }
        else if (_.isPlainObject(item)) {
            const options = item;

            if (options.symlink) {
                if (!isSymbolicLink(itemAbsPath) ||
                    fs.readlinkSync(itemAbsPath) !== path.resolve(options.symlink)) return false;
            }
            if (options.dir) {
                if (!isDir(itemAbsPath)) return false;
            }
            if (!options.dir) {
                if (isDir(itemAbsPath)) return false;
            }
            if (options.content) {
                if (fs.readFileSync(itemAbsPath).toString() !== options.content) return false;
            }
        }
        else {
            const isContained = containsFileStructure(itemAbsPath, item);
            if (!isContained) return false;
        }
    }

    return true;
}