(() => {
  "use strict";

  // 本番URLの設定箇所。空文字の間は仮リンクとして案内を表示します。
  const LINKS = Object.freeze({
    square: {
      "bbq-trial-set": "https://square.link/u/4V32yFKp",
      "bbq-family-set": "https://square.link/u/WXSCb92v",
      "takeout-main-bento": "https://square.link/u/ppGdSqtK",
      "takeout-standard-bento": "https://square.link/u/r9iZpmzI"
    },
    external: {
      "official-instagram": "https://www.instagram.com/daichan_yakiniku_jingisukan/",
      "line-reservation": "https://lin.ee/6GEkByB"
    }
  });

  const toast = document.querySelector("#link-toast");
  let toastTimer;

  function showPlaceholderNotice() {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 4200);
  }

  function configureExternalLink(link, attributeValue, fallbackValue) {
    const target = attributeValue || fallbackValue;
    if (target) {
      link.href = target;
      link.target = "_blank";
      link.rel = "noopener";
      return;
    }
    link.setAttribute("aria-description", "公式URLの設定待ちです");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPlaceholderNotice();
    });
  }

  document.querySelectorAll("a[data-square-link]").forEach((link) => {
    const key = link.dataset.squareLink;
    const target = LINKS.square[key];
    if (target) {
      link.href = target;
      link.target = "_blank";
      link.rel = "noopener";
      return;
    }
    link.setAttribute("aria-description", "仮リンク。Square本番URLの設定待ちです");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPlaceholderNotice();
    });
  });

  document.querySelectorAll("a[data-line-url]").forEach((link) => {
    configureExternalLink(link, link.dataset.lineUrl, LINKS.external["line-reservation"]);
  });

  document.querySelectorAll("a[data-official-instagram]").forEach((link) => {
    configureExternalLink(link, link.dataset.officialInstagram, LINKS.external["official-instagram"]);
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
