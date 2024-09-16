// ==UserScript==
// @name        Open Youtube links in IINA
// @namespace   https://palfun-foslup.urbit.org/
// @description Replaces Youtube links with a link to open them in IINA. Set a useful whitelist for yourself.
// @include     *youtube.com/*
// @updateURL   https://gist.githubusercontent.com/Fang-/7db1ac4e798a7128f006fa535f42cfb0/raw/25b60b08e55be87d2b0d5630d1f580b15ca2870d/iina-youtube.js
// @downloadURL https://gist.githubusercontent.com/Fang-/7db1ac4e798a7128f006fa535f42cfb0/raw/25b60b08e55be87d2b0d5630d1f580b15ca2870d/iina-youtube.js
// @run-at      document-end
// @version     1.0
// ==/UserScript==

let ans = document.getElementsByTagName("a")
if (ans && ans.length > 0) {
  for (let i = 0; i < ans.length; i++) {
    let ref = ans[i].href
    if (ref.includes("youtube.com/watch?v=") || ref.includes("youtu.be/")) {
      ans[i].href = `iina://weblink?url={ref}`
    }
  }
}
