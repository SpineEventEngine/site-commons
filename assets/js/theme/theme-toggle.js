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

const $html = $('html');

const THEME_ATTR = 'data-theme';
const COOKIE_ATTR = 'themeColor';
const THEMES = ['light', 'dark'];

/**
 * Inits the website dark/light theme.
 *
 * <p>The theme is applied to the `<html data-theme="">` attribute before the first paint
 * by `layouts/_partials/theme/scripts/head/theme-preload.html`. Make sure the page includes
 * it via `layouts/_partials/theme/head/code-theme.html`.
 *
 * <p>The applied theme will be saved in cookies and the user will be able
 * to navigate between pages without selecting the theme again.
 */
export function initTheme() {
    setTheme($html.attr(THEME_ATTR));
}

/**
 * Toggles the theme.
 */
export function toggleTheme() {
    const current = $html.attr(THEME_ATTR) || 'light';
    const newTheme = current === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
}

/**
 * Sets the provided theme as the HTML data attribute
 * and saves the theme to cookies.
 *
 * <p>The colors of each theme are defined in `assets/scss/theme/common/code/`.
 *
 * @param {string} theme the code theme to be set
 */
function setTheme(theme) {
    if (!THEMES.includes(theme)) return;

    $html.attr(THEME_ATTR, theme);
    Cookies.set(COOKIE_ATTR, theme);
}
