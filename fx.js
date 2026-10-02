/* =====================================================================
   ECLIPSE BIOTECH // RESONANCE_FX v1.0
   Audio-reactive + pointer-reactive visual driver.

   Publishes CSS custom properties on <html> which fx.css consumes:
     --fx-bass --fx-mid --fx-treb --fx-energy   0..1, smoothed
     --fx-mxp --fx-myp                          pointer position, %
     --fx-px  --fx-py                           parallax offset, -1..1
   Plus <html class="fx-beat"> for one frame on each detected beat.

   Self-contained: touches no existing globals except window.EclipseFX.
   ===================================================================== */
(function () {
  'use strict';

  var LS_KEY = 'eclipse_fx_enabled';
  var BAR_COUNT = 48;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  var state = {
    enabled: localStorage.getItem(LS_KEY) !== '0',
    bass: 0, mid: 0, treb: 0, energy: 0,
    mx: 0.5, my: 0.5,   // pointer, normalised 0..1
    px: 0, py: 0,       // smoothed parallax, -1..1
    bassHistory: [],
    lastBeat: 0,
    hasAudio: false
  };

  var ctx = null, analyser = null, freq = null, audioFailed = false;
  var bars = [];
  var tiltEl = null;

  /* ---------------------------------------------------------------
     DOM scaffolding
     --------------------------------------------------------------- */
  function el(tag, id, cls) {
    var n = document.createElement(tag);
    if (id) n.id = id;
    if (cls) n.className = cls;
    return n;
  }

  function buildLayers() {
    var aurora = el('div', 'fx-aurora', 'fx-layer');
    ['fx-b1', 'fx-b2', 'fx-b3'].forEach(function (c) {
      aurora.appendChild(el('div', null, 'fx-blob ' + c));
    });

    var spot = el('div', 'fx-spot', 'fx-layer');

    var post = el('div', 'fx-post', 'fx-layer');
    ['fx-vignette', 'fx-chroma', 'fx-flash', 'fx-beam'].forEach(function (c) {
      post.appendChild(el('div', null, c));
    });

    var spec = el('div', 'fx-spectrum', 'fx-layer');
    for (var i = 0; i < BAR_COUNT; i++) {
      var b = el('div', null, 'fx-bar');
      spec.appendChild(b);
      bars.push(b);
    }

    document.body.appendChild(aurora);
    document.body.appendChild(spot);
    document.body.appendChild(post);
    document.body.appendChild(spec);
  }

  /* Corner reticles on panels that look like cards. */
  var HUD_SELECTOR = '.glass-card, .welcome-card, .vault-card, .oracle-card, .targets-card, .synergy-card';
  function armHud(node) {
    if (!node || node.dataset.fxHud) return;
    node.dataset.fxHud = '1';
    node.classList.add('fx-hud');
    ['tl', 'tr', 'bl', 'br'].forEach(function (p) {
      node.appendChild(el('div', null, 'fx-bracket ' + p));
    });
  }
  function scanForHud(scope) {
    try {
      (scope || document).querySelectorAll(HUD_SELECTOR).forEach(armHud);
    } catch (e) { /* selector unsupported in this view — ignore */ }
  }

  /* ---------------------------------------------------------------
     Audio graph — lazily attached to #bgMusic on first playback
     --------------------------------------------------------------- */
  function attachAudio() {
    if (ctx || audioFailed) return;
    var media = document.getElementById('bgMusic');
    if (!media) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { audioFailed = true; return; }
    try {
      ctx = new AC();
      var src = ctx.createMediaElementSource(media);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.72;
      src.connect(analyser);
      // Must reconnect to the speakers or the track goes silent.
      analyser.connect(ctx.destination);
      freq = new Uint8Array(analyser.frequencyBinCount);
      state.hasAudio = true;
    } catch (e) {
      // Element already routed through another graph, or CORS-tainted.
      audioFailed = true;
      ctx = null;
      analyser = null;
    }
  }

  function resumeAudio() {
    attachAudio();
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(function () {});
  }

  function bandAverage(from, to) {
    var sum = 0, n = 0;
    for (var i = from; i < to && i < freq.length; i++) { sum += freq[i]; n++; }
    return n ? (sum / n) / 255 : 0;
  }

  /* ---------------------------------------------------------------
     Beat detection — bass spike against a rolling window
     --------------------------------------------------------------- */
  function detectBeat(bass, now) {
    var h = state.bassHistory;
    h.push(bass);
    if (h.length > 43) h.shift();
    if (h.length < 20) return false;
    var avg = 0;
    for (var i = 0; i < h.length; i++) avg += h[i];
    avg /= h.length;
    if (bass > avg * 1.32 && bass > 0.22 && now - state.lastBeat > 190) {
      state.lastBeat = now;
      return true;
    }
    return false;
  }

  /* ---------------------------------------------------------------
     Main loop
     --------------------------------------------------------------- */
  var beatTimer = null;
  var guardTick = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (!state.enabled) return;

    /* Safety: the analyser sits between the <audio> element and the speakers.
       If the context is ever suspended while the track is playing the user
       hears nothing, so keep trying to bring it back. */
    if (++guardTick % 30 === 0 && ctx && ctx.state === 'suspended') {
      var m = document.getElementById('bgMusic');
      if (m && !m.paused) ctx.resume().catch(function () {});
    }

    var bass = 0, mid = 0, treb = 0;

    if (analyser && ctx && ctx.state === 'running') {
      analyser.getByteFrequencyData(freq);
      // 1024 fft @ 44.1k -> ~43Hz per bin
      bass = bandAverage(1, 8);      // ~40-350 Hz
      mid = bandAverage(8, 60);      // ~350-2.6k
      treb = bandAverage(60, 200);   // ~2.6k-8.6k
    } else if (!reduced) {
      // No audio yet: keep a slow idle breath so the UI still lives.
      var t = now / 1000;
      bass = 0.10 + Math.sin(t * 0.9) * 0.06;
      mid = 0.12 + Math.sin(t * 0.55 + 1.4) * 0.05;
      treb = 0.08 + Math.sin(t * 1.7 + 0.3) * 0.04;
    }

    // Asymmetric smoothing: snap up, decay down. Reads as punchier.
    state.bass += (bass - state.bass) * (bass > state.bass ? 0.55 : 0.10);
    state.mid += (mid - state.mid) * (mid > state.mid ? 0.40 : 0.09);
    state.treb += (treb - state.treb) * (treb > state.treb ? 0.40 : 0.09);
    state.energy = (state.bass * 0.5 + state.mid * 0.33 + state.treb * 0.17);

    // Parallax easing toward the pointer
    state.px += ((state.mx - 0.5) * 2 - state.px) * 0.06;
    state.py += ((state.my - 0.5) * 2 - state.py) * 0.06;

    var s = root.style;
    s.setProperty('--fx-bass', state.bass.toFixed(3));
    s.setProperty('--fx-mid', state.mid.toFixed(3));
    s.setProperty('--fx-treb', state.treb.toFixed(3));
    s.setProperty('--fx-energy', state.energy.toFixed(3));
    s.setProperty('--fx-px', state.px.toFixed(3));
    s.setProperty('--fx-py', state.py.toFixed(3));

    if (analyser && detectBeat(bass, now)) {
      root.classList.add('fx-beat');
      clearTimeout(beatTimer);
      beatTimer = setTimeout(function () { root.classList.remove('fx-beat'); }, 60);
    }

    // Spectrum bars — mirrored around the centre so it reads symmetrical
    if (bars.length) {
      var half = Math.ceil(BAR_COUNT / 2);
      for (var i = 0; i < half; i++) {
        var v;
        if (analyser && ctx && ctx.state === 'running') {
          // logarithmic bin spread: more resolution in the low/mid range
          var lo = Math.floor(Math.pow(i / half, 1.9) * 220) + 1;
          var hi = Math.floor(Math.pow((i + 1) / half, 1.9) * 220) + 2;
          v = bandAverage(lo, hi);
          v = Math.pow(v, 0.75); // perceptual lift on quiet bins
        } else {
          v = 0.05 + Math.abs(Math.sin(now / 900 + i * 0.4)) * 0.12;
        }
        v = Math.max(0.02, Math.min(1, v));
        var left = bars[half - 1 - i];
        var right = bars[half + i];
        if (left) left.style.setProperty('--h', v.toFixed(3));
        if (right) right.style.setProperty('--h', v.toFixed(3));
      }
    }
  }

  /* ---------------------------------------------------------------
     Pointer: spotlight, parallax, card tilt
     --------------------------------------------------------------- */
  var TILT_SELECTOR = '.glass-card, .finder-card, .cool-card, .vault-card, .oracle-card, ' +
                      '.stack-card, .welcome-card, .theme-card, .result-card, .sensory-card, ' +
                      '.synergy-card, .targets-card, .compare-card';

  function onPointerMove(e) {
    state.mx = e.clientX / window.innerWidth;
    state.my = e.clientY / window.innerHeight;
    if (!state.enabled) return;

    root.style.setProperty('--fx-mxp', (state.mx * 100).toFixed(2) + '%');
    root.style.setProperty('--fx-myp', (state.my * 100).toFixed(2) + '%');

    if (reduced || window.innerWidth <= 900) return;

    var target = e.target && e.target.closest ? e.target.closest(TILT_SELECTOR) : null;
    if (target !== tiltEl) {
      if (tiltEl) {
        tiltEl.classList.remove('fx-tilt');
        tiltEl.style.removeProperty('--fx-rx');
        tiltEl.style.removeProperty('--fx-ry');
      }
      tiltEl = target;
      if (tiltEl) tiltEl.classList.add('fx-tilt');
    }
    if (!tiltEl) return;

    var r = tiltEl.getBoundingClientRect();
    var lx = (e.clientX - r.left) / r.width;
    var ly = (e.clientY - r.top) / r.height;
    tiltEl.style.setProperty('--fx-ry', ((lx - 0.5) * 9).toFixed(2) + 'deg');
    tiltEl.style.setProperty('--fx-rx', ((0.5 - ly) * 9).toFixed(2) + 'deg');
    tiltEl.style.setProperty('--fx-lx', (lx * 100).toFixed(1) + '%');
    tiltEl.style.setProperty('--fx-ly', (ly * 100).toFixed(1) + '%');
  }

  /* ---------------------------------------------------------------
     Public API + wiring
     --------------------------------------------------------------- */
  function setEnabled(on) {
    state.enabled = !!on;
    localStorage.setItem(LS_KEY, on ? '1' : '0');
    root.classList.toggle('fx-off', !on);
    if (on) resumeAudio();
  }

  window.EclipseFX = {
    setEnabled: setEnabled,
    isEnabled: function () { return state.enabled; },
    toggle: function () { setEnabled(!state.enabled); return state.enabled; },
    rescan: scanForHud,
    state: state
  };

  function init() {
    buildLayers();
    root.classList.toggle('fx-off', !state.enabled);

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // The AudioContext can only start from a user gesture.
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, resumeAudio, { passive: true });
    });
    var media = document.getElementById('bgMusic');
    if (media) media.addEventListener('play', resumeAudio);

    scanForHud();
    // The app swaps article views in wholesale — re-arm brackets on new nodes.
    var mount = document.getElementById('article-mount');
    if (mount && window.MutationObserver) {
      new MutationObserver(function () { scanForHud(mount); })
        .observe(mount, { childList: true, subtree: true });
    }

    // Ctrl+Shift+F toggles the whole layer.
    window.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
        e.preventDefault();
        var on = window.EclipseFX.toggle();
        var box = document.getElementById('fxToggle');
        if (box) box.checked = on;
      }
    });

    // Bind the ATMOSPHERE_CONFIG switch if it is present.
    var box = document.getElementById('fxToggle');
    if (box) {
      box.checked = state.enabled;
      box.addEventListener('change', function () { setEnabled(box.checked); });
    }

    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
