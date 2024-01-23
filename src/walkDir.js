import { getSubDirs } from './getSubDirs.js';
import { isDir } from './isDir.js';

import _ from 'lodash';

import path from 'node:path';

// =====================================================================================================================

const defaultOptions = {
    isLeaf: (currentDirAbsPath) => !isDir(currentDirAbsPath),
    ignorePatterns: [/^\.+/],
    symlink: true
}

/**
 * Recursively walks down the directory structure, applying a callback to each directory's path.
 *
 * @since 0.1.0
 * @category File system
 * @param {string} fromPath The path from which to walk the directory tree.
 * @param {function} [callback=_.identity] The callback to be applied to each directory's path during the walk.
 * @param {Object} [options] Optional options.
 * @param {function} [options.isLeaf=(path) => !isDir(path)] Condition to stop walking down.
 * @param {Array} [options.ignorePatterns=[/^\.+/]] Regexp patterns of subdirectories' (relative) name to be ignored.
 * @param {boolean} [options.symlink=true] Should symlink subdirectories be walked?
 * @returns {Array} Returns the array of results from applying the callback to each directory during the walk.
 * @example
 *
 * // for directory structure:
 * // /my/dir1
 * //      |--- sub-dir1
 * //      |--- sub-dir2
 * //                | --- sub-sub-dir
 * //      |--- some-file
 *
 * walkDir({fromPath: '/my/dir1'})
 * // => ['/my/dir1', '/my/dir1/sub-dir1', '/my/dir1/sub-dir2', '/my/dir1/sub-dir2/sub-sub-dir']
 *
 * walkDir({fromPath: '/my/dir1', callback: absPath => absPath.length})
 * // => [8, 17, 17, 29]
 *
 * walkDir({fromPath: '/my/dir1', callback: absPath => absPath.length, options: {ignorePatterns: [/^sub-sub/]})
 * // => [8, 17, 17]
 */
export function walkDir(
    {
        fromPath,
        callback=(currentDirAbsPath) => currentDirAbsPath,
        options=defaultOptions,
    } = {}
) {
    if (!isDir(fromPath)) {
        throw new Error(`${fromPath} isn't a directory.`);
    }
    if (!_.isPlainObject(options)) {
        throw new Error(`options should be an object. Received: ${options} instead.`);
    }
    if (!_.isFunction(callback)) {
        throw new Error(`callback should be a function. Received: ${callback} instead.`);
    }

    const res = [];
    _walkDir(fromPath, _.merge({}, defaultOptions, options), callback, res);
    return res;
}


function _walkDir(fromPath, options, callback, res) {
    res.push(callback(path.resolve(fromPath)));

    if (!options.isLeaf(fromPath)) {
        for (const dirAbsPath of getSubDirs(fromPath, options)) {
            _walkDir(dirAbsPath, options, callback, res);
        }
    }
}