// Faucille V3 — realistic 3D pond (principles from Bankkeeper V9: physical sky, reflective water,
// flat-shaded relief, buoy rings, frosted cards over the scene). Bundled inline by build.mjs.
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

// ------------------------------------------------------------------ seeded rng
let _s = 1234567;
const rnd = () => { _s = (_s * 16807) % 2147483647; return (_s - 1) / 2147483646; };
const R = (a, b) => a + (b - a) * rnd();

// ------------------------------------------------------------------ demo state (0:34, 9/12, score 65)
const T = 34 / 60;
const DEMO = [
  { lane: 0, p: 0.47, kind: 'live', a: -0.12 },
  { lane: 1, p: 0.6, kind: 'cut', a: 0.05 },
  { lane: 2, p: 0.24, kind: 'early', a: 0.16 },
  { lane: 3, p: 0.88, kind: 'danger', a: -0.07 },
];
const FALL_TOP = 12.5;

// ------------------------------------------------------------------ textures
const waterNormals = () => {
  const N = 256, c = document.createElement('canvas'); c.width = c.height = N;
  const g = c.getContext('2d'), img = g.createImageData(N, N);
  const waves = [];
  for (let i = 0; i < 22; i++) waves.push([Math.round(R(1, 9)) * (rnd() < .5 ? -1 : 1), Math.round(R(1, 9)), R(0, 6.28), R(.2, 1) / (1 + i * .15)]);
  const h = (x, y) => waves.reduce((s, [fx, fy, ph, a]) => s + a * Math.sin((fx * x + fy * y) * 2 * Math.PI / N + ph), 0);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const dx = h(x + 1, y) - h(x - 1, y), dy = h(x, y + 1) - h(x, y - 1);
    const v = new THREE.Vector3(-dx * .7, -dy * .7, 1).normalize();
    const o = (y * N + x) * 4;
    img.data[o] = (v.x * .5 + .5) * 255; img.data[o + 1] = (v.y * .5 + .5) * 255; img.data[o + 2] = (v.z * .5 + .5) * 255; img.data[o + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
const dotTex = () => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,250,235,1)'); gr.addColorStop(.35, 'rgba(255,244,214,.8)'); gr.addColorStop(1, 'rgba(255,244,214,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
}
const wickerTex = () => {
  const c = document.createElement('canvas'); c.width = 128; c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#8a6a3f'; g.fillRect(0, 0, 128, 64);
  for (let y = 0; y < 64; y += 8) for (let x = 0; x < 128; x += 16) {
    const off = (y / 8) % 2 ? 8 : 0;
    g.fillStyle = '#a8844f'; g.fillRect(x + off, y + 1, 12, 6);
    g.fillStyle = '#5d4426'; g.fillRect(x + off + 12, y, 4, 8);
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.repeat.set(3, 1); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// ------------------------------------------------------------------ geometry helpers
const bladeGeo = (bend) => {
  const g = new THREE.ConeGeometry(0.035, 1, 3, 6, true); g.translate(0, .5, 0);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const y = p.getY(i); p.setX(i, p.getX(i) + bend * y * y); }
  g.computeVertexNormals(); return g;
}
const reedField = (scene, spots, opts) => {
  const blades = new THREE.InstancedMesh(bladeGeo(.18), new THREE.MeshStandardMaterial({ roughness: .85, side: THREE.DoubleSide }), spots.length * opts.per);
  const heads = new THREE.InstancedMesh(new THREE.CapsuleGeometry(.05, .3, 4, 8), new THREE.MeshStandardMaterial({ color: 0x4a3420, roughness: .9 }), spots.length * 2);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), v = new THREE.Vector3(), col = new THREE.Color();
  let bi = 0, hi = 0;
  for (const [x, z, scale] of spots) {
    for (let k = 0; k < opts.per; k++) {
      const h = R(.6, 1) * opts.h * scale;
      e.set(R(-.12, .12), R(0, 6.28), R(-.12, .12)); q.setFromEuler(e);
      v.set(x + R(-.5, .5) * scale, -0.05, z + R(-.4, .4) * scale); s.set(scale * R(.8, 1.3), h, scale * R(.8, 1.3));
      m.compose(v, q, s); blades.setMatrixAt(bi, m);
      col.setHSL(R(.17, .24), R(.35, .55), R(.16, .3) * opts.light); blades.setColorAt(bi, col); bi++;
    }
    for (let k = 0; k < 2; k++) {
      if (rnd() > opts.cat) continue;
      const h = R(.75, .98) * opts.h * scale;
      e.set(R(-.08, .08), 0, R(-.08, .08)); q.setFromEuler(e);
      v.set(x + R(-.3, .3) * scale, h, z + R(-.3, .3) * scale); s.set(scale, scale, scale);
      m.compose(v, q, s); heads.setMatrixAt(hi++, m);
    }
  }
  blades.count = bi; heads.count = hi;
  scene.add(blades, heads);
}
const hills = (scene, z, w, d, amp, color, seedOff) => {
  const g = new THREE.PlaneGeometry(w, d, 90, 18); g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), zz = p.getZ(i);
    const back = (d / 2 - zz) / d; // 0 front .. 1 back
    const n = Math.sin(x * .045 + seedOff) * .55 + Math.sin(x * .11 + seedOff * 2) * .3 + Math.sin(x * .27 + seedOff * 3) * .12;
    p.setY(i, Math.max(0, (n * .5 + .6) * amp * Math.pow(back, .7) + R(-.6, .6) * back));
  }
  g.computeVertexNormals();
  const mesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 1 }));
  mesh.position.z = z; scene.add(mesh); return mesh;
}
const trees = (scene, n, x0, x1, z0, z1, yAt) => {
  const cone = new THREE.InstancedMesh(new THREE.ConeGeometry(1, 3.6, 6), new THREE.MeshStandardMaterial({ flatShading: true, roughness: 1 }), n);
  const blob = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1.5, 0), new THREE.MeshStandardMaterial({ flatShading: true, roughness: 1 }), n);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color();
  let ci = 0, bi = 0;
  for (let i = 0; i < n; i++) {
    const x = R(x0, x1), z = R(z0, z1), k = R(.8, 1.6);
    q.setFromEuler(new THREE.Euler(0, R(0, 6), 0));
    if (rnd() < .55) { v.set(x, yAt + 1.8 * k, z); s.set(k, k, k); m.compose(v, q, s); cone.setMatrixAt(ci, m); col.setHSL(R(.3, .38), .35, R(.1, .17)); cone.setColorAt(ci++, col); }
    else { v.set(x, yAt + 1.3 * k, z); s.set(k * 1.2, k, k * 1.2); m.compose(v, q, s); blob.setMatrixAt(bi, m); col.setHSL(R(.17, .25), .4, R(.18, .28)); blob.setColorAt(bi++, col); }
  }
  cone.count = ci; blob.count = bi; scene.add(cone, blob);
}

