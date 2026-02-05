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
 * This script is a logic behind the Code Tabs widget.
 *
 * <p>This widget can show one or more code examples in separate tabs with
 * arbitrary language names. When the widget has only one language, add
 * the `one-tab` CSS class as shown in the example below.
 *
 * <p>By default, we synchronize the language between all widgets with the same
 * set of languages. That is, when a user selects "Java" in a [Java | Kotlin]
 * widget, the language will change in all such widgets.
 *
 * <p>The selected language will be saved in cookies and the user will be able
 * to navigate between pages without selecting the language again.
 * This is useful for selecting a preferred language on the documentation pages.
 *
 * <p>To disable this synchronization, add the `data-standalone` parameter
 * to the widget. With this parameter, the widget will always maintain
 * its own language and not persist it in cookies.
 *
 * In Hugo, use `{{< code-tabs >}}` and `{{< standalone-code-tabs >}}`
 * short codes, which will handle all configuration.
 *
 * In HTML, use the following code:
 *
 * <div class="code-block code-tabs" [data-standalone] >
 *   <div class="code-block-header tabs [one-tab]">
 *     <div class ="indicator"></div>
 *     <div class="tab" lang="Java">
 *       Java
 *     </div>
 *     <div class="tab" lang="Kotlin">
 *       Kotlin
 *     </div>
 *   </div>
 *     ... code blocks
 * </div>
 */
$(function () {
    const $widgets = $('.code-tabs').find('.tabs');

    const activeClass = 'active';
    const codeTabContentClass = 'code-tab-content';
    const indicatorLineClass = 'indicator';
    const tabClass = 'tab';
    const tabLangAttr = 'lang';
    const standaloneDataAttr = 'standalone';

    initCodeTabs();

    /**
     * Inits a code language tabs.
     */
    function initCodeTabs() {
        $widgets.each(function () {
            const $widget = $(this);
            const initialLanguage = getInitialLanguage($widget);
            setWidgetLang($widget, initialLanguage);
            $widget.children(`.${tabClass}`).each(function () {
                const $tab = $(this);
                $tab.on('click', function () {
                    onTabClick($widget, $tab);
                });
            });
        });
    }

    /**
     * Handles the click on the tab.
     *
     * @param {element} widget the widget where the clicked tab is located
     * @param {element} tab the tab that was clicked
     */
    function onTabClick(widget, tab) {
        const lang = getTabLang(tab);
        if (lang) {
            if (isStandalone(widget)) {
                setWidgetLang(widget, lang);
            } else {
                const group = getWidgetGroup(widget);
                setGroupLang(group, lang);
            }
        }
    }

    /**
     * Sets the language for all non-standalone widgets in the group, and
     * persists it in the cookies.
     *
     * @param group the name of the group
     * @param lang the language
     */
    function setGroupLang(group, lang) {
        Cookies.set(group, lang);
        $widgets.each(function () {
            const $widget = $(this);
            if (!isStandalone($widget)) {
                if (group === getWidgetGroup($widget)) {
                    setWidgetLang($widget, lang)
                }
            }
        });
    }

    /**
     * Gets the language value of the given tab element.
     *
     * @param tab a tab element that has the lang attribute
     * @return {string} the tab language value
     */
    function getTabLang(tab) {
        return tab.attr(tabLangAttr).toLowerCase().replace(/ /g, "-");
    }

    /**
     * Sets the language for the widget.
     *
     * <p>If the tab with the specified language is missing, makes the first
     * tab active.
     *
     * <p>Adds CSS classes to make the tab and its content visible on the
     * page. The CSS is located at `assets/scss/components/_code-tabs.scss`.
     *
     * @param {element} widget the widget
     * @param {string} codeLang the code language that is active
     * @see assets/scss/components/_code-tabs.scss
     */
    function setWidgetLang(widget, codeLang) {
        const $tabItems = widget.children(`.${tabClass}`);
        const $tabContents = widget.siblings(`.${codeTabContentClass}`);

        $tabItems.removeClass(activeClass);
        $tabContents.removeClass(activeClass);

        const activeTabs = $tabItems.filter(`[${tabLangAttr}="${codeLang}"]`);
        const activeContent = $tabContents.filter(`[${tabLangAttr}="${codeLang}"]`);

        if (activeTabs.length) {
            activeTabs.addClass(activeClass);
            activeContent.addClass(activeClass);
        } else {
            const firstTab = $tabItems.first();
            const langValue = firstTab.attr(tabLangAttr);

            firstTab.addClass(activeClass);
            $tabContents.filter(`[${tabLangAttr}="${langValue}"]`).addClass(activeClass);
        }

        animateActiveLine(widget);
    }

    /**
     * Returns the initial language for the given widget.
     *
     * <p>For standalone widgets, returns the language of the first tab.
     *
     * <p>Otherwise, returns the language persisted in the cookies.
     * If not found, falls back to the language of the first tab.
     *
     * @param widget the widget
     * @return {string}
     */
    function getInitialLanguage(widget) {
        if (!isStandalone(widget)) {
            const widgetGroup = getWidgetGroup(widget);
            const cookieValue = Cookies.get(widgetGroup);
            if (cookieValue) {
                return cookieValue;
            }
        }
        return getTabLang(widget.find(`.${tabClass}:first`));
    }

    /**
     * Checks whether this widget is standalone and must not share its state
     * with other widgets.
     *
     * @param widget the widget to check
     * @return {boolean}
     */
    function isStandalone(widget) {
        return widget.parent().data(standaloneDataAttr) !== undefined;
    }

    /**
     * Gets the group name of widget.
     *
     * <p>The widgets with the same set of languages have the same group name.
     *
     * <p>The group name is not sensitive to the order in which the languages
     * are defined and to the case of how they're spelled. That is,
     * [Java, Kotlin] and [kOtLiN, jAvA] will have the same group name.
     *
     * @param widget a widget
     * @return {string} the name of the group
     */
    function getWidgetGroup(widget) {
        return widget
            .children(`.${tabClass}`)
            .toArray()
            .map(el => el.getAttribute('lang').toLowerCase().replace(/ /g, "_"))
            .sort()
            .join('_');
    }

    /**
     * Changes the position and width of the active tab indicator line.
     *
     * <p>If for some reason the active tab width is 0, the CSS class
     * `show-static-indicator` will be added, which is managed
     * in `assets/scss/components/_code-tabs.scss`.
     *
     * @param widget an element containing tabs
     */
    function animateActiveLine(widget) {
        const $activeTab = widget.find(`.${activeClass}`);
        const $indicator = widget.find(`.${indicatorLineClass}`);

        if ($activeTab.length) {
            const tabLeftPosition = $activeTab.position().left;
            const tabWidth = $activeTab.outerWidth();

            $activeTab.toggleClass('show-static-indicator', tabWidth == 0);
            $indicator.css({
                width: tabWidth,
                left: tabLeftPosition
            });
        }
    }
});
