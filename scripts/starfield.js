/* CMD Starfield — canvas 2D
   Proper twinkling stars with diffraction cross-beams.
   Single persistent canvas behind the whole site.
   Exposes window.__starfield with:
     - setSceneTargets({density, speed, twinkleFreq})
     - triggerShootingStar()
     - triggerWarpBurst()
*/

(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isMobile = () => window.innerWidth < 720;
  const baseCount = () => (isMobile() ? 220 : 420);
  const nearCount = () => (isMobile() ? 6 : 14);

  // Pre-rendered star sprites — major perf win vs drawing crosses live every frame
  const SPRITE_SIZES = [16, 32, 64, 96];
  const sprites = [];
  function buildSprite(size, opts) {
    const s = document.createElement('canvas');
    s.width = s.height = size;
    const c = s.getContext('2d');
    const cx = size / 2, cy = size / 2;
    const tint = opts.tint || 'rgba(255,255,255,';
    const violetTint = opts.violet || false;

    // Soft outer halo (radial gradient)
    const halo = c.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
    halo.addColorStop(0, (violetTint ? 'rgba(200,168,255,' : tint) + (opts.haloAlpha || 0.35) + ')');
    halo.addColorStop(0.25, (violetTint ? 'rgba(155,123,255,' : tint) + ((opts.haloAlpha || 0.35) * 0.4) + ')');
    halo.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = halo;
    c.beginPath();
    c.arc(cx, cy, size / 2, 0, Math.PI * 2);
    c.fill();

    // Diffraction cross beams — horizontal + vertical thin lines
    const beamLen = size * 0.48;
    const beamCore = size * 0.04;
    const beamGrad = c.createLinearGradient(cx - beamLen, cy, cx + beamLen, cy);
    beamGrad.addColorStop(0, 'rgba(255,255,255,0)');
    beamGrad.addColorStop(0.5, tint + (opts.beamAlpha || 0.7) + ')');
    beamGrad.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = beamGrad;
    c.fillRect(cx - beamLen, cy - beamCore / 2, beamLen * 2, beamCore);
    // Vertical
    const beamGradV = c.createLinearGradient(cx, cy - beamLen, cx, cy + beamLen);
    beamGradV.addColorStop(0, 'rgba(255,255,255,0)');
    beamGradV.addColorStop(0.5, tint + (opts.beamAlpha || 0.7) + ')');
    beamGradV.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = beamGradV;
    c.fillRect(cx - beamCore / 2, cy - beamLen, beamCore, beamLen * 2);

    // Bright core
    const coreR = Math.max(1, size * 0.06);
    const core = c.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2);
    core.addColorStop(0, 'rgba(255,255,255,1)');
    core.addColorStop(0.5, 'rgba(255,255,255,0.8)');
    core.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = core;
    c.beginPath();
    c.arc(cx, cy, coreR * 2, 0, Math.PI * 2);
    c.fill();

    return s;
  }
  function buildSprites() {
    sprites.length = 0;
    SPRITE_SIZES.forEach(size => {
      sprites.push({
        size,
        white: buildSprite(size, { haloAlpha: 0.35, beamAlpha: 0.65 }),
        violet: buildSprite(size, { haloAlpha: 0.50, beamAlpha: 0.75, violet: true })
      });
    });
  }
  buildSprites();

  // State (interpolated toward targets each frame)
  const state = {
    density: 1.0,
    speed: 1.0,
    twinkleFreq: 1.0,
    warpBurst: 0.0
  };
  const targets = { density: 1.0, speed: 1.0, twinkleFreq: 1.0 };

  window.__starfield = {
    setSceneTargets(t) {
      if (typeof t.density === 'number') targets.density = t.density;
      if (typeof t.speed === 'number') targets.speed = t.speed;
      if (typeof t.twinkleFreq === 'number') targets.twinkleFreq = t.twinkleFreq;
      // streakFactor ignored — we don't streak any more, it looked ugly
    },
    triggerShootingStar() { spawnShootingStar(); },
    triggerWarpBurst() { state.warpBurst = 1.0; }
  };

  // Mouse
  const mouse = { x: -9999, y: -9999, active: false };
  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener('pointerleave', () => { mouse.active = false; });

  // Resize handling
  let DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth = window.innerWidth;
    H = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', () => {
    resize();
    seedStars();
  });

  // Stars
  let stars = [];
  let nearStars = [];
  function rand(a, b) { return a + Math.random() * (b - a); }

  function makeStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      z: rand(0.3, 1.0),
      // size in screen px (small twinklers)
      size: rand(6, 14),
      baseBrightness: rand(0.3, 0.95),
      twinklePhase: Math.random() * Math.PI * 2,
      twinklePeriod: rand(1.6, 4.0),    // shorter periods → more twinkle
      // amplitude — how much the star brightens/dims (high = dramatic shimmer)
      twinkleAmp: rand(0.55, 0.95),
      lifespan: rand(10, 22),
      spawnTime: performance.now() / 1000 - Math.random() * 10,
      // 1 in ~25 stars carries a violet tint
      violet: Math.random() < 0.04
    };
  }

  function makeNearStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      size: rand(24, 48),
      baseBrightness: rand(0.7, 1.0),
      twinklePhase: Math.random() * Math.PI * 2,
      twinklePeriod: rand(2.5, 5),
      twinkleAmp: rand(0.45, 0.7),
      violet: Math.random() < 0.18  // near-stars more likely violet for galaxy vibe
    };
  }

  function seedStars() {
    stars = [];
    const n = baseCount();
    for (let i = 0; i < n; i++) stars.push(makeStar());
    nearStars = [];
    const nn = nearCount();
    for (let i = 0; i < nn; i++) nearStars.push(makeNearStar());
  }
  seedStars();

  // Shooting stars
  const shootingStars = [];
  function spawnShootingStar() {
    const fromLeft = Math.random() > 0.5;
    const startX = fromLeft ? rand(0, W * 0.4) : rand(W * 0.6, W);
    const startY = rand(0, H * 0.4);
    const angle = fromLeft ? rand(0.15, 0.35) * Math.PI : Math.PI - rand(0.15, 0.35) * Math.PI;
    const speed = rand(900, 1300);
    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: rand(1.2, 1.8),
      length: rand(140, 240)
    });
  }
  let nextShoot = performance.now() / 1000 + rand(30, 60);

  // Scroll drift
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  window.addEventListener('scroll', () => {
    scrollVelocity = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
  });

  function pickSprite(size) {
    // pick smallest sprite that's at least 'size' big, render down
    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i].size >= size) return sprites[i];
    }
    return sprites[sprites.length - 1];
  }

  // Animation loop
  let lastT = performance.now() / 1000;
  function frame() {
    const now = performance.now() / 1000;
    const dt = Math.min(0.05, now - lastT);
    lastT = now;

    const k = prefersReduced ? 1 : 0.06;
    state.density += (targets.density - state.density) * k;
    state.speed += (targets.speed - state.speed) * k;
    state.twinkleFreq += (targets.twinkleFreq - state.twinkleFreq) * k;
    state.warpBurst *= 0.92;

    if (!prefersReduced && now > nextShoot) {
      spawnShootingStar();
      nextShoot = now + rand(isMobile() ? 45 : 30, isMobile() ? 90 : 60);
    }

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';  // additive — bloomy

    const visibleN = Math.floor(stars.length * Math.min(1.5, Math.max(0.3, state.density)));
    const speedMult = state.speed * (1 + state.warpBurst * 4);

    let mouseDX = 0, mouseDY = 0;
    if (mouse.active && !isMobile()) {
      mouseDX = (mouse.x - W / 2) / W;
      mouseDY = (mouse.y - H / 2) / H;
    }

    const driftPx = (8 * state.speed + Math.abs(scrollVelocity) * 0.08) * (1 + state.warpBurst * 8);

    for (let i = 0; i < visibleN && i < stars.length; i++) {
      const s = stars[i];

      const age = now - s.spawnTime;
      if (age > s.lifespan) {
        s.x = Math.random() * W;
        s.y = Math.random() * H;
        s.z = rand(0.3, 1.0);
        s.size = rand(6, 14);
        s.baseBrightness = rand(0.3, 0.95);
        s.twinklePhase = Math.random() * Math.PI * 2;
        s.twinklePeriod = rand(1.6, 4.0);
        s.twinkleAmp = rand(0.55, 0.95);
        s.lifespan = rand(10, 22);
        s.spawnTime = now;
        s.violet = Math.random() < 0.04;
      }

      s.y += driftPx * dt * s.z;
      if (s.y > H + 20) s.y = -10;

      const px = s.x + mouseDX * 30 * s.z;
      const py = s.y + mouseDY * 30 * s.z;

      // Twinkle: brightness pulses with high amplitude — REAL shimmer
      const phase = (now + s.twinklePhase) * (Math.PI * 2 / s.twinklePeriod) * state.twinkleFreq;
      const twinkle = 1 - s.twinkleAmp + s.twinkleAmp * (0.5 + 0.5 * Math.sin(phase));
      let alpha = s.baseBrightness * twinkle;

      // life fade in/out
      const fadeIn = Math.min(1, age / 1.5);
      const fadeOut = Math.min(1, (s.lifespan - age) / 2.5);
      alpha *= Math.max(0, Math.min(fadeIn, fadeOut));

      if (mouse.active && !isMobile()) {
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 200 * 200) {
          alpha = Math.min(1, alpha + (1 - Math.sqrt(d2) / 200) * 0.25);
        }
      }

      if (alpha <= 0.02) continue;

      // Render via sprite — apply twinkle-driven size pulse too
      const drawSize = s.size * (0.7 + 0.6 * twinkle);
      const sprite = pickSprite(drawSize);
      const tex = s.violet ? sprite.violet : sprite.white;
      ctx.globalAlpha = alpha;
      ctx.drawImage(tex, px - drawSize / 2, py - drawSize / 2, drawSize, drawSize);
    }

    // Near stars (bigger, dramatic shimmer)
    for (let i = 0; i < nearStars.length; i++) {
      const s = nearStars[i];
      const phase = (now + s.twinklePhase) * (Math.PI * 2 / s.twinklePeriod) * state.twinkleFreq;
      const twinkle = 1 - s.twinkleAmp + s.twinkleAmp * (0.5 + 0.5 * Math.sin(phase));
      const alpha = s.baseBrightness * twinkle;
      if (alpha <= 0.02) continue;
      const px = s.x + mouseDX * 60;
      const py = s.y + mouseDY * 60;
      const drawSize = s.size * (0.7 + 0.6 * twinkle);
      const sprite = pickSprite(drawSize);
      const tex = s.violet ? sprite.violet : sprite.white;
      ctx.globalAlpha = alpha;
      ctx.drawImage(tex, px - drawSize / 2, py - drawSize / 2, drawSize, drawSize);
    }

    // Shooting stars — slim white streak with tail
    ctx.globalCompositeOperation = 'lighter';
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      ss.life += dt;
      ss.x += ss.vx * dt;
      ss.y += ss.vy * dt;

      const lifeFrac = ss.life / ss.maxLife;
      const alpha = lifeFrac < 0.1 ? lifeFrac / 0.1 : Math.max(0, 1 - (lifeFrac - 0.1) / 0.9);

      const tailLen = ss.length;
      const dirX = ss.vx;
      const dirY = ss.vy;
      const mag = Math.sqrt(dirX * dirX + dirY * dirY);
      const tx = ss.x - (dirX / mag) * tailLen;
      const ty = ss.y - (dirY / mag) * tailLen;

      const grad = ctx.createLinearGradient(ss.x, ss.y, tx, ty);
      grad.addColorStop(0, 'rgba(255,255,255,' + alpha + ')');
      grad.addColorStop(0.4, 'rgba(200,168,255,' + (alpha * 0.4) + ')');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 1.6, 0, Math.PI * 2);
      ctx.fill();

      if (ss.life > ss.maxLife) shootingStars.splice(i, 1);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';

    scrollVelocity *= 0.85;

    if (!prefersReduced) requestAnimationFrame(frame);
  }

  if (prefersReduced) {
    frame();
  } else {
    requestAnimationFrame(frame);
  }
})();