// ------------------------------------------------------------------ world
const makeSky = (scene) => {
  scene.fog = new THREE.Fog(0xc9a874, 50, 240);
  const sky = new Sky(); sky.scale.setScalar(10000); scene.add(sky);
  const su = sky.material.uniforms;
  su.turbidity.value = 14; su.rayleigh.value = 3.8; su.mieCoefficient.value = .012; su.mieDirectionalG.value = .92;
  const sun = new THREE.Vector3();
  const dir = new THREE.DirectionalLight(0xffd7a0, 2.6); scene.add(dir);
  const hemi = new THREE.HemisphereLight(0xffe2b4, 0x2a4128, 1.6); scene.add(hemi);
  return { su, sun, dir };
}
const makeWater = (scene) => {
  const water = new Water(new THREE.PlaneGeometry(2000, 2000), {
    textureWidth: 512, textureHeight: 512, waterNormals: waterNormals(), sunDirection: new THREE.Vector3(),
    sunColor: 0xffc978, waterColor: 0x07200f, distortionScale: .7, fog: true,
  });
  water.rotation.x = -Math.PI / 2; water.material.uniforms.size.value = 18; water.material.uniforms.alpha.value = 1;
  // pond water, not a mirror: lower base reflectance and dim the reflected sky
  water.material.fragmentShader = water.material.fragmentShader
    .replace('float rf0 = 0.3;', 'float rf0 = 0.1;')
    .replace('sunColor * diffuseLight * 0.3', 'sunColor * diffuseLight * 0.04')
    .replace('( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight )', '( vec3( 0.02, 0.05, 0.03 ) + reflectionSample * 0.55 + reflectionSample * specularLight * 0.8 )');
  water.material.needsUpdate = true; scene.add(water);
  return water;
}
const makeLand = (scene) => {
  // relief: far ridges (fogged) + near bank
  hills(scene, -150, 700, 80, 34, 0x51603a, 1.3);
  hills(scene, -95, 520, 50, 16, 0x3c5530, 4.1);
  const bank = new THREE.Mesh(new THREE.BoxGeometry(400, 1.2, 30), new THREE.MeshStandardMaterial({ color: 0x2b3f22, roughness: 1 }));
  bank.position.set(0, 0.1, -72); scene.add(bank);
  trees(scene, 260, -150, 150, -88, -62, 0.6);
  // shores: far reed line, side banks, foreground clumps (darkest)
  const spots = [];
  for (let x = -70; x < 70; x += .9) spots.push([x + R(-.4, .4), R(-58, -54), R(1.4, 2.4)]);
  for (let z = -54; z < 4; z += 1.1) { spots.push([R(-26, -22) + z * .12, z, R(1.1, 1.9)]); spots.push([R(22, 26) - z * .12, z, R(1.1, 1.9)]); }
  reedField(scene, spots, { per: 9, h: 2.2, cat: .55, light: 1.1 });
  const fg = [];
  for (let i = 0; i < 22; i++) fg.push([R(-11, -6.6), R(3.5, 8), R(.9, 1.3)]);
  for (let i = 0; i < 22; i++) fg.push([R(6.6, 11), R(3.5, 8), R(.9, 1.3)]);
  reedField(scene, fg, { per: 11, h: 3.4, cat: .8, light: .75 });
}
const makePads = (scene) => {
  // lily pads, never inside the play area
  const pads = new THREE.InstancedMesh(new THREE.CircleGeometry(.55, 22, .35, Math.PI * 2 - .35), new THREE.MeshStandardMaterial({ color: 0x3f6b2e, roughness: .7, side: THREE.DoubleSide }), 90);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3();
  let pi = 0;
  for (let i = 0; i < 140 && pi < 90; i++) {
    const x = R(-18, 18), z = R(-34, 3);
    if (Math.abs(z) < 2.2 && Math.abs(x) < 7.5) continue;
    q.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, R(0, 6.28))); v.set(x, .03, z); const k = R(.6, 1.4); s.set(k, k, k);
    m.compose(v, q, s); pads.setMatrixAt(pi++, m);
  }
  pads.count = pi; scene.add(pads);
}
export const makeWorld = () => {
  const scene = new THREE.Scene();
  const { su, sun, dir } = makeSky(scene);
  const water = makeWater(scene);
  makeLand(scene); makePads(scene);
  const setSun = (t) => {
    const elev = 9 - 7.5 * t, azim = 178; // the sun sinks as the round runs: the dusk deepens
    const phi = THREE.MathUtils.degToRad(90 - elev), theta = THREE.MathUtils.degToRad(azim);
    sun.setFromSphericalCoords(1, phi, theta);
    su.sunPosition.value.copy(sun); water.material.uniforms.sunDirection.value.copy(sun).normalize();
    dir.position.copy(sun).multiplyScalar(100); dir.intensity = 1.2 + 1.6 * (1 - t);
  };
  return { scene, water, setSun };
}

