/*
 * Copyright 2026 CodeMatters, Lda.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

/**
 * Adds vendor prefixes to CSS.
 *
 * See the `overrideBrowserslist` for the actual list of browsers,
 * where `> 0.5%` means all browsers that are used by more than 0.5%
 * of users worldwide. See https://github.com/browserslist/browserslist#queries.
 */
const autoprefixer = require('autoprefixer');

/**
 * Discards comments from the CSS.
 *
 * See https://www.npmjs.com/package/postcss-discard-comments.
 */
const discardComments = require('postcss-discard-comments');

module.exports = {
    plugins: [
        autoprefixer({
            overrideBrowserslist: ['defaults', 'not dead', '> 0.5%', 'last 2 versions']
        }),
        discardComments({removeAllButFirst: true})
    ]
}
