import _ from 'lodash';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

/**
 * Creates the file structure specified via a hiccup-style notation.
 *
 * @since 0.1.1
 * @category File system
 * @param {Array} fileStructure The file structure to be created described with a hiccup-style notation.
 * @param {string} dirPath The path at which to create the file structure.
 * @returns {boolean} Returns whether the file structure has been created.
 * @example
 *
 * makeFileStructure(
 *     ['playground', {dir: true},
 *         ['some-dir', {dir: true}],
 *         ['symlink-of-some-dir', {dir: true, symlink: 'playground/some-dir'}],
 *         ['some-file', {content: 'some-text'}]]
 * );
 *
 * // => Creates the self-explanatory file structure
 */
export function makeFileStructure(fileStructure, dirPath='.') {
    let itemAbsPath;

    for (const item of fileStructure) {
        if (_.isString(item)) {
            itemAbsPath = path.resolve(dirPath, item);
        }
        else if (_.isPlainObject(item)) {
            const options = item;

            if (options.symlink) {
                const symlinkTarget = path.resolve(options.symlink);
                fs.symlinkSync(symlinkTarget, itemAbsPath, options.dir ? 'dir' : 'file');
            }
            else if (options.dir) {
                fs.mkdirSync(itemAbsPath);
            }
            else {
                fs.writeFileSync(itemAbsPath, options.content ?? '');
            }

        }
        else {
            makeFileStructure(item, itemAbsPath);
        }
    }
}