// ------------------------------------------------------------------ game objects
const MAT = {
  stalk: new THREE.MeshStandardMaterial({ color: 0x6f8f45, roughness: .6, emissive: 0x1d2a10, emissiveIntensity: .6 }),
  head: new THREE.MeshStandardMaterial({ color: 0x7a5232, roughness: .8, emissive: 0x2a170a, emissiveIntensity: .6 }),
  leaf: new THREE.MeshStandardMaterial({ color: 0x5b7a37, roughness: .7, side: THREE.DoubleSide }),
  cork: new THREE.MeshStandardMaterial({ color: 0xefe6d2, roughness: .5 }),
  corkOn: new THREE.MeshStandardMaterial({ color: 0xffd27a, roughness: .4, emissive: 0xe3a23b, emissiveIntensity: .9 }),
  rope: new THREE.MeshStandardMaterial({ color: 0xd8ccb0, roughness: .9 }),
  arc: new THREE.MeshBasicMaterial({ color: 0xffeab8, transparent: true, opacity: .95, blending: THREE.AdditiveBlending, depthWrite: false }),
  glow: new THREE.MeshBasicMaterial({ color: 0xffc766, transparent: true, opacity: .45, blending: THREE.AdditiveBlending, depthWrite: false }),
  ripple: new THREE.MeshBasicMaterial({ color: 0xfff3d6, transparent: true, opacity: .8, depthWrite: false, side: THREE.DoubleSide }),
  plank: new THREE.MeshStandardMaterial({ color: 0x5a4330, roughness: .95 }),
};
const stem = (len = 2.6, scale = 1.35) => {
  const g = new THREE.Group();
  const st = new THREE.Mesh(new THREE.CylinderGeometry(.03 * scale, .045 * scale, len, 7), MAT.stalk); st.position.y = len / 2; g.add(st);
  const hd = new THREE.Mesh(new THREE.CapsuleGeometry(.075 * scale, .55 * scale, 4, 10), MAT.head); hd.position.y = len - .45 * scale; g.add(hd);
  const sp = new THREE.Mesh(new THREE.CylinderGeometry(.006, .014, .35 * scale, 4), MAT.stalk); sp.position.y = len + .05; g.add(sp);
  const lg = new THREE.PlaneGeometry(.09 * scale, 1.1 * scale, 1, 6); lg.translate(0, .55 * scale, 0);
  const lp = lg.attributes.position; for (let i = 0; i < lp.count; i++) { const y = lp.getY(i); lp.setZ(i, .25 * y * y); lp.setX(i, lp.getX(i) * (1 - y / (1.15 * scale))); }
  lg.computeVertexNormals();
  const lf = new THREE.Mesh(lg, MAT.leaf); lf.position.y = len * .3; lf.rotation.y = .9; g.add(lf);
  return g;
}
const ring = (x, z, r, on) => {
  const g = new THREE.Group();
  const rope = new THREE.Mesh(new THREE.TorusGeometry(r, .012, 6, 64), MAT.rope); rope.rotation.x = -Math.PI / 2; rope.position.y = .04; g.add(rope);
  const n = 12;
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2;
    const c = new THREE.Mesh(new THREE.SphereGeometry(.075, 12, 8), on ? MAT.corkOn : MAT.cork);
    c.scale.y = .7; c.position.set(Math.cos(a) * r, .04, Math.sin(a) * r); g.add(c);
  }
  g.position.set(x, 0, z); return g;
}
const arcOfLight = (x, y, z) => {
  const g = new THREE.Group();
  const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(x - 1.5, y - .75, z + .5), new THREE.Vector3(x, y + .55, z + .7), new THREE.Vector3(x + 1.45, y - .45, z + .4));
  const tube = new THREE.TubeGeometry(curve, 48, .035, 6, false);
  const p = tube.attributes.position, uv = tube.attributes.uv; // taper both ends
  const center = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    const t = uv.getX(i); const w = Math.pow(Math.sin(Math.PI * t), .7);
    const pt = curve.getPoint(t); center.set(p.getX(i), p.getY(i), p.getZ(i)).sub(pt).multiplyScalar(w);
    p.setXYZ(i, pt.x + center.x, pt.y + center.y, pt.z + center.z);
  }
  g.add(new THREE.Mesh(tube, MAT.arc));
  const halo = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, .11, 6, false), MAT.glow); halo.material = MAT.glow.clone(); halo.material.opacity = .22; g.add(halo);
  return g;
}
const fluff = (x, y, z, n, tex) => {
  const pos = [];
  for (let i = 0; i < n; i++) { const a = R(0, 6.28), r = R(.1, 1.1); pos.push(x + Math.cos(a) * r, y + R(-.2, .9), z + Math.sin(a) * r * .5 + .3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size: .09, map: tex, transparent: true, depthWrite: false, color: 0xfff6e0 }));
}
const ripples = (x, z) => {
  const g = new THREE.Group();
  [.35, .75, 1.2, 1.7].forEach((r, i) => {
    const m = new THREE.Mesh(new THREE.RingGeometry(r, r + .05 - i * .008, 48), MAT.ripple.clone()); m.material.opacity = .85 - i * .2;
    m.rotation.x = -Math.PI / 2; m.position.set(x, .05, z); g.add(m);
  });
  for (let i = 0; i < 9; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(.04, 6, 4), MAT.ripple); d.position.set(x + R(-.35, .35), R(.15, .8), z + R(-.2, .2)); g.add(d); }
  return g;
}
const jettyWithBasket = (x, z, filled, tex) => {
  const g = new THREE.Group();
  for (let i = 0; i < 7; i++) { const p = new THREE.Mesh(new THREE.BoxGeometry(.36, .08, 3.2), MAT.plank); p.position.set(x - 1.1 + i * .37, .45, z); p.rotation.z = R(-.02, .02); g.add(p); }
  for (const [dx, dz] of [[-1.2, -1.4], [1.2, -1.4], [-1.2, 1.4], [1.2, 1.4]]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(.08, .09, 1.6, 7), MAT.plank); post.position.set(x + dx, .2, z + dz); g.add(post); }
  const bk = new THREE.Mesh(new THREE.CylinderGeometry(.58, .44, .55, 24, 1, true), new THREE.MeshStandardMaterial({ map: tex, roughness: .95, side: THREE.DoubleSide }));
  bk.position.set(x, .78, z + .2); g.add(bk);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(.58, .04, 6, 32), new THREE.MeshStandardMaterial({ color: 0x6b4f2c, roughness: .9 })); rim.rotation.x = -Math.PI / 2; rim.position.set(x, 1.05, z + .2); g.add(rim);
  for (let i = 0; i < filled; i++) {
    const s = stem(1.5, .75); const a = -0.55 + 1.1 * i / Math.max(1, filled - 1);
    s.position.set(x + Math.sin(a) * .2, .62, z + .2 + R(-.15, .15)); s.rotation.z = -a * .8; s.rotation.x = R(-.25, .1); g.add(s);
  }
  return g;
}

