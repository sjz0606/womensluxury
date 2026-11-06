// 3D sahna: oltin-bordo medalyon (brend belgisi) devorga o'rnashadi, so'ng kamera
// butikdagi kabi arkali tokchalar bo'ylab yuradi; har tokchada haqiqiy reels obrazi.
import * as THREE from '../vendor/three.module.min.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

const AW = 1.46, AH = 2.62, BASE = 0.42, GAP = 3.1, DEPTH = 0.62;
const HERO_END = 0.085, WALK0 = 0.12;

function archShape(w, h, x = 0, y = 0) {
  const s = new THREE.Shape(), r = w / 2;
  s.moveTo(x - r, y);
  s.lineTo(x + r, y);
  s.lineTo(x + r, y + h - r);
  s.absarc(x, y + h - r, r, 0, Math.PI, false);
  s.lineTo(x - r, y);
  return s;
}
function archPath(w, h, x = 0, y = 0) {
  const p = new THREE.Path(), r = w / 2;
  p.moveTo(x - r, y);
  p.lineTo(x - r, y + h - r);
  p.absarc(x, y + h - r, r, Math.PI, 0, true);
  p.lineTo(x + r, y);
  p.lineTo(x - r, y);
  return p;
}
function normUV(g, w, h) {
  const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / w + 0.5, p.getY(i) / h);
  uv.needsUpdate = true;
}

/* Gips devor teksturasi (canvas) */
function plaster(base, size = 512) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const x = c.getContext('2d');
  x.fillStyle = base; x.fillRect(0, 0, size, size);
  for (let i = 0; i < 9000; i++) {
    const r = Math.random() * 7 + 1;
    x.fillStyle = `rgba(${Math.random() < .5 ? '255,220,200' : '0,0,0'},${Math.random() * 0.035})`;
    x.beginPath(); x.arc(Math.random() * size, Math.random() * size, r, 0, 7); x.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* Medalyon yuzasi: bordo emal, bo'rtma oltin WL va yozuv */
async function medalFace() {
  const img = new Image(); img.src = 'assets/logo-mask.png'; await img.decode();
  const S = 1024;
  const mk = (fn) => { const c = document.createElement('canvas'); c.width = c.height = S; fn(c.getContext('2d')); return c; };
  // logotip niqobi (oq = harf)
  const lw = S * 0.6, lh = lw * img.naturalHeight / img.naturalWidth;
  const mask = mk(x => { x.fillStyle = '#000'; x.fillRect(0, 0, S, S); x.drawImage(img, (S - lw) / 2, (S - lh) / 2 + 6, lw, lh);
    x.strokeStyle = '#fff'; x.lineWidth = 8; x.beginPath(); x.arc(S / 2, S / 2, S * .44, 0, 7); x.stroke();
    x.lineWidth = 3; x.beginPath(); x.arc(S / 2, S / 2, S * .415, 0, 7); x.stroke(); });
  const goldLayer = (x) => {
    const g = x.createLinearGradient(S * .2, S * .2, S * .85, S * .85);
    g.addColorStop(0, '#f8e6bb'); g.addColorStop(.42, '#d3a961'); g.addColorStop(.7, '#9a7134'); g.addColorStop(1, '#ecd29a');
    return g;
  };
  const tint = (bg, fg) => mk(x => {
    x.fillStyle = bg; x.fillRect(0, 0, S, S);
    // niqobni alfa sifatida ishlatish
    const a = mk(y => { y.drawImage(mask, 0, 0); const d = y.getImageData(0, 0, S, S); for (let i = 0; i < d.data.length; i += 4) d.data[i + 3] = d.data[i]; y.putImageData(d, 0, 0); y.globalCompositeOperation = 'source-in'; y.fillStyle = typeof fg === 'function' ? fg(y) : fg; y.fillRect(0, 0, S, S); });
    x.drawImage(a, 0, 0);
  });
  const enamel = mk(x => { const g = x.createRadialGradient(S * .4, S * .34, 30, S / 2, S / 2, S * .55); g.addColorStop(0, '#5c1216'); g.addColorStop(.55, '#3e0a0d'); g.addColorStop(1, '#220507'); x.fillStyle = g; x.fillRect(0, 0, S, S); });
  const colC = mk(x => { x.drawImage(enamel, 0, 0); x.drawImage(tint('rgba(0,0,0,0)', goldLayer), 0, 0); });
  const mrC = tint('rgb(0,140,0)', 'rgb(0,70,255)');
  const bumpC = mk(x => { x.filter = 'blur(2.5px)'; x.drawImage(mask, 0, 0); });
  const T = cv => { const t = new THREE.CanvasTexture(cv); t.anisotropy = 8; return t; };
  const out = { map: T(colC), bump: T(bumpC), mr: T(mrC) };
  out.map.colorSpace = THREE.SRGBColorSpace;
  for (const k in out) { out[k].center.set(0.5, 0.5); out[k].rotation = Math.PI / 2; }
  return out;
}

function envMap(renderer) {
  const s = new THREE.Scene();
  s.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: 0xa88a80, side: THREE.BackSide })));
  const box = (w, h, c, x, y, z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); s.add(m); };
  box(10, 4, 0xfff1d8, 0, 9, 6);
  box(4, 10, 0xffd9a8, -10, 1, 3);
  box(3, 8, 0x8a5a40, 10, 0, -2);
  box(14, 2, 0xffe7c0, 0, -3, 12);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(s, 0.035);
  pm.dispose();
  return rt.texture;
}

