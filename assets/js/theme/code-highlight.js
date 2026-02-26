/*
 * Copyright 2026, TeamDev. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Redistribution and use in source and/or binary forms, with or without
 * modification, must retain the above copyright notice and the following
 * disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
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