// ------------------------------------------------------------------ layout per view
export const populate = (world, { stems = [], rip = [], lanes = 4, spacing = 3, z = 0, r = .9, basket = true, jettyX, filled = 9, rings = true }) => {
  const game = new THREE.Group(); world.scene.add(game);
  const xs = Array.from({ length: lanes }, (_, i) => (i - (lanes - 1) / 2) * spacing);
  const tex = dotTex();
  stems.forEach((s) => {
    const x = xs[s.lane]; const on = s.kind === 'live' || s.kind === 'danger' || s.kind === 'cut';
    game.add(ring(x, z, r, on));
    const yb = (1 - s.p) * FALL_TOP;
    if (s.kind === 'cut') {
      const top = stem(1.5); top.position.set(x + .35, yb + 1.05, z); top.rotation.z = -.75; top.rotation.x = .2; game.add(top);
      const low = new THREE.Mesh(new THREE.CylinderGeometry(.03, .045, .9, 7), MAT.stalk); low.position.set(x - .05, yb + .2, z); low.rotation.z = .08; game.add(low);
      game.add(arcOfLight(x, yb + .95, z));
      game.add(fluff(x + .2, yb + 1.1, z, 70, tex));
    } else {
      const st = stem(); st.position.set(x, yb, z); st.rotation.z = s.a; st.rotation.x = s.a * .5; game.add(st);
      if (s.kind === 'danger') {
        const g = new THREE.Mesh(new THREE.CircleGeometry(.75, 32), MAT.glow); g.rotation.x = -Math.PI / 2; g.position.set(x, .06, z); game.add(g);
      }
    }
  });
  const used = new Set(stems.map((s) => s.lane));
  if (rings) xs.forEach((x, i) => { if (!used.has(i)) game.add(ring(x, z, r, false)); });
  rip.forEach((l) => game.add(ripples(xs[l], z)));
  if (basket) game.add(jettyWithBasket(jettyX ?? -3.7, z + 5.6, filled, wickerTex()));
  return game;
}

