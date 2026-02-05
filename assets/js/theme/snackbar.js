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
