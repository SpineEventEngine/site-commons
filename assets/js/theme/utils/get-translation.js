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
 * Returns the translation based on the page `lang` attribute.
 *
 * <p>If the translation for the page language is not available,
 * falls back to the default language.
 *
 * @param {Object} translations an object containing translations
 *                              for different languages
 * @returns {string} the translation for the current page language
 */
export function getTranslation(translations) {
    const defaultLanguage = 'en';
    const pageLanguage = $('html').attr('lang');

    if (translations[pageLanguage] !== undefined) {
        return translations[pageLanguage];
    } else {
        return translations[defaultLanguage];
    }
}
