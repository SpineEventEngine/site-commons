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

import {hideSnackbar, showSnackbar} from "js/theme/snackbar.js";
import {getTranslation} from "js/theme/utils/get-translation.js";

/**
 * Copies text to clipboard and shows the snackbar.
 *
 * @param {String} textToCopy text to be copied to the clipboard
 * @param {boolean} isSnackbar indicates whether to show snackbar
 */
export function copyToClipboard(textToCopy, isSnackbar = true) {
    const dummy = document.createElement('textarea');
    const snackbarMessage = getTranslatedMessage();

    hideSnackbar();
    document.body.appendChild(dummy);
    dummy.value = textToCopy;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    if (isSnackbar) {
        showSnackbar(snackbarMessage);
    }
}

/**
 * Gets the translated message of “Copy to clipboard”.
 *
 * @returns {string} the translated message
 */
function getTranslatedMessage() {
    const translations = {
        en: "Copied to clipboard"
    }
    return getTranslation(translations);
}
