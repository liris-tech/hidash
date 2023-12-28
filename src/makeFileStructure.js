import _ from 'lodash';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

/**
 * Creates the file structure specified via a hiccup-style notation.
 *
 * @since 0.1.0
 * @category File system
 * @param {[*]} fileStructure The file structure to be created described with a hiccup-style notation.
 * @param {string} root The path at which to create the file structure.
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
export function makeFileStructure(fileStructure, root='.') {
    const rootAbsPath = path.resolve(root);
    createFilesAndDirs(fileStructure, rootAbsPath, rootAbsPath);
}


function createFilesAndDirs(fileStructure, rootAbsPath, currentAbsPath) {
    let itemAbsPath;

    for (const item of fileStructure) {
        if (_.isString(item)) {
            itemAbsPath = path.resolve(currentAbsPath, item);
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
            createFilesAndDirs(item, rootAbsPath, itemAbsPath);
        }
    }
}