export async function createStage(canvas, looks, hooks) {
  const small = Math.min(innerWidth, innerHeight) < 620;
  const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small || lowMem ? 1.5 : 1.8));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0xf6ece6, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf6ece6, 8, 20);
  const env = envMap(renderer);
  scene.environment = env;
  const cam = new THREE.PerspectiveCamera(40, 1, 0.05, 60);

  const N = looks.length;
  const X0 = 0; // birinchi tokcha
  const crestX = -GAP * 1.1;
  const wallW = GAP * (N + 8);
  const wallX = X0 + GAP * (N - 1) / 2;

  /* Devor: tokchalar uchun teshikli shakl */
  const wallShape = new THREE.Shape();
  const wl = wallX - wallW / 2, wr = wallX + wallW / 2;
  wallShape.moveTo(wl, -0.01); wallShape.lineTo(wr, -0.01); wallShape.lineTo(wr, 5.4); wallShape.lineTo(wl, 5.4); wallShape.lineTo(wl, -0.01);
  for (let i = 0; i < N; i++) wallShape.holes.push(archPath(AW, AH, X0 + i * GAP, BASE));
  const plasterT = plaster('#ead2cb');
  plasterT.repeat.set(0.8, 0.8);
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: plasterT, roughness: 0.95, metalness: 0, envMapIntensity: 0.25 });
  const wall = new THREE.Mesh(new THREE.ShapeGeometry(wallShape, 24), wallMat);
  scene.add(wall);

  /* Pol: yaltiroq qora-bordo marmar */
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(wallW, 14),
    new THREE.MeshStandardMaterial({ color: 0xe6d3ca, roughness: 0.2, metalness: 0.08, envMapIntensity: 0.7 }));
  floor.rotation.x = -Math.PI / 2; floor.position.set(wallX, 0, 6.5);
  scene.add(floor);
  // plintus va karniz (oltin)
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xe4c49c, metalness: 1, roughness: 0.22, envMapIntensity: 1.3 });
  const railMat = goldMat.clone(); railMat.transparent = true; railMat.opacity = 0;
  const rail = (y, h, d) => { const m = new THREE.Mesh(new THREE.BoxGeometry(wallW, h, d), railMat); m.position.set(wallX, y, d / 2); scene.add(m); };
  rail(0.035, 0.07, 0.03); rail(3.72, 0.025, 0.04); rail(3.8, 0.012, 0.03);

  /* Tokcha geometriyalari (hammasi uchun bitta) */
  const tunnelShape = archShape(AW, AH);
  const tunnel = new THREE.ExtrudeGeometry(tunnelShape, { depth: DEPTH, bevelEnabled: false, curveSegments: 40 });
  tunnel.translate(0, 0, -DEPTH);
  const tunnelMat = new THREE.MeshStandardMaterial({ color: 0xf4e6e0, roughness: 0.85, side: THREE.BackSide, envMapIntensity: 0.4 });
  const trimShape = archShape(AW + 0.16, AH + 0.08, 0, -0.0);
  trimShape.holes.push(archPath(AW, AH));
  const trim = new THREE.ExtrudeGeometry(trimShape, { depth: 0.035, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 40 });
  const inner = new THREE.ShapeGeometry(archShape(AW, AH), 40); normUV(inner, AW, AH);
  const glowGeo = new THREE.PlaneGeometry(AW * 0.9, 0.02);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xffe2b0 });
  const beamGeo = new THREE.PlaneGeometry(AW * 1.0, AH * 0.95);
  const beamMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uI: { value: 0.5 } },
    vertexShader: 'varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'varying vec2 v;uniform float uI;void main(){float w=1.-abs(v.x-.5)*2.;float a=pow(v.y,2.2)*pow(w,1.6)*uI*.1;gl_FragColor=vec4(1.,.82,.58,a);}',
  });

  const VS = 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
  const FS = `varying vec2 vUv;uniform sampler2D uMap;uniform float uHas,uFocus,uIn;
    void main(){
      vec2 uv=vUv; uv.x=.5+(uv.x-.5)*(${(AW / AH).toFixed(4)}/.5625);
      vec3 c=vec3(.16,.04,.05);
      if(uHas>.5) c=texture2D(uMap,uv).rgb;
      float g=dot(c,vec3(.3,.59,.11));
      c=mix(vec3(g)*vec3(1.05,.9,.84),c,mix(.15,1.,uFocus));
      c=mix(vec3(.94,.87,.84),c,mix(.42,1.,uFocus)); c*=mix(.85,1.,uIn);
      c*=mix(.72,1.,smoothstep(0.,.25,vUv.y));
      c+=vec3(.9,.65,.4)*pow(vUv.y,6.)*.08*uFocus;
      gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`;

  const loader = new THREE.TextureLoader();
  const items = looks.map((l, i) => {
    const g = new THREE.Group(); g.position.set(X0 + i * GAP, BASE, 0); scene.add(g);
    g.add(new THREE.Mesh(tunnel, tunnelMat));
    const tr = new THREE.Mesh(trim, goldMat); g.add(tr);
    const uni = { uMap: { value: null }, uHas: { value: 0 }, uFocus: { value: 0 }, uIn: { value: 0 } };
    const pic = new THREE.Mesh(inner, new THREE.ShaderMaterial({ uniforms: uni, vertexShader: VS, fragmentShader: FS }));
    pic.position.z = -DEPTH + 0.002; pic.userData.i = i; g.add(pic);
    const led = new THREE.Mesh(glowGeo, glowMat); led.position.set(0, AH - 0.02, -0.04); g.add(led);
    const beam = new THREE.Mesh(beamGeo, beamMat.clone()); beam.position.set(0, AH * 0.5, -DEPTH * 0.45); g.add(beam);
    const it = { l, g, pic, uni, beam, focus: 0, video: null, vtex: null, poster: null };
    loader.load(`assets/v/${l.id}.webp`, t => { t.colorSpace = THREE.SRGBColorSpace; it.poster = t; if (!it.vtex) { uni.uMap.value = t; uni.uHas.value = 1; } });
    return it;
  });

  /* Medalyon */
  const face = await medalFace();
  const medal = new THREE.Group();
  const faceMat = new THREE.MeshPhysicalMaterial({ map: face.map, bumpMap: face.bump, bumpScale: 6, roughnessMap: face.mr, metalnessMap: face.mr, roughness: 1, metalness: 1, clearcoat: 0.35, clearcoatRoughness: 0.2, envMapIntensity: 1.15 });
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.12, 128, 1), [goldMat, faceMat, faceMat]);
  disc.rotation.x = Math.PI / 2; medal.add(disc);
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xe6c393, metalness: 1, roughness: 0.18, envMapIntensity: 1.7 });
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.075, 32, 160), rimMat); medal.add(rim);
  const beads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.022, 12, 8), rimMat, 120);
  const mtx = new THREE.Matrix4();
  for (let i = 0; i < 120; i++) { const a = i / 120 * Math.PI * 2; mtx.makeTranslation(Math.cos(a) * 1.1, Math.sin(a) * 1.1, 0); beads.setMatrixAt(i, mtx); }
  medal.add(beads);
  scene.add(medal);

  /* Oltin chang (hero) */
  const DUST = small ? 260 : 520;
  const dpos = new Float32Array(DUST * 3), dsp = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) { dpos[i * 3] = crestX + (Math.random() - .5) * 9; dpos[i * 3 + 1] = Math.random() * 4.6; dpos[i * 3 + 2] = Math.random() * 5.5; dsp[i] = Math.random(); }
  const dgeo = new THREE.BufferGeometry(); dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3)); dgeo.setAttribute('s', new THREE.BufferAttribute(dsp, 1));
  const dmat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uT: { value: 0 }, uA: { value: 1 }, uPx: { value: renderer.getPixelRatio() } },
    vertexShader: `attribute float s;uniform float uT,uPx;varying float vA;
      void main(){vec3 p=position;p.y+=mod(uT*.05*(.4+s),4.6)-0.;p.y=mod(p.y,4.6);p.x+=sin(uT*.3+s*20.)*.15;
      vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(1.+s*2.6)*uPx*(6./-mv.z);vA=.35+.65*sin(uT*1.5+s*40.)*.5+.3;}`,
    fragmentShader: 'uniform float uA;varying float vA;void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,0.,d)*vA*uA;gl_FragColor=vec4(.74,.53,.38,a*.55);}',
  });
  const dust = new THREE.Points(dgeo, dmat); dust.frustumCulled = false; scene.add(dust);

  /* Yorug'lik */
  scene.add(new THREE.HemisphereLight(0xfff3ec, 0xd9b5aa, 0.9));
  const key = new THREE.SpotLight(0xffe0b8, 38, 14, 0.42, 0.8, 1.6); key.position.set(0, 5, 4); scene.add(key); scene.add(key.target);
  const fill = new THREE.PointLight(0xffd8c8, 5, 9, 1.8); scene.add(fill);
  const medalLight = new THREE.PointLight(0xffd9a6, 8, 7, 1.6); scene.add(medalLight);

  /* Holat */
  let W = 1, H = 1, portrait = false;
  let prog = 0, sProg = 0, mx = 0, my = 0, smx = 0, smy = 0, active = -1, t0 = performance.now();
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();

  function resize() {
    W = innerWidth; H = innerHeight; portrait = W / H < 0.9;
    renderer.setSize(W, H, false);
    cam.aspect = W / H; cam.fov = portrait ? 52 : 38; cam.updateProjectionMatrix();

  }
  resize(); addEventListener('resize', resize);
  addEventListener('pointermove', e => { mx = e.clientX / W * 2 - 1; my = e.clientY / H * 2 - 1; }, { passive: true });

  function setActive(i) {
    if (i === active) return;
    active = i;
    items.forEach((it, k) => {
      if (k === i) playVideo(it);
      else if (it.video) { it.video.pause(); }
    });
    hooks.onActive?.(i);
  }
  function playVideo(it) {
    if (!it.video) {
      const v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'; v.crossOrigin = 'anonymous';
      v.src = `assets/v/${it.l.id}.mp4`;
      it.video = v;
      it.vtex = new THREE.VideoTexture(v); it.vtex.colorSpace = THREE.SRGBColorSpace;
    }
    it.video.play().catch(() => {});
  }

  canvas.addEventListener('click', e => {
    if (sProg < WALK0 - 0.02) return;
    ptr.set(e.clientX / W * 2 - 1, -(e.clientY / H) * 2 + 1);
    ray.setFromCamera(ptr, cam);
    const hit = ray.intersectObjects(items.map(i => i.pic))[0];
    if (hit) hooks.onOpen?.(hit.object.userData.i);
  });
  canvas.addEventListener('pointermove', e => {
    if (sProg < WALK0 - 0.02) { canvas.style.cursor = ''; return; }
    ptr.set(e.clientX / W * 2 - 1, -(e.clientY / H) * 2 + 1);
    ray.setFromCamera(ptr, cam);
    canvas.style.cursor = ray.intersectObjects(items.map(i => i.pic)).length ? 'pointer' : '';
  });

  const camPos = new THREE.Vector3(), look = new THREE.Vector3();
  function frame(now) {
    const t = (now - t0) / 1000;
    sProg += (prog - sProg) * 0.085;
    smx += (mx - smx) * 0.05; smy += (my - smy) * 0.05;

    // 1) hero → medalyon devorga
    const h = smooth(0, HERO_END, sProg);
    // 2) yurish
    const walk = clamp((sProg - WALK0) / (1 - WALK0 - 0.04));
    const f = walk * (N - 1);
    const i0 = Math.floor(f), fr = f - i0;
    const stepped = i0 + smooth(0.3, 0.7, fr);
    const enter = smooth(HERO_END * 0.6, WALK0, sProg);
    const focusX = lerp(crestX, X0 + stepped * GAP, enter);

    const sideOff = portrait ? 0 : -1.55;
    const camZ = portrait ? 5.6 : 5.3;
    const camY = portrait ? 0.95 : 1.7;
    // hero kamera: devorni chapdan ko'radi
    const heroCam = new THREE.Vector3(crestX + (portrait ? 0 : -0.7), portrait ? 2.4 : 1.75, portrait ? 6.2 : 5.4);
    const walkCam = new THREE.Vector3(focusX + sideOff, camY, camZ);
    camPos.lerpVectors(heroCam, walkCam, enter);
    camPos.x += smx * 0.18; camPos.y -= smy * 0.1;
    cam.position.copy(camPos);
    look.set(lerp(crestX + (portrait ? 0 : -0.7), focusX + sideOff * 0.55, enter), lerp(portrait ? 2.4 : 1.75, portrait ? 0.95 : BASE + AH * 0.5, enter), 0);
    cam.lookAt(look);

    // medalyon: kameraga yaqin katta → devordagi gerb
    // hero'da medalyon ekranning aniq joyida turadi (matnga tegmaydi)
    const D = 3.4, half = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * D, halfW = half * cam.aspect;
    const nx = portrait ? 0 : 0.44, ny = portrait ? 0.53 : 0.0;
    const want = portrait ? Math.min(0.24 * 2 * half, 0.56 * 2 * halfW) : 0.66 * 2 * half; // diametr
    const near = new THREE.Vector3(heroCam.x + nx * halfW, heroCam.y + ny * half, heroCam.z - D);
    const heroSc = want / 2 / 1.12;
    const onWall = new THREE.Vector3(crestX, 2.05, 0.09);
    medal.position.lerpVectors(near, onWall, h);
    const sc = lerp(heroSc, 0.55, h);
    medal.scale.setScalar(sc);
    const spin = (1 - h);
    medal.rotation.set(lerp(-0.12 + smy * 0.12, 0, h), lerp(-0.42 + Math.sin(t * 0.5) * 0.22 + smx * 0.3, 0, h), lerp(0.04, 0, h));
    medal.position.y += Math.sin(t * 0.9) * 0.04 * spin;
    medalLight.position.set(medal.position.x - 1.2, medal.position.y + 1.4, medal.position.z + 2.2);
    medalLight.intensity = lerp(8, 4, h);
    railMat.opacity = smooth(0.35, 0.9, enter);
    dmat.uniforms.uT.value = t; dmat.uniforms.uA.value = 1 - enter * 0.85;

    key.position.set(focusX, 4.6, 3.6); key.target.position.set(focusX, 1.2, -0.3);
    fill.position.set(camPos.x + 1.5, 0.8, 2.6);

    const act = enter > 0.6 ? Math.round(stepped) : -1;
    items.forEach((it, k) => {
      const target = enter > 0.3 ? clamp(1 - Math.abs(stepped - k) * 1.4) : 0;
      it.focus += (target - it.focus) * 0.12;
      it.uni.uFocus.value = it.focus;
      it.uni.uIn.value = Math.min(1, it.uni.uIn.value + 0.02);
      it.beam.material.uniforms.uI.value = 0.35 + it.focus * 0.9;
      it.pic.position.z = -DEPTH + 0.002 + it.focus * 0.05;
      // video kadri tayyor bo'lgandagina posterdan videoga o'tamiz
      const live = it.video && k === act && it.video.readyState >= 2 && it.video.videoWidth > 0 && it.video.currentTime > 0.05;
      const want = live ? it.vtex : it.poster;
      if (want && it.uni.uMap.value !== want) { it.uni.uMap.value = want; it.uni.uHas.value = 1; }
    });
    setActive(act);
    hooks.onProgress?.(sProg, enter, walk);

    renderer.render(scene, cam);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  return {
    setProgress(p) { prog = clamp(p); },
    progressFor(i) { return WALK0 + (i / (N - 1)) * (1 - WALK0 - 0.04); },
    pause() { items.forEach(i => i.video && i.video.pause()); },
    resume() { if (active >= 0) playVideo(items[active]); },
  };
}
