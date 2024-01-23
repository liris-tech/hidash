import { isSymbolicLink } from './isSymbolicLink.js';
import { isDir } from './isDir.js';

import _ from 'lodash';

import fs from 'node:fs';
import path from 'node:path';

// =====================================================================================================================

/**
 * Checks if directory conforms to the file structure specified via a hiccup-style notation.
 *
 * @since 0.1.1
 * @category File system
 * @param {string} dirPath The path of the directory containing (or not) the fileStructure.
 * @param {Array} fileStructure The file structure to be created described with a hiccup-style notation.
 * @param {Object} [options] Optional options.
 * @param {boolean} [strict=false] Should strictly match? Or is containing sufficient?
 * @param {Array} [ignorePatterns=[/^\.+/]] Regexp patterns of file system entries' (relative) name to be ignored.
 * @param {boolean} [symlink=true] Should symlink  be returns?
 * @returns {boolean} Returns whether the directory contains the file structure.
 * @example
 *
 * matchesFileStructure(
 *     ['playground', {dir: true},
 *         ['some-dir', {dir: true}],
 *         ['symlink-of-some-dir', {dir: true, symlink: 'playground/some-dir'}],
 *         ['some-file', {content: 'some-text'}]],
 *     '/my/dir'
 * );
 *
 * // => returns whether 'my/dir' conforms strictly to the file structure
 */
export function matchesFileStructure(dirPath, fileStructure, {strict=false, ignorePatterns=[], symlink=true} = {}) {
    const fileStructureEntryName = fileStructure[0];
    const fileStructureEntryProps = fileStructure[1];
    const fileSystemEntryPath = path.join(dirPath, fileStructureEntryName);

    const isConsistent = entryIsConsistentBetweenFileStructureAndFileSystem(fileStructureEntryProps,
        fileSystemEntryPath, {ignorePatterns, symlink});
    if (isConsistent && (fileStructureEntryProps.symlink || !fileStructureEntryProps.dir)) {
        // we don't need to recursively check symlinks. Files cannot be traversed either.
        return true;
    }
    else if (isConsistent) {
        const fileStructureSubEntries = getSubEntriesFromFileStructure(fileStructure);
        const fileStructureSubEntryNames = fileStructureSubEntries.map(entry => entry[0]);
        const fileSystemSubEntryNames = _readdirSync(fileSystemEntryPath, {ignorePatterns, symlink});

        if ((!strict && _.difference(fileStructureSubEntryNames, fileSystemSubEntryNames)).length ||
            (strict && !_.isEqual(new Set(fileStructureSubEntryNames), new Set(fileSystemSubEntryNames)))) {
            // in the non-strict case, the entry names of the filesystem should contain all those of the file structure.
            // in the strict case, the entry names of the filesystem should be equal to those of the file structure.
            return false;
        }
        else if (fileStructureSubEntries.length) {
            for (const fileStructureSubEntry of fileStructureSubEntries) {
                const isSubStructureConsistent = matchesFileStructure(fileSystemEntryPath, fileStructureSubEntry,
                    {ignorePatterns, symlink, strict});
                if (!isSubStructureConsistent) {
                    return false;
                }
            }
            return true;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}


function entryIsConsistentBetweenFileStructureAndFileSystem(fileStructureEntryProps, fileSystemEntryPath, {
    ignorePatterns,
    symlink
}) {
    // options
    if (ignorePatterns.length) {
        const baseName = path.basename(fileSystemEntryPath);
        const matchesIgnorePattern = _.some(ignorePatterns, pat => pat.test(baseName));
        if (matchesIgnorePattern) {
            return false;
        }
    }
    if (!symlink) {
        if (isSymbolicLink(fileSystemEntryPath)) {
            return false;
        }
    }

    // logic
    if ((fileStructureEntryProps.dir && !isDir(fileSystemEntryPath)) ||
        (!fileStructureEntryProps.dir && isDir(fileSystemEntryPath)) ||
        (fileStructureEntryProps.symlink &&
            (!isSymbolicLink(fileSystemEntryPath) ||
                fs.readlinkSync(fileSystemEntryPath) !== path.resolve(fileStructureEntryProps.symlink)
            )) ||
        (fileStructureEntryProps.content && (
            fileStructureEntryProps.content !== fs.readFileSync(fileSystemEntryPath).toString()
        ))) {
        return false;
    }

    return true;
}


function getSubEntriesFromFileStructure(fileStructure) {
    return fileStructure.slice(2);
}


function _readdirSync(entryPath, {ignorePatterns, symlink}) {
    try {
        return _(fs.readdirSync(entryPath))
            .filter(name => _.every(ignorePatterns, pat => !pat.test(name)))
            .filter(name => symlink || !isSymbolicLink(path.join(entryPath, name)))
            .value();
    }
    catch {
        // entry was a file, not a dir
        return [];
    }
}