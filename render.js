/* ==========================================================================
   RENDER SCRIPT
   Builds the page from content/site.js. You shouldn't need to edit this.
   ========================================================================== */

(function () {
  "use strict";

  var S = window.SITE;
  if (!S) {
    document.body.insertAdjacentHTML("afterbegin",
      '<p style="padding:2rem;font-family:sans-serif">Could not load content/site.js. Check that file for a missing comma or quote mark.</p>');
    return;
  }

  /* ---------- helpers ---------- */
  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function has(v) { return v != null && String(v).trim() !== ""; }
  function $(id) { return document.getElementById(id); }
  function ext(url) { return /^https?:\/\//i.test(url) ? ' target="_blank" rel="noopener"' : ""; }

  var projects = (S.projects || [])
    .filter(function (p) { return p.visible !== false; })
    .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

  function hasCase(p) { return p.caseStudy && p.caseStudy.enabled; }
  function hasLink(p) { return p.presentationLink && has(p.presentationLink.url); }
  function linkLabel(p) { return has(p.presentationLink.label) ? p.presentationLink.label : S.work.presentationLabel; }

  function socialLinks() {
    var L = S.links || {}, out = [];
    if (has(L.linkedin)) out.push({ label: "LinkedIn", url: L.linkedin });
    if (has(L.instagram)) out.push({ label: "Instagram", url: L.instagram });
    (L.other || []).forEach(function (o) { if (o && has(o.url)) out.push(o); });
    return out;
  }

  function cvButton(extraClass) {
    if (!S.cv || !has(S.cv.file)) return "";
    var name = S.cv.file.split("/").pop();
    return '<a class="btn ' + (extraClass || "") + '" href="' + esc(S.cv.file) + '" download="' + esc(name) + '">' + esc(S.cv.label) + '</a>';
  }

  function cover(p) {
    var img = p.coverImage || {};
    if (has(img.src)) {
      return '<div class="cover"><img src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" loading="lazy"></div>';
    }
    var style = ["blush", "olive", "espresso", "cream"].indexOf(p.coverStyle) > -1 ? p.coverStyle : "blush";
    return '<div class="cover cover--type cover--' + style + '" role="img" aria-label="' + esc(p.title) + '">' +
      '<div class="cover__meta label"><span>' + esc(p.client) + '</span><span>' + esc(p.year) + '</span></div>' +
      '<div class="cover__word">' + esc(has(p.coverText) ? p.coverText : p.title) + '</div>' +
    '</div>';
  }

  /* ---------- meta ---------- */
  document.title = S.meta.title;
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", S.meta.description);

  /* ---------- nav ---------- */
  $("nav").innerHTML =
    '<div class="wrap nav__inner">' +
      '<a class="nav__brand" href="#top">' + esc(S.nav.brand) + '</a>' +
      '<div class="nav__right">' +
        '<ul class="nav__links">' + S.nav.items.map(function (i) {
          return '<li><a href="#' + esc(i.target) + '">' + esc(i.label) + '</a></li>';
        }).join("") + '</ul>' +
        cvButton() +
      '</div>' +
    '</div>';

  /* ---------- hero ---------- */
  var H = S.hero;
  var heroImg = H.image && has(H.image.src)
    ? '<figure class="hero__image reveal"><img src="' + esc(H.image.src) + '" alt="' + esc(H.image.alt) + '">' +
      (has(H.image.caption) ? '<figcaption>' + esc(H.image.caption) + '</figcaption>' : '') + '</figure>'
    : "";
  $("hero").innerHTML =
    '<div class="wrap">' +
      (has(H.eyebrow) ? '<p class="label hero__eyebrow">' + esc(H.eyebrow) + '</p>' : '') +
      '<h1 class="hero__statement">' + H.lines.map(function (l) {
        var s = ["display", "accent", "olive"].indexOf(l.style) > -1 ? l.style : "display";
        return '<span class="hero__line hero__line--' + s + '">' + esc(l.text) + '</span>';
      }).join("") + '</h1>' +
      '<div class="hero__below">' +
        '<div class="hero__areas reveal">' +
          '<span class="label">' + esc(H.areasLabel) + '</span>' +
          '<ul>' + H.areas.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join("") + '</ul>' +
        '</div>' +
        '<div class="hero__intro">' +
          '<p>' + esc(H.intro) + '</p>' +
          (has(H.primaryButton) ? '<a class="arrow-link" href="#work">' + esc(H.primaryButton) + ' <span aria-hidden="true">→</span></a>' : '') +
        '</div>' +
        heroImg +
      '</div>' +
    '</div>';

  /* ---------- work ---------- */
  var W = S.work;
  var featured = projects.filter(function (p) { return p.featured; });
  var archive = projects.filter(function (p) { return !p.featured; });
  var variants = ["a", "b", "c"];

  function projectActions(p) {
    var a = "";
    if (hasCase(p)) a += '<a class="arrow-link" href="#case-' + esc(p.id) + '">' + esc(W.caseStudyLabel) + ' <span aria-hidden="true">→</span></a>';
    if (hasLink(p)) a += '<a class="arrow-link" href="' + esc(p.presentationLink.url) + '"' + ext(p.presentationLink.url) + '>' + esc(linkLabel(p)) + ' <span aria-hidden="true">↗</span></a>';
    return a ? '<div class="feat__actions">' + a + '</div>' : "";
  }
  function mainHref(p) {
    if (hasCase(p)) return { href: "#case-" + p.id, attr: "" };
    if (hasLink(p)) return { href: p.presentationLink.url, attr: ext(p.presentationLink.url) };
    return null;
  }

  var featHTML = featured.map(function (p, i) {
    var link = mainHref(p);
    var media = link
      ? '<a class="feat__media" href="' + esc(link.href) + '"' + link.attr + ' tabindex="-1" aria-hidden="true">' + cover(p) + '</a>'
      : '<div class="feat__media">' + cover(p) + '</div>';
    return '<article class="feat feat--' + variants[i % 3] + ' reveal">' +
      media +
      '<div class="feat__body">' +
        (has(p.status) ? '<span class="label feat__status">' + esc(p.status) + '</span>' : '') +
        '<h3 class="display feat__title">' + esc(p.title) + '</h3>' +
        '<p class="feat__meta">' + esc([p.client, p.type].filter(has).join(" · ")) + '</p>' +
        (has(p.summary) ? '<p class="feat__summary">' + esc(p.summary) + '</p>' : '') +
        ((p.categories || []).length ? '<p class="feat__cats">' + esc(p.categories.join(" / ")) + '</p>' : '') +
        projectActions(p) +
      '</div>' +
    '</article>';
  }).join("");

  var archiveCats = (S.categories || []).filter(function (c) {
    return archive.some(function (p) { return (p.categories || []).indexOf(c) > -1; });
  });

  $("work").innerHTML =
    '<div class="wrap">' +
      '<div class="section-head">' +
        '<h2 class="display">' + esc(W.heading) + '</h2>' +
        (has(W.intro) ? '<p>' + esc(W.intro) + '</p>' : '') +
      '</div>' +
      '<div class="featured">' + featHTML + '</div>' +
      (archive.length ?
        '<div class="archive" id="archive">' +
          '<div class="archive__head">' +
            '<h3 class="display">' + esc(W.archiveHeading) + '</h3>' +
            (has(W.archiveIntro) ? '<p>' + esc(W.archiveIntro) + '</p>' : '') +
          '</div>' +
          (archiveCats.length > 1 ?
            '<div class="filters" role="group" aria-label="Filter archive by category">' +
              ['<button type="button" aria-pressed="true" data-cat="">' + esc(W.filterAllLabel) + '</button>']
                .concat(archiveCats.map(function (c) { return '<button type="button" aria-pressed="false" data-cat="' + esc(c) + '">' + esc(c) + '</button>'; }))
                .join("") +
            '</div>' : '') +
          '<div class="archive__list" id="archive-list"></div>' +
        '</div>' : '') +
    '</div>';

  function renderArchive(cat) {
    var list = $("archive-list");
    if (!list) return;
    var items = archive.filter(function (p) { return !cat || (p.categories || []).indexOf(cat) > -1; });
    if (!items.length) { list.innerHTML = '<p class="archive__empty">' + esc(W.emptyArchive) + '</p>'; return; }
    list.innerHTML = items.map(function (p) {
      var link = mainHref(p);
      var tag = link ? 'a href="' + esc(link.href) + '"' + link.attr : 'div';
      var close = link ? 'a' : 'div';
      return '<' + tag + ' class="arow">' +
        '<span class="arow__title">' + esc(p.title) + '</span>' +
        '<span class="arow__client">' + esc(p.client) + '<span>' + esc(p.type) + '</span></span>' +
        '<span class="arow__cats">' + esc((p.categories || []).join(" / ")) + '</span>' +
        '<span class="arow__status">' + esc(p.status) + (link ? ' <span aria-hidden="true">→</span>' : '') + '</span>' +
      '</' + close + '>';
    }).join("");
  }
  renderArchive("");
  var filterWrap = document.querySelector(".filters");
  if (filterWrap) filterWrap.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    filterWrap.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    renderArchive(b.getAttribute("data-cat"));
  });

  /* ---------- about ---------- */
  var A = S.about;
  $("about").innerHTML =
    '<div class="wrap about__grid">' +
      '<h2 class="label about__label">' + esc(A.heading) + '</h2>' +
      '<p class="display about__statement reveal">' + esc(A.statement) + '</p>' +
      '<div class="about__text reveal">' +
        A.paragraphs.filter(has).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join("") +
        (has(A.interests) ? '<div class="about__interests"><span class="label">' + esc(A.interestsHeading) + '</span><p>' + esc(A.interests) + '</p></div>' : '') +
      '</div>' +
    '</div>';

  /* ---------- experience & learning ---------- */
  var E = S.experience;
  $("experience").innerHTML =
    '<div class="wrap">' +
      '<div class="section-head"><h2 class="display">' + esc(E.heading) + '</h2></div>' +
      '<div class="exp__grid">' +
        '<div class="exp__col exp__col--work reveal">' +
          '<h3 class="label">' + esc(E.experienceHeading) + '</h3>' +
          '<ul>' + E.items.map(function (x) {
            return '<li class="exp__item">' +
              '<span class="exp__org">' + esc(x.org) + '</span>' +
              '<span class="exp__role">' + esc(x.role) + '</span>' +
              (has(x.note) ? '<span class="exp__note">' + esc(x.note) + '</span>' : '') +
            '</li>';
          }).join("") + '</ul>' +
        '</div>' +
        '<div class="exp__col exp__col--learn reveal">' +
          '<h3 class="label">' + esc(E.learningHeading) + '</h3>' +
          '<ul>' + E.learning.map(function (x) {
            var done = /complete/i.test(x.status || "");
            return '<li class="exp__item learn__item">' +
              '<span><span class="exp__role">' + esc(x.name) + '</span><br><span class="exp__note">' + esc(x.provider) + '</span></span>' +
              (has(x.status) ? '<span class="learn__status' + (done ? '' : ' learn__status--progress') + '">' + esc(x.status) + '</span>' : '') +
            '</li>';
          }).join("") + '</ul>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ---------- contact ---------- */
  var C = S.contact, email = (S.links || {}).email, socials = socialLinks();
  $("contact").innerHTML =
    '<div class="wrap">' +
      '<h2 class="display reveal">' + esc(C.heading) + '</h2>' +
      '<div class="contact__grid">' +
        '<p class="contact__intro">' + esc(C.intro) + '</p>' +
        '<div class="contact__details">' +
          (has(email) ?
            '<div class="contact__email"><span class="label">' + esc(C.emailLabel) + '</span>' +
              '<div class="contact__email-row">' +
                '<a class="contact__address" href="mailto:' + esc(email) + '">' + esc(email) + '</a>' +
                '<button type="button" class="contact__copy" id="copy-email">' + esc(C.copyLabel) + '</button>' +
              '</div></div>' : '') +
          (socials.length ?
            '<div class="contact__social"><span class="label">' + esc(C.socialHeading) + '</span><ul>' +
              socials.map(function (s) { return '<li><a class="arrow-link" href="' + esc(s.url) + '"' + ext(s.url) + '>' + esc(s.label) + ' <span aria-hidden="true">↗</span></a></li>'; }).join("") +
            '</ul></div>' : '') +
          cvButton("contact__cv") +
        '</div>' +
      '</div>' +
    '</div>';

  var copyBtn = $("copy-email");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    function done() { copyBtn.textContent = C.copiedLabel; setTimeout(function () { copyBtn.textContent = C.copyLabel; }, 2000); }
    function fallback() {
      var r = document.createRange(); r.selectNodeContents(document.querySelector(".contact__address"));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    }
    try {
      navigator.clipboard.writeText(email).then(done, fallback);
    } catch (e) { fallback(); }
  });

  /* ---------- footer ---------- */
  var F = S.footer;
  $("footer").innerHTML =
    '<div class="wrap footer__inner">' +
      '<div class="footer__left"><strong>' + esc(F.text) + '</strong>' + (has(F.fine) ? '<span>' + esc(F.fine) + '</span>' : '') + '</div>' +
      '<ul>' +
        (has(email) ? '<li><a href="mailto:' + esc(email) + '">' + esc(C.emailLabel) + '</a></li>' : '') +
        socials.map(function (s) { return '<li><a href="' + esc(s.url) + '"' + ext(s.url) + '>' + esc(s.label) + '</a></li>'; }).join("") +
      '</ul>' +
    '</div>';

  /* ---------- case study view (uses #case-<project-id>) ---------- */
  var homeSections = ["hero", "work", "about", "experience", "contact"].map($);
  var caseEl = $("case");

  function renderCase(p) {
    var rows = [
      ["Brief", p.brief], ["My contribution", p.contribution], ["Strategy", p.strategy],
      ["Creative solution", p.creativeSolution], ["Outcome", p.outcome], ["Learning", p.learning]
    ].filter(function (r) { return has(r[1]); });
    (p.caseStudy.sections || []).forEach(function (s) { if (has(s.body)) rows.push([s.heading, s.body]); });

    var img = p.coverImage || {};
    var gallery = (p.galleryImages || []).filter(function (g) { return g && has(g.src); });

    caseEl.innerHTML =
      '<div class="wrap">' +
        '<a class="arrow-link case__back" href="#work"><span aria-hidden="true">←</span> ' + esc(W.backLabel) + '</a>' +
        (has(p.status) ? '<span class="label case__status">' + esc(p.status) + '</span>' : '') +
        '<h1 class="display case__title">' + esc(p.title) + '</h1>' +
        '<div class="case__meta">' +
          [["Client", p.client], ["Type", p.type], ["Year", p.year], ["Focus", (p.categories || []).join(", ")]]
            .filter(function (m) { return has(m[1]); })
            .map(function (m) { return '<div><span class="label">' + m[0] + '</span><span>' + esc(m[1]) + '</span></div>'; }).join("") +
        '</div>' +
        '<figure class="case__cover">' + cover(p) + (has(img.caption) ? '<figcaption>' + esc(img.caption) + '</figcaption>' : '') + '</figure>' +
        (has(p.summary) ? '<p class="case__summary">' + esc(p.summary) + '</p>' : '') +
        '<div class="case__sections">' + rows.map(function (r) {
          return '<section class="case__section reveal"><h2>' + esc(r[0]) + '</h2><p>' + esc(r[1]) + '</p></section>';
        }).join("") + '</div>' +
        (gallery.length ?
          '<div class="case__gallery"><h2 class="label">' + esc(W.galleryHeading) + '</h2><div class="case__gallery-grid">' +
            gallery.map(function (g) {
              return '<figure class="reveal"><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy">' +
                (has(g.caption) ? '<figcaption>' + esc(g.caption) + '</figcaption>' : '') + '</figure>';
            }).join("") +
          '</div></div>' : '') +
        '<div class="case__actions">' +
          (hasLink(p) ? '<a class="btn" href="' + esc(p.presentationLink.url) + '"' + ext(p.presentationLink.url) + '>' + esc(linkLabel(p)) + ' ↗</a>' : '') +
          '<a class="btn btn--ghost" href="#work">' + esc(W.backLabel) + '</a>' +
        '</div>' +
      '</div>';
  }

  function route() {
    var m = location.hash.match(/^#case-(.+)$/);
    var p = m && projects.filter(function (x) { return x.id === m[1] && hasCase(x); })[0];
    if (p) {
      renderCase(p);
      homeSections.forEach(function (s) { s.hidden = true; });
      caseEl.hidden = false;
      window.scrollTo(0, 0);
      document.title = p.title + " | " + S.nav.brand;
    } else {
      var wasCase = !caseEl.hidden;
      caseEl.hidden = true;
      homeSections.forEach(function (s) { s.hidden = false; });
      document.title = S.meta.title;
      if (wasCase && location.hash) {
        var t = document.getElementById(location.hash.slice(1));
        if (t) t.scrollIntoView();
      }
    }
    setupReveal();
  }
  window.addEventListener("hashchange", route);

  /* ---------- gentle reveal ---------- */
  var io = null;
  function setupReveal() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove("is-pending"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    var vh = window.innerHeight;
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (el.offsetParent === null) return;
      if (el.getBoundingClientRect().top > vh) { el.classList.add("is-pending"); io.observe(el); }
    });
  }

  route();
})();
