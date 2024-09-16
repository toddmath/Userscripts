/**
  The MIT License (MIT)
  Copyright (c) 2019 toddmath
  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
// ==UserScript==
// @name         3d Text Select
// @namespace    https://openuserjs.org/users/toddmath
// @version      0.3
// @license      MIT
// @description  Advanced selected text shadow, making it pop out and stand out.
// @copyright    2019, toddmath (https://toddmath.com)
// @icon64       https://img.icons8.com/dusk/64/000000/cursor.png
// @icon         https://img.icons8.com/dusk/128/000000/cursor.png
// @iconURL      https://img.icons8.com/dusk/128/000000/cursor.png
// @icon64URL    https://img.icons8.com/dusk/64/000000/cursor.png
// @homepageURL  https://github.com/toddmath/Userscripts
// @grant        GM_info
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getTab
// @grant        GM_saveTab
// @match        <all_urls>
// @connect      *
// @include      *
// @run-at       document-end
// @updateURL    https://openuserjs.org/meta/toddmath/3d_text_select.meta.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js#sha256=pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8
// ==OpenUserJS==
// @author       toddmath
// ==/OpenUserJS==
// ==/UserScript==
"use strict"

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true)
$(document).ready(function () {
  // Customize text shadow below (must be valid css string)
  const cus_text_shadow =
    "1px 0px 1px #424242, 0px 1px 1px #424242, 0px -1px 1px #424242, -1px 0px 1px #424242, 1px 1px 1px #5C6BC0, 2px 2px #536DFE, 3px 3px 1px #7986CB, 4px 4px 2px #EA80FE, 4px 5px 2px #E1BEE7"
  // Alternative custom text shadow
  const cus_text_shadow_alt =
    "0 0 0 #000, 0 0 0 #D7624E, 0.0025em 0.0025em 0 #D7624E, 0.005em 0.005em 0 #D7624E, 0.0075em 0.0075em 0 #D7624E, 0.01em 0.01em 0 #D7624E, 0.0125em 0.0125em 0 #D7624E, 0.015em 0.015em 0 #D7624E, 0.0175em 0.0175em 0 #D7624E, 0.02em 0.02em 0 #D7624E, 0.0225em 0.0225em 0 #D7624E, 0.025em 0.025em 0 #D7624E, 0.0275em 0.0275em 0 #D7624E, 0.03em 0.03em 0 #D7624E, 0.0325em 0.0325em 0 #D7624E, 0.035em 0.035em 0 #D7624E, 0.0375em 0.0375em 0 #D7624E, 0.04em 0.04em 0 #D7624E, 0.0425em 0.0425em 0 #D7624E, 0.045em 0.045em 0 #D7624E, 0.0475em 0.0475em 0 #D7624E, 0.05em 0.05em 0 #D7624E, 0.0525em 0.0525em 0 #D7624E, 0.055em 0.055em 0 #D7624E, 0.0575em 0.0575em 0 #D7624E, 0.06em 0.06em 0 #D7624E, 0.0625em 0.0625em 0 #D7624E, 0.065em 0.065em 0 #D7624E, 0.0675em 0.0675em 0 #D7624E, 0.07em 0.07em 0 #D7624E, 0.0725em 0.0725em 0 #D7624E, 0.075em 0.075em 0 #D7624E, 0.0775em 0.0775em 0 #D7624E, 0.08em 0.08em 0 #D7624E, 0.0825em 0.0825em 0 #D7624E, 0.085em 0.085em 0 #D7624E, 0.0875em 0.0875em 0 #D7624E, 0.09em 0.09em 0 #D7624E, 0.0925em 0.0925em 0 #D7624E, 0.095em 0.095em 0 #D7624E, 0.0975em 0.0975em 0 #D7624E, 0.1em 0.1em 0 #D7624E;"
  // Customize color of selected text below
  const cus_text_color = "#FAFAFA"
  // Alternative selected text color
  const cus_text_color_alt = "#424242"
  // Customize background below
  const cus_background = "none repeat scroll 0% 0% transparent"
  // Customize input field text color (selected text inside form fields and other text-fields)
  const cus_input_text_color = "#536DFE"
  // Customize 3d level (selected text moving up)
  const cus_top = "0.0975em !important"
  // Customize 3d level (selected text moving left)
  const cus_left = "0.0975em !important"
  const text_grow = "20% !important"
  // Hack to render selected text using GPU acceleration (faster & smoother)
  const gpu_render = "translateZ(0, 0, 0) !important"

  const inputSelectors = ["input::selection", "textarea::selection"]
  const browserSelectors = [
    "a::selection",
    "::selection",
    "::-webkit-selection",
    "::-ms-selection",
    "::-o-selection",
  ]

  const browserRules = `position: relative; top: ${cus_top}; left: ${cus_left}; color: ${cus_text_color_alt}; background: ${cus_background}; text-shadow: ${cus_text_shadow_alt};`

  const inputRules = `position: relative; color: ${cus_input_text_color} !important; background: ${cus_background};`

  // let styleString = ""

  const poolStyles = (select, styles) => `${select} {${styles}}`

  const addStyles = str => GM_addStyle(String(str))

  // inputSelectors.forEach(sel => (styleString += poolStyles(sel, inputRules)))
  // browserSelectors.forEach(sel => (styleString += poolStyles(sel, browserRules)))

  const getStyles = (selectors, rules) =>
    selectors.reduce((acc, sel) => (acc += poolStyles(sel, rules)), "")

  // const newInputStyles = inputSelectors.reduce(
  //   (acc, sel) => (acc += poolStyles(sel, inputRules)),
  //   ""
  // )
  // const newBrowserStyles = browserSelectors.reduce(
  //   (acc, sel) => (acc += poolStyles(sel, browserRules)),
  //   ""
  // )

  const newInputStyles = getStyles(inputSelectors, inputRules)
  const newBroswerStyles = getStyles(browserSelectors, browserRules)

  const styleString = newInputStyles + newBrowserStyles

  addStyles(styleString)
})
