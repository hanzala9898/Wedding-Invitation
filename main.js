/* =====================================================================
   Zarwa & Usama — wedding invitation behaviour
   ---------------------------------------------------------------------
   SETTINGS you may want to change:
   ===================================================================== */

// Date and time the countdown counts to. Keep the +05:00 (Pakistan time).
const WEDDING_DATE = '2027-01-09T13:00:00+05:00';

// Size of the opening videos (they are 1080 × 1920, vertical 9:16).
const VIDEO_W = 1080;
const VIDEO_H = 1920;


/* =====================================================================
   Below this line: how the page works. You normally don't need to edit it.

   The page moves through five states (a class on <body>):
     s0  start screen: "A letter for you — tap to open"
     s1  video 1 playing (bow loosens, silk slides away)
     s2  paused on the wax seal: "Tap the seal"
     s3  video 2 playing (seal cracks, gatefold opens)
     s4  invitation text appears; the details below can be scrolled
   ===================================================================== */
{
  const $ = id => document.getElementById(id);
  const view = $('view'), stage = $('stage'), v1 = $('v1'), v2 = $('v2'), cover = $('cover'), B = document.body;
  const WEDDING = new Date(WEDDING_DATE);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let state = 0;

  const set = s => {
    state = s;
    B.classList.remove('s0', 's1', 's2', 's3', 's4');
    B.classList.add('s' + s);
  };

  /* ---------- fit the 9:16 video stage to the screen ----------
     Phones: fills the screen (cover). Wide screens: centred (contain). */
  const fit = () => {
    const w = innerWidth, h = innerHeight, cover = w / h < 0.8;
    document.documentElement.style.setProperty('--vh', h + 'px');
    const k = cover ? Math.max(w / VIDEO_W, h / VIDEO_H) : Math.min(w / VIDEO_W, h / VIDEO_H);
    stage.style.width = VIDEO_W * k + 'px';
    stage.style.height = VIDEO_H * k + 'px';
    stage.style.setProperty('--sw', VIDEO_W * k + 'px');
  };
  addEventListener('resize', fit);
  fit();

  /* Play with sound; if the browser refuses, play muted instead. */
  const play = (v, onFail) => {
    v.muted = false;
    const p = v.play();
    if (p && p.catch) p.catch(() => { v.muted = true; v.play().catch(onFail || (() => {})); });
  };

  /* s0 → s1: tap anywhere to start video 1 */
  const start = () => {
    if (state !== 0) return;
    set(1);
    if (v1.readyState < 2) B.classList.add('wait');
    v1.addEventListener('playing', () => { B.classList.remove('wait'); cover.style.opacity = 0; }, { once: true });
    play(v1, () => { B.classList.remove('wait'); cover.style.opacity = 0; pauseOnSeal(); });
    v2.load();
  };

  /* s1 → s2: video 1 ends on the seal and waits */
  const pauseOnSeal = () => {
    if (state !== 1) return;
    set(2);
    try { v1.pause(); } catch (e) {}
    $('sealBtn').focus({ preventScroll: true });
  };
  v1.addEventListener('ended', pauseOnSeal);
  v1.addEventListener('timeupdate', () => { if (v1.duration && v1.currentTime >= v1.duration - 0.06) pauseOnSeal(); });

  /* s2 → s3: tapping the seal plays video 2 */
  const crack = () => {
    if (state !== 2) return;
    set(3);
    v2.currentTime = 0;
    v2.addEventListener('playing', () => {
      v2.style.opacity = 1;
      setTimeout(() => { v1.style.visibility = 'hidden'; }, 120);
    }, { once: true });
    play(v2, reveal);
  };

  /* s3 → s4: invitation text appears, details become scrollable */
  const reveal = () => {
    if (state === 4) return;
    set(4);
    v2.style.opacity = 1;
    requestAnimationFrame(watch);
  };
  v2.addEventListener('timeupdate', () => { if (v2.duration && v2.currentTime >= v2.duration - 0.9) reveal(); });
  v2.addEventListener('ended', reveal);

  /* Taps and keys */
  view.addEventListener('click', () => { if (state === 0) start(); });
  $('sealBtn').addEventListener('click', e => { e.stopPropagation(); crack(); });
  view.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (state === 0) start(); else if (state === 2) crack();
    }
  });

  /* Skip: jump straight to the open card */
  $('skip').addEventListener('click', e => {
    e.stopPropagation();
    [v1, v2].forEach(v => { try { v.pause(); } catch (x) {} });
    cover.style.opacity = 0;
    v1.style.visibility = 'hidden';
    if (v2.readyState >= 1) {
      try { v2.currentTime = Math.max(0, (v2.duration || 5) - 0.05); } catch (x) {}
      reveal();
    } else {
      v2.addEventListener('loadedmetadata', () => { v2.currentTime = v2.duration - 0.05; reveal(); }, { once: true });
      v2.load();
    }
  });

  $('down').addEventListener('click', e => {
    e.stopPropagation();
    $('details').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });
  $('replay').addEventListener('click', () => { scrollTo(0, 0); location.reload(); });

  /* ---------- countdown ---------- */
  const cd = ['cD', 'cH', 'cM', 'cS'].map($);
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    const ms = Math.max(0, WEDDING - new Date());
    [Math.floor(ms / 864e5), Math.floor(ms / 36e5) % 24, Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60]
      .forEach((n, i) => { cd[i].textContent = pad(n); });
  };
  tick();
  setInterval(tick, 1000);

  /* ---------- cards settle into place as you scroll ----------
     Every card is shown after 6 seconds anyway, so nothing can stay hidden. */
  const showAll = () => document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
  const watch = () => {
    if (!('IntersectionObserver' in window) || reduce) { showAll(); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
    setTimeout(showAll, 6000);
  };
  addEventListener('scroll', () => {
    document.querySelectorAll('.rv:not(.in)').forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight * 0.95) el.classList.add('in');
    });
  }, { passive: true });
}
