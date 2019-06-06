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
// @version      0.2
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
// @require      https://code.jquery.com/jquery-3.4.1.slim.min.js#sha256=pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8
// ==OpenUserJS==
// @author       toddmath
// ==/OpenUserJS==
// ==/UserScript==
'use strict'

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function () {
  // Customize text shadow below (must be valid css string)
  var cus_text_shadow = "1px 1px 1px #000, 2px 2px 2px #5C6BC0, 3px 3px 3px #536DFE, 3px 3px 3px #7986CB, 4px 4px 5px #EA80FE, 5px 5px 7px #E1BEE7";
  // Customize color of selected text below
  var cus_text_color = "#FAFAFA";
  // Customize background below
  var cus_background = "none repeat scroll 0% 0% transparent";
  // Customize input field text color (selected text inside form fields and other text-fields)
  var cus_input_text_color = "#536DFE";
  // Customize 3d level (selected text moving up)
  var cus_top = "-3px";
  // Customize 3d level (selected text moving left)
  var cus_left = "-3px";

  function universal_select_style() {
    GM_addStyle(`input::selection { position: relative; color: ${cus_input_text_color} !important; background: ${cus_background} };`)
    GM_addStyle(`a::selection { position: relative; top: ${cus_top} ; left: ${cus_left}; color: ${cus_text_color}; background: ${cus_background}; text-shadow: ${cus_text_shadow}; }`)
    GM_addStyle(`textarea::selection { position: relative; color: ${cus_input_text_color} !important; background: ${cus_background} };`)
  }

  function firefox_select_style() {
    GM_addStyle(`::-moz-selection { position: relative; top: ${cus_top} ; left: ${cus_left}; color: ${cus_text_color}; background: ${cus_background}; text-shadow: ${cus_text_shadow}; }`)
  }

  function chrome_select_style() {
    GM_addStyle(`::selection { position: relative; top: ${cus_top} ; left: ${cus_left}; color: ${cus_text_color}; background: ${cus_background}; text-shadow: ${cus_text_shadow}; }`)
  }

  function webkit_select_style() {
    GM_addStyle(`::-webkit-selection { position: relative; top: ${cus_top} ; left: ${cus_left}; color: ${cus_text_color}; background: ${cus_background}; text-shadow: ${cus_text_shadow}; }`)
  }

  function other_select_style() {
    GM_addStyle(`::-ms-selection { position: relative; top: ${cus_top} ; left: ${cus_left}; color: ${cus_text_color}; background: ${cus_background}; text-shadow: ${cus_text_shadow}; }`)
    GM_addStyle(`::-o-selection { position: relative; top: ${cus_top} ; left: ${cus_left}; color: ${cus_text_color}; background: ${cus_background}; text-shadow: ${cus_text_shadow}; }`)
  }

  universal_select_style();
  firefox_select_style();
  chrome_select_style();
  webkit_select_style();
  other_select_style();
});