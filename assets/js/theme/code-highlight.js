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

'use strict';

/**
 * Ensures consistent code block styling across the site.
 *
 * Scans all `<pre>` elements and if they are not already wrapped
 * in a highlight container, it wraps them and adds the "chroma" class.
 *
 * This is needed because Hugo renders fenced code blocks differently depending
 * on whether a language is provided after the triple backticks.
 *
 * When a language is specified, Hugo produces:
 * ```
 * <div class="highlight">
 *     <pre class="chroma">...</pre>
 * </div>
 * ```
 *
 * But when no language is specified, Hugo may output only:
 * ```
 * <pre>...</pre>
 * ```
 *
 * This script ensures both cases use the same layout and styling.
 */
$(function () {
    const $codeBlock = $('.markdown pre').not('.mermaid');
    const highlightClass = 'highlight';

    $codeBlock.each(function () {
        const $pre = $(this);

        if (!$pre.closest("." + highlightClass).length) {
            $pre.addClass('chroma')
                .wrap(`<div class="${highlightClass}"></div>`);
        }
    });
});
