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
const $themeCSS = $('#code-theme-css');

const THEME_ATTR = 'data-theme';
const COOKIE_ATTR = 'themeColor';
const THEMES = ['light', 'dark'];

/**
 * Inits the website dark/light theme.
 *
 * <p>Adds the appropriate value to the `<html data-theme="">` attribute.
 *
 * <p>Gets the default theme from the user system preferences.
 *
 * <p>The selected theme will be saved in cookies and the user will be able
 * to navigate between pages without selecting the theme again.
 *
 * <p>Imports different code CSS styles depending on the theme.
 * See the `layouts/_partials/theme/head/code-theme.html`.
 */
export function initTheme(useSystemPreference = true, defaultTheme = 'dark') {
    const systemTheme = useSystemPreference &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : defaultTheme;

    const savedTheme = Cookies.get(COOKIE_ATTR);
    const theme = THEMES.includes(savedTheme)
        ? savedTheme
        : systemTheme;

    setTheme(theme);
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
 * Sets the provided theme as the HTML data attribute,
 * changes the CSS `href` of the code highlight theme,
 * and saves the theme to cookies.
 *
 * @param {string} theme the code theme to be set
 */
function setTheme(theme) {
    if (!THEMES.includes(theme)) return;

    $themeCSS.attr('href', $themeCSS.data(theme));
    $html.attr(THEME_ATTR, theme);
    Cookies.set(COOKIE_ATTR, theme);
}
