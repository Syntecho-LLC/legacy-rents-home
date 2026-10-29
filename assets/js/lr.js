/* Legacy Rents homepage (design preview) — interactions. No dependencies. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var desk = window.matchMedia('(min-width:1080px)');

  /* ---------- nav: darker once scrolled ---------- */
  var nav = $('.nav');
  var tuck = function () { nav.classList.toggle('tuck', (window.scrollY || window.pageYOffset) > 30); };
  window.addEventListener('scroll', tuck, { passive: true }); tuck();

  /* ---------- desktop dropdowns: hover on pointer devices, click/keyboard everywhere ---------- */
  var dds = $$('.dd');
  var closeAll = function (except) {
    dds.forEach(function (d) {
      if (d === except) return;
      d.classList.remove('open'); d.querySelector('.dd-btn').setAttribute('aria-expanded', 'false');
    });
  };
  dds.forEach(function (d) {
    var btn = d.querySelector('.dd-btn'), t;
    var set = function (on) { closeAll(on ? d : null); d.classList.toggle('open', on); btn.setAttribute('aria-expanded', on ? 'true' : 'false'); };
    btn.addEventListener('click', function () { set(!d.classList.contains('open')); });
    d.addEventListener('mouseenter', function () { if (desk.matches) { clearTimeout(t); set(true); } });
    d.addEventListener('mouseleave', function () { if (desk.matches) t = setTimeout(function () { set(false); }, 120); });
    d.addEventListener('focusout', function (e) { if (!d.contains(e.relatedTarget)) set(false); });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.dd')) closeAll(); });

  /* ---------- mobile menu sheet ---------- */
  var burger = $('.burger'), sheet = $('#sheet');
  var setMenu = function (on) {
    sheet.hidden = !on;
    burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    burger.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('menu-open', on);
  };
  burger.addEventListener('click', function () { setMenu(sheet.hidden); });
  $$('a', sheet).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAll();
    if (!sheet.hidden) { setMenu(false); burger.focus(); }
  });
  desk.addEventListener && desk.addEventListener('change', function () { if (desk.matches) setMenu(false); });

  /* ---------- reviews: prev / next ---------- */
  var revs = $('#revs');
  $$('[data-rev]').forEach(function (b) {
    b.addEventListener('click', function () {
      var card = revs.querySelector('.rev');
      var step = card ? card.getBoundingClientRect().width + 14 : revs.clientWidth;
      revs.scrollLeft += step * parseInt(b.getAttribute('data-rev'), 10);
    });
  });

  /* ---------- mobile sticky bar once the hero has scrolled away ---------- */
  var hero = $('.hero'), mbar = $('#mbar'), foot = $('.foot');
  var sync = function () {
    var past = hero.getBoundingClientRect().bottom < 40;
    var atFoot = foot.getBoundingClientRect().top < window.innerHeight - 40;
    mbar.classList.toggle('show', past && !atFoot);
  };
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
  sync();

  /* ---------- scroll assembly (classes added here so no-JS shows everything) ---------- */
  var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && motionOk) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add(e.target.classList.contains('h2') ? 'split-in' : 'in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    var watch = function (sel, cls, stagger) {
      $$(sel).forEach(function (el) {
        el.classList.add('rv');
        if (cls) el.classList.add(cls);
        if (stagger) el.style.transitionDelay = (Array.prototype.indexOf.call(el.parentNode.children, el) % 6) * stagger + 'ms';
        io.observe(el);
      });
    };

    /* section headings fly in word by word; the teal accent keeps its gradient per word */
    var n = 0;
    var splitWords = function (node, accent) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span');
            w.className = accent ? 'w t' : 'w';
            w.style.setProperty('--i', n++);
            w.textContent = part;
            frag.appendChild(w);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') {
          var isAccent = c.classList.contains('t');
          splitWords(c, accent || isAccent);
          if (isAccent) { while (c.firstChild) node.insertBefore(c.firstChild, c); node.removeChild(c); }
        }
      });
    };
    $$('.h2').forEach(function (h) { n = 0; splitWords(h, false); io.observe(h); });

    watch('.kick:not(.hero .kick)', null, 0);
    watch('.lead, .own-p, .note, .tx-line, .steps li, .actions', null, 0);
    watch('.feat li', 'rv-z', 110);
    watch('.city', null, 130);
    watch('.rev', 'rv-r', 110);
    watch('.pgrid li', 'rv-z', 90);
    watch('.tours .split-img', 'rv-img', 0);
    watch('.portal .split-img', 'rv-img', 0);
    watch('.split-t > .btn, .own-in > .btn, .head.row > .tlink, .rev-nav', 'rv-z', 0);
    watch('.foot-in > *', null, 110);
    watch('.own', 'rv-keep', 0);
  }

  /* ---------- cards: glow follows the cursor ---------- */
  if (window.matchMedia('(hover: hover)').matches) {
    $$('.city, .rev, .pgrid a').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- tracking hooks (no-op until GTM is added) ---------- */
  window.dataLayer = window.dataLayer || [];
  $$('[data-call-location]').forEach(function (a) {
    a.addEventListener('click', function () { window.dataLayer.push({ event: 'click_to_call', call_location: a.getAttribute('data-call-location') }); });
  });
})();
