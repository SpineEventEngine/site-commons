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

/**
 * Toggles the sidenav on mobile devices.
 */
export function initSidenav() {
    const $body = $('body');
    const $mobileSidenavToggle = $('#mobile-sidenav-toggle');
    const $mobileSidenavCloseBtn = $('#close-mobile-sidenav');
    const mobileSidenavOpenedClass = 'mobile-sidenav-opened';

    $(window).on('resize', function() {
        hideMobileSidenavOnResize();
    });

    /**
     * Shows the mobile sidenav panel on the toggle click.
     */
    $mobileSidenavToggle.click(function () {
        $body.addClass(mobileSidenavOpenedClass);
    });

    /**
     * Closes the mobile sidenav panel on the close button click.
     */
    $mobileSidenavCloseBtn.click(function () {
        $body.removeClass(mobileSidenavOpenedClass);
    });

    /**
     * Hides the mobile sidenav on window resizing.
     */
    function hideMobileSidenavOnResize() {
        const tabletWidth = 880;
        const mobileWindow = $(window).width() <= tabletWidth;

        if (!mobileWindow) {
            $body.removeClass(mobileSidenavOpenedClass);
        }
    }
}
