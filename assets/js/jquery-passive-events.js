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
 * Makes jQuery add the touch and wheel event listeners as passive.
 *
 * <p>A passive listener cannot cancel the event with `preventDefault()`, so the browser
 * can scroll the page without waiting for the listener to finish.
 *
 * <p>Wheel listeners are always passive. A touch listener that needs to call
 * `preventDefault()` must be bound in the `noPreventDefault` namespace,
 * for example, `touchstart.noPreventDefault`.
 */
jQuery.event.special.touchstart = {
    setup: function (_, namespaces, handler) {
        this.addEventListener('touchstart', handler, {
            passive: !namespaces.includes('noPreventDefault')
        });
    }
};
jQuery.event.special.touchmove = {
    setup: function (_, namespaces, handler) {
        this.addEventListener('touchmove', handler, {
            passive: !namespaces.includes('noPreventDefault')
        });
    }
};
jQuery.event.special.wheel = {
    setup: function (_, namespaces, handler) {
        this.addEventListener('wheel', handler, {passive: true});
    }
};
jQuery.event.special.mousewheel = {
    setup: function (_, namespaces, handler) {
        this.addEventListener('mousewheel', handler, {passive: true});
    }
};
