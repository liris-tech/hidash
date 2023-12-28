import { diff } from './src/diff.js';

import { selectLines } from './src/selectLines.js';

import { walkDir } from './src/walkDir.js';
import { getSubDirs } from './src/getSubDirs.js';
import { isDirEmpty } from './src/isDirEmpty.js';
import { mkdirIfNotExists } from './src/mkdirIfNotExists.js';
import { rmdirIfEmpty } from './src/rmdirIfEmpty.js';
import { isDir } from './src/isDir.js';
import { isSymbolicLink } from './src/isSymbolicLink.js';


export {
    diff,

    selectLines,

    walkDir,
    getSubDirs,
    isDirEmpty,
    mkdirIfNotExists,
    rmdirIfEmpty,
    isDir,
    isSymbolicLink
};
