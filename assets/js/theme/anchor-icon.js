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

import {copyToClipboard} from "js/theme/copy-to-clipboard";

/**
 * Manages the anchor icon click.
 *
 * <p>Also, copies the `href` to clipboard.
 */
export function setupAnchorClick() {
    const anchorIconClass = 'anchor-icon';
    const $anchorLinks = $('a[href^="#"]');

    $anchorLinks.on('click', function() {
        const $this = $(this);
        const anchor = $this.attr('href');

        if ($this.hasClass(anchorIconClass)) {
            window.location.hash = anchor;
            copyToClipboard(window.location.href);
        }
    });
}
