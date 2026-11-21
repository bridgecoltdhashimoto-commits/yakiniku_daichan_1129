/* 焼肉大ちゃん: 同一HTMLを GitHub Pages と Cloudflare Workers に公開するための計測切替 */
(function () {
  "use strict";
  var hostname = window.location.hostname.toLowerCase();
  var tokens = {
    "bridgecoltdhashimoto-commits.github.io": "33dd0a049de7406bb59192ccf310d328",
    "yakiniku-daichan-1129.bridge-co-ltd-hashimoto.workers.dev": "f82583cea68b4498aa980095cdebcf0f"
  };
  var token = tokens[hostname];
  if (!token) return;
  var beacon = document.createElement("script");
  beacon.type = "module";
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: token }));
  document.head.appendChild(beacon);
})();
