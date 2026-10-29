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

  /* ---------- reveal on scroll (classes added here so no-JS shows everything) ---------- */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var els = $$('.head, .feat li, .city, .split-img, .split-t, .rev, .own-in, .tx-line');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el, i) {
      el.classList.add('rv');
      if (el.matches('.feat li, .city, .rev')) el.style.transitionDelay = (Array.prototype.indexOf.call(el.parentNode.children, el) % 5) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- tracking hooks (no-op until GTM is added) ---------- */
  window.dataLayer = window.dataLayer || [];
  $$('[data-call-location]').forEach(function (a) {
    a.addEventListener('click', function () { window.dataLayer.push({ event: 'click_to_call', call_location: a.getAttribute('data-call-location') }); });
  });
})();