export const makeRenderer = (canvas, w, h) => {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1)); r.setSize(w, h, false);
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = .6; r.outputColorSpace = THREE.SRGBColorSpace;
  return r;
}
export const camera = (aspect, fov, pos, look) => {
  const c = new THREE.PerspectiveCamera(fov, aspect, .1, 3000); c.position.set(...pos); c.lookAt(...look); return c;
}

// ------------------------------------------------------------------ presets (one per page and frame)
// cam: [fov, position, lookAt]; lay: populate() options; t: sun progress (0 start of round, 1 end)
const PRESETS = {
  game: {
    desk: { cam: [46, [0, 5.4, 16], [0, 3.5, 0]], lay: { stems: DEMO, spacing: 3, r: .95 }, t: T },
    mob: { cam: [60, [0, 5.6, 15.5], [0, 4.1, 0]], lay: { stems: DEMO, spacing: 2.15, r: .8, jettyX: -2.7 }, t: T },
  },
  // inline post in the feed: wide establishing shot, idle rings, sun still high
  post: {
    desk: { cam: [40, [1.5, 3.2, 19], [-.5, 3.4, -10]], lay: { spacing: 3, r: .95, filled: 0 }, t: .08 },
    mob: { cam: [52, [0, 3.4, 17], [-.6, 3.6, -10]], lay: { spacing: 2.15, r: .8, jettyX: -2.6, filled: 0 }, t: .08 },
  },
  // end card: low camera on the jetty, full basket, sun on the far bank
  end: {
    desk: { cam: [42, [2.2, 2.1, 12.5], [-2.2, 1.6, 2]], lay: { spacing: 3, r: .95, filled: 12 }, t: 1 },
    mob: { cam: [54, [.6, 2.2, 11.8], [-2.6, 1.8, 2]], lay: { spacing: 2.15, r: .8, jettyX: -3.1, filled: 12 }, t: 1 },
  },
  // streaks & leaderboard: high calm view over the pond, no game objects
  series: {
    desk: { cam: [44, [0, 6.5, 20], [0, 4.5, -30]], lay: { rings: false, filled: 7, jettyX: -5.5 }, t: .95 },
    mob: { cam: [58, [0, 6.5, 18], [0, 5, -30]], lay: { rings: false, filled: 7, jettyX: -3.4 }, t: .95 },
  },
};
const TILES = {
  ready: { stems: [], t: 0 }, early: { stems: [{ lane: 0, p: .3, kind: 'early', a: .12 }] }, live: { stems: [{ lane: 0, p: .52, kind: 'live', a: -.1 }] },
  cut: { stems: [{ lane: 0, p: .62, kind: 'cut', a: 0 }] }, danger: { stems: [{ lane: 0, p: .9, kind: 'danger', a: -.05 }] },
  miss: { stems: [], rip: [0] }, end: { stems: [], t: 1 },
  // non-game tiles (other pages): same pond, no rings
  calm: { stems: [], t: .1, rings: false }, dusk: { stems: [], t: 1, rings: false }, mid: { stems: [], t: .55, rings: false },
};

