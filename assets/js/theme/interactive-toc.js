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
 * Makes the Hugo TOC items interactive.
 * 
 * <p>During scrolling, adds the `current` class to the anchor, the heading 
 * of which is now visible on the page.
 *
 * <p>Note, that the TOC element should be wrapped into the `div` with 
 * the `interactive-toc` class. For example:
 * ```
 * <div class="interactive-toc">
 *     {{ .TableOfContents }}
 * </div>
 * ```
 */
export function interactiveToc() {
    const $interactiveToc = $('.interactive-toc');
    const $tocItems = $interactiveToc.find('#TableOfContents a');
    const currentClass = 'current';
    let anchors = null;
    let lastActiveElement = null;
    let disableScroll = false;

    if ($interactiveToc.length) {
        getAnchors();
        markCurrentTocItem();

        $(window).on('load', function() {
            getAnchors();
            markCurrentTocItem();
        });

        $(window).on('scroll', function() {
            if (disableScroll) return;
            markCurrentTocItem();
        });
    }

    /**
     * Makes the clicked TOC item active.
     *
     * <p>Prevents the default scroll to avoid active item overriding.
     */
    $tocItems.on('click', function (e) {
        e.preventDefault();
        const $current = $(this);
        const anchor = $current.attr('href');

        disableScroll = true;
        $tocItems.removeClass(currentClass);
        $current.addClass(currentClass);
        window.location.hash = anchor;

        $('html, body').animate(
            {scrollTop: $(anchor).offset().top - 80},
            300,
            function () {
                disableScroll = false;
            }
        );
    });

    /**
     * Marks the current TOC item with the `currentClass`.
     */
    function markCurrentTocItem() {
        if (!anchors) return;
        $tocItems.removeClass(currentClass);
        const $active = getCurrentTocItem().addClass(currentClass);
        scrollToActiveTocItem($active.get(0));
    }

    /**
     * Returns the TOC item, heading of which is now visible on the page.
     *
     * @returns {jQuery|HTMLElement} the current TOC item
     */
    function getCurrentTocItem() {
        const scrollPosition = window.pageYOffset;
        const windowIncrement = 0.14;
        let currentAnchor = null;
        anchors.each(function() {
            let headingPosition = getHeading(this).position().top;
            if (headingPosition < scrollPosition + window.innerHeight * windowIncrement) {
                currentAnchor = this;
                return;
            }
        })
        return getTocItem(currentAnchor);
    }

    /**
     * Returns the TOC item corresponding to the provided `anchor`.
     *
     * @param {String} anchor the anchor of the visible heading
     * @returns {*|jQuery|HTMLElement} the TOC item corresponding to the `anchor`
     */
    function getTocItem(anchor) {
        return $('#TableOfContents a[href=\"' + anchor + '\"]');
    }

    /**
     * Returns the heading element corresponding to the provided `anchor`.
     *
     * @param {String} anchor the anchor of the heading
     * @returns {*|jQuery|HTMLElement} the heading element
     */
    function getHeading(anchor) {
        return $(':header[id=' + anchor.substring(1) + ']');
    }

    /**
     * Returns the list of available anchors on the page.
     *
     * @returns {Array} the list of anchors
     */
    function getAnchors() {
        if (!anchors) {
            anchors = $tocItems.map(function() {
                return $(this).attr("href");
            });
        }
        return anchors;
    }

    /**
     * Scrolls the TOC container to the active item.
     *
     * @param {DOM node} activeElement the active element in the TOC
     */
    function scrollToActiveTocItem(activeElement) {
        if (!activeElement) return;

        if ($interactiveToc && $interactiveToc[0].contains(activeElement) && !isElementInView(activeElement)) {
            if (activeElement !== lastActiveElement) {
                activeElement.scrollIntoView({
                    block: 'nearest',
                    inline: 'nearest',
                    behavior: 'smooth'
                });
                lastActiveElement = activeElement;
            }
        }
    }

    /**
     * Checks if the element is in view.
     *
     * <p>Helps to avoid scroll jumping at the top of the page.
     *
     * @param element the element that should be in the view
     * @return {boolean}
     */
    function isElementInView(element) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
}
