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