// ------------------------------------------------------------------ boot
// component states, rendered once into images
const renderTiles = (world) => {
  const tiles = document.querySelectorAll('[data-state]');
  if (!tiles.length) return;

  const c = document.createElement('canvas'); const W = 170, H = 240;
  const rr = makeRenderer(c, W, H); rr.setPixelRatio(2); rr.setSize(W, H, false);
  const cam = camera(W / H, 62, [0, 3.6, 8.5], [0, 4, 0]);
  tiles.forEach((el) => {
    const s = TILES[el.dataset.state];
    world.setSun(s.t ?? T);
    const grp = populate(world, { stems: s.stems, rip: s.rip || [], lanes: 1, r: .9, basket: false, rings: s.rings !== false });
    world.water.material.uniforms.time.value = 3;
    rr.render(world.scene, cam);
    world.scene.remove(grp);
    const img = new Image(); img.src = c.toDataURL('image/jpeg', .9); img.width = W; img.height = H; el.prepend(img);
  });
  rr.dispose();
}

const boot = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const world = makeWorld();
  const views = [...document.querySelectorAll('canvas[data-view]')].map((cv) => {
    const pr = PRESETS[cv.dataset.view][cv.dataset.frame];
    const v = { cv, pr, cam: camera(cv.clientWidth / cv.clientHeight, ...pr.cam) };
    v.r = makeRenderer(cv, cv.clientWidth, cv.clientHeight);
    return v;
  });

  renderTiles(world);

  views.forEach((v) => { v.grp = populate(world, v.pr.lay); });
  const t0 = performance.now();
  const frame = (now) => {
    world.water.material.uniforms.time.value = 2 + (now - t0) / 1000 * .35;
    views.forEach((v) => {
      views.forEach((o) => { o.grp.visible = o === v; });
      world.setSun(v.pr.t);
      v.r.render(world.scene, v.cam);
    });
    if (!reduce) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  document.documentElement.dataset.ready = '1';
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
