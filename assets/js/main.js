/* =========================================================
   サイト共通スクリプト（通常は編集不要です）
   - サイドバー（プロフィール＋メニュー）を各ページに挿入
   - 表示中のセクションに合わせてメニューをハイライト
   - スマホ用の上部メニューバーを挿入
   ========================================================= */
(function () {
  "use strict";

  var PAGES = [
    { id: "home",      label: "ホーム",         href: "index.html" },
    { id: "research",  label: "研究実績",       href: "research.html" },
    { id: "portfolio", label: "ポートフォリオ", href: "portfolio.html" }
  ];

  var P = window.PROFILE || {};
  var current = document.body.getAttribute("data-page") || "home";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // このページ内のセクション（data-nav 属性を持つもの）
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[data-nav][id]"));

  // ---------- サイドバー ----------
  var sidebar = document.getElementById("sidebar");
  if (sidebar) {
    var avatar = P.photo
      ? '<img src="' + esc(P.photo) + '" alt="' + esc(P.name) + 'の写真">'
      : '<span aria-hidden="true">Photo</span>';

    var navHtml = PAGES.map(function (pg, i) {
      var isCur = pg.id === current;
      var sub = "";
      if (isCur && sections.length > 1) {
        sub = '<div class="sub-nav">' + sections.map(function (s) {
          return '<a href="#' + s.id + '" data-target="' + s.id + '">' + esc(s.getAttribute("data-nav")) + "</a>";
        }).join("") + "</div>";
      }
      return '<li class="nav-item' + (isCur ? " is-current" : "") + '">' +
        '<a href="' + pg.href + '"' + (isCur ? ' aria-current="page"' : "") + ">" +
        "<span>" + pg.label + '</span><span class="num">0' + (i + 1) + "</span></a>" + sub + "</li>";
    }).join("");

    sidebar.innerHTML =
      '<div class="avatar">' + avatar + "</div>" +
      '<h1 class="profile-name">' + esc(P.name) + "</h1>" +
      '<p class="profile-name-en">' + esc(P.nameEn) + "</p>" +
      '<dl class="profile-meta">' +
        "<div><dt>AFFILIATION</dt><dd>" + (P.affiliation || "") + "</dd></div>" +
        "<div><dt>HOMETOWN</dt><dd>" + esc(P.hometown) + "</dd></div>" +
        '<div><dt>EMAIL</dt><dd><a href="mailto:' + esc(P.email) + '">' + esc(P.email) + "</a></dd></div>" +
      "</dl>" +
      '<nav class="side-nav" aria-label="メインメニュー"><ul>' + navHtml + "</ul></nav>";
  }

  // ---------- スマホ用上部バー ----------
  var bar = document.getElementById("mobile-bar");
  if (bar) {
    bar.innerHTML = PAGES.map(function (pg) {
      return '<a href="' + pg.href + '"' + (pg.id === current ? ' aria-current="page"' : "") + ">" + pg.label + "</a>";
    }).join("");
  }

  // ---------- フッター ----------
  var footer = document.getElementById("footer");
  if (footer) footer.textContent = "© " + (P.copyrightYear || new Date().getFullYear()) + " " + (P.nameEn || P.name || "");

  // ---------- ページタイトル ----------
  if (P.name && document.title.indexOf("[氏名]") !== -1) {
    document.title = document.title.replace("[氏名]", P.name);
  }

  // ---------- スクロール連動ハイライト ----------
  var links = Array.prototype.slice.call(document.querySelectorAll(".sub-nav a"));
  if (!links.length) return;

  var ticking = false;
  function update() {
    ticking = false;
    var offset = 140;
    var active = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top - offset <= 0) active = sections[i];
    }
    // ページ最下部に到達したら最後のセクションを選択
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      active = sections[sections.length - 1];
    }
    links.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-target") === active.id);
    });
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
