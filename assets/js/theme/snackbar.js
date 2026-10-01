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
 * This script contains helper functions to show and hide
 * the snackbar notification at the left bottom corner.
 */
const snackbarSelector = 'snackbar';
const snackbarShowClass = 'show';
let snackbarTimeout = null;

/**
 * Shows the snackbar notification.
 *
 * <p>Before showing, if the snackbar doesn't exist,
 * it will be created in the DOM. Then it will be hidden
 * automatically after 3 seconds.
 *
 * @param {String} textToShow text that will be shown in the snackbar
 */
export function showSnackbar(textToShow) {
    createSnackbarElement();
    verifySnackbarPosition();
    const $snackbar = $('.' + snackbarSelector);
    const $snackbarText = $snackbar.find('span');
    $snackbarText.text(textToShow);
    $snackbar.addClass(snackbarShowClass);
    snackbarTimeout = setTimeout(function() {
            hideSnackbar();
        }, 3000
    );
}

/**
 * Hides the snackbar forcibly.
 */
export function hideSnackbar() {
    const $snackbar = $('.' + snackbarSelector);
    clearTimeout(snackbarTimeout);

    if ($snackbar.length && $snackbar.hasClass(snackbarShowClass)) {
        $snackbar.removeClass(snackbarShowClass);
    }
}

/**
 * Changes the snackbar bottom position
 * if the cookie info panel exists on the page.
 */
function verifySnackbarPosition() {
    const root = document.documentElement;
    // The variable is located in the `assets/scss/theme/components/_snackbar.scss`.
    const snackbarBottomPositionCSSVar = '--snackbar-bottom-position';
    const initialBottomPosition = 20;
    const cookieInfo = $('#cookie-notice');
    const cookieContainerHeight = cookieInfo.innerHeight();
    const bottomPositionWithCookieInfo = cookieContainerHeight + initialBottomPosition;

    if (cookieInfo.hasClass('active')) {
        root.style.setProperty(snackbarBottomPositionCSSVar,
            `${bottomPositionWithCookieInfo}px`);
    } else {
        root.style.setProperty(snackbarBottomPositionCSSVar,
            `${initialBottomPosition}px`);
    }
}

/**
 * Creates the snackbar element in the DOM before
 * the closing `<body>` tag.
 */
function createSnackbarElement() {
    const $snackbar = $('.' + snackbarSelector);
    const snackbarLayout = `<div class="${snackbarSelector}"><span></span></div>`;
    if (!$snackbar.length) {
        $('body').append(snackbarLayout);
    }
}
